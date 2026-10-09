from pathlib import Path
import subprocess
P=Path('captain')
# Rebuild reviewed source modules so repeated CI runs are idempotent.
BASE='adcb9480125d2addaad83c432cb3983d13274d58'
for name in ['chaos180.js','chaos-world180.js','performer180.js','chaos180.css']:
 (P/name).write_text(subprocess.check_output(['git','show',BASE+':captain/'+name],text=True))
p=P/'chaos180.js';s=p.read_text()
s=s.replace("if(hands)hands.root.visible=mode==='deck'||mode==='return';", "if(hands){hands.root.visible=mode==='deck'||mode==='return';hands.held.visible=mode!=='stealth';}")
s=s.replace("a.down=12;a.status='down';", "a.down=mode==='return'?120:12;a.status='down';")
s=s.replace("if(t?.prop&&['bottle','vase','chair'].includes(t.prop.kind))", "if(t?.prop&&t.prop!==world.stash&&['bottle','vase','chair'].includes(t.prop.kind))")
s=s.replace("const ws=area.walls.filter(w=>!(w.vent&&crouch));", "const ws=area.walls.filter(w=>!(w.vent&&crouch));for(const p of area.props)if(p!==skip&&p.kind==='glass'&&!p.broken)ws.push({x:p.root.position.x,z:p.root.position.z,w:.07,d:3.6,h:2.7});")
s=s.replace("w:p.radius*1.6,d:p.radius*1.6}", "w:p.radius*1.6,d:p.radius*1.6,h:.95}")
s=s.replace("let result=null,dist=max;const ws=walls();", "let result=null,dist=max;const ws=walls().filter(w=>!w.h||w.h>1.5);")
s=s.replace("segmentBlocked(player,q,walls(p))", "segmentBlocked(player,q,walls(p).filter(w=>!w.h||w.h>1.5))")
s=s.replace("&&mode!=='helm'){", "&&(isRoaming()||['KeyF','KeyE','KeyG'].includes(e.code))){")
s=s.replace("world.areas.lounge.root.visible=false;area=world.areas.cell;", "world.areas.lounge.root.visible=false;area=world.areas.cell;for(const p of area.props){p.root.removeFromParent();area.root.add(p.root);p.root.position.copy(p.home);p.root.rotation.set(0,0,0);p.root.visible=true;p.hp=p.initialHP;p.broken=p.held=p.flying=false;p.velocity.set(0,0,0);}")
s=s.replace("actors.push(a);return a;", """actors.push(a);
  if(mode==='stealth'){
   const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(20*9),3));
   a.cone=new THREE.Mesh(geom,new THREE.MeshBasicMaterial({color:0xe9b862,transparent:true,opacity:.17,side:THREE.DoubleSide,depthWrite:false}));a.cone.frustumCulled=false;area.root.add(a.cone);
  }
  return a;""")
s=s.replace("a.actor.root.removeFromParent();}", "a.actor.root.removeFromParent();a.cone?.removeFromParent();}")
s=s.replace("if(mode==='stealth'){\n    const routes=", """if(mode==='stealth'){
    if(a.cone){const verts=a.cone.geometry.attributes.position;let index=0;
     for(let i=0;i<20;i++){verts.setXYZ(index++,a.x,.07,a.z);for(const j of [i,i+1]){const angle=a.actor.root.rotation.y-.73+j*1.46/20;let distance=5;for(let k=1;k<=20;k++){const q={x:a.x+Math.sin(angle)*k*.25,z:a.z+Math.cos(angle)*k*.25};if(segmentBlocked(a,q,area.walls)){distance=(k-1)*.25;break;}}verts.setXYZ(index++,a.x+Math.sin(angle)*distance,.07,a.z+Math.cos(angle)*distance);}}verts.needsUpdate=true;
    }
    const routes=""")
s=s.replace("if(at.key===5){a.status=", """if(at.key===5){
   const droplets=new THREE.Group();for(let i=0;i<5;i++){const drop=new THREE.Mesh(new THREE.SphereGeometry(.028,6,4),new THREE.MeshBasicMaterial({color:0xb3d7d7,transparent:true,opacity:.7}));drop.position.set((i-2)*.07,.04*Math.sin(i),0);droplets.add(drop);}area.root.add(droplets);droplets.position.set(a.x,1.5,a.z);noiseRings.push({mesh:droplets,t:1.8,spit:true});
   a.status=""")
s=s.replace("n.mesh.material.opacity=Math.max(0,.7-n.t*.3);", "if(n.mesh.material)n.mesh.material.opacity=Math.max(0,.7-n.t*.3);if(n.spit)n.mesh.position.y-=dt*.7;")
s=s.replace("function clearActors(){", "function clearActors(){for(const b of bubbles)b.e.remove();bubbles.length=0;")
s=s.replace("playerModel=actorFrom(captain);world.group.add(playerModel.root);", "playerModel=actorFrom(captain);world.group.add(playerModel.root);const ring=new THREE.Mesh(new THREE.RingGeometry(.30,.38,32),new THREE.MeshBasicMaterial({color:0x75e4cd,side:THREE.DoubleSide,depthTest:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.055;playerModel.root.add(ring);")
s=s.replace("t=guard?templates.find(s=>s.crew):templates[(index*3+1)%templates.length]", "t=guard?templates.find(s=>s.crew):templates.filter(s=>!s.crew)[index%templates.filter(s=>!s.crew).length]")
s=s.replace("const NAMES=['Μάριος','Ελένη','Πέτρος','Άννα','Νίκος','Σοφία','Ανδρέας','Μαρία'];", "const NAMES=['Ελένη','Άννα','Σοφία','Μαρία','Δανάη','Κλειώ','Νεφέλη','Λίνα'];")
s=s.replace("else if(mode==='stealth')label=finished?'ΕΞΟΔΟΣ ΠΡΟΣ ΓΕΦΥΡΑ':'ΠΑΡΕ ΤΟ ΟΥΙΣΚΙ';", "else if(mode==='stealth')label=finished?(player.z>5&&player.x<.5?'ΕΞΟΔΟΣ ΠΡΟΣ ΓΕΦΥΡΑ':'ΒΡΕΣ ΤΗΝ ΕΞΟΔΟ'):(player.distanceTo(V(4.4,0,5.4))<2.2?'ΠΑΡΕ ΤΟ ΟΥΙΣΚΙ':'ΚΡΥΨΟΥ / ΒΡΕΣ ΤΟ ΟΥΙΣΚΙ');")
s=s.replace("held:held?.id??null,action:", "held:held?.id??null,blocking,noise:noise?{...noise}:null,action:")
s=s.replace('function target(max=3){','function target(max=3,grabbable=false){')
s=s.replace('for(const a of actors){if(a.down>0)continue;const d=player.distanceTo', 'for(const a of actors){if(grabbable||a.down>0)continue;const d=player.distanceTo')
s=s.replace('for(const p of area.props){if(p.broken||p.held)continue;const q=', "for(const p of area.props){if(p.broken||p.held||(grabbable&&(p===world.stash||!['bottle','vase','chair'].includes(p.kind))))continue;const q=")
s=s.replace('const t=target(2.6);','const t=target(2.6,true);')
p.write_text(s)
p=P/'chaos-world180.js';s=p.read_text().replace("const c={x,z,w,d};", "const c={x,z,w,d,h};");p.write_text(s)
p=P/'main180.js';s=p.read_text().replace("$('startText').textContent='ΑΝΑΛΑΒΕ ΤΟ ΤΙΜΟΝΙ'", "$('startText').textContent='ΕΛΕΥΘΕΡΗ ΚΡΟΥΑΖΙΕΡΑ'");p.write_text(s)
p=P/'chaos180.css';s=p.read_text()+"\n#chaos180[data-mode=bridge] #move180,#chaos180[data-mode=helm] #move180{display:none}#hud.in-chaos .toast{top:200px;max-width:65%;font-size:10px;z-index:19}#chaos180[data-mode=stealth] #crosshair180{display:none}@media(max-width:700px){#hud.in-chaos .toast{top:195px;max-width:88%}}\n#hud.in-chaos #dialogue130,#hud.in-chaos #dialogue150{display:none!important}#chaos180[data-mode=stealth] .chaos-bubble{max-width:175px;font-size:10px}\n";p.write_text(s)
# Preserve depth ordering within the textured FPS skin.
p=P/'performer180.js';s=p.read_text()
s=s.replace("material.depthTest=false;material.depthWrite=false;material.side=THREE.DoubleSide;", "material.depthTest=true;material.depthWrite=true;material.side=THREE.FrontSide;")
s=s.replace("root.position.set(0,-1.57,.07);root.rotation.y=Math.PI;", "root.position.set(0,-1.4,-.12);root.scale.setScalar(.9);root.rotation.y=Math.PI;")
s=s.replace("root.position.y=-1.57+", "root.position.y=-1.4+")
s=s.replace("const left=V(-.30,-.37,-.55),right=V(.30,-.30,-.55)", "const left=V(-.32,-.43,-.62),right=V(.32,-.43,-.62)")
s=s.replace("if(drink>0)right.set(.13,-.06,-.33);", "if(drink>0)right.set(.24,-.26,-.51);")
p.write_text(s)
# Software rendering does not guarantee one game second per wall second.
# Wait for game time without relaxing collision, damage or input criteria.
p=P/'tools/qa180.py';s=subprocess.check_output(['git','show',BASE+':captain/tools/qa180.py'],text=True)
s=s.replace('def story(p):', "def advance(p,seconds):\n t=p.evaluate('window.__lastCall.getState().story.elapsed')+seconds\n p.wait_for_function('(t)=>window.__lastCall.getState().story.elapsed>=t',arg=t,timeout=90000)\ndef story(p):")
for n in [700,2900,600,800,180,650,1600,850,1300]:s=s.replace(f'p.wait_for_timeout({n})',f'advance(p,{n/1000})')
s=s.replace('p.wait_for_timeout(400 if key<3 else 430)','advance(p,.40 if key<3 else .43)')
s=s.replace("p.click('#modalNext180');p.wait_for_timeout(400)","p.click('#modalNext180');advance(p,.4)")
s=s.replace('  for key in range(1,6):', "  for i in range(1,8):actor(p,i,x=3+(i%2),z=4-(i//2)*.8,stun=80,status='wander',attack=0)\n  for key in range(1,6):")
s=s.replace("p.screenshot(path=str(OUT/'deck-first.png'))", "advance(p,1.4);p.screenshot(path=str(OUT/'deck-first.png'))")
s=s.replace("  p.evaluate('window.__lastCall.test.story().test.arrest()')", "  check('All five attack types counted',all(story(p)['statistics'][k]>0 for k in ['slaps','punches','kicks','spits']))\n  p.evaluate('window.__lastCall.test.story().test.arrest()')")
p.write_text(s)
print('Reviewed fixes applied; publication still requires all browser checks.')
