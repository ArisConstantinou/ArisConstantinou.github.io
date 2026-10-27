import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeFireSettings,installFireSettings} from '../src/arcade-fire-settings.js';

class Control extends EventTarget{constructor(){super();this.value='';this.textContent='';}}
function fixture(settings={},{help=true}={}){
 const controls={'touch-fire-mode':new Control(),...(help?{'touch-fire-mode-help':new Control()}:{} )},calls=[];
 const game={settings:{volume:.4,quality:'low',cameraZoom:1.2,cameraFov:63,cameraSensitivity:1.35,...settings},state:{time:45,actors:[{ammo:37}]},running:false,mode:'pause',cameraYaw:.8,cameraPitch:.3,actions:{fire:true,kick:true,sabotage:true},cameraDrag:{id:2,type:'touch'},pointers:new Map([['move',1],['aim',2]]),autoFireTargetId:'rival-1',$:id=>controls[id]};
 game.clearInputs=()=>{calls.push('clear');game.actions={fire:false,kick:false,sabotage:false};game.cameraDrag=null;game.pointers.clear();game.autoFireTargetId=null;};
 game.updateHUD=()=>calls.push(['hud',game.settings.touchFireMode,game.actions.fire,game.cameraDrag]);
 game.touchLayout={refresh:()=>calls.push('layout')};
 const choose=value=>{controls['touch-fire-mode'].value=value;controls['touch-fire-mode'].dispatchEvent(new Event('change'));};
 return {game,controls,calls,choose};
}

test('fire settings preserve an explicit choice and default missing or corrupt preferences to manual',()=>{
 for(const source of [undefined,null,{}, {volume:.7},{touchFireMode:true},{touchFireMode:'automatic'},{touchFireMode:'AUTO'},{touchFireMode:''}])assert.deepEqual(normalizeFireSettings(source),{touchFireMode:'manual'});
 for(const touchFireMode of ['manual','auto']){
  const source={touchFireMode,volume:.6,cameraAutoRotate:true},before={...source};
  assert.deepEqual(normalizeFireSettings(source),{touchFireMode});assert.deepEqual(source,before);
 }
});

test('binding restores the native select and help without clearing input, saving or advancing play',()=>{
 for(const touchFireMode of [undefined,'manual','auto']){
  const f=fixture(touchFireMode===undefined?{}:{touchFireMode}),saved=[];
  const cleanup=installFireSettings(f.game,{onChange:value=>saved.push(value)});
  assert.equal(f.controls['touch-fire-mode'].value,touchFireMode||'manual');
  assert.equal(f.game.settings.touchFireMode,touchFireMode||'manual');
  assert.match(f.controls['touch-fire-mode-help'].textContent,touchFireMode==='auto'?/αντίπαλο/:/εξάσκηση/);
  assert.deepEqual(f.calls,[]);assert.deepEqual(saved,[]);assert.equal(f.game.state.time,45);assert.equal(f.game.cameraDrag.id,2);cleanup();
 }
});

test('changing either firing mode clears held gestures before refreshing controls and persisting only the preference',()=>{
 for(const initial of ['manual','auto']){
  const f=fixture({touchFireMode:initial}),saved=[];
  const before=JSON.stringify({state:f.game.state,running:f.game.running,mode:f.game.mode,yaw:f.game.cameraYaw,pitch:f.game.cameraPitch});
  const cleanup=installFireSettings(f.game,{onChange:value=>{f.calls.push('save');saved.push(value);}}),next=initial==='manual'?'auto':'manual';
  f.choose(next);
  assert.deepEqual(f.game.actions,{fire:false,kick:false,sabotage:false});assert.equal(f.game.cameraDrag,null);assert.equal(f.game.pointers.size,0);assert.equal(f.game.autoFireTargetId,null);
  assert.deepEqual(f.calls,['clear',['hud',next,false,null],'layout','save']);
  assert.deepEqual(saved,[{touchFireMode:next}]);assert.equal(f.controls['touch-fire-mode'].value,next);
  assert.deepEqual(f.game.settings,{volume:.4,quality:'low',cameraZoom:1.2,cameraFov:63,cameraSensitivity:1.35,touchFireMode:next});
  assert.equal(JSON.stringify({state:f.game.state,running:f.game.running,mode:f.game.mode,yaw:f.game.cameraYaw,pitch:f.game.cameraPitch}),before);
  assert.equal(normalizeFireSettings(JSON.parse(JSON.stringify(f.game.settings))).touchFireMode,next,'a stored choice survives serialization and reload');cleanup();
 }
});

test('reselecting the current mode does not cancel a gesture or duplicate persistence',()=>{
 const f=fixture({touchFireMode:'auto'}),saved=[];const cleanup=installFireSettings(f.game,{onChange:value=>saved.push(value)});
 f.choose('auto');assert.deepEqual(f.calls,[]);assert.deepEqual(saved,[]);assert.equal(f.game.cameraDrag.id,2);cleanup();
});

test('invalid native values safely restore manual without requiring optional help or layout',()=>{
 const f=fixture({touchFireMode:'auto'},{help:false}),saved=[];delete f.game.touchLayout;
 const cleanup=installFireSettings(f.game,{onChange:value=>saved.push(value)});f.choose('broken');
 assert.equal(f.game.settings.touchFireMode,'manual');assert.equal(f.controls['touch-fire-mode'].value,'manual');
 assert.equal(f.game.cameraDrag,null);assert.deepEqual(saved,[{touchFireMode:'manual'}]);cleanup();
});

test('disposing the binding removes only its listener and leaves native select events usable',()=>{
 const f=fixture(),saved=[];let nativeChanges=0;f.controls['touch-fire-mode'].addEventListener('change',()=>nativeChanges++);
 const cleanup=installFireSettings(f.game,{onChange:value=>saved.push(value)});cleanup();f.choose('auto');
 assert.equal(nativeChanges,1);assert.equal(f.controls['touch-fire-mode'].value,'auto');assert.equal(f.game.settings.touchFireMode,'manual');assert.deepEqual(f.calls,[]);assert.deepEqual(saved,[]);
});
