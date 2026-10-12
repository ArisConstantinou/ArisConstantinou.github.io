import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const source=path.resolve('_source'),{build}=await import(pathToFileURL(path.join(source,'node_modules/vite/dist/node/index.js')));
const output=path.resolve('output/playwright/fire-main-materials'),fixture=path.resolve('_source/.cache/fire-main-materials');await fs.mkdir(output,{recursive:true});
// Private compiled fixtures position the player and objects; all fire, physics,
// controls, damage, materials and boss animation functions are the real ones.
const diagnostic=`
window.__FIRE_QA__={
 halt(){for(const e of entities)if(e.category==='actor'&&!e.isPlayer){e.stun=100;e.attackCooldown=100;e.body.velocity.set(0,0,0);}player.invulnerable=100;player.hp=player.maxHp;player.mana=player.maxMana;},
 source(id){this.halt();fireSpell.reset();for(const s of worldMap.torches)worldMap.setTorchLit(s.id,true);const s=worldMap.torches[id],p=s.position;
 let point;for(let r=1;r<4&&!point;r+=.4)for(let a=0;a<6.28;a+=.25){const q={x:p.x+Math.cos(a)*r,y:player.cy,z:p.z+Math.sin(a)*r};if(nav.isFree(q.x,q.z)&&fireLineClear(q,p)&&worldMap.colliders.every(o=>Math.abs(q.x-o.x)>o.w/2+.6||Math.abs(q.z-o.z)>o.d/2+.6)){point=q;break;}}
 if(!point)throw new Error('No accessible point for source '+id);player.body.position.set(point.x,player.cy+.05,point.z);player.body.velocity.set(0,0,0);player.body.aabbNeedsUpdate=true;cameraTarget.set(point.x,0,point.z-1.8);aimPoint.copy(p);return{point,source:{id,infinite:s.infinite}};},
 wood(kind){this.halt();releaseHeld(false);const s=worldMap.torches.find(s=>s.infinite);fireSpell.charged=true;fireSpell.torch=s;fireSpell.takenAt=runTime-1;fireSpell.readyAt=runTime;player.body.position.set(0,player.cy+.08,18);player.body.velocity.set(0,0,0);cameraTarget.set(0,0,16.2);const e=prop(kind,0,16.8);return e.body.id;},
 heat(){this.halt();fireSpell.charged=false;const s=worldMap.torches.find(s=>s.infinite);const e=prop('barrel',s.position.x,s.position.z,{y:s.position.y});return e.body.id;},
 contact(){this.halt();const a=prop('crate',1,18,{y:.5}),b=prop('barrel',1.9,18,{y:.65});igniteWithSpell(a);return b.body.id;},
 beam(){this.halt();const wood=worldMap.woodenSurfaces[0];fireSpell.charged=true;fireSpell.torch=worldMap.torches[0];fireSpell.takenAt=runTime-1;fireSpell.readyAt=runTime;player.body.position.set(0,player.cy+.08,wood.position.z-1.4);player.body.velocity.set(0,0,0);cameraTarget.set(0,0,wood.position.z-3);return{x:wood.position.x,y:wood.position.y,z:wood.position.z};},
 age(seconds){runTime+=seconds;updateFire();syncVisuals(0);return window.__MAGIC__.inspect();},
 boss(type){this.halt();releaseHeld(false);const b=entities.find(e=>e.bossType===type),p=b.body.position;b.body.velocity.set(0,0,0);b.stun=100;b.bossAttack=null;const gap=[3.5,3,2.8].find(g=>nav.isFree(p.x,p.z+g))||3.5;player.body.position.set(p.x,player.cy+.08,p.z+gap);player.body.velocity.set(0,0,0);cameraTarget.set(p.x,0,p.z+gap-1.8);fireSpell.charged=true;fireSpell.torch=worldMap.torches[0];fireSpell.takenAt=runTime-1;fireSpell.readyAt=runTime;const e=prop('crate',p.x,p.z+gap-1.3);return{boss:b.body.id,crate:e.body.id};},
 damage(type){const b=entities.find(e=>e.bossType===type);b.bossAttack=BOSS_DEFINITIONS[type].attacks[0];b.bossTime=.4;b.attackCooldown=0;hurt(b,2,null,true);return{active:!!b.bossAttack,time:b.bossTime};},
 allBurn(){this.halt();for(const e of entities)if(e.flammable||e.category==='actor'&&!e.isPlayer){e.burnUntil=runTime+45;e.burnLastTime=runTime;e.nextBurnTick=runTime+.5;}for(const w of worldMap.woodenSurfaces){w.burnUntil=runTime+45;w.burnLastTime=runTime;}},
};`;
await build({configFile:path.join(source,'vite.config.js'),root:source,logLevel:'error',plugins:[{name:'private-fire-fixture',transform(code,id){if(id===path.join(source,'src/main.js').replaceAll('\\','/'))return code+diagnostic;}}],build:{outDir:fixture,emptyOutDir:true}});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
const report={date:new Date().toISOString(),fixture:'Private compiled setup; actual native keyboard/mouse fire/grab/release. Position/time fixtures are explicit, not an unaided playthrough.',checks:[],errors:[]};
const check=(name,passed,detail)=>{report.checks.push({name,passed:!!passed,detail});assert.ok(passed,name);};
const inspect=page=>page.evaluate(()=>window.__MAGIC__.inspect()),project=(page,p)=>page.evaluate(p=>window.__MAGIC__.project(p),p);
let context;
try{
 context=await managed.browser.newContext({viewport:{width:1440,height:900},serviceWorkers:'block',recordVideo:{dir:path.join(output,'motion'),size:{width:1440,height:900}}});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 await page.route('http://127.0.0.1:5173/**',async route=>{
  const rel=new URL(route.request().url()).pathname.replace('/.cache/fire-materials/','')||'index.html';if(rel.includes('..'))throw new Error('Invalid fixture path');
  const mime=rel.endsWith('.js')?'application/javascript':rel.endsWith('.css')?'text/css':rel.endsWith('.html')?'text/html':rel.endsWith('.glb')?'model/gltf-binary':undefined;
  await route.fulfill({path:path.join(fixture,rel),contentType:mime});
 });
 await page.goto('http://127.0.0.1:5173/.cache/fire-materials/index.html?benchmarkFire=1');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
 const restart=async()=>{await page.keyboard.press('Escape');await page.locator('#pause-restart').click();await page.evaluate(()=>window.__FIRE_QA__.halt());};
 for(let id=0;id<17;id++){
  const setup=await page.evaluate(id=>window.__FIRE_QA__.source(id),id);await page.waitForTimeout(80);await page.keyboard.press('c');
  await page.waitForFunction(id=>window.__MAGIC__.snapshot().fire.source===id&&window.__MAGIC__.snapshot().fire.charged,id);
  const s=(await inspect(page)).sources[id];check('source '+id+' accessible',s.lit===s.infinite,setup);
  if(s.infinite){await page.keyboard.press('c');check('pylon '+id+' remains infinite',(await inspect(page)).sources[id].lit);await page.screenshot({path:path.join(output,'pylon-'+id+'.png')});}
 }
 for(const kind of ['crate','barrel','door','shield','stone','urn']){
  await restart();const id=await page.evaluate(kind=>window.__FIRE_QA__.wood(kind),kind);await page.waitForTimeout(80);let e=(await inspect(page)).entities.find(e=>e.id===id),p=await project(page,e);
  await page.mouse.move(p.x,p.y);await page.mouse.down();await page.waitForFunction(()=>!!window.__MAGIC__.snapshot().holding);await page.waitForTimeout(100);
  e=(await inspect(page)).entities.find(e=>e.id===id);const wood=['crate','barrel','door','shield'].includes(kind);check(kind+' material ignition',wood?e.burnRemaining>43:e.burnRemaining===0,e);
  check(kind+' keeps carried flame',await page.evaluate(()=>window.__MAGIC__.snapshot().fire.charged));
  if(wood)await page.screenshot({path:path.join(output,kind+'-burning.png')});await page.keyboard.press('q');await page.mouse.up();
  if(wood){await page.evaluate(()=>window.__FIRE_QA__.age(46));const after=(await inspect(page)).entities.find(e=>e.id===id);check(kind+' fuel consumed',!after||after.woodFuel<1e-8,after);}
 }
 await restart();let id=await page.evaluate(()=>window.__FIRE_QA__.wood('barrel'));await page.waitForTimeout(80);let e=(await inspect(page)).entities.find(e=>e.id===id),p=await project(page,e);await page.mouse.move(p.x,p.y);await page.keyboard.press('c');await page.waitForFunction(id=>window.__MAGIC__.inspect().entities.find(e=>e.id===id)?.burnRemaining>0,id);check('C ignites aimed wood without grabbing',!(await page.evaluate(()=>window.__MAGIC__.snapshot().holding)));
 await page.keyboard.press('Escape');const frozen=(await inspect(page)).entities.find(e=>e.id===id).burnRemaining;await page.waitForTimeout(500);check('pause freezes long wood burn',(await inspect(page)).entities.find(e=>e.id===id).burnRemaining===frozen);await page.locator('#resume-button').click();
 await page.evaluate(()=>window.__FIRE_QA__.age(20));check('fire lasts beyond old eight-second limit',(await inspect(page)).entities.find(e=>e.id===id).burnRemaining>20);check('carried fire survives elapsed time',await page.evaluate(()=>window.__MAGIC__.snapshot().fire.charged));
 await restart();id=await page.evaluate(()=>window.__FIRE_QA__.heat());await page.waitForFunction(id=>window.__MAGIC__.inspect().entities.find(e=>e.id===id)?.burnRemaining>0,id);check('pylon flame directly ignites touching wood',true);
 await restart();await page.evaluate(()=>window.__FIRE_QA__.wood('stone'));id=await page.evaluate(()=>window.__FIRE_QA__.contact());await page.waitForFunction(id=>window.__MAGIC__.inspect().entities.find(e=>e.id===id)?.burnRemaining>0,id);check('wood contact spreads fire',true);
 await restart();const beam=await page.evaluate(()=>window.__FIRE_QA__.beam());await page.waitForTimeout(150);p=await project(page,beam);await page.mouse.move(p.x,p.y);await page.keyboard.press('c');await page.waitForFunction(()=>window.__MAGIC__.inspect().wood[0].burnRemaining>0);check('C ignites actual static wood material',true);await page.screenshot({path:path.join(output,'bridge-wood-burning.png')});
 for(const type of ['colossus','gargoyle','wraith']){
  await restart();const ids=await page.evaluate(type=>window.__FIRE_QA__.boss(type),type);await page.waitForTimeout(120);e=(await inspect(page)).entities.find(e=>e.id===ids.crate);p=await project(page,e);await page.mouse.move(p.x,p.y);await page.mouse.down();await page.waitForFunction(()=>window.__MAGIC__.snapshot().holding==='Κιβώτιο');await page.keyboard.down('Shift');
  for(let n=0;n<10;n++){const b=(await inspect(page)).entities.find(e=>e.id===ids.boss);p=await project(page,{...b,y:.8});await page.mouse.move(p.x,p.y);await page.waitForTimeout(90);if((await inspect(page)).preview?.side?.bodyId===ids.boss)break;}
  check(type+' worker predicts contact',(await inspect(page)).preview?.side?.bodyId===ids.boss);await page.mouse.up();await page.keyboard.up('Shift');
  await page.waitForFunction(id=>window.__MAGIC__.inspect().entities.find(e=>e.id===id)?.burnRemaining>0,ids.boss);e=(await inspect(page)).entities.find(e=>e.id===ids.boss);const hp=e.hp;await page.waitForTimeout(620);const burning=(await inspect(page)).entities.find(e=>e.id===ids.boss);check(type+' takes fire tick damage',burning.hp<hp,{before:hp,after:burning.hp});await page.screenshot({path:path.join(output,type+'-burning.png')});
  const attack=await page.evaluate(type=>window.__FIRE_QA__.damage(type),type);check(type+' burn damage preserves attack',attack.active&&attack.time===.4,attack);
 }
 check('three distinct bosses retained',new Set((await inspect(page)).entities.filter(e=>e.bossType).map(e=>e.bossType)).size===3);
 await restart();await page.evaluate(()=>window.__FIRE_QA__.allBurn());await page.waitForTimeout(200);const stress=await inspect(page);check('all simultaneous flames fit fixed pool',stress.fireFX.flamePlanes>200&&stress.fireFX.flamePlanes<stress.fireFX.capacity,stress.fireFX);await page.screenshot({path:path.join(output,'simultaneous-fire.png')});
 const blocks=[];for(const enabled of [false,true,true,false]){await page.evaluate(v=>window.__FIRE_BENCHMARK__(v),enabled);await page.waitForTimeout(120);blocks.push(await page.evaluate(async enabled=>{const frames=[];await new Promise(resolve=>{let last;function tick(t){if(last!==undefined)frames.push(t-last);last=t;if(frames.length<120)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});const sorted=[...frames].sort((a,b)=>a-b);return{enabled,fps:120000/frames.reduce((a,b)=>a+b),p95:sorted[114],max:sorted.at(-1),over50:frames.filter(x=>x>50).length,render:window.__MAGIC__.inspect().render};},enabled));}report.performance=blocks;
 check('no browser errors',report.errors.length===0,report.errors);
}catch(error){report.failure=error.stack;process.exitCode=1;const p=context?.pages()[0];if(p){await p.screenshot({path:path.join(output,'failure.png')});report.failureState=await inspect(p);}}
finally{await context?.close();await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({checks:report.checks.length,passed:report.checks.filter(c=>c.passed).length,failure:report.failure,performance:report.performance,errors:report.errors,cleanup:report.cleanup},null,2));}
