import * as THREE from 'three';
import { createLocalRigLoader } from './local-rig-loader.js';
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createRigLocomotion } from './locomotion.js';
import { createRigLod } from './rig-lod.js';
import { createMagicHandTargeting } from './magic-hand-targeting.js';
import { createMageGarment } from './mage-garment.js';
import { createTwoHandWeaponGrip } from './two-hand-weapon-grip.js';

// KayKit Adventurers, CC0. Original meshes, atlas textures, rigs and animation
// data are bundled locally; see public/assets-credit.json for pinned sources.
const MODEL_FILES = {
  mage: 'redesign/mage-meshy-native-lods.glb',
  guard: 'redesign/guard-meshy-lods.glb',
  archer: 'archer.glb',
  heavy: 'redesign/heavy-meshy-native-lods.glb',
};
const HEIGHT = 1.85;
const templates = new Map();
let loadPromise;

function combineCompatibleSkinParts(scene, animations) {
  const skins=[];scene.updateMatrixWorld(true);scene.traverse(object=>{if(object.isSkinnedMesh)skins.push(object);});
  const groups=[];
  for(const skin of skins){
    if(skin.children.length||animations.some(clip=>clip.tracks.some(track=>track.name.startsWith(skin.name+'.'))))continue;
    const group=groups.find(g=>g[0].parent===skin.parent&&g[0].material===skin.material&&g[0].matrix.equals(skin.matrix)
      &&g[0].userData.redesignLod===skin.userData.redesignLod
      &&g[0].bindMode===skin.bindMode&&g[0].bindMatrix.equals(skin.bindMatrix)
      &&g[0].skeleton.bones.length===skin.skeleton.bones.length
      &&g[0].skeleton.bones.every((bone,i)=>bone===skin.skeleton.bones[i]&&g[0].skeleton.boneInverses[i].equals(skin.skeleton.boneInverses[i])));
    if(group)group.push(skin);else groups.push([skin]);
  }
  for(const group of groups){
    if(group.length<2)continue;
    const geometry=mergeGeometries(group.map(skin=>skin.geometry),false);
    if(!geometry)continue;
    // Exact concatenation retains all vertices, UVs, normals, indices, weights
    // and joints. Accessories stay attached to their original bones.
    group[0].geometry=geometry;group[0].name='Combined skin body';
    for(const skin of group.slice(1))skin.removeFromParent();
  }
}

function modelUrl(filename) {
  const base = import.meta.env?.BASE_URL || './';
  return `${base.endsWith('/') ? base : `${base}/`}models/${filename}`;
}

function isUpperBody(track) {
  return /^(spine|chest|head|upperarm|lowerarm|wrist|hand|finger_|Axe|cape)/i.test(track.name);
}

function withoutHorizontalRootMotion(source) {
  const clip = source.clone();
  for (const track of clip.tracks) {
    if (!/^(root|Rig)\.position$/i.test(track.name)) continue;
    for (let i = 0; i < track.values.length; i += 3) {
      track.values[i] = 0;
      track.values[i + 2] = 0;
    }
  }
  return clip;
}

// Combine the original walk/run legs with the original casting upper body.
// The result remains a skeletal animation: casting while moving never freezes
// the feet into a sliding pose and does not rotate the gameplay pivot.
function movementWithCasting(locomotion, spell, name) {
  const tracks = locomotion.tracks.filter(track => !isUpperBody(track)).map(track => track.clone());
  for (const source of spell.tracks.filter(isUpperBody)) {
    const track = source.clone();
    const durationScale = locomotion.duration / Math.max(0.001, spell.duration);
    for (let i = 0; i < track.times.length; i++) track.times[i] *= durationScale;
    tracks.push(track);
  }
  return new THREE.AnimationClip(name, locomotion.duration, tracks);
}

/**
 * Load all four bundled character templates. Call once before createCharacter.
 * onProgress receives (fraction, { loaded, total, kind }) with fraction 0..1.
 * Rejects on a missing/broken asset instead of replacing a human with primitives.
 */
export async function loadCharacters(onProgress = () => {}) {
  if (templates.size === Object.keys(MODEL_FILES).length) {
    onProgress(1, { loaded: templates.size, total: templates.size, kind: null });
    return [...templates.keys()];
  }
  if (loadPromise) {
    await loadPromise;
    onProgress(1, { loaded: templates.size, total: templates.size, kind: null });
    return [...templates.keys()];
  }

  const { loader, disposeDecoder } = createLocalRigLoader();
  const entries = Object.entries(MODEL_FILES);
  let loaded = 0;
  onProgress(0, { loaded, total: entries.length, kind: null });
  const jobs = entries.map(async ([kind, file]) => {
    const gltf = await loader.loadAsync(modelUrl(file));
    let skinnedCount = 0;
    gltf.scene.traverse(object => { if (object.isSkinnedMesh) skinnedCount++; });
    if (!skinnedCount || !gltf.animations.length) {
      throw new Error(`Character ${kind} is missing its rig or animation clips.`);
    }
    combineCompatibleSkinParts(gltf.scene,gltf.animations);
    const clips = new Map(gltf.animations.map(clip => [clip.name, withoutHorizontalRootMotion(clip)]));
    // Combat clips author a forward hip lunge. Applying that full-body lunge
    // during backwards travel makes a planted ankle physically unreachable.
    // Keep the authored strike/recoil above the waist; grounded legs/hips are
    // owned by the contact solver, including movement during the whole attack.
    for(const name of ['Spellcast_Shoot','1H_Melee_Attack_Slice_Horizontal','2H_Ranged_Shoot','2H_Melee_Attack_Chop','Hit_A']){
      const source=clips.get(name);if(source)clips.set(name,new THREE.AnimationClip(name,source.duration,source.tracks.filter(isUpperBody).map(track=>track.clone())));
    }
    if (kind === 'mage') {
      for (const [locomotion, name] of [['Walking_A', 'Walking_Casting'], ['Running_A', 'Running_Casting']]) {
        clips.set(name, movementWithCasting(clips.get(locomotion), clips.get('Spellcasting'), name));
      }
    }
    if (kind === 'guard' && clips.has('Blocking')) {
      for (const [movement, name] of [['Walking_A', 'Walking_Blocking'], ['Running_A', 'Running_Blocking']]) {
        clips.set(name, movementWithCasting(clips.get(movement), clips.get('Blocking'), name));
      }
    }
    templates.set(kind, { scene: gltf.scene, clips, preservePbr: file.startsWith('redesign/'), closeFile:file.startsWith('redesign/')?'models/'+file.replace(/-lods\.glb$/,'-close.glb'):null });
    loaded++;
    onProgress(loaded / entries.length, { loaded, total: entries.length, kind });
  });
  loadPromise = Promise.all(jobs);

  try {
    await loadPromise;
    return [...templates.keys()];
  } catch (error) {
    templates.clear();
    loadPromise = undefined;
    throw error;
  } finally {
    await Promise.allSettled(jobs);
    disposeDecoder();
  }
}

/**
 * Return a separately animated character with its pivot at its feet, +Z forward,
 * and a standing body/hat height of 1.85 world units. The outer group is owned by
 * gameplay: this module never changes its position, rotation, scale or visibility.
 *
 * update(dt, { moving, speed, casting, attack, dead, stunned })
 * - dt: seconds; speed: world units / second (normally 0..5).
 * - casting: sustained telekinesis / magic stance.
 * - attack: a boolean pulse or held input; one frame is enough to finish a swing.
 * - dead/stunned: take priority over locomotion and attacks.
 */
export function createCharacter(kind = 'mage') {
  if (!MODEL_FILES[kind]) throw new Error(`Unknown character kind: ${kind}`);
  const template = templates.get(kind);
  if (!template) throw new Error('Call and await loadCharacters() before creating characters.');

  const group = new THREE.Group();
  group.name = `character-${kind}`;
  group.userData.kind = kind;
  group.userData.characterHeight = HEIGHT;

  const model = cloneSkeleton(template.scene);
  model.name = `${kind}-visual`;
  group.add(model);

  // Geometry and textures are immutable/shared. Materials and skeletons belong
  // to this instance, so tinting or removing a guard cannot affect another one.
  const materials = new Map();
  const baseColors = new Map();
  model.traverse(object => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
    if (object.isSkinnedMesh) object.frustumCulled = false;
    const cloneMaterial = source => {
      if (!materials.has(source)) {
        const material = source.clone();
        if (!template.preservePbr) material.roughness = Math.max(0.64, material.roughness || 0);
        materials.set(source, material);
        baseColors.set(material, material.color.clone());
      }
      return materials.get(source);
    };
    object.material = Array.isArray(object.material)
      ? object.material.map(cloneMaterial)
      : cloneMaterial(object.material);
  });

  // SkeletonUtils clones a skin per mesh even when all meshes in this actor
  // use the same rig. Share identical rigs WITHIN this actor only: one bone
  // update/texture upload per pass, with unchanged weights, clips and geometry.
  const actorSkeletons=[];
  model.traverse(object=>{
    if(!object.isSkinnedMesh)return;
    const skin=object.skeleton;
    const same=actorSkeletons.find(other=>other.bones.length===skin.bones.length
      &&other.bones.every((bone,i)=>bone===skin.bones[i]&&other.boneInverses[i].equals(skin.boneInverses[i])));
    if(same){if(skin!==same)skin.dispose();object.skeleton=same;}else actorSkeletons.push(skin);
  });
  const mixer = new THREE.AnimationMixer(model);
  const actions = new Map();
  const phase = Math.random();
  let currentAction;
  let currentName = '';
  let transient = null;
  let wasAttacking = false;
  let wasStunned = false;
  let wasDead = false;
  let disposed = false;

  function getAction(name) {
    const actualName = template.clips.has(name) ? name : 'Idle';
    if (!actions.has(actualName)) actions.set(actualName, mixer.clipAction(template.clips.get(actualName)));
    return actions.get(actualName);
  }

  function play(name, { once = false, speed = 1, restart = false, fade = 0.14 } = {}) {
    if (name === currentName && !restart) {
      currentAction.setEffectiveTimeScale(speed);
      return currentAction;
    }
    const next = getAction(name);
    next.reset();
    next.enabled = true;
    next.clampWhenFinished = once;
    next.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, once ? 1 : Infinity);
    next.setEffectiveWeight(1);
    next.setEffectiveTimeScale(speed);
    if (!once && /^(Idle|Walking|Running)/.test(name)) next.time = phase * next.getClip().duration;
    next.play();
    if (currentAction && currentAction !== next && fade > 0) {
      next.crossFadeFrom(currentAction, fade, false);
    } else if (currentAction && currentAction !== next) {
      currentAction.stop();
    }
    currentAction = next;
    currentName = name;
    group.userData.animationState = name;
    return next;
  }

  // Measure the actual deformed standing body, including its hat/cape but not
  // weapon reach. Preserving source X/Z origin keeps the pivot between the feet.
  play('Idle', { fade: 0 });
  currentAction.time = 0;
  mixer.update(0);
  model.updateMatrixWorld(true);
  model.traverse(object => { if (object.isSkinnedMesh) object.skeleton.update(); });
  const standingBounds = new THREE.Box3();
  const partBounds = new THREE.Box3();
  model.traverse(object => {
    if (!object.isMesh || /sword|shield|axe|crossbow|staff|wand|knife|spellbook/i.test(object.name)) return;
    partBounds.setFromObject(object, true);
    standingBounds.union(partBounds);
  });
  const sourceHeight = standingBounds.max.y - standingBounds.min.y;
  if (!Number.isFinite(sourceHeight) || sourceHeight < 0.1) throw new Error(`Invalid bounds for ${kind}.`);
  const normalization = HEIGHT / sourceHeight;
  model.scale.setScalar(normalization);
  model.position.y = -standingBounds.min.y * normalization;
  group.userData.sourceHeight = sourceHeight;
  group.userData.normalizationScale = normalization;
  model.updateMatrixWorld(true);
  const legBones = {};
  model.traverse(o => { if(o.isBone) legBones[o.name] = o; });
  const locomotion = createRigLocomotion(group, model, ['l','r'].map(side => ({
    upper: legBones['upperleg'+side], lower: legBones['lowerleg'+side], foot: legBones['foot'+side]
  })), { stride: .72, lift: .16, travelFacing:kind==='mage', allFeetReach: kind==='heavy'&&template.preservePbr });
  const magicHands = kind==='mage'&&template.preservePbr ? createMagicHandTargeting(group,model,legBones) : null;
  const weaponGrip = kind==='heavy'&&template.preservePbr ? createTwoHandWeaponGrip(model,legBones) : null;
  let dashOffset = 0;
  const rigLod = template.preservePbr ? createRigLod(group, model, {height:HEIGHT,closeFile:template.closeFile,farPixels:100}) : null;
  const garment = magicHands ? createMageGarment(group,model,legBones) : null;
  currentAction.time = phase * currentAction.getClip().duration;
  mixer.update(0);

  const attackClip = {
    mage: 'Spellcast_Shoot',
    guard: '1H_Melee_Attack_Slice_Horizontal',
    archer: '2H_Ranged_Shoot',
    heavy: '2H_Melee_Attack_Chop',
  }[kind];

  function update(dt, options = {}) {
    if (disposed) return;
    garment?.beforeAnimation();magicHands?.beforeAnimation();weaponGrip?.beforeAnimation();locomotion.beforeAnimation(); model.position.y -= dashOffset; dashOffset = 0;
    const step = THREE.MathUtils.clamp(Number.isFinite(dt) ? dt : 0, 0, 0.1);
    const { moving = false, casting = false, attack = false, dead = false, stunned = false } = options;
    const worldSpeed = Math.max(0, Number.isFinite(options.speed) ? options.speed : (moving ? 2 : 0));
    const walking = Boolean(moving) && worldSpeed > 0.02;
    const isAttacking = Boolean(attack);
    const isStunned = Boolean(stunned);
    const isDead = Boolean(dead);

    if (isDead) {
      transient = null;
      play('Death_B', { once: true, restart: !wasDead, fade: 0.09 });
    } else if (isStunned) {
      transient = null;
      play('Hit_A', { once: true, restart: !wasStunned || wasDead, fade: 0.07 });
    } else {
      if (wasDead || wasStunned) transient = null;
      if (transient) transient.remaining -= step;
      if (transient && transient.remaining <= 0) transient = null;
      if (isAttacking && (!wasAttacking || !transient)) {
        // The independently animated two-hand axe reaches contact at 66%
        // of its authored clip. Preserve the gameplay windup/damage time.
        const attackSpeed = kind === 'heavy' && template.preservePbr
          ? getAction(attackClip).getClip().duration * .66 / Math.max(.1, options.attackWindup || .9)
          : kind === 'heavy' ? 0.96 : 1.25;
        const action = play(attackClip, { once: true, speed: attackSpeed, restart: true, fade: 0.09 });
        transient = { remaining: action.getClip().duration / attackSpeed };
      }

      if (!transient) {
        let name;
        let animationSpeed = 1;
        if (walking) {
          const running = worldSpeed >= locomotion.gait.runningThreshold*group.scale.y;
          name = running ? 'Running_A' : 'Walking_A';
          animationSpeed = running
            ? THREE.MathUtils.clamp(worldSpeed / 3.3, 0.72, 1.55)
            : THREE.MathUtils.clamp(worldSpeed / 1.6, 0.55, 1.55);
          if (kind === 'mage' && casting) name = running ? 'Running_Casting' : 'Walking_Casting';
          if (kind === 'guard' && options.blocking) name = running ? 'Running_Blocking' : 'Walking_Blocking';
        } else if (kind === 'mage' && casting) {
          name = 'Spellcasting';
        } else if (kind === 'guard' && options.blocking) {
          name = 'Blocking';
        } else if (kind === 'archer') {
          name = '2H_Ranged_Aiming';
        } else if (kind === 'heavy') {
          name = '2H_Melee_Idle';
        } else {
          name = 'Idle';
        }
        play(name, { speed: animationSpeed });
      }
    }

    wasAttacking = isAttacking;
    wasStunned = isStunned;
    wasDead = isDead;
    mixer.update(step);
    const dash = Math.max(0, options.dash || 0);
    if (dash > 0) { dashOffset = Math.sin(Math.PI * Math.min(1, 1-dash)) * .48; model.position.y += dashOffset; }
    locomotion.update(step, { grounded: options.grounded !== false, airborne: options.airborne || dash > 0, dead: isDead,heading:options.heading,align:alignGait });
    magicHands?.update(step,options.castTarget,{enabled:casting,disabled:isDead||isStunned});
    weaponGrip?.update();
    garment?.update(step,{disabled:isDead||isStunned||options.grounded===false||options.airborne||dash>0});
    rigLod?.update(options.camera);
  }

  function setTint(value = 0xffffff, amount = 1) {
    if (disposed) return;
    const tint = new THREE.Color(value);
    const multiplier = new THREE.Color(0xffffff).lerp(tint, THREE.MathUtils.clamp(amount, 0, 1));
    for (const [material, original] of baseColors) material.color.copy(original).multiply(multiplier);
    rigLod?.setTint(multiplier);
  }
  function alignGait(gait){if(/^(Walking|Running)/.test(currentName)){currentAction.time=(gait.phase%1)*currentAction.getClip().duration;mixer.update(0);}}

  function reset() {
    if (disposed) return;
    garment?.reset();magicHands?.reset();weaponGrip?.reset();locomotion.reset(); model.position.y -= dashOffset; dashOffset = 0;
    mixer.stopAllAction();
    currentAction = undefined;
    currentName = '';
    transient = null;
    wasAttacking = false;
    wasStunned = false;
    wasDead = false;
    setTint();
    play('Idle', { fade: 0 });
    mixer.update(0);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    mixer.stopAllAction();
    mixer.uncacheRoot(model);
    rigLod?.dispose();
    for (const material of materials.values()) material.dispose();
    const skeletons = new Set();
    model.traverse(object => { if (object.isSkinnedMesh) skeletons.add(object.skeleton); });
    for (const skeleton of skeletons) skeleton.dispose();
    group.removeFromParent();
    group.clear();
  }

  return { group, model, locomotion, magicHands, garment, weaponGrip, update, setTint, reset, dispose };
}
