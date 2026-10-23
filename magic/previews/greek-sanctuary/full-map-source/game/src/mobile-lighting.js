import {Material,ShaderChunk,ShaderLib} from 'three';
import {registerFragmentOnlySkinMaterial,registerPositionPreservingSkinMaterial,hasFragmentOnlySkinCallback} from './skinned-room-bounds.js';

// Mobile approximation using Three's normalized Blinn-Phong lighting. Keep the
// glTF colour, roughness and metalness maps and every real light/shadow. IBL is
// deliberately disabled by the explicit mobile profile, rather than emulated.
const wrappers=new WeakSet(),materials=new WeakSet();
const surface=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb * (1.0-metalnessFactor);
material.specularColor = mix(vec3(0.04),diffuseColor.rgb,metalnessFactor);
float mobileRoughness2 = max(roughnessFactor*roughnessFactor,0.125);
material.specularShininess = clamp(2.0/(mobileRoughness2*mobileRoughness2)-2.0,1.0,126.0);
material.specularStrength = 1.0;`;
export function applyMobileLighting(material,{model='phong'}={}){
 if(!material?.isMeshStandardMaterial||material.isMeshPhysicalMaterial||materials.has(material)||wrappers.has(material.onBeforeCompile))return;
 const original=material.onBeforeCompile,key=material.customProgramCacheKey;
 const baseKey=key===Material.prototype.customProgramCacheKey?original.toString():null;
 const safe=original===Material.prototype.onBeforeCompile||hasFragmentOnlySkinCallback(material,original);
 const wrapper=function(shader,...args){
  if(model==='lambert'){
   shader.vertexShader=ShaderLib.lambert.vertexShader;
   shader.fragmentShader=ShaderLib.lambert.fragmentShader;
   original.call(this,shader,...args);return;
  }
  original.call(this,shader,...args);
  // Advanced physical materials retain their original shader. These anchors
  // describe the pinned r180 StandardMaterial only; fail loudly on drift.
  for(const anchor of ['#include <lights_physical_pars_fragment>','#include <lights_physical_fragment>'])if(!shader.fragmentShader.includes(anchor))throw Error('Unsupported mobile lighting shader: '+anchor);
  shader.fragmentShader=shader.fragmentShader.replace('#include <lights_physical_pars_fragment>','#include <bsdfs>\n'+ShaderChunk.lights_phong_pars_fragment.replace('varying vec3 vViewPosition;','')).replace('#include <lights_physical_fragment>',surface);
 };
 materials.add(material);wrappers.add(wrapper);material.onBeforeCompile=wrapper;
 material.customProgramCacheKey=function(){return(baseKey??key.call(this))+':mobile-lighting-'+model+'-1';};
 if(safe){if(model==='lambert')registerPositionPreservingSkinMaterial(material);else registerFragmentOnlySkinMaterial(material);}
 material.needsUpdate=true;
}
