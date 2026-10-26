import { OBSTACLES, RULES } from './arcade-model.js';

// The preview uses the same ground-plane obstacle/body radii as the projectiles.
// It is feedback for deliberate aiming; it never bends or auto-aims a shot.
export function traceAim(state, actor, range = RULES.projectileSpeed * RULES.projectileLifetime) {
  const length = Math.hypot(actor.aimX, actor.aimZ) || 1;
  const dx = actor.aimX / length, dz = actor.aimZ / length;
  let distance = range, targetId = null, blocked = false;
  const intersection = (x, z, radius) => {
    const ox = actor.x + dx * 1.2 - x, oz = actor.z + dz * 1.2 - z;
    const b = ox * dx + oz * dz, c = ox * ox + oz * oz - radius * radius;
    const discriminant = b * b - c;
    if (discriminant < 0) return Infinity;
    const near = -b - Math.sqrt(discriminant);
    return c < 0 ? 1.2 : near >= 0 ? near + 1.2 : Infinity;
  };
  // Clip the guide to the circular arena rather than drawing through its edge.
  const b = actor.x * dx + actor.z * dz;
  const c = actor.x * actor.x + actor.z * actor.z - (RULES.radius - .2) ** 2;
  distance = Math.min(distance, Math.max(1.2, -b + Math.sqrt(Math.max(0, b * b - c))));
  for (const obstacle of OBSTACLES) {
    const hit = intersection(obstacle.x, obstacle.z, obstacle.r + .1);
    if (hit < distance) { distance = hit; blocked = true; }
  }
  for (const target of state.actors) {
    if (target === actor || target.ko) continue;
    const hit = intersection(target.x, target.z, 1 + target.load * .2);
    if (hit < distance) { distance = hit; targetId = target.id; blocked = false; }
  }
  return { x: actor.x + dx * distance, z: actor.z + dz * distance, distance, targetId, blocked };
}
