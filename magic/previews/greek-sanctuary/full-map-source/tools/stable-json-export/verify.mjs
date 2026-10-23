import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from 'file:///C:/Users/arz0r/.codex/skills/develop-web-game/node_modules/playwright/index.mjs';
const root=process.env.CODEX_GENERATED_OUTPUT, out=root+'/tests/stable-json-export',live=process.argv.includes('--live');
process.env.TEMP=process.env.TMP=root+'/work/temp';await fs.mkdir(out,{recursive:true});
const result={status:'running',live,errors:[],downloads:[]},resultPath=out+(live?'/live.json':'/local.json');
await fs.writeFile(resultPath,JSON.stringify(result));let context;
try{
 context=await chromium.launchPersistentContext(root+'/work/browser',{channel:'chrome',headless:false,viewport:{width:430,height:745},deviceScaleFactor:3,isMobile:true,hasTouch:true,args:['--mute-audio','--disable-background-mode','--disable-crash-reporter','--disable-gpu-shader-disk-cache','--disk-cache-size=33554432']});
 const page=context.pages()[0];page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});
 await page.addInitScript(()=>localStorage.clear());
 await page.goto(live?'https://arisconstantinou.github.io/magic/?magic-update=1.6.32':'http://127.0.0.1:5173/performance-check/canonical/index.html');
 await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu',null,{timeout:120000});
 for(let run=0;run<2;run++){
  await page.locator(run===0?'#start-button':'#sc-retry').click();
  await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.running,null,{timeout:60000});
  await page.waitForTimeout(1200);await page.evaluate(()=>__MAGIC_SINGLE_COMBAT__.finish('export filename verification'));
  await page.waitForFunction(()=>!document.querySelector('#single-combat-panel').hidden);
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#sc-download').click()]);
  assert.equal(download.suggestedFilename(),'magic-benchmark.json');await download.saveAs(out+'/magic-benchmark.json');
  const report=JSON.parse(await fs.readFile(out+'/magic-benchmark.json','utf8'));assert.equal(report.version,'1.6.32');assert.equal(report.schema,3);assert(report.createdAt&&report.id);result.downloads.push({filename:download.suggestedFilename(),id:report.id,version:report.version});
 }
 assert.notEqual(result.downloads[0].id,result.downloads[1].id,'Two new runs retain distinct identity inside the same named file');
 await page.evaluate(()=>{Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});Object.defineProperty(navigator,'share',{configurable:true,value:async({files})=>{window.__EXPORT_TEST__={name:files[0].name,type:files[0].type,report:JSON.parse(await files[0].text())};}});});
 await page.locator('#sc-share').click();await page.waitForFunction(()=>!!window.__EXPORT_TEST__);
 result.share=await page.evaluate(()=>({name:__EXPORT_TEST__.name,type:__EXPORT_TEST__.type,id:__EXPORT_TEST__.report.id,version:__EXPORT_TEST__.report.version}));assert.equal(result.share.name,'magic-benchmark.json');assert.equal(result.share.id,result.downloads[1].id);assert.equal(result.share.type,'application/json');
 await page.evaluate(()=>Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false}));
 const [fallback]=await Promise.all([page.waitForEvent('download'),page.locator('#sc-share').click()]);assert.equal(fallback.suggestedFilename(),'magic-benchmark.json');result.shareFallback=fallback.suggestedFilename();
 await page.screenshot({path:out+(live?'/live.png':'/local.png'),scale:'css'});assert.deepEqual(result.errors,[]);
 result.engineSha256=createHash('sha256').update(await fs.readFile(root+'/build/engine/index.js')).digest('hex');result.status='passed';
}catch(e){result.status='failed';result.error=e.stack;process.exitCode=1;}
finally{await context?.close();result.closed=true;await fs.writeFile(resultPath,JSON.stringify(result,null,2));console.log(JSON.stringify(result));}
