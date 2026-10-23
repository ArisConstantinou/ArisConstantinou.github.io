// A zero-intensity light contributes no colour, but Three still allocates a
// shader slot for it. Filtering is diagnostic-only: changing the number of
// lights while walking causes new NUM_POINT_LIGHTS shader variants and stalls.
// Default rendering keeps the original stable list. Explicit A/B callers may
// omit exact zero contributions and restore gameplay-owned scene visibility.
export function createActivePointLights(renderer,{enabled:initialEnabled=false}={}) {
  const render=renderer.render,compile=renderer.compile;
  let enabled=!!initialEnabled;
  const stats={renders:0,omitted:0,maxOmitted:0};
  function withActiveLights(scenes,action,count=false) {
    if(!enabled)return action();
    const hidden=[],seen=new Set();
    for(const scene of scenes)scene?.traverseVisible(light=>{
      if(!light.isPointLight||light.children.length||seen.has(light))return;
      seen.add(light);
      if(light.intensity!==0&&(light.color.r!==0||light.color.g!==0||light.color.b!==0))return;
      hidden.push(light);light.visible=false;
    });
    if(count){stats.renders++;stats.omitted+=hidden.length;stats.maxOmitted=Math.max(stats.maxOmitted,hidden.length);}
    try{return action();}finally{for(const light of hidden)light.visible=true;}
  }
  function activeRender(scene,...args){return withActiveLights([scene],()=>render.call(this,scene,...args),true);}
  function activeCompile(scene,camera,targetScene,...args){return withActiveLights([scene,targetScene],()=>compile.call(this,scene,camera,targetScene,...args));}
  renderer.render=activeRender;
  if(compile)renderer.compile=activeCompile;
  return{
    setEnabled(value){enabled=!!value;},
    snapshot:()=>({enabled,...stats}),
    dispose(){if(renderer.render===activeRender)renderer.render=render;if(renderer.compile===activeCompile)renderer.compile=compile;}
  };
}
