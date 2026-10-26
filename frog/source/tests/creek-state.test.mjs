import test from 'node:test';
import assert from 'node:assert/strict';
import {CREEK_ABILITIES,normalizeCreekState,creekRegion,creekPhase,abilityStatus,unlockCreekAbilities,recordCreekMetric,dropCreekInventory,recoverCreekDrop,remainingDropFood,collectCreekFind,creekModifiers} from '../src/creek-state.js';

test('exploration normalization keeps earned progress and independent region discoveries',()=>{
  const state=normalizeCreekState({clock:70,unlocked:['leap','leap','magic'],metrics:{chargedLeaps:4,swimSeconds:Infinity},regions:{0:{discovered:['pond','pond','castle']},1:{discovered:['roots'],nest:{level:2,safeSeconds:100}}}},{realmIndex:1});
  assert.deepEqual(state.unlocked,['leap']);assert.equal(state.metrics.chargedLeaps,4);assert.equal(state.metrics.swimSeconds,0);
  assert.deepEqual(state.regions[0].discovered,['pond']);assert.deepEqual(state.regions[1].discovered,['roots']);
  assert.equal(creekRegion(state,2).discovered.length,0);assert.equal(state.regions[1].nest.level,2);
});

test('abilities require their actual actions and relevant discovery; earned ability remains permanent',()=>{
  const state=normalizeCreekState();recordCreekMetric(state,'chargedLeaps',3);
  assert.deepEqual(unlockCreekAbilities(state),[]);
  state.regions[0].discovered.push('pond');assert.deepEqual(unlockCreekAbilities(state).map(x=>x.id),['leap']);
  const loaded=normalizeCreekState(JSON.parse(JSON.stringify(state)),{realmIndex:3});
  assert.equal(creekModifiers(loaded).leapStrength,1.2);assert.equal(abilityStatus(loaded,CREEK_ABILITIES[0]).unlocked,true);
  assert.equal(recordCreekMetric(loaded,'magic',999),false);assert.equal(recordCreekMetric(loaded,'chargedLeaps',-4),false);
});

test('all natural ability branches expose distinct milestones with a common persistent control model',()=>{
  const state=normalizeCreekState();state.regions[0].discovered=['pond','creek','bank','roots'];
  Object.assign(state.metrics,{chargedLeaps:3,bankLandings:2,swimSeconds:15,fliesCaught:6,observeSeconds:8,croaks:2,companionsMax:1});
  assert.equal(unlockCreekAbilities(state).length,6);assert.equal(unlockCreekAbilities(state).length,0);
  const modifiers=creekModifiers(state);assert.equal(modifiers.grip,true);assert.equal(modifiers.dive,true);assert.equal(modifiers.camouflage,true);assert.equal(modifiers.tongueRange,14);
  assert.ok(CREEK_ABILITIES.every(a=>a.controls&&a.hint));
});

test('ecological phase changes smoothly through active time and has no victory or kill input',()=>{
  assert.equal(creekPhase(0).id,'steady');assert.equal(creekPhase(151).id,'low');assert.equal(creekPhase(305).id,'rising');
  const before=creekPhase(149.999),after=creekPhase(150.001);
  assert.ok(Math.abs(before.waterOffset-after.waterOffset)<.0001);
  assert.equal(creekPhase(190).waterOffset,-.38);assert.equal(creekPhase(340).flow,1.15);
  assert.equal(creekPhase(650).stamp,'1:steady');assert.equal(Number.isFinite(creekPhase(Infinity,NaN).waterOffset),true);
});

test('important finds survive food decay and repeated defeats, with each cache recoverable once',()=>{
  const state=normalizeCreekState();collectCreekFind(state,0,{id:'shell',label:'Κέλυφος',kind:'finds'});
  const first=dropCreekInventory(state,0,{x:4,z:8},20);assert.equal(state.inventory.finds.length,0);
  state.clock=40;collectCreekFind(state,0,{id:'feather',label:'Φτερό',kind:'keepsakes'});
  const second=dropCreekInventory(state,0,{x:6,z:9},4);assert.notEqual(first.id,second.id);
  state.clock=600;assert.equal(remainingDropFood(first,state.clock),0);assert.equal(first.finds.length,1);
  assert.deepEqual(recoverCreekDrop(state,0,first.id),{food:0,finds:1,keepsakes:0});assert.equal(recoverCreekDrop(state,0,first.id),null);
  assert.equal(state.regions[0].drops.length,1);assert.equal(recoverCreekDrop(state,0,second.id).keepsakes,1);
  assert.equal(state.inventory.finds[0].id,'shell');assert.equal(state.inventory.keepsakes[0].id,'feather');
});

test('save round trip preserves food grace, region cache ownership and one-time collectibles',()=>{
  const state=normalizeCreekState();state.clock=100;collectCreekFind(state,1,{id:'r1-roots',label:'Κέλυφος',kind:'keepsakes'});
  const drop=dropCreekInventory(state,1,{x:12,z:-8},9);
  const loaded=normalizeCreekState(JSON.parse(JSON.stringify(state)),{realmIndex:0});
  assert.equal(remainingDropFood(loaded.regions[1].drops[0],180),9);assert.equal(recoverCreekDrop(loaded,0,drop.id),null);
  assert.equal(collectCreekFind(loaded,1,{id:'r1-roots',kind:'keepsakes'}),false);
  assert.equal(recoverCreekDrop(loaded,1,drop.id).keepsakes,1);
});

test('restoring an absent cache counter never overwrites or reuses an existing important cache id',()=>{
  const state=normalizeCreekState({regions:{0:{drops:[{id:'creek-drop-0-9',x:3,z:4,food:1,finds:[{id:'shell',label:'Κέλυφος'}]}]}}});
  const next=dropCreekInventory(state,0,{x:8,z:3},2);
  assert.equal(next.id,'creek-drop-0-10');assert.equal(state.regions[0].drops.length,2);
  assert.equal(recoverCreekDrop(state,0,'creek-drop-0-9').finds,1);
});
