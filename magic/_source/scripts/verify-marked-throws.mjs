import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve(process.env.MAGIC_QA_OUTPUT||'output/loot-combat/marked-throws');await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),cases:[],errors:[]};
const extra=`const realThrow=throwHeld;throwHeld=v=>{window.__MARK__.released={...v};realThrow(v);};window.__MARK__={hits:[],target:null,item:null,released:null,
 setup:kind=>{startRun();for(const e of [...entities])if(!e.isPlayer)removeEntity(e);const enemy=actor('guard',4,14);enemy.stun=1e5;const item=kind==='guard'?actor('guard',0,16.4):prop(kind,0,16.4,{y:1.15,mass:kind==='crate'?5:2,ephemeral:kind==='stone'});item.guardBreak=20;item.stun=1e5;window.__MARK__.item=item;window.__MARK__.target=enemy;window.__MARK__.hits=[];item.body.addEventListener('collide',event=>{if(item.thrownBy==='player'){const c=event.contact,first=c.bi===item.body,o=first?c.ri:c.rj;window.__MARK__.hits.push({kind:event.body.entity?.kind||'world',floor:!!event.body.previewFloor,position:{x:item.body.position.x+o.x,y:item.body.position.y+o.y,z:item.body.position.z+o.z}});}});syncVisuals(0);updateCamera(1);},
 state:()=>({phase,held:!!held,hp:window.__MARK__.target.hp,item:window.__MARK__.item.body.position.toArray(),target:window.__MARK__.target.body.position.toArray(),velocity:held?currentThrowVelocity():null,released:window.__MARK__.released,preview:throwPreview,hits:window.__MARK__.hits,
 marker:{visible:targetRing.visible,position:targetRing.position.toArray(),onFloor:nav.onFloor(targetRing.position.x,targetRing.position.z),line:trajectory.visible,side:sideTrajectory.visible,impact:impactMarker.visible},
 destination:throwDestination.toArray()}),
 project:p=>{camera.updateMatrixWorld();const v=new THREE.Vector3(...p).project(camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};}
};`;
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
const contexts=new Set();
try{
 for(const touch of [false,true]){
  const context=await managed.browser.newContext({viewport:touch?{width:390,height:844}:{width:1440,height:900},hasTouch:touch,isMobile:touch,deviceScaleFactor:1,serviceWorkers:'block'});
  contexts.add(context);
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  await context.route('**/src/main.js*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:(await r.text())+'\n'+extra});});
  await page.goto(process.env.MAGIC_TEST_URL||'http://127.0.0.1:5173/.cache/loot-game/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
  const cdp=touch?await context.newCDPSession(page):null,state=()=>page.evaluate(()=>window.__MARK__.state()),project=p=>page.evaluate(p=>window.__MARK__.project(p),p);
  const move=async p=>{if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,...p}]});else await page.mouse.move(p.x,p.y);};
  for(const mode of ['enemy','side','wall','empty','slow','fast'])for(const kind of mode==='wall'?['stone','crate','guard']:['crate']){
   await page.evaluate(kind=>window.__MARK__.setup(kind),kind);let s=await state();const pick=await project(s.item);
   if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,...pick}]});else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
   await page.waitForFunction(()=>window.__MARK__.state().held);
   if(['side','wall','empty'].includes(mode)){if(!touch)await page.keyboard.down('Shift');else{const r=await page.locator('.touch-actions [data-action="shield"]').boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,...pick},{id:2,x:r.x+r.width/2,y:r.y+r.height/2}]});}}
   let aim=await project(mode==='wall'?[17,.8,18]:mode==='empty'?[-4,.8,14]:[(await state()).target[0],(await state()).target[1]+.2,(await state()).target[2]]);
   if(touch&&['side','wall','empty'].includes(mode)){const r=await page.locator('.touch-actions [data-action="shield"]').boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,...aim},{id:2,x:r.x+r.width/2,y:r.y+r.height/2}]});}else await move(aim);
   await page.waitForTimeout(750);
   // A quarter-screen fast stroke represents the same physical gesture at both
   // viewports; fixed 80px undershoots default power on a 1440px desktop canvas.
   if(mode==='fast'){await move({x:aim.x-page.viewportSize().width*.25,y:aim.y});await page.waitForTimeout(40);await move(aim);}else if(mode==='slow'){await move({x:aim.x-20,y:aim.y});await page.waitForTimeout(250);await move(aim);await page.waitForTimeout(200);}
   const before=await state();if(mode!=='fast')await page.screenshot({path:path.join(output,(touch?'touch':'pc')+'-'+mode+'-'+kind+'.png')});
   if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else{await page.mouse.up();await page.keyboard.up('Shift');}await page.waitForTimeout(1300);const after=await state();
   let pass=before.marker.visible&&before.marker.onFloor;
   if(['enemy','slow','fast'].includes(mode))pass&&=after.hp<65&&!before.marker.line;
   if(mode==='side')pass&&=after.hp<65&&before.marker.side&&!!before.preview.side&&!before.marker.line;
   if(mode==='wall'){const predicted=before.preview?.impacts.find(h=>!h.ground&&h.kind==='world'),actual=after.hits.find(h=>!h.floor&&h.kind==='world');pass&&=!!predicted&&!!actual&&before.marker.impact&&(!predicted.breaksProjectile||!before.marker.line);}
   if(mode==='empty')pass&&=!before.marker.line&&after.hits.some(h=>h.floor);
   report.cases.push({touch,mode,kind,pass,before,after});
  }
  await context.close();contexts.delete(context);
 }
 for(const touch of [false,true]){const slow=report.cases.find(c=>c.touch===touch&&c.mode==='slow'),fast=report.cases.find(c=>c.touch===touch&&c.mode==='fast');report.cases.push({name:(touch?'touch':'pc')+' swipe sets power',pass:fast.after.released.speed>slow.after.released.speed,slow:slow.after.released.speed,fast:fast.after.released.speed});}
}catch(e){report.errors.push(e.stack);process.exitCode=1;}
finally{for(const c of contexts)await c.close().catch(e=>report.errors.push(e.message));try{await managed.cleanup();}catch(e){report.errors.push('Owned browser cleanup: '+managed.report.cleanupErrors.join('; '));}report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.cases.filter(c=>c.pass).length,total:report.cases.length,failures:report.cases.filter(c=>!c.pass).map(c=>({touch:c.touch,mode:c.mode,kind:c.kind,marker:c.before?.marker,hp:c.after?.hp,preview:c.before?.preview?.impacts.slice(0,2),hits:c.after?.hits,slow:c.slow,fast:c.fast})),errors:report.errors,cleanup:report.cleanup}));if(report.errors.length||report.cases.some(c=>!c.pass))process.exitCode=1;}
