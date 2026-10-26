import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {BASES,resolveWallMove} from '../src/arcade-bases.js';
import {ArcadeBasesView} from '../src/arcade-bases-view.js';
import {cameraPose} from '../src/arcade-view-math.js';

function fixture(){
  const game={scene:new THREE.Scene(),ground:()=>.2,running:true,camera:new THREE.PerspectiveCamera(),state:{actors:[{...BASES[0].spawn}],bases:BASES.map(base=>({...base,destroyed:false,progress:0,attackerId:null}))}};
  const view=new ArcadeBasesView(game);return {game,view};
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
  const {game,view}=fixture();Object.assign(game.state.actors[0],{x:0,z:7});
  game.camera.position.set(0,2,18);view.update(0);
  const yard=view.enclosures.get('yard-player');assert.equal(yard.faded,true);assert.equal(yard.woodMaterial.opacity,.2);
  assert.equal(view.enclosures.get('base-rival-2').woodMaterial.opacity,1);
  game.camera.position.set(0,5,-3);for(let i=0;i<30;i++)view.update(.05);
  assert.equal(yard.faded,false);assert.ok(yard.woodMaterial.opacity>.99);assert.equal(yard.woodMaterial.depthWrite,true);
  view.dispose();
});
