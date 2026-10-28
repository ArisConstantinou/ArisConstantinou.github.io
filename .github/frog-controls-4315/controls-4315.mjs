import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const out=path.resolve(process.env.OUT_DIR||'qa/results/controls-4315');
await fs.mkdir(out,{recursive:true});
const report={version:'4.3.15',checks:[],failures:[],errors:[],screenshots:[],limitations:['Desktop Chromium with software WebGL; not real mobile hardware.','Fixture positions and freezes rivals; native keyboard/mouse events drive the unmodified production input, physics, camera and rendering.','Simulation uses deterministic 60 Hz frames and skips intermediate renders; the final frame renders normally.']};
const check=(ok,name,data)=>{report[ok?'checks':'failures'].push({name,data});console.log(`${ok?'PASS':'FAIL'} ${name}${ok?'':' '+JSON.stringify(data)}`);};
const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});
await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,touchFireMode:'manual',mouseTargetLock:false})));
const page=await context.newPage();page.setDefaultTimeout(20000);
page.on('pageerror',e=>report.errors.push(e.stack||e.message));
page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
const base=new URL(process.env.BASE_URL||'http://127.0.0.1:4178/');
await page.route(new URL('/favicon.ico',base).href,route=>route.fulfill({status:204,body:''}));
async function frames(n=1){return page.evaluate(n=>{
 const g=window.frogArcade,render=g.renderer.render,samples=[];
 try{for(let i=0;i<n;i++){
  g.renderer.render=i===n-1?render:()=>{};g.frame(g.last+1000/60+.001);
  const p=g.state.actors[0];samples.push({x:p.x,z:p.z,height:p.height,yaw:g.cameraYaw,face:g.models[0].group.rotation.y,aim:Math.atan2(p.aimX,p.aimZ),reticle:g.currentAimReticle?{x:g.currentAimReticle.x,y:g.currentAimReticle.y}:null});
 }}finally{g.renderer.render=render;}return samples;
},n);}
async function snap(){return page.evaluate(()=>{
 const g=window.frogArcade,p=g.state.actors[0],m=g.models[0];
 return {running:g.running,view:g.viewMode,yaw:g.cameraYaw,face:m.group.rotation.y,aim:Math.atan2(p.aimX,p.aimZ),x:p.x,z:p.z,locked:!!document.pointerLockElement,shots:g.state.stats.shots,reticle:g.currentAimReticle?{x:g.currentAimReticle.x,y:g.currentAimReticle.y}:null,mouse:{x:g.mouse.x,y:g.mouse.y},guide:!!g.aimGuide?.visible||!!g.aimReticle?.visible||!!g.targetRing?.visible||!!g.currentAimPathScreen?.length||g.artilleryView.previewPieces.some(p=>p.visible)};
});}
async function capture(name){await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());await page.screenshot({path:path.join(out,name+'.png')});report.screenshots.push(name+'.png');}
async function fixture({view='overview',yaw=Math.PI,face=0}={}){
 for(const key of ['w','a','s','d','q','e'])await page.keyboard.up(key);
 await page.mouse.up({button:'left'});await page.mouse.up({button:'right'});
 await page.evaluate(({view,yaw,face})=>{
  const g=window.frogArcade;g.clearInputs();g.releaseMouseLook();g.clearEffects();g.state=structuredClone(window.qaFresh);const s=g.state,p=s.actors[0];
  s.phase='battle';s.intro=0;s.time=30;s.guards=[];s.flies.forEach(f=>f.wait=9999);
  Object.assign(p,{x:0,z:6,height:0,face,aimX:Math.sin(face),aimY:0,aimZ:Math.cos(face),poseAimYaw:face,poseAiming:false,tongue:9999});
  for(const a of s.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});
  g.viewMode=view;g.cameraYaw=yaw;g.cameraPitch=.2;g.aim={x:p.aimX,z:p.aimZ};g.mouseControl=true;g.cameraReady=false;g.shake=0;g.buildActors();
  g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu');g.$('arcade-hud').hidden=false;g.accumulator=0;g.calloutUntil=-1;g.hitConfirmUntil=0;g.updateCameraPose(0);g.updateHUD();
 },{view,yaw,face});
 await page.waitForFunction(()=>!document.pointerLockElement);await frames(3);
}
async function movement(key,mode,yaw,face,transition='direct'){
 await fixture({view:mode,yaw,face});
 if(transition==='C'){await page.keyboard.press('c');await frames(2);await page.keyboard.press('c');await frames(2);}
 if(transition==='resume'){await page.keyboard.press('Escape');await page.locator('#play-button').click();await frames(2);}
 if(transition==='new'){await page.keyboard.press('Escape');await page.locator('#new-round-button').click();await frames(2);await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];Object.assign(p,{x:0,z:6,height:0});g.state.guards=[];g.state.actors.slice(1).forEach(a=>{a.ko=true;a.eliminated=true;});g.cameraReady=false;g.updateCameraPose(0);});await frames(2);}
 await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];window.qaCamera=g.camera.clone();window.qaStart={x:p.x,z:p.z,y:g.ground(p.x,p.z)+.45};});
 await page.keyboard.down(key);const samples=await frames(12);await page.keyboard.up(key);
 const moved=await page.evaluate(()=>{
  const g=window.frogArcade,p=g.state.actors[0],s=window.qaStart,c=window.qaCamera;
  const a=c.position.clone().set(s.x,s.y,s.z).project(c),b=c.position.clone().set(p.x,s.y,p.z).project(c);
  return {dx:(b.x-a.x)*g.w/2,dy:-(b.y-a.y)*g.h/2,x:p.x-s.x,z:p.z-s.z};
 });
 const ok=key==='w'?moved.dy<-1:key==='s'?moved.dy>1:key==='a'?moved.dx<-1:moved.dx>1;
 check(ok&&Math.hypot(moved.x,moved.z)>.25,`${mode} native ${key.toUpperCase()} / yaw ${yaw.toFixed(2)} / face ${face.toFixed(2)} / ${transition}`,moved);
 if(mode==='overview')check(key==='w'?moved.z<0:key==='s'?moved.z>0:key==='a'?moved.x<0:moved.x>0,`overview world direction ${key}/${transition}/${face.toFixed(2)}`,moved);
 if(mode==='chase3d'&&yaw===Math.PI&&['w','a','s'].includes(key))await capture(`chase-${key}-directional-hop`);
 check(samples.every(s=>[s.x,s.z,s.height,s.face].every(Number.isFinite)),'finite physics and body during '+mode+' '+key);
}
try{
 base.searchParams.set('test','1');await page.goto(base.href,{waitUntil:'networkidle',timeout:180000});
 await page.waitForFunction(()=>window.__FROG__?.version==='4.3.15',undefined,{timeout:180000});
 await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=structuredClone(g.state);});
 await page.locator('#new-round-button').click();await frames(3);
 for(const transition of ['direct','C','resume','new'])for(const face of [0,Math.PI/2,Math.PI,-Math.PI/2])for(const key of ['w','a','s','d'])await movement(key,'overview',face+.7,face,transition);
 await capture('overview-screen-relative-wasd');
 for(const yaw of [Math.PI,Math.PI/2,0,-Math.PI/2])for(const key of ['w','a','s','d'])await movement(key,'chase3d',yaw,0);
 await fixture({view:'chase3d'});await page.mouse.move(640,400);await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(25);
 let previous=(await snap()).yaw,total=0;
 await page.evaluate(()=>{window.qaMoves={mouse:0,pointer:0};window.addEventListener('mousemove',()=>window.qaMoves.mouse++);window.addEventListener('pointermove',()=>window.qaMoves.pointer++);});
 for(let i=1;i<=4;i++){
  await page.mouse.move(640+i*Math.PI/2/.004,400);await frames(25);const s=await snap(),turn=angle(s.yaw,previous);total+=turn;previous=s.yaw;
  check(Math.abs(turn+Math.PI/2)<.025,'native quarter-turn rotates exactly once '+i,{turn,yaw:s.yaw});
  check(s.reticle&&Math.abs(s.reticle.x-640)<.01&&Math.abs(s.reticle.y-400)<.01&&!s.guide,'single centered chase aim after turn '+i,s);
  check(Math.abs(angle(s.face,s.aim))<.025,'frog follows new aim without firing '+i,{face:s.face,aim:s.aim});
 }
 check(Math.abs(total+Math.PI*2)<.05,'native mouse can rotate through a full circle',{total});
 const events=await page.evaluate(()=>window.qaMoves);check(events.mouse>0&&events.pointer>0,'native mouse and pointer events are processed once',events);
 await fixture({view:'chase3d'});await page.evaluate(()=>{const a=window.frogArcade.state.actors[1];Object.assign(a,{ko:false,eliminated:false,x:8,z:6,idle:9999,shot:9999,tongue:9999,kickCooldown:9999,machineTimer:9999,aiShotReady:9999});});
 await page.mouse.move(640,400);await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(3);
 const enemyOnScreen=()=>page.evaluate(()=>{const g=window.frogArcade,a=g.state.actors[1],p=g.project(a.x,g.ground(a.x,a.z)+.45,a.z);return p.visible&&p.x>0&&p.x<g.w&&p.y>0&&p.y<g.h;});
 const hiddenBefore=!(await enemyOnScreen());await page.mouse.move(640+Math.PI/2/.004,400);await frames(25);
 check(hiddenBefore&&await enemyOnScreen(),'rotating the chase camera reveals a previously off-screen enemy');await capture('chase-turn-reveals-enemy');
 await fixture({view:'chase3d'});
 await page.evaluate(()=>{const canvas=window.frogArcade.renderer.domElement;window.qaOriginalRequest=canvas.requestPointerLock;canvas.requestPointerLock=()=>Promise.reject(new DOMException('QA denied request','NotAllowedError'));});
 await page.mouse.move(640,400);await page.mouse.click(640,400);await frames(3);const fallbackBefore=await snap();
 await page.mouse.move(760,400);await frames(25);const fallbackAfter=await snap();
 check(!fallbackAfter.locked&&Math.abs(angle(fallbackAfter.yaw,fallbackBefore.yaw)+.48)<.03,'denied pointer lock still permits native mouse turning',{before:fallbackBefore,after:fallbackAfter});
 check(fallbackAfter.reticle&&Math.abs(fallbackAfter.reticle.x-640)<.01&&Math.abs(fallbackAfter.reticle.y-400)<.01&&fallbackAfter.mouse.x===640&&fallbackAfter.mouse.y===400,'fallback shares the center ray between crosshair and shot',fallbackAfter);
 await page.evaluate(()=>{window.frogArcade.renderer.domElement.requestPointerLock=window.qaOriginalRequest;});
 check(report.errors.length===0,'no production runtime or shader errors',report.errors);
}catch(e){report.errors.push(e.stack||String(e));console.error(e);await capture('failure').catch(()=>{});}
finally{
 report.ok=!report.errors.length&&!report.failures.length;await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({ok:report.ok,checks:report.checks.length,failures:report.failures,errors:report.errors}));await browser.close();
}
process.exitCode=report.ok?0:1;
