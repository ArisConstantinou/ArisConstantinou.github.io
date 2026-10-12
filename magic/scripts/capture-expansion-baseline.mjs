import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve('output/expansion'); await fs.mkdir(output,{recursive:true});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try {
 const context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
 const page=await context.newPage(); await page.goto('http://127.0.0.1:5173/');
 await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
 await page.locator('#start-button').click(); await page.waitForTimeout(200);
 await page.screenshot({path:path.join(output,'before.png')});
 const record=await page.evaluate(async()=>{
   const frames=[]; await new Promise(resolve=>{let last;function f(t){if(last)frames.push(t-last);last=t;if(frames.length<240)requestAnimationFrame(f);else resolve();}requestAnimationFrame(f);});
   frames.sort((a,b)=>a-b);const avg=frames.reduce((a,b)=>a+b,0)/frames.length;
   return {state:window.__MAGIC__.snapshot(),viewport:[innerWidth,innerHeight],frames:frames.length,fps:1000/avg,p95:frames[Math.floor(frames.length*.95)],max:frames.at(-1),over50:frames.filter(f=>f>50).length};
 });
 await fs.writeFile(path.join(output,'before.json'),JSON.stringify(record,null,2));console.log(JSON.stringify(record));await context.close();
}finally{await managed.cleanup();}
