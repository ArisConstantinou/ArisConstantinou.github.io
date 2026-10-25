import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text+'\n//# sourceURL=frog-garrison-ui.mjs').toString('base64'));

function node(){
  const classes=new Set(),queries=new Map();
  return {
    hidden:false,innerHTML:'',textContent:'',attributes:{},dataset:{},children:[],
    classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name),add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name)},
    style:{setProperty(name,value){this[name]=value;}},parentElement:{classList:{toggle(){}}},
    setAttribute(name,value){this.attributes[name]=value;},focus(){},append(child){this.children.push(child);},
    querySelector(selector){if(!queries.has(selector))queries.set(selector,node());return queries.get(selector);},
    querySelectorAll(){return [];}
  };
}
const frog=(id,overrides={})=>({id,name:'Φρουρός '+id,team:'ally',hp:85,maxHp:100,stomach:80,maxStomach:100,role:'hunter',tier:1,level:2,home:'home',order:'guard',guard:true,status:'stationed',...overrides});
function fixture(){
  const ui=Object.create(GameUI.prototype),events=[],root=node(),interaction=node();
  const lookup=root.querySelector.bind(root);
  root.querySelector=selector=>selector==='[data-action="interact"]'||selector==='.fg-action-tile[data-cooldown="interact"]'?interaction:lookup(selector);
  Object.assign(ui,{state:{},portraits:{},portraitCache:new Map(),toastKeys:new Map(),root,panel:null,menu:null,hudDisclosure:null,buildView:'catalog',defenseCampId:null,rosterFilter:'all',lastDraw:0,lastPanel:0,callbacks:{onAction:(action,data)=>events.push({action,data})},drawMap(){}});
  const html=ui.markup();ui.refs=Object.fromEntries([...html.matchAll(/data-ref="([^"]+)"/g)].map(match=>[match[1],node()]));
  ui.renderPanel=()=>{ui.rendered=ui.panel==='build'?ui.buildMarkup():'';};
  const guards=[frog('one'),frog('two',{status:'arriving'}),frog('three',{status:'training',order:'training'})];
  const home={id:'home',name:'Πρώτο καταφύγιο',team:'ally',hp:350,maxHp:350,buildings:{watchtower:true}};
  const outpost={id:'outpost',name:'Νότια Όχθη',team:'ally',hp:350,maxHp:350,buildings:{watchtower:true}};
  ui.state={
    player:{hp:100,maxHp:100,stamina:80,stomach:70,level:1,tier:1},resources:{food:0,reeds:0},
    allies:[...guards,frog('traveler',{guard:false,order:'follow',home:null})],selectedIds:['traveler'],camps:[home,outpost],currentCamp:home,currentCampId:'home',
    defenses:{traveling:1,guardCount:3,camps:[{id:home.id,name:home.name,watchtower:true,slots:4,assigned:3,stationed:1,staffed:true,status:'guarded',range:26,damageReduction:18,guards},{id:outpost.id,name:outpost.name,watchtower:true,slots:4,assigned:0,stationed:0,staffed:false,status:'empty',range:26,damageReduction:18,guards:[]}]},
    context:{type:'none'},campaign:{phase:'settlement',objectives:[]},objectiveVisual:{current:0,total:5,targets:[]},viewMode:'third',
    buildOptions:[{type:'watchtower',name:'Σκοπιά',cost:{food:12,reeds:24},built:true,enabled:false},{type:'store',name:'Αποθήκη',cost:{food:10,reeds:20},built:true,enabled:false}]
  };
  return {ui,events,interaction,home,outpost};
}
function click(ui,action,data={}){
  const target={dataset:{action,...data},disabled:false,closest(){return this;}};
  ui.click({target,stopPropagation(){}});
}

test('an already-built tower opens guard management without spending or starting placement',()=>{
  const {ui,events}=fixture();ui.panel='build';
  const html=ui.buildMarkup(),tower=html.match(/<button class="fg-build-card fg-picture-building is-operational"[\s\S]*?<\/button>/)?.[0];
  assert.ok(tower,'the built tower remains an actionable card');
  assert.match(tower,/data-action="defense-open"/);
  assert.match(tower,/draggable="false"/);
  assert.doesNotMatch(tower,/ disabled/);
  assert.match(tower,/Άνοιγμα φρουράς/);
  click(ui,'defense-open',{camp:'home'});
  assert.equal(ui.buildView,'defense');assert.equal(ui.defenseCampId,'home');
  assert.equal(events.length,0,'opening management never forwards a build transaction');
  assert.deepEqual(ui.state.resources,{food:0,reeds:0});
  assert.match(ui.rendered,/data-command="assign"/);
});

test('camp selection routes explicit guard orders to that camp and leaves construction location unchanged',()=>{
  const {ui,events,home}=fixture();ui.panel='build';ui.buildView='defense';
  const select={value:'outpost'};ui.setting({target:{closest:selector=>selector==='[data-defense-camp]'?select:null}});
  assert.equal(ui.defenseCamp().id,'outpost');assert.equal(ui.state.currentCamp,home);
  click(ui,'garrison-command',{camp:'outpost',command:'assign-selected'});
  assert.deepEqual(events.at(-1),{action:'garrison-command',data:{campId:'outpost',command:'assign-selected'}});
  click(ui,'garrison-command',{camp:'outpost',command:'recall'});
  assert.deepEqual(events.at(-1),{action:'garrison-command',data:{campId:'outpost',command:'recall'}});
  click(ui,'build-view',{view:'catalog'});
  assert.equal(ui.buildView,'catalog');assert.equal(ui.state.currentCampId,'home');
  assert.match(ui.rendered,/data-camp="home"/);
});

test('defense view distinguishes empty towers, arriving and training guards and shows actionable benefits',()=>{
  const {ui}=fixture();ui.buildView='defense';ui.defenseCampId='outpost';
  let html=ui.buildMarkup();
  assert.match(html,/Αφύλακτο/);assert.match(html,/Χωρίς παρόντες φρουρούς η σκοπιά παραμένει ανενεργή/);
  assert.match(html,/26 μ\./);assert.match(html,/−18%/);
  assert.match(html,/data-command="assign" data-camp="outpost"/);
  assert.match(html,/Προτεινόμενη φρουρά · επιτρέπονται επιπλέον σύμμαχοι/);
  assert.match(html,/Κλείσε το V για να ξεκινήσουν οι φρουροί/);
  ui.defenseCampId='home';html=ui.buildMarkup();
  assert.match(html,/1 παρόντες · 2 εκτός θέσης/);
  assert.match(html,/Καθ’ οδόν/);assert.match(html,/Εκπαίδευση/);
  assert.equal((html.match(/data-action="defense-frog"/g)||[]).length,3);
  const roster=ui.rosterMarkup();assert.match(roster,/Συνοδοί/);assert.match(roster,/Φρουροί/);assert.match(roster,/Όλοι μαζί/);
});

test('resource cost and cooldown remain visible on E while a refused action can explain its reason',()=>{
  const {ui,events,interaction}=fixture();ui.state.allies=[];ui.state.defenses={camps:[]};
  ui.update({...ui.state,context:{type:'recruit',cost:{food:4},available:false,reason:'Λείπουν 4 τροφή',actionLabel:'Στρατολόγησε',progress:1}});
  assert.equal(interaction.disabled,false,'insufficient resources can still trigger the refusal explanation');
  assert.equal(ui.refs.interactionCost.hidden,false);assert.match(ui.refs.interactionCost.innerHTML,/<b>4<\/b>/);
  assert.equal(ui.refs.interactionCost.classList.contains('is-short'),true);
  assert.match(interaction.title,/Λείπουν 4 τροφή/);
  click(ui,'interact');assert.deepEqual(events.at(-1),{action:'interact',data:{}});
  ui.update({...ui.state,context:{type:'gather',available:false,cooldown:2,cooldownDuration:4,reason:'Έτοιμο σε 2″'}});
  assert.equal(ui.refs.interactionCost.hidden,true);
  assert.equal(interaction.style['--cooldown'],'50%');
  assert.equal(interaction.querySelector('.fg-cooldown-time').textContent,'2.0');
  ui.update({...ui.state,context:{type:'none'}});assert.equal(interaction.disabled,true);
});

test('collection notices show both resource amounts and short refusal labels without relying on hover',t=>{
  const {ui}=fixture(),originalDocument=globalThis.document,originalTimeout=globalThis.setTimeout;
  globalThis.document={createElement:()=>node()};globalThis.setTimeout=()=>1;
  t.after(()=>{if(originalDocument===undefined)delete globalThis.document;else globalThis.document=originalDocument;globalThis.setTimeout=originalTimeout;});
  ui.toast({icon:'forage',resources:{food:5,reeds:3},label:'Συλλογή',detail:'Συλλογή: +5 τροφή και +3 υλικά',progress:1,tone:'success'});
  const gain=ui.refs.toasts.children[0].innerHTML;
  assert.match(gain,/aria-label="Τροφή \+5"/);assert.match(gain,/aria-label="Υλικά \+3"/);
  assert.match(gain,/fg-notice-label">Συλλογή/);
  ui.toast({icon:'fly',value:4,label:'Λείπουν 4 τροφή',detail:'Χρειάζεσαι 4 τροφή για στρατολόγηση',tone:'warning'});
  assert.match(ui.refs.toasts.children[1].innerHTML,/fg-notice-label">Λείπουν 4 τροφή/);
});

test('fort panels expose gate strength and purchase a whole perimeter instead of dragging one wall',()=>{
  const {ui,events,home}=fixture();
  Object.assign(home,{gateHp:73,gateMaxHp:420});
  ui.state.resources={food:100,reeds:100};
  ui.state.buildOptions=[{type:'palisade',name:'Οχυρά τείχη',cost:{food:8,reeds:30},description:'Ενίσχυση όλης της περιμέτρου και πύλης',enabled:true}];
  const catalog=ui.buildMarkup();
  assert.match(catalog,/<small>Πύλη<\/small><b>73 \/ 420<\/b>/);
  const wall=[...catalog.matchAll(/<button\b[\s\S]*?<\/button>/g)].map(m=>m[0]).find(button=>button.includes('data-type="palisade"'));
  assert.ok(wall);assert.match(wall,/draggable="false"/);assert.match(wall,/Όλη η περίμετρος \+ πύλη/);assert.match(wall,/Ενίσχυσε τείχη/);
  assert.doesNotMatch(wall,/fg-building-drag|Σύρε στον χώρο/);
  const drag={target:{closest:()=>({disabled:false,dataset:{type:'palisade'}})},preventDefault(){this.prevented=true;}};
  ui.beginBuildDrag(drag);assert.equal(drag.prevented,true);assert.equal(events.length,0);
  click(ui,'build',{type:'palisade',camp:'home'});
  assert.deepEqual(events,[{action:'build',data:{type:'palisade',campId:'home'}}]);
  ui.buildView='defense';ui.defenseCampId=home.id;
  assert.match(ui.buildMarkup(),/<small>Πύλη<\/small><b>73 \/ 420<\/b>/);
  home.gateHp=0;assert.match(ui.buildMarkup(),/Παραβιασμένη πύλη<\/small><b>0 \/ 420<\/b>/);
});
