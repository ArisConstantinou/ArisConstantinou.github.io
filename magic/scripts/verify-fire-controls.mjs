import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve('output/playwright/fire-controls');await fs.mkdir(output,{recursive:true});
const report={cases:[],errors:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height] of [['desktop',1440,900],['portrait',390,844],['landscape',844,390]]){
  const touch=mode!=='desktop',context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
  try{
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
   await page.goto('http://127.0.0.1:5173/.cache/fire-sample/index.html');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();await page.waitForTimeout(80);
   const state=()=>page.evaluate(()=>window.__MAGIC__.snapshot()),scene=()=>page.evaluate(()=>window.__MAGIC__.inspect());
   const project=p=>page.evaluate(p=>window.__MAGIC__.project(p),p),cdp=touch?await context.newCDPSession(page):null;
   const send=(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
   const action=async(name,key)=>{if(touch)await page.locator(`.touch-actions [data-action="${name}"]`).tap();else await page.keyboard.press(key);await page.waitForTimeout(60);};
   if(touch)await page.locator('[data-action="fire"]').tap();else await page.keyboard.press('c');await page.waitForTimeout(500);
   await action('conjure','r');let stone=(await scene()).entities.filter(e=>e.kind==='stone').at(-1),point=await project(stone);
   if(touch)await send('touchStart',[{...point,id:1}]);else{await page.mouse.move(point.x,point.y);await page.mouse.down();}
   await page.waitForFunction(()=>!!window.__MAGIC__.snapshot().holding);
   assert.ok((await state()).fire.charged,'stone must not consume the charge');
   const aims=[];
   for(const [x,z] of [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]]){
    const p=(await state()).position;point=await project({x:p.x+x*3,y:.8,z:p.z+z*3});
    if(touch)await send('touchMove',[{...point,id:1}]);else await page.mouse.move(point.x,point.y);
    await page.waitForTimeout(90);const v=(await scene()).velocity,alignment=(v.x*x+v.z*z)/(Math.hypot(v.x,v.z)*Math.hypot(x,z));
    assert.ok(alignment>.995,`${mode} direction ${x},${z}: ${alignment}`);aims.push({x,z,alignment});
   }
   if(touch){const box=await page.locator('.touch-actions [data-action="drop"]').boundingBox();await send('touchStart',[{...point,id:1},{x:box.x+box.width/2,y:box.y+box.height/2,id:2}]);await send('touchEnd',[]);}else{await page.keyboard.press('q');await page.mouse.up();}
   await page.waitForTimeout(80);assert.equal((await state()).holding,null);assert.ok((await state()).fire.charged);
   const before=(await state()).position;
   if(touch){const box=await page.locator('#move-stick').boundingBox(),center={x:box.x+box.width/2,y:box.y+box.height/2,id:1};await send('touchStart',[center]);await send('touchMove',[{...center,y:center.y-40}]);await page.waitForTimeout(250);await send('touchEnd',[]);}else{await page.keyboard.down('w');await page.waitForTimeout(250);await page.keyboard.up('w');}
   await page.waitForTimeout(60);assert.ok((await state()).position.z<before.z-.3);
   await action('pulse','f');await action('dash','Space');
   const crate=(await scene()).entities.find(e=>e.fireSampleCrate);point=await project(crate);
   if(touch)await send('touchStart',[{...point,id:1}]);else{await page.mouse.move(point.x,point.y);await page.mouse.down();}
   await page.waitForFunction(()=>window.__MAGIC__.snapshot().fire.crateBurnRemaining>0);
   if(touch)await page.locator('#hud-pause').tap();else await page.keyboard.press('Escape');
   await page.waitForTimeout(80);const frozen=await state();assert.equal(frozen.holding,null);assert.equal(frozen.fire.hit,null);
   await page.waitForTimeout(300);assert.equal((await state()).fire.crateBurnRemaining,frozen.fire.crateBurnRemaining);
   if(touch)await send('touchEnd',[]);else await page.mouse.up();
   await page.locator('#resume-button').click();await page.waitForTimeout(8200);const expired=await state();assert.equal(expired.fire.crateBurnRemaining,0);assert.equal(expired.fire.hit,null);
   await page.screenshot({path:path.join(output,mode+'.png')});
   report.cases.push({mode,aims,stoneRetainsCharge:true,drop:true,movement:true,pulse:true,dash:true,pauseCancelsWithoutThrow:true,expiry:true});
  }finally{await context.close();}
 }
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;}
