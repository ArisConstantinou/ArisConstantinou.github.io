// Solve the same damped, semi-implicit flight used by Cannon, from the held
// body's position. Pointer position chooses the impact; swipe sets flight speed.
export function floorThrowTarget(target,floors,margin=.1){
 let nearest={...target},best=Infinity;
 for(const b of floors){
  const x=Math.max(b.x-b.w/2+margin,Math.min(b.x+b.w/2-margin,target.x));
  const z=Math.max(b.z-b.d/2+margin,Math.min(b.z+b.d/2-margin,target.z));
  const d=(x-target.x)**2+(z-target.z)**2;if(d<best){best=d;nearest={x,y:target.y,z};}
 }
 return nearest;
}
export function aimedThrowVelocity(origin, target, speed, damping = .15, gravity = -20) {
  const dx=target.x-origin.x,dz=target.z-origin.z;
  const duration=Math.max(.065,.12*16/Math.max(9,speed),Math.hypot(dx,dz)/Math.max(9,speed));
  const steps=Math.max(1,Math.ceil(duration*120)),dt=1/120,decay=Math.pow(1-damping,dt);
  let unit=1,coefficient=0,fallVelocity=0,fall=0;
  for(let i=0;i<steps;i++){
    unit*=decay;coefficient+=unit*dt;
    fallVelocity=fallVelocity*decay+gravity*dt;fall+=fallVelocity*dt;
  }
  return {x:dx/coefficient,y:(target.y-origin.y-fall)/coefficient,z:dz/coefficient,speed,duration:steps*dt};
}
