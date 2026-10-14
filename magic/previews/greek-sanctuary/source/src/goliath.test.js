import test from 'node:test';
import assert from 'node:assert/strict';
import {activeStones,selectStones,StoneRitual,bodyguardTarget,freePosition} from './goliath.js';
import {ProfileStore,NavigationGrid} from './systems.js';
import {existingRooms,newRooms,corridors} from './castle-layout.js';
import {castleBoundaries} from './castle-boundaries.js';
const stone=(x=0,z=0)=>({kind:'stone',ephemeral:true,body:{position:{x,z}},radius:.43});
test('held stones count; scenery, destroyed and removed stones do not',()=>{
 const held=stone();held.held=true;const scenery={...stone(),ephemeral:false};
 assert.deepEqual(activeStones([held,scenery,{...stone(),removed:true},{...stone(),pendingBreak:true}]),[held]);
});
test('exactly seven nearest reachable stones are reserved, never scenery or stones behind walls',()=>{
 const stones=Array.from({length:10},(_,i)=>stone(i,0));stones[0].reserved=true;
 const selected=selectStones(stones,{x:0,z:0},s=>s.body.position.x!==2);
 assert.equal(selected.length,7);assert.deepEqual(selected.map(s=>s.body.position.x),[1,3,4,5,6,7,8]);
});
test('short charge cancels without consuming stones; full charge begins assembly once',()=>{
 const ritual=new StoneRitual(),stones=Array.from({length:7},()=>stone());
 assert.equal(ritual.begin(stones.slice(1)),false);assert.equal(ritual.begin(stones),true);
 ritual.tick(1.9);assert.equal(ritual.phase,'charge');assert.deepEqual(ritual.cancel(),stones);
 ritual.begin(stones);assert.equal(ritual.tick(2),'assemble');assert.equal(ritual.elapsed,0);
 ritual.tick(.2);assert.equal(ritual.elapsed,.2);assert.equal(ritual.begin(stones),false);
});
test('an invalid ritual retains stone references until runtime restores them',()=>{
 const r=new StoneRitual(),stones=Array.from({length:7},()=>stone());r.begin(stones);
 assert.equal(r.tick(.1,false),'cancelled');assert.deepEqual(r.cancel(),stones);
});
test('bodyguard taunts locally with visibility, death and distance fallback',()=>{
 const enemy=stone(0,0),player=stone(0,8),ally=stone(0,5);
 assert.equal(bodyguardTarget(enemy,player,ally,()=>true),ally);
 assert.equal(bodyguardTarget(enemy,player,ally,()=>false),player);
 ally.dead=true;assert.equal(bodyguardTarget(enemy,player,ally,()=>true),player);
 ally.dead=false;ally.body.position.z=20;assert.equal(bodyguardTarget(enemy,player,ally,()=>true),player);
});
test('safe placement rejects floor edges, walls, occupied positions and forbidden destinations',()=>{
 const floor=[{x:0,z:0,w:12,d:12}],wall=[{x:0,z:0,w:1,d:12}],occupied=[stone(3,0)];
 const p=freePosition({x:3,z:0},1,floor,wall,occupied,3,at=>at.z>1);
 assert.ok(p&&p.z>1&&p.x>1.5);assert.equal(freePosition({x:0,z:0},7,floor,[],[],3),null);
});
test('preview profile namespace never reads or changes the live profile',()=>{
 const values=new Map([['magic-exiled-v1',JSON.stringify({version:1,shards:200,runs:8})]]);
 const storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
 const s=new ProfileStore(storage,'magic-goliath-preview-v1');assert.equal(s.profile.shards,0);s.finish({won:true,kills:1,time:10,shards:2});
 assert.equal(JSON.parse(values.get('magic-exiled-v1')).runs,8);assert.equal(JSON.parse(values.get('magic-goliath-preview-v1')).runs,1);
});
test('accepted floor union has real 3m doorways and connected routes for both actors',()=>{
 const rects=[...existingRooms,...newRooms,...corridors];
 const floors=rects.map(r=>({x:r.x+r.w/2,z:r.z+r.d/2,w:r.w,d:r.d}));
 const obstacles=castleBoundaries(rects).map(e=>({x:e.axis==='x'?(e.lo+e.hi)/2:e.at+e.normal*.4,z:e.axis==='x'?e.at+e.normal*.4:(e.lo+e.hi)/2,w:e.axis==='x'?e.hi-e.lo:.8,d:e.axis==='x'?.8:e.hi-e.lo,y:1.8,h:3.6}));
 for(const radius of [.48,1]){const nav=new NavigationGrid(floors,obstacles,.85,radius);for(const r of [...existingRooms,...newRooms])assert.ok(nav.path({x:0,z:18},{x:r.x+r.w/2,z:r.z+r.d/2}).length,`${radius}: ${r.id}`);}
});
