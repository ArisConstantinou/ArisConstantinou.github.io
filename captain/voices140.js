import {VOICE_LINES,readVoices,saveVoice,removeVoice} from './voice-store140.js?v=140';
const $=id=>document.getElementById(id),entries=new Map();let active=null,currentAudio=null;
const status=t=>$('status').textContent=t;
async function validAudio(blob){if(blob.size>12*1024*1024)throw new Error('Όριο 12 MB ανά ατάκα.');const C=window.AudioContext||window.webkitAudioContext,c=new C();try{const b=await c.decodeAudioData(await blob.arrayBuffer());if(b.duration>.01&&b.duration<=25)return;throw new Error('Χρησιμοποίησε απόσπασμα έως 25 δευτερόλεπτα.');}finally{await c.close();}}
function stop(){if(active?.recorder.state==='recording')active.recorder.stop();}
async function refresh(){const data=await readVoices();for(const [id,e] of entries){e.clip=data.find(c=>c.id===id);e.done.textContent=e.clip?'✓ Αποθηκευμένη ηχογράφηση':'Δεν υπάρχει ακόμη ηχογράφηση';e.play.disabled=e.del.disabled=!e.clip;}status(`${data.length} / ${Object.keys(VOICE_LINES).length} ατάκες έτοιμες. Παίζουν αυτόματα στο παιχνίδι στον ίδιο browser.`);}
async function record(id,e){
 if(active){stop();return;}
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){status('Δεν υποστηρίζεται ηχογράφηση εδώ. Χρησιμοποίησε «Αρχείο».');return;}
 e.rec.disabled=true;let stream;
 try{
  stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true},video:false});
  const mime=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'].find(v=>MediaRecorder.isTypeSupported(v));
  const recorder=new MediaRecorder(stream,mime?{mimeType:mime}:{}),chunks=[];
  const session={recorder,stream,timer:null};active=session;e.rec.textContent='■ Σταμάτησε';e.rec.classList.add('recording');e.rec.disabled=false;
  recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data);};
  recorder.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());clearTimeout(session.timer);active=null;e.rec.textContent='Ηχογράφηση';e.rec.classList.remove('recording');try{const blob=new Blob(chunks,{type:recorder.mimeType});await validAudio(blob);await saveVoice(id,blob,'microphone-recording');await refresh();}catch(err){status(err.message||'Δεν αποθηκεύτηκε η ηχογράφηση.');}};
  recorder.onerror=()=>{stream.getTracks().forEach(t=>t.stop());clearTimeout(session.timer);active=null;e.rec.textContent='Ηχογράφηση';e.rec.classList.remove('recording');status('Η ηχογράφηση διακόπηκε. Δοκίμασε ξανά.');};
  recorder.start();session.timer=setTimeout(stop,20000);status('Γράφει… Πάτησε «Σταμάτησε» όταν τελειώσεις.');
 }catch(err){stream?.getTracks().forEach(t=>t.stop());status(err.name==='NotAllowedError'?'Δεν δόθηκε άδεια στο μικρόφωνο. Μπορείς να εισαγάγεις αρχείο.':err.message);}finally{e.rec.disabled=false;}
}
for(const [id,[text,role]] of Object.entries(VOICE_LINES)){
 const row=document.createElement('section');row.className='row';row.innerHTML='<span class="role"></span><h2></h2><div class="buttons"><button class="record">Ηχογράφηση</button><button class="play" disabled>▶ Άκου</button><label class="file">Αρχείο<input type="file" accept="audio/*,.m4a,.mp3,.wav,.ogg,.webm"></label><button class="delete" disabled>Διαγραφή</button></div><p class="done"></p>';
 row.querySelector('.role').textContent=role;row.querySelector('h2').textContent=text;$('lines').append(row);
 const e={rec:row.querySelector('.record'),play:row.querySelector('.play'),del:row.querySelector('.delete'),done:row.querySelector('.done')};entries.set(id,e);
 e.rec.onclick=()=>record(id,e);e.play.onclick=()=>{currentAudio?.pause();const u=URL.createObjectURL(e.clip.blob);currentAudio=new Audio(u);currentAudio.onended=()=>URL.revokeObjectURL(u);currentAudio.play().catch(()=>status('Πάτησε ξανά για ακρόαση.'));};
 row.querySelector('input').onchange=async event=>{const f=event.target.files[0];if(!f)return;try{await validAudio(f);await saveVoice(id,f);await refresh();}catch(err){status(err.message);}event.target.value='';};
 e.del.onclick=async()=>{if(confirm('Να διαγραφεί αυτή η ηχογράφηση από τη συσκευή;')){await removeVoice(id);await refresh();}};
}
$('export').onclick=async()=>{try{const clips=[];for(const c of await readVoices()){const bytes=new Uint8Array(await c.blob.arrayBuffer());let str='';for(let i=0;i<bytes.length;i+=8192)str+=String.fromCharCode(...bytes.subarray(i,i+8192));clips.push({id:c.id,mime:c.blob.type,base64:btoa(str)});}const url=URL.createObjectURL(new Blob([JSON.stringify({format:'last-call-human-voices-1',clips})],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='last-call-greek-voices.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);}catch(err){status(err.message);}};
$('import').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>40*1024*1024)throw new Error('Μέγιστο αντίγραφο: 40 MB.');const pack=JSON.parse(await f.text());if(pack.format!=='last-call-human-voices-1'||!Array.isArray(pack.clips)||pack.clips.length>18)throw new Error('Δεν είναι έγκυρο αντίγραφο LAST CALL.');for(const c of pack.clips){if(!Object.hasOwn(VOICE_LINES,c.id)||typeof c.base64!=='string')throw new Error('Μη έγκυρη ατάκα.');const raw=atob(c.base64),data=Uint8Array.from(raw,ch=>ch.charCodeAt(0)),blob=new Blob([data],{type:c.mime});await validAudio(blob);await saveVoice(c.id,blob);}await refresh();}catch(err){status(err.message);}e.target.value='';};
window.addEventListener('pagehide',()=>{stop();active?.stream.getTracks().forEach(t=>t.stop());});document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});refresh().catch(()=>status('Δεν είναι διαθέσιμη η τοπική αποθήκευση σε αυτόν τον browser.'));
