import test from 'node:test';
import assert from 'node:assert/strict';
import {BufferAttribute} from 'three';
import {WebGLAttributes} from 'three/src/renderers/webgl/WebGLAttributes.js';
import {markActiveAttribute} from './active-buffer-range.js';

function gpuFixture(){
 const stores=new Map(),uploads=[];let bound;
 const gl={ARRAY_BUFFER:34962,FLOAT:5126,createBuffer:()=>({}),bindBuffer:(_target,buffer)=>{bound=buffer;},deleteBuffer:buffer=>stores.delete(buffer),
  bufferData:(_target,array)=>{stores.set(bound,array.slice());uploads.push({initial:true,components:array.length});},
  bufferSubData:(_target,byteOffset,array,offset=0,count=array.length-offset)=>{stores.get(bound).set(array.subarray(offset,offset+count),byteOffset/array.BYTES_PER_ELEMENT);uploads.push({initial:false,components:count,byteOffset});}};
 const attributes=WebGLAttributes(gl);
 return{uploads,update:attribute=>attributes.update(attribute,gl.ARRAY_BUFFER),data:attribute=>stores.get(attributes.get(attribute).buffer)};
}

test('empty active ranges neither dirty attributes nor erase pending writes',()=>{
 const attribute=new BufferAttribute(new Float32Array(64),1);
 assert.equal(markActiveAttribute(attribute,0),false);assert.equal(attribute.version,0);assert.deepEqual(attribute.updateRanges,[]);
 markActiveAttribute(attribute,24);const version=attribute.version;
 assert.equal(markActiveAttribute(attribute,0),false);assert.equal(attribute.version,version);assert.deepEqual(attribute.updateRanges,[{start:0,count:24}]);
});

test('pending updates retain one prefix union until the pinned Three upload consumes it',()=>{
 const attribute=new BufferAttribute(new Float32Array(64),1),gpu=gpuFixture();gpu.update(attribute);
 attribute.array.fill(2,0,24);markActiveAttribute(attribute,24);
 attribute.array.fill(3,0,8);markActiveAttribute(attribute,8);
 attribute.array.fill(4,0,40);markActiveAttribute(attribute,40);
 attribute.array.fill(5,0,4);markActiveAttribute(attribute,4);
 assert.deepEqual(attribute.updateRanges,[{start:0,count:40}]);gpu.update(attribute);
 assert.deepEqual(gpu.uploads.at(-1),{initial:false,components:40,byteOffset:0});assert.deepEqual(attribute.updateRanges,[]);assert.deepEqual(gpu.data(attribute),attribute.array);
 attribute.array.fill(6,0,4);markActiveAttribute(attribute,4);gpu.update(attribute);
 assert.equal(gpu.uploads.at(-1).components,4,'consumed history must not expand the next smaller upload');assert.deepEqual(gpu.data(attribute),attribute.array);
 const calls=gpu.uploads.length;markActiveAttribute(attribute,0);gpu.update(attribute);assert.equal(gpu.uploads.length,calls);
});

test('existing nonprefix pending regions join the active prefix without losing bytes',()=>{
 const attribute=new BufferAttribute(new Float32Array(64),1),gpu=gpuFixture();gpu.update(attribute);
 attribute.array.fill(7,40,48);attribute.addUpdateRange(40,8);
 attribute.array.fill(2,4,12);attribute.addUpdateRange(4,8);
 attribute.array.fill(9,0,3);markActiveAttribute(attribute,3);
 assert.deepEqual(attribute.updateRanges,[{start:0,count:48}]);gpu.update(attribute);assert.deepEqual(gpu.data(attribute),attribute.array);
});

test('invalid component counts cannot corrupt pending upload state',()=>{
 const attribute=new BufferAttribute(new Float32Array(16),1);markActiveAttribute(attribute,8);const version=attribute.version;
 for(const count of [-1,1.5,17,NaN,Infinity])assert.throws(()=>markActiveAttribute(attribute,count),RangeError);
 assert.equal(attribute.version,version);assert.deepEqual(attribute.updateRanges,[{start:0,count:8}]);
});
