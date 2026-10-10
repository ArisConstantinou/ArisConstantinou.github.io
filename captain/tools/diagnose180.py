from playwright.sync_api import sync_playwright
from pathlib import Path
import json
out=Path('/tmp/captain180-qa');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
 page=b.new_page();logs=[]
 page.on('console',lambda m:logs.append([m.type,m.text]) if m.type in ['error','warning'] else None)
 page.on('pageerror',lambda e:logs.append(['exception',str(e)]))
 page.on('response',lambda r:logs.append(['http',r.status,r.url]) if r.status>=400 else None)
 page.goto('http://127.0.0.1:8765/captain/?test=1',wait_until='domcontentloaded');page.wait_for_timeout(10000)
 result={'messages':logs,'errorText':page.locator('#errorText').inner_text(),'ready':page.evaluate('!!window.__lastCall?.getState()?.ready')}
 print(json.dumps(result,ensure_ascii=False),flush=True);(out/'startup.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));page.screenshot(path=str(out/'startup.png'));b.close()
if not result['ready']:raise SystemExit(1)
