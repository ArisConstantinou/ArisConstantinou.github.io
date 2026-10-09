import json,os,math,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT=Path(os.environ.get('CAPTAIN_QA_OUT','/tmp/captain172-qa'));OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/captain/')
report={'version':'1.7.2','url':BASE,'environment':'Chromium with software GPU; desktop and emulated touch mobile, not a physical iPhone','checks':[]}
def check(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,flush=True)
 if not ok:raise AssertionError((name,detail))
def state(p):return p.evaluate('window.__lastCall.getState()')
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
  for mode,w,h,mobile in [('desktop',1365,900,False),('mobile',430,932,True)]:
   ctx=browser.new_context(viewport={'width':w,'height':h},has_touch=mobile,is_mobile=mobile,device_scale_factor=1)
   p=ctx.new_page();errors=[];requests=[];p.on('pageerror',lambda e:errors.append(str(e)));p.on('request',lambda r:requests.append(r.url))
   p.goto(BASE+'?test=1&v=172',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000)
   def press(selector):getattr(p.locator(selector),'tap' if mobile else 'click')()
   press('#start')
   if mobile:press('#drink');press('#leaveHelm')
   else:p.keyboard.press('9');p.keyboard.press('f')
   p.wait_for_timeout(300);chapter=state(p)['chapter']
   check(mode+': new release',state(p)['version']=='1.7.2')
   check(mode+': sip and exit enters chapter',chapter['foot'])
   check(mode+': real skinned first-person limbs',chapter['limbTriangles']>1000)
   check(mode+': dedicated captain model',chapter['captain']['role']=='captain' and chapter['captain']['source']=='civilian172')
   check(mode+': visible version badge','1.7.2' in p.locator('#releaseBadge').text_content())
   cast=chapter['actors'][:8];genders=[a['profile']['gender'] for a in cast if a['profile']['role']=='passenger']
   check(mode+': four male and three female guests',genders.count('male')==4 and genders.count('female')==3,genders)
   check(mode+': bartender staff model',sum(a['profile']['role']=='staff' for a in cast)==1)
   check(mode+': eight different clothing and hair profiles',len(set(a['profile']['id'] for a in cast))==8)
   check(mode+': no old soldier or Michelle requested',not any('/assets/people/' in u for u in requests),[u for u in requests if '.glb' in u])
   p.evaluate('window.__CHAOS_FREEZE__=true;window.__lastCall.test.chapter.setPosition(3,40,0);window.__lastCall.test.chapter.advance(4)')
   joints=p.evaluate('window.__lastCall.test.chapter.limbs()')
   check(mode+': idle wrists lowered beside waist',all(joints[n]['local'][1]<1.15 and joints[n]['local'][2]<.28 for n in ['lefthand','righthand']),joints)
   press('#captainIdentityButton');p.wait_for_function('window.__lastCall.getState().identity.frames>=3',timeout=20000)
   check(mode+': captain panel shows actual full body',state(p)['identity']['open'] and state(p)['identity']['fullBody'] and state(p)['identity']['role']=='captain')
   check(mode+': captain inspection pauses game',state(p)['paused'])
   check(mode+': full body has relaxed idle arms',all(state(p)['identity']['hands'][side][1]<1.2 for side in ['lefthand','righthand']))
   box=p.locator('.captain-profile-card').bounding_box();check(mode+': captain panel fits screen',box['x']>=0 and box['y']>=0 and box['x']+box['width']<=w+1 and box['y']+box['height']<=h+1,box)
   p.screenshot(path=str(OUT/(mode+'-captain.png')));press('[data-pose="slap"]');p.wait_for_timeout(150);press('#returnFromProfile')
   check(mode+': inspection returns to gameplay',not state(p)['identity']['open'] and not state(p)['paused']);p.evaluate('window.__CHAOS_FREEZE__=false')
   if not mobile:
    check('Desktop joystick absent',not p.locator('#chaosMove').is_visible());check('Desktop WASD visible',p.locator('#keyboardMovement').is_visible())
    caps=p.locator('.movement-key-grid>kbd').all_text_contents();check('All four labelled keycaps',caps==['WΜΠΡΟΣΤΑ','AΑΡΙΣΤΕΡΑ','SΠΙΣΩ','DΔΕΞΙΑ'],caps)
    for code,key in [('KeyW','w'),('KeyA','a'),('KeyS','s'),('KeyD','d')]:
     p.evaluate('window.__lastCall.test.chapter.setPosition(3,40,0)');before=state(p)['chapter']['position'];p.keyboard.down(key)
     p.wait_for_function('b=>{const p=window.__lastCall.getState().chapter.position;return Math.hypot(p.x-b.x,p.z-b.z)>.06}',arg=before,timeout=15000)
     cap=p.locator('#keyboardMovement [data-code="'+code+'"]');check(code+' held feedback','pressed' in (cap.get_attribute('class') or ''))
     after=state(p)['chapter']['position'];check(code+' moves captain',math.hypot(after['x']-before['x'],after['z']-before['z'])>.03)
     p.keyboard.up(key);check(code+' release clears highlight','pressed' not in (cap.get_attribute('class') or ''))
    check('Walking does not accelerate ship',state(p)['throttle']==0)
    p.keyboard.down('w');p.keyboard.press('Escape');check('Pause clears held-key highlights',p.locator('#keyboardMovement .pressed').count()==0);p.keyboard.up('w');press('#resume')
    p.evaluate('window.__lastCall.test.chapter.setPosition(0,56,Math.PI)');p.wait_for_function("window.__lastCall.getState().chapter.phase==='deck'",timeout=10000);check('Deck phase activates',state(p)['chapter']['phase']=='deck')
    p.evaluate('window.__lastCall.test.chapter.advance(3)');p.screenshot(path=str(OUT/'desktop-wasd.png'))
    for width,height in [(932,430),(600,900)]:
     p.set_viewport_size({'width':width,'height':height});p.wait_for_timeout(250);check(f'Desktop {width}x{height} keeps WASD',p.locator('#keyboardMovement').is_visible() and not p.locator('#chaosMove').is_visible())
    p.set_viewport_size({'width':1365,'height':900});p.evaluate('window.__CHAOS_FREEZE__=true')
    for key,kind in [('1','slap'),('2','heavy'),('3','punch'),('4','kick')]:
     p.evaluate('window.__lastCall.test.chapter.setState({stamina:100,health:100})');p.keyboard.press(key);a=state(p)['chapter']['attack'];check('Key '+key+' starts '+kind,a is not None and a['kind']==kind,a)
     p.evaluate('window.__lastCall.test.chapter.advance(.16)');joints=p.evaluate('window.__lastCall.test.chapter.limbs()');check(kind+': finite human joints',all(math.isfinite(v) for b in joints.values() for v in b['local']))
     if kind=='slap':p.screenshot(path=str(OUT/'captain-slap.png'))
     p.evaluate('window.__lastCall.test.chapter.advance(1.1)')
    p.keyboard.down('Numpad6');p.evaluate('window.__lastCall.test.chapter.advance(.1)');check('Numpad6 blocks','held' in (p.locator('#chaosBlock').get_attribute('class') or ''));p.keyboard.up('Numpad6');p.evaluate('window.__lastCall.test.chapter.advance(.1)')
    p.evaluate('window.__lastCall.test.chapter.setPosition(5.4,55.3,Math.PI/2);window.__lastCall.test.chapter.setState({stamina:100,health:100})');before=state(p)['chapter']['broken'];p.keyboard.press('4');p.evaluate('window.__lastCall.test.chapter.advance(1.1)');check('Window still breaks',state(p)['chapter']['broken']>before)
    p.evaluate('window.__lastCall.test.chapter.spawnGuard()');check('Security actor spawns',state(p)['chapter']['guardCount']>=1)
    p.evaluate('window.__lastCall.test.chapter.spawnGuard();window.__lastCall.test.chapter.spawnGuard()');guards=[a for a in state(p)['chapter']['actors'] if a['guard']]
    check('All guards have ship security profiles',len(guards)>=3 and all(a['profile']['role']=='security' for a in guards));check('Male and female security crew',len(set(a['profile']['gender'] for a in guards))==2)
    p.evaluate("""(()=>{const t=window.__lastCall.test.chapter;t.setPosition(0,57,0);t.advance(1);const spots=[[-2,60],[0,60],[2,60]];t.party.filter(n=>n.guard).forEach((n,i)=>{n.actor.group.position.set(spots[i%3][0],10.02,spots[i%3][1]);n.actor.group.rotation.y=Math.PI;n.actor.tick(0,{time:0});});})()""")
    p.wait_for_timeout(150);p.screenshot(path=str(OUT/'ship-security.png'))
    p.evaluate('window.__lastCall.test.chapter.arrest()');check('Arrest hides keyboard guide',not p.locator('#keyboardMovement').is_visible());p.evaluate('window.__lastCall.test.chapter.advance(3)');check('Chapter still ends in cell',state(p)['chapter']['phase']=='cell' and p.locator('#arrestCard').is_visible())
    p.evaluate('window.__CHAOS_FREEZE__=false');press('#chaosReplay');p.wait_for_timeout(150);check('Replay resets to helm',state(p)['chapter']['phase']=='helm')
    p.wait_for_function('window.__lastCall.getState().voices.preRenderedGreekLoaded===18',timeout=30000);check('All 18 speech files retained',state(p)['voices']['preRenderedGreekLoaded']==18)
   else:
    check('Phone retains touch joystick',p.locator('#chaosMove').is_visible());check('Phone hides WASD guide',not p.locator('#keyboardMovement').is_visible())
    p.evaluate('window.__lastCall.test.chapter.setPosition(3,40,0)');p.wait_for_timeout(150);r=p.locator('#chaosMove').bounding_box();x=r['x']+r['width']/2;y=r['y']+r['height']/2
    cd=ctx.new_cdp_session(p);before=state(p)['chapter']['position'];cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y-34,'id':0}]});p.wait_for_function('b=>window.__lastCall.getState().chapter.position.z>b.z+.08',arg=before,timeout=15000);cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
    after=state(p)['chapter']['position'];check('Touch gesture moves captain',after['z']>before['z']+.05,[before,after]);p.evaluate('window.__lastCall.test.chapter.setPosition(0,56,Math.PI)');p.wait_for_function("window.__lastCall.getState().chapter.phase==='deck'",timeout=10000);p.screenshot(path=str(OUT/'mobile-joystick.png'));check('Phone numbered combat buttons remain visible',all(p.locator('[data-attack="'+k+'"]').is_visible() for k in ['slap','heavy','punch','kick']))
   check(mode+': no uncaught errors',not errors,errors);ctx.close()
  browser.close()
 report['passed']=all(c['pass'] for c in report['checks'])
except Exception as exc:
 report['passed']=False;report['error']=str(exc);traceback.print_exc()
 try:report['lastState']=state(p);p.screenshot(path=str(OUT/'failure.png'))
 except Exception:pass
finally:(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
if not report['passed']:raise SystemExit(1)
