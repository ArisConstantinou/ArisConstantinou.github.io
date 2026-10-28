// A quarter-turn takes about 393 mouse pixels at 100%. Keep touch swipes at
// their previous .004 rate; both inputs still respect the saved multiplier.
export const CAMERA_LOOK=Object.freeze({sensitivity:.004,touchSensitivity:.004,minPitch:-.65,maxPitch:1.15,yaw:Math.PI,pitch:.2});

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

// A held analogue control expresses angular speed rather than a fresh swipe.
// Call every active frame, including frames with no pointermove event. The
// camera shares the mouse's yaw wrapping and safe vertical limits.
export function lookCameraRate(orbit,x=0,y=0,dt=0,{sensitivity=1,deadzone=.08}={}){
 x=finite(x);y=finite(y);
 const scale=Math.max(1,Math.abs(x),Math.abs(y));
 const scaledX=x/scale,scaledY=y/scale,length=Math.hypot(scaledX,scaledY);
 const magnitude=Math.min(1,length*scale);
 const zone=Number.isFinite(deadzone)?clamp(deadzone,0,.95):.08;
 const strength=Math.max(0,(magnitude-zone)/(1-zone));
 const seconds=Math.max(0,finite(dt));
 const multiplier=Number.isFinite(sensitivity)&&sensitivity>0?sensitivity:1;
 const amount=length?strength*seconds/length:0;
 return lookCamera(orbit,scaledX*amount,scaledY*amount,{sensitivity:2.2*multiplier});
}
