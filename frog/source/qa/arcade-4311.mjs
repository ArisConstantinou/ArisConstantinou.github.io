import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const out=process.env.OUT_DIR||'/workspace/scratch/bb1e5197fd61/frog4311-browser-qa',version='4.3.11';
const expectedJS=process.env.EXPECTED_JS||'index-C6tl8qSO.js',expectedCSS=process.env.EXPECTED_CSS||'index-3UJmJq6J.css';
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4176/');url.searchParams.set('test','1');
const cases=new Set((process.env.CASES||'baseline,overview').split(','));
const report={version,checks:[],failures:[],errors:[],screenshots:[],bundles:[],stylesheets:[],limitations:['Chromium with software WebGL; emulated portrait touch, not an iPhone.','Positioned rivals and fixed-step production gameplay.']};
await fs.mkdir(out,{recursive:true});
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${ok?'':' '+JSON.stringify(detail)}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||'/tmp/frog-full-chromium/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();
async function frames(page,n=1){await page.evaluate(n=>{const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels;try{for(let i=0;i<n;i++){g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;g.drawLabels=labels;}},n);}
async function snap(page){return page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],r=g.state.actors[1];return {x:p.x,z:p.z,ko:p.ko,shield:p.spawnShield,respawn:p.respawnTime,ammo:p.ammo,hits:g.state.stats.hits,shots:g.state.stats.shots,enemy:{x:r.x,z:r.z,},base:{...g.state.bases[1]},button:g.$('sabotage-button').textContent,round:g.$('round-time').textContent};});}
async function fixture(page,player={x:0,z:6},target=null,view='chase3d'){
 await page.evaluate(({player,target,view})=>{const g=window.frogArcade;g.clearInputs();g.releaseMouseLook();g.clearEffects();g.state=JSON.parse(JSON.stringify(window.qaFresh));const s=g.state,p=s.actors[0];s.phase='battle';s.intro=0;s.time=30;Object.assign(p,{...player,face:Math.PI,aimX:0,aimZ:-1,aimY:0});for(const a of s.actors.slice(1))Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});if(target)Object.assign(s.actors[1],{...target,ko:false,eliminated:false,shot:9999,idle:9999,kickCooldown:9999,aiShotReady:9999,machineTimer:9999,face:0,aimX:0,aimZ:1,aimY:0});g.viewMode=view;g.cameraYaw=Math.PI;g.cameraPitch=.12;g.cameraReady=false;g.shake=0;g.buildActors();g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');g.calloutUntil=-1;g.accumulator=0;g.updateCameraPose(0);g.updateHUD();window.qaEvents=[];},{player,target,view});
 await page.waitForFunction(()=>!document.pointerLockElement);await frames(page,2);
}
async function capture(page,name){await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);await save();}
async function boot(mobile){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:800},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,touchFireMode:'manual'})));
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.stack||e.message));page.setDefaultTimeout(30000);
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(v=>window.__FROG__?.version===v,version,{timeout:180000});
 await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=JSON.parse(JSON.stringify(g.state));window.qaEvents=[];for(const type of ['keydown','pointerdown'])document.addEventListener(type,e=>window.qaEvents.push({type,key:e.code,kind:e.pointerType,trusted:e.isTrusted}));});
 for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
 for(const href of await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)))if(!report.stylesheets.includes(href))report.stylesheets.push(href);
 await page.locator('#new-round-button')[mobile?'tap':'click']();await frames(page,2);
 return {context,page,cdp:await context.newCDPSession(page),mobile,label:mobile?'portrait':'desktop'};
}
async function contact(c,id,dx=0,dy=0){const r=await c.page.locator('#'+id).boundingBox();await c.cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:r.x+r.width*(.5+dx),y:r.y+r.height*(.5+dy),radiusX:5,radiusY:5,force:1}]});}
async function release(c,keys=[]){if(c.mobile)await c.cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else for(const key of keys)await c.page.keyboard.up(key);}
async function movement(c,keys,dx,dy,n){if(c.mobile)await contact(c,'move-stick',dx,dy);else for(const key of keys)await c.page.keyboard.down(key);await frames(c.page,n);await release(c,keys);}
async function checks(c){
 const {page,label,mobile}=c;
 await fixture(page,{x:2.25,z:20.5});await movement(c,['d','w'],.32,-.32,24);const wall=await snap(page);
 record(wall.x<=2.291&&wall.z<19.8,`${label}: diagonal input slides along wall`,wall);await capture(page,label+'-wall-slide');
 await movement(c,['a'],-.42,0,16);const away=await snap(page);record(away.x<wall.x-.5,`${label}: reversing leaves wall contact`,away);
 await fixture(page,{x:-11,z:3.5});await movement(c,['d'],.42,0,44);const rock=await snap(page);
 record(rock.x>-9.2&&rock.z>3.7&&Math.hypot(rock.x+8,rock.z-2)>2.139,`${label}: rock grazing keeps motion and clearance`,rock);await capture(page,label+'-rock-glance');
 await movement(c,['a'],-.42,0,14);record((await snap(page)).x<rock.x-.4,`${label}: reversing after a rock glance works`);
 await fixture(page,{x:0,z:6},{x:0,z:4});await movement(c,['w'],0,-.42,30);const bodies=await snap(page);
 record(Math.hypot(bodies.x-bodies.enemy.x,bodies.z-bodies.enemy.z)>=1.27,`${label}: frogs do not pass through each other`,bodies);
 await fixture(page,{x:-19.1,z:1});const ready=await snap(page);record(ready.button.includes('8″'),`${label}: storage control shows eight seconds`,ready.button);
 const hold=async()=>mobile?contact(c,'sabotage-button'):page.keyboard.down('e');
 await hold();await frames(page,120);let s=await snap(page);record(s.base.progress>1.98&&s.base.progress<2.02,`${label}: hold advances progress`,s.base);await capture(page,label+'-storage-progress');
 await release(c,['e']);await frames(page,1);s=await snap(page);record(s.base.progress===0&&!s.base.attackerId,`${label}: releasing interaction resets destruction`,s.base);
 await hold();await frames(page,479);s=await snap(page);record(!s.base.destroyed&&s.base.progress>7.95,`${label}: storage not destroyed early`,s.base);
 await frames(page,1);s=await snap(page);record(s.base.destroyed&&s.base.progress===8,`${label}: eight-second destruction`,s.base);await release(c,['e']);
 await fixture(page);await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];Object.assign(p,{ko:true,eliminated:false,respawnTime:12,ammo:0,height:.9});g.updateHUD();});
 record((await snap(page)).round==='12″',`${label}: knockout shows twelve-second timer`);
 await frames(page,719);s=await snap(page);record(s.ko&&s.respawn>0&&s.respawn<.02,`${label}: no respawn before twelve seconds`,s);
 await frames(page,1);s=await snap(page);record(!s.ko&&s.ammo===60&&s.shield>.98,`${label}: respawn restores ammo and protection`,s);
 await page.evaluate(()=>{window.frogArcade.cameraReady=false;});await frames(page,1);await capture(page,label+'-respawn-shield');
 if(mobile)await contact(c,'fire-button');else await page.mouse.down();await frames(page,1);s=await snap(page);
 record(s.shots>0&&s.shield===0,`${label}: firing cancels spawn protection`,s);if(mobile)await release(c);else await page.mouse.up();
 const events=await page.evaluate(()=>window.qaEvents);record(events.some(e=>e.trusted&&(mobile?e.kind==='touch':e.kind==='mouse')),`${label}: native browser input`);
}
async function shots(c){
 for(const [name,offset,hit] of [['body',0,true],['near-miss',1.05,false]]){
  await fixture(c.page,{x:0,z:6},{x:0,z:0},'overview');
  const point=await c.page.evaluate(offset=>{const g=window.frogArcade,a=g.state.actors[1];return g.project(a.x+offset,g.ground(a.x,a.z)+.42,a.z);},offset);
  await c.page.mouse.move(point.x,point.y);await frames(c.page,1);await capture(c.page,'desktop-aim-'+name);
  await c.page.mouse.down();await frames(c.page,1);await c.page.mouse.up();await frames(c.page,35);const s=await snap(c.page);
  record(s.shots===1&&(hit?s.hits===1:s.hits===0),`desktop: actual mouse ${name} shot ${hit?'hits visible body':'misses space beside body'}`,{point,...s});
 }
}
async function aimSnap(page){return page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],v=g.currentAimPreview,a=g.aimGuide.geometry.attributes.position,n=Math.min(a.count,g.aimGuide.geometry.drawRange.count)-1;return {view:g.viewMode,aim:{x:p.aimX,y:p.aimY,z:p.aimZ},preview:v,guide:g.aimGuide.visible,marker:g.aimReticle.visible,endpoint:[a.getX(n),a.getY(n),a.getZ(n)],reticle:g.aimReticle.position.toArray(),screen:g.currentAimScreen,cursor:g.currentAimCursorScreen,projected:v?g.project(v.x,v.y,v.z):null,shots:g.state.stats.shots,hits:g.state.stats.hits,bullets:g.state.bullets.filter(b=>b.owner===p.id).map(b=>({x:b.dx,y:b.dy,z:b.dz}))};});}
const exactMarker=s=>s.guide&&s.marker&&s.preview&&Math.hypot(s.endpoint[0]-s.preview.x,s.endpoint[1]-s.preview.y,s.endpoint[2]-s.preview.z)<.0001&&Math.hypot(s.reticle[0]-s.preview.x,s.reticle[1]-s.preview.y,s.reticle[2]-s.preview.z)<.0001&&s.screen&&Math.hypot(s.screen.x-s.projected.x,s.screen.y-s.projected.y)<.1;
const sameDirection=(a,b)=>!!b&&(a.x*b.x+a.y*b.y+a.z*b.z)/Math.hypot(a.x,a.y,a.z)/Math.hypot(b.x,b.y,b.z)>.999;
async function overview(c){
 const {page,label,mobile}=c;await fixture(page);
 if(mobile)await page.locator('#view-button').tap();else await page.keyboard.press('c');await frames(page,2);
 let s=await aimSnap(page);record(s.view==='overview'&&exactMarker(s),`${label}: camera switch immediately shows real shot path and impact marker`,s);
 if(mobile){
  await contact(c,'aim-stick',.42,0);await frames(page,3);s=await aimSnap(page);
  record(s.aim.x>.98&&Math.abs(s.aim.z)<.1&&s.shots===0&&exactMarker(s),'portrait: outer aim ring shows rightward path without firing',s);
  await release(c);await frames(page,2);const held=await aimSnap(page);
  record(exactMarker(held)&&sameDirection(s.aim,held.aim),'portrait: released aim keeps its visible direction',held);
  await capture(page,'portrait-overview-path');await contact(c,'fire-button');await frames(page,1);const fired=await aimSnap(page);await release(c);
  record(fired.shots===1&&sameDirection(held.aim,fired.bullets[0]),'portrait: center fire launches along the shown direction',fired);
 }else{
  for(const sign of [-1,1]){
   const point=await page.evaluate(sign=>{const g=window.frogArcade,p=g.state.actors[0];return g.project(p.x+sign*7,g.ground(p.x,p.z)+.45,p.z);},sign);
   await page.mouse.move(point.x,point.y);await frames(page,2);s=await aimSnap(page);
   record(s.aim.x*sign>.98&&Math.abs(s.aim.z)<.1&&s.shots===0&&exactMarker(s),`desktop: pointer ${sign<0?'left':'right'} gives the same clear shot direction`,s);
  }
  await capture(page,'desktop-overview-path');await page.mouse.down();await frames(page,1);const fired=await aimSnap(page);await page.mouse.up();
  record(fired.shots===1&&sameDirection(s.aim,fired.bullets[0]),'desktop: click launches along the shown direction',fired);
  await fixture(page,{x:0,z:20.5},{x:5,z:20.5});await page.keyboard.press('c');await frames(page,2);
  const beyond=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];return g.project(5,g.ground(p.x,p.z)+.45,p.z);});
  await page.mouse.move(beyond.x,beyond.y);await frames(page,2);s=await aimSnap(page);
  record(s.preview?.blocked&&s.preview.kind==='wall'&&s.preview.x<3.1&&exactMarker(s),'desktop: the wall ends the visible path at the real impact',s);
  record(s.screen&&Math.hypot(s.screen.x-beyond.x,s.screen.y-beyond.y)>12,'desktop: impact marker is distinct from the cursor beyond cover',{beyond,screen:s.screen,cursor:s.cursor});
  await capture(page,'desktop-overview-wall-stop');await page.mouse.down();await frames(page,1);await page.mouse.up();await frames(page,35);s=await aimSnap(page);
  record(s.shots===1&&s.hits===0,'desktop: indicated wall also blocks the real shot',s);
 }
}
try{
 const desktop=await boot(false);if(cases.has('baseline')){await checks(desktop);await shots(desktop);}if(cases.has('overview'))await overview(desktop);await desktop.context.close();
 const portrait=await boot(true);if(cases.has('baseline'))await checks(portrait);if(cases.has('overview'))await overview(portrait);await portrait.context.close();
 record(report.bundles.every(s=>s.endsWith('/'+expectedJS)),'exact production JavaScript',report.bundles);
 record(report.stylesheets.every(s=>s.endsWith('/'+expectedCSS)),'exact production CSS',report.stylesheets);
}catch(e){report.errors.push(e.stack||String(e));console.error(e);}
finally{await browser.close();report.ok=!report.failures.length&&!report.errors.length;await save();console.log(JSON.stringify({ok:report.ok,checks:report.checks.length,failures:report.failures.length,errors:report.errors.length,report:`${out}/report.json`}));}
process.exitCode=report.ok?0:1;
