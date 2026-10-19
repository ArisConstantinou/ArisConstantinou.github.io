import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {installRigidDrawCulling} from './rigid-draw-culling.js';

function fixture(object=new T.Mesh(new T.BoxGeometry(),new T.MeshStandardMaterial())){
 const camera=new T.PerspectiveCamera(60,1,.1,100);camera.updateMatrixWorld();camera.updateProjectionMatrix();
 let calls=0;const renderer={renderBufferDirect(){calls++;}};
 const original=renderer.renderBufferDirect,guard=process.env.MAGIC_CULL_BEFORE==='1'?{dispose(){},setEnabled(){},stats:{}}:installRigidDrawCulling(renderer);
 const draw=(cam=camera)=>{object.updateMatrixWorld(true);renderer.renderBufferDirect(cam,null,object.geometry,object.material,object,null);};
 return{object,camera,renderer,original,guard,draw,get calls(){return calls;}};
}

test('omits a rigid draw wholly outside while preserving official bounds',()=>{
 const f=fixture();f.object.position.set(100,0,-3);const oldBox=f.object.geometry.boundingBox;f.draw();assert.equal(f.calls,0);assert.equal(f.object.geometry.boundingBox,oldBox);assert.equal(f.object.geometry.boundingSphere,null);
});
test('retains visible and edge-intersecting geometry',()=>{
 const f=fixture();f.object.position.set(0,0,-3);f.draw();f.object.position.set(1.7,0,-3);f.draw();assert.equal(f.calls,2);
});
test('camera and mirrored or sheared object changes apply immediately',()=>{
 const f=fixture();f.object.position.set(100,0,-3);f.draw();assert.equal(f.calls,0);
 f.camera.position.x=100;f.camera.updateMatrixWorld(true);f.draw();assert.equal(f.calls,1);
 f.object.scale.x=-2;f.object.rotation.z=.5;f.draw();assert.equal(f.calls,2);
 f.object.matrixAutoUpdate=false;f.object.matrix.set(1,.5,0,100,0,1,0,0,0,0,1,-3,0,0,0,1);f.draw();assert.equal(f.calls,3);
});
test('different shadow camera retains an offscreen colour caster',()=>{
 const f=fixture();f.object.position.set(100,0,-3);f.draw();const shadow=new T.OrthographicCamera(-2,2,2,-2,.1,100);shadow.position.x=100;shadow.updateMatrixWorld(true);f.draw(shadow);assert.equal(f.calls,1);
});
test('changed vertex bytes invalidate cached bounds',()=>{
 const f=fixture();f.object.position.z=-3;f.object.geometry.translate(100,0,0);f.draw();assert.equal(f.calls,0);f.object.geometry.translate(-100,0,0);f.draw();assert.equal(f.calls,1);
});
test('instance count and matrix uploads invalidate their private union',()=>{
 const o=new T.InstancedMesh(new T.BoxGeometry(),new T.MeshStandardMaterial(),2),m=new T.Matrix4(),f=fixture(o);
 o.setMatrixAt(0,m.makeTranslation(100,0,-3));o.setMatrixAt(1,m.makeTranslation(110,0,-3));o.instanceMatrix.needsUpdate=true;f.draw();assert.equal(f.calls,0);
 o.setMatrixAt(1,m.makeTranslation(0,0,-3));o.instanceMatrix.needsUpdate=true;f.draw();assert.equal(f.calls,1);o.count=1;f.draw();assert.equal(f.calls,1);
});
test('deformed, displaced, opted-out and custom vertex paths retain original draws',()=>{
 for(const variant of ['skinned','morph','displaced','custom','shader','opted-out']){
  const f=fixture();f.object.position.set(100,0,-3);
  if(variant==='skinned')f.object.isSkinnedMesh=true;
  if(variant==='morph')f.object.geometry.morphAttributes.position=[f.object.geometry.attributes.position];
  if(variant==='displaced')f.object.material.displacementMap=new T.Texture();
  if(variant==='custom')f.object.material.onBeforeCompile=()=>{};
  if(variant==='shader')f.object.material=new T.ShaderMaterial();
  if(variant==='opted-out')f.object.frustumCulled=false;
  f.draw();assert.equal(f.calls,1,variant);
 }
});
test('disable and disposal restore the original path without replacing later adapters',()=>{
 const f=fixture();f.object.position.set(100,0,-3);f.guard.setEnabled(false);f.draw();assert.equal(f.calls,1);f.guard.dispose();assert.equal(f.renderer.renderBufferDirect,f.original);
 const g=fixture(),later=g.renderer.renderBufferDirect.bind(g.renderer);g.renderer.renderBufferDirect=later;g.guard.dispose();assert.equal(g.renderer.renderBufferDirect,later);
});
