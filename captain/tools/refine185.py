from pathlib import Path
p=Path(__file__).with_name('qa185.py');s=p.read_text()
# Chromium CreateWebTouchEvents interprets a nonempty touchEnd list as IDs
# to release, not the remaining IDs. Keep the original behavioral assertions.
s=s.replace("send('touchEnd',[right2]);neutral('left release while right stays down')", "send('touchEnd',[left]);neutral('left release while right stays down')")
s=s.replace("send('touchEnd',[left]);ck(label+' right release does not cancel left'", "send('touchEnd',[right]);ck(label+' right release does not cancel left'")
s=s.replace("send('touchEnd',[block]);neutral('movement stops while block stays held')", "send('touchEnd',[left]);neutral('movement stops while block stays held')")
# A CDP acknowledgement is not a JS pointermove completion fence. Let input
# events reach the main thread before checking the yaw; gameplay stays frozen.
s=s.replace("def send(kind,pts):cd.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':pts})", """def send(kind,pts):
  cd.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':pts})
  p.evaluate('()=>new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(()=>done())))')""")
if 'window.__releaseEvents=[]' not in s:
 s=s.replace("cd=ctx.new_cdp_session(p)", """cd=ctx.new_cdp_session(p)
 p.evaluate('''()=>{window.__releaseEvents=[];for(const type of ['pointerdown','pointerup','pointercancel','lostpointercapture','touchstart','touchend','touchcancel'])window.addEventListener(type,e=>{window.__releaseEvents.push({type,id:e.pointerId,target:e.target.id||e.target.tagName,touches:e.touches?Array.from(e.touches,t=>t.identifier):null,changed:e.changedTouches?Array.from(e.changedTouches,t=>t.identifier):null});if(window.__releaseEvents.length>60)window.__releaseEvents.shift();},true);}''')""")
if "report['events']" not in s:s=s.replace("report['failureState']=state(page)", "report['failureState']=state(page);report['events']=page.evaluate('window.__releaseEvents')")
p.write_text(s)
