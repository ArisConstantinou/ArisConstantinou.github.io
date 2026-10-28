import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3} from 'three';
import {targetLockOrbit} from '../src/arcade-lock-camera.js';
import {cameraPose} from '../src/arcade-view-math.js';

test('lock camera converges on the real target through the offset shoulder rig',()=>{
 const player={x:3,z:4},ground=1;
 for(const target of [{x:3,y:1.45,z:-10},{x:16,y:3,z:12},{x:-8,y:.45,z:7}]){
  let orbit={yaw:Math.PI,pitch:.2};
  for(let i=0;i<120;i++)orbit=targetLockOrbit(player,ground,target,orbit,1/60);
  const pose=cameraPose(player,ground,16/9,'chase3d',orbit),camera=new PerspectiveCamera(52,16/9,.1,250);
  camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();
  const screen=new Vector3(target.x,target.y,target.z).project(camera);
  assert.ok(Math.abs(screen.x)<1e-6&&Math.abs(screen.y)<1e-6,JSON.stringify({target,screen}));
 }
});

test('close targets and zero elapsed time cannot flip or snap the camera',()=>{
 const player={x:0,z:0},orbit={yaw:3.1,pitch:.3};
 assert.deepEqual(targetLockOrbit(player,0,{x:.2,y:.45,z:1},orbit,1/60),orbit);
 const unchanged=targetLockOrbit(player,0,{x:8,y:.45,z:0},orbit,0);
 assert.ok(Math.abs(unchanged.yaw-orbit.yaw)<1e-12);assert.equal(unchanged.pitch,orbit.pitch);
 assert.deepEqual(targetLockOrbit(player,0,{x:NaN,y:.45,z:1},orbit,1/60),orbit);
});
