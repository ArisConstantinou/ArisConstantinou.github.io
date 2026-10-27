import test from 'node:test';
import assert from 'node:assert/strict';
import {createTouchEdgeLook} from '../src/arcade-touch-edge-look.js';
import {lookCameraRate} from '../src/arcade-camera-look.js';

const event=(x,{id=7,type='touch',y=200}={})=>({pointerId:id,pointerType:type,clientX:x,clientY:y});
const view={left:0,width:390};
const angularDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));

test('a touch near either edge cannot start a turn without a deliberate outward gesture',()=>{
 for(const x of [2,388]){
  const controller=createTouchEdgeLook();controller.begin(event(x));
  assert.equal(controller.sample(view),0);
  for(const offset of [-2,1,0,3,-1]){
   controller.move(event(x+offset));
   assert.equal(controller.sample(view),0,'tap, vertical motion or a few pixels of jitter never arms edge turning');
  }
 }
});

test('an outward swipe to either edge keeps turning with no subsequent pointermove events',()=>{
 for(const direction of [-1,1]){
  const controller=createTouchEdgeLook();controller.begin(event(195));controller.move(event(direction>0?390:0));
  assert.equal(controller.sample(view),direction);
  let orbit={yaw:.4,pitch:.12},total=0;
  for(let frame=0;frame<600;frame++){
   const next=lookCameraRate(orbit,controller.sample(view),0,1/60,{deadzone:0});
   total+=angularDelta(next.yaw,orbit.yaw);orbit=next;
  }
  assert.ok(Math.abs(total+direction*22)<1e-10);
  assert.ok(Math.abs(total)>Math.PI*2*3);
  assert.equal(orbit.pitch,.12,'edge help is horizontal only');
 }
});

test('mostly vertical swipes at an edge do not acquire yaw from sideways drift',()=>{
 for(const direction of [-1,1]){
  const controller=createTouchEdgeLook(),start=direction>0?360:30;
  controller.begin(event(start,{y:100}));
  for(let step=1;step<=10;step++){
   controller.move(event(start+direction*step*2,{y:100+step*20}));
   assert.equal(controller.sample(view),0,'vertical look with cumulative horizontal drift must stay direct only');
  }
  // A horizontal continuation after the vertical gesture is deliberate input,
  // and must not require release just to discard the old vertical distance.
  controller.move(event(direction>0?390:0,{y:300}));
  assert.equal(controller.sample(view),direction);
 }
});

test('a single mostly vertical diagonal event cannot arm edge continuation',()=>{
 const controller=createTouchEdgeLook();controller.begin(event(350,{y:100}));
 controller.move(event(380,{y:300}));assert.equal(controller.sample(view),0);
 controller.move(event(390,{y:300}));assert.equal(controller.sample(view),1);
});

test('swipes away from the edges have no continuation, and edge speed increases smoothly',()=>{
 const controller=createTouchEdgeLook();controller.begin(event(195));controller.move(event(300));
 assert.equal(controller.sample(view),0);
 controller.move(event(345));const near=controller.sample(view);
 controller.move(event(365));const deeper=controller.sample(view);
 controller.move(event(400));const full=controller.sample(view);
 assert.ok(near>0&&near<deeper&&deeper<full);assert.equal(full,1);
});

test('inward motion stops continuation before leaving the edge and intentional outward motion can resume it',()=>{
 for(const [origin,edge,inward,resume] of [[200,385,375,384],[200,5,15,6]]){
  const controller=createTouchEdgeLook();controller.begin(event(origin));controller.move(event(edge));
  assert.ok(Math.abs(controller.sample(view))>.9);
  controller.move(event(edge+(edge>origin?-1:1)));
  assert.ok(Math.abs(controller.sample(view))>.9,'one-pixel held-finger noise does not stop the turn');
  controller.move(event(inward));assert.equal(Math.abs(controller.sample(view)),0);
  controller.move(event(resume));assert.ok(Math.abs(controller.sample(view))>.9);
  controller.move(event(195));assert.equal(Math.abs(controller.sample(view)),0);
 }
});

test('release, cancel, pause or layout entry can clear the gesture without retaining a turning latch',()=>{
 const controller=createTouchEdgeLook();controller.begin(event(300));controller.move(event(390));
 assert.equal(controller.sample(view),1);
 controller.clear();assert.equal(controller.sample(view),0);
 controller.move(event(389));assert.equal(controller.sample(view),0,'late captured move cannot reactivate a cleared gesture');
 controller.begin(event(389));assert.equal(controller.sample(view),0,'next touch must deliberately swipe again');
});

test('edge help accepts touch and pen, ignores another pointer, and never starts from a mouse',()=>{
 for(const type of ['touch','pen']){
  const controller=createTouchEdgeLook();controller.begin(event(300,{type}));
  controller.move(event(390,{id:8,type}));assert.equal(controller.sample(view),0);
  controller.move(event(390,{type}));assert.equal(controller.sample(view),1);
 }
 const controller=createTouchEdgeLook();controller.begin(event(300,{type:'mouse'}));controller.move(event(390,{type:'mouse'}));
 assert.equal(controller.sample(view),0);
});

test('edge calculations follow the current viewport and stay finite for invalid or resized inputs',()=>{
 const controller=createTouchEdgeLook();controller.begin(event(300));controller.move(event(390));
 assert.equal(controller.sample(view),1);
 assert.equal(controller.sample({width:844}),0,'rotation cannot stay latched to the old portrait edge after widening');
 controller.move(event(854));assert.equal(controller.sample({left:10,width:844}),1);
 for(const bad of [{},{width:0},{width:-1},{width:Infinity},{width:NaN},{left:NaN,width:390}])assert.equal(controller.sample(bad),0);
 controller.clear();controller.begin(event(NaN));controller.move(event(390));assert.equal(controller.sample(view),0);
});
