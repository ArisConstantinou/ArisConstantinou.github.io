import {frameSummary,phaseSummary} from './performance-metrics.js';
import {BENCHMARK_FILENAME} from './benchmark-filename.js';
import {createGpuTimer} from './benchmark-gpu.js';
import {createBenchmarkStorage} from './benchmark-storage.js';
import {selectCombatTarget,combatMovement,combatComplete,CONFIG,FINDINGS,ENCOUNTER,REPORT_HISTORY} from './single-room-combat-rules.js';
import './single-room-combat.css';
import {ISOLATION_PRESETS,isolationPreset,isolationEncounter,isolationConfig,holdIsolatedEnemy,applyBossRenderIsolation,isolationAssets} from './boss-isolation.js';

// Temporary, explicitly labelled diagnostic fixture. Normal damage, animation,
// physics, flames and HEARTH abilities run through the game's existing systems.
export function createSingleRoomCombat(get){
 const storage=createBenchmarkStorage();
 let panel,bar,report=null,running=false,finishing=false,start=0,last=null,stamp=0,cpu={},rows=[],timer=null,at=0,lastUI=0,lastSample=0,lastSave=0,shadowFrames=0,target=null;
 let setupTargets=[],stompWasHit=false,stage='idle',settings={freezeShadows:new URLSearchParams(location.search).get('freeze')!=='0',omitZeroLights:new URLSearchParams(location.search).get('zero')!=='0',isolation:isolationPreset(new URLSearchParams(location.search).get('isolation')||'all').id},active={...settings},memoryPending=false;
 const events=[];let shaderPreparation=null;
 const $=id=>panel.querySelector('#'+id);
 const event=(name,detail={})=>{if(report&&events.length<500)events.push({at:performance.now()-start,name,...detail});};
 const f=(v,d=1)=>Number.isFinite(v)?v.toFixed(d):'—';
 function device(){const c=get(),gl=c.renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return {userAgent:navigator.userAgent,viewport:[innerWidth,innerHeight],canvas:[c.renderer.domElement.width,c.renderer.domElement.height],dpr:devicePixelRatio,quality:c.quality,threads:navigator.hardwareConcurrency||null,deviceMemoryGiB:navigator.deviceMemory||null,gpu:gl.getParameter(ext?ext.UNMASKED_RENDERER_WEBGL:gl.RENDERER),physicalPhoneTestByAgent:false};}
 function config(){const c=get();let normalMappedMaterials=0;c.scene.traverse(o=>{for(const m of Array.isArray(o.material)?o.material:[o.material])if(m?.isMeshStandardMaterial&&m.normalMap)normalMappedMaterials++;});return {...CONFIG,...isolationConfig(active.isolation),loadedAssetPlan:isolationAssets(active.isolation),effectResources:'pooled and shaders prepared before start',freezeShadows:active.freezeShadows,omitZeroLights:active.omitZeroLights,shadowAutoUpdate:c.renderer.shadowMap.autoUpdate,lightFilter:c.activePointLights.snapshot(),rooms:c.world.rooms.map(r=>r.id),floors:c.world.floors.length,bodies:c.physics.bodies.length,actors:c.entities.filter(e=>e.category==='actor'&&!e.removed).length,programs:c.renderer.info.programs.length,quality:c.quality,environmentLighting:!!c.scene.environment,lightingModel:c.scene.userData.mobileLighting||'pbr',fireNoise:c.scene.userData.volumeNoise||'procedural',normalMaps:normalMappedMaterials>0,normalMappedMaterials,muted:c.sound.muted??true};}
 function living(){
  for(const e of get().entities)if(e.category==='actor'&&!e.isPlayer&&!e.ally&&!e.removed&&!setupTargets.includes(e))setupTargets.push(e);
  return setupTargets.filter(e=>!e.dead&&!e.removed);
 }
 function roster(){return setupTargets.map(e=>({id:e.body.id,kind:e.kind,bossType:e.kind==='boss'?(e.bossType||'warden'):null,summoned:!!e.summoner,hp:e.hp,maxHp:e.maxHp,dead:e.dead,removed:e.removed,room:typeof e.room==='string'?e.room:e.room?.name,x:e.body.position.x,y:e.body.position.y,z:e.body.position.z,clip:e.bossClip||e.mesh.userData.animationState,attacks:e.attackIndex||0,lod:e.mesh.userData.redesignLod??null,projectedBodyPixels:e.mesh.userData.redesignPixels??null}));}
 function table(parent,head,entries){const t=document.createElement('table'),h=t.createTHead().insertRow();for(const text of head){const th=document.createElement('th');th.textContent=text;h.append(th);}const b=t.createTBody();for(const row of entries){const tr=b.insertRow();for(const text of row)tr.insertCell().textContent=String(text);}const wrap=document.createElement('div');wrap.className='sc-table';wrap.append(t);parent.append(wrap);}
 function lists(parent){
  const c=report?.configuration||{...CONFIG,...settings,...isolationConfig(settings.isolation)},history=document.createElement('h3');history.textContent='Πρόοδος ανά JSON / έκδοση';parent.append(history);
  table(parent,['Έκδοση / μέτρηση','Έλεγχος / αλλαγή','Κατάσταση'],REPORT_HISTORY.map(r=>[r.version+' · '+r.measurement,r.action,r.status]));
  const title=document.createElement('h3');title.textContent='1 · Ιστορικές διαγνωστικές δοκιμές';parent.append(title);
  table(parent,['Δοκιμή','Μέτρηση','Εύρημα'],FINDINGS.map(r=>[r.label,r.measurement,r.result]));
  const h=document.createElement('h3');h.textContent='2 · Τι είναι ενεργό σε αυτή τη δοκιμή';parent.append(h);
  table(parent,['Σύστημα','Κατάσταση'],[
   ['Κόσμος','ΕΝΑ δωμάτιο · courtyard'],['Υπόλοιπος χάρτης / επάνω όροφοι','OFF · δεν κατασκευάζονται'],
   ['Mobile φωτισμός',c.lightingModel||'PBR'],['IBL περιβάλλοντος',c.environmentLighting===false?'OFF · προσωρινό mobile προφίλ':'ON'],['Normal/bump maps',c.normalMaps===false?'OFF · προσωρινό mobile προφίλ':'ON'],['Θόρυβος φλογοβόλου',c.fireNoise||'procedural'],['Νέα παραγωγή σκιών',c.freezeShadows?'OFF · παγωμένη αρχική σκιά (διάγνωση)':'ON'],['Φίλτρο μηδενικών lights',c.omitZeroLights?'ON · μόνο ακριβώς μηδενική συνεισφορά':'OFF'],
   ['Ενεργά φώτα / ορατές φλόγες πυρσών','ON'],['Φυσική / props / αγάλματα / animations','ON'],['AI κανονικών εχθρών','OFF στα 15 s ηρεμίας → ON στη μάχη'],['Δοκιμή απομόνωσης',c.isolationLabel||'Παλαιότερη αναφορά'],['Εμφάνιση bosses',c.bossRendering===false?'OFF · αόρατα μοντέλα, AI / physics / animations ON':'ON (όσοι υπάρχουν)'],['AI bosses',c.bossAI===false?'OFF · ακίνητοι / χωρίς επιθέσεις και summons':'ON μετά τα 15 s (όσοι υπάρχουν)'],
   ['HEARTH / φλογοβόλα / stomp','ON · αυτόματα, κανονική ζημιά / cooldown'],['Παίκτης','Ήδη στη μηχανή · απεριόριστη ζωή δοκιμής'],['Εχθροί',`${c.regularEnemyCount??c.enemyCount} κανονικοί + ${c.bossCount??0} bosses · κανονική ζωή`],['Bosses',(c.bossTypes||[]).join(' · ')||'Κανένας'],['Summons',c.bossSummoning?'ON · καταμετρώνται και γίνονται στόχοι':'OFF'],['Ήχος','MUTED'],['Cache στατικών σκιών','ON · batch cache OFF'],['Νέο A* πείραμα','OFF · προηγούμενη επαληθευμένη πλοήγηση']]);
  const note=document.createElement('p');note.textContent='Προσωρινές αφαιρέσεις για διάγνωση. Ξεκίνα με 6 εχθρούς / bosses OFF, μετά 12 χωρίς bosses. Σύγκρινε κάθε boss χωριστά με τους ίδιους 12. Για εμφάνιση OFF ή AI OFF σύγκρινε με ΟΛΟΙ. Κάθε νέα μέτρηση επαναφορτώνει τη σελίδα. Περίμενε να κρυώσει το κινητό ανάμεσα στις δοκιμές.';parent.append(note);
 }
 function show(){if(!panel)return;if(running){summarize('recording');report.rows=rows;event('report_opened');}panel.hidden=false;render();}
 function render(){
  const body=$('sc-results');body.replaceChildren();
  if(report){const p=document.createElement('p');p.textContent=`${report.version} · ${report.outcome||'σε εξέλιξη'} · ${report.kills||0}/${report.totalEnemies||report.configuration?.enemyCount||CONFIG.enemyCount} εχθροί · ${report.id}`;body.append(p);
   table(body,['Φάση','FPS','P95 ms','Max ms','>50 ms'],(report.scenes||[]).map(r=>[r.label,f(r.summary?.fps),f(r.summary?.frames.p95),f(r.summary?.frames.max),r.summary?.frames.over50??'—']));
   const p2=document.createElement('p');p2.textContent=`Φλογοβόλο: ${report.combat?.fireHitCalls||0} χτυπήματα · Stomp: ${report.combat?.stomps||0} ενεργοποιήσεις, ${report.combat?.stompImpacts||0} impacts, ${report.combat?.stompHitCalls||0} χτυπήματα. ${report.errors.length} σφάλματα.`;body.append(p2);
   const p3=document.createElement('p');p3.textContent=report.storage?.saved?'Το τελευταίο JSON αποθηκεύτηκε αυτόματα στη συσκευή.':'Η αναφορά διατηρείται εδώ. Αποθήκευσε ή κοινοποίησε το JSON.';body.append(p3);
  }
  lists(body);$('sc-export').hidden=!report;$('sc-options').hidden=running;
 }
 async function persist(){if(!report||memoryPending)return;memoryPending=true;try{report.storage=await storage.save({...report,scenes:report.scenes||[],issues:[]});}finally{memoryPending=false;}}
 function summarize(reason){
  const result=[];for(const name of ['idle','combat','settle']){const part=rows.filter(r=>r.stage===name);if(part.length)result.push({type:name,label:{idle:'15 s · ακίνητος μέσα στο HEARTH',combat:'Αυτόματη μάχη',settle:'Μετά τη μάχη'}[name],summary:phaseSummary(part).all,windows:phaseSummary(part)});}
  report.scenes=result;report.bins=[];for(let ms=0;ms<=at;ms+=5000){const part=rows.filter(r=>r.at>=ms&&r.at<ms+5000);if(part.length)report.bins.push({fromMs:ms,toMs:ms+5000,stage:part[0].stage,summary:frameSummary(part)});}
  living();report.configurationAtEnd=config();report.kills=setupTargets.filter(e=>e.dead).length;report.remaining=living().length;report.totalEnemies=setupTargets.length;report.roster=roster();report.bossKills=report.roster.filter(e=>e.bossType&&e.dead).length;report.summonedEnemies=report.roster.filter(e=>e.summoned).length;report.durationMs=at;report.gpuTiming=timer?.status?{...timer.status}:report.gpuTiming;report.reason=reason||null;
 }
 async function finish(reason=null){
  if(!running||finishing)return;finishing=true;running=false;get().suspend();summarize(reason);report.finishedAt=new Date().toISOString();report.outcome=reason?'partial':'complete';
  if(timer){for(let i=0;i<3;i++){await new Promise(r=>setTimeout(r,20));timer.poll();}summarize(reason);timer.dispose();timer=null;}
  report.rows=rows;await persist();bar.hidden=true;show();finishing=false;
 }
 function populate(){
  active={...settings};const c=get(),e=c.hearth.engine,p=c.player;
  e.body.position.set(0,1.24,19);e.body.velocity.setZero();e.body.aabbNeedsUpdate=true;e.location.room=c.world.zones.find(r=>r.name==='courtyard');e.location.x=0;e.location.z=19;
  e.yaw=e.aimYaw=p.yaw=Math.PI;e.facing.reset(Math.PI);e.heart.state='piloted';e.heart.fuel=100;
  p.body.type=4;p.body.collisionFilterMask=0;p.body.position.set(0,p.cy+.06,19);p.body.velocity.setZero();p.body.updateMassProperties();p.body.aabbNeedsUpdate=true;p.radius=1.22;p.invulnerable=.8;
  setupTargets=[];
  const room=c.world.zones.find(r=>r.name==='courtyard');if(!room)throw Error('Courtyard combat bounds missing');
  for(const slot of isolationEncounter(active.isolation)){
   if(slot.legacyNavSpawn){const n=c.nav.nodes[c.nav.nearest(slot.x,slot.z,0)];if(!n)throw Error('Single-room enemy support missing');const a=c.actor(slot.kind,n.x,n.z);a.room='courtyard';a.aggro=true;setupTargets.push(a);continue;}
   const radius=slot.kind==='boss'?.85:.5;
   const point=c.freePosition(slot,radius,c.world.floors,c.nav.obstacles,c.entities,4.2,at=>at.x>room.xMin+radius+.3&&at.x<room.xMax-radius-.3&&at.z>room.zMin+radius+.3&&at.z<room.zMax-radius-.3&&Math.hypot(at.x-e.body.position.x,at.z-e.body.position.z)>3.4);
   if(!point)throw Error('No supported combat spawn for '+(slot.name||slot.kind));
   const a=c.actor(slot.kind,point.x,point.z,false,slot.bossType||null,room);a.room=slot.bossType?room:'courtyard';if(slot.name)a.label=slot.name;a.aggro=true;setupTargets.push(a);
  }
  c.hearth.sync(0);c.renderer.shadowMap.autoUpdate=true;c.renderer.shadowMap.needsUpdate=true;shadowFrames=0;
  c.activePointLights.setEnabled(active.omitZeroLights);c.staticShadowCache?.setBatchCaching(false);stage='idle';target=null;
  c.sound.setMuted(true);c.ui.setMuted(true);
 }
 function ready(){
  get().activePointLights.setEnabled(settings.omitZeroLights);get().sound.setMuted(true);get().ui.setMuted(true);
  const button=document.querySelector('#start-button');if(button)button.textContent='ΕΝΑΡΞΗ · '+isolationConfig(settings.isolation).enemyCount+' ΕΧΘΡΟΙ';
  const note=document.createElement('p');note.className='sc-menu-note';note.textContent=isolationPreset(settings.isolation).label+' · 15 s ηρεμία → μάχη → JSON. Οι αφαιρέσεις είναι προσωρινές δοκιμές.';button?.before(note);
  const options=document.createElement('button');options.id='sc-menu-options';options.className='sc-menu-options';options.textContent='ΔΟΚΙΜΕΣ OFF / ΠΡΟΟΔΟΣ';options.onclick=show;button?.after(options);
  if(!panel)mount();
  if(new URLSearchParams(location.search).get('combatStart')==='1')void get().start();
 }
 function begin(){
  if(!panel)mount();running=true;finishing=false;rows=[];events.length=0;start=performance.now();last=null;lastUI=lastSample=lastSave=0;at=0;stage='idle';stompWasHit=false;
  report={schema:3,scenario:'single-room-hearth-combat',fixtureRevision:'courtyard-boss-isolation-1',id:'magic-'+Date.now().toString(36),version:get().version,createdAt:new Date().toISOString(),configuration:config(),device:device(),loading:{shaderPreparation,navigationToReadyMs:performance.now(),resources:performance.getEntriesByType('resource').map(r=>({file:r.name.split('/').slice(-2).join('/'),duration:r.duration,transferBytes:r.transferSize,decodedBytes:r.decodedBodySize}))},conditions:'15 seconds idle with enemy AI held, then automatic real HEARTH fire/stomp. Boss presence, rendering and AI follow the explicitly named isolation preset in configuration. Render OFF keeps animation/physics/AI, health bars and attack effects; AI OFF keeps models/physics/idle animations, disables boss attacks and summons. Killable enemies, player health unlimited. Frozen shadows are a declared diagnostic option. One room, no full-world loading. No frame intervals discarded. Submission cadence, not physical screen scanout. Game progress is memory-only; original saves are preserved.',findings:FINDINGS,progress:REPORT_HISTORY,initialRoster:roster(),events,errors:[],issues:[],scenes:[],timeline:[],combat:{stomps:0,stompImpacts:0,fireHitCalls:0,stompHitCalls:0},memory:[],rowsTruncated:false};
  timer=createGpuTimer(get().renderer.getContext());panel.hidden=true;bar.hidden=false;event('begin');void persist();
 }
 function beginFrame(phase){
  if(!running)return;if(phase!=='playing'){void finish('game paused');return;}stamp=performance.now();cpu={};at=stamp-start;
  const next=at<15000?'idle':living().length?'combat':'settle';if(next!==stage){stage=next;event('stage',{stage});}
 }
 function control(input){
  if(!running)return;const c=get(),live=living();target=selectCombatTarget(live,c.hearth.engine.body.position);
  if(stage!=='combat'){input.moveX=input.moveZ=0;input.firing=false;return;}
  const b=c.hearth.engine.body.position,m=target?combatMovement(b,target.body.position):{moveX:0,moveZ:0};
  if(Math.hypot(input.moveX,input.moveZ)<.15){input.moveX=m.moveX;input.moveZ=m.moveZ;}
  input.firing=!!target;
  if(target&&Math.hypot(target.body.position.x-b.x,target.body.position.z-b.z)<3.9&&c.hearth.stomp()){report.combat.stomps++;event('engine_stomp');}
  const hit=c.hearth.engine.heart.stompHit;if(hit&&!stompWasHit){report.combat.stompImpacts++;event('stomp_impact');}stompWasHit=hit;
 }
 function aim(){if(!running||stage!=='combat'||!target)return;const c=get(),b=c.hearth.engine.body.position,p=target.body.position;c.aimPoint.set(p.x,p.y,p.z);c.aimDirection.set(p.x-b.x,0,p.z-b.z).normalize();}
 function hit(e,amount){living();if(!running||!setupTargets.includes(e))return;const h=get().hearth.engine.heart;if(h.stompTime>0)report.combat.stompHitCalls++;else if(h.firing)report.combat.fireHitCalls++;if(e.hp===0)event('enemy_killed',{kind:e.kind,bossType:e.bossType||(e.kind==='boss'?'warden':null),summoned:!!e.summoner,cause:h.stompTime>0?'stomp':h.firing?'fire':'other',amount});}
 function mark(name){if(!running)return;const now=performance.now();cpu[name]=(cpu[name]||0)+now-stamp;stamp=now;}
 function beginRender(){applyBossRenderIsolation(get().entities,active.isolation);if(running)timer?.begin();}
 function endFrame(){
  const c=get();if(++shadowFrames===2&&active.freezeShadows)c.renderer.shadowMap.autoUpdate=false;
  if(!running)return;mark('render');const now=performance.now(),row={at:now-start,elapsed:stage==='combat'?now-start-15000:now-start,stage,active:true,interval:last===null?now-start:now-last,cpu:{...cpu},calls:c.renderer.info.render.calls,triangles:c.renderer.info.render.triangles};
  timer?.end(row);if(rows.length<60000)rows.push(row);else report.rowsTruncated=true;last=now;at=now-start;
  if(at-lastSample>500){lastSample=at;report.timeline.push({at,stage,remaining:living().length,bosses:roster().filter(e=>e.bossType),summons:setupTargets.filter(e=>e.summoner).length,position:c.hearth.engine.body.position.toArray(),engine:c.hearth.snapshot(),programs:c.renderer.info.programs.length,lightFilter:c.activePointLights.snapshot(),shadowAutoUpdate:c.renderer.shadowMap.autoUpdate});}
  if(at-lastUI>500){lastUI=at;bar.querySelector('span').textContent=`${stage==='idle'?'Ηρεμία '+Math.ceil((15000-at)/1000)+' s':stage==='combat'?'Μάχη · '+living().length+'/'+setupTargets.length:'Ολοκληρώθηκε'} · ${f(frameSummary(rows.slice(-60))?.fps,0)} FPS`;}
  if(at-lastSave>15000){lastSave=at;summarize('recording');report.outcome='recording';report.memory.push({at,...c.resources()});void persist();}
  if(stage==='settle'){report.settledAt??=at;if(at-report.settledAt>=3000)void finish();}
  if(at>=CONFIG.maximumSeconds*1000&&living().length)void finish(CONFIG.maximumSeconds+' s limit · enemies remain');
 }
 function mount(){
  panel=document.createElement('section');panel.id='single-combat-panel';panel.hidden=true;
  panel.innerHTML=`<div class="sc-card"><header><strong>MAGIC · ΕΝΑ ΔΩΜΑΤΙΟ</strong><button id="sc-close">ΚΛΕΙΣΙΜΟ</button></header><p>15 δευτερόλεπτα ηρεμίας. Έπειτα η μηχανή στοχεύει, βαδίζει, ρίχνει φωτιά και πατά τους εχθρούς αυτόματα. Μπορείς να οδηγήσεις με τους κανονικούς χειρισμούς.</p><div id="sc-options"><label for="sc-isolation">Δοκιμή · μία αλλαγή κάθε φορά</label><select id="sc-isolation"></select><p>Νέα μέτρηση = επαναφόρτωση. Εμφάνιση OFF: αόρατοι bosses, AI/animations/physics ON. AI OFF: ορατοί bosses χωρίς επιθέσεις/summons.</p><label><input id="sc-freeze" type="checkbox" checked> Πάγωμα παραγωγής σκιών · προσωρινά OFF</label><label><input id="sc-zero" type="checkbox" checked> Αφαίρεση μηδενικών lights</label><button id="sc-retry">ΝΕΑ ΜΕΤΡΗΣΗ</button></div><div id="sc-results"></div><div id="sc-export"><button id="sc-share">ΚΟΙΝΟΠΟΙΗΣΗ JSON</button><button id="sc-download">ΛΗΨΗ JSON</button><button id="sc-copy">ΑΝΤΙΓΡΑΦΗ JSON</button></div><p id="sc-feedback" role="status"></p></div>`;
  document.body.append(panel);bar=document.createElement('aside');bar.id='single-combat-rec';bar.hidden=true;bar.innerHTML='<span>REC</span><button>ΛΙΣΤΑ / JSON</button>';document.body.append(bar);
  bar.querySelector('button').onclick=show;$('sc-close').onclick=()=>{panel.hidden=true;};
  for(const preset of ISOLATION_PRESETS){const option=document.createElement('option');option.value=preset.id;option.textContent=preset.label;$('sc-isolation').append(option);}$('sc-isolation').value=settings.isolation;$('sc-isolation').onchange=()=>{settings.isolation=$('sc-isolation').value;};
  for(const [id,key]of [['sc-freeze','freezeShadows'],['sc-zero','omitZeroLights']]){$(id).checked=settings[key];$(id).onchange=()=>{settings[key]=$(id).checked;};}
  $('sc-retry').onclick=()=>{const url=new URL(location.href);url.searchParams.set('isolation',settings.isolation);url.searchParams.set('freeze',settings.freezeShadows?'1':'0');url.searchParams.set('zero',settings.omitZeroLights?'1':'0');url.searchParams.set('combatStart','1');location.assign(url.href);};
  const text=()=>JSON.stringify(report,null,2);
  const file=()=>new File([text()],BENCHMARK_FILENAME,{type:'application/json'});
  const download=()=>{const url=URL.createObjectURL(file()),a=document.createElement('a');a.href=url;a.download=file().name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  $('sc-download').onclick=download;
  $('sc-copy').onclick=async()=>{try{await navigator.clipboard.writeText(text());$('sc-feedback').textContent='Το JSON αντιγράφηκε.';}catch{$('sc-feedback').textContent='Χρησιμοποίησε ΛΗΨΗ JSON.';}};
  $('sc-share').onclick=async()=>{try{const files=[file()];if(navigator.canShare?.({files}))await navigator.share({files,title:'MAGIC single-room benchmark'});else download();}catch(e){$('sc-feedback').textContent=e.name==='AbortError'?'Η κοινοποίηση ακυρώθηκε.':'Χρησιμοποίησε ΛΗΨΗ JSON.';}};
  storage.load().then(saved=>{if(saved?.scenario==='single-room-hearth-combat'&&!report){report=saved;}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&running){event('visibility_hidden');void finish('tab hidden · partial');}});
  const fail=error=>{if(!running)return;report.errors.push({at:performance.now()-start,message:String(error?.message||error)});void finish('runtime error');};
  window.addEventListener('error',e=>fail(e.error||e.message));window.addEventListener('unhandledrejection',e=>fail(e.reason));get().renderer.domElement.addEventListener('webglcontextlost',()=>fail('WebGL context lost'));
 }
 const api={get assets(){return isolationAssets(settings.isolation);},prepared:value=>{shaderPreparation=value;},populate,ready,begin,beginFrame,control,aim,hit,mark,beginRender,endFrame,show,finish,get report(){return report;},get running(){return running;},get holdEnemies(){return !running||stage==='idle';},holdEnemy:e=>!running||stage==='idle'||holdIsolatedEnemy(e,active.isolation),snapshot:()=>({running,stage,remaining:living().length,totalEnemies:setupTargets.length,roster:roster(),configuration:config()})};
 globalThis.__MAGIC_SINGLE_COMBAT__=api;return api;
}
