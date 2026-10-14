// Standing positions use metres above the actual floor, never a global Y=0.
const EPS = 1e-5;
const top = b => b.y + b.h / 2;
const contains = (b,x,z) => Math.abs(x-b.x)<=b.w/2+EPS && Math.abs(z-b.z)<=b.d/2+EPS;

export function supportSightClear(a,b,obstacles) {
  return !obstacles.some(box=>{
    let near=0,far=1;
    for(const [axis,size] of [['x','w'],['y','h'],['z','d']]){
      const lo=box[axis]-box[size]/2,hi=box[axis]+box[size]/2,delta=b[axis]-a[axis];
      if(Math.abs(delta)<EPS){if(a[axis]<lo||a[axis]>hi)return false;}
      else{let t0=(lo-a[axis])/delta,t1=(hi-a[axis])/delta;if(t0>t1)[t0,t1]=[t1,t0];near=Math.max(near,t0);far=Math.min(far,t1);if(near>far)return false;}
    }
    return true;
  });
}

export function supportHeight(floors,x,z,referenceY,{rise=.3,drop=.6}={}) {
  let height=null;
  for(const b of floors){
    const y=top(b);
    if(contains(b,x,z)&&y<=referenceY+rise+EPS&&y>=referenceY-drop-EPS&&(height===null||y>height))height=y;
  }
  return height;
}

// Cover a conservative square footprint by the union of nearby floor patches.
// Splitting at rectangle edges handles seams without accepting holes or ledges.
export function supportedFootprint(floors,p,radius,step=.25) {
  const x0=p.x-radius,x1=p.x+radius,z0=p.z-radius,z1=p.z+radius;
  const patches=floors.filter(b=>Math.abs(top(b)-p.y)<=step+EPS&&b.x+b.w/2>=x0&&b.x-b.w/2<=x1&&b.z+b.d/2>=z0&&b.z-b.d/2<=z1);
  if(patches.some(b=>b.x-b.w/2<=x0+EPS&&b.x+b.w/2>=x1-EPS&&b.z-b.d/2<=z0+EPS&&b.z+b.d/2>=z1-EPS))return true;
  if(!patches.length)return false;
  const cuts=[...new Set([x0,x1,...patches.flatMap(b=>[Math.max(x0,b.x-b.w/2),Math.min(x1,b.x+b.w/2)])])].sort((a,b)=>a-b);
  for(let i=1;i<cuts.length;i++){
    if(cuts[i]-cuts[i-1]<=EPS)continue;
    const x=(cuts[i]+cuts[i-1])/2,spans=patches.filter(b=>Math.abs(x-b.x)<=b.w/2+EPS).map(b=>[b.z-b.d/2,b.z+b.d/2]).sort((a,b)=>a[0]-b[0]);
    let covered=z0;
    for(const [lo,hi] of spans){if(lo>covered+EPS)break;covered=Math.max(covered,hi);}
    if(covered<z1-EPS)return false;
  }
  return true;
}

export function standingClear(floors,obstacles,p,radius,height) {
  if(!supportedFootprint(floors,p,radius))return false;
  for(const b of [...obstacles,...floors]){
    // The surface and ordinary stair risers support the capsule; upper floors
    // still count as ceilings and cannot be ignored simply because of their tag.
    if(top(b)<=p.y+.25+EPS||b.y-b.h/2>=p.y+height-EPS)continue;
    if(Math.abs(p.x-b.x)<b.w/2+radius+.1&&Math.abs(p.z-b.z)<b.d/2+radius+.1)return false;
  }
  return true;
}

export function supportedRoute(floors,obstacles,a,b,radius,height) {
  const steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.2));
  let previous=a.y;
  for(let i=0;i<=steps;i++){
    const t=i/steps,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;
    const y=supportHeight(floors,x,z,a.y+(b.y-a.y)*t,{rise:.25,drop:.25});
    if(y===null||Math.abs(y-previous)>.25+EPS||!standingClear(floors,obstacles,{x,y,z},radius,height))return false;
    previous=y;
  }
  return true;
}
