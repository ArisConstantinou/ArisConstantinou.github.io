"""Art/audio and capture refinements, applied after the reviewed core migration."""
from pathlib import Path
import re
P=Path('captain')
p=P/'main180.js';s=p.read_text()
s=s.replace('let renderedFrames=0,','let captureFrame=false;\nlet renderedFrames=0,')
s=s.replace('  requestAnimationFrame(frame);','  requestAnimationFrame(frame);\n  if(captureFrame)return;')
s=s.replace('renderer.shadowMap.enabled=!mobile;', 'renderer.shadowMap.enabled=!mobile&&quality!==1;')
s=s.replace('story:()=>chaos, audio:', 'capture:value=>{captureFrame=Boolean(value);}, story:()=>chaos, audio:')
p.write_text(s)
p=P/'performer180.js';s=p.read_text()
s=s.replace('/^(left|right)(arm|forearm|hand)/','/^(left|right)(forearm|hand)/')
s=s.replace('const left=V(-.32,-.43,-.62),right=V(.32,-.43,-.62)','const left=V(-.32,-.30,-.68),right=V(.32,-.30,-.68)')
p.write_text(s)
p=P/'chaos180.js';s=p.read_text()
s=s.replace("const NAMES=['Ελένη','Άννα','Σοφία','Μαρία','Δανάη','Κλειώ','Νεφέλη','Λίνα'];", "const NAMES=['Ελένη','Άννα','Σοφία','Πλήρωμα · Νίκος','Δανάη','Κλειώ','Πλήρωμα · Ανδρέας','Λίνα'];")
s=s.replace("t=guard?templates.find(s=>s.crew):", "t=(guard||index===3||index===6)?templates.find(s=>s.crew):")
s=s.replace('finished=false;\n let statistics', 'finished=false,lastVocal=-100,sipBottle=null;\n let statistics')
s=s.replace("hands=createHands(captain,camera);playerModel=", "hands=createHands(captain,camera);sipBottle=new THREE.Group();for(const child of world.props.find(p=>p.kind==='bottle').root.children)sipBottle.add(child.clone());camera.add(sipBottle);sipBottle.visible=false;sipBottle.scale.setScalar(.65);playerModel=")
s=s.replace("if(hands){hands.root.visible=mode==='deck'||mode==='return';hands.held.visible=mode!=='stealth';}", "if(hands){hands.root.visible=mode==='deck'||mode==='return';hands.held.visible=mode!=='stealth';}if(sipBottle)sipBottle.visible=false;")
s=s.replace("speak('Μια γουλιά. Τίποτε περισσότερο…');", "speak('Μια γουλιά. Τίποτε περισσότερο…');getState().audio.voice('captain1',{priority:0});")
s=s.replace("else if(elapsed>shoutAt){speak(", "else if(elapsed>shoutAt){getState().audio.voice(s.intox<30?'captain2':s.intox<65?'captain3':'captain4',{priority:0});speak(")
s=s.replace("a.spoke=elapsed;}\n  if(a.hp<=0)", "a.spoke=elapsed;if(elapsed-lastVocal>8){getState().audio.vocalEffect('scream');lastVocal=elapsed;}}\n  if(a.hp<=0)")
s=s.replace("if(attackKey(e.code)===6)blocking=false;", "if(attackKey(e.code)===6){blocking=false;buttons.get(6).classList.remove('held');}")
s=s.replace("hands?.update(elapsed,action,blocking,walkSpeed,sipAnim);", "hands?.update(elapsed,action,blocking,walkSpeed,sipAnim);if(sipBottle){sipBottle.visible=sipAnim>0&&(mode==='deck'||mode==='return');sipBottle.position.set(.24,-.35,-.58);sipBottle.rotation.set(-.2-sipAnim*.4,0,-.1);}")
s=s.replace("if(b&&crouch)b.rotateX(.65);", "if(b&&crouch){b.rotateX(.9);for(const side of ['left','right']){playerModel.bones.get(side+'upleg')?.rotateX(-.95);playerModel.bones.get(side+'leg')?.rotateX(1.65);playerModel.bones.get(side+'foot')?.rotateX(-.65);}}")
# Vary clothing while preserving the original skin and anatomy.
s=s.replace("const actor=actorFrom(t);area.root.add(actor.root);", """const actor=actorFrom(t);
  if(!t.crew){const tint=new THREE.Color([0x4b7281,0x975666,0x809371,0xa8835b,0x655e91,0xb56850,0x618486,0x7a8898][index%8]);actor.model.traverse(m=>{if(!m.isMesh)return;const wasArray=Array.isArray(m.material),materials=wasArray?m.material:[m.material];m.material=materials.map(old=>{const material=old.clone();material.onBeforeCompile=shader=>{shader.uniforms.storyCloth={value:tint};shader.fragmentShader='uniform vec3 storyCloth;\\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\\nfloat cloth180=smoothstep(.08,.24,min(diffuseColor.r,diffuseColor.g)-diffuseColor.b);diffuseColor.rgb=mix(diffuseColor.rgb,storyCloth*(.5+.5*diffuseColor.g),cloth180*.94);');};material.customProgramCacheKey=()=> 'story-cloth-180';return material;});if(!wasArray)m.material=m.material[0];});}
  area.root.add(actor.root);""")
p.write_text(s)
# Freeze the already-rendered real frame during screenshot readback, not the
# scene or its contents. All gameplay assertions still use real simulation time.
p=P/'tools/qa180.py';s=p.read_text()
s=s.replace('def story(p):', "def snap(p,path):\n p.evaluate('window.__lastCall.test.capture(true)')\n try:p.screenshot(path=path,timeout=90000)\n finally:p.evaluate('window.__lastCall.test.capture(false)')\ndef story(p):")
s=s.replace("p.on('pageerror'", "p.add_init_script(\"localStorage.setItem('lc-quality','1');localStorage.setItem('lc-motion','true');\")\n p.on('pageerror'")
s=re.sub(r"p\.screenshot\(path=(str\(OUT/'[^']+'\))\)",r'snap(p,\1)',s)
p.write_text(s)
print('Art, audio and capture refinements applied.')
