// Camera heading is deliberately independent of mouse and right-stick aim.
export function cameraPose(p, ground, aspect=1.6, mode='chase3d') {
 const portrait=aspect<.85;
 if(mode==='overview')return {look:[p.x,ground+1,p.z-1.5],position:[p.x,ground+(portrait?40:32),p.z+8]};
 const scale=portrait?1.35:1;
 return {look:[p.x,ground+1.4,p.z-2.4],position:[p.x+8.8*scale,ground+5.5*scale,p.z+6.6*scale]};
}
export function screenToWorld(x,y,camera,focus) {
 const dx=focus.x-camera.x,dz=focus.z-camera.z,d=Math.hypot(dx,dz)||1;
 const fx=dx/d,fz=dz/d;
 return {x:-fz*x-fx*y,z:fx*x-fz*y};
}
