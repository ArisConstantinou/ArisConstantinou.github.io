import * as THREE from 'three';
const identity=o=>o.position.lengthSq()<1e-12&&Math.abs(o.quaternion.w)>1-1e-12&&Math.abs(o.scale.x-1)+Math.abs(o.scale.y-1)+Math.abs(o.scale.z-1)<1e-12;
export function setPackedDensity(mesh,density){
 const sources=mesh.userData.packedSources;if(!sources)return false;let at=0;
 for(const source of sources){const count=Math.floor(source.count*density/source.groupSize)*source.groupSize;mesh.instanceMatrix.array.set(source.matrices.subarray(0,count*16),at*16);if(mesh.instanceColor){if(source.colours)mesh.instanceColor.array.set(source.colours.subarray(0,count*3),at*3);else mesh.instanceColor.array.fill(1,at*3,(at+count)*3);}at+=count;}
 mesh.count=at;mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;return true;
}
export function mergeStaticInstanceGroups(root){
 const groups=new Map();root.traverse(mesh=>{if(!mesh.isInstancedMesh||Array.isArray(mesh.material)||mesh.instanceMatrix.usage===THREE.DynamicDrawUsage)return;for(let p=mesh;p&&p!==root;p=p.parent)if(!identity(p))return;const key=[mesh.geometry.uuid,mesh.material.uuid,mesh.userData.groupSize||1,mesh.castShadow,mesh.receiveShadow,mesh.renderOrder].join(':');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(mesh);});
 let reduction=0,batches=0,instances=0;
 for(const meshes of groups.values()){if(meshes.length<2)continue;const sources=meshes.map(mesh=>({count:mesh.userData.fullCount??mesh.instanceMatrix.count,groupSize:mesh.userData.groupSize||1,matrices:mesh.instanceMatrix.array,colours:mesh.instanceColor?.array})),count=sources.reduce((n,s)=>n+s.count,0),first=meshes[0],combined=new THREE.InstancedMesh(first.geometry,first.material,count);combined.name='Κοινά buffers · '+first.name;combined.castShadow=first.castShadow;combined.receiveShadow=first.receiveShadow;combined.renderOrder=first.renderOrder;combined.userData={decorativeOnly:true,fullCount:count,groupSize:first.userData.groupSize||1,packedSources:sources};if(sources.some(s=>s.colours))combined.instanceColor=new THREE.InstancedBufferAttribute(new Float32Array(count*3),3);setPackedDensity(combined,1);combined.computeBoundingSphere();combined.boundingSphere.radius+=.75;for(const mesh of meshes){mesh.removeFromParent();mesh.dispose();}root.add(combined);reduction+=meshes.length-1;batches++;instances+=count;}
 return {reduction,batches,instances};
}
