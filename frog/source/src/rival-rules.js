/** Rival force planning. These rules never limit or charge the player's army. */
export const RIVAL_RECRUIT_COST = Object.freeze({ food: 6, reeds: 2 });

const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const count = value => Math.max(0, Math.floor(finite(value)));
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
const distance = (a, b) => Math.hypot(finite(a?.x) - finite(b?.x), finite(a?.z) - finite(b?.z));
const alive = frog => !!frog && !frog.dead && finite(frog.hp, 1) > 0;

function factionIndex(camp = {}) {
  if (camp.rivalIndex !== undefined && camp.rivalIndex !== null && Number.isFinite(Number(camp.rivalIndex))) {
    return clamp(count(camp.rivalIndex), 0, 4);
  }
  const team = typeof camp.originalTeam === 'string' ? camp.originalTeam : camp.team;
  const index = typeof team === 'string' ? /^enemy(\d+)$/.exec(team)?.[1] : null;
  return index === null || index === undefined ? 0 : clamp(count(index), 0, 4);
}

/**
 * garrison is the desired living force AT this base, excluding raiders.
 * It is an AI recruitment objective, never a ceiling on either army.
 * Strongholds retain at least a player-sized defense when dispatching raids.
 */
export function rivalPlan(camp = {}, {
  alliedCount = 0, elapsed = 0, ownedCount = 0, isStronghold = false
} = {}) {
  const allies = count(alliedCount), tier = clamp(count(camp.tier) || 1, 1, 3);
  const initial = isStronghold ? Math.max(9 + factionIndex(camp) * 3, 28 + tier - 1)
    : 9 + factionIndex(camp) * 3;
  const timePressure = Math.min(12, Math.floor(count(elapsed) / 90));
  const expansionPressure = Math.min(10, Math.max(0, count(ownedCount) - 1) * 2);
  const reserve = Math.max(4, Math.ceil(initial * .3));
  // alliedCount excludes the player, who is also part of the attacking force.
  const defenseFloor = isStronghold ? Math.ceil((allies + 1) * 1.15) : 0;
  const garrison = isStronghold
    ? Math.max(initial, defenseFloor + reserve + timePressure + expansionPressure)
    : initial + Math.ceil(allies * .55) + timePressure + expansionPressure;
  const interval = isStronghold
    ? clamp(24 - (tier - 1) - Math.min(6, Math.floor(allies / 12)) - Math.floor(timePressure / 4), 18, 24)
    : clamp(36 - (tier - 1) * 4 - Math.min(6, Math.floor(allies / 12)) - Math.floor(timePressure / 2), 18, 36);
  const batch = isStronghold
    ? clamp(4 + Math.floor(allies / 20) + Math.floor(timePressure / 4), 4, 8)
    : clamp(2 + (tier > 1 ? 1 : 0) + Math.floor(allies / 18) + Math.floor(timePressure / 4), 2, 6);
  const raidSize = Math.max(4, Math.ceil(initial * .25 + allies * .2 + timePressure * .35 + expansionPressure * .25));
  // Local production can pay for the scheduled reinforcements with a small
  // reserve for rebuilding. Stock is still spent by the actual spawn operation.
  const foodRate = Math.max(.45, RIVAL_RECRUIT_COST.food * batch / interval * 1.2);
  const materialRate = Math.max(.16, RIVAL_RECRUIT_COST.reeds * batch / interval * 1.2);
  return { initial, garrison, reserve, interval, batch, raidSize, foodRate, materialRate, defenseFloor, isStronghold: !!isStronghold };
}

/**
 * Select real, available local troops without changing actors or their order.
 * The leader stays home, as do `reserve` other troops. A stronghold also keeps
 * its entire defenseFloor; distant or already marching units cannot count as
 * that defense and cannot be sent on a second raid.
 */
export function chooseRaiders(frogs, camp, plan = rivalPlan(camp)) {
  if (!camp || camp.destroyed || !String(camp.team || '').startsWith('enemy')) return [];
  const local = (Array.isArray(frogs) ? frogs : []).filter(frog => alive(frog)
    && frog.team === camp.team && frog.home === camp.id
    && !frog.surrendered && !frog.grabbedBy && !frog.raidTarget
    && distance(frog, camp) <= 24);
  const leaders = local.filter(frog => frog.leader).length;
  const keep = Math.max(count(plan.reserve) + leaders, count(plan.defenseFloor));
  const size = Math.min(count(plan.raidSize), Math.max(0, local.length - keep));
  if (!size) return [];
  return local.filter(frog => !frog.leader)
    .sort((a, b) => Number(!!a.guard) - Number(!!b.guard) || distance(b, camp) - distance(a, camp))
    .slice(0, size);
}

/**
 * Diplomacy ends a fight whose local defenses have actually broken. Global
 * player power alone can never buy an intact faction, regardless of army size.
 * The caller converts local survivors only; raiders/remote camps stay hostile.
 */
export function campSurrenderOffer(camp, {
  defenders = 0, leaderAlive = true, alliedPower = 0, enemyPower = 0
} = {}) {
  const remaining = Array.isArray(defenders)
    ? defenders.filter(frog => alive(frog) && !frog.surrendered).length : count(defenders);
  const cost = { food: 18 + remaining * 3 };
  if (!camp || camp.destroyed || finite(camp.hp) <= 0 || !String(camp.team || '').startsWith('enemy')) {
    return { allowed: false, cost, chance: 0, reason: 'Πλησίασε ενεργή αντίπαλη βάση.' };
  }
  const initial = rivalPlan(camp, { isStronghold: !!camp.isStronghold }).initial;
  const defenderLimit = Math.max(3, Math.floor(initial * .3));
  const health = clamp(finite(camp.hp) / Math.max(1, finite(camp.maxHp, camp.hp)), 0, 1);
  const morale = clamp(finite(camp.morale, 100), 0, 100);
  const brokenDefense = health <= .55 && remaining <= defenderLimit;
  const leaderlessCollapse = !leaderAlive && (morale <= 25 || health <= .35)
    && remaining <= defenderLimit + 2;
  if (!brokenDefense && !leaderlessCollapse) {
    const reason = remaining > defenderLimit
      ? `Η φρουρά αντιστέκεται (${remaining}). Αποδυνάμωσε τη βάση και μείωσε τους υπερασπιστές περίπου στους ${defenderLimit}.`
      : 'Η βάση αντιστέκεται. Μείωσε την αντοχή της στο 55% ή εξουδετέρωσε τον αρχηγό και λύγισε το ηθικό της.';
    return { allowed: false, cost, chance: 0, reason, defenderLimit };
  }
  const powerAdvantage = clamp((Math.max(0, finite(alliedPower)) / Math.max(1, finite(enemyPower)) - 1) / 3, 0, 1);
  const chance = clamp(.23 + (1 - health) * .3 + (1 - morale / 100) * .18
    + (leaderAlive ? 0 : .1) + powerAdvantage * .07, .25, .75);
  return {
    allowed: true, cost, chance, defenderLimit,
    reason: 'Η τοπική φρουρά έχει αποδυναμωθεί. Μπορείς να προτείνεις συμμαχία.'
  };
}
