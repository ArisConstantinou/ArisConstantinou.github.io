"""Assemble the delivered v1.7 chapter and its desktop WASD update.
All writes stay in captain/. Uses pinned known-working audio/graphics sources.
"""
from pathlib import Path
import subprocess, json, hashlib
P=Path('captain'); BASE='003bdd97d1a60603b60f54afd64b23b451488657'
def original(name):
    return subprocess.check_output(['git','show',BASE+':captain/'+name]).decode()
def save(name,s): (P/name).write_text(s,encoding='utf-8')
def change(s,a,b):
    assert s.count(a)==1, ('Non-unique source anchor',a[:90],s.count(a))
    return s.replace(a,b,1)

s=original('main150.js')
s="import { createChaosChapter } from './chaos170.js?v=171';\n"+s
for a,b in [("'./ship.js?v=140'","'./ship170.js?v=171'"),("'./passengers.js?v=140'","'./passengers170.js?v=171'"),("'./audio150.js?v=150'","'./audio170.js?v=171'"),
('scene,camera,audio,helm,dialogue;','scene,camera,audio,helm,dialogue,chapter;'),
('helm?.reset();dialogue?.reset();setThrottle(.55);','helm?.reset();dialogue?.reset();chapter?.reset();setThrottle(.55);'),
('paused=value;keys.clear();','paused=value;chapter?.resetInput();keys.clear();'),
('function cycleCamera(){cameraMode=','function cycleCamera(){if(chapter?.foot)return;cameraMode='),
('  const result=useAction(state,name);',"  if(name==='drink'&&chapter?.enabled){chapter.requestDrink();return;}\n  const result=useAction(state,name);"),
('function updateCamera(dt,snap=false){','function updateCamera(dt,snap=false){\n  if(playing&&chapter?.cameraUpdate(dt))return;'),
("$('start').addEventListener('click',startGame);","$('start').addEventListener('click',()=>{chapter?.setEnabled(true);startGame();});$('classicVoyage').addEventListener('click',()=>{chapter?.setEnabled(false);startGame();});"),
('    keys.add(event.code);','    if(chapter?.keyDown(event)){event.preventDefault();return;}\n    keys.add(event.code);'),
("window.addEventListener('keyup',event=>keys.delete(event.code));","window.addEventListener('keyup',event=>{keys.delete(event.code);chapter?.keyUp(event);});"),
("    if(helm?.beginWheel(event,$('sea'),pickWheel(event)))return;","    if(chapter?.pointerDown(event))return;\n    if(helm?.beginWheel(event,$('sea'),pickWheel(event)))return;"),
('    if(helm?.moveWheel(event))return;','    if(chapter?.pointerMove(event))return;\n    if(helm?.moveWheel(event))return;'),
('event=>{helm?.endWheel(event);','event=>{chapter?.pointerUp(event);helm?.endWheel(event);'),
('const dt=Math.min((now-lastFrame)/1000,.05);','const dt=window.__CHAOS_FREEZE__?0:Math.min((now-lastFrame)/1000,.05);'),
('    input.turn=helm?.turn ??','    input.turn=chapter?.foot?0:helm?.turn ??'),
("if(keys.has('KeyW')||keys.has('ArrowUp'))setThrottle", "if(!chapter?.foot&&(keys.has('KeyW')||keys.has('ArrowUp')))setThrottle"),
("if(keys.has('KeyS')||keys.has('ArrowDown'))setThrottle", "if(!chapter?.foot&&(keys.has('KeyS')||keys.has('ArrowDown')))setThrottle"),
('    accum+=dt;','    if(chapter?.ownsShip){input.throttle=0;input.turn=0;}\n    accum+=dt;'),
('    dialogue?.update(state,dt);','    chapter?.update(dt);\n    if(!chapter?.foot&&!chapter?.pausedStory)dialogue?.update(state,dt);\n    if(chapter?.enabled)for(const q of people.getSpeakers())q.group.visible=!chapter.foot&&!chapter.pausedStory;'),
('dialogue?.project(state.time);','dialogue?.project(state.time);chapter?.project();'),
('    installSoundPanel({audio,enable:',"    chapter=createChaosChapter({ship,camera,hud:$('hud'),canvas:$('sea'),getPeople:()=>people,getState:()=>state,canPlay:()=>playing&&!paused,audio,onToast:toast,onResetHelm:()=>{helm.reset();keys.clear();drag=null;input.turn=0;cameraMode=1;},onRestart:startGame,onDrinkLine:()=>dialogue.drink(state),mildMotion:()=>mildMotion});\n    installSoundPanel({audio,enable:"),
("textContent='v1.5.0'","textContent='v1.7.1 · CHAOS'"),
("version:'1.5.0'","version:'1.7.1'"),
('voices:audio.voiceStatus(),drawCalls:','voices:audio.voiceStatus(),chapter:chapter?.inspect(),drawCalls:'),
('restart:startGame,','restart:startGame,chapter:chapter.test,')]: s=change(s,a,b)
save('main170.js',s)

s=original('ship.js')
for a,b in [
('box(.13, 1.19, 11.4, M.navy, side * 10.61, 19.07, 37.65);','box(.13, 1.19, side>0?9.0:11.4, M.navy, side * 10.61, 19.07, side>0?38.85:37.65);'),
('box(.13, .17, 11.4, M.white, side * 10.65, 19.68, 37.65);','box(.13, .17, side>0?9.0:11.4, M.white, side * 10.65, 19.68, side>0?38.85:37.65);'),
('new THREE.PlaneGeometry(11.3, 2.37), M.transparent, glass, side * 10.60, 20.85, 37.56','new THREE.PlaneGeometry(side>0?8.9:11.3, 2.37), M.transparent, glass, side * 10.60, 20.85, side>0?38.76:37.56'),
('for (const z of [33, 37, 41.3]) rod','for (const z of (side>0?[34.3,37,41.3]:[33,37,41.3])) rod')]: s=change(s,a,b)
save('ship170.js',s)
s=original('passengers.js')
s=change(s,'status:p.status,panic:p.personalPanic','status:p.status,panic:p.personalPanic,model:p.model,clips:{idle:p.actions.idle?.getClip(),walk:p.actions.walk?.getClip(),run:p.actions.run?.getClip()}')
save('passengers170.js',s)
s=original('audio150.js')
s=change(s,'  return { start, setEnabled,',"""  function hit(kind='slap') {
    if(!canPlay())return;
    if(kind==='swing'){oneShotNoise(.13,.06,2200,400,.015);return;}
    if(kind==='glass'){oneShotNoise(.65,.13,7000,700,.008);tone('sine',2300,600,.024,.3,.005);return;}
    const heavy=kind==='heavy'||kind==='kick';
    oneShotNoise(heavy?.18:.105,heavy?.17:.14,kind==='punch'?950:3200,160,.004);
    tone('sine',heavy?145:190,50,heavy?.10:.055,heavy?.19:.12,.004);
  }
  return { hit, start, setEnabled,""")
save('audio170.js',s)

# Restore the original chapter tick exactly; only movement hints are new here.
p=P/'chaos170.js';s=p.read_text();a=s.index(' function update(dt)');b=s.index(' function hudUpdate()')
block=""" function update(dt){if(!enabled)return;setup();if(!ready)return;const voyage=getState();s.time+=dt;frameTime=dt;world.update(dt);absorb(s,voyage,dt);drinkTime=Math.max(0,drinkTime-dt*.75);damageFlash=Math.max(0,damageFlash-dt);hitFlash=Math.max(0,hitFlash-dt);
  if(s.phase==='arrested'){arrestTimer+=dt;$('chaosFade').style.opacity=Math.min(1,arrestTimer/1.2);if(arrestTimer>2.7){setPhase('cell');world.root.visible=false;world.cell.visible=true;ship.exterior.visible=false;ship.bridgeGroup.visible=false;ship.glass.visible=false;voyage.intox=0;s.pendingAlcohol=0;$('chaosFade').style.opacity='0';$('arrestCard').hidden=false;$('arrestRecap').textContent=`«${s.hits} χτυπήματα, ${s.broken} αντικείμενα σπασμένα${world.released?' και μία λέμβος στο νερό':''}. Ωραία βάρδια, καπετάνιε.»`;$('arrestScore').textContent=s.chaos.toLocaleString('el-GR')+' ΒΑΘΜΟΙ ΧΑΟΥΣ';}return;}
  if(s.phase==='cell')return;
  if(s.foot){fwd.set(Math.sin(yaw),0,Math.cos(yaw));right.set(-Math.cos(yaw),0,Math.sin(yaw));let x=stick.x+(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0),z=stick.y+(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);const l=Math.max(1,Math.hypot(x,z));x/=l;z/=l;
   const drunk=voyage.intox/100,wobble=Math.sin(s.time*2.4)*drunk*.17*(Math.abs(x)+Math.abs(z)>.1?1:.25),speed=(keys.has('ShiftLeft')?3.5:2.7)*(1-drunk*.28)*(s.block?.55:1);v.copy(fwd).multiplyScalar(z).addScaledVector(right,x+wobble);const moved=moveCharacter(p,v.x*speed*dt,v.z*speed*dt,solids(),bodies(),.27);lastMove=moved/Math.max(dt,.001);footBob+=moved*5;
   if(!s.visited&&p.y<11.1&&p.z>50.8&&p.x<8.7){s.visited=true;setPhase('deck');shout(party[0],'Καπετάνιε! Καθίστε μαζί μας!');onToast('ΜΠΑΡ · 9 για ουίσκι. 1–4 για χτυπήματα. Πρόκαλε χάος.');}
   avatar.group.position.copy(p);avatar.group.rotation.set(0,yaw,0);avatar.tick(dt,{speed:0,attack:s.attack,block:s.block,drunk,time:s.time,held:!!held,drinking:drinkTime});
   tickAttack(s,dt,contact);target=closestTarget(2.7);updatePeople(dt);propsPhysics(dt);
   if(s.alarmAt!==null){if(s.heat>80)s.alarmAt=Math.min(s.alarmAt,s.time+10);if(s.time>=s.alarmAt){if(s.phase!=='security'){setPhase('security');spawnGuard();spawnGuard();}const wanted=2+Math.min(4,Math.floor((s.time-s.alarmAt)/12));if(guardSerial<wanted)spawnGuard();}}
   if(held){held.group.position.copy(p).addScaledVector(fwd,.73).addScaledVector(right,.25);held.group.position.y+=1.1;held.group.rotation.set(.2,yaw,0);}
  }
  if(s.time-lastHud>.06){lastHud=s.time;hudUpdate();}
 }
"""
save('chaos170.js',s[:a]+block+s[b:])

s=original('index.html')
for a,b in [
('<meta name="captain-build" content="1.5.0">','<link rel="stylesheet" href="./chaos170.css?v=171">\n<link rel="stylesheet" href="./movement-ui171.css?v=171">\n<meta name="captain-build" content="1.7.1">'),
('STORM SURVIVAL','UTTER CHAOS · ΚΕΦΑΛΑΙΟ 01'),
('Ένα μεγάλο πλοίο.<br>Μια κακή ιδέα για άλλο ένα ποτό.','Μία γουλιά.<br>Μία καταστροφική βάρδια.'),
('Πάρε το τιμόνι του <b>AURORA</b>. Πέρασε ανάμεσα σε βράχια και παγόβουνα, κράτα τους επιβάτες ψύχραιμους και φτάσε στο λιμάνι. Το ουίσκι δίπλα σου κάνει τα πάντα πιο δύσκολα.','Πιες μία γουλιά στη γέφυρα. Κατέβα στους επιβάτες. <b>Προκάλεσε όσο περισσότερο χάος μπορείς πριν σε συλλάβει η ασφάλεια.</b> Πρώτο πρόσωπο, καβγάδες και καταστροφές στο ίδιο κρουαζιερόπλοιο.'),
('<div id="loadProgress">','<button id="classicVoyage" class="text-button" style="margin-top:10px">ΜΟΝΟ ΠΛΕΥΣΗ · ΧΩΡΙΣ ΤΟ ΚΕΦΑΛΑΙΟ ΧΑΟΥΣ</button><div id="loadProgress">'),
('<span><b>E</b> Ουίσκι</span>','<span><b>9</b> Ουίσκι · <b>F</b> Σήκω</span>'),
('ΚΥΒΕΡΝΑ · ΑΠΟΦΥΓΕ · ΔΙΑΣΩΣΕ','ΚΑΤΕΒΑ · ΠΡΟΚΑΛΕΣΕ · ΑΝΤΙΣΤΑΘΟΥ'),
('src="./main150.js?v=150"','src="./main170.js?v=171"')]: s=change(s,a,b)
help='''<p><b>ΚΕΦΑΛΑΙΟ ΧΑΟΥΣ:</b> 9 για μία γουλιά στη γέφυρα. F για να σηκωθείς. Δεξιά έξοδος, εξωτερική σκάλα και μπαρ. Στον υπολογιστή βλέπεις W A S D, στο κινητό joystick. Σύρε για ματιά και κράτα Shift για τρέξιμο.</p><p><b>1:</b> γρήγορο χαστούκι · <b>2:</b> βαρύ χαστούκι · <b>3:</b> γροθιά · <b>4:</b> κλωτσιά · <b>5:</b> φτύσιμο · <b>6:</b> κράτημα μπλοκ · <b>7:</b> πιάσε/άφησε · <b>8:</b> πέτα · <b>9:</b> ουίσκι · <b>F:</b> αλληλεπίδραση. Λειτουργούν και οι αριθμοί NumPad.</p><p>Η πρώτη ενότητα τελειώνει στη σύλληψη και τον απολογισμό στο κελί. Η stealth απόδραση δεν περιλαμβάνεται ακόμη.</p><p><b>ΜΟΝΟ ΠΛΕΥΣΗ:</b></p>'''
s=change(s,'<div id="helpPanel" class="help-panel hidden">','<div id="helpPanel" class="help-panel hidden">'+help)
save('index.html',s)
s=original('credits.html');s=change(s,'<h2>Χειρισμός</h2>','<h2>Κεφάλαιο Χάους</h2><p>Νέα εξωτερική σκάλα, μπαρ, σκηνή κελιού και μηχανισμοί παιχνιδιού. Τα χέρια και τα πόδια πρώτου προσώπου προέρχονται από τον υπάρχοντα χαρακτήρα Soldier. Η v1.7.1 προσθέτει ορατά W A S D στον υπολογιστή και διατηρεί joystick στην αφή.</p><h2>Χειρισμός πλεύσης</h2>')
a=s.index('<p>Η φωνή χρησιμοποιεί');b=s.index('</p>',a)+4
s=s[:a]+'<p>Οι ελληνικές φωνές είναι τα υπάρχοντα προπαραγόμενα συνθετικά MP3, όχι ηχογραφήσεις ηθοποιών. Διατηρούνται οι πηγές των ανθρώπινων εφέ στα αρχεία assets/human140.</p>'+s[b:]
s=s.replace('Έκδοση 1.0.0','Έκδοση 1.7.1');save('credits.html',s)
CORE=['index.html','main170.js','chaos170.js','chaos-model170.js','chaos-world170.js','actors170.js','chaos170.css','movement-ui171.js','movement-ui171.css','ship170.js','passengers170.js','audio170.js','style.css','helm140.js','helm140.css','dialogue150.js','dialogue130.css','world.js','simulation.js','sound-panel150.js','voice-store140.js','vendor/three.module.js','vendor/three.core.js','vendor/addons/loaders/GLTFLoader.js','vendor/addons/utils/SkeletonUtils.js','vendor/addons/utils/BufferGeometryUtils.js']
s="const CACHE='last-call-1.7.1',ROOT=new URL('./',self.location);\nconst CORE="+json.dumps(CORE)+";\n"+r"""self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const p of CORE){const r=await fetch(new URL(p,ROOT),{cache:'reload'});if(!r.ok||r.redirected)throw Error('Incomplete Captain release: '+p);await c.put(new URL(p,ROOT),r);}await self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('last-call-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==ROOT.origin||!u.pathname.startsWith(ROOT.pathname))return;e.respondWith((async()=>{const c=await caches.open(CACHE);const asset=/\/(assets|vendor)\//.test(u.pathname);if(asset){const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;}try{const r=await fetch(e.request);if(r.ok&&!r.redirected)await c.put(e.request,r.clone());return r;}catch{return await c.match(e.request,{ignoreSearch:true})||(e.request.mode==='navigate'?await c.match(new URL('index.html',ROOT)):null)||Response.error();}})());});
"""
save('sw.js',s)
save('release.json',json.dumps({'version':'1.7.1','chapter':'UTTER CHAOS: helm, deck combat, security, cell','controls':'Desktop WASD key guide with held-key feedback; touch joystick on mobile','scope':'Existing captain/ game only. Stealth escape not included.'},indent=2)+'\n')
print('Chapter staged; publication awaits desktop, touch and gameplay verification.')
