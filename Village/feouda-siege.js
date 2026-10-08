import {FACTIONS, REGIONS, UNIT_TYPES} from './feouda-data.js?v=2.7.0';
import {FORT_POLYGONS} from './feouda-engine.js?v=2.7.0';

// Read-only presentation of the existing fortress rules. Inspection never
// computes a route, chooses an order, spends resources or advances simulation.
const REGION_BY_ID = Object.fromEntries(REGIONS.map(region => [region.id, region]));
const finite = value => typeof value === 'number' && Number.isFinite(value);
const point = value => value && finite(value.x) && finite(value.z);
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const bounded = (value, max = Infinity) => finite(value) ? Math.max(0, Math.min(max, value)) : 0;
const group = units => ({ids:units.map(unit => unit.id), count:units.length, men:units.reduce((sum, unit) => sum + Math.floor(bounded(unit.men)), 0)});
const has = (object, key) => typeof key === 'string' && object && Object.hasOwn(object, key);
const orderRegion = unit => unit.order?.regionId || unit.order?.targetId;
const assaultOrder = (unit, regionId) => ['attack', 'capture'].includes(unit.order?.type) && orderRegion(unit) === regionId;
const infantry = unit => UNIT_TYPES[unit.type]?.role === 'infantry';
const siege = unit => UNIT_TYPES[unit.type]?.role === 'siege';
const directions = ['βόρεια', 'βορειοανατολικά', 'ανατολικά', 'νοτιοανατολικά', 'νότια', 'νοτιοδυτικά', 'δυτικά', 'βορειοδυτικά'];

function hostile(state, a, b) {
  if (!has(FACTIONS, a) || !has(FACTIONS, b) || a === b) return false;
  if (![a, b].some(owner => owner === 'player' || owner === 'neutral')) return false;
  const opponent = a === 'player' ? b : a;
  return !([a, b].includes('player') && ['red', 'gold'].includes(opponent) && state?.ai?.truce?.[opponent] > state?.t);
}

function gatePoint(region) {
  const a = FORT_POLYGONS[region.id][2], b = FORT_POLYGONS[region.id][3];
  const dx = b.x - a.x, dz = b.z - a.z, length = Math.hypot(dx, dz), offset = region.kind === 'castle' ? 9 : 6;
  return {x:(a.x + b.x) / 2 + dz / length * offset, z:(a.z + b.z) / 2 - dx / length * offset};
}

function describeUnit(unit, region, gate, state) {
  const d = distance(unit, region), gateDistance = distance(unit, gate), targetingFort = assaultOrder(unit, region.id);
  const angle = Math.atan2(unit.x - region.x, -(unit.z - region.z));
  const direction = d < 1 ? 'στη θέση του οχυρού' : directions[(Math.round(angle / (Math.PI / 4)) + 8) % 8];
  const eligible = state.regions[region.id].fortHp <= 0 && infantry(unit) && gateDistance <= 13 && targetingFort &&
    region.neighbors.some(id => state.regions[id]?.owner === unit.owner) && hostile(state, unit.owner, state.regions[region.id].owner);
  const status = eligible ? 'gate' : targetingFort && unit.activity === 'siege' && state.regions[region.id].fortHp > 0 ? 'sieging' :
    targetingFort && unit.activity === 'march' ? 'approaching' : targetingFort ? 'ordered' : 'nearby';
  const labels = {gate:'Πεζικό στην πύλη', sieging:'Χτυπά το οχυρό', approaching:'Προχωρά προς το οχυρό', ordered:'Έχει εντολή επίθεσης', nearby:'Κοντά στο οχυρό'};
  return {id:unit.id, type:unit.type, name:UNIT_TYPES[unit.type].name, owner:unit.owner, men:Math.floor(bounded(unit.men)),
    x:unit.x, z:unit.z, distance:d, gateDistance, direction, atGate:gateDistance < 22,
    targetingFort, siege:siege(unit), captureEligible:eligible, status, label:labels[status]};
}

/**
 * Exact capture eligibility follows updateFortresses: 0 fort HP, a neighbouring
 * fief, spear/sword squads within 13 m with attack/capture orders for this fort.
 * Any living hostile squad strictly within 22 m contests the gate. Mere infantry
 * presence, an open physical gate, siege crews and archers cannot earn capture.
 * Distances are current straight-line observations, never route lengths or ETAs.
 */
export function getSiegeReadout(state, regionId, {selectedIds = []} = {}) {
  if (!has(REGION_BY_ID, regionId) || !has(state?.regions, regionId)) return null;
  const region = REGION_BY_ID[regionId], control = state.regions[regionId];
  if (!control || !has(FACTIONS, control.owner) || !finite(control.fortHp) || !finite(control.maxFortHp) || control.maxFortHp <= 0) return null;
  const gate = gatePoint(region), paused = !!(state.paused || state.outcome), owned = control.owner === 'player';
  const seen = new Set(), units = (Array.isArray(state.squads) ? state.squads : []).filter(unit => {
    if (!unit || typeof unit.id !== 'string' || seen.has(unit.id) || !has(UNIT_TYPES, unit.type) || !has(FACTIONS, unit.owner) || !finite(unit.hp) || unit.hp <= 0 || !point(unit)) return false;
    seen.add(unit.id); return true;
  });
  const playerUnits = units.filter(unit => unit.owner === 'player');
  const selectedSet = new Set(Array.isArray(selectedIds) ? selectedIds : []), selected = playerUnits.filter(unit => selectedSet.has(unit.id));
  const foot = playerUnits.filter(infantry), machines = playerUnits.filter(siege), combat = playerUnits.filter(unit => !siege(unit));
  const ownNeighbors = region.neighbors.filter(id => state.regions[id]?.owner === 'player');
  const connected = ownNeighbors.length > 0, activeHostility = hostile(state, 'player', control.owner);
  const truce = !owned && ['red', 'gold'].includes(control.owner) && state.ai?.truce?.[control.owner] > state.t;
  const maxHp = bounded(control.maxFortHp), hp = bounded(control.fortHp, maxHp || Infinity), breached = hp <= 0;
  const nearInfantry = foot.filter(unit => distance(unit, gate) <= 13);
  const orderedInfantry = foot.filter(unit => assaultOrder(unit, regionId));
  const readyInfantry = nearInfantry.filter(unit => assaultOrder(unit, regionId));
  const eligibleInfantry = !owned && breached && connected && activeHostility ? readyInfantry : [];
  const candidateCounts = {};
  if (breached) for (const unit of units) {
    if (!infantry(unit) || distance(unit, gate) > 13 || !assaultOrder(unit, regionId) || !hostile(state, unit.owner, control.owner) ||
      !region.neighbors.some(id => state.regions[id]?.owner === unit.owner)) continue;
    candidateCounts[unit.owner] = (candidateCounts[unit.owner] || 0) + Math.floor(bounded(unit.men));
  }
  // Stable insertion order also matches the engine when factions have equal
  // strength. A truce can allow two non-hostile armies to contest a third fort.
  const candidates = Object.entries(candidateCounts).sort((a, b) => b[1] - a[1]).map(([owner, men]) => ({owner, name:FACTIONS[owner].shortName, men}));
  const candidate = candidates[0] || null;
  const candidateContested = !!candidate && units.some(unit => hostile(state, candidate.owner, unit.owner) && distance(unit, gate) < 22);
  const gateEnemies = units.filter(unit => hostile(state, 'player', unit.owner) && distance(unit, gate) < 22)
    .map(unit => describeUnit(unit, region, gate, state)).sort((a, b) => a.gateDistance - b.gateDistance);
  const contested = gateEnemies.length > 0;
  const percent = control.captureOwner === 'player' ? bounded(control.capture, 100) : 0;
  const captor = has(FACTIONS, control.captureOwner) ? control.captureOwner : null;
  let reasonCode = 'ready', reason = 'Το πεζικό κρατά την πύλη. Η κατάληψη προχωρά όσο δεν πλησιάζουν εχθροί.';
  if (owned) {reasonCode = 'owned'; reason = 'Το οχυρό είναι ήδη δικό σου.';}
  else if (!breached) {reasonCode = 'fortified'; reason = 'Η κατάληψη ξεκινά μόνο όταν η αντοχή του οχυρού φτάσει στο 0. Χτύπα τα τείχη με τις μηχανές.';}
  else if (!connected) {reasonCode = 'frontier'; reason = 'Δεν συνορεύεις με αυτό το φέουδο. Κατάλαβε πρώτα μία γειτονική περιοχή.';}
  else if (truce) {reasonCode = 'truce'; reason = 'Υπάρχει ανακωχή με αυτόν τον οίκο. Μία δική σου εντολή επίθεσης ή κατάληψης θα την ακυρώσει.';}
  else if (!foot.length) {reasonCode = 'infantry'; reason = 'Δεν έχεις δορυφόρους ή ξιφομάχους. Μόνο αυτά τα αποσπάσματα μπορούν να καταλάβουν το οχυρό.';}
  else if (contested) {reasonCode = 'contested'; reason = `${gateEnemies.length} εχθρικά αποσπάσματα βρίσκονται στην πύλη. Απομάκρυνέ τα για να προχωρήσει η κατάληψη.`;}
  else if (!readyInfantry.length && nearInfantry.length) {reasonCode = 'order'; reason = 'Το πεζικό είναι κοντά στην πύλη, αλλά δεν έχει εντολή για αυτό το οχυρό. Πάτησε «Στείλε πεζικό για κατάληψη».';}
  else if (!readyInfantry.length) {reasonCode = 'arrival'; reason = orderedInfantry.length ? 'Το πεζικό έχει εντολή για το οχυρό. Πρέπει να φτάσει και να κρατήσει την πύλη.' : 'Επίλεξε δορυφόρους ή ξιφομάχους και στείλε τους στην πύλη για κατάληψη.';}
  else if (candidate && candidate.owner !== 'player') {reasonCode = 'competition'; reason = `${candidate.name}: ${candidate.men} πεζοί διεκδικούν την πύλη. Ενίσχυσε το δικό σου πεζικό για να επικρατήσει στην κατάληψη.`;}
  else if (paused) {reasonCode = state.outcome ? 'finished' : 'paused'; reason = state.outcome ? 'Η εκστρατεία ολοκληρώθηκε.' : 'Το πεζικό είναι στη θέση του. Η κατάληψη θα προχωρήσει όταν συνεχίσεις τον χρόνο.';}
  const advancing = !owned && candidate?.owner === 'player' && !candidateContested && !paused;
  const stage = owned ? 'defend' : !breached ? 'breach' : contested ? 'secure' : 'capture';
  const threats = units.filter(unit => hostile(state, 'player', unit.owner) &&
    (distance(unit, region) <= 80 || assaultOrder(unit, regionId)))
    .map(unit => describeUnit(unit, region, gate, state)).sort((a, b) => Number(b.captureEligible) - Number(a.captureEligible) || Number(b.atGate) - Number(a.atGate) || a.distance - b.distance);
  const defenders = combat.filter(unit => distance(unit, region) <= 80 || (unit.order?.type === 'hold' && orderRegion(unit) === regionId));
  const defenceCapturers = threats.filter(unit => unit.captureEligible);
  const defenceProgress = owned && captor && captor !== 'player' ? bounded(control.capture, 100) : 0;
  const defenceCandidate = owned ? candidate?.owner || null : null;
  const defenceContested = owned && candidateContested;
  const connections = region.neighbors.map(id => ({id, name:REGION_BY_ID[id].name, owned:state.regions[id]?.owner === 'player',
    reachableFrontier:REGION_BY_ID[id].neighbors.some(neighbor => state.regions[neighbor]?.owner === 'player')}));
  return {
    regionId, name:region.name, owner:control.owner, ownerName:FACTIONS[control.owner].shortName, owned, paused, truce,
    gate, fort:{hp, maxHp, percent:maxHp ? hp / maxHp * 100 : 0, breached}, frontier:{connected, ownNeighborIds:ownNeighbors, neighbors:connections}, stage,
    forces:{infantry:group(foot), siege:group(machines), combat:group(combat), nearGate:group(nearInfantry), orderedInfantry:group(orderedInfantry),
      eligibleInfantry:group(eligibleInfantry), selected:group(selected), selectedInfantry:group(selected.filter(infantry)), selectedSiege:group(selected.filter(siege)), selectedCombat:group(selected.filter(unit => !siege(unit)))},
    capture:{percent, owner:captor, ownerName:captor ? FACTIONS[captor].shortName : null, storedPercent:bounded(control.capture, 100), candidates,
      candidateOwner:candidate?.owner || null, candidateMen:candidate?.men || 0,
      contested, gateEnemies, readyInfantry:group(readyInfantry), advancing, reasonCode, reason},
    defence:{radius:80, threats, count:threats.length, nearbyCount:threats.filter(unit => unit.distance <= 80).length,
      approachingCount:threats.filter(unit => unit.status === 'approaching').length, atGateCount:threats.filter(unit => unit.atGate).length,
      siegeCount:threats.filter(unit => unit.siege).length, men:threats.reduce((sum, unit) => sum + unit.men, 0),
      defenders:group(defenders), capturers:group(defenceCapturers), captureCandidate:defenceCandidate, capturePercent:defenceProgress, contested:defenceContested,
      reason:!owned ? '' : defenceCapturers.length ? (defenceContested ? 'Εχθρικό πεζικό βρίσκεται στην πύλη. Η πύλη παραμένει αμφισβητούμενη και η κατάληψη δεν προχωρά.' : 'Εχθρικό πεζικό κρατά την πύλη. Στείλε ενισχύσεις για να σταματήσεις την κατάληψη.') :
        !threats.length ? 'Δεν υπάρχουν εχθροί σε ακτίνα 80 μ. ή με εντολή επίθεσης σε αυτό το οχυρό.' :
        !breached ? 'Τα τείχη αντέχουν. Φύλαξε την πύλη και αντιμετώπισε τις μηχανές που πλησιάζουν.' : 'Τα τείχη έχουν πέσει. Κράτησε στρατό κοντά στην πύλη για να εμποδίσεις εχθρική κατάληψη.'}
  };
}
