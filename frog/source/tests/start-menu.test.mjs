import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {fixture as gameFixture,installStorage} from './game-fixture.mjs';

const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));

function node(){
  const classes=new Set(),attributes={};
  return {hidden:false,innerHTML:'',textContent:'',value:'',dataset:{},attributes,style:{setProperty(){}},
    classList:{toggle:(name,on)=>on?classes.add(name):classes.delete(name),add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name)},
    setAttribute:(name,value)=>attributes[name]=value,querySelector:()=>null,querySelectorAll:()=>[],
    focus(){globalThis.document.activeElement=this;},closest:()=>null,matches:()=>false};
}
function fixture(t){
  const previous=globalThis.document;globalThis.document={activeElement:null,exitPointerLock(){}};
  t.after(()=>{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;});
  const ui=Object.create(GameUI.prototype),starts=[],changes=[],actions=[];
  Object.assign(ui,{root:node(),state:{},settings:{quality:'high',volume:.65,sensitivity:1},menu:null,panel:null,hudDisclosure:null,conceptPanelsOpen:false,
    callbacks:{onStart:mode=>starts.push(mode),onSettings:value=>changes.push(value),onAction:action=>actions.push(action)},layoutDockedPanels(){}});
  ui.refs=Object.fromEntries([...ui.markup().matchAll(/data-ref="([^"]+)"/g)].map(match=>[match[1],node()]));
  for(const name of ['title','titleSettings','titleRestartConfirm'])ui.refs[name].hidden=true;
  const controls=Array.from({length:2},()=>['quality','volume','sensitivity','uiScale'].map(field=>{
    const control=node();control.dataset.setting=field;control.closest=selector=>selector==='[data-setting]'?control:null;return control;
  })).flat();
  ui.root.querySelectorAll=selector=>selector==='[data-setting]'?controls:[];
  ui.setSettings();
  return {ui,starts,changes,actions,controls};
}
function click(ui,action){
  const target=node();target.dataset.action=action;
  ui.click({target:{closest:selector=>selector==='[data-action]'?target:null},stopPropagation(){}});
}
function keyEvent(code,target=node()){
  return {code,target,prevented:false,stopped:false,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};
}

test('main menu offers one contextual play action and Settings for fresh and saved players',t=>{
  const {ui}=fixture(t);
  for(const saved of [false,true]){
    ui.hideMenus();ui.showTitle(saved);
    assert.equal(ui.refs.title.hidden,false);assert.equal(ui.refs.hud.hidden,true);
    assert.equal(ui.refs.newButton.hidden,saved);assert.equal(ui.refs.continueButton.hidden,!saved);
    assert.equal(ui.refs.titleActions.hidden,false);assert.equal(ui.refs.titleSettings.hidden,true);
    assert.equal([ui.refs.newButton,ui.refs.continueButton,ui.refs.titleSettingsButton].filter(button=>!button.hidden).length,2);
    assert.equal(document.activeElement,saved?ui.refs.continueButton:ui.refs.newButton);
  }
  ui.hideMenus();ui.showTitle(false);
  let hidden=false;
  Object.defineProperty(ui.refs.newButton,'hidden',{get:()=>hidden,set(value){hidden=value;if(value&&document.activeElement===this)document.activeElement=null;}});
  ui.showTitle(true);
  assert.equal(document.activeElement,ui.refs.continueButton,'save discovery transfers keyboard focus before the previous button disappears');
});

test('primary action shows a loader while startup resolves and save refresh cannot uncover the menu',t=>{
  const {ui,starts}=fixture(t);ui.showTitle(false);click(ui,'new-game');
  assert.deepEqual(starts,['play']);assert.equal(ui.refs.title.hidden,true);assert.equal(ui.refs.loading.hidden,false);
  ui.showTitle(true);
  assert.equal(ui.refs.title.hidden,true);assert.equal(ui.refs.loading.hidden,false);assert.equal(ui.hasSave,true);
  ui.hideMenus();ui.showTitle(true);click(ui,'continue');assert.deepEqual(starts,['play','continue']);
});

test('startup Settings edits persist and synchronize with the pause controls without starting gameplay',t=>{
  const {ui,starts,controls}=fixture(t),{game,storage}=gameFixture();installStorage(t,storage);
  game.settings={...ui.settings};let applied=0;game.applySettings=()=>applied++;
  ui.callbacks.onSettings=settings=>game.setSettings(settings);
  ui.showTitle(true);click(ui,'title-settings');
  assert.equal(ui.titleSettingsOpen,true);assert.equal(ui.refs.titleActions.hidden,true);assert.equal(ui.refs.titleSettings.hidden,false);
  for(const [field,value] of [['quality','low'],['volume','0'],['sensitivity','175'],['uiScale','130']]){
    const control=controls.find(input=>input.dataset.setting===field);control.value=value;ui.setting({target:control});
  }
  assert.deepEqual(JSON.parse(storage.get('frog-settings')),{quality:'low',volume:0,sensitivity:1.75,uiScale:1.3});assert.equal(applied,4);
  for(const control of controls)assert.equal(String(control.value),{quality:'low',volume:'0',sensitivity:'175',uiScale:'130'}[control.dataset.setting]);
  assert.equal(ui.refs.volumeOutput.textContent,'0%');assert.equal(ui.refs.titleVolumeOutput.textContent,'0%');
  assert.equal(ui.refs.sensitivityOutput.textContent,'1.8×');assert.equal(ui.refs.titleSensitivityOutput.textContent,'1.8×');
  assert.equal(ui.refs.uiScaleOutput.textContent,'130%');assert.equal(ui.refs.titleUIScaleOutput.textContent,'130%');
  click(ui,'title-settings-back');assert.equal(ui.menu,'title');assert.equal(ui.refs.titleActions.hidden,false);assert.equal(ui.refs.titleSettings.hidden,true);
  assert.equal(document.activeElement,ui.refs.titleSettingsButton);assert.deepEqual(starts,[]);
});

test('late save discovery updates Resume while preserving active Settings, values and focus',t=>{
  const {ui,controls}=fixture(t);ui.showTitle(false);ui.showTitleSettings();
  const volume=controls.find(input=>input.dataset.setting==='volume');volume.value='28';ui.setting({target:volume});volume.focus();
  ui.showTitle(true);
  assert.equal(ui.titleSettingsOpen,true);assert.equal(ui.refs.titleSettings.hidden,false);assert.equal(ui.refs.titleActions.hidden,true);
  assert.equal(ui.refs.continueButton.hidden,false);assert.equal(ui.refs.newButton.hidden,true);
  assert.equal(ui.settings.volume,.28);assert.equal(document.activeElement,volume);
});

test('New game inside Settings requires explicit confirmation and cancel/back leave Resume intact',t=>{
  const {ui,starts}=fixture(t);ui.showTitle(true);ui.showTitleSettings();
  click(ui,'title-new-game');assert.deepEqual(starts,[]);
  click(ui,'title-new-confirm');assert.equal(ui.refs.titleRestartConfirm.hidden,false);assert.equal(document.activeElement,ui.refs.titleRestartCancel);
  click(ui,'title-new-cancel');assert.equal(ui.refs.titleRestartConfirm.hidden,true);assert.deepEqual(starts,[]);
  click(ui,'title-new-confirm');ui.closeTitleSettings();ui.showTitleSettings();assert.equal(ui.refs.titleRestartConfirm.hidden,true);
  click(ui,'title-new-confirm');click(ui,'title-new-game');assert.deepEqual(starts,['new']);assert.equal(ui.refs.title.hidden,true);
});

test('Tab retains native menu navigation and Escape returns from Settings without starting or resuming',t=>{
  const {ui,starts,actions}=fixture(t);ui.showTitle(true);
  const tab=keyEvent('Tab');ui.hudKeydown(tab);assert.equal(tab.stopped,true);assert.equal(tab.prevented,false);
  ui.showTitleSettings();const escape=keyEvent('Escape');ui.hudKeydown(escape);
  assert.equal(escape.stopped,true);assert.equal(escape.prevented,true);assert.equal(ui.titleSettingsOpen,false);assert.equal(ui.menu,'title');
  const {game}=gameFixture();game.started=false;game.paused=true;game.ui=ui;ui.showTitleSettings();game.escape();
  assert.equal(ui.titleSettingsOpen,false);assert.equal(game.started,false);assert.equal(game.paused,true);
  assert.deepEqual(starts,[]);assert.deepEqual(actions,[]);
});
