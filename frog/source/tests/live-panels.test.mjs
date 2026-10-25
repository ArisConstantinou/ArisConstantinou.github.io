import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

const bundle=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI,constructionPresentation}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
function node(){const classes=new Set(),attributes={};return {hidden:false,innerHTML:'',textContent:'',dataset:{},scrollTop:0,attributes,style:{setProperty(){}},classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name),add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name)},setAttribute:(name,value)=>attributes[name]=value,contains:()=>false,querySelector:()=>null,querySelectorAll:()=>[]};}
function fixture(t){
  const old=globalThis.document;globalThis.document={activeElement:null,exitPointerLock(){}};
  t.after(()=>{if(old===undefined)delete globalThis.document;else globalThis.document=old;});
  const ui=Object.create(GameUI.prototype),events=[];
  Object.assign(ui,{state:{},menu:null,panel:null,root:node(),portraits:{},portraitCache:new Map(),toastKeys:new Map(),panelExpanded:true,pauseExpanded:true,conceptPanelsOpen:false,constructionExpanded:true,guideCategory:'all',guideQuery:'',guideReturn:null,guideBackToBook:false,buildView:'catalog',rosterFilter:'all',callbacks:{onAction:(action,data)=>events.push({action,data})},drawMap(){}});
  ui.refs=Object.fromEntries([...ui.markup().matchAll(/data-ref="([^"]+)"/g)].map(m=>[m[1],node()]));return {ui,events};
}
const job={id:'build-1',kind:'construction',type:'shelter',label:'Κάστρο',campName:'Πρώτη όχθη',duration:80,progress:20,status:'working',workRate:1.5,workersPresent:3,workersAssigned:2,playerBuilding:true};

test('ETA responds to real work rate, retains work when interrupted and does not invent a countdown for a stalled site',()=>{
  const one=constructionPresentation({...job,workRate:1});assert.equal(one.percent,25);assert.equal(one.stage,1);assert.equal(one.eta,60);assert.equal(one.time,'≈ 1:00');
  const team=constructionPresentation(job);assert.equal(team.eta,40);assert.equal(team.time,'≈ 0:40');
  for(const stopped of [{status:'paused',workRate:0},{status:'blocked',workRate:1.5},{status:'queued',workRate:0}]){
    const d=constructionPresentation({...job,...stopped,reason:'Οι οικοδόμοι απομακρύνθηκαν.'});assert.equal(d.percent,25);assert.equal(d.remaining,60);assert.equal(d.eta,null);assert.equal(d.time,'Σε αναμονή');
  }
  const done=constructionPresentation({...job,progress:80});assert.equal(done.percent,100);assert.equal(done.eta,0);assert.equal(done.time,'Ολοκληρώθηκε');
});

test('every gameplay panel runs live both expanded and collapsed, while explicit pause remains blocking',t=>{
  const {ui}=fixture(t);
  for(const panel of ['build','roster','map','realm','recruitment','guide','help']){
    ui.showPanel(panel);assert.equal(ui.isBlocking(),false,panel);assert.equal(ui.refs.panel.attributes.role,'region');assert.equal(ui.refs.panel.attributes['aria-modal'],'false');
    ui.setPanelExpanded(false);assert.equal(ui.panel,panel);assert.equal(ui.isBlocking(),false);assert.equal(ui.refs.panel.classList.contains('is-collapsed'),true);
    ui.setPanelExpanded(true);assert.equal(ui.refs.panel.classList.contains('is-collapsed'),false);
  }
  ui.showPause(true);assert.equal(ui.isBlocking(),true);assert.equal(ui.refs.pause.hidden,false);
  ui.setPauseExpanded(false);assert.equal(ui.refs.pauseBody.hidden,true);assert.equal(ui.menu,'pause');assert.equal(ui.isBlocking(),true);
  ui.setPauseExpanded(true);assert.equal(ui.refs.pauseBody.hidden,false);assert.equal(ui.refs.pauseToggle.attributes['aria-expanded'],'true');
});

test('U concept drawer remembers discoveries while hidden, then opens the actual last illustration without changing an active panel',t=>{
  const {ui,events}=fixture(t);ui.panel='build';
  ui.showGuideHint('heron');ui.showGuideHint('build');assert.equal(ui.refs.guideHint.hidden,true);assert.equal(events.length,0);
  assert.equal(ui.toggleConceptPanels(),true);assert.equal(ui.refs.guideHint.hidden,false);assert.match(ui.refs.guideHint.innerHTML,/guide\/build.webp/);assert.equal(ui.panel,'build');assert.equal(ui.isBlocking(),false);
  assert.equal(ui.refs.conceptToggle.attributes['aria-expanded'],'true');
  ui.showGuideHint('fish');assert.match(ui.refs.guideHint.innerHTML,/guide\/fish.webp/);assert.equal(ui.refs.guideHint.hidden,false);
  ui.toggleConceptPanels();assert.equal(ui.refs.guideHint.hidden,true);assert.equal(ui.lastGuideHintId,'fish');
  assert.ok(events.every(e=>e.action==='hud-disclosure'));
});

test('construction HUD persists outside management panels and updates percent, ETA, pauses, workers and multiple sites',t=>{
  const {ui}=fixture(t);ui.state={realmEconomy:{jobs:[job]}};ui.updateConstructionHUD();
  assert.equal(ui.panel,null);assert.equal(ui.refs.constructionHUD.hidden,false);assert.match(ui.refs.constructionBody.innerHTML,/25%/);assert.match(ui.refs.constructionBody.innerHTML,/≈ 0:40/);assert.match(ui.refs.constructionBody.innerHTML,/3 οικοδόμοι/);assert.match(ui.refs.constructionBody.innerHTML,/aria-current="step"/);
  ui.state.realmEconomy.jobs[0]={...job,progress:40,workRate:1};ui.updateConstructionHUD();assert.match(ui.refs.constructionBody.innerHTML,/50%/);assert.match(ui.refs.constructionBody.innerHTML,/≈ 0:40/);
  ui.state.paused=true;ui.updateConstructionHUD();assert.match(ui.refs.constructionBody.innerHTML,/Το παιχνίδι είναι σε παύση/);assert.doesNotMatch(ui.refs.constructionBody.innerHTML,/≈/);
  ui.state.paused=false;ui.state.realmEconomy.jobs.push({...job,id:'build-2',label:'Αποθήκη',status:'paused',workRate:0,workersPresent:0,playerBuilding:false});ui.updateConstructionHUD();assert.equal(ui.refs.constructionCount.textContent,'2');assert.match(ui.refs.constructionBody.innerHTML,/Αποθήκη/);
  ui.constructionExpanded=false;ui.updateConstructionHUD();assert.equal(ui.refs.constructionBody.hidden,true);assert.match(ui.refs.constructionBrief.textContent,/50%/);
  ui.state.realmEconomy.jobs=[];ui.updateConstructionHUD();assert.equal(ui.refs.constructionHUD.hidden,true);
});

test('panel keyboard traversal stays in the browser and held Enter does not repeat purchases',t=>{
  const {ui}=fixture(t);let clicks=0;
  const target={closest:selector=>selector==='button'?{click:()=>clicks++}:selector==='.fg-panel'?{}:null,matches:()=>false};
  const event=(code,repeat=false)=>({code,target,repeat,prevented:false,stopped:false,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}});
  const first=event('Enter');ui.hudKeydown(first);ui.hudKeydown(event('Enter',true));assert.equal(clicks,1);assert.equal(first.prevented,true);
  const tab=event('Tab');ui.hudKeydown(tab);assert.equal(tab.stopped,true);assert.equal(tab.prevented,false);
  for(const code of ['KeyU','KeyH','KeyW','KeyA','KeyS','KeyD']){const e=event(code);ui.hudKeydown(e);assert.equal(e.stopped,false,code);}
});

test('a narrow guide temporarily hides U and restores its current preference and collapsed panel without resuming Pause',t=>{
  const beforeWidth=globalThis.innerWidth,beforeHeight=globalThis.innerHeight;globalThis.innerWidth=390;globalThis.innerHeight=844;
  t.after(()=>{if(beforeWidth===undefined)delete globalThis.innerWidth;else globalThis.innerWidth=beforeWidth;if(beforeHeight===undefined)delete globalThis.innerHeight;else globalThis.innerHeight=beforeHeight;});
  const {ui}=fixture(t);
  for(const paused of [false,true]){
    ui.hideMenus();if(paused)ui.showPause(true);else ui.showPanel('build');
    ui.toggleConceptPanels(true);assert.equal(paused?ui.pauseExpanded:ui.panelExpanded,false);
    ui.openGuideLibrary();assert.equal(ui.conceptPanelsOpen,true);assert.equal(ui.refs.guideHint.hidden,true);
    ui.closeGuideCard();assert.equal(ui.conceptPanelsOpen,true);assert.equal(ui.refs.guideHint.hidden,false);assert.equal(paused?ui.pauseExpanded:ui.panelExpanded,false);assert.equal(ui.isBlocking(),paused);
    ui.openGuideLibrary();ui.toggleConceptPanels(false);ui.closeGuideCard();assert.equal(ui.conceptPanelsOpen,false);assert.equal(ui.refs.guideHint.hidden,true);assert.equal(ui.isBlocking(),paused);
  }
});
