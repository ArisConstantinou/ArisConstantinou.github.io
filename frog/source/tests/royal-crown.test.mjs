import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createCreature } from '../src/creatures.js';

const models = [];
const create = (options = {}, type = 'frog') => { const model = createCreature(type, options); models.push(model); return model; };
after(() => models.forEach(model => model.dispose()));
const crownOf = model => model.group.getObjectByName('royal-crown');
const triangles = mesh => (mesh.geometry.index?.count || mesh.geometry.attributes.position.count) / 3;
const closeMatrix = (actual, expected) => actual.elements.forEach((n, i) => assert.ok(Math.abs(n - expected.elements[i]) < 1e-9));

test('a noble and promoted NPCs never receive a crown from their level or equipment tier', () => {
  for (const team of ['player', 'ally', 'neutral', 'enemy']) {
    const model = create({ team, tier: 5 });
    assert.equal(model.crowned, false);
    assert.equal(crownOf(model), undefined, 'no crown meshes or materials are allocated before coronation');
    model.setCrowned(false); model.setTier(5); model.setRenderLOD(2); model.setRenderLOD(0);
    assert.equal(crownOf(model), undefined);
    assert.equal(model.group.getObjectByName('crest').visible, false, 'even promoted nobles need to craft their crest');
  }
  const fish = create({}, 'fish');
  assert.equal(fish.setCrowned(true), false, 'a predator cannot accidentally gain frog regalia');
  assert.equal(crownOf(fish), undefined);
});

test('the six-point circlet fits the real head surface and leaves the forward eyes clear', () => {
  const model = create({ crowned: true, team: 'player' });
  model.update(0, { time: 0 }); model.group.updateMatrixWorld(true);
  const crown = crownOf(model), gold = crown.getObjectByName('royal-crown-gold');
  const position = gold.geometry.attributes.position, p = new THREE.Vector3(), start = new THREE.Vector3();
  const ray = new THREE.Raycaster(), down = new THREE.Vector3(0, -1, 0);
  let peaks = 0;
  for (let i = 0; i < 48; i++) {
    const bottom = i * 4, top = bottom + 1;
    if (position.getY(top) - position.getY(bottom) > .30) peaks++;
    p.fromBufferAttribute(position, bottom).applyMatrix4(gold.matrixWorld);
    start.copy(p); start.y += 1; ray.set(start, down);
    const hit = ray.intersectObject(model.mesh, false)[0];
    assert.ok(hit, 'every part of the circlet rests above the actual frog head');
    assert.ok(Math.abs(p.y - hit.point.y) < .045, 'the fitted band neither floats nor sinks into the skull');
  }
  assert.equal(peaks, 6, 'six high points give the crown a distinct royal silhouette');
  const head = model.bones.head.getWorldPosition(new THREE.Vector3());
  const bounds = new THREE.Box3().setFromObject(gold);
  assert.ok(bounds.max.y - head.y > .48, 'the points visibly rise above the head and eye ridges');
  const eyeZ = Math.min(model.bones.eyeL.getWorldPosition(new THREE.Vector3()).z, model.bones.eyeR.getWorldPosition(new THREE.Vector3()).z);
  assert.ok(bounds.max.z < eyeZ - .10, 'the crown sits behind the eyes instead of covering the face');
  assert.ok(bounds.getSize(new THREE.Vector3()).x > .50, 'the circlet is large enough to read on the main character');
});

test('royal headwear follows the head during running, swimming, roaring, jumping and attacks', () => {
  const model = create({ crowned: true, tier: 3, role: 'hunter' });
  model.group.position.set(21, 3, -8); model.group.rotation.y = 1.4; model.group.scale.setScalar(1.8);
  const crown = crownOf(model), original = new THREE.Vector3();
  model.group.updateMatrixWorld(true); crown.getWorldPosition(original);
  const local = crown.matrix.clone();
  let moved = false;
  for (const state of [
    { time: 1.2, speed: 9 }, { time: 2.4, speed: 6, swimming: true },
    { time: 3.6, roar: 1 }, { time: 4.8, jump: .5 },
    { time: 5.1, attack: { type: 'tongue', phase: .5 } },
    { time: 5.4, attack: { type: 'kick', phase: .5 } },
    { time: 5.7, attack: { type: 'slam', phase: .5 } }
  ]) {
    model.update(.08, state); model.group.updateMatrixWorld(true);
    assert.equal(crown.parent, model.bones.head);
    const relative = model.bones.head.matrixWorld.clone().invert().multiply(crown.matrixWorld);
    closeMatrix(relative, local);
    moved ||= crown.getWorldPosition(new THREE.Vector3()).distanceTo(original) > .02;
  }
  assert.ok(moved, 'head motion is actually exercised rather than checking a static pose');
});

test('coronation survives detail and tier changes, without conflicting leaf crests or repeated meshes', () => {
  const model = create({ tier: 3, equipment: { armor: 'reed', crest: true } });
  const body = model.mesh.geometry;
  model.setCrowned(true);
  const crown = crownOf(model), gold = crown.getObjectByName('royal-crown-gold');
  assert.equal(model.group.getObjectByName('crest').visible, false, 'the leaf crest cannot intersect royal headwear');
  for (const [lod, tier] of [[2, 5], [1, 1], [0, 3], [2, 2], [0, 5]]) {
    model.setRenderLOD(lod); model.setTier(tier); model.setCrowned(true);
    assert.equal(crownOf(model), crown, 'coronation updates reuse the same headwear');
    assert.ok(crown.visible && model.crowned);
    assert.equal(model.group.getObjectByName('crest').visible, false);
    assert.equal(gold.castShadow, lod === 0, 'far crowns do not bring back a distant shadow pass');
    assert.equal(model.group.getObjectByName('armor').visible, true, 'crafted armor is independent of tier');
  }
  assert.equal(model.mesh.geometry, body, 'full-detail skin is retained after a round trip');
  model.setCrowned(false);
  assert.equal(crown.visible, false);
  assert.equal(model.group.getObjectByName('crest').visible, true);
});

test('the king and portrait share a small crown geometry while owning independent appearance resources', () => {
  const king = create({ crowned: true }), portrait = create({ crowned: true });
  const a = crownOf(king), b = crownOf(portrait);
  assert.notEqual(a, b);
  for (const name of ['royal-crown-gold', 'royal-crown-ruby']) {
    assert.equal(a.getObjectByName(name).geometry, b.getObjectByName(name).geometry);
    assert.notEqual(a.getObjectByName(name).material, b.getObjectByName(name).material);
  }
  const meshes = []; a.traverseVisible(mesh => { if (mesh.isMesh) meshes.push(mesh); });
  assert.equal(meshes.length, 2, 'one gold pass and one small faceted jewel');
  assert.ok(meshes.reduce((sum, mesh) => sum + triangles(mesh), 0) <= 400, 'the crown adds less than 400 triangles');
});
