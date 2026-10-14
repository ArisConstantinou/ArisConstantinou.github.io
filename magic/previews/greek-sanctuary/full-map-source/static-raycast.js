import * as T from 'three';
const trees=new WeakMap();
function treeFor(geometry){
 if(trees.has(geometry))return trees.get(geometry);const p=geometry.attributes.position,index=geometry.index,count=(index?index.count:p.count)/3,triangles=[];
 for(let face=0;face<count;face++){const bounds=new T.Box3();for(let k=0;k<3;k++){const i=index?index.getX(face*3+k):face*3+k;bounds.expandByPoint(new T.Vector3().fromBufferAttribute(p,i));}triangles.push({face,bounds,center:bounds.getCenter(new T.Vector3())});}
 function build(items){const bounds=new T.Box3();for(const t of items)bounds.union(t.bounds);if(items.length<=32)return {bounds,faces:items.map(t=>t.face)};const size=bounds.getSize(new T.Vector3()),axis=size.x>=size.y&&size.x>=size.z?'x':size.y>=size.z?'y':'z';items.sort((a,b)=>a.center[axis]-b.center[axis]);const mid=items.length>>1;return {bounds,left:build(items.slice(0,mid)),right:build(items.slice(mid))};}
 const tree=build(triangles);trees.set(geometry,tree);return tree;
}
function acceleratedRaycast(raycaster,hits){
 if(Array.isArray(this.material)||this.isSkinnedMesh||this.morphTargetInfluences?.length)return T.Mesh.prototype.raycast.call(this,raycaster,hits);
 const tree=treeFor(this.geometry),inverse=this.matrixWorld.clone().invert(),ray=raycaster.ray.clone().applyMatrix4(inverse),position=this.geometry.attributes.position,index=this.geometry.index,range=this.geometry.drawRange;
 function visit(node,mesh){
  if(!ray.intersectsBox(node.bounds))return;if(!node.faces){visit(node.left,mesh);visit(node.right,mesh);return;}
  for(const faceIndex of node.faces){const start=faceIndex*3;if(start<range.start||start>=range.start+range.count)continue;const ids=[0,1,2].map(k=>index?index.getX(start+k):start+k),v=ids.map(i=>new T.Vector3().fromBufferAttribute(position,i)),local=new T.Vector3(),back=mesh.material.side===T.BackSide;
   if(!ray.intersectTriangle(back?v[2]:v[0],v[1],back?v[0]:v[2],mesh.material.side!==T.DoubleSide,local))continue;
   const point=local.applyMatrix4(mesh.matrixWorld),distance=point.distanceTo(raycaster.ray.origin);if(distance<raycaster.near||distance>raycaster.far)continue;
   hits.push({distance,point,object:mesh,faceIndex,face:{a:ids[0],b:ids[1],c:ids[2],normal:T.Triangle.getNormal(v[0],v[1],v[2],new T.Vector3()),materialIndex:0}});
  }
 }
 visit(tree,this);
}
export function prepareStaticPicking(root){root.traverse(o=>{if(o.isMesh&&!o.isSkinnedMesh&&!Array.isArray(o.material)){treeFor(o.geometry);o.raycast=acceleratedRaycast;}});}
export function verifyStaticPicking(root){
 const checks=[];root.updateMatrixWorld(true);root.traverse(mesh=>{if(!mesh.isMesh||Array.isArray(mesh.material))return;const center=new T.Box3().setFromObject(mesh).getCenter(new T.Vector3());
  for(const d of [new T.Vector3(1,.2,.3),new T.Vector3(-.3,1,.4),new T.Vector3(.2,-.3,1),new T.Vector3(-1,-.2,-.3)]){const ray=new T.Raycaster(center.clone().addScaledVector(d,4),d.clone().negate().normalize(),0,30),a=[],b=[];T.Mesh.prototype.raycast.call(mesh,ray,a);acceleratedRaycast.call(mesh,ray,b);a.sort((a,b)=>a.distance-b.distance);b.sort((a,b)=>a.distance-b.distance);checks.push({mesh:mesh.name,reference:a.length,accelerated:b.length,pass:a.length===b.length&&a.every((v,i)=>Math.abs(v.distance-b[i].distance)<1e-6)});}
 });return checks;
}
