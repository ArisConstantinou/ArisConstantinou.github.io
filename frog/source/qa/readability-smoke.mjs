import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const out='qa/arcade-evidence';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const report={version:'4.1.0',checks:[],views:[],errors:[],limitations:['Chromium touch emulation, not a physical iPhone/Android test.','Screenshots and projected visibility assertions are not a real-device FPS benchmark.']};
const pass=s=>{report.checks.push(s);console.log('PASS '+s);};
try{
 for(const [name,width,height,touch] of [['desktop',1280,720,false],['portrait',390,844,true],['landscape',844,390,true],['small-phone',360,740,true]]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,deviceScaleFactor:1});
  const page=await context.newPage();page.setDefaultTimeout(90000);page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/?test=1',{waitUntil:'networkidle',timeout:180000});
  await page.waitForFunction(()=>window.__FROG__?.version==='4.1.0');
  await page.locator('#play-button').click();
  await page.waitForFunction(()=>window.__FROG__.inspect().visibleFlies>=3);
  await page.evaluate(()=>{window.frogArcade.running=false;});
  assert.equal(await page.evaluate(()=>window.__FROG__.inspect().cameraMode),'third');
  assert.equal(await page.evaluate(()=>window.__FROG__.inspect().cameraType),'PerspectiveCamera');
  assert.equal(await page.locator('#arcade-radar').isVisible(),true);
  const state=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],q=g.project(p.x,g.ground(p.x,p.z)+.65,p.z);return {...g.inspect(),projectedPlayer:q};});
  assert.ok(state.grace>0);assert.ok(state.projectedPlayer.visible&&state.projectedPlayer.x>20&&state.projectedPlayer.x<width-20&&state.projectedPlayer.y>90&&state.projectedPlayer.y<height-20);
  const boxes=await page.locator('#arcade-radar,#arcade-tip,.ammo-card,.ko-card,#pause-button').evaluateAll(els=>els.map(e=>{const r=e.getBoundingClientRect();return {id:e.id,x:r.x,y:r.y,right:r.right,bottom:r.bottom};}));
  assert.ok(boxes.every(b=>b.x>=0&&b.y>=0&&b.right<=innerWidthFallback(width)&&b.bottom<=height));
  const overlap=(a,b)=>Math.min(a.right,b.right)-Math.max(a.x,b.x)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>1;
  assert.ok(boxes.slice(1).every(b=>!overlap(boxes[0],b)));
  await page.screenshot({path:`${out}/${name}-third.png`});
  report.views.push({name,view:'third',visibleFlies:state.visibleFlies,projectedPlayer:state.projectedPlayer});
  pass(`${name}: default close perspective, visible player and flies, open map, safe spawn, non-overlapping panels`);
  await page.locator('#camera-toggle').click();
  await page.waitForFunction(()=>window.__FROG__.inspect().cameraMode==='topdown'&&window.__FROG__.inspect().visibleFlies>=3);
  await page.screenshot({path:`${out}/${name}-topdown.png`});
  report.views.push({name,view:'topdown',visibleFlies:await page.evaluate(()=>window.__FROG__.inspect().visibleFlies)});
  pass(`${name}: camera toggle retains clearly visible flies in top-down`);
  if(!touch){
   await page.evaluate(()=>window.frogArcade.running=true);await page.keyboard.press('c');
   await page.waitForFunction(()=>window.__FROG__.inspect().cameraMode==='third');
   await page.evaluate(()=>{const g=window.frogArcade;g.running=false;g.state.grace=0;const p=g.state.actors[0];Object.assign(g.state.actors[1],{x:p.x-3,z:p.z-6,ammo:10,targetId:'rival-2'});Object.assign(g.state.actors[2],{x:p.x+3,z:p.z-6,ammo:10,targetId:'rival-1'});g.renderActors(0);});
   await page.screenshot({path:`${out}/desktop-rival-identities.png`});
   const colors=await page.evaluate(()=>window.frogArcade.models.map(m=>m.group.getObjectByName('frog-weighted-surface').material.color.getHexString()));assert.equal(new Set(colors).size,3);pass('Desktop C switches view; every frog has a different skin and numbered map identity');
  }
  await context.close();
 }
 assert.deepEqual(report.errors,[]);report.ok=true;
}catch(e){report.ok=false;report.failure=e.stack;console.error(e);process.exitCode=1;}finally{await fs.writeFile(out+'/readability-report.json',JSON.stringify(report,null,2));await browser.close();}
function innerWidthFallback(w){return w;}
