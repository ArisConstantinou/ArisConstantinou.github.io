from pathlib import Path
import json
R=Path(__file__).resolve().parents[2]
def edit(path,fn):
 p=R/path;s=p.read_text();p.write_text(fn(s))
def replace(s,a,b):
 if a not in s:raise RuntimeError('Missing integration anchor: '+a[:100])
 return s.replace(a,b)
# Full physical cabin doors, with room-specific collisions and reusable interaction.
p=R/'captain-mayhem/game110.js';s=p.read_text()
s="import {createCabinDoors} from '../captain/cabins190.js';\n"+s
s=replace(s," const bridgeDoors=[];let bridgeLocked=false;", " const cabinControl=createCabinDoors({world,getState,onMessage:onToast,onLock:door=>{score(20,'cabin-lock');for(const n of party)if(cabinControl.contains(door,n))shout(n,'Καπετάνιε! Η πόρτα κλείδωσε!');}});\n const bridgeDoors=[];let bridgeLocked=false;")
s=replace(s,"if(!s.foot){foot();return;}if(held)","if(!s.foot){foot();return;}const doorTarget=closestTarget(2.5);if(doorTarget?.type==='prop'&&doorTarget.item.cabin){cabinControl.use(doorTarget.item);return;}if(held)")
s=replace(s,"helmStatus.textContent='🥃 '","""// Story's one-sip prerequisite must never disable the Mayhem exit button.
  if(!s.foot&&!s.downed){$('leaveHelm').disabled=false;$('leaveHelm').querySelector('strong').textContent='ΑΣΕ ΤΟ ΤΙΜΟΝΙ';}
  if(s.foot&&target?.type==='prop'&&target.item.cabin){const door=target.item,b=$('chaosUse');b.disabled=false;b.dataset.action='cabin';b.querySelector('.use-icon').textContent=door.locked?'🔓':'🚪';b.querySelector('strong').textContent=door.locked?'ΞΕΚΛΕΙΔΩΣΕ':door.open?(getState().intox>=25?'ΚΛΕΙΔΩΣΕ':'ΚΛΕΙΣΕ'):'ΑΝΟΙΞΕ';b.querySelector('small').textContent='ΚΑΜΠΙΝΑ '+door.number;}
  helmStatus.textContent='🥃 '""")
s=replace(s,"world.reset();toys.reset();", "world.reset();toys.reset();cabinControl.reset();")
s=replace(s,"inspect:()=>({bridgeLocked,", "inspect:()=>({cabins:cabinControl.inspect(),bridgeLocked,")
s=replace(s,"test:{aim:","test:{cabins:cabinControl,aim:")
# Civilians at the bridge use the side evacuation point rather than idling forever behind the locked entry.
s=replace(s,"const q=n.actor.group.position;if(bridgeLocked&&q.y>17.8&&q.y<19&&q.z>32)return false;\n  n.evacuating=true;n.attack=null;const goal={x:n.id%2?-10.5:10.5,y:10.1,z:43.5};", "const q=n.actor.group.position,inBridge=bridgeLocked&&q.y>17.8&&q.y<19&&q.z>32;\n  n.evacuating=true;n.attack=null;const goal=inBridge?{x:n.id%2?-9.25:10.0,y:18.43,z:40.5}:{x:n.id%2?-10.5:10.5,y:10.1,z:43.5};")
s=replace(s,"if(Math.abs(q.y-10.1)<.5&&Math.hypot(q.x-goal.x,q.z-goal.z)<1.35)getMarine().boardEvac(n)","if(Math.abs(q.y-goal.y)<.5&&Math.hypot(q.x-goal.x,q.z-goal.z)<1.35)getMarine().boardEvac(n)")
# Sea throws come from actual exterior areas, never through an interior wall.
s=replace(s,"const outside=(Math.abs(p.x)>9.6", "const outside=(p.y>20&&Math.abs(p.x)>7&&Math.sign(p.x)*Math.sin(yaw)>.4)||(p.y>17.8&&p.z>43.8&&Math.cos(yaw)>.45)||(Math.abs(p.x)>9.6")
p.write_text(s)
# Correct approach buoys in this coordinate system: +X is port when facing +Z.
edit('captain-mayhem/ocean190.js',lambda s:s.replace('z: 1200, radius: 160','z: 1530, radius: 160').replace('vec2(0.0, 1200.0)','vec2(0.0, 1530.0)').replace("side < 0 ? 'port red' : 'starboard green'","side > 0 ? 'port red' : 'starboard green'").replace('side < 0 ? 0xa82626 : 0x187b62','side > 0 ? 0xa82626 : 0x187b62').replace('side < 0 ? 0xff553c : 0x5dffc3','side > 0 ? 0xff553c : 0x5dffc3'))
# The sunny preview, ocean start and physical berthing remain in the same voyage.
p=R/'captain-mayhem/marine190.js';s=p.read_text()
s=replace(s,"for(const [x,y,z,c]of [[10.5,20.4,42,0xff4e3b],[-10.5,20.4,42,0x4dff94],[0,12,-65,0xffffff],[0,29,-2,0xffffff]])mesh(ship.group,new T.SphereGeometry(.16,10,8),new T.MeshBasicMaterial({color:c,toneMapped:false}),x,y,z);", """// Angles follow USCG Rule 21: sidelights 112.5 degrees; white mast 225; stern 135.
 // Game axes: bow +Z, port +X. These are game visuals, not a navigation simulator.
 const navLights=[];
 function navLamp(parent,x,y,z,color,sector){const lamp=mesh(parent,new T.SphereGeometry(.16,8,6),new T.MeshBasicMaterial({color,toneMapped:false}),x,y,z);navLights.push({parent,lamp,sector});return lamp;}
 navLamp(ship.group,10.5,20.4,42,0xff4e3b,'port');navLamp(ship.group,-10.5,20.4,42,0x4dff94,'starboard');navLamp(ship.group,0,12,-65,0xffffff,'stern');navLamp(ship.group,0,29,-2,0xffffff,'mast');
 function updateNavigationLights(camera){const eye=camera.getWorldPosition(new T.Vector3());for(const n of navLights){const local=n.parent.worldToLocal(eye.clone()),a=Math.atan2(local.x,local.z),limit=Math.PI*.625;n.lamp.visible=n.sector==='port'?a>=0&&a<=limit:n.sector==='starboard'?a<=0&&a>=-limit:n.sector==='stern'?Math.abs(a)>=limit:Math.abs(a)<=limit;}}
""")
s=replace(s,"for(const [x,c]of [[2.05,0xff4433],[-2.05,0x44ff88]])mesh(g,new T.SphereGeometry(.12,8,6),new T.MeshBasicMaterial({color:c,toneMapped:false}),x,2.5,1);", "navLamp(g,2.05,2.5,1,0xff4433,'port');navLamp(g,-2.05,2.5,1,0x44ff88,'starboard');navLamp(g,0,5.95,-1,0xffffff,'mast');navLamp(g,0,2,-6.4,0xffffff,'stern');")
s=replace(s,"function removeBoat(b){root.remove(b.g);", "function removeBoat(b){for(let i=navLights.length-1;i>=0;i--)if(navLights[i].parent===b.g)navLights.splice(i,1);root.remove(b.g);")
s=replace(s,"if(elapsed-lastHUD>.15){", "updateNavigationLights(camera);\n  if(elapsed-lastHUD>.15){")
s=replace(s,"b.age+=dt;b.cooldown", "b.age+=dt;if(b.kind!=='rescue'&&Math.hypot(b.x-s.x,b.z-s.z)>1100){removeBoat(b);boats.splice(i,1);continue;}b.cooldown")
# Jump has visible outward travel; swimmer is not teleported straight to the water.
s=replace(s,"swimmers.push({actor:n.actor,n,x:q.x,z:q.z,y:q.y,t:0});", "const local=ship.group.worldToLocal(q.clone()),side=local.x<0?-1:1,heading=getState().heading;swimmers.push({actor:n.actor,n,x:q.x,z:q.z,y:q.y,t:0,vx:Math.cos(heading)*side*2.8,vz:-Math.sin(heading)*side*2.8});")
s=replace(s,"q.t+=dt;q.y=Math.max(.32", "q.t+=dt;if(q.y>1){q.x+=q.vx*dt;q.z+=q.vz*dt;}q.y=Math.max(.32")
s=replace(s,"if(!lastCamera", "if(!lastCamera") if 'if(!lastCamera' in s else s
# Helpful escorts communicate on approach, not just a static header.
s=replace(s,"spawn('coast',true);spawn('coast',true);started=true;", "spawn('coast',true);spawn('coast',true);started=true;onMessage('ΑΚΤΟΦΥΛΑΚΗ: Aurora, σας συνοδεύουμε στον Άγιο Φανό. Ακολουθήστε τον σημασμένο δίαυλο.');")
s=replace(s,"' · '+Math.round(dist)+' m';label.dataset", "' · '+Math.round(dist)+' m'+(hostile&&b.kind!=='rescue'?' · '+Math.max(0,Math.round(b.hp))+'%':'');label.dataset")
s=replace(s,"townBuildings:36,port:", "navigationLights:navLights.length,buoys:8,rockyObstacles:world.obstacles.filter(o=>o.type==='rock').length,townBuildings:36,port:")
p.write_text(s)
# Keep legacy mode progress; reset clears prior chase/door state correctly.
for path in ['captain/release.json','captain-mayhem/release.json']:
 p=R/path;data=json.loads(p.read_text());data['version']='1.9.0' if path.startswith('captain/') else '1.1.0';data['completed']=['Shared rebuilt stairwells, two-face signage and furnished six-deck architecture','Interactive piano, vending machines, carts, luggage racks, screens, water, foam and steam effects','Mayhem helm control and visible town approach in fair weather','Coast Guard escorts, attack-triggered police waves, ramming and thrown prop impacts','Bridge and cabin door locking, visible evacuation and rescue boats','Original independent left/right touch controls and separate save namespaces'];p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
p=R/'captain/sw.js';s=p.read_text().replace('const CORE=[','const CORE=["cabins190.js",',1);p.write_text(s)
# Validate what the player actually sees: enabled touch exit, clear HUD and real new mechanics.
p=R/'captain/tools/qa190.py';s=p.read_text().replace("executable_path='/usr/bin/chromium',",'')
s=s.replace(" if Path(path).name in ['engine.png','cabins.png','restaurant.png','lounge.png']:return", " # Capture representative interiors as well as the helm.")
s=s.replace("check('Two friendly escort boats", "check('Mobile-compatible exit is enabled',p.locator('#leaveHelm').is_enabled())\n  check('Two friendly escort boats")
s=s.replace("('lounge',0,10.1,8,-math.pi/2)","('lounge',-5.5,10.1,6,math.pi)")
s=s.replace("check('Bridge doors lock and evacuation starts',ch()['bridgeLocked'] and st()['marine']['evacuation'])", "check('Bridge doors lock and evacuation starts',ch()['bridgeLocked'] and st()['marine']['evacuation'])\n  check('Navigation lights and rocky approaches present',st()['marine']['navigationLights']>=12 and st()['marine']['rockyObstacles']>=8)")
s=s.replace("# One civilian is positioned", """# Cabin interaction uses real F input and actual collision props.
  p.evaluate('window.__CHAOS_FREEZE__=true');p.keyboard.press('f');advance(.1)
  place(-1.3,13.12,-9.5,-math.pi/2);p.keyboard.press('f');advance(.1)
  check('Cabin door locks via real interaction',any(d['locked'] for d in ch()['cabins']),ch()['cabins'])
  p.keyboard.press('f');advance(.1)
  check('Same door unlocks without a dead end',not any(d['locked'] for d in ch()['cabins']))
  place(1.2,18.43,44.4);p.keyboard.press('f');advance(.1)
  # One civilian is positioned""")
p.write_text(s)
print('Completed existing 1.9.0 build; ready for end-to-end validation')
