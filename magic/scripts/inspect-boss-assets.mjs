import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve('output/bosses');await fs.mkdir(output,{recursive:true});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
let context;const selected=process.argv.find(v=>v.startsWith('--type='))?.split('=')[1];
const previous=selected?JSON.parse(await fs.readFile(path.join(output,'asset-inspection.json'),'utf8')):null;
const report={errors:[],models:previous?previous.models.filter(m=>m.type!==selected):[]};
try{
 const hires=process.argv.includes('--hires');
 context=await managed.browser.newContext({viewport:hires?{width:2560,height:1920}:{width:1100,height:900},serviceWorkers:'block',recordVideo:{dir:path.join(output,'asset-motion'),size:{width:1280,height:960}}});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 if(!process.argv.includes('--live')){
  await page.route('**/boss-viewer.html*',r=>r.fulfill({contentType:'text/html',path:path.resolve('_source/boss-viewer.html')}));
  await page.route('**/src/boss-characters.js*',async r=>r.fulfill({contentType:'application/javascript',body:(await fs.readFile('_source/src/boss-characters.js','utf8')).replace("import.meta.env?.BASE_URL || './'","'./'")}));
  await page.route('**/models/bosses/*.glb',r=>r.fulfill({contentType:'model/gltf-binary',path:path.resolve('_source/public/models/bosses',path.basename(new URL(r.request().url()).pathname))}));
 }
 const types=selected?[selected]:process.argv.includes('--all')?['colossus','gargoyle','wraith']:['colossus'];
 for(const type of types){
  await page.setViewportSize(hires?{width:2560,height:1920}:{width:1100,height:900});
  await page.goto(`http://127.0.0.1:5173/boss-viewer.html?type=${type}`);
  await page.waitForFunction(()=>window.__BOSS_VIEWER__);
  const info=await page.evaluate(()=>{const v=window.__BOSS_VIEWER__;const bones=[];v.boss.model.traverse(o=>{if(o.isBone)bones.push(o.name)});return {bones,clips:[...v.boss.clips].map(([name,c])=>({name,duration:c.duration,tracks:c.tracks.length})),state:JSON.parse(window.render_game_to_text())};});
  report.models.push({type,...info});
  const deformation=await page.evaluate(()=>{
   const v=window.__BOSS_VIEWER__,boss=v.boss,meshes=[],bones=[];boss.model.traverse(o=>{if(o.isSkinnedMesh)meshes.push(o);if(o.isBone)bones.push(o);});
   const results=[];
   for(const [name,c] of boss.clips){
    const samples=[];boss.reset();
    for(const fraction of [0,.12,.28,.48,.68,.88,1]){
     boss.update(.1,{clip:name,time:c.duration*fraction});let low=Infinity,high=-Infinity;
     for(const m of meshes){m.computeBoundingBox();low=Math.min(low,m.boundingBox.min.y);high=Math.max(high,m.boundingBox.max.y);}
     if(!Number.isFinite(low)||!Number.isFinite(high)||high-low>8)throw new Error('Invalid deformation '+name);
     if(low<-.005)throw new Error('Floor penetration '+name+': '+low);
     samples.push({time:c.duration*fraction,minY:low,maxY:high});
    }
    let loopDelta;
    if(['Idle','Walk','Hover'].includes(name)){
     boss.update(.1,{clip:name,time:0});const initial=bones.map(b=>b.matrixWorld.toArray());boss.update(.1,{clip:name,time:c.duration-.0001});
     loopDelta=Math.max(...bones.flatMap((b,i)=>b.matrixWorld.toArray().map((n,j)=>Math.abs(n-initial[i][j]))));
     if(loopDelta>.01)throw new Error('Loop discontinuity '+name+': '+loopDelta);
    }
    results.push({name,samples,loopDelta});
   }
   const contact={};
   if(boss.clips.has('Slam')){
    boss.reset();boss.update(.1,{clip:'Slam',time:.95});
    for(const target of ['hand_R','foot_L','foot_R']){
     let min=Infinity;
     for(const m of meshes){const indices=m.geometry.getAttribute('skinIndex'),weights=m.geometry.getAttribute('skinWeight'),p=m.position.clone();
      for(let i=0;i<indices.count;i++)for(let j=0;j<4;j++)if(weights.getComponent(i,j)>.9&&m.skeleton.bones[indices.getComponent(i,j)]?.name===target){m.getVertexPosition(i,p);min=Math.min(min,p.y);}
     }contact[target]=min;
    }
    if(Object.values(contact).some(y=>y<0||y>.05))throw new Error('Slam floor contact failed');
   }
   return {clips:results,contact};
  });
  report.models.at(-1).deformation=deformation;
  for(const [name,time] of [['Idle',0],...info.clips.filter(c=>!['Idle','Walk','Hover'].includes(c.name)).flatMap(c=>[[c.name,c.duration*.28],[c.name,c.duration*.48],[c.name,c.duration*.88]])]){
   await page.evaluate(({name,time})=>window.__BOSS_VIEWER__.set(name,time),{name,time});
   await page.screenshot({path:path.join(output,`${type}-${name}-${time.toFixed(2)}${hires?'-2k':''}.png`)});
  }
  if(hires)for(const [label,direction] of [['front',[0,2.7,9]],['back',[0,2.7,-9]],['detail',[2.9,2.8,4.2]]]){
   await page.evaluate(({direction})=>{window.__BOSS_VIEWER__.set('Idle',0);window.__BOSS_VIEWER__.view(direction);},{direction});
   await page.screenshot({path:path.join(output,`${type}-${label}-2k.png`)});
  }
  await page.evaluate(()=>window.__BOSS_VIEWER__.view([5.3,3.7,7.6]));
  if(!process.argv.includes('--quick'))for(const c of info.clips){await page.evaluate(name=>window.__BOSS_VIEWER__.play(name),c.name);await page.waitForTimeout(c.duration*1000+150);}
  if(process.argv.includes('--ui')){
   await page.locator('#clip').selectOption(type==='gargoyle'?'Claw':'Idle');await page.waitForTimeout(180);
   if(!(await page.evaluate(()=>JSON.parse(render_game_to_text()).elapsed>0)))throw new Error('Clip selector did not play');
   await page.locator('#play').click();const paused=await page.evaluate(()=>JSON.parse(render_game_to_text()).elapsed);await page.waitForTimeout(120);
   if(Math.abs(paused-await page.evaluate(()=>JSON.parse(render_game_to_text()).elapsed))>.001)throw new Error('Pause did not stop clip');
   const before=await page.evaluate(()=>window.__BOSS_VIEWER__.camera.position.toArray());await page.mouse.move(500,500);await page.mouse.down();await page.mouse.move(640,500,{steps:8});await page.mouse.up();
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const rotated=await page.evaluate(()=>window.__BOSS_VIEWER__.camera.position.toArray());if(before.every((n,i)=>Math.abs(n-rotated[i])<.01))throw new Error('Orbit control failed '+JSON.stringify({before,rotated,viewport:page.viewportSize()}));
   await page.mouse.wheel(0,100);await page.waitForTimeout(50);const zoom=await page.evaluate(()=>window.__BOSS_VIEWER__.camera.position.toArray());if(zoom.every((n,i)=>Math.abs(n-rotated[i])<.01))throw new Error('Zoom failed');
   await page.setViewportSize({width:390,height:844});
   await page.waitForFunction(()=>Math.abs(document.querySelector('canvas').getBoundingClientRect().width-innerWidth)<1,null,{timeout:2000});
   if(!(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)))throw new Error('Viewer mobile overflow');
   report.viewerUI={clipSelect:true,pause:true,orbit:true,zoom:true,mobileOverflow:false};
   (report.viewerChecks??=[]).push({type,...report.viewerUI});
  }
 }
 if(report.errors.length)throw new Error(report.errors.join('\n'));
 console.log(JSON.stringify(report));
}catch(error){report.errors.push(error.message);throw error;}
finally{await context?.close();await managed.cleanup();await fs.writeFile(path.join(output,'asset-inspection.json'),JSON.stringify(report,null,2));}
