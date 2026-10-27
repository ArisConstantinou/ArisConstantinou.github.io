import test from 'node:test';
import assert from 'node:assert/strict';
import { newRound, RULES, shoot, setProjectileWorld } from '../src/arcade-model.js';
import { traceAim } from '../src/arcade-aim.js';
import {PROJECTILE,projectilePoint} from '../src/arcade-projectiles.js';

test('aim preview identifies a live target without changing aim',()=>{
 const s=newRound(),p=s.actors[0],target=s.actors[1];s.phase='battle';
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
test('preview and muzzle sweep stop at the actual entry into a close rock',()=>{
 const s=newRound(),p=s.actors[0];Object.assign(p,{x:-8,z:4.28,aimX:0,aimZ:-1});
 const preview=traceAim(s,p);
 assert.equal(preview.blocked,true);assert.equal(preview.targetId,null);
 assert.ok(preview.distance>.7&&preview.distance<.8);assert.equal(shoot(s,p),true);assert.equal(s.bullets.length,0);
 const splat=s.events.find(e=>e.type==='splat');assert.ok(Math.abs(splat.z-preview.z)<1e-9);assert.equal(splat.y,preview.y);
});

test('overview trajectory samples the real surface flight and ends exactly at first contact',()=>{
 const s=newRound(),p=s.actors[0];s.phase='battle';for(const a of s.actors.slice(1))a.ko=true;
 Object.assign(p,{x:0,z:8,height:1.1,aimX:0,aimY:0,aimZ:-1,aim3D:false});
 const ground=(x,z)=>.35*Math.sin(z*.8);setProjectileWorld(s,{ground});
 const preview=traceAim(s,p,14);assert.ok(preview.path.length>20);
 assert.deepEqual(preview.path[0],preview.origin);assert.deepEqual(preview.path.at(-1),{x:preview.x,y:preview.y,z:preview.z});
 for(const point of preview.path)assert.ok(Math.abs(point.y-ground(point.x,point.z)-PROJECTILE.originHeight)<1e-8);
 assert.equal(shoot(s,p),true);const bullet=s.bullets[0];assert.ok(bullet?.followGround);
 for(const point of preview.path){
  const distance=Math.hypot(point.x-preview.origin.x,point.z-preview.origin.z)-PROJECTILE.muzzleOffset;if(distance<0)continue;
  const real=projectilePoint(s,bullet,distance);for(const axis of ['x','y','z'])assert.ok(Math.abs(real[axis]-point[axis])<1e-8);
 }
});

test('explicit 3D guide stays straight and blocked guides never extend beyond the wall',()=>{
 const s=newRound(),p=s.actors[0];for(const a of s.actors.slice(1))a.ko=true;
 Object.assign(p,{x:0,z:20.5,aimX:1,aimY:0,aimZ:0,aim3D:true});
 const preview=traceAim(s,p);assert.equal(preview.kind,'wall');assert.equal(preview.path.length,2);
 assert.deepEqual(preview.path[0],preview.origin);assert.deepEqual(preview.path[1],{x:preview.x,y:preview.y,z:preview.z});assert.ok(preview.x<4);
});
