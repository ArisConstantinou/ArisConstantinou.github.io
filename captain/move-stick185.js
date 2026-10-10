/** Shared movement joystick. Screen-space Y is positive down.
 * A hold belongs to exactly one pointer / native touch identifier. Other fingers
 * cannot steal it or release it. Never expire a valid stationary held touch.
 */
export function movementAxes(dx,dy,radius=40,deadZone=.14){
 if(!Number.isFinite(dx)||!Number.isFinite(dy)||radius<=0)return {x:0,y:0};
 const d=Math.hypot(dx,dy)/radius;if(d<=deadZone)return {x:0,y:0};
 const n=Math.hypot(dx,dy),strength=Math.min(1,(d-deadZone)/(1-deadZone));
 return {x:dx/n*strength,y:dy/n*strength};
}
export function installMoveStick({element,enabled,onChange,radius=40,travel=35,deadZone=.14}){
 if(!element||typeof enabled!=='function'||typeof onChange!=='function')throw Error('Movement pad, enabled and onChange required');
 const doc=element.ownerDocument,win=doc.defaultView,knob=element.querySelector('i'),listeners=[];
 let owner=null,touchId=null,kind=null,center=null,axes={x:0,y:0},lastReason='initial';
 const pointerEvents=typeof win.PointerEvent==='function';
 element.style.touchAction='none';element.style.userSelect='none';element.style.webkitUserSelect='none';
 for(const child of element.children)child.style.pointerEvents='none';
 const on=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));};
 const list=xs=>Array.from(xs||[]),ownsTarget=t=>t===element||element.contains(t);
 function emit(next){axes=next;onChange(next.x,next.y);if(knob)knob.style.transform=`translate(${next.x*travel}px,${next.y*travel}px)`;element.dataset.joystickActive=String(owner!==null);}
 function reset(reason='reset'){
  const old=owner;owner=null;touchId=null;kind=null;center=null;lastReason=reason;emit({x:0,y:0});
  // Invalidate ownership BEFORE releasing: lostpointercapture may be synchronous.
  if(pointerEvents&&typeof old==='number'){try{if(element.hasPointerCapture(old))element.releasePointerCapture(old);}catch{}}
 }
 function coordinate(x,y){if(owner===null||!center)return;if(!enabled()){reset('disabled');return;}emit(movementAxes(x-center.x,y-center.y,radius,deadZone));}
 function start(id,type,x,y){
  if(owner!==null||!enabled())return false;const r=element.getBoundingClientRect();if(!r.width||!r.height)return false;
  owner=id;kind=type;touchId=null;center={x:r.left+r.width/2,y:r.top+r.height/2};lastReason='held';coordinate(x,y);return true;
 }
 function pointerDown(e){
  if(e.pointerType==='mouse'&&e.button!==0)return;
  if(!start(e.pointerId,e.pointerType,e.clientX,e.clientY))return;
  e.preventDefault();try{element.setPointerCapture(e.pointerId);}catch{/* Global listeners remain the release fallback. */}
 }
 function pointerMove(e){
  if(e.pointerId!==owner)return;
  if(kind==='mouse'&&e.buttons===0){reset('mouse-release');return;}
  if(e.cancelable)e.preventDefault();coordinate(e.clientX,e.clientY);
 }
 function pointerEnd(e){if(e.pointerId===owner)reset(e.type);}
 function captureLost(e){
  if(e.pointerId!==owner)return;
  // Ignore the child's implicit capture being transferred to the parent pad.
  if(e.target!==element){try{if(element.hasPointerCapture(owner))return;}catch{}}
  reset('lostpointercapture');
 }
 function touchStart(e){
  const candidates=list(e.changedTouches).filter(t=>ownsTarget(t.target));
  if(!pointerEvents&&owner===null&&candidates.length){const t=candidates[0];if(start('touch-'+t.identifier,'touch',t.clientX,t.clientY)){touchId=t.identifier;if(e.cancelable)e.preventDefault();}return;}
  if(owner===null||kind!=='touch'||touchId!==null)return;
  // Touch.identifier is NOT PointerEvent.pointerId; bind the two event streams
  // by the initial target. Never use isPrimary or the last remaining finger.
  if(candidates.length)touchId=candidates[0].identifier;
 }
 function touchMove(e){
  if(owner===null||kind!=='touch'||touchId===null)return;
  const current=list(e.touches).find(t=>t.identifier===touchId);
  if(!current){reset('touch-missing');return;}
  if(list(e.changedTouches).some(t=>t.identifier===touchId)){
   if(e.cancelable)e.preventDefault();coordinate(current.clientX,current.clientY);
  }
 }
 function touchEnd(e){
  if(owner===null||kind!=='touch')return;
  const remaining=list(e.touches),changed=list(e.changedTouches);
  if(touchId!==null){if(!remaining.some(t=>t.identifier===touchId))reset(e.type);}
  else if(!remaining.length||changed.some(t=>ownsTarget(t.target)))reset(e.type);
 }
 on(element,'pointerdown',pointerDown,{passive:false});
 on(win,'pointermove',pointerMove,{capture:true,passive:false});
 on(win,'pointerup',pointerEnd,true);on(win,'pointercancel',pointerEnd,true);
 on(win,'lostpointercapture',captureLost,true);
 on(element,'touchstart',touchStart,{passive:false});
 on(win,'touchmove',touchMove,{capture:true,passive:false});
 on(win,'touchend',touchEnd,true);on(win,'touchcancel',touchEnd,true);
 on(win,'blur',()=>reset('blur'));on(win,'pagehide',()=>reset('pagehide'));
 on(win,'resize',()=>reset('resize'));on(win,'orientationchange',()=>reset('orientationchange'));
 on(doc,'visibilitychange',()=>{if(doc.hidden)reset('hidden');});
 on(doc,'freeze',()=>reset('freeze'));
 on(element,'contextmenu',e=>e.preventDefault());
 function sync(){if(owner!==null&&(!enabled()||!element.isConnected||!element.getClientRects().length))reset('disabled');return axes;}
 emit({x:0,y:0});
 return {reset,sync,inspect:()=>({active:owner!==null,pointerId:owner,touchId,axes:{...axes},reason:lastReason,deadZone}),destroy:()=>{reset('destroy');listeners.forEach(f=>f());}};
}
