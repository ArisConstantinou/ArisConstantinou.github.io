import test from 'node:test';
import assert from 'node:assert/strict';
import { actor, camp, fixture, FrogGame, installStorage } from './game-fixture.mjs';
import { SAVE_KEY, validateSave } from '../src/rules.js';
import { royalProgress } from '../src/player-rules.js';

const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const territory = (id, overrides = {}) => camp({ id, team: 'ally', originalEnemy: true, x: -140 + Number(id.replace(/\D/g, '') || 0) * 65, z: 80, ...overrides });
const tick = (game, count, dt = 1 / 60, squad = false) => {
  for (let i = 0; i < count; i++) { game.elapsed += dt; game.updatePlayer(dt); if (squad) game.updateFrogs(dt); }
};
function movementGame(keys = ['KeyW'], water = false) {
  const data = fixture(), { game, player } = data;
  game.findAim = () => null;
  game.input.up = () => false;
  game.input.down = key => keys.includes(key);
  game.input.right = false; game.input.left = false;
  player.charge = -1; player.z = -70; player.swimming = water; player.y = water ? 0 : .35;
  if (water) game.world.getSurface = () => ({ height: 0, type: 'water', platform: null });
  return data;
}

test('a new journey starts with one noble player, no gang and four neutral frogs to meet', () => {
  const { game } = fixture();
  game.frogs.push(actor({ id: 'previous-follower' }));
  game.world.campSites = [[-100, -65], [100, -65], [-100, 80], [100, 80], [0, 145]].map(([x, z], i) => ({ id: `enemy-site-${i}`, team: 'enemy', x, z }));
  game.resetWorld();
  assert.equal(game.frogs.filter(f => f.team === 'player').length, 1);
  assert.equal(game.allies().length, 0, 'no old or pre-granted companions enter a new journey');
  assert.equal(game.frogs.filter(f => f.team === 'neutral').length, 4);
  assert.equal(game.camps.filter(c => c.originalEnemy).length, 5, 'solo start does not remove the rival territories');
  assert.ok(game.frogs.some(f => f.team.startsWith('enemy')), 'actual rival populations still exist');
  assert.equal(game.player.crowned, false);
  assert.equal(royalProgress(game.player, game.camps).title, 'Ευγενής');
  assert.equal(game.player.level, 1);
  assert.equal(game.stats.recruited, 0);
});

test('loading a previous journey preserves its recruited army instead of applying the solo-start rule', t => {
  const { game, storage } = fixture(); installStorage(t, storage);
  game.balanceRevision = 1;
  game.camps.push(camp({ id: 'home', team: 'ally', originalEnemy: false, x: 70, z: 70, stock: { food: 0, reeds: 0 }, supplyMigrated: true }));
  const army = Array.from({ length: 15 }, (_, i) => actor({ id: `saved-ally-${i}`, name: `Companion ${i}`, role: i % 2 ? 'hunter' : 'bruiser', x: -45 + i * 2, z: 0, hp: 72 + i, level: 2 + i % 3, home: 'home', guard: i < 4, order: i < 4 ? 'guard' : 'follow' }));
  game.frogs.push(...army, actor({ id: 'free-frog', team: 'neutral', x: 10, z: -30 }));
  game.resources = { food: 321, reeds: 123 };
  assert.equal(FrogGame.prototype.save.call(game), true);
  const raw = JSON.parse(storage.get(SAVE_KEY)); delete raw.player.crowned;
  const saved = validateSave(raw), loaded = fixture().game;
  loaded.resetWorld(saved);
  assert.deepEqual(loaded.allies().map(f => [f.id, f.name, f.hp, f.level, f.role]), army.map(f => [f.id, f.name, f.hp, f.level, f.role]));
  assert.equal(loaded.allies().filter(f => f.guard).length, 4);
  assert.equal(loaded.frogs.filter(f => f.team === 'neutral').length, 1, 'loading does not inject the four new-game recruits');
  assert.deepEqual(loaded.resources, { food: 321, reeds: 123, pearls: 0 });
  assert.equal(loaded.player.crowned, false, 'an old save without earned territories remains noble');
});

test('royal rank requires three distinct, living, currently owned rival forts', () => {
  const experienced = { crowned: false, level: 99, tier: 5, population: 500 };
  const homeBuilt = Array.from({ length: 8 }, (_, i) => territory(`built-${i}`, { originalEnemy: false }));
  const invalid = [territory('ruin-1', { destroyed: true }), territory('ruin-2', { hp: 0 }), territory('enemy-1', { team: 'enemy0' }), territory('neutral-1', { team: 'neutral' })];
  assert.equal(royalProgress(experienced, [...homeBuilt, ...invalid]).crowned, false, 'levels, population, player-built forts and ruins do not grant kingship');
  const two = [territory('rival-1'), territory('rival-2')];
  assert.equal(royalProgress(experienced, [...two, territory('rival-2')]).territories, 2, 'duplicate camp IDs cannot count twice');
  assert.equal(royalProgress(experienced, two).title, 'Ευγενής');
  const crowned = royalProgress(experienced, [...two, territory('rival-3')]);
  assert.equal(crowned.crowned, true); assert.equal(crowned.title, 'Βασιλιάς');
  assert.equal(crowned.territories, crowned.target);
});

test('the third rival fort triggers one coronation, one visual update and one persistent save', () => {
  const { game, player, messages } = fixture(), crowns = [], portraits = [];
  let saves = 0;
  player.model.setCrowned = value => crowns.push(value);
  game.updateFrogPortrait = (frog, refresh) => portraits.push([frog, refresh]);
  game.save = () => { saves++; return true; };
  game.camps.push(territory('rival-1'), territory('rival-2'), territory('rival-3', { hp: 0 }));
  game.updateCampaign(true);
  assert.equal(Boolean(player.crowned), false);
  game.camps[2].hp = game.camps[2].maxHp;
  game.updateCampaign(true); game.updateCampaign(true); game.updateCampaign(true);
  assert.equal(player.crowned, true);
  assert.deepEqual(crowns, [true]);
  assert.deepEqual(portraits, [[player, true]]);
  assert.equal(messages.filter(args => args[0]?.id === 'coronation').length, 1);
  assert.equal(saves, 1);
});

test('an earned crown survives lost territory and a complete save/load round trip', t => {
  const { game, player, storage } = fixture(); installStorage(t, storage);
  game.balanceRevision = 1;
  game.camps.push(territory('rival-1'), territory('rival-2'), territory('rival-3'));
  assert.equal(game.updateRoyalStatus(), true);
  for (let i = 0; i < game.camps.length; i++) game.camps[i].team = `enemy${i}`;
  assert.equal(royalProgress(player, game.camps).territories, 0);
  assert.equal(royalProgress(player, game.camps).crowned, true);
  assert.equal(FrogGame.prototype.save.call(game), true);
  const saved = validateSave(JSON.parse(storage.get(SAVE_KEY)));
  assert.equal(saved.player.crowned, true);
  const loaded = fixture().game; loaded.resetWorld(saved);
  assert.equal(loaded.player.crowned, true);
  assert.equal(royalProgress(loaded.player, loaded.camps).title, 'Βασιλιάς');
  assert.equal(loaded.updateRoyalStatus(), false, 'continuing does not replay coronation');
});

test('an older campaign with three conquered rival forts receives its earned crown on continue', t => {
  const { game, storage } = fixture(); installStorage(t, storage); game.balanceRevision = 1;
  game.camps.push(territory('rival-1'), territory('rival-2'), territory('rival-3'));
  FrogGame.prototype.save.call(game);
  const old = JSON.parse(storage.get(SAVE_KEY)); delete old.player.crowned;
  const { game: loaded, messages } = fixture(); loaded.resetWorld(validateSave(old));
  assert.equal(loaded.player.crowned, true);
  assert.equal(messages.filter(args => args[0]?.id === 'coronation').length, 0, 'legacy recognition is quiet on loading');
});

test('NPC crown flags are removed both by save validation and direct actor creation', t => {
  const { game, storage } = fixture(); installStorage(t, storage); game.player.crowned = true; game.balanceRevision = 1;
  for (const team of ['ally', 'neutral', 'enemy0']) game.frogs.push(actor({ id: team, team, crowned: true, x: 20 }));
  FrogGame.prototype.save.call(game);
  const saved = validateSave(JSON.parse(storage.get(SAVE_KEY)));
  assert.equal(saved.player.crowned, true);
  assert.ok(saved.frogs.every(f => f.crowned === false));
  const loaded = fixture().game; loaded.resetWorld(saved);
  assert.ok(loaded.frogs.filter(f => f !== loaded.player).every(f => f.crowned === false));
  const forged = loaded.spawnFrog({ id: 'forged-npc', team: 'ally', crowned: true });
  assert.equal(forged.crowned, false);
});

for (const { name, keys, water, speed } of [
  { name: 'walking', keys: ['KeyW'], water: false, speed: 6.2 },
  { name: 'sprinting', keys: ['KeyW', 'ShiftLeft'], water: false, speed: 9.6 },
  { name: 'swimming', keys: ['KeyW'], water: true, speed: 6.2 * .82 },
  { name: 'sprinting through water', keys: ['KeyW', 'ShiftLeft'], water: true, speed: 9.6 * .82 },
  { name: 'diagonal walking', keys: ['KeyW', 'KeyD'], water: false, speed: 6.2 }
]) {
  test(`the player actually travels at the new ${name} speed without diagonal acceleration`, () => {
    const { game, player } = movementGame(keys, water);
    tick(game, 60);
    const from = { x: player.x, z: player.z };
    tick(game, 120);
    assert.ok(Math.abs(distance(player, from) - speed * 2) < .015, 'measured displacement matches the intended movement speed');
    assert.ok(Math.abs(player.speed - speed) < 1e-4);
    assert.equal(player.swimming, water);
  });
}

test('every companion role keeps up with actual faster player movement and sprints without teleportation', () => {
  const keys = ['KeyW'], { game, player } = movementGame(keys);
  const squad = ['scout', 'hunter', 'bruiser', 'caller'].map((role, i) => actor({ id: role, role, x: -6 + i * 4, z: -94 - i * 2, brain: 0 }));
  game.frogs.push(...squad);
  const start = { x: player.x, z: player.z }; let biggestStep = 0;
  for (let frame = 0; frame < 600; frame++) {
    if (frame === 240) keys.push('ShiftLeft');
    const before = squad.map(f => ({ x: f.x, z: f.z }));
    tick(game, 1, 1 / 60, true);
    squad.forEach((f, i) => { biggestStep = Math.max(biggestStep, distance(f, before[i])); });
  }
  assert.ok(distance(player, start) > 80, 'the real input handler completed both walking and sustained sprinting');
  for (const f of squad) {
    assert.ok(distance(f, player) < 14, `${f.role} stays with the moving group`);
    assert.equal(f.order, 'follow');
    assert.ok(f.z > -5, `${f.role} physically crossed the route`);
  }
  assert.ok(biggestStep < .25, 'catch-up is bounded movement each frame, not a teleport');
  assert.equal(game.allies().length, 4);
});
