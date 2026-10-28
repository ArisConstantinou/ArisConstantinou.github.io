import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const version='4.3.13',out=process.env.OUT_DIR||'/workspace/scratch/bb1e5197fd61/frog4313-guards-browser',url=new URL(process.env.BASE_URL||'http://127.0.0.1:4178/');url.searchParams.set('test','1');
const expectedJS=process.env.EXPECTED_JS||'index-rM853FT7.js',cases=new Set((process.env.CASES||'desktop,portrait').split(',')),labelsOnly=process.env.LABELS_ONLY==='1';
const report={version,scope:labelsOnly?'guard-label-regression':'guard-gameplay-and-view',checks:[],failures:[],errors:[],screenshots:[],bundles:[],limitations:['Chromium software WebGL; portrait uses emulated touch.','Fixtures position the player and freeze rival frogs. Guard windup, charge, health, disable, countdown and base removal come from the production model.','All snapshots use the normal production frame and original scene; no substitute beetle or screenshot-only geometry.']};
await fs.mkdir(out,{recursive:true});
const check=(ok,name,detail)=>{(ok?report.checks:report.failures).push({name,...(detail===undefined?{}:{detail})});console.log(`${ok?'PASS':'FAIL'} ${name}${ok?'':' '+JSON.stringify(detail)}`);};
const save=()=>fs.writeFile(out+'/report.json',JSON.stringify(report,null,2));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||'/tmp/frog-full-chromium/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
async function frames(page,n=1){await page.evaluate(n=>{const g=window.frogArcade,render=g.renderer.render,labels=g.drawLabels;try{for(let i=0;i<n;i++){g.renderer.render=i===n-1?render:()=>{};g.drawLabels=i===n-1?labels:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;g.drawLabels=labels;}},n);}
async function capture(page,name){await page.evaluate(()=>window.frogArcade.renderer.getContext().finish());const path=`${out}/${name}.png`;await page.screenshot({path});report.screenshots.push(path);await save();}
async function boot(mobile=false){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,touchFireMode:'manual'})));
 const page=await context.newPage();page.on('pageerror',error=>report.errors.push(error.stack||error.message));page.setDefaultTimeout(20000);
 await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(v=>window.__FROG__?.version===v,version,{timeout:180000});
 await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=JSON.parse(JSON.stringify(g.state));window.qaGuardEvents=[];const consume=g.consumeEvents.bind(g);g.consumeEvents=function(){window.qaGuardEvents.push(...this.state.events.map(event=>({...event})));return consume();};});
 for(const src of await page.evaluate(()=>[...document.scripts].filter(script=>script.type==='module').map(script=>script.src)))if(!report.bundles.includes(src))report.bundles.push(src);
 await page.locator('#new-round-button')[mobile?'tap':'click']();await frames(page,2);return {page,context,mobile,label:mobile?'portrait':'desktop'};
}
async function snap(page,id='guard-rival-1'){
 return page.evaluate(id=>{const g=window.frogArcade,guard=g.state.guards.find(item=>item.id===id),visual=g.guardsView.guards.get(id),point=g.project(guard.x,g.ground(guard.x,guard.z)+.31,guard.z);return {version:window.__FROG__.version,capacity:g.inspect().capacity,ammo:g.state.actors.map(actor=>actor.ammo),guard:{...guard},point,visible:visual.group.visible,kind:visual.group.userData.kind,legCount:visual.group.userData.legCount,roll:visual.body.rotation.z,laneVisible:visual.lane.visible,lane:{...visual.lane.userData},dust:visual.dust.count,label:g.guardsView.labels.get(id),preview:g.currentAimPreview,shots:g.state.stats.shots,hits:g.state.stats.hits,player:{x:g.state.actors[0].x,z:g.state.actors[0].z,dizzy:g.state.actors[0].dizzy,height:g.state.actors[0].height},events:window.qaGuardEvents.filter(event=>event.type.startsWith('guard'))};},id);
}
async function fixture(page,{mode='overview',distance=1.7,disabledCheckpoint=false}={}){
 await page.evaluate(({mode,distance,disabledCheckpoint})=>{
  const g=window.frogArcade;g.clearInputs();g.releaseMouseLook();g.clearEffects();g.state=JSON.parse(JSON.stringify(disabledCheckpoint?window.qaDisabled:window.qaFresh));const s=g.state,p=s.actors[0],guard=s.guards.find(item=>item.id==='guard-rival-1');s.phase='battle';s.intro=0;s.time=30;
  if(!disabledCheckpoint)Object.assign(p,{x:guard.x+distance,z:guard.z,face:-Math.PI/2,aimX:-1,aimY:0,aimZ:0,tongue:100});
  for(const actor of s.actors.slice(1))Object.assign(actor,{ko:true,eliminated:true,respawnTime:9999});
  g.viewMode=mode;g.cameraYaw=-Math.PI/2;g.cameraPitch=.25;g.aim={x:-1,z:0};g.cameraReady=false;g.shake=0;g.buildActors();g.running=true;g.mode='play';g.$('arcade-menu').hidden=true;g.ui.classList.remove('in-menu','settings-open');g.calloutUntil=-1;g.hitConfirmUntil=0;g.lastPlayerHit=null;g.accumulator=0;g.updateCameraPose(0);g.updateHUD();g.$('view-button').textContent=mode==='overview'?'ΚΑΤΟΨΗ · C':'ΠΙΣΩ 3D · C';window.qaGuardEvents=[];
 },{mode,distance,disabledCheckpoint});
 await page.waitForFunction(()=>!document.pointerLockElement);await frames(page,2);
}
async function startup(c){
 const {page,label,mobile}=c,initial=await snap(page,'guard-player');
 check(initial.capacity===90&&initial.ammo.every(ammo=>ammo===90),`${label}: all frogs start with the real capacity of90`,initial.ammo);
 check(initial.guard.mode==='patrol'&&initial.guard.health===4&&initial.visible&&initial.kind==='beetle'&&initial.legCount===6,`${label}: own storage starts with a live six-legged beetle`,initial);
 check(initial.point.visible&&initial.point.x>0&&initial.point.x<(mobile?390:1440)&&initial.point.y>0&&initial.point.y<(mobile?844:900),`${label}: own beetle projects into the first gameplay camera`,initial.point);
 await capture(page,label+'-startup-own-guard-chase');
 if(mobile)await page.locator('#view-button').tap();else await page.keyboard.press('c');await frames(page,2);await capture(page,label+'-startup-own-guard-overview');
 check((await snap(page,'guard-player')).guard.mode==='patrol',`${label}: preparation remains neutral without guard attacks`);
}
async function attackSequence(c){
 const {page,label,mobile}=c;await fixture(page,{distance:2.1});let s=await snap(page);
 check(s.guard.mode==='windup'&&s.laneVisible&&s.guard.health===4,`${label}: approaching an enemy storage starts the real warning`,s);
 check(s.label?.maxHealth===4&&s.label?.health===4,`${label}: the nearby beetle has four readable health pips`,s.label);
 const lane=JSON.stringify(s.lane);await capture(page,label+'-enemy-windup-overview');
 if(mobile)await page.locator('#view-button').tap();else await page.keyboard.press('c');await frames(page,2);await capture(page,label+'-enemy-windup-chase');
 if(mobile)await page.locator('#view-button').tap();else await page.keyboard.press('c');await frames(page,2);
 if(!mobile){await page.keyboard.down('w');await frames(page,12);await page.keyboard.up('w');s=await snap(page);check(JSON.stringify(s.lane)===lane&&s.guard.mode==='windup',`${label}: native dodge does not turn the committed charge lane`,s.lane);}
 let started=false;for(let i=0;i<70;i++){await frames(page,1);s=await snap(page);if(s.guard.mode==='charge'){started=true;break;}}
 check(started&&s.events.some(event=>event.type==='guardWindup')&&s.events.some(event=>event.type==='guardCharge'),`${label}: charge follows actual windup and charge events`,{mode:s.guard.mode,events:s.events});
 if(started){await frames(page,3);s=await snap(page);check(s.guard.mode==='charge'||s.guard.mode==='recover',`${label}: charge advances through the live model`,s.guard);await capture(page,label+'-enemy-charge');}
 await frames(page,28);s=await snap(page);check(!s.laneVisible&&s.guard.mode==='recover',`${label}: recovery clears the attack warning`,s.guard);
}
async function fourNativeHits(page,{skipTimers=false}={}){
 await fixture(page);let s=await snap(page);
 for(let hit=1;hit<=4;hit++){
  const aim=await page.evaluate(()=>{const g=window.frogArcade,guard=g.state.guards.find(item=>item.id==='guard-rival-1');return g.project(guard.x,g.ground(guard.x,guard.z)+.31,guard.z);});
  await page.mouse.move(aim.x,aim.y);await frames(page,1);const preview=(await snap(page)).preview;
  check(preview?.kind==='guard'&&preview?.targetId==='guard-rival-1',`desktop: native cursor resolves the real beetle body before hit${hit}`,preview);
  await page.mouse.down();await frames(page,1);await page.mouse.up();await frames(page,9);s=await snap(page);
  check(s.guard.health===4-hit,`desktop: native shot${hit} removes exactly one guard health pip`,{health:s.guard.health,shots:s.shots,events:s.events});
  if(hit===1)await capture(page,'desktop-enemy-after-one-real-shot');
 }
 check(s.guard.mode==='disabled'&&s.guard.respawnTime>19.5&&s.guard.respawnTime<=20, 'desktop: the fourth actual hit starts the20-second disable window',s.guard);
 await frames(page,16);s=await snap(page);check(s.roll>3&&s.label?.remaining===Math.ceil(s.guard.respawnTime),'desktop: disabled beetle flips and displays its actual wake countdown',{roll:s.roll,label:s.label,remaining:s.guard.respawnTime});
 await capture(page,'desktop-enemy-disabled-overview');await page.keyboard.press('c');await frames(page,2);await capture(page,'desktop-enemy-disabled-chase');
 await page.evaluate(()=>{window.qaDisabled=JSON.parse(JSON.stringify(window.frogArcade.state));});
 if(skipTimers)return;
 const remaining=(await snap(page)).guard.respawnTime;await frames(page,Math.max(1,Math.floor(remaining*60)-1));s=await snap(page);check(s.guard.mode==='disabled','desktop: guard remains disabled until its full countdown elapses',s.guard);
 await frames(page,3);s=await snap(page);check(s.guard.mode==='patrol'&&s.guard.health===4&&s.events.some(event=>event.type==='guardRespawn'),'desktop: guard wakes with four health only after the real timer',s.guard);await capture(page,'desktop-enemy-awake-again');
 await fixture(page,{disabledCheckpoint:true});await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],base=g.state.bases.find(base=>base.id==='base-rival-1');Object.assign(p,{x:base.x-.3,z:base.z,height:0,hop:0,knockUp:0,hit:0,shot:0,kick:0,sabotageRecovery:0});g.cameraReady=false;g.updateCameraPose(0);});await frames(page,2);
 await page.keyboard.down('e');await frames(page,485);await page.keyboard.up('e');await frames(page,1);s=await snap(page);
 check(s.guard.mode==='gone'&&!s.visible&&!s.laneVisible,'desktop: actual storage destruction removes its beetle and warning',s.guard);await capture(page,'desktop-destroyed-storage-no-guard');
}
async function labelCheck(page,name){
 const result=await page.evaluate(()=>{const g=window.frogArcade,guard=g.state.guards.find(item=>item.id==='guard-rival-1'),base=g.state.bases.find(item=>item.id===guard.baseId),q=g.project(base.x-1.1,g.ground(base.x-1.1,base.z)+3.5,base.z);return {label:g.guardsView.labels.get(guard.id),storage:{left:q.x-95,right:q.x+95,top:q.y-16,bottom:q.y+6},mode:guard.mode};});
 const label=result.label?.rect,other=result.storage;check(!!label&&!(label.left<other.right&&label.right>other.left&&label.top<other.bottom&&label.bottom>other.top),name,result);
}
async function labels(c,disabledState){
 await startup(c);await fixture(c.page);await labelCheck(c.page,c.label+': warning leaves the storage caption clear in overview');await capture(c.page,c.label+'-warning-caption-clear-overview');
 await c.page.locator('#view-button')[c.mobile?'tap':'click']();await frames(c.page,2);await labelCheck(c.page,c.label+': close chase warning stays readable');await capture(c.page,c.label+'-warning-caption-clear-chase');
 if(!c.mobile){await fourNativeHits(c.page,{skipTimers:true});await labelCheck(c.page,'desktop: actual disabled countdown stays readable');return c.page.evaluate(()=>window.qaDisabled);}
 if(disabledState){await c.page.evaluate(state=>{window.qaDisabled=state;},disabledState);await fixture(c.page,{disabledCheckpoint:true});await labelCheck(c.page,'portrait: saved actual disabled countdown leaves storage caption clear');await capture(c.page,'portrait-disabled-caption-clear-overview');await c.page.locator('#view-button').tap();await frames(c.page,2);await labelCheck(c.page,'portrait: close chase disabled countdown stays readable');await capture(c.page,'portrait-disabled-caption-clear-chase');}
}
try{
 let disabledState;
 if(cases.has('desktop')){const c=await boot();if(labelsOnly)disabledState=await labels(c);else{await startup(c);await attackSequence(c);await fourNativeHits(c.page);}await c.context.close();}
 if(cases.has('portrait')){const c=await boot(true);if(labelsOnly)await labels(c,disabledState);else{await startup(c);await attackSequence(c);}await c.context.close();}
 check(report.bundles.some(src=>src.endsWith(expectedJS)),'expected application module was exercised',report.bundles);check(report.errors.length===0,'no browser runtime errors',report.errors);report.ok=report.failures.length===0;await save();if(!report.ok)process.exitCode=1;
}catch(error){report.errors.push(error.stack||String(error));report.ok=false;await save();throw error;}finally{await browser.close();}
