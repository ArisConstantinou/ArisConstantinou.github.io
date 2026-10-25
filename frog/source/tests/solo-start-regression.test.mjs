import test from 'node:test';
import assert from 'node:assert/strict';
import { actor, fixture } from './game-fixture.mjs';
import { validateSave } from '../src/rules.js';

const population = game => ({
  players: game.frogs.filter(f => f.team === 'player' && !f.dead).length,
  allies: game.allies().length
});

function titleGameWithSave() {
  const { game } = fixture();
  game.resetWorld();
  game.frogs.push(actor({ id: 'earned-ally-1', name: 'Πρώτος σύντροφος', hp: 71 }), actor({ id: 'earned-ally-2', name: 'Δεύτερος σύντροφος', hp: 83 }));
  game.resources = { food: 159, reeds: 212, pearls: 4 };
  game.stats.recruited = 2;
  game.saved = validateSave(game.createSaveData());
  assert.ok(game.saved, 'the test uses a valid existing campaign');
  game.started = false;
  game.paused = true;
  return game;
}

test('explicit New always initializes a solo journey, including the first title-screen start', () => {
  const game = titleGameWithSave();
  game.start('new');
  assert.deepEqual(population(game), { players: 1, allies: 0 }, 'New must never reuse preview actors or a previous saved army');
  assert.equal(game.stats.recruited, 0);
  assert.equal(game.player.level, 1);
  assert.equal(game.player.crowned, false);
  assert.equal(game.camps.filter(c => c.team === 'ally').length, 0);
  assert.deepEqual(game.resources, { food: 22, reeds: 40, pearls: 0 });
  assert.equal(game.started, true);
  assert.equal(game.paused, false);
});

test('Continue preserves the two previously earned allies and never applies solo-start deletion', () => {
  const game = titleGameWithSave();
  game.resetWorld();
  assert.deepEqual(population(game), { players: 1, allies: 0 });
  game.start('continue');
  assert.deepEqual(population(game), { players: 1, allies: 2 });
  assert.deepEqual(game.allies().map(f => [f.id, f.name, f.hp]), [
    ['earned-ally-1', 'Πρώτος σύντροφος', 71],
    ['earned-ally-2', 'Δεύτερος σύντροφος', 83]
  ]);
  assert.equal(game.stats.recruited, 2);
  assert.deepEqual(game.resources, { food: 159, reeds: 212, pearls: 4 });
});

test('a delayed Continue request cannot restart a newer explicitly selected solo journey', async () => {
  const game = titleGameWithSave();
  game.resetWorld();
  game.save = () => { game.saved = game.createSaveData(); return true; };
  let finishLoading;
  const loading = new Promise(resolve => { finishLoading = resolve; });
  game.saveLoadPromise = loading;
  game.start('continue');
  game.start('new');
  const soloPlayer = game.player;
  game.elapsed = 12;
  game.resources.food = 17;
  finishLoading();
  await loading;
  await Promise.resolve();
  assert.equal(game.player, soloPlayer, 'an obsolete asynchronous request must not reset the newer active world');
  assert.equal(game.elapsed, 12, 'progress made after New is retained');
  assert.equal(game.resources.food, 17);
  assert.deepEqual(population(game), { players: 1, allies: 0 });
});

test('contextual Play waits for a persistent-only save and resumes its earned allies', async () => {
  const game=titleGameWithSave(),saved=game.saved;game.saved=null;
  let finishLoading;
  const loading=new Promise(resolve=>{finishLoading=()=>{game.saved=saved;resolve();};});
  game.saveLoadPromise=loading;game.ui.refs={hud:{hidden:true}};
  let hidden=0;game.ui.hideMenus=()=>hidden++;
  game.start('play');assert.equal(game.started,false);assert.equal(hidden,0);
  finishLoading();await loading;await Promise.resolve();
  assert.equal(game.started,true);assert.equal(hidden,1);assert.equal(game.ui.refs.hud.hidden,false);
  assert.deepEqual(population(game),{players:1,allies:2});assert.equal(game.resources.food,159);
});

test('contextual Play with no stored campaign starts solo after discovery completes', async () => {
  const game=titleGameWithSave();game.saved=null;game.saveLoadPromise=Promise.resolve();
  game.start('play');assert.equal(game.started,false);await Promise.resolve();
  assert.equal(game.started,true);assert.deepEqual(population(game),{players:1,allies:0});assert.equal(game.resources.food,22);
});

test('an obsolete contextual Play cannot replace a newer confirmed New Game', async () => {
  const game=titleGameWithSave();let finishLoading;
  const loading=new Promise(resolve=>{finishLoading=resolve;});game.saveLoadPromise=loading;
  game.start('play');game.start('new');const soloPlayer=game.player;game.resources.food=18;
  finishLoading();await loading;await Promise.resolve();
  assert.equal(game.player,soloPlayer);assert.equal(game.resources.food,18);assert.deepEqual(population(game),{players:1,allies:0});
});
