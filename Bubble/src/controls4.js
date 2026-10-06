const $=id=>document.getElementById(id);
export class Controls{
 constructor(canvas,api,touch){
  this.api=api;this.canvas=canvas;this.touch=touch;this.keys=new Set();
  this.move=[0,0];this.aim=[0,0];this.aimActive=false;this.aimRevision=0;
  this.mouse=[innerWidth/2,innerHeight*.5];this.mouseActive=false;
  this.firePointer=null;this.lookPointer=null;this.lastMoveTap=-1000;
  this.tapPointer=null;this.resets=[];
  for(const [id,type]of[['moveStick','move'],['aimStick','aim']])this.stick(id,type);
  const fire=$('fireBtn');
  fire.addEventListener('pointerdown',e=>{
   e.preventDefault();e.stopPropagation();if(!api.playing()||this.firePointer!==null)return;
   this.firePointer=e.pointerId;this.fireY=e.clientY;fire.setPointerCapture(e.pointerId);api.beginFire();
  });
  fire.addEventListener('pointermove',e=>{if(e.pointerId===this.firePointer&&this.fireY-e.clientY>28)api.arc(true);});
  const endFire=(e,cancel=false)=>{
   if(e.pointerId!==this.firePointer)return;const id=this.firePointer;this.firePointer=null;
   e.preventDefault();if(cancel)api.cancelFire();else api.endFire();
   if(fire.hasPointerCapture(id))fire.releasePointerCapture(id);
  };
  fire.addEventListener('pointerup',e=>endFire(e));
  fire.addEventListener('pointercancel',e=>endFire(e,true));
  fire.addEventListener('lostpointercapture',e=>endFire(e,true));
  const buttons={jumpBtn:'jump',modeBtn:'mode',zoneBtn:'zone',useBtn:'use',reloadBtn:'reload',pathBtn:'path',gripBtn:'grip',gradeBtn:'grade',gaitBtn:'gait',cameraBtn:'camera',bagBtn:'bag',pauseBtn:'pause'};
  for(const [id,fn]of Object.entries(buttons))$(id).addEventListener('click',e=>{e.preventDefault();api[fn]();});
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  canvas.addEventListener('pointerdown',e=>{
   if(!api.playing())return;
   if(e.pointerType==='touch'){
    e.preventDefault();
    if(api.isFPS()&&e.clientX>innerWidth*.40&&this.lookPointer===null){
     this.lookPointer=e.pointerId;this.look=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId);
    }else if(!api.isFPS()&&this.tapPointer===null){
     this.tapPointer=e.pointerId;this.tapStart=[e.clientX,e.clientY,performance.now()];this.tapMoved=false;canvas.setPointerCapture(e.pointerId);
    }
    return;
   }
   if(e.button===0){this.mouseDown=true;api.beginFire();}
   if(e.button===2)api.use();if(api.isFPS())this.lock();
  });
  const releaseCanvas=(e,cancel=false)=>{
   if(e.pointerType!=='touch'&&this.mouseDown){this.mouseDown=false;cancel?api.cancelFire():api.endFire();}
   if(e.pointerId===this.lookPointer)this.lookPointer=null;
   if(e.pointerId===this.tapPointer){
    this.tapPointer=null;
    if(!cancel&&!this.tapMoved&&api.playing())api.tap?.(e.clientX,e.clientY);
   }
  };
  window.addEventListener('pointerup',e=>releaseCanvas(e));
  canvas.addEventListener('pointercancel',e=>releaseCanvas(e,true));
  canvas.addEventListener('lostpointercapture',e=>releaseCanvas(e,true));
  window.addEventListener('pointermove',e=>{
   if(e.pointerType==='touch'){
    if(e.pointerId===this.lookPointer){api.look(-(e.clientX-this.look[0])*.003,-(e.clientY-this.look[1])*.003);this.look=[e.clientX,e.clientY];}
    if(e.pointerId===this.tapPointer&&Math.hypot(e.clientX-this.tapStart[0],e.clientY-this.tapStart[1])>12)this.tapMoved=true;
    return;
   }
   this.mouse=[e.clientX,e.clientY];this.mouseActive=true;
   if(document.pointerLockElement===canvas&&api.isFPS())api.look(-e.movementX*.0027,-e.movementY*.0024);
  });
  window.addEventListener('keydown',e=>{
   if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;
   if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab'].includes(e.code))e.preventDefault();
   this.keys.add(e.code);if(e.repeat)return;
   const calls={Space:'jump',KeyC:'camera',KeyT:'mode',KeyE:'use',KeyR:'reload',KeyB:'path',KeyG:'grip',KeyV:'grade',KeyI:'bag',Escape:'pause',KeyX:'erase',KeyF:'wall'};
   if(calls[e.code])api[calls[e.code]]();
   if(/^Digit[1-4]$/.test(e.code))api.setZone(['head','chest','arms','legs'][Number(e.code.slice(-1))-1]);
   if(e.code==='AltLeft'||e.code==='AltRight')api.arc(true);
  });
  window.addEventListener('keyup',e=>this.keys.delete(e.code));
  window.addEventListener('blur',()=>{this.clear();if(api.playing())api.pause(true);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){this.clear();if(api.playing())api.pause(true);}});
  window.addEventListener('resize',()=>api.resize());window.visualViewport?.addEventListener('resize',()=>api.resize());
 }
 stick(id,type){
  const el=$(id),knob=el.querySelector('i');let active=null,origin=[0,0];
  const update=e=>{
   if(e.pointerId!==active)return;e.preventDefault();
   const radius=el.clientWidth*.34,dx=e.clientX-origin[0],dy=e.clientY-origin[1],length=Math.hypot(dx,dy);
   const raw=Math.min(1,length/radius),dead=.12,magnitude=Math.max(0,(raw-dead)/(1-dead));
   this[type]=length?[dx/length*magnitude,dy/length*magnitude]:[0,0];
   if(type==='aim'&&magnitude>0)this.aimRevision++;
   const scale=Math.min(1,radius/(length||1));knob.style.transform=`translate(${dx*scale}px,${dy*scale}px)`;
  };
  const reset=()=>{
   const pointerId=active;active=null;this[type]=[0,0];knob.style.transform='';el.classList.remove('engaged');
   if(type==='aim')this.aimActive=false;
   if(pointerId!==null&&el.hasPointerCapture(pointerId))el.releasePointerCapture(pointerId);
  };
  this.resets.push(reset);
  el.addEventListener('pointerdown',e=>{
   e.preventDefault();e.stopPropagation();if(!this.api.playing()||active!==null)return;
   active=e.pointerId;el.setPointerCapture(active);const r=el.getBoundingClientRect();origin=[r.left+r.width/2,r.top+r.height/2];
   el.classList.add('engaged');if(type==='aim')this.aimActive=true;
   if(type==='move'){const now=performance.now();if(now-this.lastMoveTap<280)this.api.jump();this.lastMoveTap=now;}
   update(e);
  });
  el.addEventListener('pointermove',update);
  for(const event of['pointerup','pointercancel','lostpointercapture'])el.addEventListener(event,e=>{if(e.pointerId===active)reset();});
  el.addEventListener('resetstick',reset);
 }
 clear(){
  this.keys.clear();this.mouseDown=false;const id=this.firePointer;this.firePointer=null;
  if(id!==null&&$('fireBtn').hasPointerCapture(id))$('fireBtn').releasePointerCapture(id);
  this.lookPointer=this.tapPointer=null;this.api.cancelFire();
  for(const reset of this.resets)reset();this.move=[0,0];this.aim=[0,0];this.aimActive=false;
 }
 lock(){if(this.touch||!this.api.playing())return;try{const p=this.canvas.requestPointerLock();p?.catch?.(()=>{});}catch{}}
}
