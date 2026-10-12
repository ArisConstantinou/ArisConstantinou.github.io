import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve(process.env.MAGIC_QA_OUTPUT||'output/loot-combat/performance');await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),method:'Same owned hardware browser, seed7431, source routes1.2.1 and1.3.0, default high desktop/low touch; 180 rAF samples and actual full-frame CPU timings. Touch uses PC GPU.',samples:[],errors:[]};
const extra=`const timedFrame=frame;window.__FRAME_COSTS__=[];frame=(now,manual)=>{const t=performance.now();timedFrame(now,manual);if(!manual&&now>=controlledUntil)window.__FRAME_COSTS__.push(performance.now()-t);};window.__BENCH__={
 ritual:(crowded=false)=>{startRun();player.invulnerable=1e5;for(const e of [...entities])if(!e.isPlayer){if(crowded&&e.category==='actor')e.stun=1e5;else if(!crowded)removeEntity(e);}for(let i=0;i<7;i++){const a=i*Math.PI*2/7;prop('stone',Math.sin(a)*2.6,18+Math.cos(a)*2.6,{y:.4,mass:2,ephemeral:true});}syncVisuals(0);updateCamera(1);},
 crowd:()=>{startRun();player.invulnerable=1e5;for(const e of entities)if(!e.isPlayer&&e.category==='actor')e.stun=1e5;},
 drops:()=>{if(typeof createLootVisual!=='function')return;for(let i=0;i<20;i++){const item={kind:['staff','robe','amulet','ring','health','mana'][i%6],level:i%5+1};const mesh=createLootVisual(item);mesh.position.set(-8+i%8*2,0,11-Math.floor(i/8)*2);scene.add(mesh);lootDrops.push({item,mesh,age:0,nextHint:0});}},
 metrics:()=>{const gl=renderer.getContext();return{gpu:gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL),quality,render:renderer.info.render,memory:renderer.info.memory,entities:entities.length,ally:!!goliath};}};`;
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
const contexts=new Set();
try{
 for(const touch of [false,true])for(const revision of ['goliath','loot']){
  const context=await managed.browser.newContext({viewport:touch?{width:390,height:844}:{width:1440,height:900},hasTouch:touch,isMobile:touch,deviceScaleFactor:1,serviceWorkers:'block'});contexts.add(context);await context.addInitScript(()=>{let seed=7431;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));await context.route('**/src/main.js*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:(await r.text())+'\n'+extra});});await page.goto('http://127.0.0.1:5173/.cache/'+revision+'-game/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
  for(const scene of ['isolated-goliath','castle-crowd','castle-crowd-with-loot','castle-goliath-with-loot']){
   if(scene.includes('goliath')){await page.evaluate(crowded=>window.__BENCH__.ritual(crowded),scene!=='isolated-goliath');await page.keyboard.down('r');await page.evaluate(()=>window.advanceTime(2300));await page.keyboard.up('r');await page.evaluate(()=>window.advanceTime(6500));if(scene==='castle-goliath-with-loot'){await page.evaluate(()=>window.__BENCH__.drops());await page.keyboard.down('ArrowLeft');}}
   else{await page.evaluate(()=>window.__BENCH__.crowd());if(scene==='castle-crowd-with-loot')await page.evaluate(()=>window.__BENCH__.drops());}
   await page.waitForTimeout(1500);const sample=await page.evaluate(async()=>{window.__FRAME_COSTS__=[];const frames=[];let last=performance.now();for(let i=0;i<180;i++)await new Promise(resolve=>requestAnimationFrame(t=>{frames.push(t-last);last=t;resolve();}));const quantiles=values=>{const a=values.slice(1).sort((a,b)=>a-b);return{samples:a.length,p50:a[Math.floor(a.length*.5)],p95:a[Math.floor(a.length*.95)],p99:a[Math.floor(a.length*.99)],max:a.at(-1),over50ms:a.filter(t=>t>50).length};};return{frame:quantiles(frames),cpu:quantiles(window.__FRAME_COSTS__),heapBytes:performance.memory?.usedJSHeapSize??null,...window.__BENCH__.metrics()};});report.samples.push({touch,revision,scene,...sample});
   await page.keyboard.up('ArrowLeft');
  }
  await context.close();contexts.delete(context);
 }
}catch(e){report.errors.push(e.stack);process.exitCode=1;}
finally{for(const c of contexts)await c.close().catch(e=>report.errors.push(e.message));try{await managed.cleanup();}catch(e){report.errors.push('Owned browser cleanup: '+managed.report.cleanupErrors.join('; '));}report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;}
