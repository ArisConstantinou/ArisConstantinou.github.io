import {createRequire} from 'node:module';
import fs from 'node:fs/promises';

// Real browser acceptance for free mouse elevation and stable automatic camera
// following. State fixtures isolate aim; all controls use browser pointer/key input.
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const baseline=process.env.QA_MODE==='baseline',expected=process.env.EXPECTED_VERSION||(baseline?'4.3.3':'4.3.4');
const out=process.env.OUT_DIR||`qa/arcade-434-${baseline?'before':'after'}-evidence`;
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');url.searchParams.set('test','1');
await fs.mkdir(out,{recursive:true});
const report={version:expected,mode:baseline?'baseline':'acceptance',checks:[],failures:[],errors:[],observations:[],samples:[],screenshots:[],bundles:[],stylesheets:[],limitations:[
  'Headless Chromium with software WebGL; touch is emulated rather than tested on physical Safari/iPhone hardware.',
  'State fixtures isolate actors and combat. Aiming, firing, camera dragging, keys and settings are exercised through actual browser input.',
  'GPU drawing is skipped only between evidence frames; captured images use the actual production scene and HUD.',
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok&&detail?' '+JSON.stringify(detail):''}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();let activePage;

async function attach(page){
  await page.waitForFunction(version=>window.__FROG__?.version===version,expected,{timeout:180000});
  await page.evaluate(()=>{
    const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.__qaLabelArcs=[];window.__qaLabelMoves=[];
    const arc=g.labelCtx.arc;g.labelCtx.arc=function(x,y,r,...rest){if(r>=6&&r<=9)window.__qaLabelArcs.push({x,y,r,color:this.strokeStyle,width:this.lineWidth});return arc.call(this,x,y,r,...rest);};
    const move=g.labelCtx.moveTo;g.labelCtx.moveTo=function(x,y){window.__qaLabelMoves.push({x,y,color:this.strokeStyle,width:this.lineWidth});return move.call(this,x,y);};
  });
  for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
  for(const href of await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)))if(!report.stylesheets.includes(href))report.stylesheets.push(href);
}
async function boot(viewport={width:1440,height:900},mobile=false){
  const context=await browser.newContext({viewport,deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
  await context.addInitScript(()=>{if(!localStorage.getItem('frog-arcade-settings-v1'))localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,cameraZoom:1,cameraFov:52}));});
  const page=await context.newPage();activePage=page;page.setDefaultTimeout(120000);page.on('pageerror',e=>report.errors.push(e.stack||e.message));
  await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await attach(page);await page.locator('#play-button').click();
  await page.evaluate(()=>{window.__qaFresh=JSON.parse(JSON.stringify(window.frogArcade.state));});
  return {context,page};
}
async function frames(page,n=1,{trace=false}={}){
  return page.evaluate(({n,trace})=>{
    const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels,samples=[];
    try{for(let i=0;i<n;i++){
      g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};window.__qaLabelArcs=[];window.__qaLabelMoves=[];
      g.frame(g.last+1000/60+.001);
      if(trace){const p=g.state.actors[0];samples.push({time:g.state.time,actor:{x:p.x,z:p.z,height:p.height,face:p.face,aimX:p.aimX,aimY:p.aimY,aimZ:p.aimZ},camera:{yaw:g.cameraYaw,pitch:g.cameraPitch,bearing:Math.atan2(g.focus.x-g.camera.position.x,g.focus.z-g.camera.position.z),position:g.camera.position.toArray()},shots:g.state.stats.shots,events:g.state.events.map(e=>({...e})),bullets:g.state.bullets.filter(b=>b.owner==='player').map(b=>({...b,mesh:g.bulletMeshes.get(b.id)?.position.toArray()}))});}
    }}finally{g.renderer.render=render;g.drawLabels=labels;}
    return samples;
  },{n,trace});
}
async function fixture(page,{x=0,z=5,keepCamera=false}={}){
  await page.evaluate(({x,z,keepCamera})=>{
    const g=window.frogArcade;g.clearInputs();g.clearEffects();g.state=JSON.parse(JSON.stringify(window.__qaFresh));const s=g.state;
    s.phase='battle';s.intro=0;s.time=30;
    Object.assign(s.actors[0],{x,z,ammo:60,load:1,face:Math.PI,aimX:0,aimY:0,aimZ:-1,hop:0,height:0,idle:0,shot:0,hit:0,impulseX:0,impulseZ:0});
    for(const a of s.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});
    g.buildActors();g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');
    g.calloutUntil=-1;g.hitConfirmUntil=0;g.lastPlayerHit=null;
    if(!keepCamera){g.cameraYaw=Math.PI;g.cameraPitch=.44;g.viewMode='chase3d';g.cameraReady=false;}
    g.updateHUD();
  },{x,z,keepCamera});
  await frames(page,2);
}
async function camera(page){return page.evaluate(()=>{const g=window.frogArcade;return {yaw:g.cameraYaw,pitch:g.cameraPitch,bearing:Math.atan2(g.focus.x-g.camera.position.x,g.focus.z-g.camera.position.z),mode:g.viewMode,position:g.camera.position.toArray(),focus:g.focus.toArray(),zoom:g.settings.cameraZoom,fov:g.camera.fov,settings:{...g.settings}};});}
async function capture(page,name){
  await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;
  await page.screenshot({path});report.screenshots.push(path);console.log(`SCREENSHOT ${path}`);await save();
}
async function aimSample(page,name,point,{snapshot=true,keepCamera=false}={}){
  await fixture(page,{keepCamera});const before=await camera(page);
  await page.mouse.move(point.x,point.y);await frames(page,2);
  const aim=await page.evaluate(()=>{
    const g=window.frogArcade,p=g.state.actors[0],target=g.mouse.target,preview=g.currentAimPreview;
    return {pointer:{...g.mouse},input:g.currentInput(),aim:{...g.aim},preview:preview?{...preview}:null,drawnCrosshairs:window.__qaLabelArcs,aimScreen:g.currentAimScreen,pointerLocked:!!document.pointerLockElement,cursor:getComputedStyle(g.renderer.domElement).cursor,pointerElement:document.elementFromPoint(g.mouse.x,g.mouse.y)?.id,actor:{x:p.x,z:p.z,ground:g.ground(p.x,p.z),aimX:p.aimX,aimY:p.aimY,aimZ:p.aimZ},reticle:{visible:g.aimReticle.visible,world:g.aimReticle.position.toArray()},target};
  });
  await page.mouse.down({button:'left'});const shotStart=await frames(page,3,{trace:true});await page.mouse.up({button:'left'});const shotTail=await frames(page,9,{trace:true});
  const after=await camera(page),sample={name,point,before,after,...aim,trajectory:[...shotStart,...shotTail]};report.samples.push(sample);
  const unchanged=Math.abs(after.yaw-before.yaw)<1e-9&&Math.abs(after.pitch-before.pitch)<1e-9&&after.position.every((n,i)=>Math.abs(n-before.position[i])<1e-5);
  record(unchanged,`${name}: mouse aiming and firing leave the camera unchanged`,{before,after});
  record(aim.pointerElement==='arcade-world',`${name}: real mouse input reaches the world canvas`,{element:aim.pointerElement,point});
  record(sample.trajectory.some(frame=>frame.bullets.length||frame.events.some(e=>e.type==='shot')),`${name}: real left click launches a simulated fly`);
  if(!baseline){
    record(!aim.pointerLocked&&aim.drawnCrosshairs.some(q=>Math.hypot(q.x-point.x,q.y-point.y)<.01)&&aim.cursor==='none',`${name}: the visible crosshair follows the free pointer without a second OS arrow`,{point,arcs:aim.drawnCrosshairs,cursor:aim.cursor,pointerLocked:aim.pointerLocked});
    const bullets=sample.trajectory.flatMap(frame=>frame.bullets);
    record(bullets.length>0&&bullets.every(b=>Number.isFinite(b.y)&&Number.isFinite(b.dy)&&Math.abs(Math.hypot(b.dx,b.dy,b.dz)-1)<1e-6),`${name}: shots carry a normalized three-dimensional direction`,bullets.slice(0,2));
    record(bullets.length>0&&bullets.every(b=>b.mesh&&Math.abs(b.mesh[0]-b.x)<1e-6&&Math.abs(b.mesh[1]-b.y)<1e-6&&Math.abs(b.mesh[2]-b.z)<1e-6),`${name}: rendered bullets match the actual collision trajectory from the first frame`,bullets.slice(0,2));
  }
  if(snapshot)await capture(page,`${baseline?'before':'after'}-${name}`);return sample;
}
async function baselineRun(page){
  const samples=[];for(const [name,x,y] of [['high',720,160],['low',720,720],['left',320,430],['right',1120,430]])samples.push(await aimSample(page,name,{x,y}));
  const withoutElevation=samples.every(s=>s.trajectory.flatMap(f=>f.bullets).every(b=>!Object.hasOwn(b,'y')&&!Object.hasOwn(b,'dy')));
  record(withoutElevation,'Reproduced 4.3.3 defect: all pointer positions create bullets without height or elevation');
  const high=samples[0],low=samples[1],directions={high:high.input,low:low.input};
  report.observations.push({name:'2D aim plane',detail:'The old model omits bullet y/dy and input ay. Vertical pointer movement only selects a horizontal point; it cannot create an upward or downward shot.',directions});
  report.observations.push({name:'Crosshair is displaced from pointer',samples:samples.map(s=>({name:s.name,pointer:s.point,crosshairs:s.drawnCrosshairs,preview:s.preview,cursor:s.cursor}))});
}

const angleDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
async function settings(page,{follow,zoom,fov,reset=false}={}){
  await page.locator('#pause-button').click();await page.locator('#settings-button').click();
  if(follow)await page.locator('#camera-follow').selectOption(follow);
  if(zoom){await page.locator('#camera-zoom').focus();await page.keyboard.press(zoom==='min'?'Home':'End');}
  if(fov){await page.locator('#camera-fov').focus();await page.keyboard.press(fov==='min'?'Home':'End');}
  if(reset)await page.locator('#camera-reset').click();
  const result=await camera(page);await page.locator('#settings-back').click();await page.locator('#play-button').click();return result;
}
async function mouseAcceptance(page){
  const samples=[];
  for(const [name,x,y] of [['high',720,160],['low',720,720],['left',320,430],['right',1120,430]])samples.push(await aimSample(page,name,{x,y}));
  record(samples[0].input.ay>.02&&samples[0].trajectory.some(f=>f.bullets.some(b=>b.dy>.02)),'A high pointer launches an upward shot without moving the camera',{input:samples[0].input});
  record(samples[1].input.ay<-.02&&samples[1].trajectory.some(f=>f.bullets.some(b=>b.dy<-.02)),'A low pointer launches a downward shot without moving the camera',{input:samples[1].input});
  record(samples[2].input.ax<-.1&&samples[3].input.ax>.1,'Pointer motion freely changes left/right direction as well as elevation');
}
async function hitFeedback(page){
  await fixture(page);
  const target=await page.evaluate(()=>{
    const g=window.frogArcade,a=g.state.actors[1];Object.assign(a,{x:3,z:0,ko:false,eliminated:false,respawnTime:0,dizzy:0,dizzyTime:8,finishHits:0,invuln:0,hit:0,hop:0,height:0,impulseX:0,impulseZ:0});
    return {...g.project(a.x,g.ground(a.x,a.z)+a.height+.45,a.z),id:a.id};
  });
  await frames(page,1);await page.mouse.move(target.x,target.y);await frames(page,2);
  const before=await page.evaluate(()=>{const g=window.frogArcade;return {preview:g.currentAimPreview,screen:g.currentAimScreen,arcs:window.__qaLabelArcs,hits:g.state.stats.hits};});
  record(before.preview?.targetId===target.id&&before.arcs.some(a=>a.color==='#ffc5a0'),'Aiming directly at a real frog gives visible target feedback at the cursor',before);
  await page.mouse.down({button:'left'});const trail=await frames(page,13,{trace:true});await page.mouse.up({button:'left'});
  const after=await page.evaluate(()=>{const g=window.frogArcade;return {hits:g.state.stats.hits,last:g.lastPlayerHit,confirmed:g.hitConfirmUntil>g.elapsed,screen:g.currentAimScreen,arcs:window.__qaLabelArcs,hitMarks:window.__qaLabelMoves.filter(p=>p.color==='#143d35'&&p.width===6),viewport:{w:g.w,h:g.h}};});
  report.samples.push({name:'real-target-hit',target,before,after,trail});
  record(after.hits>before.hits&&after.last?.id===target.id&&after.confirmed,'Actual mouse fire hits the chosen frog and starts hit confirmation',after);
  record(after.hitMarks.length>=4&&after.hitMarks.every(p=>p.x>0&&p.y>0&&p.x<after.viewport.w&&p.y<after.viewport.h),'The actual hit-confirm X is visible at the world target',after.hitMarks);
  record(after.arcs.some(q=>Math.hypot(q.x-target.x,q.y-target.y)<.01),'Hit feedback leaves the mouse crosshair at the free cursor position');
  await capture(page,'desktop-real-hit-feedback');
}
async function autoCamera(page){
  record((await camera(page)).settings.cameraAutoRotate===true,'Automatic camera rotation is enabled by default');
  for(const [key,n,name,axis,expectedHeading] of [['d',92,'rightward', 'x',Math.PI/2],['s',135,'backward','z',0]]){
    await fixture(page,{x:0,z:0});const before=await camera(page);await page.keyboard.down(key);const trail=await frames(page,n,{trace:true});await page.keyboard.up(key);await frames(page,1);
    const end=trail.at(-1),distance=axis==='x'?end.actor.x:end.actor.z,drift=Math.max(...trail.map(t=>Math.abs(axis==='x'?t.actor.z:t.actor.x)));
    const turns=trail.slice(1).map((frame,i)=>Math.abs(angleDelta(frame.camera.yaw,trail[i].camera.yaw)));
    report.samples.push({name:`automatic-${name}`,before,trail});
    record(distance>6&&drift<.05,`Held ${key.toUpperCase()} remains a straight world route while the camera turns`,{end:end.actor,distance,drift});
    record(Math.abs(angleDelta(end.camera.yaw,before.yaw))>.8&&Math.abs(angleDelta(end.camera.yaw,expectedHeading))<.4,`Camera automatically follows ${name} travel`,{before:before.yaw,after:end.camera.yaw,expectedHeading});
    record(turns.every(turn=>turn<=.031),`Automatic ${name} rotation is smooth and does not snap`,{maxTurn:Math.max(...turns)});
  }
  await fixture(page,{x:-3,z:5});await page.keyboard.down('d');const first=await frames(page,42,{trace:true});
  const atSwitch=await camera(page);await page.keyboard.down('w');await page.keyboard.up('d');
  const input=await page.evaluate(()=>window.frogArcade.currentInput()),switched=await frames(page,42,{trace:true});await page.keyboard.up('w');
  const from=switched[20].actor,to=switched.at(-1).actor,dx=to.x-from.x,dz=to.z-from.z,length=Math.hypot(dx,dz),alignment=(dx*input.mx+dz*input.mz)/(length*Math.hypot(input.mx,input.mz));
  const cameraAlignment=input.mx*Math.sin(atSwitch.bearing)+input.mz*Math.cos(atSwitch.bearing);
  report.samples.push({name:'change-D-to-W-without-neutral-frame',atSwitch,input,first,switched});
  record(cameraAlignment>.99&&alignment>.98,'Switching D to W without a neutral frame uses the current camera direction and stays straight',{atSwitch,input,cameraAlignment,alignment});

  await fixture(page,{x:-3,z:5});await page.keyboard.down('d');await frames(page,30);const turning=await camera(page);
  await page.mouse.move(720,270);await page.mouse.down({button:'left'});const firing=await frames(page,45,{trace:true});await page.mouse.up({button:'left'});await page.keyboard.up('d');
  record(firing.every(t=>Math.abs(angleDelta(t.camera.yaw,turning.yaw))<1e-7&&Math.abs(angleDelta(t.camera.bearing,turning.bearing))<1e-7),'Beginning mouse fire freezes both automatic yaw and the actual rendered camera bearing immediately',{turning,end:firing.at(-1).camera});
  record(firing.at(-1).shots>=5,'Holding left mouse repeats fire without additional clicks',{shots:firing.at(-1).shots});
  const shotCount=firing.at(-1).shots;await frames(page,14);record(await page.evaluate(shots=>window.frogArcade.state.stats.shots===shots,shotCount),'Releasing left mouse stops repeated fire');
  report.samples.push({name:'turn-then-held-fire',turning,firing});await capture(page,'desktop-turn-then-fire');

  await fixture(page);const old=await camera(page);await page.mouse.move(720,450);await page.mouse.down({button:'right'});await page.mouse.move(830,485,{steps:6});await page.mouse.up({button:'right'});await frames(page,2);const dragged=await camera(page);
  record(Math.abs(angleDelta(dragged.yaw,old.yaw))>.3&&dragged.pitch>old.pitch+.1,'Deliberate right-drag camera orbit still works with automatic following enabled',{old,dragged});
}
async function cameraSettings(page){
  const manual=await settings(page,{follow:'manual',reset:true});
  record(manual.settings.cameraAutoRotate===false&&manual.zoom===1&&manual.fov===52,'Camera Reset preserves the selected manual rotation mode',manual);
  await fixture(page,{x:0,z:0});const before=await camera(page);await page.keyboard.down('d');const trail=await frames(page,75,{trace:true});await page.keyboard.up('d');
  record(trail.at(-1).actor.x>5&&trail.every(t=>Math.abs(angleDelta(t.camera.yaw,before.yaw))<1e-9),'Manual camera mode preserves independent mouse/keyboard movement without automatic turning');
  await page.reload({waitUntil:'networkidle',timeout:180000});await attach(page);
  record((await camera(page)).settings.cameraAutoRotate===false,'The manual camera choice persists after a real browser reload');
  await page.locator('#play-button').click();await page.evaluate(()=>{window.__qaFresh=JSON.parse(JSON.stringify(window.frogArcade.state));});
  await settings(page,{follow:'auto'});
  for(const [zoom,fov] of [['min','min'],['min','max'],['max','min'],['max','max']]){
    const changed=await settings(page,{zoom,fov});
    record(changed.zoom===(zoom==='min'?.7:1.5)&&changed.fov===(fov==='min'?40:80),`Native settings apply ${zoom} zoom and ${fov} FOV`,changed);
    const sample=await aimSample(page,`zoom-${zoom}-fov-${fov}`,{x:590,y:310},{snapshot:zoom===fov});
    record(Number.isFinite(sample.input.ay)&&Math.abs(Math.hypot(sample.input.ax,sample.input.ay,sample.input.az)-1)<1e-6,`Free 3D aim remains finite at ${zoom} zoom / ${fov} FOV`,sample.input);
  }
  await settings(page,{reset:true});
}
async function overview(page){
  await fixture(page);await page.keyboard.press('c');await frames(page,2);
  record((await camera(page)).mode==='overview','The actual C key still switches to overview');
  await aimSample(page,'overview-cursor',{x:720,y:400},{keepCamera:true});
  await page.keyboard.press('c');await frames(page,2);record((await camera(page)).mode==='chase3d','The actual C key restores the rear camera');
}
async function touchAcceptance(context,page){
  const cdp=await context.newCDPSession(page),points=[];
  await fixture(page,{x:0,z:0});
  const moveBox=await page.locator('#move-stick').boundingBox(),thumb={id:11,x:moveBox.x+moveBox.width*.85,y:moveBox.y+moveBox.height*.5},followBefore=await camera(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[thumb]});const held=await frames(page,48,{trace:true});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...thumb,y:moveBox.y+moveBox.height*.56}]});
  const adjustedInput=await page.evaluate(()=>window.frogArcade.currentInput()),adjusted=await frames(page,44,{trace:true});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frames(page,1);
  const followEnd=adjusted.at(-1);report.samples.push({name:'touch-automatic-follow-with-thumb-adjustment',before:followBefore,held,adjustedInput,adjusted});
  record(followEnd.actor.x>6&&Math.abs(followEnd.actor.z)<1.2&&Math.abs(angleDelta(followEnd.camera.yaw,followBefore.yaw))>.8,'Held touch movement stays on its world route while the camera follows automatically',{end:followEnd.actor,yaw:followEnd.camera.yaw});
  record(Math.abs(adjustedInput.mx-.7)<.02&&Math.abs(adjustedInput.mz-.12)<.02,'A continuous thumb adjustment keeps its original movement basis after the camera has turned',adjustedInput);
  await fixture(page,{x:0,z:0});
  for(const [selector,id,xFraction,yFraction] of [['#move-stick',1,.85,.5],['#aim-stick',2,.5,.12],['#fire-button',3,.5,.5]]){const r=await page.locator(selector).boundingBox();points.push({id,x:r.x+r.width*xFraction,y:r.y+r.height*yFraction});}
  const before=await camera(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});const input=await page.evaluate(()=>window.frogArcade.currentInput());const trail=await frames(page,30,{trace:true});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frames(page,1);
  const released=await page.evaluate(()=>({pointers:window.frogArcade.pointers.size,fire:window.frogArcade.actions.fire,mouse:window.frogArcade.mouse.valid,cursorClass:window.frogArcade.renderer.domElement.classList.contains('mouse-aiming')}));
  record(input.aiming&&input.fire&&Math.hypot(input.mx,input.mz)>.5&&!Number.isFinite(input.ay),'Simultaneous touch move, aim and fire retain their surface-following control scheme',input);
  record(trail.at(-1).shots>=3&&Math.hypot(trail.at(-1).actor.x,trail.at(-1).actor.z)>.5,'Holding touch fire repeats shots while the movement stick remains active',trail.at(-1));
  record(trail.every(t=>Math.abs(angleDelta(t.camera.yaw,before.yaw))<1e-8),'Touch aiming/fire pauses automatic camera rotation');
  record(released.pointers===0&&!released.fire&&!released.mouse&&!released.cursorClass,'Releasing touches clears fire and does not leave a desktop pointer active',released);
  await capture(page,'portrait-touch-move-aim-fire');
  await fixture(page);const dragBefore=await camera(page),finger={id:7,x:190,y:330};
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...finger,x:245,y:365}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frames(page,2);
  const dragAfter=await camera(page);record(Math.abs(angleDelta(dragAfter.yaw,dragBefore.yaw))>.2,'Touch dragging the world still provides deliberate camera orbit',{dragBefore,dragAfter});
  await page.locator('#pause-button').tap();await page.locator('#settings-button').tap();await page.locator('#camera-follow').selectOption('manual');
  const selected=await page.evaluate(()=>({value:document.getElementById('camera-follow').value,setting:window.frogArcade.settings.cameraAutoRotate}));record(selected.value==='manual'&&selected.setting===false,'The automatic/manual camera selector remains usable on touch',selected);
  await page.locator('#settings-back').tap();await page.locator('#play-button').tap();
  await page.setViewportSize({width:745,height:430});
  await page.waitForFunction(()=>window.frogArcade.w===745&&window.frogArcade.h===430);
  await frames(page,2);await capture(page,'landscape-touch-camera');
  const fit=await page.evaluate(()=>['move-stick','aim-stick','fire-button','pause-button','view-button'].map(id=>{const r=document.getElementById(id).getBoundingClientRect();return {id,x:r.x,y:r.y,right:r.right,bottom:r.bottom,w:r.width,h:r.height,inside:r.x>=0&&r.y>=0&&r.right<=innerWidth+.5&&r.bottom<=innerHeight+.5};}));record(fit.every(r=>r.inside),'Landscape touch controls remain inside the viewport',fit);
  await page.locator('#view-button').tap();await frames(page,2);record((await camera(page)).mode==='overview','Touch view toggle still opens overview');
}

try{
  const desktop=await boot();
  if(baseline)await baselineRun(desktop.page);
  else{await mouseAcceptance(desktop.page);await hitFeedback(desktop.page);await autoCamera(desktop.page);await cameraSettings(desktop.page);await overview(desktop.page);}
  await desktop.context.close();
  if(!baseline){const phone=await boot({width:430,height:745},true);await touchAcceptance(phone.context,phone.page);await phone.context.close();}
  record(report.errors.length===0,'No uncaught browser exceptions',report.errors);report.ok=report.failures.length===0;if(!report.ok)process.exitCode=1;
}catch(error){report.ok=false;report.fatal=error.stack||String(error);process.exitCode=1;console.error(error);if(activePage&&!activePage.isClosed())try{await activePage.screenshot({path:`${out}/fatal.png`,timeout:15000});}catch{}}
finally{await save();await browser.close();}
