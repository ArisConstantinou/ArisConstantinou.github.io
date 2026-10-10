from pathlib import Path
from playwright.sync_api import sync_playwright
import json,os,traceback
OUT=Path('/tmp/captain181-qa');OUT.mkdir(exist_ok=True)
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/captain/')
report={'version':'1.8.1','url':BASE,'method':'Chromium. Mouse and real key events for bindings; fixed-step keyboard-driven path traversal with active patrols for escape; explicit position fixtures only for edge-pose and combat checks. Mobile is emulated touch, not physical iPhone.','checks':[]}
def ck(n,ok,d=None):
 report['checks'].append({'name':n,'pass':bool(ok),'detail':d});print(('PASS ' if ok else 'FAIL ')+n,flush=True)
 (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 if not ok:raise AssertionError((n,d))
def state(p):return p.evaluate('window.__lastCall.getState()')
def esc(p):return state(p)['chapter']['escape']
def adv(p,t):p.evaluate('(t)=>window.__lastCall.test.chapter.advance(t)',t)
def fresh(browser,touch=False,w=1280,h=800):
 ctx=browser.new_context(viewport={'width':w,'height':h},has_touch=touch,is_mobile=touch,device_scale_factor=1,service_workers='block');p=ctx.new_page();errors=[]
 p.on('pageerror',lambda e:(errors.append(str(e)),print('BROWSER ERROR',str(e),flush=True)))
 p.goto(BASE+'?test=1&qa=181',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000);p.evaluate('window.__CHAOS_FREEZE__=true');return ctx,p,errors
def start_escape(p,touch=False):
 (p.locator('#jailEntry180').tap() if touch else p.locator('#jailEntry180').click());(p.locator('#continueFromCell180').tap() if touch else p.locator('#continueFromCell180').click());adv(p,1.8);(p.locator('#escapeOverlayAction').tap() if touch else p.locator('#escapeOverlayAction').click());adv(p,.05)
def go(p,x,z):
 result=p.evaluate('''async([x,z])=>{
  const M=await import('./escape-model181.js?v=181'),api=window.__lastCall,goal={x,z};let s=api.getState().chapter.escape,route=M.path(s.position,goal,M.obstacles(s),true),steps=0,key=null;
  const set=k=>{if(k===key)return;if(key)window.dispatchEvent(new KeyboardEvent('keyup',{code:key,bubbles:true}));key=k;if(key)window.dispatchEvent(new KeyboardEvent('keydown',{code:key,bubbles:true}));};
  for(const node of route){for(let i=0;i<140;i++){s=api.getState().chapter.escape;if(!s||s.stage!=='escape'){set(null);return {ok:false,stage:s?.stage,steps};}const dx=node.x-s.position.x,dz=node.z-s.position.z;if(Math.hypot(dx,dz)<.10)break;set(Math.abs(dx)>Math.abs(dz)?dx>0?'KeyD':'KeyA':dz>0?'KeyS':'KeyW');api.test.chapter.advance(1/60);steps++;}}
  set(null);s=api.getState().chapter.escape;return {ok:!!s&&M.distance(s.position,goal)<.3,position:s?.position,stage:s?.stage,steps};
 }''',[x,z]);ck('Walk route to '+str((x,z)),result['ok'],result)
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 p=None
 try:
  ctx,p,errors=fresh(browser);ck('Release loads',state(p)['version']=='1.8.1');start_escape(p)
  standing=esc(p)['pose'];p.keyboard.press('KeyC');adv(p,.8);squat=esc(p)['pose'];p.screenshot(path=str(OUT/'crouch.png'))
  ck('Crouch lowers world-space hips, not sideways',standing['hips'][1]-squat['hips'][1]>.40 and abs(squat['hips'][0])<.16 and abs(squat['hips'][2])<.20,{'standing':standing,'crouched':squat})
  ck('Head upright at sensible crouch height',.75<squat['head'][1]<1.4,squat)
  ck('Feet remain at deck height',all(-.06< squat[k][1]<.19 for k in ['leftfoot','rightfoot']),squat)
  adv(p,8);later=esc(p)['pose'];ck('Crouch does not accumulate displacement',abs(later['hips'][2])<.20 and abs(later['hips'][1]-squat['hips'][1])<.05,later)
  p.evaluate('window.__lastCall.test.chapter.escape.moveTo(-6.4,22)');adv(p,.5);p.keyboard.down('KeyA');adv(p,3);p.keyboard.up('KeyA');edge=esc(p);p.screenshot(path=str(OUT/'wall-crouch.png'))
  ck('Body stays inside hull while pressing the wall',edge['position']['x']>-6.5 and all(edge['position']['x']+v[0]>-6.99 for v in edge['pose'].values()),edge)
  p.keyboard.press('KeyC');adv(p,.6);ck('Standing pose restores after crouch',esc(p)['pose']['head'][1]>1.45)
  ck('No pose runtime errors',not errors,errors);ctx.close()
  ctx,p,errors=fresh(browser);p.click('#start');p.keyboard.press('KeyZ');adv(p,.1);ck('Z activates first sip',state(p)['chapter']['sips']==1);p.keyboard.press('KeyF');adv(p,.1)
  p.evaluate('window.__lastCall.test.chapter.setPosition(0,52.2,0)');adv(p,.1)
  p.mouse.move(550,340);yaw=state(p)['chapter']['yaw'];p.mouse.move(650,360);ck('Mouse moves camera without dragging',abs(state(p)['chapter']['yaw']-yaw)>.1)
  p.mouse.click(650,360);p.wait_for_function('document.pointerLockElement===document.getElementById("sea")',timeout=6000)
  ck('First click captures without an attack',state(p)['chapter']['attack'] is None)
  yaw=state(p)['chapter']['yaw'];p.mouse.move(750,360,steps=4);ck('Relative mouse works after capture',abs(state(p)['chapter']['yaw']-yaw)>.1)
  for button,kind in [('left','slap'),('right','punch')]:
   p.mouse.click(640,350,button=button);ck(button+' mouse attacks '+kind,state(p)['chapter']['attack']['kind']==kind);adv(p,1.2)
  for key,kind in [('KeyQ','heavy'),('KeyE','kick'),('KeyG','spit')]:
   p.evaluate('window.__lastCall.test.chapter.setState({stamina:100})');p.keyboard.press(key);ck(key+' action',state(p)['chapter']['attack']['kind']==kind);adv(p,1.5)
  p.keyboard.down('KeyC');ck('C holds block',state(p)['chapter']['block']);p.keyboard.up('KeyC');ck('C release ends block',not state(p)['chapter']['block'])
  p.keyboard.press('Tab');p.wait_for_function('!document.pointerLockElement');ck('Tab releases pointer',not state(p)['chapter']['mouse']['locked'])
  labels=p.locator('.attack-row kbd').all_text_contents();ck('Visible desktop labels match bindings',labels==['M1','Q','M2','E'],labels)
  p.screenshot(path=str(OUT/'desktop-controls.png'))
  p.mouse.click(640,350);p.wait_for_function('document.pointerLockElement');p.keyboard.press('Escape');p.wait_for_function('!document.pointerLockElement');ck('Escape releases pointer safely',not state(p)['chapter']['mouse']['locked'])
  ck('No mouse runtime errors',not errors,errors);ctx.close()
  # Full escape traversal uses movement, contextual interactions and active guards.
  ctx,p,errors=fresh(browser);start_escape(p)
  go(p,-3.3,22.4);p.keyboard.press('KeyF');adv(p,.02);ck('Pick up mug',esc(p)['held']=='mug')
  go(p,-4.5,21.2);p.keyboard.press('KeyF');adv(p,.02);ck('Open hatch',esc(p)['hatch'])
  go(p,-4.5,18.9);ck('Low passage crossed without manual crouch timing',esc(p)['position']['z']<19.1)
  go(p,-4.5,16.8);ck('Laundry checkpoint earned',esc(p)['checkpoint']=='laundry')
  go(p,-.5,16.8);p.evaluate('window.__lastCall.test.chapter.escape.aim(0,21)');p.keyboard.press('KeyR');adv(p,1.2);ck('R creates a distraction',esc(p)['throws']==1 and esc(p)['heard']>0)
  go(p,.5,13);go(p,5,10);p.keyboard.press('KeyF');adv(p,.05);ck('Card acquired through walked route',esc(p)['card'])
  go(p,-.9,9);p.keyboard.press('KeyF');adv(p,.05);ck('Storage unlocks',esc(p)['storeOpen'])
  go(p,-4.5,8.1);p.keyboard.press('KeyF');adv(p,.02);ck('Bottle acquired',esc(p)['bottle'])
  go(p,-4.5,12);p.keyboard.press('KeyZ');adv(p,4.1);ck('Z drinks gradually during escape',esc(p)['intox']>=30)
  p.screenshot(path=str(OUT/'escape-guidance.png'))
  go(p,0,2.4);p.keyboard.press('KeyF');adv(p,2);ck('Walked escape returns to deck',state(p)['chapter']['returning'])
  ck('No route runtime errors',not errors,errors);ctx.close()
  for w,h in [(430,832),(390,744),(320,568),(932,430)]:
   ctx,p,errors=fresh(browser,True,w,h);start_escape(p,True)
   ck(str((w,h))+' touch only',p.locator('#escapePad').is_visible() and not p.locator('#escapeKeys').is_visible() and p.locator('#escape180 kbd:visible').count()==0)
   for sel in ['#escapeUse','#escapeCrouch','.escape-vitals','.escape-goal']:
    b=p.locator(sel).bounding_box();ck(str((w,h))+sel+' inside screen',b and b['x']>=0 and b['y']>=0 and b['x']+b['width']<=w+1 and b['y']+b['height']<=h+1,b)
   p.locator('#escapeCrouch').tap();adv(p,.6);ck('Touch crouch pose centered',abs(esc(p)['pose']['hips'][2])<.2)
   p.screenshot(path=str(OUT/f'mobile-{w}x{h}.png'));ck('Touch no runtime errors',not errors,errors);ctx.close()
  report['passed']=True
 except Exception as e:
  report['passed']=False;report['error']=str(e);traceback.print_exc()
  if p:
   try:p.screenshot(path=str(OUT/'failure.png'));report['failureState']=state(p);report['errors']=errors
   except:pass
 finally:
  (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
if not report.get('passed'):raise SystemExit(1)
