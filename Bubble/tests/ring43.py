"""Production WebGL + real Chromium CDP touches. No input or physics mocks.
Use BUBBLE_VIEWPORT=430x744 to run a single viewport.
"""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_harness import load
OUT=Path(os.getenv('BUBBLE_TEST_OUTPUT',str(Path(__file__).parent/'ring43-reports')));OUT.mkdir(parents=True,exist_ok=True)
results=[]
def check(name,ok,data=None):
 results.append(dict(name=name,passed=bool(ok),data=data));print(('PASS ' if ok else 'FAIL ')+name+(' '+str(data) if not ok else ''),flush=True)
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path=os.getenv('CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 views=[tuple(map(int,os.environ['BUBBLE_VIEWPORT'].split('x')))] if os.getenv('BUBBLE_VIEWPORT') else [(430,744),(430,932),(932,430),(375,667)]
 for w,h in views:
  label=f'{w}x{h}';ctx=browser.new_context(viewport={'width':w,'height':h},has_touch=True,is_mobile=True,device_scale_factor=1);page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));load(page);cdp=ctx.new_cdp_session(page);pts={}
  def run(code):return page.evaluate('()=>{const g=__bubble.game;'+code+'}')
  def step(t):return run(f'return __bubble.step({t});')
  def center(id):
   r=page.locator('#'+id).bounding_box();return r['x']+r['width']/2,r['y']+r['height']/2
  def send(kind):cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':list(pts.values())})
  def down(id,i,dx=0,dy=0):
   x,y=center(id);pts[i]=dict(id=i,x=x+dx,y=y+dy);send('touchStart')
  def move(id,i,dx=0,dy=0):
   x,y=center(id);pts[i]=dict(id=i,x=x+dx,y=y+dy);send('touchMove')
  def aim(i,r,axis='up',start=False):
   R=page.locator('#aimStick').bounding_box()['width']/2;d={'up':(0,-1),'right':(1,0),'down':(0,1),'left':(-1,0)}[axis];(down if start else move)('aimStick',i,d[0]*r*R,d[1]*r*R)
  def up(i):
   t=pts.pop(i,None)
   if t:cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[t]})
  def allup():
   if pts:pts.clear();send('touchEnd')
  def tap(id,i=9):down(id,i);up(i)
  def reset():
   allup();run("__bubble.start();g.aiDisabled=true;g.god=true;g.tool='splat';g.form='mass';g.testAim=null;g.refreshTools();g.renderer.resize('low');g.render();")
  def guard():run("g.knights=g.knights.slice(0,1);const a=g.knights[0];a.p=[0,0,18];a.home=a.p.slice();a.route=[a.p.slice()];a.yaw=0;g.render();")
  def ck(text,js):check(label+' '+text,run('return '+js+';'))
  reset();ck('actual WebGL 2 0.4.3 boots',"__bubble.version==='0.4.3'&&g.renderer.gl.getParameter(g.renderer.gl.VERSION).includes('WebGL 2')")
  down('moveStick',1,24,0);step(.35);ck('left movement alone never shoots','g.player.p[0]>.6&&g.ammo===180&&g.input.moveActive')
  aim(2,.40,start=True);step(.5);ck('inner aim plus movement is silent','g.player.p[0]>1.5&&g.ammo===180&&g.input.aimActive&&!g.input.ringRequested')
  aim(2,.65);step(.25);ck('full aiming magnitude is available before fire ring','Math.hypot(...g.input.aim)>.99&&g.ammo===180&&!g.input.ringRequested')
  aim(2,.9);step(.65);d=run('return {ammo:g.ammo,x:g.player.p[0],charge:g.charge,ring:g.input.ringRequested,css:document.getElementById("aimStick").classList.contains("firing"),owners:[...g.input.owners.values()].map(x=>x.kind)};')
  check(label+' same finger enters ring and fires without release',173<=d['ammo']<=176 and d['ring'] and d['charge']==0,d);check(label+' ring visually lights on firing',d['css']);check(label+' independent native owners survive crossing',set(d['owners'])=={'move','aim'},d['owners'])
  n=d['ammo'];x=d['x'];aim(2,.5);step(.4);ck('return inside stops shots, not movement or aim',f'g.ammo==={n}&&g.input.aimActive&&g.input.moveActive&&g.player.p[0]>{x+.5}&&!g.twinFire.firing')
  aim(2,.63,axis='right');step(.3);ck('turning at full aim inside remains silent',f'g.ammo==={n}&&g.input.aim[0]>.95')
  aim(2,.87,axis='right');step(.2);n=run('return g.ammo');check(label+' explicit outward reentry resumes',n<d['ammo']);up(2);step(.3);ck('right lift has no queued shot and keeps left',f'g.ammo==={n}&&!g.input.aimActive&&g.input.moveActive')
  aim(2,.45,start=True);step(.2);ck('inner re-grip remains silent',f'g.ammo==={n}&&g.input.moveActive')
  move('moveStick',1,-70,0);x=run('return g.player.p[0]');step(.4);ck('left movement tracks beyond its circle',f'g.player.p[0]<{x-.6}&&g.input.moveActive')
  run("document.getElementById('moveStick').dispatchEvent(new PointerEvent('lostpointercapture',{bubbles:true,pointerType:'touch',pointerId:2}));document.getElementById('moveStick').dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerType:'touch',pointerId:2}));");ck('unrelated pointer events do not release native owner','g.input.moveActive&&g.input.aimActive')
  reset();guard();down('moveStick',1,20,0);aim(2,.86,start=True);step(.2);down('fireBtn',3);n=run('return g.ammo');step(.8);ck('manual charge exclusively owns ammo without stopping movement',f'g.ammo==={n}&&g.charge>.7&&g.input.moveActive&&g.player.p[0]>1.2');up(2);step(.2);ck('lifting aim does not cancel separate charge','g.fireDown&&g.charge>.9&&g.input.moveActive');up(3);ck('charge releases once with left still held',f'g.ammo<{n}&&!g.fireDown&&g.input.moveActive')
  reset();down('moveStick',1,20,0);aim(2,.9,start=True);step(.2);n=run('return g.ammo');run("const o=[...g.input.owners.values()].find(o=>o.kind==='aim');document.getElementById('aimStick').dispatchEvent(new TouchEvent('touchcancel',{bubbles:true,cancelable:true,changedTouches:[new Touch({identifier:o.id,target:o.el,clientX:o.last[0],clientY:o.last[1]})]}));");step(.25);ck('single right cancellation leaves left intact and stops fire',f'g.ammo==={n}&&!g.input.ringRequested&&g.input.moveActive')
  reset();run('g.ammo=2;');down('moveStick',1,20,0);aim(2,.86,start=True);step(.5);ck('empty tank reloads without ending contacts','g.reloadTime>0&&g.input.moveActive&&g.input.aimActive');aim(2,.5);step(1.9);ck('returning inside during reload prevents autofire resumption','g.ammo===180&&g.reloadTime===0&&!g.input.ringRequested');aim(2,.9);step(.3);ck('fresh ring entry fires after reload','g.ammo<180')
  reset();run("g.tool='flow';g.testAim=[0,0,22];g.refreshTools();");aim(2,.45,start=True);step(.3);ck('FLOW inner aim creates no material','g.volume.values.size===0&&!g.fireDown&&!g.twinFire.toolActive');aim(2,.88);step(.5);n=run('return g.volume.revision');ck('FLOW outer ring creates volume without spending tank','g.volume.values.size>0&&g.ammo===180&&g.twinFire.toolActive&&!g.fireDown');aim(2,.5);step(.3);ck('FLOW stops on returning inside',f'g.volume.revision==={n}&&!g.twinFire.toolActive')
  reset();aim(2,.86,start=True);step(.1);tap('modeBtn');step(.1);ck('switching tool with held ring starts no new action',"g.tool==='flow'&&!g.input.ringRequested&&!g.twinFire.toolActive");aim(2,.85);step(.1);ck('changed tool stays disarmed outside','!g.twinFire.toolActive');aim(2,.5);aim(2,.9);step(.3);ck('changed tool rearms after inward then outward gesture','g.twinFire.toolActive')
  reset();run("g.tool='erase';g.testAim=[0,1,22];g.volume.stamp([0,1,22],[1,1,1],3);g.refreshTools();");aim(2,.5,start=True);n=run('return g.volume.revision');step(.3);ck('ERASE inner aim does not delete gum',f'g.volume.revision==={n}');aim(2,.9);step(.4);ck('ERASE outer ring removes actual material',f'g.volume.revision>{n}&&g.ammo===180')
  reset();run("g.tool='strand';g.refreshTools();");aim(2,.9,start=True);step(.2);ck('STRAND does not repeatedly toggle connections','!g.twinFire.firing&&!g.twinFire.toolActive&&g.tethers.links.length===0&&g.ammo===180')
  reset();run("g.cameraMode='fp';g.player.yaw=Math.PI;g.refreshTools();g.render();");down('moveStick',1,0,-20);aim(2,.63,axis='right',start=True);step(.25);ck('FPS movement and fast look remain silent inside','g.ammo===180&&g.player.p[2]<26.8&&g.player.yaw<Math.PI-.25');aim(2,.9,axis='right');step(.2);ck('FPS outer ring fires with the same finger','g.ammo<180&&g.input.moveActive&&g.charge===0')
  reset();down('moveStick',1,20,0);aim(2,.9,start=True);step(.1);tap('pauseBtn');n=run('return g.ammo');step(.2);ck('pause clears ownership and ring request',f'g.paused&&g.input.owners.size===0&&!g.input.ringRequested&&g.ammo==={n}');allup();page.locator('#resume').click();step(.15);ck('resume cannot replay previous trigger',f'g.playing()&&!g.input.aimActive&&g.ammo==={n}')
  reset();events=run("return ['selectstart','contextmenu','dragstart','copy','cut','paste'].map(t=>!document.getElementById('hpText').dispatchEvent(new Event(t,{bubbles:true,cancelable:true})));");check(label+' selection and clipboard guards remain enabled',all(events),events);ck('ring labels cannot select text or steal touches',"['ringCaption','aimStick'].every(id=>getComputedStyle(document.getElementById(id)).userSelect==='none')&&getComputedStyle(document.getElementById('ringCaption')).pointerEvents==='none'")
  tap('bagBtn');check(label+' BAG works',page.locator('#inventory').is_visible());page.locator('#closeBag').tap();ck('BAG close resumes safely','g.playing()')
  reset();down('moveStick',1,22,0);aim(2,.85,start=True);step(.1);n=run('return g.ammo');page.set_viewport_size({'width':w,'height':h-24});step(.2);ck('viewport resize cannot trigger shots or release the left touch',f'g.ammo==={n}&&g.input.moveActive&&g.input.aimActive&&!g.input.ringRequested');allup();page.set_viewport_size({'width':w,'height':h})
  reset();run("g.aiDisabled=false;g.god=false;g.knights=g.knights.slice(0,1);const a=g.knights[0];a.p=[0,0,24];a.home=a.p.slice();a.route=[a.p.slice()];a.yaw=0;a.brain.mode='combat';a.brain.suspicion=1;a.brain.lastKnown=g.player.p.slice();a.cooldown=.01;g.render();")
  down('moveStick',1,15,0);aim(2,.86,axis='right',start=True);xs=[]
  for i in range(6):
   move('moveStick',1,15 if i%2==0 else -15,0);step(.45);xs.append(run('return {x:g.player.p[0],hp:g.player.hp,held:g.input.moveActive,ammo:g.ammo};'))
  check(label+' left movement responds during real enemy fire',all(x['held'] for x in xs) and max(x['x'] for x in xs)-min(x['x'] for x in xs)>.3,xs);check(label+' damage does not cancel either held joystick',min(x['hp'] for x in xs)<100 and xs[-1]['hp']>0 and xs[-1]['held'] and run('return g.input.aimActive;'),xs[-1]);allup();reset()
  run('g.player.pathOn=true;g.refreshTools();g.render();')
  def layout():return run("const ids=['moveStick','aimStick','jumpBtn','gaitBtn','pathBtn','gripBtn','gradeBtn','fireBtn','modeBtn','zoneBtn','useBtn','reloadBtn'];const a=ids.map(id=>{const r=document.getElementById(id).getBoundingClientRect();return{id,x:r.x,y:r.y,w:r.width,h:r.height}}),over=[];for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){const p=a[i],q=a[j];if(Math.min(p.x+p.w,q.x+q.w)-Math.max(p.x,q.x)>1&&Math.min(p.y+p.h,q.y+q.h)-Math.max(p.y,q.y)>1)over.push([p.id,q.id]);}return {over,off:a.filter(r=>r.x<0||r.y<0||r.x+r.w>innerWidth+1||r.y+r.h>innerHeight+1),small:a.filter(r=>r.w<44||r.h<44),center:a.filter(r=>r.x<innerWidth*.55&&r.x+r.w>innerWidth*.45&&r.y>innerHeight*.5)};")
  d=layout();check(label+' enlarged ring never overlaps action targets',not d['over'],d['over']);check(label+' controls fit viewport',not d['off'],d['off']);check(label+' targets are at least 44px',not d['small'],d['small']);check(label+' central action lane remains clear',not d['center'],d['center'])
  if w>h:
   run("document.documentElement.style.setProperty('--safe-l','59px');document.documentElement.style.setProperty('--safe-r','59px');document.documentElement.style.setProperty('--safe-b','21px');");d=layout();check(label+' notch/home-indicator safe insets fit',not d['over'] and not d['off'],d)
  check(label+' no JavaScript exceptions',not errors,errors)
  if (w,h)==(430,744):
   reset();guard();run("g.player.p=[0,0,24];g.knights[0].p=[0,0,15];g.setCamera();g.render();");aim(2,.62,start=True);step(.15);page.screenshot(path=str(OUT/'bubble-0.4.3-inner-aim.png'));aim(2,.9);step(.35);page.screenshot(path=str(OUT/'bubble-0.4.3-outer-fire.png'))
  allup();ctx.close()
 version=browser.version;browser.close()
report={'version':'0.4.3','suite':'outer-fire-ring-production-touch','browser':version,'environment':'Actual WebGL2/SwiftShader and Chromium CDP touch. Controlled guard scenes. Not physical iPhone or Safari.','passed':sum(r['passed'] for r in results),'total':len(results),'results':results};(OUT/'ring-touch-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(f"{report['passed']}/{report['total']} passed",flush=True)
if report['passed']!=report['total']:raise SystemExit(1)
