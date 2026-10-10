from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,traceback
BASE=os.getenv('MENU_BASE','http://127.0.0.1:8765/captain/')
OUT=Path('/tmp/mode-menu-qa');OUT.mkdir(exist_ok=True)
report={'base':BASE,'checks':[],'environment':'Chromium; desktop and emulated touch, not a physical iPhone'}
def ck(name,value,detail=None):
 report['checks'].append({'name':name,'pass':bool(value),'detail':detail});print(('PASS ' if value else 'FAIL ')+name,flush=True)
 (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 if not value:raise AssertionError(name)
def tap(page,selector,mobile):
 (page.locator(selector).tap() if mobile else page.locator(selector).click())
def shot(page,name):
 try:page.screenshot(path=str(OUT/name),timeout=12000)
 except Exception as e:report.setdefault('screenshotWarnings',[]).append(str(e))
try:
 with sync_playwright() as pw:
  b=pw.chromium.launch(headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage'])
  for mobile,w,h in [(False,1440,900),(True,390,744),(True,320,568),(True,932,430)]:
   context=b.new_context(viewport={'width':w,'height':h},is_mobile=mobile,has_touch=mobile,device_scale_factor=1)
   page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   page.goto(BASE+'?test=1&menu=1',wait_until='domcontentloaded')
   page.wait_for_selector('#modeMayhem',timeout=15000)
   for sel in ['#modeStory','#modeMayhem']:
    r=page.locator(sel).bounding_box();ck(str(w)+' '+sel+' is immediately visible and tappable',r and r['x']>=0 and r['y']>=0 and r['x']+r['width']<=w+1 and r['y']+r['height']<=h and r['height']>=44,r)
   ck(str(w)+' initial story selected',page.locator('#modeStory').get_attribute('aria-selected')=='true' and page.locator('#storyModePanel').is_visible())
   page.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000)
   ck(str(w)+' original engine version retained',page.evaluate('window.__lastCall.getState().version')=='1.8.4')
   saved=page.evaluate('JSON.stringify(Object.entries(localStorage).sort())')
   for _ in range(3):
    tap(page,'#modeMayhem',mobile);tap(page,'#modeStory',mobile)
   ck(str(w)+' changing modes never changes stored data',page.evaluate('JSON.stringify(Object.entries(localStorage).sort())')==saved)
   tap(page,'#modeMayhem',mobile);page.wait_for_timeout(250)
   ck(str(w)+' mayhem panel and launch are visible',page.locator('#mayhemModePanel').is_visible() and page.locator('#launchMayhem').is_visible())
   ck(str(w)+' story actions are hidden for mayhem',not page.locator('#start').is_visible() and not page.locator('#jailEntry180').is_visible())
   ck(str(w)+' no horizontal overflow',page.evaluate('document.getElementById("intro").scrollWidth<=innerWidth+1'))
   ck(str(w)+' selector does not start gameplay',not page.evaluate('window.__lastCall.getState().playing'))
   page.locator('#launchMayhem').scroll_into_view_if_needed();shot(page,'menu-mayhem-'+str(w)+'.png')
   if not mobile:
    page.locator('#modeMayhem').focus();page.keyboard.press('Home');ck('Keyboard tabs return to story',page.locator('#modeStory').get_attribute('aria-selected')=='true')
    page.keyboard.press('End');ck('Keyboard tabs select mayhem',page.locator('#modeMayhem').get_attribute('aria-selected')=='true')
    tap(page,'#modeStory',False);page.locator('#intro').evaluate('(e)=>e.scrollTop=0');shot(page,'menu-story-desktop.png')
    tap(page,'#start',False);page.wait_for_function('window.__lastCall.getState().playing',timeout=10000)
    ck('Story starts normally after switching modes',page.evaluate('window.__lastCall.getState().version')=='1.8.4' and not page.locator('#modeStory').is_visible())
    page.goto(BASE+'?test=1&mode=mayhem',wait_until='domcontentloaded');page.wait_for_selector('#launchMayhem')
    ck('Optional main-page mayhem preselection works',page.locator('#modeMayhem').get_attribute('aria-selected')=='true')
    tap(page,'#launchMayhem',False)
    page.wait_for_function('window.__lastCall?.getState()?.ready',timeout=90000)
    ck('Main-page launch reaches the actual Mayhem engine',page.evaluate('window.__lastCall.getState().version')=='MAYHEM 1.0.0' and '/captain-mayhem/' in page.url)
    tap(page,'#start',False);page.wait_for_function('window.__lastCall.getState().playing',timeout=10000)
    ck('Mayhem is playable after main-page selection',page.evaluate('window.__lastCall.getState().chapter.foot'))
   else:
    tap(page,'#modeStory',True);ck(str(w)+' touch can return to story',page.locator('#start').is_visible())
   ck(str(w)+' no uncaught JavaScript errors',not errors,errors)
   context.close()
  b.close()
 report['passed']=True
except Exception as e:
 report['passed']=False;report['error']=str(e);traceback.print_exc()
 try:shot(page,'failure.png')
 except:pass
finally:(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
if not report['passed']:raise SystemExit(1)
