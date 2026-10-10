from pathlib import Path
import re,json
root=Path('captain')
def replace(s,a,b):
 if a not in s:raise RuntimeError('Integration anchor missing: '+a[:90])
 return s.replace(a,b,1)
s=(root/'chaos173.js').read_text().replace("'./ui173.js?v=173b'","'./ui180.js?v=180'")
s="import {createEscapeChapter} from './escape180.js?v=180';\n"+s
s=replace(s,'Η παρούσα playable ενότητα ολοκληρώνεται στη σύλληψη.','Πάτησε ΣΥΝΕΧΕΙΑ για ύπνο και απόδραση — δεν χρειάζεται νέα διαδρομή.')
s=replace(s,'<button id="chaosReplay">','<button id="continueFromCell180">ΣΥΝΕΧΕΙΑ · ΥΠΝΟΣ ΚΑΙ ΑΠΟΔΡΑΣΗ →</button><button id="chaosReplay">')
anchor=" function available(){return enabled&&canPlay()&&!['arrested','cell'].includes(s.phase);}"
code='''
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
 function available(){return enabled&&!retaken&&!escape.active&&canPlay()&&!['arrested','cell','escape'].includes(s.phase);}
'''
s=replace(s,anchor,code)
s=replace(s," function requestDrink(){if(!available())return true;"," function requestDrink(){if(retaken)return false;if(!available())return true;")
s=replace(s," function interact(){if(!available())return;", " function interact(){if(!available())return;if(s.returning&&p.y>17&&Math.hypot(p.x-1.2,p.z-44.4)<2.5){if(party.some(n=>n.guard&&n.health>0&&Math.abs(n.actor.group.position.y-p.y)<1&&n.actor.group.position.distanceTo(p)<2.6)){onToast('Απομάκρυνε πρώτα τους φύλακες δίπλα στο τιμόνι.');return;}retake();return;}")
s=replace(s," function resetInput(){movementHints.reset();", " function resetInput(){escape?.resetInput();movementHints.reset();")
s=replace(s," function down(e){if(!enabled||!canPlay())return false;", " function down(e){if(escape.active)return escape.keyDown(e);if(!enabled||retaken||!canPlay())return false;if(s.phase==='cell'&&e.code==='KeyF'&&!e.repeat){continueCell();return true;}")
s=replace(s," function up(e){keys.delete(e.code);", " function up(e){escape.keyUp(e);keys.delete(e.code);")
s=replace(s," function pointerDown(e){if(!s.foot", " function pointerDown(e){if(escape.active)return escape.pointerDown(e);if(!s.foot")
s=replace(s," function pointerMove(e){if(!s.foot", " function pointerMove(e){if(escape.active)return true;if(!s.foot")
s=replace(s," function updateSecurity(dt){\n  if(!s.foot", " function updateSecurity(dt){\n  if(s.returning)return;\n  if(!s.foot")
s=replace(s," function update(dt){if(!enabled)return;", " function update(dt){if(!enabled||retaken)return;if(escape.active){escape.update(dt);return;}")
a=s.index('    world.root.visible=false;',s.index("if(arrestTimer>=2.8)"));b=s.index('   }return;',a)
s=s[:a]+"    enterCell();\n"+s[b:]
s=replace(s,"  chapterHUD.update(s,getState(),target,held,p,nearGuards);", """  chapterHUD.update(s,getState(),target,held,p,nearGuards);
  if(s.returning){$('chapterGoal').textContent='ΠΑΡΕ ΠΙΣΩ ΤΗ ΓΕΦΥΡΑ.';$('chapterDetail').textContent='Ανέβα τη σκάλα. Απομάκρυνε τους φύλακες και πλησίασε το τιμόνι.';
   if(p.y>17&&Math.hypot(p.x-1.2,p.z-44.4)<2.5){const b=$('chaosUse');b.disabled=false;b.querySelector('.use-icon').textContent='⚓';b.querySelector('strong').textContent='ΠΑΡΕ ΤΟ ΤΙΜΟΝΙ';b.querySelector('small').textContent='Γέφυρα πλοίου';b.dataset.action='helm';}}
""")
s=replace(s," function cameraUpdate(dt){if(!enabled)return false;", " function cameraUpdate(dt){if(escape.active)return escape.cameraUpdate(dt);if(!enabled||retaken)return false;")
s=replace(s," function project(){if(!enabled)return;", " function project(){if(!enabled||retaken||escape.active)return;")
s=replace(s," function reset(){hud.classList.toggle", " function reset(){escape.stop();escapeResume=null;retaken=false;hud.classList.toggle")
s=replace(s," return {update,cameraUpdate,project,requestDrink,", " return {update,cameraUpdate,project,requestDrink,resumeStory,hasSave:()=>!!saved(),")
s=replace(s,"get enabled(){return enabled;}","get enabled(){return enabled&&!retaken;}")
s=replace(s,"get pausedStory(){return ['arrested','cell'].includes(s.phase);}","get pausedStory(){return escape.active||['arrested','cell','escape'].includes(s.phase);}")
s=replace(s,"return enabled&&(s.foot||s.phase==='cell'||s.phase==='arrested');","return enabled&&!retaken&&(escape.active||s.foot||['cell','arrested','escape'].includes(s.phase));")
s=replace(s,"inspect:()=>({controlScheme:","inspect:()=>({escape:escape.inspect(),returning:!!s.returning,retaken,controlScheme:")
s=replace(s,"test:{limbs:","test:{escape:escape.test,resumeStory,continueCell,limbs:")
(root/'chaos180.js').write_text(s)
s=(root/'main173.js').read_text().replace("'./chaos173.js?v=173b'","'./chaos180.js?v=180'")
s=s.replace("version:'1.7.3'","version:'1.8.0'").replace("v1.7.3 · MOBILE","v1.8.0 · ESCAPE")
s=replace(s,"if(name==='drink'&&chapter?.enabled){chapter.requestDrink();return;}","if(name==='drink'&&chapter?.enabled&&chapter.requestDrink())return;")
s=replace(s,"    accum+=dt;\n    while(accum>=1/60){advance(state,1/60,input,world.obstacles,world.sampleHeight,world.safeHarbor,gameplayEvent);accum-=1/60;}","    if(chapter?.pausedStory){accum=0;state.time+=dt;state.speed=0;state.roll*=Math.exp(-dt*2);state.pitch*=Math.exp(-dt*2);}else{accum+=dt;while(accum>=1/60){advance(state,1/60,input,world.obstacles,world.sampleHeight,world.safeHarbor,gameplayEvent);accum-=1/60;}}")
s=replace(s,"    ready=true;$('start').disabled=false;", "    $('jailEntry180').disabled=false;$('jailEntry180').textContent=chapter.hasSave()?'ΣΥΝΕΧΕΙΑ ΑΠΟ ΤΟ ΣΗΜΕΙΟ ΕΛΕΓΧΟΥ →':'ΚΕΦΑΛΑΙΟ 2 · ΞΕΚΙΝΑ ΑΠΟ ΤΟ ΚΕΛΙ →';\n    $('jailEntry180').onclick=()=>{chapter.setEnabled(true);startGame();chapter.resumeStory();};\n    ready=true;$('start').disabled=false;")
(root/'main180.js').write_text(s)
s=(root/'ui173.js').read_text().replace('Η stealth απόδραση δεν περιλαμβάνεται ακόμη.','Στο κελί πάτησε ΣΥΝΕΧΕΙΑ για ύπνο και playable απόδραση.').replace('Η διαδρομή χάους ολοκληρώθηκε.','Πάτησε ΣΥΝΕΧΕΙΑ για να ξεκινήσεις την απόδραση.')
(root/'ui180.js').write_text(s)
s=(root/'index.html').read_text()
s=re.sub(r'src="\./main\d+\.js\?v=[^"]+"','src="./main180.js?v=180"',s)
s=re.sub(r'(<meta name="captain-build" content=")[^"]+',r'\g<1>1.8.0',s)
if 'escape180.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="./escape180.css?v=180">\n</head>')
if 'id="jailEntry180"' not in s:s=replace(s,'<button id="classicVoyage"','<button id="jailEntry180" disabled>ΚΕΦΑΛΑΙΟ 2 · ΑΠΟΔΡΑΣΗ →</button>\n        <button id="classicVoyage"')
s=s.replace('Η πρώτη ενότητα τελειώνει στη σύλληψη και τον απολογισμό στο κελί. Η stealth απόδραση δεν περιλαμβάνεται ακόμη.','Στο κελί πάτησε ΣΥΝΕΧΕΙΑ. Απόφυγε τους φύλακες, πάρε την κάρτα και χρησιμοποίησε αντικείμενα για αντιπερισπασμό. Η πρόοδος αποθηκεύεται στη συσκευή σου.')
(root/'index.html').write_text(s)
s=(root/'sw.js').read_text();s=re.sub(r"last-call-1\.[\w.\-]+","last-call-1.8.0",s)
a=s.find('const CORE=')
if a>=0 and 'escape180.css' not in s:
 b=s.find(';',a);chunk=s[a:b];chunk=chunk.replace('[','["main180.js","chaos180.js","ui180.js","escape180.js","escape-world180.js","escape-model180.js","escape180.css","security173.js","chaos-world173.js","mobile173.css",',1);s=s[:a]+chunk+s[b:]
(root/'sw.js').write_text(s)
(root/'release.json').write_text(json.dumps({'version':'1.8.0','changes':['Continue from jail instead of restart-only','Playable sober top-down escape, crawl hatch, guard perception, noise and local checkpoints','Whisky recovery and return to the existing guarded bridge'],'preserved':['Captain identity and FPS combat','Touch-only mobile controls and desktop WASD','Ship damage and chapter score during continuation']},indent=2))
print('Applied chapter two to the existing game; no other project directories changed.')
