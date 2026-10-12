import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const THREE=await import('../_source/node_modules/three/build/three.module.js');
const expectedVersion=JSON.parse(await fs.readFile('_source/package.json','utf8')).version;
const root=path.resolve('.'),prefix=`/.cache/production-trajectory-${expectedVersion}/`,cache=path.resolve('_source'+prefix);
const sw=await fs.readFile('sw.js','utf8'),files=JSON.parse(sw.match(/const PRECACHE = (\[[\s\S]*?\]);?/)[1]);
if(!files.some(f=>f.includes('trajectory-worker-')))throw new Error('Worker missing from offline cache');
for(const file of [...files,'sw.js']){
 const source=path.resolve(root,file),destination=path.resolve(cache,file);
 if(!source.startsWith(root+path.sep)||!destination.startsWith(cache+path.sep))throw new Error('Unsafe build path');
 await fs.mkdir(path.dirname(destination),{recursive:true});await fs.copyFile(source,destination);
}
const output=path.resolve('output/playwright/trajectory-production');await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),files,errors:[],cases:[]};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844],['mobile-landscape',844,390]]){
  const touch=mode!=='desktop',context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
  try{
   await context.route('**'+prefix+'**',async route=>{
    const file=decodeURIComponent(new URL(route.request().url()).pathname.slice(prefix.length)),source=path.resolve(cache,file);
    if(!source.startsWith(cache+path.sep))return route.abort();
    const mime={'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.glb':'model/gltf-binary','.svg':'image/svg+xml'};
    await route.fulfill({body:await fs.readFile(source),contentType:mime[path.extname(source)]||'application/octet-stream'});
   });
   await context.addInitScript(()=>{const NativeWorker=window.Worker;window.__BUILD_WORKERS__=[];window.Worker=class extends NativeWorker{constructor(url,options){super(url,options);const record={url:String(url),messages:0,points:0,error:null};window.__BUILD_WORKERS__.push(record);this.addEventListener('message',e=>{record.messages++;record.points=e.data.preview?.points.length??0;record.error=e.data.error??null;});}};});
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
   await page.goto('http://127.0.0.1:5173'+prefix+'index.html');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
   await page.locator('#start-button').click();await page.waitForTimeout(400);
   if(touch)await page.locator('.touch-actions [data-action="conjure"]').tap();else await page.keyboard.press('r');
   const state=await page.evaluate(()=>window.__MAGIC__.snapshot());
   const aspect=width/height,halfH=aspect<1?10.5/aspect:11.3,camera=new THREE.OrthographicCamera(-halfH*aspect,halfH*aspect,halfH,-halfH,.1,180);
   const target=new THREE.Vector3(state.position.x,0,state.position.z-1.8);camera.position.copy(target).add(new THREE.Vector3(0,22,17));camera.lookAt(target);camera.updateMatrixWorld();
   const point=new THREE.Vector3(state.position.x,1.15,state.position.z-1.6).project(camera),pick={x:(point.x+1)*width/2,y:(1-point.y)*height/2};
   const cdp=touch?await context.newCDPSession(page):null;
   if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...pick,id:1}]});else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
   await page.waitForFunction(()=>!!window.__MAGIC__.snapshot().holding);
   const aim={x:Math.min(width-30,pick.x+width*.3),y:pick.y-30};
   if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...aim,id:1}]});else await page.mouse.move(aim.x,aim.y);
   await page.waitForFunction(()=>window.__BUILD_WORKERS__.some(w=>w.messages>0&&w.points>1));await page.waitForTimeout(200);
   await page.screenshot({path:path.join(output,mode+'.png')});
   const result=await page.evaluate(()=>({version:window.__MAGIC__.version,state:window.__MAGIC__.snapshot(),workers:window.__BUILD_WORKERS__}));
   if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else await page.mouse.up();
   const passed=result.version===expectedVersion&&!!result.state.holding&&result.workers.every(w=>!w.error)&&result.workers.some(w=>/engine\/trajectory-worker-.*\.js/.test(w.url)&&w.messages>0);
   report.cases.push({mode,passed,...result});
  }finally{await context.close();}
 }
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errors.length||report.cases.some(c=>!c.passed))process.exitCode=1;}
