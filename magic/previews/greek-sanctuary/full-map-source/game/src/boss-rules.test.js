import test from 'node:test';
import assert from 'node:assert/strict';
import {createBossLayout,insideBossRoom,bossAttackCrossed,BOSS_DEFINITIONS} from './boss-rules.js';
function seeded(seed){return()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};}
test('all three bosses occupy distinct safe rooms and consecutive runs change assignments',()=>{
 const rng=seeded(129);let previous=[];const orders=new Set();
 for(let i=0;i<100;i++){const layout=createBossLayout(rng,p=>Math.abs(p.x)>.8,previous);assert.equal(new Set(layout.map(b=>b.type)).size,3);assert.equal(new Set(layout.map(b=>b.room.name)).size,3);for(const b of layout){assert.ok(insideBossRoom(b,b.room,BOSS_DEFINITIONS[b.type].radius));assert.ok(Math.abs(b.x)>.8);}const order=layout.map(b=>b.type);assert.notDeepEqual(order,previous);orders.add(order.join());previous=order;}
 assert.equal(orders.size,6);
});
test('blocked rooms never silently spawn a boss inside an obstacle',()=>assert.throws(()=>createBossLayout(seeded(1),()=>false),/No safe boss spawn/));
test('damage fires once at animation contact, including long frames',()=>{for(const def of Object.values(BOSS_DEFINITIONS))for(const a of def.attacks){assert.equal(bossAttackCrossed(0,a.hit-.001,a.hit),false);assert.equal(bossAttackCrossed(a.hit-.001,a.hit+.1,a.hit),true);assert.equal(bossAttackCrossed(a.hit+.1,a.hit+.2,a.hit),false);assert.ok(a.hit<a.duration);}});
