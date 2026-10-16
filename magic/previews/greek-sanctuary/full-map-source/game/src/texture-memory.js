import {Texture,Frustum,Matrix4} from 'three';

// Keep the original encoded image. Decode only while uploading it, then close
// the CPU bitmap. Source dimensions survive for shaders, clones and restoration.
const entries=new WeakMap(),registeredLoaders=new WeakSet();
const prepared=new WeakMap();
const materialMaps=new WeakMap();
let jobs=Promise.resolve(),decodedBytes=0,peakDecodedBytes=0,encodedBytes=0,uploads=0;
export function imageDimensions(bytes){
 const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 if(bytes.length>=24&&view.getUint32(0)===0x89504e47&&view.getUint32(4)===0x0d0a1a0a)return{width:view.getUint32(16),height:view.getUint32(20)};
 if(bytes[0]===0xff&&bytes[1]===0xd8){
  let at=2;
  while(at+4<=bytes.length){if(bytes[at++]!==0xff)continue;while(bytes[at]===0xff)at++;const marker=bytes[at++];if(marker===0xd9||marker===0xda)break;if(marker===0x01||marker>=0xd0&&marker<=0xd7)continue;
   const length=view.getUint16(at);if(length<2||at+length>bytes.length)break;
   if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker))return{height:view.getUint16(at+3),width:view.getUint16(at+5)};
   at+=length;
  }
 }
 return null;
}
export async function encodedTexture(blob,{flipY=false,decode=globalThis.createImageBitmap}={}){
 if(typeof decode!=='function')throw Error('Ο browser δεν υποστηρίζει την αποκωδικοποίηση υφών του MAGIC.');
 let size=imageDimensions(new Uint8Array(await blob.slice(0,65536).arrayBuffer()));
 if(!size){const bitmap=await decode(blob,{colorSpaceConversion:'none',premultiplyAlpha:'none'});size={width:bitmap.width,height:bitmap.height};bitmap.close();}
 if(!(size.width>0&&size.height>0))throw Error('Invalid texture dimensions');
 const texture=new Texture(size);texture.flipY=flipY;texture.source.dataReady=false;texture.needsUpdate=true;
 entries.set(texture.source,{blob,size,decode});encodedBytes+=blob.size;
 return texture;
}
/** Preserve GLTFLoader's sampler, UV, material and colour-space processing. */
export function deferGltfImages(loader){
 if(registeredLoaders.has(loader))return;registeredLoaders.add(loader);
 loader.register(parser=>{
  const pending=new Map();
  parser.loadImageSource=(index)=>{
   if(pending.has(index))return pending.get(index).then(t=>t.clone());
   const job=(async()=>{const definition=parser.json.images[index];let blob;
    if(definition.bufferView!==undefined)blob=new Blob([await parser.getDependency('bufferView',definition.bufferView)],{type:definition.mimeType});
    else{const response=await fetch(new URL(definition.uri,parser.options.path).href);if(!response.ok)throw Error('Texture HTTP '+response.status);blob=await response.blob();}
    const texture=await encodedTexture(blob);texture.userData={...definition.extras,mimeType:definition.mimeType||blob.type};return texture;
   })();pending.set(index,job);return job;
  };
  return{name:'MAGIC_encoded_images'};
 });
}
export function textureIsReady(renderer,texture){
 if(!entries.has(texture.source))return true;
 const properties=renderer.properties.get(texture),proof=prepared.get(renderer)?.get(texture);
 return !!proof&&proof.handle===properties.__webglTexture&&proof.version===texture.version&&properties.__version===texture.version;
}
export function prepareEncodedTexture(renderer,texture,upload=t=>renderer.initTexture(t)){
 const entry=entries.get(texture.source);if(!entry)return upload(texture);
 const run=async()=>{
  if(textureIsReady(renderer,texture))return;
  if(renderer.getContext?.().isContextLost())throw Error('Χάθηκε η σύνδεση γραφικών κατά τη φόρτωση.');
  const bitmap=await entry.decode.call(globalThis,entry.blob,{imageOrientation:texture.flipY?'flipY':'none',colorSpaceConversion:'none',premultiplyAlpha:'none'});
  const bytes=entry.size.width*entry.size.height*4;decodedBytes+=bytes;peakDecodedBytes=Math.max(peakDecodedBytes,decodedBytes);
  texture.source.data=bitmap;texture.source.dataReady=true;
  try{
   texture.needsUpdate=true;
   await upload(texture);uploads++;
   if(!prepared.has(renderer))prepared.set(renderer,new WeakMap());
   prepared.get(renderer).set(texture,{version:texture.version,handle:renderer.properties.get(texture).__webglTexture});
  }
  finally{texture.source.data=entry.size;texture.source.dataReady=false;bitmap.close();decodedBytes-=bytes;}
 };
 const job=jobs.then(run);jobs=job.catch(()=>{});return job;
}
export function visibleEncodedTextures(root,camera,renderer){
 const textures=new Set();
 const needs=value=>value?.isTexture&&entries.has(value.source)&&(!renderer||!textureIsReady(renderer,value));
 const collect=value=>{if(needs(value))textures.add(value);};
 if(!renderer)root.updateMatrixWorld?.();camera?.updateMatrixWorld();
 const frustum=camera?new Frustum().setFromProjectionMatrix(new Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse)):null;
 const missingByMaterial=new Map();
 function missing(material){
  if(missingByMaterial.has(material))return missingByMaterial.get(material);
  let cached=materialMaps.get(material);
  if(!cached||cached.version!==material.version||cached.keys.some(([key,value])=>material[key]!==value)){
   const keys=Object.entries(material).filter(([key,value])=>key.endsWith('Map')||key==='map'||value?.isTexture);
   cached={version:material.version,keys};materialMaps.set(material,cached);
  }
  const maps=[...cached.keys.map(([,value])=>value),...(material.textureDependencies||[]),...Object.values(material.uniforms||{}).map(u=>u.value)].filter(needs);
  missingByMaterial.set(material,maps);return maps;
 }
 root.traverseVisible(object=>{if(!object.material)return;
  const materials=Array.isArray(object.material)?object.material:[object.material];
  if(!materials.some(m=>m.visible&&missing(m).length))return;
  if(renderer)object.updateWorldMatrix(true,false);
  const visible=!frustum||object.layers.test(camera.layers)&&(object.frustumCulled===false||(object.isSprite?frustum.intersectsSprite(object):frustum.intersectsObject(object)));
  for(const material of materials){
  if(!material.visible)continue;
  if(visible)for(const texture of missing(material))textures.add(texture);
  else if(object.castShadow){collect(material.displacementMap);collect(material.map);collect(material.alphaMap);}
 }});
 return [...textures];
}
const gates=new WeakMap();
function createSceneGate(renderer,root){
 const candidates=new Map(),pending=new Set(),lights=new Set();
 function watch(object){
  object.addEventListener('childadded',added);object.addEventListener('childremoved',removed);
  if(object.isLight&&object.shadow)lights.add(object);
  if(object.material){const materials=Array.isArray(object.material)?object.material:[object.material],rows=[];
   for(const material of materials){const maps=[...Object.values(material),...(material.textureDependencies||[]),...Object.values(material.uniforms||{}).map(u=>u.value)].filter(t=>t?.isTexture&&entries.has(t.source));if(maps.length)rows.push({material,maps});}
   if(rows.length){candidates.set(object,rows);pending.add(object);}
  }
  for(const child of object.children)watch(child);
 }
 function unwatch(object){object.removeEventListener('childadded',added);object.removeEventListener('childremoved',removed);candidates.delete(object);pending.delete(object);lights.delete(object);for(const child of object.children)unwatch(child);}
 function added(event){watch(event.child)}function removed(event){unwatch(event.child)}
 const invalidate=()=>{for(const object of candidates.keys())pending.add(object);};
 renderer.domElement?.addEventListener('webglcontextrestored',invalidate);
 watch(root);
 const matrix=new Matrix4(),frustum=new Frustum(),shadowFrustums=[];
 return camera=>{
  const result=new Set();if(!pending.size)return [];
  camera?.updateMatrixWorld();if(camera)frustum.setFromProjectionMatrix(matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
  let shadowCount=0;
  for(const light of lights){if(!light.visible||!light.castShadow)continue;light.updateWorldMatrix(true,false);light.target?.updateWorldMatrix(true,false);for(let i=0;i<light.shadow.getViewportCount();i++){light.shadow.updateMatrices(light,i);(shadowFrustums[shadowCount]??=new Frustum()).copy(light.shadow.getFrustum());shadowCount++;}}
  for(const object of pending){const rows=candidates.get(object);
   if(rows.every(row=>row.maps.every(t=>textureIsReady(renderer,t)))){pending.delete(object);continue;}
   let shown=true;for(let parent=object;parent&&shown;parent=parent.parent)shown=parent.visible;
   if(!shown)continue;object.updateWorldMatrix(true,false);
   const visible=!camera||object.layers.test(camera.layers)&&(object.frustumCulled===false||(object.isSprite?frustum.intersectsSprite(object):frustum.intersectsObject(object)));
   const shadowVisible=object.castShadow&&(!camera||object.layers.test(camera.layers))&&(object.frustumCulled===false||shadowFrustums.slice(0,shadowCount).some(f=>f.intersectsObject(object)));
   for(const {material,maps}of rows){if(!material.visible)continue;
    for(const t of maps)if(!textureIsReady(renderer,t)&&(visible||shadowVisible&&[material.map,material.alphaMap,material.displacementMap].includes(t)))result.add(t);
   }
  }
  return [...result];
 };
}
export function prepareVisibleTextures(renderer,root,upload,camera){
 let gate=gates.get(root);if(!gate){gate=createSceneGate(renderer,root);gates.set(root,gate);}
 const missing=gate(camera);
 return missing.length?Promise.all(missing.map(t=>prepareEncodedTexture(renderer,t,upload))):null;
}
export const textureMemoryStats=()=>({decodedBytes,peakDecodedBytes,encodedBytes,uploads});
