async function nativeDirections(page){
 async function move(key,label,picture=false){
  await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0];window.qaFixedCamera=g.camera.clone();window.qaInitial={x:p.x,z:p.z};window.qaInitialPixel=g.focus.clone().set(p.x,g.ground(p.x,p.z),p.z).project(window.qaFixedCamera);});
  await page.keyboard.down(key);const hops=await frames(page,8);if(picture)await capture(page,label);await frames(page,4);await page.keyboard.up(key);
  const result=await page.evaluate(()=>{const g=window.frogArcade,p=g.state.actors[0],end=g.focus.clone().set(p.x,g.ground(p.x,p.z),p.z).project(window.qaFixedCamera);return {dx:p.x-qaInitial.x,dz:p.z-qaInitial.z,screenX:(end.x-qaInitialPixel.x)*g.w/2,screenY:-(end.y-qaInitialPixel.y)*g.h/2,view:g.viewMode,yaw:g.cameraYaw};});
  const correct={w:result.screenY< -2,s:result.screenY>2,a:result.screenX< -2,d:result.screenX>2}[key];
  check(correct&&hops.some(p=>p.height>.2),label+': native key moves and hops in its actual screen direction',result);await frames(page,24);
 }
 for(const face of [0,Math.PI/2,Math.PI,-Math.PI/2])for(const key of ['w','a','s','d']){
  await fixture(page,{view:'overview',yaw:face});
  await page.evaluate(face=>{const g=window.frogArcade,p=g.state.actors[0];p.poseAimYaw=face;g.models[0].group.rotation.y=face;},face);
  await move(key,'overview-facing-'+face.toFixed(2)+'-'+key,face===Math.PI);
 }
 await fixture(page,{view:'chase3d'});await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(page,24);
 let before=await page.evaluate(()=>window.frogArcade.cameraYaw);await page.mouse.move(760,400);await frames(page,24);
 let after=await page.evaluate(()=>window.frogArcade.cameraYaw),state=await snapshot(page);
 check(Math.abs(angle(after,before)+.48)<.015,'locked native mouse movement turns the camera exactly once',{before,after});
 check(state.reticle?.x===640&&state.reticle?.y===400&&Math.abs(angle(state.visualYaw,Math.atan2(state.player.aimX,state.player.aimZ)))<.03,'third-person body and center reticle follow the new view without a new shot',state);
 let total=0,x=760;
 for(let i=0;i<18;i++){before=after;x+=100;await page.mouse.move(x,400);await frames(page,2);after=await page.evaluate(()=>window.frogArcade.cameraYaw);total+=angle(after,before);}
 check(Math.abs(total+7.2)<.03,'native mouse rotation continues beyond a complete 360-degree turn',total);
 for(const degrees of [90,180,270]){
  await fixture(page,{view:'chase3d'});await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(page,20);
  await page.mouse.move(640+degrees*Math.PI/180/.004,400);await frames(page,3);await page.keyboard.press('c');await frames(page,3);
  for(const key of ['w','a','s','d'])await move(key,'overview-after-native-'+degrees+'-degree-turn-'+key);
  await page.keyboard.press('Escape');await page.locator('#play-button').click();await frames(page,3);
  for(const key of ['w','a','s','d'])await move(key,'overview-resume-after-'+degrees+'-degree-turn-'+key);
 }
 await page.keyboard.press('Escape');await page.locator('#new-round-button').click();await frames(page,3);
 if((await snapshot(page)).view!=='overview'){await page.keyboard.press('c');await frames(page,3);}
 for(const key of ['w','a','s','d'])await move(key,'overview-new-round-'+key);
 for(const key of ['w','a','s','d']){
  await fixture(page,{view:'chase3d'});await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(page,30);
  await move(key,'third-person-directional-hop-'+key,true);
 }
 await fixture(page,{view:'chase3d'});await page.mouse.click(640,400);await page.waitForFunction(()=>!!document.pointerLockElement);await frames(page,24);
 await page.evaluate(()=>Object.assign(window.frogArcade.state.actors[1],{x:0,z:27,ko:false,eliminated:false,shot:9999,idle:9999,tongue:9999,kickCooldown:9999,machineTimer:9999}));await frames(page,2);
 const visible=()=>{const g=window.frogArcade,a=g.state.actors[1],q=g.project(a.x,g.ground(a.x,a.z)+.45,a.z);return q.visible&&q.x>=0&&q.x<=g.w&&q.y>=0&&q.y<=g.h;};
 const wasVisible=await page.evaluate(visible);await page.mouse.move(640+Math.PI/.004,400);await frames(page,30);
 check(!wasVisible&&await page.evaluate(visible),'a native mouse half-turn reveals an enemy behind the starting camera');await capture(page,'third-person-enemy-revealed');
}

async function fallbackControls(){
 for(const mode of ['denied','pending']){
  const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});
  try{
   await ctx.addInitScript(mode=>{
    localStorage.setItem('frog-arcade-settings-v1',JSON.stringify({quality:'low',volume:0,touchFireMode:'manual'}));
    HTMLCanvasElement.prototype.requestPointerLock=function(){return mode==='denied'?Promise.reject(new Error('QA: native capture denied')):new Promise(()=>{});};
   },mode);
   const page=await ctx.newPage();page.on('pageerror',error=>report.errors.push(mode+': '+error.message));
   await page.route(new URL('/favicon.ico',url).href,route=>route.fulfill({status:204,body:''}));
   await page.goto(url.href,{waitUntil:'networkidle',timeout:180000});await page.waitForFunction(v=>window.__FROG__?.version===v,version,{timeout:180000});
   await page.evaluate(()=>{const g=window.frogArcade;g.renderer.setAnimationLoop(null);window.qaFresh=structuredClone(g.state);window.qaEvents=[];});
   await fixture(page,{view:'chase3d'});await page.mouse.move(400,400);await frames(page,1);
   const before=await page.evaluate(()=>window.frogArcade.cameraYaw);await page.mouse.click(400,400);await frames(page,2);await page.mouse.move(520,400);await frames(page,24);
   const after=await page.evaluate(()=>window.frogArcade.cameraYaw),state=await snapshot(page);
   check(!state.locked&&Math.abs(angle(after,before)+.48)<.015,mode+' native capture still gives one displacement-based turn',{before,after});
   check(state.reticle?.x===640&&state.reticle?.y===400&&Math.abs(angle(state.visualYaw,Math.atan2(state.player.aimX,state.player.aimZ)))<.03,mode+' capture keeps the body, center crosshair and shot aim aligned',state);
   await capture(page,'third-person-capture-'+mode);
  }finally{await ctx.close();}
 }
}
