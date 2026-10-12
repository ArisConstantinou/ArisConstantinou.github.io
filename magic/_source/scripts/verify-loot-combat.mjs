import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const output=path.resolve(process.env.MAGIC_QA_OUTPUT||'output/loot-combat/integration');await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),url:process.env.MAGIC_TEST_URL||'http://127.0.0.1:5173/.cache/loot-game/',cases:[],errors:[],screenshots:[],performance:[]};
const compiled=process.argv.includes('--compiled');
const check=(name,pass,data={})=>{report.cases.push({name,pass:!!pass,...data});if(!pass)console.log('FAIL '+name+' '+JSON.stringify(data));};
const extra=`
window.__QA__={
 state:()=>({ ...window.__MAGIC__.snapshot(),maxHp:player.maxHp,maxMana:player.maxMana,potions:potionCounts(),position:player.body.position.toArray(),
 marker:{visible:targetRing.visible,position:targetRing.position.toArray(),line:trajectory.visible,side:sideTrajectory.visible,impact:impactMarker.visible},
 preview:throwPreview,velocity:held?currentThrowVelocity():null,feet:goliath?.gait?{support:goliath.gait.support,positions:['Left leg','Right leg'].map(n=>goliath.creature.parts.get(n).root.localToWorld(new THREE.Vector3(0,-1.32,0)).toArray())}:null,
 memory:renderer.info.memory,gpu:renderer.getContext().getParameter(renderer.getContext().getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL),quality}),
 reset:()=>{startRun();for(const e of [...entities])if(!e.isPlayer)removeEntity(e);player.invulnerable=1e5;syncVisuals(0);updateCamera(1);},
 seed:()=>{save.profile.loot=fresh();for(let l=1;l<=5;l++)for(const kind of ['staff','robe','amulet','ring'])save.acquire({kind,level:l,roll:l%3});for(let l=1;l<=2;l++)for(const kind of ['health','mana'])save.acquire({kind,level:l});applyEquipment();},
 vital:(hp,mana)=>{player.hp=hp;player.mana=mana;updateHUD();},
 fullBars:()=>{save.acquire({kind:'health',level:1});save.acquire({kind:'mana',level:1});player.hp=player.maxHp;player.mana=player.maxMana;updateHUD();},
 dropCycle:()=>{window.__QA__.reset();hearth.engine.body.position.set(0,1.24,10);hearth.engine.body.velocity.set(0,0,0);hearth.sync(0);for(let i=0;i<20;i++){const item={kind:['staff','robe','amulet','ring','health','mana'][i%6],level:i%5+1};const mesh=createLootVisual(item);mesh.position.set(-8+i%8*2,0,11-Math.floor(i/8)*2);scene.add(mesh);lootDrops.push({item,mesh,age:0,nextHint:0});}},
 kill:(kind='guard',x=3,z=18)=>{const e=actor(kind,x,z);hurt(e,1e5,player.body.position);syncVisuals(0);return window.__QA__.state();},
 at:(x,z)=>{player.body.position.set(x,player.cy+.04,z);player.body.velocity.set(0,0,0);syncVisuals(0);updateCamera(1);},
 fill:()=>{save.profile.loot=fresh();for(let i=0;i<24;i++)save.acquire({kind:'staff',level:1,roll:i%3});applyEquipment();},
 die:()=>{player.invulnerable=0;hurt(player,1e5,player.body.position);},
 ritual:()=>{window.__QA__.reset();for(let i=0;i<7;i++){const a=i*Math.PI*2/7;prop('stone',Math.sin(a)*2.6,18+Math.cos(a)*2.6,{y:.4,mass:2,ephemeral:true});}syncVisuals(0);updateHUD();},
 enemy:mode=>{for(const e of [...entities])if(!e.isPlayer&&!e.ally)removeEntity(e);const p=goliath.body.position;const e=actor(mode==='boss'?'boss':'heavy',p.x,p.z-1.85);e.stun=1e5;e.aggro=true;e.hp=e.maxHp=500;e.channel=mode==='boss'?1:0;window.__QA__.victim=e;goliath.yaw=Math.PI;goliath.strikeCooldown=0;return{id:e.body.id,hp:e.hp};},
 enemyState:()=>({hp:window.__QA__.victim.hp,channel:window.__QA__.victim.channel,attack:goliath.strikeTime,position:window.__QA__.victim.body.position.toArray()}),
 away:()=>{window.__QA__.victim.body.position.set(0,window.__QA__.victim.cy+.04,6);window.__QA__.victim.body.velocity.set(0,0,0);},
 faceAway:()=>{window.__QA__.enemy('boss');goliath.yaw=0;},
 finishAlly:()=>{goliath.expires=runTime;},
 throwSetup:kind=>{window.__QA__.reset();const enemy=actor('guard',4,14);enemy.stun=1e5;const item=kind==='guard'?actor('guard',0,16.4):prop(kind,0,16.4,{y:1.15,mass:kind==='crate'?5:2,ephemeral:kind==='stone'});item.stun=1e5;item.guardBreak=20;window.__QA__.victim=enemy;window.__QA__.projectile=item;window.__QA__.hits=[];item.body.addEventListener('collide',event=>{if(item.thrownBy==='player')window.__QA__.hits.push({kind:event.body.entity?.kind||'world',position:item.body.position.toArray()});});syncVisuals(0);updateCamera(1);return{item:item.body.position.toArray(),enemy:enemy.body.position.toArray()};},
 throwState:()=>({...window.__QA__.state(),victimHp:window.__QA__.victim.hp,item:window.__QA__.projectile.body.position.toArray(),enemy:window.__QA__.victim.body.position.toArray(),hits:window.__QA__.hits}),
 project:p=>{camera.updateMatrixWorld();const v=new THREE.Vector3(...p).project(camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};}
};function fresh(){return{version:1,items:[],equipped:{},nextId:1};}`;
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
let context,video;
try{
 for(const device of [{name:'desktop',w:1440,h:900,touch:false},{name:'portrait',w:390,h:844,touch:true},{name:'landscape',w:844,h:390,touch:true}].filter(d=>!process.env.MAGIC_QA_DEVICE||d.name===process.env.MAGIC_QA_DEVICE)){
  context=await managed.browser.newContext({viewport:{width:device.w,height:device.h},hasTouch:device.touch,isMobile:device.touch,deviceScaleFactor:1,serviceWorkers:'block',...(device.name==='desktop'?{recordVideo:{dir:path.join(output,'video'),size:{width:1440,height:900}}}:{})});
  await context.addInitScript(()=>{let seed=7431;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;});
  if(compiled)await context.addInitScript(()=>{const items=[];let id=1;for(let level=1;level<=5;level++)for(const kind of ['staff','robe','amulet','ring'])items.push({id:id++,kind,level,roll:level%3,count:1});for(let level=1;level<=2;level++)for(const kind of ['health','mana'])items.push({id:id++,kind,level,roll:0,count:2});const legacy=JSON.stringify({version:1,shards:35,runs:12,wins:2,best:16,upgrades:{grip:1,focus:3},loot:{version:1,items,equipped:{},nextId:id}});if(!localStorage.getItem('magic-integrated-preview-v1'))localStorage.setItem('magic-integrated-preview-v1',legacy);window.__OLD_SAVE__=legacy;});
  if(!compiled)await context.route('**/src/main.js*',async route=>{const r=await route.fetch();await route.fulfill({response:r,body:(await r.text())+extra});});
  const page=await context.newPage();if(device.name==='desktop')video=page.video();page.on('pageerror',e=>report.errors.push(device.name+': '+e.message));
  const shot=async name=>{const file=path.join(output,device.name+'-'+name+'.png');await page.screenshot({path:file});report.screenshots.push(file);};
  const state=()=>page.evaluate(()=>window.__QA__?window.__QA__.state():window.__MAGIC__.snapshot());
  const advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
  await page.goto(report.url);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
  if(!compiled){await page.evaluate(()=>{window.__QA__.reset();window.__QA__.seed();window.__QA__.vital(50,10);});}
  if(device.touch)await page.locator('#hud-inventory').tap();else await page.keyboard.press('i');
  check(device.name+' inventory opens',(await state()).phase==='inventory');check(device.name+' inventory hides movement controls',!await page.locator('.touch-controls').isVisible());await page.waitForTimeout(300);await shot('inventory');
  const layout=await page.evaluate(()=>{const panel=document.getElementById('modal-panel'),r=panel.getBoundingClientRect();return{windowWidth:innerWidth,documentWidth:document.documentElement.scrollWidth,panelWidth:r.width,panelHeight:r.height,scrollHeight:panel.scrollHeight,clientHeight:panel.clientHeight,minSlot:Math.min(...[...document.querySelectorAll('.inventory-grid .loot-slot')].map(n=>n.getBoundingClientRect().width)),rarities:[...new Set([...document.querySelectorAll('.inventory-grid [style]')].map(n=>n.style.getPropertyValue('--tier')))]};});
  check(device.name+' inventory fits',layout.documentWidth<=device.w+1&&layout.panelWidth<=device.w&&layout.minSlot>=44,{layout});
  if(!compiled){
   let before=await state();await page.keyboard.down('w');await page.keyboard.press('f');await advance(400);await page.keyboard.up('w');let after=await state();check(device.name+' inventory pauses actions',before.time===after.time&&before.mana===after.mana);
   const staff=before.inventory.items.find(i=>i.kind==='staff'&&i.level===3);await page.locator('.inventory-grid [data-item="'+staff.id+'"]').click();await page.locator('[data-loot-action="equip"]').click();after=await state();check(device.name+' equip affects damage',after.gear.damage>before.gear.damage&&after.inventory.equipped.staff===staff.id&&after.hp===before.hp);
   const equipped=after.gear.damage;await page.locator('[data-loot-action="unequip"]').click();await page.locator('[data-loot-action="equip"]').click();check(device.name+' re-equip never stacks',(await state()).gear.damage===equipped);
   check(device.name+' worn item cannot be salvaged',await page.locator('[data-loot-action="salvage"]').isDisabled());
   const potion=before.inventory.items.find(i=>i.kind==='health');await page.locator('.inventory-grid [data-item="'+potion.id+'"]').click();await page.locator('[data-loot-action="use"]').click();after=await state();check(device.name+' potion heals and consumes',after.hp>before.hp&&!after.inventory.items.some(i=>i.id===potion.id));
   await page.keyboard.press('i');check(device.name+' I closes inventory',(await state()).phase==='playing');
   await page.evaluate(()=>window.__QA__.vital(30,10));before=await state();await page.keyboard.press('1');await advance(30);await page.keyboard.press('2');await advance(30);after=await state();check(device.name+' potion hotkeys',after.hp>before.hp&&after.mana>before.mana&&after.potions.health<before.potions.health&&after.potions.mana<before.potions.mana);
   await page.evaluate(()=>window.__QA__.fullBars());
   before=await state();await page.keyboard.press('1');await page.keyboard.press('2');await advance(30);after=await state();check(device.name+' full bars preserve potions',before.potions.health>0&&before.potions.mana>0&&JSON.stringify(before.potions)===JSON.stringify(after.potions));
   await page.keyboard.press('Escape');await page.keyboard.press('i');await page.keyboard.press('i');check(device.name+' inventory preserves pause',(await state()).phase==='paused');await page.keyboard.press('Escape');
   const owned=JSON.stringify((await state()).inventory);await page.evaluate(()=>window.__QA__.die());await page.keyboard.press('i');check(device.name+' death preserves inventory',JSON.stringify((await state()).inventory)===owned);await page.keyboard.press('i');
   await page.reload();await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');check(device.name+' reload preserves inventory',JSON.stringify((await state()).inventory)===owned);await page.locator('#start-button').click();check(device.name+' next run preserves equipment',(await state()).gear.damage===equipped);
   await page.evaluate(()=>{window.__QA__.reset();window.__QA__.fill();window.__QA__.kill('boss',3,18);});after=await state();check(device.name+' boss drops higher tier gear',after.loot.length===1&&after.loot[0].level>=3&&!['health','mana'].includes(after.loot[0].kind));
   const drop=after.loot[0];await page.evaluate(p=>window.__QA__.at(p.x,p.z),drop.position);await advance(200);check(device.name+' full bag retains ground loot',(await state()).loot.length===1);
   await page.keyboard.press('i');const item=(await state()).inventory.items[0];await page.locator('.inventory-grid [data-item="'+item.id+'"]').click();before=await state();await page.locator('[data-loot-action="salvage"]').click();after=await state();check(device.name+' salvage grants permanent fragments',after.inventory.shards>before.inventory.shards&&after.inventory.items.length===23);await page.keyboard.press('i');await page.keyboard.down('ArrowRight');await advance(300);await page.keyboard.up('ArrowRight');await advance(100);after=await state();check(device.name+' freed slot collects drop',after.loot.length===0&&after.inventory.items.length===24,{position:after.position,loot:after.loot,bag:after.inventory.items.length,phase:after.phase});
   if(device.touch){
    const cdp=await context.newCDPSession(page);
    for(const kind of ['stone','crate','guard']){
     let setup=await page.evaluate(kind=>window.__QA__.throwSetup(kind),kind);const project=p=>page.evaluate(p=>window.__QA__.project(p),p);const pick=await project(setup.item),aim=await project([setup.enemy[0],setup.enemy[1]+.2,setup.enemy[2]]);
     await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:pick.x,y:pick.y}]});await advance(100);
     check(device.name+' touch grabs '+kind,!!(await state()).holding);
     await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:aim.x,y:aim.y}]});await advance(380);await page.waitForTimeout(180);before=await page.evaluate(()=>window.__QA__.throwState());await shot('aim-'+kind);
     await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await advance(1500);after=await page.evaluate(()=>window.__QA__.throwState());check(device.name+' touch accurate '+kind,after.victimHp<65&&!before.marker.line,{hp:after.victimHp,marker:before.marker,hits:after.hits});
    }
   }else{
    await page.evaluate(()=>window.__QA__.ritual());await page.keyboard.down('r');await advance(2300);await page.keyboard.up('r');await advance(6500);check('seven stones assemble bodyguard',!!(await state()).goliath&&(await state()).stones.length===0);await page.waitForTimeout(1200);
    let start=(await state()).goliath.position;await page.keyboard.down('ArrowRight');const frames=[];
    frames.push(...await page.evaluate(()=>new Promise(resolve=>{const frames=[];const tick=()=>{const s=window.__QA__.state();frames.push({time:s.time,renderer:s.renderer,feet:s.feet,goliath:s.goliath});if(frames.length<120)requestAnimationFrame(tick);else resolve(frames);};requestAnimationFrame(tick);})));
    await page.keyboard.up('ArrowRight');await page.waitForTimeout(800);after=await state();check('Goliath follows without sleep',after.goliath.position.x>start.x+2,{start,end:after.goliath.position});
    await fs.writeFile(path.join(output,'gait-frames.json'),JSON.stringify(frames));
    let maxDrift=0,supportFrames=0;for(let i=1;i<frames.length;i++){const a=frames[i-1].feet,b=frames[i].feet;if(a?.support!==null&&a?.support===b?.support){supportFrames++;const j=b.support;maxDrift=Math.max(maxDrift,Math.hypot(...b.positions[j].map((v,k)=>v-a.positions[j][k])));}}
    check('Goliath planted foot stays fixed',supportFrames>5&&maxDrift<.015,{maxDrift,supportFrames});check('Goliath feet stay on floor',frames.every(f=>f.feet?.positions.every(p=>p[1]>=-.001&&p[1]<.31)));
    await page.keyboard.down('ArrowLeft');await page.waitForTimeout(900);await page.keyboard.up('ArrowLeft');await shot('goliath-turn');
    await page.evaluate(()=>window.__QA__.enemy('boss'));await page.waitForTimeout(200);await shot('goliath-windup');await page.waitForTimeout(400);after=await page.evaluate(()=>window.__QA__.enemyState());check('Goliath strike damages and interrupts boss',after.hp===466&&after.channel===0,{after});await shot('goliath-strike');await page.waitForTimeout(250);await shot('goliath-recovery');let same=await page.evaluate(()=>window.__QA__.enemyState());check('Goliath strike hits only once',same.hp===466,{same});
    await page.evaluate(()=>window.__QA__.away());await advance(2400);same=await page.evaluate(()=>window.__QA__.enemyState());check('Goliath cannot hit out of reach',same.hp===466,{same});
    await page.evaluate(()=>window.__QA__.faceAway());await advance(100);same=await page.evaluate(()=>window.__QA__.enemyState());check('Goliath turns before attacking behind him',same.hp===500&&same.attack===0,{same});await advance(1100);same=await page.evaluate(()=>window.__QA__.enemyState());check('Goliath strikes after facing target',same.hp===466,{same});
    await page.evaluate(()=>window.__QA__.finishAlly());await advance(30);check('Goliath lifetime remains',(await state()).goliath.dead);
    const resources=[];for(let i=0;i<6;i++){await page.evaluate(()=>window.__QA__.dropCycle());await advance(100);await page.waitForTimeout(150);resources.push((await state()).memory);}check('loot resources plateau across restarts',resources.slice(2).every(r=>r.geometries===resources[2].geometries&&r.textures===resources[2].textures),{resources});
   }
  }else{
   let before=await state();const staff=before.inventory.items.find(i=>i.kind==='staff'&&i.level===3);await page.locator('.inventory-grid [data-item="'+staff.id+'"]').click();await page.locator('[data-loot-action="equip"]').click();let after=await state();check(device.name+' compiled equipment bonuses',after.gear.damage>0&&after.inventory.equipped.staff===staff.id&&after.hp===before.hp);
   await page.keyboard.press('i');check(device.name+' compiled inventory closes',(await state()).phase==='playing');if(device.touch)check(device.name+' movement controls restored',await page.locator('.touch-controls').isVisible());before=await state();check(device.name+' compiled castle retained',before.rooms.length===15&&before.enemies.length===68&&before.enemies.filter(e=>e.kind==='boss').length===4);
   check(device.name+' compiled version',await page.evaluate(()=>window.__MAGIC__.version==='1.4.0'));
   if(device.touch)await page.locator('.touch-actions [data-action="conjure"]').tap();else await page.keyboard.press('r');await advance(100);after=await state();check(device.name+' compiled conjure',after.stones.length===1);before=after;
   if(device.touch)await page.locator('#quick-mana').tap();else await page.keyboard.press('2');await advance(30);after=await state();check(device.name+' compiled potion use',after.mana>before.mana&&after.inventory.items.reduce((n,i)=>n+(i.kind==='mana'?i.count:0),0)<before.inventory.items.reduce((n,i)=>n+(i.kind==='mana'?i.count:0),0));
   check(device.name+' compiled canonical save protected',await page.evaluate(()=>localStorage.getItem('magic-exiled-v1')===null));
   const owned=JSON.stringify(after.inventory);await page.reload();await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');check(device.name+' compiled reload persists loot',JSON.stringify((await state()).inventory)===owned);await page.locator('#start-button').click();await page.keyboard.press('f');await advance(100);await shot('compiled-game');
  }
  await page.evaluate(()=>window.advanceTime(1050));await page.waitForTimeout(1100);
  const perf=await page.evaluate(async()=>{const times=[];let last=performance.now();for(let i=0;i<120;i++)await new Promise(resolve=>requestAnimationFrame(t=>{times.push(t-last);last=t;resolve();}));const sorted=times.slice(1).sort((a,b)=>a-b);return{p50:sorted[Math.floor(sorted.length*.5)],p95:sorted[Math.floor(sorted.length*.95)],p99:sorted[Math.floor(sorted.length*.99)],max:sorted.at(-1),over50ms:sorted.filter(t=>t>50).length,...(window.__QA__?window.__QA__.state():window.__MAGIC__.snapshot())};});report.performance.push({device:device.name,...perf});
  await context.close();context=null;if(device.name==='desktop'){report.video=path.join(output,'desktop.webm');await video.saveAs(report.video);video=null;}
 }
}catch(e){report.errors.push(e.stack);process.exitCode=1;}
finally{await context?.close();if(video){report.video=path.join(output,'desktop.webm');await video.saveAs(report.video);}await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.cases.filter(c=>c.pass).length,total:report.cases.length,failures:report.cases.filter(c=>!c.pass),errors:report.errors,cleanup:report.cleanup}));if(report.errors.length||report.cases.some(c=>!c.pass))process.exitCode=1;}
