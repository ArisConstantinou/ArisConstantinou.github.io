import{plannedRoot as ledgeRoot}from'./arcade-climb-path.js';export{plannedRoot as ledgeRoot}from'./arcade-climb-path.js';import{climbPhysicsData}from'./arcade-contact-data.js';import{retargetClimb}from'./arcade-climb-retarget.js';import{fastSolidFor}from'./arcade-climb-solid.js';import{supportHeight}from'./arcade-scenery-contact.js';import{BASES}from'./arcade-bases.js';
import {frogBody} from './arcade-actor-bounds.js';
import {sceneContactsEnabled,sceneryObjects} from './arcade-scenery-contact.js';
export const LEDGE=Object.freeze({duration:3.2,reach:1.05,minGap:.18,standDistance:.8});
const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
// Search a hand-sized patch of the actual upper mesh, never an object centre.
export function findLedge(s,a,ground,surfaces,accept=null){
 const f=a.flight;if(!sceneContactsEnabled(s)||a.characterClass!=='heavy'||!f||!['jump','double','wallJump','dash'].includes(f.kind)||f.vy>3||f.vy< -7||a.ledgeCooldown>0||a.classAction?.remaining)return null;
 const speed=Math.hypot(f.vx,f.vz);if(speed<1)return null;const ix=f.vx/speed,iz=f.vz/speed,r=frogBody(a).movementRadius;
 for(let distance=r-.16;distance<=r+.45;distance+=.035){
  for(const probe of surfaces(a.x+ix*distance,a.z+iz*distance)){
   if(!['rock','roof'].includes(probe.kind)||probe.id===f.sourceSupport&&probe.y<=(f.launchBase??f.y)+.18)continue;let nx=ix,nz=iz;
   if(probe.kind==='rock'){const object=sceneryObjects().find(o=>o.id===probe.id),length=Math.hypot(object.x-a.x,object.z-a.z);if(length<1e-6)continue;nx=(object.x-a.x)/length;nz=(object.z-a.z)/length;if(nx*ix+nz*iz<.35)continue;}
   const same=(x,z)=>surfaces(x,z).find(q=>q.id===probe.id),x=a.x+nx*distance,z=a.z+nz*distance,p=same(x,z);if(!p)continue;const gap=p.y-f.y;if(gap<LEDGE.minGap||gap>LEDGE.reach)continue;
   const back=same(x-nx*.40,z-nz*.40),inside=same(x+nx*LEDGE.standDistance,z+nz*LEDGE.standDistance),left=same(x-nz*.50,z+nx*.50),right=same(x+nz*.50,z-nx*.50);
   if(back&&back.y>p.y-.24||!inside||inside.y<p.y-.15||inside.y>p.y+.34||!left||!right||Math.abs(left.y-p.y)>.22||Math.abs(right.y-p.y)>.22)continue;
   const l={id:p.id,kind:p.kind,x,z,y:p.y,nx,nz,stand:{x:x+nx*LEDGE.standDistance,z:z+nz*LEDGE.standDistance,y:inside.y},start:{x:a.x,z:a.z,y:f.y},duration:LEDGE.duration};if(!accept||accept(l))return l;
  }
 }return null;
}
export function catchLedge(s,a,l){if(!l)return false;const f=a.flight;a.flight={...f,kind:'ledge',ledge:l,time:0,vx:0,vz:0,vy:0,queued:false,fired:true};a.support=null;a.hop=a.hopX=a.hopZ=0;s.events.push({type:'ledgeGrab',id:a.id,surface:l.id});return true;}
export function stepLedge(s,a,c,dt,ground,surfaces){
 const f=a.flight;if(f?.kind!=='ledge')return false;const l=f.ledge,support=surfaces(l.stand.x,l.stand.z).find(p=>p.id===l.id),release=c.dash||(c.jump&&f.time>.20)||a.hit>0||a.dizzyTime>0||!support||((c.mx||0)*l.nx+(c.mz||0)*l.nz<-.6);
 if(release){a.ledgeCooldown=.65;a.flight={...f,kind:'fall',vy:0,vx:-l.nx*3,vz:-l.nz*3,jumps:2};return !c.dash;}
 f.time+=Math.max(0,dt);const p=ledgeRoot(l,f.time);a.x=p.x;a.z=p.z;f.y=p.y;a.height=Math.max(0,p.y-ground(p.x,p.z));a.face=Math.atan2(l.nx,l.nz);a.poseAimYaw=a.face;a.hop=a.hopX=a.hopZ=0;
 if(f.time>=l.duration){a.x=l.stand.x;a.z=l.stand.z;a.flight=null;a.support=support;a.height=Math.max(0,support.y-ground(a.x,a.z));a.idle=0;a.ledgeCooldown=.45;a.rockPerchWait=0;a.climbStance={id:l.id,nx:l.nx,nz:l.nz,pitch:l.endPitch??l.plan.endPitch??0};s.events.push({type:'land',id:a.id,x:a.x,z:a.z,y:support.y,surface:support.id,impactSpeed:0,heavy:false});}
 return true;
}

export function fitClimb(s,l,ground){
 const data=climbPhysicsData();if(!data)return false;const object=sceneryObjects().find(o=>o.id===l.id)||BASES.find(b=>'roof:'+b.id===l.id);if(!object)return false;l.floor=ground(object.x,object.z);
 const plan=retargetClimb(l,data.profile,data.templates,{top:(x,z)=>supportHeight(s,l.id,x,z,()=>l.floor),ground,solid:fastSolidFor(l,ground)});if(!plan.ok)return false;l.plan=plan;l.endPitch=plan.endPitch;return true;
}
export function reachableClimb(s,a,ground,surfaces){return climbPhysicsData()?findLedge(s,a,ground,surfaces,l=>fitClimb(s,l,ground)):null;}
export function ownRoofClimb(s,a,target,ground,surfaces){
 if(a.characterClass!=='heavy'||a.flight?.kind!=='wallHold')return null;const wall=a.flight.wall,id='roof:'+wall.enclosureId;
 if(!surfaces(target.x,target.z).some(p=>p.id===id))return null;
 const probe={...a,flight:{...a.flight,kind:'wallJump',vx:-wall.nx*6,vz:-wall.nz*6,vy:0}};
 return climbPhysicsData()?findLedge(s,probe,ground,surfaces,l=>l.id===id&&fitClimb(s,l,ground)):null;
}
