import * as THREE from 'three';

export function lodLevel(pixels,previous,{enter,exit},forceOriginal=false){return forceOriginal||!Number.isFinite(pixels)?0:previous?pixels<=exit?1:0:pixels<=enter?1:0;}
const projection=new THREE.Matrix4(),point=new THREE.Vector3();
export function projectedBoxPixels(box,world,camera,width,height){
 projection.multiplyMatrices(camera.matrixWorldInverse,world);let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;
 for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
  point.set(x,y,z).applyMatrix4(projection);if(point.z>=-camera.near)return Infinity;point.applyMatrix4(camera.projectionMatrix);x0=Math.min(x0,point.x);x1=Math.max(x1,point.x);y0=Math.min(y0,point.y);y1=Math.max(y1,point.y);
 }
 return Math.max((x1-x0)*width*.5,(y1-y0)*height*.5);
}
export function currentViewport(renderer){const target=renderer.getRenderTarget();return target?[target.width,target.height]:[renderer.domElement.width,renderer.domElement.height];}
export function createMeshLOD(mesh,far,thresholds){
 const original=mesh.geometry,states=new WeakMap();original.computeBoundingBox();
 return {original,far,keepOriginal(camera,width,height,forceOriginal=false){original.boundingBox.getCenter(point).applyMatrix4(mesh.matrixWorld).applyMatrix4(camera.matrixWorldInverse);if(point.z>=-camera.near)return false;point.applyMatrix4(camera.projectionMatrix);return Math.abs(point.x)<=1&&Math.abs(point.y)<=1&&(forceOriginal||projectedBoxPixels(original.boundingBox,mesh.matrixWorld,camera,width,height)>thresholds.exit);},apply(camera,width,height,{enabled=true,forceOriginal=false,box=original.boundingBox}={}){
  const level=enabled&&far!==original?lodLevel(projectedBoxPixels(box,mesh.matrixWorld,camera,width,height),states.get(camera)||0,thresholds,forceOriginal):0;states.set(camera,level);mesh.geometry=level?far:original;return level;
 }};
}
function compactGeometry(source,index){
 const remap=new Map(),used=[];for(const i of index)if(!remap.has(i)){remap.set(i,used.length);used.push(i);}const g=new THREE.BufferGeometry();
 for(const[name,a]of Object.entries(source.attributes)){if(a.isInterleavedBufferAttribute)throw Error('Unexpected interleaved LOD attribute');const values=new a.array.constructor(used.length*a.itemSize);used.forEach((v,j)=>values.set(a.array.subarray(v*a.itemSize,(v+1)*a.itemSize),j*a.itemSize));g.setAttribute(name,new THREE.BufferAttribute(values,a.itemSize,a.normalized));}
 const indices=(used.length>65535?Uint32Array:Uint16Array).from(index,i=>remap.get(i));g.setIndex(new THREE.BufferAttribute(indices,1));g.computeBoundingBox();g.computeBoundingSphere();return g;
}
export async function decodeDistanceGeometry(assets,manifest,buffer){
 if(manifest.schema!==1||buffer.byteLength!==manifest.bytes)throw Error('Invalid distance geometry package');const lookup=new WeakMap();
 for(const[id,asset]of Object.entries(assets)){
  const parts=manifest.assets[id];if(!parts)throw Error('Missing distance asset '+id);const meshes=[];asset.traverse(m=>{if(m.isMesh)meshes.push(m);});
  for(const part of parts){const mesh=meshes.find(m=>m.name===part.name);if(!mesh)throw Error('Missing distance part '+id+':'+part.name);const g=mesh.geometry;if(g.attributes.position.count!==part.vertices||g.index.count!==part.sourceIndexCount)throw Error('Distance topology mismatch');
   const bytes=new Uint8Array(g.index.array.buffer,g.index.array.byteOffset,g.index.array.byteLength),hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(v=>v.toString(16).padStart(2,'0')).join('');if(hash!==part.sourceIndexSha256)throw Error('Distance source mismatch '+mesh.name);
   if(part.original){lookup.set(g,g);continue;}const Index=part.componentType===5123?Uint16Array:Uint32Array;if(part.offset%Index.BYTES_PER_ELEMENT||part.offset+part.count*Index.BYTES_PER_ELEMENT>buffer.byteLength)throw Error('Distance buffer range');const indices=new Index(buffer,part.offset,part.count);if(part.count%3||indices.some(v=>v>=part.vertices)||g.groups.length||g.morphAttributes.position?.length)throw Error('Unsupported distance primitive');
   let far;if(id==='house')far=compactGeometry(g,indices);else{far=new THREE.BufferGeometry();for(const[name,a]of Object.entries(g.attributes))far.setAttribute(name,a);far.setIndex(new THREE.BufferAttribute(indices,1));far.computeBoundingBox();far.computeBoundingSphere();}lookup.set(g,far);
  }
 }
 return lookup;
}
export function installRenderOptimization(game){
 const baseline=new URLSearchParams(location.search).has('test')&&new URLSearchParams(location.search).get('renderBaseline')==='1';game.renderOptimization={enabled:!baseline,distance:true,culling:true,version:1};const old=game.scene.onBeforeRender;
 game.scene.onBeforeRender=function(renderer,scene,camera,...rest){old?.call(this,renderer,scene,camera,...rest);const [w,h]=currentViewport(renderer),enabled=game.renderOptimization.enabled;
  for(const model of game.models)model.prepareRender?.(camera,w,h,enabled,camera===game.camera,game.renderOptimization);
  for(const house of game.importedAssets?.houses||[])for(const lod of house.root.renderLODs||[])lod.apply(camera,w,h,{enabled:enabled&&game.renderOptimization.distance,forceOriginal:house.walls.some(m=>m.material.opacity<.999)});
 };
}
