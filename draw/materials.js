import * as THREE from 'three';

/** Locally hosted, scanned PBR surfaces plus original tileable specialty materials. */
export const MATERIALS = [
  { id: 'grass', name: 'Wild meadow', color: '#8fa968', description: 'Scanned 1K · normal + height', scanned: true },
  { id: 'dirt', name: 'Earth', color: '#967655', description: 'Grainy soil · normal + height' },
  { id: 'sand', name: 'Warm sand', color: '#d4bd8b', description: 'Fine ripples · normal + height' },
  { id: 'brick', name: 'Red brick', color: '#ba7f62', description: 'Scanned 1K · recessed mortar', scanned: true },
  { id: 'stone', name: 'Weathered stone', color: '#b7b09a', description: 'Scanned 1K · normal + height', scanned: true },
  { id: 'plaster', name: 'Lime plaster', color: '#eee7d3', description: 'Scanned 1K · normal + height', scanned: true },
  { id: 'concrete', name: 'Poured concrete', color: '#b6b8b0', description: 'Fine pores · normal + height' },
  { id: 'wood', name: 'Timber floor', color: '#ad875d', description: 'Scanned 1K · grain + height', scanned: true },
  { id: 'roof', name: 'Clay roof tile', color: '#ac624b', description: 'Curved tile relief · normal + height' },
  { id: 'asphalt', name: 'Asphalt', color: '#62676a', description: 'Coarse aggregate · normal + height' },
  { id: 'cobble', name: 'Cobblestone', color: '#aaa99b', description: 'Scanned 1K · rounded stone relief', scanned: true },
  { id: 'tile', name: 'Ceramic tile', color: '#e4dcc4', description: 'Glazed edges · normal + height' },
  { id: 'slate', name: 'Slate', color: '#717d79', description: 'Layered rock · normal + height' },
  { id: 'water', name: 'Clear water', color: '#72b6b2', description: 'Rippled translucent surface' },
  { id: 'glass', name: 'Window glass', color: '#aeced0', description: 'Soft tinted transparent glass' },
  { id: 'metal', name: 'Brushed metal', color: '#5d6a63', description: 'Subtle directional grain' },
];

/** All four maps for these assets are bundled locally in textures/. */
export const SCANNED_SURFACES = Object.freeze({
  brick: 'red_brick_03',
  stone: 'cobblestone_floor_02',
  cobble: 'cobblestone_floor_02',
  wood: 'wood_floor',
  plaster: 'plastered_wall_02',
  grass: 'aerial_grass_rock',
});

const SIZE = 256;
const materialCache = new Map();
const textureCache = new Map();
const previewCache = new Map();
const photoPromises = new Map();
const sourcePromises = new Map();
const textureCopies = new Map();
const loadedSurfaces = new Set();
const descriptors = new Map(MATERIALS.map((entry) => [entry.id, entry]));
let fields;

const photoSlots = {
  map: 'diff',
  normalMap: 'nor_gl',
  roughnessMap: 'rough',
  displacementMap: 'disp',
};

function photoURL(asset, suffix) {
  return new URL(`./textures/${asset}_${suffix}_1k.jpg`, import.meta.url).href;
}

function trackTexture(id, slot, texture) {
  if (!SCANNED_SURFACES[id] || loadedSurfaces.has(id)) return;
  if (!textureCopies.has(id)) textureCopies.set(id, new Map());
  const slots = textureCopies.get(id);
  if (!slots.has(slot)) slots.set(slot, new Set());
  slots.get(slot).add(texture);
}

function loadPhotoSurface(id) {
  if (!SCANNED_SURFACES[id]) return Promise.resolve({ id, loaded: false });
  if (photoPromises.has(id)) return photoPromises.get(id);
  const asset = SCANNED_SURFACES[id];
  if (!sourcePromises.has(asset)) {
    const loader = new THREE.TextureLoader();
    sourcePromises.set(asset, Promise.all(Object.entries(photoSlots).map(async ([slot, suffix]) => {
      const source = await loader.loadAsync(photoURL(asset, suffix));
      const image = source.image;
      source.dispose();
      return [slot, image];
    })));
  }
  const promise = sourcePromises.get(asset).then((images) => {
    const slots = textureCopies.get(id);
    for (const [slot, image] of images) {
      for (const texture of slots?.get(slot) || []) {
        // Replace images in place: buildings, terrain, and repeat clones all update.
        texture.image = image;
        texture.needsUpdate = true;
      }
    }
    loadedSurfaces.add(id);
    textureCopies.delete(id);
    const material = materialCache.get(id);
    if (material) {
      material.userData.scanned = true;
      material.userData.sourceAsset = asset;
      material.needsUpdate = true;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('draw:material-loaded', { detail: { id, asset } }));
    }
    return { id, loaded: true };
  }).catch((error) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('draw:material-error', { detail: { id, asset, message: error.message } }));
    }
    return { id, loaded: false, error: error.message };
  });
  photoPromises.set(id, promise);
  return promise;
}

const clamp = (value, low = 0, high = 1) => Math.max(low, Math.min(high, value));
const fract = (value) => value - Math.floor(value);
const smoothstep = (a, b, value) => {
  const x = clamp((value - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const hash = (x, y, seed = 1) => {
  let n = Math.imul(x + seed * 131, 374761393) ^ Math.imul(y + seed * 71, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
};

function hexRGB(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >>> 16) & 255, (n >>> 8) & 255, n & 255];
}

function periodicNoise(x, y, cells, seed) {
  const sx = x / SIZE * cells;
  const sy = y / SIZE * cells;
  const ix = Math.floor(sx);
  const iy = Math.floor(sy);
  const fx = sx - ix;
  const fy = sy - iy;
  const tx = fx * fx * (3 - 2 * fx);
  const ty = fy * fy * (3 - 2 * fy);
  const a = hash(ix % cells, iy % cells, seed);
  const b = hash((ix + 1) % cells, iy % cells, seed);
  const c = hash(ix % cells, (iy + 1) % cells, seed);
  const d = hash((ix + 1) % cells, (iy + 1) % cells, seed);
  return (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
}

function noiseFields() {
  if (fields) return fields;
  fields = {
    broad: new Float32Array(SIZE * SIZE),
    mid: new Float32Array(SIZE * SIZE),
    fine: new Float32Array(SIZE * SIZE),
    grain: new Float32Array(SIZE * SIZE),
  };
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = y * SIZE + x;
      fields.broad[i] = periodicNoise(x, y, 4, 17);
      fields.mid[i] = periodicNoise(x, y, 16, 41);
      fields.fine[i] = periodicNoise(x, y, 64, 29);
      fields.grain[i] = hash(x, y, 73);
    }
  }
  return fields;
}

function canvasFromRGBA(data) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const context = canvas.getContext('2d');
  const pixels = context.createImageData(SIZE, SIZE);
  pixels.data.set(data);
  context.putImageData(pixels, 0, 0);
  return canvas;
}

function asTexture(canvas, color = false) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/** Rounded, irregular setts with a periodic Voronoi pattern. */
function stoneSample(x, y, cells) {
  const sx = x / SIZE * cells;
  const sy = y / SIZE * cells;
  const ix = Math.floor(sx);
  const iy = Math.floor(sy);
  let first = 99;
  let second = 99;
  let identity = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const cx = ix + dx;
      const cy = iy + dy;
      const wx = (cx + cells) % cells;
      const wy = (cy + cells) % cells;
      const px = cx + 0.2 + hash(wx, wy, 123) * 0.6;
      const py = cy + 0.2 + hash(wx, wy, 67) * 0.6;
      const dist = Math.hypot(sx - px, sy - py);
      if (dist < first) {
        second = first;
        first = dist;
        identity = hash(wx, wy, 51);
      } else if (dist < second) second = dist;
    }
  }
  return { edge: smoothstep(0.025, 0.15, second - first), identity, distance: first };
}

function makeTextures(id) {
  if (textureCache.has(id)) return textureCache.get(id);
  const descriptor = descriptors.get(id) || descriptors.get('plaster');
  const rgb = hexRGB(descriptor.color);
  const noise = noiseFields();
  const albedo = new Uint8ClampedArray(SIZE * SIZE * 4);
  const heights = new Float32Array(SIZE * SIZE);
  const roughData = new Uint8ClampedArray(SIZE * SIZE * 4);

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = y * SIZE + x;
      const n = noise.broad[i];
      const m = noise.mid[i];
      const f = noise.fine[i];
      const g = noise.grain[i];
      let h = 0.5;
      let brightness = 1;
      let roughness = 0.85;
      let tint = [0, 0, 0];

      switch (id) {
        case 'grass': {
          const blade = Math.pow(Math.max(0, Math.sin((x * 80 + y * 49) / SIZE * Math.PI * 2 + m * 4)), 8);
          h = 0.35 + f * 0.25 + g * 0.12 + blade * 0.18;
          brightness = 0.82 + n * 0.22 + m * 0.13 + (g - 0.5) * 0.18;
          tint = [n * 8, m * 7, -n * 9];
          roughness = 0.95;
          break;
        }
        case 'dirt': {
          const pebble = g > 0.94 ? (g - 0.94) * 5 : 0;
          h = 0.2 + m * 0.3 + f * 0.23 + pebble;
          brightness = 0.79 + n * 0.18 + f * 0.24 + pebble;
          roughness = 0.97;
          break;
        }
        case 'sand': {
          const wave = Math.sin(y / SIZE * Math.PI * 20 + Math.sin(x / SIZE * Math.PI * 4) * 0.7);
          h = 0.48 + wave * 0.08 + (f - 0.5) * 0.06 + g * 0.08;
          brightness = 0.94 + n * 0.08 + wave * 0.015 + (g - 0.5) * 0.08;
          roughness = 0.92;
          break;
        }
        case 'brick': {
          const row = Math.floor(y / 32);
          const bx = (x + (row % 2) * 32) % 64;
          const by = y % 32;
          const edge = Math.min(bx, 64 - bx, by, 32 - by);
          const block = smoothstep(1.1, 4.2, edge);
          const identity = hash(Math.floor((x + (row % 2) * 32) / 64) % 4, row, 31);
          h = 0.12 + block * (0.49 + m * 0.13 + (g - 0.5) * 0.06);
          brightness = block * (0.81 + identity * 0.28 + (f - 0.5) * 0.12) + (1 - block) * 1.2;
          tint = [(1 - block) * -22, (1 - block) * 20, (1 - block) * 29];
          roughness = 0.91;
          break;
        }
        case 'stone':
        case 'cobble': {
          const sample = stoneSample(x, y, id === 'stone' ? 5 : 8);
          h = 0.1 + sample.edge * (0.55 + sample.identity * 0.15 + (m - 0.5) * 0.12 - sample.distance * 0.05);
          brightness = (0.72 + sample.identity * 0.27 + n * 0.12 + (g - 0.5) * 0.08) * (0.71 + sample.edge * 0.29);
          roughness = 0.85 + f * 0.1;
          break;
        }
        case 'plaster': {
          h = 0.4 + m * 0.1 + f * 0.08 + g * 0.05;
          brightness = 0.97 + (n - 0.5) * 0.055 + (f - 0.5) * 0.04;
          roughness = 0.92;
          break;
        }
        case 'concrete': {
          const pore = g < 0.025 ? 0.2 : 0;
          h = 0.44 + m * 0.1 + f * 0.045 - pore;
          brightness = 0.94 + n * 0.1 + (f - 0.5) * 0.055 - pore * 0.35;
          roughness = 0.88;
          break;
        }
        case 'wood': {
          const grain = 0.5 + 0.5 * Math.sin(x / SIZE * Math.PI * 72 + Math.sin(y / SIZE * Math.PI * 2) * 3 + n * 5);
          const plankX = x % 64;
          const seam = smoothstep(0, 2, Math.min(plankX, 64 - plankX));
          const plankTone = hash(Math.floor(x / 64), 0, 5) * 0.12;
          h = 0.14 + seam * (0.35 + grain * 0.11 + f * 0.045);
          brightness = (0.83 + grain * 0.13 + plankTone + (g - 0.5) * 0.045) * (0.68 + seam * 0.32);
          roughness = 0.68 + grain * 0.14;
          break;
        }
        case 'roof': {
          const tx = (x % 32) / 32;
          const ty = (y % 64) / 64;
          const curve = Math.sin(tx * Math.PI);
          const edge = smoothstep(0, 0.06, ty) * (1 - smoothstep(0.94, 1, ty));
          const identity = hash(Math.floor(x / 32), Math.floor(y / 64), 10);
          h = 0.15 + edge * (0.25 + curve * 0.45 + (f - 0.5) * 0.04);
          brightness = (0.85 + identity * 0.2 + curve * 0.07 + (g - 0.5) * 0.07) * (0.72 + edge * 0.28);
          roughness = 0.85;
          break;
        }
        case 'asphalt': {
          h = 0.35 + f * 0.22 + g * 0.15;
          brightness = 0.83 + (g - 0.5) * 0.2 + m * 0.12 + f * 0.1;
          roughness = 0.96;
          break;
        }
        case 'tile': {
          const tx = x % 64;
          const ty = y % 64;
          const edge = smoothstep(1, 3, Math.min(tx, 64 - tx, ty, 64 - ty));
          const identity = hash(Math.floor(x / 64), Math.floor(y / 64), 37);
          h = 0.2 + edge * 0.45 + f * 0.012;
          brightness = 0.92 + identity * 0.08 - (1 - edge) * 0.18;
          roughness = 0.22 + (1 - edge) * 0.6;
          break;
        }
        case 'slate': {
          const vein = Math.sin(y / SIZE * Math.PI * 32 + n * 12 + m * 2) * 0.5 + 0.5;
          h = 0.3 + n * 0.3 + vein * 0.08 + f * 0.07;
          brightness = 0.84 + n * 0.18 + vein * 0.08 + (g - 0.5) * 0.045;
          roughness = 0.81;
          break;
        }
        case 'water': {
          const ripples = Math.sin(x / SIZE * Math.PI * 12 + Math.sin(y / SIZE * Math.PI * 8)) * Math.cos(y / SIZE * Math.PI * 10);
          h = 0.5 + ripples * 0.13 + (m - 0.5) * 0.07;
          brightness = 0.98 + n * 0.035;
          roughness = 0.16;
          break;
        }
        case 'glass':
          h = 0.5;
          brightness = 1;
          roughness = 0.09;
          break;
        case 'metal': {
          const brush = hash(0, y, 89);
          h = 0.5 + brush * 0.018;
          brightness = 0.96 + brush * 0.06;
          roughness = 0.4 + brush * 0.12;
          break;
        }
      }

      heights[i] = clamp(h);
      const pixel = i * 4;
      for (let c = 0; c < 3; c++) albedo[pixel + c] = rgb[c] * brightness + tint[c];
      albedo[pixel + 3] = 255;
      const roughByte = Math.round(clamp(roughness) * 255);
      roughData[pixel] = roughData[pixel + 1] = roughData[pixel + 2] = roughByte;
      roughData[pixel + 3] = 255;
    }
  }

  const normalData = new Uint8ClampedArray(SIZE * SIZE * 4);
  const heightData = new Uint8ClampedArray(SIZE * SIZE * 4);
  const previewData = new Uint8ClampedArray(albedo);
  const normalStrength = ['plaster', 'concrete', 'sand', 'glass'].includes(id) ? 2.2 : 3.7;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = y * SIZE + x;
      const pixel = i * 4;
      const left = heights[y * SIZE + (x + SIZE - 1) % SIZE];
      const right = heights[y * SIZE + (x + 1) % SIZE];
      const above = heights[((y + SIZE - 1) % SIZE) * SIZE + x];
      const below = heights[((y + 1) % SIZE) * SIZE + x];
      const nx = (left - right) * normalStrength;
      const ny = (below - above) * normalStrength;
      const length = Math.hypot(nx, ny, 1);
      normalData[pixel] = (nx / length * 0.5 + 0.5) * 255;
      normalData[pixel + 1] = (ny / length * 0.5 + 0.5) * 255;
      normalData[pixel + 2] = (1 / length * 0.5 + 0.5) * 255;
      normalData[pixel + 3] = 255;
      const height = Math.round(heights[i] * 255);
      heightData[pixel] = heightData[pixel + 1] = heightData[pixel + 2] = height;
      heightData[pixel + 3] = 255;
      const light = clamp(0.9 + nx / length * 0.35 + ny / length * 0.45, 0.5, 1.22);
      for (let c = 0; c < 3; c++) previewData[pixel + c] = albedo[pixel + c] * light;
    }
  }

  const textures = {
    map: asTexture(canvasFromRGBA(albedo), true),
    normalMap: asTexture(canvasFromRGBA(normalData)),
    roughnessMap: asTexture(canvasFromRGBA(roughData)),
    displacementMap: asTexture(canvasFromRGBA(heightData)),
  };
  textureCache.set(id, textures);
  for (const [slot, texture] of Object.entries(textures)) trackTexture(id, slot, texture);
  previewCache.set(id, canvasFromRGBA(previewData).toDataURL('image/png'));
  if (SCANNED_SURFACES[id]) loadPhotoSurface(id);
  return textures;
}

/**
 * Returns a shared material, or a clone when overrides are supplied.
 * Optional overrides.repeat=[u,v] creates independent repeating texture clones.
 * Optional overrides.relief enables actual vertex displacement on dense meshes.
 */
export function getMaterial(id = 'plaster', overrides = {}) {
  if (!descriptors.has(id)) id = 'plaster';
  if (!materialCache.has(id)) {
    const textures = makeTextures(id);
    const material = new THREE.MeshStandardMaterial({
      ...textures,
      color: 0xffffff,
      roughness: 1,
      metalness: id === 'metal' ? 0.68 : id === 'water' ? 0.12 : 0,
      normalScale: new THREE.Vector2(0.65, 0.65),
      displacementScale: 0,
      displacementBias: 0,
      envMapIntensity: 0.65,
    });
    if (id === 'water') {
      material.transparent = true;
      material.opacity = 0.82;
      material.depthWrite = false;
      material.normalScale.set(0.35, 0.35);
    } else if (id === 'glass') {
      material.transparent = true;
      material.opacity = 0.48;
      material.metalness = 0.1;
      material.depthWrite = false;
      material.side = THREE.DoubleSide;
    }
    material.name = id;
    material.userData.surfaceId = id;
    materialCache.set(id, material);
  }
  const source = materialCache.get(id);
  if (!Object.keys(overrides).length) return source;
  const material = source.clone();
  const { repeat, relief, ...properties } = overrides;
  material.setValues(properties);
  if (repeat) {
    for (const key of ['map', 'normalMap', 'roughnessMap', 'displacementMap']) {
      if (!material[key]) continue;
      material[key] = material[key].clone();
      const u = Array.isArray(repeat) ? repeat[0] : repeat;
      const v = Array.isArray(repeat) ? repeat[1] : repeat;
      material[key].repeat.set(u, v);
      material[key].needsUpdate = true;
      trackTexture(id, key, material[key]);
    }
  }
  if (relief !== undefined) applyRelief(material, relief);
  return material;
}

/** Geometry must contain enough vertices for visible silhouette displacement. */
export function applyRelief(material, strength = 0.08) {
  const id = material.userData.surfaceId || material.name || 'plaster';
  if (!material.displacementMap) material.displacementMap = makeTextures(id).displacementMap;
  material.displacementScale = clamp(Number(strength) || 0, 0, 0.6);
  material.displacementBias = -material.displacementScale * 0.45;
  material.needsUpdate = true;
  return material;
}

export function getMaterialPreview(id) {
  if (!descriptors.has(id)) id = 'plaster';
  // A real local diffuse thumbnail is available immediately, without a render.
  if (SCANNED_SURFACES[id]) return photoURL(SCANNED_SURFACES[id], 'diff');
  if (!previewCache.has(id)) makeTextures(id);
  return previewCache.get(id);
}

/** Read-only texture handles for the editor's terrain and painting shaders. */
export function getMaterialTextures(id) {
  return makeTextures(descriptors.has(id) ? id : 'plaster');
}

/** Await this before hiding an initial loading indicator, if desired. */
export async function preloadMaterials(ids = Object.keys(SCANNED_SURFACES)) {
  const names = [...new Set(ids)].filter((id) => SCANNED_SURFACES[id]);
  for (const id of names) getMaterial(id);
  const results = await Promise.all(names.map((id) => loadPhotoSurface(id)));
  return {
    loaded: results.filter((result) => result.loaded).map((result) => result.id),
    failed: results.filter((result) => !result.loaded),
  };
}
