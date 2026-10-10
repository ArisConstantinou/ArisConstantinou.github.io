from pathlib import Path
r=Path(__file__).resolve().parents[1]
p=r/'escape174.js';s=p.read_text()
s=s.replace("if(suspicion>60){n.state='chase';n.until=time+3;}","if(suspicion>60||Math.hypot(n.x-p.x,n.z-p.z)<.9){n.state='chase';n.until=time+3;}")
p.write_text(s)
p=r/'chaos174.js';s=p.read_text()
s=s.replace("n.health-=a.damage*(1+getState().intox/300);","n.health-=a.damage*(1+getState().intox/300)*(s.phase==='assault'?1.25:1);")
s=s.replace("if(n.state==='fight'){\n     const angle", "if(n.state==='fight'){\n     if(s.phase==='assault'&&p.y<17.8){n.attack=null;n.actor.tick(dt,{time:s.time});continue;}\n     const angle")
s=s.replace("if(['assault','reclaimed'].includes(data.checkpoint))returnToDeck();else startEscape(data);", "if(['assault','reclaimed'].includes(data.checkpoint)){returnToDeck();if(data.checkpoint==='reclaimed'){for(const n of party.filter(n=>n.guard)){n.health=0;n.actor.hide();}p.set(1.2,18.43,44.4);reclaim();}}else startEscape(data);")
p.write_text(s)
p=r/'tools/qa174.py';s=p.read_text()
s=s.replace("if not ok:raise AssertionError((name,detail))", """if not ok:
  try:
   report['failureState']=state(p);p.screenshot(path=str(OUT/'failure.png'))
   (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
  except Exception:pass
  raise AssertionError((name,detail))""")
p.write_text(s)
