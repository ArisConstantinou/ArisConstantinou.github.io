import test from 'node:test';
import assert from 'node:assert/strict';
import {ProfileStore} from './systems.js';
test('a new isolated preview copies legacy progress once and never writes to its source',()=>{
 const records=new Map([['stable',JSON.stringify({version:1,shards:35,runs:12,upgrades:{grip:2,focus:1}})]]);
 const storage={getItem:key=>records.get(key)??null,setItem:(key,v)=>records.set(key,v)};
 const original=records.get('stable'),preview=new ProfileStore(storage,'preview',['stable']);
 assert.equal(preview.profile.shards,35);assert.equal(preview.profile.upgrades.grip,2);
 preview.acquire({kind:'robe',level:4});preview.equip(1);preview.profile.shards=7;preview.save();
 const reloaded=new ProfileStore(storage,'preview',['stable']);assert.equal(reloaded.profile.shards,7);assert.equal(reloaded.profile.loot.equipped.robe,1);assert.equal(records.get('stable'),original);
});
