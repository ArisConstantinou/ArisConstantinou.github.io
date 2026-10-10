"""Final isolated-mode corrections. Must run after build.py and polish.py."""
from pathlib import Path
R=Path(__file__).resolve().parent

def update(name, callback):
 p=R/name;p.write_text(callback(p.read_text()))

def main(s):
 # In test mode capture one completed frame; never change normal gameplay.
 s=s.replace('  if(!renderer||!world||!ship)return;', '  if(!renderer||!world||!ship)return;\n  if(window.__lastCall?.test&&window.__MAYHEM_CAPTURE_DONE__)return;')
 s=s.replace('renderer.render(fx.scene,fx.camera);','renderer.render(fx.scene,fx.camera);\n  if(window.__lastCall?.test&&window.__MAYHEM_CAPTURE_ONCE__)window.__MAYHEM_CAPTURE_DONE__=true;')
 s=s.replace('Math.min(devicePixelRatio,1.7)','Math.min(devicePixelRatio,1.4)').replace('Math.min(devicePixelRatio,1.5)','Math.min(devicePixelRatio,1.25)')
 s=s.replace('moon.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048)','moon.shadow.mapSize.set(1024,1024)')
 # Don't animate a second, hidden population during on-foot gameplay.
 s=s.replace('    people?.update(state.time,dt,','    if(!chapter?.foot)people?.update(state.time,dt,')
 return s
update('main.js',main)

def game(s):
 # The story descent flag disabled attacks after leaving the helm again.
 s=s.replace("yaw=.9;pitch=0;setPhase('descend');", "yaw=.9;pitch=0;s.visited=true;setPhase('deck');")
 s=s.replace('Σταματήστε! Είστε υπό κράτηση!', 'Ασφάλεια πλοίου! Κάντε πίσω!')
 s=s.replace("if(s.sips===1)onToast('Μία γουλιά. Τώρα κατέβα στο κατάστρωμα.');",'')
 s=s.replace('spawnGuard,onMessage:onToast,onRecover:', 'spawnGuard,canPlay,onMessage:onToast,onRecover:')
 s=s.replace("if(e.code==='KeyT'&&s.foot&&!e.repeat)", "if(e.code==='KeyT'&&s.foot&&canPlay()&&!e.repeat)")
 s=s.replace('score(n.hits>4?2:a.score,kind)', 'score(n.hits>4?2:(a.score??24),kind)')
 return s
update('game.js',game)

def systems(s):
 s=s.replace('spawnGuard,onMessage,onRecover})','spawnGuard,canPlay,onMessage,onRecover})')
 s=s.replace('if(!s.foot||s.downed||time<tiltReady)', 'if(!s.foot||s.downed||!canPlay()||time<tiltReady)')
 s=s.replace('function spray(at,dir){if(time<', 'function spray(at,dir){if(!canPlay())return false;if(time<')
 s=s.replace('best=Math.max(best,s.chaos)', 'best=Math.max(best,Number.isFinite(s.chaos)?s.chaos:0)')
 return s
update('systems.js',systems)

def qa(s):
 s=s.replace("def shot(p,name):p.wait_for_timeout(160);p.screenshot(path=str(OUT/(name+'.png')))", '''def shot(p,name):
 # Render a real frame, then capture without concurrent software shadow passes.
 (OUT/'results-progress.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 p.evaluate("window.__MAYHEM_CAPTURE_DONE__=false;window.__MAYHEM_CAPTURE_ONCE__=true")
 try:
  p.wait_for_function('window.__MAYHEM_CAPTURE_DONE__===true',timeout=45000)
  p.screenshot(path=str(OUT/(name+'.png')),timeout=45000)
 finally:p.evaluate('window.__MAYHEM_CAPTURE_DONE__=false;window.__MAYHEM_CAPTURE_ONCE__=false')
''')
 s=s.replace('w=1365,h=820','w=1280,h=800')
 s=s.replace("'--enable-webgl']", "'--enable-webgl','--disable-dev-shm-usage']")
 s=s.replace("check('Desktop has no runtime errors',not errors,errors)", '''# Isolated position setup, real cockpit interaction and attack handlers.
  pos(p,1.2,18.43,44.4,0);p.keyboard.press('KeyF');advance(p,.1)
  check('Can take the real helm inside the new mode',not ch(p)['foot'])
  p.keyboard.press('KeyF');advance(p,.1)
  check('Leaving helm restores unrestricted combat',ch(p)['foot'] and ch(p)['phase']=='deck')
  p.keyboard.press('KeyQ');check('Heavy attack works after helm roundtrip',ch(p)['attack'] and ch(p)['attack']['kind']=='heavy');advance(p,1.1)
  check('Desktop has no runtime errors',not errors,errors)''')
 s=s.replace("try:shot(p,'failure');report['failureState']=state(p)", "try:report['failureState']=state(p);shot(p,'failure')")
 return s
update('qa.py',qa)
print('Mayhem finalization: independent phase flow, stable screenshots, bounded shadow cost.')
