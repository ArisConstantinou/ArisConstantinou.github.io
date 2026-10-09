// LAST CALL 1.3.0: CSS-pixel controls with independent pointer ownership.
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function leverValue(y,top,height){const v=1-2*clamp((y-top)/height,0,1);return Math.abs(v)<.065?0:v<0?v*.35:v;}
export function createHelm({hud,setThrottle,getState,canControl,recenter}){
 const root=document.createElement('section');root.id='helm130';root.setAttribute('aria-label','Χειρισμός πλοίου');
 root.innerHTML=`<button id="helmLeft" class="wheel-arrow" aria-label="Τιμόνι αριστερά: κράτα και σύρε"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M20 6 10 16l10 10"/></svg></button><button id="helmRight" class="wheel-arrow" aria-label="Τιμόνι δεξιά: κράτα και σύρε"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m12 6 10 10-10 10"/></svg></button><div id="helmPad" role="slider" tabindex="0" aria-label="Τιμόνι: σύρε αριστερά ή δεξιά" aria-valuemin="-100" aria-valuemax="100" aria-valuenow="0"><span class="pad-rail"></span><span id="helmThumb"></span><small>ΤΙΜΟΝΙ</small></div><div id="leverShell"><span class="lever-ahead">ΠΡΟΣΩ</span><div id="engineLever" role="slider" tabindex="0" aria-orientation="vertical" aria-label="Μοχλός: πάνω πρόσω, μέση κράτει, κάτω ανάποδα" aria-valuemin="-35" aria-valuemax="100" aria-valuenow="55"><i class="lever-track"></i><i class="lever-zero"></i><span id="leverGrip"><i></i><i></i><i></i></span></div><span class="lever-astern">ΑΝΑΠΟΔΑ</span><button id="leverNeutral" aria-label="Μηχανές κράτει">N</button><output id="leverPower">55%</output></div><div class="helm-status"><b id="helmSpeed">0.0</b><span>kn</span><small id="helmDirection">ΠΡΟΣΩ</small><output id="helmRudder">0°</output></div><div id="helmActions" aria-label="Ενέργειες"></div><button id="recenterHelm" aria-label="Κοίτα ξανά μπροστά" title="Κοίτα μπροστά">⌖</button><span id="releaseBadge">v1.3.0</span>`;
 hud.append(root);const $=id=>root.querySelector('#'+id);
 for(const id of ['drink','horn','announce','rescue'])$('helmActions').append(document.getElementById(id));
 const left=$('helmLeft'),right=$('helmRight'),pad=$('helmPad'),thumb=$('helmThumb'),lever=$('engineLever'),grip=$('leverGrip');
 let steering=null,leverPointer=null,turn=0,mode=-1,lastLayout=null;
 const captures=new Map();
 const grab=(el,e)=>{e.preventDefault();e.stopPropagation();try{el.setPointerCapture(e.pointerId);captures.set(e.pointerId,el);}catch{}};
 const release=id=>{const el=captures.get(id);captures.delete(id);try{if(el?.hasPointerCapture(id))el.releasePointerCapture(id);}catch{}};
 function showTurn(v){turn=clamp(v,-1,1);thumb.style.transform=`translateX(${turn*36}px)`;pad.setAttribute('aria-valuenow',String(Math.round(turn*100)));left.classList.toggle('held',turn<-.01);right.classList.toggle('held',turn>.01);}
 function stopSteer(e){if(!steering||(e&&e.pointerId!==steering.id))return;const id=steering.id;steering=null;showTurn(0);release(id);}
 function begin(e,el,side){if(!canControl()||steering)return;grab(el,e);const r=pad.getBoundingClientRect();const initial=side===0?clamp((e.clientX-r.left-r.width/2)/36,-1,1):side*.58;steering={id:e.pointerId,startX:e.clientX,start:initial,kind:side===0?'pad':'arrow'};showTurn(initial);}
 for(const [el,side] of [[left,-1],[right,1],[pad,0]]){
  el.addEventListener('pointerdown',e=>begin(e,el,side));
  el.addEventListener('pointermove',e=>{if(!steering||e.pointerId!==steering.id)return;e.preventDefault();showTurn(steering.start+(e.clientX-steering.startX)/(steering.kind==='pad'?36:72));});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(type,stopSteer);
  el.addEventListener('keydown',e=>{if(canControl()&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();e.stopPropagation();showTurn(e.key==='ArrowLeft'?-1:1);steering={id:-1,kind:'keyboard'};}});
  el.addEventListener('keyup',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.stopPropagation();stopSteer();}});
  el.addEventListener('blur',()=>{if(steering?.kind==='keyboard')stopSteer();});
 }
 function syncLever(value){const v=clamp(value,-.35,1),norm=v<0?v/.35:v;grip.style.top=`${(1-norm)*50}%`;lever.setAttribute('aria-valuenow',String(Math.round(v*100)));lever.setAttribute('aria-valuetext',v===0?'Κράτει':`${v<0?'Ανάποδα':'Πρόσω'} ${Math.round(Math.abs(v)*100)}%`);$('leverPower').textContent=`${v>0?'+':''}${Math.round(v*100)}%`;$('leverShell').dataset.gear=v<-.01?'astern':v>.01?'ahead':'neutral';$('leverNeutral').classList.toggle('selected',v===0);}
 function changeLever(e){const r=lever.getBoundingClientRect(),v=leverValue(e.clientY,r.top,r.height);setThrottle(v);syncLever(v);}
 lever.addEventListener('pointerdown',e=>{if(!canControl()||leverPointer!==null)return;grab(lever,e);leverPointer=e.pointerId;lever.classList.add('held');changeLever(e);});
 lever.addEventListener('pointermove',e=>{if(e.pointerId!==leverPointer)return;e.preventDefault();changeLever(e);});
 const endLever=e=>{if(e.pointerId!==leverPointer)return;const id=leverPointer;leverPointer=null;lever.classList.remove('held');release(id);};
 for(const type of ['pointerup','pointercancel','lostpointercapture'])lever.addEventListener(type,endLever);
 lever.addEventListener('keydown',e=>{let v=getState().throttle;if(e.key==='ArrowUp')v+=.05;else if(e.key==='ArrowDown')v-=.05;else if(e.key==='Home')v=-.35;else if(e.key==='End')v=1;else return;e.preventDefault();e.stopPropagation();setThrottle(clamp(v,-.35,1));syncLever(clamp(v,-.35,1));});
 $('leverNeutral').addEventListener('click',()=>{if(canControl()){setThrottle(0);syncLever(0);}});$('recenterHelm').addEventListener('click',recenter);
 function reset(){stopSteer();const id=leverPointer;leverPointer=null;lever.classList.remove('held');if(id!==null)release(id);showTurn(0);}
 window.addEventListener('blur',reset);window.addEventListener('pagehide',reset);window.addEventListener('resize',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 for(const type of ['contextmenu','selectstart','dragstart'])root.addEventListener(type,e=>e.preventDefault());
 function place(el,x,y){el.style.left=x+'px';el.style.top=y+'px';}
 function update(cameraMode,anchor){
  if(mode!==cameraMode){reset();mode=cameraMode;root.dataset.view=mode===1?'bridge':mode===0?'external':'deck';}
  const s=getState();syncLever(s.throttle);$('helmSpeed').textContent=(Math.abs(s.speed)*1.94384449).toFixed(1);$('helmDirection').textContent=s.throttle<-.01?'ΑΝΑΠΟΔΑ':s.throttle>.01?'ΠΡΟΣΩ':'ΚΡΑΤΕΙ';$('helmRudder').textContent=Math.round(s.rudder*35)+'°';
  if(mode===1&&!steering){const w=hud.clientWidth,h=hud.clientHeight,valid=anchor&&Number.isFinite(anchor.x)&&anchor.visible;root.classList.toggle('wheel-offscreen',!valid);const x=valid?clamp(anchor.x,76,w-76):w*.45,y=valid?clamp(anchor.y,Math.min(230,h*.45),h-112):h-132,radius=valid?clamp(anchor.radius+22,57,Math.min(w*.37,190)):57,lx=clamp(x-radius,30,w-94),rx=clamp(x+radius,94,w-30);place(left,lx,y);place(right,rx,y);lastLayout={x,y,radius,left:lx,right:rx,projected:!!valid};}
 }
 return {update,reset,syncLever,get turn(){return steering?turn:null;},get busy(){return steering!==null||leverPointer!==null;},inspect:()=>({turn,steering:steering!==null,lever:leverPointer!==null,mode,layout:lastLayout})};
}
