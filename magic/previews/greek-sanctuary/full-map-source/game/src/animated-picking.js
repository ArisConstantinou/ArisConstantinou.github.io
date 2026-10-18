import {createTrianglePicker} from './triangle-picking.js';
export {prepareObjectPicking} from './triangle-picking.js';
// Ray picking needs the exact current animated surface. Bounds and adjacent
// triangles share vertices, so skin each vertex once per query, not per use.
// Nothing is reused across queries/poses; Float64 retains Three's JS precision.
// Reuse scratch slots across actors, so memory follows the largest queried
// model rather than the number of enemies encountered during a session.
const buffers=[];let borrowed=0;
export function intersectAnimatedObject(raycaster,root,{visibleOnly=false}={}){
 const restore=[],firstSlot=borrowed;
 try{
  // Only this candidate's hierarchy is queried. Update its ancestors first,
  // then use updateMatrixWorld so SkinnedMesh refreshes bindMatrixInverse too.
  root.updateWorldMatrix(true,false);root.updateMatrixWorld(true);
  root[visibleOnly?'traverseVisible':'traverse'](mesh=>{
   if(!mesh.isSkinnedMesh)return;
   const count=mesh.geometry.attributes.position.count;
   const slot=borrowed++;let cache=buffers[slot];
   if(!cache||cache.count<count){cache={count,values:new Float64Array(count*3),stamps:new Uint32Array(count),epoch:0};buffers[slot]=cache;}
   const epoch=cache.epoch=(cache.epoch+1)>>>0;
   if(epoch===0)cache.stamps.fill(0xffffffff);
   const original=mesh.getVertexPosition,own=Object.hasOwn(mesh,'getVertexPosition');
   restore.push({mesh,original,own});
   mesh.getVertexPosition=function(index,target){
    const offset=index*3;
    if(cache.stamps[index]!==epoch){
     original.call(this,index,target);cache.values[offset]=target.x;cache.values[offset+1]=target.y;cache.values[offset+2]=target.z;cache.stamps[index]=epoch;
    }else target.set(cache.values[offset],cache.values[offset+1],cache.values[offset+2]);
    return target;
   };
   mesh.computeBoundingSphere();
  });
  if(!visibleOnly)return raycaster.intersectObject(root,true);
  const nodes=[];root.traverseVisible(node=>{if(node.raycast)nodes.push(node)});
  return raycaster.intersectObjects(nodes,false);
 }finally{
  for(const {mesh,original,own}of restore)if(own)mesh.getVertexPosition=original;else delete mesh.getVertexPosition;
  borrowed=firstSlot;
 }
}

// The game previously discarded hidden LOD hits only after skinning/raycasting
// them. Filter before any work, then use the exact full-detail narrow phase.
export function intersectVisibleAnimatedObject(raycaster,root){
 for(let node=root;node;node=node.parent)if(!node.visible)return [];
 const picker=createTrianglePicker([root],{prepare:false,visibleOnly:true});
 try{return intersectAnimatedObject(raycaster,root,{visibleOnly:true});}
 finally{picker.dispose();}
}
