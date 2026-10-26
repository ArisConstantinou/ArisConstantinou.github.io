import test from 'node:test';
import assert from 'node:assert/strict';
import {creekRivalMethods,creekHostility,creekFriendlyTerritory,normalizeCreekSociety} from '../src/creek-rivals.js';

const frog=(id,team='ally',extra={})=>({id,name:id,team,x:0,z:0,y:0,hp:100,maxHp:100,stomach:90,seed:1,morale:100,order:'follow',role:'scout',roarCD:0,model:{setOutline(){},setEquipment(){},setCrowned(){}},...extra});
function fixture(){
  const messages=[],player=frog('player','player',{level:1,stomach:40}),camp={id:'shore',team:'enemy0',originalEnemy:true,x:20,z:0,hp:250,maxHp:250,creekApproach:'share',creekRelation:'hostile',name:'Όχθη',mesh:{}};
  const leader=frog('leader','enemy0',{leader:true,home:camp.id,x:20}),resident=frog('resident','enemy0',{home:camp.id,x:22});
  const game={...creekRivalMethods,player,frogs:[player,leader,resident],predators:[],camps:[camp],elapsed:10,graceUntil:0,resources:{food:20},stats:{campsCaptured:0,predatorsKilled:0,predatorsRepelled:0},realms:{active:0},selectedIds:new Set(),
    world:{hotspots:[],campSites:[],predatorAnchors:{heron:{x:65,z:0},snake:{x:-65,z:10},fish:{x:0,z:65}},getSurface:()=>({type:'water',height:-.25}),updateShelter(){}},
    ui:{toast:(...a)=>messages.push(a)},audio:{play(){}},scene:{remove(){}},updateUI(){},save(){this.saves=(this.saves||0)+1;},gainXP(n){this.xp=(this.xp||0)+n;},
    allies(){return this.frogs.filter(f=>f.team==='ally'&&!f.dead);},hostile(a,b){return creekHostility(this,a,b);},
    creekSnapshot(){return {phase:{stamp:'0:steady'},nest:{x:17,z:16}};},
    spawnPredator(data){const p={...data,team:'predator',hp:data.hp,maxHp:data.hp,phase:'patrol',dead:false};this.predators.push(p);return p;},
    addCamp(data){const c={...data,mesh:{}};this.camps.push(c);return c;},
    spawnRival(c,{leader=false}={}){const f=frog('new-'+this.frogs.length,c.team,{home:c.id,x:c.x,z:c.z,leader});this.frogs.push(f);return f;}};
  game.creekSociety=normalizeCreekSociety({},game.elapsed);return {game,player,camp,leader,resident,messages};
}

test('sharing an actual food amount establishes coexistence without removing or mass-recruiting the group',()=>{
  const {game,camp,leader,resident,player}=fixture();const oldCount=game.frogs.length;
  assert.equal(game.creekTerritoryOffer(camp).allowed,true);assert.equal(game.resolveCreekTerritory(camp,'share'),true);
  assert.equal(game.resources.food,12);assert.equal(game.frogs.length,oldCount);assert.equal(game.allies().length,0);
  assert.equal(leader.team,'enemy0');assert.equal(resident.team,'enemy0');assert.equal(creekFriendlyTerritory(camp),true);
  assert.equal(game.hostile(player,leader),false);assert.equal(game.hostile(leader,player),false);
  assert.equal(game.resolveCreekTerritory(camp,'share'),false);assert.equal(game.resources.food,12);assert.equal(game.stats.campsCaptured,1);
});

test('a combat agreement requires a genuine surrendered or defeated leader',()=>{
  const {game,camp,leader,resident}=fixture();
  assert.equal(game.resolveCreekTerritory(camp,'contest'),false,'healthy leader cannot be bypassed by requesting contest directly');
  leader.surrendered=true;assert.equal(game.creekTerritoryOffer(camp).approach,'contest');
  assert.equal(game.resolveCreekTerritory(camp,'contest'),true);assert.equal(camp.creekRelation,'yielded');
  assert.equal(resident.team,'neutral');assert.equal(game.allies().length,0);assert.equal(resident.dead,undefined);
});

test('respect and shared-threat approaches retain their distinct conditions without any building requirement',()=>{
  const {game,camp}=fixture();camp.creekApproach='respect';assert.equal(game.creekTerritoryOffer(camp).allowed,false);
  game.frogs.push(...[1,2,3].map(i=>frog('friend-'+i,'ally',{x:18+i,z:0})));
  assert.equal(game.creekTerritoryOffer(camp).allowed,true);
  camp.creekApproach='coexist';assert.equal(game.creekTerritoryOffer(camp).allowed,false);
  game.stats.predatorsRepelled=1;assert.equal(game.creekTerritoryOffer(camp).allowed,true);
  assert.equal(game.resolveCreekTerritory(camp,'coexist'),true);assert.equal(game.resources.food,20);
});

test('established agreements survive habitat shifts and do not move migration timers',()=>{
  const {game,camp}=fixture();game.creekSociety.nextMigrationAt=420;game.creekSociety.nextRivalAt=600;
  game.resolveCreekTerritory(camp,'share');const before={...game.creekSociety};
  game.creekPhaseState={stamp:'0:low'};game.elapsed=120;game.updateCreekSociety(.1);
  assert.equal(camp.creekRelation,'coexist');assert.equal(game.creekSociety.nextMigrationAt,before.nextMigrationAt);assert.equal(game.creekSociety.nextRivalAt,before.nextRivalAt);
});

test('wildlife migration occurs on the habitat schedule, never immediately after a defeat or scaled to player level',()=>{
  const {game,player}=fixture();game.initCreekSociety();assert.equal(game.predators.length,3);
  const original=game.predators[0],deadline=game.creekSociety.nextMigrationAt;original.dead=true;original.hp=0;
  player.level=99;game.elapsed=deadline-40;game.updateCreekSociety(.1);assert.equal(game.predators.length,3);assert.equal(game.creekSociety.nextMigrationAt,deadline);
  game.elapsed=deadline-30;game.updateCreekSociety(.1);assert.equal(game.creekSociety.warned,true);assert.equal(game.creekSociety.nextMigrationAt,deadline);
  game.elapsed=deadline+1;game.updateCreekSociety(.1);assert.equal(game.predators.length,4);assert.equal(original.dead,true);assert.equal(original.hp,0);
  const migrant=game.predators.at(-1);assert.notEqual(migrant.id,original.id);assert.ok(Math.hypot(migrant.x-player.x,migrant.z-player.z)>52);
  assert.ok(migrant.maxHp<=650,'region-zero migration does not scale with player level');assert.ok(game.creekSociety.nextMigrationAt>game.elapsed);
});

test('a newly available wildlife slot after an overdue deadline still gives a full warning before migration',()=>{
  const {game,messages}=fixture();game.initCreekSociety();game.spawnCreekWildlife('heron',{x:-70,z:0},'roam');
  const deadline=game.creekSociety.nextMigrationAt,originalIds=game.predators.map(p=>p.id),fallen=game.predators[0];
  game.elapsed=deadline-20;game.updateCreekSociety(.1);
  assert.equal(game.creekSociety.warned,false);assert.equal(game.predators.length,4);
  fallen.dead=true;fallen.hp=0;game.elapsed=deadline+2;const warningAt=game.elapsed;game.updateCreekSociety(.1);
  assert.equal(game.creekSociety.warned,true);assert.equal(game.predators.length,4,'a local defeat cannot trigger an immediate replacement');
  assert.ok(game.creekSociety.nextMigrationAt>=warningAt+30);assert.ok(game.creekSociety.nextMigrationAt>=deadline);
  assert.equal(messages.filter(m=>m[0]?.id==='creek-migration-warning').length,1);
  game.elapsed=warningAt+29;game.updateCreekSociety(.1);assert.equal(game.predators.length,4);
  game.elapsed=game.creekSociety.nextMigrationAt+.1;game.updateCreekSociety(.1);
  assert.equal(game.predators.length,5);assert.ok(!originalIds.includes(game.predators.at(-1).id));
  assert.equal(fallen.dead,true);assert.equal(fallen.hp,0);assert.equal(messages.filter(m=>m[0]?.id==='creek-migration-warning').length,1);
});

test('ecological hotspot activity changes food replenishment without refilling stocks',()=>{
  const {game}=fixture();game.world.hotspots=[{flies:10,maxFlies:100,regenMultiplier:1.4},{flies:10,maxFlies:100,regenMultiplier:.45}];
  game.updateCreekSociety(1);
  assert.ok(game.world.hotspots[0].flies>game.world.hotspots[1].flies);
  assert.ok(game.world.hotspots.every(h=>h.flies>10&&h.flies<11));
});

test('food carried on an expedition can be eaten away from a castle or territory',()=>{
  const {game,player}=fixture();game.camps=[];player.x=-90;player.z=80;
  assert.equal(game.consumeCreekFood(),true);assert.equal(game.resources.food,17);assert.equal(player.stomach,68);
});

test('scout commands move selected frogs ahead and warn before returning from a detected threat',()=>{
  const {game,player,messages}=fixture();const scout=frog('scout','ally',{x:1,z:0}),other=frog('other','ally',{x:1,z:1});game.frogs.push(scout,other);game.cameraYaw=0;
  assert.equal(game.creekGroupCommand('scout',[scout.id]),true);assert.equal(scout.order,'scout');assert.equal(other.order,'follow');
  const outbound=game.creekTacticalIntent(scout);assert.equal(outbound.kind,'move');assert.ok(outbound.target.z>=16);
  game.predators.push({id:'snake',team:'predator',hp:200,maxHp:200,x:5,z:0,phase:'stalk'});
  const retreat=game.creekTacticalIntent(scout);assert.equal(scout.order,'retreat');assert.equal(retreat.kind,'move');assert.ok(messages.some(m=>m[0]?.label?.includes('εντόπισε')));
  assert.equal(player.hp,100);
});

test('a distraction uses the selected frog to draw attention and retreats when injured',()=>{
  const {game}=fixture();const caller=frog('caller','ally',{role:'caller',x:5,z:0});game.frogs.push(caller);
  const threat={id:'heron',team:'predator',hp:650,maxHp:650,x:16,z:0,phase:'patrol'};game.predators.push(threat);game.aimTarget={kind:'actor',entity:threat};
  assert.equal(game.creekGroupCommand('distract',[caller.id]),true);
  assert.equal(game.creekTacticalIntent(caller).kind,'move');assert.equal(threat.target,caller);assert.equal(threat.phase,'stalk');assert.equal(threat.hp,650);
  caller.hp=30;game.creekTacticalIntent(caller);assert.equal(caller.order,'retreat');
});

test('protect intercepts a nearby threat and guard holds an actual chosen point',()=>{
  const {game}=fixture();const friend=frog('friend','ally',{x:2,z:0});game.frogs.push(friend);
  assert.equal(game.creekGroupCommand('protect',[friend.id]),true);assert.equal(game.creekTacticalIntent(friend).formation,true);
  const threat={id:'snake',team:'predator',hp:200,maxHp:200,x:4,z:0,phase:'lunge'};game.predators.push(threat);
  assert.equal(game.creekTacticalIntent(friend).target,threat);assert.equal(game.creekTacticalIntent(friend).kind,'attack');
  game.predators=[];assert.equal(game.creekGroupCommand('guard',[friend.id]),true);
  assert.equal(friend.guard,true);assert.equal(friend.home,null);assert.deepEqual(game.creekTacticalIntent(friend).target,friend.creekOrderPoint);
});

test('retreat first moves away from an intervening threat instead of crossing its position',()=>{
  const {game}=fixture();const friend=frog('friend','ally',{x:10,z:0,order:'retreat'});game.frogs.push(friend);
  game.predators.push({id:'snake',team:'predator',hp:100,x:8,z:0,phase:'stalk'});
  const intent=game.creekTacticalIntent(friend);
  assert.ok(intent.target.x>=friend.x||Math.abs(intent.target.z)>2,'first retreat waypoint must avoid walking through the snake');
});

test('player surrender flags do not bypass hostility while NPC surrender is respected',()=>{
  const {game,player,leader}=fixture();player.surrendered=true;
  assert.equal(game.hostile(player,leader),true);leader.surrendered=true;assert.equal(game.hostile(player,leader),false);
});
