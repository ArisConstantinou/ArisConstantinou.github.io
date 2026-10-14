// Keep the engine's forward firing lane open; keep a stable side until blocked.
export function engineEscort(origin,yaw,ally,side=0,isClear=()=>true,threat=null){
 const f={x:Math.sin(yaw),z:Math.cos(yaw)},r={x:f.z,z:-f.x};
 const signs=side?[side,-side]:[-1,1].sort((a,b)=>{
  const d=s=>Math.hypot(origin.x-f.x*2.6+r.x*s*2.8-ally.x,origin.z-f.z*2.6+r.z*s*2.8-ally.z);return d(a)-d(b);
 });
 // Only leave formation for a reachable melee target, approaching its flank.
 if(threat&&Math.hypot(threat.x-ally.x,threat.z-ally.z)<4.5){
  for(const sign of signs){const p={x:threat.x+r.x*sign*1.9,z:threat.z+r.z*sign*1.9};
   const dx=p.x-origin.x,dz=p.z-origin.z;
   if(Math.hypot(dx,dz)>3&&Math.abs(dx*r.x+dz*r.z)>2.2&&isClear(p))return {...p,side:sign};
  }
 }
 for(const back of [2.6,3.8,5])for(const lateral of [2.8,3.8,0])for(const sign of signs){
  const p={x:origin.x-f.x*back+r.x*sign*lateral,z:origin.z-f.z*back+r.z*sign*lateral};
  if(isClear(p))return {...p,side:sign};
 }
 return null; // Stop safely rather than select a point in front of the engine.
}
