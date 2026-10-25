import test from 'node:test';
import assert from 'node:assert/strict';
import { BUILDINGS } from '../src/rules.js';
import { defaultPlacement } from '../src/placement-rules.js';
import { SHELTER_LAYOUT_SCALE } from '../src/world-config.js';
import {
  ECONOMY_VERSION, UPKEEP_PER_FROG, CONSTRUCTION_SECONDS, CRAFT_RECIPES,
  initRealmEconomy, updateRealmEconomy, constructionOffer, queueConstruction,
  setCampSpecialization, campBuildingSlots, craftEquipment, cancelRealmJob,
  realmEconomySnapshot, economySave, normalizeEquipment, equipmentBonuses,
  campSpecializationEffects
} from '../src/realm-economy.js';

function frog(id = 'player', more = {}) {
  return { id, name: id, team: id === 'player' ? 'player' : 'ally', x: 0, z: 0, hp: 100, maxHp: 100, level: 8, tier: 1, stomach: 60, morale: 70, dead: false, model: { setEquipment(value) { this.gear = { ...value }; }, setLevel(value) { this.level = value; } }, ...more };
}
function castle(more = {}) {
  return { id: 'home', name: 'Κάστρο', team: 'ally', x: 0, z: 0, hp: 350, maxHp: 350, gateHp: 900, tier: 1, buildings: {}, buildingPlacements: {}, safe: true, destroyed: false, ...more };
}
function fixture({ camp = castle(), allies = 0, resources = { food: 1000, reeds: 1000, pearls: 100 } } = {}) {
  const player = frog(), messages = [], completed = [], xp = [];
  const game = { player, frogs: [player, ...Array.from({ length: allies }, (_, i) => frog(`ally-${i}`))], camps: camp ? [camp] : [], resources: { ...resources }, selectedIds: new Set(), idCounter: 1, elapsed: 0, stats: {},
    nearestHome() { return this.camps.find(item => item.team === 'ally' && !item.destroyed && !item.underConstruction && Math.hypot(item.x - this.player.x, item.z - this.player.z) < 24); },
    campSafe(item) { return item.safe !== false; },
    world: { getSurface() { return { type: 'land' }; }, updateShelter() {} },
    ui: { toast(...args) { messages.push(args); } }, save() {}, audio: { play() {} }, updateFrogPortrait() {}, gainXP(value) { xp.push(value); },
    createConstructionSite(job) { const site = castle({ id: `site-${++this.idCounter}`, x: job.placement.x, z: job.placement.z, hp: 140, maxHp: 140, underConstruction: true }); this.camps.push(site); return site; },
    completeConstruction(job) { const target = this.camps.find(item => item.id === job.campId); if (!target) return false; completed.push(job.id); if (job.type === 'shelter') { target.underConstruction = false; target.hp = target.maxHp = 350; } else if (job.type === 'upgrade') target.tier++; else if (job.type === 'repair') target.hp = target.maxHp; else target.buildings[job.type] = true; return true; }
  };
  initRealmEconomy(game);
  return { game, player, camp, messages, completed, xp };
}
function tick(game, seconds) { game.elapsed += seconds; updateRealmEconomy(game, seconds); }
const close = (value, expected) => assert.ok(Math.abs(value - expected) < 1e-7, `${value} ≈ ${expected}`);
const storePosition = () => ({ x: -6.5 * SHELTER_LAYOUT_SCALE, z: 6 * SHELTER_LAYOUT_SCALE, yaw: 0 });

test('600 living allies consume real food without a population ceiling or duplicated camp income', () => {
  const { game } = fixture({ allies: 600 });
  tick(game, 60);
  assert.equal(game.frogs.length, 601);
  close(game.resources.food, 1000 - 600 * UPKEEP_PER_FROG * 60);
  assert.ok(game.frogs.slice(1).every(actor => actor.stomach > 60 && !actor.dead));
  const snapshot = realmEconomySnapshot(game);
  assert.equal(snapshot.armyCount, 600);
  assert.equal(snapshot.foodPerMinute, 900);
  assert.equal(snapshot.foodIncomePerMinute, 15, 'baseline production is displayed but not credited a second time');
});

test('production specialization adds only its own earned safe-base income', () => {
  const { game, camp } = fixture();
  assert.equal(setCampSpecialization(game, camp.id, 'production'), true);
  tick(game, 10);
  close(game.resources.food, 1003.5); close(game.resources.reeds, 1001.2);
  camp.safe = false; tick(game, 20);
  close(game.resources.food, 1003.5); close(game.resources.reeds, 1001.2);
  assert.equal(realmEconomySnapshot(game).foodIncomePerMinute, 0);
});

test('shortage cannot create negative resources or silently delete an army', () => {
  const { game } = fixture({ allies: 40, resources: { food: .2, reeds: 10 } });
  tick(game, 10);
  assert.equal(game.resources.food, 0);
  assert.ok(game.frogs.slice(1).every(actor => actor.stomach < 60 && actor.morale < 70 && !actor.dead));
  assert.equal(realmEconomySnapshot(game).shortage, true);
  assert.equal(game.frogs.length, 41);
});

test('supply requires a safe completed base and does not spend bank food through a destroyed or unfinished base', () => {
  for (const change of [{ safe: false }, { underConstruction: true }, { destroyed: true }, { team: 'enemy0' }]) {
    const { game } = fixture({ allies: 10, camp: castle(change) }); tick(game, 10);
    assert.equal(game.resources.food, 1000);
    assert.equal(realmEconomySnapshot(game).hasSupplyBase, false);
    assert.ok(game.frogs[1].morale < 70);
  }
});

test('construction pays once, remains inactive, pauses under attack and resumes from the saved progress', () => {
  const { game, camp, completed, xp } = fixture();
  assert.equal(queueConstruction(game, 'store', { campId: camp.id, local: storePosition() }), true);
  const afterPayment = { ...game.resources };
  assert.equal(camp.buildings.store, undefined);
  tick(game, 7);
  assert.equal(game.economy.jobs[0].progress, 7);
  camp.safe = false; tick(game, 40);
  assert.equal(game.economy.jobs[0].progress, 7);
  assert.equal(game.economy.jobs[0].status, 'paused');
  const serialized = economySave(game);
  initRealmEconomy(game, { economy: JSON.parse(JSON.stringify(serialized)) });
  assert.deepEqual(game.resources, afterPayment);
  camp.safe = true; tick(game, CONSTRUCTION_SECONDS.store - 7);
  assert.equal(camp.buildings.store, true);
  assert.equal(game.economy.jobs.length, 0);
  assert.equal(completed.length, 1); assert.deepEqual(xp, [18]);
  tick(game, 100);
  assert.equal(completed.length, 1); assert.deepEqual(game.resources, afterPayment);
});

test('unfinished buildings reserve real footprints and cannot overlap another queued structure', () => {
  const { game, camp } = fixture();
  const local = storePosition();
  assert.equal(queueConstruction(game, 'store', { campId: camp.id, local }), true);
  const offer = constructionOffer(game, 'watchtower', { campId: camp.id, local });
  assert.equal(offer.enabled, false); assert.match(offer.reason, /επικαλύπτει/);
  assert.equal(constructionOffer(game, 'store', { campId: camp.id, local }).enabled, false);
  assert.equal(realmEconomySnapshot(game).camps[0].slotsReserved, 1);
});

test('the third building needs a deliberate specialization and finite slots remain meaningful at maximum tier', () => {
  const { game, camp } = fixture({ camp: castle({ buildings: { store: true, training: true } }) });
  assert.equal(constructionOffer(game, 'nursery').enabled, false);
  assert.match(constructionOffer(game, 'nursery').reason, /ειδίκευση/);
  assert.equal(setCampSpecialization(game, camp.id, 'training'), true);
  assert.equal(queueConstruction(game, 'nursery', { campId: camp.id, local: defaultPlacement('nursery') }), true);
  assert.equal(constructionOffer(game, 'palisade').enabled, false, 'third reserved slot fills a tier-I courtyard');
  camp.tier = 3; assert.equal(campBuildingSlots(camp), 4);
  assert.equal(queueConstruction(game, 'palisade'), true);
  assert.equal(constructionOffer(game, 'watchtower').enabled, false);
  assert.equal(setCampSpecialization(game, camp.id, 'production'), false, 'specialization is a lasting choice');
});

test('specializations have real mutually exclusive new buildings and timed/production/combat effects', () => {
  assert.equal(campSpecializationEffects(castle({ specialization: 'defense' })).siegeDamageMultiplier, .82);
  assert.equal(campSpecializationEffects(castle({ specialization: 'training' })).trainingTimeMultiplier, .7);
  for (const [specialization, forbidden] of [['production', 'training'], ['defense', 'nursery'], ['training', 'watchtower']]) {
    const { game, camp } = fixture(); setCampSpecialization(game, camp.id, specialization);
    assert.equal(constructionOffer(game, forbidden).enabled, false);
  }
  const { game, camp } = fixture(); setCampSpecialization(game, camp.id, 'defense');
  assert.equal(constructionOffer(game, 'watchtower').duration, CONSTRUCTION_SECONDS.watchtower * .75);
});

test('legacy bases keep all five existing buildings and old equipment without gifting gear to new characters', () => {
  const { game, camp, player } = fixture({ camp: castle({ buildings: Object.fromEntries(['store', 'nursery', 'training', 'watchtower', 'palisade'].map(key => [key, true])) }) });
  player.tier = 3; delete player.equipment;
  initRealmEconomy(game, { version: 1 });
  assert.equal(campBuildingSlots(camp), 5);
  assert.deepEqual(player.equipment, { armor: 'reed', weapon: null, crest: true });
  assert.equal(Object.values(camp.buildings).filter(Boolean).length, 5);
  const fresh = fixture(); fresh.player.tier = 3; delete fresh.player.equipment;
  initRealmEconomy(fresh.game);
  assert.deepEqual(fresh.player.equipment, { armor: null, weapon: null, crest: false });
  delete fresh.player.equipment;
  initRealmEconomy(fresh.game, { newRealm: true });
  assert.deepEqual(fresh.player.equipment, { armor: null, weapon: null, crest: false }, 'new regions are not mistaken for legacy saves');
  assert.deepEqual(normalizeEquipment(undefined, { legacyTier: 2 }), { armor: 'reed', weapon: null, crest: false });
});

test('a shelter is a vulnerable persisted site before completion, and destruction loses the paid work', () => {
  const { game, player, completed, xp } = fixture({ camp: null });
  player.x = 50;
  assert.equal(queueConstruction(game, 'shelter', { x: 50, z: 0, yaw: .4 }), true);
  const site = game.camps[0], paid = { ...game.resources };
  assert.ok(site.underConstruction); assert.equal(site.hp, 140);
  assert.equal(game.nearestHome(), undefined, 'unfinished site cannot supply food or serve as a usable base');
  tick(game, 5); site.hp = 0; site.destroyed = true; tick(game, 40);
  assert.deepEqual(game.resources, paid); assert.equal(game.economy.jobs.length, 0);
  assert.equal(completed.length, 0); assert.equal(xp.length, 0);
});

test('a finished shelter upgrades the same site rather than making a duplicate castle', () => {
  const { game, player, xp } = fixture({ camp: null }); player.x = 50;
  queueConstruction(game, 'shelter', { x: 50, z: 0, yaw: 0 });
  const id = game.camps[0].id;
  tick(game, CONSTRUCTION_SECONDS.shelter);
  assert.equal(game.camps.length, 1); assert.equal(game.camps[0].id, id);
  assert.equal(game.camps[0].underConstruction, false); assert.deepEqual(xp, [35]);
});

test('cancellation returns exactly half once, while capture forfeits pending resources without completion XP', () => {
  const { game, camp, xp } = fixture(); queueConstruction(game, 'store');
  const id = game.economy.jobs[0].id;
  assert.equal(cancelRealmJob(game, id), true);
  assert.equal(cancelRealmJob(game, id), false);
  close(game.resources.food, 1000 - BUILDINGS.store.cost.food * .5);
  queueConstruction(game, 'store'); const beforeCapture = { ...game.resources };
  camp.team = 'enemy0'; tick(game, 100);
  assert.deepEqual(game.resources, beforeCapture); assert.equal(game.economy.jobs.length, 0); assert.equal(xp.length, 0);
});

test('repairs grant no XP and rejected orders spend nothing', () => {
  const { game, camp, xp } = fixture();
  camp.hp = 80; assert.equal(queueConstruction(game, 'repair'), true); tick(game, 15);
  assert.equal(camp.hp, camp.maxHp); assert.equal(xp.length, 0);
  const before = { ...game.resources };
  assert.equal(queueConstruction(game, 'unknown'), false);
  assert.equal(queueConstruction(game, 'store', { campId: camp.id, local: { x: 0, z: 0, yaw: 0 } }), false);
  assert.deepEqual(game.resources, before);
});

test('crafting enforces workshop, player level, real costs and ownership before any gear appears', () => {
  const { game, camp, player } = fixture();
  assert.equal(craftEquipment(game, { recipeId: 'shell-armor' }), false);
  camp.buildings.training = true; player.level = 5;
  assert.equal(craftEquipment(game, { recipeId: 'shell-armor' }), false);
  player.level = 6; game.resources.pearls = 2;
  assert.equal(craftEquipment(game, { recipeId: 'shell-armor' }), false);
  game.resources.pearls = 3;
  assert.equal(craftEquipment(game, { recipeId: 'shell-armor' }), true);
  assert.equal(game.resources.pearls, 0); assert.equal(player.equipment.armor, null);
  assert.equal(craftEquipment(game, { recipeId: 'reed-armor' }), false, 'a second armor order cannot supersede a queued one');
  tick(game, 41); assert.equal(player.equipment.armor, null);
  tick(game, 1); assert.equal(player.equipment.armor, 'shell');
  assert.equal(player.model.gear.armor, 'shell'); assert.equal(game.stats.crafted, 1);
  assert.equal(craftEquipment(game, { recipeId: 'reed-armor' }), false, 'stronger gear is not downgraded');
  assert.equal(equipmentBonuses(player).damageMultiplier, .72);
});

test('crafted equipment waits for actual delivery at the base and survives save/load without recharging', () => {
  const { game, camp, player } = fixture({ camp: castle({ buildings: { training: true } }) });
  craftEquipment(game, { recipeId: 'reed-bracers' });
  const paid = { ...game.resources }; player.x = 80; tick(game, 23);
  assert.equal(game.economy.jobs[0].status, 'delivery'); assert.equal(player.equipment.weapon, null);
  initRealmEconomy(game, { economy: economySave(game) });
  assert.deepEqual(game.resources, paid);
  player.x = camp.x; tick(game, .1);
  assert.equal(player.equipment.weapon, 'reed'); assert.equal(game.economy.jobs.length, 0);
  assert.equal(equipmentBonuses(player).attackMultiplier, 1.16);
});

test('a workshop processes a selected squad one item at a time and pauses during an attack', () => {
  const { game, camp } = fixture({ allies: 3, camp: castle({ buildings: { training: true }, specialization: 'training' }) });
  game.selectedIds = new Set(game.frogs.slice(1).map(actor => actor.id));
  assert.equal(craftEquipment(game, { recipeId: 'reed-armor' }), true);
  assert.equal(game.economy.jobs.length, 3);
  close(game.economy.jobs[0].duration, CRAFT_RECIPES['reed-armor'].duration * .7);
  tick(game, 3);
  assert.equal(game.economy.jobs[0].progress, 3); assert.equal(game.economy.jobs[1].progress, 0);
  camp.safe = false; tick(game, 30); assert.equal(game.economy.jobs[0].progress, 3);
  camp.safe = true;
  for (let i = 0; i < 3; i++) tick(game, 30);
  assert.ok(game.frogs.slice(1).every(actor => actor.equipment.armor === 'reed'));
  assert.equal(game.stats.crafted, 3);
});

test('death or capture cannot attach gear to a corpse or a new enemy', () => {
  const { game, camp } = fixture({ allies: 1, camp: castle({ buildings: { training: true } }) });
  const target = game.frogs[1]; craftEquipment(game, { recipeId: 'reed-armor', targetIds: [target.id] });
  target.dead = true; tick(game, 30);
  assert.equal(target.equipment.armor, null); assert.equal(game.economy.jobs.length, 0);
  target.dead = false; craftEquipment(game, { recipeId: 'reed-armor', targetIds: [target.id] });
  camp.team = 'enemy1'; const paid = { ...game.resources }; tick(game, 30);
  assert.equal(target.equipment.armor, null); assert.deepEqual(game.resources, paid);
});

test('a paid craft order pauses for a living guard in another region and resumes when the actual recipient returns', () => {
  const { game, messages } = fixture({ allies: 1, camp: castle({ buildings: { training: true } }) });
  const target = game.frogs[1]; target.guard = true;
  craftEquipment(game, { recipeId: 'reed-armor', targetIds: [target.id] }); tick(game, 3);
  const paid = { ...game.resources }, progress = game.economy.jobs[0].progress;
  game.frogs = [game.player];
  game.realms = { active: 0, regions: { 1: { snapshot: { frogs: [target] } } } };
  tick(game, 100);
  assert.equal(game.economy.jobs.length, 1); assert.equal(game.economy.jobs[0].status, 'paused');
  assert.equal(game.economy.jobs[0].progress, progress); assert.match(game.economy.jobs[0].reason, /άλλη περιοχή/);
  assert.deepEqual(game.resources, paid); assert.equal(target.equipment.armor, null);
  assert.equal(realmEconomySnapshot(game).jobs[0].targetName, target.name);
  initRealmEconomy(game, { economy: economySave(game) }); tick(game, 1);
  assert.equal(game.economy.jobs[0].progress, progress); assert.deepEqual(game.resources, paid);
  game.realms.regions[1].snapshot.frogs = []; game.frogs.push(target);
  tick(game, CRAFT_RECIPES['reed-armor'].duration - progress);
  assert.equal(game.economy.jobs.length, 0); assert.equal(target.equipment.armor, 'reed'); assert.equal(game.stats.crafted, 1);
  assert.equal(game.resources.reeds, paid.reeds); assert.equal(game.resources.pearls, paid.pearls);
  assert.equal(messages.some(message => String(message[0]).includes('50%')), false);
});

test('a stale active-region snapshot cannot keep a dead or missing crafting recipient alive', () => {
  for (const localCorpse of [true, false]) {
    const { game } = fixture({ allies: 1, camp: castle({ buildings: { training: true } }) });
    const target = game.frogs[1]; craftEquipment(game, { recipeId: 'reed-armor', targetIds: [target.id] });
    const paid = { ...game.resources }, cost = CRAFT_RECIPES['reed-armor'].cost;
    game.realms = { active: 3, regions: {
      3: { snapshot: { frogs: [{ ...target, dead: false, hp: 100 }] } },
      1: { snapshot: { frogs: [{ ...target, dead: true, hp: 0 }] } }
    } };
    target.dead = true; target.hp = 0; if (!localCorpse) game.frogs = [game.player];
    tick(game, .1);
    assert.equal(game.economy.jobs.length, 0); assert.equal(target.equipment.armor, null);
    close(game.resources.food, paid.food + cost.food * .5); close(game.resources.reeds, paid.reeds + cost.reeds * .5);
    const refunded = { ...game.resources }; tick(game, .1); assert.deepEqual(game.resources, refunded, 'refund is issued only once');
  }
});

test('an absent remote recipient does not monopolize the workshop while local paid orders are ready to work', () => {
  const { game } = fixture({ allies: 2, camp: castle({ buildings: { training: true } }) });
  const [remote, local] = game.frogs.slice(1); craftEquipment(game, { recipeId: 'reed-armor', targetIds: [remote.id, local.id] });
  game.frogs = [game.player, local]; game.realms = { active: 0, regions: { 2: { snapshot: { frogs: [remote] } } } };
  tick(game, 24);
  assert.equal(local.equipment.armor, 'reed'); assert.equal(remote.equipment.armor, null); assert.equal(game.stats.crafted, 1);
  assert.equal(game.economy.jobs.length, 1); assert.equal(game.economy.jobs[0].targetId, remote.id); assert.equal(game.economy.jobs[0].progress, 0);
});

test('save data is serializable, ignores invalid/duplicate jobs and does not store renderer objects', () => {
  const { game, camp } = fixture();
  queueConstruction(game, 'store', { campId: camp.id, local: storePosition(), irrelevant: { cycle: game } });
  const save = economySave(game);
  assert.doesNotThrow(() => JSON.stringify(save));
  initRealmEconomy(game, { economy: { ...save, jobs: [...save.jobs, save.jobs[0], { id: 'bad', kind: 'construction', type: 'free-kingdom' }] } });
  assert.equal(game.economy.jobs.length, 1); assert.equal(game.economy.version, ECONOMY_VERSION);
  assert.ok(game.economy.nextJobId > 1);
});

test('the UI snapshot exposes truthful per-army costs, real jobs, recipes and specialization constraints', () => {
  const { game, camp } = fixture({ allies: 4, camp: castle({ buildings: { training: true } }) });
  game.selectedIds = new Set(game.frogs.slice(1).map(actor => actor.id));
  const snapshot = realmEconomySnapshot(game), armor = snapshot.recipes.find(recipe => recipe.id === 'reed-armor');
  assert.equal(snapshot.foodPerMinute, 6); assert.equal(snapshot.currentCampId, camp.id);
  assert.equal(armor.targetCount, 4); assert.equal(armor.totalCost.reeds, 80);
  assert.equal(snapshot.craftTargetIds.length, 4); assert.equal(snapshot.camps[0].slotsUsed, 1);
  assert.equal(snapshot.camps[0].availableSpecializations.length, 3);
});

test('saving from inside a successful completion cannot replay an upgrade after loading', () => {
  const { game, camp } = fixture();
  let duringCompletion;
  game.completeConstruction = job => { camp.tier++; duringCompletion = economySave(game); return true; };
  assert.equal(queueConstruction(game, 'upgrade'), true);
  tick(game, CONSTRUCTION_SECONDS.upgrade);
  assert.equal(camp.tier, 2); assert.equal(duringCompletion.jobs.length, 0);
  initRealmEconomy(game, { economy: duringCompletion }); tick(game, 100);
  assert.equal(camp.tier, 2);
});

test('unknown prototype keys and invalid coordinates cannot buy or relocate a construction', () => {
  const { game, camp } = fixture({ camp: castle({ buildings: { training: true } }) });
  assert.equal(craftEquipment(game, { recipeId: '__proto__' }), false);
  assert.equal(setCampSpecialization(game, camp.id, '__proto__'), false);
  assert.equal(queueConstruction(game, 'store', { campId: camp.id, local: { x: NaN, z: 2, yaw: 0 } }), false);
  assert.equal(game.economy.jobs.length, 0);
  assert.deepEqual(game.resources, { food: 1000, reeds: 1000, pearls: 100 });
});

test('construction cannot advance without a real on-site worker and reports the observed workforce', () => {
  const { game } = fixture();
  game.constructionWorkRate = job => { job.workersPresent = 0; job.workersAssigned = 2; job.workRate = 0; job.workPoint = { x: 1, z: 2 }; return 0; };
  queueConstruction(game, 'store'); tick(game, 50);
  assert.equal(game.economy.jobs[0].progress, 0);
  assert.match(game.economy.jobs[0].reason, /σημείο εργασίας/);
  const snapshot = realmEconomySnapshot(game); assert.equal(snapshot.jobs[0].workersAssigned, 2); assert.equal(snapshot.jobs[0].workersPresent, 0);
  game.constructionWorkRate = job => { job.workersPresent = 2; job.workRate = 1.25; return 1.25; };
  tick(game, 8); assert.equal(game.economy.jobs[0].progress, 10);
});
