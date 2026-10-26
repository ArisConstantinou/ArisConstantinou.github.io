import {createRequire} from 'node:module';
import fs from 'node:fs/promises';

// Direct shooter camera acceptance. Desktop uses native Pointer Lock and real
// Chromium mouse/key events; mobile uses browser touch input. Fixtures only
// isolate actors/round state. No synthetic mouse deltas or camera helper calls.
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const expected=process.env.EXPECTED_VERSION||'4.3.5';
const out=process.env.OUT_DIR||'qa/arcade-435-direct-evidence';
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');url.searchParams.set('test','1');
await fs.mkdir(out,{recursive:true});
const report={version:expected,mode:'direct-shooter-acceptance',checks:[],failures:[],errors:[],samples:[],screenshots:[],bundles:[],stylesheets:[],limitations:[
  'Full Chromium in modern headless mode with software WebGL; mobile touch is emulated, not a physical Safari/iPhone test.',
  'Native Pointer Lock is acquired through real clicks; mouse movement, buttons and keys use browser automation input rather than synthetic DOM events.',
  'The installed old headless-shell produces incorrect cursor-warp deltas under Pointer Lock, so this harness explicitly uses full Chromium.',
  'Fixtures isolate actors and combat. GPU drawing is skipped between evidence frames; screenshots use the production scene and HUD.',
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok&&detail?' '+JSON.stringify(detail):''}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{channel:'chromium'}),args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();let activePage;const mousePositions=new WeakMap();
const angleDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));

async function attach(page){
  await page.waitForFunction(version=>window.__FROG__?.version===version,expected,{timeout:180000});
  await page.evaluate(()=>{
    const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.__qaLabelArcs=[];window.__qaPointerEvents=[];
    const arc=g.labelCtx.arc;g.labelCtx.arc=function(x,y,r,...rest){if(r>=6&&r<=9)window.__qaLabelArcs.push({x,y,r,color:this.strokeStyle,width:this.lineWidth});return arc.call(this,x,y,r,...rest);};
    document.addEventListener('pointermove',e=>{if(e.pointerType==='mouse')window.__qaPointerEvents.push({dx:e.movementX,dy:e.movementY,buttons:e.buttons,locked:!!document.pointerLockElement,trusted:e.isTrusted});});
  });
  for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
  for(const href of await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)))if(!report.stylesheets.includes(href))report.stylesheets.push(href);
}
async function clickPlay(page,mobile=false,{park=true}={}){
  if(mobile)await page.locator('#play-button').tap();else await page.locator('#play-button').click();
  if(!mobile){await page.waitForFunction(()=>document.pointerLockElement===document.getElementById('arcade-world'));if(park){await page.mouse.move(720,450);mousePositions.set(page,{x:720,y:450});}}
}
async function boot(viewport={width:1440,height:900},mobile=false){
  const context=await browser.newContext({viewport,deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
  // Exercise migration from a previously saved manual-camera preference.
  await context.addInitScript(()=>{if(!localStorage.getItem('frog-arcade-settings-v1'))localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,cameraZoom:1,cameraFov:52,cameraAutoRotate:false}));});
  const page=await context.newPage();activePage=page;page.setDefaultTimeout(120000);page.on('pageerror',e=>report.errors.push(e.stack||e.message));
  await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await attach(page);await clickPlay(page,mobile,{park:false});await frames(page,2);
  if(!mobile){
    const stock=await page.evaluate(()=>{const g=window.frogArcade,home=[...g.basesView.bases.values()].find(v=>v.definition.owner==='player');return {obstructed:home.stockObstructed,bodyVisible:g.models[0].group.visible,stockOpacities:home.cabin.children.filter(o=>o.isMesh).flatMap(o=>[o.material].flat().map(m=>m.opacity)),supplyVisible:home.supply.visible,markerVisible:home.marker.visible};});
    report.samples.push({name:'actual-default-start',camera:await camera(page),stock});record(stock.obstructed&&stock.bodyVisible&&stock.stockOpacities.every(n=>n<.5)&&stock.supplyVisible&&stock.markerVisible,'At the actual spawn, the obstructing barrel fades while the frog, reserve flies and storage marker remain visible',stock);
    await capture(page,'desktop-default-start');await page.mouse.move(720,450);mousePositions.set(page,{x:720,y:450});
  }
  await page.evaluate(()=>{window.__qaFresh=JSON.parse(JSON.stringify(window.frogArcade.state));});
  return {context,page};
}
async function frames(page,n=1,{trace=false,draw=true}={}){
  return page.evaluate(({n,trace,draw})=>{
    const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels,samples=[];
    try{for(let i=0;i<n;i++){
      g.renderer.render=draw&&i===n-1?render:()=>{};g.drawLabels=draw&&i===n-1?labels:()=>{};window.__qaLabelArcs=[];
      g.frame(g.last+1000/60+.001);
      if(trace){const p=g.state.actors[0],target=g.mouse?.target;samples.push({time:g.state.time,actor:{x:p.x,z:p.z,height:p.height,face:p.face,aimX:p.aimX,aimY:p.aimY,aimZ:p.aimZ,aim3D:p.aim3D,hopX:p.hopX,hopZ:p.hopZ},camera:{yaw:g.cameraYaw,pitch:g.cameraPitch,bearing:Math.atan2(g.focus.x-g.camera.position.x,g.focus.z-g.camera.position.z),position:g.camera.position.toArray()},aim:target?{projected:g.project(target.x,target.y,target.z),direction:{...g.mouse.direction}}:null,shots:g.state.stats.shots,events:g.state.events.map(e=>({...e})),bullets:g.state.bullets.filter(b=>b.owner==='player').map(b=>({...b,mesh:g.bulletMeshes.get(b.id)?.position.toArray()}))});}
    }}finally{g.renderer.render=render;g.drawLabels=labels;}
    return samples;
  },{n,trace,draw});
}
async function fixture(page,{x=0,z=6,pitch=.18,keepCamera=false,mobile=false}={}){
  if(!mobile){await page.mouse.up({button:'left'});await page.mouse.move(720,450);mousePositions.set(page,{x:720,y:450});}
  await page.evaluate(({x,z,pitch,keepCamera})=>{
    const g=window.frogArcade;g.clearInputs();g.clearEffects();g.state=JSON.parse(JSON.stringify(window.__qaFresh));const s=g.state;
    s.phase='battle';s.intro=0;s.time=30;
    Object.assign(s.actors[0],{x,z,ammo:60,load:1,face:Math.PI,aimX:0,aimY:0,aimZ:-1,hop:0,height:0,idle:0,shot:0,hit:0,impulseX:0,impulseZ:0});
    for(const a of s.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});
    g.buildActors();g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');g.calloutUntil=-1;g.hitConfirmUntil=0;g.lastPlayerHit=null;
    if(!keepCamera){g.cameraYaw=Math.PI;g.cameraPitch=pitch;g.viewMode='chase3d';g.cameraReady=false;}
    g.updateHUD();window.__qaPointerEvents=[];
  },{x,z,pitch,keepCamera});
  await frames(page,2);
}
async function camera(page){return page.evaluate(()=>{const g=window.frogArcade;return {yaw:g.cameraYaw,pitch:g.cameraPitch,bearing:Math.atan2(g.focus.x-g.camera.position.x,g.focus.z-g.camera.position.z),mode:g.viewMode,position:g.camera.position.toArray(),focus:g.focus.toArray(),zoom:g.settings.cameraZoom,fov:g.camera.fov,settings:{...g.settings},locked:document.pointerLockElement===g.renderer.domElement,running:g.running,gameMode:g.mode,dragging:!!g.cameraDrag,screen:g.currentAimScreen};});}
async function look(page,dx,dy,{steps=1}={}){const at=mousePositions.get(page)||{x:720,y:450},next={x:at.x+dx,y:at.y+dy};await page.mouse.move(next.x,next.y,{steps});mousePositions.set(page,next);}
async function capture(page,name){await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);console.log(`SCREENSHOT ${path}`);await save();}

async function lockAndControls(page){
  const clicked=await camera(page);record(clicked.locked&&clicked.running,'Clicking Play acquires native Pointer Lock and enters gameplay',clicked);
  await fixture(page);const start=await camera(page);
  record(await page.locator('#camera-follow').count()===0,'Conflicting automatic/manual camera modes are removed from the menu');
  record(start.screen&&Math.hypot(start.screen.x-720,start.screen.y-450)<.1,'The aiming reticle starts at the center of the view');
  await look(page,90,-35,{steps:6});await frames(page,2);const aimed=await camera(page),events=await page.evaluate(()=>window.__qaPointerEvents);
  record(angleDelta(aimed.yaw,start.yaw)<-.1&&aimed.pitch<start.pitch-.04,'Unbuttoned mouse movement directly turns yaw and pitch without right-click',{start,aimed});
  record(events.length>0&&events.every(e=>e.trusted&&e.locked)&&events.some(e=>e.dx>0)&&events.some(e=>e.dy<0),'Direct look is driven by trusted native Pointer Lock movement events',events);
  await frames(page,90,{draw:false});const stopped=await camera(page);record(Math.abs(angleDelta(stopped.yaw,aimed.yaw))<1e-8&&Math.abs(stopped.pitch-aimed.pitch)<1e-8,'When mouse motion stops, the camera does not keep orbiting or recenter');
  await page.keyboard.down('w');await page.mouse.down({button:'left'});await frames(page,8);await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.pointerLockElement);await page.keyboard.up('w');await page.mouse.up({button:'left'});const paused=await camera(page);
  const released=await page.evaluate(()=>({keys:window.frogArcade.keys.size,fire:window.frogArcade.actions.fire,mode:window.frogArcade.mode}));
  record(!paused.locked&&!paused.running&&released.mode==='pause'&&!released.keys&&!released.fire,'Escape releases native Pointer Lock, pauses, and clears held movement/fire',{paused,released});
  await clickPlay(page);record((await camera(page)).locked&&(await camera(page)).running,'Clicking Resume reacquires native Pointer Lock');
  await fixture(page);await page.evaluate(()=>document.exitPointerLock());await page.waitForFunction(()=>!window.frogArcade.running);record(!(await camera(page)).running,'Losing Pointer Lock through the browser pauses the game');await clickPlay(page);
}
async function movement(page){
  for(const [key,axis,sign] of [['w','z',-1],['s','z',1],['a','x',-1],['d','x',1]]){
    await fixture(page);const before=await camera(page);await page.keyboard.down(key);const trail=await frames(page,55,{trace:true});await page.keyboard.up(key);const end=trail.at(-1),amount=(end.actor[axis]-(axis==='z'?6:0))*sign;
    report.samples.push({name:`movement-${key}`,before,trail});
    record(amount>4,`${key.toUpperCase()} moves in the expected screen-relative direction`,{end:end.actor,amount});
    record(trail.every(t=>Math.abs(angleDelta(t.camera.yaw,before.yaw))<1e-8&&Math.abs(t.camera.pitch-before.pitch)<1e-8),`${key.toUpperCase()} alone never rotates the camera`);
    record(Math.hypot(...end.camera.position.map((v,i)=>v-before.position[i]))>2,`${key.toUpperCase()} still makes the camera follow the frog's position`);
  }
  await fixture(page);const before=await camera(page);await page.keyboard.down('w');const trail=[];
  for(let i=0;i<16;i++){await look(page,8,0);trail.push(...await frames(page,4,{trace:true,draw:false}));}
  await page.keyboard.up('w');await frames(page,1);const moving=trail.filter(t=>Math.hypot(t.actor.hopX,t.actor.hopZ)>.1),alignment=moving.map(t=>(t.actor.hopX*Math.sin(t.camera.bearing)+t.actor.hopZ*Math.cos(t.camera.bearing))/Math.hypot(t.actor.hopX,t.actor.hopZ));
  report.samples.push({name:'W-follows-deliberate-mouse-turn',before,trail});
  record(Math.abs(angleDelta(trail.at(-1).camera.yaw,before.yaw))>.25&&alignment.length>20&&Math.min(...alignment)>.995,'Holding W immediately follows a deliberate mouse turn without a frozen movement basis',{minimumAlignment:Math.min(...alignment),end:trail.at(-1)});
}
async function simultaneousFire(page){
  await fixture(page);const before=await camera(page);await page.mouse.down({button:'left'});const trail=[];
  for(let i=0;i<12;i++){await look(page,8,-4,{steps:2});trail.push(...await frames(page,6,{trace:true,draw:false}));}
  await frames(page,1);const aimed=await camera(page),end=trail.at(-1),events=await page.evaluate(()=>window.__qaPointerEvents);
  report.samples.push({name:'mouse-look-both-axes-while-firing',before,trail,events});
  record(end.shots>=7&&angleDelta(aimed.yaw,before.yaw)<-.18&&aimed.pitch<before.pitch-.08,'Holding left-click fires repeatedly while the same mouse freely turns both camera axes',{shots:end.shots,before,aimed});
  record(events.some(e=>e.buttons===1&&e.dx!==0&&e.dy!==0)&&!aimed.dragging,'Actual left-button mouse motion aims and fires without entering a separate camera-drag mode');
  const errors=trail.filter(t=>t.aim).map(t=>Math.hypot(t.aim.projected.x-720,t.aim.projected.y-450));
  record(errors.length===trail.length&&Math.max(...errors)<.5,'The shot target follows the visible center ray in the current frame while the camera turns',{maximumPixelError:Math.max(...errors)});
  const newborn=trail.filter(t=>t.events.some(e=>e.type==='shot'&&e.id==='player')).flatMap(t=>t.bullets.filter(b=>b.life>.632).map(b=>({b,d:t.aim.direction})));
  record(newborn.length>=3&&newborn.every(({b,d})=>Math.hypot(b.dx-d.x,b.dy-d.y,b.dz-d.z)<1e-6),'New projectiles use the same direction as the centered aiming ray',{shots:newborn.length});
  record(aimed.screen&&Math.hypot(aimed.screen.x-720,aimed.screen.y-450)<.1,'The crosshair stays centered during simultaneous aiming and firing');
  const count=end.shots;await frames(page,30);const stationary=await camera(page);record(Math.abs(angleDelta(stationary.yaw,aimed.yaw))<1e-8&&Math.abs(stationary.pitch-aimed.pitch)<1e-8,'Held fire does not turn the camera after mouse movement stops');
  record(await page.evaluate(count=>window.frogArcade.state.stats.shots>count,count),'Held fire continues after mouse movement stops');
  await page.mouse.up({button:'left'});const lastCount=await page.evaluate(()=>window.frogArcade.state.stats.shots);await frames(page,15);record(await page.evaluate(count=>window.frogArcade.state.stats.shots===count,lastCount),'Releasing left-click stops firing');await capture(page,'desktop-direct-look-and-fire');
}
async function viewProbe(page){return page.evaluate(()=>{
  const g=window.frogArcade;g.scene.updateMatrixWorld(true);const ray=new g.mouseRay.constructor(),ndc=g.mouseNdc.clone(),visible=o=>{for(let p=o;p;p=p.parent)if(!p.visible)return false;return true;};
  const rays=[[1000,50],[1300,100],[1100,100],[720,450]].map(([x,y])=>{ray.setFromCamera(ndc.set(x/g.w*2-1,1-y/g.h*2),g.camera);return {pixel:[x,y],hits:ray.intersectObjects(g.scene.children,true).filter(h=>visible(h.object)&&[h.object.material].flat().some(m=>m?.opacity>.1)).slice(0,4).map(h=>({distance:h.distance,point:h.point.toArray(),name:h.object.name,id:h.object.id,instanceId:h.instanceId,parents:[h.object.parent?.name,h.object.parent?.parent?.name]}))};});
  const tongue=g.tongues.get('player');return {camera:g.camera.position.toArray(),focus:g.focus.toArray(),pitch:g.cameraPitch,bodyVisible:g.models[0].group.visible,regressionWalkingHeight:g.world.getSurface(0,9.403583628279666).height,tongue:tongue?{visible:tongue.mesh.visible,id:tongue.mesh.id}:null,rays};
});}
async function elevation(page){
  for(const [name,dy,sign] of [['up',-150,1],['down',80,-1]]){
    await fixture(page);await look(page,0,dy,{steps:8});await frames(page,2);const before=await camera(page),input=await page.evaluate(()=>window.frogArcade.currentInput());
    await page.mouse.down({button:'left'});const trail=await frames(page,10,{trace:true});await page.mouse.up({button:'left'});const bullets=trail.flatMap(t=>t.bullets),impacts=trail.flatMap(t=>t.events).filter(e=>e.type==='splat'&&Number.isFinite(e.dy));
    report.samples.push({name:`direct-${name}-aim`,before,input,trail});
    record(input.ay*sign>.01&&(bullets.some(b=>b.dy*sign>.01)||impacts.some(e=>e.dy*sign>.01)),`Looking ${name} creates a real ${sign>0?'upward':'downward'} shot`,{input,bullets:bullets.slice(0,2),impacts});
    record(bullets.length>0&&bullets.every(b=>Math.abs(Math.hypot(b.dx,b.dy,b.dz)-1)<1e-6&&b.mesh&&Math.abs(b.x-b.mesh[0])<1e-6&&Math.abs(b.y-b.mesh[1])<1e-6&&Math.abs(b.z-b.mesh[2])<1e-6),`${name}: visible flies match the actual three-dimensional trajectory`);
    const visibility=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return {cameraY:g.camera.position.y,ground:g.ground(g.camera.position.x,g.camera.position.z),pitch:g.cameraPitch,actualPitch:Math.atan2(g.camera.position.y-g.focus.y,Math.hypot(g.camera.position.x-g.focus.x,g.camera.position.z-g.focus.z)),actorVisible:g.models[0].group.visible,actor:g.project(p.x,g.ground(p.x,p.z)+p.height+.5,p.z)};});
    record(visibility.cameraY>visibility.ground+.1&&Math.abs(visibility.actualPitch-visibility.pitch)<1e-6,`${name}: camera remains above terrain while preserving the chosen aiming pitch`,visibility);
    if(name==='up'){const probe=await viewProbe(page);report.samples.push({name:'upward-visual-surface-probe',...probe});record(probe.rays.every(r=>r.hits.every(h=>!h.name.startsWith('Veined water lily leaves')||h.distance>.5)),'Upward view stays clear of the close lily underside that previously covered the sky',probe);}
    await capture(page,`desktop-look-${name}`);
  }
}
async function closeView(page){
  await fixture(page);await look(page,0,-600,{steps:12});await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];p.ammo=59;Object.assign(g.state.flies[0],{x:p.x,z:p.z-.4,wait:0});});await frames(page,2);
  const state=await camera(page),probe=await viewProbe(page);report.samples.push({name:'maximum-up-close-camera',camera:state,...probe});
  record(Math.abs(state.pitch+.65)<1e-6,'Direct mouse look reaches the upward pitch limit');
  record(!probe.bodyVisible&&probe.tongue&&!probe.tongue.visible,'At a close upward camera, both the local body and its collection tongue leave the view clear',probe);
  record(state.screen&&Math.hypot(state.screen.x-720,state.screen.y-450)<.1,'The centered reticle remains visible at the maximum upward view');await capture(page,'desktop-maximum-up');
}
async function overview(page){
  await fixture(page);await page.keyboard.press('c');await page.waitForFunction(()=>!document.pointerLockElement);await frames(page,2);const overhead=await camera(page);
  record(overhead.mode==='overview'&&overhead.running&&!overhead.locked,'C opens overview and releases the cursor without pausing gameplay',overhead);
  await page.mouse.move(1100,300);mousePositions.set(page,{x:1100,y:300});await frames(page,2);const target=await camera(page);
  record(target.screen&&Math.hypot(target.screen.x-1100,target.screen.y-300)<.1,'Overview retains free-cursor aiming');
  await page.keyboard.press('c');await page.waitForFunction(()=>document.pointerLockElement===document.getElementById('arcade-world'));await frames(page,2);const returned=await camera(page);
  record(returned.mode==='chase3d'&&returned.locked&&returned.running&&returned.screen&&Math.hypot(returned.screen.x-720,returned.screen.y-450)<.1,'C returns to direct mouse-look and reacquires native Pointer Lock',returned);
}
async function openSettings(page){if(await page.evaluate(()=>window.frogArcade.running))await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.pointerLockElement);await page.locator('#settings-button').click();}
async function leaveSettings(page){await page.locator('#settings-back').click();await clickPlay(page);}
async function preferences(page){
  const samples=[];
  for(const choice of ['min','max']){
    await openSettings(page);await page.locator('#camera-sensitivity').focus();await page.keyboard.press(choice==='min'?'Home':'End');
    const setting=await page.evaluate(()=>window.frogArcade.settings.cameraSensitivity);await leaveSettings(page);await fixture(page);const before=await camera(page);await look(page,40,0);await frames(page,1);const after=await camera(page);samples.push({choice,setting,turn:Math.abs(angleDelta(after.yaw,before.yaw))});
  }
  record(samples[0].setting===.25&&samples[1].setting===2&&samples[0].turn>0&&Math.abs(samples[1].turn/samples[0].turn-8)<.1,'Native sensitivity slider adjusts the same mouse movement from25% to200%',samples);
  await openSettings(page);await page.locator('#camera-zoom').focus();await page.keyboard.press('End');await page.locator('#camera-fov').focus();await page.keyboard.press('End');
  const changed=await camera(page);record(changed.zoom===1.5&&changed.fov===80,'Native zoom and FOV sliders remain independently adjustable',changed);await leaveSettings(page);
  await page.keyboard.press('Escape');await page.reload({waitUntil:'networkidle',timeout:180000});await attach(page);const reloaded=await camera(page);
  record(!reloaded.locked&&reloaded.zoom===1.5&&reloaded.fov===80&&reloaded.settings.cameraSensitivity===2,'Camera preferences persist after reload without capturing the cursor before a user click',reloaded);
  await clickPlay(page);await page.evaluate(()=>{window.__qaFresh=JSON.parse(JSON.stringify(window.frogArcade.state));});await openSettings(page);await page.locator('#camera-reset').click();const reset=await camera(page);record(reset.zoom===1&&reset.fov===52&&reset.settings.cameraSensitivity===1,'Reset restores zoom, FOV and look sensitivity defaults',reset);await leaveSettings(page);
}
async function touchAcceptance(context,page){
  const cdp=await context.newCDPSession(page),entered=await camera(page);record(entered.running&&!entered.locked,'Tapping Play enters touch gameplay without capturing a mouse pointer',entered);await fixture(page,{mobile:true});
  const points=[];for(const [selector,id,xf,yf] of [['#move-stick',1,.5,.15],['#aim-stick',2,.72,.12],['#fire-button',3,.5,.5]]){const r=await page.locator(selector).boundingBox();points.push({id,x:r.x+r.width*xf,y:r.y+r.height*yf});}
  const before=await camera(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});const trail=await frames(page,70,{trace:true});const end=trail.at(-1);report.samples.push({name:'touch-move-look-fire',before,trail});
  record(end.shots>=6&&Math.hypot(end.actor.x,end.actor.z-6)>3&&Math.abs(angleDelta(end.camera.yaw,before.yaw))>.15&&end.camera.pitch<before.pitch-.1,'Touch move, look on both axes, and separate fire operate simultaneously',{before,end});
  record(trail.some(t=>t.actor.aim3D&&Math.abs(t.actor.aimY)>.05)&&trail.flatMap(t=>t.bullets).some(b=>Math.abs(b.dy)>.05),'Touch look now controls real vertical projectile aim');
  const center=await camera(page);record(center.screen&&Math.hypot(center.screen.x-215,center.screen.y-372.5)<.1,'Touch aiming uses the same centered reticle');await capture(page,'portrait-touch-direct-look-and-fire');
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frames(page,1);const released=await camera(page),shots=await page.evaluate(()=>window.frogArcade.state.stats.shots);await frames(page,40);const stopped=await camera(page);
  record(Math.abs(angleDelta(stopped.yaw,released.yaw))<1e-8&&Math.abs(stopped.pitch-released.pitch)<1e-8&&await page.evaluate(count=>window.frogArcade.state.stats.shots===count,shots),'Releasing touch controls stops look and fire without automatic recentering');
  await fixture(page,{mobile:true});const fire=await page.locator('#fire-button').boundingBox(),finger={id:7,x:190,y:280},fireFinger={id:8,x:fire.x+fire.width/2,y:fire.y+fire.height/2},old=await camera(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger,fireFinger]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...finger,x:245,y:245},fireFinger]});const dragging=await frames(page,35,{trace:true});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frames(page,1);const now=await camera(page);
  record(Math.abs(angleDelta(now.yaw,old.yaw))>.15&&now.pitch<old.pitch-.05&&dragging.at(-1).shots>=3,'Dragging the touch world can look on both axes while the separate fire button shoots',{old,now,shots:dragging.at(-1).shots});
  await fixture(page,{mobile:true});const moveBox=await page.locator('#move-stick').boundingBox(),fireBox=await page.locator('#fire-button').boundingBox(),moveFinger={id:11,x:moveBox.x+moveBox.width*.5,y:moveBox.y+moveBox.height*.15},shootFinger={id:12,x:fireBox.x+fireBox.width*.5,y:fireBox.y+fireBox.height*.5},twoBefore=await camera(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[moveFinger,shootFinger]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[moveFinger,{...shootFinger,x:shootFinger.x+35,y:shootFinger.y-25}]});const twoTrail=await frames(page,35,{trace:true});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frames(page,1);const twoAfter=await camera(page),twoEnd=twoTrail.at(-1);
  record(twoEnd.shots>=3&&Math.hypot(twoEnd.actor.x,twoEnd.actor.z-6)>1.5&&angleDelta(twoAfter.yaw,twoBefore.yaw)<-.1&&twoAfter.pitch<twoBefore.pitch-.06,'Two fingers can move, drag on the fire button to look, and keep shooting together',{before:twoBefore,after:twoAfter,shots:twoEnd.shots,actor:twoEnd.actor});
  await page.setViewportSize({width:745,height:430});await page.waitForFunction(()=>window.frogArcade.w===745&&window.frogArcade.h===430);await frames(page,2);await capture(page,'landscape-direct-look');
  const fit=await page.evaluate(()=>['move-stick','aim-stick','fire-button','pause-button','view-button'].map(id=>{const r=document.getElementById(id).getBoundingClientRect();return {id,inside:r.x>=0&&r.y>=0&&r.right<=innerWidth+.5&&r.bottom<=innerHeight+.5};}));record(fit.every(r=>r.inside),'Touch controls remain inside the landscape viewport',fit);
}
try{
  const selected=new Set((process.env.QA_CASES||'lock,movement,fire,elevation,visibility,overview,preferences,touch').split(','));report.selectedCases=[...selected];
  if([...selected].some(name=>name!=='touch')){const desktop=await boot();for(const [name,run] of [['lock',lockAndControls],['movement',movement],['fire',simultaneousFire],['elevation',elevation],['visibility',closeView],['overview',overview],['preferences',preferences]])if(selected.has(name))await run(desktop.page);await desktop.context.close();}
  if(selected.has('touch')){const phone=await boot({width:430,height:745},true);await touchAcceptance(phone.context,phone.page);await phone.context.close();}
  record(report.errors.length===0,'No uncaught browser exceptions',report.errors);report.ok=report.failures.length===0;if(!report.ok)process.exitCode=1;
}catch(error){report.ok=false;report.fatal=error.stack||String(error);process.exitCode=1;console.error(error);if(activePage&&!activePage.isClosed())try{await activePage.screenshot({path:`${out}/fatal.png`,timeout:15000});}catch{}}
finally{await save();await browser.close();}
