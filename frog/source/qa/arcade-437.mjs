import {createRequire} from 'node:module';
import fs from 'node:fs/promises';

// Mobile auto-fire acceptance: production input handlers, real emulated touch
// contacts and the production simulation. Actor fixtures provide stationary
// targets but never force fire, replace the resolver or override shot physics.
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const expected=process.env.EXPECTED_VERSION||'4.3.7';
const out=process.env.OUT_DIR||'qa/arcade-437-evidence';
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');url.searchParams.set('test','1');
const selected=new Set((process.env.CASES||'portrait,landscape,desktop').split(','));
await fs.mkdir(out,{recursive:true});
const report={version:expected,checks:[],failures:[],errors:[],screenshots:[],samples:[],bundles:[],stylesheets:[],limitations:[
 'Full Chromium with software WebGL; mobile screen sizes and touch are emulated, not a physical iPhone/Safari test.',
 'Browser CDP touch contacts exercise the production pointer handlers, including simultaneous movement and aim with exactly two fingers.',
 'Actor-state fixtures isolate enemies and cover. Enemy idle/cooldown fields hold test targets still; auto-fire selection, projectile physics and damage remain production code.',
 'The production animation loop is stepped deterministically. Visual captures render the production scene and interface.',
 'Blur is explicitly dispatched to exercise lifecycle cleanup; it is not a physical app-backgrounding test.'
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok&&detail?' '+JSON.stringify(detail):''}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{channel:'chromium'}),args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();let activePage;
const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));

async function attach(page){
 await page.waitForFunction(v=>window.__FROG__?.version===v,expected,{timeout:180000});
 await page.evaluate(()=>{
  const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.__qaFresh=JSON.parse(JSON.stringify(g.state));window.__qaEvents=[];
  for(const type of ['pointerdown','pointermove','pointerup','pointercancel'])document.addEventListener(type,e=>window.__qaEvents.push({type,id:e.pointerId,pointerType:e.pointerType,target:e.target.id,trusted:e.isTrusted}));
 });
 for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
 for(const href of await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)))if(!report.stylesheets.includes(href))report.stylesheets.push(href);
}
async function boot({mobile=true,width=390,height=844}={}){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,cameraZoom:1,cameraFov:52,cameraSensitivity:1})));
 const page=await context.newPage();activePage=page;page.setDefaultTimeout(30000);page.on('pageerror',e=>report.errors.push(e.stack||e.message));
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await attach(page);
 return {context,page,cdp:await context.newCDPSession(page)};
}
async function frames(page,n=1){await page.evaluate(n=>{const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels;try{for(let i=0;i<n;i++){g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;g.drawLabels=labels;}},n);}
async function capture(page,name){await frames(page);await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);await save();}
async function snap(page){return page.evaluate(()=>{
 const g=window.frogArcade,s=g.state,p=s.actors[0];const input=g.currentInput();
 return {running:g.running,mode:g.mode,view:g.viewMode,touch:g.touch,mouseControl:g.mouseControl,mouseValid:g.mouse.valid,menuHidden:g.$('arcade-menu').hidden,layoutEditing:g.layoutEditing,phase:s.phase,intro:s.intro,time:s.time,shots:s.stats.shots,hits:s.stats.hits,ammo:p.ammo,x:p.x,z:p.z,height:p.height,yaw:g.cameraYaw,pitch:g.cameraPitch,drag:g.cameraDrag?{...g.cameraDrag}:null,move:{...g.move},pointers:[...g.pointers.keys()],manualFire:g.actions.fire,input,autoFireTargetId:g.autoFireTargetId??null,preview:g.currentAimPreview?{kind:g.currentAimPreview.kind,targetId:g.currentAimPreview.targetId,blocked:g.currentAimPreview.blocked}:null,mounted:p.catapultId,shells:s.shells.length,catapultShots:p.catapultShots,sabotage:s.bases.filter(b=>b.attackerId===p.id).map(b=>({id:b.id,progress:b.progress})),bullets:s.bullets.filter(b=>b.owner===p.id).map(b=>({dx:b.dx,dy:b.dy,dz:b.dz,x:b.x,y:b.y,z:b.z}))};
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
  g.updateCameraPose(0);g.currentInput();g.updateHUD();window.__qaEvents=[];
 },{player,target,phase,pitch});
 await frames(page,1);
}
async function bounds(page,selector){return page.locator(selector).boundingBox();}
async function touch(cdp,type,points){await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(p=>({...p,radiusX:5,radiusY:5,force:1}))});}
async function lookPoint(page,id=2){const size=page.viewportSize();let result={id,x:Math.round(size.width*.79),y:Math.round(size.height*.57)};const probe=await page.evaluate(({x,y})=>document.elementFromPoint(x,y)?.id,result);record(probe==='arcade-world','The right thumb can start aiming directly on unobstructed gameplay',{point:result,element:probe});return result;}
async function movePoint(page,id=1){const r=await bounds(page,'#move-stick');return {id,x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height*.23)};}
async function start(page,mobile=true){await page.locator('#new-round-button')[mobile?'tap':'click']();if(!mobile)await page.waitForFunction(()=>!!document.pointerLockElement);}
async function menuCheck(page,label){
 const detail=await page.evaluate(()=>{const a=document.querySelector('#new-round-button'),b=document.querySelector('#play-button'),ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();return {sameGroup:a.parentElement===b.parentElement,a:{x:ra.x,y:ra.y,w:ra.width,h:ra.height},b:{x:rb.x,y:rb.y,w:rb.width,h:rb.height},fontA:getComputedStyle(a.querySelector('span')).fontSize,fontB:getComputedStyle(b.querySelector('span')).fontSize};});
 record(detail.sameGroup&&Math.abs(detail.a.w-detail.b.w)<1&&detail.a.h>=80&&detail.fontA===detail.fontB,`${label}: New and Resume retain equal large button halves`,detail);
}
async function normalLayout(page,label){
 const detail=await page.evaluate(()=>{const g=window.frogArcade,ids=['move-stick','aim-stick','fire-button','touch-aim-hint','layout-button'],controls=Object.fromEntries(ids.map(id=>{const el=g.$(id),r=el?.getBoundingClientRect(),style=el&&getComputedStyle(el);return [id,{visible:!!el&&!el.hidden&&!el.closest('[hidden]')&&style.display!=='none'&&style.visibility!=='hidden'&&!!r.width&&!!r.height,x:r?.x,y:r?.y,w:r?.width,h:r?.height,text:el?.textContent.trim(),pointerEvents:style?.pointerEvents}];}));return {controls,w:innerWidth,h:innerHeight};});
 const c=detail.controls;
 record(c['move-stick'].visible&&!c['aim-stick'].visible&&!c['fire-button'].visible,`${label}: normal combat exposes movement without separate look or fire buttons`,detail);
 record(c['touch-aim-hint'].visible&&c['touch-aim-hint'].pointerEvents==='none'&&c['touch-aim-hint'].x>=0&&c['touch-aim-hint'].x+c['touch-aim-hint'].w<=detail.w+1,`${label}: the automatic-fire aiming instruction is visible and does not intercept touches`,detail);
}

async function aimAndFire(page,cdp,label){
 await fixture(page);await frames(page,20);let before=await snap(page);
 record(before.shots===0&&!before.input.fire,`${label}: an enemy under the reticle does not fire while no aiming finger is held`,before);
 const look=await lookPoint(page);await touch(cdp,'touchStart',[look]);await frames(page,1);let aimed=await snap(page);
 record(aimed.shots===1&&!aimed.manualFire&&aimed.ammo===59&&aimed.drag?.type==='touch',`${label}: touching the aim area alone fires a normal fly at the lined-up enemy`,aimed);
 record(aimed.autoFireTargetId==='rival-1',`${label}: automatic fire identifies the opponent under the actual shot path`,aimed);
 const angleBefore={yaw:aimed.yaw,pitch:aimed.pitch};await frames(page,10);aimed=await snap(page);
 record(aimed.shots>=2&&Math.abs(angle(aimed.yaw,angleBefore.yaw))<1e-9&&Math.abs(aimed.pitch-angleBefore.pitch)<1e-9,`${label}: keeping aim held repeats fire without rotating the camera`,aimed);
 await touch(cdp,'touchEnd',[]);const released=await snap(page);await frames(page,18);const stopped=await snap(page);
 record(!released.drag&&!released.input.fire&&stopped.shots===released.shots,`${label}: lifting the aiming thumb immediately stops new shots`,{released,stopped});
 record(stopped.hits>0,`${label}: automatically launched flies travel and hit using real projectile physics`,stopped);
 await capture(page,`${label}-autofire-hit`);
 const events=await page.evaluate(()=>window.__qaEvents);record(events.some(e=>e.pointerType==='touch'&&e.target==='arcade-world'&&e.trusted),`${label}: aiming uses trusted browser touch events`,events);
}
async function twoThumbs(page,cdp,label){
 await fixture(page);const look=await lookPoint(page),move=await movePoint(page);const before=await snap(page);
 await touch(cdp,'touchStart',[move,look]);await frames(page,2);
 const turned={...look,x:look.x+4,y:look.y-2};await touch(cdp,'touchMove',[move,turned]);await frames(page,6);const active=await snap(page);
 record(active.shots>=1&&Math.hypot(active.x-before.x,active.z-before.z)>.15&&Math.abs(angle(active.yaw,before.yaw))>.005&&Math.abs(active.pitch-before.pitch)>.002&&!active.manualFire&&active.pointers.includes('move'),`${label}: exactly two thumbs move, turn both aim axes and fire with no shoot-button press`,{before,active});
 await touch(cdp,'touchEnd',[turned]);const released=await snap(page);await frames(page,12);const oneThumb=await snap(page);
 record(!released.drag&&!released.input.fire&&oneThumb.shots===released.shots&&Math.hypot(oneThumb.x-released.x,oneThumb.z-released.z)>.2,`${label}: releasing only aim stops shots while the movement thumb keeps moving`,{released,oneThumb});
 await touch(cdp,'touchEnd',[]);await capture(page,`${label}-two-thumb-gameplay`);
 await fixture(page);const stillLook=await lookPoint(page),stillMove=await movePoint(page);await touch(cdp,'touchStart',[stillMove,stillLook]);await frames(page,1);await touch(cdp,'touchEnd',[stillMove]);const aimOnly=await snap(page);
 record(!!aimOnly.drag&&aimOnly.input.fire&&!aimOnly.pointers.includes('move')&&Math.hypot(aimOnly.move.x,aimOnly.move.z)===0,`${label}: releasing only movement preserves the independent aiming touch and auto-fire`,aimOnly);await touch(cdp,'touchEnd',[]);
}
async function lookAndMiss(page,cdp,label){
 await fixture(page,{target:null,pitch:.12});const look=await lookPoint(page),before=await snap(page);await touch(cdp,'touchStart',[look]);
 const high={...look,x:look.x+35,y:look.y-65};await touch(cdp,'touchMove',[high]);await frames(page,1);const up=await snap(page);
 record(up.pitch<before.pitch-.1&&Math.abs(angle(up.yaw,before.yaw))>.08&&up.input.ay>0,`${label}: one right-thumb drag aims freely upward and sideways`,{before,up});
 const low={...high,y:look.y+35};await touch(cdp,'touchMove',[low]);await frames(page,1);const down=await snap(page);
 record(down.pitch>up.pitch+.2&&down.input.ay<up.input.ay,`${label}: the same aiming finger can aim back downward`,{up,down});
 await frames(page,25);const idle=await snap(page);
 record(idle.shots===0&&idle.ammo===60,`${label}: looking through empty space spends no ammunition`,idle);
 record(Math.abs(angle(idle.yaw,down.yaw))<1e-9&&Math.abs(idle.pitch-down.pitch)<1e-9,`${label}: stopping finger motion never adds an automatic camera turn`,idle);
 await touch(cdp,'touchCancel',[]);const cancelled=await snap(page);record(!cancelled.drag&&!cancelled.input.fire,`${label}: browser touch cancellation clears auto-fire intent`,cancelled);
 await fixture(page);const missLook=await lookPoint(page);await touch(cdp,'touchStart',[missLook]);await frames(page,1);const first=await snap(page);
 await touch(cdp,'touchMove',[{...missLook,x:Math.max(170,missLook.x-120)}]);await frames(page,18);const missed=await snap(page);
 record(first.shots===1&&missed.shots===first.shots&&!missed.input.fire&&!missed.autoFireTargetId,`${label}: dragging off the opponent stops firing while the finger remains down`,{first,missed});await touch(cdp,'touchEnd',[]);
}
async function guards(page,cdp,label){
 const cases=[
  {name:'solid house wall',options:{player:{x:2.2,z:20.5},target:{x:2.2,z:15}},setup:null},
  {name:'preparation countdown',options:{phase:'countdown'},setup:null},
  {name:'empty magazine',options:{},setup:()=>{const s=window.frogArcade.state;s.actors[0].ammo=0;s.flies.forEach(f=>f.wait=9999);}},
  {name:'incapacitated player',options:{},setup:()=>{window.frogArcade.state.actors[0].dizzyTime=3;}},
  {name:'invulnerable opponent',options:{},setup:()=>{window.frogArcade.state.actors[1].invuln=3;}},
 ];
 for(const test of cases){await fixture(page,test.options);if(test.setup)await page.evaluate(test.setup);const look=await lookPoint(page);await touch(cdp,'touchStart',[look]);await frames(page,12);const s=await snap(page);record(s.shots===0&&!s.input.fire,`${label}: ${test.name} prevents automatic shots`,s);if(test.name==='solid house wall')record(s.preview?.blocked,`${label}: cover rejection corresponds to the real blocked projectile preview`,s.preview);await touch(cdp,'touchEnd',[]);}
 await fixture(page,{player:{x:-17.55,z:-.5},target:{x:-19.9,z:2.5}});const coveredLook=await lookPoint(page);await touch(cdp,'touchStart',[coveredLook]);const visualCover=await page.evaluate(()=>{const g=window.frogArcade,input=g.currentInput();return {fire:input.fire,shotTarget:g.currentAimPreview?.targetId,cameraTarget:g.mouse.targetId,visible:g.autoFireTargetVisible('rival-1')};});
 record(visualCover.shotTarget==='rival-1'&&visualCover.cameraTarget==='rival-1'&&!visualCover.visible&&!visualCover.fire,`${label}: visible roof or storage scenery prevents acquiring a visually obscured opponent`,visualCover);await touch(cdp,'touchEnd',[]);
 await fixture(page,{player:{x:-17.8,z:-.5},target:{x:-19.5,z:2.3}});const look=await lookPoint(page);await touch(cdp,'touchStart',[look]);const ready=await snap(page);
 const sabotage=await bounds(page,'#sabotage-button');record(!!sabotage,`${label}: storage sabotage is available in the valid storage fixture`);
 if(sabotage){const hold={id:3,x:Math.round(sabotage.x+sabotage.width/2),y:Math.round(sabotage.y+sabotage.height/2)};await touch(cdp,'touchStart',[look,hold]);await frames(page,12);const held=await snap(page);record(ready.input.fire&&!held.input.fire&&held.input.sabotage&&held.shots===0&&held.sabotage.some(s=>s.progress>0),`${label}: holding sabotage takes priority over an otherwise valid auto-fire target`,{ready,held});await touch(cdp,'touchEnd',[]);}
}
async function bufferedKick(page,cdp,label){
 await fixture(page,{target:{x:0,z:3}});const look=await lookPoint(page);await touch(cdp,'touchStart',[look]);const ready=await snap(page),kick=await bounds(page,'#kick-button');
 record(ready.input.fire&&!!kick,`${label}: close-opponent fixture offers both a valid auto target and a defensive kick`,{ready,kick});
 if(kick){const point={id:3,x:Math.round(kick.x+kick.width/2),y:Math.round(kick.y+kick.height/2)};await touch(cdp,'touchStart',[look,point]);await touch(cdp,'touchEnd',[point]);const buffered=await snap(page);record(buffered.input.kick&&!buffered.input.fire&&!buffered.manualFire&&!!buffered.drag,`${label}: a kick tap released between simulation ticks overrides held auto-fire`,buffered);}
 await touch(cdp,'touchEnd',[]);
}
async function lifecycle(page,cdp,label){
 await fixture(page);let look=await lookPoint(page);await touch(cdp,'touchStart',[look]);await frames(page,1);
 const pause=await bounds(page,'#pause-button'),pausePoint={id:3,x:Math.round(pause.x+pause.width/2),y:Math.round(pause.y+pause.height/2)};await touch(cdp,'touchStart',[look,pausePoint]);await touch(cdp,'touchEnd',[pausePoint]);
 let stopped=await snap(page);record(!stopped.running&&stopped.mode==='pause'&&!stopped.drag&&!stopped.input.fire,`${label}: pausing during active aim clears automatic fire`,stopped);await touch(cdp,'touchEnd',[]);if(stopped.running){await page.locator('#pause-button').tap();stopped=await snap(page);}await menuCheck(page,`${label} paused`);
 const progress={shots:stopped.shots,ammo:stopped.ammo,time:stopped.time};await page.locator('#play-button').tap();let resumed=await snap(page);record(resumed.running&&resumed.menuHidden&&resumed.shots===progress.shots&&resumed.ammo===progress.ammo&&resumed.time===progress.time&&!resumed.drag&&!resumed.input.fire,`${label}: Resume preserves the round and requires a new aiming touch`,resumed);
 await fixture(page);look=await lookPoint(page);await touch(cdp,'touchStart',[look]);await touch(cdp,'touchMove',[{...look,x:look.x+1}]);await page.evaluate(()=>{const g=window.frogArcade;g.renderer.domElement.releasePointerCapture(g.cameraDrag.id);});await touch(cdp,'touchMove',[{...look,x:look.x+2}]);const lost=await snap(page);record(!lost.drag&&!lost.input.fire,`${label}: losing the aiming pointer capture clears automatic fire`,lost);await touch(cdp,'touchEnd',[]);
 await fixture(page);look=await lookPoint(page);await touch(cdp,'touchStart',[look]);await page.evaluate(()=>window.dispatchEvent(new Event('blur')));stopped=await snap(page);record(!stopped.running&&!stopped.drag&&!stopped.input.fire&&stopped.pointers.length===0,`${label}: blur cleanup pauses and clears aim, fire and movement`,stopped);await touch(cdp,'touchCancel',[]);await page.locator('#play-button').tap();
 await fixture(page);look=await lookPoint(page);await touch(cdp,'touchStart',[look]);const layout=await bounds(page,'#layout-button');await touch(cdp,'touchStart',[look,{id:3,x:Math.round(layout.x+layout.width/2),y:Math.round(layout.y+layout.height/2)}]);stopped=await snap(page);
 record(stopped.layoutEditing&&!stopped.drag&&!stopped.input.fire,`${label}: entering control-position editing clears held auto-fire`,stopped);await touch(cdp,'touchEnd',[]);await page.locator('#layout-button').tap();await frames(page,1);await normalLayout(page,`${label} after layout editing`);
 await page.locator('#pause-button').tap();await page.locator('#new-round-button').tap();const fresh=await snap(page);record(fresh.running&&fresh.phase==='countdown'&&fresh.intro===20&&fresh.time===0&&fresh.ammo===60&&fresh.shots===0,`${label}: New still starts a fresh playable round`,fresh);
}
async function overview(page,cdp,label){
 await fixture(page);await page.locator('#view-button').tap();await frames(page,2);const before=await snap(page);
 const point=await page.evaluate(()=>{const g=window.frogArcade,a=g.state.actors[1];return g.project(a.x,g.ground(a.x,a.z)+.5,a.z);});
 const look={id:2,x:Math.round(point.x),y:Math.round(point.y)};await touch(cdp,'touchStart',[look]);await frames(page,1);const active=await snap(page);
 record(before.view==='overview'&&active.view==='overview'&&active.shots===1&&!active.manualFire,`${label}: overview point aiming fires at the touched opponent without changing camera mode`,{point,before,active});
 const move=await movePoint(page);await touch(cdp,'touchStart',[look,move]);await touch(cdp,'touchMove',[look,{...move,x:move.x+7,y:move.y-3}]);const simultaneous=await snap(page);
 record(simultaneous.view==='overview'&&simultaneous.mouseValid&&simultaneous.input.fire&&!!simultaneous.autoFireTargetId&&simultaneous.pointers.includes('move'),`${label}: moving the left thumb preserves stationary overview touch aim and auto-fire`,simultaneous);
 await touch(cdp,'touchEnd',[move]);await touch(cdp,'touchMove',[{...look,x:look.x+10,y:look.y+5}]);await frames(page,1);const moved=await snap(page);record(moved.view==='overview'&&Math.abs(angle(moved.yaw,before.yaw))<1e-9,`${label}: dragging in overview preserves its stable camera`,moved);await touch(cdp,'touchEnd',[]);
}
async function catapult(page,cdp,label){
 await fixture(page,{player:{x:-8.5,z:18.2},target:null});await frames(page,1);await page.locator('#catapult-button').tap();await frames(page,1);let mounted=await snap(page);
 record(!!mounted.mounted,`${label}: the catapult remains available through its deliberate use action`,mounted);
 record(await page.locator('.aim-zone').isVisible()&&await page.locator('#fire-button').isVisible()&&await page.locator('#fire-button span').textContent()==='ΠΕΤΡΑ',`${label}: mounting reveals the dedicated stone aim and fire controls`);
 const look=await lookPoint(page);await touch(cdp,'touchStart',[look]);await frames(page,15);const held=await snap(page);record(held.shots===0&&held.shells===0&&held.catapultShots===0,`${label}: camera aiming alone never fires the catapult or spends fly ammunition`,held);await touch(cdp,'touchEnd',[]);
 const aim=await bounds(page,'#aim-stick'),fire=await bounds(page,'#fire-button'),aimPoint={id:2,x:Math.round(aim.x+aim.width/2),y:Math.round(aim.y+aim.height*.12)},firePoint={id:3,x:Math.round(fire.x+fire.width/2),y:Math.round(fire.y+fire.height/2)};
 await touch(cdp,'touchStart',[aimPoint]);await frames(page,1);await touch(cdp,'touchStart',[aimPoint,firePoint]);await frames(page,1);const shot=await snap(page);
 record(shot.shells===1&&shot.catapultShots===1&&shot.shots===0&&shot.ammo===60,`${label}: the explicit stone button launches one catapult shot with separate ammunition`,shot);await touch(cdp,'touchEnd',[]);await capture(page,`${label}-manual-catapult`);
}
async function mobileCase(label,width,height,{full=false}={}){
 const {context,page,cdp}=await boot({width,height});await menuCheck(page,`${label} initial`);await start(page);await frames(page,1);await normalLayout(page,label);await capture(page,`${label}-normal-layout`);
 await aimAndFire(page,cdp,label);await twoThumbs(page,cdp,label);await lookAndMiss(page,cdp,label);
 if(full){await guards(page,cdp,label);await bufferedKick(page,cdp,label);await lifecycle(page,cdp,label);await overview(page,cdp,label);await catapult(page,cdp,label);}
 await context.close();
}
async function desktopCase(){
 const {context,page}=await boot({mobile:false,width:1440,height:900});await menuCheck(page,'Desktop initial');await start(page,false);await page.mouse.move(720,450);await fixture(page);await frames(page,12);const before=await snap(page);
 record(before.shots===0&&!before.input.fire&&!before.autoFireTargetId,'Desktop aiming remains manual and does not automatically fire',before);
 await page.mouse.down();await page.mouse.move(728,447,{steps:2});await frames(page,10);const fire=await snap(page);record(fire.shots>0&&fire.manualFire&&Math.abs(angle(fire.yaw,before.yaw))>.01,'Desktop left-click fire and direct mouse look still work together',fire);
 await page.mouse.up();const released=await snap(page);await frames(page,12);record((await snap(page)).shots===released.shots,'Desktop mouse-button release still stops new shots');
 await page.keyboard.press('Escape');await page.waitForFunction(()=>!window.frogArcade.running);const paused=await snap(page);await menuCheck(page,'Desktop paused');await page.locator('#play-button').click();await page.waitForFunction(()=>!!document.pointerLockElement);const resumed=await snap(page);record(resumed.running&&resumed.shots===paused.shots&&resumed.ammo===paused.ammo&&!resumed.input.fire,'Desktop Resume retains progress with no stuck auto-fire',resumed);
 await context.close();
}
try{
 if(selected.has('tail')){const {context,page,cdp}=await boot();await start(page);await guards(page,cdp,'portrait');await bufferedKick(page,cdp,'portrait');await lifecycle(page,cdp,'portrait');await overview(page,cdp,'portrait');await catapult(page,cdp,'portrait');await context.close();}
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
