import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld} from '../src/world.js';
import {createCreature} from '../src/creatures.js';
import {updateGameCamera} from '../src/camera.js';
import {refugeAt,refugeLineClear,refugeWorld} from '../src/refuge.js';

const context={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};

function fixture(t){
  const previous=globalThis.document;
  globalThis.document={createElement(){return {width:0,height:0,getContext(){return context}}}};
  let world;
  try{world=createWorld(new THREE.Scene(),{},{natural:true,regionIndex:0,seed:731});}
  finally{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;}
  t.after(()=>world.dispose());
  world.setCreekState({nest:{...world.creekNest,level:2,safe:false}});
  const refuge=world.creekRefuges.find(r=>r.id==='living-creek-nest');
  assert.ok(refuge?.mesh?.userData.refugeSolids,'the fixed nest must have the real rendered opaque shell');
  assert.ok(refuge.mesh.userData.refugeRoof?.children.length,'the fixed nest must include an actual roof, not just a cover flag');
  const model=createCreature('frog',{team:'player',role:'hunter'});
  t.after(()=>model.dispose());
  world.group.add(model.group);
  const player={type:'frog',team:'player',role:'hunter',tier:1,level:1,model};
  const game={creekMode:true,world,player,camps:[],viewMode:'third',camera:new THREE.PerspectiveCamera(63,16/9,.1,620),cameraYaw:.28,cameraPitch:.38,cameraDistance:12.2,cameraFocus:new THREE.Vector3(),cameraWanted:new THREE.Vector3(),input:{dx:0,dy:0,zoomDelta:0,ndc:{x:0,y:0},setMode(){}},settings:{sensitivity:1},started:true,paused:false,shake:0,ui:{isBlocking:()=>false}};
  placePlayer(game,refuge,{x:0,z:-1.1});
  return {game,world,refuge,model};
}

function placePlayer(game,refuge,{x,z,y=refuge.floorY}){
  Object.assign(game.player,refugeWorld(refuge,{x,y,z}));
  const model=game.player.model;
  model.group.position.set(game.player.x,game.player.y,game.player.z);
  model.group.rotation.y=refuge.yaw;
  model.update(0,{hop:{phase:'idle',progress:0}});
  game.world.group.updateMatrixWorld(true);
  model.skeleton.update();
  return new THREE.Box3().setFromObject(model.mesh).getCenter(new THREE.Vector3());
}

function rendered(object){
  for(let node=object;node;node=node.parent)if(node.visible===false)return false;
  return true;
}

function opaqueMeshes(root,{includeHidden=false}={}){
  const meshes=[];
  root.traverse(object=>{
    if(!object.isMesh||(!includeHidden&&!rendered(object)))return;
    const materials=Array.isArray(object.material)?object.material:[object.material];
    if(materials.some(material=>material?.visible!==false&&(!material.transparent||material.opacity>=.99)))meshes.push(object);
  });
  return meshes;
}

function segmentHits(from,to,meshes){
  const direction=new THREE.Vector3().subVectors(to,from),distance=direction.length();
  if(distance<1e-7)return [];
  return new THREE.Raycaster(from,direction.multiplyScalar(1/distance),0,distance-1e-6).intersectObjects(meshes,false);
}

function finiteCamera(game,label){
  const values=[...game.camera.position.toArray(),...game.camera.quaternion.toArray(),...game.camera.matrixWorld.elements,...game.camera.projectionMatrix.elements,...game.aimPoint.toArray(),game.aimYaw];
  assert.ok(values.every(Number.isFinite),`${label}: camera, projection and aim must stay finite`);
}

function assertClearBoom(game,refuge,label){
  const blockers=opaqueMeshes(refuge.mesh.userData.refugeSolids);
  assert.ok(blockers.length>8,'the test must cast against the physical cavity, not an empty scene');
  const hits=segmentHits(game.cameraFocus,game.camera.position,blockers);
  assert.equal(hits.length,0,`${label}: shoulder camera is behind ${hits[0]?.object.name}`);
  assert.equal(refugeLineClear([refuge],game.cameraFocus,game.camera.position,{fromHeight:0,toHeight:0}),true,`${label}: the camera boom must also remain on the chamber side of physical solids`);
  finiteCamera(game,label);
}

test('actual fixed-nest walls and roof keep snapped and interpolated shoulder orbits clear',t=>{
  const {game,world,refuge}=fixture(t);
  assert.equal(game.camps.length,0,'the fixed home must participate through world.creekRefuges without a legacy camp entry');
  const positions=[{x:0,z:-1.1},{x:-1.8,z:-1.1},{x:1.8,z:-1.1},{x:0,z:-1.75}];
  for(const position of positions){
    placePlayer(game,refuge,position);
    assert.equal(refugeAt(world.creekRefuges,game.player),refuge,'each tested frog is physically inside the covered chamber');
    for(const pitch of [-.1,.38,1.05])for(let step=0;step<24;step++){
      game.cameraYaw=refuge.yaw+step*Math.PI/12;
      game.cameraPitch=pitch;
      updateGameCamera(game,0,true);
      const label=`local (${position.x}, ${position.z}), pitch ${pitch}, orbit ${step}`;
      assert.equal(refuge.mesh.userData.refugeRoof.visible,true,'third person keeps its actual roof visible');
      assertClearBoom(game,refuge,`snap ${label}`);
      // Start outside the shell to reproduce smoothing after a rapid orbit or
      // doorway crossing; checking only the desired boom misses this failure.
      game.camera.position.copy(game.cameraFocus).add(new THREE.Vector3(Math.sin(game.cameraYaw)*10,4,Math.cos(game.cameraYaw)*10));
      updateGameCamera(game,.001,false);
      assertClearBoom(game,refuge,`interpolated ${label}`);
    }
  }
});

test('top-down cutaway exposes the actual interior frog while the hidden roof still blocks overhead predators',t=>{
  const {game,world,refuge,model}=fixture(t),roof=refuge.mesh.userData.refugeRoof;
  game.viewMode='topdown';
  for(const position of [{x:0,z:-1.1},{x:-1.6,z:-1.1},{x:1.6,z:-1.1}]){
    const centre=placePlayer(game,refuge,position);
    const overhead={type:'heron',team:'predator',x:game.player.x,y:refuge.roofTop+3,z:game.player.z};
    assert.equal(refugeLineClear(world.creekRefuges,overhead,game.player),false,'an overhead predator is blocked before the camera changes roof visibility');
    updateGameCamera(game,0,true);
    assert.equal(roof.visible,false,'only the rendered roof is cut away for the occupied chamber');
    assert.equal(model.group.visible,true,'top-down must render the frog');
    finiteCamera(game,'top-down inside');
    const screen=centre.clone().project(game.camera);
    assert.ok(Math.abs(screen.x)<.9&&Math.abs(screen.y)<.9&&screen.z>-1&&screen.z<1,'the real skinned frog projects within the visible viewport');
    const direction=centre.clone().sub(game.camera.position).normalize();
    const ray=new THREE.Raycaster(game.camera.position,direction,game.camera.near,game.camera.position.distanceTo(centre)+2);
    const frogHits=ray.intersectObject(model.mesh);
    assert.ok(frogHits.length,'the camera ray must hit the actual skinned frog surface');
    // Raycaster intentionally ignores Object3D.visible. The unfiltered roof
    // hit is a negative control: the frog would be occluded without cutaway.
    const roofHits=ray.intersectObjects(opaqueMeshes(roof,{includeHidden:true}),false);
    assert.ok(roofHits.some(hit=>hit.distance<frogHits[0].distance),'the physical opaque roof really lies between camera and frog');
    const visibleHits=ray.intersectObjects(opaqueMeshes(refuge.mesh.userData.refugeSolids),false);
    assert.ok(visibleHits.every(hit=>hit.distance>=frogHits[0].distance-1e-5),`the revealed frog must not remain behind ${visibleHits[0]?.object.name}`);
    assert.equal(refugeLineClear(world.creekRefuges,overhead,game.player),false,'rendering cutaway must never create an overhead predator attack route');
  }
});

test('roof cutaway follows only the occupied refuge and restores on exit or camera-mode changes',t=>{
  const {game,world,refuge}=fixture(t),homeRoof=refuge.mesh.userData.refugeRoof;
  const site=world.campSites.find(site=>Math.hypot(site.x-refuge.x,site.z-refuge.z)>20);
  assert.ok(site,'the real natural world must provide a separate refuge site');
  const otherMesh=world.createShelter({...site,id:'camera-refuge-neighbour',natural:true,team:'ally',hp:1,maxHp:1});
  const other=otherMesh.userData.refuge,otherRoof=otherMesh.userData.refugeRoof;
  game.viewMode='topdown';
  updateGameCamera(game,0,true);
  assert.equal(homeRoof.visible,false);
  assert.equal(otherRoof.visible,true,'unoccupied refuges retain their natural roof');
  for(const mode of ['third','first']){
    game.viewMode=mode;updateGameCamera(game,1/60);
    assert.equal(homeRoof.visible,true,`${mode} restores the roof immediately`);
    finiteCamera(game,`${mode} after cutaway`);
    game.viewMode='topdown';updateGameCamera(game,1/60);
    assert.equal(homeRoof.visible,false,'returning to top-down inside reveals the chamber again');
  }
  placePlayer(game,refuge,{x:refuge.entrance.x,z:refuge.entrance.z+.8});
  assert.equal(refugeAt(world.creekRefuges,game.player),null,'the entrance is outside the protected rear chamber');
  updateGameCamera(game,1/60);
  assert.equal(homeRoof.visible,true,'leaving cover restores the roof even while top-down interpolation continues');
  assert.equal(otherRoof.visible,true);
  placePlayer(game,other,{x:0,z:-1.1});
  updateGameCamera(game,0,true);
  assert.equal(homeRoof.visible,true,'moving to another refuge must not retain a stale home cutaway');
  assert.equal(otherRoof.visible,false,'the newly occupied actual refuge receives the cutaway');
});
