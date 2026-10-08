/* Two independent thumbs. Inner right disc aims, outer ring is the trigger.
   Native touch IDs are never replaced by an unrelated changedTouches event. */
const prevent=e=>{if(e.cancelable)e.preventDefault();};
export class Input{
 constructor(canvas,game){this.canvas=canvas;this.game=game;this.keys=new Set;this.move=[0,0];this.aim=[0,0];this.ring=false;this.mouse=[0,0];this.mouseActive=false;this.left=false;this.right=false;this.up=0;this.owners=new Map;this.slots=new Set;this.touch=matchMedia('(pointer:coarse)').matches;this.lastTouch=0;this.mode(this.touch);
  for(const type of['selectstart','contextmenu','dragstart','copy','cut','paste'])document.addEventListener(type,prevent,{capture:true,passive:false});document.addEventListener('selectionchange',()=>{const s=getSelection();if(s?.rangeCount)s.removeAllRanges();});
  window.addEventListener('keydown',e=>{
   // Ctrl/Command/Alt belong to the browser, not to flight or game actions.
   // Cancel held desktop input first; shortcuts must not also move/reload/fire.
   if(e.ctrlKey||e.metaKey||e.altKey||/^(Control|Meta|Alt)/.test(e.code)){
    this.keys.clear();this.left=this.right=false;game.chargeRelease(true);return;
   }
   if(e.isComposing||e.target?.closest?.('input,select,textarea,[contenteditable]:not([contenteditable="false"])'))return;
   const map={KeyC:'camera',KeyM:'map',Escape:'pause',KeyR:'reload',KeyB:'craft',KeyF:'collect',KeyH:'clean'};
   const movement=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyX','KeyQ','KeyE','ShiftLeft','ShiftRight'];
   if(!game.running||(!map[e.code]&&!movement.includes(e.code)))return;
   this.mode(false);
   // Space/arrow defaults (including focused-button activation) are suppressed
   // only for active play. Tab and unrelated browser keys are left alone.
   if(game.playing()){prevent(e);this.keys.add(e.code);}
   if(e.repeat)return;
   if(map[e.code])game.action(map[e.code]);
   if(e.code==='Space'&&game.playing()&&game.player?.grounded)game.action('jump');
  });
  window.addEventListener('keyup',e=>this.keys.delete(e.code));
  document.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||performance.now()-this.lastTouch<600)return;this.mode(false);if(e.target!==canvas||!game.playing())return;this.mouse=[e.clientX,e.clientY];this.mouseActive=true;if(e.button===0)this.left=true;if(e.button===2)this.right=true;if(game.fps&&!document.pointerLockElement)try{canvas.requestPointerLock()?.catch(()=>{});}catch{};prevent(e);});
  document.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||performance.now()-this.lastTouch<600)return;this.mouse=[e.clientX,e.clientY];this.mouseActive=true;if(document.pointerLockElement===canvas&&game.fps&&game.playing())game.look(-e.movementX*.0025,-e.movementY*.0025);if(e.buttons===0){this.left=false;if(this.right){this.right=false;game.chargeRelease(true);}}});
  document.addEventListener('pointercancel',e=>{if(e.pointerType==='touch')return;this.left=this.right=false;game.chargeRelease(true);});
  document.addEventListener('pointerup',e=>{if(e.pointerType==='touch')return;if(e.button===0)this.left=false;if(e.button===2&&this.right){this.right=false;game.chargeRelease();}});
  canvas.addEventListener('wheel',e=>{if(game.playing()){prevent(e);game.zoom=Math.max(.65,Math.min(1.6,game.zoom+e.deltaY*.0007));}},{passive:false});
  document.addEventListener('touchstart',e=>{this.lastTouch=performance.now();this.mode(true);let handled=false;for(const t of e.changedTouches){const target=t.target.closest('[data-stick],[data-act],canvas');if(!target)continue;const kind=target.dataset.stick||target.dataset.act||'look';if(this.slots.has(kind)||(!game.playing()&&(target===canvas||['move','aim','up','down','charge'].includes(kind))))continue;const r=target.getBoundingClientRect(),o={kind,el:target,x:r.x+r.width/2,y:r.y+r.height/2,r:r.width/2,last:[t.clientX,t.clientY],start:[t.clientX,t.clientY],moved:false};this.owners.set(t.identifier,o);this.slots.add(kind);if(kind==='up'||kind==='down')this.syncVertical();if(kind==='charge')this.right=true;this.updateTouch(o,t);handled=true;}if(handled)prevent(e);},{capture:true,passive:false});
  document.addEventListener('touchmove',e=>{let handled=false;for(const t of e.changedTouches){const o=this.owners.get(t.identifier);if(o){this.updateTouch(o,t);handled=true;}}if(handled)prevent(e);},{capture:true,passive:false});
  for(const type of['touchend','touchcancel'])document.addEventListener(type,e=>{let handled=false;for(const t of e.changedTouches){const o=this.owners.get(t.identifier);if(!o)continue;this.owners.delete(t.identifier);this.slots.delete(o.kind);const cancel=type==='touchcancel';if(['move','aim'].includes(o.kind)){this[o.kind]=[0,0];o.el.querySelector('i').style.transform='';if(o.kind==='aim'){this.ring=false;o.el.classList.remove('firing');}}else if(o.kind==='up'||o.kind==='down'){this.syncVertical();}else if(o.kind==='charge'){this.right=false;game.chargeRelease(cancel);}else if(o.kind==='look'){if(!cancel&&!o.moved&&!game.fps)game.tap(t.clientX,t.clientY);}else if(!cancel){this.action(o.kind);}handled=true;}if(handled)prevent(e);this.lastTouch=performance.now();},{capture:true,passive:false});
  for(const b of document.querySelectorAll('[data-act]'))b.addEventListener('click',e=>{if(performance.now()-this.lastTouch<700){prevent(e);return;}this.action(b.dataset.act);});
  window.addEventListener('blur',()=>{if(!this.touch)this.suspend();});document.addEventListener('visibilitychange',()=>{if(document.hidden)this.suspend();});window.addEventListener('pagehide',()=>this.suspend());window.addEventListener('resize',()=>{this.ring=false;this.right=false;this.game.charge=0;for(const o of this.owners.values()){const r=o.el.getBoundingClientRect();o.x=r.x+r.width/2;o.y=r.y+r.height/2;o.r=r.width/2;}});
 }
 mode(touch){if(this.touch!==touch){this.clear();this.touch=touch;}document.documentElement.dataset.inputMode=touch?'touch':'desktop';}
 // Altitude controls are momentary: press starts immediately, release brakes.
 // Up + Down held together means neutral, releasing only one leaves the other.
 syncVertical(){this.up=(this.slots.has('up')?1:0)-(this.slots.has('down')?1:0);for(const [id,v]of [['upBtn',1],['downBtn',-1]]){const b=document.getElementById(id);b.classList.toggle('active',this.up===v);b.setAttribute('aria-pressed',String(this.up===v));}}
 action(name){if(name==='up'||name==='down')return;this.game.action(name);}
 updateTouch(o,t){const dx=t.clientX-o.x,dy=t.clientY-o.y,dist=Math.hypot(dx,dy);if(o.kind==='move'||o.kind==='aim'){const dead=.12,mag=Math.max(0,Math.min(1,dist/(o.r*.60))-dead)/(1-dead);this[o.kind]=dist?[dx/dist*mag,dy/dist*mag]:[0,0];if(o.kind==='aim'){this.ring=dist/o.r>(this.ring?.72:.86);o.el.classList.toggle('firing',this.ring);}const travel=Math.min(dist,o.r*.78),x=dist?dx/dist*travel:0,y=dist?dy/dist*travel:0;o.el.querySelector('i').style.transform=`translate(${x}px,${y}px)`;}else if(o.kind==='look'){if(Math.hypot(t.clientX-o.start[0],t.clientY-o.start[1])>8)o.moved=true;if(this.game.fps&&this.game.playing())this.game.look(-(t.clientX-o.last[0])*.004,-(t.clientY-o.last[1])*.004);}o.last=[t.clientX,t.clientY];}
 clear(){this.keys.clear();this.move=[0,0];this.aim=[0,0];this.ring=false;this.left=this.right=false;this.up=0;this.owners.clear();this.slots.clear();this.syncVertical();for(const s of document.querySelectorAll('[data-stick]')){s.querySelector('i').style.transform='';s.classList.remove('firing');}}
 suspend(){this.clear();this.game.charge=0;if(this.game.playing())this.game.action('pause');}
}
