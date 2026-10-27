import test from 'node:test';
import assert from 'node:assert/strict';
import {solveTouchLayout,createTouchLayout} from '../src/arcade-touch-layout.js';

function scenario(width,height){
 const portrait=height>=width,stick=portrait?Math.min(148,Math.max(116,width*.35)):Math.min(136,Math.max(108,height*.3));
 const controls={move:{width:stick,height:stick},aim:{width:stick,height:stick},fire:{width:portrait?76:72,height:portrait?76:72}};
 const blocked=[
  {left:12,top:12,right:width-(portrait?12:132),bottom:86},
  {left:width-(portrait?122:112),top:portrait?112:10,right:width-12,bottom:portrait?222:110},
  {left:width-(portrait?122:112),top:portrait?228:116,right:width-12,bottom:portrait?272:160},
  {left:width/2-26,top:height-66,right:width/2+26,bottom:height-18},
 ];
 return {width,height,controls,blocked};
}
function assertUsable(input,result){
 const boxes=[];
 for(const [key,p] of Object.entries(result.positions)){
  const size=input.controls[key],box={left:p.x-size.width/2,right:p.x+size.width/2,top:p.y-size.height/2,bottom:p.y+size.height/2};
  assert.ok(box.left>=result.bounds.left-.01&&box.top>=result.bounds.top-.01&&box.right<=result.bounds.right+.01&&box.bottom<=result.bounds.bottom+.01,`${key} must fit safe bounds`);
  for(const other of [...input.blocked,...boxes])assert.ok(box.right<=other.left||box.left>=other.right||box.bottom<=other.top||box.top>=other.bottom,`${key} overlaps HUD or another control`);
  boxes.push(box);
 }
}
for(const [width,height] of [[360,640],[390,844],[640,360],[844,390]]){
 test(`controls remain separately reachable at ${width}×${height}`,()=>{
  const input=scenario(width,height),result=solveTouchLayout(input);assertUsable(input,result);
  const preferred=Object.fromEntries(Object.entries(result.positions).map(([key,p])=>[key,{x:p.x/width,y:p.y/height}]));
  assert.deepEqual(solveTouchLayout({...input,preferred}).positions,result.positions,'saved normalized positions round-trip without shifting');
 });
 test(`conflicting saved placements are repaired at ${width}×${height}`,()=>{
  const input={...scenario(width,height),preferred:{move:{x:.95,y:0},aim:{x:.95,y:0},fire:{x:.95,y:0}}};
  assertUsable(input,solveTouchLayout(input));
 });
}
test('landscape camera cutout and gesture bar margins survive a resize',()=>{
 const input={...scenario(844,390),insets:{left:44,right:34,top:12,bottom:21},preferred:{move:{x:0,y:1},aim:{x:1,y:1},fire:{x:1,y:1}}};
 const result=solveTouchLayout(input);assertUsable(input,result);
 assert.ok(result.bounds.left>=52&&result.bounds.right<=802&&result.bounds.bottom<=361);
});
test('invalid stored coordinates cannot put controls outside the viewport',()=>{
 const input={...scenario(360,640),preferred:{move:{x:NaN,y:NaN},aim:{x:Infinity,y:-Infinity},fire:{x:-10,y:20}}};
 assertUsable(input,solveTouchLayout(input));
});

test('auto-fire layout reserves space only for the visible movement control',()=>{
 const full=scenario(390,844),input={...full,activeKeys:['move']};
 const result=solveTouchLayout(input);
 assert.deepEqual(Object.keys(result.positions),['move']);assertUsable(input,result);
 assert.deepEqual(result.positions,solveTouchLayout({...full,controls:{move:full.controls.move}}).positions,'omitted aim/fire controls are supported without phantom space');
 assert.deepEqual(solveTouchLayout({...full,activeKeys:[]}).positions,{},'a hidden touch HUD has no active controls');
});

test('a visible fire button without an aim stick uses the free lower-right corner',()=>{
 const controls={fire:{width:72,height:72}},result=solveTouchLayout({width:844,height:390,controls});
 assert.deepEqual(result.positions,{fire:{x:794,y:328}});
 const full=scenario(844,390);
 assert.deepEqual(solveTouchLayout({...full,blocked:[],activeKeys:['fire']}).positions,result.positions,'hidden aim dimensions do not reserve a gap');
});

function layoutFixture(){
 class Element extends EventTarget{
  constructor(width=120,height=120){
   super();this.width=width;this.height=height;this.hidden=false;this.style={};this.css={display:'block',visibility:'visible'};this.attrs={};this.captures=[];this.parentElement=null;
   const classes=new Set();this.classList={contains:name=>classes.has(name),toggle(name,enabled){if(enabled)classes.add(name);else classes.delete(name);}};
  }
  closest(){for(let el=this;el;el=el.parentElement)if(el.hidden)return el;return null;}
  getBoundingClientRect(){
   let hidden=false;for(let el=this;el;el=el.parentElement)hidden ||= el.hidden||el.css.display==='none';
   const width=hidden?0:this.width,height=hidden?0:this.height,left=parseFloat(this.style.left)||0,top=parseFloat(this.style.top)||0;
   return {width,height,left,top,right:left+width,bottom:top+height};
  }
  setAttribute(name,value){this.attrs[name]=value;}
  setPointerCapture(id){this.captures.push(id);}
  querySelector(selector){return selector==='span'?{replaceChildren:()=>{}}:null;}
 }
 const initial={version:1,portrait:{move:{x:.2,y:.75},aim:{x:.8,y:.75},fire:{x:.8,y:.5}},landscape:{aim:{x:.8,y:.6},fire:{x:.6,y:.8}}};
 const storage=new Map([['test-layout',JSON.stringify(initial)]]),frames=new Map();let frame=0;
 const view=Object.assign(new EventTarget(),{
  innerWidth:390,innerHeight:844,
  getComputedStyle:el=>({...el.css,getPropertyValue:()=>0}),
  requestAnimationFrame:callback=>{frames.set(++frame,callback);return frame;},cancelAnimationFrame:id=>frames.delete(id),
  localStorage:{getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value)},
 });
 const doc={defaultView:view,querySelectorAll:()=>[]},root=new Element(390,844),move=new Element(),aim=new Element(),fire=new Element(72,72),toggle=new Element(52,48);
 root.ownerDocument=doc;for(const el of [move,aim,fire,toggle])el.parentElement=root;
 const layout=createTouchLayout({root,movePad:move,aimPad:aim,fireButton:fire,toggleButton:toggle,storageKey:'test-layout'});layout.refresh();
 const center=el=>{const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};};
 const send=(el,type,values={})=>{const event=new Event(type,{cancelable:true});Object.assign(event,{pointerId:1,pointerType:'touch',clientX:0,clientY:0,...values});el.dispatchEvent(event);return event;};
 return {layout,root,move,aim,fire,toggle,view,initial,center,send,stored:()=>JSON.parse(storage.get('test-layout'))};
}

test('editing movement while catapult controls are hidden preserves their saved positions',()=>{
 const f=layoutFixture(),aimPosition=f.center(f.aim),firePosition=f.center(f.fire);
 f.aim.hidden=true;f.fire.css.display='none';f.layout.refresh();f.layout.setEditing(true);
 assert.equal(f.move.classList.contains('layout-draggable'),true);
 assert.equal(f.aim.classList.contains('layout-draggable'),false);assert.equal(f.fire.classList.contains('layout-draggable'),false);
 const start=f.center(f.move);
 f.send(f.move,'pointerdown',{clientX:start.x,clientY:start.y});
 f.send(f.move,'pointermove',{clientX:aimPosition.x,clientY:aimPosition.y});
 f.send(f.move,'pointerup');
 assert.deepEqual(f.center(f.move),aimPosition,'the hidden aim stick is not a drag obstacle');
 assert.deepEqual(f.stored().portrait.aim,f.initial.portrait.aim);assert.deepEqual(f.stored().portrait.fire,f.initial.portrait.fire);
 f.layout.reset();f.layout.setEditing(false);
 assert.deepEqual(f.stored().portrait.aim,f.initial.portrait.aim,'reset only affects controls currently shown');
 assert.deepEqual(f.stored().portrait.fire,f.initial.portrait.fire);
 f.aim.hidden=false;f.fire.css.display='block';f.layout.refresh();
 assert.deepEqual(f.center(f.aim),aimPosition);assert.deepEqual(f.center(f.fire),firePosition);
 assert.deepEqual(f.stored().landscape,f.initial.landscape,'editing portrait does not change landscape preferences');f.layout.destroy();
});

test('hidden, display-none and invisible controls cannot enter layout drags',()=>{
 for(const mode of ['hidden','display','visibility']){
  const f=layoutFixture();f.layout.setEditing(true);
  if(mode==='hidden')f.aim.hidden=true;else if(mode==='display')f.aim.css.display='none';else f.aim.css.visibility='hidden';
  f.layout.refresh();const event=f.send(f.aim,'pointerdown',{clientX:300,clientY:600});
  assert.equal(f.aim.classList.contains('layout-draggable'),false,mode);assert.equal(f.aim.captures.length,0,mode);assert.equal(event.defaultPrevented,false,mode);
  f.layout.setEditing(false);assert.deepEqual(f.stored().portrait.aim,f.initial.portrait.aim,mode);f.layout.destroy();
 }
});

test('hiding the entire touch HUD does not overwrite any saved control placement',()=>{
 const f=layoutFixture();f.root.hidden=true;f.layout.refresh();f.layout.setEditing(true);f.layout.setEditing(false);
 assert.deepEqual(f.stored(),f.initial);f.root.hidden=false;f.layout.refresh();
 assert.deepEqual(f.center(f.move),{x:f.initial.portrait.move.x*390,y:f.initial.portrait.move.y*844});f.layout.destroy();
});
