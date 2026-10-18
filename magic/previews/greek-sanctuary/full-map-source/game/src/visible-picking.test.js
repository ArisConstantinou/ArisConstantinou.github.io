import test from 'node:test';
import assert from 'node:assert/strict';
import {Bone,Group,Mesh,MeshBasicMaterial,Raycaster,Skeleton,SkinnedMesh,SphereGeometry,Uint16BufferAttribute,Float32BufferAttribute,Vector3,DoubleSide} from 'three';
import {intersectAnimatedObject,intersectVisibleAnimatedObject,prepareObjectPicking} from './animated-picking.js';
import {prepareObjectPickingAsync,createTrianglePicker} from './triangle-picking.js';
const data=hits=>hits.map(h=>({id:h.object.id,distance:h.distance,point:h.point.toArray(),faceIndex:h.faceIndex,uv:h.uv?.toArray(),normal:h.normal?.toArray()}));
const visible=object=>{for(let n=object;n;n=n.parent)if(!n.visible)return false;return true;};
function skin(geometry=new SphereGeometry(1,48,32)){
 const count=geometry.attributes.position.count,indices=[],weights=[];
 for(let i=0;i<count;i++){indices.push(0,1,0,0);weights.push(.25,.75,0,0);}
 geometry.setAttribute('skinIndex',new Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new Float32BufferAttribute(weights,4));
 const mesh=new SkinnedMesh(geometry,new MeshBasicMaterial({side:DoubleSide})),a=new Bone(),b=new Bone();a.add(b);mesh.add(a);mesh.updateMatrixWorld(true);mesh.bind(new Skeleton([a,b]));return{mesh,b};
}
test('game picking skips hidden LOD vertex skinning before the query and retains exact visible hits',()=>{
 const root=new Group(),shown=skin(),hidden=skin();root.add(shown.mesh,hidden.mesh);hidden.mesh.visible=false;
 const ray=new Raycaster(new Vector3(.2,.1,5),new Vector3(0,0,-1));
 const expected=data(intersectAnimatedObject(ray,root).filter(h=>visible(h.object)));let hiddenSkins=0,shownSkins=0;
 const h=hidden.mesh.applyBoneTransform,s=shown.mesh.applyBoneTransform;
 hidden.mesh.applyBoneTransform=function(...args){hiddenSkins++;return h.apply(this,args);};shown.mesh.applyBoneTransform=function(...args){shownSkins++;return s.apply(this,args);};
 assert.deepEqual(data(intersectVisibleAnimatedObject(ray,root)),expected);assert.equal(hiddenSkins,0);assert(shownSkins<shown.mesh.geometry.attributes.position.count*.2);
 assert.equal(Object.hasOwn(shown.mesh,'raycast'),false);assert.equal(Object.hasOwn(shown.mesh,'getVertexPosition'),false);
 const parent=new Group();parent.visible=false;parent.add(root);assert.deepEqual(intersectVisibleAnimatedObject(ray,root),[]);
});
test('shared geometry remains correct across different actors, poses and repeated temporary controllers',()=>{
 const first=skin(),second=skin(first.mesh.geometry),root=new Group();root.add(first.mesh,second.mesh);second.mesh.position.x=3;
 prepareObjectPicking(root);
 const ray=new Raycaster(new Vector3(.2,0,5),new Vector3(0,0,-1));
 for(let i=0;i<12;i++){
  first.b.rotation.z=i*.12;second.b.rotation.z=-i*.21;root.position.x=(i%2)*.25;
  const expected=data(intersectAnimatedObject(ray,root));assert.deepEqual(data(intersectVisibleAnimatedObject(ray,root)),expected);
 }
});
test('asynchronous prewarming yields and shares its geometry tree with later clones',async()=>{
 const geometry=new SphereGeometry(1,128,96),root=new Group(),mesh=new Mesh(geometry,new MeshBasicMaterial());root.add(mesh);let frames=0;
 await prepareObjectPickingAsync(root,async()=>{frames++;});assert(frames>0);assert.equal(Object.hasOwn(mesh,'raycast'),false);
 const clone=new Group();clone.add(mesh.clone());const picker=createTrianglePicker([clone]);try{assert.equal(picker.stats.builds,0);}finally{picker.dispose();}
});
test('exceptions restore geometry and all temporary methods',()=>{
 const {mesh}=skin(),root=new Group();root.add(mesh);const geometry=mesh.geometry,original=mesh.computeBoundingSphere;
 const ray=new Raycaster(new Vector3(0,0,5),new Vector3(0,0,-1));ray.intersectObjects=()=>{throw Error('expected failure');};
 assert.throws(()=>intersectVisibleAnimatedObject(ray,root),/expected failure/);assert.equal(mesh.geometry,geometry);assert.equal(mesh.computeBoundingSphere,original);
 assert.equal(Object.hasOwn(mesh,'raycast'),false);assert.equal(Object.hasOwn(mesh,'getVertexPosition'),false);
});
