"""Real WebGL/touch checks. This is not a claim of human Greek acting."""
import json,os,pathlib,threading,http.server,functools,traceback,math,sys
from playwright.sync_api import sync_playwright
ROOT=pathlib.Path.cwd();OUT=pathlib.Path(os.environ.get('CAPTAIN_QA_OUT','/tmp/captain140-qa'));OUT.mkdir(parents=True,exist_ok=True)
BASE=os.environ.get('CAPTAIN_QA_URL','http://127.0.0.1:8765/captain/')
if BASE.startswith('http://127.0.0.1'):
 class Handler(http.server.SimpleHTTPRequestHandler):
  def log_message(self,*args):pass
 server=http.server.ThreadingHTTPServer(('127.0.0.1',8765),functools.partial(Handler,directory=str(ROOT)));threading.Thread(target=server.serve_forever,daemon=True).start()
report={'version':'1.4.0','url':BASE,'checks':[],'errors':[]}
def check(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,flush=True);assert ok,name+' '+str(detail)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 ctx=b.new_context(viewport={'width':430,'height':744},is_mobile=True,has_touch=True,device_scale_factor=1)
 page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
 requests=[];page.on('request',lambda r:requests.append(r.url));session=ctx.new_cdp_session(page)
 def state():return page.evaluate('window.__lastCall.getState()')
 def frames(n=4):page.wait_for_function('(n)=>window.__lastCall.getState().frames>=n',arg=state()['frames']+n,timeout=30000)
 def touch(kind,pts):session.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[{'id':i,'x':x,'y':y,'radiusX':3,'radiusY':3,'force':1} for i,x,y in pts]})
 def anchor():return page.evaluate('window.__lastCall.test.anchor()')
 def rect(id):return page.locator(id).bounding_box()
 def overlap(a,r):return a['minX']<r['x']+r['width'] and a['maxX']>r['x'] and a['minY']<r['y']+r['height'] and a['maxY']>r['y']
 try:
  page.goto(BASE+'?test=1&v=140',wait_until='domcontentloaded',timeout=60000);page.wait_for_function('window.__lastCall?.getState().ready',timeout=90000);page.locator('#start').click();frames(6)
  check('Version 1.4 and actual 3D geometry render',state()['version']=='1.4.0' and state()['playing'] and state()['triangles']>10000)
  check('Floating bridge arrows removed',page.locator('#helmLeft,#helmRight,.wheel-arrow').count()==0)
  check('Half-screen panel stays removed',not page.locator('.controls-bottom').is_visible())
  a=anchor();x=a['x'];y=a['y']-a['radius']*.64
  check('Wheel touch hits canvas rather than UI overlay',page.evaluate('([x,y])=>document.elementFromPoint(x,y).id',[x,y])=='sea')
  touch('touchStart',[(1,x,y)]);frames();check('Rendered wheel touch captures steering',state()['controls']['kind']=='wheel')
  r=a['radius']*.64
  for angle in [-1.3,-1,-.7,-.4,0,.35,.7]:
   x=a['x']+math.cos(angle)*r;y=a['y']+math.sin(angle)*r;touch('touchMove',[(1,x,y)]);frames(1)
  check('Clockwise drag steers starboard',state()['turn']>.65,state()['turn'])
  check('Visible wheel rotation follows finger demand',abs(state()['wheelAngle']-state()['turn']*math.pi*.84)<.03)
  before=state()['turn'];frames(5);check('Hold keeps helm demand',abs(state()['turn']-before)<.002)
  check('Wheel drag does not drag camera',abs(state()['look']['yaw'])<.001)
  lr=rect('#engineLever');lx=lr['x']+lr['width']/2;top=lr['y']+2;mid=lr['y']+lr['height']/2;bottom=lr['y']+lr['height']-2
  touch('touchStart',[(1,x,y),(2,lx,top)]);frames();check('Independent wheel and engine fingers',state()['controls']['steering'] and state()['controls']['lever'] and state()['throttle']>.9)
  touch('touchMove',[(1,x,y),(2,lx,mid)]);frames();check('Physical midpoint is neutral',state()['throttle']==0)
  touch('touchMove',[(1,x,y),(2,lx,bottom)]);frames();check('Drag down commands reverse',state()['throttle']<-.3)
  touch('touchEnd',[(2,lx,bottom)]);frames();check('Releasing lever retains wheel and power',state()['controls']['steering'] and not state()['controls']['lever'] and state()['throttle']<-.3,state()['controls'])
  touch('touchEnd',[]);frames();check('Releasing wheel clears command',state()['turn']==0 and not state()['controls']['steering'])
  page.locator('#leverNeutral').click();frames();check('N returns power to zero',state()['throttle']==0)
  a=anchor();r=a['radius']*.65;x=a['x']-r;y=a['y']+1;touch('touchStart',[(3,x,y)]);frames();old=state()['turn'];touch('touchMove',[(3,x,y-2)]);frames();check('Angle wrap avoids rudder snap',abs(state()['turn']-old)<.1)
  touch('touchEnd',[]);page.evaluate('window.__lastCall.test.restart()');frames();a=anchor();r=a['radius']*.65;touch('touchStart',[(4,a['x'],a['y']-r)])
  for angle in [-1.8,-2.1,-2.5,-2.9,-3.3,-3.8]:touch('touchMove',[(4,a['x']+math.cos(angle)*r,a['y']+math.sin(angle)*r)]);frames(1)
  check('Counterclockwise drag steers port',state()['turn']<-.6)
  touch('touchCancel',[]);frames();check('Cancelled touch cannot stick rudder',state()['turn']==0)
  screenshots=[]
  for w,h in [(430,744),(375,650),(932,430),(1280,800)]:
   page.set_viewport_size({'width':w,'height':h});page.evaluate('window.__lastCall.test.setState({intox:98})');frames(5)
   for yaw in [0,-.4,.4,-.7,.7]:
    page.evaluate('(y)=>window.__lastCall.test.look(y)',yaw);frames(3);a=anchor();lr=rect('#leverShell');nr=rect('#leverNeutral')
    check(f'Lever clears wheel {w}x{h}, look {yaw}',not a['visible'] or not overlap(a,lr),{'wheel':{k:a[k] for k in ['x','y','minX','maxX','minY','maxY','visible']},'lever':lr})
    check(f'Neutral stays inside shell {w}x{h}, look {yaw}',nr['x']>=lr['x']-1 and nr['x']+nr['width']<=lr['x']+lr['width']+1)
   page.evaluate('window.__lastCall.test.look(0)');page.evaluate('window.__lastCall.test.setState({intox:0})');frames(3);page.screenshot(path=str(OUT/f'bridge-{w}x{h}.png'));screenshots.append(f'bridge-{w}x{h}.png')
  page.set_viewport_size({'width':430,'height':744});page.evaluate('window.__lastCall.test.camera(0)');frames(5);check('External view uses compact pad',page.locator('#helmPad').is_visible())
  pr=rect('#helmPad');px=pr['x']+pr['width']-10;py=pr['y']+pr['height']/2;touch('touchStart',[(5,px,py)]);frames();check('External pad still works',state()['turn']>.7);touch('touchEnd',[]);page.screenshot(path=str(OUT/'outside-430x744.png'))
  page.evaluate('window.__lastCall.test.camera(1)');frames();a=anchor();touch('touchStart',[(6,a['x'],a['y']-a['radius']*.6)]);frames();page.locator('#camera').click();frames();touch('touchEnd',[]);check('Changing camera releases wheel',not state()['controls']['steering'] and state()['turn']==0)
  page.locator('#drink').click();frames();check('Actions remain accessible',state()['intox']>20)
  check('No machine voice assets requested',not any('/voices130/' in u for u in requests))
  page.wait_for_function('window.__lastCall.getState().voices.effectsLoaded===2',timeout=30000);check('Two actual human vocal assets decoded',state()['voices']['effectsLoaded']==2,state()['voices'])
  page.evaluate("window.__lastCall.test.say('panic')");frames();check('Human vocal recording plays',state()['voices']['played']>0 and state()['voices']['lastKind']=='human-nonverbal')
  check('Missing spoken Greek is reported honestly',state()['voices']['missingGreekDialogue'] and state()['voices']['dialogueLoaded']==0)
  check('Selection disabled on canvas',page.evaluate("getComputedStyle(document.getElementById('sea')).userSelect==='none'"))
  page.locator('#pause').click();check('Pause releases gestures',state()['paused'] and not state()['controls']['steering']);page.locator('#resume').click();frames();check('No runtime errors',not report['errors'],report['errors'])
  # Import a real audio fixture in an isolated test browser. This does not test
  # Greek acting and does not publish the fixture as a spoken Greek line.
  studio=ctx.new_page();studio.goto(BASE+'voices.html');studio.wait_for_function("document.querySelectorAll('.row').length===18")
  studio.locator('.row input[type=file]').first.set_input_files(str(ROOT/'captain/assets/human140/hiccup.mp3'));studio.wait_for_function("document.querySelector('.done').textContent.includes('Αποθηκευμένη')")
  check('Recording import persists in IndexedDB',studio.locator('.done').first.inner_text().startswith('✓'))
  page.bring_to_front();page.evaluate('window.dispatchEvent(new Event("focus"))')
  if state()['paused']:page.locator('#resume').click()
  frames();page.wait_for_function('window.__lastCall.getState().voices.dialogueLoaded===1');check('Game loads locally imported audio without TTS',state()['voices']['dialogueLoaded']==1)
  report['screenshots']=screenshots;report['passed']=True
 except Exception:
  report['passed']=False;report['exception']=traceback.format_exc();print(report['exception'],flush=True)
  try:report['failureState']=state()
  except:pass
  try:page.screenshot(path=str(OUT/'failure.png'))
  except:pass
 finally:
  b.close();(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('RESULT',report['passed'],len(report['checks']),flush=True)
sys.exit(0 if report['passed'] else 1)
