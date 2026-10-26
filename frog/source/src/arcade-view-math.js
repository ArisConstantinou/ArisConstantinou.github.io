// The heading stays fixed while moving and aiming. Neither view needs a rotate gesture.
export function cameraPose(p, ground, aspect=1.6, mode='chase3d') {
 const safeAspect=Number.isFinite(aspect)&&aspect>0?aspect:1.6;
 if(mode==='overview'){
  // Aim through the body's centre. A moderate tilt preserves the visible body.
  const scale=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/safeAspect)));
  return {look:[p.x,ground+1.2,p.z],position:[p.x,ground+26*scale,p.z+19*scale]};
 }
 // The old 2.4-unit look-ahead pushed the frog too far aside in portrait.
 const scale=Math.max(1,Math.min(1.42,.85/safeAspect));
 return {look:[p.x,ground+1.2,p.z-.5],position:[p.x+8.8*scale,ground+5.5*scale,p.z+6.6*scale]};
}
export function screenToWorld(x,y,camera,focus) {
 const dx=focus.x-camera.x,dz=focus.z-camera.z,d=Math.hypot(dx,dz);
 // A vertical camera still needs a screen-right / north-up basis.
 const fx=d>1e-6?dx/d:0,fz=d>1e-6?dz/d:-1;
 const sx=Number.isFinite(x)?x:0,sy=Number.isFinite(y)?y:0;
 return {x:-fz*sx-fx*sy,z:fx*sx-fz*sy};
}
