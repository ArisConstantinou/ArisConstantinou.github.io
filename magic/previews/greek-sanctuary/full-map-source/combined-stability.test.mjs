import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
import {Group,Mesh,BoxGeometry,MeshStandardMaterial,Raycaster,Vector3} from './game/node_modules/three/build/three.module.js';
const base=new URL('./',import.meta.url);
const file=process.env.MAGIC_STABILITY_BEFORE?new URL('./stability/before/static-wall-batches.js',import.meta.url):new URL('static-wall-batches.js',base);
const code=(await fs.readFile(file,'utf8')).replace("from 'three'",`from '${new URL('./game/node_modules/three/build/three.module.js',import.meta.url).href}'`).replace("from './exact-index.js'",`from '${new URL('exact-index.js',base).href}'`).replace("from './game/src/static-masonry-cache.js'",`from '${new URL('./game/src/static-masonry-cache.js',import.meta.url).href}'`);
const {batchStaticWalls}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
test('render traversal excludes query-only leaves while exact ray hits and owner cutaways survive',()=>{
 const scene=new Group(),root=new Group(),owners=[],sources=[],mat=new MeshStandardMaterial();scene.add(root);
 for(let i=0;i<4;i++){const owner=new Group(),mesh=new Mesh(new BoxGeometry(1,2,1),mat);owner.position.set(i*3,0,-5);mesh.position.y=1;scene.add(owner);root.add(owner);owner.add(mesh);owners.push(owner);sources.push(mesh);}
 scene.updateMatrixWorld(true);const ray=new Raycaster(new Vector3(0,1,0),new Vector3(0,0,-1));ray.layers.enable(31);
 const hits=()=>ray.intersectObjects(sources).map(h=>({distance:h.distance,faceIndex:h.faceIndex,point:h.point.toArray(),uv:h.uv.toArray()})),before=hits(),matrices=sources.map(s=>s.matrixWorld.clone());
 const batches=batchStaticWalls(root,sources),visited=[];scene.traverse(o=>visited.push(o));assert(sources.every(s=>!visited.includes(s)),'query leaves still traverse the render tree');
 scene.updateMatrixWorld(true);assert.deepEqual(hits(),before);sources.forEach((s,i)=>assert(s.matrixWorld.equals(matrices[i])));
 owners[0].visible=false;batches.update();assert.equal(batches.isVisible(sources[0]),false);assert.equal(ray.intersectObjects(sources.filter(batches.isVisible)).length,0);
 owners[0].visible=true;batches.update();assert.deepEqual(hits(),before);root.visible=false;assert.equal(batches.isVisible(sources[1]),false);
});
test('a query mesh with an independently rendered child cannot remove that child from the scene',()=>{
 const root=new Group(),mat=new MeshStandardMaterial(),sources=Array.from({length:4},()=>new Mesh(new BoxGeometry(),mat));sources.forEach(s=>root.add(s));
 const ornament=new Mesh(new BoxGeometry(.2,.2,.2),new MeshStandardMaterial({transparent:true,opacity:.5}));sources[0].add(ornament);root.updateMatrixWorld(true);const world=ornament.matrixWorld.clone();batchStaticWalls(root,sources);root.updateMatrixWorld(true);const nodes=[];root.traverse(o=>nodes.push(o));assert(nodes.includes(ornament));assert(ornament.matrixWorld.equals(world));
});
