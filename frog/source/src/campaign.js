/** Mandatory campaign and training rules; independent of rendering and input. */
export const CAMPAIGN_VERSION = 1;
export const CAMPAIGN_PHASES = ['settlement', 'hunters', 'preparation', 'bosses', 'complete'];
export const HUNTER_TYPES = ['heron', 'snake', 'fish'];
export const TRAINING = Object.freeze({ cost: Object.freeze({ food: 8, reeds: 4 }), duration: 18 });

const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const count = value => Math.max(0, finite(value));
const buildingKeys = ['store', 'nursery', 'training', 'watchtower', 'palisade'];
const uniqueTypes = value => [...new Set(Array.isArray(value) ? value.filter(type => HUNTER_TYPES.includes(type)) : [])];
const hasBuilding = (camp, key) => Array.isArray(camp?.buildings) ? camp.buildings.includes(key) : !!camp?.buildings?.[key];
const allyCamp = camp => !!camp && camp.team === 'ally' && !camp.destroyed && finite(camp.hp, 1) > 0;

function normalizedState(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    version: CAMPAIGN_VERSION,
    phase: CAMPAIGN_PHASES.includes(source.phase) ? source.phase : 'settlement',
    defeated: uniqueTypes(source.defeated),
    bossDefeated: uniqueTypes(source.bossDefeated),
    resourceTotals: { food: count(source.resourceTotals?.food), reeds: count(source.resourceTotals?.reeds) },
    achieved: [...new Set(Array.isArray(source.achieved) ? source.achieved.filter(id => typeof id === 'string').map(id => id.slice(0, 100)) : [])],
    legacy: !!source.legacy
  };
}

function metricValues(metrics = {}) {
  const buildings = Object.fromEntries(buildingKeys.map(key => [key, count(metrics.buildings?.[key])]));
  return {
    gatheredFood: count(metrics.gatheredFood), gatheredReeds: count(metrics.gatheredReeds),
    shelters: count(metrics.shelters), buildings,
    buildingCount: Object.values(buildings).reduce((sum, n) => sum + n, 0),
    allies: count(metrics.allies), trained: count(metrics.trained), territories: count(metrics.territories)
  };
}

function objectiveDefinitions(state, metrics, phase = state.phase) {
  const m = metricValues(metrics), food = Math.max(state.resourceTotals.food, m.gatheredFood), reeds = Math.max(state.resourceTotals.reeds, m.gatheredReeds);
  const goal = (id, icon, current, target, label, extra = {}) => ({ id, icon, current, target, label, phase, ...extra });
  if (phase === 'settlement') return [
    goal('gather-food', 'food', food, 30, 'Συγκέντρωσε 30 τροφή'),
    goal('gather-reeds', 'reeds', reeds, 45, 'Συγκέντρωσε 45 υλικά'),
    goal('build-shelter', 'shelter', m.shelters, 1, 'Απόκτησε ένα καταφύγιο'),
    goal('build-store', 'store', m.buildings.store, 1, 'Κατασκεύασε αποθήκη'),
    goal('build-nursery', 'nursery', m.buildings.nursery, 1, 'Κατασκεύασε φυτώριο'),
    goal('build-training', 'training', m.buildings.training, 1, 'Κατασκεύασε χώρο εκπαίδευσης'),
    goal('recruit-allies', 'recruit', m.allies, 6, 'Στρατολόγησε έξι συμμάχους'),
    goal('train-starters', 'training', m.trained, 3, 'Εκπαίδευσε τρεις βατράχους')
  ];
  if (phase === 'hunters') return HUNTER_TYPES.map(type => goal('hunt-' + type, type, state.defeated.includes(type) ? 1 : 0, 1, 'Νίκησε τον θηρευτή: ' + type, { type, boss: false }));
  if (phase === 'preparation') return [
    goal('expand-shelters', 'shelter', m.shelters, 2, 'Απόκτησε δύο καταφύγια'),
    goal('expand-buildings', 'build', m.buildingCount, 6, 'Κατασκεύασε έξι κτίρια'),
    goal('train-army', 'training', m.trained, 6, 'Εκπαίδευσε έξι βατράχους')
  ];
  if (phase === 'bosses' || phase === 'complete') return [
    ...HUNTER_TYPES.map(type => goal('boss-' + type, type, state.bossDefeated.includes(type) ? 1 : 0, 1, 'Νίκησε τον αρχηγό: ' + type, { type, boss: true })),
    goal('territories', 'crown', m.territories, 5, 'Κράτησε και τις πέντε αντίπαλες περιοχές με ενεργά καταφύγια')
  ];
  return [];
}

export function campaignObjectives(value, metrics = {}) {
  const state = normalizedState(value);
  return objectiveDefinitions(state, metrics).map(objective => {
    // Territory is current control: losing a camp must matter before victory.
    const done = (objective.id !== 'territories' && state.achieved.includes(objective.id)) || objective.current >= objective.target;
    const current = done ? Math.max(objective.current, objective.target) : objective.current;
    return { ...objective, current, done, progress: Math.min(1, Math.max(0, current / objective.target)) };
  });
}

/** Return a new state. Achievements latch; unlocked chapters never regress. */
export function advanceCampaign(value, metrics = {}) {
  const state = normalizedState(value), m = metricValues(metrics), transitions = [];
  state.resourceTotals.food = Math.max(state.resourceTotals.food, m.gatheredFood);
  state.resourceTotals.reeds = Math.max(state.resourceTotals.reeds, m.gatheredReeds);
  for (let step = 0; step < CAMPAIGN_PHASES.length; step++) {
    const objectives = campaignObjectives(state, m);
    state.achieved=state.achieved.filter(id=>id!=='territories');
    for (const objective of objectives) if (objective.id!=='territories'&&objective.done&&!state.achieved.includes(objective.id)) state.achieved.push(objective.id);
    if (state.phase === 'complete' || !objectives.length || !objectives.every(objective => objective.done)) break;
    const from = state.phase, to = CAMPAIGN_PHASES[CAMPAIGN_PHASES.indexOf(from) + 1];
    state.phase = to; transitions.push({ from, to });
  }
  return { state, transitions };
}

export function createCampaign(savedCampaign = null, metrics = {}, { legacy = false } = {}) {
  const state = normalizedState(savedCampaign);
  state.legacy = state.legacy || legacy;
  return advanceCampaign(state, metrics).state;
}

/** Only actual gains are recorded: spending never reverses collection goals. */
export function recordGathering(value, food = 0, reeds = 0) {
  const state = normalizedState(value);
  state.resourceTotals.food += count(food);
  state.resourceTotals.reeds += count(reeds);
  return state;
}

export function nextBossType(value) {
  const state = normalizedState(value);
  return state.phase === 'bosses' ? HUNTER_TYPES.find(type => !state.bossDefeated.includes(type)) ?? null : null;
}

/** Death callbacks, not retreats, award the distinct species goals. */
export function recordCampaignKill(value, type, { boss = false } = {}) {
  const state = normalizedState(value);
  if (!HUNTER_TYPES.includes(type)) return state;
  if (boss) {
    if (state.phase !== 'bosses' || nextBossType(state) !== type) return state;
    if (!state.bossDefeated.includes(type)) state.bossDefeated.push(type);
  } else {
    if (state.phase !== 'hunters') return state;
    if (!state.defeated.includes(type)) state.defeated.push(type);
  }
  return state;
}

/**
 * Old saves have no cumulative counters. Infer collection fairly from money
 * remaining and known owned camp investment, without inventing hunter kills.
 */
export function inferLegacyMetrics(save = {}) {
  const camps = Array.isArray(save.camps) ? save.camps : [];
  const owned = camps.filter(allyCamp);
  const frogs = (Array.isArray(save.frogs) ? save.frogs : []).filter(f => f && f.team === 'ally' && !f.dead && finite(f.hp, 1) > 0);
  const buildings = Object.fromEntries(buildingKeys.map(key => [key, owned.filter(camp => hasBuilding(camp, key)).length]));
  const costs = { store: { food: 10, reeds: 20 }, nursery: { food: 22, reeds: 28 }, training: { food: 18, reeds: 24 }, watchtower: { food: 12, reeds: 24 }, palisade: { food: 8, reeds: 30 } };
  const invested = { food: owned.length * 12, reeds: owned.length * 30 };
  for (const key of buildingKeys) for (const resource of ['food', 'reeds']) invested[resource] += buildings[key] * costs[key][resource];
  const stored = owned.reduce((sum, camp) => ({ food: sum.food + count(camp.stock?.food), reeds: sum.reeds + count(camp.stock?.reeds) }), { food: 0, reeds: 0 });
  return {
    gatheredFood: Math.max(count(save.stats?.gatheredFood), count(save.resources?.food) + stored.food + invested.food),
    gatheredReeds: Math.max(count(save.stats?.gatheredReeds), count(save.resources?.reeds) + stored.reeds + invested.reeds),
    shelters: owned.length,
    buildings,
    allies: frogs.length,
    trained: frogs.filter(f => f.trained || finite(f.level, 1) >= 2).length,
    territories: camps.filter(c => c.originalEnemy && !c.destroyed && c.team === 'ally').length
  };
}

export function canTrain(frog, camp, resources = {}) {
  return !!frog && frog.team === 'ally' && !frog.dead && finite(frog.hp) > 0
    && !frog.trained && !frog.trainingPaid && !frog.grabbedBy
    && allyCamp(camp) && hasBuilding(camp, 'training')
    && count(resources.food) >= TRAINING.cost.food && count(resources.reeds) >= TRAINING.cost.reeds;
}

/** Apply the permanent one-time reward. The caller completes orders and timers. */
export function applyTraining(frog) {
  if (!frog || frog.dead || !(finite(frog.hp) > 0) || frog.trained) return false;
  const level = Math.max(1, Math.floor(finite(frog.level, 1)));
  const tier = Math.max(1, Math.floor(finite(frog.tier, 1)));
  const newLevel = Math.min(99, level + 1);
  frog.level = newLevel;
  frog.tier = Math.max(2, tier);
  frog.maxHp = Math.max(1, finite(frog.maxHp, 100)) + (newLevel > level ? 8 : 0) + (tier < 2 ? 25 : 0);
  frog.hp = frog.maxHp;
  frog.xp = count(frog.xp);
  frog.trained = true;
  return true;
}

