import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:4177';
const out=process.env.OUT_DIR||'/workspace/scratch/bb1e5197fd61/frog4312-map-browser';
await fs.mkdir(out,{recursive:true});
const report={version:'4.3.12',checks:[],screenshots:[],errors:[],bundles:[]};
const check=(ok,label,details)=>{report.checks.push({ok:!!ok,label,details});console.log(`${ok?'PASS':'FAIL'} ${label}`);};
const browser=await chromium.launch({headless:true,executablePath:'/tmp/frog-full-chromium/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 page.on('pageerror',error=>report.errors.push(String(error)));
 await page.goto(base+'/?test=1',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.frogArcade&&window.__FROG__);
 await page.evaluate(()=>window.frogArcade.renderer.setAnimationLoop(null));
 await page.locator('#new-round-button').click();
 await page.evaluate(()=>{const g=window.frogArcade;g.releaseMouseLook();g.renderer.setAnimationLoop(null);g.clearInputs();g.state.phase='battle';g.state.intro=0;g.shake=0;g.state.actors.slice(1).forEach(a=>{a.ko=true;a.eliminated=true;});g.calloutUntil=-1;});
 await page.waitForFunction(()=>!document.pointerLockElement);
 report.bundles=await page.evaluate(()=>[...document.scripts].map(s=>s.src).filter(Boolean));
 const initial=await page.evaluate(()=>{const g=window.frogArcade;return {version:window.__FROG__.version,map:g.inspect().battleground,flies:g.state.flies.length,worldScale:g.world.group.scale.toArray(),metrics:g.battlegroundView.metrics};});
 check(initial.version==='4.3.12','combined release version',initial.version);
 check(initial.map.radius===38&&initial.map.areas.length===6,'expanded authored arena and six districts',initial.map);
 check(initial.worldScale.every(n=>n===1),'world stays at its original physical scale',initial.worldScale);
 check(initial.flies===120&&initial.map.swarmPatches===10,'outer districts have their own live fly patches',{flies:initial.flies,patches:initial.map.swarmPatches});
 check(initial.metrics.routes===13&&initial.metrics.areas===6,'all routes and district views were constructed',initial.metrics);
 const geometry=await page.evaluate(()=>{
  const g=window.frogArcade,ground=(x,z)=>g.world.getTerrainHeight(x,z);let count=0,maxGap=0,minGap=Infinity,minInterior=Infinity;
  for(const mesh of g.battlegroundView.routes.values()){
   const p=mesh.geometry.attributes.position,index=mesh.geometry.index;
   for(let i=0;i<p.count;i+=17){const gap=p.getY(i)-ground(p.getX(i),p.getZ(i));maxGap=Math.max(maxGap,gap);minGap=Math.min(minGap,gap);count++;}
   for(let at=0;at<index.count;at+=39){const ids=[index.getX(at),index.getX(at+1),index.getX(at+2)];for(const weights of [[1/3,1/3,1/3],[.5,.5,0],[0,.5,.5],[.5,0,.5]]){let x=0,y=0,z=0;for(let i=0;i<3;i++){x+=p.getX(ids[i])*weights[i];y+=p.getY(ids[i])*weights[i];z+=p.getZ(ids[i])*weights[i];}minInterior=Math.min(minInterior,y-ground(x,z));}}
  }
  return {count,maxGap,minGap,minInterior};
 });
 check(geometry.count>100&&geometry.minGap>.02&&geometry.minInterior>.008&&geometry.maxGap<.16,'road faces clear terrain creases without floating above the ground',geometry);
 async function render(area,mode){
  return page.evaluate(({area,mode})=>{const g=window.frogArcade,p=g.state.actors[0];g.clearInputs();Object.assign(p,{x:area.x,z:area.z+2,height:0,hop:0,knockUp:0,ko:false,eliminated:false,aiming:true,aimX:0,aimY:0,aimZ:-1,face:Math.PI});g.aim={x:0,z:-1};g.cameraYaw=Math.PI;g.cameraPitch=.36;g.viewMode=mode;g.$('view-button').textContent=mode==='overview'?'ΚΑΤΟΨΗ · C':'ΠΙΣΩ 3D · C';g.cameraReady=false;g.updateCameraPose(0);g.elapsed=12;g.renderActors(.05);g.renderFlies();g.basesView.update(1);g.battlegroundView.update?.(.05);g.artilleryView.update(.05);g.world.update(0,12,1,g.focus.clone().set(p.x,g.ground(p.x,p.z),p.z));g.renderer.render(g.scene,g.camera);g.drawLabels();g.updateHUD();return {id:g.inspect().battleground.area,ground:g.ground(p.x,p.z),camera:g.camera.position.toArray(),drawCalls:g.renderer.info.render.calls,triangles:g.renderer.info.render.triangles,modelScale:g.models[0].group.scale.toArray()};},{area,mode});
 }
 async function capture(name){const filename=`${out}/${name}.png`;await page.screenshot({path:filename});report.screenshots.push(filename);}
 for(const area of initial.map.areas){
  const overview=await render(area,'overview');check(overview.id===area.id&&Number.isFinite(overview.ground),'overview reaches '+area.name,overview);await capture('area-'+area.id+'-overview');
  const chase=await render(area,'chase3d');check(chase.id===area.id&&chase.camera.every(Number.isFinite),'rear camera reaches '+area.name,chase);await capture('area-'+area.id+'-chase');
 }
 await page.evaluate(()=>{const g=window.frogArcade;g.viewMode='overview';g.ui.hidden=true;g.labels.hidden=true;g.camera.position.set(0,89,66);g.camera.lookAt(0,.5,0);g.camera.updateMatrixWorld();g.basesView.update(2);g.renderer.render(g.scene,g.camera);});
 await capture('expanded-battleground-aerial');
 const quality=await page.evaluate(()=>{const g=window.frogArcade;const sum=()=>{let n=0;g.battlegroundView.group.traverse(o=>{if(o.isInstancedMesh)n+=o.count;});return n;};g.battlegroundView.setQuality(false);const high=sum();g.battlegroundView.setQuality(true);const low=sum();return {high,low};});
 check(quality.high>quality.low&&quality.low>0,'low quality reduces decoration while preserving all routes',quality);
 check(report.errors.length===0,'no runtime errors while rendering all districts',report.errors);
 report.ok=report.checks.every(c=>c.ok);await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2));
 if(!report.ok)process.exitCode=1;
}finally{await browser.close();}
