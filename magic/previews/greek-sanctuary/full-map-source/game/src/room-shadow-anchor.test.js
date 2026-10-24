import test from'node:test';import assert from'node:assert/strict';
import {Vector3,DirectionalLight}from'three';import {roomShadowAnchor,createRoomShadowAnchor}from'./room-shadow-anchor.js';
const courtyard=[{x:-15,z:5,w:30,d:20}];
function sun(){const light=new DirectionalLight();light.position.set(-16,32,13);Object.assign(light.shadow.camera,{left:-22,right:22,top:22,bottom:-22,near:1,far:85});light.shadow.camera.updateProjectionMatrix();return light;}

test('courtyard volume stays inside the real unchanged orthographic shadow view and preserves light direction',()=>{
 const light=sun(),camera=light.shadow.camera,before=camera.matrixWorld.clone(),target=roomShadowAnchor(courtyard,camera);assert(target);assert(camera.matrixWorld.equals(before),'coverage test must not mutate the real camera');
 light.target.position.copy(target);light.position.copy(target).add(new Vector3(-16,32,13));light.updateMatrixWorld(true);light.target.updateMatrixWorld(true);light.shadow.updateMatrices(light);
 assert.equal(light.position.clone().sub(light.target.position).angleTo(new Vector3(-16,32,13)),0);
 for(const x of [-16.401,16.401])for(const y of [-10,8])for(const z of [3.599,26.401]){const p=new Vector3(x,y,z).project(camera);assert(Math.abs(p.x)<1&&Math.abs(p.y)<1&&Math.abs(p.z)<1);}
});

test('same room keeps one shadow target through movement; oversized/invalid footprints and unsupported heights fall back',()=>{
 const camera=sun().shadow.camera,policy=createRoomShadowAnchor(camera),first=policy.target(new Vector3(0,0,19),courtyard);
 for(const x of [-12,-8,0,8,12])for(const z of [7,12,20,23])assert.equal(policy.target(new Vector3(x,0,z),courtyard),first);
 assert.equal(policy.snapshot().builds,1);assert.equal(policy.snapshot().hits,20);
 for(const rects of [[],[{x:-100,z:-100,w:200,d:200}],[{x:NaN,z:5,w:30,d:20}]]){const focus=new Vector3(0,0,19);assert.equal(policy.target(focus,rects),focus);}
 const high=new Vector3(0,30,19);assert.equal(policy.target(high,courtyard),high);
 const focus=new Vector3(0,0,19);assert.notEqual(policy.target(focus,courtyard,{minY:-2,maxY:8}),focus);assert.equal(policy.target(focus,courtyard,{minY:-2,maxY:13}),focus);assert.equal(policy.snapshot().verticalFallbacks,2);
 assert.equal(policy.target(focus,courtyard,null,false),focus);assert.equal(policy.snapshot().geometryFallbacks,1);
});

test('shadow projection changes are rechecked before reuse',()=>{
 const camera=sun().shadow.camera,policy=createRoomShadowAnchor(camera),focus=new Vector3(0,0,19);assert.notEqual(policy.target(focus,courtyard),focus);camera.zoom=2;assert.equal(policy.target(focus,courtyard),focus);camera.zoom=1;camera.right=8;assert.equal(policy.target(focus,courtyard),focus);assert.equal(policy.snapshot().mode,'following');
});
