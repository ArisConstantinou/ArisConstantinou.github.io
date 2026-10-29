// Frog leaps on keyboard and touch use world-space height; the ordinary movement hop remains unchanged.
import {BASES,WALLS,ARENA_ROCKS,CATAPULT_SITES} from './arcade-bases.js';
import {FROG_BODY} from './arcade-actor-bounds.js';
export const AIR_RULES=Object.freeze({gravity:24,jumpVelocity:16,jumpSpeed:11,doubleVelocity:15,doubleSpeed:14,dashVelocity:8,dashSpeed:23,dashGravity:30,dashCooldown:.85,spread:.48,spitDuration:.24});
const finite=(v,d=0)=>Number.isFinite(v)?v:d;
const norm=(x,z)=>{const n=Math.hypot(x,z);return n>.08?{x:x/n,z:z/n}:null;};
export const flightActive=a=>!!a?.flight;
export const canAirVolley=(s,a)=>!!a?.flight&&!['surfaceHop'].includes(a.flight.kind)&&!a.ko&&!a.eliminated&&a.dizzyTime<=0&&!(a.hit>0)&&!(a.kick>0)&&!(a.knockUp>0)&&!a.catapultId&&!a.flight.fired&&(a.ammo>=3||s.training&&a.id==='player');
export function flightPose(a){
 const f=a.flight;if(!f)return null;
 return {phase:'air',progress:Math.max(.02,Math.min(.98,Number.isFinite(f.poseProgress)?f.poseProgress:.5-f.vy/(2*Math.max(1,f.launchVelocity))))};
}
export function roofSurfaces(s,x,z,ground){
 const surfaces=[];
 for(const b of BASES){
  if(s.bases?.find(v=>v.id===b.id)?.destroyed)continue;
  const sideways=b.side==='east'||b.side==='west',across=sideways?z-b.z:x-b.x,along=sideways?x-b.x:z-b.z;
  const w=(sideways?b.halfDepth:b.halfWidth)+.32,d=(sideways?b.halfWidth:b.halfDepth)+.32;
  if(Math.abs(across)<=w&&Math.abs(along)<=d)surfaces.push({id:'roof:'+b.id,y:ground(b.x,b.z)+4.05-(4.05-2.62)*Math.abs(across)/w,kind:'roof'});
 }
 return surfaces;
}
export function landingSurfaces(s,x,z,ground){
 const result=[{id:null,y:ground(x,z),kind:'ground'},...roofSurfaces(s,x,z,ground)];
 for(let i=0;i<ARENA_ROCKS.length;i++){const r=ARENA_ROCKS[i],q=((x-r.x)**2+(z-r.z)**2)/(r.r*r.r);if(q<=1)result.push({id:'rock:'+i,y:ground(r.x,r.z)+r.r*.9+r.r*1.7*Math.sqrt(1-q),kind:'rock'});}
 for(const w of WALLS)if(Math.abs(x-w.x)<=w.hw+.04&&Math.abs(z-w.z)<=w.hd+.04)result.push({id:'wall:'+w.id,y:ground(w.x,w.z)+w.height+.135,kind:'wall'});
 for(const c of CATAPULT_SITES)if(Math.hypot(x-c.x,z-c.z)<=.63)result.push({id:'machine:'+c.id,y:ground(c.x,c.z)+.45,kind:'machine',catapultId:c.id});
 return result;
}
export function clearFlight(a){a.flight=null;a.support=null;a.airSpit=0;a.height=0;a.hop=0;a.hopX=a.hopZ=0;}
function begin(s,a,kind,direction,ground){
 const old=a.flight,manual=kind==='jump'||kind==='double',velocity=kind==='double'?AIR_RULES.doubleVelocity:kind==='dash'?AIR_RULES.dashVelocity:kind==='surfaceHop'?6:AIR_RULES.jumpVelocity;
 const speed=kind==='double'?AIR_RULES.doubleSpeed:kind==='dash'?AIR_RULES.dashSpeed:kind==='surfaceHop'?8.8:AIR_RULES.jumpSpeed;
 const y=old?.y??ground(a.x,a.z)+a.height;
 a.flight={kind,y,vy:velocity,vx:direction.x*speed,vz:direction.z*speed,jumps:kind==='double'?2:manual?1:old?.jumps||0,launchVelocity:velocity,time:0,queued:old?.queued||false,fired:old?.fired||false,sourceSupport:a.support?.id??old?.sourceSupport??null,dashed:kind==='dash'||old?.dashed||false};
 a.support=null;a.hop=0;a.hopSpeed=1;a.hopX=a.flight.vx;a.hopZ=a.flight.vz;
 if(kind==='dash')a.dashCooldown=AIR_RULES.dashCooldown;
 s.events.push({type:'hop',id:a.id,x:a.x,z:a.z,strength:1,kind});
}
export function stepFlight(s,a,c,dt,{ground,move,volley,mount}){
 const direction=norm(finite(c.mx),finite(c.mz)),fallback=direction||norm(a.flight?.vx||0,a.flight?.vz||0)||{x:0,z:0};
 if(a.catapultId||a.ko||a.eliminated||a.knockUp>0){if(a.flight||a.support)clearFlight(a);return false;}
 if(a.dizzyTime>0){c={};if(a.flight)a.flight.queued=false;}
 if(c.jump&&a.kick<=0){
  if(!a.flight)begin(s,a,'jump',fallback,ground);
  else if(a.flight.jumps===0)begin(s,a,'jump',fallback,ground);
  else if(a.flight.jumps<2&&a.flight.kind!=='double')begin(s,a,'double',fallback,ground);
 }else if(c.dash&&direction&&!a.flight?.dashed&&a.kick<=0&&!(a.dashCooldown>0))begin(s,a,'dash',direction,ground);
 if(!a.flight&&a.support){
  const current=landingSurfaces(s,a.x,a.z,ground).find(p=>p.id===a.support.id);
  if(current){a.support=current;a.height=Math.max(0,current.y-ground(a.x,a.z));if(direction&&a.idle<=0)begin(s,a,'surfaceHop',direction,ground);else return true;}
  else{a.flight={kind:'fall',y:a.support.y,vy:0,vx:0,vz:0,jumps:1,launchVelocity:AIR_RULES.jumpVelocity,time:0,queued:false,fired:false,sourceSupport:a.support.id};a.support=null;}
 }
 const f=a.flight;if(!f)return false;
 if(!['dash','surfaceHop'].includes(f.kind)&&(Number.isFinite(c.mx)||Number.isFinite(c.mz))){const speed=f.jumps>=2?AIR_RULES.doubleSpeed:AIR_RULES.jumpSpeed,blend=1-Math.exp(-dt*12);f.vx+=((direction?.x||0)*speed-f.vx)*blend;f.vz+=((direction?.z||0)*speed-f.vz)*blend;}
 if(c.airVolley&&canAirVolley(s,a))f.queued=true;
 const gravity=f.kind==='dash'?AIR_RULES.dashGravity:AIR_RULES.gravity;
 let remaining=dt;
 // Substeps prevent a fast leap from tunnelling across a roof edge or thin wall.
 while(remaining>1e-8&&a.flight){
  const h=Math.min(remaining,1/120);remaining-=h;
  const oldY=f.y,oldVy=f.vy;f.time+=h;f.vy-=gravity*h;
  let nextY=oldY+oldVy*h-gravity*h*h/2;
  a.height=Math.max(0,oldY-ground(a.x,a.z));move(f.vx*h,f.vz*h);
  // A real roof also stops a jump from punching through it from underneath.
  if(f.vy>0)for(const roof of roofSurfaces(s,a.x,a.z,ground)){
   if(oldY+FROG_BODY.height<roof.y-.01&&nextY+FROG_BODY.height>=roof.y){nextY=roof.y-FROG_BODY.height-.015;f.vy=0;break;}
  }
  f.y=nextY;a.height=Math.max(0,f.y-ground(a.x,a.z));a.hopX=f.vx;a.hopZ=f.vz;
  if(f.queued&&!f.fired&&f.vy<=0&&canAirVolley(s,a)){
   if(volley()){f.fired=true;f.queued=false;a.airSpit=AIR_RULES.spitDuration;s.events.push({type:'airVolley',id:a.id});}
  }
  if(f.vy<=0){
   const surfaces=landingSurfaces(s,a.x,a.z,ground);let support=null,below=null;
   for(const p of surfaces){if(p.kind!=='ground'&&oldY<p.y-.08)continue;if(!below||p.y>below.y)below=p;if(nextY<=p.y+.001&&(!support||p.y>support.y))support=p;}
   if(below){const distance=Math.max(0,f.y-below.y),timeToLand=(f.vy+Math.sqrt(f.vy*f.vy+2*gravity*distance))/gravity;f.poseProgress=Math.max(.5-f.vy/(2*Math.max(1,f.launchVelocity)),timeToLand<.18?.73+.27*(1-timeToLand/.18):0);}
   if(support){
    a.flight=null;a.support=support.id?support:null;a.height=Math.max(0,support.y-ground(a.x,a.z));a.hopX=a.hopZ=0;a.idle=.035;
    s.events.push({type:'land',id:a.id,x:a.x,z:a.z,surface:support.id});
    if(support.kind==='machine'){const machine=s.catapults?.find(v=>v.id===support.catapultId);if(machine&&(!machine.owner||machine.owner===a.id)&&!machine.occupant&&mount()){a.support=null;a.height=0;}}
   }
  }
 }
 return true;
}
