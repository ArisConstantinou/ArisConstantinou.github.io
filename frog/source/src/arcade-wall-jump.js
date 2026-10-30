import {jumpCeiling} from './arcade-jump-balance.js';
import {inheritSceneContacts} from './arcade-scenery-contact.js';
import {BASES,WALLS,ARENA_ROCKS,CATAPULT_SITES,resolveArenaMove} from './arcade-bases.js';
import {FROG_BODY,frogBody} from './arcade-actor-bounds.js';
import {ARENA_MOVE_RADIUS} from './arcade-battleground.js';
export const WALL_JUMP=Object.freeze({gravity:24,minRange:4.5,maxRange:30,maxSpeed:27,contactGap:.09,settleTime:.18});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function wallContact(s,a,ground){
 const y=a.flight?.y??ground(a.x,a.z)+(a.height||0);let best=null;
 for(const wall of WALLS){
  if(s.bases?.find(b=>b.id===wall.enclosureId)?.destroyed)continue;
  const bottom=ground(wall.x,wall.z),top=bottom+wall.height+.135;
  if(y>=top-.18||y+frogBody(a).height<=bottom+.15)continue;
  const px=clamp(a.x,wall.x-wall.hw,wall.x+wall.hw),pz=clamp(a.z,wall.z-wall.hd,wall.z+wall.hd),dx=a.x-px,dz=a.z-pz,d=Math.hypot(dx,dz);
  if(d>frogBody(a).movementRadius+WALL_JUMP.contactGap||d<1e-5)continue;
  if(!best||d<best.distance)best={id:wall.id,enclosureId:wall.enclosureId,nx:dx/d,nz:dz/d,distance:d,x:px,z:pz,bottom,top};
 }
 return best;
}
export function wallLanding(s,x,z,ground,surfaces,nearY=Infinity){
 const available=surfaces(x,z).filter(p=>p.y<=nearY+.4);return available.sort((a,b)=>b.y-a.y)[0]||{x,z,y:ground(x,z),kind:'ground'};
}
export function wallPoint(plan,t){return {x:plan.start.x+plan.vx*t,y:plan.start.y+plan.vy*t-WALL_JUMP.gravity*t*t/2,z:plan.start.z+plan.vz*t};}
export function planWallJump(s,a,target,ground,surfaces){
 const wall=a.flight?.wall;if(!wall||!target||![target.x,target.z].every(Number.isFinite))return null;
 const start={x:a.x,y:a.flight.y,z:a.z},dx=target.x-start.x,dz=target.z-start.z,distance=Math.hypot(dx,dz),surface=wallLanding(s,target.x,target.z,ground,surfaces,Number.isFinite(target.y)?target.y:Infinity),end={x:target.x,y:surface.y,z:target.z,kind:surface.kind,id:surface.id};
 const base={start,target:end,valid:false,reason:'range'};if(distance<WALL_JUMP.minRange||distance>WALL_JUMP.maxRange||Math.hypot(end.x,end.z)>ARENA_MOVE_RADIUS-.7)return base;
 if((dx*wall.nx+dz*wall.nz)/distance<.22)return {...base,reason:'wall'};
 const launchBase=a.flight.launchBase??ground(a.x,a.z),ceiling=a.flight.ceiling??jumpCeiling(a,launchBase);if(end.y>=ceiling-.08)return {...base,reason:'height'};
 const apex=Math.min(Math.max(start.y,end.y)+1.6+distance*.12,ceiling),vy=Math.sqrt(2*WALL_JUMP.gravity*(apex-start.y)),duration=vy/WALL_JUMP.gravity+Math.sqrt(2*(apex-end.y)/WALL_JUMP.gravity),vx=dx/duration,vz=dz/duration,plan={...base,reason:null,launchBase,ceiling,vx,vy,vz,duration,gravity:WALL_JUMP.gravity};
 if(Math.hypot(vx,vz)>WALL_JUMP.maxSpeed)return {...plan,reason:'speed'};
 let previous=start;const count=Math.ceil(duration*90);
 for(let i=1;i<=count;i++){
  const p=wallPoint(plan,duration*i/count),probe=inheritSceneContacts(a,{...a,x:previous.x,z:previous.z,height:Math.max(0,Math.min(previous.y,p.y)-ground(previous.x,previous.z)),flight:{kind:'wallJump'},support:null});
  const moved=resolveArenaMove(probe,p.x-previous.x,p.z-previous.z,{ground});
  if(Math.hypot(moved.x-p.x,moved.z-p.z)>.055)return {...plan,reason:'blocked'};
  if(i<count-1&&p.y<ground(p.x,p.z)-.035)return {...plan,reason:'terrain'};
  for(const roof of surfaces(p.x,p.z).filter(v=>v.kind==='roof'))if(previous.y+frogBody(a).height<roof.y-.015&&p.y+frogBody(a).height>=roof.y)return {...plan,reason:'roof'};
  previous=p;
 }
 return {...plan,valid:true};
}
export function automaticWallTarget(s,a,ground,surfaces){
 const w=a.flight?.wall;if(!w)return null;
 const candidates=[...BASES.filter(b=>!s.bases?.find(q=>q.id===b.id)?.destroyed).map(b=>({x:b.x,z:b.z})),...ARENA_ROCKS.map(r=>({x:r.x,z:r.z})),...CATAPULT_SITES.map(c=>({x:c.x,z:c.z}))];
 candidates.sort((a1,b)=>Math.hypot(a1.x-a.x,a1.z-a.z)-Math.hypot(b.x-a.x,b.z-a.z));
 for(const p of candidates){const plan=planWallJump(s,a,p,ground,surfaces);if(plan?.valid)return plan;}
 for(const range of [18,15,12,9])for(const angle of [0,.35,-.35]){const c=Math.cos(angle),t=Math.sin(angle),plan=planWallJump(s,a,{x:a.x+(w.nx*c-w.nz*t)*range,z:a.z+(w.nx*t+w.nz*c)*range},ground,surfaces);if(plan?.valid)return plan;}
 return null;
}
export function startWallJump(s,a,plan){
 if(!plan?.valid)return false;const old=a.flight;a.flight={kind:'wallJump',y:old.y,launchBase:plan.launchBase,ceiling:plan.ceiling,vy:plan.vy,vx:plan.vx,vz:plan.vz,jumps:1,launchVelocity:plan.vy,time:0,queued:false,fired:old.fired||false,dashed:old.dashed||false,wall:old.wall,wallLaunchTarget:plan.target,wallLaunchDuration:plan.duration};a.support=null;a.hop=0;a.face=Math.atan2(plan.vx,plan.vz);a.poseAimYaw=a.face;a.hopX=plan.vx;a.hopZ=plan.vz;s.events.push({type:'hop',id:a.id,x:a.x,z:a.z,strength:1,kind:'wallJump'});return true;
}
export function stepWallHold(s,a,c,ground,surfaces,dt=1/60){
 const f=a.flight;if(!f)return false;if(c.dash){if(f.kind==='wallHold')a.flight={...f,kind:'fall',vy:0};return false;}if(a.dizzyTime>0){if(f.kind==='wallHold')a.flight={...f,kind:'fall',vy:0};return false;}
 if(f.kind==='wallHold'&&((c.mx||0)*f.wall.nx+(c.mz||0)*f.wall.nz)>.25){a.flight={...f,kind:'fall',vy:0,vx:(c.mx||0)*6,vz:(c.mz||0)*6};return false;}
 if(f.kind!=='wallHold'){
  if(!c.wallMode||['surfaceHop','fall'].includes(f.kind)||a.classAction?.kind==='bodySlam'||f.kind==='wallJump'&&f.time<.25)return false;
  const contact=wallContact(s,a,ground);if(!contact||(f.vx||0)*contact.nx+(f.vz||0)*contact.nz>=-.15)return false;
  if(a.height<.12)return false;
  a.flight={kind:'wallHold',y:f.y,launchBase:f.y,ceiling:jumpCeiling(a,f.y),vy:0,vx:0,vz:0,jumps:f.jumps||1,launchVelocity:16,time:0,wall:contact,fired:f.fired||false,dashed:f.dashed||false};a.hop=0;a.hopX=a.hopZ=0;s.events.push({type:'wallCling',id:a.id,wallId:contact.id});
 }
 const contact=wallContact(s,a,ground);
 if(!contact||contact.id!==a.flight.wall.id){a.flight={...a.flight,kind:'fall',vy:0};return false;}
 a.height=Math.max(0,a.flight.y-ground(a.x,a.z));
 a.flight.time=(a.flight.time||0)+Math.max(0,dt);
 if(c.wallMode==='auto'&&a.flight.time>=WALL_JUMP.settleTime){const plan=automaticWallTarget(s,a,ground,surfaces);if(plan)startWallJump(s,a,plan);}
 else if(c.wallMode!=='auto'&&(c.jump||c.wallLaunch)){const plan=planWallJump(s,a,c.wallTarget,ground,surfaces);if(plan?.valid)startWallJump(s,a,plan);}
 return a.flight.kind==='wallHold';
}
