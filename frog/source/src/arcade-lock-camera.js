import {CAMERA_CHASE,CAMERA_ORBIT} from './arcade-view-math.js';

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const wrap=value=>Math.atan2(Math.sin(value),Math.cos(value));

// Follow a chosen visible target using the grounded rig. Its hop never shakes
// the camera; the precise firing direction and target marker still follow it.
export function targetLockOrbit(player,ground,target,orbit,dt){
 if(!player||!target||![player.x,player.z,ground,target.x,target.y,target.z].every(Number.isFinite))return orbit;
 const dx=target.x-player.x,dz=target.z-player.z,distance=Math.hypot(dx,dz);
 if(distance<CAMERA_CHASE.shoulder+CAMERA_CHASE.forward+.2)return orbit;
 const yaw=Math.atan2(dx,dz)+Math.asin(CAMERA_CHASE.shoulder/distance);
 const forward=Math.sqrt(distance*distance-CAMERA_CHASE.shoulder**2)-CAMERA_CHASE.forward;
 const pitch=clamp(Math.atan2(ground+CAMERA_CHASE.height-target.y,forward),CAMERA_ORBIT.minPitch,CAMERA_ORBIT.maxPitch);
 const blend=1-Math.exp(-Math.max(0,Number.isFinite(dt)?dt:0)*10);
 return {yaw:wrap(orbit.yaw+wrap(yaw-orbit.yaw)*blend),pitch:orbit.pitch+(pitch-orbit.pitch)*blend};
}
