import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {installArtifactFixture} from './mobile-artifact-fixture.mjs';
const root=path.resolve(import.meta.dirname,'..'),source=process.argv.includes('--source'),output=path.join(root,'output/playwright',source?'castle-source-preview':'castle-browser');await fs.mkdir(output,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const report={date:new Date().toISOString(),delivery:source?'Actual Vite source preview, no network fixture':'Exact compiled artifact, owned browser network fixture',cases:[],restarts:[],errors:[],limitations:['Desktop GPU, emulated touch; physical phone not connected','Character placement/stun fixtures used only for functional checks and screenshots; performance benchmark keeps AI active']};
const check=(name,pass,data)=>{report.cases.push({name,pass:!!pass,data});assert.ok(pass,name);};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});let context;
try{
 context=await managed.browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:3,serviceWorkers:'block'});
 if(!source)await installArtifactFixture(context,root,'/.cache/mobile-game/');
 await context.addInitScript(()=>{let seed=821;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;localStorage.setItem('magic-exiled-v1','protected-primary-profile');});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 await page.goto('http://127.0.0.1:5173/.cache/mobile-game/?hearthQA=1');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
 const initial=await page.evaluate(()=>{const q=__HEARTH_QA__;return{rooms:q.world.rooms.length,secrets:q.world.secrets.length,spawn:q.world.spawn,render:q.renderer.info.render};});
 check('fourteen rooms plus bridge and three secrets',initial.rooms===15&&initial.secrets===3,initial);
 await page.screenshot({path:path.join(output,'portrait-start.png')});
 for(let i=0;i<40;i++){
  const state=await page.evaluate(()=>{const q=__HEARTH_QA__;q.startRun();const zone=q.world.zones.find(r=>q.world.spawn.x>=r.xMin&&q.world.spawn.x<=r.xMax&&q.world.spawn.z>=r.zMin&&q.world.spawn.z<=r.zMax);
   const enemies=q.entities.filter(e=>e.category==='actor'&&!e.isPlayer),bad=enemies.filter(e=>e.body.position.x>=zone.xMin-.65&&e.body.position.x<=zone.xMax+.65&&e.body.position.z>=zone.zMin-.65&&e.body.position.z<=zone.zMax+.65);
   const p=q.engine.body.position;return{engineRoom:q.engine.location.room.name,startRoom:zone.name,bad:bad.length,enemies:enemies.length,bosses:enemies.filter(e=>e.kind==='boss').length,engineClear:q.world.colliders.every(o=>Math.abs(p.x-o.x)>o.w/2+1.75||Math.abs(p.z-o.z)>o.d/2+1.75),bodies:q.physics.bodies.length,fallen:q.entities.filter(e=>e.body.position.y<-.1).length};});
  report.restarts.push(state);check('restart '+i+' safe population',state.bad===0&&state.enemies===68&&state.bosses===4&&state.engineRoom!==state.startRoom&&state.engineClear&&state.fallen===0,state);
 }
 check('restart body count stays constant',new Set(report.restarts.map(s=>s.bodies)).size===1);
 await page.waitForTimeout(2100);
 const slept=await page.evaluate(()=>__HEARTH_QA__.entities.filter(e=>e.category==='actor'&&!e.isPlayer&&e.body.sleepState===2).length);check('idle distant actors sleep',slept>20,slept);
 const reactivated=await page.evaluate(()=>{const q=__HEARTH_QA__,e=q.entities.find(e=>e.category==='actor'&&!e.isPlayer&&e.kind!=='boss'&&e.body.sleepState===2);const p=e.body.position;q.player.body.position.set(p.x,1,p.z+2);q.player.body.velocity.setZero();window.advanceTime(500);return{visible:e.mesh.visible,attached:!!e.mesh.parent,active:e.body.sleepState!==2,sleepState:e.body.sleepState,aggro:e.aggro,windup:e.windup};});
 check('nearby sleeping actor wakes with AI and visible rig',reactivated.visible&&reactivated.attached&&reactivated.active&&reactivated.aggro,reactivated);
 await page.evaluate(()=>{const q=__HEARTH_QA__;q.player.hp=q.player.maxHp=10000;for(const e of q.entities)if(e.category==='actor'&&!e.isPlayer)e.stun=1e6;});
 for(const id of ['library-secret','forge-secret','catacombs-secret']){
  const result=await page.evaluate(id=>{const q=__HEARTH_QA__,r=q.world.secrets.find(r=>r.id===id),before=__MAGIC__.snapshot().inventory.items.length;
   q.player.body.position.set(r.loot.x,1,r.loot.z);q.player.body.velocity.setZero();window.advanceTime(350);const after=__MAGIC__.snapshot().inventory.items.length;
   window.advanceTime(350);return{before,after,again:__MAGIC__.snapshot().inventory.items.length,item:__MAGIC__.snapshot().inventory.items.at(-1),onFloor:q.nav.onFloor(q.player.body.position.x,q.player.body.position.z),y:q.player.body.position.y};},id);
  check(id+' real pickup exactly once per run',result.after===result.before+1&&result.again===result.after&&result.onFloor&&result.y>.75,result);
  await page.waitForTimeout(200);await page.screenshot({path:path.join(output,id+'.png')});
 }
 check('normal profile is protected',await page.evaluate(()=>localStorage.getItem('magic-exiled-v1')==='protected-primary-profile'));
 await page.setViewportSize({width:1440,height:900});
 await page.waitForTimeout(1100);
 await page.evaluate(()=>{const q=__HEARTH_QA__,r=q.world.rooms.find(r=>r.id==='library');q.player.body.position.set(r.x+r.w/2,1,r.z+r.d/2);q.player.body.velocity.setZero();window.advanceTime(700);});
 await page.waitForTimeout(1100);report.wide=await page.evaluate(()=>({state:__MAGIC__.snapshot(),camera:__HEARTH_QA__.camera.position.toArray(),render:__HEARTH_QA__.renderer.info.render}));await page.screenshot({path:path.join(output,'wide-library.png')});
 check('no browser errors',report.errors.length===0,report.errors);report.passed=true;
}catch(e){report.failure=e.stack;process.exitCode=1;}
finally{await context?.close();await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));try{await managed.cleanup();}catch(e){report.cleanupFailure=e.message;process.exitCode=1;}report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,checks:report.cases.length,failed:report.cases.filter(c=>!c.pass),errors:report.errors,failure:report.failure,cleanup:report.cleanup},null,2));}
