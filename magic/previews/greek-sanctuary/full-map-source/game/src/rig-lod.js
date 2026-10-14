import * as THREE from 'three';
import { createLocalRigLoader } from './local-rig-loader.js';
import { prepareRigSurface } from './rig-surface-preparation.js';

const closeTemplates = new Map();
export function rigLodLevel(object, model) {
  // GLTFLoader puts a multi-material primitive underneath the original node.
  // That node owns Blender's custom properties; its child mesh does not.
  for (let node=object;node;node=node.parent) {
    if (node.userData.redesignLod !== undefined) {
      const level=Number(node.userData.redesignLod);
      if ([0,1,2].includes(level)) return level;
    }
    if (/LOD2/.test(node.name)) return 2;
    if (/LOD1/.test(node.name)) return 1;
    if (node===model) break;
  }
  return 1;
}
function loadClose(url) {
  if (!closeTemplates.has(url)) {
    const { loader, disposeDecoder } = createLocalRigLoader();
    closeTemplates.set(url, loader.loadAsync(url).then(async({scene}) => {
      await prepareRigSurface(scene);
      return {scene};
    }).finally(disposeDecoder));
  }
  return closeTemplates.get(url);
}

/** All distances share the actor's live joints and mixer. Close surfaces are
 * loaded once per type on demand, without an extra animated skeleton tree. */
export function createRigLod(group, model, { height, closeFile, farPixels = 100, visibilityRadius = height * .85 }) {
  const levels = new Map([[0, []], [1, []], [2, []]]), nodes = new Map(), bones = new Map();
  model.traverse(o => {
    nodes.set(o.name, o);
    if (o.isBone) bones.set(o.name, o);
    if (o.isMesh) {
      const level = rigLodLevel(o, model);
      o.userData.redesignLod = level;
      levels.get(level).push(o);
    }
  });
  if (!levels.get(1).length || !levels.get(2).length) throw Error('Missing tested rig LOD levels');
  const closeMaterials = new Map(), closeSkeletons = new Set(), tint = new THREE.Color(0xffffff);
  const bottom = new THREE.Vector3(), top = new THREE.Vector3(), worldScale = new THREE.Vector3();
  const visibilitySphere = new THREE.Sphere(), frustum = new THREE.Frustum(), viewProjection = new THREE.Matrix4();
  let level = 1, requested = false, disposed = false;
  function setLevel(next) {
    level = next;
    for (const [key, meshes] of levels) for (const mesh of meshes) mesh.visible = key === next;
    group.userData.redesignLod = next;
  }
  function install(gltf) {
    if (disposed) return;
    const sourceMeshes = [];
    gltf.scene.traverse(o => { if (o.isMesh) sourceMeshes.push(o); });
    for (const mesh of sourceMeshes) if (mesh.isSkinnedMesh) for (const bone of mesh.skeleton.bones) {
      if (!bones.has(bone.name)) throw Error('Close surface missing live joint ' + bone.name);
    }
    for (const source of sourceMeshes) {
      const mesh = source.clone(false);
      const parent = nodes.get(source.parent?.name) || model;
      if (source.isSkinnedMesh) {
        const targetBones = source.skeleton.bones.map(b => {
          const target = bones.get(b.name);
          if (!target) throw Error('Close surface missing live joint ' + b.name);
          return target;
        });
        const inverses = source.skeleton.boneInverses.map(m => m.clone());
        let skeleton = [...closeSkeletons].find(s => s.bones.length === targetBones.length
          && s.bones.every((b,i) => b === targetBones[i] && s.boneInverses[i].equals(inverses[i])));
        if (!skeleton) { skeleton = new THREE.Skeleton(targetBones, inverses);closeSkeletons.add(skeleton); }
        mesh.bind(skeleton, source.bindMatrix.clone());
        mesh.frustumCulled = false;
      }
      const copy = material => {
        const result = material.clone();
        closeMaterials.set(result, material.color.clone());
        result.color.multiply(tint);
        return result;
      };
      mesh.material = Array.isArray(source.material) ? source.material.map(copy) : copy(source.material);
      mesh.castShadow = mesh.receiveShadow = true;
      mesh.visible = false;
      mesh.userData.redesignLod = 0;
      parent.add(mesh);
      levels.get(0).push(mesh);
    }
    group.userData.closeRigLoaded = true;
  }
  function update(camera) {
    if (disposed || !camera) return;
    group.getWorldPosition(bottom);top.copy(bottom);top.y += height * group.getWorldScale(worldScale).y;
    visibilitySphere.center.copy(bottom).lerp(top,.5);
    visibilitySphere.radius=visibilityRadius*Math.max(Math.abs(worldScale.x),Math.abs(worldScale.y),Math.abs(worldScale.z));
    viewProjection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(viewProjection);
    let visible=frustum.intersectsSphere(visibilitySphere);
    for(let parent=group;parent&&visible;parent=parent.parent)visible=parent.visible;
    bottom.project(camera);top.project(camera);
    const pixels = Math.abs(top.y - bottom.y) * innerHeight / 2;
    group.userData.redesignPixels = pixels;
    if (visible && pixels > 280 && !requested) {
      requested = true;
      group.userData.closeRigRequested = true;
      loadClose(new URL(closeFile, document.baseURI).href).then(install).catch(error => {
        if (!disposed) group.userData.closeRigError = error.message;
      });
    }
    const close = visible && levels.get(0).length && pixels > (level === 0 ? 320 : 380);
    const far = !visible || pixels < farPixels * (level === 2 ? 1.15 : .85);
    setLevel(close ? 0 : far ? 2 : 1);
  }
  function setTint(multiplier) {
    tint.copy(multiplier);
    for (const [material, original] of closeMaterials) material.color.copy(original).multiply(tint);
  }
  function dispose() {
    disposed = true;
    for (const material of closeMaterials.keys()) material.dispose();
    for (const skeleton of closeSkeletons) skeleton.dispose();
    for (const mesh of levels.get(0)) mesh.removeFromParent();
    closeMaterials.clear();closeSkeletons.clear();levels.get(0).length = 0;
  }
  setLevel(1);
  return { update, setTint, dispose };
}
