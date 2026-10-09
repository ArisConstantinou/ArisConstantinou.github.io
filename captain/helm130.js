// Pointer-captured analogue helm. No keyboard events or frame-loop globals.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const arrow=(left)=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${left?'M15 5l-7 7 7 7':'M9 5l7 7-7 7'}"/></svg>`;
export function createHelm({hud,input,setThrottle,active,recenter}) {
  const root=document.createElement('div');root.id='compactHelm';
  root.innerHTML=`<div class="lc-wheel" hidden><button class="lc-arrow lc-port" aria-label="Αριστερά: κράτησε και σύρε">${arrow(true)}</button><div class="lc-wheel-hit" role="slider" tabindex="0" aria-label="Τιμόνι: σύρε αριστερά ή δεξιά" aria-valuemin="-35" aria-valuemax="35" aria-valuenow="0"></div><button class="lc-arrow lc-starboard" aria-label="Δεξιά: κράτησε και σύρε">${arrow(false)}</button><output class="lc-wheel-angle">0°</output></div>
  <div class="lc-pad"><span class="lc-control-caption">ΤΙΜΟΝΙ</span><div class="lc-pad-track" role="slider" tabindex="0" aria-label="Τιμόνι: σύρε αριστερά ή δεξιά" aria-valuemin="-35" aria-valuemax="35" aria-valuenow="0">${arrow(true)}<i class="lc-puck"><span></span></i>${arrow(false)}</div><button class="lc-recenter" hidden>Στο τιμόνι ↗</button></div>
  <div class="lc-engine"><output class="lc-power">ΠΡΟΣΩ 55%</output><span class="lc-ahead">ΠΡΟΣΩ</span><div class="lc-lever" role="slider" tabindex="0" aria-label="Μοχλός μηχανών: πάνω πρόσω, κέντρο κράτει, κάτω ανάποδα" aria-orientation="vertical" aria-valuemin="-35" aria-valuemax="100" aria-valuenow="55"><div class="lc-lever-rail"></div><span class="lc-zero">0</span><i class="lc-lever-grip"><span></span></i></div><span class="lc-astern">ΑΝΑΠΟΔΑ</span><button class="lc-neutral" aria-label="Μηχανές κράτει">ΚΡΑΤΕΙ</button></div>
  <div class="lc-dock"><div class="lc-speed"></div><div class="lc-actions"></div><small class="lc-version">1.3.0 · TOUCH HELM</small></div>`;
  hud.append(root);document.getElementById('announce').querySelector('b').textContent='ΜΙΛΑ';
  const $=s=>root.querySelector(s),wheel=$('.lc-wheel'),hit=$('.lc-wheel-hit'),pad=$('.lc-pad'),padTrack=$('.lc-pad-track'),lever=$('.lc-lever'),grip=$('.lc-lever-grip');
  for(const id of ['drink','horn','announce','rescue']){const el=document.getElementById(id);if(el)$('.lc-actions').append(el);}
  const speed=document.querySelector('.speed-readout');if(speed)$('.lc-speed').append(speed);
  let held=null,enginePointer=null,turn=0,mode=-1,wheelX=0,wheelY=0,radius=65;
  const captures=new Map();
  function capture(el,e){try{el.setPointerCapture(e.pointerId);captures.set(e.pointerId,el);}catch{}}
  function paintTurn(value){turn=clamp(value,-1,1);root.style.setProperty('--helm-turn',turn);root.classList.toggle('lc-steering',held!==null);for(const el of [hit,padTrack])el.setAttribute('aria-valuenow',String(Math.round(turn*35)));}
  function endSteer(e){if(!held||(e&&e.pointerId!==held.id))return;const id=held.id;held=null;paintTurn(0);release(id);}
  function release(id){const el=captures.get(id);captures.delete(id);try{if(el?.hasPointerCapture(id))el.releasePointerCapture(id);}catch{}}
  function beginSteer(e,kind,side=0){
    if(!active()||held||(e.pointerType==='mouse'&&e.button!==0))return;
    e.preventDefault();e.stopPropagation();
    const rect=padTrack.getBoundingClientRect();
    held={id:e.pointerId,x:e.clientX,y:e.clientY,base:side*.72,kind,range:kind==='pad'?rect.width*.38:Math.max(65,radius)};
    if(kind==='pad'){held.x=rect.left+rect.width/2;held.base=0;}
    capture(e.currentTarget,e);paintTurn(held.base+(e.clientX-held.x)/held.range);
  }
  function moveSteer(e){if(!held||e.pointerId!==held.id)return;e.preventDefault();paintTurn(held.base+(e.clientX-held.x)/held.range);}
  for(const [el,kind,side] of [[hit,'wheel',0],[$('.lc-port'),'arrow',-1],[$('.lc-starboard'),'arrow',1],[padTrack,'pad',0]]){
    el.addEventListener('pointerdown',e=>beginSteer(e,kind,side));el.addEventListener('pointermove',moveSteer);
    for(const event of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(event,endSteer);
    el.addEventListener('keydown',e=>{if(!active())return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();held={id:-1};paintTurn(e.key==='ArrowLeft'?-1:1);}});
    el.addEventListener('keyup',()=>endSteer());el.addEventListener('blur',()=>{if(held?.id===-1)endSteer();});
  }
  function throttleAt(e){const rect=lever.getBoundingClientRect(),travel=rect.height/2-15;let value=clamp((rect.top+rect.height/2-e.clientY)/travel,-1,1);if(Math.abs(value)<.085)value=0;setThrottle(value<0?value*.35:value);paintPower();}
  function paintPower(){const value=clamp(input.throttle,-.35,1),normal=value<0?value/.35:value;grip.style.top=`calc(50% - ${normal} * (50% - 15px))`;lever.setAttribute('aria-valuenow',String(Math.round(value*100)));const label=value===0?'ΚΡΑΤΕΙ':`${value>0?'ΠΡΟΣΩ':'ΑΝΑΠΟΔΑ'} ${Math.round(Math.abs(value)*100)}%`;$ ('.lc-power').textContent=label;lever.setAttribute('aria-valuetext',label);root.dataset.power=value>0?'ahead':value<0?'astern':'neutral';}
  lever.addEventListener('pointerdown',e=>{if(!active()||enginePointer!==null||(e.pointerType==='mouse'&&e.button!==0))return;e.preventDefault();e.stopPropagation();enginePointer=e.pointerId;capture(lever,e);root.classList.add('lc-engine-held');throttleAt(e);});
  lever.addEventListener('pointermove',e=>{if(e.pointerId===enginePointer){e.preventDefault();throttleAt(e);}});
  function endEngine(e){if(enginePointer===null||(e&&e.pointerId!==enginePointer))return;const id=enginePointer;enginePointer=null;root.classList.remove('lc-engine-held');release(id);}
  for(const event of ['pointerup','pointercancel','lostpointercapture'])lever.addEventListener(event,endEngine);
  lever.addEventListener('keydown',e=>{if(!active())return;let delta=0;if(e.key==='ArrowUp')delta=.1;if(e.key==='ArrowDown')delta=-.1;if(delta||e.key==='Home'){e.preventDefault();e.stopPropagation();setThrottle(e.key==='Home'?0:input.throttle+delta);paintPower();}});
  $('.lc-neutral').addEventListener('click',()=>{if(active()){setThrottle(0);paintPower();}});$('.lc-recenter').addEventListener('click',recenter);
  function reset(){endSteer();endEngine();paintTurn(0);}
  window.addEventListener('blur',reset);window.addEventListener('resize',reset);window.addEventListener('orientationchange',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
  root.addEventListener('contextmenu',e=>e.preventDefault());root.addEventListener('selectstart',e=>e.preventDefault());
  function update({cameraMode,anchor,rudder=0}) {
    if(mode!==cameraMode){reset();mode=cameraMode;root.dataset.camera=String(mode);}
    const immersive=mode===1&&anchor?.visible;
    root.dataset.immersive=String(!!immersive);wheel.hidden=!immersive;pad.hidden=immersive;$('.lc-recenter').hidden=mode!==1||immersive;
    if(immersive&&held===null){wheelX=anchor.x;wheelY=anchor.y;radius=anchor.r;wheel.style.left=wheelX+'px';wheel.style.top=wheelY+'px';root.style.setProperty('--wheel-y',wheelY+'px');wheel.style.setProperty('--wheel-radius',radius+'px');}
    $('.lc-wheel-angle').textContent=`${Math.round(rudder*35)}°`;
    paintPower();
  }
  return {update,reset,get active(){return held!==null;},get turn(){return turn;},get debug(){return {version:'1.3.0',mode,turn,steering:held!==null,engine:enginePointer!==null,wheelVisible:!wheel.hidden,wheel:{x:wheelX,y:wheelY,r:radius},throttle:input.throttle};}};
}
