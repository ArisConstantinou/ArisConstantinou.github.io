import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const before=process.argv.includes('--before'),label=before?'before':'preview';
const selected=process.argv.find(a=>a.startsWith('--only='))?.split('=')[1];
const out=path.resolve(process.env.MAGIC_TEST_OUTPUT||path.join('output/playwright/engine-fire',label));await fs.mkdir(out,{recursive:true});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:out});
const report={label,url:process.env.MAGIC_TEST_URL||`http://127.0.0.1:5173/.cache/engine-fire-${label}/index.htm?hearthQA=1`,errors:[],cases:[]};
try{
 for(const [mode,width,height,touch] of [['desktop',1440,900,false],['portrait',390,844,true],['landscape',844,390,true]].filter(v=>!selected||v[0]===selected)){
  const context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
  try{
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
   await page.addInitScript(()=>{window.MAGIC_TEST_SEED=7431;localStorage.setItem('magic-exiled-v1','engine-fire-protected-save');});
   await page.goto(report.url);await page.waitForFunction(()=>window.__HEARTH_QA__);
   await page.evaluate(()=>{let seed=7431;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);});
   await page.locator('#start-button').click();
   await page.evaluate(()=>{
    const q=__HEARTH_QA__;for(const e of q.entities)if(e.category==='actor'&&!e.isPlayer){e.stun=1e5;e.attackCooldown=1e5;e.body.velocity.set(0,0,0);}
    q.player.invulnerable=1e5;q.engine.body.position.set(0,1.24,10);q.engine.body.velocity.set(0,0,0);q.engine.yaw=Math.PI/2;
    q.engine.heart.state='piloted';q.engine.heart.fuel=100;q.player.yaw=Math.PI/2;
    q.player.body.position.set(0,q.player.cy+.08,10);q.player.body.velocity.set(0,0,0);q.player.body.type=4;q.player.body.collisionFilterMask=0;q.player.body.updateMassProperties();
    window.advanceTime(1200);
   });
   const target=await page.evaluate(()=>{const q=__HEARTH_QA__,v=q.player.mesh.position.clone().set(6,.8,10).project(q.camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};});
   await page.mouse.move(target.x,target.y);await page.keyboard.down('v');
   await page.evaluate(()=>window.advanceTime(850));
   await page.screenshot({path:path.join(out,`${mode}-fire.png`)});
   if(mode==='desktop'){
    const detail=await page.evaluate(()=>{
     const q=__HEARTH_QA__,p=q.engine.body.position;q.camera.position.set(p.x+5,6,p.z+10);q.camera.lookAt(p.x+2,1.8,p.z);q.camera.updateMatrixWorld();
     q.step(0,{moveX:0,moveZ:0,firing:true});q.renderer.render(q.engine.visual.group.parent,q.camera);return q.renderer.domElement.toDataURL('image/png');
    });
    await fs.writeFile(path.join(out,'desktop-detail.png'),Buffer.from(detail.split(',')[1],'base64'));
   }
   const snapshots=[];
   for(const delta of [0,160,320]){await page.evaluate(ms=>window.advanceTime(ms),delta);await page.screenshot({path:path.join(out,`${mode}-motion-${delta}.png`)});snapshots.push(await page.evaluate(()=>{
    const q=__HEARTH_QA__,scene=q.engine.visual.group.parent,volume=scene.getObjectByName('hearth-jet-volume'),smoke=scene.getObjectByName('hearth-jet-smoke');
    return{time:q.time,engine:{...q.engine.body.position},player:{...q.player.body.position},visual:q.engine.visual.group.position.toArray(),fuel:q.engine.heart.fuel,firing:q.engine.heart.firing,length:q.engine.jetLength,volume:volume?.visible??false,smoke:smoke?.count??0,steps:volume?.material.uniforms.steps.value,memory:{...q.renderer.info.memory}};
   }));}
   await page.keyboard.up('v');await page.evaluate(()=>window.advanceTime(60));
   const released=await page.evaluate(()=>{const q=__HEARTH_QA__,scene=q.engine.visual.group.parent;return{firing:q.engine.heart.firing,volume:scene.getObjectByName('hearth-jet-volume')?.visible??false,smoke:scene.getObjectByName('hearth-jet-smoke')?.count??0};});
   await page.screenshot({path:path.join(out,`${mode}-released.png`)});
   await page.keyboard.press('p');await page.evaluate(()=>window.advanceTime(0));const paused=await page.evaluate(()=>{const q=__HEARTH_QA__,s=q.engine.visual.group.parent.getObjectByName('hearth-jet-smoke');return{phase:__MAGIC__.snapshot().phase,time:q.time,fuel:q.engine.heart.fuel,puffs:JSON.stringify(Array.from(s?.geometry.attributes.puff.array||[]))};});await page.waitForTimeout(140);
   const pauseFrozen=await page.evaluate(p=>{const q=__HEARTH_QA__,s=q.engine.visual.group.parent.getObjectByName('hearth-jet-smoke');return p.phase==='paused'&&__MAGIC__.snapshot().phase==='paused'&&q.time===p.time&&q.engine.heart.fuel===p.fuel&&JSON.stringify(Array.from(s?.geometry.attributes.puff.array||[]))===p.puffs;},paused);
   await page.keyboard.press('p');await page.evaluate(()=>window.advanceTime(3200));
   const finished=await page.evaluate(()=>{const q=__HEARTH_QA__,scene=q.engine.visual.group.parent;return{smoke:scene.getObjectByName('hearth-jet-smoke')?.count??0,save:localStorage.getItem('magic-exiled-v1'),overflow:document.documentElement.scrollWidth>innerWidth};});
   await page.evaluate(()=>{const q=__HEARTH_QA__;q.engine.body.position.set(5,1.24,10);q.engine.body.velocity.set(0,0,0);q.player.body.position.set(5,q.player.cy+.08,10);q.engine.yaw=Math.PI/2;q.player.yaw=Math.PI/2;q.engine.heart.fuel=100;});
   const wallAim=await page.evaluate(()=>{const q=__HEARTH_QA__,v=q.player.mesh.position.clone().set(12,.8,10).project(q.camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};});
   await page.mouse.move(wallAim.x,wallAim.y);await page.keyboard.down('v');await page.evaluate(()=>window.advanceTime(350));
   const wall=await page.evaluate(()=>{const q=__HEARTH_QA__,v=q.engine.visual.group.parent.getObjectByName('hearth-jet-volume'),bone=q.engine.visual.bones.nozzle,origin=q.engine.visual.point('nozzle',.28),direction=origin.clone().set(0,1,0).transformDirection(bone.matrixWorld);direction.multiplyScalar(1/Math.max(.01,Math.hypot(direction.x,direction.z)));
    const endpoint=origin.clone().addScaledVector(direction,q.engine.jetLength);
    const wallContact=q.world.colliders.find(o=>o.y+o.h/2>1.15&&Math.abs(endpoint.x-o.x)<=o.w/2+.025&&Math.abs(endpoint.y-o.y)<=o.h/2+.025&&Math.abs(endpoint.z-o.z)<=o.d/2+.025);
    return{length:q.engine.jetLength,renderLength:v?.material.uniforms.lengthM.value,expectedLength:q.engine.jetLength*direction.length(),origin:origin.toArray(),endpoint:endpoint.toArray(),wallContact,engineX:q.engine.body.position.x};});
   await page.screenshot({path:path.join(out,`${mode}-wall.png`)});await page.keyboard.up('v');await page.evaluate(()=>window.advanceTime(60));
   const metrics=await page.evaluate(async()=>{
    const q=__HEARTH_QA__;q.engine.heart.fuel=100;
    const frames=[];await new Promise(resolve=>{let last;function frame(t){if(last!==undefined)frames.push(t-last);last=t;if(frames.length<180)requestAnimationFrame(frame);else resolve();}requestAnimationFrame(frame);});
    const sorted=[...frames].sort((a,b)=>a-b),gl=q.renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');
    return{p50:sorted[90],p95:sorted[171],max:sorted.at(-1),over50:frames.filter(v=>v>50).length,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,memory:{...q.renderer.info.memory}};
   });
   const checks={volume:snapshots.every(s=>s.volume),smoke:snapshots.at(-1).smoke>0,released:!released.firing&&!released.volume&&released.smoke>0,expired:finished.smoke===0,pauseFrozen,wallClipped:wall.length>0&&wall.length<7&&!!wall.wallContact&&Math.abs(wall.renderLength-wall.expectedLength)<.001,saveProtected:finished.save==='engine-fire-protected-save',noOverflow:!finished.overflow,noHmrOverlay:await page.locator('vite-error-overlay').count()===0};
   report.cases.push({mode,snapshots,released,finished,wall,checks,metrics});
   if(!before&&Object.values(checks).some(v=>!v))throw new Error(`${mode}: ${JSON.stringify(checks)}`);
  }finally{await context.close();}
 }
 if(report.errors.length)throw new Error(report.errors.join('\n'));report.passed=!before;
}catch(e){report.failure=e.stack;process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(out,selected?`report-${selected}.json`:'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));}
