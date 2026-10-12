import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve('output/expansion');await fs.mkdir(output,{recursive:true});
const qa=await fs.readFile('scripts/verify-goliath-game.mjs','utf8');
const hooks=qa.match(/const extra=`([\s\S]*?)`;/)[1];
const extras=`window.__EXP_BENCH__={stress:()=>{startRun();player.hp=player.maxHp=10000;player.invulnerable=10000;
 const enemies=entities.filter(e=>e.category==='actor'&&!e.isPlayer&&!e.ally&&!e.dead&&!e.removed);
 while(enemies.length<96)enemies.push(actor(enemies.length%3===0?'archer':'guard',0,10));
 enemies.forEach((e,i)=>{e.body.position.set(-8+(i%12)*1.4,e.cy+.05,5+Math.floor(i/12)*1.4);e.body.velocity.set(0,0,0);e.aggro=true;});syncVisuals(0);},
 stats:()=>({bodies:physics.bodies.length,enemies:livingEnemies(),visibleActors:entities.filter(e=>e.category==='actor'&&e.mesh.visible).length,geometry:renderer.info.memory.geometries,textures:renderer.info.memory.textures,draw:renderer.info.render}),
 held:()=>{const e=entities.find(e=>e.ephemeral&&!e.removed);holdEntity(e);},alarm:()=>{relicTaken=true;}}
`;
const profileHooks=`let cpu={};const measure=(name,fn)=>(...args)=>{const start=performance.now(),value=fn(...args);const item=cpu[name]||(cpu[name]={total:0,count:0});item.total+=performance.now()-start;item.count++;return value;};
updateEntities=measure('entities',updateEntities);syncVisuals=measure('visuals',syncVisuals);updateCamera=measure('camera',updateCamera);
physics.step=measure('physics',physics.step.bind(physics));renderer.render=measure('renderPass',renderer.render.bind(renderer));
window.__EXP_CPU__={reset:()=>cpu={},snapshot:()=>Object.fromEntries(Object.entries(cpu).map(([name,v])=>[name,{meanMs:v.total/v.count,count:v.count}]))};`;
const report={date:new Date().toISOString(),errors:[],samples:[],restarts:[],baseline:JSON.parse(await fs.readFile(path.join(output,'before.json'),'utf8'))};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 const context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
 await context.route('**/.cache/goliath-game/src/main.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+hooks+extras+profileHooks});});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 const start=performance.now();await page.goto('http://127.0.0.1:5173/.cache/goliath-game/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');report.loadMs=performance.now()-start;
 await page.locator('#start-button').click();
 async function sample(name){
  await page.evaluate(()=>window.__EXP_TEST__.resumeClock());await page.waitForTimeout(350);await page.evaluate(()=>window.__EXP_CPU__.reset());
  const result=await page.evaluate(async()=>{
   const frames=[];await new Promise(resolve=>{let last;function f(t){if(last)frames.push(t-last);last=t;if(frames.length<240)requestAnimationFrame(f);else resolve();}requestAnimationFrame(f);});
   frames.sort((a,b)=>a-b);const gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');
   return {fps:240000/frames.reduce((a,b)=>a+b,0),p95:frames[228],p99:frames[237],max:frames.at(-1),over50:frames.filter(f=>f>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'unavailable',...window.__EXP_BENCH__.stats(),cpu:window.__EXP_CPU__.snapshot()};
  });report.samples.push({name,...result});
  await page.screenshot({path:path.join(output,'performance-'+name+'.png')});
 }
 if(!process.argv.includes('--stress-only')){
 await sample('opening');
 await page.evaluate(()=>window.__EXP_TEST__.prepare(7));await page.keyboard.down('r');await page.waitForTimeout(2100);await page.keyboard.up('r');await sample('assembly');
 await page.waitForTimeout(5300);await sample('goliath');
 await page.evaluate(()=>window.__EXP_TEST__.prepare(1));await page.evaluate(()=>window.__EXP_BENCH__.held());await sample('held-trajectory');
 }
 await page.evaluate(()=>window.__EXP_BENCH__.stress());await sample('96-enemy-stress');
 await page.evaluate(()=>window.__EXP_BENCH__.alarm());await sample('96-enemy-alarm');
 for(let i=0;i<6;i++){await page.evaluate(()=>window.__EXP_TEST__.prepare(7));await page.keyboard.down('r');await page.evaluate(()=>window.advanceTime(2200));await page.keyboard.up('r');await page.evaluate(()=>window.advanceTime(6300));await page.evaluate(()=>window.__EXP_TEST__.prepare(0));await page.evaluate(()=>window.__EXP_TEST__.draw());report.restarts.push(await page.evaluate(()=>window.__EXP_BENCH__.stats()));}
 await context.close();
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'performance.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({loadMs:report.loadMs,samples:report.samples,restarts:report.restarts,errors:report.errors,cleanup:report.cleanup},null,2));if(report.errors.length||report.samples.some(s=>s.fps<60)||report.restarts.at(-1)?.geometry>report.restarts[1]?.geometry+4)process.exitCode=1;}
