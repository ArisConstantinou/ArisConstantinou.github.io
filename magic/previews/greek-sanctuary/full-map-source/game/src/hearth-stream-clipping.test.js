import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createHearthStreams,updateHearthStreams,hearthStreamsHit} from './hearth-streams.js';
import {HEARTH} from './hearth-rules.js';
import {lineClear} from './systems.js';
import {supportSightClear} from './walkable-support.js';

// Frozen 1.6.15 reference: changing the search must preserve its 20cm stops.
function reference(streams,visual,clear,firing){
 for(const stream of streams){
  const bone=visual.bones[stream.socket],{origin,direction,end}=stream;
  origin.set(0,.28,0);bone.localToWorld(origin);
  direction.set(0,1,0).transformDirection(bone.matrixWorld);
  direction.multiplyScalar(1/Math.max(.01,Math.hypot(direction.x,direction.z)));
  stream.length=HEARTH.range;
  if(firing)for(let distance=.3;distance<HEARTH.range;distance+=.2){
   end.copy(origin).addScaledVector(direction,distance);
   if(end.y<.1||!clear(origin,end)){stream.length=distance;break;}
  }
 }
}
function fixture(){
 const root=new THREE.Group(),bones={};
 for(const [side,x] of [['L',-1.2],['R',1.2]]){const b=new THREE.Bone();b.position.set(x,1.9,0);b.rotation.x=Math.PI/2;root.add(b);bones['nozzle_'+side]=b;}
 root.updateMatrixWorld(true);return{root,bones};
}
test('clear two-nozzle fire uses two segment checks instead of 68',()=>{
 const visual=fixture(),streams=createHearthStreams(visual);let calls=0;
 updateHearthStreams(streams,visual,()=>{calls++;return true;},true);
 assert.equal(calls,2);assert.ok(streams.every(s=>s.length===HEARTH.range));
});
test('both blocked nozzles need at most fourteen exact segment checks',()=>{
 const visual=fixture(),streams=createHearthStreams(visual);let calls=0;
 updateHearthStreams(streams,visual,(_a,b)=>{calls++;return b.z<5.35;},true);
 assert.ok(calls<=14,`${calls} segment checks`);assert.ok(streams.every(s=>s.length<HEARTH.range));
});
test('6000 deterministic 2D/3D wall, floor, origin-inside and rotating socket cases match 1.6.15 exactly',()=>{
 let seed=821;const rand=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);
 for(let i=0;i<6000;i++){
  const visual=fixture();visual.root.position.set(rand()*20-10,rand()*3,rand()*20-10);visual.root.rotation.y=rand()*Math.PI*2;
  for(const bone of Object.values(visual.bones))bone.rotation.set(Math.PI/2+(rand()-.5)*2,rand()*.8-.4,rand()*.6-.3);
  visual.root.updateMatrixWorld(true);const baseline=createHearthStreams(visual),candidate=createHearthStreams(visual);
  const obstacles=Array.from({length:12},()=>({x:visual.root.position.x+rand()*14-7,y:rand()*5,z:visual.root.position.z+rand()*14-7,w:.05+rand()*3,h:.1+rand()*6,d:.05+rand()*3}));
  const clear=(a,b)=>(i%2?supportSightClear:lineClear)(a,b,obstacles,.01);reference(baseline,visual,clear,true);updateHearthStreams(candidate,visual,clear,true);
  assert.deepEqual(candidate,baseline,`case ${i}`);
  for(let n=0;n<3;n++){const point={x:visual.root.position.x+rand()*14-7,y:rand()*5,z:visual.root.position.z+rand()*14-7};assert.equal(hearthStreamsHit(candidate,point,clear),hearthStreamsHit(baseline,point,clear));}
  reference(baseline,visual,clear,false);updateHearthStreams(candidate,visual,clear,false);assert.deepEqual(candidate,baseline);
 }
});
test('near-parallel slab tolerances and an upward nozzle below the floor retain linear-reference behavior',()=>{
 for(const angle of [1.6e-6,9e-6,3.2e-5,1.6e-9,9e-9,3.2e-8]){
  const visual=fixture();visual.root.rotation.y=angle;visual.root.updateMatrixWorld(true);
  for(const y of [0,-2.1]){
   visual.root.position.y=y;visual.bones.nozzle_L.rotation.x=Math.PI*.25;visual.root.updateMatrixWorld(true);
   const baseline=createHearthStreams(visual),candidate=createHearthStreams(visual),boxes=[{x:-1.200001,y:1,z:.7,w:.000002,h:3,d:1}];
   for(const sight of [lineClear,supportSightClear]){const clear=(a,b)=>sight(a,b,boxes);reference(baseline,visual,clear,true);updateHearthStreams(candidate,visual,clear,true);assert.deepEqual(candidate,baseline);}
  }
 }
});
