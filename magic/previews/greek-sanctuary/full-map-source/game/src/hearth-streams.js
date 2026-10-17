import * as THREE from 'three';
import {HEARTH,flameHits} from './hearth-rules.js';

// Keep the original sampled distances, including their exact floating-point
// values. Segment visibility is monotonic: once a ray crosses a solid or the
// floor, every longer segment is blocked too. Search the same stops rather
// than tracing all 34 prefixes of an unobstructed outlet each time it updates.
const clipDistances=[];
for(let distance=.3;distance<HEARTH.range;distance+=.2)clipDistances.push(distance);
function parallelThresholdChanges(direction){
 // The current 3D slab test and the legacy 2D test treat tiny deltas as
 // parallel. Keep linear probing for rare almost-parallel rays whose prefix
 // crosses either tolerance; their rounded visibility need not be monotonic.
 return ['x','y','z'].some(axis=>[1e-5,1e-8].some(epsilon=>{
  const d=Math.abs(direction[axis]);return d*clipDistances[0]<epsilon&&d*clipDistances.at(-1)>=epsilon;
 }));
}

// One reusable world-space ray per physical outlet; legacy rigs retain one ray.
export function createHearthStreams(visual){
 const sockets=visual.bones.nozzle_L&&visual.bones.nozzle_R?['nozzle_L','nozzle_R']:['nozzle'];
 return sockets.map(socket=>({socket,origin:new THREE.Vector3(),direction:new THREE.Vector3(),end:new THREE.Vector3(),length:HEARTH.range}));
}
export function updateHearthStreams(streams,visual,clear,firing){
 for(const stream of streams){
  const bone=visual.bones[stream.socket],{origin,direction,end}=stream;
  origin.set(0,.28,0);bone.localToWorld(origin);
  direction.set(0,1,0).transformDirection(bone.matrixWorld);
  direction.multiplyScalar(1/Math.max(.01,Math.hypot(direction.x,direction.z)));
  stream.length=HEARTH.range;
  if(firing){
   const blocked=index=>{
    end.copy(origin).addScaledVector(direction,clipDistances[index]);
    return end.y<.1||!clear(origin,end);
   };
   if(origin.y+direction.y*clipDistances[0]<.1||parallelThresholdChanges(direction)){
    for(let i=0;i<clipDistances.length;i++)if(blocked(i)){stream.length=clipDistances[i];break;}
    continue;
   }
   let low=0,high=clipDistances.length-1;
   if(blocked(high)){
    while(low<high){const mid=(low+high)>>1;if(blocked(mid))high=mid;else low=mid+1;}
    stream.length=clipDistances[low];
    end.copy(origin).addScaledVector(direction,stream.length);
   }
  }
 }
}
export function hearthStreamsHit(streams,point,clear){
 // Overlapping flames preserve the existing damage rate per target.
 return streams.some(s=>flameHits(s.origin,s.direction,point,s.length,clear));
}
