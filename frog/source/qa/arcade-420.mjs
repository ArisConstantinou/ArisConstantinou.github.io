import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = new URL(process.env.BASE_URL || 'http://127.0.0.1:4173/');
base.searchParams.set('test', '1');
const out = process.env.OUT_DIR || 'qa/arcade-420-evidence';
await fs.mkdir(out, { recursive: true });
const report = {
  version: '4.2.0',
  checks: [],
  errors: [],
  screenshots: [],
  limitations: [
    'Chromium desktop and CDP touch emulation, not a physical iPhone or Android.',
    'Input is dispatched through real browser handlers. Long simulations use the production model test hook with the live input handler; real WebGL frames and screenshots are rendered at checkpoints.',
    'Software-rendered browser verification does not measure real-device FPS.',
  ],
};
const check = name => { report.checks.push(name); console.log(`PASS ${name}`); };
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage'],
});
let activePage;

async function boot(context) {
  const page = await context.newPage();
  activePage = page;
  page.setDefaultTimeout(120000);
  page.on('pageerror', error => report.errors.push(error.stack || error.message));
  await page.goto(base.href, { waitUntil: 'networkidle', timeout: 180000 });
  await page.waitForFunction(() => window.__FROG__?.version === '4.2.0', null, { timeout: 180000 });
  await page.evaluate(() => window.frogArcade.renderer.setAnimationLoop(null));
  return page;
}

// Keep production rendering intact. Fixed-step checks read the actual input
// handlers, execute the real simulation/events, and update the original model.
async function advance(page, frames = 1) {
  await page.evaluate(n => {
    const g = window.frogArcade;
    for (let i = 0; i < n && g.running; i++) {
      g.elapsed += 1 / 60;
      window.__FROG__.test.step(g.currentInput(), 1);
      g.renderActors(1 / 60);
    }
  }, frames);
}

async function frame(page) {
  await page.evaluate(() => {
    const g = window.frogArcade;
    g.frame(g.last + 1000 / 60 + 0.001);
  });
}

async function render(page, name) {
  await frame(page);
  await page.evaluate(() => window.frogArcade.renderer.getContext().finish());
  const path = `${out}/${name}.png`;
  await page.screenshot({ path });
  report.screenshots.push(path);
}

const state = page => page.evaluate(() => window.__FROG__.inspect());
const input = page => page.evaluate(() => window.frogArcade.currentInput());
const angleDifference = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));

async function camera(page) {
  return page.evaluate(() => {
    const g = window.frogArcade, p = g.state.actors[0];
    const body = g.project(p.x, g.ground(p.x, p.z) + 1, p.z);
    return {
      mode: g.viewMode,
      x: g.camera.position.x - p.x,
      y: g.camera.position.y - g.ground(p.x, p.z),
      z: g.camera.position.z - p.z,
      lookX: g.focus.x - p.x,
      lookZ: g.focus.z - p.z,
      body,
      width: g.w,
      height: g.h,
    };
  });
}

async function layout(page, label, includeActions = false) {
  const result = await page.evaluate(include => {
    const ids = ['move-stick', 'aim-stick', 'minimap', 'view-button', 'pause-button'];
    if (include) ids.push('kick-button', 'catapult-button', 'catapult-status');
    const rects = ids.map(id => document.getElementById(id)).filter(el => el && !el.hidden && getComputedStyle(el).display !== 'none').map(el => {
      const r = el.getBoundingClientRect();
      return { id: el.id, x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
    });
    return { rects, width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth };
  }, includeActions);
  assert.ok(result.scrollWidth <= result.width, `${label}: horizontal overflow`);
  for (const r of result.rects) {
    assert.ok(r.width > 0 && r.height > 0, `${label}: empty ${r.id}`);
    assert.ok(r.x >= -0.5 && r.y >= -0.5 && r.right <= result.width + 0.5 && r.bottom <= result.height + 0.5, `${label}: ${r.id} outside viewport`);
  }
  for (let i = 0; i < result.rects.length; i++) for (let j = i + 1; j < result.rects.length; j++) {
    const a = result.rects[i], b = result.rects[j];
    const overlapX = Math.min(a.right, b.right) - Math.max(a.x, b.x);
    const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y);
    assert.ok(overlapX <= 1 || overlapY <= 1, `${label}: ${a.id} overlaps ${b.id}`);
  }
  check(`${label}: visible controls and map fit without overlapping or scrolling`);
}

const touch = (cdp, type, touchPoints) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints });
async function stick(page, id, pointerId, x = 0, y = 0) {
  const r = await page.locator(`#${id}`).boundingBox();
  assert.ok(r, `${id} is missing`);
  return { id: pointerId, x: r.x + r.width * (0.5 + x * 0.5), y: r.y + r.height * (0.5 + y * 0.5) };
}

async function prepareDefense(page) {
  await page.evaluate(() => {
    const g = window.frogArcade, s = g.state, p = s.actors[0], rival = s.actors[1];
    g.clearInputs();
    s.phase = 'battle'; s.status = 'playing'; s.bullets.length = 0;
    Object.assign(p, { x: 0, z: 8, ammo: 0, dizzy: 0, dizzyTime: 0, hop: 0, hopX: 0, hopZ: 0, height: 0, kick: 0, kickCooldown: 0, impulseX: 0, impulseZ: 0, ko: false });
    Object.assign(rival, { x: 2.2, z: 8, ammo: 0, dizzy: 0, dizzyTime: 0, hop: 0, hopX: 0, hopZ: 0, height: 0, kick: 0, kickCooldown: 99, shot: 99, tongue: 99, idle: 99, brain: 99, impulseX: 0, impulseZ: 0, ko: false });
    Object.assign(s.actors[2], { x: -15, z: -15, ammo: 0, shot: 99, tongue: 99, idle: 99, brain: 99, kickCooldown: 99 });
    for (const f of s.flies) f.wait = 10;
    g.updateHUD();
  });
}

try {
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  const page = await boot(desktop);
  assert.equal(await page.locator('#menu-main button:visible').count(), 2);
  await page.locator('#play-button').click();
  await frame(page);
  assert.equal(await page.locator('#tongue-button').count(), 0);
  assert.equal(await page.locator('#minimap').isVisible(), true);
  const top = await camera(page);
  assert.equal(top.mode, 'overview');
  assert.ok(Math.abs(top.lookX) < 0.05 && Math.abs(top.lookZ) < 0.05, 'Overview looks directly at player reference');
  assert.ok(Math.abs(top.body.x - top.width / 2) < 8 && Math.abs(top.body.y - top.height / 2) < 18);
  assert.ok(top.y > 10 && Math.abs(top.z) > 2, 'Overview retains an oblique 3D angle');
  await render(page, 'desktop-overview');
  check('Desktop starts in centered, tilted overview with minimap and no manual tongue control');

  const initial = await state(page);
  await advance(page, 600);
  const idle = await state(page);
  assert.deepEqual(idle.actors.slice(1), initial.actors.slice(1));
  assert.equal(idle.actors[0].dizzy, 0);
  assert.notEqual(idle.phase, 'battle');
  check('Ten simulated seconds idle cannot start battle or allow rivals to ambush the player');

  await page.keyboard.down('w');
  await advance(page, 30);
  await page.keyboard.up('w');
  await advance(page, 120);
  const collected = await state(page);
  assert.ok(collected.ammo >= 5, `Automatic pickup reached ${collected.ammo} flies`);
  assert.equal(collected.phase, 'practice');
  assert.notEqual(await page.locator('#ammo-percent').innerText(), '0%');
  check('Moving into the first swarm collects flies automatically and enters safe shooting practice');

  await page.keyboard.press('c');
  await frame(page);
  const side = await camera(page);
  assert.equal(side.mode, 'chase3d');
  assert.ok(side.y < top.y && Math.abs(side.x) > 2);
  assert.ok(side.body.visible && side.body.x > side.width * 0.12 && side.body.x < side.width * 0.88);
  await render(page, 'desktop-third-person');
  const beforeAim = await camera(page);
  await page.mouse.move(960, 390);
  await frame(page);
  const afterAim = await camera(page);
  assert.ok(Math.hypot(beforeAim.x - afterAim.x, beforeAim.z - afterAim.z) < 0.2);
  check('C switches to lower side third-person; aiming leaves the camera heading stable');

  const shotsBefore = await page.evaluate(() => window.frogArcade.state.stats.shots);
  await page.mouse.down();
  await frame(page);
  await page.mouse.up();
  assert.ok(await page.evaluate(() => window.frogArcade.state.stats.shots) > shotsBefore);
  assert.equal((await state(page)).phase, 'countdown');
  check('Actual mouse firing spends fly ammunition and starts the five-second warning');
  await advance(page, 240);
  assert.equal((await state(page)).phase, 'countdown');
  await page.locator('#pause-button').click();
  const paused = await page.evaluate(() => ({ time: window.frogArcade.state.time, intro: window.frogArcade.state.intro }));
  await frame(page);
  assert.deepEqual(await page.evaluate(() => ({ time: window.frogArcade.state.time, intro: window.frogArcade.state.intro })), paused);
  assert.equal(await page.evaluate(() => window.frogArcade.sound.ctx?.state), 'suspended');
  await page.locator('#play-button').click();
  await advance(page, 75);
  assert.equal((await state(page)).phase, 'battle');
  check('Warning is not skipped; pause freezes simulation and audio, and resume completes countdown');

  await prepareDefense(page);
  await page.keyboard.press('q');
  await advance(page, 1);
  assert.ok(await page.evaluate(() => window.frogArcade.state.actors[0].kick) > 0);
  await advance(page, 20);
  const defense = await page.evaluate(() => { const [p, r] = window.frogArcade.state.actors; return { ammo: p.ammo, ko: r.ko, distance: Math.hypot(r.x - p.x, r.z - p.z) }; });
  assert.equal(defense.ammo, 0);
  assert.equal(defense.ko, false);
  assert.ok(defense.distance > 3, 'Defensive kick pushes an active opponent away');
  check('A brief Q tap works with no ammunition and pushes a normal opponent away without instant KO');

  await page.evaluate(() => {
    const g = window.frogArcade, s = g.state, p = s.actors[0], rival = s.actors[1];
    g.clearInputs(); s.phase = 'battle'; s.bullets.length = 0;
    Object.assign(p, { x: 0, z: 8, ammo: 24, dizzy: 0, dizzyTime: 0, shot: 0, hop: 0, hopX: 0, hopZ: 0, idle: 0, kick: 0, kickCooldown: 0, impulseX: 0, impulseZ: 0 });
    Object.assign(rival, { x: 0, z: 0, ammo: 0, dizzy: 6, dizzyTime: 4.5, finishHits: 0, invuln: 0, hop: 0, hopX: 0, hopZ: 0, idle: 99, tongue: 99, shot: 99, kickCooldown: 99, impulseX: 0, impulseZ: 0, ko: false });
    g.cameraReady = false;
  });
  await frame(page);
  const rangedTarget = await page.evaluate(() => {
    const g = window.frogArcade, [p, r] = g.state.actors;
    return g.project(r.x, g.ground(p.x, p.z) + 0.9, r.z);
  });
  assert.ok(rangedTarget.visible && rangedTarget.x > 0 && rangedTarget.x < 1280 && rangedTarget.y > 0 && rangedTarget.y < 800);
  await page.mouse.move(rangedTarget.x, rangedTarget.y);
  await page.mouse.down();
  await page.evaluate(() => {
    const g = window.frogArcade;
    for (let i = 0; i < 120 && !g.state.actors[1].ko; i++) {
      g.elapsed += 1 / 60;
      window.__FROG__.test.step(g.currentInput(), 1);
      g.renderActors(1 / 60);
    }
  });
  await page.mouse.up();
  assert.equal(await page.evaluate(() => window.frogArcade.state.actors[1].ko), true);
  assert.equal(await page.evaluate(() => window.frogArcade.state.actors[0].kick), 0);
  assert.ok(await page.evaluate(() => window.frogArcade.state.stats.hits) >= 3);
  assert.equal(await page.evaluate(() => window.frogArcade.lastPlayerHit?.id), 'rival-1');
  assert.equal(await page.evaluate(() => window.frogArcade.hitConfirmUntil > window.frogArcade.elapsed), true);
  await render(page, 'desktop-ranged-hit');
  check('Real mouse-aimed projectiles finish a dizzy opponent from beyond kick range');

  await page.evaluate(() => {
    const g = window.frogArcade, s = g.state, p = s.actors[0];
    const machine = s.catapults.find(c => c.owner === p.id);
    if (!machine) throw new Error('Missing player catapult');
    g.clearInputs(); s.phase = 'battle'; s.bullets.length = 0; s.shells.length = 0;
    Object.assign(machine, { cooldown: 0, loaded: true, occupant: null });
    Object.assign(p, { x: machine.x, z: machine.z - 1, ammo: 7, hop: 0, hopX: 0, hopZ: 0, height: 0, idle: 0, kick: 0, kickCooldown: 0, dizzy: 0, dizzyTime: 0, impulseX: 0, impulseZ: 0, catapultId: null });
    for (const rival of s.actors.slice(1)) Object.assign(rival, { ammo: 0, idle: 99, tongue: 99, shot: 99, brain: 99, kickCooldown: 99 });
    g.cameraReady = false; g.updateHUD();
  });
  if ((await state(page)).viewMode !== 'overview') await page.keyboard.press('c');
  await frame(page);
  await page.keyboard.press('e');
  await advance(page, 1);
  const mounted = await page.evaluate(() => {
    const g = window.frogArcade, p = g.state.actors[0], m = g.state.catapults.find(c => c.owner === p.id);
    return { id: p.catapultId, machineId: m.id, occupant: m.occupant, ammo: p.ammo, x: p.x, z: p.z };
  });
  assert.equal(mounted.id, mounted.machineId); assert.equal(mounted.occupant, 'player');
  await frame(page);
  const landing = await page.evaluate(() => {
    const g = window.frogArcade, p = g.state.actors[0];
    return g.project(p.x + 6, g.ground(p.x + 6, p.z - 8), p.z - 8);
  });
  await page.mouse.move(landing.x, landing.y);
  await advance(page, 1);
  assert.equal(await page.evaluate(() => window.frogArcade.catapultAim.active), true);
  await page.keyboard.down('w');
  await advance(page, 12);
  await page.keyboard.up('w');
  assert.deepEqual(await page.evaluate(() => { const p = window.frogArcade.state.actors[0]; return { x: p.x, z: p.z }; }), { x: mounted.x, z: mounted.z });
  assert.equal(await page.evaluate(() => window.frogArcade.state.shells.length), 0);
  await render(page, 'desktop-catapult-aim');
  const preview = await page.evaluate(() => ({ arc: window.frogArcade.artilleryView.previewLine.visible, landing: window.frogArcade.artilleryView.landingMarker.visible }));
  assert.equal(preview.arc, true); assert.equal(preview.landing, true);
  const plannedLanding = await page.evaluate(() => ({ ...window.frogArcade.catapultAim.target }));
  await page.mouse.click(landing.x, landing.y);
  await advance(page, 1);
  const launch = await page.evaluate(() => {
    const g = window.frogArcade, p = g.state.actors[0], m = g.state.catapults.find(c => c.owner === p.id);
    const shell = g.state.shells.find(s => s.owner === p.id);
    return { ammo: p.ammo, shells: g.state.shells.filter(s => s.owner === p.id).length, loaded: m.loaded, cooldown: m.cooldown, target: shell && { x: shell.tx, z: shell.tz } };
  });
  assert.equal(launch.ammo, mounted.ammo); assert.equal(launch.shells, 1); assert.equal(launch.loaded, false); assert.ok(launch.cooldown > 0);
  assert.ok(Math.hypot(launch.target.x - plannedLanding.x, launch.target.z - plannedLanding.z) < 0.02, 'Catapult shell lands at the preview target');
  await advance(page, 35);
  await render(page, 'desktop-catapult-flight');
  assert.ok(await page.evaluate(() => window.frogArcade.state.shells.some(s => s.owner === 'player' && s.age > 0 && s.age < s.duration)));
  await advance(page, 190);
  assert.equal(await page.evaluate(() => window.frogArcade.state.catapults.find(c => c.owner === 'player').loaded), true);
  await page.keyboard.press('e');
  await advance(page, 1);
  assert.equal(await page.evaluate(() => window.frogArcade.state.actors[0].catapultId), null);
  check('Owned catapult mounts with E, previews mouse aim, fires on click, preserves fly ammo, reloads and dismounts');

  await page.locator('#pause-button').click();
  const saved = await state(page);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__FROG__?.version === '4.2.0');
  await page.evaluate(() => window.frogArcade.renderer.setAnimationLoop(null));
  assert.match(await page.locator('#play-button').innerText(), /ΣΥΝΕΧΕΙΑ/);
  await page.locator('#play-button').click();
  assert.equal((await state(page)).ammo, saved.ammo);
  assert.equal((await state(page)).phase, saved.phase);
  check('Save/reload retains ammunition and battle phase');
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  const phone = await boot(mobile);
  await phone.locator('#play-button').tap();
  await frame(phone);
  assert.equal((await state(phone)).viewMode, 'overview');
  assert.equal(await phone.locator('#tongue-button').count(), 0);
  await layout(phone, 'Portrait phone');
  await render(phone, 'phone-portrait-overview');
  const cdp = await mobile.newCDPSession(phone);

  let left = await stick(phone, 'move-stick', 1, 0, -0.9);
  await touch(cdp, 'touchStart', [left]);
  await advance(phone, 34);
  await touch(cdp, 'touchEnd', []);
  await advance(phone, 120);
  assert.ok((await state(phone)).ammo >= 5);
  assert.equal((await state(phone)).phase, 'practice');
  check('Actual left-stick movement enters a swarm and refills without a collection button');

  left = await stick(phone, 'move-stick', 1, 0.35, 0);
  await touch(cdp, 'touchStart', [left]);
  const soft = await input(phone);
  assert.ok(Math.hypot(soft.mx, soft.mz) > 0.1 && Math.hypot(soft.mx, soft.mz) < 0.6);
  await advance(phone, 5);
  const earlier = await phone.evaluate(() => { const p = window.frogArcade.state.actors[0]; return { x: p.x, z: p.z, face: p.face }; });
  left = await stick(phone, 'move-stick', 1, 0.2, 0.9);
  await touch(cdp, 'touchMove', [left]);
  const turned = await input(phone);
  await advance(phone, 14);
  const later = await phone.evaluate(() => { const g = window.frogArcade, p = g.state.actors[0]; return { x: p.x, z: p.z, face: p.face, yaw: g.models[0].group.rotation.y }; });
  assert.ok((later.x - earlier.x) * turned.mx + (later.z - earlier.z) * turned.mz > 0.2);
  assert.ok(angleDifference(later.face, Math.atan2(turned.mx, turned.mz)) < 0.3);
  assert.ok(angleDifference(later.yaw, later.face) < 0.45);
  await touch(cdp, 'touchEnd', []);
  check('Analog tilt preserves intensity; changing direction steers mid-hop and turns the visible frog');

  left = await stick(phone, 'move-stick', 1, 0.45, 0);
  let right = await stick(phone, 'aim-stick', 2, 0.35, 0);
  await touch(cdp, 'touchStart', [left, right]);
  let controls = await input(phone);
  assert.ok(Math.hypot(controls.mx, controls.mz) > 0.1);
  assert.equal(controls.aiming, true);
  assert.equal(controls.fire, false);
  await advance(phone, 2);
  check('Two simultaneous fingers move and deliberately aim; the inner ring does not fire');
  const phoneShots = await phone.evaluate(() => window.frogArcade.state.stats.shots);
  right = await stick(phone, 'aim-stick', 2, 0.92, 0);
  await touch(cdp, 'touchMove', [left, right]);
  await frame(phone);
  assert.ok(await phone.evaluate(() => window.frogArcade.state.stats.shots) > phoneShots);
  assert.equal((await state(phone)).phase, 'countdown');
  // CDP ends the listed contact; leave the movement finger held.
  await touch(cdp, 'touchEnd', [right]);
  controls = await input(phone);
  assert.equal(controls.aiming, false);
  assert.equal(controls.fire, false);
  assert.ok(Math.hypot(controls.mx, controls.mz) > 0.1);
  await advance(phone, 20);
  const movingYaw = await phone.evaluate(() => { const g = window.frogArcade, p = g.state.actors[0]; return { face: p.face, yaw: g.models[0].group.rotation.y }; });
  assert.ok(angleDifference(movingYaw.face, movingYaw.yaw) < 0.3);
  await touch(cdp, 'touchEnd', []);
  controls = await input(phone);
  assert.equal(controls.mx, 0); assert.equal(controls.mz, 0); assert.equal(controls.fire, false);
  check('Outer ring fires while moving; releasing aim alone restores movement-facing and stops fire');

  await phone.locator('#view-button').tap();
  await frame(phone);
  const portraitSide = await camera(phone);
  assert.equal(portraitSide.mode, 'chase3d');
  assert.ok(portraitSide.body.visible && portraitSide.body.x > 40 && portraitSide.body.x < 350);
  await render(phone, 'phone-portrait-third-person');
  await phone.locator('#view-button').tap();
  await frame(phone);
  assert.equal((await state(phone)).viewMode, 'overview');
  check('Touch camera toggle changes once per tap and keeps the player inside portrait framing');

  await prepareDefense(phone);
  assert.equal(await phone.locator('#kick-button').isVisible(), true);
  await phone.locator('#kick-button').tap();
  await advance(phone, 1);
  assert.ok(await phone.evaluate(() => window.frogArcade.state.actors[0].kick) > 0);
  await advance(phone, 20);
  assert.equal(await phone.evaluate(() => window.frogArcade.state.actors[1].ko), false);
  check('Contextual mobile kick accepts a short tap against an active opponent with an empty mouth');

  await phone.evaluate(() => {
    const g = window.frogArcade, s = g.state, p = s.actors[0], m = s.catapults.find(c => c.owner === p.id);
    g.clearInputs(); s.phase = 'battle'; s.status = 'playing'; s.bullets.length = 0; s.shells.length = 0;
    Object.assign(p, { x: m.x, z: m.z - 1, ammo: 6, catapultId: null, hop: 0, hopX: 0, hopZ: 0, height: 0, idle: 0, dizzy: 0, dizzyTime: 0, kick: 0, kickCooldown: 0, impulseX: 0, impulseZ: 0 });
    Object.assign(m, { occupant: null, loaded: true, cooldown: 0 });
    s.actors.slice(1).forEach((r, i) => Object.assign(r, { x: i ? 18 : -18, z: -12, ammo: 0, idle: 99, tongue: 99, shot: 99, kickCooldown: 99, hop: 0, hopX: 0, hopZ: 0, impulseX: 0, impulseZ: 0 }));
    g.cameraReady = false; g.updateHUD();
  });
  await frame(phone);
  assert.equal(await phone.locator('#catapult-button').isVisible(), true);
  await phone.locator('#catapult-button').tap();
  await advance(phone, 1);
  assert.ok(await phone.evaluate(() => window.frogArcade.state.actors[0].catapultId));
  await layout(phone, 'Portrait catapult controls', true);
  right = await stick(phone, 'aim-stick', 6, 0, -0.45);
  await touch(cdp, 'touchStart', [right]);
  await advance(phone, 1);
  right = await stick(phone, 'aim-stick', 6, 0.55, -0.55);
  await touch(cdp, 'touchMove', [right]);
  await advance(phone, 12);
  assert.equal(await phone.evaluate(() => window.frogArcade.state.shells.length), 0);
  assert.equal(await phone.evaluate(() => window.frogArcade.state.actors[0].ammo), 6);
  await render(phone, 'phone-catapult-aim');
  assert.equal(await phone.evaluate(() => window.frogArcade.artilleryView.previewLine.visible), true);
  assert.equal(await phone.evaluate(() => window.frogArcade.artilleryView.landingMarker.visible), true);
  const touchLanding = await phone.evaluate(() => ({ ...window.frogArcade.catapultAim.target }));
  await touch(cdp, 'touchEnd', []);
  await advance(phone, 1);
  assert.equal(await phone.evaluate(() => window.frogArcade.state.shells.filter(s => s.owner === 'player').length), 1);
  assert.equal(await phone.evaluate(() => window.frogArcade.state.actors[0].ammo), 6);
  const touchShell = await phone.evaluate(() => { const s = window.frogArcade.state.shells.find(s => s.owner === 'player'); return { x: s.tx, z: s.tz }; });
  assert.ok(Math.hypot(touchShell.x - touchLanding.x, touchShell.z - touchLanding.z) < 0.02, 'Mobile shell lands at its preview target');
  await advance(phone, 28);
  await render(phone, 'phone-catapult-flight');
  await phone.locator('#catapult-button').tap();
  await advance(phone, 1);
  assert.equal(await phone.evaluate(() => window.frogArcade.state.actors[0].catapultId), null);
  check('Mobile catapult reuses right-stick hold/drag/release, shows arc and landing marker, and preserves flies');

  left = await stick(phone, 'move-stick', 1, -0.5, 0);
  right = await stick(phone, 'aim-stick', 2, 0.9, 0);
  await touch(cdp, 'touchStart', [left, right]);
  await phone.evaluate(() => window.frogArcade.pause());
  controls = await input(phone);
  assert.equal(controls.mx, 0); assert.equal(controls.mz, 0); assert.equal(controls.fire, false); assert.equal(controls.aiming, false);
  assert.equal(await phone.evaluate(() => window.frogArcade.sound.ctx?.state), 'suspended');
  await touch(cdp, 'touchEnd', []);
  await phone.locator('#play-button').tap();
  await phone.setViewportSize({ width: 844, height: 390 });
  await frame(phone);
  await layout(phone, 'Landscape phone');
  await render(phone, 'phone-landscape-overview');
  left = await stick(phone, 'move-stick', 3, 0.5, 0);
  await touch(cdp, 'touchStart', [left]);
  assert.ok(Math.hypot((await input(phone)).mx, (await input(phone)).mz) > 0.1);
  await touch(cdp, 'touchEnd', []);
  check('Pause clears both touch controls and audio; controls recover after resume and rotation');
  await mobile.close();

  assert.deepEqual(report.errors, []);
  check('No uncaught browser runtime errors in desktop or touch flows');
  report.ok = true;
} catch (error) {
  report.ok = false;
  report.failure = error.stack || String(error);
  process.exitCode = 1;
  console.error(error);
  if (activePage && !activePage.isClosed()) {
    try { await activePage.screenshot({ path: `${out}/failure.png`, timeout: 15000 }); } catch {}
  }
} finally {
  await fs.writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
