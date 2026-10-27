import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,resolveActorContacts,kickTarget,kick,step,setProjectileWorld,RULES} from '../src/arcade-model.js';
import {FROG_BODY} from '../src/arcade-actor-bounds.js';
import {BASES,WALLS,resolveArenaMove,insideHome} from '../src/arcade-bases.js';
import {rectangleClearance} from '../src/arcade-collision.js';

const near=(a,b,tolerance=1e-7)=>assert.ok(Math.abs(a-b)<tolerance,`${a} should equal ${b}`);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const bodyDiameter=FROG_BODY.movementRadius*2;
function arena(){
 const state=newRound(731);state.phase='battle';state.intro=0;state.flies.forEach(f=>f.wait=999);
 for(const actor of state.actors)Object.assign(actor,{ko:true,respawnTime:999,machineTimer:999,idle:999,shot:999,tongue:999,kickCooldown:999});
 const player=state.actors[0],opponent=state.actors[1];
 Object.assign(player,{ko:false,x:0,z:4,shot:0,kickCooldown:0,idle:0});
 Object.assign(opponent,{ko:false,x:.4,z:4});
 return {state,player,opponent};
}

test('overlapping active bodies separate symmetrically and remain stable at contact',()=>{
 const {state,player,opponent}=arena(),center=(player.x+opponent.x)/2;
 resolveActorContacts(state);
 assert.ok(distance(player,opponent)>=bodyDiameter-1e-5);
 near((player.x+opponent.x)/2,center);near(player.z,4);near(opponent.z,4);
 const settled=[player.x,player.z,opponent.x,opponent.z];
 for(let i=0;i<30;i++)resolveActorContacts(state);
 assert.deepEqual([player.x,player.z,opponent.x,opponent.z],settled,'resting contacts do not jitter or accumulate drift');
});

test('coincident bodies have a deterministic escape direction without NaNs',()=>{
 const {state,player,opponent}=arena();opponent.x=player.x;
 resolveActorContacts(state);
 assert.ok([player.x,player.z,opponent.x,opponent.z].every(Number.isFinite));
 assert.ok(distance(player,opponent)>=bodyDiameter-1e-5);
 near((player.x+opponent.x)/2,0);near(player.z,opponent.z);
});

test('a body backed against a real house wall stays outside the wall while the other takes the separation',()=>{
 const {state,player,opponent}=arena(),home=BASES[0],wall=WALLS.find(w=>w.id===`${home.id}-east-whole`);
 Object.assign(player,{x:wall.x-wall.hw-FROG_BODY.movementRadius-.01,z:home.z});
 Object.assign(opponent,{x:player.x-.4,z:player.z});
 const originalX=player.x;resolveActorContacts(state);
 assert.ok(distance(player,opponent)>=bodyDiameter-1e-5);
 assert.ok(player.x-originalX<.011,'the backed-up frog has only its real clearance available');
 for(const actor of [player,opponent]){
  assert.ok(rectangleClearance(actor,wall)>=FROG_BODY.movementRadius-1e-5);
  const safe=resolveArenaMove(actor,0,0);near(actor.x,safe.x);near(actor.z,safe.z);
  assert.ok(insideHome(home,actor,FROG_BODY.movementRadius),'neither neighbour is pushed through the enclosure');
 }
});

test('separated vertical bodies and knocked-out bodies cannot create invisible horizontal blockers',()=>{
 const {state,player,opponent}=arena();opponent.height=1.5;
 const before=[player.x,opponent.x];resolveActorContacts(state);assert.deepEqual([player.x,opponent.x],before);
 opponent.height=0;opponent.ko=true;resolveActorContacts(state);assert.deepEqual([player.x,opponent.x],before);
 opponent.ko=false;opponent.eliminated=true;resolveActorContacts(state);assert.deepEqual([player.x,opponent.x],before);
 opponent.eliminated=false;opponent.height=.67;resolveActorContacts(state);
 assert.ok(distance(player,opponent)>=bodyDiameter-1e-5,'ordinary low hops still overlap a standing body');
});

test('a kick reaches a nearby body but cannot select a long-range or vertically separated target',()=>{
 const {state,player,opponent}=arena();Object.assign(opponent,{x:0,z:player.z-1.6});
 assert.equal(kickTarget(state,player),opponent);
 opponent.z=player.z-2.5;assert.equal(kickTarget(state,player),null,'the old distant kick volume is gone');
 assert.equal(kick(state,player),false);assert.equal(player.kick,0);
 opponent.z=player.z-1.6;opponent.height=1.3;assert.equal(kickTarget(state,player),null);
 opponent.height=.67;assert.equal(kickTarget(state,player),opponent,'a genuinely overlapping low hop remains reachable');
});

test('a kick checks height again at impact so an opponent can escape upward during the windup',()=>{
 const {state,player,opponent}=arena();Object.assign(opponent,{x:0,z:2.4,dizzyTime:99});
 assert.equal(kick(state,player),true);opponent.height=2;
 let impacts=0;for(let i=0;i<14;i++){step(state,{});impacts+=state.events.filter(e=>e.type==='hit'&&e.id===opponent.id).length;}
 assert.equal(player.kickPending,false);assert.equal(impacts,0);assert.equal(opponent.finishHits,0);
});

test('a respawn shield rejects both the damage and impulse of a close kick',()=>{
 const {state,player,opponent}=arena();Object.assign(opponent,{x:0,z:2.4,spawnShield:1});
 const position={x:opponent.x,z:opponent.z};assert.equal(kick(state,player),true);
 let impacts=0;for(let i=0;i<14;i++){step(state,{});impacts+=state.events.filter(e=>e.type==='hit'&&e.id===opponent.id).length;}
 assert.equal(player.kickPending,false);assert.ok(opponent.spawnShield>0);
 assert.equal(impacts,0);assert.equal(opponent.dizzy,0);assert.equal(opponent.finishHits,0);
 assert.equal(opponent.impulseX,0);assert.equal(opponent.impulseZ,0);
 assert.deepEqual({x:opponent.x,z:opponent.z},position,'a rejected hit cannot secretly push the protected body');
});

test('respawning beside an occupied home spawn cannot move an invader or cancel its valid channel',()=>{
 for(const defenderId of ['rival-1','rival-2']){
  const {state,player}=arena(),home=BASES.find(b=>b.owner===defenderId),defender=state.actors.find(a=>a.id===defenderId),base=state.bases.find(b=>b.owner===defenderId);
  for(const actor of state.actors.slice(1))Object.assign(actor,{ko:true,respawnTime:999});
  Object.assign(player,home.spawn,{hop:0,shot:0,kick:0,sabotageRecovery:0});
  Object.assign(defender,{ko:true,respawnTime:.001,impulseX:0,impulseZ:0});
  const position={x:player.x,z:player.z};step(state,{sabotage:true});
  assert.equal(defender.ko,false);assert.equal(defender.spawnShield,RULES.respawnProtectionSeconds);
  assert.deepEqual({x:player.x,z:player.z},position,'respawn never relocates the attacker');
  assert.ok(distance(player,defender)>=bodyDiameter+.029);
  assert.ok(insideHome(home,defender,FROG_BODY.movementRadius));
  assert.equal(base.attackerId,player.id);assert.ok(base.progress>0,'only real movement or combat can break this in-range channel');
 }
});

test('AI flies use real upward trajectories and can hit a visible opponent on higher ground',()=>{
 const {state,player,opponent}=arena();Object.assign(player,{x:0,z:5,ammo:0});
 Object.assign(opponent,{x:0,z:0,ammo:60,shot:0,kickCooldown:0,refilling:false,idle:999,aiCharging:false,aiShotReady:0});
 // The gradual slope leaves the body visible without an intervening cliff.
 setProjectileWorld(state,{ground:(x,z)=>z*.3});
 let rising=false,hit=false;
 for(let i=0;i<120&&!hit;i++){
  step(state,{});
  rising||=state.bullets.some(b=>b.owner===opponent.id&&b.dy>.2&&!b.followGround);
  hit=state.events.some(e=>e.type==='hit'&&e.id===player.id&&e.owner===opponent.id);
 }
 assert.equal(rising,true,'AI must pitch a physical shot, rather than rely on terrain-following flight');
 assert.equal(hit,true,'proper aim reaches the raised visible body');
});
