import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {chromium} from 'file:///C:/Users/arz0r/.codex/skills/develop-web-game/node_modules/playwright/index.mjs';
const root=process.env.CODEX_GENERATED_OUTPUT,out=root+'/tests/mobile-model-optimization',live=process.argv.includes('--live');
process.env.TEMP=process.env.TMP=root+'/work/temp';
const result={status:'running',physicalPhone:false,live,errors:[]},output=out+(live?'/live.json':'/runtime.json');await fs.writeFile(output,JSON.stringify(result));
execFileSync('powershell.exe',['-NoProfile','-Command','Get-CimInstance Win32_Process | Select-Object -First 1 -ExpandProperty ProcessId'],{windowsHide:true});
const context=await chromium.launchPersistentContext(root+'/work/browser',{channel:'chrome',headless:false,viewport:{width:430,height:745},deviceScaleFactor:3,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 27_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/156.0.8078.46 Mobile/15E148 Safari/604.1',args:['--mute-audio','--disable-background-mode','--disable-crash-reporter','--disable-gpu-shader-disk-cache','--disk-cache-size=33554432']});
const page=context.pages()[0],resources=[];page.on('pageerror',e=>result.errors.push(e.message));page.on('response',r=>{if(r.status()>=400)result.errors.push(r.status()+' '+r.url());if(r.url().endsWith('.glb'))resources.push(r.url());});
const url=live?'https://arisconstantinou.github.io/magic/?hearthQA=1&magic-update=1.6.34':'http://127.0.0.1:5173/performance-check/canonical/index.html?hearthQA=1';
async function start(){await page.goto(url);await page.bringToFront();await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu',null,{timeout:120000});await page.locator('#start-button').click();await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.running,null,{timeout:60000});}
try{
 if(!live){
  await page.route('**/*-mobile-optimized-lods.glb',route=>route.fulfill({path:root+'/build/models/redesign/'+new URL(route.request().url()).pathname.split('/').at(-1).replace('-optimized-lods.glb','-lods.glb'),contentType:'model/gltf-binary',headers:{'cache-control':'no-store'}}));
  await start();await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.report.memory.length>0,null,{timeout:25000});
  result.before=await page.evaluate(()=>({memory:__MAGIC_SINGLE_COMBAT__.report.memory[0],device:__MAGIC_SINGLE_COMBAT__.report.device,configuration:__MAGIC_SINGLE_COMBAT__.report.configuration}));
  await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.finish('original texture resource baseline'));await page.unrouteAll();
 }
 await start();const initial=await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.snapshot());assert.equal(initial.roster.length,16);assert.equal(initial.roster.filter(e=>e.bossType).length,4);
 await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.report.memory.length>0,null,{timeout:25000});
 result.firstMemory=await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.report.memory[0]);
 if(!live){result.savedUploadedTextureBytes=result.before.memory.uploadedTextureBytes-result.firstMemory.uploadedTextureBytes;assert(result.savedUploadedTextureBytes>110*1024*1024,'Actual resource saving must exceed 110 MiB');}
 assert(result.firstMemory.uploadedTextureBytes<290*1024*1024,'Mobile texture profile budget');
 await page.screenshot({path:out+(live?'/live-combat.png':'/combat.png'),scale:'css'});
 if(live){await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.finish('public release smoke check'));}
 else await page.waitForFunction(()=>!!__MAGIC_SINGLE_COMBAT__.report?.finishedAt,null,{timeout:195000});
 await page.waitForFunction(()=>!document.querySelector('#single-combat-panel').hidden);
 result.report=await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.report);assert.equal(result.report.version,'1.6.34');assert(result.report.progress.some(r=>r.version==='1.6.34'));
 if(!live){assert.equal(result.report.outcome,'complete');assert.equal(result.report.remaining,0);assert.equal(result.report.bossKills,4);assert(result.report.kills>=16);assert(result.report.combat.fireHitCalls>0);assert(result.report.combat.stompHitCalls>0);}
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#sc-download').click()]);assert.equal(download.suggestedFilename(),'magic-benchmark.json');await download.saveAs(out+(live?'/live-export.json':'/export.json'));
 assert(result.report.initialRoster.every(e=>Object.hasOwn(e,'lod')));assert.deepEqual(result.report.errors,[]);
 if(!live){
  await page.locator('#sc-retry').click();await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.running,null,{timeout:60000});assert.equal(await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.snapshot().roster.length),16);
  await page.evaluate(()=>{const q=__HEARTH_QA__,archer=q.entities.find(e=>e.kind==='archer'&&!e.removed),camera=q.camera,direction=camera.getWorldDirection(camera.position.clone()),center=archer.mesh.getWorldPosition(camera.position.clone());center.y+=1;camera.position.copy(center).addScaledVector(direction,-30);camera.zoom*=16;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);archer.visual.rigLod.update(camera);q.render();});
  await page.waitForFunction(()=>__HEARTH_QA__.entities.find(e=>e.kind==='archer'&&!e.removed).mesh.userData.closeRigLoaded===true,null,{timeout:120000});
  result.archerClose=await page.evaluate(()=>__HEARTH_QA__.entities.find(e=>e.kind==='archer'&&!e.removed).mesh.userData.closeRigLoaded);assert(result.archerClose);
 }
 assert(resources.some(u=>u.includes('gargoyle-mobile-optimized-lods.glb')));assert(resources.some(u=>u.includes('archer-mobile-optimized-lods.glb')));assert.deepEqual(result.errors,[]);
 result.resources=resources;result.status='passed';
}finally{await context.close();await new Promise(r=>setTimeout(r,1500));result.closed=true;await fs.writeFile(output,JSON.stringify(result,null,2));}
console.log(JSON.stringify({status:result.status,live,savedMiB:result.savedUploadedTextureBytes/1048576,textureMiB:result.firstMemory?.uploadedTextureBytes/1048576,kills:result.report?.kills,closed:result.closed}));
