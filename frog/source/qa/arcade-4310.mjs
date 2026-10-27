import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const expected=process.env.EXPECTED_VERSION||'4.3.10',out=process.env.OUT_DIR||'qa/arcade-4310-evidence';
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4175/');url.searchParams.set('test','1');
const cases=new Set((process.env.CASES||'desktop,portrait,landscape,catapult_denied').split(','));
await fs.mkdir(out,{recursive:true});
const report={version:expected,checks:[],failures:[],errors:[],screenshots:[],bundles:[],stylesheets:[],limitations:[
 'Chromium with software WebGL. Mobile screen sizes and touch are emulated, not physical iPhone/Safari testing.',
 'Keyboard, mouse and CDP touch input exercise production handlers; the production animation loop is advanced in deterministic frames.',
 'Fixtures position actors in open space and hold rivals inactive. Rendered model facing, movement, projectile and catapult logic remain production code.',
 'The denied-pointer-lock context replaces only the browser capture request with a rejected promise to exercise its fallback.'
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok?' '+JSON.stringify(detail):''}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||'/tmp/frog-full-chromium/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();let activePage;
async function boot({mobile=false,width=1280,height=800,denyLock=false}={}){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(deny=>{localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,cameraZoom:1,cameraFov:52,cameraSensitivity:1,touchFireMode:'manual'}));if(deny)HTMLCanvasElement.prototype.requestPointerLock=()=>Promise.reject(new DOMException('Test capture refusal','NotAllowedError'));},denyLock);
 const page=await context.newPage();activePage=page;page.on('pageerror',e=>report.errors.push(e.stack||e.message));page.setDefaultTimeout(30000);
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(v=>window.__FROG__?.version===v,expected,{timeout:180000});
 await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.__qaFresh=JSON.parse(JSON.stringify(g.state));window.__qaInput={};window.__qaEvents=[];const original=g.currentInput.bind(g);g.currentInput=()=>{const v=original();window.__qaInput={...v};return v;};for(const type of ['keydown','pointerdown','pointermove','pointerup'])document.addEventListener(type,e=>window.__qaEvents.push({type,key:e.code,pointerType:e.pointerType,trusted:e.isTrusted,target:e.target.id}));});
 for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
 for(const href of await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)))if(!report.stylesheets.includes(href))report.stylesheets.push(href);
 await page.locator('#new-round-button')[mobile?'tap':'click']();
 if(!mobile&&!denyLock)await page.waitForFunction(()=>!!document.pointerLockElement);
 await frames(page,2);return{context,page,cdp:await context.newCDPSession(page)};
}
async function frames(page,n=1){await page.evaluate(n=>{const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels;try{for(let i=0;i<n;i++){g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;g.drawLabels=labels;}},n);}
async function snap(page){return page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],m=g.models[0],v=m.group.getWorldDirection(g.camera.position.clone());const machine=g.state.catapults.find(c=>c.id===p.catapultId),visual=machine&&g.artilleryView.machines.get(machine.id),aim=g.catapultAim?.target,preview=g.artilleryView.previewLine,attr=preview.geometry.attributes.position,n=attr.count-1;let currentRayTarget=null;if(p.catapultId&&g.mouse.valid){const origin=g.camera.position.clone(),direction=origin.clone().set(g.mouse.x/g.w*2-1,1-g.mouse.y/g.h*2,.5).unproject(g.camera).sub(origin).normalize(),distance=(g.ground(p.x,p.z)+.9-origin.y)/direction.y;if(Number.isFinite(distance)&&distance>0){const landing=origin.addScaledVector(direction,distance),dx=landing.x-p.x,dz=landing.z-p.z,range=Math.hypot(dx,dz),limited=Math.max(5,Math.min(28,range));currentRayTarget={x:p.x+dx/range*limited,z:p.z+dz/range*limited};}}return {currentRayTarget,x:p.x,z:p.z,face:p.face,bodyYaw:Math.atan2(v.x,v.z),bodyVisible:m.group.visible,hop:p.hop,hopX:p.hopX,hopZ:p.hopZ,aiming:p.aiming,aimX:p.aimX,aimY:p.aimY,aimZ:p.aimZ,shot:p.shot,shots:g.state.stats.shots,ammo:p.ammo,cameraYaw:g.cameraYaw,cameraPitch:g.cameraPitch,cameraPosition:g.camera.position.toArray(),cameraTarget:g.cameraTarget.toArray(),focus:g.focus.toArray(),mouse:{x:g.mouse.x,y:g.mouse.y,valid:g.mouse.valid},view:g.viewMode,running:g.running,mode:g.mode,input:window.__qaInput,fire:g.actions.fire,autoTarget:g.autoFireTargetId,pointers:[...g.pointers.keys()],pointerLocked:!!document.pointerLockElement,mounted:p.catapultId,stoneShots:p.catapultShots,target:aim?{...aim}:null,turretYaw:visual?.turret.rotation.y,preview:preview.visible,marker:{visible:g.artilleryView.landingMarker.visible,x:g.artilleryView.landingMarker.position.x,z:g.artilleryView.landingMarker.position.z},previewEnd:{x:attr.getX(n),z:attr.getZ(n)},shells:g.state.shells.map(s=>({tx:s.tx,tz:s.tz,owner:s.owner})),bullets:g.state.bullets.filter(b=>b.owner==='player').map(b=>({dx:b.dx,dy:b.dy,dz:b.dz}))};});}
async function fixture(page,{player={x:0,z:6},target=null,view='chase3d',yaw=Math.PI,pitch=.12}={}){
 await page.evaluate(({player,target,view,yaw,pitch})=>{const g=window.frogArcade;g.clearInputs();g.clearEffects();g.state=JSON.parse(JSON.stringify(window.__qaFresh));const s=g.state,p=s.actors[0];s.phase='battle';s.intro=0;s.time=30;s.stats={caught:0,shots:0,hits:0,kos:0,basesDestroyed:0};Object.assign(p,{...player,ammo:60,hop:0,hopX:0,hopZ:0,height:0,idle:0,shot:0,hit:0,invuln:0,dizzyTime:0,impulseX:0,impulseZ:0,face:yaw,aimX:Math.sin(yaw),aimY:0,aimZ:Math.cos(yaw)});for(const a of s.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});if(target)Object.assign(s.actors[1],{...target,ko:false,eliminated:false,ammo:60,shot:9999,idle:9999,kickCooldown:9999,aiShotReady:9999,machineTimer:9999,hit:0,invuln:0,height:0,hop:0,impulseX:0,impulseZ:0});g.viewMode=view;g.cameraYaw=yaw;g.cameraPitch=pitch;g.aim={x:p.aimX,z:p.aimZ};g.cameraReady=false;g.shake=0;g.buildActors();g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');g.calloutUntil=-1;g.hitConfirmUntil=0;g.lastPlayerHit=null;g.accumulator=0;g.updateCameraPose(0);g.updateHUD();window.__qaInput={};window.__qaEvents=[];},{player,target,view,yaw,pitch});await frames(page,18);
}
async function capture(page,name){await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);await save();}
async function touch(cdp,type,points){await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(p=>({...p,radiusX:5,radiusY:5,force:1}))});}
async function point(page,id,dx=0,dy=0,pointer=1){const r=await page.locator('#'+id).boundingBox();return{id:pointer,x:r.x+r.width*(.5+dx),y:r.y+r.height*(.5+dy)};}
async function movementCheck(page,label,press,release,{view='chase3d',yaw=Math.PI,screenshot=false}={}){
 await fixture(page,{view,yaw});const before=await snap(page);await press();await frames(page,24);const moving=await snap(page),dx=moving.x-before.x,dz=moving.z-before.z,length=Math.hypot(dx,dz),alignment=length?(Math.sin(moving.bodyYaw)*dx+Math.cos(moving.bodyYaw)*dz)/length:0;
 record(length>.5&&alignment>.98,`${label}: rendered frog faces its actual hop direction`,{before,moving,distance:length,forwardDot:alignment});
 record(Math.abs(delta(moving.cameraYaw,before.cameraYaw))<1e-9&&Math.abs(moving.cameraPitch-before.cameraPitch)<1e-9,`${label}: changing body heading does not rotate the camera`,{beforeYaw:before.cameraYaw,afterYaw:moving.cameraYaw});
 record(moving.shots===0&&!moving.fire,`${label}: movement alone does not fire`);
 if(screenshot)await capture(page,label.replaceAll(/[^a-zA-Z0-9-]/g,'-').toLowerCase());
 await release();await frames(page,30);const idle=await snap(page);
 record(Math.hypot(idle.x-moving.x,idle.z-moving.z)<.01&&Math.abs(delta(idle.bodyYaw,moving.bodyYaw))<.06,`${label}: after release and landing the frog keeps its travel heading`,{moving,idle});
}
async function desktopCase({baseline=false}={}){
 const {context,page}=await boot();
 const movements=baseline?[['right',['d']]]:[['left',['a']],['right',['d']],['back',['s']],['forward',['w']],['diagonal',['s','d']],['arrow-left',['ArrowLeft']],['rotated-view-right',['d'],Math.PI/3]];
 for(const [label,keys,yaw] of movements)await movementCheck(page,'desktop-'+label,async()=>{for(const key of keys)await page.keyboard.down(key);},async()=>{for(const key of keys)await page.keyboard.up(key);},{yaw:yaw??Math.PI,screenshot:label==='left'||label==='back'});
 if(!baseline){
  await fixture(page);await page.keyboard.down('d');await frames(page,18);const travel=await snap(page);await page.mouse.down();await frames(page,18);const fighting=await snap(page);await page.mouse.up();await page.keyboard.up('d');await frames(page,30);const recovered=await snap(page);
  record(fighting.shots>0&&Math.cos(delta(fighting.bodyYaw,Math.atan2(fighting.aimX,fighting.aimZ)))>.98,'desktop: deliberate held fire aligns body to the shot while movement and aim remain independent',{travel,fighting});
  record(recovered.shot===0&&Math.abs(delta(recovered.bodyYaw,recovered.face))<.06&&Math.abs(delta(recovered.cameraYaw,travel.cameraYaw))<1e-9,'desktop: ending fire returns body to its last travel heading without camera rotation',recovered);
  const events=await page.evaluate(()=>window.__qaEvents);record(events.some(e=>e.type==='keydown'&&e.trusted)&&events.some(e=>e.pointerType==='mouse'&&e.type==='pointerdown'&&e.trusted),'desktop: checks use real keyboard and mouse events');
  await catapultCase(page,{view:'chase3d',label:'desktop-native-chase'});await catapultCase(page,{view:'overview',label:'desktop-native-overview'});
 }
 await context.close();
}
async function mobileCase(label,width,height){
 const {context,page,cdp}=await boot({mobile:true,width,height});
 for(const [name,dx,dy] of [['left',-.4,0],['right',.4,0],['back',0,.4],['diagonal',-.3,-.3]])await movementCheck(page,`${label}-${name}`,async()=>touch(cdp,'touchStart',[await point(page,'move-stick',dx,dy)]),async()=>touch(cdp,'touchEnd',[]),{screenshot:name==='left'});
 await page.locator('#view-button').tap();await frames(page,2);await movementCheck(page,`${label}-overview-left`,async()=>touch(cdp,'touchStart',[await point(page,'move-stick',-.4,0)]),async()=>touch(cdp,'touchEnd',[]),{view:'overview',screenshot:true});
 await fixture(page);const move=await point(page,'move-stick',.4,0),fire=await point(page,'fire-button',0,0,2);await touch(cdp,'touchStart',[move,fire]);await frames(page,18);const fighting=await snap(page);
 record(fighting.shots>0&&fighting.pointers.includes('move')&&fighting.pointers.includes('aim')&&Math.cos(delta(fighting.bodyYaw,Math.atan2(fighting.aimX,fighting.aimZ)))>.98,`${label}: integrated center fire still aims and fires while moving`,fighting);
 await touch(cdp,'touchEnd',[]);await frames(page,30);const released=await snap(page);record(!released.fire&&Math.abs(delta(released.bodyYaw,released.face))<.06,`${label}: releasing both thumbs restores movement facing`,released);
 await fixture(page);const right=await point(page,'aim-stick',.4,0,2),left=await point(page,'move-stick',-.4,0);await touch(cdp,'touchStart',[left,right]);await frames(page,24);const look=await snap(page);record(look.shots===0&&Math.abs(delta(look.bodyYaw,look.face))<.2,`${label}: looking with the outer ring does not force a moving frog to face forward`,look);await touch(cdp,'touchEnd',[]);
 const events=await page.evaluate(()=>window.__qaEvents);record(events.some(e=>e.pointerType==='touch'&&e.target==='move-stick'&&e.trusted)&&events.some(e=>e.pointerType==='touch'&&e.target==='aim-stick'&&e.trusted),`${label}: checks use real dual-touch events`);
 await page.locator('#pause-button').tap();await page.locator('#settings-button').tap();await page.locator('#touch-fire-mode').selectOption('auto');await page.locator('#settings-back').tap();await page.locator('#play-button').tap();
 const pitch=await page.evaluate(()=>{const g=window.frogArcade;return Math.atan2(g.ground(0,6)+1.2-(g.ground(0,-2)+.5),7.1);});await fixture(page,{target:{x:0,z:-2},pitch});const world={id:2,x:Math.round(width*.6),y:Math.round(height*.47)};await touch(cdp,'touchStart',[world]);await frames(page,24);const auto=await snap(page);record(auto.shots>0&&Math.cos(delta(auto.bodyYaw,Math.atan2(auto.aimX,auto.aimZ)))>.98,`${label}: optional automatic fire still aligns the frog to its target`,auto);await touch(cdp,'touchEnd',[]);
 if(label==='portrait')await touchCatapultCase(page,cdp,label);
 await context.close();
}
async function touchCatapultCase(page,cdp,label){
 for(const view of ['chase3d','overview']){
  const station=await page.evaluate(()=>{const c=window.frogArcade.state.catapults[0];return{x:c.x,z:c.z};});
  await fixture(page,{player:{x:station.x,z:station.z+2.05},view});await page.locator('#catapult-button').tap();await frames(page,2);const mounted=await snap(page);
  record(!!mounted.mounted&&await page.locator('#fire-button span').textContent()==='ΠΕΤΡΑ'&&await page.locator('#aim-stick').isVisible(),`${label}-${view}: touch mounting retains the integrated stone joystick`,mounted);
  const ring=await point(page,'aim-stick',0,-.38,2);await touch(cdp,'touchStart',[ring]);await frames(page,14);const selected=await snap(page);await touch(cdp,'touchEnd',[]);await frames(page,1);
  record(selected.target&&selected.shots===0&&selected.stoneShots===0,`${label}-${view}: touch outer-ring aiming does not launch a stone automatically`,selected);
  const fire=await point(page,'fire-button',0,0,2);await touch(cdp,'touchStart',[fire]);await frames(page,1);const fired=await snap(page);
  record(fired.stoneShots===1&&fired.shells.length===1&&selected.target&&Math.hypot(fired.shells[0].tx-selected.target.x,fired.shells[0].tz-selected.target.z)<.05&&fired.ammo===mounted.ammo,`${label}-${view}: touch center fire preserves the chosen direction and power`,{selected,fired});
  await frames(page,200);record((await snap(page)).stoneShots===1,`${label}-${view}: holding touch fire through reload does not repeat stone launches`);await touch(cdp,'touchEnd',[]);
  await page.locator('#catapult-button').tap();await frames(page,2);record(!(await snap(page)).mounted&&await page.locator('#fire-button span').textContent()==='ΠΥΡ',`${label}-${view}: dismount restores the normal touch fire control`);
 }
}
async function catapultCase(page,{view,label,denyLock=false}){
 const actual=await page.evaluate(()=>window.frogArcade.viewMode);if(actual!==view){await page.keyboard.press('c');await frames(page,2);}
 const station=await page.evaluate(()=>{const c=window.frogArcade.state.catapults[0];return{x:c.x,z:c.z};}),yaw=Math.atan2(-station.x,-station.z);
 await fixture(page,{player:{x:station.x,z:station.z+2.05},view,yaw,pitch:.12});await page.keyboard.press('e');await frames(page,3);await page.waitForFunction(()=>!document.pointerLockElement);await frames(page,90);const mounted=await snap(page);
 record(!!mounted.mounted&&mounted.running&&!mounted.pointerLocked,`${label}: mounting deliberately frees the mouse without pausing`,mounted);
 const destinations=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],len=Math.hypot(p.x,p.z),fx=-p.x/len,fz=-p.z/len,rx=-fz,rz=fx,y=g.ground(p.x,p.z)+.9;return [{side:-4,range:10},{side:4,range:10},{side:4,range:18}].map(({side,range})=>{const x=p.x+fx*range+rx*side,z=p.z+fz*range+rz*side,screen=g.project(x,y,z);return{x:screen.x,y:screen.y,world:{x,z}};});});
 const states=[];
 for(const destination of destinations){const hit=await page.evaluate(p=>document.elementFromPoint(p.x,p.y)?.id,destination);record(hit==='arcade-world',`${label}: projected landing point is available to the mouse`,{destination,hit});await page.mouse.move(destination.x,destination.y,{steps:4});await frames(page,4);states.push(await snap(page));}
 const [left,right,far]=states;
 record(left.target&&right.target&&Math.hypot(left.target.x-right.target.x,left.target.z-right.target.z)>2&&Math.abs(delta(left.turretYaw,right.turretYaw))>.1,`${label}: actual horizontal mouse motion turns the turret and landing target`,{left,right});
 record(far.target&&right.target&&Math.abs(far.target.range-right.target.range)>2,`${label}: actual mouse motion also changes shot distance`,{right,far});
 record(states.every(s=>s.preview&&s.marker.visible&&s.target&&Math.hypot(s.marker.x-s.target.x,s.marker.z-s.target.z)<.01&&Math.hypot(s.previewEnd.x-s.target.x,s.previewEnd.z-s.target.z)<.01&&s.currentRayTarget&&Math.hypot(s.currentRayTarget.x-s.target.x,s.currentRayTarget.z-s.target.z)<.001),`${label}: trajectory and landing marker follow the current camera ray target`,states);
 record(states.every(s=>Math.abs(delta(s.cameraYaw,mounted.cameraYaw))<1e-9&&Math.abs(s.cameraPitch-mounted.cameraPitch)<1e-9),`${label}: mouse aims the catapult without rotating the camera`,{mounted,states});
 await capture(page,label+'-aim');
 await page.mouse.down();await frames(page,1);const fired=await snap(page);record(fired.stoneShots===1&&fired.shells.length===1&&far.target&&Math.hypot(fired.shells[0].tx-far.target.x,fired.shells[0].tz-far.target.z)<.05&&fired.ammo===mounted.ammo,`${label}: left click launches a stone at the visible selected target`,{far,fired});await frames(page,20);record((await snap(page)).stoneShots===1,`${label}: holding mouse does not repeatedly launch stones`);await page.mouse.up();
 const beforePause=await snap(page);await page.keyboard.press('Escape');await page.waitForFunction(()=>!window.frogArcade.running);await page.locator('#play-button').click();await frames(page,3);const resumed=await snap(page);record(resumed.running&&resumed.mounted&&!resumed.pointerLocked&&resumed.target&&Math.hypot(resumed.mouse.x-beforePause.mouse.x,resumed.mouse.y-beforePause.mouse.y)<.01&&Math.hypot(resumed.target.x-beforePause.target.x,resumed.target.z-beforePause.target.z)<.001&&resumed.currentRayTarget&&Math.hypot(resumed.currentRayTarget.x-resumed.target.x,resumed.currentRayTarget.z-resumed.target.z)<.001,`${label}: mounted Resume preserves the cursor target without recapturing the mouse`,{selectedBeforeShot:far,beforePause,resumed});
 await page.keyboard.press('e');await frames(page,3);const leftMachine=await snap(page);record(!leftMachine.mounted&&leftMachine.running,`${label}: E exits the catapult normally`,leftMachine);
 if(view==='chase3d'){
  record(!leftMachine.pointerLocked,`${label}: dismount waits for a deliberate click before mouse recapture`);
  const viewport=page.viewportSize();await page.mouse.click(viewport.width*.5,viewport.height*.35);
  if(!denyLock)await page.waitForFunction(()=>!!document.pointerLockElement);await frames(page,2);const activated=await snap(page);
  record(activated.running&&!activated.mounted&&activated.pointerLocked===!denyLock,`${label}: a deliberate on-foot click restores normal mouse-look behavior`,activated);
  await page.mouse.move(viewport.width*.5+40,viewport.height*.35+12,{steps:3});await frames(page,2);const looked=await snap(page);
  record(looked.running&&Math.abs(delta(looked.cameraYaw,activated.cameraYaw))>.01,`${label}: mouse movement rotates the camera again after leaving the catapult`,{activated,looked});
 }
}
try{
 if(cases.has('baseline'))await desktopCase({baseline:true});
 if(cases.has('desktop'))await desktopCase();
 if(cases.has('portrait'))await mobileCase('portrait',390,844);
 if(cases.has('landscape'))await mobileCase('landscape',844,390);
 if(cases.has('catapult_native')){const {context,page}=await boot();await catapultCase(page,{view:'chase3d',label:'desktop-native-chase'});await catapultCase(page,{view:'overview',label:'desktop-native-overview'});await context.close();}
 if(cases.has('catapult_denied')){const {context,page}=await boot({denyLock:true});await catapultCase(page,{view:'chase3d',label:'desktop-denied-chase',denyLock:true});await catapultCase(page,{view:'overview',label:'desktop-denied-overview',denyLock:true});await context.close();}
 if(process.env.EXPECTED_JS)record(report.bundles.every(x=>x.endsWith('/'+process.env.EXPECTED_JS)),'The exact frozen JavaScript bundle was tested',report.bundles);
 if(process.env.EXPECTED_CSS)record(report.stylesheets.every(x=>x.endsWith('/'+process.env.EXPECTED_CSS)),'The exact frozen stylesheet was tested',report.stylesheets);
}catch(e){report.errors.push(e.stack||e.message);console.error(e);if(activePage&&!activePage.isClosed())try{await capture(activePage,'failure');}catch{}}
finally{await save();await browser.close();}
report.ok=report.failures.length===0&&report.errors.length===0;await save();console.log(JSON.stringify({ok:report.ok,checks:report.checks.length,failures:report.failures.length,errors:report.errors.length,report:`${out}/report.json`}));if(!report.ok)process.exitCode=1;
