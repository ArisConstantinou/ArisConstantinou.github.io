import {REGIONS, UNIT_TYPES, BUILDINGS, TECHS, RESOURCE_NAMES} from './feouda-data.js?v=2.7.0';

// Presentation only. These functions return navigation, never command permission.
// The engine's canCommand()/command() remains authoritative for every action.
const REGION_BY_ID = Object.fromEntries(REGIONS.map(region => [region.id, region]));
const TRAINING_QUEUE_LIMIT = 4;
const BUILD_WORKER_RESERVE = 4;
const number = value => Number.isFinite(value) ? value : 0;
const amount = value => {
  const positive = Math.max(0, number(value));
  if (positive > 0 && positive < .01) return '<0,01';
  return positive.toLocaleString('el-CY', {maximumFractionDigits: 2});
};
const owned = state => REGIONS.filter(region => state.regions?.[region.id]?.owner === 'player');
const isOwned = (state, regionId) => !!REGION_BY_ID[regionId] && state.regions?.[regionId]?.owner === 'player';
const jobs = state => (state.jobs || []).filter(job => isOwned(state, job.regionId));
const aliveArmy = state => (state.squads || []).filter(unit => unit.owner === 'player' && unit.hp > 0);
const nameOf = regionId => REGION_BY_ID[regionId]?.name || 'το φέουδο';
const hasBuilding = (state, regionId, type) => isOwned(state, regionId) && number(state.regions[regionId].buildings?.[type]) > 0;
const pendingBuild = (state, type, regionId) => jobs(state).find(job => job.kind === 'build' && job.type === type && (!regionId || job.regionId === regionId));
const pendingResearch = (state, type) => jobs(state).find(job => job.kind === 'research' && job.type === type);
const usableNodes = (state, type) => (state.nodes || []).filter(node => isOwned(state, node.regionId) && node.amount > 0 && (!type || node.type === type));
const seconds = value => `${Math.ceil(Math.max(0, number(value)))} δευτ.`;
const navigation = (kind, fields = {}) => ({kind, ...fields});
const suggestion = (text, action, label) => ({text, action, label});

function buildingDestination(state, type, preferred = 'home') {
  if (!BUILDINGS[type]) return null;
  const regions = owned(state);
  const candidates = [...regions.filter(region => region.id === preferred), ...regions.filter(region => region.id !== preferred)];
  return candidates.find(region => number(state.regions[region.id].buildings?.[type]) < BUILDINGS[type].max && !pendingBuild(state, type, region.id)) || null;
}

function frontierDestination(state) {
  return REGIONS.filter(region => state.regions?.[region.id] && !isOwned(state, region.id) && region.neighbors.some(id => isOwned(state, id)))
    .sort((a, b) => {
      const rank = region => (number(state.regions[region.id].fortHp) <= 0 ? 0 : 2) + (state.regions[region.id].owner === 'neutral' ? 0 : 1);
      return rank(a) - rank(b) || number(state.regions[a.id].fortHp) - number(state.regions[b.id].fortHp);
    })[0] || null;
}

function foodGuidance(state) {
  const balance = number(state.foodBalance) * 60;
  const text = balance < 0
    ? `Τα τρόφιμα μειώνονται κατά ${amount(-balance)} / λεπτό. Απόθεμα: ${amount(state.resources?.food)}. Ενίσχυσε τη συγκομιδή ή αγόρασε τρόφιμα.`
    : `Απόθεμα τροφίμων: ${amount(state.resources?.food)}. Χρειάζονται πάνω από 70 για επαρκή σίτιση· η τωρινή μεταβολή είναι +${amount(balance)} / λεπτό.`;
  return usableNodes(state, 'food').length
    ? suggestion(text, navigation('resource', {type: 'food'}), 'Δες τη συγκομιδή τροφίμων')
    : suggestion(text + ' Δεν υπάρχει διαθέσιμη πηγή τροφίμων στα εδάφη σου.', navigation('resource', {type: 'money'}), 'Άνοιξε το εμπόριο');
}

function housingGuidance(state) {
  const waiting = pendingBuild(state, 'houses');
  if (waiting) return suggestion(`Στέγη: ${amount(state.population)} / ${amount(state.housing)}. Οι Κατοικίες στο ${nameOf(waiting.regionId)} ${waiting.blocked ? 'περιμένουν να συνεχιστεί το έργο' : `ολοκληρώνονται σε ${seconds(waiting.remaining)}`}.`, navigation('build', {type: 'houses', regionId: waiting.regionId}), 'Δες τις Κατοικίες σε κατασκευή');
  const region = buildingDestination(state, 'houses');
  if (region) return suggestion(`Στέγη: ${amount(state.population)} / ${amount(state.housing)}. Μια ολοκληρωμένη βαθμίδα Κατοικιών προσθέτει 12 θέσεις· ο πληθυσμός αυξάνεται σταδιακά.`, navigation('build', {type: 'houses', regionId: region.id}), 'Δες τις Κατοικίες');
  return suggestion('Οι Κατοικίες έφτασαν στο όριο των σημερινών φέουδων. Εξέτασε την επέκταση για περισσότερο χώρο οικισμών.', navigation('missions'), 'Δες την επέκταση της ηγεμονίας');
}

function prosperityGuidance(state) {
  const current = `Ευημερία ${amount(state.prosperity)} / 65. `;
  if (number(state.resources?.food) <= 70 || number(state.foodBalance) < 0) {
    const advice = foodGuidance(state);
    return {...advice, text: current + advice.text};
  }
  if (number(state.resources?.money) <= 0) return suggestion(current + 'Το ταμείο άδειασε. Πούλησε πλεόνασμα πόρων για να πληρωθεί η φρουρά.', navigation('resource', {type: 'money'}), 'Άνοιξε το εμπόριο');
  if (number(state.population) >= number(state.housing)) {
    const advice = housingGuidance(state);
    return {...advice, text: current + advice.text};
  }
  const civic = ['well', 'granary', 'houses', 'market', 'infirmary'];
  const waiting = jobs(state).find(job => job.kind === 'build' && civic.includes(job.type));
  if (waiting) return suggestion(current + `${BUILDINGS[waiting.type].name} στο ${nameOf(waiting.regionId)}: ${waiting.blocked ? 'η εργασία περιμένει' : seconds(waiting.remaining)}. Η ευημερία μεταβάλλεται σταδιακά όσο διατηρείς τροφή και πληρωμές.`, navigation('build', {type: waiting.type, regionId: waiting.regionId}), 'Δες το έργο φροντίδας');
  for (const type of civic) {
    const region = buildingDestination(state, type);
    if (region) return suggestion(current + 'Νερό, αποθήκες, στέγη και επαρκής τροφή στηρίζουν τους κατοίκους. Η βελτίωση χρειάζεται χρόνο προσομοίωσης.', navigation('build', {type, regionId: region.id}), `Δες: ${BUILDINGS[type].name}`);
  }
  return suggestion(current + 'Συντήρησε τρόφιμα και πληρωμές. Η ευημερία πλησιάζει σταδιακά την κατάσταση που υποστηρίζουν οι οικισμοί σου.', navigation('workers'), 'Έλεγξε τροφή και συντήρηση');
}

/** Explanatory checklist; a met row never authorizes training. */
export function getTrainingRequirements(state, type, regionId) {
  const unit = UNIT_TYPES[type];
  if (!unit) return [];
  const ours = owned(state), local = isOwned(state, regionId), rows = [];
  if (!local) rows.push({id: 'region', label: 'Δικό σου φέουδο', met: false, detail: 'Η εκπαίδευση γίνεται μόνο σε περιοχή που ελέγχεις.', ...(ours.length ? {action: navigation('army', {tab: 'train', regionId: ours[0].id}), actionLabel: `Εκπαίδευση: ${ours[0].name}`} : {action: navigation('missions'), actionLabel: 'Δες την εκστρατεία'})});

  const present = hasBuilding(state, regionId, unit.requires);
  const buildingJob = local && pendingBuild(state, unit.requires, regionId);
  const alternative = ours.find(region => region.id !== regionId && hasBuilding(state, region.id, unit.requires));
  const building = {id: 'building', label: BUILDINGS[unit.requires].name, met: present, detail: present ? `Διαθέσιμο στο ${nameOf(regionId)}.` : buildingJob ? `Κατασκευάζεται στο ${nameOf(regionId)} · ${buildingJob.blocked ? 'σε αναμονή' : seconds(buildingJob.remaining)}. Δεν έχει ολοκληρωθεί ακόμη.` : local ? `Χρειάζεται στο ${nameOf(regionId)}.` : 'Πρώτα επίλεξε δικό σου φέουδο.'};
  if (!present) {
    if (buildingJob) Object.assign(building, {action: navigation('build', {type: unit.requires, regionId}), actionLabel: 'Δες το έργο σε εξέλιξη'});
    else if (alternative) Object.assign(building, {action: navigation('army', {tab: 'train', regionId: alternative.id}), actionLabel: `Διαθέσιμο στο ${alternative.name}`});
    else if (local) Object.assign(building, {action: navigation('build', {type: unit.requires, regionId}), actionLabel: `Δες: ${BUILDINGS[unit.requires].name}`});
  }
  rows.push(building);

  if (unit.tech) {
    const complete = number(state.techs?.[unit.tech]) > 0, pending = pendingResearch(state, unit.tech);
    rows.push({id: 'technology', label: TECHS[unit.tech].name, met: complete, detail: complete ? 'Η έρευνα ολοκληρώθηκε.' : pending ? `Έρευνα σε εξέλιξη · ${pending.blocked ? 'σε αναμονή' : seconds(pending.remaining)}.` : 'Χρειάζεται ολοκληρωμένη έρευνα.', ...(!complete ? {action: navigation('research', {type: unit.tech}), actionLabel: pending ? 'Δες την έρευνα σε εξέλιξη' : 'Δες την απαιτούμενη έρευνα'} : {})});
  }

  const free = Math.max(0, number(state.armyCapacity) - number(state.armyUsed));
  const capacity = {id: 'capacity', label: 'Θέσεις στρατού', met: free >= unit.men, detail: `${amount(free)} ελεύθερες · χρειάζονται ${unit.men}. Οι εκπαιδεύσεις δεσμεύουν θέσεις από την ανάθεση.`};
  if (!capacity.met) {
    const pending = pendingBuild(state, 'barracks') || pendingResearch(state, 'logistics');
    const buildAt = buildingDestination(state, 'barracks', regionId);
    if (pending?.kind === 'build') Object.assign(capacity, {action: navigation('build', {type: 'barracks', regionId: pending.regionId}), actionLabel: 'Δες τον νέο στρατώνα'});
    else if (pending?.kind === 'research' || number(state.techs?.logistics) < TECHS.logistics.max) Object.assign(capacity, {action: navigation('research', {type: 'logistics'}), actionLabel: 'Δες τους Δρόμους εφοδιασμού'});
    else if (buildAt) Object.assign(capacity, {action: navigation('build', {type: 'barracks', regionId: buildAt.id}), actionLabel: 'Δες επιπλέον στρατώνα'});
    else Object.assign(capacity, {action: navigation('missions'), actionLabel: 'Δες την επέκταση'});
  }
  rows.push(capacity);

  const localQueue = jobs(state).filter(job => job.kind === 'train' && job.regionId === regionId);
  const sameFacility = localQueue.filter(job => UNIT_TYPES[job.type]?.requires === unit.requires);
  rows.push({id: 'queue', label: 'Ουρά εκπαίδευσης', met: local && localQueue.length < TRAINING_QUEUE_LIMIT, detail: !local ? 'Χρειάζεται επιλογή δικού σου φέουδου.' : `${localQueue.length} / ${TRAINING_QUEUE_LIMIT} αναθέσεις στο φέουδο. ${sameFacility.length ? `${sameFacility.length} στο ίδιο κτίριο· το νέο απόσπασμα θα περιμένει τη σειρά του.` : 'Καμία προηγούμενη εκπαίδευση στο ίδιο κτίριο.'}`, ...(local ? {action: navigation('army', {tab: 'train', regionId}), actionLabel: 'Δες τις εκπαιδεύσεις'} : {})});

  for (const [resource, cost] of Object.entries(unit.cost)) {
    const available = Math.max(0, number(state.resources?.[resource])), missing = Math.max(0, cost - available);
    rows.push({id: `resource-${resource}`, label: RESOURCE_NAMES[resource], met: missing <= 1e-7, detail: missing > 1e-7 ? `Λείπουν ${resource === 'money' ? 'CY£ ' : ''}${amount(missing)} · χρειάζονται ${cost}, διαθέσιμα ${amount(available)}.` : `Καλύπτεται το κόστος ${resource === 'money' ? 'CY£ ' : ''}${cost}.`, ...(missing > 1e-7 ? {action: navigation('resource', {type: resource}), actionLabel: resource === 'money' ? 'Δες το εμπόριο' : `Δες: ${RESOURCE_NAMES[resource]}`} : {})});
  }
  return rows;
}

/** Mission-specific next navigation, based on current ownership and progress. */
export function getMissionGuidance(state, mission) {
  if (!mission || mission.done) return null;
  const ours = owned(state);
  if (!['supply', 'settlement', 'recruits', 'frontier', 'engineering', 'prosperity', 'unite'].includes(mission.id)) return null;
  if (!ours.length) return suggestion('Δεν ελέγχεις φέουδο για νέες εργασίες. Δες την κατάσταση της εκστρατείας.', navigation('missions'), 'Δες την εκστρατεία');
  if (mission.id === 'supply') {
    if (number(state.foodBalance) < 0 || number(state.resources?.food) <= 70) return foodGuidance(state);
    const node = usableNodes(state, 'wood')[0] || usableNodes(state)[0];
    if (node) return suggestion('Ανάθεσε εργάτες σε πηγές με υπόλοιπο. Η αποστολή μετρά τους πόρους που συλλέγουν οι εργάτες σου, όχι αγορές στο εμπόριο.', navigation('resource', {type: node.type}), 'Δες τις αναθέσεις συλλογής');
    const region = frontierDestination(state);
    return suggestion('Οι διαθέσιμες πηγές σου εξαντλήθηκαν. Επιθεώρησε γειτονική μεθόριο για πρόσβαση σε νέους πόρους.', region ? navigation('region', {regionId: region.id}) : navigation('missions'), region ? `Επιθεώρησε: ${region.name}` : 'Δες την εκστρατεία');
  }
  if (mission.id === 'settlement') {
    const pending = jobs(state).find(job => job.kind === 'build' && job.type !== 'repair' && BUILDINGS[job.type]);
    if (pending) return suggestion(`Το ${BUILDINGS[pending.type].name} στο ${nameOf(pending.regionId)} μετρά όταν ολοκληρωθεί. ${pending.blocked ? 'Η εργασία περιμένει να ελευθερωθεί ο χώρος.' : `Απομένουν ${seconds(pending.remaining)}.`}`, navigation('build', {type: pending.type, regionId: pending.regionId}), 'Δες το έργο που εκτελείται');
    for (const type of ['houses', 'well', 'granary', 'farm']) {
      const region = buildingDestination(state, type);
      if (region) return suggestion('Ολοκλήρωσε έργα οικισμού. Διάλεξε κτίριο, όρισε θέση στον χάρτη και επιβεβαίωσε· η προεπισκόπηση δεν χρεώνει.', navigation('build', {type, regionId: region.id}), `Δες: ${BUILDINGS[type].name}`);
    }
    return suggestion('Οι βασικές εγκαταστάσεις έφτασαν στα όριά τους. Εξέτασε τα φέουδα και τα υπόλοιπα έργα.', navigation('region', {regionId: ours[0].id}), 'Δες το φέουδο');
  }
  if (mission.id === 'recruits') {
    const pending = jobs(state).find(job => job.kind === 'train');
    if (pending) return suggestion(`Η αποστολή μετρά ολοκληρωμένα αποσπάσματα. ${UNIT_TYPES[pending.type]?.name || 'Το απόσπασμα'}: ${pending.waiting ? 'περιμένει τη σειρά του' : `απομένουν ${seconds(pending.remaining)}`}.`, navigation('army', {tab: 'train', regionId: pending.regionId}), 'Δες τις εκπαιδεύσεις');
    const region = ours.find(item => hasBuilding(state, item.id, 'barracks'));
    if (region) return suggestion('Εκπαίδευσε νέα αποσπάσματα από τον στρατώνα. Η αποστολή προχωρά όταν οι ενισχύσεις εμφανιστούν στο πεδίο.', navigation('army', {tab: 'train', regionId: region.id}), `Εκπαίδευση: ${region.name}`);
    const pendingSite = pendingBuild(state, 'barracks'), site = pendingSite ? REGION_BY_ID[pendingSite.regionId] : buildingDestination(state, 'barracks');
    return site ? suggestion(pendingSite ? 'Ο στρατώνας κατασκευάζεται. Η εκπαίδευση ανοίγει όταν ολοκληρωθεί.' : 'Χρειάζεσαι στρατώνα σε δικό σου φέουδο για να εκπαιδεύσεις πεζικό.', navigation('build', {type: 'barracks', regionId: site.id}), 'Δες τον στρατώνα') : suggestion('Επίλεξε δικό σου φέουδο και έλεγξε τις στρατιωτικές εγκαταστάσεις.', navigation('army', {tab: 'train', regionId: ours[0].id}), 'Δες τη στρατολόγηση');
  }
  if (mission.id === 'frontier') {
    const region = frontierDestination(state);
    if (!region) return suggestion('Δεν υπάρχει πλέον γειτονικό ξένο φέουδο. Δες την κυριαρχία και τους υπόλοιπους στόχους.', navigation('missions'), 'Δες τους στόχους');
    if (!aliveArmy(state).some(unit => UNIT_TYPES[unit.type]?.role === 'infantry')) return suggestion('Η κατάληψη απαιτεί πεζικό μετά τη διάρρηξη της οχύρωσης. Δεν διαθέτεις ζωντανό απόσπασμα πεζικού· προετοίμασε ενισχύσεις.', navigation('army', {tab: 'train', regionId: (ours.find(item => hasBuilding(state, item.id, 'barracks')) || ours[0]).id}), 'Δες την εκπαίδευση πεζικού');
    const breached = number(state.regions[region.id].fortHp) <= 0;
    return suggestion(`${region.name}: γειτονεύει με δικό σου φέουδο. ${breached ? 'Η οχύρωση έχει διαρραγεί· χρειάζεται πεζικό στην πύλη και αντιμετώπιση της φρουράς.' : 'Επιθεώρησε τη φρουρά. Οι μηχανές διαρρηγνύουν την οχύρωση και το πεζικό κρατά την πύλη.'}`, navigation('region', {regionId: region.id}), `Επιθεώρησε: ${region.name}`);
  }
  if (mission.id === 'engineering') {
    const pending = pendingResearch(state, 'engineering');
    return suggestion(number(state.techs?.engineering) > 0 ? 'Η Μηχανική αντιβάρου ολοκληρώθηκε. Για τρεμπουσέ χρειάζεται και μηχανουργείο πολιορκίας.' : pending ? `Η Μηχανική αντιβάρου ερευνάται · ${pending.blocked ? 'σε αναμονή' : seconds(pending.remaining)}. Η αποστολή προχωρά στην ολοκλήρωση.` : 'Μελέτησε τη Μηχανική αντιβάρου για να ξεκλειδώσεις τρεμπουσέ. Έλεγξε κόστος και χρόνο πριν αναθέσεις την έρευνα.', navigation('research', {type: 'engineering'}), pending ? 'Δες την έρευνα σε εξέλιξη' : 'Δες τη Μηχανική αντιβάρου');
  }
  if (mission.id === 'prosperity') return prosperityGuidance(state);
  if (mission.id === 'unite') {
    if (ours.length === REGIONS.length && number(state.prosperity) < 65) {
      const advice = prosperityGuidance(state);
      return {...advice, text: `Ελέγχεις ${ours.length} / ${REGIONS.length} φέουδα, αλλά απομένει ο όρος ευημερίας. ` + advice.text};
    }
    if (ours.length === REGIONS.length) return suggestion(`Ελέγχεις και τα ${REGIONS.length} φέουδα και η ευημερία είναι ${amount(state.prosperity)} / 65. Και οι δύο όροι της νίκης καλύπτονται.`, navigation('missions'), 'Δες την ολοκλήρωση της εκστρατείας');
    const region = frontierDestination(state);
    return suggestion(`Κυριαρχία ${ours.length} / ${REGIONS.length} · ευημερία ${amount(state.prosperity)} / 65. Χρειάζονται και οι δύο όροι. Επιθεώρησε την επόμενη γειτονική περιοχή πριν αποφασίσεις επίθεση.`, region ? navigation('region', {regionId: region.id}) : navigation('missions'), region ? `Επιθεώρησε: ${region.name}` : 'Δες την εκστρατεία');
  }
  return null;
}

/** One current priority; no automatic assignment, construction, or military order. */
export function getCampaignAdvice(state) {
  const ours = owned(state);
  if (state.outcome === 'victory' || (ours.length === REGIONS.length && number(state.prosperity) >= 65)) return {title: 'Η ηγεμονία ενώθηκε', ...suggestion('Τα εννέα φέουδα ενώθηκαν και καλύφθηκε ο στόχος ευημερίας. Δες το χρονικό της εκστρατείας σου.', navigation('missions'), 'Δες την ολοκληρωμένη εκστρατεία')};
  if (state.outcome === 'defeat' || !ours.length) return {title: 'Η εκστρατεία ολοκληρώθηκε', ...suggestion('Δεν ελέγχεις πλέον φέουδο. Οι νέες εργασίες σταματούν· μπορείς να εξετάσεις το χρονικό και τις Ρυθμίσεις.', navigation('missions'), 'Δες το χρονικό')};
  if (number(state.foodBalance) < 0 || number(state.resources?.food) <= 70) return {title: 'Εξασφάλισε τρόφιμα', ...foodGuidance(state)};
  if (number(state.population) >= number(state.housing)) return {title: 'Χρειάζεται περισσότερη στέγη', ...housingGuidance(state)};
  if (number(state.availableWorkers) > BUILD_WORKER_RESERVE && usableNodes(state).length) return {title: 'Υπάρχουν διαθέσιμα χέρια', ...suggestion(`${amount(state.availableWorkers)} εργάτες είναι διαθέσιμοι. Μοίρασε μέρος τους στους πόρους και κράτησε ${BUILD_WORKER_RESERVE} ελεύθερους για ένα έργο.`, navigation('workers'), 'Δες τους εργάτες')};
  if (number(state.housing) - number(state.population) <= 3) return {title: 'Προετοίμασε νέα στέγη', ...housingGuidance(state)};
  for (const mission of state.missions || []) {
    const advice = getMissionGuidance(state, mission);
    if (advice) return {title: mission.title || 'Επόμενος στόχος', ...advice};
  }
  const finalGoal = getMissionGuidance(state, {id: 'unite', done: false});
  return {title: 'Συντήρησε την ηγεμονία', ...(finalGoal || suggestion('Έλεγξε τους οικισμούς, την άμυνα και τις αναφορές της εκστρατείας.', navigation('missions'), 'Δες την εκστρατεία'))};
}
