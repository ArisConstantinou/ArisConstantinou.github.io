import {frameSummary} from './performance-metrics.js';
import './performance-test.css';
export const benchmarkMode=typeof location!=='undefined'&&new URL(location.href).searchParams.get('benchmark')==='1';
const key='magic-device-benchmark-v1',names={idle:'Αυλή · ηρεμία',turn:'Αυλή · περιστροφή κάμερας',crowd:'Μάχη · 18 εχθροί'};
const fmt=(n,d=1)=>Number.isFinite(n)?n.toFixed(d):'—';
const seconds=n=>fmt(Number.isFinite(n)?n/1000:null);
export function createPerformanceTest({version,boot,setup,step,suspend,device}){
 let panel,started=false,running=false,completed=false,current=null,pass=0,index=0,phaseStart=0,lastPresented=null,lastUI=0,stamp=0,cpu={},rows=[],report=null,readyAt=null,download={received:0},stages=[],generation=0,loadingSnapshot=null,setupMs=0;
 const types=['idle','turn','crowd'];
 const stage=label=>{if(stages.at(-1)?.label!==label)stages.push({ms:performance.now(),label});if(panel&&started&&!running)status(label);};
 const status=text=>{const el=panel?.querySelector('#benchmark-status');if(el)el.textContent=text;};
 function downloadProgress(event){download=event;if(panel&&started&&!running){const el=panel.querySelector('#benchmark-loading');if(el)el.textContent=`${fmt(event.received/1048576)} MiB (${fmt((event.cachedBytes||0)/1048576)} από cache) · ${event.active||0} αρχεία σε ανάγνωση / προετοιμασία`;}}
 function loadingReport(){if(loadingSnapshot)return loadingSnapshot;const resources=performance.getEntriesByType('resource').filter(r=>!r.name.startsWith('blob:')&&!r.name.startsWith('data:')).map(r=>({file:r.name.split('/').slice(-2).join('/'),start:r.startTime,end:r.responseEnd,duration:r.duration,transfer:r.transferSize,decoded:r.decodedBodySize,encoded:r.encodedBodySize,workerStart:r.workerStart}));const last=Math.max(0,...resources.map(r=>r.end));return {navigationToReadyMs:readyAt,benchmarkToReadyMs:readyAt&&report?readyAt-report.startedMs:null,receivedBytes:download.received||0,cacheReadBytes:download.cachedBytes||0,stages:[...stages],resources,afterLastResponseMs:readyAt?Math.max(0,readyAt-last):null,cacheNote:'transfer=0 μπορεί να είναι cache ή service worker. Οι χρόνοι δικτύου περιλαμβάνουν μόνο ό,τι εκθέτει ο browser.'};}
 function persist(){try{localStorage.setItem(key,JSON.stringify(report));return true;}catch{report.storageUnavailable=true;return false;}}
 function close(){generation++;running=false;suspend();const url=new URL(location.href);url.searchParams.delete('benchmark');location.assign(url.href);}
 function result(){
  panel.classList.remove('is-running');panel.querySelector('#benchmark-begin').hidden=false;panel.querySelector('#benchmark-begin').textContent='ΝΕΑ ΜΕΤΡΗΣΗ';panel.querySelector('#benchmark-stop').hidden=true;panel.querySelector('#benchmark-actions').hidden=false;
  const body=panel.querySelector('#benchmark-results');body.replaceChildren();
  const title=document.createElement('p');title.textContent=`Έκδοση ${report.version} · ${report.outcome==='complete'?'Ολοκληρώθηκαν 6 σενάρια': 'Μερική αναφορά: '+report.reason} · ${report.device?.viewport?.join(' × ')||'—'} px`;body.append(title);
  const load=document.createElement('p');load.textContent=`Φόρτωση έως έτοιμο: ${seconds(report.loading?.benchmarkToReadyMs)} s · ${fmt(report.loading?.receivedBytes/1048576)} MiB · μετά την τελευταία απόκριση αρχείου: ${seconds(report.loading?.afterLastResponseMs)} s`;body.append(load);
  const table=document.createElement('table');table.innerHTML='<thead><tr><th>Σενάριο</th><th>FPS</th><th>Ελάχ.</th><th>P95 ms</th><th>Μέγ. ms</th><th>Κολλήματα ≥50 ms</th><th>Draw calls</th><th>CPU γραφικών P95</th></tr></thead><tbody></tbody>';
  for(const r of report.scenes){const tr=document.createElement('tr');for(const text of [`${r.pass} · ${names[r.type]}`,fmt(r.summary?.fps),fmt(r.summary?.minInstantFPS),fmt(r.summary?.frames.p95),fmt(r.summary?.frames.max),String(r.summary?.frames.over50||0),fmt(r.summary?.drawCalls.mean,0),fmt(r.summary?.cpu.render?.p95)+' ms']){const td=document.createElement('td');td.textContent=text;tr.append(td);}table.tBodies[0].append(tr);}
  const wrap=document.createElement('div');wrap.className='benchmark-table';wrap.append(table);body.append(wrap);
  const note=document.createElement('p');note.textContent='Το ελάχιστο FPS είναι το αντίστροφο του πιο αργού καρέ. Η αναφορά περιέχει χρόνους CPU, υποβολής γραφικών, draw calls, φόρτωση και σφάλματα. Δεν μετρά VRAM ή χρόνο GPU.';body.append(note);
  for(const s of report.scenes.filter(s=>s.image)){const im=document.createElement('img');im.src=s.image;im.alt=`${s.pass} · ${names[s.type]}`;im.width=320;body.append(im);}
  status(report.storageUnavailable?'Η αποθήκευση δεν είναι διαθέσιμη · εξάγαγε την αναφορά πριν κλείσεις τη σελίδα.':report.outcome==='complete'?'Η μέτρηση αποθηκεύτηκε στη συσκευή.':'Η μέτρηση σταμάτησε · τα διαθέσιμα στοιχεία διατηρήθηκαν.');
 }
 function finish(reason){
  if(!started||completed)return;completed=true;running=false;generation++;suspend();
  if(rows.length&&current)report.scenes.push({type:current,pass:pass+1,partial:true,setupMs,summary:frameSummary(rows)});
  report.loading=loadingReport();report.finishedAt=new Date().toISOString();report.outcome=reason?'partial':'complete';report.reason=reason||null;report.device=device();const saved=persist();result();if(!readyAt&&saved)location.reload();
 }
 function capture(){const start=performance.now();try{const source=document.getElementById('game-canvas'),c=document.createElement('canvas');c.width=480;c.height=Math.round(source.height/source.width*480);c.getContext('2d').drawImage(source,0,0,c.width,c.height);return{image:c.toDataURL('image/jpeg',.65),captureMs:performance.now()-start};}catch(e){return{captureError:e.message,captureMs:performance.now()-start};}}
 function next(){
  current=types[index];rows=[];lastPresented=null;
  const beginSetup=performance.now(),random=Math.random;let seed=821;
  // Only the synchronous benchmark fixture is seeded; normal play keeps its RNG.
  try{Math.random=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);setup(current);}finally{Math.random=random;}
  setupMs=performance.now()-beginSetup;report.setupSeed=821;report.scenePopulation=device();phaseStart=performance.now();stamp=phaseStart;status(`Πέρασμα ${pass+1}/2 · ${names[current]}`);
 }
 async function begin(){
  if(started){location.reload();return;}started=true;completed=false;const own=++generation;
  report={schema:1,version,createdAt:new Date().toISOString(),startedMs:performance.now(),conditions:'Δύο περάσματα: 2 s προθέρμανση + 8 s ανά σενάριο, πραγματικό requestAnimationFrame. Ελεγχόμενη αυλή, στροφή κάμερας και μεταφορά 18 υπαρχόντων εχθρών γύρω από τον παίκτη. Κανονική AI/φυσική· ανθεκτικός παίκτης/εχθροί για συγκρίσιμη μάχη. Η πρόοδος παιχνιδιού δεν αποθηκεύεται.',scenes:[],errors:[],events:[],device:null,loading:null};
  panel.querySelector('#benchmark-begin').hidden=true;panel.querySelector('#benchmark-stop').hidden=false;panel.querySelector('#benchmark-results').replaceChildren();status('Φόρτωση του παιχνιδιού…');
  await boot();if(own!==generation||completed)return;if(!readyAt){finish('αποτυχία φόρτωσης');return;}
  panel.classList.add('is-running');running=true;pass=0;index=0;next();
 }
 function mount(){
  panel=document.createElement('section');panel.id='benchmark-panel';panel.setAttribute('aria-label','Έλεγχος απόδοσης MAGIC');panel.innerHTML=`<div class="benchmark-card"><header><strong>MAGIC · BENCHMARK</strong><button id="benchmark-menu">ΚΕΝΤΡΙΚΟ ΜΕΝΟΥ</button></header><p id="benchmark-status" role="status">Μέτρηση σε αυτή τη συσκευή</p><p class="benchmark-intro">Αυτόματη δοκιμή φόρτωσης, κάμερας και μάχης με 18 εχθρούς. Δύο περάσματα, περίπου ένα λεπτό μετά τη φόρτωση. Η αναφορά μένει στη συσκευή σου.</p><p id="benchmark-loading"></p><div class="benchmark-buttons"><button id="benchmark-begin">ΕΝΑΡΞΗ BENCHMARK</button><button id="benchmark-stop" hidden>ΔΙΑΚΟΠΗ</button></div><div id="benchmark-results"></div><div id="benchmark-actions" class="benchmark-buttons" hidden><button id="benchmark-copy">ΑΝΤΙΓΡΑΦΗ</button><button id="benchmark-download">ΛΗΨΗ JSON</button><button id="benchmark-share">ΚΟΙΝΟΠΟΙΗΣΗ</button></div><p id="benchmark-feedback" role="status"></p></div>`;document.body.append(panel);
  const on=(id,fn)=>panel.querySelector('#'+id).onclick=fn;on('benchmark-menu',close);on('benchmark-begin',begin);on('benchmark-stop',()=>finish('διακοπή από τον χρήστη'));
  const feedback=t=>panel.querySelector('#benchmark-feedback').textContent=t;
  const textReport=()=>JSON.stringify({...report,scenes:report.scenes.map(({image,...s})=>s)},null,2);
  on('benchmark-copy',async()=>{try{await navigator.clipboard.writeText(textReport());feedback('Αντιγράφηκε η αναφορά.');}catch{feedback('Η αντιγραφή δεν επιτρέπεται. Χρησιμοποίησε «ΛΗΨΗ JSON».');}});
  const downloadFile=()=>{const href=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=href;a.download=`magic-benchmark-${version}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(href),1000);};on('benchmark-download',downloadFile);
  on('benchmark-share',async()=>{try{if(navigator.share)await navigator.share({title:'MAGIC benchmark',text:textReport()});else{downloadFile();feedback('Το αρχείο είναι έτοιμο για κοινοποίηση.');}}catch(e){feedback(e.name==='AbortError'?'Η κοινοποίηση ακυρώθηκε.':'Χρησιμοποίησε «ΛΗΨΗ JSON».');}});
  try{const saved=JSON.parse(localStorage.getItem(key));if(saved?.schema===1){report=saved;result();}}catch{}
 }
 if(benchmarkMode)mount();
 const api={stage,downloadProgress,ready:()=>{readyAt=performance.now();loadingSnapshot=loadingReport();},get report(){return report;},get running(){return running;},error:error=>{if(report&&started){report.errors.push({ms:performance.now(),message:String(error?.message||error)});finish('σφάλμα παιχνιδιού');}},
  beginFrame(){if(!running)return;stamp=performance.now();cpu={};step(current,Math.max(0,(stamp-phaseStart)/1000));},
  mark(name){if(!running)return;const now=performance.now();cpu[name]=(cpu[name]||0)+now-stamp;stamp=now;},
  endFrame(renderer){if(!running)return;api.mark('render');const now=performance.now(),elapsed=now-phaseStart;if(lastPresented!==null&&elapsed>=2000)rows.push({at:now-report.startedMs,interval:now-lastPresented,cpu:{...cpu},calls:renderer.info.render.calls,triangles:renderer.info.render.triangles});lastPresented=now;
   if(now-lastUI>500){lastUI=now;status(`Πέρασμα ${pass+1}/2 · ${names[current]} · ${elapsed<2000?'προθέρμανση':fmt(frameSummary(rows.slice(-60))?.fps)+' FPS'}`);}
   if(elapsed>=10000){report.scenes.push({type:current,pass:pass+1,setupMs,summary:frameSummary(rows),...capture()});rows=[];index++;if(index===types.length){pass++;index=0;}if(pass===2)finish();else next();}
  },loadingReport};
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!completed)finish('η καρτέλα πέρασε στο παρασκήνιο');});
 window.addEventListener('error',e=>api.error(e.error||e.message));window.addEventListener('unhandledrejection',e=>api.error(e.reason));
 window.__MAGIC_PERFORMANCE__=api;return api;
}
