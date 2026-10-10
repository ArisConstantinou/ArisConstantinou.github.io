from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback,math
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/captain/')
OUT=Path('/tmp/captain183-qa');OUT.mkdir(exist_ok=True)
report={'version':'1.8.3','url':BASE,'method':'Chromium desktop and emulated physical touch events. Isolated setup positions and deterministic simulation steps are used; not a physical iPhone playtest.','checks':[]}
def check(n,ok,detail=None):
 report['checks'].append({'name':n,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+n,flush=True)
 if not ok:
  try:p.screenshot(path=str(OUT/'failure.png'));report['failureState']=state(p)
  except:pass
  raise AssertionError((n,detail))
def state(p):return p.evaluate('window.__lastCall.getState()')
def ch(p):return state(p)['chapter']
def adv(p,t):p.evaluate('(t)=>window.__lastCall.test.chapter.advance(t)',t)
def fresh(browser,w,h,touch):
 ctx=browser.new_context(viewport={'width':w,'height':h},has_touch=touch,is_mobile=touch,device_scale_factor=1,service_workers='block');p=ctx.new_page();errors=[]
 p.on('pageerror',lambda e:errors.append(str(e)));p.goto(BASE+'?test=1&qa=183',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000);return ctx,p,errors

def deck(p,touch):
 (p.locator('#start').tap() if touch else p.locator('#start').click());p.evaluate('window.__CHAOS_FREEZE__=true');p.evaluate('window.__lastCall.test.camera(1)')
 (p.locator('#drink').tap() if touch else p.locator('#drink').click());adv(p,.1)
 (p.locator('#leaveHelm').tap() if touch else p.locator('#leaveHelm').click())
 p.evaluate('window.__lastCall.test.chapter.setPosition(5,52.5,0)');adv(p,1.5);p.evaluate('window.__lastCall.test.step(3)');adv(p,.1)

def center(p,sel):
 r=p.locator(sel).bounding_box();return (r['x']+r['width']/2,r['y']+r['height']/2)
def point(x,y,i=1):return {'x':x,'y':y,'id':i}
def event(cd,kind,points):cd.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':points})
def overlap(a,b):return min(a['x']+a['width'],b['x']+b['width'])>max(a['x'],b['x'])+1 and min(a['y']+a['height'],b['y']+b['height'])>max(a['y'],b['y'])+1
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
 p=None
 try:
  ctx,p,errors=fresh(browser,390,700,True)
  check('New release loads',state(p)['version']=='1.8.3')
  p.locator('#start').tap();p.evaluate('window.__CHAOS_FREEZE__=true');p.evaluate('window.__lastCall.test.camera(1)');p.locator('#drink').tap();adv(p,.2)
  check('Helm hides combat life and jail cards',not p.locator('#captainVitals').is_visible())
  check('Helm hides redundant logo/profile and radar',not p.locator('#captainIdentityButton').is_visible() and not p.locator('.right-instruments').is_visible())
  check('Helm keeps compact drink and hull status',p.locator('#helmStatus183').is_visible())
  check('Exit is compact but finger sized',44<=p.locator('#leaveHelm').bounding_box()['height']<=48 and p.locator('#leaveHelm').bounding_box()['width']<=120)
  check('Helm has no combat ring',not p.locator('#mobileCombatWheel').is_visible())
  p.screenshot(path=str(OUT/'helm-390.png'))
  p.locator('#leaveHelm').tap();p.evaluate('window.__lastCall.test.chapter.setPosition(5,52.5,0)');adv(p,1.5);p.evaluate('window.__lastCall.test.step(3)');adv(p,.1)
  check('Deck has a right look ring',p.locator('#mobileCombatWheel').is_visible())
  check('Three captain vitals remain on deck',p.locator('#captainVitals').is_visible() and p.locator('#captainVitals').bounding_box()['height']<=48)
  cd=ctx.new_cdp_session(p);x,y=center(p,'#combatRightStick');base=p.locator('#combatRightStick').bounding_box();before=ch(p)['look']
  event(cd,'touchStart',[point(x+9,y+3)]);adv(p,.8)
  check('Off-center initial touch does not spin camera',ch(p)['look']==before)
  event(cd,'touchMove',[point(x+29,y+3)]);after=ch(p)['look'];adv(p,1)
  check('Moving finger turns the camera gently',.02<abs(after['yaw']-before['yaw'])<.09,after)
  check('Holding stationary stops camera immediately',ch(p)['look']==after)
  check('Joystick base never relocates',p.locator('#combatRightStick').bounding_box()==base)
  transform=p.locator('#combatRightStick i').evaluate('(e)=>new DOMMatrix(getComputedStyle(e).transform).toFloat64Array().slice(12,14)');check('Knob visual travel is bounded',math.hypot(*transform)<=15.1,list(transform))
  # Moving from the center across a button remains a camera gesture, never an attack.
  rx,ry=center(p,'.ring-action[data-action=punch]');event(cd,'touchMove',[point(rx,ry)]);event(cd,'touchEnd',[]);adv(p,.02)
  check('Center swipe does not accidentally punch',ch(p)['attack'] is None and ch(p)['touch']['executed']==0)
  look=ch(p)['look'];p.locator('.ring-action[data-action=punch]').tap();check('Separate ring tap performs punch',ch(p)['attack']['kind']=='punch')
  check('Attack tap does not jerk camera',ch(p)['look']==look);adv(p,.8)
  kx,ky=center(p,'.ring-action[data-action=kick]');event(cd,'touchStart',[point(kx,ky)]);event(cd,'touchCancel',[]);adv(p,.05)
  check('Cancelled gesture never kicks',ch(p)['attack'] is None)
  # Drag selection around the outer ring changes skill without turning the view.
  hx,hy=center(p,'.ring-action[data-action=heavy]');sx,sy=center(p,'.ring-action[data-action=slap]');look=ch(p)['look']
  event(cd,'touchStart',[point(hx,hy)]);event(cd,'touchMove',[point(sx,sy)]);event(cd,'touchEnd',[])
  check('Outer ring drag selects the release action',ch(p)['attack']['kind']=='slap' and ch(p)['look']==look);adv(p,.6)
  bx,by=center(p,'.ring-action[data-action=block]');event(cd,'touchStart',[point(bx,by)]);check('Block held while touching its sector',ch(p)['block']);event(cd,'touchEnd',[]);check('Block releases without a second toggle',not ch(p)['block'])
  lx,ly=center(p,'#chaosMove');x,y=center(p,'#combatRightStick');before=ch(p)['position']
  event(cd,'touchStart',[point(lx,ly-18,0)]);event(cd,'touchStart',[point(lx,ly-18,0),point(x,y,1)]);event(cd,'touchMove',[point(lx,ly-18,0),point(x+12,y,1)]);adv(p,.3)
  event(cd,'touchEnd',[point(x+12,y,1)]);look=ch(p)['look'];adv(p,.3)
  check('Releasing camera keeps left movement active',abs(ch(p)['stick']['y'])>.1 and ch(p)['position']!=before)
  check('Camera remains stopped with the other finger held',ch(p)['look']==look)
  event(cd,'touchEnd',[]);adv(p,.03);check('All touch input releases cleanly',not ch(p)['touch']['active'] and abs(ch(p)['stick']['y'])<.001)
  p.screenshot(path=str(OUT/'deck-390.png'))
  p.locator('.ring-action[data-action=drink]').tap();adv(p,.5)
  prop=ch(p)['whisky'];check('Drinking has an actually scene-attached 3D bottle',prop['visible'] and prop['sceneAttached'],prop)
  check('Bottle follows the animated palm closely',prop['attachmentError']<.08)
  ndc=p.evaluate('(xyz)=>window.__lastCall.test.project(xyz)',prop['position']);check('Bottle center projects inside camera frustum',abs(ndc[0])<1 and abs(ndc[1])<1 and 0<ndc[2]<1,ndc)
  p.screenshot(path=str(OUT/'drink-390.png'));adv(p,1.2);check('Bottle is stowed after the sip',not ch(p)['whisky']['visible'])
  p.locator('#pause').tap();check('Touch sensitivity is adjustable in pause',p.locator('#touchSensitivity183 input').is_visible());p.locator('#touchSensitivity183 input').fill('45');p.locator('#touchSensitivity183 input').dispatch_event('input');check('Sensitivity affects the active controller',ch(p)['touch']['sensitivity']==.45)
  p.locator('#resume').tap();check('No mobile runtime errors',not errors,errors);ctx.close()
  for w,h in [(320,568),(430,832),(932,430)]:
   ctx,p,errors=fresh(browser,w,h,True);deck(p,True)
   wheel=p.locator('#mobileCombatWheel').bounding_box();left=p.locator('#chaosMove').bounding_box()
   check(f'{w}x{h} sticks do not overlap',not overlap(wheel,left))
   for sel in ['#mobileCombatWheel','#chaosMove','#captainVitals']:
    a=p.locator(sel).bounding_box();check(f'{w}x{h} in bounds {sel}',a['x']>=0 and a['y']>=0 and a['x']+a['width']<=w+1 and a['y']+a['height']<=h+1,a)
   sizes=p.locator('.ring-action').evaluate_all('(xs)=>xs.map(x=>{const r=x.getBoundingClientRect();return [r.x,r.y,r.width,r.height]})')
   check(f'{w}x{h} all nine actions are touch sized',len(sizes)==9 and all(a[2]>=44 and a[3]>=44 and a[0]>=0 and a[1]>=0 and a[0]+a[2]<=w+1 and a[1]+a[3]<=h+1 for a in sizes))
   check(f'{w}x{h} no desktop keys',p.locator('#chaos170 kbd:visible').count()==0)
   p.screenshot(path=str(OUT/f'deck-{w}x{h}.png'));check(f'{w}x{h} no runtime error',not errors,errors);ctx.close()
  ctx,p,errors=fresh(browser,1280,800,False);deck(p,False)
  check('Desktop retains WASD and hides touch ring',p.locator('#keyboardMovement').is_visible() and not p.locator('#mobileCombatWheel').is_visible())
  p.locator('#sea').click(position={'x':640,'y':300});p.wait_for_function('document.pointerLockElement!==null',timeout=5000);check('First mouse capture does not attack',ch(p)['attack'] is None)
  p.wait_for_timeout(150);p.mouse.move(660,310,steps=3);p.mouse.down();p.mouse.up();check('Desktop left click retains slap',(ch(p)['attack'] or {}).get('kind')=='slap');adv(p,.6)
  p.mouse.down(button='right');p.mouse.up(button='right');check('Desktop right click retains punch',(ch(p)['attack'] or {}).get('kind')=='punch');adv(p,.8);p.keyboard.press('Tab')
  check('No desktop runtime errors',not errors,errors);ctx.close()
  ctx,p,errors=fresh(browser,390,700,True);p.locator('#jailEntry180').tap();p.evaluate('window.__CHAOS_FREEZE__=true');p.locator('#continueFromCell180').tap();adv(p,1.8);p.locator('#escapeOverlayAction').tap();adv(p,.05)
  for x,z in [(5,10),(-.9,9),(-4.4,8.1)]:
   p.evaluate('([x,z])=>window.__lastCall.test.chapter.escape.moveTo(x,z)',[x,z]);adv(p,.15);p.locator('#escapeUse').tap();adv(p,.03)
  p.locator('#escapeDrink').tap();check('One escape sip immediately reaches required level',ch(p)['escape']['intox']>=70)
  adv(p,.5);check('Escape also shows the physical bottle',ch(p)['escape']['whisky']['visible'] and ch(p)['escape']['whisky']['sceneAttached']);p.screenshot(path=str(OUT/'escape-drink.png'))
  p.evaluate('window.__lastCall.test.chapter.escape.moveTo(0,2.4)');adv(p,.15);p.locator('#escapeUse').tap();adv(p,2)
  check('One sip is sufficient to leave escape',ch(p)['returning'] and ch(p)['escape'] is None)
  check('No escape runtime errors',not errors,errors);ctx.close();report['passed']=True
 except Exception as e:
  report['passed']=False;report['error']=str(e);traceback.print_exc()
  try:report['errors']=errors;report['lastState']=state(p);p.screenshot(path=str(OUT/'failure.png'))
  except:pass
 finally:
  (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
if not report.get('passed'):raise SystemExit(1)
