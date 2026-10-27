import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const expected=process.env.EXPECTED_VERSION||'4.3.6';
const out=process.env.OUT_DIR||'qa/arcade-436-evidence';
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');url.searchParams.set('test','1');
const selected=new Set((process.env.CASES||'native,reject,absent,silent,touch').split(','));
await fs.mkdir(out,{recursive:true});
const report={version:expected,checks:[],failures:[],errors:[],screenshots:[],bundles:[],stylesheets:[],limitations:[
 'Full Chromium with software WebGL. Native desktop mouse/keyboard and emulated mobile touch use browser input events.',
 'Rejected, absent and silent Pointer Lock conditions deliberately override only the browser capture API; menu actions and game controls remain production code.',
 'The animation loop is stepped deterministically for timing and persistence assertions. Visual captures render the production scene and interface.',
 'Mobile checks emulate touch and screen sizes; they are not a physical iPhone/Safari test.'
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok&&detail?' '+JSON.stringify(detail):''}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{channel:'chromium'}),args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();

async function attach(page){
 await page.waitForFunction(v=>window.__FROG__?.version===v,expected,{timeout:180000});
 await page.evaluate(()=>{
  const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.__newCalls=0;window.__resumeCalls=0;
  const start=g.startNew,resume=g.startOrResume;
  g.startNew=function(...args){window.__newCalls++;return start.apply(this,args);};
  g.startOrResume=function(...args){window.__resumeCalls++;return resume.apply(this,args);};
 });
 for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
 for(const href of await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)))if(!report.stylesheets.includes(href))report.stylesheets.push(href);
}
async function boot({mobile=false,width=1440,height=900}={}){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(()=>{if(!localStorage.getItem('frog-arcade-settings-v1'))localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0}));});
 const page=await context.newPage();page.setDefaultTimeout(30000);page.on('pageerror',e=>report.errors.push(e.stack||e.message));
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await attach(page);return {context,page};
}
async function snapshot(page){return page.evaluate(()=>{const g=window.frogArcade,s=g.state,p=s.actors[0];return {running:g.running,mode:g.mode,locked:document.pointerLockElement===g.renderer.domElement,menuHidden:g.$('arcade-menu').hidden,resumeDisabled:g.$('play-button').disabled,phase:s.phase,time:s.time,intro:s.intro,seed:s.seed,ammo:p.ammo,x:p.x,z:p.z,shots:s.stats.shots,destroyed:s.bases.filter(b=>b.destroyed).length,yaw:g.cameraYaw,pitch:g.cameraPitch,newCalls:window.__newCalls,resumeCalls:window.__resumeCalls,fire:g.actions.fire,keys:g.keys.size,requestPending:g.mouseLookSession?.pending,requests:window.__lockRequests??0};});}
async function frames(page,n=1){await page.evaluate(n=>{const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels;try{for(let i=0;i<n;i++){g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;g.drawLabels=labels;}},n);}
async function capture(page,name){await frames(page);await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);await save();}
async function activate(page,id,mobile=false){if(mobile)await page.locator(`#${id}`).tap();else await page.locator(`#${id}`).click();}
async function pause(page,mobile=false){if(mobile)await page.locator('#pause-button').tap();else await page.keyboard.press('Escape');await page.waitForFunction(()=>!window.frogArcade.running&&window.frogArcade.mode==='pause');}
async function menuLayout(page,name,{disabled=false}={}){
 const layout=await page.evaluate(()=>{
  const group=document.querySelector('.round-actions'),buttons=['new-round-button','play-button'].map(id=>document.getElementById(id));
  return {group:!!group&&buttons.every(b=>b.parentElement===group),viewport:{w:innerWidth,h:innerHeight},buttons:buttons.map(b=>{const r=b.getBoundingClientRect(),s=b.querySelector('span'),t=s.getBoundingClientRect();return {id:b.id,x:r.x,y:r.y,w:r.width,h:r.height,text:s.textContent,font:getComputedStyle(s).fontSize,disabled:b.disabled,labelFits:s.scrollWidth<=s.clientWidth+1,textInside:t.x>=r.x&&t.right<=r.right,visible:!b.hidden};})};
 });
 const [a,b]=layout.buttons;
 record(layout.group&&a.visible&&b.visible&&Math.abs(a.w-b.w)<=1&&Math.abs(a.h-b.h)<=1&&Math.abs(a.y-b.y)<=1&&a.h>=80&&a.w>=100&&b.x>=a.x+a.w-1&&b.x+b.w<=layout.viewport.w&&a.y>=0&&a.y+a.h<=layout.viewport.h,`${name}: New and Resume form equal, large, adjacent halves inside the viewport`,layout);
 record(a.labelFits&&b.labelFits&&a.textInside&&b.textInside&&a.font===b.font,`${name}: both actions have equally sized readable labels`,layout.buttons);
 record(!a.disabled&&b.disabled===disabled,`${name}: New is available and Resume reflects actual saved progress`,layout.buttons);
}
async function seedProgress(page){await page.evaluate(()=>{
 const g=window.frogArcade,s=g.state;s.time=123.5;s.phase='battle';s.intro=0;s.stats.shots=9;s.stats.caught=7;s.bases[1].destroyed=true;
 Object.assign(s.actors[0],{x:0,z:6,ammo:43,shot:0,hop:0,height:0,face:Math.PI,aimX:0,aimY:0,aimZ:-1});
 for(const a of s.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});
 g.cameraYaw=Math.PI;g.cameraPitch=.12;g.cameraReady=false;g.updateHUD();g.persist();
 });}
function sameProgress(a,b){return ['time','ammo','x','z','shots','destroyed','phase','intro'].every(k=>a[k]===b[k]);}
function isFresh(s){return s.running&&s.menuHidden&&s.phase==='countdown'&&s.time===0&&s.intro===20&&s.ammo===60&&s.shots===0&&s.destroyed===0;}

async function nativeCase(){
 const {context,page}=await boot();
 await menuLayout(page,'Desktop initial menu',{disabled:true});await capture(page,'desktop-new-menu');
 await activate(page,'new-round-button');await page.waitForFunction(()=>!!document.pointerLockElement);let s=await snapshot(page);
 record(isFresh(s)&&s.newCalls===1&&s.locked,'Native mouse: New starts one fresh round and captures the mouse',s);
 await seedProgress(page);const before=await snapshot(page);await pause(page);
 await menuLayout(page,'Desktop paused menu');await capture(page,'desktop-resume-menu');
 await activate(page,'play-button');await page.waitForFunction(()=>!!document.pointerLockElement);s=await snapshot(page);
 record(s.running&&s.menuHidden&&s.locked&&sameProgress(before,s)&&s.resumeCalls===1,'Native mouse: Resume preserves the paused round and reacquires control',s);
 await page.keyboard.down('w');await page.mouse.down({button:'left'});await frames(page,8);await page.keyboard.press('Escape');await page.keyboard.up('w');await page.mouse.up({button:'left'});
 await activate(page,'play-button');await page.waitForTimeout(100);s=await snapshot(page);
 record(s.running&&s.menuHidden&&!s.fire&&s.keys===0,'Escape followed immediately by Resume stays in play with no stuck movement or fire',s);
 await pause(page);const persisted=await snapshot(page);await page.reload({waitUntil:'networkidle'});await attach(page);
 record(!(await snapshot(page)).resumeDisabled,'Reload exposes Resume for an unfinished saved round');
 await activate(page,'play-button');await page.waitForFunction(()=>!!document.pointerLockElement);s=await snapshot(page);
 record(s.running&&sameProgress(persisted,s),'Saved Resume restores the same progress after a full page reload',{persisted,resumed:s});
 await pause(page);await activate(page,'new-round-button');s=await snapshot(page);
 record(isFresh(s)&&!sameProgress(persisted,s)&&s.newCalls===1,'New discards the unfinished round and resets preparation, ammo, scores and storage',s);
 await page.waitForFunction(()=>!!document.pointerLockElement);await page.evaluate(()=>document.exitPointerLock());await page.waitForFunction(()=>!window.frogArcade.running);
 record((await snapshot(page)).mode==='pause','An unexpected native mouse-capture loss still pauses safely');
 await page.locator('#new-round-button').focus();await page.keyboard.press('Enter');await page.waitForTimeout(80);s=await snapshot(page);
 record(s.running&&s.newCalls===2,'Keyboard Enter activates the focused New half exactly once',s);
 await context.close();
}
async function fallbackCase(kind){
 const {context,page}=await boot();
 await page.evaluate(kind=>{
  window.__lockRequests=0;const canvas=window.frogArcade.renderer.domElement;window.__nativeRequestPointerLock=canvas.requestPointerLock;
  Object.defineProperty(canvas,'requestPointerLock',{configurable:true,value:kind==='absent'?undefined:()=>{window.__lockRequests++;return kind==='reject'?Promise.reject(new DOMException('Denied in regression fixture','NotAllowedError')):undefined;}});
 },kind);
 await activate(page,'new-round-button');await page.waitForTimeout(50);let s=await snapshot(page);
 record(isFresh(s)&&!s.locked,`${kind}: New starts even when native mouse capture is unavailable`,s);
 await seedProgress(page);await page.mouse.move(650,450);const before=await snapshot(page);await page.mouse.move(740,420,{steps:4});await frames(page);s=await snapshot(page);
 record(s.running&&Math.abs(s.yaw-before.yaw)>.05&&Math.abs(s.pitch-before.pitch)>.02,`${kind}: ordinary mouse motion still controls both camera axes`,{before,after:s});
 await page.mouse.down({button:'left'});await page.mouse.move(780,395,{steps:4});await frames(page,15);const firing=await snapshot(page);await page.mouse.up({button:'left'});
 record(firing.running&&firing.shots>before.shots&&Math.abs(firing.yaw-s.yaw)>.02,`${kind}: left-click fire and direct look work together without capture`,firing);
 await pause(page);const paused=await snapshot(page);await activate(page,'play-button');await page.waitForTimeout(50);s=await snapshot(page);
 record(s.running&&s.menuHidden&&sameProgress(paused,s),`${kind}: Resume preserves progress and never falls back into the menu`,s);
 if(kind==='silent'){await page.waitForTimeout(1600);s=await snapshot(page);record(s.running&&s.menuHidden&&!s.requestPending,'A silent capture request times out without blocking or pausing gameplay',s);}
 await pause(page);await activate(page,'new-round-button');await page.waitForTimeout(50);s=await snapshot(page);
 record(isFresh(s),`${kind}: the second New click actually resets and starts a fresh round`,s);
 if(kind==='reject'){
  await seedProgress(page);await page.evaluate(()=>Object.defineProperty(window.frogArcade.renderer.domElement,'requestPointerLock',{configurable:true,value:window.__nativeRequestPointerLock}));
  await page.mouse.move(650,450);const uncaptured=await snapshot(page);await page.mouse.down({button:'left'});await page.waitForFunction(()=>!!document.pointerLockElement);
  await page.mouse.move(700,420,{steps:4});await frames(page,15);const recovered=await snapshot(page);await page.mouse.up({button:'left'});
  record(recovered.locked&&recovered.running&&recovered.fire&&recovered.shots>uncaptured.shots&&Math.abs(recovered.yaw-uncaptured.yaw)>.02,'After initial denial, a canvas click upgrades to native capture while held fire and look continue',recovered);
 }
 await context.close();
}
async function touchCase(){
 const {context,page}=await boot({mobile:true,width:390,height:844});
 await menuLayout(page,'Portrait initial menu',{disabled:true});await capture(page,'portrait-new-menu');
 const disabledResume=await page.locator('#play-button').boundingBox();await page.touchscreen.tap(disabledResume.x+disabledResume.width/2,disabledResume.y+disabledResume.height/2);
 record(!(await snapshot(page)).running&&(await snapshot(page)).resumeCalls===0,'Touch: disabled Resume cannot accidentally start a new game');
 await activate(page,'new-round-button',true);let s=await snapshot(page);
 record(isFresh(s)&&!s.locked&&s.newCalls===1,'Touch: one New tap starts exactly one round without requesting mouse capture',s);
 await seedProgress(page);await pause(page,true);await menuLayout(page,'Portrait paused menu');await capture(page,'portrait-resume-menu');
 const before=await snapshot(page);await activate(page,'play-button',true);s=await snapshot(page);
 record(s.running&&sameProgress(before,s)&&s.resumeCalls===1,'Touch: one Resume tap preserves progress and activates exactly once',s);
 await pause(page,true);await activate(page,'settings-button',true);await activate(page,'settings-back',true);
 record(await page.locator('.round-actions').isVisible(),'Returning from touch Settings restores the complete two-action control');
 await page.setViewportSize({width:844,height:390});await page.waitForTimeout(50);await menuLayout(page,'Landscape paused menu');await capture(page,'landscape-resume-menu');
 await page.evaluate(()=>document.addEventListener('click',e=>{if(e.target.closest('.round-actions'))e.stopImmediatePropagation();},true));
 await activate(page,'new-round-button',true);s=await snapshot(page);
 record(isFresh(s)&&s.newCalls===2,'Landscape touch: New starts once even when the synthesized click is suppressed',s);
 const move=await page.locator('#move-stick').boundingBox(),fire=await page.locator('#fire-button').boundingBox();
 record(!!move&&!!fire&&(await page.locator('#touch-controls').isVisible()),'Touch controls remain available after the new round starts');
 const cdp=await context.newCDPSession(page),points=[{id:1,x:move.x+move.width/2,y:move.y+move.height*.3},{id:2,x:fire.x+fire.width/2,y:fire.y+fire.height/2}];
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});
 const multi=await page.evaluate(()=>({move:{...window.frogArcade.move},fire:window.frogArcade.actions.fire}));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 record(multi.fire&&Math.hypot(multi.move.x,multi.move.z)>.1,'Two-finger move and fire input is exercised before returning to the menu',multi);
 await pause(page,true);const finalPaused=await snapshot(page);await activate(page,'play-button',true);s=await snapshot(page);
 record(s.running&&sameProgress(finalPaused,s)&&s.resumeCalls===2,'After multitouch, Resume works from pointerup with the synthesized click suppressed',s);
 await context.close();
}
try{
 if(selected.has('native'))await nativeCase();
 for(const kind of ['reject','absent','silent'])if(selected.has(kind))await fallbackCase(kind);
 if(selected.has('touch'))await touchCase();
}catch(e){report.errors.push(e.stack||e.message);console.error(e);}
finally{if(process.env.EXPECTED_JS)record(report.bundles.length===1&&report.bundles[0].endsWith('/assets/'+process.env.EXPECTED_JS),'The exact frozen JavaScript bundle was tested',report.bundles);if(process.env.EXPECTED_CSS)record(report.stylesheets.length===1&&report.stylesheets[0].endsWith('/assets/'+process.env.EXPECTED_CSS),'The exact frozen stylesheet was tested',report.stylesheets);report.ok=report.failures.length===0&&report.errors.length===0;await save();await browser.close();console.log(JSON.stringify({ok:report.ok,checks:report.checks.length,failures:report.failures.length,errors:report.errors.length,report:`${out}/report.json`}));}
if(!report.ok)process.exitCode=1;
