from pathlib import Path
import hashlib,json
P=Path('captain')
def sha(p):
 b=p.read_bytes();return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
EXPECTED={'audio.js':'40d01de0539b62e52457b4c885adc4e31321b01c','main.js':'c155866b1a6fb765f7b94ac0deca0ae19df9e99b','index.html':'0e437e6e425ab2de96f5e62bc3cfd162f21964b5','sw.js':'be80c1c67ed3c4c4798feee074b7323ec21ff8a1'}
if (P/'main150.js').exists():
 print('Already applied; test staged files without overwriting them.');raise SystemExit(0)
for name,h in EXPECTED.items():assert sha(P/name)==h,'Source changed: '+name
s=(P/'audio.js').read_text()
s=s.replace('// Sea and engine effects plus real vocal recordings. No TTS.','// Audio 1.5: bundled Greek MP3 dialogue, optional human overrides, and effects.\n// The included Greek lines are synthetic recordings, not human performances.')
s=s.replace('let master, engineBus, windGain, rainGain, seaGain, alarmGain;','let master, ambientBus, effectsBus, voiceBus, voiceMeter, outputMeter, engineBus, windGain, rainGain, seaGain, alarmGain;')
s=s.replace('gain.connect(master);\n    source.start(0, offset);','gain.connect(ambientBus);\n    source.start(0, offset);')
s=s.replace('compressor.threshold.value = -18; compressor.knee.value = 18;','compressor.threshold.value = -6; compressor.knee.value = 6;')
s=s.replace('master.connect(compressor); compressor.connect(context.destination);',"""master.connect(compressor);
    outputMeter=context.createAnalyser();outputMeter.fftSize=1024;compressor.connect(outputMeter);outputMeter.connect(context.destination);
    ambientBus=context.createGain();ambientBus.gain.value=volumes.environment;ambientBus.connect(master);
    effectsBus=context.createGain();effectsBus.gain.value=volumes.effects;effectsBus.connect(master);
    voiceBus=context.createGain();voiceBus.gain.value=volumes.voices;voiceMeter=context.createAnalyser();voiceMeter.fftSize=1024;voiceBus.connect(voiceMeter);voiceMeter.connect(master);
    context.addEventListener('statechange',()=>note('context',context.state));""")
s=s.replace('engineBus.connect(master)','engineBus.connect(ambientBus)').replace('alarmGain.connect(master)','alarmGain.connect(effectsBus)').replace("oscillator('sine', 124, .075","oscillator('sine', 186, .12")
a=s.index('  async function start()');b=s.index('  function canPlay()',a)
s=s[:a]+"""  async function start() {
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
"""+s[b:]
s=s.replace('gain.connect(master);','gain.connect(effectsBus);')
a=s.index('  // No synthetic fallback:');b=s.index('  function update(state',a)
s=s[:a]+(P/'tools/voice-engine150.txt').read_text()+s[b:]
s=s.replace('116 + speed * 92','186 + speed * 92').replace('const duck=voiceSource?.buffer ? .3 : 1;','const duck=currentVoice ? .18 : 1;').replace('playing ? .028 + speed * .105 : .009','playing ? .04 + speed * .11 : 0')
s=s.replace('    const warning = playing',"""    if(playing&&now>nextHuman&&!currentVoice&&!waiting.length){
      if(panic>76)vocalEffect('scream');else if(numeric(state.intox)>70)vocalEffect('hiccup');
      nextHuman=now+18;
    }
    const warning = playing""")
s=s.replace('active = false;stopVoice();','active = false;session++;stopVoice();').replace('voiceStatus, stop };','voiceStatus, preload, setVolume, vocalEffect, recover, stop };')
(P/'audio150.js').write_text(s)
s=(P/'main.js').read_text().replace("'./audio.js?v=142'","'./audio150.js?v=150'").replace("'./dialogue130.js?v=140'","'./dialogue150.js?v=150'")
s="import { installSoundPanel } from './sound-panel150.js?v=150';\n"+s
s=s.replace("  $('sound').style.opacity=soundEnabled?'1':'.45';", "  $('sound').style.opacity=soundEnabled?'1':'.45';$('sound').setAttribute('aria-label',soundEnabled?'Σίγαση ήχου':'Ενεργοποίηση ήχου');$('sound').querySelector('span').textContent=soundEnabled?'ΗΧΟΣ ✓':'ΣΙΓΑΣΗ';")
s=s.replace('  const audioReady=audio.start();audio.setEnabled(soundEnabled);','  audio.setEnabled(soundEnabled);const audioReady=audio.start();')
s=s.replace('  Promise.resolve(audioReady).then(()=>audio.loadVoices()).catch(()=>{});', "  const thisVoyage=state;Promise.resolve(audioReady).then(()=>audio.loadVoices()).then(()=>{if(state===thisVoyage&&playing&&!paused&&soundEnabled)dialogue.say('calm',state,undefined,1);}).catch(()=>{});")
needle="dialogue=createDialogue({hud:$('hud'),audio,camera,ship,getPeople:()=>people,getView:()=>cameraMode});"
assert needle in s
s=s.replace(needle,needle+"\n    installSoundPanel({audio,enable:()=>{soundEnabled=true;saveStore('lc-sound',true);audio.setEnabled(true);updateSettings();}});audio.preload();$('releaseBadge').textContent='v1.5.0';")
s=s.replace("version:'1.4.0'","version:'1.5.0'")
s=s.replace("      say:id=>dialogue.say(id,state),", "      audio:()=>audio, say:id=>dialogue.say(id,state),")
(P/'main150.js').write_text(s)
s=(P/'dialogue130.js').read_text()
s=s.replace("const p=projectPoint(speaker),played=audio.voice(id,{priority,pan:clamp(p.x,-.6,.6)}),duration=played||3.5;", "const p=speaker?projectPoint(speaker):{x:0},played=audio.voice(id,{priority,pan:Number.isFinite(p.x)?clamp(p.x,-.6,.6):0}),duration=played||3.5;")
(P/'dialogue150.js').write_text(s)
s=(P/'index.html').read_text().replace('src="./main.js?v=142"','src="./main150.js?v=150"').replace('name="captain-build" content="1.4.0"','name="captain-build" content="1.5.0"')
(P/'index.html').write_text(s)
(P/'release.json').write_text(json.dumps({'version':'1.5.0','controls':'Unchanged direct-wheel 1.4 controls','audio':'Bundled Greek MP3 speech before human nonverbal effects; custom human overrides; independent loading; measured signal diagnostics. Included Greek speech is synthetic.'},ensure_ascii=False,indent=2)+'\n')
s=(P/'sw.js').read_text().replace("VERSION='142',CACHE='last-call-1.4.2'","VERSION='150',CACHE='last-call-1.5.0'")
s=s.replace("'main.js',","'main150.js','sound-panel150.js','audio150.js','dialogue150.js',")
s=s.replace("immutable=u.searchParams.get('v')===VERSION||/\\/(assets|vendor)\\//.test(u.pathname)","immutable=/\\/(assets|vendor)\\//.test(u.pathname)")
(P/'sw.js').write_text(s)
print('Applied sound-only 1.5 release; wheel files unchanged.')
