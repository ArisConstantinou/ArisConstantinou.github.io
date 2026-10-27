import {createRequire} from 'node:module';
import fs from 'node:fs/promises';

// Integrated fire joystick, free layout and continuous camera acceptance: production input handlers, real emulated touch
// contacts and the production simulation. Actor fixtures provide stationary
// targets but never force fire, replace the resolver or override shot physics.
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const expected=process.env.EXPECTED_VERSION||'4.3.9';
const out=process.env.OUT_DIR||'qa/arcade-439-evidence';
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');url.searchParams.set('test','1');
const selected=new Set((process.env.CASES||'portrait,landscape,desktop,settings_scroll').split(','));
await fs.mkdir(out,{recursive:true});
const report={version:expected,checks:[],failures:[],errors:[],screenshots:[],samples:[],bundles:[],stylesheets:[],limitations:[
 'Full Chromium with software WebGL; mobile screen sizes and touch are emulated, not a physical iPhone/Safari test.',
 'Browser CDP touch contacts exercise the production pointer handlers, including simultaneous movement and aim with exactly two fingers.',
 'Actor-state fixtures isolate enemies and cover. Enemy idle/cooldown fields hold test targets still; auto-fire selection, projectile physics and damage remain production code.',
 'The production animation loop is stepped deterministically. Visual captures render the production scene and interface.',
 'Blur is explicitly dispatched to exercise lifecycle cleanup; it is not a physical app-backgrounding test.',
 'An unrelated canvas pointer-cancel and mouse-up are explicitly dispatched during a real held touch to isolate ownership cleanup; those two lifecycle probes are synthetic events.'
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok&&detail?' '+JSON.stringify(detail):''}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{channel:'chromium'}),args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();let activePage;
const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));

async function attach(page){
 await page.waitForFunction(v=>window.__FROG__?.version===v,expected,{timeout:180000});
 await page.evaluate(()=>{
  const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.__qaFresh=JSON.parse(JSON.stringify(g.state));window.__qaEvents=[];window.__qaLastInput={};const readInput=g.currentInput.bind(g);g.currentInput=()=>{const input=readInput();window.__qaLastInput={...input};return input;};
  for(const type of ['pointerdown','pointermove','pointerup','pointercancel'])document.addEventListener(type,e=>window.__qaEvents.push({type,id:e.pointerId,pointerType:e.pointerType,target:e.target.id,control:e.target.closest?.('#fire-button,#aim-stick,#move-stick,#arcade-world')?.id,trusted:e.isTrusted}));
 });
 for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
 for(const href of await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)))if(!report.stylesheets.includes(href))report.stylesheets.push(href);
}
async function boot({mobile=true,width=390,height=844}={}){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(()=>{if(!localStorage.getItem('frog-arcade-settings-v1'))localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,cameraZoom:1,cameraFov:52,cameraSensitivity:1}));});
 const page=await context.newPage();activePage=page;page.setDefaultTimeout(30000);page.on('pageerror',e=>report.errors.push(e.stack||e.message));
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await attach(page);
 return {context,page,cdp:await context.newCDPSession(page)};
}
async function frames(page,n=1){await page.evaluate(n=>{const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels;try{for(let i=0;i<n;i++){g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;g.drawLabels=labels;}},n);}
async function capture(page,name){await frames(page);await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);await save();}
async function snap(page){return page.evaluate(()=>{
 const g=window.frogArcade,s=g.state,p=s.actors[0];const input=window.__qaLastInput||{};
 return {running:g.running,mode:g.mode,view:g.viewMode,fireMode:g.settings.touchFireMode,touch:g.touch,mouseControl:g.mouseControl,mouseValid:g.mouse.valid,menuHidden:g.$('arcade-menu').hidden,layoutEditing:g.layoutEditing,phase:s.phase,intro:s.intro,time:s.time,shots:s.stats.shots,hits:s.stats.hits,ammo:p.ammo,x:p.x,z:p.z,height:p.height,yaw:g.cameraYaw,pitch:g.cameraPitch,drag:g.cameraDrag?{...g.cameraDrag}:null,move:{...g.move},pointers:[...g.pointers.keys()],manualFire:g.actions.fire,input,autoFireTargetId:g.autoFireTargetId??null,preview:g.currentAimPreview?{kind:g.currentAimPreview.kind,targetId:g.currentAimPreview.targetId,blocked:g.currentAimPreview.blocked}:null,mounted:p.catapultId,shells:s.shells.length,catapultShots:p.catapultShots,sabotage:s.bases.filter(b=>b.attackerId===p.id).map(b=>({id:b.id,progress:b.progress})),bullets:s.bullets.filter(b=>b.owner===p.id).map(b=>({dx:b.dx,dy:b.dy,dz:b.dz,x:b.x,y:b.y,z:b.z}))};
 });}
async function fixture(page,{player={x:0,z:6},target={x:0,z:-2},phase='battle',pitch=null}={}){
 await page.evaluate(({player,target,phase,pitch})=>{
  const g=window.frogArcade;g.clearInputs();g.clearEffects();g.state=JSON.parse(JSON.stringify(window.__qaFresh));const s=g.state,p=s.actors[0];
  s.phase=phase;s.intro=phase==='battle'?0:20;s.time=30;s.stats={caught:0,shots:0,hits:0,kos:0,basesDestroyed:0};
  Object.assign(p,{...player,ammo:60,load:1,hop:0,height:player.height||0,idle:0,shot:0,hit:0,invuln:0,dizzyTime:0,impulseX:0,impulseZ:0});
  for(const a of s.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});
  if(target)Object.assign(s.actors[1],{...target,ko:false,eliminated:false,ammo:60,load:1,shot:9999,idle:9999,kickCooldown:9999,aiShotReady:9999,machineTimer:9999,hit:0,invuln:0,height:target.height||0,hop:0,impulseX:0,impulseZ:0});
  const aim=target||{x:p.x,z:p.z-8},dx=aim.x-p.x,dz=aim.z-p.z,d=Math.hypot(dx,dz);
  g.cameraYaw=Math.atan2(dx,dz);g.cameraPitch=pitch??Math.max(-.65,Math.min(1.15,Math.atan2(g.ground(p.x,p.z)+1.2-(g.ground(aim.x,aim.z)+(aim.height||0)+.5),Math.max(.1,d-.9))));
  p.face=g.cameraYaw;p.aimX=Math.sin(g.cameraYaw);p.aimY=0;p.aimZ=Math.cos(g.cameraYaw);g.aim={x:p.aimX,z:p.aimZ};
  g.viewMode='chase3d';g.cameraReady=false;g.shake=0;g.buildActors();g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');g.calloutUntil=-1;g.hitConfirmUntil=0;g.lastPlayerHit=null;g.accumulator=0;
  g.updateCameraPose(0);g.updateHUD();window.__qaEvents=[];window.__qaLastInput={};
 },{player,target,phase,pitch});
 await frames(page,1);
}
async function bounds(page,selector){return page.locator(selector).boundingBox();}
async function resizeViewport(page,size){await page.setViewportSize(size);await page.waitForFunction(({width,height})=>innerWidth===width&&innerHeight===height&&window.frogArcade.w===width&&window.frogArcade.h===height,size);await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await frames(page,1);}
async function touch(cdp,type,points){await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(p=>({...p,radiusX:5,radiusY:5,force:1}))});}
async function lookPoint(page,id=2){const size=page.viewportSize();let result={id,x:Math.round(size.width*.79),y:Math.round(size.height*.48)};const probe=await page.evaluate(({x,y})=>document.elementFromPoint(x,y)?.id,result);record(probe==='arcade-world','The right thumb can start aiming directly on unobstructed gameplay',{point:result,element:probe});return result;}
async function movePoint(page,id=1){const r=await bounds(page,'#move-stick');return {id,x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height*.23)};}
async function start(page,mobile=true){await page.locator('#new-round-button')[mobile?'tap':'click']();if(!mobile)await page.waitForFunction(()=>!!document.pointerLockElement);}
async function menuCheck(page,label){
 const detail=await page.evaluate(()=>{const a=document.querySelector('#new-round-button'),b=document.querySelector('#play-button'),ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();return {sameGroup:a.parentElement===b.parentElement,a:{x:ra.x,y:ra.y,w:ra.width,h:ra.height},b:{x:rb.x,y:rb.y,w:rb.width,h:rb.height},fontA:getComputedStyle(a.querySelector('span')).fontSize,fontB:getComputedStyle(b.querySelector('span')).fontSize};});
 record(detail.sameGroup&&Math.abs(detail.a.w-detail.b.w)<1&&detail.a.h>=80&&detail.fontA===detail.fontB,`${label}: New and Resume retain equal large button halves`,detail);
}

async function aimPoint(page,id=2,{x=.9,y=.5}={}){const r=await bounds(page,'#aim-stick');return {id,x:Math.round(r.x+r.width*x),y:Math.round(r.y+r.height*y)};}
async function firePoint(page,id=2){const r=await bounds(page,'#fire-button');return {id,x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};}
async function openSettings(page){
 if(await page.evaluate(()=>window.frogArcade.running))await page.locator('#pause-button').tap();
 await page.locator('#settings-button').tap();
}
async function setMode(page,value,{captureName}={}){
 await openSettings(page);await page.locator('#touch-fire-mode').selectOption(value);
 const detail=await page.evaluate(()=>{const g=window.frogArcade;return {value:g.$('touch-fire-mode').value,mode:g.settings.touchFireMode,saved:JSON.parse(localStorage.getItem('frog-arcade-settings-v1')),help:g.$('touch-fire-mode-help')?.textContent,fire:g.actions.fire,aim:g.pointers.has('aim'),drag:!!g.cameraDrag};});
 record(detail.value===value&&detail.mode===value&&detail.saved.touchFireMode===value&&!detail.fire&&!detail.aim&&!detail.drag,`Settings select ${value} fire, persist it and clear held inputs`,detail);
 if(captureName)await capture(page,captureName);
 await page.locator('#settings-back').tap();await page.locator('#play-button').tap();await frames(page,1);
}
async function normalLayout(page,label){
 const detail=await page.evaluate(()=>{const g=window.frogArcade,ids=['move-stick','aim-stick','fire-button','layout-button'],controls=Object.fromEntries(ids.map(id=>{const el=g.$(id),r=el.getBoundingClientRect(),style=getComputedStyle(el);return [id,{visible:!el.hidden&&!el.closest('[hidden]')&&style.display!=='none'&&style.visibility!=='hidden'&&!!r.width&&!!r.height,x:r.x,y:r.y,w:r.width,h:r.height,text:el.textContent.trim()}];}));return {controls,w:innerWidth,h:innerHeight,mode:g.settings.touchFireMode,nested:g.$('aim-stick').contains(g.$('fire-button'))};});
 const c=detail.controls,all=Object.values(c),overlap=(a,b)=>a.x<b.x+b.w-1&&a.x+a.w>b.x+1&&a.y<b.y+b.h-1&&a.y+a.h>b.y+1;
 record(all.every(r=>r.visible&&r.w>=44&&r.h>=44&&r.x>=0&&r.y>=0&&r.x+r.w<=detail.w+1&&r.y+r.h<=detail.h+1),`${label}: both joysticks, center fire and layout controls are visible and reachable`,detail);
 const separate=[c['move-stick'],c['aim-stick'],c['layout-button']];record(separate.every((r,i)=>separate.slice(i+1).every(other=>!overlap(r,other))),`${label}: independent controls do not overlap`,detail);
 const aim=c['aim-stick'],fire=c['fire-button'];record(detail.nested&&Math.abs(fire.x+fire.w/2-aim.x-aim.w/2)<1&&Math.abs(fire.y+fire.h/2-aim.y-aim.h/2)<1&&fire.w>=52&&fire.h>=52,`${label}: FIRE is inside the center of the right joystick with a usable touch target`,detail);
 record(fire.text==='ΠΥΡ',`${label}: the integrated center retains explicit manual practice fire in ${detail.mode} mode`,detail);
}

async function manualAim(page,cdp,label){
 await fixture(page);const aim=await aimPoint(page);await touch(cdp,'touchStart',[aim]);await frames(page,18);const aimed=await snap(page);
 record(aimed.fireMode==='manual'&&aimed.shots===0&&!aimed.input.fire&&!aimed.autoFireTargetId&&aimed.pointers.includes('aim'),`${label}: manual mode never fires merely because the right joystick aims at an enemy`,aimed);
 await touch(cdp,'touchEnd',[]);
 await fixture(page,{target:null});const move=await movePoint(page),look=await aimPoint(page,2,{x:.68,y:.27}),before=await snap(page);await touch(cdp,'touchStart',[move,look]);await frames(page,8);const both=await snap(page);
 record(both.pointers.includes('move')&&both.pointers.includes('aim')&&Math.hypot(both.x-before.x,both.z-before.z)>.2&&Math.abs(angle(both.yaw,before.yaw))>.03&&Math.abs(both.pitch-before.pitch)>.03&&both.shots===0,`${label}: exactly two thumbs move and turn both axes with the restored right joystick`,{before,both});
 await touch(cdp,'touchEnd',[look]);const released=await snap(page);await frames(page,8);const moving=await snap(page);
 record(!moving.pointers.includes('aim')&&moving.pointers.includes('move')&&Math.hypot(moving.x-released.x,moving.z-released.z)>.15&&Math.abs(angle(moving.yaw,released.yaw))<1e-9&&Math.abs(moving.pitch-released.pitch)<1e-9,`${label}: releasing the joystick stops rotation while the movement thumb continues`,{released,moving});
 await touch(cdp,'touchEnd',[]);
 const events=await page.evaluate(()=>window.__qaEvents);record(events.some(e=>e.control==='aim-stick'&&e.pointerType==='touch'&&e.trusted)&&events.some(e=>e.control==='move-stick'&&e.pointerType==='touch'&&e.trusted),`${label}: the dual joystick check uses trusted browser touch events`,events);
}
async function manualPractice(page,cdp,label){
 for(const phase of ['countdown','battle']){
  await fixture(page,{target:null,phase});const fire=await firePoint(page);await touch(cdp,'touchStart',[fire]);await frames(page,16);const held=await snap(page);
  record(held.shots>=2&&held.manualFire,`${label}: explicit fire practices shots into empty space during ${phase}`,held);
  await touch(cdp,'touchEnd',[]);const released=await snap(page);await frames(page,12);const stopped=await snap(page);record(stopped.shots===released.shots&&!stopped.manualFire&&!stopped.input.fire,`${label}: releasing practice fire stops subsequent shots during ${phase}`,{released,stopped});
 }
 await fixture(page,{target:null,phase:'countdown'});const fire=await firePoint(page);await touch(cdp,'touchStart',[fire]);await touch(cdp,'touchEnd',[]);await frames(page,1);const tapped=await snap(page);await frames(page,12);const later=await snap(page);
 record(tapped.shots===1&&later.shots===1&&!later.manualFire,`${label}: a quick fire tap between ticks launches exactly one practice shot`,{tapped,later});
 await fixture(page,{target:null});const move=await movePoint(page),heldFire=await firePoint(page),before=await snap(page);await touch(cdp,'touchStart',[move,heldFire]);await frames(page,1);await touch(cdp,'touchMove',[move,{...heldFire,x:heldFire.x+15,y:heldFire.y-17}]);await frames(page,8);const active=await snap(page);
 record(active.shots>=1&&active.manualFire&&Math.hypot(active.x-before.x,active.z-before.z)>.15&&Math.abs(angle(active.yaw,before.yaw))>.03&&Math.abs(active.pitch-before.pitch)>.03,`${label}: movement plus dragging held fire still offers a two-thumb manual aim-and-shoot option`,{before,active});await touch(cdp,'touchEnd',[]);
 await capture(page,`${label}-manual-practice`);
}
async function autoStick(page,cdp,label){
 await fixture(page);await frames(page,12);const idle=await snap(page);record(idle.shots===0&&!idle.input.fire,`${label}: auto mode waits for deliberate aiming contact`,idle);
 const aim=await aimPoint(page);await touch(cdp,'touchStart',[aim]);await frames(page,1);const first=await snap(page);record(first.shots===1&&first.autoFireTargetId==='rival-1'&&!first.manualFire&&first.pointers.includes('aim'),`${label}: outer-ring aiming can automatically fire at an aligned opponent`,first);
 await touch(cdp,'touchEnd',[]);const released=await snap(page);await frames(page,16);const stopped=await snap(page);record(stopped.shots===released.shots&&!stopped.input.fire&&!stopped.pointers.includes('aim'),`${label}: releasing the outer ring stops automatic shots`,{released,stopped});record(stopped.hits>0,`${label}: joystick auto-fire produces physical projectiles and real damage`,stopped);
 await fixture(page);const move=await movePoint(page),ring=await aimPoint(page),before=await snap(page);await touch(cdp,'touchStart',[move,ring]);await frames(page,1);const both=await snap(page);record(both.shots>=1&&Math.hypot(both.x-before.x,both.z-before.z)>.001&&Math.abs(angle(both.yaw,before.yaw))>.008&&both.pointers.includes('aim')&&both.pointers.includes('move')&&!both.manualFire,`${label}: exactly two thumbs move, steer the outer ring and automatically fire`,{before,both});
 await touch(cdp,'touchEnd',[ring]);const releaseAim=await snap(page);await frames(page,10);const continueMove=await snap(page);record(continueMove.shots===releaseAim.shots&&Math.hypot(continueMove.x-releaseAim.x,continueMove.z-releaseAim.z)>.15&&!continueMove.pointers.includes('aim')&&continueMove.pointers.includes('move'),`${label}: auto aim can release independently while movement continues`,{releaseAim,continueMove});await touch(cdp,'touchEnd',[]);
 await fixture(page);const world=await lookPoint(page);await touch(cdp,'touchStart',[world]);await frames(page,1);const worldAim=await snap(page);record(worldAim.shots===1&&!!worldAim.drag&&!worldAim.manualFire,`${label}: optional world-drag aiming still triggers auto-fire`,worldAim);await frames(page,12);const stationary=await snap(page);record(stationary.shots>=2&&Math.abs(angle(stationary.yaw,worldAim.yaw))<1e-9,`${label}: a stationary interior aim contact shoots without unwanted camera rotation`,stationary);await touch(cdp,'touchCancel',[]);await frames(page,12);const canceled=await snap(page);record(!canceled.drag&&!canceled.input.fire&&canceled.shots===stationary.shots,`${label}: canceling world aim clears automatic fire`,canceled);
}

async function autoGuards(page,cdp,label){
 const cases=[
  {name:'house wall',options:{player:{x:2.2,z:20.5},target:{x:2.2,z:15}}},
  {name:'empty space',options:{target:null}},
  {name:'preparation countdown',options:{phase:'countdown'}},
  {name:'empty magazine',options:{},setup:()=>{const s=window.frogArcade.state;s.actors[0].ammo=0;s.flies.forEach(f=>f.wait=9999);}},
  {name:'invulnerable opponent',options:{},setup:()=>{window.frogArcade.state.actors[1].invuln=3;}},
 ];
 for(const test of cases){await fixture(page,test.options);if(test.setup)await page.evaluate(test.setup);const aim=await lookPoint(page);await touch(cdp,'touchStart',[aim]);await frames(page,12);const s=await snap(page);record(s.shots===0&&!s.input.fire,`${label}: joystick auto-fire respects ${test.name}`,s);await touch(cdp,'touchEnd',[]);}
 await fixture(page,{player:{x:-17.8,z:-.5},target:{x:-19.5,z:2.3}});const aim=await lookPoint(page);await touch(cdp,'touchStart',[aim]);await frames(page,1);const ready=await snap(page),sabotage=await bounds(page,'#sabotage-button');record(ready.shots===1&&!!sabotage,`${label}: storage fixture offers a valid automatic target and sabotage action`,{ready,sabotage});
 if(sabotage){const hold={id:3,x:Math.round(sabotage.x+sabotage.width/2),y:Math.round(sabotage.y+sabotage.height/2)};await touch(cdp,'touchStart',[aim,hold]);await frames(page,16);const held=await snap(page);record(held.shots===ready.shots&&!held.input.fire&&held.input.sabotage&&held.sabotage.some(b=>b.progress>0),`${label}: held sabotage takes priority over joystick auto-fire`,held);await touch(cdp,'touchEnd',[]);}
 await fixture(page,{target:{x:0,z:3}});const closeAim=await lookPoint(page);await touch(cdp,'touchStart',[closeAim]);const kick=await bounds(page,'#kick-button');if(kick){const point={id:3,x:Math.round(kick.x+kick.width/2),y:Math.round(kick.y+kick.height/2)};await touch(cdp,'touchStart',[closeAim,point]);await touch(cdp,'touchEnd',[point]);await frames(page,1);const kicked=await snap(page);record(kicked.input.kick&&!kicked.input.fire&&kicked.shots===0,`${label}: a buffered kick tap still suppresses automatic fire before the simulation consumes it`,kicked);}else record(false,`${label}: close target exposes kick for buffered-action regression`);await touch(cdp,'touchEnd',[]);
}
async function hybridJoystick(page,label){
 await fixture(page);const point=await aimPoint(page);await page.mouse.move(point.x,point.y);await page.mouse.down();await frames(page,12);const state=await snap(page),pointerType=await page.evaluate(()=>window.frogArcade.pointerTypes.get('aim'));
 record(pointerType==='mouse'&&state.pointers.includes('aim')&&state.shots===0&&!state.input.fire&&!state.autoFireTargetId,`${label}: a mouse on the joystick of a touch-capable browser does not silently enable auto-fire`,{pointerType,state});await page.mouse.up();
}
async function lifecycle(page,cdp,label){
 await fixture(page);let aim=await aimPoint(page);await touch(cdp,'touchStart',[aim]);await frames(page,1);
 const pause=await bounds(page,'#pause-button'),pausePoint={id:3,x:Math.round(pause.x+pause.width/2),y:Math.round(pause.y+pause.height/2)};await touch(cdp,'touchStart',[aim,pausePoint]);await touch(cdp,'touchEnd',[pausePoint]);let stopped=await snap(page);
 record(!stopped.running&&stopped.mode==='pause'&&!stopped.pointers.includes('aim')&&!stopped.drag&&!stopped.manualFire,`${label}: a second-finger Pause works while the right joystick is held`,stopped);await touch(cdp,'touchEnd',[]);await menuCheck(page,`${label} paused`);
 const beforeResume={shots:stopped.shots,ammo:stopped.ammo,time:stopped.time};await page.locator('#play-button').tap();let resumed=await snap(page);record(resumed.running&&resumed.menuHidden&&resumed.shots===beforeResume.shots&&resumed.ammo===beforeResume.ammo&&resumed.time===beforeResume.time,`${label}: Resume preserves progress after joystick auto-fire`,resumed);await frames(page,12);resumed=await snap(page);record(resumed.shots===beforeResume.shots&&!resumed.input.fire,`${label}: Resume requires fresh aim input before auto-fire restarts`,resumed);
 await fixture(page);aim=await aimPoint(page);await touch(cdp,'touchStart',[aim]);await frames(page,1);await touch(cdp,'touchCancel',[]);const cancel=await snap(page);await frames(page,12);const canceled=await snap(page);record(!canceled.pointers.includes('aim')&&!canceled.input.fire&&canceled.shots===cancel.shots,`${label}: browser cancellation clears the restored joystick`,canceled);
 await fixture(page);aim=await aimPoint(page);await touch(cdp,'touchStart',[aim]);await touch(cdp,'touchMove',[{...aim,x:aim.x+1}]);await page.evaluate(()=>{const g=window.frogArcade;g.$('aim-stick').releasePointerCapture(g.pointers.get('aim'));});await touch(cdp,'touchMove',[{...aim,x:aim.x+2}]);await frames(page,1);const lost=await snap(page);record(!lost.pointers.includes('aim')&&!lost.input.fire,`${label}: losing joystick pointer capture clears automatic fire`,lost);await touch(cdp,'touchEnd',[]);
 await fixture(page);aim=await aimPoint(page);await touch(cdp,'touchStart',[aim]);await page.evaluate(()=>window.dispatchEvent(new Event('blur')));stopped=await snap(page);record(!stopped.running&&stopped.pointers.length===0&&!stopped.manualFire,`${label}: blur pauses and clears both joystick channels`,stopped);await touch(cdp,'touchCancel',[]);await page.locator('#play-button').tap();
 await fixture(page);aim=await aimPoint(page);await touch(cdp,'touchStart',[aim]);const layout=await bounds(page,'#layout-button');await touch(cdp,'touchStart',[aim,{id:3,x:Math.round(layout.x+layout.width/2),y:Math.round(layout.y+layout.height/2)}]);stopped=await snap(page);record(stopped.layoutEditing&&stopped.pointers.length===0&&!stopped.manualFire,`${label}: editing control positions clears held joystick and fire input`,stopped);await touch(cdp,'touchEnd',[]);await page.locator('#layout-button').tap();await frames(page,1);await normalLayout(page,`${label} after layout editing`);
}
async function overview(page,cdp,label){
 await fixture(page);await page.locator('#view-button').tap();await frames(page,2);
 const direction=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],a=g.state.actors[1],from=g.project(p.x,g.ground(p.x,p.z)+.9,p.z),to=g.project(a.x,g.ground(a.x,a.z)+.9,a.z),dx=to.x-from.x,dy=to.y-from.y,d=Math.hypot(dx,dy);return {x:dx/d,y:dy/d};});
 const stick=await bounds(page,'#aim-stick'),point={id:2,x:Math.round(stick.x+stick.width*(.5+direction.x*.34)),y:Math.round(stick.y+stick.height*(.5+direction.y*.34))};await touch(cdp,'touchStart',[point]);await frames(page,1);const aimed=await snap(page);record(aimed.view==='overview'&&aimed.shots===1&&aimed.autoFireTargetId==='rival-1'&&!aimed.manualFire,`${label}: restored right joystick can auto-fire in overview using fresh target visibility`,aimed);
 const move=await movePoint(page);await touch(cdp,'touchStart',[point,move]);await touch(cdp,'touchMove',[point,{...move,x:move.x+5}]);await frames(page,1);const both=await snap(page);record(both.view==='overview'&&both.pointers.includes('move')&&both.pointers.includes('aim')&&both.input.fire,`${label}: overview joystick aim survives simultaneous left-thumb input`,both);await touch(cdp,'touchEnd',[]);
 await fixture(page);await page.locator('#view-button').tap();await frames(page,2);const projected=await page.evaluate(()=>{const g=window.frogArcade,a=g.state.actors[1];return g.project(a.x,g.ground(a.x,a.z)+.5,a.z);});const world={id:2,x:Math.round(projected.x),y:Math.round(projected.y)};await touch(cdp,'touchStart',[world]);await frames(page,1);const touched=await snap(page);record(touched.view==='overview'&&touched.shots===1&&!!touched.drag,`${label}: overview also retains direct touch aiming without a forced view change`,touched);await touch(cdp,'touchEnd',[]);
}
async function persistence(page,label){
 await fixture(page,{target:null});const before=await snap(page);await page.locator('#pause-button').tap();await page.reload({waitUntil:'networkidle'});await attach(page);const restored=await page.evaluate(()=>({mode:window.frogArcade.settings.touchFireMode,select:document.getElementById('touch-fire-mode').value,resumeDisabled:document.getElementById('play-button').disabled}));record(restored.mode==='auto'&&restored.select==='auto'&&!restored.resumeDisabled,`${label}: the selected Auto mode and Resume availability survive reload`,restored);
 await page.locator('#play-button').tap();const resumed=await snap(page);record(resumed.running&&resumed.shots===before.shots&&resumed.ammo===before.ammo&&resumed.time===before.time&&resumed.fireMode==='auto',`${label}: a saved round resumes with the chosen fire mode and unchanged progress`,{before,resumed});
 await page.locator('#pause-button').tap();await page.locator('#new-round-button').tap();const fresh=await snap(page);record(fresh.running&&fresh.phase==='countdown'&&fresh.intro===20&&fresh.time===0&&fresh.ammo===60&&fresh.shots===0&&fresh.fireMode==='auto',`${label}: New resets the round without resetting the chosen fire mode`,fresh);
 await setMode(page,'manual');await fixture(page);const aim=await aimPoint(page);const cdp=await page.context().newCDPSession(page);await touch(cdp,'touchStart',[aim]);await frames(page,12);const manual=await snap(page);record(manual.fireMode==='manual'&&manual.shots===0&&!manual.input.fire,`${label}: switching back to Manual disables auto-fire immediately and persistently`,manual);await touch(cdp,'touchEnd',[]);await cdp.detach();
}
async function catapult(page,cdp,label){
 await fixture(page,{player:{x:-8.5,z:18.2},target:null});await frames(page,1);await page.locator('#catapult-button').tap();await frames(page,1);const mounted=await snap(page);record(!!mounted.mounted&&await page.locator('#fire-button span').textContent()==='ΠΕΤΡΑ'&&await page.locator('#aim-stick').isVisible(),`${label}: mounting retains the integrated joystick and changes center fire to stone`,mounted);
 await page.locator('#view-button').tap();await frames(page,2);
 const aim=await aimPoint(page,2,{x:.5,y:.12});await touch(cdp,'touchStart',[aim]);await frames(page,14);const held=await snap(page),selected=await page.evaluate(()=>JSON.parse(JSON.stringify(window.frogArcade.catapultAim)));record(held.shots===0&&held.catapultShots===0&&held.shells===0&&selected.active,`${label}: outer-ring aiming sets catapult power without auto-launching`,{held,selected});await touch(cdp,'touchEnd',[]);await frames(page,1);
 const fire=await firePoint(page);await touch(cdp,'touchStart',[fire]);await frames(page,1);const shot=await snap(page),launched=await page.evaluate(()=>JSON.parse(JSON.stringify(window.frogArcade.catapultAim)));record(shot.catapultShots===1&&shot.shells===1&&shot.shots===0&&shot.ammo===60,`${label}: the integrated center deliberately launches one stone with separate ammo rules`,shot);
 record(selected.target&&launched.target&&Math.abs(selected.target.x-launched.target.x)<.05&&Math.abs(selected.target.z-launched.target.z)<.05,`${label}: center firing preserves the overview catapult direction and power selected on the ring`,{selected,launched});await frames(page,180);const continuous=await snap(page);record(continuous.catapultShots===1&&continuous.shots===0,`${label}: holding the center never turns catapult shots into automatic repeated fire`,continuous);await touch(cdp,'touchEnd',[]);await capture(page,`${label}-catapult`);
 await page.locator('#catapult-button').tap();await frames(page,1);const exited=await snap(page);record(!exited.mounted&&await page.locator('#aim-stick').isVisible()&&await page.locator('#fire-button span').textContent()==='ΠΥΡ',`${label}: leaving the catapult restores normal integrated aiming and practice fire`,exited);
}

async function integratedHold(page,cdp,label){
 for(const direction of [-1,1]){
  await fixture(page,{target:null,phase:'countdown'});const r=await bounds(page,'#aim-stick'),fire=await firePoint(page),before=await snap(page);await touch(cdp,'touchStart',[fire]);await frames(page,1);await touch(cdp,'touchMove',[{...fire,x:fire.x+direction*r.width*.46}]);let last=await snap(page),total=0;const samples=[];
  for(let i=0;i<4;i++){await frames(page,60);const next=await snap(page),delta=angle(next.yaw,last.yaw);total+=delta;samples.push({yaw:next.yaw,delta,shots:next.shots,fire:next.manualFire,aim:next.pointers.includes('aim')});last=next;}
  report.samples.push({label,type:'stationary-held-center-fire',direction,total,samples});record(samples.every(s=>s.fire&&s.aim&&Math.sign(s.delta)===-direction&&Math.abs(s.delta)>1)&&Math.abs(total)>Math.PI*2,`${label}: held center fire keeps turning ${direction<0?'left':'right'} beyond a full revolution without further finger movement`,{before,total,samples});
  record(last.shots>=20&&last.input.fire,`${label}: the same stationary thumb keeps firing while rotating ${direction<0?'left':'right'}`,last);
  await touch(cdp,'touchMove',[{...fire,x:r.x+r.width/2,y:r.y+r.height/2}]);await frames(page,1);const centered=await snap(page);await frames(page,18);const neutral=await snap(page);record(Math.abs(angle(neutral.yaw,centered.yaw))<1e-9&&neutral.manualFire&&neutral.shots>centered.shots,`${label}: returning the firing thumb to center stops turning but keeps shooting`,{centered,neutral});
  await touch(cdp,'touchEnd',[]);const released=await snap(page);await frames(page,12);const stopped=await snap(page);record(!stopped.manualFire&&!stopped.input.fire&&!stopped.pointers.includes('aim')&&stopped.shots===released.shots&&Math.abs(angle(stopped.yaw,released.yaw))<1e-9,`${label}: lifting the integrated thumb stops both fire and camera rotation`,{released,stopped});
 }
 await fixture(page,{target:null,phase:'countdown'});let r=await bounds(page,'#aim-stick'),ring=await aimPoint(page);await touch(cdp,'touchStart',[ring]);await touch(cdp,'touchMove',[{...ring,x:r.x+r.width/2,y:r.y+r.height/2}]);await frames(page,12);const crossing=await snap(page);await touch(cdp,'touchMove',[{...ring,x:r.x+r.width*.12}]);await frames(page,12);const crossed=await snap(page);record(!crossing.manualFire&&!crossed.manualFire&&crossed.shots===0&&crossed.pointers.includes('aim'),`${label}: dragging an aim-only ring contact across FIRE never accidentally starts shooting`,{crossing,crossed});await touch(cdp,'touchEnd',[]);
 await fixture(page,{target:null,phase:'countdown'});ring=await aimPoint(page);await touch(cdp,'touchStart',[ring]);await frames(page,1);const second=await firePoint(page,3);await touch(cdp,'touchStart',[ring,second]);await frames(page,12);const busy=await snap(page);record(!busy.manualFire&&!busy.input.fire&&busy.shots===0&&busy.pointers.includes('aim'),`${label}: a second finger cannot queue a center-fire shot while the ring contact owns the joystick`,busy);await touch(cdp,'touchEnd',[second]);await touch(cdp,'touchEnd',[]);
 await fixture(page,{target:null,phase:'countdown'});let ownedFire=await firePoint(page);await touch(cdp,'touchStart',[ownedFire]);await frames(page,1);const owned=await snap(page);await page.evaluate(()=>{const canvas=window.frogArcade.renderer.domElement;canvas.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerType:'touch',pointerId:9001}));canvas.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerType:'mouse',pointerId:9002,button:0}));});await frames(page,12);const unaffected=await snap(page);record(unaffected.manualFire&&unaffected.input.fire&&unaffected.pointers.includes('aim')&&unaffected.shots>owned.shots,`${label}: unrelated canvas cancel and mouse-up cannot stop a real held center-fire contact`,{owned,unaffected,probe:'Explicit synthetic unrelated pointer lifecycle events; the held touch is real CDP input.'});await touch(cdp,'touchEnd',[]);
 await fixture(page,{target:null,phase:'countdown'});r=await bounds(page,'#aim-stick');let fire=await firePoint(page);await touch(cdp,'touchStart',[fire]);await touch(cdp,'touchMove',[{...fire,y:fire.y-r.height*.45}]);await frames(page,90);const up=await snap(page);await touch(cdp,'touchMove',[{...fire,y:fire.y+r.height*.45}]);await frames(page,90);const down=await snap(page);record(up.pitch<-.6&&down.pitch>1.1&&up.pitch>=-.650001&&down.pitch<=1.150001&&down.manualFire,`${label}: integrated fire allows sustained vertical aiming with safe pitch limits`,{up,down});await touch(cdp,'touchCancel',[]);const cancel=await snap(page);await frames(page,12);const canceled=await snap(page);record(!canceled.manualFire&&!canceled.input.fire&&!canceled.pointers.includes('aim')&&canceled.shots===cancel.shots,`${label}: cancellation clears both channels of the integrated fire joystick`,{cancel,canceled});
 await fixture(page,{target:null,phase:'countdown'});fire=await firePoint(page);await touch(cdp,'touchStart',[fire]);await frames(page,1);const pause=await bounds(page,'#pause-button'),pausePoint={id:3,x:Math.round(pause.x+pause.width/2),y:Math.round(pause.y+pause.height/2)};await touch(cdp,'touchStart',[fire,pausePoint]);await touch(cdp,'touchEnd',[pausePoint]);const paused=await snap(page);record(!paused.running&&!paused.manualFire&&paused.pointers.length===0,`${label}: a second-finger Pause clears held center fire and aiming`,paused);await touch(cdp,'touchEnd',[]);await page.locator('#play-button').tap();await frames(page,12);const resumed=await snap(page);record(resumed.running&&resumed.shots===paused.shots&&!resumed.input.fire&&resumed.pointers.length===0,`${label}: Resume cannot revive a released integrated-fire contact`,resumed);
}
async function edgeContinuation(page,cdp,label){
 for(const direction of [-1,1]){
  await fixture(page,{target:null,phase:'countdown'});const start=await lookPoint(page),size=page.viewportSize(),edge={...start,x:direction<0?3:size.width-3};await touch(cdp,'touchStart',[start]);await touch(cdp,'touchMove',[edge]);const moved=await snap(page);await frames(page,60);const first=await snap(page);await frames(page,60);const second=await snap(page),a=angle(first.yaw,moved.yaw),b=angle(second.yaw,first.yaw);record(Math.sign(a)===-direction&&Math.sign(b)===-direction&&Math.abs(a)>.2&&Math.abs(b)>.2&&!second.manualFire&&second.shots===0,`${label}: a held ${direction<0?'left':'right'} screen-edge swipe continues camera rotation after the finger stops moving`,{moved,first,second,a,b});
  await touch(cdp,'touchMove',[start]);const returned=await snap(page);await frames(page,30);const interior=await snap(page);record(Math.abs(angle(interior.yaw,returned.yaw))<1e-9,`${label}: moving the edge-aiming finger back inside stops assisted rotation`,{returned,interior});await touch(cdp,'touchEnd',[]);await frames(page,30);const lifted=await snap(page);record(!lifted.drag&&Math.abs(angle(lifted.yaw,interior.yaw))<1e-9,`${label}: releasing a ${direction<0?'left':'right'} edge swipe leaves no camera drift`,{interior,lifted});
 }
 await fixture(page,{target:null,phase:'countdown'});const start=await lookPoint(page),edge={...start,x:page.viewportSize().width-3};await touch(cdp,'touchStart',[edge]);const tapped=await snap(page);await frames(page,60);const held=await snap(page);record(Math.abs(angle(held.yaw,tapped.yaw))<1e-9&&held.shots===0,`${label}: simply touching near the screen edge never starts automatic camera motion`,{tapped,held});await touch(cdp,'touchCancel',[]);
 await fixture(page,{target:null,phase:'countdown'});const verticalStart={...start,x:page.viewportSize().width-20};await touch(cdp,'touchStart',[verticalStart]);await touch(cdp,'touchMove',[{...verticalStart,x:page.viewportSize().width-3,y:verticalStart.y+70}]);const vertical=await snap(page);await frames(page,60);const noDrift=await snap(page);record(Math.abs(angle(noDrift.yaw,vertical.yaw))<1e-9,`${label}: a mostly vertical edge swipe does not turn incidental horizontal drift into continued yaw`,{vertical,noDrift});await touch(cdp,'touchCancel',[]);
}
async function flexibleLayout(page,cdp,label){
 const original=page.viewportSize();await fixture(page,{target:null,phase:'countdown'});await page.locator('#layout-button').tap();
 const layoutState=()=>page.evaluate(()=>{const g=window.frogArcade,r=g.$('aim-stick').getBoundingClientRect();return {width:innerWidth,height:innerHeight,game:{width:g.w,height:g.h},portrait:matchMedia('(orientation: portrait)').matches,rect:{x:r.x,y:r.y,w:r.width,h:r.height},saved:JSON.parse(localStorage.getItem('frog-touch-layout-v1')),resizes:window.__qaResizes||[]};});
 const dragTo=async(target)=>{const r=await bounds(page,'#aim-stick'),p={id:7,x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};await touch(cdp,'touchStart',[p]);for(let i=1;i<=5;i++)await touch(cdp,'touchMove',[{...p,x:p.x+(target.x-p.x)*i/5,y:p.y+(target.y-p.y)*i/5}]);await touch(cdp,'touchEnd',[]);return bounds(page,'#aim-stick');};
 const status=await bounds(page,'#round-status'),target={x:status.x+status.width/2,y:Math.max(status.y+status.height/2,90)};let placed=await dragTo(target),fire=await bounds(page,'#fire-button');
 record(Math.abs(placed.x+placed.width/2-target.x)<2&&Math.abs(placed.y+placed.height/2-target.y)<2,`${label}: a joystick can be placed precisely over a formerly forbidden passive status region`,{target,placed,status});
 record(Math.abs(fire.x+fire.width/2-placed.x-placed.width/2)<1&&Math.abs(fire.y+fire.height/2-placed.y-placed.height/2)<1,`${label}: the central FIRE button travels with the customized right joystick`,{placed,fire});
 const paused=await bounds(page,'#pause-button');await dragTo({x:paused.x+paused.width/2,y:paused.y+paused.height/2});const reachable=await page.evaluate(()=>{const r=document.getElementById('pause-button').getBoundingClientRect();return !!document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('#pause-button');});record(reachable,`${label}: flexible placement still leaves the actual Pause button reachable`);
 placed=await dragTo(target);await capture(page,`${label}-layout-editor`);await page.locator('#layout-button').tap();await frames(page,12);const settled=await bounds(page,'#aim-stick'),state=await snap(page);record(Math.abs(settled.x-placed.x)<1&&Math.abs(settled.y-placed.y)<1&&!state.manualFire&&state.shots===0,`${label}: leaving layout editing preserves the chosen position without shooting or snapping`,{placed,settled,state});await capture(page,`${label}-custom-layout`);
 await page.locator('#pause-button').tap();await page.reload({waitUntil:'networkidle'});await attach(page);await page.locator('#play-button').tap();await frames(page,1);const restored=await bounds(page,'#aim-stick');record(Math.abs(restored.x-settled.x)<1&&Math.abs(restored.y-settled.y)<1,`${label}: the customized joystick position survives reload and Resume`,{settled,restored});
 await page.evaluate(()=>{window.__qaResizes=[];window.addEventListener('resize',()=>window.__qaResizes.push({time:performance.now(),w:innerWidth,h:innerHeight,gameW:window.frogArcade.w,gameH:window.frogArcade.h}));});
 await resizeViewport(page,{width:original.height,height:original.width});const other=await bounds(page,'#aim-stick'),otherFire=await bounds(page,'#fire-button');record(other.x>=0&&other.y>=0&&other.x+other.width<=original.height+1&&other.y+other.height<=original.width+1&&Math.abs(otherFire.x+otherFire.width/2-other.x-other.width/2)<1&&Math.abs(otherFire.y+otherFire.height/2-other.y-other.height/2)<1,`${label}: orientation changes resize the integrated control together and keep it on screen`,{other,otherFire,layout:await layoutState()});
 await resizeViewport(page,original);const returned=await bounds(page,'#aim-stick');record(Math.abs(returned.x-settled.x)<1&&Math.abs(returned.y-settled.y)<1,`${label}: rotating back restores the original orientation's custom position`,{settled,returned,layout:await layoutState()});
 await fixture(page,{target:null,phase:'countdown'});const point=await firePoint(page);await touch(cdp,'touchStart',[point]);await frames(page,12);const practice=await snap(page);record(practice.shots>0&&practice.manualFire&&practice.pointers.includes('aim'),`${label}: the central fire control remains functional at its user-defined position`,practice);await touch(cdp,'touchEnd',[]);
 await page.locator('#layout-button').tap();await page.locator('.layout-reset').tap();await page.locator('#layout-button').tap();await frames(page,1);await normalLayout(page,`${label} reset`);
}
async function mobileCase(label,width,height,{full=false}={}){
 const {context,page,cdp}=await boot({width,height});await menuCheck(page,`${label} initial`);const defaults=await page.evaluate(()=>({mode:window.frogArcade.settings.touchFireMode,select:document.getElementById('touch-fire-mode')?.value}));record(defaults.mode==='manual'&&defaults.select==='manual',`${label}: absent legacy fire preference defaults to Manual`,defaults);
 await start(page);await frames(page,1);await normalLayout(page,`${label} manual`);await capture(page,`${label}-manual-layout`);await manualAim(page,cdp,label);await manualPractice(page,cdp,`${label} manual`);await integratedHold(page,cdp,label);await edgeContinuation(page,cdp,label);
 await setMode(page,'auto',{captureName:`${label}-fire-settings`});await fixture(page);await normalLayout(page,`${label} auto`);await capture(page,`${label}-auto-layout`);await autoStick(page,cdp,label);await manualPractice(page,cdp,`${label} auto override`);
 if(full){await autoGuards(page,cdp,label);await hybridJoystick(page,label);await lifecycle(page,cdp,label);await overview(page,cdp,label);await catapult(page,cdp,label);await persistence(page,label);}
 await flexibleLayout(page,cdp,label);await context.close();
}

async function desktopCase(){
 const {context,page}=await boot({mobile:false,width:1440,height:900});await menuCheck(page,'Desktop initial');await start(page,false);await page.mouse.move(720,450);await fixture(page);await frames(page,12);const before=await snap(page);record(before.shots===0&&!before.input.fire&&!before.autoFireTargetId,'Desktop default aiming remains manual',before);
 await page.mouse.down();await page.mouse.move(728,447,{steps:2});await frames(page,10);const fire=await snap(page);record(fire.shots>0&&fire.manualFire&&Math.abs(angle(fire.yaw,before.yaw))>.01,'Desktop click fire and direct mouse look still work together',fire);await page.mouse.up();const released=await snap(page);await frames(page,12);record((await snap(page)).shots===released.shots,'Desktop release stops subsequent shots');
 await page.keyboard.press('Escape');await page.waitForFunction(()=>!window.frogArcade.running);const paused=await snap(page);await menuCheck(page,'Desktop paused');await page.locator('#play-button').click();await page.waitForFunction(()=>!!document.pointerLockElement);const resumed=await snap(page);record(resumed.running&&resumed.shots===paused.shots&&resumed.ammo===paused.ammo&&!resumed.manualFire,'Desktop Resume retains progress with no stuck input',resumed);
 await page.keyboard.press('Escape');await page.locator('#settings-button').click();await page.locator('#touch-fire-mode').selectOption('auto');await page.locator('#settings-back').click();await page.locator('#play-button').click();await page.waitForFunction(()=>!!document.pointerLockElement);await fixture(page);await frames(page,12);const optional=await snap(page);record(optional.fireMode==='auto'&&optional.shots===0&&!optional.input.fire,'Selecting mobile Auto does not make desktop mouse aim fire automatically',optional);await context.close();
}
async function settingsScrollCase(){
 const {context,page,cdp}=await boot({width:844,height:390});await start(page);await openSettings(page);await page.locator('#touch-fire-mode').selectOption('auto');
 const geometry=()=>page.evaluate(()=>{const panel=document.getElementById('settings-panel'),help=document.getElementById('touch-fire-mode-help'),back=document.getElementById('settings-back'),r=panel.getBoundingClientRect(),h=help.getBoundingClientRect(),b=back.getBoundingClientRect();return {top:panel.scrollTop,height:panel.clientHeight,total:panel.scrollHeight,panel:{x:r.x,y:r.y,bottom:r.bottom},help:{x:h.x,y:h.y,w:h.width,h:h.height},back:{y:b.y,bottom:b.bottom}};});
 const before=await geometry(),point={id:2,x:Math.round(before.help.x+before.help.w*.55),y:Math.round(before.help.y+before.help.h*.75)};await touch(cdp,'touchStart',[point]);for(let i=1;i<=8;i++){await touch(cdp,'touchMove',[{...point,y:point.y-i*16}]);await page.waitForTimeout(20);}await touch(cdp,'touchEnd',[]);await page.waitForTimeout(150);const after=await geometry();
 record(before.total<=before.height||after.top>before.top+20,'Landscape settings can be scrolled by an actual touch gesture to reach overflowed controls',{before,after});
 const visible=after.back.y>=after.panel.y&&after.back.bottom<=after.panel.bottom+1;record(visible,'The landscape Back button is reachable after a real settings scroll',after);
 await capture(page,'landscape-settings-touch-scroll');
 if(visible){const back=await bounds(page,'#settings-back'),tap={id:4,x:Math.round(back.x+back.width/2),y:Math.round(back.y+back.height/2)};await touch(cdp,'touchStart',[tap]);await touch(cdp,'touchEnd',[]);record(await page.evaluate(()=>window.frogArcade.$('settings-panel').hidden),'The player can leave landscape settings with a real Back tap after scrolling');}
 await context.close();
}
try{
 if(selected.has('layout_landscape')){const {context,page,cdp}=await boot({width:844,height:390});await start(page);await flexibleLayout(page,cdp,'landscape-editor');await context.close();}
 if(selected.has('layout_portrait')){const {context,page,cdp}=await boot({width:390,height:844});await start(page);await flexibleLayout(page,cdp,'portrait-editor');await context.close();}
 if(selected.has('settings_scroll'))await settingsScrollCase();
 if(selected.has('portrait'))await mobileCase('portrait',390,844,{full:true});
 if(selected.has('landscape'))await mobileCase('landscape',844,390);
 if(selected.has('desktop'))await desktopCase();
}catch(e){report.errors.push(e.stack||e.message);console.error(e);if(activePage&&!activePage.isClosed())await activePage.screenshot({path:`${out}/failure.png`}).catch(()=>{});}
finally{
 if(process.env.EXPECTED_JS)record(report.bundles.length===1&&report.bundles[0].endsWith('/assets/'+process.env.EXPECTED_JS),'The exact frozen JavaScript bundle was tested',report.bundles);
 if(process.env.EXPECTED_CSS)record(report.stylesheets.length===1&&report.stylesheets[0].endsWith('/assets/'+process.env.EXPECTED_CSS),'The exact frozen stylesheet was tested',report.stylesheets);
 report.ok=report.failures.length===0&&report.errors.length===0;await save();await browser.close();console.log(JSON.stringify({ok:report.ok,checks:report.checks.length,failures:report.failures.length,errors:report.errors.length,report:`${out}/report.json`}));
}
if(!report.ok)process.exitCode=1;
