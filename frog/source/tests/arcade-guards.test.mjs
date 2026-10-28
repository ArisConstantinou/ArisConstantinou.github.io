import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,step,shoot,hit,kick,kickTarget,traceShot,traceWorldRay,saveRound,loadRound,rivalIntent,RULES,setProjectileWorld} from '../src/arcade-model.js';
import {BASES,WALLS,resolveArenaMove,insideHome} from '../src/arcade-bases.js';
import {GUARD_BODY,GUARD_RULES,guardActive,guardHome,guardHasSight,guardChargeLane,hitGuard,stepGuards} from '../src/arcade-guards.js';

const dt=1/60,near=(a,b,tolerance=1e-6)=>assert.ok(Math.abs(a-b)<tolerance,`${a} should equal ${b}`);
function guardFixture(owner='player'){
 const state=newRound(731);state.phase='battle';state.intro=0;
 const guard=state.guards.find(g=>g.owner===owner);state.guards=[guard];
 for(const actor of state.actors)Object.assign(actor,{ko:true,respawnTime:100,ammo:0,tongue:100});
 const target=state.actors.find(actor=>actor.id!==owner);
 Object.assign(target,{ko:false,x:guard.x,z:guard.z-2.3,ammo:0});
 return {state,guard,target};
}
function guardsFor(state,seconds,options={}){
 const events=[];
 for(let i=0;i<Math.ceil(seconds/dt-1e-8);i++){state.events=[];stepGuards(state,dt,{ground:()=>0,hitActor:hit,...options});events.push(...state.events);}
 return events;
}
function modelFor(state,seconds,input={}){
 const events=[];for(let i=0;i<Math.ceil(seconds/dt-1e-8);i++){step(state,input,dt);events.push(...state.events);}return events;
}
function hostileShotFixture(){
 const state=newRound(731);state.phase='battle';state.intro=0;state.flies.forEach(f=>f.wait=100);
 const player=state.actors[0],guard=state.guards.find(g=>g.owner==='rival-1');state.guards=[guard];
 for(const actor of state.actors.slice(1))Object.assign(actor,{ko:true,respawnTime:100});
 Object.assign(player,{x:guard.x+1.85,z:guard.z,aimX:-1,aimY:0,aimZ:0,aim3D:true,ammo:RULES.capacity,tongue:100});
 return {state,player,guard};
}

test('three equally equipped beetles patrol beside storage without blocking a spawn or changing frog scale',()=>{
 const state=newRound();assert.equal(state.guards.length,3);assert.equal(state.actors.length,3);assert.equal(RULES.capacity,90);
 assert.deepEqual(state.actors.map(a=>a.ammo),[90,90,90]);
 for(const [index,guard] of state.guards.entries()){
  const base=BASES[index],home=guardHome(guard);assert.equal(guard.owner,base.owner);assert.equal(guard.baseId,base.id);assert.equal(guard.health,4);assert.equal(guard.maxHealth,4);assert.equal(guard.mode,'patrol');
  assert.ok(insideHome(base,guard,GUARD_BODY.radius));assert.ok(Math.hypot(home.x-base.stock.x,home.z-base.stock.z)>.9);
  assert.ok(Math.hypot(home.x-base.spawn.x,home.z-base.spawn.z)>.64+GUARD_BODY.radius);
  assert.deepEqual(resolveArenaMove(guard,0,0,{radius:GUARD_BODY.radius}),{x:guard.x,z:guard.z});
 }
 guardsFor(state,3);assert.ok(state.guards.every(g=>g.mode==='patrol'&&g.health===4));assert.ok(state.actors.every(a=>a.dizzy===0));
});

test('battle detection starts a full readable warning, while countdown and the owner never trigger an attack',()=>{
 const f=guardFixture();f.state.phase='countdown';guardsFor(f.state,1.5);assert.equal(f.guard.mode,'patrol');assert.equal(f.target.dizzy,0);
 f.state.phase='battle';f.target.x=f.guard.x;f.target.z=f.guard.z-2;
 const started=guardsFor(f.state,dt);assert.equal(f.guard.mode,'windup');near(f.guard.windup,GUARD_RULES.windupSeconds);assert.ok(started.some(e=>e.type==='guardWindup'));
 const position={x:f.guard.x,z:f.guard.z};guardsFor(f.state,.85);assert.equal(f.guard.mode,'windup');assert.deepEqual({x:f.guard.x,z:f.guard.z},position);assert.equal(f.target.dizzy,0);
 const own=guardFixture();own.target.ko=true;const owner=own.state.actors.find(a=>a.id===own.guard.owner);Object.assign(owner,{ko:false,x:own.guard.x,z:own.guard.z-1.8});
 guardsFor(own.state,3);assert.equal(own.guard.mode,'patrol');assert.equal(owner.dizzy,0);
});

test('a committed charge keeps its original direction and an early sideways dodge avoids contact',()=>{
 const f=guardFixture();guardsFor(f.state,dt);
 const locked={x:f.guard.chargeX,z:f.guard.chargeZ,face:f.guard.face,originX:f.guard.chargeOriginX,originZ:f.guard.chargeOriginZ};
 f.target.x-=2.5;
 guardsFor(f.state,GUARD_RULES.windupSeconds);assert.equal(f.guard.mode,'charge');near(f.guard.chargeX,locked.x);near(f.guard.chargeZ,locked.z);near(f.guard.face,locked.face);
 near(f.guard.chargeOriginX,locked.originX);near(f.guard.chargeOriginZ,locked.originZ);
 guardsFor(f.state,GUARD_RULES.chargeSeconds);assert.equal(f.target.dizzy,0);assert.equal(f.guard.mode,'recover');
});

test('a charge hits the first eligible frog only once and then gives a real recovery window',()=>{
 const f=guardFixture(),other=f.state.actors.find(a=>a.id!==f.guard.owner&&a!==f.target);
 Object.assign(other,{ko:false,x:f.guard.x,z:f.guard.z-3,ammo:0});
 const events=guardsFor(f.state,GUARD_RULES.windupSeconds+GUARD_RULES.chargeSeconds+dt);
 assert.equal(f.target.dizzy,1);assert.equal(other.dizzy,0);assert.equal(events.filter(e=>e.type==='guardStrike').length,1);assert.equal(f.guard.mode,'recover');
 const remaining=f.guard.recovery;assert.ok(remaining>.7);
 guardsFor(f.state,.5);assert.equal(f.guard.mode,'recover');assert.equal(f.target.dizzy,1);
});

test('walls prevent detection and committed movement stops before hitting a frog on the other side',()=>{
 const f=guardFixture();Object.assign(f.target,{x:2.2,z:17});assert.equal(guardHasSight(f.guard,f.target),false);
 guardsFor(f.state,2);assert.equal(f.guard.mode,'patrol');assert.equal(f.target.dizzy,0);
 Object.assign(f.guard,{...guardHome(f.guard),mode:'charge',charge:GUARD_RULES.chargeSeconds,chargeX:1,chargeZ:0,chargeHit:false});
 f.guard.chargeOriginX=f.guard.x;f.guard.chargeOriginZ=f.guard.z;
 Object.assign(f.target,{x:4.2,z:f.guard.z});const lane=guardChargeLane(f.guard);
 assert.ok(lane.distance<GUARD_RULES.chargeSpeed*GUARD_RULES.chargeSeconds);
 guardsFor(f.state,GUARD_RULES.chargeSeconds);near(f.guard.x,lane.end.x);near(f.guard.z,lane.end.z);assert.equal(f.target.dizzy,0);assert.equal(f.guard.mode,'recover');
 assert.deepEqual(resolveArenaMove(f.guard,0,0,{radius:GUARD_BODY.radius}),{x:f.guard.x,z:f.guard.z});
});

test('a short charge and its preview both stop at the home leash',()=>{
 const f=guardFixture(),stock=BASES.find(b=>b.id===f.guard.baseId).stock;
 Object.assign(f.guard,{x:stock.x+GUARD_RULES.leashRadius-.18,z:stock.z,mode:'charge',charge:GUARD_RULES.chargeSeconds,chargeX:1,chargeZ:0,chargeHit:false});
 f.guard.chargeOriginX=f.guard.x;f.guard.chargeOriginZ=f.guard.z;f.target.ko=true;
 const lane=guardChargeLane(f.guard);assert.ok(lane.distance<.181);
 guardsFor(f.state,GUARD_RULES.chargeSeconds);near(f.guard.x,lane.end.x);assert.ok(Math.hypot(f.guard.x-stock.x,f.guard.z-stock.z)<=GUARD_RULES.leashRadius+1e-6);
});

test('charge contact respects airborne height, different floors, spawn protection and ordinary hit immunity',()=>{
 for(const setup of [f=>f.target.height=GUARD_BODY.height+.12,f=>f.target.spawnShield=1,f=>f.target.invuln=1]){
  const f=guardFixture();guardsFor(f.state,dt);setup(f);
  guardsFor(f.state,GUARD_RULES.windupSeconds+GUARD_RULES.chargeSeconds);assert.equal(f.target.dizzy,0);
 }
 const high=guardFixture();guardsFor(high.state,dt);const edge=high.guard.x+.4;high.target.x+=.8;
 guardsFor(high.state,GUARD_RULES.windupSeconds+GUARD_RULES.chargeSeconds,{ground:x=>x>edge?2:0});assert.equal(high.target.dizzy,0);
});

test('four real fly impacts disable a hostile guard, and preview uses its exact rounded body',()=>{
 const f=hostileShotFixture(),trace=traceShot(f.state,f.player);assert.equal(trace.kind,'guard');assert.equal(trace.targetId,f.guard.id);assert.equal(trace.blocked,false);
 const camera=traceWorldRay(f.state,{x:f.player.x,y:.31,z:f.player.z},{x:-1,y:0,z:0},3,{ignoreId:f.player.id});assert.equal(camera.kind,'guard');
 assert.equal(traceWorldRay(f.state,{x:f.player.x,y:1,z:f.player.z},{x:-1,y:0,z:0},3,{ignoreId:f.player.id}),null,'empty space above the shell is not a guard hit');
 const events=[];
 for(let i=0;i<4;i++){assert.equal(shoot(f.state,f.player),true);events.push(...modelFor(f.state,.2));assert.equal(f.guard.health,3-i);}
 assert.equal(f.player.ammo,RULES.capacity-4);assert.equal(f.guard.mode,'disabled');assert.ok(f.guard.respawnTime>19.7);assert.equal(events.filter(e=>e.type==='guardDown').length,1);
 assert.ok(events.some(e=>e.type==='splat'&&e.kind==='guard'));assert.equal(f.state.actors.length,3);assert.equal(f.state.status,'playing');assert.equal(traceShot(f.state,f.player).kind!=='guard',true);
});

test('an owner can shoot through the friendly beetle and cannot damage or kick it',()=>{
 const f=guardFixture(),owner=f.state.actors.find(a=>a.id===f.guard.owner);f.target.ko=true;
 Object.assign(owner,{ko:false,x:f.guard.x,z:f.guard.z-1.6,aimX:0,aimY:0,aimZ:1,aim3D:true,ammo:RULES.capacity});
 assert.notEqual(traceShot(f.state,owner).kind,'guard');
 assert.notEqual(traceWorldRay(f.state,{x:owner.x,y:.31,z:owner.z},{x:0,y:0,z:1},3,{ignoreId:owner.id})?.kind,'guard');
 assert.equal(hitGuard(f.state,f.guard,{owner:owner.id}),false);assert.equal(kickTarget(f.state,owner,f.guard.id),null);assert.equal(kick(f.state,owner,f.guard.id),false);
 assert.equal(shoot(f.state,owner),true);modelFor(f.state,.3);assert.equal(f.guard.health,4);
});

test('the normal close kick falls back to a hostile guard and a target-specific kick preserves frog selection',()=>{
 const f=hostileShotFixture();Object.assign(f.guard,{mode:'recover',recovery:10,cooldown:10});
 assert.equal(kickTarget(f.state,f.player)?.id,f.guard.id);assert.equal(kick(f.state,f.player,f.guard.id),true);
 modelFor(f.state,.25);assert.equal(f.guard.health,3);assert.equal(f.player.ammo,RULES.capacity);
 const other=f.state.actors[2];Object.assign(other,{ko:false,x:f.player.x,z:f.player.z-1.6,dizzyTime:4});
 assert.equal(kickTarget(f.state,f.player)?.id,other.id,'ordinary Q keeps its frog priority for the dizzy icon');
 assert.equal(kickTarget(f.state,f.player,f.guard.id)?.id,f.guard.id);assert.equal(kickTarget(f.state,f.player,'guard-missing'),null);
});

test('damage interrupts a guard warning and defeat lasts the full twenty seconds',()=>{
 const f=guardFixture();guardsFor(f.state,dt);assert.equal(f.guard.mode,'windup');
 assert.equal(hitGuard(f.state,f.guard,{owner:f.target.id,damage:1}),true);assert.equal(f.guard.mode,'recover');assert.equal(f.guard.windup,0);assert.ok(f.guard.hit>0);
 f.guard.invuln=0;assert.equal(hitGuard(f.state,f.guard,{owner:f.target.id,damage:3}),true);assert.equal(f.guard.mode,'disabled');f.target.ko=true;
 guardsFor(f.state,GUARD_RULES.respawnSeconds-dt);assert.equal(f.guard.mode,'disabled');assert.equal(f.guard.health,0);
 const events=guardsFor(f.state,dt);assert.equal(f.guard.mode,'patrol');assert.equal(f.guard.health,4);assert.ok(f.guard.cooldown>=GUARD_RULES.windupSeconds);assert.ok(events.some(e=>e.type==='guardRespawn'));
});

test('a defeated defender leaves enough time for real sabotage and disappears with its destroyed base',()=>{
 const f=hostileShotFixture(),base=f.state.bases.find(b=>b.id===f.guard.baseId),definition=BASES.find(b=>b.id===base.id);
 hitGuard(f.state,f.guard,{owner:f.player.id,damage:4});Object.assign(f.player,{...definition.stock,shot:0,hop:0,height:0});
 modelFor(f.state,RULES.sabotageSeconds,{sabotage:true});assert.equal(base.destroyed,true);assert.equal(f.guard.mode,'gone');assert.equal(f.guard.health,0);assert.equal(f.guard.respawnTime,0);
 guardsFor(f.state,25);assert.equal(f.guard.mode,'gone');assert.equal(f.guard.health,0);
});

test('catapult splash can defeat a hostile guard but never its owners guard',()=>{
 for(const friendly of [false,true]){
  const f=guardFixture();f.target.ko=true;
  f.state.shells.push({id:991,owner:friendly?f.guard.owner:'rival-1',startX:f.guard.x-6,startZ:f.guard.z,tx:f.guard.x,tz:f.guard.z,age:1.24,duration:1.25,arcHeight:8});
  step(f.state,{},dt);assert.equal(f.guard.health,friendly?4:0);assert.equal(f.guard.mode,friendly?'patrol':'disabled');
 }
});

test('save and legacy restore keep defender health, defeated timers and destroyed bases separate from frog progress',()=>{
 const state=newRound();state.phase='battle';state.intro=0;state.actors[0].ammo=71;
 const [active,down,gone]=state.guards;hitGuard(state,active,{owner:'rival-1',damage:1});hitGuard(state,down,{owner:'player',damage:4});down.respawnTime=13.25;
 state.bases.find(b=>b.id===gone.baseId).destroyed=true;stepGuards(state,dt);
 const loaded=loadRound(saveRound(state));assert.equal(loaded.guards.length,3);assert.equal(loaded.guards[0].health,3);assert.equal(loaded.guards[0].mode,'patrol');assert.ok(loaded.guards[0].cooldown>=GUARD_RULES.windupSeconds);
 assert.equal(loaded.guards[1].mode,'disabled');near(loaded.guards[1].respawnTime,down.respawnTime);assert.equal(loaded.guards[2].mode,'gone');assert.equal(loaded.actors[0].ammo,71);
 const legacy=JSON.parse(saveRound(state));delete legacy.guards;delete legacy.guardVersion;
 const migrated=loadRound(JSON.stringify(legacy));assert.equal(migrated.guards[0].health,4);assert.equal(migrated.guards[1].health,4);assert.equal(migrated.guards[2].mode,'gone');assert.equal(migrated.actors[0].ammo,71);
 const invalid=JSON.parse(saveRound(state));Object.assign(invalid.guards[1],{x:1000,z:-1000,respawnTime:Infinity});const safe=loadRound(JSON.stringify(invalid));assert.equal(safe.guards[1].mode,'disabled');assert.equal(safe.guards[1].health,0);assert.ok(safe.guards[1].respawnTime>0&&safe.guards[1].respawnTime<=20);assert.ok(insideHome(BASES[1],safe.guards[1],GUARD_BODY.radius));
});

test('bots recognize the defending beetle and defeat it before attempting storage sabotage',()=>{
 const state=newRound(731);state.phase='battle';state.intro=0;state.flies.forEach(f=>f.wait=100);
 const bot=state.actors[1],guard=state.guards[0],base=BASES[0];state.guards=[guard];
 for(const actor of [state.actors[0],state.actors[2]])Object.assign(actor,{ko:true,respawnTime:100});
 Object.assign(bot,{x:.1,z:20.35,raidId:base.id,ammo:RULES.capacity,machineTimer:100,tongue:100});
 const intent=rivalIntent(state,bot);assert.equal(intent.sabotage,undefined);assert.equal(bot.aiTargetId,guard.id);assert.ok(bot.aiReaction>=.35);
 let downAt=null,sabotageAt=null;
 for(let i=0;i<2400&&!state.bases[0].destroyed;i++){
  step(state,{},dt);
  for(const event of state.events){if(event.type==='guardDown'&&event.id===guard.id&&downAt===null)downAt=state.time;if(event.type==='sabotageStart'&&event.by===bot.id&&sabotageAt===null)sabotageAt=state.time;}
 }
 assert.notEqual(downAt,null,'the bot must fight the physical guard rather than stall forever');assert.notEqual(sabotageAt,null,'the bot must resume the objective after clearing the defender');assert.ok(sabotageAt>downAt);
 assert.equal(state.bases[0].destroyed,true);assert.ok(bot.ammo<RULES.capacity,'the bot still pays for its fly attacks');
});

test('bot refill decisions scale with the shared ninety-fly carrying limit',()=>{
 const state=newRound();state.phase='battle';const bot=state.actors[1];for(const actor of [state.actors[0],state.actors[2]])actor.ko=true;
 bot.ammo=8;rivalIntent(state,bot);assert.equal(bot.refilling,true);
 bot.ammo=71;rivalIntent(state,bot);assert.equal(bot.refilling,true);
 bot.ammo=72;rivalIntent(state,bot);assert.equal(bot.refilling,false);
});
