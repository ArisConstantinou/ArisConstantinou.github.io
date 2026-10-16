// Asynchronous queries: never gl.finish(), readPixels(), or wait for the GPU.
// https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query_webgl2/
export function createGpuTimer(gl) {
  let ext, active=null, pending=[];
  const status={supported:false,reason:null,samples:0,discarded:0,skipped:0};
  try { ext=gl.getExtension('EXT_disjoint_timer_query_webgl2'); }
  catch(error) { status.reason=error.name+': '+error.message; }
  status.supported=!!ext;
  if(!ext)status.reason ||= 'Ο browser δεν εκθέτει EXT_disjoint_timer_query_webgl2.';
  function poll() {
    if(!ext)return;
    if(gl.isContextLost()){status.reason='Το WebGL context χάθηκε.';pending=[];active=null;return;}
    const disjoint=gl.getParameter(ext.GPU_DISJOINT_EXT);
    pending=pending.filter(({query,row})=>{
      const available=gl.getQueryParameter(query,gl.QUERY_RESULT_AVAILABLE);
      if(!available&&!disjoint)return true;
      if(disjoint)status.discarded++;
      else {const ms=gl.getQueryParameter(query,gl.QUERY_RESULT)/1e6;if(Number.isFinite(ms)&&ms>=0){row.gpuMs=ms;status.samples++;}}
      gl.deleteQuery(query);return false;
    });
  }
  return {
    status,poll,
    begin(){poll();if(!ext||gl.isContextLost()||active)return;if(pending.length>=8){status.skipped++;return;}active=gl.createQuery();if(active)gl.beginQuery(ext.TIME_ELAPSED_EXT,active);},
    end(row){if(!active)return;gl.endQuery(ext.TIME_ELAPSED_EXT);pending.push({query:active,row});active=null;},
    dispose(){if(active&&!gl.isContextLost()){gl.endQuery(ext.TIME_ELAPSED_EXT);gl.deleteQuery(active);}for(const p of pending)if(!gl.isContextLost())gl.deleteQuery(p.query);status.discarded+=pending.length;pending=[];active=null;}
  };
}
