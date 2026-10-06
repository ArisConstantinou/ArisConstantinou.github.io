"""0.4.2 acceptance: production WebGL + CDP multi-touch.
Run under xvfb-run. Explicit event injections test resilience, not physical iOS.
"""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_harness import load
OUT=Path(os.getenv('BUBBLE_TEST_OUTPUT',str(Path(__file__).parent/'touch42-reports')));OUT.mkdir(parents=True,exist_ok=True)
results=[]
def check(name,ok,data=None):
 results.append({'name':name,'pass':bool(ok),'data':data});print(('PASS ' if ok else 'FAIL ')+name+(' '+str(data) if not ok else ''),flush=True)
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=os.getenv('CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 views=[tuple(map(int,os.environ['BUBBLE_VIEWPORT'].split('x')))] if os.getenv('BUBBLE_VIEWPORT') else [(430,744),(430,932),(932,430),(375,667)]
 for w,h in views:
  name=f'{w}x{h}';ctx=b.new_context(viewport={'width':w,'height':h},has_touch=True,is_mobile=True,device_scale_factor=1);page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));load(page);cdp=ctx.new_cdp_session(page);pts={}
  def run(code):return page.evaluate('()=>{const g=__bubble.game;'+code+'}')
  def step(t):return run(f'return __bubble.step({t});')
  def center(id):
   r=page.locator('#'+id).bounding_box();return r['x']+r['width']/2,r['y']+r['height']/2
  def event(kind):cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':list(pts.values())})
  def down(id,i,dx=0,dy=0):
   x,y=center(id);pts[i]={'id':i,'x':x+dx,'y':y+dy};event('touchStart')
  def move(id,i,dx=0,dy=0):
   x,y=center(id);pts[i]={'id':i,'x':x+dx,'y':y+dy};event('touchMove')
  def up(i):
   ended=pts.pop(i,None)
   if ended:cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[ended]})
  def allup():
   if pts:pts.clear();event('touchEnd')
  def tap(id,i=9):down(id,i);up(i)
  def reset():
   allup();run("__bubble.start();g.renderer.resize('low');g.aiDisabled=true;g.god=true;g.testAim=null;g.tool='splat';g.form='mass';g.refreshTools();g.render();")
  def guard():run("g.knights=g.knights.slice(0,1);const a=g.knights[0];a.p=[0,0,18];a.home=a.p.slice();a.route=[a.p.slice()];a.yaw=0;g.render();")
  reset();guard();down('moveStick',1,25,0);down('aimStick',2,0,-28);step(.8)
  d=run('return {x:g.player.p[0],ammo:g.ammo,charge:g.charge,owners:[...g.input.owners.values()].map(o=>[o.kind,o.source]),coat:Object.values(g.knights[0].coat).reduce((a,b)=>a+b,0)}')
  check(name+' two held thumbs move AND fire without release',d['x']>1.8 and 172<=d['ammo']<=176 and d['charge']==0,d)
  check(name+' normal autofire uses actual hit regions',d['coat']>0,d['coat'])
  check(name+' separate native touch identifiers own left and right',len(d['owners'])==2 and all(o[1]=='touch' for o in d['owners']),d['owners'])
  before=d['x'];ammo=d['ammo'];up(2);step(.5)
  d=run('return {x:g.player.p[0],ammo:g.ammo,aim:g.input.aimActive}')
  check(name+' right lift stops shooting, not held left movement',d['x']>before+1 and d['ammo']==ammo and not d['aim'],d)
  before=d['x']
  for i in range(2):down('aimStick',2,0,-28);step(.2);up(2);step(.2)
  check(name+' repeated right re-grips preserve stationary left contact',run(f'return g.input.moveActive&&g.player.p[0]>{before+1.8};'))
  move('moveStick',1,-65,0);before=run('return g.player.p[0]');step(.4)
  check(name+' movement tracks outside the visual joystick',run(f'return g.player.p[0]<{before-1}&&g.input.moveActive;'))
  run("document.getElementById('moveStick').dispatchEvent(new PointerEvent('lostpointercapture',{pointerId:2,pointerType:'touch',bubbles:true}));document.getElementById('moveStick').dispatchEvent(new PointerEvent('pointercancel',{pointerId:2,pointerType:'touch',bubbles:true}));")
  before=run('return g.player.p[0]');step(.2)
  check(name+' parallel pointer cancellation cannot end a live native touch',run(f'return g.input.moveActive&&g.player.p[0]<{before-.4};'))
  run("window.dispatchEvent(new Event('blur'));")
  check(name+' visible-page focus changes do not freeze mobile movement',run('return g.playing()&&g.input.moveActive;'))
  tap('zoneBtn');check(name+' third-finger body-region change preserves left',run("return g.zoneName==='arms'&&g.input.moveActive;"))
  tap('modeBtn');check(name+' a held-movement tool tap executes exactly once',run("return g.tool==='flow'&&g.input.moveActive;"))
  reset();guard();down('aimStick',2,0,-28);step(.2);down('moveStick',1,22,0);down('fireBtn',3);ammo=run('return g.ammo');step(.8)
  d=run('return {ammo:g.ammo,charge:g.charge,x:g.player.p[0]}')
  check(name+' charged fire exclusively owns ammo while joysticks stay held',d['ammo']==ammo and d['charge']>.7 and d['x']>1.5,d)
  up(2);step(.2);check(name+' releasing aim never cancels another finger charging',run('return g.fireDown&&g.charge>.9&&g.input.moveActive;'))
  up(3);d=run('return {ammo:g.ammo,fire:g.fireDown,move:g.input.moveActive}');check(name+' charge release fires once without clearing left',d['ammo']<ammo and not d['fire'] and d['move'],d)
  reset();down('moveStick',1,20,0);down('fireBtn',3);step(.5)
  run("const o=[...g.input.owners.values()].find(o=>o.kind==='fire');document.getElementById('fireBtn').dispatchEvent(new TouchEvent('touchcancel',{bubbles:true,cancelable:true,changedTouches:[new Touch({identifier:o.id,target:o.el,clientX:o.last[0],clientY:o.last[1]})]}));")
  check(name+' single-contact trigger cancellation leaves left intact, no shot',run('return g.input.moveActive&&!g.fireDown&&g.ammo===180;'))
  allup();check(name+' left lift zeros movement and removes all owners',run('return !g.input.moveActive&&g.input.move.every(x=>x===0)&&g.input.owners.size===0;'))
  reset();run('g.ammo=2;');down('moveStick',1,20,0);down('aimStick',2,0,-28);step(.6)
  check(name+' empty tank reloads without ending either thumb contact',run('return g.reloadTime>0&&g.input.moveActive&&g.input.aimActive;'))
  step(1.8);d=run('return {ammo:g.ammo,x:g.player.p[0],move:g.input.moveActive}')
  check(name+' autofire resumes after refill with left still moving',170<d['ammo']<180 and d['x']>4 and d['move'],d)
  reset();run("g.tool='flow';g.testAim=[0,0,22];g.refreshTools();");down('aimStick',2,0,-28);step(.4)
  check(name+' aim-only tools do not accidentally create material',run('return g.volume.values.size===0&&!g.fireDown;'))
  down('fireBtn',3);step(.5);check(name+' FLOW still works continuously under FIRE',run('return g.volume.values.size>0&&g.ammo===180;'))
  reset();down('moveStick',1,25,0);down('aimStick',2,0,-28);step(.1);tap('pauseBtn');ammo=run('return g.ammo');step(.4)
  check(name+' deliberate pause clears inputs and stops shooting',run(f'return g.paused&&g.input.owners.size===0&&g.ammo==={ammo};'))
  allup();page.locator('#resume').click();check(name+' resuming cannot replay stale sticks or trigger',run('return g.playing()&&!g.input.aimActive&&!g.input.moveActive&&!g.fireDown;'))
  reset();down('moveStick',1,20,0);down('aimStick',2,0,-28);page.set_viewport_size({'width':w,'height':h-25});step(.3)
  check(name+' browser viewport resize preserves live combat input',run('return g.input.moveActive&&g.input.aimActive&&g.ammo<180&&g.player.p[0]>.5;'))
  allup();page.set_viewport_size({'width':w,'height':h});reset()
  run("g.cameraMode='fp';g.player.yaw=Math.PI;g.refreshTools();g.render();");down('moveStick',1,0,-25);down('aimStick',2,16,0);step(.3)
  check(name+' FPS supports simultaneous movement, look and normal shots',run('return g.player.p[2]<26.5&&g.ammo<180&&g.charge===0;'))
  allup();reset();events=run("return ['selectstart','contextmenu','dragstart','copy','cut','paste'].map(t=>({type:t,blocked:!document.getElementById('hpText').dispatchEvent(new Event(t,{bubbles:true,cancelable:true}))}));")
  check(name+' HUD selection/context/drag/clipboard events blocked',all(e['blocked'] for e in events),events)
  style=run("return ['hpText','toast','moveStick','fireBtn'].map(id=>({id,select:getComputedStyle(document.getElementById(id)).userSelect}));")
  check(name+' nonselectable style covers dynamic labels',all(s['select']=='none' for s in style),style)
  run("const r=document.createRange();r.selectNodeContents(document.getElementById('hpText'));getSelection().addRange(r);");page.wait_for_timeout(50)
  check(name+' residual text selections cleared',run('return getSelection().rangeCount===0;'))
  page.keyboard.press('Control+a');check(name+' document selection shortcuts blocked',run('return getSelection().rangeCount===0;'))
  reset();run("g.aiDisabled=false;g.god=false;g.knights=g.knights.slice(0,1);const a=g.knights[0];a.p=[0,0,24];a.home=a.p.slice();a.yaw=0;a.route=[a.p.slice()];a.brain.mode='combat';a.brain.suspicion=1;a.brain.lastKnown=g.player.p.slice();a.cooldown=.01;g.zoneName='legs';g.render();")
  down('moveStick',1,15,0);down('aimStick',2,28,0);xs=[]
  for n in range(8):
   move('moveStick',1,15 if n%2==0 else -15,0);step(.45);xs.append(run('return {x:g.player.p[0],hp:g.player.hp,held:g.input.moveActive,ammo:g.ammo};'))
  check(name+' movement responds throughout real enemy shooting',all(s['held'] for s in xs) and max(s['x'] for s in xs)-min(s['x'] for s in xs)>.3 and xs[-1]['ammo']<170,xs)
  minhp=min(x['hp'] for x in xs);check(name+' incoming damage does not cancel left joystick',0<minhp<100 and xs[-1]['held'],minhp)
  if (w,h)==(430,744):run('g.render();');page.screenshot(path=str(OUT/'bubble-0.4.2-mobile.png'))
  allup();tap('bagBtn');check(name+' BAG remains usable with document text protected',page.locator('#inventory').is_visible());page.locator('#closeBag').tap();check(name+' closing BAG restores play',run('return g.playing();'))
  check(name+' no page runtime errors',not errors,errors);ctx.close()
 version=b.version;b.close()
report={'version':'0.4.2','browser':version,'environment':'Chromium/SwiftShader under Xvfb; production WebGL and CDP touch, not physical iPhone/Safari','passed':sum(r['pass'] for r in results),'total':len(results),'results':results};(OUT/'touch-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(f"{report['passed']}/{report['total']} passed",flush=True)
if report['passed']!=report['total']:raise SystemExit(1)
