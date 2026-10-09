import * as THREE from 'three';
import {ATTACKS,attackKey,absorb,moveCircle,segmentBlocked,inStrike,clamp} from './chaos-rules180.js?v=180';
import {actorFrom,createHands,aimActor} from './performer180.js?v=180';
import {buildChaosWorld} from './chaos-world180.js?v=180';
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const NAMES=['Ελένη','Άννα','Σοφία','Πλήρωμα · Νίκος','Δανάη','Κλειώ','Πλήρωμα · Ανδρέας','Λίνα'];
const EXTRA={6:['Μπλοκ','🛡'],7:['Πιάσε','✊'],8:['Πέτα','↗'],9:['Πιες','🥃']};
export function createChaos({ship,scene,camera,canvas,hud,getPeople,getState,canPlay,setThrottle,onToast,onHelm,startGame}){
 const world=buildChaosWorld(ship),ui=document.createElement('section');ui.id='chaos180';ui.hidden=true;
 ui.innerHTML=`<div class="chaos-heading"><span class="chapter-label">ONE BAD SHIFT / ΚΕΦΑΛΑΙΟ 01</span><h2 id="chaosObjective"></h2><p id="chaosSub"></p></div><div class="chaos-vitals"><label>ΧΑΟΣ <b id="chaosScore">0</b></label><label>ΑΝΤΟΧΗ <b id="chaosStamina">100</b><i id="staminaFill"></i></label><label>ΖΩΗ <b id="chaosHealth">100</b><i id="healthFill"></i></label><label>ΜΕΘΗ <b id="chaosIntox">0%</b><i id="intoxFill"></i></label></div><div id="heat180"><span>ΑΣΦΑΛΕΙΑ</span><b>○ ○ ○ ○ ○</b><small></small></div><div id="chaosTarget"></div><div id="crosshair180"><i></i><i></i></div><div id="hit180"></div><div id="speech180"></div><div id="move180" aria-label="Περπάτημα"><span></span><b>W A S D</b></div><div id="fight180"></div><button id="context180"><b>F</b><span>ΑΛΛΗΛΕΠΙΔΡΑΣΗ</span></button><button id="crouch180">CTRL · ΣΚΥΨΕ</button><div id="storyHint180">Κλικ στη σκηνή: ποντίκι · WASD: περπάτημα · αριθμοί: ενέργειες · Esc: παύση</div><div id="storyModal180" hidden><article><small id="modalKicker180"></small><h2 id="modalTitle180"></h2><p id="modalText180"></p><button id="modalNext180"></button></article></div>`;
 hud.append(ui);const $=id=>ui.querySelector('#'+id),buttons=new Map();
 for(let k=1;k<=9;k++){const [name,icon]=ATTACKS[k]?[ATTACKS[k].name,ATTACKS[k].icon]:EXTRA[k];const b=document.createElement('button');b.className='fight-key'+(k<=4?' primary':' secondary');b.dataset.key=k;b.id='attack180-'+k;b.innerHTML=`<kbd>${k}</kbd><span class="key-icon">${icon}</span><strong>${name}</strong><i></i>`;b.title=`${k} / NumPad ${k} — ${name}`;$('fight180').append(b);buttons.set(k,b);}
 const actors=[],bubbles=[],noiseRings=[],pressed=new Set();let hands=null,playerModel=null,savedVisible=[],mode='off',area=null,elapsed=0,chaos=0,heat=0,hp=100,stamina=100,pending=0,sips=0,lastSip=-10,action=null,blocking=false,held=null,violentAt=null,nextWave=0,wave=0,capture=0,modalFn=null,lookPointer=null,movePointer=null,stick={x:0,y:0},look={x:0,y:0},yaw=0,pitch=0,walkSpeed=0,crouch=false,detect=0,noise=null,near=null,hitFlash=0,sipAnim=0,shoutAt=0,finished=false,lastVocal=-100,sipBottle=null;
 let statistics={hits:0,slaps:0,punches:0,kicks:0,spits:0,broken:0,thrown:0,guards:0,boats:0};
 const player=V(),ray=new THREE.Raycaster(),origin=V(),direction=V();
 const isRoaming=()=>['deck','stealth','return','arrest'].includes(mode);
 const live=()=>mode!=='off'&&canPlay()&&!modalFn;
 function setObjective(title,sub=''){ $('chaosObjective').textContent=title;$('chaosSub').textContent=sub; }
 function styleMode(){ui.dataset.mode=mode;hud.classList.toggle('in-chaos',mode!=='off');hud.classList.toggle('chaos-roaming',isRoaming());if(hands){hands.root.visible=mode==='deck'||mode==='return';hands.held.visible=mode!=='stealth';}if(sipBottle)sipBottle.visible=false;if(playerModel)playerModel.root.visible=mode==='stealth';}
 function speak(text,actor=null,duration=3){
  const e=document.createElement('div');e.className='chaos-bubble';e.innerHTML='<small></small><span></span>';e.querySelector('small').textContent=actor?.name||'ΚΑΠΕΤΑΝΙΟΣ';e.querySelector('span').textContent=text;$('speech180').append(e);bubbles.push({e,actor,until:elapsed+duration});while(bubbles.length>3)bubbles.shift().e.remove();
 }
 function effect(kind){const audio=getState().audio;audio?.gameEffect?.(kind);}
 function caption(text){onToast(text);}
 function resetInputs(){pressed.clear();stick={x:0,y:0};blocking=false;action=null;movePointer=lookPointer=null;$('move180').firstElementChild.style.transform='translate(-50%,-50%)';for(const b of buttons.values())b.classList.remove('held');}
 function showModal(kicker,title,text,label,fn){resetInputs();document.exitPointerLock?.();$('modalKicker180').textContent=kicker;$('modalTitle180').textContent=title;$('modalText180').textContent=text;$('modalNext180').textContent=label;$('storyModal180').hidden=false;modalFn=fn;}
 $('modalNext180').onclick=()=>{const fn=modalFn;modalFn=null;$('storyModal180').hidden=true;fn?.();};
 function start(){
  stop();const templates=getPeople().getSpeakers();const captain=templates.find(t=>t.crew)||templates[0];
  if(!hands){hands=createHands(captain,camera);sipBottle=new THREE.Group();for(const child of world.props.find(p=>p.kind==='bottle').root.children)sipBottle.add(child.clone());camera.add(sipBottle);sipBottle.visible=false;sipBottle.scale.setScalar(.65);playerModel=actorFrom(captain);world.group.add(playerModel.root);const ring=new THREE.Mesh(new THREE.RingGeometry(.30,.38,32),new THREE.MeshBasicMaterial({color:0x75e4cd,side:THREE.DoubleSide,depthTest:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.055;playerModel.root.add(ring);}
  savedVisible=templates.map(t=>[t.group,t.group.visible]);for(const [g]of savedVisible)g.visible=false;
  mode='bridge';ui.hidden=false;elapsed=chaos=heat=pending=sips=wave=capture=detect=0;violentAt=null;nextWave=0;hp=stamina=100;lastSip=-10;finished=false;lastVocal=-100;shoutAt=0;sipAnim=0;statistics={hits:0,slaps:0,punches:0,kicks:0,spits:0,broken:0,thrown:0,guards:0,boats:0};getState().state.intox=0;getState().state.drinks=0;world.reset();styleMode();
  setObjective('Μία γουλιά. Μία πολύ κακή ιδέα.','Πάτησε 9 ή το ΟΥΙΣΚΙ. Μετά κατέβα στο κατάστρωμα.');
 }
 function stop(){resetInputs();if(held){held.held=false;held=null;}mode='off';ui.hidden=true;modalFn=null;$('storyModal180').hidden=true;for(const a of actors){a.actor.mixer.stopAllAction();a.actor.root.removeFromParent();a.cone?.removeFromParent();}actors.length=0;for(const [g,visible]of savedVisible)g.visible=visible;savedVisible=[];for(const b of bubbles)b.e.remove();bubbles.length=0;for(const r of noiseRings)r.mesh.removeFromParent();noiseRings.length=0;world.reset();if(hands){hands.root.visible=false;hands.held.clear();}if(playerModel)playerModel.root.visible=false;ship.exterior.visible=true;styleMode();}
 function clearActors(){for(const b of bubbles)b.e.remove();bubbles.length=0;for(const a of actors){a.actor.mixer.stopAllAction();a.actor.root.removeFromParent();a.cone?.removeFromParent();}actors.length=0;}
 function spawn(name,x,z,guard=false,index=0){
  const templates=getPeople().getSpeakers(),t=(guard||index===3||index===6)?templates.find(s=>s.crew):templates.filter(s=>!s.crew)[index%templates.filter(s=>!s.crew).length];const actor=actorFrom(t);
  if(!t.crew){const tint=new THREE.Color([0x4b7281,0x975666,0x809371,0xa8835b,0x655e91,0xb56850,0x618486,0x7a8898][index%8]);actor.model.traverse(m=>{if(!m.isMesh)return;const wasArray=Array.isArray(m.material),materials=wasArray?m.material:[m.material];m.material=materials.map(old=>{const material=old.clone();material.onBeforeCompile=shader=>{shader.uniforms.storyCloth={value:tint};shader.fragmentShader='uniform vec3 storyCloth;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\nfloat cloth180=smoothstep(.08,.24,min(diffuseColor.r,diffuseColor.g)-diffuseColor.b);diffuseColor.rgb=mix(diffuseColor.rgb,storyCloth*(.5+.5*diffuseColor.g),cloth180*.94);');};material.customProgramCacheKey=()=> 'story-cloth-180';return material;});if(!wasArray)m.material=m.material[0];});}
  area.root.add(actor.root);actor.root.position.set(x,0,z);
  const a={id:actors.length,name,actor,x,z,guard,hp:guard?85:58,status:'wander',retaliates:guard||index%3===0,attack:0,cd:1+index*.13,stun:0,down:0,anger:0,hitSide:1,react:0,target:V(x,0,z),path:[],pathAt:0,patrol:0,spoke:-20};actors.push(a);
  if(mode==='stealth'){
   const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(20*9),3));
   a.cone=new THREE.Mesh(geom,new THREE.MeshBasicMaterial({color:0xe9b862,transparent:true,opacity:.17,side:THREE.DoubleSide,depthWrite:false}));a.cone.frustumCulled=false;area.root.add(a.cone);
  }
  return a;
 }
 function enterDeck(){
  clearActors();world.areas.cell.root.visible=false;area=world.areas.lounge;area.root.visible=true;mode='deck';player.set(-5.65,.3,6.7);yaw=Math.PI;pitch=-.03;setThrottle(0);getState().state.speed=0;resetInputs();
  for(const [i,p]of [[-5,2],[-1,1],[5,0],[-5,-4],[0,-5],[4,-6],[-1,4],[5,3]].entries())spawn(NAMES[i],p[0],p[1],false,i);
  styleMode();setObjective('ΚΑΝΕ ΟΣΟ ΠΕΡΙΣΣΟΤΕΡΟ ΧΑΟΣ ΜΠΟΡΕΙΣ','1–4: χτυπήματα · 5: πρόκληση · 7/8: πιάσε/πέτα · 9: ουίσκι');caption('Ο αξιωματικός κρατά το πλοίο. Εσύ έχεις μια ολόκληρη κακή βάρδια μπροστά σου.');
 }
 function drink(){
  if(!live()||elapsed-lastSip<2.8)return false;
  if(mode==='bridge'&&sips){caption('Η πρώτη γουλιά αρκεί εδώ. Πάτησε F για το κατάστρωμα.');return false;}
  if(mode==='stealth'&&!finished){caption('Βρες το γεμάτο μπουκάλι πίσω από τους φύλακες.');return false;}
  if(!['bridge','deck','return','helm','stealth'].includes(mode))return false;
  const s=getState().state;lastSip=elapsed;sips++;pending=clamp(pending+(mode==='bridge'?8:23),0,100);s.drinks++;s.drinkAnim=1;sipAnim=1.25;effect('sip');
  if(mode==='bridge'){setObjective('Κατέβα στο κατάστρωμα των επιβατών.','F / ΚΑΤΕΒΑ — σύντομη μετάβαση στο AURORA Bar.');speak('Μια γουλιά. Τίποτε περισσότερο…');getState().audio.voice('captain1',{priority:0});}
  else if(elapsed>shoutAt){getState().audio.voice(s.intox<30?'captain2':s.intox<65?'captain3':'captain4',{priority:0});speak(s.intox<30?'Άλλο ένα. Και μετά σταματώ.':s.intox<65?'Εγώ είμαι ο καπετάνιος εδώ!':'Ποιος είπε ότι έκλεισε το μπαρ;');shoutAt=elapsed+9;}
  return true;
 }
 function walls(skip=null){
  if(!area)return [];const ws=area.walls.filter(w=>!(w.vent&&crouch));for(const p of area.props)if(p!==skip&&p.kind==='glass'&&!p.broken)ws.push({x:p.root.position.x,z:p.root.position.z,w:.07,d:3.6,h:2.7});
  for(const p of area.props)if(p!==skip&&!p.broken&&!p.held&&!p.flying&&(p.kind==='table'||p.kind==='chair'))ws.push({x:p.root.position.x,z:p.root.position.z,w:p.radius*1.6,d:p.radius*1.6,h:.95});return ws;
 }
 function target(max=3,grabbable=false){
  if(!area)return null;let result=null,dist=max;const ws=walls().filter(w=>!w.h||w.h>1.5);
  for(const a of actors){if(grabbable||a.down>0)continue;const d=player.distanceTo(V(a.x,0,a.z));if(d<dist&&inStrike(player,a,yaw,max,.79)&&!segmentBlocked(player,a,ws)){dist=d;result={actor:a,d};}}
  for(const p of area.props){if(p.broken||p.held||(grabbable&&(p===world.stash||!['bottle','vase','chair'].includes(p.kind))))continue;const q=p.root.position,d=Math.hypot(q.x-player.x,q.z-player.z);if(d<dist&&inStrike(player,q,yaw,max,.78)&&!segmentBlocked(player,q,walls(p).filter(w=>!w.h||w.h>1.5))){dist=d;result={prop:p,d};}}
  return result;
 }
 function addScore(n){chaos+=n;heat=clamp(heat+n*.42,0,100);if(violentAt===null){violentAt=elapsed;nextWave=elapsed+22;} }
 function hitActor(a,damage,force,key){
  if(a.down>0)return;const boost=getState().state.intox>60?1.25:1;a.hp-=damage*boost;a.stun=key===1?.25:.5;a.react=1;a.hitSide=Math.sin(elapsed*12)>0?1:-1;a.anger=1;
  const dx=a.x-player.x,dz=a.z-player.z,d=Math.hypot(dx,dz)||1;const p=V(a.x,0,a.z);moveCircle(p,dx/d*force,dz/d*force,walls(),area.bounds,.30);a.x=p.x;a.z=p.z;
  a.status=a.retaliates?'fight':'flee';if(elapsed-a.spoke>3){speak(a.guard?'Ακίνητος! Ασφάλεια πλοίου!':a.retaliates?'Τι κάνεις; Έλα εδώ!':'Βοήθεια! Φωνάξτε την ασφάλεια!',a);a.spoke=elapsed;if(elapsed-lastVocal>8){getState().audio.vocalEffect('scream');lastVocal=elapsed;}}
  if(a.hp<=0){a.down=mode==='return'?120:12;a.status='down';if(a.guard)statistics.guards++;}
 }
 function attack(k){
  if(!live()||!['deck','return'].includes(mode)||action)return false;const def=ATTACKS[k];if(!def)return false;if(stamina<def.cost){caption('Πάρε ανάσα — χαμηλή αντοχή.');return false;}
  stamina-=def.cost;action={...def,key:k,t:0,connected:false};blocking=false;buttons.get(k).classList.add('held');effect('swing');return true;
 }
 function contact(at){
  const t=target(at.reach);if(!t)return;hitFlash=.18;
  if(t.actor){const a=t.actor;if(at.key===5){
   const droplets=new THREE.Group();for(let i=0;i<5;i++){const drop=new THREE.Mesh(new THREE.SphereGeometry(.028,6,4),new THREE.MeshBasicMaterial({color:0xb3d7d7,transparent:true,opacity:.7}));drop.position.set((i-2)*.07,.04*Math.sin(i),0);droplets.add(drop);}area.root.add(droplets);droplets.position.set(a.x,1.5,a.z);noiseRings.push({mesh:droplets,t:1.8,spit:true});
   a.status=a.retaliates?'fight':'flee';a.anger=1;a.react=.5;speak('Σοβαρά τώρα;! Ασφάλεια!',a);statistics.spits++;effect('spit');}
   else{hitActor(a,at.damage,at.force,at.key);statistics.hits++;if(at.key<=2)statistics.slaps++;if(at.key===3)statistics.punches++;if(at.key===4)statistics.kicks++;effect(at.key<=2?'slap':'punch');}
   if(elapsed-a.lastScore>3||a.lastScore===undefined){addScore(at.score);a.lastScore=elapsed;}
  }else if(t.prop&&at.key!==5){const p=t.prop,broke=world.damage(p,at.damage);effect(p.kind==='glass'||p.kind==='bottle'?'glass':'wood');if(broke){statistics.broken++;addScore(p.kind==='glass'?45:25);caption(p.name+' · +'+(p.kind==='glass'?45:25)+' ΧΑΟΣ');}else if(p.kind==='chair'||p.kind==='table'){p.flying=true;p.velocity.set(Math.sin(yaw)*at.force*3,1.6,Math.cos(yaw)*at.force*3);} }
 }
 function grab(){
  if(!live()||!isRoaming())return;if(held){drop(false);return;}const t=target(2.6,true);
  if(t?.prop&&t.prop!==world.stash&&['bottle','vase','chair'].includes(t.prop.kind)){
   held=t.prop;held.held=true;held.flying=false;hands.held.add(held.root);held.root.position.set(0,-.05,0);held.root.rotation.set(0,0,0);caption(held.name+' — 8 για ρίψη');
  }else caption('Κοίτα κοντινό μπουκάλι, κύπελλο ή καρέκλα.');
 }
 function drop(throwIt=true){if(!held)return;const p=held;held=null;p.held=false;p.hitActor=false;area.root.attach(p.root);p.root.position.copy(player).add(V(Math.sin(yaw)*.6,1.15,Math.cos(yaw)*.6));p.flying=true;p.velocity.set(Math.sin(yaw)*(throwIt?9:1),throwIt?2.4:0,Math.cos(yaw)*(throwIt?9:1));if(throwIt){statistics.thrown++;effect('swing');}}
 function notifyNoise(p,id){if(area?.id!==id)return;effect('wood');noise={x:p.x,z:p.z,until:elapsed+5};const mesh=new THREE.Mesh(new THREE.RingGeometry(.08,.14,40),new THREE.MeshBasicMaterial({color:0xf4cc78,transparent:true,opacity:.8,side:THREE.DoubleSide,depthWrite:false}));mesh.rotation.x=-Math.PI/2;mesh.position.set(p.x,.04,p.z);area.root.add(mesh);noiseRings.push({mesh,t:0});}
 function thrownHit(p){if(p.area!==area?.id)return false;for(const a of actors){if(a.down>0)continue;if(Math.hypot(p.root.position.x-a.x,p.root.position.z-a.z)<.6&&p.root.position.y<2&&p.root.position.y>.15){hitActor(a,19,.5,3);if(mode!=='stealth')addScore(22);return true;}}return false;}
 function context(){
  if(!live())return;
  if(mode==='bridge'&&sips){showModal('ΚΑΤΑΣΤΡΩΜΑ 3','AURORA / AFTER HOURS','Ο αξιωματικός αναλαμβάνει τη γέφυρα. Εσύ κατεβαίνεις στο μπαρ.','ΜΠΕΣ ΣΤΟ ΚΑΤΑΣΤΡΩΜΑ',enterDeck);return;}
  if(mode==='deck'&&player.distanceTo(V(-6.9,0,-5.5))<2){if(world.releaseBoat()){statistics.boats++;addScore(120);speak('Η λέμβος! Ποιος την άφησε;!',actors.find(a=>!a.guard));caption('ΑΠΟΔΕΣΜΕΥΣΗ ΛΕΜΒΟΥ · +120 ΧΑΟΣ');}return;}
  if(mode==='stealth'){
   if(player.distanceTo(V(4.4,0,5.4))<2.2&&!finished){finished=true;world.stash.root.visible=false;caption('Βρήκες το γεμάτο μπουκάλι. 9 για να πιεις.');setObjective('Πάρε τις «δυνάμεις» σου πίσω.','9: πιες · F στην έξοδο όταν η μέθη ανέβει πάνω από 25%.');return;}
   if(finished&&getState().state.intox>=25&&player.z>5&&player.x<.5){enterReturn();return;}
  }
  if(mode==='return'&&player.z>5.4&&actors.every(a=>a.down>0)){
   mode='helm';for(const [group,visible] of savedVisible)group.visible=visible;area.root.visible=false;clearActors();ship.exterior.visible=true;setThrottle(.40);onHelm();styleMode();setObjective('Η γέφυρα είναι πάλι δική σου.','Κυβέρνησε μεθυσμένος μέχρι το λιμάνι. C: κάμερα · 9: ουίσκι.');caption('ΠΗΡΕΣ ΠΙΣΩ ΤΗ ΓΕΦΥΡΑ · '+chaos+' ΧΑΟΣ');return;
  }
  const t=target(3);if(t?.actor){const a=t.actor;speak(a.guard?'Επιστρέψτε στη θέση σας.':getState().state.intox>40?'Καπετάνιε… πόσα ποτήρια ήπιες;':'Καπετάνιε, όλα καλά με το πλοίο;',a);a.stun=.6;}
 }
 function arrested(){
  if(mode!=='deck')return;mode='arrest';styleMode();effect('alarm');showModal('ΑΣΦΑΛΕΙΑ ΠΛΟΙΟΥ','ΤΕΛΟΣ ΒΑΡΔΙΑΣ, ΚΑΠΕΤΑΝΙΕ.',`${chaos} ΧΑΟΣ · ${statistics.hits} χτυπήματα · ${statistics.broken} ζημιές · ${statistics.boats} λέμβοι. Σε ακινητοποίησαν. Η ιστορία δεν τελείωσε.`, 'ΚΟΙΜΗΣΟΥ / ΞΥΠΝΑ ΣΤΟ ΚΕΛΙ',enterStealth);
 }
 function enterStealth(){
  clearActors();if(held)drop(false);world.areas.lounge.root.visible=false;area=world.areas.cell;for(const p of area.props){p.root.removeFromParent();area.root.add(p.root);p.root.position.copy(p.home);p.root.rotation.set(0,0,0);p.root.visible=true;p.hp=p.initialHP;p.broken=p.held=p.flying=false;p.velocity.set(0,0,0);}area.root.visible=true;ship.exterior.visible=false;mode='stealth';player.set(-3.7,0,-3.3);yaw=0;pitch=0;hp=100;stamina=100;pending=0;getState().state.intox=0;crouch=false;finished=false;detect=0;noise=null;resetInputs();
  spawn('Φύλακας',3,-3,true,0);spawn('Υπάλληλος',-3,4,false,1);actors[1].guard=true;actors[1].status='patrol';playerModel.root.removeFromParent();area.root.add(playerModel.root);styleMode();
  setObjective('Ξύπνησες. Ήρθε η ώρα να φύγεις.','CTRL / ΣΚΥΨΕ: χαμηλό άνοιγμα · 7: πιάσε · 8: πέτα για αντιπερισπασμό.');speak(`Έσπασες ${statistics.broken} πράγματα και ξεκίνησες ${statistics.hits} χτυπήματα. Κάτσε εδώ.`,actors[0],5);
 }
 function enterReturn(){
  if(held)drop(false);clearActors();world.areas.cell.root.visible=false;ship.exterior.visible=true;area=world.areas.bridge;area.root.visible=true;mode='return';player.set(0,0,-2.5);yaw=0;pitch=0;hp=100;stamina=100;resetInputs();
  for(const [i,p]of [[-3,2],[3,3],[0,5],[-4,5]].entries()){const a=spawn('Ασφάλεια γέφυρας '+(i+1),p[0],p[1],true,i);a.status='fight';a.anger=1;}
  styleMode();setObjective('ΠΑΡΕ ΠΙΣΩ ΤΗ ΓΕΦΥΡΑ','Ξεπέρασε τους τέσσερις φύλακες. Μετά F μπροστά στο τιμόνι.');caption('Επέστρεψες στη γέφυρα. Σε περίμεναν.');
 }
 function navigate(a,t,dt,speed){
  const ws=walls().concat(crouch?area.walls.filter(w=>w.vent):[]),p=V(a.x,0,a.z),dx=t.x-a.x,dz=t.z-a.z,d=Math.hypot(dx,dz);if(d<.08)return;
  let vx=dx/d,vz=dz/d;if(segmentBlocked(p,V(a.x+vx*.8,0,a.z+vz*.8),ws,.31)){
   const options=[[vz,-vx],[-vz,vx],[vx*.5+vz*.5,vz*.5-vx*.5],[vx*.5-vz*.5,vz*.5+vx*.5]];let chosen=null,best=Infinity;
   for(const [x,z]of options){const q=V(a.x+x*.75,0,a.z+z*.75);if(segmentBlocked(p,q,ws,.31))continue;const value=q.distanceTo(t);if(value<best){best=value;chosen=[x,z];}}
   if(chosen)[vx,vz]=chosen;else return;
  }
  moveCircle(p,vx*speed*dt,vz*speed*dt,ws,area.bounds,.3);
  for(const other of actors)if(other!==a&&other.down<=0){const ox=p.x-other.x,oz=p.z-other.z,l=Math.hypot(ox,oz);if(l<.61&&l>.001){p.x=other.x+ox/l*.61;p.z=other.z+oz/l*.61;}}
  const dp=Math.hypot(p.x-player.x,p.z-player.z);if(dp<.62&&dp>.001){p.x=player.x+(p.x-player.x)/dp*.62;p.z=player.z+(p.z-player.z)/dp*.62;}
  const resolved=V(a.x,0,a.z);moveCircle(resolved,p.x-a.x,p.z-a.z,ws,area.bounds,.3);a.x=resolved.x;a.z=resolved.z;
 }
 function updateActors(dt){
  let visibleGuards=0,closeGuards=0;
  for(const a of actors){a.cd-=dt;a.stun=Math.max(0,a.stun-dt);a.react=Math.max(0,a.react-dt*3);const p=V(a.x,0,a.z),dist=p.distanceTo(player);let moving=false;
   if(a.down>0){a.down-=dt;a.actor.pose('idle',dt);a.actor.root.rotation.z=THREE.MathUtils.lerp(a.actor.root.rotation.z,1.45,Math.min(1,dt*7));a.actor.root.position.set(a.x,.12,a.z);if(a.down<=0){a.hp=a.guard?50:35;a.status=a.guard?'fight':'flee';}continue;}
   a.actor.root.rotation.z*=Math.exp(-dt*7);
   if(mode==='stealth'){
    if(a.cone){const verts=a.cone.geometry.attributes.position;let index=0;
     for(let i=0;i<20;i++){verts.setXYZ(index++,a.x,.07,a.z);for(const j of [i,i+1]){const angle=a.actor.root.rotation.y-.73+j*1.46/20;let distance=5;for(let k=1;k<=20;k++){const q={x:a.x+Math.sin(angle)*k*.25,z:a.z+Math.cos(angle)*k*.25};if(segmentBlocked(a,q,area.walls)){distance=(k-1)*.25;break;}}verts.setXYZ(index++,a.x+Math.sin(angle)*distance,.07,a.z+Math.cos(angle)*distance);}}verts.needsUpdate=true;
    }
    const routes=a.id===0?[V(3,0,-4),V(4.8,0,-1),V(2.8,0,1.7)]:[V(-3,0,4.7),V(-4,0,.6),V(-.1,0,5.5)];
    if(noise&&noise.until>elapsed&&Math.hypot(a.x-noise.x,a.z-noise.z)<9)a.target.set(noise.x,0,noise.z);else{if(p.distanceTo(routes[a.patrol%routes.length])<.5)a.patrol++;a.target.copy(routes[a.patrol%routes.length]);}
    const dx=a.target.x-a.x,dz=a.target.z-a.z;if(Math.hypot(dx,dz)>.25){a.actor.root.rotation.y=Math.atan2(dx,dz);navigate(a,a.target,dt,.75);moving=true;}
    const towards=Math.atan2(player.x-a.x,player.z-a.z),diff=Math.atan2(Math.sin(towards-a.actor.root.rotation.y),Math.cos(towards-a.actor.root.rotation.y));
    if(dist<(crouch?3.7:5.1)&&Math.abs(diff)<.73&&!segmentBlocked(p,player,area.walls)){visibleGuards++;if(elapsed-a.spoke>5){speak('Ποιος είναι εκεί;',a);a.spoke=elapsed;}}
   }else if(a.stun<=0){
    if(a.status==='fight'){
     a.actor.root.rotation.y=Math.atan2(player.x-a.x,player.z-a.z);
     if(dist>1.25){navigate(a,player,dt,a.guard?1.65:1.15);moving=true;}
     if(a.guard&&dist<2)closeGuards++;
     if(dist<1.65&&a.cd<=0&&a.attack<=0&&!segmentBlocked(p,player,walls())){a.attack=.7;a.cd=a.guard?1.8:2.3;}
    }else if(a.status==='flee'){
     a.target.set(clamp(a.x+(a.x-player.x)*2,-7,7),0,clamp(a.z+(a.z-player.z)*2,-7.8,7.8));if(dist<6){a.actor.root.rotation.y=Math.atan2(a.target.x-a.x,a.target.z-a.z);navigate(a,a.target,dt,1.7);moving=true;}
    }else{
     if(elapsed>a.pathAt){a.pathAt=elapsed+5+a.id%3;a.target.set(clamp(a.x+Math.sin(a.id+elapsed)*2,-6.5,6.5),0,clamp(a.z+Math.cos(a.id*3+elapsed)*2,-7,5));}
     if(p.distanceTo(a.target)>.3){a.actor.root.rotation.y=Math.atan2(a.target.x-a.x,a.target.z-a.z);navigate(a,a.target,dt,.48);moving=true;}
    }
   }
   a.actor.root.position.set(a.x,0,a.z);a.actor.pose(moving?'walk':'idle',dt);a.actor.react(a.react,a.hitSide);
   if(a.attack>0){const old=a.attack;a.attack-=dt;const worldTarget=area.root.localToWorld(player.clone());aimActor(a.actor,worldTarget,1-a.attack/.7);
    if(old>.3&&a.attack<=.3&&dist<1.85&&!segmentBlocked(p,player,walls())){
     const front=inStrike(player,a,yaw,2.5,.15),blocked=blocking&&front&&stamina>8;hp-=blocked?2:a.guard?13:8;if(blocked)stamina-=8;hitFlash=blocked?.10:.35;effect(blocked?'wood':'punch');if(hp<=0){if(mode==='deck')arrested();else showModal('Η ΑΣΦΑΛΕΙΑ ΣΕ ΣΤΑΜΑΤΗΣΕ','Όχι ακόμα, καπετάνιε.','Δοκίμασε μπλοκ και χώρισε τους φύλακες αντί να μείνεις ανάμεσά τους.','ΞΑΝΑ ΣΤΗ ΓΕΦΥΡΑ',enterReturn);}
    }
   }
  }
  if(mode==='stealth'){detect=clamp(detect+(visibleGuards?dt*(crouch?25:44):-dt*20),0,100);if(detect>=100)showModal('ΣΕ ΕΝΤΟΠΙΣΑΝ','Πίσω στο κελί.','Χρησιμοποίησε το χαμηλό πέρασμα και πέτα αντικείμενα για να τους απομακρύνεις.','ΞΑΝΑ ΑΠΟ ΤΟ ΚΕΛΙ',enterStealth);}
  if(mode==='deck'){capture=clamp(capture+(closeGuards>=3?dt: -dt*1.5),0,5.5);if(capture>=5.5)arrested();}
 }
 function key(k){if(k<=5)return attack(k);if(k===6){blocking=true;buttons.get(6).classList.add('held');}if(k===7)grab();if(k===8)drop();if(k===9)drink();}
 for(const [k,b]of buttons){b.addEventListener('pointerdown',e=>{if(!live())return;e.preventDefault();e.stopPropagation();b.setPointerCapture(e.pointerId);key(k);});for(const name of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(name,()=>{if(k===6){blocking=false;b.classList.remove('held');}});}
 $('context180').onclick=context;$('crouch180').onclick=()=>{crouch=!crouch;};
 const captureKey=e=>{
  if(mode==='off'||!canPlay()||modalFn)return;const k=attackKey(e.code);if(k){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)key(k);return;}
  if(['KeyF','ControlLeft','ControlRight','KeyW','KeyA','KeyS','KeyD','ShiftLeft','KeyG','KeyE','Space'].includes(e.code)&&(isRoaming()||['KeyF','KeyE','KeyG'].includes(e.code))){
   e.preventDefault();e.stopImmediatePropagation();pressed.add(e.code);if(e.code==='KeyF'&&!e.repeat)context();if(e.code==='KeyE'&&!e.repeat)drink();if(e.code.startsWith('Control'))crouch=true;
  }
 };
 window.addEventListener('keydown',captureKey,true);window.addEventListener('keyup',e=>{pressed.delete(e.code);if(attackKey(e.code)===6){blocking=false;buttons.get(6).classList.remove('held');}if(e.code.startsWith('Control'))crouch=false;},true);
 const pad=$('move180');function movePad(e){const r=pad.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/35,y=(e.clientY-r.top-r.height/2)/35,l=Math.max(1,Math.hypot(x,y));stick={x:x/l,y:y/l};pad.firstElementChild.style.transform=`translate(calc(-50% + ${stick.x*32}px),calc(-50% + ${stick.y*32}px))`;}
 pad.addEventListener('pointerdown',e=>{if(!live()||movePointer!==null)return;e.preventDefault();movePointer=e.pointerId;pad.setPointerCapture(e.pointerId);movePad(e);});pad.addEventListener('pointermove',e=>{if(e.pointerId===movePointer)movePad(e);});for(const n of ['pointerup','pointercancel','lostpointercapture'])pad.addEventListener(n,e=>{if(e.pointerId===movePointer){movePointer=null;stick={x:0,y:0};pad.firstElementChild.style.transform='translate(-50%,-50%)';}});
 canvas.addEventListener('pointerdown',e=>{
  if(!live()||!isRoaming())return;e.preventDefault();e.stopImmediatePropagation();
  if(e.pointerType==='mouse'&&mode!=='stealth'){
   if(document.pointerLockElement===canvas){if(e.button===0)attack(1);if(e.button===2)blocking=true;return;}
   try{const p=canvas.requestPointerLock?.();p?.catch?.(()=>{});}catch{}
  }
  if(lookPointer===null){lookPointer=e.pointerId;look={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);}
 },true);
 canvas.addEventListener('pointermove',e=>{
  if(!live()||!isRoaming())return;
  if(mode==='stealth'){
   ray.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2),camera);const plane=new THREE.Plane(V(0,1,0).applyQuaternion(ship.group.quaternion),0);const o=area.root.getWorldPosition(V());plane.setFromNormalAndCoplanarPoint(V(0,1,0).applyQuaternion(ship.group.quaternion),o);const q=ray.ray.intersectPlane(plane,V());if(q){area.root.worldToLocal(q);yaw=Math.atan2(q.x-player.x,q.z-player.z);}return;
  }
  let dx,dy;if(document.pointerLockElement===canvas){dx=e.movementX;dy=e.movementY;}else if(e.pointerId===lookPointer){dx=e.clientX-look.x;dy=e.clientY-look.y;look={x:e.clientX,y:e.clientY};}else return;
  yaw-=dx*.0035;pitch=clamp(pitch-dy*.0028,-.85,.8);e.stopImmediatePropagation();
 },true);
 for(const n of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(n,e=>{if(e.pointerId===lookPointer)lookPointer=null;if(e.button===2)blocking=false;},true);
 for(const n of ['blur','pagehide'])window.addEventListener(n,resetInputs);document.addEventListener('visibilitychange',()=>{if(document.hidden)resetInputs();});
 function tick(dt){
  if(mode==='off'||!canPlay())return;const s=getState().state;if(modalFn)return;elapsed+=dt;hitFlash=Math.max(0,hitFlash-dt);sipAnim=Math.max(0,sipAnim-dt);
  const dose=absorb(s.intox,pending,dt);s.intox=dose.intox;pending=dose.pending;stamina=clamp(stamina+dt*(blocking?2:18),0,100);
  if(mode==='bridge'||mode==='helm'){renderUI();return;}
  if(mode==='deck'&&violentAt!==null&&elapsed>=nextWave){nextWave=elapsed+23;wave++;const count=Math.min(3,1+wave);for(let i=0;i<count&&actors.filter(a=>a.guard).length<9;i++){const a=spawn('Ασφάλεια '+(actors.length-7),-5.9+i*.7,7.45,true,i);a.status='fight';a.anger=1;}speak(wave===1?'Ασφάλεια! Σταματήστε αμέσως!':'Ενισχύσεις στο κατάστρωμα!',actors.find(a=>a.guard));}
  const mx=stick.x+(pressed.has('KeyD')?1:0)-(pressed.has('KeyA')?1:0),mz=-stick.y+(pressed.has('KeyW')?1:0)-(pressed.has('KeyS')?1:0),len=Math.max(1,Math.hypot(mx,mz));
  const angle=mode==='stealth'?0:yaw;let dx=(-Math.cos(angle)*mx+Math.sin(angle)*mz)/len,dz=(Math.sin(angle)*mx+Math.cos(angle)*mz)/len;
  const moving=Math.hypot(dx,dz);walkSpeed=moving;const speed=(crouch?1.0:pressed.has('ShiftLeft')?3.8:2.5)*(1-s.intox*.0015);
  if(moving&&s.intox>30){dx+=Math.cos(elapsed*2.4)*s.intox*.0015;dz+=Math.sin(elapsed*1.7)*s.intox*.0006;}
  const ws=walls();for(const a of actors)if(a.down<=0)ws.push({x:a.x,z:a.z,w:.43,d:.43});moveCircle(player,dx*speed*dt,dz*speed*dt,ws,area.bounds,.28);player.y=mode==='deck'&&player.x< -4.8&&player.z>5.8?.3*clamp((player.z-5.8)/1.1,0,1):0;
  if(mode==='stealth'&&moving&&lookPointer===null)yaw=Math.atan2(dx,dz);
  if(action){const prev=action.t;action.t+=dt;if(!action.connected&&prev<action.contact&&action.t>=action.contact){action.connected=true;contact(action);}if(action.t>=action.duration){buttons.get(action.key)?.classList.remove('held');action=null;}}
  updateActors(dt);world.update(dt,notifyNoise,thrownHit);
  for(let i=noiseRings.length-1;i>=0;i--){const n=noiseRings[i];n.t+=dt;n.mesh.scale.setScalar(1+n.t*9);if(n.mesh.material)n.mesh.material.opacity=Math.max(0,.7-n.t*.3);if(n.spit)n.mesh.position.y-=dt*.7;if(n.t>2.5){n.mesh.removeFromParent();noiseRings.splice(i,1);}}
  if(playerModel&&mode==='stealth'){playerModel.pose(moving?'walk':'idle',dt);playerModel.root.position.copy(player);playerModel.root.position.y=crouch?-.55:0;playerModel.root.rotation.y=yaw;const b=playerModel.bones.get('spine');if(b&&crouch){b.rotateX(.9);for(const side of ['left','right']){playerModel.bones.get(side+'upleg')?.rotateX(-.95);playerModel.bones.get(side+'leg')?.rotateX(1.65);playerModel.bones.get(side+'foot')?.rotateX(-.65);}}}
  renderUI();
 }
 function renderUI(){
  const s=getState().state;$('chaosScore').textContent=chaos;$('chaosStamina').textContent=Math.round(stamina);$('chaosHealth').textContent=Math.max(0,Math.ceil(hp));$('chaosIntox').textContent=Math.round(s.intox)+'%';$('staminaFill').style.width=stamina+'%';$('healthFill').style.width=hp+'%';$('intoxFill').style.width=s.intox+'%';
  $('heat180').querySelector('b').textContent=mode==='stealth'?Math.round(detect)+'%':Array.from({length:5},(_,i)=>heat>i*20?'●':'○').join(' ');
  $('heat180').querySelector('small').textContent=mode==='stealth'?'ΥΠΟΨΙΑ':capture>0?'ΣΕ ΠΕΡΙΚΥΚΛΩΝΟΥΝ':violentAt===null?'ΔΕΝ ΕΙΔΟΠΟΙΗΘΗΚΕ':wave?'ΕΝΙΣΧΥΣΕΙΣ ΣΤΟ ΠΛΟΙΟ':`ΦΤΑΝΟΥΝ ΣΕ ${Math.max(0,Math.ceil(nextWave-elapsed))}s`;
  near=target(3);$('chaosTarget').textContent=near?.actor?near.actor.name+(near.actor.status==='fight'?' · ΘΥΜΩΜΕΝΟΣ':''):near?.prop?near.prop.name:'';
  $('hit180').style.opacity=hitFlash?'.65':'0';$('crosshair180').classList.toggle('target',!!near);$('crosshair180').classList.toggle('hit',hitFlash>0&&hitFlash<.2);
  const ctx=$('context180');let label='ΜΙΛΑ';if(mode==='bridge')label=sips?'ΚΑΤΕΒΑ ΣΤΟ ΜΠΑΡ':'ΠΡΩΤΑ ΜΙΑ ΓΟΥΛΙΑ';else if(mode==='deck'&&player.distanceTo(V(-6.9,0,-5.5))<2)label=world.boatReleased?'ΛΕΜΒΟΣ ΕΛΕΥΘΕΡΗ':'ΑΠΟΔΕΣΜΕΥΣΕ ΛΕΜΒΟ';else if(mode==='stealth')label=finished?(player.z>5&&player.x<.5?'ΕΞΟΔΟΣ ΠΡΟΣ ΓΕΦΥΡΑ':'ΒΡΕΣ ΤΗΝ ΕΞΟΔΟ'):(player.distanceTo(V(4.4,0,5.4))<2.2?'ΠΑΡΕ ΤΟ ΟΥΙΣΚΙ':'ΚΡΥΨΟΥ / ΒΡΕΣ ΤΟ ΟΥΙΣΚΙ');else if(mode==='return')label='ΑΝΑΛΑΒΕ ΤΟ ΤΙΜΟΝΙ';ctx.querySelector('span').textContent=label;
  $('crouch180').textContent=crouch?'CTRL · ΣΗΚΩ':'CTRL · ΣΚΥΨΕ';
  for(const [k,b]of buttons){b.style.setProperty('--cool',action?.key===k?Math.max(0,1-action.t/action.duration):0);b.classList.toggle('unavailable',(k<=5&&stamina<(ATTACKS[k]?.cost||0))||(k===8&&!held));}
 }
 function updateCamera(dt){
  if(!isRoaming()||!area)return false;
  if(mode==='stealth'){
   const center=area.root.localToWorld(V(0,0,0));camera.position.copy(area.root.localToWorld(V(0,innerHeight>innerWidth?20:17,-4)));camera.up.copy(V(0,1,0).applyQuaternion(ship.group.quaternion));camera.lookAt(center);camera.fov=innerHeight>innerWidth?62:58;
  }else{
   const s=getState().state,drunk=s.intox/100;
   const eye=player.clone().add(V(0,1.64+Math.sin(elapsed*9)*walkSpeed*.013,0));camera.position.copy(area.root.localToWorld(eye));const d=V(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)).applyQuaternion(ship.group.quaternion);camera.up.copy(V(0,1,0).applyQuaternion(ship.group.quaternion));camera.lookAt(camera.position.clone().add(d));camera.rotateZ(Math.sin(elapsed*1.7)*drunk*.011);camera.fov=innerHeight>innerWidth?76:73;
  }
  camera.updateProjectionMatrix();camera.updateMatrixWorld(true);hands?.update(elapsed,action,blocking,walkSpeed,sipAnim);if(sipBottle){sipBottle.visible=sipAnim>0&&(mode==='deck'||mode==='return');sipBottle.position.set(.24,-.35,-.58);sipBottle.rotation.set(-.2-sipAnim*.4,0,-.1);}
  for(let i=bubbles.length-1;i>=0;i--){const b=bubbles[i];if(elapsed>b.until){b.e.remove();bubbles.splice(i,1);continue;}let p;if(b.actor){p=area.root.localToWorld(V(b.actor.x,b.actor.actor.height+.18,b.actor.z)).project(camera);}else p=V(0,-.05,.5);const visible=p.z>0&&p.z<1&&Math.abs(p.x)<.93&&Math.abs(p.y)<.85;b.e.style.display=visible?'block':'none';b.e.style.left=clamp((p.x*.5+.5)*innerWidth,105,innerWidth-105)+'px';b.e.style.top=clamp((-.5*p.y+.5)*innerHeight,100,innerHeight-200)+'px';}
  return true;
 }
 function inspect(){return {version:'1.8.0',restoredOnboard:mode==='helm'?getPeople().getSpeakers().filter(p=>p.group.visible).length:0,mode,elapsed,chaos,heat,hp,stamina,pending,sips,yaw,pitch,player:{x:player.x,y:player.y,z:player.z},crouch,detect,held:held?.id??null,blocking,noise:noise?{...noise}:null,action:action?{key:action.key,t:action.t}:null,statistics:{...statistics},actors:actors.map(a=>({id:a.id,x:a.x,z:a.z,hp:a.hp,status:a.status,guard:a.guard,down:a.down})),props:world.props.map(p=>({id:p.id,area:p.area,kind:p.kind,x:p.root.position.x,z:p.root.position.z,hp:p.hp,broken:p.broken,flying:p.flying})),hands:hands?.inspect(),modal:!!modalFn};}
 return {start,stop,tick,updateCamera,drink,resetInputs,inspect,get enabled(){return mode!=='off';},get roaming(){return isRoaming();},get mode(){return mode;},
  test:{deck:enterDeck,stealth:enterStealth,returnBridge:enterReturn,place:(x,z,angle=0)=>{player.set(x,0,z);yaw=angle;pitch=0;},actor:(id,values)=>Object.assign(actors[id],values),arrest:arrested,context,press:key}}
}
