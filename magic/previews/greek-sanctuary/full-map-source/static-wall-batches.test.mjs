import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {Group,Mesh,BoxGeometry,MeshStandardMaterial,Matrix4,Raycaster,Vector3,PerspectiveCamera,BatchedMesh} from './game/node_modules/three/build/three.module.js';
const three=new URL('./game/node_modules/three/build/three.module.js',import.meta.url).href;
const source=(await fs.readFile(new URL(process.env.MAGIC_STATIC_BATCH_SOURCE||'./static-wall-batches.js',import.meta.url),'utf8')).replace("from 'three'",`from '${three}'`).replace("from './exact-index.js'",`from '${new URL('./exact-index.js',import.meta.url).href}'`);
const {batchStaticWalls,cacheStaticBatchBounds,compactIdentityBatch}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
test('cached static bounds produce Three identical draw lists for camera and shadow views and cutaways',()=>{
 const batch=new BatchedMesh(8,24,36,new MeshStandardMaterial()),g=batch.addGeometry(new BoxGeometry()),matrix=new Matrix4();batch.sortObjects=false;
 for(let i=0;i<8;i++){const id=batch.addInstance(g);batch.setMatrixAt(id,matrix.makeTranslation((i-3)*4,0,-10-i));}
 const reference=BatchedMesh.prototype.onBeforeRender;cacheStaticBatchBounds(batch);
 const camera=new PerspectiveCamera(50,1,.1,100),list=()=>Array.from(batch._indirectTexture.image.data.slice(0,batch._multiDrawCount));
 for(const [x,z,hide] of [[0,0,false],[12,4,true],[-18,-4,false],[0,-30,true]]){
  camera.position.set(x,3,z);camera.lookAt(0,0,-15);camera.updateMatrixWorld();batch.setVisibleAt(3,!hide);
  reference.call(batch,null,null,camera,batch.geometry,batch.material);const expected=list();batch.onBeforeRender(null,null,camera,batch.geometry,batch.material);assert.deepEqual(list(),expected);
  batch.onBeforeShadow(null,null,null,camera,batch.geometry,batch.material);assert.deepEqual(list(),expected);
 }
});
test('batched masonry preserves transforms, original raycasts and independent parent cutaways',()=>{
 const root=new Group(),material=new MeshStandardMaterial(),geometry=new BoxGeometry(),sources=[];
 for(let i=0;i<4;i++){const owner=new Group(),mesh=new Mesh(geometry,material);owner.position.set(i*3,0,-5);mesh.position.y=1;mesh.castShadow=mesh.receiveShadow=true;owner.add(mesh);root.add(owner);sources.push(mesh);}
 root.updateMatrixWorld(true);const owners=sources.map(m=>m.parent),matrices=sources.map(m=>m.matrixWorld.clone()),b=batchStaticWalls(root,sources),batch=root.children.find(m=>m.isBatchedMesh);assert.equal(b.meshes,4);assert.equal(b.groups,1);
 assert.equal(sources[0].geometry.attributes.position.array.buffer,batch.geometry.attributes.position.array.buffer);const matrix=new Matrix4();sources.forEach((m,i)=>{batch.getMatrixAt(i,matrix);assert.deepEqual(matrix.elements,matrices[i].elements);assert.equal(m.layers.mask,(1<<31)>>>0);});
 const ray=new Raycaster(new Vector3(0,1,0),new Vector3(0,0,-1));ray.layers.enable(31);assert(ray.intersectObjects(sources).length>0);
 owners[1].visible=false;b.update();assert.equal(batch.getVisibleAt(0),true);assert.equal(batch.getVisibleAt(1),false);owners[1].visible=true;b.update();assert.equal(batch.getVisibleAt(1),true);
});
test('custom shaders and transparent or animated geometry retain their original path',()=>{const root=new Group(),m=new MeshStandardMaterial();m.onBeforeCompile=()=>{};const list=Array.from({length:4},()=>new Mesh(new BoxGeometry(),m));list.forEach(o=>root.add(o));assert.equal(batchStaticWalls(root,list).groups,0);assert(list.every(o=>o.layers.mask===1));});
test('explicit world-baked shaders only batch identity sources, preserving their coordinates',()=>{
 const root=new Group(),material=new MeshStandardMaterial();material.onBeforeCompile=()=>{};material.userData.worldBakedBatch=true;
 const list=Array.from({length:4},()=>new Mesh(new BoxGeometry(),material));list[3].position.x=7;list.forEach(o=>root.add(o));
 const b=batchStaticWalls(root,list);assert.equal(b.meshes,3);assert.equal(list[3].layers.mask,1);assert.equal(list[3].matrixAutoUpdate,false);assert.equal(list[3].matrixWorld.elements[12],7);
 const batch=root.children.find(o=>o.isBatchedMesh),matrix=new Matrix4();for(let i=0;i<3;i++){batch.getMatrixAt(i,matrix);assert(matrix.equals(new Matrix4()));}assert.equal(batch.material,material);
});


test('compact index streams match every original triangle across colour, shadow and cutaway changes',()=>{
 const batch=new BatchedMesh(4,96,144,new MeshStandardMaterial()),matrix=new Matrix4();batch.sortObjects=false;
 for(let i=0;i<4;i++){const geometry=batch.addGeometry(new BoxGeometry().translate(i*4-6,0,-12));const id=batch.addInstance(geometry);batch.setMatrixAt(id,matrix);}
 cacheStaticBatchBounds(batch);batch.computeBoundingBox();batch.computeBoundingSphere();const compact=compactIdentityBatch(batch);assert(compact);
 const cameras=[new PerspectiveCamera(50,1,.1,100),new PerspectiveCamera(30,1,.1,100)];cameras[1].position.set(9,8,4);
 for(const hide of [false,true,false])for(const camera of cameras){camera.lookAt(0,0,-12);camera.updateMatrixWorld();batch.setVisibleAt(2,!hide);compact.onBeforeRender(null,null,camera);
  const expected=[];for(let j=0;j<batch._multiDrawCount;j++){const start=batch._multiDrawStarts[j]/batch.geometry.index.array.BYTES_PER_ELEMENT;expected.push(...batch.geometry.index.array.slice(start,start+batch._multiDrawCounts[j]));}
  assert.deepEqual(Array.from(compact.geometry.index.array.slice(0,compact.geometry.drawRange.count)),expected);
  const version=compact.geometry.index.version;compact.onBeforeRender(null,null,camera);assert.equal(compact.geometry.index.version,version,'unchanged visibility must not upload indices');
 }
 assert.equal(compact.geometry.attributes.position,batch.geometry.attributes.position);assert.equal(compact.material,batch.material);
 batch.setMatrixAt(0,matrix.makeTranslation(1,0,0));assert.equal(compactIdentityBatch(batch),null,'non-identity geometry keeps the original transform path');
});

test('alternating colour and shadow cameras retain independent unchanged GPU draw-ID sources',()=>{
 const batch=new BatchedMesh(12,24,36,new MeshStandardMaterial()),geometry=batch.addGeometry(new BoxGeometry()),matrix=new Matrix4();batch.sortObjects=false;
 for(let i=0;i<12;i++)batch.setMatrixAt(batch.addInstance(geometry),matrix.makeTranslation((i-5)*3,0,-12-i));
 const base=batch._indirectTexture,cameras=[new PerspectiveCamera(32,1,.1,100),new PerspectiveCamera(95,1,.1,100)];cameras[1].position.set(8,9,5);cameras.forEach(c=>{c.lookAt(0,0,-18);c.updateMatrixWorld();});
 cacheStaticBatchBounds(batch);const textures=[],versions=[],lists=[];
 for(const camera of cameras){batch.onBeforeRender(null,null,camera,batch.geometry,batch.material);textures.push(batch._indirectTexture);versions.push(batch._indirectTexture.version);lists.push(Array.from(batch._indirectTexture.image.data.slice(0,batch._multiDrawCount)));batch.onAfterRender();}
 assert.notDeepEqual(lists[0],lists[1]);assert.notEqual(textures[0],textures[1]);
 for(let i=0;i<16;i++)for(let j=0;j<2;j++){batch.onBeforeRender(null,null,cameras[j],batch.geometry,batch.material);assert.equal(batch._indirectTexture,textures[j]);assert.equal(textures[j].version,versions[j],'unchanged view must not request another upload');assert.deepEqual(Array.from(batch._indirectTexture.image.data.slice(0,batch._multiDrawCount)),lists[j]);batch.onAfterRender();assert.equal(batch._indirectTexture,base);}
 batch.setVisibleAt(5,false);for(const camera of cameras){BatchedMesh.prototype.onBeforeRender.call(batch,null,null,camera,batch.geometry,batch.material);const expected=Array.from(batch._indirectTexture.image.data.slice(0,batch._multiDrawCount));batch.onBeforeRender(null,null,camera,batch.geometry,batch.material);assert.deepEqual(Array.from(batch._indirectTexture.image.data.slice(0,batch._multiDrawCount)),expected);batch.onAfterRender();}batch.dispose();
});
test('temporary view streams are bounded and disposed with their batch',()=>{
 const batch=new BatchedMesh(4,24,36,new MeshStandardMaterial()),geometry=batch.addGeometry(new BoxGeometry());batch.sortObjects=false;for(let i=0;i<4;i++)batch.addInstance(geometry);cacheStaticBatchBounds(batch);let disposed=0;
 for(let i=0;i<7;i++){const camera=new PerspectiveCamera(50,1,.1,100);camera.position.z=5+i;camera.updateMatrixWorld();batch.onBeforeRender(null,null,camera,batch.geometry,batch.material);batch._indirectTexture.addEventListener('dispose',()=>disposed++);batch.onAfterRender();}
 assert.equal(disposed,3,'only four camera streams remain live');batch.dispose();assert.equal(disposed,7);
});
