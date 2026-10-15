"""Browser regression tests for the user-host / Tibo-contestant version."""
import functools,json,threading,os,sys,shutil
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
os.chdir(root)
out=root/'artifacts';out.mkdir(exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',8788),functools.partial(Quiet,directory=str(root)))
threading.Thread(target=server.serve_forever,daemon=True).start()
errors=[];checks=[]
def check(text): checks.append(text);print(text,flush=True)
with sync_playwright() as p:
    browser=p.chromium.launch(**({"executable_path":shutil.which("chromium"),"args":["--no-sandbox"]} if shutil.which("chromium") else {}))
    ctx=browser.new_context(viewport={'width':1440,'height':1050},reduced_motion='reduce')
    page=ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
    base='http://127.0.0.1:8788/funny/'
    page.goto(base);page.wait_for_function('window.RESET_GAME?.version==="4.0.0"')
    assert 'THE USERS' in page.locator('.role-strip').inner_text()
    assert 'TIBO, THE CONTESTANT' in page.locator('.role-strip').inner_text()
    assert page.locator('#sam img').evaluate('(i)=>i.complete&&i.naturalWidth>0')
    assert page.locator('#tiboArt').evaluate('(i)=>i.complete&&i.naturalWidth>0')
    page.screenshot(path=str(out/'title-desktop.png'),full_page=True)
    page.click('#start');page.screenshot(path=str(out/'question-desktop.png'),full_page=True)
    page.click('#sound');assert page.locator('#sound').get_attribute('aria-pressed')=='true'
    page.click('#answers button[data-index="0"]');page.click('#lock');page.wait_for_selector('#result:not([hidden])')
    assert 'TOO HELPFUL' in page.locator('#verdict').inner_text()
    assert page.locator('#stage').get_attribute('data-mood')=='wrong'
    assert page.locator('#playing a, #playing dialog, #playing [id*=source i], #playing [id*=receipt i]').count()==0
    assert page.locator('dialog').count()==0
    assert page.locator('#answers .chosen-win').count()==0
    assert 'sources' not in page.locator('#result').inner_text().lower()
    assert page.locator('#laughLetters').is_visible()==False
    page.screenshot(path=str(out/'helpful-answer-vetoed.png'),full_page=True)
    check('Helpful choice loses a chance; no solution, source, or popup is shown')
    page.reload();page.click('#resume');assert 'TOO HELPFUL' in page.locator('#verdict').inner_text()
    page.click('#next');assert page.locator('#answers button[data-index="0"]').is_disabled()
    page.keyboard.press('b');page.keyboard.press('Enter');page.wait_for_selector('#answers .chosen-win')
    page.wait_for_function('document.getElementById("samWord").textContent==="Shhhhhhh"')
    assert page.locator('#stage').get_attribute('data-mood')=='win'
    assert page.locator('#laughLetters').is_visible()
    assert 'HAHAHA!' in page.locator('#tiboLine').inner_text()
    page.screenshot(path=str(out/'selfish-answer-celebration.png'),full_page=True)
    page.click('#replayLaugh');page.wait_for_function('document.getElementById("samWord").textContent==="Shhhhhhh"')
    assert json.loads(page.evaluate("localStorage.getItem('reset-show-v4')"))['hearts']==2
    check('Self-serving choice triggers Tibo laughter, Sam cheer→Shhhhhhh, no life loss on replay')
    page.click('#next')
    for r in range(1,15):
        assert f'QUESTION {r+1:02}' in page.locator('#round').inner_text()
        if r==1:
            page.click('#fifty');assert page.locator('#answers button:disabled').count()==2
        if r==2:
            page.click('#askSam');assert 'SAM WHISPERS' in page.locator('#hint').inner_text()
        if r==3:
            page.click('#beg');assert 'BACKSTAGE' in page.locator('#hint').inner_text()
        right=page.evaluate(f'RESET_GAME.questions[{r}].answer')
        page.locator(f'#answers button[data-index="{right}"]').click();page.click('#lock')
        page.wait_for_selector('#answers .chosen-win')
        if r in [4,9]: assert json.loads(page.evaluate("localStorage.getItem('reset-show-v4')"))['checkpoint']==r+1
        page.click('#next')
    assert 'TIBO WINS' in page.locator('#ending').inner_text()
    assert page.evaluate("localStorage.getItem('reset-show-v4')") is None
    page.screenshot(path=str(out/'ending-desktop.png'),full_page=True)
    check('All 15 questions, lifelines, checkpoints, ending, and completed-save removal')
    page.click('#retry')
    for ix in [0,2,3]:
        page.locator(f'#answers button[data-index="{ix}"]').click();page.click('#lock')
        page.wait_for_selector('#result:not([hidden])');page.click('#next')
    assert 'MICROPHONE IS OFF' in page.locator('#ending').inner_text()
    page.click('#retry');assert 'QUESTION 01' in page.locator('#round').inner_text()
    seed={'v':4,'r':7,'hearts':1,'prize':4000,'checkpoint':5,'phase':'asking','eliminated':[],'lastPick':-1,'used':{'fifty':False,'sam':False,'beg':False}}
    page.evaluate("s=>localStorage.setItem('reset-show-v4',JSON.stringify(s))",seed);page.reload();page.click('#resume')
    page.locator('#answers button[data-index="0"]').click();page.click('#lock');page.wait_for_selector('#result:not([hidden])');page.click('#next');page.click('#retry')
    assert 'QUESTION 06' in page.locator('#round').inner_text()
    check('Game over and safe checkpoint retry')
    for width in [320,360,390,520,768,820,900,1024,1440]:
        page.set_viewport_size({'width':width,'height':900})
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),f'overflow at {width}'
    check('No horizontal overflow at nine widths including 320px')
    mobile=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True,reduced_motion='reduce')
    mp=mobile.new_page();mp.on('pageerror',lambda e:errors.append(str(e)));mp.goto(base);mp.click('#start')
    mp.screenshot(path=str(out/'question-mobile.png'),full_page=True)
    mp.tap('#answers button[data-index="1"]');mp.tap('#lock');mp.wait_for_function('document.getElementById("samWord").textContent==="Shhhhhhh"')
    mp.screenshot(path=str(out/'celebration-mobile.png'),full_page=True)
    assert mp.locator('#dockNext').is_visible();mp.tap('#dockNext');assert 'QUESTION 02' in mp.locator('#round').inner_text()
    check('Mobile tap controls, laughter reveal and fixed next-question button')
    # Full-motion smoke run as the reduced-motion suite intentionally skips animations.
    motion=browser.new_context(viewport={'width':1280,'height':960})
    ap=motion.new_page();ap.on('pageerror',lambda e:errors.append(str(e)));ap.goto(base);ap.click('#start');ap.click('#answers button[data-index="1"]');ap.click('#lock');ap.wait_for_selector('#answers .chosen-win')
    assert ap.locator('#tiboArt').evaluate("e=>getComputedStyle(e).animationName")=='laugh'
    assert ap.locator('#sam').evaluate("e=>getComputedStyle(e).animationName")=='cheer'
    ap.wait_for_function('document.getElementById("samWord").textContent==="Shhhhhhh"')
    ap.screenshot(path=str(out/'motion-celebration.png'),full_page=True)
    check('Full-motion laugh and cheer animations plus delayed shush')
    page.goto('http://127.0.0.1:8788/funy/');assert '/funny/' in page.url
    page.goto(base+'about.html');assert 'Every answer' in page.locator('.about').inner_text()
    check('Legacy /funy/ redirects and background page stays separate')
    browser.close()
server.shutdown()
report={'checks':checks,'page_errors':errors,'version':'4.0.0','test_environment':'Chromium desktop + emulated mobile; not a physical iPhone test'}
(out/'qa-v4.json').write_text(json.dumps(report,indent=2))
assert not errors,errors
print('PASS',len(checks),'checks',flush=True)
