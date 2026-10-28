import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const baseline=process.env.BASELINE==='1',version=baseline?'4.3.14':'4.3.15';
const out=path.resolve(process.env.OUT_DIR||`qa/results/controls-${version}`);
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4178/');url.searchParams.set('test','1');
const report={version,baseline,checks:[],failures:[],errors:[],samples:[],limitations:[
 'Desktop Chromium with software WebGL; no claim about physical mobile devices or every browser.',
 'Fixtures reset to a safe open location and freeze opponents. Keyboard and mouse events use Playwright native input; production physics, rendering, camera and input handlers are not replaced.',
 'Screenspace travel is projected through a saved pre-movement camera, so camera following cannot hide an inverted axis.',
 'Intermediate rendering is skipped only inside deterministic frame batches; the final frame is rendered.'
]};
const check=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,detail});console.log(`${ok?'PASS':'FAIL'} ${name}${ok?'':' '+JSON.stringify(detail)}`);};
const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
async function frames(page,count=1){
 await page.evaluate(count=>{
  const g=window.frogArcade,render=g.renderer.render;
  try{for(let i=0;i<count;i++){g.renderer.render=i===count-1?render:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;}
 },count);
}
async function snap(page){return page.evaluate(()=>{
 const g=window.frogArcade,p=g.state.actors[0],V=g.camera.position.constructor,f=g.camera.getWorldDirection(new V());
 return {mode:g.viewMode,position:{x:p.x,z:p.z},face:p.face,visual:g.models[0].group.rotation.y,aim:Math.atan2(p.aimX,p.aimZ),poseAiming:p.poseAiming,yaw:g.cameraYaw,cameraYaw:Math.atan2(f.x,f.z),locked:!!document.pointerLockElement,reticle:g.currentAimReticle&&{x:g.currentAimReticle.x,y:g.currentAimReticle.y},shots:g.state.stats.shots,keys:[...g.keys]};
});}
async function capture(page,name){await page.screenshot({path:path.join(out,name+'.png')});}
async function boot(context){
 const page=await context.newPage();page.setDefaultTimeout(20000);
 page.on('pageerror',e=>report.errors.push(e.stack||e.message));
 page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('favicon'))report.errors.push(m.text());});
 await page.route('**/favicon.ico',route=>route.fulfill({status:204,body:''}));
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});
 await page.waitForFunction(v=>window.__FROG__?.version===v,version,{timeout:180000});
 await page.evaluate(()=>{
  const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=structuredClone(g.state);
 });
 await page.locator('#new-round-button').click();await frames(page,3);return page;
}
async function fixture(page,mode='overview',yaw=Math.PI){
 await page.mouse.up({button:'left'});await page.mouse.up({button:'right'});
 for(const k of ['w','a','s','d'])await page.keyboard.up(k);
 await page.evaluate(({mode,yaw})=>{
  const g=window.frogArcade;g.clearInputs();g.releaseMouseLook();g.clearEffects();g.state=structuredClone(window.qaFresh);
  Object.assign(g.state,{phase:'battle',intro:0,status:'playing',time:30});g.state.guards=[];g.state.flies.forEach(f=>f.wait=9999);
  const p=g.state.actors[0];Object.assign(p,{x:0,z:4,face:yaw,aimX:Math.sin(yaw),aimZ:Math.cos(yaw),aimY:0,poseAimYaw:null,tongue:9999});
  for(const a of g.state.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});
  g.viewMode=mode;g.cameraYaw=yaw;g.cameraPitch=.12;g.cameraReady=false;g.mouseControl=true;g.shake=0;g.buildActors();g.running=true;g.mode='play';g.accumulator=0;
  g.$('arcade-menu').hidden=true;g.$('arcade-hud').hidden=false;g.ui.classList.remove('in-menu');g.updateCameraPose(0);g.updateHUD();
 },{mode,yaw});
 await page.waitForFunction(()=>!document.pointerLockElement);await frames(page,3);
}
async function travel(page,key,name){
 const before=await page.evaluate(()=>{
  const g=window.frogArcade,p=g.state.actors[0];window.qaCamera=g.camera.clone();
  return {x:p.x,z:p.z,y:g.ground(p.x,p.z)};
 });
 await page.keyboard.down(key);await frames(page,21);await page.keyboard.up(key);await frames(page,2);
 const sample=await page.evaluate(before=>{
  const g=window.frogArcade,p=g.state.actors[0],V=g.camera.position.constructor;
  const a=new V(before.x,before.y,before.z).project(window.qaCamera),b=new V(p.x,before.y,p.z).project(window.qaCamera);
  return {dx:p.x-before.x,dz:p.z-before.z,screenX:(b.x-a.x)*g.w/2,screenY:-(b.y-a.y)*g.h/2,face:p.face,aim:Math.atan2(p.aimX,p.aimZ),visual:g.models[0].group.rotation.y,keys:[...g.keys]};
 },before);
 const right={w:[0,-1],a:[-1,0],s:[0,1],d:[1,0]}[key];
 const ok=(right[0]===0||sample.screenX*right[0]>1)&&(right[1]===0||sample.screenY*right[1]>1);
 check(ok,`${name}: ${key.toUpperCase()} follows the screen`,sample);report.samples.push({name,key,...sample});
 check(!sample.keys.includes('Key'+key.toUpperCase()),`${name}: ${key.toUpperCase()} releases cleanly`);
}
async function enterCapture(page){
 await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement,{},{timeout:5000});await frames(page,20);
}
async function chase(page){
 await fixture(page,'chase3d');await enterCapture(page);
 const initial=await snap(page);await page.mouse.move(790,400);await frames(page,35);const turned=await snap(page);
 check(Math.abs(angle(turned.cameraYaw,initial.cameraYaw))>.35,'native mouse movement turns the actual camera, not only the model',{initial,turned});
 check(Math.abs(angle(turned.visual,turned.aim))<.03&&turned.poseAiming,'chase body follows the new aim after the previous shot has ended',turned);
 check(turned.reticle&&Math.abs(turned.reticle.x-640)<.01&&Math.abs(turned.reticle.y-400)<.01,'captured third person retains one centered crosshair',turned);
 await capture(page,'third-person-after-turn');
 if(baseline)return;
 for(const key of ['w','a','s','d'])await travel(page,key,'rotated third person');
 for(const yaw of [0,Math.PI/2,-Math.PI/2]){
  await fixture(page,'chase3d',yaw);await enterCapture(page);await page.mouse.move(700,400);await frames(page,6);
  await page.keyboard.press('c');await frames(page,5);
  check((await snap(page)).mode==='overview','C changes the actual rendered mode');
  for(const key of ['w','a','s','d'])await travel(page,key,`overview after chase yaw ${yaw.toFixed(2)}`);
 }
}
async function overview(page){
 const targets=[['up',640,220],['left',430,400],['down',640,570],['right',850,400]];
 for(const [name,x,y] of (baseline?targets.slice(2,3):targets))for(const key of ['w','a','s','d']){
  await fixture(page);await page.mouse.move(x,y);await frames(page,24);
  await page.mouse.down();await frames(page,1);await page.mouse.up();await frames(page,12);
  await travel(page,key,`overview aiming ${name}`);
 }
 await capture(page,'overview-independent-aim-and-travel');
}
async function transitions(page){
 await fixture(page);await page.mouse.move(640,570);await frames(page,20);
 for(const transition of ['resume','new round']){
  await page.keyboard.press('Escape');await page.locator(transition==='resume'?'#play-button':'#new-round-button').click();await frames(page,4);
  await page.evaluate(()=>{
   const g=window.frogArcade;Object.assign(g.state.actors[0],{x:0,z:4,hop:0,height:0,idle:0});g.state.guards=[];
   for(const a of g.state.actors.slice(1))Object.assign(a,{ko:true,eliminated:true});g.cameraReady=false;g.updateCameraPose(0);
  });await frames(page,3);
  for(const key of ['w','a','s','d'])await travel(page,key,transition);
  check(await page.evaluate(()=>{const g=window.frogArcade;return !g.aimGuide?.visible&&!g.currentAimPathScreen?.length&&!g.artilleryView.previewPieces.some(p=>p.visible);}),`${transition}: no restored aiming line`);
 }
 await page.evaluate(()=>window.frogArcade.persist());await page.reload({waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.frogArcade);await page.evaluate(()=>window.frogArcade.renderer.setAnimationLoop(null));
 await page.locator('#play-button').click();await frames(page,3);await page.keyboard.press('c');await frames(page,5);
 check((await snap(page)).mode==='overview','saved resume can return to overview');
 for(const key of ['w','a','s','d'])await travel(page,key,'saved resume');
}
async function fallback(){
 const context=await browser.newContext({viewport:{width:1280,height:800}});
 await context.addInitScript(()=>{
  localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0}));
  HTMLElement.prototype.requestPointerLock=function(){return Promise.reject(new Error('QA denied Pointer Lock'));};
 });
 const page=await boot(context);await fixture(page,'chase3d');await page.mouse.move(600,400);await frames(page,2);const before=await snap(page);
 await page.mouse.move(850,390);await frames(page,30);const after=await snap(page);
 check(!after.locked&&Math.abs(angle(after.cameraYaw,before.cameraYaw))>.6,'denied Pointer Lock still turns the actual chase view',{before,after});
 check(after.reticle&&Math.abs(after.reticle.x-640)<.01&&Math.abs(after.reticle.y-400)<.01,'fallback uses the same centered crosshair instead of a second free-cursor aim',after);
 check(Math.abs(angle(after.visual,after.aim))<.03&&after.poseAiming,'fallback camera and body aim agree after rotation',after);
 await capture(page,'third-person-denied-capture');await context.close();
}
try{
 const context=await browser.newContext({viewport:{width:1280,height:800}});
 await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0})));
 const page=await boot(context);
 for(const [name,fn] of [['chase',chase],['overview',overview],...(!baseline?[['transitions',transitions]]:[])]){
  try{await fn(page);}catch(e){report.errors.push(name+': '+e.stack);await capture(page,'failure-'+name).catch(()=>{});}
 }
 await context.close();await fallback();
}catch(e){report.errors.push(e.stack||String(e));}
finally{
 await browser.close();report.ok=!report.failures.length&&!report.errors.length;
 await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({ok:report.ok,checks:report.checks.length,failures:report.failures,errors:report.errors}));
 process.exitCode=baseline||report.ok?0:1;
}
