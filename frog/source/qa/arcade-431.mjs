import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');

const expected=process.env.EXPECTED_VERSION||'4.3.1';
const mode=process.env.QA_MODE||'accept';
const scope=process.env.QA_SCOPE||'full';
const out=process.env.OUT_DIR||`qa/arcade-431-${mode}-evidence`;
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');url.searchParams.set('test','1');
await fs.mkdir(out,{recursive:true});
const report={expectedVersion:expected,mode,scope,checks:[],failures:[],errors:[],samples:[],screenshots:[],sourceBundles:[],limitations:[
 'Chromium with software WebGL and real keyboard/mouse/touch events; no physical-device FPS assessment.',
 'Direction assertions project actual per-frame player displacement through the rendered camera, not merely a frozen world-space input vector.',
 'Free-area fixtures isolate controls from walls, enemy pressure, and stale save state. A separate natural-spawn test traverses the actual home doorway.',
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail?{detail}:{})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok&&detail?' '+JSON.stringify(detail):''}`);};
const angle=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
let activePage;

async function boot(options={}){
 const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,...options});
 await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0})));
 const page=await context.newPage();activePage=page;page.setDefaultTimeout(120000);page.on('pageerror',e=>report.errors.push(e.stack||e.message));
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(v=>window.__FROG__?.version===v,expected,{timeout:180000});await page.evaluate(()=>window.frogArcade.renderer.setAnimationLoop(null));
 for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.sourceBundles.includes(src))report.sourceBundles.push(src);
 await page.locator('#play-button').click();return {context,page};
}
async function sample(page){return page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return {x:p.x,z:p.z,face:p.face,aiming:p.aiming,aimX:p.aimX,aimZ:p.aimZ,shots:g.state.stats.shots,time:g.state.time,yaw:Math.atan2(g.focus.x-g.camera.position.x,g.focus.z-g.camera.position.z),configuredYaw:g.cameraYaw,pitch:g.cameraPitch,dragging:!!g.cameraDrag,viewMode:g.viewMode,input:g.currentInput(),camera:{x:g.camera.position.x,y:g.camera.position.y,z:g.camera.position.z},focus:{x:g.focus.x,y:g.focus.y,z:g.focus.z}};});}
async function frames(page,count=1,dt=.05){
 return page.evaluate(({count,dt})=>{
  const g=window.frogArcade,result=[];
  for(let i=0;i<count;i++){
   const p=g.state.actors[0],before={x:p.x,z:p.z};g.frame(g.last+dt*1000+.001);
   const height=g.ground(p.x,p.z)+1.2,a=g.project(before.x,height,before.z),b=g.project(p.x,height,p.z);
   result.push({x:p.x,z:p.z,dx:p.x-before.x,dz:p.z-before.z,screenX:b.x-a.x,screenY:b.y-a.y,yaw:Math.atan2(g.focus.x-g.camera.position.x,g.focus.z-g.camera.position.z),face:p.face,aiming:p.aiming});
  }
  return result;
 },{count,dt});
}
async function capture(page,name){await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);await fs.writeFile(`${out}/report.json`,JSON.stringify({...report,status:'in_progress'},null,2));}
async function freeArea(page,{keepCamera=false}={}){
 for(const key of ['w','a','s','d'])await page.keyboard.up(key);await page.mouse.up({button:'left'});await page.mouse.up({button:'right'});
 await page.evaluate(({keepCamera})=>{
  const g=window.frogArcade;if(!keepCamera)g.startNew();g.clearInputs();const s=g.state,p=s.actors[0];s.phase='countdown';s.intro=1000;s.bullets.length=0;s.shells.length=0;
  Object.assign(p,{x:3,z:5,face:Math.PI,aimX:0,aimZ:-1,aiming:false,ammo:60,hop:0,hopX:0,hopZ:0,height:0,idle:0,shot:0,kick:0,impulseX:0,impulseZ:0});
  g.aim={x:0,z:-1};g.cameraReady=false;g.updateHUD();
 },{keepCamera});await frames(page);
}
function judgeMovement(name,before,samples,expectedDirection,{requireYaw=true}={}){
 const moving=samples.filter(s=>Math.hypot(s.screenX,s.screenY)>.05),norm=Math.hypot(...expectedDirection);
 const alignments=moving.map(s=>(s.screenX*expectedDirection[0]+s.screenY*expectedDirection[1])/(Math.hypot(s.screenX,s.screenY)*norm));
 const drift=Math.max(0,...samples.map(s=>angle(s.yaw,before.yaw)));
 const detail={frames:samples.length,movingFrames:moving.length,minScreenAlignment:alignments.length?Math.min(...alignments):null,lastScreenDelta:moving.at(-1)&&[moving.at(-1).screenX,moving.at(-1).screenY],cameraYawDriftDegrees:drift*180/Math.PI};
 report.samples.push({name,before,samples,detail});record(moving.length>=Math.min(3,samples.length)&&alignments.every(a=>a>.72),`${name}: motion stays in the intended screen direction`,detail);
 if(requireYaw)record(drift<.025,`${name}: movement does not rotate camera yaw`,detail);
}
async function hold(page,name,keys,direction,count=8){const before=await sample(page);for(const key of keys)await page.keyboard.down(key);const trail=await frames(page,count);for(const key of [...keys].reverse())await page.keyboard.up(key);judgeMovement(name,before,trail,direction);return trail;}
async function yawStable(page,name,before,count=6){const trail=await frames(page,count),drift=Math.max(...trail.map(s=>angle(s.yaw,before.yaw)));report.samples.push({name,before,samples:trail});record(drift<.025,name,{driftDegrees:drift*180/Math.PI});}

async function mouseChords(page){
 await freeArea(page);await page.mouse.move(640,500);const chordBefore=await sample(page);
 await page.mouse.down({button:'left'});await page.mouse.down({button:'right'});await frames(page,1);
 const chord=await page.evaluate(()=>({dragging:!!window.frogArcade.cameraDrag,shots:window.frogArcade.state.stats.shots}));
 record(chord.dragging,'Adding RMB while LMB is held starts orbit without requiring a pointer move');record(chord.shots===chordBefore.shots,'A fast LMB→RMB chord before the next frame cannot leak a queued shot',{before:chordBefore.shots,after:chord.shots});
 await page.mouse.move(700,520);await frames(page,2);await page.mouse.up({button:'right'});const releaseYaw=await page.evaluate(()=>window.frogArcade.cameraYaw);await page.mouse.move(725,520);const afterChordRelease=await page.evaluate(()=>({yaw:window.frogArcade.cameraYaw,dragging:!!window.frogArcade.cameraDrag}));
 record(!afterChordRelease.dragging&&Math.abs(afterChordRelease.yaw-releaseYaw)<1e-9,'Releasing RMB while LMB remains held stops orbit immediately');await page.mouse.up({button:'left'});
}
async function roundReset(page){
 await freeArea(page);await page.evaluate(()=>{const g=window.frogArcade;g.state.time=47;g.state.phase='battle';g.state.intro=0;g.state.actors[0].ammo=37;g.updateHUD();});
 await page.locator('#pause-button').click();await page.reload({waitUntil:'networkidle'});await page.waitForFunction(v=>window.__FROG__?.version===v,expected);await page.evaluate(()=>window.frogArcade.renderer.setAnimationLoop(null));
 record(await page.locator('#new-round-button').isVisible(),'Saved-game title offers an explicit new-round button');await page.locator('#play-button').click();
 const resumed=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return {time:g.state.time,phase:g.state.phase,ammo:p.ammo,x:p.x,z:p.z};});
 record(resumed.time===47&&resumed.phase==='battle'&&resumed.ammo===37&&Math.hypot(resumed.x-3,resumed.z-5)<.01,'Continue preserves an existing version-2 round and its field position',resumed);
 await page.locator('#pause-button').click();record(await page.locator('#new-round-button').isVisible(),'Pause menu also offers an explicit new-round button');await page.locator('#new-round-button').click();
 const fresh=await page.evaluate(()=>{const g=window.frogArcade,s=g.state;return {time:s.time,intro:s.intro,phase:s.phase,saved:g.saved,actors:s.actors.map(a=>{const b=s.bases.find(b=>b.owner===a.id);return {id:a.id,ammo:a.ammo,x:a.x,z:a.z,inside:Math.abs(a.x-b.x)<2.25&&Math.abs(a.z-b.z)<1.8};})};});
 record(fresh.time===0&&fresh.intro===20&&fresh.phase==='countdown','New round resets the shared clock to exactly twenty seconds',fresh);
 record(fresh.saved===null&&fresh.actors.every(a=>a.ammo===0&&a.inside),'New round clears pending saved state and starts every frog empty inside its own house',fresh.actors);await frames(page);await capture(page,'new-round-inside-houses');
 await page.evaluate(()=>window.__FROG__.test.step({},840));await frames(page);const full=await page.evaluate(()=>window.frogArcade.state.actors.map(a=>({id:a.id,ammo:a.ammo,load:a.load})));
 record(full.every(a=>a.ammo===60),'Full-load house screenshot uses sixty flies in all three frogs',full);await capture(page,'full-60-flies-inside-house');
}

try{
 const {context,page}=await boot();await frames(page);
 if(scope==='final-checks'){
  await mouseChords(page);await roundReset(page);await context.close();record(report.errors.length===0,'No uncaught browser exceptions',report.errors);report.ok=report.failures.length===0;if(!report.ok)process.exitCode=1;
 }else{
 const spawn=await page.evaluate(()=>{const g=window.frogArcade;return g.state.actors.map((a,i)=>{const b=g.state.bases.find(b=>b.owner===a.id),r=g.models[i].group.position;return {id:a.id,actor:{x:a.x,z:a.z},rendered:{x:r.x,z:r.z},base:{x:b.x,z:b.z},inside:Math.abs(a.x-b.x)<2.25&&Math.abs(a.z-b.z)<1.8};});});
 record(spawn.every(s=>s.inside), 'Fresh preparation starts all three frogs inside their own house footprints',spawn);await capture(page,'fresh-spawn');
 const spawnBefore=await sample(page);await page.keyboard.down('w');const exitTrail=await frames(page,14);await page.keyboard.up('w');const exited=await sample(page);
 record(exitTrail.some(s=>s.z<16.7),'Natural player spawn can walk forward through the actual home doorway',{before:spawnBefore,after:exited});await capture(page,'natural-doorway-exit');

 for(const [key,dir] of [['w',[0,-1]],['d',[1,0]],['s',[0,1]],['a',[-1,0]]]){
  await freeArea(page);await hold(page,`Held ${key.toUpperCase()}`,[key],dir,9);if(key==='d'||key==='s')await capture(page,`held-${key}`);
 }
 await freeArea(page);
 for(const [key,dir] of [['w',[0,-1]],['d',[1,0]],['s',[0,1]],['a',[-1,0]],['d',[1,0]]])await hold(page,`Sequential ${key.toUpperCase()}`,[key],dir,5);

 await freeArea(page);await page.keyboard.down('w');let before=await sample(page);judgeMovement('W before diagonal',before,await frames(page,4),[0,-1]);
 await page.keyboard.down('d');before=await sample(page);judgeMovement('W+D while W remains held',before,await frames(page,7),[1,-1]);
 await page.keyboard.up('d');before=await sample(page);judgeMovement('W after releasing D only',before,await frames(page,7),[0,-1]);await page.keyboard.up('w');await capture(page,'direction-switches');

 await freeArea(page);let baseline=await sample(page),hoverSamples=[];
 for(const point of [[1040,420],[240,510],[920,600]]){await page.mouse.move(...point);hoverSamples.push(...await frames(page,3));}
 const hoverDrift=Math.max(...hoverSamples.map(s=>angle(s.yaw,baseline.yaw)));record(hoverDrift<.025,'Ordinary mouse hover and aiming never orbit the camera',{driftDegrees:hoverDrift*180/Math.PI});report.samples.push({name:'Mouse hover',before:baseline,samples:hoverSamples});await capture(page,'mouse-hover');
 await freeArea(page);await page.mouse.move(1050,430);baseline=await sample(page);await page.mouse.down({button:'left'});await yawStable(page,'Left-click firing does not orbit camera',baseline,6);await page.mouse.up({button:'left'});const fired=await sample(page);record(fired.shots>baseline.shots,'Actual left mouse button still fires projectiles');
 await new Promise(resolve=>setTimeout(resolve,260));await yawStable(page,'Stopping mouse movement does not snap the camera back',await sample(page),5);

 // Kick turns the visible frog toward its target, but it must not take the camera with it.
 await freeArea(page);await page.evaluate(()=>{const g=window.frogArcade,s=g.state,p=s.actors[0];s.phase='battle';s.actors.slice(1).forEach(a=>{a.dizzyTime=1000;a.ammo=0;});Object.assign(s.actors[1],{x:p.x+2.2,z:p.z});g.updateHUD();});baseline=await sample(page);await page.keyboard.press('q');await yawStable(page,'Defensive kick does not rotate camera',baseline,6);

 if(mode!=='reproduce'){
  await mouseChords(page);

  await freeArea(page);await page.mouse.move(240,600);await frames(page);const previousTarget=await page.evaluate(()=>({...window.frogArcade.mouse.target}));const horizonBefore=await sample(page);await page.mouse.move(830,2);await frames(page);
  const horizon=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],target=g.mouse.target;return {target,aim:g.aim,range:Math.hypot(target.x-p.x,target.z-p.z)};});
  record([horizon.target.x,horizon.target.z,horizon.aim.x,horizon.aim.z,horizon.range].every(Number.isFinite)&&horizon.range<25,'Cursor above the ground horizon has a finite current aiming target',horizon);
  record(Math.hypot(horizon.target.x-previousTarget.x,horizon.target.z-previousTarget.z)>1,'Horizon miss does not reuse a stale previous cursor target');await yawStable(page,'Horizon aiming leaves camera yaw unchanged',horizonBefore,2);

  await freeArea(page);await page.mouse.move(640,500);const orbitBefore=await sample(page);await page.mouse.down({button:'right'});await page.mouse.move(795,530,{steps:8});await page.mouse.up({button:'right'});await frames(page,14);const orbited=await sample(page);
  record(angle(orbited.yaw,orbitBefore.yaw)>.15,'Right-mouse drag explicitly rotates the camera',{degrees:angle(orbited.yaw,orbitBefore.yaw)*180/Math.PI});record(orbited.shots===orbitBefore.shots,'Right-mouse orbit does not fire');record(Math.hypot(orbited.x-orbitBefore.x,orbited.z-orbitBefore.z)<.01,'Right-mouse orbit does not move the frog');
  await hold(page,'W after explicit orbit',['w'],[0,-1],7);await hold(page,'D after explicit orbit',['d'],[1,0],7);await capture(page,'explicit-orbit');
  await page.mouse.move(520,590);await yawStable(page,'Releasing right drag leaves the selected camera orientation stable',await sample(page),6);

  const {context:mobile,page:phone}=await boot({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const cdp=await mobile.newCDPSession(phone);await freeArea(phone);
  const touch=(type,touchPoints)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
  const point=async(id,n,x,y)=>{const r=await phone.locator(`#${id}`).boundingBox();return {id:n,x:r.x+r.width*(.5+x*.5),y:r.y+r.height*(.5+y*.5)};};
  const left=await point('move-stick',1,.9,0),right=await point('aim-stick',2,-.9,0);baseline=await sample(phone);await touch('touchStart',[left,right]);const mobileTrail=await frames(phone,8);await touch('touchEnd',[]);judgeMovement('Touch right strafe while aiming left',baseline,mobileTrail,[1,0]);record((await sample(phone)).shots===baseline.shots,'Aiming with the mobile stick does not shoot or orbit');await capture(phone,'mobile-strafe-aim');
  const worldBefore=await sample(phone);await touch('touchStart',[{id:3,x:175,y:345}]);await touch('touchMove',[{id:3,x:245,y:360}]);await touch('touchEnd',[]);await frames(phone,14);const worldAfter=await sample(phone);record(angle(worldBefore.yaw,worldAfter.yaw)>.1,'Dragging the empty mobile world explicitly orbits camera');record(worldAfter.shots===worldBefore.shots,'Touch orbit never fires');await capture(phone,'mobile-explicit-orbit');await mobile.close();
 }
 await context.close();record(report.errors.length===0,'No uncaught browser exceptions',report.errors);report.ok=report.failures.length===0;if(!report.ok)process.exitCode=1;
 }
}catch(error){report.ok=false;report.fatal=error.stack||String(error);process.exitCode=1;console.error(error);if(activePage&&!activePage.isClosed())try{await activePage.screenshot({path:`${out}/fatal.png`,timeout:15000});}catch{}}
finally{await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser.close();}
