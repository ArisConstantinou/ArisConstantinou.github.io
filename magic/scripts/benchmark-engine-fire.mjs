import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const out=path.resolve('output/playwright/engine-fire/performance');await fs.mkdir(out,{recursive:true});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:out});
const report={conditions:'One owned Chrome, RTX 5080/ANGLE D3D11, DPR1. ABBA, same seeded court, frozen hostile AI, native held V and actual frame() including compositor. Touch sizes are PC emulation. CPU elapsed includes JS/render submission; no claim of GPU frame time or physical-phone speed.',samples:[],errors:[]};
try{
 for(const [mode,width,height,touch]of [['desktop',1440,900,false],['portrait',390,844,true],['landscape',844,390,true]]){
  for(const [order,label]of ['before','preview','preview','before'].entries()){
   const context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
   try{
    const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
    await page.goto(`http://127.0.0.1:5173/.cache/engine-fire-${label}/index.htm?hearthQA=1`);await page.waitForFunction(()=>window.__HEARTH_QA__);
    await page.evaluate(()=>{let seed=7431;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);});await page.locator('#start-button').click();
    await page.evaluate(()=>{
     const q=__HEARTH_QA__;for(const e of q.entities)if(e.category==='actor'&&!e.isPlayer){e.stun=1e5;e.attackCooldown=1e5;e.body.velocity.set(0,0,0);}
     q.player.invulnerable=1e5;q.engine.body.position.set(0,1.24,10);q.engine.body.velocity.set(0,0,0);q.engine.yaw=Math.PI/2;q.engine.heart.state='piloted';q.engine.heart.fuel=100;q.player.yaw=Math.PI/2;
     q.player.body.position.set(0,q.player.cy+.08,10);q.player.body.type=4;q.player.body.collisionFilterMask=0;q.player.body.updateMassProperties();window.advanceTime(1200);q.renderer.info.autoReset=false;
    });
    const target=await page.evaluate(()=>{const q=__HEARTH_QA__,v=q.player.mesh.position.clone().set(6,.8,10).project(q.camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};});await page.mouse.move(target.x,target.y);await page.keyboard.down('v');await page.waitForTimeout(600);
    const metrics=await page.evaluate(async()=>{
     const q=__HEARTH_QA__,cpu=[];for(let i=0;i<180;i++){q.engine.heart.fuel=100;const t=performance.now();window.advanceTime(1000/60);cpu.push(performance.now()-t);}
     await new Promise(resolve=>setTimeout(resolve,1050));
     const frames=[];await new Promise(resolve=>{let last;function tick(t){q.engine.heart.fuel=100;if(last!==undefined)frames.push(t-last);last=t;if(frames.length<180)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
     const sorted=[...frames].sort((a,b)=>a-b),c=[...cpu].sort((a,b)=>a-b),scene=q.engine.visual.group.parent,volume=scene.getObjectByName('hearth-jet-volume'),smoke=scene.getObjectByName('hearth-jet-smoke');
     return{cpuP50:c[90],cpuP95:c[171],cpuMax:c.at(-1),cpuOver50:cpu.filter(v=>v>50).length,p50:sorted[90],p95:sorted[171],max:sorted.at(-1),over50:frames.filter(v=>v>50).length,
      firing:q.engine.heart.firing,render:{...q.renderer.info.render},memory:{...q.renderer.info.memory},heap:performance.memory?.usedJSHeapSize,jet:{volume:volume?.visible??false,smoke:smoke?.count??0,steps:volume?.material.uniforms.steps.value}};
    });
    report.samples.push({mode,label,order,...metrics});assert.ok(metrics.firing,'Active fire required for benchmark');assert.ok(metrics.cpuP95<16.7&&metrics.cpuOver50===0,`${mode} ${label} CPU budget`);assert.ok(metrics.p95<33.4&&metrics.over50===0,`${mode} ${label} frame budget`);
    await page.keyboard.up('v');
    if(label==='preview'&&order===1){
     const resources=await page.evaluate(()=>{
      const q=__HEARTH_QA__,scene=q.engine.visual.group.parent;const count=()=>{let geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry.uuid);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m.uuid);});return{geometries:geometries.size,materials:materials.size};};
      q.startRun();const before=count();for(let i=0;i<12;i++)q.startRun();return{before,after:count(),smoke:scene.getObjectByName('hearth-jet-smoke').count,volume:scene.getObjectByName('hearth-jet-volume').visible};
     });
     assert.deepEqual(resources.before,resources.after,'Scene resources must remain fixed across twelve restarts');assert.equal(resources.smoke,0);assert.equal(resources.volume,false);report.samples.at(-1).restartResources=resources;
    }
   }finally{await context.close();}
  }
 }
 assert.equal(report.errors.length,0);report.passed=true;
}catch(e){report.failure=e.stack;process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));}
