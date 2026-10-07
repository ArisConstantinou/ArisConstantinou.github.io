import assert from 'node:assert/strict';
import {createGame,SAVE_KEY} from '../feouda-engine.js';
import {UNIT_TYPES,REGIONS,BRIDGES,riverX} from '../feouda-data.js';

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
  assert.equal(game.command('build',{type:'houses',regionId:'quarry'}).ok,true);
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
  game.command('build',{type:'houses',regionId:'quarry'});game.command('order',{ids:[s.id],type:'move',x:-97,z:72});advance(game,3);
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

let passed=0;
for(const {name,fn} of cases) {
  const start=performance.now();
  try{fn();passed++;console.log(`PASS ${name} (${Math.round(performance.now()-start)}ms)`);}
  catch(error){console.error(`FAIL ${name}`);console.error(error);process.exitCode=1;}
}
console.log(`\n${passed}/${cases.length} tests passed.`);
