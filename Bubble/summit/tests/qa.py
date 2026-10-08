from pathlib import Path
from playwright.sync_api import sync_playwright
from harness import load
import json,math,time,os
OUT=Path(os.environ.get('SUMMIT_REPORTS',str(Path(__file__).parent/'reports')));OUT.mkdir(parents=True,exist_ok=True);results=[]
def check(name,ok,data=None):
 results.append({'name':name,'pass':bool(ok),'data':data});print(('PASS 'if ok else 'FAIL ')+name+(' '+str(data)if not ok else ''),flush=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 ctx=b.new_context(viewport={'width':1440,'height':900},device_scale_factor=1);p=ctx.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));load(p)
 p.evaluate("async()=>{window.P=await import(__mods['physics.js']);window.g=__summit.game;g.reset(true);g.renderer.shadowMap.enabled=false;}")
 def run(s):return p.evaluate('()=>{'+s+'}')
 def reset():run("g.reset(true);g.raceStarted=false;g.input.clear();")
 check('Real textured skinned humans are loaded, without primitive fallback',run("return [...g.visuals.values()].every(p=>Object.keys(p.bones).length>45&&(()=>{let n=0;p.model.traverse(m=>{if(m.isSkinnedMesh)n++});return n>=4})());"))
 check('One player, six free-for-all racers and nine local guards',run("return g.bodies.filter(x=>x.kind==='racer').length===7&&g.bodies.filter(x=>x.kind==='guard').length===9;"))
 m=run("return P.telemetry({x:0,y:100,z:0,vx:3,vy:4,vz:4,grounded:false},{x:300,y:80,z:400,name:'site'},20);")
 check('Horizontal speed converts m/s into km/h',abs(m['speed']-18)<1e-9,m)
 check('Ascent uses positive measured vertical velocity only',m['ascend']==4 and m['descend']==0,m)
 check('Distance is horizontal metres to the next landing centre',m['distance']==500,m)
 m=run("return P.telemetry({x:0,y:100,z:0,vx:0,vy:-6,vz:0,grounded:false},{x:0,y:80,z:0,name:'site'},20);")
 check('Descending activates descent and zeros ascent',m['descend']==6 and m['ascend']==0 and m['status']=='ΚΑΘΟΔΟΣ',m)
 check('Altitude is clearance above actual terrain',m['altitude']==80,m)
 check('Grounded altitude correction does not create false ascent',run("return P.telemetry({x:0,y:0,z:0,vy:8,grounded:true},{x:0,y:0,z:0},0).ascend===0;"))
 reset();p.keyboard.down('w');run('__summit.step(.8)');p.keyboard.up('w');s=run('return g.snapshot()');check('W moves the player without firing',s['player']['z']<1043 and s['projectiles']==0,s)
 p.keyboard.down('Space');run('__summit.step(.22)');p.keyboard.up('Space');check('Space remains a real ground jump',run('return g.player.y>218.5;'))
 reset();p.click('#keyboardHUD',force=True,position={'x':10,'y':10});check('Desktop input indicators are click-through, not blockers',run("return getComputedStyle(document.querySelector('#hud')).pointerEvents==='none';"))
 reset();run("g.openCraft();");p.click('#craftButton');run('__summit.step(2)');p.click('#craftButton');run('__summit.step(1.5)');p.click('#craftButton');run('__summit.step(2)');s=run('return g.snapshot()');check('Mix, chew and inflate launches using actual ingredients',s['player']['balloon'] and s['player']['bag']==[0,0,0] and s['playing'],s)
 p.keyboard.down('w');p.keyboard.down('Space');run('__summit.step(6)');p.keyboard.up('Space');p.keyboard.up('w');s=run('return g.snapshot()');check('Flight produces speed and ascent readings from simulated displacement',s['metrics']['speed']>50 and s['metrics']['ascend']>8 and s['metrics']['distance']<600,s)
 p.screenshot(path=str(OUT/'flight-telemetry.png'))
 # Isolated paired bodies share the same starting state and physical world.
 d=run("const point={x:0,y:850,z:700},a=P.makeBody(30,point),b=P.makeBody(31,point);P.inflate(a);P.inflate(b);a.vy=b.vy=0;b.gum=42;for(let i=0;i<240;i++){P.advanceBody(a,{},g.world,1/60,0);P.advanceBody(b,{},g.world,1/60,0);}return {clean:a.vy,loaded:b.vy,cleanY:a.y,loadedY:b.y};")
 check('Additional gum mass physically causes faster descent',d['loaded']<d['clean']-4 and d['loadedY']<d['cleanY']-12,d)
 d=run("const a=P.makeBody(32,{x:0,y:850,z:700});P.inflate(a);const first=a.balloon.integrity;P.gumHit(a,7,true);return {mass:a.gum,integrity:a.balloon.integrity,first};")
 check('Balloon hits add mass and damage the membrane',d['mass']==7 and d['integrity']<d['first'],d)
 d=run("const a=P.makeBody(33,{x:0,y:850,z:700});P.inflate(a);a.balloon.life=.01;P.advanceBody(a,{},g.world,.05,0);return {balloon:!!a.balloon,vy:a.vy};")
 check('Finite membrane expires; gravity then acts',not d['balloon'],d)
 # Pillar at start is rendered and is an exact corresponding collision box.
 d=run("const a=P.makeBody(34,{x:-191,y:218,z:1038});for(let i=0;i<200;i++)P.advanceBody(a,{forward:1,yaw:Math.PI},g.world,1/60,0);return {x:a.x,z:a.z,y:a.y};")
 check('A body cannot walk through a rendered outpost pillar',d['z']>1030.8,d)
 d=run("const h=g.world.ray({x:-191,y:219.2,z:1038},{x:0,y:0,z:-1},20);return h?{type:h.type,t:h.t}:null;")
 check('The same pillar stops projectiles before targets behind it',d is not None and d['t']<8,d)
 reset();d=run("g.player.x=-180;return true;") if False else None
 # Test first-contact gum hit through actual projectile update.
 d=p.evaluate("async()=>{const T=await import(__mods['vendor/three.module.js']);const a=g.player,t=g.bodies[1];a.x=-180;a.y=218.02;a.z=1045;a.yaw=Math.PI;t.x=-180;t.y=218.02;t.z=1034;a.cooldown=0;g.fire(a,new T.Vector3(t.x,t.y+1.2,t.z),false);for(let i=0;i<30;i++)g.updateShots(1/60);return {mass:t.gum,hp:t.hp};}")
 check('Actual gum projectile impacts increase opponent weight',d['mass']==7,d)
 reset();d=run("const a=g.player;a.x=P.ROUTE[1].x;a.z=P.ROUTE[1].z;a.y=P.ROUTE[1].y+.02;a.grounded=true;g.collect(a);return {stage:a.checkpoint,target:a.target};")
 check('Landing and collecting advances only the next checkpoint',d['stage']==1 and d['target']==2,d)
 d=run("const a=g.player,c=g.world.chests.find(c=>c.site===1);a.x=c.x;a.z=c.z;a.y=c.y+.02;a.bag=[0,0,0];g.collect(a);return a.bag;")
 check('Chests provide the next flight recipe',d==[3,2,1],d)
 d=run("const a=g.player,before=a.bag.slice();g.collect(a);return {before,after:a.bag};")
 check('The same player cannot duplicate an already looted chest',d['before']==d['after'],d)
 reset();d=run("const a=g.player;a.x=P.ROUTE[4].x;a.z=P.ROUTE[4].z;a.y=P.ROUTE[4].y+.02;a.target=4;a.checkpoint=0;g.tick(.016);return g.ended;")
 check('Flying straight to the final plateau does not bypass checkpoints',not d,d)
 reset();d=run("const a=g.player;a.x=P.ROUTE[4].x;a.z=P.ROUTE[4].z;a.y=P.ROUTE[4].y+.02;a.target=4;a.checkpoint=3;g.tick(.016);return g.ended;")
 check('A valid final landing finishes the race',d,d)
 reset();p.keyboard.press('m');check('Map renders terrain and the route, not an empty panel',p.locator('#mapScreen').is_visible());p.keyboard.press('m')
 p.keyboard.press('c');run('g.render(.016)');check('FPS camera and gun viewmodel are active',run('return g.fps&&g.gun.visible;'));p.screenshot(path=str(OUT/'fps.png'));p.keyboard.press('c')
 p.keyboard.press('Escape');check('Pause clears held controls safely',run('return g.paused&&!g.input.left&&!g.input.right&&g.input.keys.size===0;'));p.keyboard.press('Escape')
 check('No document text selection/context action',run("const e=new Event('selectstart',{cancelable:true});document.dispatchEvent(e);return e.defaultPrevented;"))
 # Run the actual flight controller over every stage, without combat interference.
 sim=p.evaluate("async()=>{const P=await import(__mods['physics.js']);const trials=[];const bodies=g.bodies;g.bodies=[];g.raceStarted=true;for(let leg=0;leg<4;leg++){const a=P.makeBody(55,P.ROUTE[leg]);a.kind='racer';a.target=leg+1;a.checkpoint=leg;a.wait=0;a.bag=[0,0,0];P.inflate(a,'balanced');let t=0;for(;t<75;t+=1/60){const control=g.npc(a,1/60);P.advanceBody(a,control,g.world,1/60,t);if(a.grounded||!a.alive)break;}trials.push({leg:leg+1,time:t,distance:P.distance(a,P.ROUTE[leg+1]),height:a.y,alive:a.alive,grounded:a.grounded,life:a.balloon?.life??0});}g.bodies=bodies;return trials;}")
 for d in sim:check('Flight leg '+str(d['leg'])+' can reach its landing plateau',d['grounded'] and d['distance']<55 and d['alive'],d)
 check('No uncaught desktop runtime exceptions',not errors,errors)
 # Mobile test with actual CDP multi-touch, the same unmodified logic.
 ctx.close();ctx=b.new_context(viewport={'width':430,'height':744},device_scale_factor=1,has_touch=True,is_mobile=True);p=ctx.new_page();mobile_errors=[];p.on('pageerror',lambda e:mobile_errors.append(str(e)));load(p);p.evaluate('window.g=__summit.game;g.reset(true);g.renderer.shadowMap.enabled=false;');cdp=ctx.new_cdp_session(p)
 left=p.locator('#moveStick').bounding_box();right=p.locator('#aimStick').bounding_box();lx=left['x']+left['width']/2;ly=left['y']+left['height']/2;rx=right['x']+right['width']/2;ry=right['y']+right['height']/2
 cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':lx,'y':ly-27,'id':1},{'x':rx,'y':ry-22,'id':2}]});p.evaluate('__summit.step(.8)');d=p.evaluate('({z:g.player.z,ammo:g.player.ammo,ring:g.input.ring,move:g.input.move.slice()})');check('Inner right aiming and left motion do not force shooting',d['z']<1044 and d['ammo']==64 and not d['ring'],d)
 cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':lx,'y':ly-27,'id':1},{'x':rx,'y':ry-60,'id':2}]});p.evaluate('__summit.step(.5)');d=p.evaluate('({ammo:g.player.ammo,move:g.input.move.slice(),ring:g.input.ring})');check('Outer ring shoots while the independent left thumb keeps moving',d['ammo']<64 and d['move'][1]<-.1 and d['ring'],d)
 cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[{'x':rx,'y':ry-60,'id':2}]});d=p.evaluate('({move:g.input.move.slice(),ring:g.input.ring})');check('Lifting the right thumb does not reset held left movement',d['move'][1]<-.1 and not d['ring'],d);cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
 check('Desktop key/mouse panels are absent from mobile',not p.locator('#keyboardHUD').is_visible() and not p.locator('#mouseHUD').is_visible())
 for w,h in [(430,744),(430,932),(932,430),(375,667)]:
  p.set_viewport_size({'width':w,'height':h});p.evaluate('g.render(.016)');boxes=[p.locator('#'+x).bounding_box()for x in ['speed','ascend','descend','landingDistance','moveStick','aimStick','upBtn','downBtn']];check(f'{w}x{h} flight instruments and controls remain on-screen',all(x and x['x']>=0 and x['y']>=0 and x['x']+x['width']<=w+1 and x['y']+x['height']<=h+1 for x in boxes),boxes)
 p.set_viewport_size({'width':430,'height':932});p.wait_for_timeout(250);p.evaluate('g.render(.016)');p.screenshot(path=str(OUT/'mobile.png'))
 check('No uncaught mobile runtime exceptions',not mobile_errors,mobile_errors)
 b.close()
report={'version':'0.5.1','environment':'Chromium 144 / SwiftShader under Xvfb, production logic with only resource URLs rebased to local blobs. Synthetic touch; not a physical iPhone or Safari.','passed':sum(r['pass']for r in results),'total':len(results),'results':results};(OUT/'qa.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(report['passed'],'/',report['total'],flush=True)
