import {aerialAttack} from './arcade-character-classes.js';
import {canAirVolley} from './arcade-air-movement.js';
const icon=paths=>'<svg viewBox="0 0 32 32" aria-hidden="true">'+paths+'</svg>';
export const airControlsMarkup='<button id="jump-button" type="button" class="touch-action air-action" aria-label="Άλμα, δεύτερο πάτημα στον αέρα για διπλό άλμα">'+icon('<path d="M5 25Q16 2 27 25M11 10l5-6 5 6"/><path d="M7 28h18"/>')+'<span>ΑΛΜΑ ×2</span></button><button id="dash-button" type="button" class="touch-action air-action" aria-label="Dash προς τον μοχλό κίνησης, ή μπροστά αν είναι ελεύθερος">'+icon('<path d="M3 13h12M1 19h11M12 7h9l8 9-8 9h-9l8-9Z"/>')+'<span>DASH</span></button><button id="air-volley-button" type="button" class="touch-action air-action" aria-label="Τρεις μύγες προς τα κάτω στην κάθοδο" hidden>'+icon('<path d="M16 3v25m-4-4 4 4 4-4M12 7 3 24m0-6v6h6M20 7l9 17m-6 0h6v-6"/>')+'<span>3 ΚΑΤΩ</span></button>';
export function installAirControls(game){
 const pending={jump:false,dash:false,volley:false,mobileDash:false};let airQHeld=false;
 const root=game.$('desktop-controls'),hint=document.createElement('div');hint.id='air-volley-hint';hint.hidden=true;hint.setAttribute('role','status');root?.append(hint);
 const reset=()=>{pending.jump=pending.dash=pending.volley=pending.mobileDash=false;airQHeld=false;hint.hidden=true;if(game.state.actors[0].flight)game.state.actors[0].flight.queued=false;};
 const previousClear=game.clearInputs.bind(game);game.clearInputs=()=>{reset();previousClear();};
 const active=e=>game.running&&!game.layoutEditing&&!e.target?.matches?.('input,select,textarea,[contenteditable="true"]');
 const down=e=>{
  if(!active(e))return;
  const p=game.state.actors[0],space=e.code==='Space',shift=['ShiftLeft','ShiftRight'].includes(e.code),airQ=e.code==='KeyQ'&&(!!p.flight||pending.jump||pending.dash||airQHeld);
  if(!space&&!shift&&!airQ){if(!e.repeat&&['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)&&(game.keys.has('ShiftLeft')||game.keys.has('ShiftRight')))pending.dash=true;return;}
  e.preventDefault();e.stopImmediatePropagation();game.keys.add(e.code);
  if(e.repeat)return;
  if(space)pending.jump=true;else if(shift)pending.dash=true;else{pending.volley=true;airQHeld=true;}
 };
 const up=e=>{if(e.code==='KeyQ')airQHeld=false;};
 addEventListener('keydown',down,true);addEventListener('keyup',up,true);
 const contacts=new Map(),buttons=[['jump-button','jump'],['dash-button','dash'],['air-volley-button','volley']];
 for(const [id,action] of buttons){const button=game.$(id);button.addEventListener('pointerdown',e=>{
  if(!game.running||game.layoutEditing||button.disabled||contacts.has(id)||e.pointerType==='mouse'&&e.button!==0)return;
  e.preventDefault();e.stopPropagation();contacts.set(id,e.pointerId);button.setPointerCapture?.(e.pointerId);pending[action]=true;if(action==='dash')pending.mobileDash=true;
 });for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,e=>{if(contacts.get(id)===e.pointerId){contacts.delete(id);if(button.hasPointerCapture?.(e.pointerId))button.releasePointerCapture(e.pointerId);}});
 button.addEventListener('click',e=>{if(e.detail===0&&game.running&&!game.layoutEditing&&!button.disabled){pending[action]=true;if(action==='dash')pending.mobileDash=true;}});
 }
 const original=game.currentInput.bind(game);game.currentInput=()=>{
  const input=original(),p=game.state.actors[0],inAir=!!p.flight||pending.jump||pending.dash;
  Object.assign(input,{jump:pending.jump,dash:pending.dash,airVolley:pending.volley});
  if(pending.dash&&pending.mobileDash&&Math.hypot(input.mx||0,input.mz||0)<.08){input.mx=Math.sin(game.cameraYaw);input.mz=Math.cos(game.cameraYaw);}
  if(inAir||airQHeld){input.kick=false;delete input.kickTargetId;game.kickBuffer.clear();}
  if(pending.volley||p.flight?.queued)input.fire=false;
  pending.jump=pending.dash=pending.volley=pending.mobileDash=false;return input;
 };
 const clear=game.clearInputs.bind(game);game.clearInputs=()=>{for(const [id,pointer] of contacts){const button=game.$(id);if(button.hasPointerCapture?.(pointer))button.releasePointerCapture(pointer);}contacts.clear();clear();};
 let visibility='';
 const updateHUD=game.updateHUD.bind(game);game.updateHUD=()=>{
  updateHUD();const p=game.state.actors[0],perched=p.support?.kind==='rock',rockBusy=!!p.flight?.rockTarget,ready=canAirVolley(game.state,p),queued=!!p.flight?.queued;
  game.$('touch-controls').classList.toggle('airborne-actions',!!p.flight);
  const mounted=!!p.catapultId,blocked=p.ko||p.eliminated||p.dizzyTime>0||p.knockUp>0;
  const jump=game.$('jump-button'),dash=game.$('dash-button'),volley=game.$('air-volley-button');
  jump.hidden=false;dash.hidden=mounted&&!game.layoutEditing;
  jump.disabled=!game.layoutEditing&&(blocked||mounted||rockBusy||p.flight?.jumps>=2);
  dash.disabled=!game.layoutEditing&&(blocked||mounted||perched||rockBusy||p.dashCooldown>0||p.flight?.dashed===true);
  volley.hidden=!game.layoutEditing&&(!game.touch||(!ready&&!queued));
  volley.disabled=!game.layoutEditing&&(!ready||queued);
  jump.querySelector('span').textContent=perched||rockBusy?'ΑΛΜΑ':'ΑΛΜΑ ×2';jump.setAttribute('aria-label',perched?'Νέο άλμα από τον βράχο προς το έδαφος ή άλλον βράχο':rockBusy?'Προσγείωση στον βράχο':'Άλμα, δεύτερο πάτημα στον αέρα για διπλό άλμα');
  const plan=aerialAttack(p),label=plan?.kind==='bodySlam'?'ΒΟΥΤΙΑ':plan?.kind==='airKick'?'ΚΛΩΤΣΙΑ':plan?.count===8?'ΑΣΤΕΡΙ ×8':'3 ΚΑΤΩ';
  volley.querySelector('span').textContent=queued?'ΕΤΟΙΜΟ':label;volley.setAttribute('aria-label',plan?.kind==='bodySlam'?'Χτύπημα με το σώμα στην προσγείωση':plan?.kind==='airKick'?'Εναέρια κλωτσιά':plan?.count===8?'Ακτινωτή ριπή οκτώ μυγών':'Τρεις μύγες προς τα κάτω');
  const next=[jump.hidden,dash.hidden,volley.hidden].join();if(next!==visibility){visibility=next;game.touchLayout?.refresh();}
  hint.hidden=!game.running||game.layoutEditing||game.touch||(!ready&&!queued&&!perched);
  if(!hint.hidden)hint.textContent=perched?'SPACE · ΑΛΜΑ ΑΠΟ ΤΟΝ ΒΡΑΧΟ':'Q · '+(queued?'ΕΤΟΙΜΟ ΣΤΗΝ ΚΑΘΟΔΟ':label);
  const q=root?.querySelector('[data-key="KeyQ"]');if(q){q.classList.toggle('air-ready',ready);q.setAttribute('aria-label',ready?'Q: '+label:p.characterClass==='heavy'?'Q: χτύπημα κοιλιάς':'Q: κλωτσιά');}
 };
 return {reset,destroy(){removeEventListener('keydown',down,true);removeEventListener('keyup',up,true);hint.remove();}};
}
