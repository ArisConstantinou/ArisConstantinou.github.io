import {createRequire} from 'node:module';
import fs from 'node:fs/promises';

// Narrow regression for the reported mobile roof occlusion and 60 refill clicks.
// The viewport matches the game area of IMG_3362.png, excluding browser chrome.
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const expected=process.env.EXPECTED_VERSION||'4.3.2';
const mode=process.env.QA_MODE||'accept';
const scope=process.env.QA_SCOPE||'full';
const out=process.env.OUT_DIR||`qa/arcade-432-${scope==='full'?mode:scope}-evidence`;
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');url.searchParams.set('test','1');
await fs.mkdir(out,{recursive:true});
const report={expectedVersion:expected,mode,scope,viewport:{width:430,height:745},checks:[],failures:[],errors:[],samples:[],screenshots:[],sourceBundles:[],limitations:[
 'Chromium 134 with software WebGL and touch emulation; no physical iPhone/Safari or loudspeaker assessment.',
 'Natural route uses actual W/S keyboard events through the normal frame loop. Orbit uses actual touch events.',
 'Visibility compares actual rendered frog pixels with/without its mesh, then with/without the house roofs, on the same frozen frame. Temporary visibility changes are restored immediately.',
 'Initial refill uses the production model test hook and consumeEvents, with the real sound.play wrapped for counting; shot/hit uses a real fire-button press against an isolated opponent fixture.'
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail?{detail}:{})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok&&detail?' '+JSON.stringify(detail):''}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
let page;
async function frames(n=1){return page.evaluate(n=>{const g=window.frogArcade;for(let i=0;i<n;i++)g.frame(g.last+50.001);const p=g.state.actors[0];return {x:p.x,z:p.z,ammo:p.ammo,time:g.state.time,yaw:g.cameraYaw,pitch:g.cameraPitch};},n);}
async function capture(name){await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);console.log(`SCREENSHOT ${path}`);await save();}
async function visibility(name){
 const result=await page.evaluate(()=>{
  const g=window.frogArcade,gl=g.renderer.getContext(),w=gl.drawingBufferWidth,h=gl.drawingBufferHeight,actor=g.models[0].group,p=g.state.actors[0];
  const roofs=[...g.basesView.bases.values()].map(v=>({mesh:v.roof,visible:v.roof.visible,opacity:v.roofMaterial.opacity,id:v.definition.id}));
  const read=()=>{g.renderer.render(g.scene,g.camera);const data=new Uint8Array(w*h*4);gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,data);return data;};
  const diff=(a,b)=>{let pixels=0,contrast=0;for(let i=0;i<a.length;i+=4){const d=Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2]);if(d>24){pixels++;contrast+=d;}}return {pixels,contrast};};
  const originalVisible=actor.visible;
  let actual,reference;
  try{
   actor.visible=true;const withActor=read();actor.visible=false;actual=diff(withActor,read());
   for(const r of roofs)r.mesh.visible=false;
   actor.visible=true;const openWithActor=read();actor.visible=false;reference=diff(openWithActor,read());
  }finally{actor.visible=originalVisible;for(const r of roofs)r.mesh.visible=r.visible;g.renderer.render(g.scene,g.camera);}
  const center=g.project(p.x,g.models[0].group.position.y+1.2,p.z),ui=document.elementsFromPoint(center.x,center.y).filter(e=>e.id!=='arcade-world'&&e.id!=='arcade-labels'&&e.id!=='arcade-ui'&&e.tagName!=='HTML'&&e.tagName!=='BODY').map(e=>e.id||e.className);
  const rects=['.ammo-card','.base-card','#pause-button','#minimap','#view-button','#round-status','#base-status','#move-stick','#aim-stick','#fire-button','#catapult-button','#layout-button'].map(selector=>{const e=document.querySelector(selector),r=e.getBoundingClientRect(),style=getComputedStyle(e);return !e.closest('[hidden]')&&style.display!=='none'&&style.visibility!=='hidden'&&r.width&&r.height?{selector,x:r.x,y:r.y,w:r.width,h:r.height}:null;}).filter(Boolean);
  const overlaps=[];for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>2&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>2)overlaps.push([a.selector,b.selector]);}
  return {actor:{x:p.x,z:p.z,ammo:p.ammo},camera:{x:g.camera.position.x,y:g.camera.position.y,z:g.camera.position.z,yaw:g.cameraYaw,pitch:g.cameraPitch},actual,reference,contrastRatio:reference.contrast?actual.contrast/reference.contrast:0,center,uiAtActor:ui,rects,overlaps,roofs:roofs.map(({mesh,...r})=>r)};
 });
 report.samples.push({name,...result});
 record(result.reference.pixels>200,`${name}: frog is framed inside the viewport`,result.reference);
 record(result.actual.pixels>200&&result.contrastRatio>.55,`${name}: roof does not hide the rendered frog`,{visiblePixels:result.actual.pixels,unobstructedPixels:result.reference.pixels,contrastRatio:result.contrastRatio,actor:result.actor,roofs:result.roofs});
 record(result.uiAtActor.length===0,`${name}: the frog's center is not covered by HUD controls`,{center:result.center,overlays:result.uiAtActor});
 if(mode!=='reproduce')record(result.overlaps.length===0&&result.rects.every(r=>r.x>=0&&r.y>=0&&r.x+r.w<=report.viewport.width+.5&&r.y+r.h<=report.viewport.height+.5),`${name}: visible HUD and touch controls fit without overlapping`,{overlaps:result.overlaps,rects:result.rects});
 await capture(name);return result;
}
async function walk(key,targetZ){
 const before=await page.evaluate(()=>window.frogArcade.state.actors[0].z);await page.keyboard.down(key);let latest;
 for(let i=0;i<60;i++){latest=await frames();if(key==='w'?latest.z<=targetZ:latest.z>=targetZ)break;}
 await page.keyboard.up(key);await frames(8);
 record(key==='w'?latest.z<=targetZ:latest.z>=targetZ,`Natural ${key.toUpperCase()} route reaches z=${targetZ}`,{before,after:latest});return latest;
}
async function orbit(cdp,dx,dy=0){
 const start={id:7,x:dx>=0?100:285,y:330};
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[start]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...start,x:start.x+dx,y:start.y+dy}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frames(12);
}
async function browserGestures(cdp){
 const viewport=()=>page.evaluate(()=>({scale:visualViewport?.scale||1,x:visualViewport?.offsetLeft||0,y:visualViewport?.offsetTop||0,scrollX,scrollY}));
 const initial=await viewport();
 const unchanged=async name=>{const after=await viewport();record(Object.keys(initial).every(key=>Math.abs(initial[key]-after[key])<.01),name,{before:initial,after});};
 await cdp.send('Input.synthesizePinchGesture',{x:215,y:330,scaleFactor:1.6,relativeSpeed:500,gestureSourceType:'touch'});
 await unchanged('Native pinch cannot zoom or move the gameplay viewport');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:10,x:165,y:300},{id:11,x:265,y:300}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:10,x:165,y:390},{id:11,x:265,y:390}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await unchanged('Two-finger page pan cannot scroll the gameplay viewport');
 await page.touchscreen.tap(215,330);await new Promise(resolve=>setTimeout(resolve,80));await page.touchscreen.tap(215,330);
 await unchanged('Double tap cannot zoom the gameplay viewport');
 await page.mouse.move(215,330);await page.mouse.wheel(0,450);await page.keyboard.down('Control');await page.mouse.wheel(0,-500);await page.keyboard.up('Control');
 await new Promise(resolve=>setTimeout(resolve,100));await unchanged('Wheel pan and Ctrl-wheel pinch cannot scroll or zoom the gameplay viewport');
 for(const key of ['Control+=','Control+-','Control+0'])await page.keyboard.press(key);
 await unchanged('Native Ctrl zoom shortcuts leave the gameplay viewport unchanged');
 const shortcuts=await page.evaluate(()=>['+','-','0'].map(key=>{const e=new KeyboardEvent('keydown',{key,ctrlKey:true,bubbles:true,cancelable:true});document.body.dispatchEvent(e);return {key,prevented:e.defaultPrevented};}));
 record(shortcuts.every(e=>e.prevented),'Gameplay explicitly cancels browser keyboard zoom defaults',shortcuts);
 const label=await page.locator('#ammo-count').boundingBox();
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:12,x:label.x+label.width/2,y:label.y+label.height/2}]});
 await new Promise(resolve=>setTimeout(resolve,850));await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 const selection=await page.evaluate(()=>({text:String(getSelection()),userSelect:getComputedStyle(document.getElementById('ammo-count')).userSelect,callout:getComputedStyle(document.getElementById('ammo-count')).webkitTouchCallout}));
 record(selection.text===''&&selection.userSelect==='none','A long press on the magazine label cannot select or highlight text',selection);
 const contextMenus=await page.evaluate(()=>['arcade-world','ammo-count','move-stick'].map(id=>{const e=new MouseEvent('contextmenu',{bubbles:true,cancelable:true});document.getElementById(id).dispatchEvent(e);return {id,prevented:e.defaultPrevented};}));
 record(contextMenus.every(e=>e.prevented),'Game canvas and HUD suppress native context menus',contextMenus);
 const points=[];
 for(const [id,n,direction] of [['move-stick',13,1],['aim-stick',14,-1]]){const r=await page.locator(`#${id}`).boundingBox();points.push({id:n,x:r.x+r.width*(.5+direction*.4),y:r.y+r.height*.5});}
 const before=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return {x:p.x,z:p.z,shots:g.state.stats.shots};});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});
 const input=await page.evaluate(()=>window.frogArcade.currentInput());await frames(5);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 const after=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return {x:p.x,z:p.z,shots:g.state.stats.shots,pointers:g.pointers.size};});
 record(Math.hypot(after.x-before.x,after.z-before.z)>.4&&input.aiming&&Math.hypot(input.mx,input.mz)>.5&&after.shots===before.shots&&after.pointers===0,'Browser gesture guards preserve simultaneous move-and-aim joysticks without firing',{before,after,input});
 await unchanged('Dual-joystick gameplay leaves page scroll and zoom unchanged');
 await page.locator('#pause-button').tap();record(await page.evaluate(()=>!window.frogArcade.running&&window.frogArcade.mode==='pause'),'Gesture guards retain the native tap on Pause');
 await page.locator('#settings-button').tap();record(await page.locator('#settings-panel').isVisible(),'Gesture guards retain the native tap on Settings');
 const slider=await page.locator('#volume').boundingBox(),oldVolume=await page.evaluate(()=>window.frogArcade.settings.volume);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:15,x:slider.x+slider.width*.35,y:slider.y+slider.height*.5}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:15,x:slider.x+slider.width*.82,y:slider.y+slider.height*.5}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 const newVolume=await page.evaluate(()=>window.frogArcade.settings.volume);record(newVolume>oldVolume+.2,'Native touch dragging still adjusts the settings volume slider',{before:oldVolume,after:newVolume});
 await page.locator('#settings-back').tap();await page.locator('#play-button').tap();record(await page.evaluate(()=>window.frogArcade.running),'Back and Continue taps still resume gameplay');
 report.gestures={initial,final:await viewport(),selection,contextMenus,shortcuts};
}

try{
 const context=await browser.newContext({viewport:report.viewport,deviceScaleFactor:1,isMobile:true,hasTouch:true});
 await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:.35})));
 page=await context.newPage();page.setDefaultTimeout(120000);page.on('pageerror',e=>report.errors.push(e.stack||e.message));
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(v=>window.__FROG__?.version===v,expected,{timeout:180000});
 await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.__qaSounds=[];const original=g.sound.play;g.sound.play=function(kind){window.__qaSounds.push({kind,time:g.state.time,ammo:g.state.actors[0].ammo});return original.call(this,kind);};});
 report.sourceBundles=await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src));
 await page.locator('#play-button').click();const initial=await page.evaluate(()=>window.frogArcade.state.actors[0].ammo);record(initial===0,'A fresh magazine starts empty',{ammo:initial});
 if(scope==='landscape'){
  report.limitations=['Targeted portrait-to-landscape resize and rendered/HUD snapshot only; no repeated route or audio suite.','Chromium 134 with software WebGL and touch emulation; no physical iPhone/Safari assessment.'];
  await page.evaluate(()=>{window.__FROG__.test.step({},1200);window.frogArcade.elapsed+=20;});report.viewport={width:745,height:430};await page.setViewportSize(report.viewport);await frames(2);await visibility('landscape-header-layout');
 }else{
 // All 60 collection events pass through the production audio event consumer.
 await page.evaluate(()=>{window.__FROG__.test.step({},1200);window.frogArcade.elapsed+=20;});await frames();
 const refill=await page.evaluate(()=>({ammo:window.frogArcade.state.actors[0].ammo,caught:window.frogArcade.state.stats.caught,requests:window.__qaSounds,context:window.frogArcade.sound.ctx?.state}));report.refillAudio=refill;
 record(refill.ammo===60&&refill.caught===60,'Initial automatic refill reaches exactly sixty flies',refill);
 record(refill.requests.length===0,'The initial 0→60 refill requests zero collection clicks or other sounds',{count:refill.requests.length,kinds:[...new Set(refill.requests.map(e=>e.kind))]});
 record(refill.context==='running','Audio context remains active for gameplay sounds',{context:refill.context});
 await visibility('portrait-full-spawn');
 await walk('w',16.25);await visibility('portrait-door-exit');
 await walk('w',14.15);await visibility('portrait-near-catapult');
 record(await page.locator('#catapult-button').isVisible(),'The catapult-use button appears on the natural approach');
 const cdp=await context.newCDPSession(page),beforeOrbit=await page.evaluate(()=>window.frogArcade.cameraYaw);
 await orbit(cdp,185);const afterOrbit=await page.evaluate(()=>window.frogArcade.cameraYaw);record(Math.abs(afterOrbit-beforeOrbit)>.7,'Actual touch drag orbits the camera near the building');await visibility('portrait-catapult-orbit');
 await orbit(cdp,-185);await walk('s',19.6);await visibility('portrait-return-home');

 // A narrow audio fixture: real shot input and real projectile collision.
 await page.evaluate(()=>{const g=window.frogArcade,s=g.state,p=s.actors[0];g.clearInputs();s.phase='battle';s.intro=0;s.bullets.length=0;s.shells.length=0;Object.assign(p,{x:3,z:5,face:Math.PI,aimX:0,aimZ:-1,aiming:false,ammo:60,hop:0,height:0,idle:0,shot:0,kick:0,impulseX:0,impulseZ:0});Object.assign(s.actors[1],{x:3,z:1,dizzyTime:1000,dizzy:6,finishHits:0,invuln:0,hit:0,ko:false,eliminated:false,hop:0,height:0,impulseX:0,impulseZ:0});Object.assign(s.actors[2],{dizzyTime:1000});g.aim={x:0,z:-1};g.cameraReady=false;g.updateHUD();window.__qaSounds=[];});await frames();
 const fire=await page.locator('#fire-button').boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:8,x:fire.x+fire.width/2,y:fire.y+fire.height/2}]});await frames();await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frames(6);
 const combat=await page.evaluate(()=>({sounds:window.__qaSounds,shots:window.frogArcade.state.stats.shots,hits:window.frogArcade.state.stats.hits}));report.combatAudio=combat;
 record(combat.shots>0&&combat.sounds.some(e=>e.kind==='shot'),'A real press of Fire still requests the shooting sound',combat);
 record(combat.hits>0&&combat.sounds.some(e=>e.kind==='hitConfirm'),'A real projectile hit still requests hit confirmation',combat);
 if(mode!=='reproduce')await browserGestures(cdp);
 }
 record(report.errors.length===0,'No uncaught browser exceptions',report.errors);report.ok=report.failures.length===0;if(!report.ok)process.exitCode=1;
 await context.close();
}catch(error){report.ok=false;report.fatal=error.stack||String(error);process.exitCode=1;console.error(error);if(page&&!page.isClosed())try{await page.screenshot({path:`${out}/fatal.png`,timeout:15000});}catch{}}
finally{await save();await browser.close();}
