import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js';

// Both source GLBs contain real textured, anatomically modelled humans, skinning
// and Mixamo rigs. They are local game assets; no model/CDN requests are needed.
// Michelle receives the Soldier's idle/walk/run motion through rest-pose-aware
// retargeting. Her included dance is deliberately never used by this game.
const ASSETS = {
  woman: new URL('./assets/people/Michelle.glb', import.meta.url).href,
  crew: new URL('./assets/people/Soldier.glb', import.meta.url).href,
};
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const COUNT = 24;
const clamp = THREE.MathUtils.clamp;
const normalizeBone = (name) => name.replace(/mixamorig/ig, '').replace(/[^a-z0-9]/ig, '').toLowerCase();
const _q0 = new THREE.Quaternion(), _q1 = new THREE.Quaternion(), _q2 = new THREE.Quaternion();
const _v0 = new THREE.Vector3(), _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3();
const _scale = new THREE.Vector3();

function bonesOf(model) {
  const list = [], map = new Map();
  model.traverse((node) => {
    if (node.isBone) { list.push(node); map.set(normalizeBone(node.name), node); }
  });
  return { list, map };
}

function applyPose(model, clips) {
  const clip = clips.find((c) => /t.?pose/i.test(c.name));
  if (clip) {
    const mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(clip).play();
    mixer.update(0);
    const pose = [];
    model.traverse((node) => pose.push({ node, position: node.position.clone(), quaternion: node.quaternion.clone(), scale: node.scale.clone() }));
    mixer.stopAllAction();
    mixer.uncacheRoot(model);
    // Stopping an AnimationAction restores its original bindings. Retain the
    // actual TPose sample rather than accidentally reverting to export state.
    for (const value of pose) {
      value.node.position.copy(value.position);
      value.node.quaternion.copy(value.quaternion);
      value.node.scale.copy(value.scale);
    }
  }
  model.updateMatrixWorld(true);
}

/** Bake local quaternion tracks from a world-space rest-pose rotation delta.
 * Keeping target joint translations preserves the woman's own proportions.
 * Source and target armatures have opposite X-axis root rotations, so simply
 * renaming tracks would twist the body. Explicit parent-space conversion avoids
 * that error, and the root displacement is scaled to the target's height.
 */
function retargetLocomotion(sourceGLTF, targetGLTF) {
  const source = cloneSkeleton(sourceGLTF.scene);
  const target = cloneSkeleton(targetGLTF.scene);
  applyPose(source, sourceGLTF.animations);
  applyPose(target, targetGLTF.animations);
  const sb = bonesOf(source), tb = bonesOf(target);
  const sourceAcross = sb.map.get('rightupleg').getWorldPosition(new THREE.Vector3())
    .sub(sb.map.get('leftupleg').getWorldPosition(new THREE.Vector3()));
  const targetAcross = tb.map.get('rightupleg').getWorldPosition(new THREE.Vector3())
    .sub(tb.map.get('leftupleg').getWorldPosition(new THREE.Vector3()));
  const yawAlignment = Math.atan2(targetAcross.x, targetAcross.z) - Math.atan2(sourceAcross.x, sourceAcross.z);
  const facingAlignment = new THREE.Quaternion().setFromAxisAngle(Y_AXIS, yawAlignment);
  const facingInverse = facingAlignment.clone().invert();
  const pairs = tb.list.map((bone) => {
    const sourceBone = sb.map.get(normalizeBone(bone.name));
    if (!sourceBone) return null;
    return {
      bone, sourceBone,
      sourceRestInverse: sourceBone.getWorldQuaternion(new THREE.Quaternion()).invert(),
      targetRest: bone.getWorldQuaternion(new THREE.Quaternion()),
      localRest: bone.quaternion.clone(),
      position: bone.position.clone(),
    };
  }).filter(Boolean);
  const sourceHip = sb.map.get('hips'), targetHip = tb.map.get('hips');
  const sourceHipRest = sourceHip.getWorldPosition(new THREE.Vector3());
  const targetHipRest = targetHip.getWorldPosition(new THREE.Vector3());
  const ratio = Math.max(0.5, Math.min(1.5, targetHipRest.y / sourceHipRest.y));
  const clips = [];
  for (const sourceClip of sourceGLTF.animations.filter((c) => /^(idle|walk|run)$/i.test(c.name))) {
    applyPose(source, sourceGLTF.animations);
    const mixer = new THREE.AnimationMixer(source);
    const action = mixer.clipAction(sourceClip).setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    const frames = Math.max(2, Math.ceil(sourceClip.duration * 24));
    const times = new Float32Array(frames + 1);
    const values = pairs.map(() => new Float32Array((frames + 1) * 4));
    const positions = new Float32Array((frames + 1) * 3);
    for (let frame = 0; frame <= frames; frame++) {
      const t = Math.min(sourceClip.duration, frame / frames * sourceClip.duration);
      times[frame] = t;
      mixer.setTime(t);
      source.updateMatrixWorld(true);
      // Restore only the target rig; no rest-pose geometry is ever rendered.
      for (const pair of pairs) {
        pair.bone.quaternion.copy(pair.localRest);
        pair.bone.position.copy(pair.position);
      }
      target.updateMatrixWorld(true);
      sourceHip.getWorldPosition(_v0).sub(sourceHipRest).applyQuaternion(facingAlignment).multiplyScalar(ratio).add(targetHipRest);
      // Remove net forward travel: deck movement is controlled by collision-safe
      // navigation, never by an animation taking a character through a wall.
      _v0.x = targetHipRest.x + (_v0.x - targetHipRest.x) * 0.28;
      _v0.z = targetHipRest.z + (_v0.z - targetHipRest.z) * 0.28;
      targetHip.parent.worldToLocal(_v0);
      targetHip.position.copy(_v0);
      positions.set([_v0.x, _v0.y, _v0.z], frame * 3);
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        pair.sourceBone.matrixWorld.decompose(_v1, _q0, _scale);
        _q0.multiply(pair.sourceRestInverse).premultiply(facingAlignment).multiply(facingInverse).multiply(pair.targetRest);
        pair.bone.parent.matrixWorld.decompose(_v1, _q1, _scale);
        _q1.invert().multiply(_q0).normalize();
        pair.bone.quaternion.copy(_q1);
        pair.bone.updateMatrix();
        pair.bone.matrixWorld.multiplyMatrices(pair.bone.parent.matrixWorld, pair.bone.matrix);
        values[i].set([_q1.x, _q1.y, _q1.z, _q1.w], frame * 4);
      }
    }
    const tracks = pairs.map((pair, i) => new THREE.QuaternionKeyframeTrack(`${pair.bone.name}.quaternion`, times, values[i]));
    tracks.push(new THREE.VectorKeyframeTrack(`${targetHip.name}.position`, times, positions));
    clips.push(new THREE.AnimationClip(sourceClip.name, sourceClip.duration, tracks));
    mixer.stopAllAction();
    mixer.uncacheRoot(source);
  }
  if (clips.length !== 3) throw new Error('Απουσιάζουν τα animations βάδισης των επιβατών.');
  return clips;
}

function sharedRescueProps() {
  const orange = new THREE.MeshStandardMaterial({ color: 0xff711c, roughness: 0.58, metalness: 0.04 });
  const white = new THREE.MeshStandardMaterial({ color: 0xf5f1da, roughness: 0.8 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x17222c, roughness: 0.94 });
  const ringGeo = new THREE.TorusGeometry(0.54, 0.108, 7, 28);
  const bandGeo = new THREE.TorusGeometry(0.541, 0.11, 7, 5, Math.PI * 0.16);
  const ropeGeo = new THREE.TorusGeometry(0.68, 0.018, 4, 28);
  const vestShape = new THREE.Shape();
  vestShape.moveTo(-0.26, -0.28);
  vestShape.lineTo(-0.28, 0.14);
  vestShape.quadraticCurveTo(-0.27, 0.28, -0.12, 0.27);
  vestShape.lineTo(-0.075, 0.09);
  vestShape.lineTo(0.075, 0.09);
  vestShape.lineTo(0.12, 0.27);
  vestShape.quadraticCurveTo(0.27, 0.28, 0.28, 0.14);
  vestShape.lineTo(0.26, -0.28);
  vestShape.closePath();
  const vestGeo = new THREE.ExtrudeGeometry(vestShape, {
    depth: 0.065, bevelEnabled: true, bevelSize: 0.037, bevelThickness: 0.04, bevelSegments: 2, steps: 1,
  });
  const reflectGeo = new THREE.PlaneGeometry(0.065, 0.135);
  const strapGeo = new THREE.BoxGeometry(0.51, 0.045, 0.017);
  return () => {
    const ring = new THREE.Group();
    ring.name = 'Σωσίβιο διάσωσης';
    const tube = new THREE.Mesh(ringGeo, orange);
    tube.rotation.x = Math.PI / 2;
    ring.add(tube);
    for (let i = 0; i < 4; i++) {
      const band = new THREE.Mesh(bandGeo, white);
      band.rotation.set(Math.PI / 2, 0, Math.PI / 2 * i);
      ring.add(band);
    }
    const rope = new THREE.Mesh(ropeGeo, white);
    rope.rotation.x = Math.PI / 2;
    ring.add(rope);
    const vest = new THREE.Group();
    vest.name = 'Ανακλαστικό σωσίβιο γιλέκο';
    const front = new THREE.Mesh(vestGeo, orange);
    front.position.z = 0.12;
    vest.add(front);
    for (const x of [-0.17, 0.17]) {
      const strip = new THREE.Mesh(reflectGeo, white);
      strip.position.set(x, 0.07, 0.229);
      vest.add(strip);
    }
    const strap = new THREE.Mesh(strapGeo, dark);
    strap.position.set(0, -0.17, 0.227);
    vest.add(strap);
    return { ring, vest };
  };
}

function tuneMaterials(model, variation, mobile) {
  model.traverse((mesh) => {
    if (!mesh.isMesh) return;
    mesh.castShadow = !mobile;
    mesh.receiveShadow = true;
    // Three's animated bounds otherwise need recomputing every frame and may
    // cull a person with raised hands. There are only 24 bounded characters.
    mesh.frustumCulled = false;
    const source = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const materials = source.map((material) => {
      const mat = material.clone();
      mat.roughness = Math.max(0.58, mat.roughness ?? 0.8);
      mat.metalness = Math.min(0.06, mat.metalness ?? 0);
      // Select only blue fabric in the actual texture. Skin and face pixels are
      // never globally tinted to simulate variety.
      const palette = [0xe4eeff, 0xedbdcd, 0xb0ddd5, 0xd6c5fc, 0xf3d7ae, 0xacbfff];
      const tint = new THREE.Color(palette[variation % palette.length]);
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.passengerClothTint = { value: tint };
        shader.fragmentShader = 'uniform vec3 passengerClothTint;\n' + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
          float clothMask = smoothstep(0.025, 0.13, diffuseColor.b - diffuseColor.r)
              * smoothstep(0.035, 0.12, diffuseColor.b);
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * passengerClothTint, clothMask * 0.72);
        `);
      };
      mat.customProgramCacheKey = () => 'passenger-selective-fabric-v1';
      return mat;
    });
    mesh.material = Array.isArray(mesh.material) ? materials : materials[0];
  });
}

function aimArm(p, side, direction, weight) {
  const arm = p.bones.map.get(side + 'arm');
  const elbow = p.bones.map.get(side + 'forearm');
  if (!arm || !elbow || weight <= 0.001) return;
  arm.getWorldPosition(_v0);
  elbow.getWorldPosition(_v1).sub(_v0).normalize();
  p.group.getWorldQuaternion(_q0);
  _v2.copy(direction).applyQuaternion(_q0).normalize();
  _q1.setFromUnitVectors(_v1, _v2);
  arm.getWorldQuaternion(_q2);
  _q1.multiply(_q2);
  arm.parent.getWorldQuaternion(_q2).invert();
  _q2.multiply(_q1);
  arm.quaternion.slerp(_q2, weight);
  arm.updateWorldMatrix(false, true);
}

/**
 * @returns Promise<{update,reset,getStats,jumpOne,rescueNear,ready:boolean}>
 * `state`: {panic:0..100,roll:radians,speed:m/s,heading:radians,playing:boolean,
 *           shipPosition:Vector3,waterHeight:(x,z,time)=>number}
 * Counts are disjoint: onboard + inWater + rescued + lost === 24.
 * Rescued people visibly return to the deck and cannot jump a second time.
 */
export async function createPassengers(shipGroup, deckZones, scene, { mobile = false, onEvent = () => {} } = {}) {
  if (!shipGroup?.isObject3D || !scene?.isScene || !deckZones?.length) {
    throw new Error('Δεν βρέθηκαν ασφαλείς ζώνες καταστρώματος για τους επιβάτες.');
  }
  const loader = new GLTFLoader();
  let woman, crew;
  try {
    [woman, crew] = await Promise.all([loader.loadAsync(ASSETS.woman), loader.loadAsync(ASSETS.crew)]);
  } catch (cause) {
    throw new Error('Δεν φορτώθηκαν τα 3D μοντέλα επιβατών. Δοκίμασε ξανά τη φόρτωση του παιχνιδιού.', { cause });
  }
  const womanClips = retargetLocomotion(crew, woman);
  const makeRescueProps = sharedRescueProps();
  const people = [];
  let lastState = { panic: 0, speed: 0, heading: 0, playing: false, roll: 0 };
  let lastTime = 0, jumpCooldown = 5, tick = 0;
  let seed = 641731;
  const random = () => { seed = (Math.imul(1664525, seed) + 1013904223) >>> 0; return seed / 4294967296; };
  const safeZone = (zone) => ({
    ...zone,
    minX: zone.minX + Math.min(0.30, (zone.maxX - zone.minX) * 0.15),
    maxX: zone.maxX - Math.min(0.30, (zone.maxX - zone.minX) * 0.15),
    minZ: zone.minZ + Math.min(0.4, (zone.maxZ - zone.minZ) * 0.12),
    maxZ: zone.maxZ - Math.min(0.4, (zone.maxZ - zone.minZ) * 0.12),
  });
  const zones = deckZones.map(safeZone);
  const announce = (type, person) => {
    try { onEvent({ type, count: 1, id: person.id }); } catch (error) { console.warn('Passenger event handler:', error); }
  };
  const waterAt = (x, z, time = lastTime) => Number(lastState.waterHeight?.(x, z, time) || 0);
  const pickTarget = (p, panic = 0) => {
    p.target.set(
      THREE.MathUtils.lerp(p.zone.minX, p.zone.maxX, random()),
      p.zone.y,
      THREE.MathUtils.lerp(p.zone.minZ, p.zone.maxZ, random()),
    );
    p.wait = panic > 45 ? random() * 0.7 : 1.2 + random() * 4.5;
  };
  const setMotion = (p, name) => {
    if (p.motion === name) return;
    const next = p.actions[name];
    if (!next) return;
    const previous = p.actions[p.motion];
    next.reset().setEffectiveWeight(1).play();
    if (previous) next.crossFadeFrom(previous, 0.28, true);
    p.motion = name;
  };

  for (let i = 0; i < COUNT; i++) {
    const isCrew = i % 4 === 0;
    const asset = isCrew ? crew : woman;
    const model = cloneSkeleton(asset.scene);
    applyPose(model, asset.animations);
    // The two original exports face opposite ways. Both navigators use +Z.
    if (isCrew) model.rotation.y += Math.PI;
    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model, true);
    const size = bounds.getSize(new THREE.Vector3());
    if (!Number.isFinite(size.y) || size.y < 0.1) throw new Error('Μη έγκυρη κλίμακα ανθρώπινου μοντέλου.');
    const height = (isCrew ? 1.81 : 1.69) + (i % 5) * 0.035;
    const scale = height / size.y;
    const center = bounds.getCenter(new THREE.Vector3());
    model.scale.multiplyScalar(scale);
    model.position.x -= center.x * scale;
    model.position.y -= bounds.min.y * scale;
    model.position.z -= center.z * scale;
    tuneMaterials(model, i, mobile);
    const group = new THREE.Group();
    group.name = `${isCrew ? 'Πλήρωμα' : 'Επιβάτης'} ${i + 1}`;
    group.add(model);
    shipGroup.add(group);
    const { ring, vest } = makeRescueProps();
    ring.position.y = 1.15;
    vest.position.y = height * 0.72;
    ring.visible = vest.visible = false;
    group.add(ring, vest);
    const mixer = new THREE.AnimationMixer(model);
    const clips = isCrew ? asset.animations.filter((c) => /^(idle|walk|run)$/i.test(c.name)) : womanClips;
    const actions = Object.fromEntries(clips.map((clip) => [clip.name.toLowerCase(), mixer.clipAction(clip)]));
    const zone = zones[i % zones.length];
    const bones = bonesOf(model);
    const gestureBones = ['leftarm', 'rightarm', 'leftforearm', 'rightforearm', 'spine2', 'head'].map((n) => bones.map.get(n)).filter(Boolean);
    const p = {
      id: i, crew: isCrew, alertUntil: 0, speechPosition: new THREE.Vector3(), group, model, mixer, actions, bones, gestureBones,
      gestureBase: gestureBones.map((b) => b.quaternion.clone()),
      height, zone, ring, vest, target: new THREE.Vector3(),
      velocity: new THREE.Vector3(), status: 'onboard', waterAge: 0,
      phase: i * 1.783, wait: 0, motion: null, animAccum: 0,
      stepSpeed: 0.75 + (i % 6) * 0.055,
    };
    people.push(p);
    setMotion(p, 'idle');
    mixer.update((i * 0.127) % 1);
    p.gestureBase.forEach((q, k) => q.copy(p.gestureBones[k].quaternion));
  }

  function placeOnDeck(p, rescued = false) {
    shipGroup.add(p.group);
    p.group.scale.set(1, 1, 1);
    p.group.position.set(
      THREE.MathUtils.lerp(p.zone.minX, p.zone.maxX, random()), p.zone.y,
      THREE.MathUtils.lerp(p.zone.minZ, p.zone.maxZ, random()),
    );
    p.group.rotation.set(0, random() * Math.PI * 2, 0);
    p.status = rescued ? 'rescued' : 'onboard';
    p.waterAge = 0;p.alertUntil=0;
    p.group.visible = true;
    p.ring.visible = false;
    p.vest.visible = rescued;
    p.velocity.set(0, 0, 0);
    pickTarget(p);
    setMotion(p, 'idle');
  }

  function reset() {
    seed = 641731;
    lastState = { panic: 0, speed: 0, heading: 0, playing: false, roll: 0 };
    jumpCooldown = 7;
    for (const p of people) {
      p.mixer.stopAllAction();
      p.motion = null;
      placeOnDeck(p, false);
      p.mixer.update((p.id * 0.127) % 1);
      p.gestureBase.forEach((q, k) => q.copy(p.gestureBones[k].quaternion));
    }
  }

  function jumpOne() {
    // Every person can eventually go overboard. The jump starts from their real
    // deck position and clears the outer hull by an aerial arc; nobody walks
    // through a cabin or teleports to a different deck to reach a railing.
    const eligible = people.filter((p) => p.status === 'onboard');
    if (!eligible.length) return false;
    const p = eligible[Math.floor(random() * eligible.length)];
    const side = Math.sign(p.group.position.x) || (p.id % 2 ? 1 : -1);
    const distanceToClearHull = Math.max(1.5, 12.8 - Math.abs(p.group.position.x));
    shipGroup.updateMatrixWorld(true);
    scene.attach(p.group);
    p.group.rotation.set(0, lastState.heading + side * Math.PI / 2, 0);
    _v0.set(side, 0, 0).applyAxisAngle(Y_AXIS, lastState.heading);
    _v1.set(0, 0, 1).applyAxisAngle(Y_AXIS, lastState.heading);
    // At the worst-case full 12 m beam, reach open water within 1.05 s while
    // still >2 m above the departure deck and its guardrail. Near-edge jumps
    // stay shorter. The inherited forward velocity follows the moving ship.
    p.velocity.copy(_v0).multiplyScalar(Math.max(4.4, distanceToClearHull / 1.05))
      .addScaledVector(_v1, Number(lastState.speed || 0) * 0.9);
    p.velocity.y = 7.6;
    p.status = 'jumping';
    p.waterAge = 0;
    p.ring.visible = p.vest.visible = true;
    setMotion(p, 'idle');
    announce('jump', p);
    return true;
  }

  function rescueNear(position, radius = 48) {
    if (Math.abs(Number(lastState.speed || 0)) >= 5 || !position) return 0;
    let count = 0;
    for (const p of people) {
      if (p.status !== 'inWater') continue;
      const dx = p.group.position.x - position.x, dz = p.group.position.z - position.z;
      if (dx * dx + dz * dz > radius * radius) continue;
      placeOnDeck(p, true);
      announce('rescue', p);
      count++;
    }
    return count;
  }

  function getStats() {
    const stats = { total: COUNT, onboard: 0, inWater: 0, rescued: 0, lost: 0, ready: true, modelCount: 2, inWaterPositions: [] };
    for (const p of people) {
      if (p.status === 'jumping' || p.status === 'inWater') {
        stats.inWater++;
        if (p.status === 'inWater') stats.inWaterPositions.push({ id: p.id, x: p.group.position.x, z: p.group.position.z });
      } else stats[p.status]++;
    }
    return stats;
  }

  function update(time, dt, state = {}) {
    lastState = { ...lastState, ...state };
    lastTime = time;
    const step = clamp(dt || 0, 0, 0.075);
    const panic = clamp(Number(lastState.panic || 0), 0, 100);
    const active = Boolean(lastState.playing);
    tick++;
    if (active) {
      jumpCooldown -= step;
      if (panic >= 77 && jumpCooldown <= 0) {
        jumpOne();
        jumpCooldown = THREE.MathUtils.lerp(7, 2.8, (panic - 77) / 23) + random() * 1.6;
      }
    }
    for (const p of people) {
      const personalPanic=p.alertUntil>time?Math.max(panic,58):panic;
      const onDeck = p.status === 'onboard' || p.status === 'rescued';
      let walking = false;
      if (onDeck && active) {
        p.wait -= step;
        const dx = p.target.x - p.group.position.x, dz = p.target.z - p.group.position.z;
        const distance = Math.hypot(dx, dz);
        if (distance < 0.25) {
          if (p.wait <= 0) pickTarget(p, panic);
        } else if (p.wait <= 0) {
          walking = true;
          const velocity = p.stepSpeed * (personalPanic > 48 && p.status !== 'rescued' ? 1.95 : 1);
          const move = Math.min(distance, velocity * step);
          let nx = p.group.position.x + dx / distance * move;
          let nz = p.group.position.z + dz / distance * move;
          // Pairwise body separation within the same walkable rectangle keeps
          // people from intersecting each other or pushing through a rail.
          for (const other of people) {
            if (other === p || other.zone !== p.zone || (other.status !== 'onboard' && other.status !== 'rescued')) continue;
            const ox = nx - other.group.position.x, oz = nz - other.group.position.z;
            const d2 = ox * ox + oz * oz;
            if (d2 < 0.47 * 0.47 && d2 > 0.0001) {
              const distanceApart = Math.sqrt(d2);
              const push = (0.47 - distanceApart) * 0.5;
              nx += ox / distanceApart * push;
              nz += oz / distanceApart * push;
            }
          }
          p.group.position.x = clamp(nx, p.zone.minX, p.zone.maxX);
          p.group.position.z = clamp(nz, p.zone.minZ, p.zone.maxZ);
          const wantedHeading = Math.atan2(dx, dz);
          const angle = Math.atan2(Math.sin(wantedHeading - p.group.rotation.y), Math.cos(wantedHeading - p.group.rotation.y));
          p.group.rotation.y += angle * Math.min(1, step * 6.5);
        }
        p.group.position.y = p.zone.y;
        p.group.rotation.z = clamp(-(lastState.roll || 0) * 0.28, -0.14, 0.14);
      }
      if (onDeck) setMotion(p, walking ? (personalPanic > 48 && p.status !== 'rescued' ? 'run' : 'walk') : 'idle');
      if (p.status === 'jumping' && active) {
        p.velocity.y -= 9.81 * step;
        p.group.position.addScaledVector(p.velocity, step);
        const sea = waterAt(p.group.position.x, p.group.position.z, time);
        if (p.group.position.y <= sea - 1.05) {
          p.group.position.y = sea - 1.05;
          p.status = 'inWater';
          p.velocity.multiplyScalar(0.1);
          p.velocity.y = 0;
        }
      }
      if (p.status === 'inWater' || p.status === 'lost') {
        if (active) {
          p.waterAge += step;
          p.group.position.x += (0.3 + p.velocity.x) * step;
          p.group.position.z += (0.55 + p.velocity.z) * step;
          p.velocity.multiplyScalar(Math.exp(-step * 0.6));
        }
        p.group.position.y = waterAt(p.group.position.x, p.group.position.z, time) - 1.05;
        p.group.rotation.z = Math.sin(time * 1.5 + p.phase) * 0.075;
        p.group.rotation.x = Math.sin(time * 1.15 + p.phase) * 0.05;
        p.ring.position.y = 1.14;
        if (p.status === 'inWater' && active) {
          const shipPosition = lastState.shipPosition || shipGroup.position;
          const distance = Math.hypot(p.group.position.x - shipPosition.x, p.group.position.z - shipPosition.z);
          if (p.waterAge > 85 || (p.waterAge > 75 && distance > 360)) {
            // "lost" means beyond this ship's rescue range. A lifejacket and
            // floating ring remain visible; no injury or drowning animation.
            p.status = 'lost';
            announce('lost', p);
          }
        }
      }

      // Limit skeletal evaluation to 20 Hz on mobile / 30 Hz on desktop;
      // positions and ship motion still follow every rendered frame.
      p.animAccum += step;
      if (p.animAccum >= (mobile ? 1 / 20 : 1 / 30)) {
        p.gestureBase.forEach((q, k) => p.gestureBones[k].quaternion.copy(q));
        p.mixer.update(p.animAccum * (p.status === 'inWater' ? 0.65 : 1));
        p.animAccum = 0;
        p.gestureBase.forEach((q, k) => q.copy(p.gestureBones[k].quaternion));
      } else {
        p.gestureBase.forEach((q, k) => p.gestureBones[k].quaternion.copy(q));
      }
      const afloat = !onDeck;
      const alarm = active && p.status === 'onboard' ? clamp((personalPanic - 42) / 48, 0, 1) : 0;
      if (afloat || alarm > 0.03) {
        p.group.updateWorldMatrix(true, true);
        const waving = Math.sin(time * 3.5 + p.phase) * 0.12;
        aimArm(p, 'left', _v0.set(0.8, afloat ? 0.25 : 0.75 + waving, 0.15).clone(), afloat ? 0.9 : alarm * 0.83);
        aimArm(p, 'right', _v0.set(-0.7, afloat ? 0.4 + waving : 1, 0.14).clone(), afloat ? 0.9 : alarm * 0.85);
      }
    }
  }

  function getSpeakers(){
    return people.filter(p=>p.group.visible&&p.status!=='lost').map(p=>{
      const head=p.bones.map.get('head');
      if(head)head.getWorldPosition(p.speechPosition);else p.group.getWorldPosition(p.speechPosition).y+=p.height;
      p.speechPosition.y+=.20;
      return {id:p.id,crew:p.crew,position:p.speechPosition,status:p.status};
    });
  }
  function alert(time){
    // Nearby lookouts react immediately; the rest hear the call over 1.5 seconds.
    for(const p of people){if(p.status==='onboard'){p.alertUntil=time+8;p.wait=Math.min(p.wait,(p.id%4)*.5);}}
  }
  reset();
  return {getSpeakers,alert, update, reset, getStats, jumpOne, rescueNear, ready: true };
}
