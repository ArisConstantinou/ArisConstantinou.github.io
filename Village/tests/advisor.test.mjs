import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createGame} from '../feouda-engine.js';
import {REGIONS, UNIT_TYPES, BUILDINGS, TECHS} from '../feouda-data.js';
import {getTrainingRequirements, getMissionGuidance, getCampaignAdvice} from '../feouda-advisor.js';

const state = () => createGame().state;
const mission = (s, id) => s.missions.find(item => item.id === id);
const requirement = (s, type, region, id) => getTrainingRequirements(s, type, region).find(item => item.id === id);
const ownAll = s => {for (const region of Object.values(s.regions)) region.owner = 'player';};
const calm = s => {s.foodBalance = 1;s.resources.food = 200;s.availableWorkers = 4;s.population = 78;s.housing = 96;return s;};
const freeze = object => {Object.freeze(object);for (const value of Object.values(object)) if (value && typeof value === 'object' && !Object.isFrozen(value)) freeze(value);return object;};
function validNavigation(s, action) {
  assert.ok(['build', 'research', 'resource', 'workers', 'region', 'army', 'missions'].includes(action.kind));
  assert.equal('command' in action, false);
  if (action.kind === 'build') {
    assert.ok(BUILDINGS[action.type]);
    assert.equal(s.regions[action.regionId]?.owner, 'player');
  }
  if (action.kind === 'region') assert.ok(REGIONS.some(region => region.id === action.regionId));
  if (action.kind === 'army') {
    assert.ok(['troops', 'train'].includes(action.tab));
    if (action.regionId) assert.equal(s.regions[action.regionId]?.owner, 'player');
  }
}

test('training explains existing facility, reserved capacity, queue and every unit cost', () => {
  const s = state(), rows = getTrainingRequirements(s, 'spear', 'home');
  assert.equal(rows.find(row => row.id === 'building').met, true);
  assert.equal(rows.find(row => row.id === 'capacity').met, s.armyCapacity - s.armyUsed >= 6);
  assert.equal(rows.find(row => row.id === 'queue').met, true);
  for (const resource of Object.keys(UNIT_TYPES.spear.cost)) assert.equal(rows.find(row => row.id === `resource-${resource}`).met, true);
});

test('resource requirements identify exact simultaneous deficits with useful destinations', () => {
  const s = state();s.resources.money = 31;s.resources.food = 40;s.resources.wood = 20.5;
  const rows = getTrainingRequirements(s, 'spear', 'home');
  assert.match(rows.find(row => row.id === 'resource-money').detail, /Λείπουν CY£ 7/);
  assert.match(rows.find(row => row.id === 'resource-food').detail, /Λείπουν 5/);
  assert.match(rows.find(row => row.id === 'resource-wood').detail, /Λείπουν 1,5/);
  assert.deepEqual(rows.find(row => row.id === 'resource-wood').action, {kind: 'resource', type: 'wood'});
});

test('a tiny real resource deficit is never displayed as zero', () => {
  const s = state();s.resources.money = 37.999;
  const row = requirement(s, 'spear', 'home', 'resource-money');
  assert.equal(row.met, false);assert.match(row.detail, /<0,01/);
});

test('missing building and active construction are distinct, and neither permits training', () => {
  const s = state();s.regions.home.buildings.stable = 0;
  for (const region of Object.values(s.regions)) if (region.owner === 'player') region.buildings.stable = 0;
  let row = requirement(s, 'cavalry', 'home', 'building');
  assert.equal(row.met, false);assert.match(row.detail, /Χρειάζεται/);
  assert.deepEqual(row.action, {kind: 'build', type: 'stable', regionId: 'home'});
  s.jobs.push({id: 'new-stable', kind: 'build', type: 'stable', regionId: 'home', remaining: 40});
  row = requirement(s, 'cavalry', 'home', 'building');
  assert.equal(row.met, false);assert.match(row.detail, /Κατασκευάζεται/);assert.match(row.detail, /40 δευτ/);
  assert.match(row.actionLabel, /σε εξέλιξη/);
});

test('another owned ready facility provides a regional training route', () => {
  const s = state();s.regions.home.buildings.stable = 0;s.regions.farmland.buildings.stable = 1;
  const row = requirement(s, 'cavalry', 'home', 'building');
  assert.equal(row.met, false);
  assert.deepEqual(row.action, {kind: 'army', tab: 'train', regionId: 'farmland'});
});

test('unowned and unknown regions never produce construction navigation into foreign land', () => {
  for (const regionId of ['ironhold', 'not-a-region']) {
    const s = state(), rows = getTrainingRequirements(s, 'trebuchet', regionId);
    assert.equal(rows.find(row => row.id === 'region').met, false);
    assert.equal(rows.find(row => row.id === 'building').met, false);
    for (const row of rows) if (row.action) validNavigation(s, row.action);
  }
});

test('trebuchet research remains unmet while running and clears only on completion', () => {
  const s = state();s.techs.engineering = 0;
  assert.equal(requirement(s, 'trebuchet', 'home', 'technology').met, false);
  s.jobs.push({id: 'research', kind: 'research', type: 'engineering', regionId: 'home', remaining: 31});
  assert.match(requirement(s, 'trebuchet', 'home', 'technology').detail, /σε εξέλιξη/);
  assert.equal(requirement(s, 'trebuchet', 'home', 'technology').met, false);
  s.techs.engineering = 1;
  assert.equal(requirement(s, 'trebuchet', 'home', 'technology').met, true);
});

test('reserved army places and a full regional queue are explained independently', () => {
  const s = state();s.armyUsed = s.armyCapacity - 5;
  assert.equal(requirement(s, 'spear', 'home', 'capacity').met, false);
  for (let i = 0; i < 4; i++) s.jobs.push({id: `train-${i}`, kind: 'train', type: i % 2 ? 'sword' : 'spear', regionId: 'home', remaining: 30, waiting: i > 0});
  const row = requirement(s, 'spear', 'home', 'queue');
  assert.equal(row.met, false);assert.match(row.detail, /4 \/ 4/);assert.match(row.detail, /ίδιο κτίριο/);
});

test('queue explanation distinguishes a different facility without promising immediate authorization', () => {
  const s = state();s.jobs.push({id: 'archer', kind: 'train', type: 'archer', regionId: 'home', remaining: 30});
  const row = requirement(s, 'spear', 'home', 'queue');
  assert.match(row.detail, /1 \/ 4/);assert.match(row.detail, /Καμία προηγούμενη/);
  assert.equal('ok' in row, false);
});

test('all seven actual mission IDs have navigation and unknown or finished missions do not', () => {
  const s = state();
  assert.deepEqual(s.missions.map(item => item.id), ['supply', 'settlement', 'recruits', 'frontier', 'engineering', 'prosperity', 'unite']);
  for (const item of s.missions) {
    const advice = getMissionGuidance(s, item);assert.ok(advice.text && advice.label);validNavigation(s, advice.action);
    assert.equal(getMissionGuidance(s, {...item, done: true}), null);
  }
  assert.equal(getMissionGuidance(s, {id: 'imaginary', done: false}), null);
  assert.equal(getMissionGuidance(s, null), null);
});

test('9/9 territories with prosperity below 65 explicitly retains the second condition', () => {
  const s = calm(state());ownAll(s);s.prosperity = 48;
  const advice = getMissionGuidance(s, mission(s, 'unite'));
  assert.match(advice.text, /9 \/ 9/);assert.match(advice.text, /48 \/ 65/);assert.match(advice.text, /απομένει/);
  assert.notEqual(advice.action.kind, 'region');
  assert.notEqual(getCampaignAdvice(s).title, 'Η ηγεμονία ενώθηκε');
});

test('prosperity 65 alone is not victory and both conditions are shown', () => {
  const s = calm(state());s.prosperity = 65;
  const advice = getMissionGuidance(s, mission(s, 'unite'));
  assert.match(advice.text, /3 \/ 9/);assert.match(advice.text, /65 \/ 65/);
  assert.notEqual(getCampaignAdvice(s).title, 'Η ηγεμονία ενώθηκε');
});

test('all territories plus prosperity 65 gives completed campaign advice before incidental needs', () => {
  const s = state();ownAll(s);s.prosperity = 65;s.foodBalance = -1;s.resources.food = 0;
  const advice = getCampaignAdvice(s);
  assert.equal(advice.title, 'Η ηγεμονία ενώθηκε');assert.deepEqual(advice.action, {kind: 'missions'});
});

test('frontier navigation adapts when the initial neutral region is captured', () => {
  const s = state();const first = getMissionGuidance(s, mission(s, 'frontier'));
  assert.equal(first.action.kind, 'region');
  s.regions[first.action.regionId].owner = 'player';
  const next = getMissionGuidance(s, mission(s, 'frontier'));
  assert.equal(next.action.kind, 'region');assert.notEqual(next.action.regionId, first.action.regionId);
  const region = REGIONS.find(item => item.id === next.action.regionId);
  assert.notEqual(s.regions[region.id].owner, 'player');assert.ok(region.neighbors.some(id => s.regions[id].owner === 'player'));
});

test('frontier without living infantry opens recruitment, never a hidden attack order', () => {
  const s = state();s.squads = s.squads.filter(unit => unit.owner !== 'player' || UNIT_TYPES[unit.type].role !== 'infantry');
  const advice = getMissionGuidance(s, mission(s, 'frontier'));
  assert.deepEqual(advice.action, {kind: 'army', tab: 'train', regionId: 'home'});assert.match(advice.text, /πεζικό/);
});

test('running construction and waiting training are not described as completed missions', () => {
  const s = state();s.jobs.push({id: 'house', kind: 'build', type: 'houses', regionId: 'home', remaining: 19});
  s.jobs.push({id: 'recruit', kind: 'train', type: 'spear', regionId: 'home', remaining: 22, waiting: true});
  const build = getMissionGuidance(s, mission(s, 'settlement'));
  assert.match(build.text, /μετρά όταν ολοκληρωθεί/);assert.match(build.text, /19 δευτ/);
  const training = getMissionGuidance(s, mission(s, 'recruits'));
  assert.match(training.text, /περιμένει τη σειρά/);assert.match(training.text, /ολοκληρωμένα/);
});

test('food pressure takes priority over idle workers and uses actual balance per minute', () => {
  const s = state();s.availableWorkers = 12;s.foodBalance = -.5;s.resources.food = 100;
  const advice = getCampaignAdvice(s);
  assert.equal(advice.title, 'Εξασφάλισε τρόφιμα');assert.match(advice.text, /30 \/ λεπτό/);
  assert.deepEqual(advice.action, {kind: 'resource', type: 'food'});
});

test('exhausted food sources point to trade rather than an empty assignment list', () => {
  const s = state();s.foodBalance = -1;
  for (const node of s.nodes) if (node.type === 'food') node.amount = 0;
  const advice = getCampaignAdvice(s);
  assert.deepEqual(advice.action, {kind: 'resource', type: 'money'});assert.match(advice.label, /εμπόριο/);
});

test('idle worker advice reserves four builders and does not pressure those last four', () => {
  const s = calm(state());s.availableWorkers = 8;
  let advice = getCampaignAdvice(s);
  assert.deepEqual(advice.action, {kind: 'workers'});assert.match(advice.text, /κράτησε 4 ελεύθερους/);
  s.availableWorkers = 4;advice = getCampaignAdvice(s);
  assert.notEqual(advice.title, 'Υπάρχουν διαθέσιμα χέρια');
});

test('housing advice uses an owned available destination and recognizes pending homes', () => {
  const s = calm(state());s.population = s.housing;
  for (const r of Object.values(s.regions)) if (r.owner === 'player') r.buildings.houses = BUILDINGS.houses.max;
  s.regions.farmland.buildings.houses = 1;
  let advice = getCampaignAdvice(s);
  assert.deepEqual(advice.action, {kind: 'build', type: 'houses', regionId: 'farmland'});
  s.jobs.push({id: 'home-building', kind: 'build', type: 'houses', regionId: 'farmland', remaining: 13});
  advice = getCampaignAdvice(s);assert.match(advice.text, /ολοκληρώνονται σε 13/);
});

test('first unfinished actual mission is chosen once immediate needs are satisfied', () => {
  const s = calm(state());s.missions[0].done = true;s.missions[1].done = true;
  const advice = getCampaignAdvice(s);
  assert.equal(advice.title, mission(s, 'recruits').title);assert.equal(advice.action.kind, 'army');
});

test('defeated campaign and lost territories never suggest foreign construction', () => {
  const s = state();for (const region of Object.values(s.regions)) region.owner = 'red';s.outcome = 'defeat';
  const advice = getCampaignAdvice(s);assert.deepEqual(advice.action, {kind: 'missions'});
  for (const item of s.missions) validNavigation(s, getMissionGuidance(s, item).action);
  for (const row of getTrainingRequirements(s, 'trebuchet', 'home')) if (row.action) validNavigation(s, row.action);
});

test('guidance is pure, safe on immutable snapshots and never writes campaign progress', () => {
  const s = state(), before = JSON.stringify(s);freeze(s);
  getCampaignAdvice(s);
  for (const item of s.missions) getMissionGuidance(s, item);
  for (const type of Object.keys(UNIT_TYPES)) for (const region of REGIONS) getTrainingRequirements(s, type, region.id);
  assert.equal(JSON.stringify(s), before);
});

test('maximum civic levels and completed secondary missions do not invent another victory', () => {
  const s = calm(state());ownAll(s);s.prosperity = 50;
  for (const region of Object.values(s.regions)) for (const [type, building] of Object.entries(BUILDINGS)) region.buildings[type] = building.max;
  for (const item of s.missions) item.done = true;
  for (const [type, tech] of Object.entries(TECHS)) s.techs[type] = tech.max;
  const advice = getCampaignAdvice(s);
  assert.notEqual(advice.title, 'Η ηγεμονία ενώθηκε');assert.match(advice.text, /50 \/ 65/);
  validNavigation(s, advice.action);
});
