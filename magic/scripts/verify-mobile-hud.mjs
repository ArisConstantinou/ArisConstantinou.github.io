import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const before=process.argv.includes('--before');
const selectedModes=process.argv.find(a=>a.startsWith('--modes='))?.slice(8).split(',');
const selectedKinds=process.argv.find(a=>a.startsWith('--kinds='))?.slice(8).split(',')||['crate','stone','guard'];
const root=path.resolve(import.meta.dirname,'..');
const url=process.env.MAGIC_TEST_URL||`http://127.0.0.1:5173/.cache/${before?'mobile-before-game':'mobile-game'}/`;
const output=path.join(root,`output/playwright/mobile-hud-${before?'before':'after'}`);
await fs.mkdir(output,{recursive:true});
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const report={date:new Date().toISOString(),url,before,cases:[],errors:[],limitations:['Native CDP touch in desktop Chrome, not physical iPhone performance']};
const extra=`
const observedMobileThrow=throwHeld;
throwHeld=function(v=currentThrowVelocity()){window.__MOBILE_UI_TEST__.released={...v};observedMobileThrow(v);};
window.__MOBILE_UI_TEST__={released:null,toast:(message,type)=>ui.toast(message,type),
 setup:kind=>{startRun();for(const e of [...entities])if(!e.isPlayer)removeEntity(e);player.hp=player.maxHp;player.mana=player.maxMana;const enemy=actor('guard',4,14);enemy.stun=1e6;const item=kind==='guard'?actor('guard',0,16.4):prop(kind,0,16.4,{y:1.15,mass:kind==='crate'?5:2,ephemeral:kind==='stone'});item.guardBreak=20;item.stun=1e6;window.__MOBILE_UI_TEST__.item=item;window.__MOBILE_UI_TEST__.enemy=enemy;window.__MOBILE_UI_TEST__.released=null;syncVisuals(0);updateCamera(1);},
 state:()=>({phase,time:runTime,holding:!!held,velocity:currentThrowVelocity(),released:window.__MOBILE_UI_TEST__.released,item:window.__MOBILE_UI_TEST__.item.body.position.toArray(),target:window.__MOBILE_UI_TEST__.enemy.body.position.toArray(),hp:window.__MOBILE_UI_TEST__.enemy.hp,marker:{visible:targetRing.visible,x:targetRing.position.x,y:targetRing.position.y,z:targetRing.position.z},player:{x:player.body.position.x,z:player.body.position.z}})
};`;
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
let context;
const check=(mode,name,passed,details)=>report.cases.push({mode,name,passed:!!passed,...(details?{details}:{})});
try {
 for(const [mode,width,height,touch] of [['desktop',1440,900,false],['portrait',390,676,true],['tall',390,844,true],['narrow',360,640,true],['landscape',844,390,true]].filter(v=>!selectedModes||selectedModes.includes(v[0]))) {
  context=await managed.browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,deviceScaleFactor:1,serviceWorkers:'block'});
  await context.addInitScript(()=>{let seed=821;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;localStorage.setItem('magic-exiled-v1','protected-normal-save');});
  await context.route('**/src/main.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+'\n'+extra});});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  await page.goto(url);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');
  const cdp=touch?await context.newCDPSession(page):null;
  const send=(type,points=[])=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
  const state=()=>page.evaluate(()=>__MOBILE_UI_TEST__.state());
  const project=p=>page.evaluate(p=>__MAGIC__.project({x:p[0],y:p[1],z:p[2]}),p);
  const setup=async(kind='crate')=>{await page.evaluate(kind=>__MOBILE_UI_TEST__.setup(kind),kind);await page.waitForTimeout(180);};
  const grab=async()=>{const s=await state(),p=await project(s.item);if(touch)await send('touchStart',[{id:1,...p}]);else{await page.mouse.move(p.x,p.y);await page.mouse.down();}await page.waitForFunction(()=>__MOBILE_UI_TEST__.state().holding);return p;};
  await setup();await page.screenshot({path:path.join(output,mode+'-idle.png')});
  const layout=await page.evaluate(()=>{
    const visible=e=>!!e&&getComputedStyle(e).display!=='none'&&!e.hidden;
    const controls=[...document.querySelectorAll('.touch-actions .ability,.fire-sample-control .ability,.hearth-actions .ability,.potion-tools button,#move-stick')].filter(e=>visible(e)&&e.getBoundingClientRect().width>0).map(e=>({action:e.dataset.action||e.id,rect:e.getBoundingClientRect().toJSON()}));
    const overlap=[];for(let i=0;i<controls.length;i++)for(let j=i+1;j<controls.length;j++){const a=controls[i].rect,b=controls[j].rect;if(Math.min(a.right,b.right)>Math.max(a.left,b.left)+1&&Math.min(a.bottom,b.bottom)>Math.max(a.top,b.top)+1)overlap.push([controls[i].action,controls[j].action]);}
    return{overflow:document.documentElement.scrollWidth>innerWidth,controls,overlap,expanded:[...document.querySelectorAll('.objective-block,.stone-status,.hearth-status,.run-meta')].filter(visible).length,fonts:[...document.querySelectorAll('.touch-actions .ability-name,.stick-label')].map(e=>parseFloat(getComputedStyle(e).fontSize))};
  });
  check(mode,'no horizontal overflow',!layout.overflow);
  if(touch){check(mode,'details folded during gameplay',layout.expanded===0,layout);check(mode,'touch targets separated and on-screen',layout.overlap.length===0&&layout.controls.every(c=>c.rect.width>=44&&c.rect.height>=44&&c.rect.x>=0&&c.rect.right<=width&&c.rect.y>=0&&c.rect.bottom<=height),layout.controls);check(mode,'control labels at least 12px',layout.fonts.every(f=>f>=12),layout.fonts);}
  for(const kind of selectedKinds) {
    await setup(kind);const pick=await grab();let shieldPoint;
    // A held actor dragged onto the target is already overlapping it on release.
    // Hold the shield input so this case exercises a real flight from a separate origin.
    if(kind==='guard') {
      if(touch){const r=await page.locator('.touch-actions [data-action="shield"]').boundingBox();shieldPoint={id:6,x:r.x+r.width/2,y:r.y+r.height/2};await send('touchStart',[{id:1,...pick},shieldPoint]);}
      else await page.keyboard.down('Shift');
    }
    const s=await state(),aim=await project(s.target);
    if(touch)await send('touchMove',[{id:1,...aim},...(shieldPoint?[shieldPoint]:[])]);else await page.mouse.move(aim.x,aim.y);
    await page.waitForTimeout(750);
    const aimed=await state(),mark=await page.evaluate(()=>{const e=document.getElementById('throw-mark');return e?{visible:!e.hidden,rect:e.getBoundingClientRect().toJSON(),border:parseFloat(getComputedStyle(e).borderTopWidth)}:null;});
    if(touch){await page.evaluate(()=>__MOBILE_UI_TEST__.toast('Υπενθύμιση ενώ στοχεύεις.','info'));check(mode,kind+' routine reminders stay clear while aiming',await page.locator('#toasts .toast').count()===0);}
    const expected=await project([aimed.marker.x,aimed.marker.y,aimed.marker.z]);
    check(mode,kind+' target remains on floor',aimed.marker.visible);
    if(touch)check(mode,kind+' clear mark matches physics target',mark?.visible&&mark.rect.width>=44&&mark.border>=3&&Math.hypot(mark.rect.x+mark.rect.width/2-expected.x,mark.rect.y+mark.rect.height/2-expected.y)<3,{mark,expected});
    await page.screenshot({path:path.join(output,mode+'-'+kind+'-aim.png')});
    if(touch)await send('touchEnd');else{await page.mouse.up();await page.keyboard.up('Shift');}
    await page.waitForTimeout(1300);const released=await state();
    check(mode,kind+' native release hits chosen guard',!released.holding&&released.hp<65,{hp:released.hp,released:released.released});
    if(touch)check(mode,kind+' mark clears after release',await page.locator('#throw-mark').count()===0||await page.locator('#throw-mark').isHidden());
  }
  if(touch&&!process.argv.includes('--throws-only')) {
    await setup();let pick=await grab();const stick=await page.locator('#move-stick').boundingBox(),move={id:2,x:stick.x+stick.width/2+35,y:stick.y+stick.height/2};
    const start=await state();await send('touchStart',[{id:1,...pick},move]);await page.waitForTimeout(250);const moving=await state();
    check(mode,'move and hold with two fingers',moving.holding&&moving.player.x>start.player.x+.25);
    await send('touchCancel');await page.waitForTimeout(100);const cancelled=await state();
    check(mode,'touch cancel drops without throwing',!cancelled.holding&&!cancelled.released);
    if(!before)check(mode,'cancel clears mark',await page.locator('#throw-mark').isHidden());
    await setup();await grab();await send('touchEnd');await page.waitForTimeout(70);
    await page.evaluate(()=>{for(let i=0;i<12;i++)__MOBILE_UI_TEST__.toast('Ένας τοίχος εμποδίζει την αρπαγή.','danger');});
    check(mode,'burst produces one notice',await page.locator('#toasts .toast').count()===1);
    await page.evaluate(()=>{for(let i=0;i<8;i++)__MOBILE_UI_TEST__.toast('Άγγιξε την πέτρα και σύρε την.','info');});
    check(mode,'routine notices cannot replace danger',await page.locator('#toasts').innerText()==='Ένας τοίχος εμποδίζει την αρπαγή.');
    await page.waitForTimeout(3300);
    check(mode,'notice expires without being extended',await page.locator('#toasts .toast').count()===0);
    await page.evaluate(()=>__MOBILE_UI_TEST__.toast('Ένας τοίχος εμποδίζει την αρπαγή.','danger'));
    check(mode,'repeat cooldown avoids immediate reappearance',await page.locator('#toasts .toast').count()===0);
    if(!before) {
      await setup();await grab();const held=await state(),pick2=await project(held.item),button=await page.locator('#hud-status').boundingBox();
      await send('touchStart',[{id:1,...pick2},{id:4,x:button.x+button.width/2,y:button.y+button.height/2}]);await send('touchEnd',[{id:1,...pick2}]);await send('touchEnd');
      await page.waitForFunction(()=>!document.getElementById('modal-screen').hidden);
      const paused=await state();await page.waitForTimeout(180);const unchanged=await state();
      check(mode,'details pause play and cancel held gesture',paused.phase==='inventory'&&!paused.holding&&!paused.released&&paused.time===unchanged.time);
      check(mode,'details include suit location and Goliath',await page.locator('#modal-content').innerText().then(t=>t.includes('HEARTH BULWARK')&&t.includes('Goliath')&&t.includes('Καρδιά')));
      check(mode,'details hide gameplay controls and notices',await page.locator('#game-hud').isHidden()&&await page.locator('#toasts').isHidden());
      await page.screenshot({path:path.join(output,mode+'-details.png')});
      await page.locator('#modal-panel').evaluate(e=>e.scrollTop=e.scrollHeight);
      const close=await page.locator('#modal-close').boundingBox();check(mode,'details close stays accessible while scrolling',close.y>=0&&close.y+close.height<=height&&close.width>=44);
      await page.locator('#modal-close').tap();await page.waitForTimeout(70);
      check(mode,'closing details resumes play',(await state()).phase==='playing');
    }else check(mode,'details panel available',false);
  }
  check(mode,'normal save isolated',await page.evaluate(()=>localStorage.getItem('magic-exiled-v1')==='protected-normal-save'));
  await context.close();context=null;
 }
}catch(error){report.errors.push(error.stack);process.exitCode=1;}
finally {
 await context?.close();await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};
 await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
 const failures=report.cases.filter(c=>!c.passed);console.log(JSON.stringify({before,passed:report.cases.length-failures.length,total:report.cases.length,failures:failures.map(({mode,name})=>({mode,name})),errors:report.errors,cleanup:report.cleanup},null,2));
 if(report.errors.length||(!before&&failures.length))process.exitCode=1;
}
