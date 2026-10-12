import fs from 'node:fs/promises';import path from 'node:path';import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game'),{chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs'))),{launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const out=path.resolve('output/hearth/performance');await fs.mkdir(out,{recursive:true});const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:out}),report={errors:[],samples:[],conditions:'Chrome hardware renderer, DPR 1; seeded opening scene, native pause at 2 seconds, ABBA on same browser. Mobile dimensions are PC emulation.'};
let context;
async function measure(page,seconds=2){return page.evaluate(seconds=>new Promise(resolve=>{const times=[];let last=performance.now(),start=last;function tick(now){times.push(now-last);last=now;if(now-start<seconds*1000)requestAnimationFrame(tick);else{const sorted=times.slice(2).sort((a,b)=>a-b);resolve({fps:(times.length-2)*1000/sorted.reduce((s,v)=>s+v,0),p50:sorted[Math.floor(sorted.length*.5)],p95:sorted[Math.floor(sorted.length*.95)],max:sorted.at(-1),over50:sorted.filter(v=>v>50).length,frames:sorted.length});}}requestAnimationFrame(tick);}),seconds);}
try{
 context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.addInitScript(()=>{let seed=17011;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);});
 for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:844,height:390}]){
  await page.setViewportSize(viewport);
  for(const label of ['before','after','after','before']){
   const route=label==='before'?'hearth-before':'hearth-bulwark';
   const start=Date.now();await page.goto(`http://127.0.0.1:5173/.cache/${route}/index.html?hearthQA=1`);await page.waitForFunction(()=>window.__MAGIC__);const loadMs=Date.now()-start;await page.locator('#start-button').click();await page.waitForTimeout(2000);await page.keyboard.press('p');await page.waitForTimeout(300);
   const sample=await measure(page);report.samples.push({label,viewport,loadMs,...sample});
   if(label==='after')await page.screenshot({path:path.join(out,`after-${viewport.width}x${viewport.height}.png`)});else await page.screenshot({path:path.join(out,`before-${viewport.width}x${viewport.height}.png`)});
  }
 }
 await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:5173/.cache/hearth-bulwark/index.html?hearthQA=1');await page.waitForFunction(()=>window.__HEARTH_QA__);await page.locator('#start-button').click();
 await page.evaluate(()=>{const q=__HEARTH_QA__;q.entities.forEach(e=>{if(e.category==='actor'&&!e.isPlayer){e.stun=100;e.body.velocity.set(0,0,0);}});q.player.body.position.set(q.engine.body.position.x,q.player.cy+.08,q.engine.body.position.z+2.5);q.spell.charged=true;q.spell.readyAt=0;q.interact();});await page.waitForTimeout(2250);await page.keyboard.press('e');await page.waitForTimeout(2600);await page.keyboard.down('v');await page.waitForTimeout(350);report.activeFire=await measure(page,3);await page.screenshot({path:path.join(out,'active-fire.png')});await page.keyboard.up('v');
 report.gpu=await page.evaluate(()=>{const gl=__HEARTH_QA__.renderer.getContext(),e=gl.getExtension('WEBGL_debug_renderer_info');return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'unavailable';});
 report.memory=await page.evaluate(()=>{const q=__HEARTH_QA__,before={...q.renderer.info.memory};for(let i=0;i<20;i++)q.startRun();return {before,after:{...q.renderer.info.memory},entities:q.entities.filter(e=>!e.removed).length,bodies:q.physics.bodies.length};});
}catch(e){report.failure=e.stack;}finally{await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));await context?.close();try{await managed.cleanup();}catch(e){report.cleanupWarning=managed.report.cleanupErrors;if(!managed.report.closed)report.failure=e.message;}report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));}
if(report.failure||report.errors.length)process.exitCode=1;
