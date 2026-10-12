import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {pathToFileURL} from 'node:url';
import {installArtifactFixture} from './mobile-artifact-fixture.mjs';
const root=path.resolve(import.meta.dirname,'..'),output=path.resolve(process.env.MAGIC_QA_OUTPUT||path.join(root,'output/playwright/castle-performance'));
await fs.mkdir(output,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const report={date:new Date().toISOString(),cpu:os.cpus()[0]?.model,conditions:'Desktop Chrome/GPU; touch 390x844 DPR3, native low quality; active enemy AI; seeded 821; CPU throttle is a surrogate, not physical phone proof',samples:[],errors:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});let context;
try {
 for(const revision of (process.env.MAGIC_BENCH_REVISIONS||'before,after').split(',')) {
  context=await managed.browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:3,serviceWorkers:'block'});
  await installArtifactFixture(context,revision==='before'?path.join(root,'_source/.cache/mobile-performance-baseline'):path.join(root,'_source/.release'),'/.cache/mobile-game/');
  await context.addInitScript(()=>{let seed=821;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto('http://127.0.0.1:5173/.cache/mobile-game/?hearthQA=1');
  await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
  // Avoid an early death terminating the measurement. Enemy AI and physics stay active.
  await page.evaluate(()=>{__HEARTH_QA__.player.hp=__HEARTH_QA__.player.maxHp=10000;});
  await page.waitForTimeout(1200);await page.screenshot({path:path.join(output,revision+'-start.png')});
  const cdp=await context.newCDPSession(page);
  for(const scene of (process.env.MAGIC_BENCH_SCENES||'idle').split(',')) {
   if(scene==='battle')await page.evaluate(()=>{const q=__HEARTH_QA__,r=q.world.rooms.find(r=>r.id==='hall'),p=q.player.body;p.position.set(r.x+r.w/2,1,r.z+r.d/2);p.velocity.setZero();q.player.hp=q.player.maxHp=10000;let i=0;for(const e of q.entities.filter(e=>e.category==='actor'&&!e.isPlayer&&e.kind!=='boss').slice(0,3)){e.body.position.set(p.position.x+(i++-1)*2.5,e.cy+.08,p.position.z-3);e.body.velocity.setZero();e.body.aabbNeedsUpdate=true;e.body.wakeUp();e.aggro=true;}});
   if(scene==='held') {
    await page.evaluate(()=>{__HEARTH_QA__.startRun();__HEARTH_QA__.player.hp=__HEARTH_QA__.player.maxHp=10000;});await page.waitForTimeout(800);
    const pick=await page.evaluate(()=>{const q=__HEARTH_QA__,p=q.player.body.position,e=q.entities.filter(e=>e.kind==='crate'&&Math.hypot(e.body.position.x-p.x,e.body.position.z-p.z)<5).sort((a,b)=>Math.hypot(a.body.position.x-p.x,a.body.position.z-p.z)-Math.hypot(b.body.position.x-p.x,b.body.position.z-p.z))[0];return __MAGIC__.project(e.body.position);});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,...pick}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:pick.x+60,y:pick.y-40}]});await page.waitForFunction(()=>!!__MAGIC__.snapshot().holding);await page.waitForFunction(()=>__MAGIC__.inspect().preview?.points.length>1);
   }
  for(const rate of (process.env.MAGIC_BENCH_RATES||'1,4').split(',').map(Number)) {
   await cdp.send('Emulation.setCPUThrottlingRate',{rate});await page.waitForTimeout(700);
   await cdp.send('Profiler.enable');await cdp.send('Profiler.start');
   const stats=await page.evaluate(()=>new Promise(resolve=>{const frames=[];let last;function tick(t){if(last!==undefined)frames.push(t-last);last=t;if(frames.length<90)return requestAnimationFrame(tick);const s=[...frames].sort((a,b)=>a-b),q=__HEARTH_QA__;
    resolve({fps:90000/frames.reduce((a,b)=>a+b,0),median:s[45],p95:s[85],p99:s[89],max:s.at(-1),over50:frames.filter(t=>t>50).length,render:{...q.renderer.info.render},memory:{...q.renderer.info.memory},physicsBodies:q.physics.bodies.length,state:__MAGIC__.snapshot()});}requestAnimationFrame(tick);}));
   const {profile}=await cdp.send('Profiler.stop');await cdp.send('Profiler.disable');
   const hits=new Map();for(const id of profile.samples||[])hits.set(id,(hits.get(id)||0)+1);
   const cpu=profile.nodes.map(n=>({function:n.callFrame.functionName,url:n.callFrame.url,line:n.callFrame.lineNumber,samples:hits.get(n.id)||0})).sort((a,b)=>b.samples-a.samples).slice(0,25);
   await fs.writeFile(path.join(output,revision+'-'+scene+'-cpu-'+rate+'.json'),JSON.stringify(profile));
   report.samples.push({revision,scene,rate,...stats,cpu});
  }
  if(scene==='held')await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  }
  await context.close();context=null;
 }
 report.comparison=[];
 for(const scene of [...new Set(report.samples.map(s=>s.scene))])for(const rate of [...new Set(report.samples.map(s=>s.rate))]){
  const group=revision=>report.samples.filter(s=>s.revision===revision&&s.scene===scene&&s.rate===rate),before=group('before'),after=group('after');
  if(!before.length||!after.length)continue;
  const mean=(group,key)=>group.reduce((sum,s)=>sum+s[key],0)/group.length;
  const regression=mean(after,'fps')<mean(before,'fps')*.8||mean(after,'p95')>mean(before,'p95')*1.2;
  report.comparison.push({scene,rate,beforeFPS:mean(before,'fps'),afterFPS:mean(after,'fps'),beforeP95:mean(before,'p95'),afterP95:mean(after,'p95'),regression});
 }
 report.passed=report.errors.length===0&&!report.comparison.some(s=>s.regression); if(!report.passed)process.exitCode=1;
}catch(error){report.failure=error.stack;process.exitCode=1;}
finally {
 await context?.close();await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
 try{await managed.cleanup();}catch(e){report.cleanupFailure=e.message;process.exitCode=1;}
 report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};
 await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({passed:report.passed,samples:report.samples.map(({revision,scene,rate,fps,p95,max,over50,render})=>({revision,scene,rate,fps,p95,max,over50,render})),failure:report.failure,cleanup:report.cleanup},null,2));
}
