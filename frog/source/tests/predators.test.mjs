import test from 'node:test';
import assert from 'node:assert/strict';
import {PREDATORS} from '../src/rules.js';
import {updatePredators,damagePredator,intimidatePredator} from '../src/predators.js';

function fixture(type='heron',{playerX=6,predatorX=0,terrain=()=>({type:'water',height:-.25})}={}){
  const player={id:'player',name:'Άρης',team:'player',x:playerX,z:0,y:0,yaw:0,hp:5000,maxHp:5000,dead:false,blocking:true,vx:0,vz:0};
  const def=PREDATORS[type];
  const predator={...def,type,id:`predator-${type}`,team:'predator',x:predatorX,z:0,y:0,yaw:0,hp:def.hp,maxHp:def.hp,anchor:{x:predatorX,z:0},phase:'patrol',phaseTime:0,cooldown:0,grace:0,dead:false,model:{group:{visible:true}},target:null,grabbed:null};
  const events={notices:[],cues:0,strikes:0,splashes:0,xp:0,damage:[]};
  const game={elapsed:100,graceUntil:0,player,frogs:[player],predators:[predator],stats:{predatorsKilled:0,predatorsRepelled:0},hunt:null,
    world:{getSurface:terrain,sampleHeight:(x,z)=>terrain(x,z).height,splash(){events.splashes++;},impact(){}},
    ui:{toast(...args){events.notices.push(args);}},vfx:{cue(){events.cues++;},strike(){events.strikes++;},number(){}},audio:{play(){}},
    gainXP(n){events.xp+=n;},allies(){return this.frogs.filter(f=>f.team==='ally'&&!f.dead);},
    damage(f,amount,source,options={}){if(f.invulnerable&&!options.bypass)return;f.hp=Math.max(0,f.hp-amount);if(f.hp===0)f.dead=true;events.damage.push({f,source,amount});}};
  return {game,p:predator,player,events};
}
function step(game,seconds,perFrame){for(let t=0;t<seconds-1e-7;t+=.05){perFrame?.();game.elapsed+=.05;updatePredators(game,.05);}}

for(const type of ['heron','snake','fish'])test(`${type} stays committed below one-quarter health and can be killed without an automatic escape`,()=>{
  const {game,p,player}=fixture(type);
  damagePredator(game,p,p.maxHp*.82,player);
  assert.ok(p.hp<p.maxHp*.24);assert.equal(p.phase,'stalk');
  step(game,.2);assert.ok(['stalk','windup','lunge','recover','grab'].includes(p.phase));assert.equal(p.target,player);
  assert.equal(damagePredator(game,p,p.hp,player),true);assert.equal(p.dead,true);assert.equal(game.stats.predatorsKilled,1);
  assert.equal(damagePredator(game,p,100,player),false);assert.equal(game.stats.predatorsKilled,1);
});

test('a provoked predator pursues its attacker beyond the former acquisition leash',()=>{
  const {game,p,player}=fixture('heron',{playerX:39});damagePredator(game,p,1,player);step(game,1);
  assert.equal(p.phase,'stalk');assert.equal(p.target,player);assert.ok(p.x>3&&p.x<player.x);
});

test('a committed hunt does not expire after the old thirty-six-second timeout',()=>{
  const {game,p,player}=fixture('heron',{predatorX:-90,playerX:-72});damagePredator(game,p,1,player);
  step(game,42,()=>{player.x=p.x+18;});
  assert.equal(p.phase,'stalk');assert.equal(p.target,player);assert.ok(p.chaseTime>40);
});

test('recovery keeps a provoked target through a brief jump instead of forgetting the fight',()=>{
  const {game,p,player}=fixture('snake');damagePredator(game,p,1,player);player.y=3;p.phase='recover';p.phaseTime=p.recover;
  step(game,.1);assert.equal(p.phase,'stalk');assert.equal(p.target,player);player.y=0;step(game,1);assert.notEqual(p.phase,'patrol');
});

test('deliberate intimidation produces a bounded retreat and preserves the wounded animal',()=>{
  const {game,p,player,events}=fixture('heron');damagePredator(game,p,35,player);const hp=p.hp;
  assert.equal(intimidatePredator(game,p,35),false);assert.equal(intimidatePredator(game,p,35),false);assert.equal(intimidatePredator(game,p,35),true);
  assert.equal(p.phase,'flee');const origin={x:p.x,z:p.z};step(game,7);
  assert.equal(p.phase,'patrol');assert.equal(p.hp,hp);assert.equal(p.model.group.visible,true);assert.equal(game.stats.predatorsRepelled,1);assert.equal(events.xp,45);
  assert.ok(Math.hypot(p.x-origin.x,p.z-origin.z)<12);assert.ok(p.grace>game.elapsed);
});

test('hitting a retreating predator re-engages combat instead of extending its flight',()=>{
  const {game,p,player}=fixture('snake');damagePredator(game,p,1,player);intimidatePredator(game,p,50);intimidatePredator(game,p,50);
  assert.equal(p.phase,'flee');damagePredator(game,p,10,player);assert.equal(p.phase,'stalk');assert.equal(p.target,player);assert.equal(p.fearPressure,0);assert.equal(game.stats.predatorsRepelled,0);
});

test('a provoked fish stays in the water when its target is on a dry bank',()=>{
  const terrain=x=>x>0?{type:'land',height:1.4}:{type:'water',height:-.25};
  const {game,p,player}=fixture('fish',{playerX:4,predatorX:-2,terrain});player.y=1.4;damagePredator(game,p,5,player);
  step(game,10,()=>assert.ok(p.x<=0));assert.equal(p.phase,'stalk');assert.ok(p.x<=0);
});

test('starter grace prevents an unsolicited hunt but a deliberate attack can provoke one',()=>{
  const {game,p,player}=fixture('heron');game.elapsed=0;game.graceUntil=45;step(game,1);assert.equal(p.phase,'patrol');assert.equal(p.target,null);
  damagePredator(game,p,1,player);step(game,.1);assert.equal(p.target,player);assert.notEqual(p.phase,'patrol');
});

test('gang damage releases a grabbed ally and preserves the rescue window',()=>{
  const {game,p,player}=fixture('heron');damagePredator(game,p,1,player);const ally={...player,id:'ally',team:'ally',blocking:false};game.frogs.push(ally);
  p.phase='grab';p.grabbed=ally;ally.grabbedBy=p;p.rescueDamage=0;damagePredator(game,p,45,player);
  assert.equal(p.grabbed,null);assert.equal(ally.grabbedBy,null);assert.equal(p.phase,'recover');assert.ok(ally.invulnerable>=1.4);
});

test('telegraphed attacks use physical strike effects without colored ground cues',()=>{
  const {game,p,player,events}=fixture('heron',{playerX:3});damagePredator(game,p,1,player);step(game,2.2);
  assert.equal(events.cues,0);assert.ok(events.strikes>=1);assert.ok(events.damage.length>=1);
});

test('campaign hunters remain dead and notify campaign progression exactly once',()=>{
  const {game,p,player}=fixture('heron');p.campaignTracked=true;const defeated=[];game.onPredatorDefeated=predator=>defeated.push(predator.id);
  damagePredator(game,p,p.hp,player);damagePredator(game,p,100,player);game.elapsed+=1000;player.x=100;step(game,5);
  assert.equal(p.dead,true);assert.equal(p.phase,'dead');assert.equal(p.model.group.visible,false);assert.deepEqual(defeated,[p.id]);assert.equal(game.stats.predatorsKilled,1);
});

test('boss initialization preserves supplied combat overrides',()=>{
  const {game,p,player}=fixture('heron',{playerX:3});Object.assign(p,{boss:true,baseSpeed:7,damage:63,reach:9,windup:1.8,recover:2.6,strikeRadius:4.8});
  damagePredator(game,p,1,player);step(game,.05);
  assert.equal(p.baseSpeed,7);assert.equal(p.damage,63);assert.equal(p.reach,9);assert.equal(p.windup,1.8);assert.equal(p.baseRecover,2.6);assert.equal(p.strikeRadius,4.8);
});

for(const [type,count] of [['heron',2],['snake',3]])test(`the ${type} boss executes ${count} distinct strikes with a full warning before each follow-up`,()=>{
  const {game,p,player,events}=fixture(type,{playerX:2.5});p.boss=true;damagePredator(game,p,1,player);
  const warnings=[];let began=0,previous=p.phase;
  for(let t=0;t<14;t+=.05){
    step(game,.05);
    if(p.phase==='windup'&&previous!=='windup')began=game.elapsed;
    if(p.phase==='lunge'&&previous==='windup')warnings.push(game.elapsed-began);
    previous=p.phase;if(p.phase==='recover')break;
  }
  assert.equal(events.strikes,count);assert.equal(warnings.length,count);assert.ok(warnings.every(duration=>duration>=.79));assert.equal(p.phase,'recover');assert.equal(p.burstRemaining,0);
});

test('a wounded boss enrages with faster but readable warnings and a shorter recovery',()=>{
  const {game,p,player}=fixture('heron',{playerX:2.5});p.boss=true;damagePredator(game,p,p.maxHp*.51,player);step(game,.05);
  assert.equal(p.enraged,true);assert.ok(p.windup<p.baseWindup&&p.windup>=.8);
  for(let t=0;t<10&&p.phase!=='recover';t+=.05)step(game,.05);
  assert.equal(p.phase,'recover');assert.ok(p.recover<p.baseRecover&&p.recover>.8);
});

test('the giant fish breach reaches a wider flank than the normal hunter',()=>{
  function flankHit(boss){const {game,p,player,events}=fixture('fish',{playerX:3});p.boss=boss;const flank={...player,id:'flank',team:'ally',z:4.1};game.frogs.push(flank);damagePredator(game,p,1,player);step(game,2.2);return events.damage.some(event=>event.f===flank);}
  assert.equal(flankHit(false),false);assert.equal(flankHit(true),true);
});
