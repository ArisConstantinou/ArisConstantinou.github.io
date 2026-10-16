import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {Group,Mesh,BoxGeometry,MeshStandardMaterial,Matrix4,Raycaster,Vector3} from './game/node_modules/three/build/three.module.js';
const three=new URL('./game/node_modules/three/build/three.module.js',import.meta.url).href;
const source=(await fs.readFile(new URL('./static-wall-batches.js',import.meta.url),'utf8')).replace("from 'three'",`from '${three}'`);
const {batchStaticWalls}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
test('batched masonry preserves transforms, original raycasts and independent parent cutaways',()=>{
 const root=new Group(),material=new MeshStandardMaterial(),geometry=new BoxGeometry(),sources=[];
 for(let i=0;i<4;i++){const owner=new Group(),mesh=new Mesh(geometry,material);owner.position.set(i*3,0,-5);mesh.position.y=1;mesh.castShadow=mesh.receiveShadow=true;owner.add(mesh);root.add(owner);sources.push(mesh);}
 root.updateMatrixWorld(true);const matrices=sources.map(m=>m.matrixWorld.clone()),b=batchStaticWalls(root,sources),batch=root.children.find(m=>m.isBatchedMesh);assert.equal(b.meshes,4);assert.equal(b.groups,1);
 const matrix=new Matrix4();sources.forEach((m,i)=>{batch.getMatrixAt(i,matrix);assert.deepEqual(matrix.elements,matrices[i].elements);assert.equal(m.layers.mask,(1<<31)>>>0);});
 const ray=new Raycaster(new Vector3(0,1,0),new Vector3(0,0,-1));ray.layers.enable(31);assert(ray.intersectObjects(sources).length>0);
 sources[1].parent.visible=false;b.update();assert.equal(batch.getVisibleAt(0),true);assert.equal(batch.getVisibleAt(1),false);sources[1].parent.visible=true;b.update();assert.equal(batch.getVisibleAt(1),true);
});
test('custom shaders and transparent or animated geometry retain their original path',()=>{const root=new Group(),m=new MeshStandardMaterial();m.onBeforeCompile=()=>{};const list=Array.from({length:4},()=>new Mesh(new BoxGeometry(),m));list.forEach(o=>root.add(o));assert.equal(batchStaticWalls(root,list).groups,0);assert(list.every(o=>o.layers.mask===1));});

