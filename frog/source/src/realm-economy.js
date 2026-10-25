/** Persistent food supply, protected construction and physically crafted gear. */
import { BUILDINGS, canAfford, spend } from './rules.js';
import { defaultPlacement, validateBuildingPlacement } from './placement-rules.js';
import { gateMaxHealth } from './fortification.js';
import { SHELTER_RADIUS, SHELTER_LAYOUT_SCALE, WORLD_BOUNDARY } from './world-config.js';

export const ECONOMY_VERSION = 1;
export const UPKEEP_PER_FROG = 0.025; // 1.5 food / minute; no population ceiling.
export const CONSTRUCTION_SECONDS = Object.freeze({ shelter: 40, store: 24, nursery: 36, training: 32, watchtower: 28, palisade: 30, upgrade: 48, repair: 12 });
export const CONSTRUCTION_XP = Object.freeze({ shelter: 35, store: 18, nursery: 22, training: 24, watchtower: 20, palisade: 20, upgrade: 30, repair: 0 });
export const CAMP_SPECIALIZATIONS = Object.freeze({
  production: Object.freeze({ id: 'production', label: 'Παραγωγή', description: '+21 τροφή και +7,2 υλικά/λεπτό ανά βαθμίδα. Δεν κατασκευάζει χώρο εκπαίδευσης.', allowed: ['store', 'nursery', 'watchtower', 'palisade'] }),
  defense: Object.freeze({ id: 'defense', label: 'Άμυνα', description: '18% λιγότερη ζημιά πολιορκίας και 25% ταχύτερη κατασκευή άμυνας. Δεν κατασκευάζει φωλιά στρατολόγησης.', allowed: ['store', 'training', 'watchtower', 'palisade'] }),
  training: Object.freeze({ id: 'training', label: 'Εκπαίδευση', description: 'Εκπαίδευση και κατασκευή εξοπλισμού 30% ταχύτερα. Δεν κατασκευάζει σκοπιά.', allowed: ['store', 'nursery', 'training', 'palisade'] })
});
export const CRAFT_RECIPES = Object.freeze({
  'reed-armor': Object.freeze({ id: 'reed-armor', name: 'Πανοπλία φύλλων', description: 'Πλεγμένα φύλλα και καλάμια: 12% λιγότερη εισερχόμενη ζημιά.', cost: { food: 8, reeds: 20 }, duration: 24, requiredLevel: 1, slot: 'armor', equipmentId: 'reed' }),
  'shell-armor': Object.freeze({ id: 'shell-armor', name: 'Πανοπλία οστράκων', description: 'Σπάνια όστρακα από θηρευτές: 28% λιγότερη εισερχόμενη ζημιά. Αντικαθιστά την πανοπλία φύλλων.', cost: { food: 18, reeds: 32, pearls: 3 }, duration: 42, requiredLevel: 6, slot: 'armor', equipmentId: 'shell' }),
  'reed-bracers': Object.freeze({ id: 'reed-bracers', name: 'Περικάρπια καλαμιών', description: 'Ενισχυμένα περικάρπια: 16% ισχυρότερες επιθέσεις.', cost: { food: 10, reeds: 18 }, duration: 22, requiredLevel: 3, slot: 'weapon', equipmentId: 'reed' }),
  'veteran-crest': Object.freeze({ id: 'veteran-crest', name: 'Έμβλημα βετεράνου', description: 'Κατασκευασμένο έμβλημα κεφαλής: ταχύτερη ανάκαμψη ηθικού. Το βασιλικό στέμμα παραμένει χωριστό.', cost: { food: 12, reeds: 22, pearls: 1 }, duration: 30, requiredLevel: 5, slot: 'crest', equipmentId: true })
});

const buildingTypes = ['store', 'nursery', 'training', 'watchtower', 'palisade'];
const placedTypes = new Set(['store', 'nursery', 'training', 'watchtower']);
const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const nonnegative = value => Math.max(0, finite(value));
const bounded = (value, min, max) => Math.min(max, Math.max(min, finite(value, min)));
const distance = (a, b) => Math.hypot(finite(a?.x) - finite(b?.x), finite(a?.z) - finite(b?.z));
const alive = actor => actor && !actor.dead && finite(actor.hp, 1) > 0;
const owned = camp => camp && camp.team === 'ally' && !camp.destroyed && finite(camp.hp, 1) > 0;
const active = camp => owned(camp) && !camp.underConstruction;
const safe = (game, camp) => Boolean(camp && (typeof game.campSafe === 'function' ? game.campSafe(camp) : camp.safe !== false));
const actorList = game => (game.frogs || []).filter(actor => alive(actor) && (actor.team === 'ally' || actor.team === 'player'));
const campById = (game, id) => (game.camps || []).find(camp => camp.id === id);
const notify = (game, message, kind = 'info') => game.ui?.toast?.(message, kind);
const cleanCost = value => Object.fromEntries(['food', 'reeds', 'pearls'].filter(key => nonnegative(value?.[key]) > 0).map(key => [key, nonnegative(value[key])]));
const copyCost = (cost, count = 1) => Object.fromEntries(Object.entries(cost).map(([key, n]) => [key, n * count]));
const costRefund = (game, cost, ratio) => { for (const [key, n] of Object.entries(cost || {})) game.resources[key] = nonnegative(game.resources[key]) + n * ratio; };
// Match the interactive preview's clear starting positions. The legacy authored
// store/training positions intentionally remain untouched in old saves.
const initialPlacement = type => type === 'store' ? { x: -6.5 * SHELTER_LAYOUT_SCALE, z: 6 * SHELTER_LAYOUT_SCALE, yaw: 0 } : type === 'training' ? { x: 0, z: 6 * SHELTER_LAYOUT_SCALE, yaw: 0 } : defaultPlacement(type);

export function normalizeEquipment(value, { legacyTier = 0 } = {}) {
  if (!value || typeof value !== 'object') return { armor: legacyTier >= 2 ? 'reed' : null, weapon: null, crest: legacyTier >= 3 };
  return { armor: ['reed', 'shell'].includes(value.armor) ? value.armor : null, weapon: value.weapon === 'reed' ? 'reed' : null, crest: value.crest === true };
}

export function equipmentBonuses(actor) {
  const gear = normalizeEquipment(actor?.equipment);
  return { damageMultiplier: gear.armor === 'shell' ? .72 : gear.armor === 'reed' ? .88 : 1, attackMultiplier: gear.weapon ? 1.16 : 1, moraleRecovery: gear.crest ? .06 : 0 };
}

export function campSpecializationEffects(camp) {
  const kind = camp?.specialization;
  return { foodBonusPerSecond: kind === 'production' ? .35 * Math.max(1, finite(camp.tier, 1)) : 0, materialBonusPerSecond: kind === 'production' ? .12 * Math.max(1, finite(camp.tier, 1)) : 0, siegeDamageMultiplier: kind === 'defense' ? .82 : 1, trainingTimeMultiplier: kind === 'training' ? .7 : 1, craftTimeMultiplier: kind === 'training' ? .7 : 1 };
}

export function campBuildingSlots(camp) {
  return Math.max(finite(camp?.tier, 1) >= 2 ? 4 : 3, Math.floor(bounded(camp?.legacySlots, 0, 5)));
}

function placementData(value = {}, campId = null) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) value = {};
  const result = { campId: typeof value.campId === 'string' ? value.campId : campId };
  for (const key of ['x', 'z', 'yaw']) if (Number.isFinite(value[key])) result[key] = value[key];
  if (value.local && ['x', 'z', 'yaw'].every(key => Number.isFinite(value.local[key]))) result.local = { x: value.local.x, z: value.local.z, yaw: value.local.yaw };
  const ruinId = value.ruinId || value.ruin?.id;
  if (typeof ruinId === 'string') result.ruinId = ruinId;
  return result;
}

function normalizeJob(job) {
  if (!job || typeof job !== 'object' || typeof job.id !== 'string' || !job.id || typeof job.campId !== 'string' || !['construction', 'craft'].includes(job.kind)) return null;
  if (job.status === 'committing') return null;
  if (job.kind === 'construction' && !Object.hasOwn(CONSTRUCTION_SECONDS, job.type)) return null;
  if (job.kind === 'craft' && (!Object.hasOwn(CRAFT_RECIPES, job.recipeId) || typeof job.targetId !== 'string')) return null;
  if (job.kind === 'construction' && job.type === 'shelter' && (!Number.isFinite(job.placement?.x) || !Number.isFinite(job.placement?.z))) return null;
  const fallback = job.kind === 'construction' ? CONSTRUCTION_SECONDS[job.type] : CRAFT_RECIPES[job.recipeId].duration;
  const duration = Number.isFinite(job.duration) && job.duration > 0 ? bounded(job.duration, .1, 1200) : fallback;
  return { id: job.id.slice(0, 100), kind: job.kind, type: job.kind === 'construction' ? job.type : undefined, recipeId: job.kind === 'craft' ? job.recipeId : undefined, targetId: typeof job.targetId === 'string' ? job.targetId : null, campId: job.campId, siteId: typeof job.siteId === 'string' ? job.siteId : null, placement: placementData(job.placement), cost: cleanCost(job.cost), duration, progress: bounded(job.progress, 0, duration), status: ['queued', 'working', 'paused', 'delivery'].includes(job.status) ? job.status : 'queued', reason: '', createdAt: nonnegative(job.createdAt) };
}

/** Pure save normalization also applies to inactive regions; it never advances
 * work, charges resources or migrates equipment. Keep absent legacy economies absent. */
export function normalizeRealmEconomySave(value = {}) {
  const source = value && typeof value === 'object' ? value : {}, seen = new Set();
  const jobs = (Array.isArray(source.jobs) ? source.jobs : []).map(normalizeJob).filter(job => job && !seen.has(job.id) && seen.add(job.id));
  const counter = Number.isSafeInteger(source.nextJobId) && source.nextJobId > 0 && source.nextJobId < Number.MAX_SAFE_INTEGER ? source.nextJobId : 1;
  const nextJobId = jobs.reduce((next, job) => { const ordinal = Number(job.id.match(/(\d+)$/)?.[1]); return Number.isSafeInteger(ordinal) && ordinal < Number.MAX_SAFE_INTEGER ? Math.max(next, ordinal + 1) : next; }, counter);
  return { version: ECONOMY_VERSION, nextJobId, upkeepAccumulator: bounded(source.upkeepAccumulator, 0, 1), shortageSeconds: nonnegative(source.shortageSeconds), jobs };
}

export function initRealmEconomy(game, save = null) {
  const source = save?.economy || save?.realmEconomy || {};
  game.economy = { ...normalizeRealmEconomySave(source), servedRatio: 1, nextShortageNotice: 0 };
  game.resources ||= { food: 0, reeds: 0 };
  game.resources.pearls = nonnegative(game.resources.pearls);
  const legacy = Boolean(save) && !save.newRealm && source.version !== ECONOMY_VERSION;
  for (const camp of game.camps || []) {
    if (!Object.hasOwn(CAMP_SPECIALIZATIONS, camp.specialization)) camp.specialization = null;
    const existing = buildingTypes.filter(type => camp.buildings?.[type]).length;
    camp.legacySlots = Math.max(Math.floor(bounded(camp.legacySlots, 0, 5)), legacy ? existing : 0);
    camp.underConstruction = Boolean(camp.underConstruction);
  }
  for (const actor of game.frogs || []) {
    actor.equipment = normalizeEquipment(actor.equipment, { legacyTier: legacy ? actor.tier : 0 });
    actor.model?.setEquipment?.(actor.equipment);
    actor.model?.setLevel?.(actor.level || 1);
  }
  return game.economy;
}

const stateFor = game => game.economy || initRealmEconomy(game);
const constructionJobs = (game, campId) => stateFor(game).jobs.filter(job => job.kind === 'construction' && job.campId === campId);
const occupiedBuildings = camp => buildingTypes.filter(type => camp?.buildings?.[type]).length;

export function constructionCamp(game, camp) {
  const result = { ...camp, buildings: { ...camp.buildings }, buildingPlacements: { ...camp.buildingPlacements } };
  for (const job of constructionJobs(game, camp.id)) {
    if (!buildingTypes.includes(job.type)) continue;
    result.buildings[job.type] = true;
    if (job.placement?.local) result.buildingPlacements[job.type] = { ...job.placement.local };
  }
  return result;
}

export function constructionOffer(game, type, suppliedPlacement = null, { preview = false } = {}) {
  const definition = BUILDINGS[type], denied = reason => ({ enabled: false, reason, type, cost: definition?.cost || {}, duration: CONSTRUCTION_SECONDS[type] || 0 });
  if (!definition || !Object.hasOwn(CONSTRUCTION_SECONDS, type)) return denied('Άγνωστη κατασκευή.');
  if (!alive(game.player)) return denied('Ο αρχηγός πρέπει να είναι ζωντανός.');
  const raw = suppliedPlacement || (type === 'shelter' ? game.placement?.() : null);
  const camp = type === 'shelter' ? null : raw?.campId ? campById(game, raw.campId) : game.nearestHome?.();
  let placement = placementData(raw || {}, camp?.id), duration = CONSTRUCTION_SECONDS[type];
  if (raw?.local && !placement.local) return denied('Η θέση κατασκευής περιέχει μη έγκυρες συντεταγμένες.');
  if (type === 'shelter') {
    if (!Number.isFinite(placement.x) || !Number.isFinite(placement.z)) return denied('Διάλεξε στεγνή θέση για το νέο εργοτάξιο.');
    if (Math.abs(placement.x) > WORLD_BOUNDARY - SHELTER_RADIUS - 2.5 || Math.abs(placement.z) > WORLD_BOUNDARY - SHELTER_RADIUS - 2.5) return denied('Ολόκληρο το κάστρο πρέπει να χωρά στη στεριά.');
    if (distance(placement, game.player) > 36) return denied('Πλησίασε τη θέση κατασκευής.');
    if ((game.camps || []).some(other => !other.destroyed && distance(other, placement) < SHELTER_RADIUS * 2 + 8)) return denied('Το νέο κάστρο επικαλύπτει άλλη βάση ή εργοτάξιο.');
    const surface = game.world?.getSurface?.(placement.x, placement.z);
    if (!placement.ruinId && surface && surface.type !== 'land' && !(surface.type === 'rock' && surface.platform?.radius > 6)) return denied('Χρειάζεται στεριά για το εργοτάξιο.');
  } else {
    if (!active(camp)) return denied('Πλησίασε ολοκληρωμένο φιλικό κάστρο.');
    if (distance(camp, game.player) > SHELTER_RADIUS + 6) return denied('Πλησίασε το συγκεκριμένο κάστρο.');
    if (type !== 'repair' && !safe(game, camp)) return denied('Η βάση δέχεται επίθεση. Πρώτα υπερασπίσου την περιοχή.');
    const pending = constructionJobs(game, camp.id);
    if (pending.some(job => job.type === type)) return denied('Η συγκεκριμένη κατασκευή υπάρχει ήδη στην ουρά.');
    if (type === 'upgrade' && finite(camp.tier, 1) >= 3) return denied('Το κάστρο βρίσκεται ήδη στην ανώτερη βαθμίδα.');
    if (type === 'repair' && camp.hp >= camp.maxHp && (camp.gateHp ?? gateMaxHealth(camp)) >= gateMaxHealth(camp)) return denied('Το κάστρο και η πύλη δεν έχουν ζημιές.');
    if (buildingTypes.includes(type)) {
      if (camp.buildings?.[type]) return denied('Το κτίριο υπάρχει ήδη.');
      const count = occupiedBuildings(camp) + pending.filter(job => buildingTypes.includes(job.type)).length;
      if (count >= campBuildingSlots(camp)) return denied(`Όλες οι ${campBuildingSlots(camp)} θέσεις κτιρίων έχουν δεσμευτεί. Αναβάθμισε ή χρησιμοποίησε άλλο κάστρο.`);
      if (!camp.specialization && count >= 2) return denied('Διάλεξε ειδίκευση κάστρου πριν από το τρίτο κτίριο.');
      const specialization = CAMP_SPECIALIZATIONS[camp.specialization];
      if (specialization && !specialization.allowed.includes(type)) return denied(`Η ειδίκευση «${specialization.label}» δεν επιτρέπει αυτό το νέο κτίριο.`);
      if (placedTypes.has(type) && !preview) {
        placement.local ||= initialPlacement(type);
        const validation = validateBuildingPlacement(constructionCamp(game, camp), type, placement.local);
        if (!validation.valid) return denied('Η θέση είναι δεσμευμένη, έξω από την αυλή ή επικαλύπτει άλλο κτίριο/εργοτάξιο.');
      }
    }
    if (camp.specialization === 'defense' && ['watchtower', 'palisade', 'repair'].includes(type)) duration *= .75;
  }
  if (!canAfford(game.resources, definition.cost)) return denied('Δεν αρκούν οι κοινόχρηστοι πόροι για την κατασκευή.');
  return { enabled: true, reason: '', type, campId: camp?.id || null, placement, cost: { ...definition.cost }, duration };
}

export function queueConstruction(game, type, placement = null) {
  const offer = constructionOffer(game, type, placement);
  game.lastBuildCommitted = false;
  if (!offer.enabled) { notify(game, offer.reason, 'warning'); return false; }
  const state = stateFor(game), job = { id: `job-${state.nextJobId++}`, kind: 'construction', type, campId: offer.campId, siteId: null, placement: offer.placement, cost: offer.cost, duration: offer.duration, progress: 0, status: 'queued', reason: '', createdAt: nonnegative(game.elapsed) };
  if (!spend(game.resources, job.cost)) return false;
  if (type === 'shelter') {
    let site;
    try {
      site = game.createConstructionSite?.(job);
      if (!site && typeof game.addCamp === 'function') {
        site = game.addCamp({ id: `site-${++game.idCounter}`, name: 'Νέο εργοτάξιο', team: 'ally', ...job.placement, hp: 140, maxHp: 140, gateHp: 0, tier: 1, underConstruction: true, buildings: {}, originalEnemy: false });
      }
    } catch (error) { costRefund(game, job.cost, 1); throw error; }
    const siteId = typeof site === 'string' ? site : site?.id;
    if (!siteId) { costRefund(game, job.cost, 1); notify(game, 'Δεν δημιουργήθηκε ασφαλές εργοτάξιο.', 'warning'); return false; }
    job.siteId = siteId; job.campId = siteId; job.placement.campId = siteId;
    const camp = campById(game, siteId); if (camp) camp.underConstruction = true;
  }
  state.jobs.push(job);
  game.onConstructionQueued?.(job);
  game.constructionQueued?.(job);
  game.lastBuildCommitted = true;
  notify(game, `${BUILDINGS[type].name}: η κατασκευή ξεκίνησε (${Math.ceil(job.duration)}″). Προστάτευσε το εργοτάξιο.`, 'success');
  game.audio?.play?.('build'); game.save?.();
  return true;
}

export function setCampSpecialization(game, campId, specialization) {
  const camp = campById(game, campId), choice = Object.hasOwn(CAMP_SPECIALIZATIONS, specialization) ? CAMP_SPECIALIZATIONS[specialization] : null;
  if (!active(camp) || !choice || !safe(game, camp)) { notify(game, 'Χρειάζεται ασφαλές, ολοκληρωμένο φιλικό κάστρο.', 'warning'); return false; }
  if (camp.specialization) { notify(game, 'Η ειδίκευση αυτού του κάστρου έχει ήδη επιλεγεί.', 'warning'); return false; }
  if (constructionJobs(game, camp.id).some(job => buildingTypes.includes(job.type) && !choice.allowed.includes(job.type))) { notify(game, 'Η ειδίκευση συγκρούεται με κτίριο που κατασκευάζεται. Ολοκλήρωσε ή ακύρωσέ το πρώτα.', 'warning'); return false; }
  camp.specialization = specialization;
  notify(game, `${camp.name}: ειδίκευση ${choice.label}. Τα υπάρχοντα κτίρια διατηρούνται.`, 'success');
  game.save?.(); return true;
}

function targetsFor(game, ids) {
  const requested = Array.isArray(ids) && ids.length ? new Set(ids.map(String)) : game.selectedIds?.size ? new Set([...game.selectedIds].map(String)) : new Set([game.player?.id]);
  return actorList(game).filter(actor => requested.has(String(actor.id)));
}

function recipeTargets(game, recipe, ids) {
  const requested = targetsFor(game, ids), jobs = stateFor(game).jobs;
  return requested.filter(actor => {
    const gear = normalizeEquipment(actor.equipment);
    if (recipe.slot === 'armor' && (gear.armor === recipe.equipmentId || gear.armor === 'shell')) return false;
    if (recipe.slot !== 'armor' && gear[recipe.slot] === recipe.equipmentId) return false;
    return !jobs.some(job => job.kind === 'craft' && job.targetId === actor.id && CRAFT_RECIPES[job.recipeId]?.slot === recipe.slot);
  });
}

export function craftOffer(game, { campId, recipeId, targetIds } = {}) {
  const recipe = Object.hasOwn(CRAFT_RECIPES, recipeId) ? CRAFT_RECIPES[recipeId] : null, camp = campById(game, campId) || game.nearestHome?.(), denied = reason => ({ enabled: false, reason, recipe, campId: camp?.id || null, targets: [], totalCost: recipe?.cost || {}, duration: recipe?.duration || 0 });
  if (!recipe) return denied('Άγνωστη συνταγή εξοπλισμού.');
  if (!active(camp) || !camp.buildings?.training) return denied('Χρειάζεται ολοκληρωμένος χώρος εκπαίδευσης και εργαστήριο σε φιλικό κάστρο.');
  if (distance(camp, game.player) > SHELTER_RADIUS + 6) return denied('Πλησίασε το εργαστήριο για να παραγγείλεις εξοπλισμό.');
  if (!safe(game, camp)) return denied('Το εργαστήριο δέχεται επίθεση.');
  if (finite(game.player?.level, 1) < recipe.requiredLevel) return denied(`Η συνταγή ξεκλειδώνει στο επίπεδο ${recipe.requiredLevel}.`);
  const targets = recipeTargets(game, recipe, targetIds);
  if (!targets.length) return denied('Οι επιλεγμένοι έχουν ήδη αυτόν ή καλύτερο εξοπλισμό, ή περιμένουν παραγγελία.');
  const totalCost = copyCost(recipe.cost, targets.length), duration = recipe.duration * campSpecializationEffects(camp).craftTimeMultiplier;
  if (!canAfford(game.resources, totalCost)) return { ...denied('Δεν αρκούν οι πόροι για όλα τα επιλεγμένα μέλη.'), totalCost, targets, duration };
  return { enabled: true, reason: '', recipe, campId: camp.id, targets, totalCost, duration };
}

export function craftEquipment(game, payload = {}) {
  const offer = craftOffer(game, payload);
  if (!offer.enabled) { notify(game, offer.reason, 'warning'); return false; }
  if (!spend(game.resources, offer.totalCost)) return false;
  const state = stateFor(game);
  for (const target of offer.targets) state.jobs.push({ id: `job-${state.nextJobId++}`, kind: 'craft', recipeId: offer.recipe.id, type: offer.recipe.id, targetId: target.id, campId: offer.campId, siteId: null, cost: { ...offer.recipe.cost }, duration: offer.duration, progress: 0, status: 'queued', reason: '', createdAt: nonnegative(game.elapsed) });
  notify(game, `${offer.recipe.name}: ${offer.targets.length} παραγγελίες στο εργαστήριο. Η παράδοση γίνεται όταν ο βάτραχος επιστρέψει στη βάση.`, 'success');
  game.save?.(); return true;
}

export function cancelRealmJob(game, jobId) {
  const state = stateFor(game), job = state.jobs.find(job => job.id === jobId), camp = job && campById(game, job.campId);
  if (!job || !owned(camp) || !safe(game, camp)) { notify(game, 'Η ακύρωση απαιτεί ασφαλή φιλική βάση.', 'warning'); return false; }
  costRefund(game, job.cost, .5);
  if (job.type === 'shelter' && camp.underConstruction) {
    camp.destroyed = true; camp.hp = 0; camp.underConstruction = false;
    game.world?.updateShelter?.(camp.mesh, { ...camp, storage: camp.stock || {} });
  }
  state.jobs = state.jobs.filter(other => other !== job);
  game.onConstructionCancelled?.(job, camp);
  notify(game, 'Η παραγγελία ακυρώθηκε. Επιστράφηκε το 50% των πόρων.', 'info');
  game.save?.(); return true;
}

function updateSupply(game, dt) {
  const state = stateFor(game), troops = actorList(game).filter(actor => actor.team === 'ally'), bases = (game.camps || []).filter(camp => active(camp) && safe(game, camp));
  // The normal camp income remains in FrogGame. Only the specialization bonus
  // is credited here, so integration never duplicates the original economy.
  for (const camp of bases) {
    const effects = campSpecializationEffects(camp);
    game.resources.food = nonnegative(game.resources.food) + effects.foodBonusPerSecond * dt;
    game.resources.reeds = nonnegative(game.resources.reeds) + effects.materialBonusPerSecond * dt;
  }
  const required = troops.length * UPKEEP_PER_FROG * dt, supplied = bases.length ? Math.min(nonnegative(game.resources.food), required) : 0;
  if (supplied > 0) game.resources.food = Math.max(0, nonnegative(game.resources.food) - supplied);
  const ratio = required > 0 ? supplied / required : 1;
  state.servedRatio = ratio;
  state.shortageSeconds = ratio < .999 ? state.shortageSeconds + dt : Math.max(0, state.shortageSeconds - dt * 2);
  for (const actor of troops) {
    actor.stomach = bounded(finite(actor.stomach, 60) + dt * (.075 * ratio - .045 * (1 - ratio)), 0, 100);
    actor.morale = bounded(finite(actor.morale, 100) + dt * (ratio >= .999 ? .04 + equipmentBonuses(actor).moraleRecovery : -.18 * (1 - ratio)), 0, 100);
  }
  if (required > 0 && ratio < .999 && state.shortageSeconds >= 8 && finite(game.elapsed) >= state.nextShortageNotice) {
    state.nextShortageNotice = finite(game.elapsed) + 60;
    notify(game, bases.length ? 'Έλλειψη τροφής: η πείνα και το ηθικό του στρατού επιδεινώνονται. Ενίσχυσε την παραγωγή.' : 'Η τροφοδοσία χρειάζεται ασφαλές κάστρο. Οι ακόλουθοι πρέπει προσωρινά να κυνηγούν μύγες.', 'warning');
  }
}

// Build the remote index only when an order's recipient is absent locally.
// Local live/dead state is authoritative; an archived active-region copy must
// never keep a dead or captured recipient alive for delivery/refund purposes.
function craftRecipientLookup(game) {
  let local = null, remote = null;
  return id => {
    if (!id) return null;
    local ||= new Map((game.frogs || []).map(actor => [actor.id, actor]));
    if (game.player && !local.has(game.player.id)) local.set(game.player.id, game.player);
    if (local.has(id)) {
      const actor = local.get(id);
      return alive(actor) && ['ally', 'player'].includes(actor.team) ? { actor, remote: false } : null;
    }
    if (!remote) {
      remote = new Map();
      const activeRegion = Number.isSafeInteger(game.realms?.active) ? game.realms.active : 0;
      for (const [index, region] of Object.entries(game.realms?.regions || {})) {
        if (Number(index) === activeRegion) continue;
        for (const actor of Array.isArray(region?.snapshot?.frogs) ? region.snapshot.frogs : []) {
          if (actor && alive(actor) && ['ally', 'player'].includes(actor.team) && !local.has(actor.id)) remote.set(actor.id, actor);
        }
      }
    }
    const actor = remote.get(id);
    return actor ? { actor, remote: true } : null;
  };
}

function finishCraft(game, job, camp) {
  const target = (game.frogs || []).find(actor => actor.id === job.targetId && alive(actor) && ['ally', 'player'].includes(actor.team));
  if (!target) return 'lost';
  if (distance(target, camp) > SHELTER_RADIUS + 5) { job.status = 'delivery'; job.reason = 'Έτοιμο: περιμένει τον βάτραχο στη βάση για παράδοση.'; return false; }
  const recipe = CRAFT_RECIPES[job.recipeId], gear = normalizeEquipment(target.equipment);
  // A stronger item acquired while this order was in progress is never replaced.
  if (!(recipe.slot === 'armor' && gear.armor === 'shell' && recipe.equipmentId === 'reed')) gear[recipe.slot] = recipe.equipmentId;
  target.equipment = gear; target.model?.setEquipment?.(gear); target.model?.setLevel?.(target.level || 1);
  game.updateFrogPortrait?.(target, true);
  game.stats ||= {}; game.stats.crafted = nonnegative(game.stats.crafted) + 1;
  notify(game, `${target.name || 'Βάτραχος'}: παρέλαβε ${recipe.name.toLocaleLowerCase('el')}.`, 'success');
  game.audio?.play?.('build'); return true;
}

export function updateRealmEconomy(game, dt) {
  if (!(finite(dt) > 0)) return;
  const state = stateFor(game);
  state.upkeepAccumulator += finite(dt);
  if (state.upkeepAccumulator >= 1) { const elapsed = state.upkeepAccumulator; state.upkeepAccumulator = 0; updateSupply(game, elapsed); }
  const busyWorkshops = new Set(), finished = new Set(), recipientFor = craftRecipientLookup(game);
  let changed = false;
  for (const job of state.jobs) {
    const camp = campById(game, job.campId);
    if (!owned(camp)) { finished.add(job); game.onConstructionCancelled?.(job, camp); notify(game, 'Η βάση χάθηκε: η ανολοκλήρωτη παραγγελία καταστράφηκε.', 'warning'); changed = true; continue; }
    if (!safe(game, camp)) { job.status = 'paused'; job.reason = 'Παύση: η βάση δέχεται επίθεση.'; continue; }
    if (job.kind === 'craft') {
      if (!active(camp) || !camp.buildings?.training) { job.status = 'paused'; job.reason = 'Χρειάζεται λειτουργικό εργαστήριο.'; continue; }
      const recipient = recipientFor(job.targetId);
      if (!recipient) { costRefund(game, job.cost, .5); finished.add(job); changed = true; notify(game, 'Ο παραλήπτης χάθηκε. Ανακτήθηκε το 50% των υλικών της παραγγελίας.', 'warning'); continue; }
      if (recipient.remote) { job.status = 'paused'; job.reason = 'Ο παραλήπτης βρίσκεται σε άλλη περιοχή. Η πληρωμένη παραγγελία συνεχίζεται όταν επιστρέψει.'; continue; }
      if (job.progress < job.duration && busyWorkshops.has(camp.id)) { job.status = 'queued'; job.reason = 'Περιμένει την προηγούμενη κατασκευή του εργαστηρίου.'; continue; }
      if (job.progress < job.duration) busyWorkshops.add(camp.id);
    }
    const workRate = job.kind === 'construction' ? bounded(game.constructionWorkRate?.(job) ?? 1, 0, 4) : 1;
    if (workRate <= 0) { job.status = 'paused'; job.reason ||= 'Πλησίασε το σημείο εργασίας ή φέρε ελεύθερους συνοδούς.'; continue; }
    job.status = 'working'; job.reason = ''; job.progress = Math.min(job.duration, job.progress + dt * workRate);
    game.onConstructionProgress?.(job, camp);
    if (job.progress + 1e-9 < job.duration) continue;
    if (job.kind === 'craft') {
      const done = finishCraft(game, job, camp); if (done) { finished.add(job); changed = true; }
    } else {
      // Callers may save after applying the world mutation. Never serialize the
      // just-applied job from inside that callback, or loading could build twice.
      job.status = 'committing';
      const done = game.completeConstruction?.(job);
      if (done === true) {
        if (job.type === 'shelter') camp.underConstruction = false;
        const xp = CONSTRUCTION_XP[job.type] || 0; if (xp > 0) game.gainXP?.(xp);
        game.stats ||= {}; game.stats.constructionCompleted = nonnegative(game.stats.constructionCompleted) + 1;
        finished.add(job); changed = true;
      } else { job.status = 'paused'; job.reason = 'Η τελική θέση δεν είναι διαθέσιμη. Ελευθέρωσε τον χώρο ή ακύρωσε την παραγγελία.'; }
    }
  }
  if (finished.size) state.jobs = state.jobs.filter(job => !finished.has(job));
  if (changed) game.save?.();
}

function supplyRates(game) {
  const bases = (game.camps || []).filter(camp => active(camp) && safe(game, camp));
  let food = 0, materials = 0;
  for (const camp of bases) {
    const effects = campSpecializationEffects(camp);
    food += (camp.buildings?.store ? .5 : .25) + effects.foodBonusPerSecond;
    materials += (camp.buildings?.watchtower ? .2 : .12) + effects.materialBonusPerSecond;
  }
  const armyCount = actorList(game).filter(actor => actor.team === 'ally').length;
  return { bases, armyCount, food, materials, upkeep: armyCount * UPKEEP_PER_FROG };
}

export function realmEconomySnapshot(game) {
  const state = stateFor(game), rates = supplyRates(game), nearest = game.nearestHome?.(), targets = targetsFor(game), recipientFor = craftRecipientLookup(game);
  const current = active(nearest) ? nearest : null, net = rates.food - rates.upkeep;
  return {
    armyCount: rates.armyCount, foodPerMinute: rates.upkeep * 60, foodIncomePerMinute: rates.food * 60, materialIncomePerMinute: rates.materials * 60, netFoodPerMinute: net * 60,
    servedRatio: state.servedRatio, shortage: rates.armyCount > 0 && (!rates.bases.length || state.shortageSeconds > 1), hasSupplyBase: rates.bases.length > 0,
    minutesOfFood: net < 0 ? nonnegative(game.resources.food) / -net / 60 : null,
    currentCampId: current?.id || null, craftTargetIds: targets.map(target => target.id), craftTargetsLabel: targets.length === 1 ? targets[0].name : `${targets.length} επιλεγμένοι βάτραχοι`,
    recipes: Object.values(CRAFT_RECIPES).map(recipe => {
      const offer = craftOffer(game, { campId: current?.id, recipeId: recipe.id, targetIds: targets.map(target => target.id) });
      return { ...recipe, cost: { ...recipe.cost }, totalCost: offer.totalCost, duration: offer.duration, enabled: offer.enabled, reason: offer.reason, targetCount: offer.targets.length };
    }),
    jobs: state.jobs.map(job => {
      const camp = campById(game, job.campId), actor = recipientFor(job.targetId)?.actor;
      return { id: job.id, kind: job.kind, type: job.type, label: job.kind === 'craft' ? CRAFT_RECIPES[job.recipeId]?.name : BUILDINGS[job.type]?.name, campId: job.campId, campName: camp?.name || 'Χαμένη βάση', progress: job.progress, duration: job.duration, remaining: Math.max(0, job.duration - job.progress), status: job.status, reason: job.reason || '', targetId: job.targetId, targetName: actor?.name || '', workersPresent: nonnegative(job.workersPresent), workersAssigned: nonnegative(job.workersAssigned), workRate: nonnegative(job.workRate), playerBuilding: Boolean(job.playerBuilding), workPoint: job.workPoint ? { x: job.workPoint.x, z: job.workPoint.z } : null, canCancel: owned(camp) && safe(game, camp) };
    }),
    camps: (game.camps || []).filter(owned).map(camp => ({
      id: camp.id, name: camp.name, specialization: camp.specialization, specializationLabel: CAMP_SPECIALIZATIONS[camp.specialization]?.label || 'Χωρίς ειδίκευση', safe: safe(game, camp), underConstruction: Boolean(camp.underConstruction), slotsUsed: occupiedBuildings(camp), slotsReserved: constructionJobs(game, camp.id).filter(job => buildingTypes.includes(job.type)).length, slotsTotal: campBuildingSlots(camp),
      availableSpecializations: Object.values(CAMP_SPECIALIZATIONS).map(choice => ({ id: choice.id, label: choice.label, description: choice.description, enabled: active(camp) && safe(game, camp) && !camp.specialization, reason: camp.specialization ? 'Η ειδίκευση έχει ήδη επιλεγεί.' : camp.underConstruction ? 'Περίμενε να ολοκληρωθεί το κάστρο.' : !safe(game, camp) ? 'Η βάση δέχεται επίθεση.' : '' }))
    }))
  };
}

export function economySave(game) {
  const state = stateFor(game);
  return { version: ECONOMY_VERSION, nextJobId: state.nextJobId, upkeepAccumulator: state.upkeepAccumulator, shortageSeconds: state.shortageSeconds, jobs: state.jobs.filter(job => job.status !== 'committing').map(job => ({ id: job.id, kind: job.kind, type: job.type, recipeId: job.recipeId, targetId: job.targetId, campId: job.campId, siteId: job.siteId, placement: placementData(job.placement), cost: { ...job.cost }, duration: job.duration, progress: job.progress, status: job.status, createdAt: job.createdAt })) };
}
