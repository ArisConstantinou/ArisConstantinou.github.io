import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { existingRooms, newRooms, corridors } from '../_source/concepts/goliath/layout.js';
const skill = path.join(process.env.USERPROFILE, '.codex/skills/develop-web-game');
const { chromium } = await import(pathToFileURL(path.join(skill, 'node_modules/playwright/index.mjs')));
const { launchManagedBrowser } = await import(pathToFileURL(path.join(skill, 'scripts/browser_lifecycle.mjs')));
const output = path.resolve('output/goliath-concept/verification');
await fs.mkdir(output, { recursive: true });
const report = { date: new Date().toISOString(), kind: 'independent concept, no gameplay integration',
  checks: [], errors: [], performance: [], snapshots: [] };
const check = (name, passed, details = {}) => {
  report.checks.push({ name, passed, ...details });
  if (!passed) throw new Error(`Failed: ${name}: ${JSON.stringify(details)}`);
};
const rooms = [...existingRooms, ...newRooms], floors = [...rooms, ...corridors];
const overlap = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x))
  * Math.max(0, Math.min(a.z + a.d, b.z + b.d) - Math.max(a.z, b.z));
check('plan floor area has no overlapping rectangles', floors.every((a, i) => floors.slice(i + 1).every(b => overlap(a, b) === 0)));
function sharesDoor(a, b) {
  const alongX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const alongZ = Math.min(a.z + a.d, b.z + b.d) - Math.max(a.z, b.z);
  return (Math.abs(a.x + a.w - b.x) < .0001 || Math.abs(b.x + b.w - a.x) < .0001) && alongZ >= 3
    || (Math.abs(a.z + a.d - b.z) < .0001 || Math.abs(b.z + b.d - a.z) < .0001) && alongX >= 3;
}
check('every proposed corridor joins both named rooms with 3m opening', corridors.every(c =>
  sharesDoor(c, rooms.find(r => r.id === c.from)) && sharesDoor(c, rooms.find(r => r.id === c.to))));
const edges = [['bridge', 'courtyard'], ['courtyard', 'hall'], ['hall', 'crypt'], ...corridors.map(c => [c.from, c.to])];
const reached = new Set(['bridge']);
for (let i = 0; i < rooms.length; i++) for (const [a, b] of edges) {
  if (reached.has(a)) reached.add(b); if (reached.has(b)) reached.add(a);
}
check('all 14 rooms and bridge connected in plan', reached.size === rooms.length, { reached: [...reached] });
if (process.argv.includes('--plan-only')) {
  await fs.writeFile(path.join(output, 'plan-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ checks: report.checks.length, failed: report.checks.filter(c => !c.passed) }));
  process.exit(0);
}
const session = await launchManagedBrowser(chromium, { channel: 'chrome', headless: true,
  softwareRendering: false, screenshotDir: output });
const url = 'http://127.0.0.1:5173/.cache/goliath-concept/';
const attachErrors = page => {
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
};
const getText = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
const getSnapshot = page => page.evaluate(() => window.conceptSnapshot());
async function seek(page, seconds) {
  // Exercise the actual input handler; exact seek is scripted, buttons use native click/tap.
  await page.locator('#assembly-time').evaluate((input, time) => {
    input.value = String(time); input.dispatchEvent(new Event('input', { bubbles: true }));
  }, seconds);
}
async function metrics(page, pose) {
  await page.locator(pose === 'assemble' ? '#assemble-button' : `[data-pose="${pose}"]`).click();
  await page.waitForTimeout(150);
  return page.evaluate(async () => {
    const samples = [];
    await new Promise(resolve => {
      let previous;
      function frame(now) {
        if (previous !== undefined) samples.push(now - previous);
        previous = now;
        if (samples.length < 240) requestAnimationFrame(frame); else resolve();
      }
      requestAnimationFrame(frame);
    });
    const sorted = [...samples].sort((a, b) => a - b);
    const gl = document.querySelector('canvas').getContext('webgl2');
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    return { fps: +(samples.length * 1000 / samples.reduce((a, b) => a + b)).toFixed(2),
      p95Ms: +sorted[Math.floor(sorted.length * .95)].toFixed(2), maxMs: +sorted.at(-1).toFixed(2),
      over50ms: samples.filter(value => value > 50).length,
      gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'unavailable',
      dpr: devicePixelRatio, renderer: JSON.parse(window.render_game_to_text()).renderer };
  });
}
try {
  for (const [name, width, height] of [['desktop', 1440, 1050], ['portrait', 390, 844], ['landscape', 844, 390]]) {
    const context = await session.browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1,
      hasTouch: name !== 'desktop', isMobile: name !== 'desktop', serviceWorkers: 'block' });
    const page = await context.newPage(); attachErrors(page);
    const began = Date.now(); await page.goto(url);
    await page.waitForFunction(() => JSON.parse(window.render_game_to_text?.() || '{}').ready === true);
    const loaded = await getText(page);
    check(`${name}: assets loaded`, loaded.ready && loaded.goliath.rockMasses === 7 && loaded.goliath.height === 3.4,
      { readyMs: Date.now() - began, renderer: loaded.renderer });
    check(`${name}: page fits viewport`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    check(`${name}: touch targets`, await page.locator('.toolbar button').evaluateAll(buttons =>
      buttons.every(button => button.getBoundingClientRect().height >= 44)));
    const interact = selector => name === 'desktop' ? page.locator(selector).click() : page.locator(selector).tap();
    await interact('#assemble-button'); await seek(page, 0);
    const initial = await getSnapshot(page), identities = initial.parts.map(p => p.uuid);
    check(`${name}: seven real ground stones`, initial.parts.length === 7 && initial.parts.every(p => p.visible
      && Math.abs(p.bounds.min[1]) < .015 && p.bounds.max[1] - p.bounds.min[1] < .7), { stones: initial.parts });
    for (const [seconds, expected] of [[0, 0], [.78, 0], [1.15, 1], [1.90, 2], [2.63, 3], [3.37, 4], [4.11, 5], [4.85, 6], [6.13, 7]]) {
      await seek(page, seconds);
      const snapshot = await getSnapshot(page);
      check(`${name}: assembly ${seconds}s`, snapshot.assembly.locked.length === expected
        && snapshot.parts.every((part, i) => part.uuid === identities[i] && part.visible),
      { locked: snapshot.assembly.locked, active: snapshot.assembly.active });
      if (name === 'desktop' && [0, 1.90, 3.37, 6.13].includes(seconds)) {
        await page.locator('#stage').screenshot({ path: path.join(output, `assembly-${String(seconds).replace('.', '-')}.png`) });
        report.snapshots.push({ seconds, ...snapshot });
      }
    }
    // Sequential lock points and continuity on either side of every attachment.
    if (name === 'desktop') {
      for (let i = 0; i < 7; i++) {
        const t = .45 + i * .74 + .64;
        await seek(page, t - .01); const before = await getSnapshot(page);
        await seek(page, t + .01); const after = await getSnapshot(page);
        const largest = Math.max(...before.parts.map((part, j) => Math.max(...part.bounds.min.map((v, k) => Math.abs(v - after.parts[j].bounds.min[k])),
          ...part.bounds.max.map((v, k) => Math.abs(v - after.parts[j].bounds.max[k])))));
        check(`continuous attachment ${i + 1}`, largest < .05, { largestBoundDelta: largest });
      }
    }
    await seek(page, 1.4); await interact('#assembly-pause'); await page.waitForTimeout(220);
    const resumed = (await getSnapshot(page)).animationTime;
    check(`${name}: resume advances`, resumed > 1.5);
    await interact('#assembly-pause'); const paused = (await getSnapshot(page)).animationTime;
    await page.waitForTimeout(220);
    check(`${name}: pause freezes`, Math.abs((await getSnapshot(page)).animationTime - paused) < .002);
    await interact('#assemble-button'); await seek(page, 0);
    check(`${name}: replay restores seven stones`, (await getSnapshot(page)).assembly.locked.length === 0);
    await interact('[data-pose="stand"]');
    const still = await getSnapshot(page);
    check(`${name}: standing restored`, Math.abs(still.goliath.max[1] - 3.4) < .01
      && still.parts.filter(p => p.name.includes('leg')).every(p => Math.abs(p.bounds.min[1]) < .015));
    for (const view of ['front', 'side', 'back', 'three-quarter']) {
      await interact(`[data-view="${view}"]`);
      check(`${name}: ${view} view`, (await getText(page)).view === view);
      if (name === 'desktop') await page.screenshot({ path: path.join(output, `${view}.png`), fullPage: true });
    }
    await interact('[data-pose="protect"]');
    check(`${name}: blocking pose`, (await getSnapshot(page)).parts.some(p => p.name === 'Left arm' && p.rotation[0] < -.7));
    await page.screenshot({ path: path.join(output, `${name}-protect.png`), fullPage: true });
    await interact('[data-pose="walk"]'); await page.evaluate(() => window.advanceTime(120));
    const step1 = await getSnapshot(page);
    if (name === 'desktop') await page.locator('#stage').screenshot({ path: path.join(output, 'walk-1.png') });
    await page.evaluate(() => window.advanceTime(900)); const step2 = await getSnapshot(page);
    if (name === 'desktop') await page.locator('#stage').screenshot({ path: path.join(output, 'walk-2.png') });
    check(`${name}: stride changes`, step1.parts.some((part, i) => part.name.includes('leg')
      && Math.abs(part.bounds.min[2] - step2.parts[i].bounds.min[2]) > .1));
    check(`${name}: feet stay above floor`, step2.parts.filter(p => p.name.includes('leg')).every(p => p.bounds.min[1] > -.015));
    await interact('#castle-tab');
    const map = await getText(page);
    check(`${name}: castle plan`, map.panel === 'castle' && map.layout.proposedArea === 3472.8
      && map.layout.mainRooms === 14 && map.layout.ordinaryEnemies === 64 && map.layout.bosses === 4
      && await page.locator('#map svg').isVisible());
    await page.screenshot({ path: path.join(output, `${name}-castle.png`), fullPage: true });
    if (name === 'desktop') await page.locator('#map').screenshot({ path: path.join(output, 'castle-map.png') });
    await interact('#creature-tab');
    const memoryBefore = (await getText(page)).renderer;
    for (let i = 0; i < 10; i++) { await interact('#assemble-button'); await seek(page, 6.13); await interact('[data-pose="stand"]'); }
    const memoryAfter = (await getText(page)).renderer;
    check(`${name}: repeated controls retain resources`, memoryBefore.geometries === memoryAfter.geometries
      && memoryBefore.textures === memoryAfter.textures, { before: memoryBefore, after: memoryAfter });
    await interact('[data-view="front"]');
    for (const pose of ['stand', 'assemble', 'walk']) {
      report.performance.push({ viewport: { name, width, height }, pose, ...await metrics(page, pose) });
    }
    check(`${name}: concept does not write saves`, await page.evaluate(() => localStorage.length === 0));
    await context.close();
  }
  const context = await session.browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' });
  const page = await context.newPage(); attachErrors(page);
  await page.goto('http://127.0.0.1:5173/');
  await page.waitForFunction(() => window.__MAGIC__?.snapshot().phase === 'menu');
  await page.locator('#start-button').click(); await page.waitForTimeout(300);
  const baseline = await page.evaluate(() => ({ version: window.__MAGIC__.version, ...window.__MAGIC__.snapshot() }));
  check('protected game still plays at original root', baseline.version === '1.1.2' && baseline.phase === 'playing'
    && baseline.entities > 10, { version: baseline.version, phase: baseline.phase, entities: baseline.entities });
  await page.screenshot({ path: path.join(output, 'protected-game-reference.png') });
  await context.close();
  check('no browser errors', report.errors.length === 0);
} catch (error) { report.errors.push(error.stack); process.exitCode = 1; }
finally {
  try { await session.cleanup(); } catch (error) { report.errors.push(error.message); process.exitCode = 1; }
  report.cleanup = { closed: session.report.closed, remainingPids: session.report.remainingPids };
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ checks: report.checks.length, failed: report.checks.filter(c => !c.passed),
    performance: report.performance, errors: report.errors, cleanup: report.cleanup }, null, 2));
}
