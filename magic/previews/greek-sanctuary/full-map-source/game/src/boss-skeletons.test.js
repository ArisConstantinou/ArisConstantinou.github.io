import test from 'node:test';
import assert from 'node:assert/strict';
import { Bone, BufferGeometry, Group, Matrix4, Skeleton, SkinnedMesh } from 'three';
import { shareBossSkeletons } from './boss-characters.js';

test('boss skins share exactly equal live bindings, retaining different inverse binds and actors', () => {
  const model = new Group(), a = new Bone(), b = new Bone();
  model.add(a); a.add(b);
  function skin(bones, inverses) {
    const mesh = new SkinnedMesh(new BufferGeometry());
    mesh.skeleton = new Skeleton(bones, inverses); model.add(mesh); return mesh;
  }
  const first = skin([a, b], [new Matrix4(), new Matrix4()]);
  const second = skin([a, b], [new Matrix4(), new Matrix4()]);
  const differentBinding = skin([a, b], [new Matrix4(), new Matrix4().makeTranslation(.1, 0, 0)]);
  const differentActor = skin([new Bone(), new Bone()], [new Matrix4(), new Matrix4()]);
  assert.equal(shareBossSkeletons(model), 3);
  assert.equal(first.skeleton, second.skeleton);
  assert.notEqual(first.skeleton, differentBinding.skeleton);
  assert.notEqual(first.skeleton, differentActor.skeleton);
});
