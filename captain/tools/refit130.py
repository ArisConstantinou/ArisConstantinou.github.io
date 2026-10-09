"""Apply reviewed source edits only after validating the original Captain files.
New UI modules and voice clips are already staged, but become active only when
this refit passes browser checks and the verified working tree is committed.
"""
from pathlib import Path
import hashlib,re,tempfile,shutil
P=Path('captain');O=Path(tempfile.mkdtemp(prefix='captain-original-'))
EXPECTED={'audio.js':'599527801bec24bc258cd6993f3685ac4e601c1c90e43a54537986ae974eafa3','index.html':'f18d9835ca1a5fe63629660eec9085c95e7ae0cef95f3bea68c7679cdb7e0888','main.js':'469df9732bc19fd2e7cedbccfdbe321a5f92c729d69c7ff26b9689736325644b','passengers.js':'24621e592c139ca447eda010ab735351d8a5a27de592dd7b092fdeaba51ebf67','ship.js':'e715f9c41fe0399c7c026200c088a2c26e6aee7269da83bd57b80a6ec0fad7f2','simulation.js':'b89f9f24432627403be74215bc619a5184e6ce18b02f58c3f3b1e3c735f5fcaf','sw.js':'5b56b88cf65a370d844a8560d062d7d3ecf320973422bd0fc20e9afed1417f24'}
for name,want in EXPECTED.items():
 data=(P/name).read_bytes()
 if hashlib.sha256(data).hexdigest()!=want:raise RuntimeError('Captain changed since review: '+name)
 (O/name).write_bytes(data)
def replace(s,a,b):
 if a not in s:raise RuntimeError('Missing source anchor: '+a[:100])
 return s.replace(a,b,1)
s=(O/'main.js').read_text()
s=replace(s,"import { createAudio } from './audio.js';","import { createAudio } from './audio.js';\nimport { createHelm } from './helm130.js';\nimport { createDialogue } from './dialogue130.js';")
s=replace(s,'let renderer,world,ship,fx,renderTarget,scene,camera,audio;','let renderer,world,ship,fx,renderTarget,scene,camera,audio,helm,dialogue;\nlet renderedFrames=0;')
s=replace(s,'  if(speak)audio?.speak(message,urgent);','  // Radio narration is visual only; character clips are scheduled separately.')
s=replace(s,'    audio?.collision();','    audio?.collision();dialogue?.impact(state,event.obstacle);')
s=replace(s,"  if(event.type==='jump'){\n    state.panic","  if(event.type==='jump'){\n    dialogue?.overboard(state,event.id);\n    state.panic")
s=replace(s,'  people.reset();ship.group.position','  helm?.reset();dialogue?.reset();setThrottle(.55);\n  people.reset();ship.group.position')
s=replace(s,'  Promise.resolve(audioReady).then(()=>{if(playing&&!paused)audio.speak(briefing,true);});','  Promise.resolve(audioReady).then(()=>audio.loadVoices()).catch(()=>{});')
s=replace(s,"toast(mobile?'Στρίψε με τα βέλη. Μηχανές δεξιά. Πάτησε ◉ για να δεις ολόκληρο το πλοίο.'","toast(mobile?'Κράτα τα βέλη του τιμονιού και σύρε. Μοχλός δεξιά: πάνω / μέση / κάτω.'")
s=replace(s,'  playing=false;paused=false;state.ended=true;state.won=won;','  playing=false;paused=false;state.ended=true;state.won=won;helm?.reset();dialogue?.reset();')
s=replace(s,'  paused=value;keys.clear();touchTurn.left=touchTurn.right=false;','  paused=value;keys.clear();touchTurn.left=touchTurn.right=false;helm?.reset();dialogue?.reset();drag=null;input.turn=0;')
s=replace(s,"function setThrottle(v){input.throttle=clamp(v,-.35,1);$('throttle').value=Math.round(input.throttle*100);$('bridgeThrottle').value=Math.round(input.throttle*100);}","function setThrottle(v){input.throttle=clamp(Number.isFinite(v)?v:0,-.35,1);$('throttle').value=Math.round(input.throttle*100);helm?.syncLever(input.throttle);}")
s=replace(s,"function syncCameraControls(){$('hud').classList.toggle('in-bridge',cameraMode===1);}","function syncCameraControls(){$('hud').classList.toggle('in-bridge',cameraMode===1);helm?.reset();drag=null;input.turn=0;}")
s=replace(s,'[cameraMode]);updateCamera(1,true);}','[cameraMode]);syncCameraControls();updateCamera(1,true);}')
a=s.index('let lastBanter=');b=s.index('function action(name)',a);s=s[:a]+s[b:]
s=replace(s,"if(name==='drink'){captainBanter();}","if(name==='drink'){dialogue?.drink(state);}")
s=replace(s,"if(name==='announce'){radioMessage(result.message,true);toast('Ανακοίνωση στο κατάστρωμα · μειώθηκε ο πανικός');}","if(name==='announce'){dialogue?.calm(state);toast('Το πλήρωμα καθησυχάζει τους επιβάτες');}")
s=replace(s,"radioMessage('Τους έχουμε! Συνεχίζουμε για το λιμάνι.',true);","dialogue?.rescued(state);")
a=s.index("  $('bridgeThrottle').addEventListener");b=s.index("  $('throttleDown').addEventListener",a);s=s[:a]+s[b:]
s=replace(s,'if(steerId===null)input.turn=','input.turn=helm?.turn ?? ')
s=replace(s,'{panic:state.panic,roll:state.roll,speed:state.speed,shipPosition:ship.group.position,heading:state.heading,playing:true,waterHeight:world.sampleHeight}','{panic:state.panic,danger:state.danger,roll:state.roll,speed:state.speed,shipPosition:ship.group.position,heading:state.heading,playing:true,waterHeight:world.sampleHeight}')
a=s.index('    if(state.nearest&&state.nearest.clearance');b=s.index('    if(!drag&&state.time-lastLook',a);s=s[:a]+'    dialogue?.update(state,dt);\n'+s[b:]
s=replace(s,'if(!drag&&state.time-lastLook>6)','if(!drag&&!helm?.busy&&state.time-lastLook>6)')
s=replace(s,"radioTime<0?'.2':'1'","radioTime<0?'0':'1'")
s=replace(s,'  updateCamera(dt);audio?.update','  updateCamera(dt);renderedFrames++;\n  helm?.update(cameraMode,wheelAnchor());dialogue?.project(state.time);\n  audio?.update')
s=replace(s,'audio=createAudio();audio.setEnabled(soundEnabled);setupControls();',"""audio=createAudio();audio.setEnabled(soundEnabled);setupControls();
    helm=createHelm({hud:$('hud'),setThrottle,getState:()=>({throttle:input.throttle,speed:state.speed,rudder:state.rudder}),canControl:()=>playing&&!paused,recenter:()=>{targetLookYaw=targetLookPitch=lookYaw=lookPitch=0;updateCamera(1,true);}});
    dialogue=createDialogue({hud:$('hud'),audio,camera,ship,getPeople:()=>people,getView:()=>cameraMode});""")
s=replace(s,'window.__lastCall={getState:()=>({ready,playing,paused,camera:cameraLabels[cameraMode],hull:state.hull,intox:state.intox,panic:state.panic,speed:state.speed,distance:state.distance,people:people.getStats(),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles})};',"""window.__lastCall={getState:()=>({version:'1.3.0',ready,playing,paused,camera:cameraLabels[cameraMode],frames:renderedFrames,time:state.time,hull:state.hull,intox:state.intox,panic:state.panic,speed:state.speed,rudder:state.rudder,throttle:input.throttle,turn:input.turn,heading:state.heading,x:state.x,z:state.z,collisions:state.collisions,danger:state.danger,distance:state.distance,people:people.getStats(),controls:helm.inspect(),dialogue:dialogue.inspect(),voices:audio.voiceStatus(),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles})};
    if(window.__CAPTAIN_TEST__||new URLSearchParams(location.search).has('test'))window.__lastCall.test={
      restart:startGame,
      setState:values=>{for(const k of ['x','z','heading','time','speed','intox','panic','hull'])if(Number.isFinite(values[k]))state[k]=values[k];},
      camera:mode=>{cameraMode=mode;syncCameraControls();targetLookYaw=targetLookPitch=lookYaw=lookPitch=0;updateCamera(1,true);},
      obstacles:()=>world.obstacles.map(o=>({x:o.x,z:o.z,radius:o.radius,id:o.id,type:o.type})),
      say:id=>dialogue.say(id,state),anchor:wheelAnchor,
      step:seconds=>{for(let i=0;i<seconds*60;i++)advance(state,1/60,input,world.obstacles,world.sampleHeight,world.safeHarbor,gameplayEvent);}
    };""")
s=replace(s,"navigator.serviceWorker.register('./sw.js').catch(()=>{});","navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{});")
s=replace(s,'function drawRadar(stats){',"""function wheelAnchor(){
 if(!ship?.wheel||!camera)return null;
 const center=ship.wheel.getWorldPosition(new THREE.Vector3()),rim=new THREE.Vector3(.54,0,0);ship.wheel.localToWorld(rim);
 const c=center.project(camera),r=rim.project(camera);
 return {x:(c.x*.5+.5)*innerWidth,y:(-.5*c.y+.5)*innerHeight,radius:Math.hypot((r.x-c.x)*innerWidth*.5,(r.y-c.y)*innerHeight*.5),visible:c.z>0&&c.z<1&&Math.abs(c.x)<1&&Math.abs(c.y)<1};
}
function drawRadar(stats){""")
for name in ['world','ship','passengers','audio','simulation','helm130','dialogue130']:s=s.replace("'./"+name+".js'","'./"+name+".js?v=130'")
(P/'main.js').write_text(s)
s=(O/'ship.js').read_text().replace('new THREE.Vector3(0,20.42,46.25)','new THREE.Vector3(0,20.48,45.55)');(P/'ship.js').write_text(s)
s=(O/'index.html').read_text();s=re.sub(r'<div id="bridgeControls".*?<div class="controls-bottom">','<div class="controls-bottom">',s,flags=re.S)
s=s.replace('href="./style.css"','href="./style.css?v=130"').replace('<script type="importmap">','<link rel="stylesheet" href="./helm130.css?v=130">\n<link rel="stylesheet" href="./dialogue130.css?v=130">\n<meta name="captain-build" content="1.3.0">\n<script type="importmap">').replace('src="./main.js"','src="./main.js?v=130"')
s=s.replace('Σύρε την οθόνη για να κοιτάξεις γύρω.','Σύρε την οθόνη για να κοιτάξεις γύρω. Στη γέφυρα κράτα τα βέλη γύρω από το τιμόνι και σύρε. Έξω χρησιμοποίησε το μικρό pad αριστερά. Ο μοχλός δεξιά έχει κράτει στη μέση και παραμένει στη θέση που τον αφήνεις.')
(P/'index.html').write_text(s)
s=(O/'simulation.js').read_text().replace('lastWarning:0,focus:0,score:0','lastWarning:0,focus:0,score:0,danger:null')
s=replace(s,'    const settle=s.focus>0?.43:s.speed<6?.115:.045;','    const anticipation=(s.danger?.risk||0)*(1.6+Math.abs(s.speed)*.12);\n    const settle=s.focus>0?.43:Math.abs(s.speed)<6?.115:.045;')
s=replace(s,'motionPanic+drinkPanic+speedPanic-settle','motionPanic+drinkPanic+speedPanic+anticipation-settle')
s=replace(s,'  s.nearest=nearest;','  s.danger=predictDanger(s,obstacles);\n  s.nearest=s.danger||nearest;')
s+='''\n// Predict swept-hull danger, including astern travel; ignore rocks behind us.
export function predictDanger(s,obstacles){
 const speed=Math.abs(s.speed),sign=s.speed<-.15?-1:1;if(speed<.6)return null;
 const fx=Math.sin(s.heading)*sign,fz=Math.cos(s.heading)*sign;let best=null;
 for(const o of obstacles){const dx=o.x-s.x,dz=o.z-s.z,forward=dx*fx+dz*fz,lateral=Math.abs(dx*fz-dz*fx),r=o.radius+16,reach=sign>0?62:55;
  if(forward<=0||lateral>r)continue;
  const clearance=forward-Math.sqrt(Math.max(0,r*r-lateral*lateral))-reach,tti=Math.max(0,clearance)/speed;
  if(clearance>Math.max(140,speed*20)||tti>23)continue;
  const risk=clamp(1-tti/23,0,1);if(!best||tti<best.tti)best={...o,clearance,tti,risk,astern:sign<0};
 }return best;
}
''';(P/'simulation.js').write_text(s)
s=(O/'passengers.js').read_text();s=replace(s,'id: i, group, model, mixer, actions, bones, gestureBones,','id: i, group, model, mixer, actions, bones, gestureBones, isCrew,\n      seenAt:null,alertUntil:0,reactKind:null,personalPanic:0,')
s=replace(s,'    p.waterAge = 0;\n    p.group.visible = true;','    p.waterAge = 0;p.seenAt=null;p.alertUntil=0;p.personalPanic=0;\n    p.group.visible = true;')
s=replace(s,'      const onDeck = p.status',"""      const danger=lastState.danger;
      if(active&&danger?.risk>.04){if(p.seenAt===null)p.seenAt=time;}else p.seenAt=null;
      const noticed=p.seenAt!==null&&time-p.seenAt>(p.isCrew?.15:.4+(p.id%5)*.19);
      const personalPanic=Math.max(panic,noticed?danger.risk*92:0);p.personalPanic=personalPanic;
      if(noticed&&p.wait>0)p.wait=Math.min(p.wait,.25);
      const onDeck = p.status""")
s=s.replace('pickTarget(p, panic);','pickTarget(p, personalPanic);').replace("panic > 48 && p.status !== 'rescued'","personalPanic > 48 && p.status !== 'rescued'").replace('clamp((panic - 42) / 48, 0, 1)','clamp((personalPanic - 35) / 48, 0, 1)')
s=replace(s,'      if (afloat || alarm > 0.03) {',"""      if(onDeck&&noticed&&danger&&time<p.alertUntil){p.group.updateWorldMatrix(true,true);const direction=p.group.worldToLocal(new THREE.Vector3(danger.x,p.group.getWorldPosition(new THREE.Vector3()).y+2,danger.z)).normalize();aimArm(p,'right',direction,.7);}
      if (afloat || alarm > 0.03) {""")
s=replace(s,'  return { update, reset, getStats, jumpOne, rescueNear, ready: true };',"""  function getSpeakers(){return people.map(p=>({id:p.id,group:p.group,height:p.height,crew:p.isCrew,status:p.status,panic:p.personalPanic}));}
  function react(id,kind='warning',duration=3){const p=people.find(p=>p.id===id);if(p){p.alertUntil=lastTime+duration;p.reactKind=kind;p.wait=0;}}
  return {update,reset,getStats,getSpeakers,react,jumpOne,rescueNear,ready:true};""");(P/'passengers.js').write_text(s)
s=(O/'audio.js').read_text();a=s.index('      if (!speechPrimed && synth()');b=s.index('      await resume;',a);s=s[:a]+s[b:]
a=s.index('  function speak(text, urgent = false)');b=s.index('  function update(state = {})',a)
s=s[:a]+'''  // Short pre-rendered voice assets replace browser speech synthesis.
  const voiceIds=['rock','ice','brace','rail','panic','jackets','water','safe','rescued','captain1','captain2','captain3','captain4','captain5','captain6','reply','calm','hum'];
  const voiceBuffers=new Map();let voiceLoad=null,voiceSource=null,voicePriority=-1,voicePlayed=0,voiceFailures=0;
  const voiceBase=new URL('./assets/voices130/',import.meta.url);
  function speak(){return false;}
  function stopVoice(){const old=voiceSource;voiceSource=null;voicePriority=-1;try{old?.stop();}catch{}}
  async function loadVoices(){
   if(!context)return false;if(voiceLoad)return voiceLoad;
   voiceLoad=Promise.all(voiceIds.map(async id=>{try{const r=await fetch(new URL(id+'.mp3',voiceBase));if(!r.ok)throw new Error('Voice unavailable');const bytes=await r.arrayBuffer(),buffer=await context.decodeAudioData(bytes);voiceBuffers.set(id,buffer);}catch{voiceFailures++;}})).then(()=>voiceBuffers.size>0);return voiceLoad;
  }
  function voice(id,{priority=1,pan=0}={}){
   if(!canPlay())return false;const buffer=voiceBuffers.get(id);if(!buffer)return false;if(voiceSource&&priority<=voicePriority)return false;stopVoice();
   const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffer;gain.gain.value=.92;const spatial=context.createStereoPanner?context.createStereoPanner():null;
   if(spatial){spatial.pan.value=clamp(pan,-.65,.65);source.connect(spatial);spatial.connect(gain);}else source.connect(gain);
   gain.connect(master);voiceSource=source;voicePriority=priority;voicePlayed++;liveEffects.add(source);
   source.onended=()=>{if(voiceSource===source){voiceSource=null;voicePriority=-1;}liveEffects.delete(source);source.disconnect();spatial?.disconnect();gain.disconnect();};source.start();return buffer.duration;
  }
  const voiceStatus=()=>({engine:'prerendered-neural',loaded:voiceBuffers.size,failed:voiceFailures,played:voicePlayed,active:!!voiceSource});
'''+s[b:]
a=s.index('    if (playing && panic > 43');b=s.index('\n  function stop()',a);s=s[:a]+'  }\n'+s[b:]
s=s.replace('      await resume;','      await resume;loadVoices();').replace('    const gust = .8','    const duck=voiceSource?.buffer ? .3 : 1;\n    const gust = .8')
s=s.replace('(playing ? .095 + storm * .15 : .025) * gust','(playing ? .095 + storm * .15 : .025) * gust * duck').replace('playing ? .016 + storm * .057 : .006','(playing ? .016 + storm * .057 : .006)*duck').replace('playing ? .13 + storm * .14 : .025','(playing ? .13 + storm * .14 : .025)*duck')
s=s.replace('    active = false;\n    if (context)','    active = false;stopVoice();\n    if (context)').replace('update, horn, collision, thunder, speak, stop };','update, horn, collision, thunder, speak, voice, loadVoices, stopVoice, voiceStatus, stop };')
(P/'audio.js').write_text(s)
(P/'sw.js').write_text('''const VERSION='130',CACHE='last-call-1.3.0',ROOT=new URL('./',self.location);
const CORE=['index.html','style.css','helm130.css','dialogue130.css','main.js','simulation.js','world.js','ship.js','passengers.js','audio.js','helm130.js','dialogue130.js','icon.svg','manifest.webmanifest','credits.html','vendor/three.module.js','vendor/three.core.js','vendor/addons/loaders/GLTFLoader.js','vendor/addons/utils/SkeletonUtils.js','vendor/addons/utils/BufferGeometryUtils.js'];
const versioned=p=>/\\.(js|css)$/.test(p)&&!p.startsWith('vendor/')?p+'?v='+VERSION:p;
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await Promise.all(CORE.map(async path=>{const url=new URL(versioned(path),ROOT),r=await fetch(url,{cache:'reload'});if(!r.ok||r.redirected)throw new Error('Incomplete release '+path);await cache.put(url,r);}));await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('last-call-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==ROOT.origin||!u.pathname.startsWith(ROOT.pathname))return;event.respondWith((async()=>{const cache=await caches.open(CACHE),immutable=u.searchParams.get('v')===VERSION||/\\/(assets|vendor)\\//.test(u.pathname);if(immutable){const cached=await cache.match(event.request);if(cached)return cached;}try{const fresh=await fetch(event.request);if(fresh.ok&&!fresh.redirected)await cache.put(event.request,fresh.clone());return fresh;}catch{return await cache.match(event.request)||(event.request.mode==='navigate'?await cache.match(new URL('index.html',ROOT)):null)||Response.error();}})());});
''')
(P/'release.json').write_text('{"version":"1.3.0","controls":"projected-wheel-arrows-and-latched-neutral-centered-lever","voices":"18 original pre-rendered Greek synthetic clips","browserSpeechSynthesis":false,"referenceVideo":"A.M.A.N - Jack Daniels: title located, playback not accessible, no audio copied"}\n')
print('Reviewed Captain refit applied; publication still requires successful browser checks.')
