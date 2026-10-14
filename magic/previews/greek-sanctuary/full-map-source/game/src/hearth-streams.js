import * as THREE from 'three';
import {HEARTH,flameHits} from './hearth-rules.js';

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
  if(firing)for(let distance=.3;distance<HEARTH.range;distance+=.2){
   end.copy(origin).addScaledVector(direction,distance);
   if(end.y<.1||!clear(origin,end)){stream.length=distance;break;}
  }
 }
}
export function hearthStreamsHit(streams,point,clear){
 // Overlapping flames preserve the existing damage rate per target.
 return streams.some(s=>flameHits(s.origin,s.direction,point,s.length,clear));
}
