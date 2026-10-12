import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';

const root=path.resolve('.');
const output=path.join(root,'output/playwright/aim-performance');
await fs.mkdir(output,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const runtimes={before:path.join(root,'.source/aim-before-runtime'),after:root};
const report={date:new Date().toISOString(),conditions:'One isolated context at a time; hardware Chrome; DPR 1; seeded test-only randomness; 500 ms warmup; 180 real rAF samples; two pairs in reversed order; existing port 5173',errors:[],samples:[],smoke:[]};
for(const [name,folder] of Object.entries(runtimes)){
  const html=await fs.readFile(path.join(folder,'index.html'),'utf8');
  const bundle=html.match(/src="\.\/([^\"]+\.js)"/)[1];
  report[name]={bundle,sha256:crypto.createHash('sha256').update(await fs.readFile(path.join(folder,bundle))).digest('hex')};
}
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
  for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844],['mobile-landscape',844,390]]){
    const touch=mode!=='desktop';
    for(const round of [0,1])for(const version of round?['after','before']:['before','after']){
      const context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:touch,hasTouch:touch,serviceWorkers:'block'});
      try{
        // This controls test variation only, never the user's game or saves.
        await context.addInitScript(()=>{let seed=731;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
        const page=await context.newPage();
        page.on('pageerror',error=>report.errors.push(`${version}/${mode}: ${error.message}`));
        page.on('console',message=>{if(message.type()==='error')report.errors.push(`${version}/${mode}: ${message.text()}`);});
        await page.route('**/*',async route=>{
          const url=new URL(route.request().url());
          if(url.origin!=='http://127.0.0.1:5173')return route.continue();
          const relative=url.pathname==='/'?'index.html':url.pathname.slice(1);
          if(relative!=='index.html'&&!relative.startsWith('engine/'))return route.continue();
          const file=path.resolve(runtimes[version],relative);
          if(!file.startsWith(runtimes[version]+path.sep))throw new Error('Runtime path escaped fixture');
          await route.fulfill({body:await fs.readFile(file),contentType:relative.endsWith('.html')?'text/html':relative.endsWith('.css')?'text/css':'application/javascript'});
        });
        await page.goto('http://127.0.0.1:5173/');
        await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
        await page.locator('#start-button').click();
        await page.waitForTimeout(500);
        // Hold an empty-ground pointer during the real render loop.
        let cdp;
        // This point is beyond grab reach at every viewport; verify that rather
        // than accidentally benchmarking a captured pot and its collision FX.
        if(touch){cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:width*.98,y:height*.65,id:1}]});}
        else await page.mouse.move(width*.98,height*.65);
        await page.waitForTimeout(50);
        if((await page.evaluate(()=>window.__MAGIC__.snapshot())).holding)throw new Error(`${version}/${mode}: benchmark pointer grabbed an object`);
        const metrics=await page.evaluate(async()=>{
          const before=window.__MAGIC__.snapshot(),samples=[];
          await new Promise(resolve=>{let last;const frame=time=>{if(last!==undefined)samples.push(time-last);last=time;if(samples.length<180)requestAnimationFrame(frame);else resolve();};requestAnimationFrame(frame);});
          const sorted=[...samples].sort((a,b)=>a-b),gl=document.querySelector('canvas').getContext('webgl2'),extension=gl.getExtension('WEBGL_debug_renderer_info');
          return {version:window.__MAGIC__.version,phaseBefore:before.phase,phaseAfter:window.__MAGIC__.snapshot().phase,fps:180000/samples.reduce((a,b)=>a+b,0),p95Ms:sorted[171],p99Ms:sorted[178],maxMs:sorted.at(-1),over50ms:samples.filter(t=>t>50).length,gpu:extension?gl.getParameter(extension.UNMASKED_RENDERER_WEBGL):null};
        });
        report.samples.push({mode,width,height,round,...metrics,runtimeVersion:metrics.version,version});
        if(round===0)await page.screenshot({path:path.join(output,`${version}-${mode}.png`)});
        if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        if(version==='after'&&round===0){
          await page.keyboard.press('Escape');await page.locator('#pause-restart').click();await page.waitForTimeout(100);
          const initial=await page.evaluate(()=>window.__MAGIC__.snapshot());
          if(touch){const r=await page.locator('.joystick').boundingBox(),p={x:r.x+r.width/2,y:r.y+r.height/2,id:2};await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[p]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...p,x:p.x+40}]});await page.waitForTimeout(180);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
          else{await page.keyboard.down('d');await page.waitForTimeout(220);await page.keyboard.up('d');}
          const moved=await page.evaluate(()=>window.__MAGIC__.snapshot());
          if(touch)await page.locator('.touch-actions [data-action="conjure"]').tap();else await page.keyboard.press('r');
          await page.waitForTimeout(70);
          const conjured=await page.evaluate(()=>window.__MAGIC__.snapshot());
          report.smoke.push({mode,version:metrics.version,movement:moved.position.x>initial.position.x+.5,conjure:conjured.entities>moved.entities&&conjured.mana<moved.mana-10,phase:conjured.phase,before:moved,after:conjured});
        }
      }finally{await context.close();}
    }
  }
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{
  await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({samples:report.samples,smoke:report.smoke,errors:report.errors,cleanup:report.cleanup},null,2));
  if(report.errors.length||report.smoke.some(s=>!s.movement||!s.conjure||s.version!=='1.1.1'||s.phase!=='playing')||report.samples.some(s=>s.phaseBefore!=='playing'||s.phaseAfter!=='playing'))process.exitCode=1;
}
