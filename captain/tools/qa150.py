"""Real audio-signal tests: a decoded file or a call counter is not audibility."""
from pathlib import Path
import http.server,functools,threading,json,traceback,os,math,time
from playwright.sync_api import sync_playwright
ROOT=Path.cwd();OUT=Path(os.environ.get('CAPTAIN_QA_OUT','/tmp/captain150-qa'));OUT.mkdir(parents=True,exist_ok=True)
LIVE=os.environ.get('CAPTAIN_LIVE_URL');BASE=LIVE or 'http://127.0.0.1:8765/captain/'
report={'version':'1.5.0','url':BASE,'checks':[],'errors':[],'engines':[]}
IDS=['rock','ice','brace','rail','panic','jackets','water','safe','rescued','captain1','captain2','captain3','captain4','captain5','captain6','reply','calm','hum']
def check(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,flush=True);assert ok,name+' '+str(detail)
HARNESS='''<!doctype html><meta charset="utf-8"><button id="go">Start sound</button><script type="module">
const q=new URLSearchParams(location.search),m=await import('./'+(q.has('old')?'audio.js':'audio150.js'));
window.a=m.createAudio();window.ready=true;
go.onclick=()=>{window.boot=a.start();if(q.has('queue'))window.accepted=a.voice('rock');};
setInterval(()=>a.update({playing:false,panic:0,intox:0}),80);
</script>'''
class Handler(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
 def do_GET(self):
  if self.path.split('?')[0]=='/captain/audio-harness150.html':
   data=HARNESS.encode();self.send_response(200);self.send_header('Content-Type','text/html');self.end_headers();self.wfile.write(data)
  else:super().do_GET()
server=http.server.ThreadingHTTPServer(('127.0.0.1',8765),functools.partial(Handler,directory=str(ROOT)));threading.Thread(target=server.serve_forever,daemon=True).start()
def signal(page,id,prefix=''):
 page.evaluate('a.stopVoice()');res=page.evaluate('(id)=>a.voice(id,{pan:NaN})',id)
 check(prefix+id+' accepted as speech',isinstance(res,(float,int)) and res>0,res)
 page.wait_for_function('a.voiceStatus().signal.voice.rms>0.0001 && a.voiceStatus().signal.output.rms>0.00002',timeout=9000)
 s=page.evaluate('a.voiceStatus()')
 check(prefix+id+' produces nonzero voice AND destination signal',s['lastClip']['id']==id and s['signal']['voice']['rms']>.0001,{'kind':s['lastClip']['kind'],'signal':s['signal']})
 page.evaluate('a.stopVoice()');page.wait_for_timeout(80)
try:
 with sync_playwright() as p:
  for engine in ['chromium','webkit']:
   launch={'headless':True}
   if engine=='chromium':launch['args']=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']
   browser=getattr(p,engine).launch(**launch);report['engines'].append(engine)
   context=browser.new_context(has_touch=True,viewport={'width':430,'height':744},service_workers='block')
   page=context.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
   page.goto('http://127.0.0.1:8765/captain/audio-harness150.html');page.wait_for_function('window.ready');page.click('#go');page.wait_for_function('a.voiceStatus().preRenderedGreekLoaded===18 && a.voiceStatus().effectsLoaded===2',timeout=30000)
   check(engine+' loads 18 spoken MP3s and 2 effects',page.evaluate('a.voiceStatus().failed')==0)
   for id in IDS:signal(page,id,engine+' ')
   page.evaluate("a.voice('captain6');a.voice('rock');a.setEnabled(false)");page.wait_for_timeout(400)
   s=page.evaluate('a.voiceStatus()');check(engine+' mute clears voice and queued dialogue',not s['speaking'] and not s['queued'] and s['signal']['output']['rms']<.0001,s['signal'])
   page.evaluate('a.setEnabled(true)');page.click('#go');signal(page,'captain2',engine+' after unmute ')
   page.evaluate('a.stop()');check(engine+' stopped context refuses speech',page.evaluate("a.voice('rock')") is False)
   page.click('#go');signal(page,'calm',engine+' after resume ')
   page.evaluate('a.stopVoice();a.horn()');page.wait_for_function('a.voiceStatus().signal.output.rms>.001');check(engine+' horn produces output',True)
   page.evaluate('a.stop();a.start();a.thunder()');page.wait_for_function('a.voiceStatus().signal.output.rms>.001');check(engine+' thunder produces output',True)
   page.evaluate('a.stop()');page.close()
   page=context.new_page();page.goto('http://127.0.0.1:8765/captain/audio-harness150.html?queue=1');page.wait_for_function('window.ready');page.click('#go')
   page.wait_for_function("a.voiceStatus().lastClip?.id==='rock' && a.voiceStatus().signal.voice.rms>.0001",timeout=30000);check(engine+' cold-loading warning survives asset loading',True);page.close()
   page=context.new_page();page.add_init_script("Object.defineProperty(indexedDB,'open',{value:()=>({})});")
   page.goto('http://127.0.0.1:8765/captain/audio-harness150.html');page.wait_for_function('window.ready');page.click('#go');page.wait_for_function('a.voiceStatus().preRenderedGreekLoaded===18',timeout=12000);signal(page,'rock',engine+' blocked storage ');page.close()
   if engine=='chromium':
    old=context.new_page();old.goto('http://127.0.0.1:8765/captain/audio-harness150.html?old=1');old.wait_for_function('window.ready');old.click('#go');old.wait_for_function('a.voiceStatus().preRenderedGreekLoaded===18',timeout=30000)
    rejected=old.evaluate("['rock','ice','calm','captain1','captain2'].map(id=>({id,result:a.voice(id)}))")
    report['oldReproduction']=rejected;check('Old v142 bug reproduced despite 18 MP3s loaded',all(x['result'] is False for x in rejected),rejected);old.close()
   context.close();browser.close()
  browser=p.chromium.launch(args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  ctx=browser.new_context(viewport={'width':430,'height':744},is_mobile=True,has_touch=True,device_scale_factor=1)
  page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
  page.goto(BASE+'?v=150&test=1',wait_until='domcontentloaded',timeout=60000);page.wait_for_function('window.__lastCall?.getState().ready',timeout=90000)
  page.click('#start');page.wait_for_function("__lastCall.getState().voices.lastClip?.id==='calm' && __lastCall.getState().voices.signal.voice.rms>.0001",timeout=45000)
  check('Actual game starts with spoken Greek crew greeting',True)
  state=lambda:page.evaluate('__lastCall.getState()')
  def frames(n=3):page.wait_for_function('(n)=>__lastCall.getState().frames>=n',arg=state()['frames']+n,timeout=30000)
  check('Version 1.5 visible and actual game advances',state()['version']=='1.5.0' and state()['playing'] and page.locator('#releaseBadge').inner_text()=='v1.5.0')
  page.evaluate('__lastCall.test.audio().stopVoice()');page.click('#drink');page.wait_for_function("__lastCall.getState().voices.lastClip?.id==='captain1' && __lastCall.getState().voices.signal.voice.rms>.0001",timeout=30000);check('Whisky action actually speaks captain line',True)
  page.evaluate("__lastCall.test.audio().stopVoice();const o=__lastCall.test.obstacles().find(o=>o.type==='ice');__lastCall.test.setState({x:o.x,z:o.z-o.radius-152,heading:0,speed:12});")
  page.wait_for_function("__lastCall.getState().voices.lastClip?.id==='ice' && __lastCall.getState().voices.signal.voice.rms>.0001",timeout=30000);check('Predicted danger actually speaks before impact',state()['collisions']==0,{'hull':state()['hull'],'danger':state()['danger']})
  page.evaluate('__lastCall.test.restart()');frames(6)
  cdp=ctx.new_cdp_session(page);a=page.evaluate('__lastCall.test.anchor()');r=a['radius']*.64
  def touch(kind,pts):cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[{'id':i,'x':x,'y':y} for i,x,y in pts]})
  touch('touchStart',[(1,a['x'],a['y']-r)]);frames()
  for angle in [-1.3,-1,-.7,-.4,0,.35,.7]:touch('touchMove',[(1,a['x']+math.cos(angle)*r,a['y']+math.sin(angle)*r)]);frames(1)
  check('Direct wheel remains functional',state()['turn']>.6);touch('touchEnd',[])
  page.click('#pause');page.locator('[data-clip=panic]').click();page.wait_for_function("__lastCall.getState().voices.lastClip?.id==='panic' && __lastCall.getState().voices.signal.voice.rms>.0001",timeout=30000);check('Pause sound test produces passenger speech',True)
  page.screenshot(path=str(OUT/'sound-panel.png'));page.click('#resume');frames();page.screenshot(path=str(OUT/'game.png'))
  check('No runtime exceptions in either audio engine or game',not report['errors'],report['errors'])
  report['final']=state();browser.close();report['passed']=True
except Exception:
 report['passed']=False;report['exception']=traceback.format_exc();print(report['exception'],flush=True)
finally:
 (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));server.shutdown()
 print('RESULT',report.get('passed'),len(report['checks']),flush=True)
raise SystemExit(0 if report.get('passed') else 1)
