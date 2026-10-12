import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {pathToFileURL} from 'node:url';
import {installArtifactFixture} from './mobile-artifact-fixture.mjs';
const root=path.resolve(import.meta.dirname,'..'),output=path.join(root,'output/playwright/mobile-hud-performance');
await fs.mkdir(output,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const report={date:new Date().toISOString(),cpu:os.cpus()[0]?.model,delivery:'Exact before/after compiled artifacts in an owned-browser network fixture',samples:[],errors:[],limitations:['Desktop Chrome and desktop GPU, including emulated mobile viewport','CPU/GPU utilization, RAM/VRAM, physical phone performance and long-session leaks not measured']};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});let context;
try {
 for(const [mode,width,height,touch] of [['desktop',1440,900,false],['portrait',390,676,true]])for(const revision of ['before','after','after','before']) {
  context=await managed.browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,deviceScaleFactor:1,serviceWorkers:'block'});
  await installArtifactFixture(context,revision==='before'?path.resolve(process.env.MAGIC_BASELINE_ROOT||path.join(process.env.USERPROFILE,'Documents/ChatGPT/Magic')):root,`/.cache/${revision==='before'?'mobile-before-game':'mobile-game'}/`);
  await context.addInitScript(()=>{let seed=821;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(`http://127.0.0.1:5173/.cache/${revision==='before'?'mobile-before-game':'mobile-game'}/?hearthQA=1`);
  await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
  await page.evaluate(()=>{const q=__HEARTH_QA__;for(const e of q.entities)if(e.category==='actor'&&!e.isPlayer)e.stun=1e6;q.player.hp=q.player.maxHp=10000;q.player.mana=q.player.maxMana=10000;});
  for(const scene of ['idle','held']) {
   if(scene==='held') {
    const pick=await page.evaluate(()=>{const all=__MAGIC__.inspect().entities,p=all.find(e=>e.isPlayer);const e=all.filter(e=>e.kind==='crate'&&Math.hypot(e.x-p.x,e.z-p.z)<5).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];return __MAGIC__.project(e);});
    if(touch){const cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,...pick}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:pick.x+60,y:pick.y-45}]});}
    else {await page.mouse.move(pick.x,pick.y);await page.mouse.down();await page.mouse.move(pick.x+60,pick.y-45);}
    await page.waitForFunction(()=>!!__MAGIC__.snapshot().holding);
   }
   await page.waitForTimeout(900);
   const metrics=await page.evaluate(()=>new Promise(resolve=>{
    const frames=[];let last;
    function tick(t){if(last!==undefined)frames.push(t-last);last=t;if(frames.length<180)return requestAnimationFrame(tick);
     const sorted=[...frames].sort((a,b)=>a-b),q=__HEARTH_QA__,gl=q.renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');
     resolve({fps:180000/frames.reduce((a,b)=>a+b,0),medianMs:sorted[90],p95Ms:sorted[171],p99Ms:sorted[178],maxMs:sorted.at(-1),over50ms:frames.filter(t=>t>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,render:{...q.renderer.info.render},memory:{...q.renderer.info.memory}});
    }requestAnimationFrame(tick);
   }));
   report.samples.push({mode,width,height,dpr:1,revision,scene,...metrics});
  }
  await context.close();context=null;
 }
 report.comparison=[];
 for(const mode of ['desktop','portrait'])for(const scene of ['idle','held']) {
  const stats=revision=>{const s=report.samples.filter(s=>s.mode===mode&&s.scene===scene&&s.revision===revision);return{fps:s.map(x=>+x.fps.toFixed(1)),p95Ms:s.map(x=>+x.p95Ms.toFixed(2)),maxMs:Math.max(...s.map(x=>x.maxMs)),over50ms:s.reduce((n,x)=>n+x.over50ms,0)};};
  const before=stats('before'),after=stats('after');report.comparison.push({mode,scene,before,after,regression:Math.min(...after.p95Ms)>Math.max(...before.p95Ms)*1.2});
 }
 report.passed=report.errors.length===0&&!report.comparison.some(c=>c.regression);
 if(!report.passed)process.exitCode=1;
}catch(error){report.failure=error.stack;process.exitCode=1;}
finally {await context?.close();await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,comparison:report.comparison,errors:report.errors,failure:report.failure,cleanup:report.cleanup},null,2));}
