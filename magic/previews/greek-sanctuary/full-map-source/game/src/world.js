import {greekEnabled,greekColumn,greekWall,greekProp} from './greek-environment.js';
import * as THREE from 'three';
import { existingRooms, newRooms, corridors, secretAreas, layoutScale } from './castle-layout.js';
import { castleBoundaries } from './castle-boundaries.js';
import { createCastleArt,dressCastle,roomArt,wallArt } from './castle-art.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {dressSiegeMaterials,siegeProp,siegeTorchFlames,siegeEnabled} from './siege-environment.js';

// All distances are metres. North is -Z. Static detail is instanced; loose
// furniture is described separately so that there is only one physical copy.
const PI = Math.PI;
const TAU = PI * 2;
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const UP = new THREE.Vector3(0, 1, 0);

function seeded(seed = 73417) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function beveledBox(bevel = 0.045) {
  const b = 0.5 - bevel;
  const s = new THREE.Shape();
  s.moveTo(-b, -b);
  s.lineTo(b, -b);
  s.lineTo(b, b);
  s.lineTo(-b, b);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 1 - bevel * 2,
    bevelEnabled: true,
    bevelSegments: 1,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 1,
  });
  g.translate(0, 0, -0.5 + bevel);
  g.clearGroups();
  return g;
}

function grainTexture(seed, wood = false) {
  const size = 128;
  const rand = seeded(seed);
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const noise = rand();
      const broad = Math.sin(x * 0.084 + Math.sin(y * 0.057) * 2) * 0.05;
      const scratch = wood
        ? Math.sin(x * 0.71 + Math.sin(y * 0.07) * 1.1) * 0.1
        : Math.sin(x * 0.39 + y * 0.27) * Math.sin(y * 0.52 - x * 0.09) * 0.025;
      const v = Math.round(255 * (0.72 + noise * 0.22 + broad + scratch));
      const i = (y * size + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = Math.max(0, Math.min(255, v));
      data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

function glowTexture() {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const r = Math.hypot((x + 0.5 - size / 2) / (size / 2), (y + 0.5 - size / 2) / (size / 2));
      const a = Math.pow(Math.max(0, 1 - r), 2.5);
      const i = (y * size + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = 255;
      data[i + 3] = Math.round(a * 255);
    }
  }
  const tex = new THREE.DataTexture(data, size, size);
  tex.magFilter = tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

function archStone(radius, thickness, angle, depth = 0.7) {
  const s = new THREE.Shape();
  s.moveTo(radius, 0);
  s.lineTo(radius + thickness, 0);
  s.absarc(0, 0, radius + thickness, 0, angle, false);
  s.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  s.absarc(0, 0, radius, angle, 0, true);
  const g = new THREE.ExtrudeGeometry(s, {
    depth,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    steps: 1,
    curveSegments: 3,
  });
  g.translate(0, 0, -depth / 2);
  g.clearGroups();
  return g;
}

function bannerGeometry() {
  const positions = [];
  const uv = [];
  const indices = [];
  const nx = 8;
  const ny = 14;
  for (let j = 0; j <= ny; j++) {
    for (let i = 0; i <= nx; i++) {
      const u = i / nx;
      const v = j / ny;
      const scallop = Math.abs(u - 0.5) * 0.46;
      positions.push((u - 0.5) * 1.2, -v * (2.2 - scallop), Math.sin(u * TAU * 1.7) * (0.025 + v * 0.13));
      uv.push(u, v);
      if (j < ny && i < nx) {
        const k = j * (nx + 1) + i;
        indices.push(k, k + 1, k + nx + 1, k + 1, k + nx + 2, k + nx + 1);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

function matrixAt(x, y, z, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz));
  return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(sx, sy, sz));
}

export function createWorld(scene,{fireEnabled=true}={}) {
  const rand = seeded(230619);
  const root = new THREE.Group();
  root.name = 'The Blackthorn Bastion';
  scene.add(root);
  const castleArt=createCastleArt(root);
  const colliders = [];
  const floors = [];
  const props = [];
  const woodenSurfaces = [];
  const occluders = [];
  const batches = new Map();
  const stoneMap = grainTexture(703);
  const glowMap = glowTexture();
  const woodMap = grainTexture(319, true);
  const materials = {
    masonry: new THREE.MeshStandardMaterial({ color: 0xb0b3b8, map: stoneMap, bumpMap: stoneMap, bumpScale: 0.055, roughness: 0.96 }),
    cutStone: new THREE.MeshStandardMaterial({ color: 0xa2aaaf, map: stoneMap, bumpMap: stoneMap, bumpScale: 0.03, roughness: 0.88 }),
    base: new THREE.MeshStandardMaterial({ color: 0x26303c, map: stoneMap, roughness: 1 }),
    metal: new THREE.MeshStandardMaterial({ color: 0x3c4853, metalness: 0.78, roughness: 0.57 }),
    bronze: new THREE.MeshStandardMaterial({ color: 0xa28048, metalness: 0.73, roughness: 0.47 }),
    paleGold: new THREE.MeshStandardMaterial({ color: 0xc9aa70, metalness: 0.8, roughness: 0.32 }),
    darkWood: new THREE.MeshStandardMaterial({ color: 0x51413b, map: woodMap, roughness: 0.94 }),
    banner: new THREE.MeshStandardMaterial({ color: 0x711d3b, roughness: 1, side: THREE.DoubleSide }),
    textile: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, side: THREE.DoubleSide }),
    garden: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .94 }),
    glass: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive:0x839da0,emissiveIntensity:.24,roughness:.35,metalness:.18,side:THREE.DoubleSide }),
    shadow: new THREE.MeshBasicMaterial({ color: 0x080d16, transparent: true, opacity: 0.3, depthWrite: false }),
    flame: new THREE.MeshBasicMaterial({ color: 0xffa23d, toneMapped: false }),
    flameCore: new THREE.MeshBasicMaterial({ color: 0xffecd0, toneMapped: false }),
    rune: new THREE.MeshBasicMaterial({ color: 0x9972ff, transparent: true, opacity: 0.66, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false }),
    distant: new THREE.MeshStandardMaterial({ color: 0x192b3b, roughness: 1 }),
    stainedGlass: new THREE.MeshStandardMaterial({ color: 0x292355, emissive: 0x563890, emissiveIntensity: 0.45, roughness: 0.36, metalness: 0.25 }),
  };
  dressSiegeMaterials(materials);
  const geo = {
    block: beveledBox(),
    cube: new THREE.BoxGeometry(1, 1, 1),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 12),
    cone: new THREE.CylinderGeometry(0, 1, 1, 8),
    oct: new THREE.OctahedronGeometry(1),
    rock: new THREE.DodecahedronGeometry(1, 0),
    orb: new THREE.SphereGeometry(1, 7, 5),
    torus: new THREE.TorusGeometry(1, 0.08, 5, 24),
    shadow: new THREE.CircleGeometry(1, 24),
    banner: bannerGeometry(),
  };

  function add(key, geometry, material, transform, color) {
    if(positionScale!==1){transform=transform.clone();transform.elements[12]*=positionScale;transform.elements[14]*=positionScale;}
    // Keep the original geometry/materials, but give each nearby group its own
    // bounds. One castle-wide instance bound used to submit every stone to
    // both the camera and shadow pass, even several rooms away.
    const cell = `${Math.floor(transform.elements[12] / 12)},${Math.floor(transform.elements[14] / 12)}`;
    const castShadow=!/distant|contact|inlay|candle/.test(key),receiveShadow=!/distant|contact|candle/.test(key);
    const occluder=key.startsWith('arch-')&&key!=='arch-crown';
    const batchKey = `${geometry.id}:${material.id}:${+castShadow}${+receiveShadow}${+occluder}@${cell}`;
    if (!batches.has(batchKey)) batches.set(batchKey, { key, castShadow, receiveShadow, occluder, geometry, material, matrices: [], colors: [] });
    const batch = batches.get(batchKey);
    batch.matrices.push(transform);
    batch.colors.push(color === undefined ? null : new THREE.Color(color));
    return { key: batchKey, index: batch.matrices.length - 1 };
  }

  function box(x, y, z, w, h, d, color = 0x69717a, mat = 'masonry', ry = 0, key = mat) {
    const instance=add(key, geo.block, materials[mat], matrixAt(x, y, z, w, h, d, 0, ry), color);
    if(mat==='darkWood')woodenSurfaces.push({id:`wood-${woodenSurfaces.length}`,...instance,position:new THREE.Vector3(x*positionScale,y,z*positionScale),ext:new THREE.Vector3(w/2,h/2,d/2),flammable:true,woodFraction:1,baseColor:new THREE.Color(color),rotation:ry});
  }

  function cylinder(x, y, z, radius, height, color = 0x899099, mat = 'cutStone', key = `${mat}-cylinder`) {
    add(key, geo.cylinder, materials[mat], matrixAt(x, y, z, radius, height, radius), color);
  }

  function collider(x, y, z, w, h, d, tag) {
    colliders.push({ x:x*positionScale, y, z:z*positionScale, w, h, d, tag });
  }

  function shade(base, spread = 0.13) {
    return new THREE.Color(base).multiplyScalar(1 - spread / 2 + rand() * spread);
  }

  function floor(x0, x1, z0, z1, color, zone) {
    floors.push({ x: (x0 + x1) / 2, y: -0.3, z: (z0 + z1) / 2, w: x1 - x0, h: 0.6, d: z1 - z0, tag: zone });
    box((x0 + x1) / 2, -0.35, (z0 + z1) / 2, x1 - x0, 0.7, z1 - z0, 0x454c57, 'base');
    castleArt.surface({id:zone,x:x0,z:z0,w:x1-x0,d:z1-z0});
    // Dressed edge stones give the material transition actual depth. Centres
    // remain continuous physical floors for feet, rolling objects and engine.
    if(zone!=='bridge')for(const s of [-1,1]){
      box((x0+x1)/2,.008,s<0?z0+.16:z1-.16,x1-x0,.035,.29,roomArt(zone).tone,'cutStone',0,'floor-inlay');
      box(s<0?x0+.16:x1-.16,.008,(z0+z1)/2,.29,.035,z1-z0,roomArt(zone).tone,'cutStone',0,'floor-inlay');
    }
  }

  let positionScale=1;
  for(const r of existingRooms)floor(r.x,r.x+r.w,r.z,r.z+r.d,({courtyard:0x53616c,hall:0x63616c,crypt:0x45475b,bridge:0x636a73})[r.id],r.id);
  for(const r of newRooms)floor(r.x,r.x+r.w,r.z,r.z+r.d,r.boss?0x555166:0x53616c,r.id);
  for(const r of corridors)floor(r.x,r.x+r.w,r.z,r.z+r.d,0x56636d,'bridge');
  for(const r of secretAreas)floor(r.x,r.x+r.w,r.z,r.z+r.d,0x45475b,r.id);
  positionScale=layoutScale;

  // Deep, layered foundations make the castle feel built into a cliff.
  for (const side of [-1, 1]) {
    for (let z = -21; z < 20; z += 3.3) {
      const width = z < -10 ? 7 : z < 4 ? 10 : 12;
      add('foundation-rock', geo.rock, materials.base,
        matrixAt(side * (width - 0.5), (greekEnabled?-6.4:-3.2) - rand() * 1.5, z, 2.1 + rand(), 4.7 + rand() * 2, 2.6, 0, rand() * TAU), shade(0x313a48, 0.32));
      box(side * (width - 0.35), -1.0, z, 1.35, 1.6, 3.45, 0x39424f, 'base');
    }
  }
  for (let z = 20.7; z < 27; z += 1.55) {
    box(0, -0.68, z, 5.9, 0.35, 0.24, 0x514737, 'darkWood');
  }

  // A wall has an unbroken physical core and individually dressed stones.
  function wall(x,z,length,...rest){const s=positionScale;return atLayoutPoint(wallShape,x,z,[length*s,...rest]);}
  function wallShape(x, z, length, height, alongX, { low = false, tag = 'wall', thickness = 0.8, crenels = false, room='bridge' } = {}) {
    if(greekEnabled){const h=low?Math.min(height,1.08):height;collider(x,h/2,z,alongX?length:.8,h,alongX?.8:length,tag);greekWall(root,x,z,length,h,alongX,room);return;}
    const style=wallArt(room);
    const actualH = low ? Math.min(height, 1.08) : height;
    collider(x, actualH / 2, z, alongX ? length : thickness, actualH, alongX ? thickness : length, tag);
    box(x, actualH / 2 - 0.025, z, alongX ? length : thickness - 0.06, actualH, alongX ? thickness - 0.06 : length, style.base, 'base');
    const rows = Math.max(2, Math.ceil(actualH / style.course));
    const course = actualH / rows;
    for (let row = 0; row < rows; row++) {
      let at = -length / 2;
      while (at < length / 2 - 0.025) {
        const raw = (at===-length/2&&row%2?.5:1)*style.block*(.75+rand()*.45);
        const len = Math.min(raw, length / 2 - at);
        const center = at + len / 2;
        box(x + (alongX ? center : 0), row * course + course / 2, z + (alongX ? 0 : center),
          alongX ? len - 0.028 : thickness + (rand() - 0.5) * 0.09,
          course - 0.03,
          alongX ? thickness + (rand() - 0.5) * 0.09 : len - 0.028,
          shade(row < 1 ? style.base : style.stone, style.variation));
        at += raw;
      }
    }
    // Dressed courses and carved piers also apply to screens and parapets.
    for(const [y,h,depth,color] of [[.15,.22,.9,style.base],[actualH-.19,.10,.86,style.trim],[actualH+.015,.13,.96,style.trim],[actualH+.10,.04,.84,style.stone]]){
      box(x,y,z,alongX?length:depth,h,alongX?depth:length,color,'cutStone',0,'gothic-wall-courses');
    }
    const piers=Math.max(1,Math.floor(length/3.3));
    for(let i=0;i<=piers;i++){
      const at=-length/2+.26+(length-.52)*i/piers,px=x+(alongX?at:0),pz=z+(alongX?0:at);
      if(length<.85)continue;
      box(px,actualH/2,pz,alongX?.32:.89,actualH,alongX?.89:.32,style.iron?0x606a6a:style.trim,style.wood?'darkWood':style.iron?'metal':'cutStone',0,'gothic-wall-piers');
      for(const y of [.24,actualH-.34])box(px,y,pz,alongX?.52:.98,.14,alongX?.98:.52,style.trim,'cutStone',0,'gothic-wall-capitals');
      if(style.iron)for(const y of [.47,actualH-.58])for(const sign of [-1,1]){
        const rx=px+(alongX?0:sign*.46),rz=pz+(alongX?sign*.46:0);
        add('gothic-wall-rivets',geo.orb,materials.metal,matrixAt(rx,y,rz,.045,.045,.045),0xb2b7ab);
      }
    }
    if (crenels && !low) {
      for (let at = -length / 2 + 0.55; at < length / 2; at += 1.95) {
        box(x + (alongX ? at : 0), actualH + 0.45, z + (alongX ? 0 : at), alongX ? 0.92 : thickness + 0.02, 0.65, alongX ? thickness + 0.02 : 0.92, shade(style.stone));
        box(x + (alongX ? at : 0), actualH + 0.8, z + (alongX ? 0 : at), alongX ? 1.04 : thickness + 0.14, 0.12, alongX ? thickness + 0.14 : 1.04, style.trim, 'cutStone');
      }
    }
  }

  positionScale=1;
  const boundary=castleBoundaries([...existingRooms,...newRooms,...corridors,...secretAreas]);
  for(const edge of boundary){
    const alongX=edge.axis==='x',mid=(edge.lo+edge.hi)/2,at=edge.at+edge.normal*.4;
    const bridge=edge.room==='bridge',courtyard=edge.room==='courtyard';
    const low=bridge||courtyard&&alongX;
    const height=bridge?.66:low?1.05:courtyard?(siegeEnabled?4.5:3):edge.room==='crypt'&&alongX?5.4:3.65;
    wall(alongX?mid:at,alongX?at:mid,edge.hi-edge.lo,height,alongX,
      {low,crenels:courtyard&&!low,tag:'wall',room:edge.room});
  }
  // Narrow, offset alcoves sit behind the room's furniture and wall returns.
  for(const r of secretAreas){
    const opening=greekEnabled&&r.id!=='library-secret'?2.1:1.65,span=r.axis==='z'?r.d:r.w,section=(span-opening)/2;
    for(const sign of [-1,1]){
      const offset=sign*(opening/2+section/2);
      wall(r.entrance.x+(r.axis==='x'?offset:0),r.entrance.z+(r.axis==='z'?offset:0),section,3.65,r.axis==='x',{room:r.parent});
    }
    prop(r.axis==='x'?'urn':'crate',r.axis==='z'?r.x+1:r.x+.5,r.axis==='z'?r.z+.7:r.z+.65,.1);
    cylinder(r.loot.x,.15,r.loot.z,.42,.3,0x827753,'bronze');
  }
  positionScale=layoutScale;
  if(!greekEnabled)for (const side of [-1, 1]) {
    wall(side * 7.3, 4, 9.4, 1.2, true, { low: true, tag: 'courtyard-screen',room:'courtyard' });
    wall(side * 6.3, -10, 7.4, 1.1, true, { low: true, tag: 'hall-screen',room:'hall' });
  }

  function atLayoutPoint(fn,x,z,args){const previous=positionScale;positionScale=1;try{return fn(x*previous,z*previous,...args);}finally{positionScale=previous;}}
  function buttress(x,z,...rest){return atLayoutPoint(buttressShape,x,z,rest);}
  function buttressShape(x, z, ry) {
    if(greekEnabled){greekColumn(root,x,z,3.5);return;}
    box(x, 0.32, z, 1.5, 0.64, 1.35, 0x48535f, 'masonry', ry);
    box(x, 1.48, z, 1.02, 2.0, 1.05, 0x66717d, 'masonry', ry);
    box(x, 2.58, z, 1.15, 0.2, 1.2, 0x89919b, 'cutStone', ry);
    add('buttress-points', geo.cone, materials.cutStone, matrixAt(x, 3.1, z, 0.63, 0.88, 0.63, 0, PI / 4 + ry), 0x74808d);
  }

  for (const side of [-1, 1]) {
    for (const z of [6.2, 11.9, 17.9]) buttress(side * 12.8, z, 0);
    for (const z of [-8, -1.8, 2.5]) buttress(side * 10.8, z, 0);
    for (const z of [-21.8, -16, -11.3]) buttress(side * 7.8, z, 0);
  }

  function pillar(x,z,...rest){return atLayoutPoint(pillarShape,x,z,rest);}
  function pillarShape(x, z, height = 3.7, radius = 0.38, physical = true) {
    if (physical) collider(x, height / 2, z, radius * 2 + 0.45, height, radius * 2 + 0.45, 'pillar');
    if(greekColumn(root,x,z,height))return;
    box(x, 0.12, z, radius * 2 + 0.48, 0.24, radius * 2 + 0.48, 0x727c88, 'cutStone');
    cylinder(x, 0.32, z, radius + 0.16, 0.18, 0x808b97);
    cylinder(x, height / 2, z, radius, height - 0.67, 0x8a929c);
    for (let i = 0; i < 8; i++) {
      const a = i * TAU / 8;
      cylinder(x + Math.cos(a) * radius * 0.81, height / 2, z + Math.sin(a) * radius * 0.81, radius * 0.115, height - 0.82, 0x697482, 'cutStone', 'column-fluting');
    }
    cylinder(x, height - 0.3, z, radius + 0.08, 0.15, 0x939ba6);
    box(x, height - 0.1, z, radius * 2 + 0.42, 0.28, radius * 2 + 0.42, 0x9ca2a8, 'cutStone');
    add('column-contact', geo.shadow, materials.shadow, matrixAt(x, 0.025, z, radius * 1.9, radius * 1.9, 1, -PI / 2));
  }

  for (const x of [-6.75, 6.75]) {
    for (const z of [-6.85, 2.0]) pillar(x, z, 4.1);
  }
  for (const x of [-9.15, 9.15]) pillar(x, 6.5, 3.45, 0.35);

  const archKeys = [];
  function pointedArch(x,z,...rest){return atLayoutPoint(archShape,x,z,rest);}
  function archShape(x, z, span, spring, rise, key, { physical = true, scale = 1 } = {}) {
    if(greekEnabled){if(key==='great-hall'||key==='crypt-gate')return key;for(const side of [-1,1])pillar(x+side*(span/2+.6),z,3.6,.38,physical);return key;}
    const a = span / 2;
    const radius = (a * a + rise * rise) / (2 * a);
    const cx = a - radius;
    const angle = Math.acos(-cx / radius);
    const pieces = 10;
    const wedge = archStone(radius, 0.36 * scale, angle / pieces - 0.008, 0.65 * scale);
    const material = materials.cutStone.clone();
    material.transparent = true;
    const id = `arch-${key}`;
    archKeys.push(id);
    for (const side of [-1, 1]) {
      // The widest base stays outside the agreed 5.2 m clear doorway.
      pillar(x + side * (a + 0.53 * scale), z, spring + 0.07, 0.3 * scale, physical);
      for (let i = 0; i < pieces; i++) {
        const theta = side > 0 ? i * angle / pieces : PI - (i + 1) * angle / pieces;
        const m = matrixAt(x + (side > 0 ? cx : -cx), spring, z, 1, 1, 1, 0, 0, theta);
        add(id, wedge, material, m, shade(0x9296a1, 0.18));
      }
    }
    add('arch-crown', geo.oct, materials.bronze, matrixAt(x, spring + rise + 0.12, z + 0.02, 0.24 * scale, 0.48 * scale, 0.32 * scale), 0xbaa77b);
    return id;
  }

  pointedArch(0, 20.45, 5.2, 2.05, 2.5, 'outer-gate');
  pointedArch(0, 4, 5.2, 2.6, 3.0, 'great-hall');
  pointedArch(0, -10, 5.2, 2.4, 2.8, 'crypt-gate');
  pointedArch(0, -23.04, 3.35, 2.25, 2.8, 'reliquary', { physical: false, scale: 0.86 });

  // Tall lancet windows and leaded panes give the far crypt wall its silhouette.
  if(!greekEnabled)for (const x of [-4.65, 4.65]) {
    box(x, 3.0, -22.97, 1.26, 3.25, 0.11, 0x101723, 'base');
    box(x, 3.0, -22.88, 0.84, 2.85, 0.045, 0x6b4e94, 'stainedGlass');
    box(x, 2.9, -22.82, 0.07, 2.9, 0.06, 0x5d555e, 'metal');
    for (const y of [2.1, 3.0, 3.9]) box(x, y, -22.81, 1.0, 0.065, 0.06, 0x5d555e, 'metal');
    box(x, 1.48, -22.83, 1.5, 0.17, 0.4, 0x88919a, 'cutStone');
    add('window-finials', geo.cone, materials.cutStone, matrixAt(x, 4.95, -22.87, 0.73, 0.74, 0.16, 0, PI / 4), 0x93949f);
  }

  // Fabric is actually folded geometry, with a metal hanging bar and crest.
  const banners = [
    [-11.91, 11.6, PI / 2], [11.91, 11.6, -PI / 2],
    [-9.91, -3.25, PI / 2], [9.91, -3.25, -PI / 2],
    [-5.0, -22.81, 0], [5.0, -22.81, 0],
  ];
  for (let i = 0; i < banners.length; i++) {
    const [x, z, ry] = banners[i];
    const y = i > 3 ? 3.65 : 3.17;
    add('cloth-banners', geo.banner, materials.banner, matrixAt(x, y, z, 1, 1, 1, 0, ry), i > 3 ? 0x55416e : 0x982c50);
    box(x, y + 0.045, z, 1.42, 0.085, 0.085, 0x8a7956, 'bronze', ry);
    const crest = new THREE.Vector3(0, -0.68, 0.105).applyAxisAngle(Y_AXIS, ry);
    add('banner-emblems', geo.oct, materials.paleGold, matrixAt(x + crest.x, y + crest.y, z + crest.z, 0.2, 0.32, 0.028, 0, ry), 0xbda377);
  }

  // Monuments provide cover south of the side entrances, leaving engine clearance.
  for (const side of [-1, 1]) {
    const x = side * 5.22,z=-13.5;
    collider(x, 0.49, z, 1.65, 0.98, 3.36, 'sarcophagus');
    box(x, 0.12, z, 1.65, 0.24, 3.36, 0x5c626e, 'cutStone');
    box(x, 0.46, z, 1.35, 0.5, 3.08, 0x676878, 'cutStone');
    box(x, 0.8, z, 1.49, 0.2, 3.18, 0x9492a1, 'cutStone');
    box(x, 0.92, z-.05, 0.075, 0.07, 1.8, 0x8b794f, 'bronze');
    box(x, 0.92, z+.33, 0.77, 0.07, 0.075, 0x8b794f, 'bronze');
    for (const zz of [z-1,z+1]) {
      add('coffin-handles', geo.torus, materials.bronze, matrixAt(x - side * 0.69, 0.45, zz, 0.13, 0.17, 0.12, 0, PI / 2), 0x8f7b54);
    }
    // Weathered robed sentinel: folded mantle, recessed hood, stone sword.
    const sz = -21.23;
    collider(side * 5.08, 1.35, sz, 1.22, 2.7, 1.2, 'sentinel');
    box(side * 5.08, 0.19, sz, 1.5, 0.38, 1.42, 0x646878, 'cutStone');
    add('sentinel-mantles', new THREE.CylinderGeometry(0.24, 0.54, 1.65, 8), materials.cutStone, matrixAt(side * 5.08, 1.2, sz), 0x727480);
    add('sentinel-hoods', geo.rock, materials.cutStone, matrixAt(side * 5.08, 2.22, sz, 0.32, 0.46, 0.3), 0x92919d);
    add('sentinel-faces', geo.orb, materials.base, matrixAt(side * 5.08, 2.21, sz + 0.223, 0.18, 0.25, 0.07), 0x111524);
    box(side * 5.08, 1.08, sz + 0.48, 0.09, 1.52, 0.075, 0xb0a695, 'metal');
    box(side * 5.08, 1.53, sz + 0.48, 0.55, 0.085, 0.09, 0x8f845b, 'bronze');
    for (const hand of [-1, 1]) add('sentinel-hands', geo.orb, materials.cutStone, matrixAt(side * 5.08 + hand * 0.14, 1.58, sz + 0.41, 0.14, 0.13, 0.15), 0x888792);
  }

  // Scattered rubble is cosmetic only outside the walkable perimeter.
  for (let i = 0; i < 85; i++) {
    const z = -22 + rand() * 42;
    const edge = z < -10 ? 7 : z < 4 ? 10 : 12;
    const side = rand() > 0.5 ? 1 : -1;
    const s = 0.15 + rand() * 0.34;
    add('edge-rubble', geo.rock, materials.masonry, matrixAt(side * (edge + 0.6 + rand() * 1.1), -0.55 + rand() * 0.25, z, s, s * 0.7, s, rand(), rand(), rand()), shade(0x596470, 0.3));
  }

  // Distant towers are silhouette scenery; nothing lies inside the playable area.
  for (let i = 0; i < 12; i++) {
    const side = i % 2 ? -1 : 1;
    const x = side * (62 + rand() * 16);
    const z = -10 - rand() * 44;
    const h = 5 + rand() * 13;
    const r = 1.15 + rand() * 1.2;
    add('distant-towers', geo.cylinder, materials.distant, matrixAt(x, h / 2 - 5, z, r, h, r), shade(0x364356, 0.15));
    if(!greekEnabled)add('distant-spires', geo.cone, materials.distant, matrixAt(x, h - 5 + r * 1.55, z, r * 1.3, r * 3.1, r * 1.3, 0, rand()), 0x1e2b40);
    box(x, h - 5, z, r * 2.25, 0.5, r * 2.25, 0x344256, 'distant', 0, 'distant-crowns');
  }

  const torchPositions = [];
  const torches = [];
  function torch(x,z,...rest){return atLayoutPoint(torchShape,x,z,rest);}
  function torchShape(x, z, y = 2.5, facing = 0, large = false, infinite = false) {
    const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, facing);
    const s = large ? 1.45 : 1;
    box(x - forward.x * 0.16, y - 0.41, z - forward.z * 0.16, 0.17 * s, 0.65 * s, 0.16 * s, 0x28343e, 'metal', facing);
    cylinder(x, y - 0.2, z, 0.14 * s, 0.27 * s, siegeEnabled?0x353331:0x8d7246, siegeEnabled?'metal':'bronze');
    cylinder(x, y - 0.055, z, 0.235 * s, 0.09 * s, siegeEnabled?0x353331:0x9f8251, siegeEnabled?'metal':'bronze');
    if(siegeEnabled)for(const yy of [y+.04*s,y+.25*s])add('torch-iron-hoops',geo.torus,materials.metal,matrixAt(x,yy,z,.22*s,.22*s,.22*s,PI/2),0x45423b);
    for (let a = 0; a < (siegeEnabled?8:4); a++) {
      const ang = a * PI / (siegeEnabled?4:2);
      box(x + Math.cos(ang) * 0.18 * s, y + 0.11 * s, z + Math.sin(ang) * 0.18 * s, 0.035, 0.34 * s, 0.035, siegeEnabled?0x45423b:0x6e5a3c, siegeEnabled?'metal':'bronze');
    }
    torchPositions.push(new THREE.Vector3(x, y + 0.27 * s, z));
    torches.push({id:torches.length,position:torchPositions.at(-1),lit:true,infinite,kind:infinite?'pylon':'torch'});
  }

  for (const side of [-1, 1]) {
    torch(side * (fireEnabled?11.4:11.86), 8.2, 2.35, -side * PI / 2);
    torch(side * (fireEnabled?11.4:11.86), 17.0, 2.35, -side * PI / 2);
    torch(side * (fireEnabled?9.4:9.87), -6.7, 2.8, -side * PI / 2);
    torch(side * (fireEnabled?9.4:9.87), 1.15, 2.8, -side * PI / 2);
    torch(side * (fireEnabled?6.4:6.86), -12.65, 2.65, -side * PI / 2);
    torch(side * 3.8, fireEnabled?-22.4:-22.76, 2.3, 0);
    // The sample fixture faces the courtyard; its original decorative flame
    // sits inside the gate pillar's collision volume.
    torch(side * 3.2, fireEnabled?19.72:20.76, 1.5, fireEnabled?PI:0, true);
  }

  // Matching stone/bronze architecture, one inexhaustible source per room.
  if(fireEnabled)for(const [x,z] of [[-7.2,8.5],[-6.4,-8.4],[5.8,-19.3]]){
    box(x,.1,z,1.05,.2,1.05,0x646b78,'cutStone');
    cylinder(x,.62,z,.3,.95,0x8a9097);
    cylinder(x,1.12,z,.4,.15,0xa28048,'bronze');
    box(x,.52,z,.64,.06,.64,0x987d50,'bronze');
    collider(x,.67,z,.95,1.34,.95,'fire-pylon');
    torch(x,z,1.48,0,true,true);
    add('pylon-runes',geo.torus,materials.flameCore,matrixAt(x,1.2,z,.29,.29,.29,PI/2));
  }

  positionScale=1;
  for(const room of newRooms){
    const cx=room.x+room.w/2,cz=room.z+room.d/2;
    for(const s of [-1,1]){
      const x=cx+s*(room.w/2-2.1),z=cz;
      pillar(x,room.z+2,3.5,.33);
      torch(x,z,2.3,-s*PI/2);
      prop(room.id==='prison'?'door':room.id==='library'?'urn':room.id==='armoury'?'shield':'barrel',x,room.z+room.d-2,.15*s);
      prop('crate',x,room.z+3.7,.25*s);prop('stone',cx+s*2.8,cz+2.5,.7);
      if(['library','armoury','forge'].includes(room.id)){
        const fz=cz-(room.id==='forge'||room.id==='library'&&s<0?2:3.5);
        collider(x,1,fz,1.2,2,2.2,'room-furniture');
        if(room.id==='forge'){
          // Brick hearth / steel anvil occupy the old furniture footprints.
          if(s<0){
            box(x,.17,fz,1.2,.34,2.2,0x71675b,'cutStone');
            for(const dz of [-.85,.85])box(x,1.02,fz+dz,1.12,1.7,.35,0x78624c,'masonry');
            box(x+s*.45,1.03,fz,.24,1.65,1.4,0x67594e,'masonry');
            box(x,.65,fz,.95,.12,1.35,0xeb6b2a,'flame');
            box(x,1.79,fz,1.25,.38,2.2,0x616c6d,'metal');
            for(let i=0;i<5;i++)box(x-s*.58,.8,fz-.65+i*.3,.065,.17,.07,0xffbd58,'flameCore');
          }else{
            cylinder(x,.42,fz,.52,.84,0x604b35,'darkWood');
            box(x,.96,fz,.82,.34,1.5,0x7d8585,'metal');
            box(x,1.21,fz,.9,.16,1.9,0xacb0a6,'metal');
            add('anvil-horn',geo.cone,materials.metal,matrixAt(x,1.13,fz+1,.24,.75,.24,PI/2),0xa8afab);
            box(x+.16,1.36,fz-.4,.18,.14,.6,0x80613c,'darkWood',.25);box(x+.12,1.4,fz-.63,.47,.24,.25,0x747d7d,'metal',.25);
          }
        }else{
          box(x+s*.48,1,fz,.16,2,2.2,0x4f443b,'darkWood');
          for(const dz of [-1.06,1.06])box(x,1,fz+dz,1.2,2,.13,0x81633f,'darkWood');
          for(const y of [.19,.78,1.37,1.96])box(x,y,fz,1.25,.1,2.3,0x967747,'darkWood');
          if(room.id==='library')for(let row=0;row<3;row++)for(let i=0;i<9;i++){
            const h=.29+(i*7%5)*.035,zz=fz-.89+i*.215,yy=.25+row*.59+h/2;
            box(x-s*.35,yy,zz,.6,h,.16,[0x8b4050,0x536e62,0xb39255,0x5c678a][(i+row)%4],'banner');
            for(const sign of [-1,1])box(x-s*.66,yy+sign*h*.3,zz,.016,.025,.15,0xc3ac72,'paleGold');
          }
          if(room.id==='armoury')for(let i=0;i<4;i++){
            const zz=fz-.72+i*.48;
            box(x-s*.6,1.32,zz,.075,.95,.12,0xbdc4c2,'metal');box(x-s*.6,.91,zz,.1,.055,.39,0xb8a47c,'bronze');box(x-s*.6,.76,zz,.1,.24,.085,0x5b4536,'darkWood');
          }
        }
      }
      if(['barracks','prison','gatehouse'].includes(room.id)){
        const bx=cx+s*(room.w/2-3),bz=cz+(room.id==='gatehouse'?3.5:5);
        collider(bx,.4,bz,1.5,.8,2.4,'bed');box(bx,.32,bz,1.6,.6,2.5,0x4d3f36,'darkWood');
        box(bx,.67,bz,1.35,.15,2.3,room.id==='prison'?0x93815d:room.id==='gatehouse'?0x963e39:0x526e55,'banner');box(bx,.8,bz- .75,1.1,.22,.58,0xb3ad94,'banner');
        if(room.id==='prison')for(let i=0;i<6;i++)box(bx+s*.75,1.13,bz-1.12+i*.44,.045,1.5,.045,0x727e7a,'metal');
        else for(const sign of [-1,1])box(bx,.81,bz+sign*1.2,1.63,.6,.12,0x796343,'darkWood');
      }
    }
    if(room.boss||room.id==='catacombs'){
      const ring=new THREE.Mesh(new THREE.RingGeometry(2.35,2.4,64),materials.rune);ring.rotation.x=-PI/2;ring.position.set(cx,.035,cz);root.add(ring);
      for(let i=0;i<8;i++){const a=i*TAU/8;box(cx+Math.sin(a)*1.7,.03,cz+Math.cos(a)*1.7,.07,.02,.5,0x9b73af,'bronze',a);}
    }
    // Vault line and dressed buttresses reuse the existing castle materials.
    for(const s of [-1,1])buttress(room.x+s*.1+(s>0?room.w:0),room.z+room.d-1,0);
  }
  positionScale=layoutScale;
  const flames = new THREE.InstancedMesh(geo.orb, materials.flame, torchPositions.length);
  const cores = new THREE.InstancedMesh(geo.orb, materials.flameCore, torchPositions.length);
  flames.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  cores.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  flames.frustumCulled = cores.frustumCulled = false;
  flames.name = 'Living torch flames';
  root.add(flames, cores);
  const siegeFire=siegeTorchFlames(root,torches);
  if(siegeFire)flames.visible=cores.visible=false;
  const torchGlowGeo = new THREE.BufferGeometry().setFromPoints(torchPositions);
  const torchGlowMat = new THREE.PointsMaterial({ color: 0xff8429, size: 1.95, map: glowMap, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const torchGlow = new THREE.Points(torchGlowGeo, torchGlowMat);
  root.add(torchGlow);
  function setTorchLit(id,lit){
    const torch=torches[id];if(!torch)return;
    torch.lit=!!lit;
    torchGlowGeo.attributes.position.setXYZ(id,torch.position.x,lit?torch.position.y:-100,torch.position.z);
    torchGlowGeo.attributes.position.needsUpdate=true;
  }
  const lights = [];
  for (const [x, y, z, power] of [[-8.7, 3.0, 12.7, 64], [8.7, 3.0, 12.7, 64], [-7.7, 3.0, -2.9, 53], [7.7, 3.0, -2.9, 53], [0, 3.5, -20.6, 41]]) {
    const light = new THREE.PointLight(0xffac5d, power, 14, 2);
    light.position.set(x, y, z);
    light.userData.baseIntensity = power;
    root.add(light);
    lights.push(light);
  }

  // Courtyard medallion: a worn compass cut into the flagstones.
  const mosaicGeo = [];
  for (const [r, width] of [[3.7, 0.04], [3.55, 0.03], [0.72, 0.045]]) {
    const g = new THREE.RingGeometry(r - width, r, 64);
    g.rotateX(-PI / 2);
    g.translate(0, 0.019, 11.7*layoutScale);
    mosaicGeo.push(g);
  }
  const mosaicMat = new THREE.MeshStandardMaterial({ color: 0x9b8c62, metalness: 0.6, roughness: 0.78, side: THREE.DoubleSide });
  const mosaic = new THREE.Mesh(mergeGeometries(mosaicGeo, false), mosaicMat);
  root.add(mosaic);
  mosaicGeo.forEach(g => g.dispose());
  for (let i = 0; i < 8; i++) {
    const a = i * TAU / 8;
    box(Math.sin(a) * 2.1, 0.019, 11.7 + Math.cos(a) * 2.1, 0.045, 0.015, 1.95, 0x827753, 'bronze', a, 'floor-inlay');
  }

  const relic = new THREE.Group();
  relic.name = 'The Obsidian Sceptre';
  relic.position.set(0, 0, -19*layoutScale);
  root.add(relic);
  collider(0, 0.4, -19, 1.85, 0.8, 1.85, 'relic-pedestal');
  const plinthMat = materials.cutStone.clone();
  plinthMat.color.set(0x555169);
  function relicCylinder(r, h, y, material, radial = 8) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.03, h, radial), material);
    m.position.y = y;
    m.receiveShadow = m.castShadow = true;
    relic.add(m);
    return m;
  }
  relicCylinder(1.09, 0.18, 0.09, plinthMat);
  relicCylinder(0.86, 0.46, 0.39, plinthMat);
  relicCylinder(1.01, 0.15, 0.695, materials.metal);
  relicCylinder(0.89, 0.055, 0.792, materials.paleGold, 12);

  const sceptre = new THREE.Group();
  sceptre.name = 'Stealable relic';
  relic.add(sceptre);
  const shaftMat = new THREE.MeshStandardMaterial({ color: 0x1e1633, metalness: 0.73, roughness: 0.22 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.06, 1.62, 10), shaftMat);
  shaft.position.y = 1.77;
  sceptre.add(shaft);
  for (const y of [1.0, 1.22, 2.29, 2.56]) {
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.075, 8), materials.paleGold);
    band.position.y = y;
    sceptre.add(band);
  }
  const gemMat = new THREE.MeshStandardMaterial({ color: 0xb999ff, emissive: 0x8e39ff, emissiveIntensity: 3.0, metalness: 0.18, roughness: 0.13, toneMapped: false });
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.29), gemMat);
  gem.position.y = 2.74;
  gem.scale.y = 1.42;
  sceptre.add(gem);
  const jewelHalo = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.025, 6, 40), materials.paleGold);
  jewelHalo.position.y = 2.72;
  jewelHalo.rotation.x = 0.58;
  sceptre.add(jewelHalo);
  const gemGlow = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x9d61ff, map: glowMap, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
  gemGlow.position.y = 2.74;
  gemGlow.scale.set(2.6, 2.6, 1);
  sceptre.add(gemGlow);

  const ritual = new THREE.Group();
  ritual.position.set(0, 0.045, -19*layoutScale);
  ritual.name = 'The ward beneath the relic';
  root.add(ritual);
  const ringParts = [];
  for (const [r, w] of [[3.42, 0.023], [3.17, 0.04], [2.53, 0.022], [1.32, 0.034]]) {
    const g = new THREE.RingGeometry(r - w, r, 96);
    g.rotateX(-PI / 2);
    ringParts.push(g);
  }
  const ritualRings = new THREE.Mesh(mergeGeometries(ringParts, false), materials.rune);
  ritual.add(ritualRings);
  ringParts.forEach(g => g.dispose());
  const runeLines = [];
  const mark = (x1, z1, x2, z2) => runeLines.push(x1, 0.001, z1, x2, 0.001, z2);
  for (let i = 0; i < 24; i++) {
    const a = i * TAU / 24;
    const transform = (r, tangent = 0) => [Math.sin(a) * r + Math.cos(a) * tangent, Math.cos(a) * r - Math.sin(a) * tangent];
    const p = transform(2.77), q = transform(3.0);
    mark(...p, ...q);
    const p1 = transform(2.91, -0.065), q1 = transform(2.99, 0.065);
    mark(...p1, ...q1);
    if (i % 2 === 0) {
      const p2 = transform(2.78, -0.06), q2 = transform(2.84, 0.065);
      mark(...p2, ...q2);
    }
  }
  for (let i = 0; i < 6; i++) {
    const a = i * TAU / 6;
    const b = ((i + 2) % 6) * TAU / 6;
    mark(Math.sin(a) * 2.5, Math.cos(a) * 2.5, Math.sin(b) * 2.5, Math.cos(b) * 2.5);
  }
  const runeLineMat = new THREE.LineBasicMaterial({ color: 0x9b73ff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const runes = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(runeLines, 3)), runeLineMat);
  ritual.add(runes);

  const exit = new THREE.Group();
  exit.name = 'The escape rift';
  exit.position.set(0, 0, 23*layoutScale);
  root.add(exit);
  const exitMat = new THREE.MeshStandardMaterial({ color: 0x65747c, emissive: 0x3cdccc, emissiveIntensity: 0.18, metalness: 0.72, roughness: 0.32 });
  const exitRing = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.09, 8, 64), exitMat);
  exitRing.position.y = 1.68;
  exitRing.scale.y = 1.12;
  exit.add(exitRing);
  const exitInner = new THREE.Mesh(new THREE.TorusGeometry(1.44, 0.018, 5, 64), exitMat);
  exitInner.position.y = 1.68;
  exitInner.scale.y = 1.12;
  exit.add(exitInner);
  const portalMat = new THREE.MeshBasicMaterial({ color: 0x56f0d2, map: glowMap, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, toneMapped: false });
  const portal = new THREE.Mesh(new THREE.PlaneGeometry(3.18, 3.56), portalMat);
  portal.position.y = 1.68;
  exit.add(portal);
  for (const side of [-1, 1]) {
    pillar(side * 2.12, 23, 2.3, 0.23, true);
    add('exit-crystals', geo.oct, materials.stainedGlass, matrixAt(side * 2.12, 2.63, 23, 0.17, 0.33, 0.17), 0xa7b9e5);
  }
  const portalShards = new THREE.InstancedMesh(geo.oct, exitMat, 12);
  portalShards.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  portalShards.frustumCulled = false;
  exit.add(portalShards);

  // Candles are clustered in the crypt. Their low, warm wicks cost one draw.
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const x = side * (2.05 + rand() * 0.85);
      const z = -20.35 + rand() * 2.2;
      const h = 0.12 + rand() * 0.3;
      cylinder(x, h / 2, z, 0.045 + rand() * 0.02, h, 0xc1b294, 'cutStone', 'candle-wax');
      add('candle-flames', geo.orb, materials.flameCore, matrixAt(x, h + 0.047, z, 0.025, 0.065, 0.025), 0xffc36e);
    }
  }

  function prop(kind, x, z, rotation = 0) {
    const spec = PROP_SPECS[kind];
    props.push({ kind, x:x*positionScale, y: spec.h / 2 + 0.025, z:z*positionScale, rotation, mass: spec.mass, w: spec.w, h: spec.h, d: spec.d });
  }
  // The first six objects are deliberately within reach of the opening skirmish.
  prop('crate', -3.8, 17.0, 0.14);
  prop('barrel', 3.8, 16.8, 0.3);
  prop('stone', -2.7, 14.9, 0.7);
  prop('shield', 4.65, 13.45, -0.35);
  prop('urn', 6.0, 17.6, 0.2);
  prop('crate', -6.35, 17.3, -0.15);
  for (const p of [
    ['barrel', -9.7, 13.8, 0.1], ['barrel', -8.5, 14.55, 0.2],
    ['crate', -9.7, 11.65, 0.35], ['crate', -8.3, 11.2, -0.1],
    ['door', -6.1, 9.65, 0.2], ['stone', -3.6, 8.1, 0.7],
    ['urn', 10.4, 9.7, 0.1], ['crate', 7.6, 8.5, 0.1],
    ['barrel', 8.9, 8.5, -0.2], ['stone', 4.1, 6.55, 0.4],
    ['shield', -4.45, 5.3, -0.2], ['barrel', 10.15, 15.0, 0.1],
    ['crate', -8.35, 0.75, 0.1], ['urn', -8.25, -2.2, 0.1],
    ['barrel', -5.45, -2.5, -0.3], ['stone', -3.75, 0.4, 0.3],
    ['crate', 4.55, 1.45, -0.2], ['shield', 7.85, 0.5, 0.3],
    ['door', 7.7, -4.4, -0.15], ['crate', 8.5, -5.25, 0.1],
    ['barrel', 4.45, -6.3, -0.2], ['urn', -8.5, -7.75, -0.1],
    ['stone', -4.75, -7.5, 0.7], ['shield', 2.4, -8.2, -0.4],
    ['urn', -4.55, -11.8, 0.1], ['urn', 4.75, -11.85, -0.1],
    ['stone', -2.2, -14.2, 0.2], ['crate', 3.3, -13.75, -0.1],
    ['shield', -3.2, -17.6, 0.2], ['barrel', 3.65, -17.3, -0.1],
    ['urn', -2.8, -21.7, 0.4], ['urn', 2.8, -21.7, -0.4],
  ]) prop(...p);

  positionScale=1;
  const art=dressCastle({root,rooms:[...existingRooms,...newRooms],boundary,box,cylinder,add,geo,materials,matrixAt,collider});

  for (const [key, batch] of batches) {
    const mesh = new THREE.InstancedMesh(batch.geometry, batch.material, batch.matrices.length);
    mesh.name = `${batch.key}@${key.split('@').at(-1)}`;
    for (let i = 0; i < batch.matrices.length; i++) {
      mesh.setMatrixAt(i, batch.matrices[i]);
      if (batch.colors[i]) mesh.setColorAt(i, batch.colors[i]);
    }
    mesh.castShadow = batch.castShadow;
    mesh.receiveShadow = batch.receiveShadow;
    mesh.computeBoundingSphere();
    root.add(mesh);
    mesh.updateMatrixWorld(true);mesh.matrixAutoUpdate=false;mesh.matrixWorldAutoUpdate=false;
    for(const wood of woodenSurfaces)if(wood.key===key)wood.mesh=mesh;
    if (batch.occluder) {
      mesh.userData.occluder = true;
      occluders.push(mesh);
    }
  }

  const dustN = 230;
  const dustPositions = new Float32Array(dustN * 3);
  const dustPhase = new Float32Array(dustN);
  for (let i = 0; i < dustN; i++) {
    dustPositions[i * 3] = (rand() - 0.5) * 25;
    dustPositions[i * 3 + 1] = 0.4 + rand() * 6.8;
    dustPositions[i * 3 + 2] = -24 + rand() * 50;
    dustPhase[i] = rand() * TAU;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3).setUsage(THREE.DynamicDrawUsage));
  const dustMaterial = new THREE.PointsMaterial({ color: 0xb6c8f2, size: 0.105, map: glowMap, opacity: 0.5, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  dust.frustumCulled = false;
  root.add(dust);

  const temp = new THREE.Object3D();
  let alarm = false;
  let taken = false;
  function update(dt, time, focus) {
    const t = Number.isFinite(time) ? time : 0;
    const delta = Math.min(Number.isFinite(dt) ? dt : 0, 0.05);
    siegeFire?.update(t);
    // The accepted siege shader owns the visible flames. Its hidden legacy
    // meshes need no animation or instance-buffer writes.
    if(!siegeFire){
    for (let i = 0; i < torchPositions.length; i++) {
      const p = torchPositions[i];
      const f = torches[i].lit ? 0.84 + Math.sin(t * 11.6 + i * 8.3) * 0.1 + Math.sin(t * 23 + i) * 0.08 : 0;
      temp.position.set(p.x + Math.sin(t * 7 + i) * 0.034, p.y, p.z + Math.cos(t * 6 + i) * 0.025);
      temp.rotation.set(0.04 * Math.cos(t * 7 + i), 0, 0.12 * Math.sin(t * 8 + i));
      temp.scale.set(0.135 * f, 0.38 * f, 0.135 * f);
      temp.updateMatrix();
      flames.setMatrixAt(i, temp.matrix);
      temp.position.y -= 0.045;
      temp.scale.set(0.067 * f, 0.19 * f, 0.067 * f);
      temp.updateMatrix();
      cores.setMatrixAt(i, temp.matrix);
    }
    flames.instanceMatrix.needsUpdate = true;
    cores.instanceMatrix.needsUpdate = true;
    }
    if(focus){const positions=siegeEnabled?torches.filter(torch=>torch.lit).map(torch=>torch.position):torchPositions;const near=[...positions].sort((a,b)=>(a.x-focus.x)**2+(a.z-focus.z)**2-((b.x-focus.x)**2+(b.z-focus.z)**2));lights.forEach((light,i)=>{light.userData.sourceActive=!!near[i];if(near[i])light.position.copy(near[i]).add(new THREE.Vector3(0,.3,0));});}
    lights.forEach((light, i) => { light.intensity = (light.userData.sourceActive===false?0:1)*light.userData.baseIntensity * (0.93 + Math.sin(t * 7.7 + i * 3.7) * 0.045 + Math.sin(t * 17.5 + i) * 0.035); });
    sceptre.position.y = Math.sin(t * 1.65) * 0.095;
    sceptre.rotation.y = t * 0.36;
    gem.rotation.y = t * 0.9;
    jewelHalo.rotation.z = t * 0.28;
    gemMat.emissiveIntensity = 2.45 + Math.sin(t * 2.6) * 0.65;
    ritual.rotation.y = t * 0.012;
    materials.rune.opacity = (taken ? 0.19 : 0.48) + Math.sin(t * 1.9) * 0.085;
    runeLineMat.opacity = taken ? 0.19 : 0.53 + Math.sin(t * 1.9 + 0.5) * 0.14;
    portalMat.opacity = taken ? 0.55 + Math.sin(t * 2.3) * 0.12 : 0.08;
    portal.rotation.z = t * 0.12;
    exitInner.rotation.z = -t * (taken ? 0.7 : 0.07);
    for (let i = 0; i < 12; i++) {
      const a = i * TAU / 12 + t * (taken ? 0.25 : 0.035);
      const radius = 1.7 + Math.sin(t * 1.4 + i) * 0.045;
      temp.position.set(Math.cos(a) * radius, 1.68 + Math.sin(a) * radius * 1.12, 0);
      temp.rotation.set(t * 0.4, t * 0.2 + i, a);
      temp.scale.setScalar(taken ? 0.075 : 0.05);
      temp.updateMatrix();
      portalShards.setMatrixAt(i, temp.matrix);
    }
    portalShards.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < dustN; i++) {
      const k = i * 3;
      dustPositions[k] += Math.sin(t * 0.23 + dustPhase[i]) * delta * 0.028;
      dustPositions[k + 1] += (0.016 + Math.sin(t * 0.4 + dustPhase[i]) * 0.009) * delta;
      if (dustPositions[k + 1] > 7.2) dustPositions[k + 1] = 0.3;
    }
    dustGeometry.attributes.position.needsUpdate = true;
  }

  function setAlarm(value) {
    alarm = Boolean(value);
    materials.flame.color.set(alarm ? 0xff733c : 0xffa23d);
    torchGlowMat.color.set(alarm ? 0xff533e : 0xff8429);
    dustMaterial.color.set(alarm ? 0xe0afff : 0xb6c8f2);
    lights.forEach((light, i) => light.color.set(alarm && i % 2 === 0 ? 0xff7660 : 0xffac5d));
  }

  function setRelicTaken(value) {
    taken = Boolean(value);
    sceptre.visible = !taken;
    exitMat.emissiveIntensity = taken ? 2.1 : 0.18;
    exitMat.emissive.set(taken ? 0x36ffda : 0x3cdccc);
    materials.rune.color.set(taken ? 0xe257ba : 0x9972ff);
    runeLineMat.color.set(taken ? 0xdf64c2 : 0x9b73ff);
  }

  update(0, 0);
  return {
    root,
    colliders,
    floors,
    props,
    woodenSurfaces,
    torches,
    setTorchLit,
    resetWood(){for(const wood of woodenSurfaces){wood.burnUntil=0;wood.burnLastTime=undefined;wood.woodFuel=1;wood.woodExhausted=false;wood.mesh.setColorAt(wood.index,wood.baseColor);wood.mesh.instanceColor.needsUpdate=true;}},
    scorchWood(wood){wood.mesh.setColorAt(wood.index,wood.baseColor.clone().lerp(new THREE.Color(0x171311),1-(wood.woodFuel??1)));wood.mesh.instanceColor.needsUpdate=true;},
    rooms:[...existingRooms,...newRooms],
    art:art.rooms,
    secrets:secretAreas,
    doorways:[{x:0,z:20*layoutScale,rooms:['bridge','courtyard']},{x:0,z:4*layoutScale,rooms:['courtyard','hall']},{x:0,z:-10*layoutScale,rooms:['hall','crypt']},
      ...corridors.map(c=>({x:c.x+c.w/2,z:c.z+c.d/2,rooms:[c.from,c.to]}))],
    spawn: new THREE.Vector3(0, 0, 18*layoutScale),
    relic,
    exit,
    zones: [...secretAreas.map(r=>({...r,secret:true})),...existingRooms,...newRooms].map(r=>({name:r.id,label:r.label,secret:!!r.secret,xMin:r.x,xMax:r.x+r.w,zMin:r.z,zMax:r.z+r.d})),
    occluders,
    update,
    setAlarm,
    setRelicTaken,
    dispose() {
      siegeFire?.dispose();
      castleArt.dispose();
      scene.remove(root);
      const geometries = new Set();
      const mats = new Set();
      root.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        const list = Array.isArray(object.material) ? object.material : [object.material];
        list.forEach(m => { if (m) mats.add(m); });
      });
      geometries.forEach(g => g.dispose());
      mats.forEach(m => m.dispose());
      stoneMap.dispose();
      woodMap.dispose();
      glowMap.dispose();
    },
  };
}

const PROP_SPECS = {
  crate: { w: 0.98, h: 0.96, d: 0.98, mass: 19, health: 46, label: 'Κιβώτιο' },
  barrel: { w: 0.92, h: 1.22, d: 0.92, mass: 25, health: 58, label: 'Βαρέλι' },
  urn: { w: 0.8, h: 1.17, d: 0.67, mass: 12, health: 28, label: 'Τεφροδόχος' },
  stone: { w: 0.86, h: 0.59, d: 0.82, mass: 32, health: 105, label: 'Πέτρα' },
  door: { w: 1.23, h: 2.12, d: 0.28, mass: 34, health: 92, label: 'Πόρτα' },
  shield: { w: 0.9, h: 1.14, d: 0.29, mass: 9, health: 125, label: 'Ασπίδα' },
};

let propPrefabs;

function buildPropPrefabs() {
  const woodTex = grainTexture(643, true);
  const stoneTex = grainTexture(976);
  const mat = {
    wood: new THREE.MeshStandardMaterial({ color: 0x7c6146, map: woodTex, bumpMap: woodTex, bumpScale: 0.035, roughness: 0.9 }),
    woodDark: new THREE.MeshStandardMaterial({ color: 0x4d3e33, map: woodTex, roughness: 0.94 }),
    iron: new THREE.MeshStandardMaterial({ color: 0x5c6067, metalness: 0.74, roughness: 0.5 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xa58d56, metalness: 0.7, roughness: 0.52 }),
    ceramic: new THREE.MeshStandardMaterial({ color: 0x9296a0, map: stoneTex, roughness: 0.62 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x737b86, map: stoneTex, bumpMap: stoneTex, bumpScale: 0.08, roughness: 1, flatShading: true }),
    shield: new THREE.MeshStandardMaterial({ color: 0x6e3558, metalness: 0.47, roughness: 0.54 }),
  };
  const prefabs = {};
  const unit = beveledBox(0.035);

  function make(kind, callback) {
    const buckets = new Map();
    function piece(geometry, material, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
      const g = geometry.clone();
      g.applyMatrix4(matrixAt(x, y, z, sx, sy, sz, rx, ry, rz));
      g.clearGroups();
      if (!buckets.has(material)) buckets.set(material, []);
      buckets.get(material).push(g);
    }
    function block(material, x, y, z, w, h, d, rx = 0, ry = 0, rz = 0) { piece(unit, material, x, y, z, w, h, d, rx, ry, rz); }
    callback(piece, block);
    const group = new THREE.Group();
    group.name = `Telekinetic ${kind}`;
    for (const [material, parts] of buckets) {
      const normalised = parts.map(g => g.index ? g.toNonIndexed() : g);
      // Lathe and extruded geometries do not always share the same attributes.
      for (const g of normalised) {
        const count = g.attributes.position.count;
        if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
        if (!g.attributes.normal) g.computeVertexNormals();
      }
      const merged = mergeGeometries(normalised, false);
      const mesh = new THREE.Mesh(merged, material);
      mesh.castShadow = mesh.receiveShadow = true;
      group.add(mesh);
      new Set([...parts, ...normalised]).forEach(g => g.dispose());
    }
    prefabs[kind] = group;
  }

  make('crate', (piece, block) => {
    block(mat.woodDark, 0, 0, 0, 0.86, 0.84, 0.86);
    for (let i = 0; i < 5; i++) {
      const a = -0.354 + i * 0.177;
      for (const side of [-1, 1]) {
        block(mat.wood, a, 0, side * 0.439, 0.17, 0.85, 0.065);
        block(mat.wood, side * 0.439, 0, a, 0.065, 0.85, 0.17);
      }
      block(mat.wood, a, 0.442, 0, 0.17, 0.06, 0.87);
      block(mat.woodDark, a, -0.442, 0, 0.17, 0.06, 0.87);
    }
    for (const side of [-1, 1]) {
      for (const y of [-0.34, 0.34]) {
        block(mat.woodDark, 0, y, side * 0.465, 0.93, 0.105, 0.025);
        block(mat.woodDark, side * 0.465, y, 0, 0.025, 0.105, 0.93);
      }
      block(mat.woodDark, 0, 0, side * 0.465, 0.105, 1.15, 0.025, 0, 0, -0.72);
      for (const x of [-0.39, 0.39]) {
        for (const y of [-0.34, 0.34]) piece(new THREE.SphereGeometry(0.018, 5, 4), mat.iron, x, y, side * 0.481, 1, 1, 0.3);
      }
    }
  });

  make('barrel', (piece) => {
    const staves = 14;
    for (let i = 0; i < staves; i++) {
      const points = [];
      for (const [r, y] of [[0.325, -0.58], [0.378, -0.4], [0.44, 0], [0.378, 0.4], [0.325, 0.58]]) points.push(new THREE.Vector2(r, y));
      const angle = i * TAU / staves + 0.011;
      piece(new THREE.LatheGeometry(points, 2, angle, TAU / staves - 0.022), i % 4 === 0 ? mat.woodDark : mat.wood);
    }
    for (const y of [-0.585, 0.585]) piece(new THREE.CylinderGeometry(0.324, 0.324, 0.03, 14), mat.woodDark, 0, y, 0);
    for (const [y, r] of [[-0.47, 0.369], [-0.24, 0.421], [0.24, 0.421], [0.47, 0.369]]) {
      const pts = [new THREE.Vector2(r, -0.034), new THREE.Vector2(r + 0.012, -0.027), new THREE.Vector2(r + 0.012, 0.027), new THREE.Vector2(r, 0.034)];
      piece(new THREE.LatheGeometry(pts, 16), mat.iron, 0, y, 0);
    }
    for (let i = 0; i < 3; i++) {
      const z = (i - 1) * 0.155;
      piece(new THREE.BoxGeometry(0.57, 0.008, 0.008), mat.wood, 0, 0.603, z);
    }
  });

  make('urn', (piece) => {
    const points = [[0.15, -0.58], [0.2, -0.55], [0.18, -0.45], [0.2, -0.33], [0.315, -0.12], [0.32, 0.12], [0.25, 0.32], [0.15, 0.38], [0.145, 0.47], [0.23, 0.5], [0.23, 0.555], [0.18, 0.58], [0.145, 0.565], [0.145, 0.48]].map(([x, y]) => new THREE.Vector2(x, y));
    piece(new THREE.LatheGeometry(points, 20), mat.ceramic);
    for (const side of [-1, 1]) piece(new THREE.TorusGeometry(0.145, 0.032, 5, 14), mat.brass, side * 0.26, 0.16, 0, 0.7, 1.3, 1, 0, 0, side * 0.16);
    for (const [y, r] of [[-0.5, 0.182], [0.35, 0.2], [0.5, 0.229]]) piece(new THREE.TorusGeometry(r, 0.018, 5, 20), mat.brass, 0, y, 0, 1, 1, 1, PI / 2);
  });

  make('stone', (piece) => {
    const g = new THREE.DodecahedronGeometry(0.49, 0);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const f = 0.91 + Math.sin(x * 12.13 + y * 19.21 + z * 9.33) * 0.075;
      p.setXYZ(i, x * 0.96 * f, y * 0.65 * f, z * 0.9 * f);
    }
    g.computeVertexNormals();
    piece(g, mat.stone);
    g.dispose();
  });

  make('door', (piece, block) => {
    for (let i = 0; i < 6; i++) block(i % 3 === 0 ? mat.woodDark : mat.wood, -0.505 + i * 0.202, 0, 0, 0.192, 2.1, 0.16);
    for (const y of [-0.68, 0.63]) {
      block(mat.iron, 0, y, 0.088, 1.2, 0.12, 0.035);
      block(mat.woodDark, 0, y, -0.085, 1.18, 0.15, 0.035);
      for (const x of [-0.48, -0.2, 0.2, 0.48]) piece(new THREE.SphereGeometry(0.028, 6, 4), mat.iron, x, y, 0.112, 1, 1, 0.4);
    }
    block(mat.woodDark, 0, 0, -0.095, 0.12, 2.15, 0.035, 0, 0, -0.41);
    piece(new THREE.TorusGeometry(0.105, 0.027, 6, 16), mat.iron, 0.36, -0.02, 0.11);
    block(mat.iron, 0.36, 0.105, 0.097, 0.13, 0.15, 0.04);
  });

  make('shield', (piece, block) => {
    const s = new THREE.Shape();
    s.moveTo(-0.42, 0.45); s.lineTo(-0.3, 0.54); s.lineTo(0.3, 0.54); s.lineTo(0.42, 0.45); s.lineTo(0.37, -0.1); s.quadraticCurveTo(0.26, -0.38, 0, -0.55); s.quadraticCurveTo(-0.26, -0.38, -0.37, -0.1); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.015, bevelThickness: 0.015, steps: 1, curveSegments: 8 });
    g.translate(0, 0, -0.05);
    piece(g, mat.iron);
    piece(g, mat.shield, 0, 0, 0.028, 0.88, 0.9, 1);
    const boss = new THREE.SphereGeometry(0.15, 12, 8);
    piece(boss, mat.iron, 0, 0.05, 0.079, 1, 1, 0.42);
    block(mat.brass, 0, 0.05, 0.102, 0.055, 0.75, 0.022);
    block(mat.brass, 0, 0.18, 0.107, 0.57, 0.055, 0.022);
    for (const side of [-1, 1]) for (const y of [-0.02, 0.35]) piece(new THREE.SphereGeometry(0.018, 6, 4), mat.brass, side * (y > 0 ? 0.335 : 0.3), y, 0.071, 1, 1, 0.45);
    block(mat.woodDark, 0, 0.04, -0.09, 0.48, 0.11, 0.05);
    g.dispose();
    boss.dispose();
  });
  mat.wood.userData.wood=true;mat.woodDark.userData.wood=true;
  unit.dispose();
  return prefabs;
}

export function createPropMesh(kind) {
  const greek=greekProp(kind);if(greek)return greek;
  const safeKind = PROP_SPECS[kind] ? kind : 'crate';
  if (!propPrefabs) propPrefabs = buildPropPrefabs();
  const spec = PROP_SPECS[safeKind];
  const imported=siegeProp(safeKind,spec);if(imported)return imported;
  const mesh = propPrefabs[safeKind].clone(true);
  let flammable=false;
  mesh.traverse(o=>{if(o.material?.userData.wood){flammable=true;o.material=o.material.clone();o.material.userData.baseColor=o.material.color.clone();o.userData.ownedFireMaterial=true;}});
  mesh.userData.kind = safeKind;
  return {
    mesh,
    halfExtents: new THREE.Vector3(spec.w / 2, spec.h / 2, spec.d / 2),
    mass: spec.mass,
    health: spec.health,
    label: spec.label,
    flammable,
    woodFraction:safeKind==='shield'?.15:1,
  };
}
