import * as THREE from 'three';
import { createPropMesh } from '../../src/world.js';

// Editable concept source. Seven physical rock masses, feet origin, +Z forward.
// The geometry, texture and stone material come from the game's actual prefab.
export function createStoneCreature({ hostile = false } = {}) {
  const group = new THREE.Group();
  group.name = hostile ? 'Violet stone minion concept' : 'Seven-stone Goliath concept';
  const reference = createPropMesh('stone').mesh.children.find(child => child.isMesh);
  const source = reference.geometry;
  source.computeBoundingBox();
  const sourceSize = source.boundingBox.getSize(new THREE.Vector3());
  const sourceCenter = source.boundingBox.getCenter(new THREE.Vector3());
  const stone = reference.material.clone();
  const rune = new THREE.MeshBasicMaterial({ color: hostile ? 0xb18aee : 0x7de3c0, toneMapped: false });
  const groove = new THREE.MeshStandardMaterial({ color: 0x253132, roughness: 1 });
  const parts = new Map();
  const ownedGeometries = new Set();
  const ray = new THREE.Raycaster();
  const minusZ = new THREE.Vector3(0, 0, -1);

  function part(name, size, pivot, center, form) {
    const root = new THREE.Group();
    root.name = `${name} pivot`;
    root.position.fromArray(pivot);
    const geometry = source.clone();
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      let x = (positions.getX(i) - sourceCenter.x) / sourceSize.x;
      let y = (positions.getY(i) - sourceCenter.y) / sourceSize.y;
      let z = (positions.getZ(i) - sourceCenter.z) / sourceSize.z;
      // Broad shoulders, a compact waist, heavy fists and planted stone soles.
      if (form === 'chest') x *= 0.81 + 0.38 * (y + 0.5);
      if (form === 'arm') {
        y = -0.5 + (Math.max(y, -0.37) + 0.37) / 0.87;
        x *= 0.94 - 0.16 * y; z *= 1 - 0.18 * y;
      }
      if (form === 'leg') {
        y = -0.5 + (Math.max(y, -0.32) + 0.32) / 0.82;
        x *= 0.89 - 0.16 * y; z *= 0.91 - 0.2 * y;
      }
      positions.setXYZ(i, x * size[0], y * size[1], z * size[2]);
    }
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    ownedGeometries.add(geometry);
    const mesh = new THREE.Mesh(geometry, stone);
    mesh.name = name;
    mesh.userData.rockMass = true;
    mesh.position.fromArray(center);
    mesh.castShadow = mesh.receiveShadow = true;
    root.add(mesh);
    group.add(root);
    parts.set(name, { root, mesh, size, basePosition: root.position.clone(), baseCenter: mesh.position.clone(),
      finalVertices: positions.array.slice(), stoneVertices: source.attributes.position.array.slice(), currentShape: 1 });
    return mesh;
  }

  part('Head', [0.74, 0.64, 0.64], [0, 2.79, 0.04], [0, 0.29, 0]);
  part('Chest', [1.65, 1.16, 0.98], [0, 1.81, 0], [0, 0.52, 0], 'chest');
  part('Pelvis', [1.02, 0.49, 0.79], [0, 1.31, 0], [0, 0.25, 0]);
  part('Left arm', [0.65, 1.56, 0.76], [-1.02, 2.70, 0], [0, -0.69, 0], 'arm');
  part('Right arm', [0.65, 1.56, 0.76], [1.02, 2.70, 0], [0, -0.69, 0], 'arm');
  part('Left leg', [0.64, 1.33, 0.85], [-0.35, 1.32, 0], [0, -0.655, 0.02], 'leg');
  part('Right leg', [0.64, 1.33, 0.85], [0.35, 1.32, 0], [0, -0.655, 0.02], 'leg');

  function carve(name, paths) {
    const { mesh, size } = parts.get(name);
    // Thin inlaid ribbons projected onto real facets; tubes float in profile.
    const probe = new THREE.Mesh(mesh.geometry, stone);
    probe.updateMatrixWorld(true);
    function surface(x, y, lift) {
      ray.set(new THREE.Vector3(x, y, size[2] + 1), minusZ);
      const hit = ray.intersectObject(probe, false)[0];
      return hit ? hit.point.addScaledVector(hit.face.normal, lift) : null;
    }
    for (const path of paths) {
      for (const [width, material, lift] of [[0.036, groove, 0.002], [0.018, rune, 0.004]]) {
        const vertices = [];
        for (let p = 0; p < path.length - 1; p++) {
          const a = new THREE.Vector2(path[p][0] * size[0], path[p][1] * size[1]);
          const b = new THREE.Vector2(path[p + 1][0] * size[0], path[p + 1][1] * size[1]);
          const direction = b.clone().sub(a).normalize();
          const side = new THREE.Vector2(-direction.y, direction.x).multiplyScalar(width / 2);
          for (let j = 0; j < 24; j++) {
            const start = a.clone().lerp(b, j / 24), end = a.clone().lerp(b, (j + 1) / 24);
            const points = [surface(start.x + side.x, start.y + side.y, lift),
              surface(start.x - side.x, start.y - side.y, lift),
              surface(end.x + side.x, end.y + side.y, lift), surface(end.x - side.x, end.y - side.y, lift)];
            if (points.some(point => !point)) continue;
            for (const index of [0, 1, 2, 2, 1, 3]) vertices.push(...points[index].toArray());
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geo.computeVertexNormals();
        ownedGeometries.add(geo);
        const stroke = new THREE.Mesh(geo, material);
        mesh.add(stroke);
      }
    }
  }
  carve('Head', [ [[-0.27, 0.02], [-0.10, 0.05]], [[0.10, 0.05], [0.27, 0.02]],
    [[0, 0.36], [0, 0.2]] ]);
  carve('Chest', [ [[0, 0.30], [-0.14, 0.08], [0, -0.15], [0.14, 0.08], [0, 0.30]],
    [[-0.22, 0.27], [-0.14, 0.08]], [[0.22, 0.27], [0.14, 0.08]],
    [[0, -0.15], [0, -0.32]] ]);
  carve('Pelvis', [ [[-0.20, 0.04], [0, -0.10], [0.20, 0.04]] ]);
  for (const name of ['Left arm', 'Right arm']) carve(name, [
    [[-0.13, 0.23], [0, 0.31], [0.13, 0.23], [0, 0.15], [-0.13, 0.23]],
    [[0, 0.15], [0, -0.14], [0.12, -0.23]] ]);
  for (const name of ['Left leg', 'Right leg']) carve(name, [
    [[-0.12, 0.22], [0.02, 0.08], [-0.04, -0.13], [0.10, -0.24]] ]);

  const joints = new THREE.Group();
  joints.name = 'Six magical joints (no additional stones)';
  const jointGeo = new THREE.IcosahedronGeometry(0.075, 1);
  ownedGeometries.add(jointGeo);
  for (const pos of [[0, 2.82, 0], [0, 1.79, 0], [-0.87, 2.64, 0], [0.87, 2.64, 0],
    [-0.35, 1.35, 0], [0.35, 1.35, 0]]) {
    const joint = new THREE.Mesh(jointGeo, rune);
    joint.position.fromArray(pos);
    joints.add(joint);
  }
  group.add(joints);

  function setShape(p, amount) {
    if (p.currentShape === amount) return;
    p.currentShape = amount;
    const positions = p.mesh.geometry.attributes.position;
    for (let v = 0; v < positions.array.length; v++) {
      positions.array[v] = THREE.MathUtils.lerp(p.stoneVertices[v], p.finalVertices[v], amount);
    }
    positions.needsUpdate = true;
    p.mesh.geometry.computeVertexNormals();
    p.mesh.geometry.computeBoundingBox(); p.mesh.geometry.computeBoundingSphere();
  }
  function pose(mode = 'stand', time = 0, restoreGeometry = true) {
    for (const p of parts.values()) {
      const { root, mesh, basePosition, baseCenter } = p;
      root.rotation.set(0, 0, 0);
      root.position.copy(basePosition);
      mesh.position.copy(baseCenter);
      if (restoreGeometry) setShape(p, 1);
      for (const child of mesh.children) child.visible = true;
    }
    joints.visible = true;
    for (const joint of joints.children) joint.visible = true;
    const leftArm = parts.get('Left arm').root, rightArm = parts.get('Right arm').root;
    const leftLeg = parts.get('Left leg').root, rightLeg = parts.get('Right leg').root;
    leftArm.rotation.z = -0.12;
    rightArm.rotation.z = 0.12;
    if (mode === 'protect') {
      // Broad forearm blocks and a forward shoulder: the wizard shelters behind.
      leftArm.rotation.set(-0.72, -0.16, -0.45);
      rightArm.rotation.set(-0.50, 0.20, 0.37);
      parts.get('Chest').root.rotation.x = -0.08;
      parts.get('Head').root.rotation.x = 0.10;
      leftLeg.position.z = 0.17;
      rightLeg.position.z = -0.12;
    } else if (mode === 'walk') {
      // Slow rigid-rock stride. Lift the swinging leg; the planted sole stays
      // on the ground. This is an articulated concept, not a production rig.
      const stride = Math.sin(time * 3.3);
      for (const [leg, swing] of [[leftLeg, stride], [rightLeg, -stride]]) {
        leg.position.z = swing * 0.26;
        leg.position.y += Math.max(0, swing) * 0.11;
        leg.rotation.x = Math.max(0, swing) * 0.10;
      }
      leftArm.rotation.x = -stride * 0.16;
      rightArm.rotation.x = stride * 0.16;
      parts.get('Chest').root.rotation.y = stride * 0.035;
      parts.get('Head').root.rotation.y = -stride * 0.035;
    }
    rune.color.set(hostile ? 0xb18aee : 0x7de3c0);
    rune.color.multiplyScalar(0.94 + 0.06 * Math.sin(time * 2));
    group.updateMatrixWorld(true);
  }
  pose();
  group.updateMatrixWorld(true);
  const height = new THREE.Box3().setFromObject(group).getSize(new THREE.Vector3()).y;
  group.userData.concept = { rockMasses: 7, height, allegiance: hostile ? 'enemy' : 'ally' };
  if (hostile) group.scale.setScalar(1.40 / height);
  // Every frame uses the SAME seven meshes. Ground stones morph continuously
  // into their body masses; no opacity disappearance, mesh swap or sudden spawn.
  const assemblyOrder = ['Left leg', 'Right leg', 'Pelvis', 'Chest', 'Left arm', 'Right arm', 'Head'];
  const starts = [[-1.20, 1.12], [1.24, 1.08], [-0.9, -0.75], [0.85, -0.82],
    [-1.65, 0.2], [1.60, 0.2], [0, 1.55]];
  const assembly = { lead: 0.45, step: 0.74, flight: 0.64, duration: 6.13 };
  const smooth = n => { const t = THREE.MathUtils.clamp(n, 0, 1); return t * t * (3 - 2 * t); };
  function assemble(time) {
    pose('stand', time, false);
    const locked = [];
    let active = null;
    for (let index = 0; index < assemblyOrder.length; index++) {
      const name = assemblyOrder[index];
      const p = parts.get(name);
      const u = THREE.MathUtils.clamp((time - assembly.lead - index * assembly.step) / assembly.flight, 0, 1);
      if (u >= 1) { setShape(p, 1); locked.push(name); continue; }
      if (u > 0) active = name;
      const finalQuaternion = p.root.quaternion.clone();
      const target = p.baseCenter.clone().applyQuaternion(finalQuaternion).add(p.basePosition);
      const start = new THREE.Vector3(starts[index][0], -source.boundingBox.min.y, starts[index][1]);
      const travel = smooth(u), shape = smooth((u - .30) / .65);
      p.root.position.copy(start).lerp(target, travel);
      p.root.position.y += Math.sin(Math.PI * travel) * 0.55;
      p.root.position.x += Math.sin(Math.PI * travel) * (index % 2 ? 0.16 : -0.16);
      p.root.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), index * 0.93);
      p.root.quaternion.slerp(finalQuaternion, travel);
      p.root.rotateY(Math.sin(Math.PI * travel) * 1.85);
      p.mesh.position.set(0, 0, 0);
      setShape(p, shape);
      for (const child of p.mesh.children) child.visible = false;
    }
    // Illuminate a joint only after the stones on both sides have locked.
    const jointRequirements = [['Head', 'Chest'], ['Chest', 'Pelvis'], ['Left arm', 'Chest'],
      ['Right arm', 'Chest'], ['Left leg', 'Pelvis'], ['Right leg', 'Pelvis']];
    joints.children.forEach((joint, i) => { joint.visible = jointRequirements[i].every(name => locked.includes(name)); });
    group.updateMatrixWorld(true);
    return { locked, active, waiting: assemblyOrder.filter(name => !locked.includes(name) && name !== active),
      duration: assembly.duration, complete: time >= assembly.duration };
  }
  return { group, parts, pose, assemble, assembly, assemblyOrder, height, dispose() {
    for (const geo of ownedGeometries) geo.dispose();
    stone.dispose(); rune.dispose(); groove.dispose(); group.removeFromParent();
  } };
}
