import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const before=process.argv.includes('--before'),out=path.resolve(process.env.MAGIC_TEST_OUTPUT||'output/locomotion',before?'before':'preview');await fs.mkdir(out,{recursive:true});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:out});
const report={url:process.env.MAGIC_TEST_URL||`http://127.0.0.1:5173/.cache/latest-locomotion-${before?'before':'preview'}/index.htm?hearthQA=1`,checks:[],errors:[],contacts:[]};
function check(pass,label,data){report.checks.push({pass:!!pass,label,...(data?{data}:{})});}
try{
 const context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.addInitScript(()=>{let seed=7213;Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);});
 await page.goto(report.url);await page.waitForFunction(()=>window.__HEARTH_QA__);await page.locator('#start-button').click();
 await page.evaluate(()=>{advanceTime(0);const q=__HEARTH_QA__;q.render?.();q.entities.forEach(e=>{if(!e.isPlayer){e.mesh.visible=false;e.body.velocity.set(0,0,0);e.stun=100;}});q.engine.visual.group.visible=false;});
 const kinds=process.argv.includes('--all')?['mage','engine','guard','archer','heavy','boss','colossus','gargoyle']:['mage','engine'];
 for(const kind of kinds){
  const results=await page.evaluate(kind=>{
   const q=__HEARTH_QA__,actor=kind==='engine'?null:q.entities.find(e=>(e.bossType||e.kind)===kind),visual=kind==='engine'?q.engine.visual:actor.visual;
   if(!visual.locomotion)return{missing:true,kind};
   const samples=[];
   for(const speed of kind==='engine'?[1.5,3]:[1.6,4.9])for(let direction=0;direction<8;direction++)for(const attack of [false,true]){
    visual.locomotion.reset();visual.group.rotation.set(0,0,0);visual.group.position.set(0,.02,10);visual.update(0,kind==='engine'?{clip:'Idle',time:0,fuel:100}:{moving:false,flying:false});
    let previous=null,maxError=0,maxSlip=0,swings=0;const a=direction*Math.PI/4;
    for(let frame=0;frame<180;frame++){
     visual.group.position.x+=Math.sin(a)*speed/60;visual.group.position.z+=Math.cos(a)*speed/60;
     visual.update(1/60,kind==='engine'?{clip:attack?'Fire':'Walk',fuel:100,aimYaw:0}:{moving:true,flying:false,speed,casting:attack,attack:attack&&frame%60<12});
     const g=visual.locomotion.snapshot(),actual=visual.locomotion.solvers.map(s=>s.foot.getWorldPosition(visual.group.position.clone()).toArray());
     for(let i=0;i<2;i++){if(!g.feet[i].stance)swings++;else maxError=Math.max(maxError,g.errors[i]);
      if(previous?.feet[i].stance&&g.feet[i].stance)maxSlip=Math.max(maxSlip,Math.hypot(...actual[i].map((v,j)=>v-previous.actual[i][j])));
     }
     previous={feet:g.feet,actual};
    }
    samples.push({kind,speed,direction,attack,maxError,maxSlip,swings});
   }
   visual.locomotion.reset();return samples;
  },kind);
  if(results.missing){check(false,kind+' has grounded contact locomotion');continue;}
  report.contacts.push(...results);
  check(results.every(r=>r.maxError<=.005),kind+' actual stance ankles reach planted targets within 5mm',{maxError:Math.max(...results.map(r=>r.maxError))});
  check(results.every(r=>r.maxSlip<=.005),kind+' actual supporting ankle drift stays below 5mm',{maxSlip:Math.max(...results.map(r=>r.maxSlip))});
  check(results.every(r=>r.swings>15),kind+' actually lifts feet in every direction and while attacking');
  const turning=await page.evaluate(kind=>{const q=__HEARTH_QA__,v=kind==='engine'?q.engine.visual:q.entities.find(e=>(e.bossType||e.kind)===kind).visual;v.group.position.set(0,.02,10);v.group.rotation.y=0;v.locomotion.reset();v.update(0,kind==='engine'?{clip:'Idle',time:0,fuel:100}:{moving:false,flying:false});let maxError=0,maxSlip=0,prev=null;for(let i=0;i<360;i++){const moving=i<180;v.group.position.z+=moving?2/60:0;const target=Math.floor(i/60)%2?Math.PI:0,delta=Math.atan2(Math.sin(target-v.group.rotation.y),Math.cos(target-v.group.rotation.y));v.group.rotation.y+=delta*.25;v.update(1/60,kind==='engine'?{clip:moving?'Throw':'Idle',fuel:100,aimYaw:target}:{moving,flying:false,speed:moving?2:0,attack:i%90<12});const g=v.locomotion.snapshot(),actual=v.locomotion.solvers.map(s=>s.foot.getWorldPosition(v.group.position.clone()));for(let j=0;j<2;j++)if(g.feet[j].stance){maxError=Math.max(maxError,g.errors[j]);if(prev?.feet[j].stance)maxSlip=Math.max(maxSlip,actual[j].distanceTo(prev.actual[j]));}prev={feet:g.feet,actual};}return{maxError,maxSlip};},kind);
  check(turning.maxError<.005&&turning.maxSlip<.005,kind+' turn/stop transitions retain real support',turning);
 }
 if(!before){
  for(const [kind,name]of [['mage','wizard-walk'],['engine','engine-moving-fire']]){
   await page.evaluate(kind=>{
    const q=__HEARTH_QA__;for(const e of q.entities)e.mesh.visible=false;q.engine.visual.group.visible=kind==='engine';
    const v=kind==='engine'?q.engine.visual:q.player.visual;v.group.visible=true;if(!v.group.parent)q.engine.visual.group.parent.add(v.group);v.group.position.set(-.8,.02,10);v.group.rotation.y=0;v.locomotion.reset();v.update(0,kind==='engine'?{clip:'Idle',time:0,fuel:100}:{moving:false,flying:false});
    const speed=kind==='engine'?3:2;for(let i=0;i<24;i++){v.group.position.x+=speed/60;v.update(1/60,kind==='engine'?{clip:'Fire',fuel:100,aimYaw:.7}:{moving:true,flying:false,speed,casting:true});}
    q.camera.position.set(5,5.6,18);q.camera.lookAt(.4,1.35,10);q.camera.zoom=2.8;q.camera.updateProjectionMatrix();q.camera.updateMatrixWorld(true);q.render();
   },kind);await page.screenshot({path:path.join(out,name+'.png')});
  }
 }
 await context.close();
}catch(e){report.failure=e.stack;}finally{
 try{await managed.cleanup();}catch(e){report.cleanupWarning=e.message;}
 report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(out,'contacts.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({checks:report.checks,errors:report.errors,failure:report.failure,cleanup:report.cleanup}));
}
if(report.failure||report.errors.length||report.checks.some(c=>!c.pass))process.exitCode=1;
