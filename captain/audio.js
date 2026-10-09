import {readVoices} from "./voice-store140.js?v=140";
// Sea and engine effects plus real vocal recordings. No TTS.
// Call start() directly from the Play / sound-button gesture (also on iOS).
export function createAudio() {
  let context = null;
  let enabled = true;
  let active = false;
  let initialized = false;
  let master, engineBus, windGain, rainGain, seaGain, alarmGain;
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
    source.connect(hp); hp.connect(lp); lp.connect(gain); gain.connect(master);
    source.start(0, offset);
    return { source, gain, filter: lp };
  }
  function build() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;
    context = new AudioContext({ latencyHint: 'interactive' });
    master = context.createGain(); master.gain.value = 0;
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18; compressor.knee.value = 18;
    compressor.ratio.value = 3; compressor.attack.value = .008; compressor.release.value = .22;
    master.connect(compressor); compressor.connect(context.destination);
    whiteNoise = makeNoise();
    engineBus = context.createGain(); engineBus.gain.value = .03; engineBus.connect(master);
    engineLow = oscillator('sine', 31, .70, engineBus);
    engineMid = oscillator('triangle', 62, .28, engineBus);
    engineHigh = oscillator('sine', 124, .075, engineBus);
    const wind = ambientNoise(85, 950, .03, .13);
    windGain = wind.gain; windFilter = wind.filter;
    rainGain = ambientNoise(1700, 7600, .012, 1.13).gain;
    seaGain = ambientNoise(28, 250, .09, 2.21).gain;
    const swell = context.createOscillator(); swell.frequency.value = .117;
    const swellDepth = context.createGain(); swellDepth.gain.value = .025;
    swell.connect(swellDepth); swellDepth.connect(seaGain.gain); swell.start();
    alarmGain = context.createGain(); alarmGain.gain.value = 0; alarmGain.connect(master);
    alarm = oscillator('sine', 720, 1, alarmGain);
    initialized = true;
    return true;
  }
  async function start() {
    if (typeof window === 'undefined') return false;
    active = true;
    if (!enabled) return false;
    try {
      if (!initialized && !build()) return false;
      // Resume is initiated synchronously while the browser still sees a gesture.
      const resume = context.state === 'suspended' ? context.resume() : Promise.resolve();
      await resume;loadVoices();
      ramp(master.gain, .68, .3);
      nextCry = context.currentTime + 10;
      return true;
    } catch (_) { return false; }
  }
  function setEnabled(value) {
    enabled = Boolean(value);
    if (context) {
      ramp(master.gain, enabled && active ? .68 : 0, .09);
      if (enabled && active && context.state === 'suspended') context.resume().catch(() => {});
    }
    if (!enabled) {
      
      currentUtterance = null;
    }
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
    source.connect(filter); filter.connect(gain); gain.connect(master);
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
    source.connect(gain); gain.connect(master); source.start(now); source.stop(now + duration + .04);
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
  // No synthetic fallback: missing Greek performances remain captions.
  const voiceBuffers=new Map(),effectBuffers=new Map();let voiceLoad=null,voiceSource=null,voicePriority=-1,voicePlayed=0,voiceFailures=0,lastHuman=-100,lastKind=null;
  function speak(){return false;}
  function stopVoice(){const old=voiceSource;voiceSource=null;voicePriority=-1;try{old?.stop();}catch{}}
  async function loadVoices(force=false){
   if(!context)return false;if(voiceLoad&&!force)return voiceLoad;
   voiceLoad=(async()=>{
    try{const clips=await readVoices();for(const clip of clips){try{voiceBuffers.set(clip.id,await context.decodeAudioData(await clip.blob.arrayBuffer()));}catch{voiceFailures++;}}}catch{}
    await Promise.all(['scream','hiccup'].map(async id=>{if(effectBuffers.has(id))return;try{const r=await fetch(new URL('./assets/human140/'+id+'.mp3',import.meta.url));if(!r.ok)throw Error('Missing human sound');effectBuffers.set(id,await context.decodeAudioData(await r.arrayBuffer()));}catch{voiceFailures++;}}));return true;
   })();return voiceLoad;
  }
  function voice(id,{priority=1,pan=0}={}){
   if(!canPlay())return false;let buffer=voiceBuffers.get(id),kind='recorded-dialogue';
   if(!buffer){
    const fear=['panic','brace','water'].includes(id),hiccup=/^captain[3-6]$/.test(id);
    if(!fear&&!hiccup)return false;
    if(context.currentTime-lastHuman<(fear?5:14))return false;
    buffer=effectBuffers.get(fear?'scream':'hiccup');kind='human-nonverbal';
   }
   if(!buffer||voiceSource&&priority<=voicePriority)return false;stopVoice();
   const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffer;gain.gain.value=kind==='recorded-dialogue'?.92:.54;
   const spatial=context.createStereoPanner?context.createStereoPanner():null;
   if(spatial){spatial.pan.value=clamp(pan,-.65,.65);source.connect(spatial);spatial.connect(gain);}else source.connect(gain);
   gain.connect(master);voiceSource=source;voicePriority=priority;voicePlayed++;lastKind=kind;if(kind==='human-nonverbal')lastHuman=context.currentTime;liveEffects.add(source);
   source.onended=()=>{if(voiceSource===source){voiceSource=null;voicePriority=-1;}liveEffects.delete(source);source.disconnect();spatial?.disconnect();gain.disconnect();};source.start();return buffer.duration;
  }
  const voiceStatus=()=>({engine:'human-recordings-only',dialogueLoaded:voiceBuffers.size,effectsLoaded:effectBuffers.size,loaded:voiceBuffers.size+effectBuffers.size,failed:voiceFailures,played:voicePlayed,active:!!voiceSource,lastKind,missingGreekDialogue:voiceBuffers.size===0});
  if(typeof window!=='undefined'){window.addEventListener('focus',()=>{if(context){voiceBuffers.clear();loadVoices(true);}});try{const changes=new BroadcastChannel('last-call-voices');changes.onmessage=()=>{if(context){voiceBuffers.clear();loadVoices(true);}};}catch{}}
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
    ramp(engineHigh.frequency, 116 + speed * 92, .5);
    ramp(engineBus.gain, playing ? .028 + speed * .105 : .009, .65);
    const duck=voiceSource?.buffer ? .3 : 1;
    const gust = .8 + .2 * Math.sin(now * .23) + .08 * Math.sin(now * .071);
    ramp(windFilter.frequency, 650 + storm * 1600 + gust * 190, .65);
    ramp(windGain.gain, (playing ? .095 + storm * .15 : .025) * gust * duck, .8);
    ramp(rainGain.gain, (playing ? .016 + storm * .057 : .006)*duck, .8);
    ramp(seaGain.gain, (playing ? .13 + storm * .14 : .025)*duck, .85);
    const warning = playing && (panic > 83 || numeric(state.damage) > 62);
    const pulse = warning && now % 2.1 < .16;
    ramp(alarmGain.gain, pulse ? .016 : 0, .015);
  }

  function stop() {
    active = false;stopVoice();
    if (context) ramp(master.gain, 0, .18);
    for (const source of liveEffects) { try { source.stop(); } catch (_) {} }
    liveEffects.clear();
    
    currentUtterance = null;
  }
  return { start, setEnabled, get enabled() { return enabled; }, update, horn, collision, thunder, speak, voice, loadVoices, stopVoice, voiceStatus, stop };
}
