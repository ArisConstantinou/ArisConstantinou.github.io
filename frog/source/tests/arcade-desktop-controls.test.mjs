import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

// Exercise the browser module in Node with only its stylesheet removed, using
// the same in-memory bundling pattern as the existing HUD tests.
const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/arcade-desktop-controls.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {installDesktopControls}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));

function events(){
 const listeners=new Map();return {listeners,
  addEventListener(type,handler){if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(handler);},
  removeEventListener(type,handler){listeners.get(type)?.delete(handler);},
  emit(type,details={}){for(const handler of listeners.get(type)||[])handler({type,...details});},
 };
}
function indicator(dataset){
 const classes=new Set();return {dataset,classList:{toggle(name,on){if(on)classes.add(name);else classes.delete(name);},contains:name=>classes.has(name)}};
}
function fixture(){
 const view=events(),doc={...events(),defaultView:view,hidden:false};
 const keys=['KeyW','KeyA','KeyS','KeyD'].map(key=>indicator({key})),mouse=[0,2].map(button=>indicator({button:String(button)}));
 const root={ownerDocument:doc,hidden:true,querySelectorAll:selector=>selector==='[data-key]'?keys:mouse};
 const game={running:true,layoutEditing:false,touch:false,keys:new Set(),actions:{fire:false,kick:false},$:id=>id==='desktop-controls'?root:null};
 const controls=installDesktopControls(game),key=code=>keys.find(node=>node.dataset.key===code).classList.contains('is-active'),button=number=>mouse.find(node=>node.dataset.button===String(number)).classList.contains('is-active');
 return {game,view,doc,root,keys,mouse,controls,key,button};
}

test('WASD indicators follow simultaneous physical keys and arrow aliases without owning input',()=>{
 const f=fixture();assert.equal(f.root.hidden,false);
 f.game.keys.add('KeyW');f.game.keys.add('ArrowRight');f.controls.update();assert.equal(f.key('KeyW'),true);assert.equal(f.key('KeyD'),true);assert.equal(f.key('KeyA'),false);
 f.game.keys.add('ArrowUp');f.game.keys.delete('KeyW');f.controls.update();assert.equal(f.key('KeyW'),true,'releasing W cannot hide a still-held ArrowUp');
 f.game.keys.delete('ArrowUp');f.game.keys.delete('ArrowRight');f.game.keys.add('KeyA');f.game.keys.add('KeyS');f.controls.update();
 assert.equal(f.key('KeyW'),false);assert.equal(f.key('KeyD'),false);assert.equal(f.key('KeyA'),true);assert.equal(f.key('KeyS'),true);assert.deepEqual([...f.game.keys],['KeyA','KeyS']);
});

test('mouse button chords light and release independently without assigning a right-button action',()=>{
 const f=fixture();f.view.emit('mousedown',{button:0,buttons:1});assert.equal(f.button(0),true);assert.equal(f.button(2),false);
 f.view.emit('mousedown',{button:2,buttons:3});assert.equal(f.button(0),true);assert.equal(f.button(2),true);
 f.view.emit('mouseup',{button:0,buttons:2});assert.equal(f.button(0),false);assert.equal(f.button(2),true,'mouseup observes a release even when the other button keeps the pointer active');
 f.view.emit('mouseup',{button:2,buttons:0});assert.equal(f.button(0),false);assert.equal(f.button(2),false);
 f.view.emit('mousedown',{button:2,buttons:2});f.view.emit('mousedown',{button:0,buttons:3});f.view.emit('mouseup',{button:2,buttons:1});assert.equal(f.button(0),true);assert.equal(f.button(2),false);
 assert.deepEqual(f.game.actions,{fire:false,kick:false},'the display never changes gameplay actions');
});

test('prevented pointer defaults cannot hide mouse chords when compatibility mouse events are absent',()=>{
 const f=fixture(),mouse={pointerType:'mouse'};
 f.view.emit('pointerdown',{...mouse,button:0,buttons:1});assert.equal(f.button(0),true);
 f.view.emit('pointermove',{...mouse,button:2,buttons:3});assert.equal(f.button(0),true);assert.equal(f.button(2),true);
 f.view.emit('pointermove',{...mouse,button:0,buttons:2});assert.equal(f.button(0),false);assert.equal(f.button(2),true);
 f.view.emit('pointerup',{...mouse,button:2,buttons:0});assert.equal(f.button(2),false);
 for(const pointerType of ['touch','pen'])f.view.emit('pointerdown',{pointerType,button:0,buttons:1});
 assert.equal(f.button(0),false,'touch contacts cannot light a fictitious held mouse button');
});

test('pause, layout editing and touch mode hide the desktop display and discard held mouse state',()=>{
 for(const blocked of ['paused','layout','touch']){
  const f=fixture();f.game.keys.add('KeyW');f.view.emit('mousedown',{button:0,buttons:1});
  if(blocked==='paused')f.game.running=false;else if(blocked==='layout')f.game.layoutEditing=true;else f.game.touch=true;
  f.controls.update();assert.equal(f.root.hidden,true,blocked);assert.equal(f.key('KeyW'),false);assert.equal(f.button(0),false);
  f.view.emit('mousedown',{button:2,buttons:3});f.game.running=true;f.game.layoutEditing=false;f.game.touch=false;f.game.keys.clear();f.controls.update();
  assert.equal(f.root.hidden,false);assert.equal(f.button(0),false);assert.equal(f.button(2),false,'blocked presses cannot become held buttons after resume');
 }
});

test('blur, pointer cancellation and explicit cleanup clear every indicator immediately',()=>{
 for(const release of [f=>f.view.emit('blur'),f=>f.view.emit('pointercancel'),f=>f.controls.clear()]){
  const f=fixture();f.game.keys.add('KeyA');f.view.emit('mousedown',{button:0,buttons:3});assert.equal(f.key('KeyA'),true);assert.equal(f.button(0),true);assert.equal(f.button(2),true);
  release(f);assert.equal(f.key('KeyA'),false);assert.equal(f.button(0),false);assert.equal(f.button(2),false);
  assert.equal(f.game.keys.has('KeyA'),true,'cleanup of visual state leaves simulation input ownership with the game');
  f.game.keys.clear();f.controls.update();assert.equal(f.button(0),false);assert.equal(f.button(2),false);
 }
});

test('hidden-document cleanup cannot leave held buttons lit when the page returns',()=>{
 const f=fixture();f.view.emit('mousedown',{button:2,buttons:2});f.doc.hidden=true;f.doc.emit('visibilitychange');
 assert.equal(f.root.hidden,true);assert.equal(f.button(2),false);
 f.doc.hidden=false;f.doc.emit('visibilitychange');assert.equal(f.root.hidden,false);assert.equal(f.button(2),false);
});

test('destroy removes persistent listeners and stale callbacks cannot reactivate the display',()=>{
 const f=fixture();f.view.emit('mousedown',{button:0,buttons:1});f.controls.destroy();f.controls.destroy();
 assert.equal(f.root.hidden,true);assert.equal(f.button(0),false);
 for(const bucket of [...f.view.listeners.values(),...f.doc.listeners.values()])assert.equal(bucket.size,0);
 f.view.emit('mousedown',{button:2,buttons:2});f.game.keys.add('KeyW');f.controls.update();assert.equal(f.button(2),false);assert.equal(f.key('KeyW'),false);assert.equal(f.root.hidden,true);
});
