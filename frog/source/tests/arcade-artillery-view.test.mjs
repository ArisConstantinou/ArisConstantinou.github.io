import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {CATAPULT_SITES,CATAPULT_ENCLOSURES,createHouseFloors,createCatapultFloors,houseFloorAt} from '../src/arcade-bases.js';
import {createCatapults} from '../src/arcade-artillery.js';
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
