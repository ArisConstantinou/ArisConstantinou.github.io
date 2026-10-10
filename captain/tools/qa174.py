from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback,math
OUT=Path('/tmp/captain174-qa');OUT.mkdir(exist_ok=True)
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/captain/')
report={'version':'1.7.4','url':BASE,'environment':'Chromium, mouse/keyboard and emulated touch; not a physical iPhone','checks':[],'notes':['Isolated scenario setup uses test positions; real key/button handlers and simulation are exercised.']}
def ck(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,flush=True)
 if not ok:
  try:
   report['failureState']=state(p);p.screenshot(path=str(OUT/'failure.png'))
   (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
  except Exception:pass
  raise AssertionError((name,detail))
def state(p):return p.evaluate('window.__lastCall.getState()')
def es(p):return state(p)['chapter']['escape']
def advance(p,seconds):p.evaluate('(n)=>window.__lastCall.test.chapter.advance(n)',seconds)
def pos(p,x,z):p.evaluate('(q)=>window.__lastCall.test.chapter.escape.setPosition(q)',{'x':x,'z':z});advance(p,.1)
def hold(p,key,seconds):p.keyboard.down(key);advance(p,seconds);p.keyboard.up(key)
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
  for mobile,w,h in [(False,1280,800),(True,430,832)]:
   ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=mobile,has_touch=mobile)
   p=ctx.new_page();errors=[];p.on('pageerror',lambda e:(errors.append(str(e)),print('BROWSER ERROR',str(e),flush=True)));report['browserErrors']=errors
   p.goto(BASE+'?test=1&v=174',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000)
   ck('New release loads',state(p)['version']=='1.7.4')
   (p.locator('#continueFromCell').tap() if mobile else p.locator('#continueFromCell').click());p.wait_for_function("window.__lastCall.getState().chapter.phase==='cell'",timeout=15000)
   ck('Jail offers continue, not only restart',p.locator('#continueStory').is_visible())
   p.screenshot(path=str(OUT/('mobile-cell.png' if mobile else 'desktop-cell.png')))
   (p.locator('#continueStory').tap() if mobile else p.locator('#continueStory').click())
   report['afterContinue']=state(p);print('AFTER CONTINUE',json.dumps(es(p)),flush=True)
   (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
   p.screenshot(path=str(OUT/'sleep-diagnostic.png'))
   ck('Continue actually starts sleep',es(p)['active'],es(p))
   advance(p,2.3);report['afterWake']=state(p)
   (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
   p.screenshot(path=str(OUT/'wake-diagnostic.png'));ck('Wake has no runtime exception',not errors,errors)
   ck('Sleep wakes into playable escape',es(p)['active'] and state(p)['intox']==0)
   ck('Life/drunk/detection meters visible',all(p.locator('#vital'+k+'Value').is_visible() for k in ['Life','Drunk','Custody']))
   ck('Old jail card hidden during play',not p.locator('#arrestCard').is_visible())
   ck('Four civilian patrol actors',len(es(p)['guards'])==4)
   p.screenshot(path=str(OUT/('mobile-escape.png' if mobile else 'desktop-escape.png')))
   if mobile:
    ck('Touch scheme has no visible desktop keys',p.locator('#chaos170 kbd:visible').count()==0)
    ck('Touch joystick visible, WASD hidden',p.locator('#chaosMove').is_visible() and not p.locator('#keyboardMovement').is_visible())
    for selector in ['#escapeCrawl','#escapeThrow','#chaosUse']:
     rect=p.locator(selector).bounding_box();ck('Touch target '+selector,rect and rect['height']>=44 and rect['width']>=44 and rect['x']>=0 and rect['y']>=0 and rect['x']+rect['width']<=w+1 and rect['y']+rect['height']<=h+1,rect)
    cd=ctx.new_cdp_session(p);box=p.locator('#chaosMove').bounding_box();x=box['x']+box['width']/2;y=box['y']+box['height']/2
    before=es(p)['position'];cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y-28,'id':0}]});advance(p,.45);cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
    ck('Touch actually moves top-down captain',es(p)['position']['z']<before['z']-.2)
    p.locator('#escapeCrawl').tap();ck('Touch changes stance',not es(p)['crawl'])
    p.set_viewport_size({'width':932,'height':430});p.wait_for_timeout(250);p.screenshot(path=str(OUT/'mobile-landscape.png'))
    ck('Landscape keeps touch scheme',state(p)['chapter']['controlScheme']=='touch')
   else:
    ck('Desktop guide without joystick',p.locator('#keyboardMovement').is_visible() and not p.locator('#chaosMove').is_visible())
    p.evaluate('window.__CHAOS_FREEZE__=true')
    before=es(p)['position'];hold(p,'w',.5);ck('W walks toward north',es(p)['position']['z']<before['z']-.4)
    # Entire crawl connector is traversed with ordinary WASD. No teleport to laundry.
    hold(p,'w',4.6);hold(p,'a',2.6);hold(p,'w',1.4)
    ck('Crawl passage reaches laundry checkpoint',es(p)['checkpoint']=='laundry',es(p))
    ck('Checkpoint persisted locally',p.evaluate("JSON.parse(localStorage.getItem('last-call-story-174')).checkpoint")=='laundry')
    # Isolated low-ceiling constraint, using test setup then genuine movement.
    pos(p,0,42);p.keyboard.press('c');ck('Cannot stand in low passage',es(p)['crawl'])
    pos(p,0,43);p.keyboard.press('c');hold(p,'w',1);ck('Standing body cannot enter vent',es(p)['position']['z']>42.65,es(p)['position'])
    p.keyboard.press('c');hold(p,'w',1);ck('Crawling passes low clearance',es(p)['position']['z']<42.6)
    # Distinct object pickup and noise-driven investigation, with no direct AI flag mutation.
    pos(p,1.2,33.4);p.keyboard.press('f');ck('Object picked up',es(p)['holding'] is not None,es(p))
    p.evaluate('window.__lastCall.test.chapter.escape.setAim({x:-3,z:36})');p.keyboard.press('8');advance(p,.8)
    ck('Thrown object lands and emits noise',es(p)['noiseCount']>0)
    ck('Nearby patrol hears and investigates',es(p)['heardCount']>0 and any(n['state']=='investigate' for n in es(p)['guards']),es(p))
    p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(200);p.screenshot(path=str(OUT/'noise.png'));p.evaluate('window.__CHAOS_FREEZE__=true')
    # Force only the setup position, then let real sight and proximity cause detection.
    g=es(p)['guards'][1];pos(p,g['x']+.35*math.sin(g['yaw']),g['z']+.35*math.cos(g['yaw']));advance(p,5)
    ck('Guard sight and approach catch player naturally',es(p)['mode']=='caught',es(p))
    p.locator('#escapeRetry').click();advance(p,.85);ck('Retry preserves chapter progress',es(p)['mode']=='play' and es(p)['checkpoint']=='laundry')
    pos(p,8,50);p.keyboard.press('f');ck('Exit remains locked without card',es(p)['mode']=='play' and not es(p)['card'])
    pos(p,2,27);p.keyboard.press('f');ck('Card acquired through interaction',es(p)['card'])
    pos(p,5,47);p.keyboard.press('f');ck('Full whisky bottle acquired',es(p)['bottle'])
    p.keyboard.press('9');advance(p,2);ck('Whisky absorption restores intoxication progressively',es(p)['sipped'] and 0<state(p)['intox']<30,state(p)['intox'])
    pos(p,8,50);p.keyboard.press('f');advance(p,2.3)
    ck('Exit continues to first-person return chapter',state(p)['chapter']['phase']=='assault' and not es(p)['active'])
    ck('Return to deck does not restore jail overlay',not p.locator('#arrestCard').is_visible())
    ck('Bridge has four security guards',state(p)['chapter']['guardCount']==4,state(p)['chapter']['actors'])
    p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(150);p.screenshot(path=str(OUT/'return-to-bridge.png'));p.evaluate('window.__CHAOS_FREEZE__=true')
    # Strike actual guards with numeric attacks, never set guard health or call contact.
    for guard in [a for a in state(p)['chapter']['actors'] if a['guard']]:
     for attempt in range(9):
      actor=next(a for a in state(p)['chapter']['actors'] if a['id']==guard['id'])
      if actor['health']<=0:break
      x,z=actor['x'],actor['z'];p.evaluate('(q)=>window.__lastCall.test.chapter.setPosition(q.x,q.z,0)',{'x':x,'z':z-1.1})
      p.keyboard.press('4');advance(p,1)
     ck('Numeric attack incapacitates guard '+str(guard['id']),next(a for a in state(p)['chapter']['actors'] if a['id']==guard['id'])['health']<=0)
    p.evaluate('window.__lastCall.test.chapter.setPosition(1.2,44.3,0)');p.keyboard.press('f');advance(p,.15)
    ck('Captain reclaims actual helm',state(p)['chapter']['phase']=='reclaimed')
    ck('Helm UI restored',p.locator('#helm140').is_visible() and not p.locator('#arrestCard').is_visible())
    p.evaluate('window.__CHAOS_FREEZE__=false');p.keyboard.down('w');p.wait_for_timeout(600);p.keyboard.up('w');ck('W controls ship throttle again',state(p)['throttle']>0)
    p.screenshot(path=str(OUT/'reclaimed-helm.png'))
   ck(('Mobile' if mobile else 'Desktop')+' no uncaught errors',not errors,errors)
   ctx.close()
  browser.close()
 report['passed']=True
except Exception as e:
 report['passed']=False;report['error']=str(e);traceback.print_exc()
 try:report['state']=state(p);p.screenshot(path=str(OUT/'failure.png'));report['browserErrors']=errors
 except:pass
finally:(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
if not report['passed']:raise SystemExit(1)
