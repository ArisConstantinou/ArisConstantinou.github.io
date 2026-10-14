import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {createRigSurfacePreparer} from './rig-surface-preparation.js';
test('shared original textures upload once and colour variants finish before surface installation',async()=>{
 const texture=new THREE.Texture(),image=texture.image,object=new THREE.Group();object.add(new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshStandardMaterial({map:texture,roughnessMap:texture})));
 const target={},hdr={},camera={},scene={},events=[];let current=target,resolve;const blocker=new Promise(r=>resolve=r);
 const prepare=createRigSurfacePreparer({camera,scene,renderTargets:[hdr,hdr],nextFrame:async()=>events.push('frame'),renderer:{initTexture:t=>{assert.equal(t,texture);events.push('upload')},getRenderTarget:()=>current,setRenderTarget:t=>current=t,compileAsync:async(o,c,s)=>{assert.equal(o,object);assert.equal(c,camera);assert.equal(s,scene);events.push(current===hdr?'hdr':'screen');await blocker}}});
 let finished=false;const job=prepare(object).then(()=>finished=true);await new Promise(setImmediate);assert.equal(finished,false);assert.equal(current,target);assert.deepEqual(events,['frame','upload','screen']);resolve();await job;
 assert.deepEqual(events,['frame','upload','screen','hdr']);assert.equal(texture.image,image);assert.equal(current,target);await prepare(object);assert.equal(events.filter(e=>e==='upload').length,1);
});
test('failed precompilation restores the current target and does not strand the following job',async()=>{
 const target={},object=new THREE.Group();let current=target,count=0;const prepare=createRigSurfacePreparer({renderer:{getRenderTarget:()=>current,setRenderTarget:t=>current=t,compileAsync:()=>{if(count++===0)throw Error('shader failure');return Promise.resolve()}},scene:{},camera:{}});
 await assert.rejects(prepare(object),/shader failure/);assert.equal(current,target);await prepare(object);assert.equal(current,target);
});
test('detailed skinned sorting bounds match the original calculation and survive cloning',async()=>{
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,1,0,0,0,2,0,-1,-1,0,0,0,3],3));
 geometry.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(new Array(20).fill(0),4));const weights=new Array(20).fill(0);for(let i=0;i<5;i++)weights[i*4]=1;geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));
 const bone=new THREE.Bone(),mesh=new THREE.SkinnedMesh(geometry,new THREE.MeshBasicMaterial());mesh.add(bone);mesh.bind(new THREE.Skeleton([bone]));bone.position.set(.2,.3,.4);mesh.updateMatrixWorld(true);mesh.computeBoundingSphere();const expected=mesh.boundingSphere.clone(),original=geometry.attributes.position.array.slice();mesh.boundingSphere=null;
 let frames=0;await createRigSurfacePreparer({boundBatch:2,nextFrame:async()=>frames++,renderer:{},scene:{},camera:{}})(mesh);
 assert.equal(frames,3);assert.ok(mesh.boundingSphere.equals(expected));assert.ok(mesh.clone(false).boundingSphere.equals(expected));assert.deepEqual(geometry.attributes.position.array,original);geometry.dispose();mesh.material.dispose();mesh.skeleton.dispose();
});
