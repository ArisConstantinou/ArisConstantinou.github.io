"""0.4.1 touch regressions, real production modules and actual WebGL renderer.
Run: xvfb-run -a python3 tests/mobile_fix.py
Fixtures relocate guards/deposit gum; all tested input uses Chromium touch events.
"""
import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_harness import load
OUT=Path(os.environ.get('BUBBLE_TEST_OUTPUT', str(Path(__file__).parent/'mobile-fix-artifacts')))
OUT.mkdir(parents=True,exist_ok=True)
results=[]
def check(name,ok,data=None):
 results.append({'name':name,'pass':bool(ok),'data':data});print(('PASS ' if ok else 'FAIL ')+name+(' '+str(data) if not ok else ''),flush=True)
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 for width,height in ([tuple(map(int,os.environ['BUBBLE_VIEWPORT'].split('x')))] if os.environ.get('BUBBLE_VIEWPORT') else [(430,744),(430,932),(932,430),(375,667)]):
  name=f'{width}x{height}'
  context=browser.new_context(viewport={'width':width,'height':height},has_touch=True,is_mobile=True,device_scale_factor=1)
  page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));load(page)
  cdp=context.new_cdp_session(page)
  def run(code):return page.evaluate('()=>{const g=__bubble.game;'+code+'}')
  def step(t):return run(f'return __bubble.step({t});')
  def reset():run("__bubble.start();g.renderer.resize('low');g.aiDisabled=true;g.god=true;g.testAim=null;g.tool='splat';g.zoneName='chest';g.refreshTools();g.render();")
  def center(id):
   r=page.locator('#'+id).bounding_box();return r['x']+r['width']/2,r['y']+r['height']/2
  def touch(kind,points=()):cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[{'id':i,'x':x,'y':y} for i,x,y in points]})
  def down(id,i=1,dx=0,dy=0):
   x,y=center(id);touch('touchStart',[(i,x+dx,y+dy)]);return x+dx,y+dy
  def release():touch('touchEnd')
  def fixture():run("g.knights=g.knights.slice(0,2);g.knights[0].p=[0,0,19];g.knights[1].p=[2.5,0,21];g.knights.forEach(a=>{a.home=a.p.slice();a.route=[a.p.slice()];a.yaw=0;});g.render();")
  reset();fixture()
  down('aimStick',dy=-31);step(3)
  data=run('return {ammo:g.ammo,charge:g.charge,fire:g.fireDown,target:g.aim.actor?.id,aim:g.input.aim};')
  check(name+' aiming never charges or fires',data['ammo']==180 and data['charge']==0 and not data['fire'],data)
  release();step(.1)
  check(name+' releasing aim does not spend ammo',run('return g.ammo===180&&g.projectiles.length===0&&!g.fireDown;'))
  target=run('return g.aim.actor?.id??null;')
  check(name+' directional assist selects the visible guard',target==0,target)
  down('moveStick',dx=27);step(.85);release();step(.1)
  data=run('return {x:g.player.p[0],target:g.aim.actor?.id,ammo:g.ammo};')
  check(name+' movement remains independent while target stays locked',data['x']>2 and data['target']==0 and data['ammo']==180,data)
  # Explicitly tap a different visible guard, then fire with separate control.
  point=run("return g.project([g.knights[1].p[0],1.25,g.knights[1].p[2]]);")
  touch('touchStart',[(2,point['x'],point['y'])]);release();step(.1)
  check(name+' tap selects a specific guard without firing',run('return g.aim.actor?.id===1&&g.ammo===180;'))
  down('fireBtn');step(.05);release();step(.7)
  data=run('return {ammo:g.ammo,coat:Object.values(g.knights[1].coat).reduce((a,b)=>a+b,0)};')
  check(name+' separate FIRE tap hits the locked guard',data['ammo']==179 and data['coat']>0,data)
  down('fireBtn');step(.7);touch('touchCancel');step(.1)
  check(name+' cancelling fire does not discharge a partial charge',run('return g.ammo===179&&!g.fireDown;'))
  reset();fixture()
  lx,ly=center('moveStick');rx,ry=center('aimStick')
  touch('touchStart',[(4,lx+29,ly),(5,rx,ry-31)]);step(.75)
  data=run('return {x:g.player.p[0],aim:g.input.aim,move:g.input.move,fire:g.fireDown};')
  check(name+' two simultaneous thumbs move and aim without firing',data['x']>2 and data['aim'][1]<-.3 and data['move'][0]>.3 and not data['fire'],data)
  touch('touchCancel');step(.1)
  check(name+' cancelled multitouch clears both sticks',run('return Math.hypot(...g.input.move)===0&&Math.hypot(...g.input.aim)===0;'))
  reset()
  # Recreate the original collision defect: a new mound intersects the shoulder.
  run("g.player.p=[0,0,20];g.player.lastSafe=[0,0,20];const guard=g.volume.protectedBody;g.volume.protectedBody=null;g.volume.stamp([0,1.4,19.5],[.75,.7,.85],3.2);g.volume.protectedBody=guard;g.render();")
  down('moveStick',dy=31);step(1);release();step(.1)
  data=run('return {p:g.player.p,overlap:!!g.world.blocked(g.player.p[0],g.player.p[2],g.player.p[1],g.player.radius,g.player.height)};')
  check(name+' real movement touch escapes the reproduced gum overlap',data['p'][2]>23 and not data['overlap'],data)
  # Release and regrab after a viewport resize must not leave a stuck pointer.
  down('moveStick',dx=24);step(.1);touch('touchCancel');page.set_viewport_size({'width':width,'height':max(360,height-50)});run('g.resize();g.render();')
  before=run('return g.player.p[0]');down('moveStick',dx=30);step(.5);release();after=run('return g.player.p[0]')
  check(name+' movement regrabs after touch cancellation and viewport resize',after-before>1,{'before':before,'after':after})
  page.set_viewport_size({'width':width,'height':height});run('g.resize();g.render();')
  reset();fixture();run("g.tool='splat';g.zoneName='legs';g.refreshTools();")
  point=run('return g.project([0,1.25,19]);');touch('touchStart',[(8,point['x'],point['y'])]);release();step(.1)
  down('fireBtn');step(.04);release();step(.8)
  data=run('return {legs:g.knights[0].coat.legL+g.knights[0].coat.legR,head:g.knights[0].coat.head};')
  check(name+' selected leg region uses a real projectile hit',data['legs']>0 and data['head']==0,data)
  # Sight blockage must clear the remembered actor lock.
  run("for(let y=0;y<3.8;y+=.2)g.volume.stamp([0,y,23],[2,.5,.65],3);__bubble.step(.1);")
  check(name+' target lock cannot see through new gum cover',run('return !g.aim.actor;'))
  reset();run("g.tool='flow';g.form='mass';g.refreshTools();")
  point=run('return g.project([3,0,23]);');touch('touchStart',[(9,point['x'],point['y'])]);release();step(.1)
  down('fireBtn');step(.10);release();step(.05)
  data=run('return {n:g.volume.values.size,ammo:g.ammo,point:g.aim.point,p:g.player.p};')
  check(name+' tap-ground FLOW deposits near the chosen point',data['n']>0 and data['ammo']==180 and abs(data['point'][0]-3)<1.5,data)
  # All thumb controls remain at the edges in the actual short browser viewport.
  run('g.player.pathOn=true;g.refreshTools();')
  layout=page.evaluate("""()=>{const ids=['moveStick','aimStick','jumpBtn','gaitBtn','pathBtn','gripBtn','gradeBtn','fireBtn','modeBtn','zoneBtn','useBtn','reloadBtn'];const a=ids.map(id=>{const b=document.getElementById(id).getBoundingClientRect();return{id,x:b.x,y:b.y,w:b.width,h:b.height}});return{outside:a.filter(b=>b.x<0||b.y<0||b.x+b.w>innerWidth+1||b.y+b.h>innerHeight+1),small:a.filter(b=>b.w<44||b.h<44),center:a.filter(b=>b.x<innerWidth*.55&&b.x+b.w>innerWidth*.45&&b.y>innerHeight*.5)}}""")
  check(name+' controls fit the screen and keep the central lane free',not layout['outside'] and not layout['small'] and not layout['center'],layout)
  check(name+' no runtime errors',not errors,errors)
  if width==430 and height==744:
   reset();fixture();run("g.player.p=[1.8,0,25];g.touchAim={yaw:Math.PI,range:7,target:0,point:null,hasIntent:true};g.volume.stamp([2.5,0,21.8],[.7,.3,.7],3);g.volume.stamp([-2,0,23],[.8,.3,.8],3);__bubble.step(.2);document.getElementById('toast').classList.remove('show');g.render();")
   page.wait_for_timeout(250)
   page.screenshot(path=str(OUT/'bubble-0.4.1-mobile.png'))
  context.close()
 browser.close()
report={'version':'0.4.1','environment':'Chromium with SwiftShader, emulated touch. Not physical iPhone or Safari.','passed':sum(r['pass'] for r in results),'total':len(results),'results':results}
(OUT/('mobile-fix-'+os.environ.get('BUBBLE_VIEWPORT','all')+'-results.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(f"{report['passed']}/{report['total']} passed",flush=True)
if report['passed']!=report['total']:raise SystemExit(1)
