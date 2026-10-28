#!/usr/bin/env python3
"""Validate the unchanged production bundle inside the offline distribution."""
import json, math, pathlib, sys, time, traceback, os
from playwright.sync_api import sync_playwright
ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'verification'; OUT.mkdir(exist_ok=True)
report={'version':'4.3.15','checks':[],'errors':[],'requests':[],
        'limitations':['Desktop Chromium with software WebGL; no real mobile-hardware performance claim.','Directional checks use frozen opponents, manual frame stepping and native keyboard events.','The un-captured mouse fallback is exercised here; the matching bundle has separate prior native XTest coverage.','This managed Chromium blocks file:// navigation, so Playwright supplies the exact standalone HTML as one intercepted document on a local test origin; all network access stays disabled.']}
def check(ok,name,detail=None):
    report['checks'].append({'name':name,'passed':bool(ok),'detail':detail})
    print(('PASS ' if ok else 'FAIL ')+name, flush=True)
    if not ok: raise AssertionError(name+': '+str(detail))
FRAMES="""count=>{const g=window.frogArcade,render=g.renderer.render;let peak=0;try{for(let i=0;i<count;i++){g.renderer.render=i===count-1?render:()=>{};g.frame(g.last+1000/60+.001);peak=Math.max(peak,g.state.actors[0].height);}}finally{g.renderer.render=render;}return peak;}"""
FIXTURE="""({view,yaw})=>{const g=window.frogArcade;g.clearInputs();g.releaseMouseLook();g.clearEffects();g.state=structuredClone(window.qaFresh);const p=g.state.actors[0];g.state.phase='battle';g.state.intro=0;g.state.time=30;Object.assign(p,{x:0,z:6,height:0,face:yaw,aimX:Math.sin(yaw),aimZ:Math.cos(yaw),poseAimYaw:yaw,tongue:9999});for(const a of g.state.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});for(const guard of g.state.guards||[])Object.assign(guard,{health:0,mode:'gone'});g.state.flies.forEach(f=>f.wait=9999);g.viewMode=view;g.cameraYaw=yaw;g.cameraPitch=.2;g.mouseControl=true;g.aim={x:Math.sin(yaw),z:Math.cos(yaw)};g.cameraReady=false;g.shake=0;g.buildActors();g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu');g.$('arcade-hud').hidden=false;g.accumulator=0;g.calloutUntil=-1;g.updateCameraPose(0);g.$('view-button').textContent=view==='overview'?'ΚΑΤΟΨΗ · C':'ΠΙΣΩ 3D · C';g.updateHUD();document.activeElement?.blur?.();}"""
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage'])
  report['browser']=browser.version
  context=browser.new_context(viewport={'width':1280,'height':800},device_scale_factor=1,offline=True)
  context.add_init_script("""localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,touchFireMode:'manual'}));HTMLCanvasElement.prototype.requestPointerLock=function(){return Promise.reject(new Error('package QA: testing no-capture fallback'));};""")
  page=context.new_page();page.set_default_timeout(30000)
  page.on('pageerror',lambda e:report['errors'].append(str(e)))
  page.on('request',lambda r:report['requests'].append(r.url))
  document_url='http://127.0.0.1:4179/PLAY-OFFLINE.html?test=1'
  page.route(document_url,lambda route:route.fulfill(status=200,content_type='text/html; charset=utf-8',body=(ROOT/'PLAY-OFFLINE.html').read_text()))
  page.goto(document_url,wait_until='load',timeout=90000)
  page.wait_for_function("window.__FROG__?.version==='4.3.15'",timeout=90000)
  check(True,'Standalone HTML starts FROG 4.3.15 with network disabled and document supplied by test harness')
  page.evaluate("const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=structuredClone(g.state);")
  page.locator('#new-round-button').click();page.evaluate(FRAMES,3)
  check(page.evaluate("window.frogArcade.running"),'New Round starts the full game')
  check(page.evaluate("window.frogArcade.state.actors[0].ammo===90 && window.frogArcade.state.guards.length===3 && window.frogArcade.state.catapults.length===3"),'Full arena has 90-capacity frogs, three guards and three catapults')
  for yaw in [0,math.pi/2,math.pi,-math.pi/2]:
   for key in ['w','a','s','d']:
    page.evaluate(FIXTURE,{'view':'overview','yaw':yaw});page.evaluate(FRAMES,2)
    before=page.evaluate("const g=window.frogArcade,p=g.state.actors[0];window.qaCamera=g.camera.clone();window.qaInitial={x:p.x,z:p.z};window.qaProjected=g.focus.clone().set(p.x,g.ground(p.x,p.z),p.z).project(qaCamera);({x:p.x,z:p.z})")
    page.keyboard.down(key);peak=page.evaluate(FRAMES,12);page.keyboard.up(key)
    moved=page.evaluate("const g=window.frogArcade,p=g.state.actors[0],q=g.focus.clone().set(p.x,g.ground(p.x,p.z),p.z).project(qaCamera);({dx:p.x-qaInitial.x,dz:p.z-qaInitial.z,sx:q.x-qaProjected.x,sy:-(q.y-qaProjected.y)})")
    ok={'w':moved['sy']<-.002,'s':moved['sy']>.002,'a':moved['sx']<-.002,'d':moved['sx']>.002}[key]
    check(ok and peak>.2,f'Offline overview {key.upper()} moves correctly at prior facing {yaw:.2f}',moved)
  page.evaluate(FIXTURE,{'view':'chase3d','yaw':math.pi});page.evaluate(FRAMES,20)
  page.mouse.move(640,400);page.evaluate(FRAMES,2)
  start=page.evaluate('window.frogArcade.cameraYaw')
  page.mouse.move(760,400);page.evaluate(FRAMES,24)
  after=page.evaluate("const g=window.frogArcade;({yaw:g.cameraYaw,reticle:g.currentAimReticle&&{x:g.currentAimReticle.x,y:g.currentAimReticle.y},body:g.models[0].group.rotation.y,aim:Math.atan2(g.state.actors[0].aimX,g.state.actors[0].aimZ)})")
  delta=math.atan2(math.sin(after['yaw']-start),math.cos(after['yaw']-start))
  check(abs(delta+.48)<.02,'Offline third-person mouse rotates camera exactly once',{'delta':delta})
  body_delta=math.atan2(math.sin(after['body']-after['aim']),math.cos(after['body']-after['aim']))
  check(after['reticle']=={'x':640,'y':400} and abs(body_delta)<.03,'Offline third-person body, reticle and firing aim align',after)
  page.keyboard.press('c');page.evaluate(FRAMES,3)
  check(page.evaluate("window.frogArcade.viewMode==='overview'"),'C changes from third-person to overview after rotation')
  page.keyboard.press('Escape');check(page.evaluate("!window.frogArcade.running"),'Pause works in standalone file')
  page.locator('#play-button').click();page.evaluate(FRAMES,3)
  check(page.evaluate("window.frogArcade.running && window.frogArcade.viewMode==='overview'"),'Resume preserves overview')
  check(page.evaluate("!!localStorage.getItem('frog-arcade-save-v1')"),'Offline save is written in this Chromium profile')
  page.evaluate(FIXTURE,{'view':'overview','yaw':math.pi});page.evaluate(FRAMES,2)
  page.screenshot(path=str(OUT/'offline-overview.png'))
  page.evaluate(FIXTURE,{'view':'chase3d','yaw':math.pi});page.evaluate(FRAMES,3)
  page.screenshot(path=str(OUT/'offline-third-person.png'))
  remote=[u for u in report['requests'] if u.startswith(('http://','https://')) and u!=document_url]
  check(not remote,'Standalone needs no HTTP or HTTPS resources beyond its inline document',remote)
  check(not report['errors'],'No standalone browser runtime errors',report['errors'])
  context.close();browser.close()
except Exception:
 report['errors'].append(traceback.format_exc());print(report['errors'][-1],flush=True)
finally:
 report['ok']=not report['errors'] and all(c['passed'] for c in report['checks'])
 (OUT/'package-browser-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'ok':report['ok'],'checks':len(report['checks']),'errors':len(report['errors'])}),flush=True)
 sys.exit(0 if report['ok'] else 1)
