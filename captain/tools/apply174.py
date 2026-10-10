from pathlib import Path
import json,re
r=Path(__file__).resolve().parents[1]
def replace(s,a,b):
 if a not in s: raise RuntimeError('Integration anchor not found: '+a[:100])
 return s.replace(a,b)
s=(r/'chaos173.js').read_text().replace("from './ui173.js?v=173b'","from './ui174.js?v=174'").replace("from './chaos-model170.js'","from './chaos-model174.js?v=174'")
s="import {createEscape,readStoryCheckpoint,storeStoryCheckpoint} from './escape174.js?v=174';\n"+s
s=replace(s,'onRestart,onDrinkLine,mildMotion','onRestart,onDrinkLine,mildMotion,onReclaim')
s=replace(s,'<p>Το επόμενο κεφάλαιο είναι η νηφάλια απόδραση. Η παρούσα playable ενότητα ολοκληρώνεται στη σύλληψη.</p>','<p>Η ιστορία συνεχίζεται. Κοιμήσου, ξύπνα νηφάλιος και βρες δρόμο διαφυγής.</p><button id="continueStory">💤 ΚΟΙΜΗΣΟΥ · ΣΥΝΕΧΕΙΑ</button>')
extra=''' let returning=false,pendingResume=null;
 function recap(){return {chaos:s.chaos,hits:s.hits,broken:s.broken,thrown:s.thrown,released:world.released,brokenProps:world.props.filter(o=>o.broken).map(o=>o.id)};}
 const escape=createEscape({ship,camera,canvas,root,getPeople,getVoyage:getState,getChapter:()=>s,movement:movementHints,audio,onPhase:phase=>{s.foot=phase==='escape';setPhase(phase);},onToast,onReturn:returnToDeck,getRecap:recap});
 function startEscape(data=null){resetInput();avatar?.hide();cellCaptain?.hide();escape.start(data||{checkpoint:'cell'});}
 function resumeFromCell(data=readStoryCheckpoint()){
  setup();if(!ready)return false;
  const stats=data?.stats||{};for(const k of ['chaos','hits','broken','thrown'])if(Number.isFinite(stats[k]))s[k]=Math.max(0,stats[k]);
  for(const o of world.props)if(stats.brokenProps?.includes(o.id)&&!o.broken)world.fracture(o);
  if(stats.released&&!world.released)world.releaseBoat();s.sips=1;s.visited=true;
  pendingResume=data?.checkpoint&&data.checkpoint!=='cell'?data:null;arrest();arrestTimer=2.8;return true;
 }
 function returnToDeck(){
  returning=true;escape.stop();world.cell.visible=false;cellCaptain?.hide();world.root.visible=true;ship.exterior.visible=ship.bridgeGroup.visible=ship.glass.visible=true;
  party.splice(8).forEach(n=>{world.root.remove(n.actor.group);n.bubble?.remove();});guardSerial=0;navigator.reset();nearGuards=0;
  s.foot=true;s.visited=true;s.capture=0;s.health=100;s.stamina=100;s.attack=null;s.pendingAlcohol=Math.max(75,s.pendingAlcohol);s.alarmAt=null;s.securityAt=null;
  const voyage=getState();voyage.drinkCooldown=0;voyage.hull=Math.max(50,voyage.hull);
  p.set(8,10.1,50.7);yaw=Math.PI/2;pitch=0;avatar.group.visible=true;resetInput();setPhase('assault');
  for(const pos of [[3,40],[-3,42],[6,35],[9.5,33]]){if(spawnGuard()){const n=party.at(-1);n.actor.group.position.set(pos[0],18.43,pos[1]);n.health=65;n.home.copy(n.actor.group.position);}}
  storeStoryCheckpoint({checkpoint:'assault',card:true,bottle:true,sipped:true,stats:recap()});
  onToast('Η γέφυρα φυλάσσεται. Ανέβα τη σκάλα, απομάκρυνε τους φύλακες και πάρε το τιμόνι.');
 }
 function reclaim(){
  if(s.phase!=='assault'||p.y<17||Math.hypot(p.x-1.2,p.z-44.4)>2.3)return false;
  if(party.some(n=>n.guard&&n.health>0)){onToast('Η ασφάλεια κρατά ακόμη τη γέφυρα.');return true;}
  s.foot=false;s.attack=null;s.capture=0;avatar.hide();returning=false;setPhase('reclaimed');hud.classList.add('chaos-reclaimed');resetInput();onReclaim?.();
  storeStoryCheckpoint({checkpoint:'reclaimed',stats:recap()});onToast('ΠΗΡΕΣ ΠΙΣΩ ΤΗ ΓΕΦΥΡΑ! Πιάσε το τιμόνι και βάλε πρόσω.');return true;
 }
'''
s=replace(s," function available(){",extra+" function available(){")
s=replace(s," function requestDrink(){"," function requestDrink(){if(escape.active){escape.test.drink();return true;}")
s=replace(s," function doAttack(kind){"," function doAttack(kind){if(escape.active)return;")
s=replace(s," function interact(){"," function interact(){if(escape.active){escape.interact();return;}if(reclaim())return;")
s=replace(s," function down(e){"," function down(e){if(escape.active){if(enabled&&canPlay()){keys.add(e.code);return escape.keyDown(e);}return false;}")
s=replace(s," function pointerDown(e){"," function pointerDown(e){if(escape.active)return escape.pointerDown(e);")
s=replace(s," function pointerMove(e){"," function pointerMove(e){if(escape.active)return escape.pointerMove(e);")
s=replace(s," function pointerUp(e){"," function pointerUp(e){if(escape.active){escape.pointerUp(e);return;}")
s=replace(s,"$('chaosReplay').onclick=onRestart;","$('chaosReplay').onclick=onRestart;$('continueStory').onclick=()=>startEscape();")
s=replace(s," function updateSecurity(dt){"," function updateSecurity(dt){if(s.phase==='assault')return;")
s=replace(s,"n.down=8;n.state='down';","n.down=s.phase==='assault'?99999:8;n.state='down';")
s=replace(s,"s.health=clamp(s.health-(blocked?2:n.guard?12:9),0,100);","s.health=clamp(s.health-(blocked?2:s.phase==='assault'?7:n.guard?12:9),0,100);")
s=replace(s,"  if(s.phase==='arrested'){\n   arrestTimer", "  if(escape.active){escape.update(dt,{stick,keys});if(escape.hideCell){world.cell.visible=false;cellCaptain?.hide();}return;}\n  if(s.phase==='arrested'){\n   arrestTimer")
s=replace(s,"voyage.intox=0;s.pendingAlcohol=0;s.capture=100;","s.pendingAlcohol=0;s.capture=100;")
s=replace(s,"+' ΒΑΘΜΟΙ ΧΑΟΥΣ';hudUpdate();","+' ΒΑΘΜΟΙ ΧΑΟΥΣ';hudUpdate();\n    if(pendingResume){const data=pendingResume;pendingResume=null;if(['assault','reclaimed'].includes(data.checkpoint))returnToDeck();else startEscape(data);}else storeStoryCheckpoint({checkpoint:'cell',stats:recap()});")
s=replace(s," function hudUpdate(){"," function hudUpdate(){if(escape.active){escape.drawHUD();return;}")
s=replace(s,"  chapterHUD.update(s,getState(),target,held,p,nearGuards);","""  chapterHUD.update(s,getState(),target,held,p,nearGuards);
  if(s.phase==='assault'){
   const alive=party.filter(n=>n.guard&&n.health>0).length;
   $('chapterGoal').textContent='ΠΑΡΕ ΠΙΣΩ ΤΗ ΓΕΦΥΡΑ.';$('chapterDetail').textContent=alive?'Ανέβα τη σκάλα · απομένουν '+alive+' φύλακες.':'Η γέφυρα είναι ελεύθερη. Πλησίασε το τιμόνι.';
   $('vitalCustodyLabel').textContent='ΓΕΦΥΡΑ';const percent=Math.round((1-alive/4)*100);$('vitalCustodyValue').textContent=percent+'%';$('vitalCustodyFill').style.width=percent+'%';$('vitalCustodyNote').textContent=alive+' φύλακες απομένουν';
   if(p.y>17&&Math.hypot(p.x-1.2,p.z-44.4)<2.3){const b=$('chaosUse');b.disabled=alive>0;b.dataset.action='reclaim';b.querySelector('.use-icon').textContent='⚓';b.querySelector('strong').textContent='ΠΑΡΕ ΤΟ ΤΙΜΟΝΙ';b.querySelector('small').textContent=alive?'Απομάκρυνε την ασφάλεια':'Ανάκτησε τον έλεγχο';}
  }
  if(s.phase==='reclaimed'){$('chapterGoal').textContent='Η ΓΕΦΥΡΑ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ.';$('chapterDetail').textContent=hint('Γύρισε το τιμόνι · σύρε τον μοχλό για πρόσω.','A / D τιμόνι · W / S μηχανές · 9 ουίσκι');$('vitalCustodyLabel').textContent='ΓΕΦΥΡΑ';$('vitalCustodyValue').textContent='100%';$('vitalCustodyFill').style.width='100%';$('vitalCustodyNote').textContent='Εσύ έχεις τον έλεγχο';}
""")
s=replace(s," function cameraUpdate(dt){if(!enabled)return false;"," function cameraUpdate(dt){if(!enabled)return false;if(escape.active&&escape.mode!=='sleep')return escape.cameraUpdate(dt);")
s=replace(s,"if(s.phase==='cell'){const pos=", "if(s.phase==='cell'||escape.active&&escape.mode==='sleep'){const pos=")
s=replace(s," function project(){if(!enabled)return;"," function project(){if(!enabled||escape.active)return;")
s=replace(s," function reset(){"," function reset(){escape.stop();returning=false;pendingResume=null;hud.classList.remove('chaos-reclaimed');")
s=replace(s,"return {update,cameraUpdate,project,requestDrink,","return {update,cameraUpdate,project,requestDrink,resumeFromCell,")
s=replace(s,"get pausedStory(){return ['arrested','cell'].includes(s.phase);}","get pausedStory(){return escape.active||['arrested','cell'].includes(s.phase);}")
s=replace(s,"get ownsShip(){return enabled&&(s.foot||s.phase==='cell'||s.phase==='arrested');}","get ownsShip(){return enabled&&(escape.active||s.foot||s.phase==='cell'||s.phase==='arrested');}")
s=replace(s,"inspect:()=>({controlScheme:","inspect:()=>({escape:escape.inspect(),returning,controlScheme:")
s=replace(s,"test:{limbs:","test:{escape:escape.test,resumeFromCell,startEscape,returnToDeck,reclaim,limbs:")
(r/'chaos174.js').write_text(s)
s=(r/'chaos-model170.js').read_text().replace("['deck','security'].includes(s.phase)","['deck','security','assault'].includes(s.phase)").replace("if(!s.foot&&s.sips>0)","if(!s.foot&&s.sips>0&&s.phase!=='reclaimed')")
(r/'chaos-model174.js').write_text(s)
s=(r/'ui173.js').read_text().replace('Η stealth απόδραση δεν περιλαμβάνεται ακόμη.','Στο κελί πάτησε ΚΟΙΜΗΣΟΥ για τη νηφάλια απόδραση. Σύρσιμο από το χαμηλό πέρασμα, κάρτα, ουίσκι και επιστροφή στη γέφυρα.')
(r/'ui174.js').write_text(s)
s=(r/'main173.js').read_text().replace("from './chaos173.js?v=173b'","from './chaos174.js?v=174'").replace("from './chaos173.js?v=173'","from './chaos174.js?v=174'")
s="import {readStoryCheckpoint} from './escape174.js?v=174';\n"+s
s=replace(s,"onRestart:startGame,onDrinkLine:","onRestart:startGame,onReclaim:()=>{helm.reset();keys.clear();drag=null;input.turn=0;input.throttle=0;cameraMode=1;targetLookYaw=targetLookPitch=lookYaw=lookPitch=0;syncCameraControls();},onDrinkLine:")
s=s.replace("v1.7.3 · MOBILE","v1.7.4 · ESCAPE").replace("version:'1.7.3'","version:'1.7.4'")
s=replace(s,"$('classicVoyage').addEventListener", "$('continueFromCell').addEventListener('click',()=>{const save=readStoryCheckpoint();chapter.setEnabled(true);startGame();chapter.resumeFromCell(save);});$('classicVoyage').addEventListener")
s=replace(s,"$('start').disabled=false", "$('continueFromCell').disabled=false;$('start').disabled=false")
(r/'main174.js').write_text(s)
s=(r/'index.html').read_text()
s=re.sub(r'<script type="module" src="./main\d+\.js\?v=[^"]+"></script>','<script type="module" src="./main174.js?v=174"></script>',s)
s=re.sub(r'<meta name="captain-build" content="[^"]+">','<meta name="captain-build" content="1.7.4">',s)
if 'mobile173.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="./mobile173.css?v=173b">\n</head>')
if 'dataset.inputScheme=' not in s:s=s.replace('</head>',"<script>document.documentElement.dataset.inputScheme=navigator.maxTouchPoints>0&&(matchMedia('(pointer:coarse)').matches||!matchMedia('(hover:hover)').matches)?'touch':'keyboard';</script></head>")
s=s.replace('</head>','<link rel="stylesheet" href="./escape174.css?v=174">\n</head>')
s=s.replace('<button id="classicVoyage"','<button id="continueFromCell" disabled>ΣΥΝΕΧΕΙΑ · ΑΠΟ ΤΟ ΚΕΛΙ / ΑΠΟΘΗΚΕΥΣΗ →</button>\n<button id="classicVoyage"')
s=s.replace('Η πρώτη ενότητα τελειώνει στη σύλληψη και τον απολογισμό στο κελί. Η stealth απόδραση δεν περιλαμβάνεται ακόμη.','Στο κελί πάτησε ΚΟΙΜΗΣΟΥ · ΣΥΝΕΧΕΙΑ. Στην απόδραση: W A S D κίνηση, C σύρσιμο, F αλληλεπίδραση, 8 ρίψη. Η κάρτα ξεκλειδώνει την έξοδο· το ουίσκι σε οδηγεί πίσω στη γέφυρα.')
(r/'index.html').write_text(s)
s=(r/'sw.js').read_text();s=re.sub(r"last-call-1\.7\.[^'\"]+",'last-call-1.7.4',s)
s=s.replace('const CORE=[','const CORE=["main174.js","chaos174.js","chaos-model174.js","ui174.js","escape174.js","escape-model174.js","escape174.css","main173.js","ui173.js","mobile173.css","security173.js","chaos-world173.js",')
(r/'sw.js').write_text(s)
(r/'release.json').write_text(json.dumps({'version':'1.7.4','chapter':'Jail continuation, top-down escape and bridge return','changes':['Sleep/continue in cell; direct saved chapter entry','Crawl-only passages, guards with sight and hearing','Pickup/aim/throw distractions, keycard and whisky bottle','Guarded bridge assault and actual helm reclaim','Local checkpoint saves; existing mobile/desktop UI retained']},indent=2)+'\n')
print('Integrated chapter 02 and bridge return')
