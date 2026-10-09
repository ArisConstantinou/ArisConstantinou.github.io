"""Build new entry modules from the verified 1.7.1 source, without modifying other games."""
from pathlib import Path
import json,re
P=Path('captain')
def replace(s,old,new):
    assert old in s, 'Source drift: '+old[:90]
    return s.replace(old,new)
s=(P/'passengers170.js').read_text()
s=replace(s,"import * as THREE from 'three';","import * as THREE from 'three';\nimport {loadCharacters} from './characters172.js';")
a=s.index('// Both source GLBs');b=s.index('const Y_AXIS',a)
s=s[:a]+'// Civilian models and fixed adult roster, shared with the chaos chapter.\n'+s[b:]
a=s.index('  const loader = new GLTFLoader();',s.index('export async function createPassengers'));b=s.index('  const makeRescueProps',a)
s=s[:a]+'  const library=await loadCharacters();\n'+s[b:]
a=s.index('    const isCrew = i % 4 === 0;');b=s.index('    const group = new THREE.Group();',a)
s=s[:a]+"    const template=library.voyage(i),profile=template.profile;\n    const isCrew=profile.role==='staff'||profile.role==='security';\n    const model=cloneSkeleton(template.model),height=template.height;\n"+s[b:]
s=replace(s,"group.name = `${isCrew ? 'Πλήρωμα' : 'Επιβάτης'} ${i + 1}`;","group.name = profile.name;")
s=replace(s,"const clips = isCrew ? asset.animations.filter((c) => /^(idle|walk|run)$/i.test(c.name)) : womanClips;","const clips = ['idle','walk','run'].map(n=>template.clips[n]).filter(Boolean);")
s=replace(s,'id: i, group, model, mixer, actions, bones, gestureBones, isCrew,','id: i, group, model, mixer, actions, bones, gestureBones, isCrew, profile,')
s=replace(s,'height:p.height,crew:p.isCrew,status:p.status','height:p.height,profile:p.profile,rig:"civilian172",crew:p.isCrew,status:p.status')
s=replace(s,'return {update,reset,getStats,getSpeakers,react,jumpOne,rescueNear,ready:true};','return {update,reset,getStats,getSpeakers,react,jumpOne,rescueNear,ready:true,getCharacterTemplate:library.template,getDeckTemplates:library.deck};')
(P/'passengers172.js').write_text(s)
s=(P/'chaos170.js').read_text()
for old,new in [
 ("from './actors170.js'","from './actors172.js'"),
 ("const crew=list.find(a=>a.crew)||list[0];avatar=createActor(crew,ship.group,{fps:true});","const crew=getPeople().getCharacterTemplate('captain');avatar=createActor(crew,ship.group,{fps:true});"),
 ("const template=list[i%3===0?0:1+(i%3)];","const template=getPeople().getDeckTemplates()[i];"),
 ("const template=getPeople().getSpeakers().find(n=>n.crew);","const template=getPeople().getCharacterTemplate(guardSerial%3===2?'securityF':'securityM');"),
 ("el.firstChild.textContent=n.guard?'ΑΣΦΑΛΕΙΑ ΠΛΟΙΟΥ':'ΕΠΙΒΑΤΗΣ '+(n.id+1);","el.firstChild.textContent=n.actor.profile?.name||(n.guard?'ΑΣΦΑΛΕΙΑ ΠΛΟΙΟΥ':'ΕΠΙΒΑΤΗΣ '+(n.id+1));"),
 ("avatar.tick(dt,{speed:0,","avatar.tick(dt,{speed:lastMove,"),
 ("`${t.item.guard?'ΑΣΦΑΛΕΙΑ':'ΕΠΙΒΑΤΗΣ '+(t.item.id+1)} ·","`${t.item.actor.profile?.name||(t.item.guard?'ΑΣΦΑΛΕΙΑ':'ΕΠΙΒΑΤΗΣ '+(t.item.id+1))} ·"),
 ("actors:party.map(n=>({id:n.id,","captain:avatar?.inspect(),actors:party.map(n=>({profile:n.actor.profile,id:n.id,")]:s=replace(s,old,new)
(P/'chaos172.js').write_text(s)
s=(P/'main170.js').read_text()
s="import {installIdentityPanel} from './identity172.js?v=172';\n"+s
s=replace(s,'./chaos170.js?v=171','./chaos172.js?v=172')
s=replace(s,'./passengers170.js?v=171','./passengers172.js?v=172')
s=s.replace('1.7.1','1.7.2')
s=replace(s,'audio,helm,dialogue,chapter;','audio,helm,dialogue,chapter,identity;')
s=replace(s,"  window.addEventListener('keydown',event=>{","  window.addEventListener('keydown',event=>{\n    if(identity?.handleKey(event)){event.preventDefault();return;}")
needle='    people=await createPassengers(ship.group,ship.deckZones,scene,{mobile,onEvent:passengerEvent});'
s=replace(s,needle,needle+"\n    identity=installIdentityPanel({template:()=>people.getCharacterTemplate('captain'),pauseGame:()=>{const wasPaused=paused;if(playing&&!paused)setPaused(true);return ()=>{if(playing&&!wasPaused)setPaused(false);};}});")
s=replace(s,'chapter:chapter?.inspect(),drawCalls:','chapter:chapter?.inspect(),identity:identity?.inspect(),drawCalls:')
s=s.replace('v1.7.2 · CHAOS','v1.7.2 · CAPTAIN')
(P/'main172.js').write_text(s)
s=(P/'index.html').read_text().replace('main170.js?v=171','main172.js?v=172').replace('1.7.1','1.7.2')
if 'identity172.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="./identity172.css?v=172">\n</head>')
(P/'index.html').write_text(s)
p=P/'actors172.js';s=p.read_text();needle='  // Restore every overlayed joint, including all finger joints, before advancing animation.'
if 'dt=Math.max(0,Math.min(.1' not in s:s=replace(s,needle,'  dt=Math.max(0,Math.min(.1,Number.isFinite(dt)?dt:0));\n'+needle)
p.write_text(s)
(P/'release.json').write_text(json.dumps({'version':'1.7.2','chapter':'UTTER CHAOS: helm, deck combat, security, cell','characters':'Quaternius CC0 civilian male and female rigs; captain uniform and full-body inspector; navy ship security; mixed passenger profiles; relaxed FPS idle','controls':'Desktop WASD and touch joystick retained. V opens full-body captain inspector.','audio':'Existing synthetic Greek MP3 speech unchanged.','scope':'Existing captain/ game only. No stealth escape or third-person gameplay added.'},ensure_ascii=False,indent=2)+'\n')
s=(P/'sw.js').read_text().replace('last-call-1.7.1','last-call-1.7.2')
m=re.search(r'const CORE=(\[.*?\]);',s);assert m
core=json.loads(m.group(1))
new=['main172.js','actors172.js','characters172.js','passengers172.js','chaos172.js','identity172.js','identity172.css']
new += ['assets/civilian172/'+n+'.glb' for n in ['male','female','Hair_Buzzed','Hair_SimpleParted','Hair_Long','Hair_Buns','Hair_Beard']]
core=list(dict.fromkeys(core+new));s=s[:m.start(1)]+json.dumps(core)+s[m.end(1):]
(P/'sw.js').write_text(s)
p=P/'credits.html';s=p.read_text()
if 'Civilian cast 1.7.2' not in s:
 section='<section><h2>Civilian cast 1.7.2</h2><p>Adult human bases, matching hairstyles and source animation clips: Quaternius, CC0 1.0. <a href="https://quaternius.com/packs/universalbasecharacters.html">Universal Base Characters</a> and <a href="https://quaternius.com/packs/universalanimationlibrary.html">Universal Animation Library</a>. Source-data mirror: NafisRayan/Animate-Rigged-Humanoid-No-Blender. Required clips retained and textures resized; geometry and skeleton preserved. LAST CALL adds fitted cloth materials, captain rank/cap, civilian outfits, security identification, relaxed poses and role casting. Original Soldier and Michelle assets retained as historical files but not loaded by the 1.7.2 game. Full provenance and license in assets/civilian172/.</p></section>'
 s=s.replace('</main>',section+'</main>') if '</main>' in s else s.replace('</body>',section+'</body>')
p.write_text(s)
print('Captain 1.7.2 identity integration complete. Publication requires browser validation.')
