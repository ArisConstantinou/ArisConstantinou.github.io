import test from 'node:test';
import assert from 'node:assert/strict';
import { PointerMotion, gestureThrowVelocity, clampDragPoint, constrainDragPoint } from './drag.js';

const close = (actual, expected, tolerance = 1e-7) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);
const wall = (x = 5, y = 2, z = 0, w = 2, h = 4, d = 8) => ({ x, y, z, w, h, d });
const finiteVector = vector => assert.ok(Object.values(vector).every(Number.isFinite));

test('pointer velocity reports CSS pixels per second independently of event spacing', () => {
  const motion = new PointerMotion({ x: 0, y: 0, timeMs: 0 });
  for (const t of [16, 39, 55, 81, 104, 128, 149, 180]) motion.add(t * .6, t * -.3, t);
  const velocity = motion.velocity(180);
  close(velocity.x, 600);
  close(velocity.y, -300);
});

test('the latest reversed swipe wins over the much longer earlier drag', () => {
  const motion = new PointerMotion();
  for (const [x, time] of [[0, 0], [400, 400], [440, 440], [480, 480], [460, 500], [420, 520], [380, 540], [340, 560]]) motion.add(x, 20, time);
  const velocity = motion.velocity(560);
  assert.ok(velocity.x < -1000, 'release must follow the recent leftward flick, not the total rightward displacement');
  close(velocity.y, 0);
});

test('waiting after a swipe removes its momentum, including repeated stationary events', () => {
  const motion = new PointerMotion({ x: 0, y: 0, timeMs: 0 }).add(100, 20, 100);
  assert.ok(motion.velocity(100).x > 0);
  assert.deepEqual(motion.velocity(241), { x: 0, y: 0 });
  motion.add(100, 20, 150).add(100, 20, 200).add(100, 20, 260);
  assert.deepEqual(motion.velocity(260), { x: 0, y: 0 });
});

test('coalesced duplicate timestamps and out-of-order or invalid events cannot inject a spike', () => {
  const motion = new PointerMotion().add(0, 0, 0).add(10, 0, 0).add(20, 0, 20).add(30, 0, 20);
  motion.add(9000, 0, 10).add(Infinity, 2, 30).add(5, NaN, 30).add(5, 5, Infinity);
  close(motion.velocity(20).x, 1000);
  close(motion.velocity(20).y, 0);
  assert.deepEqual(motion.velocity(NaN), { x: 0, y: 0 });
  assert.deepEqual(motion.velocity(-10), { x: 0, y: 0 });
});

test('empty, single-sample and extreme pointer input always have finite output', () => {
  const motion = new PointerMotion();
  assert.deepEqual(motion.velocity(0), { x: 0, y: 0 });
  motion.add(100, 50, 10);
  assert.deepEqual(motion.velocity(10), { x: 0, y: 0 });
  motion.add(Number.MAX_VALUE, -Number.MAX_VALUE, 20).add(-Number.MAX_VALUE, Number.MAX_VALUE, 30);
  finiteVector(motion.velocity(30));
});

test('swipe momentum preserves its world direction and receives a small natural upward arc', () => {
  const velocity = gestureThrowVelocity({ x: 12, z: -16 }, { x: -1, z: 0 });
  close(velocity.speed, 18);
  close(velocity.x / velocity.z, -12 / 16);
  close(Math.hypot(velocity.x, velocity.z), velocity.speed);
  close(velocity.y, 2.4 + 18 * .035);
});

test('a still or very slow release throws away from the mage at the baseline speed', () => {
  for (const motion of [{ x: 0, z: 0 }, { x: 1.39, z: 0 }]) {
    const velocity = gestureThrowVelocity(motion, { x: 0, z: 8 });
    close(velocity.x, 0);
    close(velocity.z, 16);
    close(velocity.speed, 16);
  }
  const deliberate = gestureThrowVelocity({ x: 1.4, z: 0 }, { x: 0, z: 8 });
  close(deliberate.x, 9);
  close(deliberate.z, 0);
});

test('grip upgrades increase release speed without exceeding the physics speed cap', () => {
  const normal = gestureThrowVelocity({ x: 20, z: 0 }, { x: 0, z: -1 }, 0);
  const upgraded = gestureThrowVelocity({ x: 20, z: 0 }, { x: 0, z: -1 }, 3);
  close(upgraded.speed, normal.speed * 1.3);
  const fast = gestureThrowVelocity({ x: 100000, z: -100000 }, { x: 0, z: -1 }, 3);
  close(fast.speed, 32);
  close(Math.hypot(fast.x, fast.z), 32);
});

test('invalid or enormous throw input cannot produce NaN or an unbounded speed', () => {
  for (const args of [
    [undefined, undefined],
    [{ x: NaN, z: Infinity }, { x: Infinity, z: NaN }, Infinity],
    [{ x: Number.MAX_VALUE, z: Number.MAX_VALUE }, { x: 0, z: 0 }, Number.MAX_VALUE],
    [{ x: 0, z: 0 }, { x: 0, z: 0 }, -5],
  ]) {
    const velocity = gestureThrowVelocity(...args);
    finiteVector(velocity);
    assert.ok(velocity.speed > 0 && velocity.speed <= 32);
    close(Math.hypot(velocity.x, velocity.z), velocity.speed);
  }
});

test('drag reach clamps to a circle around the moving mage and preserves held height', () => {
  const player = { x: 7, y: 0, z: -3 }, target = { x: 13, y: 2.7, z: 5 };
  const actual = clampDragPoint(target, player, 5);
  close(Math.hypot(actual.x - player.x, actual.z - player.z), 5);
  close(actual.x, 10);
  close(actual.z, 1);
  close(actual.y, 2.7);
  assert.deepEqual(target, { x: 13, y: 2.7, z: 5 });
  assert.deepEqual(player, { x: 7, y: 0, z: -3 });
});

test('targets already inside reach return a fresh unchanged point', () => {
  const target = { x: 1, y: 2, z: -2 };
  const actual = clampDragPoint(target, { x: 0, y: 0, z: 0 }, 4);
  assert.deepEqual(actual, target);
  assert.notEqual(actual, target);
});

test('zero or invalid reach and malformed positions stay finite', () => {
  for (const reach of [0, -3, NaN, Infinity]) {
    const actual = clampDragPoint({ x: 4, y: 2, z: -9 }, { x: 1, y: 0, z: 1 }, reach);
    assert.deepEqual(actual, { x: 1, y: 2, z: 1 });
  }
  finiteVector(clampDragPoint({ x: NaN, y: Infinity }, {}, 5));
  const extreme = clampDragPoint({ x: Number.MAX_VALUE, y: 2, z: Number.MAX_VALUE }, { x: -Number.MAX_VALUE, z: 0 }, 5);
  finiteVector(extreme);
});

test('a held object stops just before the first wall, including its own collision radius', () => {
  const start = { x: 0, y: 2, z: 0 }, end = { x: 12, y: 2, z: 0 };
  const actual = constrainDragPoint(start, end, [wall(9), wall(5)], .5, .6);
  assert.ok(actual.x > 3.4 && actual.x < 3.5, 'object centre must stop before the expanded near wall face at x=3.5');
  close(actual.y, 2);
  close(actual.z, 0);
  assert.deepEqual(start, { x: 0, y: 2, z: 0 });
  assert.deepEqual(end, { x: 12, y: 2, z: 0 });
});

test('walls behind the object or beyond its destination do not block the drag', () => {
  const start = { x: 0, y: 2, z: 0 }, end = { x: 3, y: 2, z: 0 };
  assert.deepEqual(constrainDragPoint(start, end, [wall(-4), wall(7)], .5, .6), end);
});

test('a drag ending exactly at a collider still leaves a small contact margin', () => {
  const actual = constrainDragPoint({ x: 0, y: 2, z: 0 }, { x: 3.5, y: 2, z: 0 }, [wall()], .5, .5);
  assert.ok(actual.x > 3.4 && actual.x < 3.5);
});

test('an object can pass over a low obstacle or below an arch lintel', () => {
  const start = { x: 0, y: 3, z: 0 }, end = { x: 10, y: 3, z: 0 };
  const obstacles = [wall(4, .5, 0, 1, 1, 6), wall(7, 5, 0, 1, 1, 6)];
  assert.deepEqual(constrainDragPoint(start, end, obstacles, .4, .5), end);
  assert.ok(constrainDragPoint(start, end, [wall(5, 2)], .4, .5).x < 4);
});

test('vertical overlap is tested along the actual swept path rather than at its endpoints only', () => {
  const start = { x: 0, y: 5, z: 0 }, end = { x: 10, y: 0, z: 0 };
  const actual = constrainDragPoint(start, end, [wall(5, 2, 0, 2, 1, 6)], .5, .5);
  assert.ok(actual.x > 3.9 && actual.x < 4);
  assert.ok(actual.y > 3, 'the descending object should stop just before its bottom meets the obstacle');
  const alreadyPassed = wall(2, 1, 0, 1, 1, 6);
  assert.deepEqual(constrainDragPoint(start, end, [alreadyPassed], .5, .5), end);
});

test('an object already touching a wall can move out or slide along it without locking', () => {
  const start = { x: 3.6, y: 2, z: 0 };
  const away = { x: 1, y: 2, z: 0 }, along = { x: 3.6, y: 2, z: 6 };
  assert.deepEqual(constrainDragPoint(start, away, [wall()], .5, .5), away);
  assert.deepEqual(constrainDragPoint(start, along, [wall()], .5, .5), along);
  assert.deepEqual(constrainDragPoint(start, { x: 8, y: 2, z: 0 }, [wall()], .5, .5), start);
});

test('escaping one initial contact still respects another obstacle on the route', () => {
  const start = { x: 3.6, y: 2, z: 0 }, end = { x: -6, y: 2, z: 0 };
  const actual = constrainDragPoint(start, end, [wall(5), wall(-3)], .5, .5);
  assert.ok(actual.x > -1.5 && actual.x < -1.4);
});

test('stationary drags and invalid geometry return finite independent points', () => {
  const start = { x: 0, y: 2, z: 0 };
  const actual = constrainDragPoint(start, start, [wall()], .5, .5);
  assert.deepEqual(actual, start);
  assert.notEqual(actual, start);
  const invalid = constrainDragPoint({ x: NaN }, { x: Infinity, y: NaN }, [null, { x: 1 }, wall(NaN)], NaN, Infinity);
  finiteVector(invalid);
});
