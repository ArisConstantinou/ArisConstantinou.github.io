import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createCreature } from '../src/creatures.js';

const models = [];
function frog(options = {}) {
  const model = createCreature('frog', options); models.push(model); return model;
}
after(() => models.forEach(model => model.dispose()));
function renderBudget(model) {
  const result = { triangles: 0, draws: 0, shadowTriangles: 0, shadowDraws: 0 };
  model.group.traverseVisible(mesh => {
    if (!mesh.isMesh) return;
    const triangles = mesh.geometry.index.count / 3;
    result.triangles += triangles; result.draws++;
    if (mesh.castShadow) { result.shadowTriangles += triangles; result.shadowDraws++; }
  });
  return result;
}
function pose(model) {
  return Object.values(model.bones).map(bone => [...bone.position.toArray(), ...bone.quaternion.toArray(), ...bone.scale.toArray()]);
}

test('a 130-frog army keeps every model while reducing visible and shadow triangle work', () => {
  const army = Array.from({ length: 130 }, (_, seed) => frog({ tier: 3, seed, team: seed < 60 ? 'ally' : 'enemy' }));
  const original = renderBudget(army[0]);
  let triangles = 0, shadowTriangles = 0, draws = 0, shadowDraws = 0;
  army.forEach((model, index) => {
    model.setRenderLOD(index < 8 ? 0 : index < 50 ? 1 : 2);
    const budget = renderBudget(model);
    triangles += budget.triangles; shadowTriangles += budget.shadowTriangles;
    draws += budget.draws; shadowDraws += budget.shadowDraws;
    assert.ok(model.group.visible && model.mesh.visible, `frog ${index} remains rendered`);
    assert.ok(model.group.getObjectByName('armor').visible && model.group.getObjectByName('crest').visible, 'tier remains readable');
  });
  assert.ok(triangles < original.triangles * army.length * .15, 'army uses less than 15% of the previous visible triangles');
  assert.ok(shadowTriangles < original.shadowTriangles * army.length * .07, 'only nearby frogs enter the shadow pass');
  assert.ok(draws + shadowDraws < (original.draws + original.shadowDraws) * army.length * .56, 'silhouette and shadow passes are removed for distant troops');
});

test('detail changes preserve exact pose, mouth attachment, faction tint and tier appearance', () => {
  const model = frog({ tier: 3, role: 'guardian', color: 0xa94d3b, seed: 5 });
  model.group.position.set(23, 4, -17); model.group.rotation.y = 1.2; model.group.scale.setScalar(1.6);
  model.update(.05, { time: 2.3, speed: 4, attack: { type: 'kick', phase: .5 } });
  const originalGeometry = model.mesh.geometry, originalSkeleton = model.skeleton, originalPose = pose(model);
  const originalMouth = model.mouthWorld(), originalTint = model.mesh.material.userData.tint.getHex();
  const outline = model.group.getObjectByName('animated-color-silhouette');
  for (const level of [1, 2, 0, 2, 1, 0]) {
    model.setRenderLOD(level); model.setOutline(0xf47d62, true);
    assert.deepEqual(pose(model), originalPose);
    assert.equal(model.skeleton, originalSkeleton);
    assert.ok(model.mouthWorld().distanceTo(originalMouth) < 1e-9);
    assert.equal(model.mesh.material.userData.tint.getHex(), originalTint);
    assert.equal(outline.visible, level === 0, 'per-frame outline updates cannot bring back distant outline geometry');
    assert.ok(model.group.getObjectByName('armor').visible && model.group.getObjectByName('crest').visible);
  }
  assert.equal(model.mesh.geometry, originalGeometry, 'returning nearby restores the original full-resolution sculpt');
  assert.equal(outline.material.color.getHex(), 0xf47d62);
  model.setOutline(undefined, false); model.setRenderLOD(2); model.setRenderLOD(0);
  assert.equal(outline.visible, false, 'caller outline preference survives round trip');
  model.setRenderLOD(2); model.setTier(1); model.setRenderLOD(0);
  assert.equal(model.group.getObjectByName('armor').visible, false);
  assert.equal(model.group.getObjectByName('crest').visible, false);
});

test('each detail level shares meshes across the army but retains independently animated skeletons', () => {
  const moving = frog({ seed: 1 }), still = frog({ seed: 2 });
  assert.notEqual(moving.skeleton, still.skeleton);
  for (const level of [0, 1, 2]) {
    moving.setRenderLOD(level); still.setRenderLOD(level);
    assert.equal(moving.mesh.geometry, still.mesh.geometry);
    assert.equal(moving.group.getObjectByName('articulated-eyes').geometry, still.group.getObjectByName('articulated-eyes').geometry);
    const before = pose(still);
    moving.update(.1, { time: 1.4, speed: 5, attack: { type: 'slam', phase: .5 } });
    assert.deepEqual(pose(still), before, 'one frog cannot animate another frog through shared resources');
  }
});

test('medium and distant sculpts keep the body silhouette, targetable surface and valid skinning', () => {
  const model = frog({ tier: 3 });
  model.mesh.geometry.computeBoundingBox();
  const fullBounds = model.mesh.geometry.boundingBox.clone();
  const point = new THREE.Vector3(), raycaster = new THREE.Raycaster();
  for (const level of [0, 1, 2, 0]) {
    model.setRenderLOD(level); model.update(.05, { time: 1.5, speed: 0 }); model.group.updateMatrixWorld(true);
    const geometry = model.mesh.geometry; geometry.computeBoundingBox();
    assert.ok(geometry.boundingBox.min.distanceTo(fullBounds.min) < .14, 'feet and body extent retain their original scale');
    assert.ok(geometry.boundingBox.max.distanceTo(fullBounds.max) < .14, 'face and upper silhouette retain their original scale');
    if (level === 1) assert.ok(geometry.index.count / 3 < 3500, 'mid-distance skin has a bounded render cost');
    if (level === 2) assert.ok(geometry.index.count / 3 < 1500, 'far-distance skin has a bounded render cost');
    const indices = geometry.attributes.skinIndex, weights = geometry.attributes.skinWeight;
    for (let i = 0; i < indices.count; i++) {
      let sum = 0;
      for (let j = 0; j < 4; j++) {
        assert.ok(indices.array[i * 4 + j] < model.skeleton.bones.length);
        sum += weights.array[i * 4 + j];
      }
      assert.ok(Math.abs(sum - 1) < 1e-6);
      model.mesh.getVertexPosition(i, point);
      assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y) && Number.isFinite(point.z));
    }
    raycaster.set(new THREE.Vector3(0, 4, 0), new THREE.Vector3(0, -1, 0));
    assert.ok(raycaster.intersectObject(model.mesh, false).length > 0, 'the visible body remains targetable at every detail level');
  }
});
