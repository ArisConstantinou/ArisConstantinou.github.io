/** Readable, non-stacking attacks. Timings and damage are game-balance values. */
export const BALANCE=Object.freeze({guardDamage:4,civilianDamage:3,blockedDamage:.5,windup:.70,attackDuration:1.12,globalAttackGap:1.45,hitGrace:1.35,guardCooldown:2.9,civilianCooldown:3.2,guardSpeed:1.85,healDelay:6,healRate:4,guardWake:32});
export function captureStep(value,dt,{nearby=0,health=100,blocking=false}={}){const held=nearby>=2||(nearby===1&&health<20),rate=held?(4+nearby*1.6)*(blocking?.38:1):-28;return Math.max(0,Math.min(100,value+Math.min(.075,Math.max(0,dt))*rate));}
export function guardQuota(seconds){return Math.min(4,2+Math.floor(Math.max(0,seconds)/20));}
export function damageAmount(guard,blocked){return blocked?BALANCE.blockedDamage:guard?BALANCE.guardDamage:BALANCE.civilianDamage;}
