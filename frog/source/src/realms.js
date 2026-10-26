/** Persistent frontier regions and fair, explicitly scheduled wildlife events. */
import { WORLD_BOUNDARY, SHELTER_RADIUS } from './world-config.js';
import { PREDATORS } from './rules.js';
import { UPKEEP_PER_FROG, campSpecializationEffects, equipmentBonuses } from './realm-economy.js';

export const REALM_VERSION = 1;
export const REALM_TRAVEL_DISTANCE = SHELTER_RADIUS + 6;
export const PREDATOR_SPAWN_DISTANCE = 45;
const TYPES = ['heron','snake','fish'];
const NAMES = ['Η Πρώτη Λίμνη','Οι Βόρειες Καλαμιές','Το Νερό των Κέδρων','Η Ομίχλη των Ριζών','Οι Χάλκινες Όχθες','Τα Νησιά του Λωτού','Το Βαθύ Πέρασμα','Η Κοιλάδα των Βροχών'];
const number = (value, fallback=0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const nonnegative = value => Math.max(0,number(value));
const integer = value => Math.max(0,Math.floor(nonnegative(value)));
const clone = value => value == null ? value : JSON.parse(JSON.stringify(value));
const distance = (a,b) => Math.hypot(number(a?.x)-number(b?.x),number(a?.z)-number(b?.z));
const living = f => !!f && !f.dead && number(f.hp,1)>0;
const completedCamp = c => !!c && c.team==='ally' && !c.destroyed && number(c.hp,1)>0 && !c.underConstruction && !c.constructing;

export function realmDescriptor(index=0) {
  index=integer(index);
  const cycle=Math.floor(index/NAMES.length);
  return {index,name:NAMES[index%NAMES.length]+(cycle?` · ${cycle+1}`:''),seed:731+index*7919,level:1+index*2,biome:['creek','mist','autumn','roots'][index%4]};
}

function normalEvents(value={},elapsed=0) {
  return {
    sequence:integer(value.sequence),
    nextGuardianAt:Math.max(0,number(value.nextGuardianAt,elapsed+150)),
    nextRoamAt:Math.max(0,number(value.nextRoamAt,elapsed+300)),
    nextRaidAt:Math.max(0,number(value.nextRaidAt,elapsed+720)),
    recentDefeats:Array.isArray(value.recentDefeats)?value.recentDefeats.filter(v=>typeof v==='string').slice(-128):[],
    kills:integer(value.kills),bossKills:integer(value.bossKills)
  };
}

export function createRealmState(value=null,{elapsed=0}={}) {
  const source=value&&typeof value==='object'?value:{};
  const active=integer(source.active),regions={};
  for(const [key,row] of Object.entries(source.regions||{})) {
    if(!/^\d+$/.test(key)||!row||typeof row!=='object')continue;
    const index=integer(key),descriptor=realmDescriptor(index);
    regions[index]={...descriptor,visitedAt:nonnegative(row.visitedAt),lastActiveAt:nonnegative(row.lastActiveAt),snapshot:row.snapshot&&typeof row.snapshot==='object'?clone(row.snapshot):null};
  }
  if(!regions[active])regions[active]={...realmDescriptor(active),visitedAt:elapsed,lastActiveAt:elapsed,snapshot:null};
  const unlocked=[...new Set([0,active,...Object.keys(regions).map(Number),...(Array.isArray(source.unlocked)?source.unlocked.filter(v=>Number.isInteger(v)&&v>=0):[])])].sort((a,b)=>a-b);
  return {version:REALM_VERSION,active,unlocked,regions,events:normalEvents(source.events,elapsed),backgroundAccumulator:Math.min(.999,nonnegative(source.backgroundAccumulator))};
}

function ensureRealms(game) {
  if(!game.realms||game.realms.version!==REALM_VERSION)game.realms=createRealmState(game.realms,{elapsed:game.elapsed||0});
  game.realms.events??=normalEvents({},game.elapsed||0);
  return game.realms;
}

export function realmTravelOffer(game,targetIndex) {
  const state=ensureRealms(game),target=Number(targetIndex),frontier=Math.max(...Object.keys(state.regions).map(Number),0)+1;
  const known=!!state.regions[target],descriptor=realmDescriptor(target);
  if(game.creekMode){
    const exit=game.world?.creekLandmarks?.find(p=>p.id==='roots'),discovered=game.creek?.regions?.[String(state.active)]?.discovered||[];
    const near=!!exit&&distance(exit,game.player)<=12,found=discovered.includes('roots');
    const danger=(game.predators||[]).some(p=>living(p)&&p.target===game.player&&distance(p,game.player)<24)||(game.frogs||[]).some(f=>living(f)&&game.hostile?.(game.player,f)&&distance(f,game.player)<10);
    const requirements=[{label:'Ανακάλυψε το πέρασμα στις ρίζες',met:found},{label:'Πλησίασε το πέρασμα για να ταξιδέψεις',met:near},{label:'Απομακρύνσου από άμεση καταδίωξη',met:!danger}];
    let reason='Έτοιμο για ταξίδι';
    if(!Number.isInteger(target)||target<0||target>frontier||(!known&&target!==frontier))reason='Η διαδρομή δεν έχει ακόμη ανακαλυφθεί.';
    else if(target===state.active)reason='Βρίσκεσαι ήδη σε αυτή την περιοχή.';
    else if(game.player?.dead||game.player?.grabbedBy)reason='Πρέπει πρώτα να ξεφύγεις από τον κίνδυνο.';
    else reason=requirements.find(r=>!r.met)?.label||reason;
    return {allowed:reason==='Έτοιμο για ταξίδι',reason,cost:{food:0,reeds:0},requirements,targetIndex:target,name:descriptor.name,newRegion:!known,baseId:null};
  }
  const cost=known?{food:0,reeds:0}:{food:40+10*target,reeds:25+8*target};
  const owned=(game.camps||[]).filter(completedCamp);
  const base=owned.filter(c=>distance(c,game.player)<=REALM_TRAVEL_DISTANCE).sort((a,b)=>distance(a,game.player)-distance(b,game.player))[0];
  const safe=!!base&&(typeof game.campSafe!=='function'||game.campSafe(base));
  const territory=(game.camps||[]).filter(c=>completedCamp(c)&&c.originalEnemy).length;
  const level=Math.min(20,4+2*target);
  const requirements=[
    {label:'Βρίσκεσαι σε ολοκληρωμένο, ασφαλές κάστρο',met:safe},
    ...known?[]:[{label:`Κράτησε 2 αντίπαλα οχυρά στην τρέχουσα λίμνη (${territory}/2)`,met:territory>=2},{label:`Επίπεδο ηγεσίας ${level}`,met:number(game.player?.level,1)>=level}],
    {label:`Εφόδια αποστολής: ${cost.food} τροφή και ${cost.reeds} υλικά`,met:number(game.resources?.food)>=cost.food&&number(game.resources?.reeds)>=cost.reeds}
  ];
  let reason='Έτοιμο για ταξίδι';
  if(!Number.isInteger(target)||target<0||target>frontier||(!known&&target!==frontier))reason='Η περιοχή δεν έχει ακόμη χαρτογραφηθεί.';
  else if(target===state.active)reason='Βρίσκεσαι ήδη σε αυτή τη λίμνη.';
  else if(game.player?.dead||game.player?.grabbedBy)reason='Πρέπει πρώτα να επιστρέψεις σε ασφαλές σημείο.';
  else reason=requirements.find(r=>!r.met)?.label||reason;
  const allowed=reason==='Έτοιμο για ταξίδι';
  return {allowed,reason,cost,requirements,targetIndex:target,name:descriptor.name,newRegion:!known,baseId:base?.id||null};
}

/** Guards and units in paid training remain in their region. No living unit is discarded. */
export function splitRealmParty(game,ids=null) {
  const selected=ids?new Set(ids.map(String)):null,travelers=[],parked=[];
  for(const f of game.frogs||[]) {
    if(f===game.player||f.team==='player'||!living(f))continue;
    const follows=f.team==='ally'&&!f.guard&&!f.trainingPaid&&f.order!=='guard'&&(!selected||selected.has(String(f.id)));
    (follows?travelers:parked).push(f);
  }
  return {travelers,parked,travelerIds:travelers.map(f=>f.id)};
}

/** Store only the local region: player, supplies, XP and global statistics stay global. */
export function archiveCurrentRealm(game,snapshot,{travelingIds=[]}={}) {
  const state=ensureRealms(game),index=state.active,copy=clone(snapshot||{}),excluded=new Set(travelingIds.map(String));
  for(const key of ['player','resources','realms','creek','stats','won','settings'])delete copy[key];
  copy.frogs=(copy.frogs||[]).filter(f=>f.team!=='player'&&!excluded.has(String(f.id)));
  copy.predators=Array.isArray(copy.predators)?copy.predators:serializePredators(game);
  copy.realmEvents=clone(state.events);
  state.regions[index]={...realmDescriptor(index),visitedAt:state.regions[index]?.visitedAt??game.elapsed,lastActiveAt:game.elapsed,snapshot:copy};
  game.realmSupplyCache=null;
  return clone(state.regions[index]);
}

/**
 * Commit a checked route and return the destination snapshot for root to load.
 * Invoke only after taking a valid source save; it does not recreate scene objects.
 */
export function completeRealmTravel(game,targetIndex,{sourceSnapshot,travelingIds,destinationSnapshot}={}) {
  const offer=realmTravelOffer(game,targetIndex);
  if(!offer.allowed)return {ok:false,...offer};
  if(!sourceSnapshot||typeof sourceSnapshot!=='object')return {ok:false,...offer,reason:'Δεν ήταν δυνατή η ασφαλής αποθήκευση της τρέχουσας λίμνης.'};
  const state=ensureRealms(game),ids=travelingIds||splitRealmParty(game).travelerIds;
  const destination=destinationSnapshot??state.regions[offer.targetIndex]?.snapshot??null;
  archiveCurrentRealm(game,sourceSnapshot,{travelingIds:ids});
  game.resources.food=number(game.resources.food)-offer.cost.food;
  game.resources.reeds=number(game.resources.reeds)-offer.cost.reeds;
  state.active=offer.targetIndex;
  if(!state.unlocked.includes(state.active))state.unlocked.push(state.active);
  state.unlocked.sort((a,b)=>a-b);
  state.regions[state.active]??={...realmDescriptor(state.active),visitedAt:game.elapsed,lastActiveAt:game.elapsed,snapshot:null};
  state.events=normalEvents(destination?.realmEvents,game.elapsed);
  if(destination?.realmEvents) {
    const departed=number(destination.elapsed,state.regions[state.active].lastActiveAt);
    const inactiveSeconds=Math.max(0,number(game.elapsed)-departed);
    for(const key of ['nextGuardianAt','nextRoamAt','nextRaidAt'])state.events[key]+=inactiveSeconds;
  }
  // A revisited region's living predators/cooldowns survive; a new region gets a fair grace interval.
  if(!destination)state.events=normalEvents({},game.elapsed);
  game.realmEventCheckAt=0;
  return {ok:true,...offer,descriptor:realmDescriptor(state.active),snapshot:clone(destination),travelingIds:ids};
}

const predatorFields=['id','type','name','boss','realmEvent','eventRole','eventSequence','realmIndex','campaignTracked','x','z','yaw','hp','maxHp','scale','damage','reach','baseSpeed','speed','windup','recover','baseWindup','baseRecover','strikeRadius','burstCount','cooldown','grace','dead','phaseTime','playerDamage','killAwarded','repelAwarded','defeatNotified','rewardGranted','campaignKillRecorded','provokedUntil','lastCombatAt','eventDefeatedAt','raidCampId','guardianReward','territoryRadius','respawnAt'];

export function serializePredators(game) {
  return (game.predators||[]).filter(p=>TYPES.includes(p.type)).map(p=>{
    const row={};
    for(const key of predatorFields)if(p[key]!==undefined)row[key]=typeof p[key]==='number'&&!Number.isFinite(p[key])?null:p[key];
    row.phase=p.dead?'dead':p.phase||'patrol';row.anchor={x:number(p.anchor?.x,p.x),z:number(p.anchor?.z,p.z)};
    return row;
  });
}

/** Reload actual remaining HP and reward flags; never reconstruct a killed boss alive. */
export function restoreRealmPredators(game,rows=[]) {
  const restored=[];
  for(const raw of rows) {
    if(!raw||!TYPES.includes(raw.type)||!Number.isFinite(raw.x)||!Number.isFinite(raw.z))continue;
    const maximum=Math.max(1,Math.min(1e7,number(raw.maxHp,PREDATORS[raw.type].hp))),hp=Math.max(0,Math.min(maximum,number(raw.hp,maximum)));
    const p=game.spawnPredator({...raw,hp:maximum});
    for(const key of predatorFields)if(raw[key]!==undefined&&raw[key]!==null)p[key]=raw[key];
    p.id=typeof raw.id==='string'?raw.id:`realm-${ensureRealms(game).active}-${raw.type}-${restored.length}`;
    p.hp=hp;p.maxHp=maximum;p.dead=!!raw.dead||hp===0;p.health=hp;
    p.anchor={x:number(raw.anchor?.x,raw.x),z:number(raw.anchor?.z,raw.z)};
    p.phase=p.dead?'dead':'patrol';p.phaseTime=p.dead?Math.max(4,nonnegative(raw.phaseTime)):0;
    p.grabbed=null;p.target=null;p.targetId=null;p._aiReady=false;
    p.respawnAt=p.realmEvent||p.campaignTracked?Infinity:Math.max(game.elapsed+60,number(raw.respawnAt,game.elapsed+220));
    if(p.model?.group)p.model.group.visible=!p.dead;
    restored.push(p);
  }
  return restored;
}

/** Exactly-once rare-material rewards. An enemy-only kill cannot reward the player. */
export function recordRealmPredatorDefeat(game,p) {
  if(!p||!p.dead||!p.realmEvent||p.rewardGranted)return false;
  const state=ensureRealms(game),events=state.events;
  p.rewardGranted=true;p.eventDefeatedAt=game.elapsed;
  if(events.recentDefeats.includes(p.id))return false;
  events.recentDefeats.push(p.id);events.recentDefeats=events.recentDefeats.slice(-128);
  events.kills++;if(p.boss)events.bossKills++;
  if(!p.killAwarded&&!(p.playerDamage>0))return false;
  const pearls=p.boss?5:p.eventRole==='guardian'?3:1;
  game.resources??={food:0,reeds:0};game.resources.pearls=nonnegative(game.resources.pearls)+pearls;
  game.stats??={};game.stats.pearlsFound=nonnegative(game.stats.pearlsFound)+pearls;
  game.ui?.toast?.({icon:'pearl',label:`+${pearls} μαργαριτάρια`,detail:'Σπάνιο υλικό για κατασκευή εξοπλισμού στο εργαστήριο.',tone:'success'});
  return pearls;
}

function terrainAllows(game,type,point) {
  if(Math.abs(point.x)>WORLD_BOUNDARY-10||Math.abs(point.z)>WORLD_BOUNDARY-10)return false;
  const s=game.world?.getSurface?.(point.x,point.z)||{type:'land',height:.35};
  const wet=s.type==='water'||s.type==='lily'||s.type==='leaf'||number(s.height)<.13;
  return type==='fish'?wet:type==='snake'?number(s.height)>-.3:true;
}

export function choosePredatorSpawn(game,type,role='roam',targetCamp=null) {
  const state=ensureRealms(game),seq=state.events.sequence,anchors=game.world?.predatorAnchors||{},bossAnchors=game.world?.bossAnchors||{},candidates=[];
  const preferred=role==='guardian'?(bossAnchors[type]||anchors[type]):anchors[type];
  if(preferred)candidates.push({x:preferred.x,z:preferred.z});
  const center=targetCamp||preferred||{x:0,z:0};
  const offset=(state.active*1.13+seq*2.399963229728653);
  for(const r of role==='raid'?[52,68,86]:[35,60,90,120])for(let i=0;i<16;i++){
    const angle=offset+i*Math.PI/8;candidates.push({x:center.x+Math.sin(angle)*r,z:center.z+Math.cos(angle)*r});
  }
  return candidates.find(point=>terrainAllows(game,type,point)&&distance(game.player,point)>=PREDATOR_SPAWN_DISTANCE&&!(game.frogs||[]).some(f=>living(f)&&f.team==='ally'&&distance(f,point)<18)&&!(game.camps||[]).some(c=>!c.destroyed&&distance(c,point)<SHELTER_RADIUS+4))||null;
}

function spawnRealmEvent(game,role) {
  const state=ensureRealms(game),events=state.events,owned=(game.camps||[]).filter(completedCamp);
  if(role==='raid'&&!owned.length)return false;
  if((game.predators||[]).filter(p=>p.realmEvent&&!p.dead).length>=4)return false;
  if((game.predators||[]).some(p=>p.realmEvent&&!p.dead&&p.eventRole===role))return false;
  const seq=events.sequence,type=role==='raid'?(seq%2?'snake':'heron'):TYPES[(seq+state.active)%TYPES.length];
  const target=role==='raid'?owned.slice().sort((a,b)=>distance(a,game.player)-distance(b,game.player))[0]:null;
  const location=choosePredatorSpawn(game,type,role,target);
  if(!location)return false;
  const boss=role==='guardian'&&(state.active>0||number(game.player?.level)>6),base=PREDATORS[type];
  const multiplier=1+Math.min(2.5,state.active*.16)+Math.min(.7,(number(game.player?.level,1)-1)*.025);
  const health=Math.round(base.hp*multiplier*(boss?2:1)),id=`realm-${state.active}-${role}-${++events.sequence}`;
  const data={type,...location,id,hp:health,maxHp:health,boss,realmEvent:true,eventRole:role,eventSequence:events.sequence,realmIndex:state.active,campaignTracked:false,raidCampId:target?.id||null,guardianReward:role==='guardian',territoryRadius:role==='guardian'?26:60,damage:base.damage*(1+Math.min(.65,state.active*.07))*(boss?1.45:1)};
  const p=game.spawnPredator(data);
  Object.assign(p,data,{id,maxHp:health,hp:health,anchor:{...location},grace:game.elapsed+12,respawnAt:Infinity});
  if(role==='raid')p.raidDestination={x:target.x,z:target.z};
  const label=role==='guardian'?'Φύλακας σπάνιων υλικών':role==='raid'?'Θηρευτής πλησιάζει κάστρο':'Θηρευτής στην περιοχή';
  const detail=role==='guardian'?'Προαιρετική αναμέτρηση για μαργαριτάρια. Η θέση σημειώθηκε στον χάρτη.':role==='raid'?`${target.name}: συγκέντρωσε φρουρά. Ο θηρευτής εμφανίστηκε μακριά από τον στρατό σου.`:'Κυνηγά και τους αντίπαλους βατράχους. Η θέση του φαίνεται στον χάρτη.';
  game.ui?.toast?.({id:`wildlife-${id}`,icon:type,label,detail,tone:role==='raid'?'warning':'info'});
  game.onGuideEvent?.(role==='raid'?'predator-raids':type);
  return p;
}

/** Simulation-time scheduling: menu/pause time never advances events or production. */
export function tickRealmEvents(game,dt=0) {
  if(game.creekMode)return;
  const state=ensureRealms(game),now=nonnegative(game.elapsed);
  if(now<(game.realmEventCheckAt||0))return;
  game.realmEventCheckAt=now+.5;
  if(game.player?.dead)return;
  const events=state.events,owned=(game.camps||[]).filter(completedCamp);
  if(now>=events.nextGuardianAt&&number(game.player?.level,1)>=2){const spawned=spawnRealmEvent(game,'guardian');events.nextGuardianAt=now+(spawned?720:45);}
  if(now>=events.nextRoamAt&&number(game.player?.level,1)>=3){const spawned=spawnRealmEvent(game,'roam');events.nextRoamAt=now+(spawned?480:60);}
  if(now>=events.nextRaidAt&&owned.length&&number(game.player?.level,1)>=4){const spawned=spawnRealmEvent(game,'raid');events.nextRaidAt=now+(spawned?960:60);}
  // Clean only spent event corpses. Surviving units, even distant ones, remain intact.
  const retired=(game.predators||[]).filter(p=>p.realmEvent&&p.dead&&p.rewardGranted&&now-(p.eventDefeatedAt??now)>90);
  if(retired.length){const ids=new Set(retired);for(const p of retired){game.scene?.remove?.(p.model?.group);p.model?.dispose?.();}game.predators=game.predators.filter(p=>!ids.has(p));}
  for(const p of game.predators||[])if(p.realmEvent&&p.eventRole==='raid'&&!p.dead){const c=(game.camps||[]).find(c=>c.id===p.raidCampId&&!c.destroyed);p.raidDestination=c?{x:c.x,z:c.z}:null;}
}

function inactiveSupplyRows(game) {
  const state=ensureRealms(game),cache=game.realmSupplyCache,now=number(game.elapsed);
  if(cache&&cache.state===state&&cache.active===state.active&&cache.frogs===game.frogs&&now>=cache.at&&now<cache.at+1)return cache.rows;
  const activeAllies=new Set((game.frogs||[]).filter(f=>living(f)&&f.team==='ally').map(f=>String(f.id))),seen=new Set(activeAllies),rows=[];
  for(const record of Object.values(state.regions)) {
    if(record.index===state.active||!record.snapshot)continue;
    const snapshot=record.snapshot,frogs=snapshot.frogs||[],predators=snapshot.predators||[];
    const troops=frogs.filter(f=>{
      if(!living(f)||f.team!=='ally'||seen.has(String(f.id)))return false;
      seen.add(String(f.id));return true;
    });
    const bases=(snapshot.camps||[]).filter(c=>completedCamp(c)
      &&!frogs.some(f=>living(f)&&!f.surrendered&&String(f.team).startsWith('enemy')&&distance(f,c)<SHELTER_RADIUS+9)
      &&!predators.some(p=>living(p)&&distance(p,c)<SHELTER_RADIUS+9&&(p.eventRole==='raid'||!['patrol','dormant','dead'].includes(p.phase))));
    let food=0,materials=0;
    for(const c of bases){const effect=campSpecializationEffects(c);food+=(c.buildings?.store?.5:.25)+effect.foodBonusPerSecond;materials+=(c.buildings?.watchtower?.2:.12)+effect.materialBonusPerSecond;}
    rows.push({record,snapshot,troops,bases,food,materials,upkeep:troops.length*UPKEEP_PER_FROG});
  }
  game.realmSupplyCache={state,active:state.active,frogs:game.frogs,at:now,rows};
  return rows;
}

/** Aggregate inactive land only; active simulation is counted by realm-economy.js. */
export function realmBackgroundSnapshot(game) {
  const rows=inactiveSupplyRows(game),sum=(key)=>rows.reduce((n,row)=>n+row[key],0);
  return {regions:rows.length,armyCount:rows.reduce((n,row)=>n+row.troops.length,0),guards:rows.reduce((n,row)=>n+row.troops.filter(f=>f.guard||f.order==='guard').length,0),safeCamps:rows.reduce((n,row)=>n+row.bases.length,0),foodIncomePerMinute:sum('food')*60,materialIncomePerMinute:sum('materials')*60,foodPerMinute:sum('upkeep')*60,netFoodPerMinute:(sum('food')-sum('upkeep'))*60};
}

/**
 * Background logistics use only supplied simulation dt, never timestamps. An
 * unloaded region produces from safe finished bases and feeds its real parked
 * troops, but cannot finish jobs, spawn recruits or resolve invisible battles.
 */
export function realmBackgroundSupply(game,dt=0) {
  if(game.creekMode)return null;
  if(!(Number.isFinite(dt)&&dt>0))return null;
  const state=ensureRealms(game);state.backgroundAccumulator=nonnegative(state.backgroundAccumulator)+dt;
  if(state.backgroundAccumulator<1)return null;
  const seconds=state.backgroundAccumulator;state.backgroundAccumulator=0;
  const rows=inactiveSupplyRows(game);if(!rows.length)return {food:0,reeds:0,upkeep:0};
  game.resources??={food:0,reeds:0};
  const food=rows.reduce((n,row)=>n+row.food,0)*seconds,reeds=rows.reduce((n,row)=>n+row.materials,0)*seconds;
  game.resources.food=nonnegative(game.resources.food)+food;game.resources.reeds=nonnegative(game.resources.reeds)+reeds;
  const demand=rows.reduce((n,row)=>n+(row.bases.length?row.upkeep:0),0)*seconds,served=Math.min(game.resources.food,demand),ratio=demand?served/demand:1;
  game.resources.food=Math.max(0,game.resources.food-served);
  for(const row of rows){
    const actualRatio=row.bases.length?ratio:row.troops.length?0:1;
    row.snapshot.economy??={version:1,jobs:[]};
    row.snapshot.economy.shortageSeconds=actualRatio<.999?nonnegative(row.snapshot.economy.shortageSeconds)+seconds:Math.max(0,nonnegative(row.snapshot.economy.shortageSeconds)-seconds*2);
    for(const f of row.troops){
      f.stomach=Math.min(100,Math.max(0,number(f.stomach,60)+seconds*(.075*actualRatio-.045*(1-actualRatio))));
      f.morale=Math.min(100,Math.max(0,number(f.morale,100)+seconds*(actualRatio>=.999?.04+equipmentBonuses(f).moraleRecovery:-.18*(1-actualRatio))));
    }
  }
  return {food,reeds,upkeep:served,seconds};
}

export function realmSnapshot(game) {
  const state=ensureRealms(game),frontier=Math.max(...Object.keys(state.regions).map(Number),0)+1;
  const regions=[...Object.keys(state.regions).map(Number),frontier].sort((a,b)=>a-b).map(index=>{
    const active=index===state.active,record=state.regions[index],camps=active?(game.camps||[]):record?.snapshot?.camps||[],frogs=active?(game.frogs||[]):record?.snapshot?.frogs||[];
    return {...realmDescriptor(index),visited:!!record,active,owned:camps.filter(completedCamp).length,garrison:frogs.filter(f=>living(f)&&f.team==='ally'&&(f.guard||f.order==='guard')).length,enemies:frogs.filter(f=>living(f)&&String(f.team).startsWith('enemy')).length,travel:realmTravelOffer(game,index)};
  });
  const events=state.events,level=number(game.player?.level,1),eventTimes=[{label:'Νέα προαιρετική αναμέτρηση',at:events.nextGuardianAt,eligible:level>=2},{label:'Περιπλανώμενος θηρευτής',at:events.nextRoamAt,eligible:level>=3},{label:'Πιθανή επιδρομή θηρευτή',at:events.nextRaidAt,eligible:level>=4&&(game.camps||[]).some(completedCamp)}].filter(row=>row.eligible);
  const next=eventTimes.sort((a,b)=>a.at-b.at)[0];
  return {active:state.active,name:realmDescriptor(state.active).name,frontier,regions,background:game.creekMode?{regions:Math.max(0,Object.keys(state.regions).length-1),armyCount:regions.filter(r=>!r.active).reduce((n,r)=>n+r.garrison,0)}:realmBackgroundSnapshot(game),milestones:[],nextEvent:!game.creekMode&&next?{label:next.label,seconds:Math.max(0,Math.ceil(next.at-number(game.elapsed)))}:null};
}
