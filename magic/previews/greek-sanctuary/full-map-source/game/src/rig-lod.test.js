import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createRigLod, rigLodLevel } from './rig-lod.js';

test('multi-material glTF children inherit their original LOD node',()=>{
  const group=new THREE.Group(),model=new THREE.Group();group.add(model);
  const normal=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshBasicMaterial());normal.userData.redesignLod=1;model.add(normal);
  const far=new THREE.Group();far.userData.redesignLod=2;model.add(far);
  const exterior=new THREE.Mesh(normal.geometry,normal.material),lining=new THREE.Mesh(normal.geometry,normal.material);far.add(exterior,lining);
  const controller=createRigLod(group,model,{height:1.85,closeFile:'unused.glb'});
  assert.equal(exterior.userData.redesignLod,2);assert.equal(lining.userData.redesignLod,2);
  assert.equal(normal.visible,true);assert.equal(exterior.visible,false);assert.equal(lining.visible,false);
  const camera=new THREE.PerspectiveCamera(60,1,.1,100);camera.position.set(0,1,20);camera.lookAt(0,1,0);camera.updateMatrixWorld();group.updateMatrixWorld();
  const previous=globalThis.innerHeight;globalThis.innerHeight=1000;
  try{controller.update(camera);assert.equal(group.userData.redesignLod,2);assert.equal(normal.visible,false);assert.equal(exterior.visible,true);assert.equal(lining.visible,true)}
  finally{if(previous===undefined)delete globalThis.innerHeight;else globalThis.innerHeight=previous;controller.dispose();normal.geometry.dispose();normal.material.dispose()}
});

test('mesh-local metadata takes priority and lookup stops at its model',()=>{
  const outside=new THREE.Group();outside.userData.redesignLod=2;
  const model=new THREE.Group(),child=new THREE.Group(),mesh=new THREE.Mesh();outside.add(model);model.add(child);child.add(mesh);
  assert.equal(rigLodLevel(mesh,model),1);
  child.userData.redesignLod=2;assert.equal(rigLodLevel(mesh,model),2);
  mesh.userData.redesignLod=0;assert.equal(rigLodLevel(mesh,model),0);
});

test('a streamed far rig preserves hysteresis when its normal surface arrives',()=>{
 const group=new THREE.Group(),model=new THREE.Group();group.add(model);const geometry=new THREE.BufferGeometry(),material=new THREE.MeshBasicMaterial();
 for(const level of [1,2]){const mesh=new THREE.Mesh(geometry,material);mesh.userData.redesignLod=level;model.add(mesh)}
 const controller=createRigLod(group,model,{height:1.4,closeFile:'unused',initialLevel:2});
 const camera=new THREE.OrthographicCamera(-5,5,5,-5,.01,100);camera.position.set(0,.7,10);camera.lookAt(0,.7,0);camera.updateMatrixWorld();group.updateMatrixWorld();
 const previous=globalThis.innerHeight;globalThis.innerHeight=1000;
 try{for(const [pixels,expected] of [[90,2],[120,1],[90,1],[80,2]]){camera.zoom=pixels/140;camera.updateProjectionMatrix();controller.update(camera);assert.equal(group.userData.redesignLod,expected)}}
 finally{if(previous===undefined)delete globalThis.innerHeight;else globalThis.innerHeight=previous;controller.dispose();geometry.dispose();material.dispose()}
});
