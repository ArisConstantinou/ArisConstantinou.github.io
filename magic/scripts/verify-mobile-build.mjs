import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {installArtifactFixture} from './mobile-artifact-fixture.mjs';
const root=path.resolve(import.meta.dirname,'..'),output=path.resolve(process.env.MAGIC_QA_OUTPUT||path.join(root,'output/playwright/mobile-build'));await fs.mkdir(output,{recursive:true});
const url=process.env.MAGIC_TEST_URL||'http://127.0.0.1:5173/.cache/mobile-build/?hearthQA=1';
const localArtifact=new URL(url).hostname==='127.0.0.1';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const version=JSON.parse(await fs.readFile(path.join(root,'_source/package.json'),'utf8')).version;
const report={date:new Date().toISOString(),version,url,delivery:localArtifact?'Exact saved artifact through owned-browser network fixture; no application-source edits':'Real public release; no network fixture',cases:[],errors:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});let context;
const check=(mode,name,pass)=>{report.cases.push({mode,name,pass:!!pass});assert.ok(pass,mode+': '+name);};
try {
 for(const [mode,width,height,touch] of [['desktop',1440,900,false],['portrait',390,676,true],['landscape',844,390,true]]) {
  context=await managed.browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,deviceScaleFactor:1,serviceWorkers:'block'});
  if(localArtifact)await installArtifactFixture(context,root,new URL(url).pathname);
  await context.addInitScript(()=>{let seed=821;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;localStorage.setItem('magic-exiled-v1','protected-normal-save');});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  await page.goto(url);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
  check(mode,'exact compiled version',await page.evaluate(v=>__MAGIC__.version===v,version));
  if(touch)check(mode,'visible version label readable',await page.locator('#loading-label').evaluate(e=>e.textContent.includes('1.4.1')&&parseFloat(getComputedStyle(e).fontSize)>=12));
  await page.screenshot({path:path.join(output,mode+'-menu.png')});
  await page.locator('#start-button').click();await page.waitForTimeout(300);
  await page.evaluate(()=>{for(const e of __HEARTH_QA__.entities)if(e.category==='actor'&&!e.isPlayer)e.stun=1e6;});
  const cdp=touch?await context.newCDPSession(page):null,send=(type,points=[])=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
  const fire=page.locator('[data-action="fire"]').filter({visible:true}).first();if(touch)await fire.tap();else await page.keyboard.press('c');
  await page.waitForFunction(()=>__MAGIC__.snapshot().fire.charged);check(mode,'native fire control preserved',true);
  if(touch)check(mode,'unmounted flamethrower is folded',await page.locator('.hearth-actions').isHidden());
  const item=await page.evaluate(()=>{const all=__MAGIC__.inspect().entities,p=all.find(e=>e.isPlayer);return all.filter(e=>e.kind==='crate'&&Math.hypot(e.x-p.x,e.z-p.z)<5).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];});
  const pick=await page.evaluate(p=>__MAGIC__.project(p),item);
  if(touch)await send('touchStart',[{id:1,...pick}]);else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
  await page.waitForFunction(()=>__MAGIC__.snapshot().holding==='Κιβώτιο');
  const end={x:pick.x+80,y:pick.y-35};if(touch)await send('touchMove',[{id:1,...end}]);else await page.mouse.move(end.x,end.y);
  await page.waitForFunction(()=>__MAGIC__.inspect().preview?.points.length>1);
  check(mode,'compiled worker predicts native grab',true);
  if(touch)check(mode,'compiled touch mark visible',await page.locator('#throw-mark').isVisible());
  await page.screenshot({path:path.join(output,mode+'-aim.png')});
  if(touch)await send('touchEnd');else await page.mouse.up();await page.waitForTimeout(90);
  check(mode,'native release clears held object',await page.evaluate(()=>!__MAGIC__.snapshot().holding));
  if(touch) {
    check(mode,'compiled mark clears after release',await page.locator('#throw-mark').isHidden());
    await page.locator('#hud-status').tap();await page.waitForFunction(()=>__MAGIC__.snapshot().phase==='inventory');
    const time=await page.evaluate(()=>__MAGIC__.snapshot().time);await page.waitForTimeout(160);
    check(mode,'compiled details pause game',await page.evaluate(t=>__MAGIC__.snapshot().time===t,time));
    check(mode,'suit location available in details',await page.locator('#modal-content').innerText().then(t=>t.includes('Τοποθεσία:')&&t.includes('Στολή μάχης')));
    check(mode,'details hide gameplay controls and notices',await page.locator('#game-hud').isHidden()&&await page.locator('#toasts').isHidden());
    await page.screenshot({path:path.join(output,mode+'-details.png')});
    await page.locator('#modal-close').tap();check(mode,'compiled details close resumes',await page.evaluate(()=>__MAGIC__.snapshot().phase==='playing'));
    for(let i=0;i<7;i++)await page.locator('.touch-actions [data-action="conjure"]').tap();
    check(mode,'native action spam remains one notice',await page.locator('#toasts .toast').count()<=1);
  }else{await page.keyboard.press('Escape');check(mode,'desktop pause preserved',await page.evaluate(()=>__MAGIC__.snapshot().phase==='paused'));}
  check(mode,'no overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  check(mode,'normal save preserved',await page.evaluate(()=>localStorage.getItem('magic-exiled-v1')==='protected-normal-save'));
  await context.close();context=null;
 }
 check('all','no browser errors',report.errors.length===0);report.passed=true;
}catch(error){report.failure=error.stack;process.exitCode=1;}
finally{await context?.close();await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,checks:report.cases.length,failures:report.cases.filter(c=>!c.pass),errors:report.errors,failure:report.failure,cleanup:report.cleanup},null,2));}
