import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve('output/expansion/character-comparison');await fs.mkdir(output,{recursive:true});
const original=execFileSync('git',['show','a2ed7e5:_source/src/characters.js'],{encoding:'utf8'});
await fs.writeFile('C:/Users/arz0r/Documents/ChatGPT/Magic/_source/.cache/goliath-game/src/characters-original.js',original);
const qa=await fs.readFile('scripts/verify-goliath-game.mjs','utf8'),hooks=qa.match(/const extra=`([\s\S]*?)`;/)[1];
const seek=`seek:(time,options)=>{update(0,options);mixer.stopAllAction();currentAction.reset().stopFading().setEffectiveWeight(1).play();currentAction.time=time;mixer.update(0);model.updateMatrixWorld(true);model.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});},`;
const fixture=`window.__CHAR_COMPARE__=()=>{
  startRun();for(const e of [...entities])if(!e.isPlayer)removeEntity(e);entities=entities.filter(e=>!e.removed);
  player.mesh.visible=false;playerRing.visible=false;
  const result={};for(const [i,kind]of ['mage','guard','archer','heavy'].entries()){
    const visual=createCharacter(kind);visual.group.position.set(-4.5+i*3,0,16);visual.group.rotation.y=Math.PI;scene.add(visual.group);
    result[kind]={visual};
  }
  phase='paused';controlledUntil=performance.now()+60000;cameraTarget.set(0,0,14.2);updateCamera(1);
  return window.__CHAR_MODELS__=result;
};
window.__CHAR_CAPTURE__=(pose)=>{
 const result={};for(const [kind,{visual}]of Object.entries(window.__CHAR_MODELS__)){
  const options={moving:pose==='walk',speed:2,casting:pose==='cast',attack:pose==='attack',dead:pose==='death',stunned:pose==='hit'};
  visual.reset();visual.seek(.4,options);visual.group.updateMatrixWorld(true);
  const vertices=[];let skins=0,triangles=0;visual.group.traverse(o=>{if(!o.isMesh||!o.visible)return;if(o.isSkinnedMesh)skins++;
    const a=o.geometry.attributes.position;triangles+=(o.geometry.index?.count||a.count)/3;for(let i=0;i<a.count;i++){const p=new THREE.Vector3();o.getVertexPosition(i,p);p.applyMatrix4(o.matrixWorld);vertices.push(p.toArray().map(n=>+n.toFixed(5)));}
  });vertices.sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]);result[kind]={vertices,triangles,skins};
 }renderer.info.reset();composer.render();return result;
};`;
const report={checks:[],errors:[]},records={};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const mode of ['before','after']){
  const context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
  await context.route('**/.cache/goliath-game/src/main.js*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:(await r.text())+hooks+fixture});});
  await context.route('**/.cache/goliath-game/src/characters.js*',async route=>{const r=await route.fetch(mode==='before'?{url:'http://127.0.0.1:5173/.cache/goliath-game/src/characters-original.js'}:{});
   const source=(await r.text()).replace('return { group, update, setTint, reset, dispose };','return { '+seek+' group, update, setTint, reset, dispose };');await route.fulfill({response:r,body:source});});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));await page.goto('http://127.0.0.1:5173/.cache/goliath-game/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
  await page.evaluate(()=>window.__CHAR_COMPARE__());records[mode]={};
  for(const pose of ['stand','walk','cast','attack','death','hit']){records[mode][pose]=await page.evaluate(pose=>window.__CHAR_CAPTURE__(pose),pose);await page.screenshot({path:path.join(output,mode+'-'+pose+'.png')});}
  await context.close();
 }
 for(const pose of Object.keys(records.before))for(const kind of Object.keys(records.before[pose])){
  const a=records.before[pose][kind],b=records.after[pose][kind];
  const same=a.vertices.length===b.vertices.length&&a.vertices.every((v,i)=>v.every((n,j)=>Math.abs(n-b.vertices[i][j])<.00003));
  report.checks.push({pose,kind,passed:same&&a.triangles===b.triangles&&b.skins===1,vertices:a.vertices.length,triangles:a.triangles,beforeSkins:a.skins,afterSkins:b.skins});
 }
}catch(e){report.errors.push(e.stack);}
finally{await managed.cleanup();await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({checks:report.checks.length,failed:report.checks.filter(c=>!c.passed),errors:report.errors},null,2));if(report.errors.length||report.checks.some(c=>!c.passed))process.exitCode=1;}
