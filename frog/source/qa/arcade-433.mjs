import {createRequire} from 'node:module';
import fs from 'node:fs/promises';

// Focused acceptance for full spawns, normal proportions, the clear home route,
// storage alarms and native camera settings. This does not repeat old combat QA.
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const out=process.env.OUT_DIR||'qa/arcade-433-evidence';
const expected=process.env.EXPECTED_VERSION||'4.3.3';
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4173/');url.searchParams.set('test','1');
await fs.mkdir(out,{recursive:true});
const report={version:expected,checks:[],failures:[],errors:[],samples:[],screenshots:[],bundles:[],limitations:[
 'Chromium 134 with software WebGL and emulated touch; no physical iPhone/Safari or loudspeaker assessment.',
 'Keyboard, mouse, native sliders and multitouch use actual browser input. Storage fixtures use the production simulation and event consumer; interruption uses an actual fly projectile.',
 'GPU rendering is skipped only between evidence frames. All captured views use the production scene, camera and HUD.',
]};
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail?{detail}:{})});console.log(`${ok?'PASS':'FAIL'} ${name}${!ok&&detail?' '+JSON.stringify(detail):''}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();let activePage;

async function attach(page){
 await page.waitForFunction(version=>window.__FROG__?.version===version,expected,{timeout:180000});
 await page.evaluate(()=>{
  const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.__qaSounds=[];
  const original=g.sound.play;g.sound.play=function(kind){window.__qaSounds.push({kind,time:g.state.time});return original.call(this,kind);};
 });
 for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
}
async function boot(viewport,mobile=false){
 const context=await browser.newContext({viewport,deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(()=>{if(!localStorage.getItem('frog-arcade-settings-v1'))localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:.35}));});
 const page=await context.newPage();activePage=page;page.setDefaultTimeout(120000);page.on('pageerror',error=>report.errors.push(error.stack||error.message));
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await attach(page);await page.locator('#play-button').click();
 await page.evaluate(()=>{window.__qaFresh=JSON.parse(JSON.stringify(window.frogArcade.state));});
 return {context,page};
}
async function frames(page,n=1){
 return page.evaluate(n=>{
  const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels,trail=[];
  try{
   for(let i=0;i<n;i++){
    g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};
    g.frame(g.last+1000/60+.001);const p=g.state.actors[0];trail.push({x:p.x,z:p.z});
   }
  }finally{g.renderer.render=render;g.drawLabels=labels;}
  return trail;
 },n);
}
async function modelSteps(page,n,input={}){
 await page.evaluate(({n,input})=>{const g=window.frogArcade;for(let i=0;i<n;i++){g.elapsed+=1/60;window.__FROG__.test.step(input,1);}}, {n,input});
}
async function capture(page,name){
 await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;
 await page.screenshot({path});report.screenshots.push(path);console.log(`SCREENSHOT ${path}`);await save();
}
async function camera(page){return page.evaluate(()=>{const g=window.frogArcade;return {zoom:g.settings.cameraZoom,fov:g.camera.fov,yaw:g.cameraYaw,pitch:g.cameraPitch,mode:g.viewMode,distance:g.camera.position.distanceTo(g.focus),position:g.camera.position.toArray(),focus:g.focus.toArray(),time:g.state.time};});}
async function view(page,name,{warning=false}={}){
 const sample=await page.evaluate(()=>{
  const g=window.frogArcade,gl=g.renderer.getContext(),w=gl.drawingBufferWidth,h=gl.drawingBufferHeight,actor=g.models[0].group;
  const read=()=>{g.renderer.render(g.scene,g.camera);const data=new Uint8Array(w*h*4);gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,data);return data;};
  const shown=actor.visible;let withActor,withoutActor;
  try{actor.visible=true;withActor=read();actor.visible=false;withoutActor=read();}finally{actor.visible=shown;g.renderer.render(g.scene,g.camera);}
  let pixels=0,minX=w,minY=h,maxX=0,maxY=0;
  for(let i=0;i<withActor.length;i+=4){const d=Math.abs(withActor[i]-withoutActor[i])+Math.abs(withActor[i+1]-withoutActor[i+1])+Math.abs(withActor[i+2]-withoutActor[i+2]);if(d>32){const x=(i/4)%w,y=h-1-Math.floor(i/4/w);pixels++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}
  const frog={x:minX*innerWidth/w,y:minY*innerHeight/h,w:(maxX-minX+1)*innerWidth/w,h:(maxY-minY+1)*innerHeight/h,pixels};
  const selectors=['.ammo-card','.base-card','#pause-button','#minimap','#view-button','#round-status','#base-status','#move-stick','#aim-stick','#fire-button','#catapult-button','#sabotage-button','#kick-button','#layout-button'];
  const rects=selectors.map(selector=>{const e=document.querySelector(selector),r=e.getBoundingClientRect(),style=getComputedStyle(e);return e.closest('[hidden]')||style.display==='none'||style.visibility==='hidden'||!r.width||!r.height?null:{selector,x:r.x,y:r.y,w:r.width,h:r.height};}).filter(Boolean);
  const overlap=(a,b)=>Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>2&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>2;
  const overlaps=[];for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++)if(overlap(rects[i],rects[j]))overlaps.push([rects[i].selector,rects[j].selector]);
  const coversFrog=rects.filter(r=>overlap(r,frog)).map(r=>r.selector),status=document.getElementById('base-status');
  return {viewport:{width:innerWidth,height:innerHeight},frog,rects,overlaps,coversFrog,warning:{visible:!status.hidden,threat:status.classList.contains('threat'),text:status.textContent,background:getComputedStyle(status).backgroundColor},pitch:g.cameraPitch,ammo:g.state.actors.map(a=>a.ammo)};
 });
 report.samples.push({name,...sample});
 record(sample.frog.pixels>150,`${name}: normal frog remains visibly framed`,sample.frog);
 record(sample.coversFrog.length===0,`${name}: HUD does not cover the frog`,sample.coversFrog);
 record(sample.overlaps.length===0&&sample.rects.every(r=>r.x>=-.5&&r.y>=-.5&&r.x+r.w<=sample.viewport.width+.5&&r.y+r.h<=sample.viewport.height+.5),`${name}: HUD controls fit without overlap`,{overlaps:sample.overlaps,rects:sample.rects});
 if(warning)record(sample.warning.visible&&sample.warning.threat&&sample.warning.text.includes('ΕΠΙΘΕΣΗ ΣΤΗΝ ΑΠΟΘΗΚΗ ΣΟΥ'),`${name}: persistent storage warning is visible`,sample.warning);
 await capture(page,name);return sample;
}
async function spawnCheck(page,name){
 const initial=await page.evaluate(()=>{const g=window.frogArcade;return {actors:g.state.actors.map(a=>({id:a.id,ammo:a.ammo,load:a.load})),caught:g.state.stats.caught,intro:g.state.intro,sounds:window.__qaSounds};});
 record(initial.actors.every(a=>a.ammo===60&&a.load===1)&&initial.caught===0&&initial.intro===20,`${name}: all three frogs start full before the first gameplay frame`,initial);
 await frames(page);
 const appearance=await page.evaluate(()=>{
  const g=window.frogArcade,p=g.state.actors[0],load=p.load;g.renderActors(0);
  const full=g.models[0].bones.spine.scale.toArray(),fullY=g.models[0].group.position.y;
  p.load=0;g.renderActors(0);const empty=g.models[0].bones.spine.scale.toArray(),emptyY=g.models[0].group.position.y;
  p.load=load;g.renderActors(0);return {full,empty,fullY,emptyY,pitch:g.cameraPitch,sounds:window.__qaSounds,caught:g.state.stats.caught};
 });
 record(appearance.full.every((value,i)=>Math.abs(value-appearance.empty[i])<1e-8)&&appearance.fullY===appearance.emptyY,`${name}: a full magazine no longer inflates or lifts the torso`,appearance);
 record(appearance.pitch===.44,`${name}: the default camera has the higher .44-radian pitch`,{pitch:appearance.pitch});
 await modelSteps(page,120);await frames(page);
 const audio=await page.evaluate(()=>({sounds:window.__qaSounds,caught:window.frogArcade.state.stats.caught}));
 record(audio.sounds.length===0&&audio.caught===0,`${name}: starting full produces no automatic pickup clicks`,audio);
 await view(page,`${name}-full-spawn`);
}
async function naturalExit(page){
 await page.keyboard.down('w');const trail=await frames(page,100);await page.keyboard.up('w');await frames(page,3);
 record(trail.at(-1).z<8&&trail.every(p=>Math.abs(p.x)<.05), 'Held W takes the player through the real door toward the center without catapult blockage',{start:trail[0],end:trail.at(-1)});
 await capture(page,'desktop-clear-home-exit');
 const machine=await page.evaluate(()=>{
  const g=window.frogArcade,c=g.state.catapults.find(c=>c.owner==='player'),p=g.state.actors[0];g.state.phase='battle';g.state.intro=0;for(const a of g.state.actors.slice(1))a.dizzyTime=1000;
  g.clearInputs();Object.assign(p,{x:c.x,z:c.z+4.45,hop:0,height:0,idle:0,impulseX:0,impulseZ:0,face:Math.PI,aimX:0,aimZ:-1});g.resetCamera();g.updateHUD();return {id:c.id,x:c.x,z:c.z};
 });
 await page.keyboard.down('w');await frames(page,14);await page.keyboard.up('w');await frames(page,2);
 const usable=await page.locator('#catapult-button').isVisible(),approach=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return {x:p.x,z:p.z,phase:g.state.phase};});
 record(usable,'The relocated catapult is usable through its real south gate',{machine,approach});if(!usable){await capture(page,'catapult-approach-failure');return;}
 await page.locator('#catapult-button').click();await frames(page,2);
 record(await page.evaluate(id=>window.frogArcade.state.actors[0].catapultId===id,machine.id),'The relocated catapult mounts through its actual use button');
 await capture(page,'desktop-relocated-catapult');await page.locator('#catapult-button').click();await frames(page,2);
 const dismount=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],c=g.state.catapults.find(c=>c.owner==='player');return {mounted:p.catapultId,distance:Math.hypot(p.x-c.x,p.z-c.z),south:p.z>c.z};});
 record(dismount.mounted===null&&dismount.south&&dismount.distance>1.7&&dismount.distance<3,'The relocated catapult dismounts into a clear usable entrance',dismount);
}
async function desktopSettings(page){
 await page.locator('#pause-button').click();await page.locator('#settings-button').click();const before=await camera(page);
 const ranges=await page.evaluate(()=>Object.fromEntries(['camera-zoom','camera-fov'].map(id=>{const e=document.getElementById(id);return [id,{min:e.min,max:e.max,step:e.step,value:e.value}];})));
 record(ranges['camera-zoom'].min==='70'&&ranges['camera-zoom'].max==='150'&&ranges['camera-fov'].min==='40'&&ranges['camera-fov'].max==='80','Camera settings expose the requested native zoom and FOV ranges',ranges);
 await page.locator('#camera-zoom').focus();await page.keyboard.press('End');const zoomed=await camera(page);
 record(zoomed.zoom===1.5&&zoomed.distance<before.distance*.72&&zoomed.time===before.time,'Zoom immediately moves the rendered paused camera without advancing gameplay',{before,after:zoomed});
 await page.locator('#camera-fov').focus();await page.keyboard.press('End');const wide=await camera(page);
 record(wide.fov===80&&wide.time===before.time,'FOV immediately updates the rendered paused projection',wide);
 const preview=await page.evaluate(()=>({className:document.getElementById('arcade-menu').className,filter:getComputedStyle(document.getElementById('arcade-menu')).backdropFilter,stored:JSON.parse(localStorage.getItem('frog-arcade-settings-v1'))}));
 record(preview.className.includes('settings-open')&&!preview.filter.includes('blur'),'Settings retain an unblurred visible world preview',preview);
 await capture(page,'desktop-camera-settings');
 await page.reload({waitUntil:'networkidle',timeout:180000});await attach(page);
 const restored=await camera(page);record(restored.zoom===1.5&&restored.fov===80,'Zoom and FOV persist across an actual page reload',restored);
 await page.locator('#play-button').click();await frames(page,2);
 await page.mouse.move(700,450);await page.mouse.down({button:'right'});await page.mouse.move(780,480,{steps:5});await page.mouse.up({button:'right'});await frames(page,2);
 const orbit=await camera(page);await page.locator('#pause-button').click();await page.locator('#settings-button').click();await page.locator('#camera-reset').click();const reset=await camera(page);
 record(reset.zoom===1&&reset.fov===52&&reset.yaw===orbit.yaw&&reset.pitch===orbit.pitch&&reset.mode===orbit.mode,'Camera Reset restores zoom/FOV while preserving the chosen orbit and view',{before:orbit,after:reset});
 await page.locator('#settings-back').click();await page.locator('#play-button').click();
}
async function raidFixture(page,own=true){
 await page.evaluate(own=>{
  const g=window.frogArcade;g.clearInputs();g.clearEffects();g.state=JSON.parse(JSON.stringify(window.__qaFresh));const s=g.state;s.phase='battle';s.intro=0;s.time=30;g.buildActors();
  const p=s.actors[0];Object.assign(p,{x:0,z:8,ammo:60,load:1,hop:0,height:0,shot:0,idle:0,face:0,aimX:0,aimZ:1});
  for(const a of s.actors.slice(1))Object.assign(a,{dizzyTime:1000,ammo:60,load:1,hit:0,invuln:0,hop:0,impulseX:0,impulseZ:0});
  const base=s.bases.find(b=>b.owner===(own?'player':'rival-2')),geometry=g.basesView.bases.get(base.id).definition;
  if(own)Object.assign(s.actors[1],{x:geometry.stock.x,z:geometry.stock.z,dizzyTime:0,refilling:false,raidId:base.id});
  else Object.assign(p,{x:geometry.stock.x,z:geometry.stock.z});
  g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');g.cameraYaw=Math.PI;g.cameraPitch=.44;g.cameraReady=false;g.updateHUD();window.__qaSounds=[];
 },own);
}
async function warningState(page){return page.evaluate(()=>{const g=window.frogArcade,b=g.state.bases.find(b=>b.owner==='player'),e=g.$('base-status');return {attackerId:b.attackerId,progress:b.progress,destroyed:b.destroyed,visible:!e.hidden,threat:e.classList.contains('threat'),title:g.$('base-warning-title').textContent,detail:g.$('base-warning-detail').textContent,uiThreat:g.ui.classList.contains('storage-threat'),chimes:window.__qaSounds.filter(e=>e.kind==='storageAlert').length};});}
async function storageWarnings(page,name,{complete=false}={}){
 await raidFixture(page);await modelSteps(page,1);const start=await warningState(page);
 await modelSteps(page,120);await frames(page);const ongoing=await warningState(page);
 record(start.attackerId&&start.visible&&start.threat&&start.chimes===1&&ongoing.chimes===1&&ongoing.progress>2&&ongoing.detail!==start.detail,`${name}: real sabotage gives one chime and a persistent updating warning`,{start,ongoing});
 await view(page,`${name}-storage-warning`,{warning:true});
 if(complete){
  await modelSteps(page,480);await frames(page);const destroyed=await warningState(page);
  record(destroyed.destroyed&&destroyed.attackerId===null&&!destroyed.visible&&!destroyed.uiThreat&&destroyed.chimes===1,`${name}: destruction clears the warning and does not repeat the chime`,destroyed);
 }else{
  await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],base=g.basesView.bases.get(g.state.bases[0].id).definition;Object.assign(p,{x:base.stock.x,z:base.stock.z-7.4,shot:0,aimX:0,aimZ:1,aiming:true});g.aim={x:0,z:1};g.mouse.valid=false;});
  await modelSteps(page,1,{fire:true,aiming:true,ax:0,az:1});await modelSteps(page,20);await frames(page);const interrupted=await warningState(page);
  const hits=await page.evaluate(()=>({hits:window.frogArcade.state.stats.hits,sounds:window.__qaSounds}));
  record(hits.hits>0&&interrupted.attackerId===null&&interrupted.progress===0&&!interrupted.visible&&!interrupted.uiThreat&&interrupted.chimes===1,`${name}: a real fly hit immediately clears the warning`,{interrupted,hits});
 }
 await raidFixture(page,false);await modelSteps(page,120,{sabotage:true});await frames(page);const other=await warningState(page);
 record(!other.attackerId&&!other.uiThreat&&!other.visible&&other.chimes===0,`${name}: attacking another owner's store does not sound the home alarm`,other);
}
async function mobileControls(context,page){
 const cdp=await context.newCDPSession(page);
 await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];g.clearInputs();Object.assign(p,{x:0,z:0,hop:0,idle:0,shot:0,hit:0,impulseX:0,impulseZ:0});g.cameraYaw=Math.PI;g.cameraPitch=.44;g.cameraReady=false;g.updateHUD();});await frames(page);
 const viewport=()=>page.evaluate(()=>({scale:visualViewport.scale,x:visualViewport.offsetLeft,y:visualViewport.offsetTop,scrollX,scrollY}));const before=await viewport();
 await cdp.send('Input.synthesizePinchGesture',{x:215,y:330,scaleFactor:1.5,relativeSpeed:500,gestureSourceType:'touch'});
 const after=await viewport();record(Object.keys(before).every(k=>Math.abs(after[k]-before[k])<.01),'Browser pinch remains disabled while camera controls are available',{before,after});
 const points=[];for(const [id,n,sign] of [['move-stick',1,1],['aim-stick',2,-1]]){const r=await page.locator(`#${id}`).boundingBox();points.push({id:n,x:r.x+r.width*(.5+sign*.4),y:r.y+r.height*.5});}
 const playerBefore=await page.evaluate(()=>{const p=window.frogArcade.state.actors[0];return {x:p.x,z:p.z,shots:window.frogArcade.state.stats.shots};});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});const input=await page.evaluate(()=>window.frogArcade.currentInput());await frames(page,12);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 const playerAfter=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return {x:p.x,z:p.z,shots:g.state.stats.shots,pointers:g.pointers.size};});
 record(input.aiming&&Math.hypot(input.mx,input.mz)>.5&&Math.hypot(playerAfter.x-playerBefore.x,playerAfter.z-playerBefore.z)>.4&&playerAfter.shots===playerBefore.shots&&playerAfter.pointers===0,'Browser gesture protection preserves simultaneous move/aim sticks',{input,before:playerBefore,after:playerAfter});
 await page.locator('#pause-button').tap();await page.locator('#settings-button').tap();record(await page.locator('#settings-panel').isVisible(),'Native Pause and Settings taps remain usable');
 const paused=await camera(page);
 for(const [id,fraction] of [['camera-zoom',.88],['camera-fov',.8]]){
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();const r=await page.locator(`#${id}`).boundingBox(),finger={id:6,x:r.x+r.width*.45,y:r.y+r.height/2};
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...finger,x:r.x+r.width*fraction}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 }
 const adjusted=await camera(page);record(adjusted.zoom>=1.3&&adjusted.fov>=68&&adjusted.time===paused.time,'Native touch dragging changes zoom and FOV while gameplay stays paused',{before:paused,after:adjusted});
 await capture(page,'portrait-camera-settings');await page.locator('#camera-reset').tap();await page.locator('#settings-back').tap();await page.locator('#play-button').tap();
 record(await page.evaluate(()=>window.frogArcade.running),'Settings Back and Continue taps resume play');
}

try{
 const desktop=await boot({width:1440,height:900});await spawnCheck(desktop.page,'desktop');await naturalExit(desktop.page);await desktopSettings(desktop.page);
 // Reload creates a new window; retain a fresh production state for isolated raids.
 await desktop.page.evaluate(()=>{const g=window.frogArcade;g.startNew();window.__qaFresh=JSON.parse(JSON.stringify(g.state));});
 await storageWarnings(desktop.page,'desktop');await desktop.context.close();
 const phone=await boot({width:430,height:745},true);await spawnCheck(phone.page,'portrait');await storageWarnings(phone.page,'portrait',{complete:true});await mobileControls(phone.context,phone.page);
 await phone.page.setViewportSize({width:745,height:430});await frames(phone.page,2);await view(phone.page,'landscape-gameplay');
 await phone.page.locator('#pause-button').tap();await phone.page.locator('#settings-button').tap();await capture(phone.page,'landscape-camera-settings');
 const landscape=await phone.page.evaluate(()=>{const panel=document.getElementById('settings-panel'),reset=document.getElementById('camera-reset'),back=document.getElementById('settings-back'),r=panel.getBoundingClientRect();return {panel:{top:r.top,bottom:r.bottom,height:r.height,scrollHeight:panel.scrollHeight,clientHeight:panel.clientHeight},reset:reset.getBoundingClientRect().toJSON(),back:back.getBoundingClientRect().toJSON(),viewport:innerHeight};});
 report.samples.push({name:'landscape-settings',...landscape});record(landscape.panel.top>=0&&landscape.panel.bottom<=landscape.viewport+1&&landscape.panel.scrollHeight<=landscape.panel.clientHeight+1&&landscape.reset.bottom<=landscape.viewport&&landscape.back.bottom<=landscape.viewport,'Landscape settings, Reset and Back fit without panel scrolling',landscape);
 await phone.page.setViewportSize({width:745,height:320});
 const shallow=await phone.page.evaluate(()=>{const panel=document.getElementById('settings-panel'),r=panel.getBoundingClientRect(),back=document.getElementById('settings-back').getBoundingClientRect();return {top:r.top,bottom:r.bottom,scrollHeight:panel.scrollHeight,clientHeight:panel.clientHeight,backBottom:back.bottom,viewport:innerHeight};});
 record(shallow.top>=0&&shallow.bottom<=shallow.viewport+1&&shallow.scrollHeight<=shallow.clientHeight+1&&shallow.backBottom<=shallow.viewport,'Settings remain reachable in a shallow 745×320 viewport',shallow);
 await phone.context.close();record(report.errors.length===0,'No uncaught browser exceptions',report.errors);report.ok=report.failures.length===0;if(!report.ok)process.exitCode=1;
}catch(error){report.ok=false;report.fatal=error.stack||String(error);process.exitCode=1;console.error(error);if(activePage&&!activePage.isClosed())try{await activePage.screenshot({path:`${out}/fatal.png`,timeout:15000});}catch{}}
finally{await save();await browser.close();}
