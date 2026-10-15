"""Run against a local HTTP server, then optionally the public deployed page."""
from playwright.sync_api import sync_playwright
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import functools, threading, json, sys, time, math
root=Path(__file__).resolve().parent.parent
out=Path('artifacts');out.mkdir(exist_ok=True)
checks=[];errors=[]
def log(s):checks.append(s);print(s,flush=True)
def check(page,base,full=False):
 page.goto(base,wait_until='networkidle');page.wait_for_function('window.RESET_GAME?.version==="5.0.0"')
 assert page.locator('#tibo img,#sam img').count()==0
 assert page.locator('.actor-rig').count()==2
 page.click('#start');page.wait_for_timeout(200)
 answers=page.evaluate('RESET_GAME.questions.map(q=>q.answer)')
 def answer(n):
  page.locator('#answers button').nth(n).click();page.click('#lock');page.wait_for_function('document.getElementById("stage").dataset.mood!=="thinking"');page.wait_for_selector('#result',state='visible')
 if full:
  answer(0);assert 'TOO HELPFUL' in page.locator('#verdict').inner_text();assert page.locator('#playing a,dialog').count()==0;page.click('#next')
 for r,n in enumerate(answers if full else answers[:3]):
  answer(n)
  assert page.locator('#stage').get_attribute('data-mood')=='win'
  if r<3:assert 'I couldn’t care less. I get my paycheck and unlimited usage anyway.' in page.locator('#tiboLine').inner_text()
  if r==0:
   samples=[]
   for i in range(18):page.wait_for_timeout(100);samples.append(page.evaluate('RESET_ACTORS.inspect()'))
   assert max(x['actors']['tibo']['pose']['jaw'] for x in samples)-min(x['actors']['tibo']['pose']['jaw'] for x in samples)>.05
   dist=[abs(x['actors']['sam']['joints']['left']['wrist']['x']-x['actors']['sam']['joints']['right']['wrist']['x']) for x in samples]
   assert min(dist)<37 and max(dist)>75
   assert page.locator('#sam').evaluate("e=>getComputedStyle(e).animationName")=='none'
   page.screenshot(path=str(out/('local-laugh.png' if full else 'live-laugh.png')),full_page=True)
   page.wait_for_function('RESET_ACTORS.inspect().actors.sam.action==="shh"');page.wait_for_timeout(700)
   p=page.evaluate('RESET_ACTORS.inspect().actors.sam.joints');assert abs((p['right']['wrist']['y']-51)-p['mouth']['y'])<12
   page.screenshot(path=str(out/('local-shush.png' if full else 'live-shush.png')),full_page=True)
  if r in [2,4,5]:
   text=[]
   while page.locator('#dialogueNext').is_visible():
    page.click('#dialogueNext');text.append(page.locator('#tiboLine').inner_text()+' '+page.locator('#samLine').inner_text())
   if r==2:assert any('UltraFast' in x for x in text) and any('Pretty clever' in x for x in text)
   if r==4:assert any('patron saint' in x for x in text)
  if full:page.click('#next')
  elif r<2:page.click('#next')
 if full:
  assert 'One million' in page.locator('#ending').inner_text();assert page.evaluate('localStorage.getItem("reset-show-v5")') is None
  page.click('#retry');answer(1);page.reload();page.click('#resume');assert page.locator('#stage').get_attribute('data-mood')=='win'
  log('Local: all 15 rounds, new script, follow-up, dialogue, save/resume, completion, no gameplay sources')
 else:log('Public: HTTP runtime, three new opening questions, articulated mouth/arms/clap/shush, Sam monologue')
 log('Independent jaw motion and palm contact verified; no root-card animation')
with sync_playwright() as p:
 browser=p.chromium.launch()
 if '--live' in sys.argv:
  base='https://arisconstantinou.github.io/funny/?v=5.0.0'
  ready=False
  for _ in range(24):
   try:
    response=browser.new_page();response.goto(base,wait_until='networkidle',timeout=20000)
    ready=response.evaluate('window.RESET_GAME?.version')=='5.0.0';response.close()
    if ready:break
   except Exception as e:print('Waiting for public v5:',str(e)[:100],flush=True)
   time.sleep(10)
  assert ready,'Public v5 did not arrive during the verification window'
 else:
  server=ThreadingHTTPServer(('127.0.0.1',8765),functools.partial(SimpleHTTPRequestHandler,directory=str(root)))
  threading.Thread(target=server.serve_forever,daemon=True).start();base='http://127.0.0.1:8765/funny/'
 page=browser.new_page(viewport={'width':1440,'height':1050},reduced_motion='no-preference');page.on('pageerror',lambda e:errors.append(str(e)))
 check(page,base,full='--live' not in sys.argv)
 for width in [320,390,520,768,900,1120,1440]:
  page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(150);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 log('Layout fits seven desktop/mobile widths')
 mobile=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce')
 mp=mobile.new_page();mp.on('pageerror',lambda e:errors.append(str(e)));mp.goto(base,wait_until='networkidle');mp.tap('#start');mp.tap('#answers button[data-index="1"]');mp.tap('#lock');mp.wait_for_function('document.getElementById("stage").dataset.mood==="win"');mp.wait_for_timeout(900)
 assert mp.locator('#samWord').evaluate('e=>e.scrollWidth<=e.clientWidth+1');assert not mp.evaluate('RESET_ACTORS.inspect().motion')
 mp.screenshot(path=str(out/('live-mobile.png' if '--live' in sys.argv else 'local-mobile.png')),full_page=True)
 mp.tap('#dockNext');assert 'QUESTION 02' in mp.locator('#round').inner_text()
 log('Mobile tap controls, question progression, and reduced-motion default')
 browser.close()
assert not errors,errors
out.joinpath('v5-live.json' if '--live' in sys.argv else 'v5-local.json').write_text(json.dumps({'checks':checks,'errors':errors,'version':'5.0.0','live':'--live' in sys.argv},indent=2))
