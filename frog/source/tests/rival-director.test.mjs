import test from 'node:test';
import assert from 'node:assert/strict';
import {RIVAL_RULES,updateRivalCamp,launchRivalRaid,updateRivalExpansions} from '../src/rival-director.js';

const camp = (overrides={}) => ({id:'stronghold',name:'Οι Χάλκινοι',team:'enemy0',x:0,z:0,hp:350,maxHp:350,tier:1,
  stock:{food:30,reeds:40},buildings:{store:true},spawnTimer:0,originalEnemy:true,destroyed:false,mesh:{},...overrides});
const frog = (overrides={}) => ({id:'frog',name:'Βάτραχος',team:'enemy0',home:'stronghold',x:0,z:0,hp:100,maxHp:100,
  tier:1,level:1,guard:true,order:'guard',dead:false,surrendered:false,...overrides});
function fixture({count=6,source=camp()}={}) {
  const toasts=[],spawns=[],updates=[];
  const game={elapsed:300,camps:[source],frogs:Array.from({length:count},(_,i)=>frog({id:`troop-${i}`,home:source.id,team:source.team,x:source.x,z:source.z,leader:i===0})),
    resources:{food:99,reeds:99},predators:[],world:{campSites:[],updateShelter:(...args)=>updates.push(args)},ui:{toast:message=>toasts.push(message)},
    ownedCamps(){return this.camps.filter(c=>c.team==='ally'&&!c.destroyed&&c.hp>0);},
    spawnFrog(data){const result=frog({id:`new-${spawns.length}`,...data});this.frogs.push(result);spawns.push(result);return result;},
    addCamp(data){const result=camp(data);this.camps.push(result);return result;}};
  return {game,source,toasts,spawns,updates};
}

test('a rival finances timed reinforcements from its own actual food and reeds',()=>{
  const {game,source,spawns}=fixture(),bank={...game.resources};
  updateRivalCamp(game,source,84);assert.equal(spawns.length,0);
  updateRivalCamp(game,source,1);assert.equal(spawns.length,1);
  assert.ok(Math.abs(source.stock.food-(30+85*.14-14))<1e-9);
  assert.ok(Math.abs(source.stock.reeds-(40+85*.075-6))<1e-9);
  assert.deepEqual(game.resources,bank);assert.equal(source.spawnTimer,0);
  assert.equal(spawns[0].home,source.id);assert.equal(spawns[0].guard,true);
});

test('troops away on raids still count toward the camp army; surrendered troops do not',()=>{
  const {game,source,spawns}=fixture({count:8});
  game.frogs[7].x=100;game.frogs[7].raidTarget='home';
  game.camps.push(camp({id:'home',team:'ally',x:100,z:0}));
  updateRivalCamp(game,source,85);assert.equal(spawns.length,0);
  game.frogs[7].surrendered=true;
  updateRivalCamp(game,source,.1);assert.equal(spawns.length,1);
});

test('a besieged rival does not collect income, repair, build or instantly reinforce',()=>{
  const {game,source,spawns,updates}=fixture();
  game.frogs.push(frog({id:'attacker',team:'ally',home:'home',x:5}));
  const before={...source.stock};updateRivalCamp(game,source,120);
  assert.deepEqual(source.stock,before);assert.equal(spawns.length,0);assert.equal(updates.length,0);
});

test('development pays reserves, keeps a reinforcement budget and never upgrades beyond tier three',()=>{
  const source=camp({stock:{food:100,reeds:100},rivalDevelopTimer:110}),{game,updates}=fixture({count:8,source});
  const result=updateRivalCamp(game,source,.1);
  assert.equal(result.developed,'watchtower');assert.equal(source.buildings.watchtower,true);
  assert.ok(Math.abs(source.stock.food-(100+.014-20))<1e-9);assert.equal(updates.length,1);
  source.tier=3;source.buildings.palisade=true;source.rivalDevelopTimer=110;source.stock={food:220,reeds:180};
  while(game.frogs.length<12)game.frogs.push(frog({id:`extra-${game.frogs.length}`}));
  assert.equal(updateRivalCamp(game,source,.1).developed,null);assert.equal(source.tier,3);
  source.tier=1;source.buildings.watchtower=false;source.stock={food:20,reeds:32};
  assert.equal(updateRivalCamp(game,source,.1).developed,null,'must keep money for a reinforcement');
});

test('raids use existing nearby troops, keep home defenders and prefer an exposed base',()=>{
  const {game,source,toasts,spawns}=fixture({count:8});
  const near=camp({id:'fortified',name:'Φρούριο',team:'ally',x:45,buildings:{watchtower:true}});
  const exposed=camp({id:'exposed',name:'Πέρασμα',team:'ally',x:70});game.camps.push(near,exposed);
  game.frogs.push(...Array.from({length:4},(_,i)=>frog({id:`guard-${i}`,team:'ally',home:near.id,x:45})));
  const result=launchRivalRaid(game);assert.equal(result.targetId,exposed.id);assert.equal(result.raiderIds.length,4);
  assert.equal(game.frogs.filter(f=>f.home===source.id&&!f.raidTarget).length,4);
  assert.ok(game.frogs.find(f=>f.leader).guard);assert.equal(spawns.length,0);
  assert.match(toasts[0].detail,/Χάλκινοι/);assert.match(toasts[0].detail,/Πέρασμα/);
  assert.equal(launchRivalRaid(game),null,'same troops cannot be dispatched twice');
});

test('away troops, captive troops and active raiders cannot be repurposed as a new attack',()=>{
  const {game}=fixture({count:8});game.camps.push(camp({id:'home',team:'ally',x:70}));
  game.frogs[4].x=100;game.frogs[5].grabbedBy={};game.frogs[6].surrendered=true;game.frogs[7].raidTarget='home';
  assert.equal(launchRivalRaid(game),null);
  assert.equal(game.frogs[7].raidTarget,'home');
});

test('a completed or captured raid destination releases attackers to their original home',()=>{
  const {game,source}=fixture({count:8});const raider=game.frogs[1];
  game.camps.push(camp({id:'captured',x:80}));raider.raidTarget='captured';raider.guard=false;raider.order='attack';
  updateRivalCamp(game,source,.1);assert.equal(raider.raidTarget,null);assert.equal(raider.guard,true);assert.equal(raider.order,'guard');
});

test('one expansion takes reserves and time, transfers real guards, and does not add a victory target',()=>{
  const source=camp({stock:{food:150,reeds:150},rivalExpansionTimer:240}),{game,spawns}=fixture({count:8,source});
  game.world.campSites=[{id:'island',x:60,z:0},{id:'other-island',x:110,z:0}];
  const originalCount=game.frogs.length;
  assert.equal(updateRivalExpansions(game,.1).length,0);assert.ok(source.rivalExpansion);
  assert.deepEqual(source.stock,{food:108,reeds:102});assert.equal(game.camps.length,1);
  game.elapsed+=44;assert.equal(updateRivalExpansions(game,44).length,0);
  game.elapsed+=1;const result=updateRivalExpansions(game,1);assert.equal(result.length,1);
  const outpost=result[0];assert.equal(outpost.originalEnemy,false);assert.equal(outpost.rivalOrigin,source.id);
  assert.equal(game.frogs.filter(f=>f.home===outpost.id).length,2);
  assert.equal(game.frogs.length,originalCount);assert.equal(spawns.length,0);
  source.stock={food:220,reeds:180};game.elapsed+=1000;updateRivalExpansions(game,1000);
  assert.equal(game.camps.length,2,'one outpost maximum for each original stronghold');
});

test('an island occupied during preparation cancels the expansion without duplicate shelters',()=>{
  const source=camp({stock:{food:150,reeds:150},rivalExpansionTimer:240}),{game}=fixture({count:8,source});
  game.world.campSites=[{id:'island',x:60,z:0}];updateRivalExpansions(game,.1);
  game.camps.push(camp({id:'player-built-first',team:'ally',x:60,z:0}));game.elapsed+=45;
  assert.equal(updateRivalExpansions(game,45).length,0);assert.equal(source.rivalExpansion,null);
  assert.equal(game.camps.length,2);assert.deepEqual(source.stock,{food:150,reeds:150});
});

test('capturing the original camp cancels a pending expansion instead of funding an allied outpost',()=>{
  const source=camp({stock:{food:150,reeds:150},rivalExpansionTimer:240}),{game}=fixture({count:8,source});
  game.world.campSites=[{id:'island',x:60,z:0}];updateRivalExpansions(game,.1);
  source.team='ally';game.elapsed+=45;updateRivalExpansions(game,45);
  assert.equal(source.rivalExpansion,null);assert.equal(game.camps.length,1);assert.deepEqual(source.stock,{food:108,reeds:102});
});

test('empty reserves never produce free reinforcements or development',()=>{
  const {game,source,spawns}=fixture({source:camp({stock:{food:0,reeds:0},spawnTimer:85,rivalDevelopTimer:110})});
  updateRivalCamp(game,source,.1);assert.equal(spawns.length,0);assert.equal(source.buildings.watchtower,undefined);
  assert.ok(source.stock.food<RIVAL_RULES.reinforcementCost.food);
});
