/* HUD release 0.4.6 over the unchanged 0.4.4 gameplay core. Fixed game bindings
 * only: no typing history, persistence, network or generated gameplay input. */
const GROUPS=[
 ['move','ΚΙΝΗΣΗ',[
  ['KeyW','W','Εμπρός'],['KeyA','A','Αριστερά'],['KeyS','S','Πίσω'],['KeyD','D','Δεξιά'],
  ['ArrowUp','↑','Εμπρός'],['ArrowLeft','←','Αριστερά'],['ArrowDown','↓','Πίσω'],['ArrowRight','→','Δεξιά'],
  ['ShiftLeft|ShiftRight','Shift','Sprint'],['ControlLeft|ControlRight','Ctrl','Αθόρυβα'],['Space','Space','Άλμα']]],
 ['actions','ΕΡΓΑΛΕΙΑ & ΧΑΡΑΚΤΗΡΑΣ',[
  ['KeyT','T','Εργαλείο'],['KeyE','E','Σύνδεση'],['KeyR','R','Αναγέμιση'],['KeyF','F','Τοίχος'],['KeyX','X','Σβήσιμο'],['AltLeft|AltRight','Alt','Τόξο'],
  ['KeyB','B','Διαδρομή'],['KeyG','G','Λαβή'],['KeyV','V','Κλίση'],['KeyC','C','Κάμερα'],['KeyI','I','Εξοπλισμός'],['Escape','Esc','Παύση']]],
 ['zones','ΠΕΡΙΟΧΗ ΣΤΟΧΕΥΣΗΣ',[
  ['Digit1','1','Κεφάλι'],['Digit2','2','Κορμός'],['Digit3','3','Χέρια'],['Digit4','4','Πόδια']]]
];
function keyHTML([codes,key,label]){return `<div class="iv-key" data-iv-codes="${codes}"><b>${key}</b><small>${label}</small><i></i></div>`;}
function section([id,title,keys]){return `<section class="iv-group iv-${id}"><h4>${title}</h4><div class="iv-keys">${keys.map(keyHTML).join('')}</div></section>`;}
export class InputVisualizer {
 constructor(){
  this.held=new Set();this.mask=0;this.allowed=new Set(GROUPS.flatMap(g=>g[2].flatMap(k=>k[0].split('|'))));
  const hud=document.getElementById('hud');
  const left=document.createElement('aside');left.id='inputKeyboard';left.className='iv-panel';
  left.setAttribute('aria-label','Ζωντανή ένδειξη πλήκτρων');
  left.innerHTML=`<header><span>ΠΛΗΚΤΡΟΛΟΓΙΟ</span><i>LIVE</i></header>${section(GROUPS[0])}${section(GROUPS[1])}`;
  const right=document.createElement('aside');right.id='inputMouse';right.className='iv-panel';
  right.setAttribute('aria-label','Ζωντανή ένδειξη ποντικιού');
  right.innerHTML=`<header><span>ΠΟΝΤΙΚΙ</span><i>LIVE</i></header>
   <div class="iv-mouse-wrap"><div class="iv-mouse" aria-hidden="true">
    <div class="iv-mouse-left" data-iv-button="1"><b>L</b></div><div class="iv-mouse-right" data-iv-button="2"><b>R</b></div>
    <div class="iv-wheel" data-iv-button="4"><i></i></div><div class="iv-palm"><span>Β</span></div>
   </div><div class="iv-mouse-legend"><p><b>L</b> Βολή<br><small>Κράτημα: φόρτιση</small></p><p><b>R</b> Σύνδεση<br><small>Χρήση / αφήνω</small></p><p><b>M</b> Μεσαίο<br><small>Ένδειξη μόνο</small></p></div></div>
   ${section(GROUPS[2])}`;
  hud.append(left,right);
  this.keys=[...left.querySelectorAll('[data-iv-codes]'),...right.querySelectorAll('[data-iv-codes]')].map(el=>({el,codes:el.dataset.ivCodes.split('|')}));
  this.buttons=[...right.querySelectorAll('[data-iv-button]')];
  // Paint after game handlers have selected their input device or opened menus.
  window.addEventListener('keydown',e=>{if(!this.allowed.has(e.code))return;queueMicrotask(()=>{if(this.enabled())this.held.add(e.code);this.paintKeys();});});
  window.addEventListener('keyup',e=>{this.held.delete(e.code);this.paintKeys();});
  const read=e=>{if(e.pointerType==='touch'||e.sourceCapabilities?.firesTouchEvents)return;const mask=e.buttons||0;queueMicrotask(()=>this.paintMouse(this.enabled()?mask:0));};
  // A mouse chord has only one pointerdown and one pointerup. Also observe
  // button-mask changes in pointermove, plus unsuppressed Mouse Events.
  for(const name of ['pointerdown','pointermove','pointerup','mousedown','mouseup','mousemove'])document.addEventListener(name,read);
  document.addEventListener('pointercancel',e=>{if(e.pointerType!=='touch')this.paintMouse(0);},true);
  document.addEventListener('pointerlockchange',()=>{if(!document.pointerLockElement)this.paintMouse(0);});
  const reset=()=>this.clear();window.addEventListener('blur',reset);window.addEventListener('pagehide',reset);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
  this.observer=new MutationObserver(()=>{if(!this.enabled())this.clear();});
  this.observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-input-mode']});
  for(const el of [hud,...document.querySelectorAll('.screen')])this.observer.observe(el,{attributes:true,attributeFilter:['class']});
 }
 enabled(){return !document.hidden&&document.documentElement.dataset.inputMode!=='touch'&&!document.getElementById('hud').classList.contains('hidden')&&!document.querySelector('.screen:not(.hidden)');}
 paintKeys(){const active=this.enabled();for(const {el,codes} of this.keys)el.classList.toggle('iv-down',active&&codes.some(code=>this.held.has(code)));}
 paintMouse(mask){this.mask=mask;for(const el of this.buttons)el.classList.toggle('iv-down',!!(mask&Number(el.dataset.ivButton)));}
 clear(){this.held.clear();this.paintKeys();this.paintMouse(0);}
}
new InputVisualizer();
