// Continuous horizontal body collision. A frog is a stable disc; rectangular
// walls therefore have rounded clearance corners, rather than invisible boxes.
const EPS=1e-6, SKIN=1e-4;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

const boxLocal=(point,box)=>{const c=Math.cos(box.yaw),s=Math.sin(box.yaw),x=point.x-box.x,z=point.z-box.z;return {x:c*x-s*z,z:s*x+c*z};};
const boxVector=(vector,box)=>{const c=Math.cos(box.yaw),s=Math.sin(box.yaw);return {x:c*vector.x+s*vector.z,z:-s*vector.x+c*vector.z};};
export function rectangleClearance(point,box){
 if(box.yaw)return rectangleClearance(boxLocal(point,box),{x:0,z:0,hw:box.hw,hd:box.hd});
 return Math.hypot(Math.max(0,Math.abs(point.x-box.x)-box.hw),Math.max(0,Math.abs(point.z-box.z)-box.hd));
}

function circleSweep(point,delta,circle,radius){
 const ox=point.x-circle.x,oz=point.z-circle.z,A=delta.x*delta.x+delta.z*delta.z;
 if(A<EPS*EPS)return null;
 const dot=ox*delta.x+oz*delta.z,C=ox*ox+oz*oz-radius*radius;
 // A touching body must always be able to move away or along the surface.
 if(dot>=-EPS)return null;
 let t=0;
 if(C>EPS){const D=dot*dot-A*C;if(D<0)return null;t=(-dot-Math.sqrt(D))/A;}
 if(t< -EPS||t>1+EPS)return null;
 t=clamp(t,0,1);const x=ox+delta.x*t,z=oz+delta.z*t,d=Math.hypot(x,z);
 return d>EPS?{t,nx:x/d,nz:z/d}:null;
}

export function roundedRectangleSweep(point,delta,box,radius){
 if(box.yaw){const p=boxLocal(point,box),d=boxLocal({x:box.x+delta.x,z:box.z+delta.z},box),hit=roundedRectangleSweep(p,d,{x:0,z:0,hw:box.hw,hd:box.hd},radius);if(!hit)return null;const n=boxVector({x:hit.nx,z:hit.nz},box);return {...hit,nx:n.x,nz:n.z};}
 const minX=box.x-box.hw,maxX=box.x+box.hw,minZ=box.z-box.hd,maxZ=box.z+box.hd;
 let best=null;
 const consider=hit=>{if(hit&&(!best||hit.t<best.t))best=hit;};
 if(Math.abs(delta.x)>EPS){
  const nx=delta.x>0?-1:1,x=delta.x>0?minX-radius:maxX+radius,t=(x-point.x)/delta.x,z=point.z+delta.z*t;
  if(t>=-EPS&&t<=1+EPS&&z>=minZ-EPS&&z<=maxZ+EPS)consider({t:clamp(t,0,1),nx,nz:0});
 }
 if(Math.abs(delta.z)>EPS){
  const nz=delta.z>0?-1:1,z=delta.z>0?minZ-radius:maxZ+radius,t=(z-point.z)/delta.z,x=point.x+delta.x*t;
  if(t>=-EPS&&t<=1+EPS&&x>=minX-EPS&&x<=maxX+EPS)consider({t:clamp(t,0,1),nx:0,nz});
 }
 for(const x of [minX,maxX])for(const z of [minZ,maxZ])consider(circleSweep(point,delta,{x,z},radius));
 return best;
}

function boundarySweep(point,delta,radius){
 if(!Number.isFinite(radius))return null;
 const A=delta.x*delta.x+delta.z*delta.z;if(A<EPS*EPS)return null;
 const dot=point.x*delta.x+point.z*delta.z,C=point.x*point.x+point.z*point.z-radius*radius,D=dot*dot-A*C;
 if(D<0)return null;const t=(-dot+Math.sqrt(D))/A;
 if(t< -EPS||t>1+EPS)return null;
 const x=point.x+delta.x*clamp(t,0,1),z=point.z+delta.z*clamp(t,0,1),d=Math.hypot(x,z);
 if(d<EPS)return null;
 return {t:clamp(t,0,1),nx:-x/d,nz:-z/d,boundary:true};
}

function boxPush(point,box,radius){
 if(box.yaw){const push=boxPush(boxLocal(point,box),{x:0,z:0,hw:box.hw,hd:box.hd},radius);return push?boxVector(push,box):null;}
 const minX=box.x-box.hw,maxX=box.x+box.hw,minZ=box.z-box.hd,maxZ=box.z+box.hd;
 const qx=clamp(point.x,minX,maxX),qz=clamp(point.z,minZ,maxZ),dx=point.x-qx,dz=point.z-qz,d=Math.hypot(dx,dz);
 if(d>=radius-SKIN*.1)return null;
 if(d>EPS)return {x:dx/d*(radius-d+SKIN),z:dz/d*(radius-d+SKIN)};
 const sides=[{depth:point.x-minX+radius,x:-1,z:0},{depth:maxX-point.x+radius,x:1,z:0},{depth:point.z-minZ+radius,x:0,z:-1},{depth:maxZ-point.z+radius,x:0,z:1}];
 sides.sort((a,b)=>a.depth-b.depth);return {x:sides[0].x*(sides[0].depth+SKIN),z:sides[0].z*(sides[0].depth+SKIN)};
}

function polygonPush(p,poly,radius){let inside=true,nearest=null,distance=Infinity;const ps=poly.points;for(let i=0;i<ps.length;i++){const a=ps[i],b=ps[(i+1)%ps.length],ex=b.x-a.x,ez=b.z-a.z,l2=ex*ex+ez*ez;if(l2<1e-12)continue;if(ex*(p.z-a.z)-ez*(p.x-a.x)<-EPS)inside=false;const u=clamp(((p.x-a.x)*ex+(p.z-a.z)*ez)/l2,0,1),x=a.x+u*ex,z=a.z+u*ez,d=Math.hypot(p.x-x,p.z-z);if(d<distance){distance=d;nearest={x,z,nx:ez/Math.sqrt(l2),nz:-ex/Math.sqrt(l2)};}}if(!nearest||!inside&&distance>=radius-SKIN*.1)return null;if(inside)return{x:nearest.nx*(distance+radius+SKIN),z:nearest.nz*(distance+radius+SKIN)};return{x:(p.x-nearest.x)/Math.max(EPS,distance)*(radius-distance+SKIN),z:(p.z-nearest.z)/Math.max(EPS,distance)*(radius-distance+SKIN)};}
function polygonSweep(p,d,poly,radius){let best=null;for(let i=0;i<poly.points.length;i++){const a=poly.points[i],b=poly.points[(i+1)%poly.points.length],ex=b.x-a.x,ez=b.z-a.z,l=Math.hypot(ex,ez);if(l<1e-8)continue;const hit=roundedRectangleSweep(p,d,{x:(a.x+b.x)/2,z:(a.z+b.z)/2,hw:l/2,hd:0,yaw:-Math.atan2(ez,ex)},radius);if(hit&&(!best||hit.t<best.t))best=hit;}return best;}

/** Closest local separation for old saves or an external placement in a solid. */
export function separateBody(point,{walls=[],circles=[],polygons=[],radius=0,arenaRadius=Infinity}={}){
 const p={x:point.x,z:point.z};
 for(let pass=0;pass<12;pass++){
  let changed=false;
  for(const wall of walls){const push=boxPush(p,wall,radius);if(push){p.x+=push.x;p.z+=push.z;changed=true;}}
  for(const circle of circles){
   const dx=p.x-circle.x,dz=p.z-circle.z,d=Math.hypot(dx,dz),limit=circle.r+radius;
   if(d>=limit-SKIN*.1)continue;
   p.x=circle.x+(d>EPS?dx/d:0)*(limit+SKIN);p.z=circle.z+(d>EPS?dz/d:1)*(limit+SKIN);changed=true;
  }
  for(const poly of polygons){const push=polygonPush(p,poly,radius);if(push){p.x+=push.x;p.z+=push.z;changed=true;}}
  const d=Math.hypot(p.x,p.z);
  if(d>arenaRadius){p.x*=(arenaRadius-SKIN)/d;p.z*=(arenaRadius-SKIN)/d;changed=true;}
  if(!changed)break;
 }
 return p;
}

/** One sweep handles walls and round solids together, then keeps tangent travel. */
export function sweepBody(point,dx,dz,{walls=[],circles=[],polygons=[],radius=0,arenaRadius=Infinity}={}){
 const geometry={walls,circles,polygons,radius,arenaRadius},p=separateBody(point,geometry);
 let delta={x:Number.isFinite(dx)?dx:0,z:Number.isFinite(dz)?dz:0};
 for(let iteration=0;iteration<8&&Math.hypot(delta.x,delta.z)>EPS;iteration++){
  let closest=null;
  const consider=hit=>{if(hit&&(hit.boundary||delta.x*hit.nx+delta.z*hit.nz< -EPS)&&(!closest||hit.t<closest.t))closest=hit;};
  for(const wall of walls)consider(roundedRectangleSweep(p,delta,wall,radius));
  for(const circle of circles)consider(circleSweep(p,delta,circle,circle.r+radius));
  for(const poly of polygons)consider(polygonSweep(p,delta,poly,radius));
  consider(boundarySweep(p,delta,arenaRadius));
  if(!closest){p.x+=delta.x;p.z+=delta.z;break;}
  const backoff=SKIN/Math.max(EPS,Math.hypot(delta.x,delta.z)),travel=Math.max(0,closest.t-backoff);
  p.x+=delta.x*travel;p.z+=delta.z*travel;
  delta.x*=1-closest.t;delta.z*=1-closest.t;
  const into=delta.x*closest.nx+delta.z*closest.nz;
  delta.x-=closest.nx*into;delta.z-=closest.nz*into;
  // The outside arena is concave from the body's perspective: a perfectly
  // tangent line immediately leaves the circle. Project the remaining endpoint
  // inside, then sweep that chord against all solids on the next iteration.
  if(closest.boundary){
   const ex=p.x+delta.x,ez=p.z+delta.z,length=Math.hypot(ex,ez);
   if(length>arenaRadius-SKIN){delta.x=ex*(arenaRadius-SKIN)/length-p.x;delta.z=ez*(arenaRadius-SKIN)/length-p.z;}
  }
 }
 return p;
}

export function clearBodySegment(a,b,{walls=[],circles=[],polygons=[],radius=0,arenaRadius=Infinity}={}){
 if(Math.hypot(a.x,a.z)>arenaRadius+EPS||Math.hypot(b.x,b.z)>arenaRadius+EPS)return false;
 if(walls.some(w=>rectangleClearance(a,w)<radius-SKIN||rectangleClearance(b,w)<radius-SKIN))return false;
 if(circles.some(c=>Math.hypot(a.x-c.x,a.z-c.z)<c.r+radius-SKIN||Math.hypot(b.x-c.x,b.z-c.z)<c.r+radius-SKIN))return false;
 const delta={x:b.x-a.x,z:b.z-a.z};
 return !polygons.some(p=>polygonPush(a,p,radius)||polygonPush(b,p,radius)||polygonSweep(a,delta,p,radius))&&!walls.some(w=>roundedRectangleSweep(a,delta,w,radius))&&!circles.some(c=>circleSweep(a,delta,c,c.r+radius));
}
