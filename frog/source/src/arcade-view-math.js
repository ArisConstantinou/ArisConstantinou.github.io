import {CAMERA_LOOK} from './arcade-camera-look.js';

// Body heading is useful when deliberately placing the camera at spawn/resume.
// It must never steer the camera during ordinary movement or aiming.
export function actorHeading(actor) {
 const aiming=actor.aiming||actor.shot>0.02||actor.kick>0;
 const aimLength=Math.hypot(actor.aimX,actor.aimZ);
 if((aiming||!Number.isFinite(actor.face))&&Number.isFinite(aimLength)&&aimLength>1e-6){
  return {x:actor.aimX/aimLength,z:actor.aimZ/aimLength};
 }
 const yaw=Number.isFinite(actor.face)?actor.face:Math.PI;
 return {x:Math.sin(yaw),z:Math.cos(yaw)};
}

// A modestly elevated rear view clears the frog's back while retaining the
// route ahead. Orbit, distance and movement axes remain under the same controls.
export const CAMERA_ORBIT=Object.freeze({...CAMERA_LOOK,sensitivity:.005});
export const CAMERA_ZOOM=Object.freeze({min:.7,max:1.5,default:1});

export function dragCamera(orbit,dx,dy){
 const yaw=(Number.isFinite(orbit?.yaw)?orbit.yaw:CAMERA_ORBIT.yaw)-(Number.isFinite(dx)?dx:0)*CAMERA_ORBIT.sensitivity;
 const pitch=(Number.isFinite(orbit?.pitch)?orbit.pitch:CAMERA_ORBIT.pitch)+(Number.isFinite(dy)?dy:0)*CAMERA_ORBIT.sensitivity;
 return {yaw:Math.atan2(Math.sin(yaw),Math.cos(yaw)),pitch:Math.max(CAMERA_ORBIT.minPitch,Math.min(CAMERA_ORBIT.maxPitch,pitch))};
}

export function cameraPose(p, ground, aspect=1.6, mode='chase3d',orbit=CAMERA_ORBIT) {
 const safeAspect=Number.isFinite(aspect)&&aspect>0?aspect:1.6;
 const zoom=Number.isFinite(orbit?.zoom)?Math.max(CAMERA_ZOOM.min,Math.min(CAMERA_ZOOM.max,orbit.zoom)):CAMERA_ZOOM.default;
 if(mode==='overview'){
  // Aim through the body's centre. A moderate tilt preserves the visible body.
  const scale=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/safeAspect)));
  return {look:[p.x,ground+1.2,p.z],position:[p.x,ground+1.2+(26*scale-1.2)/zoom,p.z+19*scale/zoom]};
 }
 // The controller chooses the viewing direction from travel or deliberate
 // looking; this pose calculation must not feed actor aim back into rotation.
 const yaw=Number.isFinite(orbit?.yaw)?orbit.yaw:CAMERA_ORBIT.yaw;
 const pitch=Math.max(CAMERA_ORBIT.minPitch,Math.min(CAMERA_ORBIT.maxPitch,Number.isFinite(orbit?.pitch)?orbit.pitch:CAMERA_ORBIT.pitch));
 const heading={x:Math.sin(yaw),z:Math.cos(yaw)},scale=Math.max(1,Math.min(1.42,.72/safeAspect));
 const distance=12.6*scale/zoom,horizontal=distance*Math.cos(pitch),lookX=p.x+heading.x*.9,lookZ=p.z+heading.z*.9;
 return {
  look:[lookX,ground+1.2,lookZ],
  position:[lookX-heading.x*horizontal,ground+1.2+distance*Math.sin(pitch),lookZ-heading.z*horizontal],
 };
}

// Keep the complete focus-to-eye boom above the rendered walking surface,
// including raised house floors. Shortening the boom preserves look direction;
// clamping only the eye's height would silently change the player's aim pitch.
export function resolveCameraBoom(pose,groundAt,{clearance=.35,step=.15}={}){
 const look=[...pose.look],position=[...pose.position];
 const delta=position.map((value,i)=>value-look[i]),length=Math.hypot(...delta);
 if(typeof groundAt!=='function'||length<1e-8)return {...pose,look,position};
 const direction=delta.map(value=>value/length),gap=Number.isFinite(clearance)&&clearance>=0?clearance:.35;
 const spacing=Number.isFinite(step)&&step>0?Math.max(.03,step):.15;
 const terrain=(x,z)=>{const height=groundAt(x,z);return Number.isFinite(height)?height:-Infinity;};
 const at=distance=>look.map((value,i)=>value+direction[i]*distance);
 // A focus placed just across a higher floor needs room for a nonzero boom.
 // Translate focus and eye together only as far as that nearby surface needs.
 const near=Math.min(length,.12),nearSteps=Math.max(1,Math.ceil(near/.03));let lift=0;
 for(let i=0;i<=nearSteps;i++){
  const point=at(near*i/nearSteps);lift=Math.max(lift,terrain(point[0],point[2])+gap-point[1]);
 }
 if(lift>0){look[1]+=lift+.001;position[1]+=lift+.001;}
 const count=Math.max(1,Math.min(512,Math.ceil((length-near)/spacing)));let safe=near;
 for(let i=1;i<=count;i++){
  const distance=near+(length-near)*i/count,point=at(distance);
  if(point[1]>=terrain(point[0],point[2])+gap){safe=distance;continue;}
  let blocked=distance;
  for(let iteration=0;iteration<18;iteration++){
   const middle=(safe+blocked)/2,sample=at(middle);
   if(sample[1]>=terrain(sample[0],sample[2])+gap)safe=middle;else blocked=middle;
  }
  return {...pose,look,position:at(safe)};
 }
 return {...pose,look,position};
}

// Use the currently rendered camera basis, including after a deliberate orbit.
export function screenBasis(camera,focus) {
 const dx=focus.x-camera.x,dz=focus.z-camera.z,d=Math.hypot(dx,dz);
 const fx=Number.isFinite(d)&&d>1e-6?dx/d:0,fz=Number.isFinite(d)&&d>1e-6?dz/d:-1;
 return {camera:{x:0,z:0},focus:{x:fx,z:fz}};
}
export function screenToWorld(x,y,camera,focus) {
 const dx=focus.x-camera.x,dz=focus.z-camera.z,d=Math.hypot(dx,dz);
 // A vertical camera still needs a screen-right / north-up basis.
 const fx=d>1e-6?dx/d:0,fz=d>1e-6?dz/d:-1;
 const sx=Number.isFinite(x)?x:0,sy=Number.isFinite(y)?y:0;
 return {x:-fz*sx-fx*sy,z:fx*sx-fz*sy};
}
