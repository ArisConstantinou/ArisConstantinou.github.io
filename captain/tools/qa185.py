from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,traceback,math
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/').rstrip('/')+'/'
OUT=Path('/tmp/captain185-qa');OUT.mkdir(exist_ok=True)
report={'version':'Story 1.8.5 / Mayhem 1.0.1','url':BASE,'method':'Chromium real CDP touch input and WebKit synthetic pointer/native-touch lifecycle tests. Isolated player-position fixtures and deterministic gameplay advancement. Not a physical iPhone.','checks':[]}
page=None

def ck(name,condition,detail=None):
 report['checks'].append({'name':name,'pass':bool(condition),'detail':detail});print(('PASS ' if condition else 'FAIL ')+name,flush=True)
 if not condition:raise AssertionError(name)
def state(p):return p.evaluate('window.__lastCall.getState()')
def ch(p):return state(p)['chapter']
def adv(p,t):p.evaluate('(t)=>window.__lastCall.test.chapter.advance(t)',t)
def resetpos(p):p.evaluate('window.__lastCall.test.chapter.setPosition3(10.7,10.1,0,0)')
def dist(a,b):return math.hypot(a['x']-b['x'],a['z']-b['z'])
def fresh(browser,mode='captain',touch=True,w=390,h=844):
 ctx=browser.new_context(viewport={'width':w,'height':h},has_touch=touch,is_mobile=touch,service_workers='block');p=ctx.new_page();errors=[]
 p.on('pageerror',lambda e:errors.append(str(e)))
 p.goto(BASE+mode+'/?test=1&v=185',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=60000)
 p.evaluate('window.__CHAOS_FREEZE__=true')
 (p.locator('#start').tap() if touch else p.locator('#start').click())
 if mode=='captain':p.evaluate('window.__lastCall.test.chapter.drink();window.__lastCall.test.chapter.foot()')
 resetpos(p);p.evaluate('window.__lastCall.test.setState({intox:70})');adv(p,.05)
 return ctx,p,errors

def touch_suite(p,ctx,label,escape=False):
 read=(lambda:ch(p)['escape']) if escape else (lambda:ch(p))
 selector='#escapePad' if escape else '#chaosMove'
 box=p.locator(selector).bounding_box();ck(label+' joystick visible',box is not None)
 cx=box['x']+box['width']/2;cy=box['y']+box['height']/2
 cd=ctx.new_cdp_session(p)
 p.evaluate('''()=>{window.__releaseEvents=[];for(const type of ['pointerdown','pointerup','pointercancel','lostpointercapture','touchstart','touchend','touchcancel'])window.addEventListener(type,e=>{window.__releaseEvents.push({type,id:e.pointerId,target:e.target.id||e.target.tagName,touches:e.touches?Array.from(e.touches,t=>t.identifier):null,changed:e.changedTouches?Array.from(e.changedTouches,t=>t.identifier):null});if(window.__releaseEvents.length>60)window.__releaseEvents.shift();},true);}''')
 left={'x':cx,'y':cy-30,'id':7};center={'x':cx+2,'y':cy-2,'id':7}
 def send(kind,pts):
  cd.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':pts})
  p.evaluate('()=>new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(()=>done())))')
 def neutral(name):
  a=read();ck(label+' '+name,not a['movement']['active'] and abs(a['stick']['x'])<1e-8 and abs(a['stick'].get('z',a['stick'].get('y',0)))<1e-8,a['movement'])
 def rest(name):
  start=read()['position'];adv(p,.8);ck(label+' '+name,dist(start,read()['position'])<1e-6,{'before':start,'after':read()['position']})
 send('touchStart',[left]);adv(p,.1);ck(label+' ownership starts',read()['movement']['active'])
 before=read()['position'];adv(p,.35);ck(label+' held stick moves player',dist(before,read()['position'])>.12)
 before=read()['position'];adv(p,.35);ck(label+' stationary thumb keeps intentional walking',dist(before,read()['position'])>.12)
 send('touchMove',[{'x':cx+70,'y':cy-70,'id':7}]);adv(p,.1)
 send('touchEnd',[]);neutral('release outside pad resets immediately');rest('no drift after release')
 send('touchStart',[center]);rest('center dead zone is stationary');send('touchEnd',[]);neutral('center release')
 if not escape:
  r=p.locator('#combatRightStick').bounding_box();right={'x':r['x']+r['width']/2,'y':r['y']+r['height']/2,'id':19}
  send('touchStart',[left]);send('touchStart',[left,right]);right2={**right,'x':right['x']+16}
  yaw=ch(p)['yaw'];send('touchMove',[left,right2]);ck(label+' right look works while walking',abs(ch(p)['yaw']-yaw)>.001)
  send('touchEnd',[left]);neutral('left release while right stays down');rest('right held alone cannot move captain')
  yaw=ch(p)['yaw'];right3={**right2,'x':right2['x']+18};send('touchMove',[right3]);ck(label+' right input survives left release',abs(ch(p)['yaw']-yaw)>.001)
  send('touchEnd',[])
  send('touchStart',[right]);send('touchStart',[right,left]);send('touchEnd',[right]);ck(label+' right release does not cancel left',read()['movement']['active']);send('touchEnd',[]);neutral('last left finger release')
  b=p.locator('#combatOuterRing [data-action=block]').bounding_box();block={'x':b['x']+b['width']/2,'y':b['y']+b['height']/2,'id':27}
  send('touchStart',[left]);send('touchStart',[left,block]);ck(label+' can block with second finger',ch(p)['block']);send('touchEnd',[left]);neutral('movement stops while block stays held');ck(label+' left release does not release block',ch(p)['block']);send('touchEnd',[])
 for i in range(4):
  send('touchStart',[left]);ck(label+f' re-touch {i+1} accepted',read()['movement']['active']);send('touchEnd',[]);neutral(f'release {i+1}')
 send('touchStart',[left]);send('touchCancel',[]);neutral('browser cancels gesture');rest('no movement after cancellation')
 send('touchStart',[left]);p.locator('#pause').evaluate('(el)=>el.click()');neutral('pause clears input');send('touchEnd',[])
 p.locator('#resume').tap();rest('resume does not restore stale movement')
 send('touchStart',[left]);p.evaluate("window.dispatchEvent(new Event('orientationchange'))");neutral('orientation change clears input');send('touchEnd',[])
 if not escape:
  w=p.viewport_size['width'];h=p.viewport_size['height'];send('touchStart',[left]);p.set_viewport_size({'width':h,'height':w});p.wait_for_timeout(100);neutral('actual viewport rotation clears input');send('touchEnd',[]);p.set_viewport_size({'width':w,'height':h});p.wait_for_timeout(100)
 p.evaluate('''(sel)=>{const el=document.querySelector(sel),r=el.getBoundingClientRect();el.dispatchEvent(new PointerEvent('pointerdown',{pointerId:999,pointerType:'touch',button:0,buttons:1,clientX:r.x+r.width/2,clientY:r.y+10,bubbles:true,cancelable:true}));}''',selector)
 ck(label+' capture-failure fixture accepts touch',read()['movement']['active'])
 p.evaluate("window.dispatchEvent(new PointerEvent('pointerup',{pointerId:999,pointerType:'touch',bubbles:true}))")
 neutral('window release works even without capture');rest('capture-failure leaves no runaway motion')
 ck(label+' no desktop labels on mobile',p.locator(('#escape180' if escape else '#chaos170')+' kbd:visible').count()==0)

with sync_playwright() as pw:
 try:
  b=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
  for mode in ['captain','captain-mayhem']:
   ctx,page,errors=fresh(b,mode)
   ck(mode+' corrected build',state(page)['version']==('1.8.5' if mode=='captain' else 'MAYHEM 1.0.1'))
   start=ch(page)['position'];adv(page,.7);ck(mode+' intoxicated neutral stance does not translate',dist(start,ch(page)['position'])<1e-6)
   touch_suite(page,ctx,mode)
   page.screenshot(path=str(OUT/(mode+'-portrait.png')))
   ck(mode+' no runtime errors',not errors,errors);ctx.close()
  ctx,page,errors=fresh(b)
  page.reload(wait_until='domcontentloaded');page.wait_for_function('window.__lastCall?.getState()?.ready',timeout=60000);page.evaluate('window.__CHAOS_FREEZE__=true')
  page.locator('#jailEntry180').tap();page.locator('#continueFromCell180').tap();adv(page,1.8);page.locator('#escapeOverlayAction').tap();adv(page,.02)
  ck('Escape starts with saved chapter architecture',ch(page)['escape']['stage']=='escape')
  touch_suite(page,ctx,'escape',True)
  ck('Escape no runtime errors',not errors,errors);ctx.close()
  for w,h in [(320,568),(932,430)]:
   ctx,page,errors=fresh(b,w=w,h=h)
   for sel in ['#chaosMove','#mobileCombatWheel']:
    r=page.locator(sel).bounding_box();ck(f'{w}x{h} {sel} remains in bounds',r is not None and r['x']>=0 and r['y']>=0 and r['x']+r['width']<=w+1 and r['y']+r['height']<=h+1,r)
   ck(f'{w}x{h} no errors',not errors,errors);ctx.close()
  ctx,page,errors=fresh(b,touch=False)
  ck('Desktop WASD kept, joystick hidden',page.locator('#keyboardMovement').is_visible() and not page.locator('#chaosMove').is_visible())
  start=ch(page)['position'];page.keyboard.down('w');adv(page,.3);page.keyboard.up('w');ck('Desktop W still moves',dist(start,ch(page)['position'])>.1)
  start=ch(page)['position'];adv(page,.6);ck('Desktop key release is stationary when drunk',dist(start,ch(page)['position'])<1e-6)
  ck('Desktop no errors',not errors,errors);ctx.close();b.close()
  wk=pw.webkit.launch(headless=True);ctx=wk.new_context(has_touch=True,viewport={'width':390,'height':844});page=ctx.new_page()
  page.goto(BASE+'captain/move-stick185.js?v=185')
  results=page.evaluate('''async()=>{
   const {installMoveStick,movementAxes}=await import('./move-stick185.js?v=185');document.body.innerHTML='<div id="pad" style="width:100px;height:100px;position:fixed;left:10px;top:10px"><i></i></div><div id="other"></div>';
   const el=document.querySelector('#pad'),other=document.querySelector('#other');let axes,play=true;const control=installMoveStick({element:el,enabled:()=>play,onChange:(x,y)=>axes={x,y}}),out=[];
   const check=(n,ok)=>out.push({name:n,pass:!!ok});
   const event=(target,type,id=501)=>target.dispatchEvent(new PointerEvent(type,{pointerId:id,pointerType:'touch',buttons:1,button:0,bubbles:true,cancelable:true,clientX:60,clientY:25}));
   const touch=(target,type,touches,changedTouches)=>{const e=new Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:touches},changedTouches:{value:changedTouches}});target.dispatchEvent(e);};
   const native={identifier:83,target:el,clientX:60,clientY:25},nativeOther={identifier:24,target:other,clientX:200,clientY:200};
   event(el,'pointerdown');touch(el,'touchstart',[native],[native]);event(other,'pointerup',602);check('unrelated pointer release cannot cancel owner',control.inspect().active);
   touch(other,'touchend',[native],[nativeOther]);check('unrelated native touch release cannot cancel owner',control.inspect().active);
   touch(el,'touchend',[nativeOther],[native]);check('native touch fallback resets while another finger remains',!control.inspect().active&&axes.y===0);
   for(const type of ['pointercancel','lostpointercapture']){event(el,'pointerdown');event(window,type);check(type+' neutralizes',!control.inspect().active&&axes.y===0);}
   for(const type of ['blur','pagehide','resize','orientationchange']){event(el,'pointerdown');window.dispatchEvent(new Event(type));check(type+' neutralizes',!control.inspect().active&&axes.y===0);}
   event(el,'pointerdown');play=false;control.sync();check('disabled gameplay resets on next update',!control.inspect().active);play=true;
   event(el,'pointerdown');for(let i=0;i<600;i++)control.sync();check('valid stationary held touch is never timed out',control.inspect().active);control.reset();
   check('center deadzone',movementAxes(2,2).x===0&&movementAxes(2,2).y===0);const v=movementAxes(100,100);check('diagonal magnitude bounded',Math.hypot(v.x,v.y)<=1.000001);
   control.destroy();return out;
  }''')
  for r in results:ck('WebKit '+r['name'],r['pass'])
  wk.close();report['passed']=True
 except Exception as e:
  report['passed']=False;report['error']=str(e);traceback.print_exc()
  if page:
   try:page.screenshot(path=str(OUT/'failure.png'));report['failureState']=state(page);report['events']=page.evaluate('window.__releaseEvents')
   except:pass
 finally:(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
if not report.get('passed'):raise SystemExit(1)
