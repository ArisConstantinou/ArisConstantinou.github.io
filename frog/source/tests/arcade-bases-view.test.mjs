import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {BASES,CATAPULT_SITES,resolveWallMove,createHouseFloors,houseFloorAt} from '../src/arcade-bases.js';
import {ArcadeBasesView} from '../src/arcade-bases-view.js';
import {cameraPose} from '../src/arcade-view-math.js';

function fixture(){
  const game={scene:new THREE.Scene(),ground:()=>.2,running:true,camera:new THREE.PerspectiveCamera(),state:{actors:[{...BASES[0].spawn}],bases:BASES.map(base=>({...base,destroyed:false,progress:0,attackerId:null}))}};
  const view=new ArcadeBasesView(game);return {game,view};
}

function aimCamera(game,position,target){
  game.camera.position.fromArray(position);game.camera.lookAt(new THREE.Vector3(...target));game.camera.updateMatrixWorld(true);game.scene.updateMatrixWorld(true);
}

function roofHits(game,visual,target){
  const end=new THREE.Vector3(...target),direction=end.clone().sub(game.camera.position);
  return new THREE.Raycaster(game.camera.position,direction.clone().normalize(),0,direction.length()).intersectObject(visual.roof);
}

test('storage progress is shown in the scene and destroyed stores lose their supply',()=>{
  const {game,view}=fixture(),storage=game.state.bases[1],visual=view.bases.get(storage.id);
  storage.progress=5;storage.attackerId='player';view.update(.1);
  assert.equal(visual.bar.visible,true);assert.equal(visual.fill.scale.x,1.06);
  assert.equal(visual.supply.visible,true);assert.equal(visual.ruins.visible,false);
  storage.destroyed=true;storage.progress=10;view.update(.1);
  assert.equal(visual.bar.visible,false);assert.equal(visual.cabin.visible,false);assert.equal(visual.supply.visible,false);assert.equal(visual.ruins.visible,true);
  view.dispose();
});

test('nearby shelter roofs fade so the spawning frog remains readable',()=>{
  const {view}=fixture();for(let i=0;i<20;i++)view.update(.05);
  assert.ok(view.bases.get('base-player').roofMaterial.opacity<.4);
  assert.ok(view.bases.get('base-rival-1').roofMaterial.opacity>.9);
  view.dispose();
});

test('reserve animation freezes on pause and the scene can be released without leftover meshes',()=>{
  const {game,view}=fixture();view.update(.1);game.running=false;const clock=view.clock;
  view.update(.1);assert.equal(view.clock,clock);
  const mesh=view.bases.get('base-player').flyBodies;assert.equal(mesh.isInstancedMesh,true);assert.equal(mesh.count,8);
  view.dispose();assert.equal(game.scene.children.length,0);
});

test('the rear spawn wall reveals the frog on the first frame without changing physical collision',()=>{
  const {game,view}=fixture(),player=game.state.actors[0];
  game.camera.position.fromArray(cameraPose(player,.2,1.6,'chase3d').position);view.update(0);
  const home=view.enclosures.get('base-player'),other=view.enclosures.get('base-rival-1');
  assert.equal(home.faded,true);assert.equal(home.woodMaterial.opacity,.2);assert.equal(home.capMaterial.opacity,.2);assert.equal(home.woodMaterial.depthWrite,false);
  assert.equal(other.woodMaterial.opacity,1);
  const blocked=resolveWallMove(player,20,0);assert.ok(blocked.x<2.2,'faded wall still stops physical movement');
  view.dispose();
});

test('a wall blocking the camera outside an enclosure fades locally and recovers after the view clears',()=>{
  const {game,view}=fixture(),station=CATAPULT_SITES[0];Object.assign(game.state.actors[0],{x:station.x,z:station.z-5});
  game.camera.position.set(station.x,2,station.z+6);view.update(0);
  const yard=view.enclosures.get('yard-player');assert.equal(yard.faded,true);assert.equal(yard.woodMaterial.opacity,.2);
  assert.equal(view.enclosures.get('base-rival-2').woodMaterial.opacity,1);
  game.camera.position.set(station.x,5,station.z-15);for(let i=0;i<30;i++)view.update(.05);
  assert.equal(yard.faded,false);assert.ok(yard.woodMaterial.opacity>.99);assert.equal(yard.woodMaterial.depthWrite,true);
  view.dispose();
});

test('all three actual roofs cover the full spawn body and decks use the same height as the frog',()=>{
  const natural=(x,z)=>Math.sin(x*.1)*.3+z*.03,houseFloors=createHouseFloors(natural);
  const game={scene:new THREE.Scene(),houseFloors,ground:(x,z)=>houseFloorAt(x,z,houseFloors)??natural(x,z),running:true,camera:new THREE.PerspectiveCamera(),state:{actors:[{...BASES[0].spawn}],bases:BASES.map(base=>({...base,destroyed:false,progress:0}))}};
  const view=new ArcadeBasesView(game);game.scene.updateMatrixWorld(true);
  for(const base of BASES){
    const visual=view.bases.get(base.id),floorY=game.ground(base.spawn.x,base.spawn.z),deckBounds=new THREE.Box3().setFromObject(visual.deck);
    assert.ok(Math.abs(deckBounds.max.y-floorY)<1e-7);
    for(const dx of [-.78,0,.78])for(const dz of [-.78,0,.78]){
      const ray=new THREE.Raycaster(new THREE.Vector3(base.spawn.x+dx,floorY+9,base.spawn.z+dz),new THREE.Vector3(0,-1,0));
      const hits=ray.intersectObject(visual.roof);assert.ok(hits.length,'the whole frog must start beneath the real roof');
      assert.ok(hits[0].point.y-floorY>2.6,'spawn must have room above the whole loaded frog');
    }
    assert.ok(visual.ramp,'a raised house floor needs a real visible entry ramp');
  }
  view.update(0);assert.equal(view.bases.get('base-player').roofMaterial.opacity,0,'whole-house roof reveals interior on the first frame');
  assert.equal(view.bases.get('base-player').roof.visible,false,'an obstructing roof leaves no haze over the action');
  view.dispose();
});

test('portrait camera removes the house roof after the frog exits toward its catapult even when every wall ray is clear',()=>{
  const {game,view}=fixture(),player=game.state.actors[0],visual=view.bases.get('base-player');
  Object.assign(player,{x:0,z:14,height:0,load:1});
  const pose=cameraPose(player,.2,393/680,'chase3d',{yaw:Math.PI,pitch:.44});game.camera.aspect=393/680;game.camera.fov=52;
  aimCamera(game,pose.position,pose.look);
  assert.ok(roofHits(game,visual,[0,1.1,14]).length,'the actual roof blocks the camera in the reported iPhone position');
  assert.ok(Math.hypot(player.x-BASES[0].stock.x,player.z-BASES[0].stock.z)>5.2);
  view.update(0);
  assert.equal(view.enclosures.get('base-player').faded,false,'lower wall boxes miss the roof obstruction');
  assert.equal(visual.roofObstructed,true);assert.equal(visual.roof.visible,false);assert.equal(visual.roofMaterial.opacity,0);
  assert.equal(visual.roofStem.visible,false);assert.equal(visual.roofLeaf.visible,false);
  assert.equal(view.bases.get('base-rival-1').roof.visible,true);assert.equal(view.bases.get('base-rival-2').roof.visible,true);
  view.dispose();
});

test('every house cuts away for outside camera angles and restores only after exit into a clear view',()=>{
  const {game,view}=fixture(),player=game.state.actors[0];
  for(const base of BASES)for(let angle=0;angle<Math.PI*2;angle+=Math.PI/4){
    const dx=Math.sin(angle),dz=Math.cos(angle),visual=view.bases.get(base.id);
    Object.assign(player,{x:base.x+dx*8,z:base.z+dz*8,height:0,load:1});
    aimCamera(game,[base.x-dx*8,7.2,base.z-dz*8],[player.x,1,player.z]);
    assert.ok(roofHits(game,visual,[player.x,1,player.z]).length,`${base.id} needs a real roof hit at angle ${angle}`);
    view.update(0);assert.equal(visual.roof.visible,false);assert.equal(visual.roofObstructed,true);
    // The roof is now behind the frog; the same infinite ray must not keep it hidden.
    aimCamera(game,[player.x+dx*6,7.2,player.z+dz*6],[player.x,1,player.z]);
    assert.equal(roofHits(game,visual,[player.x,1,player.z]).length,0);
    view.update(.016);assert.equal(visual.roofObstructed,false);assert.equal(visual.roof.visible,false,'brief clear frames should not flicker the roof');
    for(let i=0;i<24;i++)view.update(.05);
    assert.equal(visual.roof.visible,true);assert.ok(visual.roofMaterial.opacity>.99);
    Object.assign(player,base.spawn);aimCamera(game,[base.x,7.2,base.z+8],[player.x,1,player.z]);
    view.update(0);assert.equal(visual.roof.visible,false,'reentry is visible immediately even after full roof restoration');
  }
  view.dispose();
});

test('a roof crossing one side of a loaded frog is removed even when the central body ray misses',()=>{
  const {game,view}=fixture(),player=game.state.actors[0],visual=view.bases.get('base-player');
  Object.assign(player,{x:0,z:14,height:0,load:1});aimCamera(game,[6.7,10,27.735],[0,1.25,14]);
  assert.equal(roofHits(game,visual,[0,1.25,14]).length,0);
  assert.ok(roofHits(game,visual,[-1.31,1.25,14]).length,'the edge of the actual roof overlaps the body width');
  view.update(0);assert.equal(visual.roofObstructed,true);assert.equal(visual.roof.visible,false);
  view.dispose();
});

test('a roof crossing the camera near plane is removed even when the frog is on its clear side',()=>{
  const {game,view}=fixture(),player=game.state.actors[0],visual=view.bases.get('base-player');
  Object.assign(player,{x:8,z:20.5,height:0,load:1});aimCamera(game,[3.52,2.92,20.5],[8,1.25,20.5]);
  assert.equal(roofHits(game,visual,[8,1.25,20.5]).length,0);
  view.update(0);assert.equal(visual.roofObstructed,true);assert.equal(visual.roof.visible,false);
  view.dispose();
});

test('the storage basket reveals the whole frog immediately at every default home spawn',()=>{
  const {game,view}=fixture(),player=game.state.actors[0];
  for(const base of BASES)for(const aspect of [430/745,745/430,1.6]){
    Object.assign(player,{...base.spawn,height:0,load:1});game.camera.aspect=aspect;game.camera.fov=52;
    const pose=cameraPose(player,.2,aspect,'chase3d',{yaw:base.spawnHeading});aimCamera(game,pose.position,pose.look);
    const visual=view.bases.get(base.id),before=visual.stockMeshes.map(mesh=>({position:mesh.position.clone(),scale:mesh.scale.clone()}));
    view.update(0);
    assert.equal(visual.stockObstructed,true,`${base.id} basket obstructs the default spawn at aspect ${aspect}`);
    for(const [index,mesh] of visual.stockMeshes.entries()){
      assert.equal(mesh.material.opacity,.18);assert.equal(mesh.material.depthWrite,false);
      assert.deepEqual(mesh.position,before[index].position);assert.deepEqual(mesh.scale,before[index].scale,'cutaway never changes basket geometry');
    }
    assert.equal(visual.supply.visible,true,'the fly reserve remains visible');
    assert.equal(visual.flyBodies.material.opacity,1,'the fly bodies do not share the basket fade');
    assert.equal(visual.flyWings.material.opacity,.85,'the wings keep their normal transparency');
    assert.equal(visual.marker.visible,true);assert.equal(visual.markerMaterial.opacity,.28,'the objective ring remains legible');
  }
  assert.equal(view.materials.wood.opacity,1);assert.equal(view.materials.darkWood.opacity,1);
  view.dispose();
});

test('basket occlusion is local, restores smoothly in a clear view, and ignores stock behind the frog',()=>{
  const {game,view}=fixture(),player=game.state.actors[0],base=BASES[0],visual=view.bases.get(base.id);
  Object.assign(player,{...base.spawn,height:0,load:1});
  const pose=cameraPose(player,.2,1.6,'chase3d',{yaw:base.spawnHeading});aimCamera(game,pose.position,pose.look);view.update(0);
  assert.equal(visual.stockObstructed,true);
  for(const other of BASES.slice(1))for(const material of view.bases.get(other.id).stockMaterials)assert.equal(material.opacity,1,'unrelated baskets retain normal materials');
  assert.notEqual(visual.stockMaterials[0],view.materials.wood);assert.notEqual(visual.stockMaterials[1],view.materials.darkWood);
  assert.notEqual(visual.stockMaterials[2],visual.roofStem.material,'the owner-color roof marker keeps its own material');
  aimCamera(game,[player.x,1.4,player.z-6],[player.x,1,player.z]);view.update(.016);
  assert.equal(visual.stockObstructed,false,'a basket beyond the player is not an obstruction');
  assert.ok(visual.stockMaterials[0].opacity>.18&&visual.stockMaterials[0].opacity<1,'clear views restore gradually');
  assert.equal(visual.stockMaterials[0].depthWrite,false,'the recovering transparent basket does not hide the frog');
  for(let frame=0;frame<20;frame++)view.update(.05);
  for(const material of visual.stockMaterials){assert.equal(material.opacity,1);assert.equal(material.depthWrite,true);}
  view.dispose();
});

test('a basket entering the camera near plane fades and cached bounds include the storage shake',()=>{
  const {game,view}=fixture(),player=game.state.actors[0],base=BASES[0],visual=view.bases.get(base.id);
  Object.assign(player,{x:base.stock.x+5,z:base.stock.z,height:0,load:1});
  aimCamera(game,[base.stock.x+.8,.7,base.stock.z],[player.x,1,player.z]);view.update(0);
  assert.equal(visual.stockObstructed,true,'nearby basket faces cannot fill the screen even on the clear side of the player');
  for(const displacement of [-.025,.025]){
    visual.cabin.position.x=displacement;visual.cabin.updateWorldMatrix(true,true);
    for(const mesh of visual.stockMeshes)assert.ok(visual.stockBounds.containsBox(new THREE.Box3().setFromObject(mesh)),'precomputed stock bounds contain the full animated basket');
  }
  game.state.bases[0].destroyed=true;view.update(0);
  assert.equal(visual.stockObstructed,false);assert.equal(visual.cabin.visible,false);
  view.dispose();
});
