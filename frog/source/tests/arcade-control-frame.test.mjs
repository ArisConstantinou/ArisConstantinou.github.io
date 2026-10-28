import test from 'node:test';
import assert from 'node:assert/strict';
import {screenMovement,localHopDirection} from '../src/arcade-control-frame.js';
import {createCreature} from '../src/creatures.js';
import {Vector3} from 'three';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);

test('overview WASD is north-up for every preceding chase yaw and body heading',()=>{
 for(const yaw of [0,.5,Math.PI/2,Math.PI,-Math.PI/2,100,NaN]){
  assert.deepEqual(screenMovement(0,-1,'overview',yaw),{x:0,z:-1});
  assert.deepEqual(screenMovement(-1,0,'overview',yaw),{x:-1,z:0});
  assert.deepEqual(screenMovement(0,1,'overview',yaw),{x:0,z:1});
  assert.deepEqual(screenMovement(1,0,'overview',yaw),{x:1,z:0});
 }
});
test('chase WASD uses view yaw; W follows look, A/D strafe and S backs away',()=>{
 for(let yaw=-Math.PI;yaw<=Math.PI;yaw+=Math.PI/16){
  const f=screenMovement(0,-1,'chase3d',yaw),r=screenMovement(1,0,'chase3d',yaw);
  close(f.x,Math.sin(yaw));close(f.z,Math.cos(yaw));close(f.x*r.x+f.z*r.z,0);
  const b=screenMovement(0,1,'chase3d',yaw),l=screenMovement(-1,0,'chase3d',yaw);
  close(b.x,-f.x);close(b.z,-f.z);close(l.x,-r.x);close(l.z,-r.z);
  close(Math.hypot(...Object.values(screenMovement(.2,-.3,'chase3d',yaw))),Math.hypot(.2,.3));
 }
});
test('body-local hop direction preserves actual world travel while the body aims anywhere',()=>{
 for(let yaw=-Math.PI;yaw<=Math.PI;yaw+=Math.PI/8)for(const [x,z] of [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1]]){
  const d=localHopDirection(x,z,yaw),length=Math.hypot(x,z);
  close(Math.cos(yaw)*d.x+Math.sin(yaw)*d.z,x/length);
  close(-Math.sin(yaw)*d.x+Math.cos(yaw)*d.z,z/length);
 }
 assert.deepEqual(localHopDirection(0,0),{x:0,z:1});
 for(const p of [screenMovement(NaN,Infinity),localHopDirection(NaN,Infinity)])assert.ok(Object.values(p).every(Number.isFinite));
});
function feet(model,direction,progress=.15){
 model.update(0,{time:1,speed:8.8,hop:{phase:'air',progress},...(direction?{hopDirection:direction}:{})});
 model.group.updateMatrixWorld(true);
 return ['ankle-1','ankle1','wrist-1','wrist1'].map(name=>model.bones[name].getWorldPosition(new Vector3()).toArray());
}
test('left and right hops actually use different lateral foot trajectories, not a forward animation',t=>{
 const model=createCreature('frog',{seed:7});t.after(()=>model.dispose());
 const forward=feet(model,{x:0,z:1}),backward=feet(model,{x:0,z:-1}),left=feet(model,{x:-1,z:0}),right=feet(model,{x:1,z:0});
 for(let i=0;i<2;i++){
  assert.ok(forward[i][2]<backward[i][2]-.1,'hind feet thrust opposite forward/backward travel');
  assert.ok(right[i][0]<left[i][0]-.1,'hind feet thrust opposite right/left travel');
 }
 assert.deepEqual(feet(model),feet(model,{x:0,z:1}),'legacy callers retain their forward pose');
 for(let frame=0;frame<120;frame++){
  const yaw=frame/120*Math.PI*2,result=feet(model,{x:Math.sin(yaw),z:Math.cos(yaw)},(frame%20)/20);
  assert.ok(result.flat().every(Number.isFinite));
 }
 const first=feet(model,{x:1,z:0});for(let i=0;i<100;i++)feet(model,{x:1,z:0});
 assert.deepEqual(feet(model,{x:1,z:0}),first,'poses reset rather than accumulating joint rotations');
});
