import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createCreature } from '../src/creatures.js';

const models = [];
const create = options => { const model = createCreature('frog', options); models.push(model); return model; };
after(() => models.forEach(model => model.dispose()));
const mesh = (model, name) => model.group.getObjectByName(name);

test('level and tier visibly grow the frog but never manufacture equipment', () => {
  const model = create({ level: 1, tier: 1 });
  const pivot = mesh(model, 'anatomical-animation-pivot'), original = pivot.scale.clone();
  for (const level of [2, 8, 25, 99]) {
    model.setLevel(level); model.setTier(3);
    assert.ok(pivot.scale.x > original.x);
    assert.ok(pivot.scale.x < original.x * 1.3, 'growth stays within physical collision readability');
    for (const name of ['armor', 'shell', 'bracers', 'crest']) assert.equal(mesh(model, name).visible, false);
    assert.equal(mesh(model, 'royal-crown'), undefined);
  }
});

test('crafted shell plates and bracers are real skinned meshes sharing their owner skeleton', () => {
  const model = create({ equipment: { armor: 'shell', weapon: 'reed', crest: true } });
  assert.equal(mesh(model, 'armor').visible, false);
  for (const name of ['shell', 'bracers', 'crest']) {
    const part = mesh(model, name);
    assert.ok(part.isSkinnedMesh && part.visible);
    assert.equal(part.skeleton, model.skeleton);
    assert.ok(part.geometry.index.count > 0);
    const point = new THREE.Vector3();
    for (let i = 0; i < part.geometry.attributes.position.count; i++) {
      part.getVertexPosition(i, point);
      assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y) && Number.isFinite(point.z));
    }
  }
  assert.notEqual(mesh(model, 'armor').geometry, mesh(model, 'shell').geometry, 'rare armor is visibly a different authored object');
});

test('crafted gear survives upgrades, real motion, all LODs and crowning without creating duplicate models', () => {
  const model = create({ equipment: { armor: 'shell', weapon: 'reed', crest: true }, level: 12 });
  const skeleton = model.skeleton;
  for (const lod of [0, 1, 2, 0]) {
    model.setRenderLOD(lod); model.setTier(lod + 1); model.setLevel(20);
    model.update(.05, { time: lod + 1.4, speed: 8, attack: { type: 'kick', phase: .5 } });
    assert.equal(model.skeleton, skeleton);
    assert.equal(mesh(model, 'shell').visible, true); assert.equal(mesh(model, 'bracers').visible, true);
    assert.equal(mesh(model, 'crest').visible, true);
    assert.equal(mesh(model, 'shell').castShadow, lod === 0);
  }
  model.setCrowned(true); assert.equal(mesh(model, 'crest').visible, false);
  assert.equal(mesh(model, 'shell').visible, true);
  model.setCrowned(false); assert.equal(mesh(model, 'crest').visible, true);
  model.setEquipment({});
  for (const name of ['armor', 'shell', 'bracers', 'crest']) assert.equal(mesh(model, name).visible, false);
});

test('equipment templates are shared per detail level and different frogs cannot equip each other', () => {
  const a = create({ equipment: { armor: 'shell', weapon: 'reed' } }), b = create({ equipment: { armor: 'reed' } });
  for (const lod of [0, 1, 2]) {
    a.setRenderLOD(lod); b.setRenderLOD(lod);
    assert.equal(mesh(a, 'shell').geometry, mesh(b, 'shell').geometry);
    assert.equal(mesh(a, 'bracers').geometry, mesh(b, 'bracers').geometry);
    assert.notEqual(mesh(a, 'shell').material, mesh(b, 'shell').material);
    assert.equal(mesh(a, 'shell').visible, true); assert.equal(mesh(b, 'shell').visible, false);
    assert.ok(mesh(a, 'shell').geometry.index.count / 3 < (lod === 0 ? 1500 : lod === 1 ? 400 : 250));
  }
  const returned = a.equipment; returned.armor = null;
  assert.equal(a.equipment.armor, 'shell', 'inspection cannot mutate equipped state behind the visibility update');
});
