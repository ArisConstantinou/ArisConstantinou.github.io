"""Desktop HUD and input-mode regression tests against actual production modules.
Chromium/SwiftShader renders screenshots; CDP supplies native touch events.
BUBBLE_BASELINE optionally points at a clean 0.4.3 directory to reproduce the bug.
"""
import os, json, math
from pathlib import Path
from playwright.sync_api import sync_playwright
import browser_harness as harness
OUT=Path(os.getenv('BUBBLE_TEST_OUTPUT',str(Path(__file__).parent/'desktop44-reports')))
OUT.mkdir(parents=True,exist_ok=True)
results=[]
def check(name,ok,detail=None):
 results.append(dict(name=name,passed=bool(ok),detail=detail))
 print(('PASS ' if ok else 'FAIL ')+name+(' '+str(detail) if not ok else ''),flush=True)
def run(page,code):return page.evaluate('()=>{const g=__bubble.game;'+code+'}')
def start(page):run(page,"__bubble.start();g.aiDisabled=true;g.god=true;g.renderer.resize('low');g.render();")
def hidden(page,ids):return all(not page.locator('#'+i).is_visible() for i in ids)
def visible(page,ids):return all(page.locator('#'+i).is_visible() for i in ids)
def ui(page):
 return page.evaluate('''()=>{const ids=['modeBtn','zoneBtn','useBtn','reloadBtn','pathBtn','gripBtn','gradeBtn'];
 const a=ids.filter(id=>document.getElementById(id).getClientRects().length).map(id=>{const r=document.getElementById(id).getBoundingClientRect();return{id,x:r.x,y:r.y,w:r.width,h:r.height};});
 const over=[];for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){const p=a[i],q=a[j];if(Math.min(p.x+p.w,q.x+q.w)-Math.max(p.x,q.x)>1&&Math.min(p.y+p.h,q.y+q.h)-Math.max(p.y,q.y)>1)over.push([p.id,q.id]);}
 return {over,off:a.filter(r=>r.x<0||r.y<0||r.x+r.w>innerWidth+1||r.y+r.h>innerHeight+1),mode:document.documentElement.dataset.inputMode};}''')
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path=os.getenv('CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 if os.getenv('BUBBLE_BASELINE'):
  original=harness.ROOT;harness.ROOT=Path(os.environ['BUBBLE_BASELINE'])
  p=browser.new_page(viewport=dict(width=1440,height=900));harness.load(p);start(p)
  check('Reproduced 0.4.3 bug: both mobile joysticks visible on a fine-pointer desktop',visible(p,['moveStick','aimStick']) and p.evaluate("matchMedia('(pointer:fine)').matches"))
  p.screenshot(path=str(OUT/'desktop-before.png'));p.close();harness.ROOT=original
 p=browser.new_page(viewport=dict(width=1600,height=900));errors=[];p.on('pageerror',lambda e:errors.append(str(e)));harness.load(p);start(p)
 for w,h in [(1600,900),(1280,800),(900,500),(430,744)]:
  p.set_viewport_size(dict(width=w,height=h));run(p,'g.render();');name=f'desktop {w}x{h}'
  check(name+' hides both sticks, touch fire, jump and gait controls',hidden(p,['moveStick','aimStick','fireBtn','jumpBtn','gaitBtn']))
  check(name+' retains clickable tool, region, connection, ammo, PATH and GRIP',visible(p,['modeBtn','zoneBtn','useBtn','reloadBtn','pathBtn','gripBtn','desktopHints']))
  layout=ui(p);check(name+' dock has no overlaps or out-of-screen buttons',not layout['over'] and not layout['off'],layout)
  check(name+' stays in keyboard/mouse mode regardless of viewport width',layout['mode']=='desktop' and not run(p,'return g.touch;'))
 p.set_viewport_size(dict(width=1600,height=900));start(p)
 p.keyboard.down('w');run(p,'__bubble.step(.4);');p.keyboard.up('w')
 check('Desktop WASD movement does not shoot',run(p,'return g.player.p[2]<26&&g.ammo===180&&!g.fireDown;'))
 p.mouse.move(900,410);run(p,'__bubble.step(.1);');check('Mouse aiming alone does not shoot',run(p,'return g.input.mouseActive&&g.ammo===180&&!g.fireDown;'))
 p.mouse.click(900,410);run(p,'__bubble.step(.2);');check('Canvas left click fires one normal shot',run(p,'return g.ammo===179;'))
 p.mouse.down();run(p,'__bubble.step(.7);');check('Desktop charge meter remains visible despite hiding mobile FIRE',p.locator('#chargeInfo').is_visible() and 'Alt' in p.locator('#chargeHint').inner_text());n=run(p,'return g.ammo;');p.mouse.up();check('Mouse hold/release still fires a charged shot',run(p,f'return g.ammo<{n}-1;'))
 p.keyboard.press('t');check('Keyboard tool shortcut works',run(p,"return g.tool==='flow';"))
 check('Desktop tool instructions describe mouse input, not the mobile ring','δακτύλιο' not in p.locator('#toast').inner_text())
 p.locator('#zoneBtn').click();check('Clickable desktop form selector works',run(p,"return g.form==='wall';"))
 p.locator('#modeBtn').click();check('Clicking dock changes tool exactly once',run(p,"return g.tool==='strand';"))
 p.keyboard.press('b');check('PATH shortcut and contextual grade key are available',run(p,'return g.player.pathOn;') and p.locator('#gradeBtn').is_visible())
 p.keyboard.press('v');check('Grade shortcut still works',run(p,'return g.grade<0;'))
 p.keyboard.press('g');check('GRIP shortcut still works',run(p,'return g.player.gripping;'))
 p.keyboard.press('i');check('BAG/Forge can open on desktop',p.locator('#inventory').is_visible());p.locator('#closeBag').click()
 p.keyboard.press('Escape');check('Pause works on desktop',p.locator('#pause').is_visible());p.locator('#resume').click();check('Resume does not restore mobile sticks',hidden(p,['moveStick','aimStick']))
 p.keyboard.press('c');check('First-person camera retains the desktop dock without sticks',run(p,"return g.cameraMode==='fp'&&!g.touch;") and hidden(p,['moveStick','aimStick']))
 p.keyboard.press('c');start(p)
 run(p,"g.tool='splat';g.refreshTools();g.player.p=[28.2,0,22];g.groundY=0;g.setCamera();g.time=3;for(let i=0;i<6;i++)g.volume.stamp([22+i*.35,.1,22],[.65,.45,.65],2.8);for(let i=0;i<18;i++)g.render();g.notifyTime=0;document.getElementById('toast').classList.remove('show');")
 p.wait_for_timeout(250);p.screenshot(path=str(OUT/'bubble-0.4.4-desktop.png'))
 check('Desktop runtime has no JavaScript errors',not errors,errors);p.close()
 # On a touch-capable PC, a fine primary pointer is not a mobile device.
 ctx=browser.new_context(viewport=dict(width=1280,height=800));p=ctx.new_page()
 p.evaluate("Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5,configurable:true})")
 harness.load(p);start(p)
 check('Fine-pointer PC with maxTouchPoints > 0 starts with desktop controls',run(p,"return navigator.maxTouchPoints===5&&!g.touch;") and hidden(p,['moveStick','aimStick']))
 cdp=ctx.new_cdp_session(p);cdp.send('Emulation.setTouchEmulationEnabled',dict(enabled=True,maxTouchPoints=5))
 cdp.send('Input.dispatchTouchEvent',dict(type='touchStart',touchPoints=[dict(id=1,x=650,y=350)]))
 check('A real touch switches the same hybrid device to touch UI',run(p,'return g.touch&&g.input.touch;') and visible(p,['moveStick','aimStick']))
 cdp.send('Input.dispatchTouchEvent',dict(type='touchEnd',touchPoints=[]))
 # Simulated compatibility event should not falsely change mode or fire.
 run(p,"const e=new PointerEvent('pointerdown',{bubbles:true,cancelable:true,pointerType:'mouse',button:0,pointerId:7});Object.defineProperty(e,'sourceCapabilities',{value:{firesTouchEvents:true}});g.canvas.dispatchEvent(e);")
 check('Touch-generated compatibility mouse events cannot steal UI or trigger a shot',run(p,'return g.touch&&!g.fireDown&&g.ammo===180;'))
 p.keyboard.down('w');run(p,'__bubble.step(.2);');p.keyboard.up('w')
 check('Real keyboard use switches hybrid back and cancels stale touch ownership',run(p,'return !g.touch&&!g.input.touch&&g.input.owners.size===0&&g.player.p[2]<27;') and hidden(p,['moveStick','aimStick']))
 check('Device switching did not spend ammo or alter character level',run(p,'return g.ammo===180&&g.progress.p.level===1;'))
 ctx.close()
 for w,h in [(430,744),(430,932),(932,430),(1024,768)]:
  ctx=browser.new_context(viewport=dict(width=w,height=h),has_touch=True,is_mobile=True,device_scale_factor=1);p=ctx.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));harness.load(p);start(p);name=f'touch {w}x{h}';cdp=ctx.new_cdp_session(p)
  check(name+' retains mobile joysticks and hides desktop dock hints',visible(p,['moveStick','aimStick','fireBtn','jumpBtn','gaitBtn']) and hidden(p,['desktopTrigger','desktopHints']))
  r=p.locator('#aimStick').bounding_box();m=p.locator('#moveStick').bounding_box();x,y=r['x']+r['width']/2,r['y']+r['height']/2;R=r['width']/2
  left=dict(id=1,x=m['x']+m['width']/2+23,y=m['y']+m['height']/2)
  right=dict(id=2,x=x,y=y-.5*R)
  cdp.send('Input.dispatchTouchEvent',dict(type='touchStart',touchPoints=[left,right]));run(p,'__bubble.step(.3);')
  check(name+' inner aiming + left movement stays silent',run(p,'return g.input.moveActive&&g.input.aimActive&&g.ammo===180&&g.player.p[0]>.4;'))
  right['y']=y-.9*R;cdp.send('Input.dispatchTouchEvent',dict(type='touchMove',touchPoints=[left,right]));run(p,'__bubble.step(.35);')
  check(name+' approved outer-ring trigger still fires with independent movement',run(p,'return g.ammo<180&&g.input.moveActive&&g.input.ringRequested&&g.twinFire.firing;'))
  n=run(p,'return g.ammo;');right['y']=y-.5*R;cdp.send('Input.dispatchTouchEvent',dict(type='touchMove',touchPoints=[left,right]));run(p,'__bubble.step(.3);')
  check(name+' returning inside stops fire without losing movement',run(p,f'return g.ammo==={n}&&g.input.moveActive&&!g.input.ringRequested;'))
  cdp.send('Input.dispatchTouchEvent',dict(type='touchEnd',touchPoints=[]))
  p.locator('#pauseBtn').tap();p.locator('#resume').tap();check(name+' touch pause/resume does not change layout',visible(p,['moveStick','aimStick']) and run(p,'return g.touch&&g.playing();'))
  check(name+' no-selection protection remains',p.evaluate("getComputedStyle(document.getElementById('hpText')).userSelect==='none'&&!document.dispatchEvent(new Event('contextmenu',{bubbles:true,cancelable:true}))"))
  if (w,h)==(430,932):p.screenshot(path=str(OUT/'bubble-0.4.4-mobile.png'))
  check(name+' no JavaScript errors',not errors,errors);ctx.close()
 version=browser.version;browser.close()
report=dict(version='0.4.4',base_commit='1bd138cbc94eaac94f61805b8e64776e866874df',browser=version,environment='Linux Chromium/SwiftShader; actual WebGL + CDP emulated touches. Hybrid maxTouchPoints is simulated. No physical iPhone/Safari.',passed=sum(x['passed'] for x in results),total=len(results),results=results)
(OUT/'desktop44-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(f"{report['passed']}/{report['total']} passed",flush=True)
if report['passed']!=report['total']:raise SystemExit(1)
