import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3} from 'three';
import {CAMERA_ORBIT,cameraPose,screenToWorld} from '../src/arcade-view-math.js';

test('default shooter view aims ahead with the same camera range and visible foreground',()=>{
 for(const aspect of [430/745,745/430,2048/1032]){
  const player={x:0,z:19.65,face:Math.PI},ground=2,old=cameraPose(player,ground,aspect,'chase3d',{yaw:Math.PI,pitch:.37}),pose=cameraPose(player,ground,aspect),camera=new PerspectiveCamera(52,aspect,.1,250);
  assert.ok(pose.position[1]>ground+1,'the default eye clears the player and flat ground');
  assert.deepEqual(pose.look,old.look,'pitch preserves the grounded shoulder anchor');
  const range=p=>Math.hypot(...p.position.map((v,i)=>v-p.look[i]));assert.ok(Math.abs(range(pose)-range(old))<1e-9);
  camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();
  const forward=camera.getWorldDirection(new Vector3()),groundDistance=(ground-camera.position.y)/forward.y,groundPoint=camera.position.clone().addScaledVector(forward,groundDistance);
  const aimReach=Math.hypot(groundPoint.x-player.x,groundPoint.z-player.z);
  assert.ok(groundDistance>0&&aimReach>8&&aimReach<21.6,'the central aiming ray reaches useful combat distance instead of the ground at the frog\'s feet');
  for(const point of [[0,ground+.4,19.65],[0,ground,17.9],[0,ground,14.65]]){
   const projected=new Vector3(...point).project(camera);assert.ok(projected.x<-.06&&projected.x>-.65&&Math.abs(projected.y)<.65&&projected.z>-1&&projected.z<1,'frog, house doorway and catapult approach remain visible left of the aiming ray');
  }
 }
});

test('camera elevation does not change the movement basis or start following actor facing',()=>{
 const actor={x:0,z:8,face:Math.PI},aspect=430/745;
 for(const yaw of [Math.PI,.4,-1.7]){
  const old=cameraPose(actor,0,aspect,'chase3d',{yaw,pitch:.37}),current=cameraPose(actor,0,aspect,'chase3d',{yaw,pitch:CAMERA_ORBIT.pitch});
  for(const input of [[0,-1],[1,0],[0,1],[-1,0],[.5,-.5]]){
   const move=pose=>screenToWorld(...input,{x:pose.position[0],z:pose.position[2]},{x:pose.look[0],z:pose.look[2]}),a=move(old),b=move(current);assert.ok(Math.hypot(a.x-b.x,a.z-b.z)<1e-12);
  }
  assert.deepEqual(cameraPose({...actor,face:0,aimX:1,aimZ:0,aiming:true,shot:.1},0,aspect,'chase3d',{yaw,pitch:CAMERA_ORBIT.pitch}),current);
 }
});
