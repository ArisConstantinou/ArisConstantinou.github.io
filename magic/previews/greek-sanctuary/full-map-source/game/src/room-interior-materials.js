// The room mask is identically one inside a room, including its fade margin.
// Use a conservative world-space bound: intersecting the boundary always keeps
// the original shader. No objects, lights or fragments are hidden here.
export const insideRoomInterior=(box,rects)=>!!box&&rects.some(r=>
 box.min.x>=r.x-.249&&box.max.x<=r.x+r.w+.249&&
 box.min.z>=r.z-.249&&box.max.z<=r.z+r.d+.249);

export function createInteriorMaterialCache(){
 const entries=new Map();
 function get(material,compile,key,frame){
  let entry=entries.get(material);
  if(!entry){
   const clone=material.clone();
   clone.onBeforeCompile=compile;clone.customProgramCacheKey=()=>key+':room-interior-1';
   const released=()=>{clone.dispose();entries.delete(material);material.removeEventListener('dispose',released);};
   material.addEventListener('dispose',released);
   entry={clone,frame:null,version:material.version,released};entries.set(material,entry);
  }
  if(entry.frame!==frame||entry.version!==material.version){
   entry.clone.copy(material);
   // Material.copy retains callbacks. Keep all current material values, including
   // transient damage colours and alpha state, without duplicating any texture.
   if(entry.version!==material.version)entry.clone.needsUpdate=true;
   entry.frame=frame;entry.version=material.version;
  }
  return entry.clone;
 }
 return {get,dispose(){for(const [material,e]of entries){material.removeEventListener('dispose',e.released);e.clone.dispose();}entries.clear();}};
}
