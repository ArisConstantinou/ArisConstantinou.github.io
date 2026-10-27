import test from 'node:test';
import assert from 'node:assert/strict';
import {installTapBuffer} from '../src/arcade-tap-buffer.js';

function fixture(){
 const listeners=new Map(),canvas={closest:()=>null},controls={'fire-button':{disabled:false},'kick-button':{disabled:false}};
 const game={running:true,layoutEditing:false,viewMode:'chase3d',locked:false,held:false,cameraDrag:null,renderer:{domElement:canvas},$:id=>controls[id],pointerLocked(){return this.locked;},currentInput(){return {fire:this.held,kick:false,aiming:false};},clearInputs(){this.held=false;}};
 const original=globalThis.addEventListener;
 globalThis.addEventListener=(type,listener)=>{const bucket=listeners.get(type)||[];bucket.push(listener);listeners.set(type,bucket);};
 try{installTapBuffer(game);}finally{if(original===undefined)delete globalThis.addEventListener;else globalThis.addEventListener=original;}
 const send=(type,event={})=>{for(const listener of listeners.get(type)||[])listener(event);};
 const press=(target=canvas,pointerType='mouse')=>send('pointerdown',{target,pointerType,button:0});
 const button=id=>({closest:selector=>selector==='#'+id?controls[id]:null});
 return {game,canvas,controls,send,press,button};
}

test('menu activation never queues a shot when the round begins',()=>{
 const {game,press,button}=fixture();
 for(const id of ['new-round-button','play-button']){
  press(button(id));game.locked=true;
  assert.equal(game.currentInput().fire,false,'only clicking the world or fire button can queue a shot');
 }
});

test('a short world click fires while native mouse capture is pending or unavailable',()=>{
 const {game,press}=fixture();
 assert.equal(game.locked,false);
 press();const tap=game.currentInput();
 assert.equal(tap.fire,true);assert.equal(tap.aiming,true);
 assert.equal(game.currentInput().fire,false,'a short click is delivered once rather than becoming held fire');
 game.locked=true;press();assert.equal(game.currentInput().fire,true);
});

test('held fire continues while a touch finger moves the camera',()=>{
 const {game,press,button}=fixture();
 game.cameraDrag={id:7,type:'touch'};game.held=true;
 press(button('fire-button'),'touch');
 for(let step=0;step<8;step++)assert.equal(game.currentInput().fire,true);
 game.held=false;
 assert.equal(game.currentInput().fire,false,'releasing the fire button stops firing even while camera touch remains held');
});

test('free-cursor overview can fire short clicks without pointer lock',()=>{
 const {game,press}=fixture();game.viewMode='overview';
 press();assert.equal(game.currentInput().fire,true);assert.equal(game.currentInput().fire,false);
});

test('pause cleanup, pointer cancellation and layout editing discard queued taps',()=>{
 for(const stop of [f=>f.game.clearInputs(),f=>f.send('pointercancel'),f=>{f.game.layoutEditing=true;}]){
  const f=fixture();f.game.locked=true;f.press();f.send('keydown',{code:'KeyQ',repeat:false,target:{matches:()=>false}});stop(f);
  const input=f.game.currentInput();assert.equal(input.fire,false);assert.equal(input.kick,false);
  f.game.layoutEditing=false;assert.equal(f.game.currentInput().fire,false);
 }
});

test('touching the world to look and touching a disabled fire control never queues a shot',()=>{
 const f=fixture();f.press(f.canvas,'touch');assert.equal(f.game.currentInput().fire,false);
 f.controls['fire-button'].disabled=true;f.press(f.button('fire-button'),'touch');assert.equal(f.game.currentInput().fire,false);
});
