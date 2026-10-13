import fs from 'node:fs/promises';import path from 'node:path';import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game'),{chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs'))),{launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const out=path.resolve('output/locomotion/boss-motion');await fs.mkdir(out,{recursive:true});
const report={conditions:'1440x900 DPR1, seed7213, same camera and movement. Actual baseline/candidate rig controllers; explicit simulation and wall-time 60Hz presentation fixtures, independent of monitor refresh. Native game loop suspended only for this comparison; physics/AI flight is checked separately. No audio recorded.',samples:[],checks:[],errors:[]},managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:out});
try{for(const label of ['before','preview']){
 const c=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block',recordVideo:{dir:out,size:{width:1440,height:900}}}),p=await c.newPage();p.on('pageerror',e=>report.errors.push(e.message));
 await p.addInitScript(()=>{let seed=7213;Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);});
 await p.goto(`http://127.0.0.1:5173/.cache/latest-locomotion-${label}/index.htm?hearthQA=1`);await p.waitForFunction(()=>window.__HEARTH_QA__);await p.locator('#start-button').click();await p.evaluate(()=>{advanceTime(0);window.__motionRaf=requestAnimationFrame.bind(window);window.requestAnimationFrame=()=>0;});
 for(const kind of ['colossus','gargoyle']){
  await p.evaluate(kind=>{const q=__HEARTH_QA__;for(const e of q.entities)e.mesh.visible=false;q.engine.visual.group.visible=false;const v=q.entities.find(e=>e.bossType===kind).visual;window.motionBoss=v;q.engine.visual.group.parent.add(v.group);v.group.visible=true;v.group.position.set(0,.02,10);v.group.rotation.y=0;v.reset();v.update(0,{clip:'Idle',flying:false});v.locomotion?.reset();window.motionBones={};v.model.traverse(o=>{if(o.isBone)motionBones[o.name]=o;});window.motionSamples=[];},kind);
  for(let section=0;section<3;section++){
   if(section===2&&kind!=='gargoyle')continue;
   for(let part=0;part<4;part++){
    await p.evaluate(async({kind,section,part})=>{const start=performance.now();for(let j=0;j<60;j++){
     let now;do{now=await new Promise(__motionRaf);}while(now<start+(j+1)*1000/60);const q=__HEARTH_QA__,v=motionBoss,i=part*60+j;
     if(section===0){v.group.position.z+=i<180?1.4/60:0;if(i>=180)v.group.rotation.y+=(Math.PI-v.group.rotation.y)*.075;v.update(1/60,{moving:i<180,speed:i<180?1.4:0,flying:false});}
     else if(section===1)v.update(1/60,{clip:kind==='colossus'?'Slam':'Claw',time:Math.min(i/60,kind==='colossus'?2.4:1.9),flying:false});
     else {v.group.position.y=1.12;v.group.position.x+=Math.sin(i/60)*.012;v.update(1/60,{clip:'Hover',moving:true,speed:1.9,flying:true});}
     v.group.updateMatrixWorld(true);if(section===0&&i<180){const pose={i,hands:['L','R'].map(s=>v.group.worldToLocal(motionBones['hand_'+s].getWorldPosition(v.group.position.clone())).toArray()),knees:['L','R'].map(s=>motionBones['shin_'+s].quaternion.toArray())};motionSamples.push(pose);}
     q.camera.position.set(v.group.position.x+5,6.5,v.group.position.z+9);q.camera.lookAt(v.group.position.x,section===2?2.6:1.5,v.group.position.z);q.camera.zoom=2.3;q.camera.updateProjectionMatrix();q.camera.updateMatrixWorld(true);q.renderer.render(q.engine.visual.group.parent,q.camera);
    }},{kind,section,part});await p.screenshot({path:path.join(out,`${label}-${kind}-${['walk','attack','flight'][section]}-${part}.png`)});
   }
  }
  const ranges=await p.evaluate(()=>{const ranges=[0,0],knees=[0,0];for(let s=0;s<2;s++)for(const a of motionSamples)for(const b of motionSamples){ranges[s]=Math.max(ranges[s],Math.hypot(...a.hands[s].map((v,i)=>v-b.hands[s][i])));knees[s]=Math.max(knees[s],2*Math.acos(Math.min(1,Math.abs(a.knees[s].reduce((v,x,i)=>v+x*b.knees[s][i],0)))));}return{hands:ranges,knees};});report.samples.push({label,kind,...ranges});
 }
 const video=p.video();await c.close();await video.saveAs(path.join(out,label+'.webm'));
}
for(const kind of ['colossus','gargoyle']){const a=report.samples.find(s=>s.kind===kind&&s.label==='before'),b=report.samples.find(s=>s.kind===kind&&s.label==='preview');report.checks.push({pass:b.hands.every((v,i)=>v>a.hands[i]*1.3&&v>.25),label:kind+' shoulders/elbows create clear opposite-arm swing',before:a.hands,after:b.hands},{pass:b.knees.every(v=>v>.1),label:kind+' actual knee articulation during grounded travel',after:b.knees});}
}catch(e){report.failure=e.stack;}finally{try{await managed.cleanup();}catch(e){report.cleanupWarning=e.message;}report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));}
if(report.failure||report.errors.length||report.checks.some(c=>!c.pass))process.exitCode=1;
