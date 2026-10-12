import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve('output/expansion/assembly-video');await fs.mkdir(output,{recursive:true});
const qa=await fs.readFile('scripts/verify-goliath-game.mjs','utf8'),hooks=qa.match(/const extra=`([\s\S]*?)`;/)[1];
const report={date:new Date().toISOString(),staging:'Seven real conjured stones placed around the mage; enemies stunned by test-only fixture. Real native R hold and normal animation clock.',frames:[],errors:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 const context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block',recordVideo:{dir:output,size:{width:960,height:600}}});
 await context.route('**/.cache/goliath-game/src/main.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+hooks});});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/.cache/goliath-game/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
 await page.locator('#start-button').click();await page.evaluate(()=>window.__EXP_TEST__.prepare(7));
 await page.waitForTimeout(700);await page.keyboard.down('r');await page.waitForTimeout(2200);await page.keyboard.up('r');
 for(let i=0;i<5;i++){
  await page.waitForTimeout(1200);const state=await page.evaluate(()=>window.__MAGIC__.snapshot());
  const name='assembly-'+i+'.png';await page.screenshot({path:path.join(output,name)});
  report.frames.push({name,ritual:state.ritual,goliath:state.goliath,stones:state.stones.length});
 }
 await page.waitForTimeout(500);const final=await page.evaluate(()=>window.__MAGIC__.snapshot());
 if(!final.goliath||final.stones.length!==0)throw new Error('Continuous real-time assembly did not complete');
 await context.close();await page.video().saveAs(path.join(output,'goliath-assembly.webm'));
}catch(e){report.errors.push(e.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;}
