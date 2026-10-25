import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text+'\n//# sourceURL=frog-recruitment-ui.mjs').toString('base64'));

function node({width=260,height=140}={}){
  const classes=new Set(),attributes={};
  return {
    hidden:false,innerHTML:'',textContent:'',dataset:{},attributes,scrollTop:0,
    clientWidth:width,clientHeight:height,offsetWidth:width,offsetHeight:height,
    style:{setProperty(name,value){this[name]=value;},removeProperty(name){delete this[name];}},
    classList:{toggle(name,on){if(on)classes.add(name);else classes.delete(name);},add:(...names)=>names.forEach(name=>classes.add(name)),remove:(...names)=>names.forEach(name=>classes.delete(name)),contains:name=>classes.has(name)},
    setAttribute(name,value){attributes[name]=String(value);},removeAttribute(name){delete attributes[name];},
    getBoundingClientRect:()=>({x:0,y:0,left:0,top:0,right:width,bottom:height,width,height}),
    contains:()=>false,querySelector:()=>null,querySelectorAll:()=>[],focus(){this.focused=true;}
  };
}

function fixture(t){
  const oldDocument=globalThis.document,oldWidth=globalThis.innerWidth,oldHeight=globalThis.innerHeight;
  globalThis.document={activeElement:null,exitPointerLock(){},documentElement:{clientWidth:1280,clientHeight:720}};
  globalThis.innerWidth=1280;globalThis.innerHeight=720;
  t.after(()=>{
    if(oldDocument===undefined)delete globalThis.document;else globalThis.document=oldDocument;
    if(oldWidth===undefined)delete globalThis.innerWidth;else globalThis.innerWidth=oldWidth;
    if(oldHeight===undefined)delete globalThis.innerHeight;else globalThis.innerHeight=oldHeight;
  });
  const ui=Object.create(GameUI.prototype),events=[];
  Object.assign(ui,{
    state:{},panel:null,menu:null,hudDisclosure:null,root:node({width:1280,height:720}),
    portraits:{},portraitCache:new Map(),toastKeys:new Map(),conceptPanelsOpen:false,
    recruitmentBubbleOpen:false,recruitmentTargetId:null,
    callbacks:{onAction:(action,data)=>events.push({action,data}),onResume:()=>events.push({action:'resume'})},
    drawMap(){},layoutDockedPanels(){}
  });
  const html=ui.markup();
  ui.refs=Object.fromEntries([...html.matchAll(/data-ref="([^"]+)"/g)].map(match=>[match[1],node()]));
  ui.refs.recruitmentBubble.hidden=true;
  return {ui,events,html};
}

const offer=(overrides={})=>({
  targetId:'neutral-7',name:'<Σπίθα>',role:'scout',level:2,canRecruit:false,
  cost:{food:12},helpAvailable:true,helpAccepted:false,quest:{kind:'gatheredFood'},reason:'Χρειάζεται λίγη βοήθεια',
  requirements:[
    {id:'food',label:'12 τροφή',done:true,current:20,target:12},
    {id:'help',label:'Μάζεψε 6 μύγες',done:false,current:2,target:6},
    {id:'base',label:'Ασφαλής βάση',done:false},
    {id:'bond',label:'Συμφωνία <σπάνια>',done:false}
  ],...overrides
});
function buttonMarkup(html,action){
  return [...html.matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/g)].map(match=>match[0]).find(button=>button.includes(`data-action="${action}"`));
}
function click(ui,action,data={},disabled=false){
  const target={disabled,dataset:{action,...data},closest:selector=>selector==='[data-action]'?target:null};
  ui.click({target,stopPropagation(){}});
}
function anchor(ui,visible=true){ui.updateRecruitmentAnchor({targetId:ui.recruitmentTargetId,x:640,y:320,width:1280,height:720,visible});}

test('the recruitment bubble is an independent live region and preserves every active management panel',t=>{
  const {ui,html}=fixture(t);
  assert.match(html,/<section\b[^>]*class="[^"]*\bfg-recruitment-bubble\b[^>]*>/);
  const region=html.match(/<section\b[^>]*data-ref="recruitmentBubble"[^>]*>/)?.[0];
  assert.ok(region);assert.match(region,/role="region"/);assert.match(region,/aria-label="Απαιτήσεις στρατολόγησης"/);assert.match(region,/\bhidden\b/);
  for(const panel of [null,'build','map','roster']){
    ui.panel=panel;ui.panelData={campId:'home'};const previousData=ui.panelData;
    const snapshot=offer();ui.state.recruitment=snapshot;ui.showRecruitmentBubble(snapshot);anchor(ui);
    assert.equal(ui.recruitmentBubbleOpen,true);assert.equal(ui.recruitmentTargetId,snapshot.targetId);
    assert.equal(ui.refs.recruitmentBubble.hidden,false);assert.equal(ui.panel,panel);assert.equal(ui.panelData,previousData);
    assert.equal(ui.menu,null);assert.equal(ui.isBlocking(),false);
    ui.closeRecruitmentBubble();
    assert.equal(ui.recruitmentBubbleOpen,false);assert.equal(ui.recruitmentTargetId,null);assert.equal(ui.refs.recruitmentBubble.hidden,true);
    assert.equal(ui.panel,panel);assert.equal(ui.panelData,previousData);
  }
});

test('the local contract escapes its name, explains each requirement and keeps unavailable enlistment disabled',t=>{
  const {ui}=fixture(t);ui.showRecruitmentBubble(offer());
  const html=ui.refs.recruitmentBubble.innerHTML;
  assert.match(html,/&lt;Σπίθα&gt;/);assert.doesNotMatch(html,/<Σπίθα>/);
  assert.match(html,/Τροφή/);assert.match(html,/Μάζεψε τροφή/);assert.match(html,/Ασφαλές κάστρο/);
  assert.match(html,/Συμφωνία &lt;σπάνια&gt;/);assert.doesNotMatch(html,/<σπάνια>/);
  assert.match(html,/20\s*\/\s*12/);assert.match(html,/2\s*\/\s*6/);
  const help=buttonMarkup(html,'recruit-help');assert.ok(help);assert.match(help,/data-id="neutral-7"/);assert.doesNotMatch(help,/\bdisabled\b/);
  assert.equal(buttonMarkup(html,'recruit-target'),undefined,'only the next available action is offered');
  assert.ok(buttonMarkup(html,'recruit-close'));
  ui.renderRecruitmentBubble(offer({helpAccepted:true,helpAvailable:false}));
  const enlist=buttonMarkup(ui.refs.recruitmentBubble.innerHTML,'recruit-target');
  assert.ok(enlist);assert.match(enlist,/data-id="neutral-7"/);assert.match(enlist,/\bdisabled\b/);
});

test('live requirement updates change progress and enlistment readiness without opening a large panel',t=>{
  const {ui}=fixture(t);ui.panel='build';ui.state.recruitment=offer();ui.showRecruitmentBubble(ui.state.recruitment);
  const ready=offer({canRecruit:true,helpAvailable:false,helpAccepted:true,requirements:[
    {id:'food',label:'12 τροφή',done:true,current:20,target:12},
    {id:'help',label:'Μάζεψε 6 μύγες',done:true,current:6,target:6},
    {id:'base',label:'Ασφαλής βάση',done:true}
  ]});
  ui.state.recruitment=ready;ui.renderRecruitmentBubble();
  assert.match(ui.refs.recruitmentBubble.innerHTML,/6\s*\/\s*6/);
  assert.doesNotMatch(buttonMarkup(ui.refs.recruitmentBubble.innerHTML,'recruit-target'),/\bdisabled\b/);
  assert.equal(ui.recruitmentTargetId,ready.targetId);assert.equal(ui.panel,'build');assert.equal(ui.menu,null);
  ui.state.recruitment=offer({helpAccepted:true,helpAvailable:false});ui.renderRecruitmentBubble();
  assert.match(buttonMarkup(ui.refs.recruitmentBubble.innerHTML,'recruit-target'),/\bdisabled\b/);
  assert.equal(ui.panel,'build');
});

test('temporary anchor hiding preserves the conversation while explicit close cannot be undone by stale updates',t=>{
  const {ui}=fixture(t);ui.state.recruitment=offer();ui.showRecruitmentBubble(ui.state.recruitment);anchor(ui);
  anchor(ui,false);
  assert.equal(ui.refs.recruitmentBubble.hidden,true);assert.equal(ui.recruitmentBubbleOpen,true);assert.equal(ui.recruitmentTargetId,'neutral-7');
  anchor(ui,true);assert.equal(ui.refs.recruitmentBubble.hidden,false);
  ui.state.paused=true;ui.renderRecruitmentBubble();anchor(ui,true);
  assert.equal(ui.refs.recruitmentBubble.hidden,true);assert.equal(ui.recruitmentBubbleOpen,true);assert.equal(ui.recruitmentTargetId,'neutral-7');
  assert.match(buttonMarkup(ui.refs.recruitmentBubble.innerHTML,'recruit-help'),/\bdisabled\b/);
  ui.state.paused=false;ui.renderRecruitmentBubble();anchor(ui,true);assert.equal(ui.refs.recruitmentBubble.hidden,false);
  ui.closeRecruitmentBubble();
  ui.updateRecruitmentAnchor({targetId:'neutral-7',x:640,y:320,width:1280,height:720,visible:true});ui.renderRecruitmentBubble();
  assert.equal(ui.refs.recruitmentBubble.hidden,true);assert.equal(ui.recruitmentBubbleOpen,false);assert.equal(ui.recruitmentTargetId,null);
});

test('switching the inspected frog replaces old requirements and action target ids',t=>{
  const {ui}=fixture(t);ui.showRecruitmentBubble(offer());
  ui.showRecruitmentBubble(offer({targetId:'neutral-8',name:'Νεφέλη',helpAvailable:false,requirements:[{id:'food',label:'18 τροφή',done:false,current:4,target:18}]}));
  const html=ui.refs.recruitmentBubble.innerHTML;
  assert.equal(ui.recruitmentTargetId,'neutral-8');assert.match(html,/Νεφέλη/);assert.match(html,/Τροφή/);assert.match(html,/4\s*\/\s*18/);
  assert.doesNotMatch(html,/neutral-7|Σπίθα|Μάζεψε 6 μύγες/);
  assert.match(buttonMarkup(html,'recruit-target'),/data-id="neutral-8"/);
});

test('bubble buttons dispatch explicit target ids and closing never requests a game resume',t=>{
  const {ui,events}=fixture(t);ui.panel='map';ui.showRecruitmentBubble(offer());
  click(ui,'recruit-help',{id:'neutral-7'});assert.deepEqual(events.at(-1),{action:'recruit-help',data:{id:'neutral-7'}});
  click(ui,'recruit-target',{id:'neutral-7'});assert.deepEqual(events.at(-1),{action:'recruit-target',data:{id:'neutral-7'}});
  const count=events.length;click(ui,'recruit-target',{id:'neutral-7'},true);assert.equal(events.length,count);
  click(ui,'recruit-close');assert.equal(events.at(-1)?.action,'recruit-close');
  assert.equal(events.some(event=>event.action==='resume'),false);assert.equal(ui.panel,'map');
});

test('bubble keyboard focus keeps Tab in the browser and passes E, U and movement back to live play',t=>{
  const {ui}=fixture(t);let clicks=0;
  const button={click:()=>clicks++};
  const target={
    closest(selector){if(selector==='button')return button;return selector.split(',').some(part=>part.trim()==='.fg-recruitment-bubble')?ui.refs.recruitmentBubble:null;},
    matches:()=>false
  };
  const event=(code,repeat=false)=>({code,target,repeat,prevented:false,stopped:false,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}});
  const tab=event('Tab');ui.hudKeydown(tab);assert.equal(tab.stopped,true);assert.equal(tab.prevented,false);
  for(const code of ['KeyE','KeyU','KeyW','KeyA','KeyS','KeyD','Escape']){
    const key=event(code);ui.hudKeydown(key);assert.equal(key.stopped,false,code);assert.equal(key.prevented,false,code);
  }
  for(const code of ['Enter','Space']){
    const before=clicks,key=event(code);ui.hudKeydown(key);ui.hudKeydown(event(code,true));
    assert.equal(clicks,before+1,code);assert.equal(key.stopped,true);assert.equal(key.prevented,true);
  }
});

test('live requirement refresh restores a focused action and falls back to close when that action disappears',t=>{
  const {ui}=fixture(t);ui.showRecruitmentBubble(offer());
  const original={dataset:{action:'recruit-help'}},refreshed=node(),close=node();
  globalThis.document.activeElement=original;
  ui.refs.recruitmentBubble.contains=element=>element===original;
  ui.refs.recruitmentBubble.querySelector=selector=>selector==='[data-action="recruit-help"]'?refreshed:selector==='[data-action="recruit-close"]'?close:null;
  ui.renderRecruitmentBubble(offer({requirements:[{id:'help',label:'Μάζεψε 6 μύγες',done:false,current:3,target:6}]}));
  assert.equal(refreshed.focused,true);assert.notEqual(close.focused,true);
  ui.refs.recruitmentBubble.querySelector=selector=>selector==='[data-action="recruit-close"]'?close:null;
  ui.renderRecruitmentBubble(offer({helpAvailable:false,helpAccepted:true,canRecruit:true}));
  assert.equal(close.focused,true);
});
