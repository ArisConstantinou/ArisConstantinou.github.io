import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createGame} from '../feouda-engine.js';
import {REGIONS} from '../feouda-data.js';
import {getSiegeReadout} from '../feouda-siege.js';

const freeze = object => {Object.freeze(object);for (const value of Object.values(object)) if (value && typeof value === 'object' && !Object.isFrozen(value)) freeze(value);return object;};
function fixture(regionId = 'crossing') {
  const game = createGame(), state = game.state, gate = game.getNavigation().fortGate(regionId);
  const foot = structuredClone(state.squads.find(unit => unit.owner === 'player' && unit.type === 'spear'));
  const machine = structuredClone(state.squads.find(unit => unit.owner === 'player' && unit.type === 'ram'));
  const enemy = structuredClone(state.squads.find(unit => unit.owner === 'red' && unit.type === 'archer'));
  state.squads = [foot, machine];state.paused = false;
  Object.assign(foot, {...gate, order:{type:'capture', regionId}, activity:'capture', path:[]});
  return {game, state, gate, foot, machine, enemy, regionId};
}

test('fort walls must reach exactly zero, even after the physical gate has opened', () => {
  const {state} = fixture();state.regions.crossing.fortHp = 1;
  let result = getSiegeReadout(state, 'crossing');
  assert.equal(result.stage, 'breach');assert.equal(result.capture.advancing, false);assert.equal(result.forces.eligibleInfantry.count, 0);
  assert.equal(result.capture.reasonCode, 'fortified');assert.match(result.capture.reason, /στο 0/);
  state.regions.crossing.fortHp = 0;result = getSiegeReadout(state, 'crossing');
  assert.equal(result.stage, 'capture');assert.equal(result.capture.advancing, true);assert.equal(result.forces.eligibleInfantry.count, 1);
});

test('all readout gates match the shared engine geometry, including asymmetric castles', () => {
  const {game, state} = fixture();
  for (const region of REGIONS) assert.deepEqual(getSiegeReadout(state, region.id).gate, game.getNavigation().fortGate(region.id));
});

test('eligibility uses the 13 metre capture boundary, not the 10 metre movement arrival', () => {
  const {state, gate, foot} = fixture();state.regions.crossing.fortHp = 0;
  Object.assign(foot, {x:gate.x + 13, z:gate.z});
  assert.equal(getSiegeReadout(state, 'crossing').forces.eligibleInfantry.count, 1);
  foot.x += .001;
  assert.equal(getSiegeReadout(state, 'crossing').forces.eligibleInfantry.count, 0);
  assert.equal(getSiegeReadout(state, 'crossing').capture.reasonCode, 'arrival');
});

test('a non-neighbouring castle cannot claim capture and exposes connected intermediate fiefs', () => {
  const {state} = fixture('ironhold');state.regions.ironhold.fortHp = 0;
  let result = getSiegeReadout(state, 'ironhold');
  assert.equal(result.frontier.connected, false);assert.equal(result.capture.advancing, false);assert.equal(result.capture.reasonCode, 'frontier');
  assert.ok(result.frontier.neighbors.some(region => region.id === 'pass'));
  state.regions.pass.owner = 'player';result = getSiegeReadout(state, 'ironhold');
  assert.equal(result.frontier.connected, true);assert.deepEqual(result.frontier.ownNeighborIds, ['pass']);assert.equal(result.capture.advancing, true);
});

test('mere infantry presence never counts without an attack or capture order for this fort', () => {
  const {state, foot} = fixture();state.regions.crossing.fortHp = 0;
  for (const order of [{type:'hold'}, {type:'move', x:foot.x, z:foot.z}, {type:'capture', regionId:'firwood'}]) {
    foot.order = order;const result = getSiegeReadout(state, 'crossing');
    assert.equal(result.forces.nearGate.count, 1);assert.equal(result.forces.eligibleInfantry.count, 0);assert.equal(result.capture.reasonCode, 'order');
  }
  foot.order = {type:'attack', targetId:'crossing'};
  assert.equal(getSiegeReadout(state, 'crossing').capture.advancing, true);
});

test('orders and gate position are authoritative even when infantry activity has not updated yet', () => {
  const {state, foot} = fixture();state.regions.crossing.fortHp = 0;foot.activity = 'idle';
  assert.equal(getSiegeReadout(state, 'crossing').capture.advancing, true);
});

test('archers, cavalry and siege crews cannot capture', () => {
  const {state, foot, machine} = fixture();state.regions.crossing.fortHp = 0;
  for (const type of ['archer', 'cavalry', 'ram', 'trebuchet']) {
    foot.type = type;state.squads = [foot, machine];
    const result = getSiegeReadout(state, 'crossing');
    assert.equal(result.forces.infantry.count, 0);assert.equal(result.forces.eligibleInfantry.count, 0);assert.equal(result.capture.reasonCode, 'infantry');
  }
});

test('any living hostile squad strictly within 22 metres contests, regardless of its order or role', () => {
  const {state, gate, enemy} = fixture();state.regions.crossing.fortHp = 0;
  Object.assign(enemy, {x:gate.x + 21.999, z:gate.z, order:{type:'hold'}});state.squads.push(enemy);
  let result = getSiegeReadout(state, 'crossing');
  assert.equal(result.stage, 'secure');assert.equal(result.capture.contested, true);assert.equal(result.capture.reasonCode, 'contested');assert.equal(result.capture.advancing, false);
  enemy.x = gate.x + 22;result = getSiegeReadout(state, 'crossing');
  assert.equal(result.capture.contested, false);assert.equal(result.capture.advancing, true);
  enemy.x = gate.x + 1;enemy.hp = 0;
  assert.equal(getSiegeReadout(state, 'crossing').capture.contested, false);
});

test('a player truce excludes enemy squads from contest and defence threats without ending it', () => {
  const {state, gate, enemy} = fixture();state.regions.crossing.fortHp = 0;Object.assign(enemy, gate);state.squads.push(enemy);
  state.ai.truce.red = state.t + 180;const before = JSON.stringify(state.ai.truce);
  const result = getSiegeReadout(state, 'crossing');
  assert.equal(result.capture.contested, false);assert.equal(result.capture.advancing, true);assert.equal(JSON.stringify(state.ai.truce), before);
  assert.equal(getSiegeReadout(state, 'home').defence.threats.some(unit => unit.id === enemy.id), false);
});

test('a truce with the fortress owner blocks progress and makes the consequence of attack explicit', () => {
  const {state} = fixture();state.regions.crossing.owner = 'red';state.regions.crossing.fortHp = 0;state.ai.truce.red = state.t + 180;
  const result = getSiegeReadout(state, 'crossing');
  assert.equal(result.truce, true);assert.equal(result.forces.eligibleInfantry.count, 0);assert.equal(result.capture.advancing, false);
  assert.equal(result.capture.reasonCode, 'truce');assert.match(result.capture.reason, /ακυρώσει/);assert.ok(state.ai.truce.red > state.t);
});

test('a stronger faction under truce can win a neutral gate without being a hostile blocker', () => {
  const {state, gate, enemy, foot} = fixture();state.regions.crossing.fortHp = 0;state.ai.truce.red = state.t + 180;
  Object.assign(enemy, {...gate, type:'spear', men:9, order:{type:'capture', regionId:'crossing'}});state.squads.push(enemy);
  let result = getSiegeReadout(state, 'crossing');
  assert.equal(result.capture.contested, false);assert.equal(result.forces.eligibleInfantry.count, 1);
  assert.equal(result.capture.candidateOwner, 'red');assert.equal(result.capture.candidateMen, 9);
  assert.equal(result.capture.advancing, false);assert.equal(result.capture.reasonCode, 'competition');assert.match(result.capture.reason, /Ενίσχυσε/);
  foot.men = 10;result = getSiegeReadout(state, 'crossing');
  assert.equal(result.capture.candidateOwner, 'player');assert.equal(result.capture.advancing, true);
});

test('equal strength at a neutral gate preserves engine faction insertion order during a truce', () => {
  const {state, gate, enemy, foot} = fixture();state.regions.crossing.fortHp = 0;state.ai.truce.red = state.t + 180;
  Object.assign(enemy, {...gate, type:'spear', men:foot.men, order:{type:'capture', regionId:'crossing'}});
  state.squads = [enemy, foot];assert.equal(getSiegeReadout(state, 'crossing').capture.candidateOwner, 'red');
  state.squads = [foot, enemy];assert.equal(getSiegeReadout(state, 'crossing').capture.candidateOwner, 'player');
});

test('capture percent is the real stored player progress, never another faction’s progress', () => {
  const {state} = fixture();Object.assign(state.regions.crossing, {fortHp:0, capture:42.75, captureOwner:'player'});
  assert.equal(getSiegeReadout(state, 'crossing').capture.percent, 42.75);
  state.regions.crossing.captureOwner = 'red';const result = getSiegeReadout(state, 'crossing');
  assert.equal(result.capture.percent, 0);assert.equal(result.capture.storedPercent, 42.75);assert.equal(result.capture.owner, 'red');
});

test('paused capture retains preparation and progress but never claims that time is advancing', () => {
  const {state} = fixture();Object.assign(state.regions.crossing, {fortHp:0, capture:28, captureOwner:'player'});state.paused = true;
  const result = getSiegeReadout(state, 'crossing');
  assert.equal(result.forces.eligibleInfantry.count, 1);assert.equal(result.capture.percent, 28);assert.equal(result.capture.advancing, false);
  assert.equal(result.capture.reasonCode, 'paused');assert.match(result.capture.reason, /συνεχίσεις τον χρόνο/);
  state.paused = false;state.outcome = 'victory';assert.equal(getSiegeReadout(state, 'crossing').capture.reasonCode, 'finished');
});

test('selected force counts exclude duplicates, stale ids, dead squads and enemies', () => {
  const {state, foot, machine, enemy} = fixture();state.squads.push(enemy);
  const result = getSiegeReadout(state, 'crossing', {selectedIds:[foot.id, foot.id, machine.id, enemy.id, 'missing']});
  assert.equal(result.forces.selected.count, 2);assert.deepEqual(result.forces.selectedInfantry.ids, [foot.id]);assert.deepEqual(result.forces.selectedSiege.ids, [machine.id]);
  foot.hp = 0;assert.equal(getSiegeReadout(state, 'crossing', {selectedIds:[foot.id]}).forces.selected.count, 0);
});

test('owned forts show nearby threats by observed position and distant explicit attackers by real order', () => {
  const {state, enemy} = fixture('home'), meta = REGIONS.find(region => region.id === 'home');
  Object.assign(enemy, {x:meta.x, z:meta.z - 65, order:{type:'hold'}, activity:'idle'});state.squads.push(enemy);
  let result = getSiegeReadout(state, 'home');
  assert.equal(result.owned, true);assert.equal(result.stage, 'defend');assert.equal(result.defence.count, 1);assert.equal(result.defence.threats[0].direction, 'βόρεια');
  assert.equal(result.defence.threats[0].distance, 65);assert.equal(result.defence.threats[0].status, 'nearby');
  enemy.z = meta.z - 120;enemy.order = {type:'capture', regionId:'home'};enemy.activity = 'march';
  result = getSiegeReadout(state, 'home');assert.equal(result.defence.count, 1);assert.equal(result.defence.nearbyCount, 0);assert.equal(result.defence.approachingCount, 1);
  enemy.order = {type:'capture', regionId:'quarry'};assert.equal(getSiegeReadout(state, 'home').defence.count, 0);
});

test('dead units, distant uncommitted units and ceasefire units never inflate owned threat counts', () => {
  const {state, enemy} = fixture('home');state.squads.push(enemy);Object.assign(enemy, {x:-150, z:15});
  assert.equal(getSiegeReadout(state, 'home').defence.count, 1);
  enemy.hp = 0;assert.equal(getSiegeReadout(state, 'home').defence.count, 0);
  enemy.hp = 100;state.ai.truce.red = state.t + 10;assert.equal(getSiegeReadout(state, 'home').defence.count, 0);
});

test('owned-fort defence identifies hostile infantry with capture orders and shows actual loss progress', () => {
  const {state, gate, enemy, foot} = fixture('home');state.squads = [enemy];
  Object.assign(state.regions.home, {fortHp:0, captureOwner:'red', capture:37});state.regions.crossing.owner = 'red';
  Object.assign(enemy, {...gate, type:'spear', order:{type:'capture', regionId:'home'}});
  let result = getSiegeReadout(state, 'home');
  assert.equal(result.defence.capturers.count, 1);assert.equal(result.defence.capturePercent, 37);assert.equal(result.defence.contested, false);
  assert.match(result.defence.reason, /Στείλε ενισχύσεις/);
  Object.assign(foot, {x:gate.x + 21, z:gate.z, type:'archer', order:{type:'hold'}});state.squads.push(foot);
  result = getSiegeReadout(state, 'home');assert.equal(result.defence.contested, true);assert.match(result.defence.reason, /αμφισβητούμενη/);
});

test('defenders are living combat troops local to this fort or explicitly holding its gate', () => {
  const {state, foot, machine} = fixture('home');
  assert.deepEqual(getSiegeReadout(state, 'home').defence.defenders.ids, [foot.id]);
  Object.assign(foot, {x:200, z:150, order:{type:'hold', regionId:'home'}});
  assert.deepEqual(getSiegeReadout(state, 'home').defence.defenders.ids, [foot.id]);
  foot.order.regionId = 'quarry';assert.equal(getSiegeReadout(state, 'home').defence.defenders.count, 0);
  assert.equal(getSiegeReadout(state, 'home').defence.defenders.ids.includes(machine.id), false);
});

test('actual engine capture progress agrees with the read model after a simulation tick', () => {
  const {game, state, foot, gate} = fixture();state.squads = [foot];state.regions.crossing.fortHp = 0;
  Object.assign(foot, {...gate, anchor:{...gate}});state.ai.factions.red.nextRaid = state.ai.factions.gold.nextRaid = 1e9;
  state.ai.factions.red.nextRecruit = state.ai.factions.gold.nextRecruit = 1e9;
  assert.equal(game.command('order', {ids:[foot.id], type:'capture', regionId:'crossing'}).ok, true);
  game.step(.1);const result = getSiegeReadout(state, 'crossing');
  assert.ok(result.capture.percent > 0);assert.equal(result.capture.percent, state.regions.crossing.capture);assert.equal(result.capture.advancing, true);
});

test('readouts are detached and pure on a deeply frozen campaign, with no estimated odds or times', () => {
  const {state, foot} = fixture();state.regions.crossing.fortHp = 0;
  const frozen = freeze(structuredClone(state)), before = JSON.stringify(frozen);
  const result = getSiegeReadout(frozen, 'crossing', {selectedIds:[foot.id]});
  result.gate.x += 100;result.forces.infantry.ids.length = 0;result.frontier.ownNeighborIds.length = 0;
  assert.equal(JSON.stringify(frozen), before);
  assert.notEqual(getSiegeReadout(frozen, 'crossing').gate.x, result.gate.x);
  for (const key of ['eta', 'odds', 'winChance', 'arrivalTime', 'damagePerSecond']) assert.equal(key in result, false);
});

test('unknown regions and malformed optional unit lists cannot produce fabricated forces', () => {
  for (const state of [null, undefined, {}, {regions:{crossing:null}}, {regions:{crossing:{owner:'red'}}}]) assert.equal(getSiegeReadout(state, 'crossing'), null);
  const {state} = fixture();assert.equal(getSiegeReadout(state, '__proto__'), null);
  state.squads = [null, {}, {id:'bad', hp:100, type:'spear', owner:'player', x:Infinity, z:0}];
  assert.equal(getSiegeReadout(state, 'crossing').forces.infantry.count, 0);
});
