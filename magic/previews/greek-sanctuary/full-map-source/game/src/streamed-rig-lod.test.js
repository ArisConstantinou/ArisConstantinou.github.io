import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {createStreamedRigLod} from './streamed-rig-lod.js';
function fixture(level){
 const group=new THREE.Group(),model=new THREE.Group(),rig=new THREE.Group();rig.name='Same original rig';model.add(rig);group.add(model);
 const root=new THREE.Bone(),hand=new THREE.Bone();root.name='root';hand.name='hand';hand.position.y=.5;root.add(hand);rig.add(root);
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,1,.5,0,0,1,0],3));
 geometry.setAttribute('skinIndex',new THREE.Uint16BufferAttribute([0,0,0,0,1,0,0,0,1,0,0,0],4));geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute([1,0,0,0,1,0,0,0,1,0,0,0],4));
 const mesh=new THREE.SkinnedMesh(geometry,new THREE.MeshBasicMaterial());mesh.name='surface'+level;mesh.userData.redesignLod=level;rig.add(mesh);group.updateMatrixWorld(true);mesh.bind(new THREE.Skeleton([root,hand]));
 const camera=new THREE.OrthographicCamera(-4.375,4.375,4.375,-4.375,.01,100);camera.position.set(0,.7,10);camera.lookAt(0,.7,0);camera.updateMatrixWorld();
 return {group,model,mesh,root,hand,camera};
}
async function browserGlobals(run){
 const previousHeight=globalThis.innerHeight,previousDocument=globalThis.document;globalThis.innerHeight=1000;globalThis.document={baseURI:'http://127.0.0.1:5173/'};
 try{await run()}finally{if(previousHeight===undefined)delete globalThis.innerHeight;else globalThis.innerHeight=previousHeight;if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument}
}
test('a delayed normal surface shares live actor joints without blanking or duplicating the rig',()=>browserGlobals(async()=>{
 const actor=fixture(2),source=fixture(1);let resolve,calls=0;const pending=new Promise(r=>resolve=r);
 const lod=createStreamedRigLod(actor.group,actor.model,{height:1.4,normalFile:'normal.glb',closeFile:'unused.glb',loadSurface:()=>{calls++;return pending}});
 actor.hand.rotation.z=.65;actor.group.position.set(1,0,0);actor.group.rotation.y=.4;actor.group.updateMatrixWorld(true);
 lod.update(actor.camera);lod.update(actor.camera);assert.equal(calls,1);assert.equal(actor.mesh.visible,true);assert.equal(actor.group.userData.redesignLod,2);
 resolve({scene:source.model});await new Promise(setImmediate);lod.update(actor.camera);actor.group.updateMatrixWorld(true);
 const meshes=[];let bones=0;actor.model.traverse(o=>{if(o.isMesh)meshes.push(o);if(o.isBone)bones++});const normal=meshes.find(o=>o.userData.redesignLod===1);
 assert.equal(bones,2);assert.equal(normal.skeleton,actor.mesh.skeleton);assert.equal(normal.material===source.mesh.material,false);
 assert.equal(normal.visible,true);assert.equal(actor.mesh.visible,false);assert.equal(actor.group.userData.redesignLod,1);
 for(let i=0;i<3;i++){const a=normal.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(normal.matrixWorld),b=actor.mesh.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(actor.mesh.matrixWorld);assert.ok(a.distanceTo(b)<1e-7);}
 lod.dispose();assert.equal(normal.parent,null);assert.equal(actor.mesh.parent!==null,true);assert.equal(source.mesh.parent!==null,true);
}));
test('hidden or small far actors do not fetch the normal surface',()=>browserGlobals(async()=>{
 const actor=fixture(2);let calls=0;const lod=createStreamedRigLod(actor.group,actor.model,{height:1.4,normalFile:'normal.glb',closeFile:'unused',loadSurface:()=>{calls++;return new Promise(()=>{})}});
 actor.group.visible=false;lod.update(actor.camera);actor.group.visible=true;actor.camera.zoom=.4;actor.camera.updateProjectionMatrix();lod.update(actor.camera);
 assert.equal(calls,0);assert.equal(actor.group.userData.redesignLod,2);assert.equal(actor.mesh.visible,true);lod.dispose();
}));
test('removing an actor during a pending surface load never installs orphan geometry',()=>browserGlobals(async()=>{
 const actor=fixture(2),source=fixture(1);let resolve;const pending=new Promise(r=>resolve=r);
 const lod=createStreamedRigLod(actor.group,actor.model,{height:1.4,normalFile:'normal.glb',closeFile:'unused',loadSurface:()=>pending});lod.update(actor.camera);lod.dispose();resolve({scene:source.model});await new Promise(setImmediate);
 const meshes=[];actor.model.traverse(o=>{if(o.isMesh)meshes.push(o)});assert.equal(meshes.length,1);assert.equal(actor.group.userData.normalRigLoaded,false);assert.equal(source.mesh.parent!==null,true);
}));
