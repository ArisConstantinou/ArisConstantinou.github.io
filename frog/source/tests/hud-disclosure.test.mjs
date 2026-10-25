import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text+'\n//# sourceURL=frog-hud-headless.mjs').toString('base64'));

function node(){
  const classes=new Set(),attributes={};
  return {
    hidden:false,innerHTML:'',textContent:'',attributes,focused:false,dataset:{},
    classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name),add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name)},
    style:{setProperty(){}},parentElement:{classList:{toggle(){}}},
    setAttribute(name,value){attributes[name]=value;},focus(){this.focused=true;},
    querySelector(){return node();},querySelectorAll(){return [];}
  };
}
function fixture(){
  const ui=Object.create(GameUI.prototype),events=[];
  Object.assign(ui,{state:{},portraits:{},portraitCache:new Map(),toastKeys:new Map(),hudDisclosure:null,panel:null,menu:null,rosterFilter:'all',lastDraw:0,lastPanel:0,callbacks:{onAction:(action,data)=>events.push({action,data})},root:node(),drawMap(){}});
  const html=ui.markup();ui.refs=Object.fromEntries([...html.matchAll(/data-ref="([^"]+)"/g)].map(m=>[m[1],node()]));
  ui.refs.objectiveDetails.hidden=true;ui.refs.actionDrawer.hidden=true;
  return {ui,events,html};
}
function keyEvent(code,target){
  return {code,target,prevented:false,stopped:false,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};
}
const state=resources=>({
  resources,player:{hp:100,maxHp:100,stamina:80,maxStamina:100,stomach:70,maxStomach:100,level:1,tier:1},
  allies:[],camps:[],viewMode:'third',context:{type:'none'},
  objectiveVisual:{current:0,total:5,progress:0,targets:Array.from({length:5},(_,id)=>({id,team:'enemy'+id,done:false}))},
  campaign:{phase:'settlement',objectives:[{id:'food',icon:'fly',current:30,target:30,done:true},{id:'reeds',icon:'reeds',current:7.8,target:45,done:false,label:'Υλικά κατασκευής'}]}
});

test('default HUD exposes eight essentials including illustrated U guidance and keeps detailed goals/actions hidden but reachable',()=>{
  const {html}=fixture();
  const primary=html.slice(html.indexOf('fg-primary-actions'),html.indexOf('<section class="fg-action-drawer"'));
  assert.equal([...primary.matchAll(/data-action="/g)].length,8);
  for(const action of ['primary-attack','special-attack','intimidate','dodge','interact','open-build','hud-more','concept-toggle'])assert.ok(primary.includes('data-action="'+action+'"'));
  const concepts=[...primary.matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/g)].map(match=>match[0]).find(button=>button.includes('data-action="concept-toggle"'));
  assert.ok(concepts,'U guidance belongs to the same bottom action bar');
  assert.match(concepts,/class="[^"]*\bfg-action-tile\b/);
  assert.match(concepts,/<kbd>U<\/kbd>/);
  assert.match(concepts,/<img\b[^>]*src="\.\/guide\/movement\.webp"/);
  assert.match(concepts,/aria-expanded="false"/);
  assert.equal([...html.matchAll(/data-action="concept-toggle"/g)].length,1);
  assert.doesNotMatch(html,/class="[^"]*\bfg-concept-toggle\b/);
  assert.match(html,/data-ref="objectiveToggle" aria-expanded="false" aria-controls="fg-objective-details"/);
  assert.match(html,/data-ref="moreToggle" aria-controls="fg-action-drawer" aria-expanded="false"/);
  assert.match(html,/data-ref="objectiveDetails" id="fg-objective-details" hidden/);
  assert.match(html,/data-ref="actionDrawer" id="fg-action-drawer"[^>]* hidden/);
  for(const action of ['intimidate','gang-toggle','gang-forage','cycle-view','open-map','open-roster','open-pause','special-select'])assert.ok(html.includes('data-action="'+action+'"'));
  assert.ok(primary.includes('<kbd>B</kbd>'));
  assert.match(primary,/data-action="intimidate" data-cooldown="roar"[\s\S]*?<kbd>R<\/kbd>/);
  const drawer=html.slice(html.indexOf('<section class="fg-action-drawer"'),html.indexOf('<section class="fg-placement-hud'));
  assert.doesNotMatch(drawer,/data-action="intimidate"/);
  assert.ok(!html.includes('fg-dock-orders'));
});

test('one HUD disclosure opens at a time and unlock notification fires only on an actual change',()=>{
  const {ui,events}=fixture();
  ui.setHudDisclosure(null);assert.equal(events.length,0);
  ui.toggleHudDisclosure('actions');
  assert.equal(ui.refs.actionDrawer.hidden,false);assert.equal(ui.refs.objectiveDetails.hidden,true);
  assert.equal(ui.refs.moreToggle.attributes['aria-expanded'],'true');
  ui.setHudDisclosure('actions');assert.equal(events.length,1);
  ui.toggleHudDisclosure('objectives');
  assert.equal(ui.refs.actionDrawer.hidden,true);assert.equal(ui.refs.objectiveDetails.hidden,false);
  assert.equal(ui.refs.moreToggle.attributes['aria-expanded'],'false');
  assert.equal(ui.refs.objectiveToggle.attributes['aria-expanded'],'true');
  ui.toggleHudDisclosure('objectives');
  assert.equal(ui.refs.actionDrawer.hidden,true);assert.equal(ui.refs.objectiveDetails.hidden,true);
  assert.deepEqual(events,[
    {action:'hud-disclosure',data:{name:'actions',open:true}},
    {action:'hud-disclosure',data:{name:'objectives',open:true}},
    {action:'hud-disclosure',data:{name:null,open:false}}
  ]);
});

test('Space and Enter activate disclosure; Escape returns focus without blocking later movement',()=>{
  const {ui}=fixture();
  const button={dataset:{action:'hud-more'},disabled:false,closest(selector){return selector==='button'||selector==='[data-action]'?this:null;},matches(){return false;},click(){ui.click({target:this,stopPropagation(){}});}};
  const space=keyEvent('Space',button);ui.hudKeydown(space);
  assert.equal(space.prevented,true);assert.equal(space.stopped,true);assert.equal(ui.hudDisclosure,'actions');
  const escape=keyEvent('Escape',button);ui.hudKeydown(escape);
  assert.equal(escape.stopped,true);assert.equal(ui.hudDisclosure,null);assert.equal(ui.refs.moreToggle.focused,true);
  const enter=keyEvent('Enter',button);ui.hudKeydown(enter);assert.equal(ui.hudDisclosure,'actions');
  const movement=keyEvent('KeyW',button);ui.hudKeydown(movement);assert.equal(movement.stopped,false);
});

test('compact summary follows the unfinished campaign goal, preserves exact floor resources and yields to hunt/placement',()=>{
  const {ui}=fixture();
  for(const value of [0,57,999,1000000.9]){
    ui.update(state({food:value,reeds:value}));
    assert.equal(ui.refs.food.textContent,String(Math.floor(value)));
    assert.equal(ui.refs.reeds.textContent,String(Math.floor(value)));
    assert.equal(ui.refs.objectiveSummary.textContent,'7 / 45');
    assert.equal(ui.refs.objectiveProgress.textContent,'0 / 5');
    assert.equal(ui.refs.objectiveTitle.textContent,'Μάζεψε υλικά κατασκευής');
    assert.equal(ui.refs.objectiveMeter.style.transform,`scaleX(${7.8/45})`);
  }
  ui.update({...state({food:574,reeds:73}),campaign:{phase:'settlement',progress:.875,objectives:[{id:'gather-food',icon:'fly',current:611,target:30,done:true},{id:'recruit-allies',icon:'group',current:15,target:6,done:true},{id:'build-training',icon:'training',current:0,target:1,progress:0,done:false}]}});
  assert.equal(ui.refs.objectiveTitle.textContent,'Χτίσε χώρο εκπαίδευσης');
  assert.equal(ui.refs.objectiveSummary.textContent,'0 / 1');
  assert.equal(ui.refs.objectiveMeter.style.transform,'scaleX(0)');
  assert.match(ui.refs.objectiveHint.textContent,/V → Χώρος εκπαίδευσης/);
  assert.ok(ui.refs.campaignObjectives.innerHTML.includes('<b>30<small>/ 30</small>'));
  assert.ok(ui.refs.campaignObjectives.innerHTML.includes('<b>6<small>/ 6</small>'));
  assert.equal(ui.refs.food.textContent,'574');
  ui.toggleHudDisclosure('objectives');
  ui.update({...state({food:57,reeds:40}),predator:{type:'heron',hp:340,maxHp:580,phase:'windup',phaseProgress:.4}});
  assert.equal(ui.hudDisclosure,null);assert.equal(ui.refs.objectiveDetails.hidden,true);
  assert.equal(ui.refs.objectiveBox.hidden,true);assert.equal(ui.refs.hunt.hidden,false);
  ui.toggleHudDisclosure('actions');
  ui.update({...state({food:57,reeds:40}),buildPlacement:{active:true,type:'store',valid:true,yaw:0,cost:{food:10,reeds:20}}});
  assert.equal(ui.hudDisclosure,null);assert.equal(ui.refs.actionDrawer.hidden,true);
  assert.equal(ui.refs.buildPlacement.hidden,false);
});

test('construction shelf arrows scroll one card, expose boundary state and never purchase',()=>{
  const {ui,events}=fixture();
  const previous={},next={},catalog={scrollLeft:0,clientWidth:680,scrollWidth:1640,querySelector(){return {getBoundingClientRect:()=>({width:220})};},scrollBy({left}){this.scrollLeft=Math.max(0,Math.min(this.scrollWidth-this.clientWidth,this.scrollLeft+left));}};
  ui.panel='build';ui.refs.panel.querySelector=selector=>selector==='.fg-illustrated-build'?catalog:selector.includes('"-1"')?previous:next;
  ui.syncBuildCatalog();assert.equal(previous.disabled,true);assert.equal(next.disabled,false);
  const arrow={disabled:false,dataset:{action:'build-scroll',direction:'1'},closest(){return this;}};
  ui.click({target:arrow,stopPropagation(){}});
  assert.equal(catalog.scrollLeft,234);assert.equal(events.length,0);
  ui.syncBuildCatalog();assert.equal(previous.disabled,false);assert.equal(next.disabled,false);
  catalog.scrollLeft=960;ui.syncBuildCatalog();assert.equal(next.disabled,true);
  ui.state={resources:{food:87.9,reeds:73.7},currentCamp:{id:'home',name:'Πρώτη βάση',hp:100,maxHp:100,team:'ally',buildings:{}},buildOptions:[{type:'store',name:'Αποθήκη',cost:{food:12,reeds:30},enabled:true}]};
  const html=ui.buildMarkup();
  assert.match(html,/fg-bank-label">Διαθέσιμα/);
  assert.match(html,/fg-cost-label">Κόστος/);
  assert.match(html,/role="region" aria-label="Κατάλογος κτιρίων" tabindex="0"/);
  assert.match(html,/title="Τροφή: 87 \/ 12"/);
  assert.match(html,/<div><b>12<\/b>/);
  assert.match(html,/<div><b>30<\/b>/);
  assert.equal(html.includes('<b>87<small>'),false);
});

test('construction cards explain benefits and refusal reasons while preserving castle controls',()=>{
  const {ui}=fixture();
  const camp={id:'castle',name:'Οχυρό Ιτιάς',team:'ally',hp:400,maxHp:500,gateHp:120,gateMaxHp:240,buildings:{watchtower:true}};
  ui.state={resources:{food:20,reeds:40},currentCamp:camp,camps:[camp],allies:[],recruitmentUnlimited:true,buildOptions:[
    {type:'nursery',name:'Φωλιά',description:'Νέες ενισχύσεις χωρίς όριο πληθυσμού.',cost:{food:22,reeds:28},enabled:false,reason:'Λείπουν 2 τροφή.'},
    {type:'palisade',name:'Οχυρά τείχη',description:'Ενισχύει την περίμετρο και την πύλη.',cost:{food:8,reeds:30},enabled:true},
    {type:'watchtower',name:'Σκοπιά',description:'Χρειάζεται πραγματικούς φρουρούς.',cost:{food:12,reeds:24},built:true,enabled:false}
  ]};
  const html=ui.buildMarkup();
  assert.match(html,/<p class="fg-building-description">Νέες ενισχύσεις χωρίς όριο πληθυσμού\.<\/p>/);
  assert.match(html,/<p class="fg-building-reason">Λείπουν 2 τροφή\.<\/p>/);
  assert.match(html,/<p class="fg-building-description">Ενισχύει την περίμετρο και την πύλη\.<\/p>/);
  assert.match(html,/fg-gate-condition/);assert.match(html,/<b>120 \/ 240<\/b>/);
  assert.match(html,/Όλη η περίμετρος \+ πύλη/);
  assert.match(html,/data-type="palisade" draggable="false"/);
  assert.match(html,/data-action="defense-open" data-type="watchtower"/);
  assert.doesNotMatch(html,/θέσεις στέγασης|slotsUsed|fg-building-slots/);
});


test('the default HUD has a permanent minimap and an explicit uncapped population counter',()=>{
  const {html}=fixture();
  const map=html.match(/<canvas data-ref="minimap"[^>]*>/)?.[0];
  assert.ok(map,'minimap is present in the primary HUD');
  assert.doesNotMatch(map,/hidden/);assert.match(map,/width="440"/);
  assert.match(html,/class="fg-map-button fg-minimap" data-action="open-map"/);
  assert.match(html,/class="fg-population" data-action="open-roster"/);
  assert.match(html,/Πληθυσμός<\/span><b data-ref="populationTotal">/);
  assert.match(html,/Συνοδοί <b data-ref="populationTravelers">/);
  assert.match(html,/Φρουροί <b data-ref="populationGuards">/);
  const population=html.match(/<button class="fg-population"[\s\S]*?<\/button>/)[0];
  assert.doesNotMatch(population.replace(/<[^>]*>/g,''),/\/\s*(?:∞|\d)/);
});

test('population updates on recruitment, death and guard assignment without imposing a ceiling',()=>{
  const {ui}=fixture();
  const allies=Array.from({length:250},(_,i)=>({id:`frog-${i}`,hp:100,maxHp:100,stomach:70,maxStomach:100,order:i<30?'guard':'follow',guard:i<30}));
  ui.update({...state({food:60,reeds:40}),allies,defenses:{guardCount:30}});
  assert.equal(ui.refs.populationTotal.textContent,'251');
  assert.equal(ui.refs.populationTravelers.textContent,'220');assert.equal(ui.refs.populationGuards.textContent,'30');
  assert.match(ui.refs.populationButton.attributes['aria-label'],/Χωρίς όριο πληθυσμού/);
  allies[249].hp=0;allies[248].dead=true;allies.push({id:'newborn',hp:80,maxHp:100,stomach:70,maxStomach:100,guard:false,order:'follow'});
  ui.update({...state({food:60,reeds:40}),allies,defenses:{guardCount:30}});
  assert.equal(ui.refs.populationTotal.textContent,'250');assert.equal(ui.refs.populationTravelers.textContent,'219');
  allies[0].guard=false;allies[0].order='follow';ui.update({...ui.state,defenses:{guardCount:29}});
  assert.equal(ui.refs.populationTotal.textContent,'250');assert.equal(ui.refs.populationGuards.textContent,'29');assert.equal(ui.refs.populationTravelers.textContent,'220');
});

test('boss markers and legend follow spawn/death state and use the actual expanded map radius',()=>{
  const {ui}=fixture(),drawn=[];
  const ctx={clearRect(){drawn.length=0;},fillRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fill(){},arc(){},save(){},restore(){},translate(){},rotate(){},closePath(){},fillText(){},drawImage(image,x,y,width,height){drawn.push({name:image.name,x,y,width,height});}};
  const canvas={width:440,height:440,getContext:()=>ctx};
  ui.mapSymbolImage=name=>({name,complete:true,naturalWidth:24});
  const snake={id:'snake-boss',type:'snake',name:'Άρχοντας των καλαμιών',x:100,z:70,hp:900,boss:true};
  const world={radius:198,player:{x:0,z:0},predators:[snake,{type:'fish',x:4,z:4,hp:900,boss:true,phase:'dormant'},{type:'heron',x:2,z:2,hp:0,boss:true},{type:'fish',x:30,z:30,hp:100,boss:false}]};
  ui.updateMapLegend(world);GameUI.prototype.drawMap.call(ui,canvas,world);
  assert.equal(ui.refs.mapBosses.hidden,false);assert.match(ui.refs.mapBosses.innerHTML,/Νερόφιδο/);assert.doesNotMatch(ui.refs.mapBosses.innerHTML,/Αρπακτικό ψάρι|Ερωδιός/);
  assert.deepEqual(drawn.map(x=>x.name),['snake','crown']);
  const marker=drawn[0],centerX=marker.x+marker.width/2;
  assert.ok(Math.abs(centerX-(220+100*440/(198*2.12)))<.01,'live boss location uses expanded world coordinates');
  snake.hp=0;ui.updateMapLegend(world);GameUI.prototype.drawMap.call(ui,canvas,world);
  assert.equal(ui.refs.mapBosses.hidden,true);assert.equal(drawn.length,0,'dead bosses disappear from both minimap and legend');
  world.stronghold={id:'enemy-main',name:'Το εχθρικό οχυρό',x:100,z:70,population:51,target:75};world.camps=[{...world.stronghold,team:'enemy4',isStronghold:true}];
  ui.updateMapLegend(world);GameUI.prototype.drawMap.call(ui,canvas,world);
  assert.equal(ui.refs.mapStronghold.hidden,false);assert.equal(ui.refs.strongholdPopulation.textContent,'51','stronghold shows real frogs, not its reinforcement target');
  assert.match(ui.refs.mapStronghold.title,/Ενισχύεται προς 75/);assert.deepEqual(drawn.map(x=>x.name),['fort']);
  world.stronghold.population=58;ui.updateMapLegend(world);assert.equal(ui.refs.strongholdPopulation.textContent,'58','stronghold count updates even with unchanged boss legend');
  world.stronghold=null;ui.updateMapLegend(world);assert.equal(ui.refs.mapStronghold.hidden,true);
});

function trackMarkupWrites(element){
  let markup=element.innerHTML,writes=0;
  Object.defineProperty(element,'innerHTML',{get:()=>markup,set:value=>{markup=value;writes++;},configurable:true});
  return ()=>writes;
}

test('large armies update only the two visible dock portraits and preserve image nodes during healing',()=>{
  const {ui}=fixture(),writes=trackMarkupWrites(ui.refs.selectionPortraits),bars=[node(),node()];
  ui.refs.selectionPortraits.querySelectorAll=()=>bars;
  let offscreenPortraitReads=0;
  const allies=Array.from({length:59},(_,i)=>({id:`frog-${i}`,name:`Βάτραχος ${i}`,hp:100,maxHp:100,order:'follow',portrait:`data:image/png;base64,${'A'.repeat(24576)}${i}`}));
  for(const frog of allies.slice(2))Object.defineProperty(frog,'portrait',{get(){offscreenPortraitReads++;return 'unused-large-portrait';}});
  const snapshot={...state({food:100,reeds:100}),allies,selectedIds:[]};
  ui.update(snapshot);
  for(let i=0;i<20;i++){allies[58].hp-=.1;ui.update(snapshot);}
  assert.equal(writes(),1,'off-screen health changes must not rebuild visible image nodes');
  assert.equal(offscreenPortraitReads,0,'the live dock must not read or serialize the rest of the army portraits');
  assert.equal(ui.refs.populationTotal.textContent,'60','all living frogs still contribute to the population');
  allies[0].hp=37;ui.update(snapshot);
  assert.equal(writes(),1,'healing/damage changes the health bar without replacing portrait images');
  assert.equal(bars[0].style.width,'37%');
  allies[0].portrait='data:image/png;base64,updated';ui.update(snapshot);
  assert.equal(writes(),2,'a changed portrait is rendered immediately');
  assert.match(ui.refs.selectionPortraits.innerHTML,/base64,updated/);
  ui.update({...snapshot,selectedIds:['frog-1']});
  assert.equal(writes(),3,'selection remains immediate');
  assert.match(ui.refs.selectionPortraits.innerHTML,/data-id="frog-1"/);
  assert.doesNotMatch(ui.refs.selectionPortraits.innerHTML,/data-id="frog-0"/);
});

test('dock health changes do not bypass the roster refresh interval',()=>{
  const {ui}=fixture();let renders=0;
  ui.panel='roster';ui.lastPanel=Infinity;ui.renderPanel=()=>renders++;
  const snapshot={...state({food:100,reeds:100}),allies:Array.from({length:59},(_,i)=>({id:String(i),hp:100,maxHp:100,portrait:'test.png'}))};
  for(let i=0;i<10;i++){snapshot.allies[0].hp-=1;ui.update(snapshot);}
  assert.equal(renders,0,'portrait updates cannot rebuild a 59-frog roster on each HUD tick');
  ui.lastPanel=-Infinity;ui.update(snapshot);
  assert.equal(renders,1,'the scheduled roster refresh still runs');
  ui.update(snapshot);assert.equal(renders,1);
});

test('unchanged recruitment cost keeps its SVG despite browser markup normalization',()=>{
  const {ui}=fixture();let writes=0;
  Object.defineProperty(ui.refs.interactionCost,'innerHTML',{get:()=>'<svg>browser-normalized icon</svg>',set(){writes++;}});
  const snapshot={...state({food:100,reeds:100}),context:{type:'recruit',cost:{food:12},available:true}};
  for(let i=0;i<20;i++)ui.update(snapshot);
  assert.equal(writes,1);
  ui.update({...snapshot,context:{type:'recruit',cost:{food:13},available:false}});
  assert.equal(writes,2,'changed prices still update immediately');
  ui.update({...snapshot,context:{type:'none'}});
  assert.equal(ui.refs.interactionCost.hidden,true);assert.equal(writes,2);
});

test('the minimap batches army and geography paints while retaining every living marker',()=>{
  const {ui}=fixture(),fills=[];let arcs=[];
  const ctx={clearRect(){},fillRect(){},beginPath(){arcs=[];},moveTo(){},lineTo(){},stroke(){},fill(){fills.push({color:this.fillStyle,arcs:[...arcs]});},arc(x,y,r){arcs.push({x,y,r});},save(){},restore(){},translate(){},rotate(){},closePath(){},fillText(){},drawImage(){}};
  const actors=count=>Array.from({length:count},(_,i)=>({x:i-100,z:i/2-50}));
  const world={radius:198,player:{x:0,z:0},platforms:actors(70).map(p=>({...p,radius:3})),enemies:[...actors(200),{x:0,z:0,dead:true}],allies:actors(59)};
  GameUI.prototype.drawMap.call(ui,{width:440,height:440,getContext:()=>ctx},world);
  for(const [color,count] of [['#42523d',70],['#df936f',200],['#94ca8c',59]]){
    const paints=fills.filter(fill=>fill.color===color);
    assert.equal(paints.length,1,'one paint for each same-color group');
    assert.equal(paints[0].arcs.length,count,'batching never drops living actors or land');
  }
});

test('pause shows the last gameplay FPS including values below twenty without adding HUD clutter',()=>{
  const {ui,html}=fixture(),previousDocument=globalThis.document;
  assert.doesNotMatch(html.slice(0,html.indexOf('class="fg-toasts"')),/data-ref="fpsValue"/);
  assert.match(html.slice(html.indexOf('data-ref="pause"')),/data-ref="fpsValue"/);
  try{
    globalThis.document={exitPointerLock(){}};
    ui.state={fps:14};ui.showPause(true);
    assert.equal(ui.refs.fpsValue.textContent,'14');
    ui.state={};ui.showPause(true);assert.equal(ui.refs.fpsValue.textContent,'—');
  }finally{if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;}
});
