import test from 'node:test';import assert from 'node:assert/strict';
import {BufferGeometry,BufferAttribute,Raycaster,Mesh,MeshBasicMaterial,Vector3} from './game/node_modules/three/build/three.module.js';
import {indexExactGeometry} from './exact-index.js';
const expanded=g=>{const result={};for(const [name,a]of Object.entries(g.attributes)){const size=a.itemSize*a.array.BYTES_PER_ELEMENT,b=new Uint8Array(a.array.buffer,a.array.byteOffset,a.array.byteLength),out=[];for(const id of g.index?.array??Array.from({length:a.count},(_,i)=>i))out.push(...b.slice(id*size,(id+1)*size));result[name]=out;}return result;};
test('exact indexing retains every attribute bit, triangle and UV seam with fixed index width',()=>{
 const g=new BufferGeometry();g.setAttribute('position',new BufferAttribute(new Float32Array([-1,-1,-3,1,-1,-3,0,1,-3,-1,-1,-3,1,-1,-3,0,1,-3]),3));
 g.setAttribute('uv',new BufferAttribute(new Float32Array([0,0,1,0,.5,1,0,0,1,0,.6,1]),2));g.setAttribute('color',new BufferAttribute(new Uint8Array(18).fill(191),3,true));g.setIndex(new BufferAttribute(new Uint32Array([0,1,2,3,4,5]),1));g.addGroup(0,3,0);g.addGroup(3,3,1);
 const before=expanded(g),groups=structuredClone(g.groups),ray=new Raycaster(new Vector3(0,0,0),new Vector3(0,0,-1)),mesh=new Mesh(g,new MeshBasicMaterial()),hits=ray.intersectObject(mesh).map(h=>[h.distance,h.faceIndex]);
 assert.deepEqual(indexExactGeometry(g),{before:6,after:4});assert.deepEqual(expanded(g),before);assert(g.index.array instanceof Uint32Array);assert.deepEqual(g.groups,groups);assert.deepEqual(ray.intersectObject(mesh).map(h=>[h.distance,h.faceIndex]),hits);
});
test('signed zero and morph data are never silently approximated',()=>{const g=new BufferGeometry();g.setAttribute('position',new BufferAttribute(new Float32Array([0,0,0,-0,0,0,0,0,0]),3));assert.deepEqual(indexExactGeometry(g),{before:3,after:2});g.morphAttributes.position=[g.attributes.position.clone()];assert.equal(indexExactGeometry(g),null);});
