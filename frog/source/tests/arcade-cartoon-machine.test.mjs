import test from 'node:test';import assert from 'node:assert/strict';
import {roundedRectangleSweep,rectangleClearance,separateBody} from '../src/arcade-collision.js';
import {machineFootprints,machineDetour} from '../src/arcade-cartoon-machine-bounds.js';
import {resolveArenaMove,navigateTo} from '../src/arcade-bases.js';
import {newRound} from '../src/arcade-model.js';import {assignRoundCharacters} from '../src/arcade-character-classes.js';import {frogBody} from '../src/arcade-actor-bounds.js';
import {interactCatapult,releaseCatapult} from '../src/arcade-artillery.js';import {landingSurfaces} from '../src/arcade-air-movement.js';
const rotate=(p,yaw)=>({x:Math.cos(yaw)*p.x+Math.sin(yaw)*p.z,z:-Math.sin(yaw)*p.x+Math.cos(yaw)*p.z});
for(const yaw of [0,Math.PI/2,Math.PI,Math.PI*1.5,.37])test('oriented rounded sweep preserves impact time, normal and clearance at yaw '+yaw,()=>{
 const p={x:4,z:.3},d={x:-6,z:0},box={x:0,z:0,hw:1,hd:2};const before=roundedRectangleSweep(p,d,box,.6),rp=rotate(p,yaw),rd=rotate(d,yaw),after=roundedRectangleSweep(rp,rd,{...box,yaw},.6),normal=rotate({x:before.nx,z:before.nz},yaw);assert.ok(Math.abs(before.t-after.t)<1e-10);assert.ok(Math.hypot(after.nx-normal.x,after.nz-normal.z)<1e-10);assert.ok(Math.abs(rectangleClearance(p,box)-rectangleClearance(rp,{...box,yaw}))<1e-10);
 const fixed=separateBody(rotate({x:.8,z:.2},yaw),{walls:[{...box,yaw}],radius:.6});assert.ok(rectangleClearance(fixed,{...box,yaw})>=.6-1e-6);
});
for(const id of ['heavy','skinny','medium'])for(const yaw of [0,Math.PI/2,Math.PI,Math.PI*1.5])test('new '+id+' machine can be approached, mounted and exited at yaw '+yaw,()=>{
 const s=assignRoundCharacters(newRound(),id);s.phase='battle';const a=s.actors[0],c=s.catapults[0],site={...c};Object.assign(c,{x:0,z:0,owner:a.id,aimX:Math.sin(yaw),aimZ:Math.cos(yaw)});s.catapults=[c];const p=rotate({x:0,z:2.1},yaw);Object.assign(a,p);const move=resolveArenaMove(a,0,0,{catapults:s.catapults});assert.ok(Math.hypot(move.x-a.x,move.z-a.z)<.001);assert.equal(interactCatapult(s,a),true);assert.equal(releaseCatapult(s,a),true);const exit=resolveArenaMove(a,0,0,{catapults:s.catapults});assert.ok(Math.hypot(exit.x-a.x,exit.z-a.z)<.001);const plane=landingSurfaces(s,site.x,site.z,()=>0,a).find(p=>p.catapultId===c.id);assert.equal(plane.y,frogBody(a).mountedOffset);
 const behind=rotate({x:0,z:-6},yaw),delta=rotate({x:0,z:10},yaw),stopped=resolveArenaMove({...a,...behind},delta.x,delta.z,{catapults:s.catapults});const box=machineFootprints(s.catapults)[0];assert.ok(rectangleClearance(stopped,box)>=frogBody(a).movementRadius-.001);assert.ok(Math.hypot(stopped.x-behind.x,stopped.z-behind.z)<4);
});
for(const yaw of [0,Math.PI/2,Math.PI,Math.PI*1.5])test('a route from behind the large chassis reaches its front without corner oscillation '+yaw,()=>{
 const c={id:'test-machine',x:0,z:0,aimX:Math.sin(yaw),aimZ:Math.cos(yaw)},a={characterClass:'medium',...rotate({x:0,z:-5},yaw)},target=rotate({x:0,z:2.1},yaw),boxes=machineFootprints([c]);
 for(let i=0;i<400&&Math.hypot(a.x-target.x,a.z-target.z)>.2;i++){const goal=machineDetour(a,target,[c]),dx=goal.x-a.x,dz=goal.z-a.z,d=Math.hypot(dx,dz);if(d<1e-7)break;const next=resolveArenaMove(a,dx/d*.05,dz/d*.05,{catapults:[c]});a.x=next.x;a.z=next.z;assert.ok(rectangleClearance(a,boxes[0])>=frogBody(a).movementRadius-.002);}
 assert.ok(Math.hypot(a.x-target.x,a.z-target.z)<.25,JSON.stringify({a,target}));
});
