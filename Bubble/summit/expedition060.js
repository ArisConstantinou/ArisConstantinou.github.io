/* Goal-directed route, contextual teaching and earned, visible combat feedback.
 * No simulated success counters: progression is driven by landing, chest and hit events. */
import * as T from 'three';
import {ROUTE,distance,clamp,flightState} from './physics.js?v=0.6.0';
import {aimPoint} from './combat060.js?v=0.6.0';
const $=id=>document.getElementById(id),V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
export const flightKits=a=>Math.max(0,Math.min(Math.floor(a.bag[0]/3),Math.floor(a.bag[1]/2),Math.floor(a.bag[2])));
export function crossesRing(previous,current,ring){const a=V(previous.x-ring.x,previous.y-ring.y,previous.z-ring.z),b=V(current.x-ring.x,current.y-ring.y,current.z-ring.z),n=ring.normal;const da=a.dot(n),db=b.dot(n);if(da*db>0||Math.abs(da-db)<1e-7)return false;const at=a.clone().lerp(b,da/(da-db));return at.length()<=ring.radius&&a.distanceTo(b)<12;}
function signTexture(title,subtitle,color='#f6da9b'){
 const c=document.createElement('canvas');c.width=768;c.height=256;const t=c.getContext('2d');t.fillStyle='#142a32';t.fillRect(0,0,768,256);t.strokeStyle=color;t.lineWidth=8;t.strokeRect(8,8,752,240);t.textAlign='center';t.fillStyle=color;t.font='700 62px system-ui';t.fillText(title,384,113);t.fillStyle='#e7eeea';t.font='34px system-ui';t.fillText(subtitle,384,182);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;return map;
}
export class Expedition{
 constructor(g){this.g=g;this.rings=[];this.particles=[];this.stationVisuals=[];this.hitLabels=[];this.buildHUD();this.buildWorld();this.reset();}
 buildHUD(){
  const root=document.createElement('div');root.id='expeditionHUD';root.innerHTML=`
   <div id="objectiveCard"><small id="objectiveStep"></small><h2 id="objectiveTitle"></h2><p id="objectiveDetail"></p><div id="routeProgress"></div></div>
   <div id="pocketHUD"><strong id="kitCount"></strong><span id="raceRank"></span></div>
   <div id="contextCard"><button id="contextAction"></button><p id="contextExplain"></p></div>
   <section id="enemyCard" class="hidden"><small id="enemyTitle"></small><strong id="enemyState"></strong><div><label>ΣΩΜΑ</label><meter id="enemyHP" min="0" max="100"></meter><b id="enemyHPText"></b></div><div id="enemyMembrane"><label>ΦΟΥΣΚΑΛΑ</label><meter id="enemyBalloon" min="0" max="100"></meter><b id="enemyBalloonText"></b></div><p id="enemyWeight"></p></section>
   <div id="hitConfirm" class="hidden"><b id="hitTitle"></b><span id="hitNumbers"></span></div>
   <div id="worldAnnotations"></div><div id="crossHit"></div>
   <button id="guideButton" title="Οδηγός παιχνιδιού (K)">? <span>ΟΔΗΓΟΣ</span></button>
   <div id="flightLesson"><span id="lessonText"></span></div>`;
  $('hud').append(root);$('guideButton').onclick=()=>this.help();$('contextAction').onclick=()=>this.context();
  const help=document.createElement('section');help.id='guideScreen';help.className='screen hidden';help.innerHTML=`<div class="panel guide-panel"><button id="guideClose" class="close">×</button><small class="eyebrow">ΠΩΣ ΠΑΙΖΕΤΑΙ • Ο ΑΓΩΝΑΣ ΠΕΡΙΜΕΝΕΙ</small><h2>Από κορυφή σε κορυφή.</h2><p class="guide-intro">Πρώτος στο τελικό οροπέδιο, αφού προσγειωθείς και στα 3 φυλάκια. Δεν χρειάζεται να εξοντώσεις όλους τους φρουρούς.</p><div class="guide-grid"><article><b>01 · Η δική σου φουσκάλα</b><p>B / ΤΣΙΧΛΕΣ: πιάσε ένα κομμάτι, σύρε το στο στόμα και άφησέ το. Μετά πιάσε τη μικρή φουσκάλα και τράβα προς τα έξω. Μπορείς να ενώσεις μέχρι 3 χρώματα.</p></article><article><b>02 · Πέτα στον φωτεινό κύκλο</b><p>WASD: κίνηση. Κράτα Space για άνοδο, X για κάθοδο. Άφησέ τα για φρένο. Στο κινητό κράτα ↑ / ↓. Κοντά στην προσγείωση, άφησε την οριζόντια κίνηση πριν κατεβείς.</p></article><article><b>03 · Άνοιξε το χρυσό κιβώτιο</b><p>Η προσγείωση καταγράφεται αυτόματα. Το βέλος σε οδηγεί στα εφόδια — όχι κατευθείαν στο επόμενο βουνό. Πλησίασε και πάτησε F / το κουμπί αλληλεπίδρασης. Παίρνεις ένα πλήρες σετ για νέα φουσκάλα.</p></article><article><b>04 · Η τσίχλα έχει συνέπειες</b><p>Αριστερό κλικ: βολές. Δεξί κράτημα και άφημα: βαριά βολή. Στο κινητό ο εξωτερικός δακτύλιος πυροβολεί. Μόνο η πραγματική πρόσκρουση προσθέτει βάρος και μειώνει αντοχή. Εκτός 90 m / πίσω από εμπόδιο δεν υπάρχει βοήθεια στόχευσης.</p></article><article><b>Προαιρετικές προκλήσεις</b><p>Πέρασε μέσα από τους πράσινους δακτυλίους για +8 s μεμβράνης. Αντιμετώπισε ή παράκαμψε τις κοντινές φρουρές. Τα επιπλέον κιβώτια και τα λάφυρα δίνουν περισσότερα σετ.</p></article><article><b>Όλα τα χειριστήρια</b><p>R: αναγέμιση · H: καθάρισμα στο έδαφος · C: FPS / TOP · M: χάρτης · Shift: τρέξιμο · Q/E: πλάγια κλίση · Esc: παύση · K: αυτός ο οδηγός. Ctrl / Alt δεν χρησιμοποιούνται.</p></article></div><button id="guideResume" class="primary">ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΠΑΙΧΝΙΔΙ →</button></div>`;document.body.append(help);$('guideClose').onclick=$('guideResume').onclick=()=>this.help(false);
  const nav=$('hud').querySelector('nav');nav.insertBefore($('guideButton'),nav.lastElementChild);
 }
 buildWorld(){const w=this.g.world;
  const gold=new T.MeshStandardMaterial({color:0xdcb471,metalness:.68,roughness:.3});
  for(const [i,p]of ROUTE.entries()){
   // Supply box stays outside roof/columns. Its visual and solid occupy the same place.
   const x=p.x+6,z=p.z+7,y=w.height(x,z),base=w.box(x,y,z,2.1,1.15,1.3,w.woodMaterial),lid=w.box(x,y+1.15,z,2.18,.19,1.36,gold,false);
   const c={x,y,z,site:i,index:3,main:true,opened:false,looted:new Set,base,lid};w.chests.push(c);
   for(const dx of[-.64,.64])w.box(x+dx,y+.02,z,.12,1.16,1.34,gold,false);
   const halo=new T.Mesh(new T.RingGeometry(1.7,2,48),new T.MeshBasicMaterial({color:0xffd186,side:T.DoubleSide,transparent:true,opacity:.8}));halo.rotation.x=-Math.PI/2;halo.position.set(x,y+.06,z);this.g.scene.add(halo);this.stationVisuals.push({c,halo});
   const sign=new T.Mesh(new T.PlaneGeometry(3.3,1.1),new T.MeshStandardMaterial({map:signTexture(i===4?'ΤΕΡΜΑΤΙΣΜΟΣ':i===0?'ΑΦΕΤΗΡΙΑ':'ΦΥΛΑΚΙΟ 0'+i,'ΕΦΟΔΙΑ  •  F'),side:T.DoubleSide,roughness:.7}));sign.position.set(x,y+2.5,z);this.g.scene.add(sign);
   const ring=new T.Mesh(new T.RingGeometry(p.r*.54,p.r*.55,96),new T.MeshBasicMaterial({color:0x9bf0d4,transparent:true,opacity:.48,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(p.x,p.y+.09,p.z);this.g.scene.add(ring);
  }
  for(let leg=0;leg<4;leg++){const a=ROUTE[leg],b=ROUTE[leg+1],normal=V(b.x-a.x,0,b.z-a.z).normalize();for(const f of [.3,.62]){const x=a.x+(b.x-a.x)*f,z=a.z+(b.z-a.z)*f,y=Math.max(w.height(x,z)+13,a.y+(b.y-a.y)*f+18);const mesh=new T.Mesh(new T.TorusGeometry(8,.13,8,64),new T.MeshStandardMaterial({color:0x88e7c5,emissive:0x309778,emissiveIntensity:1,roughness:.3}));mesh.position.set(x,y,z);mesh.quaternion.setFromUnitVectors(V(0,0,1),normal);this.g.scene.add(mesh);this.rings.push({x,y,z,normal,radius:8,mesh,leg,seen:new Set});}}
 }
 reset(){this.lastTarget=null;this.lastHit=-100;this.impactCount=0;this.confirmedHits=0;this.ringsPassed=0;this.kills=0;this.helpOpen=false;this.g.helpOpen=false;this.previous=null;this.localGoal=null;this.contextCommand=null;this.rankFinish=[];this.lastGround=false;this.hitLabels=[];$('worldAnnotations').replaceChildren();this.annotations=new Map;for(const a of this.g.bodies.filter(a=>a.id!==0)){const el=document.createElement('div');el.className='enemy-tag';$('worldAnnotations').append(el);this.annotations.set(a.id,el);}for(const r of this.rings){r.seen.clear();r.mesh.visible=true;r.mesh.material.color.setHex(0x88e7c5);}for(const effect of this.particles)this.g.scene.remove(effect.mesh);this.particles=[];$('guideScreen').classList.add('hidden');$('hitConfirm').classList.add('hidden');document.body.classList.add('expedition');}
 help(force){const on=force??!this.helpOpen;if(on&&this.g.crafting)return;this.helpOpen=this.g.helpOpen=on;this.g.input.clear();this.g.charge=0;$('guideScreen').classList.toggle('hidden',!on);if(on&&document.pointerLockElement)document.exitPointerLock();}
 claimLanding(a){if(!a.alive||!a.grounded||a.target>3)return false;const p=ROUTE[a.target];if(Math.abs(a.y-p.y)>2||distance(a,p)>p.r*.6)return false;const index=a.target;a.checkpoint=index;a.target=index+1;a.balloon=null;a.hp=Math.min(100,a.hp+15);if(a.id===0){this.g.notify('ΠΡΟΣΓΕΙΩΣΗ 0'+index+' ✓ · Πήγαινε στο χρυσό κιβώτιο για την επόμενη φουσκάλα.',4);this.g.sound('reward');}return true;}
 supply(a){return this.g.world.chests.filter(c=>!c.looted.has(a.id)&&c.site===a.checkpoint).sort((c,d)=>(c.main?-100:0)+distance(c,a)-(d.main?-100:0)-distance(d,a))[0]||this.g.world.chests.filter(c=>!c.looted.has(a.id)).sort((c,d)=>distance(c,a)-distance(d,a))[0];}
 clearAir(a){return !this.g.world.ray(V(a.x,a.y+1.8,a.z),V(0,1,0),5.5);}
 goal(){const a=this.g.player,p=ROUTE[a.target],kit=flightKits(a),touch=this.g.input.touch;
  if(!a.alive)return{step:'ΑΝΑΚΤΗΣΗ',title:'Επιστρέφεις στο τελευταίο φυλάκιο',detail:'Σε '+Math.ceil(a.respawn)+' s · διατηρείται η διαδρομή σου.',point:ROUTE[a.checkpoint]};
  if(a.grounded&&!a.balloon){if(!kit){const c=this.supply(a);return{step:'02 / 03 · ΑΝΕΦΟΔΙΑΣΜΟΣ',title:'Πάρε υλικά για νέα φουσκάλα',detail:'Ακολούθησε το χρυσό βέλος. Ένα κιβώτιο δίνει ολόκληρο σετ — δεν ψάχνεις κάθε υλικό χωριστά.',point:c||ROUTE[a.checkpoint],kind:'cache'};}
   if(!this.clearAir(a))return{step:'03 / 03 · ΕΤΟΙΜΑΣΙΑ',title:'Βγες σε ανοιχτό χώρο',detail:'Η φουσκάλα δεν χωρά κάτω από στέγη. Προχώρησε στον φωτεινό κύκλο.',point:ROUTE[a.checkpoint],kind:'open'};
   return{step:'03 / 03 · ΕΤΟΙΜΑΣΙΑ',title:a.checkpoint?'Φτιάξε την επόμενη φουσκάλα':'Διάλεξε την πρώτη σου τσίχλα',detail:touch?'Πάτησε ΤΣΙΧΛΕΣ. Πιάσε κομμάτι → στόμα → τράβηξε τη φουσκάλα.':'Πάτησε B. Πιάσε κομμάτι → στόμα → τράβηξε τη φουσκάλα.',point:null,kind:'craft'};}
  const close=distance(a,p)<65;return{step:'01 / 03 · ΠΤΗΣΗ '+a.target+'/4',title:close?'Προσγειώσου στον φωτεινό κύκλο':'Πέτα προς '+p.name,detail:close?(touch?'Άφησε την κίνηση. Κράτα ↓ μέχρι να πατήσεις.':'Άφησε W / A / S / D. Κράτα X μέχρι να πατήσεις.'):(touch?'Κίνηση αριστερά · κράτα ↑ / ↓ για ύψος.':'WASD για κίνηση · Space ↑ / X ↓ · άφησε για φρένο.'),point:p,kind:'flight'};
 }
 context(){if(!this.g.playing())return;if(this.contextCommand==='collect')this.g.collect(this.g.player);else if(this.contextCommand==='craft')this.g.openCraft();else this.help(true);}
 tick(dt){const g=this.g,p=g.player;for(const a of g.bodies)if(a.grounded&&a.groundTime>.25&&!a.finish)this.claimLanding(a);
  for(const ring of this.rings){if(p.balloon&&ring.leg===p.checkpoint&&!ring.seen.has(p.id)&&this.previous&&crossesRing(this.previous,p,ring)){ring.seen.add(p.id);ring.mesh.material.color.setHex(0xffcf8b);p.balloon.life=Math.min(p.balloon.maxLife,p.balloon.life+8);p.ammo=Math.min(64,p.ammo+8);this.ringsPassed++;g.notify('ΠΕΡΑΣΜΑ ΑΝΕΜΟΥ ✓ · +8 s μεμβράνη · +8 βολές',2.5);g.sound('reward');}}
  this.previous={x:p.x,y:p.y,z:p.z};
  for(const s of this.stationVisuals){s.halo.visible=!s.c.looted.has(0);s.halo.material.opacity=.5+Math.sin(g.time*2)*.18;}
  for(let i=this.particles.length-1;i>=0;i--){const e=this.particles[i];e.life-=dt;e.mesh.position.addScaledVector(e.velocity,dt);e.velocity.y-=dt*2;e.mesh.scale.multiplyScalar(Math.exp(-dt*1.4));if(e.life<=0){g.scene.remove(e.mesh);e.mesh.material.dispose();this.particles.splice(i,1);}}
 }
 impact(a,point,info){const g=this.g;
  for(let i=0;i<(info.burst?18:8);i++){const geo=g.gumGeo,mat=new T.MeshStandardMaterial({color:info.color,roughness:.22}),mesh=new T.Mesh(geo,mat);mesh.position.copy(point);mesh.scale.setScalar(info.burst?3:1.15);g.scene.add(mesh);const angle=i*2.399+g.time;this.particles.push({mesh,life:info.burst?1:.42,velocity:V(Math.sin(angle)*2.4,1+(i%4)*.35,Math.cos(angle)*2.4)});}
  if(info.owner.id!==0)return;this.lastTarget=a;this.lastHit=g.time;this.confirmedHits++;this.lastInfo=info;
  $('hitConfirm').classList.remove('hidden');$('hitTitle').textContent=info.burst?'ΦΟΥΣΚΑΛΑ ΕΣΠΑΣΕ':info.region==='balloon'?'ΠΡΟΣΚΡΟΥΣΗ ΣΤΗ ΦΟΥΣΚΑΛΑ':'ΤΣΙΧΛΑ ΣΤΟ ΣΩΜΑ';$('hitNumbers').textContent='+'+info.weight.toFixed(1)+' kg  ·  −'+Math.round(info.region==='balloon'?info.integrity:info.damage)+(info.region==='balloon'?' αντοχή':' ζωή');
  if(a.hp<=0){this.kills++;$('hitTitle').textContent='ΑΝΤΙΠΑΛΟΣ ΕΚΤΟΣ ΜΑΧΗΣ';$('hitNumbers').textContent='Άφησε υλικά στο έδαφος.';}
 }
 ui(){const g=this.g,p=g.player,t=g.time,goal=this.goal();this.localGoal=goal;document.body.classList.toggle('on-foot',p.grounded);document.body.classList.toggle('in-flight',!p.grounded);$('objectiveStep').textContent=goal.step;$('objectiveTitle').textContent=goal.title;$('objectiveDetail').textContent=goal.detail;
  const progress=p.checkpoint;for(let i=0;i<4;i++){let el=$('routeProgress').children[i];if(!el){el=document.createElement('span');$('routeProgress').append(el);}el.className=i<progress?'done':i===progress?'current':'';el.textContent=i===3?'ΤΕΡΜΑ':'0'+(i+1);}
  const destination=document.querySelector('#flightHUD .destination');destination.querySelector('small').textContent=goal.kind==='cache'?'ΕΦΟΔΙΑ':p.grounded?'ΕΠΟΜΕΝΗ ΠΤΗΣΗ':'ΠΡΟΣΓΕΙΩΣΗ';if(goal.kind==='cache'){$('landingDistance').textContent=Math.round(distance(p,goal.point));$('distanceUnit').textContent='m';destination.querySelector('label').textContent='Χρυσό κιβώτιο';}else destination.querySelector('label').textContent='Οριζόντια απόσταση';
  $('kitCount').textContent='◈ '+flightKits(p)+' ΣΕΤ ΤΣΙΧΛΑΣ';const finished=g.bodies.filter(a=>a.kind==='racer'&&a.finish).length;$('raceRank').textContent='Περάσματα '+this.ringsPassed+'/8 · '+finished+' στον τερματισμό';
  const c=g.world.chests.filter(c=>!c.looted.has(0)&&Math.abs(c.y-p.y)<2&&distance(p,c)<6).sort((c,d)=>distance(p,c)-distance(p,d))[0];
  this.contextCommand=p.grounded?(c?'collect':goal.kind==='craft'?'craft':null):null;
  $('contextAction').textContent=this.contextCommand==='collect'?(g.input.touch?'ΑΝΟΙΞΕ ΚΙΒΩΤΙΟ':'F · ΑΝΟΙΞΕ ΚΙΒΩΤΙΟ'):this.contextCommand==='craft'?(g.input.touch?'ΤΣΙΧΛΕΣ → ΝΕΑ ΦΟΥΣΚΑΛΑ':'B · ΤΣΙΧΛΕΣ → ΝΕΑ ΦΟΥΣΚΑΛΑ'):goal.kind==='cache'?'ΕΦΟΔΙΑ · '+Math.round(distance(p,goal.point))+' m':'? · ΠΩΣ ΠΑΙΖΕΤΑΙ';
  $('contextExplain').textContent=this.contextCommand==='collect'?'Πλήρες σετ τσίχλας + αναγέμιση.':goal.kind==='cache'?'Το χρυσό βέλος οδηγεί στο κιβώτιο.':p.balloon?'Πράσινοι δακτύλιοι: +8 s · προαιρετική διαδρομή.':'';
  $('contextCard').classList.toggle('quiet',!p.grounded);$('flightHUD').classList.toggle('on-foot',p.grounded);
  const target=g.target?.alive?g.target:t-this.lastHit<3?this.lastTarget:null;
  $('enemyCard').classList.toggle('hidden',!target);if(target){const d=Math.hypot(target.x-p.x,target.y-p.y,target.z-p.z),b=target.balloon;const falling=target.vy<-.8;
   $('enemyTitle').textContent=target.name+' · '+Math.round(d)+' m';$('enemyState').textContent=target.hp<=0?'ΕΚΤΟΣ ΜΑΧΗΣ':falling?'↓ ΚΑΤΕΒΑΙΝΕΙ '+(-target.vy).toFixed(1)+' m/s':b?'ΣΤΟΧΟΣ: ΦΟΥΣΚΑΛΑ':'ΣΤΟΧΟΣ: ΣΩΜΑ';$('enemyHP').value=target.hp;$('enemyHPText').textContent=Math.max(0,Math.round(target.hp));$('enemyMembrane').classList.toggle('hidden',!b);if(b){$('enemyBalloon').value=b.integrity/b.maxIntegrity*100;$('enemyBalloonText').textContent=Math.round(b.integrity/b.maxIntegrity*100)+'%';}$('enemyWeight').textContent='Κολλημένη τσίχλα: '+target.gum.toFixed(1)+' kg';
  }
  if(t-this.lastHit>1.5)$('hitConfirm').classList.add('hidden');const hitActive=t-this.lastHit<.15;$('reticle').classList.toggle('confirmed',hitActive);
  for(const a of g.bodies){if(a.id===0)continue;const el=this.annotations.get(a.id);if(!el)continue;const pos=aimPoint(a);pos.y+=(a.balloon?a.balloon.r+.5:1.1);const xy=g.project(pos),d=distance(a,p),visible=a.alive&&d<80&&xy.front&&xy.x>0&&xy.x<innerWidth&&xy.y>50&&xy.y<innerHeight-100&&g.visible(p,a);el.style.display=visible?'block':'none';if(visible){el.textContent=a.name+' · '+Math.round(d)+'m';el.style.left=xy.x+'px';el.style.top=xy.y+'px';el.style.setProperty('--hp',a.hp+'%');}}
  if(goal.point){const point=goal.point,mark=g.project(V(point.x,point.y+(goal.kind==='cache'?2:4),point.z));$('targetMarker').classList.remove('hidden');$('targetMarker').style.left=clamp(mark.x,60,innerWidth-60)+'px';$('targetMarker').style.top=clamp(mark.front?mark.y:innerHeight-235,innerWidth<600?390:190,innerHeight-210)+'px';$('markerLabel').textContent=(goal.kind==='cache'?'ΕΦΟΔΙΑ':'ΠΡΟΣΓΕΙΩΣΗ')+' · '+Math.round(distance(p,point))+' m';}else $('targetMarker').classList.add('hidden');
  const kit=flightKits(p);$('materials').textContent=kit+' έτοιμα σετ · R αναγέμιση';$('lessonText').textContent=p.balloon?(g.input.touch?'Μέσα στον δεξί μοχλό: στόχευση · έξω: βολές':'Στόχευσε με ποντίκι · αριστερό: βολές · δεξί: βαριά βολή'):(g.input.touch?'Κράτα την κίνηση προς το χρυσό κιβώτιο.':'WASD: κίνηση · Shift: τρέξιμο · C: κάμερα · K: οδηγός');
 }
}
