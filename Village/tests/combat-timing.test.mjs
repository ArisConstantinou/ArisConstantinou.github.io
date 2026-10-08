import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createGame, getCombatCycle, COMBAT_TIMING, FORT_POLYGONS, isWorldSegmentWalkable} from '../feouda-engine.js';
import {UNIT_TYPES} from '../feouda-data.js';

const close=(a,b,epsilon=1e-6)=>assert.ok(Math.abs(a-b)<epsilon,`${a} differs from ${b}`);
const advance=(game,seconds)=>{for(let elapsed=0;elapsed<seconds-1e-9;elapsed+=.05)game.step(Math.min(.05,seconds-elapsed));};
const until=(game,predicate,limit=10)=>{for(let elapsed=0;elapsed<limit&&!predicate();elapsed+=.025)game.step(.025);assert.ok(predicate(),'Expected simulation event did not occur');};
const freeze=value=>{Object.freeze(value);for(const item of Object.values(value))if(item&&typeof item==='object'&&!Object.isFrozen(item))freeze(item);return value;};
function quiet() {
  const game=createGame();
  for(const faction of Object.values(game.state.ai.factions))faction.nextRaid=faction.nextRecruit=1e8;
  for(const region of Object.values(game.state.regions))region.fortHp=0;
  return game;
}
function pose(squad,type,x,z,attackClock=0) {
  Object.assign(squad,{type,x,z,hp:UNIT_TYPES[type].hp,maxHp:UNIT_TYPES[type].hp,men:UNIT_TYPES[type].men,
    attackClock,attackCycle:null,order:{type:'hold',x,z},anchor:{x,z},path:[],stance:'defensive',formation:'line',activity:'idle',engagedId:null});
}
function duel(type='spear',distance=4) {
  const game=quiet(),a=game.state.squads.find(s=>s.owner==='player'),b=game.state.squads.find(s=>s.owner==='red');
  pose(a,type,-130,75);pose(b,'spear',-130+distance,75,10000);game.state.squads=[a,b];
  assert.ok(game.getNavigation().isWalkable(a,a));assert.ok(game.getNavigation().isWalkable(b,b));
  return {game,a,b};
}
function fortress(type='ram') {
  const game=quiet(),a=game.state.squads.find(s=>s.owner==='player'),region=game.state.regions.crossing;
  region.fortHp=region.maxFortHp;region.attackClock=10000;
  pose(a,type,type==='trebuchet'?-85:-30,type==='trebuchet'?15:11.5);
  game.state.squads=[a];a.order={type:'attack',regionId:'crossing',targetId:'crossing'};
  assert.ok(game.getNavigation().isWalkable(a,a));return {game,a,region};
}
function begin(game,a) {game.step(.025);assert.equal(getCombatCycle(game.state,a).phase,'windup');return {...a.attackCycle};}
function reload(game) {const other=createGame();assert.equal(other.importSave(game.exportSave()).ok,true);return other;}

test('idle, legacy and missing squads never invent a repeating attack animation',()=>{
  const game=createGame(),a=game.state.squads[0];a.lastAttack=game.state.t;
  assert.equal(getCombatCycle(game.state,a).phase,'idle');delete a.attackCycle;
  assert.equal(getCombatCycle(game.state,a.id).phase,'idle');
  for(const state of [null,undefined,{}, {squads:null}, {squads:[null]}])assert.equal(getCombatCycle(state,'missing').phase,'idle');
});

for(const type of ['spear','sword','archer','cavalry','ram','trebuchet'])test(`${type}: a real windup precedes its single release and recovery`,()=>{
  const isFort=['ram','trebuchet'].includes(type),fixture=isFort?fortress(type):duel(type,type==='archer'?20:4),{game,a}=fixture;
  const target=isFort?fixture.region:fixture.b,hpKey=isFort?'fortHp':'hp',hp=target[hpKey],cycle=begin(game,a);
  assert.equal(a.lastAttack,-1000);assert.equal(cycle.releasedAt,null);assert.equal(cycle.impactAt,null);
  advance(game,COMBAT_TIMING[type].windup-.075);
  assert.equal(target[hpKey],hp);assert.equal(game.state.effects.filter(e=>e.damage&&e.sourceId===a.id).length,0);
  assert.equal(getCombatCycle(game.state,a).phase,'windup');
  until(game,()=>a.attackCycle?.releasedAt!==null&&a.attackCycle?.id===cycle.id);
  const release=getCombatCycle(game.state,a);assert.equal(release.phase,'release');assert.equal(release.released,true);
  assert.ok(a.lastAttack>=cycle.releaseAt-1e-7);close(a.lastAttack,release.releasedAt);
  assert.equal(release.target.id,target.id);assert.equal(release.target.kind,isFort?'region':'squad');
  if(type==='archer'||type==='trebuchet') {
    const shots=game.state.effects.filter(e=>e.damage&&e.attackId===cycle.id);assert.equal(shots.length,1);
    assert.equal(target[hpKey],hp);assert.equal(release.impacted,false);assert.equal(shots[0].id,a.attackCycle.projectileId);
    until(game,()=>target[hpKey]<hp);assert.ok(a.attackCycle.impactAt>=a.attackCycle.releasedAt);
  } else {assert.ok(target[hpKey]<hp);assert.equal(release.impacted,true);close(release.impactAt,release.releasedAt);}
  until(game,()=>getCombatCycle(game.state,a).phase==='recovery');
  const after=target[hpKey];advance(game,.1);assert.equal(target[hpKey],after);assert.equal(a.attackCycle.id,cycle.id);
});

test('steady attack spacing retains the configured cooldown after the initial windup',()=>{
  const {game,a,b}=duel('sword'),releases=[];let previous=-1000;
  while(releases.length<4){game.step(.025);if(a.lastAttack!==previous){previous=a.lastAttack;releases.push(previous);}}
  for(let i=1;i<releases.length;i++)close(releases[i]-releases[i-1],UNIT_TYPES.sword.cooldown,.026);
  assert.ok(b.hp>0);assert.equal(game.state.effects.filter(e=>e.damage&&e.sourceId===a.id).length,0);
});

test('pause freezes windup, cooldown, impact and the pure phase readout',()=>{
  const {game,a,b}=duel('archer',20);begin(game,a);advance(game,.15);game.setPaused(true);
  const before=JSON.stringify({cycle:a.attackCycle,t:game.state.t,hp:b.hp,clock:a.attackClock,readout:getCombatCycle(game.state,a)});
  for(let i=0;i<15;i++)game.step(1);
  assert.equal(JSON.stringify({cycle:a.attackCycle,t:game.state.t,hp:b.hp,clock:a.attackClock,readout:getCombatCycle(game.state,a)}),before);
  game.setPaused(false);until(game,()=>a.attackCycle?.projectileId);game.setPaused(true);
  const flight=JSON.stringify(game.state.effects),hp=b.hp;advance(game,3);
  assert.equal(JSON.stringify(game.state.effects),flight);assert.equal(b.hp,hp);game.setPaused(false);until(game,()=>b.hp<hp);
});

for(const type of ['move','hold','retreat'])test(`${type} orders cancel preparation immediately without refunding the spent cooldown`,()=>{
  const {game,a,b}=duel(),cycle=begin(game,a),hp=b.hp,clock=a.attackClock;
  const payload={ids:[a.id],type,...(type==='move'?{x:-150,z:70}:{})};
  assert.equal(game.command('order',payload).ok,true);assert.equal(a.attackCycle,null);close(a.attackClock,clock);
  advance(game,COMBAT_TIMING.spear.windup+.1);assert.equal(b.hp,hp);assert.equal(a.lastAttack,-1000);
  assert.ok(game.state.t<cycle.endsAt);assert.equal(getCombatCycle(game.state,a).phase,'idle');
});

test('changing to a different attack target cannot release the old preparation at either enemy',()=>{
  const {game,a,b}=duel('archer',20),c={...structuredClone(b),id:'test-second-enemy',x:-111,z:79};c.anchor={x:c.x,z:c.z};c.order={type:'hold',...c.anchor};game.state.squads.push(c);
  const cycle=begin(game,a),hpB=b.hp,hpC=c.hp;
  assert.equal(game.command('order',{ids:[a.id],type:'attack',targetId:c.id}).ok,true);assert.equal(a.attackCycle,null);
  advance(game,COMBAT_TIMING.archer.windup+.1);assert.equal(b.hp,hpB);assert.equal(c.hp,hpC);
  assert.equal(game.state.effects.some(e=>e.attackId===cycle.id),false);
});

for(const change of ['dead','removed','friendly','truce'])test(`${change} target cancels a pending attack before any release`,()=>{
  const {game,a,b}=duel('archer',20),cycle=begin(game,a),hp=b.hp;
  if(change==='dead')b.hp=0;else if(change==='removed')game.state.squads=[a];else if(change==='friendly')b.owner='player';else game.state.ai.truce.red=game.state.t+30;
  advance(game,.7);assert.equal(a.lastAttack,-1000);assert.equal(game.state.effects.some(e=>e.attackId===cycle.id),false);
  assert.equal(a.attackCycle,null);if(change!=='dead')assert.equal(b.hp,hp);
});

test('a fleeing target is revalidated at melee release and takes no remote damage',()=>{
  const {game,a,b}=duel();a.order={type:'attack',targetId:b.id};const cycle=begin(game,a),hp=b.hp;b.x=-90;b.anchor={x:b.x,z:b.z};
  advance(game,.5);assert.equal(b.hp,hp);assert.equal(a.lastAttack,-1000);assert.equal(a.attackCycle,null);
  assert.equal(game.state.effects.some(e=>e.attackId===cycle.id),false);assert.ok(a.x>-130);
});

test('restoring a wall during preparation prevents a weapon from striking through it',()=>{
  const {game,a,b}=duel();pose(a,'spear',-18.6,-4);pose(b,'spear',-23.2,-4,10000);
  assert.ok(isWorldSegmentWalkable(game.state,a,b,.12));const cycle=begin(game,a),hp=b.hp;
  game.state.regions.crossing.fortHp=game.state.regions.crossing.maxFortHp;game.state.regions.crossing.attackClock=10000;
  assert.equal(isWorldSegmentWalkable(game.state,a,b,.12),false);advance(game,.5);
  assert.equal(b.hp,hp);assert.equal(a.lastAttack,-1000);assert.equal(game.state.effects.some(e=>e.attackId===cycle.id),false);
});

test('approaching a distant enemy is movement, with no attack preparation or damage',()=>{
  const {game,a,b}=duel('spear',25),hp=b.hp;assert.equal(game.command('order',{ids:[a.id],type:'attack',targetId:b.id}).ok,true);
  advance(game,.5);assert.equal(getCombatCycle(game.state,a).phase,'idle');assert.equal(b.hp,hp);assert.equal(a.activity,'march');
});

test('infantry capturing a breached gate cannot retain an old siege strike',()=>{
  const {game,a,region}=fortress('spear');a.x=-30;a.z=8;const cycle=begin(game,a);
  region.fortHp=0;advance(game,.5);assert.equal(a.activity,'capture');assert.equal(a.attackCycle,null);assert.equal(a.lastAttack,-1000);
  assert.equal(game.state.effects.some(e=>e.attackId===cycle.id),false);assert.ok(region.capture>0);
});

test('fortress ownership change cancels a pending ram strike',()=>{
  const {game,a,region}=fortress();begin(game,a);const hp=region.fortHp;region.owner='player';
  advance(game,1);assert.equal(region.fortHp,hp);assert.equal(a.attackCycle,null);assert.equal(a.lastAttack,-1000);
});

test('an already released projectile survives a move order and lands exactly once',()=>{
  const {game,a,b}=duel('archer',20),cycle=begin(game,a),hp=b.hp;until(game,()=>a.attackCycle?.projectileId);
  const shot=game.state.effects.find(e=>e.attackId===cycle.id&&e.damage),damage=shot.damage;
  assert.equal(game.command('order',{ids:[a.id],type:'move',x:-150,z:70}).ok,true);assert.equal(a.attackCycle,null);
  until(game,()=>b.hp<hp);close(b.hp,hp-damage);advance(game,.6);close(b.hp,hp-damage);
  assert.equal(game.state.effects.some(e=>e.damage&&e.attackId===cycle.id),false);
});

test('a truce signed during flight prevents damage and a fabricated impact event',()=>{
  const {game,a,b}=duel('archer',20),cycle=begin(game,a),hp=b.hp;until(game,()=>a.attackCycle?.projectileId);
  game.state.resources.money=10000;assert.equal(game.command('truce',{faction:'red'}).ok,true);advance(game,1);
  assert.equal(b.hp,hp);assert.equal(game.state.effects.some(e=>e.type==='hit'&&e.attackId===cycle.id),false);
});

test('melee impacts identify the real target, source type, attack and exact contact coordinates',()=>{
  const {game,a,b}=duel('sword'),cycle=begin(game,a);until(game,()=>a.lastAttack>=0);
  const hit=game.state.effects.find(e=>e.type==='hit'&&e.attackId===cycle.id);
  assert.equal(hit.targetKind,'squad');assert.equal(hit.targetId,b.id);assert.equal(hit.sourceId,a.id);assert.equal(hit.sourceType,'sword');
  assert.deepEqual(hit.impact,{x:b.x,z:b.z});
});

test('fort impact and breach metadata distinguish masonry from squad hits',()=>{
  const {game,a,region}=fortress();region.fortHp=1;const cycle=begin(game,a);until(game,()=>a.lastAttack>=0);
  const hits=game.state.effects.filter(e=>e.type==='hit'&&e.attackId===cycle.id);assert.equal(hits.length,2);
  for(const hit of hits){assert.equal(hit.targetKind,'region');assert.equal(hit.targetId,'crossing');assert.equal(hit.sourceType,'ram');}
  const breach=hits.find(e=>e.breach),[p,q]=[FORT_POLYGONS.crossing[2],FORT_POLYGONS.crossing[3]];
  assert.deepEqual(breach.impact,{x:(p.x+q.x)/2,z:(p.z+q.z)/2});
  assert.deepEqual(hits.find(e=>!e.breach).impact,a.attackCycle.aim);
});

test('save and reload preserve an unfinished preparation and release it once at the same simulation time',()=>{
  const {game,a,b}=duel('sword');begin(game,a);advance(game,.15);const loaded=reload(game),copy=loaded.state.squads.find(s=>s.id===a.id);
  assert.deepEqual(copy.attackCycle,a.attackCycle);assert.deepEqual(getCombatCycle(loaded.state,copy),getCombatCycle(game.state,a));
  advance(game,.6);advance(loaded,.6);close(copy.lastAttack,a.lastAttack);close(loaded.state.squads.find(s=>s.id===b.id).hp,b.hp);
  assert.equal(copy.attackCycle.id,a.attackCycle.id);assert.equal(copy.attackCycle.releasedAt,a.attackCycle.releasedAt);
});

test('save and reload of a flying projectile preserve its age and never launch it twice',()=>{
  const {game,a,b}=duel('archer',20);begin(game,a);until(game,()=>a.attackCycle?.projectileId);advance(game,.05);
  const loaded=reload(game),copy=loaded.state.squads.find(s=>s.id===a.id),target=loaded.state.squads.find(s=>s.id===b.id),hp=b.hp;
  assert.deepEqual(copy.attackCycle,a.attackCycle);assert.deepEqual(loaded.state.effects,game.state.effects);
  advance(game,.7);advance(loaded,.7);assert.ok(target.hp<hp);close(target.hp,b.hp);close(copy.attackCycle.impactAt,a.attackCycle.impactAt);
  assert.equal(loaded.state.effects.some(e=>e.damage&&e.attackId===copy.attackCycle.id),false);
});

test('loading a released melee recovery never repeats its damage',()=>{
  const {game,a,b}=duel('sword');begin(game,a);until(game,()=>a.lastAttack>=0);const hp=b.hp,loaded=reload(game);
  advance(loaded,.3);assert.equal(loaded.state.squads.find(s=>s.id===b.id).hp,hp);
  assert.equal(getCombatCycle(loaded.state,a.id).phase,'recovery');
});

test('legacy saves without cycles keep their pending arrow and cooldown without creating a new attack',()=>{
  const {game,a,b}=duel('archer',20);begin(game,a);until(game,()=>a.attackCycle?.projectileId);
  const data=JSON.parse(game.exportSave());for(const squad of data.state.squads)delete squad.attackCycle;
  for(const effect of data.state.effects){delete effect.attackId;delete effect.sourceType;}
  const loaded=createGame();assert.equal(loaded.importSave(JSON.stringify(data)).ok,true);const copy=loaded.state.squads.find(s=>s.id===a.id);
  assert.equal(copy.attackCycle,null);close(copy.attackClock,a.attackClock);const hp=b.hp;advance(loaded,.7);
  assert.ok(loaded.state.squads.find(s=>s.id===b.id).hp<hp);assert.equal(copy.attackCycle,null);
});

test('malformed preparations are rejected transactionally without changing the live campaign',()=>{
  const {game,a}=duel('archer',20);begin(game,a);const saved=game.exportSave(),before=JSON.stringify(game.state);
  const changes=[
    c=>c.version=2,c=>c.releaseAt=c.startedAt,c=>c.endsAt+=1,c=>c.startedAt=-1,c=>c.aim.x='far away',
    c=>c.targetId='__proto__',c=>c.targetKind='village',c=>c.projectileId='shot-before-release',
    c=>c.releasedAt=c.releaseAt+10,c=>c.impactAt=0,c=>delete c.releasedAt
  ];
  for(const mutate of changes){const data=JSON.parse(saved);mutate(data.state.squads.find(s=>s.id===a.id).attackCycle);
    assert.equal(game.importSave(JSON.stringify(data)).ok,false);assert.equal(JSON.stringify(game.state),before);}
});

test('duplicate projectiles and replayed release flags are rejected transactionally',()=>{
  const {game,a}=duel('archer',20);begin(game,a);until(game,()=>a.attackCycle?.projectileId);const saved=game.exportSave(),before=JSON.stringify(game.state);
  for(const mutate of [
    data=>data.state.effects.push({...data.state.effects.find(e=>e.damage),id:'duplicate-projectile'}),
    data=>data.state.squads.find(s=>s.id===a.id).attackCycle.releasedAt=null,
    data=>data.state.squads.find(s=>s.id===a.id).attackCycle.impactAt=a.attackCycle.releasedAt,
    data=>data.state.effects.find(e=>e.damage).sourceId='wrong-shooter',
    data=>data.state.squads.find(s=>s.id===a.id).attackCycle.projectileId=null
  ]){const data=JSON.parse(saved);mutate(data);assert.equal(game.importSave(JSON.stringify(data)).ok,false);assert.equal(JSON.stringify(game.state),before);}
});

test('stale saved preparation is cancelled on the import candidate without inventing damage',()=>{
  const {game,a,b}=duel('archer',20);begin(game,a);const data=JSON.parse(game.exportSave());data.state.squads.find(s=>s.id===b.id).owner='player';
  const loaded=createGame();assert.equal(loaded.importSave(JSON.stringify(data)).ok,true);assert.equal(loaded.state.squads.find(s=>s.id===a.id).attackCycle,null);
  assert.equal(loaded.state.effects.length,0);assert.equal(loaded.state.squads.find(s=>s.id===b.id).hp,b.hp);
});

test('combat phase readouts are pure, finite, paused-aware and detached from campaign state',()=>{
  const {game,a}=duel('archer',20);begin(game,a);advance(game,.15);game.setPaused(true);const before=JSON.stringify(game.state);freeze(game.state);
  const readout=getCombatCycle(game.state,a.id);assert.equal(readout.phase,'windup');assert.equal(readout.paused,true);
  assert.ok(readout.phaseProgress>0&&readout.phaseProgress<1);assert.ok(readout.remainingSeconds>readout.secondsToRelease);
  readout.aim.x=123;readout.target.x=456;assert.equal(JSON.stringify(game.state),before);
});


test('fortress arrows without a squad cycle still land safely and identify their real source',()=>{
  const {game,a,region}=fortress();region.attackClock=0;a.attackClock=10000;const hp=a.hp;
  game.step(.025);const arrow=game.state.effects.find(e=>e.damage&&e.sourceId==='crossing');
  assert.ok(arrow);assert.equal(arrow.attackId,undefined);assert.equal(arrow.sourceType,'fortress');
  until(game,()=>a.hp<hp);const hit=game.state.effects.find(e=>e.type==='hit'&&e.sourceId==='crossing');
  assert.equal(hit.targetKind,'squad');assert.equal(hit.targetId,a.id);assert.equal(a.attackCycle,null);
});


test('a fortress attack interrupted by a nearby defender preserves its exact preparation on reload',()=>{
  const {game,a,b}=duel('archer',20);a.order={type:'attack',regionId:'crossing',targetId:'crossing'};
  begin(game,a);advance(game,.1);assert.equal(a.attackCycle.targetId,b.id);assert.equal(a.attackCycle.targetKind,'squad');
  const loaded=reload(game),copy=loaded.state.squads.find(s=>s.id===a.id);assert.deepEqual(copy.attackCycle,a.attackCycle);
  advance(game,.75);advance(loaded,.75);close(loaded.state.squads.find(s=>s.id===b.id).hp,b.hp);
  close(copy.lastAttack,a.lastAttack);assert.equal(copy.order.regionId,'crossing');
});
