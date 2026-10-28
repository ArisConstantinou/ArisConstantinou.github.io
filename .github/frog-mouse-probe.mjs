import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE);
const b=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const p=await b.newPage({viewport:{width:1280,height:800}});const results=[];
await p.addInitScript(()=>localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,touchFireMode:'manual',mouseTargetLock:false})));
p.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text());});
await p.goto('http://127.0.0.1:4178/?test=1',{waitUntil:'networkidle',timeout:180000});await p.waitForFunction(()=>window.frogArcade);
await p.evaluate(()=>{
 const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.trace=[];
 const state=()=>({yaw:g.cameraYaw,running:g.running,view:g.viewMode,locked:g.pointerLocked(),mounted:g.state.actors[0].catapultId,held:g.targetLock.held,target:g.targetLock.targetId});
 const turn=g.turnLook.bind(g);g.turnLook=(...args)=>{trace.push({kind:'turn-before',args,...state()});turn(...args);trace.push({kind:'turn-after',...state()});};
 for(const type of ['pointermove','mousemove','pointerdown','pointerup','mousedown','mouseup','pointerlockchange','blur','focus'])window.addEventListener(type,e=>trace.push({kind:type,dx:e.movementX,dy:e.movementY,x:e.clientX,y:e.clientY,buttons:e.buttons,button:e.button,target:e.target?.id,...state()}),true);
 window.tick=(n=1)=>{const render=g.renderer.render;try{for(let i=0;i<n;i++){g.renderer.render=i===n-1?render:()=>{};g.frame(g.last+1000/60+.001);}}finally{g.renderer.render=render;}trace.push({kind:'after-frames',n,...state()});};
});
await p.locator('#new-round-button').click();await p.evaluate(()=>tick(3));
results.push({step:'new',trace:await p.evaluate(()=>trace.splice(0))});
await p.evaluate(()=>{const g=window.frogArcade;g.clearInputs();g.releaseMouseLook();g.state.phase='battle';g.state.intro=0;g.state.guards=[];g.state.flies.forEach(f=>f.wait=9999);Object.assign(g.state.actors[0],{x:0,z:6,tongue:9999});g.state.actors.slice(1).forEach(a=>Object.assign(a,{ko:true,eliminated:true}));g.cameraYaw=Math.PI;g.cameraPitch=.2;g.cameraReady=false;g.updateCameraPose(0);tick(3);});
await p.waitForFunction(()=>!document.pointerLockElement);await p.mouse.move(640,400);await p.mouse.click(640,400);await p.waitForFunction(()=>!!document.pointerLockElement);await p.evaluate(()=>tick(25));results.push({step:'fixture',trace:await p.evaluate(()=>trace.splice(0))});
for(const x of [760,900,1032,1150,1425]){await p.mouse.move(x,400);results.push({step:'move-'+x,immediate:await p.evaluate(()=>trace.splice(0))});await p.evaluate(()=>tick(25));results.push({step:'frames-'+x,trace:await p.evaluate(()=>trace.splice(0))});}
console.log(JSON.stringify(results,null,2));await fs.writeFile(process.env.RUNNER_TEMP+'/probe/trace.json',JSON.stringify(results,null,2));await p.screenshot({path:process.env.RUNNER_TEMP+'/probe/screen.png'});await b.close();
