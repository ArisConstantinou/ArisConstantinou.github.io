/** Pure game rules. Rendering and input cannot change these constraints. */
import {createCampaign, TRAINING} from './campaign.js';
import {normalizeBuildingPlacements} from './placement-rules.js';
import {WORLD_MOVE_LIMIT, WORLD_LAYOUT_VERSION, WORLD_SCALE} from './world-config.js';
export const SAVE_VERSION = 1;
export const BALANCE_VERSION = 2;
export const RECRUIT_INTERVAL = 12;
export const NURSERY_INTERVAL = 100;
export const NURSERY_COST = Object.freeze({food:16,reeds:8});
export const SAVE_KEY = 'frog-creek-dominion-v1';
export const COLORS = {player:0xe4f58c,ally:0x72edbb,enemy:0xff7865,neutral:0xeed585,predator:0xffa54f,surrender:0xffe59b};
export const ROLE_NAMES = {scout:'Ανιχνευτής',bruiser:'Μαχητής',caller:'Κράχτης',hunter:'Κυνηγός'};
export const PREDATORS = {
  heron:{name:'Ο Ερωδιός',hp:650,speed:3.5,damage:30,reach:4.2,windup:1.25,recover:1.55,grab:3.7,scale:1.25},
  snake:{name:'Το Νερόφιδο',hp:470,speed:4.6,damage:24,reach:3.1,windup:1.0,recover:1.45,grab:4.2,scale:1.1},
  fish:{name:'Ο Κυνηγός του Βυθού',hp:540,speed:5.7,damage:35,reach:3.6,windup:1.5,recover:2,grab:3.5,scale:1.2}
};
export const BUILDINGS = {
  shelter:{name:'Νέο καταφύγιο',description:'+3 θέσεις συμμάχων και 2 θέσεις κτιρίων. Οι επόμενες βάσεις κοστίζουν περισσότερο και χρειάζονται φρουρά.',cost:{food:12,reeds:30}},
  store:{name:'Αποθήκη',description:'Παράγει 9 τροφή και 5,4 υλικά ανά λεπτό μαζί με τη βάση, όταν είναι ασφαλής. Καταλαμβάνει μία θέση κτιρίου.',cost:{food:24,reeds:36}},
  nursery:{name:'Φωλιά στρατολόγησης',description:'+2 θέσεις συμμάχων. Ένας νέος βάτραχος ανά 100″ ασφαλούς λειτουργίας, με κόστος 16 τροφή / 8 υλικά.',cost:{food:34,reeds:46}},
  training:{name:'Χώρος εκπαίδευσης',description:'Εκπαίδευση αντί για περισσότερους νεοσύλλεκτους: 8 τροφή / 4 υλικά και 18″ ανά βάτραχο για βαθμίδα II.',cost:{food:22,reeds:36}},
  watchtower:{name:'Σκοπιά',description:'Χρειάζεται φρουρούς από την ομάδα σου: εντοπισμός στα 26μ και 18% προστασία στους φρουρούς. Προτεινόμενη φρουρά 4.',cost:{food:18,reeds:34}},
  palisade:{name:'Περίφραξη',description:'+180 αντοχή στη βάση. Κερδίζει χρόνο απέναντι σε επιδρομές, αλλά καταλαμβάνει θέση παραγωγής ή εκπαίδευσης.',cost:{food:12,reeds:44}},
  upgrade:{name:'Αναβάθμιση βάσης',description:'+3 θέσεις συμμάχων, περισσότερες θέσεις κτιρίων και +150 αντοχή. Βαθμίδες I / II / III: 2 / 4 / 5 κτίρια.',cost:{food:42,reeds:60}},
  repair:{name:'Επισκευή',description:'Αποκαθιστά 150 αντοχή στο καταφύγιο.',cost:{food:3,reeds:12}}
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
export function isVictory(camps){return camps.some(c=>c.originalEnemy)&&camps.filter(c=>c.originalEnemy).every(c=>c.team==='ally'&&!c.destroyed);}
export function gangCapacity(camps){return 6+camps.filter(c=>c.team==='ally'&&!c.destroyed).reduce((sum,c)=>sum+3+((c.tier||1)-1)*3+(c.buildings?.nursery?2:0),0);}
export function buildingSlots(camp){return [0,2,4,5][Math.floor(clamp(camp?.tier||1,1,3))];}
export function usedBuildingSlots(camp){return ['store','nursery','training','watchtower','palisade'].filter(type=>camp?.buildings?.[type]).length;}
export function buildingCost(type,camps=[],camp=null){
  const base=BUILDINGS[type]?.cost;if(!base)return {};
  if(type==='shelter'){const owned=camps.filter(c=>c.team==='ally'&&!c.destroyed).length;return {food:base.food+24*owned,reeds:base.reeds+32*owned};}
  if(type==='upgrade'){const tier=camp?.tier||1;return {food:base.food*tier,reeds:base.reeds*tier};}
  return {...base};
}
/** Migrate once while keeping actors near their unchanged-size shelter courtyards. */
export function migrateWorldLayout(save){
  if(!save||save.worldLayoutVersion>=WORLD_LAYOUT_VERSION)return save;
  const oldCamps=save.camps.map(c=>({id:c.id,x:c.x,z:c.z}));
  for(const actor of [save.player,...save.frogs]){
    const home=oldCamps.find(c=>c.id===actor.home&&Math.hypot(actor.x-c.x,actor.z-c.z)<20)||oldCamps.find(c=>Math.hypot(actor.x-c.x,actor.z-c.z)<20);
    actor.x=clamp(home?home.x*WORLD_SCALE+(actor.x-home.x):actor.x*WORLD_SCALE,-WORLD_MOVE_LIMIT,WORLD_MOVE_LIMIT);
    actor.z=clamp(home?home.z*WORLD_SCALE+(actor.z-home.z):actor.z*WORLD_SCALE,-WORLD_MOVE_LIMIT,WORLD_MOVE_LIMIT);
  }
  for(const camp of save.camps){camp.x=clamp(camp.x*WORLD_SCALE,-WORLD_MOVE_LIMIT,WORLD_MOVE_LIMIT);camp.z=clamp(camp.z*WORLD_SCALE,-WORLD_MOVE_LIMIT,WORLD_MOVE_LIMIT);}
  save.worldLayoutVersion=WORLD_LAYOUT_VERSION;return save;
}
export function dayState(elapsed){
  const phase=((elapsed/600+.375)%1+1)%1;
  const daylight=clamp(Math.sin(phase*Math.PI*2-Math.PI/2)*1.35,0,1);
  const hours=Math.floor(phase*24),minutes=Math.floor((phase*24-hours)*60);
  return {phase,daylight,night:daylight<.2,day:Math.floor((elapsed+225)/600)+1,timeLabel:`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`};
}
export function validateSave(data){
  if(!data||data.version!==SAVE_VERSION||!data.player||typeof data.player!=='object'||!Array.isArray(data.frogs)||!Array.isArray(data.camps))return null;
  if(!Number.isFinite(data.player.x)||!Number.isFinite(data.player.z)||!Number.isFinite(data.player.hp))return null;
  const copy=JSON.parse(JSON.stringify(data));copy.elapsed=clamp(copy.elapsed||0,0,1e8);
  copy.resources={food:clamp(copy.resources?.food||0,0,1e6),reeds:clamp(copy.resources?.reeds||0,0,1e6)};
  const validTeam=t=>typeof t==='string'&&/^(player|ally|neutral|enemy\d*)$/.test(t);
  const orders=['follow','attack','guard','forage','regroup','training'];
  const actor=f=>({...f,name:typeof f.name==='string'?f.name.slice(0,60):'Βάτραχος',role:Object.hasOwn(ROLE_NAMES,f.role)?f.role:'hunter',x:clamp(f.x,-WORLD_MOVE_LIMIT,WORLD_MOVE_LIMIT),z:clamp(f.z,-WORLD_MOVE_LIMIT,WORLD_MOVE_LIMIT),yaw:Number.isFinite(f.yaw)?f.yaw:0,maxHp:clamp(f.maxHp||100,25,10000),hp:clamp(f.hp,1,clamp(f.maxHp||100,25,10000)),stomach:clamp(f.stomach||0,0,100),maxStomach:100,level:Math.floor(clamp(f.level||1,1,99)),tier:Math.floor(clamp(f.tier||1,1,3)),xp:clamp(f.xp||0,0,1e6),morale:clamp(f.morale??100,0,100),home:typeof f.home==='string'?f.home:null,guard:!!f.guard,leader:!!f.leader,surrendered:!!f.surrendered,order:orders.includes(f.order)?f.order:(f.guard?'guard':'follow'),trained:!!f.trained,trainingPaid:!!f.trainingPaid&&!f.trained,trainingProgress:clamp(f.trainingProgress||0,0,TRAINING.duration),trainingCamp:typeof f.trainingCamp==='string'?f.trainingCamp:null,returnOrder:f.returnOrder==='guard'?'guard':'follow'});
  copy.player=actor({...copy.player,team:'player',id:'player'});
  copy.frogs=copy.frogs.filter(f=>f&&typeof f==='object'&&typeof f.id==='string'&&Number.isFinite(f.x)&&Number.isFinite(f.z)&&f.hp>0&&validTeam(f.team)&&f.team!=='player').map(actor);
  copy.camps=copy.camps.filter(c=>c&&typeof c==='object'&&typeof c.id==='string'&&Number.isFinite(c.x)&&Number.isFinite(c.z)&&validTeam(c.team)).map(c=>({...c,name:typeof c.name==='string'?c.name.slice(0,80):'Καταφύγιο',x:clamp(c.x,-WORLD_MOVE_LIMIT,WORLD_MOVE_LIMIT),z:clamp(c.z,-WORLD_MOVE_LIMIT,WORLD_MOVE_LIMIT),yaw:Number.isFinite(c.yaw)?Math.atan2(Math.sin(c.yaw),Math.cos(c.yaw)):0,tier:Math.floor(clamp(c.tier||1,1,3)),maxHp:clamp(c.maxHp||350,100,10000),hp:clamp(c.hp??350,0,clamp(c.maxHp||350,100,10000)),stock:{food:clamp(c.stock?.food||0,0,1e6),reeds:clamp(c.stock?.reeds||0,0,1e6)},buildings:Object.fromEntries(['store','nursery','training','watchtower','palisade'].map(k=>[k,!!c.buildings?.[k]])),morale:clamp(c.morale??100,0,100),destroyed:!!c.destroyed,originalEnemy:!!c.originalEnemy,supplyMigrated:!!c.supplyMigrated,spawnTimer:clamp(c.spawnTimer||0,0,10000),mealCount:clamp(c.mealCount||0,0,2),mealDay:clamp(c.mealDay||0,0,1e6)}));
  for(const camp of copy.camps){
    camp.buildingPlacements=normalizeBuildingPlacements(camp);
    for(const key of ['rivalDevelopTimer','rivalExpansionTimer'])camp[key]=clamp(camp[key]||0,0,240);
    for(const key of ['rivalRaidReadyAt','secureUntil','persuadeCD','repairReadyAt'])camp[key]=clamp(camp[key]||0,0,copy.elapsed+240);
    camp.rivalOutpostBuilt=!!camp.rivalOutpostBuilt;camp.rivalOrigin=typeof camp.rivalOrigin==='string'?camp.rivalOrigin:null;
    const expansion=camp.rivalExpansion;
    camp.rivalExpansion=expansion&&typeof expansion==='object'&&Number.isFinite(expansion.x)&&Number.isFinite(expansion.z)&&Math.abs(expansion.x)<=WORLD_MOVE_LIMIT&&Math.abs(expansion.z)<=WORLD_MOVE_LIMIT&&expansion.team===camp.team&&camp.team.startsWith('enemy')&&!camp.destroyed&&Number.isFinite(expansion.readyAt)
      ?{siteId:typeof expansion.siteId==='string'?expansion.siteId:null,x:expansion.x,z:expansion.z,team:camp.team,readyAt:clamp(expansion.readyAt,copy.elapsed,copy.elapsed+45)}:null;
  }
  for(const frog of [copy.player,...copy.frogs]){
    frog.raidTarget=typeof frog.raidTarget==='string'&&copy.camps.some(c=>c.id===frog.raidTarget)?frog.raidTarget:null;
    frog.raidStartedAt=clamp(frog.raidStartedAt||0,0,copy.elapsed);
    frog.persuadeCD=clamp(frog.persuadeCD||0,0,copy.elapsed+RECRUIT_INTERVAL);
    frog.gatherReadyAt=clamp(frog.gatherReadyAt||0,0,copy.elapsed+4);
    frog.surrenderTimer=clamp(frog.surrenderTimer??120,0,120);frog.loot=clamp(frog.loot||0,0,1000);
  }
  copy.campaign=copy.campaign&&typeof copy.campaign==='object'?createCampaign(copy.campaign):null;
  copy.stats={...(copy.stats&&typeof copy.stats==='object'?copy.stats:{})};
  for(const key of ['trained','gatheredFood','gatheredReeds'])copy.stats[key]=clamp(copy.stats[key]||0,0,1e8);
  copy.idCounter=Math.floor(clamp(copy.idCounter||0,0,1e8));copy.won=!!copy.won;
  copy.nextRaid=clamp(copy.nextRaid??copy.elapsed+30,copy.elapsed,copy.elapsed+240);copy.graceUntil=clamp(copy.graceUntil??copy.elapsed,0,copy.elapsed+45);copy.nextRecruitAt=clamp(copy.nextRecruitAt||0,0,copy.elapsed+RECRUIT_INTERVAL);
  return migrateWorldLayout(copy);
}
export function mulberry32(seed){return()=>{let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}

