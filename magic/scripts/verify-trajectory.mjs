import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const before=process.argv.includes('--before');
const output=path.resolve(`output/playwright/trajectory-${before?'before':'after'}`);
await fs.mkdir(output,{recursive:true});
if(before){
 const original=execFileSync('git',['show','3178c2f:_source/src/main.js'],{encoding:'utf8'}).replaceAll("from './","from '../src/").replace("import './style.css'","import '../src/style.css'");
 await fs.mkdir('_source/.cache',{recursive:true});await fs.writeFile('_source/.cache/trajectory-before-main.js',original);
}
const report={date:new Date().toISOString(),before,errors:[],cases:[],performance:[]};
const extra=`window.__TRAJECTORY_TEST__={actual:[],observe:()=>{window.__TRAJECTORY_TEST__.actual=[];held.body.addEventListener('collide',event=>window.__TRAJECTORY_TEST__.actual.push({kind:event.body.entity?.kind||(event.body.previewFloor?'floor':'world'),x:held?.body.position.x??event.target.position.x,z:held?.body.position.z??event.target.position.z}));},state:()=>({phase,runTime,held:held?.body.id,sideVisible:typeof sideTrajectory==='undefined'?false:sideTrajectory.visible,velocity:held?currentThrowVelocity():null,preview:typeof throwPreview==='undefined'?null:throwPreview,player:{x:player.body.position.x,y:player.body.position.y,z:player.body.position.z},line:Array.from(trajectory.geometry.attributes.position.array).slice(0,(trajectory.geometry.drawRange.count===Infinity?28:trajectory.geometry.drawRange.count)*3),entities:entities.filter(e=>!e.removed).map(e=>({id:e.body.id,kind:e.kind,category:e.category,isPlayer:e.isPlayer,ephemeral:e.ephemeral,hp:e.hp,x:e.body.position.x,y:e.body.position.y,z:e.body.position.z,vx:e.body.velocity.x,vy:e.body.velocity.y,vz:e.body.velocity.z})),walls:worldMap.colliders.filter(b=>b.h>2)}),project:p=>{camera.updateMatrixWorld();const v=new THREE.Vector3(p.x,p.y,p.z).project(camera),r=renderer.domElement.getBoundingClientRect();return{x:r.left+(v.x+1)*r.width/2,y:r.top+(1-v.y)*r.height/2};}};`;
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844],['mobile-landscape',844,390]]){
  const context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:mode!=='desktop',isMobile:mode!=='desktop',serviceWorkers:'block'});
  try{
   await context.addInitScript(()=>{let seed=821;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
   await page.route('**/src/main.js*',async route=>{const response=await route.fetch(before?{url:'http://127.0.0.1:5173/.cache/trajectory-before-main.js'}:{});await route.fulfill({response,body:(await response.text())+'\n'+extra});});
   await page.goto('http://127.0.0.1:5173/');await page.waitForFunction(()=>window.__TRAJECTORY_TEST__&&window.__MAGIC__?.snapshot().phase==='menu');
   const state=()=>page.evaluate(()=>window.__TRAJECTORY_TEST__.state());
   const project=p=>page.evaluate(p=>window.__TRAJECTORY_TEST__.project(p),p);
   const touch=mode!=='desktop',cdp=touch?await context.newCDPSession(page):null;
   const send=(type,p)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:p?[{...p,id:1}]:[]});
   const move=async p=>{if(touch)await send('touchMove',p);else await page.mouse.move(p.x,p.y);};
   for(const name of ['wall','enemy']){
    if((await state()).phase==='playing')await page.keyboard.press('Escape');
    await page.locator(name==='wall'?'#start-button':'#pause-restart').click();await page.waitForTimeout(150);
    if(name==='enemy'){if(touch)await page.locator('.touch-actions [data-action="conjure"]').tap();else await page.keyboard.press('r');await page.waitForTimeout(70);}
    // Let the existing tutorial toasts expire naturally while gameplay is
    // paused; the small mobile trajectory must be visible in the evidence.
    await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#toasts').children.length);await page.locator('#resume-button').click();await page.waitForTimeout(50);
    const initial=await state(),stone=name==='wall'?initial.entities.find(e=>e.kind==='barrel'&&Math.hypot(e.x-initial.player.x,e.z-initial.player.z)<6):initial.entities.find(e=>e.ephemeral),pick=await project(stone);
    if(touch)await send('touchStart',pick);else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
    await page.waitForFunction(()=>!!window.__TRAJECTORY_TEST__.state().held);
    let enemy;
    if(name==='wall')await move(await project({x:17,y:.8,z:initial.player.z-1}));
    else{
     // A genuine shield hold keeps the object by the mage, so the pointer can
     // select an off-centre enemy strike rather than drag it above his head.
     if(touch){const r=await page.locator('.touch-actions [data-action="shield"]').boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...pick,id:1},{x:r.x+r.width/2,y:r.y+r.height/2,id:2}]});}
     else await page.keyboard.down('Shift');
     enemy=(await state()).entities.find(e=>e.kind==='guard'&&e.x>0);
     const aim=await project({...enemy,x:enemy.x+.28,y:enemy.y+.2});
     if(touch){const r=await page.locator('.touch-actions [data-action="shield"]').boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...aim,id:1},{x:r.x+r.width/2,y:r.y+r.height/2,id:2}]});}
     else await move(aim);
    }
    await page.waitForTimeout(300);const s=await state();
    await page.screenshot({path:path.join(output,`${mode}-${name}.png`)});
    const held=s.entities.find(e=>e.id===s.held),aimedEnemy=enemy?s.entities.find(e=>e.id===enemy.id):null;
    const sideMiss=aimedEnemy?Math.abs((aimedEnemy.x-held.x)*s.velocity.z-(aimedEnemy.z-held.z)*s.velocity.x)/Math.hypot(s.velocity.x,s.velocity.z):null;
    let passed;
    if(name==='wall'){
     const wall=s.walls.find(b=>b.x>10&&b.w<2&&held.z>b.z-b.d/2&&held.z<b.z+b.d/2);
     const xs=s.line.filter((_,i)=>i%3===0),peak=Math.max(...xs);
     passed=!!wall&&peak<wall.x-wall.w/2+.15&&xs.at(-1)<peak-.1;
    }else passed=!!s.preview?.side&&s.preview.side.bodyId===enemy.id&&s.sideVisible;
    await page.evaluate(()=>window.__TRAJECTORY_TEST__.observe());
    if(touch)await send('touchEnd');else{await page.mouse.up();await page.keyboard.up('Shift');}await page.waitForTimeout(800);
    const actual=await page.evaluate(()=>window.__TRAJECTORY_TEST__.actual);
    report.cases.push({mode,name,passed,sideMiss,state:s,actual});
   }
   // Real rAF cadence while a collision preview is continuously displayed.
   await page.keyboard.press('Escape');await page.locator('#pause-restart').click();await page.waitForTimeout(100);
   if(touch)await page.locator('.touch-actions [data-action="conjure"]').tap();else await page.keyboard.press('r');await page.waitForTimeout(70);
   const stone=(await state()).entities.find(e=>e.ephemeral),pick=await project(stone);if(touch)await send('touchStart',pick);else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
   await move(await project({x:16,y:.8,z:17}));await page.waitForTimeout(300);
   const metrics=await page.evaluate(async()=>{const frames=[];await new Promise(resolve=>{let previous;const frame=t=>{if(previous!==undefined)frames.push(t-previous);previous=t;if(frames.length<180)requestAnimationFrame(frame);else resolve();};requestAnimationFrame(frame);});const s=[...frames].sort((a,b)=>a-b),gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return{fps:180000/frames.reduce((a,b)=>a+b),p95Ms:s[171],maxMs:s.at(-1),over50ms:frames.filter(x=>x>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'unavailable',devicePixelRatio:devicePixelRatio};});report.performance.push({mode,...metrics});
   if(touch)await send('touchEnd');else await page.mouse.up();
  }finally{await context.close();}
 }
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({cases:report.cases.map(c=>({mode:c.mode,name:c.name,passed:c.passed,points:c.state.line.length/3,contacts:c.state.preview?.impacts.map(i=>i.kind),actual:c.actual.map(i=>i.kind),side:c.state.preview?.side?.bodyId,broken:c.state.preview?.broken})),performance:report.performance,errors:report.errors,cleanup:report.cleanup},null,2));if(report.errors.length||!before&&report.cases.some(c=>!c.passed))process.exitCode=1;}
