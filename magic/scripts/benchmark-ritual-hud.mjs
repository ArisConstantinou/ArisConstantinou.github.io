import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const url='http://127.0.0.1:5173/.cache/goliath-game/';
const cache='C:/Users/arz0r/Documents/ChatGPT/Magic/_source/.cache/goliath-game/src';
let old=execFileSync('git',['show','d034d50:_source/src/main.js'],{encoding:'utf8'});old=old.replace("from './ui.js'","from './ui-ritual-before.js'");
await fs.writeFile(path.join(cache,'main-ritual-before.js'),old);
await fs.writeFile(path.join(cache,'ui-ritual-before.js'),execFileSync('git',['show','d034d50:_source/src/ui.js'],{encoding:'utf8'}));
const fixture=`\nwindow.__RITUAL_PERF__=()=>{startRun();for(const e of entities)if(e.category==='actor'&&!e.isPlayer)e.stun=1e5;for(let i=0;i<10;i++){const a=i*Math.PI*2/10;prop('stone',Math.sin(a)*2.6,18+Math.cos(a)*2.6,{y:.4,mass:2,ephemeral:true});}syncVisuals(0);updateCamera(1);updateHUD();};`;
const output=path.resolve('output/ritual-fix/performance');await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),scene:'Same seeded 1440x900 opening, ten real stones, stunned NPCs, high quality, one context at a time; ABBA source modules.',samples:[],errors:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const mode of ['before','after','after','before']){
  const context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
  await context.addInitScript(()=>{let seed=7431;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;});
  await context.route('**/src/main.js*',async route=>{const response=await route.fetch(mode==='before'?{url:url+'src/main-ritual-before.js'}:{});await route.fulfill({response,body:(await response.text())+fixture});});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));await page.goto(url);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();await page.evaluate(()=>window.__RITUAL_PERF__());await page.waitForTimeout(400);
  const metrics=await page.evaluate(async()=>{const frames=[];await new Promise(resolve=>{let previous;function f(t){if(previous)frames.push(t-previous);previous=t;if(frames.length<180)requestAnimationFrame(f);else resolve();}requestAnimationFrame(f);});frames.sort((a,b)=>a-b);const gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return{fps:180000/frames.reduce((a,b)=>a+b,0),p95:frames[171],max:frames.at(-1),over50:frames.filter(t=>t>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,version:window.__MAGIC__.version,stones:window.__MAGIC__.snapshot().stones.length};});
  report.samples.push({mode,...metrics});await page.screenshot({path:path.join(output,mode+'-'+report.samples.length+'.png')});await context.close();
 }
}catch(e){report.errors.push(e.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;}
