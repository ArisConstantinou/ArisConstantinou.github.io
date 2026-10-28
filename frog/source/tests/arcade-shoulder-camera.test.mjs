import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3,PerspectiveCamera,Vector3} from 'three';
import {createCreature} from '../src/creatures.js';
import {configureArcadeAppearance,applyArcadeAppearance} from '../src/arcade-appearance.js';
import {cameraPose,resolveCameraBoom,CAMERA_ORBIT} from '../src/arcade-view-math.js';

function hopBounds(model,progress){
 model.update(0,{time:1,hop:{phase:'air',progress},speed:5});
 applyArcadeAppearance(model,{load:1,spit:1});
 model.group.position.y=Math.sin(progress*Math.PI)*.67;
 model.group.updateMatrixWorld(true);model.skeleton.update();
 const box=new Box3(),point=new Vector3();
 model.group.traverseVisible(mesh=>{
  if(!mesh.isSkinnedMesh||mesh.name==='animated-color-silhouette')return;
  for(let index=0;index<mesh.geometry.attributes.position.count;index++){
   mesh.getVertexPosition(index,point);point.applyMatrix4(mesh.matrixWorld);box.expandByPoint(point);
  }
 });
 // The silhouette shader extends vertices slightly outside the skinned body.
 box.expandByScalar(.025);
 return [box.min.x,box.max.x].flatMap(x=>[box.min.y,box.max.y].flatMap(y=>[box.min.z,box.max.z].map(z=>new Vector3(x,y,z))));
}

test('the actual hopping frog stays clear of the central crosshair throughout ordinary third-person views',()=>{
 const frog=configureArcadeAppearance(createCreature('frog',{team:'player'}));
 const poses=[0,.14,.33,.5,.7,.9,1].map(progress=>({progress,points:hopBounds(frog,progress)}));
 const point=new Vector3(),camera=new PerspectiveCamera(52,16/9,.1,250);
 const ground=(x,z)=>.2*Math.sin(x*.8)+.3*Math.cos(z*.4),standing=ground(0,0);
 for(const [width,height] of [[1280,720],[1440,900],[390,844],[844,390]])
 for(const pitch of [-.3,0,CAMERA_ORBIT.pitch,.6,1.15])
 for(const yaw of [0,Math.PI/4,Math.PI/2,Math.PI])
 for(const [zoom,fov] of [[.7,80],[1,52],[1.5,40]]){
  const desired=cameraPose({x:0,z:0},standing,width/height,'chase3d',{yaw,pitch,zoom});
  const safe=resolveCameraBoom(desired,ground);
  camera.aspect=width/height;camera.fov=fov;camera.updateProjectionMatrix();
  camera.position.fromArray(safe.position);camera.lookAt(...safe.look);camera.updateMatrixWorld();
  for(const {progress,points} of poses){
   let right=-Infinity,top=-Infinity;
   for(const vertex of points){
    point.copy(vertex);point.y+=standing;point.project(camera);
    right=Math.max(right,point.x);top=Math.max(top,point.y);
   }
   const clearance=Math.hypot(Math.max(0,-right)*width/2,Math.max(0,-top)*height/2);
   assert.ok(clearance>12,`frog bounds overlap the 12px crosshair: ${JSON.stringify({width,height,pitch,yaw,zoom,fov,progress,clearance})}`);
  }
 }
});

test('hop height, shooting and body rotation never move the grounded aiming anchor',()=>{
 const player={x:7,z:-4,face:Math.PI,height:0},orbit={yaw:.7,pitch:CAMERA_ORBIT.pitch};
 for(const mode of ['chase3d','overview']){
  const standing=cameraPose(player,2,16/9,mode,orbit);
  for(const height of [.2,.45,.67,1.2]){
   assert.deepEqual(cameraPose({...player,height,face:0,shot:.12,aiming:true,aimX:1,aimZ:0},2,16/9,mode,orbit),standing);
  }
 }
});

test('a reversed camera orbit immediately places its shoulder on the new screen-right side',()=>{
 const player={x:4,z:9};
 for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2]){
  const pose=cameraPose(player,0,16/9,'chase3d',{yaw,pitch:CAMERA_ORBIT.pitch});
  const right={x:-Math.cos(yaw),z:Math.sin(yaw)};
  const offset=(pose.look[0]-player.x)*right.x+(pose.look[2]-player.z)*right.z;
  assert.ok(offset>1.5,'the centre ray is clearly beside the body for every look direction');
 }
});
