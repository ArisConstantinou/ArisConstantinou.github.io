from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,math,traceback,base64
R=Path.cwd();OUT=Path('/tmp/captain190-qa');OUT.mkdir(exist_ok=True)
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/')
report={'version':'Story 1.9.0 / Mayhem 1.1.0','base':BASE,'checks':[],'notes':['Browser automation, not a physical iPhone. Isolated tests use position/aim fixtures; actions use real input handlers.','Six pursuit boats active at most; waves continue without a final wave.']}
p=None;errors=[]
def check(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,flush=True)
 if not ok:
  try:
   report['failureState']=st();report['browserErrors']=errors
   shot(path=str(OUT/'failure.png'))
  except Exception:pass
  (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
  raise AssertionError(name+' '+str(detail))
def shot(path):
 # Capture representative interiors as well as the helm.
 old=p.evaluate('!!window.__CHAOS_FREEZE__')
 before=p.evaluate("window.__CHAOS_FREEZE__=true;window.__CAPTAIN_HOLD_FRAME__=true;window.__CAPTAIN_DRAW_ONCE__=true;window.__lastCall.getState().frames")
 try:
  p.wait_for_function('(n)=>window.__lastCall.getState().frames>n',arg=before,timeout=45000)
  p.wait_for_timeout(180)
  data=p.context.new_cdp_session(p).send('Page.captureScreenshot',{'format':'png','fromSurface':True})
  Path(path).write_bytes(base64.b64decode(data['data']))
  info=st();print('FRAME',Path(path).name,info.get('drawCalls'),info.get('triangles'),flush=True)
 finally:p.evaluate('(old)=>{window.__CAPTAIN_HOLD_FRAME__=false;window.__CHAOS_FREEZE__=old;}',old)
def st():return p.evaluate('window.__lastCall.getState()')
def ch():return st()['chapter']
def advance(sec):p.evaluate('(n)=>window.__lastCall.test.chapter.advance(n)',sec)
def place(x,y,z,yaw=0):p.evaluate('(a)=>window.__lastCall.test.chapter.setPosition3(...a)',[x,y,z,yaw]);advance(.05)
def keyhold(k,t):p.keyboard.down(k);advance(t);p.keyboard.up(k)
def fresh(browser,mode='captain-mayhem',touch=False,w=1280,h=800):
 global p,errors
 ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=touch,has_touch=touch,service_workers='block');p=ctx.new_page();errors=[];p.on('pageerror',lambda e:(errors.append(str(e)),print('PAGEERROR',str(e),flush=True)))
 p.goto(BASE+mode+'/?test=1&qa=190',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready || document.querySelector("#errorText")?.textContent',timeout=90000)
 check(mode+' loaded',p.evaluate('!!window.__lastCall?.getState()?.ready'),p.locator('#errorText').text_content())
 (p.locator('#start').tap() if touch else p.locator('#start').click());p.wait_for_timeout(250);return ctx
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
  ctx=fresh(browser)
  check('Mayhem starts at the helm',ch()['helm'] and not ch()['foot'])
  check('Mobile-compatible exit is enabled',p.locator('#leaveHelm').is_enabled())
  check('Two friendly escort boats, not hostile',len(st()['marine']['boats'])==2 and not st()['marine']['hostile'])
  check('Rendered town includes 36 detailed buildings',st()['marine']['townBuildings']==36)
  shot(path=str(OUT/'mayhem-helm.png'))
  a=st();p.keyboard.down('w');p.wait_for_timeout(600);p.keyboard.up('w');check('W raises real throttle',st()['throttle']>a['throttle'])
  p.evaluate('window.__lastCall.test.setState({speed:6})');a=st()['heading'];p.keyboard.down('d');p.wait_for_function('(a)=>Math.abs(window.__lastCall.getState().heading-a)>.0005',arg=a,timeout=15000);p.keyboard.up('d');check('D changes actual ship heading',abs(st()['heading']-a)>.0005,st()['heading']-a)
  p.keyboard.press('f');p.wait_for_timeout(150);check('Leave helm into FPS',ch()['foot'])
  p.evaluate('window.__CHAOS_FREEZE__=true')
  place(1.2,18.43,44.4);p.keyboard.press('f');advance(.1);check('Return to helm via F',not ch()['foot'])
  check('Helm UI available in Mayhem',p.locator('#helm140').is_visible() and p.locator('#engineLever').is_visible())
  p.keyboard.press('f');advance(.1)
  signs=p.evaluate('window.__lastCall.test.inspectArchitecture().signs')
  check('All authored signs have two independent FrontSide faces',len(signs)>20 and all(len(q['faces'])==2 and all(f['side']==0 for f in q['faces']) and abs(q['faces'][1]['rotation']-math.pi)<.001 for q in signs),len(signs))
  check('Playground registers many actual props and mechanisms',ch()['playground']['props']>=45 and ch()['playground']['usable']>=7,ch()['playground'])
  # Actual locomotion over all five deck connections. Position fixtures only at flight entry.
  ys=[6.65,10.1,13.12,15.83,18.57,21.35]
  for i in range(5):
   place(5,ys[i],17.3,0);keyhold('w',3.4)
   check('Stair traversal deck '+str(i+4)+' to '+str(i+5),abs(ch()['position']['y']-ys[i+1])<.24,ch()['position'])
  place(5,10.1,17.3,0);p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(150);shot(path=str(OUT/'stairs.png'));p.evaluate('window.__CHAOS_FREEZE__=true')
  # A cabin and the service deck remain reachable with room collisions, not imported cutscenes.
  for title,x,y,z,yaw in [('lounge',-5.5,10.1,6,math.pi),('engine',0,6.65,-1,math.pi),('cabins',0,13.12,0,-math.pi/2),('restaurant',0,15.83,18,math.pi)]:
   place(x,y,z,yaw);p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(120);shot(path=str(OUT/(title+'.png')));p.evaluate('window.__CHAOS_FREEZE__=true');check(title+' walkable deck',abs(ch()['position']['y']-y)<.22)
  # Piano and vending mechanism use the real F handler, not a direct success flag.
  place(-5.6,10.1,-6.95,math.pi);before=ch()['playground']['used'];p.keyboard.press('f');advance(.05);check('Piano plays through interaction',ch()['playground']['used']>before,ch()['playground'])
  place(-7.55,10.1,6.15,math.pi);before=ch()['playground']['cascades'];p.keyboard.press('f');advance(.12);check('Soda machine releases physical cans',ch()['playground']['cascades']>before,ch()['playground'])
  p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(120);shot(path=str(OUT/'interactive-soda.png'));p.evaluate('window.__CHAOS_FREEZE__=true')
  # Throw toward a nearby escort: fixture aligns vessel / player, actual pickup and R throw.
  p.evaluate('window.__lastCall.test.setState({x:0,z:0,heading:0,speed:0})');place(10.45,10.1,5.95,math.pi);p.keyboard.press('x');advance(.06)
  check('Rail object can be picked up',ch()['held'] is not None,ch()['held'])
  p.evaluate('window.__lastCall.test.chapter.aim(Math.PI/2,.6);const b=window.__lastCall.test.marine.boats[0];b.x=28;b.z=6;b.speed=0;')
  p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(150);p.keyboard.press('r');report['launch']=st()['marine'];print('LAUNCH',report['launch'],flush=True);p.evaluate('window.__CHAOS_FREEZE__=true;window.__lastCall.test.marine.advance(2)')
  check('Physical throw hits escort and requests police',st()['marine']['hostile'],st()['marine'])
  p.evaluate('window.__CHAOS_FREEZE__=true;window.__lastCall.test.marine.advance(12)')
  check('Police reinforcements arrive after initial attack',any(q['kind']=='police' for q in st()['marine']['boats']),st()['marine'])
  p.evaluate('window.__lastCall.test.marine.advance(70)');check('Chase continues with a bounded active fleet',st()['marine']['wave']>=4 and len([q for q in st()['marine']['boats'] if q['kind']!='rescue' and not q['sinking']])<=6,st()['marine'])
  place(1.2,18.43,44.4);p.evaluate('window.__lastCall.test.setState({intox:70})');p.keyboard.press('f');advance(.15)
  p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(300);p.evaluate('window.__lastCall.test.marine.advance(.3)');p.locator('#bridgeLock').click();p.wait_for_timeout(150)
  check('Bridge doors lock and evacuation starts',ch()['bridgeLocked'] and st()['marine']['evacuation'])
  check('Navigation lights and rocky approaches present',st()['marine']['navigationLights']>=12 and st()['marine']['rockyObstacles']>=8)
  shot(path=str(OUT/'chase-helm.png'));p.evaluate('window.__CHAOS_FREEZE__=true')
  # Cabin interaction uses real F input and actual collision props.
  p.evaluate('window.__CHAOS_FREEZE__=true');p.keyboard.press('f');advance(.1)
  place(-1.3,13.12,-9.5,-math.pi/2);p.keyboard.press('f');advance(.1)
  check('Cabin door locks via real interaction',any(d['locked'] for d in ch()['cabins']),ch()['cabins'])
  p.keyboard.press('f');advance(.1)
  check('Same door unlocks without a dead end',not any(d['locked'] for d in ch()['cabins']))
  place(1.2,18.43,44.4);p.keyboard.press('f');advance(.1)
  # One civilian is positioned at its exit as an isolated jump/rescue transition fixture.
  p.evaluate('const n=window.__lastCall.test.chapter.party[0];n.health=55;n.actor.group.position.set(10.5,10.1,43.5);')
  advance(.1);p.evaluate('window.__lastCall.test.marine.advance(5)');check('Evacuation enters an actual water/rescue state',st()['marine']['swimmers']+st()['marine']['rescued']>0,st()['marine'])
  p.evaluate('window.__lastCall.test.setState({x:0,z:1530,speed:0,heading:0})');check('Dock requires real location and low speed',p.evaluate('window.__lastCall.test.marine.canDock()'))
  p.evaluate('window.__CHAOS_FREEZE__=false');p.wait_for_timeout(150);p.evaluate('window.__lastCall.test.marine.advance(.3)');p.locator('#seaDock').click();check('Dock interaction works without ending Mayhem',st()['marine']['docked']);shot(path=str(OUT/'port-approach.png'))
  check('No browser runtime errors',not errors,errors);ctx.close()
  for w,h in [(390,760),(320,568),(844,390)]:
   ctx=fresh(browser,touch=True,w=w,h=h);check('Touch helm usable '+str(w),p.locator('#engineLever').is_visible());p.locator('#leaveHelm').tap();p.wait_for_timeout(150)
   check('Touch keeps joystick, no desktop keys '+str(w),p.locator('#chaosMove').is_visible() and p.locator('#keyboardMovement:visible').count()==0 and p.locator('#chaos170 kbd:visible').count()==0)
   shot(path=str(OUT/(f'mobile-{w}.png')));check('Touch has no errors '+str(w),not errors,errors);ctx.close()
  ctx=fresh(browser,mode='captain');check('Story retained new version',st()['version']=='1.9.0');check('Story starts in helm chapter',ch()['phase']=='helm');check('Story runtime errors absent',not errors,errors);ctx.close();browser.close()
 report['passed']=True
except Exception as e:
 report['passed']=False;report['error']=str(e);traceback.print_exc()
 try:report['state']=st();report['browserErrors']=errors;shot(path=str(OUT/'failure.png'))
 except:pass
finally:(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
if not report.get('passed'):raise SystemExit(1)
