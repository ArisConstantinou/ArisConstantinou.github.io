const EPSILON=1e-7;
const point=value=>value&&Number.isFinite(value.x)&&Number.isFinite(value.y)&&Number.isFinite(value.z);
const dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;
const subtract=(a,b)=>({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z});
const along=(origin,direction,distance)=>({x:origin.x+direction.x*distance,y:origin.y+direction.y*distance,z:origin.z+direction.z*distance});

// Resolve depth along the actual perspective cursor ray, then aim from the
// simulation's muzzle. Camera-to-muzzle parallax must not flatten shot pitch.
// `hits` contains eligible collision hits, either {x,y,z} or {point:{x,y,z}}.
// The caller excludes the player's body and camera-side cutaway walls when
// gathering them. Ground behind the frog is still a valid free-cursor target.
export function resolveMouseAim({rayOrigin,rayDirection,muzzle,range,hits=[]}={}) {
 const origin=point(muzzle)?muzzle:{x:0,y:0,z:0};
 const camera=point(rayOrigin)?rayOrigin:origin;
 const magnitude=point(rayDirection)?Math.hypot(rayDirection.x,rayDirection.y,rayDirection.z):0;
 const ray=magnitude>EPSILON?{x:rayDirection.x/magnitude,y:rayDirection.y/magnitude,z:rayDirection.z/magnitude}:{x:0,y:0,z:-1};
 const reach=Number.isFinite(range)&&range>EPSILON?range:1;
 let selected=null,nearest=Infinity;
 for(const hit of hits||[]) {
  const target=hit?.point??hit;
  if(!point(target))continue;
  const delta=subtract(target,origin),fromCamera=subtract(target,camera),depth=dot(fromCamera,ray),distance=Math.hypot(delta.x,delta.y,delta.z);
  // A stale/behind-camera intersection or a coincident muzzle point cannot
  // supply a usable direction. Do not reject targets using the body's heading.
  if(depth<=EPSILON||depth>=nearest||distance<=EPSILON||distance>reach+EPSILON)continue;
  selected=target;nearest=depth;
 }

 const source=selected?'hit':'range';
 if(!selected) {
  // Unreachable hits use this same range target: switching to a distant hit's
  // muzzle direction would jump when it first enters the camera trace range.
  // The farther cursor-ray / muzzle-range-sphere intersection projects exactly
  // to the cursor, including above the horizon and straight vertical rays.
  const offset=subtract(camera,origin),b=dot(offset,ray);
  const discriminant=b*b-dot(offset,offset)+reach*reach;
  const far=discriminant>=0?-b+Math.sqrt(discriminant):-1;
  if(far>EPSILON)selected=along(camera,ray,far);
  else {
   // At a wide FOV or in overview the cursor ray can miss the reachable sphere.
   // Its closest forward point gives continuous direction at the tangent,
   // without an infinite plane intersection or an abrupt 180-degree fallback.
   const closest=Math.max(0,-b);
   selected=along(camera,ray,closest>EPSILON?closest:reach);
  }
 }

 const delta=subtract(selected,origin),length=Math.hypot(delta.x,delta.y,delta.z);
 const direction=length>EPSILON?{x:delta.x/length,y:delta.y/length,z:delta.z/length}:ray;
 const distance=length>EPSILON?Math.min(reach,length):reach;
 return {target:along(origin,direction,distance),direction,distance,source};
}
