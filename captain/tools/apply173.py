"""Guarded v1.7.2 -> v1.7.3 update. Only captain/ is changed."""
from pathlib import Path
import json,hashlib
P=Path('captain')
def get(name): return (P/name).read_text()
def put(name,s): (P/name).write_text(s)
def rep(s,a,b):
 assert s.count(a)==1,(a[:120],s.count(a))
 return s.replace(a,b,1)
s=get('chaos172.js')
s=rep(s,"import {installMovementHints} from './movement-ui171.js?v=171';","import {installMovementHints,installChapterHUD} from './ui173.js?v=173';\nimport {createShipNavigator,captureStep,guardQuota} from './security173.js?v=173';")
s=rep(s,"from './chaos-world170.js'","from './chaos-world173.js?v=173'")
s=rep(s,"const movementHints=installMovementHints(root,()=>enabled&&canPlay()&&s.foot);","const movementHints=installMovementHints(root,()=>enabled&&canPlay()&&s.foot);\n const chapterHUD=installChapterHUD(root,movementHints),navigator=createShipNavigator();\n const transfer=document.createElement('div');transfer.id='custodyTransfer';transfer.innerHTML='<strong>ΣΥΝΕΛΗΦΘΗΣ</strong><small>Μεταφορά στο κελί του πλοίου</small><div><i></i></div>';root.append(transfer);\n let nearGuards=0,cellCaptain=null,arrestPose=null;\n const hint=(touch,desktop=touch)=>movementHints.scheme==='touch'?touch:desktop;")
s=rep(s,"let s=makeChapterState(),avatar=null", "let s={...makeChapterState(),capture:0,securityAt:null},avatar=null")
s=rep(s,"hud.classList.toggle('chaos-cell',phase==='cell');hudUpdate();", "hud.classList.toggle('chaos-cell',phase==='cell');hud.classList.toggle('chaos-custody',['cell','arrested'].includes(phase));hudUpdate();")
s=rep(s,"onToast('Βγες από τη δεξιά πόρτα και κατέβα τη σκάλα. WASD ή joystick.');","onToast(hint('Δεξιά πόρτα → σκάλα. Σύρε το αριστερό χειριστήριο.','Δεξιά πόρτα → σκάλα. Περπάτα με W A S D.'));")
s=rep(s,"onToast('Πέτα ή άφησε πρώτα το αντικείμενο (8 / 7).');","onToast(hint('Πάτησε ΠΕΤΑ ή ΠΑΡΕ για να ελευθερώσεις τα χέρια.','Πέτα ή άφησε το αντικείμενο (8 / 7).'));")
s=rep(s,"y:10.1,z:n.actor.group.position.z,radius:.28", "y:n.actor.group.position.y,z:n.actor.group.position.z,radius:.28")
s=rep(s,"onToast('Κρατάς: '+held.label+' · 8 για ρίψη');","onToast('Κρατάς: '+held.label+hint(' · πάτησε ΠΕΤΑ',' · 8 για ρίψη'));")
s=rep(s,"function interact(){if(!available())return;if(!s.foot){foot();return;}const t=closestTarget(2.5);", "function interact(){if(!available())return;if(!s.foot){foot();return;}if(held){throwObject();return;}const t=closestTarget(2.5);")
s=rep(s,"if(t?.type==='prop'&&t.item.type==='bar'){requestDrink();return;}grab();", "if(t?.type==='prop'&&t.item.type==='bar'){requestDrink();return;}if(t?.type==='prop'&&!t.item.grab&&t.item.type!=='release'){doAttack('slap');return;}grab();")
start=s.index(' function spawnGuard()');end=s.index(' function propsPhysics',start)
s=s[:start]+''' function spawnGuard(){
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
''' +s[end:]
a=s.index("  if(s.phase==='arrested'){arrestTimer");b=s.index('  if(s.foot){fwd.set',a)
s=s[:a]+'''  if(s.phase==='arrested'){
   arrestTimer+=dt;transfer.querySelector('i').style.width=Math.min(100,arrestTimer/2.8*100)+'%';$('chaosFade').style.opacity=Math.min(1,arrestTimer/1.5);
   if(arrestTimer>=2.8){
    world.root.visible=false;world.cell.visible=true;ship.exterior.visible=false;ship.bridgeGroup.visible=false;ship.glass.visible=false;
    if(!cellCaptain){cellCaptain=createActor(getPeople().getCharacterTemplate('captain'),world.cell,{id:99});cellCaptain.group.position.set(.45,0,-.25);}
    cellCaptain.group.visible=true;cellCaptain.group.rotation.y=.22;
    voyage.intox=0;s.pendingAlcohol=0;s.capture=100;s.health=Math.max(35,s.health);setPhase('cell');$('chaosFade').style.opacity='0';$('arrestCard').hidden=false;
    $('arrestRecap').textContent=`${s.hits} χτυπήματα, ${s.broken} αντικείμενα σπασμένα${world.released?' και μία λέμβος στο νερό':''}. Η ασφάλεια σε έθεσε υπό κράτηση.`;
    $('arrestScore').textContent=s.chaos.toLocaleString('el-GR')+' ΒΑΘΜΟΙ ΧΑΟΥΣ';hudUpdate();
   }return;
  }
  if(s.phase==='cell'){cellCaptain?.tick(dt,{time:s.time});return;}
''' +s[b:]
s=rep(s,"onToast('ΜΠΑΡ · 9 για ουίσκι. 1–4 για χτυπήματα. Πρόκαλε χάος.');", "onToast(hint('Έφτασες στο μπαρ. Τα κουμπιά χτυπημάτων είναι δεξιά.','ΜΠΑΡ · 9 για ουίσκι, 1–4 για χτυπήματα.'));")
a=s.index('   if(s.alarmAt!==null){if(s.heat>80)');b=s.index('   if(held)',a)
s=s[:a]+"   updateSecurity(dt);\n"+s[b:]
s=rep(s,"$('hitConfirm').style.opacity=hitFlash>0?'1':'0';$('chaosDamage').style.opacity=String(damageFlash);", "$('hitConfirm').style.opacity=hitFlash>0?'1':'0';$('chaosDamage').style.opacity=String(damageFlash);\n  chapterHUD.update(s,getState(),target,held,p,nearGuards);")
s=rep(s,"function cameraUpdate(dt){if(!enabled)return false;if(s.phase==='cell'){const pos=ship.group.localToWorld(new T.Vector3(.6,6.15,44.4)),to=ship.group.localToWorld(new T.Vector3(0,5.8,47.5));", "function cameraUpdate(dt){if(!enabled)return false;if(s.phase==='arrested'&&arrestPose){camera.position.copy(arrestPose.position);camera.quaternion.copy(arrestPose.rotation);camera.updateMatrixWorld();return true;}if(s.phase==='cell'){const pos=ship.group.localToWorld(new T.Vector3(.1,6.1,48.8)),to=ship.group.localToWorld(new T.Vector3(.0,5.55,44.7));")
s=rep(s,"s=makeChapterState();lastHud=-99", "s={...makeChapterState(),capture:0,securityAt:null};navigator.reset();nearGuards=0;arrestPose=null;cellCaptain?.hide();lastHud=-99")
s=rep(s,"guardCount:guardSerial,attack:","guardCount:guardSerial,capture:s.capture,nearGuards,securityAt:s.securityAt,alarmAt:s.alarmAt,cellVisible:world.cell.visible,cellCaptainVisible:!!cellCaptain?.group.visible,navigation:navigator.inspect(),attack:")
s=rep(s,"state:n.state,x:n.actor.group.position.x,z:", "state:n.state,y:n.actor.group.position.y,x:n.actor.group.position.x,z:")
put('chaos173.js',s)
s=get('main172.js').replace("'./chaos172.js?v=172'","'./chaos173.js?v=173'").replace("version:'1.7.2'","version:'1.7.3'").replace("v1.7.2 · CAPTAIN","v1.7.3 · MOBILE")
s=s.replace("function cycleCamera(){if(chapter?.foot)return;","function cycleCamera(){if(chapter?.foot||chapter?.pausedStory)return;")
put('main173.js',s)
s=get('chaos-world170.js')
s=rep(s," const light=new T.PointLight", " // A lit corridor outside the bars makes the physical cell visible.\n box(cell,5,.15,2.8,M.dark,0,-.08,3.8);box(cell,.16,2.8,3,M.ivory,-2.5,1.4,3.8);box(cell,.16,2.8,3,M.ivory,2.5,1.4,3.8);box(cell,5,.12,8,M.ivory,0,2.86,1.4);\n const light=new T.PointLight")
put('chaos-world173.js',s)
s=get('index.html').replace('./main172.js?v=172','./main173.js?v=173').replace('content="1.7.2"','content="1.7.3"')
s=rep(s,'<link rel="stylesheet" href="./identity172.css?v=172">','<link rel="stylesheet" href="./identity172.css?v=172">\n<link rel="stylesheet" href="./mobile173.css?v=173">')
s=rep(s,'</head>',"<script>document.documentElement.dataset.inputScheme=navigator.maxTouchPoints>0&&(matchMedia('(pointer:coarse)').matches||!matchMedia('(hover:hover)').matches)?'touch':'keyboard';</script>\n</head>")
put('index.html',s)
s=get('sw.js').replace("last-call-1.7.2","last-call-1.7.3");s=rep(s,'const CORE=[','const CORE=["main173.js","chaos173.js","chaos-world173.js","ui173.js","security173.js","mobile173.css",')
put('sw.js',s)
put('release.json',json.dumps({'version':'1.7.3','changes':['Touch-specific controls and contextual action buttons','Permanent health, intoxication and custody meters','Guards navigate the deck and stairway; real proximity-based restraint and physical jail scene'],'preserved':['Captain models and FPS animations','Desktop WASD and numeric combat keys','Existing audio']},ensure_ascii=False,indent=2)+'\n')
print('Wrote guarded mobile/custody release 1.7.3')
