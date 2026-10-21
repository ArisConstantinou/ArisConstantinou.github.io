import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createRigLocomotion} from './locomotion.js';

function actor({mechanical=false,scale=1}={}){
 const group=new THREE.Group(),model=new THREE.Group(),hips=new THREE.Bone(),spine=new THREE.Bone();
 group.add(model);model.add(hips);hips.position.y=.96;spine.name='spine';hips.add(spine);
 const legs=[1,-1].map(sign=>{const upper=new THREE.Bone(),lower=new THREE.Bone(),foot=new THREE.Bone();
  hips.add(upper);upper.position.set(sign*.125,-.1,0);upper.add(lower);lower.position.set(sign*.025,-.35,0);lower.add(foot);foot.position.set(sign*.107,-.405,0);return {upper,lower,foot};});
 group.scale.setScalar(scale);group.updateMatrixWorld(true);
 const locomotion=createRigLocomotion(group,model,legs,{mechanical,stride:.72,lift:.16});
 const rest=legs.map(l=>[l.upper,l.lower,l.foot].map(b=>b.quaternion.clone()));
 return {group,model,legs,locomotion,step(dt,speed){locomotion.beforeAnimation();legs.forEach((l,i)=>[l.upper,l.lower,l.foot].forEach((b,j)=>b.quaternion.copy(rest[i][j])));group.position.z+=speed*dt;locomotion.update(dt);}};
}
test('humanoid foot lanes follow hips rather than the wide source bind pose',()=>{
 const a=actor();a.step(0,0);
 assert.ok(Math.abs(a.locomotion.offsets[0].x-a.locomotion.offsets[1].x)<.35,'source stance doubled the pelvis width');
 assert.ok(Math.abs(a.locomotion.offsets[0].x-a.locomotion.offsets[1].x)>.25,'boots need clearance');
 assert.equal(a.locomotion.gait.continuous,true,'every humanoid uses a continuous first step and walk/run transition');
});
test('human walking does not impose a permanent fifteen percent leg squat',()=>{
 const a=actor();a.step(0,0);let maxDrop=0;
 for(let i=0;i<120;i++){a.step(1/60,1.4);maxDrop=Math.max(maxDrop,-a.model.position.y);}
 assert.ok(maxDrop<.11,`walking pelvis dropped ${maxDrop}m`);
});
test('mechanical source stance remains unchanged and humanoid sizing is scale independent',()=>{
 const mechanical=actor({mechanical:true});assert.ok(Math.abs(mechanical.locomotion.offsets[0].x-.257)<1e-6);
 const a=actor(),b=actor({scale:1.3});assert.ok(a.locomotion.offsets[0].distanceTo(b.locomotion.offsets[0])<1e-6);
});
