const EMPTY=Object.freeze([]);
/** Conservative X/Z lookup only. Exact height, seam and collision predicates
 * still run on original live objects, in their original order. */
export function indexBoxes(boxes,padding,cell=4){
 const buckets=new Map();
 for(const box of boxes){
  const x0=Math.floor((box.x-box.w/2-padding)/cell),x1=Math.floor((box.x+box.w/2+padding)/cell);
  const z0=Math.floor((box.z-box.d/2-padding)/cell),z1=Math.floor((box.z+box.d/2+padding)/cell);
  for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){
   const key=x+','+z;let bucket=buckets.get(key);if(!bucket)buckets.set(key,bucket=[]);bucket.push(box);
  }
 }
 return (x,z)=>buckets.get(Math.floor(x/cell)+','+Math.floor(z/cell))||EMPTY;
}
