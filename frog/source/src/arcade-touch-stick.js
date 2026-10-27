import { fireRing } from './arcade-model.js';

// A contact owns one stick until it ends. Starting on the center button latches
// manual fire; crossing that button during an aim-only drag never starts fire.
export function installTouchStick(game,{id,kind}){
 const element=game.$(id),knob=element.querySelector('.stick-knob');
 const fireButton=kind==='aim'?game.$('fire-button'):null;
 let pointer=null,firing=false,origin=null;
 const resetKnob=()=>{knob.style.transform='translate(-50%,-50%)';};
 const update=event=>{
  const bounds=element.getBoundingClientRect();
  const x=(event.clientX-origin.x)/(bounds.width/2),y=(event.clientY-origin.y)/(bounds.height/2);
  const distance=Math.hypot(x,y),scale=distance>1?1/distance:1;
  // Keep the entire center button within the circular pad even at full travel.
  const travel=Math.max(0,(bounds.width-knob.getBoundingClientRect().width)/2-4);
  knob.style.transform=`translate(-50%,-50%) translate(${x*scale*travel}px,${y*scale*travel}px)`;
  if(kind==='move'){const value=fireRing(x,y);game.move={x:value.x,z:value.z};}
  else{
   game.aimStrength=Math.min(1,distance);
   if(distance>.08)game.stickAim={x:x/distance,z:y/distance};
  }
  if(game.viewMode==='chase3d')game.centerAim();
  else if(kind==='aim')game.mouse.valid=false;
 };
 const clear=()=>{
  const old=pointer;pointer=null;origin=null;
  game.pointers.delete(kind);game.pointerTypes.delete(kind);resetKnob();
  if(kind==='move')game.move={x:0,z:0};
  else{game.aimStrength=0;game.autoFireTargetId=null;element.classList.remove('firing');}
  if(firing){game.actions.fire=false;fireButton?.classList.remove('firing');}
  firing=false;
  if(old!==null&&element.hasPointerCapture?.(old))element.releasePointerCapture(old);
 };
 const down=event=>{
  if(!game.running||game.layoutEditing||element.closest('[hidden]')||pointer!==null)return;
  if(event.pointerType==='mouse'&&event.button!==0)return;
  const centerFire=!!fireButton&&(event.target===fireButton||fireButton.contains(event.target));
  if(centerFire&&fireButton.disabled)return;
  event.preventDefault();
  if(kind==='aim')game.stopCameraDrag();
  const bounds=element.getBoundingClientRect();
  // A fire press starts with no look displacement wherever it lands inside the
  // center button. Dragging from that contact then controls continuous look.
  origin=centerFire?{x:event.clientX,y:event.clientY}:{x:bounds.left+bounds.width/2,y:bounds.top+bounds.height/2};
  pointer=event.pointerId;firing=centerFire;
  game.pointers.set(kind,pointer);game.pointerTypes.set(kind,event.pointerType);
  if(['touch','pen'].includes(event.pointerType))game.mouseControl=false;
  element.setPointerCapture?.(pointer);
  if(firing)game.actions.fire=true;
  update(event);
 };
 const move=event=>{if(game.layoutEditing||event.pointerId!==pointer)return;event.preventDefault();update(event);};
 const end=event=>{if(event.pointerId===pointer)clear();};
 const listeners={pointerdown:down,pointermove:move,pointerup:end,pointercancel:end,lostpointercapture:end};
 for(const [type,listener] of Object.entries(listeners))element.addEventListener(type,listener);
 return {get firing(){return firing;},clear,destroy(){clear();for(const [type,listener] of Object.entries(listeners))element.removeEventListener(type,listener);}};
}
