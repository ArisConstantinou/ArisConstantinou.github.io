import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture,actor,camp} from './game-fixture.mjs';
import {defaultPlacement} from '../src/placement-rules.js';
import {SAVE_VERSION,validateSave} from '../src/rules.js';
import {WORLD_REVISION} from '../src/world-config.js';

function alliedHome(overrides={}) {
  return camp({id:'home',team:'ally',x:0,z:0,originalEnemy:false,stock:{food:0,reeds:0},supplyMigrated:true,...overrides});
}

test('a newly purchased nursery starts its own full clock instead of inheriting the age of the camp',()=>{
  const {game}=fixture(),home=alliedHome({spawnTimer:200});game.camps.push(home);
  game.updateEconomy(90);assert.equal(home.spawnTimer,0);assert.equal(game.allies().length,0);
  // Buying immediately after loading an older accumulated timer must also reset it.
  home.spawnTimer=200;const local=defaultPlacement('nursery');
  assert.equal(game.commitBuild('nursery',{campId:home.id,x:local.x,z:local.z,yaw:local.yaw,local}),true);
  assert.equal(home.spawnTimer,0);assert.equal(home.buildings.nursery,true);
  game.updateEconomy(84);assert.equal(game.allies().length,0);
  game.updateEconomy(1);assert.equal(game.allies().length,1);assert.equal(home.spawnTimer,0);
});

test('a nursery clock pauses during an attack and resumes its remaining safe operating time',()=>{
  const {game}=fixture(),home=alliedHome({buildings:{nursery:true},spawnTimer:84});
  const raider=actor({id:'nearby-enemy',team:'enemy0',x:5,z:0});game.camps.push(home);game.frogs.push(raider);
  const reserves={...game.resources};game.updateEconomy(20);
  assert.equal(home.spawnTimer,84);assert.equal(game.allies().length,0);assert.deepEqual(game.resources,reserves);
  raider.dead=true;game.updateEconomy(.5);assert.equal(home.spawnTimer,84.5);assert.equal(game.allies().length,0);
  game.updateEconomy(.5);assert.equal(game.allies().length,1);assert.equal(home.spawnTimer,0);
});

test('save normalization clears only nonexistent allied nursery clocks and preserves real nursery and rival progress',()=>{
  const data={version:SAVE_VERSION,worldRevision:WORLD_REVISION,elapsed:300,resources:{food:100,reeds:100},
    player:actor({id:'player',team:'player'}),frogs:[],camps:[
      alliedHome({id:'not-built',spawnTimer:999}),
      alliedHome({id:'operating',buildings:{nursery:true},spawnTimer:47}),
      camp({id:'rival',team:'enemy0',buildings:{},spawnTimer:19})
    ]};
  const saved=validateSave(data);
  assert.deepEqual(saved.camps.map(c=>c.spawnTimer),[0,47,19]);
  assert.equal(data.camps[0].spawnTimer,999,'validation must not mutate the supplied save');
});

test('retaking an enemy-held former home does not surrender travelling allies that still remember it',()=>{
  const {game,player}=fixture();player.x=70;
  const home=alliedHome({hp:1,gateHp:0});
  const follower=actor({id:'travelling-ally',home:home.id,x:72,z:0,order:'follow'});
  const raider=actor({id:'capturing-raider',team:'enemy1',home:'enemy-source',raidTarget:home.id,x:1,z:0});
  game.camps.push(home);game.frogs.push(follower,raider);
  game.damageCamp(home,20,raider);assert.equal(home.team,'enemy1');assert.equal(home.destroyed,false);
  assert.equal(follower.home,home.id);assert.equal(follower.team,'ally');
  player.x=0;home.hp=1;game.damageCamp(home,30,player);
  assert.equal(home.destroyed,true);assert.equal(raider.surrendered,true);
  assert.equal(follower.team,'ally');assert.equal(follower.surrendered,false);assert.equal(game.allies().length,1);
});
