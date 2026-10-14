import test from 'node:test';import assert from 'node:assert/strict';
import {hearthLodLevel} from './hearth-lod.js';
test('close views retain full detail once loaded and medium while loading',()=>{
 assert.equal(hearthLodLevel(800,1,false),1);assert.equal(hearthLodLevel(800,1,true),0);
});
test('screen-size hysteresis prevents oscillation at both boundaries',()=>{
 assert.equal(hearthLodLevel(330,0,true),0);assert.equal(hearthLodLevel(330,1,true),1);
 assert.equal(hearthLodLevel(100,2,true),2);assert.equal(hearthLodLevel(100,1,true),1);
 assert.equal(hearthLodLevel(80,1,true),2);assert.equal(hearthLodLevel(120,2,true),1);
 assert.equal(hearthLodLevel(290,0,true),1);
});
