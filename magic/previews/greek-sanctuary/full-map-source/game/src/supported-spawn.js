import {supportHeight,standingClear} from './walkable-support.js';

/** Same bounded summon search, with real support, headroom and occupancy. */
export function supportedSpawn(origin,radius,height,floors,obstacles,occupied=[],maxDistance=5,allowed=()=>true){
  if(![origin.x,origin.y,origin.z,radius,height,maxDistance].every(Number.isFinite))return null;
  for(let r=0;r<=maxDistance;r+=.6)for(let i=0;i<(r?24:1);i++){
    const angle=i*Math.PI*2/24,x=origin.x+Math.sin(angle)*r,z=origin.z+Math.cos(angle)*r;
    const y=supportHeight(floors,x,z,origin.y,{rise:.25,drop:.25});
    if(y===null)continue;
    const p={x,y,z};if(!standingClear(floors,obstacles,p,radius,height))continue;
    if(occupied.some(e=>{
      if(e.removed||e.dead||!e.body?.position)return false;
      const c=e.body.position,half=e.cy??e.ext?.y??e.radius??.5;
      return c.y+half>y+.02&&c.y-half<y+height-.02&&Math.hypot(c.x-x,c.z-z)<(e.radius??.5)+radius+.15;
    }))continue;
    if(allowed(p))return p;
  }
  return null;
}
