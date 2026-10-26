import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {normalizeUIScale} from '../src/ui-preferences.js';
import {CREEK_GUIDE_CARDS,creekGuideCard} from '../src/creek-guide.js';
import {describeObjective} from '../src/guidance.js';

const bundle=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
function node(){
  const classes=new Set(),attributes={},styles={};
  return {hidden:false,innerHTML:'',textContent:'',dataset:{},scrollTop:0,attributes,styles,value:0,
    style:{setProperty:(name,value)=>styles[name]=value},classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name),add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name)},
    setAttribute:(name,value)=>attributes[name]=value,removeAttribute:name=>delete attributes[name],contains:()=>false,querySelector:()=>null,querySelectorAll:()=>[]};
}
function fixture(t){
  const previous=globalThis.document;globalThis.document={activeElement:null,exitPointerLock(){}};
  t.after(()=>{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;});
  const ui=Object.create(GameUI.prototype),events=[];
  Object.assign(ui,{state:{creek:{enabled:true,inventory:{food:18,finds:2,keepsakes:1},phase:{label:'Χαμηλή στάθμη',hint:'Η όχθη εκτίθεται.'},discoveryCount:1,totalLandmarks:4,discoveries:[{id:'pond',label:'Λιμνούλα',description:'Νούφαρα και τροφή.',found:true,x:1,z:2},{id:'roots',label:'Άγνωστο σημείο',description:'Η κίνηση χάνεται στις ρίζες.',found:false,x:33,z:44}],abilities:[{id:'leap',label:'Μεγάλο άλμα',description:'Νέα διαδρομή.',unlocked:true,controls:'Space',progress:0,target:3},{id:'dive',label:'Βαθιά κατάδυση',description:'Πέρασε κάτω από το νερό.',unlocked:false,hint:'Γνώρισε τα ρεύματα.',controls:'Ctrl',progress:4,target:10}],nest:{visited:false,level:0,safe:true},dropped:[{id:'drop-1',x:9,z:7,food:5,findsCount:1,keepsakesCount:1}]},allies:[],resources:{food:18,reeds:900,pearls:800},player:{},tacticalGroups:[]},
    settings:{quality:'high',volume:.65,sensitivity:1,uiScale:1},menu:null,panel:null,root:node(),portraits:{},portraitCache:new Map(),panelExpanded:true,pauseExpanded:true,conceptPanelsOpen:false,constructionExpanded:true,guideCategory:'all',guideQuery:'',guideReturn:null,guideBackToBook:false,rosterFilter:'all',callbacks:{onAction:(action,data)=>events.push({action,data})},drawMap(){},layoutDockedPanels(){}});
  ui.refs=Object.fromEntries([...ui.markup().matchAll(/data-ref="([^"]+)"/g)].map(match=>[match[1],node()]));
  return {ui,events};
}
function click(ui,action,data={}){
  const target={dataset:{action,...data},disabled:false};
  ui.click({target:{closest:selector=>selector==='[data-action]'?target:null},stopPropagation(){}});
}

test('V reaches the live exploration drawer including when an old build panel is requested',t=>{
  const {ui,events}=fixture(t);click(ui,'open-exploration');click(ui,'open-build');
  assert.deepEqual(events,[{action:'panel-open',data:{name:'exploration'}},{action:'panel-open',data:{name:'exploration'}}]);
  ui.showPanel('build');
  assert.equal(ui.panel,'exploration');assert.equal(ui.isBlocking(),false);
  assert.match(ui.refs.panel.innerHTML,/Ανακαλύψεις/);
  assert.doesNotMatch(ui.refs.panel.innerHTML,/data-action="build"|εργοτάξιο|Κόστος κατασκευής/);
  assert.equal((ui.markup().split('fg-primary-actions')[1].split('<section class="fg-action-drawer"')[0].match(/fg-action-slot/g)||[]).length,8,'all eight primary actions remain available');
  assert.match(ui.markup(),/data-action="concept-toggle".*data-ref="conceptToggle"/);
});

test('exploration presents earned controls, non-spoiling discovery hints, and important item recovery',t=>{
  const {ui}=fixture(t),html=ui.explorationMarkup();
  assert.match(html,/Space/);assert.doesNotMatch(html,/>Ctrl</,'a locked ability does not advertise itself as usable');
  assert.match(html,/Γνώρισε τα ρεύματα/);assert.match(html,/Άγνωστο σημείο/);
  assert.doesNotMatch(html,/x:33|z:44/);
  assert.match(html,/value="4" max="10"/);
  assert.match(html,/Ανάκτηση ευρημάτων/);assert.match(html,/<b>5<\/b> τροφή · <b>2<\/b> ευρήματα/);
  ui.state.creek.abilities[0].label='<img src=x onerror=alert(1)>';
  assert.match(ui.explorationMarkup(),/&lt;img/);assert.doesNotMatch(ui.explorationMarkup(),/<img src=x/);
});

test('natural roster exposes working local tactics and never routes to training or construction',t=>{
  const {ui,events}=fixture(t);
  ui.state.allies=[{id:'a',name:'Ρίζα',role:'scout',hp:80,maxHp:100,stomach:60,maxStomach:100,order:'scout',portrait:'portrait.png'}];
  ui.state.selectedIds=['a'];
  const html=ui.rosterMarkup();
  for(const command of ['scout','distract','protect','retreat','follow','attack','forage','guard','regroup'])assert.match(html,new RegExp('data-command="'+command+'"'));
  assert.doesNotMatch(html,/data-command="train"|data-command="promote"|data-action="defense-open"|Υλικά κατασκευής/);
  click(ui,'selection-command',{command:'distract'});
  assert.deepEqual(events.at(-1),{action:'selection-command',data:{command:'distract',ids:['a']}});
  click(ui,'gang-command',{command:'retreat'});
  assert.deepEqual(events.at(-1),{action:'gang-command',data:{command:'retreat'}});
});

test('creek UI uses ecology and found items even when a migrated save still includes old production jobs',t=>{
  const {ui}=fixture(t);
  ui.state.realmEconomy={jobs:[{kind:'construction',duration:100,progress:5}],netFoodPerMinute:99};
  ui.state.guide={tutorial:[{id:'build',label:'Χτίσε οχυρό',current:0,target:1}]};
  ui.updateRealmHUD(ui.state);ui.updateConstructionHUD(ui.state);
  assert.equal(ui.refs.pearls.textContent,'1');assert.equal(ui.refs.supplySummary.textContent,'Χαμηλή στάθμη');
  assert.equal(ui.refs.supplySummary.dataset.action,'open-exploration');
  assert.equal(ui.refs.supplySummary.attributes['aria-label'],'Χαμηλή στάθμη · Δες τις αλλαγές του οικοσυστήματος');
  assert.equal(ui.refs.practicalTutorial.hidden,true);assert.equal(ui.refs.constructionHUD.hidden,true);
  ui.state.realm={name:'Ρίζες',regions:[{index:1,name:'Επόμενη όχθη',travel:{allowed:true,targetIndex:1,cost:{},requirements:[{label:'Πέρασμα ανακαλύφθηκε',met:true}]}}]};
  assert.doesNotMatch(ui.realmMarkup(),/κάστρα|παράγουν|εργαστήρι|βασίλειο/);
  assert.match(ui.realmMarkup(),/data-region="1"/);
});

test('breath is essential only while diving and camouflage has a visible state',t=>{
  const {ui}=fixture(t);
  ui.state.player={diving:true,breath:23,hiddenInCover:false};ui.updateCreekPresentation(ui.state);
  assert.equal(ui.refs.breath.hidden,false);assert.equal(ui.refs.breathBar.value,23);
  assert.equal(ui.refs.breathValue.textContent,'23%');assert.equal(ui.refs.breath.classList.contains('is-low'),true);
  ui.state.player={diving:false,breath:100,hiddenInCover:true};ui.updateCreekPresentation(ui.state);
  assert.equal(ui.refs.breath.hidden,true);assert.equal(ui.root.classList.contains('fg-in-cover'),true);
});

test('natural help aliases old guide requests and keeps building instructions out of the current book',t=>{
  const {ui}=fixture(t);
  assert.equal(creekGuideCard('build').id,'exploration');
  assert.equal(creekGuideCard('craft').id,'abilities');
  const copy=CREEK_GUIDE_CARDS.flatMap(c=>[c.title,c.subtitle,...c.steps,c.cost,c.result,c.tip]).join(' ');
  assert.doesNotMatch(copy,/κάστρ|οχυρ|τείχ|εργαστήρ|βασιλ|προαγ|πύλ|υλικ/i);
  ui.showGuideHint('build');assert.match(ui.refs.guideHint.innerHTML,/Διάβασε το ρυάκι/);
  ui.showGuideCard('craft');assert.equal(ui.guideId,'abilities');assert.match(ui.refs.panel.innerHTML,/Μόνιμες φυσικές ικανότητες/);
  assert.doesNotMatch(ui.helpMarkup(),/Κάστρα & τεχνίτες/);
});

test('scale handles corrupt saved preferences and remains independent of browser zoom',t=>{
  const {ui}=fixture(t);
  for(const value of [null,undefined,NaN,Infinity,''])assert.equal(normalizeUIScale(value),1);
  assert.equal(normalizeUIScale(.4),.85);assert.equal(normalizeUIScale(9),1.4);
  ui.setSettings({uiScale:1.234});assert.equal(ui.settings.uiScale,1.23);
  assert.equal(ui.root.styles['--fg-ui-scale'],'1.23');
  assert.equal(ui.refs.uiScaleOutput.textContent,'123%');assert.equal(ui.refs.titleUIScaleOutput.textContent,'123%');
  assert.equal((ui.markup().match(/data-setting="uiScale"/g)||[]).length,2);
});

test('explicit exploration guidance overrides an old campaign identifier with the current environmental clue',()=>{
  assert.deepEqual(describeObjective({id:'build-shelter',title:'Ακολούθησε τη ροή',description:'Κοίτα κάτω από τις ρίζες.'}),{title:'Ακολούθησε τη ροή',hint:'Κοίτα κάτω από τις ρίζες.'});
});

test('natural presentation preserves reeds as plants, uses croaks, and removes old fortress accessibility copy',t=>{
  const {ui}=fixture(t),croak=node(),caption=node(),foodHelp=node(),interactHelp=node(),legend=node();
  croak.querySelector=selector=>selector==='.fg-action-caption'?caption:null;
  ui.root.querySelector=selector=>selector==='[data-action="intimidate"]'?croak:selector==='.fg-minimap-legend'?legend:null;
  ui.root.querySelectorAll=selector=>selector==='[data-guide-open="food"]'?[foodHelp]:selector==='[data-guide-open="interact"]'?[interactHelp]:[];
  ui.updateCreekPresentation(ui.state);
  assert.equal(croak.attributes['aria-label'],'Κόασμα · R');assert.match(caption.innerHTML,/Κόασμα/);
  assert.equal(creekGuideCard('intimidate').title,'Κόασμα');
  assert.ok(!creekGuideCard('abilities').keys.includes('Ctrl'),'the primary dive control must not conflict with browser tab shortcuts');
  assert.match(creekGuideCard('block').steps.join(' '),/Στη στεριά.*δεξί κλικ/);
  assert.match(creekGuideCard('block').steps.join(' '),/Στο νερό.*δεξί κλικ/);
  assert.doesNotMatch([ui.refs.minimap.attributes['aria-label'],interactHelp.attributes['aria-label'],foodHelp.attributes['aria-label']].join(' '),/οχυρ|συντήρηση/i);
  assert.match(legend.innerHTML,/Συνύπαρξη/);
  assert.equal(ui.presentationText('Κρύψου στα καλάμια.'),'Κρύψου στα καλάμια.');
  const portrait=decodeURIComponent(ui.portrait({id:'caller-natural',role:'caller'}));
  assert.doesNotMatch(portrait,/M70 29 78 14/,'natural fallback portraits do not wear a crown');
});

test('natural recruitment keeps food beside its action without a human negotiation contract',t=>{
  const {ui}=fixture(t);ui.state.recruitment={targetId:'natural-7',name:'Νούφαρο',cost:{food:8},canRecruit:true,requirements:[{id:'food',current:18,target:8,done:true}]};
  const markup=ui.recruitmentMarkup();
  assert.match(markup,/×8/);assert.match(markup,/data-action="recruit-target" data-id="natural-7"/);
  assert.doesNotMatch(markup,/ΣΥΜΦΩΝΙΑ|κύρος|συζήτ|οχυρ/i);
});

test('map keeps coexistence and respect groups separate from enemies and controllable companions',t=>{
  const {ui}=fixture(t),fills=[];let arcs=[];
  ui.state.creek.discoveries=[];ui.state.creek.dropped=[];
  ui.state.camps=[{id:'pact',team:'enemy1',natural:true,creekRelation:'coexist',x:10,z:10},{id:'respect',team:'enemy2',natural:true,creekRelation:'respect',x:15,z:20},{id:'rival',team:'enemy3',natural:true,x:30,z:30}];
  const context={clearRect(){},fillRect(){},beginPath(){arcs=[];},moveTo(){},lineTo(){},stroke(){},fill(){fills.push({color:this.fillStyle,arcs:[...arcs]});},arc(x,y,r){arcs.push({x,y,r});},ellipse(){},save(){},restore(){},translate(){},rotate(){},closePath(){},fillText(){},drawImage(){}};
  const world={player:{x:0,z:0},camps:ui.state.camps,enemies:[{home:'pact',x:11,z:11},{home:'respect',x:16,z:21},{home:'rival',x:31,z:31}],allies:[{x:1,z:1}]};
  GameUI.prototype.drawMap.call(ui,{width:440,height:440,getContext:()=>context},world);
  assert.equal(fills.find(fill=>fill.color==='#79c4be')?.arcs.length,2);
  assert.equal(fills.find(fill=>fill.color==='#df936f')?.arcs.length,1);
  assert.equal(fills.find(fill=>fill.color==='#94ca8c')?.arcs.length,1);
  assert.equal(world.enemies.length,3,'presentation never changes group allegiance');
  ui.showPanel('map');assert.match(ui.refs.panel.innerHTML,/Ομάδες σε συνύπαρξη/);assert.doesNotMatch(ui.refs.panel.innerHTML,/Ελεύθερες θέσεις|οχυρ|κάστρ/i);
});
