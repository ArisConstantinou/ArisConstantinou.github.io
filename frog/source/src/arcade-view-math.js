// Match the visible frog's heading, including a shot or a kick during a turn.
export function actorHeading(actor) {
 const aiming=actor.aiming||actor.shot>0.02||actor.kick>0;
 const aimLength=Math.hypot(actor.aimX,actor.aimZ);
 if((aiming||!Number.isFinite(actor.face))&&Number.isFinite(aimLength)&&aimLength>1e-6){
  return {x:actor.aimX/aimLength,z:actor.aimZ/aimLength};
 }
 const yaw=Number.isFinite(actor.face)?actor.face:Math.PI;
 return {x:Math.sin(yaw),z:Math.cos(yaw)};
}

export function cameraPose(p, ground, aspect=1.6, mode='chase3d') {
 const safeAspect=Number.isFinite(aspect)&&aspect>0?aspect:1.6;
 if(mode==='overview'){
  // Aim through the body's centre. A moderate tilt preserves the visible body.
  const scale=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/safeAspect)));
  return {look:[p.x,ground+1.2,p.z],position:[p.x,ground+26*scale,p.z+19*scale]};
 }
 // Stay behind the frog. The small shoulder offset leaves the outgoing shot visible.
 // Follow ground height rather than individual hops so the view does not bounce.
 const heading=actorHeading(p),scale=Math.max(1,Math.min(1.42,.72/safeAspect));
 return {
  look:[p.x+heading.x*1.2,ground+1.2,p.z+heading.z*1.2],
  position:[p.x-heading.x*10.8*scale-heading.z*.7*scale,ground+5.8*scale,p.z-heading.z*10.8*scale+heading.x*.7*scale],
 };
}

// Capture this at the beginning of a gesture. Reusing it while the chase camera
// turns prevents a held screen-right input from continuously steering in circles.
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
