import assert from 'node:assert/strict';
import {createGame,SAVE_KEY,BUILDING_FOOTPRINTS,UNIT_CLEARANCE,FORT_POLYGONS,isWorldSegmentWalkable,isWorldPointWalkable,worldObstacles} from '../feouda-engine.js';
import {UNIT_TYPES,BUILDINGS,REGIONS,BRIDGES,RESOURCE_NODES,riverX} from '../feouda-data.js';

const cases=[];
const test=(name,fn)=>cases.push({name,fn});
const close=(a,b,eps=1e-6)=>assert.ok(Math.abs(a-b)<eps,`${a} ≠ ${b}`);
const advance=(game,seconds)=>{for(let elapsed=0;elapsed<seconds;elapsed+=.5)game.step(Math.min(.5,seconds-elapsed));};
const own=game=>game.state.squads.filter(s=>s.owner==='player');
const quiet=()=>{
  const game=createGame();
  for(const faction of ['red','gold']){game.state.ai.factions[faction].nextRaid=1e8;game.state.ai.factions[faction].nextRecruit=1e8;}
  return game;
};
const rich=game=>{for(const key of Object.keys(game.state.resources))game.state.resources[key]=10000;return game;};
const plot=(game,type,regionId,rotation=0)=>{
  const placement=game.findBuildLocation(type,regionId,rotation);assert.ok(placement,'A legal '+type+' plot must be available in '+regionId);
  return {type,regionId,x:placement.x,z:placement.z,rotation:placement.rotation};
};
class MemoryStorage {
  constructor(initial={}){this.data={...initial};this.reads=[];this.writes=[];}
  getItem(key){this.reads.push(key);return this.data[key]??null;}
  setItem(key,value){this.writes.push(key);this.data[key]=String(value);}
}
function solo(game,type='spear',p={x:-130,z:75}) {
  const s=own(game).find(s=>s.type===type);assert.ok(s);
  game.state.squads=[s];s.x=p.x;s.z=p.z;s.anchor={...p};s.path=[];s.order={type:'hold',...p};s.stance='defensive';
  return s;
}
function duel(typeA,typeB,pA={x:-130,z:75},pB={x:-110,z:75}) {
  const game=quiet();
  const a=own(game).find(s=>s.type===typeA);
  const b=game.state.squads.find(s=>s.owner==='red'&&s.type===typeB)||game.state.squads.find(s=>s.owner==='red');
  b.type=typeB;b.hp=b.maxHp=UNIT_TYPES[typeB].hp;b.men=UNIT_TYPES[typeB].men;
  for(const [s,p] of [[a,pA],[b,pB]]){s.x=p.x;s.z=p.z;s.anchor={...p};s.order={type:'hold',...p};s.path=[];s.stance='defensive';s.attackClock=0;}
  game.state.squads=[a,b];
  for(const r of Object.values(game.state.regions))r.fortHp=0;
  return {game,a,b};
}

test('fresh campaign has three owned regions, seven armies, workers and an initial ram',()=>{
  const game=createGame();
  assert.equal(Object.values(game.state.regions).filter(r=>r.owner==='player').length,3);
  assert.equal(own(game).length,7);
  assert.equal(own(game).filter(s=>s.type==='ram').length,1);
  assert.equal(game.state.workforce,39);
  assert.equal(game.state.assignedWorkers+game.state.busyWorkers+game.state.availableWorkers,game.state.workforce);
  assert.ok(game.state.armyUsed<game.state.armyCapacity);
  assert.ok(game.state.income>game.state.upkeep);
});

test('old Moutoullas save keys are never read or changed',()=>{
  const storage=new MemoryStorage({'moutoullas-mouchtaris-v1':'old-game','moutoullas-welcomed-v1':'1'});
  const game=createGame({storage});game.command('train',{type:'spear',regionId:'home'});game.save();
  assert.deepEqual(storage.reads,[SAVE_KEY]);
  assert.ok(storage.writes.every(k=>k===SAVE_KEY));
  assert.equal(storage.data['moutoullas-mouchtaris-v1'],'old-game');
});

test('worker transfers conserve workforce and reject hostile mines or over-allocation',()=>{
  const game=quiet(),before=game.state.availableWorkers;
  assert.equal(game.command('assignWorkers',{nodeId:'oak-west',delta:3}).ok,true);
  assert.equal(game.state.availableWorkers,before-3);
  assert.equal(game.command('assignWorkers',{nodeId:'oak-west',delta:-3}).ok,true);
  assert.equal(game.state.availableWorkers,before);
  assert.equal(game.command('assignWorkers',{nodeId:'pine-north',delta:1}).ok,false);
  assert.equal(game.command('assignWorkers',{nodeId:'oak-west',delta:12}).ok,false);
  assert.equal(game.command('assignWorkers',{nodeId:'oak-west',delta:1.5}).ok,false);
});

test('gathering depletes the selected source, produces actual supplies and frees exhausted workers',()=>{
  const game=quiet(),node=game.state.nodes.find(n=>n.id==='oak-west');
  node.amount=.3;const wood=game.state.resources.wood;
  advance(game,1);
  assert.equal(node.amount,0);assert.equal(node.workers,0);
  assert.ok(game.state.resources.wood>wood);
  assert.ok(game.state.stats.gathered>0);
});

test('training spends the displayed cost once, reserves capacity and spawns only after completion',()=>{
  const game=quiet(),before={...game.state.resources},count=own(game).length,used=game.state.armyUsed;
  const quote=game.canCommand('train',{type:'sword',regionId:'home'});
  assert.equal(quote.ok,true);assert.equal(quote.duration,30);
  assert.equal(game.command('train',{type:'sword',regionId:'home'}).ok,true);
  for(const [key,value] of Object.entries(quote.cost))close(game.state.resources[key],before[key]-value);
  assert.equal(game.state.armyUsed,used+6);assert.equal(own(game).length,count);
  advance(game,29);assert.equal(own(game).length,count);
  advance(game,1.2);assert.equal(own(game).length,count+1);assert.equal(game.state.stats.trained,1);
});

test('same facility has a real training queue while other facilities can operate',()=>{
  const game=rich(quiet());
  for(const type of ['spear','sword','archer'])assert.equal(game.command('train',{type,regionId:'home'}).ok,true);
  advance(game,23);
  assert.equal(game.state.stats.trained,1);
  const sword=game.state.jobs.find(j=>j.type==='sword');
  assert.ok(sword.remaining>28);
  advance(game,3);assert.equal(game.state.stats.trained,2);
  advance(game,28);assert.equal(game.state.stats.trained,3);
});

test('missing requirements and army capacity reject training without charging',()=>{
  const game=rich(quiet());
  let before=game.state.resources.money;
  assert.equal(game.command('train',{type:'trebuchet',regionId:'home'}).ok,false);
  assert.equal(game.command('train',{type:'cavalry',regionId:'quarry'}).ok,false);
  close(game.state.resources.money,before);
  // A population ceiling is measured by reserved men, including waiting recruits.
  while(game.canCommand('train',{type:'spear',regionId:'home'}).ok)game.command('train',{type:'spear',regionId:'home'});
  assert.ok(game.state.jobs.length<=4);
  before=game.state.resources.money;
  assert.equal(game.command('train',{type:'spear',regionId:'home'}).ok,false);
  close(game.state.resources.money,before);
});

test('build preview gives effective level cost even when supplies are insufficient',()=>{
  const game=quiet();game.state.resources.money=0;
  const quote=game.canCommand('build',{type:'houses',regionId:'home'});
  assert.equal(quote.ok,false);assert.equal(quote.cost.money,76);assert.equal(quote.duration,49);
  assert.ok(quote.message.length>15);
});

test('construction reserves four civilians and physically changes building level/housing',()=>{
  const game=quiet(),before=game.state.availableWorkers,housing=game.state.housing;
  assert.equal(game.command('build',plot(game,'houses','quarry')).ok,true);
  assert.equal(game.state.availableWorkers,before-4);
  assert.equal(game.state.regions.quarry.buildings.houses||0,0);
  advance(game,36);
  assert.equal(game.state.regions.quarry.buildings.houses,1);
  assert.equal(game.state.housing,housing+12);
  assert.equal(game.state.stats.built,1);
  assert.equal(game.state.busyWorkers,0);
});

test('research has a real timer and unlocks the trebuchet',()=>{
  const game=rich(quiet());
  assert.equal(game.command('research',{type:'engineering'}).ok,true);
  assert.equal(game.command('research',{type:'steel'}).ok,false);
  advance(game,144);assert.equal(game.state.techs.engineering,0);
  advance(game,2);assert.equal(game.state.techs.engineering,1);
  assert.equal(game.canCommand('train',{type:'trebuchet',regionId:'home'}).ok,true);
  assert.equal(game.command('research',{type:'engineering'}).ok,false);
});

test('wall repair is gradual, consumes labor and stops at maximum HP',()=>{
  const game=quiet(),r=game.state.regions.home;r.fortHp=400;
  assert.equal(game.command('repair',{regionId:'home'}).ok,true);
  assert.equal(r.fortHp,400);
  advance(game,10);assert.ok(r.fortHp>400&&r.fortHp<r.maxFortHp);
  advance(game,70);close(r.fortHp,r.maxFortHp,1e-5);assert.equal(game.state.busyWorkers,0);
  assert.equal(game.command('repair',{regionId:'home'}).ok,false);
});

test('buy and sell preserve prices, reject insufficient stock and cannot create free money',()=>{
  const game=quiet(),before={...game.state.resources};
  assert.equal(game.command('trade',{resource:'wood',type:'buy',amount:20}).ok,true);
  assert.equal(game.command('trade',{resource:'wood',type:'sell',amount:20}).ok,true);
  close(game.state.resources.wood,before.wood);assert.ok(game.state.resources.money<before.money);
  assert.equal(game.command('trade',{resource:'iron',type:'sell',amount:1000}).ok,false);
  assert.equal(game.command('trade',{resource:'money',type:'buy',amount:20}).ok,false);
  assert.equal(game.command('trade',{resource:'food',type:'buy',amount:-20}).ok,false);
});

test('invalid commands and inherited property names never corrupt resources or throw',()=>{
  const game=quiet(),id=own(game)[0].id,before={...game.state.resources};
  const malformed=[['build',{type:'__proto__',regionId:'home'}],['build',{type:'houses',regionId:'constructor'}],['research',{type:'toString'}],['trade',{resource:'__proto__',type:'buy',amount:1}],['order',{ids:[id],type:'attack',targetId:'__proto__'}],['order',{ids:[id],type:'move',x:NaN,z:0}],['order',{ids:['no-unit'],type:'hold'}],['assignWorkers',{nodeId:'oak-west',delta:Infinity}]];
  for(const [action,payload] of malformed){assert.equal(game.canCommand(action,payload).ok,false);assert.equal(game.command(action,payload).ok,false);}
  assert.deepEqual(game.state.resources,before);
});

test('a crossed river order follows a bridge and arrives without entering water',()=>{
  const game=quiet(),s=solo(game,'cavalry',{x:-60,z:80});
  const target={x:72,z:105};
  assert.equal(game.command('order',{ids:[s.id],type:'move',...target}).ok,true);
  let crossed=false;
  for(let i=0;i<130;i++) {
    game.step(.25);assert.ok(game.getNavigation().isWalkable(s));
    if(Math.abs(s.x-riverX(s.z))<11){assert.ok(game.getNavigation().onBridge(s));crossed=true;}
  }
  assert.equal(crossed,true);assert.ok(Math.hypot(s.x-target.x,s.z-target.z)<5);
});

test('all fortress approaches have dry continuous routes through the available bridges',()=>{
  const game=quiet(),nav=game.getNavigation();
  const approaches=REGIONS.map(r=>({x:r.x,z:r.z+(r.kind==='castle'?27:r.kind==='town'?20:17)}));
  let checked=0,crossings=0;
  for(const a of approaches)for(const b of approaches) {
    const route=nav.findPath(a,b);assert.ok(route,`No route ${JSON.stringify(a)}→${JSON.stringify(b)}`);
    let last=a;
    for(const next of route) {
      const steps=Math.max(1,Math.ceil(Math.hypot(next.x-last.x,next.z-last.z)/.75));
      for(let i=0;i<=steps;i++) {const p={x:last.x+(next.x-last.x)*i/steps,z:last.z+(next.z-last.z)*i/steps};assert.ok(nav.isWalkable(p),`Blocked point ${JSON.stringify(p)}`);if(Math.abs(p.x-riverX(p.z))<11){assert.ok(BRIDGES.some(b=>Math.abs(p.z-b.z)<b.width/2));crossings++;}}
      last=next;
    }
    checked++;
  }
  assert.equal(checked,81);assert.ok(crossings>0);
});

test('mixed armies cross the narrow deck without pushing a siege chassis over its edge',()=>{
  const game=quiet();game.state.squads=own(game);
  const ids=own(game).map(s=>s.id),ram=own(game).find(s=>s.type==='ram');
  assert.equal(game.command('order',{ids,type:'move',x:70,z:50}).ok,true);
  let ramCrossed=false;
  for(let i=0;i<360;i++) {
    game.step(.5);
    if(Math.abs(ram.x-riverX(ram.z))<11) {
      ramCrossed=true;assert.ok(BRIDGES.some(b=>Math.abs(ram.z-b.z)<=1.151));
    }
  }
  assert.equal(ramCrossed,true);
  for(const s of own(game))assert.ok(Math.hypot(s.x-70,s.z-50)<25,`${s.type} did not cross`);
});

test('tactical commands reject river destinations and foreign selections transactionally',()=>{
  const game=quiet(),friend=own(game)[0],enemy=game.state.squads.find(s=>s.owner==='red');
  const before=JSON.stringify(friend.order);
  assert.equal(game.command('order',{ids:[friend.id],type:'move',x:riverX(0),z:0}).ok,false);
  assert.equal(game.command('order',{ids:[friend.id,enemy.id],type:'move',x:-100,z:70}).ok,false);
  assert.equal(JSON.stringify(friend.order),before);
});

test('melee attacks require marching into contact; issuing attack does not damage remotely',()=>{
  const {game,a,b}=duel('spear','spear');
  const hp=b.hp;assert.equal(game.command('order',{ids:[a.id],type:'attack',targetId:b.id}).ok,true);
  assert.equal(b.hp,hp);advance(game,.5);assert.equal(b.hp,hp);assert.ok(a.x>-130);
  advance(game,6);assert.ok(b.hp<hp);
});

test('arrows have travel time and then damage the visible target',()=>{
  const {game,a,b}=duel('archer','spear');
  const hp=b.hp;game.step(.05);
  assert.ok(game.state.effects.some(e=>e.type==='arrow'&&e.targetId===b.id));
  assert.equal(b.hp,hp);advance(game,.8);assert.ok(b.hp<hp);
});

test('formation and stance commands change movement and engagement behavior',()=>{
  const a=quiet(),b=quiet(),sa=solo(a,'spear'),sb=solo(b,'spear');
  b.command('formation',{ids:[sb.id],formation:'column'});
  for(const [game,s] of [[a,sa],[b,sb]])assert.equal(game.command('order',{ids:[s.id],type:'move',x:-65,z:75}).ok,true);
  advance(a,5);advance(b,5);assert.ok(sb.x>sa.x+2);
  assert.equal(a.command('stance',{ids:[sa.id],stance:'aggressive'}).ok,true);
  assert.equal(sa.stance,'aggressive');
  assert.equal(a.command('formation',{ids:[sa.id],formation:'bad'}).ok,false);
});

test('first siege marches every starting squad around castle walls, breaches, then captures',()=>{
  const game=quiet(),army=own(game),starts=Object.fromEntries(army.map(s=>[s.id,{x:s.x,z:s.z}]));
  const initialHp=game.state.regions.firwood.fortHp;
  assert.equal(game.command('order',{ids:army.map(s=>s.id),type:'capture',regionId:'firwood'}).ok,true);
  advance(game,2);assert.equal(game.state.regions.firwood.fortHp,initialHp);assert.equal(game.state.regions.firwood.owner,'neutral');
  advance(game,68);
  assert.equal(game.state.regions.firwood.owner,'player');assert.equal(game.state.regions.firwood.fortHp,0);
  assert.equal(game.state.stats.captured,1);assert.ok(game.state.stats.breached>=1);
  for(const s of own(game))assert.ok(Math.hypot(s.x-starts[s.id].x,s.z-starts[s.id].z)>40,`${s.type} was stranded`);
  assert.ok(game.state.log.some(e=>e.type==='capture'));
});

test('siege crews alone cannot capture; distant non-frontier provinces reject annexation',()=>{
  const game=quiet(),ram=own(game).find(s=>s.type==='ram'),army=own(game).map(s=>s.id);
  assert.equal(game.command('order',{ids:[ram.id],type:'capture',regionId:'firwood'}).ok,false);
  assert.equal(game.command('order',{ids:army,type:'capture',regionId:'ironhold'}).ok,false);
  game.state.squads=[ram];game.state.regions.firwood.fortHp=0;
  assert.equal(game.command('order',{ids:[ram.id],type:'attack',regionId:'firwood'}).ok,true);
  advance(game,90);assert.equal(game.state.regions.firwood.owner,'neutral');
});

test('a nearby hostile garrison contests capture until it is defeated or driven away',()=>{
  const game=quiet(),s=own(game).find(s=>s.type==='spear'),r=game.state.regions.firwood;
  const guard=game.state.squads.find(s=>s.owner==='neutral'&&s.homeRegion==='firwood');
  s.x=-167;s.z=-104;s.anchor={x:s.x,z:s.z};s.order={type:'capture',targetId:'firwood',regionId:'firwood'};s.path=[];
  guard.x=-154;guard.z=-104;guard.anchor={x:guard.x,z:guard.z};guard.order={type:'hold',...guard.anchor};guard.path=[];
  game.state.squads=[s,guard];r.fortHp=0;
  advance(game,2);assert.equal(r.capture,0);assert.equal(r.owner,'neutral');
});

test('castle defenders fire actual arrows at a nearby hostile assault',()=>{
  const game=quiet(),red=game.state.squads.find(s=>s.owner==='red');
  game.state.squads=[red];red.x=-122;red.z=0;red.anchor={x:red.x,z:red.z};red.path=[];red.order={type:'hold',...red.anchor};
  const hp=red.hp;advance(game,1.7);assert.ok(game.state.effects.some(e=>e.sourceId==='home'&&e.type==='arrow'));
  advance(game,1);assert.ok(red.hp<hp);
});

test('scouts warn before an AI army begins a real march; no remote fortress damage',()=>{
  const game=quiet(),f=game.state.ai.factions.red;
  f.nextRaid=55;
  const forts=Object.fromEntries(REGIONS.map(r=>[r.id,game.state.regions[r.id].fortHp]));
  advance(game,12);assert.ok(game.state.log.some(e=>e.type==='warning'&&e.title.includes('Σιδηρού')||e.type==='warning'&&e.title.includes('Σιδηρός')));
  assert.equal(game.state.squads.filter(s=>s.owner==='red'&&s.order.type==='attack').length,0);
  advance(game,44);
  const march=game.state.squads.filter(s=>s.owner==='red'&&s.order.type==='attack');
  assert.ok(march.length>=1);assert.ok(march.some(s=>s.path.length>0));
  const target=march[0].order.regionId;assert.equal(game.state.regions[target].fortHp,forts[target]);
});

test('an AI assault can cross the river, breach weakened walls and capture an undefended province',()=>{
  const game=quiet();game.state.ai.factions.gold.nextRaid=55;game.state.regions.quarry.fortHp=100;
  advance(game,220);
  assert.equal(game.state.regions.quarry.owner,'gold');
  assert.equal(game.state.regions.quarry.fortHp,0);
  assert.ok(game.state.squads.some(s=>s.owner==='gold'&&s.x<0&&Math.abs(s.z-131)<30));
  assert.ok(game.state.nodes.filter(n=>n.regionId==='quarry').every(n=>n.workers===0));
  assert.ok(game.state.log.some(e=>e.type==='warning'&&e.title.includes('Χάθηκε περιοχή')));
});

test('paid truce halts a faction raid and a player attack cancels the treaty',()=>{
  const game=quiet();game.state.ai.factions.red.nextRaid=10;
  assert.equal(game.command('truce',{faction:'red'}).ok,true);
  advance(game,30);assert.ok(game.state.ai.truce.red>game.state.t);
  assert.equal(game.state.squads.filter(s=>s.owner==='red'&&s.order.type==='attack').length,0);
  const target=game.state.squads.find(s=>s.owner==='red');
  assert.equal(game.command('order',{ids:[own(game)[0].id],type:'attack',targetId:target.id}).ok,true);
  assert.equal(game.state.ai.truce.red,0);
});

test('pause freezes battle and production while allowing orders; 4× advances four simulation seconds',()=>{
  const game=quiet();game.setPaused(true);const t=game.state.t,food=game.state.resources.food;
  advance(game,5);close(game.state.t,t);close(game.state.resources.food,food);
  assert.equal(game.command('train',{type:'spear',regionId:'home'}).ok,true);
  assert.equal(game.state.jobs[0].remaining,22);
  game.setPaused(false);game.setSpeed(4);game.step(1);close(game.state.t,4);
  assert.equal(game.setSpeed(200).ok,false);
});

test('a resumed background tab cannot fast-forward hours of unobserved war',()=>{
  const game=quiet();game.step(3600);assert.ok(game.state.t<=1.01);
  const storage=new MemoryStorage();game.save();storage.data[SAVE_KEY]=game.exportSave();
  const resumed=createGame({storage,now:()=>Date.now()+86400000});
  close(resumed.state.t,game.state.t);assert.deepEqual(resumed.state.resources,game.state.resources);
});

test('save round trip preserves troops, orders, jobs, resources and separate campaign progress',()=>{
  const game=quiet(),s=own(game)[0];
  assert.equal(game.command('build',plot(game,'houses','quarry')).ok,true);game.command('order',{ids:[s.id],type:'move',x:-97,z:72});advance(game,3);
  const encoded=game.exportSave(),restored=createGame();
  assert.equal(restored.importSave(encoded).ok,true);
  assert.deepEqual(restored.state.resources,game.state.resources);
  assert.deepEqual(restored.state.squads,game.state.squads);
  assert.deepEqual(restored.state.jobs,game.state.jobs);
  close(restored.state.t,game.state.t);
});

test('invalid import is transactional, rejects a different game and nonfinite or wet troop positions',()=>{
  const game=quiet(),before=game.exportSave();
  const invalids=['{broken',JSON.stringify({game:'moutoullas',version:1,state:{}})];
  for(const mutator of [s=>s.resources.money=-1,s=>s.squads[0].x=Infinity,s=>{s.squads[0].x=riverX(0);s.squads[0].z=0;},s=>s.nodes[0].workers=100,s=>s.jobs.push({type:'__proto__'})]) {
    const copy=JSON.parse(before);mutator(copy.state);invalids.push(JSON.stringify(copy));
  }
  for(const invalid of invalids){assert.equal(game.importSave(invalid).ok,false);assert.deepEqual(JSON.parse(game.exportSave()).state,JSON.parse(before).state);}
});

test('corrupt local save retains a recovery copy while a fresh campaign remains playable',()=>{
  const storage=new MemoryStorage({[SAVE_KEY]:'broken saved data'}),game=createGame({storage});
  assert.equal(storage.data[`${SAVE_KEY}-recovery`],'broken saved data');
  assert.equal(own(game).length,7);game.save();assert.equal(storage.data[`${SAVE_KEY}-recovery`],'broken saved data');
});

test('victory depends on ownership plus civilian prosperity; defeat requires losing all regions',()=>{
  const game=quiet();for(const r of Object.values(game.state.regions))r.owner='player';
  game.state.squads=own(game);game.state.prosperity=40;advance(game,2);assert.equal(game.state.outcome,null);
  game.state.prosperity=70;advance(game,2);assert.equal(game.state.outcome,'victory');assert.equal(game.state.paused,true);
  const lost=quiet();for(const r of Object.values(lost.state.regions))r.owner='red';advance(lost,2);
  assert.equal(lost.state.outcome,'defeat');assert.equal(lost.command('train',{type:'spear',regionId:'home'}).ok,false);
  assert.equal(lost.reset().ok,true);assert.equal(lost.state.outcome,null);assert.equal(own(lost).length,7);
});


// Independent geometric reference: distances between the swept centre line and
// the displayed solid's edges. This does not use the engine's intersection test.
const trajectoryEvidence={segments:0,solidChecks:0,intersections:0,types:new Set(),routes:0};
function pointSegmentDistance(p,a,b) {
  const dx=b.x-a.x,dz=b.z-a.z,length=dx*dx+dz*dz;
  const t=length?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/length)):0;
  return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);
}
function segmentDistance(a,b,c,d) {
  const cross=(p,q,r)=>(q.x-p.x)*(r.z-p.z)-(q.z-p.z)*(r.x-p.x);
  if(cross(a,b,c)*cross(a,b,d)<0&&cross(c,d,a)*cross(c,d,b)<0)return 0;
  return Math.min(pointSegmentDistance(a,c,d),pointSegmentDistance(b,c,d),pointSegmentDistance(c,a,b),pointSegmentDistance(d,a,b));
}
function sweptIntersects(a,b,solid,radius) {
  if(Math.max(a.x,b.x)+radius<solid.minX||Math.min(a.x,b.x)-radius>solid.maxX||Math.max(a.z,b.z)+radius<solid.minZ||Math.min(a.z,b.z)-radius>solid.maxZ)return false;
  if(solid.radius!==undefined)return pointSegmentDistance(solid,a,b)<solid.radius+radius-1e-6;
  const cosine=Math.cos(solid.rotation||0),sine=Math.sin(solid.rotation||0);
  const corners=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,z])=>({x:solid.x+x*solid.width/2*cosine+z*solid.depth/2*sine,z:solid.z-x*solid.width/2*sine+z*solid.depth/2*cosine}));
  const inside=p=>{
    const signs=corners.map((c,i)=>{const d=corners[(i+1)%4];return(d.x-c.x)*(p.z-c.z)-(d.z-c.z)*(p.x-c.x);});
    return signs.every(v=>v>1e-7)||signs.every(v=>v< -1e-7);
  };
  return inside(a)||inside(b)||corners.some((corner,i)=>segmentDistance(a,b,corner,corners[(i+1)%4])<radius-1e-6);
}
function traceStep(game,squad,seconds=.1) {
  const before={x:squad.x,z:squad.z};game.step(seconds);
  assert.ok(squad.hp>0,'The test unit must remain alive');
  const nav=game.getNavigation();assert.ok(nav.isWalkable(squad,squad),'Physical unit centre must remain on a legal point');
  for(const solid of nav.getObstacles()) {
    trajectoryEvidence.solidChecks++;
    const hit=sweptIntersects(before,squad,solid,UNIT_CLEARANCE[squad.type]);
    if(hit)trajectoryEvidence.intersections++;
    assert.equal(hit,false,squad.type+' swept through '+solid.source+' '+solid.id+' '+solid.part+' from '+JSON.stringify(before)+' to '+JSON.stringify({x:squad.x,z:squad.z}));
  }
  trajectoryEvidence.segments++;trajectoryEvidence.types.add(squad.type);
}
function traceTo(game,squad,destination,maxSeconds=150) {
  for(let elapsed=0;elapsed<maxSeconds&&Math.hypot(squad.x-destination.x,squad.z-destination.z)>1;elapsed+=.1)traceStep(game,squad);
  assert.ok(Math.hypot(squad.x-destination.x,squad.z-destination.z)<2,squad.type+' did not reach '+JSON.stringify(destination));
  trajectoryEvidence.routes++;
}

test('every initial building is a saved plot and every initial squad has physical clearance',()=>{
  const game=quiet(),nav=game.getNavigation();
  assert.ok(game.state.structures.length>25);
  for(const region of REGIONS)for(const type of Object.keys(BUILDING_FOOTPRINTS)) {
    const sum=game.state.structures.filter(s=>s.type===type&&s.regionId===region.id).reduce((n,s)=>n+s.level,0);
    assert.equal(sum,game.state.regions[region.id].buildings[type]||0);
  }
  for(const squad of game.state.squads)assert.ok(nav.isWalkable(squad,squad),'Initial '+squad.type+' overlaps a solid');
  for(const structure of game.state.structures)assert.equal(nav.isWalkable(structure),structure.type==='farm');
});

test('placement previews and an abandoned ghost never charge or create a building',()=>{
  const game=quiet(),before=JSON.stringify(game.state),quote=game.canCommand('build',{type:'houses',regionId:'home'});
  assert.equal(quote.ok,true);assert.equal(quote.requiresPlacement,true);assert.ok(quote.cost.money>0);
  const p=plot(game,'houses','home',Math.PI/2);
  for(let i=0;i<4;i++) {
    const preview=game.canCommand('build',{...p,rotation:p.rotation+i*Math.PI/2});
    assert.equal(typeof preview.ok,'boolean');assert.ok(preview.placement);assert.equal(preview.placement.x,p.x);
  }
  assert.equal(game.command('build',{type:'houses',regionId:'home'}).ok,false);
  assert.equal(JSON.stringify(game.state),before);
});

test('a confirmed rotated plot charges once and completes at the identical saved position',()=>{
  const game=quiet(),p=plot(game,'houses','home',Math.PI/4),before={...game.state.resources};
  const quote=game.canCommand('build',p);assert.equal(quote.ok,true);assert.equal(quote.requiresPlacement,false);
  const result=game.command('build',p);assert.equal(result.ok,true);
  const structure=game.state.structures.find(s=>s.id===result.structureId),job=game.state.jobs.find(j=>j.id===result.jobId);
  assert.ok(structure&&job);assert.equal(structure.status,'building');assert.equal(structure.level,0);
  assert.equal(structure.x,p.x);assert.equal(structure.z,p.z);close(structure.rotation,p.rotation);
  assert.equal(job.structureId,structure.id);assert.equal(job.x,p.x);assert.equal(job.z,p.z);
  for(const [key,cost]of Object.entries(quote.cost))close(game.state.resources[key],before[key]-cost);
  const after={...game.state.resources};assert.equal(game.command('build',p).ok,false);assert.deepEqual(game.state.resources,after);
  assert.equal(game.getNavigation().isWalkable(structure),false);
  advance(game,quote.duration+.2);
  assert.equal(structure.status,'ready');assert.equal(structure.level,1);assert.equal(structure.jobId,null);
  assert.equal(structure.x,p.x);assert.equal(structure.z,p.z);close(structure.rotation,p.rotation);
  assert.equal(game.state.regions.home.buildings.houses,3);
});

test('existing-building upgrades keep their plot and reject an attempted relocation',()=>{
  const game=quiet(),structure=game.state.structures.find(s=>s.regionId==='home'&&s.type==='houses');
  const location={x:structure.x,z:structure.z,rotation:structure.rotation},count=game.state.structures.length;
  const payload={type:structure.type,regionId:structure.regionId,structureId:structure.id},quote=game.canCommand('build',payload);
  assert.equal(quote.ok,true);assert.equal(quote.requiresPlacement,false);assert.equal(quote.targetLevel,2);
  const before={...game.state.resources};assert.equal(game.command('build',{...payload,x:structure.x+1}).ok,false);assert.deepEqual(game.state.resources,before);
  assert.equal(game.command('build',payload).ok,true);assert.equal(structure.status,'upgrading');
  advance(game,quote.duration+.1);
  assert.equal(structure.level,2);assert.equal(structure.status,'ready');assert.equal(game.state.structures.length,count);
  assert.deepEqual({x:structure.x,z:structure.z,rotation:structure.rotation},location);assert.equal(game.state.regions.home.buildings.houses,3);
});

test('placement rejects water, bridges, forts, resources, roads, steep slopes and foreign land without spending',()=>{
  const game=rich(quiet());game.state.squads=[];
  const home=REGIONS.find(r=>r.id==='home'),node=RESOURCE_NODES.find(n=>n.regionId==='home'),bridge=BRIDGES[0];
  const invalid=[
    {type:'houses',regionId:'home',x:NaN,z:0},
    {type:'houses',regionId:'home',x:-241,z:0},
    {type:'houses',regionId:'home',x:home.x,z:home.z},
    {type:'houses',regionId:'home',x:node.x,z:node.z},
    {type:'houses',regionId:'home',x:-160,z:-54},
    {type:'houses',regionId:'home',x:-166,z:-36},
    {type:'houses',regionId:'quarry',x:riverX(140),z:140},
    {type:'houses',regionId:'quarry',x:bridge.x,z:bridge.z},
    {type:'houses',regionId:'ironhold',x:166,z:-90},
    {type:'houses',regionId:'home',x:-80,z:0}
  ];
  const before={...game.state.resources},count=game.state.structures.length;
  for(const p of invalid){assert.equal(game.canCommand('build',p).ok,false,JSON.stringify(p));assert.equal(game.command('build',p).ok,false);}
  assert.deepEqual(game.state.resources,before);assert.equal(game.state.structures.length,count);assert.equal(game.state.jobs.length,0);
  assert.match(game.canCommand('build',invalid[4]).message,/δρόμο/);
  assert.match(game.canCommand('build',invalid[5]).message,/πλαγιά|κλίση/);
  assert.equal(game.findBuildLocation('houses','ironhold'),null);
});

test('a unit and a rotated existing plot both prevent overlapping construction',()=>{
  const game=quiet(),p=plot(game,'houses','home',Math.PI/4),s=solo(game,'ram',p);
  const resources={...game.state.resources};assert.equal(game.command('build',p).ok,false);assert.deepEqual(game.state.resources,resources);
  s.x=-225;s.z=40;s.anchor={x:s.x,z:s.z};
  assert.equal(game.command('build',p).ok,true);
  const quote=game.canCommand('build',{...p,type:'well',x:p.x+2,z:p.z+2,rotation:Math.PI/2});
  assert.equal(quote.ok,false);assert.match(quote.message,/επικαλύπτει/);
});

test('farmland reserves a building plot while remaining passable to soldiers',()=>{
  const game=quiet(),p=plot(game,'farm','home',Math.PI/4);
  assert.equal(game.command('build',p).ok,true);
  const structure=game.state.structures.find(s=>s.id===game.state.jobs[0].structureId);
  assert.equal(game.getNavigation().isWalkable(structure),true);
  assert.equal(game.canCommand('build',{...p,type:'houses'}).ok,false);
});

test('a legacy campaign gains plots without losing elapsed time, money, building levels or unfinished work',()=>{
  const original=quiet(),p=plot(original,'houses','quarry');
  assert.equal(original.command('build',p).ok,true);advance(original,7);
  const legacy=JSON.parse(original.exportSave());delete legacy.state.structures;
  for(const job of legacy.state.jobs)for(const key of ['structureId','x','z','rotation','targetLevel'])delete job[key];
  const resources={...legacy.state.resources},remaining=legacy.state.jobs[0].remaining,t=legacy.state.t;
  const levels=REGIONS.map(r=>({...legacy.state.regions[r.id].buildings}));
  const storage=new MemoryStorage({[SAVE_KEY]:JSON.stringify(legacy)}),restored=createGame({storage});
  assert.equal(restored.loaded,true);assert.equal(restored.storageError,null);close(restored.state.t,t);
  assert.deepEqual(restored.state.resources,resources);assert.deepEqual(REGIONS.map(r=>r&&restored.state.regions[r.id].buildings),levels);
  assert.equal(restored.state.jobs[0].remaining,remaining);
  const job=restored.state.jobs[0],structure=restored.state.structures.find(s=>s.id===job.structureId);
  assert.equal(structure.status,'building');assert.equal(structure.jobId,job.id);assert.equal(structure.x,job.x);
  advance(restored,remaining+.1);assert.equal(structure.status,'ready');assert.equal(restored.state.regions.quarry.buildings.houses,1);
});

test('an unfinished construction site survives save/reload with its exact plot and physical obstacle',()=>{
  const game=quiet(),p=plot(game,'granary','home',Math.PI/3);
  const result=game.command('build',p);assert.equal(result.ok,true);advance(game,4);
  const restored=createGame({storage:new MemoryStorage({[SAVE_KEY]:game.exportSave()})});assert.equal(restored.loaded,true);
  const a=game.state.structures.find(s=>s.id===result.structureId),b=restored.state.structures.find(s=>s.id===result.structureId);
  assert.deepEqual(b,a);assert.deepEqual(restored.state.jobs,game.state.jobs);assert.equal(restored.getNavigation().isWalkable(b),false);
});

test('malformed, overlapping or unlinked saved plots are rejected transactionally',()=>{
  const game=quiet();assert.equal(game.command('build',plot(game,'houses','quarry')).ok,true);
  const saved=game.exportSave(),before=JSON.parse(saved).state;
  const mutators=[
    s=>s.structures=null,
    s=>s.structures[0].x=Infinity,
    s=>s.structures[0].level=99,
    s=>s.structures[0].id=s.structures[1].id,
    s=>{s.structures[0].x=s.structures[1].x;s.structures[0].z=s.structures[1].z;},
    s=>s.jobs[0].structureId='missing-plot',
    s=>s.structures.find(p=>p.status==='building').jobId='missing-job',
    s=>s.regions.home.buildings.houses++
  ];
  for(const mutate of mutators){const value=JSON.parse(saved);mutate(value.state);assert.equal(game.importSave(JSON.stringify(value)).ok,false);assert.deepEqual(JSON.parse(game.exportSave()).state,before);}
});

test('all six unit types physically route around several starter buildings and two new construction sites',()=>{
  for(const type of Object.keys(UNIT_TYPES)) {
    const game=rich(quiet()),s=solo(game,type==='trebuchet'?'ram':type,{x:-225,z:40});
    s.type=type;s.hp=s.maxHp=UNIT_TYPES[type].hp;s.men=UNIT_TYPES[type].men;
    assert.equal(game.command('build',plot(game,'houses','home',Math.PI/4)).ok,true);
    assert.equal(game.command('build',plot(game,'granary','home',Math.PI/8)).ok,true);
    const obstacles=game.state.structures.filter(p=>p.regionId==='home'&&(['houses','barracks','stable'].includes(p.type)||p.status==='building')).sort((a,b)=>(a.status==='building'?0:1)-(b.status==='building'?0:1));
    for(const obstacle of obstacles) {
      const nav=game.getNavigation();let chosen=null;
      for(let i=0;i<24;i++) {
        const angle=i*Math.PI/12,radius=23+UNIT_CLEARANCE[type],a={x:obstacle.x+Math.cos(angle)*radius,z:obstacle.z+Math.sin(angle)*radius},b={x:obstacle.x-Math.cos(angle)*radius,z:obstacle.z-Math.sin(angle)*radius};
        if(nav.isWalkable(a,s)&&nav.isWalkable(b,s)&&nav.findPath(a,b,s)){chosen={a,b};break;}
      }
      assert.ok(chosen,'No test approach to '+obstacle.id+' for '+type);
      s.x=chosen.a.x;s.z=chosen.a.z;s.anchor={...chosen.a};s.order={type:'hold',...chosen.a};s.path=[];
      assert.equal(nav.clearSegment(chosen.a,chosen.b,s),false,'The direct route must be obstructed');
      assert.equal(game.command('order',{ids:[s.id],type:'move',...chosen.b}).ok,true);
      assert.ok(s.path.length>1,'A real detour must be produced');
      traceTo(game,s,chosen.b);
    }
  }
});

test('placing a construction site across an active route reroutes the marching unit immediately',()=>{
  const game=quiet(),p=plot(game,'houses','home',Math.PI/4),s=solo(game,'cavalry',{x:-202,z:p.z}),target={x:-155,z:p.z};
  assert.equal(game.command('order',{ids:[s.id],type:'move',...target}).ok,true);traceStep(game,s,.5);
  assert.equal(game.command('build',p).ok,true);assert.equal(s.path.length,0,'The obsolete route must be invalidated when the site is confirmed');
  traceTo(game,s,target);assert.equal(game.state.structures.find(a=>a.status==='building')?.type,'houses');
});

test('when a moving unit target becomes a construction site it selects a reachable free destination',()=>{
  const game=quiet(),p=plot(game,'houses','home',Math.PI/4),s=solo(game,'spear',{x:-202,z:p.z});
  assert.equal(game.command('order',{ids:[s.id],type:'move',x:p.x,z:p.z}).ok,true);traceStep(game,s,.5);
  assert.equal(game.command('build',p).ok,true);
  const target={x:s.order.x,z:s.order.z};assert.ok(Math.hypot(target.x-p.x,target.z-p.z)>4);
  assert.ok(game.getNavigation().isWalkable(target,s));traceTo(game,s,target);
});

test('even an obsolete injected shortcut cannot tunnel through a rotated building corner',()=>{
  const game=quiet(),p=plot(game,'houses','home',Math.PI/4),s=solo(game,'cavalry',{x:-202,z:p.z});
  assert.equal(game.command('build',p).ok,true);
  const target={x:-155,z:p.z};
  assert.equal(game.getNavigation().clearSegment(s,target,s),false);
  s.order={type:'move',...target};s.path=[{...target}];s.repathAt=1e8;
  traceTo(game,s,target);
});

test('destroying walls never removes the physical keep, interior buildings or corner towers',()=>{
  const game=quiet(),nav=game.getNavigation();
  for(const r of REGIONS)game.state.regions[r.id].fortHp=0;
  for(const r of REGIONS) {
    for(const point of FORT_POLYGONS[r.id])assert.equal(nav.isWalkable(point),false,'A standing tower must remain solid');
    assert.equal(nav.isWalkable({x:r.x,z:r.z-4}),false,'The surviving keep must remain solid');
    if(r.kind==='castle')for(const [x,z]of[[-9,3.1],[8.8,4],[3.5,7.6]])assert.equal(nav.isWalkable({x:r.x+x,z:r.z+z}),false);
  }
});

test('closed gates stop infantry; an opened narrow gate passes infantry and rejects a siege chassis',()=>{
  const game=quiet(),r=REGIONS.find(r=>r.id==='firwood'),control=game.state.regions[r.id];control.owner='player';
  const s=solo(game,'spear',{x:r.x,z:r.z+19}),target={x:r.x,z:r.z+5.5},nav=game.getNavigation();
  assert.equal(nav.findPath(s,target,s),null);
  control.fortHp=control.maxFortHp*.1;
  assert.equal(nav.clearSegment(s,target,s),true);assert.equal(nav.clearSegment(s,target,'ram'),false);
  assert.equal(isWorldSegmentWalkable(game.state,s,target,.46),true);
  assert.equal(game.command('order',{ids:[s.id],type:'move',...target}).ok,true);traceTo(game,s,target);
});

test('wall repair waits for a soldier to leave the gate before restoring a solid portcullis',()=>{
  const game=rich(quiet()),r=REGIONS.find(r=>r.id==='firwood'),control=game.state.regions[r.id];control.owner='player';control.fortHp=control.maxFortHp*.1;
  const s=solo(game,'spear',{x:r.x,z:r.z+9});assert.ok(game.getNavigation().isWalkable(s,s));
  assert.equal(game.command('repair',{regionId:r.id}).ok,true);
  for(let i=0;i<120;i++)traceStep(game,s,.1);
  assert.ok(control.fortHp/control.maxFortHp<=.16+1e-6);assert.equal(game.state.jobs[0].blocked,true);
  const target={x:r.x,z:r.z+23};assert.equal(game.command('order',{ids:[s.id],type:'move',...target}).ok,true);traceTo(game,s,target);
  advance(game,100);close(control.fortHp,control.maxFortHp);assert.equal(game.state.jobs.length,0);
});



test('fully developed legacy provinces preserve every upgrade when gaining persistent plots',()=>{
  const original=quiet();
  for(const r of Object.values(original.state.regions))r.buildings=Object.fromEntries(Object.entries(BUILDINGS).map(([type,def])=>[type,def.max]));
  const envelope=JSON.parse(original.exportSave());delete envelope.state.structures;
  const restored=createGame();assert.equal(restored.importSave(JSON.stringify(envelope)).ok,true);
  for(const region of REGIONS)assert.deepEqual(restored.state.regions[region.id].buildings,envelope.state.regions[region.id].buildings);
  assert.equal(restored.state.structures.length,REGIONS.length*Object.keys(BUILDING_FOOTPRINTS).length);
  const second=createGame();assert.equal(second.importSave(restored.exportSave()).ok,true);assert.deepEqual(second.state.structures,restored.state.structures);
});

test('a legacy unit inside a surviving keep is placed safely when loading without advancing time',()=>{
  const original=quiet(),r=REGIONS.find(r=>r.id==='home'),s=own(original).find(s=>s.type==='ram');
  original.state.regions.home.fortHp=0;s.x=r.x;s.z=r.z-4;s.anchor={x:s.x,z:s.z};s.order={type:'hold',...s.anchor};s.path=[];
  original.state.t=223;
  const envelope=JSON.parse(original.exportSave());delete envelope.state.structures;
  const restored=createGame({storage:new MemoryStorage({[SAVE_KEY]:JSON.stringify(envelope)})});assert.equal(restored.loaded,true);
  const unit=restored.state.squads.find(unit=>unit.id===s.id);assert.ok(restored.getNavigation().isWalkable(unit,unit));
  assert.ok(Math.hypot(unit.x-s.x,unit.z-s.z)>5);assert.equal(restored.state.t,223);assert.deepEqual(restored.state.resources,envelope.state.resources);
  traceStep(restored,unit);
});

test('every troop and siege type crosses both bridge decks with its physical clearance',()=>{
  for(const type of Object.keys(UNIT_TYPES))for(const bridge of BRIDGES) {
    const game=quiet(),s=solo(game,type==='trebuchet'?'ram':type,{x:-65,z:bridge.z}),target={x:72,z:bridge.z};
    s.type=type;s.hp=s.maxHp=UNIT_TYPES[type].hp;s.men=UNIT_TYPES[type].men;
    assert.equal(game.command('order',{ids:[s.id],type:'move',...target}).ok,true);
    let enteredDeck=false;
    for(let elapsed=0;elapsed<110&&Math.hypot(s.x-target.x,s.z-target.z)>1;elapsed+=.1) {
      traceStep(game,s);
      if(Math.abs(s.x-riverX(s.z))<11) {
        enteredDeck=true;assert.ok(Math.abs(s.z-bridge.z)<=3.25-Math.min(UNIT_CLEARANCE[type],2.05)+1e-6);
      }
    }
    assert.equal(enteredDeck,true);assert.ok(Math.hypot(s.x-target.x,s.z-target.z)<2);trajectoryEvidence.routes++;
  }
});



test('attack-move engages an encountered enemy and resumes its original destination',()=>{
  const {game,a,b}=duel('sword','archer',{x:-130,z:75},{x:-113,z:75});
  b.hp=8;b.men=1;b.attackClock=10000;
  const destination={x:-90,z:75};
  assert.equal(game.command('order',{ids:[a.id],type:'attackMove',...destination}).ok,true);
  let engaged=false,attacked=false;
  for(let i=0;i<500;i++){
    const before={x:a.x,z:a.z};game.step(.1);
    assert.ok(isWorldSegmentWalkable(game.state,before,a,a.type));
    if(a.engagedId===b.id)engaged=true;
    if(a.lastAttack>=0)attacked=true;
    if(!game.state.squads.includes(b)&&a.order.type==='hold')break;
  }
  assert.ok(engaged,'The army must actually acquire the encountered opponent');
  assert.ok(attacked,'The real strike must record animation timing');
  assert.equal(game.state.squads.includes(b),false);
  assert.equal(a.order.type,'hold');
  assert.ok(Math.hypot(a.x-destination.x,a.z-destination.z)<3);
});

test('attack-move validates its ground destination and survives save/load',()=>{
  const game=quiet(),a=solo(game,'spear');
  assert.equal(game.command('order',{ids:[a.id],type:'attackMove',x:NaN,z:12}).ok,false);
  assert.equal(game.command('order',{ids:[a.id],type:'attackMove',x:1e6,z:12}).ok,false);
  assert.equal(game.command('order',{ids:[a.id],type:'attackMove',x:-105,z:75}).ok,true);
  const storage=new MemoryStorage();const snapshot=game.exportSave();
  storage.setItem(SAVE_KEY,snapshot);const loaded=createGame({storage});
  assert.equal(loaded.loaded,true);assert.equal(loaded.state.squads[0].order.type,'attackMove');
  assert.equal(loaded.state.squads[0].order.x,-105);
});

test('melee contact cannot damage a unit through a solid castle curtain',()=>{
  const game=quiet(),a=own(game).find(s=>s.type==='spear'),b=game.state.squads.find(s=>s.owner==='red');
  Object.assign(b,{type:'spear',hp:330,maxHp:330,men:6});game.state.squads=[a,b];
  let placed=false;
  for(const wall of worldObstacles(game.state).filter(o=>o.part==='wall'&&o.regionId==='home')){
    const nx=Math.sin(wall.rotation||0),nz=Math.cos(wall.rotation||0);
    const p={x:wall.x+nx*2.3,z:wall.z+nz*2.3},q={x:wall.x-nx*2.3,z:wall.z-nz*2.3};
    if(!isWorldPointWalkable(game.state,p,.8)||!isWorldPointWalkable(game.state,q,.8))continue;
    for(const [s,at] of [[a,p],[b,q]])Object.assign(s,at,{anchor:{...at},order:{type:'hold',...at},path:[],attackClock:0,stance:'defensive'});
    assert.equal(isWorldSegmentWalkable(game.state,p,q,.12),false);placed=true;break;
  }
  assert.ok(placed,'A legal pair of opposing points on a solid wall must exist');
  const hpA=a.hp,hpB=b.hp;game.step(.05);
  assert.equal(a.hp,hpA);assert.equal(b.hp,hpB);
  assert.ok(a.lastAttack<0);assert.ok(b.lastAttack<0);
  assert.notEqual(a.activity,'attack');
});

let passed=0;
for(const {name,fn} of cases) {
  const start=performance.now();
  try{fn();passed++;console.log(`PASS ${name} (${Math.round(performance.now()-start)}ms)`);}
  catch(error){console.error(`FAIL ${name}`);console.error(error);process.exitCode=1;}
}
console.log(`\n${passed}/${cases.length} tests passed.`);

console.log('Trajectory evidence: '+trajectoryEvidence.routes+' completed routes; '+trajectoryEvidence.segments+' actual movement segments; '+trajectoryEvidence.solidChecks+' independent solid checks; '+[...trajectoryEvidence.types].join(', ')+'; '+trajectoryEvidence.intersections+' intersections.');
