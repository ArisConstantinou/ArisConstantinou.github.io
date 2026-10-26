export const CAMERA_LOOK=Object.freeze({sensitivity:.0025,minPitch:-.65,maxPitch:1.15,yaw:Math.PI,pitch:.12});

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const wrap=value=>Math.atan2(Math.sin(value),Math.cos(value));
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;

// Mouse displacement turns the view immediately. There is no movement-follow
// or edge-position input, and no elapsed-time multiplier: equal hand movement
// produces the same turn whether delivered in one event or many frames.
export function lookCamera(orbit,dx=0,dy=0,{sensitivity=CAMERA_LOOK.sensitivity,invertY=false}={}){
 const yaw=wrap(finite(orbit?.yaw,CAMERA_LOOK.yaw));
 const pitch=clamp(finite(orbit?.pitch,CAMERA_LOOK.pitch),CAMERA_LOOK.minPitch,CAMERA_LOOK.maxPitch);
 const rate=Number.isFinite(sensitivity)&&sensitivity>0?sensitivity:CAMERA_LOOK.sensitivity;
 const horizontal=wrap(finite(finite(dx)*rate));
 const vertical=finite(finite(dy)*rate)*(invertY===true?-1:1);
 return {yaw:wrap(yaw-horizontal),pitch:clamp(pitch+vertical,CAMERA_LOOK.minPitch,CAMERA_LOOK.maxPitch)};
}
