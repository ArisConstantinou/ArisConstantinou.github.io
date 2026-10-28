import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const version='4.3.14',out=path.resolve(process.env.OUT_DIR||'qa/results/arcade-4314');
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4178/');url.searchParams.set('test','1');
const report={version,url:url.href,checks:[],failures:[],errors:[],resourceFailures:[],screenshots:[],bundles:[],stylesheets:[],reviewViews:[],limitations:[
 'Desktop Chromium with software WebGL; no claim about real mobile hardware.',
 'Fixtures position and freeze opponents; production native input, simulation, aiming, materials and rendering stay in use.',
 'Intermediate WebGL renders are skipped during deterministic frame batches; the final frame and all sampled game logic are unchanged.',
 'Floor screenshots require visual review; non-overlapping surface coverage is verified separately by geometry unit tests.',
 'The full-map review screenshot uses an explicitly elevated camera to fit the complete arena. Close catapult review uses documented lens/zoom fixtures; movement captures use the ordinary gameplay camera.',
 'Only the automatic root favicon request is fulfilled with HTTP 204 by the harness because the local static server has no icon. Game assets, HTTP failures, console errors and shader errors remain monitored.',
]};
await fs.mkdir(out,{recursive:true});
const check=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${ok?'':' '+JSON.stringify(detail)}`);};
const save=()=>fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));
const launch={headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']};
if(process.env.CHROMIUM_EXECUTABLE)launch.executablePath=process.env.CHROMIUM_EXECUTABLE;
const browser=await chromium.launch(launch);report.browser=browser.version();
const near=(a,b,t=.01)=>Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t;
const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
async function frames(page,count=1,{bodyBounds=false}={}){
 return page.evaluate(({count,bodyBounds})=>{
  const g=window.frogArcade,render=g.renderer.render,samples=[];
  try{for(let i=0;i<count;i++){
   g.renderer.render=i===count-1?render:()=>{};g.frame(g.last+1000/60+.001);
   const p=g.state.actors[0],model=g.models[0],reticle=g.currentAimReticle;let body=null;
   if(bodyBounds&&model.group.visible){
    model.group.updateMatrixWorld(true);model.skeleton.update();model.mesh.computeBoundingBox();
    const bound=model.mesh.boundingBox.clone().applyMatrix4(model.mesh.matrixWorld),points=[];
    for(const x of [bound.min.x,bound.max.x])for(const y of [bound.min.y,bound.max.y])for(const z of [bound.min.z,bound.max.z]){const point=g.project(x,y,z);if(point.visible)points.push(point);}
    if(points.length)body={left:Math.min(...points.map(p=>p.x)),right:Math.max(...points.map(p=>p.x)),top:Math.min(...points.map(p=>p.y)),bottom:Math.max(...points.map(p=>p.y))};
   }
   samples.push({x:p.x,z:p.z,height:p.height,face:p.face,poseAimYaw:p.poseAimYaw,poseAiming:p.poseAiming,visualYaw:model.group.rotation.y,aimYaw:Math.atan2(p.aimX,p.aimZ),body,bodyVisible:model.group.visible,reticle:reticle?{x:reticle.x,y:reticle.y,anchor:reticle.anchor}:null,shots:g.state.stats.shots});
  }}finally{g.renderer.render=render;}return samples;
 },{count,bodyBounds});
}
async function capture(page,name){
 await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());
 const filename=path.join(out,name+'.png');await page.screenshot({path:filename});report.screenshots.push(filename);await save();
}
async function snapshot(page){
 return page.evaluate(()=>{
  const g=window.frogArcade,p=g.state.actors[0],artillery=g.artilleryView;
  const pieces=artillery.previewPieces||[artillery.previewLine,artillery.landingMarker];
  return {version:window.__FROG__.version,running:g.running,mode:g.mode,view:g.viewMode,locked:!!document.pointerLockElement,mouse:{x:g.mouse.x,y:g.mouse.y,valid:g.mouse.valid},
   player:{x:p.x,z:p.z,height:p.height,face:p.face,poseAimYaw:p.poseAimYaw,aimX:p.aimX,aimY:p.aimY,aimZ:p.aimZ,shot:p.shot,kick:p.kick,kickCooldown:p.kickCooldown,ammo:p.ammo,catapultId:p.catapultId},visualYaw:g.models[0].group.rotation.y,
   actors:g.state.actors.map(a=>({id:a.id,x:a.x,z:a.z,ko:a.ko,dizzy:a.dizzy,dizzyTime:a.dizzyTime,finishHits:a.finishHits,invuln:a.invuln})),
   shots:g.state.stats.shots,hits:g.state.stats.hits,shells:g.state.shells.length,
   reticle:g.currentAimReticle?{x:g.currentAimReticle.x,y:g.currentAimReticle.y,anchor:g.currentAimReticle.anchor}:null,
   legacyGuide:!!g.aimGuide?.visible,legacyReticle:!!g.aimReticle?.visible,legacyRing:!!g.targetRing?.visible,pathLength:g.currentAimPathScreen?.length||0,
   artillery:{line:!!artillery.previewLine.visible,landing:!!artillery.landingMarker.visible,pieces:pieces.map(item=>({name:item.name,visible:item.visible})),aimActive:!!g.catapultAim?.active,target:g.catapultAim?.target||null},
   mouseTargetLock:g.settings.mouseTargetLock,targetLock:{held:g.targetLock?.held||false,targetId:g.targetLock?.targetId||null,current:g.currentTargetLock?.targetId||null},
   kickBadges:[...document.querySelectorAll('.frog-action')].map(button=>({id:button.dataset.targetId,state:button.dataset.state,disabled:button.disabled,hidden:button.hidden,caption:button.querySelector('.frog-action-caption')?.textContent,qHidden:button.querySelector('.frog-action-key')?.hidden})),
  };
 });
}
const oneOnFootReticle=s=>!!s.reticle&&!s.legacyGuide&&!s.legacyReticle&&!s.legacyRing&&!s.pathLength&&!s.artillery.pieces.some(item=>item.visible)&&!s.player.catapultId;
async function fixture(page,{player={x:0,z:6},target=null,view='overview',yaw=Math.PI,pitch=.12}={}){
 await page.mouse.up({button:'left'}).catch(()=>{});await page.mouse.up({button:'right'}).catch(()=>{});
 for(const key of ['w','a','s','d','q','e'])await page.keyboard.up(key).catch(()=>{});
 await page.evaluate(({player,target,view,yaw,pitch})=>{
  const g=window.frogArcade;g.clearInputs();g.releaseMouseLook();g.clearEffects();g.state=structuredClone(window.qaFresh);
  const s=g.state,p=s.actors[0];s.phase='battle';s.intro=0;s.time=30;s.flies.forEach(f=>f.wait=9999);
  Object.assign(p,{...player,face:yaw,aimX:Math.sin(yaw),aimY:0,aimZ:Math.cos(yaw),poseAimYaw:null,poseAiming:false,tongue:9999});
  for(const actor of s.actors.slice(1))Object.assign(actor,{ko:true,eliminated:true,respawnTime:9999});
  if(target)Object.assign(s.actors[1],{...target,ko:false,eliminated:false,shot:9999,idle:9999,tongue:9999,kickCooldown:9999,aiShotReady:9999,machineTimer:9999,face:0,aimX:0,aimY:0,aimZ:1});
  for(const guard of s.guards||[])Object.assign(guard,{health:0,mode:'gone'});
  g.viewMode=view;g.cameraYaw=yaw;g.cameraPitch=pitch;g.aim={x:p.aimX,z:p.aimZ};g.mouseControl=true;g.cameraReady=false;g.shake=0;g.buildActors();
  g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');g.$('arcade-hud').hidden=false;
  g.calloutUntil=-1;g.hitConfirmUntil=0;g.lastPlayerHit=null;g.accumulator=0;g.updateCameraPose(0);g.updateHUD();window.qaEvents=[];
 },{player,target,view,yaw,pitch});
 await page.waitForFunction(()=>!document.pointerLockElement);await frames(page,2);
}
async function pointAt(page,{x,z,y,body=.45}){
 const point=await page.evaluate(({x,z,y,body})=>{const g=window.frogArcade;return g.project(x,y??g.ground(x,z)+body,z);},{x,z,y,body});
 if(!point.visible||point.x<0||point.x>1280||point.y<0||point.y>800)throw new Error('Fixture aim point is outside viewport: '+JSON.stringify(point));
 await page.mouse.move(point.x,point.y);await frames(page,2);return point;
}
async function pulse(page,button='left',count=1){await page.mouse.down({button});await frames(page,count);await page.mouse.up({button});}
async function keyPulse(page,key){await page.keyboard.down(key);await frames(page,1);await page.keyboard.up(key);}
async function setLockOption(page,value){
 await page.keyboard.press('Escape');await page.locator('#settings-button').click();await page.locator('#mouse-target-lock').selectOption(value);
 const state=await page.evaluate(()=>({setting:window.frogArcade.settings.mouseTargetLock,saved:JSON.parse(localStorage.getItem('frog-arcade-settings-v1')).mouseTargetLock}));
 check(state.setting===(value==='on')&&state.saved===(value==='on'),`settings: target lock ${value} is applied and persisted`,state);
 await page.locator('#settings-back').click();await page.locator('#play-button').click();await frames(page,2);
}
async function startup(page){
 let s=await snapshot(page);check(s.version===version,'the requested release is running',s.version);
 check(s.mouseTargetLock===false,'mouse target lock is off by default',s.mouseTargetLock);
 check(oneOnFootReticle(s),'new round has one on-foot crosshair and no catapult guide',s);
 await page.keyboard.press('Escape');await page.locator('#play-button').click();await frames(page,2);s=await snapshot(page);
 check(s.running&&oneOnFootReticle(s),'resume restores one crosshair without a stale catapult guide',s);
 await page.keyboard.press('c');await frames(page,2);s=await snapshot(page);
 check(s.view==='overview'&&oneOnFootReticle(s),'switching to top down keeps the single crosshair',s);await capture(page,'startup-topdown-single-reticle');
}
async function stance(page){
 await fixture(page,{player:{x:0,z:6},yaw:0});await pointAt(page,{x:7,z:6});
 await pulse(page);await frames(page,24);const released=await snapshot(page),yaw=released.player.poseAimYaw;
 check(released.shots===1&&Number.isFinite(yaw)&&Math.abs(angle(released.visualYaw,yaw))<.02,'native shot release retains the deliberate facing',released);
 await page.mouse.move(-10,-10);await frames(page,1);check(!(await snapshot(page)).mouse.valid,'native pointer leave ends deliberate pointer aiming');
 await page.keyboard.down('a');const moving=await frames(page,25);await page.keyboard.up('a');await frames(page,24);const after=await snapshot(page);
 check(moving.every(s=>Math.abs(angle(s.visualYaw,yaw))<.025)&&Math.abs(angle(after.visualYaw,yaw))<.025,'strafe, hop and landing retain the last shot direction',{yaw,first:moving[0],last:moving.at(-1),after});
 check(Math.hypot(after.player.x-released.player.x,after.player.z-released.player.z)>2&&Math.max(...moving.map(s=>s.height))>.5,'stance check includes actual lateral displacement and running hops',{released:released.player,after:after.player,maxHop:Math.max(...moving.map(s=>s.height))});
 await capture(page,'overview-retained-shot-stance');
 await pointAt(page,{x:after.player.x-5,z:after.player.z});await frames(page,20);const changed=await snapshot(page);
 check(Math.abs(angle(changed.visualYaw,yaw))>2.5&&changed.shots===1,'new deliberate pointer aim changes stance without a new shot',changed);
}
async function kickReadiness(page){
 await fixture(page,{player:{x:0,z:4},target:{x:1.8,z:4,dizzy:5,dizzyTime:0}});await pointAt(page,{x:1.8,z:4,body:.42});
 await pulse(page,'left',5);let s=await snapshot(page),target=s.actors.find(a=>a.id==='rival-1'),badge=s.kickBadges.find(a=>a.id==='rival-1');
 check(s.shots===1&&target.dizzyTime>0&&target.invuln>0,'native shot creates a freshly dizzy opponent in transient damage immunity',{shots:s.shots,target});
 check(badge&&!badge.disabled&&badge.state==='ready'&&!badge.qHidden,'Q and contextual badge are ready despite brief post-hit immunity',badge);await capture(page,'q-ready-immediately-after-shot');
 await keyPulse(page,'q');await frames(page,25);s=await snapshot(page);target=s.actors.find(a=>a.id==='rival-1');
 const events=await page.evaluate(()=>window.qaEvents.filter(e=>e.type==='kick'||e.type==='hit'));
 check(target.finishHits===1&&!target.ko&&events.filter(e=>e.type==='kick').length===1,'one native Q press deals one finishing hit and preserves the three-hit KO rule',{target,events});
 check(s.player.kickCooldown>0&&s.kickBadges.find(a=>a.id==='rival-1')?.state==='cooldown','the subsequent gray state explains the real kick cooldown',s.kickBadges);await capture(page,'q-after-one-finishing-kick');
}
async function lockControls(page){
 await fixture(page,{target:{x:0,z:0}});await pointAt(page,{x:0,z:0});await page.mouse.down({button:'right'});await frames(page,8);let s=await snapshot(page);
 check(!s.targetLock.targetId&&s.shots===0,'default RMB does not acquire a target or fire',s.targetLock);await page.mouse.up({button:'right'});
 await setLockOption(page,'on');await fixture(page,{target:{x:0,z:0}});await pointAt(page,{x:0,z:0});
 await page.mouse.down({button:'right'});await frames(page,3);s=await snapshot(page);
 check(s.targetLock.held&&s.targetLock.targetId==='rival-1'&&s.targetLock.current==='rival-1','optional held RMB acquires the visible nearby opponent',s.targetLock);
 check(s.shots===0,'holding RMB alone never fires',s.shots);await capture(page,'optional-held-lock-before-firing');
 await pulse(page);await frames(page,24);s=await snapshot(page);
 check(s.shots===1&&s.hits===1&&s.targetLock.held&&s.targetLock.targetId==='rival-1','LMB fires exactly once while RMB retains the same target',{shots:s.shots,hits:s.hits,lock:s.targetLock});
 await page.mouse.up({button:'right'});await frames(page,2);s=await snapshot(page);
 check(!s.targetLock.held&&!s.targetLock.targetId&&!s.targetLock.current,'releasing RMB immediately clears the lock',s.targetLock);
 await fixture(page,{target:{x:0,z:0}});await pointAt(page,{x:0,z:0});await page.mouse.down({button:'right'});await frames(page,2);
 await page.evaluate(()=>{window.frogArcade.state.actors[1].ko=true;window.frogArcade.state.actors[1].respawnTime=9999;});await frames(page,2);s=await snapshot(page);
 check(!s.targetLock.targetId&&!s.targetLock.current,'KO of the held target releases it without an automatic replacement',s.targetLock);await page.mouse.up({button:'right'});
 await fixture(page,{target:{x:0,z:0}});await pointAt(page,{x:0,z:0});await page.mouse.down({button:'right'});await frames(page,2);
 await page.evaluate(()=>{const g=window.frogArcade;Object.assign(g.state.actors[0],{x:0,z:20.5});Object.assign(g.state.actors[1],{x:5,z:20.5});g.cameraReady=false;});await frames(page,2);s=await snapshot(page);
 check(!s.targetLock.targetId&&!s.targetLock.current,'moving behind a real house wall releases the held target',s.targetLock);await page.mouse.up({button:'right'});
 await setLockOption(page,'off');
}
async function chaseFraming(page){
 await fixture(page,{view:'chase3d',player:{x:0,z:8}});await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(page,25);
 await page.keyboard.down('w');await page.keyboard.down('a');const samples=await frames(page,45,{bodyBounds:true});await page.keyboard.up('w');await page.keyboard.up('a');
 const blocked=s=>s.body&&s.reticle&&s.reticle.x>=s.body.left-12&&s.reticle.x<=s.body.right+12&&s.reticle.y>=s.body.top-12&&s.reticle.y<=s.body.bottom+12;
 check(samples.every(s=>s.reticle&&near(s.reticle.x,640)&&near(s.reticle.y,400)),'third person keeps its crosshair at screen center during native mouse capture and movement');
 check(samples.every(s=>s.bodyVisible&&s.body&&!blocked(s)),'the rendered frog body leaves the crosshair clear throughout running hops',{first:samples[0],peak:samples.reduce((a,b)=>a.height>b.height?a:b),blocked:samples.filter(blocked)});
 check(Math.max(...samples.map(s=>s.height))>.5,'third-person framing covers the peak of the actual hop animation');await capture(page,'third-person-shoulder-running-hop');
 await frames(page,24);await capture(page,'third-person-shoulder-idle');
 const before=await page.evaluate(()=>window.frogArcade.cameraYaw);await page.mouse.move(760,400);await frames(page,2);const after=await page.evaluate(()=>window.frogArcade.cameraYaw);
 check(Math.abs(angle(after,before))>.3&&Math.abs(angle(after,before))<.8,'a modest native mouse movement turns the view promptly',{before,after,turn:angle(after,before)});
 check(oneOnFootReticle(await snapshot(page)),'third-person mouse look keeps one reticle and no artillery guide');
}
async function floorsAndCatapult(page){
 await fixture(page,{view:'chase3d',player:{x:-8.5,z:17.9},pitch:.3});await capture(page,'catapult-room-floor-before-moving');
 await page.keyboard.down('a');await frames(page,8);await page.keyboard.up('a');await capture(page,'catapult-room-floor-mid-movement');
 await page.keyboard.down('d');await frames(page,16);await page.keyboard.up('d');await capture(page,'catapult-room-floor-opposite-view');
 const floors=await page.evaluate(()=>{const g=window.frogArcade,items=[];g.scene.traverse(object=>{if(['catapult-floor-at-operator-height','house-floor-at-actor-height'].includes(object.name))items.push({name:object.name,type:object.geometry.type,groups:object.geometry.groups.length,vertices:object.geometry.attributes.position.count});});return items;});
 check(floors.length===6&&floors.every(item=>item.groups===2),'all three house floors and catapult decks use the shared partitioned plank surface',floors);
 await fixture(page,{player:{x:-8.5,z:18.1}});await keyPulse(page,'e');await frames(page,3);let s=await snapshot(page);
 check(s.player.catapultId==='catapult-player','native E mounts the nearby player catapult',s.player);
 await pointAt(page,{x:-8.5,z:27,body:.1});await frames(page,2);s=await snapshot(page);
 check(s.artillery.line&&s.artillery.landing&&s.artillery.aimActive&&!s.reticle,'mounted catapult shows its curved preview and landing marker without the fly crosshair',s.artillery);await capture(page,'catapult-curved-trajectory-and-landing');
 const ammo=s.player.ammo;await pulse(page);await frames(page,2);s=await snapshot(page);
 check(s.shells===1&&s.player.ammo===ammo,'native mounted LMB launches a stone without consuming fly ammunition',{shells:s.shells,ammo:s.player.ammo});await capture(page,'catapult-fired-stone-reloading');
 await keyPulse(page,'e');await frames(page,3);s=await snapshot(page);
 check(oneOnFootReticle(s)&&!s.artillery.aimActive,'dismount clears every artillery preview piece and restores the on-foot reticle',s);
 await page.keyboard.press('Escape');await page.locator('#new-round-button').click();await frames(page,3);s=await snapshot(page);
 check(s.running&&oneOnFootReticle(s),'a fresh round after catapult use has no lingering trajectory or landing markers',s);await capture(page,'new-round-no-stale-catapult-guide');
}

async function highQualityReview(page){
 // Select production high quality through the real settings interface. The
 // same scene, materials and object geometry are used in all review images.
 await page.keyboard.press('Escape');await page.locator('#settings-button').click();await page.locator('#quality').selectOption('high');
 const quality=await page.evaluate(()=>({active:window.frogArcade.settings.quality,saved:JSON.parse(localStorage.getItem('frog-arcade-settings-v1')).quality}));
 check(quality.active==='high'&&quality.saved==='high','visual review selects and persists high graphics through the settings UI',quality);
 await page.locator('#settings-back').click();await page.locator('#play-button').click();await frames(page,2);

 // The native movement sample keeps the normal gameplay lens and shoulder
 // camera, allowing comparison with the low-quality running screenshots.
 await fixture(page,{view:'chase3d',player:{x:0,z:8}});await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(page,25);
 await page.keyboard.down('w');await page.keyboard.down('d');const first=await frames(page,8,{bodyBounds:true});await capture(page,'high-quality-native-running-hop');
 const later=await frames(page,20,{bodyBounds:true});await page.keyboard.up('w');await page.keyboard.up('d');await capture(page,'high-quality-native-movement-followthrough');
 const moving=[...first,...later],start=moving[0],end=moving.at(-1),blocked=s=>s.body&&s.reticle&&s.reticle.x>=s.body.left-12&&s.reticle.x<=s.body.right+12&&s.reticle.y>=s.body.top-12&&s.reticle.y<=s.body.bottom+12;
 check(Math.hypot(end.x-start.x,end.z-start.z)>2&&Math.max(...moving.map(s=>s.height))>.5&&moving.every(s=>s.bodyVisible&&s.body&&s.reticle&&!blocked(s)),
  'high-quality native movement includes real travel and hopping with clear aim',{start,end,maxHop:Math.max(...moving.map(s=>s.height)),blocked:moving.filter(blocked)});
 report.reviewViews.push({name:'high-quality-native-running-hop',quality:'high',camera:'ordinary gameplay third-person camera',nativeInput:'W+D'});

 // A separate, labelled review camera makes the entire map assessable. It is
 // restored by the next fixture and is not a change to player camera settings.
 await page.setViewportSize({width:1600,height:1100});await fixture(page,{player:{x:0,z:0},view:'overview'});
 const map=await page.evaluate(()=>{
  const g=window.frogArcade,radius=g.inspect().battleground.radius;
  g.camera.position.set(0,104,.001);g.camera.lookAt(0,0,0);g.camera.updateMatrixWorld();g.focus.set(0,0,0);
  g.basesView.update(0);g.artilleryView.update(0);g.battlegroundView?.update?.(0);g.renderer.render(g.scene,g.camera);g.drawLabels();
  const boundary=Array.from({length:32},(_,index)=>{const angle=index*Math.PI/16,x=Math.sin(angle)*(radius+2),z=Math.cos(angle)*(radius+2);return g.project(x,g.ground(x,z),z);});
  return {quality:g.settings.quality,radius,width:g.w,height:g.h,camera:g.camera.position.toArray(),fov:g.camera.fov,boundary};
 });
 check(map.quality==='high'&&map.boundary.every(p=>p.visible&&p.x>30&&p.x<map.width-30&&p.y>90&&p.y<map.height-30),'high-quality full-map review fits the complete arena and its banks',map);
 report.reviewViews.push({name:'high-quality-full-map-topdown',quality:'high',camera:'elevated full-map review camera',position:map.camera,fov:map.fov,viewport:{width:map.width,height:map.height}});
 await capture(page,'high-quality-full-map-topdown');await page.setViewportSize({width:1280,height:800});

 // Face the central arena from the real mounted machine. A moderately wider
 // lens keeps the full parabola and exact landing boundary inside the image.
 const target={x:2,z:-1.5},yaw=Math.atan2(target.x+8.5,target.z-16);
 const originalLens=await page.evaluate(()=>{const g=window.frogArcade;return {fov:g.settings.cameraFov,zoom:g.settings.cameraZoom};});
 try{
  await page.evaluate(()=>{const g=window.frogArcade;g.settings.cameraFov=66;g.settings.cameraZoom=1.15;g.camera.fov=66;g.camera.updateProjectionMatrix();});
  await fixture(page,{player:{x:-8.5,z:18.1},view:'chase3d',yaw,pitch:.22});await keyPulse(page,'e');await frames(page,25);
  await pointAt(page,{...target,body:.1});await frames(page,2);
  let guide=await page.evaluate(()=>{
   const g=window.frogArcade,v=g.artilleryView,attribute=v.previewLine.geometry.attributes.position,points=[];
   for(let i=0;i<attribute.count;i++)points.push(g.project(attribute.getX(i),attribute.getY(i),attribute.getZ(i)));
   const center=v.landingMarker.position,radius=v.landingMarker.scale.x;
   const edge=Array.from({length:16},(_,i)=>g.project(center.x+Math.sin(i*Math.PI/8)*radius,center.y,center.z+Math.cos(i*Math.PI/8)*radius));
   return {state:v.previewState,quality:g.settings.quality,view:g.viewMode,catapult:g.state.actors[0].catapultId,points,edge,pieces:v.previewPieces.map(p=>({name:p.name,visible:p.visible})),fov:g.camera.fov,zoom:g.settings.cameraZoom};
  });
  const fits=p=>p.visible&&p.x>20&&p.x<1260&&p.y>95&&p.y<760;
  // Terrain height can alter the apex projection slightly. If needed, widen
  // only this review lens, then re-aim with native mouse movement at the same
  // physical landing point; do not move the trajectory or its landing marker.
  if(!guide.points.every(fits)||!guide.edge.every(fits)){
   await page.evaluate(()=>{const g=window.frogArcade;g.settings.cameraFov=74;g.camera.fov=74;g.camera.updateProjectionMatrix();g.cameraReady=false;g.updateCameraPose(0);});
   await pointAt(page,{...target,body:.1});await frames(page,2);
   guide=await page.evaluate(()=>{
    const g=window.frogArcade,v=g.artilleryView,a=v.previewLine.geometry.attributes.position,points=[];
    for(let i=0;i<a.count;i++)points.push(g.project(a.getX(i),a.getY(i),a.getZ(i)));
    const c=v.landingMarker.position,r=v.landingMarker.scale.x,edge=Array.from({length:16},(_,i)=>g.project(c.x+Math.sin(i*Math.PI/8)*r,c.y,c.z+Math.cos(i*Math.PI/8)*r));
    return {state:v.previewState,quality:g.settings.quality,view:g.viewMode,catapult:g.state.actors[0].catapultId,points,edge,pieces:v.previewPieces.map(p=>({name:p.name,visible:p.visible})),fov:g.camera.fov,zoom:g.settings.cameraZoom};
   });
  }
  check(guide.quality==='high'&&guide.view==='chase3d'&&guide.catapult==='catapult-player'&&guide.state==='ready'&&guide.points.every(fits)&&guide.edge.every(fits)&&guide.pieces.every(p=>p.visible),
   'high-quality third-person catapult review shows the ready arc, beads and entire landing circle on screen',guide);
  report.reviewViews.push({name:'high-quality-catapult-ready-complete-trajectory',quality:'high',camera:'production third-person rig with review lens and zoom',fov:guide.fov,zoom:guide.zoom,yaw,pitch:.22,nativeInput:'E mount and mouse aim',landingRequested:target});
  await capture(page,'high-quality-catapult-ready-complete-trajectory');await frames(page,10);await capture(page,'high-quality-catapult-ready-flowing-beads');
 }finally{
  await page.evaluate(({fov,zoom})=>{const g=window.frogArcade;g.settings.cameraFov=fov;g.settings.cameraZoom=zoom;g.camera.fov=fov;g.camera.updateProjectionMatrix();g.cameraReady=false;},originalLens);
 }
}

let context;
try{
 context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});
 await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,touchFireMode:'manual'})));
 const page=await context.newPage();page.setDefaultTimeout(20000);page.on('pageerror',e=>report.errors.push(e.stack||e.message));page.on('console',message=>{if(message.type()==='error'){const location=message.location();report.errors.push('console: '+message.text()+(location.url?' @ '+location.url+':'+location.lineNumber:''));}});
 page.on('response',response=>{if(response.status()>=400){const failure={status:response.status(),url:response.url()};report.resourceFailures.push(failure);report.errors.push('HTTP '+failure.status+': '+failure.url);}});
 await page.route(new URL('/favicon.ico',url).href,route=>route.fulfill({status:204,body:''}));
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(v=>window.__FROG__?.version===v,version,{timeout:180000});
 await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=structuredClone(g.state);window.qaEvents=[];const consume=g.consumeEvents.bind(g);g.consumeEvents=function(){window.qaEvents.push(...this.state.events.map(event=>({...event})));return consume();};});
 const assets=await page.evaluate(()=>({js:[...document.scripts].filter(script=>script.type==='module'&&script.src).map(script=>script.src),css:[...document.querySelectorAll('link[rel="stylesheet"]')].map(link=>link.href)}));
 for(const [kind,urls] of Object.entries(assets))for(const asset of urls){const response=await page.request.get(asset),body=await response.body();report[kind==='js'?'bundles':'stylesheets'].push({url:asset,status:response.status(),bytes:body.length,sha256:createHash('sha256').update(body).digest('hex')});}
 check(report.bundles.length>0&&report.bundles.every(item=>item.status===200&&item.bytes>0),'dynamic production bundles were fetched and hashed',report.bundles);
 await page.locator('#new-round-button').click();await frames(page,3);
 for(const [name,run] of [['startup',startup],['stance',stance],['kick readiness',kickReadiness],['optional lock',lockControls],['third-person framing',chaseFraming],['floors and catapult',floorsAndCatapult],['high-quality visual review',highQualityReview]]){
  try{await run(page);}catch(error){const detail=error.stack||String(error);report.errors.push(`${name}: ${detail}`);console.error(`${name}: ${detail}`);await capture(page,'failure-'+name.replaceAll(' ','-')).catch(()=>{});}await save();
 }
 check(report.errors.length===0,'no browser runtime or harness errors',report.errors);
}catch(error){report.errors.push(error.stack||String(error));console.error(error);}finally{
 await context?.close();await browser.close();report.ok=!report.failures.length&&!report.errors.length;await save();console.log(JSON.stringify({ok:report.ok,checks:report.checks.length,failures:report.failures.length,errors:report.errors.length,report:path.join(out,'report.json')}));
}
process.exitCode=report.ok?0:1;
