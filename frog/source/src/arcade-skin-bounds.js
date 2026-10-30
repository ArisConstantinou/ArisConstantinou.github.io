import * as THREE from 'three';

// Every skinned point is a weighted sum of transformed bind-space points.
// Enclosing each bone's points, then their union, encloses every rotation/IK pose.
// The matrix norm bound also covers shear/nonuniform scale, unlike max-column scale.
export function linearScaleBound(m){
 const e=m.elements,one=Math.max(Math.abs(e[0])+Math.abs(e[1])+Math.abs(e[2]),Math.abs(e[4])+Math.abs(e[5])+Math.abs(e[6]),Math.abs(e[8])+Math.abs(e[9])+Math.abs(e[10]));
 const inf=Math.max(Math.abs(e[0])+Math.abs(e[4])+Math.abs(e[8]),Math.abs(e[1])+Math.abs(e[5])+Math.abs(e[9]),Math.abs(e[2])+Math.abs(e[6])+Math.abs(e[10]));
 return Math.sqrt(one*inf);
}
const component=(a,i,k)=>k===0?a.getX(i):k===1?a.getY(i):k===2?a.getZ(i):a.getW(i);
export function createSkinnedBounds(skin){
 const {position,skinIndex,skinWeight}=skin.geometry.attributes;if(!position||!skinIndex||!skinWeight||skin.geometry.morphAttributes.position?.length)throw Error('Unsupported skinned bounds attributes');
 const boxes=new Map(),point=new THREE.Vector3();let minSum=Infinity,maxSum=0;
 for(let i=0;i<position.count;i++){
  let sum=0;for(let k=0;k<4;k++){const w=component(skinWeight,i,k);if(!Number.isFinite(w)||w<0)throw Error('Invalid skin weight');sum+=w;if(!w)continue;const j=component(skinIndex,i,k);if(!skin.skeleton.bones[j])throw Error('Invalid skin bone');let box=boxes.get(j);if(!box){box=new THREE.Box3();boxes.set(j,box);}point.fromBufferAttribute(position,i).applyMatrix4(skin.bindMatrix).applyMatrix4(skin.skeleton.boneInverses[j]);box.expandByPoint(point);}
  if(!(sum>0))throw Error('Unweighted skin vertex');minSum=Math.min(minSum,sum);maxSum=Math.max(maxSum,sum);
 }
 const spheres=[...boxes].map(([j,box])=>({bone:skin.skeleton.bones[j],center:box.getCenter(new THREE.Vector3()),extent:box.getSize(new THREE.Vector3()).multiplyScalar(.5)})),signature=new Float64Array((spheres.length+1)*16).fill(NaN),matrix=new THREE.Matrix4(),center=new THREE.Vector3(),box=new THREE.Box3(),sphere=new THREE.Sphere();
 skin.boundingSphere=sphere;
 return {box,sphere,update(){
  let changed=false,n=0;for(const mat of [skin.bindMatrixInverse,...spheres.map(p=>p.bone.matrixWorld)])for(const v of mat.elements){if(signature[n]!==v)changed=true;signature[n++]=v;}if(!changed)return false;
  box.makeEmpty();for(const p of spheres){matrix.multiplyMatrices(skin.bindMatrixInverse,p.bone.matrixWorld);center.copy(p.center).applyMatrix4(matrix);const e=matrix.elements,h=p.extent,x=Math.abs(e[0])*h.x+Math.abs(e[4])*h.y+Math.abs(e[8])*h.z,y=Math.abs(e[1])*h.x+Math.abs(e[5])*h.y+Math.abs(e[9])*h.z,z=Math.abs(e[2])*h.x+Math.abs(e[6])*h.y+Math.abs(e[10])*h.z;box.min.min(point.set(center.x-x,center.y-y,center.z-z));box.max.max(point.set(center.x+x,center.y+y,center.z+z));}
  // Quantized weights need not sum to exactly 1; bound both endpoint sums.
  for(const axis of ['x','y','z']){const a=box.min[axis],b=box.max[axis];const t=skin.bindMatrixInverse.elements[axis==='x'?12:axis==='y'?13:14],c0=t*(1-minSum),c1=t*(1-maxSum);box.min[axis]=Math.min(a*minSum,a*maxSum,b*minSum,b*maxSum)+Math.min(c0,c1);box.max[axis]=Math.max(a*minSum,a*maxSum,b*minSum,b*maxSum)+Math.max(c0,c1);}
  box.expandByScalar(Math.max(1,box.min.length(),box.max.length())*1e-5);box.getBoundingSphere(sphere);return true;
 }};
}
