import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {CATAPULT_SITES,CATAPULT_ENCLOSURES,createHouseFloors,createCatapultFloors,houseFloorAt} from '../src/arcade-bases.js';
import {ARTILLERY,createCatapults,stoneTarget,throwStone} from '../src/arcade-artillery.js';
import {ArtilleryView} from '../src/arcade-artillery-view.js';

test('relocated catapults, operator seats, platforms and entry ramps share the same ground height',()=>{
  const natural=(x,z)=>Math.sin(x*.35)*.7+Math.cos(z*.31)*.8;
  const houseFloors=[...createHouseFloors(natural),...createCatapultFloors(natural)];
  const scene=new THREE.Scene(),game={scene,houseFloors,world:{getSurface:(x,z)=>({height:natural(x,z)})},ground:(x,z)=>houseFloorAt(x,z,houseFloors)??natural(x,z),running:true,state:{actors:[{id:'player'}],catapults:createCatapults(),shells:[]}};
  const view=new ArtilleryView(game),point=new THREE.Vector3();scene.updateMatrixWorld(true);
  assert.equal(view.platforms.size,3);
  for(const site of CATAPULT_SITES){
    const platform=view.platforms.get(site.id),machine=view.machines.get(site.id),yard=CATAPULT_ENCLOSURES.find(y=>y.id===site.enclosureId),floor=platform.floor;
    assert.ok(Math.abs(new THREE.Box3().setFromObject(platform.deck,true).max.y-floor.height)<1e-7);
    assert.deepEqual(machine.group.position.toArray(),[site.x,floor.height,site.z]);
    assert.equal(view.operatorPose(site.id).y,game.ground(site.x,site.z)+.45);
    assert.equal(game.ground(yard.gate.x,yard.gate.z),floor.height);
    for(let i=0;i<platform.ramp.geometry.attributes.position.count;i++){
      point.fromBufferAttribute(platform.ramp.geometry.attributes.position,i).applyMatrix4(platform.ramp.matrixWorld);
      assert.ok(Math.abs(point.y-game.ground(point.x,point.z))<2e-6,'the visible ramp matches movement height at every sampled vertex');
      assert.ok(point.y>=natural(point.x,point.z)-2e-6,'the ramp does not sink below natural terrain');
      assert.ok(Math.hypot(point.x,point.z)<24,'the entire entrance stays inside the playable arena');
    }
    for(let angle=0;angle<Math.PI*2;angle+=Math.PI/4){
      machine.turret.rotation.y=angle;machine.group.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(machine.group,true);
      assert.ok(bounds.min.x>yard.x-yard.halfWidth+.17&&bounds.max.x<yard.x+yard.halfWidth-.17);
      assert.ok(bounds.min.z>yard.z-yard.halfDepth+.17&&bounds.max.z<yard.z+yard.halfDepth-.17,'turning the machine does not clip the enclosure');
    }
  }
  view.dispose();assert.equal(scene.children.length,0);
});

function previewFixture(){
  const catapults=createCatapults(),station=catapults[0];
  const player={id:'player',x:station.x,z:station.z,catapultId:station.id,dizzyTime:0,ko:false,hit:0,knockUp:0,catapultShots:0};station.occupant=player.id;
  const target=stoneTarget(station,-station.x,-station.z,.55);
  const game={scene:new THREE.Scene(),ground:(x,z)=>Math.sin(x*.1)*.3+Math.cos(z*.2)*.2,running:true,state:{phase:'battle',actors:[player],catapults,shells:[],events:[],nextId:1},catapultAim:{active:true,target}};
  return {game,player,station,target,view:new ArtilleryView(game)};
}

test('animated trajectory highlights use the launched stone parabola and the landing border keeps the exact blast radius',()=>{
  const {game,player,target,view}=previewFixture();view.update(.1);
  assert.equal(view.previewState,'ready');assert.ok(view.previewPieces.every(piece=>piece.visible));
  const positions=view.previewLine.geometry.attributes.position,first=Array.from(positions.array),matrix=new THREE.Matrix4(),before=new THREE.Vector3();
  view.previewBeads.getMatrixAt(0,matrix);before.setFromMatrixPosition(matrix);
  view.update(.1);view.previewBeads.getMatrixAt(0,matrix);
  assert.ok(before.distanceTo(new THREE.Vector3().setFromMatrixPosition(matrix))>.1,'flow advances while the chosen trajectory stays fixed');
  assert.deepEqual(Array.from(positions.array),first);
  assert.equal(view.landingMarker.scale.x,ARTILLERY.blastRadius);
  assert.ok(view.landingPulse.scale.x>0&&view.landingPulse.scale.x<ARTILLERY.blastRadius,'the animated ring never claims damage outside the true radius');
  assert.equal(view.landingMarker.position.x,target.x);assert.equal(view.landingMarker.position.z,target.z);
  assert.equal(throwStone(game.state,player,target),true);const shell=game.state.shells[0],point=new THREE.Vector3();
  for(let i=0;i<positions.count;i++){
    const expected=view.shellPoint(shell,i/(positions.count-1),point);
    assert.ok(expected.distanceTo(new THREE.Vector3().fromBufferAttribute(positions,i))<2e-6,'dashed line matches the real launch data');
  }
  for(let i=0;i<view.previewBeads.count;i++){
    view.previewBeads.getMatrixAt(i,matrix);const actual=new THREE.Vector3().setFromMatrixPosition(matrix);
    const dx=shell.tx-shell.startX,dz=shell.tz-shell.startZ,t=((actual.x-shell.startX)*dx+(actual.z-shell.startZ)*dz)/(dx*dx+dz*dz);
    assert.ok(actual.distanceTo(view.shellPoint(shell,t,point))<3e-6,'every moving bead is on the real parabola');
  }
  view.dispose();assert.equal(game.scene.children.length,0);
});

test('blocked and reloading previews visibly differ from ready aim without promising a moving shot',()=>{
  const {view,station,target}=previewFixture();view.update(.1);
  const readyColor=view.material.preview.color.getHex(),readyOpacity=view.material.preview.opacity;
  station.loaded=false;station.cooldown=1;view.update(.1);
  assert.equal(view.previewState,'reloading');assert.equal(view.previewBeads.visible,false);
  assert.notEqual(view.material.preview.color.getHex(),readyColor);assert.ok(view.material.preview.opacity<readyOpacity);
  station.loaded=true;station.cooldown=0;target.valid=false;view.update(.1);
  assert.equal(view.previewState,'blocked');assert.equal(view.previewBeads.visible,false);
  assert.ok(view.material.preview.color.r>view.material.preview.color.g,'invalid aim is visibly warm red');
  assert.ok(view.previewLine.visible&&view.landingMarker.visible,'the player can still see why and where the invalid aim would land');
  target.valid=true;view.update(.1);assert.equal(view.previewState,'ready');assert.equal(view.previewBeads.visible,true);
  view.dispose();
});

test('every preview piece clears immediately and stays cleared across pause, resume, unmount and round reset',()=>{
  const {view,game,player,station}=previewFixture();
  const hidden=()=>{assert.ok(view.previewPieces.every(piece=>!piece.visible));assert.equal(view.previewClock,0);assert.equal(view.previewState,null);};
  view.update(.1);view.hidePreview();hidden();
  view.update(.1);game.running=false;view.update(.1);hidden();
  game.running=true;game.catapultAim.active=false;view.update(.1);hidden();
  game.catapultAim.active=true;view.update(.1);player.catapultId=null;view.update(.1);hidden();
  player.catapultId=station.id;view.update(.1);game.state.catapults=createCatapults();view.update(.1);hidden();
  view.dispose();assert.equal(game.scene.children.length,0);
});
