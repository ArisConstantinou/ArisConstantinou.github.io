import * as THREE from 'three';
import { loadCharacters, createCharacter } from '../../src/characters.js';
import { createPropMesh } from '../../src/world.js';
import { createStoneCreature } from './creature.js';
import { drawLayout, layoutMetrics } from './layout.js';

const stage = document.querySelector('#stage');
const renderer = new THREE.WebGLRenderer({ canvas: stage.querySelector('canvas'), antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x34434d);
const camera = new THREE.OrthographicCamera(-4, 4, 2.5, -2.5, 0.1, 50);
camera.position.set(0, 3.45, 12);
camera.lookAt(0, 1.57, 0);
scene.add(new THREE.HemisphereLight(0xe7f2ff, 0x505258, 2.2));
const key = new THREE.DirectionalLight(0xfff2e5, 3.4);
key.position.set(-3, 7, 5);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -5; key.shadow.camera.right = 5;
key.shadow.camera.top = 5; key.shadow.camera.bottom = -5;
key.shadow.normalBias = 0.025; key.shadow.bias = -0.0002;
scene.add(key);
const fill = new THREE.DirectionalLight(0xc9e3ed, 1.4);
fill.position.set(4, 4, -3); scene.add(fill);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x40515b, roughness: 1 }));
floor.rotation.x = -Math.PI / 2; floor.position.y = -0.06;
floor.receiveShadow = true; scene.add(floor);
const stoneRef = createPropMesh('stone').mesh.children.find(child => child.isMesh).material;
const tileMaterial = stoneRef.clone(); tileMaterial.color.set(0x6a757d); tileMaterial.bumpScale = 0.017;
const tiles = new THREE.InstancedMesh(new THREE.BoxGeometry(0.98, .07, .98), tileMaterial, 60);
for (let x = 0; x < 10; x++) for (let z = 0; z < 6; z++) {
  tiles.setMatrixAt(x * 6 + z, new THREE.Matrix4().makeTranslation(x - 4.5, -.045, z - 2.5));
}
tiles.receiveShadow = true; scene.add(tiles);
const creature = createStoneCreature();
let minion = {group:new THREE.Group(),update(){}};
scene.add(creature.group, minion.group);
let mage;
let ready = false, animationTime = 0, controlledUntil = 0, last = performance.now();
const state = { panel: 'creature', view: 'front', pose: 'stand', assemblyPlaying: false };
let assemblyState = null;
const timeline = document.querySelector('#assembly-time');
const partNames = { 'Left leg': 'αριστερό πόδι', 'Right leg': 'δεξί πόδι', Pelvis: 'λεκάνη', Chest: 'θώρακας',
  'Left arm': 'αριστερό χέρι', 'Right arm': 'δεξί χέρι', Head: 'κεφάλι' };
drawLayout(document.querySelector('#map'));

function layout() {
  const mobile = stage.clientWidth < 650;
  const width = stage.clientWidth || 1000, height = stage.clientHeight || 530;
  renderer.setSize(width, height, false);
  const aspect = width / height;
  const viewHeight = Math.max(4.65, (mobile ? 5.4 : 8.2) / aspect);
  camera.left = -viewHeight * aspect / 2; camera.right = viewHeight * aspect / 2;
  camera.top = viewHeight / 2; camera.bottom = -viewHeight / 2;
  camera.updateProjectionMatrix();
  if (mage) mage.group.position.set(mobile ? -1.94 : -2.7, 0, 0.15);
  minion.group.position.set(mobile ? 2.04 : 2.8, 0, .1);
  if (state.pose === 'protect' && mage) mage.group.position.set(-1.45, 0, -0.45);
}
function setView(view) {
  state.view = view;
  const angle = { front: 0, side: Math.PI / 2, back: Math.PI, 'three-quarter': Math.PI / 5 }[view];
  creature.group.rotation.y = angle;
  minion.group.rotation.y = angle;
  for (const button of document.querySelectorAll('[data-view]')) {
    button.classList.toggle('active', button.dataset.view === view);
    button.setAttribute('aria-pressed', String(button.dataset.view === view));
  }
  render();
}
function setPose(pose) {
  state.pose = pose; animationTime = 0;
  state.assemblyPlaying = pose === 'assemble';
  document.querySelector('#assembly-pause').hidden = pose !== 'assemble';
  document.querySelector('#assembly-timeline').hidden = pose !== 'assemble';
  document.querySelector('#assemble-button').classList.toggle('active', pose === 'assemble');
  for (const button of document.querySelectorAll('[data-pose]')) {
    button.classList.toggle('active', button.dataset.pose === pose);
    button.setAttribute('aria-pressed', String(button.dataset.pose === pose));
  }
  layout(); update(0); render();
}
function setPanel(panel) {
  state.panel = panel;
  document.querySelector('#creature-panel').hidden = panel !== 'creature';
  document.querySelector('#castle-panel').hidden = panel !== 'castle';
  for (const [id, active] of [['creature-tab', panel === 'creature'], ['castle-tab', panel === 'castle']]) {
    const button = document.getElementById(id);
    button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active));
  }
  if (panel === 'creature') { layout(); render(); }
}
function update(dt) {
  if (state.pose !== 'assemble' || state.assemblyPlaying) animationTime += dt;
  if (state.pose === 'assemble') {
    animationTime = Math.min(animationTime, creature.assembly.duration);
    assemblyState = creature.assemble(animationTime);
    timeline.value = animationTime.toFixed(2);
    document.querySelector('#assembly-label').textContent = `${assemblyState.locked.length} / 7 · ${assemblyState.active ? partNames[assemblyState.active] : assemblyState.complete ? 'έτοιμος' : 'συναρμολόγηση'}`;
    if (assemblyState.complete) state.assemblyPlaying = false;
    document.querySelector('#assembly-pause').textContent = state.assemblyPlaying ? 'Παύση' : 'Συνέχεια';
    document.querySelector('#assembly-pause').disabled = assemblyState.complete;
  } else { assemblyState = null; creature.pose(state.pose, animationTime); }
  minion.update(dt, {moving:state.pose==='walk',speed:state.pose==='walk'?1.4:0});
  if (mage) mage.update(dt, { moving: state.pose === 'walk', speed: state.pose === 'walk' ? 1.4 : 0,
    casting: state.pose === 'assemble' && !assemblyState.complete });
}
function render() { if (state.panel === 'creature') renderer.render(scene, camera); }
for (const button of document.querySelectorAll('[data-view]')) button.addEventListener('click', () => setView(button.dataset.view));
for (const button of document.querySelectorAll('[data-pose]')) button.addEventListener('click', () => setPose(button.dataset.pose));
document.querySelector('#assemble-button').addEventListener('click', () => setPose('assemble'));
document.querySelector('#assembly-pause').addEventListener('click', () => {
  state.assemblyPlaying = !state.assemblyPlaying; update(0); render();
});
timeline.addEventListener('input', () => {
  state.assemblyPlaying = false; animationTime = +timeline.value; update(0); render();
});
document.querySelector('#creature-tab').addEventListener('click', () => setPanel('creature'));
document.querySelector('#castle-tab').addEventListener('click', () => setPanel('castle'));
new ResizeObserver(() => { if (state.panel === 'creature') { layout(); render(); } }).observe(stage);
window.addEventListener('keydown', event => {
  if (event.key.toLowerCase() === 'f' && !event.repeat) {
    if (document.fullscreenElement) document.exitFullscreen(); else stage.requestFullscreen();
  }
});
window.render_game_to_text = () => JSON.stringify({ mode: 'concept', ready, ...state,
  coordinates: 'metres; Y up, +Z forward; origin at Goliath feet',
  goliath: { rockMasses: creature.parts.size, height: +creature.height.toFixed(3),
    position: creature.group.position.toArray(), joints: 6, assembly: assemblyState },
  mageHeight: 1.85, minionHeight: 1.85, layout: layoutMetrics,
  renderer: { calls: renderer.info.render.calls, triangles: renderer.info.render.triangles,
    geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures },
});
window.advanceTime = ms => {
  controlledUntil = performance.now() + 1000;
  const steps = Math.max(1, Math.ceil(ms / (1000 / 60)));
  for (let i = 0; i < steps; i++) update(ms / steps / 1000);
  render();
};
// Read-only diagnostic geometry for checks; no game profile or save access.
window.conceptSnapshot = () => {
  const bounds = object => {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3();
    // Hidden, not-yet-lit rune children must not enlarge a ground stone's bounds.
    function visit(node) {
      if (!node.visible) return;
      if (node.isMesh) {
        if (node.isSkinnedMesh) box.union(new THREE.Box3().setFromObject(node));
        else {
          if (!node.geometry.boundingBox) node.geometry.computeBoundingBox();
          box.union(node.geometry.boundingBox.clone().applyMatrix4(node.matrixWorld));
        }
      }
      for (const child of node.children) visit(child);
    }
    visit(object);
    return { min: box.min.toArray(), max: box.max.toArray() };
  };
  return { state: { ...state }, animationTime, assembly: assemblyState, parts: [...creature.parts].map(([name, part]) => ({
    name, uuid: part.mesh.uuid, visible: part.mesh.visible, bounds: bounds(part.mesh), rotation: part.root.rotation.toArray().slice(0, 3) })),
    mage: mage ? bounds(mage.group) : null, goliath: bounds(creature.group), minion: bounds(minion.group) };
};
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05); last = now;
  if (ready && state.panel === 'creature' && now > controlledUntil) { update(dt); render(); }
  requestAnimationFrame(frame);
}
layout(); render(); requestAnimationFrame(frame);
try {
  await loadCharacters();
  minion.group.removeFromParent();minion=createCharacter('guard');scene.add(minion.group);
  mage = createCharacter('mage'); scene.add(mage.group);
  mage.update(0); layout(); update(0); ready = true;
  document.querySelector('#height-label').textContent = `${creature.height.toFixed(2).replace('.', ',')} m · 7 πέτρινες μάζες`;
  document.querySelector('#loading').remove(); render();
  if (new URLSearchParams(location.search).has('assembly')) setPose('assemble');
} catch (error) {
  document.querySelector('#loading').textContent = `Δεν φορτώθηκε το concept: ${error.message}`;
  console.error(error);
}
