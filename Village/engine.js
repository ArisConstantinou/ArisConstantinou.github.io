import {LOCATIONS,LOCATION_MAP} from './locations.js?v=1.1.2';
import {SAVE_VERSION,STORAGE_KEY,DAY_SECONDS,CAMPAIGN_SECONDS,OFFLINE_CAP_SECONDS,SANDBOX_SPEED,RESOURCES,ROLES,PROJECTS,BARTERS,EVENTS,NPCS,MISSIONS,CHAPTERS} from './game-content.js?v=1.1.2';
export {SAVE_VERSION,STORAGE_KEY,DAY_SECONDS,CAMPAIGN_SECONDS,OFFLINE_CAP_SECONDS,SANDBOX_SPEED,RESOURCES,ROLES,PROJECTS,BARTERS,EVENTS,NPCS,MISSIONS,CHAPTERS};

const PROJECT_MAP=Object.assign(Object.create(null),Object.fromEntries(PROJECTS.map(p=>[p.id,p])));
const MISSION_MAP=Object.assign(Object.create(null),Object.fromEntries(MISSIONS.map(m=>[m.id,m])));
const ROLE_MAP=Object.assign(Object.create(null),Object.fromEntries(ROLES.map(r=>[r.id,r])));
const EVENT_MAP=Object.assign(Object.create(null),Object.fromEntries(EVENTS.map(e=>[e.id,e])));
const NPC_MAP=Object.assign(Object.create(null),Object.fromEntries(NPCS.map(n=>[n.id,n])));
const RESOURCE_KEYS=Object.keys(RESOURCES);
const METRIC_KEYS=['trust','order','heritage','nature'];
const ROLE_KEYS=ROLES.map(r=>r.id);
const RESOURCE_LIMITS={money:100000000,wood:1000000,stone:1000000,food:1000000,goods:1000000};
const MAX_ELAPSED=315360000;
const EPSILON=1e-7;
const clamp=(v,min=0,max=100)=>Math.min(max,Math.max(min,v));
const round=v=>Math.round(v*1000000)/1000000;
const clone=v=>JSON.parse(JSON.stringify(v));
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const has=(s,id)=>s.completedProjects.includes(id);
const okay=message=>({ok:true,message});
const fail=message=>({ok:false,message});
const moneyFormatter=new Intl.NumberFormat('el-CY',{minimumFractionDigits:2,maximumFractionDigits:2});
export const formatMoney=value=>`CY£ ${moneyFormatter.format(Number.isFinite(value)?value:0)}`;
export function formatDuration(seconds){
  const s=Math.max(0,Math.ceil(Number.isFinite(seconds)?seconds:0));
  if(s<60)return `${s}δ`;
  const minutes=Math.ceil(s/60);
  if(minutes<60)return `${minutes}λ`;
  const hours=Math.floor(minutes/60),rest=minutes%60;
  return rest?`${hours}ω ${rest}λ`:`${hours}ω`;
}
export function getFreeWorkers(state){
  return Math.max(0,state.workers.total-Object.values(state.workers.assignments).reduce((a,b)=>a+b,0)-state.jobs.reduce((a,b)=>a+b.workers,0));
}
export function getChapter(state){
  const chapter=[...CHAPTERS].reverse().find(c=>state.elapsed>=c.minElapsed)||CHAPTERS[0];
  const next=CHAPTERS[CHAPTERS.indexOf(chapter)+1];
  const end=next?next.minElapsed:CAMPAIGN_SECONDS;
  return {...chapter,progress:clamp((state.elapsed-chapter.minElapsed)/Math.max(1,end-chapter.minElapsed),0,1),nextAt:end,nextName:next?.name||'Η κοινότητα στάθηκε στα πόδια της'};
}

// Rates are per 3,600 simulated seconds. Campaign: one real hour.
// Sandbox: 240 simulated seconds per real second, clearly exposed to the UI.
export function getEconomyRates(state){
  const a=state.workers.assignments;
  const factor=id=>.30+.70*state.buildings[id].condition/100;
  const wood=a.wood*9*factor('forest')*(.20+.80*state.metrics.nature/100);
  const stone=a.stone*11*factor('stone');
  const food=a.farm*16*factor('orchard')*(has(state,'orchard_expand')?1.18:1);
  const potentialGoods=state.buildings.woodshop.condition>=55?a.craft*3*factor('woodshop')*(has(state,'master_craft')?1.45:1):0;
  const goods=state.resources.wood<=EPSILON?Math.min(potentialGoods,wood/2):potentialGoods;
  const tourism=state.buildings.inn.condition>=55?a.tourism*12*factor('inn')*(.45+.55*state.metrics.trust/100)*(.60+.40*state.metrics.heritage/100)*(has(state,'trail_clear')?1.2:1)*(has(state,'guest_network')?1.3:1):0;
  const paymentRate=clamp(.28+state.metrics.order*.0045+state.metrics.trust*.0015+(has(state,'office_archive')?.12:0),.15,.99);
  const taxes=36*(state.tax/.08)*paymentRate;
  const community=4;
  const workingWorkers=state.workers.total-getFreeWorkers(state);
  const wages=workingWorkers*.55;
  const restored=Object.values(state.buildings).filter(b=>b.condition>=60).length;
  const upkeep=3.8+restored*.24;
  const foodConsumption=state.population*.22*(has(state,'oven_restore')?.82:1);
  const income={taxes,tourism,community,total:taxes+tourism+community};
  const expenses={wages,upkeep,total:wages+upkeep};
  const net=income.total-expenses.total;
  return {income,expenses,net,production:{wood,stone,food,goods},potentialProduction:{goods:potentialGoods},consumption:{wood:goods*2,food:foodConsumption},netResources:{wood:wood-goods*2,stone,food:food-foodConsumption,goods,money:net},paymentRate,freeWorkers:getFreeWorkers(state),workingWorkers};
}

function costReason(state,cost){
  const missing=Object.entries(cost||{}).filter(([key,value])=>state.resources[key]+EPSILON<value);
  if(!missing.length)return '';
  return 'Λείπουν: '+missing.map(([key,value])=>key==='money'?formatMoney(value-state.resources[key]):`${Math.ceil(value-state.resources[key])} ${RESOURCES[key].short.toLowerCase()}`).join(', ')+'.';
}
// Office replies and physical visits share one economy/cooldown, but only visits
// may advance exploration or inspect a construction site.
export function getDialogueStatus(state,npcId,choiceId,context='onsite'){
  const npc=NPC_MAP[npcId],remaining=Math.max(0,(own(state.dialogueCooldowns,npcId)?state.dialogueCooldowns[npcId]:0)-state.elapsed);
  const no=(code,reason)=>({available:false,code,reason,remaining});
  if(!npc)return no('unknown','Δεν βρέθηκε αυτός ο κάτοικος.');
  const choice=npc.choices.find(c=>c.id===choiceId);
  if(!choice)return no('unknown','Διάλεξε μια από τις διαθέσιμες συζητήσεις.');
  if(!['office','onsite'].includes(context))return no('unknown','Δεν βρέθηκε αυτός ο τρόπος συζήτησης.');
  if(context==='office'&&state.selectedBuilding!=='office')return no('location','Επέστρεψε στο κοινοτικό γραφείο για να απαντήσεις στα αιτήματα.');
  if(context==='onsite'&&state.selectedBuilding!==npc.buildingId)return no('location',`Συνάντησε ${npc.name} στο σημείο «${LOCATION_MAP[npc.buildingId].name}» ή απάντησε από το κοινοτικό γραφείο.`);
  if(remaining>0)return no('cooldown',`Η επόμενη ουσιαστική συζήτηση με ${npc.name} ανοίγει σε ${formatDuration(remaining)}.`);
  const reason=costReason(state,choice.cost);
  if(reason)return no('cost',reason);
  return {available:true,code:'ready',reason:'Έτοιμο για απάντηση.',remaining:0};
}
export function getProjectStatus(state,project,buildingId){
  const p=PROJECT_MAP[typeof project==='string'?project:project?.id];
  if(!p)return {available:false,reason:'Δεν βρέθηκε αυτό το έργο.',targetId:null,cost:{},duration:0};
  let targetId=p.buildingId;
  if(p.allowHouses){
    if(buildingId!==undefined&&buildingId!==null){
      if(LOCATION_MAP[buildingId]?.type!=='house')return {available:false,reason:'Διάλεξε ένα πέτρινο σπίτι στον χάρτη.',targetId:null,cost:p.cost,duration:p.duration};
      targetId=buildingId;
    }else if(LOCATION_MAP[state.selectedBuilding]?.type==='house'&&state.buildings[state.selectedBuilding].condition<100){
      targetId=state.selectedBuilding;
    }else{
      targetId=LOCATIONS.filter(b=>b.type==='house'&&state.buildings[b.id].condition<100&&!state.jobs.some(j=>j.buildingId===b.id)).sort((a,b)=>state.buildings[a.id].condition-state.buildings[b.id].condition)[0]?.id;
    }
  }else if(buildingId!==undefined&&buildingId!==null&&buildingId!==p.buildingId){
    return {available:false,reason:'Το έργο ανήκει σε διαφορετικό σημείο του χωριού.',targetId:p.buildingId,cost:p.cost,duration:p.duration};
  }
  const base={targetId:targetId||null,cost:p.cost,duration:p.duration};
  const no=reason=>({...base,available:false,reason});
  if(!targetId)return no('Όλα τα πέτρινα σπίτια είναι πλήρως αποκατεστημένα.');
  if(!p.repeatable&&has(state,p.id))return no('Το έργο έχει ολοκληρωθεί.');
  if(state.elapsed+EPSILON<p.minElapsed)return no(`Ανοίγει σε ${formatDuration(p.minElapsed-state.elapsed)} χρόνου εκστρατείας.`);
  const missing=p.requires.filter(id=>!has(state,id));
  if(missing.length)return no('Πρώτα: '+missing.map(id=>PROJECT_MAP[id].name).join(' · ')+'.');
  if(state.jobs.some(j=>j.buildingId===targetId))return no('Υπάρχει ήδη συνεργείο σε αυτό το σημείο.');
  if(state.jobs.length>=8)return no('Μπορείς να συντονίσεις έως 8 έργα ταυτόχρονα.');
  if(p.allowHouses&&state.buildings[targetId].condition>=100)return no('Το σπίτι είναι ήδη σε άριστη κατάσταση.');
  const readyAt=state.projectCooldowns[p.id]||0;
  if(readyAt>state.elapsed)return no(`Η δράση μπορεί να επαναληφθεί σε ${formatDuration(readyAt-state.elapsed)}.`);
  const missingCost=costReason(state,p.cost);
  if(missingCost)return no(missingCost);
  if(getFreeWorkers(state)<p.workers)return no(`Χρειάζονται ${p.workers} ελεύθεροι εργάτες. Διαθέσιμοι: ${getFreeWorkers(state)}.`);
  return {...base,available:true,reason:'Έτοιμο για ανάθεση.'};
}

function goalStatus(state,goal){
  let progress=0,target=goal.count||1,description='';
  switch(goal.type){
    case 'project':progress=has(state,goal.id)?1:0;target=1;description=PROJECT_MAP[goal.id].name;break;
    case 'visits':progress=Object.keys(state.visits).length;description='Σημεία που επισκέφθηκες';break;
    case 'talks':progress=state.stats.talkedNPCs.length;description='Διαφορετικοί κάτοικοι με τους οποίους μίλησες';break;
    case 'events':progress=state.stats.eventsResolved;description='Περιστατικά που έλυσες';break;
    case 'assigned':progress=state.workers.assignments[goal.role];description=`Εργάτες: ${ROLE_MAP[goal.role].name}`;break;
    case 'houses':progress=LOCATIONS.filter(b=>b.type==='house'&&state.buildings[b.id].condition>=goal.condition).length;description=`Σπίτια με κατάσταση ≥ ${goal.condition}%`;break;
    case 'produced':progress=state.stats.produced[goal.resource]||0;description=`Παραγωγή στο συνεργείο: ${RESOURCES[goal.resource].name}`;break;
    case 'tourism':progress=state.stats.tourismIncome;description='Έσοδα από εργαζόμενους στη φιλοξενία (CY£)';break;
    case 'metric':progress=state.metrics[goal.metric];description=({trust:'Εμπιστοσύνη',order:'Τάξη',heritage:'Κληρονομιά',nature:'Φύση'})[goal.metric]+' (%)';break;
    case 'elapsed':progress=state.elapsed;description=`Χρόνος εκστρατείας: ${formatDuration(progress)} / ${formatDuration(target)}`;break;
    default:description='Άγνωστος στόχος';
  }
  return {description,progress:Math.min(progress,target),target,complete:progress+EPSILON>=target,type:goal.type};
}
export function getMissionStatus(state,mission){
  const m=MISSION_MAP[typeof mission==='string'?mission:mission?.id];
  if(!m)return {available:false,complete:false,claimed:false,progress:0,target:1,description:'Άγνωστη αποστολή.',checks:[]};
  const checks=(m.goal.type==='all'?m.goal.goals:[m.goal]).map(g=>goalStatus(state,g));
  const chapterReady=getChapter(state).id>=m.chapter;
  const claimed=state.missionClaims.includes(m.id);
  const complete=checks.every(c=>c.complete);
  const progress=checks.length===1?checks[0].progress:checks.filter(c=>c.complete).length;
  const target=checks.length===1?checks[0].target:checks.length;
  const description=checks.map(c=>`${c.complete?'✓':'○'} ${c.description}${c.type==='elapsed'||c.type==='project'?'':` (${Math.floor(c.progress)}/${c.target})`}`).join(' · ');
  return {available:chapterReady,complete,claimed,progress,target,description:chapterReady?description:`Κεφάλαιο ${m.chapter} · ${description}`,checks};
}

function initialState(at,mode='campaign'){
  return {
    version:SAVE_VERSION,mode,createdAt:at,lastSeen:at,elapsed:0,day:1,paused:false,
    resources:{money:420,wood:75,stone:100,food:90,goods:12},
    metrics:{trust:32,order:26,heritage:55,nature:70},population:48,
    workers:{total:14,assignments:{wood:2,stone:2,farm:3,craft:0,tourism:0}},
    buildings:Object.fromEntries(LOCATIONS.map(b=>[b.id,{condition:b.condition,level:0}])),
    jobs:[],jobSerial:0,completedProjects:[],projectCounts:{},projectCooldowns:{},missionClaims:[],
    event:null,eventIndex:0,eventHistory:[],nextEventAt:120,
    ledger:[{id:'entry_0',at:0,description:'Αρχικό κοινοτικό ταμείο',kind:'income',amount:420,balance:420,category:'opening'}],
    log:[{id:'log_0',at:0,text:'Ανέλαβες μουχτάρης. Ξεκίνα από τη βρύση, την πλατεία και τους κατοίκους.',tone:'info'}],
    entrySerial:0,logSerial:0,tax:.08,aidAt:-21600,aidCount:0,
    selectedBuilding:'office',visits:{},dialogueCooldowns:{},
    stats:{produced:{wood:0,stone:0,food:0,goods:0},tradeIncome:0,tradeSpent:0,tourismIncome:0,eventsResolved:0,inspections:0,projectsCompleted:0,totalIncome:420,totalExpenses:0,starvationHours:0,wageShortfallHours:0,talkedNPCs:[]},
    accounting:{taxes:0,tourism:0,community:0,wages:0,upkeep:0,at:0},
    offlineSummary:null,storageWarning:'',won:false,
  };
}

function assert(condition,message){if(!condition)throw new Error(message);}
const isObject=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
function number(v,min,max,name,integer=false){
  assert(typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max&&(!integer||Number.isInteger(v)),`Μη έγκυρη τιμή: ${name}.`);
  return v;
}
function string(v,max,name){assert(typeof v==='string'&&v.length<=max,`Μη έγκυρο κείμενο: ${name}.`);return v;}
function object(v,name){assert(isObject(v),`Μη έγκυρο πεδίο: ${name}.`);return v;}
function knownKeys(v,keys,name){object(v,name);for(const key of Object.keys(v))assert(keys.includes(key),`Άγνωστο πεδίο στο ${name}: ${key}.`);}
function list(v,max,name){assert(Array.isArray(v)&&v.length<=max,`Μη έγκυρη λίστα: ${name}.`);return v;}
function ids(v,map,name,max=200){
  list(v,max,name);assert(new Set(v).size===v.length,`Διπλή εγγραφή στο ${name}.`);
  return v.map(id=>{assert(typeof id==='string'&&own(map,id),`Άγνωστη εγγραφή στο ${name}.`);return id;});
}

// Never trust imported UI labels or job metadata. Rebuild them from game content.
// Validation runs entirely before replacing the live state or writing storage.
export function validateSave(input){
  const raw=typeof input==='string'?JSON.parse(input):input;
  object(raw,'αποθήκευση');assert(raw.version===SAVE_VERSION,'Η έκδοση αποθήκευσης δεν υποστηρίζεται.');
  assert(raw.mode==='campaign'||raw.mode==='sandbox','Μη έγκυρος τρόπος παιχνιδιού.');
  const at=number(raw.createdAt,0,8640000000000000,'createdAt');
  const out=initialState(at,raw.mode);
  out.lastSeen=number(raw.lastSeen,0,8640000000000000,'lastSeen');
  out.elapsed=number(raw.elapsed,0,MAX_ELAPSED,'elapsed');out.day=Math.floor(out.elapsed/DAY_SECONDS)+1;
  assert(typeof raw.paused==='boolean','Μη έγκυρη κατάσταση παύσης.');out.paused=raw.paused;
  knownKeys(raw.resources,RESOURCE_KEYS,'πόροι');
  for(const key of RESOURCE_KEYS)out.resources[key]=number(raw.resources[key],0,RESOURCE_LIMITS[key],key);
  knownKeys(raw.metrics,METRIC_KEYS,'δείκτες');for(const key of METRIC_KEYS)out.metrics[key]=number(raw.metrics[key],0,100,key);
  object(raw.workers,'εργάτες');out.workers.total=number(raw.workers.total,14,40,'σύνολο εργατών',true);
  knownKeys(raw.workers.assignments,ROLE_KEYS,'αναθέσεις');
  for(const key of ROLE_KEYS)out.workers.assignments[key]=number(raw.workers.assignments[key],0,40,`εργάτες ${key}`,true);
  out.population=number(raw.population,48,200,'πληθυσμός',true);
  knownKeys(raw.buildings,LOCATIONS.map(l=>l.id),'κτίρια');
  for(const loc of LOCATIONS){const b=object(raw.buildings[loc.id],loc.id);out.buildings[loc.id]={condition:number(b.condition,0,100,`${loc.id} κατάσταση`),level:number(b.level,0,1000,`${loc.id} επίπεδο`,true)};}
  out.completedProjects=ids(raw.completedProjects,PROJECT_MAP,'ολοκληρωμένα έργα');
  knownKeys(raw.projectCounts,Object.keys(PROJECT_MAP),'μετρητές έργων');
  out.projectCounts={};for(const [id,count] of Object.entries(raw.projectCounts))out.projectCounts[id]=number(count,1,100000,`μετρητής ${id}`,true);
  assert(Object.keys(out.projectCounts).length===out.completedProjects.length&&out.completedProjects.every(id=>out.projectCounts[id]>=1),'Ασυμφωνία ολοκληρωμένων έργων.');
  knownKeys(raw.projectCooldowns,Object.keys(PROJECT_MAP),'αναμονές έργων');
  out.projectCooldowns={};for(const [id,value] of Object.entries(raw.projectCooldowns))out.projectCooldowns[id]=number(value,0,MAX_ELAPSED+86400,`αναμονή ${id}`);
  out.jobSerial=number(raw.jobSerial,0,100000000,'αριθμός έργου',true);
  const jobIds=new Set(),targets=new Set();
  out.jobs=list(raw.jobs,8,'ενεργά έργα').map(j=>{
    object(j,'έργο');const p=PROJECT_MAP[j.projectId];assert(Boolean(p),'Άγνωστο ενεργό έργο.');
    const id=string(j.id,80,'ταυτότητα έργου');assert(/^job_\d+$/.test(id)&&!jobIds.has(id),'Μη έγκυρη ή διπλή ταυτότητα έργου.');jobIds.add(id);
    assert(Number(id.slice(4))<=out.jobSerial,'Ασυμφωνία αρίθμησης έργου.');
    const target=LOCATION_MAP[j.buildingId];assert(Boolean(target),'Άγνωστο κτίριο έργου.');
    assert(p.allowHouses?target.type==='house':p.buildingId===j.buildingId,'Το ενεργό έργο δεν ταιριάζει στο κτίριο.');
    assert(!targets.has(j.buildingId),'Δύο συνεργεία στο ίδιο κτίριο.');targets.add(j.buildingId);
    assert(p.repeatable||!out.completedProjects.includes(p.id),'Ολοκληρωμένο έργο παραμένει ενεργό.');
    assert(j.duration===p.duration&&j.workers===p.workers,'Αλλοιωμένη διάρκεια ή συνεργείο έργου.');
    assert(p.requires.every(id=>out.completedProjects.includes(id))&&out.elapsed+EPSILON>=p.minElapsed,'Το ενεργό έργο δεν έχει τις απαραίτητες προϋποθέσεις.');
    knownKeys(j.paidCost,Object.keys(p.cost),'πληρωμένο κόστος');
    assert(Object.keys(j.paidCost).length===Object.keys(p.cost).length&&Object.entries(p.cost).every(([k,v])=>j.paidCost[k]===v),'Αλλοιωμένο κόστος ενεργού έργου.');
    assert(typeof j.inspected==='boolean','Μη έγκυρη επιθεώρηση έργου.');
    return {id,projectId:p.id,buildingId:target.id,name:p.name,duration:p.duration,remaining:number(j.remaining,0,p.duration,'υπόλοιπο έργου'),workers:p.workers,startedAt:number(j.startedAt,0,out.elapsed,'έναρξη έργου'),inspected:j.inspected,paidCost:clone(p.cost)};
  });
  assert(Object.values(out.workers.assignments).reduce((a,b)=>a+b,0)+out.jobs.reduce((a,b)=>a+b.workers,0)<=out.workers.total,'Οι αναθέσεις ξεπερνούν τους διαθέσιμους εργάτες.');
  out.missionClaims=ids(raw.missionClaims,MISSION_MAP,'ανταμοιβές αποστολών');
  out.eventIndex=number(raw.eventIndex,0,1000000,'σειρά περιστατικού',true);
  out.nextEventAt=number(raw.nextEventAt,0,MAX_ELAPSED+86400,'επόμενο περιστατικό');
  if(raw.event===null)out.event=null;
  else{
    const e=object(raw.event,'περιστατικό');assert(own(EVENT_MAP,e.id),'Άγνωστο περιστατικό.');
    const instanceId=string(e.instanceId,80,'ταυτότητα περιστατικού');assert(/^event_\d+$/.test(instanceId),'Μη έγκυρη ταυτότητα περιστατικού.');
    out.event={...clone(EVENT_MAP[e.id]),instanceId,at:number(e.at,0,out.elapsed,'χρόνος περιστατικού')};
  }
  out.eventHistory=list(raw.eventHistory,50,'ιστορικό περιστατικών').map(e=>{
    assert(isObject(e)&&own(EVENT_MAP,e.id)&&EVENT_MAP[e.id].choices.some(c=>c.id===e.choiceId),'Μη έγκυρη επιλογή περιστατικού.');
    return {id:e.id,choiceId:e.choiceId,at:number(e.at,0,out.elapsed,'χρόνος επιλογής')};
  });
  out.tax=number(raw.tax,0,.16,'εισφορά');
  out.aidAt=number(raw.aidAt,-21600,out.elapsed,'τελευταίο βοήθημα');out.aidCount=number(raw.aidCount,0,100000,'βοηθήματα',true);
  assert(own(LOCATION_MAP,raw.selectedBuilding),'Άγνωστη επιλεγμένη τοποθεσία.');out.selectedBuilding=raw.selectedBuilding;
  knownKeys(raw.visits,LOCATIONS.map(l=>l.id),'επισκέψεις');out.visits={};
  for(const [id,value] of Object.entries(raw.visits))out.visits[id]=number(value,0,out.elapsed,'χρόνος επίσκεψης');
  knownKeys(raw.dialogueCooldowns,Object.keys(NPC_MAP),'συζητήσεις');out.dialogueCooldowns={};
  for(const [id,value] of Object.entries(raw.dialogueCooldowns))out.dialogueCooldowns[id]=number(value,0,MAX_ELAPSED+21600,'αναμονή συζήτησης');
  const stats=object(raw.stats,'στατιστικά');knownKeys(stats.produced,['wood','stone','food','goods'],'παραγωγή');
  for(const key of ['wood','stone','food','goods'])out.stats.produced[key]=number(stats.produced[key],0,1000000000000,`παραγωγή ${key}`);
  for(const key of ['tradeIncome','tradeSpent','tourismIncome','eventsResolved','inspections','projectsCompleted','totalIncome','totalExpenses','starvationHours','wageShortfallHours'])out.stats[key]=number(stats[key],0,1000000000000,key,['eventsResolved','inspections','projectsCompleted'].includes(key));
  out.stats.talkedNPCs=ids(stats.talkedNPCs,NPC_MAP,'κάτοικοι');
  out.entrySerial=number(raw.entrySerial,0,100000000,'αριθμός εγγραφής',true);out.logSerial=number(raw.logSerial,0,100000000,'αριθμός ημερολογίου',true);
  out.ledger=list(raw.ledger,160,'ταμειακό ημερολόγιο').map(e=>{
    object(e,'ταμειακή εγγραφή');assert(e.kind==='income'||e.kind==='expense','Μη έγκυρο είδος εγγραφής.');
    return {id:string(e.id,80,'εγγραφή'),at:number(e.at,0,out.elapsed,'χρόνος εγγραφής'),description:string(e.description,400,'περιγραφή εγγραφής'),kind:e.kind,amount:number(e.amount,0,1000000000000,'ποσό εγγραφής'),balance:number(e.balance,0,RESOURCE_LIMITS.money,'υπόλοιπο'),category:string(e.category,80,'κατηγορία εγγραφής')};
  });
  out.log=list(raw.log,120,'ημερολόγιο').map(e=>{
    object(e,'καταγραφή');assert(['info','success','warning','event'].includes(e.tone),'Μη έγκυρο είδος καταγραφής.');
    return {id:string(e.id,80,'καταγραφή'),at:number(e.at,0,out.elapsed,'χρόνος καταγραφής'),text:string(e.text,700,'κείμενο καταγραφής'),tone:e.tone};
  });
  const account=object(raw.accounting,'λογιστικά υπόλοιπα');
  for(const key of ['taxes','tourism','community','wages','upkeep'])out.accounting[key]=number(account[key],0,1000000,`λογιστικό ${key}`);
  out.accounting.at=number(account.at,0,out.elapsed,'λογιστική περίοδος');
  out.won=out.missionClaims.includes('homecoming');out.offlineSummary=null;out.storageWarning='';
  return out;
}

export function createGame(options={}){
  const now=typeof options.now==='function'?options.now:()=>Date.now();
  const readClock=()=>{const n=now();return Number.isFinite(n)&&n>=0?n:Date.now();};
  let storage=options.storage;
  if(storage===undefined){try{storage=globalThis.localStorage||null;}catch{storage=null;}}
  const listeners=new Set();
  let state=initialState(readClock(),options.mode==='sandbox'?'sandbox':'campaign');
  let stored=false;
  if(storage?.getItem){
    try{
      const value=storage.getItem(STORAGE_KEY);
      if(value){state=validateSave(value);stored=true;}
    }catch(error){
      state.storageWarning='Η προηγούμενη αποθήκευση δεν διαβάστηκε. Μπορείς να εισαγάγεις ένα έγκυρο αντίγραφο.';
      try{const invalid=storage.getItem(STORAGE_KEY);if(invalid)storage.setItem(STORAGE_KEY+':invalid-backup',invalid);}catch{}
    }
  }
  function emit(){for(const fn of listeners){try{fn(state);}catch(error){console.error('Moutoullas subscriber:',error);}}}
  function addLog(text,tone='info'){
    state.log.unshift({id:`log_${++state.logSerial}`,at:state.elapsed,text,tone});state.log.length=Math.min(state.log.length,120);
  }
  function ledger(amount,description,category='other',alreadyCounted=false){
    if(Math.abs(amount)<EPSILON)return;
    state.ledger.unshift({id:`entry_${++state.entrySerial}`,at:state.elapsed,description,kind:amount>=0?'income':'expense',amount:Math.abs(round(amount)),balance:state.resources.money,category});
    state.ledger.length=Math.min(state.ledger.length,160);
    if(!alreadyCounted)state.stats[amount>=0?'totalIncome':'totalExpenses']+=Math.abs(amount);
  }
  function saveInternal(){
    if(!storage?.setItem){state.storageWarning='Η αποθήκευση στη συσκευή δεν είναι διαθέσιμη. Κατέβασε αντίγραφο προόδου από το μενού.';return false;}
    try{
      const persisted={...state,offlineSummary:null,storageWarning:''};
      storage.setItem(STORAGE_KEY,JSON.stringify(persisted));state.storageWarning='';return true;
    }catch(error){state.storageWarning='Δεν έγινε αποθήκευση στη συσκευή. Κατέβασε αντίγραφο προόδου από το μενού.';return false;}
  }
  function applyMetrics(effects={}){for(const key of METRIC_KEYS)if(Number.isFinite(effects[key]))state.metrics[key]=round(clamp(state.metrics[key]+effects[key]));}
  function applyResources(change={},sign=1,description='',category='other'){
    for(const [key,value] of Object.entries(change)){
      if(!own(RESOURCES,key))continue;
      const before=state.resources[key];state.resources[key]=round(clamp(before+sign*value,0,RESOURCE_LIMITS[key]));
      if(key==='money')ledger(state.resources[key]-before,description,category);
    }
  }
  function addWorkers(amount){const added=Math.min(amount,40-state.workers.total);state.workers.total+=added;state.population+=added;}
  function resolveDialogue(npcId,choiceId,context){
    const status=getDialogueStatus(state,npcId,choiceId,context);
    if(!status.available)return fail(status.reason);
    const npc=NPC_MAP[npcId],c=npc.choices.find(ch=>ch.id===choiceId);
    const channel=context==='office'?'Απάντηση στο γραφείο':'Συζήτηση';
    applyResources(c.cost,-1,`${channel}: ${npc.name}`,'resident');applyResources(c.reward,1,`${channel}: ${npc.name}`,'resident');applyMetrics(c.effects);
    state.dialogueCooldowns[npcId]=state.elapsed+21600;
    if(!state.stats.talkedNPCs.includes(npcId))state.stats.talkedNPCs.push(npcId);
    addLog(`${channel} · ${npc.name}: ${c.label}.`);
    return okay(`${npc.name}: ${c.description}`);
  }
  function finishJobs(){
    const done=state.jobs.filter(j=>j.remaining<=EPSILON);
    if(!done.length)return;
    state.jobs=state.jobs.filter(j=>j.remaining>EPSILON);
    for(const job of done){
      const p=PROJECT_MAP[job.projectId];
      if(!has(state,p.id))state.completedProjects.push(p.id);
      state.projectCounts[p.id]=(state.projectCounts[p.id]||0)+1;
      state.stats.projectsCompleted++;
      if(p.condition){const b=state.buildings[job.buildingId];b.condition=clamp(b.condition+p.condition);b.level++;}
      applyMetrics(p.effects);applyResources(p.reward,1,`Έσοδα δράσης: ${p.name}`,'project');
      if(p.addWorkers)addWorkers(p.addWorkers);
      if(p.cooldown)state.projectCooldowns[p.id]=state.elapsed+p.cooldown;
      addLog(`Ολοκληρώθηκε: ${p.name}${p.allowHouses?' · '+LOCATION_MAP[job.buildingId].name:''}. Το συνεργείο είναι πάλι διαθέσιμο.`,'success');
    }
  }
  function flushAccounts(){
    const labels={taxes:'Κοινοτικές εισφορές',tourism:'Φιλοξενία και ξεναγήσεις',community:'Σταθερή κοινοτική στήριξη',wages:'Αμοιβές συνεργείων',upkeep:'Συντήρηση και λειτουργία'};
    for(const key of Object.keys(labels)){
      const amount=state.accounting[key];if(amount>EPSILON)ledger((key==='wages'||key==='upkeep'?-1:1)*amount,labels[key],'hourly',true);
      state.accounting[key]=0;
    }
    state.accounting.at=state.elapsed;
  }
  function triggerEvent(){
    if(state.event||state.elapsed+EPSILON<state.nextEventAt)return;
    const definition=EVENTS[state.eventIndex%EVENTS.length];
    state.event={...clone(definition),instanceId:`event_${state.eventIndex}`,at:state.elapsed};state.eventIndex++;
    addLog(`Στο γραφείο σου: ${definition.title}`,'event');
  }
  function integrate(seconds,budget){
    const h=seconds/DAY_SECONDS,rates=getEconomyRates(state);
    for(const key of ['wood','stone','food']){
      const amount=rates.production[key]*h;
      const actual=Math.min(amount,RESOURCE_LIMITS[key]-state.resources[key]);
      state.resources[key]+=actual;state.stats.produced[key]+=actual;
    }
    const crafted=Math.min(rates.production.goods*h,state.resources.wood/2,RESOURCE_LIMITS.goods-state.resources.goods);
    state.resources.wood-=crafted*2;state.resources.goods+=crafted;state.stats.produced.goods+=crafted;
    const foodNeed=rates.consumption.food*h;
    const foodTaken=Math.min(foodNeed,state.resources.food);state.resources.food-=foodTaken;
    const hunger=foodNeed>EPSILON?(foodNeed-foodTaken)/foodNeed:0;
    if(hunger>0){
      state.stats.starvationHours+=h*hunger;
      const trustPenalty=Math.min(budget.hungerTrust,3*h*hunger),orderPenalty=Math.min(budget.hungerOrder,2*h*hunger);
      state.metrics.trust=Math.max(Math.min(8,state.metrics.trust),state.metrics.trust-trustPenalty);state.metrics.order=Math.max(Math.min(8,state.metrics.order),state.metrics.order-orderPenalty);
      budget.hungerTrust-=trustPenalty;budget.hungerOrder-=orderPenalty;
    }
    for(const key of ['taxes','tourism','community']){
      const amount=Math.min(rates.income[key]*h,RESOURCE_LIMITS.money-state.resources.money);
      state.resources.money+=amount;state.accounting[key]+=amount;state.stats.totalIncome+=amount;
      if(key==='tourism')state.stats.tourismIncome+=amount;
    }
    const owed=rates.expenses.total*h,paid=Math.min(owed,state.resources.money);
    state.resources.money-=paid;state.stats.totalExpenses+=paid;
    const paidFraction=owed>EPSILON?paid/owed:1;
    state.accounting.wages+=rates.expenses.wages*h*paidFraction;state.accounting.upkeep+=rates.expenses.upkeep*h*paidFraction;
    if(paidFraction<1){
      state.stats.wageShortfallHours+=h*(1-paidFraction);
      const penalty=Math.min(budget.wageTrust,2*h*(1-paidFraction));state.metrics.trust=Math.max(Math.min(8,state.metrics.trust),state.metrics.trust-penalty);budget.wageTrust-=penalty;
    }
    const regen=.65+(has(state,'forest_plan')?.7:0)+(has(state,'fire_safety')?.35:0);
    const natureCost=state.workers.assignments.wood*.60;
    state.metrics.nature=clamp(state.metrics.nature+(regen-natureCost)*h,0,100);
    if(state.tax>.08){
      const penalty=Math.min(budget.taxTrust,(state.tax-.08)*8*h);state.metrics.trust=Math.max(Math.min(8,state.metrics.trust),state.metrics.trust-penalty);budget.taxTrust-=penalty;
    }else if(state.tax<.08&&hunger===0){state.metrics.trust=clamp(state.metrics.trust+(.08-state.tax)*3*h);}
    if(has(state,'office_archive')&&hunger===0)state.metrics.order=clamp(state.metrics.order+.08*h);
    for(const job of state.jobs)job.remaining=Math.max(0,job.remaining-seconds);
    state.elapsed+=seconds;state.day=Math.floor(state.elapsed/DAY_SECONDS)+1;
    finishJobs();triggerEvent();
    if(state.elapsed-state.accounting.at+EPSILON>=DAY_SECONDS)flushAccounts();
  }
  function advanceTo(at,showSummary=false){
    if(at<=state.lastSeen)return false;
    const raw=(at-state.lastSeen)/1000;
    state.lastSeen=at;
    if(state.paused)return false;
    const speed=state.mode==='sandbox'?SANDBOX_SPEED:1;
    const seconds=Math.min(raw*speed,OFFLINE_CAP_SECONDS,MAX_ELAPSED-state.elapsed);
    if(seconds<=0)return false;
    const before={resources:{...state.resources},done:state.stats.projectsCompleted,events:state.eventIndex};
    const budget={hungerTrust:12,hungerOrder:8,wageTrust:8,taxTrust:16};
    let left=seconds;
    // Short deterministic slices handle supplies and work completions identically
    // online and offline; a single catch-up never covers more than 48 game hours.
    while(left>EPSILON){
      finishJobs();
      const nextJob=state.jobs.length?Math.min(...state.jobs.map(j=>j.remaining)):Infinity;
      const nextEvent=!state.event&&state.nextEventAt>state.elapsed?state.nextEventAt-state.elapsed:Infinity;
      const nextAccount=Math.max(.001,DAY_SECONDS-(state.elapsed-state.accounting.at));
      const step=Math.min(left,60,nextJob>EPSILON?nextJob:60,nextEvent,nextAccount);
      integrate(step,budget);left-=step;
    }
    for(const key of RESOURCE_KEYS)state.resources[key]=round(clamp(state.resources[key],0,RESOURCE_LIMITS[key]));
    for(const key of METRIC_KEYS)state.metrics[key]=round(clamp(state.metrics[key]));
    state.elapsed=round(state.elapsed);state.day=Math.floor(state.elapsed/DAY_SECONDS)+1;
    if(showSummary&&raw>=30){
      state.offlineSummary={seconds,realSeconds:raw,clamped:raw*speed>OFFLINE_CAP_SECONDS,completedJobs:state.stats.projectsCompleted-before.done,newEvents:state.eventIndex-before.events,netResources:Object.fromEntries(RESOURCE_KEYS.map(k=>[k,round(state.resources[k]-before.resources[k])])),penaltiesLimited:true};
      addLog(`Όσο έλειπες προχώρησαν ${formatDuration(seconds)} χρόνου χωριού${before.done<state.stats.projectsCompleted?` και ολοκληρώθηκαν ${state.stats.projectsCompleted-before.done} έργα`:''}.${raw*speed>OFFLINE_CAP_SECONDS?' Η πρόοδος απουσίας περιορίστηκε στις 48 ώρες.':''}`,'info');
    }
    return true;
  }
  function transact(fn){
    advanceTo(readClock());
    const result=fn();saveInternal();emit();return result;
  }

  if(stored)advanceTo(readClock(),true);
  const api={
    get state(){return state;},
    subscribe(fn){if(typeof fn!=='function')return ()=>{};listeners.add(fn);fn(state);return ()=>listeners.delete(fn);},
    tick(){const changed=advanceTo(readClock());if(changed){saveInternal();emit();}return changed;},
    startProject(projectId,buildingId){return transact(()=>{
      const p=PROJECT_MAP[projectId];if(!p)return fail('Δεν βρέθηκε αυτό το έργο.');
      const status=getProjectStatus(state,p,buildingId);if(!status.available)return fail(status.reason);
      applyResources(p.cost,-1,`Έργο: ${p.name}`,'project');
      state.jobs.push({id:`job_${++state.jobSerial}`,projectId:p.id,buildingId:status.targetId,name:p.name,remaining:p.duration,duration:p.duration,workers:p.workers,startedAt:state.elapsed,inspected:false,paidCost:clone(p.cost)});
      addLog(`Ξεκίνησε: ${p.name} · ${p.workers} εργάτες · ${formatDuration(p.duration)}.`);
      return okay(`Το συνεργείο αναλαμβάνει: ${p.name}.`);
    });},
    assign(role,delta){return transact(()=>{
      if(!own(ROLE_MAP,role)||!Number.isInteger(delta)||delta===0||Math.abs(delta)>40)return fail('Διάλεξε έγκυρη αλλαγή εργατών.');
      const current=state.workers.assignments[role],r=ROLE_MAP[role];
      if(current+delta<0)return fail('Δεν υπάρχουν τόσοι εργάτες σε αυτόν τον ρόλο.');
      if(delta>getFreeWorkers(state))return fail('Δεν υπάρχουν αρκετοί ελεύθεροι εργάτες.');
      if(delta>0&&r.minCondition&&state.buildings[r.buildingId].condition<r.minCondition)return fail(`Πρώτα επισκεύασε: ${LOCATION_MAP[r.buildingId].name} (τουλάχιστον ${r.minCondition}%).`);
      state.workers.assignments[role]+=delta;
      return okay(`${r.name}: ${state.workers.assignments[role]} εργάτες.`);
    });},
    trade(resource,side,amount){return transact(()=>{
      if(!own(RESOURCES,resource)||resource==='money'||!['buy','sell'].includes(side)||!Number.isInteger(amount)||amount<=0||amount>10000)return fail('Διάλεξε προϊόν, αγορά ή πώληση και θετική ακέραιη ποσότητα έως 10.000.');
      const rate=RESOURCES[resource][side]*(side==='sell'&&has(state,'cooperative_restore')?1.1:1);
      const total=round(rate*amount);
      if(side==='buy'){
        if(state.resources.money+EPSILON<total)return fail(`Η αγορά χρειάζεται ${formatMoney(total)}.`);
        if(state.resources[resource]+amount>RESOURCE_LIMITS[resource])return fail('Δεν υπάρχει χώρος για όλη την ποσότητα.');
        applyResources({money:total},-1,`Αγορά: ${amount} ${RESOURCES[resource].name}`,'trade');applyResources({[resource]:amount});state.stats.tradeSpent+=total;
      }else{
        if(state.resources[resource]+EPSILON<amount)return fail('Δεν έχεις αρκετό απόθεμα για την πώληση.');
        if(state.resources.money+total>RESOURCE_LIMITS.money)return fail('Το ταμείο έχει φτάσει στο ανώτατο όριο.');
        applyResources({[resource]:amount},-1);applyResources({money:total},1,`Πώληση: ${amount} ${RESOURCES[resource].name}`,'trade');state.stats.tradeIncome+=total;
      }
      return okay(`${side==='buy'?'Αγοράστηκαν':'Πωλήθηκαν'} ${amount} ${RESOURCES[resource].short.toLowerCase()} · ${formatMoney(total)}.`);
    });},
    barter(id){return transact(()=>{
      const deal=BARTERS.find(d=>d.id===id);if(!deal)return fail('Δεν βρέθηκε η ανταλλαγή.');
      const reason=costReason(state,deal.cost);if(reason)return fail(reason);
      if(Object.entries(deal.reward).some(([k,v])=>state.resources[k]+v>RESOURCE_LIMITS[k]))return fail('Δεν υπάρχει χώρος για την ανταλλαγή.');
      applyResources(deal.cost,-1);applyResources(deal.reward);addLog(`Ανταλλαγή: ${deal.name}.`);return okay(`Ολοκληρώθηκε: ${deal.name}.`);
    });},
    resolveEvent(choiceId){return transact(()=>{
      if(!state.event)return fail('Δεν υπάρχει ανοιχτό περιστατικό.');
      const event=EVENT_MAP[state.event.id],c=event.choices.find(ch=>ch.id===choiceId);if(!c)return fail('Δεν βρέθηκε αυτή η επιλογή.');
      const reason=costReason(state,c.cost);if(reason)return fail(reason);
      applyResources(c.cost,-1,`Περιστατικό: ${event.name}`,'event');applyResources(c.reward,1,`Περιστατικό: ${event.name}`,'event');applyMetrics(c.effects);
      if(c.addWorkers)addWorkers(c.addWorkers);
      state.eventHistory.unshift({id:event.id,choiceId:c.id,at:state.elapsed});state.eventHistory.length=Math.min(50,state.eventHistory.length);
      state.stats.eventsResolved++;state.event=null;state.nextEventAt=state.elapsed+7200;
      addLog(`${event.name}: ${c.label}.`,'success');return okay(`Η απόφαση καταγράφηκε: ${c.label}.`);
    });},
    claimMission(id){return transact(()=>{
      const m=MISSION_MAP[id];if(!m)return fail('Δεν βρέθηκε αυτή η αποστολή.');
      const status=getMissionStatus(state,m);
      if(status.claimed)return fail('Έχεις ήδη πάρει αυτή την ανταμοιβή.');
      if(!status.available)return fail(`Η αποστολή ανοίγει στο κεφάλαιο ${m.chapter}.`);
      if(!status.complete)return fail('Δεν έχουν ολοκληρωθεί όλοι οι στόχοι της αποστολής.');
      state.missionClaims.push(m.id);applyResources(m.reward,1,`Αποστολή: ${m.name}`,'mission');applyMetrics(m.metrics);
      if(m.final)state.won=true;
      addLog(`Αποστολή ολοκληρωμένη: ${m.name}.`, 'success');return okay(m.final?'Το χωριό στάθηκε στα πόδια του. Μπορείς να συνεχίσεις να το φροντίζεις.':`Παρέλαβες την ανταμοιβή: ${m.name}.`);
    });},
    visit(buildingId){return transact(()=>{
      if(!own(LOCATION_MAP,buildingId))return fail('Δεν βρέθηκε η τοποθεσία.');
      state.selectedBuilding=buildingId;
      const first=!own(state.visits,buildingId);state.visits[buildingId]=state.elapsed;
      if(first)applyMetrics({trust:.25});
      const job=state.jobs.find(j=>j.buildingId===buildingId&&!j.inspected);
      if(job){
        const saved=Math.min(300,job.remaining*.08);job.remaining=Math.max(0,job.remaining-saved);job.inspected=true;state.stats.inspections++;applyMetrics({trust:.8});
        addLog(`Επίβλεψη: ${LOCATION_MAP[buildingId].name}. Καλύτερος συντονισμός, ${formatDuration(saved)} λιγότερη αναμονή.`,'success');
        finishJobs();return okay(`Επίβλεψη συνεργείου · κέρδος ${formatDuration(saved)} (μία φορά ανά έργο).`);
      }
      return okay(`${LOCATION_MAP[buildingId].name} · κατάσταση ${Math.round(state.buildings[buildingId].condition)}%.`);
    });},
    returnToOffice(){return transact(()=>{state.selectedBuilding='office';return okay('Επέστρεψες στο κοινοτικό γραφείο.');});},
    talk(npcId,choiceId){return transact(()=>resolveDialogue(npcId,choiceId,'onsite'));},
    replyAtOffice(npcId,choiceId){return transact(()=>resolveDialogue(npcId,choiceId,'office'));},
    setTax(rate){return transact(()=>{
      if(typeof rate!=='number'||!Number.isFinite(rate)||rate<0||rate>.16)return fail('Η κοινοτική εισφορά πρέπει να είναι από 0% έως 16%.');
      state.tax=Math.round(rate*10000)/10000;addLog(`Κοινοτική εισφορά: ${Math.round(state.tax*100)}%. ${rate>.08?'Οι υψηλότερες εισφορές μειώνουν σταδιακά την εμπιστοσύνη.':'Η εισφορά καταγράφεται δημόσια.'}`);
      return okay(`Νέα κοινοτική εισφορά: ${Math.round(state.tax*100)}%.`);
    });},
    requestAid(){return transact(()=>{
      const remaining=state.aidAt+21600-state.elapsed;
      if(remaining>0)return fail(`Νέο βοήθημα σε ${formatDuration(remaining)} χρόνου χωριού.`);
      if(state.resources.money>=45&&state.resources.food>=15)return fail('Το βοήθημα ανοίγει όταν το ταμείο πέσει κάτω από CY£ 45 ή τα τρόφιμα κάτω από 15.');
      state.aidAt=state.elapsed;state.aidCount++;applyResources({money:55,food:30,wood:10,stone:15},1,'Κοινοτικό βοήθημα ανάκαμψης','aid');
      addLog('Εγκρίθηκε μικρό βοήθημα ανάκαμψης. Οργάνωσε περιβολάρηδες και κράτησε απόθεμα για το επόμενο έργο.','success');
      return okay('Βοήθημα: CY£ 55, 30 τρόφιμα, 10 ξύλο και 15 πέτρα.');
    });},
    setPaused(paused){return transact(()=>{
      if(typeof paused!=='boolean')return fail('Μη έγκυρη επιλογή παύσης.');
      state.paused=paused;addLog(paused?'Η εκστρατεία είναι σε παύση. Ο χρόνος και οι αμοιβές δεν τρέχουν.':'Η εκστρατεία συνεχίζεται.');
      return okay(paused?'Παύση εκστρατείας.':'Η εκστρατεία συνεχίζεται.');
    });},
    clearOfflineSummary(){state.offlineSummary=null;emit();return okay('Η αναφορά έκλεισε.');},
    save(){advanceTo(readClock());const saved=saveInternal();emit();return saved?okay('Η πρόοδος αποθηκεύτηκε σε αυτή τη συσκευή.'):fail(state.storageWarning);},
    exportSave(){advanceTo(readClock());saveInternal();return JSON.stringify({...state,offlineSummary:null,storageWarning:''},null,2);},
    importSave(input){
      try{
        assert(typeof input==='string'&&input.length<=2000000,'Το αρχείο πρέπει να είναι έγκυρο κείμενο JSON έως 2 MB.');
        const next=validateSave(input);next.lastSeen=readClock();
        // Commit to persistent storage first; a storage failure preserves both
        // the live game and the old saved file, so importing is transactional.
        if(storage?.setItem)storage.setItem(STORAGE_KEY,JSON.stringify(next));
        state=next;addLog('Φορτώθηκε το αντίγραφο προόδου. Ο χρόνος συνεχίζει από αυτή τη στιγμή.','success');saveInternal();emit();
        return okay('Το αντίγραφο προόδου φορτώθηκε.');
      }catch(error){return fail(`Δεν φορτώθηκε η αποθήκευση: ${error.message||'μη έγκυρο αρχείο'}`);}
    },
    reset(mode='campaign'){
      if(mode!=='campaign'&&mode!=='sandbox')return fail('Διάλεξε εκστρατεία ή γρήγορη δοκιμή.');
      state=initialState(readClock(),mode);saveInternal();emit();return okay(mode==='sandbox'?'Ξεκίνησε γρήγορη δοκιμή ×240. Έχει ξεχωριστό ρυθμό χρόνου.':'Ξεκίνησε νέα εκστρατεία.');
    },
  };
  if(stored)saveInternal();
  return api;
}
