import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture, actor, camp, FrogGame, installStorage } from './game-fixture.mjs';
import { RIVAL_RECRUIT_COST } from '../src/rival-rules.js';
import { SAVE_KEY, SAVE_VERSION, validateSave } from '../src/rules.js';
import { WORLD_REVISION, WORLD_BOUNDARY } from '../src/world-config.js';

function addArmy(game, count, extra = {}) {
  const frogs = Array.from({ length: count }, (_, i) => actor({ id: `ally-${i}`, x: 60, z: (i % 10) * .1, ...extra }));
  game.frogs.push(...frogs);
  return frogs;
}

test('the strongest surviving faction maintains a player-sized stronghold and transfers that role after defeat', () => {
  const { game } = fixture();
  addArmy(game, 60);
  const first = camp({ id: 'first', team: 'enemy0', rivalIndex: 0, x: -80 });
  const last = camp({ id: 'last', team: 'enemy4', rivalIndex: 4, tier: 2, x: 80 });
  game.camps.push(first, last);
  const plan = game.rivalPlanFor(last);
  assert.equal(plan.isStronghold, true);
  assert.ok(plan.garrison >= 61);
  assert.equal(game.rivalPlanFor(first).isStronghold, false);
  last.destroyed = true;
  const successor = game.rivalPlanFor(first);
  assert.equal(successor.isStronghold, true);
  assert.ok(successor.garrison >= 61);
});

test('500 allied frogs do not disable actual paid enemy reinforcement spawning', () => {
  const { game } = fixture();
  addArmy(game, 500);
  const source = camp({ id: 'enemy-home', team: 'enemy0', x: -80, stock: { food: 1000, reeds: 1000 } });
  game.camps.push(source);
  const plan = game.rivalPlanFor(source), before = { ...source.stock };
  game.reinforceCamp(source, plan);
  const spawned = game.frogs.filter(f => f.home === source.id && f.team === source.team);
  assert.ok(spawned.length > 0 && spawned.length <= plan.batch);
  assert.equal(source.stock.food, before.food - spawned.length * RIVAL_RECRUIT_COST.food);
  assert.equal(source.stock.reeds, before.reeds - spawned.length * RIVAL_RECRUIT_COST.reeds);
  assert.equal(game.allies().length, 500);
});

test('reinforcements use the enemy camp stock and exclude outgoing raids from its defending force', () => {
  const { game } = fixture();
  game.resources = { food: 10000, reeds: 10000 };
  const source = camp({ id: 'enemy-home', team: 'enemy0', x: -80, stock: { food: 5, reeds: 2 } });
  game.camps.push(source);
  const plan = game.rivalPlanFor(source);
  game.reinforceCamp(source, plan);
  assert.equal(game.frogs.length, 1, 'the allied bank cannot pay for rival recruits');
  source.stock = { food: 1000, reeds: 1000 };
  for (let i = 0; i < plan.garrison + 3; i++) game.frogs.push(actor({ id: `raider-${i}`, team: source.team, home: source.id, x: 40, raidTarget: 'away' }));
  const before = game.frogs.length;
  game.reinforceCamp(source, plan);
  assert.ok(game.frogs.length > before, 'marching raiders must not stop the home defense from mustering');
  assert.deepEqual(game.resources, { food: 10000, reeds: 10000 });
});

test('an actual raid leaves the local leader, reserve and stronghold defense at home', () => {
  const { game } = fixture();
  addArmy(game, 12);
  const home = camp({ id: 'allied-home', team: 'ally', x: 90, originalEnemy: false, supplyMigrated: true, stock: { food: 0, reeds: 0 } });
  const source = camp({ id: 'enemy-home', team: 'enemy0', x: -50 });
  game.camps.push(home, source);
  const plan = game.rivalPlanFor(source);
  const defenders = Array.from({ length: plan.garrison }, (_, i) => actor({ id: `defender-${i}`, team: source.team, home: source.id, x: source.x + (i % 5), guard: i < 5, leader: i === 0 }));
  game.frogs.push(...defenders);
  game.launchRaid();
  const outgoing = defenders.filter(f => f.raidTarget === home.id);
  assert.ok(outgoing.length > 0);
  assert.ok(!defenders[0].raidTarget, 'the leader never leaves with the raid');
  assert.ok(defenders.length - outgoing.length >= Math.max(plan.reserve + 1, plan.defenseFloor));
});

test('a rival takeover changes territory ownership without changing any allied frog allegiance', () => {
  const { game } = fixture();
  const home = camp({ id: 'lost-home', team: 'ally', hp: 0, supplyMigrated: true, stock: { food: 0, reeds: 0 } });
  const source = camp({ id: 'enemy-home', team: 'enemy0', x: -70 });
  game.camps.push(home, source);
  const allies = addArmy(game, 5, { home: home.id, guard: true, order: 'guard', x: 0 });
  const raider = actor({ id: 'raider', team: source.team, home: source.id, raidTarget: home.id, x: 2 });
  game.frogs.push(raider);
  game.rivalTakeover(home, source.team);
  assert.equal(home.team, source.team);
  assert.equal(home.destroyed, false);
  assert.ok(home.hp > 0);
  assert.ok(allies.every(f => f.team === 'ally'));
  assert.equal(game.allies().length, 5);
});

test('raiders that defeat an unguarded allied base actually take it over', () => {
  const { game } = fixture();
  const home = camp({ id: 'exposed', team: 'ally', hp: 5, supplyMigrated: true, stock: { food: 0, reeds: 0 } });
  const source = camp({ id: 'enemy-home', team: 'enemy0', x: -70 });
  game.camps.push(home, source);
  const raider = actor({ id: 'raider', team: source.team, home: source.id, raidTarget: home.id, x: 2 });
  game.frogs.push(raider);
  game.damageCamp(home, 50, raider);
  assert.equal(home.team, source.team);
  assert.equal(home.destroyed, false);
});

test('capturing one camp converts only its own local survivors, never the distant faction', () => {
  const { game } = fixture();
  const first = camp({ id: 'first', team: 'enemy0', x: 0, z: 0 });
  const second = camp({ id: 'second', team: 'enemy0', x: 90, z: 0 });
  game.camps.push(first, second);
  const local = actor({ id: 'local', team: first.team, home: first.id, x: 5 });
  const marching = actor({ id: 'marching', team: first.team, home: first.id, x: 80, raidTarget: 'other' });
  const visitor = actor({ id: 'visitor', team: first.team, home: second.id, x: 5 });
  const distant = actor({ id: 'distant', team: first.team, home: second.id, x: 90 });
  game.frogs.push(local, marching, visitor, distant);
  game.captureCamp(first);
  assert.equal(first.team, 'ally');
  assert.equal(local.team, 'ally');
  assert.equal(marching.team, 'enemy0');
  assert.equal(visitor.team, 'enemy0');
  assert.equal(distant.team, 'enemy0');
  assert.equal(second.team, 'enemy0');
});

test('an active hostile garrison protects its camp until the defenders are cleared', () => {
  const { game, player } = fixture();
  const source = camp({ id: 'defended', team: 'enemy0', x: 0, z: 0 });
  game.camps.push(source);
  const defenders = Array.from({ length: 5 }, (_, i) => actor({ id: `guard-${i}`, team: source.team, home: source.id, x: 3 + i, guard: true, leader: i === 0 }));
  game.frogs.push(...defenders);
  game.damageCamp(source, 100, player);
  assert.ok(Math.abs(source.hp - 322) < 1e-8);
  for (const defender of defenders) defender.surrendered = true;
  game.damageCamp(source, 100, player);
  assert.ok(Math.abs(source.hp - 222) < 1e-8);
});

test('abandoned surviving enemies can rally at their ruin and rebuild it without new troops appearing', () => {
  const { game, player } = fixture();
  const home = camp({ id: 'ruin', team: 'enemy0', x: 0, z: 0, hp: 5 });
  game.camps.push(home);
  const survivors = [actor({ id: 'survivor-a', team: home.team, home: home.id, x: 3 }), actor({ id: 'survivor-b', team: home.team, home: home.id, x: -3 })];
  game.frogs.push(...survivors);
  game.damageCamp(home, 1000, player);
  assert.equal(home.destroyed, true);
  assert.ok(survivors.every(f => f.surrendered));
  player.x = 100;
  for (const survivor of survivors) survivor.surrenderTimer = 0;
  game.updateFrogs(.1);
  assert.ok(survivors.every(f => !f.surrendered), 'a ruined home must not permanently trap survivors in surrender');
  home.rebuildTimer = 74.95;
  const population = game.frogs.length;
  game.updateEconomy(.1);
  assert.equal(home.destroyed, false);
  assert.equal(home.team, 'enemy0');
  assert.equal(game.frogs.length, population, 'the same surviving troops rebuild, without free replacement troops');
});

test('a nursery produces a paid new ally even with an existing army of 500', () => {
  const { game } = fixture();
  addArmy(game, 500);
  const home = camp({ id: 'nursery-home', team: 'ally', x: 0, z: 0, buildings: { nursery: true }, spawnTimer: 85, supplyMigrated: true, stock: { food: 0, reeds: 0 } });
  game.camps.push(home);
  game.updateEconomy(.1);
  assert.equal(game.allies().length, 501);
  assert.ok(game.resources.food < 100 && game.resources.reeds < 100);
});

test('real saving and loading preserve an unlimited army, new-world positions and an active raid', t => {
  const { game, player, storage } = fixture();
  installStorage(t, storage);
  addArmy(game, 500, { x: 150 });
  player.x = 160;
  const home = camp({ id: 'our-home', team: 'ally', x: 160, supplyMigrated: true, stock: { food: 0, reeds: 0 } });
  const enemy = camp({ id: 'enemy-home', team: 'enemy4', originalTeam: 'enemy4', rivalIndex: 4, x: -160 });
  game.camps.push(home, enemy);
  game.frogs.push(actor({ id: 'saved-raider', team: enemy.team, home: enemy.id, x: -70, raidTarget: home.id, loot: 3 }));
  game.nextRaid = game.elapsed + 42;
  game.graceUntil = game.elapsed - 10;
  assert.equal(FrogGame.prototype.save.call(game), true);
  const saved = validateSave(JSON.parse(storage.get(SAVE_KEY)));
  assert.equal(saved.worldRevision, WORLD_REVISION);
  assert.equal(saved.player.x, 160);
  assert.equal(saved.frogs.filter(f => f.team === 'ally').length, 500);
  assert.equal(saved.nextRaid, game.elapsed + 42);
  const { game: loaded } = fixture();
  loaded.resetWorld(saved);
  assert.equal(loaded.allies().length, 500);
  assert.equal(loaded.player.x, 160);
  assert.equal(loaded.nextRaid, game.nextRaid);
  assert.equal(loaded.graceUntil, game.graceUntil);
  const raider = loaded.frogs.find(f => f.id === 'saved-raider');
  assert.equal(raider.raidTarget, home.id);
  assert.equal(raider.loot, 3);
});

test('an old save migrates once without deleting frogs or changing their allegiance', () => {
  const input = {
    version: SAVE_VERSION, elapsed: 600, player: actor({ id: 'player', team: 'player', x: 95 }),
    frogs: Array.from({ length: 500 }, (_, i) => actor({ id: `veteran-${i}`, x: 90 + (i % 5), home: 'legacy' })),
    camps: [camp({ id: 'legacy', team: 'ally', x: 95, stock: { food: 0, reeds: 0 }, supplyMigrated: true })],
    resources: { food: 100, reeds: 200 }
  };
  const migrated = validateSave(input), repeated = validateSave(migrated);
  assert.equal(migrated.frogs.length, 500);
  assert.ok(migrated.frogs.every(f => f.team === 'ally' && f.home === 'legacy'));
  assert.deepEqual(migrated.frogs.map(f => f.id), input.frogs.map(f => f.id));
  assert.ok(migrated.player.x > 108 && migrated.player.x <= WORLD_BOUNDARY);
  assert.equal(repeated.player.x, migrated.player.x);
  assert.deepEqual(repeated.frogs.map(f => [f.x, f.z]), migrated.frogs.map(f => [f.x, f.z]));
});
