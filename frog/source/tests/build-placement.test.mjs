import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {fixture,camp} from './game-fixture.mjs';
import {BUILDINGS} from '../src/rules.js';
import {SHELTER_LAYOUT_SCALE} from '../src/world-config.js';

function setup(yaw=0){
  const {game,player}=fixture(),base=camp({team:'ally',x:0,z:0,yaw,mesh:new THREE.Group()});
  base.mesh.position.y=.35;game.camps.push(base);
  const events=[];game.world.createBuildingPreview=type=>{events.push(['create',type]);return new THREE.Group();};
  game.world.setBuildingPreview=(ghost,state)=>events.push(['preview',{...state}]);
  game.world.removeBuildingPreview=ghost=>events.push(['remove',ghost]);
  game.world.showBuildArea=base=>events.push(['area',base]);game.world.hideBuildArea=()=>events.push(['hide']);
  return {game,player,base,events};
}
function position(game,x,z,yaw=0){Object.assign(game.buildPlacement,{x:x*SHELTER_LAYOUT_SCALE,z:z*SHELTER_LAYOUT_SCALE,yaw,hasPoint:true});game.updateBuildingPlacement();}
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} differs from ${b}`);
function cameraFor(game,mode,target){
  game.cameraMode=mode;game.camera=new THREE.PerspectiveCamera(55,1.5,.1,300);
  if(mode==='first')game.camera.position.set(target.x+1,2,target.z+4);
  else if(mode==='third')game.camera.position.set(target.x+4,9,target.z+11);
  else game.camera.position.set(target.x,30,target.z+.01);
  game.camera.lookAt(target.x,.35,target.z);game.camera.updateMatrixWorld(true);
  game.renderer={domElement:{getBoundingClientRect:()=>({left:30,top:20,width:900,height:600})}};
  return {clientX:480,clientY:320};
}

test('clicking a building opens only a preview, and Escape cancels without spending',()=>{
  const {game,base,events}=setup(),before={...game.resources};
  game.onAction('build',{type:'store'});
  assert.equal(game.buildPlacement.type,'store');assert.equal(game.input.buildingMode,true);
  assert.deepEqual(game.resources,before);assert.equal(base.buildings.store,undefined);
  assert.ok(events.some(([type])=>type==='create'));assert.ok(events.some(([type])=>type==='area'));
  game.escape();assert.equal(game.buildPlacement,null);assert.equal(game.input.buildingMode,false);
  assert.deepEqual(game.resources,before);assert.ok(events.some(([type])=>type==='remove'));
});
test('invalid core overlap paints red and cannot spend or create a building',()=>{
  const {game,base,events}=setup(),before={...game.resources};game.build('store');position(game,0,0);
  assert.equal(game.buildPlacement.valid,false);assert.equal(events.at(-1)[1].valid,false);
  assert.equal(game.confirmBuildingPlacement(),false);assert.deepEqual(game.resources,before);assert.deepEqual(base.buildings,{});
});
test('rotation rechecks the complete footprint before a purchase',()=>{
  const {game,events}=setup();game.build('store');position(game,0,9.8);
  assert.equal(game.buildPlacement.valid,true);
  for(let i=0;i<6;i++)game.rotateBuildingPlacement(1);
  near(game.buildPlacement.yaw,Math.PI/2);assert.equal(game.buildPlacement.valid,false);
  assert.equal(events.at(-1)[1].valid,false);assert.equal(game.confirmBuildingPlacement(),false);
  for(let i=0;i<6;i++)game.rotateBuildingPlacement(-1);
  assert.equal(game.buildPlacement.valid,true);assert.equal(game.confirmBuildingPlacement(),true);
});
test('valid confirmation charges the exact displayed cost once and persists the chosen coordinates',()=>{
  const {game,base}=setup(),before={...game.resources};game.build('store');position(game,-6.5,6);
  assert.equal(game.confirmBuildingPlacement(),true);assert.equal(base.buildings.store,true);
  assert.deepEqual(base.buildingPlacements.store,{x:-6.5*SHELTER_LAYOUT_SCALE,z:6*SHELTER_LAYOUT_SCALE,yaw:0});
  assert.deepEqual(game.resources,{food:before.food-BUILDINGS.store.cost.food,reeds:before.reeds-BUILDINGS.store.cost.reeds});
  const paid={...game.resources};assert.equal(game.confirmBuildingPlacement(),false);assert.deepEqual(game.resources,paid);
  assert.equal(game.buildPlacement,null);assert.equal(game.input.buildingMode,false);
});
test('confirmation rechecks resources and ownership after the preview was valid',()=>{
  for(const invalidate of [game=>{game.resources.food=0;game.resources.reeds=0;},game=>{game.camps[0].destroyed=true;},game=>{game.camps[0].team='enemy1';}]){
    const {game,base}=setup();game.build('store');position(game,-6.5,6);assert.equal(game.buildPlacement.valid,true);
    invalidate(game);const before={...game.resources};assert.equal(game.confirmBuildingPlacement(),false);
    assert.deepEqual(game.resources,before);assert.equal(base.buildings.store,undefined);
  }
});
test('native drop uses the cursor ray in all three views and preserves camp-local placement and yaw',()=>{
  for(const mode of ['first','third','topdown']){
    const yaw=Math.PI/3,{game,base}=setup(yaw),local={x:0,z:6*SHELTER_LAYOUT_SCALE},target={x:Math.sin(yaw)*local.z,z:Math.cos(yaw)*local.z};
    const pointer=cameraFor(game,mode,target);game.onAction('begin-placement',{type:'training',dragging:true});
    game.onAction('move-placement',{...pointer,dragging:true});assert.equal(game.buildPlacement.valid,true,mode);
    game.onAction('drop-placement',pointer);assert.equal(game.buildPlacement,null,mode);assert.equal(base.buildings.training,true);
    near(base.buildingPlacements.training.x,local.x);near(base.buildingPlacements.training.z,local.z);near(base.buildingPlacements.training.yaw,0);
    const after={...game.resources};game.onAction('drop-placement',pointer);assert.deepEqual(game.resources,after);
  }
});
test('canceling a native drag clears placement and input mode without purchasing',()=>{
  const {game,base}=setup(),before={...game.resources};game.onAction('begin-placement',{type:'store',dragging:true});
  game.onAction('cancel-placement');assert.equal(game.buildPlacement,null);assert.equal(game.input.buildingMode,false);
  assert.deepEqual(game.resources,before);assert.equal(base.buildings.store,undefined);
});
test('new shelters also wait for confirmation and retain the selected rotation',()=>{
  const {game}=fixture();game.build('shelter');game.rotateBuildingPlacement(1);game.rotateBuildingPlacement(1);
  assert.equal(game.camps.length,0);assert.equal(game.confirmBuildingPlacement(),true);assert.equal(game.camps.length,1);
  near(game.camps[0].yaw,Math.PI/6);assert.deepEqual(game.resources,{food:88,reeds:70});
});
test('placement blocks competing panels and cleans up when the player dies',()=>{
  const {game,player}=setup();let opened=0;game.ui.showPanel=()=>opened++;game.build('store');game.openPanel('roster');assert.equal(opened,0);
  player.hp=1;game.damage(player,100,{team:'predator',x:1,z:0});assert.equal(player.dead,true);
  assert.equal(game.buildPlacement,null);assert.equal(game.input.buildingMode,false);assert.deepEqual(game.resources,{food:100,reeds:100});
});
