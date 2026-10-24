import './style.css';
import {pictogram,gangEmblem,frogAvatar,rolePictogram} from './visuals.js';

const $ = (root, selector) => root.querySelector(selector);
const $$ = (root, selector) => Array.from(root.querySelectorAll(selector));
const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, Number(v) || 0));
const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const materialText = text => String(text||'').replace(/καλάμια/gi,'υλικά κατασκευής').replace(/καλαμιών/gi,'υλικών κατασκευής');
const available = n => Math.max(0, Math.floor(Number(n) || 0));
const whole = n => Math.max(0, Math.round(Number(n) || 0));
const fraction = (n, d) => clamp((Number(n) || 0) / (Number(d) || 100));
const placementTypes=new Set(['shelter','store','nursery','training','watchtower','palisade']);
const roleNames = { scout:'Ανιχνευτής', hunter:'Κυνηγός', bruiser:'Μαχητής', brute:'Βαρύς μαχητής', guardian:'Φύλακας', guard:'Φρουρός', leader:'Αρχηγός', agile:'Ακροβάτης', warrior:'Πολεμιστής', striker:'Μαχητής', intimidator:'Εκφοβιστής', caller:'Κράχτης' };
const predatorNames = {heron:'ΕΡΩΔΙΟΣ',snake:'ΝΕΡΟΦΙΔΟ',fish:'ΑΡΠΑΚΤΙΚΟ ΨΑΡΙ'};
const predatorNotes = {heron:'Απέφυγε το ράμφος. Χτύπησε όταν ορμήσει.',snake:'Άνοιξε την ομάδα. Επίθεση από τα πλάγια.',fish:'Πήγαινε σε πέτρες και ρηχά. Πρόσεχε τη σκιά.'};
const icons = {
  leaf:'<path d="M19 3C8 2 3 7 4 14c1 6 9 7 12 1 2-4 1-7 3-12Z"/><path d="M5 20 15 8M8 15l-1-5M11 12l5 1"/>',
  fly:'<path d="M12 8v11M9 10l-4-4M15 10l4-4M9 14l-5 2M15 14l5 2M10 18l-3 3M14 18l3 3"/><ellipse cx="7" cy="9" rx="3" ry="5" transform="rotate(-35 7 9)"/><ellipse cx="17" cy="9" rx="3" ry="5" transform="rotate(35 17 9)"/>',
  reeds:'<path d="M7 22V8m5 14V4m5 18V10M5 7V3h4v4Zm5-4V1h4v2Zm5 6V5h4v4Z"/>',
  heart:'<path d="m12 20-8-8C-1 6 7 1 12 7c5-6 13-1 8 5Z"/>',
  bolt:'<path d="m14 2-9 12h6l-1 8 9-13h-6Z"/>',
  stomach:'<path d="M10 3v6c-5-1-7 2-6 6 1 6 10 8 15 2 4-5 0-11-5-9V3M6 14c2-2 4 1 6 1"/>',
  moon:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
  shield:'<path d="m12 2 8 3v7c0 5-8 10-8 10S4 17 4 12V5Z"/><path d="m8 12 3 3 6-6"/>',
  group:'<circle cx="12" cy="7" r="3"/><path d="M6 21v-4c0-6 12-6 12 0v4M4 7a3 3 0 0 0 0 6M20 7a3 3 0 0 1 0 6M2 20v-3m20 3v-3"/>',
  camp:'<path d="m2 20 10-17 10 17ZM8 20l4-8 4 8M9 3l3 4 3-4"/>',
  crown:'<path d="m3 6 4 4 5-7 5 7 4-4-3 14H6ZM7 16h10"/>',
  arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',
  close:'<path d="m5 5 14 14M19 5 5 19"/>',
  sound:'<path d="M3 9v6h4l5 5V4L7 9ZM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  pin:'<path d="M19 9c0 5-7 13-7 13S5 14 5 9a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2"/>',
  skull:'<path d="M8 21v-4H5V9a7 7 0 0 1 14 0v8h-3v4ZM12 18v3"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
};
function icon(name, cls='') { return `<svg class="fg-icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.leaf}</svg>`; }
const key = text => `<kbd>${text}</kbd>`;

/**
 * DOM-only presentation. All gameplay remains in the owning game controller.
 * update(state) accepts the contract sent to root. resources may be a number or
 * {food,reeds}; buildOptions may override the default costs and availability.
 * Portrait values must be actual rendered image URLs/data URLs.
 */
export class GameUI {
  constructor({onAction=()=>{},onStart=()=>{},onResume=()=>{},onSettings=()=>{}}={}) {
    this.callbacks={onAction,onStart,onResume,onSettings};
    this.abort=new AbortController(); this.state={}; this.portraits={};
    this.panel=null; this.menu=null; this.lastDraw=0; this.lastPanel=0;
    this.rosterFilter='all';this.toastKeys=new Map();this.portraitCache=new Map();
    this.settings={quality:'high',volume:0.65,sensitivity:1};
    this.root=document.createElement('div'); this.root.id='frog-ui';
    this.root.innerHTML=this.markup(); document.body.append(this.root);
    $(this.root,'.fg-title-art').style.backgroundImage='url("./art/creek.jpg")';
    this.refs={};
    for(const el of $$(this.root,'[data-ref]')) this.refs[el.dataset.ref]=el;
    this.root.addEventListener('click', e=>this.click(e), {signal:this.abort.signal});
    this.root.addEventListener('dragstart',e=>this.beginBuildDrag(e),{signal:this.abort.signal});
    document.addEventListener('dragover',e=>this.moveBuildDrag(e),{signal:this.abort.signal});
    document.addEventListener('drop',e=>this.dropBuildDrag(e),{signal:this.abort.signal});
    document.addEventListener('dragend',()=>this.finishBuildDrag(),{signal:this.abort.signal});
    this.root.addEventListener('input', e=>this.setting(e), {signal:this.abort.signal});
    this.root.addEventListener('change', e=>this.setting(e), {signal:this.abort.signal});
    this.root.addEventListener('contextmenu', e=>e.preventDefault(), {signal:this.abort.signal});
    this.root.addEventListener('keydown', e=>{if(e.target.matches('input,select,button')&&!['Escape','Tab','KeyV'].includes(e.code)&&!this.state.buildPlacement?.active)e.stopPropagation();}, {signal:this.abort.signal});
    window.addEventListener('resize',()=>{this.lastDraw=0;},{signal:this.abort.signal});
    this.setLoading('Δημιουργία του ποταμού…');
  }
  beginBuildDrag(event){
    const card=event.target.closest('.fg-picture-building[draggable="true"]');
    if(!card||card.disabled||!placementTypes.has(card.dataset.type)){event.preventDefault();return;}
    this.draggingBuild=true;this.dragClickUntil=Infinity;
    if(event.dataTransfer){
      event.dataTransfer.effectAllowed='copy';
      event.dataTransfer.setData('application/x-frog-building',card.dataset.type);
      event.dataTransfer.setData('text/plain',card.dataset.type);
      const art=card.querySelector('.fg-building-art');if(art)event.dataTransfer.setDragImage(art,art.clientWidth/2,art.clientHeight/2);
    }
    this.callbacks.onAction('begin-placement',{type:card.dataset.type,dragging:true});
    if(!this.state.buildPlacement?.active){this.draggingBuild=false;this.dragClickUntil=performance.now()+180;event.preventDefault();return;}
    this.dragVisibilityFrame=requestAnimationFrame(()=>{if(this.draggingBuild)this.root.classList.add('fg-build-dragging');});
  }
  moveBuildDrag(event){
    if(!this.draggingBuild)return;
    event.preventDefault();if(event.dataTransfer)event.dataTransfer.dropEffect='copy';
    this.callbacks.onAction('move-placement',{clientX:event.clientX,clientY:event.clientY,dragging:true});
  }
  dropBuildDrag(event){
    if(!this.draggingBuild)return;
    event.preventDefault();event.stopPropagation();
    const point={clientX:event.clientX,clientY:event.clientY};
    this.finishBuildDrag(false);
    this.callbacks.onAction('drop-placement',point);
  }
  finishBuildDrag(cancelUnplaced=true){
    if(!this.draggingBuild)return;
    this.draggingBuild=false;this.dragClickUntil=performance.now()+180;
    cancelAnimationFrame(this.dragVisibilityFrame);
    this.root.classList.remove('fg-build-dragging');this.closePanels();
    // A handled document drop clears the drag flag before native dragend.
    // Remaining dragend events include Escape consumed by the browser itself.
    if(cancelUnplaced&&this.state.buildPlacement?.active)this.callbacks.onAction('cancel-placement',{});
  }
  updatePlacement(placement){
    const active=Boolean(placement?.active),r=this.resources(this.state.resources);
    if(!active&&this.draggingBuild)this.finishBuildDrag(false);
    this.root.classList.toggle('fg-is-placing',active);this.refs.buildPlacement.hidden=!active;
    if(!active)return;
    const valid=Boolean(placement.valid),cost=typeof placement.cost==='number'?{food:placement.cost,reeds:0}:placement.cost||{};
    const art={shelter:'camp'}[placement.type]||placement.type||'camp';
    if(this.placementArt!==art){this.placementArt=art;this.refs.placementArt.innerHTML=pictogram(art);}
    const status=valid?'check':'invalid';
    if(this.placementStatus!==status){this.placementStatus=status;this.refs.placementStatus.innerHTML=pictogram(status);}
    this.refs.buildPlacement.classList.toggle('is-invalid',!valid);
    this.refs.buildPlacement.classList.toggle('is-dragging',Boolean(placement.dragging));
    this.refs.buildPlacement.title=materialText(placement.reason||(valid?'Έτοιμο για τοποθέτηση':'Ακατάλληλη θέση κατασκευής'));
    this.refs.placementConfirm.disabled=!valid;
    this.setText('placementAngle',`${Math.round(((Number(placement.yaw)||0)*180/Math.PI%360+360)%360)}°`);
    this.setText('placementFood',`${available(r.food)} / ${whole(cost.food)}`);
    this.setText('placementMaterials',`${available(r.reeds)} / ${whole(cost.reeds)}`);
    this.refs.placementFood.parentElement.classList.toggle('is-short',r.food<(cost.food||0));
    this.refs.placementMaterials.parentElement.classList.toggle('is-short',r.reeds<(cost.reeds||0));
  }
  actionTile(action,art,k,label,cooldown=''){
    return `<button class="fg-action-tile" data-action="${action}" data-cooldown="${cooldown}" aria-label="${esc(label)}" title="${esc(label)}"><span class="fg-action-art">${pictogram(art)}</span><span class="fg-cooldown-cover"></span><span class="fg-cooldown-time"></span>${key(k)}<span class="fg-ready-line"></span></button>`;
  }
  commandButton(command,action='selection-command',id=''){
    const names={follow:'Ακολουθήστε',attack:'Επίθεση',forage:'Βρείτε μύγες · τροφή και θεραπεία',guard:'Υπεράσπιση καταφυγίου',regroup:'Ανασύνταξη όλης της ομάδας',train:'Εκπαίδευση',promote:'Προαγωγή'};
    const art={guard:'shield',train:'training',training:'training',promote:'crown'}[command]||command;
    return `<button class="fg-command-image" data-action="${action}" data-command="${command}"${id?` data-id="${esc(id)}"`:''} aria-label="${names[command]||command}" title="${names[command]||command}">${pictogram(art)}</button>`;
  }
  trainingButton(scope='selection'){
    const s=this.state,allies=s.allies||[],chosen=this.chosen(),unit=s.training?.cost||{food:8,reeds:4};
    const frogs=(scope==='gang'?allies:allies.filter(f=>chosen.has(String(f.id))));
    const eligible=frogs.filter(f=>!f.trained&&!(f.trainingProgress>0)&&!['train','training'].includes(f.order));
    const count=eligible.length,cost={food:count*(unit.food||0),reeds:count*(unit.reeds||0)},r=this.resources(s.resources);
    const camps=[...(s.camps||[]),...(s.currentCamp?[s.currentCamp]:[])];
    const hasSite=camps.some(c=>['ally','player','friendly',0].includes(c.team)&&!c.destroyed&&c.hp!==0&&c.buildings?.training);
    const affordable=r.food>=cost.food&&r.reeds>=cost.reeds,enabled=count>0&&hasSite&&affordable;
    const label=count?`Εκπαίδευση ${count} βατράχων · ${whole(cost.food)} τροφή + ${whole(cost.reeds)} υλικά κατασκευής · ${whole(s.training?.duration||18)} δευτερόλεπτα ανά βάτραχο${!hasSite?' · Χρειάζεται χώρος εκπαίδευσης':!affordable?' · Δεν αρκούν τα αποθέματα':''}`:'Επίλεξε βατράχους που χρειάζονται εκπαίδευση';
    if(scope==='gang')return `<button class="fg-command-image fg-global-training" data-action="gang-command" data-command="train" title="${esc(label)}" aria-label="${esc(label)}" ${enabled?'':'disabled'}>${pictogram('training')}<b>${count}</b></button>`;
    return `<button class="fg-training-order${!affordable?' is-short':''}" data-action="selection-command" data-command="train" title="${esc(label)}" aria-label="${esc(label)}" ${enabled?'':'disabled'}><span class="fg-training-order-image">${pictogram('training')}<b>${count}</b></span><span class="fg-training-costs"><span>${pictogram('fly')}<b>${whole(cost.food)}</b></span><span>${pictogram('reeds')}<b>${whole(cost.reeds)}</b></span></span><span class="fg-training-state">${pictogram(enabled?'check':'warning')}</span></button>`;
  }
  portrait(f={}){
    const src=f.portrait||this.portraits[f.id]||this.portraits[f.role];if(src)return src;
    const id=String(f.id??f.name??f.role??'frog')+':'+(f.tier||1)+':'+(f.role||'hunter');
    if(!this.portraitCache.has(id))this.portraitCache.set(id,frogAvatar(f));
    return this.portraitCache.get(id);
  }
  chosen(){return new Set((this.state.selectedIds||this.state.allies?.filter(f=>f.selected).map(f=>f.id)||[]).map(String));}
  markup(){return `
    <div class="fg-hud fg-visual-hud" data-ref="hud" hidden>
      <section class="fg-player" aria-label="Κατάσταση παίκτη">
        <div class="fg-player-top"><div class="fg-avatar"><img data-ref="playerPortrait" alt="Ο βάτραχός σου" hidden><span data-ref="playerBadge">${pictogram('frog')}</span><b data-ref="level">1</b></div><div class="fg-player-crest" title="Πράσινο Ρεύμα">${gangEmblem('ally')}<span data-ref="tier">I</span></div><button class="fg-members-button" data-action="open-roster" title="Διοίκηση συμμορίας · TAB" aria-label="Διοίκηση συμμορίας">${pictogram('group')}<b data-ref="gangCount">1</b></button></div>
        <div class="fg-vital fg-health" title="Υγεία">${pictogram('heart')}<div class="fg-meter"><span data-ref="hpBar"></span></div><small data-ref="hpLabel">100</small></div>
        <div class="fg-vital fg-energy" title="Αντοχή">${pictogram('stamina')}<div class="fg-meter"><span data-ref="staminaBar"></span></div><small data-ref="staminaLabel">100</small></div>
        <div class="fg-vital fg-hunger" title="Στομάχι">${pictogram('stomach')}<div class="fg-meter"><span data-ref="stomachBar"></span></div><small data-ref="stomachLabel">70%</small></div>
        <div class="fg-xp" title="Εμπειρία"><span data-ref="xpBar"></span></div>
      </section>
      <section class="fg-objective" data-ref="objectiveBox" aria-label="Στόχοι εκστρατείας"><span class="fg-objective-lead" data-ref="objectiveArt">${pictogram('camp')}</span><div class="fg-objective-body"><div class="fg-territories" data-ref="territories"></div><div class="fg-objective-track"><span data-ref="objectiveMeter"></span></div></div><b data-ref="objectiveProgress">0 / 5</b><div class="fg-campaign-strip" data-ref="campaignObjectives"></div></section>
      <section class="fg-hunt" data-ref="hunt" aria-live="polite" hidden>
        <div class="fg-hunt-portrait"><img data-ref="predatorPortrait" alt="Θηρευτής" hidden><span data-ref="predatorFallback">${pictogram('heron')}</span><span class="fg-hunt-badge">${pictogram('enemy')}</span></div>
        <div class="fg-hunt-content"><div class="fg-hunt-heading"><span data-ref="predatorPhaseIcon">${pictogram('windup')}</span><span data-ref="predatorHpLabel">100 / 100</span></div><div class="fg-predator-health"><span data-ref="predatorHp"></span></div><div class="fg-phase-track"><span data-ref="predatorPhaseBar"></span></div><div class="fg-hunt-response" data-ref="predatorResponse"></div></div>
      </section>
      <section class="fg-location"><div class="fg-resource-row fg-resource-bank" aria-label="Κοινά αποθέματα"><span title="Κοινό απόθεμα τροφής" aria-label="Τροφή">${pictogram('fly')}<b data-ref="food">0</b></span><span title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)" aria-label="Υλικά κατασκευής">${pictogram('reeds')}<b data-ref="reeds">0</b></span></div><div class="fg-clock"><span data-ref="dayIcon">${icon('sun')}</span><b data-ref="clock">09:00</b><span data-ref="day">1</span></div><button class="fg-map-button" data-action="open-map" aria-label="Χάρτης" title="Χάρτης"><canvas data-ref="minimap" width="340" height="340"></canvas><span class="fg-map-north">N</span></button></section>
      <div class="fg-crosshair" data-ref="crosshair"><i></i><i></i><i></i><i></i><span></span></div>
      <div class="fg-context" data-ref="context" hidden><span data-ref="contextArt"></span><kbd data-ref="contextKey">E</kbd><div class="fg-context-track"><span data-ref="contextBar"></span></div></div>
      <div class="fg-selection-dock" data-ref="selectionDock"><div class="fg-selection-dock-head"><span data-ref="squadMode">${pictogram('follow')}</span><b data-ref="selectionCount">0 / 0</b><button data-action="open-roster" aria-label="Άνοιγμα διοίκησης της επιλεγμένης ομάδας" title="Διοίκηση ομάδας">${gangEmblem('ally')}${key('TAB')}</button></div><div class="fg-dock-portraits" data-ref="selectionPortraits"></div><div class="fg-dock-orders">${['follow','forage','guard','regroup'].map(c=>this.commandButton(c)).join('')}</div></div>
      <div class="fg-actionbar fg-image-actionbar">
        ${this.actionTile('primary-attack','tongue','LMB','Επίθεση με τη γλώσσα','attack')}
        ${this.actionTile('special-attack','kick','Q','Ειδική επίθεση','special')}
        <div class="fg-special-picker" aria-label="Επιλογή ειδικής κίνησης">${['kick','slam','tongue'].map((art,i)=>`<button data-action="special-select" data-index="${i}" title="${['Κλωτσιά','Άλμα κρούσης','Σάρωση γλώσσας'][i]}" aria-label="${['Κλωτσιά','Άλμα κρούσης','Σάρωση γλώσσας'][i]}" class="${i===0?'is-selected':''}">${pictogram(art)}${key(i+1)}</button>`).join('')}</div>
        ${this.actionTile('dodge','dodge','Z','Αποφυγή','dodge')}
        ${this.actionTile('intimidate','roar','R','Εκφοβισμός','roar')}
        ${this.actionTile('interact','recruit','E','Αλληλεπίδραση','interact')}
        <i class="fg-action-divider"></i>
        ${this.actionTile('gang-toggle','attack','F','Επίθεση / ακολουθήστε')}
        ${this.actionTile('gang-forage','forage','T','Αναζήτηση μυγών και θεραπεία')}
        ${this.actionTile('open-build','camp','V','Κατασκευές')}
        ${this.actionTile('cycle-view','third','C','Αλλαγή κάμερας','view')}
        ${this.actionTile('open-pause','pause','ESC','Παύση')}
      </div>
      <section class="fg-placement-hud fg-placement-tools" data-ref="buildPlacement" aria-label="Τοποθέτηση κατασκευής" hidden>
        <div class="fg-placement-building"><span data-ref="placementArt">${pictogram('camp')}</span><i data-ref="placementStatus">${pictogram('check')}</i></div>
        <div class="fg-placement-costs"><span title="Τροφή: διαθέσιμη / κόστος">${pictogram('fly')}<b data-ref="placementFood">0 / 0</b></span><span title="Υλικά κατασκευής: διαθέσιμα / κόστος">${pictogram('reeds')}<b data-ref="placementMaterials">0 / 0</b></span></div>
        <div class="fg-placement-rotation"><div><button data-action="rotate-placement" data-direction="-1" title="Περιστροφή αριστερά · Q" aria-label="Περιστροφή αριστερά">${pictogram('rotate-left')}${key('Q')}</button><button data-action="rotate-placement" data-direction="1" title="Περιστροφή δεξιά · R" aria-label="Περιστροφή δεξιά">${pictogram('rotate-right')}${key('R')}</button></div><b data-ref="placementAngle">0°</b></div>
        <button class="fg-placement-confirm" data-action="confirm-placement" data-ref="placementConfirm" title="Τοποθέτηση · πληρωμή και κατασκευή" aria-label="Επιβεβαίωση τοποθέτησης">${pictogram('place')}${key('LMB')}</button>
        <button class="fg-placement-cancel" data-action="cancel-placement" title="Ακύρωση · χωρίς χρέωση" aria-label="Ακύρωση τοποθέτησης">${pictogram('close')}${key('ESC')}</button>
      </section>
      <div class="fg-save-status" data-ref="saveStatus" title="Η πρόοδος αποθηκεύτηκε" hidden>${pictogram('save')}</div>
    </div>
    <div class="fg-toasts" data-ref="toasts" role="status" aria-live="polite"></div>
    <div class="fg-loading" data-ref="loading"><div class="fg-loading-mark">${icon('leaf')}</div><b>FROG</b><span data-ref="loadingText">Δημιουργία του ποταμού…</span><div class="fg-loading-line"></div></div>
    <section class="fg-title fg-overlay" data-ref="title" hidden>
      <div class="fg-title-art"></div><div class="fg-title-shade"></div><div class="fg-title-top"><span>${icon('leaf')} ARIS CONSTANTINOU</span><small>3D SURVIVAL · TERRITORY · GANGS</small></div>
      <div class="fg-title-body"><div class="fg-eyebrow fg-title-kicker">ΕΝΑΣ ΠΟΤΑΜΟΣ. ΠΟΛΛΕΣ ΣΥΜΜΟΡΙΕΣ.</div><h1>FROG<span>CREEK DOMINION</span></h1><p>Κυνήγησε. Στρατολόγησε. Κυριάρχησε.<br>Κράτησε τη συμμορία σου ζωντανή.</p><div class="fg-title-actions"><button class="fg-button fg-primary" data-action="continue" data-ref="continueButton" hidden>Συνέχεια ${icon('arrow')}</button><button class="fg-button fg-primary" data-action="new-game" data-ref="newButton">Μπες στον ποταμό ${icon('arrow')}</button><button class="fg-button fg-subtle" data-action="title-help">Χειρισμός & οδηγός</button></div><div class="fg-title-note">Ποντίκι για στόχευση · WASD για κίνηση · Αποθήκευση στη συσκευή σου</div></div>
      <div class="fg-title-bottom"><div><b>01</b><span>Βρες τα μεγάλα σμήνη</span></div><div><b>02</b><span>Χτίσε και υπερασπίσου</span></div><div><b>03</b><span>Ένωσε τον ποταμό</span></div></div>
    </section>
    <section class="fg-modal-layer" data-ref="pause" hidden><div class="fg-panel fg-pause-panel"><div class="fg-panel-head"><div><span class="fg-eyebrow">ΜΙΑ ΑΝΑΣΑ ΣΤΗΝ ΟΧΘΗ</span><h2>Παύση</h2></div><button class="fg-icon-button" data-action="resume" aria-label="Συνέχεια">${icon('close')}</button></div><p class="fg-muted">Ο ποταμός σε περιμένει.</p><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="resume">Επιστροφή στο παιχνίδι ${icon('arrow')}</button><button class="fg-button" data-action="save">Αποθήκευση προόδου ${icon('check')}</button></div><div class="fg-settings"><label>Ποιότητα γραφικών<select data-setting="quality"><option value="high">Υψηλή</option><option value="medium">Ισορροπημένη</option><option value="low">Απόδοση</option></select></label><label>Ένταση ήχου <output data-ref="volumeOutput">65%</output><input type="range" min="0" max="100" value="65" data-setting="volume"></label><label>Ευαισθησία ποντικιού <output data-ref="sensitivityOutput">1.0×</output><input type="range" min="30" max="200" value="100" data-setting="sensitivity"></label></div><button class="fg-text-button" data-action="pause-help">Πλήρης χειρισμός & οδηγός ${icon('arrow')}</button><button class="fg-text-button fg-danger-text" data-action="restart-confirm">Νέο ταξίδι</button><div data-ref="restartConfirm" class="fg-confirm" hidden><p>Η τρέχουσα αποθηκευμένη πρόοδος θα αντικατασταθεί.</p><button class="fg-button fg-danger" data-action="restart">Έναρξη νέου παιχνιδιού</button><button class="fg-button" data-action="restart-cancel">Ακύρωση</button></div></div></section>
    <section class="fg-modal-layer" data-ref="panelLayer" hidden><div class="fg-panel fg-game-panel" data-ref="panel"></div></section>
    <section class="fg-modal-layer" data-ref="ending" hidden><div class="fg-panel fg-ending-panel"><span class="fg-ending-mark" data-ref="endingMark">${icon('crown')}</span><span class="fg-eyebrow" data-ref="endingEyebrow">Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ</span><h2 data-ref="endingTitle">Κυρίαρχος του ποταμού</h2><p data-ref="endingText"></p><div class="fg-ending-stats" data-ref="endingStats"></div><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="continue-after-end" data-ref="endingContinue">Συνέχισε την εξερεύνηση</button><button class="fg-button" data-action="restart">Νέο ταξίδι</button></div></div></section>`;}

  click(event){
    const target=event.target.closest('[data-action]'); if(!target || target.disabled) return;
    const action=target.dataset.action;
    event.stopPropagation();
    if(action==='build'&&performance.now()<(this.dragClickUntil||0))return;
    if(action==='rotate-placement'){target.blur?.();this.callbacks.onAction('rotate-placement',{direction:Number(target.dataset.direction)||1});return;}
    if(action==='confirm-placement'||action==='cancel-placement'){target.blur?.();this.callbacks.onAction(action,{});return;}
    if(action==='new-game'||action==='continue'){
      this.hideMenus(); this.menu=null; this.refs.hud.hidden=false;
      this.callbacks.onStart(action==='continue'?'continue':'new'); return;
    }
    if(action==='resume'||action==='close-panel'||action==='continue-after-end'){
      this.hideMenus(); this.callbacks.onResume(); return;
    }
    if(action==='open-pause'){this.showPause(true);this.callbacks.onAction('pause',{});return;}
    if(action==='open-build'){this.callbacks.onAction('panel-open',{name:'build'});return;}
    if(action==='open-roster'){this.callbacks.onAction('panel-open',{name:'roster'});return;}
    if(action==='open-map'){this.callbacks.onAction('panel-open',{name:'map'});return;}
    if(action==='special-select'){this.callbacks.onAction('special-select',{index:Number(target.dataset.index)});return;}
    if(action==='select-frog'){this.callbacks.onAction('select-frog',{id:target.dataset.id,additive:Boolean(event.shiftKey||event.ctrlKey||event.metaKey)});if(this.panel==='roster')this.renderPanel(true);return;}
    if(action==='select-all'){this.callbacks.onAction('select-all',{filter:target.dataset.filter||'all'});this.renderPanel(true);return;}
    if(action==='roster-filter'){this.rosterFilter=target.dataset.filter||'all';this.renderPanel(true);return;}
    if(action==='gang-command'){this.callbacks.onAction('gang-command',{command:target.dataset.command});return;}
    if(action==='selection-command'){this.callbacks.onAction('selection-command',{command:target.dataset.command,ids:Array.from(this.chosen())});return;}
    if(action==='gang-forage'){this.callbacks.onAction('gang-command',{command:'forage'});return;}
    if(action==='title-help'||action==='pause-help'){
      this.returnMenu=action==='title-help'?'title':'pause'; this.showPanel('help');return;
    }
    if(action==='help-back'){
      this.closePanels(); if(this.returnMenu==='title')this.showTitle(this.hasSave);else this.showPause(true);return;
    }
    if(action==='tab-roster'||action==='tab-map'){this.showPanel(action==='tab-map'?'map':'roster');return;}
    if(action==='build'){this.callbacks.onAction('build',{type:target.dataset.type,campId:target.dataset.camp || this.state.currentCampId});return;}
    if(action==='frog-command'){this.callbacks.onAction('frog-command',{id:target.dataset.id,command:target.dataset.command});return;}
    if(action==='gang-toggle'){
      this.callbacks.onAction('gang-command',{command:this.state.squadMode==='attack'?'follow':'attack'});return;
    }
    if(action==='gang-follow'||action==='gang-guard'||action==='gang-attack'||action==='gang-regroup'){
      this.callbacks.onAction('gang-command',{command:action.slice(5)});return;
    }
    if(action==='restart-confirm'){this.refs.restartConfirm.hidden=false;return;}
    if(action==='restart-cancel'){this.refs.restartConfirm.hidden=true;return;}
    if(action==='restart'){this.hideMenus();this.refs.hud.hidden=false;this.callbacks.onAction('restart',{});return;}
    if(action==='save'){this.callbacks.onAction('save',{});return;}
    if(action==='consume'){this.callbacks.onAction('consume',{});return;}
    if(action==='recruit'){this.callbacks.onAction('recruit',{});return;}
    this.callbacks.onAction(action,{});
  }
  setting(event){
    const input=event.target.closest('[data-setting]');if(!input)return;
    const field=input.dataset.setting;
    this.settings[field]=field==='quality'?input.value:Number(input.value)/100;
    this.refs.volumeOutput.textContent=`${whole(this.settings.volume*100)}%`;
    this.refs.sensitivityOutput.textContent=`${this.settings.sensitivity.toFixed(1)}×`;
    this.callbacks.onSettings({...this.settings});
  }
  setSettings(settings={}){
    Object.assign(this.settings,settings);
    for(const input of $$(this.root,'[data-setting]')){
      const field=input.dataset.setting;input.value=field==='quality'?this.settings[field]:this.settings[field]*100;
    }
    this.refs.volumeOutput.textContent=`${whole(this.settings.volume*100)}%`;
    this.refs.sensitivityOutput.textContent=`${this.settings.sensitivity.toFixed(1)}×`;
  }
  setLoading(text,progress){
    this.refs.loading.hidden=false;this.refs.loadingText.textContent=text;
    if(progress!==undefined)this.refs.loading.style.setProperty('--progress',`${clamp(progress)*100}%`);
  }
  showTitle(hasSave=false){
    this.hasSave=hasSave;this.hideMenus();this.menu='title';
    this.refs.loading.hidden=true;this.refs.title.hidden=false;this.refs.hud.hidden=true;
    this.refs.continueButton.hidden=!hasSave;
    this.refs.newButton.innerHTML=hasSave?`Νέο ταξίδι ${icon('arrow')}`:`Μπες στον ποταμό ${icon('arrow')}`;
    this.refs.newButton.classList.toggle('fg-primary',!hasSave);
  }
  showPause(paused=true){
    if(!paused){this.refs.pause.hidden=true;if(this.menu==='pause')this.menu=null;return;}
    this.closePanels();this.menu='pause';this.refs.pause.hidden=false;this.refs.restartConfirm.hidden=true;
    document.exitPointerLock?.();
  }
  hideMenus(){
    for(const name of ['title','pause','ending','panelLayer','loading'])this.refs[name].hidden=true;
    this.panel=null;this.menu=null;
  }
  isBlocking(){return Boolean(this.menu||(this.panel&&!this.state.buildPlacement?.active));}
  closePanels(){this.panel=null;this.refs.panelLayer.hidden=true;}
  togglePanel(name,data){if(this.panel===name)this.closePanels();else this.showPanel(name,data);}
  showPanel(name,data){
    this.panel=name;this.panelData=data||{};
    this.refs.pause.hidden=true;
    this.refs.panelLayer.hidden=false;
    document.exitPointerLock?.();
    this.renderPanel(true);
  }
  setPortraits(portraits){
    Object.assign(this.portraits,portraits);
    if(this.portraits.frog){this.refs.playerPortrait.src=this.portraits.frog;this.refs.playerPortrait.hidden=false;this.refs.playerBadge.hidden=true;}
    this.activePortrait=null;
  }
  update(state={}){
    this.state=state;this.updatePlacement(state.buildPlacement);
    const p=state.player||{},allies=state.allies||[],selected=this.chosen();
    this.meter('hpBar',fraction(p.hp,p.maxHp));this.meter('staminaBar',fraction(p.stamina,p.maxStamina));
    this.meter('stomachBar',fraction(p.stomach,p.maxStomach));this.meter('xpBar',fraction(p.xp,p.nextXp));
    this.setText('hpLabel',whole(p.hp));this.setText('staminaLabel',whole(p.stamina));
    this.setText('stomachLabel',`${whole(fraction(p.stomach,p.maxStomach)*100)}%`);
    this.setText('level',p.level||1);this.setText('tier',['','I','II','III','IV','V'][p.tier||1]||p.tier);
    this.setText('gangCount',state.gangCount??allies.length+1);
    this.root.classList.toggle('fg-low-health',fraction(p.hp,p.maxHp)<.25);
    this.root.classList.toggle('fg-low-hunger',fraction(p.stomach,p.maxStomach)<.15);
    const r=this.resources(state.resources);this.setText('food',available(r.food));this.setText('reeds',available(r.reeds));
    this.setText('clock',state.timeLabel||'09:00');this.setText('day',state.day||1);
    const night=Boolean(state.night);if(night!==this.lastNight){this.refs.dayIcon.innerHTML=icon(night?'moon':'sun');this.lastNight=night;}
    this.refs.crosshair.hidden=this.isBlocking()||state.viewMode==='topdown';this.root.classList.toggle('fg-aiming',Boolean(state.aiming));
    const camps=state.camps||[],obj=state.objectiveVisual||{};
    const targets=obj.targets||camps.filter(c=>c.originalTeam?.startsWith('enemy')||String(c.team).startsWith('enemy')).slice(0,5).map(c=>({...c,done:c.destroyed||['ally','player','friendly'].includes(c.team)}));
    const normalized=targets.length?targets:Array.from({length:5},(_,i)=>({id:i,team:'enemy'+i,done:false}));
    const current=obj.current??normalized.filter(t=>t.done).length,total=obj.total||5;
    const territorySignature=JSON.stringify(normalized.map(t=>[t.id,t.team,t.originalTeam,t.done]));
    if(territorySignature!==this.territorySignature){
      this.territorySignature=territorySignature;
      this.refs.territories.innerHTML=normalized.map((t,i)=>`<span class="fg-territory${t.done?' is-conquered':''}" title="${esc(t.name||`Συμμορία ${i+1}`)}">${gangEmblem(t.originalTeam||(''+t.team).startsWith('enemy')&&t.team||'enemy'+i)}${t.done?`<i>${pictogram('check')}</i>`:''}</span>`).join('');
    }
    this.meter('objectiveMeter',obj.progress??current/total);this.setText('objectiveProgress',`${whole(current)} / ${whole(total)}`);
    const campaign=state.campaign||{},goals=campaign.objectives||[];
    const goalSignature=JSON.stringify(goals.map(g=>[g.id,g.icon,g.current,g.target,g.progress,g.done]));
    if(goalSignature!==this.goalSignature){
      this.goalSignature=goalSignature;this.refs.campaignObjectives.hidden=!goals.length;this.refs.campaignObjectives.classList.toggle('has-many',goals.length>6);
      this.refs.campaignObjectives.innerHTML=goals.map(g=>{
        const count=['food','fly','reeds','materials'].includes(g.icon)?available(g.current):whole(g.current);
        return `<div class="fg-campaign-goal${g.done?' is-done':''}" title="${esc(materialText(g.label||g.id))}"><span>${pictogram(g.icon||'camp')}</span><b>${count}<small>/ ${whole(g.target)}</small></b><div><i style="width:${clamp(g.progress??g.current/g.target)*100}%"></i></div>${g.done?`<em>${pictogram('check')}</em>`:''}</div>`;
      }).join('');
    }
    const objectiveArt=({settlement:'camp',hunters:'heron',preparation:'training',bosses:'boss',complete:'crown'}[campaign.phase])||({food:'forage',forage:'forage',build:'camp',shelter:'camp',defend:'shield',conquer:'crown',victory:'crown'}[obj.type])||'camp';
    if(objectiveArt!==this.objectiveArt){this.objectiveArt=objectiveArt;this.refs.objectiveArt.innerHTML=pictogram(objectiveArt);}
    this.refs.objectiveBox.title=typeof state.objective==='string'?state.objective:state.objective?.title||'Στόχοι εκστρατείας';
    const context=state.context||{},contextType=context.type,contextArt={recruit:'recruit',loot:'store','persuade-camp':'persuade',persuade:'persuade',home:'camp',gather:'forage',reeds:'reeds',ally:'group',flies:'tongue'}[contextType]||contextType;
    this.refs.context.hidden=!contextType||contextType==='none'||this.isBlocking();
    this.refs.context.title=materialText(state.hint||context.label||'');this.refs.context.classList.toggle('is-unavailable',context.available===false);
    if(contextArt!==this.contextArt){this.contextArt=contextArt;this.refs.contextArt.innerHTML=pictogram(contextArt||'recruit');}
    this.setText('contextKey',contextType==='home'?'V':'E');this.meter('contextBar',context.progress??1);
    const pred=state.predator,hunting=Boolean(pred&&pred.hp>0);this.refs.hunt.hidden=!hunting;this.refs.objectiveBox.hidden=hunting;
    if(hunting){
      this.refs.hunt.title=`${pred.name||predatorNames[pred.type]||'Θηρευτής'} · ${pred.objective||pred.note||predatorNotes[pred.type]||''}`;
      this.setText('predatorHpLabel',`${whole(pred.hp)} / ${whole(pred.maxHp)}`);this.meter('predatorHp',fraction(pred.hp,pred.maxHp));
      const phase=pred.phase||pred.state||'stalk',phaseArt={windup:'windup',lunge:'attack',attack:'attack',recover:'recover',grab:'rescue',grabbed:'rescue',flee:'attack',stalk:'enemy'}[phase]||'enemy';
      let phaseProgress=pred.phaseProgress;
      if(phaseProgress==null)phaseProgress=phase==='windup'?(pred.phaseTime||0)/(pred.windup||1):['grab','grabbed'].includes(phase)?(pred.rescueDamage||0)/(pred.rescueNeeded||45):phase==='recover'?(pred.phaseTime||0)/(pred.recover||1):['lunge','attack'].includes(phase)?1:.12;
      this.meter('predatorPhaseBar',phaseProgress);this.refs.hunt.dataset.phase=phase;this.refs.hunt.classList.toggle('is-boss',Boolean(pred.boss||pred.isBoss));this.refs.hunt.classList.toggle('is-enraged',Boolean(pred.enraged));
      const phaseSignature=`${pred.type}:${phaseArt}:${Boolean(pred.boss||pred.isBoss)}`;
      if(this.phaseSignature!==phaseSignature){
        this.phaseSignature=phaseSignature;this.refs.predatorPhaseIcon.innerHTML=pictogram(phaseArt);this.refs.predatorFallback.innerHTML=pictogram(pred.type||'heron');
        $(this.refs.hunt,'.fg-hunt-badge').innerHTML=pictogram(pred.boss||pred.isBoss?'crown':'enemy');
        this.refs.predatorResponse.innerHTML=['grab','grabbed'].includes(phase)?`${pictogram('rescue')}${key('Q')}${key('SPACE')}${key('R')}`:phase==='windup'?`${pictogram('dodge')}${key('Z')}${pictogram('shield')}${key('RMB')}`:`${pictogram('attack')}${key('LMB')}${key('Q')}`;
      }
      const src=pred.portrait||this.portraits[pred.type];if(src&&src!==this.activePortrait){this.refs.predatorPortrait.src=src;this.refs.predatorPortrait.alt=pred.name||predatorNames[pred.type]||'Θηρευτής';this.activePortrait=src;}
      this.refs.predatorPortrait.hidden=!src;this.refs.predatorFallback.hidden=Boolean(src);
    }
    const cooldowns={attack:[p.attackCD,.43],special:[p.specialCD,p.specialDuration||5.2],dodge:[p.dodgeCD,1.5],roar:[p.roarCD,8],interact:[p.interactCD,4]};
    for(const [name,[remaining,totalTime]] of Object.entries(cooldowns)){
      const tile=$(this.root,`.fg-action-tile[data-cooldown="${name}"]`);if(!tile)continue;
      const value=Math.max(0,Number(remaining)||0);tile.style.setProperty('--cooldown',`${clamp(value/totalTime)*100}%`);tile.classList.toggle('is-cooling',value>.02);$(tile,'.fg-cooldown-time').textContent=value>.02?value.toFixed(1):'';
    }
    const special=Number(p.specialIndex??state.specialIndex??0);if(special!==this.specialIndex){this.specialIndex=special;$(this.root,'[data-cooldown="special"] .fg-action-art').innerHTML=pictogram(['kick','slam','tongue'][special]||'kick');for(const button of $$(this.root,'[data-action="special-select"]'))button.classList.toggle('is-selected',Number(button.dataset.index)===special);}
    if(this.viewMode!==state.viewMode){this.viewMode=state.viewMode;$(this.root,'[data-cooldown="view"] .fg-action-art').innerHTML=pictogram({first:'first',topdown:'topdown'}[state.viewMode]||'third');}
    const mode=state.squadMode||'follow';if(mode!==this.squadMode){this.squadMode=mode;this.refs.squadMode.innerHTML=pictogram({guard:'shield',train:'training',training:'training'}[mode]||mode);}
    this.setText('selectionCount',`${selected.size} / ${allies.length}`);
    const selectionSignature=JSON.stringify([Array.from(selected),allies.map(f=>[f.id,f.hp,f.order,f.guard,f.portrait])]);
    if(selectionSignature!==this.selectionSignature){
      this.selectionSignature=selectionSignature;const shown=(selected.size?allies.filter(f=>selected.has(String(f.id))):allies).slice(0,5);
      this.refs.selectionPortraits.innerHTML=shown.map(f=>`<button class="fg-dock-frog${selected.has(String(f.id))?' is-selected':''}" data-action="select-frog" data-id="${esc(f.id)}" aria-label="${esc(f.name||'Βάτραχος')}" title="${esc(f.name||'Βάτραχος')}"><img src="${esc(this.portrait(f))}" alt="${esc(f.name||'Βάτραχος')}"><span style="width:${fraction(f.hp,f.maxHp)*100}%"></span>${f.guard||f.order==='guard'?`<i>${pictogram('shield')}</i>`:''}</button>`).join('')+((selected.size||allies.length)>5?`<button class="fg-dock-more" data-action="open-roster" title="Όλη η ομάδα">+${(selected.size||allies.length)-5}</button>`:'');
      if(this.panel==='roster')this.renderPanel(false);
    }
    if(state.savedAt&&state.savedAt!==this.savedAt){this.savedAt=state.savedAt;this.refs.saveStatus.hidden=false;clearTimeout(this.saveTimer);this.saveTimer=setTimeout(()=>this.refs.saveStatus.hidden=true,2500);}
    const now=performance.now();if(now-this.lastDraw>100){this.drawMap(this.refs.minimap,state.world||{},false);this.lastDraw=now;if(this.panel==='map'){const canvas=$(this.refs.panel,'canvas');if(canvas)this.drawMap(canvas,state.world||{},true);}}
    if(this.panel&&now-this.lastPanel>700&&!['help','map'].includes(this.panel)){this.renderPanel(false);this.lastPanel=now;}
  }
  resources(resource){
    if(typeof resource==='number')return {food:resource,reeds:resource};
    return {food:resource?.food??resource?.flies??0,reeds:resource?.reeds??resource?.wood??resource?.materials??0};
  }
  setText(ref,value){const el=this.refs[ref];if(el&&el.textContent!==String(value))el.textContent=String(value);}
  meter(ref,value){const el=this.refs[ref];if(el)el.style.transform=`scaleX(${clamp(value)})`;}
  panelHeader(eyebrow,title,extra=''){
    return `<div class="fg-panel-head"><div><span class="fg-eyebrow">${eyebrow}</span><h2>${title}</h2></div><button class="fg-icon-button" data-action="${this.panel==='help'?'help-back':'close-panel'}" aria-label="Κλείσιμο">${icon('close')}</button></div>${extra}`;
  }
  renderPanel(force=false){
    const container=this.refs.panel;if(!this.panel||this.draggingBuild)return;
    const scrollTop=container.scrollTop,gridScroll=$(container,'.fg-frog-grid')?.scrollTop||0,active=document.activeElement;
    if(!force&&container.contains(active)&&['INPUT','SELECT'].includes(active.tagName))return;
    container.classList.toggle('fg-command-panel',this.panel==='roster');container.classList.toggle('fg-building-panel',this.panel==='build');
    const s=this.state;
    const signature=this.panel==='roster'?JSON.stringify([this.panel,this.rosterFilter,Array.from(this.chosen()),s.allies?.map(f=>[f.id,f.name,f.hp,f.stomach,f.level,f.tier,f.order,f.guard,f.canPromote,f.trained,f.trainingProgress,Boolean(f.portrait)]),s.resources,s.capacity,s.recruitmentUnlimited,s.training,s.camps?.map(c=>[c.id,c.team,c.destroyed,Boolean(c.buildings?.training)]),s.currentCamp?.buildings]):this.panel==='build'?JSON.stringify([this.panel,s.resources,s.buildOptions,s.currentCamp?.id,s.currentCamp?.hp,s.currentCamp?.buildings,s.placement,s.capacity]):this.panel;
    if(!force&&this.panelSignature===signature)return;this.panelSignature=signature;
    if(this.panel==='help')container.innerHTML=this.helpMarkup();
    else if(this.panel==='build')container.innerHTML=this.buildMarkup();
    else if(this.panel==='roster')container.innerHTML=this.rosterMarkup();
    else if(this.panel==='map'){
      container.innerHTML=this.panelHeader('Ο ΚΟΣΜΟΣ ΣΟΥ','Ο Μεγάλος Ποταμός',this.tabs('map'))+`<div class="fg-large-map"><canvas width="1024" height="720"></canvas><span class="fg-map-north">N</span></div><div class="fg-map-legend"><span><i style="--legend:#c8f3a1"></i>Εσύ & σύμμαχοι</span><span><i style="--legend:#ee9a71"></i>Αντίπαλοι</span><span><i style="--legend:#f6db82"></i>Τροφή</span><span><i style="--legend:#c2b9e8"></i>Ελεύθερες θέσεις</span><span><i style="--legend:#f85a48"></i>Θηρευτές</span></div>`;
      this.drawMap($(container,'canvas'),this.state.world||{},true);
    }
    container.scrollTop=scrollTop;const grid=$(container,'.fg-frog-grid');if(grid)grid.scrollTop=gridScroll;
  }
  tabs(which){return `<div class="fg-tabs"><button class="${which==='roster'?'active':''}" data-action="tab-roster">${icon('group')} Συμμορία</button><button class="${which==='map'?'active':''}" data-action="tab-map">${icon('pin')} Χάρτης</button></div>`;}
  buildMarkup(){
    const s=this.state,r=this.resources(s.resources),camp=s.currentCamp||this.panelData?.camp;
    const defaults=[
      {type:'shelter',name:'Καταφύγιο',cost:{food:30,reeds:45}},
      {type:'store',name:'Αποθήκη',cost:{food:16,reeds:24}},
      {type:'nursery',name:'Φωλιά',cost:{food:24,reeds:32}},
      {type:'training',name:'Χώρος εκπαίδευσης',cost:{food:24,reeds:28}},
      {type:'watchtower',name:'Σκοπιά',cost:{food:22,reeds:34}},
      {type:'palisade',name:'Οχύρωση',cost:{food:18,reeds:30}},
      {type:'repair',name:'Επισκευή',cost:{food:8,reeds:12}},
      {type:'upgrade',name:'Αναβάθμιση',cost:{food:45,reeds:45}}
    ];
    const options=s.buildOptions||this.panelData?.buildOptions||defaults;
    const owned=(s.camps||[]).filter(c=>['ally','player','friendly',0].includes(c.team)&&!c.destroyed);
    const valid=s.placement?.valid!==false;
    const artFor=type=>({shelter:'camp',upgrade:'crown',promote:'crown','promote-player':'crown',repair:'repair'}[type]||type);
    const effectFor=type=>({shelter:'group',store:'fly',nursery:'recruit',watchtower:'shield',palisade:'shield',upgrade:'group',repair:'heart',promote:'attack','promote-player':'attack',training:'training'}[type]||'check');
    return this.panelHeader('ΚΑΤΑΣΚΕΥΗ & ΑΜΥΝΑ','Τα καταφύγιά σου')+`
      <div class="fg-build-overview"><div class="fg-camp-illustration">${pictogram('camp')}${gangEmblem('ally')}</div><div class="fg-base-health"><h3>${esc(camp?.name||s.campName||'Νέο καταφύγιο')}</h3><div class="fg-base-healthbar"><span style="width:${camp?fraction(camp.hp,camp.maxHp)*100:100}%"></span></div><div class="fg-base-badges"><span title="Αντοχή καταφυγίου">${pictogram('heart')}<b>${camp?`${whole(camp.hp)} / ${whole(camp.maxHp)}`:'—'}</b></span><span title="Συμμαχικά καταφύγια">${pictogram('camp')}<b>${owned.length}</b></span><span title="Θέσεις αυτόματης γέννησης στη φωλιά · οι στρατολογήσεις είναι απεριόριστες">${pictogram('nursery')}<b>${s.capacity??'∞'}</b></span></div></div><div class="fg-build-bank" aria-label="Κοινά αποθέματα"><div title="Κοινό απόθεμα τροφής">${pictogram('fly')}<b>${available(r.food)}</b></div><div title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)">${pictogram('reeds')}<b>${available(r.reeds)}</b></div></div></div>
      <div class="fg-build-grid fg-illustrated-build">${options.map((o,i)=>{
        const cost=typeof o.cost==='number'?{food:o.cost,reeds:0}:(o.cost||{}),affordable=r.food>=(cost.food||0)&&r.reeds>=(cost.reeds||0);
        const built=Boolean(o.built||camp?.buildings?.[o.type]),siteOK=o.type==='shelter'?valid:Boolean(camp)||['promote','promote-player'].includes(o.type);
        const enabled=o.enabled!==false&&affordable&&!built&&siteOK;
        const status=built?'built':!siteOK?'site':!affordable?'resources':enabled?'ready':'locked';
        const explanation=materialText(o.reason||(!siteOK?'Απαιτείται κατάλληλη θέση ή συμμαχικό καταφύγιο':!affordable?'Δεν αρκούν τα κοινά αποθέματα':built?'Έχει ήδη κατασκευαστεί':o.description||''));
        const dragHelp=enabled&&placementTypes.has(o.type)?' · Σύρε στον χώρο ή κάνε κλικ και τοποθέτησε · Q/R περιστροφή · Esc ακύρωση':'';
        const statusArt={built:'check',site:'warning',resources:'store',ready:'repair',locked:'warning'}[status];
        return `<button class="fg-build-card fg-picture-building is-${status}" data-action="build" data-type="${esc(o.type)}" draggable="${enabled&&placementTypes.has(o.type)?'true':'false'}" data-camp="${esc(camp?.id||s.currentCampId||'')}" title="${esc((o.name||o.type)+' · '+explanation+dragHelp)}" aria-label="${esc((o.name||o.type)+' · '+explanation+dragHelp)}" ${enabled?'':'disabled'}><div class="fg-building-art">${pictogram(artFor(o.type))}${enabled&&placementTypes.has(o.type)?`<span class="fg-building-drag" title="Σύρε και τοποθέτησε">${pictogram('place')}</span>`:''}<span class="fg-building-benefit" title="${esc(o.description||'')}">${pictogram(effectFor(o.type))}</span><span class="fg-building-state">${pictogram(statusArt)}</span></div><h3>${esc(o.name||o.type)}</h3><div class="fg-material-requirements">${[['food','fly','Τροφή'],['reeds','reeds','Υλικά κατασκευής']].map(([resource,art,label])=>`<div class="fg-material ${r[resource]>=(cost[resource]||0)?'is-enough':'is-short'}" title="${label}: ${available(r[resource])} / ${whole(cost[resource]||0)}">${pictogram(art)}<div><b>${available(r[resource])}<small> / ${whole(cost[resource]||0)}</small></b><span><i style="width:${cost[resource]?clamp(r[resource]/cost[resource])*100:100}%"></i></span></div></div>`).join('')}</div><div class="fg-build-purchase">${key(i+1)}<span>${pictogram(built?'check':enabled?(placementTypes.has(o.type)?'place':'repair'):'warning')}</span></div></button>`;
      }).join('')}</div>
      <div class="fg-build-footer"><div class="fg-placement-status${valid?'':' is-invalid'}" title="${esc(materialText(s.placement?.reason||(valid?'Κατάλληλη θέση κατασκευής':'Ακατάλληλη θέση κατασκευής')))}">${pictogram('camp')}${pictogram(valid?'check':'warning')}</div><button class="fg-image-meal" data-action="consume" title="Τροφή από κοινά αποθέματα" aria-label="Τροφή από κοινά αποθέματα" ${s.inCamp||camp?'':'disabled'}>${pictogram('fly')}${pictogram('heal')}${key('G')}</button><button class="fg-image-meal" data-action="gang-forage" title="Η ομάδα βρίσκει μύγες και θεραπεύεται" aria-label="Αναζήτηση τροφής">${pictogram('forage')}${key('T')}</button><div class="fg-build-exit">${key('V')}${key('ESC')}</div></div>`;
  }
  rosterMarkup(){
    const s=this.state,allies=s.allies||[],chosen=this.chosen(),r=this.resources(s.resources);
    const isGuard=f=>f.guard||f.order==='guard',isInjured=f=>fraction(f.hp,f.maxHp)<.85,isForaging=f=>f.order==='forage';
    const filters={all:allies,injured:allies.filter(isInjured),guards:allies.filter(isGuard),forage:allies.filter(isForaging)};
    const shown=filters[this.rosterFilter]||allies,selected=allies.filter(f=>chosen.has(String(f.id))),single=selected.length===1?selected[0]:null;
    const promotion=single?.promoteCost,promotionCost=typeof promotion==='number'?{food:promotion,reeds:0}:promotion||{food:0,reeds:0};
    const health=selected.length?selected.reduce((sum,f)=>sum+fraction(f.hp,f.maxHp),0)/selected.length:0,hunger=selected.length?selected.reduce((sum,f)=>sum+fraction(f.stomach,f.maxStomach),0)/selected.length:0;
    const orderArt=f=>({guard:'shield',stay:'shield',train:'training',training:'training'}[f.order]||f.order||(f.guard?'shield':'follow'));
    const cardMeter=(art,percent,text,kind)=>`<div class="fg-card-meter ${kind}">${pictogram(art)}<span><b style="width:${clamp(percent)*100}%"></b></span><small>${text}</small></div>`;
    return this.panelHeader('ΤΑΚΤΙΚΗ ΔΙΟΙΚΗΣΗ','Πράσινο Ρεύμα',this.tabs('roster'))+`
      <div class="fg-command-summary"><span class="fg-hq-crest">${gangEmblem('ally')}</span><span class="fg-command-metric" title="Η συμμορία σου · απεριόριστη στρατολόγηση">${pictogram('group')}<b>${allies.length+1}</b><small>/ ${s.recruitmentUnlimited?'∞':s.capacity??'∞'}</small></span><span class="fg-command-metric" title="Τραυματισμένοι βάτραχοι">${pictogram('heal')}<b>${filters.injured.length}</b></span><span class="fg-command-metric" title="Φρουροί">${pictogram('shield')}<b>${filters.guards.length}</b></span><span class="fg-command-metric fg-hq-food" title="Κοινό απόθεμα τροφής">${pictogram('fly')}<b>${available(r.food)}</b></span><span class="fg-command-metric fg-hq-reeds" title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)">${pictogram('reeds')}<b>${available(r.reeds)}</b></span><div class="fg-global-command">${this.commandButton('regroup','gang-command')}${this.commandButton('forage','gang-command')}${this.trainingButton('gang')}</div></div>
      <div class="fg-command-layout"><div class="fg-army-main"><div class="fg-roster-toolbar"><div class="fg-roster-filters">${[['all','group','Όλοι'],['injured','heal','Τραυματισμένοι'],['guards','shield','Φρουροί'],['forage','forage','Σε αναζήτηση τροφής']].map(([filter,art,label])=>`<button data-action="roster-filter" data-filter="${filter}" class="${this.rosterFilter===filter?'is-active':''}" title="${label}" aria-label="${label}">${pictogram(art)}<b>${filters[filter].length}</b></button>`).join('')}</div><button class="fg-select-filter" data-action="select-all" data-filter="${this.rosterFilter}" title="Επιλογή όλων στο φίλτρο" aria-label="Επιλογή όλων στο φίλτρο">${pictogram('check')}${key('ALL')}</button></div><div class="fg-frog-grid">${shown.length?shown.map((f,i)=>`
        <button class="fg-frog-card${chosen.has(String(f.id))?' is-selected':''}${isInjured(f)?' is-wounded':''}" data-action="select-frog" data-id="${esc(f.id)}" aria-label="${esc(f.name||`Βάτραχος ${i+1}`)}" title="${esc((f.name||'Βάτραχος')+' · '+(roleNames[f.role]||f.role||'Κυνηγός'))}"><div class="fg-frog-picture"><img src="${esc(this.portrait(f))}" alt="${esc(f.name||'Βάτραχος')}" loading="lazy"><span class="fg-frog-crest">${gangEmblem('ally')}</span><span class="fg-frog-role">${pictogram(rolePictogram(f.role))}</span><span class="fg-frog-tier">${'◆'.repeat(Math.min(5,Math.max(1,f.tier||1)))}</span><b class="fg-frog-level">${whole(f.level||1)}</b>${chosen.has(String(f.id))?`<span class="fg-frog-chosen">${pictogram('check')}</span>`:''}${f.trainingProgress>0?`<div class="fg-training-card-progress"><span style="width:${clamp(f.trainingProgress)*100}%"></span>${pictogram('training')}</div>`:''}${f.trained?`<span class="fg-trained-badge" title="Εκπαιδευμένος">${pictogram('training')}</span>`:''}</div><div class="fg-frog-card-caption"><strong>${esc(f.name||`Βάτραχος ${i+1}`)}</strong><span>${pictogram(orderArt(f))}</span></div>${cardMeter('heart',fraction(f.hp,f.maxHp),whole(f.hp),'health')}${cardMeter('stomach',fraction(f.stomach,f.maxStomach),`${whole(fraction(f.stomach,f.maxStomach)*100)}%`,'hunger')}</button>`).join(''):`<div class="fg-roster-empty">${pictogram('recruit')}${key('E')}</div>`}</div></div>
      <aside class="fg-command-detail"><div class="fg-selection-title"><span>${pictogram('group')}</span><h3>${single?esc(single.name):selected.length?`${selected.length} βάτραχοι`:'Επιλογή ομάδας'}</h3></div><div class="fg-selected-hero">${selected.length?`<img src="${esc(this.portrait(selected[0]))}" alt="${esc(selected[0].name||'Επιλεγμένος βάτραχος')}"><span>${pictogram(single?rolePictogram(single.role):'group')}</span><b>${single?whole(single.level||1):selected.length}</b>`:pictogram('regroup')}</div>${cardMeter('heart',health,`${whole(health*100)}%`,'health')}${cardMeter('stomach',hunger,`${whole(hunger*100)}%`,'hunger')}<div class="fg-selected-orders">${['follow','attack','forage','guard','regroup'].map(command=>this.commandButton(command)).join('')}</div>${this.trainingButton('selection')}${single?`<button class="fg-promote-picture" data-action="frog-command" data-id="${esc(single.id)}" data-command="promote" aria-label="Προαγωγή" title="Προαγωγή · ${whole(promotionCost.food)} τροφή + ${whole(promotionCost.reeds)} υλικά κατασκευής" ${single.canPromote===false?'disabled':''}>${pictogram('crown')}<span>${'◆'.repeat(Math.min(5,(single.tier||1)+1))}</span>${pictogram('fly')}<b>${whole(promotionCost.food)}</b>${pictogram('reeds')}<b>${whole(promotionCost.reeds)}</b></button>`:''}<div class="fg-detail-selection-count">${pictogram('group')}<b>${selected.length} / ${allies.length}</b>${key('SHIFT')}</div></aside></div>`;
  }
  helpMarkup(){
    const rows=[['W A S D','Κίνηση σε σχέση με την κάμερα · σταθερή κατεύθυνση στην κάτοψη'],['Ποντίκι','Κάμερα και στόχευση · ελεύθερος δείκτης στην κάτοψη'],['C','Τρίτο πρόσωπο → πρώτο πρόσωπο → κάτοψη'],['Ροδέλα','Απόσταση κάμερας / μεγέθυνση κάτοψης'],['SPACE','Άλμα σε φύλλα και βράχους'],['SHIFT','Γρήγορη κίνηση · καταναλώνει αντοχή'],['Z','Γρήγορη αποφυγή επίθεσης'],['LMB','Γλώσσα για μύγες και επιθέσεις · κλικ σε σύμμαχο για επιλογή'],['SHIFT + κλικ','Προσθήκη ή αφαίρεση βατράχου από την επιλογή'],['RMB','Στόχευση / αμυντική στάση'],['Q','Επιλεγμένη ειδική επίθεση'],['1 / 2 / 3','Επιλογή ειδικής κίνησης'],['E','Στρατολόγηση, αλληλεπίδραση ή λεηλασία'],['R','Εκφοβισμός των αντιπάλων'],['F','Επίθεση / ακολουθήστε'],['T','Ομάδα: αναζήτηση μυγών για τροφή και θεραπεία'],['X','Φρουρά / επιστροφή στην ομάδα'],['V','Κατασκευές · σύρε κάρτα στον χώρο ή κάνε κλικ και τοποθέτησε'],['Q / R','Κατά την τοποθέτηση: περιστροφή αριστερά / δεξιά'],['LMB / ESC','Κατά την τοποθέτηση: επιβεβαίωση / ακύρωση χωρίς χρέωση'],['G','Τροφή από τα κοινά αποθέματα κοντά στη βάση'],['TAB','Διοίκηση συμμορίας και χάρτης'],['ESC','Παύση / απελευθέρωση ποντικιού']];
    const chapters=[
      ['01','camp','Θεμελίωσε τη συμμορία','Συγκέντρωσε 30 τροφή και 45 υλικά κατασκευής. Χτίσε καταφύγιο, αποθήκη, φωλιά και χώρο εκπαίδευσης. Στρατολόγησε 6 συμμάχους και εκπαίδευσε 3.',['fly','reeds','camp','store','nursery','training','group']],
      ['02','heron','Αντιμετώπισε τους κυνηγούς','Οι πρώτες αποστολές ξεκλειδώνουν ερωδιό, νερόφιδο και αρπακτικό ψάρι. Διάβασε την εικόνα της επίθεσης, απέφυγε και αντεπιτέσου με την ομάδα.',['heron','snake','fish','dodge','attack']],
      ['03','training','Ετοίμασε τον στρατό','Επέκτεινε σε 2 καταφύγια, 6 κτίρια και 6 εκπαιδευμένους συμμάχους. Κράτα φρουρούς στις βάσεις και δώσε εντολή αναζήτησης τροφής στους τραυματισμένους.',['camp','watchtower','training','shield','forage']],
      ['04','boss','Κυριάρχησε στον ποταμό','Νίκησε τους 3 μεγάλους θηρευτές και ένωσε και τις 5 αντίπαλες συμμορίες με κατάκτηση ή πειθώ. Οι μεγάλοι θηρευτές επιτίθενται σε διαδοχικές ορμές.',['boss','crown','persuade','attack']]
    ];
    return this.panelHeader('ΚΡΑΤΗΣΕ ΤΑ ΔΑΧΤΥΛΑ ΚΟΝΤΑ ΣΤΟ WASD','Χειρισμός & επιβίωση')+`<div class="fg-help-grid"><div><h3>Χειρισμός</h3><dl class="fg-controls">${rows.map(([k,t])=>`<div><dt>${key(k)}</dt><dd>${t}</dd></div>`).join('')}</dl><div class="fg-help-training"><span class="fg-help-training-art">${pictogram('training')}</span><div><h3>Εκπαίδευση ανά βάτραχο</h3><div class="fg-help-costs"><span>${pictogram('fly')}<b>8</b></span><span>${pictogram('reeds')}<b>4</b></span><span>${pictogram('recover')}<b>18″</b></span></div><p>Επίλεξε συμμάχους στη διοίκηση και πάτησε την εικόνα εκπαίδευσης. Το κόστος εμφανίζεται πριν δώσεις εντολή. Οι βάτραχοι πηγαίνουν σε συμμαχικό χώρο εκπαίδευσης· ο χρόνος αρχίζει όταν φτάσουν. Οι φρουροί επιστρέφουν στο καθήκον τους μετά το μάθημα.</p></div></div></div><div class="fg-guide fg-campaign-guide"><h3>Τα 4 κεφάλαια της εκστρατείας</h3>${chapters.map(([n,art,title,description,arts])=>`<article class="fg-help-chapter"><span class="fg-help-chapter-art">${pictogram(art)}</span><div><b>${n} / ${title}</b><p>${description}</p><div class="fg-help-chapter-images">${arts.map(a=>pictogram(a)).join('')}</div></div></article>`).join('')}<div class="fg-help-forage"><span>${pictogram('forage')}${key('T')}</span><div><b>Οι μύγες θεραπεύουν την ομάδα</b><p>Η εντολή αναζήτησης οδηγεί τους συμμάχους στα σμήνη για τροφή, θεραπεία και προμήθειες. Οι φρουροί κρατούν τη βάση τους, εκτός αν τους επιλέξεις ρητά ή διατάξεις γενική ανασύνταξη. Οι στρατολογήσεις δεν περιορίζονται από τις θέσεις της φωλιάς.</p></div></div><div class="fg-help-emblems"><span title="Σύμμαχοι">${gangEmblem('ally')}</span><span title="Αντίπαλες συμμορίες">${gangEmblem('enemy0')}</span><span title="Μεγάλος θηρευτής">${pictogram('boss')}</span></div></div></div>`;
  }
  emblemImage(team){
    if(!this.mapEmblems)this.mapEmblems=new Map();if(this.mapEmblems.has(team))return this.mapEmblems.get(team);
    const image=new Image();image.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(gangEmblem(team))}`;this.mapEmblems.set(team,image);return image;
  }
  drawMap(canvas,world={},large=false){
    const ctx=canvas.getContext('2d');if(!ctx)return;
    const w=canvas.width,h=canvas.height,radius=world.radius||110;
    const scale=Math.min(w,h)/(radius*2.12);const cx=w/2,cy=h/2;
    const pos=p=>[cx+(p.x??p.position?.x??0)*scale,cy+(p.z??p.position?.z??0)*scale];
    ctx.clearRect(0,0,w,h);ctx.fillStyle='#102825';ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='#263e37';ctx.lineWidth=1;
    const grid=20*scale;
    for(let x=cx%grid;x<w;x+=grid){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for(let y=cy%grid;y<h;y+=grid){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    if(world.platforms){ctx.fillStyle='#42523d';for(const p of world.platforms){const [x,y]=pos(p);ctx.beginPath();ctx.arc(x,y,Math.max(1,(p.radius||1)*scale),0,Math.PI*2);ctx.fill();}}
    for(const spot of world.hotspots||[]){if(spot.flies===0)continue;const [x,y]=pos(spot);ctx.fillStyle=spot.rich?'#d6b96b':'#8c9c6e';ctx.globalAlpha=.65;ctx.beginPath();ctx.arc(x,y,large?5:3,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    for(const camp of world.camps||this.state.camps||[]){
      const [x,y]=pos(camp);const friendly=['player','ally','friendly',0].includes(camp.team);const neutral=camp.team==='neutral'||camp.team==null;
      ctx.strokeStyle=friendly?'#b8e89b':neutral?'#b6a9da':'#e89470';ctx.fillStyle=friendly?'#324e35':neutral?'#332f45':'#51392e';ctx.lineWidth=large?2:1.5;
      const s=large?12:7,emblem=this.emblemImage(friendly?'ally':neutral?'neutral':camp.originalTeam||camp.team);
      if(emblem.complete&&emblem.naturalWidth)ctx.drawImage(emblem,x-s,y-s*1.1,s*2,s*2.2);else{ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x+s,y-s*.5);ctx.lineTo(x+s*.8,y+s*.5);ctx.lineTo(x,y+s);ctx.lineTo(x-s*.8,y+s*.5);ctx.lineTo(x-s,y-s*.5);ctx.closePath();ctx.fill();ctx.stroke();}
      if(large&&camp.name){ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillStyle='#c9d0ba';ctx.fillText(camp.name,x,y+s+16);}
    }
    const drawDots=(arr,color,size)=>{ctx.fillStyle=color;for(const p of arr||[]){if(p.dead)continue;const[x,y]=pos(p);ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill();}};
    drawDots(world.enemies,'#df936f',large?3:2);drawDots(world.allies,'#94ca8c',large?3:2);
    for(const predator of world.predators||[]){if(predator.dead||predator.hp===0)continue;const [x,y]=pos(predator);ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/4);ctx.fillStyle=predator.hunting?'#ff6953':'#b47b67';const s=large?6:4;ctx.fillRect(-s,-s,s*2,s*2);ctx.restore();}
    const player=world.player||{x:0,z:0,yaw:0};const[px,py]=pos(player);
    ctx.strokeStyle='rgba(199,235,165,.16)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(px,py,18*scale,0,Math.PI*2);ctx.stroke();
    ctx.save();ctx.translate(px,py);ctx.rotate(Math.PI-(player.yaw||0));ctx.fillStyle='#e2f4bc';ctx.strokeStyle='#142a20';ctx.lineWidth=2;const sz=large?9:7;ctx.beginPath();ctx.moveTo(0,-sz);ctx.lineTo(sz*.65,sz*.7);ctx.lineTo(0,sz*.35);ctx.lineTo(-sz*.65,sz*.7);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
    if(large){ctx.font='12px system-ui';ctx.textAlign='left';ctx.fillStyle='#829b8c';ctx.fillText('Κάθε τετράγωνο: 20 μονάδες',20,h-20);}
  }
  toast(message,kind='info'){
    const item=typeof message==='object'&&message?message:{detail:String(message),tone:kind},detail=materialText(item.detail||item.message||''),tone=item.tone||kind;
    const infer=()=>{
      if(/εκπαίδευ|training/i.test(detail))return 'training';if(/προαγ|βαθμίδ|επίπεδ/i.test(detail))return 'crown';
      if(/στρατολογ|ενώθηκ|συμμάχ/i.test(detail))return 'recruit';if(/μύγ|τροφή|έφαγ|γεμάτ|χόρτα/i.test(detail))return 'fly';
      if(/θεραπε|υγεί/i.test(detail))return 'heal';if(/υλικ|ξύλ|καλάμ|καλαμ/i.test(detail))return 'reeds';
      if(/φρουρ|υπεράσπ/i.test(detail))return 'shield';if(/καταφύγ|αποθήκ|φωλιά|χτίσ|χτίστ/i.test(detail))return 'camp';
      if(/πέθαν|έπεσ|νεκρ/i.test(detail))return 'enemy';if(/κάμερ|πρόσωπο|κάτοψ/i.test(detail))return 'camera';
      if(/αντοχ/i.test(detail))return 'stamina';if(/επίθε|χτύπ|θηρευτ|ερωδι|νερόφιδ|ψάρι/i.test(detail))return 'attack';
      return tone==='warning'||tone==='danger'?'warning':tone==='success'?'check':tone==='food'?'fly':'leaf';
    };
    const art=item.icon||infer(),id=item.id||`${tone}:${art}:${detail}`,now=performance.now();
    if(this.toastKeys.has(id)&&now-this.toastKeys.get(id)<1800)return;this.toastKeys.set(id,now);
    if(this.toastKeys.size>70)for(const [k,t] of this.toastKeys)if(now-t>10000)this.toastKeys.delete(k);
    const value=item.value??detail.match(/\+\s*\d+/)?.[0],life=['warning','danger'].includes(tone)?5200:3600;
    const toast=document.createElement('div');toast.className=`fg-toast fg-visual-toast fg-notice-${tone}`;toast.title=detail;toast.setAttribute('aria-label',detail||art);toast.style.setProperty('--notice-life',`${life}ms`);
    toast.innerHTML=`<span class="fg-notice-art">${item.portrait?`<img src="${esc(item.portrait)}" alt="">`:pictogram(art)}</span><span class="fg-notice-payload">${pictogram(item.portrait?art:item.secondaryIcon||(['warning','danger'].includes(tone)?'warning':'check'))}${value!==undefined?`<b>${esc(value)}</b>`:''}${item.progress!==undefined?`<span class="fg-notice-progress"><span style="width:${clamp(item.progress)*100}%"></span></span>`:''}</span><span class="fg-notice-lifetime"></span>`;
    this.refs.toasts.append(toast);while(this.refs.toasts.children.length>3)this.refs.toasts.firstChild.remove();
    setTimeout(()=>{toast.classList.add('fg-toast-out');setTimeout(()=>toast.remove(),250);},life);
  }
  showEnding(victory,stats={}){
    this.hideMenus();this.menu='ending';this.refs.ending.hidden=false;document.exitPointerLock?.();
    this.refs.endingMark.innerHTML=icon(victory?'crown':'leaf');
    this.setText('endingEyebrow',victory?'Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ':'ΤΟ ΤΑΞΙΔΙ ΤΕΛΕΙΩΣΕ');
    this.setText('endingTitle',victory?'Κυρίαρχος του ποταμού':'Η λίμνη θυμάται');
    this.setText('endingText',victory?'Οι αντίπαλες βάσεις έπεσαν ή επέλεξαν να ενωθούν μαζί σου. Η συμμορία σου γράφει πλέον την ιστορία του ποταμού.':'Κάθε διαδρομή αφήνει μια ιστορία. Επέστρεψε με καλύτερη φρουρά, γεμάτα στομάχια και μια πιο δεμένη συμμορία.');
    this.refs.endingContinue.hidden=!victory;
    const metrics=[['Ημέρες',stats.days||stats.day||1],['Μύγες',stats.fliesCaught||stats.flies||0],['Στρατολογήσεις',stats.recruited||0],['Καταφύγια',stats.campsCaptured||stats.camps||0],['Θηρευτές',stats.predatorsKilled||stats.predators||0]];
    this.refs.endingStats.innerHTML=metrics.map(([label,value])=>`<div><b>${whole(value)}</b><span>${label}</span></div>`).join('');
  }
  destroy(){this.abort.abort();clearTimeout(this.saveTimer);cancelAnimationFrame(this.dragVisibilityFrame);this.root.remove();}
}

