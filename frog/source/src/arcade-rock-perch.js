import {ARENA_ROCKS} from './arcade-bases.js';
import {sceneContactsEnabled,sceneryObjects,sceneryHeight} from './arcade-scenery-contact.js';
const ROCK_GRAVITY=24;
// A deliberate leap toward a nearby rock ends on its top. Its height determines
// the arc; this does not raise free-space jumps or let movement walk off a perch.
export function rockLeapPlan(s,a,direction,ground,speed){
 const GRAVITY=a.flight?.kind==='dash'?30:ROCK_GRAVITY;
 if(!a.characterClass||!direction)return null;
 const source=a.support?.id??a.flight?.sourceSupport,fromRock=source?.startsWith('rock:'),startY=a.flight?.y??ground(a.x,a.z)+(a.height||0),range=fromRock?10.5:8.5;
 let best=null;
 const rocks=sceneContactsEnabled(s)?sceneryObjects().filter(o=>o.kind==='rock'):ARENA_ROCKS.map((o,i)=>({...o,id:'rock:'+i,radius:o.r*1.42}));
 for(const o of rocks){
  if(o.id===source||o.id===a.flight?.rockAttempted)continue;
  const dx=o.x-a.x,dz=o.z-a.z,distance=Math.hypot(dx,dz),along=dx*direction.x+dz*direction.z,lateral=Math.abs(dx*direction.z-dz*direction.x);
  if(distance<.35||distance>range||along/distance<.65)continue;
  // Test the actual aimed footprint, including offset/edge approaches.
  if(sceneContactsEnabled(s)?sceneryHeight(o,a.x+direction.x*along,a.z+direction.z*along)===null:lateral>o.r)continue;
  const local=sceneContactsEnabled(s)?sceneryHeight(o,o.x,o.z):o.r*2.6;
  if(local===null)continue;
  const y=ground(o.x,o.z)+local;
  // Close rocks can require a taller, slower leap than an ordinary ground hop.
  const travel=distance/(speed*1.1),requiredVy=Math.max(0,(y-startY+.5*GRAVITY*travel*travel)/travel);
  const apex=Math.max(Math.max(startY,y)+.85,startY+requiredVy*requiredVy/(2*GRAVITY)),vy=Math.sqrt(2*GRAVITY*(apex-startY)),duration=(vy+Math.sqrt(vy*vy+2*GRAVITY*(startY-y)))/GRAVITY;
  if(distance/duration>speed*1.2)continue;
  if(!best||distance<best.distance)best={id:o.id,x:o.x,z:o.z,y,vy,duration,distance,apex,speed:speed*1.2};
 }
 return best;
}
export function aimRockLeap(a,plan){
 const f=a.flight;f.rockTarget=plan;f.rockAttempted=plan.id;f.time=0;f.vy=plan.vy;f.launchVelocity=plan.vy;f.ceiling=plan.apex;f.vx=(plan.x-a.x)/plan.duration;f.vz=(plan.z-a.z)/plan.duration;
}
export function steerRockLeap(a,h){
 const f=a.flight,p=f.rockTarget;if(!p)return;
 const remaining=p.duration-f.time;
 if(remaining<=h&&Math.hypot(p.x-a.x,p.z-a.z)>.2){delete f.rockTarget;f.vx=f.vz=0;return;}
 const dx=p.x-a.x,dz=p.z-a.z,d=Math.hypot(dx,dz),speed=Math.min(p.speed,d/Math.max(h,remaining));f.vx=d>1e-7?dx/d*speed:0;f.vz=d>1e-7?dz/d*speed:0;
}
