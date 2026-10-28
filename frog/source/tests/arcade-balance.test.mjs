import test from 'node:test';
import assert from 'node:assert/strict';
import {newRound,step,hit,shoot,kick,RULES,sabotageTarget} from '../src/arcade-model.js';
import {BASES,navigateTo} from '../src/arcade-bases.js';
import {interactCatapult,throwStone} from '../src/arcade-artillery.js';

const DT=1/60;
const tick=(state,input,seconds)=>{
 for(let i=0;i<Math.round(seconds/DT);i++)step(state,input,DT);
};

function quietBattle(){
 const state=newRound(731);state.phase='battle';state.intro=0;
 // Keep unrelated combat out of timing fixtures. Every active attacker below
 // still uses the real model, navigation, hop cadence and objective updates.
 for(const actor of state.actors){actor.ko=true;actor.respawnTime=999;}
 // The navigation/respawn timing comparison assumes storage guards were defeated.
 for(const guard of state.guards)Object.assign(guard,{health:0,mode:'disabled',respawnTime:20});
 return state;
}

function postKnockoutRaid(start,{attackerId='player',defenderId='rival-2'}={}){
 const state=quietBattle(),attacker=state.actors.find(a=>a.id===attackerId),defender=state.actors.find(a=>a.id===defenderId);
 const geometry=BASES.find(b=>b.owner===defenderId),base=state.bases.find(b=>b.owner===defenderId);
 Object.assign(attacker,start,{ko:false,raidId:base.id,machineTimer:999});
 Object.assign(defender,start,{ko:false,respawnTime:0});
 assert.equal(hit(state,defender,{owner:attackerId,dx:0,dz:1,damage:9}),true);
 assert.equal(defender.ko,true);
 let startedAt=null,finishedAt=null,returnedAt=null,peakProgress=0;
 for(let i=0;i<Math.ceil((RULES.respawnSeconds+1)/DT);i++){
  let input={};
  if(attackerId==='player'){
   const ready=sabotageTarget(state,attacker)?.id===base.id;
   const move=navigateTo(attacker,geometry.stock);
   input=ready?{sabotage:true}:{mx:move.x,mz:move.z};
  }
  step(state,input,DT);
  peakProgress=Math.max(peakProgress,base.progress);
  if(startedAt===null&&state.events.some(e=>e.type==='sabotageStart'&&e.by===attackerId))startedAt=state.time;
  if(state.events.some(e=>e.type==='baseDestroyed'&&e.baseId===base.id))finishedAt=state.time;
  if(state.events.some(e=>e.type==='respawn'&&e.id===defenderId))returnedAt=state.time;
  if(finishedAt!==null||returnedAt!==null)break;
 }
 return {state,attacker,defender,base,startedAt,finishedAt,returnedAt,peakProgress};
}

test('a midfield knockout leaves a real route and full sabotage window before the defender returns',()=>{
 const result=postKnockoutRaid({x:0,z:0});
 assert.ok(result.startedAt>0.5,'the fixture must travel through the actual entrance before channeling');
 assert.equal(result.base.destroyed,true,'an immediate central push should convert the knockout into an objective');
 assert.equal(result.returnedAt,null);
 assert.ok(result.finishedAt<RULES.respawnSeconds-0.5,'leave a useful margin rather than a one-frame timing race');
 assert.ok(result.finishedAt-result.startedAt>=RULES.sabotageSeconds-DT-1e-7);
 assert.equal(result.defender.eliminated,true);
});

test('a distant knockout leaves the defender a return opportunity before the same full sabotage completes',()=>{
 const result=postKnockoutRaid({x:-20,z:-10});
 assert.ok(result.startedAt!==null,'the distant route must genuinely reach the storage');
 assert.ok(result.startedAt>RULES.respawnSeconds-RULES.sabotageSeconds,'a cross-map run should spend the free objective window');
 assert.equal(result.finishedAt,null);
 assert.equal(result.base.destroyed,false);
 assert.equal(result.defender.ko,false);
 assert.ok(result.returnedAt!==null);
 assert.ok(result.peakProgress>0&&result.peakProgress<RULES.sabotageSeconds);
 if(result.base.progress===0){
  // Returning bodies cannot overlap. If separation moves the attacker out of
  // reach, the same physical range rule may already have broken the channel.
  assert.ok(result.state.events.some(e=>e.type==='sabotageInterrupted'&&e.baseId===result.base.id));
 }
 // Verify the returned defender can interrupt this partial attempt, without
 // depending on a seeded AI duel or a particular projectile contact frame.
 assert.equal(hit(result.state,result.attacker,{owner:result.defender.id,dx:-1,dz:0,force:0}),true);
 assert.equal(result.base.progress,0);
 assert.equal(result.base.attackerId,null);
 assert.equal(result.base.destroyed,false);
});

test('an AI midfield knockout has the same useful route-to-objective opportunity',()=>{
 const result=postKnockoutRaid({x:0,z:0},{attackerId:'rival-2',defenderId:'player'});
 assert.ok(result.startedAt>1,'the rival must navigate to the player home at its actual slower speed');
 assert.equal(result.base.destroyed,true);
 assert.equal(result.returnedAt,null);
 assert.ok(result.finishedAt<RULES.respawnSeconds-0.2);
 assert.ok(result.finishedAt-result.startedAt>=RULES.sabotageSeconds-DT-1e-7);
 assert.equal(result.state.status,'lost');
});

test('player and AI storage attacks require the same eight uninterrupted seconds',()=>{
 const observations=[];
 for(const attackerId of ['player','rival-1']){
  const state=quietBattle(),actor=state.actors.find(a=>a.id===attackerId),geometry=BASES[2],base=state.bases[2];
  Object.assign(actor,geometry.stock,{ko:false,raidId:base.id,machineTimer:999});
  const input=attackerId==='player'?{sabotage:true}:{};
  tick(state,input,7.9);
  assert.equal(base.destroyed,false,`${attackerId} cannot finish early`);
  assert.ok(base.progress>7.8&&base.progress<8);
  observations.push(base.progress);
  tick(state,input,0.1);
  assert.equal(base.destroyed,true,`${attackerId} finishes after eight seconds`);
 }
 assert.equal(observations[0],observations[1]);
});

test('every owner waits twelve seconds after a real knockout and receives a separate one-second spawn shield',()=>{
 for(const owner of ['player','rival-1','rival-2']){
  const state=quietBattle(),actor=state.actors.find(a=>a.id===owner),geometry=BASES.find(b=>b.owner===owner);
  Object.assign(actor,{x:0,z:0,ko:false,respawnTime:0});
  assert.equal(hit(state,actor,{owner:owner==='player'?'rival-1':'player',dx:1,dz:0,damage:9}),true);
  tick(state,{},11.9);assert.equal(actor.ko,true,`${owner} must not respawn early`);
  tick(state,{},0.1);assert.equal(actor.ko,false,`${owner} must return after twelve seconds`);
  assert.deepEqual({x:actor.x,z:actor.z},geometry.spawn);
  assert.equal(actor.spawnShield,1);
  assert.equal(actor.invuln,0,'spawn protection must not reuse ordinary post-hit protection');
 }
});

function returnedPlayer(){
 const state=quietBattle(),player=state.actors[0];
 Object.assign(player,{x:0,z:0,ko:false,respawnTime:0});
 hit(state,player,{owner:'rival-1',dx:1,dz:0,damage:9});
 tick(state,{},RULES.respawnSeconds);
 assert.equal(player.ko,false);
 assert.equal(player.spawnShield,1);
 return {state,player};
}

test('spawn protection permits movement, blocks incoming damage and expires without attacking',()=>{
 const {state,player}=returnedPlayer(),startZ=player.z;
 assert.equal(hit(state,player,{owner:'rival-1',dx:0,dz:1,force:0}),false);
 tick(state,{mx:0,mz:-1},0.25);
 assert.ok(player.z<startZ);
 assert.ok(player.spawnShield>0);
 assert.equal(hit(state,player,{owner:'rival-1',dx:0,dz:1,force:0}),false);
 tick(state,{},0.8);
 assert.equal(player.spawnShield,0);
 assert.equal(hit(state,player,{owner:'rival-1',dx:0,dz:1,force:0}),true);
});

test('only a successful shot spends spawn protection and ordinary post-hit invulnerability remains independent',()=>{
 const {state,player}=returnedPlayer();
 player.ammo=0;assert.equal(shoot(state,player),false);assert.equal(player.spawnShield,1);
 player.ammo=2;player.shot=0.2;assert.equal(shoot(state,player),false);assert.equal(player.spawnShield,1);
 player.shot=0;assert.equal(shoot(state,player),true);assert.equal(player.spawnShield,0);
 assert.equal(hit(state,player,{owner:'rival-1',dx:1,dz:0,force:0}),true,'an attacking respawn can now be counter-hit');
 const afterHit=returnedPlayer();afterHit.player.spawnShield=0;afterHit.player.invuln=0.12;
 assert.equal(shoot(afterHit.state,afterHit.player),true);
 assert.equal(afterHit.player.invuln,0.12,'voluntary offense must not erase the unrelated hit cooldown');
});

test('a successful kick spends spawn protection while an out-of-range kick does not',()=>{
 const {state,player}=returnedPlayer();
 assert.equal(kick(state,player),false);assert.equal(player.spawnShield,1);
 const target=state.actors[1];Object.assign(target,{ko:false,x:player.x+1.6,z:player.z,dizzyTime:10});
 assert.equal(kick(state,player),true);assert.equal(player.spawnShield,0);
 assert.equal(hit(state,player,{owner:target.id,dx:1,dz:0,force:0}),true);
});

test('mounting or rejected stone throws preserve spawn protection but launching a stone ends it',()=>{
 const {state,player}=returnedPlayer(),machine=state.catapults.find(c=>c.owner===player.id);
 assert.equal(throwStone(state,player,{x:0,z:0}),false);assert.equal(player.spawnShield,1);
 Object.assign(player,{x:machine.x,z:machine.z+2.1});
 assert.equal(interactCatapult(state,player),true);assert.equal(player.spawnShield,1);
 assert.equal(throwStone(state,player,{x:machine.x,z:machine.z}),false);assert.equal(player.spawnShield,1);
 assert.equal(throwStone(state,player,{x:machine.x,z:machine.z-10}),true);
 assert.equal(player.spawnShield,0);assert.equal(state.shells.length,1);
});

test('an actual sabotage start spends spawn protection and a rejected out-of-range request does not',()=>{
 const {state,player}=returnedPlayer();
 step(state,{sabotage:true},DT);assert.ok(player.spawnShield>0);assert.equal(player.sabotageId,null);
 const base=state.bases[1];Object.assign(player,BASES[1].stock,{hop:0,idle:0});
 step(state,{sabotage:true},DT);
 assert.equal(base.attackerId,player.id);assert.ok(base.progress>0);
 assert.equal(player.spawnShield,0);
 assert.equal(hit(state,player,{owner:base.owner,dx:1,dz:0,force:0}),true);
 assert.equal(base.progress,0);
});
