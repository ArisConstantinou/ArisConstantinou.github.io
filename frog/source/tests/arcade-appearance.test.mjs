import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3,Vector3} from 'three';
import {createCreature} from '../src/creatures.js';
import {configureArcadeAppearance,applyArcadeAppearance} from '../src/arcade-appearance.js';

const LIMBS=['hip-1','hip1','knee-1','knee1','ankle-1','ankle1','foot-1','foot1','shoulder-1','shoulder1','elbow-1','elbow1','wrist-1','wrist1'];
function frog(t,options={}){const model=createCreature('frog',{seed:7,role:'hunter',tier:1,level:1,...options});t.after(()=>model.dispose());return model;}
function pose(model,load,hop={phase:'idle',progress:0},extra={}){
 model.update(1/60,{time:3,speed:hop.phase==='air'?8.8:0,hop,...extra});applyArcadeAppearance(model,{load,spit:extra.spit||0});
 model.group.updateMatrixWorld(true);model.skeleton.update();
 return model;
}
function bounds(model,onlyBones){
 const box=new Box3(),point=new Vector3(),geometry=model.mesh.geometry,indices=geometry.attributes.skinIndex,weights=geometry.attributes.skinWeight;
 for(let i=0;i<geometry.attributes.position.count;i++){
  if(onlyBones&&!Array.from({length:4},(_,j)=>weights.array[i*4+j]>.05&&onlyBones.has(model.skeleton.bones[indices.array[i*4+j]].name)).some(Boolean))continue;
  model.mesh.getVertexPosition(i,point);point.applyMatrix4(model.mesh.matrixWorld);
  assert.ok(point.toArray().every(Number.isFinite),'every skinned vertex remains finite');box.expandByPoint(point);
 }
 return box;
}
const size=box=>box.getSize(new Vector3());
const joints=model=>LIMBS.map(name=>({name,matrix:model.bones[name].matrixWorld.toArray(),rotation:model.bones[name].quaternion.toArray()}));

test('sixty flies leave actual torso and limb proportions unchanged, with only a small throat cue',t=>{
 const model=configureArcadeAppearance(frog(t)),torsoBones=new Set(['spine','head','shoulder-1','shoulder1']),throatBones=new Set(['throat']);
 for(const lod of [0,1,2]){
  model.setRenderLOD(lod);pose(model,0);
  const empty={body:size(bounds(model)),torso:size(bounds(model,torsoBones)),throat:size(bounds(model,throatBones)),joints:joints(model)};
  pose(model,1);const full={body:size(bounds(model)),torso:size(bounds(model,torsoBones)),throat:size(bounds(model,throatBones)),joints:joints(model)};
  assert.deepEqual(full.joints,empty.joints,'loading must not stretch shoulders, arms, thighs or feet');
  assert.ok(full.torso.distanceTo(empty.torso)<1e-9,'the torso does not inflate with ammo');
  assert.ok(full.body.x<=empty.body.x*1.01&&full.body.y<=empty.body.y*1.04&&full.body.z<=empty.body.z*1.04,'loaded silhouette stays squat');
  assert.ok(full.throat.x>empty.throat.x*1.05&&full.throat.x<empty.throat.x*1.12,'a small local pouch still communicates fill');
  assert.ok(full.throat.y>empty.throat.y*1.05&&full.throat.y<empty.throat.y*1.18);
  assert.ok(full.torso.x<1.12,'the former nearly two-unit inflated torso cannot return');
 }
});

test('all arcade teams share natural proportions, including the purple bruiser role',t=>{
 const models=['hunter','hunter','bruiser'].map(role=>configureArcadeAppearance(frog(t,{role}))),sizes=models.map(model=>size(bounds(pose(model,1))));
 for(const measured of sizes.slice(1))assert.ok(measured.distanceTo(sizes[0])<1e-9,'team role cannot enlarge the body');
 assert.ok(sizes[0].x>1.45&&sizes[0].x<1.7&&sizes[0].y<.9,'retain the original broad, low frog stance');
});

test('full magazines stay planted without an ammo-dependent vertical lift at all arcade seeds and LODs',t=>{
 for(const seed of [7,46,85]){
  const model=configureArcadeAppearance(frog(t,{seed,role:seed===85?'bruiser':'hunter'}));
  for(const lod of [0,1,2])for(const load of [0,.5,1]){
   model.setRenderLOD(lod);pose(model,load);const box=bounds(model);
   assert.ok(box.min.y>=-.035&&box.min.y<.04,`seed ${seed}, LOD ${lod}, load ${load}: feet remain on the floor (${box.min.y})`);
   assert.ok(box.max.y<.9,'the back remains low rather than standing upright');
  }
 }
});

test('ammo appearance preserves paired hop and kick poses across the actual skinned rig',t=>{
 const model=configureArcadeAppearance(frog(t));model.setRenderLOD(1);
 const phases=[{phase:'idle',progress:0},{phase:'air',progress:0},{phase:'air',progress:.16},{phase:'air',progress:.7},{phase:'air',progress:1},{phase:'land',progress:.5}];
 for(const hop of phases)for(const attack of [null,{type:'kick',phase:.5}]){
  pose(model,0,hop,{attack});const empty=joints(model),body=size(bounds(model));
  pose(model,1,hop,{attack});assert.deepEqual(joints(model),empty,'full ammo must not alter planted or airborne joints');
  const loaded=size(bounds(model));assert.ok(loaded.distanceTo(body)<.09,'pouch deformation cannot change the whole movement silhouette');
 }
 pose(model,1,{phase:'air',progress:.16});const extended=model.bones.knee1.rotation.x;
 pose(model,1,{phase:'air',progress:.7});assert.ok(Math.abs(model.bones.knee1.rotation.x-extended)>.1,'the actual hop still folds and extends');
});

test('shot articulation moves the real mouth while limbs and subsequent idle pose stay stable',t=>{
 const model=configureArcadeAppearance(frog(t));pose(model,1);const before=model.mouthWorld(),limbs=joints(model),idleThroat=model.bones.throat.scale.clone();
 pose(model,1,undefined,{spit:1});assert.ok(model.mouthWorld().distanceTo(before)>.02,'mouth attachment retains the spit animation');assert.deepEqual(joints(model),limbs);
 pose(model,1);assert.ok(model.mouthWorld().distanceTo(before)<1e-9);assert.ok(model.bones.throat.scale.distanceTo(idleThroat)<1e-9,'frame reset prevents accumulating inflation');
});

test('arcade profile never changes shared creature geometry, generic roles or another instance',t=>{
 const arcade=frog(t,{role:'bruiser'}),generic=frog(t,{role:'bruiser'}),original=generic.group.getObjectByName('anatomical-animation-pivot').scale.clone(),geometry=generic.mesh.geometry,vertices=geometry.attributes.position.array.slice(),coat=generic.mesh.material.clearcoat;
 configureArcadeAppearance(arcade);pose(arcade,1);
 assert.equal(arcade.mesh.geometry,geometry,'shared geometry does not need a fork');assert.deepEqual(geometry.attributes.position.array,vertices);
 assert.ok(generic.group.getObjectByName('anatomical-animation-pivot').scale.equals(original));assert.equal(generic.mesh.material.clearcoat,coat);assert.ok(arcade.mesh.material.clearcoat<coat,'only arcade skin has the softer finish');
 assert.equal(generic.bones.throat.scale.x,1,'other creatures never receive arcade ammo deformation');
});
