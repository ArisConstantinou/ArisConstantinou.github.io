import test from 'node:test';
import assert from 'node:assert/strict';
import { gestureThrowVelocity } from './drag.js';

test('all eight pointer directions survive perpendicular and reversed swipes', () => {
  for (const [x,z] of [[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]]) {
    const length=Math.hypot(x,z),aim={x:x/length,z:z/length};
    for (const motion of [{x:0,z:0},{x:aim.z*20,z:-aim.x*20},{x:-aim.x*30,z:-aim.z*30}]) {
      const v=gestureThrowVelocity(motion,aim);
      assert.ok(Math.abs(v.x/v.speed-aim.x)<1e-8);
      assert.ok(Math.abs(v.z/v.speed-aim.z)<1e-8);
    }
  }
});

test('swipe intensity controls power independently of swipe heading', () => {
  const aim={x:1,z:0};
  const east=gestureThrowVelocity({x:20,z:0},aim);
  const north=gestureThrowVelocity({x:0,z:-20},aim);
  const stronger=gestureThrowVelocity({x:0,z:28},aim);
  assert.equal(east.speed,north.speed);
  assert.ok(stronger.speed>north.speed);
  assert.equal(north.z,0);
  assert.equal(stronger.z,0);
  assert.equal(gestureThrowVelocity({x:0,z:0},aim).speed,16);
});
