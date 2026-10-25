import test from 'node:test';
import assert from 'node:assert/strict';
import { createRealmState, realmDescriptor, realmTravelOffer, splitRealmParty, archiveCurrentRealm, completeRealmTravel, realmSnapshot, realmBackgroundSupply, realmBackgroundSnapshot, serializePredators, restoreRealmPredators, recordRealmPredatorDefeat, choosePredatorSpawn, tickRealmEvents } from '../src/realms.js';
import { createCampaign, advanceCampaign, campaignObjectives, recordCampaignKill, nextBossType } from '../src/campaign.js';
import { updatePredators, damagePredator } from '../src/predators.js';
import { PREDATORS } from '../src/rules.js';

const noop=()=>{};
const frog=(id,overrides={})=>({id,name:id,team:'ally',hp:100,maxHp:100,x:0,y:.35,z:0,yaw:0,level:6,dead:false,stomach:90,guard:false,order:'follow',...overrides});
const camp=(id,overrides={})=>({id,name:id,team:'ally',hp:350,maxHp:350,x:0,z:0,yaw:0,tier:1,gateHp:240,originalEnemy:true,buildings:{},...overrides});

function fixture({terrain=()=>({type:'land',height:.35})}={}) {
  const player=frog('player',{team:'player',hp:5000,maxHp:5000,blocking:true});
  const notices=[],damage=[],game={player,frogs:[player],predators:[],camps:[camp('home'),camp('second',{x:90})],resources:{food:1000,reeds:1000,pearls:0},stats:{predatorsKilled:0,predatorsRepelled:0},elapsed:1000,graceUntil:0,realms:createRealmState(null,{elapsed:1000}),campaign:createCampaign(null,{}, {endless:true}),realmEventCheckAt:0,
    world:{getSurface:terrain,sampleHeight:(x,z)=>terrain(x,z).height,splash:noop,impact:noop,predatorAnchors:{heron:{x:80,z:0},snake:{x:-80,z:0},fish:{x:0,z:80}},bossAnchors:{heron:{x:110,z:0},snake:{x:-110,z:0},fish:{x:0,z:110}}},
    campSafe:()=>true,allies(){return this.frogs.filter(f=>f.team==='ally'&&!f.dead);},ui:{toast:v=>notices.push(v)},audio:{play:noop},vfx:{strike:noop,number:noop},gainXP:noop,scene:{remove:noop},
    damage(f,n,source){if(f.invulnerable)return;f.hp=Math.max(0,f.hp-n);f.dead=f.hp===0;damage.push({id:f.id,source:source.id,n});},
    damageCamp(c,n,p){c.hp=Math.max(0,c.hp-n);damage.push({camp:c.id,source:p.id,n});},
    spawnPredator(data){const def=PREDATORS[data.type],p={...def,...data,id:`predator-${data.type}`,team:'predator',y:0,yaw:0,maxHp:data.hp||def.hp,hp:data.hp||def.hp,phase:'patrol',phaseTime:0,cooldown:0,grace:0,anchor:{x:data.x,z:data.z},dead:false,target:null,grabbed:null,model:{group:{visible:true},dispose:noop}};this.predators.push(p);return p;},
    onPredatorDefeated(p){recordRealmPredatorDefeat(this,p);}
  };
  return {game,player,notices,damage};
}

test('realm state and names are deterministic; there is no finite frontier maximum',()=>{
  assert.equal(realmDescriptor(0).seed,731);
  assert.notEqual(realmDescriptor(0).seed,realmDescriptor(1).seed);
  assert.notEqual(realmDescriptor(1).name,realmDescriptor(9).name);
  const state=createRealmState({active:501,regions:{501:{snapshot:{camps:[],frogs:[]}}}});
  assert.equal(state.active,501);assert.ok(state.unlocked.includes(501));assert.equal(state.regions[501].index,501);
  assert.deepEqual(createRealmState(JSON.parse(JSON.stringify(state))),state);
});

test('frontier travel requires real current territory, leadership, supplies and a safe completed departure',()=>{
  const {game,player}=fixture();
  const initial=realmTravelOffer(game,1);assert.equal(initial.allowed,true);assert.deepEqual(initial.cost,{food:50,reeds:33});
  assert.equal(realmTravelOffer(game,0).allowed,false);assert.equal(realmTravelOffer(game,2).allowed,false);
  game.camps[1].destroyed=true;assert.equal(realmTravelOffer(game,1).allowed,false);game.camps[1].destroyed=false;
  player.level=5;assert.equal(realmTravelOffer(game,1).allowed,false);player.level=6;
  game.campSafe=()=>false;assert.equal(realmTravelOffer(game,1).allowed,false);game.campSafe=()=>true;
  game.camps[0].underConstruction=true;assert.equal(realmTravelOffer(game,1).allowed,false);game.camps[0].underConstruction=false;
  game.resources.food=49;assert.equal(realmTravelOffer(game,1).allowed,false);
  assert.equal(realmTravelOffer(game,NaN).allowed,false);
});

test('travelling party leaves guards, paid trainees, neutrals and enemies in their actual region',()=>{
  const {game}=fixture();
  const follower=frog('follow'),guard=frog('guard',{guard:true,order:'guard'}),trainee=frog('school',{trainingPaid:true}),neutral=frog('neutral',{team:'neutral'}),enemy=frog('enemy',{team:'enemy0'}),fallen=frog('fallen',{dead:true,hp:0});
  game.frogs.push(follower,guard,trainee,neutral,enemy,fallen);
  assert.deepEqual(splitRealmParty(game).travelerIds,['follow']);
  assert.deepEqual(splitRealmParty(game).parked.map(f=>f.id),['guard','school','neutral','enemy']);
  assert.deepEqual(splitRealmParty(game,[]).travelerIds,[]);
});

test('archiving a region preserves ownership, jobs and guards without duplicating travelling units or global supplies',()=>{
  const {game}=fixture();game.frogs.push(frog('follow'),frog('guard',{guard:true,order:'guard'}));
  const snapshot={player:{level:6},resources:{food:1000},stats:{kills:11},realms:{ignored:true},frogs:game.frogs.map(f=>({...f})),camps:game.camps,constructionJobs:[{id:'work',progress:9}],hotspots:[{id:'flies',flies:3}]};
  const region=archiveCurrentRealm(game,snapshot,{travelingIds:['follow']});
  assert.deepEqual(region.snapshot.frogs.map(f=>f.id),['guard']);assert.equal(region.snapshot.player,undefined);assert.equal(region.snapshot.resources,undefined);assert.equal(region.snapshot.realms,undefined);
  assert.equal(region.snapshot.camps.length,2);assert.equal(region.snapshot.constructionJobs[0].progress,9);assert.equal(region.snapshot.hotspots[0].flies,3);
  snapshot.camps[0].hp=1;assert.equal(region.snapshot.camps[0].hp,350);
});

test('travel commits once, spends exact resources, revisits stored land free, and fails atomically without a snapshot',()=>{
  const {game}=fixture();const supplies={...game.resources};
  assert.equal(completeRealmTravel(game,1).ok,false);assert.deepEqual(game.resources,supplies);assert.equal(game.realms.active,0);
  const result=completeRealmTravel(game,1,{sourceSnapshot:{frogs:[frog('resident',{guard:true})],camps:game.camps}});
  assert.equal(result.ok,true);assert.equal(result.snapshot,null);assert.equal(game.realms.active,1);assert.equal(game.resources.food,950);assert.equal(game.resources.reeds,967);
  assert.equal(completeRealmTravel(game,1,{sourceSnapshot:{}}).ok,false);assert.equal(game.resources.food,950);
  game.player.level=1;game.camps=[camp('outpost',{originalEnemy:false})];
  const revisit=realmTravelOffer(game,0);assert.equal(revisit.allowed,true);assert.deepEqual(revisit.cost,{food:0,reeds:0});
  const returned=completeRealmTravel(game,0,{sourceSnapshot:{frogs:[],camps:game.camps}});
  assert.equal(returned.snapshot.camps.length,2);assert.equal(returned.snapshot.frogs[0].id,'resident');assert.equal(game.resources.food,950);
});

test('region overview counts parked garrisons and current ownership separately',()=>{
  const {game}=fixture();game.realms.regions[1]={...realmDescriptor(1),snapshot:{camps:[camp('far')],frogs:[frog('sentinel',{guard:true}),frog('foe',{team:'enemy3'})]}};
  const view=realmSnapshot(game);assert.equal(view.active,0);assert.equal(view.frontier,2);
  assert.equal(view.regions.find(r=>r.index===1).garrison,1);assert.equal(view.regions.find(r=>r.index===1).owned,1);assert.equal(view.regions.find(r=>r.index===1).enemies,1);assert.equal(view.regions.find(r=>r.index===2).visited,false);
});

test('return travel preserves remaining wildlife cooldown instead of spawning accumulated offscreen events',()=>{
  const {game}=fixture();
  completeRealmTravel(game,1,{sourceSnapshot:{elapsed:1000,frogs:[],camps:game.camps}});
  game.elapsed=5000;
  const result=completeRealmTravel(game,0,{sourceSnapshot:{elapsed:5000,frogs:[],camps:game.camps}});
  assert.equal(result.ok,true);assert.equal(game.realms.events.nextGuardianAt,5150);assert.equal(game.realms.events.nextRoamAt,5300);assert.equal(game.realms.events.nextRaidAt,5720);
});

test('new campaign has no terminal victory and legacy completed campaigns migrate to a frontier',()=>{
  const migrated=createCampaign({phase:'complete',achieved:['territories'],bossDefeated:['heron','snake','fish']},{},{endless:true});
  assert.equal(migrated.endless,true);assert.equal(migrated.phase,'frontier');assert.equal(nextBossType(migrated),null);
  const state=createCampaign(null,{gatheredFood:12,gatheredReeds:20,shelters:1,allies:2,campsBuilt:1,recruited:2},{endless:true});
  assert.equal(state.phase,'frontier');assert.equal(state.round,0);
  const done=advanceCampaign(state,{realmsVisited:2,campsBuilt:2,recruited:8,crafted:2});
  assert.equal(done.state.phase,'frontier');assert.equal(done.state.round,1);assert.deepEqual(done.transitions,[{from:'frontier',to:'frontier',round:1}]);
  assert.equal(advanceCampaign(done.state,{realmsVisited:2,campsBuilt:2,recruited:8,crafted:2}).state.round,1);
  assert.ok(campaignObjectives(done.state,{}).some(g=>g.target>0&&!g.done));
  assert.equal(recordCampaignKill(done.state,'fish',{boss:true}).bossDefeated.includes('fish'),true);
});

test('only explicitly scheduled new wildlife can return; saved event deaths remain dead and reward flags survive AI initialization',()=>{
  const {game}=fixture();const p=game.spawnPredator({type:'heron',x:80,z:0,realmEvent:true,eventRole:'guardian',id:'unique',boss:true});p.id='unique';p.playerDamage=5;
  damagePredator(game,p,p.hp,game.player);assert.equal(p.dead,true);assert.equal(game.resources.pearls,5);
  const rows=serializePredators(game),other=fixture().game;restoreRealmPredators(other,JSON.parse(JSON.stringify(rows)));
  const restored=other.predators[0];assert.equal(restored.id,'unique');assert.equal(restored.dead,true);assert.equal(restored.hp,0);assert.equal(restored.rewardGranted,true);
  other.elapsed+=10000;updatePredators(other,.1);assert.equal(restored.dead,true);assert.equal(restored.killAwarded,true);assert.equal(restored.model.group.visible,false);
  assert.equal(recordRealmPredatorDefeat(other,restored),false);assert.equal(other.resources.pearls,0);
});

test('living saved predators preserve remaining health and do not reset their rare reward ledger',()=>{
  const {game}=fixture();const p=game.spawnPredator({type:'snake',x:80,z:0,realmEvent:true,id:'snake-one'});p.id='snake-one';p.hp=123;p.playerDamage=27;
  const rows=serializePredators(game),other=fixture().game;restoreRealmPredators(other,rows);updatePredators(other,.05);
  assert.equal(other.predators[0].hp,123);assert.equal(other.predators[0].playerDamage,27);assert.equal(other.predators[0].dead,false);
});

test('rare rewards are exactly once and enemy-only kills cannot grant free material',()=>{
  const {game}=fixture();const p={id:'guardian-42',realmEvent:true,dead:true,eventRole:'guardian',playerDamage:10,killAwarded:true};
  assert.equal(recordRealmPredatorDefeat(game,p),3);assert.equal(recordRealmPredatorDefeat(game,p),false);assert.equal(game.resources.pearls,3);
  assert.equal(recordRealmPredatorDefeat(game,{...p,rewardGranted:false}),false);assert.equal(game.resources.pearls,3);
  assert.equal(recordRealmPredatorDefeat(game,{id:'enemy-kill',realmEvent:true,dead:true,playerDamage:0,killAwarded:false}),false);assert.equal(game.resources.pearls,3);
});

test('scheduled wildlife spawns at least 45m from the player, has unique ids and resumes cooldowns after save',()=>{
  const {game,notices}=fixture();game.realms.events.nextGuardianAt=game.elapsed;game.realms.events.nextRoamAt=game.elapsed;game.realms.events.nextRaidAt=game.elapsed;
  tickRealmEvents(game,.05);assert.ok(game.predators.length>=2);assert.equal(new Set(game.predators.map(p=>p.id)).size,game.predators.length);
  for(const p of game.predators)assert.ok(Math.hypot(p.x-game.player.x,p.z-game.player.z)>=45);
  assert.ok(notices.some(n=>String(n.label).includes('κάστρο')));assert.ok(game.realms.events.nextGuardianAt>game.elapsed);
  const before=game.predators.length;game.realms=createRealmState(JSON.parse(JSON.stringify(game.realms)));game.realmEventCheckAt=0;tickRealmEvents(game,.05);assert.equal(game.predators.length,before);
});

test('fish event spawn selects only water, and a guardian does not hunt outside its territory without provocation',()=>{
  const {game}=fixture({terrain:(x,z)=>z>40?{type:'water',height:-.5}:{type:'land',height:2}});
  const point=choosePredatorSpawn(game,'fish');assert.ok(point&&point.z>40);
  const p=game.spawnPredator({type:'snake',x:80,z:0,realmEvent:true,eventRole:'guardian',territoryRadius:26});game.player.x=110;game.player.y=2;p.x=99;
  updatePredators(game,.05);assert.equal(p.target,null);
});

test('a roaming predator actively attacks enemy frogs as well as the player army',()=>{
  const {game,damage}=fixture();game.camps=[];game.player.x=-100;
  const enemy=frog('enemy-prey',{team:'enemy2',x:3,hp:10000,maxHp:10000,blocking:true});game.frogs.push(enemy);
  const p=game.spawnPredator({type:'heron',x:0,z:0,realmEvent:true,eventRole:'roam'});
  for(let i=0;i<90;i++){game.elapsed+=.05;updatePredators(game,.05);}
  assert.ok(damage.some(d=>d.id===enemy.id));assert.equal(p.target,enemy);
});

test('a castle raid walks to an actual fortress and damages it even without defenders',()=>{
  const {game,damage}=fixture();game.player.x=-150;game.camps=[camp('castle',{x:0,z:0})];
  game.spawnPredator({type:'heron',x:3,z:0,realmEvent:true,eventRole:'raid',raidCampId:'castle'});
  for(let i=0;i<100;i++){game.elapsed+=.05;updatePredators(game,.05);}
  assert.ok(damage.some(d=>d.camp==='castle'));assert.ok(game.camps[0].hp<350);
});

test('background bases produce and feed actual parked troops without duplicating the active region or travelling party',()=>{
  const {game}=fixture();const activeFollower=frog('traveler');game.frogs.push(activeFollower);
  game.realms.regions[0].snapshot={camps:[camp('stale-active',{specialization:'production'})],frogs:[frog('ignore-active')]};
  const workers=[frog('guard-a',{guard:true}),frog('guard-b',{guard:true}),{...activeFollower}];
  game.realms.regions[1]={...realmDescriptor(1),snapshot:{camps:[camp('food-base',{specialization:'production',buildings:{store:true,watchtower:true}})],frogs:workers,economy:{jobs:[{id:'pending',progress:7}],shortageSeconds:0}}};
  const before={...game.resources},result=realmBackgroundSupply(game,60);
  assert.equal(result.food,51);assert.equal(result.reeds,19.2);assert.equal(result.upkeep,3);
  assert.equal(game.resources.food,before.food+48);assert.equal(game.resources.reeds,before.reeds+19.2);
  assert.equal(game.realms.regions[1].snapshot.economy.jobs[0].progress,7);assert.equal(game.realms.regions[1].snapshot.frogs.length,3);
  const snapshot=realmBackgroundSnapshot(game);assert.equal(snapshot.armyCount,2);assert.equal(snapshot.guards,2);assert.equal(snapshot.safeCamps,1);assert.equal(snapshot.foodPerMinute,3);
});

test('inactive unsafe or unfinished castles cannot generate income and shortage affects morale without invisible deaths',()=>{
  const {game}=fixture();game.resources.food=0;game.resources.reeds=0;
  const g=frog('hungry',{guard:true,stomach:10,morale:50}),enemy=frog('blockade',{team:'enemy0',x:2});
  game.realms.regions[1]={...realmDescriptor(1),snapshot:{camps:[camp('blocked'),camp('pending',{x:100,underConstruction:true})],frogs:[g,enemy],economy:{jobs:[{id:'build',progress:2}]}}};
  const result=realmBackgroundSupply(game,600);
  assert.equal(result.food,0);assert.equal(result.reeds,0);assert.equal(result.upkeep,0);
  assert.equal(g.hp,100);assert.equal(g.dead,false);assert.equal(g.stomach,0);assert.equal(g.morale,0);
  assert.equal(game.realms.regions[1].snapshot.economy.jobs[0].progress,2);
});

test('background logistics never cash out elapsed or wall-clock time when no simulation dt passes',()=>{
  const {game}=fixture();game.realms.regions[1]={...realmDescriptor(1),lastActiveAt:0,snapshot:{camps:[camp('remote')],frogs:[frog('guard',{guard:true})]}};
  const before={...game.resources};game.elapsed=1000000;
  realmBackgroundSupply(game,0);realmBackgroundSupply(game,-1);realmBackgroundSupply(game,NaN);assert.deepEqual(game.resources,before);
  realmBackgroundSupply(game,.5);assert.deepEqual(game.resources,before);
  game.realms=createRealmState(JSON.parse(JSON.stringify(game.realms)));realmBackgroundSupply(game,.5);
  assert.equal(game.resources.food,before.food+.225);assert.equal(game.resources.reeds,before.reeds+.12);
});
