import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,step,hit,canDetect,RULES} from '../src/arcade-model.js';
import {BOT_COMBAT} from '../src/arcade-bot-combat.js';
import {BASES} from '../src/arcade-bases.js';

const DT=1/60;
const isShot=(state,actor)=>state.events.some(event=>event.type==='shot'&&event.id===actor.id);
function arena(seed=731,range=10){
 const state=newRound(seed);state.phase='battle';state.intro=0;
 state.flies.forEach(fly=>fly.wait=999);
 const [player,bot,other]=state.actors;
 Object.assign(other,{ko:true,respawnTime:999});
 Object.assign(player,{x:0,z:8});
 // Keep the shooter in a clear lane. Its real intent, timers, shot creation,
 // projectile flight and body collisions still run through step().
 Object.assign(bot,{x:0,z:8-range,ammo:60,refilling:false,idle:999,brain:999,decision:0,machineTimer:999,kickCooldown:999});
 assert.equal(canDetect(bot,player),true);
 return {state,player,bot,other};
}
function until(state,predicate,{input={},dt=DT,seconds=5}={}){
 for(let frame=0;frame<Math.ceil(seconds/dt);frame++){
  step(state,typeof input==='function'?input():input,dt);
  if(predicate())return state.time;
 }
 assert.fail(`condition was not reached within ${seconds} simulation seconds`);
}
function firstShotTrial(seed,range,dodge=false){
 const {state,player,bot}=arena(seed,range);
 let cueTime=null,shotTime=null,hitPlayer=false,launch=null;
 for(let frame=0;frame<240;frame++){
  const sidestep=dodge&&cueTime!==null&&state.time-cueTime>=.1;
  step(state,sidestep?{mx:1,mz:0,aiming:false}:{});
  if(bot.aiCharging&&cueTime===null)cueTime=state.time;
  if(isShot(state,bot)&&shotTime===null){
   shotTime=state.time;
   const bullet=state.bullets.find(b=>b.owner===bot.id);
   launch=bullet&&[bullet.dx,bullet.dy,bullet.dz];
  }
  hitPlayer ||= state.events.some(event=>event.type==='hit'&&event.id===player.id&&event.owner===bot.id);
  // Stop at the first projectile's real collision/expiry, before another shot
  // can bias either the stationary or moving target's result.
  if(shotTime!==null&&!state.bullets.some(b=>b.owner===bot.id))break;
 }
 assert.notEqual(shotTime,null,'an eligible bot must eventually shoot');
 assert.notEqual(cueTime,null,'every first shot has a visible preparation');
 return {hit:hitPlayer,cueTime,shotTime,launch,x:player.x};
}

test('acquiring a target takes reaction time followed by a readable windup',()=>{
 const {state,bot}=arena();step(state);
 assert.equal(bot.aiTargetId,'player');assert.ok(bot.aiReaction>=BOT_COMBAT.reactionMin);
 assert.equal(bot.aiCharging,false);assert.equal(bot.aimWindup,0);assert.equal(isShot(state,bot),false);
 const cue=until(state,()=>bot.aiCharging);
 assert.ok(cue>=BOT_COMBAT.reactionMin);
 assert.ok(cue<=BOT_COMBAT.reactionMax+3*DT);
 const shot=until(state,()=>isShot(state,bot));
 assert.ok(shot-cue>=BOT_COMBAT.windupMin-DT);
 assert.ok(shot-cue<=BOT_COMBAT.windupMax+2*DT);
 assert.ok(shot>=BOT_COMBAT.reactionMin+BOT_COMBAT.windupMin);
});

test('reaction, windup and strafe decisions use simulation seconds at 30, 60 and 120 Hz',()=>{
 const observations=[];
 for(const dt of [1/30,1/60,1/120]){
  const {state,bot}=arena();bot.brain=.15;let decisionTime=null,cueTime=null;
  const shotTime=until(state,()=>{
   if(decisionTime===null&&bot.brain>.5)decisionTime=state.time;
   if(cueTime===null&&bot.aiCharging)cueTime=state.time;
   return isShot(state,bot);
  },{dt});
  assert.ok(decisionTime>=.15-1e-8&&decisionTime<=.15+dt+1e-8,`strafe decision at ${decisionTime}s with dt ${dt}`);
  assert.ok(cueTime>=BOT_COMBAT.reactionMin);
  assert.ok(shotTime>=BOT_COMBAT.reactionMin+BOT_COMBAT.windupMin);
  observations.push(shotTime);
 }
 assert.ok(Math.max(...observations)-Math.min(...observations)<.11,'frame quantization must not become a different reaction speed');
});

test('a moving bot compensates for its own hop while keeping the original target point frozen',()=>{
 const {state,player,bot}=arena();Object.assign(player,{z:10});Object.assign(bot,{z:0,idle:0,decision:1});until(state,()=>bot.aiCharging);
 const held={...bot.aiAimPoint},direction=[bot.aiAimX,bot.aiAimY,bot.aiAimZ],startX=player.x,shooterStart={x:bot.x,z:bot.z};
 for(let frame=0;frame<8;frame++){
  step(state,{mx:1,mz:0,aiming:false});
  assert.deepEqual(bot.aiAimPoint,held,'neither horizontal motion nor target height updates the snapshot');
  assert.equal(isShot(state,bot),false);
 }
 assert.ok(player.x>startX+.5);assert.ok(player.height>0,'the dodge includes a real hop, not a teleported target');
 assert.ok(Math.hypot(bot.x-shooterStart.x,bot.z-shooterStart.z)>.2,'the shooter really strafes during preparation');
 assert.ok(Math.hypot(bot.aiAimX-direction[0],bot.aiAimY-direction[1],bot.aiAimZ-direction[2])>.01,'only the shooter movement changes the direction to the held point');
 until(state,()=>isShot(state,bot),{input:{mx:1,mz:0,aiming:false}});
 const bullet=state.bullets.find(b=>b.owner===bot.id);assert.ok(bullet);
 assert.deepEqual(bot.aiAimPoint,held);
 const dx=held.x-bullet.x,dy=held.y-bullet.y,dz=held.z-bullet.z;
 const cross=Math.hypot(dy*bullet.dz-dz*bullet.dy,dz*bullet.dx-dx*bullet.dz,dx*bullet.dy-dy*bullet.dx);
 assert.ok(cross<1e-9,'the actual emitted ray passes through the frozen 3D point from its new origin');
});

test('two deliberate shots are followed by a longer rest before another burst',()=>{
 const {state,bot}=arena(),shots=[];
 until(state,()=>{if(isShot(state,bot))shots.push(state.time);return shots.length===6;},{seconds:12});
 for(let index=1;index<shots.length;index++){
  const gap=shots[index]-shots[index-1],betweenBursts=index%2===0;
  const minimum=(betweenBursts?BOT_COMBAT.burstRestMin:BOT_COMBAT.shotRecoveryMin)+BOT_COMBAT.windupMin;
  const maximum=(betweenBursts?BOT_COMBAT.burstRestMax:BOT_COMBAT.shotRecoveryMax)+BOT_COMBAT.windupMax;
  assert.ok(gap>=minimum-DT,`shot ${index+1} came too early after ${gap}s`);
  assert.ok(gap<=maximum+3*DT,`an eligible bot stalled for ${gap}s`);
 }
});

test('losing real rock line of sight cancels a windup and reacquisition needs a fresh reaction',()=>{
 const {state,player,bot}=arena();until(state,()=>bot.aiCharging);
 Object.assign(player,{x:-10,z:3});assert.equal(canDetect(bot,player),false);
 step(state);assert.equal(bot.aiCharging,false);assert.equal(bot.aiTargetId,null);assert.equal(isShot(state,bot),false);
 Object.assign(player,{x:0,z:8});const returned=state.time;step(state);
 assert.equal(bot.aiTargetId,player.id);assert.ok(bot.aiReaction>0);assert.equal(bot.aiCharging,false);
 const next=until(state,()=>isShot(state,bot));
 assert.ok(next-returned>=BOT_COMBAT.reactionMin+BOT_COMBAT.windupMin);
});

test('line-of-sight flicker cannot erase the rest after a burst',()=>{
 const {state,player,bot}=arena();let shots=0;
 const lastShot=until(state,()=>{if(isShot(state,bot))shots++;return shots===2;});
 const rest=bot.aiShotReady;assert.ok(rest>=BOT_COMBAT.burstRestMin);
 Object.assign(player,{x:-10,z:3});step(state);
 assert.equal(bot.aiTargetId,null);assert.ok(bot.aiShotReady>=rest-DT-1e-8);
 Object.assign(player,{x:0,z:8});step(state);
 assert.ok(bot.aiReaction>0);assert.ok(bot.aiShotReady>=rest-2*DT-1e-8);
 const next=until(state,()=>isShot(state,bot));
 assert.ok(next-lastShot>=BOT_COMBAT.burstRestMin+BOT_COMBAT.windupMin);
});

test('bots retain a visible target and require a new reaction when they must switch',()=>{
 const {state,player,bot,other}=arena();until(state,()=>bot.aiCharging);
 Object.assign(other,{ko:false,x:4,z:-2,ammo:0,dizzyTime:999,idle:999});
 assert.equal(canDetect(bot,other),true);step(state);
 assert.equal(bot.aiTargetId,player.id,'a nearer rival does not steal an already committed aim');
 Object.assign(player,{ko:true,respawnTime:999});const switched=state.time;step(state);
 assert.equal(bot.aiTargetId,other.id);assert.ok(bot.aiReaction>0);assert.equal(bot.aiCharging,false);
 assert.equal(isShot(state,bot),false);
 const next=until(state,()=>isShot(state,bot));
 assert.ok(next-switched>=BOT_COMBAT.reactionMin+BOT_COMBAT.windupMin);
});

test('hit, dizzy and knock-up interruptions cannot queue an immediate recovery shot',()=>{
 for(const damage of [{damage:1},{damage:6},{damage:1,lift:1,liftDuration:.6}]){
  const {state,bot}=arena();until(state,()=>bot.aiCharging);
  const interrupted=state.time;assert.equal(hit(state,bot,{owner:'player',dx:0,dz:1,force:0,...damage}),true);
  const disabledFor=Math.max(bot.hit,bot.dizzyTime,bot.knockUp);
  assert.equal(bot.aiCharging,false);assert.equal(bot.aiTargetId,null);
  const next=until(state,()=>{
   if(bot.hit>0||bot.dizzyTime>0||bot.knockUp>0){
    assert.equal(bot.aiTargetId,null);assert.equal(bot.aiCharging,false);assert.equal(isShot(state,bot),false);
   }
   return isShot(state,bot);
  },{seconds:8});
  assert.ok(next-interrupted>=disabledFor+BOT_COMBAT.reactionMin+BOT_COMBAT.windupMin-DT);
 }
});

test('refilling bots can finish a deliberate defensive shot at their own storage',()=>{
 const {state,player,bot}=arena(),home=BASES.find(base=>base.owner===bot.id);
 Object.assign(bot,home.stock,{ammo:12,refilling:true});
 Object.assign(player,{x:home.stock.x+4,z:home.stock.z,ammo:0});
 assert.equal(canDetect(bot,player),true);
 until(state,()=>isShot(state,bot),{seconds:2});
 assert.equal(bot.refilling,true);assert.ok(bot.ammo>12,'collection continues while defending');
});

test('the same seed and input reproduce the real first-shot timing and direction',()=>{
 for(const seed of [731,8650,48245])for(const dodge of [false,true]){
  assert.deepEqual(firstShotTrial(seed,10,dodge),firstShotTrial(seed,10,dodge));
 }
});

test('real projectiles remain dangerous nearby, miss at range, and reward reacting to the cue',()=>{
 const count=96,results=[];
 for(const range of [5,10,15]){
  let stationary=0,dodging=0;
  for(let index=1;index<=count;index++){
   const seed=731+index*7919;
   stationary+=Number(firstShotTrial(seed,range).hit);
   dodging+=Number(firstShotTrial(seed,range,true).hit);
  }
  results.push({range,stationary,dodging});
 }
 const [close,middle,far]=results;
 assert.ok(close.stationary>=count*.75,'close bots must still pose a real threat');
 assert.ok(middle.stationary>=count*.25&&middle.stationary<=count*.75,JSON.stringify(results));
 assert.ok(far.stationary>=count*.1&&far.stationary<=count*.55,JSON.stringify(results));
 assert.ok(close.stationary>middle.stationary&&middle.stationary>far.stationary,'actual body hit probability decreases with range');
 for(const result of results){
  assert.ok(result.dodging<=count*.15,JSON.stringify(result));
  assert.ok(result.dodging<result.stationary*.4,'a .10s response to the cue must materially improve survival');
 }
});

test('acquisition and aiming alone preserve the separate respawn shield',()=>{
 const {state,bot}=arena();bot.spawnShield=RULES.respawnProtectionSeconds;
 for(let frame=0;frame<15;frame++){
  step(state);assert.equal(isShot(state,bot),false);
  assert.ok(Math.abs(bot.spawnShield-(RULES.respawnProtectionSeconds-state.time))<1e-8);
 }
 assert.ok(bot.spawnShield>.7);
});
