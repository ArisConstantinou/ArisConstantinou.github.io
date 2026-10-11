from pathlib import Path
import re
R=Path(__file__).resolve().parents[2]
# The legacy Mayhem look helper forcibly enabled shadows even on phones. Keep the
# same lighting/materials, but enable expensive shadow filtering only in Detail.
for name in ['captain/main190.js','captain-mayhem/main110.js']:
 p=R/name;s=p.read_text()
 s=s.replace('requestAnimationFrame(frame);\n  if(!renderer',"requestAnimationFrame(frame);\n  if(window.__CAPTAIN_HOLD_FRAME__&&!window.__CAPTAIN_DRAW_ONCE__)return;window.__CAPTAIN_DRAW_ONCE__=false;\n  if(!renderer")
 s=s.replace('renderer.shadowMap.enabled=!mobile','renderer.shadowMap.enabled=!mobile&&quality===2')
 if name.startswith('captain-mayhem'):
  s=s.replace('finishLook(scene,renderer,ship,chapter.renderWorld);',"finishLook(scene,renderer,ship,chapter.renderWorld);renderer.shadowMap.enabled=!mobile&&quality===2;")
 p.write_text(s)
p=R/'captain/shipwalk190.js';s=p.read_text().replace("id:'pool-port',x:-5.0,w:2.4","id:'pool-port',x:-6.4,w:2.2").replace("id:'pool-starboard',x:5.0,w:2.4","id:'pool-starboard',x:6.4,w:2.2");p.write_text(s)
# Capture one freshly rendered frame, then let the compositor settle instead of
# racing an unbounded software-rendered frame loop. This changes QA timing only.
p=R/'captain/tools/qa190.py';s=p.read_text()
s=s.replace('import os,json,math,traceback','import os,json,math,traceback,base64')
s=s.replace('p.screenshot(path=', 'shot(path=')
helper='''def shot(path):
 old=p.evaluate('!!window.__CHAOS_FREEZE__')
 before=p.evaluate("window.__CHAOS_FREEZE__=true;window.__CAPTAIN_HOLD_FRAME__=true;window.__CAPTAIN_DRAW_ONCE__=true;window.__lastCall.getState().frames")
 try:
  p.wait_for_function('(n)=>window.__lastCall.getState().frames>n',arg=before,timeout=45000)
  p.wait_for_timeout(180)
  data=p.context.new_cdp_session(p).send('Page.captureScreenshot',{'format':'png','fromSurface':True})
  Path(path).write_bytes(base64.b64decode(data['data']))
  info=st();print('FRAME',Path(path).name,info.get('drawCalls'),info.get('triangles'),flush=True)
 finally:p.evaluate('(old)=>{window.__CAPTAIN_HOLD_FRAME__=false;window.__CHAOS_FREEZE__=old;}',old)
'''
s=s.replace('def st():return',helper+'def st():return')
s=s.replace("p.evaluate('window.__lastCall.test.setState({speed:6})')","p.evaluate('window.__lastCall.test.setState({speed:6})')")
s=s.replace("p.locator('#bridgeLock').click()", "p.locator('#bridgeLock').click()")
p.write_text(s)
print('Refined rendering budget, pool access and settled-frame screenshots')
