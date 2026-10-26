import test from 'node:test';
import assert from 'node:assert/strict';
import {installArcadeGestureGuard} from '../src/arcade-gesture-guard.js';

class Element{
 constructor(tag,parent=null,{editable=false}={}){this.tag=tag;this.parentElement=parent;this.editable=editable;this.nodeType=1;}
 contains(node){if(!node?.nodeType)throw new TypeError('contains requires a DOM Node');for(let current=node;current;current=current.parentElement)if(current===this)return true;return false;}
 closest(){for(let current=this;current;current=current.parentElement)if(['input','select','textarea'].includes(current.tag)||current.editable)return current;return null;}
}
function fixture(){
 const handlers=new Map(),body=new Element('body'),canvas=new Element('canvas',body),ui=new Element('div',body),button=new Element('button',ui),icon=new Element('svg',button),outside=new Element('p',body);
 const document={
  hidden:false,nodeType:9,body,documentElement:new Element('html'),
  addEventListener(type,fn,options){if(!handlers.has(type))handlers.set(type,[]);handlers.get(type).push({fn,options});},
  removeEventListener(type,fn){handlers.set(type,(handlers.get(type)||[]).filter(item=>item.fn!==fn));},
  querySelectorAll(){return [canvas,ui];}
 };
 const emit=(type,target=canvas,details={})=>{
  const event={type,target,cancelable:true,defaultPrevented:false,preventCalls:0,propagationStopped:false,
   preventDefault(){this.preventCalls++;this.defaultPrevented=true;},
   stopPropagation(){this.propagationStopped=true;},stopImmediatePropagation(){this.propagationStopped=true;},
   composedPath(){return [target];},...details};
  for(const {fn} of handlers.get(type)||[])fn(event);
  return event;
 };
 return {document,handlers,body,canvas,ui,button,icon,outside,emit};
}
const touch=(identifier,target)=>({identifier,target});

test('a game drag blocks page pan without suppressing single taps or game pointer events',()=>{
 const f=fixture(),remove=installArcadeGestureGuard({document:f.document}),finger=touch(1,f.canvas);
 const start=f.emit('touchstart',f.canvas,{touches:[finger],changedTouches:[finger]});
 assert.equal(start.defaultPrevented,false,'single touchstart must retain menu click synthesis');
 const move=f.emit('touchmove',f.canvas,{touches:[finger]});
 assert.equal(move.defaultPrevented,true);assert.equal(move.propagationStopped,false);
 assert.deepEqual(f.handlers.get('touchmove')[0].options,{capture:true,passive:false});
 assert.equal(f.emit('pointermove',f.canvas).defaultPrevented,false,'camera/stick pointer events are untouched');
 assert.equal(f.emit('touchend',f.canvas,{touches:[],changedTouches:[finger]}).defaultPrevented,false);
 assert.equal(f.emit('click',f.button).defaultPrevented,false);
 remove();
});

test('two sticks block browser pinch while both touch streams keep propagating',()=>{
 const f=fixture();installArcadeGestureGuard({document:f.document});
 const left=new Element('div',f.ui),right=new Element('div',f.ui),a=touch(10,left),b=touch(11,right);
 f.emit('touchstart',left,{touches:[a],changedTouches:[a]});
 const second=f.emit('touchstart',right,{touches:[a,b],changedTouches:[b]});
 assert.equal(second.defaultPrevented,true);assert.equal(second.propagationStopped,false);
 const move=f.emit('touchmove',right,{touches:[a,b],changedTouches:[b]});
 assert.equal(move.defaultPrevented,true);assert.equal(move.propagationStopped,false);
 f.emit('touchcancel',right,{touches:[],changedTouches:[a,b]});
 assert.equal(f.emit('touchmove',f.outside,{touches:[]}).defaultPrevented,false,'cancel removes captured game touches');
});

test('native settings sliders, selects and editable text retain their defaults',()=>{
 const f=fixture();installArcadeGestureGuard({document:f.document});
 const controls=[new Element('input',f.ui),new Element('select',f.ui),new Element('textarea',f.ui),new Element('span',new Element('div',f.ui,{editable:true}))];
 for(const control of controls){
  const a=touch(1,control),b=touch(2,control);
  for(const type of ['touchstart','touchmove','gesturestart','gesturechange','gestureend','wheel','dblclick','selectstart','contextmenu','dragstart']){
   const event=f.emit(type,control,{touches:[a,b],changedTouches:[a,b],ctrlKey:true});
   assert.equal(event.defaultPrevented,false,`${type} must preserve ${control.tag} interaction`);
  }
  f.emit('touchend',control,{touches:[],changedTouches:[a,b]});
 }
});

test('selection, long-press menus, dragging and browser zoom are scoped to game surfaces',()=>{
 const f=fixture();installArcadeGestureGuard({document:f.document,surfaces:[f.canvas,f.ui]});
 for(const type of ['selectstart','contextmenu','dragstart','dblclick','wheel']){
  const event=f.emit(type,f.icon,{ctrlKey:true});
  assert.equal(event.defaultPrevented,true,`${type} should be blocked inside HUD buttons`);
  assert.equal(event.propagationStopped,false);
  assert.equal(f.emit(type,f.outside,{ctrlKey:true}).defaultPrevented,false,'other page content is not guarded');
  assert.equal(f.handlers.get(type)[0].options.passive,false);
 }
 assert.equal(f.emit('wheel',f.outside,{composedPath:()=>[f.outside,f.body,f.document,{}]}).defaultPrevented,false,'a browser composedPath also contains Window, which is not a DOM Node');
});

test('Safari document-targeted gestures follow the active game touch and release cleanly',()=>{
 const f=fixture();installArcadeGestureGuard({document:f.document});
 const finger=touch(1,f.canvas);
 f.emit('touchstart',f.canvas,{touches:[finger],changedTouches:[finger]});
 assert.equal(f.emit('gesturestart',f.document).defaultPrevented,true);
 assert.equal(f.emit('gesturechange',f.document).defaultPrevented,true);
 f.emit('touchend',f.canvas,{touches:[],changedTouches:[finger]});
 assert.equal(f.emit('gestureend',f.document).defaultPrevented,true);
 assert.equal(f.emit('gesturestart',f.document).defaultPrevented,false);
 assert.equal(f.emit('gesturechange',f.document).defaultPrevented,false);
});

test('Ctrl/Cmd zoom keys are blocked on the game page while native editing and other shortcuts work',()=>{
 const f=fixture();installArcadeGestureGuard({document:f.document});
 for(const target of [f.canvas,f.button,f.body,f.document,f.document.documentElement]){
  for(const details of [{key:'+',ctrlKey:true},{key:'-',metaKey:true},{key:'0',ctrlKey:true},{key:'=',metaKey:true},{code:'NumpadAdd',ctrlKey:true},{code:'NumpadSubtract',metaKey:true},{code:'Numpad0',ctrlKey:true}]){
   const event=f.emit('keydown',target,details);
   assert.equal(event.defaultPrevented,true);assert.equal(event.propagationStopped,false);
  }
 }
 for(const target of [new Element('input',f.ui),new Element('select',f.ui),new Element('span',new Element('div',f.ui,{editable:true})),f.outside]){
  assert.equal(f.emit('keydown',target,{key:'+',ctrlKey:true}).defaultPrevented,false);
 }
 for(const details of [{key:'+'},{key:'c',metaKey:true},{key:'-',ctrlKey:true,altKey:true}])assert.equal(f.emit('keydown',f.canvas,details).defaultPrevented,false);
});

test('a hidden or disabled game releases captured gestures and cleanup removes every listener',()=>{
 const f=fixture();let enabled=true;
 const remove=installArcadeGestureGuard({document:f.document,enabled:()=>enabled}),finger=touch(1,f.canvas);
 f.emit('touchstart',f.canvas,{touches:[finger],changedTouches:[finger]});
 f.document.hidden=true;f.emit('visibilitychange',f.document);
 assert.equal(f.emit('gesturestart',f.document).defaultPrevented,false);
 enabled=false;
 assert.equal(f.emit('touchmove',f.canvas,{touches:[finger]}).defaultPrevented,false);
 assert.equal(f.emit('wheel',f.canvas,{ctrlKey:true}).defaultPrevented,false);
 enabled=true;assert.equal(f.emit('wheel',f.canvas,{ctrlKey:true}).defaultPrevented,true);
 remove();remove();
 assert.ok([...f.handlers.values()].every(list=>list.length===0));
 assert.equal(f.emit('wheel',f.canvas,{ctrlKey:true}).defaultPrevented,false);
});

test('non-cancelable events are left alone instead of attempting an ineffective cancellation',()=>{
 const f=fixture();installArcadeGestureGuard({document:f.document});
 for(const type of ['touchmove','wheel','gesturestart','selectstart'])assert.equal(f.emit(type,f.canvas,{cancelable:false}).preventCalls,0);
});
