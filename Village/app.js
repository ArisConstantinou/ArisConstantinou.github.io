import {createGame,BUILD_FOOTPRINTS,getNodeProduction,getConstructionProgress} from './feouda-engine.js?v=2.6.0';
import {createBattlefield} from './feouda-world.js?v=2.6.0';
import {FACTIONS,REGIONS,UNIT_TYPES,BUILDINGS,TECHS,MAP,BRIDGES,RESOURCE_NAMES,ERAS,regionAt} from './feouda-data.js?v=2.6.0';
import {icon,unitPortrait,buildingPortrait,crest} from './feouda-icons.js?v=2.6.0';
import {getTrainingRequirements,getMissionGuidance,getCampaignAdvice} from './feouda-advisor.js?v=2.6.0';
import {getSquadOrderReadout,getArmyOrderSummary} from './feouda-orders.js?v=2.6.0';

const $=id=>document.getElementById(id),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=(v,d=0)=>Number(v||0).toLocaleString('el-CY',{maximumFractionDigits:d,minimumFractionDigits:d}),money=v=>'CY£ '+num(v,2),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const storage={getItem(k){try{return localStorage.getItem(k)}catch{return null}},setItem(k,v){localStorage.setItem(k,v)}};
const store=(k,v)=>{try{storage.setItem(k,v)}catch{}};
const game=createGame({storage}),regionById=Object.fromEntries(REGIONS.map(r=>[r.id,r]));
const view={panel:'realm',panelOpen:innerWidth>780,selection:{kind:'region',id:'home'},regionId:'home',armyIds:[],command:null,armyTab:'troops',buildTab:'civil',buildType:'houses',armyMulti:false,controlGroups:readControlGroups(),groupAssign:false,guideOpen:storage.getItem('feouda-guide-v24-seen')!=='1',guideStep:null,guideDone:readGuideProgress(),lastGroup:null,lastGroupAt:0,resourceFilter:'all',mapMode:'terrain',modal:null,modalResume:false,started:game.loaded||storage.getItem('feouda-welcomed-v1')==='1',ready:false,sound:storage.getItem('feouda-sound')==='1',quality:storage.getItem('feouda-quality')||((innerWidth<780)?'low':'high'),endingShown:false,pendingImport:null,rendererMode:null,placement:null,assetStatus:null};
let world=null,audioContext=null,lastRender=0,lastStep=performance.now(),lastLog=null,held=false,rendering=false,bootFailed=false;
const PANELS={realm:['ΤΟ ΣΥΜΒΟΥΛΙΟ ΤΗΣ ΑΡΓΥΡΗΣ ΔΡΥΟΣ','Η κυριαρχία σου'],build:['ΛΙΘΟΙ, ΞΥΛΟ ΚΑΙ ΑΝΘΡΩΠΟΙ','Οικοδόμηση'],economy:['ΟΙ ΑΝΘΡΩΠΟΙ ΤΗΣ ΓΗΣ','Πόροι & εργάτες'],army:['ΤΟ ΠΟΛΕΜΙΚΟ ΣΥΜΒΟΥΛΙΟ','Στρατός & διαταγές'],research:['Η ΓΝΩΣΗ ΧΤΙΖΕΙ ΤΟ ΑΥΡΙΟ','Τέχνες & πρόοδος'],chronicle:['Ο ΔΡΟΜΟΣ ΠΡΟΣ ΤΗΝ ΗΓΕΜΟΝΙΑ','Το χρονικό'],diplomacy:['ΟΙΚΟΙ, ΣΥΝΟΡΑ ΚΑΙ ΣΥΜΦΩΝΙΕΣ','Διπλωματία & εμπόριο']};
const NAV=[['realm','castle','Επίβλεψε φέουδα','Οχυρά και άμυνα'],['build','build','Χτίσε κτίρια','Στέγη και παραγωγή'],['economy','people','Ανάθεσε εργάτες','Μάζεψε πρώτες ύλες'],['army','army','Οργάνωσε στρατό','Εκπαίδευση και διαταγές'],['research','research','Ανάπτυξε τέχνες','Ξεκλείδωσε βελτιώσεις'],['chronicle','scroll','Δες αποστολές','Στόχοι και ανταμοιβές'],['diplomacy','trade','Κάνε εμπόριο','Αγορές και συμφωνίες']];
const ORDER_NAMES={hold:'Φρουρά',move:'Σε πορεία',attackMove:'Πορεία με εμπλοκή',attack:'Επίθεση',capture:'Πολιορκία',retreat:'Υποχώρηση'};
const CIVIL=['houses','farm','lumberyard','quarry','mine','granary','market','well','infirmary'];
const MILITARY=['barracks','archery','stable','siege','walls'];
const BUILD_SHORT={houses:'Κατοικίες',farm:'Αγρόκτημα',lumberyard:'Υλοτομείο',quarry:'Λατομείο',mine:'Μεταλλείο',granary:'Σιταποθήκη',market:'Αγορά',well:'Πηγάδι',infirmary:'Θεραπευτήριο',barracks:'Στρατώνας',archery:'Τοξοβολία',stable:'Στάβλος',siege:'Μηχανουργείο',walls:'Τείχη'};
const prices={food:{buy:1.6,sell:.85},wood:{buy:2.1,sell:1.1},stone:{buy:2.7,sell:1.45},iron:{buy:4.8,sell:2.6}};
const time=v=>{v=Math.max(0,Math.ceil(v||0));return v<60?v+'δ':v<3600?Math.floor(v/60)+'λ '+v%60+'δ':Math.floor(v/3600)+'ω '+Math.floor(v%3600/60)+'λ'};
const constructionPercent=j=>Math.min(99,Math.floor(clamp(j.duration?1-j.remaining/j.duration:0,0,1)*100));
const progress=(value,total,color='')=>`<div class="meter ${color}"><i style="width:${clamp(total?value/total*100:0,0,100)}%"></i></div>`;
const costHtml=cost=>`<div class="cost">${Object.entries(cost||{}).filter(([,v])=>v>0).map(([k,v])=>`<span>${icon(k)}${k==='money'?'CY£ '+num(v):num(v)}</span>`).join('')}</div>`;
const preview=(action,payload)=>game.canCommand?.(action,payload)||{ok:true};
const owned=()=>REGIONS.filter(r=>game.state.regions[r.id]?.owner==='player');
const squads=()=>game.state.squads.filter(s=>s.owner==='player'&&s.hp>0);
const armyIds=()=>view.armyIds.filter(id=>squads().some(s=>s.id===id));
const ownedRegion=()=>game.state.regions[view.regionId]?.owner==='player'?regionById[view.regionId]:owned()[0];
const currentRegion=()=>regionById[view.selection.kind==='region'?view.selection.id:view.regionId]||regionById.home;
view.helpTopic='menus';view.helpDevice=innerWidth<=780?'touch':'mouse';view.requirementsOpen={};view.worksitesOpen=true;

const panelIntro=(symbol,title,text)=>`<div class="panel-intro"><span class="intro-icon">${icon(symbol)}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></div>`;
const adviceButton=(action,label,className='button full')=>action?`<button class="${className}" data-action="advice" data-value="${esc(JSON.stringify(action))}">${esc(label)}${icon('chevron')}</button>`:'';
function revealControl(selector){$('panel-body').querySelector(selector)?.scrollIntoView?.({block:'nearest',behavior:'auto'});}
function navigateAdvice(action){
 if(!action||typeof action!=='object'||!view.started)return;
 if(view.modal)closeModal();
 if(view.placement)cancelPlacement({open:false});
 view.command=null;
 if(innerWidth<=780){view.guideOpen=false;store('feouda-guide-v24-seen','1');}
 const r=game.state.regions[action.regionId]?.owner==='player'?regionById[action.regionId]:ownedRegion();
 if(action.kind==='build'&&BUILDINGS[action.type]&&r){
  view.regionId=r.id;view.selection={kind:'region',id:r.id};world?.setSelection(view.selection);
  view.buildTab=CIVIL.includes(action.type)?'civil':'military';view.buildType=action.type;setPanel('build');world?.focus(r.id);
  if(game.state.jobs.some(j=>j.kind==='build'&&j.type===action.type&&j.regionId===r.id))inspectBuilding(action.type);else revealControl(`[data-building-type="${action.type}"]`);
 }else if(action.kind==='research'&&TECHS[action.type]){setPanel('research');revealControl(`[data-tech="${action.type}"]`);
 }else if(action.kind==='resource'||action.kind==='workers'){
  const type=['food','wood','stone','iron'].includes(action.type)?action.type:'all';
  if(action.type==='money'){setPanel('diplomacy');return;}
  view.resourceFilter=type;
  const candidates=game.state.nodes.filter(n=>game.state.regions[n.regionId]?.owner==='player'&&(type==='all'||n.type===type));
  const node=candidates.find(n=>preview('assignWorkers',{nodeId:n.id,delta:1}).ok)||candidates.find(n=>n.amount>0)||candidates[0];
  if(node){setSelection({kind:'node',id:node.id},{focus:true,open:true});revealControl(`[data-node="${node.id}"]`);}else setPanel('economy');
 }else if(action.kind==='region'&&regionById[action.regionId]){setSelection({kind:'region',id:action.regionId},{focus:true,open:true});
 }else if(action.kind==='army'){
  if(r)view.regionId=r.id;view.armyTab=action.tab==='troops'?'troops':'train';setPanel('army');
 }else if(action.kind==='missions'){setPanel('chronicle');
 }else if(action.kind==='panel'&&PANELS[action.panel]){setPanel(action.panel);}
}
function regionSelector(r,kind='training'){
 return `<div class="region-selector"><label for="${kind}-region-select">${kind==='training'?'Εκπαίδευση στο φέουδο':'Κατασκευές στο φέουδο'}</label><select id="${kind}-region-select" aria-label="${kind==='training'?'Φέουδο εκπαίδευσης':'Φέουδο κατασκευής'}">${owned().map(p=>`<option value="${p.id}" ${p.id===r.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select></div>`;
}
function jobWaiting(j,s=game.state){return j.kind==='train'&&s.jobs.slice(0,s.jobs.indexOf(j)).some(other=>other.kind==='train'&&other.regionId===j.regionId&&UNIT_TYPES[other.type]?.requires===UNIT_TYPES[j.type]?.requires);}
function jobPhase(j,s=game.state){
 if(j.construction){const c=getConstructionProgress(s,j);return c.phase==='paused'?'Σε παύση':c.phase==='blocked'?'Το συνεργείο περιμένει':c.phase==='travel'?'Οι χτίστες κατευθύνονται στο έργο':c.phase==='complete'?'Ολοκληρώθηκε':c.stageTitle||'Κατασκευάζεται';}
 return j.blocked?'Περιμένει ελεύθερο χώρο':jobWaiting(j,s)?'Περιμένει τη σειρά του':s.paused?'Σε παύση':j.kind==='train'?'Εκπαιδεύεται':j.kind==='research'?'Μελετάται':'Κατασκευάζεται';
}
function constructionReadout(s,j,{stages=false,compact=false}={}){
 if(!j?.construction)return `${progress(j.duration-j.remaining,j.duration,'gold')}<p class="construction-caption">${esc(jobPhase(j,s))} · ${time(j.remaining)}</p>`;
 const c=getConstructionProgress(s,j),percent=constructionPercent(j),crew=c.crewReady??c.arrived??0,total=c.crewTotal??c.assigned??4;
 const stepList=Array.isArray(c.stages)?c.stages:[],stageIndex=stepList.findIndex(step=>step.id===c.stage);
 return `<div class="construction-readout" data-construction-phase="${esc(c.phase)}"><div class="construction-topline"><strong>${esc(jobPhase(j,s))}</strong><b>${percent}%</b></div>${progress(percent,100,'gold')}<p class="construction-crew">${icon('people')}<b>${crew} / ${total}</b> χτίστες στο έργο${s.paused&&!compact?' · ο χρόνος έχει σταματήσει':''}</p>${stages&&stepList.length?`<ol class="construction-stages" aria-label="Στάδια κατασκευής">${stepList.map((step,i)=>`<li class="${i<stageIndex?'done':i===stageIndex?'current':''}" ${i===stageIndex?'aria-current="step"':''}><span>${i<stageIndex?'✓':i+1}</span>${esc(step.title)}</li>`).join('')}</ol>`:''}${!compact?`<p class="construction-caption">Εργασία που απομένει: ${time(c.remainingWorkSeconds??j.remaining)}${crew<total?' με πλήρες συνεργείο. Η μετάβαση προσθέτει χρόνο.':'.'}</p>`:''}${c.blockedReason?`<p class="job-blocked" role="status">${esc(c.blockedReason)}</p>`:''}</div>`;
}
function worksiteOverview(s,regionId){
 const jobs=s.jobs.filter(j=>j.kind==='build'&&j.regionId===regionId&&j.construction),returning=(s.returningCrews||[]).filter(c=>c.regionId===regionId);
 if(!jobs.length&&!returning.length)return '';
 return `<section class="worksite-overview" aria-label="Εργοτάξια του φέουδου" data-ui-key="worksites:${regionId}"><button class="worksite-toggle" data-action="worksites-toggle" aria-expanded="${view.worksitesOpen}" aria-controls="worksites-list">${icon('build')}<span>${jobs.length?'Έργα σε εξέλιξη':'Χτίστες σε επιστροφή'} <b>${jobs.length||returning.length}</b></span>${icon(view.worksitesOpen?'minus':'plus')}</button><div id="worksites-list" ${view.worksitesOpen?'':'hidden'}>${jobs.map(j=>`<article class="worksite-card" data-ui-key="worksite:${j.id}"><h3>${esc(BUILDINGS[j.type]?.name||j.type)}</h3>${constructionReadout(s,j)}<button class="button full" data-action="job-detail" data-value="${j.id}">${icon('focus')}Δείξε το εργοτάξιο</button></article>`).join('')}${returning.length?`<div class="crew-return"><p><b>${returning.length} ${returning.length===1?'χτίστης σε επιστροφή':'χτίστες σε επιστροφή'}</b> από ολοκληρωμένα έργα. Θα είναι διαθέσιμοι μόλις φτάσουν στον οικισμό.${returning.some(c=>c.phase==='blocked')?' Κάποιοι περιμένουν να ελευθερωθεί η διαδρομή.':''}</p><button class="button full" data-action="focus-returning" data-value="${regionId}">${icon('focus')}Δείξε το συνεργείο</button></div>`:''}</div></section>`;
}
function workforceActivity(s){
 const a=s.workerActivity;if(!a)return '';
 const items=[[a.traveling,'Πηγαίνουν σε έργο'],[a.working,'Χτίζουν'],[a.blocked,'Περιμένουν πρόσβαση'],[a.returning-(a.returningBlocked||0),'Επιστρέφουν'],[a.returningBlocked,'Περιμένουν διαδρομή επιστροφής'],[a.researching,'Μελετούν'],[a.fortification,'Ενισχύουν οχυρά']].filter(([n])=>n>0);
 if(!items.length)return '';
 return `<section class="workforce-activity" aria-label="Πού βρίσκονται οι δεσμευμένοι εργάτες"><h3>Πού βρίσκονται οι άνθρωποί σου</h3><div>${items.map(([n,label])=>`<span><b>${num(n)}</b>${label}</span>`).join('')}</div>${(s.returningCrews||[]).length?`<p>Οι χτίστες ελευθερώνονται όταν επιστρέψουν στον οικισμό.</p><button class="button full" data-action="focus-returning">${icon('focus')}Δείξε τους χτίστες που επιστρέφουν</button>`:''}</section>`;
}
function squadStatusHtml(s,u){
 const r=getSquadOrderReadout(s,u);
 return `<span class="army-task" data-order-status="${esc(r.status)}"><b>${s.paused?'Παύση · ':''}${esc(r.label)}</b><small>${esc(r.detail)}</small>${Number.isFinite(r.remainingDistance)?`<small class="army-route-distance">${num(r.remainingDistance)} μ. διαδρομής απομένουν</small>`:''}</span>`;
}
function armyStatusHtml(s,ids){
 const summary=getArmyOrderSummary(s,ids),entry=summary.count===1?summary.entries[0]:null;
 const detail=entry?(entry.capture?.contested?'Εχθροί στην πύλη':entry.status==='capturing'?`${entry.target?.name||'Οχυρό'} · ${Math.floor(entry.capture?.percent||0)}%`:entry.target?.name||({holding:'Φρουρεί τη θέση του',blocked:'Χρειάζεται προσβάσιμη διαδρομή',awaiting:'Περιμένει διαδρομή ή νέο στόχο'}[entry.status])||entry.orderLabel):summary.detail;
 return `<p class="army-order-caption" data-order-status="${esc(summary.status)}">${s.paused?'Παύση · ':''}${esc(summary.label)}</p><p class="army-order-detail" title="${esc(summary.detail)}">${esc(detail)}${entry&&Number.isFinite(entry.remainingDistance)?`<span class="army-route-distance">${num(entry.remainingDistance)} μ. διαδρομής απομένουν</span>`:''}</p>`;
}
function trainingQueue(s,regionId){
 const jobs=s.jobs.filter(j=>j.kind==='train'&&j.regionId===regionId);
 return `<section class="local-queue" aria-label="Ουρά εκπαίδευσης"><h3>Ουρά εκπαίδευσης <span>${jobs.length}/4</span></h3>${jobs.length?jobs.map(j=>`<article class="local-job" data-ui-key="local-job:${j.id}"><div class="job-topline"><span class="job-phase ${jobWaiting(j,s)?'waiting':''}">${jobPhase(j,s)}</span><b>${time(j.remaining)}</b></div><h4>${esc(UNIT_TYPES[j.type]?.name||j.type)}</h4><p>${esc(BUILDINGS[UNIT_TYPES[j.type]?.requires]?.name||'Εκπαίδευση')}${jobWaiting(j,s)?' · ξεκινά όταν αδειάσει η θέση':''}</p>${progress(j.duration-j.remaining,j.duration,'gold')}</article>`).join(''):'<p>Δεν εκπαιδεύεται απόσπασμα εδώ. Διάλεξε μονάδα από τις κάρτες παρακάτω.</p>'}<p class="queue-explanation">Κάθε είδος εγκατάστασης εκπαιδεύει ένα απόσπασμα τη φορά σε αυτό το φέουδο.</p></section>`;
}


const GUIDE_STEPS=[
 {id:'workers',panel:'economy',icon:'wood',title:'1. Βάλε ανθρώπους στους πόρους',text:'Το ξύλο, η πέτρα και ο σίδηρος χρειάζονται εργάτες. Άνοιξε τους εργάτες και πάτησε + δίπλα σε έναν πόρο. Ο αριθμός δείχνει πόσοι δουλεύουν εκεί.',button:'Δείξε μου τους εργάτες'},
 {id:'build',panel:'build',icon:'build',title:'2. Χτίσε το πρώτο σου κτίριο',text:'Διάλεξε Κατοικίες από το πλέγμα. Πάτησε στο έδαφος: πράσινο σημαίνει ότι χωρά. Περίστρεψε με R και πάτησε «Χτίσε εδώ». Τότε αφαιρούνται οι πόροι.',button:'Άνοιξε τις κατασκευές'},
 {id:'select',panel:'army',icon:'army',title:'3. Επίλεξε ποιοι θα υπακούσουν',text:'Επίλεξε αποσπάσματα με αριστερό σύρσιμο ή από τη λίστα στρατού. Τα πορτρέτα στο κάτω μέρος δείχνουν την επιλογή σου. Με Shift προσθέτεις ή αφαιρείς.',button:'Επίλεξε τους δορυφόρους'},
 {id:'move',panel:'army',icon:'move',title:'4. Δώσε μία διαταγή πορείας',text:'Πάτησε «Πορεία» και μετά ένα ελεύθερο σημείο στον χάρτη. Στον υπολογιστή μπορείς επίσης να κάνεις δεξί κλικ στο έδαφος. Οι επιλεγμένοι ακολουθούν τη διαταγή.',button:'Δώσε διαταγή πορείας'},
 {id:'train',panel:'army',icon:'sword',title:'5. Ετοίμασε ενισχύσεις',text:'Άνοιξε τη Στρατολόγηση. Κάθε κάρτα δείχνει το κόστος και τον χρόνο. Πάτησε «Εκπαίδευση» στους δορυφόρους και παρακολούθησε την εργασία μέχρι να ολοκληρωθεί.',button:'Άνοιξε τη στρατολόγηση'}
];
function readGuideProgress(){try{const raw=JSON.parse(storage.getItem('feouda-guide-v24-progress')||'{}');return Object.fromEntries(['workers','build','select','move','train'].map(id=>[id,raw[id]===true]));}catch{return {};}}
function completeGuide(id){if(view.guideDone[id])return;view.guideDone[id]=true;view.guideStep=null;store('feouda-guide-v24-progress',JSON.stringify(view.guideDone));}
function recordGuide(action,payload,result){
 if(!result?.ok)return;
 if(action==='assignWorkers'&&payload.delta>0)completeGuide('workers');
 if(action==='build'&&!payload.structureId&&payload.type!=='walls'&&Number.isFinite(payload.x))completeGuide('build');
 if(action==='train')completeGuide('train');
 if(action==='order'&&['move','attackMove'].includes(payload.type))completeGuide('move');
}

function guideBuildTarget(){
 const first=ownedRegion(),regions=first?[first,...owned().filter(r=>r.id!==first.id)]:owned();
 for(const type of ['houses',...CIVIL.filter(t=>t!=='houses')])for(const r of regions)if(preview('build',{type,regionId:r.id}).ok)return {type,regionId:r.id};
 return {type:'houses',regionId:first?.id};
}
function guideTrainingRegion(){return owned().find(r=>preview('train',{type:'spear',regionId:r.id}).ok)||owned().find(r=>game.state.regions[r.id].buildings.barracks>0)||ownedRegion();}
function currentGuideStep(){
 const step=GUIDE_STEPS.find(step=>step.id===view.guideStep)||GUIDE_STEPS.find(step=>!view.guideDone[step.id])||GUIDE_STEPS[4];
 if(step.id==='build'){
  const target=guideBuildTarget(),name=BUILD_SHORT[target.type];
  return {...step,text:`Διάλεξε ${name} από τις κάρτες. Πάτησε σε ελεύθερο έδαφος, περίστρεψε με το κουμπί Περιστροφή και επιβεβαίωσε με «Χτίσε εδώ». Το ποσό αφαιρείται στην επιβεβαίωση. Τέσσερις χτίστες πηγαίνουν στο έργο και δουλεύουν όταν φτάσουν.`,button:`Δείξε ${name}`};
 }
 if(step.id==='select'&&!squads().length)return {...step,text:'Δεν υπάρχει διαθέσιμο απόσπασμα. Άνοιξε τη στρατολόγηση, εκπαίδευσε ενισχύσεις και μετά επίλεξέ τες.',button:'Άνοιξε τη στρατολόγηση'};
 if(step.id==='select'&&innerWidth<=780)return {...step,text:'Πάτησε ένα απόσπασμα στον χάρτη ή από τη λίστα. Με «Πολλαπλή» προσθέτεις κι άλλα. Τα πορτρέτα στο κάτω μέρος δείχνουν ποιοι θα υπακούσουν.',button:'Δείξε τον διαθέσιμο στρατό'};
 if(step.id==='select')return {...step,button:'Επίλεξε διαθέσιμο απόσπασμα'};
 return step;
}
function renderGuide(){
 const step=currentGuideStep(),done=GUIDE_STEPS.filter(item=>view.guideDone[item.id]).length,advising=done===5&&!view.guideStep;
 $('game-shell').dataset.guideStep=(view.guideOpen||view.guideStep)&&!advising?step.id:'';
 $('game-shell').dataset.guideMode=advising?'advice':'learning';
 $('tactical-guide').hidden=!view.started||!!view.modal;$('tactical-guide').classList.toggle('collapsed',!view.guideOpen);$('game-shell').dataset.guideOpen=String(view.guideOpen);
 paint('guide-heading',`<button data-action="guide-toggle" aria-expanded="${view.guideOpen}" aria-controls="guide-body">${icon('help')}<span>Τι κάνω τώρα;</span><b>${view.guideOpen?'−':'+'}</b></button>`);
 $('guide-body').hidden=!view.guideOpen;
 if(!view.guideOpen)return;
 const steps=`<div class="guide-progress" role="group" aria-label="Βήματα εκμάθησης">${GUIDE_STEPS.map((item,i)=>`<button data-action="guide-step" data-value="${item.id}" class="${view.guideDone[item.id]?'complete':''} ${!advising&&item.id===step.id?'active':''}" aria-label="${esc(item.title)}${view.guideDone[item.id]?' · ολοκληρώθηκε':''}" aria-pressed="${!advising&&item.id===step.id}" title="${esc(item.title)}">${view.guideDone[item.id]?icon('check'):icon(item.icon)}<small>${i+1}</small></button>`).join('')}<span>${done}/5</span></div>`;
 const advice=advising?getCampaignAdvice(game.state):null;
 paint('guide-body',steps+(advice?`<div class="advice-card"><span class="eyebrow">Η ΚΑΤΑΣΤΑΣΗ ΤΗΣ ΗΓΕΜΟΝΙΑΣ</span><h3>${esc(advice.title)}</h3><p>${esc(advice.text)}</p>${adviceButton(advice.action,advice.label,'button brass full')}</div>`:`<h3>${esc(step.title)}</h3><p>${esc(step.text)}</p><button class="button brass full" data-action="guide-action" data-value="${step.id}">${icon(step.icon)}${esc(step.button)}</button>`)+`<div class="guide-footer"><span>${advising?'Οι προτάσεις ακολουθούν την τωρινή κατάσταση.':'Τα βήματα ολοκληρώνονται με πραγματικές ενέργειες.'}</span><button data-action="help">Οδηγίες & μενού</button></div>${done===5&&!advising?'<button class="button full guide-return" data-action="guide-advice">Τρέχουσα συμβουλή</button>':''}`);
}
function guideAction(id){
 if(view.placement)cancelPlacement({open:false});view.command=null;
 view.guideStep=id;if(innerWidth<=780){view.guideOpen=false;store('feouda-guide-v24-seen','1');}
 if(id==='workers')navigateAdvice({kind:'resource',type:'wood'});
 if(id==='build')navigateAdvice({kind:'build',...guideBuildTarget()});
 if(id==='select'){
  if(!squads().length){navigateAdvice({kind:'army',tab:'train',regionId:guideTrainingRegion()?.id});return;}
  view.armyTab='troops';chooseArmy(squads().some(s=>s.type==='spear')?'spear':squads()[0].type);setPanel('army');
 }
 if(id==='move'){if(!armyIds().length)chooseArmy();if(!armyIds().length){navigateAdvice({kind:'army',tab:'train',regionId:guideTrainingRegion()?.id});return;}armyCommand('move');}
 if(id==='train')navigateAdvice({kind:'army',tab:'train',regionId:guideTrainingRegion()?.id});
}

function readControlGroups(){
 try{const raw=JSON.parse(storage.getItem('feouda-control-groups-v1')||'{}');return Object.fromEntries(Object.entries(raw).filter(([key,value])=>/^[1-9]$/.test(key)&&Array.isArray(value)).map(([key,value])=>[key,[...new Set(value.filter(id=>typeof id==='string'))]]));}catch{return {};}
}
function markupKey(node){
 if(node.nodeType!==1)return null;
 if(node.hasAttribute('data-ui-key'))return 'key:'+node.getAttribute('data-ui-key');
 if(node.id)return 'id:'+node.id;
 const d=node.dataset;if(d?.action)return [node.localName,d.action,d.value||'',d.region||'',d.delta||'',d.trade||'',d.structure||''].join(':');
 return null;
}
function patchNode(oldNode,newNode){
 if(oldNode.nodeType===3||oldNode.nodeType===8){if(oldNode.nodeValue!==newNode.nodeValue)oldNode.nodeValue=newNode.nodeValue;return;}
 // Artwork is immutable; leave gradient ids and asynchronous image loading state intact.
 if(oldNode.hasAttribute('data-static-art')&&oldNode.getAttribute('data-static-art')===newNode.getAttribute('data-static-art'))return;
 if(oldNode.localName==='svg'&&oldNode.getAttribute('data-art')===newNode.getAttribute('data-art')&&oldNode.hasAttribute('data-art'))return;
 for(const attr of [...oldNode.attributes])if(!newNode.hasAttribute(attr.name))oldNode.removeAttribute(attr.name);
 for(const attr of [...newNode.attributes])if(oldNode.getAttribute(attr.name)!==attr.value)oldNode.setAttribute(attr.name,attr.value);
 patchChildren(oldNode,newNode);
}
function patchChildren(parent,source){
 const original=[...parent.childNodes],keyed=new Map(original.map(node=>[markupKey(node),node]).filter(([key])=>key));
 const used=new Set();let cursor=parent.firstChild;
 for(const fresh of [...source.childNodes]){
  const key=markupKey(fresh);let node=key?keyed.get(key):cursor;
  if(node&&(used.has(node)||node.nodeType!==fresh.nodeType||node.localName!==fresh.localName||(!key&&markupKey(node))))node=null;
  if(!node){node=fresh.cloneNode(true);parent.insertBefore(node,cursor);}
  else{if(node!==cursor)parent.insertBefore(node,cursor);patchNode(node,fresh);}
  used.add(node);cursor=node.nextSibling;
 }
 for(const node of original)if(!used.has(node)&&node.parentNode===parent)node.remove();
}
function paint(id,html){const template=document.createElement('template');template.innerHTML=html;patchChildren($(id),template.content);}
function focusArmy(ids=armyIds()){
 const selected=squads().filter(s=>ids.includes(s.id));if(!selected.length)return;
 world?.focus({x:selected.reduce((v,s)=>v+s.x,0)/selected.length,z:selected.reduce((v,s)=>v+s.z,0)/selected.length});
}
function groupIds(number){const living=new Set(squads().map(s=>s.id));return (view.controlGroups[number]||[]).filter(id=>living.has(id));}
function useControlGroup(number,{assign=false,append=false,add=false}={}){
 const current=view.selection.kind==='army'?armyIds():[];
 if(assign||append||view.groupAssign){
  const ids=append?[...new Set([...groupIds(number),...current])]:current;
  view.controlGroups[number]=ids;store('feouda-control-groups-v1',JSON.stringify(view.controlGroups));view.groupAssign=false;
  toast(ids.length?'Ομάδα '+number+' · '+ids.length+' αποσπάσματα.':'Η ομάδα '+number+' αδειάστηκε.');render(true);return;
 }
 const ids=groupIds(number);if(!ids.length){toast('Η ομάδα '+number+' είναι κενή. Επίλεξε στρατό και πάτησε Ctrl + '+number+' ή «Ανάθεση».',true);return;}
 const now=performance.now(),center=view.lastGroup===number&&now-view.lastGroupAt<450&&!add;
 setSelection({kind:'army',ids},{add});if(center)focusArmy(ids);view.lastGroup=number;view.lastGroupAt=now;
}
function controlGroupBar(){
 const selected=new Set(armyIds());
 return `<div class="control-group-bar" data-ui-key="groups"><span class="group-caption">ΟΜΑΔΕΣ</span><div class="control-groups" role="group" aria-label="Ομάδες στρατού 1 έως 9">${Array.from({length:9},(_,i)=>{const n=String(i+1),ids=groupIds(n),active=ids.length&&ids.length===selected.size&&ids.every(id=>selected.has(id));return `<button data-action="control-group" data-value="${n}" class="${ids.length?'assigned':''} ${active?'active':''}" aria-label="Ομάδα ${n}: ${ids.length} αποσπάσματα" aria-pressed="${!!active}" title="${n}: επιλογή · Ctrl+${n}: ανάθεση · Shift+${n}: προσθήκη στην επιλογή"><b>${n}</b><small>${ids.length||'—'}</small></button>`}).join('')}</div><button class="group-assign ${view.groupAssign?'active':''}" data-action="group-assign" aria-pressed="${view.groupAssign}" title="Επίλεξε αποσπάσματα, πάτησε Ανάθεση και μετά αριθμό ομάδας">${view.groupAssign?'Διάλεξε 1–9':'Ανάθεση'}</button></div>`;
}
function buildTypeDetails(s,type,r){
 const b=BUILDINGS[type],q=preview('build',{type,regionId:r.id}),plots=(s.structures||[]).filter(st=>st.regionId===r.id&&st.type===type),jobs=s.jobs.filter(j=>j.kind==='build'&&j.type===type&&j.regionId===r.id);
 return `<section class="build-inspector" data-ui-key="build-inspector" aria-label="Λεπτομέρειες κτιρίου"><div class="inspector-heading"><span class="building-portrait">${buildingPortrait(type)}</span><div><h3>${esc(b.name)}</h3><span class="benefit">${esc(b.benefit)}</span></div><span class="build-duration">${icon('clock')}${time(q.duration||b.time)}</span></div><p>${esc(b.description)}</p>${!q.ok?`<p class="reason unavailable-reason" role="status">${esc(q.message)}</p>`:'<p class="reason">Πάτησε το κτίριο στο πλέγμα και διάλεξε θέση στον χάρτη.</p>'}${jobs.map(j=>`<div class="inspector-job" data-ui-key="job:${j.id}">${constructionReadout(s,j,{stages:true})}<button class="button full" data-action="job-detail" data-value="${j.id}">${icon('focus')}Δείξε το εργοτάξιο</button></div>`).join('')}${plots.length?`<div class="existing-plots">${plots.map((st,i)=>`<button data-action="select-structure" data-value="${st.id}" class="${view.selection.kind==='structure'&&view.selection.id===st.id?'selected':''}">${icon(st.status==='ready'?'focus':'build')}<span>${esc(b.name)} ${i+1}<small>${st.status==='ready'?'Βαθμίδα '+st.level:st.status==='upgrading'?'Αναβαθμίζεται':'Εργοτάξιο'}</small></span>${icon('chevron')}</button>`).join('')}</div>`:''}</section>`;
}
function inspectBuilding(type){
 if(!BUILDINGS[type]||view.panel!=='build'||!view.panelOpen)return;
 if(view.buildType!==type){view.buildType=type;render(true);}
 $('panel-body').querySelector('.build-inspector')?.scrollIntoView?.({block:'nearest',behavior:'auto'});
}
function trainTile(s,type,r,{structure=null,compact=false}={}){
 const u=UNIT_TYPES[type],q=preview('train',{type,regionId:r.id}),siteReady=!structure||structure.status==='ready',ok=q.ok&&siteReady,message=siteReady?q.message:'Το κτίριο πρέπει να ολοκληρωθεί πριν εκπαιδεύσει στρατό.',jobs=s.jobs.filter(j=>j.kind==='train'&&j.type===type&&j.regionId===r.id);
 const requirements=getTrainingRequirements(s,type,r.id),missing=requirements.find(item=>!item.met),key=r.id+':'+type;
 const checklist=`<details class="training-requirements" data-training-requirements="${key}" ${view.requirementsOpen[key]?'open':''}><summary>Τι χρειάζεται; <span>${requirements.filter(item=>item.met).length}/${requirements.length}</span></summary>${requirements.map(item=>`<div class="requirement ${item.met?'met':'missing'}"><span class="check" aria-label="${item.met?'Διαθέσιμο':'Λείπει'}">${item.met?'✓':'!'}</span><div><b>${esc(item.label)}</b><small>${esc(item.detail)}</small>${!item.met&&item.action?adviceButton(item.action,item.actionLabel||'Δείξε μου','requirement-action'):''}</div></div>`).join('')}</details>`;
 return `<article class="recruit-cell ${compact?'compact':''}" data-ui-key="train:${type}"><div class="recruit-heading"><span class="portrait">${unitPortrait(type)}</span><div><h3>${esc(u.name)}</h3><small>${u.men} ${u.role==='siege'?'χειριστές':'άνδρες'} · ${time(q.duration||u.trainTime)}</small></div></div><p class="recruit-facility">${icon('castle')}${esc(BUILDINGS[u.requires].name)}</p>${!compact?`<p class="recruit-description">${esc(u.description)}</p>`:''}${costHtml(q.cost||u.cost)}<button class="button full small" data-action="train" data-value="${type}" data-region="${r.id}" ${structure?`data-structure="${structure.id}"`:''} ${ok?'':'disabled'} title="${esc(ok?'Εκπαίδευση '+u.name:message)}">${icon('plus')}${compact?'Εκπαίδευση':'Εκπαίδευσε απόσπασμα'}${jobs.length?` <b class="train-queued">${jobs.length}</b>`:''}</button>${!ok?`<p class="reason">${esc(message)}</p>${missing?.action?adviceButton(missing.action,missing.actionLabel||'Δείξε τι χρειάζεται','button full prerequisite-link'):''}`:''}${!compact?checklist:''}</article>`;
}
function tone(kind='select'){if(!view.sound)return;try{audioContext??=new(window.AudioContext||window.webkitAudioContext)();audioContext.resume();const t=audioContext.currentTime;const frequencies=kind==='error'?[115,90]:kind==='war'?[98,147,196]:kind==='success'?[247,330,392]:[196,294];frequencies.forEach((f,i)=>{const o=audioContext.createOscillator(),g=audioContext.createGain();o.type=kind==='war'?'triangle':'sine';o.frequency.setValueAtTime(f,t+i*.055);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.042,t+i*.055+.01);g.gain.exponentialRampToValueAtTime(.0001,t+i*.055+.2);o.connect(g);g.connect(audioContext.destination);o.start(t+i*.055);o.stop(t+i*.055+.25);});}catch{}}
function toast(message,error=false){if(!message)return;const d=document.createElement('div');d.className='toast'+(error?' error':'');d.innerHTML=icon(error?'warning':'check')+'<span>'+esc(message)+'</span>';$('toasts').append(d);while($('toasts').children.length>3)$('toasts').firstElementChild.remove();setTimeout(()=>d.remove(),4200);tone(error?'error':'success');}
function act(action,payload,quiet=false){const result=game.command(action,payload);recordGuide(action,payload,result);if(!quiet||!result.ok)toast(result.message,!result.ok);render(true);return result;}
function setInsets(){
 const mobile=innerWidth<=780,army=view.selection.kind==='army'&&armyIds().length&&!view.placement,st=view.selection.kind==='structure'?game.state.structures?.find(item=>item.id===view.selection.id):null,production=st&&Object.values(UNIT_TYPES).some(u=>u.requires===st.type);
 world?.setInsets({left:mobile?0:234,right:!mobile&&view.panelOpen?428:0,top:mobile?142:157,bottom:mobile?(production?372:army?(view.panelOpen?290:350):231):(production?288:army?270:165)});
}
function setPanel(id,open=true){view.panel=id;view.panelOpen=open;$('panel-body').scrollTop=0;render(true);setInsets();}
function updateInput(){world?.setInputEnabled(view.started&&!view.modal&&!bootFailed);for(const child of $('game-shell').children){if(child.id!=='modal-root')child.inert=!!view.modal;}}
function setSelection(selection,{open=false,focus=false,add=false,toggle=false}={}){
 if(!selection)return;
 const alive=new Set(squads().map(s=>s.id));
 if(selection.kind==='squad'){
  const squad=game.state.squads.find(s=>s.id===selection.id);
  if(squad?.owner==='player'){
   const current=armyIds();view.armyIds=(add||toggle)?(toggle&&current.includes(squad.id)?current.filter(id=>id!==squad.id):[...new Set([...current,squad.id])]):[squad.id];
   selection={kind:'army',ids:[...view.armyIds]};
  }
 }else if(selection.kind==='army'){
  const incoming=(selection.ids||[]).filter(id=>alive.has(id));view.armyIds=add?[...new Set([...armyIds(),...incoming])]:incoming;
  selection={kind:'army',ids:[...view.armyIds]};
 }
 view.selection=selection;
 if(selection.kind==='army'&&!selection.ids.length)view.command=null;else if(selection.kind==='army'&&selection.ids.length)completeGuide('select');
 if(selection.kind==='structure'){
  const st=game.state.structures?.find(a=>a.id===selection.id);
  if(st){view.regionId=st.regionId;view.buildType=st.type;view.buildTab=MILITARY.includes(st.type)?'military':'civil';if(focus)world?.focus(st);}
  if(open){view.panel='build';view.panelOpen=!Object.values(UNIT_TYPES).some(u=>u.requires===st?.type);}
 }
 if(selection.kind==='region'){view.regionId=selection.id;if(open){view.panel='realm';view.panelOpen=true;}if(focus)world?.focus(selection.id);}
 if(selection.kind==='node'){const n=game.state.nodes.find(n=>n.id===selection.id);if(n){view.regionId=n.regionId;if(focus)world?.focus(n);}if(open){view.panel='economy';view.panelOpen=true;}}
 world?.setSelection(selection);tone();render(true);setInsets();
}
function placementPayload(){const p=view.placement;return p?{type:p.type,regionId:p.regionId,x:p.x,z:p.z,rotation:p.rotation}:null;}
function refreshPlacement(){
 const p=view.placement;if(!p)return;
 const quote=preview('build',placementPayload()),footprint=BUILD_FOOTPRINTS[p.type];p.quote=quote;
 world?.setPlacement({...p,...footprint,...quote.placement,valid:quote.ok});
 $('game-shell').dataset.placing=p.type;
}
function startPlacement(type,regionId){
 const quote=preview('build',{type,regionId});if(!quote.ok){toast(quote.message,true);return;}
 if(type==='walls'){act('build',{type,regionId});return;}
 const point=game.findBuildLocation(type,regionId,0)||regionById[regionId];
 view.command=null;view.buildType=type;view.regionId=regionId;view.panel='build';view.panelOpen=false;
 view.placement={type,regionId,x:point.x,z:point.z,rotation:0,anchored:false,quote};
 refreshPlacement();world?.focus(point);setInsets();render(true);
}
function movePlacement(point,anchor=false){
 const p=view.placement;if(!p||(!anchor&&p.anchored)||!Number.isFinite(point?.x)||!Number.isFinite(point?.z))return;
 p.x=point.x;p.z=point.z;p.anchored=anchor;refreshPlacement();renderDeck(game.state);renderAlerts(game.state);if(anchor)tone();
}
function cancelPlacement({open=true}={}){
 if(!view.placement)return;view.placement=null;world?.clearPlacement();delete $('game-shell').dataset.placing;
 if(open){view.panel='build';view.panelOpen=true;}render(true);setInsets();
}
function rotatePlacement(){const p=view.placement;if(!p)return;p.rotation=(p.rotation+Math.PI/2)%(Math.PI*2);refreshPlacement();renderDeck(game.state);renderAlerts(game.state);}
function confirmPlacement(){
 const p=view.placement;if(!p||!p.anchored)return;refreshPlacement();if(!p.quote.ok){toast(p.quote.message,true);render(true);return;}
 const before=new Set((game.state.structures||[]).map(a=>a.id)),result=game.command('build',placementPayload());
 if(!result.ok){toast(result.message,true);refreshPlacement();render(true);return;}
 recordGuide('build',placementPayload(),result);const structure=game.state.structures.find(a=>!before.has(a.id));cancelPlacement({open:false});
 if(structure)setSelection({kind:'structure',id:structure.id});toast(result.message);render(true);
}
function placementDeck(){
 const p=view.placement,q=p.quote,b=BUILDINGS[p.type],angle=Math.round(p.rotation*180/Math.PI)%360;
 return `<div class="placement-copy"><span class="eyebrow">ΤΟΠΟΘΕΤΗΣΗ · ${esc(regionById[p.regionId].name)}</span><h3>${esc(b.name)}</h3><p class="placement-status ${q.ok?'valid':'invalid'}" role="status">${q.ok?(p.anchored?'Έτοιμο για κατασκευή.':'Πάτησε στον χάρτη για να ορίσεις θέση.'):esc(q.message)}</p>${costHtml(q.cost||b.cost)}<span class="placement-meta">${time(q.duration||b.time)} χτίσιμο + μετάβαση 4 χτιστών · ${angle}° · ${p.anchored?'Θέση επιλεγμένη':'Προεπισκόπηση'}</span></div><div class="placement-actions"><button class="button" data-action="placement-rotate" title="Περιστροφή 90° · R">↻ <span>Περιστροφή</span></button>${p.anchored?'<button class="button" data-action="placement-move">'+icon('move')+'<span>Άλλη θέση</span></button>':''}<button class="button brass" data-action="placement-confirm" ${q.ok&&p.anchored?'':'disabled'}>${icon('build')}<span>Χτίσε εδώ</span></button><button class="button placement-cancel" data-action="placement-cancel" aria-label="Ακύρωση τοποθέτησης">${icon('close')}<span>Ακύρωση</span></button></div>`;
}
function chooseArmy(type='all',{add=false}={}){
 const ss=squads().filter(s=>type==='all'||s.type===type||UNIT_TYPES[s.type].role===type);
 setSelection({kind:'army',ids:ss.map(s=>s.id)},{add});if(!ss.length)toast('Δεν διαθέτεις τέτοιο απόσπασμα.',true);
}
function issue(point,target=null){const ids=armyIds();if(!ids.length){toast('Επίλεξε πρώτα ένα ή περισσότερα δικά σου αποσπάσματα.',true);return;}let type=view.command||'move',payload={ids,type,x:point?.x,z:point?.z};if(target?.kind==='squad'){const s=game.state.squads.find(s=>s.id===target.id);if(!s||s.hp<=0){toast('Ο στόχος δεν υπάρχει πια.',true);return;}if(s.owner!=='player'){payload={ids,type:'attack',targetId:s.id};}else payload={ids,type:'move',x:s.x,z:s.z};}else if(target?.kind==='region'){const r=regionById[target.id],owner=game.state.regions[r.id]?.owner;const hasInfantry=game.state.squads.some(s=>ids.includes(s.id)&&UNIT_TYPES[s.type].role==='infantry');payload=owner==='player'?{ids,type:'move',x:r.x,z:r.z+32}:{ids,type:view.command==='attack'||!hasInfantry?'attack':'capture',regionId:r.id};}else if(type==='attack'&&point){payload={ids,type:'attackMove',x:point.x,z:point.z};}const result=act('order',payload);if(result.ok){view.command=null;setSelection({kind:'army',ids});tone('war');}render(true);}
function onMapSelect(selection,event){
 if(view.placement)return;
 if(view.command&&armyIds().length){const p=selection.kind==='region'?regionById[selection.id]:selection.kind==='node'?game.state.nodes.find(n=>n.id===selection.id):selection.kind==='structure'?game.state.structures.find(n=>n.id===selection.id):game.state.squads.find(s=>s.id===selection.id);issue(p,selection);return;}
 setSelection(selection,{open:selection.kind!=='squad'&&selection.kind!=='army',toggle:!!event?.shiftKey||view.armyMulti});
}
// Keep icon nodes stable between simulation ticks so a press is not detached before click.
function renderControlIcon(id,name){const button=$(id);if(button.dataset.icon!==name){button.innerHTML=icon(name);button.dataset.icon=name;}}
function renderResources(s){const fields=['money','wood','stone','iron','food'];paint('resource-bar',fields.map(k=>{let rate=k==='money'?(s.income||0)-(s.upkeep||0):k==='food'?(s.foodBalance||0):(s.gatherRates?.[k]||0);return `<button class="resource" data-action="resource" data-value="${k}" title="${esc(RESOURCE_NAMES[k])}">${icon(k)}<span><span class="number">${k==='money'?'CY£ ':''}${num(s.resources[k],k==='money'?0:0)}<small class="${rate<0?'negative':''}">${rate>=0?'+':''}${num(rate*60,1)}/λ</small></span><label>${k==='money'?'ΚΟΙΝΟ ΤΑΜΕΙΟ':k==='food'?'ΤΡΟΦΙΜΑ':k==='wood'?'ΞΥΛΕΙΑ':k==='stone'?'ΠΕΤΡΑ':'ΣΙΔΗΡΟΣ'}</label></span></button>`}).join('')+`<button class="resource population" data-action="panel" data-value="economy">${icon('people')}<span><span class="number">${num(s.population)} / ${num(s.housing)}<small>${num(s.availableWorkers)} ελεύθεροι</small></span><label>ΚΑΤΟΙΚΟΙ</label></span></button>`);}
function regionPicker(r){return `<div class="owner-line"><span class="crest">${crest('player')}</span><span><b>${esc(r?.name||'Χωρίς φέουδο')}</b><small>Επίλεξε άλλο δικό σου οχυρό στον χάρτη.</small></span></div>`;}
function realmPanel(s){const r=currentRegion(),rs=s.regions[r.id],owner=FACTIONS[rs.owner],here=s.squads.filter(u=>u.owner===rs.owner&&u.hp>0&&Math.hypot(u.x-r.x,u.z-r.z)<52),isOwn=rs.owner==='player',repairQuote=preview('repair',{regionId:r.id});return `<div class="owner-line"><span class="crest">${crest(rs.owner)}</span><span><b>${esc(r.name)}</b><small>${esc(owner.shortName)} · ${esc(r.subtitle)}</small></span></div><div class="stat-pair large"><span>Αντοχή οχυρού</span><b>${num(rs.fortHp)} <small>/ ${num(rs.maxFortHp)}</small></b></div>${progress(rs.fortHp,rs.maxFortHp,isOwn?'':'red')}<div class="stat-pair"><span>Αποσπάσματα κοντά</span><b>${here.length}</b></div>${rs.capture>0?`<div class="stat-pair"><span>Έλεγχος της πύλης</span><b>${num(rs.capture)}%</b></div>${progress(rs.capture,100,'gold')}`:''}<div class="button-row"><button class="button" data-action="focus-region" data-value="${r.id}">${icon('focus')}Εστίαση</button>${isOwn?`<button class="button" data-action="panel" data-value="build">${icon('build')}Έργα</button>`:`<button class="button red" data-action="besiege" data-value="${r.id}">${icon('attack')}Πολιορκία</button>`}</div>${isOwn?`<button class="button full small" data-action="repair" data-value="${r.id}" ${repairQuote.ok?'':'disabled'}>${icon('shield')}Επισκευή τειχών</button>${rs.fortHp<rs.maxFortHp?costHtml(repairQuote.cost):''}${s.jobs.filter(j=>j.regionId===r.id&&j.blocked).map(j=>`<p class="job-blocked" role="status">${esc(j.blockedReason||'Το έργο περιμένει να ελευθερωθεί ο χώρος.')}</p>`).join('')}<div class="section-title">ΟΙ ΑΝΘΡΩΠΟΙ ΤΗΣ ΗΓΕΜΟΝΙΑΣ</div><div class="stat-pair"><span>Ηθικό</span><b>${num(s.morale)} / 100</b></div>${progress(s.morale,100)}<div class="stat-pair"><span>Ευημερία</span><b>${num(s.prosperity)} / 100</b></div>${progress(s.prosperity,100,'gold')}<p class="panel-description" style="margin-top:13px">Στέγη, νερό και επαρκής τροφή βοηθούν τους οικισμούς να προοδεύουν. Κράτησε διαθέσιμα χέρια και για τα έργα σου.</p>`:`<p class="panel-description">Χρειάζεσαι γειτονικό δικό σου φέουδο για να κρατήσεις αυτή την περιοχή. Οι μηχανές γκρεμίζουν την οχύρωση· το πεζικό μπαίνει στο οχυρό και το καταλαμβάνει.</p>`}<div class="section-title">ΧΑΡΤΗΣ ΚΥΡΙΑΡΧΙΑΣ · ${owned().length}/9</div>${REGIONS.map(p=>{const a=s.regions[p.id];return `<div class="province-row" style="--faction-color:${FACTIONS[a.owner].color}"><span class="province-mark">${icon(p.kind==='castle'?'castle':'flag')}</span><span class="province-copy"><h3>${esc(p.name)}</h3><p>${esc(FACTIONS[a.owner].shortName)}</p></span><button data-action="select-region" data-value="${p.id}" aria-label="Επίλεξε ${esc(p.name)}">${icon('chevron')}</button></div>`}).join('')}`;}
function buildPanel(s){
 const r=ownedRegion();if(!r)return '<p class="empty">Χρειάζεσαι ένα δικό σου φέουδο.</p>';
 const list=view.buildTab==='civil'?CIVIL:MILITARY;
 if(!list.includes(view.buildType))view.buildType=list[0];
 return `${regionSelector(r,'building')}<div class="build-location" data-ui-key="build-location"><span class="crest">${crest('player')}</span><div><b>${esc(r.name)}</b><small>${num(s.availableWorkers)} διαθέσιμοι εργάτες · επίλεξε κτίριο</small></div></div>${worksiteOverview(s,r.id)}<div class="category-tabs build-tabs" role="group" aria-label="Κατηγορίες κατασκευών"><button data-action="build-tab" data-value="civil" class="${view.buildTab==='civil'?'active':''}" aria-pressed="${view.buildTab==='civil'}">${icon('home')}Οικισμός</button><button data-action="build-tab" data-value="military" class="${view.buildTab==='military'?'active':''}" aria-pressed="${view.buildTab==='military'}">${icon('shield')}Στρατός & τείχη</button></div><div class="build-command-grid" role="group" aria-label="Πλέγμα κατασκευών">${list.map(type=>{
  const b=BUILDINGS[type],q=preview('build',{type,regionId:r.id}),job=s.jobs.find(j=>j.kind==='build'&&j.type===type&&j.regionId===r.id),count=(s.structures||[]).filter(st=>st.regionId===r.id&&st.type===type).length;
  return `<article class="build-cell ${view.buildType===type?'inspected':''} ${q.ok?'available':'unavailable'}" data-ui-key="build:${type}" data-building-type="${type}"><button class="build-tile" data-action="build" data-value="${type}" data-region="${r.id}" ${q.ok?'':'disabled'} title="${esc(q.ok?b.name+' · τοποθέτηση στον χάρτη':q.message)}" aria-label="${esc(b.name)}: ${q.ok?'τοποθέτηση στον χάρτη':esc(q.message)}"><span class="building-portrait">${buildingPortrait(type)}</span><strong>${esc(BUILD_SHORT[type]||b.name)}</strong><small class="build-benefit">${esc(b.benefit)}</small><span class="build-call">${q.ok?(type==='walls'?'Ενίσχυσε τα τείχη':'Επίλεξε θέση'):'Μη διαθέσιμο'}</span></button>${count?`<span class="building-count" title="${count} κτίρια στην περιοχή">${count}</span>`:''}${costHtml(q.cost||b.cost)}<button class="build-inspect" data-action="build-inspect" data-value="${type}" aria-label="Λεπτομέρειες: ${esc(b.name)}" aria-pressed="${view.buildType===type}" title="Κόστος, όφελος και υπάρχοντα κτίρια">${q.ok?'Τι προσφέρει;':'Τι χρειάζεται;'}</button><span class="tile-state ${q.ok?'':'blocked'}" title="${esc(q.message||'')}">${job?jobPhase(job,s)+' · '+constructionPercent(job)+'%':q.ok?time(q.duration||b.time):'Μη διαθέσιμο'}</span></article>`;
 }).join('')}</div>${buildTypeDetails(s,view.buildType,r)}`;
}
function economyPanel(s){
 const nodes=s.nodes.filter(n=>s.regions[n.regionId]?.owner==='player'&&(view.resourceFilter==='all'||n.type===view.resourceFilter));
 const food=(s.foodBalance||0)*60;
 return `${panelIntro('people','Οι άνθρωποί σου παράγουν πόρους','Ανάθεσε εργάτες σε κάθε πηγή. Το απόθεμα ανεβαίνει όσο δουλεύουν· ελευθέρωσε μερικούς όταν χρειάζεσαι χέρια για κατασκευές.')}<div class="assignment-summary"><span>Ελεύθεροι<br><b>${num(s.availableWorkers)}</b></span><span>Στους πόρους<br><b>${num(s.assignedWorkers)}</b></span><span>Σε έργα / επιστροφή<br><b>${num(s.busyWorkers)}</b></span></div>${workforceActivity(s)}<div class="workforce-notice ${food<0?'warning':''}"><p><b>${food<0?'Χάνεις τρόφιμα':'Ισοζύγιο τροφής'}: ${food>0?'+':''}${num(food,1)} / λεπτό</b></p><p>${food<0?'Οι κάτοικοι και ο στρατός καταναλώνουν περισσότερα από όσα παράγεις. Ανάθεσε περισσότερους στα τρόφιμα.':'Η ένδειξη περιλαμβάνει παραγωγή και κατανάλωση κατοίκων και στρατού.'}</p>${food<0?adviceButton({kind:'resource',type:'food'},'Δείξε τις πηγές τροφίμων','button full'):''}</div><div class="category-tabs" aria-label="Είδος πόρου">${['all','food','wood','stone','iron'].map(k=>`<button data-action="resource-filter" data-value="${k}" class="${view.resourceFilter===k?'active':''}" aria-pressed="${view.resourceFilter===k}">${k==='all'?'Όλα':esc(RESOURCE_NAMES[k])}</button>`).join('')}</div>${nodes.map(n=>{
  const production=getNodeProduction(s,n),add=preview('assignWorkers',{nodeId:n.id,delta:1}),region=regionById[n.regionId];
  return `<article class="worker-card resource-node ${view.selection.kind==='node'&&view.selection.id===n.id?'node-selected':''}" data-node="${n.id}" data-ui-key="node:${n.id}"><div class="worker-heading"><button class="node-symbol" data-action="focus-node" data-value="${n.id}" aria-label="Δείξε ${esc(RESOURCE_NAMES[n.type])} στο ${esc(region.name)} στον χάρτη">${icon(n.type)}</button><div><h3>${esc(RESOURCE_NAMES[n.type])}</h3><small>${esc(region.name)}</small></div><div class="worker-yield"><strong>+${num(production.totalPerMinute,1)}</strong><small>ανά λεπτό</small></div></div><p class="worker-stock">${num(n.amount)} απομένουν στην πηγή</p><div class="worker-assignment node-controls"><button data-action="worker" data-value="${n.id}" data-delta="-1" aria-label="Ελευθέρωσε έναν εργάτη από ${esc(RESOURCE_NAMES[n.type])} στο ${esc(region.name)}" ${n.workers?'':'disabled'}>−1 εργάτη</button><div class="worker-count"><b>${n.workers}<small> / ${production.maxWorkers}</small></b><span>εργάτες</span></div><button data-action="worker" data-value="${n.id}" data-delta="1" aria-label="Ανάθεσε έναν εργάτη σε ${esc(RESOURCE_NAMES[n.type])} στο ${esc(region.name)}" ${add.ok?'':'disabled'}>+1 εργάτη</button></div><p class="worker-feedback ${add.ok?'':'unavailable-reason'}">${add.ok?`Κάθε επιπλέον εργάτης: +${num(production.perWorkerPerMinute,1)} ${esc(RESOURCE_NAMES[n.type].toLowerCase())} / λεπτό.`:esc(add.message)}</p></article>`;
 }).join('')||'<p class="empty">Δεν ελέγχεις πηγή αυτού του πόρου.</p>'}<p class="panel-description production-note">Οι αποδόσεις είναι ανά λεπτό προσομοίωσης, στο 1×. Η παύση σταματά την παραγωγή. Το 2× και το 4× επιταχύνουν και τον χρόνο.</p><div class="section-title">ΤΑΜΕΙΟ & ΣΥΝΤΗΡΗΣΗ</div><div class="stat-pair"><span>Εισφορές / λεπτό</span><b>${money((s.income||0)*60)}</b></div><div class="stat-pair"><span>Συντήρηση / λεπτό</span><b>${money((s.upkeep||0)*60)}</b></div>`;
}
function armyPanel(s){
 const r=ownedRegion(),all=squads(),selected=armyIds();
 const typeFilters=`<div class="army-type-grid" role="group" aria-label="Επιλογή ανά τύπο στρατού">${Object.entries(UNIT_TYPES).map(([type,u])=>{const units=all.filter(a=>a.type===type),count=units.reduce((sum,a)=>sum+a.men,0),active=units.length&&units.every(a=>selected.includes(a.id));return `<button data-action="select-army" data-value="${type}" class="${active?'active':''}" ${units.length?'':'disabled'} aria-pressed="${!!active}" title="${esc(u.name)}: ${units.length} αποσπάσματα. Shift: προσθήκη στην επιλογή.">${icon(type)}<span>${esc(u.plural)}<b>${count}</b></span></button>`}).join('')}</div>`;
 return `${panelIntro('army','Επίλεξε στρατό ή ετοίμασε ενισχύσεις','Στο πεδίο επιλέγεις τα αποσπάσματα που θα υπακούσουν. Στη στρατολόγηση διαλέγεις φέουδο, μονάδα και εγκατάσταση.')}<div class="stat-pair army-capacity"><span>Στρατός</span><b>${num(s.armyUsed)} / ${num(s.armyCapacity)} άνδρες</b></div><div class="category-tabs"><button data-action="army-tab" data-value="troops" class="${view.armyTab==='troops'?'active':''}">Στο πεδίο (${all.length})</button><button data-action="army-tab" data-value="train" class="${view.armyTab==='train'?'active':''}">Στρατολόγηση</button></div>${view.armyTab==='troops'?`<div class="army-selection-tools"><button class="button small" data-action="select-army" data-value="all">${icon('army')}Όλος ο στρατός</button><button class="button small" data-action="select-army" data-value="siege">${icon('ram')}Μηχανές</button><button class="button small ${view.armyMulti?'active':''}" data-action="multi-select" aria-pressed="${view.armyMulti}" title="Πάτησε αποσπάσματα για προσθήκη ή αφαίρεση">${icon('plus')}Πολλαπλή</button></div>${typeFilters}<div class="roster-heading"><span>${selected.length} ΕΠΙΛΕΓΜΕΝΑ ΑΠΟΣΠΑΣΜΑΤΑ</span><button data-action="clear-selection" ${selected.length?'':'disabled'}>Καθαρισμός</button></div><div class="army-list">${all.map(u=>`<button class="army-row ${selected.includes(u.id)?'selected':''}" data-action="select-squad" data-value="${u.id}" aria-pressed="${selected.includes(u.id)}" title="Shift + πάτημα: προσθήκη / αφαίρεση"><span class="selection-check">${selected.includes(u.id)?'✓':''}</span><span class="portrait">${unitPortrait(u.type)}</span><span class="army-info"><b>${esc(UNIT_TYPES[u.type].name)}</b>${squadStatusHtml(s,u)}${progress(u.hp,u.maxHp)}</span><span class="count">${u.men}</span></button>`).join('')}</div><p class="reason input-guide">Υπολογιστής: σύρε με αριστερό κλικ για επιλογή. Shift: προσθήκη / αφαίρεση. Διπλό κλικ: ίδιος τύπος στην οθόνη. Δεξί κλικ: διαταγή. Κινητό: πάτησε «Πολλαπλή» και διάλεξε αποσπάσματα.</p>`:r?`${regionSelector(r)}<div class="build-location"><span class="crest">${crest('player')}</span><div><b>${esc(r.name)}</b><small>Εκπαίδευση από τα κτίρια της περιοχής</small></div></div>${trainingQueue(s,r.id)}<div class="recruit-grid">${Object.keys(UNIT_TYPES).map(type=>trainTile(s,type,r)).join('')}</div>`:'<p class="empty">Δεν ελέγχεις οχυρό για εκπαίδευση.</p>'}`;
}
function researchPanel(s){return `<p class="panel-description">Οι τέχνες της εποχής βελτιώνουν ολόκληρη την ηγεμονία. Η Μηχανική αντιβάρου ξεκλειδώνει τα τρεμπουσέ.</p>${Object.entries(TECHS).map(([type,t])=>{const level=s.techs[type]||0,pr=preview('research',{type}),job=s.jobs.find(j=>j.kind==='research'&&j.type===type);return `<article class="research-item" data-tech="${type}" data-ui-key="research:${type}"><div class="item-heading"><h3>${esc(t.name)}</h3><span class="level">${level}/${t.max}</span></div><p>${esc(t.description)}</p><div class="benefit">${esc(t.benefit)}</div>${costHtml(pr.cost||t.cost)}${job?`${progress(job.duration-job.remaining,job.duration,'gold')}<p class="reason">Μελέτη σε εξέλιξη · ${time(job.remaining)}</p>`:`<button class="button full small" data-action="research" data-value="${type}" ${pr.ok?'':'disabled'}>${icon('research')}Μελέτη · ${time(pr.duration||t.time)}</button>${!pr.ok?`<p class="reason">${esc(pr.message)}</p>`:''}`}</article>`}).join('')}`;}
function chroniclePanel(s){
 const unfinished=s.missions.filter(m=>!m.done),completed=s.missions.filter(m=>m.done),next=unfinished[0];
 const missionCard=m=>{const guidance=getMissionGuidance(s,m),isNext=m.id===next?.id;
  return `<article class="mission ${m.done?'done':''} ${isNext?'next':''}" data-ui-key="mission:${m.id}">${isNext?'<span class="eyebrow">ΕΠΟΜΕΝΟΣ ΣΤΟΧΟΣ</span>':''}<h3>${m.done?'✓ ':''}${esc(m.title)}</h3><p>${esc(m.description)}</p>${m.id==='unite'?`<div class="mission-goals"><div><span>Φέουδα υπό τον έλεγχό σου</span><b>${owned().length} / 9</b></div>${progress(owned().length,9,'gold')}<div><span>Ευημερία των κατοίκων</span><b>${num(s.prosperity)} / 65</b></div>${progress(s.prosperity,65,'gold')}</div>`:`<div class="mission-progress"><span>${m.done?'ΟΛΟΚΛΗΡΩΘΗΚΕ':'ΠΡΟΟΔΟΣ'}</span><span>${num(m.progress)} / ${m.target}</span></div>${progress(m.progress,m.target,'gold')}`}${guidance&&!m.done?`<p class="mission-next-step">${esc(guidance.text)}</p>${adviceButton(guidance.action,guidance.label,'button full mission-action')}`:''}${m.reward&&Object.keys(m.reward).length?`<div class="mission-reward"><span>Ανταμοιβή${m.done?' · εισπράχθηκε':''}</span>${costHtml(m.reward)}</div>`:''}</article>`;
 };
 return `${panelIntro('scroll','Ένας συγκεκριμένος επόμενος στόχος','Προχώρησε με τον δικό σου ρυθμό. Κάθε στόχος δείχνει την πρόοδο, την ανταμοιβή και πού μπορείς να κάνεις το επόμενο βήμα.')}<div class="owner-line"><span class="crest">${crest('player')}</span><span><b>${esc(ERAS[s.era]||ERAS[0])}</b><small>${completed.length} / ${s.missions.length} στόχοι ολοκληρώθηκαν</small></span></div>${unfinished.map(missionCard).join('')}${completed.length?`<div class="section-title">ΟΛΟΚΛΗΡΩΜΕΝΟΙ ΣΤΟΧΟΙ</div>${completed.map(missionCard).join('')}`:''}<div class="section-title">ΑΝΑΦΟΡΕΣ ΑΓΓΕΛΙΟΦΟΡΩΝ</div>${s.log.slice(0,20).map(l=>`<article class="log-entry"><small>ΗΜΕΡΑ ${Math.floor(l.t/600)+1} · ${time(l.t%600)}</small><h3>${esc(l.title)}</h3><p>${esc(l.text)}</p></article>`).join('')}`;
}
function diplomacyPanel(s){return `<p class="panel-description">Η κυπριακή λίρα είναι το κοινό νόμισμα αυτής της φανταστικής εκστρατείας. Αντάλλαξε πλεόνασμα με χρήματα ή εξασφάλισε χρόνο με μια προσωρινή συμφωνία.</p><div class="section-title">ΕΜΠΟΡΙΟ · ΠΑΡΤΙΔΑ 25</div>${['food','wood','stone','iron'].map(k=>`<div class="trade-row">${icon(k)}<span>${esc(RESOURCE_NAMES[k])}<small>Απόθεμα ${num(s.resources[k])}</small></span><button class="button small" data-action="trade" data-value="${k}" data-trade="buy" ${preview('trade',{resource:k,type:'buy',amount:25}).ok?'':'disabled'}>+25<br>CY£${num(prices[k].buy*25)}</button><button class="button small" data-action="trade" data-value="${k}" data-trade="sell" ${preview('trade',{resource:k,type:'sell',amount:25}).ok?'':'disabled'}>−25<br>CY£${num(prices[k].sell*25)}</button></div>`).join('')}<div class="section-title">ΟΙ ΑΝΤΙΠΑΛΟΙ ΟΙΚΟΙ</div>${['red','gold'].map(f=>{const peace=Math.max(0,(s.ai.truce[f]||0)-s.t),pr=preview('truce',{faction:f});return `<article class="faction-card"><div class="owner-line"><span class="crest">${crest(f)}</span><span><b>${esc(FACTIONS[f].shortName)}</b><small>${REGIONS.filter(r=>s.regions[r.id].owner===f).length} φέουδα</small></span></div><p>${esc(FACTIONS[f].motto)}</p>${peace?`<span class="tag gold">ΑΝΑΚΩΧΗ · ${time(peace)}</span>`:`${costHtml(pr.cost||{money:180})}<button class="button full small" data-action="truce" data-value="${f}" ${pr.ok?'':'disabled'}>${icon('flag')}Προσωρινή ανακωχή · 3 λεπτά</button>${!pr.ok?`<p class="reason">${esc(pr.message)}</p>`:''}`}<p class="reason">Η επίθεσή σου εναντίον αυτού του οίκου τερματίζει τη συμφωνία.</p></article>`}).join('')}`;}
function renderDeck(s){$('selection-deck').classList.toggle('placing',!!view.placement);$('selection-deck').classList.toggle('army-selection',!view.placement&&view.selection.kind==='army'&&armyIds().length>0);$('selection-deck').classList.toggle('production-selection',!view.placement&&view.selection.kind==='structure');if(view.placement){paint('selection-deck',placementDeck());return;}const selected=armyIds(),army=s.squads.filter(u=>selected.includes(u.id)&&u.hp>0);let html='';if(view.selection.kind==='army'&&army.length){
 const total=army.reduce((a,u)=>a+u.men,0),hp=army.reduce((a,u)=>a+u.hp,0),max=army.reduce((a,u)=>a+u.maxHp,0),formation=army.every(u=>u.formation===army[0].formation)?army[0].formation:null,stance=army.every(u=>u.stance===army[0].stance)?army[0].stance:null;
 html=`<div class="deck-info" data-ui-key="army-info"><span class="eyebrow">ΕΠΙΛΕΓΜΕΝΟΣ ΣΤΡΑΤΟΣ</span><h3>${army.length===1?esc(UNIT_TYPES[army[0].type].name):army.length+' αποσπάσματα'} <small>${num(total)} άνδρες</small></h3>${progress(hp,max)}${armyStatusHtml(s,selected)}</div><div class="selected-unit-strip" role="group" aria-label="Επιλεγμένα αποσπάσματα">${army.map(u=>`<button data-action="select-squad" data-value="${u.id}" class="selected-unit" aria-pressed="true" title="${esc(UNIT_TYPES[u.type].name)} · ${u.men} άνδρες · Shift: αφαίρεση"><span class="portrait">${unitPortrait(u.type)}</span><b>${u.men}</b><i style="--health:${clamp(u.hp/u.maxHp*100,0,100)}%"></i></button>`).join('')}</div><div class="deck-actions">${[['move','move','Πορεία','M'],['attack','attack','Επίθεση','A'],['hold','hold','Κράτα','H'],['retreat','retreat','Πίσω','R']].map(([a,i,n,k])=>`<button data-action="army-command" data-value="${a}" class="${view.command===a?'active':''} ${a==='attack'?'danger':''}" aria-pressed="${view.command===a}" title="${a==='attack'?'Επίθεση σε στόχο ή πορεία με εμπλοκή στο έδαφος':n+' · '+k}">${icon(i)}${n}<span class="key">${k}</span></button>`).join('')}</div><div class="formation-row" data-ui-key="formations"><span>ΣΧΗΜΑΤΙΣΜΟΣ</span>${[['line','Γραμμή'],['column','Στήλη'],['wedge','Σφήνα']].map(([v,n])=>`<button data-action="formation" data-value="${v}" class="${formation===v?'active':''}" aria-pressed="${formation===v}" title="${n}">${icon(v)}${n}</button>`).join('')}<button data-action="stance" data-value="${stance==='defensive'?'aggressive':'defensive'}" title="Αλλαγή στάσης">${icon(stance==='defensive'?'shield':'attack')}${stance==='defensive'?'Άμυνα':stance==='aggressive'?'Έφοδος':'Μικτή στάση'}</button><button data-action="focus-army" title="Εστίαση στον επιλεγμένο στρατό · F">${icon('focus')}Εστίαση</button></div>${controlGroupBar()}`;
 }else if(view.selection.kind==='node'){
 const n=s.nodes.find(n=>n.id===view.selection.id);
 if(n){const rate=getNodeProduction(s,n),add=preview('assignWorkers',{nodeId:n.id,delta:1});html=`<span class="deck-emblem">${icon(n.type,45)}</span><div class="deck-info"><span class="eyebrow">${esc(regionById[n.regionId].name)}</span><h3>${esc(RESOURCE_NAMES[n.type])}</h3><p>${n.workers} εργάτες · <b>+${num(rate.totalPerMinute,1)} / λεπτό</b></p><p>${num(n.amount)} απομένουν${!add.ok?' · '+esc(add.message):''}</p></div><div class="deck-actions"><button data-action="worker" data-value="${n.id}" data-delta="-1" ${n.workers?'':'disabled'}>${icon('minus')}Ελευθέρωσε εργάτη</button><button data-action="worker" data-value="${n.id}" data-delta="1" ${add.ok?'':'disabled'}>${icon('plus')}Ανάθεσε εργάτη</button><button data-action="panel" data-value="economy">${icon('people')}Όλοι οι εργάτες</button></div>`;}
 }else if(view.selection.kind==='squad'){const u=s.squads.find(u=>u.id===view.selection.id);if(u)html=`<span class="deck-emblem portrait">${unitPortrait(u.type,u.owner)}</span><div class="deck-info"><span class="eyebrow">${esc(FACTIONS[u.owner].shortName)}</span><h3>${esc(UNIT_TYPES[u.type].name)}</h3><p>${u.men} άνδρες · Αντίπαλο απόσπασμα</p>${progress(u.hp,u.maxHp,'red')}</div><div class="deck-actions"><button data-action="attack-unit" data-value="${u.id}" class="danger">${icon('attack')}Επίθεση</button><button data-action="select-army" data-value="all">${icon('army')}Στρατός</button></div>`;}if(view.selection.kind==='structure'){
 const st=s.structures?.find(a=>a.id===view.selection.id);
 if(st){const b=BUILDINGS[st.type],isOwn=s.regions[st.regionId].owner==='player',job=s.jobs.find(j=>j.structureId===st.id),q=preview('build',{type:st.type,regionId:st.regionId,structureId:st.id});
 html=`<span class="deck-emblem building-portrait">${buildingPortrait(st.type)}</span><div class="deck-info"><span class="eyebrow">${esc(regionById[st.regionId].name)}</span><h3>${esc(b.name)}</h3><p>${st.status==='ready'?'Βαθμίδα '+st.level:st.status==='upgrading'?'Αναβάθμιση σε εξέλιξη':'Εργοτάξιο'}</p>${job?constructionReadout(s,job,{compact:true}):isOwn?costHtml(q.cost):''}${isOwn&&!job&&!q.ok?'<p class="reason">'+esc(q.message)+'</p>':''}</div><div class="deck-actions">${isOwn&&st.status==='ready'?`<button data-action="upgrade-structure" data-value="${st.id}" ${q.ok?'':'disabled'}>${icon('build')}Αναβάθμιση</button>`:''}<button data-action="focus-structure" data-value="${st.id}">${icon('focus')}Εστίαση</button>${isOwn?'<button data-action="panel" data-value="build">'+icon('build')+'Έργα</button>':''}</div>${isOwn&&Object.values(UNIT_TYPES).some(u=>u.requires===st.type)?`<div class="context-training" aria-label="Εκπαίδευση από αυτό το κτίριο">${Object.keys(UNIT_TYPES).filter(type=>UNIT_TYPES[type].requires===st.type).map(type=>trainTile(s,type,regionById[st.regionId],{structure:st,compact:true})).join('')}</div>`:''}`;}
 }
if(!html&&view.selection.kind==='army')html=`<div class="deck-info"><span class="eyebrow">ΠΕΔΙΟ ΜΑΧΗΣ</span><h3>Επίλεξε στρατό</h3><p>Αριστερό σύρσιμο ή πάτημα σε απόσπασμα.</p></div><div class="deck-actions"><button data-action="select-army" data-value="all">${icon('army')}Όλος ο στρατός</button></div>`;
if(!html){const r=currentRegion(),rs=s.regions[r.id];html=`<span class="deck-emblem">${crest(rs.owner)}</span><div class="deck-info"><span class="eyebrow">${esc(FACTIONS[rs.owner].shortName)}</span><h3>${esc(r.name)}</h3><p>${rs.owner==='player'?'Το κάστρο και οι άνθρωποί του':r.subtitle}</p>${progress(rs.fortHp,rs.maxFortHp,rs.owner==='player'?'':'red')}</div><div class="deck-actions">${rs.owner==='player'?`<button data-action="panel" data-value="build">${icon('build')}Έργα</button><button data-action="recruit-panel">${icon('army')}Εκπαίδευση</button>`:`<button data-action="besiege" data-value="${r.id}" class="danger">${icon('ram')}Πολιορκία</button>`}<button data-action="select-army" data-value="all">${icon('flag')}Στρατός</button></div>`;}paint('selection-deck',html);}
function renderMinimap(s){const c=$('minimap'),ctx=c.getContext('2d'),w=c.width,h=c.height,pad=5;const P=(x,z)=>({x:pad+(x-MAP.minX)/MAP.width*(w-pad*2),y:pad+(z-MAP.minZ)/MAP.depth*(h-pad*2)});ctx.clearRect(0,0,w,h);ctx.fillStyle='#101c1d';ctx.fillRect(0,0,w,h);for(const r of REGIONS){ctx.beginPath();r.polygon.forEach(([x,z],i)=>{const p=P(x,z);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)});ctx.closePath();ctx.fillStyle=FACTIONS[s.regions[r.id].owner].color+'4d';ctx.fill();ctx.strokeStyle='#b5b4935e';ctx.lineWidth=.65;ctx.stroke();const p=P(r.x,r.z);ctx.fillStyle=FACTIONS[s.regions[r.id].owner].color;ctx.fillRect(p.x-3,p.y-3,6,6);if(view.selection.kind==='region'&&view.selection.id===r.id){ctx.strokeStyle='#f0dca3';ctx.lineWidth=1.2;ctx.strokeRect(p.x-5,p.y-5,10,10);}}ctx.strokeStyle='#739ca17d';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=30;i++){const z=MAP.minZ+i*MAP.depth/30,x=9+Math.sin(z*.025)*13+Math.sin(z*.012)*5,p=P(x,z);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)}ctx.stroke();for(const b of BRIDGES){const p=P(b.x,b.z);ctx.strokeStyle='#dcc991';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x-5,p.y);ctx.lineTo(p.x+5,p.y);ctx.stroke();}for(const u of s.squads){if(u.hp<=0)continue;const p=P(u.x,u.z);ctx.fillStyle=u.owner==='player'?'#b6e5ff':u.owner==='red'?'#ef826f':u.owner==='gold'?'#e7c66f':'#d7d1b2';ctx.beginPath();ctx.arc(p.x,p.y,armyIds().includes(u.id)?2.5:1.25,0,Math.PI*2);ctx.fill();}}
function renderAlerts(s){
 const invasion=s.squads.find(u=>u.owner!=='player'&&u.hp>0&&s.regions[regionAt(u.x,u.z)]?.owner==='player'),raid=Number.isFinite(s.ai.nextRaid)?s.ai.nextRaid-s.t:Infinity;
 $('raid-banner').hidden=!invasion&&!(raid>0&&raid<35);
 if(invasion)paint('raid-banner',icon('warning')+`<span>Εχθρικά στρατεύματα στα εδάφη μας</span><button data-action="focus-enemy" data-value="${invasion.id}">Εντοπισμός →</button>`);
 else if(raid>0&&raid<35)paint('raid-banner',icon('warning')+`<span>Οι ανιχνευτές βλέπουν εχθρική συγκέντρωση. Επίθεση σε ${time(raid)}.</span>`);
 $('command-hint').hidden=!view.command&&!view.placement;
 if(view.placement){paint('command-hint',icon('build')+'<span>'+(view.placement.anchored?'Έλεγξε το περίγραμμα και πάτησε «Χτίσε εδώ».':'Διάλεξε έδαφος. Πράσινο: διαθέσιμο · κόκκινο: εμπόδιο.')+'</span>');return;}
 paint('command-hint',view.command?`${icon(view.command==='attack'?'attack':'move')}<span>${view.command==='attack'?'Πάτησε αντίπαλο για επίθεση ή έδαφος για πορεία με εμπλοκή.':'Πάτησε το σημείο προορισμού στον χάρτη.'}</span><button data-action="cancel-command" aria-label="Ακύρωση διαταγής">${icon('close')}</button>`:'');
}
function render(force=false){
 if(rendering||(!force&&(held||performance.now()-lastRender<500)))return;rendering=true;
 try{
  const s=game.state;lastRender=performance.now();world?.setState(s);if(view.placement)refreshPlacement();
  $('game-shell').dataset.selection=view.selection.kind;$('game-shell').dataset.panelOpen=String(view.panelOpen);const selectedSite=view.selection.kind==='structure'?s.structures?.find(item=>item.id===view.selection.id):null;$('game-shell').dataset.production=String(!!selectedSite&&Object.values(UNIT_TYPES).some(u=>u.requires===selectedSite.type));
  paint('campaign-status',`<span><b>Έτος 1280 · Ημέρα ${s.day}</b><small>${s.paused?'ΤΑΚΤΙΚΗ ΠΑΥΣΗ':owned().length+' ΦΕΟΥΔΑ · '+squads().length+' ΑΠΟΣΠΑΣΜΑΤΑ'}</small></span><span class="era-tag">${esc(ERAS[s.era]||ERAS[0])}</span>`);
  renderControlIcon('pause-button',s.paused?'play':'pause');$('pause-button').setAttribute('aria-label',s.paused?'Συνέχεια':'Παύση');renderControlIcon('sound-button',view.sound?'sound':'mute');$('sound-button').setAttribute('aria-label',view.sound?'Απενεργοποίηση ήχου':'Ενεργοποίηση ήχου');
  $('speed-controls').querySelectorAll('button').forEach(b=>b.classList.toggle('active',Number(b.dataset.value)===s.speed));$('map-switch').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.value===view.mapMode));renderResources(s);
  const guidePanel=view.guideOpen?currentGuideStep().panel:null;
  paint('left-rail',NAV.map(([id,i,n,why])=>`<button data-action="panel" data-value="${id}" class="${view.panel===id&&view.panelOpen?'active':''} ${view.guideOpen&&guidePanel===id?'guide-target':''}" aria-pressed="${view.panel===id&&view.panelOpen}" title="${n}: ${why}">${icon(i)}<span>${n}<small>${why}</small></span></button>`).join(''));
  const r=currentRegion();paint('map-heading',`<span class="eyebrow">${esc(FACTIONS[s.regions[r.id].owner].name)}</span><h2>${esc(r.name)}</h2><p><span>${esc(r.subtitle)}</span><b>${s.paused?'Η μάχη σε περιμένει.':'Η γη θυμάται τις αποφάσεις σου.'}</b></p>`);
  $('side-panel').classList.toggle('closed',!view.panelOpen);$('side-panel').setAttribute('aria-hidden',String(!view.panelOpen));$('side-panel').inert=!view.panelOpen||!!view.modal;$('side-panel').dataset.panel=view.panel;
  if(view.panelOpen){
   const scroll=$('panel-body').scrollTop,[ey,title]=PANELS[view.panel]||PANELS.realm;
   paint('panel-header',`<span class="eyebrow">${ey}</span><h2>${title}</h2><button data-action="close-panel" aria-label="Κλείσιμο συμβουλίου">${icon('close')}</button>`);
   paint('panel-body',({realm:realmPanel,build:buildPanel,economy:economyPanel,army:armyPanel,research:researchPanel,chronicle:chroniclePanel,diplomacy:diplomacyPanel}[view.panel]||realmPanel)(s));$('panel-body').scrollTop=scroll;
  }
  renderDeck(s);renderMinimap(s);renderAlerts(s);renderGuide();
  paint('build-queue',s.jobs.slice(0,3).map(j=>`<button class="queue-job" data-action="job-detail" data-value="${j.id}" data-ui-key="job:${j.id}"><div class="stat-pair"><span>${esc(j.label||(j.kind==='train'?UNIT_TYPES[j.type]?.name:j.kind==='research'?TECHS[j.type]?.name:BUILDINGS[j.type]?.name)||j.type)}</span><b>${j.construction?constructionPercent(j)+'%':time(j.remaining)}</b></div><span class="queue-phase">${jobPhase(j,s)}</span>${progress(j.duration-j.remaining,j.duration,'gold')}${j.blocked?`<p class="job-blocked" role="status">${esc(j.blockedReason||'Περιμένει να ελευθερωθεί ο χώρος.')}</p>`:''}</button>`).join('')+(s.jobs.length>3?`<span class="queue-extra">+${s.jobs.length-3} αναθέσεις</span>`:''));
  $('save-status').textContent=game.storageError?'ΕΞΑΓΩΓΗ ΓΙΑ ΑΣΦΑΛΗ ΑΠΟΘΗΚΕΥΣΗ':'ΑΥΤΟΜΑΤΗ ΑΠΟΘΗΚΕΥΣΗ · v2.6.0';
  if(s.log[0]?.id!==lastLog){if(lastLog&&['battle','raid','capture','warning'].includes(s.log[0]?.type))tone('war');lastLog=s.log[0]?.id;}
  if(s.outcome&&!view.endingShown){view.endingShown=true;setTimeout(()=>showModal('ending'),0);}
 }finally{rendering=false;}
}

function helpHtml(){
 const topics=[['start','Πρώτα βήματα'],['menus','Τα μενού'],['combat','Στρατός & πολιορκία'],['controls','Χειρισμός']];
 let content='';
 if(view.helpTopic==='menus')content=`<h3>Τι θέλεις να κάνεις;</h3><p>Κάθε κουμπί ανοίγει την αντίστοιχη ενότητα του παιχνιδιού.</p><div class="help-menu-grid">${NAV.map(([id,symbol,title,purpose])=>`<button data-action="help-panel" data-value="${id}" ${view.started?'':'disabled'}>${icon(symbol)}<span><b>${esc(title)}</b><small>${esc(purpose)}</small></span>${icon('chevron')}</button>`).join('')}</div>`;
 if(view.helpTopic==='start')content=`<h3>Ξεκίνα με πέντε ενέργειες</h3><p>Μπορείς να οργανώνεις το φέουδο σε παύση. Πάτησε ένα βήμα για να βρεις τα κουμπιά του πάνω στην οθόνη.</p><div class="help-step-list">${GUIDE_STEPS.map((step,i)=>`<article><span class="step-number">${view.guideDone[step.id]?'✓':i+1}</span><div><h3>${esc(step.title.slice(3))}</h3><p>${esc(step.text)}</p></div><button class="button" data-action="help-jump" data-value="${step.id}" ${view.started?'':'disabled'}>Δείξε μου</button></article>`).join('')}</div>`;
 if(view.helpTopic==='combat'){
  const frontier=getMissionGuidance(game.state,{id:'frontier',done:false});
  content=`<h3>Προετοίμασε την επίθεση</h3><div class="help-step-list"><article><span class="step-number">${icon('army')}</span><div><h3>1. Επίλεξε ποιοι θα κινηθούν</h3><p>Τα πορτρέτα στο κάτω μέρος δείχνουν την επιλογή σου. Κράτησε πεζικό μπροστά από τοξότες και μηχανές. «Πορεία» σημαίνει μετακίνηση· «Επίθεση» σε έδαφος σημαίνει πορεία με εμπλοκή.</p>${adviceButton({kind:'army',tab:'troops'},'Άνοιξε τον στρατό','button')}</div></article><article><span class="step-number">${icon('ram')}</span><div><h3>2. Χτύπησε ένα γειτονικό οχυρό</h3><p>Ο κριός χτυπά από κοντά. Το τρεμπουσέ χτυπά από απόσταση και απαιτεί Μηχανική αντιβάρου. Χρειάζεσαι δικό σου γειτονικό φέουδο για να κρατήσεις μια νέα περιοχή.</p>${frontier?`<p>${esc(frontier.text)}</p>${adviceButton(frontier.action,frontier.label,'button')}`:''}</div></article><article><span class="step-number">${icon('flag')}</span><div><h3>3. Κράτησε την πύλη με πεζικό</h3><p>Η καταστροφή του τείχους δεν αρκεί. Το πεζικό πρέπει να πλησιάσει την πύλη και να αντιμετωπίσει τη φρουρά. Κράτησε τρόφιμα και εφεδρείες για τη συνέχεια.</p>${adviceButton({kind:'missions'},'Δες την πρόοδο της εκστρατείας','button')}</div></article></div>`;
 }
 if(view.helpTopic==='controls'){
  const mouse=[['Αριστερό κλικ','Επίλεξε κτίριο, πηγή πόρων ή απόσπασμα.'],['Αριστερό σύρσιμο','Σχημάτισε πλαίσιο και επίλεξε πολλά αποσπάσματα.'],['Shift + κλικ','Πρόσθεσε ή αφαίρεσε απόσπασμα από την επιλογή.'],['Διπλό κλικ','Επίλεξε τα ορατά αποσπάσματα του ίδιου τύπου.'],['Δεξί κλικ','Δώσε διαταγή στον επιλεγμένο στρατό.'],['M / A / H / R','Πορεία / Επίθεση / Κράτα / Υποχώρηση.'],['Ctrl + 1–9','Αποθήκευσε ομάδα. Ο αριθμός την επιλέγει ξανά.'],['W A S D · Q / E','Κίνηση και περιστροφή κάμερας. Με επιλεγμένο στρατό το A επιλέγει επίθεση.'],['B · R · Enter','Κατασκευές · περιστροφή προεπισκόπησης · επιβεβαίωση επιλεγμένης θέσης.'],['Space · Esc','Παύση / συνέχεια · ακύρωση ή κλείσιμο.']];
  const touch=[['Πάτημα','Επίλεξε κτίριο, πηγή πόρων ή απόσπασμα.'],['Σύρσιμο εδάφους','Μετακίνησε την κάμερα στον χάρτη.'],['Δύο δάχτυλα ή + / −','Μεγέθυνε ή απομάκρυνε την κάμερα.'],['Πολλαπλή','Ενεργοποίησέ το στον στρατό και πάτησε όσα αποσπάσματα θέλεις.'],['Πορεία → χάρτης','Πάτησε Πορεία και έπειτα τον προορισμό.'],['Επίθεση → στόχος','Πάτησε Επίθεση και μετά αντίπαλο. Σε ελεύθερο έδαφος δίνεις πορεία με εμπλοκή.'],['Κράτα / Πίσω','Δώσε άμεση διαταγή φρουράς ή υποχώρησης.'],['Ανάθεση → αριθμός','Αποθήκευσε τα επιλεγμένα αποσπάσματα σε ομάδα.'],['Κτίριο → έδαφος → Χτίσε εδώ','Όρισε θέση, χρησιμοποίησε Περιστροφή και επιβεβαίωσε την κατασκευή.'],['Κουμπί παύσης','Σταμάτησε τον χρόνο για να οργανώσεις τις διαταγές σου.']];
  content=`<h3>Χειρισμός στη συσκευή σου</h3><div class="help-device-tabs" role="group" aria-label="Συσκευή χειρισμού">${[['mouse','Υπολογιστής'],['touch','Κινητό / tablet']].map(([id,label])=>`<button data-action="help-device" data-value="${id}" aria-pressed="${view.helpDevice===id}" class="${view.helpDevice===id?'active':''}">${label}</button>`).join('')}</div><div class="help-control-list">${(view.helpDevice==='touch'?touch:mouse).map(([key,text])=>`<div><b class="control-key">${esc(key)}</b><span>${esc(text)}</span></div>`).join('')}</div>`;
 }
 return `<span class="eyebrow">ΤΟ ΒΙΒΛΙΟ ΤΟΥ ΣΤΡΑΤΗΓΟΥ</span><h2>Πώς παίζονται τα Φέουδα;</h2><div class="help-tabs" role="group" aria-label="Ενότητες οδηγιών">${topics.map(([id,title])=>`<button data-action="help-topic" data-value="${id}" class="${view.helpTopic===id?'active':''}" aria-pressed="${view.helpTopic===id}">${title}</button>`).join('')}</div><div class="help-content">${content}</div><div class="notice">Στόχος: ένωσε τα 9 φέουδα και φτάσε ευημερία 65. Η μάχη και η παραγωγή σταματούν όταν η σελίδα είναι κλειστή ή στο παρασκήνιο. Η αποθήκευση γίνεται σε αυτόν τον browser.</div><button class="button brass full" data-action="close-modal">Επιστροφή στο παιχνίδι</button>`;
}
function settingsHtml(){return `<span class="eyebrow">Η ΕΚΣΤΡΑΤΕΙΑ ΣΟΥ</span><h2>Ρυθμίσεις & αποθήκευση</h2>${view.rendererMode==='software'?'<p class="panel-description">Λειτουργία συμβατότητας: η εκστρατεία χρησιμοποιεί ελαφρύτερα μοντέλα και απλούστερο φωτισμό. Τα λεπτομερή μοντέλα, οι δυναμικές σκιές και τα πλήρη υλικά απαιτούν WebGL 2 στον browser.</p>':''}<div class="settings-row"><span>Γραφικά<small>Σκιές και ανάλυση προσαρμοσμένες στη συσκευή.</small></span><select id="quality-select" aria-label="Ποιότητα γραφικών"><option value="high" ${view.quality==='high'?'selected':''}>Υψηλά</option><option value="low" ${view.quality==='low'?'selected':''}>Απόδοση</option></select></div><div class="settings-row"><span>Ήχος ενεργειών<small>Σήματα διαταγών και ειδοποιήσεις.</small></span><button class="button small" data-action="sound">${icon(view.sound?'sound':'mute')}${view.sound?'Ενεργός':'Κλειστός'}</button></div><div class="settings-row"><span>Αποθήκευση εδώ<small>Αυτόματη και χειροκίνητη αποθήκευση.</small></span><button class="button small" data-action="save">${icon('save')}Αποθήκευση</button></div><div class="settings-row"><span>Αρχείο εκστρατείας<small>Μεταφορά σε άλλη συσκευή ή αντίγραφο.</small></span><button class="button small" data-action="export">${icon('download')}Εξαγωγή</button></div><div class="settings-row"><span>Φόρτωση αρχείου</span><button class="button small" data-action="import">${icon('upload')}Εισαγωγή</button></div><div class="settings-row"><span>Νέα εκστρατεία<small>Ξεκίνα ξανά από την Αργυρή Δρυ.</small></span><button class="button red small" data-action="reset-dialog">Νέα αρχή</button></div><div class="button-row"><button class="button" data-action="help">${icon('help')}Οδηγίες</button><button class="button" data-action="about">${icon('scroll')}Ο κόσμος</button></div><div class="version">ΦΕΟΥΔΑ 1280 · ΕΚΔΟΣΗ 2.6.0 · ΤΟΠΙΚΗ ΕΚΣΤΡΑΤΕΙΑ</div>`;}
function atlasHtml(){const s=game.state;return `<span class="eyebrow">ΕΝΝΕΑ ΦΕΟΥΔΑ · ΤΡΕΙΣ ΣΗΜΑΙΕΣ</span><h2>Οι μεθόριοι του 1280</h2><p>Διάλεξε περιοχή για να μεταφερθείς στο τρισδιάστατο πεδίο. Οι δύο γέφυρες συνδέουν τις όχθες.</p><svg viewBox="-250 -186 500 372" class="atlas-map" role="group" aria-label="Χάρτης εννέα φέουδων" style="width:100%;display:block;background:#0d1b20;border:1px solid #ac955147">${REGIONS.map(r=>{const o=s.regions[r.id].owner;return `<g data-action="atlas-region" data-value="${r.id}" role="button" tabindex="0" aria-label="${esc(r.name)}" style="cursor:pointer"><polygon points="${r.polygon.map(p=>p.join(',')).join(' ')}" fill="${FACTIONS[o].color}55" stroke="#d1bc8866" stroke-width="1.2"/><path d="M${r.x-6},${r.z-4}h3v-4h3v4h3v-4h3v13h-12Z" fill="${FACTIONS[o].color}" stroke="#ddd0aa" stroke-width="1"/><text x="${r.x}" y="${r.z+21}" text-anchor="middle" fill="#e4d1a5" style="font:10px Georgia,serif;pointer-events:none">${esc(r.name)}</text></g>`}).join('')}<path d="${Array.from({length:36},(_,i)=>{const z=MAP.minZ+i*MAP.depth/35,x=9+Math.sin(z*.025)*13+Math.sin(z*.012)*5;return(i?'L':'M')+x+','+z}).join(' ')}" fill="none" stroke="#6697a28c" stroke-width="5" pointer-events="none"/>${BRIDGES.map(b=>`<path d="M${b.x-13},${b.z}h26" stroke="#e0c795" stroke-width="4"/>`).join('')}</svg><p class="reason">Μπλε: δικά σου · Κόκκινο: Σιδηρός Λύκος · Χρυσό: Οίκος του Ήλιου · Γκρι: ελεύθερες μεθόριοι.</p>`;}
function aboutHtml(){return `<span class="eyebrow">ΜΕΣΑΙΩΝΙΚΟΣ ΚΟΣΜΟΣ · ΠΡΩΤΗ 3D ΕΚΣΤΡΑΤΕΙΑ</span><h2>Το χρονικό των στεμμάτων</h2><p>Φανταστικές ηγεμονίες με αφετηρία το 1280. Τα οχυρά, το πεζικό, το ιππικό, τα τόξα, οι καλυμμένοι κριοί και οι καταπέλτες αντιβάρου αντλούν έμπνευση από τη μεσαιωνική πολεμική. Η κυπριακή λίρα χρησιμοποιείται ως νόμισμα του παιχνιδιού.</p><p>Οι φωτογραφικές υφές πέτρας, εδάφους και ξύλου προέρχονται από το Poly Haven με άδεια CC0. Τα αρθρωτά πέτρινα κάστρα είναι του Rico Cilliers, τα έλατα των Rico Cilliers και Rob Tuytel, και η αχυροσκέπαστη κατοικία του Spiral Softworks. Οι ανθρώπινοι χαρακτήρες προέρχονται από το VibeAssets, με άδεια CC0. Οι κινήσεις βάδισης, τρεξίματος, μάχης και εργασίας προσαρμόστηκαν από τα σκελετικά animations του 0 A.D. / Wildfire Games, με CC BY-SA 3.0. Οι πρόσθετες υφές χώματος και βράχου είναι των Rob Tuytel και Amal Kumar, με CC0. Τα πέντε ξεχωριστά κτίρια παραγωγής και φροντίδας είναι του Daniel Andersson, με άδεια CC0. Οι στρατώνες, οι στάβλοι και το πεδίο τοξοβολίας χρησιμοποιούν μοντέλα του Millennium AD, με CC BY-SA 3.0. Το λατομείο και το μεταλλείο συνδυάζουν στοιχεία των Rico Cilliers και Daniel Andersson, με CC0, και γεωμετρία του έργου. Ο ίππος και οι πολιορκητικές μηχανές χρησιμοποιούν μοντέλα και κινήσεις από τα έργα 0 A.D. και Millennium AD, με άδεια CC BY-SA 3.0. Η απόδοση του κόσμου γίνεται με Three.js, υπό άδεια MIT.</p><ul><li><a href="https://www.english-heritage.org.uk/learn/story-of-england/medieval/siege-warfare/?epsremainingpath=%2F" target="_blank" rel="noopener">English Heritage · Μεσαιωνικές πολιορκίες</a></li><li><a href="https://polyhaven.com/license" target="_blank" rel="noopener">Poly Haven · Άδεια υλικών</a></li><li><a href="./assets/medieval/SOURCES.json" target="_blank" rel="noopener">Υλικά, δημιουργοί και πηγές</a></li><li><a href="./assets/models/scenery-sources.json" target="_blank" rel="noopener">Κάστρα, κτίρια και φύση · προέλευση μοντέλων</a></li><li><a href="./assets/models/units-sources.json" target="_blank" rel="noopener">Χαρακτήρες · προέλευση μοντέλων</a></li><li><a href="./assets/models/human-motion-sources.json" target="_blank" rel="noopener">Ανθρώπινες κινήσεις · δημιουργοί, άδειες και προσαρμογές</a></li><li><a href="./assets/medieval/terrain-sources.json" target="_blank" rel="noopener">Έδαφος · φωτογραφικά υλικά και δημιουργοί</a></li><li><a href="./assets/ui/buildings/sources.json" target="_blank" rel="noopener">Εικόνες κατασκευών · πραγματικά μοντέλα και άδειες</a></li><li><a href="./assets/models/buildings-sources.json" target="_blank" rel="noopener">Εργαστήρια, αγορά, θεραπευτήριο και πηγάδι · Daniel Andersson</a>.</li><li><a href="./assets/models/military-buildings-sources.json" target="_blank" rel="noopener">Στρατώνες και στάβλοι · δημιουργοί, άδειες και τροποποιήσεις</a>.</li><li><a href="./assets/models/specialist-sites-sources.json" target="_blank" rel="noopener">Τοξοβολία, λατομείο και μεταλλείο · δημιουργοί, άδειες και τροποποιήσεις</a>.</li><li>Ίππος και κριός: <a href="https://www.wildfiregames.com/" target="_blank" rel="noopener">Wildfire Games</a>, προσαρμογές με <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>. Πηγές και τροποποιήσεις: <a href="./assets/models/horse-sources.json" target="_blank" rel="noopener">ίππος</a> · <a href="./assets/models/siege-sources.json" target="_blank" rel="noopener">κριός</a>.</li><li>Τρεμπουσέ: Alexandermb / The Council of Modders, Fallen Empire Studio, Scion Development και Wildfire Games, προσαρμογή με CC BY-SA 3.0. <a href="./assets/models/trebuchet-sources.json" target="_blank" rel="noopener">Δημιουργοί, πηγές και τροποποιήσεις</a>.</li></ul><p>Οι μάχες εκτελούνται στη συσκευή σου. Η έκδοση περιλαμβάνει εκστρατεία εναντίον υπολογιστή και αποθήκευση στον browser.</p>`;}
function showModal(type){if(!view.modal){view.modalResume=!game.state.paused&&view.started;game.setPaused(true);}view.modal=type;let body='';if(type==='help')body=helpHtml();else if(type==='settings')body=settingsHtml();else if(type==='atlas')body=atlasHtml();else if(type==='about')body=aboutHtml();else if(type==='reset')body='<span class="eyebrow">ΝΕΑ ΑΡΧΗ</span><h2>Νέα εκστρατεία;</h2><p>Αυτό ξεκινά νέα εκστρατεία από το 1280 και αντικαθιστά την τρέχουσα τοπική αποθήκευση.</p><div class="button-row"><button class="button" data-action="export">Εξαγωγή της τωρινής</button><button class="button red" data-action="reset-confirm">Ξεκίνα ξανά</button></div>';else if(type==='import')body='<span class="eyebrow">ΦΟΡΤΩΣΗ ΕΚΣΤΡΑΤΕΙΑΣ</span><h2>Να φορτωθεί το αρχείο;</h2><p>Η τρέχουσα εκστρατεία θα αντικατασταθεί από το επιλεγμένο αρχείο, εφόσον είναι έγκυρο.</p><div class="button-row"><button class="button" data-action="export">Εξαγωγή της τωρινής</button><button class="button brass" data-action="import-confirm">Φόρτωση</button></div>';else if(type==='ending'){const won=game.state.outcome==='victory';body=`<div class="ending"><div class="ending-crest">${crest(won?'player':'red')}</div><span class="eyebrow">ΤΟ ΧΡΟΝΙΚΟ ΤΗΣ ΕΚΣΤΡΑΤΕΙΑΣ</span><h2>${won?'Εννέα φέουδα.<br>Μία ηγεμονία.':'Η σημαία έπεσε.'}</h2><p>${won?'Η γη ενώθηκε και οι άνθρωποί της μπορούν να προοδεύσουν. Το στέμμα κερδήθηκε με χέρια, πόρους και στρατηγική.':'Η εκστρατεία τελείωσε. Μια νέα αρχή σού δίνει ξανά το Αργυρόκαστρο, τους ανθρώπους του και χρόνο να οργανώσεις διαφορετικά την άμυνα.'}</p><div class="unit-stats"><div><b>${num(game.state.stats.captured)}</b><small>ΚΑΤΑΛΗΨΕΙΣ</small></div><div><b>${num(game.state.stats.built)}</b><small>ΕΡΓΑ</small></div><div><b>${num(game.state.prosperity)}</b><small>ΕΥΗΜΕΡΙΑ</small></div></div><div class="button-row"><button class="button" data-action="export">Κράτησε το χρονικό</button><button class="button brass" data-action="reset-dialog">Νέα εκστρατεία</button></div></div>`;}$('modal-root').innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(type==='help'?'Οδηγίες':type==='settings'?'Ρυθμίσεις':type==='atlas'?'Χάρτης φέουδων':'Το χρονικό της εκστρατείας')}"><button class="close" data-action="close-modal" aria-label="Κλείσιμο παραθύρου">${icon('close')}</button>${body}</section></div>`;updateInput();$('modal-root').querySelector('button')?.focus();}
function closeModal(){const resume=view.modalResume;view.modal=null;view.modalResume=false;$('modal-root').innerHTML='';if(resume&&!game.state.outcome)game.setPaused(false);updateInput();render(true);}
function exportGame(){game.save();const blob=new Blob([game.exportSave()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='feouda-1280-day-'+game.state.day+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Το αρχείο της εκστρατείας εξήχθη.');}
function armyCommand(type){if(!armyIds().length)chooseArmy();if(!armyIds().length)return;if(type==='hold'||type==='retreat'){view.command=null;act('order',{ids:armyIds(),type});}else{view.command=type;view.panelOpen=false;setInsets();render(true);}}
async function onAction(event){const el=event.target.closest?.('[data-action]');if(!el||el.disabled)return;const action=el.dataset.action,value=el.dataset.value;if(!view.started&&!['begin','help','help-topic','help-device','settings','close-modal','sound','about'].includes(action))return;switch(action){
case 'advice':try{navigateAdvice(JSON.parse(value));}catch{toast('Η πρόταση δεν είναι πλέον διαθέσιμη.',true);}break;
case 'help-topic':if(['start','menus','combat','controls'].includes(value)){view.helpTopic=value;showModal('help');$('modal-root').querySelector(`[data-action="help-topic"][data-value="${value}"]`)?.focus();}break;
case 'help-device':view.helpDevice=value==='touch'?'touch':'mouse';showModal('help');$('modal-root').querySelector(`[data-action="help-device"][data-value="${view.helpDevice}"]`)?.focus();break;
case 'help-panel':if(PANELS[value]){view.guideOpen=false;navigateAdvice({kind:'panel',panel:value});}break;
case 'help-jump':closeModal();view.guideOpen=true;guideAction(value);break;
case 'worksites-toggle':view.worksitesOpen=!view.worksitesOpen;render(true);break;
case 'focus-returning':{const crew=(game.state.returningCrews||[]).find(c=>!value||c.regionId===value);if(crew){if(view.placement)cancelPlacement({open:false});view.command=null;view.panelOpen=false;view.guideOpen=false;world?.focus({x:crew.x,z:crew.z});render(true);setInsets();}break;}
case 'job-detail':{const job=game.state.jobs.find(j=>j.id===value);if(!job)break;if(job.structureId)setSelection({kind:'structure',id:job.structureId},{focus:true,open:true});else if(job.kind==='train')navigateAdvice({kind:'army',tab:'train',regionId:job.regionId});else if(job.kind==='research')navigateAdvice({kind:'research',type:job.type});else if(job.regionId)setSelection({kind:'region',id:job.regionId},{focus:true,open:true});break;}
case 'guide-toggle':view.guideOpen=!view.guideOpen;store('feouda-guide-v24-seen','1');render(true);break;
case 'guide-step':view.guideStep=value;render(true);break;
case 'guide-action':guideAction(value);break;
case 'guide-advice':view.guideStep=null;render(true);break;
case 'guide-missions':view.guideOpen=false;store('feouda-guide-v24-seen','1');setPanel('chronicle');break;
case 'begin':view.started=true;store('feouda-welcomed-v1','1');$('welcome').hidden=true;game.setPaused(false);updateInput();toast('Επτά αποσπάσματα, μαζί με έναν κριό, περιμένουν. Οργάνωσε πρώτα τους εργάτες σου.');render(true);break;
case 'panel':if(view.placement)cancelPlacement({open:false});setPanel(value,!(view.panel===value&&view.panelOpen));break;
case 'close-panel':view.panelOpen=false;render(true);setInsets();break;
case 'home':world?.home();setSelection({kind:'region',id:'home'});break;
case 'zoom':world?.zoom(Number(value));break;
case 'overview':showModal('atlas');break;
case 'atlas-region':closeModal();setSelection({kind:'region',id:value},{focus:true,open:true});break;
case 'map-mode':view.mapMode=value;world?.setMapMode(value);render(true);break;
case 'select-region':setSelection({kind:'region',id:value},{focus:true,open:true});break;
case 'focus-region':world?.focus(value);break;
case 'resource':if(value==='money')setPanel('diplomacy');else{view.resourceFilter=value;setPanel('economy');}break;
case 'resource-filter':view.resourceFilter=value;render(true);break;
case 'focus-node':setSelection({kind:'node',id:value},{focus:true,open:true});break;
case 'worker':act('assignWorkers',{nodeId:value,delta:Number(el.dataset.delta)});break;
case 'build-tab':view.buildTab=value;view.buildType=(value==='civil'?CIVIL:MILITARY)[0];render(true);break;
case 'build-inspect':inspectBuilding(value);break;
case 'build':startPlacement(value,el.dataset.region);break;
case 'placement-rotate':rotatePlacement();break;
case 'placement-move':if(view.placement){view.placement.anchored=false;refreshPlacement();render(true);}break;
case 'placement-confirm':confirmPlacement();break;
case 'placement-cancel':cancelPlacement();break;
case 'select-structure':setSelection({kind:'structure',id:value},{focus:true});break;
case 'focus-structure':{const st=game.state.structures.find(a=>a.id===value);if(st)world?.focus(st);break;}
case 'upgrade-structure':{const st=game.state.structures.find(a=>a.id===value);if(st)act('build',{type:st.type,regionId:st.regionId,structureId:st.id});break;}
case 'repair':act('repair',{regionId:value});break;
case 'army-tab':view.armyTab=value;render(true);break;
case 'recruit-panel':view.armyTab='train';setPanel('army');break;
case 'train':{if(el.dataset.structure){const st=game.state.structures.find(a=>a.id===el.dataset.structure);if(!st||st.status!=='ready'||UNIT_TYPES[value]?.requires!==st.type||game.state.regions[st.regionId]?.owner!=='player'){toast('Το κτίριο δεν είναι έτοιμο για εκπαίδευση.',true);break;}}act('train',{type:value,regionId:el.dataset.region});break;}
case 'select-squad':setSelection({kind:'squad',id:value},{toggle:!!event.shiftKey||view.armyMulti});break;
case 'select-army':chooseArmy(value||'all',{add:!!event.shiftKey||view.armyMulti});break;
case 'clear-selection':setSelection({kind:'army',ids:[]});break;
case 'multi-select':view.armyMulti=!view.armyMulti;render(true);break;
case 'focus-army':focusArmy();break;
case 'group-assign':view.groupAssign=!view.groupAssign;render(true);break;
case 'control-group':useControlGroup(value,{assign:!!(event.ctrlKey||event.metaKey),append:!!((event.ctrlKey||event.metaKey)&&event.shiftKey),add:!!event.shiftKey});break;
case 'army-command':armyCommand(value);break;
case 'cancel-command':view.command=null;render(true);break;
case 'formation':act('formation',{ids:armyIds(),formation:value});break;
case 'stance':act('stance',{ids:armyIds(),stance:value});break;
case 'besiege':if(!armyIds().length)chooseArmy();issue(regionById[value],{kind:'region',id:value});break;
case 'attack-unit':if(!armyIds().length)chooseArmy();issue(game.state.squads.find(u=>u.id===value),{kind:'squad',id:value});break;
case 'focus-enemy':{const u=game.state.squads.find(u=>u.id===value);if(u)world?.focus(u);break;}
case 'research':act('research',{type:value});break;
case 'trade':act('trade',{resource:value,type:el.dataset.trade,amount:25});break;
case 'truce':act('truce',{faction:value});break;
case 'pause':game.setPaused(!game.state.paused);render(true);break;
case 'speed':game.setSpeed(Number(value));render(true);break;
case 'sound':view.sound=!view.sound;store('feouda-sound',view.sound?'1':'0');tone();if(view.modal==='settings')showModal('settings');render(true);break;
case 'help':showModal('help');break;
case 'settings':showModal('settings');break;
case 'about':showModal('about');break;
case 'close-modal':closeModal();break;
case 'save':{const r=game.save();toast(r.message,!r.ok);break;}
case 'export':exportGame();break;
case 'import':$('import-file').click();break;
case 'import-confirm':{cancelPlacement({open:false});const r=game.importSave(view.pendingImport);view.pendingImport=null;if(r.ok){view.controlGroups={};view.guideDone={};view.guideStep=null;store('feouda-guide-v24-progress','{}');view.armyIds=[];store('feouda-control-groups-v1','{}');view.started=true;view.endingShown=false;view.modalResume=false;closeModal();world?.home();setSelection({kind:'region',id:'home'});if(!game.state.outcome)game.setPaused(false);}toast(r.message,!r.ok);break;}
case 'reset-dialog':showModal('reset');break;
case 'reset-confirm':cancelPlacement({open:false});view.modalResume=false;game.reset();view.guideDone={};view.guideStep=null;view.guideOpen=true;store('feouda-guide-v24-progress','{}');view.controlGroups={};store('feouda-control-groups-v1','{}');view.endingShown=false;view.armyIds=[];view.command=null;closeModal();world?.home();setSelection({kind:'region',id:'home'});game.setPaused(false);break;
}}
document.addEventListener('load',e=>{if(e.target.matches?.('img[data-building-thumbnail]'))e.target.parentElement.classList.add('image-ready');},true);
document.addEventListener('error',e=>{if(e.target.matches?.('img[data-building-thumbnail]'))e.target.parentElement.classList.add('image-failed');},true);
document.addEventListener('click',onAction);
document.addEventListener('toggle',e=>{if(e.target.matches?.('details[data-training-requirements]'))view.requirementsOpen[e.target.dataset.trainingRequirements]=e.target.open;},true);
document.addEventListener('pointerdown',e=>{if(e.target.closest?.('[data-action],#side-panel'))held=true;});document.addEventListener('pointerup',()=>{setTimeout(()=>{held=false},50)});document.addEventListener('pointercancel',()=>held=false);
document.addEventListener('change',async e=>{if(['training-region-select','building-region-select'].includes(e.target.id)){const id=e.target.value;if(game.state.regions[id]?.owner==='player'){view.regionId=id;view.selection={kind:'region',id};world?.setSelection(view.selection);world?.focus(id);render(true);}return;}if(e.target.id==='quality-select'){view.quality=e.target.value;world?.setQuality(view.quality);store('feouda-quality',view.quality);toast(view.quality==='high'?'Υψηλή ποιότητα γραφικών.':'Ρυθμίσεις γραφικών για καλύτερη απόδοση.');}if(e.target.id==='import-file'){const file=e.target.files[0];e.target.value='';if(!file)return;if(file.size>5*1024*1024){toast('Το αρχείο είναι πολύ μεγάλο.',true);return;}view.pendingImport=await file.text();showModal('import');}});
document.addEventListener('keydown',e=>{if(view.modal){const atlas=e.target.closest?.('[data-action="atlas-region"]');if(atlas&&(e.key==='Enter'||e.code==='Space'||e.key===' ')){e.preventDefault();onAction({target:atlas});return;}if(e.key==='Escape'){e.preventDefault();closeModal();}if(e.key==='Tab'){const a=[...$('modal-root').querySelectorAll('button:not(:disabled),a,select,[tabindex="0"]')];if(a.length){const first=a[0],last=a[a.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}return;}if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;if(!view.started)return;const key=e.key.toLowerCase();if(view.placement){if(key==='escape'){e.preventDefault();cancelPlacement();return;}if(key==='r'){e.preventDefault();rotatePlacement();return;}if(key==='enter'){if(e.target.closest?.('button,[role="button"]'))return;e.preventDefault();confirmPlacement();return;}if(['m','h','b','f'].includes(key)||/^[1-9]$/.test(key)||(e.ctrlKey||e.metaKey)){e.preventDefault();return;}if(key==='a')return;}if(/^[1-9]$/.test(key)&&!e.altKey){e.preventDefault();if(!e.repeat)useControlGroup(key,{assign:!!(e.ctrlKey||e.metaKey),append:!!((e.ctrlKey||e.metaKey)&&e.shiftKey),add:!!e.shiftKey});return;}if((e.ctrlKey||e.metaKey)&&key==='a'){e.preventDefault();chooseArmy();return;}if(e.ctrlKey||e.metaKey||e.altKey)return;if(key==='b'){e.preventDefault();setPanel('build');return;}if(key==='f'){e.preventDefault();focusArmy();return;}if(e.code==='Space'&&e.target.closest?.('button,[role="button"]'))return;if(e.code==='Space'||key==='p'){e.preventDefault();game.setPaused(!game.state.paused);render(true);}else if(key==='escape'){if(view.command){view.command=null;render(true);}else if(view.panelOpen){view.panelOpen=false;render(true);setInsets();}else setSelection({kind:'army',ids:[]});}else if(key==='m'){e.preventDefault();armyCommand('move');}else if(key==='h'){e.preventDefault();armyCommand('hold');}else if(key==='r'){e.preventDefault();armyCommand('retreat');}else if(key==='a'&&armyIds().length){e.preventDefault();armyCommand('attack');}},true);
$('minimap').addEventListener('click',e=>{if(!view.started||view.modal)return;const r=e.currentTarget.getBoundingClientRect(),x=MAP.minX+(e.clientX-r.left)/r.width*MAP.width,z=MAP.minZ+(e.clientY-r.top)/r.height*MAP.depth;world?.focus({x,z});});
$('brand-crest').innerHTML=crest('player');$('help-button').innerHTML=icon('help')+'<span>Οδηγίες</span>';$('settings-button').innerHTML=icon('settings');$('camera-home').innerHTML=icon('home');$('overview-button').innerHTML=icon('map');
if(!view.started)game.setPaused(true);
function ready(){if(view.ready)return;view.ready=true;$('loading-screen').hidden=true;$('welcome').hidden=view.started;updateInput();render(true);}
try{world=createBattlefield($('battlefield'),{onSelect:onMapSelect,onPlacementHover:point=>movePlacement(point),onPlacementPick:point=>movePlacement(point,true),onGround:point=>{if(view.placement)movePlacement(point,true);else if(view.command)issue(point)},onContext:(point,target)=>{if(!view.placement)issue(point,target)},onBoxSelect:(ids,event={})=>setSelection({kind:'army',ids},{add:!!(event.shiftKey||event.additive)}),onReady:()=>queueMicrotask(ready),onAssetStatus:status=>{
 view.assetStatus=status;const shell=$('game-shell');shell.dataset.assetsLoaded=String(status.loaded);shell.dataset.assetsTotal=String(status.total);shell.dataset.assetsFailed=String(status.failed?.length||0);
 if(status.phase==='loading')$('loading-message').textContent='Φόρτωση λεπτομερών μοντέλων · '+status.loaded+' / '+status.total;
 if(status.phase==='partial')toast('Ορισμένα λεπτομερή μοντέλα δεν φορτώθηκαν. Ανανέωσε τη σελίδα για νέα προσπάθεια.',true);
 },onMode:mode=>{view.rendererMode=mode;$('game-shell').dataset.renderer=mode;if(mode==='software')$('loading-message').textContent='Στήνεται το πεδίο σε λειτουργία συμβατότητας.';},onError:error=>{bootFailed=true;$('loading-message').textContent='Η τρισδιάστατη απεικόνιση δεν μπόρεσε να ξεκινήσει. Χρειάζεται ενεργό WebGL 2. '+(error?.message||'');}});world.setState(game.state);world.setSelection(view.selection);world.setQuality(view.quality);setInsets();world.setInputEnabled(view.started);}
catch(error){bootFailed=true;console.error('Feouda renderer failed',error);$('loading-message').textContent='Η τρισδιάστατη απεικόνιση δεν φορτώθηκε. Ενεργοποίησε την επιτάχυνση γραφικών και ανανέωσε τη σελίδα.';}
game.subscribe(()=>{world?.setState(game.state);render();});render(true);
setInterval(()=>{const t=performance.now(),dt=Math.min((t-lastStep)/1000,.5);lastStep=t;if(!document.hidden&&view.started&&view.ready&&!bootFailed)game.step(dt);render();},50);
document.addEventListener('visibilitychange',()=>{lastStep=performance.now();if(document.hidden)game.save();});window.addEventListener('pagehide',()=>game.save());window.addEventListener('resize',()=>{setInsets();render(true)});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).catch(()=>{}));
window.feouda={getState:()=>JSON.parse(JSON.stringify(game.state)),getView:()=>JSON.parse(JSON.stringify(view)),getMap:()=>world?.getDebugState()};
