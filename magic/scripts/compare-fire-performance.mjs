import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve('output/playwright/fire-performance');await fs.mkdir(output,{recursive:true});
const report={method:'ABBA, same active held-crate scene, 90 rAF samples per block, only fire rendering toggled; gameplay, camera, quality and worker stay active',cases:[],errors:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height] of [['desktop',1440,900],['portrait',390,844],['landscape',844,390]]){
  const context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:mode!=='desktop',hasTouch:mode!=='desktop',serviceWorkers:'block'});
  try{
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
   await page.goto('http://127.0.0.1:5173/.cache/fire-sample/index.html?benchmarkFire=1');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
   await page.locator('#start-button').click();await page.keyboard.press('c');await page.waitForTimeout(500);
   const pick=await page.evaluate(()=>{const e=window.__MAGIC__.inspect().entities.find(e=>e.fireSampleCrate);return window.__MAGIC__.project(e);});
   await page.mouse.move(pick.x,pick.y);await page.mouse.down();await page.waitForFunction(()=>window.__MAGIC__.snapshot().fire.crateBurnRemaining>0);
   const blocks=[];
   for(const enabled of [false,true,true,false]){
    await page.evaluate(value=>window.__FIRE_BENCHMARK__(value),enabled);await page.waitForTimeout(150);
    blocks.push(await page.evaluate(async enabled=>{
     const frames=[];await new Promise(resolve=>{let previous;const frame=t=>{if(previous!==undefined)frames.push(t-previous);previous=t;if(frames.length<90)requestAnimationFrame(frame);else resolve();};requestAnimationFrame(frame);});
     const sorted=[...frames].sort((a,b)=>a-b),gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');
     return{enabled,fps:90000/frames.reduce((a,b)=>a+b),p95Ms:sorted[85],maxMs:sorted.at(-1),over50ms:frames.filter(x=>x>50).length,render:window.__MAGIC__.inspect().render,memory:window.__MAGIC__.inspect().memory,burnRemaining:window.__MAGIC__.snapshot().fire.crateBurnRemaining,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'unavailable'};
    },enabled));
   }
   assert.ok(blocks.every(b=>b.burnRemaining>0),'flame must remain active throughout the comparison');
   await page.evaluate(()=>window.__FIRE_BENCHMARK__(true));await page.screenshot({path:path.join(output,mode+'.png')});
   await page.mouse.up();
   report.cases.push({mode,viewport:{width,height},dpr:1,blocks,loadMs:await page.evaluate(()=>performance.getEntriesByType('navigation')[0].loadEventEnd)});
  }finally{await context.close();}
 }
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;}
