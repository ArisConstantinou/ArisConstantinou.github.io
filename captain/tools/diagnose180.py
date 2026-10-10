from playwright.sync_api import sync_playwright
from pathlib import Path
import json,re,subprocess
out=Path('/tmp/captain180-qa');out.mkdir(exist_ok=True)
logs=[];seen=set()
def check(f):
 f=f.resolve()
 if f in seen:return
 seen.add(f)
 if not f.exists():logs.append(['missing',str(f)]);return
 text=f.read_text();p=subprocess.run(['node','--check',str(f)],capture_output=True,text=True)
 if p.returncode:logs.append(['syntax',str(f),p.stderr])
 for imp in re.findall(r'''(?:from\s*|import\s*)['"]([^'"]+)['"]''',text):
  imp=imp.split('?')[0]
  if imp=='three':g=Path('captain/vendor/three.module.js')
  elif imp.startswith('three/addons/'):g=Path('captain/vendor/addons')/imp[len('three/addons/'):]
  elif imp.startswith('.'):g=f.parent/imp
  else:continue
  check(g)
check(Path('captain/main180.js'))
html=Path('captain/index.html').read_text()
for attrs,text in re.findall(r'<script([^>]*)>(.*?)</script>',html,re.S):
 if text.strip() and 'importmap' not in attrs:
  r=subprocess.run(['node','--check','--input-type=module'],input=text,text=True,capture_output=True)
  if r.returncode:logs.append(['inline-syntax',text,r.stderr])
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl'])
 page=b.new_page();cd=page.context.new_cdp_session(page);cd.send('Debugger.enable');cd.on('Debugger.scriptFailedToParse',lambda e:logs.append(['parse',e.get('url'),e.get('startLine'),e.get('endLine')]))
 page.on('console',lambda m:logs.append([m.type,m.text]) if m.type in ['error','warning'] else None)
 page.on('pageerror',lambda e:logs.append(['exception',e.message,e.stack]))
 page.on('response',lambda r:logs.append(['http',r.status,r.url]) if r.status>=400 else None)
 page.goto('http://127.0.0.1:8765/captain/?test=1',wait_until='domcontentloaded');page.wait_for_timeout(10000)
 result={'messages':logs,'errorText':page.locator('#errorText').inner_text(),'ready':page.evaluate('!!window.__lastCall?.getState()?.ready')}
 print(json.dumps(result,ensure_ascii=False),flush=True);(out/'startup.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));page.screenshot(path=str(out/'startup.png'));b.close()
if not result['ready']:raise SystemExit(1)
