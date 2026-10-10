from pathlib import Path
import re
p=Path('captain/chaos173.js');s=p.read_text()
s,n=re.subn(r"\$\('chaosUse'\)\.textContent=.*?;",'',s,count=1);assert n==1
s=s.replace('target=closestTarget(2.7)','target=closestTarget(2.5)')
p.write_text(s)
p=Path('captain/security173.js');s=p.read_text().replace("let stamp=''","let stamp=null").replace("stamp='';nodes=[]","stamp=null;nodes=[]");p.write_text(s)
p=Path('captain/tools/qa173.py');s=p.read_text()
s=s.replace("if not ok:raise AssertionError((name,detail))", "if not ok:\n  try:report['state']=state(p);snap(p,'failure')\n  except Exception:pass\n  raise AssertionError((name,detail))")
s=s.replace("pos(p,0,56,0);pad=", "pos(p,3,40,0);pad=")
s=s.replace("and 'held' in (p.locator('#chaosBlock').get_attribute('class') or ''))", "and 'held' in (p.locator('#chaosBlock').get_attribute('class') or ''),{'before':before,'after':state(p)['chapter']['position'],'blockClass':p.locator('#chaosBlock').get_attribute('class'),'disabled':p.locator('#chaosBlock').is_disabled(),'paused':state(p)['paused'],'modelBlock':p.evaluate('window.__lastCall.test.chapter.model.block')})")
p.write_text(s)
