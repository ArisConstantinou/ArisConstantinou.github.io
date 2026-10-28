async function directionControls(page){
 // Use the real renderer's projection as the oracle, not movementForView.
 // Each key is checked while the face aims in each of four other directions.
 const keys=[['w',0,-1],['a',-1,0],['s',0,1],['d',1,0]];
 for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2])for(const [key,sx,sy] of keys){
  await fixture(page,{view:'overview',player:{x:0,z:6},yaw});
  await pointAt(page,{x:Math.sin(yaw)*5,z:6+Math.cos(yaw)*5,body:.45});await frames(page,20);
  await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];window.qaMovementCamera=g.camera.clone();window.qaMovementStart={x:p.x,z:p.z,y:g.ground(p.x,p.z)};});
  await page.keyboard.down(key);const samples=await frames(page,9);await page.keyboard.up(key);
  const measured=await page.evaluate(()=>{
   const g=window.frogArcade,p=g.state.actors[0],s=window.qaMovementStart,Vector=g.camera.position.constructor;
   const a=new Vector(s.x,s.y,s.z).project(window.qaMovementCamera),b=new Vector(p.x,s.y,p.z).project(window.qaMovementCamera);
   return {dx:(b.x-a.x)*g.w/2,dy:-(b.y-a.y)*g.h/2,x:p.x-s.x,z:p.z-s.z,face:g.models[0].group.rotation.y,aim:Math.atan2(p.aimX,p.aimZ),shots:g.state.stats.shots};
  });
  check((sx?measured.dx*sx>8:Math.abs(measured.dx)<.2)&&(sy?measured.dy*sy>8:Math.abs(measured.dy)<.2),`overview native ${key.toUpperCase()} has the right SCREEN direction while facing ${yaw.toFixed(2)}`,measured);
  check(Math.abs(angle(measured.face,measured.aim))<.16&&Math.max(...samples.map(s=>s.height))>.5,`overview ${key.toUpperCase()} keeps aim-facing and really hops at ${yaw.toFixed(2)}`,measured);
  if(yaw===0&&key==='a')await capture(page,'overview-left-hop-facing-down');
  if(yaw===0&&key==='w')await capture(page,'overview-backward-hop-facing-down');
 }
 for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2]){
  await fixture(page,{view:'chase3d',player:{x:0,z:6},yaw});
  await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(page,25);
  const before=await snapshot(page),viewBefore=await page.evaluate(()=>window.frogArcade.cameraYaw);
  await page.mouse.move(760,400);await frames(page,25);const after=await snapshot(page),viewAfter=await page.evaluate(()=>window.frogArcade.cameraYaw);
  check(Math.abs(angle(viewAfter,viewBefore))>.3&&Math.abs(angle(after.visualYaw,before.visualYaw))>.25&&Math.abs(angle(after.visualYaw,Math.atan2(after.player.aimX,after.player.aimZ)))<.08,`native mouse turns camera AND frog without a new shot at yaw ${yaw.toFixed(2)}`,{viewBefore,viewAfter,before:before.visualYaw,after:after.visualYaw});
  check(after.shots===before.shots&&near(after.reticle?.x,640)&&near(after.reticle?.y,400),`captured chase aim remains centred without autofiring at ${yaw.toFixed(2)}`,after.reticle);
  for(const [key,sx,sy] of keys){
   await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];g.keys.clear();Object.assign(p,{x:0,z:6,hop:0,height:0,idle:0,hopX:0,hopZ:0});g.cameraReady=false;g.updateCameraPose(0);});await frames(page,2);
   const basis=await page.evaluate(()=>{const g=window.frogArcade,e=g.camera.matrixWorld.elements;return {right:{x:e[0],z:e[2]},forward:{x:-e[8],z:-e[10]},start:{x:g.state.actors[0].x,z:g.state.actors[0].z}};});
   await page.keyboard.down(key);await frames(page,9,{bodyBounds:true});await page.keyboard.up(key);
   const now=await snapshot(page),dx=now.player.x-basis.start.x,dz=now.player.z-basis.start.z;
   const expected=sx?{x:basis.right.x*sx,z:basis.right.z*sx}:{x:-basis.forward.x*sy,z:-basis.forward.z*sy};
   check(dx*expected.x+dz*expected.z>.6&&Math.abs(dx*expected.z-dz*expected.x)<.02,`chase ${key.toUpperCase()} follows the rendered view after native rotation ${yaw.toFixed(2)}`,{dx,dz,expected});
   if(yaw===Math.PI&&key==='a')await capture(page,'chase-left-strafe-after-mouse-turn');
   if(yaw===Math.PI&&key==='s')await capture(page,'chase-backward-hop-after-mouse-turn');
  }
 }
 // Exercise native C, Escape, Resume and New Round, not just math fixtures.
 await page.keyboard.press('c');await frames(page,3);
 for(const action of ['switch','resume','new round']){
  if(action!=='switch'){
   await page.keyboard.press('Escape');await page.locator(action==='resume'?'#play-button':'#new-round-button').click();await frames(page,3);
  }
  let s=await snapshot(page);check(s.view==='overview'&&!s.locked,`${action}: overview does not retain chase pointer capture`,s.view);
  for(const [key,sx,sy] of keys){
   await page.keyboard.down(key);const input=await page.evaluate(()=>window.frogArcade.currentInput());await frames(page,1);await page.keyboard.up(key);
   check(near(input.mx,sx,1e-9)&&near(input.mz,sy,1e-9),`${action}: native ${key.toUpperCase()} keeps the overview axes`,{mx:input.mx,mz:input.mz});
  }
  s=await snapshot(page);check(oneOnFootReticle(s),`${action}: no aim line or stale artillery preview`,{reticle:s.reticle,artillery:s.artillery,path:s.pathLength});
 }
}
async function fallbackLook(){
 const fallback=await browser.newContext({viewport:{width:1280,height:800}});
 try{
  await fallback.addInitScript(()=>{
   localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0}));
   HTMLCanvasElement.prototype.requestPointerLock=function(){return Promise.reject(new DOMException('QA: denied native capture','NotAllowedError'));};
  });
  const page=await fallback.newPage();page.setDefaultTimeout(20000);page.on('pageerror',e=>report.errors.push('fallback: '+e.message));
  await page.route(new URL('/favicon.ico',url).href,route=>route.fulfill({status:204,body:''}));
  await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(()=>!!window.frogArcade);
  await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=structuredClone(g.state);window.qaEvents=[];});
  await page.locator('#new-round-button').click();await frames(page,3);await fixture(page,{view:'chase3d',player:{x:0,z:6}});
  await page.mouse.move(640,400);await frames(page,25);const before=await snapshot(page),yaw=await page.evaluate(()=>window.frogArcade.cameraYaw);
  await page.mouse.move(760,450);const samples=await frames(page,25);const after=await snapshot(page),turned=await page.evaluate(()=>window.frogArcade.cameraYaw);
  check(!after.locked&&Math.abs(angle(turned,yaw))>.3,'denied capture still permits native mouse camera rotation',{yaw,turned});
  check(samples.every(s=>near(s.reticle?.x,640)&&near(s.reticle?.y,400)),'fallback mouse-look uses one centred reticle instead of moving cursor AND camera',after.reticle);
  check(Math.abs(angle(after.visualYaw,before.visualYaw))>.25&&Math.abs(angle(after.visualYaw,Math.atan2(after.player.aimX,after.player.aimZ)))<.08,'fallback rotation turns the frog with its aim without firing',{before:before.visualYaw,after:after.visualYaw,shots:after.shots});
  await capture(page,'chase-fallback-centred-reticle');
  await page.keyboard.press('c');await frames(page,3);await pointAt(page,{x:5,z:6});const top=await snapshot(page);
  check(top.view==='overview'&&!near(top.reticle.x,640)&&oneOnFootReticle(top),'switching from fallback chase restores a freely positioned overview crosshair',top.reticle);
 }finally{await fallback.close();}
}
