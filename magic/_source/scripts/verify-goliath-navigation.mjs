import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve(process.env.MAGIC_QA_OUTPUT||'output/loot-combat/navigation');await fs.mkdir(output,{recursive:true});
const fixture=await fs.readFile('scripts/verify-goliath-game.mjs','utf8'),extra=fixture.match(/const extra=`([\s\S]*?)`;\r?\nconst managed/)[1];
const report={date:new Date().toISOString(),cases:[],errors:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});let context;
try{
 for(const seed of [7431,100,345,918])for(const revision of ['static-route','dynamic-route']){
  context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
  await context.addInitScript(seed=>{Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;},seed);
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await context.route('**/src/main.js*',async route=>{const response=await route.fetch();let body=await response.text();if(revision==='static-route')body=body.replace('e.path=pathAroundProps(goliathNav,p,destination,entities);','e.path=goliathNav.path(p,destination);');await route.fulfill({response,body:body+'\n'+extra});});
  await page.goto('http://127.0.0.1:5173/.cache/loot-game/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
  await page.evaluate(()=>window.__EXP_TEST__.prepare(7));await page.keyboard.down('r');await page.evaluate(()=>window.advanceTime(2350));await page.keyboard.up('r');await page.evaluate(()=>window.advanceTime(6400));
  await page.evaluate(()=>{window.__EXP_TEST__.melee();window.__EXP_TEST__.arrow();window.__EXP_TEST__.pulse();});
  const follow=await page.evaluate(()=>window.__EXP_TEST__.follow());report.cases.push({seed,revision,pass:follow.x<-20&&follow.y>1.3&&follow.y<1.9,follow});
  await page.screenshot({path:path.join(output,seed+'-'+revision+'.png')});await page.unrouteAll({behavior:'wait'});await context.close();context=null;
 }
}catch(e){report.errors.push(e.stack);}
finally{for(const page of context?.pages()||[])await page.unrouteAll({behavior:'wait'});await context?.close();await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({cases:report.cases.map(({seed,revision,pass,follow})=>({seed,revision,pass,x:follow.x,z:follow.z})),errors:report.errors,cleanup:report.cleanup}));if(report.errors.length||report.cases.some(c=>c.revision==='dynamic-route'&&!c.pass))process.exitCode=1;}
