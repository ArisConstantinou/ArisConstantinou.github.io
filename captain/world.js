import * as THREE from 'three';

// Navigation uses metres. +Z is the direction of the voyage, Y=0 is mean sea level.
// Geometry, weather, placement and material variation are deterministic.
const TAU = Math.PI * 2;
const HARBOR = Object.freeze({ x: 0, z: 3800, radius: 160 });
const WAVES = [
  { x: 0.8, z: 0.6, length: 120, amplitude: 3.5 },
  { x: -0.620702, z: 0.784047, length: 64, amplitude: 1.8 },
  { x: 0.300126, z: -0.9539, length: 40, amplitude: 0.85 },
  { x: 0.910366, z: 0.413803, length: 27, amplitude: 0.4 },
].map(w => ({ ...w, k: TAU / w.length, omega: Math.sqrt(9.81 * TAU / w.length) }));

function seeded(seed) {
  let n = seed >>> 0;
  return () => {
    n += 0x6D2B79F5;
    let t = Math.imul(n ^ n >>> 15, 1 | n);
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function smooth(a, b, v) {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const shaderNoise = /* glsl */`
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise21(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = noise21(p) * 0.52;
    p = mat2(1.63, 1.21, -1.21, 1.63) * p;
    v += noise21(p) * 0.27;
    p = mat2(1.67, 1.17, -1.17, 1.67) * p;
    v += noise21(p) * 0.13;
    return v;
  }
`;

const waveFunctions = /* glsl */`
  uniform float uTime;
  uniform float uStorm;
  float calmFactor(vec2 p) {
    return 0.22 + 0.78 * smoothstep(180.0, 530.0, distance(p, vec2(0.0, 3800.0)));
  }
  vec4 swell(vec2 p) {
    vec4 s = vec4(0.0);
    float phase, sn, cs, crest;
    ${WAVES.map(w => `
      phase = dot(p, vec2(${w.x.toFixed(6)}, ${w.z.toFixed(6)})) * ${w.k.toFixed(8)} - uTime * ${w.omega.toFixed(8)};
      sn = sin(phase); cs = cos(phase);
      s.x += ${w.amplitude.toFixed(3)} * (sn + 0.16 * sin(phase * 2.0));
      s.yz += ${w.amplitude.toFixed(3)} * ${w.k.toFixed(8)} * (cs + 0.32 * cos(phase * 2.0)) * vec2(${w.x.toFixed(6)}, ${w.z.toFixed(6)});
      s.w += ${w.amplitude.toFixed(3)} * smoothstep(0.57, 1.0, sn);
    `).join('\n')}
    s.xyz *= (0.25 + 0.75 * uStorm) * calmFactor(p);
    s.w /= 6.55;
    return s;
  }
`;

function adaptiveOceanGeometry(segments) {
  const positions = new Float32Array((segments + 1) ** 2 * 3);
  const indices = new Uint32Array(segments * segments * 6);
  const coord = i => {
    const t = 2 * i / segments - 1;
    return 440 * t / (1 - 0.96 * Math.abs(t));
  };
  let k = 0;
  for (let z = 0; z <= segments; z++) {
    for (let x = 0; x <= segments; x++) {
      positions[k++] = coord(x);
      positions[k++] = 0;
      positions[k++] = coord(z);
    }
  }
  k = 0;
  for (let z = 0; z < segments; z++) {
    for (let x = 0; x < segments; x++) {
      const a = z * (segments + 1) + x, b = a + 1, c = a + segments + 1, d = c + 1;
      indices[k++] = a; indices[k++] = c; indices[k++] = b;
      indices[k++] = b; indices[k++] = c; indices[k++] = d;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

// Batch repeated static pieces without an additional runtime dependency.
function mergeGeometryParts(parts) {
  const totalVertices = parts.reduce((sum, geometry) => sum + geometry.getAttribute('position').count, 0);
  const totalIndices = parts.reduce((sum, geometry) => sum + (geometry.index ? geometry.index.count : geometry.getAttribute('position').count), 0);
  const merged = new THREE.BufferGeometry();
  for (const name of Object.keys(parts[0].attributes)) {
    const itemSize = parts[0].getAttribute(name).itemSize;
    const array = new Float32Array(totalVertices * itemSize);
    let cursor = 0;
    for (const geometry of parts) {
      const attribute = geometry.getAttribute(name);
      array.set(attribute.array, cursor);
      cursor += attribute.array.length;
    }
    merged.setAttribute(name, new THREE.BufferAttribute(array, itemSize));
  }
  const indices = new Uint32Array(totalIndices);
  let cursor = 0, offset = 0;
  for (const geometry of parts) {
    const count = geometry.index ? geometry.index.count : geometry.getAttribute('position').count;
    for (let i = 0; i < count; i++) indices[cursor++] = (geometry.index ? geometry.index.getX(i) : i) + offset;
    offset += geometry.getAttribute('position').count;
    geometry.dispose();
  }
  merged.setIndex(new THREE.BufferAttribute(indices, 1));
  merged.computeBoundingSphere();
  return merged;
}

function makeOcean(mobile) {
  const uniforms = {
    uTime: { value: 0 },
    uStorm: { value: 0.8 },
    uFlash: { value: 0 },
    uShip: { value: new THREE.Vector2(0, 0) },
    uHeading: { value: 0 },
    uSpeed: { value: 0 },
    uFogColor: { value: new THREE.Color(0x70858e) },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */`
      ${waveFunctions}
      varying vec3 vWorldPosition;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        world.y = swell(world.xz).x;
        vWorldPosition = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */`
      ${waveFunctions}
      ${shaderNoise}
      uniform float uFlash;
      uniform vec2 uShip;
      uniform float uHeading;
      uniform float uSpeed;
      uniform vec3 uFogColor;
      varying vec3 vWorldPosition;
      void main() {
        vec2 p = vWorldPosition.xz;
        vec4 wave = swell(p);
        vec2 ripple = vec2(0.0);
        ripple += vec2(0.9, 0.44) * cos(dot(p, vec2(0.9, 0.44)) * 1.23 - uTime * 3.2) * 0.09;
        ripple += vec2(-0.36, 0.93) * cos(dot(p, vec2(-0.36, 0.93)) * 2.47 - uTime * 4.1) * 0.052;
        ripple += vec2(0.71, 0.71) * cos(dot(p, vec2(0.71, 0.71)) * 5.81 - uTime * 6.8) * 0.025;
        float dist = distance(cameraPosition, vWorldPosition);
        ripple *= (0.25 + uStorm * 0.75) * (1.0 - smoothstep(180.0, 1400.0, dist) * 0.84);
        vec3 normal = normalize(vec3(-wave.y - ripple.x, 1.0, -wave.z - ripple.y));
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        vec3 reflected = reflect(-viewDir, normal);
        float fresnel = 0.025 + 0.975 * pow(1.0 - max(dot(normal, viewDir), 0.0), 4.4);
        vec3 sky = mix(vec3(0.40, 0.49, 0.53), vec3(0.105, 0.17, 0.22), clamp(reflected.y, 0.0, 1.0));
        float reflectionCloud = fbm(reflected.xz * 6.0 + vec2(uTime * 0.003, 0.0));
        sky *= mix(0.65, 1.06, reflectionCloud);
        sky += uFlash * vec3(0.38, 0.46, 0.55);
        vec3 deep = vec3(0.017, 0.075, 0.093);
        vec3 shallow = vec3(0.042, 0.17, 0.19);
        vec3 water = mix(deep, shallow, clamp(wave.x * 0.065 + 0.2, 0.0, 0.75));
        float translucence = pow(max(dot(viewDir, normalize(vec3(-0.46, 0.3, 0.81))), 0.0), 3.0) * max(wave.x, 0.0) * 0.025;
        water += vec3(0.02, 0.13, 0.105) * translucence;
        vec3 color = mix(water, sky, fresnel * 0.88 + 0.06);
        vec3 sun = normalize(vec3(-0.46, 0.30, 0.81));
        vec3 halfVector = normalize(sun + viewDir);
        float spec = pow(max(dot(normal, halfVector), 0.0), 145.0);
        color += vec3(0.66, 0.69, 0.65) * spec * (0.28 + 0.45 * (1.0 - uStorm));
        float surfaceNoise = fbm(p * 0.11 + vec2(uTime * 0.12, -uTime * 0.17));
        float whitecaps = smoothstep(0.42, 0.79, wave.w) * smoothstep(0.36, 0.67, surfaceNoise);
        whitecaps *= (0.2 + 0.8 * uStorm) * calmFactor(p);

        // A broad turbulent stern wake and the two diverging Kelvin wake arms.
        vec2 delta = p - uShip;
        vec2 forward = vec2(sin(uHeading), cos(uHeading));
        vec2 right = vec2(forward.y, -forward.x);
        float along = dot(delta, forward);
        float across = dot(delta, right);
        float astern = -along - 65.0;
        float wakeGate = smoothstep(-5.0, 16.0, astern) * (1.0 - smoothstep(420.0, 850.0, astern));
        float wakeWidth = 10.0 + max(astern, 0.0) * 0.115;
        float centralWake = (1.0 - smoothstep(wakeWidth * 0.25, wakeWidth, abs(across))) * exp(-max(astern, 0.0) * 0.009);
        float armDistance = abs(abs(across) - (14.0 + max(astern, 0.0) * 0.22));
        float armWake = (1.0 - smoothstep(2.0, 5.0 + max(astern, 0.0) * 0.018, armDistance)) * exp(-max(astern, 0.0) * 0.004);
        float wake = max(centralWake, armWake * 0.65) * wakeGate * clamp(uSpeed / 12.0, 0.0, 1.0);
        wake *= 0.35 + 0.95 * surfaceNoise;
        float bowAlong = along - 59.0;
        float bowFoam = (1.0 - smoothstep(1.8, 5.0, abs(abs(across) - (6.0 - bowAlong * 0.20)))) * smoothstep(-32.0, -13.0, bowAlong) * (1.0 - smoothstep(1.0, 11.0, bowAlong));
        bowFoam *= clamp(uSpeed / 16.0, 0.0, 0.7) * (0.5 + surfaceNoise);
        float foam = clamp(max(whitecaps * 0.92, max(wake, bowFoam)), 0.0, 0.94);
        color = mix(color, vec3(0.69, 0.79, 0.79), foam);
        float fog = 1.0 - exp(-pow(dist * (0.00016 + uStorm * 0.000027), 1.38));
        color = mix(color, uFogColor + uFlash * vec3(0.18, 0.21, 0.24), clamp(fog, 0.0, 0.96));
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    side: THREE.FrontSide,
    depthWrite: true,
  });
  const mesh = new THREE.Mesh(adaptiveOceanGeometry(mobile ? 144 : 224), material);
  mesh.name = 'Analytic storm ocean';
  mesh.frustumCulled = false;
  mesh.receiveShadow = false;
  mesh.renderOrder = -3;
  return { mesh, uniforms };
}

function makeSky() {
  const uniforms = { uTime: { value: 0 }, uStorm: { value: 0.8 }, uFlash: { value: 0 } };
  const material = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
    vertexShader: /* glsl */`
      varying vec3 vDirection;
      void main() {
        vDirection = normalize(position);
        vec4 projected = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = projected.xyww;
      }
    `,
    fragmentShader: /* glsl */`
      ${shaderNoise}
      uniform float uTime;
      uniform float uStorm;
      uniform float uFlash;
      varying vec3 vDirection;
      void main() {
        vec3 dir = normalize(vDirection);
        float altitude = max(dir.y, 0.0);
        vec3 horizon = vec3(0.37, 0.45, 0.49);
        vec3 zenith = vec3(0.074, 0.125, 0.17);
        vec3 color = mix(horizon, zenith, pow(altitude, 0.45));
        vec3 sunDir = normalize(vec3(-0.46, 0.30, 0.81));
        float sunDot = max(dot(dir, sunDir), 0.0);
        color += vec3(0.28, 0.25, 0.17) * pow(sunDot, 11.0) * 0.5;
        vec2 cloudP = dir.xz / max(dir.y + 0.28, 0.16);
        cloudP = cloudP * 2.5 + vec2(uTime * 0.0024, uTime * -0.004);
        float n = fbm(cloudP);
        float detail = fbm(cloudP * 2.9 + vec2(12.8, 5.3));
        float cloud = smoothstep(0.24 - uStorm * 0.08, 0.63, n + detail * 0.24);
        float cloudEdge = fbm(cloudP + vec2(-0.075, 0.048)) - n;
        vec3 cloudColor = mix(vec3(0.09, 0.13, 0.165), vec3(0.32, 0.38, 0.405), clamp(detail * 1.3 + cloudEdge * 3.0, 0.0, 1.0));
        cloudColor += vec3(0.16, 0.15, 0.12) * pow(sunDot, 10.0) * (1.0 - cloud);
        color = mix(color, cloudColor, cloud * smoothstep(-0.03, 0.20, dir.y));
        color += vec3(0.46, 0.43, 0.30) * pow(sunDot, 950.0) * (1.0 - cloud) * 0.42;
        color += vec3(0.34, 0.42, 0.51) * uFlash;
        color = mix(color, horizon, 1.0 - smoothstep(-0.10, 0.065, dir.y));
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(12000, 32, 16), material);
  mesh.name = 'Layered North Atlantic storm sky';
  mesh.frustumCulled = false;
  mesh.renderOrder = -100;
  return { mesh, uniforms };
}

// A ring-built fractured solid: independently offset ridges, shelves, sloped faces
// and colour strata. It deliberately has no sphere/cube silhouette.
function rockGeometry(radius, height, seed, kind = 'rock', detail = 1) {
  const random = seeded(seed);
  const sides = kind === 'land' ? 28 : kind === 'ice' ? 20 : 22;
  const levels = kind === 'ice' ? 9 : 11;
  const positions = [], colors = [], indices = [];
  const ringNoise = Array.from({ length: sides }, () => random());
  const ridge = Array.from({ length: sides }, (_, i) => (
    0.72 + 0.13 * Math.sin(i * 1.89 + seed) + 0.15 * ringNoise[i]
  ));
  const phase = random() * TAU;
  const shiftX = (random() - 0.5) * radius * 0.45;
  const shiftZ = (random() - 0.5) * radius * 0.45;
  const white = new THREE.Color(0xd5e5e7);
  const blue = new THREE.Color(0x458da2);
  const darkStone = new THREE.Color(0x2a343a);
  const lightStone = new THREE.Color(0x69716f);
  const color = new THREE.Color();
  for (let j = 0; j <= levels; j++) {
    const t = j / levels;
    for (let i = 0; i < sides; i++) {
      const angle = TAU * i / sides + phase;
      const angleOffset = Math.sin(j * 1.7 + i * 2.1 + seed) * 0.045;
      let profile;
      if (kind === 'ice') {
        const p = [0.70, 0.99, 0.93, 0.79, 0.77, 0.62, 0.44, 0.36, 0.14, 0.015];
        profile = p[j];
      } else {
        profile = Math.pow(Math.max(0.02, 1 - t), kind === 'land' ? 0.5 : 0.58);
        profile *= (j % 3 === 1 ? 1.045 : 0.955);
      }
      const jag = 0.9 + 0.1 * Math.sin(i * 4.9 + j * 1.91 + seed);
      const r = radius * Math.min(1, profile * ridge[i] * jag);
      let y = -7 + (height + 7) * t;
      if (j > 0 && j < levels) {
        y += (Math.sin(i * 1.55 + seed) * 0.06 + (random() - 0.5) * 0.035) * height * Math.sin(t * Math.PI);
      }
      // Asymmetric diagonal fracture cuts and a multi-peak roof.
      if (kind === 'ice') y *= 0.82 + 0.18 * Math.sin(angle * 2.0 + 0.5);
      if (j === levels) y *= 0.80 + 0.20 * Math.sin(angle + phase);
      positions.push(
        Math.cos(angle + angleOffset) * r + shiftX * t,
        y,
        Math.sin(angle + angleOffset) * r + shiftZ * t,
      );
      const grain = 0.77 + random() * 0.26;
      if (kind === 'ice') {
        color.copy(blue).lerp(white, smooth(-1, height * 0.62, y));
        const fissure = Math.sin(i * 2.85 + j * 0.38 + seed) > 0.77;
        color.multiplyScalar(grain * (fissure ? 0.79 : 1));
        if (j > levels * 0.72) color.lerp(white, 0.48);
      } else {
        const layer = 0.40 + Math.sin(y * 0.16 + Math.sin(angle * 3) * 0.4) * 0.11;
        color.copy(darkStone).lerp(lightStone, layer).multiplyScalar(grain);
        if (y < 6) color.multiplyScalar(0.58);
        if (t > 0.66) color.lerp(new THREE.Color(0x89928e), 0.13 + (t - 0.66) * 0.7);
        if (kind === 'land' && t > 0.70) color.lerp(new THREE.Color(0xc2ccca), smooth(0.70, 1, t) * 0.55);
      }
      colors.push(color.r, color.g, color.b);
    }
  }
  for (let j = 0; j < levels; j++) {
    for (let i = 0; i < sides; i++) {
      const ni = (i + 1) % sides;
      const a = j * sides + i, b = j * sides + ni, c = (j + 1) * sides + i, d = (j + 1) * sides + ni;
      if ((i + j) % 2) indices.push(a, c, b, b, c, d);
      else indices.push(a, d, b, a, c, d);
    }
  }
  // Close the summit; the solid continues below sea level.
  for (let i = 1; i < sides - 1; i++) indices.push(levels * sides, levels * sides + i + 1, levels * sides + i);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function weatheredMaterial(ice = false) {
  const material = new THREE.MeshStandardMaterial({
    color: ice ? 0xe0f0f2 : 0xd5dddd,
    vertexColors: true,
    roughness: ice ? 0.43 : 0.92,
    metalness: ice ? 0.05 : 0.0,
    flatShading: true,
  });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vStonePosition;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvStonePosition = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vStonePosition;\n' + shaderNoise)
      .replace('#include <color_fragment>', `#include <color_fragment>
        float fine = noise21(vStonePosition.xz * 0.42 + vStonePosition.y * 0.13);
        float strata = sin(vStonePosition.y * ${ice ? '0.85' : '1.55'} + noise21(vStonePosition.xz * 0.047) * 2.0);
        diffuseColor.rgb *= ${ice ? '0.94 + fine * 0.10 + strata * 0.018' : '0.85 + fine * 0.23 + strata * 0.065'};
      `);
  };
  material.customProgramCacheKey = () => ice ? 'captain-ice-v1' : 'captain-rock-v1';
  return material;
}

function makeCoast(side, seed) {
  const random = seeded(seed);
  const segments = 90, rows = 7;
  const positions = [], colors = [], indices = [];
  const shade = new THREE.Color();
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= segments; i++) {
      const z = -1400 + i / segments * 7700;
      const ridge = 140 + 265 * Math.pow(0.5 + 0.5 * Math.sin(i * 0.27 + seed), 1.8)
        + 155 * Math.pow(0.5 + 0.5 * Math.cos(i * 0.61), 4);
      const t = j / rows;
      const y = -8 + ridge * Math.sin(t * Math.PI) + (random() - 0.5) * 33 * Math.sin(t * Math.PI);
      const x = side * (1370 + t * 1700 + 110 * Math.sin(i * 0.17 + seed));
      positions.push(x, y, z);
      shade.setHex(0x283943).lerp(new THREE.Color(0x748184), smooth(180, 450, y) * 0.67);
      shade.multiplyScalar(0.83 + random() * 0.21);
      colors.push(shade.r, shade.g, shade.b);
    }
  }
  for (let j = 0; j < rows; j++) for (let i = 0; i < segments; i++) {
    const a = j * (segments + 1) + i, b = a + 1, c = a + segments + 1, d = c + 1;
    indices.push(a, c, b, b, c, d);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    color: 0xc7d3d9, roughness: 1, vertexColors: true, flatShading: true, side: THREE.DoubleSide,
  }));
  mesh.name = side < 0 ? 'Distant western fjord' : 'Distant eastern fjord';
  return mesh;
}

function makeRain(mobile) {
  const random = seeded(8827);
  const count = mobile ? 420 : 850;
  const positions = new Float32Array(count * 6);
  const tails = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = (random() - 0.5) * 540, y = random() * 230, z = (random() - 0.5) * 540;
    positions.set([x, y, z, x, y, z], i * 6);
    tails[i * 2] = 0; tails[i * 2 + 1] = 1;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aTail', new THREE.BufferAttribute(tails, 1));
  const uniforms = { uTime: { value: 0 }, uStorm: { value: 0.8 }, uFlash: { value: 0 } };
  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */`
      uniform float uTime;
      uniform float uStorm;
      attribute float aTail;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y = mod(p.y - uTime * (52.0 + uStorm * 40.0), 230.0) - 7.0;
        p.x = mod(p.x - uTime * 11.0 + 270.0, 540.0) - 270.0;
        p += vec3(-2.0, -8.5, 0.7) * aTail;
        vec4 world = modelMatrix * vec4(p, 1.0);
        float dist = distance(world.xyz, cameraPosition);
        vAlpha = (0.075 + uStorm * 0.14) * (1.0 - smoothstep(80.0, 330.0, dist)) * smoothstep(5.0, 25.0, dist);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uFlash;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(vec3(0.66, 0.77, 0.85) + uFlash * 0.3, vAlpha);
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.LineSegments(geometry, material);
  mesh.name = 'Wind-driven rain';
  mesh.frustumCulled = false;
  mesh.renderOrder = 4;
  return { mesh, uniforms };
}

function makeSpray(mobile) {
  const random = seeded(5283), count = mobile ? 90 : 180;
  const seeds = new Float32Array(count * 3);
  for (let i = 0; i < seeds.length; i++) seeds[i] = random();
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(seeds, 3));
  const uniforms = {
    uTime: { value: 0 }, uSpeed: { value: 0 }, uHeading: { value: 0 },
    uShip: { value: new THREE.Vector3() }, uWave: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */`
      uniform float uTime, uSpeed, uHeading, uWave;
      uniform vec3 uShip;
      varying float vAlpha;
      void main() {
        float life = fract(position.x + uTime * (0.35 + position.z * 0.25));
        float side = position.y > 0.5 ? 1.0 : -1.0;
        float speed = clamp(uSpeed / 15.0, 0.0, 1.6);
        float x = side * (6.5 + life * (6.0 + position.z * 12.0) * speed);
        float z = 61.0 - life * (24.0 + position.z * 27.0);
        float y = uWave + 0.8 + sin(life * 3.141593) * (1.0 + position.z * 5.0) * speed;
        vec3 p = vec3(cos(uHeading) * x + sin(uHeading) * z, y, -sin(uHeading) * x + cos(uHeading) * z);
        p.xz += uShip.xz;
        vec4 viewPos = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * viewPos;
        gl_PointSize = clamp((95.0 + position.y * 100.0) / max(8.0, -viewPos.z), 1.0, 13.0);
        vAlpha = sin(life * 3.141593) * clamp(speed, 0.0, 0.72);
      }
    `,
    fragmentShader: /* glsl */`
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = (1.0 - smoothstep(0.10, 1.0, d)) * vAlpha;
        if (alpha < 0.015) discard;
        gl_FragColor = vec4(0.77, 0.89, 0.91, alpha);
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Points(geometry, material);
  mesh.name = 'Cruise ship bow spray';
  mesh.frustumCulled = false;
  return { mesh, uniforms };
}

function makeBuoys(group) {
  const buoys = [];
  const bodyGeometry = mergeGeometryParts([
    new THREE.CylinderGeometry(2.5, 3.8, 2.4, 14),
    new THREE.CylinderGeometry(0.45, 1.2, 7.2, 10).translate(0, 4.7, 0),
    new THREE.TorusGeometry(1.25, 0.15, 5, 12).rotateX(Math.PI / 2).translate(0, 6.1, 0),
  ]);
  const body = new THREE.InstancedMesh(bodyGeometry, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.65, metalness: 0.22 }), 8);
  const lamps = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8).translate(0, 8.9, 0), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), 8);
  body.name = 'Eight floating channel buoys';
  lamps.name = 'Red and green harbor navigation lights';
  body.frustumCulled = false; lamps.frustumCulled = false;
  body.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  lamps.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const color = new THREE.Color();
  for (let i = 0; i < 4; i++) for (let side = -1; side <= 1; side += 2) {
    const buoy = new THREE.Object3D();
    buoy.position.set(side * (103 - i * 3), 0, 3480 + i * 135);
    buoy.name = `Harbor ${side < 0 ? 'port red' : 'starboard green'} buoy ${i + 1}`;
    buoy.updateMatrix();
    body.setMatrixAt(buoys.length, buoy.matrix);
    lamps.setMatrixAt(buoys.length, buoy.matrix);
    body.setColorAt(buoys.length, color.setHex(side < 0 ? 0xa82626 : 0x187b62));
    lamps.setColorAt(buoys.length, color.setHex(side < 0 ? 0xff553c : 0x5dffc3));
    buoys.push(buoy);
  }
  group.add(body, lamps);
  return { buoys, body, lamps };
}

function makeHarbor(group, stoneMaterial) {
  const pierMaterial = new THREE.MeshStandardMaterial({ color: 0x778087, roughness: 0.9 });
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x333e48, roughness: 0.7, metalness: 0.15 });
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xc6c6b5, roughness: 0.77 });
  const trimMaterial = new THREE.MeshStandardMaterial({ color: 0x984332, roughness: 0.6 });
  const warmGlass = new THREE.MeshStandardMaterial({ color: 0x728d94, emissive: 0xffd392, emissiveIntensity: 0.42, roughness: 0.22, metalness: 0.2 });
  const lampMaterial = new THREE.MeshBasicMaterial({ color: 0xffe9b2, toneMapped: false });
  const port = new THREE.Group();
  port.name = 'St Elmo safe harbor';
  group.add(port);
  const quay = new THREE.Mesh(new THREE.BoxGeometry(780, 15, 130), pierMaterial);
  quay.position.set(0, 1, 4325);
  port.add(quay);
  // Terminal: roof overhangs, two glazed concourses, columns and a visible tower.
  const terminal = new THREE.Mesh(new THREE.BoxGeometry(225, 23, 55), whiteMaterial);
  terminal.position.set(-55, 20, 4320); port.add(terminal);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(232, 11, 57), warmGlass);
  glass.position.set(-55, 22, 4320); port.add(glass);
  for (let i = 0; i < 2; i++) {
    const roof = new THREE.Mesh(new THREE.BoxGeometry(245, 2.2, 68), darkMaterial);
    roof.position.set(-55, 15 + i * 19, 4320); port.add(roof);
  }
  const columns = new THREE.InstancedMesh(new THREE.BoxGeometry(1.3, 24, 1.3), pierMaterial, 15);
  const transform = new THREE.Object3D();
  for (let i = 0; i < 15; i++) {
    transform.position.set(-164 + i * 15.5, 21, 4290);
    transform.updateMatrix(); columns.setMatrixAt(i, transform.matrix);
  }
  port.add(columns);
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(11, 15, 62, 8), whiteMaterial);
  tower.position.set(150, 38, 4320); port.add(tower);
  const controlRoom = new THREE.Mesh(new THREE.CylinderGeometry(20, 16, 14, 8), warmGlass);
  controlRoom.position.set(150, 71, 4320); port.add(controlRoom);
  const controlRoof = new THREE.Mesh(new THREE.CylinderGeometry(22, 22, 3, 8), darkMaterial);
  controlRoof.position.set(150, 79.5, 4320); port.add(controlRoof);
  const masts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.45, 0.8, 23, 6), darkMaterial, 12);
  const lamps = new THREE.InstancedMesh(new THREE.SphereGeometry(1.4, 6, 5), lampMaterial, 12);
  for (let i = 0; i < 12; i++) {
    transform.position.set(-352 + i * 64, 20, 4267);
    transform.updateMatrix(); masts.setMatrixAt(i, transform.matrix);
    transform.position.y = 32; transform.updateMatrix(); lamps.setMatrixAt(i, transform.matrix);
  }
  port.add(masts, lamps);

  // Stone breakwaters leave a broad, unobstructed harbor entrance.
  const breakwaters = [];
  for (let i = 0; i < 7; i++) breakwaters.push({
    id: `terminal-quay-${i}`, type: 'land', x: -336 + i * 112,
    z: 4325, radius: 92, height: 15, mesh: quay,
  });
  for (const side of [-1, 1]) {
    const bank = new THREE.Mesh(rockGeometry(124, 15, 814 + side, 'rock'), stoneMaterial);
    bank.scale.z = 1.8;
    bank.position.set(side * 315, 0, 4015);
    bank.name = 'Harbor stone breakwater';
    port.add(bank);
    // Separate conservative collision circles describe the long breakwater.
    for (let k = 0; k < 3; k++) breakwaters.push({
      id: `breakwater-${side}-${k}`, type: 'land', x: side * 315,
      z: 3920 + k * 95, radius: 115, height: 15, mesh: bank,
    });
  }

  const lighthouse = new THREE.Group();
  lighthouse.position.set(325, 14, 3842);
  lighthouse.name = 'St Elmo lighthouse';
  const lighthouseBase = new THREE.Mesh(new THREE.CylinderGeometry(8, 12, 8, 16), pierMaterial);
  lighthouseBase.position.y = 1;
  const lighthouseTower = new THREE.Mesh(new THREE.CylinderGeometry(5, 8, 37, 18), whiteMaterial);
  lighthouseTower.position.y = 23;
  const stripe = new THREE.Mesh(new THREE.CylinderGeometry(6.1, 6.8, 8, 18), trimMaterial);
  stripe.position.y = 26;
  const gallery = new THREE.Mesh(new THREE.CylinderGeometry(8.2, 7.5, 2.2, 18), darkMaterial);
  gallery.position.y = 42.5;
  const lantern = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 7, 12), warmGlass);
  lantern.position.y = 47;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(6.3, 5, 18), trimMaterial);
  roof.position.y = 53;
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(2.3, 12, 8), lampMaterial);
  bulb.position.y = 47;
  lighthouse.add(lighthouseBase, lighthouseTower, stripe, gallery, lantern, roof, bulb);
  port.add(lighthouse);

  const beamPivot = new THREE.Group();
  beamPivot.position.set(325, 61, 3842);
  const beam = new THREE.Mesh(new THREE.ConeGeometry(21, 410, 20, 1, true), new THREE.MeshBasicMaterial({
    color: 0xf9e8bc, transparent: true, opacity: 0.024, side: THREE.DoubleSide,
    depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
  }));
  beam.rotation.x = Math.PI / 2;
  beam.position.z = -205;
  beamPivot.add(beam);
  port.add(beamPivot);
  return { port, beamPivot, breakwaters };
}

function makeLightning(group) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(180), 3).setUsage(THREE.DynamicDrawUsage));
  const material = new THREE.LineBasicMaterial({ color: 0xd6ebff, transparent: true, opacity: 0, toneMapped: false });
  const mesh = new THREE.LineSegments(geometry, material);
  mesh.name = 'Distant sheet lightning';
  mesh.visible = false;
  mesh.frustumCulled = false;
  group.add(mesh);
  const light = new THREE.DirectionalLight(0xc5e3ff, 0);
  light.position.set(-450, 1200, 1800);
  group.add(light);
  let strike = 0;
  function place(position, seed) {
    const random = seeded(seed), verts = [];
    const x = position.x + (random() - 0.5) * 2100;
    const z = position.z + 2100 + random() * 1700;
    let previous = new THREE.Vector3(x, 1100 + random() * 500, z);
    const nodes = [previous.clone()];
    for (let i = 0; i < 15; i++) {
      const next = previous.clone().add(new THREE.Vector3((random() - 0.5) * 110, -58 - random() * 37, (random() - 0.5) * 20));
      verts.push(...previous.toArray(), ...next.toArray());
      nodes.push(next.clone()); previous = next;
    }
    for (let b = 0; b < 5; b++) {
      previous = nodes[3 + Math.floor(random() * 9)].clone();
      const direction = random() < 0.5 ? -1 : 1;
      for (let j = 0; j < 3; j++) {
        const next = previous.clone().add(new THREE.Vector3(direction * (35 + random() * 65), -20 - random() * 45, 0));
        verts.push(...previous.toArray(), ...next.toArray()); previous = next;
      }
    }
    geometry.getAttribute('position').array.set(verts);
    geometry.getAttribute('position').needsUpdate = true;
    geometry.computeBoundingSphere();
    light.position.set(x, 1600, z);
    strike++;
  }
  return { mesh, light, material, place, get strike() { return strike; } };
}

/**
 * @param {THREE.Scene} scene
 * @param {{mobile?: boolean}} options
 * @returns {{update: Function, sampleHeight: Function, obstacles: Array,
 *   safeHarbor: {x:number,z:number,radius:number}, radarBounds: Object, dispose: Function}}
 */
export function createWorld(scene, { mobile = false } = {}) {
  const group = new THREE.Group();
  group.name = 'North Atlantic voyage';
  scene.add(group);
  const priorFog = scene.fog;
  scene.fog = new THREE.FogExp2(0x70858e, 0.00017);

  const ocean = makeOcean(mobile);
  const sky = makeSky();
  const rain = makeRain(mobile);
  const spray = makeSpray(mobile);
  group.add(sky.mesh, ocean.mesh, rain.mesh, spray.mesh);
  const stoneMaterial = weatheredMaterial(false), iceMaterial = weatheredMaterial(true);

  // Actual obstacle radii are bounded by the supplied collision envelope.
  const placements = [
    ['ice', -170, 470, 58, 94],
    ['ice', 215, 655, 77, 151],
    ['rock', -265, 845, 68, 63],
    ['ice', 55, 1045, 62, 115],
    ['rock', 315, 1240, 89, 84],
    ['ice', -260, 1430, 88, 151],
    ['rock', 35, 1650, 72, 66],
    ['ice', 285, 1840, 87, 170],
    ['ice', -180, 2045, 65, 112],
    ['rock', 190, 2250, 70, 85],
    ['rock', -260, 2470, 82, 69],
    ['ice', 30, 2675, 63, 119],
    ['ice', 350, 2860, 105, 192],
    ['rock', -270, 3050, 96, 109],
    ['ice', 115, 3250, 64, 112],
    ['rock', -208, 3430, 56, 64],
    ['ice', -520, 670, 74, 117],
    ['rock', 555, 1030, 77, 93],
    ['ice', -515, 1870, 90, 148],
    ['rock', 545, 2445, 88, 78],
    ['ice', -570, 2880, 80, 129],
    ['rock', 510, 3410, 102, 98],
    ['land', -835, 1090, 242, 269],
    ['land', 895, 1720, 272, 309],
    ['land', -845, 2360, 243, 291],
    ['land', 865, 3070, 262, 259],
    ['land', -655, 3850, 226, 194],
    ['land', 675, 4030, 224, 229],
  ];
  const obstacles = placements.map(([type, x, z, radius, height], i) => {
    const seed = 9142 + i * 293;
    const mesh = new THREE.Mesh(rockGeometry(radius, height, seed, type), type === 'ice' ? iceMaterial : stoneMaterial);
    mesh.position.set(x, 0, z);
    mesh.rotation.y = seeded(seed + 2)() * TAU;
    mesh.name = `${type === 'ice' ? 'Fractured blue iceberg' : type === 'land' ? 'Stratified coastal island' : 'Jagged sea stack'} ${i + 1}`;
    mesh.castShadow = !mobile && radius < 130;
    mesh.receiveShadow = !mobile;
    group.add(mesh);
    const p = mesh.geometry.getAttribute('position');
    let horizontalExtent = 0;
    for (let v = 0; v < p.count; v++) horizontalExtent = Math.max(horizontalExtent, Math.hypot(p.getX(v), p.getZ(v)));
    return { id: `hazard-${i + 1}`, type, x, z, radius: horizontalExtent + 1.2, height, mesh };
  });
  group.add(makeCoast(-1, 829), makeCoast(1, 403));
  const buoySystem = makeBuoys(group);
  const buoys = buoySystem.buoys;
  const harbor = makeHarbor(group, stoneMaterial);
  obstacles.push(...harbor.breakwaters);
  const lightning = makeLightning(group);

  // Simple foam skirts add scale and contact at the bases of the main sea stacks.
  const foamMat = new THREE.ShaderMaterial({
    uniforms: { uTime: ocean.uniforms.uTime, uStorm: ocean.uniforms.uStorm },
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: /* glsl */`
      ${waveFunctions}
      attribute float aBand;
      varying float vBand;
      varying vec3 vFoamWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        world.y = swell(world.xz).x + 0.10;
        vFoamWorld = world.xyz;
        vBand = aBand;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */`
      ${shaderNoise}
      uniform float uTime, uStorm;
      varying float vBand;
      varying vec3 vFoamWorld;
      void main() {
        float n = fbm(vFoamWorld.xz * 0.21 + vec2(uTime * 0.18, -uTime * 0.11));
        float band = sin(vBand * 3.141593);
        float alpha = smoothstep(0.22, 0.63, n * band) * (0.25 + uStorm * 0.28);
        alpha *= 1.0 - smoothstep(800.0, 1650.0, distance(cameraPosition, vFoamWorld));
        if (alpha < 0.015) discard;
        gl_FragColor = vec4(0.66, 0.78, 0.80, alpha);
        #include <colorspace_fragment>
      }
    `,
  });
  const foamParts = [];
  for (let i = 0; i < placements.length; i++) {
    const o = obstacles[i];
    const ringGeo = new THREE.RingGeometry(o.radius * 0.64, o.radius * 0.91, mobile ? 28 : 42, 1);
    const pos = ringGeo.getAttribute('position');
    const bands = new Float32Array(pos.count);
    for (let k = 0; k < pos.count; k++) {
      const x = pos.getX(k), y = pos.getY(k), a = Math.atan2(y, x);
      const deform = 1 + Math.sin(a * 5 + i) * 0.047 + Math.sin(a * 9 - i) * 0.031;
      pos.setXY(k, x * deform, y * deform);
      bands[k] = k >= pos.count / 2 ? 1 : 0;
    }
    ringGeo.setAttribute('aBand', new THREE.BufferAttribute(bands, 1));
    ringGeo.rotateX(-Math.PI / 2).translate(o.x, 0, o.z);
    foamParts.push(ringGeo);
  }
  const foam = new THREE.Mesh(mergeGeometryParts(foamParts), foamMat);
  foam.name = 'Fractured sea stack surf';
  foam.frustumCulled = false;
  group.add(foam);

  let currentStorm = 0.8, lastTime = 0, flashAge = 100;
  let nextLightning = 7.6;
  let strikeSeed = 54312;
  let flashLevel = 0;
  const lastPosition = new THREE.Vector3();

  function sampleHeight(x, z, time = lastTime) {
    let h = 0;
    for (const w of WAVES) {
      const phase = (x * w.x + z * w.z) * w.k - time * w.omega;
      h += w.amplitude * (Math.sin(phase) + 0.16 * Math.sin(2 * phase));
    }
    const calm = 0.22 + 0.78 * smooth(180, 530, Math.hypot(x, z - HARBOR.z));
    return h * (0.25 + 0.75 * currentStorm) * calm;
  }

  function update(time, dt, state = {}) {
    if (!Number.isFinite(time)) time = lastTime + Math.max(0, dt || 0);
    dt = Math.max(0, Math.min(0.1, Number.isFinite(dt) ? dt : 1 / 60));
    // Intro and replay use their own clocks. Restart the weather schedule on a
    // time rewind, while leaving the strike counter monotonic for audio clients.
    if (time < lastTime - 0.001) {
      nextLightning = time + 7.6;
      flashAge = 100;
      flashLevel = 0;
    }
    lastTime = time;
    const position = state.shipPosition || lastPosition;
    const x = Number.isFinite(position.x) ? position.x : 0;
    const z = Number.isFinite(position.z) ? position.z : 0;
    const heading = Number.isFinite(state.heading) ? state.heading : 0;
    const speed = Math.max(0, Number.isFinite(state.speed) ? state.speed : 0);
    currentStorm = THREE.MathUtils.clamp(Number.isFinite(state.storm) ? state.storm : 0.8, 0, 1);
    lastPosition.set(x, Number.isFinite(position.y) ? position.y : 0, z);

    // Keep fine geometry and precipitation around the player without resetting wave phase.
    ocean.mesh.position.set(Math.round(x / 12) * 12, 0, Math.round(z / 12) * 12);
    sky.mesh.position.set(x, 0, z);
    rain.mesh.position.set(x, 0, z);
    rain.mesh.visible = currentStorm > 0.14;
    spray.mesh.visible = speed > 0.8;

    if (time > nextLightning && currentStorm > 0.4) {
      lightning.place(lastPosition, strikeSeed++);
      flashAge = 0;
      nextLightning = time + 12 + seeded(strikeSeed)() * 18;
    }
    flashAge += dt;
    flashLevel = flashAge < 0.095 ? 0.84 * Math.exp(-flashAge * 6)
      : flashAge > 0.16 && flashAge < 0.26 ? 0.66 * Math.exp(-(flashAge - 0.16) * 13)
      : flashAge > 0.34 && flashAge < 0.42 ? 0.27 : 0;
    if (Number.isFinite(state.lightning)) flashLevel = Math.max(flashLevel, THREE.MathUtils.clamp(state.lightning, 0, 1));
    lightning.mesh.visible = flashLevel > 0.04;
    lightning.material.opacity = flashLevel;
    lightning.light.intensity = flashLevel * 2.7;

    for (const weather of [ocean, sky, rain]) {
      weather.uniforms.uTime.value = time;
      weather.uniforms.uStorm.value = currentStorm;
      weather.uniforms.uFlash.value = flashLevel;
    }
    ocean.uniforms.uShip.value.set(x, z);
    ocean.uniforms.uHeading.value = heading;
    ocean.uniforms.uSpeed.value = speed;
    if (scene.fog) ocean.uniforms.uFogColor.value.copy(scene.fog.color);
    spray.uniforms.uTime.value = time;
    spray.uniforms.uSpeed.value = speed;
    spray.uniforms.uHeading.value = heading;
    spray.uniforms.uShip.value.copy(lastPosition);
    spray.uniforms.uWave.value = sampleHeight(x + Math.sin(heading) * 62, z + Math.cos(heading) * 62, time);

    for (let i = 0; i < buoys.length; i++) {
      const buoy = buoys[i];
      const bx = buoy.position.x, bz = buoy.position.z;
      buoy.position.y = sampleHeight(bx, bz, time) + 1.1;
      const hx = (sampleHeight(bx + 3, bz, time) - sampleHeight(bx - 3, bz, time)) / 6;
      const hz = (sampleHeight(bx, bz + 3, time) - sampleHeight(bx, bz - 3, time)) / 6;
      buoy.rotation.z = -Math.atan(hx) * 0.7;
      buoy.rotation.x = Math.atan(hz) * 0.7;
      buoy.scale.setScalar(1);
      buoy.updateMatrix();
      buoySystem.body.setMatrixAt(i, buoy.matrix);
      buoy.scale.setScalar(Math.sin(time * 1.9 + (i % 2) * 0.1) > -0.62 ? 1 : 0.001);
      buoy.updateMatrix();
      buoySystem.lamps.setMatrixAt(i, buoy.matrix);
    }
    buoySystem.body.instanceMatrix.needsUpdate = true;
    buoySystem.lamps.instanceMatrix.needsUpdate = true;
    harbor.beamPivot.rotation.y = time * 0.29;
  }

  function dispose() {
    scene.remove(group);
    const geometries = new Set(), materials = new Set();
    group.traverse(object => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
    });
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    scene.fog = priorFog;
  }

  update(0, 0, {});
  return {
    update,
    sampleHeight,
    obstacles,
    safeHarbor: { ...HARBOR },
    radarBounds: { minX: -1000, maxX: 1000, minZ: -150, maxZ: 4450 },
    group,
    get lightning() { return flashLevel; },
    get lightningStrike() { return lightning.strike; },
    dispose,
  };
}
