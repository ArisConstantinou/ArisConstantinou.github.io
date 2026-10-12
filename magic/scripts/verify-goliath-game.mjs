import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve(process.env.MAGIC_QA_OUTPUT||'output/expansion');await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),checks:[],errors:[],performance:[]};
const check=(name,passed,detail)=>{report.checks.push({name,passed,detail});if(!passed)throw new Error(name+': '+JSON.stringify(detail));};
const extra=`
window.__EXP_TEST__={
 draw:()=>{renderer.info.reset();return quality==='high'?composer.render():renderer.render(scene,camera);},
 state:()=>window.__MAGIC__.snapshot(),
 prepare:(n=7)=>{startRun();for(const e of entities)if(e.category==='actor'&&!e.isPlayer)e.stun=1e5;player.mana=100;
   for(let i=0;i<n;i++){const a=i*Math.PI*2/n;prop('stone',Math.sin(a)*2.6,18+Math.cos(a)*2.6,{y:.4,mass:2,ephemeral:true});}syncVisuals(0);updateCamera(1);updateHUD();},
 mana:()=>player.mana=player.maxMana,
 geometry:()=>({stones:activeStones(entities).map(e=>({id:e.body.id,mesh:e.assemblyRestore?assemblyCreature.parts.get(e.assemblyRestore.part).mesh.uuid:e.mesh.children[0]?.uuid})),
   parts:assemblyCreature?[...assemblyCreature.parts].map(([name,p])=>({name,id:p.mesh.uuid,position:p.root.position.toArray()})):[],
   playerStats:{hp:player.maxHp,mana:player.maxMana,speed:player.speed},
   routes:rooms.map(r=>({id:r.id,path:nav.path(worldMap.spawn,{x:r.x+r.w/2,z:r.z+r.d/2}).length,allyPath:goliathNav.path(worldMap.spawn,{x:r.x+r.w/2,z:r.z+r.d/2}).length})),
   doors:worldMap.doorways.map(d=>({rooms:d.rooms,free:nav.isFree(d.x,d.z),allyFree:goliathNav.isFree(d.x,d.z)})),
   navDiagnostic:{goalFree:goliathNav.isFree(23,-1),goalIndex:goliathNav.nearest(23,-1),goalPoint:goliathNav.point(goliathNav.nearest(23,-1)),obstacles:nav.obstacles.filter(b=>b.x>9&&b.x<35&&b.z>-9&&b.z<7),floors:worldMap.floors.filter(b=>b.x>9&&b.x<35&&b.z>-9&&b.z<7)},
   bodies:physics.bodies.length,resources:{...renderer.info.memory}}),
 move:(x,z)=>{player.body.position.set(x,player.cy+.05,z);player.body.velocity.set(0,0,0);cameraTarget.set(x,0,z-1.8);updateCamera(1);syncVisuals(0);updateHUD();},
 project:p=>{camera.updateMatrixWorld();const v=new THREE.Vector3(p.x,p.y||.8,p.z).project(camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};},
 melee:()=>{const p=goliath.body.position,e=actor('guard',p.x,p.z+.9);e.victim=goliath;const hp=player.hp,before=goliath.hp;enemyAttack(e);return{before,after:goliath.hp,playerBefore:hp,playerAfter:player.hp,target:bodyguardTarget(e,player,goliath,visibleLine).kind};},
 arrow:()=>{const p=goliath.body.position;player.body.position.set(p.x,player.cy+.05,p.z+4);const e=actor('archer',p.x,p.z-4);e.victim=player;const before=goliath.hp,hp=player.hp;fireArrow(e,player);for(let i=0;i<80;i++)updateArrows(1/120);return{before,after:goliath.hp,playerBefore:hp,playerAfter:player.hp};},
 boss:(index=0)=>{const e=bosses[index],p=e.body.position,choices=[];for(const radius of [3,2,4,5])for(let i=0;i<16;i++)choices.push({x:p.x+Math.cos(i*Math.PI/8)*radius,z:p.z+Math.sin(i*Math.PI/8)*radius});const at=choices.find(q=>nav.isFree(q.x,q.z)&&visibleLine(p,q,.12)&&(!e.bossType||insideBossRoom(q,e.room,.5)));if(!at)throw new Error('No clear channel fixture '+index);player.body.position.set(at.x,player.cy+.05,at.z);e.stun=0;e.aggro=true;e.channelCooldown=0;e.attackCooldown=100;e.guardBreak=0;e.bossAttack=null;e.windup=0;return e.label;},
 channelStep:(index=0,seconds=1)=>{const e=bosses[index];for(let i=0;i<Math.ceil(seconds*60);i++)updateEnemy(e,1/60);syncVisuals(0);updateCamera(1);updateHUD();return{channel:e.channel,minions:[...e.minions].filter(m=>!m.dead&&!m.removed).length,types:[...e.minions].filter(m=>!m.dead&&!m.removed).map(m=>m.kind),kind:e.kind,live:livingEnemies()};},
 fillHostiles:count=>{while(livingEnemies()<count){const e=actor('guard',-28,12);e.stun=1e5;}return livingEnemies();},
 interrupt:(index=0)=>{hurt(bosses[index],1,player.body.position);return{channel:bosses[index].channel,minions:bosses[index].minions.size,cooldown:bosses[index].channelCooldown};},
 expire:()=>{goliath.expires=runTime+.05;},
 follow:()=>{const history=[];aimDirection.set(-1,0,0);for(const [x,z]of [[-7,16.5],[-13,16.5],[-19,16.5],[-25,16.5]]){
   player.body.position.set(x,player.cy+.05,z);player.body.velocity.set(0,0,0);
   for(let i=0;i<240;i++){runTime+=1/60;updateGoliath(goliath,1/60);physics.step(1/120,1/60,6);}
   history.push({player:[x,z],position:goliath.body.position.toArray(),velocity:goliath.body.velocity.toArray(),dead:goliath.dead,hp:goliath.hp,remaining:goliath.expires-runTime,path:goliath.path,strike:goliath.strikeTime,target:goliath.strikeTarget?.kind,contacts:physics.contacts.filter(c=>c.bi===goliath.body||c.bj===goliath.body).map(c=>{const b=c.bi===goliath.body?c.bj:c.bi;return{kind:b.entity?.kind,position:b.position.toArray()};})});
 }syncVisuals(0);updateCamera(1);updateHUD();return {x:goliath.body.position.x,z:goliath.body.position.z,y:goliath.body.position.y,playerX:player.body.position.x,history,navFixture:{from:{x:goliath.body.position.x,z:goliath.body.position.z},to:{x:player.body.position.x-2.2,z:player.body.position.z},floors:goliathNav.floors,obstacles:goliathNav.obstacles,radius:goliathNav.radius,cell:goliathNav.cell,props:entities.filter(e=>e.category==='prop'&&!e.removed&&!e.reserved).map(e=>{e.body.updateAABB();return {kind:e.kind,position:e.body.position.toArray(),aabb:{lowerBound:e.body.aabb.lowerBound,upperBound:e.body.aabb.upperBound}};})}};},
 killAlly:()=>hurt(goliath,goliath.hp,player.body.position),
 pulse:()=>{player.mana=100;pulse();},
 mission:()=>{for(const b of bosses)hurt(b,b.hp,player.body.position);player.body.position.set(worldMap.relic.position.x,player.cy,worldMap.relic.position.z);interact();player.body.position.set(worldMap.exit.position.x,player.cy,worldMap.exit.position.z);interact();return window.__MAGIC__.snapshot();},
 stageRoom:id=>{const r=rooms.find(r=>r.id===id);player.body.position.set(r.x+r.w/2,player.cy,r.z+r.d/2);cameraTarget.set(player.body.position.x,0,player.body.position.z-1.8);updateCamera(1);syncVisuals(0);updateHUD();},
 resumeClock:()=>controlledUntil=0
};`;
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844],['mobile-landscape',844,390]].filter(v=>!process.env.MAGIC_QA_DEVICE||v[0]===process.env.MAGIC_QA_DEVICE)){
  const touch=mode!=='desktop',context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
  if(process.env.MAGIC_TEST_SEED)await context.addInitScript(seed=>{Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;},Number(process.env.MAGIC_TEST_SEED));
  await context.route('**/src/main.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+extra});});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  await page.goto(process.env.MAGIC_TEST_URL||'http://127.0.0.1:5173/.cache/goliath-game/');await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu',null,{timeout:30000});
  await page.locator('#start-button').click();
  const state=()=>page.evaluate(()=>window.__EXP_TEST__.state());
  const advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
  const prepare=n=>page.evaluate(n=>window.__EXP_TEST__.prepare(n),n);
  const cdp=touch?await context.newCDPSession(page):null;
  let point;
  const down=async()=>{if(touch){const rect=await page.locator('.touch-actions [data-action="conjure"]').boundingBox();point={x:rect.x+rect.width/2,y:rect.y+rect.height/2,id:1};await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});}else await page.keyboard.down('r');};
  const up=async()=>{if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else await page.keyboard.up('r');};
  let s=await state();check(mode+' initial 64 enemies and 4 bosses',s.enemies.filter(e=>e.kind!=='boss').length===64&&s.enemies.filter(e=>e.kind==='boss').length===4,s.enemies.length);
  if(!touch){
   const geometry=await page.evaluate(()=>window.__EXP_TEST__.geometry());
   check('all rooms reachable on actual collision/nav map',geometry.routes.every(r=>r.path>0),geometry.routes);
   check('Goliath navigation fits every room and doorway',geometry.routes.every(r=>r.allyPath>0)&&geometry.doors.every(d=>d.allyFree),geometry);
   check('wizard original stats preserved',JSON.stringify(geometry.playerStats)===JSON.stringify({hp:120,mana:100,speed:5}),geometry.playerStats);
   await page.evaluate(()=>window.__EXP_TEST__.draw());await page.screenshot({path:path.join(output,'after-opening.png')});
  }
  await prepare(0);
  for(let i=0;i<11;i++){await page.evaluate(()=>window.__EXP_TEST__.mana());await down();await up();}
  s=await state();check(mode+' cap 10 with repeated inputs',s.stones.length===10,s.stones.length);
  await prepare(7);await down();await advance(800);
  if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
  else{await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await up();}
  s=await state();check(mode+' touch-cancel / blur handler restores reserved stones',s.ritual.phase==='idle'&&s.stones.length===7&&!s.stones.some(e=>e.reserved),s.ritual);
  if(s.phase==='paused')await page.locator('#resume-button').click();
  if(!touch){await prepare(0);await page.keyboard.down('r');await page.keyboard.down('r');await advance(300);await up();check('keyboard repeat does not conjure extra stones',(await state()).stones.length===1);}
  await prepare(6);await down();await advance(2300);s=await state();check(mode+' hold that conjures seventh stone starts assembly',s.stones.length===7&&s.ritual.phase==='assemble'&&!s.goliath,s.ritual);
  await page.keyboard.press('Escape');await up();s=await state();check(mode+' cancel seventh-stone hold restores seven without extra conjure',s.stones.length===7&&s.ritual.phase==='idle'&&!s.stones.some(e=>e.reserved),s.ritual);
  await page.locator('#resume-button').click();
  await prepare(7);const ids=(await state()).stones.map(e=>e.mesh).sort();
  await down();await advance(1100);s=await state();check(mode+' R/stone begins charge',s.ritual.phase==='charge'&&s.stones.length===7,s.ritual);
  await page.keyboard.press('Escape');await up();s=await state();check(mode+' pause cancels with all stones restored',s.ritual.phase==='idle'&&s.stones.length===7&&!s.stones.some(e=>e.reserved),s.ritual);
  await page.locator('#resume-button').click();
  await down();await advance(2350);s=await state();check(mode+' sequential assembly starts',s.ritual.phase==='assemble'&&s.stones.length===7,s.ritual);
  const assembly=await page.evaluate(()=>window.__EXP_TEST__.geometry());
  check(mode+' seven original mesh identities transferred',JSON.stringify(assembly.parts.map(e=>e.id).sort())===JSON.stringify(ids),assembly.parts);
  await advance(1700);await page.evaluate(()=>window.__EXP_TEST__.draw());await page.screenshot({path:path.join(output,mode+'-assembly.png')});
  s=await state();check(mode+' intermediate stones assemble one at a time',s.ritual.locked.length>0&&s.ritual.locked.length<7,s.ritual);
  if(!touch){await page.keyboard.press('Escape');await up();s=await state();check('assembly cancel restores geometry and identities',s.stones.length===7&&JSON.stringify(s.stones.map(e=>e.mesh).sort())===JSON.stringify(ids),s.stones);await page.locator('#resume-button').click();await down();await advance(2350);}
  await up();await advance(6400);s=await state();check(mode+' exactly 7 consumed and one Goliath activated',s.stones.length===0&&s.goliath?.hp===420&&s.ritual.phase==='idle',s);
  await page.evaluate(()=>window.__EXP_TEST__.draw());await page.screenshot({path:path.join(output,mode+'-goliath.png')});
  const melee=await page.evaluate(()=>window.__EXP_TEST__.melee());check(mode+' real melee damage hits bodyguard',melee.after<melee.before&&melee.playerAfter===melee.playerBefore&&melee.target==='goliath',melee);
  const arrow=await page.evaluate(()=>window.__EXP_TEST__.arrow());check(mode+' bodyguard intercepts player-bound arrow',arrow.after<arrow.before&&arrow.playerAfter===arrow.playerBefore,arrow);
  const beforePulse=(await state()).goliath.hp;await page.evaluate(()=>window.__EXP_TEST__.pulse());check(mode+' player pulse does not damage ally',(await state()).goliath.hp===beforePulse);
  if(!touch){const followed=await page.evaluate(()=>window.__EXP_TEST__.follow());check('physical Goliath follows through connected gatehouse doorway',followed.x<-20&&followed.y>1.3&&followed.y<1.9,followed);}
  await page.evaluate(()=>window.__EXP_TEST__.expire());await advance(1500);check(mode+' lifetime expires and cleans actor',!(await state()).goliath);
  await prepare(8);await down();await advance(2350);await up();await advance(6400);s=await state();check(mode+' eight stones consume seven and leave one',s.stones.length===1&&!!s.goliath,s.stones.length);
  await page.evaluate(()=>window.__EXP_TEST__.killAlly());await advance(1500);check(mode+' destroyed ally cleans up',!(await state()).goliath);
  await prepare(0);
  for(let i=0;i<4;i++){
   await page.evaluate(i=>window.__EXP_TEST__.boss(i),i);
   const channel=await page.evaluate(i=>window.__EXP_TEST__.channelStep(i,1),i);check(mode+' boss '+i+' visible channel before spawn',channel.channel>0&&channel.minions===0,channel);
   await page.evaluate(()=>window.__EXP_TEST__.draw());await page.screenshot({path:path.join(output,mode+'-boss-'+i+'-channel.png')});
   const interrupted=await page.evaluate(i=>window.__EXP_TEST__.interrupt(i),i);check(mode+' boss '+i+' damage interrupts channel',interrupted.channel===0&&interrupted.minions===0&&interrupted.cooldown===4,interrupted);
   await page.evaluate(i=>window.__EXP_TEST__.boss(i),i);
   const completed=await page.evaluate(i=>window.__EXP_TEST__.channelStep(i,3.2),i);check(mode+' boss '+i+' completes 3-minion channel',completed.minions===3&&completed.kind==='boss',completed);
   check(mode+' boss '+i+' summons existing character types',JSON.stringify(completed.types)===JSON.stringify(['guard','archer','heavy']),completed.types);
   await page.evaluate(i=>window.__EXP_TEST__.boss(i),i);const second=await page.evaluate(i=>window.__EXP_TEST__.channelStep(i,3.2),i);
   check(mode+' boss '+i+' reaches six-minion cap',second.minions===6,second);
   await page.evaluate(i=>window.__EXP_TEST__.boss(i),i);const capped=await page.evaluate(i=>window.__EXP_TEST__.channelStep(i,4),i);
   check(mode+' boss '+i+' cannot exceed six minions',capped.minions===6&&capped.channel===0,capped);
  }
  if(!touch){for(const id of ['gatehouse','armoury','library','forge','prison','catacombs','sanctum','ritual','watchtower','gallery','barracks']){await page.evaluate(id=>window.__EXP_TEST__.stageRoom(id),id);await page.evaluate(()=>window.__EXP_TEST__.draw());await page.screenshot({path:path.join(output,'room-'+id+'.png')});}}
  if(!touch){
   await prepare(0);await page.evaluate(()=>window.__EXP_TEST__.fillHostiles(95));await page.evaluate(()=>window.__EXP_TEST__.boss(0));
   const lastSlot=await page.evaluate(()=>window.__EXP_TEST__.channelStep(0,3.2));check('boss channel fills only last global enemy slot',lastSlot.minions===1&&lastSlot.live===96,lastSlot);
   await page.evaluate(()=>window.__EXP_TEST__.boss(0));const full=await page.evaluate(()=>window.__EXP_TEST__.channelStep(0,4));check('boss cannot channel beyond 96 total enemies',full.live===96&&full.minions===1&&full.channel===0,full);
  }
  const mission=await page.evaluate(()=>window.__EXP_TEST__.mission());check(mode+' original relic and extraction mission works',mission.relicTaken&&mission.phase==='result',mission.phase);
  check(mode+' candidate save uses isolated namespace',await page.evaluate(()=>localStorage.getItem('magic-exiled-v1')===null&&JSON.parse(localStorage.getItem('magic-integrated-preview-v1')).runs===1));
  await context.close();
 }
}catch(e){report.errors.push(e.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'game-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({checks:report.checks.length,failed:report.checks.filter(c=>!c.passed),errors:report.errors,cleanup:report.cleanup},null,2));if(report.errors.length)process.exitCode=1;}
