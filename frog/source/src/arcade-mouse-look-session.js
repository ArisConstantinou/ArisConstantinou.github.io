// Pointer Lock improves mouse look, but a denied/unsupported request must never
// prevent a round from starting. Native completion events are asynchronous.
export function createMouseLookSession({canvas,document=globalThis.document,active=()=>true,onLock=()=>{},onUnexpectedUnlock=()=>{},onFallback=()=>{},timeoutMs=1500,setTimer=globalThis.setTimeout,clearTimer=globalThis.clearTimeout}={}){
 let generation=0,pendingId=0,promiseRequest=false,timer=null,observedLocked=false,disposed=false;
 const locked=()=>document.pointerLockElement===canvas;
 const clearPending=()=>{if(timer!==null)clearTimer(timer);timer=null;pendingId=0;promiseRequest=false;};
 const release=()=>{
  generation++;clearPending();
  // Clear this before requesting native exit. A queued unlock event from a
  // pause must not pause the next round after an immediate Resume/New click.
  observedLocked=false;
  if(locked())try{document.exitPointerLock?.();}catch{}
 };
 const changed=()=>{
  if(disposed)return;
  if(locked()){
   clearPending();
   if(!active()){release();return;}
   const first=!observedLocked;observedLocked=true;
   if(first)onLock();
  }else{
   const unexpected=observedLocked;observedLocked=false;
   // A queued intentional unlock can arrive while a new request is pending.
   if(unexpected){clearPending();if(active())onUnexpectedUnlock();}
  }
 };
 const failed=(id,error)=>{
  if(disposed||pendingId!==id)return;
  clearPending();
  if(locked()){changed();return;}
  if(active())onFallback(error);
 };
 const errored=()=>{if(pendingId&&!promiseRequest)failed(pendingId,new Error('Pointer Lock was denied.'));};
 const request=()=>{
  if(disposed||!active()||locked()||pendingId)return false;
  const id=++generation;pendingId=id;promiseRequest=false;
  try{
   if(typeof canvas.requestPointerLock!=='function'){failed(id,new Error('Pointer Lock is unavailable.'));return false;}
   const result=canvas.requestPointerLock();
   if(result&&typeof result.then==='function'){
    promiseRequest=true;
    Promise.resolve(result).then(()=>{if(!disposed&&pendingId===id&&locked())changed();},error=>failed(id,error));
   }
   if(pendingId===id)timer=setTimer(()=>failed(id,new Error('Pointer Lock request timed out.')),Math.max(0,Number.isFinite(timeoutMs)?timeoutMs:1500));
  }catch(error){failed(id,error);}
  return pendingId===id||locked();
 };
 document.addEventListener('pointerlockchange',changed);
 document.addEventListener('pointerlockerror',errored);
 return {
  get locked(){return locked();},get pending(){return !!pendingId;},request,release,
  dispose(){if(disposed)return;release();disposed=true;document.removeEventListener('pointerlockchange',changed);document.removeEventListener('pointerlockerror',errored);},
 };
}
