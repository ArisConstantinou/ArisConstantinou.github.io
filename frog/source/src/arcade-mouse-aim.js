const EPSILON=1e-7;
const point=value=>value&&Number.isFinite(value.x)&&Number.isFinite(value.y)&&Number.isFinite(value.z);
const dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;
const subtract=(a,b)=>({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z});
const along=(origin,direction,distance)=>({x:origin.x+direction.x*distance,y:origin.y+direction.y*distance,z:origin.z+direction.z*distance});

// DOM input and the label canvas must use one coordinate space. In particular,
// device pixel ratio or an offset/scaled canvas must not offset the crosshair.
export function pointerPixels(client,rect,width,height){
 if(!client||!rect||![client.x,client.y,rect.left,rect.top,rect.width,rect.height,width,height].every(Number.isFinite)||rect.width<=0||rect.height<=0||width<=0||height<=0)return null;
 return {x:(client.x-rect.left)*width/rect.width,y:(client.y-rect.top)*height/rect.height};
}

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

// Overview is directional aim: empty ground must not pitch a fly into the dirt.
// Intersect a stable standing-height plane, then use only its X/Z bearing. The
// omitted direction.y deliberately selects the same terrain-following flight
// as the touch stick. An actual first camera-ray actor hit retains its real 3D
// point (including jumping or mounted bodies); nothing snaps toward nearby foes.
export function resolveOverviewAim({rayOrigin,rayDirection,muzzle,planeHeight,range,hits=[],fallback={x:0,z:-1}}={}) {
 const origin=point(muzzle)?muzzle:{x:0,y:0,z:0},camera=point(rayOrigin)?rayOrigin:origin;
 const magnitude=point(rayDirection)?Math.hypot(rayDirection.x,rayDirection.y,rayDirection.z):0;
 const ray=magnitude>EPSILON?{x:rayDirection.x/magnitude,y:rayDirection.y/magnitude,z:rayDirection.z/magnitude}:{x:0,y:-1,z:0};
 const reach=Number.isFinite(range)&&range>EPSILON?range:1,height=Number.isFinite(planeHeight)?planeHeight:origin.y;
 let first=null,nearest=Infinity;
 for(const hit of hits||[]){
  const target=hit?.point??hit;if(!point(target))continue;
  const depth=dot(subtract(target,camera),ray);
  if(depth>EPSILON&&depth<nearest){first=hit;nearest=depth;}
 }
 if((first?.kind==='actor'||first?.kind==='guard')&&first.targetId!=null){
  const result=resolveMouseAim({rayOrigin:camera,rayDirection:ray,muzzle:origin,range:reach,hits:[first]});
  if(result.source==='hit')return {...result,source:first.kind,targetId:first.targetId};
 }
 const t=Math.abs(ray.y)>EPSILON?(height-camera.y)/ray.y:-1;
 const target=t>EPSILON?along(camera,ray,t):null;
 let x=target?target.x-origin.x:ray.x,z=target?target.z-origin.z:ray.z,length=Math.hypot(x,z);
 if(!Number.isFinite(length)||length<EPSILON){
  x=Number.isFinite(fallback?.x)?fallback.x:0;z=Number.isFinite(fallback?.z)?fallback.z:-1;length=Math.hypot(x,z);
  if(length<EPSILON){x=0;z=-1;length=1;}
 }
 const direction={x:x/length,z:z/length},distance=target?Math.min(reach,Math.max(EPSILON,length)):reach;
 return {target:{x:origin.x+direction.x*distance,y:height,z:origin.z+direction.z*distance},direction,distance,source:'plane',targetId:null};
}
