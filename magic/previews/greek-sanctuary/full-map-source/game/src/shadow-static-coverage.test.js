import test from'node:test';import assert from'node:assert/strict';
import {Group,Mesh,InstancedMesh,BoxGeometry,MeshStandardMaterial,PerspectiveCamera,DirectionalLight,Matrix4}from'three';
import {mergeGeometries}from'three/addons/utils/BufferGeometryUtils.js';
import {createShadowReceiverGuard}from'./shadow-receiver-guard.js';
import {uncoveredStaticShadowBoxes}from'./shadow-static-coverage.js';
const region={id:'courtyard',x:-15,z:5,w:30,d:20},floors=[{tag:'courtyard',x:0,y:-.3,z:15,w:30,h:.6,d:20}];
function sun(){const c=new DirectionalLight().shadow.camera;Object.assign(c,{left:-22,right:22,top:22,bottom:-22,near:1,far:85});c.updateProjectionMatrix();return c;}
test('merged rock bounds do not invent a deep exposed front corner: exact original triangles prove coverage',()=>{
 const back=new BoxGeometry(1,8,1).translate(0,-8,10),front=new BoxGeometry(1,1,1).translate(0,-.6,24),geometry=mergeGeometries([back,front]),material=new MeshStandardMaterial(),mesh=new Mesh(geometry,material),root=new Group();mesh.receiveShadow=true;root.add(mesh);
 const bytes=geometry.attributes.position.array.slice(),index=geometry.index.array.slice(),camera=new PerspectiveCamera(53,430/745,.1,320);camera.position.set(0,18,36);camera.lookAt(0,0,17);camera.updateMatrixWorld();
 assert.equal(createShadowReceiverGuard(root,floors).check(camera,[region]),false,'coarse merged box is insufficient proof');
 const exact=createShadowReceiverGuard(root,floors,{shadowCamera:sun()});assert(exact.check(camera,[region]));assert(exact.check(camera,[region]));assert.equal(exact.snapshot().coverageBuilds,1);assert.equal(exact.snapshot().uncoveredBoxes,0);assert.equal(exact.snapshot().coverageTriangles,24);
 assert.deepEqual(geometry.attributes.position.array,bytes);assert.deepEqual(geometry.index.array,index);for(const g of [back,front,geometry])g.dispose();material.dispose();
});
test('exact coverage honors instance transforms, rejects unsupported projection and retains uncovered geometry for visibility proof',()=>{
 const geometry=new BoxGeometry(1,1,1),material=new MeshStandardMaterial(),mesh=new InstancedMesh(geometry,material,2),camera=sun();mesh.setMatrixAt(0,new Matrix4().makeTranslation(0,-12,10));mesh.setMatrixAt(1,new Matrix4().makeTranslation(0,60,15));mesh.updateMatrixWorld(true);
 const proof=uncoveredStaticShadowBoxes([mesh],region,camera);assert(proof);assert.equal(proof.triangles,24);assert(proof.covered>0);assert(proof.boxes.length>0);assert(proof.boxes.every(b=>b.min.y>50));camera.zoom=2;assert.equal(uncoveredStaticShadowBoxes([mesh],region,camera),null);geometry.dispose();material.dispose();
});
