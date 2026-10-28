import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,kickTarget,canKick,kick,step,setProjectileWorld,RULES} from '../src/arcade-model.js';
import {WALLS} from '../src/arcade-bases.js';
import {FROG_BODY} from '../src/arcade-actor-bounds.js';

function arena(){
 const state=newRound(731);state.phase='battle';state.intro=0;state.flies.forEach(f=>f.wait=999);
 const [player,nearer,target]=state.actors;
 Object.assign(player,{x:0,z:4,ammo:0,tongue:999});
 Object.assign(nearer,{x:1.4,z:4,dizzy:RULES.dizzyHits,dizzyTime:RULES.dizzySeconds});
 Object.assign(target,{x:-1.8,z:4,dizzy:RULES.dizzyHits,dizzyTime:RULES.dizzySeconds});
 for(const rival of [nearer,target])Object.assign(rival,{idle:999,shot:999,tongue:999,kickCooldown:999,machineTimer:999});
 return {state,player,nearer,target};
}
function frames(state,count=14,input={}){
 const events=[];for(let i=0;i<count;i++){step(state,input);events.push(...state.events.map(e=>({...e})));}return events;
}

test('an explicit kick chooses the selected body while an omitted target keeps nearest selection',()=>{
 const {state,player,nearer,target}=arena();
 assert.equal(kickTarget(state,player),nearer);assert.equal(kickTarget(state,player,target.id),target);
 const before=JSON.stringify(state);assert.equal(canKick(state,player,target.id),true);assert.equal(JSON.stringify(state),before,'readiness is a pure query');
 assert.equal(kick(state,player,target.id),true);assert.equal(player.kickId,target.id);assert.equal(player.ammo,0);
 assert.equal(target.finishHits,0,'starting an animation is not an instant hit');
 const events=frames(state);assert.equal(target.finishHits,1);assert.equal(nearer.finishHits,0);assert.equal(target.ko,false);
 assert.equal(events.filter(e=>e.type==='hit'&&e.id===target.id).length,1);assert.equal(events.some(e=>e.type==='hit'&&e.id===nearer.id),false);
 assert.equal(canKick(state,player,target.id),false,'the normal cooldown remains in force');
});

test('invalid, stale, self, KO and eliminated target IDs cannot fall back to another opponent',()=>{
 for(const choice of ['missing',null,0,'self','ko','eliminated']){
  const {state,player,nearer,target}=arena();let id=choice;
  if(choice==='self')id=player.id;
  if(choice==='ko'){id=target.id;target.ko=true;}
  if(choice==='eliminated'){id=target.id;target.eliminated=true;}
  const before=JSON.stringify(state);assert.equal(kickTarget(state,player,id),null);assert.equal(canKick(state,player,id),false);assert.equal(kick(state,player,id),false);
  assert.equal(JSON.stringify(state),before,'rejected selection cannot spend cooldown, aim or alter either body');assert.equal(kickTarget(state,player),nearer);
 }
 const {state,player}=arena();assert.equal(kickTarget(state,{...player},player.id),null,'identity is by actor ID, even for a copied preview actor');
});

test('shared readiness rejects incapacitation, an active attack, mounting and non-playing phases',()=>{
 for(const change of [{ko:true},{eliminated:true},{dizzyTime:.1},{hit:.1},{catapultId:'catapult-player'},{knockUp:.1},{kick:.1},{kickCooldown:.1}]){
  const {state,player,target}=arena();Object.assign(player,change);
  assert.equal(canKick(state,player,target.id),false);assert.equal(kick(state,player,target.id),false);
 }
 for(const change of [{phase:'countdown'},{status:'won'},{status:'lost'}]){
  const {state,player,target}=arena();Object.assign(state,change);
  assert.equal(canKick(state,player,target.id),false);assert.equal(kick(state,player,target.id),false);
 }
});

test('a selected body must satisfy distance, height and wall clearance before starting',()=>{
 for(const mode of ['distance','height','ground','wall']){
  const {state,player,nearer,target}=arena();
  if(mode==='distance')target.x=-RULES.kickRange-.01;
  if(mode==='height')target.height=FROG_BODY.height+.11;
  if(mode==='ground')setProjectileWorld(state,{ground:x=>x<0?1.2:0});
  if(mode==='wall'){
   const wall=WALLS.find(w=>w.id==='base-player-east-whole');
   Object.assign(player,{x:wall.x-wall.hw-FROG_BODY.movementRadius-.02,z:wall.z});
   Object.assign(target,{x:wall.x+wall.hw+FROG_BODY.movementRadius+.02,z:wall.z});
   Object.assign(nearer,{x:player.x-1.7,z:player.z});
   assert.ok(Math.hypot(target.x-player.x,target.z-player.z)<RULES.kickRange,'the wall, not distance, prevents this kick');
  }
  assert.equal(canKick(state,player,target.id),false,mode);assert.equal(kick(state,player,target.id),false,mode);
  assert.equal(player.kick,0);assert.equal(player.kickCooldown,0);assert.equal(kickTarget(state,player),nearer,'a rejected target never borrows a reachable neighbour');
 }
});

test('impact keeps the selected ID and rechecks distance, height and cover during windup',()=>{
 for(const mode of ['distance','height','wall']){
  const {state,player,nearer,target}=arena();assert.equal(kick(state,player,target.id),true);
  if(mode==='distance')target.x=-RULES.kickRange-.26;
  if(mode==='height')target.height=1.2;
  if(mode==='wall'){
   const wall=WALLS.find(w=>w.id==='base-player-east-whole');
   Object.assign(player,{x:wall.x-wall.hw-FROG_BODY.movementRadius-.02,z:wall.z});
   Object.assign(target,{x:wall.x+wall.hw+FROG_BODY.movementRadius+.02,z:wall.z});
   Object.assign(nearer,{x:player.x-1.7,z:player.z});
  }
  const events=frames(state);assert.equal(player.kickPending,false);assert.equal(target.finishHits,0,mode);assert.equal(nearer.finishHits,0,mode);
  assert.equal(events.some(e=>e.type==='hit'),false,mode);
 }
});

test('one targeted kick advances one follow-up hit and only the third one completes KO',()=>{
 for(const initial of [0,1,2]){
  const {state,player,target}=arena();target.finishHits=initial;
  assert.equal(kick(state,player,target.id),true);frames(state);
  assert.equal(target.finishHits,initial+1);assert.equal(target.ko,initial===RULES.finishHits-1);
  assert.equal(state.stats.kos,initial===RULES.finishHits-1?1:0);
 }
});

test('recovery before contact cancels the KO opportunity instead of executing a recovered target',()=>{
 const {state,player,target}=arena();target.finishHits=2;target.dizzyTime=.05;
 assert.equal(kick(state,player,target.id),true);const events=frames(state);
 assert.equal(target.dizzyTime,0);assert.equal(target.finishHits,0);assert.equal(target.ko,false);
 assert.equal(events.some(e=>e.type==='recover'&&e.id===target.id),true);assert.equal(events.some(e=>e.type==='ko'),false);
});

test('spawn protection gained during targeted windup rejects both hit progress and impulse',()=>{
 const {state,player,target}=arena(),position={x:target.x,z:target.z};
 assert.equal(kick(state,player,target.id),true);target.spawnShield=1;
 const events=frames(state);assert.equal(player.kickPending,false);assert.ok(target.spawnShield>0);
 assert.equal(target.finishHits,0);assert.equal(target.impulseX,0);assert.equal(target.impulseZ,0);assert.deepEqual({x:target.x,z:target.z},position);
 assert.equal(events.some(e=>e.type==='hit'&&e.id===target.id),false);
});

test('simulation input routes the selected ID once and never treats ID alone as attack intent',()=>{
 const {state,player,nearer,target}=arena();
 step(state,{kickTargetId:target.id});assert.equal(player.kick,0);
 step(state,{kick:true,kickTargetId:'missing'});assert.equal(player.kick,0);assert.equal(player.kickCooldown,0);
 step(state,{kick:true,kickTargetId:target.id});assert.equal(player.kickId,target.id);
 const events=frames(state,90);assert.equal(events.filter(e=>e.type==='hit'&&e.id===target.id).length,1);assert.equal(target.finishHits,1);assert.equal(nearer.finishHits,0);
 assert.equal(player.kick,0);assert.equal(player.kickCooldown,0,'consumed UI intent cannot become held attack');
});
