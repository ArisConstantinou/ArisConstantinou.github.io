// character-refresh-player.mjs
import * as THREE2 from "three";
import { clone as clone3 } from "three/addons/utils/SkeletonUtils.js";

// character-refresh-ik.mjs
import { Vector3, Quaternion, Matrix4 } from "three";
function createFrogIK(skeleton) {
  const bones = Object.fromEntries(skeleton.bones.map((b) => [b.name, b])), rig = bones.pelvis.parent, positions = {}, restQ = {}, localQ = {};
  rig.updateWorldMatrix(true, true);
  const inverse = new Matrix4().copy(rig.matrixWorld).invert(), qInverse = rig.getWorldQuaternion(new Quaternion()).invert();
  for (const [name, b] of Object.entries(bones)) {
    positions[name] = b.getWorldPosition(new Vector3()).applyMatrix4(inverse);
    restQ[name] = qInverse.clone().multiply(b.getWorldQuaternion(new Quaternion()));
    localQ[name] = b.quaternion.clone();
  }
  const update = () => rig.updateWorldMatrix(true, true), world = (name) => bones[name].getWorldPosition(new Vector3()), localDirection = (d) => d.clone().applyQuaternion(rig.getWorldQuaternion(new Quaternion()).invert());
  function orient(name, q) {
    update();
    const parentQ = rig.getWorldQuaternion(new Quaternion()).invert().multiply(bones[name].parent.getWorldQuaternion(new Quaternion()));
    bones[name].quaternion.copy(parentQ.invert().multiply(q));
    update();
  }
  function align(name, axis, direction) {
    orient(name, new Quaternion().setFromUnitVectors(axis.clone().normalize(), direction.clone().normalize()).multiply(restQ[name]));
  }
  function two(a, b, c, target, pole, kneeDrop = null, planeRoll = false) {
    update();
    const start = rig.worldToLocal(world(a)), l1 = positions[b].distanceTo(positions[a]), l2 = positions[c].distanceTo(positions[b]), axis = target.clone().sub(start), d = Math.max(Math.abs(l1 - l2) + 1e-7, Math.min(axis.length(), l1 + l2 - 1e-7));
    axis.normalize();
    const bend = pole.clone().sub(start).projectOnPlane(axis);
    if (bend.lengthSq() < 1e-14) bend.set(1, 0, 0).projectOnPlane(axis);
    bend.normalize();
    const along = (l1 * l1 - l2 * l2 + d * d) / (2 * d), radius = Math.sqrt(Math.max(0, l1 * l1 - along * along)), center = start.clone().addScaledVector(axis, along);
    if (kneeDrop !== null && radius > 1e-8) {
      const up = localDirection(new Vector3(0, 1, 0)), u = up.clone().projectOnPlane(axis), height = u.length();
      if (height > 1e-6) {
        u.normalize();
        const v = axis.clone().cross(u).normalize(), cos = Math.max(-1, Math.min(1, (up.dot(start) - kneeDrop - up.dot(center)) / (radius * height))), sign = v.dot(bend) >= 0 ? 1 : -1;
        bend.copy(u).multiplyScalar(cos).addScaledVector(v, sign * Math.sqrt(Math.max(0, 1 - cos * cos)));
      }
    }
    const knee = center.addScaledVector(bend, radius), ab = positions[b].clone().sub(positions[a]), bc = positions[c].clone().sub(positions[b]), AB = knee.clone().sub(start), BC = target.clone().sub(knee), bindNormal = ab.clone().cross(bc), normal = AB.clone().cross(BC);
    if (planeRoll > 0 && bindNormal.lengthSq() > 1e-14 && normal.lengthSq() > 1e-14) {
      const frame = (axis2, n) => {
        axis2 = axis2.clone().normalize();
        n = n.clone().normalize();
        return new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(axis2, n.clone().cross(axis2).normalize(), n));
      };
      const qa = frame(AB, normal).multiply(frame(ab, bindNormal).invert()).multiply(restQ[a]), qb = frame(BC, normal).multiply(frame(bc, bindNormal).invert()).multiply(restQ[b]);
      orient(a, new Quaternion().setFromUnitVectors(ab.clone().normalize(), AB.clone().normalize()).multiply(restQ[a]).slerp(qa, planeRoll));
      orient(b, new Quaternion().setFromUnitVectors(bc.clone().normalize(), BC.clone().normalize()).multiply(restQ[b]).slerp(qb, planeRoll));
    } else {
      align(a, ab, AB);
      align(b, bc, BC);
    }
  }
  function hind(side, goalWorld, tarsalWorld, footWorldQ, poleWorld, seated = null) {
    update();
    const [a, b, c, d] = ["hip", "knee", "ankle", "foot"].map((n) => n + side), target = rig.worldToLocal(goalWorld.clone()), hip = rig.worldToLocal(world(a)), l1 = positions[a].distanceTo(positions[b]), l2 = positions[b].distanceTo(positions[c]), l3 = positions[c].distanceTo(positions[d]), direction = target.clone().sub(hip).normalize();
    let tarsal = localDirection(tarsalWorld).normalize(), ankle = target.clone().addScaledVector(tarsal, -l3);
    if (ankle.distanceTo(hip) > l1 + l2 - 1e-6) for (let i = 0; i <= 20; i++) {
      const trial = tarsal.clone().lerp(direction, i / 20).normalize();
      ankle.copy(target).addScaledVector(trial, -l3);
      if (ankle.distanceTo(hip) <= l1 + l2 - 1e-6) {
        tarsal = trial;
        break;
      }
    }
    const pole = hip.clone().add(localDirection(poleWorld || new Vector3(side * 0.3, -0.15, 0.7)));
    two(a, b, c, ankle, pole, seated?.kneeDrop ?? null, seated?.usePlaneRoll ? seated.planeRollWeight ?? 1 : 0);
    align(c, positions[d].clone().sub(positions[c]), target.clone().sub(ankle));
    orient(d, rig.getWorldQuaternion(new Quaternion()).invert().multiply(footWorldQ));
  }
  function fore(side, goalWorld, handWorldQ, poleWorld) {
    update();
    const [a, b, c] = ["shoulder", "elbow", "wrist"].map((n) => n + side), shoulder = world(a), start = rig.worldToLocal(shoulder.clone()), pole = start.clone().add(localDirection(poleWorld || new Vector3(side * 0.6, -0.2, 0.05))), requested = shoulder.distanceTo(goalWorld), maximum = positions[a].distanceTo(positions[b]) + positions[b].distanceTo(positions[c]);
    two(a, b, c, rig.worldToLocal(goalWorld.clone()), pole);
    const upperQ = bones[a].getWorldQuaternion(new Quaternion()), lowerQ = bones[b].getWorldQuaternion(new Quaternion()), heads = [world(a), world(b), world(c)];
    bones[c].quaternion.copy(localQ[c]);
    update();
    const neutral = bones[c].getWorldQuaternion(new Quaternion()), difference = handWorldQ.clone().multiply(neutral.invert()), axis = heads[2].clone().sub(heads[1]).normalize();
    let angle = 2 * Math.atan2(new Vector3(difference.x, difference.y, difference.z).dot(axis), difference.w);
    angle = Math.atan2(Math.sin(angle), Math.cos(angle));
    const inverse2 = rig.getWorldQuaternion(new Quaternion()).invert(), upperAxis = heads[1].clone().sub(heads[0]).normalize();
    orient(a, inverse2.clone().multiply(new Quaternion().setFromAxisAngle(upperAxis, angle * 0.5).multiply(upperQ)));
    orient(b, inverse2.clone().multiply(new Quaternion().setFromAxisAngle(axis, angle).multiply(lowerQ)));
    orient(c, inverse2.clone().multiply(handWorldQ));
    const jointPositionError = Math.max(...[a, b, c].map((name, i) => world(name).distanceTo(heads[i])));
    if (jointPositionError > 1e-6) throw Error("Arm roll changed joint targets");
    return { requested, maximum, endError: world(c).distanceTo(goalWorld), jointPositionError, forearmTwistDegrees: angle * 180 / Math.PI };
  }
  return { hind, fore, world, resetLimbs() {
    for (const s of [-1, 1]) for (const n of ["hip", "knee", "ankle", "foot", "shoulder", "elbow", "wrist"]) bones[n + s].quaternion.copy(localQ[n + s]);
    update();
  } };
}

// character-refresh-clip-sampler.mjs
import { PropertyBinding } from "three";
function createClipPoseSampler(root, clip) {
  const channels = clip.tracks.map((track) => {
    const binding = PropertyBinding.create(root, track.name);
    binding.bind();
    return { binding, interpolant: track.createInterpolant() };
  });
  return { sample(seconds) {
    for (const c of channels) c.binding.setValue(c.interpolant.evaluate(seconds), 0);
  }, dispose() {
    for (const c of channels) c.binding.unbind();
  } };
}

// character-refresh-mounted-data.mjs
var MOUNTED_DATA = { "candidateSHA256": "14b032f1515606fe65c4757bb026e2f96cd14a03571d3535b54436fb9834e5c8", "controlsSHA256": "41db77c201e9a9714c2bbee0ef00522106f8c30d2bb634f285ed525e5a863cb6", "legacyGroupOffset": 1.2205, "gameActionDuration": 0.87, "sourceActionDuration": 0.8666666666666667, "maximumControlAngle": 0.13962634015954636, "palms": [{ "side": -1, "node": "Fatty_control_-1", "basePosition": [-0.33000001311302185, 1.12185800075531, 0.23000000417232513], "baseQuaternion": [0, 0, 0, 1], "contactLocal": [0, 0.34752998026684945, 0], "normalLocal": [-0.024878841579206275, 0.9952206573978151, 0.09442926628083922], "anchor": 23733, "anchorBind": [-0.41184085607528687, 0.23890718817710876, 0.136727437376976], "anchorError": 10385222925947161e-23, "vertices": 488 }, { "side": 1, "node": "Fatty_control_1", "basePosition": [0.33000001311302185, 1.110265851020813, 0.23000000417232513], "baseQuaternion": [0, 0, 0, 1], "contactLocal": [0, 0.34752998026684945, 0], "normalLocal": [-0.024878841579206275, 0.9952206573978151, 0.09442926628083922], "anchor": 16648, "anchorBind": [0.40876397490501404, 0.24455901980400085, 0.13403090834617615], "anchorError": 12566498151721596e-23, "vertices": 488 }], "support": { "anchor": 21006, "anchorBind": [-0.30027276277542114, 0.001216429634951055, 0.04164977744221687], "point": [-0.3523678183555603, 1.2901415824890137, -0.005780068226158619], "normal": [0, 1, 0], "anchorError": 20319813921507367e-23 }, "sourceForwardOffset": 0.05 };
function controlAngleForProgress(progress) {
  const smooth2 = (t) => {
    t = Math.max(0, Math.min(1, t));
    return t * t * (3 - 2 * t);
  }, time = Math.max(0, Math.min(1, progress)) * 0.87, press = time < 0.1 ? smooth2(time / 0.1) : time < 0.3 ? 1 : 1 - smooth2((time - 0.3) / 0.57);
  return Math.PI * 8 / 180 * press;
}

// character-refresh-face-layer.mjs
import * as THREE from "three";
function createFaceLayer({ bones, group, skins, enabled = false }) {
  const jaw = bones.jaw, head = bones.head;
  if (!jaw || !head) throw Error("Face layer requires head/jaw joints");
  const body = skins.find((mesh) => mesh.userData.frogRole === "body"), anchors = [];
  if (enabled) {
    const metadata = body?.userData.mouthAnchors;
    if (!metadata) throw Error("Real-mouth skin requires upper/lower lip anchors");
    const position = body.geometry.attributes.position;
    for (const name of ["upper", "lower"]) {
      const wanted = new THREE.Vector3(...metadata[name]);
      let best = -1, error = Infinity;
      for (let i = 0; i < position.count; i++) {
        const d = new THREE.Vector3().fromBufferAttribute(position, i).distanceTo(wanted);
        if (d < error) {
          error = d;
          best = i;
        }
      }
      if (error > 1e-6) throw Error("Mouth anchor does not match current body geometry");
      anchors.push(best);
    }
  }
  group.updateMatrixWorld(true);
  const headInverse = head.getWorldQuaternion(new THREE.Quaternion()).invert(), lateralInHead = new THREE.Vector3(1, 0, 0).applyQuaternion(headInverse), forwardInHead = new THREE.Vector3(0, 0, 1).applyQuaternion(group.getWorldQuaternion(new THREE.Quaternion())).applyQuaternion(headInverse), baseline = jaw.quaternion.clone();
  let angle = 0;
  return { enabled, captureBase() {
    baseline.copy(jaw.quaternion);
    angle = 0;
  }, applyJaw(radians = 0) {
    if (!Number.isFinite(radians) || radians < 0 || radians > THREE.MathUtils.degToRad(26) + 1e-7) throw Error("Jaw angle outside verified0..26degree source range");
    if (!enabled) {
      if (radians !== 0) throw Error("Current geometry has no skinned oral cavity");
      return 0;
    }
    jaw.quaternion.copy(baseline);
    group.updateMatrixWorld(true);
    const worldAxis = lateralInHead.clone().applyQuaternion(head.getWorldQuaternion(new THREE.Quaternion())), localAxis = worldAxis.applyQuaternion(jaw.getWorldQuaternion(new THREE.Quaternion()).invert()).normalize();
    jaw.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(localAxis, radians));
    angle = radians;
    group.updateMatrixWorld(true);
    for (const mesh of skins) mesh.skeleton.update();
    return angle;
  }, lipWorld(lower = false, target = new THREE.Vector3()) {
    if (!enabled) return null;
    group.updateMatrixWorld(true);
    body.skeleton.update();
    return body.getVertexPosition(anchors[lower ? 1 : 0], target).applyMatrix4(body.matrixWorld);
  }, tongueFrame() {
    if (!enabled) return null;
    group.updateMatrixWorld(true);
    body.skeleton.update();
    const rotation = head.getWorldQuaternion(new THREE.Quaternion()), axis = lateralInHead.clone().applyQuaternion(rotation).normalize(), forward = forwardInHead.clone().applyQuaternion(rotation).normalize(), up = forward.clone().cross(axis).normalize();
    forward.copy(axis).cross(up).normalize();
    const lower = body.getVertexPosition(anchors[1], new THREE.Vector3()).applyMatrix4(body.matrixWorld);
    return { base: lower.addScaledVector(up, 4e-3).addScaledVector(forward, -0.01), forward, up, lateral: axis };
  }, mouthWorld(target = new THREE.Vector3()) {
    if (!enabled) return null;
    group.updateMatrixWorld(true);
    body.skeleton.update();
    const upper = body.getVertexPosition(anchors[0], new THREE.Vector3()).applyMatrix4(body.matrixWorld), lower = body.getVertexPosition(anchors[1], new THREE.Vector3()).applyMatrix4(body.matrixWorld);
    return target.copy(upper).lerp(lower, 0.5);
  }, inspect() {
    return { enabled, jawAngle: angle, jointScaleUnit: jaw.scale.distanceTo(new THREE.Vector3(1, 1, 1)) < 1e-7, lipAnchors: anchors };
  } };
}

// character-refresh-face-action.mjs
import { RULES } from "./arcade-model.js";
var smooth = (x, a, b) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
function fattyFaceAction(actor) {
  if (actor.ko || actor.eliminated) return { kind: "rest", phase: 1, jawAngle: 0 };
  if (actor.tongue > 0) {
    const phase = Math.max(0, Math.min(1, 1 - actor.tongue / RULES.tongueInterval));
    return { kind: "collect", phase, jawAngle: 26 * Math.PI / 180 * smooth(phase, 0, 0.12) * (1 - smooth(phase, 0.82, 1)) };
  }
  if (actor.shot > 0) {
    const phase = Math.max(0, Math.min(1, 1 - actor.shot / RULES.shotInterval));
    return { kind: "shoot", phase, jawAngle: 20 * Math.PI / 180 * (1 - smooth(phase, 0.25, 1)) };
  }
  return { kind: "rest", phase: 1, jawAngle: 0 };
}

// character-refresh-anatomy-layer.mjs
import * as T2 from "three";
import { clone as clone2 } from "three/addons/utils/SkeletonUtils.js";

// character-refresh-retarget-legs.mjs
import * as T from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";

// character-refresh-anatomy-layer.mjs
var worldQ = (b) => b.getWorldQuaternion(new T2.Quaternion());
function setWorldQ(b, q) {
  b.quaternion.copy(worldQ(b.parent).invert().multiply(q));
}
function solveLinear(A, b) {
  const n = b.length, m = A.map((r, i) => [...r, b[i]]);
  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(m[i][k]) > Math.abs(m[pivot][k])) pivot = i;
    [m[k], m[pivot]] = [m[pivot], m[k]];
    if (Math.abs(m[k][k]) < 1e-14) return Array(n).fill(0);
    const d = m[k][k];
    for (let j = k; j <= n; j++) m[k][j] /= d;
    for (let i = 0; i < n; i++) if (i !== k) {
      const q = m[i][k];
      for (let j = k; j <= n; j++) m[i][j] -= q * m[k][j];
    }
  }
  return m.map((r) => r[n]);
}
function createAnatomyPoseLayer({ bones, group, mesh, ik, ground, supportSurface, actor }) {
  const regions = mesh.userData.anatomyDigitRegions;
  if (!bones.neck || !regions) return null;
  const restDigits = Object.fromEntries(Object.entries(bones).filter(([n]) => /^(finger|toe)/.test(n)).map(([n, b]) => [n, b.quaternion.clone()])), restQ = Object.fromEntries(Object.entries(bones).map(([n, b]) => [n, worldQ(b)])), neckRest = Object.fromEntries(["spine", "head", "neck"].map((n) => [n, new T2.Quaternion(...bones[n].userData.anatomyRestWorldQuaternion)])), cache = {}, point = new T2.Vector3(), last = { digits: [], solves: [], neck: true }, palmFrames = {}, foreLengths = Object.fromEntries([-1, 1].map((side) => [side, bones["shoulder" + side].getWorldPosition(new T2.Vector3()).distanceTo(bones["elbow" + side].getWorldPosition(new T2.Vector3())) + bones["elbow" + side].getWorldPosition(new T2.Vector3()).distanceTo(bones["wrist" + side].getWorldPosition(new T2.Vector3()))])), restTarsal = Object.fromEntries([-1, 1].map((side) => [side, bones["foot" + side].getWorldPosition(new T2.Vector3()).sub(bones["ankle" + side].getWorldPosition(new T2.Vector3()))]));
  const update = () => {
    group.updateMatrixWorld(true);
    mesh.skeleton.update();
  };
  const frame = (normal, forward) => {
    forward = forward.clone().projectOnPlane(normal).normalize();
    return new T2.Quaternion().setFromRotationMatrix(new T2.Matrix4().makeBasis(normal.clone().cross(forward).normalize(), normal, forward));
  };
  for (const side of [-1, 1]) {
    const rows = regions.filter((r) => r.fore && r.side === side), points = rows.map((r) => new T2.Vector3(...r.center)), normal = points[1].clone().sub(points[0]).cross(points[2].clone().sub(points[0])).normalize();
    if (normal.z < 0) normal.negate();
    const wrist = bones["wrist" + side].getWorldPosition(new T2.Vector3()), forward = points.slice(0, 3).reduce((s, v) => s.add(v), new T2.Vector3()).multiplyScalar(1 / 3).sub(wrist);
    palmFrames[side] = frame(normal, forward);
  }
  const toeFlexAxes = Object.fromEntries(regions.filter((r) => !r.fore).map((r) => {
    const direction = new T2.Vector3(...r.center).sub(bones["foot" + r.side].getWorldPosition(new T2.Vector3())), axis = new T2.Vector3(0, 1, 0).cross(direction).normalize().applyQuaternion(restQ[r.name].clone().invert());
    return [r.name, axis];
  }));
  const a = mesh.geometry.attributes, whole = {};
  for (const side of [-1, 1]) for (const fore of [true, false]) {
    const ids = [];
    for (let i = 0; i < a.position.count; i++) {
      if (a.position.getX(i) * side < 0.1 || a.position.getY(i) > (fore ? 0.31 : 0.075)) continue;
      let total = 0;
      for (let k = 0; k < 4; k++) {
        const n = mesh.skeleton.bones[a.skinIndex.getComponent(i, k)].name;
        if (fore ? n === "wrist" + side || n.startsWith("finger" + side + "_") : n === "ankle" + side || n === "foot" + side || n.startsWith("toe" + side + "_")) total += a.skinWeight.getComponent(i, k);
      }
      if (total > 0.5) ids.push(i);
    }
    if (!ids.length) throw Error("Missing full bearing surface");
    whole[(fore ? "fore" : "hind") + side] = ids;
  }
  function gap(ids) {
    let minimum = Infinity;
    const sourceSupport = actor.support?.id ?? actor.flight?.sourceSupport;
    for (const i of ids) {
      mesh.getVertexPosition(i, point).applyMatrix4(mesh.matrixWorld);
      const surface = sourceSupport == null ? null : supportSurface?.(sourceSupport, point.x, point.z), floor = surface ?? ground(point.x, point.z);
      minimum = Math.min(minimum, point.y - floor);
    }
    return minimum;
  }
  let readyWeight = 0;
  return {
    applyReadyStance(amount = 1) {
      readyWeight = Math.max(0, Math.min(1, amount));
      if (readyWeight === 0) return;
      update();
      const belly = bones.belly.matrixWorld.clone(), head = worldQ(bones.head), yaw = worldQ(group), axis = new T2.Vector3(1, 0, 0).applyQuaternion(yaw), pelvis = bones.pelvis.getWorldPosition(new T2.Vector3());
      pelvis.y -= 0.11 * readyWeight;
      setWorldQ(bones.pelvis, new T2.Quaternion().setFromAxisAngle(axis, 9 * Math.PI / 180 * readyWeight).multiply(worldQ(bones.pelvis)));
      update();
      bones.pelvis.position.copy(bones.pelvis.parent.worldToLocal(pelvis));
      update();
      setWorldQ(bones.spine, new T2.Quaternion().setFromAxisAngle(axis, -30 * Math.PI / 180 * readyWeight).multiply(worldQ(bones.spine)));
      update();
      bones.belly.parent.matrixWorld.clone().invert().multiply(belly).decompose(bones.belly.position, bones.belly.quaternion, bones.belly.scale);
      setWorldQ(bones.head, new T2.Quaternion().setFromAxisAngle(axis, -23 * Math.PI / 180 * readyWeight).multiply(head));
      update();
    },
    resetDigits() {
      readyWeight = 0;
      last.airClearance = [];
      for (const [n, q] of Object.entries(restDigits)) bones[n].quaternion.copy(q);
    },
    setRecoveryBlend(amount) {
      readyWeight = Math.max(0, Math.min(1, amount));
    },
    applyAirPose(time) {
      const profile = mesh.userData.anatomyJumpExtension, index = Math.max(0, Math.min(profile.length - 1, time * (profile.length - 1))), low = Math.floor(index), high = Math.min(profile.length - 1, low + 1);
      update();
      for (const [k, side] of [-1, 1].entries()) {
        const points = ["hip", "knee", "ankle", "foot"].map((n) => bones[n + side].getWorldPosition(new T2.Vector3())), length = points.slice(1).reduce((s, p, i) => s + p.distanceTo(points[i]), 0), direction = points[3].clone().sub(points[0]).normalize(), extension = T2.MathUtils.lerp(profile[low][k], profile[high][k], index - low), goal = points[0].clone().addScaledVector(direction, length * extension), tarsal = points[3].clone().sub(points[2]), rotation = worldQ(bones["foot" + side]), pole = points[1].clone().sub(points[0]);
        ik.hind(side, goal, tarsal, rotation, pole);
        update();
      }
    },
    clearAirborneGround() {
      update();
      last.airClearance = [];
      for (const side of [-1, 1]) {
        const ids = whole["hind" + side], beforeGap = gap(ids), hip = bones["hip" + side].getWorldPosition(new T2.Vector3()), initial = bones["foot" + side].getWorldPosition(new T2.Vector3()), radius = hip.distanceTo(initial);
        let minimum = beforeGap, iterations = 0;
        for (; iterations < 5 && minimum < 5e-4; iterations++) {
          const foot = bones["foot" + side].getWorldPosition(new T2.Vector3()), ankle = bones["ankle" + side].getWorldPosition(new T2.Vector3()), pole = bones["knee" + side].getWorldPosition(new T2.Vector3()).sub(hip), rotation = worldQ(bones["foot" + side]), horizontal = foot.clone().sub(hip);
          horizontal.y = 0;
          if (horizontal.lengthSq() < 1e-12) horizontal.set(side * 0.3, 0, -1).applyQuaternion(worldQ(group));
          horizontal.normalize();
          const y = Math.max(-radius + 1e-6, Math.min(radius - 1e-6, foot.y + 1e-3 - minimum - hip.y)), goal = hip.clone().addScaledVector(horizontal, Math.sqrt(Math.max(0, radius * radius - y * y)));
          goal.y = hip.y + y;
          ik.hind(side, goal, foot.clone().sub(ankle), rotation, pole);
          update();
          minimum = gap(ids);
        }
        const final = bones["foot" + side].getWorldPosition(new T2.Vector3());
        last.airClearance.push({ side, iterations, beforeGap, afterGap: minimum, hipFootLengthBefore: radius, hipFootLengthAfter: hip.distanceTo(final), endpointShift: initial.distanceTo(final), planted: false });
      }
    },
    applyNeck() {
      update();
      const target = worldQ(bones.head), s = worldQ(bones.spine).multiply(neckRest.spine.clone().invert()), h = target.clone().multiply(neckRest.head.clone().invert());
      setWorldQ(bones.neck, s.slerp(h, 0.5).multiply(neckRest.neck));
      update();
      setWorldQ(bones.head, target);
      update();
    },
    plant({ fore, hind, mode }) {
      last.digits = [];
      last.solves = [];
      last.groundTorsoDrop = 0;
      last.readyWeight = readyWeight;
      last.deferredForeSupport = [];
      if (fore && mode === "land") {
        update();
        let drop = 0;
        const yaw = worldQ(group);
        for (const side of [-1, 1]) {
          const shoulder = bones["shoulder" + side].getWorldPosition(new T2.Vector3()), target = shoulder.clone().add(new T2.Vector3(-side * 0.045, 0, 0.085).applyQuaternion(yaw)), surface = (actor.support ? supportSurface?.(actor.support.id, target.x, target.z) : null) ?? ground(target.x, target.z), maximumHeight = surface + 0.036 + Math.sqrt(foreLengths[side] ** 2 - 0.045 ** 2 - 0.085 ** 2) - 8e-3;
          drop = Math.max(drop, shoulder.y - maximumHeight);
        }
        // The landing animation can start before a forefoot reaches the surface
        // (or beside a ledge). Keep the authored torso and defer that contact;
        // never pull the body through a large drop or abort the render loop.
        if (drop > 0.08) drop = 0;
        if (drop > 0) {
          const belly = bones.belly.matrixWorld.clone(), position = bones.spine.getWorldPosition(new T2.Vector3());
          position.y -= drop;
          bones.spine.position.copy(bones.spine.parent.worldToLocal(position));
          update();
          bones.belly.parent.matrixWorld.clone().invert().multiply(belly).decompose(bones.belly.position, bones.belly.quaternion, bones.belly.scale);
          update();
          last.groundTorsoDrop = drop;
        }
      }
      for (const side of [1, -1]) for (const isFore of [false, true]) {
        if (!(isFore ? fore : hind)) continue;
        update();
        const rows = regions.filter((r) => r.side === side && r.fore === isFore), root = bones[(isFore ? "wrist" : "foot") + side], stance = ["idle", "hit", "land"].includes(mode) ? 1 : mode === "bodyImpact" ? readyWeight : 0, seated = stance > 0, yaw = worldQ(group), axisX = new T2.Vector3(1, 0, 0).applyQuaternion(yaw), axisZ = new T2.Vector3(0, 0, 1).applyQuaternion(yaw), target = root.getWorldPosition(new T2.Vector3()), tarsal = isFore ? null : restTarsal[side].clone().applyQuaternion(yaw);
        if (isFore) {
          target.copy(bones["shoulder" + side].getWorldPosition(new T2.Vector3())).add(new T2.Vector3(side * T2.MathUtils.lerp(0.045, -0.045, stance), 0, T2.MathUtils.lerp(0.045, 0.085, stance)).applyQuaternion(yaw));
          target.y = ((actor.support ? supportSurface?.(actor.support.id, target.x, target.z) : null) ?? ground(target.x, target.z)) + 0.036;
        } else {
          if (seated) target.lerp(bones["hip" + side].getWorldPosition(new T2.Vector3()).add(new T2.Vector3(side * 0.092, 0, -0.025).applyQuaternion(yaw)).add(tarsal), stance);
          target.y = ((actor.support ? supportSurface?.(actor.support.id, target.x, target.z) : null) ?? ground(target.x, target.z)) + 0.035;
        }
        if (isFore && mode === "land") {
          const shoulder = bones["shoulder" + side].getWorldPosition(new T2.Vector3());
          if (shoulder.distanceTo(target) > foreLengths[side] - 8e-3) {
            last.deferredForeSupport.push(side);
            last.solves.push({side,fore:true,supported:false,reason:"ground-outside-current-reach"});
            for (const row of rows) last.digits.push({name:row.name,side,fore:true,gap:gap(row.ids),targetGap:null,planted:false});
            continue;
          }
        }
        const up = new T2.Vector3(0, 1, 0), forward = new T2.Vector3(side * 0.2, 0, 1).normalize().applyQuaternion(yaw), rotation = isFore ? frame(up, forward).multiply(palmFrames[side].clone().invert()).multiply(restQ["wrist" + side]) : yaw.clone().multiply(restQ["foot" + side]), names = (isFore ? ["shoulder", "elbow", "wrist"] : ["hip", "knee", "ankle", "foot"]).map((n) => n + side).concat(rows.flatMap((r) => isFore ? [r.name, r.name + "_tip"] : [r.name])), baseline = Object.fromEntries(names.map((n) => [n, bones[n].quaternion.clone()])), key = (isFore ? "fore" : "hind") + side + mode, count = isFore ? 3 : 6;
        let x = cache[key]?.slice() || Array(count).fill(0), iterations = 0;
        const apply = (params) => {
          for (const n of names) bones[n].quaternion.copy(restDigits[n] || baseline[n]);
          update();
          const goal = target.clone();
          goal.y += params[0] * 0.04;
          const q = new T2.Quaternion().setFromAxisAngle(axisZ, params[2]).multiply(new T2.Quaternion().setFromAxisAngle(axisX, params[1])).multiply(rotation);
          if (isFore) ik.fore(side, goal, q, new T2.Vector3(side * 0.6, -0.2, 0.05).applyQuaternion(yaw));
          else ik.hind(side, goal, tarsal, q, new T2.Vector3(side * 0.35, T2.MathUtils.lerp(-0.15, 0.08, stance), 0.7).applyQuaternion(yaw), seated ? { kneeDrop: T2.MathUtils.lerp(bones["hip" + side].getWorldPosition(new T2.Vector3()).y - bones["knee" + side].getWorldPosition(new T2.Vector3()).y, 0.01, stance), usePlaneRoll: true, planeRollWeight: stance } : null);
          if (!isFore) for (let j = 0; j < rows.length; j++) bones[rows[j].name].quaternion.multiply(new T2.Quaternion().setFromAxisAngle(toeFlexAxes[rows[j].name], params[3 + j]));
          update();
          return [...rows.map((r) => gap(r.ids) - 1e-3), Math.min(0, gap(whole[(isFore ? "fore" : "hind") + side]) + 1e-4) * 4];
        };
        let residual = apply(x), cost = residual.reduce((s, v) => s + v * v, 0);
        for (let step = 0; step < 20 && Math.max(...residual.map(Math.abs)) > 5e-4; step++) {
          iterations++;
          const J = residual.map(() => Array(count));
          for (let k = 0; k < count; k++) {
            const v = x.slice();
            v[k] += 1e-3;
            const y = apply(v);
            for (let j = 0; j < residual.length; j++) J[j][k] = (y[j] - residual[j]) / 1e-3;
          }
          const A = Array.from({ length: count }, (_, i) => Array.from({ length: count }, (_2, j) => J.reduce((s, v) => s + v[i] * v[j], 0) + (i === j ? 1e-7 : 0))), rhs = Array.from({ length: count }, (_, i) => -J.reduce((s, v, j) => s + v[i] * residual[j], 0)), dx = solveLinear(A, rhs);
          let accepted = false;
          for (const rate of [1, 0.5, 0.25, 0.125]) {
            const v = x.map((a2, k) => Math.max(k === 0 ? -2 : -0.25, Math.min(k === 0 ? 2 : 0.25, a2 + Math.max(-0.15, Math.min(0.15, dx[k])) * rate))), y = apply(v), c = y.reduce((s, a2) => s + a2 * a2, 0);
            if (c < cost) {
              x = v;
              residual = y;
              cost = c;
              accepted = true;
              break;
            }
          }
          if (!accepted) break;
        }
        residual = apply(x);
        cache[key] = x.slice();
        last.solves.push({ side, fore: isFore, iterations, maximumError: Math.max(...residual.map(Math.abs)), parameters: x, palmSolePlane: true });
        for (const row of rows) last.digits.push({ name: row.name, side, fore: isFore, gap: gap(row.ids), targetGap: 1e-3 });
      }
      return last.digits;
    },
    inspect() {
      return structuredClone(last);
    }
  };
}

// character-refresh-player.mjs
function createFattyJumpPlayer(gltf, actor, { ground, supportSurface, gravity = 24, dashGravity = 30, debugContact = false, mountedData = MOUNTED_DATA }) {
  const MOUNTED_DATA2 = mountedData;
  const group = new THREE2.Group(), flightPivot = new THREE2.Group(), root = clone3(gltf.scene), bones = {}, skins = [], materials = [];
  group.name = "fatty-player-candidate";
  group.add(flightPivot);
  flightPivot.add(root);
  root.traverse((o) => {
    if (o.isBone) bones[o.name] = o;
    if (o.isSkinnedMesh) {
      skins.push(o);
      o.material = o.material.clone();
      materials.push(o.material);
      o.frustumCulled = false;
      o.castShadow = o.receiveShadow = true;
    }
  });
  const bodySkins = skins.filter((o) => o.userData.frogRole === "body");
  if (!skins.length || skins.length > 1 && (bodySkins.length !== 1 || skins.some((o) => !["body", "oral", "tongue"].includes(o.userData.frogRole)))) throw Error("Fatty needs one declared body and recognized facial surfaces");
  const mesh = bodySkins[0] || skins[0], skeleton = mesh.skeleton, bodyRoot = root.getObjectByName("Fatty_JumpProof_Root");
  if (!bodyRoot) throw Error("Missing anatomical body pivot");
  group.updateMatrixWorld(true);
  for (const skin of skins) if (skin.skeleton.bones.length !== skeleton.bones.length || skin.skeleton.bones.some((bone, i) => bone !== skeleton.bones[i])) throw Error("Facial surfaces must share the actual body skeleton");
  const faceLayer = createFaceLayer({ bones, group, skins, enabled: skins.some((o) => o.userData.frogRole === "oral") });
  const restPose = Object.fromEntries(Object.entries(bones).map(([n, b]) => [n, { position: b.position.clone(), quaternion: b.quaternion.clone(), scale: b.scale.clone() }])), ik = createFrogIK(skeleton), clip = gltf.animations.find((c) => c.name === "JumpProof") ?? (gltf.animations.length === 1 ? gltf.animations[0] : null);
  if (!clip) throw Error("Missing explicit JumpProof clip");
  const anatomy = createAnatomyPoseLayer({ bones, group, mesh, ik, ground, supportSurface, actor });
  const clips = Object.fromEntries(gltf.animations.map((c) => [c.name, c])), samplers = Object.fromEntries(gltf.animations.map((c) => [c.name, createClipPoseSampler(root, c)])), idleClip = clips.Idle;
  if (!idleClip) throw Error("Missing real Idle clip");
  for (const name of ["ClassAttack", "BodySlam", "BodySlamImpact", "Hit", "KO", "MountedIdle", "OperateCatapult"]) if (!clips[name]) throw Error("Missing authored " + name);
  const hitOverlay = ["head", bodyRoot.name].map((name) => {
    const track = clips.Hit.tracks.find((t) => t.name === name + ".quaternion");
    if (!track) throw Error("Missing Hit quaternion " + name);
    const interpolant = track.createInterpolant();
    return { name, interpolant, reference: new THREE2.Quaternion().fromArray(interpolant.evaluate(0)) };
  });
  function overlayHit(phase, headOnly = false) {
    for (const channel of hitOverlay) {
      if (headOnly && channel.name === bodyRoot.name) continue;
      const q = new THREE2.Quaternion().fromArray(channel.interpolant.evaluate(phase * clips.Hit.duration));
      if (channel.name === bodyRoot.name) bodyRoot.quaternion.premultiply(q.multiply(channel.reference.clone().invert()));
      else bones[channel.name].quaternion.multiply(channel.reference.clone().invert().multiply(q));
    }
    group.updateMatrixWorld(true);
  }
  const pivot = new THREE2.Vector3(0, 0.275, -0.075), rotated = new THREE2.Vector3(), point = new THREE2.Vector3(), footCandidates = {}, handCandidates = {}, bodyCandidates = [], bellyCandidates = [], pos = mesh.geometry.attributes.position, weights = mesh.geometry.attributes.skinWeight, indices = mesh.geometry.attributes.skinIndex, names = skeleton.bones.map((b) => b.name);
  for (let i = 0; i < pos.count; i++) {
    let torso = 0;
    for (let j = 0; j < 4; j++) if (/^(pelvis|spine|neck|belly|throat|head|jaw)$/.test(names[indices.getComponent(i, j)])) torso += weights.getComponent(i, j);
    if (torso > 0.65) bodyCandidates.push(i);
  }
  for (let i = 0; i < pos.count; i++) {
    let belly = 0, core = 0;
    for (let j = 0; j < 4; j++) {
      const name = names[indices.getComponent(i, j)], weight = weights.getComponent(i, j);
      if (name === "belly") belly += weight;
      if (["pelvis", "spine", "belly"].includes(name)) core += weight;
    }
    if (belly > 0.35 && Math.abs(pos.getX(i)) < 0.25 && pos.getY(i) > 0.14 && pos.getY(i) < 0.5 && pos.getZ(i) > 0.08 && core > 0.65) bellyCandidates.push(i);
  }
  if (!bellyCandidates.length) throw Error("Missing actual belly contact surface");
  for (const side of [-1, 1]) {
    footCandidates[side] = [];
    handCandidates[side] = [];
    for (let i = 0; i < pos.count; i++) {
      point.fromBufferAttribute(pos, i);
      let foot = 0, hand = 0;
      for (let j = 0; j < 4; j++) {
        const name = names[indices.getComponent(i, j)], w = weights.getComponent(i, j);
        if (/^(foot|ankle|toe)/.test(name)) foot += w;
        if (/^(wrist|finger)/.test(name)) hand += w;
      }
      if (point.x * side > 0.11 && point.y < 0.04 && point.z > 0.09 && foot > 0.75) footCandidates[side].push(i);
      if (point.x * side > 0.33 && point.y > 0.18 && point.y < 0.29 && hand > 0.6) handCandidates[side].push(i);
    }
  }
  const handLongLocal = {};
  for (const side of [-1, 1]) {
    const wrist = bones["wrist" + side].getWorldPosition(new THREE2.Vector3()), elbow = bones["elbow" + side].getWorldPosition(new THREE2.Vector3()), axis = wrist.clone().sub(elbow).normalize(), mean = new THREE2.Vector3();
    let count = 0;
    for (let i = 0; i < pos.count; i++) {
      point.fromBufferAttribute(pos, i);
      let hand = 0;
      for (let k = 0; k < 4; k++) if (names[indices.getComponent(i, k)] === "wrist" + side || names[indices.getComponent(i, k)].startsWith("finger" + side + "_")) hand += weights.getComponent(i, k);
      const along = point.clone().sub(wrist).dot(axis);
      if (point.x * side > 0.28 && hand > 0.35 && along > 0.075 && along < 0.2) {
        mean.add(point);
        count++;
      }
    }
    if (!count) throw Error("Missing hand longitudinal axis");
    handLongLocal[side] = mean.multiplyScalar(1 / count).sub(wrist).normalize().applyQuaternion(bones["wrist" + side].getWorldQuaternion(new THREE2.Quaternion()).invert());
  }
  function forePole(side, target, handQ, yaw) {
    const normal = new THREE2.Vector3(side * 0.6, -0.2, 0.05).applyQuaternion(yaw), t = model.poseTime, w = mode === "bodyImpact" ? THREE2.MathUtils.smoothstep(t, 0.15, 0.2) * (1 - THREE2.MathUtils.smoothstep(t, 0.35, 0.4)) : 0;
    if (w > 0) {
      const length = ik.world("wrist" + side).distanceTo(ik.world("elbow" + side)), optimal = target.clone().addScaledVector(handLongLocal[side].clone().applyQuaternion(handQ), -length).sub(ik.world("shoulder" + side)).normalize();
      normal.normalize().lerp(optimal, w).normalize();
    }
    return normal;
  }
  let sourceScaleError = 0;
  function seek(t, name = "JumpProof") {
    const selected = samplers[name];
    if (!selected) throw Error("Missing authored " + name);
    selected.sample(t * clips[name].duration);
    for (const b of skeleton.bones) {
      const error = Math.max(Math.abs(b.scale.x - 1), Math.abs(b.scale.y - 1), Math.abs(b.scale.z - 1));
      if (error > 1e-5) throw Error("Unexpected animated joint scale " + b.name + ": " + error);
      sourceScaleError = Math.max(sourceScaleError, error);
      b.scale.set(1, 1, 1);
    }
    group.updateMatrixWorld(true);
  }
  function pivotOffset() {
    return pivot.clone().sub(rotated.copy(pivot).applyQuaternion(bodyRoot.quaternion));
  }
  function endpoint(t) {
    seek(t);
    return bodyRoot.position.y - pivotOffset().y;
  }
  const departureOffset = endpoint(0.22), arrivalOffset = endpoint(0.79);
  let mode = "", landClock = Infinity, wasAir = false, transition = null, disposed = false, supportAngle = 0, supportID = null, lastSupportLift = 0, carriedLaunchLift = 0, airborne = false, idleClock = 0, koClock = 0, impactRemaining = 0, impactStrength = 0;
  function snapshot() {
    return { position: bodyRoot.position.clone(), quaternion: bodyRoot.quaternion.clone(), bones: Object.fromEntries(Object.entries(bones).map(([n, b]) => [n, { position: b.position.clone(), quaternion: b.quaternion.clone() }])) };
  }
  function restorePose(pose) {
    bodyRoot.position.copy(pose.position);
    bodyRoot.quaternion.copy(pose.quaternion);
    for (const [n, b] of Object.entries(bones)) {
      b.position.copy(pose.bones[n].position);
      b.quaternion.copy(pose.bones[n].quaternion);
    }
    group.updateMatrixWorld(true);
  }
  let mountedClock = 0, boundOperator = null;
  for (const row of [...MOUNTED_DATA2.palms, MOUNTED_DATA2.support]) if (row.anchor >= pos.count || new THREE2.Vector3().fromBufferAttribute(pos, row.anchor).distanceTo(new THREE2.Vector3(...row.anchorBind)) > 1e-6) throw Error("Mounted anchors require current Fatty geometry");
  function applyMountedBinding() {
    group.updateWorldMatrix(true, false);
    let frame;
    if (boundOperator) {
      boundOperator.updateWorldMatrix(true, false);
      frame = boundOperator.matrixWorld;
      const wanted = frame.clone().multiply(new THREE2.Matrix4().makeTranslation(0, MOUNTED_DATA2.legacyGroupOffset, 0)), relative = group.matrixWorld.clone().invert().multiply(wanted);
      relative.decompose(flightPivot.position, flightPivot.quaternion, flightPivot.scale);
      if (flightPivot.scale.distanceTo(new THREE2.Vector3(1, 1, 1)) > 1e-5) throw Error("Mounted frame must preserve model scale");
    } else frame = group.matrixWorld.clone().multiply(new THREE2.Matrix4().makeTranslation(0, -MOUNTED_DATA2.legacyGroupOffset, 0));
    group.updateMatrixWorld(true);
    skeleton.update();
    model.contacts = [];
    const rotation = new THREE2.Matrix4().makeRotationX(model.operatorControlAngle || 0);
    for (const row of MOUNTED_DATA2.palms) {
      const local = new THREE2.Matrix4().compose(new THREE2.Vector3(...row.basePosition), new THREE2.Quaternion(...row.baseQuaternion), new THREE2.Vector3(1, 1, 1)).multiply(rotation), target2 = new THREE2.Vector3(...row.contactLocal).applyMatrix4(local).applyMatrix4(frame), actual2 = mesh.getVertexPosition(row.anchor, new THREE2.Vector3()).applyMatrix4(mesh.matrixWorld);
      model.contacts.push({ side: row.side, fore: true, gap: actual2.distanceTo(target2), target: target2.toArray(), actual: actual2.toArray() });
    }
    const support = MOUNTED_DATA2.support, target = new THREE2.Vector3(...support.point).applyMatrix4(frame), normal = new THREE2.Vector3(...support.normal).transformDirection(frame), actual = mesh.getVertexPosition(support.anchor, new THREE2.Vector3()).applyMatrix4(mesh.matrixWorld);
    model.contacts.push({ surface: true, seat: true, fore: false, gap: actual.sub(target).dot(normal) });
    model.catapultContacts = model.contacts.filter((c) => c.fore);
    model.mountedFrameCorrection = flightPivot.position.toArray();
  }
  function blend(from, w) {
    bodyRoot.position.lerpVectors(from.position, bodyRoot.position.clone(), w);
    bodyRoot.quaternion.slerpQuaternions(from.quaternion, bodyRoot.quaternion.clone(), w);
    for (const [n, b] of Object.entries(bones)) {
      b.position.lerpVectors(from.bones[n].position, b.position.clone(), w);
      b.quaternion.slerpQuaternions(from.bones[n].quaternion, b.quaternion.clone(), w);
    }
    group.updateMatrixWorld(true);
  }
  function minimumPad(candidates) {
    let best = null;
    for (const i of candidates) {
      mesh.getVertexPosition(i, point).applyMatrix4(mesh.matrixWorld);
      const top = actor.support && supportSurface?.(actor.support.id, point.x, point.z), floor = top ?? ground(point.x, point.z), gap = point.y - floor;
      if (!best || gap < best.gap) best = { index: i, gap, point: point.clone(), floor };
    }
    return best;
  }
  function fitSupportedBody(minimumLift = 0) {
    const id = actor.support?.id ?? actor.flight?.sourceSupport;
    if (!id || !supportSurface) return;
    if (model.supportPitch) {
      flightPivot.quaternion.setFromAxisAngle(new THREE2.Vector3(1, 0, 0), model.supportPitch);
      flightPivot.position.copy(pivot).sub(pivot.clone().applyQuaternion(flightPivot.quaternion));
    }
    flightPivot.position.y += minimumLift;
    group.updateMatrixWorld(true);
    let minimum = Infinity;
    for (const i of bodyCandidates) {
      mesh.getVertexPosition(i, point).applyMatrix4(mesh.matrixWorld);
      const floor = supportSurface(id, point.x, point.z);
      if (floor !== null) minimum = Math.min(minimum, point.y - floor);
    }
    const rise = Math.max(0, 6e-3 - minimum);
    if (rise > 0.6) throw Error("Surface requires a different whole-body stance");
    flightPivot.position.y += rise;
    model.supportedBodyLift = minimumLift + rise;
    group.updateMatrixWorld(true);
  }
  function diveContactTime() {
    const f = actor.flight;
    if (!f || f.vy >= 0) return Infinity;
    const terrain = ground(group.position.x, group.position.z), support = f.sourceSupport && supportSurface?.(f.sourceSupport, group.position.x, group.position.z), floor = Number.isFinite(support) ? Math.max(terrain, support) : terrain, height = Math.max(0, (f.y ?? group.position.y) - floor), g = f.kind === "dash" ? dashGravity : gravity;
    return (f.vy + Math.sqrt(f.vy * f.vy + 2 * g * height)) / g;
  }
  function reachablePatch(side, fore, target, candidates) {
    if (!actor.support || !supportSurface) return;
    const end = (fore ? "wrist" : "foot") + side, start = (fore ? "shoulder" : "hip") + side, pad = minimumPad(candidates);
    if (Math.abs(pad.gap - 8e-3) < 2e-3) return;
    const origin = ik.world(start), offset = pad.point.clone().sub(ik.world(end)), chain = fore ? ["shoulder", "elbow", "wrist"] : ["hip", "knee", "ankle", "foot"];
    let length = 0;
    for (let i = 1; i < chain.length; i++) length += ik.world(chain[i - 1] + side).distanceTo(ik.world(chain[i] + side));
    let best = null;
    for (const radius of [0, 0.05, 0.1, 0.15, 0.2]) for (let i = 0; i < (radius ? 12 : 1); i++) {
      const a = i * Math.PI / 6, p = target.clone();
      p.x += radius * Math.cos(a);
      p.z += radius * Math.sin(a);
      const local = group.worldToLocal(p.clone());
      if (local.x * side < (fore ? 0.16 : 0.14)) continue;
      const floor = supportSurface(actor.support.id, p.x + offset.x, p.z + offset.z);
      if (floor === null) continue;
      p.y = floor + 8e-3 - offset.y;
      const unreachable = Math.max(0, p.distanceTo(origin) - length * 0.985), score = unreachable * unreachable * 1e3 + radius * radius;
      if (!best || score < best.score) best = { p, score };
    }
    if (best) target.copy(best.p);
  }
  function plant() {
    group.updateMatrixWorld(true);
    model.contacts = [];
    model.swingGaps = [];
    const yaw = group.getWorldQuaternion(new THREE2.Quaternion()), impact = mode === "bodyImpact", hindSupport = mode === "idle" || mode === "hit" || mode === "classAttack" || mode === "land" && model.poseTime >= 0.84 || impact && model.poseTime >= 0.55 - 1e-7, foreSupport = mode === "idle" || mode === "hit" || mode === "land" || impact && model.poseTime >= 0.25 - 1e-7;
    if (impact && model.poseTime <= 0.25 + 1e-7) model.contacts.push({ side: 0, belly: true, fore: false, gap: minimumPad(bellyCandidates).gap });
    for (const side of [-1, 1]) {
      const target = ik.world("foot" + side), tarsal = target.clone().sub(ik.world("ankle" + side)), footQ = bones["foot" + side].getWorldQuaternion(new THREE2.Quaternion());
      const hindPole = new THREE2.Vector3(side * 0.3, -0.15, 0.7).applyQuaternion(yaw);
      if (hindSupport && !anatomy) {
        for (let i = 0; i < 5; i++) {
          const pad = minimumPad(footCandidates[side]);
          if (Math.abs(pad.gap - 8e-3) < 1e-6) break;
          target.y += 8e-3 - pad.gap;
          ik.hind(side, target, tarsal, footQ, hindPole);
        }
        if (actor.support && supportSurface && Math.abs(minimumPad(footCandidates[side]).gap - 8e-3) > 2e-3) {
          reachablePatch(side, false, target, footCandidates[side]);
          for (let i = 0; i < 4; i++) {
            ik.hind(side, target, tarsal, footQ, hindPole);
            const pad = minimumPad(footCandidates[side]);
            target.y += 8e-3 - pad.gap;
            if (Math.abs(pad.gap - 8e-3) < 1e-6) break;
          }
        }
        model.contacts.push({ side, fore: false, gap: minimumPad(footCandidates[side]).gap });
      } else if (!hindSupport) {
        for (let i = 0; i < 3; i++) {
          const pad = minimumPad(footCandidates[side]);
          target.y += Math.max(0, 8e-3 - pad.gap);
          ik.hind(side, target, tarsal, footQ, hindPole);
        }
        model.swingGaps.push({ side, gap: minimumPad(footCandidates[side]).gap });
      }
      if (foreSupport && !anatomy) {
        const target2 = ik.world("wrist" + side), handQ = bones["wrist" + side].getWorldQuaternion(new THREE2.Quaternion()), initial = minimumPad(handCandidates[side]), pole = forePole(side, target2, handQ, yaw);
        let reach;
        for (let i = 0; i < 4; i++) {
          const pad2 = minimumPad(handCandidates[side]);
          if (Math.abs(pad2.gap - 8e-3) < 1e-6) break;
          target2.y += 8e-3 - pad2.gap;
          reach = ik.fore(side, target2, handQ, pole);
        }
        if (actor.support && supportSurface && Math.abs(minimumPad(handCandidates[side]).gap - 8e-3) > 2e-3) {
          reachablePatch(side, true, target2, handCandidates[side]);
          for (let i = 0; i < 4; i++) {
            reach = ik.fore(side, target2, handQ, pole);
            const pad2 = minimumPad(handCandidates[side]);
            target2.y += 8e-3 - pad2.gap;
            if (Math.abs(pad2.gap - 8e-3) < 1e-6) break;
          }
        }
        const pad = minimumPad(handCandidates[side]);
        model.contacts.push({ side, fore: true, gap: pad.gap, ...debugContact ? { reach, target: target2.toArray(), initial: { point: initial.point.toArray(), floor: initial.floor, gap: initial.gap }, final: { point: pad.point.toArray(), floor: pad.floor }, group: group.position.toArray(), poseTime: model.poseTime, mode } : {} });
      }
    }
    if (anatomy) {
      model.digitContacts = anatomy.plant({ fore: foreSupport, hind: hindSupport, mode });
      for (const side of [-1, 1]) for (const fore of [false, true]) {
        const rows = model.digitContacts.filter((d) => d.side === side && d.fore === fore);
        if (rows.length) model.contacts.push({ side, fore, gap: Math.min(...rows.map((d) => d.gap)), targetGap: rows.some(d=>d.planted===false)?null:1e-3, supported:rows.every(d=>d.planted!==false) });
      }
      for (const contact of model.contacts) {
        if (contact.belly) continue;
        const rows = model.digitContacts.filter((d) => d.side === contact.side && d.fore === contact.fore);
        if (rows.length) {
          contact.gap = Math.min(...rows.map((d) => d.gap));
          contact.targetGap = rows.some(d=>d.planted===false)?null:1e-3;
          contact.supported = rows.every(d=>d.planted!==false);
        }
      }
    }
  }
  const model = {
    group,
    flightPivot,
    mesh,
    meshes: skins,
    bones,
    skeleton,
    restPose,
    faceLayer,
    anatomyLayer: anatomy,
    stats: { type: "frog", cartoon: true, imported: true, characterClass: "heavy", anatomicalCandidate: true, vertices: skins.reduce((n, m) => n + m.geometry.attributes.position.count, 0), triangles: skins.reduce((n, m) => n + m.geometry.index.count / 3, 0), surfaces: skins.length, bones: skeleton.bones.length, renderLOD: 0 },
    ownsLimbPose: true,
    currentClip: "Idle",
    contacts: [],
    validation: { scope: "Body actions and optional jaw layer in private prototype; face gameplay, rendering, terrain/menu and performance acceptance pending" },
    bindCatapultFrame(frame) {
      if (!model.ownsMountedPose) {
        boundOperator = null;
        return false;
      }
      boundOperator = frame || null;
      applyMountedBinding();
      return true;
    },
    beginPose() {
    },
    setEquipment() {
    },
    setOutline() {
    },
    setRenderLOD() {
    },
    setCrowned() {
    },
    prepareRender() {
      model.stats.drawnTriangles = model.stats.triangles;
    },
    mouthWorld(target = new THREE2.Vector3()) {
      if (faceLayer.enabled) return faceLayer.mouthWorld(target);
      group.updateWorldMatrix(true, true);
      return bones.mouth.getWorldPosition(target);
    },
    aimPitch(angle) {
      model.lastAimPitch = angle;
      const axis = new THREE2.Vector3(1, 0, 0).applyQuaternion(group.getWorldQuaternion(new THREE2.Quaternion())).applyQuaternion(bones.head.getWorldQuaternion(new THREE2.Quaternion()).invert());
      bones.head.quaternion.multiply(new THREE2.Quaternion().setFromAxisAngle(axis, -angle * 0.7));
      anatomy?.applyNeck();
    },
    setImpact({ strength = 0, duration = 0.26 } = {}) {
      impactStrength = Math.min(1.5, Math.max(0, strength));
      impactRemaining = Math.max(0, duration);
    },
    update(dt, state = {}) {
      anatomy?.resetDigits();
      const dead = state.dead === true || actor.ko === true, hitActive = !dead && actor.hit > 0, hitPhase = THREE2.MathUtils.clamp(1 - (actor.hit || 0) / 0.23, 0, 1);
      koClock = dead ? koClock + Math.max(0, dt) : 0;
      impactRemaining = Math.max(0, impactRemaining - dt);
      for (const material of materials) {
        material.emissive.set("#ffdba3");
        material.emissiveIntensity = impactRemaining > 0 ? Math.min(0.38, impactStrength * 0.38) : 0;
      }
      const mounted = !dead && !!actor.catapultId;
      const action = !dead && !hitActive && !mounted && actor.classAction?.remaining > 0 && !(actor.classAction.settled && actor.flight) ? actor.classAction : null;
      if (action && action.kind !== "bodySlam") throw Error("Fatty class action outside current prototype");
      const slap = !dead && !hitActive && !mounted && !action && state.attack?.type === "kick";
      const air = state.hop?.phase === "air";
      if (wasAir && !air) landClock = 0;
      else landClock += dt;
      wasAir = air;
      const next = dead ? "ko" : mounted ? actor.catapultAction > 0 ? "operate" : "mounted" : hitActive && !air ? "hit" : action ? action.settled ? "bodyImpact" : "bodyDive" : slap ? "classAttack" : air ? "air" : landClock < 0.18 ? "land" : "idle", before = mode !== next && mode ? snapshot() : null;
      if (mode !== next) {
        const immediateContact = next === "bodyImpact" && mode !== "bodyDive", respawn = mode === "ko" && !dead, mountChange = ["mounted", "operate"].includes(mode) || ["mounted", "operate"].includes(next), duration = next === "bodyDive" ? Math.min(0.045, Math.max(1e-4, diveContactTime())) : next === "ko" ? 0.065 : 0.045;
        mode = next;
        if (mode !== "mounted") mountedClock = 0;
        transition = before && !immediateContact && !respawn && !mountChange ? { from: before, time: 0, duration } : null;
        model.immediateLateSlamContact = immediateContact;
      }
      const progress = THREE2.MathUtils.clamp(state.hop?.progress || 0, 0, 1), actionPhase = action ? THREE2.MathUtils.clamp(mode === "bodyImpact" ? ((action.impactRemaining ?? action.remaining) - action.remaining) / clips.BodySlamImpact.duration : Math.max(1 - action.remaining / action.duration, 0.2 * (1 - Math.min(1, diveContactTime() / 0.12))), 0, 1) : 0, time = mode === "operate" ? THREE2.MathUtils.clamp(1 - (actor.catapultAction || 0) / MOUNTED_DATA2.gameActionDuration, 0, 1) : mode === "mounted" ? (mountedClock += Math.max(0, dt)) % clips.MountedIdle.duration / clips.MountedIdle.duration : mode === "ko" ? Math.min(1, koClock / clips.KO.duration) : mode === "hit" ? hitPhase : action ? actionPhase : mode === "classAttack" ? THREE2.MathUtils.clamp(state.attack.phase, 0, 1) : mode === "air" ? 0.22 + 0.57 * progress : mode === "land" ? 0.79 + 0.21 * Math.min(1, landClock / 0.18) : 0;
      idleClock = mode === "idle" ? idleClock + dt : 0;
      model.idleClipTime = mode === "idle" ? idleClock % idleClip.duration : null;
      const sampledClip = mode === "mounted" ? "MountedIdle" : mode === "operate" ? "OperateCatapult" : mode === "ko" ? "KO" : mode === "hit" ? "Hit" : mode === "bodyDive" ? "BodySlam" : mode === "bodyImpact" ? "BodySlamImpact" : mode === "classAttack" ? "ClassAttack" : mode === "idle" ? "Idle" : "JumpProof";
      seek(mode === "idle" ? model.idleClipTime / idleClip.duration : time, sampledClip);
      if (mode === "idle" || mode === "hit" || mode === "land") anatomy?.applyReadyStance();
      else if (mode === "bodyImpact" && anatomy && time > 0.18) {
        const recovery = THREE2.MathUtils.smoothstep(time, 0.18, 1);
        seek(0.18, "BodySlamImpact");
        const prone = snapshot();
        seek(0, "Idle");
        anatomy.applyReadyStance();
        blend(prone, recovery);
        anatomy.setRecoveryBlend(recovery);
      }
      model.bodyPitchDelta = 0;
      if (mode === "air" && actor.flight) {
        const f = actor.flight, speed = Math.hypot(f.vx || 0, f.vz || 0), referenceSlope = (0.5 - progress) * THREE2.MathUtils.degToRad(86), actualSlope = Math.atan2(f.vy, Math.max(0.1, speed)), weight = THREE2.MathUtils.smoothstep(Math.hypot(f.vy, speed), 1, 4);
        const landingAlignment = 1 - THREE2.MathUtils.smoothstep(progress, 0.73, 0.98);
        model.bodyPitchDelta = THREE2.MathUtils.clamp(referenceSlope - actualSlope, -Math.PI / 7.2, Math.PI / 7.2) * weight * landingAlignment;
        bodyRoot.quaternion.premultiply(new THREE2.Quaternion().setFromAxisAngle(new THREE2.Vector3(1, 0, 0), model.bodyPitchDelta));
      }
      if (hitActive && (air || mounted)) overlayHit(hitPhase, mounted);
      model.airHitOverlay = hitActive && air && !mounted;
      model.mountedHitOverlay = hitActive && mounted;
      const offset = pivotOffset();
      if (!mounted) {
        bodyRoot.position.x = offset.x;
        bodyRoot.position.z = offset.z;
      }
      if (mode === "air") bodyRoot.position.y = offset.y + THREE2.MathUtils.lerp(departureOffset, arrivalOffset, progress);
      if (mode === "air") anatomy?.applyAirPose(time);
      if (transition) {
        transition.time += dt;
        let w = Math.min(1, transition.time / transition.duration);
        w = w * w * (3 - 2 * w);
        blend(transition.from, w);
        if (w >= 1) transition = null;
      }
      model.currentClip = dead ? "KO" : hitActive ? "Hit" : mounted ? sampledClip : action ? sampledClip : mode === "classAttack" ? "ClassAttack" : mode === "air" ? actor.flight?.jumps >= 2 ? "DoubleJump" : "Jump" : mode === "land" ? "Land" : "Idle";
      model.poseTime = time;
      model.sampledClip = sampledClip;
      model.ownsMountedPose = mounted;
      model.operatorPhase = mode === "operate" ? time : 0;
      model.operatorControlAngle = mode === "operate" ? controlAngleForProgress(time) : 0;
      if (!mounted) boundOperator = null;
      model.ownsLimbPose = true;
      model.contacts = [];
      model.swingGaps = [];
      model.digitContacts = [];
      group.updateMatrixWorld(true);
      anatomy?.applyNeck();
      faceLayer.captureBase();
      model.faceAction = fattyFaceAction(actor);
      faceLayer.applyJaw(state.jawAngle ?? (faceLayer.enabled ? model.faceAction.jawAngle : 0));
    },
    applyFlightAttitude(flight, dt = 1 / 60) {
      const resetPivot = () => {
        flightPivot.rotation.set(0, 0, 0);
        flightPivot.position.set(0, 0, 0);
        flightPivot.scale.set(1, 1, 1);
        model.supportedBodyLift = 0;
      };
      resetPivot();
      if (model.ownsMountedPose) {
        applyMountedBinding();
        return;
      }
      if (mode === "ko") {
        group.rotation.z = 0;
        model.contacts = [];
        model.swingGaps = [];
        if (!flight && !(actor.height > 3e-3)) {
          group.updateMatrixWorld(true);
          let minimum = Infinity;
          for (let i = 0; i < pos.count; i++) {
            mesh.getVertexPosition(i, point).applyMatrix4(mesh.matrixWorld);
            minimum = Math.min(minimum, point.y - ground(point.x, point.z));
          }
          model.contacts.push({ surface: true, gap: minimum });
        }
        return;
      }
      if (flight || actor.hop) {
        if (!airborne) carriedLaunchLift = flight?.sourceSupport === supportID ? lastSupportLift : 0;
        airborne = true;
        supportAngle *= Math.exp(-dt * 45);
        model.supportPitch = supportAngle;
        fitSupportedBody(carriedLaunchLift);
        if (flight) anatomy?.clearAirborneGround();
        return;
      }
      airborne = false;
      carriedLaunchLift = 0;
      if (!actor.support || !supportSurface) {
        supportID = null;
        supportAngle = 0;
        lastSupportLift = 0;
        model.supportPitch = 0;
        plant();
        return;
      }
      if (supportID !== actor.support.id) {
        supportID = actor.support.id;
        supportAngle = 0;
      }
      const before = snapshot(), manual = model.supportPitchOverride !== void 0, angles = manual ? [model.supportPitchOverride] : Array.from({ length: 10 }, (_, i) => Math.min(Math.PI / 4, supportAngle + i * Math.PI / 36)).filter((v, i, a) => !i || v !== a[i - 1]);
      let best = null;
      for (const angle of angles) {
        restorePose(before);
        resetPivot();
        model.supportPitch = angle;
        fitSupportedBody();
        plant();
        const error = Math.max(...model.contacts.map((p) => Math.abs(p.gap - (p.targetGap ?? 8e-3))));
        if (!best || error < best.error) best = { angle, error };
        if (error < 2e-3) break;
      }
      if (model.supportPitch !== best.angle) {
        restorePose(before);
        resetPivot();
        model.supportPitch = best.angle;
        fitSupportedBody();
        plant();
      }
      if (!manual) supportAngle = best.angle;
      lastSupportLift = model.supportedBodyLift;
      model.supportFitPassed = best.error < 2e-3;
    },
    inspect() {
      group.updateMatrixWorld(true);
      const extension = [-1, 1].map((side) => {
        const p = ["hip", "knee", "ankle", "foot"].map((n) => bones[n + side].getWorldPosition(new THREE2.Vector3()));
        return p[0].distanceTo(p[3]) / p.slice(1).reduce((s, b, i) => s + b.distanceTo(p[i]), 0);
      });
      return { groundContacts:anatomy?.inspect(), clip: model.currentClip, mode, mounted: model.ownsMountedPose, operatorPhase: model.operatorPhase, operatorControlAngle: model.operatorControlAngle, mountedHitOverlay: model.mountedHitOverlay, mountedFrameCorrection: model.mountedFrameCorrection, poseTime: model.poseTime, idleClipTime: model.idleClipTime, airHitOverlay: model.airHitOverlay, sampledClip: model.sampledClip, koElapsed: koClock, impactRemaining, extension, contacts: model.contacts, swingGaps: model.swingGaps, bodyPitchDelta: model.bodyPitchDelta, supportedBodyLift: model.supportedBodyLift, carriedLaunchLift, sourceScaleError, scales: skeleton.bones.every((b) => b.scale.distanceTo(new THREE2.Vector3(1, 1, 1)) < 1e-7) };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const s of Object.values(samplers)) s.dispose();
      for (const s of new Set(skins.map((m) => m.skeleton))) s.dispose();
      for (const mat of materials) mat.dispose();
      group.removeFromParent();
    }
  };
  model.update(0);
  if (anatomy && !actor.flight && !actor.hop && !model.ownsMountedPose && model.currentClip !== "KO") model.applyFlightAttitude(null, 0);
  return model;
}
export {
  createFattyJumpPlayer
};
