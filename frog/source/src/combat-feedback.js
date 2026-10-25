/** Contact-timed strikes and bounded, collision-safe combat response. */
import * as THREE from 'three';
import { fortLineClear } from './fortification.js';
import { isSurrendered } from './rules.js';
import { SHELTER_RADIUS } from './world-config.js';

export const CONTACT_TIMES = Object.freeze({ tongue: .145, kick: .26, slam: .34 });
const clamp = (value, min, max) => Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
const finite = (value, fallback = 0) => Number.isFinite(value) ? value : fallback;
const family = entity => entity?.team === 'player' ? 'ally' : entity?.team;
const alive = entity => entity && !entity.dead && finite(entity.hp, 1) > 0;
const distance = (a, b) => Math.hypot(finite(a?.x) - finite(b?.x), finite(a?.z) - finite(b?.z));
const actorHeight = actor => actor?.type === 'heron' ? 1.6 * finite(actor.scale, 1) : .55 * finite(actor?.scale, 1);
const impactPoint = new THREE.Vector3();

export function validCombatTarget(game, source, target) {
  if (!alive(source) || !alive(target) || source === target || isSurrendered(source) || isSurrendered(target)) return false;
  if (source.team === 'neutral' || target.team === 'neutral' || family(source) === family(target)) return false;
  if (target.phase === 'dormant' || target.phase === 'dead') return false;
  return target.team === 'predator' || source.team === 'predator' || (typeof game.hostile === 'function' ? game.hostile(source, target) : family(source) !== family(target));
}

/** Called after actual health loss, before death/surrender transitions. */
export function registerCombatHit(game, target, actualDamage, source, options = {}) {
  if (!target || !source || source === target || !(actualDamage > 0) || !Number.isFinite(actualDamage) || options.confirmed === false) return false;
  if ((target.dead && !options.killed) || target.team === 'neutral' || source.team === 'neutral' || family(target) === family(source) || isSurrendered(target)) return false;
  const kind = options.kind || source.attackType || 'tongue', heavy = kind === 'slam' || kind === 'kick' || actualDamage >= 32, blocked = Boolean(options.blocked), structure = Boolean(options.structure);
  let dx = finite(target.x) - finite(source.x), dz = finite(target.z) - finite(source.z), length = Math.hypot(dx, dz);
  if (length < .001) { dx = Math.sin(finite(source.yaw)); dz = Math.cos(finite(source.yaw)); length = 1; }
  dx /= length; dz /= length;
  const strength = clamp(actualDamage / 34, .35, 1.35), mass = target.team === 'predator' ? clamp(Math.pow(finite(target.scale, 1), 1.25), 1.8, 5) : target.role === 'bruiser' ? 1.3 : 1;
  if (!structure) {
    const speed = (blocked ? 1.1 : heavy ? 6.1 : 3.1) * Math.sqrt(strength) / mass;
    const previous = target.combatImpulse || { x: 0, z: 0 };
    let x = finite(previous.x) * .35 + dx * speed, z = finite(previous.z) * .35 + dz * speed;
    const total = Math.hypot(x, z), maximum = target.team === 'predator' ? 3.2 : 7.5;
    if (total > maximum) { x *= maximum / total; z *= maximum / total; }
    target.combatImpulse = { x, z, remaining: heavy ? .38 : .27, drag: heavy ? 12 : 15 };
    target.stun = Math.max(finite(target.stun), blocked ? .035 : heavy ? .17 : .085);
    target.hitAnim = heavy ? .36 : .26;
    const yaw = finite(target.yaw), localX = Math.cos(yaw) * dx - Math.sin(yaw) * dz, localZ = Math.sin(yaw) * dx + Math.cos(yaw) * dz;
    target.model?.setImpact?.({ x: localX, z: localZ, strength: blocked ? .28 : strength, heavy, duration: heavy ? .36 : .26 });
  }
  const involvedPlayer = source === game.player || target === game.player, nearby = !game.player || distance(target, game.player) < 26;
  if (source === game.player) {
    // Misses never come here. Multiple targets in one slam take the maximum,
    // rather than stacking world freezes or camera displacement per enemy.
    const stop = blocked ? .012 : heavy ? .052 : .027;
    game.hitPause = Math.max(finite(game.hitPause), stop);
    game.shake = Math.min(.7, Math.max(finite(game.shake), blocked ? .13 : heavy ? .52 : .27));
  } else if (target === game.player) game.shake = Math.min(.7, Math.max(finite(game.shake), blocked ? .16 : heavy ? .63 : .38));
  if (nearby) {
    const radius = structure ? 0 : .34 * finite(target.scale, 1);
    if (options.point && [options.point.x, options.point.y, options.point.z].every(Number.isFinite)) impactPoint.copy(options.point);
    else impactPoint.set(finite(target.x) - dx * radius, finite(target.y) + actorHeight(target), finite(target.z) - dz * radius);
    if(kind==='tongue'&&!structure)game.vfx?.confirmTongueHit?.(source,target,impactPoint);
    const budgeted = finite(game.elapsed) >= (involvedPlayer ? finite(game.nextPersonalImpact) : finite(game.nextCrowdImpact));
    if (budgeted) {
      if (involvedPlayer) game.nextPersonalImpact = finite(game.elapsed) + .018;
      else game.nextCrowdImpact = finite(game.elapsed) + .045;
      game.vfx?.impact?.(impactPoint, Math.atan2(dx, dz), { heavy, blocked: blocked || structure, water: target.swimming || target.type === 'fish', power: strength, priority: involvedPlayer });
      const sound = blocked || structure ? 'impact-block' : heavy ? 'impact-heavy' : 'impact-flesh';
      const pan = game.player ? Math.sin(Math.atan2(target.x - game.player.x, target.z - game.player.z) - finite(game.cameraYaw)) * .6 : 0;
      game.audio?.play?.(sound, { intensity: involvedPlayer ? 1 : .42, pan, priority: involvedPlayer });
    }
  }
  return { heavy, blocked, direction: { x: dx, z: dz }, strength };
}

/** Return a normal frame displacement. The caller must pass it through its
 * normal terrain/fort collision solver; this function never teleports an actor. */
export function applyCombatImpulse(actor, dt) {
  const impulse = actor?.combatImpulse;
  if (!impulse || !(dt > 0)) return { dx: 0, dz: 0 };
  const step = Math.min(dt, .1, Math.max(0, finite(impulse.remaining))), drag = clamp(impulse.drag, 8, 22), decay = Math.exp(-drag * step);
  const dx = finite(impulse.x) * (1 - decay) / drag, dz = finite(impulse.z) * (1 - decay) / drag;
  impulse.x *= decay; impulse.z *= decay; impulse.remaining -= step;
  if (impulse.remaining <= 0 || Math.hypot(impulse.x, impulse.z) < .015) actor.combatImpulse = null;
  return { dx, dz };
}

/** Queue one contact per attack slot. Animation and whoosh begin immediately;
 * health changes only at the contact, after all live geometry/state checks. */
export function queueCombatStrike(game, specification = {}) {
  const source = specification.source;
  if (!alive(source) || isSurrendered(source) || source.team === 'neutral') return false;
  const kind = ['tongue', 'kick', 'slam'].includes(specification.kind) ? specification.kind : 'tongue';
  const damage = Number(specification.damage), range = Number(specification.range);
  if (!(damage > 0) || !Number.isFinite(damage) || !(range > 0) || !Number.isFinite(range)) return false;
  game.pendingStrikes ||= [];
  const slot = specification.slot || 'primary';
  if (game.pendingStrikes.some(strike => strike.source === source && strike.slot === slot)) return false;
  const strike = { id: `strike-${game.strikeSequence = (game.strikeSequence || 0) + 1}`, source, sourceTeam: source.team, target: specification.target || null, kind, damage, range: Math.min(30, range), yaw: finite(specification.yaw, finite(source.yaw)), arc: clamp(specification.arc ?? (kind === 'slam' ? -1 : -.1), -1, 1), area: Boolean(specification.area), includeCamps: Boolean(specification.includeCamps), slot, dueAt: finite(game.elapsed) + clamp(specification.delay ?? CONTACT_TIMES[kind], .025, 1), options: specification.options || {} };
  game.pendingStrikes.push(strike);
  if (source === game.player || distance(source, game.player) < 18) game.audio?.play?.('attack-swing', { intensity: source === game.player ? .8 : .24, kind });
  return strike;
}

function withinContact(game, strike, target, camp = false) {
  const source = strike.source, range = strike.range + (camp ? SHELTER_RADIUS : 0), planar = distance(source, target);
  if (planar > range) return false;
  if (planar > .01 && Math.cos(Math.atan2(target.x - source.x, target.z - source.z) - strike.yaw) < strike.arc) return false;
  if (!camp && Math.abs((finite(target.y) + actorHeight(target)) - (finite(source.y) + .55)) > Math.max(3.5, finite(target.scale, 1) * 2)) return false;
  // The attacked structure's own wall is the contact, not an obstacle behind it.
  return fortLineClear(camp ? (game.camps || []).filter(item => item !== target) : game.camps || [], source, target);
}

export function updateCombatFeedback(game, dt) {
  if (!(dt >= 0) || !game.pendingStrikes?.length) return;
  const due = [], waiting = [];
  for (const strike of game.pendingStrikes) (finite(game.elapsed) + 1e-9 >= strike.dueAt ? due : waiting).push(strike);
  // Remove before invoking damage so reentrant state changes cannot replay it.
  game.pendingStrikes = waiting;
  for (const strike of due) {
    const source = strike.source;
    if (!alive(source) || isSurrendered(source) || source.team !== strike.sourceTeam || source.grabbedBy) continue;
    let hits = 0;
    const targets = strike.area ? [...(game.frogs || []), ...(game.predators || [])] : strike.target ? [strike.target] : [];
    for (const target of targets) {
      if (!validCombatTarget(game, source, target) || finite(target.invulnerable) > 0 || !withinContact(game, strike, target)) continue;
      const hp = finite(target.hp), wasDead = target.dead, wasSurrendered = isSurrendered(target);
      const result = game.damage?.(target, strike.damage, source, { ...strike.options, kind: strike.kind, contactStrike: true });
      if (result === true || typeof result === 'number' && result > 0 || finite(target.hp) < hp || !wasDead && target.dead || !wasSurrendered && isSurrendered(target)) hits++;
    }
    if (strike.includeCamps) for (const camp of game.camps || []) {
      if (camp.destroyed || camp.hp <= 0 || camp.team === 'neutral' || family(camp) === family(source) || !withinContact(game, strike, camp, true)) continue;
      const hp = finite(camp.hp), gate = finite(camp.gateHp);
      game.damageCamp?.(camp, strike.damage, source, { ...strike.options, kind: strike.kind, contactStrike: true });
      if (camp.hp < hp || finite(camp.gateHp) < gate) hits++;
    }
    if (!hits && source === game.player) game.audio?.play?.('attack-miss', { intensity: .55, kind: strike.kind });
    game.lastStrikeResult = { id: strike.id, kind: strike.kind, hits, at: finite(game.elapsed) };
  }
}

export function clearCombatFeedback(game) {
  game.pendingStrikes = []; game.hitPause = 0; game.nextCrowdImpact = 0; game.nextPersonalImpact = 0;
  for (const actor of [...(game.frogs || []), ...(game.predators || [])]) { actor.combatImpulse = null; actor.model?.setImpact?.({ strength: 0 }); }
}
