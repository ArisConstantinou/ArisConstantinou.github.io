import test from 'node:test';
import assert from 'node:assert/strict';
import {FrogGame,fixture,actor,camp,installStorage} from './game-fixture.mjs';
import {SAVE_KEY,SAVE_VERSION,RECRUIT_INTERVAL,NURSERY_INTERVAL,gangCapacity,isVictory,validateSave} from '../src/rules.js';
import {WORLD_LAYOUT_VERSION,WORLD_SCALE} from '../src/world-config.js';
import {HUNTER_TYPES,createCampaign} from '../src/campaign.js';
import {defaultPlacement,validateBuildingPlacement} from '../src/placement-rules.js';

function rawActor(overrides={}) {
  return {id:'saved-frog',name:'Saved frog',team:'ally',role:'scout',x:0,z:0,hp:100,maxHp:100,stomach:70,level:1,tier:1,...overrides};
}
function rawSave(overrides={}) {
  return {version:SAVE_VERSION,elapsed:600,resources:{food:80,reeds:90},player:rawActor({id:'player',team:'player'}),frogs:[],camps:[],...overrides};
}
function ownedCamp(overrides={}) {
  return camp({id:'home',team:'ally',x:0,z:0,originalEnemy:false,stock:{food:0,reeds:0},supplyMigrated:true,...overrides});
}
function buildingRecord(home,type) {
  const local=defaultPlacement(type);
  return {campId:home.id,x:home.x+local.x,z:home.z+local.z,yaw:local.yaw,local};
}

test('retaking a lost home cannot surrender travelling allies that still remember that home',()=>{
  const {game,player}=fixture();player.x=70;
  const home=ownedCamp({id:'old-home',hp:1});
  const follower=actor({id:'traveller',home:home.id,x:72});
  const raider=actor({id:'raider',team:'enemy1',home:'enemy-source',raidTarget:home.id,x:1});
  game.camps.push(home);game.frogs.push(follower,raider);
  game.damageCamp(home,20,raider);
  assert.equal(home.team,'enemy1');assert.equal(home.destroyed,false);
  home.hp=1;game.damageCamp(home,30,player);
  assert.equal(home.destroyed,true);assert.equal(raider.surrendered,true);
  assert.equal(follower.team,'ally');assert.equal(follower.surrendered,false);
});

test('capturing a base gives bounded one-time loot without converting its faction into free allies',()=>{
  const {game}=fixture(),target=camp({id:'target',x:65,z:0,stock:{food:1000,reeds:1000}});
  const survivors=[0,1,2].map(i=>actor({id:'survivor-'+i,team:'enemy0',home:target.id,x:65+i,z:0}));
  const outpostTroop=actor({id:'outpost-troop',team:'enemy0',home:'other-outpost',x:-70,z:0});
  game.camps.push(target);game.frogs.push(...survivors,outpostTroop);
  const before={...game.resources},allies=game.allies().length;
  assert.equal(game.captureCamp(target),true);
  assert.equal(target.team,'ally');assert.equal(game.allies().length,allies);
  for(const survivor of survivors){assert.equal(survivor.team,'enemy0');assert.equal(survivor.surrendered,true);}
  assert.equal(outpostTroop.team,'enemy0');assert.equal(outpostTroop.surrendered,false);
  assert.deepEqual(game.resources,{food:before.food+12,reeds:before.reeds+16});
  const after={...game.resources};assert.equal(game.captureCamp(target),false);assert.deepEqual(game.resources,after);
  assert.deepEqual(target.stock,{food:0,reeds:0});assert.equal(target.supplyMigrated,true);
});

test('surrender does not waive provisions and a housing-full army cannot chain recruits',()=>{
  const {game}=fixture(),survivor=actor({id:'survivor',team:'enemy0',surrendered:true});
  game.frogs.push(survivor);game.resources.food=0;
  assert.equal(game.recruit(survivor),false);assert.equal(survivor.team,'enemy0');assert.equal(game.resources.food,0);
  game.resources.food=100;
  for(let i=0;i<gangCapacity(game.camps);i++)game.frogs.push(actor({id:'ally-'+i}));
  const before={...game.resources};assert.equal(game.recruitmentState(survivor).available,false);
  assert.equal(game.recruit(survivor),false);assert.deepEqual(game.resources,before);
  game.frogs.find(f=>f.id==='ally-0').dead=true;
  assert.equal(game.recruit(survivor),true);assert.equal(game.resources.food,before.food-12);
  assert.equal(game.allies().length,gangCapacity(game.camps));
  const second=actor({id:'second-survivor',team:'enemy0',surrendered:true});game.frogs.push(second);game.elapsed+=60;
  assert.equal(game.recruit(second),false);assert.equal(second.team,'enemy0');assert.equal(game.resources.food,before.food-12);
});

test('different survivors share an enlistment interval instead of bypassing it with repeated E',()=>{
  const {game}=fixture(),first=actor({id:'first',team:'enemy0',surrendered:true}),second=actor({id:'second',team:'enemy1',surrendered:true});
  game.frogs.push(first,second);game.resources.food=24;
  assert.equal(game.recruit(first),true);assert.equal(game.resources.food,12);
  assert.equal(game.recruit(second),false);assert.equal(second.team,'enemy1');assert.equal(game.resources.food,12);
  game.elapsed+=RECRUIT_INTERVAL-.1;assert.equal(game.recruit(second),false);
  game.elapsed+=.1;assert.equal(game.recruit(second),true);assert.equal(game.resources.food,0);
});

test('a distant army cannot intimidate a base until allies physically arrive nearby',()=>{
  const {game}=fixture(),target=camp({id:'diplomacy',x:85,z:0,hp:100});
  game.camps.push(target);game.resources.food=500;
  for(let i=0;i<40;i++)game.frogs.push(actor({id:'distant-'+i,x:0,z:i*.1}));
  const before={...game.resources};
  assert.equal(game.persuadeCamp(target),false);assert.equal(target.team,'enemy0');assert.deepEqual(game.resources,before);
  for(const frog of game.allies().slice(0,2)){frog.x=83;frog.z=0;}
  assert.equal(game.persuadeCamp(target),true);assert.equal(target.team,'ally');
  assert.equal(game.allies().length,40,'diplomacy must not add an automatic faction-sized army');
});

test('legacy world migration happens once and retains camp-local actor and building positions',()=>{
  const placement={x:-6.5,z:6,yaw:0};
  assert.equal(validateBuildingPlacement({team:'ally',hp:350,buildings:{}},'store',placement).valid,true);
  const legacy=rawSave({player:rawActor({id:'player',team:'player',x:63,z:66}),
    frogs:[rawActor({id:'guard',home:'old-camp',guard:true,order:'guard',x:62,z:75}),rawActor({id:'traveller',x:0,z:-100})],
    camps:[{id:'old-camp',team:'ally',x:60,z:70,hp:350,maxHp:350,buildings:{store:true},buildingPlacements:{store:placement},stock:{food:0,reeds:0}}]});
  const migrated=validateSave(legacy);
  assert.equal(migrated.worldLayoutVersion,WORLD_LAYOUT_VERSION);
  assert.equal(migrated.camps[0].x,60*WORLD_SCALE);assert.equal(migrated.camps[0].z,70*WORLD_SCALE);
  assert.equal(migrated.player.x-migrated.camps[0].x,3);assert.equal(migrated.player.z-migrated.camps[0].z,-4);
  assert.equal(migrated.frogs[0].x-migrated.camps[0].x,2);assert.equal(migrated.frogs[0].z-migrated.camps[0].z,5);
  assert.equal(migrated.frogs[1].z,-170);assert.deepEqual(migrated.camps[0].buildingPlacements.store,placement);
  const reloaded=validateSave(migrated);
  assert.equal(reloaded.player.x,migrated.player.x);assert.equal(reloaded.frogs[1].z,-170);
  assert.equal(reloaded.camps[0].z,119);assert.equal(legacy.camps[0].z,70,'validation must not mutate the source save');
});

test('current-layout far coordinates survive actual save and world reset',t=>{
  const {game,player,storage}=fixture();installStorage(t,storage);
  player.x=170;player.z=-175;game.nextRaid=1040;
  game.camps.push(ownedCamp({x:160,z:-170}));
  game.frogs.push(actor({id:'far-ally',x:168,z:-169,home:'home'}));
  assert.equal(FrogGame.prototype.save.call(game),true);
  const saved=validateSave(JSON.parse(storage.get(SAVE_KEY))),{game:loaded}=fixture();loaded.resetWorld(saved);
  assert.equal(loaded.player.x,170);assert.equal(loaded.player.z,-175);
  assert.equal(loaded.allies()[0].x,168);assert.equal(loaded.camps[0].z,-170);
});

test('legacy followers far from their home camp migrate with the travelling party',()=>{
  const legacy=rawSave({player:rawActor({id:'player',team:'player',x:0,z:-100}),
    frogs:[rawActor({id:'travelling-follower',home:'far-home',x:2,z:-100,order:'follow'})],
    camps:[{id:'far-home',team:'ally',x:80,z:0,hp:350,maxHp:350,buildings:{},stock:{food:0,reeds:0}}]});
  const migrated=validateSave(legacy),follower=migrated.frogs[0];
  assert.equal(follower.x,2*WORLD_SCALE);assert.equal(follower.z,-170);
  assert.ok(Math.hypot(follower.x-migrated.player.x,follower.z-migrated.player.z)<5,'home assignment must not split the travelling squad during migration');
  assert.equal(follower.home,'far-home');
});

test('a legacy army of 51 allies survives migration even when new housing is over capacity',()=>{
  const legacy=rawSave({frogs:Array.from({length:51},(_,i)=>rawActor({id:'legacy-'+i,x:i*.1,z:0})),
    camps:[{id:'legacy-home',team:'ally',x:8,z:8,hp:350,maxHp:350,buildings:{},stock:{food:0,reeds:0}}]});
  const saved=validateSave(legacy),{game}=fixture();game.resetWorld(saved);
  assert.equal(game.allies().length,51);assert.equal(new Set(game.allies().map(f=>f.id)).size,51);
  assert.ok(game.allies().length>gangCapacity(game.camps));
  const newcomer=actor({id:'newcomer',team:'neutral'});game.frogs.push(newcomer);
  assert.equal(game.recruit(newcomer),false);assert.equal(game.allies().length,51);
});

test('save and repeated reload preserve impending raids, raider orders and paid rival expansion',t=>{
  const {game,storage}=fixture();installStorage(t,storage);game.nextRaid=1008;game.graceUntil=940;game.nextRecruitAt=1004;
  const home=ownedCamp(),enemy=camp({id:'enemy-home',x:80,z:0,rivalDevelopTimer:60,rivalRaidReadyAt:1080,rivalExpansionTimer:240,
    rivalExpansion:{siteId:'expansion-site',x:130,z:25,team:'enemy0',readyAt:1030},rivalOutpostBuilt:false});
  game.camps.push(home,enemy);
  game.frogs.push(actor({id:'active-raider',team:'enemy0',x:40,z:0,home:enemy.id,raidTarget:home.id,guard:false,order:'attack',loot:3}));
  assert.equal(FrogGame.prototype.save.call(game),true);
  const {game:loaded}=fixture();loaded.resetWorld(validateSave(JSON.parse(storage.get(SAVE_KEY))));
  assert.equal(loaded.nextRaid,1008);assert.equal(loaded.graceUntil,940);assert.equal(loaded.nextRecruitAt,1004);
  const raider=loaded.frogs.find(f=>f.id==='active-raider'),source=loaded.camps.find(c=>c.id===enemy.id);
  assert.equal(raider.raidTarget,home.id);assert.equal(raider.order,'attack');assert.equal(raider.guard,false);assert.equal(raider.loot,3);
  assert.equal(source.rivalRaidReadyAt,1080);assert.equal(source.rivalDevelopTimer,60);assert.equal(source.rivalExpansionTimer,240);
  assert.deepEqual(source.rivalExpansion,enemy.rivalExpansion);assert.equal(source.rivalOutpostBuilt,false);
  loaded.elapsed+=2;assert.equal(FrogGame.prototype.save.call(loaded),true);
  const {game:again}=fixture();again.resetWorld(validateSave(JSON.parse(storage.get(SAVE_KEY))));
  assert.equal(again.nextRaid,1008);assert.equal(again.graceUntil,940,'reload must not award another grace period');
  assert.equal(again.frogs.find(f=>f.id==='active-raider').raidTarget,home.id);
});

test('destroyed and enemy-recaptured territories cannot satisfy a previously achieved victory goal',()=>{
  const {game}=fixture();
  for(let i=0;i<5;i++)game.camps.push(ownedCamp({id:'territory-'+i,x:i*32,originalEnemy:true}));
  game.campaign=createCampaign({phase:'bosses',defeated:HUNTER_TYPES,bossDefeated:HUNTER_TYPES,achieved:['territories']});
  const contested=game.camps[4];contested.destroyed=true;contested.hp=0;
  assert.equal(game.campaignMetrics().territories,4);assert.equal(isVictory(game.camps),false);
  game.updateCampaign(true);game.checkVictory();assert.equal(game.won,false);assert.equal(game.campaign.phase,'bosses');
  contested.destroyed=false;contested.hp=200;contested.team='enemy2';
  game.updateCampaign(true);game.checkVictory();assert.equal(game.won,false);assert.equal(game.campaignMetrics().territories,4);
  contested.team='ally';game.updateCampaign(true);game.checkVictory();
  assert.equal(game.won,true);assert.equal(game.campaignMetrics().territories,5);
});

test('direct placement confirmation cannot bypass building slots but an upgrade opens them',()=>{
  const {game}=fixture(),home=ownedCamp({buildings:{store:true,watchtower:true}});game.camps.push(home);game.resources={food:1000,reeds:1000};
  const record=buildingRecord(home,'palisade');assert.equal(validateBuildingPlacement(home,'palisade',record.local).valid,true);
  const before={...game.resources};assert.equal(game.commitBuild('palisade',record),false);
  assert.equal(home.buildings.palisade,undefined);assert.deepEqual(game.resources,before);assert.equal(game.lastBuildCommitted,false);
  assert.equal(game.commitBuild('upgrade'),true);assert.equal(home.tier,2);
  assert.equal(game.commitBuild('palisade',record),true);assert.equal(home.buildings.palisade,true);
});

test('a second shelter charges the expansion price at the final purchase boundary',()=>{
  const {game,player}=fixture();game.resources={food:12,reeds:30};
  assert.equal(game.commitBuild('shelter',{x:0,z:0,yaw:0}),true);assert.deepEqual(game.resources,{food:0,reeds:0});
  player.x=40;game.resources={food:12,reeds:30};
  assert.equal(game.commitBuild('shelter',{x:40,z:0,yaw:0}),false);assert.equal(game.ownedCamps().length,1);
  assert.deepEqual(game.resources,{food:12,reeds:30});
  game.resources={food:36,reeds:62};assert.equal(game.commitBuild('shelter',{x:40,z:0,yaw:0}),true);
  assert.equal(game.ownedCamps().length,2);assert.deepEqual(game.resources,{food:0,reeds:0});
});

test('a newly bought nursery cannot cash in time accumulated before it existed',()=>{
  const {game}=fixture(),home=ownedCamp({spawnTimer:900});game.camps.push(home);game.resources={food:1000,reeds:1000};
  game.updateEconomy(1);assert.equal(home.spawnTimer,0);assert.equal(game.allies().length,0);
  assert.equal(game.commitBuild('nursery',buildingRecord(home,'nursery')),true);assert.equal(home.spawnTimer,0);
  game.elapsed+=NURSERY_INTERVAL-1;game.updateEconomy(NURSERY_INTERVAL-1);assert.equal(game.allies().length,0);
  game.elapsed+=1;game.updateEconomy(1);assert.equal(game.allies().length,1);assert.equal(home.spawnTimer,0);
});

test('nursery progress pauses under attack and simultaneous nurseries cannot burst past the enlistment interval',()=>{
  const {game}=fixture(),home=ownedCamp({buildings:{nursery:true},spawnTimer:NURSERY_INTERVAL-10});
  const raider=actor({id:'threat',team:'enemy0',x:3,z:0});game.camps.push(home);game.frogs.push(raider);game.resources={food:1000,reeds:1000};
  game.elapsed+=20;game.updateEconomy(20);assert.equal(home.spawnTimer,NURSERY_INTERVAL-10);assert.equal(game.allies().length,0);
  raider.dead=true;game.elapsed+=10;game.updateEconomy(10);assert.equal(game.allies().length,1);
  for(let i=1;i<=2;i++)game.camps.push(ownedCamp({id:'nursery-'+i,x:40*i,buildings:{nursery:true},spawnTimer:NURSERY_INTERVAL}));
  game.elapsed+=1;game.updateEconomy(1);assert.equal(game.allies().length,1);
  game.elapsed+=RECRUIT_INTERVAL;game.updateEconomy(RECRUIT_INTERVAL);assert.equal(game.allies().length,2,'ready nurseries must not all spawn on the same tick');
});
