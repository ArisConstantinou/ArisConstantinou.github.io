"""Build isolated MAYHEM from the read-only Captain baseline. Writes only this folder."""
from pathlib import Path
import re,json,hashlib
OUT=Path(__file__).resolve().parent
SRC=OUT.parent/'captain'
def load(n):return (SRC/n).read_text()
def write(n,s):(OUT/n).write_text(s)
def rep(s,a,b):
 if a not in s:raise RuntimeError('Missing anchor '+a[:100])
 return s.replace(a,b)
def imports(s,mapping={}):
 def sub(m):
  file=m[1].split('?')[0]
  return "from '"+(('./'+mapping[file]) if file in mapping else ('../captain/'+m[1]))+"'"
 return re.sub(r"from '\./([^']+)'",sub,s)
def fn(s,start,end,text):
 a=s.index(' function '+start+'(');b=s.index(' function '+end+'(',a)
 return s[:a]+text+'\n'+s[b:]
write('baseline.json',json.dumps({str(p.relative_to(SRC)):hashlib.sha256(p.read_bytes()).hexdigest() for p in SRC.rglob('*') if p.is_file()},indent=2)+'\n')
model=load('chaos-model170.js').replace("if(s.alarmAt===null)s.alarmAt=s.time+50;",'')
a=model.index('export function sip(');b=model.index('export function absorb(',a)
model=model[:a]+'''export function sip(s,voyage){if(voyage.drinkCooldown>0||s.downed)return {ok:false};s.sips++;s.pendingAlcohol=clamp(s.pendingAlcohol+24,0,90);voyage.drinks++;voyage.drinkCooldown=2.2;voyage.drinkAnim=1;return {ok:true};}
'''+model[b:]
write('model.js',model)
actors=imports(load('actors183.js'),{'chaos-model170.js':'model.js'})
actors=actors.replace("const wanted=sitting&&actions.sit?'sit':speed>.15?'walk':'idle';","const wanted=sitting&&actions.sit?'sit':flinch>.45&&actions.hit?'hit':speed>2.2&&actions.run?'run':speed>.15?'walk':'idle';")
actors=actors.replace("mixer.timeScale=motion==='walk'?clamp(speed/1.2,.55,2):1;","mixer.timeScale=motion==='walk'?clamp(speed/1.2,.65,1.8):motion==='run'?clamp(speed/3,.8,1.3):1;")
write('actors.js',actors)
audio=imports(load('audio170.js')).replace('lc-audio-mix150','mayhem-audio-mix').replace('./assets/','../captain/assets/')
write('audio.js',audio)
ui=load('ui183.js').replace('<p><b>ΣΥΛΛΗΨΗ:</b> Η μπάρα ανεβαίνει όταν σε ακινητοποιούν κοντινοί φύλακες και μειώνεται όταν ξεφεύγεις. Στο 100% σε μεταφέρουν στο κελί. Στο κελί πάτησε ΣΥΝΕΧΕΙΑ για ύπνο και playable απόδραση.</p>','<p><b>MAYHEM:</b> Σπάσε γυάλινες πόρτες για περάσματα. Πιάσε πυροσβεστήρα και πάτησε ΨΕΚΑΣΕ για κάλυψη. ΜΑΝΟΥΒΡΑ για κλίση. Η καταδίωξη σβήνει όταν δεν σε βλέπουν. Δεν υπάρχει υποχρεωτικό κελί.</p>')
write('ui.js',ui)
write('rooms.js',imports(load('roam-world184.js')))
deck=imports(load('chaos-world184.js'))
deck=deck.replace("p.type==='bar'||p.type==='release'","p.type==='release'||p.type==='extinguisher'")
deck=deck.replace("hp:999,label:'ΜΠΑΡ · 9 ΓΙΑ ΟΥΙΣΚΙ'","hp:150,label:'ΜΠΑΡ · ΚΑΤΑΣΤΡΕΨΙΜΟ'")
deck=deck.replace('new T.TetrahedronGeometry(.09+i%3*.04)','new T.CircleGeometry(.08+i%3*.05,3)')
deck=deck.replace('t:4});}return true;','t:5,floor:p.home.y});}return true;')
deck=deck.replace('if(f.o.position.y<10.15){f.o.position.y=10.15;','if(f.o.position.y<(f.floor??10.15)){f.o.position.y=f.floor??10.15;')
write('deck.js',deck)
write('touch.js',load('touch183.js').replace('captain-look183','mayhem-look'))
write('balance.js',"export {COMBAT as BALANCE} from './rules.js';\nexport const damageAmount=(guard,block)=>block?0:guard?4:3;\n")
game=imports(load('chaos184.js'),{'roam-world184.js':'rooms.js','combat184.js':'balance.js','touch183.js':'touch.js','ui183.js':'ui.js','actors183.js':'actors.js','chaos-world184.js':'deck.js','chaos-model170.js':'model.js'})
game="import {createMayhemSystems} from './systems.js';\nimport {dressMayhem} from './setdress.js';\n"+game
game=game.replace('last-call-story180','mayhem-unused-story')
game=rep(game,'const roam=createRoamWorld(ship,world);let civilianCount=8;','const roam=createRoamWorld(ship,world);const dressing=dressMayhem(ship,world);let civilianCount=8;')
game=rep(game,'let touchControl=null,drinkProp=null;','let touchControl=null,drinkProp=null,sandbox=null;')
a=game.index(' function available()')
game=game[:a]+''' const safeHome=new T.Vector3(0,10.1,36);
 sandbox=createMayhemSystems({ship,world,root,hud,camera,getState:()=>s,getPlayer:()=>p,getVoyage:getState,party,solids,lineClear,spawnGuard,onMessage:onToast,onRecover:()=>{
  s.downed=false;s.foot=true;s.health=75;s.stamina=100;s.heat=0;s.capture=0;s.attack=null;s.alarmAt=null;s.securityAt=null;held=null;
  p.copy(safeHome);yaw=Math.PI;pitch=0;setPhase('deck');resetInput();hitUntil=s.time+7;for(const n of party){n.attack=null;n.state='idle';n.goal.copy(n.home);n.nav=null;}sandbox.save();
 }});
 function startMayhem(resume=true){setup();if(!ready)return;world.root.visible=true;world.cell.visible=false;s.started=true;s.downed=false;s.foot=true;s.visited=true;s.sips=1;s.heat=0;s.alarmAt=null;s.securityAt=null;
  getState().intox=45;getState().speed=0;getState().throttle=0;p.set(4.3,10.1,57);yaw=Math.PI;pitch=0;resetInput();setPhase('deck');avatar.group.visible=true;onResetHelm();
  if(resume)sandbox.restore();sandbox.sync();onToast('Το πλοίο είναι δικό σου. Σπάσε, πειραματίσου, χάσου στα καταστρώματα.');
 }
'''+game[a:]
game=game.replace('return enabled&&!retaken&&!escape.active&&canPlay()','return enabled&&!retaken&&!escape.active&&!s.downed&&canPlay()')
game=game.replace('s.chaos===0','!s.downed')
game=rep(game,'if(held){throwObject();return;}const t=closestTarget(2.5);',"if(held){if(held.type==='extinguisher'){if(sandbox.spray(p,{x:Math.sin(yaw),z:Math.cos(yaw)})){audio.hit?.('swing');score(12,'smoke');}}else throwObject();return;}const t=closestTarget(2.5);")
game=rep(game,"if(e.code==='KeyM'","if(e.code==='KeyT'&&s.foot&&!e.repeat){sandbox.tilt();return true;}if(e.code==='KeyM'")
game=rep(game,'function score(amount,kind){const n=addChaos(s,amount,kind);',"function score(amount,kind){const n=addChaos(s,amount,kind);sandbox?.event(n,kind,target?.type==='prop'?target.item.group.position:p);")
game=game.replace('const dir=n.actor.group.position.clone().sub(p).setY(0).normalize();','const dir=a.direction?new T.Vector3(a.direction.x,0,a.direction.z).normalize():n.actor.group.position.clone().sub(p).setY(0).normalize();')
game=fn(game,'contact','grab',''' function contact(kind,a){
  if(kind==='spit')world.spit(p,new T.Vector3(Math.sin(yaw),0,Math.cos(yaw)));
  const hit=closestTarget(a.range);if(!hit)return;target=hit;
  if(hit.type==='person'){hurtNPC(hit.item,a,kind);return;}
  const o=hit.item;if(o.type==='release'||o.type==='extinguisher')return;
  if(kind==='spit'){score(3,kind);return;}
  o.hp-=a.damage;audio.hit?.(o.type==='window'?'glass':kind);hitFlash=.18;score(5,kind+'-property');
  if(o.hp<=0&&world.fracture(o)){s.broken++;score(o.type==='window'?75:45,'destroy-'+o.type);}
  else if(['chair','cart','table','vase'].includes(o.type)&&['kick','heavy'].includes(kind)){
   o.moving=true;o.active=true;o.throwFloor=floorAt(o.group.position.x,o.group.position.z,p.y)??p.y;o.hitIds.clear();o.velocity.set(Math.sin(yaw)*(kind==='kick'?6:3.8),1.5,Math.cos(yaw)*(kind==='kick'?6:3.8));score(15,'shove');
  }
 }''')
game=fn(game,'arrest','updateSecurity'," function arrest(){if(s.downed)return;s.attack=null;s.block=false;resetInput();mouse.release();sandbox.down();}\n")
game=fn(game,'updateSecurity','updatePeople'," function updateSecurity(dt){sandbox.security(dt);nearGuards=party.filter(n=>n.guard&&n.health>0&&n.actor.group.position.distanceTo(p)<2).length;if(s.health<=0)arrest();}\n")
game=rep(game,"}else if(n.state==='flee'){","""}else if(n.state==='search'){
     const goal=n.goal||n.home,aim=navigator.steer(n,q,goal,obstacleList,s.time),d=Math.hypot(aim.x-q.x,aim.z-q.z);
     if(d>.15&&(n.confusedUntil||0)<s.time){dx=(aim.x-q.x)/d;dz=(aim.z-q.z)/d;n.speed=1.15;}else if(d<=.15)n.actor.group.rotation.y+=dt*.35;
    }else if(n.state==='flee'){""")
game=game.replace("n.state=n.guard?'fight':'flee'","n.state=n.guard?'search':'flee'")
game=fn(game,'propsPhysics','update',''' function propsPhysics(dt){
  for(const o of world.props){if(!o.moving||o.broken||o===held)continue;const count=Math.max(1,Math.ceil(dt/.012));
   for(let j=0;j<count;j++){const h=dt/count,old=o.group.position.clone(),energy=o.velocity.length();o.velocity.y-=9.8*h;o.group.position.addScaledVector(o.velocity,h);
    const ground=floorAt(o.group.position.x,o.group.position.z,o.throwFloor??p.y);
    if(ground===null){o.group.position.copy(old);o.velocity.x*=-.35;o.velocity.z*=-.35;}
    if(ground!==null&&o.group.position.y<ground+.04){o.group.position.y=ground+.04;o.velocity.y=Math.abs(o.velocity.y)*.19;const friction=o.type==='cart'?.992:.965;o.velocity.x*=friction;o.velocity.z*=friction;
     if(['bottle','vase'].includes(o.type)&&energy>1.3){if(world.fracture(o)){s.broken++;score(25,'destroy-'+o.type);audio.hit?.('glass');}break;}}
    const blocker=solids().find(b=>b!==o&&Math.abs(b.y-(o.throwFloor??p.y))<2&&o.group.position.y<b.y+(b.h||2)&&lineBox(old,o.group.position,b));
    if(blocker){if(blocker.hp!==undefined&&energy>2.0&&!['release','extinguisher'].includes(blocker.type)){blocker.hp-=energy*7;if(blocker.hp<=0&&world.fracture(blocker)){s.broken++;score(65,'destroy-'+blocker.type);audio.hit?.('glass');}}
     if(!blocker.broken){o.group.position.copy(old);o.velocity.x*=-.36;o.velocity.z*=-.36;}}
    for(const n of party){const q=n.actor.group.position;if(n.health<=0||o.hitIds.has(n.id)||energy<1.25||Math.abs(q.y-(o.throwFloor??p.y))>1)continue;
     if(Math.hypot(q.x-o.group.position.x,q.z-o.group.position.z)<.4+Math.max(o.w,o.d)*.45&&o.group.position.y<q.y+1.8){o.hitIds.add(n.id);hurtNPC(n,{damage:Math.min(35,10+energy*2),push:.8,score:24,direction:o.velocity},'impact');o.velocity.multiplyScalar(.5);}}
    o.group.rotation.z=T.MathUtils.lerp(o.group.rotation.z,o.type==='cart'?.04:Math.PI*.4,Math.min(1,h*3));
    if(o.velocity.length()<.5){o.moving=false;o.velocity.set(0,0,0);o.x=o.group.position.x;o.y=ground??o.throwFloor??p.y;o.z=o.group.position.z;o.group.position.y=o.y+.03;}
   }
  }
 }''')
game=rep(game,'setup();if(!ready)return;const voyage=getState();s.time+=dt;','setup();if(!ready)return;if(s.downed){sandbox.sync();return;}const voyage=getState();s.time+=dt;voyage.intox=Math.max(35,voyage.intox);')
game=rep(game,'if(s.time-lastHud>.06){lastHud=s.time;hudUpdate();}','sandbox.update(dt,target);if(s.time-lastHud>.06){lastHud=s.time;hudUpdate();}')
game=game.replace('tickAttack(s,dt,contact);target=closestTarget(2.5);updatePeople(dt);propsPhysics(dt);\n   updateSecurity(dt);','tickAttack(s,dt,contact);target=closestTarget(2.5);updateSecurity(dt);updatePeople(dt);propsPhysics(dt);')
game=rep(game,'chapterHUD.update(s,getState(),target,held,p,nearGuards);',"""chapterHUD.update(s,getState(),target,held,p,nearGuards);sandbox?.sync();
  if(s.foot&&held?.type==='extinguisher'){const b=$('chaosUse');b.disabled=false;b.style.visibility='visible';b.querySelector('strong').textContent='ΨΕΚΑΣΕ';b.querySelector('small').textContent='Σύννεφο κάλυψης';b.querySelector('.use-icon').textContent='≋';}
  else if(s.foot&&p.y>17&&Math.hypot(p.x-1.2,p.z-44.4)<2.3){const b=$('chaosUse');b.disabled=false;b.querySelector('strong').textContent='ΤΙΜΟΝΙ';b.querySelector('small').textContent='Ανάλαβε το πλοίο';}
""")
game=game.replace('function reset(){shipMap.reset();','function reset(){sandbox?.reset();shipMap.reset();')
game=rep(game,'return {releaseMouse:','return {startMayhem,get renderWorld(){return world;},get extraRoll(){return sandbox.extraRoll;},releaseMouse:')
game=game.replace('get pausedStory(){return escape.active','get pausedStory(){return !!s.downed||escape.active')
game=game.replace('inspect:()=>({roaming:','inspect:()=>({sandbox:sandbox.inspect(),downed:!!s.downed,roaming:')
game=game.replace('test:{routeTo:','test:{sandbox,interact,save:()=>sandbox.save(),routeTo:')
write('game.js',game)
main=imports(load('main184.js'),{'chaos184.js':'game.js','simulation.js':'voyage.js','audio170.js':'audio.js'})
main="import {finishLook} from './look.js';\n"+main
main=main.replace("'lc-","'mayhem-lc-").replace("version:'1.8.4'","version:'MAYHEM 1.0.0'").replace('v1.8.4 · SHIP FIX','MAYHEM 1.0 · ΑΝΕΞΑΡΤΗΤΟ MODE')
main=rep(main,"let mildMotion=readStore('mayhem-lc-motion',matchMedia('(prefers-reduced-motion:reduce)').matches);","let mildMotion=readStore('mayhem-lc-motion',true);")
main=rep(main,"if(event.type==='win'||event.type==='sink')queueMicrotask(()=>finish(event.type==='win'));","if(event.type==='win'||event.type==='sink')return;")
main=rep(main,'playing=true;paused=false;cameraMode=1;','playing=true;paused=false;cameraMode=1;chapter.startMayhem(!window.__MAYHEM_NEW__);window.__MAYHEM_NEW__=false;')
main=rep(main,"toast(mobile?'Πιάσε το ίδιο το τιμόνι και γύρισέ το κυκλικά. Μοχλός: πάνω / μέση / κάτω.':'A / D: τιμόνι · W / S: μηχανές · C: κάμερα · E: ουίσκι');","toast('Ελεύθερο χάος. Καμία αποστολή. Εσύ διαλέγεις τι θα χαλάσεις.');")
main=main.replace('world.update(state.time,dt,','ship.group.rotation.z+=chapter?.extraRoll||0;ship.group.updateMatrixWorld(true);world.update(state.time,dt,')
main=main.replace("$('startText').textContent='ΑΝΑΛΑΒΕ ΤΟ ΤΙΜΟΝΙ'","$('startText').textContent='ΜΠΕΣ ΣΤΟ MAYHEM'")
main=main.replace("'Έτοιμο. Παίζεται με αφή — δοκίμασε και οριζόντια οθόνη.'","'Portrait / landscape · σταθερά χειριστήρια αφής'").replace("'Έτοιμο. Ταξίδι περίπου 6–8 λεπτών. Εσύ επιλέγεις πότε θα πιεις.'","'WASD + ποντίκι · ελεύθερη συνεδρία, χωρίς τέλος'")
main=rep(main,"audio.preload();$('releaseBadge')","audio.preload();finishLook(scene,renderer,ship,chapter.renderWorld);$('releaseBadge')")
main=main.replace('moon.castShadow=!mobile;moon.shadow.mapSize.set(1024,1024)','moon.castShadow=true;moon.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048)')
main=main.replace('new THREE.DirectionalLight(0xc5d8e5,2.1)','new THREE.DirectionalLight(0xffe4bf,2.7)').replace('new THREE.HemisphereLight(0xb3d4eb,0x23313b,2.1)','new THREE.HemisphereLight(0xc2dae1,0x34352f,1.7)')
main=main.replace('scene.onBeforeRender=()=>{moon.position.set(state.x-150,state.y+240,state.z+160);moon.target.position.set(state.x,state.y,state.z);moon.target.updateMatrixWorld();};','scene.onBeforeRender=()=>{const q=chapter?.inspect().position||{x:0,y:10,z:45},w=ship.group.localToWorld(new THREE.Vector3(q.x,q.y,q.z));moon.position.copy(w).add(new THREE.Vector3(-35,70,32));moon.target.position.copy(w);moon.target.updateMatrixWorld();};')
main=main.replace('moon.shadow.camera.left=-115;moon.shadow.camera.right=115;moon.shadow.camera.top=115;moon.shadow.camera.bottom=-115;','moon.shadow.camera.left=-20;moon.shadow.camera.right=20;moon.shadow.camera.top=20;moon.shadow.camera.bottom=-20;')
main=re.sub(r"    if\('serviceWorker'in navigator\)\{[^\n]+\}",'    // No worker registration: do not touch the story cache.',main)
main=rep(main,"$('restart').addEventListener('click',startGame);","$('restart').addEventListener('click',()=>{window.__MAYHEM_NEW__=true;startGame();});")
write('main.js',main)
voyage=load('simulation.js');voyage=re.sub(r'    if\(s.distance<harbor.radius[^\n]+','    // No arrival victory in this sandbox.',voyage);voyage=re.sub(r'    if\(s.hull<=0\)[^\n]+','    if(s.hull<=15)s.hull=15; // Arcade buoyancy, no forced ending.',voyage);write('voyage.js',voyage)
index=load('index.html')
index=re.sub(r'href="\./([^"?#]+)([^" ]*)"',r'href="../captain/\1\2"',index)
index=index.replace('"three":"./vendor/three.module.js","three/addons/":"./vendor/addons/"','"three":"../captain/vendor/three.module.js","three/addons/":"../captain/vendor/addons/"')
index=re.sub(r'<script type="module" src="[^" ]+"></script>','<script type="module" src="./main.js?v=100"></script>',index)
index=re.sub(r'<link rel="manifest"[^>]+>','',index)
index=index.replace('<html lang="el">','<html lang="el" class="mayhem-mode">').replace('<title>LAST CALL — Καπετάνιος στη φουρτούνα</title>','<title>LAST CALL · MAYHEM — Ελεύθερο χάος</title>')
index=index.replace('</head>','<link rel="stylesheet" href="./mode.css?v=100"></head>')
index=index.replace('UTTER CHAOS · ΚΕΦΑΛΑΙΟ 01','ΝΕΟ MODE / ΕΛΕΥΘΕΡΟ ΧΑΟΣ').replace('<h1>LAST<br><span>CALL.</span></h1>','<h1>LAST CALL<span>MAYHEM.</span></h1>')
index=re.sub(r'<p class="tagline">.*?</p>','<p class="tagline">Δικό σου το πλοίο.<br>Δικοί σου οι μπελάδες.</p>',index)
index=re.sub(r'<p class="intro-description">.*?</p>','<p class="intro-description">Σπάσε περάσματα. Στείλε έπιπλα στον αέρα. Παίξε με την κλίση του πλοίου και ξέφυγε από την ασφάλεια.<br><b>Χωρίς θελήματα. Χωρίς υποχρεωτικό κελί.</b></p>',index)
index=index.replace('NORTH ATLANTIC · 02:47','SANDBOX / MS AURORA')
index=index.replace('<div class="intro-bottom">','<a class="story-link" href="../captain/">↗ Το αρχικό LAST CALL — ανέπαφο</a><div class="intro-bottom">')
index=index.replace('ΚΑΤΕΒΑ · ΠΡΟΚΑΛΕΣΕ · ΑΝΤΙΣΤΑΘΟΥ','ΣΠΑΣΕ · ΑΥΤΟΣΧΕΔΙΑΣΕ · ΞΕΦΥΓΕ')
index=index.replace('Μία γουλιά.','Ελεύθερο χάος.')
index=re.sub(r'<meta name="captain-build"[^>]+>','<meta name="captain-build" content="MAYHEM 1.0.0">',index)
index=re.sub(r'(<div id="helpPanel"[^>]*>).*?(</div>)',r'\1<p><b>MAYHEM:</b> WASD / ποντίκι. M1 χαστούκι, M2 γροθιά, Q βαρύ χτύπημα, E κλωτσιά. F αλληλεπίδραση / ψεκασμός, X πιάσε, R πέτα, Z ποτό. T μανούβρα. C μπλοκ, M χάρτης. Κρύψου από την ασφάλεια για να σβήσει ο συναγερμός. Η ζημιά μένει. Η συνεδρία συνεχίζεται χωρίς κελί.</p>\2',index,flags=re.S)
write('index.html',index)
write('release.json',json.dumps({'mode':'MAYHEM','version':'1.0.0','isolated':True,'baseline':'74dfd6488201d8aca51b391aa955b0e44a7efa46','storyUnchanged':True,'features':['Independent endless mode; no mandatory arrest','Physical prop impacts and glass openings','Extinguisher smoke blocks pursuit visibility','Escapeable heat; recover without losing damage','Separate save namespace; fixed relative touch camera','Six connected decks; existing human rigs with improved run/hit transitions']},indent=2)+'\n')
print('Built independent Mayhem mode. No captain/ file written.')
