// Floors use corner coordinates here. Remove shared edges to make real open
// doorways, then return the exterior wall pieces of the connected union.
export function castleBoundaries(rectangles) {
 const result=[];
 for(const room of rectangles) for(const [axis,at,lo,hi,normal] of [
   ['x',room.z,room.x,room.x+room.w,-1],['x',room.z+room.d,room.x,room.x+room.w,1],
   ['z',room.x,room.z,room.z+room.d,-1],['z',room.x+room.w,room.z,room.z+room.d,1]]) {
   let spans=[[lo,hi]];
   for(const other of rectangles) {
     if(other===room)continue;
     const start=axis==='x'?other.z:other.x, end=start+(axis==='x'?other.d:other.w);
     if(at<start-.001||at>end+.001)continue;
     const a=axis==='x'?other.x:other.z,b=a+(axis==='x'?other.w:other.d);
     spans=spans.flatMap(([l,h])=> b<=l||a>=h?[[l,h]]:[[l,Math.min(a,h)],[Math.max(b,l),h]].filter(([x,y])=>y-x>.01));
   }
   for(const [l,h] of spans) result.push({axis,at,lo:l,hi:h,normal,room:room.id});
 }
 return result;
}
