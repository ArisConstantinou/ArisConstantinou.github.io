import {createDeckMouse} from './mouse181.js?v=181';
import {createEscapeChapter} from './escape181.js?v=181';
import {installMovementHints,installChapterHUD} from './ui181.js?v=181';
import {createShipNavigator,captureStep,guardQuota} from './security173.js?v=173b';
import * as T from 'three';
import {createActor} from './actors181.js?v=181';
import {createChaosDeck} from './chaos-world173.js?v=173b';
import {ATTACKS,clamp,wrap,makeChapterState,beginAttack,tickAttack,sip,absorb,addChaos,floorAt,moveCharacter,lineBox} from './chaos-model170.js';

export function createChaosChapter({ship,camera,hud,canvas,getPeople,getState,canPlay,audio,onToast,onResetHelm,onRestart,onDrinkLine,mildMotion}){
 const world=createChaosDeck(ship),party=[],keys=new Set(),root=document.createElement('section');root.id='chaos170';root.dataset.phase='helm';hud.append(root);hud.classList.add('chaos-story');
 root.innerHTML=`<div class="chapter-goal"><span>LAST CALL / ΚΕΦΑΛΑΙΟ 01</span><strong id="chapterGoal">ΜΙΑ ΓΟΥΛΙΑ ΜΟΝΟ.</strong><small id="chapterDetail">Πάτησε 9 ή το ουίσκι. Η μέθη ανεβαίνει σταδιακά.</small></div>
 <div class="chaos-score"><small>ΧΑΟΣ</small><b id="chaosScore">0000</b><span id="chaosCombo"></span><div class="heat-track"><i id="chaosHeat"></i></div><small id="chaosPolice">ΑΣΦΑΛΕΙΑ · ΚΑΝΕΝΑΣ ΣΥΝΑΓΕΡΜΟΣ</small></div>
 <button id="leaveHelm" class="leave-helm" disabled>F · ΣΗΚΩ ΑΠΟ ΤΟ ΤΙΜΟΝΙ</button>
 <div class="fps-crosshair" id="chaosCrosshair">＋</div><div id="targetReadout"></div><div id="hitConfirm">×</div><div id="chaosDamage"></div>
 <div class="foot-bars"><span>ΑΝΤΟΧΗ <b id="chaosStamina">100</b></span><div><i id="staminaFill"></i></div><span>ΕΝΕΡΓΕΙΑ <b id="chaosHealth">100</b></span><div><i id="healthFill"></i></div><small id="chaosIntox">ΝΗΦΑΛΙΟΣ</small></div>
 <div id="chaosMove" role="slider" aria-label="Περπάτημα"><i></i><span>ΚΙΝΗΣΗ</span></div>
 <div class="combat-panel"><div class="attack-row">${Object.entries(ATTACKS).slice(0,4).map(([id,a])=>`<button data-attack="${id}" class="attack-button" title="${a.key} / NumPad ${a.key}"><kbd>${a.key}</kbd><span>${a.icon}</span><strong>${a.label}</strong><i class="cooldown"></i></button>`).join('')}</div>
 <div class="utility-row"><button data-attack="spit"><kbd>5</kbd><span>💦</span>ΦΤΥΣΕ</button><button id="chaosBlock"><kbd>6</kbd><span>🛡</span>ΜΠΛΟΚ</button><button id="chaosGrab"><kbd>7</kbd><span>✊</span>ΠΙΑΣΕ</button><button id="chaosThrow"><kbd>8</kbd><span>↗</span>ΠΕΤΑ</button><button id="chaosDrink"><kbd>9</kbd><span>🥃</span>ΟΥΙΣΚΙ</button></div></div>
 <button id="chaosUse" class="context-use">F · ΑΛΛΗΛΕΠΙΔΡΑΣΗ</button><div id="chaosTutorial">WASD / joystick · σύρε για να κοιτάξεις · 1–4 χτυπήματα</div><div id="chapterMarker"><span>↓</span><small>ΚΑΤΑΣΤΡΩΜΑ</small></div>
 <div id="chaosBubbles"></div><div id="chaosFade"></div><section id="arrestCard" hidden><small>ΤΕΛΟΣ ΚΕΦΑΛΑΙΟΥ 01</small><h2>ΤΕΛΟΣ ΒΑΡΔΙΑΣ,<br>ΚΑΠΕΤΑΝΙΕ.</h2><p id="arrestRecap"></p><div id="arrestScore"></div><p>Το επόμενο κεφάλαιο είναι η νηφάλια απόδραση. Πάτησε ΣΥΝΕΧΕΙΑ για ύπνο και απόδραση — δεν χρειάζεται νέα διαδρομή.</p><button id="continueFromCell180">ΣΥΝΕΧΕΙΑ · ΥΠΝΟΣ ΚΑΙ ΑΠΟΔΡΑΣΗ →</button><button id="chaosReplay">↻ ΑΛΛΗ ΜΙΑ ΔΙΑΔΡΟΜΗ ΧΑΟΥΣ</button></section>`;
 const movementHints=installMovementHints(root,()=>enabled&&canPlay()&&s.foot);
 const chapterHUD=installChapterHUD(root,movementHints),navigator=createShipNavigator();
 const transfer=document.createElement('div');transfer.id='custodyTransfer';transfer.innerHTML='<strong>ΣΥΝΕΛΗΦΘΗΣ</strong><small>Μεταφορά στο κελί του πλοίου</small><div><i></i></div>';root.append(transfer);
 let nearGuards=0,cellCaptain=null,arrestPose=null;
 const hint=(touch,desktop=touch)=>movementHints.scheme==='touch'?touch:desktop;
 const $=id=>root.querySelector('#'+id);let s={...makeChapterState(),capture:0,securityAt:null},avatar=null,ready=false,enabled=true,held=null,target=null,lastHud=-99,lastMove=0,frameTime=0;
 const p=new T.Vector3(1.2,18.43,44.4),v=new T.Vector3(),fwd=new T.Vector3(),right=new T.Vector3(),eye=new T.Vector3(),aimPoint=new T.Vector3();let yaw=0,pitch=0,lookPointer=null,movePointer=null,stick={x:0,y:0},damageFlash=0,hitFlash=0,footBob=0,drinkTime=0,guardSerial=0,arrestTimer=0,globalShout=-99;
 const bridgeSolids=[{x:0,z:48.65,w:5.25,d:1.95,y:18.43},{x:3.5,z:47.25,w:1.25,d:2.1,y:18.43},{x:-3.5,z:47.25,w:1.25,d:2.1,y:18.43},{x:0,z:44.65,w:.86,d:1.0,y:18.43}];

 let escapeResume=null,retaken=false;
 const SAVE_KEY='last-call-story180';
 const escape=createEscapeChapter({ship,camera,hud,canvas,getPeople,getVoyage:getState,canPlay,onReturn:enterRaid,onSave:data=>saveStory('escape',data),getHealth:()=>s.health,audio});
 function saved(){try{const q=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');return q?.version===1&&['cell','escape','raid'].includes(q.mode)?q:null;}catch{return null;}}
 function saveStory(mode,data=null){
  const fields=['sips','chaos','hits','broken','thrown','combos','health','stamina'];const stats=Object.fromEntries(fields.map(k=>[k,Number.isFinite(s[k])?s[k]:0]));
  const voyage=Object.fromEntries(['x','z','heading','hull','intox','drinks','time','panic'].map(k=>[k,Number.isFinite(getState()[k])?getState()[k]:0]));
  try{localStorage.setItem(SAVE_KEY,JSON.stringify({version:1,mode,stats,voyage,escape:data,brokenProps:world.props.filter(o=>o.broken).map(o=>o.id),released:world.released}));}catch{}
 }
 function enterCell(){
  s.foot=false;s.attack=null;s.block=false;avatar?.hide();resetInput();world.root.visible=false;world.cell.visible=true;ship.exterior.visible=false;ship.bridgeGroup.visible=false;ship.glass.visible=false;
  if(!cellCaptain){cellCaptain=createActor(getPeople().getCharacterTemplate('captain'),world.cell,{id:99});cellCaptain.group.position.set(.45,0,-.25);}
  cellCaptain.group.visible=true;cellCaptain.group.rotation.y=.22;getState().intox=0;s.pendingAlcohol=0;s.capture=100;s.health=Math.max(35,s.health);setPhase('cell');$('chaosFade').style.opacity='0';$('arrestCard').hidden=false;
  $('arrestRecap').textContent=`${s.hits} χτυπήματα, ${s.broken} σπασμένα αντικείμενα${world.released?' και μία λέμβος στο νερό':''}. Η ασφάλεια θυμάται τη βάρδιά σου.`;
  $('arrestScore').textContent=s.chaos.toLocaleString('el-GR')+' ΒΑΘΜΟΙ ΧΑΟΥΣ';saveStory('cell');hudUpdate();
 }
 function continueCell(){if(!canPlay()||s.phase!=='cell')return;world.cell.visible=false;cellCaptain?.hide();$('arrestCard').hidden=true;s.health=Math.max(75,s.health);s.stamina=100;resetInput();setPhase('escape');escape.start(escapeResume);escapeResume=null;}
 $('continueFromCell180').onclick=continueCell;
 function resumeStory(){setup();if(!ready)return;const data=saved();s.visited=true;s.sips=1;retaken=false;
  if(data){for(const k of ['sips','chaos','hits','broken','thrown','combos','health','stamina'])if(Number.isFinite(data.stats?.[k]))s[k]=Math.max(0,data.stats[k]);for(const k of ['x','z','heading','hull','drinks','time','panic'])if(Number.isFinite(data.voyage?.[k]))getState()[k]=data.voyage[k];for(const o of world.props)if(data.brokenProps?.includes(o.id)&&!o.broken)world.fracture(o);if(data.released)world.releaseBoat();}
  onResetHelm();getState().speed=0;getState().throttle=0;
  if(data?.mode==='raid'){enterRaid(data.escape||{intox:35});return;}
  escapeResume=data?.mode==='escape'?data.escape:null;enterCell();$('continueFromCell180').textContent=escapeResume?'ΣΥΝΕΧΕΙΑ ΑΠΟΔΡΑΣΗΣ →':'ΣΥΝΕΧΕΙΑ · ΥΠΝΟΣ ΚΑΙ ΑΠΟΔΡΑΣΗ →';
  if(escapeResume)saveStory('escape',escapeResume);
  if(!data)$('arrestRecap').textContent='Άμεση έναρξη κεφαλαίου 2. Η προηγούμενη έκδοση δεν αποθήκευε το σκορ του κελιού.';
 }
 function enterRaid(data){
  escape.stop();escapeResume=null;world.cell.visible=false;cellCaptain?.hide();ship.exterior.visible=ship.bridgeGroup.visible=ship.glass.visible=true;world.root.visible=true;$('arrestCard').hidden=true;hud.classList.remove('chaos-custody','chaos-cell');
  party.splice(8).forEach(n=>{world.root.remove(n.actor.group);n.bubble?.remove();});party.forEach(n=>{n.attack=null;n.state='flee';n.bubble?.remove();n.bubble=null;});guardSerial=0;navigator.reset();
  s.returning=true;s.foot=true;s.visited=true;s.capture=0;s.health=Math.max(80,s.health);s.stamina=100;s.attack=null;s.alarmAt=null;s.securityAt=null;nearGuards=0;getState().intox=Math.max(30,data.intox||0);s.pendingAlcohol=15;
  p.set(7.4,10.1,51.3);yaw=-Math.PI/2;pitch=0;avatar.group.position.copy(p);avatar.group.visible=true;setPhase('security');resetInput();
  for(const [x,z]of [[3,41],[-3,40],[6,36],[10,33]]){if(spawnGuard()){const n=party.at(-1);n.actor.group.position.set(x,18.43,z);n.health=65;n.goal.copy(p);}}
  onToast('Πίσω στο κατάστρωμα. Ανέβα τη σκάλα και πάρε το τιμόνι. Οι ζημιές και το σκορ διατηρήθηκαν.');saveStory('raid',data);hudUpdate();
 }
 function retake(){
  s.returning=false;s.foot=false;s.phase='retaken';retaken=true;s.attack=null;s.block=false;resetInput();avatar?.hide();root.style.display='none';hud.classList.remove('chaos-foot','chaos-story','chaos-cell','chaos-custody');
  party.filter(n=>n.guard).forEach(n=>n.actor.hide());getPeople().getSpeakers().forEach(n=>n.group.visible=true);onResetHelm();getState().drinkCooldown=0;
  try{localStorage.removeItem(SAVE_KEY);}catch{}onToast('Η ΓΕΦΥΡΑ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ! Χάος '+s.chaos+' — χειρίσου ξανά το τιμόνι και τον μοχλό.');
 }
 const mouse=createDeckMouse({canvas,root,enabled:()=>available()&&s.foot,onLook:(dx,dy)=>{yaw-=Math.max(-350,Math.min(350,dx))*.003;pitch=clamp(pitch+Math.max(-350,Math.min(350,dy))*.0025,-1.05,1.0);},onAttack:doAttack,onReset:resetInput,onMessage:onToast});
 function bindings(){
  const map={'[data-attack=slap]':'M1','[data-attack=heavy]':'Q','[data-attack=punch]':'M2','[data-attack=kick]':'E','[data-attack=spit]':'G','#chaosBlock':'C','#chaosGrab':'X','#chaosThrow':'R','#chaosDrink':'Z'};
  for(const [sel,key] of Object.entries(map)){const el=root.querySelector(sel),badge=el?.querySelector('kbd');if(badge)badge.textContent=key;}
  if(movementHints.scheme!=='touch')$('chaosTutorial').textContent='WASD · Ποντίκι: ματιά · M1 χαστούκι / M2 γροθιά · TAB δείκτης';
 }
 bindings();root.addEventListener('schemechange',bindings);
 function available(){return enabled&&!retaken&&!escape.active&&canPlay()&&!['arrested','cell','escape'].includes(s.phase);}

 function setPhase(phase){s.phase=phase;if(!s.foot||['cell','escape','arrested'].includes(phase))mouse?.release();root.dataset.phase=phase;hud.classList.toggle('chaos-foot',s.foot);hud.classList.toggle('chaos-cell',phase==='cell');hud.classList.toggle('chaos-custody',['cell','arrested'].includes(phase));hudUpdate();}
 function setup(){if(ready)return;const list=getPeople()?.getSpeakers();if(!list?.length)return;
  const crew=getPeople().getCharacterTemplate('captain');avatar=createActor(crew,ship.group,{fps:true});avatar.group.visible=false;
  const spawns=[[-3.4,53.9],[.8,54.8],[4.4,55.1],[-4.8,57.5],[.8,58.4],[3,60.6],[-1,61.8],[-5.2,54]];
  spawns.forEach(([x,z],i)=>{const template=getPeople().getDeckTemplates()[i];const actor=createActor(template,world.root,{id:i});actor.group.position.set(x,10.12,z);party.push({id:i,actor,x,z,y:10.1,radius:.29,home:new T.Vector3(x,10.1,z),goal:new T.Vector3(x,10.1,z),health:55,guard:false,brave:i%3!==1,state:'idle',wait:1.5+i*.3,speed:0,attack:null,cooldown:1+i*.15,stagger:0,down:0,flinch:0,bubble:null,bubbleUntil:0,hits:0});});
  ready=true;
 }
 function shout(n,text){if(!n||s.time-globalShout<.7)return;globalShout=s.time;if(n.bubble)n.bubble.remove();const el=document.createElement('div');el.className='chaos-bubble';el.innerHTML='<small></small><span></span>';el.firstChild.textContent=n.actor.profile?.name||(n.guard?'ΑΣΦΑΛΕΙΑ ΠΛΟΙΟΥ':'ΕΠΙΒΑΤΗΣ '+(n.id+1));el.lastChild.textContent=text;$('chaosBubbles').append(el);n.bubble=el;n.bubbleUntil=s.time+3.7;}
 function foot(){if(!available()||s.sips<1)return;setup();if(!ready)return;s.foot=true;p.set(1.2,18.43,44.4);yaw=.9;pitch=0;setPhase('descend');onResetHelm();avatar.group.visible=true;onToast(hint('Δεξιά πόρτα → σκάλα. Σύρε το αριστερό χειριστήριο.','Δεξιά πόρτα → σκάλα. Περπάτα με W A S D.'));}
 function requestDrink(){if(retaken)return false;if(!available())return true;const r=sip(s,getState());if(!r.ok){if(r.message)onToast(r.message);return true;}drinkTime=1;if(s.foot)audio.voice(getState().intox<40?'captain2':getState().intox<70?'captain3':'captain4',{priority:0});else onDrinkLine();$('leaveHelm').disabled=false;if(s.sips===1)onToast('Μία γουλιά. Τώρα κατέβα στο κατάστρωμα.');return true;}
 function doAttack(kind){if(!available())return;if(held&&kind!=='spit'){onToast(hint('Πάτησε ΠΕΤΑ ή ΠΑΡΕ για να ελευθερώσεις τα χέρια.','Πέτα ή άφησε το αντικείμενο (R / X).'));return;}if(beginAttack(s,kind)){hitFlash=0;}else if(s.stamina<(ATTACKS[kind]?.stamina||0))onToast('Πάρε μία ανάσα — χαμηλή αντοχή.');}
 function solids(){return [...bridgeSolids,...world.solids.filter(o=>o.active&&!o.broken&&!o.moving&&o!==held)];}
 function bodies(skip=null){return party.filter(n=>n!==skip&&n.health>0&&n.actor.group.visible).map(n=>({x:n.actor.group.position.x,y:n.actor.group.position.y,z:n.actor.group.position.z,radius:.28}));}
 function facingPoint(range=2){return {x:p.x+Math.sin(yaw)*range,z:p.z+Math.cos(yaw)*range};}
 function lineClear(a,b){return !solids().some(o=>Math.abs((o.y||10.1)-a.y)<2&&Math.min(a.y+1.4,b.y+1.4)<(o.y||10.1)+(o.h||3)&&lineBox(a,b,o));}
 function closestTarget(range=2.2){let best=null,bestDist=range;fwd.set(Math.sin(yaw),0,Math.cos(yaw));
  for(const n of party){if(n.health<=0||!n.actor.group.visible||Math.abs(n.actor.group.position.y-p.y)>1.4)continue;v.copy(n.actor.group.position).sub(p);const d=v.length();if(Math.abs(Math.atan2(p.y+1.68-(n.actor.group.position.y+1.4),Math.max(.1,d))-pitch)>.6)continue;if(d>bestDist||d<.1||v.normalize().dot(fwd)<.86)continue;if(!lineClear({x:p.x,y:p.y,z:p.z},n.actor.group.position))continue;best={type:'person',item:n,d};bestDist=d;}
  for(const o of world.props){if(o.broken||o===held||!o.group.visible)continue;const q=o.group.position;v.set(q.x-p.x,0,q.z-p.z);const d=Math.max(.15,v.length()-Math.max(o.w,o.d)*.35);if(d>bestDist||v.normalize().dot(fwd)<.72||Math.abs(q.y-p.y)>2)continue;
   if(solids().some(b=>b!==o&&Math.abs(b.y-p.y)<2&&Math.min(p.y+1.68,q.y+o.h*.5)<b.y+(b.h||3)&&lineBox(p,q,b)))continue;best={type:'prop',item:o,d};bestDist=d;}
  return best;
 }
 function score(amount,kind){const n=addChaos(s,amount,kind);$('chaosCombo').textContent=(s.time-s.lastHit<4?'+'+n:'')+(s.combos?' · COMBO':'');s.heat=clamp(s.heat,0,100);}
 function hurtNPC(n,a,kind){if(n.health<=0)return;n.hits++;n.health-=a.damage*(1+getState().intox/300);n.stagger=.28+a.push*.4;n.flinch=1;n.wait=0;n.state=n.brave||n.guard?'fight':'flee';n.goal.copy(n.actor.group.position);const dir=n.actor.group.position.clone().sub(p).setY(0).normalize();moveCharacter(n.actor.group.position,dir.x*a.push,dir.z*a.push,solids(),bodies(n),.27);
  s.hits++;score(n.hits>4?2:a.score,kind);audio.hit?.(kind);hitFlash=.22;
  shout(n,n.guard?'Σταματήστε! Είστε υπό κράτηση!':kind==='spit'?'Σοβαρά τώρα; Φωνάξτε ασφάλεια!':n.brave?'Μην το ξανακάνεις!':'Βοήθεια! Καλέστε την ασφάλεια!');
  if(n.health<=0){n.down=8;n.state='down';n.attack=null;n.health=0;n.stagger=0;score(n.guard?35:15,'knockdown');}
 }
 function contact(kind,a){if(kind==='spit')world.spit(p,new T.Vector3(Math.sin(yaw),0,Math.cos(yaw)));const hit=closestTarget(a.range);if(!hit)return;target=hit;if(hit.type==='person'){hurtNPC(hit.item,a,kind);return;}
  const o=hit.item;if(o.type==='bar'||o.type==='release')return;if(kind==='spit'){score(3,kind);return;}o.hp-=a.damage;audio.hit?.(o.type==='window'?'glass':kind);hitFlash=.18;score(5,kind+'-property');
  if(o.hp<=0&&world.fracture(o)){s.broken++;score(o.type==='window'?65:40,'destroy-'+o.type);}else{o.group.rotation.z=(Math.random()-.5)*.15;}
 }
 function grab(){if(!available()||!s.foot)return;if(held){held.group.position.set(p.x+Math.sin(yaw)*.8,p.y+.2,p.z+Math.cos(yaw)*.8);held.active=true;held.moving=true;held.velocity.set(0,0,0);held=null;return;}const t=closestTarget(2.3);if(t?.type==='prop'&&t.item.grab){held=t.item;held.active=false;held.moving=false;held.hitIds.clear();onToast('Κρατάς: '+held.label+hint(' · πάτησε ΠΕΤΑ',' · R για ρίψη'));}else onToast('Σημάδεψε μπουκάλι, καρέκλα ή μικρό αντικείμενο.');}
 function throwObject(){if(!available()||!held)return;const o=held;held=null;o.active=true;o.moving=true;o.group.position.set(p.x+Math.sin(yaw)*.65,p.y+1.32,p.z+Math.cos(yaw)*.65);o.velocity.set(Math.sin(yaw)*9,3.5-pitch*3,Math.cos(yaw)*9);s.thrown++;audio.hit?.('swing');}
 function interact(){if(!available())return;if(s.returning&&p.y>17&&Math.hypot(p.x-1.2,p.z-44.4)<2.5){if(party.some(n=>n.guard&&n.health>0&&Math.abs(n.actor.group.position.y-p.y)<1&&n.actor.group.position.distanceTo(p)<2.6)){onToast('Απομάκρυνε πρώτα τους φύλακες δίπλα στο τιμόνι.');return;}retake();return;}if(!s.foot){foot();return;}if(held){throwObject();return;}const t=closestTarget(2.5);if(t?.type==='prop'&&t.item.type==='release'){if(world.releaseBoat()){score(150,'lifeboat');onToast('Η λέμβος κατεβαίνει! Η ασφάλεια ειδοποιήθηκε.');audio.horn();}return;}
  if(p.y>17&&Math.hypot(p.x-1.2,p.z-44.4)<2.3&&s.chaos===0){s.foot=false;setPhase('helm');avatar.group.visible=false;onResetHelm();return;}
  if(t?.type==='person'){shout(t.item,getState().intox>45?'Καπετάνιε… έχετε πιει;':'Καπετάνιε, απολαμβάνουμε την κρουαζιέρα.');return;}
  if(t?.type==='prop'&&t.item.type==='bar'){requestDrink();return;}if(t?.type==='prop'&&!t.item.grab&&t.item.type!=='release'){doAttack('slap');return;}grab();
 }
 function resetInput(){escape?.resetInput();movementHints.reset();keys.clear();s.block=false;stick={x:0,y:0};movePointer=null;blockPointer=null;lookPointer=null;$('chaosMove').firstChild.style.transform='translate(0,0)';}
 $('leaveHelm').onclick=foot;$('chaosUse').onclick=interact;$('chaosDrink').onclick=requestDrink;$('chaosGrab').onclick=grab;$('chaosThrow').onclick=throwObject;$('chaosReplay').onclick=onRestart;
 root.querySelectorAll('[data-attack]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();doAttack(b.dataset.attack);}));
 const blockButton=$('chaosBlock');let blockPointer=null;
 blockButton.addEventListener('pointerdown',e=>{if(!available()||blockPointer!==null)return;e.preventDefault();blockPointer=e.pointerId;blockButton.setPointerCapture(e.pointerId);s.block=true;});
 for(const k of ['pointerup','pointercancel','lostpointercapture'])blockButton.addEventListener(k,e=>{if(e.pointerId!==blockPointer||(e.type==='lostpointercapture'&&e.target!==blockButton))return;blockPointer=null;s.block=false;});
 const pad=$('chaosMove');function padMove(e){const b=pad.getBoundingClientRect(),x=(e.clientX-b.left-b.width/2)/40,y=(e.clientY-b.top-b.height/2)/40,d=Math.max(1,Math.hypot(x,y));stick.x=x/d;stick.y=-y/d;pad.firstChild.style.transform=`translate(${stick.x*35}px,${-stick.y*35}px)`;}
 pad.addEventListener('pointerdown',e=>{if(!available()||movePointer!==null)return;e.preventDefault();movePointer=e.pointerId;pad.setPointerCapture(movePointer);padMove(e);});pad.addEventListener('pointermove',e=>{if(e.pointerId===movePointer)padMove(e);});for(const k of ['pointerup','pointercancel','lostpointercapture'])pad.addEventListener(k,e=>{if(e.type==='lostpointercapture'&&e.target!==pad)return;if(e.pointerId===movePointer){movePointer=null;stick={x:0,y:0};pad.firstChild.style.transform='translate(0,0)';}});
 function down(e){if(mouse.key(e))return true;if(escape.active)return escape.keyDown(e);if(!enabled||retaken||!canPlay())return false;if(s.phase==='cell'&&e.code==='KeyF'&&!e.repeat){continueCell();return true;}keys.add(e.code);if(e.code==='KeyZ'&&!e.repeat){requestDrink();return true;}if(s.foot){const attacks={KeyQ:'heavy',KeyE:'kick',KeyG:'spit'};if(attacks[e.code]){if(!e.repeat)doAttack(attacks[e.code]);return true;}if(e.code==='KeyC'){s.block=true;return true;}if(e.code==='KeyX'){if(!e.repeat)grab();return true;}if(e.code==='KeyR'){if(!e.repeat)throwObject();return true;}}const num=/^(?:Digit|Numpad)(\d)$/.exec(e.code);if(num){if(e.repeat)return true;const k=Number(num[1]);if(k===9){requestDrink();return true;}if(s.foot){if(k<=5)doAttack(Object.keys(ATTACKS)[k-1]);if(k===6)s.block=true;if(k===7)grab();if(k===8)throwObject();return true;}}
  if(e.code==='KeyF'&&!e.repeat){interact();return true;}if(e.code==='KeyE'&&!e.repeat){s.foot?interact():requestDrink();return true;}if(s.foot&&['KeyC','Space','KeyG'].includes(e.code))return true;return false;
 }
 function up(e){escape.keyUp(e);keys.delete(e.code);if(['KeyC','Digit6','Numpad6'].includes(e.code))s.block=false;}
 function pointerDown(e){if(mouse.down(e))return true;if(escape.active)return escape.pointerDown(e);if(!s.foot||!available())return false;if(lookPointer!==null)return true;lookPointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);return true;}
 function pointerMove(e){if(mouse.move(e))return true;if(escape.active)return true;if(!s.foot)return false;if(lookPointer?.id===e.pointerId){yaw-=(e.clientX-lookPointer.x)*.0045;pitch=clamp(pitch+(e.clientY-lookPointer.y)*.0033,-1.05,1.0);lookPointer.x=e.clientX;lookPointer.y=e.clientY;}return true;}
 function pointerUp(e){if(lookPointer?.id===e.pointerId)lookPointer=null;}
 window.addEventListener('blur',resetInput);document.addEventListener('visibilitychange',()=>{if(document.hidden)resetInput();});
 function spawnGuard(){
  setup();if(!ready||guardSerial>=6)return false;
  const template=getPeople().getCharacterTemplate(guardSerial%3===2?'securityF':'securityM');if(!template)return false;
  const locations=[[7.5,52.1],[7.5,52.9],[7.6,51.4],[6.6,52.8],[5.7,52.8],[7.3,53.6],[9.0,50.1],[10.0,50.1]];
  const obstacleList=solids();const place=locations.find(([x,z])=>navigator.clear({x,z},obstacleList)&&!bodies().some(b=>Math.hypot(x-b.x,z-b.z)<.67));if(!place)return false;
  const id=8+guardSerial++,actor=createActor(template,world.root,{guard:true,id});actor.group.position.set(place[0],10.10,place[1]);
  party.push({id,actor,x:place[0],z:place[1],y:10.1,radius:.3,home:new T.Vector3(place[0],10.1,place[1]),goal:p.clone(),health:85,guard:true,brave:true,state:'fight',wait:0,speed:0,attack:null,cooldown:.9+guardSerial*.08,stagger:0,down:0,flinch:0,bubble:null,bubbleUntil:0,hits:0,nav:null});
  shout(party.at(-1),'Ασφάλεια πλοίου! Σταματήστε!');return true;
 }
 function arrest(){
  if(['arrested','cell'].includes(s.phase))return;
  s.capture=100;s.foot=false;s.attack=null;s.block=false;held=null;avatar?.hide();
  arrestPose={position:camera.position.clone(),rotation:camera.quaternion.clone()};arrestTimer=0;setPhase('arrested');resetInput();audio.stopVoice();audio.voice('brace',{priority:3});
  party.forEach(n=>{n.attack=null;n.bubble?.remove();n.bubble=null;});onToast('Σε ακινητοποίησαν. Μεταφέρεσαι στο κελί.');
 }
 function updateSecurity(dt){
  if(s.returning)return;
  if(!s.foot||s.alarmAt===null)return;
  if(s.heat>80)s.alarmAt=Math.min(s.alarmAt,s.time+10);
  if(s.time>=s.alarmAt){
   if(s.securityAt===null){s.securityAt=s.time;setPhase('security');}
   const wanted=guardQuota(s.time-s.securityAt);for(let i=guardSerial;i<wanted;i++)if(!spawnGuard())break;
  }
  nearGuards=party.filter(n=>n.guard&&n.health>0&&n.stagger<=0&&Math.abs(n.actor.group.position.y-p.y)<.8&&Math.hypot(n.actor.group.position.x-p.x,n.actor.group.position.z-p.z)<1.72&&lineClear(p,n.actor.group.position)).length;
  s.capture=captureStep(s.capture,dt,{nearby:nearGuards,health:s.health,blocking:s.block});
  if(s.capture>=100||(s.health<=0&&nearGuards>0))arrest();
 }
 function updatePeople(dt){
  const obstacleList=solids();
  for(const n of party){
   const q=n.actor.group.position;const distance=Math.hypot(p.x-q.x,p.z-q.z);const sameFloor=Math.abs(p.y-q.y)<.8;
   n.flinch=Math.max(0,n.flinch-dt*3);n.stagger=Math.max(0,n.stagger-dt);n.cooldown-=dt;n.speed=0;
   if(n.health<=0){n.down-=dt;n.actor.group.rotation.z=T.MathUtils.lerp(n.actor.group.rotation.z,1.15,dt*8);if(n.down<=0){n.health=n.guard?80:35;n.actor.group.rotation.z=0;n.state=n.guard?'fight':'flee';n.nav=null;}n.actor.tick(dt,{down:1,time:s.time});continue;}
   if(n.stagger<=0&&s.foot){
    let dx=0,dz=0;
    if(n.state==='fight'){
     const angle=Math.atan2(p.x-q.x,p.z-q.z);n.actor.group.rotation.y+=wrap(angle-n.actor.group.rotation.y)*Math.min(1,dt*8);
     if((distance>1.15||!sameFloor||!lineClear(p,q))&&(n.guard||distance<30)){
      const destination=n.guard?navigator.steer(n,q,p,obstacleList,s.time):p;
      const d=Math.hypot(destination.x-q.x,destination.z-q.z);if(d>.05){dx=(destination.x-q.x)/d;dz=(destination.z-q.z)/d;n.speed=n.guard?2.45:1.6;}
     }
     if(sameFloor&&distance<1.75&&lineClear(p,q)&&n.cooldown<=0&&!n.attack){n.attack={kind:'punch',t:0,landed:false};n.cooldown=(n.guard?1.25:1.9)+(n.id%4)*.12;}
    }else if(n.state==='flee'){
     if(sameFloor&&distance<5){dx=(q.x-p.x)/Math.max(.2,distance);dz=(q.z-p.z)/Math.max(.2,distance);n.speed=2.1;}else n.state='idle';
    }else{
     if(sameFloor&&distance<2.8)n.actor.group.rotation.y+=wrap(Math.atan2(p.x-q.x,p.z-q.z)-n.actor.group.rotation.y)*Math.min(1,dt*5);
     n.wait-=dt;if(n.wait<0){n.goal.set(clamp(n.home.x+(Math.random()-.5)*2,-5.8,5.8),10.1,clamp(n.home.z+(Math.random()-.5)*3,53,61));n.wait=4+Math.random()*4;}
     const d=Math.hypot(n.goal.x-q.x,n.goal.z-q.z);if(d>.3){dx=(n.goal.x-q.x)/d;dz=(n.goal.z-q.z)/d;n.speed=.65;}
    }
    if(n.speed){
     const before=q.clone(),others=bodies(n);others.push({x:p.x,y:p.y,z:p.z,radius:.3});
     moveCharacter(q,dx*n.speed*dt,dz*n.speed*dt,obstacleList,others,.29);
     if(q.distanceTo(before)<.001&&n.state==='fight'){
      const side=n.id%2?1:-1;moveCharacter(q,dz*side*n.speed*dt,-dx*side*n.speed*dt,obstacleList,others,.29);
      if(n.guard&&q.distanceTo(before)<.001&&n.nav)n.nav.until=Math.min(n.nav.until,s.time+.25);
     }
     if(!n.guard&&q.z<52)q.z=52;
     const ddx=q.x-before.x,ddz=q.z-before.z;if(Math.hypot(ddx,ddz)>.001&&n.state!=='fight')n.actor.group.rotation.y+=wrap(Math.atan2(ddx,ddz)-n.actor.group.rotation.y)*Math.min(1,dt*8);
     n.speed=Math.hypot(ddx,ddz)/Math.max(dt,.001);
    }
   }
   if(n.attack){
    n.attack.t+=dt;
    if(!n.attack.landed&&n.attack.t>.25){n.attack.landed=true;const contact=Math.hypot(p.x-q.x,p.z-q.z);
     if(s.foot&&contact<1.82&&Math.abs(p.y-q.y)<.8&&lineClear(p,q)){
      const blocked=s.block&&Math.abs(wrap(Math.atan2(q.x-p.x,q.z-p.z)-yaw))<1.3&&s.stamina>4;
      s.health=clamp(s.health-(blocked?2:n.guard?12:9),0,100);if(blocked)s.stamina=Math.max(0,s.stamina-8);damageFlash=blocked?.10:.38;s.guardHits+=n.guard?1:0;audio.hit?.(blocked?'block':'punch');
      if(s.health<=0){if(n.guard){arrest();break;}s.alarmAt=Math.min(s.alarmAt??s.time,s.time);}
     }
    }if(n.attack.t>.68)n.attack=null;
   }
   n.actor.tick(dt,{speed:n.speed,attack:n.attack,block:n.state==='fight'&&!n.attack,time:s.time,flinch:n.flinch});
  }
 }
 function propsPhysics(dt){for(const o of world.props){if(!o.moving||o.broken||o===held)continue;const steps=Math.ceil(dt/.012);for(let j=0;j<steps;j++){const h=dt/steps,old=o.group.position.clone();o.velocity.y-=9.8*h;o.group.position.addScaledVector(o.velocity,h);o.group.rotation.x+=h*o.velocity.length()*.4;
   if(o.group.position.y<10.14){o.group.position.y=10.14;o.velocity.y=Math.abs(o.velocity.y)*.28;o.velocity.x*=.75;o.velocity.z*=.75;if(o.type==='bottle'||o.type==='vase'){if(world.fracture(o)){s.broken++;score(25,'thrown-property');audio.hit?.('glass');}break;}}
   if(solids().some(b=>b!==o&&Math.abs(b.y-10.1)<2&&lineBox(old,o.group.position,b))){o.velocity.x*=-.45;o.velocity.z*=-.45;}
   for(const n of party){if(n.health<=0||o.hitIds.has(n.id))continue;if(o.group.position.distanceTo(n.actor.group.position.clone().add(new T.Vector3(0,1,0)))<.75){o.hitIds.add(n.id);hurtNPC(n,{damage:17,push:.4,score:20},'throw');o.velocity.multiplyScalar(.3);if(o.type==='bottle')world.fracture(o);}}
   if(Math.abs(o.group.position.x)>14||o.group.position.z>69||o.group.position.z<46){o.moving=false;o.group.visible=false;o.broken=true;o.active=false;break;}if(o.velocity.length()<.45){o.moving=false;o.x=o.group.position.x;o.y=10.1;o.z=o.group.position.z;break;}
  }}
 }
 function update(dt){mouse.sync();if(!enabled||retaken)return;if(escape.active){escape.update(dt);return;}setup();if(!ready)return;const voyage=getState();s.time+=dt;frameTime=dt;world.update(dt);absorb(s,voyage,dt);drinkTime=Math.max(0,drinkTime-dt*.75);damageFlash=Math.max(0,damageFlash-dt);hitFlash=Math.max(0,hitFlash-dt);
  if(s.phase==='arrested'){
   arrestTimer+=dt;transfer.querySelector('i').style.width=Math.min(100,arrestTimer/2.8*100)+'%';$('chaosFade').style.opacity=Math.min(1,arrestTimer/1.5);
   if(arrestTimer>=2.8){
    enterCell();
   }return;
  }
  if(s.phase==='cell'){cellCaptain?.tick(dt,{time:s.time});return;}
  if(s.foot){fwd.set(Math.sin(yaw),0,Math.cos(yaw));right.set(-Math.cos(yaw),0,Math.sin(yaw));let x=stick.x+(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0),z=stick.y+(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);const l=Math.max(1,Math.hypot(x,z));x/=l;z/=l;
   const drunk=voyage.intox/100,wobble=Math.sin(s.time*2.4)*drunk*.17*(Math.abs(x)+Math.abs(z)>.1?1:.25),speed=(keys.has('ShiftLeft')?3.5:2.7)*(1-drunk*.28)*(s.block?.55:1);v.copy(fwd).multiplyScalar(z).addScaledVector(right,x+wobble);const moved=moveCharacter(p,v.x*speed*dt,v.z*speed*dt,solids(),bodies(),.27);lastMove=moved/Math.max(dt,.001);footBob+=moved*5;
   if(!s.visited&&p.y<11.1&&p.z>50.8&&p.x<8.7){s.visited=true;setPhase('deck');shout(party[0],'Καπετάνιε! Καθίστε μαζί μας!');onToast(hint('Έφτασες στο μπαρ. Τα κουμπιά χτυπημάτων είναι δεξιά.','ΜΠΑΡ · 9 για ουίσκι, 1–4 για χτυπήματα.'));}
   avatar.group.position.copy(p);avatar.group.rotation.set(0,yaw,0);avatar.tick(dt,{speed:lastMove,attack:s.attack,block:s.block,drunk,time:s.time,held:!!held,drinking:drinkTime});
   tickAttack(s,dt,contact);target=closestTarget(2.5);updatePeople(dt);propsPhysics(dt);
   updateSecurity(dt);
   if(held){held.group.position.copy(p).addScaledVector(fwd,.73).addScaledVector(right,.25);held.group.position.y+=1.1;held.group.rotation.set(.2,yaw,0);}
  }
  if(s.time-lastHud>.06){lastHud=s.time;hudUpdate();}
 }
 function hudUpdate(){let goal='ΜΙΑ ΓΟΥΛΙΑ ΜΟΝΟ.',detail='Πάτησε 9 ή το ουίσκι. Η μέθη ανεβαίνει σταδιακά.';if(s.sips&&s.phase==='helm'){goal='ΑΣΕ ΤΟ ΤΙΜΟΝΙ.';detail='F · Σήκω και βρες τη δεξιά πόρτα της γέφυρας.';}if(s.phase==='descend'){goal='ΚΑΤΕΒΑ ΣΤΟΥΣ ΕΠΙΒΑΤΕΣ.';detail=p.y>17?'Δεξιά πόρτα → εξωτερική σκάλα.':p.y>11?'Συνέχισε μέχρι κάτω. Το πλήρωμα κρατά το πλοίο.':'Στρίψε αριστερά προς το μπαρ.';}if(s.phase==='deck'){goal='ΠΡΟΚΑΛΕΣΕ ΧΑΟΣ.';detail='9 ποτό · 1–4 χτυπήματα · 7 πιάσε / 8 πέτα';}if(s.phase==='security'){goal='Η ΑΣΦΑΛΕΙΑ ΕΦΤΑΣΕ.';detail='Μείνε όρθιος και αύξησε το χάος. 6 για μπλοκ.';}
  $('chapterGoal').textContent=goal;$('chapterDetail').textContent=detail;$('chaosScore').textContent=String(s.chaos).padStart(4,'0');$('chaosHeat').style.width=s.heat+'%';$('chaosPolice').textContent=s.phase==='security'?'ΑΣΦΑΛΕΙΑ · '+guardSerial+' ΦΥΛΑΚΕΣ':s.alarmAt!==null?'ΕΝΙΣΧΥΣΕΙΣ ΣΕ '+Math.max(0,Math.ceil(s.alarmAt-s.time))+'″':'ΑΣΦΑΛΕΙΑ · ΚΑΝΕΝΑΣ ΣΥΝΑΓΕΡΜΟΣ';
  $('chaosStamina').textContent=Math.round(s.stamina);$('chaosHealth').textContent=Math.round(s.health);$('staminaFill').style.width=s.stamina+'%';$('healthFill').style.width=s.health+'%';$('chaosIntox').textContent=`ΜΕΘΗ ${Math.round(getState().intox)}%${s.pendingAlcohol>1?' ↗':''}`;
  root.querySelectorAll('[data-attack]').forEach(el=>{const a=ATTACKS[el.dataset.attack];el.disabled=!s.visited||!!s.attack||s.stamina<a.stamina||!s.foot;el.classList.toggle('executing',s.attack?.kind===el.dataset.attack);const progress=el.querySelector('.cooldown');if(progress)progress.style.width=s.attack?.kind===el.dataset.attack?100*(1-s.attack.t/a.duration)+'%':'0%';});
  $('chaosBlock').classList.toggle('held',s.block);$('chaosGrab').classList.toggle('held',!!held);$('chaosThrow').disabled=!held;
  const t=target;$('targetReadout').textContent=t?t.type==='person'?`${t.item.actor.profile?.name||(t.item.guard?'ΑΣΦΑΛΕΙΑ':'ΕΠΙΒΑΤΗΣ '+(t.item.id+1))} · ${Math.ceil(t.item.health)} / ${t.item.guard?85:55}`:t.item.label:'';$('chaosCrosshair').classList.toggle('on-target',!!t);
  $('hitConfirm').style.opacity=hitFlash>0?'1':'0';$('chaosDamage').style.opacity=String(damageFlash);
  chapterHUD.update(s,getState(),target,held,p,nearGuards);
  if(s.returning){$('chapterGoal').textContent='ΠΑΡΕ ΠΙΣΩ ΤΗ ΓΕΦΥΡΑ.';$('chapterDetail').textContent='Ανέβα τη σκάλα. Απομάκρυνε τους φύλακες και πλησίασε το τιμόνι.';
   if(p.y>17&&Math.hypot(p.x-1.2,p.z-44.4)<2.5){const b=$('chaosUse');b.disabled=false;b.querySelector('.use-icon').textContent='⚓';b.querySelector('strong').textContent='ΠΑΡΕ ΤΟ ΤΙΜΟΝΙ';b.querySelector('small').textContent='Γέφυρα πλοίου';b.dataset.action='helm';}}

 }
 function cameraUpdate(dt){if(escape.active)return escape.cameraUpdate(dt);if(!enabled||retaken)return false;if(s.phase==='arrested'&&arrestPose){camera.position.copy(arrestPose.position);camera.quaternion.copy(arrestPose.rotation);camera.updateMatrixWorld();return true;}if(s.phase==='cell'){const pos=ship.group.localToWorld(new T.Vector3(.1,6.1,48.8)),to=ship.group.localToWorld(new T.Vector3(.0,5.55,44.7));camera.position.copy(pos);camera.up.set(0,1,0).applyQuaternion(ship.group.quaternion);camera.lookAt(to);camera.fov=67;camera.updateProjectionMatrix();camera.updateMatrixWorld();return true;}if(!s.foot)return false;
  const drunk=getState().intox/100,mild=mildMotion()? .18:1;eye.copy(p);eye.y+=1.68+Math.sin(footBob)*Math.min(.03,lastMove*.009)+Math.sin(s.time*1.4)*drunk*.015*mild;
  aimPoint.copy(eye).add(new T.Vector3(Math.sin(yaw)*Math.cos(pitch),-Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)));ship.group.localToWorld(eye);ship.group.localToWorld(aimPoint);camera.position.copy(eye);camera.up.set(0,1,0).applyQuaternion(ship.group.quaternion);camera.lookAt(aimPoint);camera.rotateZ(Math.sin(s.time*2)*drunk*.018*mild);camera.fov=76;camera.updateProjectionMatrix();camera.updateMatrixWorld();
  const wp=avatar?.group;if(wp)wp.visible=true;
  return true;
 }
 function project(){if(!enabled||retaken||escape.active)return;for(const n of party){if(!n.bubble)continue;if(s.time>n.bubbleUntil){n.bubble.remove();n.bubble=null;continue;}const a=n.actor.group.localToWorld(new T.Vector3(0,n.actor.height+.16,0)).project(camera);const visible=a.z>0&&a.z<1&&Math.abs(a.x)<.94&&Math.abs(a.y)<.8;n.bubble.style.display=visible?'block':'none';if(visible){n.bubble.style.left=(a.x*.5+.5)*innerWidth+'px';n.bubble.style.top=(-a.y*.5+.5)*innerHeight+'px';}}
  const mark=$('chapterMarker');if(s.phase==='descend'){const dest=p.y>17&&p.x<10.7?new T.Vector3(10.5,19.5,32.9):p.y>11?new T.Vector3(12.6,11.7,49.6):new T.Vector3(5.8,11.7,54);ship.group.localToWorld(dest);dest.project(camera);const front=dest.z>0&&dest.z<1;mark.style.display='block';mark.style.left=clamp((dest.x*.5+.5)*innerWidth,70,innerWidth-80)+'px';mark.style.top=clamp((-dest.y*.5+.5)*innerHeight,190,innerHeight-260)+'px';mark.firstChild.textContent=front?'↓':'↶';}else mark.style.display='none';
 }
 function reset(){mouse.release();escape.stop();escapeResume=null;retaken=false;hud.classList.toggle('chaos-story',enabled);s={...makeChapterState(),capture:0,securityAt:null};navigator.reset();nearGuards=0;arrestPose=null;cellCaptain?.hide();lastHud=-99;lastMove=0;globalShout=-99;target=null;footBob=0;$('chaosCombo').textContent='';ready&&party.splice(8).forEach(n=>{world.root.remove(n.actor.group);n.bubble?.remove();});for(const n of party){n.health=55;n.actor.group.position.copy(n.home);n.actor.group.rotation.set(0,0,0);n.actor.group.visible=true;n.state='idle';n.attack=null;n.hits=0;n.down=0;n.wait=2;n.stagger=n.flinch=0;n.bubble?.remove();n.bubble=null;}avatar?.hide();held=null;guardSerial=0;arrestTimer=0;drinkTime=0;damageFlash=hitFlash=0;world.reset();world.root.visible=enabled;ship.exterior.visible=ship.bridgeGroup.visible=ship.glass.visible=true;$('arrestCard').hidden=true;$('chaosFade').style.opacity='0';$('leaveHelm').disabled=true;root.style.display=enabled?'':'none';setPhase('helm');resetInput();hudUpdate();}
 return {releaseMouse:()=>mouse.release(),update,cameraUpdate,project,requestDrink,resumeStory,hasSave:()=>!!saved(),keyDown:down,keyUp:up,pointerDown,pointerMove,pointerUp,resetInput,reset,get foot(){return enabled&&s.foot;},get enabled(){return enabled&&!retaken;},get pausedStory(){return escape.active||['arrested','cell','escape'].includes(s.phase);},get ownsShip(){return enabled&&!retaken&&(escape.active||s.foot||['cell','arrested','escape'].includes(s.phase));},setEnabled(value){enabled=value;root.style.display=value?'':'none';world.root.visible=value;reset();},inspect:()=>({mouse:mouse.inspect(),look:{yaw,pitch},escape:escape.inspect(),returning:!!s.returning,retaken,controlScheme:movementHints.scheme,phase:s.phase,foot:s.foot,time:s.time,drinkCooldown:getState().drinkCooldown,position:{x:p.x,y:p.y,z:p.z},yaw,pitch,block:s.block,stick:{...stick},sips:s.sips,pendingAlcohol:s.pendingAlcohol,chaos:s.chaos,health:s.health,stamina:s.stamina,heat:s.heat,hits:s.hits,broken:s.broken,thrown:s.thrown,guardCount:guardSerial,capture:s.capture,nearGuards,securityAt:s.securityAt,alarmAt:s.alarmAt,cellVisible:world.cell.visible,cellCaptainVisible:!!cellCaptain?.group.visible,navigation:navigator.inspect(),attack:s.attack?{...s.attack}:null,held:held?.id??null,captain:avatar?.inspect(),actors:party.map(n=>({profile:n.actor.profile,id:n.id,health:n.health,guard:n.guard,state:n.state,y:n.actor.group.position.y,x:n.actor.group.position.x,z:n.actor.group.position.z})),limbTriangles:avatar?.limbTriangles||0}),test:{escape:escape.test,resumeStory,continueCell,limbs:()=>Object.fromEntries(['leftarm','leftforearm','lefthand','rightarm','rightforearm','righthand'].map(n=>{const b=avatar.bones.get(n),w=b.getWorldPosition(new T.Vector3()),l=avatar.group.worldToLocal(w.clone()),screen=w.project(camera);return [n,{local:l.toArray(),screen:screen.toArray()}]})),advance:seconds=>{for(let i=0;i<Math.ceil(seconds*60);i++)update(1/60);},foot,attack:doAttack,drink:requestDrink,grab,throwObject,arrest,spawnGuard,setPosition:(x,z,yawValue=0)=>{const y=floorAt(x,z);if(y!==null){p.set(x,y,z);yaw=yawValue;}},setState:o=>{for(const k of ['heat','chaos','health','stamina'])if(Number.isFinite(o[k]))s[k]=o[k];},props:()=>world.props.map(o=>({id:o.id,type:o.type,hp:o.hp,broken:o.broken,x:o.group.position.x,y:o.group.position.y,z:o.group.position.z})),party,model:s}};
}
