// Bounded, local measurements of real frames. No synthetic frames, quality
// changes, synchronous GPU waits, network requests or external telemetry.
export function createFrameDiagnostics({version,details=()=>null,clock=()=>performance.now(),storage=()=>globalThis.localStorage,schedule=(fn,ms)=>setTimeout(fn,ms),cancel=id=>clearTimeout(id),capacity=180}={}){
 const rows=[],early=[],events=[],gpu=[],fences=[];let current=null,lastRaf=null,windowStart=null,intervals=0,intervalTotal=0,frames=0,sums={},maxWork=0,highSeen=false,lowWindows=0,drop=null,run=0,gl=null,ext=null,query=null,pendingQuery=null,nextGpu=0,fence=null,timer=null,disposed=false,enabled=true;
 const addEvent=(type)=>{const previous=events.at(-1);if(previous?.type===type){previous.lastAt=clock();previous.occurrences=(previous.occurrences||1)+1;return;}events.push({type,at:clock()});if(events.length>40)events.shift();};
 const sum=(key,value)=>{sums[key]=(sums[key]||0)+value;};
 const resetWindow=()=>{windowStart=null;intervals=intervalTotal=frames=maxWork=0;sums={};};
 const stopFence=()=>{if(timer!==null)cancel(timer);timer=null;if(fence){try{gl.deleteSync(fence.sync);}catch{}fence=null;}};
 const stopGpu=()=>{stopFence();if(gl){try{if(query){gl.endQuery(ext.TIME_ELAPSED_EXT);gl.deleteQuery(query);}if(pendingQuery)gl.deleteQuery(pendingQuery);}catch{}}query=pendingQuery=null;};
 function suspend(){current=null;lastRaf=null;lowWindows=0;resetWindow();stopGpu();}
 function resetGpuContext(){stopGpu();gl=null;ext=null;nextGpu=0;}
 function gap(type){addEvent(type);if(type==='texture-preparation'){current=null;stopGpu();return;}suspend();if(type==='context-lost')resetGpuContext();}
 let canvas=null;
 const contextLost=()=>gap('context-lost'),contextRestored=()=>{resetGpuContext();addEvent('context-restored');};
 function sampleFence(){
  timer=null;if(!fence||disposed)return;
  if(gl.isContextLost()){stopFence();return;}
  const elapsed=clock()-fence.start,result=gl.clientWaitSync(fence.sync,0,0);fence.polls++;
  if(result===gl.ALREADY_SIGNALED||result===gl.CONDITION_SATISFIED){fences.push({at:fence.start,completionUpperBoundMs:elapsed,polls:fence.polls});if(fences.length>capacity)fences.shift();stopFence();}
  else if(result===gl.WAIT_FAILED||fence.polls>=10){fences.push({at:fence.start,completionUpperBoundMs:null,lastPollMs:elapsed,polls:fence.polls,status:result===gl.WAIT_FAILED?'wait-failed':'pending-at-poll-limit'});if(fences.length>capacity)fences.shift();stopFence();}
  else timer=schedule(sampleFence,4);
 }
 function beginGpu(renderer){
  if(!current||disposed)return;
  if(renderer.domElement&&renderer.domElement!==canvas){canvas?.removeEventListener('webglcontextlost',contextLost);canvas?.removeEventListener('webglcontextrestored',contextRestored);canvas=renderer.domElement;canvas.addEventListener('webglcontextlost',contextLost);canvas.addEventListener('webglcontextrestored',contextRestored);}
  const context=renderer.getContext();if(context!==gl){stopGpu();gl=context;ext=gl.getExtension('EXT_disjoint_timer_query_webgl2');}
  if(gl.isContextLost())return;
  if(pendingQuery){
   if(gl.getParameter(ext.GPU_DISJOINT_EXT)){gl.deleteQuery(pendingQuery);pendingQuery=null;}
   else if(gl.getQueryParameter(pendingQuery,gl.QUERY_RESULT_AVAILABLE)){gpu.push({at:clock(),ms:gl.getQueryParameter(pendingQuery,gl.QUERY_RESULT)/1e6});if(gpu.length>capacity)gpu.shift();gl.deleteQuery(pendingQuery);pendingQuery=null;}
  }
  if(clock()<nextGpu||query||pendingQuery||fence)return;
  nextGpu=clock()+1000;
  if(ext&&!gl.getQuery(ext.TIME_ELAPSED_EXT,gl.CURRENT_QUERY)){query=gl.createQuery();if(query)gl.beginQuery(ext.TIME_ELAPSED_EXT,query);}
  // Even where timer queries are unavailable (including many iOS contexts),
  // an asynchronous fence bounds completion of submitted work. Timer delay
  // is part of this bound: it is NOT a GPU duration or presentation timestamp.
  current.fenceSample=true;
 }
 function endGpu(){
  if(query){gl.endQuery(ext.TIME_ELAPSED_EXT);pendingQuery=query;query=null;}
  if(current?.fenceSample&&!fence&&!gl.isContextLost()&&typeof gl.fenceSync==='function'){
   const sync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);if(sync){fence={sync,start:clock(),polls:0};timer=schedule(sampleFence,4);}
  }
 }
 function begin(raf){
  if(disposed||!enabled)return;
  const start=clock();current={start,mark:start};
  if(lastRaf!==null&&raf>lastRaf){intervals++;intervalTotal+=raf-lastRaf;}lastRaf=raf;windowStart??=start;
 }
 function mark(name){if(!current)return;const now=clock();sum(name,now-current.mark);current.mark=now;}
 function finish(render){
  if(!current)return;
  const now=clock(),work=now-current.start;sum('render',now-current.mark);sum('work',work);sum('calls',render.calls);sum('triangles',render.triangles);maxWork=Math.max(maxWork,work);frames++;current=null;
  if(now-windowStart<1000||!intervals)return;
  let extra;try{extra=details();}catch{extra={detailsUnavailable:true};}
  const row={run,at:now,fps:1000*intervals/intervalTotal,frameIntervalMs:intervalTotal/intervals,frames,workMaxMs:maxWork,mean:Object.fromEntries(Object.entries(sums).map(([k,v])=>[k,v/frames])),details:extra};
  rows.push(row);if(rows.length>capacity)rows.shift();if(early.length<12)early.push(row);
  if(row.fps>=50)highSeen=true;
  // Capture the observed sustained 60 -> 39-40 FPS idle regression too.
  // Three consecutive windows still distinguish it from a short stall.
  lowWindows=highSeen&&row.fps<45?lowWindows+1:0;
  if(lowWindows>=3&&!drop){
   drop={observedAt:now,reason:'observed-60-to-low-cadence-transition',cause:'unconfirmed',rows:rows.slice(-15),early:early.slice()};
   // Writing after the frame keeps storage/serialization outside its work
   // measurement. One bounded report is saved per play session.
   schedule(()=>{if(disposed)return;try{storage()?.setItem('magic-performance:last-drop',JSON.stringify(report()));}catch{}},0);
  }
  resetWindow();
 }
 function report(){let previousDrop=null;try{const raw=storage()?.getItem?.('magic-performance:last-drop');if(raw&&raw.length<1000000){const old=JSON.parse(raw);if(old.schema===1&&old.drop)previousDrop={version:old.version,createdAt:old.createdAt,drop:old.drop};}}catch{}return{schema:1,version,run,enabled,userAgent:globalThis.navigator?.userAgent??null,createdAt:new Date().toISOString(),limits:['CPU work measures JavaScript and driver submission, not total CPU utilization.','GPU query time is available only where supported; fence completion is an upper bound including timer scheduling, not GPU duration.','Frame cadence is not independent physical display presentation.','These measurements do not establish thermal throttling, low power mode or a browser cap.'],gpuTimerAvailable:!!ext,rows:rows.slice(),early:early.slice(),drop,previousDrop,events:events.slice(),gpu:gpu.slice(),fences:fences.slice()};}
 function startRun(){suspend();rows.length=early.length=gpu.length=fences.length=0;highSeen=false;drop=null;run++;addEvent('run-start');}
 const visibility=()=>gap(globalThis.document.hidden?'document-hidden':'document-visible');globalThis.document?.addEventListener('visibilitychange',visibility);
 return{begin,mark,finish,beginGpu,endGpu,suspend,gap,startRun,report,note:addEvent,setEnabled(value){enabled=!!value;suspend();},dispose(){disposed=true;suspend();canvas?.removeEventListener('webglcontextlost',contextLost);canvas?.removeEventListener('webglcontextrestored',contextRestored);globalThis.document?.removeEventListener('visibilitychange',visibility);}};
}

export function downloadFrameReport(report,{document=globalThis.document,URL=globalThis.URL,schedule=setTimeout}={}){
 const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');
 link.href=url;link.download=`magic-${report.version}-performance.json`;link.hidden=true;document.body.append(link);link.click();link.remove();schedule(()=>URL.revokeObjectURL(url),30000);
}
