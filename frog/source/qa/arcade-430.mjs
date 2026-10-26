import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');

const base=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');base.searchParams.set('test','1');
const out=process.env.OUT_DIR||'qa/arcade-430-evidence';await fs.mkdir(out,{recursive:true});
const report={version:'4.3.0',scope:process.env.QA_SCOPE||'full',sourceBundles:[],checks:[],errors:[],screenshots:[],layouts:[],layoutFailures:[],limitations:[
 'Desktop Chromium and CDP touch emulation; no physical iPhone / Android or real-device FPS measurement.',
 'Interactions use real browser keyboard, mouse and touch handlers. Most long waits use production-model fixed-step hooks reading those handlers; camera checkpoints and screenshots use real WebGL frames.',
 'Combat, sabotage, respawn and result tests place actors or projectiles into documented fixture states. They verify controls and integration, not a full human campaign or difficulty balance.',
]};
const check=name=>{report.checks.push(name);console.log(`PASS ${name}`);};
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
let activePage;

async function ready(page){
 await page.waitForFunction(()=>window.__FROG__?.version==='4.3.0',null,{timeout:180000});
 await page.evaluate(()=>window.frogArcade.renderer.setAnimationLoop(null));
 for(const bundle of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module'&&s.src).map(s=>s.src)))if(!report.sourceBundles.includes(bundle))report.sourceBundles.push(bundle);
}
async function boot(context){
 const page=await context.newPage();activePage=page;page.setDefaultTimeout(90000);
 page.on('pageerror',error=>report.errors.push(error.stack||error.message));
 await page.goto(base.href,{waitUntil:'networkidle',timeout:180000});await ready(page);return page;
}
const inspect=page=>page.evaluate(()=>window.__FROG__.inspect());
const controls=page=>page.evaluate(()=>window.frogArcade.currentInput());
const snapshot=page=>page.evaluate(()=>{const g=window.frogArcade;return {version:g.state.version,time:g.state.time,intro:g.state.intro,phase:g.state.phase,status:g.state.status,mode:g.mode,ammo:g.state.actors[0].ammo,shots:g.state.stats.shots,actors:g.state.actors.map(a=>({...a})),bases:g.state.bases.map(b=>({...b}))};});
async function advance(page,frames=1){
 await page.evaluate(n=>{const g=window.frogArcade;for(let i=0;i<n&&g.running&&!g.layoutEditing;i++){g.elapsed+=1/60;window.__FROG__.test.step(g.currentInput(),1);g.renderActors(1/60);if(g.state.status!=='playing')break;}},frames);
}
async function frames(page,count=1,dt=1/60){await page.evaluate(({count,dt})=>{const g=window.frogArcade;for(let i=0;i<count;i++)g.frame(g.last+dt*1000+.001);},{count,dt});}
async function render(page,name){await frames(page);await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);}
async function camera(page){return page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],heading=p.aiming||p.shot>.02||p.kick>0?{x:p.aimX,z:p.aimZ}:{x:Math.sin(p.face),z:Math.cos(p.face)};return {mode:g.viewMode,body:g.project(p.x,g.ground(p.x,p.z)+1.2,p.z),behind:(g.camera.position.x-p.x)*heading.x+(g.camera.position.z-p.z)*heading.z,width:g.w,height:g.h};});}

async function layout(page,label,{actions=false,editing=false}={}){
 const result=await page.evaluate(({actions,editing})=>{
  const selectors=['.ammo-card','.base-card','#pause-button','#minimap','#view-button','#base-status','#round-status','#move-stick','#aim-stick','#fire-button','#layout-button'];
  if(actions)selectors.push('#kick-button','#catapult-button','#catapult-status','#sabotage-button','#sabotage-status');
  if(editing)selectors.push('#layout-hint');
  const rects=selectors.map(selector=>({selector,el:document.querySelector(selector)})).filter(({el})=>el&&!el.closest('[hidden]')&&getComputedStyle(el).visibility!=='hidden'&&getComputedStyle(el).display!=='none').map(({selector,el})=>{const r=el.getBoundingClientRect();return {id:selector,x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};});
  return {width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,rects};
 },{actions,editing});
 report.layouts.push({label,...result});
 const failures=[];const record=(valid,message)=>{if(!valid)failures.push(message);};
 record(result.scrollWidth<=result.width,`${label}: horizontal scroll`);
 for(const r of result.rects){record(r.width>0&&r.height>0,`${label}: empty ${r.id}`);record(r.x>=-.5&&r.y>=-.5&&r.right<=result.width+.5&&r.bottom<=result.height+.5,`${label}: ${r.id} outside ${result.width}×${result.height}: ${JSON.stringify(r)}`);}
 for(let i=0;i<result.rects.length;i++)for(let j=i+1;j<result.rects.length;j++){
  const a=result.rects[i],b=result.rects[j],ox=Math.min(a.right,b.right)-Math.max(a.x,b.x),oy=Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y);
  record(ox<=1||oy<=1,`${label}: ${a.id} overlaps ${b.id} by ${ox.toFixed(1)}×${oy.toFixed(1)}px`);
 }
 if(failures.length){report.layoutFailures.push(...failures);for(const failure of failures)console.error(`LAYOUT FAIL ${failure}`);}
 else check(`${label}: HUD, minimap and visible controls fit without overlap or scrolling`);
}

// Fixture helpers establish a reproducible encounter; actions below still flow
// through real event handlers and the same production simulation as normal play.
async function fixture(page,{x=3,z=6,battle=true,enemyStore=null}={}){
 await page.evaluate(({x,z,battle,enemyStore})=>{
  const g=window.frogArcade,s=g.state,p=s.actors[0];g.clearInputs();s.phase=battle?'battle':'countdown';s.intro=battle?0:20;s.status='playing';s.bullets.length=0;s.shells.length=0;
  Object.assign(p,{x,z,face:Math.PI,aimX:0,aimZ:-1,aiming:false,ammo:60,ko:false,eliminated:false,respawnTime:0,dizzy:0,dizzyTime:0,finishHits:0,invuln:0,hit:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:false,hop:0,hopX:0,hopZ:0,height:0,idle:0,knockUp:0,impulseX:0,impulseZ:0,catapultId:null,interactHeld:false,sabotageId:null,sabotageRecovery:0});
  for(const b of s.bases){b.progress=0;b.attackerId=null;}
  for(const c of s.catapults){c.occupant=null;c.loaded=true;c.cooldown=0;}
  for(const [i,a] of s.actors.slice(1).entries())if(!a.eliminated)Object.assign(a,{x:i?18.1:-18.1,z:i?2:0,ko:false,dizzyTime:1000,ammo:0,hop:0,hopX:0,hopZ:0,height:0,kick:0,kickCooldown:99,shot:0,catapultId:null,impulseX:0,impulseZ:0});
  if(enemyStore){const index=enemyStore==='rival-1'?1:2;Object.assign(p,{x:index===1?-19.1:19.1,z:1});}
  g.aim={x:0,z:-1};g.cameraReady=false;g.updateHUD();g.touchLayout?.refresh();
 },{x,z,battle,enemyStore});
 await frames(page);
}
async function injectHit(page,{knockout=false}={}){
 await page.evaluate(({knockout})=>{
  const g=window.frogArcade,s=g.state,p=s.actors[0];p.invuln=0;if(knockout){p.dizzy=6;p.dizzyTime=4;p.finishHits=2;}
  s.bullets.push({id:s.nextId++,owner:'rival-2',x:p.x,z:p.z-.15,dx:0,dz:1,life:.65});
 },{knockout});await advance(page,1);
}
const touch=(cdp,type,touchPoints)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
async function contact(page,id,pointerId,x=0,y=0){const r=await page.locator(`#${id}`).boundingBox();assert.ok(r,`${id} missing`);return {id:pointerId,x:r.x+r.width*(.5+x*.5),y:r.y+r.height*(.5+y*.5)};}
async function dragControl(page,cdp,id,x,y,pointerId=12){const start=await contact(page,id,pointerId);await touch(cdp,'touchStart',[start]);for(let i=1;i<=5;i++)await touch(cdp,'touchMove',[{id:pointerId,x:start.x+(x-start.x)*i/5,y:start.y+(y-start.y)*i/5}]);await touch(cdp,'touchEnd',[]);}
async function prepareCatapult(page){await fixture(page,{x:0,z:14});await page.evaluate(()=>window.frogArcade.state.actors[0].ammo=7);}

try{
 if(process.env.QA_SCOPE==='desktop-layout'){
  const desktop=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1}),page=await boot(desktop);
  await page.locator('#play-button').click();await frames(page);const rear=await camera(page);assert.equal(rear.mode,'chase3d');assert.ok(rear.behind<-8);
  await layout(page,'Latest desktop spawn HUD');await render(page,'desktop-home-rear-latest');
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.layoutFailures,[]);check('Current bundle desktop spawn HUD has no overlap; rear-view wall cutaway captured for visual verification');report.ok=true;await desktop.close();
 }else{
 const desktop=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});const page=await boot(desktop);
 assert.equal(await page.locator('#menu-main button:visible').count(),2);await render(page,'desktop-menu');
 await page.locator('#play-button').click();
 let s=await snapshot(page);assert.equal(s.version,2);assert.equal(s.phase,'countdown');assert.ok(s.intro<=20&&s.intro>19.9);assert.equal(s.ammo,0);assert.equal(s.bases.length,3);assert.ok(s.bases.every(b=>!b.destroyed));
 await frames(page);const rear=await camera(page);assert.equal(rear.mode,'chase3d');assert.ok(rear.behind<-8);assert.ok(Math.abs(rear.body.x-640)<70&&Math.abs(rear.body.y-400)<80);assert.equal(await page.locator('#minimap').isVisible(),true);
 await render(page,'desktop-home-rear');await layout(page,'Desktop starting HUD');
 check('Fresh version-2 round starts behind the frog at its own stock, with zero carried flies and a running 20-second preparation timer');
 await advance(page,840);s=await snapshot(page);assert.equal(s.ammo,60);assert.equal(s.phase,'countdown');assert.ok(s.intro>5.8&&s.intro<6.1);assert.ok(s.actors.every(a=>a.ammo===60));assert.equal(s.shots,0);
 check('All three frogs automatically fill to 60 from their stock during preparation without requiring movement or a first shot');
 await page.locator('#pause-button').click();const paused=await snapshot(page);await frames(page,3);assert.equal((await snapshot(page)).time,paused.time);assert.equal((await snapshot(page)).intro,paused.intro);assert.equal(await page.evaluate(()=>window.frogArcade.sound.ctx?.state),'suspended');
 await page.locator('#play-button').click();await advance(page,365);assert.equal((await snapshot(page)).phase,'battle');
 check('Pause freezes countdown and audio; resume reaches battle on the shared clock');

 await fixture(page);const before=await snapshot(page);await page.keyboard.down('d');const direction=await controls(page);assert.ok(Math.hypot(direction.mx,direction.mz)>.9);
 await frames(page,36);const held=await controls(page);assert.ok(Math.hypot(direction.mx-held.mx,direction.mz-held.mz)<1e-9);await page.keyboard.up('d');const moved=await snapshot(page);assert.ok(Math.hypot(moved.actors[0].x-before.actors[0].x,moved.actors[0].z-before.actors[0].z)>1.5);assert.ok((await camera(page)).behind<0);
 await page.keyboard.down('w');const forward=await controls(page);assert.ok(Math.hypot(forward.mx,forward.mz)>.9);await frames(page,12);assert.deepEqual({x:(await controls(page)).mx,z:(await controls(page)).mz},{x:forward.mx,z:forward.mz});await page.keyboard.up('w');
 check('Actual held D and W inputs stay stable while the rear camera turns, without continuous camera-relative spinning');
 await page.keyboard.press('c');await frames(page);assert.equal((await inspect(page)).viewMode,'overview');await render(page,'desktop-overview-bases');await page.keyboard.press('c');await frames(page);assert.equal((await inspect(page)).viewMode,'chase3d');
 check('C toggles the optional centered overview and returns to the rear view');

 await fixture(page,{x:0,z:0});await page.evaluate(()=>{const g=window.frogArcade,r=g.state.actors[1];Object.assign(r,{x:0,z:-7,dizzy:6,dizzyTime:4.5,finishHits:0,invuln:0,ko:false});g.cameraReady=false;});await frames(page);
 const target=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],r=g.state.actors[1];return g.project(r.x,g.ground(p.x,p.z)+.9,r.z);});assert.ok(target.visible&&target.x>0&&target.x<1280&&target.y>0&&target.y<800);
 await page.mouse.move(target.x,target.y);await page.mouse.down();await advance(page,120);await page.mouse.up();s=await snapshot(page);assert.equal(s.actors[1].ko,true);assert.equal(s.status,'playing');assert.ok(s.shots>=3);assert.equal(await page.evaluate(()=>window.frogArcade.lastPlayerHit?.id),'rival-1');
 await render(page,'desktop-mouse-hit');check('Actual mouse aim sends projectiles into the target; ranged KO does not win while enemy stock survives');
 await fixture(page);await injectHit(page,{knockout:true});s=await snapshot(page);assert.equal(s.actors[0].ko,true);assert.equal(s.status,'playing');await advance(page,708);assert.equal((await snapshot(page)).actors[0].ko,true);await advance(page,16);s=await snapshot(page);assert.equal(s.actors[0].ko,false);assert.equal(s.mode,'play');assert.ok(s.ammo<=2);assert.ok(Math.hypot(s.actors[0].x+1,s.actors[0].z-20.4)<.1);
 check('A production projectile KO returns the player to the intact stock after twelve seconds instead of showing defeat');

 await fixture(page,{x:0,z:9.1});assert.equal(await page.locator('#catapult-button').isVisible(),false);await page.keyboard.press('e');await advance(page);assert.equal((await snapshot(page)).actors[0].catapultId,null);
 await prepareCatapult(page);assert.equal(await page.locator('#catapult-button').isVisible(),true);await page.keyboard.press('e');await advance(page);assert.equal((await snapshot(page)).actors[0].catapultId,'catapult-player');
 await page.keyboard.press('c');await frames(page);const landing=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return g.project(6,g.ground(p.x,p.z)+.9,0);});await page.mouse.move(landing.x,landing.y);await advance(page);await frames(page);
 assert.equal(await page.evaluate(()=>window.frogArcade.artilleryView.previewLine.visible),true);const aimed=await page.evaluate(()=>({...window.frogArcade.catapultAim.target}));await render(page,'desktop-catapult-aim');
 await page.mouse.down();await advance(page);await page.mouse.up();const launch=await page.evaluate(()=>{const g=window.frogArcade,s=g.state.shells.find(s=>s.owner==='player');return {ammo:g.state.actors[0].ammo,count:g.state.shells.filter(s=>s.owner==='player').length,target:s&&{x:s.tx,z:s.tz}};});assert.equal(launch.count,1);assert.equal(launch.ammo,7);assert.ok(Math.hypot(launch.target.x-aimed.x,launch.target.z-aimed.z)<.02);await advance(page,25);await render(page,'desktop-catapult-flight');await page.keyboard.press('e');await advance(page);assert.equal((await snapshot(page)).actors[0].catapultId,null);
 check('E cannot mount through the yard wall; entering the gate permits mount, preview, one mouse-click stone, and exit without spending fly ammunition');

 await fixture(page,{enemyStore:'rival-1'});await page.keyboard.down('e');await advance(page,120);s=await snapshot(page);assert.ok(s.bases[1].progress>1.9);assert.equal(s.actors[0].catapultId,null);await page.keyboard.up('e');await advance(page);assert.equal((await snapshot(page)).bases[1].progress,0);
 await page.keyboard.down('e');await advance(page,120);await injectHit(page);assert.equal((await snapshot(page)).bases[1].progress,0);await advance(page,20);assert.equal((await snapshot(page)).bases[1].progress,0);await page.keyboard.up('e');
 check('Actual E hold channels storage destruction; release resets it, and a production projectile hit interrupts it with recovery time');
 await fixture(page,{enemyStore:'rival-1'});await page.keyboard.down('e');await advance(page,594);s=await snapshot(page);assert.equal(s.bases[1].destroyed,false);assert.ok(s.bases[1].progress>9.8&&s.bases[1].progress<10);await render(page,'desktop-storage-raid');await advance(page,6);await page.keyboard.up('e');s=await snapshot(page);assert.equal(s.bases[1].destroyed,true);assert.equal(s.actors[1].eliminated,true);assert.equal(s.status,'playing');
 check('A full uninterrupted ten-second E hold destroys one enemy stock and eliminates its owner without ending the remaining three-way round');
 await page.locator('#pause-button').click();const saved=await snapshot(page);const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('frog-arcade-save-v1')));assert.equal(stored.version,2);await page.reload({waitUntil:'networkidle'});await ready(page);assert.match(await page.locator('#play-button').innerText(),/ΣΥΝΕΧΕΙΑ/);await page.locator('#play-button').click();s=await snapshot(page);assert.equal(s.ammo,saved.ammo);assert.equal(s.phase,saved.phase);assert.equal(s.bases[1].destroyed,true);
 check('Reload resumes version-2 saved ammunition, phase and destroyed stock ownership');
 await fixture(page,{enemyStore:'rival-2'});await page.keyboard.down('e');await advance(page,600);await page.keyboard.up('e');assert.equal((await snapshot(page)).status,'won');await frames(page,20,.05);assert.equal(await page.locator('#result-panel').isVisible(),true);assert.match(await page.locator('#result-title').innerText(),/ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ/);await render(page,'desktop-victory');
 check('Only the final surviving player stock triggers the victory result screen');
 await page.locator('#replay-button').click();await page.evaluate(()=>{const g=window.frogArcade;g.state.bases[0].destroyed=true;});await frames(page,20,.05);assert.equal((await snapshot(page)).status,'lost');assert.match(await page.locator('#result-title').innerText(),/ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ/);
 check('A destroyed player-stock fixture is processed by the production model and displays the stock-specific defeat screen');await desktop.close();

 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});const phone=await boot(mobile);const cdp=await mobile.newCDPSession(phone);
 await phone.locator('#play-button').tap();await frames(phone);assert.equal((await inspect(phone)).viewMode,'chase3d');await layout(phone,'390×844 portrait');await render(phone,'phone-portrait-home');
 await fixture(phone,{battle:false});let left=await contact(phone,'move-stick',1,.8,0),right=await contact(phone,'aim-stick',2,0,-.99);const shotsBefore=(await snapshot(phone)).shots;
 await touch(cdp,'touchStart',[left,right]);const dual=await controls(phone);assert.ok(Math.hypot(dual.mx,dual.mz)>.5);assert.equal(dual.aiming,true);assert.equal(dual.fire,false);await frames(phone,18);assert.equal((await snapshot(phone)).shots,shotsBefore);const stable=await controls(phone);assert.ok(Math.hypot(stable.mx-dual.mx,stable.mz-dual.mz)<1e-9);
 let fire=await contact(phone,'fire-button',3);await touch(cdp,'touchStart',[left,right,fire]);await advance(phone,12);assert.ok((await snapshot(phone)).shots>shotsBefore);await touch(cdp,'touchEnd',[]);let released=await controls(phone);assert.equal(released.fire,false);assert.equal(released.aiming,false);assert.equal(Math.hypot(released.mx,released.mz),0);
 check('Simultaneous mobile sticks move and aim at full tilt without shooting; the independent fire button fires and all releases clear correctly');
 await phone.locator('#view-button').tap();await frames(phone);assert.equal((await inspect(phone)).viewMode,'overview');await phone.locator('#view-button').tap();await frames(phone);assert.equal((await inspect(phone)).viewMode,'chase3d');
 check('Touch camera button toggles exactly once per tap');

 await fixture(phone,{battle:false});const fireBefore=await phone.locator('#fire-button').boundingBox();await phone.locator('#layout-button').tap();assert.equal(await phone.evaluate(()=>window.frogArcade.layoutEditing),true);const editBefore=await snapshot(phone);await frames(phone,12);assert.equal((await snapshot(phone)).time,editBefore.time);
 await dragControl(phone,cdp,'fire-button',190,420);await dragControl(phone,cdp,'aim-stick',305,640,13);await frames(phone,3);assert.equal((await snapshot(phone)).time,editBefore.time);assert.equal((await snapshot(phone)).shots,editBefore.shots);const fireAfter=await phone.locator('#fire-button').boundingBox();assert.ok(Math.hypot(fireBefore.x-fireAfter.x,fireBefore.y-fireAfter.y)>40);await layout(phone,'Portrait layout editor',{editing:true});await render(phone,'phone-control-layout');
 await phone.locator('#layout-button').tap();assert.equal(await phone.evaluate(()=>window.frogArcade.layoutEditing),false);const storedLayout=await phone.evaluate(()=>JSON.parse(localStorage.getItem('frog-touch-layout-v1')));assert.equal(storedLayout.version,1);assert.ok(Number.isFinite(storedLayout.portrait.fire.x));await advance(phone,2);assert.ok((await snapshot(phone)).time>editBefore.time);
 check('In-battle layout editing drags actual controls, freezes simulation and firing, and stores normalized portrait positions');
 await phone.locator('#pause-button').tap();await phone.reload({waitUntil:'networkidle'});await ready(phone);await phone.locator('#play-button').tap();await frames(phone);const restored=await phone.locator('#fire-button').boundingBox();assert.ok(Math.hypot(restored.x-fireAfter.x,restored.y-fireAfter.y)<2,'fire position survives reload');
 await phone.setViewportSize({width:844,height:390});await phone.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await frames(phone);await layout(phone,'844×390 landscape');await render(phone,'phone-landscape');
 await phone.setViewportSize({width:390,height:844});await phone.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await frames(phone);const rotatedBack=await phone.locator('#fire-button').boundingBox();assert.ok(Math.hypot(rotatedBack.x-fireAfter.x,rotatedBack.y-fireAfter.y)<2);await layout(phone,'Restored portrait control positions');
 check('Custom positions survive reload and orientation changes; landscape receives an independent safe layout');

 await fixture(phone,{enemyStore:'rival-1'});assert.equal(await phone.locator('#sabotage-button').isVisible(),true);await layout(phone,'Portrait nearby enemy stock',{actions:true});const sabotage=await contact(phone,'sabotage-button',7);await touch(cdp,'touchStart',[sabotage]);await advance(phone,120);assert.ok((await snapshot(phone)).bases[1].progress>1.9);assert.equal(await phone.locator('#sabotage-status').isVisible(),true);await render(phone,'phone-storage-raid');await touch(cdp,'touchEnd',[]);await advance(phone);assert.equal((await snapshot(phone)).bases[1].progress,0);
 check('Mobile storage attack is a deliberate hold; live progress appears and release resets it');
 await phone.locator('#layout-button').tap();await phone.locator('.layout-reset').tap();await phone.locator('#layout-button').tap();await prepareCatapult(phone);await phone.locator('#catapult-button').tap();await advance(phone);assert.equal((await snapshot(phone)).actors[0].catapultId,'catapult-player');await frames(phone);await layout(phone,'Portrait mounted catapult',{actions:true});
 right=await contact(phone,'aim-stick',8,.4,-.65);await touch(cdp,'touchStart',[right]);await advance(phone,12);assert.equal(await phone.evaluate(()=>window.frogArcade.state.shells.length),0);await touch(cdp,'touchEnd',[]);await advance(phone);assert.equal(await phone.evaluate(()=>window.frogArcade.state.shells.length),0,'releasing aim must not throw a stone');
 right=await contact(phone,'aim-stick',8,.4,-.65);await touch(cdp,'touchStart',[right]);await frames(phone);const phoneTarget=await phone.evaluate(()=>({...window.frogArcade.catapultAim.target}));await render(phone,'phone-catapult-aim');fire=await contact(phone,'fire-button',9);await touch(cdp,'touchStart',[right,fire]);await advance(phone);const mobileLaunch=await phone.evaluate(()=>{const g=window.frogArcade,s=g.state.shells.find(s=>s.owner==='player');return {ammo:g.state.actors[0].ammo,count:g.state.shells.filter(s=>s.owner==='player').length,target:s&&{x:s.tx,z:s.tz}};});assert.equal(mobileLaunch.count,1);assert.equal(mobileLaunch.ammo,7);assert.ok(Math.hypot(mobileLaunch.target.x-phoneTarget.x,mobileLaunch.target.z-phoneTarget.z)<.03);await advance(phone,20);assert.equal(await phone.evaluate(()=>window.frogArcade.state.shells.filter(s=>s.owner==='player').length),1);await touch(cdp,'touchEnd',[]);await phone.locator('#catapult-button').tap();await advance(phone);assert.equal((await snapshot(phone)).actors[0].catapultId,null);
 check('Mobile catapult aim and release do not fire; the separate stone button launches one previewed projectile and preserves fly ammunition');

 for(const viewport of [{width:360,height:640},{width:640,height:360}]){
  await phone.setViewportSize(viewport);await phone.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await fixture(phone,{battle:false});await frames(phone);await layout(phone,`${viewport.width}×${viewport.height} compact viewport`);await render(phone,`phone-${viewport.width}x${viewport.height}`);
 }
 await mobile.close();assert.deepEqual(report.errors,[]);check('No uncaught runtime exceptions during desktop and touch flows');assert.deepEqual(report.layoutFailures,[],'Layout failures must be resolved before acceptance');report.ok=true;
 }
}catch(error){report.ok=false;report.failure=error.stack||String(error);process.exitCode=1;console.error(error);if(activePage&&!activePage.isClosed()){try{await activePage.screenshot({path:`${out}/failure.png`,timeout:15000});}catch{}}}
finally{await fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser.close();}
