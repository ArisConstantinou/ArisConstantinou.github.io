import {loadGltfAsset} from './asset-loading.js';
import * as THREE from 'three';
import { createLocalRigLoader } from './local-rig-loader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { createRigLocomotion } from './locomotion.js';
import { createRigLod } from './rig-lod.js';
import { createWraithChainConstraints } from './wraith-chain-constraints.js';

const templates = new Map();
export const BOSS_TYPES = ['colossus', 'gargoyle', 'wraith'];

/** SkeletonUtils owns the cloned joints, but creates a Skeleton per skin.
 * Share only exactly equal bindings inside this one actor. */
export function shareBossSkeletons(model) {
  const skeletons = [];
  model.traverse(o => {
    if (!o.isSkinnedMesh) return;
    const current = o.skeleton;
    const shared = skeletons.find(s => s.bones.length === current.bones.length
      && s.bones.every((b, i) => b === current.bones[i] && s.boneInverses[i].equals(current.boneInverses[i])));
    if (shared && shared !== current) { current.dispose(); o.skeleton = shared; }
    else if (!shared) skeletons.push(current);
  });
  return skeletons.length;
}

export async function loadBossCharacters(types = BOSS_TYPES) {
  const { loader, disposeDecoder } = createLocalRigLoader();
  const jobs = types.map(async type => {
    if (templates.has(type)) return;
    const file = type === 'colossus' ? 'models/redesign/colossus-meshy-lods.glb'
      : type === 'wraith' ? 'models/redesign/wraith-1-6-1-lods.glb' : 'models/redesign/gargoyle-mobile-optimized-lods.glb';
    const gltf = await loadGltfAsset(loader,new URL(file,document.baseURI).href);
    if (!gltf.animations.length) throw new Error(`Boss ${type} has no animations`);
    let skins = 0;
    gltf.scene.traverse(o => { if (o.isSkinnedMesh) skins++; });
    if (!skins) throw new Error(`Boss ${type} has no skinned rig`);
    templates.set(type, {scene:gltf.scene,animations:gltf.animations});
  });
  try { await Promise.all(jobs); }
  finally { await Promise.allSettled(jobs); disposeDecoder(); }
}

/** Each instance owns its skeleton, mixer and materials; shared geometry is immutable. */
export function createBossCharacter(type) {
  const template = templates.get(type);
  if (!template) throw new Error(`Boss ${type} was not loaded`);
  const group = new THREE.Group();
  const model = clone(template.scene);
  shareBossSkeletons(model);
  model.rotation.y = type === 'colossus' ? Math.PI : 0; // Authored Wraith/Gargoyle sources face glTF +Z.
  group.add(model);
  const materials = [];
  model.traverse(o => {
    if (!o.isMesh) return;
    if (o.isSkinnedMesh) o.frustumCulled = false;
    o.castShadow = o.receiveShadow = true;
    const copy = m => { const n = m.clone(); n.userData.initialTransparent=n.transparent; materials.push(n); return n; };
    o.material = Array.isArray(o.material) ? o.material.map(copy) : copy(o.material);
  });
  const mixer = new THREE.AnimationMixer(model);
  const rigLod = type === 'colossus' ? createRigLod(group,model,{height:3.4,closeFile:'models/redesign/colossus-meshy-close.glb',farPixels:155})
    : type === 'wraith' ? createRigLod(group,model,{height:3.3,closeFile:'models/redesign/wraith-1-6-1-close.glb',farPixels:155})
    : createRigLod(group,model,{height:3.2,closeFile:'models/redesign/gargoyle-mobile-close.glb',farPixels:155});
  const chainConstraints = type === 'wraith' ? createWraithChainConstraints(model) : null;
  const clips = new Map(template.animations.map(c => [c.name, c]));
  const actions = new Map();
  let action, current = '', disposed = false, locomotion, hoverTime = 0, hoverOffset = 0;
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
    locomotion?.beforeAnimation();model.position.y-=hoverOffset;hoverOffset=0;
    let name = options.dead ? 'Death' : options.stunned ? 'Stagger' : options.clip || (options.moving ? 'Walk' : 'Idle');
    if(type==='wraith'&&['Idle','Walk'].includes(name))name='Hover';
    if(type==='gargoyle'&&!options.dead&&!options.stunned&&options.flying!==false&&['Idle','Walk'].includes(name))name='Hover';
    const once = !['Idle', 'Walk', 'Hover'].includes(name);
    const a = play(name, once);
    a.setEffectiveTimeScale(options.moving && name === 'Walk' ? Math.max(.5, Math.min(1.5, (options.speed || 1.4) / 1.4)) : 1);
    mixer.update(Math.max(0, Math.min(.1, dt)));
    if (Number.isFinite(options.time)) {
      a.time = Math.min(clips.get(name).duration, Math.max(0, options.time));
      mixer.update(0);
    }
    model.updateMatrixWorld(true);
    chainConstraints?.update();
    const flying=type==='gargoyle'&&(name==='Hover'||name==='Dive'&&(options.flying??((options.time??a.time)>.4&&(options.time??a.time)<1.8)));
    locomotion?.update(dt,{grounded:options.grounded!==false&&!flying,airborne:options.airborne,dead:options.dead,align:alignGait});
    rigLod?.update(options.camera);
    if(type==='wraith'){
      hoverTime+=Math.max(0,dt);hoverOffset=options.dead?.14:.19+.035*Math.sin(hoverTime*3.1)+.015*Math.sin(hoverTime*6.7);model.position.y+=hoverOffset;
      const opacity=options.dead?Math.max(0,Math.min(1,(3-(options.time||0))/1.2)):1;
      // Close skins arrive asynchronously and also need the real death fade.
      const fade = material => {material.userData.initialTransparent??=material.transparent;const transparent=material.userData.initialTransparent||opacity<1;if(material.transparent!==transparent){material.transparent=transparent;material.needsUpdate=true;}material.opacity=opacity;};
      model.traverse(o=>{if(o.isMesh){if(Array.isArray(o.material))o.material.forEach(fade);else fade(o.material);}});
    }
  }
  function alignGait(gait){if(current==='Walk'){action.time=(gait.phase%1)*clips.get('Walk').duration;mixer.update(0);}}
  function reset() { locomotion?.reset();mixer.stopAllAction(); current=''; action=null; update(0); }
  function dispose() {
    if (disposed) return;
    disposed=true; mixer.stopAllAction(); mixer.uncacheRoot(model);
    rigLod?.dispose();
    materials.forEach(m => m.dispose());
    model.traverse(o => { if (o.isSkinnedMesh) o.skeleton.dispose(); });
    group.removeFromParent();
  }
  update(0,{flying:false});
  // Gargoyle has an authored digitigrade hip/knee/hock/ankle chain. The old
  // two-segment biped solver cannot preserve that chain's planted contacts.
  if(type==='colossus'){
    const bones={};model.traverse(o=>{if(o.isBone)bones[o.name]=o;});
    locomotion=createRigLocomotion(group,model,['L','R'].map(s=>({upper:bones['thigh_'+s],lower:bones['shin_'+s],foot:bones['foot_'+s]})),{allFeetReach:type==='colossus',stride:type==='colossus'?.84:.72,lift:type==='colossus'?.22:.19});
  }
  return {group, model, mixer, clips, locomotion, chainConstraints, update, reset, dispose};
}
