export const STONE_LIMIT = 10;
export const GOLIATH_STONES = 7;
export const GOLIATH_CHARGE = 2;
export const GOLIATH_HEALTH = 420;
export const GOLIATH_LIFETIME = 40;
export const ENEMY_LIMIT = 96;
export const CHANNEL_DURATION = 3;
export const CHANNEL_COOLDOWN = 18;
export const MINION_LIMIT = 6;

export const activeStones = entities => entities.filter(e => e.ephemeral && e.kind === 'stone' && !e.removed && !e.pendingBreak);
export function selectStones(entities, origin, reachable) {
  return activeStones(entities).filter(e => !e.reserved && reachable(e))
    .sort((a, b) => Math.hypot(a.body.position.x-origin.x, a.body.position.z-origin.z)
      - Math.hypot(b.body.position.x-origin.x, b.body.position.z-origin.z)).slice(0, GOLIATH_STONES);
}

// Input lifetime and consumption are deliberately separate. Nothing is spent
// until the complete, still-valid assembly is activated by the runtime.
export class StoneRitual {
  constructor() { this.reset(); }
  reset() { this.phase = 'idle'; this.elapsed = 0; this.stones = []; }
  begin(stones) {
    if (this.phase !== 'idle' || stones.length !== GOLIATH_STONES) return false;
    this.phase = 'charge'; this.elapsed = 0; this.stones = stones; return true;
  }
  tick(dt, valid = true) {
    if (!valid) return 'cancelled';
    if (this.phase === 'charge') { this.elapsed += dt; if (this.elapsed >= GOLIATH_CHARGE) { this.phase = 'assemble'; this.elapsed = 0; return 'assemble'; } }
    else if (this.phase === 'assemble') this.elapsed += dt;
    return this.phase;
  }
  cancel() { const stones = this.stones; this.reset(); return stones; }
}

// A visible bodyguard can draw attacks; walls and distance prevent a global
// damage sink. Attacks still hit their actual target/collider.
export function bodyguardTarget(enemy, player, ally, visible) {
  if (!ally || ally.dead || ally.removed) return player;
  const ep = enemy.body.position, ap = ally.body.position, pp = player.body.position;
  return Math.hypot(ap.x-pp.x, ap.z-pp.z) <= 9
    && Math.hypot(ap.x-ep.x, ap.z-ep.z) <= 12 && visible(ep, ap, .12) ? ally : player;
}

export function freePosition(origin, radius, floors, obstacles, occupied = [], maxDistance = 5, allowed = () => true) {
  const free = p => floors.some(b => p.x-radius >= b.x-b.w/2 && p.x+radius <= b.x+b.w/2
      && p.z-radius >= b.z-b.d/2 && p.z+radius <= b.z+b.d/2)
    && !obstacles.some(b => Math.abs(p.x-b.x) < b.w/2+radius && Math.abs(p.z-b.z) < b.d/2+radius)
    && !occupied.some(e => !e.removed && !e.dead && Math.hypot(e.body.position.x-p.x,e.body.position.z-p.z) < e.radius+radius+.15) && allowed(p);
  for (let r=0; r<=maxDistance; r+=.6) for (let i=0; i<(r ? 24 : 1); i++) {
    const angle=i*Math.PI*2/24, p={x:origin.x+Math.sin(angle)*r,z:origin.z+Math.cos(angle)*r};
    if (free(p)) return p;
  }
  return null;
}
