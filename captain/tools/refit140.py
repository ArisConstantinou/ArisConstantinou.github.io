"""Readable, guarded Captain-only migration. Never changes other games."""
from pathlib import Path
import hashlib,json
P=Path('captain')
if "version:'1.4.0'" in (P/'main.js').read_text():
 print('Refit already applied; test current staged sources.');raise SystemExit(0)
expected={'main.js':'90245d3f14275b51c2d20701c159389bf784a8b0','audio.js':'ddb3ee2773c8fef14c2d9f1453ddfeddbb19d516','ship.js':'dbcb9149f8fb3e6fd3c9f9b1660df0ca38f11c8a','index.html':'9f6b9180f28ed93921b32afe6701ff37dc8a3fa5','sw.js':'3ea527bc435864922886ba55cc5bc748307d729f','helm130.css':'03f2fd3424b9530780ea1abcb3a740c33fc02f24'}
for n,want in expected.items():
 b=(P/n).read_bytes();assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==want,'Unexpected source: '+n
s=(P/'main.js').read_text().replace('helm130.js','helm140.js').replace('?v=130','?v=140').replace("version:'1.3.0'","version:'1.4.0'")
s=s.replace('let renderedFrames=0;','let renderedFrames=0,sceneDrawCalls=0,sceneTriangles=0;')
s=s.replace('Κράτα τα βέλη του τιμονιού και σύρε. Μοχλός δεξιά: πάνω / μέση / κάτω.','Πιάσε το ίδιο το τιμόνι και γύρισέ το κυκλικά. Μοχλός: πάνω / μέση / κάτω.')
s=s.replace('const local=cameraMode===1?ship.bridgeCameraPosition:new THREE.Vector3(10.22,11.73,-22);','const local=cameraMode===1?bridgeFraming():new THREE.Vector3(10.22,11.73,-22);').replace('intox*.21;offset.y+=Math.sin(time*1.93)*intox*.12;','intox*.06;offset.y+=Math.sin(time*1.93)*intox*.045;')
a=s.index('function wheelAnchor(){');b=s.index('function drawRadar(stats)',a)
s=s[:a]+'''function bridgeFraming(){
 const w=innerWidth,h=innerHeight,focal=h*.5/Math.tan(THREE.MathUtils.degToRad(73*.5));
 const radius=Math.min(w*.23,h*.165,150),distance=focal*.55/radius;
 const targetX=w*(w<h?.43:.47),targetY=Math.min(h*.72,h-91-radius);
 const center=ship.wheel.position.clone().add(ship.bridgeGroup.position);
 return center.add(new THREE.Vector3((targetX-w*.5)*distance/focal,(targetY-h*.5)*distance/focal,-distance));
}
function wheelAnchor(){
 if(!ship?.wheel||!camera)return null;
 const c=ship.wheel.getWorldPosition(new THREE.Vector3()).project(camera),points=[];
 const x=(c.x*.5+.5)*innerWidth,y=(-c.y*.5+.5)*innerHeight;
 for(let i=0;i<24;i++){const a=i*Math.PI/12,p=new THREE.Vector3(Math.cos(a)*.55,Math.sin(a)*.55,0);ship.wheel.localToWorld(p);p.project(camera);points.push({x:(p.x*.5+.5)*innerWidth,y:(-.5*p.y+.5)*innerHeight});}
 const minX=Math.min(...points.map(p=>p.x)),maxX=Math.max(...points.map(p=>p.x)),minY=Math.min(...points.map(p=>p.y)),maxY=Math.max(...points.map(p=>p.y));
 return {x,y,minX,maxX,minY,maxY,points,radius:Math.max(maxX-minX,maxY-minY)/2,visible:c.z>0&&c.z<1&&x>0&&x<innerWidth&&y>40&&y<innerHeight-60};
}
const wheelRay=new THREE.Raycaster();
function pickWheel(event){
 if(cameraMode!==1)return null;const a=wheelAnchor();if(!a?.visible)return null;
 wheelRay.setFromCamera(new THREE.Vector2(event.clientX/innerWidth*2-1,1-event.clientY/innerHeight*2),camera);
 if(wheelRay.intersectObject(ship.wheel,true).length)return a;
 // The spaces between the spokes also belong to the wheel silhouette.
 let inside=false;const pts=a.points;
 for(let i=0,j=pts.length-1;i<pts.length;j=i++){
  const p=pts[i],q=pts[j];if((p.y>event.clientY)!==(q.y>event.clientY)&&event.clientX<(q.x-p.x)*(event.clientY-p.y)/(q.y-p.y)+p.x)inside=!inside;
 }
 return inside?a:null;
}
''' +s[b:]
s=s.replace("if(!playing||paused)return;drag={id:event.pointerId,x:event.clientX,y:event.clientY};$('sea').setPointerCapture(event.pointerId);", "if(!playing||paused)return;\n    if(helm?.beginWheel(event,$('sea'),pickWheel(event)))return;\n    if(drag)return;drag={id:event.pointerId,x:event.clientX,y:event.clientY};$('sea').setPointerCapture(event.pointerId);")
s=s.replace('if(!drag||drag.id!==event.pointerId)return;','if(helm?.moveWheel(event))return;\n    if(!drag||drag.id!==event.pointerId)return;')
s=s.replace("for(const type of ['pointerup','pointercancel'])$('sea').addEventListener(type,()=>drag=null);", "for(const type of ['pointerup','pointercancel','lostpointercapture'])$('sea').addEventListener(type,event=>{helm?.endWheel(event);if(drag?.id===event.pointerId)drag=null;});\n  for(const type of ['contextmenu','selectstart','dragstart'])$('sea').addEventListener(type,e=>e.preventDefault());")
s=s.replace('ship.update(state.time,dt,{...state,damage:100-state.hull});','ship.update(state.time,dt,{...state,damage:100-state.hull,wheelDemand:helm?.visualRudder});')
s=s.replace('controls:helm.inspect(),dialogue','wheelAngle:ship.wheel.rotation.z,look:{yaw:lookYaw,pitch:lookPitch},controls:helm.inspect(),dialogue')
s=s.replace('say:id=>dialogue.say(id,state),anchor:wheelAnchor,','say:id=>dialogue.say(id,state),anchor:wheelAnchor,look:(yaw,pitch=0)=>{targetLookYaw=lookYaw=yaw;targetLookPitch=lookPitch=pitch;lastLook=state.time;updateCamera(1,true);},')
s=s.replace('renderer.render(scene,camera);renderer.setRenderTarget(null);','renderer.render(scene,camera);sceneDrawCalls=renderer.info.render.calls;sceneTriangles=renderer.info.render.triangles;renderer.setRenderTarget(null);').replace('drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles','drawCalls:sceneDrawCalls,triangles:sceneTriangles')
(P/'main.js').write_text(s)
p=P/'ship.js';s=p.read_text().replace('wheel.rotation.z=(Number(state.rudder)||0)*Math.PI*.84;','wheel.rotation.z=(Number.isFinite(state.wheelDemand)?state.wheelDemand:(Number(state.rudder)||0))*Math.PI*.84;');p.write_text(s)
p=P/'index.html';s=p.read_text().replace('helm130.css','helm140.css').replace('?v=130','?v=140').replace('content="1.3.0"','content="1.4.0"').replace('Στη γέφυρα κράτα τα βέλη γύρω από το τιμόνι και σύρε.','Στη γέφυρα πιάσε το ίδιο το τιμόνι και γύρισέ το με κυκλική κίνηση.');s=s.replace('<button class="setting-button" id="helpButton">','<a class="setting-button" href="./voices.html" target="_blank" rel="noopener" style="display:block;color:inherit;text-decoration:none">Ελληνικές φωνές — ηχογράφηση / εισαγωγή</a><button class="setting-button" id="helpButton">');p.write_text(s)
p=P/'sw.js';s=p.read_text().replace("VERSION='130',CACHE='last-call-1.3.0'","VERSION='140',CACHE='last-call-1.4.0'").replace('helm130','helm140').replace("'credits.html'","'credits.html','voice-store140.js','voices.html','voices140.js'");p.write_text(s)
s=(P/'helm130.css').read_text().replace('1.3.0','1.4.0').replace('#helm130','#helm140');s='\n'.join(line for line in s.splitlines() if '.wheel-arrow' not in line);s=s.replace('#helm140[data-view=bridge] #helmPad{display:none}','#helm140[data-view=bridge].wheel-visible #helmPad{display:none}')
s+='''
#wheelHint{position:absolute;transform:translateX(-50%);font-size:8px;letter-spacing:.55px;text-shadow:0 2px 5px #000;color:#e9d4a3;pointer-events:none;white-space:nowrap}
#wheelTouchDot{display:none;position:absolute;transform:translate(-50%,-50%);width:18px;height:18px;border:2px solid #ffdda5;border-radius:50%;background:#ffcc7822;box-shadow:0 0 12px #f5c26888;pointer-events:none}
#helm140.gripping #wheelTouchDot{display:block}
#helm140 #leverShell{width:48px;right:auto!important;bottom:auto!important;border-radius:20px;background:#081e2877;backdrop-filter:none;box-shadow:0 2px 9px #0004;pointer-events:none}
#helm140 #engineLever{left:1px;top:23px;width:44px;height:calc(100% - 82px)}
#helm140 .lever-track{left:19px;width:5px}
#helm140 #leverGrip{left:7px}
#helm140 .lever-ahead{top:7px;font-size:6px}
#helm140 .lever-astern{bottom:46px;font-size:6px}
#helm140 .lever-foot{position:absolute;bottom:1px;height:42px;left:1px;right:1px;display:flex;flex-direction:column;align-items:center}
#helm140 #leverNeutral{position:static!important;left:auto;top:auto;min-width:44px;width:44px;height:30px;min-height:30px;border-radius:12px;font-size:10px;box-shadow:none}
#helm140 #leverPower{font-size:7px;position:static;line-height:10px}
#helm140 #helmActions .action{width:46px;min-width:46px;height:46px}
#hud.in-bridge .radio-message{top:39%;bottom:auto;max-width:66vw;background:#081c27b3;padding:8px 10px;font-size:9px}
#hud .person-bubble{max-width:230px}
''';(P/'helm140.css').write_text(s)
p=P/'audio.js';s=p.read_text().replace('// Entirely local soundscape. No recordings, streaming, or network requests.','import {readVoices} from "./voice-store140.js?v=140";\n// Sea and engine effects plus real vocal recordings. No TTS.');a=s.index('  // Short pre-rendered voice assets');b=s.index('  function update(state',a)
s=s[:a]+'''  // No synthetic fallback: missing Greek performances remain captions.
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
''' +s[b:]
s=s.replace("  const synth = () => typeof window !== 'undefined' ? window.speechSynthesis : null;",'').replace('try { synth()?.cancel(); } catch (_) {}','').replace('  let speechPrimed = false;','')
p.write_text(s)
(P/'release.json').write_text(json.dumps({'version':'1.4.0','controls':'Direct rendered wheel grip; independent engine lever; no floating arrows','audio':'No machine speech. Human nonverbal recordings plus optional local recordings. Human Greek spoken lines are not bundled.'},indent=2)+'\n')
print('Readable Captain 1.4 migration complete. Publication requires browser checks.')
