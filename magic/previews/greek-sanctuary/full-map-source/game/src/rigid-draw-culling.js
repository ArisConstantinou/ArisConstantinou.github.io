import {Box3,Material,Matrix4} from 'three';

/** A sphere may overlap a frustum while the complete rigid mesh is outside.
 * Reject only a complete box outside one clip plane, before GPU submission.
 * Keep uncertain, deformed and custom vertex paths on Three's original path.
 * Bounds are private: query geometry and original culling stay unchanged. */
export function installRigidDrawCulling(renderer){
 const original=renderer.renderBufferDirect,bounds=new WeakMap(),matrix=new Matrix4(),instance=new Matrix4(),instanceBox=new Box3();
 const stats={tested:0,culled:0,boundsBuilt:0};let enabled=true;
 function boxFor(object,geometry){
  const p=geometry.attributes.position;if(!p)return null;
  const owner=object.isInstancedMesh?object:geometry;
  const source=p.isInterleavedBufferAttribute?p.data:p;
  let entry=bounds.get(owner);
  if(!entry||entry.position!==p||entry.array!==source.array||entry.version!==source.version||entry.vertices!==p.count||entry.instances!==object.count||entry.instanceVersion!==object.instanceMatrix?.version){
   const local=new Box3().setFromBufferAttribute(p),box=local.clone();
   if(object.isInstancedMesh){box.makeEmpty();for(let i=0;i<object.count;i++){object.getMatrixAt(i,instance);box.union(instanceBox.copy(local).applyMatrix4(instance));}}
   entry={position:p,array:source.array,version:source.version,vertices:p.count,instances:object.count,instanceVersion:object.instanceMatrix?.version,box};
   bounds.set(owner,entry);stats.boundsBuilt++;
  }
  return entry.box;
 }
 function outside(box,e){
  if(box.isEmpty())return true;
  const lo=box.min,hi=box.max;
  for(const sign of [-1,1])for(let axis=0;axis<3;axis++){
   const a=e[3]+sign*e[axis],b=e[7]+sign*e[axis+4],c=e[11]+sign*e[axis+8],d=e[15]+sign*e[axis+12];
   const x=a>=0?hi.x:lo.x,y=b>=0?hi.y:lo.y,z=c>=0?hi.z:lo.z;
   // Keep near-plane/edge uncertainty, including large or mirrored transforms.
   const slack=1e-5*(1+Math.abs(a*x)+Math.abs(b*y)+Math.abs(c*z)+Math.abs(d));
   if(a*x+b*y+c*z+d < -slack)return true;
  }
  return false;
 }
 function guarded(camera,scene,geometry,material,object,group){
  const supported=enabled&&object.isMesh&&!object.isSkinnedMesh&&!object.isBatchedMesh&&object.frustumCulled&&!material.isShaderMaterial&&!material.isRawShaderMaterial&&!material.displacementMap&&material.onBeforeCompile===Material.prototype.onBeforeCompile&&!Object.keys(geometry.morphAttributes).length;
  if(supported){const box=boxFor(object,geometry);stats.tested++;
   if(box&&outside(box,matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).multiply(object.matrixWorld).elements)){stats.culled++;return;}
  }
  return original.call(this,camera,scene,geometry,material,object,group);
 }
 renderer.renderBufferDirect=guarded;
 return{stats,setEnabled(value){enabled=!!value;},dispose(){enabled=false;if(renderer.renderBufferDirect===guarded)renderer.renderBufferDirect=original;}};
}
