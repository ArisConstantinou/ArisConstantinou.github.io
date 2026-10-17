import test from 'node:test';import assert from 'node:assert/strict';
import * as T from './game/node_modules/three/build/three.module.js';
import {mergeGeometries} from './game/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';
import {indexedClone} from './indexed-geometry.js';
test('static merge retains every triangle attribute exactly, including seams and transformed normals',()=>{
 const sources=[new T.BoxGeometry(2,3,4),new T.CylinderGeometry(.7,1,3,12),new T.SphereGeometry(1,16,12),new T.BoxGeometry(1,1,1).toNonIndexed()];
 const transform=new T.Matrix4().compose(new T.Vector3(12,3,-8),new T.Quaternion().setFromEuler(new T.Euler(.2,.7,.1)),new T.Vector3(1,2,.8));
 const before=mergeGeometries(sources.map(s=>(s.index?s.toNonIndexed():s.clone()).applyMatrix4(transform)),false);
 const after=mergeGeometries(sources.map(s=>indexedClone(s).applyMatrix4(transform)),false),expanded=after.toNonIndexed();
 assert.equal(after.index.count,before.attributes.position.count);
 for(const [name,attribute] of Object.entries(before.attributes))assert.deepEqual(expanded.attributes[name].array,attribute.array,name);
 assert(after.attributes.position.count<before.attributes.position.count*.6);
 before.computeBoundingBox();after.computeBoundingBox();assert(before.boundingBox.equals(after.boundingBox));
 assert(sources[0].index);assert.equal(sources[3].index,null,'source immutable');
 const material=new T.MeshBasicMaterial({side:T.DoubleSide});
 const ray=new T.Raycaster(new T.Vector3(12,3,20),new T.Vector3(0,0,-1));
 const a=ray.intersectObject(new T.Mesh(before,material)),b=ray.intersectObject(new T.Mesh(after,material));
 assert(a.length>0);assert.equal(a.length,b.length);for(let i=0;i<a.length;i++){assert.equal(a[i].faceIndex,b[i].faceIndex);assert(a[i].point.equals(b[i].point));assert(a[i].uv.equals(b[i].uv));}
});
