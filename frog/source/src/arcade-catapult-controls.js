import * as THREE from 'three';
import { ARTILLERY, stoneTarget } from './arcade-artillery.js';

// The catapult is a separate machine: mounting never replaces the frog's ammo.
export function installCatapultControls(game) {
  game.catapultAim = { active: false, target: null };
  let pendingInteract = false, pendingThrow = null;
  const mounted = () => !!game.state.actors[0].catapultId;
  game.updateCatapultAim = () => {
    if (!mounted()) { game.catapultAim = { active: false, target: null }; return; }
    const p = game.state.actors[0];
    // Recompute from the displayed camera, including the frame immediately
    // after mounting. The visible preview and the click use this same ray.
    if (!game.touch && game.mouse.valid) {
      const ray = new THREE.Raycaster(), point = new THREE.Vector3();
      ray.setFromCamera(new THREE.Vector2(game.mouse.x / game.w * 2 - 1, 1 - game.mouse.y / game.h * 2), game.camera);
      if (ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -game.ground(p.x, p.z)), point)) {
        const dx = point.x - p.x, dz = point.z - p.z, distance = Math.hypot(dx, dz);
        if (distance > .01) game.aim = { x: dx / distance, z: dz / distance, distance };
      }
    }
    const direction = game.aim || { x: p.aimX, z: p.aimZ };
    const power = game.touch ? Math.max(0, Math.min(1, (game.aimStrength - .08) / .92)) :
      Math.max(0, Math.min(1, ((direction.distance || 17) - ARTILLERY.minRange) / (ARTILLERY.maxRange - ARTILLERY.minRange)));
    game.catapultAim = { active: true, target: stoneTarget(p, direction.x, direction.z, power) };
  };
  const originalInput = game.currentInput.bind(game), originalClear = game.clearInputs.bind(game);
  game.currentInput = () => {
    const input = originalInput();
    if (mounted()) {
      game.updateCatapultAim();
      input.fire = false;
      input.aiming = true;
      input.ax = game.aim.x; input.az = game.aim.z;
    }
    if (pendingInteract) { input.interactCatapult = true; pendingInteract = false; }
    if (pendingThrow) { input.throwStone = pendingThrow; input.fire = false; pendingThrow = null; }
    return input;
  };
  game.clearInputs = () => {
    pendingInteract = false; pendingThrow = null;
    game.catapultAim = { active: false, target: null };
    originalClear();
  };
  const button = game.$('catapult-button');
  button.onpointerdown = event => {
    if (!game.running || button.disabled || (!mounted() && game.state.phase !== 'battle')) return;
    event.preventDefault(); pendingInteract = true;
  };
  button.onclick = event => { if (event.detail === 0 && game.running && !button.disabled) pendingInteract = true; };
  addEventListener('keydown', event => {
    if (event.code !== 'KeyE' || event.repeat || event.target.matches('input,select') || !game.running || (!mounted() && game.state.phase !== 'battle')) return;
    event.preventDefault(); pendingInteract = true;
  });
  const stick = game.$('aim-stick');
  stick.addEventListener('pointerdown', () => { if (mounted()) game.updateCatapultAim(); });
  stick.addEventListener('pointermove', () => { if (mounted() && game.pointers.has('aim')) game.updateCatapultAim(); });
  // Capture before the normal release handler clears the thumb direction/strength.
  stick.addEventListener('pointerup', event => {
    if (!mounted() || !game.running || game.pointers.get('aim') !== event.pointerId) return;
    if (game.aimStrength > .15) { game.updateCatapultAim(); if (game.catapultAim.target.valid !== false) pendingThrow = { ...game.catapultAim.target }; }
  }, true);
  stick.addEventListener('pointercancel', () => { pendingThrow = null; }, true);
  game.renderer.domElement.addEventListener('pointerdown', event => {
    if (!mounted() || !game.running || event.pointerType === 'touch' || event.button !== 0) return;
    // Compute the latest real cursor ray before queuing a one-shot throw.
    originalInput(); game.updateCatapultAim(); if (game.catapultAim.target.valid !== false) pendingThrow = { ...game.catapultAim.target };
  });
}
