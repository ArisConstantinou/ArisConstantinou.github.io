import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const baseline=execFileSync('git',['show','3178c2f:_source/src/main.js'],{encoding:'utf8'});
const oldSync=baseline.slice(baseline.indexOf('function syncVisuals('),baseline.indexOf('function updateCamera('));
const output=path.resolve('output/playwright/trajectory-performance');await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),method:'ABBA, same live scene and browser; only syncVisuals is switched to the original 3178c2f function',errors:[],samples:[]};
const extra=`const originalSyncVisuals=${oldSync};const updatedSyncVisuals=syncVisuals;window.__PREVIEW_BENCH__={select:before=>{syncVisuals=before?originalSyncVisuals:updatedSyncVisuals;trajectory.geometry.setDrawRange(0,before?28:throwPreview?.points.length||0);sideTrajectory.visible=sideArrow.visible=impactMarker.visible=false;},state:()=>({phase,hp:player.hp,holding:!!held,workerMs:throwPreview?.computeMs,draw:renderer.info.render}),stone:()=>{const e=entities.find(e=>e.ephemeral);return {x:e.body.position.x,y:e.body.position.y,z:e.body.position.z};},project:p=>{camera.updateMatrixWorld();const v=new THREE.Vector3(p.x,p.y,p.z).project(camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};}};`;
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 const context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
 try{
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.route('**/src/main.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:await response.text()+'\n'+extra});});
  await page.goto('http://127.0.0.1:5173/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu'&&window.__PREVIEW_BENCH__);
  await page.locator('#start-button').click();await page.waitForTimeout(150);await page.keyboard.press('r');await page.waitForTimeout(70);
  const pick=await page.evaluate(()=>window.__PREVIEW_BENCH__.project(window.__PREVIEW_BENCH__.stone()));await page.mouse.move(pick.x,pick.y);await page.mouse.down();
  await page.waitForFunction(()=>window.__PREVIEW_BENCH__.state().holding);
  const aim=await page.evaluate(()=>window.__PREVIEW_BENCH__.project({x:16,y:.8,z:17}));await page.mouse.move(aim.x,aim.y);
  for(const before of [true,false,false,true]){
   await page.evaluate(before=>window.__PREVIEW_BENCH__.select(before),before);await page.waitForTimeout(300);
   const metrics=await page.evaluate(async()=>{const samples=[];await new Promise(resolve=>{let previous;const next=t=>{if(previous!==undefined)samples.push(t-previous);previous=t;if(samples.length<240)requestAnimationFrame(next);else resolve();};requestAnimationFrame(next);});const sorted=[...samples].sort((a,b)=>a-b),gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return{fps:240000/samples.reduce((a,b)=>a+b),p95Ms:sorted[228],maxMs:sorted.at(-1),over50ms:samples.filter(x=>x>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,state:window.__PREVIEW_BENCH__.state()};});
   report.samples.push({mode:before?'before':'after',...metrics});
   if(metrics.state.phase!=='playing'||!metrics.state.holding)throw new Error('Benchmark lost the live held-shot state');
  }
  await page.mouse.up();await page.screenshot({path:path.join(output,'scene.png')});
 }finally{await context.close();}
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;}
