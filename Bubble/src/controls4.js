/* 0.4.4 — one owner per physical finger, independent movement/aim/trigger.
 * Native Touch identifiers are authoritative on iOS: pointer capture loss is
 * not a finger lift. Mouse and pen retain Pointer Events + document tracking.
 */
import {FireRing,AIM_FULL} from './ring4.js?v=0.4.3';
const $=id=>document.getElementById(id);
const ACTIONS={jumpBtn:'jump',modeBtn:'mode',zoneBtn:'zone',useBtn:'use',reloadBtn:'reload',pathBtn:'path',gripBtn:'grip',gradeBtn:'grade',gaitBtn:'gait',cameraBtn:'camera',bagBtn:'bag',pauseBtn:'pause'};
const prevent=e=>{if(e.cancelable)e.preventDefault();};

function protectDocument(){
 if(document.documentElement.dataset.bubbleTouchProtected)return;
 document.documentElement.dataset.bubbleTouchProtected='true';
 // These restrictions belong to this game document, not the browser chrome.
 for(const type of ['selectstart','contextmenu','dragstart','copy','cut','paste'])
  document.addEventListener(type,prevent,{capture:true,passive:false});
 const clearSelection=()=>{const s=window.getSelection();if(s?.rangeCount)s.removeAllRanges();};
 document.addEventListener('selectionchange',clearSelection);
 document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&['a','c','x','v'].includes(e.key.toLowerCase())){
   prevent(e);e.stopImmediatePropagation();clearSelection();
  }
 },true);
 clearSelection();
}

export class Controls {
 constructor(canvas,api,touch){
  this.api=api;this.canvas=canvas;this.touch=touch;this.keys=new Set();
  this.ring=new FireRing();this.ringRequested=false;this.aimRadius=0;this.viewport=[innerWidth,innerHeight];
  this.move=[0,0];this.aim=[0,0];this.moveActive=false;this.aimActive=false;this.aimRevision=0;
  this.mouse=[innerWidth/2,innerHeight*.5];this.mouseActive=false;
  this.firePointer=null;this.lookPointer=null;this.tapPointer=null;this.mouseDown=false;
  this.lastMoveTap=-1000;this.owners=new Map();this.slots=new Map();this.ignoreClicks=new Map();
  this.resets=[()=>this.releaseSlot('move'),()=>this.releaseSlot('aim')];
  this.lastTouchAt=-Infinity;
  document.documentElement.dataset.inputMode=touch?'touch':'desktop';
  protectDocument();
  for(const [id,fn] of Object.entries(ACTIONS))$(id).addEventListener('click',e=>{
   prevent(e);
   // A touch action is dispatched once on touchend. Ignore its ghost click.
   if(e.detail!==0&&(this.ignoreClicks.get(id)||0)>performance.now())return;
   api[fn]();
  });
  for(const [id,kind] of [['moveStick','move'],['aimStick','aim']])
   $(id).addEventListener('resetstick',()=>this.releaseSlot(kind));

  document.addEventListener('touchstart',e=>{
   this.lastTouchAt=performance.now();this.selectInput('touch');
   let handled=false;
   for(const t of e.changedTouches){
    const key='t:'+t.identifier;
    if(this.start(key,t.target,t.clientX,t.clientY,'touch',t.identifier))handled=true;
   }
   if(handled)prevent(e);
  },{capture:true,passive:false});
  document.addEventListener('touchmove',e=>{
   this.lastTouchAt=performance.now();
   let handled=false;
   // Never replace the whole state with changedTouches: an unmoving left
   // finger still owns movement when only the right finger sends an update.
   for(const t of e.changedTouches){const owner=this.owners.get('t:'+t.identifier);
    if(owner){this.update(owner,t.clientX,t.clientY);handled=true;}
   }
   if(handled)prevent(e);
  },{capture:true,passive:false});
  for(const type of ['touchend','touchcancel'])document.addEventListener(type,e=>{
   this.lastTouchAt=performance.now();
   let handled=false;
   for(const t of e.changedTouches){const key='t:'+t.identifier;
    if(this.owners.has(key)){this.stop(key,type==='touchcancel',t.clientX,t.clientY);handled=true;}
   }
   if(handled)prevent(e);
  },{capture:true,passive:false});

  document.addEventListener('pointerdown',e=>{
   if(e.pointerType==='touch'||e.sourceCapabilities?.firesTouchEvents)return; // touch is handled once
   if(this.hasTouchOwner())return;
   this.selectInput('desktop');
   if(e.button===2&&e.target===canvas){prevent(e);if(api.playing())api.use();return;}
   if(e.button!==0)return;
   if(this.start('p:'+e.pointerId,e.target,e.clientX,e.clientY,e.pointerType||'mouse',e.pointerId)){
    prevent(e);const o=this.owners.get('p:'+e.pointerId);
    try{o.el.setPointerCapture(e.pointerId);}catch{} // document is the fallback
   }
  },true);
  document.addEventListener('pointermove',e=>{
   if(e.pointerType==='touch'||e.sourceCapabilities?.firesTouchEvents||this.hasTouchOwner())return;
   // Do not let a delayed compatibility mouse event steal an active touch UI.
   if(this.touch&&performance.now()-this.lastTouchAt<850)return;
   if(e.movementX||e.movementY)this.selectInput('desktop');
   const o=this.owners.get('p:'+e.pointerId);
   if(o){
    if(e.pointerType==='mouse'&&e.buttons===0)this.stop(o.key,true);
    else{prevent(e);this.update(o,e.clientX,e.clientY);}
   }
   this.mouse=[e.clientX,e.clientY];this.mouseActive=true;
   if(document.pointerLockElement===canvas&&api.isFPS())api.look(-e.movementX*.0027,-e.movementY*.0024);
  },true);
  for(const type of ['pointerup','pointercancel'])document.addEventListener(type,e=>{
   if(e.pointerType==='touch')return;
   if(this.owners.has('p:'+e.pointerId)){prevent(e);this.stop('p:'+e.pointerId,type==='pointercancel',e.clientX,e.clientY);}
  },true);
  // No global lostpointercapture reset: the finger may still be held. Real
  // touchcancel/pointercancel, pagehide and visibility loss end their owners.
  window.addEventListener('keydown',e=>{
   if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;
   if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab'].includes(e.code))prevent(e);
   if(/^(Key[WASDCTERBGVIXF]|Digit[1-4]|Arrow(Up|Down|Left|Right)|Space|Escape|Enter|Shift(Left|Right)|Control(Left|Right)|Alt(Left|Right))$/.test(e.code))this.selectInput('desktop');
   this.keys.add(e.code);if(e.repeat)return;
   const calls={Space:'jump',KeyC:'camera',KeyT:'mode',KeyE:'use',KeyR:'reload',KeyB:'path',KeyG:'grip',KeyV:'grade',KeyI:'bag',Escape:'pause',KeyX:'erase',KeyF:'wall'};
   if(calls[e.code])api[calls[e.code]]();
   if(/^Digit[1-4]$/.test(e.code))api.setZone(['head','chest','arms','legs'][Number(e.code.slice(-1))-1]);
   if(e.code==='AltLeft'||e.code==='AltRight')api.arc(true);
  });
  window.addEventListener('keyup',e=>this.keys.delete(e.code));
  const suspend=()=>{this.clear();if(api.playing())api.pause(true);};
  window.addEventListener('blur',()=>{
   // On touch browsers a visible-page focus/callout change is not app exit.
   // Actual app exit is handled by visibilitychange/pagehide below.
   if(!this.touch||document.hidden)suspend();
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();});
  window.addEventListener('pagehide',suspend);
  window.addEventListener('resize',()=>{api.resize();this.refreshLayout();});
  window.visualViewport?.addEventListener('resize',()=>{api.resize();this.refreshLayout();});
 }
 // Input UI is determined by the primary pointer initially, then by actual
 // input. Window width and maxTouchPoints do not turn a mouse PC into a phone.
 hasTouchOwner(){return [...this.owners.values()].some(o=>o.source==='touch');}
 selectInput(mode){
  const touch=mode==='touch';if(this.touch===touch)return;
  // A real device switch cancels stale actions; ordinary opposite-thumb events
  // do not enter this branch and keep the independent owners introduced in 0.4.2.
  this.clear();this.touch=touch;this.mouseActive=false;
  document.documentElement.dataset.inputMode=mode;
  this.api.inputMode?.(touch);this.refreshLayout();
  if(touch&&document.pointerLockElement)document.exitPointerLock();
 }
 start(key,target,x,y,source,id){
  if(!this.api.playing()||this.owners.has(key))return false;
  const el=target instanceof Element?target.closest('#moveStick,#aimStick,#fireBtn,canvas,button'):null;
  if(!el)return false;
  let kind,action;
  if(el.id==='moveStick')kind='move';
  else if(el.id==='aimStick')kind='aim';
  else if(el.id==='fireBtn')kind='fire';
  else if(source==='touch'&&ACTIONS[el.id]){kind='action:'+el.id;action=ACTIONS[el.id];}
  else if(el===this.canvas){
   if(source!=='touch')kind='fire';
   else if(this.api.isFPS()&&x>innerWidth*.40)kind='look';
   else if(!this.api.isFPS())kind='tap';
   else return false;
  }else return false;
  if(this.slots.has(kind))return false;
  const r=el.getBoundingClientRect(),o={key,kind,el,source,id,action,start:[x,y],last:[x,y],origin:[r.left+r.width/2,r.top+r.height/2],size:r.width,moved:false};
  this.owners.set(key,o);this.slots.set(kind,key);
  if(kind==='move'||kind==='aim'){
   this[kind+'Active']=true;el.classList.add('engaged');
   if(kind==='aim'){this.ring.reset();this.ringRequested=false;}
   if(kind==='move'){const now=performance.now();if(now-this.lastMoveTap<280)this.api.jump();this.lastMoveTap=now;}
   this.update(o,x,y);
  }else if(kind==='fire'){
   this.firePointer=id;this.mouseDown=source!=='touch';this.api.beginFire();
   if(source!=='touch'&&this.api.isFPS())this.lock();
  }else if(kind==='look')this.lookPointer=id;
  else if(kind==='tap')this.tapPointer=id;
  else el.classList.add('pressed');
  return true;
 }
 update(o,x,y){
  if(o.kind==='move'||o.kind==='aim'){
   const outer=o.el.clientWidth/2, radius=o.kind==='aim'?outer*AIM_FULL:o.el.clientWidth*.34;
   const dx=x-o.origin[0],dy=y-o.origin[1],length=Math.hypot(dx,dy);
   const raw=Math.min(1,length/radius),dead=.12,magnitude=Math.max(0,(raw-dead)/(1-dead));
   this[o.kind]=length?[dx/length*magnitude,dy/length*magnitude]:[0,0];
   if(o.kind==='aim'){
    if(magnitude>0)this.aimRevision++;
    this.aimRadius=length/outer;this.ringRequested=this.ring.sample(this.aimRadius);
    o.el.classList.toggle('ring-requested',this.ringRequested);
   }
   const travel=o.kind==='aim'?outer*.81:radius;
   const scale=Math.min(1,travel/(length||1));
   o.el.querySelector('i').style.transform=`translate(${dx*scale}px,${dy*scale}px)`;
  }else if(o.kind==='fire'&&o.el.id==='fireBtn'&&o.start[1]-y>28)this.api.arc(true);
  else if(o.kind==='look')this.api.look(-(x-o.last[0])*.003,-(y-o.last[1])*.003);
  else if(o.kind==='tap'&&Math.hypot(x-o.start[0],y-o.start[1])>12)o.moved=true;
  o.last=[x,y];
 }
 stop(key,cancel=false,x,y){
  const o=this.owners.get(key);if(!o)return;
  this.owners.delete(key);if(this.slots.get(o.kind)===key)this.slots.delete(o.kind);
  if(o.kind==='move'||o.kind==='aim'){
   this[o.kind]=[0,0];this[o.kind+'Active']=false;
   o.el.classList.remove('engaged','firing','ring-requested');o.el.querySelector('i').style.transform='';
   if(o.kind==='aim'){this.ring.reset();this.ringRequested=false;this.aimRadius=0;}
  }else if(o.kind==='fire'){
   this.firePointer=null;this.mouseDown=false;cancel?this.api.cancelFire():this.api.endFire();
  }else if(o.kind==='look')this.lookPointer=null;
  else if(o.kind==='tap'){
   this.tapPointer=null;if(!cancel&&!o.moved&&this.api.playing())this.api.tap?.(x??o.last[0],y??o.last[1]);
  }else if(o.action){
   o.el.classList.remove('pressed');this.ignoreClicks.set(o.el.id,performance.now()+700);
   const r=o.el.getBoundingClientRect(),px=x??o.last[0],py=y??o.last[1];
   if(!cancel&&px>=r.left-6&&px<=r.right+6&&py>=r.top-6&&py<=r.bottom+6)this.api[o.action]();
  }
  if(o.source!=='touch')try{if(o.el.hasPointerCapture(o.id))o.el.releasePointerCapture(o.id);}catch{}
 }
 releaseSlot(kind){const key=this.slots.get(kind);if(key)this.stop(key,true);}
 disarmRing(){this.ring.disarm();this.ringRequested=false;$('aimStick').classList.remove('firing','ring-requested');}
 syncViewport(){
  if(this.viewport[0]!==innerWidth||this.viewport[1]!==innerHeight)this.refreshLayout();
 }
 refreshLayout(){
  this.viewport=[innerWidth,innerHeight];
  const o=this.owners.get(this.slots.get('aim'));if(!o)return;
  const r=o.el.getBoundingClientRect(),origin=[r.left+r.width/2,r.top+r.height/2];
  if(Math.hypot(origin[0]-o.origin[0],origin[1]-o.origin[1])>1||Math.abs(r.width-o.size)>1){
   // Toolbar/orientation changes are not a deliberate outward trigger gesture.
   o.origin=origin;o.size=r.width;this.disarmRing();
  }
 }

 clear(){
  this.keys.clear();for(const key of [...this.owners.keys()])this.stop(key,true);
  this.move=[0,0];this.aim=[0,0];this.moveActive=this.aimActive=this.mouseDown=false;
  this.firePointer=this.lookPointer=this.tapPointer=null;this.ring.reset();this.ringRequested=false;this.aimRadius=0;this.api.cancelFire();
 }
 lock(){if(this.touch||!this.api.playing())return;try{const p=this.canvas.requestPointerLock();p?.catch?.(()=>{});}catch{}}
}
