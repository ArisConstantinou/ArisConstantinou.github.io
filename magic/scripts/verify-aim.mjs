import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const baseline=process.argv.includes('--baseline');
const aimOnly=process.argv.includes('--aim-only');
const noPerformance=process.argv.includes('--no-performance');
const testSeed=process.env.MAGIC_TEST_SEED===undefined?null:Number(process.env.MAGIC_TEST_SEED);
const testUrl=process.env.MAGIC_TEST_URL||'http://127.0.0.1:5173/';
const output=path.resolve(process.env.MAGIC_TEST_OUTPUT||`output/playwright/aim-${baseline?'before':'after'}`);
await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),baseline,seed:testSeed,errors:[],aim:[],throws:[],regressions:[],performance:[]};
// Observe the real velocity immediately after throwHeld assigns it. A later
// physics step can deflect a valid release against a wall before a CDP snapshot.
const extra=`window.__AIM_TEST__={state:()=>({phase,runTime,aim:{x:aimDirection.x,z:aimDirection.z},input:ui.getInput(),held:held?.body.id,preview:held?currentThrowVelocity():null,release:window.__AIM_TEST__.release,player:{x:player.body.position.x,y:player.body.position.y,z:player.body.position.z,hp:player.hp,mana:player.mana,shielding:player.shielding,dash:player.dashCooldown,pulse:player.pulseCooldown},entities:entities.filter(e=>!e.removed).map(e=>({id:e.body.id,kind:e.kind,x:e.body.position.x,y:e.body.position.y,z:e.body.position.z,vx:e.body.velocity.x,vy:e.body.velocity.y,vz:e.body.velocity.z,ephemeral:e.ephemeral,thrownBy:e.thrownBy})),memory:{...renderer.info.memory}}),project:p=>{camera.updateMatrixWorld();const v=new THREE.Vector3(p.x,p.y,p.z).project(camera),r=renderer.domElement.getBoundingClientRect();return{x:r.left+(v.x+1)*r.width/2,y:r.top+(1-v.y)*r.height/2};},pick:p=>pickObject({clientX:p.x,clientY:p.y,pointerType:'touch'})?.body.id};const observedThrow=throwHeld;throwHeld=function(v=currentThrowVelocity()){const e=held;observedThrow(v);if(e&&e.thrownBy==='player')window.__AIM_TEST__.release={id:e.body.id,x:e.body.velocity.x,y:e.body.velocity.y,z:e.body.velocity.z};};`;
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
const contexts=[];
const sleep=(p,ms)=>p.waitForTimeout(ms);
const state=p=>p.evaluate(()=>window.__AIM_TEST__.state());
const project=(p,v)=>p.evaluate(v=>window.__AIM_TEST__.project(v),v);
const dot=(a,b)=>(a.x*b.x+a.z*b.z)/(Math.hypot(a.x,a.z)*Math.hypot(b.x,b.z));
async function start(page){const s=await state(page);if(s.phase==='playing')await page.keyboard.press('Escape');const next=(await state(page)).phase;await page.locator(next==='menu'?'#start-button':next==='result'?'#result-restart':'#pause-restart').click();await sleep(page,100);}
async function pause(page){if((await state(page)).phase==='playing')await page.keyboard.press('Escape');}
async function open(touch=false,landscape=false){const context=await managed.browser.newContext({viewport:touch?(landscape?{width:844,height:390}:{width:390,height:844}):{width:1440,height:900},isMobile:touch,hasTouch:touch,deviceScaleFactor:1});contexts.push(context);if(testSeed!==null)await context.addInitScript(initial=>{let seed=initial;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;},testSeed);const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',e=>{if(e.type()==='error')report.errors.push(e.text());});await page.route('**/src/main.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\n'+extra});});await page.goto(testUrl);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu'&&window.__AIM_TEST__);return page;}
async function benchmark(page,name){const metrics=await page.evaluate(async()=>{const samples=[];await new Promise(resolve=>{let last;function next(t){if(last!==undefined)samples.push(t-last);last=t;if(samples.length<180)requestAnimationFrame(next);else resolve();}requestAnimationFrame(next);});const sorted=[...samples].sort((a,b)=>a-b);const gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return{fps:180000/samples.reduce((a,b)=>a+b,0),p95Ms:sorted[171],p99Ms:sorted[178],maxMs:sorted.at(-1),over50ms:samples.filter(t=>t>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'',memory:window.__AIM_TEST__.state().memory};});report.performance.push({name,...metrics});}
const directions=[['north',0,-4],['northeast',3,-3],['east',4,0],['southeast',3,3],['south',0,4],['southwest',-3,3],['west',-4,0],['northwest',-3,-3]];
try{
 for(const mode of ['desktop','mobile','mobile-landscape']){
  const touch=mode!=='desktop',page=await open(touch,mode==='mobile-landscape');
  const cdp=touch?await page.context().newCDPSession(page):null;
  const send=async(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(p=>({...p,id:p.id??1}))});
  for(const [name,x,z] of directions){
   await start(page);const s=await state(page);let point=await project(page,{x:s.player.x+x,y:.8,z:s.player.z+z});
   // Find an empty point on the desired ray, avoiding the props' touch allowance.
   for(const scale of [1,.9,1.1,.8,1.2,.7,.6,.5,.4,.3,1.3,1.4,1.5,1.6]){const candidate=await project(page,{x:s.player.x+x*scale,y:.8,z:s.player.z+z*scale});if(await page.evaluate(p=>!window.__AIM_TEST__.pick(p)&&document.elementFromPoint(p.x,p.y)?.id==='game-canvas',candidate)){point=candidate;break;}}
   const empty=await page.evaluate(p=>!window.__AIM_TEST__.pick(p),point);
   if(touch)await send('touchStart',[point]);else await page.mouse.move(point.x,point.y);
   await sleep(page,100);const aimed=await state(page);
   if(touch){await send('touchMove',[{x:point.x+.5,y:point.y}]);await send('touchEnd',[]);}
   const after=await state(page);const alignment=dot(aimed.aim,{x,z});
   report.aim.push({mode,name,empty,alignment,pointerActive:aimed.input.pointerActive,passed:empty&&alignment>.995&&aimed.input.pointerActive&&after.held===undefined});
   if(name==='northeast')await page.screenshot({path:path.join(output,`${mode}-empty-aim.png`)});
   await pause(page);
  }
  // Last swipe is intentionally across the aimed direction, so old swipe-aim fails.
  for(const [name,x,z] of (aimOnly?[]:mode==='mobile-landscape'?directions.filter(x=>['east','west'].includes(x[0])):directions)){
   for(const idle of [0,250]){
    await start(page);
    if(touch)await page.locator('.touch-actions [data-action="conjure"]').tap();else await page.keyboard.press('r');
    await sleep(page,70);const s=await state(page),stone=s.entities.filter(e=>e.ephemeral).at(-1),pick=await project(page,stone);
    if(touch)await send('touchStart',[pick]);else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
    await sleep(page,60);if(!(await state(page)).held)throw new Error(`${mode}: could not grab stone`);
    const end=await project(page,{x:s.player.x+x,y:.8,z:s.player.z+z});
    const startPoint=await project(page,{x:s.player.x+x+z*.45,y:.8,z:s.player.z+z-x*.45});
    if(touch)await send('touchMove',[startPoint]);else await page.mouse.move(startPoint.x,startPoint.y);
    await sleep(page,160);
    for(let i=1;i<=8;i++){const p={x:startPoint.x+(end.x-startPoint.x)*i/8,y:startPoint.y+(end.y-startPoint.y)*i/8};if(touch)await send('touchMove',[p]);else await page.mouse.move(p.x,p.y);await sleep(page,12);}
    await page.waitForFunction(p=>{const i=window.__AIM_TEST__.state().input;return Math.abs(i.pointerX-p.x)<.01&&Math.abs(i.pointerY-p.y)<.01;},end);
    if(idle)await sleep(page,idle);
    const before=await state(page);
    if(name==='east'&&idle){await page.screenshot({path:path.join(output,`${mode}-held-east.png`)});}
    if(touch)await send('touchEnd',[]);else await page.mouse.up();
    await page.waitForFunction(id=>window.__AIM_TEST__.state().release?.id===id,stone.id);
    const after=await state(page),thrown=after.entities.find(e=>e.id===stone.id),velocity=after.release;
    report.throws.push({mode,name,idle,aim:before.aim,preview:before.preview,velocity,physicsVelocity:{x:thrown.vx,z:thrown.vz},previewAlignment:dot(before.preview,{x,z}),releaseAlignment:dot(velocity,{x,z}),previewReleaseAlignment:dot(before.preview,velocity),passed:dot(before.preview,{x,z})>.985&&dot(velocity,{x,z})>.985&&dot(before.preview,velocity)>.999&&!after.held&&thrown.thrownBy==='player'});
    await pause(page);
   }
  }
  if(!aimOnly&&!noPerformance){await start(page);await benchmark(page,mode);await pause(page);}
  if(!baseline&&!aimOnly){
   await start(page);const a=await state(page);
   if(touch){const r=await page.locator('.joystick').boundingBox(),p={x:r.x+r.width/2,y:r.y+r.height/2,id:2};await send('touchStart',[p]);await send('touchMove',[{...p,x:p.x+40}]);await sleep(page,180);
    const player=(await state(page)).player,aimPoint=await project(page,{x:player.x-3,y:.8,z:player.z+2});
    await send('touchStart',[{...p,x:p.x+40},{...aimPoint,id:3}]);await sleep(page,150);const both=await state(page);
    report.regressions.push({mode,name:'simultaneous-move-and-empty-aim',passed:both.player.x>a.player.x+.5&&both.aim.x<-.5&&both.input.moveX>.5});await send('touchEnd',[]);
   }else{await page.keyboard.down('d');await sleep(page,220);await page.keyboard.up('d');report.regressions.push({mode,name:'movement',passed:(await state(page)).player.x>a.player.x+.5});}
   await pause(page);await start(page);
   if(touch)await page.locator('.touch-actions [data-action="conjure"]').tap();else await page.keyboard.press('r');await sleep(page,70);
   const stone=(await state(page)).entities.filter(e=>e.ephemeral).at(-1),p=await project(page,stone);
   if(touch)await send('touchStart',[p]);else{await page.mouse.move(p.x,p.y);await page.mouse.down();}await sleep(page,70);
   if(touch){const r=await page.locator('.touch-actions [data-action="shield"]').boundingBox();await send('touchStart',[p,{x:r.x+r.width/2,y:r.y+r.height/2,id:5}]);}else await page.keyboard.down('Shift');await sleep(page,50);
   report.regressions.push({mode,name:'shield',passed:(await state(page)).player.shielding});
   if(touch)await send('touchEnd',[p]);else await page.keyboard.up('Shift');
   if(touch){const r=await page.locator('.touch-actions [data-action="drop"]').boundingBox();await send('touchStart',[p,{x:r.x+r.width/2,y:r.y+r.height/2,id:6}]);await send('touchEnd',[p]);}else await page.keyboard.press('q');await sleep(page,50);
   report.regressions.push({mode,name:'drop',passed:!(await state(page)).held});if(touch)await send('touchEnd',[]);else await page.mouse.up();
   if(touch)await page.locator('.touch-actions [data-action="pulse"]').tap();else await page.keyboard.press('f');await sleep(page,50);report.regressions.push({mode,name:'pulse',passed:(await state(page)).player.pulse>0});
   if(touch)await page.locator('.touch-actions [data-action="dash"]').tap();else await page.keyboard.press('Space');await sleep(page,50);report.regressions.push({mode,name:'dash',passed:(await state(page)).player.dash>0});
   await pause(page);const frozen=await state(page);await sleep(page,100);report.regressions.push({mode,name:'pause',passed:(await state(page)).runTime===frozen.runTime});
   await start(page);
   if(touch)await page.locator('.touch-actions [data-action="conjure"]').tap();else await page.keyboard.press('r');await sleep(page,70);
   const cancelStone=(await state(page)).entities.filter(e=>e.ephemeral).at(-1),cancelPoint=await project(page,cancelStone);
   if(touch)await send('touchStart',[cancelPoint]);else{await page.mouse.move(cancelPoint.x,cancelPoint.y);await page.mouse.down();}await sleep(page,60);
   await pause(page);const cancelled=await state(page);
   report.regressions.push({mode,name:'pause-cancels-grab-without-throw',passed:!cancelled.held&&cancelled.entities.find(e=>e.id===cancelStone.id).thrownBy===null});
   if(touch)await send('touchEnd',[]);else await page.mouse.up();
  }
  await page.context().close();
 }
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{for(const context of contexts)await context.close().catch(e=>report.errors.push(e.message));try{await managed.cleanup();}catch(error){report.errors.push('Browser cleanup: '+error.message);}report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};report.summary={aimPassed:report.aim.filter(x=>x.passed).length,aimTotal:report.aim.length,throwsPassed:report.throws.filter(x=>x.passed).length,throwsTotal:report.throws.length,regressionsPassed:report.regressions.filter(x=>x.passed).length,regressionsTotal:report.regressions.length,errors:report.errors};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report.summary,null,2));if(!baseline&&(report.errors.length||report.aim.some(x=>!x.passed)||report.throws.some(x=>!x.passed)||report.regressions.some(x=>!x.passed)))process.exitCode=1;}
