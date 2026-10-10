from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback,math,hashlib
BASE=os.getenv('MAYHEM_BASE','http://127.0.0.1:8765/captain-mayhem/')
OUT=Path('/tmp/mayhem-qa');OUT.mkdir(exist_ok=True)
report={'mode':'MAYHEM 1.0.0','url':BASE,'method':'Chromium. Real input handlers, deterministic clock steps and explicit setup positions for isolated mechanics; not an unassisted full playthrough. Mobile is emulated, not a physical iPhone.','checks':[]}
def state(p):return p.evaluate('window.__lastCall.getState()')
def ch(p):return state(p)['chapter']
def advance(p,t):p.evaluate('(t)=>window.__lastCall.test.chapter.advance(t)',t)
def pos(p,x,y,z,yaw=0):p.evaluate('(q)=>window.__lastCall.test.chapter.setPosition3(...q)',[x,y,z,yaw]);advance(p,.02)
def hold(p,key,t):p.keyboard.down(key);advance(p,t);p.keyboard.up(key)
def props(p):return p.evaluate('window.__lastCall.test.chapter.props()')
def check(name,passed,detail=None):
 report['checks'].append({'name':name,'passed':bool(passed),'detail':detail});print(('PASS ' if passed else 'FAIL ')+name,flush=True)
 if not passed:raise AssertionError((name,detail))
def shot(p,name):
 (OUT/'results-progress.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 try:
  p.wait_for_timeout(250)
  p.screenshot(path=str(OUT/(name+'.png')),timeout=15000,animations='disabled')
 except Exception as error:
  report.setdefault('captureWarnings',[]).append({'frame':name,'error':str(error)})
  print('CAPTURE WARNING',name,str(error),flush=True)

def fresh(browser,w=1280,h=800,touch=False):
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=touch,has_touch=touch,service_workers='block',device_scale_factor=1)
 p=ctx.new_page();errors=[];net=[];p.on('pageerror',lambda e:(errors.append(str(e)),print('JS',str(e),flush=True)));p.on('requestfailed',lambda r:net.append([r.url,r.failure]));p.add_init_script("localStorage.setItem('last-call-story180','STORY_SENTINEL_UNCHANGED');")
 try:
  p.goto(BASE+'?test=1&qa=mayhem100',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000);p.evaluate('window.__CHAOS_FREEZE__=true')
 except Exception:
  (OUT/'startup.json').write_text(json.dumps({'errors':errors,'network':net,'dom':p.locator('body').inner_text()},ensure_ascii=False,indent=2));shot(p,'startup-failed');raise
 return ctx,p,errors
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=os.getenv('MAYHEM_HEADED')!='1',args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--disable-dev-shm-usage'])
 p=None
 try:
  ctx,p,errors=fresh(browser)
  shot(p,'intro-desktop')
  check('New mode loads as distinct version',state(p)['version']=='MAYHEM 1.0.0')
  p.locator('#start').click();advance(p,.1)
  check('Starts free on the ship, already drunk',ch(p)['foot'] and ch(p)['phase']=='deck' and state(p)['intox']>=40,ch(p)['position'])
  check('No story card or jail entry in sandbox UI',not p.locator('#arrestCard').is_visible() and not p.locator('#jailEntry180').is_visible())
  check('Compact new HUD replaces old objective and vitals',p.locator('#mayhemHUD').is_visible() and not p.locator('#captainVitals').is_visible())
  check('Six-deck map retained',ch(p)['roaming']['decks']==6,ch(p)['roaming'])
  check('WASD visible; mobile wheel hidden',p.locator('#keyboardMovement').is_visible() and not p.locator('#mobileCombatWheel').is_visible())
  shot(p,'deck-desktop')
  # A real physical shortcut: blocking before the strike, passable afterwards.
  pos(p,1.4,10.1,6,math.pi/2);hold(p,'KeyW',.7)
  check('Unbroken glass stops player',ch(p)['position']['x']<2.35,ch(p)['position'])
  panel=min([o for o in props(p) if o['type']=='window' and abs(o['y']-10.1)<.1],key=lambda o:abs(o['x']-2.45)+abs(o['z']-6))
  p.keyboard.press('KeyE');advance(p,1.1)
  check('Kick shatters selected glass',next(o for o in props(p) if o['id']==panel['id'])['broken'],panel)
  hold(p,'KeyW',.85)
  check('Broken doorway becomes traversable',ch(p)['position']['x']>2.85,ch(p)['position'])
  pos(p,4.3,10.1,6,-math.pi/2);shot(p,'glass-passage')
  # Actual held extinguisher and contextual spray.
  pos(p,3.8,10.1,55.3,math.pi);p.keyboard.press('KeyX');advance(p,.08)
  ext=next(o for o in props(p) if o['id']==ch(p)['held']) if ch(p)['held'] is not None else None
  check('Extinguisher is a real pickup',ext and ext['type']=='extinguisher',ext)
  check('Context action changes to spray',p.locator('#chaosUse strong').inner_text()=='ΨΕΚΑΣΕ')
  p.keyboard.press('KeyF');advance(p,.25)
  check('Spray produces persistent cover volume',ch(p)['sandbox']['smoke']>0,ch(p)['sandbox'])
  shot(p,'smoke-cover')
  p.keyboard.press('KeyR');advance(p,1)
  check('Throw still releases held prop',ch(p)['held'] is None and ch(p)['thrown']>0)
  # Physical manoeuvre on a deck with movable furnishings.
  pos(p,0,21.35,14,math.pi);before=props(p);p.keyboard.press('KeyT');advance(p,.8)
  moved=[o for o in props(p) if any(a['id']==o['id'] and math.hypot(a['x']-o['x'],a['z']-o['z'])>.25 for a in before)]
  check('Manoeuvre physically moves loose props',len(moved)>0,len(moved))
  check('Manoeuvre has a visible cooldown',ch(p)['sandbox']['tiltReady']>10)
  shot(p,'sky-lounge')
  # Stationary threats do not stack lethal damage; position setup is explicit.
  pos(p,5.7,10.1,53.6,math.pi);p.evaluate('window.__lastCall.test.chapter.spawnGuard()');p.evaluate('window.__lastCall.test.chapter.setState({heat:80})');before=ch(p)['health'];advance(p,7)
  check('Guards allow reaction time rather than instant kill',ch(p)['health']>=before-28 and not ch(p)['downed'],{'before':before,'after':ch(p)['health']})
  heat=ch(p)['heat'];pos(p,0,6.65,-20,0);advance(p,28)
  check('Lost line of sight clears wanted heat',ch(p)['heat']<heat and ch(p)['capture']==0,{'before':heat,'after':ch(p)['heat']})
  check('No automatic jail after security encounter',ch(p)['phase'] not in ['cell','arrested'] and not ch(p)['cellVisible'])
  score=ch(p)['chaos'];p.evaluate('window.__lastCall.test.chapter.setState({health:0})');advance(p,.1)
  check('Defeat is recovery, not a forced story ending',p.locator('#mhDown').is_visible() and ch(p)['downed'])
  shot(p,'recovery');p.locator('#mhRecover').click();advance(p,.1)
  check('Recovery keeps score and destroyed glass',ch(p)['chaos']==score and next(o for o in props(p) if o['id']==panel['id'])['broken'])
  check('Captain can play again immediately',ch(p)['health']>=75 and not ch(p)['downed'])
  p.evaluate('window.__lastCall.test.chapter.save()');check('Old story save untouched',p.evaluate("localStorage.getItem('last-call-story180')")=='STORY_SENTINEL_UNCHANGED')
  p.reload(wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000);p.evaluate('window.__CHAOS_FREEZE__=true');p.locator('#start').click();advance(p,.1)
  check('Separate Mayhem save restores score and destruction',ch(p)['chaos']==score and next(o for o in props(p) if o['id']==panel['id'])['broken'])
  pos(p,4.3,10.1,57,math.pi);p.keyboard.press('KeyZ');advance(p,.45);shot(p,'whisky-desktop')
  check('Whisky prop is rendered during sip',ch(p)['whisky']['visible'],ch(p)['whisky'])
  advance(p,2);p.mouse.click(620,360);p.wait_for_timeout(250)
  check('Desktop FPS pointer lock works',p.evaluate('document.pointerLockElement?.id')=='sea')
  old=ch(p)['yaw'];p.mouse.move(655,370,steps=3);p.wait_for_timeout(150);p.mouse.move(730,390,steps=6)
  p.wait_for_function('(old)=>Math.abs(window.__lastCall.getState().chapter.yaw-old)>.01',arg=old,timeout=5000)
  check('Mouse movement rotates camera',abs(ch(p)['yaw']-old)>.01,{'before':old,'after':ch(p)['yaw'],'lock':p.evaluate('document.pointerLockElement?.id')})
  p.mouse.click(690,380);check('Primary click starts slap',ch(p)['attack'] and ch(p)['attack']['kind']=='slap');advance(p,1)
  p.mouse.click(690,380,button='right');check('Secondary click starts punch',ch(p)['attack'] and ch(p)['attack']['kind']=='punch');advance(p,1);p.keyboard.press('Tab')
  pos(p,1.2,18.43,44.4,0);p.keyboard.press('KeyF');advance(p,.1)
  check('Can take the real helm inside the new mode',not ch(p)['foot'])
  p.keyboard.press('KeyF');advance(p,.1)
  check('Leaving helm restores unrestricted combat',ch(p)['foot'] and ch(p)['phase']=='deck')
  p.keyboard.press('KeyQ');check('Heavy attack works after helm roundtrip',ch(p)['attack'] and ch(p)['attack']['kind']=='heavy');advance(p,1.1)
  check('Desktop has no runtime errors',not errors,errors)
  report['desktopMetrics']={k:state(p).get(k) for k in ['drawCalls','triangles']};ctx.close()
  for w,h in [(430,832),(390,744),(320,568),(932,430)]:
   ctx,p,errors=fresh(browser,w,h,True);shot(p,f'intro-{w}');p.locator('#start').tap();advance(p,.1)
   check(f'{w}: only touch controls',p.locator('#mobileCombatWheel').is_visible() and not p.locator('#keyboardMovement').is_visible())
   check(f'{w}: no visible keyboard labels',p.locator('#hud kbd:visible').count()==0)
   for sel in ['#mhMeters','#mhTilt','#chaosMove','#mobileCombatWheel','.mode-head']:
    b=p.locator(sel).bounding_box();check(f'{w}: {sel} within viewport',b and b['x']>=-1 and b['y']>=-1 and b['x']+b['width']<=w+1 and b['y']+b['height']<=h+1,b)
   if w==430:
    b=p.locator('#combatRightStick').bounding_box();x=b['x']+b['width']/2;y=b['y']+b['height']/2;cd=ctx.new_cdp_session(p);yaw=ch(p)['yaw']
    cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':0}]});advance(p,1)
    check('Holding still never drifts the camera',abs(ch(p)['yaw']-yaw)<.001)
    cd.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+18,'y':y+3,'id':0}]});advance(p,.1)
    check('Relative thumb movement controls look',abs(ch(p)['yaw']-yaw)>.015)
    cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});advance(p,.1)
    check('Look gesture never triggers an attack',ch(p)['attack'] is None)
    p.locator('#mobileCombatWheel [data-action=drink]').tap();advance(p,.45);shot(p,'whisky-mobile')
    check('Touch drink also renders the bottle',ch(p)['whisky']['visible'])
   shot(p,f'mobile-{w}x{h}');check(f'{w}: no runtime errors',not errors,errors);ctx.close()
  report['passed']=True
 except Exception as e:
  report['passed']=False;report['error']=str(e);traceback.print_exc()
  if p:
   try:report['failureState']=state(p);shot(p,'failure')
   except:pass
 finally:
  (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
if not report.get('passed'):raise SystemExit(1)
