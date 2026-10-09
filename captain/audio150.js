import {readVoices,VOICE_LINES} from "./voice-store140.js?v=140";
// Audio 1.5: bundled Greek MP3 dialogue, optional human overrides, and effects.
// The included Greek lines are synthetic recordings, not human performances.
// Call start() directly from the Play / sound-button gesture (also on iOS).
export function createAudio() {
  let context = null;
  let enabled = true;
  let active = false;
  let initialized = false;
  let master, ambientBus, effectsBus, voiceBus, voiceMeter, outputMeter, engineBus, windGain, rainGain, seaGain, alarmGain;
  let windFilter, engineLow, engineMid, engineHigh, alarm;
  let whiteNoise = null;
  let currentUtterance = null;
  let lastHorn = -100, lastImpact = -100, nextCry = 12;
  let lastState = { playing: false, storm: .7, speed: 0, panic: 0 };

  const liveEffects = new Set();
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const numeric = (x, fallback = 0) => Number.isFinite(Number(x)) ? Number(x) : fallback;


  function ramp(param, value, seconds = .25) {
    if (!context || !param) return;
    param.setTargetAtTime(value, context.currentTime, seconds);
  }
  function makeNoise(seconds = 3.7) {
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * seconds), context.sampleRate);
    const samples = buffer.getChannelData(0);
    let seed = 19790529;
    for (let i = 0; i < samples.length; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
      samples[i] = ((seed >>> 0) / 4294967296) * 2 - 1;
    }
    return buffer;
  }
  function oscillator(type, frequency, level, bus) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = level;
    oscillator.connect(gain); gain.connect(bus); oscillator.start();
    return oscillator;
  }
  function ambientNoise(highpass, lowpass, volume, offset = 0) {
    const source = context.createBufferSource();
    source.buffer = whiteNoise; source.loop = true;
    const hp = context.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = highpass; hp.Q.value = .5;
    const lp = context.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = lowpass; lp.Q.value = .6;
    const gain = context.createGain(); gain.gain.value = volume;
    source.connect(hp); hp.connect(lp); lp.connect(gain); gain.connect(ambientBus);
    source.start(0, offset);
    return { source, gain, filter: lp };
  }
  function build() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;
    context = new AudioContext({ latencyHint: 'interactive' });
    master = context.createGain(); master.gain.value = 0;
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -6; compressor.knee.value = 6;
    compressor.ratio.value = 3; compressor.attack.value = .008; compressor.release.value = .22;
    master.connect(compressor);
    outputMeter=context.createAnalyser();outputMeter.fftSize=1024;compressor.connect(outputMeter);outputMeter.connect(context.destination);
    ambientBus=context.createGain();ambientBus.gain.value=volumes.environment;ambientBus.connect(master);
    effectsBus=context.createGain();effectsBus.gain.value=volumes.effects;effectsBus.connect(master);
    voiceBus=context.createGain();voiceBus.gain.value=volumes.voices;voiceMeter=context.createAnalyser();voiceMeter.fftSize=1024;voiceBus.connect(voiceMeter);voiceMeter.connect(master);
    context.addEventListener('statechange',()=>note('context',context.state));
    whiteNoise = makeNoise();
    engineBus = context.createGain(); engineBus.gain.value = .03; engineBus.connect(ambientBus);
    engineLow = oscillator('sine', 31, .70, engineBus);
    engineMid = oscillator('triangle', 62, .28, engineBus);
    engineHigh = oscillator('sine', 186, .12, engineBus);
    const wind = ambientNoise(85, 950, .03, .13);
    windGain = wind.gain; windFilter = wind.filter;
    rainGain = ambientNoise(1700, 7600, .012, 1.13).gain;
    seaGain = ambientNoise(28, 250, .09, 2.21).gain;
    const swell = context.createOscillator(); swell.frequency.value = .117;
    const swellDepth = context.createGain(); swellDepth.gain.value = .025;
    swell.connect(swellDepth); swellDepth.connect(seaGain.gain); swell.start();
    alarmGain = context.createGain(); alarmGain.gain.value = 0; alarmGain.connect(effectsBus);
    alarm = oscillator('sine', 720, 1, alarmGain);
    initialized = true;
    return true;
  }
  async function start() {
    if(typeof window==='undefined')return false;
    active=true;if(!enabled)return false;
    try{
      try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch{}
      if(!initialized&&!build())throw new Error('Web Audio unavailable');
      const resumed=context.state!=='running'?context.resume():Promise.resolve();
      const pulse=context.createBufferSource();pulse.buffer=context.createBuffer(1,1,context.sampleRate);pulse.connect(context.destination);pulse.start();pulse.onended=()=>pulse.disconnect();
      loadVoices();ramp(master.gain,.85,.08);
      await deadline(resumed,2000,'Touch the audio button to resume playback');
      failed.delete('start');pump();return context.state==='running';
    }catch(e){issue('start',e);return false;}
  }
  function setEnabled(value) {
    enabled=Boolean(value);
    if(!enabled)stopVoice();
    if(context){ramp(master.gain,enabled && active ? .85 : 0,.04);if(enabled)recover();}
  }
  function canPlay() { return Boolean(enabled && active && context && context.state === 'running'); }
  function oneShotNoise(duration, peak, lowpassStart, lowpassEnd, attack = .02) {
    if (!canPlay()) return;
    const now = context.currentTime;
    const source = context.createBufferSource(); source.buffer = whiteNoise; source.loop = true;
    const filter = context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.setValueAtTime(lowpassStart, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(20, lowpassEnd), now + duration);
    const gain = context.createGain(); gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(.001, peak), now + attack);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    source.connect(filter); filter.connect(gain); gain.connect(effectsBus);
    source.start(now, (now * .37) % 2); source.stop(now + duration + .03);
    liveEffects.add(source);
    source.onended = () => { liveEffects.delete(source); source.disconnect(); filter.disconnect(); gain.disconnect(); };
  }
  function tone(type, startFrequency, endFrequency, volume, duration, attack = .025) {
    if (!canPlay()) return;
    const now = context.currentTime;
    const source = context.createOscillator(); source.type = type;
    source.frequency.setValueAtTime(startFrequency, now);
    source.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + duration);
    const gain = context.createGain(); gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + attack);
    gain.gain.setValueAtTime(volume * .86, now + duration * .58);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    source.connect(gain); gain.connect(effectsBus); source.start(now); source.stop(now + duration + .04);
    liveEffects.add(source);
    source.onended = () => { liveEffects.delete(source); source.disconnect(); gain.disconnect(); };
  }
  function horn() {
    if (!canPlay() || context.currentTime - lastHorn < 1.85) return;
    lastHorn = context.currentTime;
    tone('triangle', 87.3, 85.0, .14, 2.0, .12);
    tone('sine', 130.8, 127.7, .10, 2.04, .17);
    tone('sine', 174.6, 170.0, .035, 1.98, .19);
    oneShotNoise(1.8, .027, 580, 200, .15);
  }
  function collision(strength = .8) {
    if (!canPlay() || context.currentTime - lastImpact < .24) return;
    lastImpact = context.currentTime;
    const amount = clamp(numeric(strength, .8), .25, 1.25);
    oneShotNoise(1.13, .36 * amount, 1700, 90, .008);
    tone('triangle', 92, 23, .19 * amount, .76, .01);
    tone('sine', 49, 25, .16 * amount, 1.35, .018);
  }
  function thunder() {
    if (!canPlay()) return;
    oneShotNoise(4.8, .36, 1900, 82, .034);
    oneShotNoise(3.2, .13, 480, 50, .22);
    tone('sine', 43, 24, .055, 3.4, .1);
  }
  // Spoken lines are always selected BEFORE nonverbal effects. Custom human
  // recordings override the bundled synthetic Greek MP3s, never the reverse.
  const IDS=Object.keys(VOICE_LINES), EFFECTS=['scream','hiccup'];
  const bundled=new Map(),recordings=new Map(),effectBuffers=new Map(),raw=new Map(),failed=new Map();
  const waiting=[],events=[];let voiceLoad=null,customLoading=null,currentVoice=null,voicePlayed=0;
  let loadFinished=false,loadEpoch=0,pumpTimer=null,nextHuman=10,session=0,lastClip=null;
  const volumes={voices:.95,environment:.7,effects:.85};
  try{const saved=JSON.parse(localStorage.getItem('lc-audio-mix150')||'{}');for(const key of Object.keys(volumes))if(Number.isFinite(saved[key]))volumes[key]=clamp(saved[key],0,1);}catch{}
  function note(type,id,detail=''){
    events.push({type,id,detail,time:Math.round(performance.now())});if(events.length>40)events.shift();
  }
  function issue(id,error){const message=String(error?.message||error);failed.set(id,message);note('error',id,message);}
  function deadline(promise,ms,label){return new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error(label)),ms);Promise.resolve(promise).then(v=>{clearTimeout(t);resolve(v);},e=>{clearTimeout(t);reject(e);});});}
  function urlFor(id){return new URL(`./assets/${EFFECTS.includes(id)?'human140':'voices130'}/${id}.mp3?audio=150`,import.meta.url);}
  function fetchClip(id,retry=false){
    if(raw.has(id)&&!retry)return raw.get(id);
    const promise=(async()=>{
      for(let attempt=0;attempt<2;attempt++){
        const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),8000);
        try{const r=await fetch(urlFor(id),{signal:ctrl.signal,cache:attempt||retry?'reload':'default'});if(!r.ok)throw new Error(`HTTP ${r.status}: ${id}`);const bytes=await r.arrayBuffer();if(bytes.byteLength<200)throw new Error(`Empty audio: ${id}`);return bytes;}
        catch(e){if(attempt===1)throw e;}finally{clearTimeout(timer);}
      }
    })();raw.set(id,promise);promise.catch(()=>{if(raw.get(id)===promise)raw.delete(id);});return promise;
  }
  function preload(){return Promise.allSettled([...IDS,...EFFECTS].map(id=>fetchClip(id)));}
  async function decode(bytes,id){
    const b=await deadline(context.decodeAudioData(bytes.slice(0)),8000,`Decode timeout: ${id}`);
    if(!Number.isFinite(b.duration)||b.duration<=.01||b.duration>30)throw new Error(`Invalid duration: ${id}`);
    const data=b.getChannelData(0);let peak=0;for(let i=0;i<data.length;i+=8)peak=Math.max(peak,Math.abs(data[i]));
    if(!Number.isFinite(peak)||peak<.0001)throw new Error(`Silent recording: ${id}`);
    return b;
  }
  function loadCustom(force=false){
    if(customLoading&&!force)return customLoading;
    const epoch=++loadEpoch;
    customLoading=(async()=>{
      try{
        // A blocked/private IndexedDB must NEVER block the included MP3s.
        const clips=await deadline(readVoices(),1800,'Local recordings storage unavailable');
        const replacements=new Map();
        await Promise.all(clips.filter(c=>IDS.includes(c.id)).map(async c=>{try{replacements.set(c.id,await decode(await c.blob.arrayBuffer(),c.id));}catch(e){issue('local:'+c.id,e);}}));
        if(epoch===loadEpoch){recordings.clear();for(const [id,b] of replacements)recordings.set(id,b);}
      }catch(e){note('optional-storage','local',String(e.message));}
    })();return customLoading;
  }
  async function loadVoices(force=false){
    if(!context)return false;if(voiceLoad&&!force)return voiceLoad;
    loadFinished=false;loadCustom(force);
    voiceLoad=Promise.allSettled([...IDS,...EFFECTS].map(async id=>{
      const target=EFFECTS.includes(id)?effectBuffers:bundled;
      if(target.has(id))return;
      try{target.set(id,await decode(await fetchClip(id,force),id));failed.delete(id);pump();}
      catch(e){issue(id,e);}
    })).then(()=>{loadFinished=true;pump();return bundled.size===IDS.length;});
    return voiceLoad;
  }
  function getClip(id){return recordings.has(id)?{buffer:recordings.get(id),kind:'human-recording'}:bundled.has(id)?{buffer:bundled.get(id),kind:'bundled-synthetic-Greek'}:null;}
  function endVoice(reason='stopped'){
    const old=currentVoice;currentVoice=null;
    if(old){note(reason,old.id);try{old.source.stop();}catch{}old.cleanup();}
  }
  function stopVoice(){waiting.length=0;clearTimeout(pumpTimer);pumpTimer=null;endVoice();}
  function schedulePump(){if(!pumpTimer&&waiting.length)pumpTimer=setTimeout(()=>{pumpTimer=null;pump();},120);}
  function playEntry(entry){
    const clip=getClip(entry.id);if(!clip||!canPlay())return false;
    try{
      const source=context.createBufferSource(),gain=context.createGain();source.buffer=clip.buffer;
      // No pitch/rate changes: do not damage pronunciation or call this acting.
      gain.gain.value=1;
      const spatial=context.createStereoPanner?context.createStereoPanner():null;
      if(spatial){spatial.pan.value=clamp(numeric(entry.pan,0),-.6,.6);source.connect(spatial);spatial.connect(gain);}else source.connect(gain);
      gain.connect(voiceBus);
      const record={...entry,source,kind:clip.kind,cleanup:()=>{source.disconnect();spatial?.disconnect();gain.disconnect();liveEffects.delete(source);}};
      source.onended=()=>{record.cleanup();if(currentVoice===record){currentVoice=null;note('ended',entry.id);pump();}};
      source.start();currentVoice=record;liveEffects.add(source);voicePlayed++;lastClip={id:entry.id,kind:clip.kind};note('started',entry.id,clip.kind);
      return clip.buffer.duration;
    }catch(e){issue(entry.id,e);return false;}
  }
  function pump(){
    if(!enabled||!active){waiting.length=0;return;}
    for(let i=waiting.length-1;i>=0;i--)if(waiting[i].expires<Date.now()){note('expired',waiting[i].id);waiting.splice(i,1);}
    if(currentVoice||!canPlay()){schedulePump();return;}
    waiting.sort((a,b)=>b.priority-a.priority||a.order-b.order);
    const i=waiting.findIndex(e=>getClip(e.id));
    if(i>=0)playEntry(waiting.splice(i,1)[0]);
    schedulePump();
  }
  function voice(id,{priority=1,pan=0}={}){
    if(!IDS.includes(id)||!enabled||!active)return false;
    if(currentVoice?.id===id||waiting.some(e=>e.id===id))return false;
    const entry={id,priority:numeric(priority,1),pan:numeric(pan,0),order:performance.now(),expires:Date.now()+12000};
    if(currentVoice&&entry.priority>currentVoice.priority&&entry.priority>=3)endVoice('interrupted');
    const clip=getClip(id);
    if(!currentVoice&&clip&&canPlay())return playEntry(entry);
    if(waiting.length>=4){const low=waiting.findIndex(e=>e.priority<entry.priority);if(low<0)return false;waiting.splice(low,1);}
    waiting.push(entry);note('queued',id);if(!voiceLoad)loadVoices();schedulePump();
    return clip?.buffer.duration||3.5;
  }
  function speak(text,urgent=false){
    // Legacy end-of-voyage callers map to files; no browser TTS dependency.
    const found=IDS.find(id=>VOICE_LINES[id][0]===text);
    return voice(found||(/Φτάσαμε|ασφαλές/.test(text)?'safe':'water'),{priority:urgent?3:1});
  }
  function vocalEffect(id){
    if(!canPlay()||currentVoice||waiting.length||!effectBuffers.has(id))return false;
    try{const source=context.createBufferSource(),g=context.createGain();source.buffer=effectBuffers.get(id);g.gain.value=.52;source.connect(g);g.connect(effectsBus);source.start();liveEffects.add(source);note('effect',id);source.onended=()=>{liveEffects.delete(source);source.disconnect();g.disconnect();};return source.buffer.duration;}catch(e){issue(id,e);return false;}
  }
  function levels(analyser){
    if(!analyser)return {rms:0,peak:0};const data=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(data);let sum=0,peak=0;for(const x of data){sum+=x*x;peak=Math.max(peak,Math.abs(x));}return {rms:Math.sqrt(sum/data.length),peak};
  }
  function setVolume(key,value){
    if(!Object.hasOwn(volumes,key))return;volumes[key]=clamp(numeric(value,.7),0,1);
    try{localStorage.setItem('lc-audio-mix150',JSON.stringify(volumes));}catch{}
    if(context){ramp(voiceBus.gain,volumes.voices,.03);ramp(effectsBus.gain,volumes.effects,.03);ramp(ambientBus.gain,volumes.environment,.1);}
  }
  function recover(){
    if(!enabled||!active||!context||context.state==='running')return;
    try{context.resume().then(()=>{note('resumed','context');pump();}).catch(e=>issue('resume',e));}catch(e){issue('resume',e);}
  }
  const voiceStatus=()=>({version:'1.5.0',engine:'MP3-WebAudio',contextState:context?.state||'not-started',enabled,active,
    loading:!!voiceLoad&&!loadFinished,dialogueLoaded:recordings.size,preRenderedGreekLoaded:bundled.size,effectsLoaded:effectBuffers.size,
    loaded:bundled.size+effectBuffers.size,expected:20,failed:failed.size,errors:Object.fromEntries(failed),played:voicePlayed,
    speaking:currentVoice?.id||null,lastClip,queued:waiting.map(e=>e.id),volumes:{...volumes},signal:{voice:levels(voiceMeter),output:levels(outputMeter)},history:events.slice(-16)});
  if(typeof window!=='undefined'){
    window.addEventListener('pointerup',recover,{passive:true});window.addEventListener('keydown',recover,{passive:true});
    window.addEventListener('focus',()=>{recover();if(context)loadCustom(true);});
    try{const c=new BroadcastChannel('last-call-voices');c.onmessage=()=>{if(context)loadCustom(true);};}catch{}
  }
  function update(state = {}) {
    lastState = state;
    if (!initialized || !context) return;
    const now = context.currentTime;
    const playing = state.playing !== false && active;
    const speed = clamp(Math.abs(numeric(state.speed)) / 15, 0, 1.4);
    const storm = clamp(numeric(state.storm, .7), 0, 1.4);
    const panic = clamp(numeric(state.panic), 0, 100);
    ramp(engineLow.frequency, 29 + speed * 23, .5);
    ramp(engineMid.frequency, 58 + speed * 46.5, .5);
    ramp(engineHigh.frequency, 186 + speed * 92, .5);
    ramp(engineBus.gain, playing ? .04 + speed * .11 : 0, .65);
    const duck=currentVoice ? .18 : 1;
    const gust = .8 + .2 * Math.sin(now * .23) + .08 * Math.sin(now * .071);
    ramp(windFilter.frequency, 650 + storm * 1600 + gust * 190, .65);
    ramp(windGain.gain, (playing ? .095 + storm * .15 : .025) * gust * duck, .8);
    ramp(rainGain.gain, (playing ? .016 + storm * .057 : .006)*duck, .8);
    ramp(seaGain.gain, (playing ? .13 + storm * .14 : .025)*duck, .85);
    if(playing&&now>nextHuman&&!currentVoice&&!waiting.length){
      if(panic>76)vocalEffect('scream');else if(numeric(state.intox)>70)vocalEffect('hiccup');
      nextHuman=now+18;
    }
    const warning = playing && (panic > 83 || numeric(state.damage) > 62);
    const pulse = warning && now % 2.1 < .16;
    ramp(alarmGain.gain, pulse ? .016 : 0, .015);
  }

  function stop() {
    active = false;session++;stopVoice();
    if (context) ramp(master.gain, 0, .18);
    for (const source of liveEffects) { try { source.stop(); } catch (_) {} }
    liveEffects.clear();
    
    currentUtterance = null;
  }
  return { start, setEnabled, get enabled() { return enabled; }, update, horn, collision, thunder, speak, voice, loadVoices, stopVoice, voiceStatus, preload, setVolume, vocalEffect, recover, stop };
}
