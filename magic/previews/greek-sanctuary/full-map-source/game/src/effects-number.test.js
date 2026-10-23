import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';import {createEffects} from './effects.js';
test('continuous heat refreshes one compact label per physical victim; normal hits, expiry and reset remain independent',()=>{
 const original=globalThis.document;globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({strokeText(){},fillText(){}})})};
 const scene=new THREE.Scene(),fx=createEffects(scene),camera=new THREE.PerspectiveCamera(),p=new THREE.Vector3(0,1,2),victim={};
 try{
  const sprites=()=>scene.children.filter(o=>o.isSprite);
  fx.number(p,4.4,undefined,victim);const first=sprites()[0];let disposed=0;first.material.addEventListener('dispose',()=>disposed++);
  for(let i=0;i<100;i++){p.x=i*.01;fx.number(p,i%2?4.4:6,undefined,victim);fx.update(.1,camera);assert.equal(sprites().length,1);assert.equal(sprites()[0],first);assert.equal(first.position.x,p.x);}
  assert.equal(first.scale.x,1.25);assert.equal(disposed,0);
  fx.number(p,17);assert.equal(sprites().length,2);assert.equal(sprites()[1].scale.x,2.1);
  fx.update(1.1,camera);assert.equal(sprites().length,0);assert.equal(disposed,0);
  fx.number(p,4.4,undefined,victim);assert.equal(sprites().length,1);assert.equal(sprites()[0],first);assert.equal(sprites()[0].material.opacity,1);fx.clear();assert.equal(sprites().length,0);
 }finally{fx.clear();if(original===undefined)delete globalThis.document;else globalThis.document=original;}
});

test('expired rings reuse geometry and materials without shader disposal',()=>{
 const scene=new THREE.Scene(),fx=createEffects(scene),camera=new THREE.PerspectiveCamera(),p=new THREE.Vector3();
 fx.ring(p,0x123456,3,.2);const first=scene.children.find(o=>o.isMesh&&o.geometry.type==='RingGeometry');let disposed=0;first.material.addEventListener('dispose',()=>disposed++);
 fx.update(.3,camera);fx.ring(p,0xff9900,4,.2);const next=scene.children.find(o=>o.isMesh&&o.geometry.type==='RingGeometry');
 assert.equal(disposed,0);assert.equal(next.geometry,first.geometry);assert.equal(next.material,first.material);assert.equal(next.material.color.getHex(),0xff9900);assert.equal(next.material.opacity,.8);fx.clear();
});

test('effect pools bound idle retention without dropping concurrent rings',()=>{
 const scene=new THREE.Scene(),fx=createEffects(scene),camera=new THREE.PerspectiveCamera(),p=new THREE.Vector3();
 for(let i=0;i<40;i++)fx.ring(p);
 assert.equal(fx.poolSnapshot().activeRings,40);fx.update(1,camera);assert.equal(fx.poolSnapshot().idleRings,16);fx.clear();
 assert.equal(fx.poolSnapshot().activeRings,0);assert(fx.preparationObjects.some(o=>o.isSprite));
});
