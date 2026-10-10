from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/captain/')
OUT=Path('/tmp/captain180-qa');OUT.mkdir(exist_ok=True)
report={'version':'1.8.0','url':BASE,'environment':'Chromium; desktop and emulated touch, not physical iPhone','method':'Real buttons and input; deterministic advancement and isolated position fixtures for individual stage regressions. Not an unassisted full-route playthrough.','checks':[]}
def ck(n,ok,d=None):
 report['checks'].append({'name':n,'pass':bool(ok),'detail':d});print(('PASS ' if ok else 'FAIL ')+n,flush=True)
 if not ok:raise AssertionError((n,d))
def state(p):return p.evaluate('window.__lastCall.getState()')
def esc(p):return state(p)['chapter']['escape']
def advance(p,t):p.evaluate('(t)=>window.__lastCall.test.chapter.advance(t)',t)
def hold(p,key,t):p.keyboard.down(key);advance(p,t);p.keyboard.up(key);advance(p,.02)
def fixture(p,x,z):p.evaluate('([x,z])=>window.__lastCall.test.chapter.escape.moveTo(x,z)',[x,z]);advance(p,.02)
def fresh(browser,w=1365,h=768,touch=False):
 ctx=browser.new_context(viewport={'width':w,'height':h},has_touch=touch,is_mobile=touch,device_scale_factor=1,service_workers='block')
 p=ctx.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 p.goto(BASE+'?test=1&qa=180',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=60000)
 p.evaluate('window.__CHAOS_FREEZE__=true');return ctx,p,errors
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
 p=None
 try:
  ctx,p,errors=fresh(browser)
  ck('Correct release',state(p)['version']=='1.8.0')
  p.locator('#jailEntry180').click();advance(p,.02)
  ck('Direct jail migration entry',state(p)['chapter']['phase']=='cell')
  p.evaluate('window.__lastCall.test.chapter.setState({chaos:145})')
  ck('Continue button replaces restart-only dead end',p.locator('#continueFromCell180').is_visible())
  p.locator('#continueFromCell180').click();advance(p,1.8);p.locator('#escapeOverlayAction').click();advance(p,.02)
  ck('Wake starts playable escape',esc(p)['stage']=='escape')
  ck('Captain starts sober',state(p)['intox']==0)
  ck('Score retained on continuation',state(p)['chapter']['chaos']==145)
  ck('Desktop WASD not joystick',p.locator('#escapeKeys').is_visible() and not p.locator('#escapePad').is_visible())
  hold(p,'KeyD',.5);hold(p,'KeyW',.3);p.keyboard.press('KeyF');advance(p,.03)
  ck('Pick up mug using keyboard',esc(p)['held']=='mug',esc(p))
  hold(p,'KeyA',.5);hold(p,'KeyW',.5);p.keyboard.press('KeyF');advance(p,.02)
  ck('Hatch opens by contextual input',esc(p)['hatch'],esc(p))
  hold(p,'KeyW',1.4);ck('Standing remains outside low hatch',esc(p)['position']['z']>20.8)
  p.keyboard.press('KeyC');hold(p,'KeyW',1.9)
  ck('Crouch passes underneath',esc(p)['crouch'] and esc(p)['position']['z']<19.5,esc(p))
  p.screenshot(path=str(OUT/'desktop-escape.png'))
  fixture(p,-3,17);p.evaluate('window.__lastCall.test.chapter.escape.aim(0,17.1)');p.keyboard.press('Digit8');advance(p,1.5)
  ck('Thrown prop lands and makes distraction noise',esc(p)['throws']==1 and esc(p)['heard']>0,esc(p))
  ck('Staff investigate the noise',any(g['mode']=='investigate' for g in esc(p)['guards']))
  # Explicit placement is a perception regression fixture, not a completed stealth route.
  p.evaluate('''()=>{const q=window.__lastCall.getState().chapter.escape.guards[0];window.__lastCall.test.chapter.escape.moveTo(q.x+Math.sin(q.yaw),q.z+Math.cos(q.yaw));}''');advance(p,7)
  ck('Guard can detect captain and present retry',esc(p)['stage']=='caught',esc(p))
  p.locator('#escapeOverlayAction').click();advance(p,.03)
  ck('Detection retry stays in chapter two',esc(p)['stage']=='escape' and state(p)['chapter']['chaos']==145)
  fixture(p,5,10);p.keyboard.press('KeyF');advance(p,.02)
  ck('Keycard can be picked up',esc(p)['card'],esc(p))
  p.reload(wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=60000);p.evaluate('window.__CHAOS_FREEZE__=true')
  p.locator('#jailEntry180').click();p.locator('#continueFromCell180').click();advance(p,.02)
  ck('Reload resumes keycard checkpoint and score',esc(p)['card'] and state(p)['chapter']['chaos']==145,esc(p))
  fixture(p,-.9,9);p.keyboard.press('KeyF');advance(p,.02)
  ck('Keycard unlocks storage door',esc(p)['storeOpen'])
  fixture(p,-4.4,8.1);p.keyboard.press('KeyF');advance(p,.02)
  ck('Full whisky bottle collected',esc(p)['bottle'])
  p.keyboard.press('Digit9');ck('Whisky not applied instantly',esc(p)['intox']<1);advance(p,4.1)
  ck('Whisky absorbed over time',esc(p)['intox']>=30)
  p.screenshot(path=str(OUT/'whisky-store.png'))
  fixture(p,0,2.4);p.keyboard.press('KeyF');advance(p,2)
  ck('Escape exit restores FPS chapter instead of restarting',state(p)['chapter']['returning'] and state(p)['chapter']['escape'] is None,state(p)['chapter'])
  ck('Guarded bridge has ship security',state(p)['chapter']['guardCount']>=3)
  ck('Score remains after escaping',state(p)['chapter']['chaos']==145)
  p.screenshot(path=str(OUT/'return-deck.png'))
  p.evaluate('window.__lastCall.test.chapter.setPosition(1.2,44.4,0)');advance(p,.02);p.keyboard.press('KeyF');advance(p,.02)
  ck('Clear helm can be retaken',state(p)['chapter']['retaken'],state(p)['chapter'])
  before=state(p)['throttle'];p.keyboard.down('KeyW');p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(300);p.keyboard.up('KeyW');p.evaluate('window.__CHAOS_FREEZE__=true')
  ck('Original ship throttle restored',state(p)['throttle']>before)
  ck('No JavaScript errors in chapter transitions',not errors,errors);ctx.close()
  for w,h in [(430,832),(390,744),(320,568),(932,430)]:
   ctx,p,errors=fresh(browser,w,h,True);p.locator('#jailEntry180').tap();p.locator('#continueFromCell180').tap();advance(p,1.8);p.locator('#escapeOverlayAction').tap();advance(p,.02)
   ck(f'{w}x{h}: joystick only',p.locator('#escapePad').is_visible() and not p.locator('#escapeKeys').is_visible())
   visible=p.locator('#escape180 kbd').evaluate_all('(xs)=>xs.filter(x=>x.offsetWidth&&x.offsetHeight).length')
   ck(f'{w}x{h}: no desktop key hints',visible==0)
   boxes={}
   for sel in ['#escapePad','#escapeUse','#escapeCrouch','.escape-vitals','.escape-goal']:
    b=p.locator(sel).bounding_box();boxes[sel]=b;ck(f'{w}x{h}: bounds {sel}',b is not None and b['x']>=0 and b['y']>=0 and b['x']+b['width']<=w+1 and b['y']+b['height']<=h+1,b)
    if sel in ['#escapeUse','#escapeCrouch']:ck(f'{w}x{h}: finger-sized {sel}',b['width']>=44 and b['height']>=44)
   def overlap(a,b):return min(a['x']+a['width'],b['x']+b['width'])>max(a['x'],b['x'])+1 and min(a['y']+a['height'],b['y']+b['height'])>max(a['y'],b['y'])+1
   ck(f'{w}x{h}: controls do not overlap',not overlap(boxes['#escapePad'],boxes['#escapeUse']) and not overlap(boxes['.escape-goal'],boxes['.escape-vitals']))
   if w==430:
    b=boxes['#escapePad'];x=b['x']+b['width']/2;y=b['y']+b['height']/2;cd=ctx.new_cdp_session(p);before=esc(p)['position']['z']
    cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y-28,'id':0}]});advance(p,.6);cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});advance(p,.02)
    ck('Mobile joystick actually moves captain',esc(p)['position']['z']<before-.2)
    p.locator('#escapeCrouch').tap();advance(p,.02);ck('Mobile crouch toggles',esc(p)['crouch'])
   p.screenshot(path=str(OUT/f'mobile-{w}x{h}.png'));ck(f'{w}x{h}: no runtime errors',not errors,errors);ctx.close()
  report['passed']=True
 except Exception as e:
  report['passed']=False;report['error']=str(e);traceback.print_exc()
  if p:
   try:p.screenshot(path=str(OUT/'failure.png'));report['failureState']=state(p)
   except:pass
 finally:
  (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
if not report.get('passed'):raise SystemExit(1)
