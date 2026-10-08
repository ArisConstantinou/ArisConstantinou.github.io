import './model-environment.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as THREE from '../vendor/three.module.js';
import {getHumanAttackPose} from '../feouda-combat-motion.js';
import {createAssetLibrary} from '../feouda-assets.js';

const metadata=JSON.parse(await fs.readFile(new URL('../assets/models/human-motion.json',import.meta.url)));
const clips=Object.values(metadata.models).flatMap(model=>Object.entries(model.clips).filter(([name])=>name.includes('attack')));
const close=(a,b,message)=>assert.ok(Math.abs(a-b)<1e-6,message||`${a} ≠ ${b}`);
const cycle=(phase,phaseProgress,id='strike:1')=>({id,phase,phaseProgress,paused:false});

test('No missing, idle or cancelled cycle invents a visual strike',()=>{
 const clip=clips[0][1];for(const value of [null,undefined,{phase:'idle'},{phase:'cancelled'}])assert.equal(getHumanAttackPose(clip,value),null);
 assert.equal(getHumanAttackPose({duration:0},cycle('windup',.5)),null);
});
test('Every authored attack reaches its exact contact frame on release',()=>{
 for(const [name,clip]of clips)for(let variant=0;variant<12;variant++){
  close(getHumanAttackPose(clip,cycle('windup',1),variant).time,clip.impact,name);
  close(getHumanAttackPose(clip,cycle('release',0),variant).time,clip.impact,name);
 }
});
test('Preparation and recovery advance monotonically and have continuous boundaries',()=>{
 for(const [,clip]of clips)for(const variant of [0,4,10]){
  let previous=-1;for(const phase of ['windup','release','recovery'])for(let i=0;i<=50;i++){
   const pose=getHumanAttackPose(clip,cycle(phase,i/50),variant);assert.ok(pose.time>=previous-1e-7);assert.ok(pose.time<clip.duration);previous=pose.time;
  }
  close(getHumanAttackPose(clip,cycle('release',1),variant).time,getHumanAttackPose(clip,cycle('recovery',0),variant).time);
 }
});
test('Formation variation changes preparation without shifting the real contact frame',()=>{
 const clip=clips[0][1];assert.notEqual(getHumanAttackPose(clip,cycle('windup',.5),0).time,getHumanAttackPose(clip,cycle('windup',.5),10).time);
 for(const phase of ['windup','recovery'])for(const p of [0,1])close(getHumanAttackPose(clip,cycle(phase,p),0).time,getHumanAttackPose(clip,cycle(phase,p),10).time);
});
test('A finished recovery clamps to the end and never wraps into another swing',()=>{
 for(const [,clip]of clips){const end=getHumanAttackPose(clip,cycle('recovery',1));assert.ok(end.time>clip.duration-.001);close(end.time,getHumanAttackPose(clip,cycle('recovery',12)).time);assert.ok(Number.isFinite(getHumanAttackPose(clip,cycle('windup',NaN)).time));}
});

const assets=createAssetLibrary();await assets.ready;
assert.equal(assets.getStats().failed.length,0,'Production models must decode before evaluating animation');
function skeletonSignature(actor){const result=[];actor.object.traverse(node=>{if(node.isBone)result.push(...node.position.toArray(),...node.quaternion.toArray());});return result;}
function checkRig(actor){
 actor.object.updateMatrixWorld(true);const point=new THREE.Vector3();
 actor.object.traverse(node=>{if(node.isBone){assert.ok([...node.position.toArray(),...node.quaternion.toArray()].every(Number.isFinite));close(node.quaternion.length(),1);}if(node.isSkinnedMesh){node.skeleton.update();for(let i=0;i<node.geometry.attributes.position.count;i+=137){node.getVertexPosition(i,point).applyMatrix4(node.matrixWorld);assert.ok(point.toArray().every(Number.isFinite));}}});
}
for(const role of ['spear','sword','archer','cavalry']){
 test(`${role}: real skeleton follows the authorized cycle and freezes in pause`,()=>{
  const actor=assets.createCharacter(role,{variant:3});assert.ok(actor);let time=10;
  for(const phase of ['windup','release','recovery'])for(const p of [0,.5,1]){
   actor.update({time:time+=.05,dt:.05,distance:0,role,combatCycle:cycle(phase,p),attacking:true});
   const state=actor.motionState();assert.ok(state.clip.includes('attack'));assert.equal(state.combatCycle.phase,phase);assert.equal(state.combatCycle.id,'strike:1');checkRig(actor);
   const pose=skeletonSignature(actor),before=JSON.stringify(state);actor.update({time,dt:0,distance:0,role,combatCycle:{...cycle(phase,p),paused:true},attacking:true});
   assert.deepEqual(skeletonSignature(actor),pose);assert.equal(JSON.stringify(actor.motionState()),before);
  }
  actor.dispose();
 });
 test(`${role}: cancellation and stale attack flags cannot start another visual attack`,()=>{
  const actor=assets.createCharacter(role,{variant:3});actor.update({time:0,dt:.05,distance:0,role,combatCycle:cycle('windup',.7)});
  actor.update({time:.05,dt:.05,distance:0,role,combatCycle:{phase:'idle'},attacking:true,actionTime:999});assert.ok(actor.motionState().clip.endsWith('idle'));assert.equal(actor.motionState().combatCycle,null);
  for(let i=2;i<30;i++)actor.update({time:i*.05,dt:.05,distance:0,role,attacking:true,actionTime:i*.05});assert.ok(actor.motionState().clip.endsWith('idle'));assert.ok(actor.motionState().blend.every(x=>!x.clip.includes('attack')));
  actor.dispose();
 });
 test(`${role}: identical strike progress is independent of global animation time`,()=>{
  const a=assets.createCharacter(role,{variant:2}),b=assets.createCharacter(role,{variant:2});
  for(let i=0;i<12;i++){const c=cycle(i<6?'windup':'recovery',(i%6)/6);a.update({time:i*.05,dt:.05,distance:0,role,combatCycle:c});b.update({time:700+i*.05,dt:.05,distance:0,role,combatCycle:c});}
  assert.deepEqual(skeletonSignature(a),skeletonSignature(b));close(a.motionState().time,b.motionState().time);a.dispose();b.dispose();
 });
}
test('Civilian building work and distance-driven walking remain independent of combat',()=>{
 const worker=assets.createCharacter('civilian',{variant:1});worker.update({time:0,dt:.05,distance:0,work:'build',tool:'build'});assert.equal(worker.motionState().clip,'build');
 for(let i=1;i<=20;i++)worker.update({time:i*.05,dt:.05,distance:i*.065,walking:true,speed:1.3,tool:'wood'});assert.equal(worker.motionState().clip,'tool_walk');assert.equal(worker.motionState().combatCycle,null);checkRig(worker);worker.dispose();
});
