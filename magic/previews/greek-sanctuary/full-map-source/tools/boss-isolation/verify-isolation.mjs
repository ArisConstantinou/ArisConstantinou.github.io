import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {chromium} from 'file:///C:/Users/arz0r/.codex/skills/develop-web-game/node_modules/playwright/index.mjs';
const root=process.env.CODEX_GENERATED_OUTPUT,out=root+'/tests/boss-isolation',live=process.argv.includes('--live');
process.env.TEMP=process.env.TMP=root+'/work/temp';await fs.mkdir(out,{recursive:true});
const result={status:'running',physicalPhone:false,live,errors:[],cases:[]},file=out+(live?'/live.json':'/runtime.json');await fs.writeFile(file,JSON.stringify(result));
execFileSync('powershell.exe',['-NoProfile','-Command','Get-CimInstance Win32_Process | Select-Object -First 1 -ExpandProperty ProcessId'],{windowsHide:true});
const context=await chromium.launchPersistentContext(root+'/work/browser',{channel:'chrome',headless:false,viewport:{width:430,height:745},deviceScaleFactor:3,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 27_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/156.0.8078.46 Mobile/15E148 Safari/604.1',args:['--mute-audio','--disable-background-mode','--disable-crash-reporter','--disable-gpu-shader-disk-cache','--disk-cache-size=33554432']});
const page=context.pages()[0];page.on('pageerror',e=>result.errors.push(e.message));page.on('response',r=>{if(r.status()>=400)result.errors.push(r.status()+' '+r.url());});
const url=live?'https://arisconstantinou.github.io/magic/?hearthQA=1&magic-update=1.6.35':'http://127.0.0.1:5173/performance-check/canonical/index.html?hearthQA=1';
async function waitRun(){await page.waitForFunction(()=>window.__MAGIC_SINGLE_COMBAT__?.running,null,{timeout:120000});}
async function report(){return page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.report);}
async function choose(id){await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.show());await page.locator('#sc-isolation').selectOption(id);await Promise.all([page.waitForURL(u=>u.searchParams.get('isolation')===id),page.locator('#sc-retry').click()]);await waitRun();}
try{
 await page.goto(url);await page.bringToFront();await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu',null,{timeout:120000});
 assert.match(await page.locator('#start-button').innerText(),/6/);await page.locator('#sc-menu-options').click();assert.equal(await page.locator('#sc-isolation option').count(),9);
 await page.screenshot({path:out+(live?'/live-options.png':'/options.png'),scale:'css'});await page.locator('#sc-close').click();await page.locator('#start-button').click();await waitRun();
 const cases=live?['baseline6','render-off','ai-off']:['baseline6','regular12','warden','colossus','gargoyle','wraith','render-off','ai-off','all'];
 for(const [index,id]of cases.entries()){
  if(index)await choose(id);
  const initial=await report(),cfg=initial.configuration,expected=id==='baseline6'?6:id==='regular12'?12:['all','render-off','ai-off'].includes(id)?16:13;
  assert.equal(initial.version,'1.6.35');assert.equal(cfg.isolation,id);assert.equal(initial.initialRoster.length,expected);assert.equal(cfg.enemyCount,expected);assert.equal(cfg.bossCount,Math.max(0,expected-(id==='baseline6'?6:12)));
  if(['warden','colossus','gargoyle','wraith'].includes(id))assert.deepEqual(initial.initialRoster.filter(e=>e.bossType).map(e=>e.bossType),[id]);
  const item={id,configuration:cfg,initialRoster:initial.initialRoster};
  if(id==='render-off'){
   await page.evaluate(()=>{window.__bossAnimationUpdates=0;for(const e of __HEARTH_QA__.entities.filter(e=>e.kind==='boss')){const original=e.visual.update;e.visual.update=function(...args){window.__bossAnimationUpdates++;return original.apply(this,args);};}});
   await page.waitForTimeout(1500);
   item.renderIsolation=await page.evaluate(()=>({animationUpdates:window.__bossAnimationUpdates,bosses:__HEARTH_QA__.entities.filter(e=>e.kind==='boss'&&!e.removed).map(e=>({visible:e.mesh.visible,body:__HEARTH_QA__.physics.bodies.includes(e.body),heldByAI:__MAGIC_SINGLE_COMBAT__.holdEnemy(e)}))}));
   assert(item.renderIsolation.animationUpdates>0);assert.equal(item.renderIsolation.bosses.length,4);assert(item.renderIsolation.bosses.every(e=>!e.visible&&e.body));assert.equal(cfg.bossAI,true);assert.equal(cfg.bossRendering,false);
   if(!live){await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.snapshot().stage==='combat',null,{timeout:20000});assert.equal(await page.evaluate(()=>__HEARTH_QA__.entities.filter(e=>e.kind==='boss'&&!e.dead&&!e.removed).some(e=>__MAGIC_SINGLE_COMBAT__.holdEnemy(e))),false);}
   await page.screenshot({path:out+(live?'/live-render-off.png':'/render-off.png'),scale:'css'});
  }
  if(id==='ai-off'){
   await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.snapshot().stage==='combat',null,{timeout:20000});
   item.aiIsolation=await page.evaluate(()=>__HEARTH_QA__.entities.filter(e=>e.category==='actor'&&!e.isPlayer&&!e.dead&&!e.removed).map(e=>({kind:e.kind,bossType:e.bossType||null,held:__MAGIC_SINGLE_COMBAT__.holdEnemy(e),visible:e.mesh.visible,channel:e.channel,bossTime:e.bossTime,attackIndex:e.attackIndex})));
   assert.equal(item.aiIsolation.filter(e=>e.kind==='boss').length,4);assert(item.aiIsolation.filter(e=>e.kind==='boss').every(e=>e.held&&e.visible));assert(item.aiIsolation.filter(e=>e.kind!=='boss').every(e=>!e.held));assert.equal(cfg.bossAI,false);assert.equal(cfg.bossRendering,true);
   await page.waitForTimeout(1500);assert.equal((await report()).summonedEnemies||0,0);
   await page.screenshot({path:out+(live?'/live-ai-off.png':'/ai-off.png'),scale:'css'});
  }
  if(!live&&['baseline6','all'].includes(id)){
   await page.waitForFunction(()=>!!__MAGIC_SINGLE_COMBAT__.report.finishedAt,null,{timeout:195000});item.report=await report();assert.equal(item.report.outcome,'complete');assert.equal(item.report.remaining,0);assert.equal(item.report.bossKills,id==='all'?4:0);assert(item.report.combat.fireHitCalls>0);assert(item.report.combat.stompHitCalls>0);
  }else await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.finish('isolation functional verification'));
  await page.waitForFunction(()=>!document.querySelector('#single-combat-panel').hidden);
  item.report??=await report();assert.deepEqual(item.report.errors,[]);assert.equal(item.report.configurationAtEnd.isolation,id);result.cases.push(item);await fs.writeFile(file,JSON.stringify(result,null,2));console.log('Verified '+id+' ('+expected+' initial actors)');
 }
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#sc-download').click()]);assert.equal(download.suggestedFilename(),'magic-benchmark.json');await download.saveAs(out+(live?'/live-export.json':'/export.json'));
 assert.deepEqual(result.errors,[]);result.status='passed';
}finally{await context.close();await new Promise(r=>setTimeout(r,1500));result.closed=true;await fs.writeFile(file,JSON.stringify(result,null,2));}
console.log(JSON.stringify({status:result.status,cases:result.cases.map(c=>c.id),live,closed:result.closed}));
