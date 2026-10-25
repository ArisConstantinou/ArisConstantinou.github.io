import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld} from '../src/world.js';

const previousDocument=globalThis.document;
const context={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
globalThis.document={createElement:()=>({getContext:()=>context})};
const scene=new THREE.Scene(),world=createWorld(scene,{});
after(()=>{world.dispose();if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;});

test('vegetation can leave the view without submitting the entire wetland, while lily routes keep every platform',()=>{
  const camera=new THREE.PerspectiveCamera(63,16/9,.1,620);
  camera.position.set(0,8,-15);camera.lookAt(0,1,10);camera.updateMatrixWorld();
  const frustum=new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
  let allTriangles=0,visibleTriangles=0,chunkDraws=0;
  world.group.traverse(object=>{
    if(!object.userData.spatialChunk)return;
    const triangles=object.geometry.index.count/3*object.count;allTriangles+=triangles;
    if(frustum.intersectsObject(object)){visibleTriangles+=triangles;chunkDraws++;}
  });
  assert.ok(visibleTriangles<allTriangles*.75,'camera culling must omit substantial offscreen vegetation');
  assert.ok(chunkDraws<=60,'spatial culling must keep a bounded draw-call budget');
  const pads=world.platforms.filter(p=>p.type==='lily'),lilies=world.group.getObjectByName('Veined water lily leaves');
  assert.equal(lilies.children.reduce((sum,mesh)=>sum+mesh.count,0),pads.length,'no traversable lily is removed to gain speed');
  const matrix=new THREE.Matrix4();
  for(const mesh of lilies.children)for(let i=0;i<mesh.count;i++){
    mesh.getMatrixAt(i,matrix);const x=matrix.elements[12],z=matrix.elements[14];
    assert.ok(pads.some(p=>Math.abs(p.x-x)<.0001&&Math.abs(p.z-z)<.0001),'rendered pads still match their physical support');
  }
});

test('static castle geometry still follows moving gates and placed-building pivots',()=>{
  const site=world.campSites.find(s=>s.id==='home'),shelter=world.createShelter({...site,team:'ally',tier:1,hp:350,maxHp:350,gateHp:180,gateOpen:false,buildings:{store:true}});
  try{
    scene.updateMatrixWorld(true);const revision=shelter.userData.collisionRevision,r=shelter.userData.fortificationGeometry.radius;
    const ray=new THREE.Raycaster(new THREE.Vector3(site.x,shelter.position.y+1.6,site.z+r+3),new THREE.Vector3(0,0,-1),0,5);
    assert.ok(ray.intersectObjects(shelter.userData.gateLeaves,true).length>0);
    world.updateShelter(shelter,{gateOpen:true,buildingPlacements:{store:{x:7,z:-4,yaw:Math.PI/2}}});scene.updateMatrixWorld(true);
    assert.ok(shelter.userData.collisionRevision>revision,'camera caches must notice moved collision geometry');
    assert.equal(ray.intersectObjects(shelter.userData.gateLeaves,true).length,0,'frozen leaf meshes must follow the open hinges');
    const position=shelter.userData.buildingGroups.store.getWorldPosition(new THREE.Vector3());
    assert.ok(Math.abs(position.x-site.x-7)<1e-8&&Math.abs(position.z-site.z+4)<1e-8);
  }finally{world.removeShelter(shelter);}
});

test('water halves expensive mirror passes while camera lighting and waves continue on every frame',()=>{
  const camera=new THREE.PerspectiveCamera(63,16/9,.1,620);camera.position.set(0,8,-15);camera.lookAt(0,0,0);camera.updateMatrixWorld();
  let renders=0,target=null;
  const renderer={xr:{enabled:false},shadowMap:{autoUpdate:true},autoClear:true,
    getRenderTarget:()=>target,setRenderTarget:value=>{target=value;},
    state:{buffers:{depth:{setMask(){}}}},render(){renders++;}};
  for(let frame=1;frame<=12;frame++){
    camera.position.x=frame*.25;camera.updateMatrixWorld();world.update(1/60,frame/60,1,camera.position);
    world.water.onBeforeRender(renderer,scene,camera);
    assert.ok(world.water.material.uniforms.eye.value.equals(camera.position),'specular eye position must not lag skipped reflections');
    assert.equal(world.water.material.uniforms.time.value,frame/60*.45);
    assert.equal(world.water.visible,true);assert.equal(renderer.shadowMap.autoUpdate,true);assert.equal(target,null);
  }
  assert.equal(renders,6,'twelve main frames should render six complete mirror scenes');
});

test('distant fly particles stop uploading matrices without removing food resources',()=>{
  const stocks=world.hotspots.map(s=>s.flies),flies=world.group.getObjectByName('Fly swarms');
  for(let i=0;i<2;i++)world.update(1/60,2+i/60,1,new THREE.Vector3(1000,0,1000));
  assert.equal(flies.count,0);assert.equal(world.renderStats.flyMatricesUpdated,0);
  for(let i=0;i<2;i++)world.update(1/60,3+i/60,1,new THREE.Vector3());
  assert.ok(flies.count>0);assert.ok(flies.count<flies.instanceMatrix.count,'only nearby swarm effects should be uploaded');
  assert.deepEqual(world.hotspots.map(s=>s.flies),stocks,'render distance must not change available food');
});
