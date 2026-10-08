import {FACTIONS, REGIONS, UNIT_TYPES} from './feouda-data.js?v=2.6.0';
import {FORT_POLYGONS} from './feouda-engine.js?v=2.6.0';

// Presentation only: an order is the player's intent; activity is what the
// simulation is doing now. Never invent a path, issue an order or predict an ETA.
const REGION_BY_ID = Object.fromEntries(REGIONS.map(region => [region.id, region]));
const ORDER_LABELS = Object.freeze({move:'Πορεία', attackMove:'Πορεία με εμπλοκή', attack:'Επίθεση', capture:'Κατάληψη', hold:'Κράτημα θέσης', retreat:'Υποχώρηση'});
const STATUS_LABELS = Object.freeze({marching:'Σε πορεία', engaging:'Σε μάχη', sieging:'Πολιορκία', capturing:'Κατάληψη', holding:'Κρατά τη θέση', retreating:'Υποχώρηση', blocked:'Εμπόδιο στη διαδρομή', awaiting:'Σε αναμονή', fallen:'Χάθηκε', unknown:'Δεν υπάρχουν στοιχεία'});
const COUNT_LABELS = Object.freeze({marching:'σε πορεία', engaging:'σε μάχη', sieging:'σε πολιορκία', capturing:'στην κατάληψη', holding:'κρατούν θέση', retreating:'σε υποχώρηση', blocked:'με εμπόδιο', awaiting:'σε αναμονή', fallen:'χαμένα', unknown:'χωρίς στοιχεία'});
const finite = value => typeof value === 'number' && Number.isFinite(value);
const own = (object, key) => object && typeof key === 'string' && Object.hasOwn(object, key);
const point = value => value && finite(value.x) && finite(value.z) ? {x:value.x, z:value.z} : null;
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const bounded = (value, maximum = Infinity) => finite(value) ? Math.max(0, Math.min(maximum, value)) : 0;
const allSquads = state => Array.isArray(state?.squads) ? state.squads : [];

// The same diplomatic relationships as the simulation, without changing them.
function hostile(state, a, b) {
  if (!own(FACTIONS, a) || !own(FACTIONS, b) || a === b) return false;
  if (![a, b].some(owner => owner === 'player' || owner === 'neutral')) return false;
  const opponent = a === 'player' ? b : a;
  return !([a, b].includes('player') && ['red', 'gold'].includes(opponent) && state?.ai?.truce?.[opponent] > state?.t);
}

function squadTarget(squad) {
  if (!squad || !finite(squad.hp) || squad.hp <= 0 || !point(squad)) return null;
  const name = own(UNIT_TYPES, squad.type) ? UNIT_TYPES[squad.type].name : 'Απόσπασμα';
  return {kind:'squad', id:squad.id, name:own(FACTIONS, squad.owner) ? `${name} · ${FACTIONS[squad.owner].shortName}` : name, ...point(squad)};
}

function getOrderTarget(state, order) {
  const regionId = order?.regionId || order?.targetId;
  if (own(REGION_BY_ID, regionId) && own(state?.regions, regionId)) {
    const region = REGION_BY_ID[regionId];
    return {kind:'region', id:region.id, name:region.name, x:region.x, z:region.z};
  }
  if (order?.targetId) return squadTarget(allSquads(state).find(squad => squad?.id === order.targetId));
  const destination = point(order);
  return destination ? {kind:'point', id:null, name:order.type === 'hold' ? 'Θέση άμυνας' : 'Σημείο πορείας', ...destination} : null;
}

function copyRoute(squad) {
  const origin = point(squad);
  if (!origin || !Array.isArray(squad.path) || !squad.path.length || squad.path.some(item => !point(item))) return [];
  const route = [origin, ...squad.path.map(point)];
  // A zero-length saved waypoint is not evidence of ongoing movement.
  return route.some((item, index) => index && distance(route[index - 1], item) > .001) ? route : [];
}

function captureReadout(state, squad, target) {
  if (target?.kind !== 'region' || UNIT_TYPES[squad.type]?.role !== 'infantry') return null;
  const region = REGION_BY_ID[target.id], control = state.regions[target.id];
  if (!finite(control.fortHp) || control.fortHp > 0 || !hostile(state, squad.owner, control.owner)) return null;
  // Use the engine's shared fort polygon, including its asymmetric castles.
  const a = FORT_POLYGONS[region.id][2], b = FORT_POLYGONS[region.id][3];
  const dx = b.x - a.x, dz = b.z - a.z, length = Math.hypot(dx, dz), offset = region.kind === 'castle' ? 9 : 6;
  const gate = {x:(a.x + b.x) / 2 + dz / length * offset, z:(a.z + b.z) / 2 - dx / length * offset};
  const nearGate = !!point(squad) && distance(squad, gate) <= 13;
  const frontier = region.neighbors.some(id => state.regions[id]?.owner === squad.owner);
  const contested = allSquads(state).some(other => other?.hp > 0 && point(other) && hostile(state, squad.owner, other.owner) && distance(other, gate) < 22);
  return {eligible:nearGate && frontier, nearGate, frontier, contested, percent:control.captureOwner === squad.owner ? bounded(control.capture, 100) : 0};
}

/**
 * A fresh, detached read model for one squad (or an id in state.squads).
 * status retains the current activity/intent while paused; moving is false.
 * routePoints includes the current location and only actual stored waypoints.
 * remainingDistance is horizontal world metres along that route, never an ETA.
 * target is the current engagement, if any; orderTarget retains the original
 * order, so an attack-move's ground destination survives a temporary battle.
 */
export function getSquadOrderReadout(state, squadOrId) {
  const squad = typeof squadOrId === 'string' ? allSquads(state).find(item => item?.id === squadOrId) : squadOrId;
  const paused = !!(state?.paused || state?.outcome);
  const order = squad?.order && typeof squad.order === 'object' ? squad.order : {};
  const orderType = own(ORDER_LABELS, order.type) ? order.type : null;
  const type = own(UNIT_TYPES, squad?.type) ? squad.type : null;
  const maxHp = bounded(squad?.maxHp), hp = bounded(squad?.hp, maxHp || Infinity);
  const result = {
    id:typeof squad?.id === 'string' ? squad.id : null, type, name:type ? UNIT_TYPES[type].name : 'Απόσπασμα',
    alive:!!type && finite(squad?.hp) && squad.hp > 0, status:'unknown', label:STATUS_LABELS.unknown, detail:'Δεν βρέθηκε διαθέσιμο απόσπασμα.',
    activity:typeof squad?.activity === 'string' ? squad.activity : null,
    orderType, orderLabel:ORDER_LABELS[orderType] || 'Χωρίς εντολή',
    target:null, orderTarget:null, destination:null, routePoints:[], remainingDistance:null,
    paused, moving:false, men:Math.floor(bounded(squad?.men)), hp, maxHp, healthRatio:maxHp ? hp / maxHp : 0, capture:null
  };
  if (!squad || !type || !finite(squad.hp)) return result;
  if (squad.hp <= 0) return {...result, status:'fallen', label:STATUS_LABELS.fallen, detail:'Το απόσπασμα δεν είναι πια διαθέσιμο.', men:0, hp:0, healthRatio:0};

  const orderTarget = getOrderTarget(state, order);
  const engagedSquad = allSquads(state).find(other => other?.id === squad.engagedId && other.hp > 0 && hostile(state, squad.owner, other.owner));
  const engagedTarget = squadTarget(engagedSquad);
  const target = engagedTarget || orderTarget;
  const region = orderTarget?.kind === 'region' ? state.regions[orderTarget.id] : null;
  const hostileFort = region && hostile(state, squad.owner, region.owner);
  const capture = squad.activity === 'capture' ? captureReadout(state, squad, orderTarget) : null;
  const rawRoute = copyRoute(squad);
  const anchor = point(squad.anchor) || point(order);
  const returning = orderType === 'hold' && anchor && point(squad) && distance(squad, anchor) > 5;
  const stationaryActivity = ['blocked', 'attack', 'siege', 'capture', 'guard'].includes(squad.activity);
  const hasRoute = rawRoute.length > 1 && !stationaryActivity &&
    (squad.activity === 'march' || ['move', 'retreat', 'attackMove'].includes(orderType) || returning);
  const routePoints = hasRoute ? rawRoute : [];
  const remainingDistance = hasRoute ? routePoints.slice(1).reduce((sum, item, index) => sum + distance(routePoints[index], item), 0) : null;
  Object.assign(result, {target, orderTarget, capture, routePoints, remainingDistance,
    destination:hasRoute ? {...routePoints.at(-1)} : point(order)});

  let status = 'awaiting', label = STATUS_LABELS.awaiting, detail = '';
  if (squad.activity === 'blocked') {
    status = 'blocked'; label = STATUS_LABELS.blocked;
    detail = 'Η κίνηση σταμάτησε μπροστά σε εμπόδιο. Διάλεξε άλλο σημείο προσέγγισης.';
  } else if (squad.activity === 'attack' && engagedTarget) {
    status = 'engaging'; label = STATUS_LABELS.engaging; detail = `Στόχος: ${engagedTarget.name}.`;
    if (orderType === 'attackMove') detail += ' Έπειτα συνεχίζει την πορεία με εμπλοκή.';
  } else if (squad.activity === 'siege' && hostileFort && region.fortHp > 0) {
    status = 'sieging'; label = STATUS_LABELS.sieging; detail = `Χτυπά την οχύρωση: ${orderTarget.name}.`;
  } else if (capture?.eligible) {
    status = 'capturing'; label = capture.contested ? 'Αμφισβητούμενη κατάληψη' : STATUS_LABELS.capturing;
    detail = capture.contested ? `${orderTarget.name}: η κατάληψη δεν προχωρά όσο υπάρχουν εχθροί κοντά στην πύλη.` : `${orderTarget.name} · ${Math.floor(capture.percent)}% κατάληψης.`;
  } else if (squad.activity === 'capture' && capture && !capture.frontier) {
    label = 'Αναμονή κατάληψης'; detail = `${orderTarget.name}: χρειάζεται γειτονικό φέουδο υπό τον έλεγχό σου.`;
  } else if (hasRoute) {
    status = orderType === 'retreat' ? 'retreating' : 'marching';
    label = status === 'retreating' ? STATUS_LABELS.retreating : engagedTarget ? 'Προσέγγιση εχθρού' : returning ? 'Επιστροφή στη θέση' : orderType === 'attackMove' ? 'Πορεία με εμπλοκή' : STATUS_LABELS.marching;
    detail = engagedTarget ? `Προς: ${engagedTarget.name}.` : returning ? 'Επιστρέφει στη θέση άμυνας.' : target?.kind === 'region' ? `Προς: ${target.name}.` : orderType === 'attackMove' ? 'Προχωρά στο επιλεγμένο σημείο και εμπλέκεται με εχθρούς που συναντά.' : 'Προς το επιλεγμένο σημείο στον χάρτη.';
  } else if (orderType === 'hold' && !returning && !['attack', 'siege', 'capture'].includes(squad.activity)) {
    status = 'holding'; label = STATUS_LABELS.holding;
    detail = squad.stance === 'aggressive' ? 'Φρουρεί τη θέση με επιθετική στάση.' : 'Φρουρεί τη θέση με αμυντική στάση.';
  } else if (squad.activity === 'guard' && hostileFort && region.fortHp <= 0) {
    status = 'holding'; label = 'Προστασία της πύλης'; detail = `${orderTarget.name}: το πεζικό αναλαμβάνει την κατάληψη.`;
  } else if (['attack', 'capture'].includes(orderType) && (!orderTarget || (region && !hostileFort))) {
    label = 'Ο στόχος άλλαξε'; detail = 'Ο προηγούμενος στόχος δεν είναι πια διαθέσιμος για επίθεση.';
  } else if (orderType === 'hold' && returning) {
    label = 'Αναμονή επιστροφής'; detail = 'Χρειάζεται διαδρομή για να επιστρέψει στη θέση άμυνας.';
  } else if (orderType) {
    label = 'Αναμονή πορείας'; detail = 'Η εντολή παραμένει ενεργή. Δεν υπάρχει αυτή τη στιγμή διαδρομή για εμφάνιση.';
  } else {
    detail = 'Επίλεξε πορεία, επίθεση ή θέση άμυνας.';
  }
  if (paused) detail = `${state?.outcome ? 'Η εκστρατεία ολοκληρώθηκε.' : 'Σε παύση.'} ${detail}`;
  return {...result, status, label, detail, moving:hasRoute && !paused};
}

/** Selected, living player squads only. Stale, duplicate and enemy ids are
 * ignored. Mixed activities stay mixed instead of calling the whole army idle. */
export function getArmyOrderSummary(state, ids) {
  const selected = new Set(Array.isArray(ids) ? ids.filter(id => typeof id === 'string') : []);
  const seen = new Set();
  const entries = allSquads(state).filter(squad => {
    if (!squad || seen.has(squad.id) || !selected.has(squad.id) || squad.owner !== 'player' || !finite(squad.hp) || squad.hp <= 0 || !own(UNIT_TYPES, squad.type)) return false;
    seen.add(squad.id); return true;
  }).map(squad => getSquadOrderReadout(state, squad));
  const counts = Object.fromEntries(Object.keys(STATUS_LABELS).map(status => [status, 0]));
  for (const entry of entries) counts[entry.status]++;
  const men = entries.reduce((sum, entry) => sum + entry.men, 0), hp = entries.reduce((sum, entry) => sum + entry.hp, 0), maxHp = entries.reduce((sum, entry) => sum + entry.maxHp, 0);
  const statuses = Object.keys(counts).filter(status => counts[status]);
  const status = !entries.length ? 'empty' : statuses.length === 1 ? statuses[0] : 'mixed';
  const label = status === 'empty' ? 'Επίλεξε στρατό' : status === 'mixed' ? 'Διαφορετικές ενέργειες' : entries.length === 1 ? entries[0].label : STATUS_LABELS[status];
  const firstTarget = entries[0]?.target;
  const commonTarget = firstTarget && entries.every(entry => entry.target && entry.target.kind === firstTarget.kind && entry.target.id === firstTarget.id &&
    (firstTarget.kind !== 'point' || (entry.target.x === firstTarget.x && entry.target.z === firstTarget.z))) ? {...firstTarget} : null;
  const detail = !entries.length ? 'Πάτησε ένα δικό σου απόσπασμα ή επίλεξε ομάδα στον χάρτη.' : entries.length === 1 ? entries[0].detail : statuses.map(key => `${counts[key]} ${COUNT_LABELS[key]}`).join(' · ');
  return {count:entries.length, men, hp, maxHp, healthRatio:maxHp ? hp / maxHp : 0, entries, counts, status, label, detail, commonTarget, paused:!!(state?.paused || state?.outcome)};
}
