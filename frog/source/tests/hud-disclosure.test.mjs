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

test('default HUD exposes six essentials and keeps detailed goals/actions hidden but reachable',()=>{
  const {html}=fixture();
  const primary=html.slice(html.indexOf('fg-primary-actions'),html.indexOf('<section class="fg-action-drawer"'));
  assert.equal([...primary.matchAll(/data-action="/g)].length,6);
  for(const action of ['primary-attack','special-attack','dodge','interact','open-build','hud-more'])assert.ok(primary.includes('data-action="'+action+'"'));
  assert.match(html,/data-ref="objectiveToggle" aria-expanded="false" aria-controls="fg-objective-details"/);
  assert.match(html,/data-ref="moreToggle" aria-controls="fg-action-drawer" aria-expanded="false"/);
  assert.match(html,/data-ref="objectiveDetails" id="fg-objective-details" hidden/);
  assert.match(html,/data-ref="actionDrawer" id="fg-action-drawer"[^>]* hidden/);
  for(const action of ['intimidate','gang-toggle','gang-forage','cycle-view','open-map','open-roster','open-pause','special-select'])assert.ok(html.includes('data-action="'+action+'"'));
  assert.ok(primary.includes('<kbd>B</kbd>'));
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

