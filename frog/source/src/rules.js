/** Pure game rules. Rendering and input cannot change these constraints. */
import {createCampaign, TRAINING} from './campaign.js';
import {normalizeBuildingPlacements} from './placement-rules.js';
import {WORLD_BOUNDARY,WORLD_REVISION} from './world-config.js';
import {migrateWorldSave} from './save-migration.js';
import {normalizeEquipment,normalizeRealmEconomySave} from './realm-economy.js';
import {normalizeRecruitment} from './recruitment.js';
import {normalizeCreekState} from './creek-state.js';
import {normalizeCreekSociety} from './creek-society-state.js';
export const SAVE_VERSION = 1;
export const SAVE_KEY = 'frog-creek-dominion-v1';
export const COLORS = {player:0xe4f58c,ally:0x72edbb,enemy:0xff7865,neutral:0xeed585,predator:0xffa54f,surrender:0xffe59b};
export const ROLE_NAMES = {scout:'Ανιχνευτής',bruiser:'Μαχητής',caller:'Κράχτης',hunter:'Κυνηγός'};
export const PREDATORS = {
  heron:{name:'Ο Ερωδιός',hp:650,speed:3.5,damage:30,reach:4.2,windup:1.25,recover:1.55,grab:3.7,scale:1.25},
  snake:{name:'Το Νερόφιδο',hp:470,speed:4.6,damage:24,reach:3.1,windup:1.0,recover:1.45,grab:4.2,scale:1.1},
  fish:{name:'Ο Κυνηγός του Βυθού',hp:540,speed:5.7,damage:35,reach:3.6,windup:1.5,recover:2,grab:3.5,scale:1.2}
};
export const BUILDINGS = {
  shelter:{name:'Νέο οχυρό',description:'40″ εργασίας από έναν παρόντα βάτραχο. Ευάλωτο εργοτάξιο που γίνεται κλειστό κάστρο με πύλη, πύργους και 3 θέσεις κτιρίων. Φέρε βοηθούς και φύλαξέ το.',cost:{food:12,reeds:30}},
  store:{name:'Αποθήκη',description:'24″ εργασίας και μία θέση. Αυξάνει την αυτόματη παραγωγή τροφής για τη συντήρηση του στρατού, όσο το κάστρο είναι ασφαλές.',cost:{food:10,reeds:20}},
  nursery:{name:'Φωλιά στρατολόγησης',description:'36″ εργασίας και μία θέση. Νέος βάτραχος κάθε 85″ με 10 τροφή / 6 υλικά, χωρίς όριο πληθυσμού. Βαθμίδες II / III: 70″ / 55″. Χρειάζεται ασφαλή βάση και συνεχή τροφοδοσία.',cost:{food:22,reeds:28}},
  training:{name:'Χώρος εκπαίδευσης',description:'32″ εργασίας και μία θέση. Μία εκπαίδευση ανά σύμμαχο: 8 τροφή / 4 υλικά και 18″ για επίπεδο και βαθμίδα II. Ο ορατός εξοπλισμός κατασκευάζεται χωριστά εδώ με πόρους και χρόνο.',cost:{food:18,reeds:24}},
  watchtower:{name:'Σκοπιά',description:'28″ εργασίας και μία θέση. Ανάθεσε φρουρούς από την Άμυνα: προτεινόμενη φρουρά 4 βατράχων, εντοπισμός στα 36μ και 18% λιγότερη ζημιά στους φρουρούς μέσα στην περιοχή.',cost:{food:12,reeds:24}},
  palisade:{name:'Οχυρά τείχη',description:'30″ εργασίας και μία θέση. Ενισχύει όλο τον περίβολο: +180 αντοχή κάστρου, +140 αντοχή πύλης και λιγότερη ζημιά πολιορκίας.',cost:{food:8,reeds:30}},
  upgrade:{name:'Αναβάθμιση βάσης',description:'48″ εργασίας: επόμενη βαθμίδα, +150 αντοχή και ταχύτερες ενισχύσεις. Η βαθμίδα II ανοίγει την τέταρτη θέση. Κάθε κάστρο επιλέγει ειδίκευση Άμυνας, Παραγωγής ή Εκπαίδευσης.',cost:{food:30,reeds:40}},
  repair:{name:'Επισκευή',description:'12″ προστατευμένης εργασίας για 150 αντοχή κάστρου και 120 αντοχή πύλης. Δεν δίνει εμπειρία· σταματά όσο η βάση απειλείται.',cost:{food:3,reeds:12}}
};
export function clamp(v,a,b){return Math.min(b,Math.max(a,Number.isFinite(v)?v:a));}
export function canAfford(resources,cost){return Object.entries(cost).every(([k,v])=>(resources[k]||0)>=v);}
export function spend(resources,cost){if(!canAfford(resources,cost))return false;for(const [k,v] of Object.entries(cost))resources[k]-=v;return true;}
export function nextLevelXP(level){return 40+Math.max(1,level)*28;}
export function awardXP(entity,amount){
  entity.xp=(entity.xp||0)+Math.max(0,amount);let levels=0;
  while(entity.xp>=nextLevelXP(entity.level||1)){
    entity.xp-=nextLevelXP(entity.level||1);entity.level=(entity.level||1)+1;
    entity.maxHp+=8;entity.hp=Math.min(entity.maxHp,entity.hp+20);levels++;
  }
  return levels;
}
export function promoteCost(entity){return {food:12*(entity.tier||1),reeds:18*(entity.tier||1)};}
export function canPromote(entity,resources){return entity.hp>0&&(entity.tier||1)<3&&entity.level>=(entity.tier||1)*2&&canAfford(resources,promoteCost(entity));}
export function promote(entity,resources){
  if(!canPromote(entity,resources))return false;
  spend(resources,promoteCost(entity));entity.tier++;entity.maxHp+=25;entity.hp=entity.maxHp;return true;
}
export function persuasionChance({allyPower=1,enemyPower=1,hp=1,maxHp=1,morale=100,campDestroyed=false,neutral=false}){
  if(neutral)return 1;
  return clamp(.16+.26*(allyPower/Math.max(enemyPower,1))+.26*(1-hp/Math.max(1,maxHp))+.22*(1-morale/100)+(campDestroyed?.32:0),.06,.98);
}
export function attackDamage(base,tier=1,level=1,blocked=false){return Math.max(1,Math.round(base*(1+(tier-1)*.28+(level-1)*.045)*(blocked?.35:1)));}
export function eat(entity,amount){
  const capacity=Math.max(0,(entity.maxStomach||100)-entity.stomach);
  const eaten=Math.min(capacity,Math.max(0,amount));entity.stomach+=eaten;return eaten;
}
/** Surrender is an NPC state; the main player always retains control and remains targetable. */
export function isSurrendered(entity){return !!entity&&entity.team!=='player'&&!!entity.surrendered;}
export function isVictory(camps){return camps.some(c=>c.originalEnemy)&&camps.filter(c=>c.originalEnemy).every(c=>c.team==='ally'&&!c.destroyed);}
export function gangCapacity(camps){return 6+camps.filter(c=>c.team==='ally'&&!c.destroyed).reduce((sum,c)=>sum+4+(c.tier||1)*2+(c.buildings?.nursery?3:0),0);}
export function dayState(elapsed){
  const phase=((elapsed/600+.375)%1+1)%1;
  const daylight=clamp(Math.sin(phase*Math.PI*2-Math.PI/2)*1.35,0,1);
  const hours=Math.floor(phase*24),minutes=Math.floor((phase*24-hours)*60);
  return {phase,daylight,night:daylight<.2,day:Math.floor((elapsed+225)/600)+1,timeLabel:`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`};
}
const record=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
const stringId=value=>typeof value==='string'&&value.length?value:null;
const finitePoint=value=>record(value)&&Number.isFinite(value.x)&&Number.isFinite(value.z);
const savedPoint=value=>({x:clamp(value.x,-WORLD_BOUNDARY,WORLD_BOUNDARY),z:clamp(value.z,-WORLD_BOUNDARY,WORLD_BOUNDARY)});
const savedYaw=value=>Number.isFinite(value)?Math.atan2(Math.sin(value),Math.cos(value)):0;
const savedCounter=value=>Math.floor(clamp(value??0,0,Number.MAX_SAFE_INTEGER));
const savedStrings=value=>[...new Set((Array.isArray(value)?value:[]).filter(v=>stringId(v)))];
const validTeam=t=>typeof t==='string'&&/^(player|ally|neutral|enemy\d*)$/.test(t);
const savedOrders=['follow','attack','guard','forage','regroup','training','flank','scout','distract','protect','retreat'];

/** JSON data can contain accidental cycles in IndexedDB. Strip nested realm
 * ledgers before cloning, so a region never recursively contains the kingdom. */
function cloneSaveData(data){
  const ancestors=[];
  try{return JSON.parse(JSON.stringify(data,function(key,value){
    if(['__proto__','prototype','constructor'].includes(key)||(['realms','creek'].includes(key)&&this!==data)||typeof value==='bigint')return undefined;
    if(value&&typeof value==='object'){
      while(ancestors.length&&ancestors.at(-1)!==this)ancestors.pop();
      if(ancestors.includes(value))return undefined;
      ancestors.push(value);
    }
    return value;
  }));}catch{return null;}
}

function savedActor(f,elapsed){
  const actor={...f,name:typeof f.name==='string'?f.name.slice(0,60):'Βάτραχος',role:Object.hasOwn(ROLE_NAMES,f.role)?f.role:'hunter',...savedPoint(f),yaw:savedYaw(f.yaw),maxHp:clamp(f.maxHp||100,25,10000),hp:clamp(f.hp,1,clamp(f.maxHp||100,25,10000)),stomach:clamp(f.stomach||0,0,100),maxStomach:100,level:Math.floor(clamp(f.level||1,1,99)),tier:Math.floor(clamp(f.tier||1,1,3)),xp:clamp(f.xp||0,0,1e6),morale:clamp(f.morale??100,0,100),home:stringId(f.home),guard:!!f.guard,leader:!!f.leader,surrendered:f.team!=='player'&&f.surrendered===true,crowned:f.team==='player'&&f.crowned===true,order:savedOrders.includes(f.order)?f.order:(f.guard?'guard':'follow'),trained:!!f.trained,trainingPaid:!!f.trainingPaid&&!f.trained,trainingProgress:clamp(f.trainingProgress||0,0,TRAINING.duration),trainingCamp:stringId(f.trainingCamp),returnOrder:f.returnOrder==='guard'?'guard':'follow',raidTarget:stringId(f.raidTarget),loot:clamp(f.loot||0,0,1000),surrenderTimer:clamp(f.surrenderTimer??90,0,1000),persuadeCD:clamp(f.persuadeCD||0,0,elapsed+60),firstRecruit:f.firstRecruit===true,recruitXpAwarded:f.recruitXpAwarded===true,tacticalPath:(Array.isArray(f.tacticalPath)?f.tacticalPath:[]).filter(finitePoint).map(savedPoint),tacticalTargetId:stringId(f.tacticalTargetId)};
  // Missing gear is a legacy marker. Only the one-time economy migration may
  // turn old tier visuals into owned equipment; validation never invents gear.
  if(f.equipment===undefined)delete actor.equipment;else actor.equipment=normalizeEquipment(record(f.equipment)?f.equipment:{});
  const contract=record(f.recruitment)?f.recruitment:null,quest=record(contract?.quest)?contract.quest:{};
  const terms=contract?normalizeRecruitment({...contract,requirements:Array.isArray(contract.requirements)?contract.requirements.filter(id=>typeof id==='string'):[],quest:{...quest,accepted:quest.accepted===true}}):null;
  actor.recruitment=terms?.requirements.length?terms:null;
  if(finitePoint(f.creekOrderPoint))actor.creekOrderPoint=savedPoint(f.creekOrderPoint);else delete actor.creekOrderPoint;
  if(f.creekOrderUntil!==undefined)actor.creekOrderUntil=clamp(f.creekOrderUntil,0,elapsed+3600);
  if(f.creekRecoveryAt!==undefined)actor.creekRecoveryAt=clamp(f.creekRecoveryAt,0,elapsed+60);
  if(f.creekTargetId!==undefined)actor.creekTargetId=stringId(f.creekTargetId);
  if(record(f.legacyEquipment))actor.legacyEquipment=normalizeEquipment(f.legacyEquipment);
  if(actor.order==='flank'&&!actor.tacticalTargetId){actor.order='follow';actor.tacticalPath=[];}
  for(const key of ['dead','grabbedBy','combatImpulse','orderTarget','combatTarget','intent','model'])delete actor[key];
  return actor;
}

function savedCamp(c,elapsed){
  const camp={...c,name:typeof c.name==='string'?c.name.slice(0,80):'Καταφύγιο',...savedPoint(c),yaw:savedYaw(c.yaw),tier:Math.floor(clamp(c.tier||1,1,3)),maxHp:clamp(c.maxHp||350,100,10000),gateHp:Number.isFinite(c.gateHp)?clamp(c.gateHp,0,10000):undefined,hp:clamp(c.hp??350,0,clamp(c.maxHp||350,100,10000)),stock:{food:clamp(c.stock?.food||0,0,1e6),reeds:clamp(c.stock?.reeds||0,0,1e6)},buildings:Object.fromEntries(['store','nursery','training','watchtower','palisade'].map(k=>[k,!!c.buildings?.[k]])),morale:clamp(c.morale??100,0,100),destroyed:!!c.destroyed,originalEnemy:!!c.originalEnemy,originalTeam:typeof c.originalTeam==='string'&&/^enemy\d+$/.test(c.originalTeam)?c.originalTeam:null,rivalIndex:Math.floor(clamp(c.rivalIndex??Number((c.team.match(/enemy(\d+)/)||[])[1])??0,0,4)),capturedOnce:!!c.capturedOnce,destroyRewarded:!!c.destroyRewarded,lootTaken:!!c.lootTaken,rebuildTimer:clamp(c.rebuildTimer||0,0,300),persuadeCD:clamp(c.persuadeCD||0,0,elapsed+60),supplyMigrated:!!c.supplyMigrated,spawnTimer:clamp(c.spawnTimer||0,0,10000),mealCount:clamp(c.mealCount||0,0,2),mealDay:clamp(c.mealDay||0,0,1e6),specialization:['production','defense','training'].includes(c.specialization)?c.specialization:null,legacySlots:Math.floor(clamp(c.legacySlots??0,0,5)),underConstruction:c.underConstruction===true,constructionProgress:clamp(c.constructionProgress??(c.underConstruction?0:1),0,1)};
  if(c.natural===true){camp.natural=true;camp.gateHp=0;camp.creekRelation=['hostile','coexist','yielded','respect'].includes(c.creekRelation)?c.creekRelation:'hostile';camp.creekApproach=['share','respect','coexist'].includes(c.creekApproach)?c.creekApproach:'share';camp.creekResolvedAt=clamp(c.creekResolvedAt||0,0,elapsed);camp.creekVictory=['contest','share','respect','coexist'].includes(c.creekVictory)?c.creekVictory:null;}
  camp.buildingPlacements=normalizeBuildingPlacements(camp);
  if(camp.team==='ally'&&(!camp.buildings.nursery||camp.underConstruction))camp.spawnTimer=0;
  delete camp.mesh;delete camp.safe;
  return camp;
}

function savedPredators(rows){
  if(!Array.isArray(rows))return [];
  const phases=['patrol','stalk','windup','lunge','grab','recover','flee','dormant','dead','raid'];
  return rows.filter(p=>record(p)&&Object.hasOwn(PREDATORS,p.type)&&finitePoint(p)).map((p,index)=>{
    const defaults=PREDATORS[p.type],maximum=clamp(p.maxHp??defaults.hp,1,1e7),hp=clamp(p.hp??maximum,0,maximum),dead=p.dead===true||hp===0||p.phase==='dead';
    const predator={...p,id:stringId(p.id)||`saved-${p.type}-${index}`,type:p.type,team:'predator',name:typeof p.name==='string'?p.name.slice(0,80):defaults.name,...savedPoint(p),yaw:savedYaw(p.yaw),hp:dead?0:hp,maxHp:maximum,dead,phase:dead?'dead':phases.includes(p.phase)?p.phase:'patrol',anchor:finitePoint(p.anchor)?savedPoint(p.anchor):savedPoint(p),scale:clamp(p.scale??defaults.scale,.2,12),damage:clamp(p.damage??defaults.damage,0,10000),reach:clamp(p.reach??defaults.reach,.1,60),baseSpeed:clamp(p.baseSpeed??p.speed??defaults.speed,0,80),speed:clamp(p.speed??0,0,80),windup:clamp(p.windup??defaults.windup,.05,30),recover:clamp(p.recover??defaults.recover,.05,30),baseWindup:clamp(p.baseWindup??p.windup??defaults.windup,.05,30),baseRecover:clamp(p.baseRecover??p.recover??defaults.recover,.05,30),eventRole:['guardian','roam','raid'].includes(p.eventRole)?p.eventRole:null,eventSequence:savedCounter(p.eventSequence),realmIndex:savedCounter(p.realmIndex),raidCampId:stringId(p.raidCampId),territoryRadius:clamp(p.territoryRadius??26,1,WORLD_BOUNDARY*2),burstCount:Math.floor(clamp(p.burstCount??1,1,5))};
    for(const key of ['boss','realmEvent','campaignTracked','killAwarded','repelAwarded','defeatNotified','rewardGranted','campaignKillRecorded','guardianReward'])predator[key]=p[key]===true;
    for(const key of ['cooldown','grace','phaseTime','playerDamage','provokedUntil','eventDefeatedAt'])predator[key]=clamp(p[key]??0,0,Number.MAX_SAFE_INTEGER);
    predator.lastCombatAt=clamp(p.lastCombatAt??-100,-100,Number.MAX_SAFE_INTEGER);
    if(Number.isFinite(p.strikeRadius))predator.strikeRadius=clamp(p.strikeRadius,.1,60);else delete predator.strikeRadius;
    predator.respawnAt=Number.isFinite(p.respawnAt)?clamp(p.respawnAt,0,Number.MAX_SAFE_INTEGER):null;
    for(const key of ['model','grabbed','target','targetId','_aiReady','combatImpulse'])delete predator[key];
    return predator;
  });
}

function savedRealmEvents(value,elapsed){
  const source=record(value)?value:{};
  return {sequence:savedCounter(source.sequence),nextGuardianAt:clamp(source.nextGuardianAt??elapsed+150,0,Number.MAX_SAFE_INTEGER),nextRoamAt:clamp(source.nextRoamAt??elapsed+300,0,Number.MAX_SAFE_INTEGER),nextRaidAt:clamp(source.nextRaidAt??elapsed+720,0,Number.MAX_SAFE_INTEGER),recentDefeats:savedStrings(source.recentDefeats),kills:savedCounter(source.kills),bossKills:savedCounter(source.bossKills)};
}

/** Shared local validation, with no unit/camp/job count ceiling. */
function normalizeLocalSave(copy,{player=false}={}){
  migrateWorldSave(copy);copy.elapsed=clamp(copy.elapsed||0,0,1e8);copy.worldRevision=WORLD_REVISION;
  if(player)copy.player=savedActor({...copy.player,team:'player',id:'player'},copy.elapsed);
  copy.frogs=copy.frogs.filter(f=>record(f)&&stringId(f.id)&&finitePoint(f)&&Number.isFinite(f.hp)&&f.hp>0&&f.dead!==true&&validTeam(f.team)&&f.team!=='player').map(f=>savedActor(f,copy.elapsed));
  copy.camps=copy.camps.filter(c=>record(c)&&stringId(c.id)&&finitePoint(c)&&validTeam(c.team)).map(c=>savedCamp(c,copy.elapsed));
  if(copy.predators!==undefined)copy.predators=savedPredators(copy.predators);
  const economy=record(copy.economy)?copy.economy:record(copy.realmEconomy)?copy.realmEconomy:null;
  if(economy)copy.economy=normalizeRealmEconomySave(economy);else delete copy.economy;
  delete copy.realmEconomy;
  copy.hotspots=(Array.isArray(copy.hotspots)?copy.hotspots:[]).filter(h=>record(h)&&stringId(h.id)).map(h=>({id:h.id,flies:clamp(h.flies??0,0,1e6)}));
  if(copy.realmEvents!==undefined)copy.realmEvents=savedRealmEvents(copy.realmEvents,copy.elapsed);
  if(copy.creekSociety!==undefined)copy.creekSociety=normalizeCreekSociety(record(copy.creekSociety)?copy.creekSociety:{},copy.elapsed);
  copy.nextRaid=clamp(copy.nextRaid??copy.elapsed+90,copy.elapsed,copy.elapsed+300);copy.graceUntil=clamp(copy.graceUntil??copy.elapsed,0,copy.elapsed+90);
  copy.idCounter=savedCounter(copy.idCounter);copy.pendingRivalRecoveryCampId=stringId(copy.pendingRivalRecoveryCampId);
  return copy;
}

function savedRealmState(value,worldRevision,elapsed){
  if(!record(value))return null;
  const regions={},active=savedCounter(value.active);
  for(const [key,row] of Object.entries(record(value.regions)?value.regions:{})){
    const index=Number(key);if(!/^\d+$/.test(key)||!Number.isSafeInteger(index)||!record(row))continue;
    let snapshot=null;
    if(record(row.snapshot)&&Array.isArray(row.snapshot.frogs)&&Array.isArray(row.snapshot.camps)){
      snapshot=row.snapshot;
      for(const global of ['player','resources','realms','stats','won','settings','pendingRespawn'])delete snapshot[global];
      snapshot.worldRevision??=worldRevision;snapshot.elapsed??=row.lastActiveAt??elapsed;
      snapshot=normalizeLocalSave(snapshot);
    }
    regions[index]={index,name:typeof row.name==='string'?row.name.slice(0,120):'',seed:savedCounter(row.seed),level:Math.max(1,savedCounter(row.level)),biome:['creek','mist','autumn','roots'].includes(row.biome)?row.biome:'creek',visitedAt:clamp(row.visitedAt??0,0,Number.MAX_SAFE_INTEGER),lastActiveAt:clamp(row.lastActiveAt??0,0,Number.MAX_SAFE_INTEGER),snapshot};
  }
  const unlocked=[...new Set([0,active,...Object.keys(regions).map(Number),...(Array.isArray(value.unlocked)?value.unlocked.filter(v=>Number.isSafeInteger(v)&&v>=0):[])])].sort((a,b)=>a-b);
  return {version:1,active,unlocked,regions,events:savedRealmEvents(value.events,elapsed),backgroundAccumulator:clamp(value.backgroundAccumulator??0,0,.999)};
}

export function validateSave(data){
  if(!record(data)||data.version!==SAVE_VERSION||!record(data.player)||!Array.isArray(data.frogs)||!Array.isArray(data.camps))return null;
  if(!Number.isFinite(data.player.x)||!Number.isFinite(data.player.z)||!Number.isFinite(data.player.hp))return null;
  const copy=cloneSaveData(data);if(!copy)return null;
  const originalRevision=copy.worldRevision??1,pendingRespawn=copy.pendingRespawn===true||copy.player.dead===true||copy.player.hp<=0;
  normalizeLocalSave(copy,{player:true});
  copy.resources={food:clamp(copy.resources?.food||0,0,1e6),reeds:clamp(copy.resources?.reeds||0,0,1e6),pearls:clamp(copy.resources?.pearls||0,0,1e6)};
  copy.pendingRespawn=pendingRespawn;copy.savedAt=savedCounter(copy.savedAt);
  copy.campaign=record(copy.campaign)?createCampaign(copy.campaign):null;
  copy.stats={...(record(copy.stats)?copy.stats:{})};
  for(const key of ['trained','gatheredFood','gatheredReeds','kills','losses','recruited','campsBuilt','campsCaptured','flies','raidsDefended','predatorsKilled','predatorsRepelled','pearlsFound','crafted','constructionCompleted'])copy.stats[key]=clamp(copy.stats[key]||0,0,Number.MAX_SAFE_INTEGER);
  if(copy.realms!==undefined)copy.realms=savedRealmState(copy.realms,originalRevision,copy.elapsed);
  if(copy.guide!==undefined){const guide=record(copy.guide)?copy.guide:{};copy.guide={version:1,seen:savedStrings(guide.seen),hinted:savedStrings(guide.hinted),distance:clamp(guide.distance??0,0,Number.MAX_SAFE_INTEGER),groupsSaved:savedCounter(guide.groupsSaved),tutorialDismissed:guide.tutorialDismissed===true};}
  if(copy.tacticalGroups!==undefined)copy.tacticalGroups=(Array.isArray(copy.tacticalGroups)?copy.tacticalGroups:[]).filter(g=>record(g)&&['1','2','3'].includes(String(g.id))).map(g=>({id:String(g.id),ids:savedStrings(g.ids)}));
  if(record(copy.creek)){copy.creek=normalizeCreekState(copy.creek,{elapsed:copy.elapsed,realmIndex:copy.realms?.active||0});copy.creekMode=true;}else delete copy.creek;
  copy.won=!!copy.won;return copy;
}
export function mulberry32(seed){return()=>{let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}

