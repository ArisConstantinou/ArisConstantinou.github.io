/** Mayhem only. Game-space timings, never shared with the story. */
export const MODE_VERSION='1.0.0';
export const SAVE_KEY='last-call-mayhem-v1';
export const heatStep=(heat,dt,{seen,recent,quiet})=>Math.max(0,Math.min(100,heat-(!seen&&!recent&&quiet>4?dt*6.5:0)));
export function guardLimit(heat){return heat>=82?4:heat>=55?3:heat>=22?2:0;}
export function validSave(data){return data&&data.version===1&&Number.isFinite(data.score)&&Array.isArray(data.broken);}
export const COMBAT=Object.freeze({guardDamage:4,civilianDamage:3,blockedDamage:0,windup:.82,attackDuration:1.25,globalAttackGap:1.6,hitGrace:1.5,guardCooldown:3.1,civilianCooldown:3.5,guardSpeed:1.75,healDelay:5,healRate:5,guardWake:38});
