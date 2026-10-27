import test from 'node:test';
import assert from 'node:assert/strict';
import {installTouchStick} from '../src/arcade-touch-stick.js';
import {lookCameraRate} from '../src/arcade-camera-look.js';

// Small bubbling/capture fixture: contacts begun on the nested button bubble
// to its stick, and later events follow pointer capture even outside the pad.
function fixture(){
 const captures=new Map(),elements=new Map();
 const dispatch=(target,type,values={})=>{
  const event={type,target,pointerId:7,pointerType:'touch',button:0,isPrimary:true,clientX:270,clientY:370,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;},...values};
  if(['pointermove','pointerup','pointercancel'].includes(type)&&captures.has(event.pointerId))event.target=captures.get(event.pointerId);
  for(let current=event.target;current;current=current.parent){event.currentTarget=current;for(const fn of [...current.listeners.get(type)||[]])fn(event);}
  if(['pointerup','pointercancel'].includes(type))captures.get(event.pointerId)?.releasePointerCapture(event.pointerId);
  return event;
 };
 const element=(id,parent,rect)=>{
  const classes=new Set(),node={id,parent,children:[],listeners:new Map(),style:{},hidden:false,disabled:false,
   classList:{add:value=>classes.add(value),remove:value=>classes.delete(value),contains:value=>classes.has(value)},
   getBoundingClientRect:()=>({...rect,right:rect.left+rect.width,bottom:rect.top+rect.height}),
   addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(fn);},
   removeEventListener(type,fn){this.listeners.get(type)?.delete(fn);},
   contains(other){for(let node=other;node;node=node.parent)if(node===this)return true;return false;},
   closest(selector){if(selector!=='[hidden]')return null;for(let node=this;node;node=node.parent)if(node.hidden)return node;return null;},
   querySelector(selector){return selector==='.stick-knob'?this.children.find(child=>child.knob):null;},
   setPointerCapture(pointer){captures.set(pointer,this);},
   hasPointerCapture(pointer){return captures.get(pointer)===this;},
   releasePointerCapture(pointer){if(captures.get(pointer)!==this)return;captures.delete(pointer);dispatch(this,'lostpointercapture',{pointerId:pointer});},
  };
  parent?.children.push(node);elements.set(id,node);return node;
 };
 const root=element('root',null,{left:0,top:0,width:390,height:844});
 const aim=element('aim-stick',root,{left:200,top:300,width:140,height:140});
 const knob=element('aim-knob',aim,{left:244,top:344,width:52,height:52});knob.knob=true;
 const fire=element('fire-button',knob,{left:244,top:344,width:52,height:52});
 const icon=element('fire-icon',fire,{left:256,top:350,width:28,height:28});
 const ring=element('aim-ring',aim,{left:200,top:300,width:140,height:140});
 const move=element('move-stick',root,{left:20,top:300,width:140,height:140});
 const moveKnob=element('move-knob',move,{left:69,top:349,width:42,height:42});moveKnob.knob=true;
 const game={running:true,layoutEditing:false,viewMode:'chase3d',mouseControl:true,settings:{touchFireMode:'manual'},
  actions:{fire:false,kick:false,sabotage:false},pointers:new Map(),pointerTypes:new Map(),move:{x:0,z:0},aimStrength:0,stickAim:{x:0,z:-1},autoFireTargetId:null,mouse:{valid:false},cameraDrag:null,centerCalls:0,stopDragCalls:0,
  $:id=>elements.get(id),centerAim(){this.mouse.valid=true;this.centerCalls++;},stopCameraDrag(){this.cameraDrag=null;this.stopDragCalls++;},
 };
 const sticks={aim:installTouchStick(game,{id:'aim-stick',kind:'aim'}),move:installTouchStick(game,{id:'move-stick',kind:'move'})};
 return {game,sticks,captures,root,aim,knob,fire,icon,ring,move,moveKnob,send:dispatch};
}

test('an off-center nested fire press starts manual fire with zero camera displacement',()=>{
 for(const mode of ['manual','auto']){
  const f=fixture();f.game.settings.touchFireMode=mode;f.game.cameraDrag={id:3,type:'touch'};
  const down=f.send(f.icon,'pointerdown',{clientX:288,clientY:355});
  assert.equal(down.defaultPrevented,true);assert.equal(f.game.actions.fire,true);
  assert.equal(f.game.aimStrength,0,'touching the edge of the center button must not jolt the camera');
  assert.equal(f.game.pointers.get('aim'),7);assert.equal(f.game.pointerTypes.get('aim'),'touch');
  assert.equal(f.captures.get(7),f.aim);assert.equal(f.game.cameraDrag,null);assert.equal(f.game.stopDragCalls,1);
  assert.equal(f.game.mouseControl,false);assert.equal(f.game.mouse.valid,true);
 }
});

test('dragging held center fire supplies continuous look even when the captured finger leaves the pad',()=>{
 const f=fixture();f.send(f.fire,'pointerdown',{clientX:282,clientY:360});
 f.send(f.root,'pointermove',{clientX:490,clientY:360});
 assert.equal(f.game.actions.fire,true);assert.equal(f.game.aimStrength,1);assert.deepEqual(f.game.stickAim,{x:1,z:0});
 let orbit={yaw:0,pitch:.12},total=0;
 for(let frame=0;frame<360;frame++){
  const next=lookCameraRate(orbit,f.game.stickAim.x*f.game.aimStrength,f.game.stickAim.z*f.game.aimStrength,1/60);
  total+=Math.atan2(Math.sin(next.yaw-orbit.yaw),Math.cos(next.yaw-orbit.yaw));orbit=next;
 }
 assert.ok(total<-Math.PI*4,'the unchanged held contact continues rotating through more than two revolutions');
 f.send(f.root,'pointermove',{clientX:282,clientY:360});
 assert.equal(f.game.aimStrength,0);assert.equal(f.game.actions.fire,true,'returning to the press point stops look while keeping fire held');
 f.send(f.root,'pointerup');assert.equal(f.game.actions.fire,false);assert.equal(f.game.pointers.has('aim'),false);
});

test('an outer-ring aim drag never turns into manual fire when it crosses the center button',()=>{
 const f=fixture();f.send(f.ring,'pointerdown',{clientX:330,clientY:370});
 assert.ok(f.game.aimStrength>.8);assert.equal(f.game.actions.fire,false);
 f.send(f.fire,'pointermove',{clientX:270,clientY:370});
 assert.equal(f.game.aimStrength,0);assert.equal(f.game.actions.fire,false);
 f.send(f.fire,'pointermove',{clientX:205,clientY:370});
 assert.ok(f.game.stickAim.x<0);assert.equal(f.game.actions.fire,false);
 f.send(f.fire,'pointerup');assert.equal(f.game.actions.fire,false);
});

test('an extra contact cannot steal, release, cancel or fire the owned aim stick',()=>{
 const f=fixture();f.send(f.ring,'pointerdown',{clientX:330});
 const strength=f.game.aimStrength;
 assert.equal(f.send(f.fire,'pointerdown',{pointerId:8,isPrimary:false}).defaultPrevented,false);
 for(const type of ['pointermove','pointerup','pointercancel','lostpointercapture'])f.send(f.aim,type,{pointerId:8,clientX:210});
 assert.equal(f.game.pointers.get('aim'),7);assert.equal(f.game.aimStrength,strength);assert.equal(f.game.actions.fire,false);
 assert.equal(f.captures.get(7),f.aim);assert.equal(f.game.stopDragCalls,1);
 f.send(f.aim,'pointerup');
 f.send(f.fire,'pointerdown',{pointerId:8,isPrimary:false});
 assert.equal(f.game.pointers.get('aim'),8);assert.equal(f.game.actions.fire,true,'a new contact is accepted after the original releases');
});

test('movement and center-fire contacts work independently with two thumbs',()=>{
 const f=fixture();f.send(f.move,'pointerdown',{pointerId:1,clientX:90,clientY:305});
 assert.ok(f.game.move.z<-.9);
 f.send(f.fire,'pointerdown',{pointerId:2,isPrimary:false});
 f.send(f.root,'pointermove',{pointerId:2,clientX:330,clientY:370});
 assert.equal(f.game.pointers.get('move'),1);assert.equal(f.game.pointers.get('aim'),2);assert.equal(f.game.actions.fire,true);
 assert.ok(f.game.move.z<-.9);assert.ok(f.game.aimStrength>.8);
 f.send(f.root,'pointerup',{pointerId:1});
 assert.deepEqual(f.game.move,{x:0,z:0});assert.equal(f.game.actions.fire,true);assert.equal(f.game.pointers.get('aim'),2);
 f.send(f.root,'pointerup',{pointerId:2});assert.equal(f.game.actions.fire,false);assert.equal(f.captures.size,0);
});

test('pointer release, cancel and lost capture all clear only their held stick and fire latch',()=>{
 for(const type of ['pointerup','pointercancel','lostpointercapture']){
  const f=fixture();f.send(f.fire,'pointerdown');f.send(f.root,'pointermove',{clientX:330});f.game.autoFireTargetId='rival-1';
  f.send(f.aim,type);
  assert.equal(f.game.actions.fire,false,type);assert.equal(f.game.aimStrength,0,type);assert.equal(f.game.autoFireTargetId,null,type);
  assert.equal(f.game.pointers.has('aim'),false,type);assert.equal(f.game.pointerTypes.has('aim'),false,type);assert.equal(f.captures.size,0,type);
  assert.equal(f.knob.style.transform,'translate(-50%,-50%)',type);
 }
});

test('pause cleanup discards late pointer events and allows a fresh contact after resume',()=>{
 const f=fixture();f.send(f.fire,'pointerdown');f.send(f.root,'pointermove',{clientX:330});
 f.game.running=false;f.sticks.aim.clear();
 for(const type of ['pointermove','pointerup','lostpointercapture'])f.send(f.aim,type,{clientX:210});
 assert.equal(f.game.actions.fire,false);assert.equal(f.game.aimStrength,0);assert.equal(f.game.pointers.size,0);assert.equal(f.captures.size,0);
 f.game.running=true;f.send(f.fire,'pointerdown',{pointerId:9});
 assert.equal(f.game.actions.fire,true);assert.equal(f.game.pointers.get('aim'),9);
});

test('paused, layout-editing and hidden controls cannot acquire a pointer',()=>{
 for(const block of [f=>{f.game.running=false;},f=>{f.game.layoutEditing=true;},f=>{f.root.hidden=true;}]){
  const f=fixture();block(f);const down=f.send(f.fire,'pointerdown');
  assert.equal(down.defaultPrevented,false);assert.equal(f.game.actions.fire,false);assert.equal(f.game.pointers.size,0);assert.equal(f.captures.size,0);
 }
});

test('a disabled center button and non-left mouse press do not fire or seize look',()=>{
 const f=fixture();f.fire.disabled=true;f.send(f.fire,'pointerdown');assert.equal(f.game.pointers.size,0);assert.equal(f.game.actions.fire,false);
 f.send(f.ring,'pointerdown',{clientX:330});assert.equal(f.game.pointers.get('aim'),7,'the independent outer look ring remains available');
 f.sticks.aim.clear();f.fire.disabled=false;
 f.send(f.fire,'pointerdown',{pointerType:'mouse',button:2});assert.equal(f.game.pointers.size,0);assert.equal(f.game.actions.fire,false);
});

test('pen and primary mouse input retain one-pointer ownership without requiring a primary touch',()=>{
 for(const pointerType of ['pen','mouse']){
  const f=fixture();f.send(f.fire,'pointerdown',{pointerType,isPrimary:false});
  assert.equal(f.game.actions.fire,true);assert.equal(f.game.pointerTypes.get('aim'),pointerType);
  assert.equal(f.game.mouseControl,pointerType==='mouse');f.send(f.aim,'pointerup',{pointerType});assert.equal(f.game.actions.fire,false);
 }
});

test('overview stick aiming invalidates stale world targeting without changing the camera mode',()=>{
 const f=fixture();f.game.viewMode='overview';f.game.mouse.valid=true;
 f.send(f.ring,'pointerdown',{clientX:330});assert.equal(f.game.mouse.valid,false);assert.equal(f.game.centerCalls,0);assert.equal(f.game.viewMode,'overview');
 f.send(f.aim,'pointermove',{clientX:270,clientY:310});assert.ok(f.game.stickAim.z<0);assert.equal(f.game.actions.fire,false);
});

test('destroy clears capture and removes listeners so stale controls cannot reacquire input',()=>{
 const f=fixture();f.send(f.fire,'pointerdown');f.sticks.aim.destroy();
 assert.equal(f.game.actions.fire,false);assert.equal(f.captures.size,0);
 for(const bucket of f.aim.listeners.values())assert.equal(bucket.size,0);
 f.send(f.fire,'pointerdown',{pointerId:9});assert.equal(f.game.pointers.has('aim'),false);
});
