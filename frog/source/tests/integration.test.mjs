import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

// Import the real complete game class, without constructing its WebGL renderer.
// The bundle also resolves CSS and Three add-ons in Node. Only presentation,
// storage and model creation are stubbed at their existing boundaries below.
const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/game.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {FrogGame}=await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
const noop=()=>{};

function actor(overrides={}){
  return {id:'actor',name:'Test frog',team:'ally',role:'scout',x:0,y:.35,z:0,yaw:0,hp:100,maxHp:100,stomach:100,maxStomach:100,level:1,tier:1,xp:0,morale:100,dead:false,surrendered:false,grounded:true,swimming:false,vx:0,vz:0,vy:0,speed:0,jump:0,jumpTime:0,attackCD:0,specialCD:99,roarCD:99,invulnerable:0,stun:0,eatCD:0,fear:0,brain:10,guard:false,home:null,seed:1,thinkOffset:.2,model:{setOutline:noop,setTier:noop,group:{}},...overrides};
}
function camp(overrides={}){
  return {id:'camp',name:'Test camp',team:'enemy0',x:1,z:1,hp:350,maxHp:350,tier:1,stock:{food:30,reeds:40},buildings:{},morale:100,destroyed:false,originalEnemy:true,spawnTimer:0,mesh:{},...overrides};
}
function fixture(){
  const game=Object.create(FrogGame.prototype),player=actor({id:'player',team:'player',hp:120,maxHp:120,stamina:100,maxStamina:100});
  const messages=[];
  Object.assign(game,{
    player,frogs:[player],predators:[],camps:[],resources:{food:100,reeds:100},elapsed:1000,graceUntil:0,command:'follow',targetCommand:null,random:()=>.5,idCounter:0,nextRaid:Infinity,stats:game.emptyStats(),
    world:{hotspots:[],campSites:[],sampleHeight:()=>.35,getSurface:()=>({height:.35,type:'land',platform:null}),splash:noop,impact:noop,updateShelter:noop,createShelter:()=>({}),removeShelter:noop},
    ui:{toast:(...args)=>messages.push(args),renderPanel:noop},audio:{play:noop},vfx:{number:noop,tongue:noop,cue:noop},
    save:()=>true,updateUI:noop,
  });
  return {game,player,messages};
}

test('a surrender pays its reward once and clears commands and actor intents',()=>{
  const {game,player}=fixture(),victim=actor({id:'victim',team:'enemy0',x:1,hp:8}),ally=actor({id:'ally',intent:{kind:'attack',target:victim}});
  game.frogs.push(ally,victim);game.command='attack';game.targetCommand=victim;
  game.damage(victim,30,player);
  assert.equal(victim.surrendered,true);assert.equal(game.command,'follow');assert.equal(game.targetCommand,null);assert.equal(ally.intent,null);
  assert.equal(game.stats.kills,1);assert.equal(player.xp,24);assert.equal(game.resources.reeds,105);
  const before={xp:player.xp,reeds:game.resources.reeds,hp:victim.hp,kills:game.stats.kills};
  for(let i=0;i<6;i++){victim.invulnerable=0;game.damage(victim,50,ally);}
  assert.deepEqual({xp:player.xp,reeds:game.resources.reeds,hp:victim.hp,kills:game.stats.kills},before);
});

test('rival gangs can fight each other without granting player XP or resources',()=>{
  const {game,player}=fixture(),victim=actor({id:'victim',team:'enemy0',hp:5}),rival=actor({id:'rival',team:'enemy1',x:2});
  game.frogs.push(victim,rival);const resources={...game.resources};
  game.damage(victim,25,rival);
  assert.equal(victim.surrendered,true);assert.equal(player.xp,0);assert.equal(game.stats.kills,0);assert.deepEqual(game.resources,resources);
});

test('friendly fire is rejected while foreign gangs and predators remain dangerous',()=>{
  const {game,player}=fixture(),ally=actor({id:'ally'}),enemy=actor({id:'enemy',team:'enemy0'});
  game.frogs.push(ally,enemy);
  game.damage(ally,30,player);assert.equal(ally.hp,100);
  game.damage(enemy,30,actor({team:'enemy0',x:2}));assert.equal(enemy.hp,100);
  game.damage(enemy,20,actor({team:'enemy1',x:2}));assert.equal(enemy.hp,80);
  game.damage(ally,30,{team:'predator',x:2,z:0});assert.equal(ally.hp,70);
});

test('stale attack intents cannot hit a newly allied or surrendered frog',()=>{
  for(const target of [actor({id:'new-ally',team:'ally',x:1}),actor({id:'yielded',team:'enemy0',surrendered:true,x:1,hp:15})]){
    const {game}=fixture(),attacker=actor({id:'attacker',intent:{kind:'attack',target},brain:20});
    game.frogs.push(attacker,target);const hp=target.hp;
    game.updateFrogs(.1);
    assert.equal(target.hp,hp);assert.equal(attacker.intent,null);assert.equal(game.resources.reeds,100);
  }
});

test('the squad planner invalidates a target that surrendered between AI decisions',()=>{
  const {game}=fixture(),ally=actor({id:'ally'}),victim=actor({id:'victim',team:'enemy0',surrendered:true,x:2});
  game.frogs.push(ally,victim);game.command='attack';game.targetCommand=victim;
  const intent=game.thinkFrog(ally,[ally]);
  assert.equal(game.targetCommand,null);assert.equal(game.command,'follow');assert.notEqual(intent?.kind,'attack');
});

test('recruitment clears an existing attack order before the new ally can be hit',t=>{
  t.mock.method(Math,'random',()=>0);
  const {game}=fixture(),recruit=actor({id:'recruit',team:'enemy0',surrendered:true,hp:15,x:1}),attacker=actor({id:'attacker',intent:{kind:'attack',target:recruit}});
  game.frogs.push(attacker,recruit);game.command='attack';game.targetCommand=recruit;
  game.recruit(recruit);
  assert.equal(recruit.team,'ally');assert.equal(recruit.surrendered,false);assert.equal(game.command,'follow');assert.equal(game.targetCommand,null);assert.equal(attacker.intent,null);
  const hp=recruit.hp;game.updateFrogs(.1);assert.equal(recruit.hp,hp);
  assert.equal(game.resources.food,94);
});

test('capturing a camp cancels attacks on the camp and all newly converted defenders',()=>{
  const {game}=fixture(),base=camp({hp:60}),defender=actor({id:'defender',team:'enemy0',home:base.id,x:1}),attacker=actor({id:'attacker',intent:{kind:'camp-attack',target:base}}),second=actor({id:'second',intent:{kind:'attack',target:defender}});
  game.camps.push(base);game.frogs.push(attacker,second,defender);game.command='attack';game.targetCommand=base;
  game.captureCamp(base);
  assert.equal(base.team,'ally');assert.equal(defender.team,'ally');assert.equal(defender.guard,true);
  assert.equal(attacker.intent,null);assert.equal(second.intent,null);assert.equal(game.targetCommand,null);assert.equal(game.command,'follow');
  const hp=base.hp;game.updateFrogs(.1);assert.equal(base.hp,hp);
  const resources={...game.resources},xp=game.player.xp;game.captureCamp(base);
  assert.deepEqual(game.resources,resources);assert.equal(game.player.xp,xp);assert.equal(game.stats.campsCaptured,1);
});

test('the camp damage gate stops stale friendly attacks but allows genuine raids',()=>{
  const {game,player}=fixture(),base=camp({team:'ally'}),attacker=actor({id:'ally',intent:{kind:'camp-attack',target:base},brain:20});
  game.camps.push(base);game.frogs.push(attacker);
  game.updateFrogs(.1);assert.equal(base.hp,350);assert.equal(attacker.intent,null);
  game.damageCamp(base,25,player);assert.equal(base.hp,350);
  game.damageCamp(base,25,actor({team:'enemy0'}));assert.equal(base.hp,325);
});

test('destroying a hostile camp clears attack targets and pays destruction XP once',()=>{
  const {game,player}=fixture(),base=camp({hp:8}),defender=actor({team:'enemy0',home:base.id}),ally=actor({id:'ally',intent:{kind:'camp-attack',target:base}});
  game.camps.push(base);game.frogs.push(defender,ally);game.command='attack';game.targetCommand=base;
  game.damageCamp(base,20,player);
  assert.equal(base.destroyed,true);assert.equal(defender.surrendered,true);assert.equal(game.targetCommand,null);assert.equal(ally.intent,null);
  const before={level:player.level,xp:player.xp};game.damageCamp(base,100,player);
  assert.deepEqual({level:player.level,xp:player.xp},before);
});

test('building on water or beside an existing camp never spends resources',()=>{
  const {game}=fixture();game.world.getSurface=()=>({height:-.25,type:'water'});
  const before={...game.resources};game.build('shelter');assert.deepEqual(game.resources,before);assert.equal(game.camps.length,0);
  game.world.getSurface=()=>({height:.35,type:'land'});game.camps.push(camp({x:2,z:0,team:'ally'}));
  game.build('shelter');assert.deepEqual(game.resources,before);assert.equal(game.camps.length,1);
});

test('a legal shelter placement charges once and creates a real allied camp',()=>{
  const {game}=fixture();game.resources={food:12,reeds:30};
  game.build('shelter');
  assert.deepEqual(game.resources,{food:0,reeds:0});assert.equal(game.camps.length,1);assert.equal(game.camps[0].team,'ally');assert.equal(game.camps[0].destroyed,false);assert.equal(game.stats.campsBuilt,1);
  game.build('shelter');assert.equal(game.camps.length,1);assert.deepEqual(game.resources,{food:0,reeds:0});
});

test('a nursery waits for its real cost, then consumes food and reeds atomically',()=>{
  const {game}=fixture(),base=camp({team:'ally',spawnTimer:84.9,buildings:{nursery:true}}),spawned=[];
  game.camps.push(base);game.resources={food:9,reeds:12};game.spawnFrog=data=>{spawned.push(data);return actor(data);};
  game.updateEconomy(.2);assert.equal(spawned.length,0);assert.deepEqual(game.resources,{food:9,reeds:12});
  game.resources.food=10;game.updateEconomy(.1);
  assert.equal(spawned.length,1);assert.deepEqual(game.resources,{food:0,reeds:6});assert.equal(base.spawnTimer,0);assert.equal(spawned[0].guard,true);assert.equal(spawned[0].home,base.id);
});

test('the actual economy uses the night cycle to slow fly replenishment',()=>{
  const {game}=fixture(),hotspot={id:'food',x:0,z:0,flies:0,maxFlies:240,rich:true};game.world.hotspots.push(hotspot);
  game.elapsed=0;game.updateEconomy(10);const dayFlies=hotspot.flies;
  hotspot.flies=0;game.elapsed=300;game.updateEconomy(10);
  assert.ok(dayFlies>0);assert.ok(hotspot.flies>0&&hotspot.flies<dayFlies);assert.ok(Math.abs(hotspot.flies/dayFlies-.65)<1e-10);
});

test('emergency meals cannot overfill a frog or exceed the daily camp ration',()=>{
  const {game,player}=fixture(),base=camp({team:'ally'});game.camps.push(base);player.stomach=80;
  game.consume();assert.equal(player.stomach,100);assert.equal(base.mealCount,1);assert.equal(game.resources.food,90);
  player.stomach=60;game.consume();assert.equal(player.stomach,85);assert.equal(base.mealCount,2);assert.equal(game.resources.food,80);
  player.stomach=10;game.consume();assert.equal(player.stomach,10);assert.equal(base.mealCount,2);assert.equal(game.resources.food,80);
});
