import {WALLS,BASES} from './arcade-bases.js';
import {FROG_BODY,FROG_HIT_VOLUMES,actorBodyBase,actorBodyYaw} from './arcade-actor-bounds.js';
import {GUARD_BODY,guardActive} from './arcade-guards.js';

export const PROJECTILE=Object.freeze({radius:.1,muzzleOffset:.8,originHeight:.45,bodyHeight:FROG_BODY.height,terrainStep:.12});
const EPS=1e-9,contexts=new WeakMap();
const flat={ground:()=>0,solids:new Map()};
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
const context=state=>contexts.get(state)||flat;
export function setProjectileWorld(state,{ground,actorYaw,actorMouth}={}){
 if(typeof ground!=='function'){contexts.delete(state);return state;}
 const previous=contexts.get(state);
 if(previous?.ground!==ground)contexts.set(state,{ground,actorYaw,actorMouth,solids:new Map()});
 else {previous.actorYaw=actorYaw;previous.actorMouth=actorMouth;}
 return state;
}
export function projectileGround(state,x,z){return finite(context(state).ground(x,z));}
export function normalizeAim(x,y,z,fallback={x:0,y:0,z:1}){
 x=finite(x);y=finite(y);z=finite(z);const length=Math.hypot(x,y,z);
 return length>EPS?{x:x/length,y:y/length,z:z/length}:{...fallback};
}
export function projectileOrigin(state,actor){
 return {x:actor.x,y:actorBodyBase(actor,projectileGround(state,actor.x,actor.z))+PROJECTILE.originHeight,z:actor.z};
}
export function projectileMouth(state,actor){
 const supplied=context(state).actorMouth?.(actor);
 if(supplied&&[supplied.x,supplied.y,supplied.z].every(Number.isFinite))return {x:supplied.x,y:supplied.y,z:supplied.z};
 const yaw=actorBodyYaw(actor),origin=projectileOrigin(state,actor);
 return {x:origin.x+Math.sin(yaw)*.5,y:origin.y-.12,z:origin.z+Math.cos(yaw)*.5};
}

export function projectileDirection(actor){return normalizeAim(actor.aimX,actor.aimY,actor.aimZ);}
export function projectileFollowsGround(actor){return !actor.aim3D&&Math.abs(finite(actor.aimY))<EPS;}
const point=(origin,direction,distance)=>({x:origin.x+direction.x*distance,y:origin.y+direction.y*distance,z:origin.z+direction.z*distance});

function boxContact(a,b,box){
 let enter=0,leave=1,normal={x:0,y:0,z:0};
 for(const axis of ['x','y','z']){
  const delta=b[axis]-a[axis],low=box.min[axis],high=box.max[axis];
  if(Math.abs(delta)<EPS){if(a[axis]<low||a[axis]>high)return null;continue;}
  const t1=(low-a[axis])/delta,t2=(high-a[axis])/delta,near=Math.min(t1,t2),far=Math.max(t1,t2);
  if(near>enter){enter=near;normal={x:0,y:0,z:0};normal[axis]=delta>0?-1:1;}
  leave=Math.min(leave,far);if(enter>leave+EPS)return null;
 }
 if(leave<0||enter>1)return null;
 if(!normal.x&&!normal.y&&!normal.z)normal=normalizeAim(a.x-b.x,a.y-b.y,a.z-b.z,{x:0,y:1,z:0});
 return {t:Math.max(0,enter),normal};
}
function ellipsoidContact(a,b,center,radii){
 const ox=(a.x-center.x)/radii.x,oy=(a.y-center.y)/radii.y,oz=(a.z-center.z)/radii.z;
 const dx=(b.x-a.x)/radii.x,dy=(b.y-a.y)/radii.y,dz=(b.z-a.z)/radii.z,A=dx*dx+dy*dy+dz*dz,B=ox*dx+oy*dy+oz*dz,C=ox*ox+oy*oy+oz*oz-1;
 let t=0;if(C>0){if(A<EPS)return null;const D=B*B-A*C;if(D<0)return null;t=(-B-Math.sqrt(D))/A;if(t<0||t>1)return null;}
 return {t,normal:normalizeAim((ox+dx*t)/radii.x,(oy+dy*t)/radii.y,(oz+dz*t)/radii.z,{x:0,y:1,z:0})};
}
function actorContact(state,a,b,actor){
 const suppliedYaw=context(state).actorYaw?.(actor),yaw=Number.isFinite(suppliedYaw)?suppliedYaw:actorBodyYaw(actor),c=Math.cos(yaw),s=Math.sin(yaw);
 const floor=actorBodyBase(actor,projectileGround(state,actor.x,actor.z));
 const local=p=>{const x=p.x-actor.x,z=p.z-actor.z;return {x:c*x-s*z,y:p.y-floor,z:s*x+c*z};};
 const start=local(a),end=local(b),padding=PROJECTILE.radius;
 let best=null;
 for(const body of FROG_HIT_VOLUMES){
  // The only expansion is the fly's physical radius, not magazine size or
  // aiming assistance. Actual flight and the preview share this exact sweep.
  const hit=ellipsoidContact(start,end,body.center,{x:body.radii.x+padding,y:body.radii.y+padding,z:body.radii.z+padding});
  if(hit&&(!best||hit.t<best.t))best=hit;
 }
 if(!best)return null;
 const n=best.normal;return {...best,normal:{x:c*n.x+s*n.z,y:n.y,z:-s*n.x+c*n.z}};
}
function triangleContact(a,b,triangle){
 const [v0,v1,v2]=triangle,dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,e1x=v1.x-v0.x,e1y=v1.y-v0.y,e1z=v1.z-v0.z,e2x=v2.x-v0.x,e2y=v2.y-v0.y,e2z=v2.z-v0.z;
 const px=dy*e2z-dz*e2y,py=dz*e2x-dx*e2z,pz=dx*e2y-dy*e2x,det=e1x*px+e1y*py+e1z*pz;
 if(Math.abs(det)<EPS)return null;const inv=1/det,tx=a.x-v0.x,ty=a.y-v0.y,tz=a.z-v0.z,u=(tx*px+ty*py+tz*pz)*inv;if(u< -EPS||u>1+EPS)return null;
 const qx=ty*e1z-tz*e1y,qy=tz*e1x-tx*e1z,qz=tx*e1y-ty*e1x,v=(dx*qx+dy*qy+dz*qz)*inv;if(v< -EPS||u+v>1+EPS)return null;
 const t=(e2x*qx+e2y*qy+e2z*qz)*inv;if(t<0||t>1)return null;
 const normal=normalizeAim(e1y*e2z-e1z*e2y,e1z*e2x-e1x*e2z,e1x*e2y-e1y*e2x);if(normal.x*dx+normal.y*dy+normal.z*dz>0){normal.x*=-1;normal.y*=-1;normal.z*=-1;}return {t,normal};
}
function roofGeometry(state){
 return BASES.map(base=>{const sideways=base.side==='east'||base.side==='west',w=(sideways?base.halfDepth:base.halfWidth)+.32,d=(sideways?base.halfWidth:base.halfDepth)+.32,floor=projectileGround(state,base.x,base.z);
 const vertices=[[-w,2.62,-d],[0,4.05,-d],[w,2.62,-d],[-w,2.62,d],[0,4.05,d],[w,2.62,d]].map(([x,y,z])=>({x:base.x+(sideways?z:x),y:floor+y,z:base.z+(sideways?-x:z)}));
 return {id:base.id,triangles:[[0,3,4],[0,4,1],[1,4,5],[1,5,2],[0,1,2],[3,5,4]].map(t=>t.map(i=>vertices[i]))};});
}

function solids(state,obstacles){
 const c=context(state);let cached=c.solids.get(obstacles);if(cached)return cached;
 const padding=PROJECTILE.radius;
 cached={walls:WALLS.map(w=>{
  const ground=projectileGround(state,w.x,w.z);
  return {id:w.id,min:{x:w.x-w.hw-padding,y:ground-padding,z:w.z-w.hd-padding},max:{x:w.x+w.hw+padding,y:ground+w.height+.135+padding,z:w.z+w.hd+padding}};
 }),rocks:obstacles.map(o=>({...o,ground:projectileGround(state,o.x,o.z)})),roofs:roofGeometry(state)};
 c.solids.set(obstacles,cached);return cached;
}
function terrainContact(state,a,b){
 const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,horizontal=Math.hypot(dx,dz);
 const clearance=t=>a.y+dy*t-projectileGround(state,a.x+dx*t,a.z+dz*t)-PROJECTILE.radius;
 let previous=0,low=clearance(0);if(low<=0)return {t:0,normal:terrainNormal(state,a.x,a.z)};
 // At fixed X/Z, the height-field intersection is exact, including a vertical shot.
 if(horizontal<EPS){if(dy>=0)return null;const t=-low/dy;return t<=1?{t,normal:terrainNormal(state,a.x,a.z)}:null;}
 const count=Math.max(1,Math.ceil(horizontal/PROJECTILE.terrainStep));
 for(let i=1;i<=count;i++){
  const t=i/count,value=clearance(t);
  if(value<=0){let from=previous,to=t;for(let j=0;j<24;j++){const middle=(from+to)/2;if(clearance(middle)>0)from=middle;else to=middle;}return {t:to,normal:terrainNormal(state,a.x+dx*to,a.z+dz*to)};}
  previous=t;low=value;
 }
 return null;
}
function terrainNormal(state,x,z){
 const d=.025,dx=(projectileGround(state,x+d,z)-projectileGround(state,x-d,z))/(2*d),dz=(projectileGround(state,x,z+d)-projectileGround(state,x,z-d))/(2*d);
 return normalizeAim(-dx,1,-dz);
}
function boundaryContact(a,b,radius){
 if(!Number.isFinite(radius))return null;
 const dx=b.x-a.x,dz=b.z-a.z,A=dx*dx+dz*dz,B=a.x*dx+a.z*dz,C=a.x*a.x+a.z*a.z-radius*radius;
 if(C>EPS)return {t:0,normal:normalizeAim(-a.x,0,-a.z)};
 if(A<EPS)return null;const D=B*B-A*C;if(D<0)return null;
 const t=(-B+Math.sqrt(D))/A;if(t<0||t>1)return null;
 return {t,normal:normalizeAim(-a.x-dx*t,0,-a.z-dz*t)};
}

// Shared swept volume test for both actual fly flight and cursor/guide rays.
export function traceWorldSegment(state,a,b,{obstacles=[],ignoreId,hitActors=true,terrain=true,solidFrom=0,arenaRadius=Infinity}={}){
 solidFrom=Math.max(0,finite(solidFrom));
 const length=Math.hypot(b.x-a.x,b.y-a.y,b.z-a.z),from=clamp(finite(solidFrom)/Math.max(length,EPS),0,1);
 const start={x:a.x+(b.x-a.x)*from,y:a.y+(b.y-a.y)*from,z:a.z+(b.z-a.z)*from};
 let best=null;
 const consider=(contact,kind,extra={},offset=0)=>{
  if(!contact)return;const t=offset+contact.t*(1-offset);if(t< -EPS||t>1+EPS||best&&t>=best.t-EPS)return;
  best={...contact,...extra,t,kind,targetId:extra.targetId??null,blocked:kind!=='actor'&&kind!=='guard'};
 };
 const geometry=solids(state,obstacles);
 if(solidFrom<=length){
  for(const roof of geometry.roofs){if(state.bases?.find(b=>b.id===roof.id)?.destroyed)continue;for(const triangle of roof.triangles)consider(triangleContact(start,b,triangle),'roof',{baseId:roof.id},from);}
  for(const wall of geometry.walls)consider(boxContact(start,b,wall),'wall',{wallId:wall.id},from);
  for(const rock of geometry.rocks)consider(ellipsoidContact(start,b,{x:rock.x,y:rock.ground+rock.r*.9,z:rock.z},{x:rock.r+PROJECTILE.radius,y:rock.r*1.7+PROJECTILE.radius,z:rock.r+PROJECTILE.radius}),'rock',{},from);
 }
 // The camera may see another frog behind the player's muzzle plane. Only
 // camera-side scenery is skipped; ignoreId already excludes the aiming frog.
 if(hitActors)for(const actor of state.actors){
  if(actor.id===ignoreId||actor.ko||actor.eliminated)continue;
  consider(actorContact(state,a,b,actor),'actor',{targetId:actor.id});
 }
 if(hitActors)for(const guard of state.guards||[]){
  // A storage beetle is friendly to its owner; it cannot absorb an owner's
  // shot or become their camera/automatic-fire target.
  if(!guardActive(guard)||guard.id===ignoreId||guard.owner===ignoreId)continue;
  const padding=PROJECTILE.radius,center={x:guard.x,y:projectileGround(state,guard.x,guard.z)+GUARD_BODY.centerY,z:guard.z};
  consider(ellipsoidContact(a,b,center,{x:GUARD_BODY.radius+padding,y:GUARD_BODY.height/2+padding,z:GUARD_BODY.radius+padding}),'guard',{targetId:guard.id});
 }
 if(terrain)consider(terrainContact(state,a,b),'terrain');
 consider(boundaryContact(a,b,arenaRadius),'boundary');
 if(!best)return null;
 return {...best,x:a.x+(b.x-a.x)*best.t,y:a.y+(b.y-a.y)*best.t,z:a.z+(b.z-a.z)*best.t,distance:length*best.t};
}
export function worldRay(state,origin,direction,range,options={}){
 const d=normalizeAim(direction.x,direction.y,direction.z),length=Math.max(0,finite(range));
 return traceWorldSegment(state,origin,point(origin,d,length),options);
}
export function projectilePoint(state,projectile,distance){
 const p={x:projectile.x+projectile.dx*distance,y:finite(projectile.y,projectileGround(state,projectile.x,projectile.z)+PROJECTILE.originHeight)+finite(projectile.dy)*distance,z:projectile.z+projectile.dz*distance};
 if(projectile.followGround)p.y=projectileGround(state,p.x,p.z)+finite(projectile.heightOffset,PROJECTILE.originHeight);
 return p;
}
export function traceProjectile(state,projectile,distance,options={}){
 const origin={x:projectile.x,y:finite(projectile.y,projectileGround(state,projectile.x,projectile.z)+PROJECTILE.originHeight),z:projectile.z};
 // Planar overview/stick flight follows the surface, using the same finite
 // wall/body heights. Explicit 3D flight never snaps back to this surface.
 const count=projectile.followGround&&contexts.has(state)?Math.max(1,Math.ceil(distance/.2)):1;
 let previous=origin;
 for(let i=1;i<=count;i++){
  const endpoint=projectilePoint(state,projectile,distance*i/count),contact=traceWorldSegment(state,previous,endpoint,{...options,terrain:!projectile.followGround});
  if(contact)return {...contact,distance:distance*((i-1+contact.t)/count)};
  previous=endpoint;
 }
 return null;
}
export function projectileLaunch(state,actor){
 const origin=projectileOrigin(state,actor),direction=projectileDirection(actor),followGround=projectileFollowsGround(actor);
 // Preserve surface-level directional shots while the frog hops. Explicit 3D
 // shots use the real elevated body origin and never follow terrain afterward.
 if(followGround)origin.y=projectileGround(state,actor.x,actor.z)+PROJECTILE.originHeight;
 return {...origin,dx:direction.x,dy:direction.y,dz:direction.z,followGround,heightOffset:origin.y-projectileGround(state,actor.x,actor.z)};
}
