import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {GUIDE_CARDS,GUIDE_CATEGORIES,GUIDE_ACTIONS,GUIDE_BUILDINGS,guideCard,tutorialProgress} from '../src/field-guide.js';

const bundle=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text+'\n//# sourceURL=frog-field-guide-ui.mjs').toString('base64'));
function node(){
  const classes=new Set();return {hidden:false,innerHTML:'',textContent:'',dataset:{},scrollTop:0,style:{setProperty(){}},classList:{toggle:(k,on)=>on?classes.add(k):classes.delete(k),contains:k=>classes.has(k),add:k=>classes.add(k),remove:k=>classes.delete(k)},setAttribute(){},focus(){},contains:()=>false,querySelector:()=>null,querySelectorAll:()=>[]};
}
function fixture(t){
  const previous=globalThis.document;globalThis.document={activeElement:null,exitPointerLock(){}};
  t.after(()=>{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;});
  const ui=Object.create(GameUI.prototype),events=[];
  Object.assign(ui,{state:{},panel:null,menu:null,root:node(),portraits:{},portraitCache:new Map(),toastKeys:new Map(),guideCategory:'all',guideQuery:'',guideId:null,guideReturn:null,guideBackToBook:false,guideFirstEncounter:false,buildView:'catalog',rosterFilter:'all',callbacks:{onAction:(action,data)=>events.push({action,data}),onResume:()=>events.push({action:'resume'})},drawMap(){}});
  ui.refs=Object.fromEntries([...ui.markup().matchAll(/data-ref="([^"]+)"/g)].map(match=>[match[1],node()]));
  return {ui,events};
}
function click(ui,action,data={},disabled=false){
  const target={disabled,dataset:{action,...data},closest(selector){return selector==='[data-action]'?this:null;}};
  ui.click({target,stopPropagation(){}});
}
function clickGuide(ui,id,{actionHelp=false}={}){
  const target={dataset:{guideOpen:id},classList:{contains:()=>actionHelp},closest(selector){return selector==='[data-guide-open]'?this:null;}};
  ui.click({target,stopPropagation(){}});
}

test('the complete guide has a distinct illustrated asset and exact three-step instruction for every registered action, resource and creature',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../public/guide/manifest.json',import.meta.url),'utf8'));
  assert.equal(GUIDE_CARDS.length,42);assert.equal(new Set(GUIDE_CARDS.map(c=>c.image)).size,42);
  const ids=new Set(GUIDE_CARDS.map(c=>c.id));
  assert.deepEqual(manifest.cards.map(c=>c.id),GUIDE_CARDS.map(c=>c.id));
  for(const card of GUIDE_CARDS){
    assert.equal(card.steps.length,3);assert.ok(card.keys.length);assert.ok(card.cost.length>15);assert.ok(card.result.length>15);
    assert.ok(GUIDE_CATEGORIES.some(category=>category.id===card.category));
    assert.equal(manifest.cards.find(c=>c.id===card.id).file,card.id+'.webp');
    assert.match(card.image,/^\.\/guide\/[a-z-]+\.webp$/);
    for(const related of card.related)assert.ok(ids.has(related));
  }
  for(const id of [...Object.values(GUIDE_ACTIONS),...Object.values(GUIDE_BUILDINGS),'food','flies','materials','pearls','neutral','enemies','surrender','heron','snake','fish'])assert.ok(guideCard(id));
  assert.equal(guideCard('missing-card'),null);
  assert.match(guideCard('craft').tip,/Δεν εμφανίζει μόνο του πανοπλίες/);
  assert.match(guideCard('recruit').tip,/άμεσα/);
});

test('practical onboarding advances only from actual gameplay metrics and does not depend on opening or dismissing cards',()=>{
  const before=tutorialProgress({});assert.equal(before.filter(t=>t.done).length,0);
  const after=tutorialProgress({distance:7,gatheredFood:8,gatheredReeds:11,recruited:1,shelters:0,groupsSaved:0,crafted:0});
  assert.equal(after.filter(t=>t.done).length,3);assert.equal(after.find(t=>!t.done).id,'materials');
  const completed=tutorialProgress({distance:100,gatheredFood:100,gatheredReeds:100,recruited:100,shelters:1,groupsSaved:1,crafted:1});
  assert.ok(completed.every(t=>t.done));
  assert.ok(tutorialProgress({distance:NaN,crafted:-1}).every(t=>!t.done));
});

test('first encounter opens the exact card, pauses through one controller notification and restores its previous panel on close',t=>{
  const {ui,events}=fixture(t);ui.panel='build';ui.panelData={campId:'home'};
  assert.equal(ui.showGuideCard('craft',{firstEncounter:true}),true);
  assert.equal(ui.panel,'guide');assert.match(ui.refs.panel.innerHTML,/ΠΡΩΤΗ ΣΥΝΑΝΤΗΣΗ/);
  assert.match(ui.refs.panel.innerHTML,/src="\.\/guide\/craft.webp"/);
  assert.deepEqual(events[0],{action:'guide-open',data:{id:'craft',firstEncounter:true}});
  ui.closeGuideCard();assert.equal(ui.panel,'build');assert.equal(ui.guideReturn,null);
  assert.deepEqual(events.at(-1),{action:'guide-close',data:{id:'craft',returnPanel:'build',returnMenu:null}});
  const previous=events.length;assert.equal(ui.showGuideCard('unknown'),false);assert.equal(events.length,previous);
});

test('book → card → book never resumes the simulation until the book itself closes',t=>{
  const {ui,events}=fixture(t);ui.openGuideLibrary();
  assert.equal(ui.panel,'help');assert.equal((ui.refs.panel.innerHTML.match(/class="fg-guide-entry"/g)||[]).length,42);
  ui.showGuideCard('flies');assert.equal(ui.guideBackToBook,true);
  ui.closeGuideCard();assert.equal(ui.panel,'help');assert.equal(events.filter(e=>e.action==='guide-close').length,0);
  ui.closeGuideCard();assert.equal(ui.panel,null);assert.equal(events.filter(e=>e.action==='guide-close').length,1);
});

test('nonblocking side guidance neither changes the active panel nor issues a pause action',t=>{
  const {ui,events}=fixture(t);ui.panel=null;ui.menu=null;
  assert.equal(ui.showGuideHint('heron'),true);assert.equal(ui.refs.guideHint.hidden,false);
  assert.match(ui.refs.guideHint.innerHTML,/guide\/heron.webp/);assert.equal(ui.panel,null);assert.equal(ui.menu,null);assert.equal(events.length,0);
  click(ui,'guide-hint-close');assert.equal(ui.refs.guideHint.hidden,true);assert.equal(events.length,0);
});

test('contextual special help follows the current ability while an explicit book entry always opens its own ability',t=>{
  const {ui,events}=fixture(t);ui.specialIndex=2;
  clickGuide(ui,'kick',{actionHelp:true});assert.equal(ui.guideId,'sweep');assert.ok(events.every(e=>e.action!=='special-attack'));
  clickGuide(ui,'kick');assert.equal(ui.guideId,'kick');
  clickGuide(ui,'intimidate',{actionHelp:true});assert.equal(ui.guideId,'intimidate');assert.ok(events.every(e=>e.action!=='intimidate'));
});

test('recruitment explains every unmet condition and only sends explicit target ids for help or enlistment',t=>{
  const {ui,events}=fixture(t);ui.panel='recruitment';
  ui.state.recruitment={targetId:'neutral-7',name:'<Σπίθα>',role:'scout',canRecruit:false,cost:{food:12},helpAvailable:true,requirements:[{id:'food',label:'12 τροφή',done:true,current:20,target:12},{id:'help',label:'Μάζεψε 6 μύγες',done:false,current:2,target:6},{id:'base',label:'Ασφαλής βάση',done:false}]};
  let html=ui.recruitmentMarkup();assert.match(html,/&lt;Σπίθα&gt;/);assert.doesNotMatch(html,/<Σπίθα>/);
  assert.match(html,/Μάζεψε 6 μύγες/);assert.match(html,/<small>2 \/ 6<\/small>/);
  assert.match(html,/data-action="recruit-target" data-id="neutral-7" disabled/);
  click(ui,'recruit-help',{id:'neutral-7'});assert.deepEqual(events.at(-1),{action:'recruit-help',data:{id:'neutral-7'}});
  ui.state.recruitment.canRecruit=true;ui.state.recruitment.instant=true;ui.state.recruitment.cost={food:0};html=ui.recruitmentMarkup();
  assert.doesNotMatch(html,/data-action="recruit-target" data-id="neutral-7" disabled/);assert.match(html,/άμεση ένταξη/);
  click(ui,'recruit-target',{id:'neutral-7'});assert.deepEqual(events.at(-1),{action:'recruit-target',data:{id:'neutral-7'}});
});

test('construction progress uses elapsed work seconds, preserves cancellation explanation and shows uncapped army upkeep',t=>{
  const {ui}=fixture(t);ui.state.realmEconomy={armyCount:500,foodIncomePerMinute:30,foodPerMinute:50,netFoodPerMinute:-20,shortage:true,minutesOfFood:3,camps:[],jobs:[{id:'job-1',kind:'construction',type:'store',label:'Αποθήκη',campName:'Οχυρό',progress:15,duration:60,remaining:45,status:'paused',reason:'Η βάση δέχεται επίθεση',canCancel:true}]};
  const html=ui.organizationMarkup();assert.match(html,/−50.0/);assert.match(html,/>-20.0/);
  assert.match(html,/value="15" max="60"/);assert.match(html,/Η βάση δέχεται επίθεση/);assert.match(html,/επιστροφή 50%/);assert.match(html,/πληθυσμός παραμένει απεριόριστος/);
});

test('global population includes parked regions while local followers remain the actual traveling roster',t=>{
  const {ui}=fixture(t);
  ui.updatePopulation({player:{hp:100},allies:[{id:'one',hp:50},{id:'two',hp:50,guard:true},{id:'lost',hp:0}],gangCount:3,kingdomPopulation:31,kingdomGuards:12});
  assert.equal(ui.refs.populationTotal.textContent,'31');
  assert.equal(ui.refs.populationTravelers.textContent,'1');
  assert.equal(ui.refs.populationGuards.textContent,'12');
  assert.equal(ui.refs.populationLocal.textContent,'3');
  assert.equal(ui.refs.populationAway.textContent,'28');
  assert.equal(ui.refs.populationRegions.hidden,false);
  assert.equal(ui.refs.gangCount.textContent,'3');
  ui.updatePopulation({player:{hp:100},allies:[]});
  assert.equal(ui.refs.populationTotal.textContent,'1');assert.equal(ui.refs.populationRegions.hidden,true);
});

test('shared food estimates count active and parked lake supply once',t=>{
  const {ui}=fixture(t);
  ui.state={resources:{food:20},realmEconomy:{armyCount:8,foodIncomePerMinute:10,foodPerMinute:30,netFoodPerMinute:-20,background:{armyCount:20,foodIncomePerMinute:25,foodPerMinute:15,netFoodPerMinute:10}}};
  const total=ui.economyTotals();
  assert.equal(total.armyCount,28);assert.equal(total.foodIncomePerMinute,35);assert.equal(total.foodPerMinute,45);
  assert.equal(total.netFoodPerMinute,-10);assert.equal(total.minutesOfFood,2);
});

test('construction estimates use the actual workforce and distinguish the player from assigned allies',t=>{
  const {ui}=fixture(t);ui.state.world={player:{x:0,z:0}};
  const job={kind:'construction',label:'Αποθήκη',progress:15,duration:60,remaining:45,status:'working',workersAssigned:3,workersPresent:3,playerBuilding:true,workRate:1.5,workPoint:{x:3,z:4}};
  let html=ui.jobMarkup(job);
  assert.match(html,/≈ 30″/);assert.match(html,/Σύμμαχοι <b>2 \/ 3<\/b>/);assert.match(html,/Εσύ χτίζεις/);assert.match(html,/Ρυθμός 1.50×/);
  html=ui.jobMarkup({...job,status:'paused',reason:'Απαιτείται οικοδόμος',workersPresent:0,playerBuilding:false,workRate:0});
  assert.match(html,/45″ εργασίας/);assert.doesNotMatch(html,/≈/);assert.match(html,/πάγκο με τη σημαία · 5 μ. από εδώ/);
  assert.match(guideCard('build').steps[2],/Χωρίς παρόντα οικοδόμο/);
});

test('build cards display the backend work duration before placement',t=>{
  const {ui}=fixture(t);ui.state={resources:{food:100,reeds:100},buildOptions:[{type:'shelter',name:'Κάστρο',cost:{food:30,reeds:45},duration:95,enabled:true}]};
  assert.match(ui.buildMarkup(),/95″ εργασίας · χρειάζεται οικοδόμο/);
});

test('explicit panel and build-tab transitions start at the header while queue refreshes retain scroll',t=>{
  const {ui}=fixture(t);ui.state.realmEconomy={jobs:[],camps:[]};
  ui.showPanel('build',{view:'organization'});ui.refs.panel.scrollTop=360;
  ui.state.realmEconomy.jobs.push({kind:'construction',label:'Αποθήκη',progress:10,duration:24,remaining:14,status:'working',workRate:1});
  ui.renderPanel(false);assert.equal(ui.refs.panel.scrollTop,360,'a periodic queue update must preserve the reading position');
  click(ui,'build-view',{view:'catalog'});assert.equal(ui.refs.panel.scrollTop,0,'switching from organization to buildings must reveal the header');
  ui.refs.panel.scrollTop=180;ui.renderPanel(true);assert.equal(ui.refs.panel.scrollTop,180,'forced data refresh is not navigation');
  click(ui,'build-view',{view:'catalog'});assert.equal(ui.refs.panel.scrollTop,180,'clicking the already active tab is not a transition');
  ui.openDefenses();assert.equal(ui.refs.panel.scrollTop,0,'opening defense from the catalog starts at its header');
  ui.refs.panel.scrollTop=240;ui.showPanel('build',{view:'organization'});assert.equal(ui.refs.panel.scrollTop,0,'an explicitly opened panel must not inherit stale scroll');
});

test('workshop total costs and target ids match the backend quote rather than a hard-coded per-item price',t=>{
  const {ui,events}=fixture(t);ui.state={resources:{food:50,reeds:100,pearls:6},realmEconomy:{currentCampId:'fort-2',craftTargetIds:['one','two'],craftTargetsLabel:'2 επιλεγμένοι σύμμαχοι',recipes:[{id:'shell-armor',name:'Πανοπλία κελύφους',description:'Προστασία',cost:{food:8,reeds:20,pearls:2},totalCost:{food:16,reeds:40,pearls:4},duration:25,requiredLevel:6,targetCount:2,enabled:true}],jobs:[]}};
  const html=ui.workshopMarkup();assert.match(html,/2 επιλεγμένοι σύμμαχοι/);assert.match(html,/<b>40<\/b><small>Υλικά/);assert.match(html,/<b>4<\/b><small>Μαργαριτάρια/);
  click(ui,'craft-equipment',{camp:'fort-2',recipe:'shell-armor'});
  assert.deepEqual(events.at(-1),{action:'craft-equipment',data:{campId:'fort-2',recipeId:'shell-armor',targetIds:['one','two']}});
});

test('persistent group controls route assignment and flank orders to only the requested group',t=>{
  const {ui,events}=fixture(t);ui.state={selectedIds:['a','b'],tacticalGroups:[{id:'left',name:'Αριστερά',ids:['a','b'],count:2,selected:true},{id:'reserve',name:'Εφεδρεία',ids:['c'],count:1,selected:false}]};
  assert.match(ui.tacticalGroupsMarkup(),/data-group="left" data-command="flank-left"/);
  click(ui,'save-group',{group:'reserve'});click(ui,'group-command',{group:'left',command:'flank-right'});
  assert.deepEqual(events,[{action:'save-group',data:{groupId:'reserve'}},{action:'group-command',data:{groupId:'left',command:'flank-right'}}]);
});

test('frontier cards expose the exact unmet travel condition and preserve safe free revisits',t=>{
  const {ui,events}=fixture(t);ui.state.realm={name:'Ρηχή λίμνη',active:1,regions:[{index:0,name:'Πρώτη λίμνη',visited:true,owned:3,garrison:12,enemies:20,travel:{allowed:true,cost:{food:0,reeds:0},requirements:[],targetIndex:0}},{index:2,name:'Νέα όχθη',visited:false,travel:{allowed:false,reason:'Χρειάζεσαι επίπεδο 6',cost:{food:40,reeds:30},requirements:[{label:'Επίπεδο 6',met:false}],targetIndex:2}}]};
  const html=ui.realmMarkup();assert.match(html,/Χρειάζεσαι επίπεδο 6/);assert.match(html,/Χωρίς χρέωση/);assert.match(html,/data-region="2" disabled/);
  click(ui,'realm-travel',{region:'0'});assert.deepEqual(events.at(-1),{action:'realm-travel',data:{targetIndex:0}});
  click(ui,'realm-travel',{region:'2'},true);assert.equal(events.length,1);
});

test('guide search filters accessible unseen cards without requiring prior encounters',t=>{
  const {ui}=fixture(t);ui.state.guide={seen:[]};ui.guideCategory='wildlife';
  let html=ui.helpMarkup();assert.equal((html.match(/class="fg-guide-entry"/g)||[]).length,4);assert.match(html,/data-guide-open="heron"/);
  ui.guideCategory='all';ui.guideQuery='Πλαγιοκόπηση';html=ui.helpMarkup();assert.match(html,/data-guide-open="flank"/);assert.doesNotMatch(html,/class="fg-guide-read"/);
  ui.guideQuery='ΜΥΓΕΣ';assert.match(ui.helpMarkup(),/data-guide-open="flies"/);
  ui.guideQuery='δενυπάρχειαυτήηλέξη';assert.match(ui.helpMarkup(),/Δεν βρέθηκε οδηγία/);
});
