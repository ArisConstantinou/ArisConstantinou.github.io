import './model-environment.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../vendor/three.module.js';
import {createAssetLibrary} from '../feouda-assets.js';
import {createMaterials} from '../feouda-materials.js';
import {createFortress,setFortressState} from '../feouda-models.js';
import {REGIONS} from '../feouda-data.js';
import {createGame,worldObstacles} from '../feouda-engine.js';
import {FORT_WALL_OPEN_RATIOS,FORT_GATE_OPEN_RATIO,IMPACT_FRAGMENT_LIMIT,IMPACT_DUST_LIMIT,getSiegePresentationPose,createImpactBurst,setImpactBurst,disposeImpactBurst} from '../feouda-siege-presentation.js';

const materials=createMaterials(),assets=createAssetLibrary();await assets.ready;
assert.equal(assets.getStats().failed.length,0,'The actual repository models must decode');
const detailed=REGIONS.map(region=>({region,fort:createFortress(region,materials,assets)}));
const ratios=[1,.8,.799,.55,.549,.30,.299,.17001,.17,.16001,.16,.03501,.035,.0001,0,1];
const close=(a,b,label='')=>assert.ok(Math.abs(a-b)<1e-6,`${label}: ${a} != ${b}`);
function resources(object){const geometries=new Set(),mats=new Set();let meshes=0;object.traverse(node=>{if(!node.isMesh)return;meshes++;geometries.add(node.geometry);for(const m of Array.isArray(node.material)?node.material:[node.material])mats.add(m);});let bytes=0,triangles=0;for(const g of geometries){triangles+=(g.index?.count||g.attributes.position.count)/3;for(const attribute of Object.values(g.attributes))bytes+=(attribute.array||attribute.data?.array).byteLength;bytes+=g.index?.array.byteLength||0;}return{meshes,geometryCount:geometries.size,materials:mats.size,bytes,triangles:Math.round(triangles),geometries};}
function visibleMeshCount(object){let count=0;object.traverseVisible(node=>{if(node.isMesh)count++;});return count;}
function solidAtLocal(wall,x,y){wall.updateWorldMatrix(true,true);const origin=new THREE.Vector3(x,y,-5).applyMatrix4(wall.matrixWorld),direction=new THREE.Vector3(0,0,1).transformDirection(wall.matrixWorld),meshes=[];wall.traverseVisible(node=>{if(node.isMesh)meshes.push(node);});return new THREE.Raycaster(origin,direction,0,10).intersectObjects(meshes,false).length>0;}

test('Every fortress damage opening matches the existing navigation thresholds',()=>{
 const game=createGame({storage:null});
 for(const {region,fort}of detailed)for(const ratio of ratios){
  const control=game.state.regions[region.id];control.fortHp=control.maxFortHp*ratio;setFortressState(fort,control,materials);
  const expectedWalls=FORT_WALL_OPEN_RATIOS.reduce((sum,threshold,i)=>sum+(ratio>threshold?(i===2?2:1):0),0),obstacles=worldObstacles(game.state).filter(o=>o.regionId===region.id&&o.source==='fort');
  assert.equal(obstacles.filter(o=>o.part==='wall').length,expectedWalls,`${region.id} ${ratio}`);
  assert.equal(obstacles.some(o=>o.part==='gate'),ratio>FORT_GATE_OPEN_RATIO);
  for(const [i,wall]of fort.userData.damageWalls.entries()){
   const data=wall.userData.fortDamage;assert.equal(data.solid,ratio>FORT_WALL_OPEN_RATIOS[i]);
   assert.equal([data.original,...data.stages].filter(group=>group.visible).length,data.solid?1:0);
   // Every closed wall keeps real masonry at person height. Parapet damage is
   // never presented as a passable whole-height opening before engine unlock.
   if(data.solid)assert.ok(solidAtLocal(wall,i===2?data.length*.27:0,1.6),`${region.id} wall ${i} at ${ratio}`);
  }
  const gate=fort.userData.damageWalls[2].children.find(child=>child.userData.gate);assert.equal(gate.visible,ratio>FORT_GATE_OPEN_RATIO);assert.equal(gate.userData.damageStages.filter(s=>s.visible).length,1);
  if(ratio<=FORT_GATE_OPEN_RATIO)assert.equal(solidAtLocal(fort.userData.damageWalls[2],0,1.6),false,`${region.id} open gate must remain clear`);
 }
});

test('Damage preserves real UVs and normals while keeping owned geometry bounded',()=>{
 let bytes=0,triangles=0,maximumVisible=0;
 for(const {region,fort}of detailed){
  const stats=resources(fort);bytes+=stats.bytes;triangles+=stats.triangles;
  for(const wall of fort.userData.damageWalls)for(const group of wall.userData.fortDamage.stages)group.traverse(mesh=>{
   if(!mesh.isMesh)return;const g=mesh.geometry;assert.equal(g.attributes.uv.count,g.attributes.position.count);assert.equal(g.attributes.normal.count,g.attributes.position.count);
   for(const value of g.attributes.position.array)assert.ok(Number.isFinite(value));for(const value of g.attributes.normal.array)assert.ok(Number.isFinite(value));
  });
  for(const ratio of[1,.7,.4,.2,0]){setFortressState(fort,{owner:region.owner,fortHp:ratio,maxFortHp:1},materials);maximumVisible=Math.max(maximumVisible,visibleMeshCount(fort));}
  assert.ok(stats.bytes<22*1024*1024,`${region.id} precomputed geometry budget`);
 }
 assert.ok(bytes<110*1024*1024,'All nine forts fit the measured geometry budget');
 console.log('Fortress presentation geometry:',JSON.stringify({fortresses:detailed.length,geometryBytes:bytes,triangles,maximumVisibleMeshesPerFort:maximumVisible}));
});

test('Repeated damage, repair and save-derived state updates do not allocate more scene objects',()=>{
 for(const {region,fort}of detailed){
  const before=resources(fort),ids=[];fort.traverse(o=>ids.push(o.uuid));
  for(let i=0;i<120;i++)setFortressState(fort,{owner:region.owner,fortHp:(i%11)/10,maxFortHp:1},materials);
  setFortressState(fort,JSON.parse(JSON.stringify({owner:'player',fortHp:1,maxFortHp:1})),materials);
  const after=resources(fort),afterIds=[];fort.traverse(o=>afterIds.push(o.uuid));assert.deepEqual(afterIds,ids);assert.equal(after.bytes,before.bytes);assert.equal(after.geometryCount,before.geometryCount);
  assert.equal(fort.userData.fortDamage.stage,'intact');assert.equal(fort.userData.rubble.visible,false);assert.ok(fort.userData.rubble.userData.pieces.every(piece=>!piece.visible));
  for(const wall of fort.userData.damageWalls){assert.equal(wall.userData.fortDamage.original.visible,true);assert.ok(wall.userData.fortDamage.scars.every(s=>!s.visible));}
 }
});

test('Rubble and broken gate boards stay low and out of the gate opening',()=>{
 for(const {fort}of detailed){
  const rubble=fort.userData.rubble.userData;for(const piece of rubble.pieces){rubble.batch.geometry.computeBoundingBox();const box=rubble.batch.geometry.boundingBox.clone().applyMatrix4(piece.matrix);assert.ok(box.max.y<.16,'Rubble is ground litter, not a new unmodelled obstacle');}
  const gateWall=fort.userData.damageWalls[2],broken=gateWall.children.find(child=>child.userData.gateRubble);broken.updateWorldMatrix(true,true);
  // Coordinates in the original wall frame keep the required central passage.
  const inverse=gateWall.matrixWorld.clone().invert();broken.traverse(mesh=>{if(!mesh.isMesh)return;const p=new THREE.Vector3();for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,p).applyMatrix4(mesh.matrixWorld).applyMatrix4(inverse);assert.ok(Math.abs(p.x)>2.1);assert.ok(p.y<.16);}});
 }
});

for(const type of['ram','trebuchet'])test(`${type}: the authored machine reaches contact once and never loops its recovery`,()=>{
 const model=assets.createAnimated('siege',type,{width:4.4,depth:7.1,height:type==='ram'?4.3:8.5}),info=model.userData.animationInfo,contact=type==='ram'?info.attackDuration*7/15:info.releaseAt;
 let previous=-1;
 for(const phase of['windup','release','recovery'])for(let i=0;i<=20;i++){
  const cycle={id:'strike:1',phase,phaseProgress:i/20},pose=getSiegePresentationPose(type,cycle,info);assert.equal(pose.loop,false);assert.ok(pose.time>=previous-1e-7);previous=pose.time;
  if(phase==='release'&&i===0)close(pose.time,contact);
  model.userData.poseClip(pose.clip,pose.time,pose.loop);assert.equal(model.userData.animationState().loop,false);
  const transforms=[];model.traverse(node=>transforms.push(...node.position.toArray(),...node.quaternion.toArray()));assert.ok(transforms.every(Number.isFinite));
  const same=getSiegePresentationPose(type,{...cycle,paused:true},info);assert.deepEqual(same,pose);model.userData.poseClip(same.clip,same.time,false);const paused=[];model.traverse(node=>paused.push(...node.position.toArray(),...node.quaternion.toArray()));assert.deepEqual(paused,transforms);
 }
 close(previous,info.attackDuration);assert.equal(getSiegePresentationPose(type,null,info).clip,'idle');assert.equal(getSiegePresentationPose(type,{phase:'windup',phaseProgress:.5},info,true).clip,'idle');
 model.userData.poseClip('attack',contact,false);
 if(type==='ram')close(model.getObjectByName('weapon').position.z,2.2047250270843506,'Authored ram contact');
 else{assert.equal(getSiegePresentationPose(type,{phase:'release',phaseProgress:0},info).loaded,false);assert.equal(getSiegePresentationPose(type,{phase:'recovery',phaseProgress:1},info).loaded,true);}
 model.userData.disposeAnimation();
});

function particleSnapshot(root){const data=root.userData.impactBurst;return{position:root.position.toArray(),opacity:data.dustMaterial.opacity,fragments:data.fragments.map(({mesh})=>[...mesh.position.toArray(),...mesh.rotation.toArray(),...mesh.scale.toArray()]),dust:data.dust.map(({mesh})=>[...mesh.position.toArray(),...mesh.scale.toArray()])};}
test('Impact bursts use a fixed geometry budget and authoritative age, including pause and replay',()=>{
 const effect={id:'actual-impact:24',targetKind:'region',x:3,z:8,age:.28,life:1.1,intensity:135},a=createImpactBurst(effect,materials),b=createImpactBurst(effect,materials),args={x:3,y:5,z:8,groundY:2,cameraQuaternion:new THREE.Quaternion()};
 assert.equal(a.userData.impactBurst.fragments.length,IMPACT_FRAGMENT_LIMIT);assert.equal(a.userData.impactBurst.dust.length,IMPACT_DUST_LIMIT);assert.equal(resources(a).geometryCount,2);
 setImpactBurst(a,effect,args);setImpactBurst(b,effect,args);assert.deepEqual(particleSnapshot(a),particleSnapshot(b));const first=particleSnapshot(a),uuids=[];a.traverse(o=>uuids.push(o.uuid));
 for(let i=0;i<150;i++)setImpactBurst(a,effect,args);assert.deepEqual(particleSnapshot(a),first);const after=[];a.traverse(o=>after.push(o.uuid));assert.deepEqual(after,uuids);
 for(const age of[0,.25,.7,1.1]){setImpactBurst(a,{...effect,age},args);const stats=resources(a);assert.equal(stats.geometryCount,2);for(const f of a.userData.impactBurst.fragments){assert.ok(f.mesh.position.toArray().every(Number.isFinite));assert.ok(f.mesh.position.y+a.position.y>=2);}}
 assert.equal(a.visible,false);disposeImpactBurst(a);disposeImpactBurst(b);
});
test('Every impact releases only its two geometries, texture and dust material exactly once',()=>{
 const effect={id:'one-off',targetKind:'region',x:0,z:0,life:.5},burst=createImpactBurst(effect,materials),d=burst.userData.impactBurst,counts={geometry:0,texture:0,material:0,shared:0};
 for(const g of d.ownedGeometry)g.addEventListener('dispose',()=>counts.geometry++);for(const t of d.ownedTexture)t.addEventListener('dispose',()=>counts.texture++);d.dustMaterial.addEventListener('dispose',()=>counts.material++);
 const shared=()=>counts.shared++;materials.stone.addEventListener('dispose',shared);materials.darkStone.addEventListener('dispose',shared);
 disposeImpactBurst(burst);disposeImpactBurst(burst);assert.deepEqual(counts,{geometry:2,texture:1,material:1,shared:0});materials.stone.removeEventListener('dispose',shared);materials.darkStone.removeEventListener('dispose',shared);
});

test.after(()=>{for(const {fort}of detailed){const owned=new Set();fort.traverse(node=>{node.userData.disposePresentation?.();if(node.geometry&&!node.userData.sharedAsset&&!node.geometry.userData?.sharedPrimitive)owned.add(node.geometry);});for(const g of owned)g.dispose();}assets.dispose();materials.dispose();});
