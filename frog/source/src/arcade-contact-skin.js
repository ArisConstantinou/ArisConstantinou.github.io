import{ShaderChunk,MeshDepthMaterial,MeshDistanceMaterial,RGBADepthPacking}from'three';
const clamp=v=>Math.max(0,Math.min(1,v));
// Two sets of weights share one surface. Ordinary frames keep the original
// geometry/material; only a contact transition reads both sets of bone matrices.
function patch(shader,blend){
 shader.uniforms.contactSkinBlend=blend;
 shader.vertexShader='uniform float contactSkinBlend; attribute vec4 baseSkinIndex; attribute vec4 baseSkinWeight; attribute float contactCap; varying float vContactCap;\n'+shader.vertexShader;
 shader.fragmentShader='uniform float contactSkinBlend; varying float vContactCap;\n'+shader.fragmentShader;
 const base=`${ShaderChunk.skinbase_vertex}
 vContactCap=contactCap;
 #ifdef USE_SKINNING
 mat4 baseMatX=mat4(0.0),baseMatY=mat4(0.0),baseMatZ=mat4(0.0),baseMatW=mat4(0.0);
 mat4 contactBaseSkin=mat4(0.0);
 if(contactSkinBlend<0.99999){baseMatX=getBoneMatrix(baseSkinIndex.x);baseMatY=getBoneMatrix(baseSkinIndex.y);baseMatZ=getBoneMatrix(baseSkinIndex.z);baseMatW=getBoneMatrix(baseSkinIndex.w);contactBaseSkin=baseSkinWeight.x*baseMatX+baseSkinWeight.y*baseMatY+baseSkinWeight.z*baseMatZ+baseSkinWeight.w*baseMatW;}
 #endif`;
 shader.vertexShader=shader.vertexShader.replace('#include <skinbase_vertex>',base);
 shader.vertexShader=shader.vertexShader.replace('#include <skinnormal_vertex>',ShaderChunk.skinnormal_vertex.replace('skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;','if(contactSkinBlend<0.99999)skinMatrix=contactBaseSkin*(1.0-contactSkinBlend)+skinMatrix*contactSkinBlend;\n skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;'));
 shader.vertexShader=shader.vertexShader.replace('#include <skinning_vertex>',ShaderChunk.skinning_vertex.replace('transformed = ( bindMatrixInverse * skinned ).xyz;',`if(contactSkinBlend<0.99999){vec4 baseline=vec4(0.0);baseline+=baseMatX*skinVertex*baseSkinWeight.x;baseline+=baseMatY*skinVertex*baseSkinWeight.y;baseline+=baseMatZ*skinVertex*baseSkinWeight.z;baseline+=baseMatW*skinVertex*baseSkinWeight.w;skinned=mix(baseline,skinned,contactSkinBlend);}
 transformed = ( bindMatrixInverse * skinned ).xyz;`));
 // Cap-only vertices close the separating limb surfaces in the same draw.
 // At exactly zero they are hidden to preserve the original surface image.
 const marker='#include <clipping_planes_fragment>';if(!shader.fragmentShader.includes(marker))throw Error('Missing contact cap shader hook');
 shader.fragmentShader=shader.fragmentShader.replace(marker,marker+'\n if(vContactCap>0.5&&contactSkinBlend<=0.0)discard;');
}
export function createContactSkinBlend(mesh,derived){
 if(Array.isArray(mesh.material)||!derived.getAttribute('baseSkinIndex')||!derived.getAttribute('contactCap'))throw Error('Contact skin data missing');
 const original={geometry:mesh.geometry,material:mesh.material,depth:mesh.customDepthMaterial,distance:mesh.customDistanceMaterial},blend={value:0},material=original.material.clone(),depth=new MeshDepthMaterial({depthPacking:RGBADepthPacking}),distance=new MeshDistanceMaterial();let active=false,disposed=false;
 for(const m of[material,depth,distance]){m.onBeforeCompile=shader=>patch(shader,blend);m.customProgramCacheKey=()=>`frog-contact-skin-v2:${m.type}`;}
 return{get active(){return active;},original,derived,material,depth,distance,blend,
  activate(){if(disposed)throw Error('Disposed contact skin');active=true;mesh.geometry=derived;mesh.material=material;mesh.customDepthMaterial=depth;mesh.customDistanceMaterial=distance;},
  setBlend(value){blend.value=clamp(value);material.color.copy(original.material.color);material.emissive.copy(original.material.emissive);material.emissiveIntensity=original.material.emissiveIntensity;},
  restore(){mesh.geometry=original.geometry;mesh.material=original.material;mesh.customDepthMaterial=original.depth;mesh.customDistanceMaterial=original.distance;active=false;},
  dispose({keepPrograms=false}={}){if(disposed)return;this.restore();disposed=true;if(!keepPrograms)for(const m of[material,depth,distance])m.dispose();}
 };
}
