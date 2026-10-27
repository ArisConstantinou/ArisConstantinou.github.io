import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,step,collect,shoot,hit,kick,loadRound,saveRound,RULES,SWARMS,OBSTACLES} from '../src/arcade-model.js';
const tick=(s,input={},frames=1)=>{for(let i=0;i<frames;i++)step(s,input,1/60);};
const noFlies=s=>s.flies.forEach(f=>f.wait=100);

test('flies inhabit six distinct patches and replenish the same patch',()=>{
 const s=newRound();assert.equal(SWARMS.length,6);
 for(const patch of SWARMS){const flies=s.flies.filter(f=>f.swarmId===patch.id);assert.equal(flies.length,12);for(const f of flies){assert.ok(Math.hypot(f.x-patch.x,f.z-patch.z)<=patch.radius+.001);assert.ok(OBSTACLES.every(o=>Math.hypot(f.x-o.x,f.z-o.z)>o.r+.1));}}
 const f=s.flies[22],patch=SWARMS.find(p=>p.id===f.swarmId);f.wait=.01;tick(s);assert.equal(f.wait,0);assert.ok(Math.hypot(f.x-patch.x,f.z-patch.z)<=patch.radius);
});
test('walking past a patch refills without collect input or facing its flies',()=>{
 const s=newRound(),p=s.actors[0];Object.assign(p,{x:0,z:4,aimX:0,aimZ:1,ammo:0});tick(s,{mx:.12,mz:0,aiming:true,ax:0,az:1},90);
 assert.ok(p.x>0);assert.ok(s.stats.caught>=5);assert.equal(s.phase,'countdown');assert.ok(p.ammo<=RULES.capacity);
});
test('empty patches do not create empty tongues or ammunition',()=>{
 const s=newRound(),p=s.actors[0];Object.assign(p,{x:0,z:0,ammo:0});noFlies(s);assert.equal(collect(s,p),false);assert.equal(p.tongue,0);assert.deepEqual(s.events,[]);tick(s,{},30);assert.equal(p.ammo,0);assert.equal(p.tongue,0);
});
test('automatic collection obeys range, obstacles, depletion and capacity',()=>{
 const s=newRound(),p=s.actors[0];noFlies(s);Object.assign(p,{x:-10.4,z:2,ammo:0});Object.assign(s.flies[0],{x:-6.3,z:2,wait:0});
 // Place fly just inside pickup range but behind a rock; its blocked segment must win.
 Object.assign(p,{x:-9.7,z:2});Object.assign(s.flies[0],{x:-6.6,z:2});tick(s);assert.equal(p.ammo,0);
 Object.assign(p,{x:0,z:4,ammo:RULES.capacity-1});Object.assign(s.flies[0],{x:0,z:3.5,wait:0});tick(s);assert.equal(p.ammo,RULES.capacity);assert.ok(s.flies[0].wait>0);p.tongue=0;assert.equal(collect(s,p),false);
});
test('analog movement preserves small tilts and accepts arbitrary angles',()=>{
 const slow=newRound(),fast=newRound();Object.assign(slow.actors[0],{x:0,z:0});Object.assign(fast.actors[0],{x:0,z:0});noFlies(slow);noFlies(fast);tick(slow,{mx:.2,mz:.13,aiming:false},10);tick(fast,{mx:1,mz:.65,aiming:false},10);
 const a=slow.actors[0],b=fast.actors[0];assert.ok(a.x>0&&a.z>0);assert.ok(a.x<b.x*.3);assert.ok(Math.abs(a.z/a.x-.65)<1e-8);assert.ok(a.height>0);
});
test('mid-hop steering reacts before landing and release immediately brakes travel',()=>{
 const s=newRound(),p=s.actors[0];noFlies(s);tick(s,{mx:1,mz:0,aiming:false},4);const x=p.x,z=p.z;tick(s,{mx:0,mz:1,aiming:false},4);assert.ok(p.hop>0);assert.equal(p.x,x);assert.ok(p.z>z);
 const stopped=[p.x,p.z];tick(s,{aiming:false},3);assert.deepEqual([p.x,p.z],stopped);assert.ok(p.hop>0);
});
test('travel owns facing except while an explicit aim input owns shooting',()=>{
 const s=newRound(),p=s.actors[0];tick(s,{mx:1,mz:0,aiming:false,ax:0,az:-1});assert.equal(p.face,Math.PI/2);assert.equal(p.aimX,1);assert.equal(p.aimZ,0);assert.equal(p.aiming,false);
 tick(s,{mx:1,mz:0,aiming:true,ax:0,az:-1});assert.equal(p.aimX,0);assert.equal(p.aimZ,-1);assert.equal(p.aiming,true);
 tick(s,{mx:0,mz:1,ax:1,az:0});assert.equal(p.aiming,true,'legacy supplied aim remains deliberate');assert.equal(p.aimX,1);
 tick(s,{mx:-1,mz:0,aiming:false,ax:1,az:0});assert.equal(p.aimX,-1);assert.equal(p.aiming,false);
});
test('rivals wait at home with full magazines and cannot move or attack during the shared warm-up',()=>{
 const s=newRound(),before=s.actors.slice(1).map(a=>({x:a.x,z:a.z}));s.actors[0].z=3.5;tick(s,{},600);assert.equal(s.phase,'countdown');assert.deepEqual(s.actors.slice(1).map(a=>({x:a.x,z:a.z})),before);assert.ok(s.actors.slice(1).every(a=>a.ammo>0&&a.catapultId===null));assert.equal(s.bullets.length,0);
 assert.equal(shoot(s,s.actors[0]),true);tick(s,{},599);assert.equal(s.phase,'countdown');tick(s);assert.equal(s.phase,'battle');
});
test('dizzy hit damage and recovery work symmetrically for the player',()=>{
 const s=newRound(),p=s.actors[0];s.phase='battle';hit(s,p,{owner:'rival-1',dx:1,dz:0,damage:8});assert.equal(p.dizzy,RULES.dizzyHits);assert.equal(p.finishHits,2);assert.equal(p.ko,false);
 assert.equal(hit(s,p,{owner:'rival-1',dx:1,dz:0,damage:4}),false,'one blast cannot bypass immunity');p.invuln=0;hit(s,p,{owner:'rival-1',dx:1,dz:0});tick(s);assert.equal(s.status,'playing');assert.equal(p.ko,true);assert.ok(p.respawnTime>0);
 const r=newRound(),a=r.actors[0];hit(r,a,{owner:'rival-1',dx:0,dz:1,damage:8});a.dizzyTime=.01;tick(r);assert.equal(a.finishHits,0);assert.equal(a.dizzy,0);
});
test('kick does not execute a fresh dizzy opponent and has a real cooldown',()=>{
 const s=newRound(),p=s.actors[0],a=s.actors[1];s.phase='battle';Object.assign(p,{x:0,z:8});Object.assign(a,{x:1.7,z:8,idle:10,kickCooldown:10});hit(s,a,{owner:'player',dx:0,dz:1,damage:6});a.invuln=0;a.impulseX=a.impulseZ=0;
 assert.equal(kick(s,p),true);tick(s,{},14);assert.equal(a.ko,false);assert.equal(a.finishHits,1);p.kick=0;assert.equal(kick(s,p),false);
});
test('legacy saves retain resource depletion and progress while moving flies into patches',()=>{
 const s=newRound();delete s.swarmVersion;s.time=123;s.phase='battle';s.actors[0].ammo=27;s.actors[1].ko=true;
 for(const f of s.flies){delete f.swarmId;f.x=20;f.z=20;f.wait=5;}
 const loaded=loadRound(saveRound(s));assert.equal(loaded.time,123);assert.equal(loaded.phase,'battle');assert.equal(loaded.actors[0].ammo,27);assert.equal(loaded.actors[1].ko,true);
 for(const f of loaded.flies){const p=SWARMS.find(p=>p.id===f.swarmId);assert.ok(Math.hypot(f.x-p.x,f.z-p.z)<=p.radius+.001);assert.equal(f.wait,5);}
});
test('fly ammunition expires at the configured short range',()=>{
 const s=newRound(),p=s.actors[0];Object.assign(p,{x:-10,z:0,ammo:1,aimX:1,aimZ:0});noFlies(s);shoot(s,p);const b=s.bullets[0],start=b.x;tick(s,{},40);assert.equal(s.bullets.length,0);assert.ok(b.x-start<=RULES.projectileSpeed*RULES.projectileLifetime+1e-8);
});
test('rivals react before visibly winding up their first shot and cannot fire a continuous laser',()=>{
 const s=newRound(),p=s.actors[0],a=s.actors[1];s.phase='battle';s.actors[2].ko=true;s.actors[2].respawnTime=99;noFlies(s);Object.assign(p,{x:0,z:8});Object.assign(a,{x:0,z:-2,ammo:40,refilling:false,idle:99,brain:99,decision:0,machineTimer:99});
 const shots=[];let sawWindup=false;for(let i=0;i<150;i++){step(s);if(i===0){assert.ok(a.aiReaction>0);assert.equal(a.aimWindup,0);}sawWindup ||= a.aimWindup>0;if(i<40)assert.ok(!s.events.some(e=>e.type==='shot'&&e.id===a.id));if(s.events.some(e=>e.type==='shot'&&e.id===a.id))shots.push(s.time);}
 assert.equal(sawWindup,true);assert.ok(shots.length>=2&&shots.length<=3);for(let i=1;i<shots.length;i++)assert.ok(shots[i]-shots[i-1]>=.6);assert.ok(p.dizzy>0,'real rival projectiles can still hit a stationary player');
});
test('enemy windup commits its aim rather than instantly tracking a dodge',()=>{
 const s=newRound(),p=s.actors[0],a=s.actors[1];s.phase='battle';s.actors[2].ko=true;s.actors[2].respawnTime=99;noFlies(s);Object.assign(p,{x:0,z:8});Object.assign(a,{x:0,z:-2,ammo:40,refilling:false,idle:99,brain:99,machineTimer:99});for(let i=0;i<90&&!a.aiCharging;i++)tick(s);assert.equal(a.aiCharging,true);const held=[a.aiAimX,a.aiAimZ];p.x=5;tick(s,{},8);assert.deepEqual([a.aiAimX,a.aiAimZ],held);assert.ok(a.aimWindup>0);
});
test('real player projectiles register owner-confirmed hits and finish from outside kick range',()=>{
 const s=newRound(),p=s.actors[0],a=s.actors[1];s.phase='battle';s.actors[2].ko=true;s.actors[2].respawnTime=99;noFlies(s);Object.assign(p,{x:0,z:8,ammo:30});Object.assign(a,{x:0,z:0,idle:99,tongue:99,shot:99,brain:99,machineTimer:99,kickCooldown:99});let hitEvents=0;
 for(let i=0;i<180&&s.status==='playing';i++){step(s,{fire:true,aiming:true,ax:0,az:-1});hitEvents+=s.events.filter(e=>e.type==='hit'&&e.id===a.id&&e.owner==='player').length;}
 assert.equal(a.ko,true);assert.ok(hitEvents>=9);assert.equal(s.stats.kos,1);assert.equal(p.kick,0);assert.ok(Math.hypot(p.x-a.x,p.z-a.z)>RULES.kickRange);
});
