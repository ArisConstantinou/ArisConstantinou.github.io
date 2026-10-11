import { segmentBox } from './systems.js';

const WINDOW_MS = 120;
const IDLE_MS = 140;
const DECAY_MS = 42;
const finite = (value, fallback = 0) => Number.isFinite(value) ? value : fallback;
const nonnegative = value => Math.max(0, finite(value));
const point3 = (point, fallback = {}) => ({
  x: finite(point?.x, finite(fallback.x)),
  y: finite(point?.y, finite(fallback.y)),
  z: finite(point?.z, finite(fallback.z)),
});

// CSS pixels per second. Recent movement outweighs the earlier drag.
export class PointerMotion {
  constructor(point) {
    this.samples = [];
    this.lastMovedAt = -Infinity;
    if (point) this.add(point.x, point.y, point.timeMs ?? 0);
  }

  add(x, y, timeMs) {
    if (![x, y, timeMs].every(Number.isFinite)) return this;
    const previous = this.samples.at(-1);
    if (previous && timeMs < previous.timeMs) return this;
    if (!previous || x !== previous.x || y !== previous.y) this.lastMovedAt = timeMs;
    const sample = { x, y, timeMs };
    if (previous?.timeMs === timeMs) this.samples[this.samples.length - 1] = sample;
    else this.samples.push(sample);
    // Keep one sample before the window so its boundary can be interpolated.
    while (this.samples.length > 2 && this.samples[1].timeMs < timeMs - WINDOW_MS) this.samples.shift();
    if (this.samples.length > 96) this.samples.splice(0, this.samples.length - 96);
    return this;
  }

  velocity(nowMs = this.samples.at(-1)?.timeMs ?? 0) {
    const last = this.samples.at(-1);
    if (!last || !Number.isFinite(nowMs) || nowMs < last.timeMs ||
        nowMs - this.lastMovedAt > IDLE_MS || nowMs - last.timeMs > IDLE_MS) return { x: 0, y: 0 };
    const points = nowMs > last.timeMs ? [...this.samples, { ...last, timeMs: nowMs }] : this.samples;
    let x = 0, y = 0, weight = 0;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      const start = Math.max(a.timeMs, nowMs - WINDOW_MS), end = Math.min(b.timeMs, nowMs);
      if (end <= start) continue;
      const vx = (b.x - a.x) * 1000 / (b.timeMs - a.timeMs);
      const vy = (b.y - a.y) * 1000 / (b.timeMs - a.timeMs);
      if (!Number.isFinite(vx) || !Number.isFinite(vy)) continue;
      const w = DECAY_MS * (Math.exp((end - nowMs) / DECAY_MS) - Math.exp((start - nowMs) / DECAY_MS));
      x += vx * w; y += vy * w; weight += w;
    }
    return weight > 0 ? { x: finite(x / weight), y: finite(y / weight) } : { x: 0, y: 0 };
  }
}

function directionXZ(vector) {
  const x = finite(vector?.x), z = finite(vector?.z);
  const scale = Math.max(Math.abs(x), Math.abs(z));
  if (!scale) return { x: 0, z: -1, magnitude: 0 };
  const length = Math.hypot(x / scale, z / scale);
  return { x: x / scale / length, z: z / scale / length, magnitude: scale * length };
}

// A deliberate swipe supplies momentum; a still release throws away from the mage.
export function gestureThrowVelocity(motionXZ, fallbackXZ, gripLevel = 0) {
  const motion = directionXZ(motionXZ);
  const swipe = motion.magnitude >= 1.4;
  const direction = swipe ? motion : directionXZ(fallbackXZ);
  const base = swipe ? Math.min(26, Math.max(9, motion.magnitude * .9)) : 16;
  const speed = Math.min(32, base * (1 + .1 * nonnegative(gripLevel)));
  return { x: direction.x * speed, y: 2.4 + speed * .035, z: direction.z * speed, speed };
}

export function clampDragPoint(point, player, reach) {
  const origin = point3(player), target = point3(point, origin);
  const radius = nonnegative(reach);
  const scale = Math.max(1, Math.abs(target.x), Math.abs(target.z), Math.abs(origin.x), Math.abs(origin.z));
  const dx = target.x / scale - origin.x / scale, dz = target.z / scale - origin.z / scale;
  const length = Math.hypot(dx, dz);
  if (!length || length <= radius / scale) return target;
  return { x: origin.x + dx / length * radius, y: target.y, z: origin.z + dz / length * radius };
}

export function constrainDragPoint(from, to, boxes, radius = 0, halfHeight = 0) {
  const start = point3(from), end = point3(to, start);
  const margin = nonnegative(radius), vertical = nonnegative(halfHeight);
  const delta = { x: end.x - start.x, y: end.y - start.y, z: end.z - start.z };
  let firstHit = Infinity;

  for (const box of boxes || []) {
    if (!box || !['x', 'y', 'z', 'w', 'h', 'd'].every(key => Number.isFinite(box[key])) ||
        box.w <= 0 || box.h <= 0 || box.d <= 0) continue;
    const xzNear = segmentBox(start, end, box, margin);
    if (xzNear === null || !Number.isFinite(xzNear)) continue;
    const xzReverse = segmentBox(end, start, box, margin);
    if (xzReverse === null || !Number.isFinite(xzReverse)) continue;
    const bounds = {
      x: [box.x - box.w / 2 - margin, box.x + box.w / 2 + margin],
      y: [box.y - box.h / 2 - vertical, box.y + box.h / 2 + vertical],
      z: [box.z - box.d / 2 - margin, box.z + box.d / 2 + margin],
    };
    let yNear = 0, yFar = 1;
    if (Math.abs(delta.y) < 1e-8) {
      if (start.y < bounds.y[0] || start.y > bounds.y[1]) continue;
    } else {
      const a = (bounds.y[0] - start.y) / delta.y, b = (bounds.y[1] - start.y) / delta.y;
      yNear = Math.min(a, b); yFar = Math.max(a, b);
    }
    const near = Math.max(0, xzNear, yNear), far = Math.min(1, 1 - xzReverse, yFar);
    if (near > far) continue;

    const inside = ['x', 'y', 'z'].every(axis => start[axis] >= bounds[axis][0] && start[axis] <= bounds[axis][1]);
    if (inside) {
      const faces = Object.entries(bounds).flatMap(([axis, [lo, hi]]) => [
        { depth: start[axis] - lo, motion: -delta[axis] },
        { depth: hi - start[axis], motion: delta[axis] },
      ]);
      const shallowest = Math.min(...faces.map(face => face.depth));
      // Allow separation and sliding at an existing contact, but not a pull
      // through the wall towards its opposite face.
      if (faces.some(face => face.depth <= shallowest + .001 && face.motion >= -1e-8)) continue;
    }
    firstHit = Math.min(firstHit, near);
  }

  if (firstHit === Infinity) return end;
  const length = Math.hypot(delta.x, delta.y, delta.z);
  const t = Math.max(0, firstHit - .035 / Math.max(.035, length));
  return {
    x: start.x * (1 - t) + end.x * t,
    y: start.y * (1 - t) + end.y * t,
    z: start.z * (1 - t) + end.z * t,
  };
}
