/** Fixed portrait ring + relative touch look. A stationary finger NEVER turns the camera.
 * Gestures have an owner: starting in the center is only look; starting in the ring
 * selects an action. Cancellation, pause and orientation changes never execute attacks.
 */
export function installTouchControls({root,canvas,enabled,onLook,onAction,onBlock,status}) {
 const actions=[['slap','🖐','ΧΑΣΤΟΥΚΙ'],['heavy','✋','ΒΑΡΥ'],['punch','👊','ΓΡΟΘΙΑ'],['kick','🦶','ΚΛΩΤΣΙΑ'],['spit','💦','ΦΤΥΣΕ'],['block','🛡','ΜΠΛΟΚ'],['grab','✊','ΠΑΡΕ'],['throw','↗','ΠΕΤΑ'],['drink','🥃','ΟΥΙΣΚΙ']];
 const wheel=document.createElement('div');wheel.id='mobileCombatWheel';wheel.hidden=true;
 wheel.innerHTML='<div id="combatOuterRing"></div><div id="combatRightStick" role="group" aria-label="Σύρε για κάμερα"><i></i><small>ΜΑΤΙΑ</small></div><div id="ringFeedback" role="status"></div>';
 root.append(wheel);const ring=wheel.firstChild,pad=wheel.querySelector('#combatRightStick'),knob=pad.querySelector('i'),feedback=wheel.lastChild;
 let activePointer=null,owner=null,mode=null,last=null,start=null,selected=-1,blocking=false,wasEnabled=false,lookEvents=0,executed=0;
 let sensitivity=.8;try{sensitivity=Math.max(.4,Math.min(1.4,Number(localStorage.getItem('mayhem-look'))||.8));}catch{}
 const touch=()=>document.documentElement.dataset.inputScheme==='touch';
 const usable=()=>touch()&&enabled();
 const buttons=actions.map(([name,icon,label],i)=>{
  const b=document.createElement('button'),a=(i*40-90)*Math.PI/180;
  b.type='button';b.className='ring-action';b.dataset.action=name;b.setAttribute('aria-label',label);
  b.style.left=(50+Math.cos(a)*39)+'%';b.style.top=(50+Math.sin(a)*39)+'%';
  b.innerHTML='<span>'+icon+'</span><small>'+label+'</small>';ring.append(b);return b;
 });
 function allowed(i){const s=status(),a=actions[i]?.[0];if(!a)return false;
  if(['slap','heavy','punch','kick','spit'].includes(a))return s.canAttack&&!s.drinking&&!s.attacking;
  if(a==='throw')return s.held&&!s.drinking;
  if(a==='drink')return !s.drinking&&!s.held&&s.drinkReady;
  return !s.drinking;
 }
 function choose(i){selected=i;buttons.forEach((b,k)=>b.classList.toggle('chosen',k===i));feedback.textContent=i<0?'':actions[i][2];
  const block=i>=0&&actions[i][0]==='block'&&allowed(i);if(block!==blocking){blocking=block;onBlock(block);}
 }
 function reset(){const id=activePointer,target=owner;activePointer=null;owner=null;mode=null;last=null;start=null;choose(-1);knob.style.transform='translate(0,0)';
  if(target&&id!==null){try{if(target.hasPointerCapture(id))target.releasePointerCapture(id);}catch{}}
 }
 function begin(e,target,isRing=false){if(!usable()||e.pointerType==='mouse'||activePointer!==null)return false;
  e.preventDefault();activePointer=e.pointerId;owner=target;mode=isRing?'action':'look';last={x:e.clientX,y:e.clientY};start={...last};
  try{target.setPointerCapture(e.pointerId);}catch{}if(isRing)pick(e);return true;
 }
 function pick(e){const r=wheel.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,d=Math.hypot(dx,dy);
  choose(d<r.width*.27||d>r.width*.72?-1:(Math.round((Math.atan2(dy,dx)+Math.PI/2)/(Math.PI*2)*actions.length)+actions.length)%actions.length);
 }
 function move(e){if(e.pointerId!==activePointer)return false;if(!usable()){reset();return true;}e.preventDefault();
  if(mode==='action'){pick(e);return true;}
  const dx=e.clientX-last.x,dy=e.clientY-last.y;if(Math.hypot(dx,dy)<1.3)return true;
  last={x:e.clientX,y:e.clientY};
  if(Math.abs(dx)>innerWidth*.65||Math.abs(dy)>innerHeight*.65)return true;
  onLook(dx*.0032*sensitivity,dy*.0022*sensitivity);lookEvents++;
  const x=e.clientX-start.x,y=e.clientY-start.y,k=Math.min(1,15/Math.max(1,Math.hypot(x,y)));
  knob.style.transform='translate('+(x*k).toFixed(2)+'px,'+(y*k).toFixed(2)+'px)';return true;
 }
 function end(e){if(e.pointerId!==activePointer)return false;
  const i=selected,run=mode==='action'&&e.type==='pointerup'&&usable()&&i>=0&&allowed(i)&&actions[i][0]!=='block';reset();
  if(run){onAction(actions[i][0]);executed++;}return true;
 }
 wheel.addEventListener('pointerdown',e=>{const action=e.target.closest('.ring-action');if(begin(e,wheel,!!action||e.target===ring))e.stopPropagation();});
 wheel.addEventListener('pointermove',move);for(const type of ['pointerup','pointercancel','lostpointercapture'])wheel.addEventListener(type,end);
 wheel.addEventListener('contextmenu',e=>e.preventDefault());
 window.addEventListener('blur',reset);window.addEventListener('resize',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 const settings=document.createElement('label');settings.id='touchSensitivity183';settings.innerHTML='<span>Ευαισθησία αφής <b></b></span><input type="range" min="40" max="140" step="5" aria-label="Ευαισθησία κάμερας αφής"><small>Σύρε για ματιά · το κράτημα δεν περιστρέφει την κάμερα.</small>';
 const slider=settings.querySelector('input'),value=settings.querySelector('b');slider.value=String(Math.round(sensitivity*100));value.textContent=slider.value+'%';
 slider.addEventListener('input',()=>{sensitivity=Number(slider.value)/100;value.textContent=slider.value+'%';try{localStorage.setItem('mayhem-look',String(sensitivity));}catch{}});
 const pause=document.querySelector('#pauseScreen .modal')||document.querySelector('#pauseScreen');if(pause){pause.append(settings);const profile=document.createElement('button');profile.className='setting-button';profile.textContent='Ο καπετάνιος · προβολή χαρακτήρα';profile.onclick=()=>document.getElementById('captainIdentityButton')?.click();pause.append(profile);}
 function sync(){const can=usable();wheel.hidden=!can;if(!can&&wasEnabled)reset();wasEnabled=can;
  const s=status();buttons.forEach((b,i)=>{b.classList.toggle('unavailable',!allowed(i));b.setAttribute('aria-disabled',String(!allowed(i)));b.classList.toggle('executing',s.attack===actions[i][0]);});
 }
 return {sync,reset,down:e=>{if(!usable()||e.pointerType==='mouse')return false;return begin(e,canvas,false);},move,end,
  inspect:()=>({kind:'relative-swipe',fixedBase:true,sensitivity,active:activePointer!==null,mode,selected,lookEvents,executed}),
  setSensitivity:n=>{sensitivity=Math.max(.4,Math.min(1.4,n));slider.value=String(sensitivity*100);value.textContent=slider.value+'%';}
 };
}
