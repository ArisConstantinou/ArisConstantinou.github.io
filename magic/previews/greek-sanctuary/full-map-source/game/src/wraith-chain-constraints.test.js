import test from 'node:test';
import assert from 'node:assert/strict';
import { Bone, Group, Quaternion, Vector3 } from 'three';
import { solveFixedChain, createWraithChainConstraints } from './wraith-chain-constraints.js';

test('hanging metal preserves each link length and both endpoints across the authored reach', () => {
  const points = new Float64Array(63), start = new Vector3(.14, 1.99, .58);
  for (let heading = 0; heading < 8; heading++) for (const reach of [.55, .7, .9, 1.1, 1.3, 1.44]) {
    for (const height of [-.35, -.15, 0, .15, .35]) {
      const angle = heading * Math.PI / 4;
      const end = start.clone().add(new Vector3(reach * Math.cos(angle), height, reach * Math.sin(angle)));
      solveFixedChain(start, end, 20, .075, points);
      assert.ok(new Vector3().fromArray(points, 60).distanceTo(end) < 1e-8);
      let previousSlope = -Infinity;
      for (let i = 0; i < 20; i++) {
        const a = new Vector3().fromArray(points, i * 3), b = new Vector3().fromArray(points, (i + 1) * 3);
        assert.ok(Math.abs(a.distanceTo(b) - .075) < 1e-10);
        const d = b.sub(a), slope = d.y / Math.hypot(d.x, d.z);
        assert.ok(slope > previousSlope); previousSlope = slope;
      }
    }
  }
  assert.throws(() => solveFixedChain(start, start.clone().add(new Vector3(2, 0, 0)), 20, .075, points), RangeError);
});

test('constraint closes deliberately broken interrupted poses without changing hands or stretching metal', () => {
  const model = new Group(), y = new Vector3(0, 1, 0);
  const hands = [], lastLinks = [];
  for (const [side, sign] of [['R', -1], ['L', 1]]) {
    const start = new Vector3(sign * .13, 2.02, .55), end = new Vector3(sign * 1.06, 1.94, .747);
    const points = new Float64Array(63); solveFixedChain(start, end, 20, .075, points);
    let parent = model;
    for (let i = 0; i < 20; i++) {
      const bone = new Bone(); bone.name = `waist${side}${i}`;
      const a = new Vector3().fromArray(points, i * 3), b = new Vector3().fromArray(points, (i + 1) * 3);
      parent.updateWorldMatrix(true, false);
      bone.position.copy(parent.worldToLocal(a.clone()));
      const worldQ = new Quaternion().setFromUnitVectors(y, b.clone().sub(a).normalize());
      bone.quaternion.copy(parent.getWorldQuaternion(new Quaternion()).invert().multiply(worldQ));
      parent.add(bone); parent = bone;
    }
    lastLinks.push(parent);
    const hand = new Bone(); hand.name = `drop${side}0`; hand.position.copy(end); model.add(hand); hands.push(hand);
  }
  const constraint = createWraithChainConstraints(model);
  model.rotation.y = .83; model.scale.setScalar(1.17); model.position.set(3, .4, -2);
  for (let frame = 0; frame <= 60; frame++) {
    for (let i = 0; i < 2; i++) {
      hands[i].position.y = 1.94 + .45 * Math.sin(frame / 60 * Math.PI);
      hands[i].position.z = .747 + .4 * Math.sin(frame / 60 * Math.PI);
    }
    model.updateMatrixWorld(true);
    const before = hands.map(h => h.getWorldPosition(new Vector3()));
    constraint.update();
    for (let i = 0; i < 2; i++) {
      const end = lastLinks[i].localToWorld(new Vector3(0, .075, 0));
      assert.ok(end.distanceTo(before[i]) < 1e-8);
      assert.ok(hands[i].getWorldPosition(new Vector3()).distanceTo(before[i]) < 1e-12);
    }
  }
  assert.equal(constraint.diagnostics().updates, 61);
  assert.equal(createWraithChainConstraints(new Group()), null);
});
