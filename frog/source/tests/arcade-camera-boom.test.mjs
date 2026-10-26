import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3} from 'three';
import {cameraPose,resolveCameraBoom,CAMERA_ORBIT} from '../src/arcade-view-math.js';
import {CAMERA_LOOK} from '../src/arcade-camera-look.js';
import {BASES,createHouseFloors,houseFloorAt} from '../src/arcade-bases.js';

const length=pose=>Math.hypot(...pose.position.map((value,i)=>value-pose.look[i]));
const direction=pose=>new Vector3(...pose.look).sub(new Vector3(...pose.position)).normalize();
function assertClear(pose,ground,clearance=.35){
 const distance=length(pose),steps=Math.max(1,Math.ceil(distance/.025));
 for(let i=0;i<=steps;i++){
  const point=pose.look.map((value,axis)=>value+(pose.position[axis]-value)*i/steps);
  assert.ok(point[1]>=ground(point[0],point[2])+clearance-1e-6,`camera boom is below terrain at ${point}`);
 }
}

test('the camera rig accepts the same true upward and downward limits as the look input',()=>{
 assert.equal(CAMERA_ORBIT.minPitch,CAMERA_LOOK.minPitch);
 assert.equal(CAMERA_ORBIT.maxPitch,CAMERA_LOOK.maxPitch);
 for(const pitch of [CAMERA_LOOK.minPitch,0,CAMERA_LOOK.maxPitch]){
  const pose=cameraPose({x:0,z:0},0,16/9,'chase3d',{yaw:Math.PI,pitch});
  assert.ok(Math.abs(direction(pose).y+Math.sin(pitch))<1e-12);
 }
 assert.ok(direction(cameraPose({x:0,z:0},0,16/9,'chase3d',{yaw:Math.PI,pitch:-.4})).y>0,'looking up really points the rendered view upward');
});

test('an unobstructed default rear view and overview retain their framing and chosen zoom',()=>{
 for(const mode of ['chase3d','overview'])for(const aspect of [390/844,16/9])for(const zoom of [.7,1,1.5]){
  const pose=cameraPose({x:4,z:-8},2,aspect,mode,{yaw:.7,pitch:.44,zoom}),snapshot=structuredClone(pose);
  assert.deepEqual(resolveCameraBoom(pose,()=>2),pose);
  assert.deepEqual(pose,snapshot,'collision resolution does not mutate the desired pose');
 }
});

test('looking upward shortens the boom above the floor without changing aim yaw or pitch',()=>{
 for(const yaw of [Math.PI,-1.2,.4])for(const pitch of [-.65,-.3,-.1]){
  const pose=cameraPose({x:0,z:0},0,16/9,'chase3d',{yaw,pitch}),safe=resolveCameraBoom(pose,()=>0);
  assert.ok(length(safe)<length(pose),'the desired eye would be underground');
  assert.ok(safe.position[1]>=.35&&safe.position[1]<.35001,'the eye stops just above the floor');
  assert.ok(direction(safe).distanceTo(direction(pose))<1e-12,'collision does not override the player-selected view angle');
  assertClear(safe,()=>0);
 }
});

test('terrain halfway along the boom blocks the camera even when the final eye would be clear',()=>{
 const pose=cameraPose({x:0,z:0},0,16/9,'chase3d',{yaw:Math.PI,pitch:.44});
 const ground=(x,z)=>z>=3&&z<=4?4:0,safe=resolveCameraBoom(pose,ground);
 assert.ok(pose.position[1]>ground(pose.position[0],pose.position[2])+.35,'the uncorrected endpoint alone appears clear');
 assert.ok(safe.position[2]<3&&safe.position[2]>2.99,'the eye stays on the player side of the first ridge');
 assert.ok(direction(safe).distanceTo(direction(pose))<1e-12);
 assertClear(safe,ground);
});

test('looking upward inside each actual home respects the shared raised floor and entrance ramp',()=>{
 const terrain=(x,z)=>Math.sin(x*.08)*.7+Math.cos(z*.06)*.5;
 const floors=createHouseFloors(terrain),ground=(x,z)=>houseFloorAt(x,z,floors)??terrain(x,z);
 for(const home of BASES)for(const pitch of [-.65,-.25,.44]){
  const player=home.spawn,pose=cameraPose(player,ground(player.x,player.z),390/844,'chase3d',{yaw:home.spawnHeading,pitch}),safe=resolveCameraBoom(pose,ground);
  assertClear(safe,ground);
  assert.ok(direction(safe).distanceTo(direction(pose))<1e-11);
 }
});

test('a higher floor under the focus lifts the rig together rather than creating a zero-length or tilted view',()=>{
 const pose={look:[0,.1,0],position:[0,-2,5]},ground=(x,z)=>z>.05?1.2:1;
 const safe=resolveCameraBoom(pose,ground);
 assert.ok(length(safe)>=.12-1e-9,'the camera retains a usable look direction');
 assert.ok(safe.look[1]>pose.look[1]);
 assert.ok(direction(safe).distanceTo(direction(pose))<1e-12);
 assertClear(safe,ground);
});

test('all supported pitches and zooms produce a finite upright camera over uneven terrain',()=>{
 const ground=(x,z)=>.35*Math.sin(x*.4)+.3*Math.cos(z*.3);
 for(const aspect of [390/844,16/9,844/390])for(const zoom of [.7,1,1.5])for(const pitch of [-.65,-.4,0,.44,.9,1.15])for(const yaw of [-2.6,0,1.4]){
  const player={x:2,z:-3},desired=cameraPose(player,ground(player.x,player.z),aspect,'chase3d',{yaw,pitch,zoom});
  const safe=resolveCameraBoom(desired,ground),camera=new PerspectiveCamera(52,aspect,.1,250);
  camera.position.fromArray(safe.position);camera.lookAt(new Vector3(...safe.look));camera.updateMatrixWorld();
  assert.ok([...safe.position,...safe.look,...camera.matrixWorld.elements].every(Number.isFinite));
  assert.ok(length(safe)>.1&&length(safe)<=length(desired)+1e-8);
  assert.ok(direction(safe).distanceTo(direction(desired))<1e-11);
  assertClear(safe,ground);
 }
});

test('zoom chooses the desired distance but never pushes the eye back through a blocking floor',()=>{
 const poses=[.7,1,1.5].map(zoom=>cameraPose({x:0,z:0},0,16/9,'chase3d',{yaw:.8,pitch:-.4,zoom}));
 const safe=poses.map(pose=>resolveCameraBoom(pose,()=>0));
 assert.ok(length(poses[0])>length(poses[1])&&length(poses[1])>length(poses[2]));
 for(const pose of safe){assertClear(pose,()=>0);assert.ok(Math.abs(length(pose)-length(safe[0]))<1e-5);}
});

test('invalid optional surface samples cannot corrupt a valid camera pose',()=>{
 const pose=cameraPose({x:0,z:0},0,16/9,'chase3d');
 assert.deepEqual(resolveCameraBoom(pose,()=>NaN),pose);
 assert.deepEqual(resolveCameraBoom(pose,undefined),pose);
 assert.deepEqual(resolveCameraBoom(pose,()=>0,{clearance:NaN,step:0}),pose);
});
