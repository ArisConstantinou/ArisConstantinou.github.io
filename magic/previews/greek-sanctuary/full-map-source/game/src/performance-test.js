import {frameSummary,phaseSummary} from './performance-metrics.js';
import {createGpuTimer} from './benchmark-gpu.js';
import {createBenchmarkStorage,compactReport} from './benchmark-storage.js';
import './performance-test.css';
export const benchmarkMode=typeof location!=='undefined'&&new URL(location.href).searchParams.get('benchmark')==='1';
export const benchmarkScenes=[
 {type:'idle',label:'Αυλή · ηρεμία',seconds:10},
 {type:'turn',label:'Αυλή · κάμερα',seconds:10},
 {type:'crowd',label:'Πρώτη προσέγγιση · 18 εχθροί',seconds:12},
 {type:'mage',label:'Μάγος · πέτρα / αρπαγή / ρίψη / κύμα / έφοδος',seconds:16},
 {type:'room:library',label:'Βιβλιοθήκη · κίνηση / μάχη',seconds:10},
 {type:'room:forge',label:'Σιδηρουργείο · κίνηση / boss',seconds:10},
 {type:'room:sanctum',label:'Άδυτο · κίνηση / boss',seconds:10},
 {type:'engine',label:'Μηχανή · είσοδος / βάδισμα / πυρ / πάτημα / έξοδος',seconds:22}
];
const fmt=(n,d=1)=>Number.isFinite(n)?n.toFixed(d):'—';
const storage=createBenchmarkStorage();
const labels={stone:'Πέτρα',grab:'Αρπαγή',throw:'Ρίψη',shield:'Ασπίδα',pulse:'Κύμα',dash:'Έφοδος',fire_absorb:'Απορρόφηση φωτιάς',engine_board:'Είσοδος μηχανής',engine_fire:'Φλογοβόλα',engine_stomp:'Πάτημα',engine_exit:'Έξοδος μηχανής',goliath:'Πέτρινος σύμμαχος'};
export function createPerformanceTest({version,boot,setup,step,suspend,device,sample,memory}){
 let panel,started=false,running=false,completed=false,current,pass=0,index=0,phaseStart=0,lastPresented=null,lastUI=0,stamp=0,cpu={},rows=[],report=null,readyAt=null,download={received:0},stages=[],loadingSnapshot=null,setupMs=0,timer,frameRow,mode='auto',lastSample=0,lastMemory=0,lastRoom=null,lastEngine=null,finishing=false;
 const sceneRows=[],allRows=[];let longTaskObserver,pendingIssue=null,activeFrame=true,lastFiring=false,lastShield=false,lastCheckpoint=0,checkpointBusy=false,checkpointPromise=Promise.resolve();
 const status=t=>{const e=panel?.querySelector('#benchmark-status');if(e)e.textContent=t;};
 const feedback=t=>{panel.querySelector('#benchmark-feedback').textContent=t;};
 const stage=label=>{if(stages.at(-1)?.label!==label)stages.push({ms:performance.now(),label});if(started&&!running)status(label);};
 function downloadProgress(event){download=event;if(started&&!running)panel.querySelector('#benchmark-loading').textContent=`${fmt(event.received/1048576)} MiB · ${fmt((event.cachedBytes||0)/1048576)} από cache`;}
 function loadingReport(){
  if(loadingSnapshot)return loadingSnapshot;
  const resources=performance.getEntriesByType('resource').filter(r=>!r.name.startsWith('blob:')&&!r.name.startsWith('data:')).map(r=>({file:r.name.split('/').slice(-2).join('/'),start:r.startTime,end:r.responseEnd,duration:r.duration,transfer:r.transferSize,decoded:r.decodedBodySize,encoded:r.encodedBodySize,workerStart:r.workerStart}));
  return {navigationToReadyMs:readyAt,benchmarkToReadyMs:readyAt&&report?readyAt-report.startedMs:null,receivedBytes:download.received||0,cacheReadBytes:download.cachedBytes||0,stages:[...stages],resources,afterLastResponseMs:readyAt?Math.max(0,readyAt-Math.max(0,...resources.map(r=>r.end))):null,cacheNote:'Bytes ανάγνωσης, όχι κατ’ ανάγκη νέα λήψη. transfer=0 μπορεί να σημαίνει cache/service worker.'};
 }
 function capture(){try{const source=document.getElementById('game-canvas'),c=document.createElement('canvas');c.width=Math.min(480,source.width);c.height=Math.round(source.height/source.width*c.width);c.getContext('2d').drawImage(source,0,0,c.width,c.height);return c.toDataURL('image/jpeg',.62);}catch{return null;}}
 function event(name,detail={}){if(!running)return;const row={at:performance.now()-report.startedMs,name,...detail};report.events.push(row);if(labels[name])report.coverage.actions[name]=(report.coverage.actions[name]||0)+1;}
 function sceneResult(partial=false){
  if(!current||!rows.length)return;
  const record={type:current.type,label:current.label,pass:pass+1,partial,setupMs,firstFrameMs:rows[0]?.elapsed??null,summary:phaseSummary(rows).all,windows:phaseSummary(rows),image:capture()};
  report.scenes.push(record);sceneRows.push({record,rows});rows=[];
 }
 function addText(parent,text,tag='p'){const el=document.createElement(tag);el.textContent=text;parent.append(el);return el;}
 function table(parent,entries){
  const wrap=document.createElement('div');wrap.className='benchmark-table';const t=document.createElement('table');
  t.innerHTML='<thead><tr><th>Σενάριο</th><th>FPS</th><th>P95 ms</th><th>Μέγ. ms</th><th>Πρώτα 2 s · μέγ.</th><th>Καρέ >50 ms</th><th>GPU P95 ms</th><th>Draw calls</th></tr></thead>';
  const body=t.createTBody();
  for(const r of entries){const tr=body.insertRow(),s=r.summary;for(const v of [r.label||r.type,fmt(s?.fps),fmt(s?.frames?.p95),fmt(s?.frames?.max),fmt(r.windows?.firstTwoSeconds?.frames.max),String(s?.frames?.over50||0),fmt(s?.gpu?.p95),fmt(s?.drawCalls?.mean,0)])tr.insertCell().textContent=v;}
  wrap.append(t);parent.append(wrap);
 }
 function storageMessage(){
  if(report.storage?.saved)return `Η αναφορά αποθηκεύτηκε (${report.storage.backend})${report.storage.imagesSaved?' με εικόνες.':' χωρίς εικόνες· οι μετρήσεις διατηρήθηκαν.'}`;
  if(!report.storage&&!report.storageUnavailable)return 'Αναφορά προηγούμενης έκδοσης.';
  const reasons=report.storage?.errors?.map(e=>e.name).filter((x,i,a)=>a.indexOf(x)===i).join(', ')||'δεν καταγράφηκε η αιτία στην προηγούμενη έκδοση';
  return `Δεν αποθηκεύτηκε: ${reasons}. Η αναφορά παραμένει εδώ· χρησιμοποίησε ΛΗΨΗ JSON.`;
 }
 function result(){
  panel.classList.remove('is-running','is-minimal');panel.querySelector('#benchmark-choices').hidden=false;panel.querySelector('#benchmark-run-controls').hidden=true;panel.querySelector('#benchmark-actions').hidden=false;
  const body=panel.querySelector('#benchmark-results');body.replaceChildren();
  addText(body,`Έκδοση ${report.version} · ${report.mode==='manual'?'Ελεύθερο παιχνίδι':'Αυτόματη δοκιμή'} · ${report.outcome==='complete'?'ολοκληρώθηκε':'μερική αναφορά: '+report.reason} · ${report.device?.viewport?.join(' × ')||'—'} px`);
  addText(body,`Έτοιμο σε ${fmt(report.loading?.benchmarkToReadyMs/1000)} s · ${fmt(report.loading?.receivedBytes/1048576)} MiB ανάγνωσης (${fmt((report.loading?.cacheReadBytes||0)/1048576)} από cache).`);
  const gpu=report.gpuTiming;addText(body,gpu?.supported?`GPU: ${gpu.samples} έγκυρα δείγματα, ${gpu.discarded} απορρίφθηκαν. Ασύγχρονος χρονισμός των εντολών rendering.`:`GPU: ${gpu?.reason||'Η παλιά έκδοση δεν έλεγχε την υποστήριξη χρονισμού.'}`);
  const mem=report.memory?.at(-1);if(mem){addText(body,`Πόροι γραφικών ≈ ${fmt(mem.knownResourceBytes/1048576)} MiB · εκτίμηση, όχι πραγματική VRAM.`);addText(body,mem.note);}
  table(body,report.scenes);
  if(report.byRoom?.length){addText(body,'Απόδοση ανά δωμάτιο','h3');table(body,report.byRoom);}
  addText(body,'Κάλυψη που καταγράφηκε','h3');
  addText(body,'Δωμάτια: '+(Object.keys(report.coverage?.rooms||{}).join(', ')||'δεν καταγράφηκαν'));
  addText(body,Object.entries(labels).map(([id,label])=>`${label}: ${report.coverage?.actions?.[id]||0}`).join(' · '));
  addText(body,`${report.errors.length} σφάλματα · ${(report.issues||[]).length} σημειωμένα προβλήματα. Η κάλυψη δεν σημαίνει ότι κάθε οπτικό ή λογικό σφάλμα ανιχνεύτηκε.`);
  for(const issue of report.issues||[]){addText(body,`${fmt(issue.at/1000)} s · ${issue.state?.room||'—'} · ${issue.label}`);for(const frame of issue.captures?.length?issue.captures:[issue])if(frame.image){const im=document.createElement('img');im.src=frame.image;im.alt=`${issue.label} · ${fmt(frame.at/1000)} s`;body.append(im);}}
  for(const s of report.scenes.filter(s=>s.image)){const im=document.createElement('img');im.src=s.image;im.alt=s.label||s.type;im.width=320;body.append(im);}
  addText(body,'Τα πρώτα 2 δευτερόλεπτα περιλαμβάνονται και αναλύονται χωριστά. Χρόνοι καρέ: διαστήματα υποβολής rendering, όχι χρόνος εμφάνισης στην οθόνη. Τα CPU τμήματα δεν καλύπτουν όλη τη δουλειά του browser.');
  status(storageMessage());
 }
 async function finish(reason){
  if(!started||completed||finishing)return;finishing=true;running=false;completed=true;suspend();sceneResult(!!reason);
  status('Ολοκλήρωση μετρήσεων…');longTaskObserver?.disconnect();
  // Let pending GPU results become available without blocking rendering or
  // assigning a late result to the next scenario.
  if(timer)for(let i=0;i<4;i++){await new Promise(r=>setTimeout(r,20));timer.poll();}
  for(const {record,rows:samples} of sceneRows){record.summary=phaseSummary(samples).all;record.windows=phaseSummary(samples);}
  report.byRoom=Object.keys(report.coverage.rooms).map(room=>({type:room,label:room,summary:frameSummary(allRows.filter(r=>r.room===room&&r.active))}));
  report.loading=loadingReport();report.finishedAt=new Date().toISOString();report.outcome=reason?'partial':'complete';report.reason=reason||null;report.device=device();
  if(timer){timer.dispose();report.gpuTiming={...timer.status};}
  await checkpointPromise;report.storage=await storage.save(report);result();finishing=false;
 }
 function next(){
  current=mode==='manual'?{type:'free',label:'Ελεύθερο παιχνίδι',seconds:300}:benchmarkScenes[index];rows=[];lastPresented=null;lastSample=0;lastMemory=0;lastRoom=null;lastEngine=null;lastFiring=false;lastShield=false;
  const begin=performance.now(),random=Math.random;let seed=821;
  try{Math.random=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);setup(current.type);}finally{Math.random=random;}
  setupMs=performance.now()-begin;phaseStart=performance.now();stamp=phaseStart;report.scenePopulation=device();
  status(`${pass+1}/2 · ${current.label}`);
 }
 async function begin(selected){
  if(started){const url=new URL(location.href);url.searchParams.set('benchmarkMode',selected);url.searchParams.set('benchmarkStart','1');location.assign(url.href);return;}
  started=true;mode=selected;
  report={schema:2,version,mode,createdAt:new Date().toISOString(),startedMs:performance.now(),setupSeed:821,conditions:mode==='manual'?'Ελεύθερο παιχνίδι έως 5 λεπτά. Κανονικές είσοδοι, AI, φυσική, ικανότητες και μηχανή. Πρόοδος παιχνιδιού μόνο στη μνήμη.':'Δύο περάσματα 8 σεναρίων (~3 λεπτά). Πρώτα 2 s και σταθερό διάστημα χωριστά, χωρίς απόρριψη καρέ. Ελεγχόμενη τοποθέτηση μεταξύ δωματίων, κανονική κίνηση/AI/φυσική/ικανότητες. Ανθεκτικοί χαρακτήρες. Η μηχανή ξεκινά φορτισμένη, η είσοδος/χρήση/έξοδος προσομοιώνονται από το κανονικό σύστημα. Πρόοδος δεν αποθηκεύεται.',scenes:[],errors:[],events:[],issues:[],memory:[],timeline:[],coverage:{rooms:{},actions:{}},device:null,loading:null};
  panel.querySelector('#benchmark-choices').hidden=true;panel.querySelector('#benchmark-results').replaceChildren();panel.querySelector('#benchmark-actions').hidden=true;status('Φόρτωση παιχνιδιού…');
  await boot();if(completed)return;if(!readyAt){finish('αποτυχία φόρτωσης');return;}
  panel.classList.add('is-running','is-minimal');panel.querySelector('#benchmark-run-controls').hidden=false;running=true;lastCheckpoint=performance.now();next();
  if(globalThis.PerformanceObserver?.supportedEntryTypes?.includes('longtask')){longTaskObserver=new PerformanceObserver(list=>{for(const e of list.getEntries())report.events.push({name:'longtask',at:e.startTime-report.startedMs,duration:e.duration});});longTaskObserver.observe({entryTypes:['longtask']});report.longTasks='supported';}else report.longTasks='unsupported';
 }
 function markIssue(){
  if(!running)return;const state=sample();pendingIssue={label:'Σημειωμένο οπτικό ή λειτουργικό πρόβλημα',at:performance.now()-report.startedMs,state,captures:[],recentFrames:allRows.slice(-120)};report.issues.push(pendingIssue);event('user_issue',{room:state.room});
  // Marking/capture is deliberately logged; its overhead is not silently removed.
  panel.querySelector('#benchmark-issue').textContent='ΣΗΜΕΙΩΘΗΚΕ';setTimeout(()=>{if(panel)panel.querySelector('#benchmark-issue').textContent='ΣΗΜΕΙΩΣΗ';},1000);
 }
 function mount(){
  panel=document.createElement('section');panel.id='benchmark-panel';panel.setAttribute('aria-label','Έλεγχος απόδοσης MAGIC');
  panel.innerHTML=`<div class="benchmark-card"><header><strong>MAGIC · BENCHMARK</strong><button id="benchmark-menu">ΚΕΝΤΡΙΚΟ ΜΕΝΟΥ</button></header><p id="benchmark-status" role="status">Μέτρηση σε αυτή τη συσκευή</p><div id="benchmark-choices"><p>Αυτόματα: αυλή, πρώτη προσέγγιση, ικανότητες μάγου, Βιβλιοθήκη, Σιδηρουργείο, Άδυτο και μηχανή. Δύο περάσματα, περίπου 3 λεπτά.</p><p>Ελεύθερα: παίξε έως 5 λεπτά. Εξερεύνησε δωμάτια, χρησιμοποίησε όλες τις ικανότητες και τη μηχανή. Η αναφορά καταγράφει μόνο όσα έκανες. Η πρόοδος του παιχνιδιού δεν αποθηκεύεται.</p><div class="benchmark-buttons"><button id="benchmark-begin">ΑΥΤΟΜΑΤΗ ΔΟΚΙΜΗ</button><button id="benchmark-manual">ΠΑΙΖΩ ΚΑΙ ΚΑΤΑΓΡΑΦΩ</button></div></div><p id="benchmark-loading"></p><div id="benchmark-run-controls" hidden><button id="benchmark-expand" aria-label="Εμφάνιση λεπτομερειών μέτρησης">● <span id="benchmark-fps">REC</span></button><button id="benchmark-issue">ΣΗΜΕΙΩΣΗ</button><button id="benchmark-stop" aria-label="Τέλος καταγραφής">■ ΤΕΛΟΣ</button></div><div id="benchmark-results"></div><div id="benchmark-actions" class="benchmark-buttons" hidden><button id="benchmark-copy">ΑΝΤΙΓΡΑΦΗ</button><button id="benchmark-download">ΛΗΨΗ JSON</button><button id="benchmark-share">ΚΟΙΝΟΠΟΙΗΣΗ</button></div><p id="benchmark-feedback" role="status"></p></div>`;document.body.append(panel);
  const on=(id,fn)=>panel.querySelector('#'+id).onclick=fn;
  on('benchmark-menu',async()=>{if(running)await finish('επιστροφή στο μενού');const url=new URL(location.href);for(const k of ['benchmark','benchmarkStart','benchmarkMode'])url.searchParams.delete(k);location.assign(url.href);});
  on('benchmark-begin',()=>begin('auto'));on('benchmark-manual',()=>begin('manual'));on('benchmark-stop',()=>finish(mode==='manual'?null:'διακοπή από τον χρήστη'));on('benchmark-issue',markIssue);on('benchmark-expand',()=>panel.classList.toggle('is-minimal'));
  const textReport=()=>JSON.stringify(compactReport(report),null,2);
  on('benchmark-copy',async()=>{try{await navigator.clipboard.writeText(textReport());feedback('Αντιγράφηκε.');}catch{feedback('Χρησιμοποίησε ΛΗΨΗ JSON.');}});
  const downloadFile=()=>{const href=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=href;a.download=`magic-benchmark-${report.version}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(href),1000);};
  on('benchmark-download',downloadFile);on('benchmark-share',async()=>{try{if(navigator.share)await navigator.share({title:'MAGIC benchmark',text:textReport()});else downloadFile();}catch(e){feedback(e.name==='AbortError'?'Η κοινοποίηση ακυρώθηκε.':'Χρησιμοποίησε ΛΗΨΗ JSON.');}});
  storage.load().then(saved=>{if(saved&&!started){report=saved;result();}});
  const url=new URL(location.href);if(url.searchParams.get('benchmarkStart')==='1'){const selected=url.searchParams.get('benchmarkMode')==='manual'?'manual':'auto';url.searchParams.delete('benchmarkStart');history.replaceState(null,'',url);queueMicrotask(()=>begin(selected));}
 }
 const api={stage,downloadProgress,event,ready:()=>{readyAt=performance.now();loadingSnapshot=loadingReport();},get report(){return report;},get running(){return running;},get manual(){return running&&mode==='manual';},get automatic(){return running&&mode==='auto';},
  error:error=>{if(report&&started&&!completed){report.errors.push({at:performance.now()-report.startedMs,name:error?.name||'Error',message:String(error?.message||error)});finish('σφάλμα παιχνιδιού');}},
  beginFrame(phase='playing'){if(!running)return;const active=phase==='playing';if(active!==activeFrame)event(active?'resume':'pause');activeFrame=active;stamp=performance.now();cpu={};if(mode==='auto'&&active)step(current.type,Math.max(0,(stamp-phaseStart)/1000));},
  actionState({engine,firing,shielding}){if(!running)return;if(engine!==lastEngine){if(engine==='piloted')event('engine_board');if(engine==='exiting')event('engine_exit');lastEngine=engine;}if(firing&&!lastFiring)event('engine_fire');if(shielding&&!lastShield)event('shield');lastFiring=!!firing;lastShield=!!shielding;},
  mark(name){if(!running)return;const now=performance.now();cpu[name]=(cpu[name]||0)+now-stamp;stamp=now;},
  beginRender(renderer){if(!running)return;timer ||= createGpuTimer(renderer.getContext());timer.begin();},
  endFrame(renderer){
   if(!running)return;api.mark('render');const now=performance.now(),elapsed=now-phaseStart;
   frameRow={at:now-report.startedMs,elapsed,active:activeFrame,interval:lastPresented===null?elapsed:now-lastPresented,cpu:{...cpu},calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,room:lastRoom};timer?.end(frameRow);
   // First frame includes readiness after setup; setup itself is separately timed.
   rows.push(frameRow);allRows.push(frameRow);lastPresented=now;
   if(now-lastSample>500){lastSample=now;const state=sample();lastRoom=state.room;frameRow.room=lastRoom;report.timeline.push({at:frameRow.at,...state});report.coverage.rooms[lastRoom]=(report.coverage.rooms[lastRoom]||0)+1;
    if(!state.valid)api.error(new Error('Μη έγκυρη θέση χαρακτήρα/μηχανής'));
    if(state.phase==='result')finish('ολοκλήρωση ή ήττα παιχνιδιού');
   }
   if(now-lastMemory>5000){lastMemory=now;const begin=performance.now();report.memory.push({at:frameRow.at,...memory(),measurementCpuMs:performance.now()-begin});}
   if(now-lastCheckpoint>15000&&!checkpointBusy){lastCheckpoint=now;checkpointBusy=true;
    const partial={...compactReport(report),finishedAt:new Date().toISOString(),outcome:'partial',reason:'ανακτήθηκε η τελευταία καταγραφή μετά από διακοπή',device:device(),loading:loadingReport(),scenes:[...report.scenes.map(({image,...s})=>s),{type:current.type,label:current.label,pass:pass+1,partial:true,summary:phaseSummary(rows).all,windows:phaseSummary(rows)}]};
    checkpointPromise=storage.save(partial).then(()=>{}).finally(()=>{checkpointBusy=false;});
   }
   if(pendingIssue&&now-(pendingIssue.captures.at(-1)?.captureAt??0)>=80){const start=performance.now(),image=capture();pendingIssue.captures.push({at:frameRow.at,captureAt:now,image,cpuMs:performance.now()-start});pendingIssue.image ||= image;if(pendingIssue.captures.length===5)pendingIssue=null;}
   if(now-lastUI>500){lastUI=now;panel.querySelector('#benchmark-fps').textContent=fmt(frameSummary(rows.slice(-60))?.fps,0)+' FPS';status(`${mode==='auto'?`${pass+1}/2 · `:''}${current.label} · ${lastRoom||''} · ${Math.floor(elapsed/1000)} s`);}
   if(elapsed>=current.seconds*1000){if(mode==='manual'){finish();return;}sceneResult();index++;if(index===benchmarkScenes.length){pass++;index=0;}if(pass===2)finish();else next();}
  },loadingReport};
 if(benchmarkMode){mount();document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)finish('η καρτέλα πέρασε στο παρασκήνιο');});window.addEventListener('error',e=>api.error(e.error||e.message));window.addEventListener('unhandledrejection',e=>api.error(e.reason));document.getElementById('game-canvas')?.addEventListener('webglcontextlost',()=>api.error(new Error('WebGL context lost')));}
 window.__MAGIC_PERFORMANCE__=api;return api;
}
