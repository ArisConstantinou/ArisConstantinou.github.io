import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { CONTACT_TIMES, registerCombatHit, applyCombatImpulse, queueCombatStrike, updateCombatFeedback, clearCombatFeedback } from '../src/combat-feedback.js';
import { FORT_RADIUS, resolveFortMovement, initializeFort, gatePoint } from '../src/fortification.js';
import { createCreature } from '../src/creatures.js';
import { GameVFX } from '../src/effects.js';
import { GameAudio } from '../src/audio.js';

const actor = (id, team, more = {}) => ({ id, team, x: 0, y: .35, z: 0, yaw: 0, hp: 100, maxHp: 100, dead: false, invulnerable: 0, stun: 0, model: { setImpact(value) { this.impact = value; } }, ...more });
function fixture() {
  const player = actor('player', 'player'), target = actor('enemy', 'enemy0', { z: 4 }), sounds = [], impacts = [], tongueContacts = [];
  const game = { player, frogs: [player, target], predators: [], camps: [], elapsed: 0, cameraYaw: 0, hitPause: 0, shake: 0,
    audio: { play(name, details) { sounds.push({ name, details }); } },
    vfx: { impact(point, yaw, options) { impacts.push({ point: point.clone(), yaw, ...options }); }, confirmTongueHit(source, target, point) { tongueContacts.push({source, target, point:point.clone()}); } },
    hostile(a, b) { const team = f => f.team === 'player' ? 'ally' : f.team; return a !== b && !a.dead && !b.dead && a.team !== 'neutral' && b.team !== 'neutral' && !a.surrendered && !b.surrendered && team(a) !== team(b); },
    damage(victim, damage, source, options) { if (victim.invulnerable > 0) return 0; const before = victim.hp; victim.hp = Math.max(0, victim.hp - damage); registerCombatHit(this, victim, before - victim.hp, source, options); if (!victim.hp) victim.dead = true; return before - victim.hp; },
    damageCamp(camp, damage, source) { const actual = Math.min(camp.gateHp, damage); camp.gateHp -= actual; registerCombatHit(this, camp, actual, source, { structure: true }); }
  };
  return { game, player, target, sounds, impacts, tongueContacts };
}
const queue = (game, source, target, more = {}) => queueCombatStrike(game, { source, target, kind: 'tongue', damage: 14, range: 8, yaw: 0, ...more });
const at = (game, time) => { const dt = time - game.elapsed; game.elapsed = time; updateCombatFeedback(game, dt); };

test('a tongue strike starts its animation sound immediately but damage/stop/particles wait for real contact', () => {
  const { game, player, target, sounds, impacts, tongueContacts } = fixture();
  assert.ok(queue(game, player, target));
  assert.equal(target.hp, 100); assert.equal(game.hitPause, 0); assert.equal(impacts.length, 0);
  assert.equal(tongueContacts.length,0);
  assert.equal(sounds[0].name, 'attack-swing');
  at(game, CONTACT_TIMES.tongue - .001); assert.equal(target.hp, 100);
  at(game, CONTACT_TIMES.tongue); assert.equal(target.hp, 86);
  assert.ok(game.hitPause > 0 && game.hitPause <= .055);
  assert.equal(impacts.length, 1); assert.equal(sounds.at(-1).name, 'impact-flesh');
  assert.equal(tongueContacts.length,1);assert.equal(tongueContacts[0].target,target);assert.equal(tongueContacts[0].source,player);
  assert.equal(game.pendingStrikes.length, 0);
  at(game, 1); assert.equal(target.hp, 86, 'the same contact cannot replay');
});

test('stepping out of range during wind-up creates a whiff with no damage, recoil, particles or hit-stop', () => {
  const { game, player, target, sounds, impacts } = fixture();
  queue(game, player, target); target.z = 12; at(game, .2);
  assert.equal(target.hp, 100); assert.equal(target.combatImpulse, undefined);
  assert.equal(game.hitPause, 0); assert.equal(game.shake, 0); assert.equal(impacts.length, 0);
  assert.equal(sounds.at(-1).name, 'attack-miss'); assert.equal(game.lastStrikeResult.hits, 0);
});

test('a confirmed attack rechecks allegiance, surrender, corpses, invulnerability and facing at the contact frame', () => {
  for (const change of [{ team: 'ally' }, { team: 'neutral' }, { surrendered: true }, { dead: true }, { invulnerable: 1 }, { z: -4 }]) {
    const { game, player, target, impacts } = fixture(); queue(game, player, target); Object.assign(target, change); at(game, .2);
    assert.equal(target.hp, 100, JSON.stringify(change)); assert.equal(impacts.length, 0); assert.equal(game.hitPause, 0);
  }
});

test('a real castle wall blocks the delayed tongue, while its broken gate permits physical contact', () => {
  const { game, player, target } = fixture();
  const camp = { id: 'fort', x: 0, z: 0, yaw: 0, tier: 1, team: 'enemy0', hp: 350, maxHp: 350, buildings: {} }; initializeFort(camp); game.camps.push(camp);
  Object.assign(player, gatePoint(camp, 3)); Object.assign(target, gatePoint(camp, -3));
  queue(game, player, target, { yaw: Math.PI }); at(game, .2); assert.equal(target.hp, 100);
  camp.gateHp = 0;
  queue(game, player, target, { yaw: Math.PI }); at(game, .4); assert.equal(target.hp, 86);
});

test('striking the enemy gate targets the physical structure instead of rejecting its wall as an occluder', () => {
  const { game, player } = fixture();
  const camp = { id: 'fort', x: 0, z: 0, yaw: 0, tier: 1, team: 'enemy0', hp: 350, maxHp: 350, buildings: {} }; initializeFort(camp); game.camps.push(camp);
  Object.assign(player, gatePoint(camp, 3));
  const before = camp.gateHp;
  queueCombatStrike(game, { source: player, kind: 'tongue', damage: 16, range: 6, yaw: Math.PI, includeCamps: true });
  at(game, .2);
  assert.equal(camp.gateHp, before - 16); assert.equal(camp.combatImpulse, undefined, 'a fort is never knocked backwards');
});

test('source death, surrender, capture or predator grab during wind-up cancels its pending attack', () => {
  for (const change of [{ dead: true }, { team: 'enemy9' }, { grabbedBy: {} }]) {
    const { game, player, target } = fixture(); queue(game, player, target); Object.assign(player, change); at(game, .2);
    assert.equal(target.hp, 100); assert.equal(game.hitPause, 0);
  }
  const { game, player, target } = fixture(); queue(game, target, player, { yaw: Math.PI }); target.surrendered = true; at(game, .2); assert.equal(player.hp, 100);
});

test('recoil is directional, gradual and stronger for heavy attacks without ever writing world position itself', () => {
  const displacements = [];
  for (const [kind, damage] of [['tongue', 14], ['slam', 40]]) {
    const { game, player, target } = fixture(); target.x = 3; target.z = 0;
    registerCombatHit(game, target, damage, player, { kind });
    assert.equal(target.x, 3); assert.equal(target.z, 0); assert.ok(target.combatImpulse.x > 0);
    let total = 0;
    for (let i = 0; i < 30; i++) { const step = applyCombatImpulse(target, .02); assert.ok(step.dx >= 0 && step.dx < .16); assert.ok(Math.abs(step.dz) < 1e-9); total += step.dx; }
    assert.equal(target.combatImpulse, null); displacements.push(total);
  }
  assert.ok(displacements[0] > .10); assert.ok(displacements[1] > displacements[0] * 2); assert.ok(displacements[1] < .65);
});

test('recoil goes through the real movement solver and cannot push a frog through a castle wall', () => {
  const { game, player, target } = fixture();
  const camp = { id: 'fort', x: 0, z: 0, yaw: 0, tier: 1, team: 'enemy0', hp: 350, maxHp: 350, buildings: {} }; initializeFort(camp); game.camps.push(camp);
  target.x = FORT_RADIUS - 1; target.z = 0; player.x = target.x - 2; player.z = 0;
  registerCombatHit(game, target, 80, player, { kind: 'slam' });
  let blocked = false;
  for (let i = 0; i < 30; i++) {
    const push = applyCombatImpulse(target, .02), position = resolveFortMovement(game.camps, target, { x: target.x + push.dx, z: target.z + push.dz });
    blocked ||= position.blocked; target.x = position.x; target.z = position.z;
  }
  assert.equal(blocked, true); assert.ok(target.x < FORT_RADIUS - .6);
});

test('NPC impacts do not freeze the whole game and blocked contacts have a lighter physical response', () => {
  const { game, player, target, sounds } = fixture();
  registerCombatHit(game, player, 9, target, { kind: 'kick', blocked: true });
  assert.equal(game.hitPause, 0); assert.ok(game.shake <= .2);
  assert.equal(sounds.at(-1).name, 'impact-block'); assert.ok(Math.hypot(player.combatImpulse.x, player.combatImpulse.z) < 1.5);
});

test('large simultaneous impacts have bounded knockback, hit-stop, camera response and contact effects', () => {
  const { game, player, target, impacts, sounds } = fixture();
  for (let i = 0; i < 100; i++) registerCombatHit(game, target, 90, player, { kind: 'slam' });
  assert.ok(Math.hypot(target.combatImpulse.x, target.combatImpulse.z) <= 7.5 + 1e-9);
  assert.ok(game.hitPause <= .055); assert.ok(game.shake <= .7);
  assert.equal(impacts.length, 1); assert.equal(sounds.length, 1, 'one AoE contact burst does not allocate hundreds of audio voices');
});

test('area strikes damage only live reachable hostiles, including predators', () => {
  const { game, player, target } = fixture();
  target.z = 2;
  const ally = actor('ally', 'ally', { x: 1 }), neutral = actor('neutral', 'neutral', { x: -1 }), surrendered = actor('yielded', 'enemy0', { z: -1, surrendered: true }), fish = actor('fish', 'predator', { type: 'fish', z: 3, phase: 'stalk' });
  game.frogs.push(ally, neutral, surrendered); game.predators.push(fish);
  queueCombatStrike(game, { source: player, kind: 'slam', damage: 33, range: 4.6, area: true, slot: 'special' }); at(game, .35);
  assert.equal(target.hp, 67); assert.equal(fish.hp, 67);
  assert.equal(ally.hp, 100); assert.equal(neutral.hp, 100); assert.equal(surrendered.hp, 100); assert.equal(game.lastStrikeResult.hits, 2);
});

test('reset removes transient strikes/recoil so they cannot cross a respawn or region transfer', () => {
  const { game, player, target } = fixture(); queue(game, player, target); registerCombatHit(game, target, 10, player);
  clearCombatFeedback(game); at(game, 5);
  assert.equal(target.hp, 100); assert.equal(game.pendingStrikes.length, 0); assert.equal(target.combatImpulse, null); assert.equal(game.hitPause, 0);
});

test('directional recoil deforms actual frog bones and settles without moving the world transform', () => {
  const a = createCreature('frog'), b = createCreature('frog');
  try {
    a.group.position.set(4, 2, 6); b.group.position.copy(a.group.position);
    a.setImpact({ x: 1, z: 0, strength: 1, heavy: true }); b.setImpact({ x: -1, z: 0, strength: 1, heavy: true });
    a.update(.05, { time: 2 }); b.update(.05, { time: 2 });
    const pivotA = a.group.getObjectByName('anatomical-animation-pivot'), pivotB = b.group.getObjectByName('anatomical-animation-pivot');
    assert.ok(pivotA.rotation.z < 0 && pivotB.rotation.z > 0);
    assert.ok(a.bones.spine.scale.z < 1); assert.ok(a.bones.jaw.rotation.x < 0);
    assert.deepEqual(a.group.position.toArray(), [4, 2, 6]);
    for (let i = 0; i < 7; i++) a.update(.1, { time: 2 });
    assert.ok(Math.abs(pivotA.rotation.z) < 1e-9); assert.equal(a.bones.spine.scale.z, 1);
  } finally { a.dispose(); b.dispose(); }
});

test('confirmed contact briefly flashes only the struck skin and preserves its normal color', () => {
  const struck=createCreature('frog',{color:0x638d38}), untouched=createCreature('frog',{color:0x638d38});
  try {
    const original=struck.mesh.material.color.getHex();
    struck.setImpact({x:0,z:1,strength:1});
    assert.ok(struck.mesh.material.emissiveIntensity>.5);
    assert.equal(untouched.mesh.material.emissiveIntensity,0);
    struck.update(.02,{time:1});assert.ok(struck.mesh.material.emissiveIntensity>0);
    struck.update(.06,{time:1});assert.equal(struck.mesh.material.emissiveIntensity,0);
    assert.equal(struck.mesh.material.color.getHex(),original);
    struck.setImpact({strength:1});struck.setImpact({strength:0});assert.equal(struck.mesh.material.emissiveIntensity,0);
  } finally {struck.dispose();untouched.dispose();}
});

test('physical contact particles stay inside existing pools without a new mesh per contact', () => {
  const scene = new THREE.Scene(), fx = new GameVFX(scene), initial = [...scene.children];
  for (let i = 0; i < 500; i++) fx.impact(new THREE.Vector3(0, .7, 0), i, { heavy: true, power: 1.5 });
  fx.update(.02);
  assert.deepEqual(scene.children, initial);
  for (const pool of Object.values(fx.pools)) assert.ok(pool.mesh.count <= pool.count);
  for (let i = 0; i < 10; i++) fx.update(.1);
  for (const pool of Object.values(fx.pools)) assert.equal(pool.particles.length, 0);
  fx.clear();
});

test('hit, block and miss audio use different finite layers, while repeated crowd events are throttled', () => {
  const audio = new GameAudio(), layers = [];
  audio.context = { state: 'running', currentTime: 1 };
  audio.tone = (...args) => layers.push({ kind: 'tone', args }); audio.noiseBurst = (...args) => layers.push({ kind: 'noise', args });
  audio.play('impact-heavy'); const heavy = layers.splice(0);
  audio.play('impact-block'); const block = layers.splice(0);
  audio.play('attack-miss'); const miss = layers.splice(0);
  assert.ok(heavy.some(layer => layer.kind === 'tone' && layer.args[0] < 150));
  assert.ok(block.some(layer => layer.kind === 'tone' && layer.args[0] > 400));
  assert.equal(miss.length, 1); assert.equal(miss[0].kind, 'noise');
  audio.play('impact-heavy'); assert.equal(layers.length, 0);
});

test('working frogs visibly move the real forelimb rig and stop work when moving or fighting', () => {
  const model = createCreature('frog');
  try {
    model.setWorking(true); model.update(.1, { time: 1, speed: 0 });
    const shoulder = model.bones.shoulder1.rotation.x; model.update(.1, { time: 1.3, speed: 0 });
    assert.ok(Math.abs(model.bones.shoulder1.rotation.x - shoulder) > .05);
    model.setWorking(false); for (let i = 0; i < 8; i++) model.update(.1, { time: 1.3, speed: 0 });
    assert.equal(model.working, false); assert.ok(Math.abs(model.bones.shoulder1.rotation.x) < .002);
  } finally { model.dispose(); }
});
