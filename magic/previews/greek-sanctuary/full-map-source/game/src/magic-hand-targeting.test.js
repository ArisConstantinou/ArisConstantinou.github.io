import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createMagicHandTargeting} from './magic-hand-targeting.js';

function fixture(){
  const group=new THREE.Group(),model=new THREE.Group(),bones={};group.add(model);
  for(const [side,sign] of [['l',1],['r',-1]]){
    let parent=model;
    for(const [name,position] of [['upperarm'+side,[sign*.245,1.34,0]],['lowerarm'+side,[sign*.16,-.235,-.02]],['wrist'+side,[sign*.13,-.135,-.03]],['hand'+side,[sign*.028,-.06,.008]],['finger_'+side+'_middle_1',[sign*.017,-.035,0]]]){
      const bone=new THREE.Bone();bone.name=name;bone.position.fromArray(position);parent.add(bone);bones[name]=bone;parent=bone;
    }
  }
  group.updateMatrixWorld(true);return {group,model,bones,hands:createMagicHandTargeting(group,model,bones)};
}
function step(f,target,options={}){f.hands.beforeAnimation();f.hands.update(1/60,target,options);}
test('both arms reach a gesture without stretching, under actor rotation and scale',()=>{
  for(const yaw of [-1.2,0,1.7]){
    const f=fixture();f.group.rotation.y=yaw;f.group.scale.setScalar(1.3);f.group.position.set(4,.2,-8);f.group.updateMatrixWorld(true);
    const target=f.group.localToWorld(new THREE.Vector3(0,2.1,1.8));
    const lengths=['l','r'].map(side=>[f.bones['upperarm'+side].getWorldPosition(new THREE.Vector3()).distanceTo(f.bones['lowerarm'+side].getWorldPosition(new THREE.Vector3())),f.bones['lowerarm'+side].getWorldPosition(new THREE.Vector3()).distanceTo(f.bones['wrist'+side].getWorldPosition(new THREE.Vector3()))]);
    for(let n=0;n<120;n++)step(f,target);
    const state=f.hands.snapshot();assert.ok(state.weight>.999);assert.equal(state.arms.length,2);
    for(const [i,arm] of state.arms.entries()){
      assert.ok(arm.error<1e-6);assert.ok(arm.aimError<.5,'both fingers must gesture toward the real object');
      const a=new THREE.Vector3().fromArray(arm.shoulder),b=new THREE.Vector3().fromArray(arm.elbow),c=new THREE.Vector3().fromArray(arm.wrist);
      assert.ok(Math.abs(a.distanceTo(b)-lengths[i][0])<1e-6);assert.ok(Math.abs(b.distanceTo(c)-lengths[i][1])<1e-6);
    }
  }
});
test('release restores authored shoulders/elbows/wrists without accumulated IK',()=>{
  const f=fixture(),target=new THREE.Vector3(0,2.1,1.8),original=Object.fromEntries(Object.entries(f.bones).map(([name,bone])=>[name,bone.quaternion.clone()]));
  for(let n=0;n<180;n++)step(f,target);
  const first=f.hands.snapshot();for(let n=0;n<180;n++)step(f,target);assert.deepEqual(f.hands.snapshot(),first);
  for(let n=0;n<120;n++)step(f,null);assert.equal(f.hands.snapshot().weight,0);
  for(const [name,bone] of Object.entries(f.bones))assert.ok(bone.quaternion.angleTo(original[name])<1e-7);
});
test('death, stun, reset and invalid targets leave finite, restorable transforms',()=>{
  const f=fixture();for(let n=0;n<60;n++)step(f,new THREE.Vector3(0,1.35,1.1));
  step(f,{x:NaN,y:1,z:0});assert.ok(f.hands.snapshot().weight<1);
  step(f,new THREE.Vector3(0,2.1,1.8),{disabled:true});assert.equal(f.hands.snapshot().weight,0);
  f.hands.reset();for(const bone of Object.values(f.bones))assert.ok(bone.quaternion.toArray().every(Number.isFinite));
});

test('targeting refreshes its arm chains without visiting unrelated character branches',()=>{
 const f=fixture(),decoration=new THREE.Object3D();f.model.add(decoration);let visits=0;const update=decoration.updateMatrixWorld;decoration.updateMatrixWorld=function(...args){visits++;return update.apply(this,args)};step(f,new THREE.Vector3(0,2.1,1.8));assert.equal(visits,0);assert.ok(f.hands.snapshot().arms.every(a=>a.error<1e-6));
});
