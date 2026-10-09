import json,sys,traceback
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT=Path('/tmp/captain180-qa');OUT.mkdir(exist_ok=True)
report={'checks':[],'errors':[],'version':'1.8.0'}
def check(name,value,detail=None):
 report['checks'].append({'name':name,'pass':bool(value),'detail':detail});print(('PASS' if value else 'FAIL'),name,flush=True)
def story(p):return p.evaluate('window.__lastCall.getState().story')
def place(p,x,z,yaw=0):p.evaluate('(v)=>window.__lastCall.test.story().test.place(...v)',[x,z,yaw])
def actor(p,i,**kw):p.evaluate('(v)=>window.__lastCall.test.story().test.actor(v[0],v[1])',[i,kw])
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 p=b.new_page(viewport={'width':1280,'height':800},device_scale_factor=1)
 p.on('pageerror',lambda e:report['errors'].append(str(e)))
 try:
  p.goto('http://127.0.0.1:8765/captain/?test=1',wait_until='domcontentloaded')
  p.wait_for_function('window.__lastCall?.getState().ready',timeout=60000)
  p.click('#startChaos180');p.wait_for_timeout(350)
  check('Story begins at the existing helm',story(p)['mode']=='bridge')
  p.keyboard.press('Numpad9');p.wait_for_timeout(700);s=story(p);check('One sip creates pending gradual intoxication',s['sips']==1 and s['pending']>0,s['pending'])
  p.wait_for_timeout(2900);p.keyboard.press('9');check('Second bridge sip is blocked',story(p)['sips']==1)
  p.keyboard.press('f');p.click('#modalNext180');p.wait_for_timeout(600)
  s=story(p);check('Story enters the on-ship lounge',s['mode']=='deck');check('Textured rigged FPS limbs exist',s['hands']['triangles']>150 and s['hands']['legTriangles']>100,s['hands'])
  p.screenshot(path=str(OUT/'deck-first.png'))
  before=s['player'];p.keyboard.down('w');p.wait_for_timeout(800);p.keyboard.up('w');after=story(p)['player'];check('W moves through the authored lounge',abs(after['z']-before['z'])>.2)
  for key in range(1,6):
   place(p,-5,0,0);actor(p,0,x=-5,z=1.3,hp=250,stun=8,status='wander',down=0,attack=0);p.wait_for_timeout(180)
   old=story(p)['actors'][0]['hp'];p.keyboard.press('Numpad'+str(key));p.wait_for_timeout(400 if key<3 else 430)
   if key==1:p.screenshot(path=str(OUT/'slap.png'))
   if key==4:p.screenshot(path=str(OUT/'kick.png'))
   s=story(p);check('NumPad '+str(key)+' activates its action',s['actors'][0]['hp']<old if key<5 else s['statistics']['spits']>0,s['statistics'])
   p.wait_for_timeout(600)
  place(p,-5,0,0);actor(p,0,x=-5,z=5,stun=10,status='wander',attack=0);old=story(p)['actors'][0]['hp'];p.keyboard.press('3');p.wait_for_timeout(650);check('No melee damage outside reach',story(p)['actors'][0]['hp']==old)
  place(p,-5,0,0);actor(p,0,x=-5,z=1.25,hp=200,stun=0,status='fight',attack=0,cd=.05);p.keyboard.down('6');p.wait_for_timeout(1600);p.keyboard.up('6');check('Block key releases and NPC can retaliate',story(p)['hp']<100,story(p)['hp'])
  place(p,-6.2,-5.5,-1.57079632679);p.keyboard.press('2');p.wait_for_timeout(850);check('Window breaks and awards chaos',any(x['kind']=='glass' and x['broken'] for x in story(p)['props']))
  place(p,-5.9,-5.5,0);p.keyboard.press('f');check('Lifeboat scripted release is recorded',story(p)['statistics']['boats']==1)
  chair=next(x for x in story(p)['props'] if x['kind']=='chair' and not x['broken']);place(p,chair['x'],chair['z']-1.5,0);p.wait_for_timeout(100);p.keyboard.press('7');check('Object can be picked up',story(p)['held'] is not None);p.keyboard.press('8');p.wait_for_timeout(800);check('Thrown object leaves hand',story(p)['held'] is None and story(p)['statistics']['thrown']>0)
  p.evaluate('window.__lastCall.test.story().test.arrest()');check('Arrest opens chapter transition',story(p)['modal']);p.click('#modalNext180');p.wait_for_timeout(400);check('Wake-up phase is sober top-down',story(p)['mode']=='stealth' and p.evaluate('window.__lastCall.getState().intox')<1)
  p.screenshot(path=str(OUT/'stealth.png'))
  place(p,-2.4,-5.3,-1.57079632679);p.keyboard.down('a');p.wait_for_timeout(650);p.keyboard.up('a');stand=story(p)['player']['x'];check('Low vent blocks standing character',stand< -1.8,stand)
  p.keyboard.down('Control');p.keyboard.down('a');p.wait_for_timeout(1300);p.keyboard.up('a');p.keyboard.up('Control');check('Crouching opens low passage',story(p)['player']['x']> -1.7,story(p)['player'])
  p.evaluate('window.__lastCall.test.story().test.deck()');p.set_viewport_size({'width':430,'height':820});p.wait_for_timeout(450);p.screenshot(path=str(OUT/'mobile-deck.png'))
  rects=p.locator('.fight-key').evaluate_all('(xs)=>xs.filter(e=>e.getBoundingClientRect().width).map(e=>{const r=e.getBoundingClientRect();return {key:e.dataset.key,x:r.x,y:r.y,w:r.width,h:r.height}})');check('All nine keypad controls fit portrait',len(rects)==9 and all(r['x']>=0 and r['x']+r['w']<=431 and r['y']>=0 and r['y']+r['h']<=821 for r in rects),rects)
  p.set_viewport_size({'width':932,'height':430});p.wait_for_timeout(300);p.screenshot(path=str(OUT/'landscape-deck.png'))
  p.evaluate('window.__lastCall.test.story().test.returnBridge()');p.wait_for_timeout(500);p.screenshot(path=str(OUT/'bridge-guards.png'));check('Final bridge has four guards',len(story(p)['actors'])==4)
  for i in range(4):actor(p,i,down=90,hp=0)
  place(p,0,6,0);p.keyboard.press('f');p.wait_for_timeout(300);check('Reclaiming bridge restores original helm',story(p)['mode']=='helm');p.screenshot(path=str(OUT/'helm-return.png'))
  p.click('#pause');before=story(p)['elapsed'];p.keyboard.press('9');p.wait_for_timeout(400);check('Pause freezes chapter and rejects actions',story(p)['elapsed']==before);p.click('#resume')
  check('No uncaught browser errors',not report['errors'],report['errors'])
 except Exception as e:
  report['exception']=str(e);traceback.print_exc();check('Browser scenario completes',False,str(e))
  try:p.screenshot(path=str(OUT/'failure.png'))
  except:pass
 finally:
  report['passed']=all(x['pass'] for x in report['checks']) and not report['errors'];(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));b.close()
print(json.dumps({'passed':report['passed'],'checks':len(report['checks'])}));sys.exit(0 if report['passed'] else 1)
