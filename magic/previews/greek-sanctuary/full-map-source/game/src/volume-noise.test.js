import test from 'node:test';
import assert from 'node:assert/strict';
import {LinearFilter,RepeatWrapping,RedFormat,UnsignedByteType} from 'three';
import {createVolumeNoiseData,volumeNoiseTexture} from './volume-noise.js';
test('volume noise is deterministic, bounded and shared across both jets and smoke',()=>{
 const data=createVolumeNoiseData();assert.equal(data.byteLength,262144);assert.deepEqual(data,createVolumeNoiseData());
 const mean=data.reduce((sum,n)=>sum+n,0)/data.length;assert.ok(mean>110&&mean<145);assert.ok(new Set(data).size>240);
 const texture=volumeNoiseTexture();assert.equal(volumeNoiseTexture(),texture);assert.equal(texture.image.data.byteLength,262144);assert.equal(texture.image.depth,64);
 assert.equal(texture.magFilter,LinearFilter);assert.equal(texture.wrapR,RepeatWrapping);assert.equal(texture.format,RedFormat);assert.equal(texture.type,UnsignedByteType);assert.equal(texture.unpackAlignment,1);
});
