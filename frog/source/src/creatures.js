import * as THREE from 'three';

// Original anatomical meshes. Every organic surface below is lofted from sculpt
// profiles, weighted to a joint hierarchy and animated in local skeleton space.
const TAU = Math.PI * 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const hash = (x, y = 0, z = 0) => { const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return n - Math.floor(n); };
const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const templateCache = new Map();
const textureCache = new Map();
const UP = V(0, 1, 0);
const tmpV = V();

function sample(values, t) {
  if (typeof values === 'number') return values;
  const n = clamp(t) * (values.length - 1), i = Math.min(values.length - 2, Math.floor(n));
  const f = n - i, s = f * f * (3 - 2 * f);
  return lerp(values[i], values[i + 1], s);
}
function skinAlong(ids, t) {
  if (ids.length === 1) return [[ids[0], 1]];
  const n = clamp(t) * (ids.length - 1), i = Math.min(ids.length - 2, Math.floor(n)), f = n - i;
  return [[ids[i], 1 - f], [ids[i + 1], f]];
}
function paintResult(c, mask = 0) { return { color: c, mask }; }
function colorArray(c) { if (Array.isArray(c)) return c; const a = new THREE.Color(c); return [a.r, a.g, a.b]; }

class Surface {
  constructor(detail = 1) { this.detail = detail; this.p = []; this.uv = []; this.c = []; this.mask = []; this.si = []; this.sw = []; this.idx = []; }
  vertex(p, uv = [0, 0], weights = [[0, 1]], paint = { color: [1, 1, 1], mask: 0 }) {
    const id = this.p.length / 3;
    this.p.push(p.x, p.y, p.z); this.uv.push(...uv); this.c.push(...paint.color); this.mask.push(paint.mask || 0);
    let sum = weights.reduce((s, v) => s + v[1], 0) || 1;
    for (let i = 0; i < 4; i++) { this.si.push(weights[i]?.[0] || 0); this.sw.push((weights[i]?.[1] || 0) / sum); }
    return id;
  }
  tri(a, b, c) { this.idx.push(a, b, c); }
  quad(a, b, c, d, reverse = false) { if (reverse) { this.tri(a, c, b); this.tri(b, c, d); } else { this.tri(a, b, c); this.tri(b, d, c); } }
  tube(points, rx, ry, options = {}) {
    const { bones = [0], paint = () => paintResult([.7, .7, .7], 1), distort } = options;
    const segments = Math.max(2, Math.round((options.segments ?? 28) * this.detail));
    const radial = Math.max(3, Math.round((options.radial ?? 16) * this.detail));
    const curve = new THREE.CatmullRomCurve3(points.map(p => p.isVector3 ? p : V(...p)), false, 'catmullrom', .5);
    const start = this.p.length / 3;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments, center = curve.getPoint(t), tangent = curve.getTangent(t).normalize();
      const side = new THREE.Vector3().crossVectors(Math.abs(tangent.y) > .94 ? V(0, 0, 1) : UP, tangent).normalize();
      const top = new THREE.Vector3().crossVectors(tangent, side).normalize();
      for (let j = 0; j <= radial; j++) {
        const u = j / radial, a = u * TAU;
        const x = Math.cos(a) * sample(rx, t), y = Math.sin(a) * sample(ry, t);
        const p = center.clone().addScaledVector(side, x).addScaledVector(top, y);
        if (distort) distort(p, t, a, center);
        const weights = typeof bones === 'function' ? bones(t, p) : skinAlong(bones, t);
        this.vertex(p, [u, t], weights, paint(p, t, a));
      }
    }
    for (let i = 0; i < segments; i++) for (let j = 0; j < radial; j++) {
      const a = start + i * (radial + 1) + j; this.quad(a, a + 1, a + radial + 1, a + radial + 2);
    }
    // Closed sculpt surfaces prevent open joint ends when skinning bends a limb.
    const c0=curve.getPoint(0), c1=curve.getPoint(1);
    const w0=typeof bones==='function'?bones(0,c0):skinAlong(bones,0);
    const w1=typeof bones==='function'?bones(1,c1):skinAlong(bones,1);
    const cap0=this.vertex(c0,[.5,0],w0,paint(c0,0,0));
    const cap1=this.vertex(c1,[.5,1],w1,paint(c1,1,0));
    const last=start+segments*(radial+1);
    for(let j=0;j<radial;j++){this.tri(cap0,start+j+1,start+j);this.tri(cap1,last+j,last+j+1);}
    return this;
  }
  ellipsoid(center, radius, { bone = 0, rings = 14, radial = 24, paint = () => paintResult([1, 1, 1]), rotationY = 0, sculpt } = {}) {
    rings = Math.max(3, Math.round(rings * this.detail)); radial = Math.max(4, Math.round(radial * this.detail));
    const start = this.p.length / 3, c = V(...center), cy = Math.cos(rotationY), sy = Math.sin(rotationY);
    for (let i = 0; i <= rings; i++) {
      const v = i / rings, lat = Math.PI * v;
      for (let j = 0; j <= radial; j++) {
        const u = j / radial, lon = TAU * u;
        let x = Math.sin(lat) * Math.cos(lon) * radius[0], y = Math.cos(lat) * radius[1], z = Math.sin(lat) * Math.sin(lon) * radius[2];
        const local = V(x, y, z); if (sculpt) sculpt(local, u, v);
        const p = V(local.x * cy + local.z * sy, local.y, -local.x * sy + local.z * cy).add(c);
        this.vertex(p, [u, v], [[bone, 1]], paint(local, u, v));
      }
    }
    for (let i = 0; i < rings; i++) for (let j = 0; j < radial; j++) {
      const a = start + i * (radial + 1) + j; this.quad(a, a + 1, a + radial + 1, a + radial + 2);
    }
    return this;
  }
  leaf(points, widths, { bone = 0, bones, segments = 14, across = 6, color = [.35, .45, .22], ridge = .025, mask = 0, vein = true } = {}) {
    segments = Math.max(2, Math.round(segments * this.detail)); across = Math.max(2, Math.round(across * this.detail));
    const curve = new THREE.CatmullRomCurve3(points.map(p => p.isVector3 ? p : V(...p)), false, 'catmullrom', .5), start = this.p.length / 3;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments, p = curve.getPoint(t), tangent = curve.getTangent(t).normalize();
      const side = new THREE.Vector3().crossVectors(Math.abs(tangent.y) > .95 ? V(0, 0, 1) : UP, tangent).normalize();
      for (let j = 0; j <= across; j++) {
        const w = j / across * 2 - 1, q = p.clone().addScaledVector(side, w * sample(widths, t));
        q.y += ridge * (1 - Math.abs(w)) * Math.sin(t * Math.PI);
        const shade = (vein ? .88 + .12 * Math.cos(t * 45 + Math.abs(w) * 9) : 1) + .12 * (1 - Math.abs(w));
        this.vertex(q, [(w + 1) / 2, t], bones ? skinAlong(bones, t) : [[bone, 1]], paintResult(color.map(v => v * shade), mask));
      }
    }
    for (let i = 0; i < segments; i++) for (let j = 0; j < across; j++) { const a = start + i * (across + 1) + j; this.quad(a, a + 1, a + across + 1, a + across + 2, true); }
    return this;
  }
  geometry() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    g.setAttribute('skinTintMask', new THREE.Float32BufferAttribute(this.mask, 1));
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(this.si, 4));
    g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(this.sw, 4));
    g.setIndex(this.idx); g.computeVertexNormals(); g.computeBoundingSphere();
    return g;
  }
}

function buildRig() {
  const defs = [], ids = {};
  return {
    defs, ids,
    bone(name, pos, parent = null) { const i = defs.length; ids[name] = i; defs.push({ name, p: pos, parent: typeof parent === 'string' ? ids[parent] : parent }); return i; }
  };
}
function frogPaint(p, t = 0, a = 0) {
  const belly = 1 - smooth(.26, .47, p.y);
  const d = Math.sin(p.x * 31 + Math.sin(p.z * 13)) * Math.sin(p.z * 25 + p.y * 23);
  const spot = smooth(.42, .77, d) * .5, shade = .75 - spot + .06 * Math.sin(p.x * 75 + p.z * 64);
  const stripe = (1 - smooth(.026, .065, Math.abs(p.x))) * smooth(.52, .67, p.y);
  if (stripe > .3) return paintResult([.78, .61, .18].map(v => lerp(shade, v, stripe)), 1 - stripe);
  return paintResult([lerp(shade, .76, belly), lerp(shade, .72, belly), lerp(shade, .49, belly)], 1 - belly * .96);
}
function frogLimbPaint(p, t=0, a=0) {
  const underside=(1-smooth(-.55,.1,Math.sin(a)))*.65;
  const spot=smooth(.38,.78,Math.sin(p.x*35+p.z*17)*Math.sin(p.y*39-p.z*23));
  const shade=.79-.36*spot;
  return paintResult([lerp(shade,.70,underside),lerp(shade,.66,underside),lerp(shade,.43,underside)],1-underside*.92);
}
function frogTemplate(detail = 1) {
  const rig = buildRig(), S = new Surface(detail), E = new Surface(detail), A = new Surface(detail), C = new Surface(detail);
  const pelvis = rig.bone('pelvis', [0, .36, -.35]);
  const spine = rig.bone('spine', [0, .43, -.07], pelvis);
  const head = rig.bone('head', [0, .47, .29], spine);
  const jaw = rig.bone('jaw', [0, .39, .37], head);
  const throat = rig.bone('throat', [0, .29, .36], jaw);
  const eyeL = rig.bone('eyeL', [-.292, .685, .530], head), eyeR = rig.bone('eyeR', [.292, .685, .530], head);
  const mouth = rig.bone('mouth', [0, .405, .755], jaw);
  S.tube([[0, .35, -.72], [0, .42, -.48], [0, .43, -.08], [0, .47, .30], [0, .46, .58], [0, .43, .75]], [.012, .32, .435, .43, .34, .018], [.012, .245, .27, .235, .145, .025], {
    segments: 42, radial: 36,
    bones: (t) => skinAlong([pelvis, pelvis, spine, head, head], t), paint: frogPaint,
    distort(p, t, a) { const upper = Math.max(0, Math.sin(a)); p.y += upper * .008 * Math.sin(p.x * 70 + p.z * 50); const ridge = Math.exp(-Math.pow((Math.abs(p.x) - .22) / .035, 2)); p.y += ridge * upper * .023 * Math.sin(t * Math.PI); }
  });
  // Orbital ridges are part of the skin mesh, with independent blinking eye bones.
  for (const side of [-1, 1]) {
    const eyeBone = side < 0 ? eyeL : eyeR, center = [side * .292, .685, .530];
    S.ellipsoid([side * .292, .605, .405], [.150, .145, .165], { bone: head, rings: 14, radial: 24, paint: p => frogPaint(p.clone().add(V(side * .292, .605, .405))) });
    E.ellipsoid(center, [.106, .103, .113], {
      bone: eyeBone, radial: 40, rings: 22, rotationY: side * .32,
      paint(p, u, v) {
        const front = p.z / .113, pupil = Math.pow(p.x / .084, 2) + Math.pow(p.y / .029, 2);
        if (front < .12) return paintResult([.065, .14, .018]);
        if (front < .34) return paintResult([.04, .065, .012]);
        if (front > .52 && pupil < 1) return paintResult([.008, .012, .006]);
        const striation = .12 * Math.sin(Math.atan2(p.y, p.x) * 51 + Math.hypot(p.x, p.y) * 120);
        return paintResult([.74 + striation, .52 + striation * .6, .08 + striation * .12]);
      }
    });
    const hip = rig.bone(`hip${side}`, [side * .33, .32, -.33], pelvis);
    const knee = rig.bone(`knee${side}`, [side * .64, .24, .025], hip);
    const ankle = rig.bone(`ankle${side}`, [side * .46, .09, -.61], knee);
    const foot = rig.bone(`foot${side}`, [side * .64, .045, -.49], ankle);
    S.ellipsoid([side*.64,.24,.025],[.143,.128,.148],{bone:knee,rings:12,radial:18,paint:(p,u,v)=>frogLimbPaint(p.clone().add(V(side*.64,.24,.025)),u,Math.PI*(.5-v)),sculpt(p){p.x*=1+.06*Math.sin(p.z*30);}});
    S.ellipsoid([side*.46,.09,-.61],[.069,.052,.071],{bone:ankle,rings:8,radial:12,paint:(p,u,v)=>frogLimbPaint(p.clone().add(V(side*.46,.09,-.61)),u,Math.PI*(.5-v))});
    S.tube([[side * .30, .33, -.35], [side * .50, .30, -.21], [side * .64, .24, .025]], [.13, .223, .14], [.13, .173, .12], { segments: 20, radial: 22, bones: [hip, hip, knee], paint: frogLimbPaint });
    S.tube([[side * .64, .24, .025], [side * .57, .15, -.27], [side * .46, .09, -.61]], [.12, .105, .065], [.11, .09, .05], { segments: 20, radial: 18, bones: [knee, knee, ankle], paint: frogLimbPaint });
    S.tube([[side * .46, .09, -.61], [side * .57, .06, -.55], [side * .72, .035, -.35]], [.06, .07, .047], [.047, .04, .025], { segments: 12, radial: 14, bones: [ankle, foot, foot], paint: frogLimbPaint });
    const hindEnds = [];
    for (let k = 0; k < 4; k++) {
      const x = side * (.70 + (k - 1.5) * .075), z = -.34 + .36 * (1 - Math.abs(k - 1.5) * .16);
      const start = [side * (.67 + (k - 1.5) * .028), .036, -.37], mid = [lerp(start[0], x, .53), .037, -.18];
      S.tube([start, mid, [x, .035, z]], [.032, .024, .007], [.020, .014, .006], { segments: 10, radial: 8, bones: [foot], paint: frogLimbPaint });
      hindEnds.push([x, .034, z * .66 - .12]);
    }
    for (let k = 0; k < 3; k++) {
      const a = V(side * .68, .035, -.36), b = V(...hindEnds[k]), c = V(...hindEnds[k + 1]);
      const mid = b.clone().lerp(c, .5).lerp(a, .2), i = S.vertex(a, [0, 0], [[foot, 1]], frogPaint(a));
      const j = S.vertex(b, [1, 0], [[foot, 1]], frogPaint(b)), h = S.vertex(mid, [.5, 1], [[foot, 1]], frogPaint(mid)), l = S.vertex(c, [0, 1], [[foot, 1]], frogPaint(c));
      S.tri(i, j, h); S.tri(i, h, l); S.tri(h, j, l);
    }
    const shoulder = rig.bone(`shoulder${side}`, [side * .30, .43, .31], spine);
    const elbow = rig.bone(`elbow${side}`, [side * .48, .235, .40], shoulder);
    const wrist = rig.bone(`wrist${side}`, [side * .46, .058, .62], elbow);
    S.ellipsoid([side*.48,.235,.40],[.064,.066,.064],{bone:elbow,rings:8,radial:12,paint:(p,u,v)=>frogLimbPaint(p.clone().add(V(side*.48,.235,.4)),u,Math.PI*(.5-v))});
    S.tube([[side * .30, .43, .31], [side * .43, .33, .335], [side * .48, .235, .40]], [.092, .085, .061], [.09, .077, .059], { segments: 14, radial: 16, bones: [shoulder, shoulder, elbow], paint: frogLimbPaint });
    S.tube([[side * .48, .235, .40], [side * .48, .14, .48], [side * .46, .058, .62]], [.062, .07, .039], [.058, .057, .03], { segments: 12, radial: 14, bones: [elbow, elbow, wrist], paint: frogLimbPaint });
    for (let k = 0; k < 4; k++) {
      const x = side * (.44 + (k - 1.5) * .075), z = .81 + .04 * (1.5 - Math.abs(k - 1.5));
      S.tube([[side * .46, .055, .61], [lerp(side * .46, x, .6), .031, .74], [x, .025, z]], [.025, .017, .009], [.021, .014, .006], { segments: 9, radial: 8, bones: [wrist], paint: frogLimbPaint });
      S.ellipsoid([x, .025, z], [.017, .01, .021], { bone: wrist, rings: 6, radial: 10, paint: () => paintResult([.71, .65, .40], .4) });
    }
    // Woven reed identification band, modelled into the forearm, follows its rig.
    for (let band = 0; band < 3; band++) {
      const y = .32 + band * .016;
      S.tube(Array.from({ length: 17 }, (_, k) => [side * .415 + Math.cos(k / 16 * TAU) * .085, y + Math.sin(k / 16 * TAU) * .072, .355 + Math.sin(k / 16 * TAU) * .02]), .009, .009, { segments: 20, radial: 6, bones: [shoulder], paint: () => paintResult([.38, .55, .12], .25) });
    }
    A.leaf([[side * .12, .695, -.08], [side * .31, .69, -.19], [side * .48, .52, -.38]], [.012, .14, .03], { bone: spine, color: [.26, .40, .12], ridge: .025, segments: 15 });
    A.leaf([[side * .04, .715, .05], [side * .20, .73, -.03], [side * .36, .59, -.2]], [.008, .13, .015], { bone: spine, color: [.34, .48, .18], ridge: .035, segments: 15 });
    C.leaf([[side * .17, .76, .40], [side * .21, .89, .32], [side * .24, .91, .18]], [.025, .055, .002], { bone: head, color: [.69, .53, .19], ridge: .015, segments: 12 });
  }
  const lipPoints = Array.from({ length: 13 }, (_, i) => { const x = (i / 12 - .5) * .74; return [x, .414 - .025 * Math.abs(x) / .37, .748 - .20 * Math.pow(x / .37, 2)]; });
  S.tube(lipPoints, .009, .009, { segments: 34, radial: 8, bones: [head], paint: () => paintResult([.045, .065, .016]) });
  S.tube(lipPoints.map(p => [p[0], p[1] - .019, p[2] + .001]), .009, .014, { segments: 34, radial: 8, bones: [jaw], paint: () => paintResult([.65, .61, .35]) });
  S.ellipsoid([0, .284, .385], [.25, .125, .265], { bone: throat, rings: 18, radial: 28, paint: () => paintResult([.75, .72, .48]), sculpt(p) { p.y += .01 * Math.sin(p.x * 80) * Math.cos(p.z * 60); } });
  return { type: 'frog', rig, skin: S.geometry(), eyes: E.geometry(), armor: A.geometry(), crest: C.geometry(), mouth, length: 1.7, height: .8, scale: 1 };
}

function feather(surface, start, end, width, bone, shade, curvature = .05) {
  const mid = V(...start).lerp(V(...end), .5); mid.y += curvature;
  surface.leaf([start, mid.toArray(), end], [.012, width, width * .7, .002], { bone, segments: 13, across: 6, ridge: .012, color: shade, vein: true });
}
function heronTemplate() {
  const rig = buildRig(), S = new Surface(), E = new Surface();
  const root = rig.bone('pelvis', [0, 2.45, -.16]);
  const chest = rig.bone('spine', [0, 2.79, .02], root);
  const neck0 = rig.bone('neck0', [0, 2.97, .24], chest), neck1 = rig.bone('neck1', [0, 3.35, .03], neck0);
  const neck2 = rig.bone('neck2', [0, 3.82, .18], neck1), head = rig.bone('head', [0, 4.19, .60], neck2);
  const jaw = rig.bone('jaw', [0, 4.12, .70], head), mouth = rig.bone('mouth', [0, 4.11, 1.48], jaw);
  const eyeL = rig.bone('eyeL', [-.125, 4.25, .69], head), eyeR = rig.bone('eyeR', [.125, 4.25, .69], head);
  const feathersPaint = p => { const dark = smooth(2.70, 3.02, p.y) * .35; return paintResult([.54 - dark, .59 - dark, .61 - dark]); };
  S.tube([[0, 2.43, -.95], [0, 2.58, -.53], [0, 2.78, -.05], [0, 2.99, .27]], [.02, .34, .41, .14], [.02, .39, .48, .18], { segments: 30, radial: 28, bones: [root, root, chest, chest], paint: feathersPaint });
  S.tube([[0, 2.97, .24], [0, 3.22, .16], [0, 3.46, .015], [0, 3.83, .18], [0, 4.12, .52], [0, 4.21, .65]], [.16, .15, .12, .10, .10, .13], [.17, .17, .14, .12, .13, .14], { segments: 40, radial: 20, bones: [neck0, neck0, neck1, neck2, head, head], paint(p, t, a) { const stripe = Math.cos(a) > .7 ? .65 : .9; return paintResult([stripe, stripe * .99, stripe * .91]); } });
  S.tube([[0, 4.18, .36], [0, 4.28, .57], [0, 4.25, .76], [0, 4.18, .91]], [.018, .15, .14, .045], [.02, .16, .14, .07], { segments: 22, radial: 20, bones: [head], paint(p) { return p.y > 4.32 ? paintResult([.07, .10, .12]) : paintResult([.83, .86, .82]); } });
  // The bill is a flattened, ridged spear with separate lower jaw articulation.
  S.tube([[0, 4.19, .81], [0, 4.18, 1.04], [0, 4.15, 1.32], [0, 4.12, 1.60]], [.072, .055, .027, .001], [.060, .044, .022, .001], { segments: 20, radial: 10, bones: [head], paint(p, t) { return paintResult([lerp(.74, .34, t), lerp(.47, .24, t), .075]); } });
  S.tube([[0, 4.112, .81], [0, 4.105, 1.06], [0, 4.103, 1.36], [0, 4.115, 1.59]], [.063, .046, .022, .001], [.026, .02, .012, .001], { segments: 18, radial: 8, bones: [jaw], paint: () => paintResult([.68, .38, .07]) });
  for (const side of [-1, 1]) {
    const eye = side < 0 ? eyeL : eyeR;
    E.ellipsoid([side * .132, 4.255, .69], [.029, .039, .043], { bone: eye, rings: 10, radial: 18, paint: p => Math.abs(p.x) > .022 && Math.abs(p.y) < .018 && Math.abs(p.z) < .021 ? paintResult([.005, .008, .006]) : paintResult([.90, .70, .13]) });
    const hip = rig.bone(`hip${side}`, [side * .14, 2.47, -.12], root), knee = rig.bone(`knee${side}`, [side * .18, 1.50, -.12], hip);
    const ankle = rig.bone(`ankle${side}`, [side * .22, .16, .04], knee), foot = rig.bone(`foot${side}`, [side * .22, .075, .15], ankle);
    const legPaint = (p, t) => { const scale = .8 + .2 * Math.sin(p.y * 110); return paintResult([.38 * scale, .36 * scale, .21 * scale]); };
    S.tube([[side * .14, 2.47, -.12], [side * .18, 1.73, -.15], [side * .18, 1.50, -.12]], [.077, .040, .049], [.074, .037, .049], { segments: 20, radial: 12, bones: [hip, hip, knee], paint: legPaint });
    S.tube([[side * .18, 1.50, -.12], [side * .20, .70, -.02], [side * .22, .16, .04]], [.042, .024, .031], [.042, .023, .03], { segments: 22, radial: 10, bones: [knee, knee, ankle], paint: legPaint });
    for (let k = 0; k < 4; k++) {
      const spread = k < 3 ? (k - 1) * .23 : -.08, z = k < 3 ? .54 - .06 * Math.abs(k - 1) : -.21;
      S.tube([[side * .22, .16, .04], [side * .22 + spread * .5, .065, (z + .04) * .55], [side * .22 + spread, .035, z]], [.025, .017, .006], [.023, .013, .005], { segments: 12, radial: 8, bones: [foot], paint: legPaint });
    }
    const shoulder = rig.bone(`wing${side}`, [side * .31, 2.91, -.03], chest), elbow = rig.bone(`wingElbow${side}`, [side * .94, 2.83, -.12], shoulder), wrist = rig.bone(`wingWrist${side}`, [side * 1.50, 2.68, -.24], elbow);
    S.leaf([[side * .31, 2.91, -.03], [side * .95, 2.84, -.18], [side * 1.58, 2.69, -.35]], [.08, .29, .10], { bones: [shoulder, elbow, wrist], segments: 22, across: 10, ridge: .05, color: [.36, .43, .47] });
    for (let j = 0; j < 15; j++) {
      const x = .42 + j * .088, bone = j < 6 ? shoulder : j < 11 ? elbow : wrist;
      feather(S, [side * x, 2.89 - j * .014, -.05 - j * .012], [side * (x + .22 + j * .009), 2.73 - j * .023, -.76 - j * .018], .105 - j * .002, bone, [.26 + j * .004, .32 + j * .004, .36 + j * .004]);
      if (j < 12) feather(S, [side * x, 2.94 - j * .014, .035], [side * (x + .10), 2.86 - j * .017, -.44], .077, bone, [.49, .55, .57]);
    }
    for (let j = 0; j < 11; j++) feather(S, [side * (.11 + .015 * j), 2.86 - .042 * j, -.21], [side * (.29 + .009 * j), 2.70 - .044 * j, -.75 - .022 * j], .075, chest, [.51 + j * .013, .56 + j * .012, .56 + j * .012]);
    feather(S, [side * .065, 4.34, .51], [side * .13, 4.28, -.02], .018, head, [.04, .07, .09], .025);
  }
  for (let i = 0; i < 9; i++) feather(S, [(i - 4) * .045, 2.53, -.65], [(i - 4) * .075, 2.34, -1.34 - .1 * (1 - Math.abs(i - 4) / 4)], .07, root, [.21, .28, .31]);
  // Throat plumes make the long neck read as feathered rather than a smooth pipe.
  for (let i = 0; i < 9; i++) feather(S, [(i - 4) * .025, 3.06, .35], [(i - 4) * .044, 2.48 - .06 * (i % 3), .42], .032, chest, [.79, .80, .72], .01);
  return { type: 'heron', rig, skin: S.geometry(), eyes: E.geometry(), mouth, length: 3.0, height: 4.55, scale: 1 };
}

function snakeTemplate() {
  const rig = buildRig(), S = new Surface(), E = new Surface(), T = new Surface();
  const head = rig.bone('head', [0, .27, 1.97]);
  const bodyIds = [head];
  for (let i = 1; i <= 20; i++) bodyIds.push(rig.bone(`coil${i}`, [0, .23, 1.97 - i * .22], bodyIds[i - 1]));
  const jaw = rig.bone('jaw', [0, .205, 2.10], head), mouth = rig.bone('mouth', [0, .19, 2.48], jaw);
  const eyeL = rig.bone('eyeL', [-.183, .346, 2.21], head), eyeR = rig.bone('eyeR', [.183, .346, 2.21], head);
  const bodyPaint = (p, t, a) => {
    const belly = 1 - smooth(.13, .22, p.y), ridge = .73 - .26 * smooth(.2, .65, Math.sin(p.z * 7 + p.x * 18));
    return paintResult([lerp(ridge, .65, belly), lerp(ridge, .60, belly), lerp(ridge, .36, belly)], 1 - belly);
  };
  S.tube([[0, .25, 2.05], [0, .23, 1.4], [0, .23, .5], [0, .22, -.4], [0, .18, -1.5], [0, .09, -2.46]], [.13, .186, .205, .18, .115, .002], [.11, .16, .17, .15, .09, .003], { segments: 100, radial: 20, bones: t => skinAlong(bodyIds, t), paint: bodyPaint, distort(p, t, a) { p.y += .003 * Math.sin(t * 390) * Math.sin(a * 12); } });
  S.tube([[0, .265, 1.86], [0, .29, 2.07], [0, .285, 2.27], [0, .245, 2.48]], [.115, .237, .202, .035], [.10, .12, .105, .038], { segments: 24, radial: 24, bones: [head], paint: bodyPaint });
  S.tube([[0, .192, 1.99], [0, .179, 2.25], [0, .207, 2.47]], [.14, .19, .025], [.027, .035, .006], { segments: 18, radial: 16, bones: [jaw], paint: () => paintResult([.66, .63, .42]) });
  for (const side of [-1, 1]) {
    E.ellipsoid([side * .183, .346, 2.21], [.045, .043, .05], { bone: side < 0 ? eyeL : eyeR, rings: 12, radial: 20, rotationY: side * .9, paint(p) { return Math.abs(p.x) < .012 && p.z > .015 ? paintResult([.009, .008, .005]) : paintResult([.69, .51, .12]); } });
    S.tube([[side * .20, .228, 2.06], [side * .197, .218, 2.29], [side * .045, .225, 2.475]], .004, .004, { segments: 20, radial: 6, bones: [head], paint: () => paintResult([.05, .06, .025]) });
    T.tube([[0, .194, 2.47], [0, .19, 2.73], [side * .06, .18, 2.84]], [.014, .01, .001], [.007, .005, .001], { segments: 16, radial: 6, bones: [jaw], paint: () => paintResult([.28, .025, .035]) });
  }
  return { type: 'snake', rig, skin: S.geometry(), eyes: E.geometry(), tongue: T.geometry(), mouth, length: 5, height: .43, scale: 1 };
}

function fishTemplate() {
  const rig = buildRig(), S = new Surface(), E = new Surface();
  const spine = rig.bone('spine', [0, .60, .18]), head = rig.bone('head', [0, .61, .78], spine);
  const tail0 = rig.bone('tail0', [0, .55, -.44], spine), tail1 = rig.bone('tail1', [0, .49, -.99], tail0), tail = rig.bone('tail', [0, .48, -1.43], tail1);
  const jaw = rig.bone('jaw', [0, .42, 1.03], head), mouth = rig.bone('mouth', [0, .43, 1.55], jaw);
  const eyeL = rig.bone('eyeL', [-.22, .72, 1.06], head), eyeR = rig.bone('eyeR', [.22, .72, 1.06], head);
  const fishPaint = p => {
    const belly = 1 - smooth(.35, .62, p.y), spot = .74 - .25 * smooth(.1, .6, Math.sin(p.z * 18 + p.y * 29) * Math.sin(p.y * 35));
    return paintResult([lerp(spot, .81, belly), lerp(spot, .78, belly), lerp(spot, .61, belly)], 1 - belly);
  };
  S.tube([[0, .48, -1.46], [0, .51, -.92], [0, .61, -.28], [0, .64, .34], [0, .62, .84], [0, .55, 1.24], [0, .52, 1.56]], [.018, .15, .31, .35, .29, .19, .027], [.035, .22, .46, .48, .32, .19, .05], { segments: 54, radial: 28, bones: t => skinAlong([tail, tail1, tail0, spine, head, head, head], t), paint: fishPaint });
  S.tube([[0, .43, .92], [0, .36, 1.25], [0, .445, 1.56]], [.14, .16, .025], [.055, .065, .018], { segments: 18, radial: 18, bones: [jaw], paint: () => paintResult([.72, .69, .49]) });
  const finColor = [.33, .40, .23];
  // Broad, notched caudal fin with radial membrane ribs.
  const tailStart = S.p.length / 3;
  for (let i = 0; i <= 18; i++) {
    const t = i / 18, yy = Math.cos(t * Math.PI) * .62, zz = -1.45 - (.30 + .30 * Math.abs(Math.cos(t * Math.PI)));
    for (let j = 0; j <= 6; j++) {
      const u = j / 6, p = V(.025 * Math.sin(t * Math.PI), .48 + yy * u, lerp(-1.43, zz, u));
      const stripe = i % 2 ? .85 : 1.15;
      S.vertex(p, [u, t], [[tail, 1]], paintResult(finColor.map(v => v * stripe), .3));
    }
  }
  for (let i = 0; i < 18; i++) for (let j = 0; j < 6; j++) { const a = tailStart + i * 7 + j; S.quad(a, a + 1, a + 7, a + 8); }
  const fin = (start, end, width, bone, side = 1) => {
    const middle = V(...start).lerp(V(...end), .5); middle.x += side * width;
    S.leaf([start, middle.toArray(), end], [.01, width * .8, .003], { bone, segments: 16, across: 8, ridge: .014, color: finColor, mask: .3 });
  };
  for (const side of [-1, 1]) {
    E.ellipsoid([side * .22, .72, 1.06], [.052, .07, .08], { bone: side < 0 ? eyeL : eyeR, rings: 12, radial: 22, rotationY: side * 1.0, paint(p) { return p.z > .035 && Math.pow(p.x / .035, 2) + Math.pow(p.y / .04, 2) < 1 ? paintResult([.005, .007, .004]) : paintResult([.75, .59, .18]); } });
    const pectoral = rig.bone(`fin${side}`, [side * .255, .42, .65], spine);
    fin([side * .255, .42, .65], [side * .63, .21, .11], .16, pectoral, side);
    fin([side * .20, .26, -.11], [side * .38, .13, -.57], .12, tail0, side);
    // Curved gill covers and cheek lines, sculpted directly on the head.
    S.tube([[side * .24, .86, .71], [side * .31, .64, .67], [side * .24, .39, .69]], .009, .011, { segments: 20, radial: 6, bones: [head], paint: () => paintResult([.19, .24, .12], .3) });
    for (let i = 0; i < 8; i++) {
      const z = 1.18 + i * .04, x = side * (.12 - i * .009);
      S.tube([[x, .445, z], [x * .9, .475, z + .005]], [.008, .001], [.008, .001], { segments: 3, radial: 5, bones: [jaw], paint: () => paintResult([.78, .76, .56]) });
    }
  }
  // Vertical dorsal and anal fins use a ruled surface, each rib follows spine.
  for (const top of [true, false]) {
    const start = S.p.length / 3, count = 22;
    for (let i = 0; i <= count; i++) {
      const t = i / count, z = lerp(-.90, .18, t), baseY = top ? .80 + .22 * t : .26 - .10 * t;
      const h = Math.sin(Math.PI * t) * (top ? .45 : -.24), bone = t < .5 ? tail0 : spine;
      for (let j = 0; j <= 6; j++) {
        const u = j / 6, p = V(.012 * Math.sin(t * 6), baseY + h * u, z - .1 * u);
        S.vertex(p, [u, t], [[bone, 1]], paintResult(finColor.map(c => c * (i % 2 ? .85 : 1.1)), .2));
      }
    }
    for (let i = 0; i < count; i++) for (let j = 0; j < 6; j++) { const a = start + i * 7 + j; S.quad(a, a + 1, a + 7, a + 8); }
  }
  return { type: 'fish', rig, skin: S.geometry(), eyes: E.geometry(), mouth, length: 3.65, height: 1.65, scale: 1 };
}

function surfaceTexture(type) {
  if (textureCache.has(type)) return textureCache.get(type);
  const size = 256, data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = x / size, v = y / size;
    let n = .82 + hash(x, y) * .18;
    if (type === 'frog') {
      const cell = 28, gx = Math.floor(u * cell), gy = Math.floor(v * cell), dx = u * cell - gx - .5, dy = v * cell - gy - .5;
      const d = Math.hypot(dx, dy), pore = Math.exp(-d * d * 38) * (.1 + hash(gx, gy) * .18);
      n = .79 + .16 * hash(x, y) + pore - .11 * Math.exp(-Math.pow(d - .31, 2) * 300);
    } else if (type === 'snake' || type === 'fish') {
      const rows = type === 'snake' ? 28 : 35, fy = v * rows, row = Math.floor(fy), fx = u * 20 + (row % 2) * .5;
      const dx = (fx - Math.floor(fx)) - .5, dy = (fy - row) - .5;
      const edge = Math.abs(dx) * 1.4 + Math.abs(dy);
      n = .74 + .22 * (1 - smooth(.49, .72, edge)) + .04 * hash(x, y);
    } else n = .79 + .15 * Math.sin(u * 170 + .4 * Math.sin(v * 31)) ** 2 + .06 * hash(x, y);
    const i = (y * size + x) * 4, b = Math.floor(clamp(n) * 255);
    data[i] = data[i + 1] = data[i + 2] = b; data[i + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true; tex.needsUpdate = true; tex.repeat.set(type === 'heron' ? 1 : 2, type === 'frog' ? 3 : 2);
  textureCache.set(type, tex); return tex;
}
function skinMaterial(type, color) {
  const tex = surfaceTexture(type);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, vertexColors: true, map: tex, bumpMap: tex,
    bumpScale: type === 'frog' ? .013 : type === 'heron' ? .007 : .009,
    roughness: type === 'frog' ? .32 : type === 'heron' ? .68 : .37,
    metalness: 0, clearcoat: type === 'heron' ? 0 : .42, clearcoatRoughness: .25,
    envMapIntensity: .8, side: THREE.DoubleSide
  });
  const tint = new THREE.Color(color);
  material.userData.tint = tint;
  material.onBeforeCompile = shader => {
    shader.uniforms.skinTint = { value: tint };
    shader.vertexShader = 'attribute float skinTintMask; varying float vSkinTint;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n vSkinTint = skinTintMask;');
    shader.fragmentShader = 'uniform vec3 skinTint; varying float vSkinTint;\n' + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);');
  };
  material.customProgramCacheKey = () => 'anatomical-skin-v3';
  return material;
}
function outlineMaterial(color, thickness) {
  const mat = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide, transparent: true, opacity: .91, depthWrite: false, toneMapped: false });
  mat.userData.thickness = { value: thickness };
  mat.onBeforeCompile = shader => {
    shader.uniforms.outlineThickness = mat.userData.thickness;
    shader.vertexShader = 'uniform float outlineThickness;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = position + normal * outlineThickness;');
  };
  mat.customProgramCacheKey = () => 'skeletal-silhouette-v3';
  return mat;
}
function makeSkeleton(defs) {
  const bones = defs.map(def => { const b = new THREE.Bone(); b.name = def.name; return b; });
  for (let i = 0; i < defs.length; i++) {
    const d = defs[i]; bones[i].position.fromArray(d.p);
    if (d.parent !== null && d.parent !== undefined) { bones[i].position.sub(V(...defs[d.parent].p)); bones[d.parent].add(bones[i]); }
  }
  return { bones, skeleton: new THREE.Skeleton(bones), root: bones[0] };
}
function getTemplate(type, lod = 0) {
  const key = type === 'frog' && lod ? `${type}:${lod}` : type;
  if (!templateCache.has(key)) {
    const t = type === 'frog' ? frogTemplate([1, .36, .18][lod]) : ({ heron: heronTemplate, snake: snakeTemplate, fish: fishTemplate }[type] || frogTemplate)();
    for (const key of ['skin','eyes','armor','crest','tongue']) if (t[key]?.boundingSphere) t[key].boundingSphere.radius *= 1.9;
    templateCache.set(key, t);
  }
  return templateCache.get(key);
}
// Planar two-bone IK plants the anatomical wrist/ankle during the stance phase.
// Rest vectors keep each species' original bend direction instead of flipping knees.
function plantLimb(root, middle, end, firstRest, secondRest, dy, dz) {
  const l1 = Math.hypot(firstRest.y, firstRest.z), l2 = Math.hypot(secondRest.y, secondRest.z);
  const y = firstRest.y + secondRest.y + dy, z = firstRest.z + secondRest.z + dz;
  const d = Math.max(Math.abs(l1 - l2) + .00001, Math.min(l1 + l2 - .00001, Math.hypot(y, z)));
  const phi = Math.atan2(z, y), branch = -Math.sign(firstRest.y * secondRest.z - firstRest.z * secondRest.y) || 1;
  const alpha = Math.acos(clamp((l1*l1 + d*d - l2*l2)/(2*l1*d), -1, 1));
  const desired = phi + branch * alpha;
  const a = desired - Math.atan2(firstRest.z, firstRest.y);
  root.rotation.x = Math.atan2(Math.sin(a), Math.cos(a));
  const ky = Math.cos(desired) * l1, kz = Math.sin(desired) * l1;
  const b = Math.atan2(z - kz, y - ky) - root.rotation.x - Math.atan2(secondRest.z, secondRest.y);
  middle.rotation.x = Math.atan2(Math.sin(b), Math.cos(b));
  end.rotation.x = -root.rotation.x - middle.rotation.x;
}
function getAttack(attack, elapsed) {
  if (!attack) return { type: '', phase: 0, force: 0 };
  let type = 'kick', phase = elapsed;
  if (typeof attack === 'string') type = attack;
  else if (typeof attack === 'number') phase = attack;
  else { type = attack.type || attack.kind || 'kick'; phase = attack.phase ?? attack.progress ?? elapsed; }
  phase = clamp(phase);
  return { type, phase, force: Math.sin(phase * Math.PI) };
}

/**
 * Creates an original, skinned animal. World transform belongs to caller.
 * attack accepts {type:'kick'|'slam'|'tongue'|'lunge', phase:0..1} or a string.
 * speed is world-units/sec; jump is airborne progress 0..1 (boolean accepted).
 * setRenderLOD(0|1|2) selects full/medium/distant frog detail without resetting pose.
 * All instances face local +Z. Frog floor contacts are y≈0.
 */
export function createCreature(type = 'frog', options = {}) {
  if (!['frog', 'heron', 'snake', 'fish'].includes(type)) type = 'frog';
  const template = getTemplate(type), group = new THREE.Group(), pivot = new THREE.Group();
  group.name = `creature-${type}`; pivot.name = 'anatomical-animation-pivot'; group.add(pivot);
  const defaultColor = type === 'frog' ? 0x70982d : type === 'snake' ? 0x667746 : type === 'fish' ? 0x839b64 : 0xffffff;
  const skin = skinMaterial(type, options.color ?? defaultColor);
  const eyeMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, vertexColors: true, roughness: .13, clearcoat: 1, clearcoatRoughness: .05, metalness: .05 });
  const { bones: boneList, skeleton, root } = makeSkeleton(template.rig.defs);
  const body = new THREE.SkinnedMesh(template.skin, skin); body.name = `${type}-weighted-surface`; body.add(root); pivot.add(body);
  body.castShadow = true; body.receiveShadow = true; body.frustumCulled = true;
  group.updateMatrixWorld(true); body.bind(skeleton);
  const eyes = new THREE.SkinnedMesh(template.eyes, eyeMat); eyes.name = 'articulated-eyes'; eyes.bind(skeleton, body.bindMatrix); eyes.castShadow = false; eyes.frustumCulled = true; pivot.add(eyes);
  const outline = new THREE.SkinnedMesh(template.skin, outlineMaterial(options.outlineColor ?? (options.team === 'enemy' ? 0xff7350 : options.team === 'player' ? 0xa8ffe2 : type === 'frog' ? 0x81e9a4 : 0xffaa4b), type === 'frog' ? .018 : .027));
  outline.name = 'animated-color-silhouette'; outline.bind(skeleton, body.bindMatrix); outline.frustumCulled = true; outline.renderOrder = -1; pivot.add(outline);
  const extras = [];
  for (const name of ['armor', 'crest', 'tongue']) if (template[name]) {
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: name === 'tongue' ? .35 : .79, side: THREE.DoubleSide });
    const mesh = new THREE.SkinnedMesh(template[name], mat); mesh.name = name; mesh.bind(skeleton, body.bindMatrix); mesh.frustumCulled = true; mesh.castShadow = name !== 'tongue'; mesh.visible = name === 'tongue'; pivot.add(mesh); extras.push(mesh);
  }
  const bones = {}; for (const b of boneList) bones[b.name] = b;
  const restPositions = boneList.map(b => b.position.clone());
  const mouthMarker = new THREE.Object3D(); mouthMarker.name = 'mouth-attachment'; boneList[template.mouth].add(mouthMarker);
  let time = (options.seed || 0) * .731, attackTime = 0, previousAttack = '', tier = 1, deadProgress = 0, lastMove = 0;
  let renderLOD = 0, outlineRequested = true;
  const role = options.role || 'scout';
  const roleScale = type === 'frog' ? (['guardian', 'brute', 'tank'].includes(role) ? [1.15, 1.12, 1.05] : ['scout', 'hunter', 'agile'].includes(role) ? [.96, .98, 1.04] : [1.03, 1.02, 1.02]) : [1, 1, 1];
  pivot.scale.set(...roleScale);
  const reset = () => { for (let i = 0; i < boneList.length; i++) { boneList[i].rotation.set(0, 0, 0); boneList[i].scale.set(1, 1, 1); boneList[i].position.copy(restPositions[i]); } };
  const api = {
    group, bones, skeleton, mesh: body,
    stats: { type, vertices: template.skin.attributes.position.count + template.eyes.attributes.position.count, triangles: (template.skin.index.count + template.eyes.index.count) / 3, boneCount: boneList.length, length: template.length, height: template.height, rigged: true, renderLOD: 0 },
    setOutline(color, visible = true) { if (color !== undefined && color !== null) outline.material.color.set(color); outlineRequested = visible; outline.visible = visible && renderLOD === 0; },
    // The full anatomical model is retained nearby. Distant armies share simpler
    // versions of the same sculpt and rig, without a second outline/shadow pass.
    // This changes rendering only: callers keep every actor and its simulation.
    setRenderLOD(value = 0) {
      const level = type === 'frog' ? clamp(Math.round(Number(value) || 0), 0, 2) : 0;
      if (level === renderLOD) return;
      renderLOD = level;
      const next = getTemplate(type, level);
      for (const mesh of [body, eyes, outline, ...extras]) {
        mesh.geometry = next[mesh === body || mesh === outline ? 'skin' : mesh === eyes ? 'eyes' : mesh.name];
        // SkinnedMesh caches bounds independently of geometry. Clear these when
        // swapping detail so raycasting and culling use the new surface.
        mesh.boundingSphere = null; mesh.boundingBox = null;
        mesh.castShadow = level === 0 && mesh !== eyes && mesh !== outline && mesh.name !== 'tongue';
      }
      outline.visible = outlineRequested && level === 0;
      api.stats.vertices = next.skin.attributes.position.count + next.eyes.attributes.position.count;
      api.stats.triangles = (next.skin.index.count + next.eyes.index.count) / 3;
      api.stats.renderLOD = level;
    },
    setTier(value) {
      tier = clamp(Math.round(value || 1), 1, 5);
      for (const mesh of extras) if (mesh.name === 'armor') mesh.visible = tier >= 2; else if (mesh.name === 'crest') mesh.visible = tier >= 3;
      const grow = 1 + (tier - 1) * .028; pivot.scale.set(roleScale[0] * grow, roleScale[1] * grow, roleScale[2] * grow);
    },
    mouthWorld(target = new THREE.Vector3()) { group.updateWorldMatrix(true, true); return mouthMarker.getWorldPosition(target); },
    update(dt, state = {}) {
      dt = clamp(Number(dt) || 0, 0, .1); time = state.time !== undefined ? state.time + (options.seed || 0) * .731 : time + dt;
      reset();
      const speed = Math.max(0, Number(state.speed) || 0), move = clamp(speed / (type === 'frog' ? 2.8 : 3));
      lastMove = lerp(lastMove, move, 1 - Math.exp(-dt * 12));
      const swim = state.swimming ? 1 : 0, jump = typeof state.jump === 'number' ? clamp(state.jump) : state.jump ? .5 : 0;
      const attackType = typeof state.attack === 'string' ? state.attack : state.attack?.type || state.attack?.kind || (state.attack ? 'kick' : '');
      if (attackType !== previousAttack) { attackTime = 0; previousAttack = attackType; } else if (state.attack) attackTime += dt / .55;
      const atk = getAttack(state.attack, attackTime), f = atk.force;
      const roar = typeof state.roar === 'number' ? clamp(state.roar) : state.roar ? 1 : 0;
      const hit = typeof state.hit === 'number' ? clamp(state.hit) : state.hit ? 1 : 0;
      deadProgress = lerp(deadProgress, state.dead ? 1 : 0, 1 - Math.exp(-dt * 5));
      pivot.position.set(0, 0, 0); pivot.rotation.set(0, 0, 0);
      const blinkPhase = (time + (options.seed || 0) * .4) % 5.7, blink = blinkPhase > 5.50 ? .08 + .92 * Math.abs((blinkPhase - 5.60) * 10) : 1;
      if (bones.eyeL) bones.eyeL.scale.y = clamp(blink, .08, 1);
      if (bones.eyeR) bones.eyeR.scale.y = clamp(blink, .08, 1);
      if (type === 'frog') {
        const cycle = time * (swim ? 7.8 : 10.6), hop = Math.max(0, Math.sin(cycle)), step = Math.sin(cycle), spring = Math.sin(jump * Math.PI);
        pivot.position.y = swim ? -.14 + .023 * Math.sin(time * 3) : hop * .045 * lastMove;
        pivot.rotation.x = swim ? -.12 : -.05 * step * lastMove;
        bones.spine.rotation.x = Math.sin(time * 2.6) * .009 + lastMove * step * .045;
        bones.spine.scale.y = 1 + Math.sin(time * 2.6) * .018;
        bones.head.rotation.x = .02 * Math.sin(time * 1.7) - roar * .18 - spring * .06;
        bones.jaw.rotation.x = -roar * .13 - (atk.type === 'tongue' ? f * .16 : 0);
        bones.throat.scale.set(1 + roar * .26, 1 + roar * 1.45 + Math.sin(time * 2.5) * .035, 1 + roar * .25);
        for (const side of [-1, 1]) {
          const phase = swim ? Math.sin(cycle) : Math.sin(cycle + side * .14), stride = lastMove * phase;
          bones[`hip${side}`].rotation.x = -.32 * stride - spring * .62;
          bones[`hip${side}`].rotation.z = side * (spring * .10 + swim * .07 * phase);
          bones[`knee${side}`].rotation.x = .62 * stride + spring * 1.05;
          bones[`ankle${side}`].rotation.x = -.25 * stride - spring * .3;
          bones[`foot${side}`].rotation.x = .20 * stride;
          const crawl = Math.sin(cycle + side * 1.3) * lastMove;
          bones[`shoulder${side}`].rotation.x = -.23 * crawl + spring * .25;
          bones[`elbow${side}`].rotation.x = .28 * crawl - spring * .32;
          bones[`wrist${side}`].rotation.x = -.12 * crawl;
          if (swim) { bones[`shoulder${side}`].rotation.z = side * (.22 + .25 * phase * lastMove); bones[`elbow${side}`].rotation.y = side * .30; }
          if (!swim && jump === 0 && !atk.type && !state.dead) {
            const ids = template.rig.ids, hindPhase = cycle + side * .12, forePhase = cycle + side * 1.3 + Math.PI;
            plantLimb(bones[`hip${side}`], bones[`knee${side}`], bones[`ankle${side}`], restPositions[ids[`knee${side}`]], restPositions[ids[`ankle${side}`]], Math.max(0, Math.sin(hindPhase)) * .11 * lastMove - pivot.position.y, Math.cos(hindPhase) * .095 * lastMove);
            plantLimb(bones[`shoulder${side}`], bones[`elbow${side}`], bones[`wrist${side}`], restPositions[ids[`elbow${side}`]], restPositions[ids[`wrist${side}`]], Math.max(0, Math.sin(forePhase)) * .08 * lastMove - pivot.position.y, Math.cos(forePhase) * .07 * lastMove);
          }

        }
        if (atk.type === 'kick' || atk.type === 'strike') {
          pivot.rotation.y = -f * .55; pivot.rotation.z = f * .22; pivot.position.y += f * .16;
          const ids=template.rig.ids;
          plantLimb(bones.hip1,bones.knee1,bones.ankle1,restPositions[ids.knee1],restPositions[ids.ankle1],.26*f,1.16*f);
          bones.hip1.rotation.y=-f*.30; bones.hip1.rotation.z=-f*.08;
          bones['shoulder-1'].rotation.z = f * .55;
        } else if (atk.type === 'slam' || atk.type === 'belly') {
          const lift = Math.sin(atk.phase * Math.PI); pivot.rotation.x = -lift * .28; pivot.position.y += lift * .22;
          for (const side of [-1, 1]) { bones[`hip${side}`].rotation.x -= lift * .70; bones[`shoulder${side}`].rotation.z = side * lift * .45; }
        } else if (atk.type === 'tongue') { bones.head.rotation.x -= f * .10; bones.spine.rotation.x -= f * .07; }
        pivot.rotation.z += hit * .21 * Math.sin(time * 44);
        pivot.position.y -= deadProgress * .22; pivot.rotation.z += deadProgress * 1.35;
        bones.spine.scale.y *= 1 - deadProgress * .15;
      } else if (type === 'heron') {
        const cycle = time * 5.6, stride = lastMove;
        pivot.position.y = .035 * Math.sin(cycle * 2) * stride;
        bones.spine.rotation.x = -.03 * Math.sin(cycle) * stride;
        bones.neck0.rotation.x = .10 * Math.sin(time * 1.4) - f * .62;
        bones.neck1.rotation.x = -.08 * Math.sin(time * 1.4) + f * .58;
        bones.neck2.rotation.x = -.03 + f * .70;
        bones.head.rotation.x = -.06 * Math.sin(time * 1.8) + f * .48;
        bones.jaw.rotation.x = -f * .50;
        for (const side of [-1, 1]) {
          const a = cycle + (side < 0 ? Math.PI : 0), swing = Math.sin(a);
          bones[`hip${side}`].rotation.x = swing * .31 * stride;
          bones[`knee${side}`].rotation.x = Math.max(0, -swing) * .57 * stride;
          bones[`foot${side}`].rotation.x = -.18 * swing * stride;
          bones[`wing${side}`].rotation.y = side * (1.24 - f * 1.07 - hit * .55);
          bones[`wing${side}`].rotation.z = side * (.07 + f * (.50 + .25 * Math.sin(time * 18)) + hit * .5);
          bones[`wingElbow${side}`].rotation.y = side * .12;
          bones[`wingWrist${side}`].rotation.z = side * f * .18;
        }
        pivot.rotation.z += hit * .08 * Math.sin(time * 32) + deadProgress * 1.45;
        pivot.position.y -= deadProgress * 1.8;
      } else if (type === 'snake') {
        const phase = time * (3 + lastMove * 5), amp = .055 + lastMove * .105;
        for (let i = 1; i <= 20; i++) {
          bones[`coil${i}`].rotation.y = Math.sin(phase - i * .48) * amp;
          bones[`coil${i}`].rotation.x = i < 6 ? -f * .18 * (1 - i / 7) : .006 * Math.sin(time * 3 - i);
        }
        bones.head.rotation.x = f * .45; bones.head.rotation.y = Math.sin(phase) * .035;
        bones.jaw.rotation.x = -f * .62;
        pivot.position.y = f * .28;
        const tongue = extras.find(m => m.name === 'tongue'); if (tongue) tongue.visible = !state.dead && (Math.sin(time * 3.7) > .77 || f > .2);
        pivot.rotation.z = deadProgress * .65 + hit * .10 * Math.sin(time * 32);
      } else if (type === 'fish') {
        const cycle = time * (4 + lastMove * 10), swimAmplitude = .09 + lastMove * .22;
        bones.spine.rotation.y = Math.sin(cycle) * swimAmplitude * .2;
        bones.head.rotation.y = -Math.sin(cycle) * swimAmplitude * .13;
        bones.tail0.rotation.y = Math.sin(cycle - .5) * swimAmplitude;
        bones.tail1.rotation.y = Math.sin(cycle - 1.1) * swimAmplitude * 1.25;
        bones.tail.rotation.y = Math.sin(cycle - 1.6) * swimAmplitude * 1.2;
        bones.jaw.rotation.x = -f * .62 - .035 * Math.sin(time * 2.5);
        for (const side of [-1, 1]) { bones[`fin${side}`].rotation.z = side * (.13 + .16 * Math.sin(time * 6)); bones[`fin${side}`].rotation.y = side * .15 * Math.sin(time * 5); }
        pivot.rotation.x = -f * .35; pivot.position.y = .035 * Math.sin(time * 2);
        pivot.rotation.z = deadProgress * Math.PI + hit * .14 * Math.sin(time * 35);
      }
    },
    dispose() { skin.dispose(); eyeMat.dispose(); outline.material.dispose(); for (const e of extras) e.material.dispose(); skeleton.dispose(); group.removeFromParent(); }
  };
  api.setTier(options.tier || 1); api.update(0, {});
  group.userData.creature = api;
  return api;
}

export function creatureModelStats() { return ['frog', 'heron', 'snake', 'fish'].map(type => { const t = getTemplate(type); return { type, vertices: t.skin.attributes.position.count, triangles: t.skin.index.count / 3, bones: t.rig.defs.length }; }); }

