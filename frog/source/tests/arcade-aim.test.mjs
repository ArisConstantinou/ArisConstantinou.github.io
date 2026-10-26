import test from 'node:test';
import assert from 'node:assert/strict';
import { newRound, RULES } from '../src/arcade-model.js';
import { traceAim } from '../src/arcade-aim.js';

test('aim preview identifies a live target without changing aim',()=>{
 const s=newRound(),p=s.actors[0],target=s.actors[1];
 Object.assign(p,{x:0,z:8,aimX:0,aimZ:-1});Object.assign(target,{x:0,z:0});
 const preview=traceAim(s,p);
 assert.equal(preview.targetId,target.id);assert.ok(preview.distance>6&&preview.distance<8);
 assert.equal(p.aimX,0);assert.equal(p.aimZ,-1);
});
test('a rock blocks targeting of the enemy behind it',()=>{
 const s=newRound(),p=s.actors[0],target=s.actors[1];
 Object.assign(p,{x:-8,z:8,aimX:0,aimZ:-1});Object.assign(target,{x:-8,z:-5});
 const preview=traceAim(s,p);
 assert.equal(preview.targetId,null);assert.equal(preview.blocked,true);assert.ok(preview.z>2);
});
test('preview skips knocked-out frogs and stops at the arena boundary',()=>{
 const s=newRound(),p=s.actors[0];Object.assign(p,{x:0,z:22,aimX:0,aimZ:1});
 Object.assign(s.actors[1],{x:0,z:24,ko:true});const preview=traceAim(s,p);
 assert.equal(preview.targetId,null);assert.ok(Math.hypot(preview.x,preview.z)<=RULES.radius-.2+.001);
});
test('preview reports obstruction when a close rock contains the projectile origin',()=>{
 const s=newRound(),p=s.actors[0];Object.assign(p,{x:-8,z:4.4,aimX:0,aimZ:-1});
 const preview=traceAim(s,p);
 assert.equal(preview.blocked,true);assert.equal(preview.targetId,null);
 assert.ok(Math.abs(preview.distance-1.2)<1e-9);
});
