import {updateCombatFeedback} from '../src/combat-feedback.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {actor,camp,fixture} from './game-fixture.mjs';
import {MOVEMENT} from '../src/player-rules.js';

const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const predator=(overrides={})=>actor({id:'boss',team:'predator',type:'heron',phase:'stalk',boss:true,scale:2.3,x:8,z:0,hp:1600,maxHp:1600,...overrides});

test('a bruiser physically catches up with a walking then sprinting player',()=>{
  const {game,player}=fixture();player.x=-50;player.yaw=Math.PI/2;
  const follower=actor({id:'bruiser',role:'bruiser',x:-70,brain:0});game.frogs.push(follower);
  let largestStep=0;
  for(let tick=0;tick<500;tick++){
    const before={x:follower.x,z:follower.z},speed=tick<300?MOVEMENT.walk:MOVEMENT.sprint;
    player.x+=speed*.05;game.elapsed+=.05;game.updateFrogs(.05);updateCombatFeedback(game,.05);
    largestStep=Math.max(largestStep,distance(before,follower));
  }
  assert.ok(distance(follower,player)<13,'the slow role stays within the travelling group after a sprint');
  assert.ok(largestStep<.7,'catch-up uses continuous movement under 14m/s, never a teleport');
  assert.ok(follower.x>120,'the follower crossed the creek rather than stopping at its original area');
});

test('garrison members do not occupy follow slots and very large squads remain nearby',()=>{
  const {game,player}=fixture(),home=camp({team:'ally',x:-70,z:0});game.camps.push(home);
  const guards=Array.from({length:80},(_,i)=>actor({id:`guard-${i}`,guard:true,order:'guard',home:home.id,x:-70}));
  const field=Array.from({length:90},(_,i)=>actor({id:`field-${i}`,x:-20,z:15}));game.frogs.push(...guards,...field);
  const first=game.thinkFrog(field[0],game.allies());
  assert.ok(Math.abs(distance(first.target,player)-2.8)<1e-8,'garrison count does not push the first follower away');
  for(const frog of field){const intent=game.thinkFrog(frog,game.allies());assert.equal(intent.formation,true);assert.ok(distance(intent.target,player)<=10.500001);}
});

test('a distant injured forager joins the active boss battle and reaches attack range',()=>{
  const {game,player}=fixture(),frog=actor({id:'forager',x:-75,hp:35,stomach:5,order:'forage',brain:0}),boss=predator({target:player});
  game.frogs.push(frog);game.predators.push(boss);game.hunt=boss;game.world.hotspots.push({id:'tempting-food',x:-75,z:1,flies:20,maxFlies:20});
  const intent=game.thinkFrog(frog,[frog]);assert.equal(intent.kind,'attack');assert.equal(intent.target,boss);
  const hits=[];game.damage=(target,amount,source)=>{hits.push({target,source});target.hp-=amount;};
  for(let tick=0;tick<260&&!hits.length;tick++){game.elapsed+=.05;game.updateFrogs(.05);updateCombatFeedback(game,.05);}
  assert.ok(hits.some(hit=>hit.target===boss&&hit.source===frog),'the distant ally actually fights the boss');
  assert.equal(game.world.hotspots[0].flies,20,'emergency support takes priority over the food detour');
});

test('an explicit boss order outranks an incidental nearby enemy',()=>{
  const {game}=fixture(),boss=predator({x:40}),frog=actor({id:'attacker',order:'attack',orderTarget:boss}),enemy=actor({id:'incidental',team:'enemy0',x:2});
  game.frogs.push(frog,enemy);game.predators.push(boss);
  assert.equal(game.thinkFrog(frog,[frog]).target,boss);
});

test('an active hunt interrupts a previous siege while an explicit predator focus still wins',()=>{
  const {game,player}=fixture(),base=camp({x:45}),boss=predator({target:player}),other=predator({id:'chosen-predator',type:'snake',x:30}),frog=actor({id:'siege-frog',order:'attack',orderTarget:base});
  game.camps.push(base);game.frogs.push(frog);game.predators.push(boss,other);game.hunt=boss;
  assert.equal(game.thinkFrog(frog,[frog]).target,boss,'the squad leaves a previous base attack to defend the player');
  frog.orderTarget=other;assert.equal(game.thinkFrog(frog,[frog]).target,other,'a deliberate predator focus is respected');
});

test('individual follow overrides another squads global attack target',()=>{
  const {game}=fixture(),target=camp({x:50}),frog=actor({id:'recalled',x:-5,order:'follow'});
  game.camps.push(target);game.frogs.push(frog);game.command='attack';game.targetCommand=target;
  const intent=game.thinkFrog(frog,[frog]);assert.equal(intent.kind,'move');assert.equal(intent.formation,true);assert.notEqual(intent.target,target);
});

test('followers leave stale remote skirmishes to rejoin the player',()=>{
  const {game,player}=fixture(),enemy=actor({id:'old-enemy',team:'enemy0',x:-48}),frog=actor({id:'follower',x:-50,combatTarget:enemy,combatUntil:2000});
  player.x=20;game.frogs.push(frog,enemy);
  const intent=game.thinkFrog(frog,[frog]);assert.equal(intent.formation,true);assert.equal(frog.combatTarget,null);assert.ok(distance(intent.target,player)<11);
});

test('a satiated forager returns despite the tiny hunger decay each frame',()=>{
  const {game}=fixture(),frog=actor({id:'fed',x:20,order:'forage',returnOrder:'follow',brain:0}),swarm={id:'swarm',x:20,z:0,flies:12,maxFlies:12};
  game.frogs.push(frog);game.world.hotspots.push(swarm);game.updateFrogs(.05);updateCombatFeedback(game,.05);
  assert.equal(frog.order,'follow');assert.equal(frog.intent.formation,true);assert.equal(swarm.flies,12);assert.equal(game.resources.food,100);
});

test('watchtower guards defend local raids instead of a remote player hunt',()=>{
  const {game,player}=fixture(),home=camp({id:'home',team:'ally',x:0,z:0,buildings:{watchtower:true}}),guard=actor({id:'guard',x:-4,guard:true,order:'guard',home:home.id}),raider=actor({id:'raider',team:'enemy0',x:24,raidTarget:home.id}),boss=predator({x:75,target:player});
  player.x=80;game.camps.push(home);game.frogs.push(guard,raider);game.predators.push(boss);game.hunt=boss;
  game.guardAssignment=()=>({camp:home,point:{x:-4,z:2},range:26,leash:29});
  assert.equal(game.thinkFrog(guard,[guard]).target,raider);
  raider.x=40;guard.combatTarget=raider;guard.combatUntil=2000;
  const returning=game.thinkFrog(guard,[guard]);assert.equal(returning.kind,'move');assert.deepEqual(returning.target,{x:-4,z:2});assert.equal(guard.combatTarget,null);
});

test('a guard whose camp is gone rejoins the travelling group',()=>{
  const {game}=fixture(),home=camp({team:'ally',destroyed:true}),guard=actor({id:'orphan',guard:true,order:'guard',home:home.id,x:-30});
  game.camps.push(home);game.frogs.push(guard);
  const intent=game.thinkFrog(guard,[guard]);assert.equal(guard.guard,false);assert.equal(guard.order,'follow');assert.equal(intent.formation,true);
});

test('automatic support respects a predator successfully frightened away',()=>{
  const {game,player}=fixture(),boss=predator({phase:'flee',target:null}),frog=actor({id:'follower',combatTarget:boss,combatUntil:2000});
  game.hunt=boss;game.predators.push(boss);game.frogs.push(frog);
  const intent=game.thinkFrog(frog,[frog]);assert.equal(intent.formation,true);assert.equal(frog.combatTarget,null);
  frog.order='attack';frog.orderTarget=boss;assert.equal(game.thinkFrog(frog,[frog]).target,boss,'an explicit player order may pursue the retreat');
});
