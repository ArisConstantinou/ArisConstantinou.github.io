import {pictogram} from './visuals.js';
import {recruitmentCardMarkup} from './recruitment-card.js';

const esc=(value='')=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=value=>Math.max(0,Math.floor(Number(value)||0));
const fraction=(value,max=100)=>Math.max(0,Math.min(1,(Number(value)||0)/(Number(max)||100)));
const roleNames={scout:'Ανιχνευτής',hunter:'Κυνηγός',bruiser:'Μαχητής',caller:'Κράχτης'};
const orderNames={follow:'Ακολουθεί',attack:'Επίθεση',scout:'Ανιχνεύει',distract:'Αντιπερισπασμός',protect:'Προστατεύει',retreat:'Υποχωρεί',forage:'Βρίσκει τροφή',guard:'Κρατά θέση',regroup:'Επιστρέφει'};

/** Physical cover is supplied by refuge geometry; local calm never implies cover. */
export function creekRefugeStatus(refuge){
  const position=refuge?.playerPosition;
  if(!['inside','entrance','exposed'].includes(position))return null;
  if(refuge.intruder){
    const name=refuge.intruder.label||({snake:'Το φίδι',heron:'Ο ερωδιός',fish:'Το αρπακτικό ψάρι',frog:'Ένας αντίπαλος βάτραχος'}[refuge.intruder.type]||'Μια απειλή');
    return {covered:position==='inside'&&refuge.protected===true,warning:true,label:'Απειλή μέσα',detail:`${name} βρίσκεται μέσα στην κρυψώνα. Δεν μπορείς να αναπαυθείς εδώ· βρες έξοδο ή αντιμετώπισε την απειλή.`};
  }
  if(position==='inside'&&refuge.protected===true)return {covered:true,label:'Μέσα στο καταφύγιο',detail:'Η στέγη και τα τοιχώματα προσφέρουν κάλυψη. Φίδι που χωρά μπορεί να μπει.'};
  if(position==='entrance')return {covered:false,label:'Στην είσοδο',detail:'Η είσοδος είναι εκτεθειμένη. Προχώρησε κάτω από τη στέγη.'};
  return {covered:false,label:'Έξω από την κάλυψη',detail:'Η κοντινή φωλιά δεν σε καλύπτει εδώ. Μπες στο εσωτερικό.'};
}

/** Presentation only. Every action is routed through the existing GameUI controller. */
export const creekUIMethods={
  creekHomeNest(){
    const nest=this.state.creek?.enabled?this.state.creek.nest:null;
    return nest&&Number.isFinite(nest.x)&&Number.isFinite(nest.z)?nest:null;
  },
  creekNestMarkup(){
    const nest=this.state.creek?.nest||{},status=creekRefugeStatus(nest),locatable=Boolean(this.creekHomeNest());
    return `<section class="fg-creek-nest"><span>${pictogram('leaf')}</span><div><h3>${esc(nest.label||'Φυσικό καταφύγιο')}</h3><p>${status?esc(status.label):nest.visited?'Η φωλιά σου βρίσκεται κάτω από τη φυσική στέγη.':'Βρες τη φυσική στέγη ανάμεσα στις ρίζες.'}</p>${status?`<small>${esc(nest.hint||status.detail)}</small>`:''}<button class="fg-creek-locate" data-action="locate-shelter" ${locatable?'':'disabled'}>${pictogram('leaf')}<span>Δείξε στον χάρτη</span></button></div></section>`;
  },
  creekRecruitmentMarkup(){
    const r=this.state.recruitment;
    if(!r)return this.panelHeader('ΣΥΝΑΝΤΗΣΕΙΣ','Γνώρισε τους βατράχους')+`<p class="fg-realm-empty">Πλησίασε έναν ουδέτερο βάτραχο και πάτησε E. Η εικόνα δίπλα του δείχνει την τροφή και τις συνθήκες που χρειάζεται για να σε ακολουθήσει.</p>${this.guideButton('recruit','Πώς αποκτώ έναν σύντροφο;')}`;
    return this.panelHeader('ΣΥΝΑΝΤΗΣΕΙΣ',esc(r.name||'Ένας νέος σύντροφος'))+`<section class="fg-creek-recruitment"><p>Παρατήρησε τη συμπεριφορά του και μοιράσου τροφή όταν είναι έτοιμος να σε ακολουθήσει.</p>${recruitmentCardMarkup(r,Boolean(this.state.paused))}</section>${this.guideButton('recruit','Πώς αποκτώ έναν σύντροφο;')}`;
  },
  explorationMarkup(){
    const creek=this.state.creek||{},phase=creek.phase||{},inventory=creek.inventory||{};
    const discoveries=creek.discoveries||[],abilities=creek.abilities||[],dropped=creek.dropped||[];
    return this.panelHeader('ΤΟ ΡΥΑΚΙ ΑΛΛΑΖΕΙ','Ανακαλύψεις')+`
      ${this.creekNestMarkup()}
      <section class="fg-creek-condition"><span>${pictogram('leaf')}</span><div><small>ΤΩΡΙΝΕΣ ΣΥΝΘΗΚΕΣ</small><h3>${esc(phase.label||'Η ζωή στην όχθη')}</h3><p>${esc(phase.hint||'Παρατήρησε τη ροή, τα έντομα και τις κινήσεις των ζώων.')}</p></div></section>
      <div class="fg-creek-inventory" aria-label="Αυτόματη ταξινόμηση αντικειμένων">${[['food','fly','Τροφή'],['finds','leaf','Ευρήματα'],['keepsakes','pearl','Ενθύμια']].map(([id,art,label])=>`<div>${pictogram(art)}<b>${number(inventory[id])}</b><span>${label}</span></div>`).join('')}</div>
      <section class="fg-creek-section"><div class="fg-realm-section-heading"><h3>Όσα γνώρισες</h3><span>${number(creek.discoveryCount)} / ${number(creek.totalLandmarks||discoveries.length)}</span></div><div class="fg-creek-discoveries">${discoveries.map(d=>`<article class="${d.found?'is-found':'is-unknown'}"><span>${pictogram(d.found?'leaf':'eye')}</span><div><h3>${esc(d.label||'Άγνωστο σημείο')}</h3><p>${esc(d.description||'Ακολούθησε μια αλλαγή στην κίνηση των ζώων.')}</p></div>${d.found?pictogram('check'):''}</article>`).join('')}</div></section>
      <section class="fg-creek-section"><h3>Μόνιμες ικανότητες</h3><div class="fg-creek-abilities">${abilities.map(a=>{
        const target=Math.max(.001,Number(a.target)||1),progress=a.unlocked?target:Math.max(0,Math.min(target,Number(a.progress??a.current)||0));
        return `<details class="fg-creek-ability ${a.unlocked?'is-earned':''}" data-creek-section="ability-${esc(a.id)}"><summary><span>${pictogram(a.icon||'jump')}</span><div><strong>${esc(a.label||a.name||'Νέα ικανότητα')}</strong><small>${a.unlocked?'Αποκτήθηκε · μόνιμη':'Δες πώς ανακαλύπτεται'}</small></div>${pictogram(a.unlocked?'check':'leaf')}</summary><div class="fg-creek-ability-detail"><p>${esc(a.description||'')}</p>${a.unlocked&&a.controls?`<strong class="fg-creek-controls">${esc(a.controls)}</strong>`:`<p>${esc(a.hint||'Συνέχισε την εξερεύνηση και την παρατήρηση.')}</p><progress value="${progress}" max="${target}" aria-label="Πρόοδος: ${esc(a.label||a.name||'ικανότητα')}"></progress>`}</div></details>`;
      }).join('')}</div></section>
      ${dropped.length?`<section class="fg-creek-recovery"><h3>Ανάκτηση ευρημάτων</h3><p>Τα σημεία εμφανίζονται στον χάρτη. Πλησίασε και πάτησε E· η τροφή μπορεί να φαγωθεί όσο λείπεις.</p><div>${dropped.map(d=>`<span>${pictogram('recover')}<b>${number(d.food)}</b> τροφή · <b>${number(d.findsCount)+number(d.keepsakesCount)}</b> ευρήματα</span>`).join('')}</div></section>`:''}
      <footer class="fg-creek-footer"><button class="fg-button" data-action="open-realm">${pictogram('leaf')} Περιοχές</button>${this.guideButton('exploration','Διάβασε το ρυάκι')}</footer>`;
  },
  creekRosterMarkup(){
    const s=this.state,allies=(s.allies||[]).filter(f=>!f.dead),chosen=this.chosen();
    const filters={all:allies,injured:allies.filter(f=>fraction(f.hp,f.maxHp)<.85),guards:allies.filter(f=>f.guard||f.order==='guard'),forage:allies.filter(f=>f.order==='forage')};
    const shown=filters[this.rosterFilter]||allies,selected=allies.filter(f=>chosen.has(String(f.id)));
    const commands=['follow','attack','scout','distract','protect','retreat','forage','guard','regroup'];
    return this.panelHeader('Η ΣΥΝΘΕΣΗ ΤΗΣ ΕΞΟΡΜΗΣΗΣ','Οι σύντροφοί σου',this.tabs('roster'))+`
      <div class="fg-creek-squad-summary"><span>${pictogram('group')}<b>${allies.length}</b> σύντροφοι εδώ</span><span>${pictogram('fly')}<b>${number(s.creek?.inventory?.food??s.resources?.food)}</b> τροφή</span></div>
      <div class="fg-creek-global-orders">${this.commandButton('regroup','gang-command')}${this.commandButton('forage','gang-command')}${this.commandButton('retreat','gang-command')}</div>
      ${this.tacticalGroupsMarkup()}
      <div class="fg-roster-toolbar"><div class="fg-roster-filters">${[['all','group','Όλοι'],['injured','heal','Τραυματισμένοι'],['guards','shield','Σε φύλαξη'],['forage','forage','Σε αναζήτηση τροφής']].map(([filter,art,label])=>`<button data-action="roster-filter" data-filter="${filter}" class="${this.rosterFilter===filter?'is-active':''}" title="${label}" aria-label="${label}">${pictogram(art)}<b>${filters[filter].length}</b></button>`).join('')}</div><button class="fg-select-filter" data-action="select-all" data-filter="${this.rosterFilter}" title="Επιλογή όλων στο φίλτρο" aria-label="Επιλογή όλων στο φίλτρο">${pictogram('check')}</button></div>
      <div class="fg-creek-frog-grid">${shown.length?shown.map(f=>`<button class="fg-creek-frog ${chosen.has(String(f.id))?'is-selected':''}" data-action="select-frog" data-id="${esc(f.id)}" aria-pressed="${chosen.has(String(f.id))}"><img src="${esc(this.portrait(f))}" alt=""><div><strong>${esc(f.name||'Βάτραχος')}</strong><span>${esc(roleNames[f.role]||'Σύντροφος')}</span><small>${esc(orderNames[f.order]||'Κοντά στην ομάδα')}</small></div><div class="fg-creek-frog-vitals"><span>${pictogram('heart')}<b>${number(f.hp)}</b></span><span>${pictogram('stomach')}<b>${number(fraction(f.stomach,f.maxStomach)*100)}%</b></span></div></button>`).join(''):'<p class="fg-realm-empty">Πλησίασε έναν ουδέτερο βάτραχο. Με E βλέπεις τι χρειάζεται για να σε ακολουθήσει.</p>'}</div>
      <section class="fg-creek-orders"><h3>${selected.length?`Εντολές · ${selected.length} επιλεγμένοι`:'Επίλεξε συντρόφους για εντολές'}</h3><p>Shift + κλικ προσθέτει στην επιλογή. Η ομάδα συνεχίζει να κινείται όσο το πάνελ είναι ανοικτό.</p><fieldset ${selected.length?'':'disabled'} class="fg-creek-command-grid" aria-label="Εντολές επιλεγμένης ομάδας">${commands.map(command=>this.commandButton(command)).join('')}</fieldset></section>`;
  },
  creekRealmMarkup(){
    const realm=this.state.realm||{},regions=realm.regions||[];
    return this.panelHeader('ΠΕΡΑΣΜΑΤΑ ΚΑΙ ΒΙΟΤΟΠΟΙ','Περιοχές του ρυακιού',this.tabs('realm'))+`
      <div class="fg-creek-condition"><span>${pictogram('leaf')}</span><div><small>ΒΡΙΣΚΕΣΑΙ ΕΔΩ</small><h3>${esc(realm.name||'Η πρώτη όχθη')}</h3><p>Οι συνοδοί ταξιδεύουν μαζί σου. Οι ανακαλύψεις και οι σχέσεις κάθε περιοχής διατηρούνται.</p></div></div>
      <div class="fg-region-list">${regions.map(region=>{
        const travel=region.travel||{},active=Boolean(region.active);
        return `<article class="fg-region ${active?'is-current':''}"><div class="fg-region-number">${String((Number(region.index)||0)+1).padStart(2,'0')}</div><div class="fg-region-copy"><small>${active?'ΕΔΩ':region.visited?'ΓΝΩΡΙΜΗ ΟΧΘΗ':'ΑΝΕΞΕΡΕΥΝΗΤΗ ΟΧΘΗ'}</small><h3>${esc(region.name)}</h3>${active||region.visited?`<div class="fg-region-metrics"><span>${number(region.owned)} φιλικές περιοχές</span><span>${number(region.garrison)} σε φύλαξη</span><span>${number(region.enemies)} αντίπαλοι</span></div>`:''}${!active?`<ul class="fg-travel-requirements">${(travel.requirements||[]).map(req=>`<li class="${req.met?'is-met':''}">${pictogram(req.met?'check':'leaf')}${esc(req.label)}</li>`).join('')}</ul>`:''}</div><div class="fg-region-action">${active?'<span>Τωρινή περιοχή</span>':`${this.costMarkup(travel.cost)}<button class="fg-button ${travel.allowed?'fg-primary':''}" data-action="realm-travel" data-region="${Number(travel.targetIndex??region.index)}" ${travel.allowed?'':'disabled'}>${region.visited?'Επιστροφή':'Ακολούθησε το ρυάκι'} ${pictogram('leaf')}</button>${travel.reason?`<p>${esc(travel.reason)}</p>`:''}`}</div></article>`;
      }).join('')||'<p class="fg-realm-empty">Παρατήρησε τις διαδρομές που συνεχίζουν πέρα από την όχθη.</p>'}</div>`;
  }
};
