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
 assert.ok(result.bounds.left>=48&&result.bounds.right<=806&&result.bounds.bottom<=365,'controls retain a four-pixel gap beyond every physical safe inset');
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

function layoutFixture({integratedFire=false,blocks=[],hintRect=null,onEditingChange=()=>{}}={}){
 class Element extends EventTarget{
  constructor(width=120,height=120){
   super();this.width=width;this.height=height;this.hidden=false;this.style={};this.css={display:'block',visibility:'visible'};this.attrs={};this.captures=[];this.parentElement=null;this.children=[];this.textContent='';
   const classes=new Set();this.classList={contains:name=>classes.has(name),toggle(name,enabled){if(enabled)classes.add(name);else classes.delete(name);}};
  }
  contains(node){for(let el=node;el;el=el.parentElement)if(el===this)return true;return false;}
  closest(){for(let el=this;el;el=el.parentElement)if(el.hidden)return el;return null;}
  getBoundingClientRect(){
   let hidden=false;for(let el=this;el;el=el.parentElement)hidden ||= el.hidden||el.css.display==='none';
   const parent=this.parentElement?.getBoundingClientRect(),width=hidden?0:this.width,height=hidden?0:this.height,left=(parent?.left||0)+(parseFloat(this.style.left)||0),top=(parent?.top||0)+(parseFloat(this.style.top)||0);
   return {width,height,left,top,right:left+width,bottom:top+height};
  }
  setAttribute(name,value){this.attrs[name]=value;}
  append(node){if(typeof node==='string')this.textContent+=node;else{this.children.push(node);node.parentElement=this;}}
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
 const hud=blocks.map(block=>{const el=new Element(block.width,block.height);el.id=block.id||'';el.style.left=`${block.left}px`;el.style.top=`${block.top}px`;el.selector=block.selector||`#${block.id}`;for(const name of block.classes||[])el.classList.toggle(name,true);return el;});
 const doc={defaultView:view,querySelectorAll:selector=>hud.filter(el=>selector.split(',').map(s=>s.trim()).includes(el.selector)),createElement:()=>{const el=new Element(108,44);el.style.left='11px';el.style.top='48px';el.selector='#layout-hint .layout-reset';hud.push(el);return el;}},root=new Element(390,844),move=new Element(),aim=new Element(),fire=new Element(72,72),toggle=new Element(52,48);
 root.ownerDocument=doc;for(const el of [move,aim,fire,toggle])el.parentElement=root;
 let hint=null;if(hintRect){hint=new Element(hintRect.width,hintRect.height);hint.hidden=true;hint.style.left=`${hintRect.left}px`;hint.style.top=`${hintRect.top}px`;hint.parentElement=root;hint.textContent='Move controls';root.querySelector=selector=>selector==='#layout-hint'?hint:null;}
 if(integratedFire){fire.parentElement=aim;fire.style.left='24px';fire.style.top='24px';}
 const layout=createTouchLayout({root,movePad:move,aimPad:aim,fireButton:fire,toggleButton:toggle,storageKey:'test-layout',onEditingChange:value=>onEditingChange(value,{hud})});layout.refresh();
 const center=el=>{const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};};
 const send=(el,type,values={})=>{const event=new Event(type,{cancelable:true});Object.assign(event,{pointerId:1,pointerType:'touch',clientX:0,clientY:0,...values});el.dispatchEvent(event);return event;};
 return {layout,root,move,aim,fire,toggle,view,initial,hud,hint,center,send,stored:()=>JSON.parse(storage.get('test-layout'))};
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

test('circular pads can use each other’s transparent corners without overlapping touch areas',()=>{
 const controls={move:{width:120,height:120,shape:'circle'},aim:{width:120,height:120,shape:'circle'}};
 const preferred={move:{x:140/390,y:180/844},aim:{x:234/390,y:274/844}};
 const result=solveTouchLayout({width:390,height:844,controls,preferred});
 assert.deepEqual(result.positions,{move:{x:140,y:180},aim:{x:234,y:274}});
 assert.ok(Math.hypot(result.positions.move.x-result.positions.aim.x,result.positions.move.y-result.positions.aim.y)>=128);
 assert.ok(result.positions.move.x+60>result.positions.aim.x-60&&result.positions.move.y+60>result.positions.aim.y-60,'their old square exclusion regions would overlap');
});

test('a round pad can sit beside a button corner while respecting its real touch rectangle',()=>{
 const controls={move:{width:120,height:120,shape:'circle'}},blocked=[{left:100,top:100,right:140,bottom:140}];
 const result=solveTouchLayout({width:390,height:844,controls,blocked,preferred:{move:{x:192/390,y:192/844}}});
 assert.deepEqual(result.positions.move,{x:192,y:192});
 assert.ok(Math.hypot(192-140,192-140)>=68);
});

test('pads may cross screen halves and captions stay above the physical bottom inset',()=>{
 const controls={move:{width:120,height:120,shape:'circle',overflowBottom:18},aim:{width:120,height:120,shape:'circle',overflowBottom:18}};
 const result=solveTouchLayout({width:844,height:390,controls,insets:{bottom:21},preferred:{move:{x:.8,y:1},aim:{x:.2,y:.4}}});
 assert.equal(result.positions.move.x,844*.8);assert.equal(result.positions.aim.x,844*.2);
 assert.equal(result.positions.move.y+60+18,result.bounds.bottom);
 assert.ok(result.bounds.bottom<=390-21-4);
});

test('passive HUD, map and status areas are available for exact joystick placement',()=>{
 const f=layoutFixture({integratedFire:true,blocks:[
  {id:'arcade-hud',left:0,top:0,width:390,height:250},
  {id:'round-status',left:0,top:160,width:200,height:64},
  {id:'minimap',left:240,top:115,width:130,height:110},
  {id:'pause-button',left:334,top:20,width:44,height:44},
 ]});
 f.layout.setEditing(true);
 for(const [el,target] of [[f.move,{x:100,y:185}],[f.aim,{x:300,y:170}]]){
  const start=f.center(el);f.send(el,'pointerdown',{clientX:start.x,clientY:start.y});f.send(el,'pointermove',{clientX:target.x,clientY:target.y});f.send(el,'pointerup');
  assert.deepEqual(f.center(el),target);
 }
 f.layout.setEditing(false);f.layout.refresh();
 assert.ok(Math.hypot(f.center(f.move).x-100,f.center(f.move).y-185)<1e-9);assert.deepEqual(f.center(f.aim),{x:300,y:170});f.layout.destroy();
});

test('the actual pause button stays reachable when dragging a pad toward it',()=>{
 const f=layoutFixture({integratedFire:true,blocks:[{id:'pause-button',left:334,top:20,width:44,height:44}]});
 f.layout.setEditing(true);const start=f.center(f.move);
 f.send(f.move,'pointerdown',{clientX:start.x,clientY:start.y});f.send(f.move,'pointermove',{clientX:356,clientY:42});f.send(f.move,'pointerup');
 const p=f.center(f.move),nearest={x:Math.max(334,Math.min(378,p.x)),y:Math.max(20,Math.min(64,p.y))};
 assert.ok(Math.hypot(p.x-nearest.x,p.y-nearest.y)>=68-.001,'the circle and button retain their eight-pixel touch gap');
 assert.ok(p.x>=64&&p.x<=326&&p.y>=64);f.layout.destroy();
});

test('integrated fire moves with the aim pad and never becomes a third movable control',()=>{
 const f=layoutFixture({integratedFire:true}),fireStyle={...f.fire.style};f.layout.setEditing(true);
 assert.equal(f.aim.classList.contains('layout-draggable'),true);assert.equal(f.fire.classList.contains('layout-draggable'),false);
 assert.equal(f.aim.attrs['data-layout-label'],'ΣΤΟΧΕΥΣΗ + ΠΥΡ');
 const start=f.center(f.fire),target={x:300,y:400};
 f.send(f.aim,'pointerdown',{clientX:start.x,clientY:start.y});f.send(f.aim,'pointermove',{clientX:target.x,clientY:target.y});f.send(f.aim,'pointerup');
 assert.deepEqual(f.center(f.aim),target);assert.deepEqual(f.center(f.fire),target);assert.deepEqual(f.fire.style,fireStyle,'layout paint never overwrites the nested fire positioning');
 assert.deepEqual(f.stored().portrait.fire,f.initial.portrait.fire,'legacy standalone fire position is retained without affecting the new group');
 f.layout.setEditing(false);f.layout.refresh();assert.deepEqual(f.center(f.aim),target);f.layout.destroy();
});

test('temporary contextual-button displacement does not replace an untouched saved preference',()=>{
 const f=layoutFixture({integratedFire:true,blocks:[{id:'kick-button',left:260,top:590,width:104,height:86}]}),preferred={x:312,y:633};
 assert.notDeepEqual(f.center(f.aim),preferred,'a visible contextual button is currently using the preferred area');
 f.layout.setEditing(true);const start=f.center(f.move);
 f.send(f.move,'pointerdown',{clientX:start.x,clientY:start.y});f.send(f.move,'pointermove',{clientX:100,clientY:350});f.send(f.move,'pointerup');f.layout.setEditing(false);
 assert.deepEqual(f.stored().portrait.aim,f.initial.portrait.aim,'only the deliberately dragged movement pad is persisted');
 f.hud[0].hidden=true;f.layout.refresh();assert.deepEqual(f.center(f.aim),preferred);f.layout.destroy();
});

test('world-anchored catapult and storage prompts cannot displace or rewrite saved sticks',()=>{
 const f=layoutFixture({integratedFire:true,blocks:['catapult-button','catapult-status','sabotage-button','sabotage-status'].map(id=>({id,classes:['world-context'],left:260,top:590,width:104,height:86}))});
 const preferred={move:{x:78,y:633},aim:{x:312,y:633}};
 const unchanged=()=>{assert.deepEqual(f.center(f.move),preferred.move);assert.deepEqual(f.center(f.aim),preferred.aim);assert.deepEqual(f.stored(),f.initial);};
 unchanged();
 for(const [left,hidden] of [[30,false],[260,true],[260,false],[30,true],[30,false]]){
  for(const el of f.hud){el.style.left=`${left}px`;el.hidden=hidden;}
  f.layout.refresh();unchanged();
 }
 // The same exclusion applies while dragging, not just during refresh.
 for(const el of f.hud){el.style.left='240px';el.style.top='300px';el.hidden=false;}
 f.layout.setEditing(true);const start=f.center(f.move),target={x:292,y:343};
 f.send(f.move,'pointerdown',{clientX:start.x,clientY:start.y});f.send(f.move,'pointermove',{clientX:target.x,clientY:target.y});f.send(f.move,'pointerup');
 assert.deepEqual(f.center(f.move),target);assert.deepEqual(f.stored().portrait.aim,f.initial.portrait.aim);f.layout.destroy();
});

test('ordinary fixed actions and header buttons still reserve their touch area',()=>{
 for(const [id,classes] of [['catapult-button',[]],['sabotage-button',[]],['kick-button',['world-context']],['pause-button',['world-context']]]){
  const f=layoutFixture({integratedFire:true,blocks:[{id,classes,left:260,top:590,width:104,height:86}]}),preferred={x:312,y:633};
  assert.notDeepEqual(f.center(f.aim),preferred,`${id} must remain reachable`);
  assert.deepEqual(f.stored(),f.initial,'temporary avoidance does not persist a new preference');
  f.hud[0].hidden=true;f.layout.refresh();assert.deepEqual(f.center(f.aim),preferred);f.layout.destroy();
 }
});

test('dynamic frog-action prompts never become joystick layout obstacles',()=>{
 const f=layoutFixture({integratedFire:true,blocks:[{id:'kick-rival-1',selector:'.frog-action',classes:['frog-action'],left:260,top:590,width:104,height:86}]});
 assert.deepEqual(f.center(f.aim),{x:312,y:633});
 f.hud[0].style.left='30px';f.layout.refresh();assert.deepEqual(f.center(f.move),{x:78,y:633});
 assert.deepEqual(f.stored(),f.initial);f.layout.destroy();
});

test('combined aim/fire preserves independent portrait and landscape positions and resets together',()=>{
 const f=layoutFixture({integratedFire:true});
 const dragAim=target=>{f.layout.setEditing(true);const start=f.center(f.aim);f.send(f.aim,'pointerdown',{clientX:start.x,clientY:start.y});f.send(f.aim,'pointermove',{clientX:target.x,clientY:target.y});f.send(f.aim,'pointerup');f.layout.setEditing(false);};
 dragAim({x:300,y:400});
 f.view.innerWidth=844;f.view.innerHeight=390;f.layout.refresh();assert.deepEqual(f.center(f.aim),{x:844*.8,y:390*.6});
 dragAim({x:450,y:250});
 f.view.innerWidth=390;f.view.innerHeight=844;f.layout.refresh();assert.deepEqual(f.center(f.aim),{x:300,y:400});assert.deepEqual(f.center(f.fire),f.center(f.aim));
 assert.deepEqual(f.stored().landscape.aim,{x:450/844,y:250/390});
 f.layout.reset();assert.deepEqual(f.center(f.aim),{x:316,y:758});assert.deepEqual(f.center(f.fire),f.center(f.aim));
 assert.deepEqual(f.stored().portrait.fire,f.initial.portrait.fire);assert.deepEqual(f.stored().landscape.aim,{x:450/844,y:250/390});f.layout.destroy();
});

test('entering layout edit reserves the newly visible Reset without replacing the preferred position',()=>{
 const f=layoutFixture({integratedFire:true,hintRect:{left:250,top:570,width:130,height:100}}),preferred=f.center(f.aim);
 f.layout.setEditing(true);const p=f.center(f.aim),r=f.hint.children[0].getBoundingClientRect();
 const nearest={x:Math.max(r.left,Math.min(r.right,p.x)),y:Math.max(r.top,Math.min(r.bottom,p.y))};
 assert.ok(Math.hypot(p.x-nearest.x,p.y-nearest.y)>=68-.001,'Reset and the pad are both reachable immediately on edit entry');
 assert.notDeepEqual(p,preferred);assert.deepEqual(f.stored().portrait.aim,f.initial.portrait.aim);
 f.layout.setEditing(false);assert.deepEqual(f.center(f.aim),preferred,'the pad returns when the temporary Reset button is hidden');
 assert.deepEqual(f.stored().portrait.aim,f.initial.portrait.aim);f.layout.destroy();
});

test('editor visibility callbacks run before placement so returning gameplay buttons stay reachable',()=>{
 const f=layoutFixture({integratedFire:true,blocks:[{id:'sabotage-button',left:260,top:590,width:104,height:86}],onEditingChange:(editing,{hud})=>{hud[0].hidden=editing;}});
 const preferred={x:312,y:633};f.layout.setEditing(true);const editorPosition=f.center(f.aim),start=f.center(f.aim);
 f.send(f.aim,'pointerdown',{clientX:start.x,clientY:start.y});f.send(f.aim,'pointermove',{clientX:preferred.x,clientY:preferred.y});f.send(f.aim,'pointerup');
 assert.deepEqual(f.center(f.aim),preferred,'the editor can use the now-hidden contextual button area');
 f.layout.setEditing(false);const p=f.center(f.aim),r=f.hud[0].getBoundingClientRect();
 const nearest={x:Math.max(r.left,Math.min(r.right,p.x)),y:Math.max(r.top,Math.min(r.bottom,p.y))};
 assert.ok(Math.hypot(p.x-nearest.x,p.y-nearest.y)>=68-.001,'a contextual button returning on edit exit is reserved immediately');
 assert.deepEqual(editorPosition,preferred,'entering the editor also releases the hidden contextual button area immediately');
 assert.deepEqual(f.stored().portrait.aim,f.initial.portrait.aim,'temporary gameplay displacement preserves the deliberately saved preference');f.layout.destroy();
});
