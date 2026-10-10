from pathlib import Path
r=Path(__file__).resolve().parents[1]
p=r/'escape-model174.js';s=p.read_text().replace('CHECKPOINT=position(4,15)','CHECKPOINT=position(2,19)');p.write_text(s)
p=r/'escape174.js';s=p.read_text()
s=s.replace("if(suspicion>60){n.state='chase';n.until=time+3;}","if(suspicion>60||Math.hypot(n.x-p.x,n.z-p.z)<.9){n.state='chase';n.until=time+3;}")
s=s.replace('θα μιλήσουμε όταν ξυπνήσεις!','αυτά έκανες χθες, καπετάνιε!')
s=s.replace("const touch=movement.scheme==='touch',s=getChapter(),v=getVoyage(),c=context();", "const touch=movement.scheme==='touch',s=getChapter(),v=getVoyage(),c=context();$('captainVitals').dataset.danger=s.health<30||suspicion>60?'true':'false';$('vitalCustodyMeter').setAttribute('aria-label','Εντοπισμός');")
p.write_text(s)
p=r/'chaos174.js';s=p.read_text()
s=s.replace("function startEscape(data=null){resetInput();", "function startEscape(data=null){$('arrestCard').hidden=true;resetInput();")
s=s.replace("returning=true;escape.stop();", "returning=true;escape.stop();$('arrestCard').hidden=true;$('chaosTutorial').textContent=movementHints.scheme==='touch'?'':'W A S D · Shift τρέξιμο · 1–4 χτυπήματα · 6 μπλοκ';")
s=s.replace("n.health-=a.damage*(1+getState().intox/300);","n.health-=a.damage*(1+getState().intox/300)*(s.phase==='assault'?1.25:1);")
s=s.replace("if(n.state==='fight'){\n     const angle", "if(n.state==='fight'){\n     if(s.phase==='assault'&&p.y<17.8){n.attack=null;n.actor.tick(dt,{time:s.time});continue;}\n     const angle")
s=s.replace("if(['assault','reclaimed'].includes(data.checkpoint))returnToDeck();else startEscape(data);", "if(['assault','reclaimed'].includes(data.checkpoint)){returnToDeck();if(data.checkpoint==='reclaimed'){for(const n of party.filter(n=>n.guard)){n.health=0;n.actor.hide();}p.set(1.2,18.43,44.4);reclaim();}}else startEscape(data);")
s=s.replace("function hudUpdate(){if(escape.active){escape.drawHUD();return;}","function hudUpdate(){if(escape.active){escape.drawHUD();return;}root.querySelector('.chapter-goal>span').textContent=returning||s.phase==='reclaimed'?'LAST CALL / ΚΕΦΑΛΑΙΟ 03':'LAST CALL / ΚΕΦΑΛΑΙΟ 01';")
p.write_text(s)
p=r/'escape174.css';s=p.read_text()
if '/* Wider mobile escape objective */' not in s:s+='''\n/* Wider mobile escape objective */
html[data-input-scheme="touch"] #hud.escape-active #chaos170 .chapter-goal{width:calc(100% - 24px);max-width:calc(100% - 24px)}
@media(orientation:landscape) and (max-height:550px){html[data-input-scheme="touch"] #hud.escape-active #chaos170 .chapter-goal{width:42%;max-width:42%}}
'''
if '#hud.chaos-reclaimed #chaosTutorial' not in s:s+='\n#hud.chaos-reclaimed #chaosTutorial{display:none!important}\n'
p.write_text(s)
p=r/'tools/qa174.py';s=p.read_text()
s=s.replace('pos(p,-5.4,36.9);p.keyboard.press', 'pos(p,1.2,33.4);p.keyboard.press')
s=s.replace("p.locator('#escapeRetry').click();ck('Retry preserves chapter progress'", "p.locator('#escapeRetry').click();advance(p,.85);ck('Retry preserves chapter progress'")
s=s.replace("p.locator('#continueFromCell').click();", "(p.locator('#continueFromCell').tap() if mobile else p.locator('#continueFromCell').click());")
s=s.replace("p.locator('#continueStory').click()\n", "(p.locator('#continueStory').tap() if mobile else p.locator('#continueStory').click())\n")
s=s.replace("ck('Bridge has four security guards'", "ck('Return to deck does not restore jail overlay',not p.locator('#arrestCard').is_visible())\n    ck('Bridge has four security guards'")
s=s.replace("ck('Helm UI restored',p.locator('#helm140').is_visible())", "ck('Helm UI restored',p.locator('#helm140').is_visible() and not p.locator('#arrestCard').is_visible())")
s=s.replace("if not ok:raise AssertionError((name,detail))", """if not ok:
  try:
   report['failureState']=state(p);p.screenshot(path=str(OUT/'failure.png'))
   (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
  except Exception:pass
  raise AssertionError((name,detail))""")
p.write_text(s)
