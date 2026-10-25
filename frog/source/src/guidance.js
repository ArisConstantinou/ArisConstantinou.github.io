/**
 * Plain-language campaign guidance. Returns presentation text only: no actions,
 * state changes, renderer dependencies or assumptions about unlocked buttons.
 */
const BUILD_AT_HOME = 'Πήγαινε σε δικό σου οχυρό.';
const TRAIN_FROGS = 'Με χώρο εκπαίδευσης στη βάση: Tab → επίλεξε βατράχους → Εκπαίδευση.';
const DESCRIPTIONS = {
  'gather-food': {
    title: 'Μάζεψε τροφή',
    hint: 'Στο σμήνος: E για αποθέματα τροφής, αριστερό κλικ (LMB) για να φας.'
  },
  'gather-reeds': {
    title: 'Μάζεψε υλικά κατασκευής',
    hint: 'Πλησίασε σμήνος και πάτησε E για υλικά και τροφή· στην όχθη, το E μαζεύει υλικά ακόμη και με συμμάχους δίπλα σου.'
  },
  'build-shelter': {
    title: 'Χτίσε οχυρό',
    hint: 'Σε ελεύθερη όχθη: V → Νέο οχυρό → πράσινη θέση → αριστερό κλικ.'
  },
  'build-store': {
    title: 'Χτίσε αποθήκη',
    hint: BUILD_AT_HOME + ' V → Αποθήκη → πράσινη θέση στην αυλή → αριστερό κλικ.'
  },
  'build-nursery': {
    title: 'Χτίσε φωλιά στρατολόγησης',
    hint: BUILD_AT_HOME + ' V → Φωλιά στρατολόγησης → τοποθέτηση στην αυλή.'
  },
  'build-training': {
    title: 'Χτίσε χώρο εκπαίδευσης',
    hint: BUILD_AT_HOME + ' V → Χώρος εκπαίδευσης → τοποθέτηση στην αυλή.'
  },
  'recruit-allies': {
    title: 'Στρατολόγησε συμμάχους',
    hint: 'Σημάδεψε κοντινό ουδέτερο ή παραδομένο βάτραχο και πάτησε E. Ο ουδέτερος έχει δικούς του όρους: τροφή, βοήθεια, κύρος ή ασφαλής βάση. Οι παραδομένοι εντάσσονται δωρεάν.'
  },
  'train-starters': {
    title: 'Εκπαίδευσε τρεις βατράχους',
    hint: TRAIN_FROGS
  },
  'hunt-heron': {
    title: 'Νίκησε τον ερωδιό',
    hint: 'Σημάδεψε τον ερωδιό και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του.'
  },
  'hunt-snake': {
    title: 'Νίκησε το νερόφιδο',
    hint: 'Σημάδεψε το νερόφιδο και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του.'
  },
  'hunt-fish': {
    title: 'Νίκησε το αρπακτικό ψάρι',
    hint: 'Σημάδεψε το αρπακτικό ψάρι και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του.'
  },
  'expand-shelters': {
    title: 'Απόκτησε δεύτερο οχυρό',
    hint: 'Σε ελεύθερη όχθη μακριά από άλλη βάση: V → Νέο οχυρό → τοποθέτηση.'
  },
  'expand-buildings': {
    title: 'Χτίσε συνολικά έξι κτίρια',
    hint: 'Σε δικά σου οχυρά: V → διάλεξε κτίριο → πράσινη θέση στην αυλή → αριστερό κλικ.'
  },
  'train-army': {
    title: 'Εκπαίδευσε έξι βατράχους',
    hint: TRAIN_FROGS
  },
  'boss-heron': {
    title: 'Νίκησε τον Σιδερόραμφο',
    hint: 'Σημάδεψε τον γιγάντιο ερωδιό και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του.'
  },
  'boss-snake': {
    title: 'Νίκησε τη Ρίζα του Βυθού',
    hint: 'Σημάδεψε το γιγάντιο νερόφιδο και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του.'
  },
  'boss-fish': {
    title: 'Νίκησε τον Λεβιάθαν',
    hint: 'Σημάδεψε το γιγάντιο ψάρι και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του.'
  },
  'territories': {
    title: 'Ένωσε τις πέντε αντίπαλες περιοχές',
    hint: 'Πολιόρκησε το εχθρικό οχυρό με την ομάδα σου: σπάσε την πύλη, νίκησε τους υπερασπιστές και κατέλαβε την περιοχή.'
  }
};
const ALIASES = {
  food: 'gather-food',
  reeds: 'gather-reeds',
  shelter: 'build-shelter',
  store: 'build-store',
  nursery: 'build-nursery',
  training: 'build-training',
  allies: 'recruit-allies',
  trained: 'train-starters'
};

/** @returns {{title:string,hint:string}} */
export function describeObjective(goal) {
  const id=typeof goal==='string'?goal:typeof goal?.id==='string'?goal.id:'';
  const canonical=Object.hasOwn(ALIASES,id)?ALIASES[id]:id;
  if(Object.hasOwn(DESCRIPTIONS,canonical))return {...DESCRIPTIONS[canonical]};
  const label=typeof goal?.label==='string'?goal.label.trim():'';
  return {title:label||'Επόμενος στόχος',hint:typeof goal?.hint==='string'?goal.hint:''};
}

