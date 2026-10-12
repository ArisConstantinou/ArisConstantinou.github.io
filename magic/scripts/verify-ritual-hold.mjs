import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const url=process.env.MAGIC_RITUAL_URL||'http://127.0.0.1:5173/.cache/goliath-game/';
const output=path.resolve(process.env.MAGIC_RITUAL_OUTPUT||'output/ritual-fix/after');await fs.mkdir(output,{recursive:true});
const report={date:new Date().toISOString(),url,checks:[],errors:[]};
const check=(name,passed,detail)=>report.checks.push({name,passed,detail});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:output});
try{
 for(const [mode,width,height]of [['desktop',1440,900],['mobile',390,844],['mobile-landscape',844,390]]){
  const touch=mode!=='desktop',context=await managed.browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block'});
  await context.addInitScript(()=>{let seed=7431;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;});
  if(url.includes('goliath-game'))await context.route('**/src/main.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text())+`\nwindow.__RITUAL_SCATTER__=()=>{startRun();for(const e of entities)if(e.category==='actor'&&!e.isPlayer)e.stun=1e5;for(let i=0;i<7;i++)prop('stone',-25+i*.7,16,{y:.4,mass:2,ephemeral:true});syncVisuals(0);updateHUD();};`});});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  await page.goto(url);await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu');await page.locator('#start-button').click();
  const state=()=>page.evaluate(()=>window.__MAGIC__.snapshot()),advance=ms=>page.evaluate(ms=>window.advanceTime(ms),ms);
  const cdp=touch?await context.newCDPSession(page):null;
  let pointer;
  const down=async()=>{if(touch){const r=await page.locator('.touch-actions [data-action="conjure"]').boundingBox();pointer={x:r.x+r.width/2,y:r.y+r.height/2,id:1};await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[pointer]});}else await page.keyboard.down('r');};
  const up=async()=>touch?cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}):page.keyboard.up('r');
  const restart=async()=>{const s=await state();if(s.phase==='playing')await page.keyboard.press('Escape');await page.locator((await state()).phase==='result'?'#result-restart':'#pause-restart').click();};
  const six=async(interval=200)=>{for(let i=0;i<6;i++){await down();await up();await advance(interval);}check(mode+' six native stones', (await state()).stones.length===6);};
  await six();await down();await up();await advance(350);
  const tap=await state();check(mode+' seventh short tap creates only one stone',tap.stones.length===7&&tap.ritual.phase==='idle',{stones:tap.stones.length,ritual:tap.ritual});
  await restart();await six();await down();await advance(1100);
  let s=await state();check(mode+' same hold that creates seventh stone charges ritual',s.stones.length===7&&s.ritual.phase==='charge'&&s.ritual.elapsed>0,{stones:s.stones.length,ritual:s.ritual});
  await page.screenshot({path:path.join(output,mode+'-charge.png')});
  await advance(1300);s=await state();check(mode+' hold crosses into sequential assembly',s.ritual.phase==='assemble',s.ritual);
  await up();
  // Use existing combat abilities while the unmodified runtime assembles.
  if(touch){await page.locator('.touch-actions [data-action="pulse"]').tap();await page.locator('.touch-actions [data-action="dash"]').tap();}
  else{await page.keyboard.press('f');await page.keyboard.press('Space');}
  await advance(6500);s=await state();check(mode+' native seventh-stone hold completes Goliath',!!s.goliath&&!s.goliath.dead&&s.stones.length===0,{phase:s.phase,hp:s.hp,goliath:s.goliath,stones:s.stones.length});
  check(mode+' completed bodyguard stays on the castle floor in combat',!!s.goliath&&Math.abs(s.goliath.position.y-1.65)<.05,s.goliath?.position);
  await page.screenshot({path:path.join(output,mode+'-goliath.png')});
  await restart();await six();await down();await advance(600);await up();s=await state();
  check(mode+' partial seventh-stone charge cancels without eighth stone',s.stones.length===7&&s.ritual.phase==='idle'&&!s.stones.some(e=>e.reserved),{stones:s.stones.length,ritual:s.ritual});
  await restart();await six(30);await down();await advance(1200);s=await state();
  check(mode+' hold waits for seventh-stone mana then charges',s.stones.length===7&&s.ritual.phase==='charge'&&s.ritual.elapsed>0,{mana:s.mana,stones:s.stones.length,ritual:s.ritual});
  await up();
  if(mode==='desktop'&&url.includes('goliath-game')){
   await page.evaluate(()=>window.__RITUAL_SCATTER__());s=await state();
   const text=await page.locator('#goliath-state').innerText();
   check('seven distant stones do not claim ritual readiness',s.stones.length===7&&s.ritual.available===0&&text==='0 / 7 κοντινές πέτρες',{ritual:s.ritual,text});
   await page.screenshot({path:path.join(output,'distant-readiness.png')});
  }
  await context.close();
 }
}catch(e){report.errors.push(e.stack);process.exitCode=1;}
finally{await managed.cleanup();report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({checks:report.checks.length,failed:report.checks.filter(c=>!c.passed),errors:report.errors,cleanup:report.cleanup},null,2));if(report.errors.length||report.checks.some(c=>!c.passed))process.exitCode=1;}
