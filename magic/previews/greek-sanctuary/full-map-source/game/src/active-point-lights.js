// A zero-intensity light contributes no colour, but Three still allocates a
// shader slot for it. Filtering is diagnostic-only: changing the number of
// lights while walking causes new NUM_POINT_LIGHTS shader variants and stalls.
// Default rendering keeps the original stable list. Explicit A/B callers may
// omit exact zero contributions and restore gameplay-owned scene visibility.
import {PointLight} from 'three';

export function createActivePointLights(renderer,{enabled:initialEnabled=false}={}) {
  const render=renderer.render,compile=renderer.compile;
  let enabled=!!initialEnabled;
  let buckets=[];
  const padding=[];
  const bucket=count=>buckets.find(size=>size>=count)??count;
  const stats={renders:0,omitted:0,maxOmitted:0,active:0,slots:0};
  function withActiveLights(scenes,action,count=false) {
    if(!enabled)return action();
    const hidden=[],seen=new Set(),added=[];
    let active=0;
    for(const scene of scenes)scene?.traverseVisible(light=>{
      if(!light.isPointLight||light.children.length||seen.has(light)||light.userData.magicLightSlot)return;
      seen.add(light);
      if(light.intensity!==0&&(light.color.r!==0||light.color.g!==0||light.color.b!==0)){active++;return;}
      hidden.push(light);light.visible=false;
    });
    const slots=bucket(active),target=scenes.find(scene=>scene?.isScene);
    // Reuse black lights to keep the diagnostic's program set small. Never
    // drop, dim or replace an active light; pads contribute exactly zero.
    if(target)for(let i=0;i<slots-active;i++){
      const light=padding[i]??=new PointLight(0,0);light.name='magic-zero-light-slot';light.userData.magicLightSlot=true;
      if(light.parent)continue;target.add(light);added.push(light);
    }
    if(count){stats.renders++;stats.omitted+=hidden.length;stats.maxOmitted=Math.max(stats.maxOmitted,hidden.length);stats.active=active;stats.slots=slots;}
    try{return action();}finally{for(const light of added)light.removeFromParent();for(const light of hidden)light.visible=true;}
  }
  function activeRender(scene,...args){return withActiveLights([scene],()=>render.call(this,scene,...args),true);}
  function activeCompile(scene,camera,targetScene,...args){return withActiveLights([scene,targetScene],()=>compile.call(this,scene,camera,targetScene,...args));}
  renderer.render=activeRender;
  if(compile)renderer.compile=activeCompile;
  return{
    setEnabled(value){enabled=!!value;},
    setBuckets(values=[]){if(values.some(n=>!Number.isInteger(n)||n<0))throw Error('Light buckets must be nonnegative integers');buckets=[...new Set(values)].sort((a,b)=>a-b);},
    preparationCounts(total){return [...new Set(Array.from({length:total+1},(_,n)=>bucket(n)))];},
    snapshot:()=>({enabled,buckets:[...buckets],...stats}),
    dispose(){if(renderer.render===activeRender)renderer.render=render;if(renderer.compile===activeCompile)renderer.compile=compile;}
  };
}
