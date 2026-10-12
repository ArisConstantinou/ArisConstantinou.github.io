import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

const templates = new Map();
export const BOSS_TYPES = ['colossus', 'gargoyle', 'wraith'];

export async function loadBossCharacters(types = BOSS_TYPES) {
  const loader = new GLTFLoader();
  await Promise.all(types.map(async type => {
    if (templates.has(type)) return;
    const gltf = await loader.loadAsync(new URL(`models/bosses/${type}.glb`,document.baseURI).href);
    if (!gltf.animations.length) throw new Error(`Boss ${type} has no animations`);
    let skins = 0;
    gltf.scene.traverse(o => { if (o.isSkinnedMesh) skins++; });
    if (!skins) throw new Error(`Boss ${type} has no skinned rig`);
    templates.set(type, gltf);
  }));
}

/** Each instance owns its skeleton, mixer and materials; shared geometry is immutable. */
export function createBossCharacter(type) {
  const template = templates.get(type);
  if (!template) throw new Error(`Boss ${type} was not loaded`);
  const group = new THREE.Group();
  const model = clone(template.scene);
  model.rotation.y = Math.PI; // Blender +Y front exports as glTF -Z.
  group.add(model);
  const materials = [];
  model.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = o.receiveShadow = true;
    const copy = m => { const n = m.clone(); n.userData.initialTransparent=n.transparent; materials.push(n); return n; };
    o.material = Array.isArray(o.material) ? o.material.map(copy) : copy(o.material);
  });
  const mixer = new THREE.AnimationMixer(model);
  const clips = new Map(template.animations.map(c => [c.name, c]));
  const actions = new Map();
  let action, current = '', disposed = false;
  function play(name, once = false) {
    if (!clips.has(name)) throw new Error(`Boss ${type} is missing clip ${name}`);
    if (name === current) return action;
    const next = actions.get(name) || mixer.clipAction(clips.get(name));
    actions.set(name, next);
    next.reset().setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, once ? 1 : Infinity);
    next.clampWhenFinished = once;
    next.play();
    if (action) next.crossFadeFrom(action, .09, false);
    action = next; current = name; group.userData.animationState = name;
    return action;
  }
  function update(dt, options = {}) {
    if (disposed) return;
    const name = options.dead ? 'Death' : options.stunned ? 'Stagger' : options.clip || (options.moving ? 'Walk' : 'Idle');
    const once = !['Idle', 'Walk', 'Hover'].includes(name);
    const a = play(name, once);
    a.setEffectiveTimeScale(options.moving && name === 'Walk' ? Math.max(.5, Math.min(1.5, (options.speed || 1.4) / 1.4)) : 1);
    mixer.update(Math.max(0, Math.min(.1, dt)));
    if (Number.isFinite(options.time)) {
      a.time = Math.min(clips.get(name).duration, Math.max(0, options.time));
      mixer.update(0);
    }
    model.updateMatrixWorld(true);
    if(type==='wraith'){
      const opacity=options.dead?Math.max(0,Math.min(1,(3-(options.time||0))/1.2)):1;
      for(const material of materials){const transparent=material.userData.initialTransparent||opacity<1;if(material.transparent!==transparent){material.transparent=transparent;material.needsUpdate=true;}material.opacity=opacity;}
    }
  }
  function reset() { mixer.stopAllAction(); current=''; action=null; update(0); }
  function dispose() {
    if (disposed) return;
    disposed=true; mixer.stopAllAction(); mixer.uncacheRoot(model);
    materials.forEach(m => m.dispose());
    model.traverse(o => { if (o.isSkinnedMesh) o.skeleton.dispose(); });
    group.removeFromParent();
  }
  update(0);
  return {group, model, mixer, clips, update, reset, dispose};
}
