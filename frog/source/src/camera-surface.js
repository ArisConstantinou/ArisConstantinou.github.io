// The walking disc is intentionally smaller than a lily's rendered fringe.
// Camera clearance instead encloses the real curved leaf, its initial Z
// stretch (up to 1.07), X/Z tilt (combined less than .04rad) and .018 bob.
export function createLilyCameraSurface(lilies,positions,{bucketSize=6}={}){
 let radial=0,top=-Infinity,vertical=0;
 for(let i=0;i<positions.length;i+=3){radial=Math.max(radial,Math.hypot(positions[i],positions[i+2]));top=Math.max(top,positions[i+1]);vertical=Math.max(vertical,Math.abs(positions[i+1]));}
 const buckets=new Map(),size=Number.isFinite(bucketSize)&&bucketSize>0?bucketSize:6,tilt=Math.sin(.04);
 for(const lily of lilies){
  const radius=radial*lily.visualRadius*1.07+vertical*tilt+.01;
  const entry={lily,radiusSquared:radius*radius,heightOffset:top+radial*lily.visualRadius*1.07*tilt+.018+.01};
  for(let x=Math.floor((lily.x-radius)/size);x<=Math.floor((lily.x+radius)/size);x++)for(let z=Math.floor((lily.z-radius)/size);z<=Math.floor((lily.z+radius)/size);z++){
   const key=x+':'+z;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(entry);
  }
 }
 return (x,z)=>{
  let height=-Infinity;const nearby=buckets.get(Math.floor(x/size)+':'+Math.floor(z/size))||[];
  for(const {lily,radiusSquared,heightOffset} of nearby){const dx=x-lily.x,dz=z-lily.z;if(dx*dx+dz*dz<=radiusSquared)height=Math.max(height,lily.y+heightOffset);}
  return height;
 };
}
