import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld,createRegionLayout} from '../src/world.js';
import {CREEK_WATER_BASE,createCreekGeography,creekCurrent} from '../src/creek-world.js';
import {FORT_RADIUS,initializeFort,canPassGate,fortConstructionState,fortLineClear,fortWaypoint,resolveFortMovement,gatePoint} from '../src/fortification.js';
import {createCreature} from '../src/creatures.js';
import {updateGameCamera} from '../src/camera.js';
import {creekMovementMethods} from '../src/creek-movement.js';
import {refugeAt,refugeWorld,refugeLineClear,refugeSurface,refugeEntrancePoint,refugeInteriorPoint} from '../src/refuge.js';

const context={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
function makeWorld(t,regionIndex=0,natural=true){
  const previous=globalThis.document;
  globalThis.document={createElement(){return {width:0,height:0,getContext(){return context}}}};
  let world;
  try{world=createWorld(new THREE.Scene(),{},{natural,regionIndex,seed:731+regionIndex*7919});}
  finally{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;}
  t.after(()=>world.dispose());return world;
}
const phase=(waterOffset=0,flow=.45,foodShift='pond')=>({id:foodShift,waterOffset,flow,foodShift});
const advance=(world,seconds=6)=>{for(let i=0;i<seconds*10;i++)world.update(.1,i*.1,1,new THREE.Vector3());};

test('natural exploration begins on a real lily in a deep pond with reachable distinct landmarks',t=>{
  const world=makeWorld(t);
  assert.equal(world.natural,true);
  assert.deepEqual(world.creekLandmarks.map(p=>p.id),['pond','creek','bank','roots']);
  assert.equal(world.getSurface(0,0).type,'lily');
  assert.ok(world.getTerrainHeight(0,0)<-2,'spawn is above a real water basin');
  assert.equal(world.getSurface(world.creekNest.x,world.creekNest.z).type,'land');
  for(const landmark of world.creekLandmarks){
    assert.ok(Math.hypot(landmark.x,landmark.z)<40,'first-area discoveries are within a connected small area');
    assert.ok(Number.isFinite(world.sampleHeight(landmark.findPoint.x,landmark.findPoint.z)));
  }
  assert.ok(world.group.getObjectByName('Passable willow root arch'));
  assert.equal(world.createBuildingPreview('shelter'),null);
});

test('low water reveals the actual root-passage floor and high water floods it without replacing terrain',t=>{
  const world=makeWorld(t),roots=world.creekLandmarks.find(p=>p.id==='roots'),bed=world.getTerrainHeight(roots.x,roots.z),terrainUpdates=world.renderStats.terrainUpdates;
  assert.equal(world.getSurface(roots.x,roots.z).type,'water');
  world.setCreekState({phase:phase(-.38,.3,'roots')});advance(world,.1);
  assert.equal(world.water.position.y,world.waterLevel);
  assert.ok(Math.abs(world.waterLevel-(CREEK_WATER_BASE-.38))<1e-8);
  assert.equal(world.getSurface(roots.x,roots.z).type,'land');
  assert.equal(world.sampleHeight(roots.x,roots.z),bed);
  world.setCreekState({phase:phase(.28,1.15,'bank')});advance(world);
  assert.ok(Math.abs(world.waterLevel-(CREEK_WATER_BASE+.28))<1e-6);
  assert.equal(world.getSurface(roots.x,roots.z).type,'water');
  assert.ok(Math.abs(world.sampleHeight(roots.x,roots.z)-(world.waterLevel-.215))<1e-8);
  assert.equal(world.getTerrainHeight(roots.x,roots.z),bed);
  assert.equal(world.renderStats.terrainUpdates,terrainUpdates,'ecological state must not terraform or rebuild the land');
  const lily=world.platforms.find(p=>p.type==='lily');
  assert.ok(Math.abs(lily.y-(.105+world.waterLevel-CREEK_WATER_BASE))<1e-8,'floating support follows the same water surface');
});

test('currents rotate with the creek and act only on actual open water',t=>{
  const world=makeWorld(t);world.setCreekState({phase:phase(0,.4)});
  let wet;
  for(let z=-36;z<-25&&!wet;z++)for(let x=-3;x<8;x++)if(world.getSurface(x,z).type==='water'&&world.getTerrainHeight(x,z)<-1){wet={x,z};break;}
  assert.ok(wet,'the creek retains an open swimming corridor');
  const mild=world.currentAt(wet.x,wet.z);assert.ok(mild.strength>0);
  world.setCreekState({phase:phase(0,1.1)});const fast=world.currentAt(wet.x,wet.z);
  assert.ok(fast.strength>mild.strength*2);
  assert.deepEqual(world.currentAt(world.creekNest.x,world.creekNest.z),{x:0,z:0,strength:0});
  const layout=createRegionLayout(5),point=layout.toWorld(0,-32),current=creekCurrent(layout,point.x,point.z,1),base=creekCurrent(createRegionLayout(0),0,-32,1),expected=layout.toWorld(base.x,base.z);
  assert.ok(Math.abs(current.x-expected.x)<1e-8&&Math.abs(current.z-expected.z)<1e-8);
});

test('food migrations alter ecological activity without refilling harvested supplies',t=>{
  const world=makeWorld(t),pond=world.hotspots.find(s=>s.ecology.habitat==='pond'),roots=world.hotspots.find(s=>s.ecology.habitat==='roots');
  assert.ok(pond&&roots);pond.flies=7;roots.flies=11;
  world.setCreekState({phase:phase(-.38,.3,'roots')});
  assert.ok(roots.regenMultiplier>pond.regenMultiplier);
  assert.equal(pond.flies,7);assert.equal(roots.flies,11);
  world.setCreekState({phase:phase(0,.45,'pond')});
  assert.ok(pond.regenMultiplier>roots.regenMultiplier);
  assert.equal(pond.flies,7);assert.equal(roots.flies,11,'revisiting a phase cannot recreate harvested food');
});

test('natural territories and nest visuals have neither castle collisions nor construction geometry',t=>{
  const world=makeWorld(t),site=world.creekTerritories[0],camp=initializeFort({...site,natural:true,team:'enemy0',hp:350,maxHp:350,gateHp:500,tier:2});
  const terrainUpdates=world.renderStats.terrainUpdates;camp.mesh=world.createShelter(camp);
  assert.equal(camp.mesh.userData.natural,true);assert.equal(camp.mesh.userData.gate,undefined);assert.equal(camp.mesh.userData.banner,undefined);
  assert.equal(camp.gateHp,0);assert.equal(fortConstructionState(camp).wallHeight,0);
  assert.equal(world.renderStats.terrainUpdates,terrainUpdates,'natural shelters never flatten land for foundations');
  const actor={x:camp.x+FORT_RADIUS+3,z:camp.z,y:world.sampleHeight(camp.x, camp.z),team:'player'},target={x:camp.x-FORT_RADIUS-3,z:camp.z};
  assert.deepEqual(resolveFortMovement([camp],actor,target),{...target,blocked:false});
  assert.equal(fortLineClear([camp],actor,target),true);
  assert.deepEqual(fortWaypoint([camp],actor,target),target);
  assert.equal(canPassGate(camp,actor),true);
  assert.deepEqual(gatePoint(camp),{x:camp.x,z:camp.z});
  world.setCreekState({phase:phase(),nest:{...world.creekNest,level:0,safe:true}});
  const nest=world.group.getObjectByName('Natural refuge living-creek-nest');assert.ok(nest);
  assert.equal(nest.userData.growth.filter(g=>g.visible).length,1);
  world.setCreekState({phase:phase(),nest:{...world.creekNest,level:3,safe:true}});
  assert.equal(nest.userData.growth.filter(g=>g.visible).length,4);
  advance(world,.1);
  world.removeShelter(camp.mesh);
});

test('grip targets are attached to standable rocks and camouflage matches visible reed pockets',t=>{
  const world=makeWorld(t);
  assert.ok(world.creekGrips.length>=4);
  for(const grip of world.creekGrips){
    const surface=world.getSurface(grip.x,grip.z);
    assert.equal(surface.type,'rock');
    assert.ok(Math.abs(surface.height+.13-grip.y)<1e-7);
  }
  const reeds=world.group.getObjectByName('Dense camouflage reed pockets');assert.ok(reeds?.isInstancedMesh&&reeds.count>200);
  for(const cover of world.creekCover)assert.equal(world.isCreekCover(cover.x,cover.z),true);
  assert.equal(world.isCreekCover(0,0),false);
  assert.equal(world.isCreekCover(80,80),false);
});

test('finds and recoverable losses use persistent natural objects and disappear only when their snapshot removes them',t=>{
  const world=makeWorld(t),discovery={id:'bank-find',x:30,z:6,kind:'find',visible:true},drop={id:'lost-1',x:6,z:7,food:0,findsCount:1,keepsakesCount:1};
  world.setCreekState({phase:phase(),finds:[discovery],dropped:[drop]});
  const natural=world.group.getObjectByName('Natural creek discoveries'),find=natural.getObjectByName('Natural discovery'),lost=natural.getObjectByName('Lost food and natural keepsakes');
  assert.ok(find&&lost);
  world.setCreekState({phase:phase(.28,1.15,'bank'),finds:[{...discovery,collected:true}],dropped:[drop]});advance(world);
  assert.equal(find.parent,null);
  assert.equal(lost.parent,natural,'important finds remain visible after the food has gone');
  assert.ok(lost.position.y>world.waterLevel,'loss marker remains reachable on the changing surface');
  world.setCreekState({phase:phase(),finds:[],dropped:[]});assert.equal(lost.parent,null);
});

test('procedural regions transform physical focus locations together and regenerate deterministically',t=>{
  const world=makeWorld(t,5),again=makeWorld(t,5),layout=createRegionLayout(5),expected=createCreekGeography(layout);
  assert.deepEqual(world.creekLandmarks,expected.landmarks);
  assert.deepEqual(world.creekLandmarks,again.creekLandmarks);
  assert.deepEqual(world.creekGrips,again.creekGrips);
  assert.notDeepEqual(world.creekLandmarks,createCreekGeography(createRegionLayout(0)).landmarks);
  for(const site of world.creekTerritories)assert.equal(world.getSurface(site.x,site.z).type,'land');
  const roots=world.creekLandmarks.find(p=>p.id==='roots');
  world.setCreekState({phase:phase(-.38,.3,'roots')});advance(world,.1);
  assert.equal(world.getSurface(roots.x,roots.z).type,'land');
});

test('actual diving frog and shoulder camera see through natural water instead of a nearly opaque surface',t=>{
  const world=makeWorld(t),model=createCreature('frog',{team:'player',role:'hunter'});t.after(()=>model.dispose());
  let wet;
  for(let z=-10;z<10&&!wet;z++)for(let x=-9;x<9;x++)if(world.getSurface(x,z).type==='water'&&world.getTerrainHeight(x,z)<-2){wet={x,z};break;}
  assert.ok(wet);
  const player={...wet,y:world.sampleHeight(wet.x,wet.z),model,travelWish:{vx:0,vz:0},breath:100};
  const game={creekMode:true,world,player,creekAbilityModifiers:()=>({dive:true}),input:{down:key=>key==='ControlLeft',setMode(){},dx:0,dy:0,zoomDelta:0},started:true,paused:false,ui:{isBlocking:()=>false},settings:{sensitivity:1},camera:new THREE.PerspectiveCamera(63,16/9,.1,620),cameraYaw:.28,cameraPitch:.38,cameraDistance:12.2,cameraFocus:new THREE.Vector3(),cameraWanted:new THREE.Vector3(),viewMode:'third',camps:[]};
  Object.assign(game,creekMovementMethods);
  const alpha=world.water.material.uniforms.alpha;
  assert.equal(alpha.value,.91);
  for(let i=0;i<100;i++){
    game.moveCreekDiver(player,1/60);
    world.update(1/60,i/60,1,new THREE.Vector3(player.x,player.y,player.z));
  }
  assert.equal(player.diving,true);
  model.group.position.set(player.x,player.y,player.z);model.update(0,{swimming:true});model.group.updateMatrixWorld(true);model.skeleton.update();
  updateGameCamera(game,0,true);
  world.group.updateMatrixWorld(true);
  const bodyCentre=new THREE.Box3().setFromObject(model.mesh).getCenter(new THREE.Vector3()),direction=bodyCentre.clone().sub(game.camera.position).normalize();
  const screen=bodyCentre.clone().project(game.camera);
  assert.ok(Math.abs(screen.x)<.9&&Math.abs(screen.y)<.9&&screen.z>-1&&screen.z<1,'the submerged frog remains within the actual shoulder-camera view');
  const ray=new THREE.Raycaster(game.camera.position,direction,0,20),waterHits=ray.intersectObject(world.water),frogHits=ray.intersectObject(model.mesh);
  assert.ok(game.camera.position.y>world.waterLevel,'third-person camera is above the actual water');
  assert.ok(waterHits.length&&frogHits.length,'the camera ray crosses actual water and skinned frog geometry');
  assert.ok(waterHits[0].distance<frogHits[0].distance,'water lies in front of the submerged frog');
  assert.ok(alpha.value<.31,'the real Water shader must transmit most of the submerged view');
  assert.equal(world.water.material.transparent,true);assert.equal(world.water.material.depthWrite,false);
  const surfaced=new THREE.Vector3(player.x,world.waterLevel-.215,player.z);
  for(let i=0;i<90;i++)world.update(1/60,2+i/60,1,surfaced);
  assert.ok(alpha.value>.9,'surfacing restores the original reflected appearance');
});

test('diving clarity is restricted to natural worlds and safely accepts missing observer positions',t=>{
  const world=makeWorld(t,0,false),alpha=world.water.material.uniforms.alpha;
  for(let i=0;i<30;i++)world.update(.05,i*.05,1,new THREE.Vector3(0,-2,0));
  assert.equal(alpha.value,.91,'legacy water does not change');
  const natural=makeWorld(t);natural.update(.016,1,1);
  assert.equal(natural.water.material.uniforms.alpha.value,.91);
});

test('natural refuges are real opaque cavities at the home, rival territory and neutral creek hiding places',t=>{
  const world=makeWorld(t);
  assert.deepEqual(world.creekRefuges.map(r=>r.id),['willow-crevice','bank-crevice']);
  world.setCreekState({phase:phase(),nest:{...world.creekNest,level:0,safe:true}});
  const camp=world.createShelter({...world.creekTerritories[0],id:'test-rival-hollow',team:'enemy0',natural:true});
  assert.equal(world.creekRefuges.length,4);
  world.group.updateMatrixWorld(true);
  for(const r of world.creekRefuges){
    const interior={...refugeInteriorPoint(r),team:'player'},roof=r.mesh.getObjectByName('Refuge solid · roof'),shell=r.mesh.userData.refugeSolids;
    assert.equal(refugeAt(world.creekRefuges,interior),r);assert.equal(world.getSurface(interior.x,interior.z).height,r.floorY);
    assert.ok(roof&&shell&&r.mesh.userData.refugeRoof);assert.equal(roof.material.transparent,false);assert.equal(roof.material.depthWrite,true);
    const down=new THREE.Raycaster(new THREE.Vector3(interior.x,r.roofTop+3,interior.z),new THREE.Vector3(0,-1,0));
    const hits=down.intersectObject(roof);assert.ok(hits.length,'the rendered roof must actually cover the rear chamber');
    assert.ok(Math.abs(hits[0].point.y-r.roofTop)<1e-5);
    assert.equal(refugeLineClear([r],{x:interior.x,z:interior.z,y:r.roofTop+3},interior,{fromHeight:0,toHeight:.5}),false);
    const outside=refugeWorld(r,{x:-7,y:r.floorY+.5,z:-1.2}),inside=refugeWorld(r,{x:.75,y:r.floorY+.5,z:-1.2}),direction=new THREE.Vector3(inside.x-outside.x,0,inside.z-outside.z).normalize(),sideRay=new THREE.Raycaster(new THREE.Vector3(outside.x,outside.y,outside.z),direction,0,10);
    assert.ok(sideRay.intersectObject(shell,true).some(h=>h.object.userData.refugeSolid?.id==='left-wall'),'visible wall matches the occluder');
    const mouth=refugeWorld(r,{x:1.55,z:4.6,y:r.floorY+.5}),justInside=refugeWorld(r,{x:1.55,z:3.65,y:r.floorY+.5}),doorRay=new THREE.Raycaster(new THREE.Vector3(mouth.x,mouth.y,mouth.z),new THREE.Vector3(justInside.x-mouth.x,0,justInside.z-mouth.z).normalize(),0,.9);
    assert.equal(doorRay.intersectObject(shell,true).filter(h=>h.object.userData.refugeSolid).length,0,'the visible entrance is actually open at frog height');
    r.mesh.userData.refugeRoof.visible=false;assert.equal(refugeLineClear([r],{x:interior.x,z:interior.z,y:r.roofTop+3},interior,{fromHeight:0,toHeight:.5}),false,'camera cutaway never removes gameplay cover');r.mesh.userData.refugeRoof.visible=true;
  }
  const rival=camp.userData.refuge;world.removeShelter(camp);assert.equal(world.creekRefuges.includes(rival),false);assert.equal(rival.active,false);
});

test('old submerged shelter sites receive rendered dry flooring and a terrain-joined ledge, with sampled support matching the mesh',t=>{
  const world=makeWorld(t),shelter=world.createShelter({id:'migrated-wet-refuge',x:0,z:-8,yaw:0,team:'ally',natural:true}),r=shelter.userData.refuge;
  world.group.updateMatrixWorld(true);
  assert.ok(r.floorY>.615);assert.ok(world.getTerrainHeight(r.x,r.z)<-1);
  const ramp=shelter.getObjectByName('Terrain-joined natural refuge ledge');assert.ok(ramp);
  for(let i=1;i<12;i++){
    const local={x:r.entrance.x+(i%3-1)*.25,z:r.ramp.minZ+(r.ramp.maxZ-r.ramp.minZ)*i/12},p=refugeWorld(r,local),support=refugeSurface([r],p.x,p.z),ray=new THREE.Raycaster(new THREE.Vector3(p.x,r.floorY+12,p.z),new THREE.Vector3(0,-1,0));
    const hit=ray.intersectObject(ramp)[0];assert.ok(hit);assert.ok(Math.abs(hit.point.y-support.height)<1e-5,'ramp triangle and collision sampler agree');
  }
  const end=refugeEntrancePoint(r,r.ramp.maxZ-r.entrance.z);assert.ok(Math.abs(end.y-world.getTerrainHeight(end.x,end.z))<.025,'the outer edge meets actual terrain');
  const inside=refugeInteriorPoint(r);assert.equal(world.getSurface(inside.x,inside.z).height,r.floorY,'an occupant is supported by the cavity floor, not projected onto the roof');
  world.setCreekState({phase:phase(.65,1.2,'bank')});advance(world);assert.equal(world.getSurface(inside.x,inside.z).type,'land');
});
