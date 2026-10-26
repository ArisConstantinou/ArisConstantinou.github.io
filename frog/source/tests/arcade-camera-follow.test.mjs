import test from 'node:test';
import assert from 'node:assert/strict';
import {ArcadeCameraFollow} from '../src/arcade-camera-follow.js';
import {cameraPose} from '../src/arcade-view-math.js';

const player={x:0,z:0},point=values=>({x:values[0],y:values[1],z:values[2]});
function view(yaw){const pose=cameraPose(player,0,16/9,'chase3d',{yaw,pitch:.44});return {camera:point(pose.position),focus:point(pose.look)};}
const difference=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));

test('automatic camera turns behind sideways and backward travel while every held movement remains straight',()=>{
 for(const [x,y] of [[1,0],[-1,0],[0,1],[1,-1]]){
  const follow=new ArcadeCameraFollow();let yaw=Math.PI,first=null;
  for(let frame=0;frame<300;frame++){
   const {camera,focus}=view(yaw),movement=follow.movement(x,y,camera,focus);first??=movement;
   assert.ok(Math.abs(movement.x-first.x)<1e-10&&Math.abs(movement.z-first.z)<1e-10,'camera rotation never curves held WASD');
   const previous=yaw;yaw=follow.update(yaw,{dt:1/60,moving:movement});
   assert.ok(difference(yaw,previous)<=1.8/60+1e-10,'turn speed is bounded');
  }
  assert.ok(difference(yaw,Math.atan2(first.x,first.z))<.003,'camera settles behind travel');
 }
});

test('releasing movement picks up the new screen axes on the next press',()=>{
 const follow=new ArcadeCameraFollow(),initial=view(Math.PI),turned=view(Math.PI/2);
 follow.movement(1,0,initial.camera,initial.focus);
 follow.movement(0,0,turned.camera,turned.focus);
 const forward=follow.movement(0,-1,turned.camera,turned.focus);
 assert.ok(forward.x>.999&&Math.abs(forward.z)<1e-10);
});

test('changing keys uses the current screen axes without a neutral frame',()=>{
 for(const [x,y] of [[0,-1],[1,-1],[-1,0]]){
  const follow=new ArcadeCameraFollow(),initial=view(Math.PI),turned=view(Math.PI/2);
  follow.movement(1,0,initial.camera,initial.focus);
  const changed=follow.movement(x,y,turned.camera,turned.focus);
  assert.ok(Math.abs(changed.x+y)<1e-10&&Math.abs(changed.z-x)<1e-10);
  assert.equal(follow.turnTime,0);
 }
});

test('a continuous touch sweep stays smooth after an automatic turn and adopts new axes on release',()=>{
 const follow=new ArcadeCameraFollow(),initial=view(Math.PI),turned=view(Math.PI/2),options={continuous:true};
 follow.movement(1,0,initial.camera,initial.focus,options);let previous={x:1,z:0};
 for(let i=1;i<=90;i++){
  const a=i*Math.PI/180,movement=follow.movement(Math.cos(a),-Math.sin(a),turned.camera,turned.focus,options);
  assert.ok(difference(Math.atan2(movement.x,movement.z),Math.atan2(previous.x,previous.z))<.018,'small thumb movements make small world turns');previous=movement;
 }
 assert.ok(previous.z<-.999);
 follow.releaseMovement();const next=follow.movement(0,-1,turned.camera,turned.focus,options);assert.ok(next.x>.999);
});

test('touch strength jitter does not rebase a held heading and explicit release works between frames',()=>{
 const follow=new ArcadeCameraFollow(),initial=view(Math.PI),turned=view(Math.PI/2);
 follow.movement(1,0,initial.camera,initial.focus);
 const held=follow.movement(.6,.01,turned.camera,turned.focus);
 assert.ok(held.x>.59&&Math.abs(held.z)<.02);
 follow.releaseMovement();const fresh=follow.movement(1,0,turned.camera,turned.focus);
 assert.ok(fresh.z>.999&&Math.abs(fresh.x)<1e-10);
});

test('deliberate aiming, idle, overview and paused gameplay do not rotate the camera',()=>{
 for(const options of [{aiming:true},{moving:{x:0,z:0}},{mode:'overview'},{active:false},{enabled:false}]){
  const follow=new ArcadeCameraFollow();let yaw=Math.PI;
  for(let frame=0;frame<180;frame++)yaw=follow.update(yaw,{dt:1/60,moving:{x:1,z:0},...options});
  assert.equal(yaw,Math.PI);
 }
});

test('manual orbit temporarily holds its angle then resumes automatic follow',()=>{
 const follow=new ArcadeCameraFollow();follow.manual();let yaw=Math.PI;
 for(let frame=0;frame<60;frame++)yaw=follow.update(yaw,{dt:1/60,moving:{x:1,z:0}});
 assert.equal(yaw,Math.PI);
 for(let frame=0;frame<240;frame++)yaw=follow.update(yaw,{dt:1/60,moving:{x:1,z:0}});
 assert.ok(difference(yaw,Math.PI/2)<.003);
});

test('manual mode and dragging retain live screen-relative movement with no stored basis',()=>{
 for(const option of [{enabled:false},{dragging:true}]){
  const follow=new ArcadeCameraFollow(),initial=view(Math.PI),turned=view(Math.PI/2);
  assert.ok(follow.movement(0,-1,initial.camera,initial.focus,option).z<-.999);
  assert.ok(follow.movement(0,-1,turned.camera,turned.focus,option).x>.999);
  assert.equal(follow.basis,null);
 }
});

test('short taps do not swing the camera and reset clears an old movement basis',()=>{
 const follow=new ArcadeCameraFollow(),initial=view(Math.PI);
 follow.movement(1,0,initial.camera,initial.focus);
 for(let frame=0;frame<10;frame++)assert.equal(follow.update(Math.PI,{dt:1/60,moving:{x:1,z:0}}),Math.PI);
 follow.manual();follow.reset();assert.equal(follow.basis,null);assert.equal(follow.manualTime,0);assert.equal(follow.turnTime,0);
});
