import test from 'node:test';import assert from 'node:assert/strict';import {createDamageTextureCache} from './damage-texture-cache.js';
test('identical damage labels share immutable original pixels; retirement does not dispose an active shared texture',()=>{
 const cache=createDamageTextureCache(2);let created=0,disposed=0;const make=()=>({pixels:'original',dispose(){disposed++}});
 const a=cache.acquire('4.4/white',()=>{created++;return make()}),b=cache.acquire('4.4/white',()=>{created++;return make()});assert.equal(a,b);assert.equal(created,1);cache.release(a);assert.equal(disposed,0);assert.equal(b.texture.pixels,'original');cache.release(b);cache.clear();assert.equal(disposed,1);assert.equal(cache.size,0);
});
test('LRU evicts unused entries, retains visible labels, and catches double release',()=>{
 const cache=createDamageTextureCache(2),disposed=[];const make=name=>()=>({dispose(){disposed.push(name)}});
 const active=cache.acquire('active',make('active')),old=cache.acquire('old',make('old'));cache.release(old);
 const fresh=cache.acquire('fresh',make('fresh'));assert.deepEqual(disposed,['old']);assert.equal(cache.size,2);cache.release(fresh);assert.throws(()=>cache.release(fresh),/twice/);cache.release(active);cache.clear();assert.deepEqual(disposed,['old','active','fresh']);
});
