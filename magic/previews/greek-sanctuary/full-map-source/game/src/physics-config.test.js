import test from 'node:test';
import assert from 'node:assert/strict';
import * as CANNON from 'cannon-es';
import {fastCollisionTracking,CastleBroadphase} from './physics-config.js';
function run(fast,complex=false) {
 const world=new CANNON.World({gravity:new CANNON.Vec3(0,-20,0)});
 if(fast)fastCollisionTracking(world);
 world.broadphase=fast?new CastleBroadphase(world):new CANNON.SAPBroadphase(world);world.solver.iterations=8;
 const events=[],bodies=[];
 for(let i=0;i<40;i++){
  const body=new CANNON.Body({mass:i<30?0:3,shape:i<30?new CANNON.Box(new CANNON.Vec3(.5,.2,.5)):new CANNON.Sphere(.4),position:new CANNON.Vec3(i%10, i<30?-.2:2,Math.floor(i/10)%3)});
  body.testId=i;body.addEventListener('collide',e=>events.push([world.stepnumber,i,e.body.testId]));world.addBody(body);bodies.push(body);
  if(complex&&i>=30){body.addShape(new CANNON.Sphere(.32),new CANNON.Vec3(0,1.2,0));if(i>=36){body.addShape(new CANNON.Box(new CANNON.Vec3(.6,.25,.9)),new CANNON.Vec3(.4,0,0));body.quaternion.setFromEuler(0,i*.37,.15);}}
 }
 if(complex){const floor=new CANNON.Body({mass:0,shape:new CANNON.Box(new CANNON.Vec3(30,.3,30)),position:new CANNON.Vec3(0,-.7,0)});floor.testId=40;world.addBody(floor);}
 for(let i=0;i<500;i++){
  if(i===200)world.removeBody(bodies[3]);
  if(i===230){bodies[32].wakeUp();bodies[32].velocity.set(2,8,0);}
  world.step(1/120);
 }
 return{events,positions:bodies.map(b=>[...b.position.toArray(),...b.velocity.toArray()])};
}
test('fast contact tracking preserves exact solver motion and collide events across removals and throws',()=>assert.deepEqual(run(true),run(false)));
test('ordered bounds preserve compound/rotated contacts and a room-wide floor exactly',()=>assert.deepEqual(run(true,true),run(false,true)));
