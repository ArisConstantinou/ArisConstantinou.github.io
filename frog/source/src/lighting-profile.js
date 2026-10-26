const TAU=Math.PI*2;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const mix=(from,to,t)=>from.map((value,index)=>value+(to[index]-value)*t);
// Colours below are linear-light values, as consumed by THREE.Color.setRGB.
const DAY_GROUND=[.05126945836711539,.08650046202808521,.038204371589236];

/** Keep moonlit terrain and creature silhouettes readable without changing the
 * gameplay clock. Ambient fill supplies visibility even when direct light is
 * blocked; the cool palette and weaker key light preserve the nighttime mood. */
export function creekLighting(day={}){
  const phase=Number.isFinite(day.phase)?((day.phase%1)+1)%1:.375;
  const daylight=Number.isFinite(day.daylight)?clamp(day.daylight,0,1):clamp(Math.sin(phase*TAU-Math.PI/2)*1.35,0,1);
  const blend=daylight*daylight*(3-2*daylight),angle=phase*TAU-Math.PI/2;
  return {
    daylight,
    sunIntensity:3.1*daylight,
    hemisphereIntensity:1.35+.45*daylight,
    moonIntensity:1.05*(1-daylight),
    environmentIntensity:.32+.28*daylight,
    exposure:1.1-.04*daylight,
    hemisphereSky:mix([.48,.62,.82],[.77,.87,.94],blend),
    hemisphereGround:mix([.12,.18,.26],DAY_GROUND,blend),
    fog:mix([.065,.12,.19],[.56,.675,.72],blend),
    sunHSL:[.1,.3+.3*(1-daylight),.82],
    sunOffset:[Math.cos(angle)*35,Math.max(8,Math.sin(angle)*45+12),25],
    moonOffset:[-Math.cos(angle)*35,Math.max(18,-Math.sin(angle)*45+12),-25],
    skySun:[Math.cos(angle)*80,Math.max(-6,Math.sin(angle)*70+10),40],
    rayleigh:1.5+2*(1-daylight),
    skyVisible:daylight>.05,
  };
}
