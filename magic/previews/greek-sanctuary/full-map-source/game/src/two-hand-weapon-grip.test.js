import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createTwoHandWeaponGrip} from './two-hand-weapon-grip.js';

function fixture(){
 const model=new THREE.Group(),bones={};
 for(const [side,sign] of [['l',1],['r',-1]]){
  let parent=model;
  for(const [name,position] of [['upperarm'+side,[sign*.25,1.4,0]],['lowerarm'+side,[sign*.12,-.24,.04]],['wrist'+side,[-sign*.08,-.20,.04]]]){const bone=new THREE.Bone();bone.name=name;bone.position.fromArray(position);parent.add(bone);bones[name]=bone;parent=bone}
  const socket=new THREE.Bone();socket.name='AxeSocket'+side;socket.position.copy(bones['wrist'+side].getWorldPosition(new THREE.Vector3()));model.add(socket);bones[socket.name]=socket;
 }
 model.updateMatrixWorld(true);return{model,bones,grip:createTwoHandWeaponGrip(model,bones)};
}
test('both measured weapon contacts survive a blended elbow pose, yaw and scale',()=>{
 for(const yaw of [-1.3,0,2.1]){
  const f=fixture();f.model.rotation.y=yaw;f.model.scale.setScalar(1.3);f.model.position.set(3,.2,-9);
  for(const side of ['l','r'])f.bones['lowerarm'+side].rotation.x=.18;
  const lengths=['l','r'].map(s=>f.bones['lowerarm'+s].position.length()+f.bones['wrist'+s].position.length());
  f.grip.update();assert.ok(f.grip.snapshot().arms.every(a=>a.error<1e-6));
  for(const [i,side] of ['l','r'].entries())assert.equal(f.bones['lowerarm'+side].position.length()+f.bones['wrist'+side].position.length(),lengths[i]);
 }
});
test('restore/reset returns the authored pose before animation, without accumulation',()=>{
 const f=fixture();f.bones.lowerarml.rotation.x=.18;
 const authored=Object.fromEntries(Object.entries(f.bones).map(([name,bone])=>[name,bone.quaternion.clone()]));
 for(let n=0;n<120;n++){f.grip.beforeAnimation();f.grip.update()}
 assert.ok(f.grip.snapshot().arms.every(a=>a.error<1e-6));f.grip.reset();
 for(const [name,q] of Object.entries(authored))assert.ok(f.bones[name].quaternion.angleTo(q)<1e-7);
});

test('weapon grip refreshes its contact chains without visiting unrelated character branches',()=>{
 const f=fixture(),decoration=new THREE.Object3D();f.model.add(decoration);let visits=0;const update=decoration.updateMatrixWorld;decoration.updateMatrixWorld=function(...args){visits++;return update.apply(this,args)};f.grip.update();assert.equal(visits,0);assert.ok(f.grip.snapshot().arms.every(a=>a.error<1e-6));
});
