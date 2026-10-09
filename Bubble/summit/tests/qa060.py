from pathlib import Path
from playwright.sync_api import sync_playwright
from harness060 import load
import json,sys,traceback,math,os
OUT=Path(os.environ.get('SUMMIT_REPORTS',str(Path(__file__).parent/'reports')));OUT.mkdir(parents=True,exist_ok=True);results=[]
def check(name,ok,data=None):
 results.append({'name':name,'pass':bool(ok),'details':data});print(('PASS ' if ok else 'FAIL ')+name,flush=True)
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
  ctx=browser.new_context(viewport={'width':1440,'height':900},device_scale_factor=1);page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));load(page)
  def run(s):return page.evaluate('()=>{'+s+'}')
  def step(t):return run(f'for(let t=0;t<{t};t+=1/60)g.tick(1/60);g.updateHUD();')
  page.evaluate("async()=>{window.g=__summit.game;window.P=await import(__mods['physics.js']);window.C=await import(__mods['combat060.js']);window.E=await import(__mods['expedition060.js']);window.T=await import(__mods['vendor/three.module.js']);g.renderer.shadowMap.enabled=false;g.reset(true);}")
  check('Production source boots 0.6.0 with real WebGL renderer',run("return __summit.version==='0.6.0'&&g.loaded&&g.director!=null;"))
  check('Forest uses spatially culled chunks rather than one map-wide draw',run('return g.world.treeChunks.length>20&&g.world.treeChunks.every(c=>!!c.mesh.boundingSphere);'))
  check('Existing human skeletons retained',run('return [...g.visuals.values()].every(v=>Object.keys(v.bones).length>=45);'))
  check('Every route site has a personal, reachable central supply cache',run("return P.ROUTE.every((p,i)=>g.world.chests.some(c=>c.main&&c.site===i&&P.distance(c,p)<12&&!g.world.blocked(c.x+2,c.y,c.z,.42,1.78)));"))
  # Deterministic physics measurements; no GUI strings used as evidence.
  data=run("const w={height:()=>0,support:()=>0,blocked:()=>false,wind:()=>({x:0,y:0,z:0}),minX:-999,maxX:999,minZ:-999,maxZ:999};const a=P.makeBody(30,{x:0,y:100,z:0}),b=P.makeBody(31,{x:0,y:100,z:0});P.inflate(a);P.inflate(b);a.vy=b.vy=0;b.gum=20;for(let i=0;i<120;i++){P.advanceBody(a,{},w,1/60,0);P.advanceBody(b,{},w,1/60,0);}return {normal:a.vy,weighted:b.vy};")
  check('Actual added mass produces greater neutral descent',data['weighted']<data['normal']-.8,data)
  data=run("const a=P.makeBody(40,{x:0,y:100,z:0});P.inflate(a);a.vy=0;P.gumHit(a,2.5,true);return {integrity:a.balloon.integrity,weight:a.gum,impulse:a.vy};")
  check('One hit adds 2.5 kg, costs 8 membrane and produces downward impulse',data['integrity']==152 and data['weight']==2.5 and data['impulse']<0,data)
  check('Ray starting within a hit volume reports first contact at zero',run('return P.raySphere({x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:0,z:0},2,.1)===0;'))
  # Launch with actual pointer events, no recipe-button shortcut or automatic success.
  def gum_launch():
   page.keyboard.press('b');check('B opens direct gum manipulation rather than recipe wizard',run("return g.crafting&&g.hands.active&&g.hands.state==='choose';"))
   xy=run('return g.hands.snapshot().slots[1].screen;');mouth=run('return g.hands.snapshot().mouth;')
   page.mouse.move(xy['x'],xy['y']);page.mouse.down();page.mouse.move(mouth['x'],mouth['y'],steps=10);step(.25);page.mouse.up();step(2.4)
   check('Dragging a selected gum to lips reaches chewing/bubble state',run("return g.hands.state==='blow'&&g.hands.reserved;"))
   q=run('return g.hands.project(g.hands.mouth());');page.mouse.move(q['x'],q['y']);page.mouse.down();page.mouse.move(min(1420,q['x']+510),q['y']+80,steps=12);page.mouse.up();step(.1)
   check('User inflation gesture launches and consumes exactly one kit',run('return !g.crafting&&!!g.player.balloon&&E.flightKits(g.player)===0;'))
  gum_launch()
  # Use the production flight simulation to fly the whole route, only steering is scripted.
  run("g.savedBodies=g.bodies;g.bodies=[g.player];g.raceStarted=true;g.director.previous=null;")
  route_data=[]
  for leg in range(1,5):
   data=run("const a=g.player,target=P.ROUTE[a.target];let secs=0;for(;secs<130;secs+=1/30){const yaw=Math.atan2(target.x-a.x,target.z-a.z),dist=P.distance(a,target),ahead={x:a.x+Math.sin(yaw)*60,z:a.z+Math.cos(yaw)*60};let needed=Math.max(target.y+22,g.world.height(ahead.x,ahead.z)+18);if(dist<55)needed=target.y+Math.max(0,(dist-12)*.3);const up=P.clamp((needed-a.y)*.10-a.vy*.15,-1,1);P.advanceBody(a,{forward:dist>25?1:dist>8?.30:0,yaw,up},g.world,1/30,g.time);g.time+=1/30;g.elapsed+=1/30;g.director.tick(1/30);if(!a.alive)break;if(a.grounded&&Math.abs(a.y-target.y)<2&&P.distance(a,target)<35&&a.groundTime>.35)break;}g.cameraReady=false;g.render(.016);return {seconds:secs,alive:a.alive,grounded:a.grounded,x:a.x,y:a.y,z:a.z,checkpoint:a.checkpoint,target:a.target,goal:g.director.goal().kind};")
   route_data.append(data);check(f'Flight leg {leg}: real terrain landing and automatic checkpoint',data['alive'] and data['grounded'] and data['checkpoint']==min(leg,3),data)
   if leg==4:break
   check(f'Landing {leg} points to supplies, not the next mountain',data['goal']=='cache',data)
   if leg==1:page.screenshot(path=str(OUT/'landing-route.png'))
   # Walk from actual landing to the central chest using collision-aware production movement.
   data=run("const a=g.player,c=g.director.supply(a);let t=0;for(;t<20&&P.distance(a,c)>4;t+=1/30){const yaw=Math.atan2(c.x-a.x,c.z-a.z);P.advanceBody(a,{forward:1,yaw},g.world,1/30,g.time);g.time+=1/30;}g.cameraReady=false;g.render(.016);return {distance:P.distance(a,c),site:c.site,kit:E.flightKits(a),ready:g.director.contextCommand};")
   check(f'Landing {leg}: can physically walk to the marked cache',data['distance']<6 and data['ready']=='collect',data)
   page.keyboard.press('f');step(.05);check(f'Landing {leg}: F gives a complete flight kit',run('return E.flightKits(g.player)===1;'))
   page.keyboard.press('f');check(f'Landing {leg}: repeated F cannot duplicate the same chest',run('return E.flightKits(g.player)===1;'))
   check(f'Landing {leg}: next objective explicitly teaches new gum',run("return g.director.goal().kind==='craft'&&document.querySelector('#objectiveTitle').textContent.includes('φουσκάλα');"))
   gum_launch()
  data=run("g.finish(g.player);return {finish:g.ended,text:document.getElementById('endTitle').textContent};");check('Whole route finishes after all three landings and three real resupplies',data['finish'],data)
  run('g.bodies=g.savedBodies;g.reset(true);g.raceStarted=false;')
  # Help pauses simulation and never loses a run.
  page.keyboard.press('k');before=run('return g.time;');step(1);check('In-game illustrated instructions pause time and explain full loop',page.locator('#guideScreen').is_visible() and run('return g.time;')==before and 'κιβώτιο' in page.locator('#guideScreen').inner_text())
  page.click('#guideResume');check('Closing guide returns to gameplay',run('return g.playing();'))
  # Isolated combat scene: keep real physics, targeting and projectile update.
  run("g.savedBodies=g.bodies;const a=g.player,b=g.bodies[1];g.bodies=[a,b];Object.assign(a,{x:-300,y:385,z:410,yaw:Math.PI,grounded:false,ammo:64,cooldown:0,vx:0,vy:0,vz:0});P.inflate(a);Object.assign(b,{x:-294,y:385,z:384,yaw:1,bank:.3,grounded:false,hp:100,gum:0,cooldown:999,vx:2,vy:0,vz:0});P.inflate(b);g.cameraReady=false;g.render(.016);")
  data=run("const a=g.bodies[1],view=g.visuals.get(a.id);const actual=view.balloon.getWorldPosition(new T.Vector3()),expected=P.balloonCenter(a);return actual.distanceTo(new T.Vector3().copy(expected));")
  check('Hit volume centre matches a banked, rotated rendered balloon',data<.01,data)
  xy=run('return g.project(C.aimPoint(g.bodies[1]));');page.mouse.move(xy['x'],xy['y']);run('g.updateAim(.016);');check('Mouse selects an enemy on its visible balloon',run('return g.target===g.bodies[1];'))
  page.mouse.down();step(.2);page.mouse.up();step(.7);run('g.render(.016);');data=run("const a=g.bodies[1];return {weight:a.gum,hp:a.hp,integrity:a.balloon?.integrity,confirmed:g.director.confirmedHits,patches:g.visuals.get(a.id).impactPatches.children.length,text:document.getElementById('hitNumbers').textContent};")
  check('Actual fired projectiles reduce enemy membrane and add mass',data['weight']>0 and data['integrity']<160,data)
  check('Confirmed hits create visible attached gum and numeric feedback',data['confirmed']>0 and data['patches']>0 and 'kg' in data['text'],data)
  # Produce screenshot while target still physically falling and weighted.
  run("g.player.cooldown=0;g.fire(g.player,C.aimPoint(g.bodies[1]),true);for(let i=0;i<36;i++)g.tick(1/60);g.render(.016);")
  page.screenshot(path=str(OUT/'combat-impact.png'));data=run('return {weight:g.bodies[1].gum,vy:g.bodies[1].vy,membrane:g.bodies[1].balloon?.integrity};');check('A heavy hit has greater membrane, mass and falling response',data['weight']>=10 and data['vy']<0,data)
  # No out-of-range lock, no simulated impact just because aiming at someone.
  run("g.input.clear();g.bodies[1].x=g.player.x;g.bodies[1].z=g.player.z-105;g.bodies[1].y=g.player.y;g.bodies[1].vx=g.bodies[1].vy=g.bodies[1].vz=0;g.cameraReady=false;g.setCamera(0);")
  xy=run('return g.project(C.aimPoint(g.bodies[1]));');page.mouse.move(xy['x'],xy['y']);run('g.updateAim(.016)');check('No assist lock beyond the real 90 m projectile range',run('return g.target===null;'))
  # Box in front of muzzle must receive the shot rather than the victim.
  run("g.bodies[1].x=g.player.x;g.bodies[1].z=g.player.z-10;g.player.yaw=Math.PI;g.world.collider(g.player.x,g.player.y,g.player.z-.32,3,8,.16,'qa-wall');g.player.cooldown=0;window.oldWeight=g.bodies[1].gum;g.fire(g.player,C.aimPoint(g.bodies[1]),false);for(let i=0;i<60;i++)g.updateShots(1/60);")
  check('Wall next to muzzle stops bullets instead of spawning them through it',run('return g.bodies[1].gum===oldWeight;'))
  # Basic browser-safe bindings stay distinct from shooting.
  run('g.bodies=g.savedBodies;g.reset(true);g.player.y=500;P.inflate(g.player);g.player.vy=0;g.raceStarted=false;')
  page.keyboard.down('w');page.keyboard.down('x');step(.5);data=run('return {up:g.desiredPlayer().up,fwd:g.desiredPlayer().forward,shots:g.projectiles.length,vy:g.player.vy};');check('W+X moves/descends without Ctrl or involuntary shots',data['up']==-1 and data['fwd']==1 and data['shots']==0 and data['vy']<0,data)
  page.keyboard.up('x');page.keyboard.up('w');step(1);check('Released altitude input brakes instead of sticking',run('return Math.abs(g.player.vy)<.7;'))
  # Optional route ring needs a real nearby crossing, not distance only or teleport.
  check('Optional wind ring detects a short segment through its opening',run('const r=g.director.rings[0],a={x:r.x-r.normal.x,y:r.y,z:r.z-r.normal.z},b={x:r.x+r.normal.x,y:r.y,z:r.z+r.normal.z};return E.crossesRing(a,b,r);'))
  check('Missing the ring or teleporting cannot earn the crossing reward',run('const r=g.director.rings[0];return !E.crossesRing({x:r.x-r.normal.x*30,y:r.y,z:r.z-r.normal.z*30},{x:r.x+r.normal.x*30,y:r.y,z:r.z+r.normal.z*30},r);'))
  run('g.finish(g.bodies[1]);');check('An AI finishing does not abort the user’s unfinished route',run('return !g.ended&&g.bodies[1].finish;'))
  check('Ctrl browser modifiers clear held game actions',run("g.input.keys.add('KeyW');g.input.left=true;document.body.dispatchEvent(new KeyboardEvent('keydown',{code:'ControlLeft',key:'Control',ctrlKey:true,bubbles:true}));return g.input.keys.size===0&&!g.input.left;"))
  check('No desktop runtime errors',not errors,errors)
  ctx.close()
  # Independent touch checks, smaller Safari-style viewport and real GUI visibility.
  ctx=browser.new_context(viewport={'width':430,'height':744},device_scale_factor=1,is_mobile=True,has_touch=True);page=ctx.new_page();errs=[];page.on('pageerror',lambda e:errs.append(str(e)));load(page)
  page.evaluate("async()=>{window.g=__summit.game;window.P=await import(__mods['physics.js']);g.reset(true);g.renderer.shadowMap.enabled=false;g.player.y=320;P.inflate(g.player);g.player.vy=0;g.raceStarted=false;g.cameraReady=false;g.render(.016);}")
  cdp=ctx.new_cdp_session(page)
  def center(id):
   b=page.locator('#'+id).bounding_box();return b['x']+b['width']/2,b['y']+b['height']/2
  lx,ly=center('moveStick');rx,ry=center('aimStick');ux,uy=center('upBtn')
  cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':lx,'y':ly-27,'id':1},{'x':rx,'y':ry-20,'id':2}]});step(.3)
  check('Touch inner aim + independent movement do not shoot',run('return g.input.move[1]<0&&!g.input.ring&&g.player.ammo===64;'))
  cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':lx,'y':ly-27,'id':1},{'x':rx,'y':ry-61,'id':2}]});step(.3)
  check('Outer aim ring fires without releasing the moving thumb',run('return g.input.move[1]<0&&g.input.ring&&g.player.ammo<64;'))
  cdp.send('Input.dispatchTouchEvent',{'type':'touchCancel','touchPoints':[]});check('Cancelled touches clear movement and fire',run('return !g.input.ring&&g.input.move[1]===0;'))
  cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':ux,'y':uy,'id':3}]});check('Ascent remains immediate on touch',run('return g.input.up===1;'));cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});check('Release neutralises ascent',run('return g.input.up===0;'))
  check('Mobile has no desktop keyboard/mouse clutter',not page.locator('#keyboardHUD').is_visible() and not page.locator('#mouseHUD').is_visible())
  for w,h in [(430,744),(430,932),(932,430),(375,667)]:
   page.set_viewport_size({'width':w,'height':h});run('g.render(.016)');boxes={x:page.locator('#'+x).bounding_box() for x in ['objectiveCard','flightHUD','moveStick','aimStick','upBtn','downBtn','ammoPanel']}
   check(f'{w}x{h}: current task, instruments and flight controls fit viewport',all(b and b['x']>=0 and b['y']>=0 and b['x']+b['width']<=w+1 and b['y']+b['height']<=h+1 for b in boxes.values()),boxes)
  page.set_viewport_size({'width':430,'height':932});run('g.render(.016)');page.screenshot(path=str(OUT/'flight-mobile.png'))
  page.click('#guideButton');check('Mobile guide opens without a keyboard',page.locator('#guideScreen').is_visible());page.click('#guideClose');check('Mobile guide closes safely',run('return g.playing();'))
  check('No mobile runtime exceptions',not errs,errs);ctx.close();browser.close()
except Exception as e:
 print(traceback.format_exc(),flush=True);check('Test runner completes without exception',False,str(e))
finally:
 report={'version':'0.6.0','environment':'Actual production logic and WebGL renderer. Only imports/assets rebased to local blob URLs; Chromium SwiftShader/Xvfb. Mouse/key events and emulated touch, not physical iPhone/Safari. Route steering scripted, supply collection and gum-to-mouth/bubble gestures use real controls. Combat screenshots use controlled scenes.','passed':sum(x['pass'] for x in results),'total':len(results),'results':results}
 (OUT/'qa060.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(report['passed'],'/',report['total'],flush=True)
 sys.exit(0 if report['passed']==report['total'] else 1)
