// Viewport profiles keep movement controls stable when class abilities appear.
export const UI_LAYOUT_KEY='frog-ui-layout-v2';
export const UI_ITEMS={move:['.move-zone','Κίνηση'],aim:['.aim-zone','Στόχευση'],fire:['#fire-button','Πυρ'],jump:['#jump-button','Άλμα ×2'],dash:['#dash-button','Dash'],kick:['#kick-button','Κλωτσιά'],volley:['#air-volley-button','Επίθεση αέρα'],ammo:['.ammo-card','Μύγες'],bases:['.base-card','Αποθήκες'],pause:['#pause-button','Παύση'],clock:['#match-clock','Χρόνος'],map:['#minimap','Χάρτης'],camera:['#view-button','Κάμερα'],goals:['#objectives-toggle','Στόχοι'],fps:['#fps-counter','FPS'],status:['#base-status','Κατάσταση'],notice:['#callout','Ειδοποιήσεις'],round:['#round-status','Προετοιμασία / KO'],dizzy:['#dizzy-banner','Ζάλη'],keyboard:['#keyboard-display','Πλήκτρα'],mouse:['#mouse-display','Ποντίκι'],interact:['#catapult-button','Είσοδος / έξοδος'],sabotage:['#sabotage-button','Καταστροφή'],catapultStatus:['#catapult-status','Κατάσταση καταπέλτη'],sabotageStatus:['#sabotage-status','Πρόοδος καταστροφής']};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const layoutMode=(w,h,touch)=>touch?(h>=w?'portrait':'landscape'):'desktop';
export function readUILayout(raw){
 const result={version:2,desktop:{},portrait:{},landscape:{}};
 try{const value=JSON.parse(raw);if(value?.version===2)for(const mode of ['desktop','portrait','landscape'])for(const key of Object.keys(UI_ITEMS)){const p=value[mode]?.[key];if(Number.isFinite(p?.x)&&Number.isFinite(p?.y))result[mode][key]={x:clamp(p.x,0,1),y:clamp(p.y,0,1)};}}catch{}
 return result;
}
export function defaultUILayout(w,h,touch,insets={}){
 const mode=layoutMode(w,h,touch),p={},left=12+(insets.left||0),right=w-12-(insets.right||0),top=8+(insets.top||0),bottom=h-20-(insets.bottom||0);
 const put=(key,x,y,width,height)=>p[key]={x,y,width,height};
 if(mode==='portrait'){
  const small=w<360,map=small?84:92,ammoLeft=left+98,pauseX=right-44,ammoWidth=pauseX-8-ammoLeft;
  put('ammo',ammoLeft,top,ammoWidth,52);put('pause',pauseX,top,44,44);
  put('bases',left,top+72,small?62:74,55);put('clock',left+(small?74:86),top+72,w-(small?194:210),55);put('map',right-map,top+72,map,map);
  put('camera',right-map,top+80+map,map,44);put('goals',right-map,top+132+map,map,44);
  put('fps',left,top+135,114,48);put('status',left,top+191,Math.min(214,w-map-36),58);
  put('move',left,bottom-128,128,128);put('fire',right-80,bottom-80,80,80);put('jump',right-64,bottom-156,64,64);put('dash',right-156,bottom-64,64,64);put('kick',right-156,bottom-140,64,64);put('volley',right-156,bottom-140,64,64);
  put('aim',right-120,bottom-282,120,120);
 }else if(mode==='landscape'){
  const map=h<=360?84:100,ammoWidth=w<760?180:220;
  put('ammo',left+80,top,ammoWidth,52);put('map',right-map,top,map,map);put('pause',right-map-52,top,44,44);put('bases',right-map-134,top,74,55);
  put('clock',(w-180)/2,w<820?top+64:top,180,55);put('camera',right-map,top+map+8,map,44);put('goals',right-map-100,top+map+8,92,44);
  put('fps',left,top+62,114,48);put('status',left,top+118,214,58);
  put('move',left,bottom-116,116,116);put('fire',right-72,bottom-72,72,72);put('jump',right-144,bottom-60,60,60);put('dash',right-216,bottom-60,60,60);put('kick',right-144,bottom-132,60,60);put('volley',right-144,bottom-132,60,60);
  put('aim',right-344,bottom-120,120,120);
 }else{
  put('ammo',120,20,w<1200?270:318,104);put('bases',right-336,20,107,80);put('pause',right-221,20,53,53);put('clock',(w-180)/2,20,180,65);put('map',right-160,20,160,160);put('camera',right-160,190,160,44);put('goals',right-160,242,160,46);put('fps',20,136,120,50);put('status',20,194,240,58);put('keyboard',24,h-168,144,144);put('mouse',right-62,h-116,62,92);
 }
 put('notice',(w-Math.min(380,w-40))/2,mode==='portrait'?top+270:top+134,Math.min(380,w-40),44);
 put('round',(w-Math.min(230,w-40))/2,mode==='portrait'?top+320:top+184,Math.min(230,w-40),65);
 put('dizzy',(w-Math.min(260,w-40))/2,h*.45,Math.min(260,w-40),60);
 put('interact',w*.3,h-92,64,64);put('sabotage',w*.4,h-92,64,64);put('catapultStatus',w*.3,h*.6,180,44);put('sabotageStatus',w*.3,h*.7,180,44);
 return p;
}
export function positionUILayout(defaults,preferred,w,h,insets={}){
 const result={};for(const [key,b]of Object.entries(defaults)){const v=preferred?.[key];result[key]={...b,x:clamp(v?v.x*w-b.width/2:b.x,4+(insets.left||0),Math.max(4,w-b.width-4-(insets.right||0))),y:clamp(v?v.y*h-b.height/2:b.y,4+(insets.top||0),Math.max(4,h-b.height-4-(insets.bottom||0)))};}return result;
}
const worldItems=new Set(['interact','sabotage','catapultStatus','sabotageStatus']);
const intersects=(a,b)=>a.x<b.x+b.width+6&&a.x+a.width>b.x-6&&a.y<b.y+b.height+6&&a.y+a.height>b.y-6;
// Only repair unsafe legacy touch preferences. Newly saved v2 positions are free.
export function migrateTouchLayout(raw,saved,w,h,touch){
 if(!touch)return saved;let old;try{old=JSON.parse(raw);}catch{return saved;}if(old?.version!==1)return saved;
 const mode=layoutMode(w,h,true),defaults=defaultUILayout(w,h,true),next=structuredClone(saved),blocks=['ammo','bases','pause','clock','map','camera','goals'].map(k=>defaults[k]);
 for(const key of ['move','aim','fire','jump','dash','volley']){const v=old[mode]?.[key];if(!Number.isFinite(v?.x)||!Number.isFinite(v?.y)||!defaults[key])continue;const box=positionUILayout({[key]:defaults[key]},{[key]:v},w,h)[key];if(!blocks.some(b=>intersects(box,b))){next[mode][key]={x:(box.x+box.width/2)/w,y:(box.y+box.height/2)/h};blocks.push(box);}else blocks.push(defaults[key]);}
 return next;
}
export function installUILayout(game){
 const doc=game.ui.ownerDocument,view=doc.defaultView,items=Object.fromEntries(Object.entries(UI_ITEMS).map(([key,[selector]])=>[key,doc.querySelector(selector)]).filter(([,el])=>el));
 game.touchLayout?.destroy();game.ui.classList.add('has-ui-layout');
 const entry=game.$('layout-button');entry.className='ui-layout-entry';entry.innerHTML='<span aria-hidden="true">↔</span> ΘΕΣΕΙΣ ΚΟΥΜΠΙΩΝ & UI';entry.setAttribute('aria-label','Επεξεργασία θέσεων κουμπιών και HUD');entry.removeAttribute('aria-pressed');
 const settings=game.$('settings-panel'),section=doc.createElement('section');section.className='ui-layout-settings';section.innerHTML='<h3>Διάταξη παιχνιδιού</h3><p>Μετακίνησε κουμπιά, χάρτη και ενδείξεις πάνω στο παγωμένο παιχνίδι. Ξεχωριστές θέσεις για κάθε προσανατολισμό.</p>';section.append(entry);settings.insertBefore(section,game.$('settings-back'));game.$('layout-hint')?.remove();
 const editor=doc.createElement('section');editor.id='ui-layout-editor';editor.hidden=true;editor.setAttribute('aria-label','Επεξεργασία διάταξης παιχνιδιού');editor.setAttribute('role','dialog');editor.setAttribute('aria-modal','true');editor.innerHTML='<div class="ui-layout-toolbar"><strong class="ui-layout-grip" tabindex="0">↔ Διάταξη · Παύση</strong><label>Στοιχείο <select id="ui-layout-select"></select></label><p>Σύρε το πλαίσιο ή επίλεξε στοιχείο. Βελάκια: μικρή μετακίνηση.</p><div class="ui-layout-actions"><button id="ui-layout-reset" type="button">Επαναφορά</button><button id="ui-layout-cancel" type="button">Άκυρο</button><button id="ui-layout-save" type="button">Αποθήκευση</button></div><span id="ui-layout-feedback" role="status" aria-live="polite"></span></div><div class="ui-layout-handles"></div>';doc.body.append(editor);
 const select=editor.querySelector('select'),handlesRoot=editor.querySelector('.ui-layout-handles'),toolbar=editor.querySelector('.ui-layout-toolbar'),feedback=editor.querySelector('#ui-layout-feedback'),handles={};
 const readStorage=key=>{try{return view.localStorage.getItem(key);}catch{return null;}};
 let editing=false,saved=readUILayout(readStorage(UI_LAYOUT_KEY)),draft=null,positions={},signature='',frame=0,selected='jump',snapshot=null,drag=null,migrated=new Set();
 const removers=[],listen=(el,name,fn,options)=>{el.addEventListener(name,fn,options);removers.push(()=>el.removeEventListener(name,fn,options));};
 const mode=()=>layoutMode(view.innerWidth,view.innerHeight,game.touch);
 const eligible=key=>game.touch?!['keyboard','mouse'].includes(key):!['move','aim','fire','jump','dash','kick','volley'].includes(key);
 const choose=key=>{selected=key;select.value=key;for(const[k,e]of Object.entries(handles))e.classList.toggle('selected',key===k);};
 for(const[key,el]of Object.entries(items)){
  const handle=doc.createElement('button');handle.type='button';handle.className='ui-layout-handle';handle.dataset.item=key;handle.textContent=UI_ITEMS[key][1];handle.setAttribute('aria-label','Μετακίνηση: '+UI_ITEMS[key][1]);handlesRoot.append(handle);handles[key]=handle;
  listen(handle,'pointerdown',e=>{if(!editing)return;e.preventDefault();choose(key);const p=positions[key];drag={key,id:e.pointerId,x:e.clientX,y:e.clientY,px:p.x,py:p.y};handle.setPointerCapture(e.pointerId);});
  listen(handle,'pointermove',e=>{if(!drag||drag.key!==key||drag.id!==e.pointerId)return;e.preventDefault();move(key,drag.px+e.clientX-drag.x,drag.py+e.clientY-drag.y);});
  for(const name of ['pointerup','pointercancel','lostpointercapture'])listen(handle,name,()=>{drag=null;});
 }
 function insets(){const css=view.getComputedStyle(game.$('touch-controls')),r={};for(const side of ['left','right','top','bottom'])r[side]=parseFloat(css.getPropertyValue('--touch-safe-'+side))||0;return r;}
 function paint(key){const p=positions[key],el=items[key];if(!p||!el)return;el.classList.add('ui-positioned');el.style.setProperty('--ui-x',p.x+'px');el.style.setProperty('--ui-y',p.y+'px');el.style.setProperty('--ui-width',p.width+'px');el.style.setProperty('--ui-height',p.height+'px');const handle=handles[key];if(handle){handle.style.left=p.x+'px';handle.style.top=p.y+'px';handle.style.width=p.width+'px';handle.style.height=p.height+'px';}}
 function move(key,x,y){const p=positions[key],w=view.innerWidth,h=view.innerHeight,edge=insets();p.x=clamp(x,4+edge.left,Math.max(4,w-p.width-4-edge.right));p.y=clamp(y,4+edge.top,Math.max(4,h-p.height-4-edge.bottom));draft[mode()][key]={x:(p.x+p.width/2)/w,y:(p.y+p.height/2)/h};paint(key);}
 function preparePreview(){
  for(const[key,el]of Object.entries(items))if(eligible(key)){el.hidden=false;el.dataset.layoutPreview='true';}
  game.$('touch-controls').hidden=!game.touch;game.$('desktop-controls').hidden=game.touch;game.$('arcade-hud').hidden=false;game.ui.classList.remove('in-menu');game.$('arcade-menu').hidden=true;
 }
 function refresh(){
  view.cancelAnimationFrame(frame);frame=0;signature='';apply();
 }
 function apply(){
  const w=view.innerWidth,h=view.innerHeight,current=mode(),mounted=!!game.state.actors[0].catapultId,aimVisible=!items.aim?.hidden;
  if(!editing){const kick=items.kick;const hide=game.touch&&(!items.volley.hidden||kick.disabled);kick.classList.toggle('ui-context-replaced',hide);}
  const key=[w,h,current,editing,mounted,aimVisible].join(':');if(key===signature)return;signature=key;
  if(!editing&&!migrated.has(current)){
   migrated.add(current);if(!readStorage(UI_LAYOUT_KEY))saved=migrateTouchLayout(readStorage('frog-touch-layout-v1'),saved,w,h,game.touch);
  }
  const defaults=defaultUILayout(w,h,game.touch,insets());
  // Aiming context owns an extra pad; normal jump/dash never reflow by class.
  if(game.touch&&aimVisible&&!editing){const b=h-20-(insets().bottom||0),right=w-12-(insets().right||0);defaults.aim={x:right-120,y:b-120,width:120,height:120};defaults.fire={x:right-204,y:b-72,width:72,height:72};defaults.jump={x:right-276,y:b-60,width:60,height:60};defaults.dash={x:right-348,y:b-60,width:60,height:60};defaults.kick=defaults.volley={x:right-204,y:b-144,width:60,height:60};if(h>=w){defaults.move={x:12+(insets().left||0),y:b-116,width:116,height:116};defaults.dash={x:right-276,y:b-132,width:60,height:60};}}
  positions=positionUILayout(defaults,(editing?draft:saved)[current],w,h,insets());
  for(const key of Object.keys(items)){
   const el=items[key];handles[key].hidden=!editing||!eligible(key);if(!eligible(key))continue;if(worldItems.has(key)&&!editing&&!saved[current][key]){el.classList.remove('ui-positioned');continue;}
   if(key==='fire'&&items.aim.contains(el)&&!editing){el.classList.remove('ui-positioned');continue;}paint(key);
  }
  if(editing){for(const key of Object.keys(items))handles[key].hidden=!eligible(key);choose(eligible(selected)?selected:(game.touch?'jump':'ammo'));}
 }
 function setEditing(value){if(Boolean(value)===editing)return;if(value)open();else close(false);}
 function open(){
  snapshot={hidden:new Map([...Object.values(items),game.$('touch-controls'),game.$('arcade-hud'),game.$('desktop-controls'),game.$('arcade-menu')].map(el=>[el,el.hidden])),inMenu:game.ui.classList.contains('in-menu'),focus:doc.activeElement,scroll:settings.scrollTop,queued:game.state.actors[0].flight?.queued};
  draft=structuredClone(saved);editing=true;game.layoutEditing=true;game.clearInputs();if(game.state.actors[0].flight)game.state.actors[0].flight.queued=snapshot.queued;game.accumulator=0;game.releaseMouseLook();game.sound.pause();game.renderer.setAnimationLoop(null);
  select.replaceChildren();for(const[key]of Object.entries(items))if(eligible(key)){const option=doc.createElement('option');option.value=key;option.textContent=UI_ITEMS[key][1];select.append(option);}
  game.ui.classList.add('ui-layout-editing');doc.body.classList.add('editing-game-ui');editor.hidden=false;feedback.textContent='';preparePreview();refresh();game.renderActors(0);game.renderer.render(game.scene,game.camera);game.drawLabels();select.focus({preventScroll:true});
 }
 function close(save){
  if(!editing)return;
  if(save){try{view.localStorage.setItem(UI_LAYOUT_KEY,JSON.stringify(draft));saved=draft;}catch{feedback.textContent='Δεν αποθηκεύτηκε. Ο αποθηκευτικός χώρος δεν είναι διαθέσιμος.';return;}}
  editing=false;game.layoutEditing=false;drag=null;editor.hidden=true;game.ui.classList.remove('ui-layout-editing');doc.body.classList.remove('editing-game-ui');
  for(const[el,hidden]of snapshot.hidden){el.hidden=hidden;delete el.dataset.layoutPreview;}
  game.ui.classList.toggle('in-menu',snapshot.inMenu);game.last=performance.now();game.accumulator=0;signature='';apply();settings.scrollTop=snapshot.scroll;entry.focus({preventScroll:true});game.renderer.setAnimationLoop(now=>game.frame(now));if(game.running)game.sound.resume();snapshot=null;
 }
 listen(doc,'focusin',e=>{if(editing&&!editor.contains(e.target))select.focus({preventScroll:true});});
 listen(entry,'click',open);listen(select,'change',()=>choose(select.value));listen(editor.querySelector('#ui-layout-save'),'click',()=>close(true));listen(editor.querySelector('#ui-layout-cancel'),'click',()=>close(false));
 function reset(){if(!editing)return;draft[mode()]={};refresh();feedback.textContent='Επαναφορά μόνο της τρέχουσας διάταξης. Πάτησε Αποθήκευση.';}
 listen(editor.querySelector('#ui-layout-reset'),'click',reset);
 listen(view,'keydown',e=>{if(!editing)return;if(e.code==='Escape'){e.preventDefault();e.stopImmediatePropagation();close(false);return;}if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.code)||e.target===select)return;e.preventDefault();e.stopImmediatePropagation();const p=positions[selected],n=e.shiftKey?10:2;move(selected,p.x+(e.code==='ArrowLeft'?-n:e.code==='ArrowRight'?n:0),p.y+(e.code==='ArrowUp'?-n:e.code==='ArrowDown'?n:0));},true);
 // Toolbar can be moved away from any control the user wants to edit.
 const grip=editor.querySelector('.ui-layout-grip');let panelDrag=null;
 listen(grip,'pointerdown',e=>{e.preventDefault();const r=toolbar.getBoundingClientRect();panelDrag={id:e.pointerId,x:e.clientX,y:e.clientY,left:r.left,top:r.top};grip.setPointerCapture(e.pointerId);});
 listen(grip,'pointermove',e=>{if(!panelDrag||panelDrag.id!==e.pointerId)return;toolbar.style.left=clamp(panelDrag.left+e.clientX-panelDrag.x,4,Math.max(4,view.innerWidth-toolbar.offsetWidth-4))+'px';toolbar.style.top=clamp(panelDrag.top+e.clientY-panelDrag.y,4,Math.max(4,view.innerHeight-toolbar.offsetHeight-4))+'px';toolbar.style.transform='none';});
 for(const name of ['pointerup','pointercancel'])listen(grip,name,()=>{panelDrag=null;});
 listen(view,'resize',()=>{signature='';frame=view.requestAnimationFrame(()=>{refresh();if(editing){toolbar.style.left='';toolbar.style.top='';toolbar.style.transform='';game.renderer.render(game.scene,game.camera);}});});
 const update=game.updateHUD.bind(game);game.updateHUD=()=>{update();if(editing)preparePreview();apply();};
 const controller={get editing(){return editing;},setEditing,refresh,reset,inspect:()=>({editing,mode:mode(),selected,positions:structuredClone(positions)}),destroy(){if(editing)close(false);view.cancelAnimationFrame(frame);for(const remove of removers)remove();editor.remove();}};game.touchLayout=controller;refresh();return controller;
}
