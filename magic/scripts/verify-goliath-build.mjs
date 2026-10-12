import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const THREE=await import('../_source/node_modules/three/build/three.module.js');
const output=path.resolve(process.env.MAGIC_QA_OUTPUT||'output/expansion/build');await fs.mkdir(output,{recursive:true});
const url=process.env.MAGIC_TEST_URL||'http://127.0.0.1:5173/.cache/goliath-build/';
const report={date:new Date().toISOString(),url,checks:[],errors:[],requests:[]};
const check=(name,passed,detail)=>{report.checks.push({name,passed,detail});if(!passed)throw new Error(name+': '+JSON.stringify(detail));};
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height]of [['desktop',1440,900],['mobile',390,844],['mobile-landscape',844,390]]){
  const touch=mode!=='desktop',context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
  await context.addInitScript(()=>{const NativeWorker=window.Worker;window.__BUILD_WORKERS__=[];window.Worker=class extends NativeWorker{constructor(url,options){super(url,options);const record={url:String(url),messages:0,points:0,error:null};window.__BUILD_WORKERS__.push(record);this.addEventListener('message',e=>{record.messages++;record.points=e.data.preview?.points.length??0;record.error=e.data.error??null;});}};});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  page.on('response',r=>{if(r.url().includes(new URL(url).pathname+'engine/'))report.requests.push({url:r.url(),status:r.status()});});
  await page.goto(url);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
  const state=()=>page.evaluate(()=>window.__MAGIC__.snapshot()),advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
  const s=await state();check(mode+' compiled 14 rooms + bridge / 64 enemies + 4 bosses',s.rooms.length===15&&s.enemies.length===68&&s.enemies.filter(e=>e.kind==='boss').length===4,s.rooms.length);
  check(mode+' compiled version and isolated saves',await page.evaluate(()=>window.__MAGIC__.version===(location.pathname.includes('/.cache/loot-')?'1.3.0-preview':'1.2.1-preview')&&window.__MAGIC__.snapshot().candidate&&localStorage.getItem('magic-exiled-v1')===null));
  const stoneButton=page.locator('.touch-actions [data-action="conjure"]');
  if(touch)await stoneButton.tap();else await page.keyboard.press('r');
  const after=await state();check(mode+' native stone input',after.stones.length===1,after.stones);
  const aspect=width/height,halfH=aspect<1?10.5/aspect:11.3,camera=new THREE.OrthographicCamera(-halfH*aspect,halfH*aspect,halfH,-halfH,.1,180);
  const target=new THREE.Vector3(after.position.x,0,after.position.z-1.8);camera.position.copy(target).add(new THREE.Vector3(0,22,17));camera.lookAt(target);camera.updateMatrixWorld();
  const stone=after.stones[0].position,v=new THREE.Vector3(stone.x,stone.y,stone.z).project(camera),pick={x:(v.x+1)*width/2,y:(1-v.y)*height/2};
  const cdp=touch?await context.newCDPSession(page):null;
  if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...pick,id:1}]});else{await page.mouse.move(pick.x,pick.y);await page.mouse.down();}
  await page.waitForFunction(()=>!!window.__MAGIC__.snapshot().holding);
  const aim={x:Math.min(width-30,pick.x+width*.3),y:pick.y-30};
  if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...aim,id:1}]});else await page.mouse.move(aim.x,aim.y);
  await page.waitForFunction(()=>window.__BUILD_WORKERS__.some(w=>w.messages>0&&w.points>1));
  const workers=await page.evaluate(()=>window.__BUILD_WORKERS__);check(mode+' compiled trajectory worker answers',workers.every(w=>!w.error)&&workers.some(w=>/engine\/trajectory-worker-.*\.js/.test(w.url)),workers);
  await page.screenshot({path:path.join(output,mode+'-trajectory.png')});
  if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else await page.mouse.up();
  if(!touch){
   await page.keyboard.press('Escape');await page.locator('#pause-restart').click();
   // Exercise the unmodified production bundle with native input only. Retreat
   // onto the original entrance bridge while making stones near the mage.
   await page.keyboard.down('ArrowDown');await advance(1250);await page.keyboard.up('ArrowDown');
   await advance(60);
   for(let i=0;i<7;i++){await page.keyboard.press('r');await advance(140);}
   const seven=await state();check('compiled seven native stones before ritual',seven.stones.length===7&&seven.phase==='playing',seven);
   const identities=seven.stones.map(e=>e.mesh).sort();
   await page.keyboard.down('r');await advance(2300);await page.keyboard.up('r');
   let a=await state();await page.screenshot({path:path.join(output,'desktop-blocked-placement.png')});
   check('compiled narrow bridge rejects placement without consuming stones',a.ritual.phase==='idle'&&a.stones.length===7&&!a.stones.some(e=>e.reserved)&&JSON.stringify(a.stones.map(e=>e.mesh).sort())===JSON.stringify(identities),a.ritual);
   // The southward bridge end has no room beyond the mage. Aim north into
   // its free interior, using the same seven restored stones and native mouse.
   await page.mouse.move(width/2,height/2-120);await advance(60);
   await page.keyboard.down('r');await advance(2300);await page.keyboard.up('r');
   a=await state();check('compiled native hold enters assembly',a.ritual.phase==='assemble',{phase:a.phase,ritual:a.ritual,position:a.position,stones:a.stones,text:await page.locator('body').innerText()});
   check('compiled seven original stone meshes retained',JSON.stringify(a.stones.map(e=>e.mesh).sort())===JSON.stringify(identities));
   await advance(1600);a=await state();check('compiled assembly has intermediate attached stones',a.ritual.locked.length>0&&a.ritual.locked.length<7,a.ritual);
   await page.screenshot({path:path.join(output,'desktop-assembly.png')});
   // Keep playing while assembly continues: push the pursuing guards away,
   // enter the courtyard and dash aside. Remaining motion uses real inputs.
   await page.keyboard.press('f');await page.keyboard.down('ArrowUp');await advance(1000);await page.keyboard.up('ArrowUp');
   await page.keyboard.down('ArrowLeft');await page.keyboard.press('Space');await advance(650);await page.keyboard.up('ArrowLeft');
   await advance(3150);a=await state();check('compiled seven stones form active physical Goliath',!!a.goliath&&!a.goliath.dead&&a.stones.length===0&&a.phase==='playing',{phase:a.phase,hp:a.hp,goliath:a.goliath,stones:a.stones.length,ritual:a.ritual});
   await page.screenshot({path:path.join(output,'desktop-goliath.png')});
  }
  await context.close();
 }
 check('all compiled asset responses healthy',report.requests.length>0&&report.requests.every(r=>r.status===200),report.requests);
}catch(e){report.errors.push(e.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({checks:report.checks.length,failed:report.checks.filter(c=>!c.passed),errors:report.errors,cleanup:report.cleanup},null,2));if(report.errors.length)process.exitCode=1;}
