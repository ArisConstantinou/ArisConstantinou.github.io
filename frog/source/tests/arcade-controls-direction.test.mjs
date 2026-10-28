import test from 'node:test';
import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {movementForView,localHopDirection} from '../src/arcade-controls.js';
import {newRound,step,RULES} from '../src/arcade-model.js';
import {actorVisualFacing} from '../src/arcade-facing.js';
import {createCreature} from '../src/creatures.js';
const close=(a,b,epsilon=1e-9)=>assert.ok(Math.abs(a-b)<epsilon,`${a} != ${b}`);
const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));

test('overview WASD and diagonals are screen-fixed for every previous orbit yaw',()=>{
 for(const yaw of [-9,-Math.PI,-Math.PI/2,0,Math.PI/2,Math.PI,20,NaN])
 for(const [x,y] of [[0,-1],[-1,0],[0,1],[1,0],[-1,-1],[1,-1],[-1,1],[1,1],[.2,-.7]])
  assert.deepEqual(movementForView(x,y,'overview',yaw),{x,z:y});
});
test('chase WASD follows intentional view yaw, not frog facing or camera shake',()=>{
 for(const yaw of [-Math.PI,-Math.PI/2,0,Math.PI/2,.4]){
  const w=movementForView(0,-1,'chase3d',yaw),s=movementForView(0,1,'chase3d',yaw),a=movementForView(-1,0,'chase3d',yaw),d=movementForView(1,0,'chase3d',yaw);
  close(w.x,Math.sin(yaw));close(w.z,Math.cos(yaw));close(s.x,-w.x);close(s.z,-w.z);
  close(a.x,-d.x);close(a.z,-d.z);close(w.x*d.x+w.z*d.z,0);close(Math.hypot(d.x,d.z),1);
 }
});
test('movement basis and local hop conversion reject nonfinite inputs',()=>{
 assert.deepEqual(movementForView(NaN,Infinity),{x:0,z:0});
 assert.deepEqual(localHopDirection(NaN,Infinity,NaN),{x:0,z:0});
 assert.deepEqual(localHopDirection(0,0,2),{x:0,z:0});
 assert.ok(Object.values(movementForView(1,-1,'chase3d',NaN)).every(Number.isFinite));
});
test('local hop direction reconstructs world travel through all eight directions and body turns',()=>{
 for(const yaw of [-Math.PI,-1,0,.5,Math.PI/2,Math.PI])
 for(const [x,z] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){
  const local=localHopDirection(x*8,z*8,yaw),world=new Vector3(local.x,0,local.z).applyAxisAngle(new Vector3(0,1,0),yaw),len=Math.hypot(x,z);
  close(world.x,x/len);close(world.z,z/len);close(Math.hypot(local.x,local.z),1);
 }
});
test('actual simulation travel stays screen-relative while aiming behind or sideways',()=>{
 for(const [x,z] of [[0,-1],[-1,0],[0,1],[1,0]])for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2]){
  const state=newRound();state.phase='battle';state.guards=[];state.flies.forEach(f=>f.wait=999);state.actors.slice(1).forEach(a=>{a.ko=true;a.eliminated=true;});
  const p=state.actors[0];Object.assign(p,{x:0,z:6,poseAimYaw:yaw,tongue:999});
  const move=movementForView(x,z,'overview',yaw);
  for(let i=0;i<12;i++)step(state,{mx:move.x,mz:move.z,aiming:true,faceAim:true,ax:Math.sin(yaw),az:Math.cos(yaw)});
  assert.ok((p.x*x+(p.z-6)*z)>.8);close(p.x*z-(p.z-6)*x,0);
  close(delta(actorVisualFacing(p).yaw,yaw),0);assert.ok(p.height>0,'test includes a real airborne frog');
 }
});
test('chase look updates retained facing even without a shot and does not redirect strafing',()=>{
 const state=newRound();state.phase='battle';state.guards=[];state.flies.forEach(f=>f.wait=999);state.actors.slice(1).forEach(a=>{a.ko=true;a.eliminated=true;});
 const p=state.actors[0];Object.assign(p,{x:0,z:6,poseAimYaw:Math.PI,tongue:999});
 const yaw=.6,move=movementForView(-1,0,'chase3d',yaw);
 step(state,{mx:move.x,mz:move.z,ax:Math.sin(yaw),az:Math.cos(yaw),aiming:true,faceAim:true});
 close(delta(actorVisualFacing(p).yaw,yaw),0);assert.equal(state.stats.shots,0);assert.equal(p.ammo,RULES.capacity);
 assert.ok(p.x*move.x+(p.z-6)*move.z>0);
});

test('actual rig sends both hind feet opposite lateral takeoff instead of reusing the forward extension',()=>{
 const model=createCreature('frog',{seed:4});
 const pose=direction=>{
  model.update(1/60,{time:1,speed:8,hop:{phase:'air',progress:.2,direction}});model.group.updateMatrixWorld(true);
  const positions=[-1,1].map(side=>model.bones[`ankle${side}`].getWorldPosition(new Vector3()));
  return positions.reduce((sum,p)=>sum.add(p),new Vector3()).multiplyScalar(.5);
 };
 try{
  const center=pose({x:0,z:0}),left=pose({x:-1,z:0}),right=pose({x:1,z:0}),forward=pose({x:0,z:1}),back=pose({x:0,z:-1});
  assert.ok(left.x-center.x>.1);assert.ok(right.x-center.x<-.1);close(left.x-center.x,-(right.x-center.x),1e-6);
  assert.ok(forward.z-center.z<-.12);assert.ok(back.z-center.z>.12);
 }finally{model.dispose();}
});
test('directional rig stays finite through gather, takeoff, apex and landing without rotating the actor',()=>{
 const model=createCreature('frog');model.group.rotation.y=.7;
 try{
  for(const direction of [{x:1,z:0},{x:-1,z:0},{x:0,z:-1},{x:1,z:-1},{x:-1,z:1},{x:0,z:0}])
  for(const progress of [0,.04,.16,.33,.5,.7,.9,1]){
   model.update(1/60,{time:1,speed:8,hop:{phase:'air',progress,direction}});model.group.updateMatrixWorld(true);
   close(model.group.rotation.y,.7);
   for(const bone of Object.values(model.bones))assert.ok(bone.matrixWorld.elements.every(Number.isFinite));
  }
 }finally{model.dispose();}
});
