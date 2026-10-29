// Fire owns its contact independently from movement and the canvas look contact.
// Dragging this button offers aim + fire with the right thumb; merely holding it
// never produces continuous camera rotation.
export function installTouchFire(game){
 const element=game.$('fire-button');let pointer=null,previous=null;
 const clear=()=>{
  const old=pointer;pointer=null;previous=null;
  if(old!==null)game.actions.fire=false;
  element.classList.remove('firing');
  if(old!==null&&element.hasPointerCapture?.(old))element.releasePointerCapture(old);
 };
 const down=event=>{
  if(!game.running||game.layoutEditing||element.disabled||element.closest('[hidden]')||pointer!==null||event.pointerType==='mouse'&&event.button!==0)return;
  event.preventDefault();pointer=event.pointerId;previous={x:event.clientX,y:event.clientY};
  if(['touch','pen'].includes(event.pointerType))game.mouseControl=false;
  if(game.viewMode==='chase3d'&&!game.state?.actors?.[0]?.catapultId)game.centerAim();
  element.setPointerCapture?.(pointer);game.actions.fire=true;element.classList.add('firing');
 };
 const move=event=>{
  if(event.pointerId!==pointer)return;
  if(!game.running||game.layoutEditing||element.disabled){clear();return;}
  event.preventDefault();const dx=event.clientX-previous.x,dy=event.clientY-previous.y;
  previous={x:event.clientX,y:event.clientY};
  if(game.cameraDrag||game.pointers.has('aim')||game.state?.actors?.[0]?.catapultId)return;
  if(game.viewMode==='chase3d')game.turnLook(dx,dy,true);else game.captureMouseAim(event);
 };
 const end=event=>{if(event.pointerId===pointer)clear();};
 const listeners={pointerdown:down,pointermove:move,pointerup:end,pointercancel:end,lostpointercapture:end};
 for(const [type,listener] of Object.entries(listeners))element.addEventListener(type,listener);
 return {get firing(){return pointer!==null;},clear,destroy(){clear();for(const [type,listener] of Object.entries(listeners))element.removeEventListener(type,listener);}};
}
