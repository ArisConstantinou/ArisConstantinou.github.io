import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const version='4.3.12',out=process.env.OUT_DIR||'/workspace/scratch/bb1e5197fd61/frog4312-browser-qa';
const expectedJS=process.env.EXPECTED_JS||'index-DWfNSGOP.js',expectedCSS=process.env.EXPECTED_CSS||'index-C6AM5HRI.css';
const cases=new Set((process.env.CASES||'desktop,portrait').split(','));
const url=new URL(process.env.BASE_URL||'http://127.0.0.1:4176/');url.searchParams.set('test','1');
const report={version,checks:[],failures:[],errors:[],screenshots:[],bundles:[],stylesheets:[],limitations:['Chromium software WebGL and emulated portrait touch.','Fixtures position and freeze rivals; production frame, input and collision logic run unchanged.','Blur cleanup dispatches the browser blur event directly; keyboard, mouse and touch actions use native browser input.']};
await fs.mkdir(out,{recursive:true});
const record=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${ok?'':' '+JSON.stringify(detail)}`);};
const save=()=>fs.writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||'/tmp/frog-full-chromium/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
report.browser=browser.version();
async function frames(page,n=1){await page.evaluate(n=>{const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels;try{for(let i=0;i<n;i++){g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;g.drawLabels=labels;}},n);}
async function capture(page,name){await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);await save();}
async function boot(mobile=false){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:800},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,touchFireMode:'manual'})));
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.stack||e.message));page.setDefaultTimeout(20000);
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(v=>window.__FROG__?.version===v,version,{timeout:180000});
 await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=JSON.parse(JSON.stringify(g.state));window.qaEvents=[];for(const type of ['keydown','pointerdown'])document.addEventListener(type,e=>window.qaEvents.push({type,key:e.code,kind:e.pointerType,trusted:e.isTrusted}));});
 for(const src of await page.evaluate(()=>[...document.scripts].filter(s=>s.type==='module').map(s=>s.src)))if(!report.bundles.includes(src))report.bundles.push(src);
 for(const href of await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)))if(!report.stylesheets.includes(href))report.stylesheets.push(href);
 await page.locator('#new-round-button')[mobile?'tap':'click']();await frames(page,2);
 return {context,page,cdp:await context.newCDPSession(page),mobile,label:mobile?'portrait':'desktop'};
}
async function fixture(page,{player={x:0,z:6},targets=[],view='overview',yaw=Math.PI,pitch=.12}={}){
 await page.evaluate(({player,targets,view,yaw,pitch})=>{const g=window.frogArcade;g.clearInputs();g.releaseMouseLook();g.clearEffects();g.state=JSON.parse(JSON.stringify(window.qaFresh));const s=g.state,p=s.actors[0];s.phase='battle';s.intro=0;s.time=30;Object.assign(p,{...player,face:yaw,aimX:Math.sin(yaw),aimY:0,aimZ:Math.cos(yaw)});for(const [i,a] of s.actors.slice(1).entries()){Object.assign(a,{ko:true,eliminated:true,respawnTime:9999});if(targets[i])Object.assign(a,{...targets[i],ko:false,eliminated:false,shot:9999,idle:9999,kickCooldown:9999,aiShotReady:9999,machineTimer:9999,face:0,aimX:0,aimY:0,aimZ:1});}g.viewMode=view;g.cameraYaw=yaw;g.cameraPitch=pitch;g.aim={x:p.aimX,z:p.aimZ};g.cameraReady=false;g.shake=0;g.buildActors();g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');g.calloutUntil=-1;g.hitConfirmUntil=0;g.lastPlayerHit=null;g.accumulator=0;g.updateCameraPose(0);g.updateHUD();window.qaEvents=[];},{player,targets,view,yaw,pitch});
 await page.waitForFunction(()=>!document.pointerLockElement);await page.evaluate(view=>{window.frogArcade.$('view-button').textContent=view==='overview'?'ΚΑΤΟΨΗ · C':'ΠΙΣΩ 3D · C';},view);await frames(page,2);
}
async function snap(page){return page.evaluate(()=>{const g=window.frogArcade;return {running:g.running,width:g.w,height:g.h,keys:[...g.keys],fire:g.actions.fire,shots:g.state.stats.shots,hits:g.state.stats.hits,actors:g.state.actors.map(a=>({id:a.id,x:a.x,z:a.z,ko:a.ko,dizzyTime:a.dizzyTime,finishHits:a.finishHits,kick:a.kick,catapultId:a.catapultId})),preview:g.currentAimPreview,screen:g.currentAimScreen,crosshair:g.currentAimReticle,path:g.currentAimPathScreen,guide:!!g.aimGuide?.visible,reticle:!!g.aimReticle?.visible,ring:!!g.targetRing?.visible,activeKeys:[...document.querySelectorAll('#keyboard-display [data-key].is-active')].map(e=>e.dataset.key),activeMouse:[...document.querySelectorAll('#mouse-display [data-button].is-active')].map(e=>e.dataset.button)};});}
async function buttons(page){return page.locator('.frog-action').evaluateAll(list=>list.map(e=>{const r=e.getBoundingClientRect(),k=e.querySelector('.frog-action-key');return {id:e.dataset.targetId,hidden:e.hidden||!r.width||getComputedStyle(e).visibility==='hidden',disabled:e.disabled,text:e.textContent,label:e.getAttribute('aria-label'),state:e.dataset.state,remaining:e.dataset.remaining,pips:e.querySelectorAll('.finish-pip').length,filled:e.querySelectorAll('.finish-pip.is-filled').length,key:k&&!k.hidden&&getComputedStyle(k).display!=='none'?k.textContent:null,x:r.x,y:r.y,width:r.width,height:r.height};}));}
async function touch(c,selector,dx=0,dy=0){const r=await c.page.locator(selector).boundingBox();await c.cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:r.x+r.width*(.5+dx),y:r.y+r.height*(.5+dy),radiusX:5,radiusY:5,force:1}]});}
async function release(c){await c.cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
const crosshairOnly=s=>!!s.screen&&s.screen.x>=0&&s.screen.x<=s.width&&s.screen.y>=0&&s.screen.y<=s.height&&!!s.preview&&!s.guide&&!s.reticle&&!s.ring&&!(s.path?.length);
async function desktopInput(c){
 const {page}=c;await fixture(page);const placement=await page.evaluate(()=>{const box=id=>{const r=document.getElementById(id).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};return {keys:box('keyboard-display'),mouse:box('mouse-display'),old:!!document.getElementById('desktop-help'),text:document.getElementById('desktop-controls').textContent,width:innerWidth};});
 record(placement.keys.x<50&&placement.mouse.x+placement.mouse.width>placement.width-50&&placement.keys.x+placement.keys.width<placement.mouse.x,'desktop: keyboard and mouse displays occupy opposite screen edges',placement);
 record(!placement.old&&!/Esc|Κλικ|Αποθήκη|Καταπέλτης/i.test(placement.text),'desktop: generic bottom help row is removed',placement.text);
 for(const key of ['w','a','s','d']){await page.keyboard.down(key);await frames(page,1);const s=await snap(page);record(s.activeKeys.includes('Key'+key.toUpperCase()),`desktop: ${key.toUpperCase()} key lights while held`,s.activeKeys);await page.keyboard.up(key);await frames(page,1);}
 record((await snap(page)).activeKeys.length===0,'desktop: keyup clears all key highlights');
 await page.keyboard.down('w');await page.keyboard.down('d');await frames(page,2);let chord=await snap(page);record(chord.activeKeys.includes('KeyW')&&chord.activeKeys.includes('KeyD'),'desktop: simultaneous movement keys both light',chord.activeKeys);await capture(page,'desktop-keys-active');await page.keyboard.up('w');await page.keyboard.up('d');await frames(page,1);
 await page.mouse.move(640,400);await page.mouse.down();await frames(page,1);let s=await snap(page);record(s.activeMouse.includes('0')&&s.fire&&s.shots>0,'desktop: left mouse segment reflects real firing',s);await capture(page,'desktop-left-mouse-active');await page.mouse.up();await frames(page,1);
 const before=(await snap(page)).shots;await page.mouse.down({button:'right'});await frames(page,2);s=await snap(page);record(s.activeMouse.includes('2')&&!s.activeMouse.includes('0')&&s.shots===before,'desktop: right mouse segment lights without firing',s);await capture(page,'desktop-right-mouse-active');await page.mouse.up({button:'right'});await frames(page,1);
 record((await snap(page)).activeMouse.length===0,'desktop: mouseup clears both mouse segments');
 await page.mouse.down();await page.mouse.down({button:'right'});await frames(page,1);s=await snap(page);record(s.activeMouse.includes('0')&&s.activeMouse.includes('2'),'desktop: both physical mouse buttons can light together',s.activeMouse);await page.mouse.up();await frames(page,1);s=await snap(page);record(s.activeMouse.length===1&&s.activeMouse[0]==='2'&&!s.fire,'desktop: releasing left during a chord stops fire and keeps only right lit',s);await page.mouse.up({button:'right'});await frames(page,1);
 await page.keyboard.down('w');await page.mouse.down({button:'right'});await frames(page,1);await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await frames(page,1);s=await snap(page);
 record(!s.running&&!s.keys.length&&!s.activeKeys.length&&!s.activeMouse.length&&!s.fire,'desktop: blur pauses and clears held input feedback',s);await page.keyboard.up('w');await page.mouse.up({button:'right'});
}
async function contexts(c){
 const {page,label,mobile}=c;await fixture(page);record(!await page.locator('#catapult-button').isVisible()&&!await page.locator('#sabotage-button').isVisible(),`${label}: interaction prompts are absent in open space`);
 const station=await page.evaluate(()=>{const c=window.frogArcade.state.catapults[0];return {x:c.x,z:c.z+2.05};});await fixture(page,{player:station});
 const catapult=page.locator('#catapult-button');record(await catapult.isVisible()&&await catapult.locator('svg').count()>0&&(mobile||await catapult.locator('kbd').textContent()==='E'),`${label}: nearby catapult shows its contextual icon and key`);
 if(!mobile){await catapult.click({button:'right'});await frames(page,2);record(!(await snap(page)).actors[0].catapultId,'desktop: secondary click on the catapult action does not mount');}
 if(mobile)await catapult.tap();else await page.keyboard.press('e');await frames(page,3);record(!!(await snap(page)).actors[0].catapultId,`${label}: contextual catapult interaction mounts`);
 if(mobile)await catapult.tap();else await page.keyboard.press('e');await frames(page,3);record(!(await snap(page)).actors[0].catapultId,`${label}: contextual interaction also dismounts`);
 await fixture(page,{player:{x:-19.1,z:1}});const stock=page.locator('#sabotage-button');const text=await stock.textContent();record(await stock.isVisible()&&await stock.locator('svg').count()>0&&text.includes('8')&&(mobile||await stock.locator('kbd').textContent()==='E'),`${label}: nearby storage shows its contextual icon, key and duration`,text);
 if(mobile)await touch(c,'#sabotage-button');else await page.keyboard.down('e');await frames(page,60);const progress=await page.evaluate(()=>window.frogArcade.state.bases[1].progress);record(progress>.98&&progress<1.02,`${label}: contextual storage hold advances the real channel`,progress);await capture(page,label+'-storage-context');
 if(mobile)await release(c);else await page.keyboard.up('e');await frames(page,1);record(await page.evaluate(()=>window.frogArcade.state.bases[1].progress===0),`${label}: release clears contextual storage hold`);
}
async function rivals(c){
 const {page,label,mobile}=c;await fixture(page,{targets:[{x:-1.5,z:6,dizzyTime:8},{x:1.7,z:6,dizzyTime:8}]});let list=(await buttons(page)).filter(b=>!b.hidden);
 record(list.length===2&&list.every(b=>!b.disabled),`${label}: each reachable dizzy rival has its own action`,list);
 record(list.every(b=>b.remaining==='3'&&b.pips===3&&b.filled===0),`${label}: fresh dizzy rivals show three remaining finish hits`,list);
 if(!mobile)record(list.filter(b=>b.key?.trim()==='Q').length===1&&list.find(b=>b.key?.trim()==='Q')?.id==='rival-1','desktop: Q badge identifies the nearest actual kick target',list);
 const projected=await page.evaluate(()=>{const g=window.frogArcade;return g.state.actors.slice(1).map(a=>({id:a.id,...g.project(a.x,g.ground(a.x,a.z)+.55,a.z)}));});
 record(list.every(b=>{const p=projected.find(p=>p.id===b.id);return p&&Math.hypot(b.x+b.width/2-p.x,b.y+b.height/2-p.y)<135;}),`${label}: rival actions are anchored beside their own frogs`,{list,projected});
 const bodies=await page.evaluate(()=>{const g=window.frogArcade;return g.state.actors.filter(a=>!a.ko&&!a.eliminated).map(a=>{const pts=[];for(const dx of [-.64,.64])for(const dz of [-.64,.64])for(const dy of [.05,.84])pts.push(g.project(a.x+dx,g.ground(a.x,a.z)+a.height+dy,a.z+dz));const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);return {id:a.id,x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)};});});record(list.every(b=>bodies.every(p=>b.x+b.width<=p.x||b.x>=p.x+p.width||b.y+b.height<=p.y||b.y>=p.y+p.height)),`${label}: action cards leave the player and rival bodies visible`,{list,bodies});
 const viewport=page.viewportSize();record(list.every(b=>b.x>=0&&b.y>=0&&b.x+b.width<=viewport.width&&b.y+b.height<=viewport.height),`${label}: rival action targets stay inside the viewport`,list);await capture(page,label+'-two-rival-actions');
 const hud=await page.locator('#arcade-hud,#minimap,#view-button,#keyboard-display,#mouse-display,#catapult-button,#sabotage-button,#sabotage-status').evaluateAll(es=>es.filter(e=>getComputedStyle(e).visibility!=='hidden').map(e=>{const r=e.getBoundingClientRect();return {id:e.id,x:r.x,y:r.y,width:r.width,height:r.height};}).filter(r=>r.width&&r.height));record(list.every(b=>hud.every(p=>b.x+b.width<=p.x||b.x>=p.x+p.width||b.y+b.height<=p.y||b.y>=p.y+p.height)),`${label}: rival actions leave fixed HUD controls clear`,{list,hud});
 if(mobile){const pads=await page.locator('.move-zone,.aim-zone').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));record(list.every(b=>pads.every(p=>b.x+b.width<=p.x||b.x>=p.x+p.width||b.y+b.height<=p.y||b.y>=p.y+p.height)),'portrait: rival actions leave both touch sticks clear',{list,pads});}
 const before=list.find(b=>b.id==='rival-1');await page.evaluate(()=>Object.assign(window.frogArcade.state.actors[1],{x:-1.3,z:6.3}));await frames(page,2);const followed=(await buttons(page)).find(b=>b.id==='rival-1');record(before&&followed&&!followed.hidden&&Math.hypot(followed.x-before.x,followed.y-before.y)>1,`${label}: the action follows its moving rival`,{before,followed});
 const action=page.locator('.frog-action[data-target-id="rival-2"]');await action[mobile?'tap':'click']();await frames(page,18);let s=await snap(page);
 record(s.actors[1].finishHits===0&&s.actors[2].finishHits===1&&!s.actors[2].ko&&s.shots===0,`${label}: action hits only the selected rival and preserves three-hit finishing`,s);
 const hitButton=(await buttons(page)).find(b=>b.id==='rival-2');record(hitButton?.remaining==='2'&&hitButton.filled===1,`${label}: one successful kick updates the finishing pips`,hitButton);
 if(!mobile){await fixture(page,{targets:[{x:-1.5,z:6},{x:1.7,z:6,dizzyTime:8}]});record(!(await buttons(page)).some(b=>!b.hidden&&b.key?.trim()==='Q'),'desktop: no misleading Q badge when the nearer target is awake');}
 await fixture(page,{targets:[{x:0,z:1,dizzyTime:8}]});list=(await buttons(page)).filter(b=>!b.hidden);const far=list.find(b=>b.id==='rival-1');record(!!far&&far.disabled,`${label}: distant dizzy rival shows a disabled action`,far);
 record(!!far&&/range|far|approach|πλησ|κοντ|απόστ|μακρι|εκτός/i.test([far.state,far.text,far.label].join(' ')),`${label}: distant action explains its range restriction`,far);
 if(far){if(mobile){await touch(c,'.frog-action[data-target-id="rival-1"]');await release(c);}else await page.mouse.click(far.x+far.width/2,far.y+far.height/2);await frames(page,18);s=await snap(page);record(s.actors[1].finishHits===0&&s.actors[0].kick===0,`${label}: disabled distant action cannot kick`,s);}
 await page.evaluate(()=>{const g=window.frogArcade;g.state.actors[1].dizzyTime=0;});await frames(page,1);record(!(await buttons(page)).some(b=>b.id==='rival-1'&&!b.hidden),`${label}: recovered rival loses its action`);
}
async function pointAim(page,point,view){
 if(view==='overview'){const q=await page.evaluate(p=>window.frogArcade.project(p.x,p.y,p.z),point);await page.mouse.move(q.x,q.y);await frames(page,2);return;}
 let mouse={x:640,y:400};await page.mouse.move(mouse.x,mouse.y);await frames(page,1);
 for(let i=0;i<4;i++){const q=await page.evaluate(p=>{const g=window.frogArcade;return {...g.project(p.x,p.y,p.z),w:g.w,h:g.h,fov:g.camera.fov};},point),f=q.h/2/Math.tan(q.fov*Math.PI/360);mouse.x+=Math.atan((q.x-q.w/2)/f)/.0025;mouse.y+=Math.atan((q.y-q.h/2)/f)/.0025;await page.mouse.move(mouse.x,mouse.y);await frames(page,2);}
}
async function aiming(c){
 const {page}=c;
 for(const view of ['overview','chase3d']){
  for(const offset of [0,1.1]){
   await fixture(page,{targets:[{x:0,z:0}],view});const point=await page.evaluate(offset=>{const g=window.frogArcade,a=g.state.actors[1];return {x:a.x+offset,y:g.ground(a.x,a.z)+.42,z:a.z};},offset);await pointAim(page,point,view);let s=await snap(page);
   record(crosshairOnly(s),`${view}: ${offset?'near-miss':'body aim'} shows only one crosshair`,s);if(!offset)await capture(page,'desktop-'+view+'-crosshair');
   await page.mouse.down();await frames(page,1);await page.mouse.up();await frames(page,35);s=await snap(page);record(s.shots===1&&s.hits===(offset?0:1),`${view}: real ${offset?'near miss stays clear':'body shot hits'}`,s);
  }
  await fixture(page,{player:{x:0,z:20.5},targets:[{x:5,z:20.5}],view,yaw:Math.PI/2});const point=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],a=g.state.actors[1];return {x:a.x,y:g.ground(p.x,p.z)+.45,z:a.z};});await pointAim(page,point,view);let s=await snap(page);record(crosshairOnly(s)&&s.preview.blocked&&s.preview.kind==='wall',`${view}: crosshair trace respects the wall`,s);await capture(page,'desktop-'+view+'-blocked');
  await page.mouse.down();await frames(page,1);await page.mouse.up();await frames(page,35);s=await snap(page);record(s.shots===1&&s.hits===0,`${view}: real shot remains blocked by the wall`,s);
 }
}
try{
 if(cases.has('desktop')||cases.has('aiming')){const desktop=await boot();if(cases.has('desktop')){await desktopInput(desktop);await contexts(desktop);await rivals(desktop);}await aiming(desktop);await desktop.context.close();}
 if(cases.has('portrait')){const portrait=await boot(true);await contexts(portrait);await rivals(portrait);await fixture(portrait.page);await touch(portrait,'#aim-stick',.42,0);await frames(portrait.page,3);await release(portrait);await frames(portrait.page,2);const s=await snap(portrait.page);record(crosshairOnly(s),'portrait: touch aim retains a lone visible crosshair',s);record(s.crosshair?.offscreen&&s.crosshair.edgeAngle!==null&&s.crosshair.projection.x>s.width,'portrait: off-screen range uses the visible edge crosshair',s.crosshair);await capture(portrait.page,'portrait-crosshair');await portrait.context.close();}
 record(report.bundles.every(s=>s.endsWith('/'+expectedJS)),'exact production JavaScript',report.bundles);
 record(report.stylesheets.every(s=>s.endsWith('/'+expectedCSS)),'exact production CSS',report.stylesheets);
}catch(e){report.errors.push(e.stack||String(e));console.error(e);}
finally{await browser.close();report.ok=!report.failures.length&&!report.errors.length;await save();console.log(JSON.stringify({ok:report.ok,checks:report.checks.length,failures:report.failures.length,errors:report.errors.length,report:`${out}/report.json`}));}
process.exitCode=report.ok?0:1;
