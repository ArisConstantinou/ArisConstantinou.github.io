import test from 'node:test';
import assert from 'node:assert/strict';
import {GameInput} from '../src/input.js';
import {fixture} from './game-fixture.mjs';

test('objective keyboard disclosure preserves movement, capture and live simulation',()=>{
  const {game:g}=fixture();let cleared=0,unlocked=0;
  g.input.keys=new Set(['KeyW']);g.input.pointerLocked=true;
  g.input.clear=()=>{cleared++;g.input.keys.clear();};g.input.unlock=()=>unlocked++;
  g.ui.toggleHudDisclosure=name=>{g.ui.hudDisclosure=g.ui.hudDisclosure===name?null:name;g.onAction('hud-disclosure',{name:g.ui.hudDisclosure,open:Boolean(g.ui.hudDisclosure)});};
  assert.equal(g.toggleObjectives(),true);assert.equal(g.ui.hudDisclosure,'objectives');
  assert.equal(g.paused,false);assert.equal(cleared,0);assert.equal(unlocked,0);assert.ok(g.input.keys.has('KeyW'));
  assert.equal(g.canLockGameplayPointer(),true);
  g.toggleObjectives();assert.equal(g.ui.hudDisclosure,null);assert.equal(cleared,0);
  g.paused=true;assert.equal(g.toggleObjectives(),false);
});

test('holding Alt releases only the cursor, keeps movement and cannot trigger automatic pause',()=>{
  const {game:g}=fixture();let locks=0,unlocks=0,pauses=0;
  g.input.keys=new Set(['KeyW']);g.input.pressed=new Set(['MouseLeft','KeyW']);
  g.input.pointerLocked=true;g.input.left=true;g.input.right=true;
  g.input.lock=()=>locks++;g.input.unlock=()=>unlocks++;g.pause=()=>pauses++;
  g.handleInputAction('cursor-on');g.handleInputAction('cursor-on');
  assert.equal(g.input.cursorMode,true);assert.equal(unlocks,1);assert.ok(g.input.keys.has('KeyW'));
  assert.equal(g.input.left,false);assert.equal(g.input.right,false);assert.ok(!g.input.pressed.has('MouseLeft'));
  g.ignoreUnlockUntil=0;g.handleInputAction('unlock');assert.equal(pauses,0);
  assert.equal(g.canLockGameplayPointer(),false);
  g.ui.hudDisclosure='objectives';g.handleInputAction('cursor-off');
  assert.equal(g.input.cursorMode,false);assert.equal(locks,1);assert.equal(pauses,0);assert.ok(g.input.keys.has('KeyW'));
});

test('Alt release respects menus, prior free cursor and loss of window focus',()=>{
  for(const panel of ['build','roster']){
    const {game:g}=fixture();let locks=0;g.input.pointerLocked=true;g.input.lock=()=>locks++;
    g.handleInputAction('cursor-on');g.ui.panel=panel;g.handleInputAction('cursor-off');assert.equal(locks,0);
  }
  const {game:g}=fixture();let locks=0,pauses=0;g.input.pointerLocked=false;g.input.lock=()=>locks++;g.pause=()=>{pauses++;g.paused=true;};
  g.handleInputAction('cursor-on');g.handleInputAction('cursor-off');assert.equal(locks,0);
  g.handleInputAction('cursor-on');g.handleInputAction('blur');assert.equal(pauses,1);assert.equal(g.input.cursorMode,false);
  g.handleInputAction('cursor-off');assert.equal(locks,0);
});

test('the frog-local food badge does not prevent gameplay capture',()=>{
  const {game:g}=fixture();g.activeRecruitId='nearby-frog';
  assert.equal(g.canLockGameplayPointer(),true);
  g.ui.hudDisclosure='actions';assert.equal(g.canLockGameplayPointer(),false);
});

test('real Alt events preserve WASD, suppress attacks and restore only after both Alt keys release',t=>{
  const saved=Object.fromEntries(['addEventListener','document','HTMLElement','innerWidth','innerHeight'].map(key=>[key,globalThis[key]]));
  t.after(()=>{for(const [key,value] of Object.entries(saved))if(value===undefined)delete globalThis[key];else globalThis[key]=value;});
  const handlers={},canvasHandlers={},documentHandlers={},actions=[];
  globalThis.addEventListener=(type,fn)=>{handlers[type]=fn;};globalThis.document={addEventListener(type,fn){documentHandlers[type]=fn;}};
  globalThis.HTMLElement=class {};globalThis.innerWidth=1280;globalThis.innerHeight=720;
  const canvas={addEventListener(type,fn){canvasHandlers[type]=fn;}};
  const input=new GameInput(canvas,action=>actions.push(action));
  const event=code=>({code,target:null,repeat:false,preventDefault(){this.prevented=true;}});
  handlers.keydown(event('KeyW'));const alt=event('AltLeft');handlers.keydown(alt);handlers.keydown(event('AltRight'));
  assert.equal(alt.prevented,true);assert.equal(input.down('KeyW'),true);
  handlers.keyup(event('AltLeft'));assert.equal(actions.filter(a=>a==='cursor-off').length,0);
  input.cursorMode=true;canvasHandlers.mousedown({button:0});canvasHandlers.mousedown({button:2});
  assert.equal(input.left,false);assert.equal(input.right,false);assert.equal(input.hit('MouseLeft'),false);
  handlers.keyup(event('AltRight'));assert.equal(actions.at(-1),'cursor-off');assert.equal(input.down('KeyW'),true);
  // Returning to camera capture must not leave a clicked HUD button owning
  // Space/Enter: the next Space belongs to the frog's jump controls.
  let blurred=0;globalThis.document.activeElement={closest:selector=>selector==='#frog-ui',blur(){blurred++;globalThis.document.activeElement=null;}};
  globalThis.document.pointerLockElement=canvas;documentHandlers.pointerlockchange();
  assert.equal(blurred,1);assert.equal(globalThis.document.activeElement,null);
  handlers.keydown(event('Space'));assert.equal(input.hit('Space'),true);
  input.destroy();
});
