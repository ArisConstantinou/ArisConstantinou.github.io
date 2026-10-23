// Temporary, explicit mobile trade-off: preserve colour/roughness/metalness,
// lights and geometry, but omit normal/bump perturbation before shader warming.
// Source textures are retained by their asset owners; this never disposes them.
import {applyMobileLighting} from './mobile-lighting.js';
export function installMobileMaterialProfile(renderer,{normalMaps=true,lighting='pbr'}={}){
 if(normalMaps&&lighting==='pbr')return;
 function material(m){
  if(lighting!=='pbr')applyMobileLighting(m,{model:lighting});
  if(!normalMaps&&m?.isMeshStandardMaterial&&(m.normalMap||m.bumpMap)){
   m.normalMap=null;m.bumpMap=null;m.needsUpdate=true;
  }
 }
 function root(object,visible=false){object?.[visible?'traverseVisible':'traverse'](o=>{for(const m of Array.isArray(o.material)?o.material:[o.material])material(m);});}
 for(const name of ['compile','compileAsync']){
  const original=renderer[name];if(!original)continue;
  renderer[name]=function(object,...args){root(object);return original.call(this,object,...args);};
 }
 // A cached interior clone copies its source every frame. Apply the profile
 // to visible source materials before those copies, including newly chosen LODs.
 const render=renderer.render;
 if(render)renderer.render=function(object,...args){root(object,true);return render.call(this,object,...args);};
 // Spawned actors and material clones must follow the same profile even if
 // they enter after the initial loading traversal.
 const direct=renderer.renderBufferDirect;
 renderer.renderBufferDirect=function(camera,scene,geometry,m,...args){material(m);return direct.call(this,camera,scene,geometry,m,...args);};
}
