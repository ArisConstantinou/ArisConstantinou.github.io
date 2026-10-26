import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3} from 'three';
import {actorHeading,cameraPose,screenToWorld,dragCamera,CAMERA_ORBIT} from '../src/arcade-view-math.js';

const cameraFor=(actor,orbit,aspect=1.6)=>{
 const pose=cameraPose(actor,2,aspect,'chase3d',orbit),camera=new PerspectiveCamera(52,aspect,.1,250);
 camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();
 return {pose,camera};
};

test('deliberate initial rear placement keeps every spawn heading visible across screen orientations',()=>{
 for(const aspect of [360/640,390/844,640/360,844/390])for(let yaw=-Math.PI;yaw<=Math.PI;yaw+=Math.PI/8){
  const actor={x:7,z:-5,face:yaw},heading=actorHeading(actor),{pose,camera}=cameraFor(actor,{yaw,pitch:CAMERA_ORBIT.pitch},aspect);
  assert.ok((pose.position[0]-actor.x)*heading.x+(pose.position[2]-actor.z)*heading.z<-8);
  const body=new Vector3(actor.x,3.2,actor.z).project(camera);
  assert.ok(Math.abs(body.x)<.15&&Math.abs(body.y)<.15,'frog remains visible near the center');
 }
});

test('movement face, hover aiming, firing, aim release and kicking cannot turn a chosen camera',()=>{
 const actor={x:0,z:0,face:Math.PI,aimX:1,aimZ:0,aiming:false,shot:0,kick:0},orbit={yaw:.74,pitch:.48};
 const base=cameraPose(actor,0,1.7,'chase3d',orbit);
 for(const action of [{face:0},{face:Math.PI/2},{face:-Math.PI/2},{aiming:true},{shot:.1},{kick:.3},{aiming:false,shot:0,kick:0}]){
  assert.deepEqual(cameraPose({...actor,...action},0,1.7,'chase3d',orbit),base);
 }
});

test('W A S D retain their visible screen directions after actor turns and repeated releases',()=>{
 const actor={x:0,z:0,face:Math.PI};
 for(const yaw of [Math.PI,Math.PI/2,.4,-1.7]){
  const orbit={yaw,pitch:CAMERA_ORBIT.pitch};
  for(const [label,sx,sy] of [['D',1,0],['D',1,0],['S',0,1],['A',-1,0],['W',0,-1],['WD',1,-1],['W',0,-1]]){
   for(let frame=0;frame<60;frame++){
    const {pose,camera}=cameraFor(actor,orbit),focus={x:pose.look[0],z:pose.look[2]};
    const move=screenToWorld(sx,sy,camera.position,focus),before=new Vector3(actor.x,3.2,actor.z).project(camera);
    const next=new Vector3(actor.x+move.x*.1,3.2,actor.z+move.z*.1).project(camera);
    if(sx)assert.ok((next.x-before.x)*sx>0,`${label} moves to the correct screen side`);
    else assert.ok(Math.abs(next.x-before.x)<1e-10,`${label} has no lateral drift`);
    if(sy)assert.ok((next.y-before.y)*sy<0,`${label} moves vertically in the expected screen direction`);
    actor.x+=move.x/60;actor.z+=move.z/60;actor.face=Math.atan2(move.x,move.z);
   }
  }
 }
});

test('a deliberate orbit changes visible movement axes and clamps pitch without invalid camera values',()=>{
 const actor={x:0,z:0},initial={yaw:Math.PI,pitch:CAMERA_ORBIT.pitch},turned=dragCamera(initial,Math.PI/2/CAMERA_ORBIT.sensitivity,0);
 assert.ok(Math.abs(turned.yaw-Math.PI/2)<1e-12);
 const {pose,camera}=cameraFor(actor,turned),move=screenToWorld(0,-1,camera.position,{x:pose.look[0],z:pose.look[2]});
 assert.ok(move.x>.999999&&Math.abs(move.z)<1e-10,'W follows the deliberately rotated view');
 assert.equal(dragCamera(initial,0,1e6).pitch,CAMERA_ORBIT.maxPitch);
 assert.equal(dragCamera(initial,0,-1e6).pitch,CAMERA_ORBIT.minPitch);
 const safe=cameraPose({x:0,z:0,face:NaN},0,NaN,'chase3d',{yaw:NaN,pitch:NaN});
 assert.ok([...safe.look,...safe.position].every(Number.isFinite));
});
