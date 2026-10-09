import * as THREE from 'three';

// Metres; the origin is the waterline and the bow points along +Z.
// All the repeated architectural details are baked together by material.
export function createShip() {
  const group = new THREE.Group();
  group.name = 'Aegean Majesty';
  const exterior = new THREE.Group();
  exterior.name = 'Cruise ship exterior';
  group.add(exterior);
  const bridgeGroup = new THREE.Group();
  bridgeGroup.name = 'Bridge instruments';
  group.add(bridgeGroup);
  const glass = new THREE.Group();
  glass.name = 'Bridge glass';
  group.add(glass);

  const std = (color, roughness = .48, metalness = .05, more = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...more });
  const M = {
    hull: std(0xe8edf0, .29, .24),
    white: std(0xf4f2e8, .4, .1),
    cool: std(0xbdccd2, .44, .2),
    navy: std(0x142b41, .28, .42),
    lower: std(0x101e2a, .34, .35),
    dark: std(0x101d25, .37, .2),
    black: std(0x080e14, .44, .12),
    windows: std(0x163444, .14, .68, { emissive: 0x183944, emissiveIntensity: .09 }),
    balconyGlass: std(0x598293, .2, .52),
    teak: std(0xa2967a, .85, 0),
    teakDark: std(0x756957, .88, 0),
    metal: std(0xc8d6d9, .2, .77),
    orange: std(0xf56e1c, .42, .12),
    copper: std(0xbf7947, .25, .65),
    red: std(0xb32926, .38, .18),
    pool: std(0x268c9e, .12, .36, { emissive: 0x0a3a45, emissiveIntensity: .24 }),
    glow: std(0xffdca1, .2, .1, { emissive: 0xffba57, emissiveIntensity: 1.8 }),
    redGlow: std(0xff3b20, .3, .1, { emissive: 0xff2a10, emissiveIntensity: 1.9 }),
    greenGlow: std(0x83ffc6, .3, .1, { emissive: 0x0dfc89, emissiveIntensity: 1.7 }),
    transparent: new THREE.MeshPhysicalMaterial({ color: 0xaac8d4, roughness: .1, metalness: .03, transparent: true, opacity: .085, depthWrite: false, side: THREE.DoubleSide }),
  };

  const buckets = new Map();
  const q = new THREE.Quaternion();
  const v = new THREE.Vector3();
  const transform = new THREE.Matrix4();
  const add = (geometry, material, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
    q.setFromEuler(new THREE.Euler(rx, ry, rz));
    transform.compose(v.set(x, y, z), q, new THREE.Vector3(sx, sy, sz));
    geometry.applyMatrix4(transform);
    let bucket = buckets.get(material);
    if (!bucket) buckets.set(material, bucket = []);
    bucket.push(geometry);
  };
  const box = (w, h, d, material, x, y, z, rx = 0, ry = 0, rz = 0) => add(new THREE.BoxGeometry(w, h, d), material, x, y, z, rx, ry, rz);
  const ellipsoid = (rx, ry, rz, material, x, y, z, seg = 16) => add(new THREE.SphereGeometry(1, seg, Math.max(8, seg / 2)), material, x, y, z, 0, 0, 0, rx, ry, rz);
  const rod = (a, b, radius, material, segments = 7) => {
    const av = new THREE.Vector3(...a), bv = new THREE.Vector3(...b);
    const dir = bv.clone().sub(av);
    const geometry = new THREE.CylinderGeometry(radius, radius, dir.length(), segments, 1);
    const midpoint = av.add(bv).multiplyScalar(.5);
    const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    geometry.applyMatrix4(new THREE.Matrix4().compose(midpoint, orientation, new THREE.Vector3(1, 1, 1)));
    let bucket = buckets.get(material);
    if (!bucket) buckets.set(material, bucket = []);
    bucket.push(geometry);
  };
  const direct = (geometry, material, parent, x, y, z, rx = 0, ry = 0, rz = 0) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  const stations = [
    [-68, 4.5], [-66, 7.2], [-62, 9.7], [-54, 11.55], [-40, 12.0],
    [-20, 12.3], [6, 12.3], [28, 11.95], [43, 10.85], [55, 8.4],
    [63, 5.8], [70, 2.9], [75, .12]
  ];
  function widthAt(z) {
    z = THREE.MathUtils.clamp(z, stations[0][0], stations[stations.length - 1][0]);
    let i = 0;
    while (i < stations.length - 2 && z > stations[i + 1][0]) i++;
    const p0 = stations[Math.max(0, i - 1)][1], p1 = stations[i][1];
    const p2 = stations[i + 1][1], p3 = stations[Math.min(stations.length - 1, i + 2)][1];
    const t = (z - stations[i][0]) / (stations[i + 1][0] - stations[i][0]);
    return .5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  const sheer = z => .42 * THREE.MathUtils.smoothstep(z, 44, 75);
  function skin(levels, material) {
    const positions = [], indices = [];
    const segments = 120;
    // Cross-section runs from the port gunwale, beneath the keel, to starboard.
    for (let i = 0; i <= segments; i++) {
      const z = -68 + 143 * i / segments;
      const width = widthAt(z);
      for (const [factor, y] of levels) positions.push(factor * width, y + (y > 0 ? sheer(z) : 0), z);
    }
    const n = levels.length;
    for (let i = 0; i < segments; i++) for (let j = 0; j < n - 1; j++) {
      const a = i * n + j, b = a + n;
      indices.push(a, a + 1, b, b, a + 1, b + 1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    add(geometry, material);
  }
  skin([[-1, .55], [-.99, -.55], [-.91, -3.0], [-.65, -5.3], [0, -6.1], [.65, -5.3], [.91, -3.0], [.99, -.55], [1, .55]], M.lower);
  skin([[-.985, 9.65], [-1.01, 8.2], [-1.025, 5.4], [-1.01, 1.4], [-1, .55]], M.hull);
  skin([[1, .55], [1.01, 1.4], [1.025, 5.4], [1.01, 8.2], [.985, 9.65]], M.hull);
  skin([[-1.012, 2.05], [-1.016, 1.7]], M.navy);
  skin([[1.016, 1.7], [1.012, 2.05]], M.navy);
  // The stern has a rounded transom and an inset aft service door.
  box(8.9, 9.0, .28, M.hull, 0, 4.85, -67.9);
  box(4.1, 2.35, .12, M.navy, 0, 3.7, -68.06);
  box(3.7, .09, .16, M.metal, 0, 3.85, -68.14);
  ellipsoid(1.75, 1.05, 4.8, M.lower, 0, -2.4, 70.0, 24);

  function deckShape(z0, z1, width, y, h, material, round = 4) {
    const shape = new THREE.Shape();
    const steps = Math.max(16, Math.ceil((z1 - z0) / 3));
    const w = z => {
      const end = Math.min((z - z0) / round, (z1 - z) / round, 1);
      const edge = .78 + .22 * Math.sin(THREE.MathUtils.clamp(end, 0, 1) * Math.PI * .5);
      return Math.min(typeof width === 'function' ? width(z) : width * edge, widthAt(z) - .25);
    };
    for (let i = 0; i <= steps; i++) {
      const z = z0 + (z1 - z0) * i / steps;
      if (!i) shape.moveTo(w(z), -z); else shape.lineTo(w(z), -z);
    }
    for (let i = steps; i >= 0; i--) {
      const z = z0 + (z1 - z0) * i / steps;
      shape.lineTo(-w(z), -z);
    }
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: true, bevelSegments: 2, bevelThickness: .07, bevelSize: .11, curveSegments: 3, steps: 1 });
    geometry.rotateX(-Math.PI / 2);
    add(geometry, material, 0, y, 0);
  }
  deckShape(-67.4, 74.2, z => widthAt(z) * .98, 9.5, .28, M.teak);
  deckShape(48, 67, z => widthAt(z) * .94, 9.9, .17, M.teak);
  // Tall accommodation decks and their open, recessed balconies.
  deckShape(-45, 46, 9.25, 9.85, 2.85, M.white);
  deckShape(-43.8, 41.6, 9.0, 12.95, 2.5, M.white);
  deckShape(-36.8, 35.0, 8.55, 15.72, 2.5, M.white);
  deckShape(-28.0, 28.0, 7.85, 18.5, 2.5, M.white);
  deckShape(-61.8, 43.8, 10.65, 12.77, .26, M.white);
  deckShape(-41.7, 38.4, 10.45, 15.54, .24, M.white);
  deckShape(-35, 33, 9.98, 18.31, .22, M.white);
  deckShape(-28.2, 28.2, 8.68, 21.09, .22, M.teak);
  // A continuous glazing ribbon makes the promenade read as a real liner.
  for (const side of [-1, 1]) {
    for (let z = -39; z <= 39; z += 3.35) {
      box(.065, 1.82, 2.86, M.windows, side * 9.29, 11.55, z);
      box(.12, 2.15, .11, M.cool, side * 9.37, 11.55, z + 1.58);
      box(.23, .14, 2.83, M.navy, side * 9.42, 10.72, z);
      if (z < 28 && z > -35) box(.12, .12, .48, M.glow, side * 9.46, 12.52, z);
    }
    for (const tier of [
      { y: 13.03, inner: 9.03, outer: 10.51, start: -37.4, end: 31.9 },
      { y: 15.8, inner: 8.58, outer: 10.22, start: -30.2, end: 27.8 },
      { y: 18.57, inner: 7.87, outer: 9.7, start: -24.3, end: 22.0 }
    ]) {
      for (let z = tier.start; z <= tier.end; z += 3.8) {
        box(.065, 1.92, 2.91, M.windows, side * tier.inner, tier.y + 1.1, z);
        box(.095, 2.31, .13, M.white, side * tier.inner, tier.y + 1.1, z + 1.67);
        box(tier.outer - tier.inner, .1, 3.65, M.teak, side * (tier.outer + tier.inner) * .5, tier.y + .025, z);
        box(.055, .83, 3.51, M.balconyGlass, side * tier.outer, tier.y + .66, z);
        box(.1, .075, 3.72, M.white, side * tier.outer, tier.y + 1.08, z);
        box(tier.outer - tier.inner + .13, 1.95, .055, M.cool, side * (tier.outer + tier.inner) * .5, tier.y + 1.0, z + 1.85);
        box(.10, 1.08, .085, M.white, side * tier.outer, tier.y + .56, z + 1.81);
        // Small warm cabin details appear behind the reflective glazing.
        if (Math.round(z * 10) % 3 !== 0) box(.018, .58, .18, M.glow, side * (tier.inner + .045), tier.y + 1.2, z - .8);
      }
    }
  }
  // Aft terraces: narrow white fascia, teak, stainless balustrades and stairs.
  deckShape(-61.3, -43.1, z => Math.min(10.0, widthAt(z) - 1.0), 13.045, .06, M.teak);
  deckShape(-41.0, -35.4, 9.85, 15.80, .035, M.teak);
  deckShape(-34.4, -27.4, 9.32, 18.55, .035, M.teak);
  box(12.8, 1.75, .08, M.windows, 0, 14.2, -43.94);
  box(11.1, 1.75, .08, M.windows, 0, 16.95, -36.88);
  box(10.8, 1.65, .08, M.windows, 0, 19.65, -28.10);

  function railing(points, height = 1.0, material = M.white) {
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1];
      rod([a[0], a[1] + height, a[2]], [b[0], b[1] + height, b[2]], .045, material);
      rod([a[0], a[1] + height * .49, a[2]], [b[0], b[1] + height * .49, b[2]], .022, M.metal, 5);
      rod(a, [a[0], a[1] + height, a[2]], .045, material);
      if (i === points.length - 2) rod(b, [b[0], b[1] + height, b[2]], .045, material);
    }
  }
  for (const side of [-1, 1]) {
    const pts = [];
    for (let z = -64; z <= 72; z += 2.9) pts.push([side * (widthAt(z) * .98 - .25), z >= 48 && z <= 67 ? 10.12 : 9.9 + sheer(z), z]);
    railing(pts, 1.05);
    railing(Array.from({ length: 8 }, (_, i) => [side * Math.min(9.7, widthAt(-61 + i * 2.45) - 1.1), 13.15, -61 + i * 2.45]), 1.04);
    railing(Array.from({ length: 4 }, (_, i) => [side * 9.4, 15.87, -40.8 + i * 1.7]), 1.03);
    railing(Array.from({ length: 5 }, (_, i) => [side * 9.25, 18.61, -34 + i * 1.55]), 1.03);
    for (let i = 0; i < 13; i++) {
      box(1.18, .12, .37, M.teak, side * 8.97, 9.93 + i * .245, -43.15 - i * .30);
    }
    rod([side * 9.56, 11.0, -43.15], [side * 9.56, 14.10, -46.85], .048, M.metal);
  }
  railing(Array.from({ length: 9 }, (_, i) => [-8.6 + i * 2.15, 13.15, -61.5]), 1.05);
  railing(Array.from({ length: 9 }, (_, i) => [-8.5 + i * 2.125, 18.61, -34.6]), 1.02);
  // Pool rim is shaped with rounded corners; a recessed turquoise surface.
  const roundedRect = (w, d, radius) => {
    const s = new THREE.Shape(), x = -w / 2, z = -d / 2;
    s.moveTo(x + radius, z); s.lineTo(x + w - radius, z);
    s.quadraticCurveTo(x + w, z, x + w, z + radius);
    s.lineTo(x + w, z + d - radius); s.quadraticCurveTo(x + w, z + d, x + w - radius, z + d);
    s.lineTo(x + radius, z + d); s.quadraticCurveTo(x, z + d, x, z + d - radius);
    s.lineTo(x, z + radius); s.quadraticCurveTo(x, z, x + radius, z);
    return s;
  };
  const shapedSlab = (w, d, radius, h, material, x, y, z) => {
    const g = new THREE.ExtrudeGeometry(roundedRect(w, d, radius), { depth: h, bevelEnabled: true, bevelSize: .05, bevelThickness: .05, bevelSegments: 2, curveSegments: 6 });
    g.rotateX(-Math.PI / 2); add(g, material, x, y, z);
  };
  shapedSlab(8.45, 14.8, 1.7, .23, M.white, 0, 13.14, -49.5);
  shapedSlab(7.75, 14.1, 1.4, .03, M.navy, 0, 13.40, -49.5);
  shapedSlab(7.13, 13.5, 1.25, .025, M.pool, 0, 13.445, -49.5);
  for (let z = -55; z < -44; z += 1.6) box(6.8, .012, .035, M.cool, 0, 13.482, z);
  for (const side of [-1, 1]) {
    rod([side * 3.46, 13.45, -45.6], [side * 3.46, 14.2, -45.6], .055, M.metal);
    rod([side * 3.46, 14.2, -45.6], [side * 4.16, 14.2, -45.6], .055, M.metal);
  }
  // Loungers sit on the upper terraces, outside the walking rectangles.
  for (const side of [-1, 1]) for (let z = -39.9; z <= -37; z += 1.2) {
    box(.73, .13, 1.83, M.white, side * 6.9, 16.18, z);
    box(.62, .07, 1.15, M.navy, side * 6.9, 16.27, z - .23);
    box(.62, .065, .63, M.navy, side * 6.9, 16.45, z + .51, -.56);
    for (const dx of [-.28, .28]) rod([side * 6.9 + dx, 15.91, z - .61], [side * 6.9 + dx, 16.15, z + .64], .038, M.metal);
  }

  // Eight orange, enclosed SOLAS boats are carried clear of the promenade.
  for (const side of [-1, 1]) for (const z of [-29, -14, 1, 16]) {
    const x = side * 12.05, y = 8.5;
    const positions = [], indices = [];
    const boatStations = [[-4.75, .04], [-4.1, .62], [-3.0, .93], [2.9, .96], [4.0, .69], [4.75, .04]];
    const ring = [[-1, .25], [-.97, -.1], [-.64, -.68], [0, -.82], [.64, -.68], [.97, -.1], [1, .25], [.68, .49], [-.68, .49]];
    for (const [zz, ww] of boatStations) for (const [xx, yy] of ring) positions.push(xx * ww * 1.25, yy, zz);
    for (let i = 0; i < boatStations.length - 1; i++) for (let j = 0; j < ring.length; j++) {
      const a = i * ring.length + j, b = i * ring.length + (j + 1) % ring.length, c = a + ring.length, d = b + ring.length;
      indices.push(a, b, c, b, d, c);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals(); add(g, M.orange, x, y, z);
    ellipsoid(1.04, .54, 3.5, M.white, x, y + .56, z, 20);
    for (let j = -2; j <= 2; j++) box(.035, .39, .71, M.windows, x + side * .975, y + .63, z + j * 1.17);
    box(.08, .12, 7.45, M.orange, x + side * 1.04, y + .38, z);
    for (const dz of [-2.7, 2.7]) {
      rod([side * 11.65, 10.1, z + dz], [side * 11.65, 12.7, z + dz], .115, M.white);
      rod([side * 11.65, 12.7, z + dz], [side * 12.75, 11.45, z + dz], .115, M.white);
      rod([side * 12.75, 11.45, z + dz], [x, y + 1.0, z + dz], .025, M.dark, 5);
    }
  }
  // Portholes, mooring fairleads, anchors, deck fittings and the bow mast.
  for (const side of [-1, 1]) {
    for (let z = -52; z < 56; z += 4.25) {
      const width = widthAt(z) * 1.024;
      add(new THREE.CylinderGeometry(.24, .24, .07, 14), M.navy, side * width, 5.7 + sheer(z), z, 0, 0, Math.PI / 2);
      add(new THREE.TorusGeometry(.247, .034, 5, 14), M.metal, side * (width + .05), 5.7 + sheer(z), z, 0, Math.PI / 2, 0);
    }
    for (const z of [-60, -46, 38, 58]) {
      const x = side * (widthAt(z) - 1.2);
      box(.9, .21, 1.26, M.cool, x, 10.09, z);
      for (const dz of [-.35, .35]) add(new THREE.CylinderGeometry(.16, .2, .52, 10), M.dark, x, 10.35, z + dz);
    }
    const anchorX = side * (widthAt(62) + .04);
    ellipsoid(.1, .45, .63, M.navy, anchorX, 6.6, 62);
    rod([anchorX + side * .13, 6.8, 61.9], [anchorX + side * .22, 5.45, 62.5], .14, M.dark);
    rod([anchorX + side * .22, 5.5, 62.45], [anchorX + side * .27, 5.75, 61.85], .12, M.dark);
    rod([anchorX + side * .22, 5.5, 62.45], [anchorX + side * .27, 5.75, 63.05], .12, M.dark);
  }
  add(new THREE.CylinderGeometry(.14, .24, 4.3, 12), M.white, 0, 12.7, 66);
  rod([-1.15, 13.4, 66], [1.15, 13.4, 66], .07, M.white);
  ellipsoid(.16, .16, .16, M.glow, 0, 14.86, 66);
  for (const side of [-1, 1]) {
    rod([0, 14.4, 66], [side * 2.2, 10.3, 64.2], .014, M.metal, 4);
    add(new THREE.CylinderGeometry(.44, .44, .42, 12), M.navy, side * 2.25, 10.36, 63.6);
  }

  // Rounded observation lounge and twin contemporary swept funnels.
  deckShape(-18, 23.5, 6.4, 21.35, 2.25, M.windows);
  deckShape(-18.3, 24, 6.68, 23.64, .24, M.white);
  for (const side of [-1, 1]) for (let z = -14; z < 21; z += 3.3) box(.11, 2.12, .12, M.white, side * 6.43, 22.5, z);
  for (const z of [-15.1, -4.0]) {
    shapedSlab(5.2, 5.7, 1.9, 3.65, M.navy, 0, 23.83, z);
    shapedSlab(5.32, 5.86, 1.96, .56, M.copper, 0, 26.44, z);
    shapedSlab(4.7, 5.3, 1.8, .21, M.black, 0, 27.5, z);
    for (const x of [-1.3, 0, 1.3]) add(new THREE.CylinderGeometry(.43, .42, .44, 12), M.dark, x, 27.93, z - .4);
    for (let k = 0; k < 4; k++) box(5.2, .085, .13, M.cool, 0, 24.58 + k * .36, z - 2.86);
  }
  // Navigation mast, radar radomes, antennas and the flybridge crown.
  for (const side of [-1, 1]) {
    rod([side * 3.9, 23.89, 14], [side * 2.3, 28.25, 13], .18, M.white);
    rod([side * 2.3, 28.25, 13], [side * 1.3, 31.4, 11.7], .115, M.white);
    add(new THREE.CylinderGeometry(1.15, 1.35, .44, 16), M.white, side * 3.85, 24.15, 2.5);
    ellipsoid(1.24, 1.27, 1.24, M.white, side * 3.85, 25.35, 2.5, 20);
    rod([side * 1.3, 31.4, 11.7], [side * 1.3, 34.0, 11.7], .032, M.metal, 6);
  }
  rod([-2.3, 28.25, 13], [2.3, 28.25, 13], .18, M.white);
  rod([-1.3, 31.4, 11.7], [1.3, 31.4, 11.7], .12, M.white);
  box(7.4, .21, .52, M.white, 0, 28.73, 12.95);
  box(3.6, .18, .44, M.white, 0, 31.80, 11.70, 0, .8);
  ellipsoid(.20, .23, .20, M.redGlow, 0, 32.25, 11.7);
  for (const side of [-1, 1]) {
    rod([side * 6.6, 23.8, 20], [side * 6.6, 27.4, 20], .035, M.metal, 6);
    ellipsoid(.14, .14, .14, side < 0 ? M.redGlow : M.greenGlow, side * 11.2, 20.03, 39.7);
  }

  // Bridge: a wide swept shell, unobstructed forward panes, and real consoles.
  deckShape(29.5, 49.7, 10.95, 18.08, .30, M.white, 5);
  deckShape(30.2, 50.1, 11.05, 22.08, .26, M.white, 5);
  deckShape(30.9, 48.4, 10.52, 18.40, .045, M.dark, 5);
  box(15.5, 3.58, .23, M.cool, 0, 20.22, 31.05);
  // Dark blue window belt wraps around the external bridge wings.
  for (const side of [-1, 1]) {
    box(.13, 1.19, side>0?9.0:11.4, M.navy, side * 10.61, 19.07, side>0?38.85:37.65);
    box(.13, .17, side>0?9.0:11.4, M.white, side * 10.65, 19.68, side>0?38.85:37.65);
    railing([[side * 11.25, 18.43, 34.1], [side * 11.25, 18.43, 39.4], [side * 10.4, 18.43, 43.3]], 1.03);
  }
  const front = [[-10.48, 43.23], [-7.42, 47.48], [-3.74, 49.25], [0, 49.79], [3.74, 49.25], [7.42, 47.48], [10.48, 43.23]];
  for (let i = 0; i < front.length - 1; i++) {
    const a = front[i], b = front[i + 1];
    const positions = [a[0], 19.58, a[1], b[0], 19.58, b[1], b[0] * .98, 22.07, b[1] - .45, a[0] * .98, 22.07, a[1] - .45];
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex([0, 1, 2, 0, 2, 3]); g.computeVertexNormals();
    direct(g, M.transparent, glass, 0, 0, 0).castShadow = false;
    rod([a[0], 19.52, a[1]], [b[0], 19.52, b[1]], .14, M.navy);
    rod([a[0], 22.03, a[1] - .4], [b[0], 22.03, b[1] - .4], .12, M.white);
    // Leave the centre sightline entirely clear; the seam is bonded glazing.
    if (Math.abs(a[0]) > .1) rod([a[0], 19.53, a[1]], [a[0] * .98, 22.07, a[1] - .45], .075, M.navy);
    const midX = (a[0] + b[0]) * .5, midZ = (a[1] + b[1]) * .5;
    rod([midX, 19.79, midZ - .025], [midX + .45, 20.58, midZ - .21], .022, M.black, 5);
    rod([midX + .45, 20.58, midZ - .21], [midX + .45, 21.05, midZ - .31], .022, M.black, 5);
  }
  for (const side of [-1, 1]) {
    const pane = direct(new THREE.PlaneGeometry(side>0?8.9:11.3, 2.37), M.transparent, glass, side * 10.60, 20.85, side>0?38.76:37.56, 0, Math.PI / 2);
    pane.castShadow = false;
    for (const z of (side>0?[34.3,37,41.3]:[33,37,41.3])) rod([side * 10.6, 19.55, z], [side * 10.6, 22.08, z], .077, M.navy);
    box(3.4, .85, .68, M.dark, side * 7.50, 19.0, 43.6, 0, side * .56);
    box(3.6, .16, .92, M.navy, side * 7.50, 19.46, 43.6, .1, side * .56);
  }
  // Under-roof warm strips and red emergency fittings illuminate the bridge.
  box(6.5, .035, .08, M.glow, 0, 21.98, 43.7);
  box(.08, .035, 5.5, M.redGlow, -3.55, 21.96, 40.5);
  box(.08, .035, 5.5, M.redGlow, 3.55, 21.96, 40.5);

  // Purpose-built sloping console mesh (not a rectangular obstruction).
  function consoleBody(w, d, h, x, y, z) {
    const geom = new THREE.BufferGeometry();
    const a = -w / 2, b = w / 2, n = -d / 2, f = d / 2;
    const vertices = [a, 0, n, b, 0, n, b, 0, f, a, 0, f, a, h * .78, n, b, h * .78, n, b, h, f, a, h, f];
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex([0, 1, 5, 0, 5, 4, 1, 2, 6, 1, 6, 5, 2, 3, 7, 2, 7, 6, 3, 0, 4, 3, 4, 7, 4, 5, 6, 4, 6, 7, 0, 3, 2, 0, 2, 1]);
    geom.computeVertexNormals();
    direct(geom, M.dark, bridgeGroup, x, y, z);
    direct(new THREE.BoxGeometry(w + .08, .065, d + .04), M.navy, bridgeGroup, x, y + h * .9 + .04, z, -.14);
  }
  consoleBody(4.95, 1.8, 1.33, 0, 18.41, 45.10);
  consoleBody(1.2, 2.0, 1.15, 3.5, 18.41, 43.65);
  consoleBody(1.2, 2.0, 1.15, -3.5, 18.41, 43.65);
  direct(new THREE.BoxGeometry(4.99, .04, .13), M.metal, bridgeGroup, 0, 19.55, 44.18);

  function makeScreen(kind) {
    const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 448;
    const context = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
    return { canvas, context, texture, material, kind };
  }
  const screens = [makeScreen('radar'), makeScreen('navigation'), makeScreen('engines')];
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * 1.36;
    direct(new THREE.BoxGeometry(1.29, .88, .10), M.black, bridgeGroup, x, 20.17, 45.55, .13);
    direct(new THREE.PlaneGeometry(1.16, .70), screens[i].material, bridgeGroup, x, 20.18, 45.49, .13, Math.PI);
    direct(new THREE.BoxGeometry(.29, .17, .28), M.dark, bridgeGroup, x, 19.72, 45.5);
    for (let b = 0; b < 6; b++) direct(new THREE.BoxGeometry(.055, .022, .038), b % 3 === 0 ? M.greenGlow : M.cool, bridgeGroup, x - .37 + b * .15, 19.75, 44.82);
  }
  // A varnished traditional wheel on a modern polished steering pedestal.
  const wheel = new THREE.Group(); wheel.name = 'Helm wheel'; wheel.position.set(0, 19.63, 44.03); wheel.rotation.x = -.13; bridgeGroup.add(wheel);
  const wheelWood = std(0x714529, .25, .15);
  direct(new THREE.TorusGeometry(.43, .042, 9, 40), wheelWood, wheel, 0, 0, 0);
  direct(new THREE.TorusGeometry(.365, .015, 6, 32), M.metal, wheel, 0, 0, -.018);
  direct(new THREE.CylinderGeometry(.1, .1, .16, 18), M.metal, wheel, 0, 0, 0, Math.PI / 2);
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4, sin = Math.sin(angle), cos = Math.cos(angle);
    const spoke = direct(new THREE.CylinderGeometry(.016, .024, .36, 7), M.metal, wheel, sin * .23, cos * .23, 0);
    spoke.rotation.z = -angle;
    const handle = direct(new THREE.CylinderGeometry(.026, .033, .15, 8), wheelWood, wheel, sin * .46, cos * .46, 0);
    handle.rotation.z = -angle;
  }
  direct(new THREE.CylinderGeometry(.10, .13, .64, 16), M.navy, bridgeGroup, 0, 19.49, 44.33, Math.PI / 2 + .13);
  // Twin engine telegraphs to the captain's right.
  const throttle = new THREE.Group(); throttle.name = 'Engine telegraphs'; throttle.position.set(2.00, 19.68, 44.77); bridgeGroup.add(throttle);
  direct(new THREE.BoxGeometry(.41, .10, .62), M.metal, throttle, 0, 0, 0);
  const levers = [];
  for (const x of [-.105, .105]) {
    const pivot = new THREE.Group(); pivot.position.set(x, .085, 0); throttle.add(pivot);
    direct(new THREE.CylinderGeometry(.022, .03, .32, 8), M.metal, pivot, 0, .14, 0);
    direct(new THREE.SphereGeometry(.069, 12, 8), M.black, pivot, 0, .315, 0);
    levers.push(pivot);
  }
  direct(new THREE.BoxGeometry(.11, .042, .16), M.redGlow, bridgeGroup, -2.14, 19.71, 44.87);

  // Whisky decanter, amber liquid, paper label, stopper, and a heavy tumbler.
  const bottle = new THREE.Group(); bottle.name = 'Whisky bottle'; bottle.position.set(-.30, 19.72, 44.90); bridgeGroup.add(bottle);
  const bottleMaterial = new THREE.MeshPhysicalMaterial({ color: 0xb0c4aa, roughness: .08, metalness: .03, transparent: true, opacity: .45, depthWrite: false });
  const amberMaterial = std(0xa75811, .15, .1, { transparent: true, opacity: .86, emissive: 0x6b2906, emissiveIntensity: .24 });
  const profile = [[0, 0], [.133, 0], [.148, .038], [.148, .39], [.126, .465], [.057, .52], [.053, .72], [.064, .731], [.062, .76], [0, .76]].map(([x,y])=>new THREE.Vector2(x,y));
  direct(new THREE.LatheGeometry(profile, 24), bottleMaterial, bottle, 0, 0, 0);
  direct(new THREE.CylinderGeometry(.128, .132, .35, 24), amberMaterial, bottle, 0, .212, 0);
  direct(new THREE.CylinderGeometry(.06, .062, .085, 16), M.copper, bottle, 0, .78, 0);
  const labelCanvas = document.createElement('canvas'); labelCanvas.width = 256; labelCanvas.height = 256;
  const lc = labelCanvas.getContext('2d'); lc.fillStyle = '#e6d5a9'; lc.fillRect(0,0,256,256); lc.strokeStyle='#8c6735'; lc.lineWidth=9; lc.strokeRect(12,12,232,232);
  lc.fillStyle='#292319'; lc.textAlign='center'; lc.font='bold 26px Georgia'; lc.fillText('CAPTAIN’S',128,76); lc.font='bold 29px Georgia';lc.fillText('RESERVE',128,113);lc.font='17px Georgia';lc.fillText('SINGLE MALT',128,152);lc.font='bold 39px Georgia';lc.fillText('18',128,205);
  const labelTex = new THREE.CanvasTexture(labelCanvas); labelTex.colorSpace = THREE.SRGBColorSpace;
  direct(new THREE.CylinderGeometry(.151, .151, .26, 20, 1, true, Math.PI * .68, Math.PI * .66), new THREE.MeshStandardMaterial({ map: labelTex, roughness: .7, side: THREE.DoubleSide }), bottle, 0, .275, 0);
  const tumbler = new THREE.Group(); tumbler.position.set(.32,19.73,44.83); bridgeGroup.add(tumbler);
  const glassMat = new THREE.MeshPhysicalMaterial({color:0xc9e2df,roughness:.075,metalness:.01,transparent:true,opacity:.32,depthWrite:false});
  const glassProfile = [[0,0],[.104,0],[.12,.028],[.133,.25],[.115,.25],[.099,.048],[0,.048]].map(p=>new THREE.Vector2(...p));
  direct(new THREE.LatheGeometry(glassProfile,20),glassMat,tumbler,0,0,0);
  direct(new THREE.CylinderGeometry(.112,.103,.099,20),amberMaterial,tumbler,0,.102,0);
  const iceMat = new THREE.MeshPhysicalMaterial({color:0xd5edf0,roughness:.15,transparent:true,opacity:.53,depthWrite:false});
  direct(new THREE.BoxGeometry(.083,.071,.073),iceMat,tumbler,-.035,.16,.018,.3,.45,.1);
  direct(new THREE.BoxGeometry(.073,.065,.073),iceMat,tumbler,.038,.16,-.02,-.1,.6,.3);
  // Captain's chair is behind the first-person camera, visible from the exterior.
  direct(new THREE.CylinderGeometry(.16,.25,.78,12),M.metal,bridgeGroup,0,18.83,41.05);
  direct(new THREE.BoxGeometry(.74,.18,.8),M.navy,bridgeGroup,0,19.21,41.05);
  direct(new THREE.BoxGeometry(.74,.86,.16),M.navy,bridgeGroup,0,19.68,40.66,.12);
  for(const side of [-1,1]) direct(new THREE.BoxGeometry(.11,.09,.66),M.dark,bridgeGroup,side*.43,19.49,41.01);

  // Painted hull name. Transparent texture avoids rectangular decals.
  function nameTexture() {
    const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=256;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#24374b';ctx.textAlign='center';ctx.font='600 116px Arial';ctx.fillText('MS AURORA',1024,140);ctx.font='32px Arial';ctx.letterSpacing='8px';ctx.fillText('L I M A S S O L',1024,201);
    const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:tex,transparent:true,depthWrite:false,roughness:.5,polygonOffset:true,polygonOffsetFactor:-2});
  }
  const nameMat=nameTexture();
  for(const side of [-1,1]) {
    const z=40.0, x=side*(widthAt(z)*1.023+.03);
    const mesh=direct(new THREE.PlaneGeometry(14.4,1.8),nameMat,exterior,x,7.95,z,0,side*Math.PI/2);
    mesh.castShadow=false;
  }
  // Subtle teak seams are geometry, so the deck keeps its detail from any angle.
  for (let z=-60;z<64;z+=1.38) {
    const w=widthAt(z)-.7;
    if(z<-44 || z>47) box(w*2,.009,.022,M.teakDark,0,z>48?10.145:9.855,z);
    else for(const side of [-1,1]) box(1.72,.009,.025,M.teakDark,side*10.55,9.86,z);
  }

  function merge(parts) {
    const arrays=[];let count=0;
    for(const source of parts) {
      const g=source.index?source.toNonIndexed():source;
      arrays.push(g);count+=g.getAttribute('position').count;
    }
    const p=new Float32Array(count*3),n=new Float32Array(count*3),uv=new Float32Array(count*2);
    let offset=0;
    for(const g of arrays) {
      p.set(g.attributes.position.array,offset*3);
      if(g.attributes.normal)n.set(g.attributes.normal.array,offset*3);
      if(g.attributes.uv)uv.set(g.attributes.uv.array,offset*2);
      offset+=g.attributes.position.count;
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));g.setAttribute('normal',new THREE.BufferAttribute(n,3));g.setAttribute('uv',new THREE.BufferAttribute(uv,2));g.computeBoundingSphere();
    const unique=new Set([...arrays,...parts]);for(const original of unique)original.dispose();return g;
  }
  for(const [material,parts] of buckets) {
    const mesh=new THREE.Mesh(merge(parts),material);mesh.castShadow=true;mesh.receiveShadow=true;mesh.name='Batched ship '+material.color.getHexString();exterior.add(mesh);
  }
  function batchDirectMeshes(parent) {
    const batches=new Map();
    for(const child of [...parent.children]) {
      if(!child.isMesh || Array.isArray(child.material))continue;
      let batch=batches.get(child.material);if(!batch)batches.set(child.material,batch=[]);batch.push(child);
    }
    for(const [material,children] of batches) {
      if(children.length<2)continue;
      const geometries=children.map(child=>{child.updateMatrix();return child.geometry.clone().applyMatrix4(child.matrix);});
      const mesh=new THREE.Mesh(merge(geometries),material);mesh.castShadow=children.some(c=>c.castShadow);mesh.receiveShadow=children.some(c=>c.receiveShadow);
      for(const child of children){parent.remove(child);child.geometry.dispose();}
      parent.add(mesh);
    }
  }
  batchDirectMeshes(bridgeGroup);
  batchDirectMeshes(wheel);
  batchDirectMeshes(tumbler);
  batchDirectMeshes(glass);
  // Lights are kept local: this still works with a low-cost global light rig.
  const bridgeWarm=new THREE.PointLight(0xffdbad,12.5,10,2);bridgeWarm.position.set(0,21.45,43.5);bridgeGroup.add(bridgeWarm);
  const bridgeRed=new THREE.PointLight(0xff3525,0,8,2);bridgeRed.position.set(2.6,21.15,43.4);bridgeGroup.add(bridgeRed);

  // Bring the helm close to the glazing so the bow is visible below the horizon.
  bridgeGroup.position.z=3.6;
  const bridgeCameraPosition=new THREE.Vector3(0,20.48,45.55);
  const bridgeLookTarget=new THREE.Vector3(0,19.30,85);
  const deckZones=[
    {name:'port-promenade',minX:-11.2,maxX:-9.75,minZ:-36,maxZ:30,y:9.9},
    {name:'starboard-promenade',minX:9.75,maxX:11.2,minZ:-36,maxZ:30,y:9.9},
    {name:'aft-port',minX:-8.4,maxX:-4.6,minZ:-55,maxZ:-44,y:13.15},
    {name:'aft-starboard',minX:4.6,maxX:8.4,minZ:-55,maxZ:-44,y:13.15},
    {name:'aft-stern',minX:-7.5,maxX:7.5,minZ:-61,maxZ:-58,y:13.15},
    {name:'bow',minX:-4.4,maxX:4.4,minZ:53,maxZ:60,y:10.1}
  ];
  let lastScreen=-100;
  const bottleHome=bottle.position.clone();
  // Tilt the neck toward the viewer rather than swinging the bottle sideways.
  // Its nearest cap remains over one metre from the camera, even at full lift;
  // the whole silhouette fits a portrait phone including the drunken head sway.
  const bottleDrink=new THREE.Vector3(-.06,19.99,44.50);
  function updateScreens(time,state) {
    const damage=Number(state.damage)||0,panic=Number(state.panic)||0;
    const rudder=Number(state.rudder)||0, power=Number(state.throttle)||0;
    for(const screen of screens) {
      const c=screen.context,w=screen.canvas.width,h=screen.canvas.height;
      c.fillStyle='#03131b';c.fillRect(0,0,w,h);c.strokeStyle='#163441';c.lineWidth=1;
      for(let x=0;x<w;x+=48){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}
      for(let y=0;y<h;y+=48){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
      c.fillStyle='#5cd9d2';c.font='bold 27px monospace';c.textAlign='left';c.fillText(screen.kind==='radar'?'X-BAND RADAR':screen.kind==='navigation'?'NAVIGATION':'ENGINE CONTROL',25,40);
      c.fillStyle='#92b7be';c.font='18px monospace';c.fillText('MS AURORA · BRIDGE 01',25,71);
      if(screen.kind==='radar') {
        const cx=370,cy=255,r=160;c.strokeStyle='#2c7862';c.lineWidth=2;
        for(let i=1;i<=4;i++){c.beginPath();c.arc(cx,cy,r*i/4,0,Math.PI*2);c.stroke();}
        c.beginPath();c.moveTo(cx-r,cy);c.lineTo(cx+r,cy);c.moveTo(cx,cy-r);c.lineTo(cx,cy+r);c.stroke();
        const angle=time*.50;c.strokeStyle='#96ffb5';c.lineWidth=3;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r);c.stroke();
        for(let i=0;i<7;i++){const a=i*2.3+.4,rr=72+(i*29)%86;c.fillStyle=i%3?'#67dbbd':'#ffb66b';c.fillRect(cx+Math.cos(a)*rr-4,cy+Math.sin(a)*rr-4,8,8);}
        c.fillStyle='#cafcef';c.font='18px monospace';c.fillText('RNG  3.0 NM',25,421);c.fillText('SEA CLUTTER  AUTO',475,421);
      } else if(screen.kind==='navigation') {
        c.fillStyle='#fff0c9';c.font='bold 79px monospace';c.fillText(String((Math.round(-(Number(state.heading)||0)*180/Math.PI)%360+360)%360).padStart(3,'0')+'°',38,185);
        c.fillStyle='#6ff1d3';c.font='bold 50px monospace';c.fillText((Number.isFinite(state.speed)?Math.abs(state.speed)*1.944:power*22).toFixed(1)+' KN',38,255);
        c.font='21px monospace';c.fillStyle='#a1bbc3';c.fillText('RUDDER',36,316);c.fillStyle='#163942';c.fillRect(36,336,660,20);c.fillStyle='#72e2d2';c.fillRect(366,336,rudder*310||3,20);
        c.fillStyle='#ffb474';c.font='bold 27px monospace';c.fillText('MANUAL HELM',36,402);
      } else {
        for(let i=0;i<2;i++){const x=44+i*345;c.strokeStyle='#4ab5b9';c.lineWidth=12;c.beginPath();c.arc(x+140,218,103,Math.PI*.75,Math.PI*2.25);c.stroke();c.strokeStyle='#82ffcc';c.beginPath();c.arc(x+140,218,103,Math.PI*.75,Math.PI*.75+power*Math.PI*1.5);c.stroke();c.fillStyle='#cff1e5';c.font='bold 44px monospace';c.fillText(Math.round(power*100)+'%',x+87,230);c.font='19px monospace';c.fillText(i?'STARBOARD':'PORT',x+90,278);}
        c.font='bold 23px monospace';c.fillStyle=damage>55?'#ff6950':'#92cbbc';c.fillText('HULL '+Math.round(100-damage)+'%  •  PANIC '+Math.round(panic)+'%',38,388);
      }
      screen.texture.needsUpdate=true;
    }
  }
  updateScreens(0,{throttle:0,damage:0,panic:0,rudder:0});
  function update(time,dt,state={}) {
    if(time<lastScreen)lastScreen=-100;
    wheel.rotation.z=(Number.isFinite(state.wheelDemand)?state.wheelDemand:(Number(state.rudder)||0))*Math.PI*.84;
    for(const lever of levers)lever.rotation.x=-(Number(state.throttle)||0)*.72+.25;
    const drink=THREE.MathUtils.clamp(Number(state.drinkAnim)||0,0,1);
    const lift=Math.sin(drink*Math.PI);
    bottle.position.lerpVectors(bottleHome,bottleDrink,lift);
    bottle.rotation.set(-lift*1.08,0,-lift*.10);
    const emergency=Math.max(0,((Number(state.damage)||0)-25)/75,((Number(state.panic)||0)-38)/62);
    bridgeRed.intensity=emergency*(7+Math.sin(time*5.8)*4);
    bridgeWarm.intensity=12.5-3*emergency;
    if(time-lastScreen>.24){lastScreen=time;updateScreens(time,state);}
  }
  group.userData={length:143,beam:24.6,deckZones,waterline:0};
  return {group,exterior,bridgeGroup,bridgeCameraPosition,bridgeLookTarget,deckZones,wheel,throttle,glass,bottle,tumbler,update,widthAt};
}
