// Input axes belong to the view, never the frog's retained combat stance.
// The overview is north-up even after a chase orbit, shake, resume or new round.
const finite = value => Number.isFinite(value) ? value : 0;
export function screenMovement(x, y, mode = 'overview', yaw = Math.PI) {
  x = finite(x); y = finite(y);
  if (mode === 'overview') return {x, z: y};
  yaw = Number.isFinite(yaw) ? yaw : Math.PI;
  const s = Math.sin(yaw), c = Math.cos(yaw);
  return {x: -c*x-s*y, z: s*x-c*y};
}

// Express real travel in the visible body's frame. Aiming and locomotion stay
// independent: a frog facing south can hop north, backward, without remapping W.
export function localHopDirection(x, z, yaw = 0) {
  x = finite(x); z = finite(z); yaw = finite(yaw);
  const length = Math.hypot(x, z);
  if (length < 1e-6) return {x: 0, z: 1};
  const s = Math.sin(yaw), c = Math.cos(yaw);
  return {x: (c*x-s*z)/length, z: (s*x+c*z)/length};
}
