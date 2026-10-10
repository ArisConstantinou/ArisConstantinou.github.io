"""Verification stability; the play loop itself is not paused for screenshots."""
from pathlib import Path
R=Path(__file__).resolve().parent
p=R/'main.js';s=p.read_text()
s=s.replace('\n  if(window.__lastCall?.test&&window.__MAYHEM_CAPTURE_DONE__)return;','')
s=s.replace('\n  if(window.__lastCall?.test&&window.__MAYHEM_CAPTURE_ONCE__)window.__MAYHEM_CAPTURE_DONE__=true;','')
p.write_text(s)
p=R/'qa.py';s=p.read_text()
a=s.index('def shot(');b=s.index('def fresh(',a)
s=s[:a]+'''def shot(p,name):
 (OUT/'results-progress.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 try:
  p.wait_for_timeout(250)
  p.screenshot(path=str(OUT/(name+'.png')),timeout=15000,animations='disabled')
 except Exception as error:
  report.setdefault('captureWarnings',[]).append({'frame':name,'error':str(error)})
  print('CAPTURE WARNING',name,str(error),flush=True)

'''+s[b:]
s=s.replace('headless=True,args=',"headless=os.getenv('MAYHEM_HEADED')!='1',args=")
s=s.replace("old=ch(p)['yaw'];p.mouse.move(690,380);p.wait_for_timeout(100);check('Mouse movement rotates camera',abs(ch(p)['yaw']-old)>.01)","""old=ch(p)['yaw'];p.mouse.move(655,370,steps=3);p.wait_for_timeout(150);p.mouse.move(730,390,steps=6)
  p.wait_for_function('(old)=>Math.abs(window.__lastCall.getState().chapter.yaw-old)>.01',arg=old,timeout=5000)
  check('Mouse movement rotates camera',abs(ch(p)['yaw']-old)>.01,{'before':old,'after':ch(p)['yaw'],'lock':p.evaluate('document.pointerLockElement?.id')})""")
p.write_text(s)
print('Displayed Chromium and uninterrupted screenshot delivery; assertions unchanged.')
