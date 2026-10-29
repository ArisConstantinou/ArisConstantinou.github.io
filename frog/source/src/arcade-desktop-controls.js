import './arcade-desktop-controls.css';

// These are input indicators, not additional clickable controls.
export const desktopControlsMarkup=`
 <div id="keyboard-display" role="img" aria-label="Κίνηση W A S D, κλωτσιά Q, αλλαγή κάμερας C">
  <kbd class="control-key has-icon" data-key="KeyQ" aria-label="Q: κλωτσιά"><svg viewBox="0 0 32 24" aria-hidden="true"><path d="m7 3 7 2-2 10 13 3 2 4H9l-5-7Z"/><path d="m22 3 1 5m6-2-4 4"/></svg><span>Q</span></kbd>
  <kbd class="control-key" data-key="KeyW">W</kbd>
  <kbd class="control-key" data-key="KeyA">A</kbd>
  <kbd class="control-key" data-key="KeyS">S</kbd>
  <kbd class="control-key" data-key="KeyD">D</kbd>
  <kbd class="control-key has-icon" data-key="KeyC" aria-label="C: αλλαγή κάμερας"><svg viewBox="0 0 32 24" aria-hidden="true"><rect x="3" y="5" width="20" height="15" rx="4"/><path d="m23 10 6-3v11l-6-3M7 2h9"/><circle cx="13" cy="12" r="4"/></svg><span>C</span></kbd>
 </div>
 <svg id="mouse-display" viewBox="0 0 62 92" role="img" aria-label="Ποντίκι: φωτίζεται το κουμπί που κρατάς">
  <rect class="mouse-body" x="3" y="3" width="56" height="86" rx="27"/>
  <path class="mouse-button" data-button="0" d="M29 5C15 5 5 16 5 31v10h24Z"/>
  <path class="mouse-button" data-button="2" d="M33 5c14 0 24 11 24 26v10H33Z"/>
  <rect class="mouse-wheel" x="27" y="15" width="8" height="17" rx="4"/>
  <path class="mouse-seam" d="M7 44h48"/>
 </svg>`;

const arrowAlias={KeyW:'ArrowUp',KeyA:'ArrowLeft',KeyS:'ArrowDown',KeyD:'ArrowRight'};
const mouseBit=button=>button===0?1:button===2?2:0;

export function installDesktopControls(game){
 const root=game.$('desktop-controls');
 if(!root)return {update(){},clear(){},destroy(){}};
 const keys=[...root.querySelectorAll('[data-key]')],mouse=[...root.querySelectorAll('[data-button]')];
 const doc=root.ownerDocument||globalThis.document,view=doc?.defaultView||globalThis;
 let buttons=0,destroyed=false;
 const active=()=>!destroyed&&game.running&&!game.layoutEditing&&!game.touch&&!doc?.hidden;
 const paint=(enabled=true)=>{
  for(const key of keys)key.classList.toggle('is-active',!!(enabled&&(game.keys?.has(key.dataset.key)||game.keys?.has(arrowAlias[key.dataset.key]))));
  for(const part of mouse)part.classList.toggle('is-active',!!(enabled&&(buttons&mouseBit(Number(part.dataset.button)))));
 };
 const clear=()=>{buttons=0;paint(false);};
 const update=()=>{const enabled=active();root.hidden=!enabled;if(!enabled)clear();else paint();};
 const mouseChange=event=>{
  if(!active()){clear();return;}
  // Mouse events, unlike pointerdown/up, report every button in a chord. Keep
  // the native buttons mask authoritative when one button releases first.
  if(Number.isFinite(event.buttons))buttons=event.buttons&3;
  else if(event.type==='mousedown'||event.type==='pointerdown')buttons|=mouseBit(event.button);
  else buttons&=~mouseBit(event.button);
  paint();
 };
 const pointerChange=event=>{
  if(event.pointerType!=='mouse')return;
  // The world prevents pointerdown's default, which can suppress compatibility
  // mouse events. Intermediate chord changes then arrive as pointermove masks.
  if(event.type==='pointermove'&&Number.isFinite(event.buttons)&&(event.buttons&3)===buttons)return;
  mouseChange(event);
 };
 const visibility=()=>{if(doc?.hidden)clear();update();};
 const listeners=[['mousedown',mouseChange],['mouseup',mouseChange],['pointerdown',pointerChange],['pointerup',pointerChange],['pointermove',pointerChange],['blur',clear],['pointercancel',clear]];
 for(const [type,handler] of listeners)view.addEventListener(type,handler,true);
 doc?.addEventListener('visibilitychange',visibility);
 update();
 return {update,clear,destroy(){if(destroyed)return;destroyed=true;clear();root.hidden=true;for(const [type,handler] of listeners)view.removeEventListener(type,handler,true);doc?.removeEventListener('visibilitychange',visibility);}};
}
