import test from 'node:test';
import assert from 'node:assert/strict';
import * as CANNON from 'cannon-es';
import {aimedThrowVelocity,floorThrowTarget} from './throw-aim.js';
test('an outside pointer is clamped inside a real floor without changing a valid target',()=>{
 const floors=[{x:0,z:0,w:24,d:16},{x:20,z:0,w:10,d:12}];
 assert.deepEqual(floorThrowTarget({x:13,y:.88,z:7},floors),{x:11.9,y:.88,z:7});
 assert.deepEqual(floorThrowTarget({x:4,y:.88,z:3},floors),{x:4,y:.88,z:3});
});
test('swipe power changes even a nearly vertical close throw',()=>{
 const origin={x:4,y:2.17,z:14},target={x:4,y:.88,z:14};
 const slow=aimedThrowVelocity(origin,target,9),fast=aimedThrowVelocity(origin,target,26);
 assert.ok(fast.duration<slow.duration);assert.ok(fast.y<slow.y);
});
test('actual damped Cannon flights cross the chosen target from off-centre origins',()=>{
 for(const damping of [.15,.3])for(const speed of [9,16,29])for(const target of [{x:4,y:.88,z:14},{x:-5,y:.3,z:6},{x:2,y:.8,z:12}]){
  const origin={x:3.99,y:2.17,z:14.07},v=aimedThrowVelocity(origin,target,speed,damping);
  const world=new CANNON.World({gravity:new CANNON.Vec3(0,-20,0)});
  const b=new CANNON.Body({mass:2,linearDamping:damping,position:new CANNON.Vec3(origin.x,origin.y,origin.z),shape:new CANNON.Sphere(.2)});
  world.addBody(b);b.velocity.set(v.x,v.y,v.z);
  for(let i=0;i<Math.round(v.duration*120);i++)world.step(1/120);
  assert.ok(b.position.distanceTo(new CANNON.Vec3(target.x,target.y,target.z))<.005);
 }
});
