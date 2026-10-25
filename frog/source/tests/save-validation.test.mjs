import test from 'node:test';
import assert from 'node:assert/strict';
import {SAVE_VERSION,validateSave,BUILDINGS} from '../src/rules.js';
import {WORLD_REVISION,WORLD_BOUNDARY,WORLD_SCALE} from '../src/world-config.js';
import {initRealmEconomy,economySave,CONSTRUCTION_SECONDS} from '../src/realm-economy.js';
import {mostRecentSave} from '../src/save-store.js';
import {restoreRealmPredators,createRealmState} from '../src/realms.js';

const frog=(id='ally-1',extra={})=>({id,team:'ally',x:2,z:3,hp:90,maxHp:120,level:4,tier:2,...extra});
const camp=(id='home',extra={})=>({id,team:'ally',name:'Κάστρο',x:30,z:30,tier:1,hp:350,maxHp:350,gateHp:160,buildings:{},...extra});
const contract={version:1,requirements:['food','help','base','renown'],encounterLevel:4,unitLevel:4,food:23,rank:6,quest:{kind:'kills',target:2,accepted:true,baseline:15}};
const job=(id='job-1',extra={})=>({id,kind:'construction',type:'store',campId:'home',placement:{campId:'home',local:{x:-9,z:8,yaw:0}},cost:{food:10,reeds:20},duration:24,progress:7,status:'working',createdAt:12,...extra});
const save=(extra={})=>({version:SAVE_VERSION,worldRevision:WORLD_REVISION,elapsed:200,savedAt:1792890000123,player:frog('player',{team:'player',crowned:true}),frogs:[frog()],camps:[camp()],resources:{food:321,reeds:456,pearls:9},stats:{recruited:8,kills:15,crafted:4},...extra});

test('modern saves retain rare currency, crafted gear, timestamps and pending respawn without mutating the source',()=>{
  const input=save({player:frog('player',{team:'player',hp:0,crowned:true,equipment:{armor:'shell',weapon:'reed',crest:true}}),pendingRespawn:true,economy:{version:1,jobs:[]}}),before=structuredClone(input);
  const result=validateSave(input);
  assert.deepEqual(result.resources,input.resources);assert.deepEqual(result.player.equipment,input.player.equipment);
  assert.equal(result.player.crowned,true);assert.equal(result.pendingRespawn,true);assert.equal(result.player.surrendered,false);
  assert.equal(result.savedAt,input.savedAt);assert.equal(mostRecentSave({...result,savedAt:result.savedAt-1},result),result);
  assert.deepEqual(input,before);
});

test('validation keeps legacy gear absent until its one-time migration, while explicit empty gear stays empty',()=>{
  const legacy=validateSave(save({player:frog('player',{team:'player',tier:3}),frogs:[frog('bare',{tier:3,equipment:{}})]}));
  assert.equal(Object.hasOwn(legacy.player,'equipment'),false);assert.equal(legacy.economy,undefined);
  const game={player:legacy.player,frogs:[legacy.player,...legacy.frogs],camps:legacy.camps,resources:legacy.resources};
  initRealmEconomy(game,legacy);
  assert.deepEqual(game.player.equipment,{armor:'reed',weapon:null,crest:true});
  assert.deepEqual(game.frogs[1].equipment,{armor:null,weapon:null,crest:false});
  const modern=validateSave({...legacy,player:game.player,frogs:game.frogs.slice(1),economy:economySave(game)});
  modern.frogs[0].tier=3;
  const again={player:modern.player,frogs:[modern.player,...modern.frogs],camps:modern.camps,resources:modern.resources};initRealmEconomy(again,modern);
  assert.deepEqual(again.frogs[1].equipment,{armor:null,weapon:null,crest:false});
});

test('recruitment preserves rolled terms, accepted quest progress and one-time experience flags',()=>{
  const input=save({frogs:[frog('neutral',{team:'neutral',firstRecruit:true,recruitXpAwarded:true,recruitment:contract})]});
  const actor=validateSave(input).frogs[0];
  assert.deepEqual(actor.recruitment,contract);assert.equal(actor.firstRecruit,true);assert.equal(actor.recruitXpAwarded,true);
  const invalid=validateSave(save({frogs:[frog('broken',{equipment:{armor:'gold',weapon:{},crest:'true'},firstRecruit:'true',recruitXpAwarded:'false',recruitment:{version:1,requirements:'food',quest:'broken'}}),frog('quest',{recruitment:{...contract,requirements:['food','help','food','__proto__',{}],quest:{kind:'free-army',target:-100,accepted:'false',baseline:-1}}})]}));
  assert.equal(invalid.frogs[0].recruitment,null,'malformed contracts reroll valid authored terms rather than becoming free enlistment');
  assert.deepEqual(invalid.frogs[0].equipment,{armor:null,weapon:null,crest:false});assert.equal(invalid.frogs[0].firstRecruit,false);assert.equal(invalid.frogs[0].recruitXpAwarded,false);
  assert.deepEqual(invalid.frogs[1].recruitment.requirements,['food','help']);assert.equal(invalid.frogs[1].recruitment.quest.accepted,false);assert.equal(invalid.frogs[1].recruitment.quest.target,1);assert.equal(invalid.frogs[1].recruitment.quest.baseline,0);
});

test('flank orders retain real paths and target identities while invalid points cannot poison movement',()=>{
  const result=validateSave(save({frogs:[frog('flanker',{order:'flank',tacticalTargetId:'enemy-7',tacticalPath:[{x:10,z:12},{x:1e9,z:-1e9},{x:NaN,z:3},null],orderTarget:{id:'stale-object'}}),frog('lost',{order:'flank',tacticalTargetId:{id:'bad'},tacticalPath:[{x:3,z:2}]})],tacticalGroups:[{id:1,ids:['flanker','flanker','off-region',null]},{id:'2',ids:'broken'}]}));
  assert.equal(result.frogs[0].order,'flank');assert.equal(result.frogs[0].tacticalTargetId,'enemy-7');
  assert.deepEqual(result.frogs[0].tacticalPath,[{x:10,z:12},{x:WORLD_BOUNDARY,z:-WORLD_BOUNDARY}]);assert.equal(result.frogs[0].orderTarget,undefined);
  assert.equal(result.frogs[1].order,'follow');assert.deepEqual(result.frogs[1].tacticalPath,[]);
  assert.deepEqual(result.tacticalGroups,[{id:'1',ids:['flanker','off-region']},{id:'2',ids:[]}]);
});

test('castle specialization, legacy slots and vulnerable worksite progress survive save validation',()=>{
  const result=validateSave(save({camps:[camp('site',{hp:87,maxHp:140,gateHp:0,underConstruction:true,constructionProgress:.375,specialization:'production',legacySlots:5,buildings:{nursery:true},spawnTimer:45}),camp('bad',{specialization:'__proto__',legacySlots:300,underConstruction:'false',constructionProgress:-100})]}));
  const site=result.camps[0];assert.equal(site.underConstruction,true);assert.equal(site.constructionProgress,.375);assert.equal(site.hp,87);assert.equal(site.maxHp,140);assert.equal(site.gateHp,0);assert.equal(site.spawnTimer,0);
  assert.equal(site.specialization,'production');assert.equal(site.legacySlots,5);
  assert.equal(result.camps[1].specialization,null);assert.equal(result.camps[1].underConstruction,false);assert.equal(result.camps[1].legacySlots,5);assert.equal(result.camps[1].constructionProgress,0);
});

test('paid construction and crafting retain costs and elapsed work in active and inactive regions',()=>{
  const economy={version:1,nextJobId:4,upkeepAccumulator:.45,shortageSeconds:12,jobs:[job(),job('job-2',{kind:'craft',type:undefined,recipeId:'shell-armor',targetId:'ally-1',placement:null,cost:{food:18,reeds:32,pearls:3},duration:42,progress:42,status:'delivery'}),job('job-3',{status:'committing'})]};
  const input=save({economy,realms:{version:1,active:1,unlocked:[0,1],regions:{0:{lastActiveAt:100,snapshot:{worldRevision:WORLD_REVISION,elapsed:100,frogs:[frog()],camps:[camp()],economy}}}}});
  const result=validateSave(input),remote=result.realms.regions[0].snapshot;
  assert.deepEqual(result.resources,input.resources);assert.equal(result.economy.jobs.length,2);assert.equal(remote.economy.jobs.length,2);
  assert.equal(remote.economy.jobs[0].progress,7);assert.equal(remote.economy.jobs[1].status,'delivery');assert.equal(remote.economy.jobs[1].cost.pearls,3);
  assert.equal(remote.economy.upkeepAccumulator,.45);assert.equal(remote.economy.shortageSeconds,12);assert.equal(remote.elapsed,100);
  assert.deepEqual(validateSave(result),result,'loading twice never resets work, deducts costs, or reintroduces a committing job');
});

test('invalid jobs cannot crash load, duplicate a queue or acquire an instant malformed duration',()=>{
  const result=validateSave(save({economy:{version:1,jobs:[job(),job(),job('no-duration',{duration:null,progress:500}),job('unknown',{type:'__proto__'}),job('bad-recipe',{kind:'craft',recipeId:'__proto__',targetId:'player'}),job('no-camp',{campId:null}),job('bad-site',{type:'shelter',placement:null})]}}));
  assert.deepEqual(result.economy.jobs.map(j=>j.id),['job-1','no-duration']);assert.equal(result.economy.jobs[1].duration,CONSTRUCTION_SECONDS.store);assert.equal(result.economy.jobs[1].progress,CONSTRUCTION_SECONDS.store);
});

test('malformed job counters cannot turn every future construction identity into Infinity',()=>{
  const result=validateSave(save({economy:{version:1,nextJobId:1e300,jobs:[job(),job('job-'+ '9'.repeat(90))]}}));
  assert.equal(result.economy.jobs.length,2);assert.equal(result.economy.nextJobId,2);assert.ok(Number.isSafeInteger(result.economy.nextJobId));
});

test('inactive realms validate army/castles and preserve dead predators and their reward ledger',()=>{
  const predators=[{id:'killed-boss',type:'heron',x:35,z:15,hp:0,maxHp:1300,boss:true,dead:true,phase:'dead',realmEvent:true,rewardGranted:true,killAwarded:true,defeatNotified:true,eventRole:'guardian',guardianReward:true,respawnAt:null},{id:'wounded',type:'snake',x:10,z:10,hp:123,maxHp:470,playerDamage:21,eventRole:'raid',raidCampId:'home',scale:Infinity}];
  const result=validateSave(save({realms:{version:1,active:0,regions:{1:{snapshot:{worldRevision:WORLD_REVISION,elapsed:70,frogs:[frog('guard',{guard:true}),frog('corpse',{hp:0}),{id:'invalid',x:'bad',z:2}],camps:[camp()],predators}}}}}));
  const region=result.realms.regions[1].snapshot;assert.deepEqual(region.frogs.map(f=>f.id),['guard']);assert.equal(region.predators[0].hp,0);assert.equal(region.predators[0].rewardGranted,true);assert.equal(region.predators[1].hp,123);assert.equal(region.predators[1].playerDamage,21);
  const game={elapsed:200,realms:createRealmState(result.realms),predators:[],spawnPredator(data){const p={...data,model:{group:{visible:true}}};this.predators.push(p);return p;}};
  restoreRealmPredators(game,region.predators);assert.equal(game.predators[0].dead,true);assert.equal(game.predators[0].hp,0);assert.equal(game.predators[0].rewardGranted,true);assert.equal(game.predators[0].model.group.visible,false);assert.equal(game.predators[1].hp,123);
});

test('nested realm cycles are removed without discarding the actual local snapshot or mutating input',()=>{
  const input=save({realms:{version:1,active:0,regions:{}}}),snapshot={worldRevision:WORLD_REVISION,elapsed:60,frogs:[frog('parked')],camps:[camp()],economy:{version:1,jobs:[job()]}};
  input.realms.regions[1]={snapshot};snapshot.realms=input.realms;snapshot.player=input.player;snapshot.resources=input.resources;
  const result=validateSave(input);assert.ok(result);assert.doesNotThrow(()=>JSON.stringify(result));
  const local=result.realms.regions[1].snapshot;assert.equal(local.realms,undefined);assert.equal(local.player,undefined);assert.equal(local.resources,undefined);assert.equal(local.frogs[0].id,'parked');assert.equal(local.economy.jobs[0].progress,7);
  assert.equal(snapshot.realms,input.realms);assert.equal(snapshot.player,input.player);
});

test('validation preserves every legitimate frog and every discovered realm without a population or region ceiling',()=>{
  const frogs=Array.from({length:2400},(_,i)=>frog(`ally-${i}`)),regions={};
  for(let i=0;i<180;i++)regions[i]={lastActiveAt:20,snapshot:{worldRevision:WORLD_REVISION,elapsed:20,frogs:Array.from({length:25},(_,j)=>frog(`region-${i}-guard-${j}`,{guard:true})),camps:[camp(`castle-${i}`)]}};
  const result=validateSave(save({frogs,realms:{version:1,active:0,unlocked:Object.keys(regions).map(Number),regions}}));
  assert.equal(result.frogs.length,2400);assert.equal(Object.keys(result.realms.regions).length,180);assert.equal(result.realms.unlocked.length,180);
  assert.equal(Object.values(result.realms.regions).reduce((count,row)=>count+row.snapshot.frogs.length,0),4500);
});

test('legacy world expansion applies once to local snapshots and cannot repeatedly displace parked armies',()=>{
  const local={version:SAVE_VERSION,worldRevision:1,elapsed:10,frogs:[frog('far',{x:90,z:-40})],camps:[camp('origin',{x:0,z:0})]};
  const result=validateSave(save({realms:{active:0,regions:{1:{snapshot:local}}}}));
  assert.equal(result.realms.regions[1].snapshot.frogs[0].x,90*WORLD_SCALE);assert.equal(result.realms.regions[1].snapshot.worldRevision,WORLD_REVISION);
  assert.deepEqual(validateSave(result).realms.regions[1].snapshot,result.realms.regions[1].snapshot);
});

test('building descriptions disclose actual worker time and separate training from crafted equipment',()=>{
  for(const [type,duration] of Object.entries(CONSTRUCTION_SECONDS))assert.ok(BUILDINGS[type].description.includes(`${duration}″`),type);
  assert.match(BUILDINGS.training.description,/εξοπλισμός κατασκευάζεται χωριστά/);assert.match(BUILDINGS.repair.description,/Δεν δίνει εμπειρία/);
});
