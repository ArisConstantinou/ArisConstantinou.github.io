// Shared numerical rules: the preview and live combat use identical values.
export const impactDamage=(speed,mass,grip=0)=>Math.max(18,Math.min(115,speed*(2+Math.sqrt(mass))*(1+.12*grip)));
export const propSelfDamage=(speed,ephemeral)=>speed*(ephemeral?10:2.4);
export function knockbackXZ(position,origin){
  const dx=position.x-origin.x,dz=position.z-origin.z,d=Math.hypot(dx,dz)||1;
  return {x:dx/d*2,z:dz/d*2};
}
