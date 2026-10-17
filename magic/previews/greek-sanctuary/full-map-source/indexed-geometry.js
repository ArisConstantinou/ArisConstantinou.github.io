// Keep authored vertex sharing when assembling static surfaces. A sequential
// index makes non-indexed inputs compatible without welding, rounding, or
// changing triangle order, hard normals, UV seams, or any vertex attribute.
export function indexedClone(source){
 const geometry=source.clone();
 if(!geometry.index){
  const count=geometry.attributes.position.count;
  geometry.setIndex(Array.from({length:count},(_,i)=>i));
 }
 return geometry;
}
