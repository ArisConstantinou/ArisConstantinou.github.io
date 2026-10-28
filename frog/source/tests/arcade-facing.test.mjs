import test from 'node:test';
import assert from 'node:assert/strict';
import {actorVisualFacing} from '../src/arcade-facing.js';

const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const close=(a,b)=>assert.ok(Math.abs(angle(a,b))<1e-10,`${a} should face ${b}`);
const player=extra=>({id:'player',face:0,aiming:true,aimX:0,aimY:.2,aimZ:-1,shot:0,kick:0,hop:0,hopX:0,hopZ:0,dizzyTime:0,knockUp:0,ko:false,eliminated:false,catapultId:null,sabotageId:null,...extra});

test('a permanent chase reticle does not override movement-facing in any direction',()=>{
 for(const [x,z] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){
  const actor=player({face:Math.atan2(x,z),hop:.2,hopX:x*8.8,hopZ:z*8.8});
  const pose=actorVisualFacing(actor,{currentYaw:Math.PI});
  close(pose.yaw,actor.face);assert.equal(pose.aiming,false);
 }
});

test('landing and release retain the last movement heading when hop velocity is zero',()=>{
 const actor=player({face:-Math.PI/2,hop:.12,hopX:-8.8});
 close(actorVisualFacing(actor).yaw,-Math.PI/2);
 Object.assign(actor,{hop:0,hopX:0,hopZ:0,idle:.035});
 close(actorVisualFacing(actor).yaw,-Math.PI/2);
 actor.idle=0;close(actorVisualFacing(actor).yaw,-Math.PI/2);
 assert.equal(actorVisualFacing(actor).aiming,false);
});

test('moving the look direction alone does not rotate the body away from its travel heading',()=>{
 const actor=player({face:Math.PI/2});
 for(const yaw of [-Math.PI,-1,0,.5,Math.PI]){
  Object.assign(actor,{aimX:Math.sin(yaw),aimZ:Math.cos(yaw)});
  close(actorVisualFacing(actor).yaw,Math.PI/2);
 }
});

test('deliberate manual fire faces the shot, including an empty magazine or cooldown gap',()=>{
 const actor=player({face:Math.PI/2,ammo:0,shot:0});
 const pose=actorVisualFacing(actor,{manualFire:true});
 close(pose.yaw,Math.PI);assert.equal(pose.aiming,true);
});

test('automatic fire bridges the shot cooldown without changing movement or aim',()=>{
 const actor=player({face:-Math.PI/2,shot:0,hop:.2,hopX:-8.8});
 const before=structuredClone(actor),pose=actorVisualFacing(actor,{autoFire:true});
 close(pose.yaw,Math.PI);assert.equal(pose.aiming,true);assert.deepEqual(actor,before);
});

test('the complete shot interval preserves combat facing and keeps its remembered bearing on release',()=>{
 const actor=player({face:Math.PI/2,poseAimYaw:Math.PI});
 for(const shot of [.14,.03,.015,Number.EPSILON]){
  actor.shot=shot;const pose=actorVisualFacing(actor);
  close(pose.yaw,Math.PI);assert.equal(pose.aiming,true);
 }
 actor.shot=0;const released=actorVisualFacing(actor);
 close(released.yaw,Math.PI);assert.equal(released.aiming,false);
});

test('kicks and a mounted catapult retain deliberate aim-facing',()=>{
 for(const extra of [{kick:.2},{catapultId:'catapult-player'}]){
  const pose=actorVisualFacing(player({face:Math.PI/2,...extra}));
  close(pose.yaw,Math.PI);assert.equal(pose.aiming,true);
 }
});

test('storage sabotage uses the simulation heading toward the storage',()=>{
 const actor=player({face:.7,sabotageId:'rival-store',shot:.02});
 const pose=actorVisualFacing(actor,{manualFire:true,autoFire:true});
 close(pose.yaw,.7);assert.equal(pose.aiming,false);
});

test('NPC combat aiming and windup remain distinct from player passive look',()=>{
 for(const extra of [{aiming:true},{aiming:false,aiCharging:true},{aiming:false,shot:.01}]){
  const pose=actorVisualFacing(player({id:'rival-1',face:Math.PI/2,...extra}));
  close(pose.yaw,Math.PI);assert.equal(pose.aiming,true);
 }
 const navigating=actorVisualFacing(player({id:'rival-2',aiming:false,face:Math.PI/2}));
 close(navigating.yaw,Math.PI/2);assert.equal(navigating.aiming,false);
});

test('KO, elimination, dizzy and knock-up retain the current visual heading',()=>{
 for(const state of [{ko:true},{eliminated:true},{dizzyTime:.1},{knockUp:.1}]){
  const pose=actorVisualFacing(player({...state,face:.8,shot:.1,kick:.2}),{currentYaw:-.7,manualFire:true,autoFire:true});
  close(pose.yaw,-.7);assert.equal(pose.aiming,false);
 }
});

test('render-facing decisions never mutate logical aim, movement, projectile state or camera data',()=>{
 const actor=Object.freeze(player({face:1.2,aimX:.4,aimY:.6,aimZ:-.3,hopX:3,hopZ:4,aim3D:true}));
 const options=Object.freeze({manualFire:true,autoFire:false,currentYaw:-.3,cameraYaw:.9});
 const original={...actor};actorVisualFacing(actor,options);
 assert.deepEqual(actor,original);assert.equal(options.cameraYaw,.9);
 const travel=actorVisualFacing(actor);
 close(travel.yaw,1.2);assert.equal(actor.aimX,.4);assert.equal(actor.aimY,.6);assert.equal(actor.aimZ,-.3);
});

test('missing and invalid aim values fall back to finite movement or current yaw',()=>{
 for(const aim of [{aimX:NaN},{aimX:Infinity},{aimZ:undefined},{aimX:0,aimZ:0}]){
  const pose=actorVisualFacing(player({face:.4,...aim}),{manualFire:true,currentYaw:-.6});
  close(pose.yaw,.4);assert.equal(pose.aiming,false);
 }
 for(const face of [undefined,NaN,Infinity])close(actorVisualFacing(player({face}),{currentYaw:-.6}).yaw,-.6);
 assert.deepEqual(actorVisualFacing(null,{currentYaw:NaN}),{yaw:0,aiming:false});
 assert.deepEqual(actorVisualFacing(undefined,{currentYaw:Infinity}),{yaw:0,aiming:false});
});
