import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {fixture,camp} from './game-fixture.mjs';
import {BUILDINGS} from '../src/rules.js';

// Exercise real UI event methods against the real game action/transaction path.
// Only DOM nodes, animation scheduling and the world raycast boundary are stubbed.
const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));

function classList(){
  const values=new Set();
  return {values,add:name=>values.add(name),remove:name=>values.delete(name),toggle:(name,on)=>on?values.add(name):values.delete(name)};
}
function node(){return {classList:classList(),textContent:'',innerHTML:'',hidden:false,parentElement:{classList:classList()}};}
function setup(t){
  const {game}=fixture(),home=camp({id:'home',team:'ally',x:0,z:0,originalEnemy:false,buildingPlacements:{}});
  game.camps=[home];
  const ui=Object.create(GameUI.prototype),actions=[];
  Object.assign(ui,{state:{},panel:'build',menu:null,portraits:{},portraitCache:new Map(),rosterFilter:'all',root:{classList:classList()},refs:{panel:{innerHTML:'original draggable card'},panelLayer:{hidden:false}},toast:()=>{}});
  for(const name of ['buildPlacement','placementArt','placementStatus','placementConfirm','placementAngle','placementFood','placementMaterials'])ui.refs[name]=node();
  ui.callbacks={onAction:(action,data)=>{actions.push({action,data});return game.onAction(action,data);}};
  game.ui=ui;
  game.updateUI=()=>{ui.state={resources:game.resources,currentCamp:home,camps:[home],buildPlacement:game.buildPlacement,buildOptions:game.buildOptions(),placement:{valid:true}};};
  game.updateUI();
  let scheduled;
  const beforeRAF=globalThis.requestAnimationFrame,beforeCancel=globalThis.cancelAnimationFrame;
  globalThis.requestAnimationFrame=callback=>(scheduled=callback,1);
  globalThis.cancelAnimationFrame=()=>{};
  t.after(()=>{if(beforeRAF===undefined)delete globalThis.requestAnimationFrame;else globalThis.requestAnimationFrame=beforeRAF;if(beforeCancel===undefined)delete globalThis.cancelAnimationFrame;else globalThis.cancelAnimationFrame=beforeCancel;});
  return {game,home,ui,actions,runFrame:()=>scheduled?.()};
}
function click(ui,action,data={}){
  const target={disabled:false,dataset:{action,...data},blur(){}};
  ui.click({target:{closest:()=>target},stopPropagation(){}});
}
function startDrag(ui,type='store'){
  const transfer={setData(){},setDragImage(){}};
  const card={disabled:false,dataset:{type},querySelector:()=>({clientWidth:220,clientHeight:116})};
  const event={target:{closest:()=>card},dataTransfer:transfer,preventDefault(){this.prevented=true;}};
  ui.beginBuildDrag(event);
  return {event,transfer};
}
function safePoint(game){
  // Represents the raycast returning a point inside the empty right courtyard.
  Object.assign(game.buildPlacement,{x:6,z:0,yaw:0,hasPoint:true});
  game.updateBuildingPlacement();
}
function afterCost(before,type){
  return {food:before.food-BUILDINGS[type].cost.food,reeds:before.reeds-BUILDINGS[type].cost.reeds};
}

test('clicking a building stages it without spending; confirming commits once',t=>{
  const {game,home,ui,actions}=setup(t),before={...game.resources};
  click(ui,'build',{type:'store',camp:'home'});
  assert.deepEqual(actions[0],{action:'build',data:{type:'store',campId:'home'}});
  assert.equal(game.buildPlacement.type,'store');
  assert.deepEqual(game.resources,before);
  assert.equal(home.buildings.store,undefined);
  assert.equal(ui.panel,null);
  safePoint(game);click(ui,'confirm-placement');
  assert.equal(home.buildings.store,true);
  assert.deepEqual(home.buildingPlacements.store,{x:6,z:0,yaw:0});
  assert.deepEqual(game.resources,afterCost(before,'store'));
  assert.equal(game.buildPlacement,null);
  click(ui,'confirm-placement');
  assert.deepEqual(game.resources,afterCost(before,'store'));
});

test('native drag keeps its source DOM alive and drop purchases exactly once',t=>{
  const {game,home,ui,actions,runFrame}=setup(t),before={...game.resources};
  const {transfer}=startDrag(ui);
  runFrame();
  assert.deepEqual(actions[0],{action:'begin-placement',data:{type:'store',dragging:true}});
  assert.equal(ui.panel,'build');
  assert.equal(ui.refs.panelLayer.hidden,false);
  assert.ok(ui.root.classList.values.has('fg-build-dragging'));
  game.updateUI();ui.renderPanel(true);
  assert.equal(ui.refs.panel.innerHTML,'original draggable card');
  assert.deepEqual(game.resources,before);
  safePoint(game);
  ui.moveBuildDrag({clientX:580,clientY:350,dataTransfer:transfer,preventDefault(){}});
  assert.equal(transfer.dropEffect,'copy');
  const drop={clientX:580,clientY:350,preventDefault(){},stopPropagation(){}};
  ui.dropBuildDrag(drop);ui.finishBuildDrag();ui.dropBuildDrag(drop);
  assert.equal(actions.filter(a=>a.action==='drop-placement').length,1);
  assert.equal(actions.filter(a=>a.action==='end-placement-drag').length,0);
  assert.equal(ui.draggingBuild,false);
  assert.equal(ui.panel,null);
  assert.equal(ui.refs.panelLayer.hidden,true);
  assert.equal(home.buildings.store,true);
  assert.deepEqual(game.resources,afterCost(before,'store'));
});

test('native drag cancellation spends nothing; an invalid world drop retains click placement',t=>{
  const {game,home,ui,actions,runFrame}=setup(t),before={...game.resources};
  startDrag(ui);ui.finishBuildDrag();
  assert.equal(game.buildPlacement,null);
  assert.equal(ui.panel,null);
  assert.equal(actions.at(-1).action,'cancel-placement');
  assert.deepEqual(game.resources,before);
  startDrag(ui);
  Object.assign(game.buildPlacement,{x:0,z:0,yaw:0,hasPoint:true});
  ui.dropBuildDrag({clientX:580,clientY:350,preventDefault(){},stopPropagation(){}});
  ui.finishBuildDrag();
  assert.equal(game.buildPlacement.active,true);
  assert.equal(game.buildPlacement.valid,false);
  assert.equal(game.buildPlacement.dragging,false);
  assert.equal(actions.filter(a=>a.action==='cancel-placement').length,1);
  assert.deepEqual(game.resources,before);
  click(ui,'cancel-placement');
  assert.equal(game.buildPlacement,null);
  assert.equal(home.buildings.store,undefined);
  assert.deepEqual(game.resources,before);
  startDrag(ui);runFrame();game.escape();
  const actionCount=actions.length;ui.updatePlacement(null);
  assert.equal(ui.draggingBuild,false,'global cancellation cleans up even if native dragend never bubbles');
  assert.equal(ui.root.classList.values.has('fg-build-dragging'),false);
  assert.equal(ui.refs.panelLayer.hidden,true);
  ui.finishBuildDrag();
  assert.equal(actions.length,actionCount,'a delivered Escape is not canceled twice by native dragend');
  assert.equal(game.buildPlacement,null);
});

test('a stale rejected drag never hides the panel or detaches its source',t=>{
  const {game,home,ui,actions}=setup(t),before={...game.resources};
  home.buildings.store=true;
  const {event}=startDrag(ui);
  assert.equal(actions.length,1);
  assert.equal(event.prevented,true);
  assert.equal(ui.draggingBuild,false);
  assert.equal(ui.panel,'build');
  assert.equal(ui.refs.panel.innerHTML,'original draggable card');
  assert.equal(ui.root.classList.values.has('fg-build-dragging'),false);
  assert.deepEqual(game.resources,before);
});

test('placement HUD uses hit-test class, validity, paid costs and exact rotate/cancel actions',t=>{
  const {game,ui,actions}=setup(t);
  click(ui,'build',{type:'store'});
  safePoint(game);
  const markup=ui.markup();
  assert.match(markup,/class="fg-placement-hud fg-placement-tools"/);
  assert.match(markup,/data-action="rotate-placement" data-direction="-1"/);
  assert.match(markup,/data-action="rotate-placement" data-direction="1"/);
  assert.match(markup,/data-action="confirm-placement"/);
  assert.match(markup,/data-action="cancel-placement"/);
  ui.updatePlacement(game.buildPlacement);
  assert.equal(ui.refs.placementConfirm.disabled,false);
  assert.equal(ui.refs.buildPlacement.classList.values.has('is-invalid'),false);
  assert.equal(ui.isBlocking(),false);
  ui.menu='pause';assert.equal(ui.isBlocking(),true);ui.menu=null;
  click(ui,'rotate-placement',{direction:'-1'});
  assert.deepEqual(actions.at(-1),{action:'rotate-placement',data:{direction:-1}});
  ui.updatePlacement(game.buildPlacement);
  assert.equal(ui.refs.placementAngle.textContent,'345°');
  game.resources={food:23.9,reeds:9.7};game.updateUI();
  ui.updatePlacement({...game.buildPlacement,valid:false,cost:{food:24,reeds:10}});
  assert.equal(ui.refs.placementFood.textContent,'23 / 24');
  assert.equal(ui.refs.placementMaterials.textContent,'9 / 10');
  assert.equal(ui.refs.placementConfirm.disabled,true);
  assert.ok(ui.refs.buildPlacement.classList.values.has('is-invalid'));
  click(ui,'cancel-placement');
  assert.equal(actions.at(-1).action,'cancel-placement');
  ui.updatePlacement(null);
  assert.equal(ui.refs.buildPlacement.hidden,true);
});

test('only eligible physical cards drag; leader promotion remains an instant action away from camp',t=>{
  const {ui}=setup(t);
  ui.state.buildOptions=[{type:'store',name:'Store',cost:{food:1,reeds:1},enabled:true},{type:'repair',name:'Repair',cost:{food:1,reeds:1},enabled:true},{type:'nursery',name:'Nursery',cost:{food:200,reeds:200},enabled:true}];
  const cards=ui.buildMarkup();
  assert.match(cards,/data-type="store" draggable="true"/);
  assert.match(cards,/data-type="repair" draggable="false"/);
  assert.match(cards,/data-type="nursery" draggable="false"/);
  ui.state.currentCamp=null;ui.state.buildOptions=[{type:'promote-player',name:'Promotion',cost:{food:10},enabled:true}];
  const promotion=ui.buildMarkup();
  assert.match(promotion,/fg-picture-building is-ready/);
  assert.match(promotion,/data-type="promote-player" draggable="false"/);
  assert.doesNotMatch(promotion,/data-type="promote-player"[^>]* disabled/);
  ui.state.allies=[{id:'one',name:'Test frog',hp:100,maxHp:100,stomach:80,maxStomach:100,tier:1,level:2,canPromote:true,promoteCost:{food:12,reeds:18}}];
  ui.state.selectedIds=['one'];
  const roster=ui.rosterMarkup();
  assert.ok(roster.includes('title="Προαγωγή · 12 τροφή + 18 υλικά κατασκευής"'));
  assert.match(roster,/class="fg-promote-picture"[\s\S]*?<b>12<\/b>[\s\S]*?<b>18<\/b>/);
});

