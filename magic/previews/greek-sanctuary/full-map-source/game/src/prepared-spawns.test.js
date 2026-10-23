import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {createPreparedSpawns} from './prepared-spawns.js';
test('prepared visuals await assets, warm attached rigs and hand off each object once',async()=>{
 let created=0,disposed=0;const parent=new Group(),seen=[];
 const pool=createPreparedSpawns({archer:()=>({group:new Group(),ready:Promise.resolve(),id:++created,dispose(){disposed++;this.group.removeFromParent();}})});
 assert.equal(pool.take('archer'),null);
 const unstage=await pool.prepare({counts:{archer:2},parent,position:new Vector3(2,0,10),nextFrame:async()=>{},prepareSurface:async group=>{assert.equal(group.parent,parent);seen.push(group);}});
 assert.equal(parent.children.length,2);assert.equal(seen.length,2);unstage();assert.equal(parent.children.length,0);
 const initial=pool.snapshot();const first=pool.take('archer'),second=pool.take('archer');assert.notEqual(first,second);assert.equal(pool.take('archer'),null);
 assert.equal(initial.misses,0);assert.equal(initial.hits,0,'saved snapshots do not mutate; telemetry must read current state');
 assert.equal(pool.snapshot().hits,2);assert.equal(pool.snapshot().misses,1);pool.clear();assert.equal(disposed,0,'handed-off actor owns disposal');first.dispose();second.dispose();assert.equal(disposed,2);
});
test('unused warm visuals are disposed without disposing the active actor',async()=>{
 const disposed=[],parent=new Group();let id=0;const pool=createPreparedSpawns({heavy:()=>({group:new Group(),id:++id,dispose(){disposed.push(this.id);this.group.removeFromParent();}})});
 const unstage=await pool.prepare({counts:{heavy:3},parent,position:new Vector3(),nextFrame:async()=>{},prepareSurface:async()=>{}});unstage();
 const actor=pool.take('heavy');pool.clear();assert.equal(disposed.length,2);assert.ok(!disposed.includes(actor.id));assert.equal(pool.snapshot().ready,false);
});
test('failed preparation removes staged rigs and disposes only unclaimed visuals',async()=>{
 let disposed=0;const parent=new Group();const pool=createPreparedSpawns({heavy:()=>({group:new Group(),dispose(){disposed++;this.group.removeFromParent();}})});
 await assert.rejects(pool.prepare({counts:{heavy:2},parent,position:new Vector3(),nextFrame:async()=>{},prepareSurface:async()=>{throw Error('GPU preparation failed');}}),/GPU preparation/);
 assert.equal(parent.children.length,0);assert.equal(disposed,1);assert.equal(pool.snapshot().ready,false);assert.equal(pool.take('heavy'),null);
});
