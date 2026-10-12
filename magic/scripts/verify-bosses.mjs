import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const root=path.resolve('.'),source=path.join(root,'_source'),output=path.join(root,'output/bosses/runtime');await fs.mkdir(output,{recursive:true});
const fixture=path.join(source,'.cache/boss-test');
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const {build}=await import(pathToFileURL(path.join(source,'node_modules/vite/dist/node/index.js')));
const diagnostic=`
window.__BOSS_QA__={
 throwTrace:()=>{const e=entities.find(e=>e.ephemeral&&!e.removed);e.body.addEventListener('collide',c=>{window.__BOSS_QA__.contacts??=[];window.__BOSS_QA__.contacts.push({other:c.body.entity?.bossType||c.body.entity?.kind||'world',held:e===held,thrownBy:e.thrownBy,speed:c.contact.getImpactVelocityAlongNormal(),position:e.body.position.toArray()});});},
 snapshot:()=>({contacts:window.__BOSS_QA__.contacts,preview:throwPreview,velocity:currentThrowVelocity(),phase,runTime,player:{x:player.body.position.x,y:player.body.position.y,z:player.body.position.z,hp:player.hp,mana:player.mana},bosses:entities.filter(e=>e.bossType).map(e=>({type:e.bossType,room:e.room.name,x:e.body.position.x,y:e.body.position.y,z:e.body.position.z,hp:e.hp,dead:e.dead,clip:e.mesh.userData.animationState,time:e.bossTime,guardBreak:e.guardBreak,windup:e.windup,stun:e.stun})),props:entities.filter(e=>e.ephemeral&&!e.removed).map(e=>({id:e.body.id,x:e.body.position.x,y:e.body.position.y,z:e.body.position.z,thrownBy:e.thrownBy})),held:held?.bossType||held?.kind||null,relicTaken,draw:{...renderer.info.render},memory:{...renderer.info.memory}}),
 stage:type=>{for(const a of arrows){scene.remove(a.mesh);a.mesh.geometry.dispose();a.mesh.material.dispose();}arrows=[];for(const e of [...entities])if(!e.isPlayer&&(e.category==='prop'||e.kind!=='boss'))removeEntity(e);const b=entities.find(e=>e.bossType===type);for(const e of entities)if(e.category==='actor'&&!e.isPlayer&&e!==b){e.stun=100;e.body.velocity.set(0,0,0);}b.stun=0;b.hp=b.maxHp;b.dead=false;b.bossAttack=null;b.attackCooldown=.3;b.attackIndex=0;player.hp=player.maxHp;player.mana=player.maxMana;player.invulnerable=0;const choices=[{x:b.body.position.x,z:b.body.position.z+3.8},{x:b.body.position.x+3.8,z:b.body.position.z},{x:b.body.position.x,z:b.body.position.z-3.8}];const p=choices.find(p=>insideBossRoom(p,b.room,.8)&&nav.isFree(p.x,p.z))||{x:b.body.position.x,z:b.body.position.z+2.5};player.body.position.set(p.x,player.cy+.08,p.z);player.body.velocity.set(0,0,0);cameraTarget.set(p.x,0,p.z-1.8);aimDirection.set(b.body.position.x-p.x,0,b.body.position.z-p.z).normalize();return b.bossType;},
 project:p=>{camera.updateMatrixWorld();const v=new THREE.Vector3(p.x,p.y,p.z).project(camera);return {x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};},
 pick:p=>pickObject({clientX:p.x,clientY:p.y,pointerType:'mouse'})?.kind,
 haltBosses:()=>{for(const b of entities.filter(e=>e.bossType)){b.attackCooldown=100;b.bossAttack=null;b.windup=0;}},
 nativeStage:type=>{const b=entities.find(e=>e.bossType===type),r=b.room,points=[];for(let x=r.xMin+1.5;x<r.xMax-1.5;x+=1.5)for(let z=r.zMin+1.5;z<r.zMax-1.5;z+=1.5)if(nav.isFree(x,z))points.push({x,z});let pair;for(const a of points)for(const p of points)if(!pair&&distance(a,p)>telekinesisReach()+b.radius+1.5&&distance(a,p)<14.5&&nav.clearRoute(a,p))pair=[a,p];if(!pair)throw new Error('No separated throw fixture in '+r.name);b.body.position.set(pair[0].x,b.cy+.05,pair[0].z);b.body.velocity.set(0,0,0);b.body.aabbNeedsUpdate=true;b.stun=100;b.bossAttack=null;b.windup=0;player.body.position.set(pair[1].x,player.cy+.05,pair[1].z);player.body.velocity.set(0,0,0);player.body.aabbNeedsUpdate=true;cameraTarget.set(pair[1].x,0,pair[1].z-1.8);aimDirection.set(pair[0].x-pair[1].x,0,pair[0].z-pair[1].z).normalize();},
 attackStage:(type,index)=>{const b=entities.find(e=>e.bossType===type),p=b.body.position;const choices=[{x:p.x,z:p.z+2},{x:p.x,z:p.z-2},{x:p.x+2,z:p.z},{x:p.x-2,z:p.z}];const q=choices.find(q=>insideBossRoom(q,b.room,.6)&&nav.isFree(q.x,q.z));if(!q)throw new Error('No clear melee fixture');b.attackIndex=index;b.attackCooldown=.3;player.body.position.set(q.x,player.cy+.05,q.z);player.body.velocity.set(0,0,0);player.body.aabbNeedsUpdate=true;cameraTarget.set(q.x,0,q.z-1.8);},
 hurtCaster:()=>hurt(entities.find(e=>e.kind==='boss'&&!e.bossType),10000,player.body.position),
 hurtBoss:(type,amount)=>hurt(entities.find(e=>e.bossType===type),amount,player.body.position),
 inRoom:type=>{const b=entities.find(e=>e.bossType===type);return insideBossRoom(b.body.position,b.room,.1);},
 knockOutside:type=>{const b=entities.find(e=>e.bossType===type);b.body.position.z=b.room.zMin-.5;b.body.aabbNeedsUpdate=true;b.body.velocity.set(0,0,-10);b.stun=.65;},
 teleport:p=>{player.body.position.set(p.x,player.cy+.08,p.z);player.body.velocity.set(0,0,0);cameraTarget.set(p.x,0,p.z-1.8);},
 relic:()=>({x:worldMap.relic.position.x,z:worldMap.relic.position.z}),
 portal:()=>({x:worldMap.exit.position.x,z:worldMap.exit.position.z}),
 profile:()=>{renderer.info.autoReset=false;},
};`;
await build({configFile:path.join(source,'vite.config.js'),root:source,logLevel:'error',plugins:[{name:'private-boss-test-fixture',transform(code,id){if(id===path.join(source,'src/main.js').replaceAll('\\','/')){assert.ok(code.includes('if(composer){'));return code.replace('if(composer){','renderer.info.reset();if(composer){')+diagnostic;}}}],build:{outDir:fixture,emptyOutDir:true,minify:false}});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
const report={date:new Date().toISOString(),url:'http://127.0.0.1:5173/',source:'Private compiled test fixture; production functions and physics, isolated browser storage, no second server. Position fixtures are explicit; this is not an unaided full playthrough.',errors:[],checks:[],performance:[],layouts:[]};
const check=(name,value,detail)=>{report.checks.push({name,passed:!!value,detail});assert.ok(value,name);};
let context;
const snap=page=>page.evaluate(()=>window.__BOSS_QA__.snapshot());
async function capture(page,name){await page.screenshot({path:path.join(output,name+'.png')});}
async function benchmark(page,label){
 const metrics=await page.evaluate(async()=>{window.__BOSS_QA__.profile();const times=[];await new Promise(resolve=>{let previous;const step=t=>{if(previous!==undefined)times.push(t-previous);previous=t;if(times.length<180)requestAnimationFrame(step);else resolve();};requestAnimationFrame(step);});const s=[...times].sort((a,b)=>a-b),sum=times.reduce((a,b)=>a+b,0);const gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return {fps:1000*times.length/sum,p95:s[Math.floor(s.length*.95)],p99:s[Math.floor(s.length*.99)],max:Math.max(...times),over50:times.filter(t=>t>50).length,heap:performance.memory?.usedJSHeapSize,viewport:{width:innerWidth,height:innerHeight},gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'unavailable',snapshot:window.__BOSS_QA__.snapshot()};});report.performance.push({label,...metrics});
}
try{
 context=await managed.browser.newContext({viewport:{width:1440,height:900},serviceWorkers:'block',recordVideo:{dir:path.join(output,'motion'),size:{width:1440,height:900}}});
 await context.addInitScript(()=>{let seed=4917;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;});const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.route('http://127.0.0.1:5173/**',async route=>{
  const url=new URL(route.request().url()),relative=decodeURIComponent(url.pathname).replace(/^\//,'')||'index.html';
  if(relative.includes('..'))throw new Error('Unexpected fixture path');
  const file=path.join(fixture,relative);const mime=relative.endsWith('.js')?'application/javascript':relative.endsWith('.css')?'text/css':relative.endsWith('.html')?'text/html':relative.endsWith('.glb')?'model/gltf-binary':undefined;
  try{await route.fulfill({path:file,contentType:mime});}catch(e){report.errors.push('Missing fixture '+relative+': '+e.message);await route.abort();}
 });
 await page.goto(report.url);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
 check('three distinct bosses loaded',new Set((await snap(page)).bosses.map(b=>b.type)).size===3);
 await capture(page,'desktop-menu');await page.locator('#start-button').click();
 await benchmark(page,'desktop-start');
 for(let run=0;run<(process.argv.includes('--focused')?2:12);run++){
  const before=await snap(page);report.layouts.push(before.bosses);check('one boss per room run '+run,new Set(before.bosses.map(b=>b.room)).size===3&&before.bosses.length===3);
  if(run>0)check('changed room order run '+run,report.layouts[run-1].map(b=>b.room+':'+b.type).join()!==before.bosses.map(b=>b.room+':'+b.type).join());
  await page.keyboard.press('Escape');await page.locator('#pause-restart').click();
 }
 for(const type of ['colossus','gargoyle','wraith']){
  await page.evaluate(t=>window.__BOSS_QA__.stage(t),type);await page.waitForTimeout(250);
  const before=await snap(page);await capture(page,type+'-room-before');
  await page.waitForFunction(t=>window.__BOSS_QA__.snapshot().bosses.find(b=>b.type===t).windup>0,type,{timeout:10000});
  const windup=await snap(page);check(type+' has its own attack clip',windup.bosses.find(b=>b.type===type).clip!=='2H_Melee_Attack_Chop',windup);
  await capture(page,type+'-windup');await page.waitForTimeout(2300);await capture(page,type+'-attack-recovery');
  await benchmark(page,type+'-combat');
  for(const [index,clip,hitTime,damage] of type==='colossus'?[[0,'Slam',.95,22],[1,'Sweep',1.05,18]]:type==='gargoyle'?[[0,'Dive',1.65,22],[1,'Claw',.95,16]]:[[0,'ChainSweep',1.15,19],[1,'Binding',1.3,16]]){
   await page.evaluate(t=>window.__BOSS_QA__.stage(t),type);await page.evaluate(({type,index})=>window.__BOSS_QA__.attackStage(type,index),{type,index});
   await page.waitForFunction(({type,clip})=>window.__BOSS_QA__.snapshot().bosses.find(b=>b.type===type).clip===clip&&window.__BOSS_QA__.snapshot().bosses.find(b=>b.type===type).windup>0,{type,clip},{timeout:8000});
   check(type+' '+clip+' windup precedes damage',(await snap(page)).player.hp===120);
   await page.waitForFunction(({type,time})=>window.__BOSS_QA__.snapshot().bosses.find(b=>b.type===type).time>time,{type,time:hitTime+.1});
   const struck=await snap(page);check(type+' '+clip+' damages once at contact',struck.player.hp===120-damage,struck);
  }
  // A thrown conjured stone exercises the actual native input and collision callback.
  await page.evaluate(t=>window.__BOSS_QA__.stage(t),type);await page.evaluate(t=>window.__BOSS_QA__.nativeStage(t),type);await page.waitForTimeout(250);
  const b=(await snap(page)).bosses.find(b=>b.type===type);
  const aim=await page.evaluate(p=>window.__BOSS_QA__.project(p),{x:b.x,y:.8,z:b.z});await page.mouse.move(aim.x,aim.y);await page.waitForTimeout(100);
  await page.keyboard.press('r');await page.waitForTimeout(450);const stone=(await snap(page)).props.at(-1);check(type+' conjures stone',!!stone);
  const start=await page.evaluate(p=>window.__BOSS_QA__.project(p),stone);
  const picked=await page.evaluate(p=>window.__BOSS_QA__.pick(p),start);check(type+' stone pick is visible',picked==='stone',{picked,start,stone,state:await snap(page)});
  await page.evaluate(()=>window.__BOSS_QA__.throwTrace());await page.mouse.move(start.x,start.y);await page.mouse.down();await page.waitForTimeout(100);
  check(type+' grabs stone',(await snap(page)).held==='stone',await snap(page));
  await page.mouse.move(aim.x,aim.y,{steps:8});await page.waitForTimeout(80);
  report.release=await snap(page);await capture(page,type+'-throw-release');
  await page.mouse.up();await page.waitForTimeout(750);const hit=await snap(page);check(type+' takes native thrown-object damage',hit.bosses.find(e=>e.type===type).hp<b.hp,hit);
  await capture(page,type+'-throw-hit');
  // Moving outside the room must stop pursuit/attacks.
  await page.evaluate(()=>window.__BOSS_QA__.teleport({x:0,z:18}));await page.waitForTimeout(1100);const leashed=await snap(page);const boss=leashed.bosses.find(e=>e.type===type);check(type+' stays in assigned room',boss.room===b.room&&await page.evaluate(t=>window.__BOSS_QA__.inRoom(t),type),leashed);
  await page.evaluate(t=>window.__BOSS_QA__.knockOutside(t),type);await page.waitForTimeout(160);check(type+' stunned knockback respects room boundary',await page.evaluate(t=>window.__BOSS_QA__.inRoom(t),type),await snap(page));
 }
 // The real interaction stays gated when only two guardians are dead.
 await page.evaluate(()=>{window.__BOSS_QA__.hurtBoss('colossus',10000);window.__BOSS_QA__.hurtBoss('gargoyle',10000);window.__BOSS_QA__.teleport(window.__BOSS_QA__.relic());});
 await page.keyboard.press('e');await page.waitForTimeout(120);check('two dead guardians cannot release relic',!(await snap(page)).relicTaken);
 await page.evaluate(()=>window.__BOSS_QA__.hurtBoss('wraith',10000));await page.keyboard.press('e');await page.waitForTimeout(120);check('three deaths keep fourth guardian gate',!(await snap(page)).relicTaken);await page.evaluate(()=>window.__BOSS_QA__.hurtCaster());await page.keyboard.press('e');await page.waitForTimeout(120);check('all four deaths release relic',(await snap(page)).relicTaken);
 await page.evaluate(()=>window.__BOSS_QA__.teleport(window.__BOSS_QA__.portal()));await page.keyboard.press('e');await page.waitForTimeout(120);check('escape resolves victory',(await snap(page)).phase==='result');
 for(const [label,width,height] of [['portrait',390,844],['landscape',844,390]]){
  await page.setViewportSize({width,height});if((await snap(page)).phase==='result')await page.locator('#result-restart').click();await page.evaluate(()=>window.__BOSS_QA__.stage('wraith'));await page.waitForTimeout(250);
  check(label+' has no horizontal page overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await capture(page,label+'-gameplay');await benchmark(page,label+'-start');
  await page.keyboard.press('Escape');await page.locator('#pause-restart').click();
 }
 check('no browser page errors',report.errors.length===0,report.errors);
 console.log(JSON.stringify({checks:report.checks.length,passed:report.checks.filter(c=>c.passed).length,errors:report.errors,performance:report.performance.map(p=>({label:p.label,fps:p.fps,p95:p.p95,max:p.max,draw:p.snapshot.draw}))}));
}catch(e){report.failure=e.stack;console.error(e.stack);process.exitCode=1;}
finally{await context?.close();await managed.cleanup();await fs.writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));}
