import {CARTOON_BODIES} from './arcade-cartoon-bodies.js';
import {actorVisualFacing} from './arcade-facing.js';

// The arcade appearance keeps every team at the same anatomical scale. Ammo
// changes only the throat pouch, so neither movement nor hurt volumes grow.
export const FROG_BODY=Object.freeze({movementRadius:.64,height:.84,mountedOffset:.45});
const volume=(x,y,z,rx,ry,rz)=>Object.freeze({center:Object.freeze({x,y,z}),radii:Object.freeze({x:rx,y:ry,z:rz})});

// Local +Z is the face. These smooth volumes follow the broad, low stance in
// creatures.js after the .96/.98/1.04 arcade proportions. Wide hind legs stay
// low; they must not turn empty space beside the head into an invisible wall.
export const FROG_HIT_VOLUMES=Object.freeze([
 volume(0,.42,-.08,.44,.29,.65),          // torso and pelvis
 volume(0,.47,.40,.43,.24,.39),          // head and mouth
 volume(-.28,.67,.54,.14,.13,.16),       // eye ridges
 volume(.28,.67,.54,.14,.13,.16),
 volume(-.52,.23,-.19,.25,.22,.48),      // folded hind legs
 volume(.52,.23,-.19,.25,.22,.48),
 volume(-.46,.16,.58,.12,.15,.28),       // forelegs and feet
 volume(.46,.16,.58,.12,.15,.28),
]);

export const frogBody=actor=>CARTOON_BODIES[actor?.characterClass]||FROG_BODY;
export const actorHitVolumes=actor=>CARTOON_BODIES[actor?.characterClass]?.hitVolumes||FROG_HIT_VOLUMES;

const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
export function actorBodyBase(actor,ground=0){
 return finite(ground)+Math.max(0,finite(actor?.height))+(actor?.catapultId?frogBody(actor).mountedOffset:0);
}
export function actorVerticalBounds(actor,ground=0){
 const bottom=actorBodyBase(actor,ground);return {bottom,top:bottom+frogBody(actor).height};
}
export function actorBodiesOverlapHeight(a,b,{groundA=0,groundB=0,padding=0}={}){
 const first=actorVerticalBounds(a,groundA),second=actorVerticalBounds(b,groundB),reach=Math.max(0,finite(padding));
 return first.bottom<=second.top+reach&&second.bottom<=first.top+reach;
}
export function actorBodyYaw(actor){
 return actorVisualFacing(actor,{currentYaw:finite(actor?.face)}).yaw;
}
