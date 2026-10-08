import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createGame} from '../feouda-engine.js';
import {REGIONS, UNIT_TYPES} from '../feouda-data.js';
import {getSquadOrderReadout, getArmyOrderSummary} from '../feouda-orders.js';

const owned = (state, type = 'spear') => state.squads.find(squad => squad.owner === 'player' && squad.type === type);
const freeze = object => {Object.freeze(object);for (const value of Object.values(object)) if (value && typeof value === 'object' && !Object.isFrozen(value)) freeze(value);return object;};
function fixture() {const game = createGame(), state = game.state, squad = owned(state);return {game, state, squad};}
function march(squad) {Object.assign(squad, {x:-110, z:70, activity:'march', engagedId:null, order:{type:'move', x:-80, z:100}, path:[{x:-100, z:70}, {x:-100, z:100}, {x:-80, z:100}]});}
function just(game, ...squads) {game.state.squads = squads;game.state.ai.factions.red.nextRaid = game.state.ai.factions.gold.nextRaid = 1e9;game.state.ai.factions.red.nextRecruit = game.state.ai.factions.gold.nextRecruit = 1e9;}

test('initial hold is a meaningful defensive state, not a moving or empty order', () => {
  const {state, squad} = fixture(), result = getSquadOrderReadout(state, squad.id);
  assert.equal(result.status, 'holding');assert.match(result.label, /θέση/);
  assert.equal(result.moving, false);assert.deepEqual(result.routePoints, []);assert.equal(result.remainingDistance, null);
  assert.equal(result.name, UNIT_TYPES.spear.name);assert.equal(result.men, 6);assert.equal(result.healthRatio, 1);
});

test('actual issued movement and simulation ticks remain marching and reduce stored route distance', () => {
  const {game, state, squad} = fixture();just(game, squad);
  assert.equal(game.command('order', {ids:[squad.id], type:'move', x:-110, z:75}).ok, true);
  const before = getSquadOrderReadout(state, squad);
  assert.equal(before.status, 'marching');assert.equal(before.moving, true);assert.ok(before.remainingDistance > 50);
  game.step(.5);
  const after = getSquadOrderReadout(state, squad);
  assert.equal(after.status, 'marching');assert.ok(after.remainingDistance < before.remainingDistance);
  assert.deepEqual(after.routePoints[0], {x:squad.x, z:squad.z});
});

test('route length follows every stored bend, never a straight-line shortcut or invented ETA', () => {
  const {state, squad} = fixture();march(squad);
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.remainingDistance, 60);assert.ok(result.remainingDistance > Math.hypot(30, 30));
  assert.deepEqual(result.destination, {x:-80, z:100});
  assert.deepEqual(result.routePoints.slice(1), squad.path);
  for (const key of ['eta', 'arrivalTime', 'remainingSeconds', 'speed']) assert.equal(key in result, false);
});

test('pausing retains the route and intent but never claims that a squad is moving', () => {
  const {state, squad} = fixture();march(squad);state.paused = true;
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'marching');assert.equal(result.moving, false);assert.equal(result.paused, true);
  assert.equal(result.remainingDistance, 60);assert.match(result.detail, /^Σε παύση\./);
});

test('campaign outcome stops the movement readout even with a retained route', () => {
  const {state, squad} = fixture();march(squad);state.outcome = 'victory';state.paused = false;
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.moving, false);assert.equal(result.paused, true);assert.match(result.detail, /ολοκληρώθηκε/);
});

test('missing route is awaiting, not a fabricated obstacle or idle squad', () => {
  const {state, squad} = fixture();march(squad);squad.path = [];squad.activity = 'idle';
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'awaiting');assert.equal(result.remainingDistance, null);assert.deepEqual(result.routePoints, []);
  assert.match(result.detail, /εντολή παραμένει ενεργή/);assert.notEqual(result.status, 'blocked');
});

test('an explicit obstacle receives a useful reason and no unsafe line to its destination', () => {
  const {state, squad} = fixture();march(squad);squad.activity = 'blocked';
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'blocked');assert.equal(result.moving, false);assert.deepEqual(result.routePoints, []);
  assert.match(result.detail, /άλλο σημείο προσέγγισης/);assert.deepEqual(result.destination, {x:-80, z:100});
});

test('retreat uses its actual friendly fief name and stored endpoint', () => {
  const {state, squad} = fixture();march(squad);squad.order = {...squad.order, type:'retreat', regionId:'home', targetId:'home'};
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'retreating');assert.equal(result.target.name, 'Αργυρόκαστρο');
  assert.deepEqual(result.destination, squad.path.at(-1));assert.equal(result.target.kind, 'region');
});

test('a hold order returning to its anchor is marching, while a stale nearby path is not', () => {
  const {state, squad} = fixture();march(squad);squad.order.type = 'hold';squad.anchor = {x:-80, z:100};
  assert.equal(getSquadOrderReadout(state, squad).status, 'marching');
  assert.match(getSquadOrderReadout(state, squad).label, /Επιστροφή/);
  squad.anchor = {x:squad.x + 1, z:squad.z};squad.activity = 'idle';
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'holding');assert.deepEqual(result.routePoints, []);
});

test('hold outside its anchor with no route is waiting for return rather than guarding that destination', () => {
  const {state, squad} = fixture();squad.anchor = {x:squad.x + 30, z:squad.z};
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'awaiting');assert.match(result.label, /επιστροφής/);
});

test('actual attack-move battle identifies its enemy and retains the original ground order', () => {
  const {game, state} = fixture(), squad = owned(state, 'archer'), enemy = state.squads.find(item => item.owner === 'red' && item.type === 'spear');
  Object.assign(squad, {x:-110, z:70, anchor:{x:-110, z:70}});Object.assign(enemy, {x:-95, z:70, anchor:{x:-95, z:70}});just(game, squad, enemy);
  assert.equal(game.command('order', {ids:[squad.id], type:'attackMove', x:-100, z:120}).ok, true);
  const original = {...squad.order};game.step(.1);
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'engaging');assert.equal(result.activity, 'attack');assert.equal(result.target.id, enemy.id);
  assert.equal(result.orderTarget.kind, 'point');assert.equal(result.orderTarget.x, original.x);assert.equal(result.orderTarget.z, original.z);
  assert.equal(result.orderType, 'attackMove');assert.match(result.detail, /Έπειτα συνεχίζει/);
  assert.deepEqual(result.routePoints, []);assert.equal(result.remainingDistance, null);
});

test('attack-move resumes a real route after its temporary opponent is gone', () => {
  const {game, state} = fixture(), squad = owned(state, 'archer'), enemy = state.squads.find(item => item.owner === 'red' && item.type === 'spear');
  Object.assign(squad, {x:-110, z:70, anchor:{x:-110, z:70}});Object.assign(enemy, {x:-95, z:70, anchor:{x:-95, z:70}});just(game, squad, enemy);
  assert.equal(game.command('order', {ids:[squad.id], type:'attackMove', x:-100, z:120}).ok, true);
  game.step(.1);assert.equal(getSquadOrderReadout(state, squad).status, 'engaging');
  enemy.hp = 0;game.step(.1);
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'marching');assert.equal(result.target.kind, 'point');assert.ok(result.routePoints.length > 1);assert.equal(result.moving, true);
});

test('chasing an enemy shows approach and the real engagement target, not an active attack', () => {
  const {state, squad} = fixture();march(squad);const enemy = state.squads.find(item => item.owner === 'red');
  squad.order.type = 'attackMove';squad.engagedId = enemy.id;
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'marching');assert.match(result.label, /Προσέγγιση/);assert.equal(result.target.id, enemy.id);
  assert.equal(result.orderTarget.kind, 'point');assert.ok(result.remainingDistance > 0);
});

test('dead or friendly engagements are never presented as a current battle', () => {
  const {state, squad} = fixture(), enemy = state.squads.find(item => item.owner === 'red');
  squad.activity = 'attack';squad.engagedId = enemy.id;squad.order = {type:'attack', targetId:enemy.id};
  enemy.hp = 0;assert.notEqual(getSquadOrderReadout(state, squad).status, 'engaging');
  enemy.hp = 100;enemy.owner = 'player';assert.notEqual(getSquadOrderReadout(state, squad).status, 'engaging');
  enemy.owner = 'red';state.ai.truce.red = state.t + 100;assert.notEqual(getSquadOrderReadout(state, squad).status, 'engaging');
});

test('fort siege reports the fortress and hides stale approach waypoints', () => {
  const {game, state} = fixture(), squad = owned(state, 'archer');
  Object.assign(squad, {x:-61, z:11, anchor:{x:-61, z:11}});just(game, squad);
  assert.equal(game.command('order', {ids:[squad.id], type:'attack', regionId:'crossing'}).ok, true);game.step(.1);
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'sieging');assert.equal(result.target.name, 'Σταυροδρόμι');assert.match(result.detail, /οχύρωση/);
  assert.deepEqual(result.routePoints, []);assert.equal(result.remainingDistance, null);assert.equal(result.moving, false);
});

test('a fort that changed ownership cannot retain a misleading siege caption', () => {
  const {state, squad} = fixture();squad.order = {type:'attack', regionId:'crossing'};squad.activity = 'siege';state.regions.crossing.owner = 'player';
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'awaiting');assert.match(result.label, /στόχος άλλαξε/);
});

test('actual infantry at a breached frontier gate reports capture progress', () => {
  const {game, state, squad} = fixture(), gate = game.getNavigation().fortGate('crossing');
  state.regions.crossing.fortHp = 0;Object.assign(squad, {...gate, anchor:{...gate}});just(game, squad);
  assert.equal(game.command('order', {ids:[squad.id], type:'capture', regionId:'crossing'}).ok, true);game.step(.1);
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'capturing');assert.equal(result.capture.eligible, true);assert.equal(result.capture.contested, false);
  assert.equal(result.capture.percent, state.regions.crossing.capture);assert.ok(result.capture.percent > 0);
  assert.deepEqual(result.routePoints, []);assert.equal(result.target.name, 'Σταυροδρόμι');
});

test('a nearby hostile squad stops the capture readout from claiming progress', () => {
  const {game, state, squad} = fixture(), gate = game.getNavigation().fortGate('crossing'), enemy = state.squads.find(item => item.owner === 'red' && item.type === 'archer');
  state.regions.crossing.fortHp = 0;Object.assign(squad, {...gate, anchor:{...gate}});Object.assign(enemy, {x:gate.x + 20, z:gate.z, anchor:{x:gate.x + 20, z:gate.z}});just(game, squad, enemy);
  assert.equal(game.command('order', {ids:[squad.id], type:'capture', regionId:'crossing'}).ok, true);game.step(.1);
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'capturing');assert.equal(result.capture.contested, true);assert.match(result.label, /Αμφισβητούμενη/);
  assert.match(result.detail, /δεν προχωρά/);assert.equal(state.regions.crossing.capture, 0);
});

test('infantry at a disconnected fortress does not claim a capture that the engine cannot advance', () => {
  const {game, state, squad} = fixture(), gate = game.getNavigation().fortGate('ironhold');
  state.regions.ironhold.fortHp = 0;Object.assign(squad, {...gate, anchor:{...gate}, activity:'capture', path:[], order:{type:'attack', regionId:'ironhold'}});
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'awaiting');assert.equal(result.capture.frontier, false);assert.match(result.detail, /γειτονικό φέουδο/);
});

test('the asymmetric castle capture gate matches the engine gate geometry', () => {
  const {game, state, squad} = fixture(), gate = game.getNavigation().fortGate('ironhold');
  state.regions.ironhold.fortHp = 0;state.regions.pass.owner = 'player';
  Object.assign(squad, {...gate, activity:'capture', path:[], order:{type:'capture', regionId:'ironhold'}});
  assert.equal(getSquadOrderReadout(state, squad).status, 'capturing');
  squad.x += 14;assert.notEqual(getSquadOrderReadout(state, squad).status, 'capturing');
});

test('siege engines guarding a breached gate are not falsely credited with infantry capture', () => {
  const {state} = fixture(), squad = owned(state, 'ram');state.regions.crossing.fortHp = 0;
  Object.assign(squad, {activity:'guard', order:{type:'capture', regionId:'crossing'}, path:[]});
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'holding');assert.equal(result.capture, null);assert.match(result.detail, /πεζικό/);
});

test('destroyed squads are excluded from selected army strength and do not retain movement', () => {
  const {state, squad} = fixture();march(squad);squad.hp = 0;
  const result = getSquadOrderReadout(state, squad);
  assert.equal(result.status, 'fallen');assert.equal(result.men, 0);assert.equal(result.moving, false);assert.deepEqual(result.routePoints, []);
  assert.equal(getArmyOrderSummary(state, [squad.id]).count, 0);
});

test('malformed or missing state returns finite empty readouts and never a fake route', () => {
  for (const state of [null, undefined, {}, {squads:null}, {squads:[null]}]) {
    const result = getSquadOrderReadout(state, 'missing');
    assert.equal(result.status, 'unknown');assert.equal(result.remainingDistance, null);assert.deepEqual(result.routePoints, []);
    assert.ok(Number.isFinite(result.healthRatio));assert.equal(getArmyOrderSummary(state, ['missing']).count, 0);
  }
});

test('invalid waypoint data rejects the whole line instead of joining across missing segments', () => {
  const {state, squad} = fixture();march(squad);squad.path.splice(1, 0, {x:Infinity, z:20});
  let result = getSquadOrderReadout(state, squad);
  assert.deepEqual(result.routePoints, []);assert.equal(result.remainingDistance, null);assert.equal(result.moving, false);
  squad.path = [{x:squad.x, z:squad.z}];result = getSquadOrderReadout(state, squad);
  assert.deepEqual(result.routePoints, []);assert.equal(result.remainingDistance, null);
});

test('mixed selected activities retain separate counts and total living strength', () => {
  const {state, squad} = fixture(), second = owned(state, 'archer'), third = owned(state, 'ram');
  march(squad);third.activity = 'blocked';
  const result = getArmyOrderSummary(state, [squad.id, second.id, third.id]);
  assert.equal(result.count, 3);assert.equal(result.status, 'mixed');assert.equal(result.counts.marching, 1);assert.equal(result.counts.holding, 1);assert.equal(result.counts.blocked, 1);
  assert.equal(result.men, squad.men + second.men + third.men);assert.equal(result.hp, squad.hp + second.hp + third.hp);
  assert.match(result.detail, /1 σε πορεία/);assert.match(result.detail, /1 με εμπόδιο/);
});

test('selection ignores duplicate, stale, malformed and enemy ids without counting reserve capacity', () => {
  const {state, squad} = fixture(), enemy = state.squads.find(item => item.owner === 'red');
  const result = getArmyOrderSummary(state, [squad.id, squad.id, 'missing', null, enemy.id]);
  assert.equal(result.count, 1);assert.equal(result.entries[0].id, squad.id);assert.equal(result.men, squad.men);
  assert.equal(result.healthRatio, 1);assert.equal(getArmyOrderSummary(state, null).status, 'empty');
});

test('common target is shown only when every selected squad really shares it', () => {
  const {state, squad} = fixture(), second = owned(state, 'archer');march(squad);march(second);
  squad.order = {...squad.order, type:'attack', regionId:'crossing'};second.order = {...second.order, type:'attack', regionId:'crossing'};
  let result = getArmyOrderSummary(state, [squad.id, second.id]);
  assert.equal(result.commonTarget.name, REGIONS.find(item => item.id === 'crossing').name);
  second.order.regionId = 'pass';result = getArmyOrderSummary(state, [squad.id, second.id]);assert.equal(result.commonTarget, null);
});

test('different ground formation destinations are not falsely presented as one common target', () => {
  const {state, squad} = fixture(), second = owned(state, 'archer');march(squad);march(second);second.order.x += 7;
  assert.equal(getArmyOrderSummary(state, [squad.id, second.id]).commonTarget, null);
});

test('all readouts are pure and all output paths and targets are detached from state', () => {
  const {state, squad} = fixture();march(squad);const before = JSON.stringify(state);freeze(state);
  const result = getSquadOrderReadout(state, squad), summary = getArmyOrderSummary(state, [squad.id]);
  result.routePoints[1].x = 123;result.destination.x = 456;result.target.x = 789;result.orderTarget.z = 321;
  summary.entries[0].routePoints[1].z = 222;summary.commonTarget.x = 100;
  assert.equal(JSON.stringify(state), before);
});
