import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3} from 'three';
import {actorHeading,cameraPose,screenBasis,screenToWorld} from '../src/arcade-view-math.js';

test('third-person camera stays behind the frog across a full rotation and portrait / landscape',()=>{
 for(const aspect of [360/640,390/844,640/360,844/390])for(let yaw=-Math.PI;yaw<=Math.PI;yaw+=Math.PI/8){
  const actor={x:7,z:-5,face:yaw},pose=cameraPose(actor,2,aspect),heading=actorHeading(actor);
  const backX=pose.position[0]-actor.x,backZ=pose.position[2]-actor.z;
  assert.ok(backX*heading.x+backZ*heading.z<-8,'camera must be behind actual body heading');
  const camera=new PerspectiveCamera(52,aspect,.1,250);camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();
  const body=new Vector3(actor.x,3.2,actor.z).project(camera);
  assert.ok(Math.abs(body.x)<.15&&Math.abs(body.y)<.15,'rotation must keep the frog in the central viewing area');
 }
});

test('shots and kicks use the same heading as rendering, idle follows body face',()=>{
 const actor={x:0,z:0,face:Math.PI,aimX:1,aimZ:0,aiming:false,shot:0,kick:0};
 assert.ok(actorHeading(actor).z<-.99);
 for(const action of [{aiming:true},{shot:.1},{kick:.3}])assert.deepEqual(actorHeading({...actor,...action}),{x:1,z:0});
 const pose=cameraPose({x:0,z:0,face:NaN,aimX:NaN,aimZ:NaN},0,NaN);
 assert.ok([...pose.look,...pose.position].every(Number.isFinite));
});

test('one held movement gesture keeps its world direction as camera follows a turning frog',()=>{
 const actor={x:0,z:0,face:Math.PI};let pose=cameraPose(actor,0,1.7);
 const basis=screenBasis({x:pose.position[0],z:pose.position[2]},{x:pose.look[0],z:pose.look[2]});
 const first=screenToWorld(1,0,basis.camera,basis.focus);
 for(let frame=0;frame<180;frame++){
  const move=screenToWorld(1,0,basis.camera,basis.focus);
  actor.x+=move.x/60;actor.z+=move.z/60;actor.face=Math.atan2(move.x,move.z);
  pose=cameraPose(actor,0,1.7);
  assert.deepEqual(move,first);
 }
 assert.ok(Math.hypot(actor.x-first.x*3,actor.z-first.z*3)<1e-10,'a held right gesture travels straight instead of orbiting');
 const nextBasis=screenBasis({x:pose.position[0],z:pose.position[2]},{x:pose.look[0],z:pose.look[2]});
 const nextUp=screenToWorld(0,-1,nextBasis.camera,nextBasis.focus);
 assert.ok(nextUp.x*first.x+nextUp.z*first.z>.99,'a new forward gesture uses the new behind-the-frog view');
});
