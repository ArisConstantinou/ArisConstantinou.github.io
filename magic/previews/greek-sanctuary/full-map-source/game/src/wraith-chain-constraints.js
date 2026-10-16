import { PropertyBinding, Quaternion, Vector3 } from 'three';

/** Uniform rigid links hanging under gravity. Output is world XYZ, with Y up. */
export function solveFixedChain(start, end, links, pitch, output) {
  const dx = end.x - start.x, dz = end.z - start.z;
  const horizontal = Math.hypot(dx, dz), height = end.y - start.y;
  const length = links * pitch, distance = Math.hypot(horizontal, height);
  if (links < 3 || pitch <= 0 || horizontal < 1e-5 || distance >= length * .9999) {
    throw new RangeError('Wraith chain requires separated endpoints and physical slack');
  }
  let h = Math.max(.05, links * horizontal / (4 * Math.sqrt(length * length - distance * distance)));
  let v = -links / 2 + (height / length) * h / Math.sqrt(1 - (height / length) ** 2);
  let iterations = 0;
  function residual(ch, cv, jacobian = false) {
    let x = -horizontal, y = -height, xx = 0, xy = 0, yy = 0;
    for (let j = 0; j < links; j++) {
      const q = cv + j + .5, r = Math.hypot(ch, q);
      x += pitch * ch / r; y += pitch * q / r;
      if (jacobian) {
        const k = pitch / (r * r * r);
        xx += k * q * q; xy -= k * ch * q; yy += k * ch * ch;
      }
    }
    return { x, y, xx, xy, yy };
  }
  for (; iterations < 60; iterations++) {
    const r = residual(h, v, true), error = Math.hypot(r.x, r.y);
    if (error < 1e-10) break;
    const determinant = r.xx * r.yy - r.xy * r.xy;
    const dh = (r.yy * r.x - r.xy * r.y) / determinant;
    const dv = (-r.xy * r.x + r.xx * r.y) / determinant;
    let fraction = 1, improved = false;
    while (fraction >= 1e-8) {
      const nh = h - fraction * dh, nv = v - fraction * dv;
      if (nh > 1e-9) {
        const next = residual(nh, nv);
        if (Math.hypot(next.x, next.y) < error) { h = nh; v = nv; improved = true; break; }
      }
      fraction *= .5;
    }
    if (!improved) throw new Error('Wraith chain tension solve did not converge');
  }
  if (iterations === 60) throw new Error('Wraith chain tension iteration limit');
  let x = start.x, y = start.y, z = start.z;
  output[0] = x; output[1] = y; output[2] = z;
  for (let j = 0; j < links; j++) {
    const q = v + j + .5, r = Math.hypot(h, q), step = pitch * h / r;
    x += step * dx / horizontal; z += step * dz / horizontal; y += pitch * q / r;
    const offset = (j + 1) * 3;
    output[offset] = x; output[offset + 1] = y; output[offset + 2] = z;
  }
  return iterations + 1;
}

/** Call after the animation mixer, before skeleton upload. Does not alter the hands. */
export function createWraithChainConstraints(model) {
  const byName = new Map();
  model.traverse(o => { if (o.isBone) byName.set(o.name, o); });
  const find = name => byName.get(name) || byName.get(PropertyBinding.sanitizeNodeName(name));
  if (!find('waist.R.0') && !find('waist.L.0')) return null;
  model.updateMatrixWorld(true);
  const modelQuaternion = model.getWorldQuaternion(new Quaternion());
  const inverseModel = modelQuaternion.clone().invert();
  const chains = ['R', 'L'].map(side => {
    const bones = Array.from({ length: 20 }, (_, i) => find(`waist.${side}.${i}`));
    const hand = find(`drop.${side}.0`);
    if (bones.some(b => !b) || !hand) throw new Error('Incomplete articulated Wraith chain rig');
    const pitch = bones[1].position.length();
    if (Math.abs(pitch - .075) > 1e-5) throw new Error('Unexpected Wraith link scale');
    const rest = bones.map(b => {
      const q = inverseModel.clone().multiply(b.getWorldQuaternion(new Quaternion()));
      return { quaternion: q, direction: new Vector3(0, 1, 0).applyQuaternion(q) };
    });
    return { bones, hand, pitch, rest, points: new Float64Array(63) };
  });
  const start = new Vector3(), end = new Vector3(), scale = new Vector3();
  const direction = new Vector3(), restDirection = new Vector3();
  const parentQuaternion = new Quaternion(), restQuaternion = new Quaternion();
  const delta = new Quaternion(), wanted = new Quaternion();
  let updates = 0, maximumIterations = 0;
  function update() {
    model.getWorldQuaternion(modelQuaternion);
    for (const chain of chains) {
      chain.bones[0].getWorldPosition(start); chain.hand.getWorldPosition(end);
      chain.bones[0].getWorldScale(scale);
      if (Math.max(Math.abs(scale.x - scale.y), Math.abs(scale.x - scale.z)) > 1e-5) {
        throw new Error('Wraith rigid chains require uniform world scale');
      }
      maximumIterations = Math.max(maximumIterations,
        solveFixedChain(start, end, 20, chain.pitch * scale.x, chain.points));
      for (let i = 0; i < 20; i++) {
        const offset = i * 3, p = chain.points, bone = chain.bones[i];
        direction.set(p[offset + 3] - p[offset], p[offset + 4] - p[offset + 1], p[offset + 5] - p[offset + 2]).normalize();
        restDirection.copy(chain.rest[i].direction).applyQuaternion(modelQuaternion);
        restQuaternion.copy(modelQuaternion).multiply(chain.rest[i].quaternion);
        delta.setFromUnitVectors(restDirection, direction);
        wanted.copy(delta).multiply(restQuaternion);
        bone.parent.getWorldQuaternion(parentQuaternion).invert();
        bone.quaternion.copy(parentQuaternion.multiply(wanted));
        bone.updateMatrix(); bone.updateWorldMatrix(false, false);
      }
    }
    updates++;
  }
  return { update, diagnostics: () => ({ updates, maximumIterations, rigidLinks: 40 }) };
}
