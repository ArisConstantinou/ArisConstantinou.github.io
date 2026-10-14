import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {createHearthLadderFold} from './hearth-ladder.js';
function fixture(){const group=new THREE.Group(),model=new THREE.Group(),top=new THREE.Bone(),mid=new THREE.Bone();group.add(model);model.rotation.y=Math.PI;top.position.set(0,2.5,.6);top.rotation.x=Math.PI-.28;mid.position.set(0,1.24,0);model.add(top);top.add(mid);group.updateMatrixWorld(true);return{group,top,mid,fold:createHearthLadderFold(group,{ladder:top,ladder_mid:mid})};}
test('folded ladder parks upwards against the back without changing rigid link length or accumulating rotation',()=>{
 const {group,top,mid,fold}=fixture(),length=top.getWorldPosition(new THREE.Vector3()).distanceTo(mid.getWorldPosition(new THREE.Vector3()));
 for(const clip of ['Fire','Idle','Walk','Throw','Stomp','Sleep'])for(let i=0;i<60;i++){
  fold.beforeAnimation();group.rotation.y=i*.02;group.updateMatrixWorld(true);fold.update(clip);group.updateMatrixWorld(true);
  const s=fold.snapshot();assert.equal(s.deployment,0);assert.ok(s.middle[1]>s.upper[1]+1.1);assert.ok(s.middle[1]<2.9,'parked ladder stays below the cockpit');assert.ok(Math.abs(new THREE.Vector3().fromArray(s.upper).distanceTo(new THREE.Vector3().fromArray(s.middle))-length)<1e-12);
 }
});
test('upper hinge deploys before climbing, stays deployed through the climb, then parks after boarding or exit',()=>{
 const {group,fold}=fixture();
 for(const clip of ['Board','Exit']){
  let previous=0;
  for(const t of [0,.08,.16,.24,.32,.48,1.2,2.04,2.16,2.24,2.32,2.4]){
   fold.beforeAnimation();fold.update(clip,t,2.4);group.updateMatrixWorld(true);const s=fold.snapshot();
   assert.ok(s.deployment>=0&&s.deployment<=1);if(t<=.32)assert.ok(s.deployment>=previous);if(t>=.32&&t<=2.04){assert.equal(s.deployment,1);assert.ok(s.middle[1]<s.upper[1]-1.1);}if(t===0||t===2.4){assert.equal(s.deployment,0);assert.ok(s.middle[1]>s.upper[1]+1.1);}previous=s.deployment;
  }
 }
});

test('parked carrier stays attached to the rear hatch when the torso aims and leans',()=>{
 const group=new THREE.Group(),top=new THREE.Bone(),mid=new THREE.Bone(),torso=new THREE.Bone(),door=new THREE.Bone();
 group.add(top,torso);top.position.set(0,2.5,-.6);top.rotation.x=Math.PI-.28;mid.position.set(0,1.24,0);top.add(mid);torso.position.set(0,1.95,0);torso.scale.setScalar(1.00001);door.position.set(0,1.19,-.54);torso.add(door);
 const fold=createHearthLadderFold(group,{ladder:top,ladder_mid:mid,torso});torso.scale.setScalar(1);fold.update('Fire');group.updateMatrixWorld(true);const reference=door.worldToLocal(top.getWorldPosition(new THREE.Vector3())),length=top.getWorldPosition(new THREE.Vector3()).distanceTo(mid.getWorldPosition(new THREE.Vector3()));
 for(let i=0;i<90;i++){fold.beforeAnimation();torso.rotation.set(Math.sin(i*.1)*.12,Math.sin(i*.07)*1.4,0);group.updateMatrixWorld(true);fold.update('Fire');group.updateMatrixWorld(true);const actual=door.worldToLocal(top.getWorldPosition(new THREE.Vector3()));assert.ok(actual.distanceTo(reference)<1e-12,'carrier remains on the actual hatch frame');assert.ok(Math.abs(top.getWorldPosition(new THREE.Vector3()).distanceTo(mid.getWorldPosition(new THREE.Vector3()))-length)<1e-12,'quantized rest-scale mismatch never accumulates');}
});
