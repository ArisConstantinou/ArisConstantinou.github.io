import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ballisticVelocity,
  NavigationGrid,
  ProfileStore,
  UPGRADE_SPECS,
  lineClear,
  pointSegmentDistance,
} from './systems.js';

const SAVE_KEY = 'magic-exiled-v1';

class MemoryStorage {
  constructor(initial = null) {
    this.values = new Map(initial === null ? [] : [[SAVE_KEY, initial]]);
  }
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
}

const floor = (x, z, w, d) => ({ x, y: -.3, z, w, h: .6, d });
const wall = (x, z, w, d) => ({ x, y: 1.5, z, w, h: 3, d });
const separation = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

// Validate a returned route as a continuously moving circular actor. This
// oracle samples world geometry; it does not inspect A* cells or neighbours.
function assertTraversable(start, path, floors, obstacles, radius) {
  assert.ok(path.length > 0, 'a traversable route should be returned');
  let previous = start;
  for (const waypoint of path) {
    const samples = Math.max(1, Math.ceil(separation(previous, waypoint) / .025));
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const p = { x: previous.x + (waypoint.x - previous.x) * t, z: previous.z + (waypoint.z - previous.z) * t };
      const supported = floors.some(b => p.x >= b.x - b.w / 2 - 1e-6 && p.x <= b.x + b.w / 2 + 1e-6 && p.z >= b.z - b.d / 2 - 1e-6 && p.z <= b.z + b.d / 2 + 1e-6);
      assert.ok(supported, `route crosses unsupported floor at ${JSON.stringify(p)}`);
      for (const obstacle of obstacles) {
        // Distance to the closest point on the solid rectangular obstacle.
        const dx = Math.max(Math.abs(p.x - obstacle.x) - obstacle.w / 2, 0);
        const dz = Math.max(Math.abs(p.z - obstacle.z) - obstacle.d / 2, 0);
        assert.ok(Math.hypot(dx, dz) >= radius - 1e-6, `actor clips an obstacle at ${JSON.stringify(p)}`);
      }
    }
    previous = waypoint;
  }
}

for (const scenario of [
  { name: 'ordinary throw at a standing enemy', from: { x: 0, y: 2.1, z: 0 }, to: { x: 8, y: .9, z: 0 }, speed: 19, gravity: 20 },
  { name: 'close downward throw', from: { x: 0, y: 2.1, z: 0 }, to: { x: 1.2, y: .9, z: 0 }, speed: 19, gravity: 20 },
  { name: 'long throw without a hidden flight-time cap', from: { x: 0, y: 2.1, z: 0 }, to: { x: 30, y: .9, z: 0 }, speed: 19, gravity: 20 },
  { name: 'diagonal throw in negative world coordinates', from: { x: -4, y: 1.8, z: 2 }, to: { x: 1, y: .9, z: -5 }, speed: 23, gravity: 20 },
  { name: 'higher target and a different gravity', from: { x: 2, y: 1, z: -1 }, to: { x: -6, y: 3, z: 5 }, speed: 15, gravity: 9.81 },
]) {
  test(`ballistics reaches target: ${scenario.name}`, () => {
    const { from, to, speed, gravity } = scenario;
    const velocity = ballisticVelocity(from, to, speed, gravity);
    assert.ok(Object.values(velocity).every(Number.isFinite));
    const vxz = Math.hypot(velocity.x, velocity.z);
    const arrivalTime = separation(from, to) / vxz;
    assert.ok(arrivalTime > 0);
    // Observe the projectile where its own horizontal velocity carries it to
    // the target, then independently apply Newton's constant-gravity equation.
    const actual = {
      x: from.x + velocity.x * arrivalTime,
      y: from.y + velocity.y * arrivalTime - gravity * arrivalTime * arrivalTime / 2,
      z: from.z + velocity.z * arrivalTime,
    };
    const miss = Math.hypot(actual.x - to.x, actual.y - to.y, actual.z - to.z);
    assert.ok(miss < 1e-6, `projectile misses by ${miss.toFixed(4)} m: ${JSON.stringify(actual)}`);
  });
}

test('line of sight is blocked between targets, but not by a wall beyond the target', () => {
  const a = { x: 0, z: 0 };
  const b = { x: 4, z: 0 };
  assert.equal(lineClear(a, b, [wall(2, 0, 1, 2)]), false);
  assert.equal(lineClear(a, b, [wall(7, 0, 1, 2)]), true);
  assert.equal(lineClear(a, b, [wall(-3, 0, 1, 2)]), true);
  assert.equal(lineClear(a, b, [wall(2, 1.2, 1, 1)]), true);
  assert.equal(lineClear(a, b, [wall(2, 1.2, 1, 1)], .8), false);
});

test('swept arrow distance detects a target between frames and clamps to the segment ends', () => {
  const a = { x: 0, z: 0 }, b = { x: 5, z: 0 };
  assert.equal(pointSegmentDistance({ x: 2.5, z: .3 }, a, b), .3);
  assert.equal(pointSegmentDistance({ x: 8, z: 0 }, a, b), 3);
  assert.equal(pointSegmentDistance({ x: 0, z: 4 }, a, a), 4);
});

test('navigation walks around two blocked corners instead of squeezing diagonally through them', () => {
  const floors = [floor(0, 0, 6, 6)];
  const obstacles = [wall(.5, -.5, .7, .7), wall(-.5, .5, .7, .7)];
  const radius = .25;
  const start = { x: -.5, z: -.5 }, goal = { x: .5, z: .5 };
  const path = new NavigationGrid(floors, obstacles, 1, radius).path(start, goal);
  assertTraversable(start, path, floors, obstacles, radius);
  assert.deepEqual(path.at(-1), goal);
  const length = [start, ...path].slice(1).reduce((total, p, index) => total + separation([start, ...path][index], p), 0);
  assert.ok(length > 3, 'the blocked diagonal requires a real detour');
});

test('navigation reports no route through a completely blocked corridor', () => {
  const floors = [floor(0, 0, 2, 10)];
  const obstacles = [wall(0, 0, 2.5, .8)];
  const path = new NavigationGrid(floors, obstacles, .5, .25).path({ x: 0, z: -3 }, { x: 0, z: 3 });
  assert.deepEqual(path, []);
});

test('a doorway must be wide enough for the actor, and opening it restores the route', () => {
  const floors = [floor(0, 0, 10, 10)];
  const start = { x: 0, z: -3 }, goal = { x: 0, z: 3 };
  const radius = .48;
  const doorway = width => [wall(-2.5 - width / 4, 0, 5 - width / 2, 1), wall(2.5 + width / 4, 0, 5 - width / 2, 1)];
  assert.deepEqual(new NavigationGrid(floors, doorway(.7), .5, radius).path(start, goal), []);
  const open = doorway(2);
  assertTraversable(start, new NavigationGrid(floors, open, .5, radius).path(start, goal), floors, open, radius);
});

test('adjacent floor slabs remain connected when a wall forces a detour across their seam', () => {
  const floors = [floor(0, -3.25, 12, 5.5), floor(0, 2.25, 12, 5.5)];
  const obstacles = [wall(0, -2, 2, 1)];
  const start = { x: 0, z: -4.5 }, goal = { x: 0, z: 3 };
  const path = new NavigationGrid(floors, obstacles, 1, .25).path(start, goal);
  assertTraversable(start, path, floors, obstacles, .25);
  assert.deepEqual(path.at(-1), goal);
});

test('navigation never invents a bridge between disconnected floor islands', () => {
  const floors = [floor(-4, 0, 4, 4), floor(4, 0, 4, 4)];
  const path = new NavigationGrid(floors, [], .5, .25).path({ x: -4, z: 0 }, { x: 4, z: 0 });
  assert.deepEqual(path, []);
});

test('a target embedded in a wall does not append an unwalkable final waypoint', () => {
  const floors = [floor(0, 0, 10, 10)];
  const obstacles = [wall(2, 0, 2, 2)];
  const start = { x: -3, z: 0 }, target = { x: 2, z: 0 };
  const path = new NavigationGrid(floors, obstacles, .5, .25).path(start, target);
  if (path.length) {
    assertTraversable(start, path, floors, obstacles, .25);
    assert.notDeepEqual(path.at(-1), target);
  }
});

test('upgrade purchases use the displayed price, persist every level, and stop charging at the cap', () => {
  const storage = new MemoryStorage();
  const store = new ProfileStore(storage);
  store.profile.shards = 1000;
  for (const spec of UPGRADE_SPECS) {
    for (let level = 1; level <= spec.max; level++) {
      const displayed = store.upgrades().find(upgrade => upgrade.id === spec.id);
      const before = store.profile.shards;
      assert.equal(store.buy(spec.id), true);
      assert.equal(store.profile.shards, before - displayed.cost);
      const reloaded = new ProfileStore(storage);
      assert.equal(reloaded.profile.upgrades[spec.id], level);
      assert.equal(reloaded.profile.shards, store.profile.shards);
    }
    const before = JSON.stringify(store.profile);
    assert.equal(store.buy(spec.id), false);
    assert.equal(JSON.stringify(store.profile), before);
  }
});

test('insufficient funds and unknown upgrade IDs leave all progress unchanged', () => {
  const store = new ProfileStore(new MemoryStorage());
  const upgrade = store.upgrades()[0];
  store.profile.shards = upgrade.cost - 1;
  const before = JSON.stringify(store.profile);
  assert.equal(store.buy(upgrade.id), false);
  assert.equal(store.buy('not-a-real-upgrade'), false);
  assert.equal(JSON.stringify(store.profile), before);
  store.profile.shards = upgrade.cost;
  assert.equal(store.buy(upgrade.id), true);
  assert.equal(store.profile.shards, 0);
});

test('failed extraction banks half the collected shards, while a win banks all shards plus the reward', () => {
  const storage = new MemoryStorage();
  const store = new ProfileStore(storage);
  const failed = store.finish({ won: false, kills: 3, time: 100, shards: 5 });
  assert.equal(failed.shards, 2);
  assert.equal(store.profile.shards, 2);
  assert.equal(store.profile.wins, 0);
  assert.equal(store.profile.runs, 1);
  const won = store.finish({ won: true, kills: 3, time: 100, shards: 5 });
  assert.equal(won.shards, 13);
  assert.equal(store.profile.shards, 15);
  assert.equal(store.profile.wins, 1);
  assert.equal(store.profile.runs, 2);
  assert.ok(won.score > failed.score);
  assert.equal(new ProfileStore(storage).profile.shards, 15);
});

test('a later weaker run cannot erase the personal best or completed upgrades', () => {
  const storage = new MemoryStorage();
  const store = new ProfileStore(storage);
  store.profile.shards = 20;
  assert.equal(store.buy('focus'), true);
  const victory = store.finish({ won: true, kills: 8, time: 120, shards: 10 });
  const failure = store.finish({ won: false, kills: 0, time: 400, shards: 0 });
  assert.equal(victory.best, true);
  assert.equal(failure.best, false);
  const restored = new ProfileStore(storage);
  assert.equal(restored.profile.best, victory.score);
  assert.equal(restored.profile.upgrades.focus, 1);
  assert.equal(restored.profile.runs, 2);
  assert.equal(restored.profile.wins, 1);
});

test('malformed JSON starts fresh and can recover into a newly saved valid profile', () => {
  const storage = new MemoryStorage('{broken json');
  const store = new ProfileStore(storage);
  assert.equal(store.profile.shards, 0);
  assert.equal(store.profile.runs, 0);
  assert.deepEqual(store.profile.upgrades, {});
  assert.equal(store.available, true, 'corrupt JSON must not be reported as denied storage');
  store.finish({ won: false, kills: 1, time: 30, shards: 4 });
  assert.equal(store.available, true);
  const recovered = new ProfileStore(storage);
  assert.equal(recovered.profile.shards, 2);
  assert.equal(recovered.profile.runs, 1);
  assert.equal(recovered.available, true);
});

test('unsupported save versions cannot inject a balance or permanent upgrades', () => {
  const storage = new MemoryStorage(JSON.stringify({ version: 999, shards: 900000, upgrades: { grip: 3 } }));
  const store = new ProfileStore(storage);
  assert.equal(store.profile.shards, 0);
  assert.equal(store.profile.upgrades.grip || 0, 0);
  assert.equal(store.profile.version, 1);
});

test('invalid saved numbers never become bonus currency or maximum upgrade levels', () => {
  const storage = new MemoryStorage(JSON.stringify({
    version: 1,
    shards: 'Infinity', best: 'not-a-number', wins: -9, runs: 3.9,
    upgrades: { grip: 'Infinity', focus: -3, vitality: 999, reach: 2.7, pulse: 'oops', unknown: 50 },
  }));
  const store = new ProfileStore(storage);
  assert.equal(store.profile.shards, 0);
  assert.equal(store.profile.best, 0);
  assert.equal(store.profile.wins, 0);
  assert.equal(store.profile.runs, 3);
  assert.equal(store.profile.upgrades.grip, 0);
  assert.equal(store.profile.upgrades.focus, 0);
  assert.equal(store.profile.upgrades.pulse, 0);
  assert.equal(store.profile.upgrades.unknown, undefined);
  for (const spec of UPGRADE_SPECS) {
    const level = store.profile.upgrades[spec.id];
    assert.ok(Number.isInteger(level) && level >= 0 && level <= spec.max);
  }
});

test('missing storage explicitly reports unavailable persistence while session rewards still work', () => {
  const store = new ProfileStore(undefined);
  assert.equal(store.available, false);
  assert.equal(store.save(), false);
  const result = store.finish({ won: false, kills: 1, time: 20, shards: 4 });
  assert.equal(result.shards, 2);
  assert.equal(store.profile.shards, 2);
});

test('every saved counter and upgrade rejects non-finite values and invalid data types', () => {
  const counters = ['shards', 'best', 'wins', 'runs'];
  for (const invalid of ['Infinity', '-Infinity', 'NaN', '1e309', { toString: 7 }, [], true, null]) {
    const data = {
      version: 1,
      ...Object.fromEntries(counters.map(key => [key, invalid])),
      upgrades: Object.fromEntries(UPGRADE_SPECS.map(spec => [spec.id, invalid])),
    };
    const store = new ProfileStore(new MemoryStorage(JSON.stringify(data)));
    for (const key of counters) assert.equal(store.profile[key], 0, `${key} accepted ${JSON.stringify(invalid)}`);
    for (const spec of UPGRADE_SPECS) assert.equal(store.profile.upgrades[spec.id], 0, `${spec.id} accepted ${JSON.stringify(invalid)}`);
    assert.equal(store.available, true);
  }
});

test('storage access or quota failures do not crash the game or discard current-session rewards', () => {
  const denied = new ProfileStore({ getItem() { throw new Error('access denied'); }, setItem() { throw new Error('access denied'); } });
  assert.equal(denied.available, false);
  assert.equal(denied.save(), false);
  const quota = new ProfileStore({ getItem() { return null; }, setItem() { throw new Error('quota exceeded'); } });
  const reward = quota.finish({ won: true, kills: 2, time: 100, shards: 4 });
  assert.equal(reward.shards, 12);
  assert.equal(quota.profile.shards, 12);
  assert.equal(quota.available, false);
});

test('a successful save restores persistence availability after a temporary write failure', () => {
  const storage = new MemoryStorage();
  let quotaExceeded = true;
  const store = new ProfileStore({
    getItem: key => storage.getItem(key),
    setItem(key, value) {
      if (quotaExceeded) throw new Error('quota exceeded');
      storage.setItem(key, value);
    },
  });
  store.finish({ won: false, kills: 1, time: 30, shards: 4 });
  assert.equal(store.available, false);
  assert.equal(store.profile.shards, 2);
  quotaExceeded = false;
  assert.equal(store.save(), true);
  assert.equal(store.available, true);
  const reloaded = new ProfileStore(storage);
  assert.equal(reloaded.profile.shards, 2);
  assert.equal(reloaded.profile.runs, 1);
});
