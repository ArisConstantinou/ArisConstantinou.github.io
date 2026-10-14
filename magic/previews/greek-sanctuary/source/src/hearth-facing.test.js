import test from 'node:test';import assert from 'node:assert/strict';import {createHearthFacing} from './hearth-facing.js';
const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
test('large idle twists follow gradually and settle without suppressing waist direction',()=>{
 for(const aimYaw of [Math.PI/2,-Math.PI/2,Math.PI,-Math.PI,Math.PI*1.45]){
  const motor=createHearthFacing();let yaw=0,lastVelocity=0;
  for(let n=0;n<420;n++){const s=motor.update(1/60,{yaw,aimYaw});assert.ok(Math.abs(angle(s.yaw,yaw))<=1.4/60+1e-9);assert.ok(Math.abs(s.velocity-lastVelocity)<=4/60+1e-9);yaw=s.yaw;lastVelocity=s.velocity;}
  assert.ok(Math.abs(angle(yaw,aimYaw))<8*Math.PI/180);assert.equal(motor.snapshot().following,false);assert.equal(motor.snapshot().turning,false);
 }
});
test('small independent looks stay free and hysteresis avoids repetitive correction steps',()=>{
 const motor=createHearthFacing();let yaw=0;
 for(let n=0;n<600;n++)yaw=motor.update(1/60,{yaw,aimYaw:Math.sin(n*.03)*.65}).yaw;
 assert.equal(yaw,0);assert.equal(motor.snapshot().following,false);
});
test('walking during fire aligns with the upper body while retaining supplied world movement',()=>{
 const motor=createHearthFacing(),input={aimYaw:Math.PI,moveX:0,moveZ:1,firing:true};let yaw=0;
 for(let n=0;n<420;n++)yaw=motor.update(1/60,{yaw,...input}).yaw;
 assert.ok(Math.abs(angle(yaw,Math.PI))<.14);assert.deepEqual(input,{aimYaw:Math.PI,moveX:0,moveZ:1,firing:true});
});
test('boarding, exit, stomp and throw pause the base motor; zero-time sync cannot advance it',()=>{
 const motor=createHearthFacing();let yaw=0;
 for(let n=0;n<40;n++)yaw=motor.update(1/60,{yaw,aimYaw:Math.PI}).yaw;
 const before=yaw;for(let n=0;n<100;n++)yaw=motor.update(0,{yaw,aimYaw:Math.PI}).yaw;assert.equal(yaw,before);
 for(let n=0;n<100;n++)yaw=motor.update(1/60,{yaw,aimYaw:Math.PI,enabled:false}).yaw;
 assert.equal(yaw,before);assert.equal(motor.snapshot().velocity,0);assert.equal(motor.snapshot().turning,false);
});
