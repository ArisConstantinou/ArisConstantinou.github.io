/* First-stage choices, event-driven teaching, earned upgrades and checkpoint recovery. */
import * as T from 'three';
import {ROUTE,distance,clamp,balloonCenter} from './physics.js?v=0.6.0';
import {crossesRing,flightKits} from './expedition060.js?v=0.6.0';
import {trackThreat} from './combat052.js?v=0.6.0';
import {RidgeScenery} from './scenery070.js?v=0.7.0';
import {SAVE_KEY,readSave,writeSave} from './save070.js?v=0.7.0';
const $=id=>document.getElementById(id),V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
export class RidgeRun {
 constructor(g){this.g=g;this.storage=null;try{this.storage=window.localStorage;}catch{}this.scenery=new RidgeScenery(g);this.paths=this.buildPaths();this.caches=this.buildCaches();this.buildUI();this.reset();this.attachWind();this.refreshResume();}
 buildPaths(){const w=this.g.world,a=ROUTE[0],b=ROUTE[1];return ['valley','ridge'].map((name,route)=>{
  const color=route?0xf1bd78:0x87e3d5,points=[.24,.49,.75].map((f,i)=>{const x=a.x+(b.x-a.x)*f+Math.sin(f*Math.PI)*(route?65:-90),z=a.z+(b.z-a.z)*f;
   let floor=w.height(x,z);for(const [dx,dz]of[[12,0],[-12,0],[0,12],[0,-12]])floor=Math.max(floor,w.height(x+dx,z+dz));
   return {x,z,y:Math.max(floor+(route?52:16),a.y+(b.y-a.y)*f+(route?75:24)),radius:route?7:12,index:i,name};});
  for(let i=0;i<points.length;i++){const p=points[i],prev=i?points[i-1]:a,next=points[i+1]||b;p.normal=V(next.x-prev.x,0,next.z-prev.z).normalize();p.mesh=new T.Mesh(new T.TorusGeometry(p.radius,.15,8,72),new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.38,roughness:.6}));p.mesh.position.set(p.x,p.y,p.z);p.mesh.quaternion.setFromUnitVectors(V(0,0,1),p.normal);this.g.scene.add(p.mesh);}
  return{name,title:route?'ΡΑΧΗ':'ΚΟΙΛΑΔΑ',color,points,reward:route?'Ενίσχυση +40 στην επόμενη φουσκάλα':'Διάρκεια +15 s στην τωρινή φουσκάλα'};
 });}
 buildCaches(){const g=this.g,w=g.world,out=[];for(let site=1;site<=3;site++){const p=ROUTE[site],x=p.x,z=p.z-17,y=w.height(x,z);const mesh=w.box(x,y,z,2.35,1.45,1.6,this.scenery.wood);const lid=w.box(x,y+1.45,z,2.45,.18,1.7,this.scenery.brass,false);this.scenery.sign('ΑΠΟΘΗΚΗ ΦΡΟΥΡΑΣ','Προαιρετική μάχη · ενίσχυση',x,y+3,z,'#ffcb85');out.push({site,x,y,z,mesh,lid,claimed:false});}return out;}
 buildUI(){const box=document.createElement('div');box.id='ridgeHUD';box.innerHTML=`<div id="pilotLesson"><small>ΜΑΘΑΙΝΕΙΣ ΠΑΙΖΟΝΤΑΣ</small><b id="pilotLessonTitle"></b><span id="pilotLessonText"></span><div id="pilotLessonProgress"></div></div><div id="routeChoice"><b id="routeChoiceTitle"></b><span id="routeChoiceText"></span></div><div id="gateLabels"></div><div id="campSaveStatus"></div>`;$('hud').append(box);
  this.gateLabels=this.paths.map(p=>{const el=document.createElement('div');el.className='gate-label';el.style.setProperty('--gate','#'+p.color.toString(16));$('gateLabels').append(el);return el;});
  const resume=document.createElement('button');resume.id='resumeCamp';resume.className='primary hidden';resume.textContent='ΣΥΝΕΧΕΙΑ ΑΠΟ ΤΟ ΦΥΛΑΚΙΟ →';resume.onclick=()=>this.resume();$('startBtn').before(resume);$('startBtn').textContent='ΝΕΟΣ ΑΓΩΝΑΣ · ΑΝΟΙΞΕ ΤΙΣ ΤΣΙΧΛΕΣ ↗';
  const note=document.createElement('p');note.id='resumeDescription';note.className='fine';resume.after(note);
  const article=document.createElement('article');article.innerHTML='<b>Νέο: δύο διαδρομές και φρουραρχείο</b><p>Στην πρώτη πτήση, πέρασε την πρώτη γαλάζια ή πορτοκαλί πύλη για να διαλέξεις διαδρομή χωρίς μενού. Και οι 3 πύλες: κοιλάδα +15 s διάρκειας ή ράχη +40 αντοχή στην επόμενη φουσκάλα. Στα φυλάκια, η προαιρετική αποθήκη φρουράς ανοίγει μετά την εξουδετέρωση της τοπικής ομάδας. Τα απαραίτητα εφόδια παραμένουν ελεύθερα. Αποθήκευση στο τελευταίο φυλάκιο — όχι στη μέση πτήσης.</p>';$('guideScreen').querySelector('.guide-grid').append(article);
 }
 reset(){this.selected=null;this.gateIndex=0;this.routeDone=false;this.previous=null;this.learned=[false,false,false,false];this.lessonTime=[0,0,0,0];this.reinforcement=0;this.claimed=new Set;this.lastCamp=this.g.player?.checkpoint||0;this.lastSaved=-100;this.saveError=!this.storage;for(const cache of this.caches){cache.claimed=false;cache.lid.rotation.x=0;}this.updateGateVisuals();}
 attachWind(){const base=this.g.world.wind.bind(this.g.world);this.g.world.wind=(x,y,z,t)=>{const result=base(x,y,z,t);for(const route of this.paths)for(const p of route.points){const d=Math.hypot(x-p.x,z-p.z);if(d>24||Math.abs(y+4-p.y)>24)continue;const f=1-d/24;if(route.name==='ridge')result.x+=Math.sin(t*.7+p.index)*3.0*f;else result.y+=4*f;}return result;};}
 updateGateVisuals(){for(const route of this.paths)for(const p of route.points){p.mesh.visible=this.g.player?.checkpoint===0&&!this.routeDone&&(!this.selected||this.selected===route.name)&&p.index>=this.gateIndex;p.mesh.material.emissiveIntensity=p.index===this.gateIndex?.75:.10;}}
 tick(dt){const g=this.g,a=g.player;if(!a?.alive){this.previous=null;return;}
  if(a.checkpoint!==this.lastCamp){this.lastCamp=a.checkpoint;this.previous=null;this.save();}
  if(a.balloon&&!a.grounded){const c=balloonCenter(a);
   if(a.checkpoint===0&&!this.routeDone){for(const path of this.paths){if(this.selected&&this.selected!==path.name)continue;const p=path.points[this.gateIndex];if(this.previous&&crossesRing(this.previous,c,{...p,radius:p.radius-a.balloon.r*.85})){
     this.selected=path.name;this.gateIndex++;g.sound('reward');
     if(this.gateIndex===3){this.routeDone=true;if(path.name==='valley'){a.balloon.maxLife+=15;a.balloon.life+=15;}else this.reinforcement=Math.max(40,this.reinforcement);g.notify('ΔΙΑΔΡΟΜΗ '+path.title+' ✓ · '+path.reward,4);}else g.notify(path.title+' · '+this.gateIndex+'/3 πύλες. Συνέχισε στην επόμενη.',2);
     break;
    }}this.previous={...c};}
   const command=g.desiredPlayer(),step=this.learned.findIndex(v=>!v);const conditions=[Math.hypot(a.vx,a.vz)>3,command.up>.5&&a.vy>1,Math.abs(command.up)<.05&&Math.abs(a.vy)<.35,command.up<-.5&&a.vy<-.6];if(step>=0&&conditions[step]){this.lessonTime[step]+=dt;if(this.lessonTime[step]>.45){this.learned[step]=true;g.sound('reward');}}
  }else this.previous=null;
  this.updateGateVisuals();
 }
 updateUI(){const g=this.g,p=g.player;if(!p)return;const visible=g.running&&!g.crafting,step=this.learned.findIndex(v=>!v),touch=g.input.touch;
  $('pilotLesson').classList.toggle('hidden',!visible||step<0||p.checkpoint>0||!p.balloon);
  const headings=['Κινήσου προς το πρώτο βουνό','Δοκίμασε την άνοδο','Άφησε και σταθεροποιήσου','Δοκίμασε μια μικρή κάθοδο'];
  const details=touch?['Αριστερός μοχλός. Δεν χρειάζεται να πυροβολείς.','Κράτα ↑. Το ύψος αλλάζει όσο κρατάς.','Άφησε ↑ και ↓. Η κατακόρυφη κίνηση φρενάρει.','Κράτα ↓ για λίγο. Άφησε όταν κατέβεις.']:['Κράτα W. Με A / D αλλάζεις πλάγια θέση.','Κράτα Space. Το ύψος αλλάζει όσο κρατάς.','Άφησε Space και X. Η κατακόρυφη κίνηση φρενάρει.','Κράτα X για λίγο και μετά άφησέ το.'];
  if(step>=0){$('pilotLessonTitle').textContent=headings[step];$('pilotLessonText').textContent=details[step];}$('pilotLessonProgress').textContent=this.learned.map((v,i)=>v?'✓':i+1).join('   ');
  const c=this.caches.find(c=>c.site===p.checkpoint&&distance(c,p)<35&&!c.claimed),guards=c?g.bodies.filter(a=>a.kind==='guard'&&a.site===c.site&&a.alive):[];
  const activePath=this.paths.find(r=>r.name===this.selected);const showChoice=visible&&(p.checkpoint===0||!!c||this.reinforcement>0);
  $('routeChoice').classList.toggle('hidden',!showChoice);
  if(c&&p.grounded){$('routeChoiceTitle').textContent=guards.length?'ΑΠΟΘΗΚΗ ΦΡΟΥΡΑΣ · '+guards.length+' ΦΡΟΥΡΟΙ':'ΑΠΟΘΗΚΗ ΕΛΕΥΘΕΡΗ · F / ΛΑΦΥΡΑ';$('routeChoiceText').textContent=guards.length?'Προαιρετικά: εξουδετέρωσε τη φρουρά για +1 σετ και +40 αντοχή.':'Πλησίασε το πορτοκαλί κιβώτιο για την ενίσχυση.';}
  else if(this.routeDone){$('routeChoiceTitle').textContent='ΔΙΑΔΡΟΜΗ '+activePath?.title+' ✓';$('routeChoiceText').textContent=this.reinforcement?'Ενίσχυση +'+this.reinforcement+' έτοιμη για την επόμενη φουσκάλα.':'Η διάρκεια αυξήθηκε. Προσγειώσου στο πρώτο φυλάκιο.';}
  else if(activePath){$('routeChoiceTitle').textContent=activePath.title+' · '+this.gateIndex+'/3 ΠΥΛΕΣ';$('routeChoiceText').textContent=activePath.reward;}
  else if(p.checkpoint===0){$('routeChoiceTitle').textContent='ΔΙΑΛΕΞΕ ΜΕ ΤΗΝ ΠΤΗΣΗ ΣΟΥ';$('routeChoiceText').textContent='Γαλάζια κοιλάδα: πιο άνετη, +15 s. Πορτοκαλί ράχη: στενές πύλες / άνεμος, +40 αντοχή.';}
  else{$('routeChoiceTitle').textContent='ΕΝΙΣΧΥΣΗ ΕΤΟΙΜΗ';$('routeChoiceText').textContent='+'+this.reinforcement+' αντοχή στην επόμενη φουσκάλα.';}
  for(const [i,path]of this.paths.entries()){const gate=path.points[this.gateIndex],el=this.gateLabels[i],on=visible&&!this.routeDone&&p.checkpoint===0&&p.balloon&&(!this.selected||path.name===this.selected);el.style.display=on?'block':'none';if(!on)continue;const xy=g.project(V(gate.x,gate.y+gate.radius+2,gate.z));if(!xy.front){el.style.display='none';continue;}el.style.left=clamp(xy.x,55,innerWidth-75)+'px';el.style.top=clamp(xy.y,185,innerHeight-250)+'px';el.textContent=path.title+' '+(this.gateIndex+1)+'/3 · '+Math.round(distance(p,gate))+' m · '+(gate.y-p.y>0?'↑':'↓')+Math.round(Math.abs(gate.y-4.45-p.y))+' m';}
  $('campSaveStatus').textContent=this.saveError?'Δεν διατίθεται τοπική αποθήκευση':g.time-this.lastSaved<6?'✓ Αποθηκεύτηκε το φυλάκιο '+p.checkpoint:'';
  if(p.balloon&&p.checkpoint===0&&step>=0){$('objectiveDetail').textContent=details[step];$('objectiveStep').textContent='ΠΡΩΤΗ ΠΤΗΣΗ · ΕΚΜΑΘΗΣΗ '+(step+1)+'/4';}
  if(p.balloon&&p.checkpoint===0){$('contextExplain').textContent=$('routeChoiceTitle').textContent+' · '+$('routeChoiceText').textContent;}
  if((g.target?.alive)||g.time-g.director.lastHit<3)$('pilotLesson').classList.add('hidden');
  const enemy=g.target?.alive?g.target:g.time-g.director.lastHit<3?g.director.lastTarget:null;if(enemy?.tactic&&$('enemyCard')&&!$('enemyCard').classList.contains('hidden'))$('enemyTitle').textContent=enemy.name+' · '+enemy.tactic+' · '+Math.round(distance(p,enemy))+' m';
 }
 collectBonus(){const g=this.g,p=g.player;if(!p.grounded)return false;const c=this.caches.find(c=>distance(c,p)<5&&Math.abs(c.y-p.y)<2&&!c.claimed);if(!c)return false;
  const count=g.bodies.filter(a=>a.kind==='guard'&&a.site===c.site&&a.alive).length;if(count){g.notify('ΑΠΟΘΗΚΗ ΚΛΕΙΣΤΗ · Απομένουν '+count+' φρουροί. Τα κανονικά εφόδια είναι ελεύθερα.',3);return true;}
  c.claimed=true;c.lid.rotation.x=-.8;this.claimed.add(c.site);p.bag[0]+=3;p.bag[1]+=2;p.bag[2]++;this.reinforcement=Math.max(40,this.reinforcement);g.notify('ΦΡΟΥΡΑΡΧΕΙΟ ✓ · +1 σετ · +40 αντοχή στην επόμενη φουσκάλα.',4);g.sound('reward');this.save();return true;
 }
 launch(){const a=this.g.player;if(a.balloon&&this.reinforcement){a.balloon.integrity+=this.reinforcement;a.balloon.maxIntegrity+=this.reinforcement;this.reinforcement=0;}this.previous=null;}
 save(){const g=this.g,p=g.player;if(!this.storage||!p.alive||!p.grounded||p.checkpoint>3)return false;
  const s={schema:1,checkpoint:p.checkpoint,bag:p.bag.slice(),elapsed:g.elapsed,penalty:g.penalty,hp:p.hp,bonus:this.reinforcement,looted:g.world.chests.filter(c=>c.looted.has(0)).map(c=>c.site+':'+c.index),rewards:[...this.claimed],route:this.selected,routeDone:this.routeDone,learned:this.learned};const ok=writeSave(this.storage,s);this.saveError=!ok;if(ok)this.lastSaved=g.time;this.refreshResume();return ok;
 }
 refreshResume(){const s=this.storage?readSave(this.storage):null;$('resumeCamp').classList.toggle('hidden',!s);$('resumeDescription').textContent=s?'Αποθηκευμένο φυλάκιο '+s.checkpoint+'/3 · επαναφορά από το έδαφος, όχι από πτήση.':'';}
 newRun(){if(this.storage)try{this.storage.removeItem(SAVE_KEY);}catch{}this.reset();this.refreshResume();}
 resume(){const s=this.storage?readSave(this.storage):null;if(!s){this.refreshResume();return false;}const g=this.g;g.reset(true);const p=g.player,site=ROUTE[s.checkpoint];Object.assign(p,{x:site.x,z:site.z+15,y:site.y+.02,checkpoint:s.checkpoint,target:s.checkpoint+1,bag:s.bag,hp:s.hp});g.elapsed=s.elapsed;g.penalty=s.penalty;g.raceStarted=s.checkpoint>0;this.learned=s.learned;this.reinforcement=s.bonus;this.selected=s.routeDone?s.route:null;this.routeDone=s.routeDone;this.gateIndex=s.routeDone?3:0;this.lastCamp=s.checkpoint;this.claimed=new Set(s.rewards);
  for(const c of g.world.chests){if(s.looted.includes(c.site+':'+c.index)){c.looted.add(0);c.opened=true;}}
  for(const c of this.caches){c.claimed=this.claimed.has(c.site);c.lid.rotation.x=c.claimed?-.8:0;}
  // Expedition continuation, not a frame-accurate restoration of airborne rivals.
  for(const a of g.bodies.filter(a=>a.kind==='racer'&&a.id!==0)){a.x=site.x+(a.id-3)*3;a.z=site.z+20;a.y=site.y+.02;a.checkpoint=s.checkpoint;a.target=s.checkpoint+1;a.wait=4+a.id;a.bag=[3,2,1];}
  g.cameraReady=false;g.notify('Συνέχεια από το φυλάκιο '+s.checkpoint+'. Πάρε εφόδια ή φτιάξε τη φουσκάλα σου.',4);this.updateGateVisuals();return true;
 }
 map(){const ctx=$('map').getContext('2d'),size=$('map').width,pos=p=>({x:(p.x+1400)/2800*size,y:(p.z+1800)/3150*size});ctx.lineWidth=3;for(const path of this.paths){ctx.strokeStyle='#'+path.color.toString(16);ctx.beginPath();for(const [i,p]of [ROUTE[0],...path.points,ROUTE[1]].entries()){const q=pos(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);}ctx.stroke();}ctx.font='12px system-ui';ctx.fillStyle='#9be6d7';ctx.fillText('Γαλάζιο: κοιλάδα / άνετη',14,size-35);ctx.fillStyle='#f1bd78';ctx.fillText('Πορτοκαλί: ράχη / στενή',14,size-16);}
 npc(a,dt){const g=this.g;if(!a.alive||a.finish)return null;
  if(a.kind==='guard'){
   const target=trackThreat(g,a,dt);if(!target){a.tactic='ΠΕΡΙΠΟΛΙΑ';return null;}
   a.yaw=Math.atan2(target.x-a.x,target.z-a.z);const pressed=(g.target===a&&(g.input.left||g.input.ring))||a.shotFlash>0;
   if(a.hp<45||a.reload>0){const covers=this.scenery.cover.filter(c=>c.site===a.site);const c=covers.sort((x,y)=>distance(x,a)-distance(y,a))[0];if(c){const nx=c.x-target.x,nz=c.z-target.z,d=Math.hypot(nx,nz)||1,dest={x:c.x+nx/d*2,z:c.z+nz/d*2};a.tactic='ΚΑΛΥΨΗ';if(distance(a,dest)>1.5)return this.steer(a,dest,.7);return{};}}
   a.tactic=pressed?'ΑΠΟΦΥΓΗ':'ΣΤΟΧΕΥΕΙ';const d=distance(a,target);if(pressed&&distance(a,a.home)<24){const side=Math.sin(g.time*.7+a.id)>0?1:-1;return this.safeMove(a,{side:side*.55,forward:d<12?-.3:0,yaw:a.yaw});}
   if(d>28&&distance(a,a.home)<27)return this.steer(a,target,.5);return{};
  }
  if(a.balloon&&(a.gum>=20||a.balloon.integrity/a.balloon.maxIntegrity<.30||a.emergency)){
   if(!a.emergency){const p=ROUTE.slice(0,4).sort((p,q)=>distance(a,p)-distance(a,q))[0];a.emergency={x:p.x,z:p.z,y:p.y};}
   const dest=a.emergency,d=distance(a,dest),yaw=Math.atan2(dest.x-a.x,dest.z-a.z);a.yaw=yaw;a.tactic='ΑΝΑΓΚΑΣΤΙΚΗ ΠΡΟΣΓΕΙΩΣΗ';const ahead={x:a.x+Math.sin(yaw)*20,z:a.z+Math.cos(yaw)*20},alt=d<35?dest.y+1:Math.max(dest.y+12,g.world.height(ahead.x,ahead.z)+12);return{forward:d>20?.85:d>6?.25:0,yaw,up:clamp((alt-a.y)*.15-a.vy*.1,-1,1)};
  }
  if(a.grounded&&a.emergency){a.tactic='ΚΑΘΑΡΙΖΕΙ ΤΣΙΧΛΑ';a.gum=Math.max(0,a.gum-dt*6);if(a.gum<=.05){a.emergency=null;a.prep=0;}return{};}
  a.tactic=a.balloon?'ΑΓΩΝΑΣ':'ΑΝΕΦΟΔΙΑΣΜΟΣ';return null;
 }
 safeMove(a,d){const f=d.forward||0,s=d.side||0,dx=Math.sin(d.yaw)*f-Math.cos(d.yaw)*s,dz=Math.cos(d.yaw)*f+Math.sin(d.yaw)*s,x=a.x+dx*1.7,z=a.z+dz*1.7;if(this.g.world.blocked(x,a.y,z,a.radius,a.height)||this.g.world.height(x,z)>a.y+.45)return{};return d;}
 steer(a,p,speed=1){const yaw=Math.atan2(p.x-a.x,p.z-a.z);for(const offset of[0,.65,-.65,1.25,-1.25]){const d=this.safeMove(a,{forward:speed,yaw:yaw+offset});if(d.forward)return d;}return{};}
}
