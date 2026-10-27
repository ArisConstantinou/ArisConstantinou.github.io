import test from 'node:test';
import assert from 'node:assert/strict';
import {installMenuAction} from '../src/arcade-menu-actions.js';

function fixture(){
 const listeners=new Map(),calls=[],captures=new Set();let time=0;
 const button={disabled:false,
  getBoundingClientRect:()=>({left:10,top:20,right:210,bottom:130}),
  addEventListener(name,fn){listeners.set(name,fn);},
  removeEventListener(name,fn){if(listeners.get(name)===fn)listeners.delete(name);},
  setPointerCapture(id){captures.add(id);},releasePointerCapture(id){captures.delete(id);},
 };
 const cleanup=installMenuAction(button,event=>calls.push(event),()=>time);
 return {button,calls,captures,listeners,cleanup,set time(value){time=value;},
  send(type,values={}){
   const event={type,pointerType:'touch',pointerId:1,isPrimary:true,button:0,clientX:80,clientY:70,detail:1,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;},...values};
   listeners.get(type)?.(event);return event;
  },
 };
}

test('touch release activates without a synthesized click and preserves the original event',()=>{
 const f=fixture();f.send('pointerdown');assert.equal(f.calls.length,0);assert.ok(f.captures.has(1));
 const release=f.send('pointerup');assert.deepEqual(f.calls,[release]);assert.equal(release.pointerType,'touch');assert.ok(release.defaultPrevented);assert.equal(f.captures.size,0);
 f.time=300;const click=f.send('click',{pointerType:undefined});assert.equal(f.calls.length,1);assert.ok(click.defaultPrevented);
});

test('pen release activates once and its following pointer click is suppressed',()=>{
 const f=fixture();f.send('pointerdown',{pointerType:'pen'});const release=f.send('pointerup',{pointerType:'pen'});
 f.send('click',{pointerType:'pen'});assert.deepEqual(f.calls,[release]);
});

test('mouse retains native click behavior and keyboard detail-zero clicks remain available',()=>{
 const f=fixture();f.send('pointerdown',{pointerType:'mouse'});f.send('pointerup',{pointerType:'mouse'});assert.equal(f.calls.length,0);
 const mouse=f.send('click',{pointerType:'mouse'}),keyboard=f.send('click',{pointerType:'',detail:0});assert.deepEqual(f.calls,[mouse,keyboard]);
});

test('a real mouse click and keyboard activation work immediately after touch',()=>{
 const f=fixture();f.send('pointerdown');f.send('pointerup');f.time=20;
 const keyboard=f.send('click',{pointerType:'',detail:0});assert.equal(f.calls.at(-1),keyboard);
 f.send('pointerdown',{pointerType:'mouse'});f.send('pointerup',{pointerType:'mouse'});
 const mouse=f.send('click',{pointerType:'mouse'});assert.deepEqual(f.calls.slice(1),[keyboard,mouse]);
});

test('only the matching primary pointer release may activate the button',()=>{
 const f=fixture();f.send('pointerdown',{isPrimary:false});f.send('pointerup');assert.equal(f.calls.length,0);
 f.send('pointerdown',{pointerType:'pen',button:2});f.send('pointerup',{pointerType:'pen'});assert.equal(f.calls.length,0);
 f.send('pointerdown');f.send('pointerup',{pointerId:2});assert.equal(f.calls.length,0);
 const release=f.send('pointerup');assert.deepEqual(f.calls,[release]);
});

test('dragging outside cancels activation even if the pointer returns before release',()=>{
 const f=fixture();f.send('pointerdown');f.send('pointermove',{clientX:250});f.send('pointermove');f.send('pointerup');f.send('click',{pointerType:undefined});assert.equal(f.calls.length,0);
});

test('release outside, pointer cancel and lost capture do not activate',()=>{
 for(const kind of ['outside','pointercancel','lostpointercapture']){
  const f=fixture();f.send('pointerdown');
  if(kind==='outside')f.send('pointerup',{clientY:180});else{f.send(kind);f.send('pointerup');}
  f.send('click',{pointerType:undefined});assert.equal(f.calls.length,0,kind);assert.equal(f.captures.size,0,kind);
 }
});

test('disabled actions never run, including disabling between press and release',()=>{
 const f=fixture();f.button.disabled=true;f.send('pointerdown');f.send('pointerup');f.send('click',{pointerType:'',detail:0});assert.equal(f.calls.length,0);
 f.button.disabled=false;f.send('pointerdown');f.button.disabled=true;f.send('pointerup');assert.equal(f.calls.length,0);
});

test('two distinct touch taps each activate once while their compatibility clicks do not',()=>{
 const f=fixture();for(let i=0;i<2;i++){f.time=i*150;f.send('pointerdown');f.send('pointerup');f.send('click',{pointerType:undefined});}assert.equal(f.calls.length,2);
});

test('cleanup removes all listeners and releases a held pointer',()=>{
 const f=fixture();f.send('pointerdown');f.cleanup();assert.equal(f.listeners.size,0);assert.equal(f.captures.size,0);f.send('pointerup');f.send('click',{pointerType:'',detail:0});assert.equal(f.calls.length,0);
});
