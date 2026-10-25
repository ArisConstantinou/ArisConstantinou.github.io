/**
 * Shared economy and squad rules. Resource keys stay compatible with v1 saves.
 * These functions deliberately have no renderer or world dependencies.
 */
const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const nonnegative = value => Math.max(0, finite(value));
const healthLimit = frog => Math.max(1, finite(frog?.maxHp ?? frog?.maxHP, 100));
const stomachLimit = frog => Math.max(1, finite(frog?.maxStomach, 100));
const alive = frog => !!frog && !frog.dead && finite(frog.hp, healthLimit(frog)) > 0;
const factionOf = entity => entity?.faction ?? entity?.team ?? entity?.owner;
const allied = entity => ['ally', 'player', 'allied'].includes(factionOf(entity)) || entity?.allied === true;
const hasBuilding = (camp, name) => Array.isArray(camp?.buildings)
  ? camp.buildings.includes(name)
  : !!camp?.buildings?.[name];
const activeAllyCamp = camp => !!camp && allied(camp) && !camp.destroyed && finite(camp.hp, 1) > 0;

/** Recruitment and nursery births have no population or housing ceiling. */
export function recruitmentOffer(frog, camp = null) {
  const result = (eligible, guaranteed, food, reason) => ({ eligible, guaranteed, cost: { food }, reason });
  if (!alive(frog) || allied(frog) || frog?.isPlayer) return result(false, false, 0, 'unavailable');
  const surrendered = !!frog.surrendered || !!frog.surrender || frog.state === 'surrender' || frog.state === 'surrendered';
  if (surrendered || camp?.destroyed || (camp && finite(camp.hp, 1) <= 0)) {
    return result(true, true, 0, 'surrender');
  }
  if (factionOf(frog) === 'neutral') return result(true, true, 4, 'neutral');
  return result(true, false, 6, 'persuade');
}

export function canHuntForRecovery(frog) {
  return alive(frog) && (finite(frog.stomach) < stomachLimit(frog) || finite(frog.hp) < healthLimit(frog));
}

/**
 * Consume one real fly. A full but injured frog may still heal.
 * The caller credits the returned food to the shared bank and ticks eatCD.
 */
export function feedFromFly(frog, hotspot) {
  const denied = reason => ({ consumed: false, nourished: 0, healed: 0, food: 0, reason });
  if (!alive(frog)) return denied('unavailable');
  if (!canHuntForRecovery(frog)) return denied('full');
  if (finite(frog.eatCD) > 0) return denied('cooldown');
  if (!hotspot) return denied('empty');
  const stockKey = typeof hotspot.flies === 'number' ? 'flies'
    : typeof hotspot.count === 'number' ? 'count'
    : typeof hotspot.amount === 'number' ? 'amount' : 'flies';
  if (nonnegative(hotspot[stockKey]) < 1) return denied('empty');
  const stomach = nonnegative(frog.stomach);
  const hp = nonnegative(frog.hp);
  const nourished = Math.max(0, Math.min(12, stomachLimit(frog) - stomach));
  const healed = Math.max(0, Math.min(14, healthLimit(frog) - hp));
  hotspot[stockKey] = Math.max(0, hotspot[stockKey] - 1);
  frog.stomach = Math.min(stomachLimit(frog), stomach + nourished);
  frog.hp = Math.min(healthLimit(frog), hp + healed);
  frog.eatCD = 1.8;
  return { consumed: true, nourished, healed, food: 1, reason: 'fed' };
}

/** One-time migration of allied local storage into the common bank. */
export function settleCampSupplies(resources, camp) {
  const credited = { food: 0, reeds: 0 };
  if (!resources || !activeAllyCamp(camp) || camp.supplyMigrated) return credited;
  for (const key of ['food', 'reeds']) {
    credited[key] = nonnegative(camp.stock?.[key]);
    resources[key] = nonnegative(resources[key]) + credited[key];
  }
  camp.stock = { food: 0, reeds: 0 };
  camp.supplyMigrated = true;
  return credited;
}

/** Safe shelters generate spendable resources directly, never a hidden balance. */
export function creditCampIncome(resources, camp, dt, { safe = true } = {}) {
  const credited = { food: 0, reeds: 0 };
  if (!resources || !safe || !activeAllyCamp(camp) || !(finite(dt) > 0)) return credited;
  credited.food = (hasBuilding(camp, 'store') ? 0.5 : 0.25) * finite(dt);
  credited.reeds = (hasBuilding(camp, 'watchtower') ? 0.2 : 0.12) * finite(dt);
  resources.food = nonnegative(resources.food) + credited.food;
  resources.reeds = nonnegative(resources.reeds) + credited.reeds;
  return credited;
}

/** Nutrition pays for gradual healing; threatened camps cannot heal instantly. */
export function recoverAtShelter(frog, dt, { safe = true, store = false } = {}) {
  if (!safe || !alive(frog) || frog.grabbed || frog.grabbedBy || !(finite(dt) > 0)) return 0;
  const nutrition = Math.max(0, finite(frog.stomach) - 10);
  const missing = Math.max(0, healthLimit(frog) - finite(frog.hp));
  const healed = Math.min(missing, (store ? 3.8 : 2.2) * finite(dt), nutrition / 0.18);
  if (!(healed > 0)) return 0;
  frog.hp += healed;
  frog.stomach = Math.max(10, finite(frog.stomach) - healed * 0.18);
  return healed;
}

