// Screen movement, body facing and limb animation are independent concerns.
// No camera position, target, body yaw or old shot bearing may reverse WASD.
const finite = (value, fallback = 0) => Number.isFinite(value) ? value : fallback;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function movementForView(x, y, mode = 'overview', yaw = Math.PI) {
  x = finite(x); y = finite(y);
  // Overview has a fixed north-up camera, including after Resume/New/C.
  if (mode === 'overview') return {x, z: y};
  yaw = finite(yaw, Math.PI);
  const forwardX = Math.sin(yaw), forwardZ = Math.cos(yaw);
  return {x: -forwardZ * x - forwardX * y,
          z: forwardX * x - forwardZ * y};
}

export function keyboardMovement(keys, stick, mode, yaw) {
  const has = code => keys?.has?.(code) === true;
  const right = has('KeyD') || has('ArrowRight');
  const left = has('KeyA') || has('ArrowLeft');
  const down = has('KeyS') || has('ArrowDown');
  const up = has('KeyW') || has('ArrowUp');
  const x = clamp(finite(stick?.x) + Number(right) - Number(left), -1, 1);
  const y = clamp(finite(stick?.z) + Number(down) - Number(up), -1, 1);
  return movementForView(x, y, mode, yaw);
}

// Three.js models face local +Z. Use the *rendered* yaw, not a desired yaw
// which the smoothing animation has not reached yet.
export function localHopDirection(vx, vz, renderedYaw) {
  vx = finite(vx); vz = finite(vz);
  const length = Math.hypot(vx, vz);
  if (length < 1e-6) return {x: 0, z: 0};
  const yaw = finite(renderedYaw), c = Math.cos(yaw), s = Math.sin(yaw);
  return {x: (c * vx - s * vz) / length,
          z: (s * vx + c * vz) / length};
}

// Non-arcade callers retain their existing forward hop. An explicit stopped
// arcade hop does not kick its legs backwards while sliding sideways.
export function hopDirection(value) {
  if (value == null) return {x: 0, z: 1};
  const x = finite(value.x), z = finite(value.z), length = Math.hypot(x, z);
  if (length < 1e-6) return {x: 0, z: 0};
  return {x: x / length, z: z / length};
}

export function shouldFaceView(mode, {mounted = false, locked = false,
  pointerAiming = false, touchAiming = false} = {}) {
  return !mounted && (mode === 'chase3d' || locked ||
    mode === 'overview' && (pointerAiming || touchAiming));
}

// Rotate the existing anatomical bend plane onto a lateral foot target. Limb
// lengths are preserved, and unreachable targets clamp instead of stretching.
// The legacy planar solver remains in use for exactly forward/backward hops.
const multiply = (a, b) => [
  a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],
  a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],
  a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],
  a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]
];
const normalize = q => { const d = Math.hypot(...q); return d > 1e-12 ? q.map(v => v/d) : [0,0,0,1]; };
const xRotation = angle => [Math.sin(angle/2),0,0,Math.cos(angle/2)];
const inverse = q => [-q[0],-q[1],-q[2],q[3]];
const rotate = (q, v) => multiply(multiply(q, [v[0],v[1],v[2],0]), inverse(q)).slice(0,3);

export function solveDirectionalLimb(first, second, {x = 0, y = 0, z = 0} = {}) {
  const f = [finite(first.x), finite(first.y), finite(first.z)];
  const b = [finite(second.x), finite(second.y), finite(second.z)];
  const target = [f[0]+b[0]+finite(x), f[1]+b[1]+finite(y), f[2]+b[2]+finite(z)];
  const l1 = Math.hypot(f[1],f[2]), l2 = Math.hypot(b[1],b[2]);
  const identity = {root:[0,0,0,1],middle:[0,0,0,1],end:[0,0,0,1]};
  if (l1 < 1e-6 || l2 < 1e-6) return identity;
  const fixedX = f[0]+b[0], targetLength = Math.hypot(...target);
  const wantedYZ = Math.sqrt(Math.max(0,targetLength*targetLength-fixedX*fixedX));
  const distance = clamp(wantedYZ, Math.abs(l1-l2)+1e-5, l1+l2-1e-5);
  const phi = Math.hypot(target[1],target[2]) > 1e-9
    ? Math.atan2(target[2],target[1]) : Math.atan2(f[2]+b[2],f[1]+b[1]);
  const desiredY = Math.cos(phi)*distance, desiredZ = Math.sin(phi)*distance;
  const branch = -Math.sign(f[1]*b[2]-f[2]*b[1]) || 1;
  const alpha = Math.acos(clamp((l1*l1+distance*distance-l2*l2)/(2*l1*distance),-1,1));
  const desired = phi+branch*alpha;
  const rootAngle = desired-Math.atan2(f[2],f[1]);
  const middleAngle = Math.atan2(desiredZ-Math.sin(desired)*l1,
    desiredY-Math.cos(desired)*l1)-rootAngle-Math.atan2(b[2],b[1]);
  const planarRoot = xRotation(rootAngle), middle = xRotation(middleAngle);
  const firstPoint = rotate(planarRoot,f), secondPoint = rotate(multiply(planarRoot,middle),b);
  const endpoint = firstPoint.map((v,i) => v+secondPoint[i]);
  const endpointLength = Math.hypot(...endpoint);
  let swing = [0,0,0,1];
  if (endpointLength > 1e-9 && targetLength > 1e-9) {
    const a = endpoint.map(v => v/endpointLength), t = target.map(v => v/targetLength);
    const dot = clamp(a[0]*t[0]+a[1]*t[1]+a[2]*t[2],-1,1);
    if (dot < -1+1e-8) {
      // Stable perpendicular axis for the exceptional antiparallel target.
      swing = normalize(Math.abs(a[0]) > Math.abs(a[2]) ? [-a[1],a[0],0,0] : [0,-a[2],a[1],0]);
    } else swing = normalize([a[1]*t[2]-a[2]*t[1],a[2]*t[0]-a[0]*t[2],a[0]*t[1]-a[1]*t[0],1+dot]);
  }
  const root = normalize(multiply(swing,planarRoot));
  return {root, middle, end: inverse(normalize(multiply(root,middle)))};
}
