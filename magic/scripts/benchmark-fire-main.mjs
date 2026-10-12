import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const root=path.resolve('.'),baseline=process.env.MAGIC_FIRE_BASELINE||'C:/Users/arz0r/Documents/ChatGPT/Magic',source=path.join(root,'_source');
assert.equal(JSON.parse(await fs.readFile(path.join(baseline,'_source/package.json'),'utf8')).version,'1.2.0','Comparison requires a protected pre-fire checkout; set MAGIC_FIRE_BASELINE after promotion.');
const output=path.join(root,'output/playwright/fire-main-performance');await fs.mkdir(output,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const {build}=await import(pathToFileURL(path.join(source,'node_modules/vite/dist/node/index.js')));
const diagnostic=`window.__FIRE_PERF__={stage(){for(const e of entities)if(e.category==='actor'&&!e.isPlayer){e.stun=100;e.attackCooldown=100;e.body.velocity.set(0,0,0);}player.invulnerable=100;renderer.info.autoReset=false;},snapshot(){return{version:window.__MAGIC__.version,quality,render:{...renderer.info.render},memory:{...renderer.info.memory}}}};`;
const report={conditions:'Intel Core Ultra 9 285K / RTX 5080. Same Chrome, seeded layout, opening camera, frozen enemy AI and isolated storage. ABBA order, compiled production functions with private staging. Touch viewports are desktop emulation, not physical phone measurements.',results:[],errors:[]};
const fixtures={};
for(const [label,dir] of [['before',baseline],['after',root]]){
 const src=path.join(dir,'_source'),fixture=path.join(source,'.cache','fire-perf-'+label);fixtures[label]=fixture;
 await build({root:src,configFile:path.join(src,'vite.config.js'),logLevel:'error',plugins:[{name:'private-fire-performance',transform(code,id){if(id===path.join(src,'src/main.js').replaceAll('\\','/')){assert.ok(code.includes('if(composer){'));return code.replace('if(composer){','renderer.info.reset();if(composer){')+diagnostic;}}}],build:{outDir:fixture,emptyOutDir:true}});
}
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height] of [['desktop',1440,900],['portrait',390,844],['landscape',844,390]]){
  for(const [iteration,label] of ['before','after','after','before'].entries()){
   const context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:mode!=='desktop',hasTouch:mode!=='desktop',serviceWorkers:'block'});
   try{
    const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
    await page.addInitScript(()=>{let seed=19481;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
    await page.route('http://127.0.0.1:5173/**',route=>{const rel=new URL(route.request().url()).pathname.replace('/.cache/fire-perf/','');return route.fulfill({path:path.join(fixtures[label],rel),contentType:rel.endsWith('.js')?'application/javascript':rel.endsWith('.html')?'text/html':rel.endsWith('.css')?'text/css':undefined});});
    const start=Date.now();await page.goto('http://127.0.0.1:5173/.cache/fire-perf/index.html');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');const loadMs=Date.now()-start;
    await page.locator('#start-button').click();await page.evaluate(()=>window.__FIRE_PERF__.stage());await page.waitForTimeout(350);
    const metrics=await page.evaluate(async()=>{const frames=[];await new Promise(resolve=>{let last;function tick(t){if(last!==undefined)frames.push(t-last);last=t;if(frames.length<180)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});const s=[...frames].sort((a,b)=>a-b),gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return{fps:180000/frames.reduce((a,b)=>a+b),p95:s[171],max:s.at(-1),over50:frames.filter(v=>v>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,heap:performance.memory?.usedJSHeapSize,...window.__FIRE_PERF__.snapshot()};});
    report.results.push({mode,label,iteration,loadMs,...metrics});assert.ok(metrics.p95<33.34&&metrics.over50===0,`${mode} ${label}: frame budget`);
    if(iteration<2)await page.screenshot({path:path.join(output,`${mode}-${label}.png`)});
   }finally{await context.close();}
  }
 }
 assert.equal(report.errors.length,0);report.passed=true;
}catch(error){report.failure=error.stack;process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,failure:report.failure,results:report.results,errors:report.errors,cleanup:report.cleanup},null,2));}
