import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {installArtifactFixture} from './mobile-artifact-fixture.mjs';
const root=path.resolve(import.meta.dirname,'..'),output=path.join(root,'output/playwright/castle-offline');await fs.mkdir(output,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const report={date:new Date().toISOString(),checks:[],errors:[],limitation:'Owned browser receives exact candidate bytes via network fixture. Public deployment and physical phone cache migration await publication approval.'};
const check=(name,pass)=>{report.checks.push({name,pass:!!pass});assert.ok(pass,name);};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});let context;
try{
 context=await managed.browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,serviceWorkers:'allow'});
 await installArtifactFixture(context,root,'/.cache/mobile-game/');
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/.cache/mobile-game/?hearthQA=1');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
 const install=await page.evaluate(async()=>{const r=await navigator.serviceWorker.register('./sw.js',{scope:'./'});await navigator.serviceWorker.ready;await new Promise(resolve=>{if(r.active?.state==='activated')resolve();else r.active.addEventListener('statechange',()=>{if(r.active.state==='activated')resolve();});});return{scope:r.scope,caches:await caches.keys()};});report.install=install;
 await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller&&window.__MAGIC__?.snapshot().phase==='menu');
 const cache=await page.evaluate(async()=>{const keys=await caches.keys(),name=keys.find(k=>k.startsWith('magic-'));const c=await caches.open(name);return{name,files:(await c.keys()).map(r=>r.url)};});report.cache=cache;check('twenty-one runtime assets precached',cache.files.length>=21);
 await page.locator('#start-button').click();await page.locator('#hud-mute').click();const saved=await page.evaluate(()=>localStorage.getItem('magic-integrated-preview-v1'));
 await context.setOffline(true);await page.reload();await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');check('candidate starts offline',await page.evaluate(()=>__MAGIC__.version==='1.4.2'));
 check('preview save survives offline reload',await page.evaluate(s=>localStorage.getItem('magic-integrated-preview-v1')===s,saved));await page.locator('#start-button').click();
 const pick=await page.evaluate(()=>{const q=__HEARTH_QA__,p=q.player.body.position,e=q.entities.filter(e=>e.kind==='crate'&&Math.hypot(e.body.position.x-p.x,e.body.position.z-p.z)<5)[0];return __MAGIC__.project(e.body.position);});
 const cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,...pick}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:pick.x+60,y:pick.y-40}]});await page.waitForFunction(()=>__MAGIC__.inspect().preview?.points.length>1);check('offline worker and touch throw marker',await page.locator('#throw-mark').isVisible());await page.screenshot({path:path.join(output,'offline-aim.png')});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});check('no offline runtime errors',report.errors.length===0);report.passed=true;
}catch(e){report.failure=e.stack;process.exitCode=1;}
finally{await context?.close();await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));try{await managed.cleanup();}catch(e){report.cleanupFailure=e.message;process.exitCode=1;}report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,checks:report.checks,failure:report.failure,errors:report.errors,cleanup:report.cleanup},null,2));}
