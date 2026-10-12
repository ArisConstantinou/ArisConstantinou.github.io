import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const option=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const releaseUrl=option('--url');
if(releaseUrl&&!/^https?:$/.test(new URL(releaseUrl).protocol))throw new Error('Release URL must use HTTP or HTTPS');
const primary=process.argv.includes('--primary')||!!releaseUrl;
const output=path.resolve(option('--output')||(primary?'output/playwright/fire-main-primary':'output/playwright/fire-main-after'));await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),url:releaseUrl||(primary?'http://127.0.0.1:5173/':'http://127.0.0.1:5173/.cache/fire-main/index.html'),cases:[],errors:[],navigations:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height] of [['desktop',1440,900],['portrait',390,844],['landscape',844,390]]){
  const touch=mode!=='desktop';
  const context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
  try{
   await context.addInitScript(()=>{let seed=821;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};localStorage.setItem('magic-exiled-v1','protected-normal-save');});
   const page=await context.newPage();page.on('framenavigated',frame=>{if(frame===page.mainFrame())report.navigations.push({mode,url:frame.url(),time:Date.now()});});page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
   await page.goto(report.url);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');assert.equal(await page.evaluate(()=>window.__MAGIC__.version),'1.2.1');await page.locator('#start-button').click();assert.deepEqual(await page.evaluate(()=>window.__MAGIC__.inspect().entities.filter(e=>e.bossType).map(e=>e.bossType).sort()),['colossus','gargoyle','wraith']);
   const state=()=>page.evaluate(()=>window.__MAGIC__.snapshot());
   const inspect=()=>page.evaluate(()=>window.__MAGIC__.inspect());
   const project=p=>page.evaluate(p=>window.__MAGIC__.project(p),p);
   const cdp=touch?await context.newCDPSession(page):null;
   let contacts=[];
   const send=(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
   const pause=async()=>{if(touch)await page.locator('#hud-pause').tap();else await page.keyboard.press('Escape');};
   const restart=async()=>{await pause();await page.locator('#pause-restart').click();await page.waitForTimeout(100);};
   await page.waitForTimeout(120);const initial=await state();assert.ok(initial.fire.torchLit);assert.equal(initial.fire.charged,false);
   assert.equal(await page.locator('[data-action="fire"]').isEnabled(),true,'source must be reachable at the opening');
   if(touch)await page.locator('[data-action="fire"]').tap();else await page.keyboard.press('c');
   await page.waitForFunction(()=>window.__MAGIC__.snapshot().fire.charged&&window.__MAGIC__.snapshot().fire.ready);
   const charged=await state();assert.equal(charged.fire.torchLit,false);
   await page.screenshot({path:path.join(output,mode+'-transfer.png')});
   const item=(await inspect()).entities.find(e=>e.primaryCrate),pick=await project(item);
   if(touch){contacts=[{...pick,id:1}];await send('touchStart',contacts);}else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
   await page.waitForFunction(()=>window.__MAGIC__.snapshot().holding==='Κιβώτιο'&&window.__MAGIC__.snapshot().fire.crateBurnRemaining>0);
   await page.waitForTimeout(180);const burning=await state();assert.equal(burning.fire.charged,true);
   await page.screenshot({path:path.join(output,mode+'-burning-crate.png')});
   // A native shield hold retains the existing drag/aim mechanism and keeps
   // the crate close enough for a genuine projectile collision with the guard.
   let shield;
   if(touch){const box=await page.locator('.touch-actions [data-action="shield"]').boundingBox();shield={x:box.x+box.width/2,y:box.y+box.height/2,id:2};contacts=[{...pick,id:1},shield];await send('touchStart',contacts);}
   else await page.keyboard.down('Shift');
   let target;
   for(let n=0;n<8;n++){
    const scene=await inspect(),enemy=scene.entities.find(e=>e.kind==='guard'&&!e.dead);assert.ok(enemy);
    target=await project({...enemy,y:.8});
    if(touch){contacts=[{...target,id:1},shield];await send('touchMove',contacts);}else await page.mouse.move(target.x,target.y);
    await page.waitForTimeout(120);
    const current=await inspect();if(current.preview?.side?.bodyId===enemy.id)break;
   }
   const aimed=await inspect(),guard=aimed.entities.find(e=>e.kind==='guard');
   assert.equal(aimed.preview?.side?.bodyId,guard.id,'existing worker must predict the guard contact');
   assert.ok(aimed.velocity&&aimed.velocity.z<0);
   await page.screenshot({path:path.join(output,mode+'-aim.png')});
   if(touch)await send('touchEnd',[]);else{await page.mouse.up();await page.keyboard.up('Shift');}
   await page.waitForFunction(()=>window.__MAGIC__?.snapshot().fire.guardBurnRemaining>0&&window.__MAGIC__.snapshot().fire.guardHP<65,null,{timeout:3500});
   const hit=await state();assert.ok(hit.fire.guardBurnRemaining>0);assert.ok(hit.fire.guardHP<65);assert.equal(hit.holding,null);
   await page.screenshot({path:path.join(output,mode+'-hit.png')});
   await pause();const frozen=await state();await page.waitForTimeout(500);const paused=await state();
   assert.equal(paused.fire.crateBurnRemaining,frozen.fire.crateBurnRemaining);
   assert.equal(paused.fire.guardBurnRemaining,frozen.fire.guardBurnRemaining);
   await page.locator('#resume-button').click();
   await page.locator('#hud-mute').click();if(primary){assert.equal(await page.evaluate(()=>typeof JSON.parse(localStorage.getItem('magic-exiled-v1')).muted),'boolean');assert.equal(await page.evaluate(()=>localStorage.getItem('magic-exiled-fire-main-preview-v1')),null);}else assert.equal(await page.evaluate(()=>localStorage.getItem('magic-exiled-v1')),'protected-normal-save');
   const measurements=[];
   for(let n=0;n<4;n++){
    await restart();const reset=await state();assert.ok(reset.fire.torchLit);assert.equal(reset.fire.charged,false);assert.equal(reset.fire.crateBurnRemaining,0);assert.equal(reset.fire.hit,null);
    measurements.push((await inspect()).memory);
   }
   // The unmodified boss game varies by one uploaded geometry across its
   // randomized layouts (baseline allocation report). Reject larger growth.
   const counts=measurements.map(m=>m.geometries);assert.ok(Math.max(...counts)-Math.min(...counts)<=1,'restart allocation growth exceeds the verified baseline variation');
   const fireButton=await page.locator('[data-action="fire"] .ability-disc').boundingBox();assert.ok(fireButton.width>=48&&fireButton.height>=48);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
   report.cases.push({mode,passed:true,initial,charged,burning,aimed,hit,pauseFreeze:true,saveProtected:!primary,primarySaveWorks:primary,restarts:4,measurements,fireButton,overflow});
  }catch(error){const page=context.pages()[0];if(page){await page.screenshot({path:path.join(output,mode+'-failure.png')});report.failureState=await page.evaluate(()=>({url:location.href,state:window.__MAGIC__?.snapshot(),scene:window.__MAGIC__?.inspect()}));}throw error;}finally{await context.close();}
 }
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({cases:report.cases.map(c=>({mode:c.mode,passed:c.passed,hit:c.hit.fire.hit,guardHP:c.hit.fire.guardHP,restarts:c.restarts})),errors:report.errors,cleanup:report.cleanup},null,2));if(report.errors.length)process.exitCode=1;}
