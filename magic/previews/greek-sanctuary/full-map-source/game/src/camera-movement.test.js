import test from 'node:test';import assert from 'node:assert/strict';
import {cameraRelativeMovement} from './camera-movement.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} differs from ${b}`);
test('W/S/A/D follow all four camera bearings, including the reported inversion',()=>{
 for(const angle of [0,Math.PI/2,Math.PI,Math.PI*1.5]){
  const f={x:-Math.sin(angle),z:-Math.cos(angle)},right={x:-f.z,z:f.x};
  for(const [x,z,expected]of [[0,-1,f],[0,1,{x:-f.x,z:-f.z}],[1,0,right],[-1,0,{x:-right.x,z:-right.z}]]){
   const actual=cameraRelativeMovement(x,z,f);close(actual.moveX,expected.x);close(actual.moveZ,expected.z);
  }
 }
});
test('continuous camera rotation preserves diagonal strength and analogue input',()=>{
 for(let angle=0;angle<Math.PI*2;angle+=.1){const actual=cameraRelativeMovement(.32,-.67,{x:Math.sin(angle),y:-.8,z:Math.cos(angle)});close(Math.hypot(actual.moveX,actual.moveZ),Math.hypot(.32,.67));}
});
test('camera pitch does not slow walking and overhead views never produce NaN',()=>{
 const steep=cameraRelativeMovement(0,-1,{x:0,y:-.99,z:-.01});close(steep.moveZ,-1);
 const overhead=cameraRelativeMovement(1,0,{x:0,y:-1,z:0});close(overhead.moveX,1);close(overhead.moveZ,0);
});
