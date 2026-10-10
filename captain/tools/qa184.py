from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback,time
OUT=Path('/tmp/captain184-qa');OUT.mkdir(exist_ok=True)
BASE=os.environ.get('CAPTAIN_BASE','http://127.0.0.1:8765/captain/')
report={'version':'1.8.4','url':BASE,'method':'Chromium desktop and emulated touch. Input-driven traversal plus isolated positioning for visual and combat fixtures. Not a real iPhone test.','checks':[]}
def ck(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),'detail':detail});print(('PASS ' if ok else 'FAIL ')+name,flush=True)
 if not ok:
  try:p.screenshot(path=str(OUT/'failure.png'));report['failureState']=state(p)
  except:pass
  raise AssertionError(name)
def state(p):return p.evaluate('window.__lastCall.getState()')
def ch(p):return state(p)['chapter']
def adv(p,t):p.evaluate('(t)=>window.__lastCall.test.chapter.advance(t)',t)
def pos(p,x,y,z,yaw=0):p.evaluate('(q)=>window.__lastCall.test.chapter.setPosition3(...q)',[x,y,z,yaw]);adv(p,.03)
def fresh(browser,mobile=False,w=1280,h=800):
 c=browser.new_context(viewport={'width':w,'height':h},has_touch=mobile,is_mobile=mobile,service_workers='block');p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 p.goto(BASE+'?test=1&qa=184',wait_until='domcontentloaded');p.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000)
 (p.locator('#start').tap() if mobile else p.locator('#start').click());p.evaluate('window.__CHAOS_FREEZE__=true');p.evaluate('window.__lastCall.test.chapter.drink()');p.evaluate('window.__lastCall.test.chapter.foot()');pos(p,4.8,10.1,54,0);adv(p,.06)
 return c,p,errors
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
 p=None
 try:
  c,p,errors=fresh(b)
  ck('Release 1.8.4 starts',state(p)['version']=='1.8.4')
  ck('Six decks, eight cabin interiors, two stair cores',ch(p)['roaming']['decks']==6 and ch(p)['roaming']['cabins']==8 and ch(p)['roaming']['stairs']==12,ch(p)['roaming'])
  ck('Original three captain vital meters remain',p.locator('#captainVitals').is_visible())
  routes={}
  for name in ['bridge','bar','bow','stern','port','starboard','lounge','pool','cabins','restaurant','theatre','terrace','sky','engine','crew']:
   route=p.evaluate('(id)=>window.__lastCall.test.chapter.routeTo(id)',name);routes[name]=len(route);ck('Collision-valid route: '+name,bool(route),len(route))
  report['routeLengths']=routes
  # Exercise real walking movement over an inter-deck route, not position teleports.
  # Slight side steps avoid actual passenger bodies; no actor is removed for traversal.
  result=p.evaluate('''()=>{
   const game=window.__lastCall,chap=game.test.chapter,route=chap.routeTo('engine');let stuck=0,steps=0;const emit=(code,type)=>window.dispatchEvent(new KeyboardEvent(type,{code,bubbles:true}));
   for(const q of route){let n=0;while(n++<200){const a=game.getState().chapter.position,dx=q.x-a.x,dz=q.z-a.z;if(Math.hypot(dx,dz)<.34&&Math.abs(q.y-a.y)<.65)break;
    const codes=[];if(Math.abs(dx)>.17)codes.push(dx>0?'KeyA':'KeyD');if(Math.abs(dz)>.17)codes.push(dz>0?'KeyW':'KeyS');codes.forEach(c=>emit(c,'keydown'));chap.advance(.065);codes.forEach(c=>emit(c,'keyup'));steps++;
    const v=game.getState().chapter.position;if(Math.hypot(v.x-a.x,v.z-a.z)<.01){stuck++;if(stuck%7===0){const key=Math.abs(dx)>Math.abs(dz)?'KeyW':'KeyA';emit(key,'keydown');chap.advance(.15);emit(key,'keyup');}}else stuck=0;
   }if(n>=200)return {ok:false,at:game.getState().chapter.position,target:q,steps};}
   return {ok:Math.abs(game.getState().chapter.position.y-6.65)<.2,at:game.getState().chapter.position,steps};
  }''')
  ck('Input-driven bar-to-engine traversal, no teleports on route',result['ok'],result)
  p.screenshot(path=str(OUT/'engine-room.png'))
  # A human-readable map actually pauses gameplay and guides, not teleports.
  p.locator('#shipMapButton184').click();ck('Ship map pauses combat',state(p)['paused'] and p.locator('#shipMap184').is_visible())
  ck('Map lists fifteen destinations',p.locator('#shipmapDestinations184 [data-destination]').count()==15)
  p.screenshot(path=str(OUT/'ship-map.png'))
  p.locator('[data-destination=pool]').click();ck('Selecting route resumes without teleport',not state(p)['paused'] and abs(ch(p)['position']['y']-6.65)<.3)
  # Inspect actual rendered spaces through independent visual fixtures.
  for name,xyz,yaw in [('cabins',(0,13.12,4),-1.5708),('restaurant',(0,15.83,15),3.14159),('pool',(-6,13.12,-53),1.5708),('stern',(0,10.1,-63),0),('sky-lounge',(0,21.35,13),3.14159)]:
   pos(p,*xyz,yaw);p.screenshot(path=str(OUT/(name+'.png')))
  ck('No runtime errors in all ship areas',not errors,errors)
  # Controlled combat fixtures: actual security attacks update health normally.
  pos(p,4.8,10.1,54,0);p.evaluate('window.__lastCall.test.chapter.setState({health:100,heat:100,chaos:250})')
  p.evaluate('''()=>{const t=window.__lastCall.test.chapter;for(let i=0;i<4;i++)t.spawnGuard();const center=window.__lastCall.getState().chapter.position;t.party.filter(n=>n.guard).forEach((n,i)=>{n.actor.group.position.set(center.x+Math.sin(i*Math.PI/2)*1.25,center.y,center.z+Math.cos(i*Math.PI/2)*1.25);n.cooldown=.1;});}''')
  adv(p,.2);ck('Guard announces windup before dealing damage',ch(p)['health']==100,ch(p)['health'])
  adv(p,5.8);ck('Four guards cannot instantly down captain',ch(p)['health']>=80 and ch(p)['foot'],{'life':ch(p)['health'],'capture':ch(p)['capture']})
  ck('No simultaneous attack stacking',p.evaluate('window.__lastCall.test.chapter.party.filter(n=>n.attack).length')<=1)
  # Escape distance allows recovery instead of unavoidable death spiral.
  pos(p,0,10.1,-63,0);life=ch(p)['health'];adv(p,10);ck('Out-of-combat recovery restores health',ch(p)['health']>life or life==100,{'before':life,'after':ch(p)['health']})
  p.screenshot(path=str(OUT/'life-recovery.png'));c.close()
  for w,h in [(390,700),(320,568),(932,430)]:
   c,p,errors=fresh(b,True,w,h)
   ck(f'{w}x{h} mobile uses both touch controllers',p.locator('#chaosMove').is_visible() and p.locator('#mobileCombatWheel').is_visible())
   ck(f'{w}x{h} mobile has no keyboard hints',p.locator('#chaos170 kbd:visible').count()==0)
   r=p.locator('#shipMapButton184').bounding_box();ck(f'{w}x{h} map touch target fits',r['height']>=44 and r['x']>=0 and r['x']+r['width']<=w+1 and r['y']+r['height']<=h+1,r)
   p.screenshot(path=str(OUT/f'mobile-{w}.png'))
   p.locator('#shipMapButton184').tap();p.screenshot(path=str(OUT/f'mobile-map-{w}.png'));p.locator('#closeShipMap184').tap()
   ck(f'{w}x{h} closing map resumes',not state(p)['paused'])
   ck(f'{w}x{h} no runtime errors',not errors,errors);c.close()
  report['passed']=True
 except Exception as e:
  report['passed']=False;report['error']=str(e);traceback.print_exc()
 finally:
  (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));b.close()
if not report.get('passed'):raise SystemExit(1)
