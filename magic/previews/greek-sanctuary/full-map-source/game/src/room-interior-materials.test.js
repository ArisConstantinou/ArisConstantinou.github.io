import test from 'node:test';import assert from 'node:assert/strict';
import {MeshStandardMaterial,Texture} from 'three';
import {insideRoomInterior,createInteriorMaterialCache} from './room-interior-materials.js';
test('fast path requires the full bound to lie in one fully opaque room interior',()=>{
 const rects=[{x:0,z:0,w:10,d:10},{x:20,z:0,w:10,d:10}];
 const box=(a,b,c,d)=>({min:{x:a,z:b},max:{x:c,z:d}});
 assert(insideRoomInterior(box(-.249,-.249,10.249,10.249),rects));
 for(const b of [box(-.251,0,1,1),box(0,0,10.251,1),box(0,-.251,1,1),box(0,0,1,10.251),box(2,2,23,3),null])assert(!insideRoomInterior(b,rects));
});
test('interior shader keeps material changes and shared textures, and releases only its derived material',()=>{
 const base=new MeshStandardMaterial({map:new Texture(),color:0xabcdef,roughness:.7});
 const compile=()=>{},cache=createInteriorMaterialCache();let texturesDisposed=0;
 base.map.addEventListener('dispose',()=>texturesDisposed++);
 const a=cache.get(base,compile,'original',1);assert.equal(a.map,base.map);assert.equal(a.onBeforeCompile,compile);assert(a.color.equals(base.color));
 base.color.set(0xff0022);base.opacity=.6;base.metalness=.9;base.needsUpdate=true;
 assert.equal(cache.get(base,compile,'original',2),a);assert(a.color.equals(base.color));assert.equal(a.opacity,.6);assert.equal(a.metalness,.9);assert.equal(a.onBeforeCompile,compile);
 let disposed=0;a.addEventListener('dispose',()=>disposed++);base.dispose();assert.equal(disposed,1);assert.equal(texturesDisposed,0);cache.dispose();assert.equal(disposed,1);
});
