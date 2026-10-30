import {catapultAssetPoint,CENTERED_RELEASE_SOCKET} from './arcade-catapult-alignment.js';
// Stationary, automatically reloading machines; frog fly ammunition stays separate.
import {frogBody} from './arcade-actor-bounds.js';
import {CATAPULT_MECHANISM} from './arcade-cartoon-bodies.js';
import { CATAPULT_SITES, CATAPULT_ENCLOSURES, hasWallSight } from './arcade-bases.js';
import { ARENA_MOVE_RADIUS } from './arcade-battleground.js';
import {guardActive} from './arcade-guards.js';
export const ARTILLERY = Object.freeze({delivery:'catapult',interactionRange:3,baseRadius:.95,minRange:5,maxRange:28,blastRadius:2.8,innerRadius:1.25,flightTime:1.25,arcHeight:8,cooldown:3,recoilDuration:.45,centerLift:.85,rimLift:.45,centerRecovery:.48,rimRecovery:.42});
export const CATAPULTS = CATAPULT_SITES;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function stoneTarget(actor,aimX,aimZ,power=.6){
 const n=Math.hypot(aimX,aimZ),dx=n>1e-6?aimX/n:0,dz=n>1e-6?aimZ/n:-1;
 const range=ARTILLERY.minRange+(ARTILLERY.maxRange-ARTILLERY.minRange)*clamp(Number.isFinite(power)?power:.6,0,1);
 // Clip along the aimed ray so the marker never changes the player's direction.
 const dot=actor.x*dx+actor.z*dz,remaining=ARENA_MOVE_RADIUS*ARENA_MOVE_RADIUS-actor.x*actor.x-actor.z*actor.z;
 const toEdge=Math.max(0,-dot+Math.sqrt(Math.max(0,dot*dot+remaining))),actualRange=Math.min(range,toEdge);
 return {x:actor.x+dx*actualRange,z:actor.z+dz*actualRange,range:actualRange,valid:actualRange>=ARTILLERY.minRange-1e-6};
}
export function createCatapults(){return CATAPULTS.map(c=>({...c,occupant:null,cooldown:0,loaded:true,aimX:0,aimZ:-1,recoil:0}));}
export function catapultReachRange(actor){if(!actor?.characterClass)return ARTILLERY.interactionRange;const {min,max}=CATAPULT_MECHANISM.chassisBounds;return Math.max(ARTILLERY.interactionRange,Math.hypot(max[0]-min[0],max[2]-min[2])/2+frogBody(actor).movementRadius+.12);}
export function nearbyCatapult(s,a){return s.catapults.filter(c=>(c.owner===a.id||!c.owner)&&(!c.occupant||c.occupant===a.id)&&Math.hypot(c.x-a.x,c.z-a.z)<=catapultReachRange(a)&&hasWallSight(a,c,.1)).sort((c,d)=>Math.hypot(c.x-a.x,c.z-a.z)-Math.hypot(d.x-a.x,d.z-a.z))[0]||null;}
export function catapultSeatPoint(machine,actor){
 const body=frogBody(actor),length=Math.hypot(machine.aimX,machine.aimZ)||1,ax=machine.aimX/length,az=machine.aimZ/length,side=body.mountedSideOffset||0,forward=body.mountedForwardOffset||0;
 if(actor?.characterClass)return catapultAssetPoint(machine,{x:side,z:forward});
 return {x:machine.x+az*side+ax*forward,z:machine.z-ax*side+az*forward};
}
export function releaseCatapult(s,a){
 const c=s.catapults.find(c=>c.id===a.catapultId);if(c?.occupant===a.id){c.occupant=null;a.x=c.x;a.z=c.z+2.3;if(a.characterClass){const yard=CATAPULT_ENCLOSURES.find(y=>y.id===c.enclosureId);a.x=c.x+(yard?yard.approach.x-yard.x:0);a.z=c.z+(yard?yard.approach.z-yard.z:4.45);}const d=Math.hypot(a.x,a.z);if(d>ARENA_MOVE_RADIUS){a.x*=ARENA_MOVE_RADIUS/d;a.z*=ARENA_MOVE_RADIUS/d;}}
 const mounted=!!a.catapultId;a.catapultId=null;a.catapultShots=0;a.interactHeld=false;return mounted;
}
export function interactCatapult(s,a){
 if(a.catapultId)return releaseCatapult(s,a);
 if(a.ko||a.dizzyTime>0||a.knockUp>0||a.kick>0||(a.id!=='player'&&s.phase!=='battle'))return false;
 const c=nearbyCatapult(s,a);if(!c)return false;
 c.occupant=a.id;a.catapultId=c.id;a.catapultShots=0;a.catapultAim=1;Object.assign(a,catapultSeatPoint(c,a));a.hop=0;a.height=0;a.idle=0;a.hopX=a.hopZ=0;a.impulseX=a.impulseZ=0;
 s.events.push({type:'catapultMount',id:a.id,catapultId:c.id});return true;
}
export function throwStone(s,a,target){
 const c=s.catapults.find(c=>c.id===a.catapultId);
 if(s.phase!=='battle'||a.ko||a.dizzyTime>0||a.hit>0||a.knockUp>0||!c||c.occupant!==a.id||!c.loaded||c.cooldown>0||target?.valid===false||!Number.isFinite(target?.x)||!Number.isFinite(target?.z))return false;
 let x=target.x,z=target.z;const edge=Math.hypot(x,z);if(edge>ARENA_MOVE_RADIUS){x*=ARENA_MOVE_RADIUS/edge;z*=ARENA_MOVE_RADIUS/edge;}
 const dx=x-c.x,dz=z-c.z,range=Math.hypot(dx,dz);if(range<ARTILLERY.minRange-1e-6)return false;
 const ax=dx/range,az=dz/range;if(range>ARTILLERY.maxRange){x=c.x+ax*ARTILLERY.maxRange;z=c.z+az*ARTILLERY.maxRange;}
 const shell={id:s.nextId++,owner:a.id,catapultId:c.id,startX:c.x+ax,startZ:c.z+az,startHeight:1.6,tx:x,tz:z,age:0,duration:ARTILLERY.flightTime,arcHeight:ARTILLERY.arcHeight};
 if(a.characterClass){const release=CENTERED_RELEASE_SOCKET;shell.releaseDelay=CATAPULT_MECHANISM.releaseDelay;shell.startX=c.x+ax*release.z+az*release.x;shell.startZ=c.z+az*release.z-ax*release.x;shell.startHeight=release.y;a.catapultAction=.87;}
 c.aimX=ax;c.aimZ=az;c.loaded=false;c.cooldown=ARTILLERY.cooldown;c.recoil=ARTILLERY.recoilDuration;a.catapultShots++;a.spawnShield=0;s.shells.push(shell);
 s.events.push({type:'stoneShot',id:a.id,shellId:shell.id,catapultId:c.id});return true;
}
export function stepArtillery(s,dt,hit){
 for(const c of s.catapults){
  c.cooldown=Math.max(0,c.cooldown-dt);c.recoil=Math.max(0,c.recoil-dt);c.loaded=c.cooldown===0;
  if(c.occupant){const a=s.actors.find(a=>a.id===c.occupant);if(!a||a.ko||a.dizzyTime>0||a.knockUp>0||a.catapultId!==c.id){if(a&&a.catapultId===c.id)releaseCatapult(s,a);else c.occupant=null;}}
 }
 for(const shell of s.shells){
  shell.age+=dt;if(shell.age<shell.duration)continue;
  s.events.push({type:'stoneImpact',id:shell.id,owner:shell.owner,x:shell.tx,z:shell.tz,radius:ARTILLERY.blastRadius});
  if(s.phase!=='battle')continue;
  for(const a of [...s.actors,...(s.guards||[])]){
   if(a.kind==='guard'&&(!guardActive(a)||a.owner===shell.owner))continue;
   const dx=a.x-shell.tx,dz=a.z-shell.tz,d=Math.hypot(dx,dz);if(a.ko||d>ARTILLERY.blastRadius||!hasWallSight({x:shell.tx,z:shell.tz},a,0))continue;
   const travelX=shell.tx-shell.startX,travelZ=shell.tz-shell.startZ,travelLength=Math.hypot(travelX,travelZ)||1;
   const direction=d>1e-6?{dx:dx/d,dz:dz/d}:{dx:travelX/travelLength,dz:travelZ/travelLength};
   const center=d<=ARTILLERY.innerRadius;
   hit(s,a,{owner:shell.owner,...direction,damage:center?4:2,force:center?12:8,lift:center?ARTILLERY.centerLift:ARTILLERY.rimLift,liftDuration:center?ARTILLERY.centerRecovery:ARTILLERY.rimRecovery});
  }
 }
 s.shells=s.shells.filter(shell=>shell.age<shell.duration);
}
