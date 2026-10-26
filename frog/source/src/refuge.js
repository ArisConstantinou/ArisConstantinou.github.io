/** Natural crevice geometry shared by rendering, navigation and combat.
 * Bounds use refuge-local X/Z and absolute world Y. This module is deliberately
 * independent of Three so a shelter cannot acquire different invisible walls. */
const finite=(n,fallback=0)=>Number.isFinite(n)?n:fallback;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const EPS=1e-6;
const living=r=>r&&r.active!==false;

export function refugeLocal(refuge,point){
  const c=Math.cos(refuge.yaw||0),s=Math.sin(refuge.yaw||0),x=point.x-refuge.x,z=point.z-refuge.z;
  return {x:c*x-s*z,y:point.y,z:s*x+c*z};
}
export function refugeWorld(refuge,point){
  const c=Math.cos(refuge.yaw||0),s=Math.sin(refuge.yaw||0);
  return {x:refuge.x+c*point.x+s*point.z,y:finite(point.y,refuge.floorY),z:refuge.z-s*point.x+c*point.z};
}

export function refugeBody(actor={}){
  const type=actor.type||actor.model?.stats?.type||'frog',scale=Math.max(.1,finite(actor.scale,1));
  if(type!=='frog')return {
    // A snake's flexible length is not a solid circular body. This envelope
    // covers its actual head while turning (.39 radius plus skin clearance).
    radius:Math.max(.05,finite(actor.bodyRadius,({heron:1.5,snake:.44,fish:1.6}[type]||1.35)*scale)),
    height:Math.max(.1,finite(actor.bodyHeight,({heron:4.55,snake:.55,fish:1.65}[type]||1)*scale)),
    eye:finite(actor.eyeHeight,({heron:4.1,snake:.3,fish:.7}[type]||.6)*scale),predator:actor.team==='predator'||['heron','snake','fish'].includes(type)
  };
  const growth=1+(clamp(finite(actor.tier,1),1,5)-1)*.04+Math.min(24,Math.max(0,finite(actor.level,1)-1))*.004;
  const broad=['guardian','brute','tank'].includes(actor.role),slim=['scout','hunter','agile'].includes(actor.role);
  return {radius:Math.max(.05,finite(actor.bodyRadius,.72*growth*(broad?1.15:slim?.96:1.03))),height:Math.max(.1,finite(actor.bodyHeight,.82*growth*(broad?1.12:slim?.98:1.02))),eye:finite(actor.eyeHeight,.5*growth),predator:false};
}

const inRect=(p,r,pad=0)=>p.x>r.minX+pad-EPS&&p.x<r.maxX-pad+EPS&&p.z>r.minZ+pad-EPS&&p.z<r.maxZ-pad+EPS;
const bounds=(id,minX,maxX,minZ,maxZ,minY,maxY)=>({id,minX,maxX,minZ,maxZ,minY,maxY});
function inSolid(p,solid,pad=0){
  if(!solid.outline)return inRect(p,solid,pad);
  const inside=solid.outline.every((a,i)=>{const b=solid.outline[(i+1)%solid.outline.length],dx=b.x-a.x,dz=b.z-a.z;return dx*(p.z-a.z)-dz*(p.x-a.x)>=Math.max(0,pad)*Math.hypot(dx,dz)-EPS;});
  return inside||(pad<0&&solid.outline.some((a,i)=>pointSegmentDistanceSquared(p,a,solid.outline[(i+1)%solid.outline.length])<pad*pad-EPS));
}
function pointSegmentDistanceSquared(p,a,b){const dx=b.x-a.x,dz=b.z-a.z,t=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1),0,1);return (p.x-a.x-dx*t)**2+(p.z-a.z-dz*t)**2;}
function segmentDistanceSquared(a,b,c,d){
  const abx=b.x-a.x,abz=b.z-a.z,cdx=d.x-c.x,cdz=d.z-c.z,cax=c.x-a.x,caz=c.z-a.z,denom=abx*cdz-abz*cdx;
  if(Math.abs(denom)>EPS){const t=(cax*cdz-caz*cdx)/denom,u=(cax*abz-caz*abx)/denom;if(t>=0&&t<=1&&u>=0&&u<=1)return 0;}
  return Math.min(pointSegmentDistanceSquared(a,c,d),pointSegmentDistanceSquared(b,c,d),pointSegmentDistanceSquared(c,a,b),pointSegmentDistanceSquared(d,a,b));
}
function contour(solid,outline){
  solid.outline=outline.map(([x,z])=>({x,z}));solid.minX=Math.min(...outline.map(p=>p[0]));solid.maxX=Math.max(...outline.map(p=>p[0]));solid.minZ=Math.min(...outline.map(p=>p[1]));solid.maxZ=Math.max(...outline.map(p=>p[1]));return solid;
}

export function createRefugeDescriptor(data,{terrainHeight,minimumFloorY=.82}={}){
  const ground=terrainHeight||(()=>0),refuge={id:data.id,x:finite(data.x),z:finite(data.z),yaw:finite(data.yaw,Math.atan2(-data.x,-data.z)),team:data.team||'neutral',active:true};
  let high=-Infinity,low=Infinity;
  for(let x=-3.75;x<=3.76;x+=1.25)for(let z=-3.25;z<=4.26;z+=1.25){const p=refugeWorld(refuge,{x,z,y:0}),h=finite(ground(p.x,p.z));high=Math.max(high,h);low=Math.min(low,h);}
  refuge.floorY=Math.max(minimumFloorY,high+.045);refuge.floorBottom=Math.min(low-.16,refuge.floorY-.22);
  refuge.roofBottom=refuge.floorY+2.25;refuge.roofTop=refuge.floorY+3.05;
  refuge.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45};
  refuge.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1};
  refuge.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95};
  refuge.solids=[
    bounds('floor',-3.75,3.75,-3.25,4.1,refuge.floorBottom,refuge.floorY),
    bounds('left-wall',-3.75,-3.1,-3.25,4,refuge.floorY,refuge.roofBottom),
    bounds('right-wall',3.1,3.75,-3.25,4,refuge.floorY,refuge.roofBottom),
    bounds('back-wall',-3.75,3.75,-3.25,-2.6,refuge.floorY,refuge.roofBottom),
    bounds('front-left',-3.75,.3,3.35,4,refuge.floorY,refuge.roofBottom),
    bounds('front-right',2.8,3.75,3.35,4,refuge.floorY,refuge.roofBottom),
    bounds('entrance-lintel',.3,2.8,3.35,4,refuge.floorY+1.95,refuge.roofBottom),
    bounds('root-baffle',-.35,3.1,.45,1.05,refuge.floorY,refuge.roofBottom),
    bounds('roof',-3.75,3.75,-3.25,4,refuge.roofBottom,refuge.roofTop)
  ];
  // Uneven natural rock faces, not a constructed rectangular bunker. The same
  // convex outlines drive the solid mesh, swept collision and occlusion.
  const outer=[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]];
  const contours={
    floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:outer,
    'left-wall':[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],
    'right-wall':[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],
    'back-wall':[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],
    'front-left':[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],
    'front-right':[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],
    'root-baffle':[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]
  };
  for(const solid of refuge.solids)contour(solid,contours[solid.id]||[[solid.minX,solid.minZ],[solid.maxX,solid.minZ],[solid.maxX,solid.maxZ],[solid.minX,solid.maxZ]]);
  refuge.floor={...refuge.solids[0]};
  refuge.shellBounds={minX:Math.min(...refuge.solids.map(s=>s.minX)),maxX:Math.max(...refuge.solids.map(s=>s.maxX)),minZ:Math.min(...refuge.solids.map(s=>s.minZ)),maxZ:Math.max(...refuge.solids.map(s=>s.maxZ))};
  // The stone tongue descends to the actual terrain, including migrated nests
  // on submerged sites. Its sampled, rendered top is also the support surface.
  let length=4.5;const rampStart=4.2;
  for(let i=0;i<3;i++){const end=refugeWorld(refuge,{x:refuge.entrance.x,z:rampStart+length,y:0});length=clamp(Math.abs(refuge.floorY-ground(end.x,end.z))/.32,4.5,14);}
  const rows=Math.max(10,Math.ceil(length/.45)),cols=6,ramp={minX:refuge.entrance.x-1.6,maxX:refuge.entrance.x+1.6,minZ:rampStart,maxZ:rampStart+length,rows,cols,heights:[],bottoms:[]};
  for(let row=0;row<=rows;row++)for(let col=0;col<=cols;col++){
    const t=row/rows,x=ramp.minX+(ramp.maxX-ramp.minX)*col/cols,z=ramp.minZ+length*t,p=refugeWorld(refuge,{x,z,y:0}),end=refugeWorld(refuge,{x,z:ramp.maxZ,y:0});
    const h=finite(ground(p.x,p.z)),linear=refuge.floorY+(finite(ground(end.x,end.z))-refuge.floorY)*t;
    ramp.heights.push(row===0?refuge.floorY:Math.max(h+(row===rows?.005:.02),linear));ramp.bottoms.push(Math.min(h-.14,linear-.18));
  }
  refuge.ramp=ramp;refuge.radius=Math.max(6,Math.hypot(ramp.maxX,ramp.maxZ));
  return refuge;
}

/** Match the two triangles emitted by the ramp mesh, not a nearby flat plane. */
export function refugeRampHeight(refuge,point){
  const r=refuge.ramp;if(!r||!inRect(point,r))return null;
  const fx=clamp((point.x-r.minX)/(r.maxX-r.minX)*r.cols,0,r.cols),fz=clamp((point.z-r.minZ)/(r.maxZ-r.minZ)*r.rows,0,r.rows),col=Math.min(r.cols-1,Math.floor(fx)),row=Math.min(r.rows-1,Math.floor(fz)),u=fx-col,v=fz-row;
  const at=(x,z)=>r.heights[z*(r.cols+1)+x],a=at(col,row),b=at(col+1,row),c=at(col,row+1),d=at(col+1,row+1);
  return u+v<=1?a+(b-a)*u+(c-a)*v:d+(c-d)*(1-u)+(b-d)*(1-v);
}

export function refugeSurface(refuges,x,z,{y}={}){
  let best=null;
  for(const r of refuges||[]){
    if(!living(r)||Math.hypot(x-r.x,z-r.z)>r.radius+1)continue;
    const local=refugeLocal(r,{x,z}),roof=r.solids.find(s=>s.id==='roof');let height=null,kind='floor';
    if(inSolid(local,r.floor))height=r.floorY;
    const ramp=refugeRampHeight(r,local);if(ramp!==null&&(height===null||ramp>height)){height=ramp;kind='ramp';}
    if(Number.isFinite(y)&&y>=r.roofTop-.06&&inSolid(local,roof)){height=r.roofTop;kind='roof';}
    if(height!==null&&(!best||height>best.height))best={height,type:kind==='roof'?'rock':'land',platform:r,refuge:r,surface:kind};
  }
  return best;
}

export function refugeAt(refuges,actor){
  if(!actor)return null;const body=refugeBody(actor);
  for(const r of refuges||[]){
    if(!living(r)||!refugeCanEnter(r,actor))continue;
    const local=refugeLocal(r,actor),y=finite(actor.y,r.floorY);
    if(inRect(local,r.interior,body.radius+.03)&&y>=r.floorY-.13&&y+body.height<r.roofBottom+.015)return r;
  }
  return null;
}

export function refugeCanEnter(refuge,actor){const body=refugeBody(actor);return living(refuge)&&body.radius*2<refuge.entrance.width-.02&&body.height<refuge.entrance.height-.02;}

/** Occupancy includes the passage, so a snake behind the inner root still
 * prevents resting/respawning in the same cavity even before it is visible. */
export function refugeOccupant(refuges,actor){
  if(!actor)return null;const body=refugeBody(actor);
  const pose=actor.type==='snake'?actor.refugeSnakePose:null,scale=finite(actor.scale,1),points=pose?.weight>.99?[actor,...pose.points.filter(p=>p.s>=-2.46*scale&&p.s<=2.48*scale),...(pose.head?[{...pose.head,y:pose.head.y-.376*scale}]:[])]:[actor];
  for(const r of refuges||[]){
    if(!living(r))continue;const roof=r.solids.find(s=>s.id==='roof');
    for(const point of points){const local=refugeLocal(r,point),y=finite(point.y,r.floorY);if(inSolid(local,roof)&&y>=r.floorY-.15&&y+Math.min(body.height,.5)<r.roofBottom+.02&&!r.solids.some(s=>s.id!=='floor'&&s.id!=='roof'&&inSolid(local,s)&&y<s.maxY&&y+body.height>s.minY))return r;}
  }
  return null;
}

function segmentBox(from,to,solid,{radius=0,height=0}={}){
  let enter=0,exit=1;
  for(const axis of solid.outline?['y']:['x','y','z']){
    const lo=solid['min'+axis.toUpperCase()]-(axis==='y'?height:radius),hi=solid['max'+axis.toUpperCase()]+(axis==='y'?0:radius),a=from[axis],delta=to[axis]-a;
    if(Math.abs(delta)<EPS){if(a<=lo+EPS||a>=hi-EPS)return null;continue;}
    const t1=(lo-a)/delta,t2=(hi-a)/delta;enter=Math.max(enter,Math.min(t1,t2));exit=Math.min(exit,Math.max(t1,t2));
    if(enter>=exit-EPS)return null;
  }
  if(solid.outline&&radius>EPS){
    // A circular body swept against the actual edges has rounded clearance at
    // sharp stone tips. Inflating each plane would create invisible long spikes.
    const a={x:from.x+(to.x-from.x)*enter,z:from.z+(to.z-from.z)*enter},b={x:from.x+(to.x-from.x)*exit,z:from.z+(to.z-from.z)*exit};
    const hit=inSolid(a,solid)||inSolid(b,solid)||solid.outline.some((c,i)=>segmentDistanceSquared(a,b,c,solid.outline[(i+1)%solid.outline.length])<radius*radius-EPS);
    return hit&&exit>EPS&&enter<1-EPS?{enter,exit}:null;
  }
  if(solid.outline)for(let i=0;i<solid.outline.length;i++){
    const a=solid.outline[i],b=solid.outline[(i+1)%solid.outline.length],dx=b.x-a.x,dz=b.z-a.z,start=dx*(from.z-a.z)-dz*(from.x-a.x),change=dx*(to.z-from.z)-dz*(to.x-from.x);
    if(Math.abs(change)<EPS){if(start<=EPS)return null;continue;}
    const at=-start/change;if(change>0)enter=Math.max(enter,at);else exit=Math.min(exit,at);if(enter>=exit-EPS)return null;
  }
  return exit>EPS&&enter<1-EPS?{enter,exit}:null;
}

export function refugeLineClear(refuges,from,to,{fromHeight,toHeight}={}){
  if(!from||!to)return true;
  const eye=(actor,height)=>{
    const body=refugeBody(actor),pose=actor.type==='snake'?actor.refugeSnakePose:null;
    return pose?.weight>.99&&pose.head?{...pose.head,y:pose.head.y+finite(height,body.eye)-body.eye}:{...actor,y:finite(actor.y)+finite(height,body.eye)};
  };
  const a=eye(from,fromHeight),b=eye(to,toHeight);
  for(const r of refuges||[]){
    if(!living(r))continue;const localA=refugeLocal(r,a),localB=refugeLocal(r,b);
    if(r.solids.some(s=>segmentBox(localA,localB,s)))return false;
  }
  return true;
}

function movementClear(refuges,actor,from,to,{navigation=false}={}){
  const body=refugeBody(actor);
  for(const r of refuges||[]){
    if(!living(r))continue;
    const a=refugeLocal(r,{...from,y:finite(from.y,finite(actor.y,r.floorY))}),b=refugeLocal(r,{...to,y:finite(to.y,a.y)});
    if(navigation){a.y=Math.max(a.y,r.floorY);b.y=Math.max(b.y,r.floorY);}
    for(const solid of r.solids){
      // Ground support is handled by the height solver, not an invisible wall
      // across the gently rising ramp. Underwater approaches still hit its base.
      if(solid.id==='floor'){
        const rampA=refugeRampHeight(r,a),rampB=refugeRampHeight(r,b),onRamp=(rampA!==null&&a.y>=rampA-.25)||(rampB!==null&&b.y>=rampB-.25);
        if(Math.min(a.y,b.y)>=r.floorY-.16||onRamp)continue;
      }
      if(navigation&&(solid.id==='floor'||solid.id==='roof'||solid.id==='entrance-lintel'))continue;
      if(segmentBox(a,b,solid,body))return false;
    }
  }
  return true;
}

export function resolveRefugeMovement(refuges,actor,next){
  const desired={x:next.x,z:next.z};if(Number.isFinite(next.y))desired.y=next.y;
  if(movementClear(refuges,actor,actor,desired))return {...desired,blocked:false};
  // Resolve in small swept steps so charged hops/recoil cannot cross a wall
  // between frames. Axis slides preserve motion along the natural crevice.
  const distance=Math.hypot(next.x-actor.x,next.z-actor.z),steps=Math.max(1,Math.ceil(distance/.18)),dx=(next.x-actor.x)/steps,dz=(next.z-actor.z)/steps;
  let p={x:actor.x,z:actor.z,y:finite(actor.y)};
  for(let i=0;i<steps;i++){
    const y=Number.isFinite(next.y)?finite(actor.y)+(next.y-finite(actor.y))*(i+1)/steps:p.y,candidates=[{x:p.x+dx,z:p.z+dz,y},{x:p.x+dx,z:p.z,y},{x:p.x,z:p.z+dz,y}];
    const viable=candidates.find(c=>movementClear(refuges,actor,p,c));if(viable)p=viable;
  }
  const result={x:p.x,z:p.z,blocked:true};if(Number.isFinite(next.y))result.y=p.y;return result;
}

export function refugeCeiling(refuges,actor,nextY){
  if(!Number.isFinite(nextY)||nextY<=finite(actor.y))return null;
  const body=refugeBody(actor);let max=null;
  for(const r of refuges||[]){
    if(!living(r))continue;const local=refugeLocal(r,actor);
    for(const s of r.solids){
      if(s.id!=='roof'&&s.id!=='entrance-lintel')continue;
      if(inSolid(local,s,-body.radius)&&finite(actor.y)+body.height<=s.minY+.04&&nextY+body.height>s.minY){const y=s.minY-body.height-.012;max=max===null?y:Math.min(max,y);}
    }
  }
  return max;
}

export function refugeEntrancePoint(refuge,offset=0){
  const p={x:refuge.entrance.x,z:refuge.entrance.z+offset};return refugeWorld(refuge,{...p,y:refugeRampHeight(refuge,p)??refuge.floorY});
}
export function refugeInteriorPoint(refuge,slot=0){
  const places=[{x:.75,z:-1.2},{x:-.8,z:-1.25},{x:2,z:-1.35},{x:-2,z:-1.35},{x:.65,z:-.75},{x:-.7,z:-.8}],p=places[Math.abs(Math.floor(finite(slot)))%places.length];return refugeWorld(refuge,{...p,y:refuge.floorY});
}

/** A tiny visibility graph routes both the outside approach and the dog-leg
 * passage. Every graph edge is checked against the very same solid geometry. */
export function refugeWaypoint(refuges,actor,target){
  const route=refugePath(refuges,actor,target);return route[1]||route[0]||target;
}

function refugePath(refuges,actor,target){
  if(!refuges?.length||movementClear(refuges,actor,actor,target,{navigation:true}))return [actor,target];
  const body=refugeBody(actor),near=refuges.filter(r=>living(r)&&Math.hypot(actor.x-r.x,actor.z-r.z)<r.radius+Math.hypot(target.x-actor.x,target.z-actor.z)+6),nodes=[{...actor},{...target}];
  for(const r of near){
    const m=body.radius+.18,b=r.shellBounds||r.floor,points=[{x:b.minX-m,z:b.minZ-m},{x:b.maxX+m,z:b.minZ-m},{x:b.minX-m,z:b.maxZ+m},{x:b.maxX+m,z:b.maxZ+m},refugeLocal(r,refugeEntrancePoint(r,1.3+body.radius)),refugeLocal(r,refugeEntrancePoint(r,r.ramp.maxZ-r.entrance.z+.3))];
    if(refugeCanEnter(r,actor)){
      points.push({x:1.55,z:2.2},{x:-1.75,z:2.2},{x:-1.75,z:-.7},refugeLocal(r,refugeInteriorPoint(r)));
    }
    for(const p of points)nodes.push(refugeWorld(r,{...p,y:r.floorY}));
  }
  const distance=nodes.map(()=>Infinity),previous=nodes.map(()=>-1),used=new Set();distance[0]=0;
  for(let step=0;step<nodes.length;step++){
    let current=-1;for(let i=0;i<nodes.length;i++)if(!used.has(i)&&(current<0||distance[i]<distance[current]))current=i;
    if(current<0||!Number.isFinite(distance[current])||current===1)break;used.add(current);
    for(let i=1;i<nodes.length;i++)if(!used.has(i)&&movementClear(near,actor,nodes[current],nodes[i],{navigation:true})){
      const next=distance[current]+Math.hypot(nodes[current].x-nodes[i].x,nodes[current].z-nodes[i].z);if(next<distance[i]){distance[i]=next;previous[i]=current;}
    }
  }
  if(previous[1]<0)return [actor];
  const path=[];let index=1;while(index>=0){path.push(nodes[index]);index=previous[index];}return path.reverse();
}

/** Only for loading an older save: move bodies out of newly solid stone. */
export function clearRefugePosition(refuges,actor){
  let p={x:actor.x,y:finite(actor.y),z:actor.z},blocked=false;const body=refugeBody(actor);
  for(const r of refuges||[]){
    if(!living(r))continue;const local=refugeLocal(r,p),underRoof=inSolid(local,r.floor)&&p.y<r.roofTop+.03;
    const ramp=refugeRampHeight(r,local),onRamp=ramp!==null&&p.y>=ramp-.25;
    const embedded=r.solids.some(s=>!(s.id==='floor'&&onRamp)&&inSolid(local,s,-body.radius)&&p.y<s.maxY-EPS&&p.y+body.height>s.minY+EPS);
    if(!embedded&&!(body.predator&&!refugeCanEnter(r,actor)&&underRoof))continue;
    let candidates=[];
    if(!body.predator||refugeCanEnter(r,actor))candidates=Array.from({length:4},(_,i)=>refugeInteriorPoint(r,i));
    const margin=body.radius+.25,b=r.shellBounds||r.floor;
    for(const q of [{x:clamp(local.x,b.minX,b.maxX),z:b.minZ-margin},{x:b.minX-margin,z:clamp(local.z,b.minZ,b.maxZ)},{x:b.maxX+margin,z:clamp(local.z,b.minZ,b.maxZ)}, {x:r.entrance.x,z:b.maxZ+margin}])candidates.push(refugeWorld(r,{...q,y:p.y}));
    candidates=candidates.filter(candidate=>!refuges.some(other=>{
      if(!living(other))return false;const q=refugeLocal(other,candidate);return other.solids.some(s=>s.id!=='floor'&&inSolid(q,s,-body.radius)&&candidate.y<s.maxY-EPS&&candidate.y+body.height>s.minY+EPS);
    }));
    candidates.sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z));
    if(candidates.length){p=candidates[0];blocked=true;}
  }
  return {...p,blocked};
}

function snakeSurface(refuges,surface,point,fallback){
  const support=refugeSurface(refuges,point.x,point.z),h=support?.height??surface?.(point.x,point.z)?.height;
  return Number.isFinite(h)?Math.max(-.10,h):fallback;
}
function snakePathLength(points){let total=0;for(let i=1;i<points.length;i++)total+=Math.hypot(points[i].x-points[i-1].x,points[i].z-points[i-1].z);return total;}
function snakeRoutePoint(points,distance){
  if(distance<=points[0].s)return {...points[0]};
  for(let i=1;i<points.length;i++)if(distance<=points[i].s){const a=points[i-1],b=points[i],t=(distance-a.s)/(b.s-a.s||1);return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t};}
  return {...points.at(-1)};
}

function snakePolyline(refuges,actor,start,goal,length,surface){
  const step=.14*Math.max(1,actor.scale||1),out=[{...start}],probe={...actor,...start},safe=clearRefugePosition(refuges,{...actor,...goal,y:snakeSurface(refuges,surface,goal,start.y)}),route=refugePath(refuges,probe,safe);
  let used=0,last={...start},direction={x:Math.sin(actor.yaw||0),z:Math.cos(actor.yaw||0)};
  for(let i=1;i<route.length&&used<length;i++){
    const target=route[i],dx=target.x-last.x,dz=target.z-last.z,span=Math.hypot(dx,dz);if(span<EPS)continue;
    direction={x:dx/span,z:dz/span};const travel=Math.min(length-used,span),count=Math.max(1,Math.ceil(travel/step)),origin={...last};
    for(let j=1;j<=count;j++){const p={x:origin.x+direction.x*travel*j/count,z:origin.z+direction.z*travel*j/count};p.y=snakeSurface(refuges,surface,p,start.y);out.push(p);}last=out.at(-1);used+=travel;
  }
  // If the desired head point is close to a wall or the snake is resting,
  // gently turn the remaining body length into free space instead of pushing
  // its nose/tail through the wall. This checks a handful of path segments,
  // never the production mesh's thousands of vertices.
  for(let tries=0;used<length-EPS&&tries<100;tries++){
    const remaining=Math.min(step,length-used),yaw=Math.atan2(direction.x,direction.z);let next=null;
    for(const turn of [0,.26,-.26,.52,-.52,.8,-.8,1.12,-1.12,1.57,-1.57,2.1,-2.1,Math.PI]){
      const angle=yaw+turn,p={x:last.x+Math.sin(angle)*remaining,z:last.z+Math.cos(angle)*remaining};p.y=snakeSurface(refuges,surface,p,last.y);
      if(movementClear(refuges,probe,last,p)){next=p;direction={x:Math.sin(angle),z:Math.cos(angle)};break;}
    }
    if(!next)break;out.push(next);last=next;used+=remaining;
  }
  return out;
}

/** Keep a short actual centre-path history. In confinement the front follows
 * the legal route ahead, and the rear follows the route the body already took.
 * The ordinary outdoor rig and actor-centre combat conventions remain intact. */
export function updateRefugeSnake(refuges,actor,{surface,target}={}){
  if(actor?.type!=='snake')return null;
  const scale=Math.max(.1,finite(actor.scale,1)),centre={x:actor.x,y:finite(actor.y),z:actor.z},tailLength=2.8*scale,frontLength=3.05*scale;
  const nearby=(refuges||[]).filter(r=>living(r)&&Math.hypot(actor.x-r.x,actor.z-r.z)<6.2+tailLength+5);
  const distance=nearby.length?Math.min(...nearby.map(r=>Math.hypot(actor.x-r.x,actor.z-r.z))):Infinity,weight=clamp((6.2+tailLength+5-distance)/3,0,1);
  let trail=actor.refugeSnakeTrail;
  const moved=trail?.length?Math.hypot(centre.x-trail[0].x,centre.z-trail[0].z):Infinity;
  if(!trail?.length||moved>3*scale){
    const goal={x:centre.x-Math.sin(actor.yaw||0)*(tailLength+1),z:centre.z-Math.cos(actor.yaw||0)*(tailLength+1)};
    trail=weight?snakePolyline(nearby,actor,centre,goal,tailLength+1,surface):[centre,{...goal,y:centre.y}];
  }else if(moved>.025*scale)trail.unshift(centre);else trail[0]=centre;
  let length=0,keep=trail.length;
  for(let i=1;i<trail.length;i++){length+=Math.hypot(trail[i].x-trail[i-1].x,trail[i].z-trail[i-1].z);if(length>tailLength+1){keep=i+1;break;}}
  trail.length=Math.min(keep,240);actor.refugeSnakeTrail=trail;
  if(!weight){actor.refugeSnakePose=null;return null;}
  // A reload or a teleport can leave no history. Route the restored tail out
  // through the opening instead of drawing a straight line through stone.
  if(snakePathLength(trail)<tailLength){
    const end=trail.at(-1),before=trail.at(-2)||centre,yaw=Math.atan2(end.x-before.x,end.z-before.z),goal={x:end.x+Math.sin(yaw)*tailLength,z:end.z+Math.cos(yaw)*tailLength};
    trail.push(...snakePolyline(nearby,{...actor,yaw},end,goal,tailLength-snakePathLength(trail)+.3,surface).slice(1));
  }
  const goal=target||actor.refugeSnakeGoal||{x:centre.x+Math.sin(actor.yaw||0)*frontLength,z:centre.z+Math.cos(actor.yaw||0)*frontLength};
  const front=snakePolyline(nearby,actor,centre,goal,frontLength,surface),points=[];
  let s=0;for(let i=0;i<trail.length;i++){if(i)s-=Math.hypot(trail[i].x-trail[i-1].x,trail[i].z-trail[i-1].z);points.push({...trail[i],s});}points.reverse();
  s=0;for(let i=1;i<front.length;i++){s+=Math.hypot(front[i].x-front[i-1].x,front[i].z-front[i-1].z);points.push({...front[i],s});}
  const eyeStation=2.17*scale,headCentre=snakeRoutePoint(points,eyeStation),before=snakeRoutePoint(points,eyeStation-.07*scale),after=snakeRoutePoint(points,eyeStation+.07*scale),dx=after.x-before.x,dz=after.z-before.z,span=Math.hypot(dx,dz)||1;
  // The eye midpoint uses the same head-centre pivot/clearance as the rig.
  const head={x:headCentre.x+dx/span*.04*scale,y:Math.max(headCentre.y,before.y,after.y)+.376*scale,z:headCentre.z+dz/span*.04*scale};
  return actor.refugeSnakePose={points,weight,origin:centre,yaw:finite(actor.yaw),scale,head};
}
