import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Reuses the already-installed game skill. Installs no browser packages.
const skill = path.join(process.env.USERPROFILE, '.codex/skills/develop-web-game');
const { chromium } = await import(pathToFileURL(path.join(skill, 'node_modules/playwright/index.mjs')));
const { launchManagedBrowser } = await import(pathToFileURL(path.join(skill, 'scripts/browser_lifecycle.mjs')));
const output = path.resolve('output/playwright/analysis');
const focused = process.argv.includes('--focused');
await fs.mkdir(output, { recursive: true });
const report = { date: new Date().toISOString(), url: 'http://127.0.0.1:5173/',
  method: 'Unchanged game source with read-only diagnostic getters appended to the browser response by Playwright. Real mouse and CDP touch input. No changes to saves or gameplay on disk.',
  errors: [], desktopAim: [], desktopThrows: [], mobile: [], interactions: [], performance: [] };
const diagnostics = `
window.__MAGIC_DIAG__ = {
 snapshot: () => ({phase,runTime,aim:{x:aimDirection.x,z:aimDirection.z},input:ui.getInput(),
 player:player?{x:player.body.position.x,y:player.body.position.y,z:player.body.position.z,yaw:player.yaw,hp:player.hp,mana:player.mana,dashCooldown:player.dashCooldown,pulseCooldown:player.pulseCooldown,shielding:!!player.shielding}:null,
 motion:drag?{velocity:drag.motion.velocity(performance.now()),idleMs:performance.now()-drag.motion.lastMovedAt}:null,
 held:held?{id:held.body.id,label:held.label}:null,throwPreview:held?currentThrowVelocity():null,
 entities:entities.filter(e=>!e.removed).map(e=>({id:e.body.id,label:e.label,kind:e.kind,isPlayer:!!e.isPlayer,ephemeral:!!e.ephemeral,hp:e.hp,stun:e.stun,thrownBy:e.thrownBy,x:e.body.position.x,y:e.body.position.y,z:e.body.position.z,vx:e.body.velocity.x,vy:e.body.velocity.y,vz:e.body.velocity.z})),
 quality,memory:{...renderer.info.memory},scene:{objects:scene.children.length},profile:{...save.profile}}),
 project: (point) => {camera.updateMatrixWorld();const p=new THREE.Vector3(point.x,point.y,point.z).project(camera),r=renderer.domElement.getBoundingClientRect();return {x:r.left+(p.x+1)*r.width/2,y:r.top+(1-p.y)*r.height/2};},
 pick: (point) => {const e=pickObject({clientX:point.x,clientY:point.y,pointerType:'touch'});return e?{id:e.body.id,label:e.label}:null;}
};`;
const managed = await launchManagedBrowser(chromium, {channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
const contexts = [];
const shot = async (page,name) => page.screenshot({path:path.join(output,`${name}.png`)});
const snap = page => page.evaluate(() => window.__MAGIC_DIAG__.snapshot());
const project = (page,p) => page.evaluate(p => window.__MAGIC_DIAG__.project(p),p);
const wait = (page,ms) => page.waitForTimeout(ms);
async function open(options={}) {
  const context = await managed.browser.newContext(options); contexts.push(context);
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', e => {if(e.type()==='error')report.errors.push(e.text());});
  await page.route('**/src/main.js*', async route => {
    const response = await route.fetch();
    await route.fulfill({response,body:(await response.text())+diagnostics});
  });
  await page.goto(report.url);
  await page.waitForFunction(() => window.__MAGIC__?.snapshot().phase==='menu');
  return page;
}
async function start(page) {
  const state = await snap(page);
  if(state.phase==='playing') await page.keyboard.press('Escape');
  const now = (await snap(page)).phase;
  await page.locator(now==='menu'?'#start-button':now==='result'?'#result-restart':'#pause-restart').click();
  await wait(page,100);
}
async function pause(page) {if((await snap(page)).phase==='playing')await page.keyboard.press('Escape');}
async function pointAim(page,x,z) {
  const s=await snap(page),point=await project(page,{x:s.player.x+x,y:.8,z:s.player.z+z});
  await page.mouse.move(point.x,point.y);await wait(page,140);return snap(page);
}
async function stone(page) {
  await page.keyboard.press('r');await wait(page,80);
  const entity=(await snap(page)).entities.filter(e=>e.ephemeral).at(-1);
  if(!entity)throw new Error('No conjured stone');
  const point=await project(page,entity);
  await page.mouse.move(point.x,point.y);await page.mouse.down();await wait(page,80);
  if(!(await snap(page)).held)throw new Error('Stone could not be grabbed');
  return {entity,point};
}
async function benchmark(page,name) {
  const performance=await page.evaluate(async()=>{
    const canvas=document.querySelector('#game-canvas'),gl=canvas.getContext('webgl2');
    const ext=gl.getExtension('WEBGL_debug_renderer_info');
    const times=[];await new Promise(resolve=>{let last;const step=now=>{if(last!==undefined)times.push(now-last);last=now;if(times.length<180)requestAnimationFrame(step);else resolve();};requestAnimationFrame(step);});
    const sorted=[...times].sort((a,b)=>a-b),sum=times.reduce((a,b)=>a+b,0);
    return {frames:times.length,durationMs:sum,fps:1000*times.length/sum,medianMs:sorted[Math.floor(sorted.length*.5)],p95Ms:sorted[Math.floor(sorted.length*.95)],p99Ms:sorted[Math.floor(sorted.length*.99)],maxMs:Math.max(...times),over50ms:times.filter(t=>t>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),heap:performance.memory?.usedJSHeapSize,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},state:window.__MAGIC_DIAG__.snapshot()};
  });
  const {state,...metrics}=performance;
  report.performance.push({name,...metrics,quality:state.quality,memory:state.memory,phase:state.phase});
}
try {
  const page=await open({viewport:{width:1440,height:900}});
  await shot(page,'desktop-menu');
  for(const [name,x,z] of (focused?[]:[['north',0,-5],['northeast',5,-5],['east',5,0],['southeast',5,5],['south',0,5],['southwest',-5,5],['west',-5,0],['northwest',-5,-5]])) {
    await start(page);const state=await pointAim(page,x,z),length=Math.hypot(x,z);
    const alignment=(state.aim.x*x+state.aim.z*z)/length;
    report.desktopAim.push({name,aim:state.aim,yaw:state.player.yaw,alignment,passed:alignment>.995});
    if(name==='east'||name==='west'){await shot(page,`desktop-aim-${name}`);}
    await pause(page);
  }
  for(const [name,x,z] of [['east',3,0],['west',-3,0],['north',0,-3],['south',0,3],['northeast',2.1,-2.1],['southwest',-2.1,2.1]]) {
    await start(page);await pointAim(page,0,-4);const {entity,point}=await stone(page);
    const end=await project(page,{x:entity.x+x,y:entity.y,z:entity.z+z});
    for(let i=1;i<=10;i++){await page.mouse.move(point.x+(end.x-point.x)*i/10,point.y+(end.y-point.y)*i/10);await wait(page,12);}
    const before=await snap(page);
    await page.mouse.up();const after=await snap(page),thrown=after.entities.find(e=>e.id===entity.id);
    const length=Math.hypot(x,z),speed=Math.hypot(thrown.vx,thrown.vz),alignment=(thrown.vx*x+thrown.vz*z)/(speed*length);
    report.desktopThrows.push({name,preview:before.throwPreview,motion:before.motion,velocity:{x:thrown.vx,y:thrown.vy,z:thrown.vz},alignment,thrownBy:thrown.thrownBy,passed:alignment>.9&&thrown.thrownBy==='player'&&!after.held});
    await pause(page);
  }
  if(!focused){
  await start(page);const a=await snap(page);await page.keyboard.down('d');await wait(page,450);await page.keyboard.up('d');const b=await snap(page);
  report.interactions.push({name:'movement',distance:b.player.x-a.player.x,passed:b.player.x>a.player.x+1});
  await page.keyboard.press('Space');await wait(page,50);const dash=await snap(page);
  report.interactions.push({name:'dash',cooldown:dash.player.dashCooldown,passed:dash.player.dashCooldown>0});
  await page.keyboard.press('f');await wait(page,70);const pulse=await snap(page);
  report.interactions.push({name:'pulse',cooldown:pulse.player.pulseCooldown,passed:pulse.player.pulseCooldown>0});
  await pause(page);const paused=await snap(page);await wait(page,180);const frozen=await snap(page);
  report.interactions.push({name:'pause-freezes-simulation',passed:paused.runTime===frozen.runTime});
  await page.locator('#resume-button').click();report.interactions.push({name:'resume',passed:(await snap(page)).phase==='playing'});
  await start(page);await stone(page);await page.keyboard.down('Shift');await wait(page,90);
  report.interactions.push({name:'shield',passed:(await snap(page)).player.shielding});
  await page.keyboard.up('Shift');await page.keyboard.press('q');await wait(page,70);
  report.interactions.push({name:'drop',passed:!(await snap(page)).held});
  await start(page);await stone(page);await page.keyboard.press('Escape');
  report.interactions.push({name:'pause-cancels-grab-without-throw',passed:!(await snap(page)).held});
  await start(page);await benchmark(page,'desktop-high-courtyard');await pause(page);
  await page.locator('#pause-quality').click();await page.locator('#resume-button').click();await benchmark(page,'desktop-low-courtyard');await pause(page);
  // Natural combat/play: attack the closest guard by lifting and throwing it.
  await start(page);await page.keyboard.down('w');await wait(page,650);await page.keyboard.up('w');
  const guard=(await snap(page)).entities.find(e=>e.kind==='guard');const gp=await project(page,guard);
  await page.mouse.move(gp.x,gp.y);await page.mouse.down();await wait(page,100);
  report.interactions.push({name:'enemy-telekinesis',passed:(await snap(page)).held?.id===guard.id});
  await page.mouse.move(gp.x+180,gp.y-100,{steps:12});await page.mouse.up();await wait(page,250);await shot(page,'desktop-combat');await pause(page);
  }
  await start(page);await pointAim(page,0,-4);const stillStone=await stone(page);
  for(let i=1;i<=8;i++){await page.mouse.move(stillStone.point.x+50*i/8,stillStone.point.y);await wait(page,12);}
  const movingPreview=await snap(page);await wait(page,250);const idlePreview=await snap(page);
  await shot(page,'desktop-idle-throw-direction');await page.mouse.up();const stillResult=await snap(page);
  report.interactions.push({name:'flick-to-idle-direction-switch',movingPreview:movingPreview.throwPreview,idlePreview:idlePreview.throwPreview,heldBefore:idlePreview.held,reproduced:movingPreview.throwPreview.x>5&&idlePreview.throwPreview.z<-5});await pause(page);

  const mobile=await open({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
  await shot(mobile,'mobile-menu');await start(mobile);await shot(mobile,'mobile-gameplay');
  const cdp=await mobile.context().newCDPSession(mobile);
  const touch=async(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
  const initial=await snap(mobile);let tp;
  for(const [dx,dz] of [[4,0],[3,2],[2,3],[-3,2],[0,4],[2,0]]){
    const candidate=await project(mobile,{x:initial.player.x+dx,y:.8,z:initial.player.z+dz});
    const eligible=await mobile.evaluate(p=>!window.__MAGIC_DIAG__.pick(p)&&document.elementFromPoint(p.x,p.y)?.id==='game-canvas',candidate);
    if(eligible){tp=candidate;break;}
  }
  if(!tp)throw new Error('Could not find genuinely empty mobile ground');
  await touch('touchStart',[{x:tp.x,y:tp.y,id:1}]);await wait(mobile,120);const tap=await snap(mobile);
  await touch('touchMove',[{x:tp.x-20,y:tp.y,id:1}]);await wait(mobile,80);const emptyDrag=await snap(mobile);await touch('touchEnd',[]);
  report.mobile.push({name:'empty-ground-touch-does-not-update-aim',point:tp,initial:initial.aim,after:tap.aim,afterDrag:emptyDrag.aim,pointerActive:tap.input.pointerActive,reproduced:tap.aim.x===initial.aim.x&&tap.aim.z===initial.aim.z&&!tap.input.pointerActive});
  const stick=await mobile.locator('.joystick').boundingBox();const center={x:stick.x+stick.width/2,y:stick.y+stick.height/2,id:2};
  await touch('touchStart',[center]);await touch('touchMove',[{...center,x:center.x+40}]);await wait(mobile,220);const moved=await snap(mobile);await touch('touchEnd',[]);
  report.mobile.push({name:'movement-stick-changes-facing',aim:moved.aim,passed:moved.aim.x>.98});
  await pause(mobile);await start(mobile);
  await mobile.locator('.touch-actions [data-action="conjure"]').tap();await wait(mobile,90);
  const ms=(await snap(mobile)).entities.filter(e=>e.ephemeral).at(-1),mp=await project(mobile,ms);
  await touch('touchStart',[{x:mp.x,y:mp.y,id:3}]);await wait(mobile,70);const grabbed=await snap(mobile);
  for(let i=1;i<=8;i++){await touch('touchMove',[{x:mp.x+70*i/8,y:mp.y-10*i/8,id:3}]);await wait(mobile,12);}
  const mobileHeld=await snap(mobile);await touch('touchEnd',[]);const released=await snap(mobile),mt=released.entities.find(e=>e.id===ms.id);
  report.mobile.push({name:'touch-object-drag-throw-east',grabbed:grabbed.held,aim:mobileHeld.aim,preview:mobileHeld.throwPreview,velocity:{x:mt.vx,y:mt.vy,z:mt.vz},passed:!!grabbed.held&&mt.vx>5&&mt.thrownBy==='player'&&!released.held});
  if(!focused)await benchmark(mobile,'mobile-viewport-low-courtyard');await pause(mobile);
  await mobile.setViewportSize({width:844,height:390});await start(mobile);await shot(mobile,'mobile-landscape');await pause(mobile);
  report.layout=await mobile.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth,scrollHeight:document.documentElement.scrollHeight,innerHeight,input:document.body.dataset.input}));
} catch(error) {report.errors.push(error.stack);console.error(error.stack);process.exitCode=1;}
finally {
  for(const context of contexts)await context.close().catch(e=>report.errors.push(e.message));
  await managed.cleanup();
  report.browserLifecycle=managed.report;
  await fs.writeFile(path.join(output,focused?'report-focused.json':'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({aim:report.desktopAim,throws:report.desktopThrows,mobile:report.mobile,interactions:report.interactions,performance:report.performance,errors:report.errors,cleanup:{closed:report.browserLifecycle.closed,remainingPids:report.browserLifecycle.remainingPids}},null,2));
}
