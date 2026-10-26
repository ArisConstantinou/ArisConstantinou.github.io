import test from 'node:test';
import assert from 'node:assert/strict';
import {DoubleSide,Mesh,MeshBasicMaterial,Object3D,PerspectiveCamera,Raycaster,Vector2,Vector3} from 'three';
import {leafGeometry} from '../src/world.js';
import {createLilyCameraSurface} from '../src/camera-surface.js';
import {resolveCameraBoom} from '../src/arcade-view-math.js';

// Actual leaf instance and camera from the opaque upper-right triangle report.
const fringeMatrix=[1.2767621278762817,.02548336796462536,.9574244618415833,0,-.006603776477277279,.9998196363449097,-.017805393785238266,0,-.9577054977416992,.01641063578426838,1.2767001390457153,0,.8285105228424072,.09018924832344055,10.63740348815918,1];
const fringeRadius=Math.hypot(...fringeMatrix.slice(0,3));
const fringeLily=()=>({x:fringeMatrix[12],z:fringeMatrix[14],y:.105,visualRadius:fringeRadius,radius:fringeRadius*.91});

test('the reproduced visible lily fringe gets camera clearance outside its walking disc',()=>{
 const geometry=leafGeometry(),lily=fringeLily(),before=structuredClone(lily),sample=createLilyCameraSurface([lily],geometry.attributes.position.array);
 const eye=[0,.10000003215377073,9.403583628279666];
 assert.ok(Math.hypot(eye[0]-lily.x,eye[2]-lily.z)>lily.radius,'the walking surface correctly treats this fringe point as water');
 assert.ok(sample(eye[0],eye[2])>.1514451785285849,'the camera envelope covers the actual rendered triangle hit');
 assert.deepEqual(lily,before,'camera lookup does not enlarge or move the walking platform');
 geometry.dispose();
});

test('camera-only clearance removes the actual near-plane leaf hit while retaining the upward view',()=>{
 const geometry=leafGeometry(),lily=fringeLily(),sample=createLilyCameraSurface([lily],geometry.attributes.position.array);
 const mesh=new Mesh(geometry,new MeshBasicMaterial({side:DoubleSide}));mesh.matrixAutoUpdate=false;mesh.matrix.fromArray(fringeMatrix);mesh.updateMatrixWorld(true);
 const old={look:[0,.95,5.1],position:[0,.10000003215377073,9.403583628279666]};
 const safe=resolveCameraBoom(old,(x,z)=>Math.max(-.25,sample(x,z)));
 function hits(pose){const camera=new PerspectiveCamera(52,1440/900,.1,250);camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();const ray=new Raycaster();ray.setFromCamera(new Vector2(1000/1440*2-1,1-50/900*2),camera);return ray.intersectObject(mesh);}
 const oldHit=hits(old)[0],newHit=hits(safe)[0];
 assert.ok(oldHit&&oldHit.distance<.1,'fixture reproduces the leaf triangle inside the old near plane');
 assert.ok(!newHit||newHit.distance>.35,'no opaque leaf crosses the repaired near view');
 assert.ok(new Vector3(...old.look).sub(new Vector3(...old.position)).normalize().distanceTo(new Vector3(...safe.look).sub(new Vector3(...safe.position)).normalize())<1e-12,'the repair preserves the requested upward aiming direction');
 assert.ok(safe.position[2]<old.position[2],'the eye stops before entering the rendered leaf fringe');
 geometry.dispose();mesh.material.dispose();
});

test('the envelope covers every real leaf vertex across its initial stretch, tilt and animated bob limits',()=>{
 const geometry=leafGeometry(),positions=geometry.attributes.position.array,transform=new Object3D(),point=new Vector3();
 for(const radius of [1.1,1.5960678348,3.1]){
  const lily={x:4.4,z:-1.2,y:.105,visualRadius:radius,radius:radius*.91},sample=createLilyCameraSurface([lily],positions,{bucketSize:1});
  for(const yaw of [0,.7,2.4])for(const rx of [-.02,.02])for(const rz of [-.0175,.0175])for(const stretch of [.89,1.07])for(const bob of [-.018,.018]){
   transform.position.set(lily.x,lily.y+bob,lily.z);transform.rotation.set(rx,yaw,rz);transform.scale.set(radius,1,radius*stretch);transform.updateMatrix();
   for(let i=0;i<positions.length;i+=3){point.fromArray(positions,i).applyMatrix4(transform.matrix);assert.ok(sample(point.x,point.z)>=point.y-1e-8,'camera surface encloses a transformed rendered vertex');}
  }
 }
 geometry.dispose();
});

test('visual fringes are indexed across bucket boundaries independently of walking radius',()=>{
 const geometry=leafGeometry(),lily={x:4.4,z:1,y:.105,visualRadius:1.6,radius:1.456},sample=createLilyCameraSurface([lily],geometry.attributes.position.array);
 assert.ok(lily.x+lily.radius<6,'walking disc ends inside the first bucket');
 assert.ok(Number.isFinite(sample(6.1,1)),'rendered fringe in the next bucket remains protected');
 assert.equal(sample(30,30),-Infinity,'unrelated terrain receives no pad envelope');
 assert.equal(sample(6.1,4),-Infinity,'a shared bucket does not turn into a square collision footprint');
 geometry.dispose();
});

test('water level changes move the camera envelope with the existing pad without changing its geometry',()=>{
 const geometry=leafGeometry(),positions=geometry.attributes.position.array,original=positions.slice(),lily=fringeLily(),sample=createLilyCameraSurface([lily],positions);
 const before=sample(lily.x,lily.z),radius=lily.radius;lily.y+=.6;
 assert.ok(Math.abs(sample(lily.x,lily.z)-before-.6)<1e-12);
 assert.equal(lily.radius,radius);assert.deepEqual(positions,original);
 geometry.dispose();
});
