from pathlib import Path
import subprocess
P=Path('captain')
s=(P/'main150.js').read_text()
s=s.replace("import { installSoundPanel }", "import {createChaos} from './chaos180.js?v=180';\nimport { installSoundPanel }")
s=s.replace("'./audio150.js?v=150'", "'./audio180.js?v=180'")
s=s.replace('camera,audio,helm,dialogue,walk;', 'camera,audio,helm,dialogue,walk,chaos;')
s=s.replace('  if(!ready)return;\n', '  if(!ready)return;\n  chaos?.stop();\n',1)
s=s.replace('  if(!playing)return;\n  walk?.reset();playing=false;', '  if(!playing)return;\n  chaos?.stop();walk?.reset();playing=false;')
s=s.replace('paused=value;keys.clear();', 'paused=value;chaos?.resetInputs();keys.clear();')
s=s.replace('function cycleCamera(){', 'function cycleCamera(){if(chaos?.roaming)return;')
s=s.replace('  const result=useAction(state,name);', "  if(chaos?.enabled&&name==='drink'){chaos.drink();return;}\n  const result=useAction(state,name);")
s=s.replace('function updateCamera(dt,snap=false){', 'function updateCamera(dt,snap=false){\n  if(chaos?.roaming&&chaos.updateCamera(dt))return;')
s=s.replace('    if(walk?.active)return;', '    if(walk?.active||chaos?.roaming)return;')
s=s.replace('input.turn=walk?.active?0:', 'input.turn=(walk?.active||chaos?.roaming)?0:')
s=s.replace('!walk?.active&&(keys.has', '!walk?.active&&!chaos?.roaming&&(keys.has')
s=s.replace('advance(state,1/60,input,world.obstacles,', 'advance(state,1/60,input,chaos?.roaming?[]:world.obstacles,')
s=s.replace('    people?.update(state.time', '    if(!chaos?.enabled)people?.update(state.time')
s=s.replace('    dialogue?.update(state,dt);', '    if(!chaos?.enabled)dialogue?.update(state,dt);\n    chaos?.tick(dt);')
s=s.replace('helm?.update(cameraMode,wheelAnchor());dialogue?.project(state.time);', 'helm?.update(cameraMode,wheelAnchor());if(!chaos?.enabled)dialogue?.project(state.time);')
s=s.replace('canControl:()=>playing&&!paused,', 'canControl:()=>playing&&!paused&&!chaos?.roaming,')
s=s.replace("audio.preload();$('releaseBadge').textContent='v1.6.0';", "audio.preload();$('releaseBadge').textContent='v1.8.0';")
s=s.replace("version:'1.6.0'", "version:'1.8.0'")
s=s.replace('voices:audio.voiceStatus(),', 'story:chaos?.inspect(),voices:audio.voiceStatus(),')
s=s.replace("    ready=true;$('start').disabled=false;", "    scene.add(camera);\n    chaos=createChaos({ship,scene,camera,canvas:$('sea'),hud:$('hud'),getPeople:()=>people,getState:()=>({state,audio}),canPlay:()=>playing&&!paused,setThrottle,onToast:toast,startGame,onHelm:()=>{cameraMode=1;lookYaw=lookPitch=targetLookYaw=targetLookPitch=0;syncCameraControls();updateCamera(1,true);}});\n    $('startChaos180').disabled=false;$('startChaos180').onclick=()=>{startGame();walk?.reset();chaos.start();};\n    ready=true;$('start').disabled=false;")
s=s.replace('audio:()=>audio, say:', 'story:()=>chaos, audio:()=>audio, say:')
s=s.replace('fx.material.uniforms.uIntox.value=(state.intox/100)*(mildMotion?.22:1)', 'fx.material.uniforms.uIntox.value=(state.intox/100)*(chaos?.roaming?.28:mildMotion?.22:1)')
(P/'main180.js').write_text(s)
a=(P/'audio150.js').read_text()
insert="""
  function gameEffect(kind){
    if(!canPlay())return;
    if(kind==='slap'){oneShotNoise(.13,.29,5200,1200,.004);tone('triangle',190,85,.08,.14,.005);}
    else if(kind==='punch'){oneShotNoise(.18,.2,1600,160,.005);tone('sine',140,50,.18,.22,.005);}
    else if(kind==='glass'){oneShotNoise(.48,.14,9500,2400,.004);for(let i=0;i<3;i++)tone('sine',2400+i*600,1600+i*400,.022,.22+i*.06,.006);}
    else if(kind==='swing')oneShotNoise(.14,.03,2200,900,.035);
    else if(kind==='wood'){oneShotNoise(.20,.09,1100,230,.004);tone('triangle',160,65,.06,.19,.007);}
    else if(kind==='spit')oneShotNoise(.14,.08,3300,1100,.008);
    else if(kind==='sip')oneShotNoise(.30,.035,1100,450,.018);
    else if(kind==='alarm'){tone('sine',740,940,.1,.6,.015);}
  }
"""
a=a.replace('  return { start, setEnabled,',insert+'  return { gameEffect, start, setEnabled,')
(P/'audio180.js').write_text(a)
h=subprocess.check_output(['git','show','ae8f131de614089ea784f027908f82efc3762e42:captain/index.html'],text=True).replace('./main150.js?v=161','./main180.js?v=180').replace('content="1.6.0"','content="1.8.0"')
h=h.replace('<link rel="stylesheet" href="./style.css?v=161">','<link rel="stylesheet" href="./style.css?v=161">\n<link rel="stylesheet" href="./chaos180.css?v=180">')
h=h.replace('<button id="start"', '<button id="startChaos180" disabled>▶ ONE BAD SHIFT — ΠΑΙΞΕ ΤΗΝ ΙΣΤΟΡΙΑ</button>\n        <button id="start"')
h=h.replace('STORM SURVIVAL','ONE BAD SHIFT · CHAOS STORY')
h=h.replace('Ένα μεγάλο πλοίο.<br>Μια κακή ιδέα για άλλο ένα ποτό.','Μία γουλιά. Ένα ολόκληρο πλοίο.<br>Μία πολύ κακή βάρδια.')
(P/'index.html').write_text(h)
core=['index.html','style.css?v=161','helm140.css?v=140','dialogue130.css?v=140','chaos180.css?v=180','main180.js?v=180','chaos180.js?v=180','chaos-world180.js?v=180','chaos-rules180.js?v=180','performer180.js?v=180','audio180.js?v=180','sound-panel150.js?v=150','dialogue150.js?v=150','walk160.js?v=160','passengers.js?v=160','world.js?v=140','ship.js?v=140','helm140.js?v=140','simulation.js?v=140','voice-store140.js?v=140','icon.svg','manifest.webmanifest','vendor/three.module.js','vendor/three.core.js','vendor/addons/loaders/GLTFLoader.js','vendor/addons/utils/SkeletonUtils.js','vendor/addons/utils/BufferGeometryUtils.js']
(P/'sw.js').write_text("const CACHE='last-call-1.8.0',ROOT=new URL('./',self.location);\nconst CORE="+repr(core)+";\n"+"""self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await Promise.all(CORE.map(async p=>{const u=new URL(p,ROOT),r=await fetch(u,{cache:'reload'});if(!r.ok)throw Error('Incomplete release '+p);await c.put(u,r);}));await self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('last-call-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==ROOT.origin||!u.pathname.startsWith(ROOT.pathname))return;e.respondWith((async()=>{const c=await caches.open(CACHE);if(e.request.mode!=='navigate'&&u.searchParams.has('v')){const r=await c.match(e.request);if(r)return r;}try{const r=await fetch(e.request);if(r.ok&&!r.redirected)await c.put(e.request,r.clone());return r;}catch{return await c.match(e.request)||(e.request.mode==='navigate'?await c.match(new URL('index.html',ROOT)):null)||Response.error();}})());});
""")
(P/'release.json').write_text('{"version":"1.8.0","chapter":"One Bad Shift","audio":"Existing synthetic Greek clips; new combat effects. No new natural speech.","transitions":"Compact authored spaces connected by chapter transitions, not a fully walkable ship interior."}')
print('Story integration prepared. Publication still requires validation.')
