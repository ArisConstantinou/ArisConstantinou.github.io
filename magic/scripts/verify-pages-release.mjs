import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';

const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const url='https://arisconstantinou.github.io/magic/';
const expectedVersion=JSON.parse(await fs.readFile('_source/package.json','utf8')).version;
const output=path.resolve(process.env.MAGIC_QA_OUTPUT||'output/playwright/pages-release-140');
await fs.mkdir(output,{recursive:true});
const signal=path.join(output,'published.json');
try{await fs.access(signal);throw new Error('Previous publication signal exists; use a fresh evidence folder');}catch(e){if(e.code!=='ENOENT')throw e;}
const report={url,date:new Date().toISOString(),errors:[],files:[],limitations:['Chrome on desktop hardware; mobile performance is not physical phone proof','CPU/GPU utilization and RAM/VRAM not measured']};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
let context;
const frameTimes=page=>page.evaluate(()=>new Promise(resolve=>{const samples=[];let previous;const tick=t=>{if(previous!==undefined)samples.push(t-previous);previous=t;if(samples.length<180)requestAnimationFrame(tick);else{const sorted=[...samples].sort((a,b)=>a-b);resolve({samples:samples.length,median:sorted[90],p95:sorted[171],max:sorted.at(-1),over50ms:samples.filter(t=>t>50).length});}};requestAnimationFrame(tick);}));
try{
 context=await managed.browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'allow'});
 await context.addInitScript(()=>{let seed=821;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 await page.goto(url,{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;await caches.open('magic-release-qa-other-app');});
 await page.reload({waitUntil:'networkidle'});
 await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
 const oldVersion=await page.evaluate(()=>window.__MAGIC__.version);
 await page.screenshot({path:path.join(output,'before-menu.png')});
 await page.locator('#start-button').click();await page.waitForTimeout(450);
 await page.locator('#hud-mute').click();
 const savedProfile=await page.evaluate(()=>localStorage.getItem('magic-exiled-v1'));
 assert.ok(savedProfile,'Create a real save in the isolated browser');
 await page.screenshot({path:path.join(output,'before-game.png')});
 report.before={version:oldVersion,caches:await page.evaluate(()=>caches.keys()),state:await page.evaluate(()=>window.__MAGIC__.snapshot()),frames:await frameTimes(page)};
 await page.keyboard.press('Escape');
 await fs.writeFile(path.join(output,'before.json'),JSON.stringify(report.before,null,2));
 console.log(JSON.stringify({phase:'before-ready',version:oldVersion,caches:report.before.caches,frames:report.before.frames}));
 const deadline=Date.now()+15*60*1000;
 while(true){try{report.publication=JSON.parse(await fs.readFile(signal,'utf8'));break;}catch(e){if(e.code!=='ENOENT')throw e;}if(Date.now()>deadline)throw new Error('Publication signal timed out after 15 minutes');await new Promise(r=>setTimeout(r,1000));}
 const sw=await fs.readFile('_source/.release/sw.js','utf8');
 const files=JSON.parse(sw.match(/const PRECACHE = (\[[\s\S]*?\]);?/)[1]);
 const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
 for(const file of [...files,'sw.js']){
  const expected=digest(await fs.readFile(path.join('_source/.release',file)));
  const response=await fetch(new URL(file,url),{headers:{'Cache-Control':'no-cache'}});
  assert.equal(response.status,200,file+' HTTP status');const actual=digest(Buffer.from(await response.arrayBuffer()));
  assert.equal(actual,expected,file+' public SHA256');report.files.push({file,sha256:actual});
 }
 const cacheName='magic-exiled:/magic/:'+sw.match(/const CACHE_NAME = CACHE_PREFIX \+ "([^"]+)"/)[1];
 await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();await r.update();});
 await page.waitForFunction(async name=>(await caches.keys()).includes(name),cacheName,{timeout:120000});
 await page.reload({waitUntil:'networkidle'});
 await page.waitForFunction(version=>window.__MAGIC__?.version===version&&window.__MAGIC__.snapshot().phase==='menu',expectedVersion);
 const migrated=JSON.parse(await page.evaluate(()=>localStorage.getItem('magic-exiled-v1')));const prior=JSON.parse(savedProfile);for(const key of ['shards','best','wins','runs','muted','upgrades'])assert.deepEqual(migrated[key],prior[key],'Save '+key+' preserved across the real SW update');
 await page.screenshot({path:path.join(output,'after-menu.png')});
 await page.locator('#start-button').click();await page.waitForTimeout(450);
 await page.screenshot({path:path.join(output,'after-game.png')});
 const bosses=await page.evaluate(()=>JSON.parse(window.render_game_to_text()).bosses);
 assert.deepEqual(bosses.map(b=>b.type).sort(),['colossus','gargoyle','wraith']);assert.equal(new Set(bosses.map(b=>b.room)).size,3);
 const current=await page.evaluate(()=>window.__MAGIC__.snapshot());assert.equal(current.rooms.filter(r=>r.id!=='bridge').length,14);assert.equal(current.enemies.filter(e=>e.kind==='boss').length,4);assert.ok(current.hearth.room);assert.ok(current.inventory.items);
 report.after={castle:current,version:await page.evaluate(()=>window.__MAGIC__.version),bosses,frames:await frameTimes(page),caches:await page.evaluate(()=>caches.keys())};
 assert.deepEqual(report.after.caches.filter(c=>c.startsWith('magic-exiled:/magic/:')),[cacheName]);
 assert.ok(report.after.caches.includes('magic-release-qa-other-app'),'Other app caches must survive');
 const precached=await page.evaluate(async name=>(await(await caches.open(name)).keys()).map(r=>r.url),cacheName);
 assert.equal(precached.length,files.length,'Complete offline precache');
 await context.setOffline(true);await page.reload({waitUntil:'networkidle'});
 await page.waitForFunction(version=>window.__MAGIC__?.version===version&&window.__MAGIC__.snapshot().phase==='menu',expectedVersion);
 await page.locator('#start-button').click();
 await page.waitForFunction(()=>window.__MAGIC__.snapshot().phase==='playing');
 await page.keyboard.press('c');await page.waitForFunction(()=>window.__MAGIC__.snapshot().fire.charged);
 const item=await page.evaluate(()=>window.__MAGIC__.inspect().entities.find(e=>e.primaryCrate));
 const pick=await page.evaluate(p=>window.__MAGIC__.project(p),item);
 await page.mouse.move(pick.x,pick.y);await page.mouse.down();
 await page.waitForFunction(()=>window.__MAGIC__.snapshot().holding==='Κιβώτιο'&&window.__MAGIC__.snapshot().fire.crateBurnRemaining>0);
 await page.mouse.move(pick.x+120,pick.y-80);await page.waitForFunction(()=>window.__MAGIC__.inspect().preview?.points?.length>1);
 report.offline={passed:true,state:await page.evaluate(()=>window.__MAGIC__.snapshot()),workerPreview:await page.evaluate(()=>window.__MAGIC__.inspect().preview)};
 await page.screenshot({path:path.join(output,'offline-fire.png')});await page.mouse.up();
 assert.equal(report.errors.length,0,report.errors.join('\n'));
 report.passed=true;
}catch(error){report.failure=error.stack;process.exitCode=1;}
finally{await context?.close();await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,failure:report.failure,before:report.before?.version,after:report.after?.version,verifiedFiles:report.files.length,frames:report.after?.frames,offline:report.offline?.passed,errors:report.errors,cleanup:report.cleanup},null,2));}
