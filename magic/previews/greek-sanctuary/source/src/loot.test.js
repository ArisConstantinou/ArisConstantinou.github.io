import test from 'node:test';
import assert from 'node:assert/strict';
import {ProfileStore} from './systems.js';
import {BAG_LIMIT,equipmentStats,hydrateLoot,rollLoot} from './loot.js';
const storage=()=>{let value;return {getItem:()=>value,setItem:(_,v)=>value=v};};
test('legacy upgrades, loot, equipment and consumed stacks survive reload and death',()=>{
 const s=storage();s.setItem('',JSON.stringify({version:1,shards:23,runs:8,upgrades:{grip:2}}));
 const a=new ProfileStore(s);assert.equal(a.profile.shards,23);assert.equal(a.profile.upgrades.grip,2);
 a.acquire({kind:'staff',level:5});a.equip(1);a.acquire({kind:'health',level:2});a.acquire({kind:'health',level:2});a.consume(2);
 a.finish({won:false,kills:1,time:30,shards:2});
 const b=new ProfileStore(s);assert.equal(b.profile.runs,9);assert.equal(b.profile.loot.equipped.staff,1);assert.equal(b.profile.loot.items.find(i=>i.id===2).count,1);
 const bonus=equipmentStats(b.profile.loot);b.equip(1);assert.deepEqual(equipmentStats(b.profile.loot),bonus);b.unequip('staff');assert.equal(equipmentStats(b.profile.loot).damage,0);
});
test('full bag rejects pickups intact, stacks compatible potions, and protects equipped gear from salvage',()=>{
 const a=new ProfileStore(storage());a.acquire({kind:'mana',level:1});for(let i=1;i<BAG_LIMIT;i++)a.acquire({kind:'robe',level:2});
 assert.equal(a.acquire({kind:'staff',level:5}),false);assert.equal(a.profile.loot.items.length,24);
 assert.equal(a.acquire({kind:'mana',level:1}),true);assert.equal(a.profile.loot.items[0].count,2);
 a.equip(2);assert.equal(a.salvage(2),false);assert.equal(a.salvage(3),true);assert.equal(a.profile.shards,6);
 assert.equal(a.acquire({kind:'staff',level:5}),true);
});
test('damaged inventory is bounded and invalid duplicate identities or equipped references cannot grant stats',()=>{
 const loot=hydrateLoot({version:1,nextId:'bad',items:[{id:1,kind:'staff',level:3},{id:1,kind:'robe',level:5},{id:2,kind:'bad',level:5},{id:3,kind:'health',level:Infinity,count:-1}],equipped:{robe:1,staff:2}});
 assert.equal(loot.items.length,2);assert.equal(loot.nextId,4);assert.deepEqual(loot.equipped,{});assert.equal(loot.items[1].level,1);assert.equal(loot.items[1].count,1);
});
test('boss drops span higher item levels and every regular enemy can award usable loot',()=>{
 for(const value of [0,.4,.99]){const boss=rollLoot('boss',()=>value);assert.ok(boss.level>=3&&boss.level<=5);assert.ok(['staff','robe','amulet','ring'].includes(boss.kind));assert.ok(rollLoot('guard',()=>value).level<=3);}
});
