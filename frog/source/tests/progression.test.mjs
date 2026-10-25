import test from 'node:test';
import assert from 'node:assert/strict';
import {recruitmentOffer,canHuntForRecovery,feedFromFly,settleCampSupplies,creditCampIncome,recoverAtShelter} from '../src/squad-rules.js';
import {gangCapacity,isVictory} from '../src/rules.js';
import {fixture,actor,camp} from './game-fixture.mjs';

test('a full injured frog can heal by consuming one real fly',()=>{
  const frog=actor({hp:70,stomach:100}),swarm={flies:5};
  assert.equal(canHuntForRecovery(frog),true);
  const result=feedFromFly(frog,swarm);
  assert.equal(result.consumed,true);assert.equal(result.healed,14);assert.equal(result.nourished,0);
  assert.equal(frog.hp,84);assert.equal(frog.stomach,100);assert.equal(swarm.flies,4);assert.equal(result.food,1);
});
test('a full healthy frog does not consume flies or produce free resources',()=>{
  const frog=actor(),swarm={flies:5};
  assert.equal(canHuntForRecovery(frog),false);assert.equal(feedFromFly(frog,swarm).consumed,false);
  assert.equal(swarm.flies,5);assert.equal(frog.hp,100);assert.equal(frog.stomach,100);
});
test('fly meals cap both stomach and HP while preserving the real fly cost',()=>{
  const frog=actor({hp:95,stomach:96}),swarm={flies:2},result=feedFromFly(frog,swarm);
  assert.equal(result.healed,5);assert.equal(result.nourished,4);
  assert.equal(frog.hp,100);assert.equal(frog.stomach,100);assert.equal(swarm.flies,1);
});
test('fly healing respects cooldowns, empty swarms and life status',()=>{
  const frog=actor({hp:30,stomach:20}),swarm={flies:4};
  feedFromFly(frog,swarm);const hp=frog.hp;
  assert.equal(frog.eatCD,1.8);assert.equal(feedFromFly(frog,swarm).consumed,false);assert.equal(frog.hp,hp);assert.equal(swarm.flies,3);
  frog.eatCD=0;assert.equal(feedFromFly(frog,{flies:0}).consumed,false);
  frog.dead=true;assert.equal(feedFromFly(frog,swarm).consumed,false);
});
test('recruitment offers are free for surrendered survivors and affordable for neutrals',()=>{
  assert.deepEqual(recruitmentOffer(actor({team:'enemy0',surrendered:true})).cost,{food:0});
  assert.equal(recruitmentOffer(actor({team:'enemy0'}),camp({destroyed:true})).guaranteed,true);
  const neutral=recruitmentOffer(actor({team:'neutral'}));assert.equal(neutral.guaranteed,true);assert.equal(neutral.cost.food,4);
  assert.equal(recruitmentOffer(actor()).eligible,false);
});
test('legacy camp stocks move to the shared bank only once',()=>{
  const resources={food:10,reeds:20},home=camp({team:'ally'});
  assert.deepEqual(settleCampSupplies(resources,home),{food:30,reeds:40});
  assert.deepEqual(resources,{food:40,reeds:60});assert.deepEqual(home.stock,{food:0,reeds:0});assert.equal(home.supplyMigrated,true);
  settleCampSupplies(resources,home);assert.deepEqual(resources,{food:40,reeds:60});
});
test('migration does not steal resources from enemy camps or destroyed ruins',()=>{
  for(const home of [camp(),camp({team:'ally',destroyed:true})]) {
    const resources={food:10,reeds:20};settleCampSupplies(resources,home);
    assert.deepEqual(resources,{food:10,reeds:20});assert.deepEqual(home.stock,{food:30,reeds:40});
  }
});
test('safe camp production credits the shared bank and upgrades increase its rates',()=>{
  const resources={food:0,reeds:0},home=camp({team:'ally',stock:{food:0,reeds:0}});
  creditCampIncome(resources,home,10);assert.equal(resources.food,2.5);assert.equal(resources.reeds,1.2);
  const before={...resources};creditCampIncome(resources,home,10,{safe:false});assert.deepEqual(resources,before);
  home.buildings={store:true,watchtower:true};creditCampIncome(resources,home,10);
  assert.equal(resources.food,7.5);assert.equal(resources.reeds,3.2);assert.deepEqual(home.stock,{food:0,reeds:0});
});
test('shelter recovery consumes nutrition and stops under threat or at the reserve',()=>{
  const frog=actor({hp:30,stomach:50});
  assert.equal(recoverAtShelter(frog,1),2.2);assert.ok(Math.abs(frog.stomach-(50-2.2*.18))<1e-9);
  const before=frog.hp;assert.equal(recoverAtShelter(frog,10,{safe:false}),0);assert.equal(frog.hp,before);
  frog.stomach=10;assert.equal(recoverAtShelter(frog,10),0);
  frog.stomach=10.18;assert.ok(Math.abs(recoverAtShelter(frog,10)-1)<1e-9);assert.equal(frog.stomach,10);
});
test('an unlimited army captures survivors but must rebuild ruins for territorial control',()=>{
  const {game,player}=fixture();game.resources={food:0,reeds:0};
  for(let i=0;i<3;i++)game.camps.push(camp({id:'owned-'+i,team:'ally',x:30+i*30,originalEnemy:true,stock:{food:0,reeds:0}}));
  for(let i=0;i<24;i++)game.frogs.push(actor({id:'army-'+i,x:0,z:-i*.1}));
  assert.equal(game.allies().length,gangCapacity(game.camps));
  const fallen=camp({id:'fourth',team:'enemy3',hp:5,x:5}),last=camp({id:'fifth',team:'enemy4',hp:60,x:40});
  game.camps.push(fallen,last);
  for(let i=0;i<5;i++){game.frogs.push(actor({id:'fourth-'+i,team:fallen.team,home:fallen.id,x:5}));game.frogs.push(actor({id:'fifth-'+i,team:last.team,home:last.id,x:40}));}
  assert.equal(game.camps.filter(c=>c.originalEnemy&&(c.destroyed||c.team==='ally')).length,3);
  game.damageCamp(fallen,20,player);
  for(const f of game.frogs.filter(f=>f.home===fallen.id))game.recruit(f);
  assert.equal(game.allies().length,29);assert.ok(game.allies().length>gangCapacity(game.camps));
  game.captureCamp(last);
  assert.equal(game.allies().length,34);assert.equal(isVictory(game.camps),false);
  game.commitBuild('shelter',{x:fallen.x,z:fallen.z,yaw:0,ruin:fallen});assert.equal(isVictory(game.camps),true);
  assert.equal(game.frogs.filter(f=>f.home===last.id&&f.guard).length,1);
});
test('actual neutral recruitment charges four food and is guaranteed',()=>{
  const {game}=fixture();game.resources={food:4,reeds:0};
  const neutral=actor({id:'neutral',team:'neutral'});game.frogs.push(neutral);
  game.recruit(neutral);assert.equal(neutral.team,'ally');assert.equal(game.resources.food,0);
  game.recruit(neutral);assert.equal(game.resources.food,0);assert.equal(game.stats.recruited,1);
});
test('the forage order finds distant flies and heals a full injured ally through actual AI',()=>{
  const {game}=fixture(),frog=actor({id:'forager',hp:40,stomach:100,order:'forage'}),swarm={id:'flies',x:50,z:0,flies:10,maxFlies:10};
  game.frogs.push(frog);game.world.hotspots.push(swarm);game.command='forage';
  const intent=game.thinkFrog(frog,[frog]);
  assert.equal(intent?.kind,'eat');assert.equal(intent?.target,swarm);
  frog.x=50;frog.intent=intent;frog.brain=10;game.updateFrogs(.1);
  assert.equal(frog.hp,54);assert.equal(swarm.flies,9);assert.ok(frog.stomach<=100);
});
test('ally caller intimidation reduces morale without an endless forced flee loop',()=>{
  const {game}=fixture(),caller=actor({id:'caller',role:'caller',roarCD:0}),enemy=actor({id:'enemy',team:'enemy0',x:4});
  game.frogs.push(caller,enemy);
  game.intimidate(caller);
  assert.ok(enemy.morale<100);assert.equal(enemy.fear||0,0);
});
test('a damaged enemy remains committed to its attacker beyond the initial detection circle',()=>{
  const {game,player}=fixture(),enemy=actor({id:'enemy',team:'enemy0',x:6});
  game.frogs.push(enemy);game.damage(enemy,10,player);player.x=-16;
  const intent=game.thinkFrog(enemy,[]);
  assert.equal(intent?.kind,'attack');assert.equal(intent?.target,player);
});

