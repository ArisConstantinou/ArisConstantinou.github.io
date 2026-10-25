import {updateCombatFeedback} from '../src/combat-feedback.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture, actor, camp } from './game-fixture.mjs';
import {
  FORT_RADIUS, WALL_HEIGHT, gateMaxHealth, initializeFort, gatePoint, campWorld,
  insideFort, resolveFortMovement, fortWaypoint
} from '../src/fortification.js';

const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const fort = (extra = {}) => initializeFort(camp({ id: 'fort', x: 0, z: 0, team: 'enemy0', ...extra }));

function walk(camps, frog, destination, seconds = 45) {
  const step = .05, speed = 4.7;
  for (let elapsed = 0; elapsed < seconds && distance(frog, destination) > .6; elapsed += step) {
    const waypoint = fortWaypoint(camps, frog, destination), remaining = distance(frog, waypoint);
    if (!remaining) continue;
    const fraction = Math.min(1, speed * step / remaining);
    const next = resolveFortMovement(camps, frog, {
      x: frog.x + (waypoint.x - frog.x) * fraction,
      z: frog.z + (waypoint.z - frog.z) * fraction
    });
    frog.x = next.x;
    frog.z = next.z;
  }
  return distance(frog, destination);
}

test('the enclosure blocks all four compass sides for every faction', () => {
  // With a diagonal gate, all four cardinal directions are uninterrupted wall.
  const home = fort({ yaw: Math.PI / 4 });
  for (const team of ['player', 'ally', 'enemy0', 'enemy1', 'neutral']) {
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const frog = actor({ team, x: dx * (FORT_RADIUS + 5), z: dz * (FORT_RADIUS + 5) });
      const next = resolveFortMovement([home], frog, { x: dx * (FORT_RADIUS - 5), z: dz * (FORT_RADIUS - 5) });
      assert.equal(next.blocked, true, `${team} should not cross wall at ${dx},${dz}`);
      assert.ok(!insideFort(home, next));
    }
  }
});

test('an intact gate permits its owners and blocks rival frogs', () => {
  const home = fort({ team: 'ally' }), from = gatePoint(home, 4), to = gatePoint(home, -4);
  for (const team of ['player', 'ally']) {
    const next = resolveFortMovement([home], actor({ team, ...from }), to);
    assert.equal(next.blocked, false);
    assert.ok(distance(next, to) < 1e-8);
  }
  for (const team of ['enemy0', 'enemy1', 'neutral']) {
    const next = resolveFortMovement([home], actor({ team, ...from }), to);
    assert.equal(next.blocked, true);
    assert.ok(!insideFort(home, next));
  }
});

test('a breached gate admits enemies while the rest of the wall remains solid', () => {
  const home = fort({ team: 'ally', gateHp: 0 });
  const throughGate = resolveFortMovement([home], actor({ team: 'enemy0', ...gatePoint(home, 4) }), gatePoint(home, -4));
  assert.equal(throughGate.blocked, false);
  assert.ok(insideFort(home, throughGate));
  const throughWall = resolveFortMovement([home], actor({ team: 'enemy0', x: FORT_RADIUS + 4, z: 0 }), { x: FORT_RADIUS - 4, z: 0 });
  assert.equal(throughWall.blocked, true);
  assert.ok(!insideFort(home, throughWall));
});

test('rotating the fort rotates its only entrance and closes the old direction', () => {
  const home = fort({ team: 'ally', yaw: Math.PI / 2 });
  const throughGate = resolveFortMovement([home], actor({ team: 'player', ...gatePoint(home, 4) }), gatePoint(home, -4));
  assert.equal(throughGate.blocked, false);
  assert.ok(insideFort(home, throughGate));
  const oldGate = resolveFortMovement([home], actor({ team: 'player', x: 0, z: FORT_RADIUS + 4 }), { x: 0, z: FORT_RADIUS - 4 });
  assert.equal(oldGate.blocked, true);
});

test('large movement steps cannot tunnel through one or both walls', () => {
  const home = fort({ team: 'ally' });
  for (const team of ['player', 'enemy0']) {
    const frog = actor({ team, x: -FORT_RADIUS - 20, z: 0 });
    const next = resolveFortMovement([home], frog, { x: FORT_RADIUS + 20, z: 0 });
    assert.equal(next.blocked, true);
    assert.ok(next.x < -FORT_RADIUS, 'the frog cannot emerge on the other side of the castle');
  }
});

test('wall height follows the real elevated courtyard support surface', () => {
  const floor = 10;
  const home = fort({ mesh: { userData: { support: { y: floor } }, position: { y: 0 } } });
  const frog = actor({ team: 'ally', x: FORT_RADIUS + 4, z: 0, y: floor + .2 });
  const destination = { x: FORT_RADIUS - 4, z: 0 };
  assert.equal(resolveFortMovement([home], frog, destination).blocked, true);
  frog.y = floor + WALL_HEIGHT + 1;
  assert.equal(resolveFortMovement([home], frog, destination).blocked, false);
});

test('owners cross their entrance and reach the courtyard without oscillating at the doorway', () => {
  for (const yaw of [0, Math.PI / 2]) {
    const home = fort({ team: 'ally', yaw });
    const frog = actor({ team: 'ally', ...gatePoint(home, 8) });
    assert.ok(walk([home], frog, { x: home.x, z: home.z }) < 1, `entry failed at rotation ${yaw}`);
  }
});

test('an outside attacker goes around the wall to the gate instead of sticking on a chord', () => {
  const home = fort();
  const frog = actor({ team: 'ally', ...campWorld(home, { x: -FORT_RADIUS - 8, z: 0 }) });
  const destination = gatePoint(home, 2.2);
  assert.ok(walk([home], frog, destination) < 1);
  assert.ok(!insideFort(home, frog), 'a closed hostile gate still prevents entering the courtyard');
});

test('an owner can leave home through its gate and continue to a destination behind the castle', () => {
  const home = fort({ team: 'ally' }), frog = actor({ team: 'ally', x: 0, z: 0 });
  const destination = { x: -FORT_RADIUS - 12, z: -10 };
  assert.ok(walk([home], frog, destination, 60) < 1);
});

test('a breached enemy fort is reachable through its entrance from the far side', () => {
  const home = fort({ gateHp: 0 });
  const frog = actor({ team: 'ally', x: 0, z: -FORT_RADIUS - 8 });
  assert.ok(walk([home], frog, { x: 0, z: 0 }, 60) < 1);
});

test('an outside siege damages the gate first, with no overflow into the keep', () => {
  const { game, player } = fixture(), home = fort({ gateHp: 20 });
  game.camps.push(home);
  Object.assign(player, gatePoint(home, 3));
  game.damageCamp(home, 1000, player);
  assert.equal(home.gateHp, 0);
  assert.equal(home.hp, home.maxHp);
  Object.assign(player, gatePoint(home, -4));
  game.damageCamp(home, 20, player);
  assert.ok(home.hp < home.maxHp);
});

test('the keep cannot be sniped through side walls even after the gate breaks', () => {
  const { game, player } = fixture(), home = fort();
  game.camps.push(home);
  player.x = FORT_RADIUS + 3;
  player.z = 0;
  const originalGate = home.gateHp;
  game.damageCamp(home, 100, player);
  assert.equal(home.gateHp, originalGate);
  assert.equal(home.hp, home.maxHp);
  home.gateHp = 0;
  game.damageCamp(home, 100, player);
  assert.equal(home.hp, home.maxHp, 'breaking the front gate does not remove the side walls');
});

test('combat cannot damage a frog through the wall at short attack range', () => {
  const { game, player } = fixture(), home = fort();
  game.camps.push(home);
  Object.assign(player, { x: FORT_RADIUS + 2, z: 0 });
  const defender = actor({ id: 'defender', team: home.team, home: home.id, x: FORT_RADIUS - 2, z: 0 });
  game.frogs.push(defender);
  game.damage(defender, 20, player);
  assert.equal(defender.hp, 100);
  home.gateHp = 0;
  Object.assign(player, gatePoint(home, 2));
  Object.assign(defender, gatePoint(home, -2));
  game.damage(defender, 20, player);
  assert.ok(defender.hp < 100, 'an actual clear attack through the breached doorway should work');
});

test('snake bosses cannot be damaged through solid walls but can be hit through a breached gate', () => {
  const { game, player } = fixture(), home = fort({ team: 'ally' });
  game.camps.push(home);
  Object.assign(player, { x: FORT_RADIUS - 2, z: 0 });
  const boss = game.spawnPredator({ type: 'snake', boss: true, x: FORT_RADIUS + 2, z: 0 });
  const originalHealth = boss.hp;
  game.damage(boss, 50, player);
  assert.equal(boss.hp, originalHealth, 'predator dispatch must not bypass the solid wall');
  home.gateHp = 0;
  Object.assign(player, gatePoint(home, -2));
  Object.assign(boss, gatePoint(home, 2));
  game.damage(boss, 50, player);
  assert.equal(boss.hp, originalHealth - 50, 'a clear strike through the breached opening should still work');
});

test('reaching an intermediate gate waypoint does not grant a remote attack', () => {
  const { game, player } = fixture(), home = fort({ team: 'ally' });
  game.camps.push(home);
  player.x = 80;
  player.z = 80;
  const target = actor({ id: 'far-target', team: 'enemy0', x: -FORT_RADIUS - 12, z: 0 });
  const hunter = actor({ id: 'hunter', team: 'ally', role: 'hunter', ...gatePoint(home, -2.1), brain: 10, attackCD: 0, intent: { kind: 'attack', target } });
  game.frogs.push(hunter, target);
  game.updateFrogs(.05);updateCombatFeedback(game,.05);
  assert.equal(target.hp, 100, 'waypoint proximity cannot substitute for real attack range');
});

test('paid defenders spawn safely inside the castle even when the army passes fifty', () => {
  const { game } = fixture(), home = fort({ team: 'enemy4', tier: 2 });
  game.camps.push(home);
  for (let i = 0; i < 65; i++) {
    const frog = game.spawnRival(home);
    assert.ok(distance(frog, home) < FORT_RADIUS - 1.2, `reinforcement ${i} spawned in the wall band`);
    const next = resolveFortMovement([home], frog, { x: frog.x * .9, z: frog.z * .9 });
    assert.equal(next.blocked, false, `reinforcement ${i} must be able to leave its spawn point`);
  }
});

test('palisade upgrades reinforce the whole gate and repairs restore a damaged gate', () => {
  const { game } = fixture();
  const home = game.addCamp(camp({ id: 'allied-home', team: 'ally', x: 0, z: 0, supplyMigrated: true, stock: { food: 0, reeds: 0 } }));
  game.resources = { food: 1000, reeds: 1000 };
  const originalMaximum = gateMaxHealth(home);
  assert.equal(home.gateHp, originalMaximum);
  game.commitBuild('palisade');
  assert.equal(home.buildings.palisade, true);
  assert.ok(gateMaxHealth(home) > originalMaximum);
  assert.equal(home.gateHp, gateMaxHealth(home));
  home.gateHp = 0;
  assert.equal(game.buildOptions().find(option => option.type === 'repair').enabled, true);
  game.commitBuild('repair');
  assert.ok(home.gateHp > 0 && home.gateHp <= gateMaxHealth(home));
  for (let i = 0; i < 5; i++) game.commitBuild('repair');
  assert.equal(home.gateHp, gateMaxHealth(home));
});

test('an actual raider exits its own castle, breaches the target gate and takes the courtyard', () => {
  const { game, player } = fixture();
  player.x = 180;
  player.z = 180;
  const source = fort({ id: 'source', team: 'enemy0', x: -40, z: 0 });
  const destination = fort({ id: 'destination', team: 'ally', x: 40, z: 0, hp: 40, gateHp: 20, supplyMigrated: true, stock: { food: 0, reeds: 0 } });
  game.camps.push(source, destination);
  const raider = actor({ id: 'raider', team: 'enemy0', home: source.id, x: source.x, z: source.z, guard: false, raidTarget: destination.id, brain: 0 });
  game.frogs.push(raider);
  let elapsed = 0;
  for (; elapsed < 100 && destination.team === 'ally'; elapsed += .05) {
    game.elapsed += .05;
    game.updateFrogs(.05);updateCombatFeedback(game,.05);
  }
  assert.equal(destination.team, 'enemy0', `raider stuck after ${elapsed.toFixed(1)}s at ${raider.x.toFixed(2)},${raider.z.toFixed(2)}`);
  assert.ok(insideFort(destination, raider), 'the keep must be taken from within the courtyard');
});

test('a raider attacks the gate when its nearby player target waits inside the castle', () => {
  const { game, player } = fixture(), home = fort({ team: 'ally', gateHp: 60 });
  game.camps.push(home);
  Object.assign(player, gatePoint(home, -4));
  const raider = actor({ id: 'raider', team: 'enemy0', ...gatePoint(home, 3), guard: false, raidTarget: home.id, brain: 0 });
  game.frogs.push(raider);
  for (let elapsed = 0; elapsed < 5; elapsed += .05) {
    game.elapsed += .05;
    game.updateFrogs(.05);updateCombatFeedback(game,.05);
  }
  assert.ok(home.gateHp < 60, 'seeing a target behind the gate must trigger a real siege, not endless replanning');
});
