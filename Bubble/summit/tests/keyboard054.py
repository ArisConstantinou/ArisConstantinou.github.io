"""0.5.4 keyboard regression. Run with xvfb-run -a python3 keyboard054.py.
Native keys + synthetic browser shortcuts + emulated touch, local blob assets.
"""
from pathlib import Path
from urllib.parse import urlparse, unquote
from playwright.sync_api import sync_playwright
from harness054 import load
import json, mimetypes, os, sys
ROOT=Path(os.environ.get('SUMMIT_ROOT',str(Path(__file__).resolve().parents[2])))
OUT=Path(os.environ.get('SUMMIT_REPORTS',str(Path(__file__).parent/'keyboard054-reports')))
OUT.mkdir(parents=True,exist_ok=True);results=[]
def check(name,ok,data=None):
 results.append({'name':name,'pass':bool(ok),'data':data});print(('PASS ' if ok else 'FAIL ')+name,flush=True)
def serve(route):
 name=unquote(urlparse(route.request.url).path).removeprefix('/Bubble/')
 file=(ROOT/(name or 'index.html')).resolve()
 if not file.is_relative_to(ROOT.resolve()) or not file.is_file():route.fulfill(status=404,body=name);return
 route.fulfill(path=str(file),content_type=mimetypes.guess_type(file)[0] or 'application/octet-stream')
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 ctx=browser.new_context(viewport={'width':1440,'height':900},device_scale_factor=1);page=ctx.new_page();errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)));print('Loading offline production modules...',flush=True);load(page)
 page.evaluate("async()=>{window.g=__summit.game;window.P=await import(__mods['physics.js']);g.reset(true);g.renderer.shadowMap.enabled=false;}")
 def run(s):return page.evaluate('()=>{'+s+'}')
 def step(t):run(f'for(let t=0;t<{t};t+=1/60)g.tick(1/60);g.updateHUD();')
 def flight():run("g.hands.close(true);g.crafting=g.mapOpen=g.paused=g.ended=false;g.input.clear();g.raceStarted=false;Object.assign(g.player,{x:-180,y:340,z:1045,alive:true,hp:100,gum:0,grounded:false,vx:0,vy:0,vz:0,ammo:64,reload:0,cooldown:0});P.inflate(g.player);g.player.vy=0;g.setCamera(0);g.updateHUD();")
 check('Exact production game boots 0.5.4',run("return __summit.version==='0.5.4'&&g.loaded;"))
 flight();page.keyboard.down('x');step(.8)
 d=run('return {cmd:g.desiredPlayer().up,vy:g.player.vy,hud:document.querySelector("kbd[data-code=KeyX]").classList.contains("pressed")};')
 check('Native X descends and lights the new HUD key',d['cmd']==-1 and d['vy']< -2 and d['hud'],d)
 page.keyboard.up('x');step(.8)
 d=run('return {cmd:g.desiredPlayer().up,vy:g.player.vy,hud:document.querySelector("kbd[data-code=KeyX]").classList.contains("pressed")};')
 check('Releasing X brakes and unlights X',d['cmd']==0 and abs(d['vy'])<.9 and not d['hud'],d)
 for key,prop,sign in [('w','forward',1),('s','forward',-1),('a','side',-1),('d','side',1)]:
  flight();page.keyboard.down(key);page.keyboard.down('x');step(.25)
  d=run('return {...g.desiredPlayer(),ammo:g.player.ammo};')
  check(f'{key.upper()}+X steers and descends without firing',d['up']==-1 and d[prop]==sign and d['ammo']==64,d)
  page.keyboard.up('x');check(f'X release preserves held {key.upper()}',run(f'return g.desiredPlayer().up===0&&g.desiredPlayer().{prop}==={sign};'));page.keyboard.up(key)
 flight();page.keyboard.down('w');page.keyboard.down('d');page.keyboard.down('x');step(.25)
 check('W+D+X diagonal descent',run('const d=g.desiredPlayer();return d.forward===1&&d.side===1&&d.up===-1;'))
 for key in ['w','d','x']:page.keyboard.up(key)
 flight();page.keyboard.down('Space');step(.7);check('Space still ascends',run('return g.player.vy>3&&g.desiredPlayer().up===1;'))
 page.keyboard.down('x');check('Space+X neutral',run('return g.desiredPlayer().up===0;'));page.keyboard.up('Space');check('Space release leaves X descent',run('return g.desiredPlayer().up===-1;'));page.keyboard.up('x')
 for ctrl in ['ControlLeft','ControlRight']:
  flight();page.keyboard.down(ctrl);check(ctrl+' is not a flight command',run('return g.desiredPlayer().up===0&&g.input.keys.size===0;'));page.keyboard.up(ctrl)
 # Synthetic shortcuts exercise handlers without deliberately closing/reloading
 # the test tab or opening browser dialogs. Native browser shortcuts are NOT blocked.
 for code,key,mod in [('KeyW','w','ctrlKey'),('KeyS','s','ctrlKey'),('KeyD','d','ctrlKey'),('KeyR','r','ctrlKey'),('KeyC','c','ctrlKey'),('KeyX','x','ctrlKey'),('KeyF','f','altKey'),('KeyM','m','metaKey'),('KeyR','r','metaKey')]:
  flight();run('g.player.ammo=20;g.input.keys.add("KeyW");g.input.left=g.input.right=true;g.charge=1;')
  d=page.evaluate("a=>{const before={fps:g.fps,ammo:g.player.ammo,shots:g.projectiles.length};const e=new KeyboardEvent('keydown',{key:a.key,code:a.code,[a.mod]:true,bubbles:true,cancelable:true});document.body.dispatchEvent(e);return{before,after:{fps:g.fps,ammo:g.player.ammo,shots:g.projectiles.length},prevented:e.defaultPrevented,keys:g.input.keys.size,charge:g.charge,reload:g.player.reload,map:g.mapOpen,craft:g.crafting,up:g.desiredPlayer().up};}",dict(key=key,code=code,mod=mod))
  check(mod+'+'+key.upper()+' does not also trigger gameplay',d['before']==d['after'] and d['keys']==0 and d['charge']==0 and d['reload']==0 and not d['map'] and not d['craft'] and d['up']==0 and not d['prevented'],d)
 flight();page.evaluate("document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'χ',code:'KeyX',bubbles:true,cancelable:true}));");check('Physical X works with Greek character layout',run('return g.desiredPlayer().up===-1;'));page.keyboard.up('x')
 flight();page.keyboard.down('Shift');page.keyboard.down('w');check('Shift+W sprint retained',run('return g.desiredPlayer().forward===1&&g.desiredPlayer().sprint;'));page.keyboard.up('w');page.keyboard.up('Shift')
 flight();run('g.player.ammo=20;');page.keyboard.press('r');check('R reload retained',run('return g.player.reload>0;'))
 before=run('return g.fps;');page.keyboard.press('c');check('C camera retained',run('return g.fps;')!=before);page.keyboard.press('c')
 page.keyboard.press('m');check('M map opens',run('return g.mapOpen;'));page.keyboard.press('m');check('M map closes',run('return !g.mapOpen;'))
 page.keyboard.down('x');page.keyboard.press('Escape');check('Pause clears X',run('return g.paused&&g.input.keys.size===0;'));page.keyboard.up('x');page.keyboard.press('Escape');check('Resume without stale descent',run('return g.playing()&&g.desiredPlayer().up===0;'))
 flight();run('g.player.y=218.02;g.player.grounded=true;');page.keyboard.press('b');check('B physical gum preparation retained',run('return g.crafting&&g.hands.active;'));page.keyboard.press('Escape');check('Preparation exit resets keyboard',run('return !g.crafting&&g.input.keys.size===0;'))
 check('HUD has X instead of a Ctrl binding',run('return !document.querySelector("kbd[data-code*=Control]")&&document.querySelector("kbd[data-code=KeyX]").textContent.includes("X");'))
 flight();page.keyboard.down('x');page.evaluate("window.dispatchEvent(new Event('blur')); ");check('Focus loss pauses and clears X',run('return g.paused&&g.input.keys.size===0;'));page.keyboard.up('x')
 flight();page.keyboard.down('w');page.keyboard.down('x');step(.6);run('g.render(.016);');page.screenshot(path=str(OUT/'desktop.png'));page.keyboard.up('x');page.keyboard.up('w')
 check('No uncaught desktop exceptions',not errors,errors);ctx.close()
 ctx=browser.new_context(viewport={'width':430,'height':932},device_scale_factor=1,is_mobile=True,has_touch=True);page=ctx.new_page();errs=[]
 page.on('pageerror',lambda e:errs.append(str(e)));load(page)
 page.evaluate("async()=>{window.g=__summit.game;window.P=await import(__mods['physics.js']);g.reset(true);g.renderer.shadowMap.enabled=false;g.player.y=340;P.inflate(g.player);g.player.vy=0;}")
 cdp=ctx.new_cdp_session(page)
 def center(id):
  b=page.locator('#'+id).bounding_box();return b['x']+b['width']/2,b['y']+b['height']/2
 lx,ly=center('moveStick');dx,dy=center('downBtn');ux,uy=center('upBtn')
 cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':lx,'y':ly-25,'id':1},{'x':dx,'y':dy,'id':2}]})
 check('Touch move+down remains independent',run('return g.input.move[1]<0&&g.input.up===-1&&g.desiredPlayer().up===-1;'))
 cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[{'x':dx,'y':dy,'id':2}]})
 check('Releasing down touch preserves move',run('return g.input.up===0&&g.input.move[1]<0;'))
 cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':ux,'y':uy,'id':3}]})
 check('Touch up remains immediate',run('return g.input.up===1;'));cdp.send('Input.dispatchTouchEvent',{'type':'touchCancel','touchPoints':[]});check('Cancelled up touch neutral',run('return g.input.up===0;'))
 check('Desktop keys hidden on touch',not page.locator('#keyboardHUD').is_visible());check('No uncaught mobile exceptions',not errs,errs)
 ctx.close();browser.close()
report={'version':'0.5.4','environment':'Chromium/SwiftShader under Xvfb; production logic with only import/asset URLs rebased to local blobs. Native X/WASD, synthetic modifier shortcut events, emulated touch. Not a physical iPhone/Safari test.','passed':sum(r['pass'] for r in results),'total':len(results),'results':results}
(OUT/'keyboard-0.5.4.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(str(report['passed'])+'/'+str(report['total']),flush=True)
sys.exit(0 if report['passed']==report['total'] else 1)
