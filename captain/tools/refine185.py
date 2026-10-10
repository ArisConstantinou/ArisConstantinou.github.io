from pathlib import Path
p=Path(__file__).with_name('qa185.py');s=p.read_text()
# Chromium CreateWebTouchEvents treats a nonempty touchEnd list as the IDs
# to release, NOT the IDs that remain. The previous test released the right
# finger while asserting that the left had ended. Keep all assertions.
s=s.replace("send('touchEnd',[right2]);neutral('left release while right stays down')", "send('touchEnd',[left]);neutral('left release while right stays down')")
s=s.replace("send('touchEnd',[left]);ck(label+' right release does not cancel left'", "send('touchEnd',[right]);ck(label+' right release does not cancel left'")
s=s.replace("send('touchEnd',[block]);neutral('movement stops while block stays held')", "send('touchEnd',[left]);neutral('movement stops while block stays held')")
# Keep a bounded, read-only event log for diagnosing genuine multi-touch failures.
s=s.replace("cd=ctx.new_cdp_session(p)", """cd=ctx.new_cdp_session(p)
 p.evaluate('''()=>{window.__releaseEvents=[];for(const type of ['pointerdown','pointerup','pointercancel','lostpointercapture','touchstart','touchend','touchcancel'])window.addEventListener(type,e=>{window.__releaseEvents.push({type,id:e.pointerId,target:e.target.id||e.target.tagName,touches:e.touches?Array.from(e.touches,t=>t.identifier):null,changed:e.changedTouches?Array.from(e.changedTouches,t=>t.identifier):null});if(window.__releaseEvents.length>60)window.__releaseEvents.shift();},true);}''')""")
s=s.replace("report['failureState']=state(page)", "report['failureState']=state(page);report['events']=page.evaluate('window.__releaseEvents')")
p.write_text(s)
