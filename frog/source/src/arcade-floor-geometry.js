import * as THREE from 'three';

// A floor has exactly one upper surface at the simulation's walking height.
// Light boards and dark seams partition that surface instead of placing thin
// board boxes over a second, nearly coplanar slab. Materials 0/1 are dark/light.
export function plankedFloorGeometry(halfWidth,halfDepth,thickness){
 const positions=[],indices=[[],[]];
 const quad=(a,b,c,d,material=0)=>{
  const start=positions.length/3;positions.push(...a,...b,...c,...d);
  indices[material].push(start,start+1,start+2,start,start+2,start+3);
 };
 const top=(minX,maxX,minZ,maxZ,material=0)=>{
  if(maxX<=minX||maxZ<=minZ)return;
  quad([minX,0,minZ],[minX,0,maxZ],[maxX,0,maxZ],[maxX,0,minZ],material);
 };
 const w=halfWidth,d=halfDepth,bottom=-thickness,border=Math.min(.03,w*.1,d*.1);
 // Structural sides and underside have no hidden duplicate top face.
 quad([-w,bottom,-d],[w,bottom,-d],[w,bottom,d],[-w,bottom,d]);
 quad([-w,bottom,d],[w,bottom,d],[w,0,d],[-w,0,d]);
 quad([-w,bottom,-d],[-w,0,-d],[w,0,-d],[w,bottom,-d]);
 quad([-w,bottom,-d],[-w,bottom,d],[-w,0,d],[-w,0,-d]);
 quad([w,bottom,-d],[w,0,-d],[w,0,d],[w,bottom,d]);
 // A dark edge surrounds regular board rows; every seam owns its own area.
 top(-w,-w+border,-d,d);top(w-border,w,-d,d);
 top(-w+border,w-border,-d,-d+border);top(-w+border,w-border,d-border,d);
 const innerDepth=2*(d-border),rows=Math.max(1,Math.ceil(innerDepth/.4)),pitch=innerDepth/rows,seam=Math.min(.045,pitch*.15);
 for(let row=0;row<rows;row++){
  const start=-d+border+row*pitch,end=-d+border+(row+1)*pitch,boardEnd=row===rows-1?end:end-seam;
  top(-w+border,w-border,start,boardEnd,1);
  top(-w+border,w-border,boardEnd,end);
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
 geometry.setIndex([...indices[0],...indices[1]]);geometry.addGroup(0,indices[0].length,0);geometry.addGroup(indices[0].length,indices[1].length,1);
 geometry.computeVertexNormals();geometry.computeBoundingBox();geometry.computeBoundingSphere();
 return geometry;
}
