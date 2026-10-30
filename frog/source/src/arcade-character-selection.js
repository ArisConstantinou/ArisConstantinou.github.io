// Integration draft. Install only after real model portraits and factory are ready.
import {installMenuAction} from './arcade-menu-actions.js';

export function createCharacterRepeat({windowMs=500,now=()=>performance.now()}={}){
 let lastId=null,lastTime=-Infinity;
 return {reset(){lastId=null;lastTime=-Infinity;},activate(id,event={}){
  const direct=event.pointerType==='touch'||event.pointerType==='pen',mouse=event.type==='click'&&event.detail>0;
  if(!direct&&!mouse){this.reset();return false;}
  const time=now(),repeat=id===lastId&&time>=lastTime&&(time-lastTime<=windowMs||mouse&&event.detail>=2);
  lastId=repeat?null:id;lastTime=repeat?-Infinity:time;return repeat;
 }};
}


export const CHARACTER_CHOICES=Object.freeze([
 {id:'heavy',name:'Ο Βαρύς',role:'Δύναμη & απόθεμα',portrait:'./art/cartoon/heavy-card.png',strength:'Περισσότερες μύγες · χτύπημα κοιλιάς',ability:'Βουτιά σώματος μετά το άλμα',tradeoff:'Πιο αργός · χαμηλότερο άλμα',accent:'#a6d558'},
 {id:'skinny',name:'Ο Σβέλτος',role:'Ταχύτητα & ευκινησία',portrait:'./art/cartoon/skinny-card.png',strength:'Ο πιο γρήγορος · κανονικό απόθεμα',ability:'Εναέρια κλωτσιά · ισχυρότερη με διπλό άλμα',tradeoff:'Χωρίς βουτιά σώματος',accent:'#c6a6f2'},
 {id:'medium',name:'Ο Πολυμήχανος',role:'Ευελιξία & διασπορά',portrait:'./art/cartoon/medium-card.png',strength:'Ενδιάμεση κίνηση · κανονικό απόθεμα',ability:'3 μύγες στο άλμα · ακτινωτή ριπή στο διπλό',tradeoff:'Δεν έχει την ωμή δύναμη ή την ταχύτητα των άλλων',accent:'#f3bb67'},
]);

export function installCharacterSelection(game,{ready=Promise.resolve(),onConfirm=()=>{}}={}){
 const doc=game.ui.ownerDocument,panel=doc.createElement('section');
 panel.id='character-selection';panel.className='character-selection';panel.hidden=true;
 panel.setAttribute('aria-describedby','character-selection-help');panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','character-selection-title');
 panel.innerHTML=`<div class="character-selection-shell"><div class="character-selection-heading"><span>ΒΑΛΤΟΜΑΧΙΕΣ</span><h2 id="character-selection-title">Διάλεξε τον βάτραχό σου</h2><p id="character-selection-help" class="character-selection-help">${game.touch?'Ένα πάτημα: επιλογή · Διπλό πάτημα: συνέχεια':'Κλικ: επιλογή · Διπλό κλικ: συνέχεια'}</p></div><div id="character-choices" class="character-choices" role="group" aria-label="Χαρακτήρες">${CHARACTER_CHOICES.map(c=>`<button type="button" class="character-choice" data-character="${c.id}" aria-pressed="false" style="--character-accent:${c.accent}"><span class="character-portrait"><img src="${c.portrait}" alt="${c.name}, ο νέος ${c.id==='heavy'?'πράσινος εύσωμος':c.id==='skinny'?'μοβ λεπτός':'πορτοκαλί μεσαίος'} βάτραχος με τον εξοπλισμό του" draggable="false"></span><strong>${c.name}</strong><span class="character-role">${c.role}</span><span class="character-strength">${c.strength}</span><span class="character-ability">${c.ability}</span><span class="character-tradeoff">${c.tradeoff}</span><span class="character-selected-mark" aria-hidden="true">✓</span></button>`).join('')}</div><p class="character-loading" role="status">Ετοιμάζεται το παιχνίδι…</p><div class="character-selection-actions"><button type="button" class="character-cancel">ΠΙΣΩ</button><button type="button" class="character-confirm" disabled>ΣΤΗ ΜΑΧΗ</button></div></div>`;
 game.ui.append(panel);const cards=[...panel.querySelectorAll('[data-character]')],confirm=panel.querySelector('.character-confirm'),cancel=panel.querySelector('.character-cancel'),status=panel.querySelector('[role=status]');
 let selected='medium',loaded=false,failed=false,priorFocus=null,confirming=false;
 const disposers=[],repeat=createCharacterRepeat(),choices=panel.querySelector('.character-choices');
 function select(id,{focus=false}={}){if(!CHARACTER_CHOICES.some(c=>c.id===id))return;selected=id;for(const card of cards){const active=card.dataset.character===id;card.setAttribute('aria-pressed',String(active));card.tabIndex=active?0:-1;if(active&&focus){card.focus({preventScroll:true});card.scrollIntoView?.({block:'nearest',inline:'nearest'});}}panel.dataset.character=id;}
 function close(){if(panel.hidden)return;repeat.reset();panel.hidden=true;panel.removeAttribute('data-open');priorFocus?.focus?.();}
 for(const card of cards)disposers.push(installMenuAction(card,event=>{if(panel.hidden)return;select(card.dataset.character);if(repeat.activate(card.dataset.character,event))proceed(event);}));
 disposers.push(installMenuAction(cancel,close));
 function proceed(event){if(panel.hidden||!loaded||failed||confirming)return;confirming=true;try{close();onConfirm(selected,event);}finally{confirming=false;}}
 disposers.push(installMenuAction(confirm,proceed));
 const resetRepeat=()=>repeat.reset();choices.addEventListener('scroll',resetRepeat,{passive:true});panel.addEventListener('pointercancel',resetRepeat);disposers.push(()=>{choices.removeEventListener('scroll',resetRepeat);panel.removeEventListener('pointercancel',resetRepeat);});
 function key(event){if(panel.hidden)return;event.stopImmediatePropagation();if(event.key==='Escape'){event.preventDefault();close();return;}
  if(event.key==='Enter'&&cards.includes(doc.activeElement)){event.preventDefault();if(!event.repeat){select(doc.activeElement.dataset.character);proceed(event);}return;}
  const current=cards.findIndex(c=>c.dataset.character===selected);
  if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)&&cards.includes(doc.activeElement)){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?cards.length-1:(current+(event.key==='ArrowRight'?1:cards.length-1))%cards.length;select(cards[next].dataset.character,{focus:true});return;}
  if(event.key==='Tab'){const focusable=[...panel.querySelectorAll('button:not(:disabled)')].filter(b=>b.tabIndex>=0),first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&doc.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&doc.activeElement===last){event.preventDefault();first.focus();}}
 }
 doc.addEventListener('keydown',key,true);
 Promise.resolve(ready).then(()=>Promise.all([...panel.querySelectorAll('img')].map(image=>image.decode()))).then(()=>{loaded=true;confirm.disabled=false;status.hidden=true;panel.dataset.ready='true';}).catch(()=>{failed=true;status.textContent='Δεν φορτώθηκαν οι χαρακτήρες. Η έναρξη νέου γύρου δεν είναι διαθέσιμη.';panel.dataset.ready='false';});
 select(selected);
 return {open(){if(game.running||!panel.hidden)return;repeat.reset();priorFocus=doc.activeElement;game.clearInputs?.();panel.hidden=false;panel.dataset.open='true';select(selected,{focus:true});},close,select,inspect:()=>({open:!panel.hidden,selected,loaded,failed}),destroy(){doc.removeEventListener('keydown',key,true);for(const dispose of disposers)if(typeof dispose==='function')dispose();panel.remove();}};
}
