import test from 'node:test';import assert from 'node:assert/strict';
import {Group,Mesh,MeshBasicMaterial,SphereGeometry,Raycaster,Vector3,DoubleSide,FrontSide,BackSide,BoxGeometry,Float32BufferAttribute,Uint16BufferAttribute,Bone,SkinnedMesh,Skeleton} from 'three';
import {intersectAnimatedObject} from './animated-picking.js';
import {createTrianglePicker as installMagicTrianglePicking} from './triangle-picking.js';
const data=hits=>hits.map(h=>({distance:h.distance,point:h.point.toArray(),faceIndex:h.faceIndex,face:{a:h.face.a,b:h.face.b,c:h.face.c,normal:h.face.normal.toArray(),materialIndex:h.face.materialIndex},uv:h.uv?.toArray(),normal:h.normal?.toArray()}));
function compare(root,rays){root.updateMatrixWorld(true);const expected=rays.map(r=>data(r.intersectObject(root,true))),acc=installMagicTrianglePicking([root]);try{rays.forEach((r,i)=>assert.deepEqual(data(r.intersectObject(root,true)),expected[i]));return{...acc.stats};}finally{acc.dispose();}}
test('rigid articulated full-detail meshes preserve every exact intersection, UV, face, side and transform',()=>{
 const root=new Group(),joint=new Group();root.position.set(3,-2,1);root.rotation.y=.4;root.scale.set(1.4,.7,-1.2);root.add(joint);joint.rotation.z=.3;
 for(const [i,side]of[FrontSide,BackSide,DoubleSide].entries()){const m=new Mesh(new SphereGeometry(1,96,64),new MeshBasicMaterial({side}));m.position.x=i*3;joint.add(m);}
 const rays=[];for(let x=-2;x<=13;x+=.23)for(const y of[-2.7,-2,-1.3])rays.push(new Raycaster(new Vector3(x,y,9),new Vector3(0,0,-1)));
 const stats=compare(root,rays);assert(stats.candidateTriangles<stats.sourceTriangles*.08,JSON.stringify(stats));for(const m of joint.children)assert.equal(Object.hasOwn(m,'raycast'),false);
});
test('material groups, nonindexed geometry, and draw ranges retain original face indices and stable order',()=>{
 const root=new Group(),g=new BoxGeometry(2,2,2,12,12,12).toNonIndexed();g.setDrawRange(6,g.attributes.position.count-12);
 root.add(new Mesh(g,Array.from({length:6},()=>new MeshBasicMaterial({side:DoubleSide}))));const rays=[];for(let x=-1.1;x<1.2;x+=.13)for(let y=-1.1;y<1.2;y+=.17)rays.push(new Raycaster(new Vector3(x,y,5),new Vector3(0,0,-1)));compare(root,rays);
});
test('changed vertex/index versions rebuild the tree and preserve subsequent queries',()=>{
 const root=new Group(),g=new SphereGeometry(1,48,32),m=new Mesh(g,new MeshBasicMaterial({side:DoubleSide}));root.add(m);root.updateMatrixWorld(true);
 const rays=[new Raycaster(new Vector3(.6,0,5),new Vector3(0,0,-1))],acc=installMagicTrianglePicking([root]);try{
  rays[0].intersectObject(root,true);const builds=acc.stats.builds;g.attributes.position.setX(100,g.attributes.position.getX(100)+.01);g.attributes.position.needsUpdate=true;g.index.needsUpdate=true;g.computeBoundingBox();g.computeBoundingSphere();
  const accelerated=m.raycast;m.raycast=Mesh.prototype.raycast;const expected=data(rays[0].intersectObject(root,true));m.raycast=accelerated;
  assert.deepEqual(data(rays[0].intersectObject(root,true)),expected);assert(acc.stats.builds>builds);
 }finally{acc.dispose();}
});
test('morphing and custom query methods keep the original path',()=>{
 const root=new Group(),m=new Mesh(new SphereGeometry(1,24,16),new MeshBasicMaterial());m.geometry.morphAttributes.position=[new Float32BufferAttribute(m.geometry.attributes.position.array.slice(),3)];root.add(m);const original=m.raycast,acc=installMagicTrianglePicking([root]);try{assert.equal(m.raycast,original);assert.equal(acc.stats.builds,0);}finally{acc.dispose();}
});
test('conservative bone bounds retain exact posed skin hits with blends, nonunit weight sums and nonidentity binds',()=>{
 const g=new SphereGeometry(1,48,32),indices=[],weights=[];for(let i=0;i<g.attributes.position.count;i++){indices.push(0,1,0,0);weights.push(.25,.75000006,0,0);}g.setAttribute('skinIndex',new Uint16BufferAttribute(indices,4));g.setAttribute('skinWeight',new Float32BufferAttribute(weights,4));
 const root=new Group(),mesh=new SkinnedMesh(g,new MeshBasicMaterial({side:DoubleSide})),a=new Bone(),b=new Bone();a.add(b);mesh.add(a);root.add(mesh);root.position.set(3,2,-4);root.rotation.y=.3;root.updateMatrixWorld(true);mesh.bind(new Skeleton([a,b]));
 let queries=0,acc;try{for(const angle of[0,.6,-.8,1.3])for(const shift of[0,.3]){
  b.rotation.set(angle,angle*.7,-angle*.3);b.position.set(shift,.2*shift,0);root.updateMatrixWorld(true);
  const rays=[];for(let x=-1.3;x<1.4;x+=.18)rays.push(new Raycaster(new Vector3(3+x,2,3),new Vector3(0,0,-1)));
  const expected=rays.map(r=>data(intersectAnimatedObject(r,root)));acc=installMagicTrianglePicking([root]);rays.forEach((r,i)=>{assert.deepEqual(data(intersectAnimatedObject(r,root)),expected[i]);queries++;});assert(acc.stats.candidateTriangles<acc.stats.sourceTriangles*.2,JSON.stringify(acc.stats));acc.dispose();acc=null;
 }}finally{acc?.dispose();}assert(queries>100);assert.equal(Object.hasOwn(mesh,'computeBoundingSphere'),false);
});
