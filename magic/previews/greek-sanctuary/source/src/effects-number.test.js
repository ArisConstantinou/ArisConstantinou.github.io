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
  fx.update(1.1,camera);assert.equal(sprites().length,0);assert.equal(disposed,1);
  fx.number(p,4.4,undefined,victim);assert.equal(sprites().length,1);assert.notEqual(sprites()[0],first);fx.clear();assert.equal(sprites().length,0);
 }finally{fx.clear();if(original===undefined)delete globalThis.document;else globalThis.document=original;}
});
