/**
 * Temporary visual QA only. This mounts the production GameUI with deterministic
 * synthetic snapshots. It never creates Game, WebGL, save data, or a simulation.
 */
import {GameUI} from '../src/ui.js';
import {tutorialProgress} from '../src/field-guide.js';
import {BUILDINGS} from '../src/rules.js';
import {CONSTRUCTION_SECONDS,CRAFT_RECIPES,CAMP_SPECIALIZATIONS} from '../src/realm-economy.js';
import './preview-v200-shell.css';

const toolbar=document.getElementById('qa-toolbar');
const status=document.getElementById('qa-status');
const scenarioSelect=document.getElementById('qa-scenario');
const params=new URLSearchParams(location.search);
let scenario=params.get('scenario')==='solo'?'solo':'army';
let currentView=params.get('panel')||'hud';
let selectedCard=params.get('card')||'build';
let ui,state;
const names=['Βρύος','Σπίθα','Ιτιά','Ρεύμα','Κρίνος','Πέτρα','Σκιά','Φτέρη','Άλμα','Στάλα','Λεύκα','Βότσαλο'];
const background={regions:2,armyCount:12,guards:8,safeCamps:3,foodIncomePerMinute:31.2,materialIncomePerMinute:7.2,foodPerMinute:18,netFoodPerMinute:13.2};
const scaleCost=(cost,n)=>Object.fromEntries(Object.entries(cost).map(([key,value])=>[key,value*n]));

function snapshot(mode){
  const solo=mode==='solo';
  const allies=solo?[]:names.map((name,index)=>({
    id:'preview-frog-'+index,name,team:'ally',hp:index===2?46:100,maxHp:100,stomach:70+index*2,maxStomach:100,
    level:3+index%4,tier:1+index%2,role:['hunter','scout','guardian','bruiser'][index%4],
    guard:index>=8,order:index>=8?'guard':index===4?'forage':'follow',home:index>=8?'preview-home':null,
    trained:index%2===0,trainingProgress:index===5?.4:0,canTrain:index%2===1,canPromote:index%3===0,
    promoteCost:{food:12,reeds:14},skinColor:['#7eab5f','#a1ba6e','#5d9371'][index%3],
    x:-35+index*2,z:-20+index%3*4
  }));
  const home={id:'preview-home',name:solo?'Πρώτο εργοτάξιο':'Κάστρο της Ιτιάς',team:'ally',tier:2,x:-24,z:-14,hp:solo?140:610,maxHp:650,gateHp:270,gateMaxHp:320,underConstruction:solo,buildings:solo?{}:{store:true,training:true}};
  const outpost={id:'preview-outpost',name:'Φρουρά του Περάσματος',team:'ally',tier:1,x:38,z:28,hp:230,maxHp:420,gateHp:130,gateMaxHp:250,buildings:{watchtower:true}};
  const enemyFort={id:'preview-rival',name:'Κόκκινη Όχθη',team:'enemy0',originalEnemy:true,x:64,z:-49,hp:650,maxHp:650,buildings:{store:true,watchtower:true}};
  const localCamps=solo?[home]:[home,outpost,enemyFort];
  const residents=allies.filter(f=>f.guard);
  const activeBackground=solo?{regions:0,armyCount:0,guards:0,foodIncomePerMinute:0,foodPerMinute:0,netFoodPerMinute:0}:background;
  const recipes=Object.values(CRAFT_RECIPES).map(recipe=>({...recipe,totalCost:scaleCost(recipe.cost,solo?1:2),targetCount:solo?1:2,enabled:!solo,reason:solo?'Χρειάζεται ολοκληρωμένο εκπαιδευτήριο σε ασφαλή βάση.':''}));
  const specializations=Object.values(CAMP_SPECIALIZATIONS).map(spec=>({...spec,enabled:true,reason:''}));
  const jobs=solo?[
    {id:'preview-build-solo',kind:'construction',type:'shelter',label:'Νέο οχυρό',campId:home.id,campName:home.name,progress:0,duration:40,remaining:40,status:'paused',reason:'Πλησίασε το σημείο εργασίας ή φέρε ελεύθερους συνοδούς.',workersPresent:0,workersAssigned:0,playerBuilding:false,workRate:0,workPoint:{x:-14,z:-8},canCancel:true}
  ]:[
    {id:'preview-build-active',kind:'construction',type:'nursery',label:'Φωλιά',campId:home.id,campName:home.name,progress:18,duration:36,remaining:18,status:'working',reason:'',workersPresent:3,workersAssigned:3,playerBuilding:true,workRate:1.5,workPoint:{x:-24,z:-14},canCancel:true},
    {id:'preview-build-blocked',kind:'construction',type:'palisade',label:'Οχυρά τείχη',campId:outpost.id,campName:outpost.name,progress:11,duration:30,remaining:19,status:'paused',reason:'Η βάση δέχεται επίθεση. Υπερασπίσου το εργοτάξιο.',workersPresent:0,workersAssigned:2,playerBuilding:false,workRate:0,workPoint:{x:38,z:28},canCancel:false},
    {id:'preview-craft',kind:'craft',type:'reed-armor',label:'Πανοπλία φύλλων',campId:home.id,campName:home.name,progress:10,duration:24,remaining:14,status:'working',reason:'',targetId:allies[0].id,targetName:allies[0].name,canCancel:true}
  ];
  const player={hp:100,maxHp:100,stamina:86,maxStamina:100,stomach:78,maxStomach:100,level:solo?1:6,xp:42,nextXp:140,tier:solo?1:2,crowned:false,rank:{crowned:false,title:'Ευγενής',territories:solo?0:2,target:3,detail:'Κράτησε τρία αντίπαλα οχυρά για το βασιλικό στέμμα.'},specialIndex:0,specialCD:0,attackCD:0,roarCD:0,dodgeCD:0};
  const resources=solo?{food:12,reeds:18,pearls:0}:{food:184,reeds:126,pearls:8};
  const guide={seen:['movement','food','flies','recruit'],tutorialDismissed:false,tutorial:tutorialProgress(solo?{distance:7,gatheredFood:6,gatheredReeds:12}:{distance:50,gatheredFood:80,gatheredReeds:65,recruited:12,shelters:2,groupsSaved:1,crafted:0})};
  return {
    player,resources,allies,selectedIds:solo?[]:allies.slice(0,2).map(f=>f.id),gangCount:allies.length+1,kingdomPopulation:allies.length+1+activeBackground.armyCount,kingdomGuards:residents.length+activeBackground.guards,
    camps:localCamps,currentCamp:home,currentCampId:home.id,campName:home.name,inCamp:true,
    context:{type:'recruit',name:'Κάλαμος',cost:{food:12},canTalk:true,available:true,actionLabel:'Δες απαιτήσεις',reason:'Ζητά τροφή και βοήθεια πριν ακολουθήσει.',progress:1},
    recruitment:{targetId:'preview-neutral',name:'Κάλαμος',role:'scout',level:3,portrait:'./guide/neutral.webp',canRecruit:false,helpAvailable:true,cost:{food:12},reason:'Θέλει να σε εμπιστευτεί πριν εγκαταλείψει την όχθη.',requirements:[{id:'food',label:'Πρόσφερε 12 τροφή',done:true,current:resources.food,target:12},{id:'help',label:'Μάζεψε 6 τροφή για την αποστολή του',done:false,current:2,target:6},{id:'leadership',label:'Φήμη ηγέτη · επίπεδο 3',done:!solo,current:player.level,target:3},{id:'base',label:'Μία ασφαλής, ολοκληρωμένη βάση',done:!solo,current:solo?0:2,target:1}]},
    tacticalGroups:[{id:'preview-group-1',name:'Πρώτη γραμμή',color:'#c4dc99',ids:solo?[]:allies.slice(0,2).map(f=>f.id),count:solo?0:2,selected:!solo},{id:'preview-group-2',name:'Πλαγιοκόπηση',color:'#a8c9d7',ids:solo?[]:allies.slice(2,5).map(f=>f.id),count:solo?0:3,selected:false},{id:'preview-group-3',name:'Εφεδρεία',color:'#dfbf89',ids:[],count:0,selected:false}],
    defenses:{traveling:allies.length-residents.length,guardCount:residents.length,camps:solo?[]:[{id:home.id,name:home.name,watchtower:false,slots:4,assigned:4,stationed:3,staffed:false,status:'guarded',range:18,damageReduction:0,guards:residents.map((f,i)=>({...f,status:i===0?'arriving':'stationed'}))},{id:outpost.id,name:outpost.name,watchtower:true,slots:4,assigned:0,stationed:0,staffed:false,status:'empty',range:26,damageReduction:18,guards:[]}]},
    realmEconomy:{armyCount:allies.length,foodPerMinute:allies.length*1.5,foodIncomePerMinute:solo?0:24,materialIncomePerMinute:solo?0:10,netFoodPerMinute:solo?0:6,shortage:false,servedRatio:1,hasSupplyBase:!solo,minutesOfFood:Infinity,currentCampId:home.id,craftTargetIds:solo?['player']:allies.slice(0,2).map(f=>f.id),craftTargetsLabel:solo?'Ο παίκτης':'2 επιλεγμένοι σύμμαχοι',recipes,jobs,background:activeBackground,camps:[{id:home.id,name:home.name,specialization:solo?null:'training',specializationLabel:solo?'Χωρίς ειδίκευση':'Εκπαίδευση',safe:true,underConstruction:solo,slotsUsed:solo?0:2,slotsReserved:solo?0:1,slotsTotal:4,availableSpecializations:specializations},...solo?[]:[{id:outpost.id,name:outpost.name,specialization:'defense',specializationLabel:'Άμυνα',safe:false,underConstruction:false,slotsUsed:1,slotsReserved:1,slotsTotal:3,availableSpecializations:specializations.map(s=>({...s,enabled:false,reason:'Η βάση βρίσκεται υπό απειλή.'}))}]]},
    realm:{active:solo?0:1,name:solo?'Πρώτη Όχθη':'Λίμνη των Ιτιών',frontier:solo?1:2,background:activeBackground,nextEvent:solo?null:{label:'Κίνηση θηρευτή στη μεθόριο',seconds:186},milestones:[],regions:[{index:0,name:'Πρώτη Όχθη',visited:true,active:solo,owned:solo?0:3,garrison:solo?0:8,enemies:32,level:1,travel:{allowed:true,cost:{food:0,reeds:0},requirements:[],targetIndex:0}},{index:1,name:'Λίμνη των Ιτιών',visited:!solo,active:!solo,owned:solo?0:2,garrison:solo?0:4,enemies:80,level:4,travel:{allowed:false,cost:{food:40,reeds:30},requirements:[{label:'Ολοκλήρωσε μία ασφαλή βάση',met:!solo}],reason:solo?'Χρειάζεσαι ολοκληρωμένη ασφαλή βάση.':'',targetIndex:1}},{index:2,name:'Το Βαθύ Πέρασμα',visited:false,active:false,owned:0,garrison:0,enemies:114,level:6,travel:{allowed:false,cost:{food:54,reeds:38},requirements:[{label:'Επίπεδο 6',met:!solo},{label:'Κατάκτησε δύο αρχικά αντίπαλα οχυρά',met:false},{label:'Ασφαλές ολοκληρωμένο κάστρο',met:!solo}],reason:'Απομένει η κατάκτηση ενός αντίπαλου οχυρού.',targetIndex:2}}]},
    buildOptions:Object.entries(BUILDINGS).filter(([type])=>Object.hasOwn(CONSTRUCTION_SECONDS,type)).map(([type,b])=>({type,...b,duration:CONSTRUCTION_SECONDS[type],built:Boolean(home.buildings[type]),enabled:!home.buildings[type]&&(!solo||type==='shelter'),reason:solo&&type!=='shelter'?'Ολοκλήρωσε πρώτα το νέο οχυρό.':''})),
    placement:{valid:true},buildPlacement:null,recruitmentUnlimited:true,capacity:null,
    training:{duration:24,cost:{food:6,reeds:8}},campaign:{phase:'settlement',objectives:[{id:'expand-shelters',icon:'camp',label:'Σταθεροποίησε τις βάσεις της λίμνης',current:solo?0:2,target:3,done:false}]},
    objectiveVisual:{current:solo?0:2,total:5,progress:solo?0:.4,targets:Array.from({length:5},(_,i)=>({id:'goal-'+i,team:i<2&&!solo?'ally':'enemy'+i,originalTeam:'enemy'+i,done:i<2&&!solo}))},
    objective:'Υπερασπίσου τα εργοτάξια και εξασφάλισε τροφή.',guide,viewMode:'third',squadMode:'follow',day:solo?1:9,timeLabel:'09:42',night:false,locationName:solo?'Πρώτη Όχθη':'Λίμνη των Ιτιών',
    world:{radius:150,player:{x:-24,z:-14,yaw:.4},camps:localCamps,allies,enemies:solo?[]:Array.from({length:80},(_,i)=>({id:'rival-'+i,x:58+Math.sin(i*2.3)*13,z:-48+Math.cos(i*1.7)*11,hp:100,team:'enemy0'})),platforms:[],hotspots:[{x:-12,z:8,flies:20,rich:true},{x:28,z:-19,flies:12}],routes:[{from:{x:-24,z:-14},to:{x:38,z:28}}],mapRegions:[{x:-24,z:-14,radius:26,tint:'#56804c'},{x:64,z:-49,radius:28,tint:'#8a5740'}],stronghold:{name:'Κόκκινη Όχθη',population:80,target:84},predators:solo?[]:[{id:'preview-boss',name:'Λευκός Φρουρός',type:'heron',boss:true,phase:'stalk',hp:680,x:22,z:-37}]},
    predator:null,stats:{},fps:undefined
  };
}

function report(message){status.textContent=message;}
function refresh(){ui.update(state);if(ui.panel)ui.renderPanel(true);}
function choosePanel(view,{updateUrl=true}={}){
  currentView=view;ui.hideMenus();ui.refs.hud.hidden=false;ui.refs.guideHint.hidden=true;state.predator=null;
  if(view==='boss')state.predator={id:'preview-boss',name:'Λευκός Φρουρός',type:'heron',boss:true,hp:540,maxHp:680,phase:'windup',phaseTime:.55,windup:1.2,enraged:false,objective:'Απέφυγε το ράμφος και χτύπησε στην ανάκαμψη.'};
  ui.update(state);
  if(['build','defense','organization','workshop'].includes(view))ui.showPanel('build',{view:view==='build'?'catalog':view});
  else if(view==='guide')ui.openGuideLibrary();
  else if(['card','encounter'].includes(view))ui.showGuideCard(selectedCard,{firstEncounter:view==='encounter'});
  else if(['recruitment','roster','realm','map'].includes(view))ui.showPanel(view);
  else if(view==='hud')ui.showGuideHint('flies');
  ui.update(state);
  for(const button of toolbar.querySelectorAll('[data-preview-panel]'))button.setAttribute('aria-pressed',String(button.dataset.previewPanel===view));
  if(updateUrl){const url=new URL(location.href);url.searchParams.set('panel',view);url.searchParams.set('scenario',scenario);history.replaceState(null,'',url);}
  report(`Προβολή: ${view} · ${scenario==='solo'?'Μόνος οικοδόμος':'Στρατός και απομακρυσμένες βάσεις'} · όλα τα δεδομένα είναι συνθετικά.`);
}
function action(name,data={}){
  if(name==='panel-open'){choosePanel(data.name);return;}
  if(name==='guide-open'){report('Εικονογραφημένη οδηγία · προεπισκόπηση παύσης, χωρίς ενεργή προσομοίωση.');return;}
  if(name==='guide-close'||name==='hud-disclosure')return;
  if(name==='tutorial-dismiss'){state.guide.tutorialDismissed=true;refresh();return;}
  if(name==='special-select'){state.player.specialIndex=data.index;refresh();return;}
  if(name==='select-frog'){state.selectedIds=data.additive?[...new Set([...state.selectedIds,data.id])]:[data.id];refresh();return;}
  if(name==='select-all'){state.selectedIds=state.allies.map(f=>f.id);refresh();return;}
  if(name==='select-group'){
    const group=state.tacticalGroups.find(g=>g.id===data.groupId);state.selectedIds=group?.ids||[];
    for(const g of state.tacticalGroups)g.selected=g===group;refresh();return;
  }
  if(name==='save-group'){
    const group=state.tacticalGroups.find(g=>g.id===data.groupId);if(group){group.ids=[...state.selectedIds];group.count=group.ids.length;}refresh();return;
  }
  if(name==='craft-target-player'){state.selectedIds=[];state.realmEconomy.craftTargetIds=['player'];state.realmEconomy.craftTargetsLabel='Ο παίκτης';state.realmEconomy.recipes=state.realmEconomy.recipes.map(r=>({...r,totalCost:r.cost,targetCount:1}));refresh();return;}
  if(name==='interact'){choosePanel('recruitment');return;}
  report(`Συνθετικό συμβάν: ${name} · ελέγχεται μόνο η διεπαφή. Δεν υπάρχει ενεργή προσομοίωση ή αποθήκευση.`);
}

try{
  state=snapshot(scenario);scenarioSelect.value=scenario;
  ui=new GameUI({onAction:action,onResume:()=>choosePanel('hud'),onStart:()=>choosePanel('hud'),onSettings:()=>report('Ρύθμιση προεπισκόπησης · δεν αποθηκεύεται.')});
  const resize=()=>document.documentElement.style.setProperty('--qa-toolbar-height',`${Math.ceil(toolbar.getBoundingClientRect().height)}px`);
  new ResizeObserver(resize).observe(toolbar);resize();
  toolbar.addEventListener('click',event=>{const button=event.target.closest('[data-preview-panel]');if(button)choosePanel(button.dataset.previewPanel);});
  scenarioSelect.addEventListener('change',()=>{scenario=scenarioSelect.value;state=snapshot(scenario);choosePanel(currentView);});
  document.addEventListener('keydown',event=>{if(event.code==='Escape'){event.preventDefault();if(['guide','help'].includes(ui.panel))ui.closeGuideCard();else choosePanel('hud');}});
  choosePanel(currentView,{updateUrl:false});
  document.documentElement.dataset.previewReady='true';
  // Two repaint passes allow SVG map markers to finish decoding. No game loop.
  setTimeout(()=>{ui.lastDraw=0;ui.update(state);},250);
  setTimeout(()=>{ui.lastDraw=0;ui.update(state);},1000);
}catch(error){status.classList.add('is-error');report('Σφάλμα UI preview: '+error.message);console.error(error);}
