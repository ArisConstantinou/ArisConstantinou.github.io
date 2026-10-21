import {Box3,Matrix4,Vector3} from 'three';

// Room uniforms expand rectangles by .5 and smoothstep reaches .9 farther.
// Keep the full1.4 fade fringe, plus rounding tolerance, not the older coarse
// object's1.3 padding. A colour fragment in that fringe can still be visible.
export const skinOverlapsRooms=(box,rects)=>rects.some(r=>box.max.x>=r.x-1.401&&box.min.x<=r.x+r.w+1.401&&box.max.z>=r.z-1.401&&box.min.z<=r.z+r.d+1.401);

// Linear blend skinning is a nonnegative weighted sum. Every posed vertex is
// inside the convex hull of the bone-transformed influenced-vertex boxes,
// scaled by its actual weight sum. No clip sampling or guessed body radius.
export function createSkinnedRoomBounds(){
 const cache=new WeakMap(),matrix=new Matrix4(),part=new Box3(),point=new Vector3();
 const finiteBox=b=>[...b.min.toArray(),...b.max.toArray()].every(Number.isFinite);
 function prepare(mesh){
  const g=mesh.geometry,p=g?.attributes.position,i=g?.attributes.skinIndex,w=g?.attributes.skinWeight;
  if(!p||!i||!w||i.itemSize!==4||w.itemSize!==4||i.count!==p.count||w.count!==p.count||Object.keys(g.morphAttributes||{}).length)return null;
  const old=cache.get(mesh),signature=[g,p,i,w,p.version,i.version,w.version,mesh.skeleton.bones.length];
  if(old&&signature.every((v,n)=>v===old.signature[n]))return old;
  const boxes=Array.from({length:mesh.skeleton.bones.length},()=>new Box3());let minSum=Infinity,maxSum=0;
  for(let v=0;v<p.count;v++){
   point.fromBufferAttribute(p,v);if(!point.toArray().every(Number.isFinite))return null;let sum=0;
   for(let k=0;k<4;k++){const weight=w.getComponent(v,k);if(!Number.isFinite(weight)||weight<0)return null;if(!weight)continue;const index=i.getComponent(v,k);if(!Number.isInteger(index)||!boxes[index])return null;boxes[index].expandByPoint(point);sum+=weight;}
   minSum=Math.min(minSum,sum);maxSum=Math.max(maxSum,sum);
  }
  if(!Number.isFinite(minSum)||!Number.isFinite(maxSum))return null;
  const entry={signature,boxes,minSum,maxSum,world:new Box3(),frame:null};cache.set(mesh,entry);return entry;
 }
 return {
  boxFor(mesh,frame){
   if(!mesh.isSkinnedMesh||!mesh.skeleton)return null;
   const e=prepare(mesh);if(!e)return null;if(e.frame===frame)return e.world;
   const box=e.world;box.makeEmpty();
   for(let i=0;i<e.boxes.length;i++)if(!e.boxes[i].isEmpty()){
    const bone=mesh.skeleton.bones[i],inverse=mesh.skeleton.boneInverses[i];if(!bone||!inverse)return null;
    matrix.multiplyMatrices(bone.matrixWorld,inverse).multiply(mesh.bindMatrix);
    part.copy(e.boxes[i]).applyMatrix4(matrix);box.union(part);
   }
   if(box.isEmpty()){if(e.maxSum===0)box.set(point.set(0,0,0),point);else return null;}
   // GLTF float weights need not sum to exactly1. Preserve their actual range,
   // including a zero-weight vertex, instead of assuming normalized weights.
   for(const axis of ['x','y','z']){const a=box.min[axis],b=box.max[axis];box.min[axis]=Math.min(a*e.minSum,a*e.maxSum,b*e.minSum,b*e.maxSum);box.max[axis]=Math.max(a*e.minSum,a*e.maxSum,b*e.minSum,b*e.maxSum);}
   box.applyMatrix4(mesh.bindMatrixInverse).applyMatrix4(mesh.matrixWorld);
   if(!finiteBox(box))return null;
   box.expandByScalar(.001);e.frame=frame;return box;
  }
 };
}
