// Direct grip of the rendered wheel; no floating steering buttons.
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const WHEEL_TRAVEL=Math.PI*.84;
export const angleDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
export function leverValue(y,top,height){const v=1-2*clamp((y-top)/height,0,1);return Math.abs(v)<.065?0:v<0?v*.35:v;}
export function overlaps(a,b,gap=0){return a.x<b.x+b.w+gap&&a.x+a.w+gap>b.x&&a.y<b.y+b.h+gap&&a.y+a.h+gap>b.y;}
export function leverLayout(w,h,anchor){
 const box={x:w-62,y:Math.max(105,h*.59-90),w:48,h:h<500?158:184};
 const low=84,high=Math.max(low,h-65-box.h);box.y=clamp(box.y,low,high);
 if(!anchor?.visible)return box;
 const a={x:anchor.minX-12,y:anchor.minY-12,w:anchor.maxX-anchor.minX+24,h:anchor.maxY-anchor.minY+24};
 if(overlaps(box,a,8)){
  const candidates=[{...box,y:clamp(a.y-box.h-10,low,high)},{...box,y:clamp(a.y+a.h+10,low,high)},{...box,x:14}];
  const choice=candidates.find(b=>!overlaps(b,a,8));if(choice)return choice;
  return {...box,x:w-62,y:84,h:138};
 }
 return box;
}
export function createHelm({hud,setThrottle,getState,canControl,recenter}){
 const root=document.createElement('section');root.id='helm140';root.setAttribute('aria-label','Χειρισμός πλοίου');
 root.innerHTML=`<div id="wheelHint">ΠΙΑΣΕ ΤΗ ΣΤΕΦΑΝΗ ΚΑΙ ΓΥΡΙΣΕ ΤΟ ΤΙΜΟΝΙ</div><span id="wheelTouchDot"></span><div id="helmPad" role="slider" tabindex="0" aria-label="Τιμόνι αριστερά δεξιά" aria-valuemin="-100" aria-valuemax="100" aria-valuenow="0"><span class="pad-rail"></span><span id="helmThumb"></span><small>ΤΙΜΟΝΙ</small></div><div id="leverShell"><span class="lever-ahead">ΠΡΟΣΩ</span><div id="engineLever" role="slider" tabindex="0" aria-orientation="vertical" aria-label="Πάνω πρόσω, μέση κράτει, κάτω ανάποδα" aria-valuemin="-35" aria-valuemax="100" aria-valuenow="55"><i class="lever-track"></i><i class="lever-zero"></i><span id="leverGrip"><i></i><i></i><i></i></span></div><span class="lever-astern">ΑΝΑΠΟΔΑ</span><div class="lever-foot"><button id="leverNeutral" aria-label="Μηχανές κράτει">N</button><output id="leverPower">55%</output></div></div><div class="helm-status"><b id="helmSpeed">0.0</b><span>kn</span><small id="helmDirection">ΠΡΟΣΩ</small><output id="helmRudder">0°</output></div><div id="helmActions" aria-label="Ενέργειες"></div><button id="recenterHelm" aria-label="Κοίτα ξανά μπροστά">⌖</button><span id="releaseBadge">v1.4.0</span>`;
 hud.append(root);const $=id=>root.querySelector('#'+id);
 for(const id of ['drink','horn','announce','rescue'])$('helmActions').append(document.getElementById(id));
 const pad=$('helmPad'),thumb=$('helmThumb'),lever=$('engineLever'),grip=$('leverGrip'),shell=$('leverShell'),dot=$('wheelTouchDot');
 let steering=null,leverPointer=null,turn=0,mode=-1,anchor=null,layout=null,usedWheel=false;
 const captures=new Map();
 function grab(el,e){e.preventDefault();e.stopPropagation();try{el.setPointerCapture(e.pointerId);captures.set(e.pointerId,el);}catch{}}
 function release(id){const el=captures.get(id);captures.delete(id);try{if(el?.hasPointerCapture(id))el.releasePointerCapture(id);}catch{}}
 function showTurn(v){turn=clamp(v,-1,1);thumb.style.transform=`translateX(${turn*36}px)`;pad.setAttribute('aria-valuenow',String(Math.round(turn*100)));}
 function stopSteer(e){if(!steering||(e&&e.pointerId!==steering.id))return;const id=steering.id;steering=null;showTurn(0);release(id);root.classList.remove('gripping');}
 function beginWheel(e,canvas,hit){
  if(!canControl()||mode!==1||steering||!hit?.visible)return false;
  grab(canvas,e);const a=Math.atan2(e.clientY-hit.y,e.clientX-hit.x);
  steering={id:e.pointerId,kind:'wheel',cx:hit.x,cy:hit.y,angle:a,x:e.clientX,y:e.clientY};
  showTurn(getState().rudder||0);usedWheel=true;root.classList.add('gripping');moveDot(e);return true;
 }
 function moveDot(e){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';}
 function moveWheel(e){
  if(steering?.kind!=='wheel'||e.pointerId!==steering.id)return false;
  e.preventDefault();const a=Math.atan2(e.clientY-steering.cy,e.clientX-steering.cx);
  if(Math.hypot(e.clientX-steering.cx,e.clientY-steering.cy)>16){showTurn(turn+angleDelta(a,steering.angle)/WHEEL_TRAVEL);steering.angle=a;}
  steering.x=e.clientX;steering.y=e.clientY;moveDot(e);return true;
 }
 pad.addEventListener('pointerdown',e=>{if(!canControl()||steering)return;grab(pad,e);const r=pad.getBoundingClientRect();steering={id:e.pointerId,kind:'pad',cx:r.left+r.width/2};showTurn((e.clientX-steering.cx)/36);});
 pad.addEventListener('pointermove',e=>{if(steering?.kind==='pad'&&e.pointerId===steering.id){e.preventDefault();showTurn((e.clientX-steering.cx)/36);}});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])pad.addEventListener(type,stopSteer);
 pad.addEventListener('keydown',e=>{if(canControl()&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();e.stopPropagation();steering={id:-1,kind:'keyboard'};showTurn(e.key==='ArrowLeft'?-1:1);}});
 pad.addEventListener('keyup',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.stopPropagation();stopSteer();}});pad.addEventListener('blur',()=>{if(steering?.kind==='keyboard')stopSteer();});
 function syncLever(value){const v=clamp(value,-.35,1),norm=v<0?v/.35:v;grip.style.top=`${(1-norm)*50}%`;lever.setAttribute('aria-valuenow',String(Math.round(v*100)));lever.setAttribute('aria-valuetext',v===0?'Κράτει':`${v<0?'Ανάποδα':'Πρόσω'} ${Math.round(Math.abs(v)*100)}%`);$('leverPower').textContent=`${v>0?'+':''}${Math.round(v*100)}%`;shell.dataset.gear=v<-.01?'astern':v>.01?'ahead':'neutral';$('leverNeutral').classList.toggle('selected',v===0);}
 function changeLever(e){const r=lever.getBoundingClientRect();setThrottle(leverValue(e.clientY,r.top,r.height));syncLever(getState().throttle);}
 lever.addEventListener('pointerdown',e=>{if(!canControl()||leverPointer!==null)return;grab(lever,e);leverPointer=e.pointerId;lever.classList.add('held');changeLever(e);});
 lever.addEventListener('pointermove',e=>{if(e.pointerId===leverPointer){e.preventDefault();changeLever(e);}});
 function endLever(e){if(e.pointerId!==leverPointer)return;const id=leverPointer;leverPointer=null;lever.classList.remove('held');release(id);}
 for(const type of ['pointerup','pointercancel','lostpointercapture'])lever.addEventListener(type,endLever);
 lever.addEventListener('keydown',e=>{if(!canControl())return;let v=getState().throttle;if(e.key==='ArrowUp')v+=.05;else if(e.key==='ArrowDown')v-=.05;else if(e.key==='Home')v=-.35;else if(e.key==='End')v=1;else return;e.preventDefault();e.stopPropagation();setThrottle(clamp(v,-.35,1));syncLever(clamp(v,-.35,1));});
 $('leverNeutral').addEventListener('click',()=>{if(canControl()){setThrottle(0);syncLever(0);}});$('recenterHelm').addEventListener('click',()=>{reset();recenter();});
 function reset(){stopSteer();const id=leverPointer;leverPointer=null;lever.classList.remove('held');if(id!==null)release(id);showTurn(0);}
 window.addEventListener('blur',reset);window.addEventListener('pagehide',reset);window.addEventListener('resize',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 for(const type of ['contextmenu','selectstart','dragstart'])root.addEventListener(type,e=>e.preventDefault());
 function update(cameraMode,a){
  if(mode!==cameraMode){reset();mode=cameraMode;root.dataset.view=mode===1?'bridge':mode===0?'external':'deck';}
  anchor=a;const s=getState();syncLever(s.throttle);$('helmSpeed').textContent=(Math.abs(s.speed)*1.94384449).toFixed(1);$('helmDirection').textContent=s.throttle<-.01?'ΑΝΑΠΟΔΑ':s.throttle>.01?'ΠΡΟΣΩ':'ΚΡΑΤΕΙ';$('helmRudder').textContent=Math.round(s.rudder*35)+'°';
  const valid=mode===1&&a?.visible;root.classList.toggle('wheel-visible',!!valid);
  const hint=$('wheelHint');hint.style.display=valid&&!usedWheel?'block':'none';
  if(valid){hint.style.left=clamp(a.x,110,hud.clientWidth-110)+'px';hint.style.top=clamp(a.maxY+12,90,hud.clientHeight-105)+'px';}
  if(leverPointer===null){layout=leverLayout(hud.clientWidth,hud.clientHeight,valid?a:null);Object.assign(shell.style,{left:layout.x+'px',top:layout.y+'px',height:layout.h+'px'});}
 }
 return {update,reset,syncLever,beginWheel,moveWheel,endWheel:stopSteer,get turn(){return steering?turn:null;},get visualRudder(){return steering?.kind==='wheel'?turn:null;},get busy(){return steering!==null||leverPointer!==null;},inspect:()=>({turn,steering:!!steering,kind:steering?.kind||null,lever:leverPointer!==null,mode,layout,anchor,usedWheel})};
}
