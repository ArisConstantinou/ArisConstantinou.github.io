import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';import {createHearthEffects} from './hearth-effects.js';
test('furnace warms its internal socket without spawning external chest fire, and goes dark when empty',()=>{
 const scene=new THREE.Scene(),fx=createHearthEffects(scene),camera=new THREE.OrthographicCamera(-4,4,4,-4,.1,100),core=new THREE.Vector3(0,2,0);
 camera.position.set(4,5,6);camera.lookAt(0,1,0);camera.updateMatrixWorld(true);
 const hearth={heart:{fuel:100,firing:false},streams:[],visual:{point:()=>core}},input={spell:{charged:false},player:{},hearth,entities:[],time:1,camera};
 fx.update(input);const light=scene.getObjectByName('hearth-core-light');assert.ok(light.intensity>3);assert.ok(light.position.distanceTo(core)<1e-12);assert.ok(scene.children.filter(o=>o.isGroup).every(o=>!o.visible));
 hearth.heart.fuel=0;fx.update({...input,time:2});assert.equal(light.intensity,0);assert.ok(scene.children.filter(o=>o.isGroup).every(o=>!o.visible));fx.clear();
});
