// A zero-intensity light contributes no colour, but Three still allocates a
// shader slot for it. Omit only those exact zero contributions during render
// and compilation; restore the gameplay-owned scene immediately afterwards.
export function createActivePointLights(renderer) {
  const render=renderer.render,compile=renderer.compile;
  let enabled=true;
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
