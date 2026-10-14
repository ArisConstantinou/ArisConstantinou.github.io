// The native HEARTH compound body is 3.14m wide and 3.86m tall. Keep the
// entrance anchored to its parent room; enlarge the alcove outwards.
export const SECRET_CLEARANCE={width:3.8,height:4.25,depth:5.2,breadth:5.6};
export function fitSecretArea(area){
 const {depth,breadth}=SECRET_CLEARANCE;
 if(area.axis==='z'){const edge=area.x+area.w,center=area.z+area.d/2;return {...area,x:edge-depth,z:center-breadth/2,w:depth,d:breadth};}
 const edge=area.z+area.d,center=area.x+area.w/2;return {...area,x:center-breadth/2,z:edge-depth,w:breadth,d:depth};
}

// Exact sphere/AABB separation for the compound HEARTH body. Broad boxes
// around its arms would wrongly reject low furniture that the torso clears.
export function engineProfileIntersects(box,point,floorY,profile){
 const loY=box.y-box.h/2,hiY=box.y+box.h/2;
 return profile.spheres.some(s=>{const x=point.x+s.x,y=floorY+profile.originY+s.y,z=point.z+s.z,dx=Math.max(0,Math.abs(x-box.x)-box.w/2),dy=Math.max(0,loY-y,y-hiY),dz=Math.max(0,Math.abs(z-box.z)-box.d/2);return dx*dx+dy*dy+dz*dz<(s.radius+.025)**2;});
}
