import test from 'node:test';import assert from 'node:assert/strict';import {Group,Vector3,Object3D} from 'three';
test('shader time advances without rewriting unchanged flame matrices; extinguish, relight and move remain exact',async()=>{
 const previous=globalThis.location;globalThis.location={href:'https://test.local/magic/'};
 try{
  const {siegeTorchFlames}=await import(process.env.MAGIC_SIEGE_SOURCE||'./siege-environment.js');const group=new Group(),torches=[{position:new Vector3(1,2,3),lit:true,infinite:false},{position:new Vector3(-2,4,-5),lit:true,infinite:true}],fire=siegeTorchFlames(group,torches),mesh=group.children[0],reference=new Object3D();
  function exact(time){fire.update(time);for(let i=0;i<torches.length;i++){const t=torches[i],s=t.lit?(t.infinite?1.35:1):0;reference.position.copy(t.position);reference.position.y+=.16*s;reference.scale.set(.67*s,.92*s,1);reference.updateMatrix();assert.deepEqual(Array.from(mesh.instanceMatrix.array.slice(i*16,i*16+16)),Array.from(new Float32Array(reference.matrix.elements)));}assert.equal(mesh.material.uniforms.time.value,time);}
  exact(0);let version=mesh.instanceMatrix.version;for(let t=1;t<=20;t++)exact(t/60);assert.equal(mesh.instanceMatrix.version,version);
  torches[0].lit=false;exact(1);assert.equal(mesh.instanceMatrix.version,++version);exact(1.1);assert.equal(mesh.instanceMatrix.version,version);
  torches[0].lit=true;torches[1].infinite=false;exact(2);assert.equal(mesh.instanceMatrix.version,++version);
  torches[1].position.set(-6,3,9);exact(3);assert.equal(mesh.instanceMatrix.version,++version);exact(4);assert.equal(mesh.instanceMatrix.version,version);fire.dispose();
 }finally{if(previous===undefined)delete globalThis.location;else globalThis.location=previous;}
});
