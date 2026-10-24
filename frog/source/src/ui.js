import './style.css';

const $ = (root, selector) => root.querySelector(selector);
const $$ = (root, selector) => Array.from(root.querySelectorAll(selector));
const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, Number(v) || 0));
const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const whole = n => Math.max(0, Math.round(Number(n) || 0));
const fraction = (n, d) => clamp((Number(n) || 0) / (Number(d) || 100));
const roleNames = { scout:'Ανιχνευτής', hunter:'Κυνηγός', bruiser:'Μαχητής', brute:'Βαρύς μαχητής', guardian:'Φύλακας', guard:'Φρουρός', leader:'Αρχηγός', agile:'Ακροβάτης', warrior:'Πολεμιστής', striker:'Μαχητής', intimidator:'Εκφοβιστής' };
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
    this.settings={quality:'high',volume:0.65,sensitivity:1};
    this.root=document.createElement('div'); this.root.id='frog-ui';
    this.root.innerHTML=this.markup(); document.body.append(this.root);
    $(this.root,'.fg-title-art').style.backgroundImage='url("./art/creek.jpg")';
    this.refs={};
    for(const el of $$(this.root,'[data-ref]')) this.refs[el.dataset.ref]=el;
    this.root.addEventListener('click', e=>this.click(e), {signal:this.abort.signal});
    this.root.addEventListener('input', e=>this.setting(e), {signal:this.abort.signal});
    this.root.addEventListener('change', e=>this.setting(e), {signal:this.abort.signal});
    this.root.addEventListener('contextmenu', e=>e.preventDefault(), {signal:this.abort.signal});
    this.root.addEventListener('keydown', e=>{if(e.target.matches('input,select,button')) e.stopPropagation();}, {signal:this.abort.signal});
    window.addEventListener('resize',()=>{this.lastDraw=0;},{signal:this.abort.signal});
    this.setLoading('Δημιουργία του ποταμού…');
  }
  markup(){return `
    <div class="fg-hud" data-ref="hud" hidden>
      <section class="fg-player" aria-label="Κατάσταση παίκτη">
        <div class="fg-player-top"><div class="fg-avatar"><img data-ref="playerPortrait" alt="Ο βάτραχός σου" hidden><span data-ref="playerBadge">${icon('crown')}</span><b data-ref="level">1</b></div><div class="fg-player-title"><span class="fg-eyebrow">Η ΣΥΜΜΟΡΙΑ ΣΟΥ</span><strong>Πράσινο Ρεύμα</strong><div class="fg-rank"><span data-ref="tier">Βαθμίδα I</span><span class="fg-dot"></span><span data-ref="gangCount">1 βάτραχος</span></div></div></div>
        <div class="fg-vital fg-health">${icon('heart')}<div class="fg-meter"><span data-ref="hpBar"></span></div><small data-ref="hpLabel">100</small></div>
        <div class="fg-vital fg-energy">${icon('bolt')}<div class="fg-meter"><span data-ref="staminaBar"></span></div><small data-ref="staminaLabel">100</small></div>
        <div class="fg-vital fg-hunger">${icon('stomach')}<div class="fg-meter"><span data-ref="stomachBar"></span></div><small data-ref="stomachLabel">70</small></div>
        <div class="fg-vital-labels"><span>Υγεία</span><span>Αντοχή</span><span data-ref="hungerStatus">Χορτάτος</span></div>
        <div class="fg-xp"><span data-ref="xpBar"></span></div>
      </section>
      <section class="fg-objective" data-ref="objectiveBox"><span class="fg-eyebrow">${icon('pin')} ΣΤΟΧΟΣ</span><strong data-ref="objective">Βρες τροφή και χτίσε τη συμμορία σου.</strong><small data-ref="objectiveProgress"></small></section>
      <section class="fg-hunt" data-ref="hunt" aria-live="polite" hidden>
        <div class="fg-hunt-portrait"><img data-ref="predatorPortrait" alt="Θηρευτής" hidden><span data-ref="predatorFallback">${icon('eye')}</span></div>
        <div class="fg-hunt-content"><div class="fg-hunt-heading"><span class="fg-eyebrow">ΣΕ ΚΥΝΗΓΑ</span><b data-ref="predatorName">ΘΗΡΕΥΤΗΣ</b><span data-ref="predatorHpLabel">100 / 100</span></div><div class="fg-predator-health"><span data-ref="predatorHp"></span></div><strong>Πολέμησε για να τον απωθήσεις ή να τον σκοτώσεις.</strong><small data-ref="predatorNote"></small></div>
      </section>
      <section class="fg-location"><div class="fg-clock"><span data-ref="dayIcon">${icon('sun')}</span><b data-ref="clock">07:30</b><span data-ref="day">Ημέρα 1</span></div><button class="fg-map-button" data-action="open-roster" aria-label="Άνοιγμα χάρτη και συμμορίας"><canvas data-ref="minimap" width="340" height="340"></canvas><span class="fg-map-north">N</span><span class="fg-map-key">TAB · ΧΑΡΤΗΣ</span></button><div class="fg-resource-row"><span title="Αποθέματα τροφής">${icon('fly')}<b data-ref="food">0</b></span><span title="Καλάμια για κατασκευές">${icon('reeds')}<b data-ref="reeds">0</b></span></div><small class="fg-location-name" data-ref="location">Ο Μεγάλος Ποταμός</small></section>
      <div class="fg-crosshair" data-ref="crosshair"><i></i><i></i><i></i><i></i><span></span></div>
      <div class="fg-context" data-ref="context" hidden><span data-ref="hint"></span></div>
      <div class="fg-squad-status"><span class="fg-squad-pip"></span><span data-ref="squadMode">Η συμμορία ακολουθεί</span><span data-ref="guardCount"></span><span class="fg-view-label" data-ref="viewMode">Τρίτο πρόσωπο</span></div>
      <div class="fg-actionbar"><div class="fg-action-group"><span>${key('W A S D')} Κίνηση</span><span>${key('SPACE')} Άλμα</span><span>${key('SHIFT')} Τρέξιμο</span><span>${key('Z')} Αποφυγή</span></div><div class="fg-action-group"><span>${key('LMB')} Γλώσσα</span><span>${key('Q')} Ειδική</span><span>${key('R')} Εκφοβισμός</span><span>${key('E')} Ενέργεια</span></div><div class="fg-action-group"><button data-action="cycle-view">${key('C')} Κάμερα</button><button data-action="gang-toggle">${key('F')} Ομάδα</button><button data-action="open-build">${key('V')} Καταφύγιο</button><button data-action="open-pause" aria-label="Παύση">${key('ESC')}</button></div></div>
      <div class="fg-save-status" data-ref="saveStatus"></div>
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
    if(action==='gang-follow'||action==='gang-guard'||action==='gang-attack'){
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
  isBlocking(){return Boolean(this.menu||this.panel);}
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
    this.state=state;
    const p=state.player||{};
    this.meter('hpBar',fraction(p.hp,p.maxHp));
    this.meter('staminaBar',fraction(p.stamina,p.maxStamina));
    this.meter('stomachBar',fraction(p.stomach,p.maxStomach));
    this.meter('xpBar',fraction(p.xp,p.nextXp));
    this.setText('hpLabel',whole(p.hp));
    this.setText('staminaLabel',whole(p.stamina));
    this.setText('stomachLabel',`${whole(fraction(p.stomach,p.maxStomach)*100)}%`);
    this.setText('level',p.level||1);
    this.setText('tier',`Βαθμίδα ${['','I','II','III','IV','V'][p.tier||1]||p.tier}`);
    const hunger=fraction(p.stomach,p.maxStomach);
    this.setText('hungerStatus',hunger>0.94?'Γεμάτο στομάχι':hunger>0.35?'Χορτάτος':hunger>0.1?'Πεινάς':'Χρειάζεσαι τροφή');
    this.root.classList.toggle('fg-low-health',fraction(p.hp,p.maxHp)<0.25);
    this.root.classList.toggle('fg-low-hunger',hunger<0.15);
    const allies=state.allies||[];
    this.setText('gangCount',`${state.gangCount ?? allies.length+1} βάτραχοι`);
    const guards=allies.filter(f=>f.guard||f.order==='guard').length;
    this.setText('guardCount',guards?`${guards} σε φρουρά`:'');
    this.setText('squadMode',state.squadModeLabel||({follow:'Η συμμορία ακολουθεί',attack:'Η συμμορία επιτίθεται',guard:'Η συμμορία φρουρεί',stay:'Η συμμορία περιμένει'}[state.squadMode]||'Η συμμορία ακολουθεί'));
    const resources=this.resources(state.resources);
    this.setText('food',whole(resources.food));this.setText('reeds',whole(resources.reeds));
    this.setText('clock',state.timeLabel||'07:30');this.setText('day',`Ημέρα ${state.day||1}`);
    const night=Boolean(state.night);
    if(night!==this.lastNight){this.refs.dayIcon.innerHTML=icon(night?'moon':'sun');this.lastNight=night;}
    this.setText('location',state.locationName||'Ο Μεγάλος Ποταμός');
    const objective=state.objective;
    this.setText('objective',typeof objective==='string'?objective:objective?.title||'Βρες τροφή και δυνάμωσε τη συμμορία σου.');
    this.setText('objectiveProgress',state.objectiveProgress||objective?.progress||'');
    this.setText('hint',state.hint||'');this.refs.context.hidden=!state.hint||this.isBlocking();
    this.refs.crosshair.hidden=this.isBlocking()||state.viewMode==='topdown';
    this.setText('viewMode',({third:'Τρίτο πρόσωπο',first:'Πρώτο πρόσωπο',topdown:'Κάτοψη'}[state.viewMode]||'Τρίτο πρόσωπο'));
    this.root.classList.toggle('fg-aiming',Boolean(state.aiming));
    const pred=state.predator;
    const hunting=Boolean(pred && pred.hp>0);
    this.refs.hunt.hidden=!hunting;
    this.refs.objectiveBox.hidden=hunting;
    if(hunting){
      this.setText('predatorName',pred.name||predatorNames[pred.type]||'ΘΗΡΕΥΤΗΣ');
      this.setText('predatorHpLabel',`${whole(pred.hp)} / ${whole(pred.maxHp)}`);
      this.meter('predatorHp',fraction(pred.hp,pred.maxHp));
      this.setText('predatorNote',pred.objective||pred.note||predatorNotes[pred.type]||'Συντόνισε τις επιθέσεις της συμμορίας.');
      const src=pred.portrait||this.portraits[pred.type];
      if(src && src!==this.activePortrait){this.refs.predatorPortrait.src=src;this.refs.predatorPortrait.alt=pred.name||predatorNames[pred.type]||'Θηρευτής';this.activePortrait=src;}
      this.refs.predatorPortrait.hidden=!src;this.refs.predatorFallback.hidden=Boolean(src);
    }
    if(state.savedAt && state.savedAt!==this.savedAt){this.savedAt=state.savedAt;this.setText('saveStatus','Η πρόοδος αποθηκεύτηκε');clearTimeout(this.saveTimer);this.saveTimer=setTimeout(()=>this.setText('saveStatus',''),3000);}
    const now=performance.now();
    if(now-this.lastDraw>100){this.drawMap(this.refs.minimap,state.world||{},false);this.lastDraw=now;if(this.panel==='map'){const canvas=$(this.refs.panel,'canvas');if(canvas)this.drawMap(canvas,state.world||{},true);}}
    if(this.panel && now-this.lastPanel>700 && !['help','map'].includes(this.panel)){this.renderPanel(false);this.lastPanel=now;}
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
    const container=this.refs.panel;
    if(!this.panel)return;
    const scrollTop=container.scrollTop;
    const active=document.activeElement;
    if(!force&&container.contains(active)&&active.tagName==='BUTTON')return;
    if(this.panel==='help'){container.innerHTML=this.helpMarkup();return;}
    if(this.panel==='build'){container.innerHTML=this.buildMarkup();}
    else if(this.panel==='roster'){container.innerHTML=this.rosterMarkup();}
    else if(this.panel==='map'){
      container.innerHTML=this.panelHeader('Ο ΚΟΣΜΟΣ ΣΟΥ','Ο Μεγάλος Ποταμός',this.tabs('map'))+`<div class="fg-large-map"><canvas width="1024" height="720"></canvas><span class="fg-map-north">N</span></div><div class="fg-map-legend"><span><i style="--legend:#c8f3a1"></i>Εσύ & σύμμαχοι</span><span><i style="--legend:#ee9a71"></i>Αντίπαλοι</span><span><i style="--legend:#f6db82"></i>Τροφή</span><span><i style="--legend:#c2b9e8"></i>Ελεύθερες θέσεις</span><span><i style="--legend:#f85a48"></i>Θηρευτές</span></div>`;
      this.drawMap($(container,'canvas'),this.state.world||{},true);
    }
    container.scrollTop=scrollTop;
  }
  tabs(which){return `<div class="fg-tabs"><button class="${which==='roster'?'active':''}" data-action="tab-roster">${icon('group')} Συμμορία</button><button class="${which==='map'?'active':''}" data-action="tab-map">${icon('pin')} Χάρτης</button></div>`;}
  buildMarkup(){
    const s=this.state;const r=this.resources(s.resources);const camp=s.currentCamp||this.panelData?.camp;
    const defaults=[
      {type:'shelter',name:'Νέο καταφύγιο',description:'Ίδρυσε ασφαλή βάση σε κατάλληλο σημείο.',cost:{food:20,reeds:30},icon:'camp'},
      {type:'store',name:'Αποθήκη τροφής',description:'Περισσότερα προστατευμένα αποθέματα για τη συμμορία.',cost:{food:15,reeds:20},icon:'fly'},
      {type:'nursery',name:'Φωλιά στρατολόγησης',description:'Δημιουργεί νέους βατράχους, καταναλώνοντας τροφή.',cost:{food:35,reeds:35},icon:'group'},
      {type:'watchtower',name:'Σκοπιά & οχύρωση',description:'Ενισχύει την άμυνα και την επιτήρηση του καταφυγίου.',cost:{food:15,reeds:30},icon:'shield'},
      {type:'upgrade',name:'Αναβάθμιση καταφυγίου',description:'Μεγαλύτερη αντοχή και καλύτερη υποστήριξη της ομάδας.',cost:{food:45,reeds:45},icon:'crown'},
    ];
    const options=s.buildOptions||this.panelData?.buildOptions||defaults;
    return this.panelHeader('ΦΥΛΛΑ, ΚΑΛΑΜΙΑ ΚΑΙ ΑΣΦΑΛΕΙΑ','Το καταφύγιό σου')+`
      <div class="fg-camp-summary"><div>${icon('camp')}<strong>${esc(camp?.name||s.campName||(s.inCamp?'Φιλικό καταφύγιο':'Νέο σημείο εγκατάστασης'))}</strong><small>${s.inCamp?'Οργάνωσε τη βάση και άφησε φρουρά πριν φύγεις.':'Βρες ασφαλές σημείο σε νησίδα ή φαρδύ βράχο.'}</small></div><div class="fg-camp-resources"><span>${icon('fly')}${whole(r.food)}</span><span>${icon('reeds')}${whole(r.reeds)}</span></div></div>
      <div class="fg-build-grid">${options.map((o,i)=>{
        const cost=typeof o.cost==='number'?{food:o.cost,reeds:0}:(o.cost||{});
        const affordable=(r.food>=(cost.food||0))&&(r.reeds>=(cost.reeds||0));
        const enabled=o.enabled!==false&&affordable;
        return `<button class="fg-build-card" data-action="build" data-type="${esc(o.type)}" data-camp="${esc(camp?.id||s.currentCampId||'')}" ${enabled?'':'disabled'}><span class="fg-build-icon">${icon(o.icon||defaults.find(d=>d.type===o.type)?.icon||'camp')}</span><span class="fg-build-info"><strong>${esc(o.name)}</strong><small>${esc(o.description||'')}</small><span class="fg-build-cost">${cost.food?`<span class="${r.food<cost.food?'fg-short':''}">${icon('fly')}${whole(cost.food)}</span>`:''}${cost.reeds?`<span class="${r.reeds<cost.reeds?'fg-short':''}">${icon('reeds')}${whole(cost.reeds)}</span>`:''}${o.level?`<em>Βαθμίδα ${o.level}</em>`:''}</span>${!enabled?`<span class="fg-build-reason">${esc(o.reason||(!affordable?'Δεν αρκούν τα αποθέματα':'Μη διαθέσιμο εδώ'))}</span>`:''}</span><kbd>${i+1}</kbd></button>`;
      }).join('')}</div>
      <div class="fg-camp-footer"><button class="fg-button fg-small" data-action="consume" ${s.inCamp?'':'disabled'}>${key('G')} Φάε από τα αποθέματα</button><span>Η εφεδρική τροφή είναι περιορισμένη. Το κυνήγι παραμένει απαραίτητο.</span></div>
      <div class="fg-panel-bottom">${key('V')} ή ${key('ESC')} επιστροφή στον ποταμό <span>Διαθέσιμα καταφύγια: ${(s.camps||[]).filter(c=>c.team==='player'||c.team==='ally'||c.team==='friendly').length}</span></div>`;
  }
  rosterMarkup(){
    const allies=this.state.allies||[];
    return this.panelHeader('ΔΥΝΑΜΗ ΜΕ ΣΥΝΤΟΝΙΣΜΟ','Η συμμορία σου',this.tabs('roster'))+`
      <div class="fg-roster-summary"><span><b>${allies.length+1}</b> μέλη</span><span><b>${allies.filter(f=>f.guard||f.order==='guard').length}</b> φρουροί</span><span><b>${whole(allies.length?allies.reduce((v,f)=>v+fraction(f.stomach,f.maxStomach),0)/allies.length*100:100)}%</b> κορεσμός ομάδας</span></div>
      <div class="fg-squad-commands"><button class="fg-button fg-small" data-action="gang-follow">${icon('group')} Ακολουθήστε</button><button class="fg-button fg-small" data-action="gang-guard">${icon('shield')} Φυλάξτε</button><button class="fg-button fg-small" data-action="gang-attack">${icon('bolt')} Επιτεθείτε</button></div>
      <div class="fg-roster-list">${allies.length?allies.map((f,i)=>{
        const guard=f.guard||f.order==='guard';
        return `<article class="fg-frog-row"><div class="fg-frog-rank"><span>${whole(f.level||1)}</span><small>LVL</small></div><div class="fg-frog-info"><div><strong>${esc(f.name||`Βάτραχος ${i+1}`)}</strong><span class="fg-role-tag">${esc(roleNames[f.role]||f.role||'Κυνηγός')}</span></div><small>Βαθμίδα ${f.tier||1} · ${guard?'Σε φρουρά':'Στην ομάδα'}</small><div class="fg-frog-meters"><span title="Υγεία">${icon('heart')}<i><b style="width:${fraction(f.hp,f.maxHp)*100}%"></b></i>${whole(f.hp)}</span><span title="Στομάχι">${icon('stomach')}<i><b style="width:${fraction(f.stomach,f.maxStomach)*100}%"></b></i>${whole(fraction(f.stomach,f.maxStomach)*100)}%</span></div></div><div class="fg-frog-commands"><button class="fg-button fg-small" data-action="frog-command" data-id="${esc(f.id)}" data-command="${guard?'follow':'guard'}">${icon(guard?'group':'shield')}${guard?'Έλα μαζί':'Φρουρά'}</button><button class="fg-button fg-small fg-promote" data-action="frog-command" data-id="${esc(f.id)}" data-command="promote" ${f.canPromote===false?'disabled':''}>${icon('crown')}Προαγωγή${f.promoteCost?` · ${whole(f.promoteCost)}`:''}</button></div></article>`;
      }).join(''):`<div class="fg-empty">${icon('group')}<h3>Η συμμορία ξεκινά από εσένα.</h3><p>Πλησίασε έναν ανεξάρτητο ή φοβισμένο βάτραχο και πάτησε ${key('E')} για να τον στρατολογήσεις.</p></div>`}</div>
      <div class="fg-panel-bottom">${key('X')} αναθέτει φρουρά κοντά σε βάση <span>Άφησε φρουρούς όταν βγαίνεις για κυνήγι.</span></div>`;
  }
  helpMarkup(){
    const rows=[['W A S D','Κίνηση σε σχέση με την κάμερα · σταθερή κατεύθυνση στην κάτοψη'],['Ποντίκι','Κάμερα και στόχευση · ελεύθερος δείκτης στην κάτοψη'],['C','Αλλαγή κάμερας: τρίτο → πρώτο πρόσωπο → κάτοψη'],['Ροδέλα','Απόσταση κάμερας / μεγέθυνση κάτοψης'],['SPACE','Άλμα σε φύλλα και βράχους'],['SHIFT','Γρήγορη κίνηση · καταναλώνει αντοχή'],['Z','Γρήγορη αποφυγή επίθεσης'],['LMB','Γλώσσα · πιάσε μύγες ή χτύπησε στόχο'],['RMB','Στόχευση / αμυντική στάση'],['Q','Εκτέλεση της επιλεγμένης ειδικής επίθεσης'],['1 / 2 / 3','Επιλογή ειδικής κίνησης'],['E','Στρατολόγηση, αλληλεπίδραση ή λεηλασία'],['R','Εκφοβισμός των αντιπάλων'],['F','Εναλλαγή εντολής συμμορίας: επίθεση / ακολουθήστε'],['X','Ανάθεση φρουράς / επιστροφή στην ομάδα'],['V','Κατασκευή και αναβάθμιση καταφυγίου'],['G','Τροφή από αποθέματα κοντά στη βάση'],['TAB','Συμμορία και χάρτης'],['ESC','Παύση / απελευθέρωση ποντικιού']];
    return this.panelHeader('ΚΡΑΤΗΣΕ ΤΑ ΔΑΧΤΥΛΑ ΚΟΝΤΑ ΣΤΟ WASD','Χειρισμός & επιβίωση')+`<div class="fg-help-grid"><div><h3>Χειρισμός</h3><dl class="fg-controls">${rows.map(([k,t])=>`<div><dt>${key(k)}</dt><dd>${t}</dd></div>`).join('')}</dl></div><div class="fg-guide"><h3>Το ταξίδι σου</h3><article><b>01 / Κυνήγησε</b><p>Τα σμήνη πάνω από σάπια φρούτα έχουν άφθονη τροφή. Το στομάχι κάθε βατράχου γεμίζει· παρακολούθησε την πείνα όλης της ομάδας.</p></article><article><b>02 / Οργάνωσε</b><p>Στρατολόγησε, προήγαγε και μοίρασε ρόλους. Κατασκεύασε φωλιές, αποθήκες και σκοπιές σε διαφορετικές περιοχές.</p></article><article><b>03 / Υπερασπίσου</b><p>Άφησε φρουρά όταν φεύγεις. Οι αντίπαλοι κάνουν επιδρομές για να κλέψουν αποθέματα, ιδιαίτερα τη νύχτα.</p></article><article><b>04 / Αντιμετώπισε τους θηρευτές</b><p>Διάβασε την προειδοποίηση της επίθεσης, άνοιξε την ομάδα και αντεπιτέσου. Η αριθμητική υπεροχή βοηθά, αλλά κανείς δεν είναι άτρωτος.</p></article><article><b>05 / Ένωσε τον ποταμό</b><p>Κατάστρεψε τις εχθρικές βάσεις ή πείσε τις συμμορίες να ενωθούν μαζί σου. Η δύναμη και οι νίκες σου αυξάνουν την επιρροή σου.</p></article><div class="fg-outline-guide"><span><i style="--legend:#9ee9a0"></i>Σύμμαχος</span><span><i style="--legend:#ef936d"></i>Αντίπαλος</span><span><i style="--legend:#f2ce73"></i>Θηρευτής</span></div></div></div>`;
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
      const s=large?7:5;ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x+s,y);ctx.lineTo(x+s,y+s);ctx.lineTo(x-s,y+s);ctx.lineTo(x-s,y);ctx.closePath();ctx.fill();ctx.stroke();
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
    const toast=document.createElement('div');toast.className=`fg-toast fg-toast-${kind}`;
    toast.innerHTML=`${icon(kind==='success'?'check':kind==='warning'||kind==='danger'?'eye':kind==='food'?'fly':'leaf')}<span>${esc(message)}</span>`;
    this.refs.toasts.append(toast);
    while(this.refs.toasts.children.length>4)this.refs.toasts.firstChild.remove();
    setTimeout(()=>{toast.classList.add('fg-toast-out');setTimeout(()=>toast.remove(),250);},kind==='warning'?6000:4200);
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
  destroy(){this.abort.abort();clearTimeout(this.saveTimer);this.root.remove();}
}
