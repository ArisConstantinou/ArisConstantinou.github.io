import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMERA_LOOK,lookCamera} from '../src/arcade-camera-look.js';
import {screenToWorld} from '../src/arcade-view-math.js';

const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const close=(a,b,message)=>assert.ok(Math.abs(a-b)<1e-10,message);

test('moving the mouse directly turns the view in both axes without a held camera button',()=>{
 const start={yaw:Math.PI,pitch:.44};
 const right=lookCamera(start,120,0),left=lookCamera(start,-120,0);
 assert.ok(delta(right.yaw,start.yaw)<0,'right mouse movement looks right');
 assert.ok(delta(left.yaw,start.yaw)>0,'left mouse movement looks left');
 close(Math.abs(delta(right.yaw,start.yaw)),.3);
 close(right.pitch,start.pitch);
 assert.ok(lookCamera(start,0,-120).pitch<start.pitch,'moving up looks up');
 assert.ok(lookCamera(start,0,120).pitch>start.pitch,'moving down looks down');
 assert.deepEqual(start,{yaw:Math.PI,pitch:.44},'input orbit is not mutated');
});

test('vertical look can aim above the horizon and remains within safe angular limits',()=>{
 const up=lookCamera({yaw:0,pitch:.1},0,-160);
 assert.ok(up.pitch<0,'upward aiming is not restricted to a downward-only camera');
 assert.equal(lookCamera(up,0,-100000).pitch,CAMERA_LOOK.minPitch);
 assert.equal(lookCamera(up,0,100000).pitch,CAMERA_LOOK.maxPitch);
 assert.ok(CAMERA_LOOK.minPitch>-Math.PI/2&&CAMERA_LOOK.maxPitch<Math.PI/2,'pitch cannot flip the camera upside down');
});

test('identical mouse displacement makes the same turn regardless of event or frame grouping',()=>{
 const start={yaw:2.9,pitch:.1},single=lookCamera(start,240,-120);
 let grouped=start;
 for(let event=0;event<120;event++)grouped=lookCamera(grouped,2,-1);
 close(delta(grouped.yaw,single.yaw),0);
 close(grouped.pitch,single.pitch);
});

test('continuous mouse movement can turn through several revolutions without yaw limits',()=>{
 let orbit={yaw:Math.PI,pitch:.2},total=0;
 for(let event=0;event<1000;event++){
  const next=lookCamera(orbit,12,0);total+=delta(next.yaw,orbit.yaw);orbit=next;
  assert.ok(orbit.yaw>=-Math.PI&&orbit.yaw<=Math.PI);
 }
 close(total,-30);
 assert.ok(Math.abs(total)>Math.PI*2*4);
 close(orbit.pitch,.2);
});

test('sensitivity scales direct look and inversion changes only the vertical axis',()=>{
 const start={yaw:1,pitch:.2},normal=lookCamera(start,50,50),sensitive=lookCamera(start,50,50,{sensitivity:.005}),inverted=lookCamera(start,50,50,{invertY:true});
 close(delta(sensitive.yaw,start.yaw),delta(normal.yaw,start.yaw)*2);
 close(sensitive.pitch-start.pitch,(normal.pitch-start.pitch)*2);
 close(delta(inverted.yaw,normal.yaw),0);
 close(inverted.pitch-start.pitch,-(normal.pitch-start.pitch));
});

test('stationary mouse input does not recenter a chosen direction',()=>{
 const chosen=lookCamera({yaw:2,pitch:.4},130,-90);let view=chosen;
 for(let frame=0;frame<600;frame++)view=lookCamera(view,0,0);
 close(delta(view.yaw,chosen.yaw),0);
 close(view.pitch,chosen.pitch);
});

test('WASD stays relative to the viewed direction as deliberate mouse look turns the camera',()=>{
 const initial={yaw:Math.PI,pitch:.44};
 const turned=lookCamera(initial,(Math.PI/2)/CAMERA_LOOK.sensitivity,0);
 const movement=(orbit,x,y)=>screenToWorld(x,y,{x:0,z:0},{x:Math.sin(orbit.yaw),z:Math.cos(orbit.yaw)});
 const initialForward=movement(initial,0,-1),forward=movement(turned,0,-1),back=movement(turned,0,1),left=movement(turned,-1,0),right=movement(turned,1,0);
 assert.ok(initialForward.z<-.999&&forward.x>.999,'holding W follows the changing view instead of a frozen world heading');
 close(back.x,-forward.x);close(back.z,-forward.z);
 close(left.x,-right.x);close(left.z,-right.z);
 close(forward.x*right.x+forward.z*right.z,0,'A/D remain sideways strafes');
 close(Math.hypot(right.x,right.z),1);
});

test('invalid deltas or saved angles cannot poison camera state',()=>{
 const fallback=lookCamera();
 close(fallback.yaw,CAMERA_LOOK.yaw);close(fallback.pitch,CAMERA_LOOK.pitch);
 for(const input of [undefined,null,{yaw:NaN,pitch:Infinity},{yaw:1e300,pitch:-1e300}]){
  for(const options of [{},{sensitivity:NaN},{sensitivity:0},{sensitivity:-1},{sensitivity:Infinity},{sensitivity:Number.MAX_VALUE}]){
   const orbit=lookCamera(input,Infinity,NaN,options);
   assert.ok(Number.isFinite(orbit.yaw)&&Number.isFinite(orbit.pitch));
   assert.ok(orbit.pitch>=CAMERA_LOOK.minPitch&&orbit.pitch<=CAMERA_LOOK.maxPitch);
  }
 }
 const overflow=lookCamera({yaw:1,pitch:.2},Number.MAX_VALUE,Number.MAX_VALUE,{sensitivity:Number.MAX_VALUE});
 assert.ok(Number.isFinite(overflow.yaw)&&Number.isFinite(overflow.pitch));
});
