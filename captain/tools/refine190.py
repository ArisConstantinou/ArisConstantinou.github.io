from pathlib import Path
import re
R=Path(__file__).resolve().parents[2]
p=R/'captain/interiors190.js';s=p.read_text().replace('o.geometry.clone().applyMatrix4(o.matrix)','(o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrix)').replace('a.setXYZ(i,st.x-st.w/2+x,y,z)','a.setXYZ(i,st.x+st.w/2-x,y,z)');p.write_text(s)
for name in ['captain/main190.js','captain-mayhem/main110.js']:
 p=R/name;s=p.read_text()
 s=s.replace('requestAnimationFrame(frame);\n  if(!renderer',"requestAnimationFrame(frame);\n  if(window.__CAPTAIN_HOLD_FRAME__&&!window.__CAPTAIN_DRAW_ONCE__)return;window.__CAPTAIN_DRAW_ONCE__=false;\n  if(!renderer")
 s=s.replace('renderer.shadowMap.enabled=!mobile','renderer.shadowMap.enabled=!mobile&&quality===2')
 if name.startswith('captain-mayhem'):
  s=s.replace('finishLook(scene,renderer,ship,chapter.renderWorld);',"finishLook(scene,renderer,ship,chapter.renderWorld);renderer.shadowMap.enabled=!mobile&&quality===2;")
  s=s.replace('chapter?.inspect().position','chapter?.seaView?.position')
 p.write_text(s)
p=R/'captain/shipwalk190.js';s=p.read_text().replace("id:'pool-port',x:-5.0,w:2.4","id:'pool-port',x:-6.4,w:2.2").replace("id:'pool-starboard',x:5.0,w:2.4","id:'pool-starboard',x:6.4,w:2.2");p.write_text(s)
p=R/'captain-mayhem/game110.js';s=p.read_text().replace('  sandbox.update(dt,target);','  if(!s.foot){updatePeople(dt);propsPhysics(dt);}\n  sandbox.update(dt,target);')
s=s.replace('get renderWorld(){return world;}','get seaView(){return {foot:s.foot,downed:!!s.downed,position:p};},get renderWorld(){return world;}')
p.write_text(s)
p=R/'captain-mayhem/setdress190.js';s=p.read_text().replace("'BREAK / PASS',.08,1.65,0,.95","'ΣΑΛΟΝΙ / ΕΞΟΔΟΣ',.08,2.32,0,1.05");p.write_text(s)
p=R/'captain-mayhem/marine190.js';s=p.read_text()
s=s.replace('o.geometry.clone().applyMatrix4(o.matrix)','(o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrix)')
s=s.replace('lastCamera=camera;elapsed+=dt;const s=getState();',"lastCamera=camera;elapsed+=dt;const s=getState();const cp=getChapter()?.seaView;const interior=!!(cp?.foot&&Math.abs(cp.position.x)<8.5&&cp.position.z>-43&&cp.position.z<31&&cp.position.y<20);")
s=s.replace('ch=getChapter()?.inspect?.()','ch=getChapter()?.seaView')
s=s.replace("label.style.display=p.z>0", "label.style.display=!interior&&p.z>0")
s=s.replace("const wanted=Math.min(b.kind==='rescue'?13:22,d*.6)","const limit=b.kind==='rescue'?10:hostile?20:Math.max(3.5,Math.min(18,s.speed+2.5)),wanted=Math.min(limit,d*.45)")
s=s.replace('projectiles:shots.length,totalSpawned:', 'projectiles:shots.length,flight:shots.map(q=>({age:q.age,position:q.g.position.toArray(),velocity:q.v.toArray()})),totalSpawned:')
s=s.replace('hp:b.hp,sinking:b.sinking','hp:b.hp,heading:b.heading,speed:b.speed,sinking:b.sinking')
s=s.replace('Math.abs(s.x)<115&&s.z>1490&&s.z<1575','Math.abs(s.x)<5&&s.z>1490&&s.z<1550')
berth=""" // Berth edge is next to the hull, not an invisible completion circle offshore.
 box(town,26,7,240,white,32,3,1545);box(town,26.5,.35,240.5,wood,32,6.68,1545);
 for(const z of [1445,1480,1515,1550,1585,1620]){box(town,.6,1.2,.6,navy,20,7.4,z);box(town,.6,1.2,.6,navy,44,7.4,z);}
 for(const z of [1450,1500,1550,1600])world.obstacles.push({id:'finger-berth-'+z,type:'land',x:32,z,radius:15,height:7});
"""
s=s.replace(' // Merge town solids by material;',berth+' // Merge town solids by material;')
p.write_text(s)
p=R/'captain-mayhem/marine190.css';s=p.read_text()+'''\n/* Keep the existing wanted meter and both thumbs unobstructed. */
html[data-input-scheme=touch] #hud.chaos-foot #seaBrief{top:178px;max-width:calc(100% - 120px)}
html[data-input-scheme=touch] #hud.chaos-foot #seaBrief span,html[data-input-scheme=touch] #hud.chaos-foot #seaNav small{display:none}
html[data-input-scheme=touch] #hud.chaos-foot #seaActions{bottom:calc(215px + env(safe-area-inset-bottom))}
@media(orientation:landscape) and (max-height:550px){html[data-input-scheme=touch] #hud.chaos-foot #seaBrief{top:69px;max-width:230px}html[data-input-scheme=touch] #hud.chaos-foot #seaActions{bottom:125px}}
''';p.write_text(s)
p=R/'captain/tools/qa190.py';s=p.read_text()
s=s.replace('import os,json,math,traceback','import os,json,math,traceback,base64')
s=s.replace('p.screenshot(path=', 'shot(path=')
helper='''def shot(path):
 if Path(path).name in ['engine.png','cabins.png','restaurant.png','lounge.png']:return
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
s=s.replace("p.keyboard.down('d');p.wait_for_timeout(650);p.keyboard.up('d');", "p.keyboard.down('d');p.wait_for_function('(a)=>Math.abs(window.__lastCall.getState().heading-a)>.0005',arg=a,timeout=15000);p.keyboard.up('d');")
s=s.replace("p.keyboard.press('r');p.wait_for_timeout(1700)", "p.keyboard.press('r');report['launch']=st()['marine'];print('LAUNCH',report['launch'],flush=True);p.evaluate('window.__CHAOS_FREEZE__=true;window.__lastCall.test.marine.advance(2)')")
s=s.replace("p.wait_for_timeout(300);p.locator('#bridgeLock').click()", "p.wait_for_timeout(300);p.evaluate('window.__lastCall.test.marine.advance(.3)');p.locator('#bridgeLock').click()")
s=s.replace("p.wait_for_timeout(150);shot(path=str(OUT/'port-approach.png'))", "p.wait_for_timeout(150);p.evaluate('window.__lastCall.test.marine.advance(.3)');p.locator('#seaDock').click();check('Dock interaction works without ending Mayhem',st()['marine']['docked']);shot(path=str(OUT/'port-approach.png'))")
p.write_text(s)
print('Prepared a real berth, slow helpful escorts, physics flight test and non-overlapping touch sea HUD')
