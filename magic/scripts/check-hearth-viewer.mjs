import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const skill=path.join(process.env.USERPROFILE,'.codex/skills/develop-web-game');
const {chromium}=await import(pathToFileURL(path.join(skill,'node_modules/playwright/index.mjs')));
const {launchManagedBrowser}=await import(pathToFileURL(path.join(skill,'scripts/browser_lifecycle.mjs')));
const out=path.resolve('output/hearth/final');await fs.mkdir(out,{recursive:true});
const managed=await launchManagedBrowser(chromium,{channel:'chrome',headless:true,softwareRendering:false,screenshotDir:out});
const report={checks:[],errors:[]};let context;
const check=(pass,label)=>{report.checks.push({pass:!!pass,label});if(!pass)throw new Error(label);};
try{
 context=await managed.browser.newContext({viewport:{width:1280,height:900},serviceWorkers:'block'});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/.cache/hearth-viewer/hearth-viewer.html');await page.waitForFunction(()=>window.__HEARTH_VIEWER__);
 report.bones=await page.evaluate(()=>{const result=[];__HEARTH_VIEWER__.mage.group.traverse(o=>{if(o.isBone)result.push(o.name);});return result;});
 report.pilot=await page.evaluate(()=>{const v=__HEARTH_VIEWER__,result={};for(const clip of ['Board','Exit']){result[clip]=[];for(const t of [0,1.2,2.399]){v.set(clip,t);result[clip].push({time:t,visible:v.mage.group.visible,position:v.mage.group.position.toArray()});}}return result;});
 check(report.pilot.Board.every(p=>p.visible)&&report.pilot.Exit.every(p=>p.visible),'pilot visible through entry and exit');
 check(report.pilot.Board[2].position[1]>2.3&&report.pilot.Board[0].position[1]<.03,'entry climbs from floor into cockpit');
 check(report.pilot.Exit[0].position[1]>2.3&&report.pilot.Exit[2].position[1]<.03,'exit descends back to floor');
 report.contacts=await page.evaluate(()=>{const v=__HEARTH_VIEWER__,results=[];for(const clip of ['Idle','Board','Exit'])for(const t of clip==='Idle'?[.5]:[.6,1.2,1.8]){v.set(clip,t);results.push({clip,time:t,contacts:v.mage.group.userData.hearthPilotContacts});}return results;});
 check(report.contacts.every(p=>p.contacts.length===(p.clip==='Idle'?2:4)&&p.contacts.every(c=>c.error<.12)),'hands and feet contact controls or ladder within 12 cm');
 await page.evaluate(()=>{__HEARTH_VIEWER__.set('Board',1.2);__HEARTH_VIEWER__.view([5,3.6,-7]);});await page.screenshot({path:path.join(out,'model-board.png')});
 await page.evaluate(()=>{__HEARTH_VIEWER__.set('Fire',.35);__HEARTH_VIEWER__.view([6,4.7,7]);});await page.screenshot({path:path.join(out,'model-fire.png')});
 check(await page.locator('#clip').inputValue()==='Fire','selected label matches displayed clip');
 await page.locator('#clip').selectOption('Walk');await page.waitForTimeout(200);check(await page.evaluate(()=>JSON.parse(render_game_to_text()).time>.1),'native selection starts animation');
 await page.locator('#play').click();const time=await page.evaluate(()=>JSON.parse(render_game_to_text()).time);await page.waitForTimeout(100);check(Math.abs(time-await page.evaluate(()=>JSON.parse(render_game_to_text()).time))<.002,'native pause freezes animation');
 check(report.errors.length===0,'no viewer runtime errors');
}catch(e){report.failure=e.stack;}finally{await context?.close();try{await managed.cleanup();}catch(e){report.cleanupWarning=managed.report.cleanupErrors;if(!managed.report.closed)report.failure=e.message;}report.cleanup={closed:managed.report.closed,remainingPids:managed.report.remainingPids};await fs.writeFile(path.join(out,'viewer-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));}
if(report.failure||report.errors.length)process.exitCode=1;
