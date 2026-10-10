"""Exercise real controls and natural alarm/AI custody, never test.arrest/spawnGuard/health cheats."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,math,os,traceback
OUT=Path('/tmp/captain173-qa');OUT.mkdir(exist_ok=True)
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/captain/')
report={'version':'1.7.3','url':BASE,'environment':'Chromium; real mouse and emulated touch, not physical iPhone','checks':[],'custodyRuns':[]}
def ck(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,flush=True)
 if not ok:raise AssertionError((name,detail))
def state(p):return p.evaluate('window.__lastCall.getState()')
def advance(p,n):p.evaluate('(n)=>window.__lastCall.test.chapter.advance(n)',n)
def pos(p,x,z,yaw=0):p.evaluate('a=>window.__lastCall.test.chapter.setPosition(...a)',[x,z,yaw]);advance(p,.12);p.wait_for_timeout(90)
def snap(p,name):p.screenshot(path=str(OUT/(name+'.png')))
def verify_touch(p,w,h):
 p.set_viewport_size({'width':w,'height':h});p.wait_for_timeout(200)
 ck(f'{w}x{h}: touch only',p.locator('#chaosMove').is_visible() and not p.locator('#keyboardMovement').is_visible())
 ck(f'{w}x{h}: no visible keyboard hints',p.locator('#hud kbd:visible').count()==0 and 'F ·' not in p.locator('#chaosUse').inner_text() and '9 ' not in p.locator('#chapterDetail').inner_text())
 selectors=['#chaosMove','#chaosUse','#captainVitals']+['[data-attack="'+k+'"]' for k in ['slap','heavy','punch','kick','spit']]+['#chaosBlock','#chaosGrab','#chaosThrow','#chaosDrink']
 boxes=[]
 for sel in selectors:
  el=p.locator(sel);r=el.bounding_box();ck(f'{w}x{h}: in viewport {sel}',r is not None and r['x']>=-1 and r['y']>=-1 and r['x']+r['width']<=w+1 and r['y']+r['height']<=h+1,r)
  if sel not in ['#captainVitals','#chaosMove']:ck(f'{w}x{h}: touch size {sel}',r['width']>=44 and r['height']>=44,r)
  boxes.append((sel,r))
 overlaps=[]
 for i,(a,r) in enumerate(boxes):
  for b,s in boxes[i+1:]:
   dx=min(r['x']+r['width'],s['x']+s['width'])-max(r['x'],s['x']);dy=min(r['y']+r['height'],s['y']+s['height'])-max(r['y'],s['y'])
   if dx>2 and dy>2:overlaps.append([a,b,round(dx,1),round(dy,1)])
 ck(f'{w}x{h}: controls and meters do not overlap',not overlaps,overlaps)
 snap(p,'mobile-'+str(w)+'x'+str(h))
def start_foot(p,touch):
 p.locator('#start').tap() if touch else p.locator('#start').click()
 p.locator('#drink').tap() if touch else p.keyboard.press('9')
 p.locator('#leaveHelm').tap() if touch else p.keyboard.press('f')
 p.wait_for_timeout(200);ck('First sip and exit playable',state(p)['chapter']['foot'])
 p.evaluate('window.__CHAOS_FREEZE__=true');pos(p,0,56,math.pi)
def incident(p,touch):
 pos(p,5.4,55.3,math.pi/2);before=state(p)['chapter']['broken'];
 p.locator('[data-attack="kick"]').tap() if touch else p.keyboard.press('4')
 advance(p,1.2);ck('Real input breaks windscreen and starts alarm',state(p)['chapter']['broken']>before and state(p)['chapter']['alarmAt'] is not None)
def custody(p,destination,label):
 pos(p,*destination);history=[];observed=False;guard_up=False
 for i in range(160):
  advance(p,.75);s=state(p)['chapter'];history.append({k:s[k] for k in ['phase','time','health','capture','nearGuards','guardCount']})
  guard_up |= any(n['guard'] and n['y']>17 for n in s['actors'])
  if 0<s['capture']<100:
   observed=True
   if s['capture']>25 and not (OUT/(label+'-restrained.png')).exists():snap(p,label+'-restrained')
  if s['phase']=='arrested':snap(p,label+'-transfer')
  if s['phase']=='cell':break
 report['custodyRuns'].append({'name':label,'history':history,'guardsReachedBridge':guard_up})
 ck(label+': AI arrest reaches physical cell',s['phase']=='cell',s)
 ck(label+': captain is inside the visible jail',s['cellVisible'] and s['cellCaptainVisible'])
 ck(label+': custody meter is complete',p.locator('#vitalCustodyValue').inner_text()=='100%')
 ck(label+': no controls or helm leaking through jail',not p.locator('#chaosMove').is_visible() and not p.locator('.combat-panel').is_visible() and not p.locator('#helm140').is_visible())
 if label=='deck':ck('Proximity restraint visibly builds before arrest',observed)
 if label=='bridge':ck('Guards followed the physical stairs to the bridge',guard_up)
 snap(p,label+'-jail')
try:
 with sync_playwright() as pw:
  b=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
  for touch in [True,False]:
   ctx=b.new_context(viewport={'width':430 if touch else 1365,'height':832 if touch else 900},is_mobile=touch,has_touch=touch,device_scale_factor=1)
   p=ctx.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
   p.goto(BASE+'?test=1&v=173',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000)
   start_foot(p,touch);ck('Release 1.7.3',state(p)['version']=='1.7.3')
   if touch:
    ck('Health, drunk and custody displayed',all(p.locator('#vital'+i+'Value').is_visible() for i in ['Life','Drunk','Custody']))
    advance(p,2);ck('Drunk meter follows gradual absorption',int(p.locator('#vitalDrunkValue').inner_text().strip('%'))>0)
    for w,h in [(430,832),(390,744),(320,568),(932,430),(768,1024)]:verify_touch(p,w,h)
    p.set_viewport_size({'width':430,'height':832});pos(p,.8,56.4,math.pi)
    ck('Context action offers real interaction',not p.locator('#chaosUse').is_disabled(),p.locator('#chaosUse').inner_text())
    p.locator('#chaosUse').tap();ck('Touch interaction reaches passenger',p.locator('.chaos-bubble').count()>0)
    pos(p,-4.2,56.55,math.pi);ck('Context action is grab',p.locator('#chaosUse').get_attribute('data-action')=='grab',p.locator('#chaosUse').inner_text())
    p.locator('#chaosUse').tap();advance(p,.12);ck('Touch grabs object',state(p)['chapter']['held'] is not None)
    ck('Held object changes contextual action to throw',p.locator('#chaosUse').get_attribute('data-action')=='throw')
    p.locator('#chaosUse').tap();advance(p,.12);ck('Touch throws held object',state(p)['chapter']['held'] is None)
    pos(p,0,56,0);pad=p.locator('#chaosMove').bounding_box();block=p.locator('#chaosBlock').bounding_box();cd=ctx.new_cdp_session(p)
    x=pad['x']+pad['width']/2;y=pad['y']+pad['height']/2;bx=block['x']+block['width']/2;by=block['y']+block['height']/2
    before=state(p)['chapter']['position'];cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y-25,'id':0},{'x':bx,'y':by,'id':1}]});advance(p,.2)
    ck('Two fingers: walk while blocking',state(p)['chapter']['position']['z']>before['z']+.04 and 'held' in (p.locator('#chaosBlock').get_attribute('class') or ''))
    cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});advance(p,.1)
    ck('Release clears block', 'held' not in (p.locator('#chaosBlock').get_attribute('class') or ''))
    incident(p,True);custody(p,[0,56,0],'deck')
    p.locator('#chaosReplay').tap();p.wait_for_timeout(150)
    ck('Replay resets health, custody and jail',state(p)['chapter']['health']==100 and state(p)['chapter']['capture']==0 and not state(p)['chapter']['cellVisible'])
    p.evaluate('window.__CHAOS_FREEZE__=false')
   else:
    ck('Desktop still has WASD and numeric keys',p.locator('#keyboardMovement').is_visible() and not p.locator('#chaosMove').is_visible() and p.locator('[data-attack="slap"] kbd').is_visible())
    pos(p,3,40,0);before=state(p)['chapter']['position'];p.keyboard.down('w');advance(p,.2);p.keyboard.up('w');ck('Desktop WASD still moves character',state(p)['chapter']['position']['z']>before['z']+.1)
    snap(p,'desktop-ui');pos(p,0,56,math.pi);incident(p,False);custody(p,[3,40,0],'bridge')
   ck(('touch' if touch else 'desktop')+': no uncaught runtime errors',not errors,errors)
   ctx.close()
  b.close()
 report['passed']=True
except Exception as e:
 report['passed']=False;report['error']=str(e);traceback.print_exc()
 try:report['state']=state(p);snap(p,'failure')
 except Exception:pass
finally:(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
if not report['passed']:raise SystemExit(1)
