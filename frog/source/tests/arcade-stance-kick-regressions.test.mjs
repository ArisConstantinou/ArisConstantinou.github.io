import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {newRound,step,shoot,kick,canKick,kickAvailability,saveRound,loadRound,RULES} from '../src/arcade-model.js';
import {actorVisualFacing} from '../src/arcade-facing.js';
import {actorBodyYaw} from '../src/arcade-actor-bounds.js';
import {WALLS} from '../src/arcade-bases.js';

const bundle=await build({entryPoints:[fileURLToPath(new URL('../src/arcade-context-actions.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {contextualKickState}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const yawClose=(actual,expected)=>assert.ok(Math.abs(Math.atan2(Math.sin(actual-expected),Math.cos(actual-expected)))<1e-9,`${actual} should equal ${expected}`);
function arena(){
 const state=newRound(731);state.phase='battle';state.intro=0;state.guards=[];state.flies.forEach(f=>f.wait=999);
 const [player,target,other]=state.actors;Object.assign(player,{x:0,z:4,face:0,aimX:1,aimZ:0,tongue:999});
 Object.assign(target,{x:2.25,z:4,dizzy:RULES.dizzyHits,dizzyTime:RULES.dizzySeconds,idle:999,shot:999,tongue:999,kickCooldown:999,machineTimer:999});
 Object.assign(other,{ko:true,eliminated:true});return {state,player,target};
}
function frames(state,count,input={}){
 const events=[];for(let i=0;i<count;i++){step(state,input);events.push(...state.events.map(event=>({...event})));}return events;
}

test('a real shot retains its facing through release, strafing, landing and save/resume',()=>{
 const {state,player}=arena();state.actors[1].eliminated=true;
 assert.equal(shoot(state,player),true);yawClose(actorVisualFacing(player).yaw,Math.PI/2);
 frames(state,20);assert.equal(player.shot,0);yawClose(actorVisualFacing(player).yaw,Math.PI/2);
 frames(state,18,{mx:-1,mz:0});assert.ok(player.x<0);yawClose(player.face,-Math.PI/2);yawClose(actorVisualFacing(player).yaw,Math.PI/2);
 frames(state,24);assert.equal(player.height,0);yawClose(actorVisualFacing(player).yaw,Math.PI/2);yawClose(actorBodyYaw(player),Math.PI/2);
 const restored=loadRound(saveRound(state));assert.ok(restored);yawClose(actorVisualFacing(restored.actors[0]).yaw,Math.PI/2);assert.equal(restored.actors[0].poseAiming,false);
});

test('deliberate pointer or locked aim changes stance without firing; passive camera orbit does not',()=>{
 const {state,player}=arena();state.actors[1].eliminated=true;
 step(state,{aiming:true,faceAim:true,ax:-1,az:0,mx:0,mz:1});
 yawClose(actorVisualFacing(player).yaw,-Math.PI/2);assert.equal(player.poseAiming,true);assert.equal(state.stats.shots,0);
 step(state,{aiming:true,ax:0,az:-1,mx:1,mz:0});
 yawClose(actorVisualFacing(player).yaw,-Math.PI/2);assert.equal(player.poseAiming,false);
 step(state,{aiming:true,faceAim:true,ax:0,az:-1});yawClose(actorVisualFacing(player).yaw,Math.PI);
 step(state,{});yawClose(actorVisualFacing(player).yaw,Math.PI);
});

test('held fire keeps the final deliberate bearing even with empty ammunition',()=>{
 const {state,player}=arena();player.ammo=0;
 step(state,{fire:true,aiming:true,ax:0,az:-1});assert.equal(state.stats.shots,0);yawClose(actorVisualFacing(player).yaw,Math.PI);
 step(state,{mx:1,mz:0});yawClose(actorVisualFacing(player).yaw,Math.PI);
});

test('legacy saves initialize without a spurious stance and malformed stored yaw is rejected',()=>{
 const {state}=arena();const saved=JSON.parse(saveRound(state));
 delete saved.actors[0].poseAimYaw;let restored=loadRound(JSON.stringify(saved));assert.equal(restored.actors[0].poseAimYaw,null);
 saved.actors[0].poseAimYaw='3.14';restored=loadRound(JSON.stringify(saved));assert.equal(restored.actors[0].poseAimYaw,null);
 saved.actors[0].poseAimYaw=123456;restored=loadRound(JSON.stringify(saved));assert.ok(Math.abs(restored.actors[0].poseAimYaw)<=Math.PI);
});

test('the same nearby target is ready in Q and the HUD from front, sides and behind',()=>{
 for(const [dx,dz] of [[2.3,0],[-2.3,0],[0,2.3],[0,-2.3]]){
  const {state,player,target}=arena();Object.assign(target,{x:player.x+dx,z:player.z+dz,invuln:.12});
  assert.equal(kickAvailability(state,player,target.id).state,'ready');assert.equal(canKick(state,player,target.id),true);
  assert.equal(contextualKickState(state,player,target).state,'ready');assert.equal(kick(state,player,target.id),true);
  yawClose(actorVisualFacing(player).yaw,Math.atan2(dx,dz));
 }
});

test('a new fly impact does not gray out or consume a kick, and delayed contact happens once',()=>{
 const {state,player,target}=arena();target.invuln=.31;
 assert.equal(contextualKickState(state,player,target).state,'ready');assert.equal(kick(state,player,target.id),true);
 const before=frames(state,14);assert.equal(target.finishHits,0);assert.equal(player.kickPending,true);assert.equal(before.some(event=>event.type==='hit'),false);
 const after=frames(state,30);assert.equal(target.finishHits,1);assert.equal(player.kickPending,false);
 assert.equal(after.filter(event=>event.type==='hit'&&event.id===target.id).length,1);assert.equal(target.ko,false);
});

test('delayed kick contact cancels if target leaves reach, crosses a wall or gains spawn protection',()=>{
 for(const mode of ['range','wall','shield','height']){
  const {state,player,target}=arena();target.invuln=.31;assert.equal(kick(state,player,target.id),true);frames(state,14);assert.equal(player.kickPending,true);
  if(mode==='range')target.x=player.x+RULES.kickRange+.3;
  if(mode==='height')target.height=1.5;
  if(mode==='shield')target.spawnShield=1;
  if(mode==='wall'){
   const wall=WALLS.find(value=>value.id==='base-player-east-whole');
   Object.assign(player,{x:wall.x-.9,z:wall.z});Object.assign(target,{x:wall.x+.9,z:wall.z});
  }
  const events=frames(state,30);assert.equal(target.finishHits,0,mode);assert.equal(player.kickPending,false,mode);assert.equal(events.some(event=>event.type==='hit'),false,mode);
 }
});

test('Q takes priority over held fire and keeps its selected body facing during the strike',()=>{
 const {state,player,target}=arena();target.x=1.8;const ammo=player.ammo;
 step(state,{kick:true,kickTargetId:target.id,fire:true,aiming:true,faceAim:true,ax:-1,az:0});
 assert.equal(player.kickId,target.id);assert.equal(state.stats.shots,0);assert.equal(player.ammo,ammo);yawClose(actorVisualFacing(player).yaw,Math.PI/2);
 frames(state,14,{fire:true,aiming:true,faceAim:true,ax:-1,az:0});assert.equal(state.stats.shots,0);assert.equal(target.finishHits,1);yawClose(actorVisualFacing(player).yaw,Math.PI/2);
});

test('ordinary cooldown and clear obstruction explanations match the same model query',()=>{
 for(const mode of ['range','height','cooldown','shield','hit']){
  const {state,player,target}=arena();
  if(mode==='range')target.x=RULES.kickRange+.01;
  if(mode==='height')target.height=1.5;
  if(mode==='cooldown')player.kickCooldown=.4;
  if(mode==='shield')target.spawnShield=1;
  if(mode==='hit')player.hit=.1;
  assert.equal(contextualKickState(state,player,target).state,kickAvailability(state,player,target.id).state,mode);
  assert.equal(canKick(state,player,target.id),false,mode);assert.ok(contextualKickState(state,player,target).hint.length>0,mode);
 }
});
