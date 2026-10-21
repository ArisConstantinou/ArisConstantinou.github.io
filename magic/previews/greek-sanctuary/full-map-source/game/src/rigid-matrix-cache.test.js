import test from 'node:test';import assert from 'node:assert/strict';import {Group,Mesh,BoxGeometry,MeshBasicMaterial} from 'three';
import {cacheRigidWorldMatrices} from './rigid-matrix-cache.js';
function fixture(){const scene=new Group(),prop=new Group(),mesh=new Mesh(new BoxGeometry(),new MeshBasicMaterial()),child=new Group();mesh.position.set(.4,.7,-.3);mesh.add(child);prop.add(mesh);scene.add(prop);return{scene,prop,mesh,child};}
function matrices(f){const out=[];f.scene.traverse(o=>out.push([...o.matrixWorld.elements]));return out;}
test('rigid cache preserves exact world matrices through movement, parents, assembly reparenting and child edits',()=>{
 const a=fixture(),b=fixture(),cache=cacheRigidWorldMatrices(b.prop);
 for(let i=0;i<90;i++){
  for(const f of [a,b]){if(i%5===0){f.prop.position.x=i*.2;f.prop.rotation.y=i*.04;f.prop.scale.setScalar(1+i*.001);}if(i%7===0){f.scene.position.z=i*.03;f.scene.rotation.z=i*.02;}if(i%9===0)f.child.rotation.x=i*.03;if(i===30){f.mesh.remove(f.child);f.prop.add(f.child);}if(i===50){f.prop.remove(f.child);f.mesh.add(f.child);}if(i===60)f.mesh.matrixAutoUpdate=false;if(i>=60&&i<65)f.mesh.matrix.makeTranslation(i,.7,-.3);if(i===65)f.mesh.matrixAutoUpdate=true;f.scene.updateMatrixWorld(true);}
  assert.deepEqual(matrices(b),matrices(a),'frame '+i);
 }
 assert(cache.stats.reused>0);cache.dispose();
});
test('unchanged rigid subtree skips descendant matrix work even when the scene forces updates',()=>{
 const f=fixture();let calls=0;const update=f.child.updateMatrixWorld;f.child.updateMatrixWorld=function(...args){calls++;return update.apply(this,args)};
 const cache=cacheRigidWorldMatrices(f.prop);f.scene.updateMatrixWorld(true);const initial=calls;
 for(let i=0;i<20;i++)f.scene.updateMatrixWorld(true);assert.equal(calls,initial);
 f.child.position.x=3;f.scene.updateMatrixWorld(true);assert.equal(calls,initial+1);
 cache.dispose();f.scene.updateMatrixWorld(true);assert.equal(calls,initial+2);
});
