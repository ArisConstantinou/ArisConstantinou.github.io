import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve('output/playwright/fire-before');await fs.mkdir(output,{recursive:true});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
const report={errors:[],cases:[]};
try{
 for(const [mode,width,height] of [['desktop',1440,900],['portrait',390,844]]){
  const context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:mode!=='desktop',isMobile:mode!=='desktop',serviceWorkers:'block'});
  try{
   await context.addInitScript(()=>{let seed=821;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
   await page.route('**/src/main.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+`\nwindow.__FIRE_BEFORE__={crate:()=>{const e=entities.find(e=>e.kind==='crate');const p=e.body.position;camera.updateMatrixWorld();const v=new THREE.Vector3(p.x,p.y,p.z).project(camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};}};`});});
   await page.goto('http://127.0.0.1:5173/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
   await page.locator('#start-button').click();await page.waitForTimeout(150);
   const before=await page.evaluate(()=>window.__MAGIC__.snapshot());await page.keyboard.press('c');await page.waitForTimeout(80);
   const after=await page.evaluate(()=>window.__MAGIC__.snapshot());
   const pick=await page.evaluate(()=>window.__FIRE_BEFORE__.crate());
   const cdp=mode!=='desktop'?await context.newCDPSession(page):null;
   if(cdp)await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...pick,id:1}]});else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
   await page.waitForFunction(()=>!!window.__MAGIC__.snapshot().holding);await page.waitForTimeout(220);
   await page.screenshot({path:path.join(output,mode+'.png')});
   report.cases.push({mode,before,after,holding:await page.evaluate(()=>window.__MAGIC__.snapshot()),fireNotImplemented:!after.fire&&await page.locator('[data-action="fire"]').count()===0});
   if(cdp)await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else await page.mouse.up();
  }finally{await context.close();}
 }
}finally{await managed.cleanup();report.cleanup=managed.report;await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({cases:report.cases.map(c=>({mode:c.mode,fireNotImplemented:c.fireNotImplemented})),errors:report.errors,remainingPids:managed.report.remainingPids}));}
