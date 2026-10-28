from pathlib import Path
import re
p=Path('frog/source/src/arcade.js');s=p.read_text()
old="""  // Native locked mouse movement is owned by one document mouse listener.
  // Pointer events continue to own free-pointer, touch and catapult input.
  addEventListener('mousemove',e=>{
   if(!this.running||this.layoutEditing||!this.pointerLocked()||this.viewMode!=='chase3d'||this.state.actors[0].catapultId)return;
   this.mouseControl=true;this.turnLook(e.movementX,e.movementY);
  });
"""
assert s.count(old)==1
s=s.replace(old,"  // Keep locked look on the native pointer stream which owns canvas input.\n  // Do not depend on separately generated compatibility mouse events.\n")
old='    if(this.pointerLocked())return; // handled once by the native mouse listener'
assert s.count(old)==1
s=s.replace(old,'    if(this.pointerLocked())this.turnLook(e.movementX,e.movementY);')
p.write_text(s)
p=Path('frog/source/qa/arcade-4315.mjs');s=p.read_text()
old=" await page.mouse.up({button:'left'}).catch(()=>{});await page.mouse.up({button:'right'}).catch(()=>{});"
assert s.count(old)==1
s=s.replace(old,' await page.bringToFront();\n'+old)
old=' await page.waitForFunction(()=>!document.pointerLockElement);await frames(page,2);'
assert s.count(old)==1
s=s.replace(old,""" await page.waitForFunction(()=>!document.pointerLockElement&&window.frogArcade.w===innerWidth&&window.frogArcade.h===innerHeight);
 // Native capture release, resize and focus events complete before a fixture
 // chooses its orbit. Positioning the pointer is setup, not a camera gesture.
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 await page.mouse.move(640,400);
 await page.evaluate(({yaw,pitch})=>{const g=window.frogArcade;g.clearInputs();g.cameraYaw=yaw;g.cameraPitch=pitch;g.cameraReady=false;g.freeMousePoint={x:640,y:400};g.updateCameraPose(0);document.activeElement?.blur?.();g.$('view-button').textContent=g.viewMode==='chase3d'?'ΠΙΣΩ 3D · C':'ΚΑΤΟΨΗ · C';},{yaw,pitch});
 await frames(page,2);""")
old="  try{await run(page);}catch(error)"
assert s.count(old)==1
s=s.replace(old,"  try{await page.bringToFront();await run(page);}catch(error)")
old="await page.mouse.move(640+degrees*Math.PI/180/.004,400);await frames(page,3);await page.keyboard.press('c');"
assert s.count(old)==1
s=s.replace(old,"await page.mouse.move(640+degrees*Math.PI/180/.004,400);await frames(page,3);check(Math.abs(angle(await page.evaluate(()=>window.frogArcade.cameraYaw),Math.PI)+degrees*Math.PI/180)<.02||Math.abs(angle(await page.evaluate(()=>window.frogArcade.cameraYaw),Math.PI)-Math.PI*2+degrees*Math.PI/180)<.02,'native '+degrees+'-degree turn actually precedes the overview transition');await page.keyboard.press('c');")
old="await fixture(page,{player:{x:-8.5,z:18.1},view:'chase3d',yaw,pitch:.22});await keyPulse(page,'e');await frames(page,25);"
assert s.count(old)==1
s=s.replace(old,old+"check((await snapshot(page)).player.catapultId==='catapult-player','native E mounts the catapult after the high-quality viewport transition',await snapshot(page));")
old="const page=await context.newPage();page.setDefaultTimeout(20000);"
assert s.count(old)==1
s=s.replace(old,old+"await page.addInitScript(()=>{window.qaNativeEvents=[];for(const type of ['pointermove','mousemove','keydown','keyup'])window.addEventListener(type,e=>{const g=window.frogArcade;if(!g)return;qaNativeEvents.push({type,dx:e.movementX,dy:e.movementY,x:e.clientX,y:e.clientY,key:e.code,pointer:e.pointerType,locked:!!document.pointerLockElement,running:g.running,view:g.viewMode,yaw:g.cameraYaw,pitch:g.cameraPitch,active:document.activeElement?.id});if(qaNativeEvents.length>300)qaNativeEvents.shift();},true);});")
old=" check(report.errors.length===0,'no browser runtime or harness errors',report.errors);"
assert s.count(old)==1
s=s.replace(old," report.nativeEvents=await page.evaluate(()=>window.qaNativeEvents);\n"+old)

# CDP absolute mouse input produces zero deltas and synthetic window warps
# under pointer capture. Run the same assertions in headed Chromium instead,
# with XTest mouse input and calibrated viewport coordinates. Keep every
# production path and all assertions; change only the physical input source.
native=(Path(__file__).resolve().parent/'native-input.mjs').read_text()
s=native+'\n'+s
assert s.count('headless:true')==1
s=s.replace('headless:true','headless:false').replace("args:['--no-sandbox'","args:['--window-position=0,0','--no-sandbox'")
for context in ['context','ctx']:
 old=f'const page=await {context}.newPage();'
 assert s.count(old)==1
 s=s.replace(old,old+'installNativeMouse(page);')
s,count=re.subn(r"await page\.locator\(('[^']*')\)\.click\(\)",r'await clickNative(page,\1)',s)
assert count>=10,count
s=s.replace('Desktop Chromium with software WebGL; no claim about real mobile hardware.','Desktop Chromium under Xvfb with XTest mouse input and software WebGL; no claim about real mobile hardware.')
# X11 cannot address a negative screen coordinate. Leave the actual game
# canvas for the pause HUD instead, without clicking or pausing. This produces
# a trusted pointerleave within the window and retains the original assertion
# that deliberate pointer aiming ended before the strafe/retained-stance test.
old='await page.mouse.move(-10,-10);'
assert s.count(old)==1
s=s.replace(old,"const leaveHud=await page.locator('#pause-button').boundingBox();await page.mouse.move(leaveHud.x+leaveHud.width/2,leaveHud.y+leaveHud.height/2);")
p.write_text(s)
print('Kept production controls and all assertions; browser QA uses trusted XTest input and a real canvas-to-HUD pointerleave.')
