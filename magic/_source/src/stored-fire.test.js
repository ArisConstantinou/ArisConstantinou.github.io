import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createFireEffects} from './fire-effects.js';
import {TRANSFER_TIME} from './fire.js';

function fixture(){
 const scene=new THREE.Scene(),effects=createFireEffects(scene);
 const player={body:{position:new THREE.Vector3(2,.8,3)},mesh:new THREE.Group(),cy:.8};player.mesh.position.set(2,0,3);
 const spell={charged:true,takenAt:0,torch:{position:new THREE.Vector3(-1,2,1)}};
 const state={spell,player,entities:[],surfaces:[],time:0,camera:new THREE.PerspectiveCamera(),playing:true};
 return{scene,effects,state};
}
test('stored ember transfers from its source to the visible wizard, including the raised pilot',()=>{
 const {effects,state}=fixture();effects.update(state);
 assert.deepEqual(effects.counts().stored.position,state.spell.torch.position.toArray());
 state.time=TRANSFER_TIME;effects.update(state);
 let p=effects.counts().stored.position;assert.equal(p[0],2.84);assert.equal(p[2],2.96);assert.ok(p[1]>1.28&&p[1]<1.36);
 state.player.mesh.position.set(6,4,8);state.player.mesh.scale.setScalar(.72);effects.update(state);
 p=effects.counts().stored.position;assert.ok(Math.abs(p[0]-6.6048)<1e-8);assert.ok(p[1]>4.92&&p[1]<4.99);
});
test('charge consumption, death, hidden gameplay, clear and disabled effects hide the ember immediately',()=>{
 for(const change of [s=>{s.spell.charged=false;},s=>{s.player.dead=true;},s=>{s.playing=false;},s=>{s.player=null;}]){
  const {effects,state}=fixture();effects.update(state);assert.ok(effects.counts().stored.visible);
  change(state);effects.update(state);assert.equal(effects.counts().stored.visible,false);
 }
 for(const clear of [fx=>fx.clear(),fx=>fx.setEnabled(false)]){
  const {effects,state}=fixture();effects.update(state);clear(effects);
  assert.equal(effects.counts().stored.visible,false);assert.equal(effects.counts().drawCalls,0);
 }
});
test('burning objects retain their flame pool and share one light with the stored ember',()=>{
 const {scene,effects,state}=fixture();state.entities.push({position:new THREE.Vector3(1,.5,2),flammable:true,burnUntil:45});
 effects.update(state);assert.equal(effects.counts().flamePlanes,8);assert.equal(effects.counts().drawCalls,4);
 state.spell.charged=false;effects.update(state);assert.equal(effects.counts().flamePlanes,8);assert.equal(effects.counts().drawCalls,1);
 assert.equal(scene.children.filter(o=>o.isLight).length,1);
});
test('paused time is stable and repeated charging never allocates extra scene resources',()=>{
 const {scene,effects,state}=fixture();effects.update(state);
 const meshes=[];scene.traverse(o=>{if(o.isMesh)meshes.push([o.uuid,o.geometry.uuid,o.material.uuid]);});
 const before=effects.counts().stored;effects.update(state);assert.deepEqual(effects.counts().stored,before);
 for(let i=0;i<300;i++){state.time=i/60;state.spell.charged=i%2===0;effects.update(state);}
 const after=[];scene.traverse(o=>{if(o.isMesh)after.push([o.uuid,o.geometry.uuid,o.material.uuid]);});
 assert.deepEqual(after,meshes);assert.equal(effects.counts().capacity,512);
});
