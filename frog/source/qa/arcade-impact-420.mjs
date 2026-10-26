import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const url = new URL(process.env.BASE_URL || 'http://127.0.0.1:4174/');
url.searchParams.set('test', '1');
const out = process.env.OUT_DIR || 'qa/arcade-420-impact-evidence';
await fs.mkdir(out, { recursive: true });
const report = { version: '4.2.0', checks: [], errors: [], screenshots: [], observations: {}, limitations: [
  'Actual Chromium WebGL rendering and real pointer handlers; not a physical phone or a measurement of device FPS.',
  'The controlled impact fixture holds a rival at a known position before the actual catapult shot. No synthetic damage or animation calls trigger the hit.',
] };
const check = name => { report.checks.push(name); console.log('PASS ' + name); };
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage'] });

async function boot(context) {
  const page = await context.newPage(); page.setDefaultTimeout(120000);
  page.on('pageerror', error => report.errors.push(error.stack || error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /THREE|shader|webgl|gl_invalid|uncaught/i.test(message.text())) report.errors.push(message.text());
  });
  await page.goto(url.href, { waitUntil: 'networkidle', timeout: 180000 });
  await page.waitForFunction(() => window.__FROG__?.version === '4.2.0');
  await page.evaluate(() => {
    const g = window.frogArcade; g.renderer.setAnimationLoop(null);
    window.impactQATick = () => {
      g.elapsed += 1 / 60;
      window.__FROG__.test.step(g.currentInput(), 1);
      g.renderActors(1 / 60);
      g.renderFlies();
      g.updateCatapultAim?.();
      g.artilleryView.update(1 / 60);
      g.impactEffects.update(1 / 60);
    };
  });
  await page.locator('#play-button').click();
  return page;
}
async function frame(page) {
  await page.evaluate(() => { const g = window.frogArcade; g.frame(g.last + .001); });
}
async function tick(page, count = 1) { await page.evaluate(n => { for (let i = 0; i < n; i++) window.impactQATick(); }, count); }
async function image(page, name) {
  await frame(page);
  await page.evaluate(() => window.frogArcade.renderer.getContext().finish());
  const file = `${out}/${name}.png`; await page.screenshot({ path: file }); report.screenshots.push(file);
}
async function actor(page) {
  return page.evaluate(() => {
    const g = window.frogArcade, a = g.state.actors[1], model = g.models[1];
    return { x: a.x, z: a.z, height: a.height, knockUp: a.knockUp, duration: a.knockUpDuration, peak: a.knockUpPeak, dizzy: a.dizzy, ko: a.ko, modelY: model.group.position.y, ground: g.ground(a.x, a.z) };
  });
}

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  const page = await boot(context);
  await page.evaluate(() => {
    const g = window.frogArcade, s = g.state, p = s.actors[0], c = s.catapults.find(c => c.owner === 'player');
    g.clearInputs(); s.phase = 'battle'; s.status = 'playing'; s.bullets.length = 0; s.shells.length = 0;
    Object.assign(p, { x: c.x, z: c.z - 2, ammo: 7, hop: 0, hopX: 0, hopZ: 0, height: 0, idle: 999, dizzyTime: 0, kick: 0, catapultId: null, impulseX: 0, impulseZ: 0 });
    Object.assign(c, { occupant: null, cooldown: 0, loaded: true });
    const rival = s.actors[1];
    Object.assign(rival, { x: 6, z: 4, ammo: 0, dizzy: 0, finishHits: 0, dizzyTime: 0, invuln: 0, ko: false, height: 0, hop: 0, hopX: 0, hopZ: 0, idle: 999, tongue: 999, shot: 999, machineTimer: 999, machineSeeking: false, kickCooldown: 999, impulseX: 0, impulseZ: 0, catapultId: null, knockUp: 0 });
    Object.assign(s.actors[2], { x: -18, z: -12, ammo: 0, idle: 999, tongue: 999, shot: 999, machineTimer: 999, machineSeeking: false, kickCooldown: 999, hop: 0, hopX: 0, hopZ: 0 });
    g.cameraReady = false; g.updateHUD();
  });
  await frame(page);
  await page.keyboard.press('e'); await tick(page, 1); await frame(page);
  assert.ok(await page.evaluate(() => window.frogArcade.state.actors[0].catapultId));
  const target = await page.evaluate(() => { const g = window.frogArcade, a = g.state.actors[1]; return g.project(a.x, g.ground(a.x, a.z), a.z); });
  await page.mouse.move(target.x, target.y); await tick(page, 1);
  await image(page, 'stone-before-shot');
  report.observations.before = await actor(page);
  assert.equal(report.observations.before.height, 0);
  const preview = await page.evaluate(() => ({ ...window.frogArcade.catapultAim.target }));
  await page.mouse.click(target.x, target.y); await tick(page, 1);
  const shell = await page.evaluate(() => ({ ...window.frogArcade.state.shells.find(s => s.owner === 'player') }));
  assert.ok(Number.isFinite(shell.tx));
  assert.ok(Math.hypot(preview.x - shell.tx, preview.z - shell.tz) < .02);
  assert.equal(await page.evaluate(() => window.frogArcade.state.actors[0].ammo), 7);
  check('Real mouse catapult shot matches its visible target and preserves fly ammunition');

  const impact = await page.evaluate(() => {
    const g = window.frogArcade;
    for (let i = 0; i < 100; i++) {
      window.impactQATick();
      const event = g.state.events.find(e => e.type === 'stoneImpact' && e.owner === 'player');
      if (event) return { event: { ...event }, hits: g.state.stats.hits, target: { ...g.state.actors[1] } };
    }
    return null;
  });
  assert.ok(impact, 'Actual projectile should land');
  assert.ok(impact.hits > 0);
  assert.ok(impact.target.knockUp > 0);
  assert.equal(impact.target.ko, false);
  assert.ok(Math.hypot(impact.event.x - shell.tx, impact.event.z - shell.tz) < .02);
  report.observations.impact = impact;
  check('Actual shell impact damages the rival and starts nonlethal knock-up');

  const half = Math.max(1, Math.round(impact.target.knockUpDuration * 30));
  await tick(page, half);
  await image(page, 'stone-hit-peak');
  const peak = await actor(page); report.observations.peak = peak;
  assert.ok(peak.height > .6, `Expected visible lift, got ${peak.height}`);
  assert.ok(Math.abs(peak.modelY - peak.ground - peak.height) < .06, 'Rendered model uses physical knock-up height');
  const effects = await page.evaluate(() => {
    const e = window.frogArcade.impactEffects;
    return {
      droplets: { name: e.droplets.name, instanced: e.droplets.isInstancedMesh, attached: !!e.droplets.parent, depthTest: e.droplets.material.depthTest, depthWrite: e.droplets.material.depthWrite },
      liveParticles: e.particles.filter(p => p.life > 0).length,
      activeRipples: e.ripples.filter(r => r.active).map(r => ({ name: r.mesh.name, attached: !!r.mesh.parent, depthTest: r.mesh.material.depthTest, depthWrite: r.mesh.material.depthWrite })),
    };
  });
  report.observations.effectsAtPeak = effects;
  assert.equal(effects.droplets.instanced, true); assert.equal(effects.droplets.attached, true);
  assert.equal(effects.droplets.depthTest, true); assert.equal(effects.droplets.depthWrite, true);
  assert.ok(effects.liveParticles > 0); assert.ok(effects.activeRipples.length > 0);
  assert.ok(effects.activeRipples.every(r => r.attached && r.depthTest && !r.depthWrite));
  check('Frog visibly rises while native 3D droplets and terrain ripples use scene depth');

  const landed = await page.evaluate(() => {
    const g = window.frogArcade;
    for (let i = 0; i < 80; i++) {
      window.impactQATick();
      const event = g.state.events.find(e => e.type === 'land' && e.id === 'rival-1' && e.stone);
      if (event) return { event: { ...event }, height: g.state.actors[1].height, knockUp: g.state.actors[1].knockUp };
    }
    return null;
  });
  assert.ok(landed, 'Launched rival should land'); assert.equal(landed.height, 0); assert.equal(landed.knockUp, 0);
  await image(page, 'stone-hit-landing');
  report.observations.landing = await actor(page);
  assert.ok(Math.abs(report.observations.landing.modelY - report.observations.landing.ground) < .06);
  check('Knock-up ends with the frog on the terrain and a real landing event');
  await context.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  const phone = await boot(mobile);
  await phone.evaluate(() => {
    const g = window.frogArcade, p = g.state.actors[0], c = g.state.catapults.find(c => c.owner === p.id);
    g.state.phase = 'battle'; Object.assign(p, { x: c.x, z: c.z - 2, ammo: 6, hop: 0, idle: 99 });
    for (const a of g.state.actors.slice(1)) Object.assign(a, { idle: 999, tongue: 999, shot: 999, machineTimer: 999 });
    g.cameraReady = false; g.updateHUD();
  });
  await frame(phone); await phone.locator('#catapult-button').tap(); await tick(phone, 1); await frame(phone);
  const boxes = await phone.evaluate(() => ['catapult-button', 'catapult-status', 'move-stick', 'aim-stick', 'minimap', 'view-button', 'pause-button'].map(id => {
    const e = document.getElementById(id), r = e.getBoundingClientRect();
    return { id, visible: !e.hidden, x: r.x, y: r.y, right: r.right, bottom: r.bottom };
  }));
  assert.ok(boxes.every(b => b.visible && b.x >= 0 && b.y >= 0 && b.right <= 390 && b.bottom <= 844));
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], b = boxes[j], x = Math.min(a.right, b.right) - Math.max(a.x, b.x), y = Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y);
    assert.ok(x <= 1 || y <= 1, `${a.id} overlaps ${b.id}`);
  }
  report.observations.portraitBoxes = boxes;
  await image(phone, 'phone-catapult-status');
  check('Portrait catapult status, exit action, sticks and map have no overlap');
  await mobile.close();
  assert.deepEqual(report.errors, []); check('No uncaught browser or WebGL shader errors in focused effects and layout checks');
  report.ok = true;
} catch (error) {
  report.ok = false; report.failure = error.stack || String(error); process.exitCode = 1; console.error(error);
} finally {
  await fs.writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
