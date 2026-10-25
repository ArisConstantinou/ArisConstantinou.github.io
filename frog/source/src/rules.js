/** Pure game rules. Rendering and input cannot change these constraints. */
import {createCampaign, TRAINING} from './campaign.js';
import {normalizeBuildingPlacements} from './placement-rules.js';
import {WORLD_BOUNDARY,WORLD_REVISION} from './world-config.js';
import {migrateWorldSave} from './save-migration.js';
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
  shelter:{name:'Νέο οχυρό',description:'Κάστρο με κλειστό περίβολο, πύλη, πύργους και αυλή για κτίρια. Οι εχθροί πρέπει να σπάσουν την πύλη.',cost:{food:12,reeds:30}},
  store:{name:'Αποθήκη',description:'Περισσότερη ασφαλής τροφή και καλύτερη συλλογή πόρων.',cost:{food:10,reeds:20}},
  nursery:{name:'Φωλιά στρατολόγησης',description:'Νέος βάτραχος κάθε 85″ με 10 τροφή / 6 υλικά, χωρίς όριο πληθυσμού. Οι αναβαθμίσεις μειώνουν τον χρόνο σε 70″ / 55″. Χρειάζεται ασφαλή βάση.',cost:{food:22,reeds:28}},
  training:{name:'Χώρος εκπαίδευσης',description:'Εκπαιδεύει κάθε σύμμαχο μία φορά: 8 τροφή / 4 υλικά και 18″ για επίπεδο και βαθμίδα II.',cost:{food:18,reeds:24}},
  watchtower:{name:'Σκοπιά',description:'Ανάθεσε φρουρούς από την Άμυνα. Προτεινόμενη φρουρά 4 βατράχων, εντοπισμός στα 36μ και 18% λιγότερη ζημιά στους φρουρούς μέσα στην περιοχή.',cost:{food:12,reeds:24}},
  palisade:{name:'Οχυρά τείχη',description:'Ενισχύει ολόκληρο τον περίβολο του κάστρου: +180 αντοχή βάσης, +140 αντοχή πύλης και λιγότερη ζημιά από πολιορκία.',cost:{food:8,reeds:30}},
  upgrade:{name:'Αναβάθμιση βάσης',description:'Επόμενη βαθμίδα, +150 αντοχή και ταχύτερες ενισχύσεις από τη φωλιά. Οι βάσεις χρειάζονται φρουρούς για να κρατήσουν τις περιοχές τους.',cost:{food:30,reeds:40}},
  repair:{name:'Επισκευή',description:'Επισκευάζει 150 αντοχή του κάστρου και 120 αντοχή της πύλης.',cost:{food:3,reeds:12}}
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
export function gangCapacity(camps){return 6+camps.filter(c=>c.team==='ally'&&!c.destroyed).reduce((sum,c)=>sum+4+(c.tier||1)*2+(c.buildings?.nursery?3:0),0);}
export function dayState(elapsed){
  const phase=((elapsed/600+.375)%1+1)%1;
  const daylight=clamp(Math.sin(phase*Math.PI*2-Math.PI/2)*1.35,0,1);
  const hours=Math.floor(phase*24),minutes=Math.floor((phase*24-hours)*60);
  return {phase,daylight,night:daylight<.2,day:Math.floor((elapsed+225)/600)+1,timeLabel:`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`};
}
export function validateSave(data){
  if(!data||data.version!==SAVE_VERSION||!data.player||typeof data.player!=='object'||!Array.isArray(data.frogs)||!Array.isArray(data.camps))return null;
  if(!Number.isFinite(data.player.x)||!Number.isFinite(data.player.z)||!Number.isFinite(data.player.hp))return null;
  const copy=migrateWorldSave(JSON.parse(JSON.stringify(data)));copy.elapsed=clamp(copy.elapsed||0,0,1e8);copy.worldRevision=WORLD_REVISION;
  copy.resources={food:clamp(copy.resources?.food||0,0,1e6),reeds:clamp(copy.resources?.reeds||0,0,1e6)};
  const validTeam=t=>typeof t==='string'&&/^(player|ally|neutral|enemy\d*)$/.test(t);
  const orders=['follow','attack','guard','forage','regroup','training'];
  const actor=f=>({...f,name:typeof f.name==='string'?f.name.slice(0,60):'Βάτραχος',role:Object.hasOwn(ROLE_NAMES,f.role)?f.role:'hunter',x:clamp(f.x,-WORLD_BOUNDARY,WORLD_BOUNDARY),z:clamp(f.z,-WORLD_BOUNDARY,WORLD_BOUNDARY),yaw:Number.isFinite(f.yaw)?f.yaw:0,maxHp:clamp(f.maxHp||100,25,10000),hp:clamp(f.hp,1,clamp(f.maxHp||100,25,10000)),stomach:clamp(f.stomach||0,0,100),maxStomach:100,level:Math.floor(clamp(f.level||1,1,99)),tier:Math.floor(clamp(f.tier||1,1,3)),xp:clamp(f.xp||0,0,1e6),morale:clamp(f.morale??100,0,100),home:typeof f.home==='string'?f.home:null,guard:!!f.guard,leader:!!f.leader,surrendered:!!f.surrendered,order:orders.includes(f.order)?f.order:(f.guard?'guard':'follow'),trained:!!f.trained,trainingPaid:!!f.trainingPaid&&!f.trained,trainingProgress:clamp(f.trainingProgress||0,0,TRAINING.duration),trainingCamp:typeof f.trainingCamp==='string'?f.trainingCamp:null,returnOrder:f.returnOrder==='guard'?'guard':'follow',raidTarget:typeof f.raidTarget==='string'?f.raidTarget:null,loot:clamp(f.loot||0,0,1000),surrenderTimer:clamp(f.surrenderTimer??90,0,1000),persuadeCD:clamp(f.persuadeCD||0,0,copy.elapsed+60)});
  copy.player=actor({...copy.player,team:'player',id:'player'});
  copy.frogs=copy.frogs.filter(f=>f&&typeof f==='object'&&typeof f.id==='string'&&Number.isFinite(f.x)&&Number.isFinite(f.z)&&f.hp>0&&validTeam(f.team)&&f.team!=='player').map(actor);
  copy.camps=copy.camps.filter(c=>c&&typeof c==='object'&&typeof c.id==='string'&&Number.isFinite(c.x)&&Number.isFinite(c.z)&&validTeam(c.team)).map(c=>({...c,name:typeof c.name==='string'?c.name.slice(0,80):'Καταφύγιο',x:clamp(c.x,-WORLD_BOUNDARY,WORLD_BOUNDARY),z:clamp(c.z,-WORLD_BOUNDARY,WORLD_BOUNDARY),yaw:Number.isFinite(c.yaw)?Math.atan2(Math.sin(c.yaw),Math.cos(c.yaw)):0,tier:Math.floor(clamp(c.tier||1,1,3)),maxHp:clamp(c.maxHp||350,100,10000),gateHp:Number.isFinite(c.gateHp)?clamp(c.gateHp,0,10000):undefined,hp:clamp(c.hp??350,0,clamp(c.maxHp||350,100,10000)),stock:{food:clamp(c.stock?.food||0,0,1e6),reeds:clamp(c.stock?.reeds||0,0,1e6)},buildings:Object.fromEntries(['store','nursery','training','watchtower','palisade'].map(k=>[k,!!c.buildings?.[k]])),morale:clamp(c.morale??100,0,100),destroyed:!!c.destroyed,originalEnemy:!!c.originalEnemy,originalTeam:typeof c.originalTeam==='string'&&/^enemy\d+$/.test(c.originalTeam)?c.originalTeam:null,rivalIndex:Math.floor(clamp(c.rivalIndex??Number((c.team.match(/enemy(\d+)/)||[])[1])??0,0,4)),capturedOnce:!!c.capturedOnce,destroyRewarded:!!c.destroyRewarded,rebuildTimer:clamp(c.rebuildTimer||0,0,300),persuadeCD:clamp(c.persuadeCD||0,0,copy.elapsed+60),supplyMigrated:!!c.supplyMigrated,spawnTimer:clamp(c.spawnTimer||0,0,10000),mealCount:clamp(c.mealCount||0,0,2),mealDay:clamp(c.mealDay||0,0,1e6)}));
  for(const camp of copy.camps)camp.buildingPlacements=normalizeBuildingPlacements(camp);
  copy.campaign=copy.campaign&&typeof copy.campaign==='object'?createCampaign(copy.campaign):null;
  copy.stats={...(copy.stats&&typeof copy.stats==='object'?copy.stats:{})};
  for(const key of ['trained','gatheredFood','gatheredReeds'])copy.stats[key]=clamp(copy.stats[key]||0,0,1e8);
  copy.nextRaid=clamp(copy.nextRaid??(copy.elapsed+90),copy.elapsed,copy.elapsed+300);copy.graceUntil=clamp(copy.graceUntil??copy.elapsed,0,copy.elapsed+90);
  copy.idCounter=Math.floor(clamp(copy.idCounter||0,0,1e8));copy.won=!!copy.won;
  return copy;
}
export function mulberry32(seed){return()=>{let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}

