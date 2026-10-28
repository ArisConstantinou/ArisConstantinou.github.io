import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,step,hit,shoot,saveRound,loadRound,moveBody,projectileOrigin,RULES} from '../src/arcade-model.js';
import {ARTILLERY,CATAPULTS,stoneTarget,nearbyCatapult,interactCatapult,throwStone,stepArtillery} from '../src/arcade-artillery.js';
import {BASES,navigateTo,resolveWallMove,hasWallSight} from '../src/arcade-bases.js';
import {FROG_BODY} from '../src/arcade-actor-bounds.js';
import {ARENA_MOVE_RADIUS} from '../src/arcade-battleground.js';
const frame=(s,input={},n=1)=>{for(let i=0;i<n;i++)step(s,input,1/60);};
function mounted(){const s=newRound();s.phase='battle';const p=s.actors[0],machine=s.catapults[0];Object.assign(p,{x:machine.x,z:machine.z+2.05,ammo:17});assert.equal(interactCatapult(s,p),true);for(const a of s.actors.slice(1))Object.assign(a,{idle:99,shot:99,machineTimer:99,tongue:99});return {s,p,machine};}

test('three stationary stations are assigned to distinct sides and stay inside arena',()=>{
 const s=newRound();assert.equal(s.catapults.length,3);assert.deepEqual(s.catapults.map(c=>c.owner),s.actors.map(a=>a.id));assert.equal(s.stones,undefined);
 for(const c of CATAPULTS)assert.ok(Math.hypot(c.x,c.z)<RULES.radius-1);
});
test('interaction mounts only a nearby owned station and a held input cannot toggle repeatedly',()=>{
 const s=newRound(),p=s.actors[0],c=s.catapults[0];assert.equal(nearbyCatapult(s,p),null);assert.equal(interactCatapult(s,p),false);Object.assign(p,{x:c.x,z:c.z+2.05});frame(s,{interactCatapult:true},10);assert.equal(p.catapultId,c.id);assert.equal(c.occupant,'player');
 frame(s);frame(s,{interactCatapult:true});assert.equal(p.catapultId,null);assert.equal(c.occupant,null);Object.assign(p,{x:s.catapults[1].x,z:s.catapults[1].z+2.05});assert.equal(interactCatapult(s,p),false);
});
test('mounted movement and fly fire are disabled without consuming or collecting mouth ammunition',()=>{
 const {s,p,machine}=mounted();const ammo=p.ammo;Object.assign(s.flies[0],{x:p.x,z:p.z,wait:0});frame(s,{mx:1,mz:1,fire:true,aiming:true,ax:1,az:0},30);
 assert.deepEqual([p.x,p.z],[machine.x,machine.z]);assert.equal(p.ammo,ammo);assert.equal(p.hop,0);assert.equal(s.bullets.filter(b=>b.owner==='player').length,0);assert.equal(machine.aimX,1);
});
test('catapult fires one stone on explicit release and automatically reloads after cooldown',()=>{
 const {s,p,machine}=mounted(),target={x:0,z:-5};frame(s,{aiming:true,ax:0,az:-1},10);assert.equal(s.shells.length,0);assert.equal(throwStone(s,p,target),true);assert.equal(p.ammo,17);assert.equal(s.shells.length,1);assert.equal(machine.loaded,false);assert.equal(throwStone(s,p,target),false);
 stepArtillery(s,ARTILLERY.cooldown-.1,hit);assert.equal(machine.loaded,false);stepArtillery(s,.11,hit);assert.equal(machine.loaded,true);assert.equal(throwStone(s,p,target),true);
});
test('unmounted frogs and tutorial machines cannot fire stones',()=>{
 const s=newRound(),p=s.actors[0],c=s.catapults[0];assert.equal(throwStone(s,p,{x:0,z:-5}),false);Object.assign(p,{x:c.x,z:c.z+2.05});interactCatapult(s,p);assert.equal(throwStone(s,p,{x:0,z:-5}),false);frame(s,{throwStone:{x:0,z:-5}},30);assert.equal(s.shells.length,0);assert.ok(s.actors.slice(1).every(a=>a.catapultId===null));
});
test('stone trajectory warns for a full flight and damage happens only on impact',()=>{
 const {s,p}=mounted(),a=s.actors[1];Object.assign(a,{x:0,z:-5});throwStone(s,p,{x:0,z:-5});const shell=s.shells[0];assert.equal(shell.startHeight,1.6);assert.equal(shell.arcHeight,8);
 stepArtillery(s,1.2,hit);assert.equal(a.dizzy,0);assert.equal(s.shells.length,1);stepArtillery(s,.06,hit);assert.equal(a.dizzy,4);assert.equal(s.shells.length,0);assert.ok(s.events.some(e=>e.type==='stoneImpact'));assert.ok(s.events.some(e=>e.type==='hit'&&e.owner==='player'));
});
test('moving out of the marked impact area avoids an incoming stone',()=>{
 const {s,p}=mounted(),a=s.actors[1];Object.assign(a,{x:0,z:-5});throwStone(s,p,{x:0,z:-5});stepArtillery(s,.6,hit);a.x=4;stepArtillery(s,.7,hit);assert.equal(a.dizzy,0);
});
test('blast has falloff and can hurt the shooter symmetrically after dismount',()=>{
 const {s,p}=mounted();throwStone(s,p,{x:0,z:5});interactCatapult(s,p);Object.assign(p,{x:0,z:5});Object.assign(s.actors[1],{x:2.5,z:5});Object.assign(s.actors[2],{x:3.2,z:5});stepArtillery(s,ARTILLERY.flightTime,hit);
 assert.equal(p.dizzy,4);assert.equal(s.actors[1].dizzy,2);assert.equal(s.actors[2].dizzy,0);assert.equal(s.stats.kos,0);
});
test('dizziness and KO eject the operator and free occupancy immediately',()=>{
 const {s,p,machine}=mounted();hit(s,p,{owner:'rival-1',dx:0,dz:1,damage:6});assert.equal(p.catapultId,null);assert.equal(machine.occupant,null);
 p.dizzyTime=0;p.dizzy=0;p.invuln=0;Object.assign(p,{x:machine.x,z:machine.z+2.05});interactCatapult(s,p);hit(s,p,{owner:'rival-1',dx:0,dz:1,damage:9});assert.equal(p.ko,true);assert.equal(machine.occupant,null);
});
test('save/resume ejects mounts, preserves mouth stock and machine cooldown, drops airborne attacks',()=>{
 const {s,p,machine}=mounted();throwStone(s,p,{x:0,z:-5});machine.cooldown=1.8;const r=loadRound(saveRound(s));assert.equal(r.actors[0].ammo,17);assert.equal(r.actors[0].catapultId,null);assert.equal(r.catapults[0].occupant,null);assert.equal(r.catapults[0].cooldown,1.8);assert.equal(r.catapults[0].loaded,false);assert.deepEqual(r.shells,[]);
});
test('older saves migrate without resetting fly ammunition, time or knockout progress',()=>{
 const s=newRound();delete s.catapults;delete s.shells;s.time=81;s.actors[0].ammo=29;s.actors[1].ko=true;const r=loadRound(saveRound(s));assert.equal(r.time,81);assert.equal(r.actors[0].ammo,29);assert.equal(r.actors[1].ko,true);assert.equal(r.catapults.length,3);
});
test('catapult target range exceeds flies but remains inside the arena',()=>{
 const p={x:0,z:12},target=stoneTarget(p,0,-1,1);assert.equal(Math.hypot(target.x-p.x,target.z-p.z),ARTILLERY.maxRange);assert.ok(ARTILLERY.maxRange>RULES.projectileLifetime*RULES.projectileSpeed);const edge=stoneTarget({x:ARENA_MOVE_RADIUS-2,z:0},1,0,1);assert.ok(Math.hypot(edge.x,edge.z)<=ARENA_MOVE_RADIUS);
});
test('approach stops outside machine base, mounting stays seated and exit clears the base',()=>{
 const s=newRound(),p=s.actors[0],c=s.catapults[0];Object.assign(p,{x:c.x,z:c.z+5.2});frame(s,{mx:0,mz:-1,aiming:false},60);
 const clearance=ARTILLERY.baseRadius+FROG_BODY.movementRadius;assert.ok(Math.hypot(p.x-c.x,p.z-c.z)>=clearance-1e-8);assert.ok(p.z>c.z);assert.equal(nearbyCatapult(s,p),c);
 frame(s,{interactCatapult:true});frame(s,{mx:1,mz:1},20);assert.deepEqual([p.x,p.z],[c.x,c.z]);assert.equal(p.catapultId,c.id);
 frame(s,{interactCatapult:true});assert.equal(p.catapultId,null);assert.equal(c.occupant,null);assert.ok(Math.hypot(p.x-c.x,p.z-c.z)>clearance);assert.ok(Math.hypot(p.x,p.z)<RULES.radius-1);
});
test('every owner can navigate from home to the relocated station, mount, dismount and return through the real gates',()=>{
 const s=newRound();s.phase='battle';
 for(const actor of s.actors){
  const station=s.catapults.find(c=>c.owner===actor.id),home=BASES.find(b=>b.owner===actor.id);
  for(let i=0;i<1600&&!nearbyCatapult(s,actor);i++){const direction=navigateTo(actor,station);moveBody(actor,direction.x*.08,direction.z*.08);}
  assert.equal(nearbyCatapult(s,actor),station);assert.equal(interactCatapult(s,actor),true);
  assert.deepEqual([actor.x,actor.z],[station.x,station.z]);assert.equal(interactCatapult(s,actor),true);
  assert.equal(actor.catapultId,null);assert.equal(station.occupant,null);
  assert.deepEqual(resolveWallMove(actor,0,0),{x:actor.x,z:actor.z},'dismount does not intersect a wall');
  assert.ok(Math.hypot(actor.x-station.x,actor.z-station.z)>ARTILLERY.baseRadius+FROG_BODY.movementRadius);assert.ok(hasWallSight(actor,station));
  for(let i=0;i<1600&&Math.hypot(actor.x-home.stock.x,actor.z-home.stock.z)>.25;i++){const direction=navigateTo(actor,home.stock);moveBody(actor,direction.x*.08,direction.z*.08);}
  assert.ok(Math.hypot(actor.x-home.stock.x,actor.z-home.stock.z)<.25,`${actor.id} can refill after using its side station`);
 }
});
test('machine base collision does not shield its operator from ordinary fly projectiles',()=>{
 const {s,p,machine}=mounted(),a=s.actors[1];Object.assign(a,{x:machine.x,z:machine.z+4,ammo:1,tongue:99,shot:0});
 const origin=projectileOrigin(s,a),body=projectileOrigin(s,p);
 Object.assign(a,{aimX:body.x-origin.x,aimY:body.y-origin.y,aimZ:body.z-origin.z,aim3D:true});
 assert.equal(shoot(s,a),true);frame(s,{},20);assert.equal(p.dizzy,1);assert.equal(p.catapultId,machine.id);
});
test('near-edge artillery preview preserves aimed direction and marks impossible short range invalid',()=>{
 const angle=-2.3,source={x:Math.cos(angle)*(ARENA_MOVE_RADIUS-2),z:Math.sin(angle)*(ARENA_MOVE_RADIUS-2)},n=Math.hypot(source.x,source.z),target=stoneTarget(source,source.x/n,source.z/n,1);
 assert.equal(target.valid,false);assert.ok(target.range<ARTILLERY.minRange);assert.ok(Math.hypot(target.x,target.z)<=ARENA_MOVE_RADIUS+1e-8);assert.ok(Math.abs((target.x-source.x)*source.z-(target.z-source.z)*source.x)<1e-8);
 const {s,p,machine}=mounted();assert.equal(throwStone(s,p,target),false);assert.equal(machine.loaded,true);assert.equal(s.shells.length,0);
});
test('stone center and rim impacts lift actual actors, push them back and land once',()=>{
 const {s,p}=mounted(),center=s.actors[1],rim=s.actors[2];Object.assign(center,{x:0,z:-5});Object.assign(rim,{x:2.5,z:-5});
 throwStone(s,p,{x:0,z:-5});stepArtillery(s,ARTILLERY.flightTime,hit);assert.equal(center.knockUpPeak,ARTILLERY.centerLift);assert.equal(rim.knockUpPeak,ARTILLERY.rimLift);assert.equal(center.hop,0);
 let centerPeak=0,rimPeak=0,centerLands=0,rimLands=0,centerLandHeight=null,rimLandHeight=null,centerLandZ=null,rimLandX=null;
 for(let i=0;i<35;i++){step(s);centerPeak=Math.max(centerPeak,center.height);rimPeak=Math.max(rimPeak,rim.height);const lands=s.events.filter(e=>e.type==='land'&&e.stone);if(lands.some(e=>e.id===center.id)){centerLands++;centerLandHeight=center.height;centerLandZ=center.z;}if(lands.some(e=>e.id===rim.id)){rimLands++;rimLandHeight=rim.height;rimLandX=rim.x;}}
 assert.ok(centerPeak>.8&&centerPeak<.9);assert.ok(rimPeak>.4&&rimPeak<centerPeak);assert.ok(centerLandZ<-5.9);assert.ok(rimLandX>3.1);assert.equal(centerLandHeight,0);assert.equal(rimLandHeight,0);assert.equal(center.knockUp,0);assert.equal(rim.knockUp,0);assert.equal(centerLands,1);assert.equal(rimLands,1);
});
test('stone ejects a mounted player below the dizzy threshold and launch overrides held hopping',()=>{
 const {s,p,machine}=mounted();s.shells.push({id:99,owner:'rival-1',startX:p.x,startZ:p.z-12,startHeight:1.6,tx:p.x,tz:p.z,age:0,duration:ARTILLERY.flightTime,arcHeight:8});stepArtillery(s,ARTILLERY.flightTime,hit);
 assert.equal(p.dizzy,4);assert.equal(p.catapultId,null);assert.equal(machine.occupant,null);assert.equal(p.ammo,17);assert.ok(p.knockUp>0);assert.equal(interactCatapult(s,p),false);
 const x=p.x,z=p.z;frame(s,{mx:1,mz:0,aiming:true,ax:1,az:0},12);assert.ok(p.height>.8);assert.equal(p.hop,0);assert.equal(p.x,x,'held movement does not replace launch with an ordinary hop');assert.ok(p.z>z);assert.equal(p.aimX,1);
 frame(s,{},22);assert.equal(p.height,0);assert.equal(p.knockUp,0);assert.equal(p.catapultId,null);
});
test('ordinary fly hits retain their existing reaction without launching the target',()=>{
 const s=newRound(),p=s.actors[0];hit(s,p,{owner:'rival-1',dx:1,dz:0});assert.equal(p.knockUp,0);assert.equal(p.height,0);assert.equal(p.impulseX,5);assert.equal(p.dizzy,1);
});
