import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture,actor,camp} from './game-fixture.mjs';
import {DEFENSE_RULES,defenseSnapshot,normalizeGuardOrders,updateGarrisonAlerts} from '../src/garrison.js';

function baseGame({tower=false,count=6}={}){
  const fixtureState=fixture(),{game}=fixtureState;
  const home=camp({id:'home',team:'ally',x:0,z:0,buildings:{watchtower:tower},supplyMigrated:true,stock:{food:0,reeds:0}});
  game.camps.push(home);
  const frogs=Array.from({length:count},(_,i)=>actor({id:`friend-${i}`,x:i+2,z:0,home:home.id}));
  game.frogs.push(...frogs);
  return {...fixtureState,home,frogs};
}

test('one-click garrison fills recommended posts, leaves a traveling companion, and costs nothing',()=>{
  const {game,home,frogs}=baseGame({tower:true,count:4}),bank={...game.resources};
  assert.equal(game.garrisonCommand({campId:home.id,command:'assign'}),true);
  assert.equal(frogs.filter(f=>f.guard).length,3);
  assert.equal(frogs.filter(f=>f.order==='follow').length,1);
  assert.deepEqual(game.resources,bank);
  const snapshot=defenseSnapshot(game).camps[0];
  assert.equal(snapshot.slots,4);assert.equal(snapshot.assigned,3);assert.equal(snapshot.stationed,3);
  assert.equal(snapshot.range,DEFENSE_RULES.towerRange);assert.equal(snapshot.damageReduction,18);
});

test('explicit selected assignment supports extra defenders and recall affects only that camp',()=>{
  const {game,home,frogs}=baseGame({count:6});
  const other=camp({id:'other',team:'ally',x:40,z:0});game.camps.push(other);
  frogs[5].guard=true;frogs[5].order='guard';frogs[5].home=other.id;
  game.selectedIds=new Set(frogs.slice(0,5).map(f=>f.id));
  assert.equal(game.garrisonCommand({campId:home.id,command:'assign-selected'}),true);
  assert.equal(defenseSnapshot(game).camps[0].assigned,5);
  assert.equal(game.garrisonCommand({campId:home.id,command:'recall'}),true);
  assert.ok(frogs.slice(0,5).every(f=>!f.guard&&f.order==='follow'&&!f.orderTarget));
  assert.equal(frogs[5].guard,true);assert.equal(frogs[5].home,other.id);
});

test('normal follow preserves garrisons while global regroup recalls every living guard',()=>{
  const {game,home,frogs}=baseGame({count:4});
  game.garrisonCommand({campId:home.id,command:'assign'});
  game.gangCommand('follow');assert.equal(frogs.filter(f=>f.guard).length,2);
  game.gangCommand('regroup');assert.ok(frogs.every(f=>!f.guard&&f.order==='follow'&&f.returnOrder==='follow'));
});

test('destroyed or missing guard homes release frogs instead of stranding them',()=>{
  const {game,home,frogs}=baseGame({count:3});
  frogs[0].guard=true;frogs[0].order='guard';home.destroyed=true;
  frogs[1].guard=true;frogs[1].order='guard';frogs[1].home='missing';
  frogs[2].trainingPaid=true;frogs[2].order='training';frogs[2].returnOrder='guard';
  normalizeGuardOrders(game);
  assert.ok(frogs.slice(0,2).every(f=>!f.guard&&f.order==='follow'&&f.home===null));
  assert.equal(frogs[2].returnOrder,'follow');assert.equal(frogs[2].trainingPaid,true);
});

test('guard positions follow the actual placed and rotated watchtower',()=>{
  const {game,home,frogs}=baseGame({tower:true,count:1});
  frogs[0].guard=true;frogs[0].order='guard';home.yaw=Math.PI/2;
  home.buildingPlacements={watchtower:{x:5,z:-4,yaw:0}};
  const first=game.guardAssignment(frogs[0]);
  home.buildingPlacements.watchtower.x=8;
  const moved=game.guardAssignment(frogs[0]);
  assert.ok(Math.abs(moved.point.x-first.point.x)<1e-10);
  assert.ok(Math.abs((moved.point.z-first.point.z)+3)<1e-10);
  assert.equal(moved.range,DEFENSE_RULES.towerRange);assert.equal(moved.leash,DEFENSE_RULES.towerLeash);
});

test('tower warning requires a present sentry and provides greater detection distance',()=>{
  const {game,home,frogs,messages}=baseGame({tower:true,count:1});
  const enemy=actor({id:'raider',team:'enemy0',x:23,z:0,raidTarget:home.id});game.frogs.push(enemy);
  updateGarrisonAlerts(game);assert.equal(messages.length,0);
  frogs[0].guard=true;frogs[0].order='guard';
  updateGarrisonAlerts(game);assert.equal(messages.length,1);assert.equal(home.underRaid,true);
  updateGarrisonAlerts(game);assert.equal(messages.length,1,'no repeated alarm every frame');
  enemy.dead=true;updateGarrisonAlerts(game);assert.equal(home.underRaid,false);assert.equal(messages.length,2);
});

test('tower defense applies locally and never grants distant guards global resistance',()=>{
  const {game,home,frogs}=baseGame({tower:true,count:1}),guard=frogs[0],enemy=actor({team:'enemy0',x:3});
  guard.guard=true;guard.order='guard';
  game.damage(guard,20,enemy);assert.ok(Math.abs(guard.hp-83.6)<1e-9);
  guard.hp=100;guard.invulnerable=0;guard.x=home.x+DEFENSE_RULES.towerLeash+10;enemy.x=guard.x+2;
  game.damage(guard,20,enemy);assert.equal(guard.hp,80);
});

test('tower alarm remains active while guards fight at the edge of its patrol area',()=>{
  const {game,home,frogs,messages}=baseGame({tower:true,count:1}),guard=frogs[0];
  guard.guard=true;guard.order='guard';
  const enemy=actor({id:'outer-raider',team:'enemy0',x:23,z:0,raidTarget:home.id});game.frogs.push(enemy);
  updateGarrisonAlerts(game);assert.equal(home.defenseThreatened,true);
  guard.x=19;guard.intent={kind:'attack',target:enemy};
  updateGarrisonAlerts(game);assert.equal(home.defenseThreatened,true);assert.equal(game.stats.raidsDefended,0);assert.equal(messages.length,1);
  assert.equal(defenseSnapshot(game).camps[0].staffed,true);
  enemy.x=27;updateGarrisonAlerts(game);assert.equal(home.defenseThreatened,true,'keep tracking an already-detected threat inside the leash');
  enemy.dead=true;updateGarrisonAlerts(game);assert.equal(game.stats.raidsDefended,1);
});

test('patrolling or repelled predators do not produce a contradictory active-defense alarm',()=>{
  const {game,home,messages}=baseGame({tower:true,count:1});
  game.predators.push(actor({id:'hunter',team:'predator',phase:'patrol',x:5}));
  updateGarrisonAlerts(game);assert.equal(messages.length,0);assert.equal(defenseSnapshot(game).camps[0].threats,0);
  game.predators[0].phase='flee';updateGarrisonAlerts(game);assert.equal(home.defenseThreatened,false);assert.equal(messages.length,0);
});

test('a guard trained in another shelter returns to the original assigned camp',()=>{
  const {game,home,frogs}=baseGame({count:1}),frog=frogs[0];
  const school=camp({id:'school',team:'ally',x:45,z:0,buildings:{training:true}});game.camps.push(school);
  Object.assign(frog,{guard:false,order:'training',returnOrder:'guard',trainingPaid:true,trainingCamp:school.id,trainingProgress:17.9,x:50,z:3});
  game.updateCampaign=()=>{};
  game.updateTraining(frog,school,.2);
  assert.equal(frog.trained,true);assert.equal(frog.guard,true);assert.equal(frog.order,'guard');assert.equal(frog.home,home.id);
});

test('nursery fills guard duty then produces traveling allies instead of an endless garrison',()=>{
  const {game,home,frogs}=baseGame({count:2});home.buildings.nursery=true;home.spawnTimer=85;
  for(const f of frogs){f.guard=true;f.order='guard';}
  const spawned=[];game.spawnFrog=data=>{spawned.push(data);return actor(data);};
  game.updateEconomy(.1);assert.equal(spawned.length,1);assert.equal(spawned[0].guard,false);assert.equal(spawned[0].order,'follow');
});

test('selected reassignment and camp recall cancel paid training once and refund its cost',()=>{
  const {game,home,frogs}=baseGame({count:1}),frog=frogs[0];
  frog.trainingPaid=true;frog.trainingCamp=home.id;frog.order='training';frog.returnOrder='guard';
  const before={...game.resources};
  game.garrisonCommand({campId:home.id,command:'recall'});
  assert.equal(frog.trainingPaid,false);assert.equal(frog.order,'follow');assert.equal(frog.guard,false);
  assert.deepEqual(game.resources,{food:before.food+8,reeds:before.reeds+4});
  game.garrisonCommand({campId:home.id,command:'recall'});assert.equal(game.resources.food,before.food+8);
});
