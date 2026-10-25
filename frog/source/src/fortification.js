import {SHELTER_RADIUS} from './world-config.js';

export const FORT_RADIUS=SHELTER_RADIUS-.15;
export const GATE_WIDTH=6.8;
export const WALL_HEIGHT=3.8;
export const WALL_THICKNESS=.9;
const teamOf=actor=>actor?.team==='player'?'ally':actor?.team;
const finite=(value,fallback)=>Number.isFinite(value)?value:fallback;
const BODY_RADIUS=.52;
const fortFloor=camp=>finite(camp.floorY,finite(camp.mesh?.userData?.support?.y,finite(camp.mesh?.position?.y,0)+.11));

export function gateMaxHealth(camp){return 180+70*(Math.max(1,camp.tier||1)-1)+(camp.buildings?.palisade?140:0);}
export function initializeFort(camp){
  camp.gateMaxHp=gateMaxHealth(camp);
  camp.gateHp=Math.max(0,Math.min(camp.gateMaxHp,finite(camp.gateHp,camp.gateMaxHp)));
  return camp;
}
export function campLocal(camp,point){
  const yaw=camp.yaw||0,dx=point.x-camp.x,dz=point.z-camp.z;
  return {x:Math.cos(yaw)*dx-Math.sin(yaw)*dz,z:Math.sin(yaw)*dx+Math.cos(yaw)*dz};
}
export function campWorld(camp,point){
  const yaw=camp.yaw||0;
  return {x:camp.x+Math.cos(yaw)*point.x+Math.sin(yaw)*point.z,z:camp.z-Math.sin(yaw)*point.x+Math.cos(yaw)*point.z};
}
export function gatePoint(camp,offset=0){return campWorld(camp,{x:0,z:FORT_RADIUS+offset});}
export function insideFort(camp,point){return Math.hypot(point.x-camp.x,point.z-camp.z)<FORT_RADIUS-WALL_THICKNESS;}
export function canPassGate(camp,actor){return camp.destroyed||(camp.gateHp??gateMaxHealth(camp))<=0||teamOf(camp)===teamOf(actor);}

function keepRectBlocked(rect,point,padding=BODY_RADIUS){return point.x>rect.minX-padding&&point.x<rect.maxX+padding&&point.z>rect.minZ-padding&&point.z<rect.maxZ+padding;}
function keepWalls(camp,actor){
  const floor=fortFloor(camp),height=finite(actor.y,floor)-floor;
  return camp.destroyed||camp.hp<=0?[]:(camp.mesh?.userData?.keepCollision?.rects||[]).filter(r=>height<r.height+.15);
}
function blockedAt(camp,actor,point){
  if(camp.destroyed||camp.hp<=0)return false;
  const local=campLocal(camp,point),d=Math.hypot(local.x,local.z),body=BODY_RADIUS;
  if(keepWalls(camp,actor).some(r=>keepRectBlocked(r,local)))return true;
  const floor=fortFloor(camp);
  if(finite(actor.y,floor)>floor+WALL_HEIGHT+.15)return false;
  if(Math.abs(d-FORT_RADIUS)>WALL_THICKNESS/2+body)return false;
  const doorway=local.z>0&&Math.abs(local.x)<GATE_WIDTH/2-body;
  return !doorway||!canPassGate(camp,actor);
}
function segmentCrossesRect(from,to,rect,padding=BODY_RADIUS){
  let entry=0,exit=1;
  for(const [axis,min,max] of [['x',rect.minX-padding,rect.maxX+padding],['z',rect.minZ-padding,rect.maxZ+padding]]){
    const delta=to[axis]-from[axis];
    if(Math.abs(delta)<1e-8){if(from[axis]<=min||from[axis]>=max)return false;continue;}
    const a=(min-from[axis])/delta,b=(max-from[axis])/delta;
    entry=Math.max(entry,Math.min(a,b));exit=Math.min(exit,Math.max(a,b));
    if(entry>=exit)return false;
  }
  return exit>0&&entry<1;
}
function keepSegmentClear(rects,from,to){return !rects.some(r=>segmentCrossesRect(from,to,r));}

/** Move migrated positions and formation goals out of the actual keep masonry. */
export function clearFortPosition(camp,point){
  const rects=keepWalls(camp,point);if(!rects.length)return {x:point.x,z:point.z};
  let local=campLocal(camp,point);
  for(let pass=0;pass<8;pass++){
    const hit=rects.find(r=>keepRectBlocked(r,local));if(!hit)break;
    const padding=BODY_RADIUS+.12,candidates=[{x:hit.minX-padding,z:local.z},{x:hit.maxX+padding,z:local.z},{x:local.x,z:hit.minZ-padding},{x:local.x,z:hit.maxZ+padding}];
    candidates.sort((a,b)=>Math.hypot(a.x-local.x,a.z-local.z)-Math.hypot(b.x-local.x,b.z-local.z));
    local=candidates.find(candidate=>!rects.some(r=>keepRectBlocked(r,candidate)))||candidates[0];
  }
  return campWorld(camp,local);
}
function clearSegment(camp,actor,from,to){
  const length=Math.hypot(to.x-from.x,to.z-from.z),steps=Math.max(1,Math.ceil(length/.35));
  for(let i=1;i<=steps;i++)if(blockedAt(camp,actor,{x:from.x+(to.x-from.x)*i/steps,z:from.z+(to.z-from.z)*i/steps}))return false;
  return true;
}
/** Physical enclosure for every faction. Sideways motion slides along walls. */
export function resolveFortMovement(camps,actor,next){
  let target={x:next.x,z:next.z},blocked=false;
  for(const camp of camps){
    if(camp.destroyed||Math.hypot(actor.x-camp.x,actor.z-camp.z)>FORT_RADIUS+Math.hypot(target.x-actor.x,target.z-actor.z)+3)continue;
    if(clearSegment(camp,actor,actor,target))continue;
    blocked=true;
    const xOnly={x:target.x,z:actor.z},zOnly={x:actor.x,z:target.z};
    if(clearSegment(camp,actor,actor,xOnly))target=xOnly;
    else if(clearSegment(camp,actor,actor,zOnly))target=zOnly;
    else target={x:actor.x,z:actor.z};
  }
  return {...target,blocked};
}

export function fortLineClear(camps,actor,target){
  return camps.every(camp=>camp.destroyed||clearSegment(camp,actor,actor,target));
}

function crossesRing(camp,from,to){
  const a=campLocal(camp,from),b=campLocal(camp,to),dx=b.x-a.x,dz=b.z-a.z,l=dx*dx+dz*dz;
  const t=l?Math.max(0,Math.min(1,-(a.x*dx+a.z*dz)/l)):0;
  return Math.hypot(a.x+t*dx,a.z+t*dz)<FORT_RADIUS+1.3;
}

/** Route through the opening, never command an AI frog straight through a wall. */
function ringWaypoint(camps,actor,target){
  for(const camp of camps){
    if(camp.destroyed)continue;
    const fromInside=insideFort(camp,actor),toInside=insideFort(camp,target);
    if(fromInside&&toInside)continue;
    const local=campLocal(camp,actor),radius=FORT_RADIUS+3.2,d=Math.hypot(local.x,local.z);
    // Commit to crossing the full doorway. Switching at a distance threshold
    // outside the ring would send a frog back and forth in the opening.
    const inDoorway=Math.abs(local.x)<GATE_WIDTH/2-1&&local.z>FORT_RADIUS-4&&local.z<FORT_RADIUS+4.6;
    if(fromInside!==toInside&&inDoorway)return gatePoint(camp,toInside?-3.2:3.2);
    if(fromInside)return gatePoint(camp,-3.2);
    if(!toInside&&!crossesRing(camp,actor,target))continue;
    const a=Math.atan2(local.x,local.z),destination=toInside?0:Math.atan2(campLocal(camp,target).x,campLocal(camp,target).z);
    const delta=Math.atan2(Math.sin(destination-a),Math.cos(destination-a));
    if(d<radius-.5)return campWorld(camp,{x:Math.sin(a)*radius,z:Math.cos(a)*radius});
    if(Math.abs(delta)>.12){const nextAngle=a+Math.sign(delta)*Math.min(.25,Math.abs(delta));return campWorld(camp,{x:Math.sin(nextAngle)*radius,z:Math.cos(nextAngle)*radius});}
    if(toInside)return gatePoint(camp,canPassGate(camp,actor)?-3.2:3.2);
  }
  return target;
}

function keepWaypoint(camp,actor,target){
  const keep=camp.mesh?.userData?.keepCollision,rects=keepWalls(camp,actor);
  if(!keep||!rects.length)return target;
  const from=campLocal(camp,actor),safeTarget=clearFortPosition(camp,target),to=campLocal(camp,safeTarget);
  if(keepSegmentClear(rects,from,to))return safeTarget;
  const margin=BODY_RADIUS+.9,minX=Math.min(...rects.map(r=>r.minX))-margin,maxX=Math.max(...rects.map(r=>r.maxX))+margin,minZ=Math.min(...rects.map(r=>r.minZ))-margin,maxZ=Math.max(...rects.map(r=>r.maxZ))+margin;
  const nodes=[from,to,{x:minX,z:minZ},{x:maxX,z:minZ},{x:minX,z:maxZ},{x:maxX,z:maxZ},{x:keep.door.x,z:keep.door.z-2},{x:keep.door.x,z:keep.door.z+2}];
  const costs=nodes.map(()=>Infinity),previous=nodes.map(()=>-1),visited=new Set();costs[0]=0;
  for(let step=0;step<nodes.length;step++){
    let current=-1;for(let i=0;i<nodes.length;i++)if(!visited.has(i)&&(current<0||costs[i]<costs[current]))current=i;
    if(current<0||!Number.isFinite(costs[current])||current===1)break;visited.add(current);
    for(let i=1;i<nodes.length;i++){if(visited.has(i)||!keepSegmentClear(rects,nodes[current],nodes[i]))continue;const distance=costs[current]+Math.hypot(nodes[current].x-nodes[i].x,nodes[current].z-nodes[i].z);if(distance<costs[i]){costs[i]=distance;previous[i]=current;}}
  }
  if(previous[1]<0)return safeTarget;
  let first=1;while(previous[first]>0)first=previous[first];
  return campWorld(camp,nodes[first]);
}

/** Both courtyard and keep doors are traversable without walking through walls. */
export function fortWaypoint(camps,actor,target){
  const waypoint=ringWaypoint(camps,actor,target);
  for(const camp of camps){
    if(camp.destroyed||Math.hypot(actor.x-camp.x,actor.z-camp.z)>FORT_RADIUS+3)continue;
    const routed=keepWaypoint(camp,actor,waypoint);
    if(Math.hypot(routed.x-waypoint.x,routed.z-waypoint.z)>.01)return routed;
  }
  return waypoint;
}
