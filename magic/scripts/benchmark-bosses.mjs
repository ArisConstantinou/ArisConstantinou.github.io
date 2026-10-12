import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const root=path.resolve('.'), baseline='C:/Users/arz0r/Documents/ChatGPT/Magic';
const source=path.join(root,'_source'),out=path.join(root,'output/bosses/comparison');await fs.mkdir(out,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const {build}=await import(pathToFileURL(path.join(source,'node_modules/vite/dist/node/index.js')));
const extra=`window.__PERF_QA__={stage:(z)=>{for(const e of entities)if(!e.isPlayer&&e.category==='actor'){e.stun=100;e.body.velocity.set(0,0,0);}player.body.position.set(0,player.cy+.08,z);player.body.velocity.set(0,0,0);cameraTarget.set(0,0,z-1.8);renderer.info.autoReset=false;},snapshot:()=>({draw:{...renderer.info.render},memory:{...renderer.info.memory},quality,entities:entities.filter(e=>!e.removed).length})};`;
const report={hardware:'Intel Core Ultra 9 285K / RTX 5080; actual Chrome GPU string below',conditions:'Same Chrome, seed, viewport, camera and paused enemy AI. Production builds; isolated browser interception on the existing 5173 origin. Synthetic desktop benchmark, not physical mobile proof.',results:[],errors:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:out});let context;
try{
 for(const [label,dir] of [['before',baseline],['after',root]]){
  const src=path.join(dir,'_source'),fixture=path.join(source,'.cache','boss-benchmark-'+label);
  await build({root:src,configFile:path.join(src,'vite.config.js'),logLevel:'error',plugins:[{name:'private-comparison',transform(code,id){if(id===path.join(src,'src/main.js').replaceAll('\\','/'))return code.replace('if(composer){if(quality','renderer.info.reset();if(composer){if(quality')+extra;}}],build:{outDir:fixture,emptyOutDir:true,minify:true}});
  context=await managed.browser.newContext({viewport:{width:1440,height:900},serviceWorkers:'block'});const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.addInitScript(()=>{let seed=19481;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
  await page.route('http://127.0.0.1:5173/**',r=>{const url=new URL(r.request().url()),p=decodeURIComponent(url.pathname).slice(1)||'index.html';return r.fulfill({path:path.join(fixture,p),contentType:p.endsWith('.js')?'application/javascript':p.endsWith('.html')?'text/html':p.endsWith('.css')?'text/css':undefined});});
  const started=Date.now();await page.goto('http://127.0.0.1:5173/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');const loaded=Date.now()-started;await page.locator('#start-button').click();
  for(const [scene,z] of [['courtyard',18],['crypt',-17.5]]){
   await page.evaluate(z=>window.__PERF_QA__.stage(z),z);await page.waitForTimeout(1000);
   const metrics=await page.evaluate(async()=>{const samples=[];await new Promise(resolve=>{let last;const next=t=>{if(last!==undefined)samples.push(t-last);last=t;if(samples.length<360)requestAnimationFrame(next);else resolve();};requestAnimationFrame(next);});const s=[...samples].sort((a,b)=>a-b),gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return {fps:360000/samples.reduce((a,b)=>a+b,0),p95:s[342],p99:s[356],max:s.at(-1),over50:s.filter(t=>t>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,heap:performance.memory?.usedJSHeapSize,...window.__PERF_QA__.snapshot()};});
   report.results.push({label,scene,loadedMs:loaded,...metrics});await page.screenshot({path:path.join(out,`${label}-${scene}.png`)});
   assert.ok(metrics.p95<33.34&&metrics.over50===0,`${label} ${scene} desktop frame budget`);
  }
  await page.keyboard.press('Escape');const initial=await page.evaluate(()=>window.__PERF_QA__.snapshot().memory);const memories=[];
  for(let run=0;run<6;run++){await page.locator('#pause-restart').click();await page.keyboard.press('Escape');await page.waitForTimeout(100);memories.push(await page.evaluate(()=>window.__PERF_QA__.snapshot().memory));}
  report.results.push({label,restartMemory:{initial,samples:memories}});assert.ok(memories.at(-1).textures<=initial.textures&&memories.at(-1).geometries<=initial.geometries+8,`${label} restart resource stability`);
  await context.close();context=null;
 }
 assert.equal(report.errors.length,0);console.log(JSON.stringify(report));
}catch(e){report.failure=e.stack;process.exitCode=1;console.error(e.stack);}
finally{await context?.close();await managed.cleanup();await fs.writeFile(path.join(out,'comparison.json'),JSON.stringify(report,null,2));}
