import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,step,shoot,saveRound,loadRound,setProjectileWorld,projectileOrigin,traceWorldRay,RULES} from '../src/arcade-model.js';
import {traceAim} from '../src/arcade-aim.js';
import {PROJECTILE} from '../src/arcade-projectiles.js';
import {BASES} from '../src/arcade-bases.js';

function arena(ground){
 const s=newRound();s.phase='battle';s.intro=0;s.flies.forEach(f=>f.wait=100);
 Object.assign(s.actors[0],{x:0,z:8,face:.7,ammo:60});
 for(const a of s.actors.slice(1))Object.assign(a,{ko:true,respawnTime:99});
 // Keep the displayed target orientation still while comparing a preview
 // with a later physical impact; AI intent can change during the flight.
 const visibleYaw=new Map(s.actors.map(a=>[a.id,a.face]));
 setProjectileWorld(s,{ground:ground||(()=>0),actorYaw:a=>visibleYaw.get(a.id)});return s;
}
function target(s,x=0,z=0){const a=s.actors[1];Object.assign(a,{x,z,ko:false,respawnTime:0,ammo:0,load:0,idle:99,shot:99,tongue:99,kickCooldown:99,machineTimer:99,refilling:true});return a;}
function aim(a,x,y,z){const d=Math.hypot(x,y,z);Object.assign(a,{aimX:x/d,aimY:y/d,aimZ:z/d,aim3D:true});}
function flight(s){
 const p=s.actors[0];assert.equal(shoot(s,p),true);const bullet=s.bullets[0],events=[...s.events];
 for(let i=0;i<40&&s.bullets.length;i++){step(s,{},.05);events.push(...s.events);}
 return {bullet,events,impact:events.find(e=>e.type==='splat')};
}
const near=(actual,expected,tolerance=1e-7)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} should equal ${expected}`);

test('3D input produces normalized pitched flight and a pure vertical shot preserves heading',()=>{
 const s=arena(),p=s.actors[0];step(s,{aiming:true,ax:0,ay:3,az:-4,fire:true});
 assert.equal(p.aim3D,true);near(p.aimY,.6);near(p.aimZ,-.8);
 const b=s.bullets[0];assert.ok(b);near(Math.hypot(b.dx,b.dy,b.dz),1);near(b.dy,.6);assert.equal(b.followGround,false);
 near(b.y,PROJECTILE.originHeight+.6*(PROJECTILE.muzzleOffset+RULES.projectileSpeed/60));
 const v=arena(),a=v.actors[0],heading=a.face;step(v,{aiming:true,ax:0,ay:1,az:0,fire:true});
 assert.equal(a.face,heading);assert.equal(a.aimY,1);assert.equal(v.bullets[0].x,a.x);assert.equal(v.bullets[0].z,a.z);assert.ok(v.bullets[0].y>PROJECTILE.originHeight+1);
});
test('a shot above the visible head misses instead of hitting a tall invisible actor column',()=>{
 const s=arena((x,z)=>z>5?1.15:0),p=s.actors[0],a=target(s);aim(p,0,0,-1);
 near(projectileOrigin(s,p).y,1.6);assert.equal(traceAim(s,p).targetId,null);
 const result=flight(s);assert.equal(a.dizzy,0);assert.equal(s.stats.hits,0);assert.ok(!result.events.some(e=>e.type==='hit'));
});
test('rising and descending shots hit actors at their actual different terrain heights',()=>{
 for(const downhill of [false,true]){
  const s=arena((x,z)=>downhill?(z>=6?2:0):(z<2?2:0)),p=s.actors[0],a=target(s);
  // The rising ray clears the two-unit cliff and meets the visible upper body,
  // rather than the old oversized cylinder above it.
  if(downhill){p.z=6.1;aim(p,0,-2,-6.1);}else aim(p,0,2.25,-8);
  const preview=traceAim(s,p);assert.equal(preview.targetId,a.id);assert.equal(preview.kind,'actor');
  const result=flight(s);assert.equal(s.stats.hits,1);assert.equal(a.dizzy,1);assert.equal(result.impact.kind,'actor');
  near(result.impact.x,preview.x);near(result.impact.y,preview.y);near(result.impact.z,preview.z);
  const hit=result.events.find(e=>e.type==='hit');near(hit.y,preview.y);
 }
});
test('downward flight hits the ground at the shared preview point with an upward impact normal',()=>{
 const s=arena(),p=s.actors[0];aim(p,0,-.1,-1);const preview=traceAim(s,p),result=flight(s);
 assert.equal(preview.kind,'terrain');assert.equal(result.impact.kind,'terrain');near(result.impact.y,PROJECTILE.radius);near(result.impact.z,preview.z);assert.ok(result.impact.normal.y>.999);
 const steep=arena(),a=steep.actors[0];aim(a,0,-1,0);const count=a.ammo;assert.equal(shoot(steep,a),true);
 assert.equal(steep.bullets.length,0);assert.equal(a.ammo,count-1);near(steep.events.find(e=>e.type==='splat').y,PROJECTILE.radius);
});
test('low shots stop on finite house walls while elevated shots genuinely pass above them',()=>{
 const low=arena(),p=low.actors[0];Object.assign(p,{x:BASES[0].x,z:BASES[0].z});aim(p,0,0,1);
 const preview=traceAim(low,p),blocked=flight(low);assert.equal(preview.kind,'wall');assert.equal(blocked.impact.kind,'wall');near(blocked.impact.z,preview.z);assert.equal(blocked.impact.normal.z,-1);
 const high=arena(),a=high.actors[0];Object.assign(a,{x:BASES[0].x,z:BASES[0].z});aim(a,0,.8,.6);
 // The higher shot now expires before the expanded arena rim. It must clear
 // the same finite wall and complete its full physical flight without impact.
 const highPreview=traceAim(high,a),passed=flight(high);assert.equal(highPreview.kind,null);assert.equal(passed.impact,undefined);
 assert.ok(passed.bullet.z>BASES[0].z+BASES[0].halfDepth);assert.ok(passed.bullet.y>3);
 near(highPreview.distance,PROJECTILE.muzzleOffset+RULES.projectileSpeed*RULES.projectileLifetime);
 near(passed.bullet.x,highPreview.x);near(passed.bullet.y,highPreview.y);near(passed.bullet.z,highPreview.z);
});
test('the source-to-muzzle sweep cannot create a projectile across a nearby wall',()=>{
 const s=arena(),p=s.actors[0],base=BASES[0];Object.assign(p,{x:base.x,z:base.z+base.halfDepth-.95});aim(p,0,0,1);
 const preview=traceAim(s,p);assert.ok(preview.distance<PROJECTILE.muzzleOffset);assert.equal(shoot(s,p),true);assert.equal(s.bullets.length,0);
 const impact=s.events.find(e=>e.type==='splat');assert.equal(impact.kind,'wall');near(impact.z,preview.z);near(impact.y,PROJECTILE.originHeight);
});
test('a fast vertical segment hits the rounded visible back before terrain, not an oversized flat cap',()=>{
 const s=arena(),a=target(s),preview=traceWorldRay(s,{x:a.x,y:2.2,z:a.z},{x:0,y:-1,z:0},2.2,{ignoreId:'player'});
 s.bullets.push({id:99,owner:'player',x:a.x,y:2.2,z:a.z,dx:0,dy:-1,dz:0,followGround:false,life:.65});step(s,{},.05);
 assert.equal(a.dizzy,1);assert.equal(s.bullets.length,0);const impact=s.events.find(e=>e.type==='splat');assert.equal(impact.kind,'actor');near(impact.y,preview.y);
 assert.ok(impact.y>.7&&impact.y<.85,'the center back is lower than the eye ridges and old 1.05-unit cap');
});
test('terrain sweeping catches a narrow ridge even when both frame endpoints are clear',()=>{
 const s=arena((x,z)=>z>5.15&&z<5.35?1:0);s.bullets.push({id:99,owner:'player',x:0,y:.45,z:6,dx:0,dy:0,dz:-1,followGround:false,life:.65});step(s,{},.05);
 assert.equal(s.bullets.length,0);const impact=s.events.find(e=>e.type==='splat');assert.equal(impact.kind,'terrain');near(impact.z,5.35,1e-6);near(impact.y,.45);
});
test('tapered rocks do not produce hits in empty air above their shoulders',()=>{
 const s=arena();assert.equal(traceWorldRay(s,{x:-6.6,y:3.6,z:8},{x:0,y:0,z:-1},12,{ignoreId:'player'}),null);
 const lower=traceWorldRay(s,{x:-6.6,y:1.35,z:8},{x:0,y:0,z:-1},12,{ignoreId:'player'});assert.equal(lower.kind,'rock');assert.ok(lower.z>2);
});
test('camera rays may start outside the arena and skip near scenery without skipping visible actors or ground',()=>{
 const s=arena();assert.equal(traceWorldRay(s,{x:24,y:8,z:30},{x:0,y:0,z:-1},5,{ignoreId:'player'}),null);
 const origin={x:0,y:.45,z:25},direction={x:0,y:0,z:-1};
 assert.equal(traceWorldRay(s,origin,direction,10,{ignoreId:'player'}).kind,'wall');
 assert.equal(traceWorldRay(s,origin,direction,10,{ignoreId:'player',solidFrom:5}),null);
 const a=target(s,0,22),visible=traceWorldRay(s,origin,direction,10,{ignoreId:'player',solidFrom:5});assert.equal(visible.targetId,a.id);assert.ok(visible.distance<5);
 a.ko=true;const ground=traceWorldRay(s,{x:0,y:2,z:25},{x:0,y:-1,z:-1},10,{ignoreId:'player',solidFrom:5});assert.equal(ground.kind,'terrain');assert.ok(ground.distance<5);
});
test('legacy touch and AI shots keep following terrain without a hop-height launch or stale mouse pitch',()=>{
 const s=arena((x,z)=>.05*z),p=s.actors[0];Object.assign(p,{height:.67,aimY:.8,aim3D:true});step(s,{aiming:true,ax:0,az:-1,fire:true});
 const b=s.bullets[0];assert.equal(p.aimY,0);assert.equal(p.aim3D,false);assert.equal(b.followGround,true);near(b.y,.05*b.z+PROJECTILE.originHeight);
 step(s,{},.05);near(b.y,.05*b.z+PROJECTILE.originHeight);
 const explicit=arena((x,z)=>.05*z),a=explicit.actors[0];Object.assign(a,{height:.67});step(explicit,{aiming:true,ax:0,ay:0,az:-1,fire:true});
 assert.equal(explicit.bullets[0].followGround,false);near(explicit.bullets[0].y,.05*8+.67+PROJECTILE.originHeight);
});
test('default preview and actual 3D lifetime end at exactly the same point',()=>{
 const s=arena(),p=s.actors[0];Object.assign(p,{x:0,z:0});aim(p,1,1,0);const preview=traceAim(s,p),result=flight(s);
 assert.equal(result.impact,undefined);near(preview.distance,PROJECTILE.muzzleOffset+RULES.projectileSpeed*RULES.projectileLifetime);
 near(result.bullet.x,preview.x);near(result.bullet.y,preview.y);near(result.bullet.z,preview.z);
});
test('save/resume preserves finite 3D direction but never serializes the world provider or flying projectiles',()=>{
 const s=arena(()=>4),p=s.actors[0];aim(p,0,3,-4);shoot(s,p);const raw=saveRound(s),loaded=loadRound(raw),a=loaded.actors[0];
 assert.equal(a.aim3D,true);near(a.aimY,.6);near(Math.hypot(a.aimX,a.aimY,a.aimZ),1);assert.deepEqual(loaded.bullets,[]);assert.equal(a.ammo,p.ammo);
 near(projectileOrigin(loaded,a).y,PROJECTILE.originHeight);setProjectileWorld(loaded,{ground:()=>4});near(projectileOrigin(loaded,a).y,4+PROJECTILE.originHeight);
 const old=JSON.parse(raw);for(const actor of old.actors){delete actor.aimY;delete actor.aim3D;}const legacy=loadRound(JSON.stringify(old));assert.equal(legacy.actors[0].aimY,0);assert.equal(legacy.actors[0].aim3D,false);
});
