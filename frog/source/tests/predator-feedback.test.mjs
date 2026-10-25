import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './game-fixture.mjs';
import {damagePredator,applyPredatorCombatImpulse,updatePredators} from '../src/predators.js';
import {registerCombatHit} from '../src/combat-feedback.js';
import {initializeFort,FORT_RADIUS} from '../src/fortification.js';
import {createCreature} from '../src/creatures.js';
import {WORLD_BOUNDARY} from '../src/world-config.js';

const impulse=(x=3.2,z=0)=>({x,z,remaining:.38,drag:12});
function setup(type='snake'){
  const {game,player}=fixture(),predator=game.spawnPredator({id:'feedback-'+type,type,x:0,z:3});
  damagePredator(game,predator,0,player); // Initialize the real AI without inflicting a hit.
  return {game,player,predator};
}

test('the actual game damage wrapper emits one predator contact and suppresses the old duplicate hit effect',()=>{
  const {game,player,predator}=setup(),sounds=[],impacts=[];let legacyImpacts=0;
  game.audio.play=name=>sounds.push(name);game.world.impact=()=>legacyImpacts++;game.vfx.impact=(...args)=>impacts.push(args);
  const hp=predator.hp;game.damage(predator,14,player,{kind:'tongue'});
  assert.equal(predator.hp,hp-14);assert.equal(impacts.length,1);assert.equal(sounds.filter(name=>name==='impact-flesh').length,1);
  assert.equal(legacyImpacts,0);assert.equal(sounds.includes('hit'),false);assert.ok(predator.combatImpulse.z>0);
});

test('direct legacy predator damage remains compatible when contact feedback is not supplied by a wrapper',()=>{
  const {game,player,predator}=setup(),sounds=[];let impacts=0;
  game.audio.play=name=>sounds.push(name);game.world.impact=()=>impacts++;
  assert.equal(damagePredator(game,predator,14,player),true);assert.equal(impacts,1);assert.equal(sounds.filter(name=>name==='hit').length,1);
});

test('a recoiling fish slides along a wet shore and never crosses the dry bank',()=>{
  const {game,predator}=setup('fish');
  const terrain=x=>x>0?{type:'land',height:.5}:{type:'water',height:-.3};
  game.world.getSurface=terrain;game.world.sampleHeight=(x,z)=>terrain(x,z).height;
  Object.assign(predator,{x:-.025,z:0,y:-1.5,phase:'recover',phaseTime:0,recover:4,combatImpulse:impulse(3.2,1)});
  for(let i=0;i<25;i++){applyPredatorCombatImpulse(game,predator,.02);assert.ok(predator.x<=0);assert.ok(predator.y<0);}
  assert.ok(predator.z>.02,'the legal tangential response is retained');assert.equal(predator.combatImpulse,null);
});

test('predator recoil cannot cross the same physical castle wall that blocks frogs',()=>{
  const {game,predator}=setup('snake'),camp={id:'enclosure',x:0,z:0,yaw:0,tier:1,team:'ally',hp:350,maxHp:350,buildings:{}};
  initializeFort(camp);game.camps=[camp];Object.assign(predator,{x:FORT_RADIUS-1,z:0,combatImpulse:impulse()});
  for(let i=0;i<25;i++)applyPredatorCombatImpulse(game,predator,.02);
  assert.ok(predator.x<FORT_RADIUS-.6);assert.equal(predator.combatImpulse,null);
});

test('an impact cannot push a grounded predator up a vertical cliff or out of world bounds',()=>{
  const {game,predator}=setup('snake');game.world.sampleHeight=x=>x>0?3:.35;game.world.getSurface=x=>({type:'land',height:game.world.sampleHeight(x)});
  Object.assign(predator,{x:-.02,z:0,y:.35,combatImpulse:impulse()});
  for(let i=0;i<25;i++)applyPredatorCombatImpulse(game,predator,.02);
  assert.ok(predator.x<=0);assert.equal(predator.y,.35);
  game.world.sampleHeight=()=>.35;Object.assign(predator,{x:WORLD_BOUNDARY-2.01,combatImpulse:impulse()});
  for(let i=0;i<25;i++)applyPredatorCombatImpulse(game,predator,.02);
  assert.ok(predator.x<=WORLD_BOUNDARY-2);
});

test('predator AI consumes real recoil after movement without snapping its committed lunge trajectory back',()=>{
  const {game,player,predator}=setup('snake');
  Object.assign(predator,{x:0,z:1,phase:'lunge',phaseTime:.1,lungeTime:.5,lungeStart:{x:0,z:0},lungeEnd:{x:0,z:3},strike:{x:0,z:5},combatImpulse:impulse(2,0)});
  const committed={...predator.strike};
  applyPredatorCombatImpulse(game,predator,.02);const first=predator.x;
  assert.ok(first>0);assert.equal(predator.lungeStart.x,first);assert.equal(predator.lungeEnd.x,first);
  game.elapsed+=.02;updatePredators(game,.02);assert.ok(predator.x>first);assert.deepEqual(predator.strike,committed);
  predator.phase='recover';predator.phaseTime=0;predator.recover=10;
  registerCombatHit(game,predator,14,player,{kind:'tongue'});const z=predator.z;game.elapsed+=.02;updatePredators(game,.02);assert.ok(predator.z>z);
  predator.dead=true;predator.combatImpulse=impulse();applyPredatorCombatImpulse(game,predator,.02);assert.equal(predator.combatImpulse,null);
});

test('all predator rigs respond in the real impact direction with bounded poses and unchanged world transforms',()=>{
  for(const type of ['heron','snake','fish']){
    const right=createCreature(type),left=createCreature(type);
    try{
      right.group.position.set(2,1,4);left.group.position.copy(right.group.position);
      right.setImpact({x:1,z:0,strength:1,heavy:true});left.setImpact({x:-1,z:0,strength:1,heavy:true});
      right.update(.03,{time:1,hit:1});left.update(.03,{time:1,hit:1});
      const a=right.group.getObjectByName('anatomical-animation-pivot'),b=left.group.getObjectByName('anatomical-animation-pivot');
      assert.ok(a.rotation.z<0&&b.rotation.z>0,type);assert.ok(Math.abs(a.rotation.z)<.15,type);assert.deepEqual(right.group.position.toArray(),[2,1,4]);
    }finally{right.dispose();left.dispose();}
  }
});
