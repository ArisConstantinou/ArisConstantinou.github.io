import test from 'node:test';import assert from 'node:assert/strict';
import {supportedSpawn} from './supported-spawn.js';import {freePosition} from './goliath.js';
const floor={x:0,y:-.1,z:0,w:20,h:.2,d:20};
test('summon positions carry finite real floor height into 3D sight checks',()=>{
 const sight=p=>Number.isFinite(p.y)&&p.y===0;
 assert.equal(freePosition({x:0,z:0},.65,[floor],[],[],0,sight),null);
 assert.deepEqual(supportedSpawn({x:0,y:0,z:0},.65,2,[floor],[],[],0,sight),{x:0,y:0,z:0});
});
test('upper floor summons use that floor, ignore geometry below, and respect ceilings',()=>{
 const upper={...floor,y:2.9},below={x:0,y:.8,z:0,w:2,h:1.6,d:2};
 assert.deepEqual(supportedSpawn({x:0,y:3,z:0},.65,2,[floor,upper],[below],[],0),{x:0,y:3,z:0});
 assert.equal(supportedSpawn({x:0,y:3,z:0},.65,2,[floor,upper],[{x:0,y:4.5,z:0,w:2,h:.3,d:2}],[],0),null);
});
test('summoning cannot use a ledge, absent support or another actor on its own floor',()=>{
 assert.equal(supportedSpawn({x:0,y:0,z:0},.65,2,[],[],[],0),null);
 assert.equal(supportedSpawn({x:9.7,y:0,z:0},.65,2,[floor],[],[],0),null);
 const actor={body:{position:{x:0,y:.88,z:0}},cy:.88,radius:.43};
 assert.equal(supportedSpawn({x:0,y:0,z:0},.65,2,[floor],[],[actor],0),null);
 assert.deepEqual(supportedSpawn({x:0,y:0,z:0},.65,2,[floor],[],[{...actor,body:{position:{x:0,y:4,z:0}}}],0),{x:0,y:0,z:0});
});
