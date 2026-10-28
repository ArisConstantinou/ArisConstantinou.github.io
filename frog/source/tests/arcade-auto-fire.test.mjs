import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,step,shoot,traceShot,traceWorldRay,setProjectileWorld,RULES} from '../src/arcade-model.js';
import {BASES} from '../src/arcade-bases.js';
import {PROJECTILE} from '../src/arcade-projectiles.js';
import {resolveAutoFire} from '../src/arcade-auto-fire.js';

function arena(ground){
 const state=newRound();state.phase='battle';state.intro=0;state.flies.forEach(f=>f.wait=100);
 const actor=state.actors[0],target=state.actors[1];
 Object.assign(actor,{x:0,z:8,aimX:1,aimY:0,aimZ:0,aim3D:true});
 Object.assign(target,{x:0,z:0,dizzyTime:100,ammo:0,load:0,shot:100,tongue:100,kickCooldown:100,machineTimer:100});
 Object.assign(state.actors[2],{ko:true,respawnTime:100});
 if(ground)setProjectileWorld(state,{ground});
 const input={ax:0,ay:0,az:-1,aiming:true};
 return {state,actor,target,input,active:true,aiming:true};
}
const resolve=(fixture,options={})=>resolveAutoFire({...fixture,...options});
const noFire=result=>{assert.equal(result.fire,false);assert.equal(result.targetId,null);};

test('a held aim on a live opponent fires along this frame input without changing state or aim',()=>{
 const fixture=arena(),before=structuredClone(fixture),result=resolve(fixture);
 assert.equal(result.fire,true);assert.equal(result.targetId,fixture.target.id);assert.equal(result.trace.kind,'actor');
 assert.deepEqual(result.trace.direction,{x:0,y:0,z:-1});
 assert.deepEqual(fixture,before,'automatic fire only supplies intent; it cannot steer or simulate');
 assert.equal(traceShot(fixture.state,fixture.actor).targetId,null,'the actor previous aim deliberately points elsewhere');
});

test('the visible body is usable without hidden snapping into the old oversized hit volume',()=>{
 const fixture=arena();fixture.target.x=.35;
 assert.equal(resolve(fixture).fire,true,'the side of the real body remains a target');
 fixture.target.x=.98;noFire(resolve(fixture));fixture.target.load=1;noFire(resolve(fixture));
 fixture.target.x=0;
 noFire(resolve(fixture,{input:{...fixture.input,ax:.3}}));
 noFire(resolve(fixture,{input:{...fixture.input,ay:.3}}));
 noFire(resolve(fixture,{input:{...fixture.input,ay:-.3}}));
});

test('automatic eligibility follows the exact fly lifetime range and arena boundary',()=>{
 const fixture=arena();fixture.actor.z=10;
 // Measure the current body's front surface, then place that surface on either
 // side of the maximum fly travel. No fixed, oversized cylinder is assumed.
 const front=traceWorldRay(fixture.state,{x:0,y:PROJECTILE.originHeight,z:3},{x:0,y:0,z:-1},4,{ignoreId:fixture.actor.id}).z-fixture.target.z;
 fixture.target.z=fixture.actor.z-(RULES.projectileSpeed*RULES.projectileLifetime+PROJECTILE.muzzleOffset+front-.01);
 assert.equal(resolve(fixture).fire,true,'a body entering the last hundredth of fly range is reachable');
 fixture.target.z-=.02;noFire(resolve(fixture));
 // Put the body beyond the current rim, with a clear outward ray. The old
 // 25-unit edge is now playable terrain and contains new outer scenery.
 Object.assign(fixture.actor,{x:RULES.radius-3,z:0});Object.assign(fixture.target,{x:RULES.radius+1.5,z:0});
 const result=resolve(fixture,{input:{ax:1,ay:0,az:0,aiming:true}});noFire(result);assert.equal(result.trace.kind,'boundary');
});

test('house walls block fire, including the short source-to-muzzle sweep',()=>{
 const fixture=arena(),base=BASES[0];
 Object.assign(fixture.actor,{x:base.x,z:base.z+base.halfDepth-.6});
 Object.assign(fixture.target,{x:base.x,z:base.z+base.halfDepth+1.5});
 const result=resolve(fixture,{input:{ax:0,ay:0,az:1,aiming:true}});
 noFire(result);assert.equal(result.trace.kind,'wall');assert.ok(result.trace.distance<PROJECTILE.muzzleOffset);
});

test('seeing over a rock from the camera does not bypass the actual muzzle obstruction',()=>{
 const fixture=arena();Object.assign(fixture.actor,{x:-8,z:8});Object.assign(fixture.target,{x:-8,z:-5});
 const cameraHit=traceWorldRay(fixture.state,{x:-8,y:8,z:8},{x:0,y:-7.55,z:-13},20,{ignoreId:fixture.actor.id});
 assert.equal(cameraHit.targetId,fixture.target.id,'high camera has a clear ray to the target');
 const result=resolve(fixture);noFire(result);assert.equal(result.trace.kind,'rock');
});

test('a terrain ridge blocks auto-fire even when both endpoints are clear',()=>{
 const fixture=arena((x,z)=>z>5.15&&z<5.35?1:0),result=resolve(fixture);
 noFire(result);assert.equal(result.trace.kind,'terrain');
});

test('elevated bodies require real vertical aim and descending shots remain usable',()=>{
 const rising=arena((x,z)=>z<2?2:0);
 noFire(resolve(rising));assert.equal(resolve(rising,{input:{ax:0,ay:2.25,az:-8,aiming:true}}).fire,true);
 noFire(resolve(rising,{input:{ax:0,ay:2.4,az:-8,aiming:true}})); // Above the real body, inside the former invisible cylinder.
 const falling=arena((x,z)=>z>=6?2:0);falling.actor.z=6.1;
 noFire(resolve(falling));assert.equal(resolve(falling,{input:{ax:0,ay:-2,az:-6.1,aiming:true}}).fire,true);
 const airborne=arena();airborne.target.height=2;
 noFire(resolve(airborne));assert.equal(resolve(airborne,{input:{ax:0,ay:2,az:-8,aiming:true}}).fire,true);
});

test('self, knocked-out and eliminated frogs cannot trigger auto-fire',()=>{
 for(const change of [{ko:true},{eliminated:true}]){
  const fixture=arena();Object.assign(fixture.target,change);noFire(resolve(fixture));
 }
 const fixture=arena();fixture.target.ko=true;
 assert.equal(traceShot(fixture.state,{...fixture.actor,aimX:0,aimY:0,aimZ:-1}).targetId,null);
 noFire(resolve(fixture));
});

test('an invulnerable first body suppresses fire and cannot be skipped to shoot someone behind it',()=>{
 const fixture=arena();fixture.target.invuln=.5;
 Object.assign(fixture.state.actors[2],{ko:false,x:0,z:-4,dizzyTime:100});
 const result=resolve(fixture);noFire(result);assert.equal(result.trace.targetId,fixture.target.id);
 fixture.target.invuln=0;assert.equal(resolve(fixture).fire,true);
 fixture.target.spawnShield=.8;noFire(resolve(fixture));
 fixture.target.spawnShield=0;assert.equal(resolve(fixture).fire,true,'fire resumes once the spawn shield ends');
 fixture.actor.invuln=.5;assert.equal(resolve(fixture).fire,true,'shooter protection is not an inability to shoot');
});

test('release, pause, layout editing and input-device disable gates immediately remove fire intent',()=>{
 const fixture=arena();assert.equal(resolve(fixture).fire,true);
 for(const options of [{active:false},{aiming:false},{active:false,aiming:false},{input:{...fixture.input,aiming:false}}])noFire(resolve(fixture,options));
 noFire(resolveAutoFire({state:fixture.state,actor:fixture.actor,input:fixture.input}));
 assert.equal(resolve(fixture).fire,true,'re-arming has no cached target or stale release delay');
});

test('preparation, victory and defeat cannot spend ammunition through auto-fire',()=>{
 const fixture=arena();fixture.state.phase='countdown';noFire(resolve(fixture));
 fixture.state.phase='battle';
 for(const status of ['won','lost','paused']){fixture.state.status=status;noFire(resolve(fixture));}
});

test('incapacitation, an empty magazine, mounting and a sabotage channel suppress normal auto-fire',()=>{
 for(const change of [{ko:true},{eliminated:true},{dizzyTime:.2},{hit:.2},{knockUp:.2},{kick:.2},{ammo:0},{ammo:NaN},{catapultId:'catapult-player'},{sabotageId:'base-rival-1'}]){
  const fixture=arena();Object.assign(fixture.actor,change);noFire(resolve(fixture));
 }
});

test('held sabotage and explicit special actions have priority over auto-fire',()=>{
 const fixture=arena();
 for(const action of ['sabotage','kick','throwStone','interactCatapult','interact'])noFire(resolve(fixture,{input:{...fixture.input,[action]:true}}));
 const manual={...fixture.input,fire:true};assert.equal(resolve(fixture,{input:manual}).fire,true);assert.equal(manual.fire,true);
});

test('missing or invalid current aim cannot fall back to a stale actor direction',()=>{
 const fixture=arena();Object.assign(fixture.actor,{aimX:0,aimY:0,aimZ:-1});
 for(const input of [null,{}, {ax:0,az:0}, {ax:NaN,ay:0,az:-1}, {ax:0,ay:NaN,az:-1}, {ax:0,ay:Infinity,az:-1}, {ax:0,ay:0,az:Infinity}])noFire(resolve(fixture,{input}));
 noFire(resolveAutoFire());noFire(resolveAutoFire({active:true,aiming:true}));
});

test('automatic intent uses the existing firing cooldown without adding a delayed simulation frame',()=>{
 const fixture=arena();fixture.actor.shot=1/120;
 const result=resolve(fixture);assert.equal(result.fire,true);
 assert.equal(shoot(fixture.state,fixture.actor),false,'direct shooting still honors the outstanding cooldown');
 step(fixture.state,{...fixture.input,fire:result.fire},1/60);
 assert.equal(fixture.state.stats.shots,1,'the same upcoming step that clears cooldown can fire');
 assert.equal(fixture.actor.ammo,RULES.capacity-1);assert.equal(fixture.actor.shot,RULES.shotInterval);
});

test('the approved automatic shot remains a physical projectile that can be dodged',()=>{
 const fixture=arena(),result=resolve(fixture);assert.equal(result.fire,true);
 step(fixture.state,{...fixture.input,fire:result.fire},1/60);
 assert.equal(fixture.state.stats.shots,1);assert.equal(fixture.state.bullets.length,1);assert.equal(fixture.state.stats.hits,0);
 fixture.target.x=4;
 for(let i=0;i<45;i++)step(fixture.state,{},1/60);
 assert.equal(fixture.state.stats.hits,0);assert.equal(fixture.state.bullets.length,0);
});
