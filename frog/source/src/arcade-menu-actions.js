// Touch releases must work even when a gesture guard suppresses the browser's click.
export function installMenuAction(button,action,now=()=>performance.now(),{allowSecondary=false}={}){
 const direct=event=>event.pointerType==='touch'||event.pointerType==='pen';
 let pressed=null,lastDirectRelease=-Infinity;
 const inside=event=>{
  const r=button.getBoundingClientRect();
  return event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;
 };
 const release=id=>{try{button.releasePointerCapture?.(id);}catch{}};
 const down=event=>{
  if(event.pointerType==='mouse'){
   if(pressed){const id=pressed.id;pressed=null;release(id);}
   lastDirectRelease=-Infinity;return;
  }
  if(button.disabled||!direct(event)||event.isPrimary===false&&!allowSecondary||event.button!==0||pressed)return;
  pressed={id:event.pointerId,canceled:false};
  try{button.setPointerCapture?.(event.pointerId);}catch{}
 };
 const move=event=>{if(pressed?.id===event.pointerId&&!inside(event))pressed.canceled=true;};
 const cancel=event=>{
  if(pressed?.id!==event.pointerId)return;
  pressed=null;lastDirectRelease=now();release(event.pointerId);
 };
 const up=event=>{
  if(pressed?.id!==event.pointerId)return;
  const gesture=pressed;pressed=null;
  event.preventDefault();lastDirectRelease=now();release(event.pointerId);
  if(button.disabled||gesture.canceled||!inside(event))return;
  try{action(event);}finally{lastDirectRelease=now();}
 };
 const click=event=>{
  // Keyboard activation remains available; a fresh mouse down clears the guard.
  if(button.disabled||direct(event)||(event.detail!==0&&now()-lastDirectRelease<900)){
   event.preventDefault();return;
  }
  action(event);
 };
 const listeners={pointerdown:down,pointermove:move,pointerleave:move,pointerup:up,pointercancel:cancel,lostpointercapture:cancel,click};
 for(const [name,listener]of Object.entries(listeners))button.addEventListener(name,listener);
 return()=>{
  for(const [name,listener]of Object.entries(listeners))button.removeEventListener(name,listener);
  if(pressed){const id=pressed.id;pressed=null;release(id);}
 };
}
