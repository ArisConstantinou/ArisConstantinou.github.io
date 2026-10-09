import json, os, math, traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT=Path('/tmp/captain171-qa'); OUT.mkdir(exist_ok=True)
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/captain/')
report={'version':'1.7.1','url':BASE,'environment':'Chromium with SwiftShader; desktop and emulated mobile (not a physical iPhone)','checks':[]}
def check(name,ok,detail=None):
    report['checks'].append({'name':name,'pass':bool(ok),'detail':detail})
    print(('PASS ' if ok else 'FAIL ')+name,flush=True)
    if not ok: raise AssertionError((name,detail))
def state(p): return p.evaluate('window.__lastCall.getState()')
try:
 with sync_playwright() as pw:
  b=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
  for mode,w,h,mobile in [('desktop',1365,900,False),('mobile',430,932,True)]:
   ctx=b.new_context(viewport={'width':w,'height':h},has_touch=mobile,is_mobile=mobile,device_scale_factor=1)
   p=ctx.new_page();errors=[];p.on('pageerror',lambda e: errors.append(str(e)))
   p.goto(BASE+'?test=1&v=171',wait_until='domcontentloaded')
   p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000)
   p.locator('#start').click()
   if mobile:
    p.locator('#drink').tap();p.locator('#leaveHelm').tap()
   else:
    p.keyboard.press('9');p.keyboard.press('f')
   p.wait_for_timeout(300)
   check(mode+': new release',state(p)['version']=='1.7.1')
   check(mode+': sip and exit enters real chapter',state(p)['chapter']['foot'])
   check(mode+': real animated first-person limbs',state(p)['chapter']['limbTriangles']>1000)
   if not mobile:
    check('Desktop joystick absent',not p.locator('#chaosMove').is_visible())
    check('Desktop WASD guide visible',p.locator('#keyboardMovement').is_visible())
    caps=p.locator('.movement-key-grid>kbd').all_text_contents()
    check('All four labelled keycaps',caps==['WΜΠΡΟΣΤΑ','AΑΡΙΣΤΕΡΑ','SΠΙΣΩ','DΔΕΞΙΑ'],caps)
    p.evaluate('window.__lastCall.test.chapter.setPosition(3,40,0)')
    for code,key in [('KeyW','w'),('KeyA','a'),('KeyS','s'),('KeyD','d')]:
     before=state(p)['chapter']['position'];p.keyboard.down(key);p.wait_for_timeout(300)
     cap=p.locator('#keyboardMovement [data-code="'+code+'"]')
     check(code+' held feedback','pressed' in (cap.get_attribute('class') or ''))
     after=state(p)['chapter']['position'];check(code+' actually moves character',math.hypot(after['x']-before['x'],after['z']-before['z'])>.03)
     p.keyboard.up(key);check(code+' clears on release','pressed' not in (cap.get_attribute('class') or ''))
    check('Walking does not accelerate ship',state(p)['throttle']==0)
    p.keyboard.down('w');p.keyboard.press('Escape')
    check('Pause clears held-key highlights',p.locator('#keyboardMovement .pressed').count()==0)
    p.keyboard.up('w');p.locator('#resume').click()
    p.evaluate('window.__lastCall.test.chapter.setPosition(0,56,Math.PI)');p.wait_for_timeout(300)
    check('Deck phase activates',state(p)['chapter']['phase']=='deck')
    p.screenshot(path=str(OUT/'desktop-wasd.png'))
    for width,height in [(932,430),(600,900)]:
     p.set_viewport_size({'width':width,'height':height});p.wait_for_timeout(250)
     check(f'Desktop {width}x{height} keeps WASD',p.locator('#keyboardMovement').is_visible() and not p.locator('#chaosMove').is_visible())
    p.set_viewport_size({'width':1365,'height':900});p.wait_for_timeout(100)
    p.evaluate('window.__CHAOS_FREEZE__=true')
    for key,kind in [('1','slap'),('2','heavy'),('3','punch'),('4','kick')]:
     p.evaluate('window.__lastCall.test.chapter.setState({stamina:100,health:100})')
     p.keyboard.press(key);a=state(p)['chapter']['attack']
     check('Key '+key+' starts '+kind,a is not None and a['kind']==kind,a)
     p.evaluate('window.__lastCall.test.chapter.advance(1.1)')
    p.keyboard.down('Numpad6');p.evaluate('window.__lastCall.test.chapter.advance(.1)')
    check('Numpad6 blocks','held' in (p.locator('#chaosBlock').get_attribute('class') or ''))
    p.keyboard.up('Numpad6');p.evaluate('window.__lastCall.test.chapter.advance(.1)')
    p.evaluate('window.__lastCall.test.chapter.setPosition(5.4,55.3,Math.PI/2); window.__lastCall.test.chapter.setState({stamina:100,health:100})')
    before=state(p)['chapter']['broken'];p.keyboard.press('4');p.evaluate('window.__lastCall.test.chapter.advance(1.1)')
    check('Window can break in the chapter',state(p)['chapter']['broken']>before)
    p.evaluate('window.__lastCall.test.chapter.spawnGuard()')
    check('Security actors exist',state(p)['chapter']['guardCount']>=1)
    p.evaluate('window.__lastCall.test.chapter.arrest()')
    check('Arrest hides keyboard guide',not p.locator('#keyboardMovement').is_visible())
    p.evaluate('window.__lastCall.test.chapter.advance(3)')
    check('Chapter completes in cell',state(p)['chapter']['phase']=='cell' and p.locator('#arrestCard').is_visible())
    p.evaluate('window.__CHAOS_FREEZE__=false');p.locator('#chaosReplay').click();p.wait_for_timeout(150)
    check('Replay resets to helm',state(p)['chapter']['phase']=='helm')
    p.wait_for_function('window.__lastCall.getState().voices.preRenderedGreekLoaded===18',timeout=20000)
    check('Existing speech assets retained',state(p)['voices']['preRenderedGreekLoaded']==18)
   else:
    check('Phone keeps touch joystick',p.locator('#chaosMove').is_visible())
    check('Phone hides WASD guide',not p.locator('#keyboardMovement').is_visible())
    p.evaluate('window.__lastCall.test.chapter.setPosition(3,40,0)');p.wait_for_timeout(150)
    r=p.locator('#chaosMove').bounding_box();x=r['x']+r['width']/2;y=r['y']+r['height']/2
    cd=ctx.new_cdp_session(p);before=state(p)['chapter']['position']
    cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y-34,'id':0}]});p.wait_for_timeout(600)
    cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
    after=state(p)['chapter']['position'];check('Touch gesture moves player',after['z']>before['z']+.05,[before,after])
    p.evaluate('window.__lastCall.test.chapter.setPosition(0,56,Math.PI)');p.wait_for_timeout(200)
    p.screenshot(path=str(OUT/'mobile-joystick.png'))
    check('Phone numbered combat controls visible',all(p.locator('[data-attack="'+k+'"]').is_visible() for k in ['slap','heavy','punch','kick']))
   check(mode+': no uncaught browser errors',not errors,errors)
   ctx.close()
  b.close()
 report['passed']=all(c['pass'] for c in report['checks'])
except Exception as exc:
 report['passed']=False;report['error']=str(exc);traceback.print_exc()
finally:
 (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
if not report['passed']: raise SystemExit(1)
