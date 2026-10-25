import test from 'node:test';
import assert from 'node:assert/strict';
import { RIVAL_RECRUIT_COST, rivalPlan, chooseRaiders, campSurrenderOffer } from '../src/rival-rules.js';

const camp = (extra = {}) => ({ id: 'home', team: 'enemy0', x: 0, z: 0, tier: 1, hp: 350, maxHp: 350, morale: 100, ...extra });
const frog = (index, extra = {}) => ({ id: `enemy-${index}`, team: 'enemy0', home: 'home', x: index % 5, z: 0, hp: 100, guard: index < 4, leader: index === 0, ...extra });

test('the five rival bases start with distinct substantial garrisons', () => {
  assert.deepEqual(Array.from({ length: 5 }, (_, i) => rivalPlan(camp({ team: `enemy${i}` })).initial), [9, 12, 15, 18, 21]);
  assert.equal(rivalPlan(camp({ team: 'ally', originalTeam: 'enemy4' })).initial, 21);
  assert.equal(rivalPlan(camp({ rivalIndex: 3 })).initial, 18);
});

test('rival strength and recruiting keep growing with a player army of 500', () => {
  const home = camp({ tier: 2 }), small = rivalPlan(home, { alliedCount: 4, elapsed: 300 });
  const large = rivalPlan(home, { alliedCount: 500, elapsed: 300 });
  assert.ok(large.garrison >= small.garrison + 270);
  assert.ok(large.raidSize > small.raidSize);
  assert.ok(large.interval <= small.interval);
  assert.ok(large.batch >= small.batch);
  assert.ok(large.foodRate > 0 && large.materialRate > 0);
  assert.ok(large.garrison > 100, 'there is no combined 100-actor cutoff');
});

test('a stronghold plans at least a full opposing army plus local reserve', () => {
  for (const alliedCount of [0, 3, 50, 500, 1000]) {
    const plan = rivalPlan(camp({ team: 'enemy4', tier: 2 }), { alliedCount, isStronghold: true });
    assert.ok(plan.initial >= 28);
    assert.equal(plan.defenseFloor, Math.ceil((alliedCount + 1) * 1.15));
    assert.ok(plan.garrison >= plan.defenseFloor + plan.reserve);
    assert.ok(plan.batch >= 4 && plan.batch <= 8);
    assert.equal(plan.isStronghold, true);
  }
});

test('reinforcement tempo is resource-backed and never relies on allied capacity', () => {
  assert.deepEqual(RIVAL_RECRUIT_COST, { food: 6, reeds: 2 });
  for (const alliedCount of [0, 10, 50, 500]) for (const elapsed of [0, 300, 3600]) {
    const plan = rivalPlan(camp({ tier: 2 }), { alliedCount, elapsed, ownedCount: 4 });
    assert.ok(plan.interval >= 18 && plan.interval <= 36);
    assert.ok(plan.batch >= 2 && plan.batch <= 6);
    assert.ok(plan.foodRate * plan.interval >= plan.batch * RIVAL_RECRUIT_COST.food);
    assert.ok(plan.materialRate * plan.interval >= plan.batch * RIVAL_RECRUIT_COST.reeds);
  }
});

test('raids leave the leader plus reserve and favor unassigned local fighters', () => {
  const home = camp(), frogs = Array.from({ length: 12 }, (_, i) => frog(i));
  const before = structuredClone(frogs), plan = { reserve: 4, raidSize: 8, defenseFloor: 0 };
  const raiders = chooseRaiders(frogs, home, plan);
  assert.equal(raiders.length, 7);
  assert.ok(raiders.every(f => !f.leader && !f.guard));
  assert.equal(frogs.length - raiders.length, plan.reserve + 1);
  assert.deepEqual(frogs, before, 'selection does not mutate actors or order');
});

test('remote, dead, surrendered, captured and already marching units cannot pad the home defense', () => {
  const home = camp(), valid = Array.from({ length: 6 }, (_, i) => frog(i));
  const unavailable = [frog(6, { x: 80 }), frog(7, { dead: true }), frog(8, { hp: 0 }),
    frog(9, { surrendered: true }), frog(10, { grabbedBy: {} }), frog(11, { raidTarget: 'other' }),
    frog(12, { team: 'ally' }), frog(13, { home: 'other' })];
  const raiders = chooseRaiders([...valid, ...unavailable], home, { reserve: 4, raidSize: 8 });
  assert.equal(raiders.length, 1);
  assert.ok(valid.includes(raiders[0]));
  assert.deepEqual(chooseRaiders(valid.slice(0, 5), home, { reserve: 4, raidSize: 8 }), []);
});

test('stronghold raids preserve an equally populated defending force at the base', () => {
  const home = camp(), plan = rivalPlan(home, { alliedCount: 50, elapsed: 300, ownedCount: 4, isStronghold: true });
  const frogs = Array.from({ length: plan.garrison }, (_, i) => frog(i));
  const raiders = chooseRaiders(frogs, home, plan);
  assert.ok(raiders.length > 0);
  assert.ok(frogs.length - raiders.length >= plan.defenseFloor);
  const onlyRequiredDefense = frogs.slice(0, plan.defenseFloor);
  assert.deepEqual(chooseRaiders(onlyRequiredDefense, home, plan), []);
});

test('global army size cannot buy an intact enemy base or a large intact garrison', () => {
  assert.equal(campSurrenderOffer(camp(), { defenders: 10, leaderAlive: true, alliedPower: 1e9, enemyPower: 1 }).allowed, false);
  assert.equal(campSurrenderOffer(camp({ hp: 100 }), { defenders: 10, leaderAlive: true, alliedPower: 1e9, enemyPower: 1 }).allowed, false);
  assert.equal(campSurrenderOffer(camp(), { defenders: 1, leaderAlive: false, alliedPower: 1e9, enemyPower: 1 }).allowed, false);
});

test('a broken local defense can negotiate, paying for survivors without guaranteed mass surrender', () => {
  const offer = campSurrenderOffer(camp({ hp: 150, morale: 30 }), { defenders: 3, leaderAlive: true, alliedPower: 100, enemyPower: 3 });
  assert.equal(offer.allowed, true);
  assert.deepEqual(offer.cost, { food: 27 });
  assert.ok(offer.chance > .25 && offer.chance <= .75);
  const weakLeaderless = campSurrenderOffer(camp({ hp: 20, morale: 0 }), { defenders: 3, leaderAlive: false, alliedPower: 1e9 });
  assert.equal(weakLeaderless.allowed, true);
  assert.equal(weakLeaderless.chance, .75);
  assert.equal(campSurrenderOffer(camp({ hp: 300, morale: 20 }), { defenders: 4, leaderAlive: false }).allowed, true);
  assert.equal(campSurrenderOffer(camp({ hp: 300, morale: 20 }), { defenders: 10, leaderAlive: false }).allowed, false);
});

test('allied, destroyed or missing camps never offer enemy diplomacy', () => {
  for (const home of [null, camp({ team: 'ally' }), camp({ destroyed: true }), camp({ hp: 0 })]) {
    const offer = campSurrenderOffer(home, { defenders: 0, leaderAlive: false, alliedPower: 100 });
    assert.equal(offer.allowed, false);
    assert.equal(offer.chance, 0);
  }
  assert.deepEqual(chooseRaiders([frog(0)], camp({ team: 'ally' })), []);
});
