"""Actual Chromium / WebGL smoke test of the assembled publication directory."""
import base64, json, os, subprocess, time
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
OUT=Path('chronicle-check'); OUT.mkdir(exist_ok=True)
server=subprocess.Popen(['python','-m','http.server','8123','--directory',str(ROOT)],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
errors=[];checks=[]
def check(name,condition):
    checks.append({'name':name,'pass':bool(condition)})
    assert condition,name
    print('PASS',name,flush=True)
try:
    time.sleep(1)
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
        page=browser.new_page(viewport={'width':1280,'height':800},device_scale_factor=1)
        page.route('https://fonts.googleapis.com/**',lambda r:r.abort())
        page.add_init_script('window.requestAnimationFrame=cb=>{window.frameCallback=cb;return 1;}')
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto('http://127.0.0.1:8123/',wait_until='domcontentloaded')
        page.wait_for_function('window.chronicle',polling=200,timeout=90000)
        check('Package initializes as 0.4.0',page.evaluate("chronicle.getState().version==='0.4.0'"))
        check('Two human base meshes / 53-bone rigs',page.evaluate('chronicle.getVisualStats().humanModels===2 && chronicle.getVisualStats().rigBones===53'))
        check('All 12 texture files served locally',page.evaluate("async()=>{const names=['stone_wall','plastered_wall_02','wood_planks','forest_ground_04'].flatMap(n=>['diff','nor_gl','rough'].map(c=>'assets/'+n+'_'+c+'.jpg'));return (await Promise.all(names.map(async n=>(await fetch(n)).ok))).every(Boolean);}"))
        check('Village has detailed building meshes',page.evaluate('chronicle.getVisualStats().buildings>=20'))
        start=page.evaluate('chronicle.getState()')
        page.keyboard.down('w');page.evaluate('()=>{for(let i=0;i<30;i++)chronicle._test.stepPlayer(.04);}');page.keyboard.up('w')
        end=page.evaluate('chronicle.getState()')
        check('Walking preserves fixed epoch',abs(end['position']['z']-start['position']['z'])>.4 and end['era']['year']==start['era']['year'])
        check('Desktop joystick hidden',page.evaluate("getComputedStyle(document.getElementById('mobile-controls')).display==='none'"))
        page.evaluate("chronicle.setCamera('portrait');chronicle._test.updateCamera(1);frameCallback(1000);document.getElementById('loading').hidden=true;")
        shot=page.context.new_cdp_session(page).send('Page.captureScreenshot',{'format':'png'})
        (OUT/'character.png').write_bytes(base64.b64decode(shot['data']))
        page.evaluate("document.getElementById('avatar-next').click();chronicle._test.updateCamera(1);frameCallback(1040);")
        check('Second human selectable',page.evaluate('chronicle._test.player.variant===1'))
        shot=page.context.new_cdp_session(page).send('Page.captureScreenshot',{'format':'png'})
        (OUT/'character-woman.png').write_bytes(base64.b64decode(shot['data']))
        check('No uncaught JavaScript errors',not errors)
        page.close()
        mobile=browser.new_page(viewport={'width':430,'height':932},device_scale_factor=1,is_mobile=True,has_touch=True)
        mobile.route('https://fonts.googleapis.com/**',lambda r:r.abort())
        mobile.add_init_script('window.requestAnimationFrame=cb=>{window.frameCallback=cb;return 1;}')
        mobile.goto('http://127.0.0.1:8123/',wait_until='domcontentloaded')
        mobile.wait_for_function('window.chronicle',polling=200,timeout=90000)
        check('Touch joystick visible',mobile.evaluate("getComputedStyle(document.getElementById('mobile-controls')).display!=='none'"))
        check('Mobile layout fits viewport',mobile.evaluate('document.documentElement.scrollWidth===innerWidth'))
        mobile.evaluate('chronicle._test.updateCamera(1);frameCallback(1000);document.getElementById("loading").hidden=true;')
        shot=mobile.context.new_cdp_session(mobile).send('Page.captureScreenshot',{'format':'png'})
        (OUT/'mobile.png').write_bytes(base64.b64decode(shot['data']))
        browser.close()
finally:
    server.terminate()
    (OUT/'results.json').write_text(json.dumps({'checks':checks,'errors':errors,'method':'Actual Chromium WebGL scene. Deterministic frame callbacks. Mobile viewport emulation, not a physical device.'},indent=2))
