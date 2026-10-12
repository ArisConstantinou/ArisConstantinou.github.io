import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {installArtifactFixture} from './mobile-artifact-fixture.mjs';

const root=path.resolve(import.meta.dirname,'..');
const releaseRoot=path.resolve(process.env.MAGIC_RELEASE_ROOT||root);
const artifactFixture=process.env.MAGIC_ARTIFACT_FIXTURE==='1';
const output=path.resolve(process.env.MAGIC_QA_OUTPUT||path.join(root,'output/playwright/online-hearth'));
await fs.mkdir(output,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const url=process.env.MAGIC_PUBLIC_URL||'https://arisconstantinou.github.io/magic/';
const report={date:new Date().toISOString(),url,artifactFixture,errors:[],limitations:['Chrome touch emulation; not a physical iPhone','Test repositions only the mage to reach the naturally spawned suit, and stuns enemies']};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
let context;
try {
  const index=artifactFixture?await fs.readFile(path.join(releaseRoot,'index.html'),'utf8'):await(await fetch(url,{headers:{'Cache-Control':'no-cache'}})).text();
  const bundle=index.match(/src="\.\/([^\"]+\.js)"/)[1];
  report.files=[];
  for(const file of [bundle,'models/hearth-bulwark/hearth-bulwark.glb']) {
    const response=artifactFixture?null:await fetch(new URL(file,url),{headers:{'Cache-Control':'no-cache'}});
    if(response)assert.equal(response.status,200,file);
    const bytes=response?Buffer.from(await response.arrayBuffer()):await fs.readFile(path.join(releaseRoot,file));
    assert.ok(bytes.equals(await fs.readFile(path.join(releaseRoot,file))),file+' must match local release');
    report.files.push({file,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
  }
  context=await managed.browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:1,serviceWorkers:'block'});
  if(artifactFixture)await installArtifactFixture(context,releaseRoot,new URL(url).pathname);
  await context.addInitScript(()=>{let seed=821;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;});
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  await page.goto(url+'?hearthQA=1');
  await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
  report.version=await page.evaluate(()=>window.__MAGIC__.version);
  await page.locator('#start-button').click();
  report.spawn=await page.evaluate(()=>__MAGIC__.snapshot().hearth);
  await page.locator('[data-action="fire"]').filter({visible:true}).first().tap();
  await page.waitForFunction(()=>__MAGIC__.snapshot().fire.charged);
  await page.evaluate(()=>{
    const q=__HEARTH_QA__,p=q.engine.body.position;
    for(const e of q.entities)if(e.category==='actor'&&!e.isPlayer)e.stun=1e6;
    for(let i=0;i<16;i++) {
      const a=i*Math.PI/8,x=p.x+Math.sin(a)*2.7,z=p.z+Math.cos(a)*2.7;
      if(q.world.colliders.some(c=>Math.abs(x-c.x)<c.w/2+.55&&Math.abs(z-c.z)<c.d/2+.55))continue;
      q.player.body.position.set(x,q.player.cy+.08,z);q.player.body.velocity.set(0,0,0);
      if(q.hearth.near())return;
    }
    throw new Error('No safe approach to the naturally spawned suit');
  });
  await page.waitForTimeout(800);
  await page.screenshot({path:path.join(output,'public-suit-location.png')});
  const use=()=>page.locator('[data-action="interact"]').filter({visible:true}).first().tap();
  await use();await page.waitForFunction(()=>__MAGIC__.snapshot().hearth.state==='ready');
  await use();await page.waitForFunction(()=>__MAGIC__.snapshot().hearth.state==='piloted');
  const cdp=await context.newCDPSession(page),button=await page.locator('[data-action="flamethrower"]').boundingBox();
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:7,x:button.x+button.width/2,y:button.y+button.height/2}]});
  await page.waitForFunction(()=>__MAGIC__.snapshot().hearth.firing);
  await page.screenshot({path:path.join(output,'public-suit-piloted.png')});
  report.piloted=await page.evaluate(()=>__MAGIC__.snapshot().hearth);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  // Cannon may nudge the dynamic suit by millimetres during boarding/contact.
  // The test repositions only the mage; verify its original room and location.
  assert.equal(report.spawn.room,report.piloted.room);
  assert.ok(Math.hypot(report.spawn.x-report.piloted.x,report.spawn.z-report.piloted.z)<.05,'Suit remains at its natural spawn');
  assert.equal(report.errors.length,0,report.errors.join('\n'));report.passed=true;
} catch(error) {report.failure=error.stack;process.exitCode=1;}
finally {
  await context?.close();await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
  try{await managed.cleanup();}catch(error){report.cleanupFailure=managed.report.cleanupErrors;process.exitCode=1;}
  report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
}
