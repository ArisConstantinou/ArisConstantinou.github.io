import test from 'node:test';import assert from 'node:assert/strict';
import {Bone,Group,MeshBasicMaterial,Raycaster,Skeleton,SkinnedMesh,SphereGeometry,Uint16BufferAttribute,Float32BufferAttribute,Vector3,DoubleSide} from 'three';
import {intersectAnimatedObject} from './animated-picking.js';
function fixture(){
 const geometry=new SphereGeometry(1,24,16),count=geometry.attributes.position.count,indices=[],weights=[];
 for(let i=0;i<count;i++){indices.push(0,1,0,0);weights.push(.25,.75,0,0);}
 geometry.setAttribute('skinIndex',new Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new Float32BufferAttribute(weights,4));
 const root=new Group(),mesh=new SkinnedMesh(geometry,new MeshBasicMaterial({side:DoubleSide})),a=new Bone(),b=new Bone();a.add(b);mesh.add(a);root.add(mesh);root.position.set(3,2,-4);root.updateMatrixWorld(true);mesh.bind(new Skeleton([a,b]));
 return{root,mesh,b,count};
}
const hitData=hits=>hits.map(h=>({distance:h.distance,point:h.point.toArray(),faceIndex:h.faceIndex,uv:h.uv?.toArray(),normal:h.normal?.toArray()}));
test('cached picking matches exact skinned triangle hits for every new pose and ray',()=>{
 const {root,mesh,b}=fixture(),ray=new Raycaster();let queries=0;
 for(const angle of [0,.6,-.8,1.3])for(const shift of [0,.3]){
  b.rotation.set(angle,angle*.7,-angle*.3);b.position.set(shift,.2*shift,0);root.updateMatrixWorld(true);
  for(const x of [-.8,0,.8,2]){
   ray.set(new Vector3(3+x,2,3),new Vector3(0,0,-1));mesh.computeBoundingSphere();const expected=hitData(ray.intersectObject(root,true));
   assert.deepEqual(hitData(intersectAnimatedObject(ray,root)),expected);assert.equal(Object.hasOwn(mesh,'getVertexPosition'),false);queries++;
  }
 }
 assert.equal(queries,32);
});
test('a dense animated mesh skins each vertex once across bounds and all intersected triangles',()=>{
 const {root,mesh,count}=fixture(),ray=new Raycaster(new Vector3(3,2,3),new Vector3(0,0,-1)),original=mesh.applyBoneTransform;let calls=0;
 mesh.applyBoneTransform=function(...args){calls++;return original.apply(this,args);};mesh.computeBoundingSphere();const expected=hitData(ray.intersectObject(root,true)),before=calls;calls=0;
 assert.deepEqual(hitData(intersectAnimatedObject(ray,root)),expected);assert.equal(calls,count);assert(before>count*3,'the reference must exercise repeated triangle skinning');
});
test('picking restores custom methods even when an intersection fails',()=>{
 const {root,mesh}=fixture(),original=mesh.getVertexPosition,custom=function(...args){return original.apply(this,args);};mesh.getVertexPosition=custom;
 assert.throws(()=>intersectAnimatedObject({intersectObject(){throw Error('test ray failure');}},root),/test ray failure/);assert.equal(mesh.getVertexPosition,custom);
});
test('candidate-only matrix updates preserve moved parent and bind transforms without visiting unrelated actors',()=>{
 const {root,mesh,b}=fixture(),scene=new Group(),unrelated=new Group();scene.add(root,unrelated);let visited=0;unrelated.updateMatrixWorld=()=>{visited++;};
 const ray=new Raycaster(new Vector3(4,2,3),new Vector3(0,0,-1));scene.position.x=1;b.rotation.z=.7;scene.updateMatrixWorld(true);mesh.computeBoundingSphere();const expected=hitData(ray.intersectObject(root,true));
 scene.position.x=0;b.rotation.z=0;scene.updateMatrixWorld(true);scene.position.x=1;b.rotation.z=.7;visited=0;
 assert.deepEqual(hitData(intersectAnimatedObject(ray,root)),expected);assert.equal(visited,0);assert(expected.length>0);
});
