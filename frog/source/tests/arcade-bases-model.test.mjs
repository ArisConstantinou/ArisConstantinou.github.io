import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,step,collect,shoot,hit,saveRound,loadRound,RULES,ownBase,sabotageTarget,rivalIntent,canDetect,moveBody} from '../src/arcade-model.js';
import {BASES,TREES,WALLS,coverAt,hasWallSight} from '../src/arcade-bases.js';
const tick=(s,input={},seconds=1)=>{for(let i=0;i<Math.round(seconds*60);i++)step(s,input,1/60);};
function sandbox(){const s=newRound();s.phase='battle';s.intro=0;for(const a of s.actors.slice(1)){a.dizzyTime=1000;a.impulseX=a.impulseZ=0;}return s;}
function atEnemyStore(s){const p=s.actors[0],g=BASES[1];Object.assign(p,{x:g.stock.x,z:g.stock.z,hop:0,idle:0,shot:0,tongue:0});return {p,g,b:s.bases[1]};}

test('new round has three occupied homes, zero carried flies and a shared 20-second clock',()=>{
 const s=newRound();assert.equal(s.version,2);assert.equal(s.phase,'countdown');assert.equal(s.intro,20);assert.equal(RULES.capacity,60);
 assert.equal(s.bases.length,3);assert.ok(s.bases.every(b=>!b.destroyed));
 s.actors.forEach((a,i)=>{assert.equal(a.ammo,0);assert.deepEqual({x:a.x,z:a.z},BASES[i].spawn);assert.ok(Math.hypot(a.x-BASES[i].stock.x,a.z-BASES[i].stock.z)<RULES.pickupRange);assert.equal(ownBase(s,a).owner,a.id);});
});
test('warm-up counts down immediately inside the home and never waits for a first shot',()=>{
 const s=newRound(),positions=s.actors.map(a=>[a.x,a.z]);tick(s,{},19.9);
 assert.equal(s.phase,'countdown');assert.ok(s.intro>0&&s.intro<.11);assert.equal(s.stats.shots,0);assert.ok(s.actors.every(a=>a.ammo===60));assert.deepEqual(s.actors.map(a=>[a.x,a.z]),positions);
 tick(s,{},.1);assert.equal(s.phase,'battle');assert.equal(s.intro,0);
});
test('moving out, firing, or finding no flies cannot reset or delay the shared clock',()=>{
 const s=newRound(),p=s.actors[0];Object.assign(p,{x:0,z:0,ammo:1,tongue:100});for(const f of s.flies)f.wait=100;shoot(s,p);tick(s,{},5);
 assert.equal(s.stats.shots,1);assert.ok(Math.abs(s.intro-15)<1e-8);tick(s,{},15);assert.equal(s.phase,'battle');
});
test('automatic home refill has unlimited reserve but enforces 60 carried flies',()=>{
 const s=newRound(),p=s.actors[0];s.flies.forEach(f=>f.wait=100);tick(s,{},14);assert.equal(p.ammo,60);assert.equal(collect(s,p),false);
 for(let i=0;i<100;i++){p.shot=0;p.hit=0;assert.equal(shoot(s,p),true);p.tongue=0;assert.equal(collect(s,p),true);assert.equal(p.ammo,60);}
 assert.equal(ownBase(s,p).destroyed,false);assert.equal(s.stats.caught,160);
});
test('an enemy store supplies no free ammunition and destroyed stores cannot refill',()=>{
 const s=sandbox(),{p}=atEnemyStore(s);s.flies.forEach(f=>f.wait=100);assert.equal(collect(s,p),false);assert.equal(p.ammo,0);
 Object.assign(p,BASES[0].spawn);s.bases[0].destroyed=true;assert.equal(collect(s,p),false);
});
test('storage sabotage requires ten uninterrupted battle seconds at the actual storage',()=>{
 const s=sandbox(),{p,b}=atEnemyStore(s);assert.equal(sabotageTarget(s,p),b);tick(s,{sabotage:true},9.9);assert.equal(b.destroyed,false);assert.ok(b.progress>9.89);assert.equal(b.attackerId,p.id);
 tick(s,{sabotage:true},.1);assert.equal(b.destroyed,true);assert.equal(s.actors[1].eliminated,true);assert.equal(s.stats.basesDestroyed,1);assert.equal(s.status,'playing');
 const g=BASES[2];Object.assign(p,{x:g.stock.x,z:g.stock.z,hop:0,shot:0});tick(s,{sabotage:true},10);assert.equal(s.status,'won');assert.equal(s.bases.filter(b=>!b.destroyed).length,1);
});
test('warm-up blocks sabotage even inside the opposing storage',()=>{
 const s=newRound(),{b}=atEnemyStore(s);tick(s,{sabotage:true},10);assert.equal(b.progress,0);assert.equal(b.destroyed,false);assert.equal(s.phase,'countdown');
});
test('a real hit resets sabotage and enforces recovery before a held input can restart',()=>{
 const s=sandbox(),{p,b}=atEnemyStore(s);tick(s,{sabotage:true},2);assert.ok(b.progress>1.99);
 assert.equal(hit(s,p,{owner:'rival-2',dx:1,dz:0,force:0}),true);assert.equal(b.progress,0);assert.equal(b.attackerId,null);assert.ok(s.events.some(e=>e.type==='sabotageInterrupted'&&e.reason==='hit'));
 tick(s,{sabotage:true},.4);assert.equal(b.progress,0);tick(s,{sabotage:true},.3);assert.ok(b.progress>.1&&b.progress<.3);assert.equal(b.destroyed,false);
});
test('release, movement, and firing cancel sabotage instead of preserving partial destruction',()=>{
 for(const input of [{},{mx:.5,mz:0},{fire:true}]){const s=sandbox(),{p,b}=atEnemyStore(s);p.ammo=10;tick(s,{sabotage:true},1);assert.ok(b.progress>.9);step(s,input);assert.equal(b.progress,0);assert.equal(b.attackerId,null);assert.equal(p.sabotageId,null);}
});
test('a KO gives a short return to an intact home with an empty mouth, not a loss',()=>{
 const s=sandbox(),p=s.actors[0];Object.assign(p,{x:0,z:0,ammo:50});hit(s,p,{owner:'rival-1',dx:1,dz:0,damage:9});assert.equal(p.ko,true);assert.equal(p.respawnTime,RULES.respawnSeconds);assert.equal(p.ammo,0);
 tick(s,{},RULES.respawnSeconds-.2);assert.equal(p.ko,true);assert.equal(s.status,'playing');tick(s,{},.2);assert.equal(p.ko,false);assert.deepEqual({x:p.x,z:p.z},BASES[0].spawn);assert.equal(p.ammo,0);assert.ok(p.invuln<=1);assert.equal(s.status,'playing');
});
test('KO of all rivals is not victory while their stores remain',()=>{
 const s=sandbox();for(const a of s.actors.slice(1)){a.dizzyTime=0;hit(s,a,{owner:'player',dx:1,dz:0,damage:9});}step(s);assert.equal(s.status,'playing');assert.ok(s.actors.slice(1).every(a=>a.ko));
});
test('destruction of the player store ends the round even if the player is alive',()=>{
 const s=sandbox();s.bases[0].destroyed=true;step(s);assert.equal(s.status,'lost');
});
test('cover blocks automatic enemy recognition but shots reveal the shooter briefly',()=>{
 const tree=TREES.find(t=>!WALLS.some(w=>Math.abs(w.x-t.x)<w.hw+1&&Math.abs(w.z-t.z)<w.hd+1));assert.ok(tree);
 const s=sandbox(),p=s.actors[0],a=s.actors[1];Object.assign(p,{x:tree.x,z:tree.z,ammo:3});
 const spots=[[5,0],[-5,0],[0,5],[0,-5]].map(([x,z])=>({x:p.x+x,z:p.z+z}));const spot=spots.find(q=>hasWallSight(q,p));assert.ok(spot);Object.assign(a,spot);assert.ok(coverAt(p));assert.equal(canDetect(a,p),false);
 assert.equal(shoot(s,p),true);assert.equal(canDetect(a,p),true);p.revealedTime=0;assert.equal(canDetect(a,p),false);
});
test('ordinary hit cancels enemy aim and visibly retreats instead of firing again',()=>{
 const s=sandbox(),a=s.actors[1];a.dizzyTime=0;Object.assign(a,{x:0,z:0,ammo:30,aiCharging:true,aimWindup:.2});hit(s,a,{owner:'player',dx:1,dz:0});assert.equal(a.aiCharging,false);assert.equal(a.aimWindup,0);assert.equal(shoot(s,a),false);const intent=rivalIntent(s,a);assert.equal(intent.fire,undefined);assert.ok(intent.mx>0);assert.equal(intent.aiming,false);
});
test('empty rivals route to their own store and refill before resuming their raid',()=>{
 const s=sandbox(),a=s.actors[1];a.dizzyTime=0;Object.assign(a,{x:-10,z:8,ammo:0,refilling:false,machineTimer:99});const start=Math.hypot(a.x-BASES[1].stock.x,a.z-BASES[1].stock.z);
 const intent=rivalIntent(s,a);assert.equal(a.refilling,true);assert.equal(intent.fire,undefined);let refilledAtHome=false;for(let i=0;i<840;i++){step(s);refilledAtHome ||= a.ammo>=30&&Math.hypot(a.x-BASES[1].stock.x,a.z-BASES[1].stock.z)<start;}assert.ok(refilledAtHome);assert.equal(a.refilling,false);
});
test('returning and invading rivals use real entrances instead of crossing a home wall',()=>{
 const s=sandbox(),a=s.actors[1];a.dizzyTime=0;Object.assign(a,{x:-10,z:8,ammo:0,refilling:true});
 for(let i=0;i<600;i++){step(s);for(const w of WALLS)assert.ok(!(Math.abs(a.x-w.x)<w.hw+.72&&Math.abs(a.z-w.z)<w.hd+.72),`${a.id} crossed ${w.id}`);}
 assert.ok(a.ammo>0);
});
test('save resumes the global timer, destroyed stores and KO return, but never a half-finished attack',()=>{
 const s=newRound();s.intro=8.5;s.bases[1].destroyed=true;s.bases[2].progress=6;s.bases[2].attackerId='player';s.actors[0].ammo=44;s.actors[2].ko=true;s.actors[2].respawnTime=2.2;
 const r=loadRound(saveRound(s));assert.ok(r);assert.equal(r.intro,8.5);assert.equal(r.phase,'countdown');assert.equal(r.actors[0].ammo,44);assert.equal(r.bases[1].destroyed,true);assert.equal(r.actors[1].eliminated,true);assert.equal(r.actors[2].respawnTime,2.2);assert.equal(r.bases[2].progress,0);assert.equal(r.bases[2].attackerId,null);
});
test('4.2 saves migrate with carried flies and statistics while creating the new timed objective',()=>{
 const old=newRound();old.version=1;delete old.bases;old.phase='practice';old.intro=5;old.actors[0].ammo=35;old.stats.hits=19;old.actors[1].ko=true;
 const r=loadRound(JSON.stringify(old));assert.ok(r);assert.equal(r.version,2);assert.equal(r.actors[0].ammo,35);assert.equal(r.stats.hits,19);assert.equal(r.actors[1].ko,true);assert.equal(r.actors[1].respawnTime,RULES.respawnSeconds);assert.equal(r.bases.length,3);assert.equal(r.intro,20);assert.equal(r.phase,'countdown');
});
test('bullets and high-speed hit pushes cannot tunnel through new home walls',()=>{
 const s=sandbox(),p=s.actors[0],g=BASES[0];Object.assign(p,{x:g.x-1,z:g.z,ammo:3,aimX:0,aimZ:1});
 shoot(s,p);tick(s,{},.3);assert.equal(s.bullets.filter(b=>b.owner===p.id).length,0);
 const before=p.z;moveBody(p,0,8);assert.ok(p.z-before<3,'back wall must stop a large shove');
});

test('trees slow actual hop distance without blocking free direction changes',()=>{
 const open=newRound(),hidden=newRound();Object.assign(open.actors[0],{x:0,z:0});Object.assign(hidden.actors[0],{x:0,z:-4.5});
 for(let i=0;i<8;i++){step(open,{mx:1,mz:0});step(hidden,{mx:1,mz:0});}
 assert.ok(Math.abs(hidden.actors[0].x/open.actors[0].x-.55)<1e-9);
});
test('an unopposed AI raid destroys a storage through the same ten-second channel',()=>{
 const s=newRound();s.phase='battle';s.intro=0;const attacker=s.actors[1],victim=s.actors[2],stock=BASES[2].stock;
 for(const a of [s.actors[0],victim]){a.ko=true;a.respawnTime=99;}
 Object.assign(attacker,{x:stock.x,z:stock.z,ammo:60,refilling:false,raidId:s.bases[2].id});
 tick(s,{},9.9);assert.equal(s.bases[2].destroyed,false);assert.ok(s.bases[2].progress>9.89);tick(s,{},.1);
 assert.equal(s.bases[2].destroyed,true);assert.equal(victim.eliminated,true);assert.equal(victim.respawnTime,0);
});


test('a passive defender respawning nearby does not interrupt an already committed AI sabotage',()=>{
 const s=newRound();s.phase='battle';s.intro=0;const attacker=s.actors[2],p=s.actors[0],stock=BASES[0].stock;
 s.actors[1].ko=true;s.actors[1].respawnTime=99;p.ko=true;p.respawnTime=4;
 Object.assign(attacker,{x:stock.x-1,z:stock.z,ammo:60,refilling:false,raidId:s.bases[0].id});
 tick(s,{},4.5);assert.equal(p.ko,false);assert.ok(s.bases[0].progress>4.4);
 tick(s,{},5.5);assert.equal(s.bases[0].destroyed,true);assert.equal(s.status,'lost');
});


test('knocking out a defender creates enough time to complete a full storage sabotage',()=>{
 const s=sandbox(),{p,b}=atEnemyStore(s),defender=s.actors[1];defender.dizzyTime=0;
 hit(s,defender,{owner:p.id,dx:1,dz:0,damage:9});assert.equal(defender.ko,true);assert.equal(defender.respawnTime,RULES.respawnSeconds);
 tick(s,{sabotage:true},RULES.sabotageSeconds);
 assert.equal(b.destroyed,true);assert.equal(defender.eliminated,true);assert.equal(defender.respawnTime,0);assert.ok(s.time<RULES.respawnSeconds);
});
