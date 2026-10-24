import test from'node:test';import assert from'node:assert/strict';
import {Box3,Vector3,Frustum,Matrix4,PerspectiveCamera,Group,Mesh,BoxGeometry,MeshStandardMaterial}from'three';
import {clippedBoxHiddenByFloor,createShadowReceiverGuard}from'./shadow-receiver-guard.js';
import {registerPositionPreservingSkinMaterial}from'./skinned-room-bounds.js';
const rect={id:'courtyard',x:-15,z:5,w:30,d:20},floor={y:0,x0:-15,x1:15,z0:5,z1:25};
function view(x=0,z=36){const camera=new PerspectiveCamera(53,430/745,.1,320);camera.position.set(x,18,z);camera.lookAt(x,0,z-19);camera.updateMatrixWorld();return{camera,frustum:new Frustum().setFromProjectionMatrix(new Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse))};}
test('below-floor visibility uses the frustum intersection: hidden back rocks are safe, exposed front rocks are rejected',()=>{
 const {camera,frustum}=view(),eye=camera.position;
 assert(clippedBoxHiddenByFloor(new Box3(new Vector3(-3,-13,6),new Vector3(3,-4,12)),frustum,eye,floor));
 assert(!clippedBoxHiddenByFloor(new Box3(new Vector3(-3,-13,24),new Vector3(3,-4,26)),frustum,eye,floor));
 assert(!clippedBoxHiddenByFloor(new Box3(new Vector3(-1,-1,10),new Vector3(1,1,12)),frustum,eye,floor));
});
test('receiver guard falls back for exposed foundations, holes/unknown floors and unverified adjoining rooms',()=>{
 const root=new Group(),mesh=new Mesh(new BoxGeometry(4,8,2),new MeshStandardMaterial());mesh.position.set(0,-12,25);mesh.receiveShadow=true;root.add(mesh);
 const guard=createShadowReceiverGuard(root,[{tag:'courtyard',x:0,y:-.3,z:15,w:30,h:.6,d:20}]),{camera}=view();assert.equal(guard.check(camera,[rect]),false);
 assert.equal(guard.check(camera,[{...rect,id:'hall'}]),false);assert.equal(createShadowReceiverGuard(root,[]).check(camera,[rect]),false);mesh.geometry.dispose();mesh.material.dispose();
});
test('ordinary above-floor scenery needs no occlusion exception and retains the exact source geometry',()=>{
 const root=new Group(),mesh=new Mesh(new BoxGeometry(2,4,2),new MeshStandardMaterial());mesh.position.set(0,2,15);mesh.receiveShadow=true;root.add(mesh);const original=mesh.geometry;
 const guard=createShadowReceiverGuard(root,[{tag:'courtyard',x:0,y:-.3,z:15,w:30,h:.6,d:20}]),{camera}=view();assert(guard.check(camera,[rect]));assert(guard.check(camera,[rect]));assert.equal(guard.snapshot().reused,1);assert.equal(guard.snapshot().boxes,0);assert.equal(mesh.geometry,original);mesh.geometry.dispose();mesh.material.dispose();
});
test('custom vertex callbacks cannot bypass receiver coverage using undisplaced CPU boxes',()=>{
 const root=new Group(),material=new MeshStandardMaterial(),mesh=new Mesh(new BoxGeometry(2,2,2),material);mesh.position.set(0,2,15);mesh.receiveShadow=true;root.add(mesh);
 const floors=[{tag:'courtyard',x:0,y:-.3,z:15,w:30,h:.6,d:20}],{camera}=view();material.onBeforeCompile=shader=>{shader.vertexShader+='\n// unknown vertex path';};
 assert.equal(createShadowReceiverGuard(root,floors).check(camera,[rect]),false);
 // Only explicitly reviewed, identity-bound callbacks may use CPU bounds.
 registerPositionPreservingSkinMaterial(material);assert(createShadowReceiverGuard(root,floors).check(camera,[rect]));
 material.onBeforeCompile=()=>{};assert.equal(createShadowReceiverGuard(root,floors).check(camera,[rect]),false);mesh.geometry.dispose();material.dispose();
});
test('a late callback replacement invalidates even the unchanged-camera receiver memo',()=>{
 const root=new Group(),material=new MeshStandardMaterial(),mesh=new Mesh(new BoxGeometry(2,2,2),material);mesh.receiveShadow=true;mesh.position.set(0,2,15);root.add(mesh);
 const guard=createShadowReceiverGuard(root,[{tag:'courtyard',x:0,y:-.3,z:15,w:30,h:.6,d:20}]),{camera}=view();assert(guard.check(camera,[rect]));assert(guard.check(camera,[rect]));assert.equal(guard.snapshot().reused,1);
 material.onBeforeCompile=s=>{s.vertexShader+='\n// new unverified path';};assert.equal(guard.check(camera,[rect]),false);assert.equal(guard.snapshot().reused,1);mesh.geometry.dispose();material.dispose();
});
