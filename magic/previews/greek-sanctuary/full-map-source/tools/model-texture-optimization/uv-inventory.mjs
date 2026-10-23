import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {chromium} from 'file:///C:/Users/arz0r/.codex/skills/develop-web-game/node_modules/playwright/index.mjs';
const root=process.env.CODEX_GENERATED_OUTPUT,out=root+'/tests/mobile-model-optimization';
process.env.TEMP=process.env.TMP=root+'/work/temp';await fs.mkdir(out,{recursive:true});
execFileSync('powershell.exe',['-NoProfile','-Command','Get-CimInstance Win32_Process | Select-Object -First 1 -ExpandProperty ProcessId'],{windowsHide:true});
const context=await chromium.launchPersistentContext(root+'/work/browser',{channel:'chrome',headless:false,viewport:{width:430,height:745},deviceScaleFactor:3,isMobile:true,hasTouch:true,args:['--mute-audio','--disable-background-mode','--disable-crash-reporter','--disable-gpu-shader-disk-cache','--disk-cache-size=33554432']});
const page=context.pages()[0],errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5173/performance-check/canonical/index.html?hearthQA=1');await page.bringToFront();
 await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu',null,{timeout:120000});
 const data=await page.evaluate(()=>{
  const entities=__HEARTH_QA__.entities,seen=new Set(),result={};
  for(const e of entities){const kind=e.kind==='archer'?'archer':e.kind==='boss'?(e.bossType||'iron-warden'):null;if(!['archer','iron-warden','gargoyle'].includes(kind)||seen.has(kind))continue;seen.add(kind);result[kind]=[];
   e.mesh.traverse(o=>{if(!o.isMesh||!o.geometry.attributes.uv)return;const a=o.geometry.attributes.uv,bounds=[Infinity,Infinity,-Infinity,-Infinity];for(let i=0;i<a.count;i++){bounds[0]=Math.min(bounds[0],a.getX(i));bounds[1]=Math.min(bounds[1],a.getY(i));bounds[2]=Math.max(bounds[2],a.getX(i));bounds[3]=Math.max(bounds[3],a.getY(i));}result[kind].push({name:o.name,material:o.material.name,uv:bounds,triangles:(o.geometry.index?.count||o.geometry.attributes.position.count)/3,maps:Object.entries(o.material).filter(([,v])=>v?.isTexture).map(([key,v])=>({key,width:v.image.width,height:v.image.height,repeat:v.repeat.toArray(),offset:v.offset.toArray(),wrapS:v.wrapS,wrapT:v.wrapT}))});});
  }return result;
 });await fs.writeFile(out+'/uv-inventory.json',JSON.stringify({errors,models:data},null,2));
 await page.locator('#start-button').click();await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.running);await page.waitForTimeout(2000);await page.screenshot({path:out+'/before.png',scale:'css'});
 console.log(JSON.stringify({models:Object.keys(data),errors}));
}finally{await context.close();await new Promise(r=>setTimeout(r,1500));}
