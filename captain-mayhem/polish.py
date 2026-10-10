from pathlib import Path
import re
R=Path(__file__).resolve().parent
p=R/'systems.js';s=p.read_text()
s=s.replace("o===s.held||!['chair'","o.active===false||!['chair'")
anchor=' function reset(){quiet=0;'
if anchor in s:
 s=s.replace(anchor," function reset(){spray.next=0;for(const f of smoke){for(const q of f.sprites){ship.group.remove(q);q.material.dispose();}}smoke.length=0;for(const f of sparks){ship.group.remove(f.q);f.q.geometry.dispose();f.q.material.dispose();}sparks.length=0;for(const o of world.props)if(o.mayhemPivot)poseProp(o,0);quiet=0;")
if 'function poseProp(' not in s:
 s=s.replace(' function reset(){',""" function poseProp(o,angle){
  if(!o.mayhemPivot){o.mayhemDims={w:o.w,h:o.h,d:o.d};const q=new T.Group(),children=[...o.group.children];q.position.y=o.h/2;for(const child of children){child.position.y-=o.h/2;q.add(child);}o.group.add(q);o.mayhemPivot=q;}
  const b=o.mayhemDims,si=Math.abs(Math.sin(angle)),co=Math.abs(Math.cos(angle));o.mayhemPivot.rotation.z=angle;o.mayhemPivot.position.y=(si*b.w+co*b.h)/2;o.w=co*b.w+si*b.h;o.h=si*b.w+co*b.h;
 }
 function reset(){""")
 s=s.replace('return {update,security,','return {poseProp,update,security,')
p.write_text(s)
p=R/'game.js';s=p.read_text()
s=s.replace("o.group.rotation.z=T.MathUtils.lerp(o.group.rotation.z,o.type==='cart'?.04:Math.PI*.4,Math.min(1,h*3));","sandbox.poseProp(o,T.MathUtils.lerp(o.mayhemPivot?.rotation.z||0,o.type==='cart'?.025:Math.PI/2,Math.min(1,h*3)));")
s=s.replace('held=t.item;held.active=false;', 'held=t.item;if(held.mayhemPivot)sandbox.poseProp(held,0);held.active=false;')
s=s.replace("n.state=n.brave||n.guard?'fight':'flee';n.goal.copy", "n.state=n.brave||n.guard?'fight':'flee';n.civilianAngryUntil=s.time+10;n.goal.copy")
s=s.replace("const q=n.actor.group.position;const distance=", "const q=n.actor.group.position;if(!n.guard&&n.state==='fight'&&s.time>(n.civilianAngryUntil||0)&&(!lineClear(p,q)||q.distanceTo(p)>10)){n.state='flee';n.attack=null;}const distance=")
p.write_text(s)
p=R/'main.js';s=p.read_text()
s=s.replace("const thisVoyage=state;Promise.resolve(audioReady).then(()=>audio.loadVoices()).then(()=>{if(state===thisVoyage&&playing&&!paused&&soundEnabled)dialogue.say('calm',state,undefined,1);}).catch(()=>{});","Promise.resolve(audioReady).then(()=>audio.loadVoices()).catch(()=>{});")
p.write_text(s)
p=R/'audio.js';s=p.read_text().replace('from "./voice-store140.js?v=140"','from "../captain/voice-store140.js?v=140"');p.write_text(s)
for p in R.glob('*.js'):
 for imp in re.findall(r'''from\s+['"](\.[^'"]+)['"]''',p.read_text()):
  target=p.parent/imp.split('?')[0]
  assert target.exists(),(p.name,imp)
print('Every relative module import resolves locally')
