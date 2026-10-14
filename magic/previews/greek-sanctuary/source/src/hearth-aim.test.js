import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {createHearthAimTargets,createHearthArmAim} from './hearth-aim.js';
const streams=[{origin:new THREE.Vector3(-1.3,2,0)},{origin:new THREE.Vector3(1.3,2,0)}];
const entity=(x,z,category='actor')=>({category,body:{position:new THREE.Vector3(x,category==='actor'?1:.6,z)}});
const options={active:true,yaw:0,clear:()=>true};
test('independent hands detect enemies and both flammable and stone items',()=>{
 for(const categories of [['actor','actor'],['prop','prop']]){
  const aim=createHearthAimTargets(),left=entity(-3,4,categories[0]),right=entity(3,4,categories[1]);
  assert.deepEqual(aim.update([right,left],streams,options).map(t=>t.entity),[left,right]);
 }
});
test('a single nearby item receives both hands; wall, rear items, ally, held, dead and removed targets are rejected',()=>{
 const aim=createHearthAimTargets(),item=entity(0,4,'prop');assert.deepEqual(aim.update([item],streams,options).map(t=>t.entity),[item,item]);
 const invalid=[entity(0,-4,'prop'),Object.assign(entity(0,3),{ally:true}),Object.assign(entity(0,3),{removed:true}),Object.assign(entity(0,3),{dead:true}),Object.assign(entity(0,3),{isPlayer:true})];
 assert.ok(aim.update(invalid,streams,options).every(t=>t.entity===null));
 assert.ok(aim.update([item],streams,{...options,held:item}).every(t=>t.entity===null));
 assert.ok(aim.update([item],streams,{...options,clear:()=>false}).every(t=>t.entity===null));
});
test('pointer-selected object is detectable among enemies and tracking follows its actual moving body',()=>{
 const aim=createHearthAimTargets(),item=entity(0,4,'prop'),enemies=[entity(-2,4),entity(2,4)];
 const selected=aim.update([...enemies,item],streams,{...options,preferred:item}).map(t=>t.entity);assert.ok(selected.includes(item)&&selected.some(e=>enemies.includes(e)),'pointer item uses a hand while the other remains on a living threat');
 item.body.position.set(-.8,.6,4.5);const saved=aim.targets.map(t=>t.point);
 for(let n=0;n<50;n++)aim.update([...enemies,item],streams,{...options,preferred:item});
 assert.ok(aim.targets.every((t,i)=>t.point===saved[i]));assert.ok(aim.targets.some(t=>t.entity===item&&t.point.distanceTo(item.body.position)===0));
 item.removed=true;assert.deepEqual(aim.update([...enemies,item],streams,options).map(t=>t.entity),enemies);
 assert.ok(aim.update(enemies,streams,{...options,active:false}).every(t=>!t.entity));
});
test('nearby guards outrank floor items and close central bosses outrank distant side guards',()=>{
 const aim=createHearthAimTargets(),guards=[entity(-1,4),entity(1,4)],items=[entity(-3,1.6,'prop'),entity(3,1.6,'prop')];
 assert.ok(aim.update([...items,...guards],streams,options).every(t=>guards.includes(t.entity)));
 const boss=Object.assign(entity(0,1.65),{bossType:'colossus',cy:1.2});
 assert.ok(aim.update([...guards,boss,...items],streams,options).every(t=>t.entity===boss));assert.ok(aim.targets.every(t=>t.point.y===1.35));
 const rear=entity(0,-3);assert.ok(aim.update([rear],streams,options).every(t=>t.entity===rear));assert.ok(Math.abs(Math.abs(aim.desiredYaw)-Math.PI)<1e-10);
 const selected=aim.update([...guards,boss],streams,{...options,preferred:guards[0]}).map(t=>t.entity);assert.ok(selected.includes(boss)&&selected.includes(guards[0]),'hovered distant guard cannot divert both hands from the close boss');
 const edge=entity(0,8);const forward=streams.map(s=>({origin:s.origin.clone().setZ(1.3)}));assert.ok(aim.update([edge],forward,options).every(t=>t.entity===edge),'range is measured from actual outlets, not the body');
});
test('empty active fire levels actual outlets; releasing restores the authored dipped pose',()=>{
 const {group,bones,aim}=rig();bones.upper_L.rotation.x=bones.upper_R.rotation.x=.25;
 for(let n=0;n<90;n++){aim.beforeAnimation();group.updateMatrixWorld(true);aim.update(1/60,{active:true});}
 for(const side of ['L','R'])assert.ok(Math.abs(new THREE.Vector3(0,1,0).transformDirection(bones['nozzle_'+side].matrixWorld).y)<.0001);
 for(let n=0;n<90;n++){aim.beforeAnimation();group.updateMatrixWorld(true);aim.update(1/60,{active:false});}
 assert.ok(aim.snapshot().arms.every(a=>Math.abs(a.yaw)+Math.abs(a.pitch)<.0001));
});
test('left/right distribution follows the prospective turned waist, including rear threats',()=>{
 const aim=createHearthAimTargets(),left=entity(3,-4),right=entity(-3,-4),rearStreams=streams.map(s=>({origin:s.origin.clone().applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI)}));
 assert.deepEqual(aim.update([right,left],rearStreams,options).map(t=>t.entity),[left,right]);
 assert.ok(Math.abs(Math.abs(aim.desiredYaw)-Math.PI)<1e-10);
});
function rig(){
 const group=new THREE.Group(),model=new THREE.Group(),bones={};group.add(model);
 for(const [side,x] of [['L',-1.1],['R',1.1]]){
  const upper=new THREE.Bone(),lower=new THREE.Bone(),nozzle=new THREE.Bone();upper.position.set(x,2.7,0);lower.position.set(0,-.35,.45);nozzle.position.set(0,-.15,.5);nozzle.rotation.x=Math.PI/2;upper.add(lower);lower.add(nozzle);model.add(upper);Object.assign(bones,{['upper_'+side]:upper,['lower_'+side]:lower,['nozzle_'+side]:nozzle});
 }
 group.updateMatrixWorld(true);return{group,model,bones,aim:createHearthArmAim(group,model,bones)};
}
test('shoulders and elbows physically rotate, retain rigid lengths, and aim the actual outlet independently',()=>{
 const {group,model,bones,aim}=rig(),targets=[{entity:{},point:new THREE.Vector3(-3,.9,4)},{entity:{},point:new THREE.Vector3(3,.5,4)}];
 const lengths=['L','R'].map(s=>bones['upper_'+s].getWorldPosition(new THREE.Vector3()).distanceTo(bones['lower_'+s].getWorldPosition(new THREE.Vector3())));
 for(let n=0;n<90;n++){aim.beforeAnimation();group.updateMatrixWorld(true);aim.update(1/60,{active:true,targets});}
 const state=aim.snapshot();assert.ok(state.arms.every(a=>a.error<.015));assert.ok(state.arms[0].yaw<-.3&&state.arms[1].yaw>.3);
 for(const [i,s] of ['L','R'].entries()){
  assert.ok(Math.abs(bones['upper_'+s].getWorldPosition(new THREE.Vector3()).distanceTo(bones['lower_'+s].getWorldPosition(new THREE.Vector3()))-lengths[i])<1e-12);
  assert.ok(bones['upper_'+s].quaternion.angleTo(new THREE.Quaternion())>.25);assert.ok(bones['lower_'+s].quaternion.angleTo(new THREE.Quaternion())>.1);
 }
 const before=bones.upper_L.quaternion.clone();for(let n=0;n<50;n++){aim.beforeAnimation();model.updateMatrixWorld(true);aim.update(0,{active:true,targets});}
 assert.ok(before.angleTo(bones.upper_L.quaternion)<1e-7,'repeated zero-time sync never accumulates joint rotation');
});
test('moving-target turns are bounded; release returns to animation and attacks/boarding remove the overlay',()=>{
 const {group,aim}=rig(),targets=[{entity:{},point:new THREE.Vector3(-4,1,3)},{entity:{},point:new THREE.Vector3(4,1,3)}];
 let previous=[0,0];for(let n=0;n<120;n++){
  targets[0].point.x=n<60?-4:4;targets[1].point.x=-targets[0].point.x;
  aim.beforeAnimation();group.updateMatrixWorld(true);aim.update(1/60,{active:true,targets});const state=aim.snapshot();
  state.arms.forEach((a,i)=>{assert.ok(Math.abs(a.yaw-previous[i])<=3.6/60+1e-10);assert.ok(Math.abs(a.yaw)<=70*Math.PI/180);assert.ok(a.pitch>=-60*Math.PI/180&&a.pitch<=35*Math.PI/180);previous[i]=a.yaw;});
 }
 for(let n=0;n<90;n++){aim.beforeAnimation();group.updateMatrixWorld(true);aim.update(1/60,{active:false});}
 assert.ok(aim.snapshot().arms.every(a=>Math.abs(a.yaw)<.00001&&Math.abs(a.pitch)<.00001));
 aim.beforeAnimation();aim.update(1/60,{active:true,targets,enabled:false});assert.ok(aim.snapshot().arms.every(a=>a.yaw===0&&a.pitch===0&&a.target===null));
});

test('reuse of current parent matrices follows a moving and turning body without stale outlet directions',()=>{
 const {group,model,aim}=rig();
 const targets=[{entity:{},point:new THREE.Vector3()},{entity:{},point:new THREE.Vector3()}];
 for(let n=0;n<180;n++){
  aim.beforeAnimation();group.position.set(n*.01,0,-n*.005);group.rotation.y=Math.sin(n*.01)*.3;
  group.updateMatrixWorld(true);
  targets[0].point.set(-3,.9,4).applyMatrix4(group.matrixWorld);
  targets[1].point.set(3,.5,4).applyMatrix4(group.matrixWorld);
  aim.update(1/60,{active:true,targets,matricesReady:true});model.updateMatrixWorld(true);
 }
 assert.ok(aim.snapshot().arms.every(a=>a.error<.015),'real outlets track world-space targets while parent matrices move');
});
