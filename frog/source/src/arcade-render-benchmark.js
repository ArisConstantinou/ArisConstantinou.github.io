export function summarizeRenderBenchmark(work,intervals){
 const stat=values=>{const a=values.filter(x=>Number.isFinite(x)&&x>0).sort((x,y)=>x-y);return a.length?{mean:a.reduce((x,y)=>x+y,0)/a.length,p95:a[Math.min(a.length-1,Math.floor(a.length*.95))],max:a.at(-1)}:null;};
 const w=stat(work),dt=stat(intervals);return {workMeanMs:w?.mean??null,workP95Ms:w?.p95??null,workMaxMs:w?.max??null,fps:dt?1000/dt.mean:null,samples:work.length};
}
export function runRenderBenchmark(game){
 const readSave=()=>{try{return localStorage.getItem('frog-arcade-save-v1');}catch{return undefined;}},saved=readSave();
 game.persist=()=>false;game.renderer.setAnimationLoop(null);game.clearInputs();game.releaseMouseLook();game.sound.pause();game.running=false;game.mode='benchmark';game.ui.style.display='none';game.labels.style.display='none';
 const s=game.state;s.phase='battle';s.intro=0;s.guards=[];s.bullets=[];s.shells=[];
 for(let i=0;i<s.actors.length;i++)Object.assign(s.actors[i],{x:i===0?0:i===1?-4:4,z:i===0?8:10,height:0,flight:null,support:null,hop:0,hopX:0,hopZ:0,ko:false,eliminated:false,catapultId:null,dizzyTime:0,shot:0,kick:0,aiming:false,poseAiming:false,poseAimYaw:null,face:Math.PI,spawnShield:0});
 game.buildActors();game.viewMode='chase3d';game.cameraYaw=0;game.cameraPitch=.35;game.cameraReady=false;game.updateCameraPose(0);
 const panel=document.createElement('section');panel.id='render-benchmark';panel.setAttribute('aria-live','polite');panel.style.cssText='position:fixed;z-index:70;left:50%;bottom:18px;transform:translateX(-50%);box-sizing:border-box;width:min(92vw,490px);padding:16px;border:1px solid #b5d8ac;border-radius:16px;background:#163d33f5;color:#efffdc;font:16px/1.4 system-ui;text-align:center;box-shadow:0 5px 25px #102b2540';
 const back=new URL(location.href);back.searchParams.delete('benchmark');panel.innerHTML='<strong>Σύγκριση χρόνου σχεδίασης</strong><p data-progress>Προθέρμανση…</p><p style="font-size:14px">Μετρά εργασία CPU + GPU, χωριστά από την αναμονή της οθόνης. Δεν αλλάζει το αποθηκευμένο παιχνίδι.</p><button data-copy disabled style="font:inherit;padding:8px 14px">Αντιγραφή αποτελέσματος</button> <a style="color:#efffdc;font-size:14px" href="'+back.href+'">Πίσω στο παιχνίδι</a>';document.body.append(panel);
 const work=[],intervals=[];let frame=0,last=null;
 const render=now=>{
  if(document.hidden){last=null;return;}const previous=last;last=now;game.performanceMeter?.begin(now);
  const start=performance.now();game.elapsed=frame/60;game.renderActors(1/60);game.renderFlies();game.basesView.update(1/60);game.artilleryView.update(1/60);game.guardsView.update(1/60);game.battlegroundView.update(1/60);game.world.update(1/60,game.elapsed,1,game.models[0].group.position);game.visualUpgrade?.update(1/60);game.renderer.render(game.scene,game.camera);game.renderer.getContext().finish();const cost=performance.now()-start;game.performanceMeter?.end(performance.now());
  if(frame>=60){work.push(cost);if(previous!==null)intervals.push(now-previous);}frame++;
  if(frame%30===0)panel.querySelector('[data-progress]').textContent=frame<60?'Προθέρμανση…':'Μέτρηση '+Math.min(180,frame-60)+' / 180';
  if(frame>=240){game.renderer.setAnimationLoop(null);const gl=game.renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info'),result={...summarizeRenderBenchmark(work,intervals),version:game.inspect().version,mode:game.graphicsSample?'sample':game.graphicsOptimized?'optimized':'original',quality:game.settings.quality,canvas:[game.renderer.domElement.width,game.renderer.domElement.height],savePreserved:saved===undefined?null:readSave()===saved,gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),userAgent:navigator.userAgent};window.frogBenchmark=result;panel.querySelector('[data-progress]').innerHTML='<b>Εργασία καρέ: '+result.workMeanMs.toFixed(2)+' ms</b><br>p95 '+result.workP95Ms.toFixed(2)+' ms · '+Math.round(result.fps)+' FPS';const copy=panel.querySelector('[data-copy]');copy.disabled=false;copy.onclick=()=>navigator.clipboard.writeText(JSON.stringify(result,null,2));}
 };
 game.renderer.setAnimationLoop(render);
}
