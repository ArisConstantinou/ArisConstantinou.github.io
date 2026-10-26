import {WALLS} from './arcade-bases.js';

export const PROJECTILE=Object.freeze({radius:.1,muzzleOffset:.8,originHeight:.45,bodyHeight:.95,terrainStep:.12});
const EPS=1e-9,contexts=new WeakMap();
const flat={ground:()=>0,solids:new Map()};
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
const context=state=>contexts.get(state)||flat;
export function setProjectileWorld(state,{ground}={}){
 if(typeof ground!=='function'){contexts.delete(state);return state;}
 if(contexts.get(state)?.ground!==ground)contexts.set(state,{ground,solids:new Map()});
 return state;
}
export function projectileGround(state,x,z){return finite(context(state).ground(x,z));}
export function normalizeAim(x,y,z,fallback={x:0,y:0,z:1}){
 x=finite(x);y=finite(y);z=finite(z);const length=Math.hypot(x,y,z);
 return length>EPS?{x:x/length,y:y/length,z:z/length}:{...fallback};
}
export function projectileOrigin(state,actor){
 return {x:actor.x,y:projectileGround(state,actor.x,actor.z)+Math.max(0,finite(actor.height))+(actor.catapultId?.45:0)+PROJECTILE.originHeight,z:actor.z};
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
function cylinderContact(a,b,c,radius,bottom,top){
 const dx=b.x-a.x,dz=b.z-a.z,ox=a.x-c.x,oz=a.z-c.z,A=dx*dx+dz*dz,C=ox*ox+oz*oz-radius*radius;
 let near=-Infinity,far=Infinity,vertical=false;
 if(A<EPS){if(C>0)return null;}
 else{const B=ox*dx+oz*dz,D=B*B-A*C;if(D<0)return null;const root=Math.sqrt(D);near=(-B-root)/A;far=(-B+root)/A;}
 const dy=b.y-a.y;
 if(Math.abs(dy)<EPS){if(a.y<bottom||a.y>top)return null;}
 else{const t1=(bottom-a.y)/dy,t2=(top-a.y)/dy,low=Math.min(t1,t2);if(low>near){near=low;vertical=true;}far=Math.min(far,Math.max(t1,t2));}
 const t=Math.max(0,near);if(t>Math.min(1,far)+EPS||far<0)return null;
 const normal=vertical?{x:0,y:dy>0?-1:1,z:0}:normalizeAim(a.x+dx*t-c.x,0,a.z+dz*t-c.z,{x:0,y:1,z:0});
 return {t,normal};
}
function ellipsoidContact(a,b,center,radii){
 const ox=(a.x-center.x)/radii.x,oy=(a.y-center.y)/radii.y,oz=(a.z-center.z)/radii.z;
 const dx=(b.x-a.x)/radii.x,dy=(b.y-a.y)/radii.y,dz=(b.z-a.z)/radii.z,A=dx*dx+dy*dy+dz*dz,B=ox*dx+oy*dy+oz*dz,C=ox*ox+oy*oy+oz*oz-1;
 let t=0;if(C>0){if(A<EPS)return null;const D=B*B-A*C;if(D<0)return null;t=(-B-Math.sqrt(D))/A;if(t<0||t>1)return null;}
 return {t,normal:normalizeAim((ox+dx*t)/radii.x,(oy+dy*t)/radii.y,(oz+dz*t)/radii.z,{x:0,y:1,z:0})};
}
function solids(state,obstacles){
 const c=context(state);let cached=c.solids.get(obstacles);if(cached)return cached;
 const padding=PROJECTILE.radius;
 cached={walls:WALLS.map(w=>{
  const ground=projectileGround(state,w.x,w.z);
  return {id:w.id,min:{x:w.x-w.hw-padding,y:ground-padding,z:w.z-w.hd-padding},max:{x:w.x+w.hw+padding,y:ground+w.height+.135+padding,z:w.z+w.hd+padding}};
 }),rocks:obstacles.map(o=>({...o,ground:projectileGround(state,o.x,o.z)}))};
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
  best={...contact,...extra,t,kind,targetId:extra.targetId??null,blocked:kind!=='actor'};
 };
 const geometry=solids(state,obstacles);
 if(solidFrom<=length){
  for(const wall of geometry.walls)consider(boxContact(start,b,wall),'wall',{wallId:wall.id},from);
  for(const rock of geometry.rocks)consider(ellipsoidContact(start,b,{x:rock.x,y:rock.ground+rock.r*.9,z:rock.z},{x:rock.r+PROJECTILE.radius,y:rock.r*1.7+PROJECTILE.radius,z:rock.r+PROJECTILE.radius}),'rock',{},from);
 }
 // The camera may see another frog behind the player's muzzle plane. Only
 // camera-side scenery is skipped; ignoreId already excludes the aiming frog.
 if(hitActors)for(const actor of state.actors){
  if(actor.id===ignoreId||actor.ko||actor.eliminated)continue;
  const floor=projectileGround(state,actor.x,actor.z)+Math.max(0,finite(actor.height))+(actor.catapultId?.45:0);
  consider(cylinderContact(a,b,actor,1+clamp(finite(actor.load),0,1)*.2,floor-PROJECTILE.radius,floor+PROJECTILE.bodyHeight+PROJECTILE.radius),'actor',{targetId:actor.id});
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
 // Legacy touch/AI flight follows the surface, but still uses the same finite
 // wall/body heights. Explicit 3D mouse flight never snaps back to this surface.
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
 // Preserve classic surface-level touch/AI shots while the frog hops. Mouse
 // shots use the real elevated body origin and never follow terrain afterward.
 if(followGround)origin.y=projectileGround(state,actor.x,actor.z)+PROJECTILE.originHeight;
 return {...origin,dx:direction.x,dy:direction.y,dz:direction.z,followGround,heightOffset:origin.y-projectileGround(state,actor.x,actor.z)};
}
