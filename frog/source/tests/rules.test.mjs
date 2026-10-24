import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SAVE_VERSION, canAfford, spend, eat, persuasionChance,
  canPromote, promote, promoteCost, nextLevelXP, awardXP,
  isVictory, gangCapacity, validateSave, dayState,
} from '../src/rules.js';

const frog = (overrides={}) => ({id:'frog-1',team:'ally',x:0,z:0,hp:70,maxHp:100,stomach:40,maxStomach:100,level:1,tier:1,xp:0,...overrides});
const save = (overrides={}) => ({version:SAVE_VERSION,elapsed:42,resources:{food:30,reeds:50},player:frog(),frogs:[frog({id:'ally-1'})],camps:[{id:'camp-1',x:8,z:8,team:'ally',tier:1,buildings:{}}],...overrides});

test('insufficient resources reject an entire purchase without partial deductions',()=>{
  const resources={food:30,reeds:4},before={...resources},cost={food:12,reeds:8};
  assert.equal(canAfford(resources,cost),false);
  assert.equal(spend(resources,cost),false);
  assert.deepEqual(resources,before);
});

test('exact resources can be spent once and balances cannot fall below zero',()=>{
  const resources={food:12,reeds:18},cost={food:12,reeds:18};
  assert.equal(spend(resources,cost),true);
  assert.deepEqual(resources,{food:0,reeds:0});
  assert.equal(spend(resources,cost),false);
  assert.deepEqual(resources,{food:0,reeds:0});
  assert.equal(spend({food:50},{food:1,reeds:1}),false);
});

test('food is capped by the remaining stomach capacity, with no negative consumption',()=>{
  const f=frog({stomach:93});
  assert.equal(eat(f,20),7);
  assert.equal(f.stomach,100);
  assert.equal(eat(f,20),0);
  assert.equal(eat(f,-8),0);
  assert.equal(f.stomach,100);
  const small=frog({stomach:38,maxStomach:45});
  assert.equal(eat(small,30),7);
  assert.equal(small.stomach,45);
});

test('destroying a home and bringing a stronger gang each improve persuasion',()=>{
  const situation={allyPower:3,enemyPower:10,hp:90,maxHp:100,morale:90,campDestroyed:false};
  const initial=persuasionChance(situation);
  assert.ok(persuasionChance({...situation,campDestroyed:true})>initial);
  assert.ok(persuasionChance({...situation,allyPower:8})>initial);
  assert.ok(persuasionChance({...situation,allyPower:8,campDestroyed:true})>persuasionChance({...situation,campDestroyed:true}));
});

test('enemy persuasion remains bounded, while a neutral recruit is guaranteed',()=>{
  assert.equal(persuasionChance({neutral:true}),1);
  const impossible=persuasionChance({allyPower:0,enemyPower:10000,hp:100,maxHp:100,morale:100});
  const overwhelming=persuasionChance({allyPower:10000,enemyPower:0,hp:0,maxHp:100,morale:0,campDestroyed:true});
  assert.ok(impossible>=.06&&impossible<1);
  assert.equal(overwhelming,.98);
});

test('promotion requires the real level, sufficient resources, life, and an uncapped tier',()=>{
  const rich={food:999,reeds:999};
  for(const f of [frog({level:1}),frog({level:3,tier:2}),frog({level:10,tier:3}),frog({level:10,hp:0})]){
    const before=structuredClone(f),resources={...rich};
    assert.equal(canPromote(f,resources),false);
    assert.equal(promote(f,resources),false);
    assert.deepEqual(f,before);
    assert.deepEqual(resources,rich);
  }
  const qualified=frog({level:2});
  assert.equal(canPromote(qualified,{food:12,reeds:17}),false);
});

test('a successful promotion charges its tier cost once and raises health and tier',()=>{
  const f=frog({tier:1,level:2,hp:25}),resources={food:40,reeds:50};
  assert.deepEqual(promoteCost(f),{food:12,reeds:18});
  assert.equal(promote(f,resources),true);
  assert.deepEqual(resources,{food:28,reeds:32});
  assert.equal(f.tier,2);assert.equal(f.maxHp,125);assert.equal(f.hp,125);
  assert.deepEqual(promoteCost(f),{food:24,reeds:36});
  assert.equal(promote(f,resources),false);
  assert.deepEqual(resources,{food:28,reeds:32});
});

test('a large XP award carries surplus through multiple increasing level thresholds',()=>{
  const f=frog({hp:50});
  const expected=nextLevelXP(1)+nextLevelXP(2)+17;
  assert.equal(awardXP(f,expected),2);
  assert.equal(f.level,3);assert.equal(f.xp,17);
  assert.equal(f.maxHp,116);assert.equal(f.hp,90);
});

test('an exact XP threshold leaves no remainder and negative awards do not remove progress',()=>{
  const f=frog({xp:nextLevelXP(1)-1,hp:99});
  assert.equal(awardXP(f,1),1);
  assert.equal(f.level,2);assert.equal(f.xp,0);assert.equal(f.hp,108);
  const before=structuredClone(f);
  assert.equal(awardXP(f,-500),0);
  assert.deepEqual(f,before);
});

test('victory allows a mixture of destroyed and persuaded enemy bases',()=>{
  const camps=[{originalEnemy:true,team:'enemy0',destroyed:true},{originalEnemy:true,team:'ally',destroyed:false},{originalEnemy:false,team:'neutral',destroyed:false}];
  assert.equal(isVictory(camps),true);
  assert.equal(isVictory([...camps,{originalEnemy:true,team:'enemy2',destroyed:false}]),false);
});

test('an empty campaign or one with no original enemy bases is never a victory',()=>{
  assert.equal(isVictory([]),false);
  assert.equal(isVictory([{team:'ally',destroyed:false,originalEnemy:false}]),false);
  assert.equal(isVictory([{team:'neutral',destroyed:true}]),false);
});

test('gang capacity grows only from living allied camps and their nursery',()=>{
  assert.equal(gangCapacity([]),6);
  const allied={team:'ally',tier:2,destroyed:false,buildings:{nursery:true}};
  assert.equal(gangCapacity([allied]),17);
  assert.equal(gangCapacity([allied,{team:'enemy0',tier:3,buildings:{nursery:true}},{...allied,destroyed:true}]),17);
});

test('incompatible, missing and nonfinite core save data are rejected',()=>{
  for(const value of [null,{},save({version:SAVE_VERSION+1}),save({player:null}),save({frogs:{}}),save({camps:null}),save({player:frog({x:NaN})}),save({player:frog({hp:Infinity})})]){
    assert.equal(validateSave(value),null);
  }
});

test('save normalization clamps resources, coordinates, health, stomach and time without mutating input',()=>{
  const input=save({elapsed:-50,resources:{food:-10,reeds:5e9},player:frog({x:999,z:-999,hp:-10,maxHp:120,stomach:500})}),before=structuredClone(input);
  const result=validateSave(input);
  assert.ok(result);
  assert.deepEqual(result.resources,{food:0,reeds:1e6});
  assert.equal(result.elapsed,0);assert.equal(result.player.x,108);assert.equal(result.player.z,-108);
  assert.equal(result.player.hp,1);assert.equal(result.player.stomach,100);
  assert.deepEqual(input,before);
});

test('malformed nested save entries are discarded or rejected safely instead of crashing load',()=>{
  const input=save({frogs:[null,42,{id:1,x:0,z:0,hp:10},frog({id:'dead',hp:0}),frog({id:'valid'})],camps:[null,'broken',{id:42,x:0,z:0},{id:'valid-camp',x:3,z:4,team:'enemy0'}]});
  let result;
  assert.doesNotThrow(()=>{result=validateSave(input);});
  if(result!==null){
    assert.deepEqual(result.frogs.map(f=>f.id),['valid']);
    assert.deepEqual(result.camps.map(c=>c.id),['valid-camp']);
  }
});

test('save normalization rejects invalid factions and repairs runtime camp fields',()=>{
  const input=save({frogs:[frog({id:'bad-team',team:42}),frog({id:'valid',tier:999,stomach:-50})],camps:[{id:'bad-team',x:8,z:8,team:null,stock:null,buildings:null},{id:'valid-camp',x:9,z:9,team:'enemy0',stock:null,buildings:null}]});
  const result=validateSave(input);
  assert.ok(result);
  assert.deepEqual(result.frogs.map(f=>f.id),['valid']);
  assert.equal(result.frogs[0].tier,3);assert.equal(result.frogs[0].stomach,0);
  assert.deepEqual(result.camps.map(c=>c.id),['valid-camp']);
  assert.deepEqual(result.camps[0].stock,{food:0,reeds:0});
  assert.equal(result.camps[0].buildings.nursery,false);assert.equal(result.camps[0].buildings.watchtower,false);
});

test('the day-night cycle begins at 09:00, darkens at night and repeats after 600 seconds',()=>{
  const morning=dayState(0),night=dayState(300),tomorrow=dayState(600);
  assert.equal(morning.timeLabel,'09:00');assert.equal(morning.night,false);
  assert.equal(night.timeLabel,'21:00');assert.equal(night.night,true);assert.ok(night.daylight<.2);
  assert.equal(tomorrow.timeLabel,morning.timeLabel);assert.equal(tomorrow.day,morning.day+1);
  assert.ok(Math.abs(tomorrow.daylight-morning.daylight)<1e-12);
  for(const elapsed of [0,75,150,225,300,450,600,36000]){const state=dayState(elapsed);assert.ok(state.phase>=0&&state.phase<1);assert.ok(state.daylight>=0&&state.daylight<=1);assert.match(state.timeLabel,/^\d{2}:\d{2}$/);}
});

