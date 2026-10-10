// One input scheme drives movement, interactions and the entire HUD.
export function installMovementHints(root,canPlay){
 const pad=root.querySelector('#chaosMove'),tutorial=root.querySelector('#chaosTutorial');
 const guide=document.createElement('div');guide.id='keyboardMovement';guide.setAttribute('aria-label','Κίνηση με W A S D');guide.innerHTML='<span class="movement-title">ΚΙΝΗΣΗ</span><div class="movement-key-grid">'+[['W','KeyW','ΜΠΡΟΣΤΑ'],['A','KeyA','ΑΡΙΣΤΕΡΑ'],['S','KeyS','ΠΙΣΩ'],['D','KeyD','ΔΕΞΙΑ']].map(([k,c,t])=>`<kbd data-code="${c}">${k}<small>${t}</small></kbd>`).join('')+'</div><span class="movement-run"><kbd data-code="ShiftLeft">SHIFT</kbd> ΤΡΕΞΙΜΟ</span>';root.append(guide);
 const fine=matchMedia('(hover: hover) and (pointer: fine)'),coarse=matchMedia('(pointer: coarse)');
 const pressed=new Set(),aliases={ArrowUp:'KeyW',ArrowLeft:'KeyA',ArrowDown:'KeyS',ArrowRight:'KeyD',ShiftRight:'ShiftLeft'};
 let scheme='',lastTouch=-10000,used=false;
 function render(){guide.querySelectorAll('[data-code]').forEach(el=>el.classList.toggle('pressed',[...pressed].some(c=>(aliases[c]||c)===el.dataset.code)));}
 function reset(){pressed.clear();render();}
 function setScheme(value){if(value===scheme)return;scheme=value;root.dataset.controlScheme=value;document.documentElement.dataset.inputScheme=value;guide.setAttribute('aria-hidden',String(value!=='keyboard'));pad.setAttribute('aria-hidden',String(value!=='touch'));tutorial.textContent=value==='touch'?'Σύρε αριστερά για κίνηση · δεξιά για ματιά':'W A S D · Shift τρέξιμο · ποντίκι για ματιά · TAB δείκτης';reset();root.dispatchEvent(new CustomEvent('schemechange'));}
 document.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.pointerType==='pen'){lastTouch=performance.now();used=true;setScheme('touch');}else if(e.pointerType==='mouse'&&!e.sourceCapabilities?.firesTouchEvents&&performance.now()-lastTouch>1200){used=true;setScheme('keyboard');}},{capture:true,passive:true});
 window.addEventListener('keydown',e=>{if(e.target?.closest?.('input,textarea,select,[contenteditable="true"]'))return;if(!canPlay())return;if(/^(Key[WASDFEVQRCXZG]|Digit[1-9]|Numpad[1-9]|Arrow|Shift)/.test(e.code)){used=true;setScheme('keyboard');pressed.add(e.code);render();}});
 window.addEventListener('keyup',e=>{pressed.delete(e.code);render();});window.addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 const initial=()=>((navigator.maxTouchPoints>0&&(coarse.matches||!fine.matches))?'touch':'keyboard');
 fine.addEventListener('change',()=>{if(!used)setScheme(initial());});setScheme(initial());return {reset,get scheme(){return scheme;}};
}
const bounded=v=>Math.round(Math.max(0,Math.min(100,Number(v)||0)));
export function installChapterHUD(root,movement){
 const $=id=>root.querySelector('#'+id),vitals=document.createElement('section');vitals.id='captainVitals';vitals.setAttribute('aria-label','Κατάσταση καπετάνιου');
 vitals.innerHTML=[['Life','♥','ΖΩΗ'],['Drunk','🥃','ΜΕΘΗ'],['Custody','▣','ΣΥΛΛΗΨΗ']].map(([id,icon,title])=>`<div class="vital vital-${id.toLowerCase()}"><span class="vital-label"><i aria-hidden="true">${icon}</i><span id="vital${id}Label">${title}</span><b id="vital${id}Value">0%</b></span><div class="vital-track" id="vital${id}Meter" role="progressbar" aria-label="${title}" aria-valuemin="0" aria-valuemax="100"><i id="vital${id}Fill"></i></div><small id="vital${id}Note"></small></div>`).join('');root.append(vitals);
 const use=$('chaosUse');use.innerHTML='<kbd>F</kbd><span class="use-icon" aria-hidden="true">💬</span><span class="use-copy"><strong>ΠΛΗΣΙΑΣΕ</strong><small>Άνθρωπο ή αντικείμενο</small></span>';
 const leave=$('leaveHelm');leave.innerHTML='<kbd>F</kbd><span aria-hidden="true">↪</span><strong>ΒΓΕΣ ΑΠΟ ΤΗ ΓΕΦΥΡΑ</strong>';
 let current=null;
 function meter(id,value,note){value=bounded(value);$('vital'+id+'Value').textContent=value+'%';$('vital'+id+'Fill').style.width=value+'%';$('vital'+id+'Meter').setAttribute('aria-valuenow',String(value));$('vital'+id+'Note').textContent=note;}
 function labelButton(id,icon,label){const el=$(id);if(!el)return;const key=el.querySelector('kbd')?.outerHTML||'';el.innerHTML=key+`<span aria-hidden="true">${icon}</span><strong>${label}</strong>`;el.setAttribute('aria-label',label);}
 for(const args of [['chaosBlock','🛡','ΜΠΛΟΚ'],['chaosGrab','✊','ΠΑΡΕ'],['chaosThrow','↗','ΠΕΤΑ'],['chaosDrink','🥃','ΠΙΕ']])labelButton(...args);
 function adapt(){const touch=movement.scheme==='touch';leave.querySelector('strong').textContent=touch?'ΕΞΟΔΟΣ':'ΒΓΕΣ ΑΠΟ ΤΗ ΓΕΦΥΡΑ';
  const help=document.getElementById('helpPanel');
  if(help&&help.dataset.scheme173!==movement.scheme){
   if(!help.dataset.desktop173)help.dataset.desktop173='<p><b>ΚΑΤΑΣΤΡΩΜΑ:</b> Ποντίκι για ματιά. M1 χαστούκι, M2 γροθιά, Q βαρύ χαστούκι, E κλωτσιά, C κράτημα για μπλοκ. F αλληλεπίδραση, X πάρε/άφησε, R πέτα, Z ποτό, G φτύσιμο. TAB ελεύθερος δείκτης, Esc παύση. Οι αριθμοί 1–9 λειτουργούν επίσης.</p>'+help.innerHTML;
   help.innerHTML=touch?'<p><b>ΣΤΟ ΚΑΤΑΣΤΡΩΜΑ:</b> Κίνηση με το αριστερό χειριστήριο. Σύρε στην ελεύθερη δεξιά πλευρά για να κοιτάξεις γύρω. Σύρε στο κέντρο του κύκλου για ματιά. Σταμάτα το δάχτυλο για να σταματήσει η κάμερα. Άγγιξε τον εξωτερικό δακτύλιο για χτύπημα· σύρε πάνω του για επιλογή και άφησε.</p><p><b>ΑΛΛΗΛΕΠΙΔΡΑΣΗ:</b> Πλησίασε και κοίτα τον στόχο. Το φωτισμένο κουμπί δείχνει ΜΙΛΑ, ΠΑΡΕ, ΠΙΕ ή ΠΕΤΑ ανάλογα με το τι μπορείς να κάνεις. Κράτησε το ΜΠΛΟΚ για άμυνα, ακόμη και ενώ κινείσαι.</p><p><b>MAYHEM:</b> Σπάσε γυάλινες πόρτες για περάσματα. Πιάσε πυροσβεστήρα και πάτησε ΨΕΚΑΣΕ για κάλυψη. ΜΑΝΟΥΒΡΑ για κλίση. Η καταδίωξη σβήνει όταν δεν σε βλέπουν. Δεν υπάρχει υποχρεωτικό κελί.</p><p><b>ΣΤΗ ΓΕΦΥΡΑ:</b> Πιάσε το ίδιο το τιμόνι και γύρισέ το κυκλικά. Σύρε τον δεξιό μοχλό πάνω για πρόσω, στη μέση για κράτει και κάτω για ανάποδα. Οι ενέργειες έχουν δικά τους κουμπιά αφής.</p><p>Η ήπια κάμερα περιορίζει τη ζάλη χωρίς να αλλάζει τη μέθη.</p>':help.dataset.desktop173;
   help.dataset.scheme173=movement.scheme;
  }const profile=document.getElementById('captainIdentityButton');if(profile)profile.textContent=touch?'ΚΑΠΕΤΑΝΙΟΣ':'V · ΚΑΠΕΤΑΝΙΟΣ';const neutral=document.getElementById('leverNeutral');if(neutral)neutral.textContent=touch?'■':'N';root.querySelectorAll('button[title],button[data-key-title]').forEach(el=>{if(!el.dataset.keyTitle)el.dataset.keyTitle=el.title;if(touch)el.removeAttribute('title');else el.title=el.dataset.keyTitle;});}
 function update(s,voyage,target,held,p,nearby){
  current={s,voyage,target,held,p,nearby};const touch=movement.scheme==='touch',terminal=['arrested','cell'].includes(s.phase);
  meter('Life',s.health,'Αντοχή '+bounded(s.stamina)+'%');meter('Drunk',voyage.intox,s.pendingAlcohol>1?'Ανεβαίνει σταδιακά':voyage.intox>70?'Πολύ μεθυσμένος':voyage.intox>20?'Ζαλισμένος':'Νηφάλιος');
  const jailed=s.phase==='cell',arrested=s.phase==='arrested';meter('Custody',jailed||arrested?100:s.capture||0,jailed?'Στο κελί':arrested?'Μεταφορά στο κελί':nearby?nearby+' φύλακες κοντά':s.phase==='security'?'Σε καταδιώκουν':s.alarmAt!==null?'Ασφάλεια σε '+Math.max(0,Math.ceil(s.alarmAt-s.time))+'″':'Δεν σε κρατούν');
  $('vitalCustodyLabel').textContent=jailed?'ΚΕΛΙ':'ΣΥΛΛΗΨΗ';vitals.dataset.danger=s.health<30||s.capture>50?'true':'false';
  let goal='ΜΙΑ ΓΟΥΛΙΑ ΜΟΝΟ.',detail=touch?'Πάτησε ΠΙΕ. Μετά βγες από τη γέφυρα.':'Z για μία γουλιά. Μετά F για έξοδο.';
  if(s.sips&&s.phase==='helm'){goal='ΑΣΕ ΤΟ ΤΙΜΟΝΙ.';detail=touch?'Πάτησε ΕΞΟΔΟΣ και ακολούθησε τη σκάλα.':'F · Βγες και ακολούθησε τη σκάλα.';}
  if(s.phase==='descend'){goal='ΚΑΤΕΒΑ ΣΤΟ ΚΑΤΑΣΤΡΩΜΑ.';detail=p.y>17?'Δεξιά πόρτα → εξωτερική σκάλα.':p.y>11?'Συνέχισε μέχρι κάτω.':'Στρίψε αριστερά προς το μπαρ.';}
  if(s.phase==='deck'){goal='ΠΡΟΚΑΛΕΣΕ ΧΑΟΣ.';detail=touch?'Χτύπα, πιες ή πιάσε ένα αντικείμενο.':'M1 / M2 χτυπήματα · Q / E βαρύ χτύπημα / κλωτσιά';}
  if(s.phase==='security'){goal=s.capture>0?'ΣΕ ΑΚΙΝΗΤΟΠΟΙΟΥΝ!':'Η ΑΣΦΑΛΕΙΑ ΕΦΤΑΣΕ.';detail=s.capture>0?'Απομακρύνσου πριν γεμίσει η ΣΥΛΛΗΨΗ.':touch?'Κινήσου ή κράτα πατημένο το ΜΠΛΟΚ.':'Κινήσου · κράτα C για μπλοκ.';}
  if(arrested){goal='ΣΥΝΕΛΗΦΘΗΣ.';detail='Η ασφάλεια σε μεταφέρει στο κελί.';}
  if(jailed){goal='ΣΤΟ ΚΕΛΙ ΤΟΥ ΠΛΟΙΟΥ.';detail='Πάτησε ΣΥΝΕΧΕΙΑ για να ξεκινήσεις την απόδραση.';}
  $('chapterGoal').textContent=goal;$('chapterDetail').textContent=detail;
  let icon='⌖',label='ΠΛΗΣΙΑΣΕ',hint='Άνθρωπο ή αντικείμενο',action=null;
  if(held){icon='↗';label='ΠΕΤΑ';hint=held.label;action='throw';}
  else if(p.y>17&&Math.hypot(p.x-1.2,p.z-44.4)<2.3&&s.chaos===0){icon='⚓';label='ΠΑΡΕ ΤΟ ΤΙΜΟΝΙ';hint='Επιστροφή στη γέφυρα';action='helm';}
  else if(target?.type==='person'){icon='💬';label=target.item.guard?'ΜΙΛΑ ΣΤΟΝ ΦΥΛΑΚΑ':'ΜΙΛΑ';hint=target.item.actor.profile?.name||'Επιβάτης';action='talk';}
  else if(target?.type==='prop'){const o=target.item;if(o.type==='bar'){icon='🥃';label='ΠΙΕ';hint='Μπαρ καταστρώματος';action='drink';}else if(o.type==='release'){icon='🛟';label='ΚΑΤΕΒΑΣΕ ΛΕΜΒΟ';hint='Ειδοποιείται η ασφάλεια';action='release';}else if(o.grab){icon='✊';label='ΠΑΡΕ';hint=o.label;action='grab';}else{icon='✋';label='ΧΤΥΠΑ';hint=o.label;action='hit';}}
  use.dataset.action=action||'';use.disabled=!action||!s.foot||terminal;use.classList.toggle('available',!!action);use.querySelector('.use-icon').textContent=icon;use.querySelector('strong').textContent=label;use.querySelector('small').textContent=hint;
  const cleanTarget=target?.type==='prop'?({'bar':'ΜΠΑΡ','release':'ΣΩΣΙΒΙΑ ΛΕΜΒΟΣ'}[target.item.type]||target.item.label):target?.item.actor.profile?.name||'';$('targetReadout').textContent=cleanTarget;
  $('chaosThrow').disabled=!held||terminal;$('chaosGrab').disabled=terminal||(!held&&!(target?.type==='prop'&&target.item.grab));$('chaosDrink').disabled=terminal||!s.visited||voyage.drinkCooldown>0;$('chaosBlock').disabled=terminal||!s.visited;
  $('chaosPolice').textContent=jailed?'ΚΡΑΤΗΣΗ ΠΛΟΙΟΥ':arrested?'ΣΥΛΛΗΨΗ ΟΛΟΚΛΗΡΩΘΗΚΕ':s.phase==='security'?'ΑΣΦΑΛΕΙΑ ΣΤΟ ΚΑΤΑΣΤΡΩΜΑ':s.alarmAt!==null?'ΑΣΦΑΛΕΙΑ ΣΕ '+Math.max(0,Math.ceil(s.alarmAt-s.time))+'″':'ΧΩΡΙΣ ΣΥΝΑΓΕΡΜΟ';
  adapt();
 }
 root.addEventListener('schemechange',()=>{if(current)update(...Object.values(current));else adapt();});
 return {update,get action(){return use.dataset.action;}};
}
