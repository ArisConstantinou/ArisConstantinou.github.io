import {BAG_LIMIT,TIERS,SLOTS,LOOT_PATHS,itemStats,itemName,isPotion,salvageValue,STAT_LABELS,statText} from './loot.js';
import {engineMouse} from './engine-mouse.js';
import {protectGameplayGestures} from './gameplay-gestures.js';
const PATHS = {
  fire:'<path d="M13 2c1 5-4 5-2 9 1-2 3-2 4-4 1 3 5 5 5 9a8 8 0 0 1-16 0c0-4 3-6 4-9-1 4 1 5 2 5-2-5 3-6 3-10Z"/>',
  ...Object.fromEntries(Object.entries(LOOT_PATHS).map(([kind,path])=>['loot'+kind,`<path d="${path}"/>`])),
  rune: '<path d="M12 2 20.7 7v10L12 22l-8.7-5V7L12 2Z"/><path d="m12 5 5.8 3.4v6.8L12 19l-5.8-3.8V8.4L12 5Z"/><path d="M12 5v14M6.2 8.4 12 12l5.8-3.6M6.2 15.2 12 12l5.8 3.2"/>',
  grab: '<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5-7a1.5 1.5 0 0 1 3 0v7-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v6c0 4-2.5 6-6 6h-2c-2 0-3.5-1.1-4.5-2.5L4 13.8a1.6 1.6 0 0 1 2.4-2.1L8 13Z"/><path d="M2 4 3 3M20 3l1 1M2 8H1"/>',
  throw: '<path d="m5 19 13-13M10 5h9v9"/><path d="M4 12v7h7M5 5l2 2M13 19l2-2"/>',
  pulse: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3M5 19l3-3m8-8 3-3"/>',
  stomp: '<path d="M9 2h6v9l5 3v3H5v-4l4-2V2ZM2 21h7l2-2 2 3 3-2h6M7 5h8"/>',
  dash: '<path d="m14 3-7 10h6l-3 8 10-12h-7l1-6ZM2 6h5M1 11h4M3 17h3"/>',
  stone: '<path d="m5 8 7-5 7 5 2 8-6 5-10-3-2-6 2-4Z"/><path d="m5 8 7 3 7-3M12 11l3 10M5 18l7-7"/>',
  drop: '<path d="M12 3v13m-5-5 5 5 5-5M4 20h16"/>',
  shield: '<path d="m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5l8-3Z"/><path d="M12 6v11M8 10l4-4 4 4"/>',
  interact: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z"/><circle cx="12" cy="12" r="2"/>',
  scepter: '<path d="m7 21 8-14m-6 2 8 4M13 6l-1-4 6 1 3 5-5 1-3-3Z"/><path d="m6 19 3 2M15 3l-1 3 4 1"/>',
  portal: '<path d="M5 21V9a7 7 0 0 1 14 0v12M2 21h20M8 21V10a4 4 0 0 1 8 0v11"/><path d="m12 11-2 4h4l-2 4"/>',
  shard: '<path d="m12 2 6 6-2 11-6 3-5-12 7-8Z"/><path d="m12 2-2 10 6 7M5 10l5 2 8-4M10 12v10"/>',
  skull: '<path d="M6 16v-2a8 8 0 1 1 12 0v2l-3 1v4H9v-4l-3-1Z"/><circle cx="8.5" cy="10.5" r="1.5"/><circle cx="15.5" cy="10.5" r="1.5"/><path d="m11 15 1-2 1 2M12 18v3"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  mana: '<path d="M12 2C10 6 5 10 5 15a7 7 0 0 0 14 0c0-5-5-9-7-13Z"/><path d="M9 15a3 3 0 0 0 3 3"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  play: '<path d="m9 5 11 7-11 7V5Z"/>',
  sound: '<path d="M11 4 6 8H3v8h3l5 4V4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute: '<path d="M11 4 6 8H3v8h3l5 4V4Zm5 5 6 6m0-6-6 6"/>',
  arrow: '<path d="M3 12h17m-6-6 6 6-6 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  mouse: '<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 2v7M6 10h12"/>',
  book: '<path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/><path d="M5 8h3M5 12h3M16 8h3M16 12h3"/>',
  crown: '<path d="m3 6 4 5 5-8 5 8 4-5-3 14H6L3 6ZM6 16h12"/>',
};

function icon(name, className = '') {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true">${PATHS[name] || PATHS.rune}</svg>`;
}
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const formatNumber = (value) => Math.round(number(value)).toLocaleString('el-GR');
const clock = (seconds) => `${Math.floor(number(seconds) / 60)}:${String(Math.floor(number(seconds) % 60)).padStart(2, '0')}`;

function ability(action, name, glyph, key = '', extra = '') {
  return `<button class="ability ${extra}" type="button" data-action="${action}" aria-label="${name}"><span class="ability-disc">${icon(glyph)}${key ? `<span class="ability-key">${key === 'mouse' ? icon('mouse') : key}</span>` : ''}<span class="cooldown-number" hidden></span></span><span class="ability-name">${name}</span></button>`;
}

export function createUI(callbacks = {}) {
  const host = document.getElementById('magic-ui');
  const canvas = document.getElementById('game-canvas');
  if (!host || !canvas) throw new Error('Το MAGIC χρειάζεται τα #magic-ui και #game-canvas.');
  const abort = new AbortController();
  const signal = abort.signal;
  const keys = new Set();
  const actions = [];
  const stickStates = [];
  const shieldStates = [];
  const changed = new Map();
  let phase = 'menu';
  let modal = null;
  let modalReturnFocus = null;
  let loaded = false;
  let muted = false;
  let quality = 'high';
  let profile = { shards: 0, best: 0, runs: 0, wins: 0, upgrades: {} };
  let lastUpgrades = [];
  let touchShield = false;
  let mouseShield = false;
  let mouseFire=false,mouseButtons=0,enginePointer=null,pulseMounted=null;
  let touchFire=false;
  const firePointers=new Map();
  let pointerX = 0;
  let pointerY = 0;
  let pointerActive = false;
  let move = { x: 0, y: 0 };
  let dragPointer = null;
  let aimPointer = null;
  let holdingObject = false;
  let inventorySelected=null;
  let latestState = {};
  const coarseMedia = window.matchMedia('(pointer: coarse)');
  let touchMode = coarseMedia.matches || (navigator.maxTouchPoints > 0 && window.matchMedia('(hover: none)').matches);
  document.body.dataset.input = touchMode ? 'touch' : 'keyboard';

  host.innerHTML = `
    <div class="edge-shade"></div>
    <section class="screen menu-screen" id="menu-screen" aria-label="Αρχική οθόνη">
      <div class="menu-content">
        <div class="menu-rune">${icon('rune', 'rune')}<span class="overline">ΣΚΟΤΕΙΝΗ ΜΑΓΕΙΑ<br>ΔΥΝΑΜΗ ΤΟΥ ΝΟΥ</span></div>
        <h1 class="hero-title">MAGIC</h1>
        <h2 class="hero-subtitle">Ο Εξόριστος Μάγος</h2>
        <div class="fine-divider"></div>
        <p class="hero-description">Σου πήραν το βασίλειο.<br><strong>Δεν σου πήραν τη δύναμη.</strong><br>Πάτησε πάνω σε εχθρούς και συντρίμμια. Σύρε τα στον αέρα. Άφησε για ρίψη.${callbacks.fireEnabled?'<br>Πάρε φωτιά από πυρσούς ή πύρινους πυλώνες και άναψε ξύλινα αντικείμενα.':''}</p>
        <div class="mission-note">${icon('scepter')}<span>Νίκησε τους τέσσερις Φύλακες.<br>Κλέψε το Μαύρο Σκήπτρο και δραπέτευσε.</span></div>
        <div class="ritual-steps" aria-label="Πάτησε πάνω στο αντικείμενο, σύρε, άφησε για ρίψη"><span><b>1</b>ΠΑΤΗΣΕ</span><i>›</i><span><b>2</b>ΣΥΡΕ</span><i>›</i><span><b>3</b>ΑΦΗΣΕ ΓΙΑ ΡΙΨΗ</span></div>
        <div class="menu-actions">
          <button class="primary-button" id="start-button" type="button" disabled><span id="start-label">ΞΥΠΝΑ Η ΜΑΓΕΙΑ…</span>${icon('arrow')}</button>
          <div class="loading-line" id="loading-line"><div class="loading-fill" id="loading-fill"></div></div>
          <p class="loading-label" id="loading-label" role="status">Προετοιμασία του κάστρου…</p>
          <p class="loading-label" id="loading-download" role="status" aria-live="polite"></p>
          <button class="secondary-button" id="menu-upgrades" type="button"><span class="button-name">${icon('rune')}ΜΟΝΙΜΕΣ ΔΥΝΑΜΕΙΣ</span><span class="shard-pill" id="menu-shards">0 ◇</span></button>
          <button class="secondary-button" id="menu-inventory" type="button"><span class="button-name">${icon('book')}ΕΞΟΠΛΙΣΜΟΣ</span><kbd>I</kbd></button>
          <button class="secondary-button" id="menu-benchmark" type="button">ΕΛΕΓΧΟΣ ΑΠΟΔΟΣΗΣ · BENCHMARK</button>
          <div class="menu-footer"><button class="text-button" id="menu-help" type="button">Πώς παίζεται</button><button class="text-button" id="menu-mute" type="button">Ήχος ενεργός</button><button class="text-button" id="menu-quality" type="button">Γραφικά: υψηλά</button></div>
          <p class="menu-achievement" id="menu-achievement">Κάθε απόδραση σε κάνει ισχυρότερο.</p>
        </div>
      </div>
      <div class="menu-caption"><div class="overline">I · ΤΟ ΜΑΥΡΟ ΣΚΗΠΤΡΟ</div><p>«Ό,τι μπορείς να σηκώσεις,<br>μπορεί να γίνει όπλο.»</p></div>
    </section>

    <section class="hud" id="game-hud" hidden aria-label="Πληροφορίες παιχνιδιού">
      <header class="game-header">
        <div class="vitals-block" id="vitals-block"><div class="hud-brand-row"><span class="hud-wordmark">MAGIC</span><span class="zone-name" id="zone-name">Η εξωτερική αυλή</span><span id="fps-counter" class="fps-counter" aria-label="Καρέ ανά δευτερόλεπτο" aria-live="off">— FPS</span></div>
          <div class="vital-row">${icon('heart', 'vital-icon health-icon')}<div class="vital-track" role="meter" aria-label="Ζωή" aria-valuemin="0" aria-valuemax="100" id="health-meter"><div class="vital-fill health-fill" id="health-fill"></div></div><span class="vital-value" id="health-value">100</span></div>
          <div class="vital-row">${icon('mana', 'vital-icon mana-icon')}<div class="vital-track" role="meter" aria-label="Μαγική ενέργεια" aria-valuemin="0" aria-valuemax="100" id="mana-meter"><div class="vital-fill mana-fill" id="mana-fill"></div></div><span class="vital-value" id="mana-value">100</span></div>
        </div>
        <div class="header-tools"><button class="inventory-tool" id="hud-inventory" type="button" aria-label="Inventory και εξοπλισμός, I">${icon('book')}<span>ΣΑΚΟΣ</span><kbd>I</kbd></button><button class="icon-button" id="hud-mute" type="button" aria-label="Σίγαση ήχου" aria-pressed="false">${icon('sound')}</button><button class="icon-button" id="hud-pause" type="button" aria-label="Παύση παιχνιδιού">${icon('pause')}</button></div>
      </header>
      <div class="boss-track" id="boss-track" hidden><div class="boss-name" id="boss-name">Ο Φύλακας της Κρύπτης</div><div class="boss-bar"><span id="boss-fill"></span></div><div id="boss-channel"></div><div class="summon-bar" id="boss-channel-bar" hidden><span id="boss-channel-fill"></span></div></div>
      <div class="stone-status"><span id="stone-count">0 / 10 πέτρες</span><span id="goliath-state">7 κοντινές πέτρες → Goliath</span><div class="summon-bar" id="goliath-bar" hidden><span id="goliath-fill"></span></div></div>
      <div class="combo-display" id="combo-display" hidden><div class="combo-value" id="combo-value">×2</div><div class="combo-label">ΜΑΓΙΚΗ ΑΛΥΣΙΔΑ</div></div>
      <div class="held-state" id="held-state" hidden>${icon('grab')}<span id="held-text"></span></div>
      ${callbacks.fireEnabled?`<span class="fire-status" id="fire-status" hidden></span>`:''}
      ${callbacks.hearth?`<div class="hearth-status" id="hearth-status"><strong id="hearth-title">HEARTH BULWARK</strong><span id="hearth-state">Κοιμάται</span><div class="hearth-fuel" role="meter" aria-label="Φωτιά καρδιάς" aria-valuemin="0" aria-valuemax="100" id="hearth-meter"><i id="hearth-fill"></i></div><span id="hearth-charge">Πάρε φωτιά από πυρσό</span></div><div class="hearth-actions">${ability('flamethrower','ΠΥΡ','pulse','V')}</div>`:''}
      <div class="run-meta"><span class="run-stat" title="Θραύσματα αυτής της προσπάθειας">${icon('shard')}<span id="hud-shards">0</span></span><span class="run-stat" title="Εχθροί που νικήθηκαν">${icon('skull')}<span id="hud-kills">0</span></span><span class="run-stat time" id="hud-time">0:00</span></div>
      <div class="potion-tools"><button id="quick-health" data-potion="health" type="button" aria-label="Χρήση φίλτρου ζωής, 1">${icon('heart')}<span>ΖΩΗ <b id="health-potions">0</b></span><kbd>1</kbd></button><button id="quick-mana" data-potion="mana" type="button" aria-label="Χρήση φίλτρου ενέργειας, 2">${icon('mana')}<span>ΕΝΕΡΓΕΙΑ <b id="mana-potions">0</b></span><kbd>2</kbd></button></div>
      <div class="desktop-controls" aria-label="Δυνάμεις και πλήκτρα">
        ${ability('conjure', 'ΠΕΤΡΑ', 'stone', 'R')}
        ${ability('pulse', 'ΩΣΤΙΚΟ ΚΥΜΑ', 'pulse', 'F')}
        ${ability('dash', 'ΕΦΟΡΜΗΣΗ', 'dash', 'SPACE')}
      </div>
      <div class="movement-hint"><div class="wasd" aria-label="W A S D"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div><div class="movement-caption"><span id="movement-mode">ΜΑΓΟΣ</span><small id="movement-action">ΚΙΝΗΣΗ · W A S D</small></div></div>
      <div class="mouse-hint" aria-label="Χειρισμοί ποντικιού"><div class="mouse-caption"><b>ΑΡΙΣΤΕΡΟ</b><span id="mouse-left-label">Πιάσε · σύρε · άφησε</span></div><svg class="mouse-diagram" viewBox="0 0 64 96" aria-hidden="true"><path id="mouse-left" d="M32 4C17 4 8 15 8 30v12h24Z"/><path id="mouse-right" d="M32 4c15 0 24 11 24 26v12H32Z"/><path d="M8 42v26a24 24 0 0 0 48 0V42M29 15h6v15h-6Z"/></svg><div class="mouse-caption"><b>ΔΕΞΙ</b><span id="mouse-right-label">Κράτησε ασπίδα</span></div></div>
      <div class="touch-controls">
        <div class="joystick move-stick" id="move-stick" role="application" aria-label="Αριστερός μοχλός κίνησης"><span class="stick-knob"></span><span class="stick-label">ΚΙΝΗΣΗ</span></div>
        <div class="touch-actions">
          ${ability('conjure', 'ΠΕΤΡΑ', 'stone')}
          ${ability('pulse', 'ΚΥΜΑ', 'pulse')}
          ${ability('dash', 'ΕΦΟΔΟΣ', 'dash')}
        </div>
      </div>
    </section>

    <section class="screen overlay-screen" id="pause-screen" hidden><div class="panel pause-panel" role="dialog" aria-modal="true" aria-labelledby="pause-title">${icon('rune', 'rune')}<p class="panel-eyebrow">ΜΙΑ ΣΤΙΓΜΗ ΗΣΥΧΙΑΣ</p><h2 class="panel-title" id="pause-title">Η δύναμη περιμένει.</h2><p class="panel-description">Το κάστρο κρατά την ανάσα του.</p><div class="panel-buttons"><button class="primary-button" id="resume-button" type="button"><span>ΣΥΝΕΧΙΣΕ</span>${icon('play')}</button><button class="secondary-button" id="pause-restart" type="button"><span>ΝΕΑ ΠΡΟΣΠΑΘΕΙΑ</span>${icon('arrow')}</button></div><div class="settings-row"><button class="text-button" id="pause-status" type="button">Αποστολή & κατάσταση</button><button class="text-button" id="pause-help" type="button">Χειρισμός</button><button class="text-button" id="pause-mute" type="button">Ήχος ενεργός</button><button class="text-button" id="pause-quality" type="button">Γραφικά: υψηλά</button></div></div></section>

    <section class="screen overlay-screen" id="result-screen" hidden><div class="panel result-panel" id="result-panel" role="dialog" aria-modal="true" aria-labelledby="result-title"><div class="result-sigil" id="result-sigil">${icon('scepter')}</div><p class="panel-eyebrow" id="result-eyebrow">Η ΑΠΟΣΤΟΛΗ ΟΛΟΚΛΗΡΩΘΗΚΕ</p><h2 class="panel-title" id="result-title">Το σκήπτρο είναι δικό σου.</h2><p class="panel-description" id="result-description">Η πύλη έκλεισε. Η δύναμή σου μόλις μεγάλωσε.</p><div class="result-stats"><div class="result-stat"><strong id="result-shards">0</strong><span>ΘΡΑΥΣΜΑΤΑ</span></div><div class="result-stat"><strong id="result-kills">0</strong><span>ΕΧΘΡΟΙ</span></div><div class="result-stat"><strong id="result-time">0:00</strong><span>ΧΡΟΝΟΣ</span></div></div><div class="score-line"><span>Βαθμολογία <strong id="result-score">0</strong></span><span>Ρεκόρ <strong id="result-best">0</strong></span></div><p class="result-reason" id="result-reason" hidden></p><div class="panel-buttons"><button class="primary-button" id="result-restart" type="button"><span>ΑΚΟΜΗ ΜΙΑ ΕΙΣΒΟΛΗ</span>${icon('arrow')}</button><button class="secondary-button" id="result-upgrades" type="button"><span class="button-name">${icon('rune')}ΜΟΝΙΜΕΣ ΔΥΝΑΜΕΙΣ</span><span class="shard-pill" id="result-wallet">0 ◇</span></button></div><button class="text-button" id="result-menu" type="button">Επιστροφή στην αρχή</button></div></section>

    <section class="screen overlay-screen" id="modal-screen" hidden><div class="panel upgrades-panel" id="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button panel-close" id="modal-close" type="button" aria-label="Κλείσιμο">${icon('close')}</button><div id="modal-content"></div></div></section>
    <div class="throw-mark" id="throw-mark" hidden aria-hidden="true"><i></i><b></b></div>
  `;

  const $ = (id) => document.getElementById(id);
  const el = Object.fromEntries([...host.querySelectorAll('[id]')].map((node) => [node.id, node]));
  const contextUse=document.createElement('button');contextUse.id='context-use';contextUse.className='context-use';contextUse.type='button';contextUse.hidden=true;contextUse.innerHTML=icon('interact')+'<span></span><kbd>E</kbd>';host.append(contextUse);
  const allAbilities = [...host.querySelectorAll('[data-action]')];
  const byAction = (name) => allAbilities.filter((button) => button.dataset.action === name);
  const actionGroups = Object.fromEntries(['conjure', 'drop', 'pulse', 'dash', 'shield', 'interact','fire'].map((name) => [name, byAction(name)]));
  const text = (id, value) => { const output = String(value ?? ''); if (changed.get(id) !== output) { el[id].textContent = output; changed.set(id, output); } };
  const listen = (node, type, handler, options = {}) => node.addEventListener(type, handler, { ...options, signal });
  const live = () => phase === 'playing' && !modal;
  protectGameplayGestures({document,signal,active:()=>{
    const benchmark=document.getElementById('benchmark-panel');
    return live()&&(!benchmark||benchmark.classList.contains('is-running'));
  }});
  const prevent = (event) => { event.preventDefault(); event.stopPropagation(); };
  const invoke = (name, ...args) => { if (typeof callbacks[name] === 'function') return callbacks[name](...args); };

  const dragInfo = (event) => ({ pointerId: event.pointerId, clientX: event.clientX, clientY: event.clientY, pointerType: event.pointerType, timeStamp: event.timeStamp });
  function releaseDragCapture(info) {
    if (canvas.hasPointerCapture?.(info.pointerId)) canvas.releasePointerCapture(info.pointerId);
  }
  function cancelDrag(event) {
    if (!dragPointer || (event?.pointerId !== undefined && event.pointerId !== dragPointer.pointerId)) return;
    const info = event?.pointerId !== undefined ? dragInfo(event) : dragPointer;
    dragPointer = null;
    document.body.classList.remove('is-dragging');
    pointerActive = false;
    invoke('onDragCancel', info);
    releaseDragCapture(info);
  }
  function cancelAim(event) {
    if (!aimPointer || (event?.pointerId !== undefined && event.pointerId !== aimPointer.pointerId)) return;
    const info = aimPointer;
    aimPointer = null; pointerActive = false;
    releaseDragCapture(info);
  }
  function setPointer(info) {
    pointerX = info.clientX; pointerY = info.clientY; pointerActive = true;
    invoke('onAim', info);
  }
  function cancelPointer(event) { cancelDrag(event); cancelAim(event); }

  let conjurePointer=null;
  function clearInput() {
    invoke('onConjureCancel');
    if(conjurePointer){const {node,id}=conjurePointer;conjurePointer=null;node.classList.remove('is-held');if(node.hasPointerCapture?.(id))node.releasePointerCapture(id);}
    cancelPointer();
    keys.clear(); actions.length = 0; move = { x: 0, y: 0 };
    mouseShield = false; touchShield = false; pointerActive = false;mouseFire=false;mouseButtons=0;
    if(enginePointer!==null&&canvas.hasPointerCapture?.(enginePointer))canvas.releasePointerCapture(enginePointer);enginePointer=null;
    touchFire=false;for(const [button,id] of firePointers){if(button.hasPointerCapture?.(id))button.releasePointerCapture(id);button.classList.remove('is-held');}firePointers.clear();
    for (const stick of stickStates) {
      if (stick.id !== null && stick.node.hasPointerCapture?.(stick.id)) stick.node.releasePointerCapture(stick.id);
      stick.id = null; stick.knob.style.transform = 'translate(0px, 0px)';
    }
    for (const shield of shieldStates) {
      const pointerId = shield.id; shield.id = null;
      if (pointerId !== null && shield.node.hasPointerCapture?.(pointerId)) shield.node.releasePointerCapture(pointerId);
      shield.node.classList.remove('is-held');
    }
  }

  function setPhase(next) {
    document.body.classList.remove('is-status-open');
    el['throw-mark'].hidden = true;
    clearInput(); phase = next; modal = null; el['modal-screen'].hidden = true;
    el['menu-screen'].hidden = next !== 'menu';
    el['game-hud'].hidden = next !== 'playing' && next !== 'paused';
    el['pause-screen'].hidden = next !== 'paused';
    el['result-screen'].hidden = next !== 'result';
    document.body.classList.toggle('is-playing', next === 'playing');
  }

  function requestPause() {
    if (!live()) return;
    clearInput();
    if (callbacks.onPause) invoke('onPause'); else actions.push('pause');
  }

  function requestResume() {
    clearInput();
    if (callbacks.onResume) invoke('onResume'); else showPause(false);
  }

  function updateProfile(next) {
    if (next) profile = { ...profile, ...next };
    text('menu-shards', `${formatNumber(profile.shards)} ◇`);
    text('result-wallet', `${formatNumber(profile.shards)} ◇`);
    text('menu-achievement', number(profile.runs) > 0 ? `${formatNumber(profile.wins)} αποδράσεις · ${formatNumber(profile.runs)} εισβολές · Ρεκόρ ${formatNumber(profile.best)}` : 'Κάθε απόδραση σε κάνει ισχυρότερο.');
  }

  function setMuted(value) {
    muted = Boolean(value);
    for (const id of ['menu-mute', 'pause-mute']) text(id, muted ? 'Ήχος κλειστός' : 'Ήχος ενεργός');
    el['hud-mute'].innerHTML = icon(muted ? 'mute' : 'sound');
    el['hud-mute'].setAttribute('aria-pressed', String(muted));
    el['hud-mute'].setAttribute('aria-label', muted ? 'Ενεργοποίηση ήχου' : 'Σίγαση ήχου');
  }

  function toggleMute() { setMuted(!muted); invoke('onMute', muted); }
  function setQuality(value) {
    quality = value === 'low' || value === 'performance' ? 'low' : 'high';
    for (const id of ['menu-quality', 'pause-quality']) text(id, quality === 'low' ? 'Γραφικά: ομαλά' : 'Γραφικά: υψηλά');
  }
  function toggleQuality() { setQuality(quality === 'high' ? 'low' : 'high'); invoke('onQuality', quality); }

  function openModal(kind, contents) {
    document.body.classList.toggle('is-status-open', kind === 'status');
    el['throw-mark'].hidden = true;
    clearInput(); modalReturnFocus = document.activeElement; modal = kind;
    el['modal-content'].innerHTML = contents;
    el['modal-panel'].className = `panel ${kind === 'help' ? 'help-panel' : 'upgrades-panel'}`;
    el['modal-screen'].hidden = false;
    el['modal-screen'].scrollTop = 0;
    el['modal-close'].focus({ preventScroll: true });
  }

  function hideModal() {
    document.body.classList.remove('is-status-open');
    document.body.classList.remove('is-inventory-open');
    el['modal-screen'].hidden = true; modal = null; clearInput();
    if (modalReturnFocus?.isConnected && !modalReturnFocus.closest('[hidden]')) modalReturnFocus.focus({ preventScroll: true });
    modalReturnFocus = null;
    invoke('onInventoryClose');
  }

  function showInventory(nextProfile,stats,selectedId=inventorySelected){
    updateProfile(nextProfile);const loot=nextProfile.loot;
    const glyph=Object.fromEntries(Object.keys(LOOT_PATHS).map(kind=>[kind,'loot'+kind]));
    const selected=loot.items.find(i=>i.id===selectedId)||loot.items[0];inventorySelected=selected?.id;
    const itemButton=(item,equipped=false)=>`<button type="button" class="loot-slot ${item.id===inventorySelected?'selected':''}" data-item="${item.id}" aria-pressed="${item.id===inventorySelected}" style="--tier:${TIERS[item.level].color}" aria-label="${esc(itemName(item))}, επίπεδο ${item.level}">${icon(glyph[item.kind])}<span class="loot-level">Lv ${item.level}</span>${item.count>1?`<b class="loot-count">×${item.count}</b>`:''}${equipped?'<span class="loot-worn">◆</span>':''}</button>`;
    const equipment=Object.entries(SLOTS).map(([kind,label])=>{const item=loot.items.find(i=>i.id===loot.equipped[kind]);return `<div class="equipment-slot"><span>${label}</span>${item?itemButton(item,true):`<div class="loot-slot empty" aria-label="${label}: κενό">${icon(glyph[kind])}<small>Κενό</small></div>`}</div>`;}).join('');
    const slots=loot.items.map(i=>itemButton(i,Object.values(loot.equipped).includes(i.id))).join('')+Array.from({length:BAG_LIMIT-loot.items.length},()=>'<div class="loot-slot empty" aria-hidden="true"></div>').join('');
    const worn=selected&&loot.equipped[selected.kind]===selected.id;
    const current=selected?loot.items.find(i=>i.id===loot.equipped[selected.kind]):null;
    const previous=itemStats(current),attributes=selected?itemStats(selected):{};
    const comparison=selected&&!isPotion(selected)?Object.keys(STAT_LABELS).filter(key=>attributes[key]||previous[key]).map(key=>{const value=attributes[key]||0,diff=value-(previous[key]||0);return `<li><span>${STAT_LABELS[key]}</span><b>+${statText(key,value)}</b>${!worn?`<small class="${diff>=0?'gain':'loss'}">${diff>=0?'+':'−'}${statText(key,Math.abs(diff))}</small>`:''}</li>`;}).join(''):'';
    const potency=selected&&isPotion(selected)?Math.round((selected.kind==='health'?stats.maxHp:stats.maxMana)*(.25+.05*selected.level)+10):0;
    const contents=`<p class="panel-eyebrow">Ο ΕΞΟΠΛΙΣΜΟΣ ΣΟΥ ΜΕΝΕΙ ΜΑΖΙ ΣΟΥ</p><h2 class="panel-title" id="modal-title">Ο σάκος του μάγου</h2><div class="inventory-summary"><span>${loot.items.length} / ${BAG_LIMIT} θέσεις</span><span>${icon('shard')}${formatNumber(profile.shards)} θραύσματα</span></div><div class="inventory-layout"><section class="inventory-character"><h3>Εξοπλισμός</h3><div class="equipment-grid">${equipment}</div><div class="character-stats"><span>Ζωή <b>${Math.round(stats.hp)} / ${stats.maxHp}</b></span><span>Ενέργεια <b>${Math.round(stats.mana)} / ${stats.maxMana}</b></span><span>Μαγική ζημιά <b>+${statText('damage',stats.gear.damage)}</b></span><span>Κίνηση <b>+${statText('speed',stats.gear.speed)}</b></span><span>Αναμονή <b>−${statText('cooldown',stats.gear.cooldown)}</b></span></div><p class="inventory-note">Ο εξοπλισμός λειτουργεί αμέσως. Τα φίλτρα καταναλώνονται όταν τα χρησιμοποιείς.</p></section><section class="inventory-bag"><h3>Αντικείμενα</h3><div class="inventory-grid">${slots}</div><div class="tier-legend">${TIERS.slice(1).map((tier,i)=>`<span style="--tier:${tier.color}"><i></i>${i+1} ${tier.name}</span>`).join('')}</div>${!loot.items.length?'<p class="inventory-note">Νίκησε εχθρούς και πλησίασε τα λαμπερά drops για να τα συλλέξεις.</p>':''}</section><section class="inventory-detail" style="--tier:${selected?TIERS[selected.level].color:'#aebbbf'}">${selected?`<div class="item-art">${icon(glyph[selected.kind])}</div><span class="item-tier">${TIERS[selected.level].name} · Επίπεδο ${selected.level}</span><h3>${esc(itemName(selected))}</h3>${isPotion(selected)?`<p>Αναπληρώνει έως <strong>${potency}</strong> ${selected.kind==='health'?'ζωή':'ενέργεια'}.</p><button class="primary-button" data-loot-action="use" data-id="${selected.id}" ${stats.usable?'':'disabled'}>ΧΡΗΣΗ ΦΙΛΤΡΟΥ</button>`:`<ul class="item-attributes">${comparison}</ul><p class="inventory-note">${worn?'Φορεμένο · τα bonuses περιλαμβάνονται στα στατιστικά σου.':'Οι πράσινες/κόκκινες τιμές συγκρίνουν με ό,τι φοράς στη θέση αυτή.'}</p><button class="primary-button" data-loot-action="${worn?'unequip':'equip'}" data-id="${selected.id}">${worn?'ΑΦΑΙΡΕΣΗ':'ΕΞΟΠΛΙΣΜΟΣ'}</button><button class="secondary-button salvage-button" data-loot-action="salvage" data-id="${selected.id}" ${worn?'disabled':''}>ΔΙΑΛΥΣΗ · ${salvageValue(selected)} ◇</button>`}`:'<div class="item-art">'+icon('book')+'</div><h3>Η επόμενη δύναμή σου</h3><p>Επίλεξε ένα αντικείμενο για χαρακτηριστικά και σύγκριση.</p>'}</section></div><p class="inventory-storage">${nextProfile.storageAvailable===false?'Ο browser δεν επιτρέπει αποθήκευση. Η πρόοδος μένει μόνο σε αυτή τη συνεδρία.':'Inventory και εξοπλισμός αποθηκεύονται αυτόματα, ακόμη και μετά τον θάνατο.'}</p>`;
    if(modal==='inventory'){el['modal-content'].innerHTML=contents;el['modal-content'].querySelector(`[data-item="${inventorySelected}"]`)?.focus({preventScroll:true});}
    else openModal('inventory',contents);
    el['modal-panel'].className='panel inventory-panel';document.body.classList.add('is-inventory-open');
  }

  function showHelp() {
    if (phase === 'playing') { requestPause(); if (phase === 'playing') showPause(true); }
    openModal('help', `<p class="panel-eyebrow">Η ΤΕΧΝΗ ΤΗΣ ΤΗΛΕΚΙΝΗΣΗΣ</p><h2 class="panel-title" id="modal-title">Η δύναμη ακολουθεί το χέρι σου.</h2><ol class="help-list"><li><span class="step-index">1</span><div><strong>Πάτησε πάνω στο αντικείμενο.</strong><p>${touchMode ? 'Κινήσου με τον αριστερό μοχλό. Με άλλο δάχτυλο πάτησε πάνω στο αντικείμενο ή στον φρουρό που θέλεις να σηκώσεις.' : 'Κινήσου με W A S D. Κράτησε πατημένο το αριστερό κουμπί πάνω στο αντικείμενο ή στον φρουρό που θέλεις να σηκώσεις.'} Πλησίασε τον στόχο ώστε να τον φτάνει η μαγεία σου.</p></div></li><li><span class="step-index">2</span><div><strong>Σύρε. Άφησε για ρίψη.</strong><p>Όσο κρατάς πατημένο, μετακινείς το αντικείμενο ζωντανά στον αέρα. Άφησε για να το εκτοξεύσεις. Η θέση του δείκτη ή του δαχτύλου ορίζει την κατεύθυνση. Το γρήγορο σύρσιμο δίνει περισσότερη δύναμη στη ρίψη. Μπορείς να στοχεύεις και πάνω σε κενό έδαφος. Χτύπα εχθρούς με εχθρούς και συντρίμμια.</p></div></li><li><span class="step-index">3</span><div><strong>Πάρε το Μαύρο Σκήπτρο.</strong><p>Νίκησε τους τέσσερις φύλακες του κάστρου και χρησιμοποίησε ${touchMode ? 'το εικονίδιο κάτω από τον χαρακτήρα' : 'το E'} κοντά στο σκήπτρο. Το κάστρο θα σημάνει συναγερμό.</p></div></li><li><span class="step-index">4</span><div><strong>Βρες τον δρόμο της επιστροφής.</strong><p>Γύρισε στη φωτεινή πύλη για να διαφύγεις. Τα θραύσματα ξεκλειδώνουν μόνιμες δυνάμεις για τις επόμενες εισβολές.</p></div></li></ol>${latestState.hearth?.occupied ? `<p class="panel-description">HEARTH: WASD για βάδισμα · αριστερό κλικ / R για πυρ · δεξί κλικ / F για πάτημα · E για είσοδο / έξοδο. Στο mobile κράτησε ΠΥΡ, πάτησε ΠΑΤΗΜΑ ή ΕΞΟΔΟΣ.</p>` : ''}${latestState.hearth?.occupied ? `<div class="help-controls"><div class="help-control"><kbd>W A S D</kbd>Βάδισμα μηχανής</div><div class="help-control"><kbd>R / ΑΡΙΣΤΕΡΟ ΚΛΙΚ</kbd>Κράτησε για φλογοβόλο</div><div class="help-control"><kbd>F / ΔΕΞΙ ΚΛΙΚ</kbd>Πάτημα εδάφους</div><div class="help-control"><kbd>E</kbd>Είσοδος / έξοδος από τη μηχανή</div><div class="help-control"><kbd>ESC / P</kbd>Παύση</div></div>` : `<div class="help-controls"><div class="help-control"><kbd>${touchMode ? 'ΠΕΤΡΑ' : 'R'}</kbd>Πέτρα έως 10 · κράτησε με 7 για Goliath</div><div class="help-control"><kbd>${touchMode ? 'ΠΡΟΣ ΤΟΝ ΜΑΓΟ' : 'ΔΕΞΙ ΚΛΙΚ'}</kbd>Ασπίδα με το σηκωμένο αντικείμενο</div><div class="help-control"><kbd>${touchMode ? 'ΚΥΜΑ' : 'F'}</kbd>Ωστικό κύμα</div><div class="help-control"><kbd>${touchMode ? 'ΕΦΟΔΟΣ' : 'SPACE'}</kbd>Εφόρμηση</div><div class="help-control"><kbd>${touchMode ? 'Ⅱ' : 'ESC / P'}</kbd>Παύση</div></div>`}`);
  }

  function requestUpgrades() {
    if (callbacks.onUpgrades) invoke('onUpgrades'); else showUpgrades(profile, lastUpgrades);
  }

  function showUpgrades(nextProfile, upgrades = []) {
    updateProfile(nextProfile); lastUpgrades = upgrades;
    const symbols = ['grab', 'mana', 'heart', 'pulse', 'shield', 'dash'];
    const rows = upgrades.map((upgrade, index) => {
      const level = number(upgrade.level); const max = Math.max(1, number(upgrade.max, 3));
      const cost = number(upgrade.cost); const maxed = level >= max; const affordable = number(profile.shards) >= cost;
      const levels = Array.from({ length: Math.min(10, max) }, (_, i) => `<i class="${i < level ? 'active' : ''}"></i>`).join('');
      return `<div class="upgrade-row">${icon(symbols[index % symbols.length], 'upgrade-symbol')}<div><h3 class="upgrade-title">${esc(upgrade.title)}</h3><p class="upgrade-description">${esc(upgrade.description)}</p><div class="upgrade-level" aria-label="Επίπεδο ${level} από ${max}">${levels}</div></div><button class="upgrade-buy" type="button" data-upgrade="${esc(upgrade.id)}" ${maxed || !affordable ? 'disabled' : ''} aria-label="${maxed ? 'Ολοκληρωμένη αναβάθμιση' : `Αναβάθμιση ${esc(upgrade.title)} για ${cost} θραύσματα`}">${maxed ? 'ΠΛΗΡΕΣ' : `${formatNumber(cost)} ◇`}</button></div>`;
    }).join('');
    openModal('upgrades', `<p class="panel-eyebrow">Ο,ΤΙ ΚΕΡΔΙΣΕΣ ΜΕΝΕΙ ΜΑΖΙ ΣΟΥ</p><h2 class="panel-title" id="modal-title">Μόνιμες δυνάμεις</h2><p class="panel-description">Επένδυσε τα θραύσματά σου. Επίστρεψε ισχυρότερος στην επόμενη εισβολή.</p><div class="upgrade-wallet">${icon('shard')}<span>${formatNumber(profile.shards)} διαθέσιμα θραύσματα</span></div><div class="upgrade-list">${rows || '<p class="upgrade-empty">Οι δυνάμεις θα εμφανιστούν μόλις ολοκληρωθεί η προετοιμασία του κάστρου.</p>'}</div>`);
  }

  function showPause(paused) {
    setPhase(paused ? 'paused' : 'playing');
    if (paused) el['resume-button'].focus({ preventScroll: true });
  }

  function showResult(result = {}, nextProfile) {
    updateProfile(nextProfile); setPhase('result');
    const won = Boolean(result.won);
    el['result-panel'].classList.toggle('won', won);
    el['result-sigil'].innerHTML = icon(won ? 'scepter' : 'rune');
    text('result-eyebrow', won ? 'Η ΑΠΟΔΡΑΣΗ ΠΕΤΥΧΕ' : 'Η ΕΙΣΒΟΛΗ ΤΕΛΕΙΩΣΕ');
    text('result-title', won ? 'Το σκήπτρο είναι δικό σου.' : 'Το κάστρο σε σταμάτησε.');
    text('result-description', won ? 'Πέρασες την πύλη. Άφησες πίσω συντρίμμια. Επέστρεψες με τη δύναμη.' : 'Μάθε τα περάσματα. Δυνάμωσε τη μαγεία σου. Η επόμενη εισβολή αρχίζει με σένα.');
    text('result-shards', formatNumber(result.shards)); text('result-kills', formatNumber(result.kills)); text('result-time', clock(result.time));
    text('result-score', formatNumber(result.score)); text('result-best', formatNumber(result.best ?? profile.best));
    text('result-reason', result.reason || ''); el['result-reason'].hidden = !result.reason;
    el['result-restart'].focus({ preventScroll: true });
  }

  function setLoading(progress, label) {
    callbacks.onLoading?.(label);
    const raw = number(progress); const percent = Math.max(0, Math.min(100, raw <= 1 ? raw * 100 : raw));
    el['loading-fill'].style.width = `${percent}%`;
    if (label) text('loading-label', label);
  }

  function ready() {
    $('loading-download').hidden=true;
    loaded = true; el['start-button'].disabled = false;
    text('start-label','ΜΠΕΣ ΣΤΟ ΚΑΣΤΡΟ');
    el['loading-fill'].style.width = '100%'; el['loading-line'].hidden = true;
    text('loading-label', `Έκδοση ${callbacks.version || ''} · Πάτησε · σύρε · άφησε για ρίψη`);
  }

  function showMenu(nextProfile) { updateProfile(nextProfile); setPhase('menu'); }
  function start() { setPhase('playing'); }

  function showStatus() {
    const s = latestState, h = s.hearth;
    const section = (title, body) => `<section class="status-section"><h3>${esc(title)}</h3>${body}</section>`;
    openModal('status', `<p class="panel-eyebrow">ΕΚΔΟΣΗ ${esc(callbacks.version || '')}</p><h2 class="panel-title" id="modal-title">Αποστολή & κατάσταση</h2>`
      + section('Η αποστολή σου', `<p>${esc(s.objective || s.goal)}</p>`)
      + (h ? section('Στολή μάχης · HEARTH BULWARK', `<p>Τοποθεσία: <strong>${esc(h.roomLabel)}</strong></p><p>${esc(el['hearth-state'].textContent)}</p><p>Καρδιά <strong>${h.endless&&h.fuel>0?"∞":Math.ceil(h.fuel)+"%"}</strong></p><p>Πάρε φλόγα από πυρσό. Στη στολή πάτησε ΦΟΡΤΙΣΗ κάτω από τον χαρακτήρα, έπειτα ΕΙΣΟΔΟΣ. Μέσα στη στολή: αριστερό κλικ / R ή κράτησε ΠΥΡ για φλογοβόλο, δεξί κλικ / F ή ΠΑΤΗΜΑ για χτύπημα εδάφους. Μόνο E για είσοδο / έξοδο στο πληκτρολόγιο. Στο mobile χρησιμοποίησε ΕΞΟΔΟΣ ή το εικονίδιο κάτω από τον χαρακτήρα. Η αναμμένη καρδιά έχει απεριόριστη ενέργεια.</p>`) : '')
      + section('Πέτρες & Goliath', `<p>${esc(el['stone-count'].textContent)} · ${esc(el['goliath-state'].textContent)}</p><p>Με 7 κοντινές πέτρες, κράτησε ΠΕΤΡΑ για 2 δευτερόλεπτα.</p>`)
      + (callbacks.fireEnabled ? section('Φλόγα', `<p>${s.fireCharged ? 'Η φλόγα είναι έτοιμη. Σήκωσε ξύλο για να το ανάψεις ή πλησίασέ το και πάτησε ΑΝΑΨΕ κάτω από τον χαρακτήρα.' : 'Πλησίασε αναμμένο πυρσό ή πύρινο πυλώνα και πάτησε ΦΩΤΙΑ κάτω από τον χαρακτήρα.'}</p>`) : '')
      + section('Αυτή η προσπάθεια', `<p>${formatNumber(s.shards)} θραύσματα · ${formatNumber(s.kills)} εχθροί · ${clock(s.time)}</p>`)
      + section('Ρίψη', '<p>Κράτησε αντικείμενο ή ευάλωτο εχθρό και σύρε. Το σημάδι δείχνει τον στόχο. Άφησε το δάχτυλο για ρίψη· το γρήγορο σύρσιμο αυξάνει την ισχύ. Για ασπίδα, σύρε γρήγορα προς τον μάγο στο κινητό ή κράτησε δεξί κλικ στον υπολογιστή.</p>'));
    el['modal-panel'].className = 'panel status-panel';
  }

  function updateThrowMark(mark) {
    const visible = touchMode && phase === 'playing' && !modal && mark?.visible;
    el['throw-mark'].hidden = !visible;
    if (!visible) return;
    el['throw-mark'].style.left = `${mark.x}px`;
    el['throw-mark'].style.top = `${mark.y}px`;
    el['throw-mark'].classList.toggle('blocked', Boolean(mark.blocked));
  }

  function update(state = {}) {
    if(Boolean(latestState.hearth?.occupied)!==Boolean(state.hearth?.occupied))clearInput();
    latestState = state;
    const mounted = Boolean(state.hearth?.occupied);
    text('movement-mode',mounted?'HEARTH':'ΜΑΓΟΣ');text('movement-action',mounted?'ΒΑΔΙΣΜΑ · W A S D':'ΚΙΝΗΣΗ · W A S D');
    text('mouse-left-label',mounted?'Κράτησε φλογοβόλο':'Πιάσε · σύρε · άφησε');
    text('mouse-right-label',mounted?'Πάτημα εδάφους':'Κράτησε ασπίδα');
    el['mouse-left'].classList.toggle('pressed',mouseFire||!!dragPointer);
    el['mouse-right'].classList.toggle('pressed',!!(mouseButtons&2));
    for(const kbd of host.querySelectorAll('.wasd kbd'))kbd.classList.toggle('pressed',keys.has('Key'+kbd.textContent));
    if(pulseMounted!==mounted){pulseMounted=mounted;
      for(const b of actionGroups.pulse){b.querySelector('.ability-name').textContent=mounted?'ΠΑΤΗΜΑ':b.closest('.desktop-controls')?'ΩΣΤΙΚΟ ΚΥΜΑ':'ΚΥΜΑ';b.querySelector('.ability-disc svg').innerHTML=PATHS[mounted?'stomp':'pulse'];const key=b.querySelector('.ability-key');if(key)key.textContent=mounted?'F / RMB':'F';b.setAttribute('aria-label',mounted?'Πάτημα εδάφους, δεξί κλικ ή F':'Ωστικό κύμα, F');}
      for(const b of actionGroups.conjure){b.querySelector('.ability-name').textContent=mounted?'ΠΥΡ':'ΠΕΤΡΑ';b.querySelector('.ability-disc svg').innerHTML=PATHS[mounted?'fire':'stone'];const key=b.querySelector('.ability-key');if(key)key.textContent=mounted?'R / LMB':'R';}
      for(const b of actionGroups.dash){b.querySelector('.ability-name').textContent=mounted?'ΕΞΟΔΟΣ':b.closest('.desktop-controls')?'ΕΦΟΡΜΗΣΗ':'ΕΦΟΔΟΣ';b.querySelector('.ability-disc svg').innerHTML=PATHS[mounted?'portal':'dash'];const key=b.querySelector('.ability-key');if(key)key.textContent=mounted?'E':'SPACE';b.setAttribute('aria-label',mounted?'Έξοδος από τη μηχανή, E':'Εφόρμηση, Space');}
    }
    el['game-hud'].classList.toggle('is-mounted', mounted);
    const fireControl = host.querySelector('.fire-sample-control');
    if (fireControl) fireControl.classList.toggle('mobile-unavailable', mounted || !state.fireAvailable);
    const hearthActions = host.querySelector('.hearth-actions');
    if (hearthActions) {hearthActions.hidden=true;}
    if(callbacks.hearth&&state.hearth){const h=state.hearth;const labels={sleep:'Κοιμάται · κρύα καρδιά',waking:'Ξυπνά…',ready:'Έτοιμη για είσοδο',boarding:'Είσοδος από τη σκάλα',piloted:'Οδηγείς τη στολή',exiting:'Έξοδος από τη σκάλα',depleting:'Η καρδιά άδειασε'};text('hearth-state',labels[h.state]+(h.occupied?'':' · '+h.roomLabel));text('hearth-charge',state.fireCharged?'Αποθηκευμένη φλόγα · E στην καρδιά':`Καρδιά ${h.endless&&h.fuel>0?"∞":Math.ceil(h.fuel)+"%"}`);el['hearth-fill'].style.width=h.fuel+'%';el['hearth-meter'].setAttribute('aria-valuenow',String(Math.round(h.fuel)));el['hearth-meter'].setAttribute('aria-valuetext',h.endless&&h.fuel>0?'Απεριόριστη ενέργεια':Math.round(h.fuel)+'%');el['hearth-status'].hidden=false;for(const b of byAction('fire'))b.disabled=!state.fireAvailable;for(const b of byAction('flamethrower'))b.disabled=h.state!=='piloted'||state.holding;for(const b of actionGroups.dash)b.disabled=h.occupied&&h.state!=='piloted';for(const b of actionGroups.pulse)b.disabled=h.occupied&&h.state!=='piloted';}
    if (state.hp !== undefined) {
      const hp = Math.max(0, number(state.hp)); const maxHp = Math.max(1, number(state.maxHp, 100));
      el['health-fill'].style.width = `${Math.min(1, hp / maxHp) * 100}%`;
      text('health-value', state.unlimitedHealth?'∞':Math.ceil(hp)); el['health-meter'].setAttribute('aria-valuenow', String(Math.ceil(hp))); el['health-meter'].setAttribute('aria-valuemax', String(maxHp));
      if(state.unlimitedHealth)el['health-meter'].setAttribute('aria-valuetext','Απεριόριστη ζωή');else el['health-meter'].removeAttribute('aria-valuetext');
      el['vitals-block'].classList.toggle('low-health', hp > 0 && hp / maxHp < .27);
    }
    if (state.mana !== undefined) {
      const mana = Math.max(0, number(state.mana)); const maxMana = Math.max(1, number(state.maxMana, 100));
      el['mana-fill'].style.width = `${Math.min(1, mana / maxMana) * 100}%`;
      text('mana-value', Math.ceil(mana)); el['mana-meter'].setAttribute('aria-valuenow', String(Math.ceil(mana))); el['mana-meter'].setAttribute('aria-valuemax', String(maxMana));
    }
    if (state.zone !== undefined) text('zone-name', state.zone);
    if('fps' in state){text('fps-counter',Number.isFinite(state.fps)?state.fps+' FPS':'— FPS');el['fps-counter'].classList.toggle('is-low',Number.isFinite(state.fps)&&state.fps<30);}
    text('hud-shards', formatNumber(state.shards)); text('hud-kills', formatNumber(state.kills)); text('hud-time', clock(state.time));
    const holding = Boolean(state.holding); const target = state.targetName;
    const dragging = holding && Boolean(state.dragging || dragPointer);
    holdingObject = holding;
    el['held-state'].hidden = !holding && !target;
    el['held-state'].classList.toggle('target', !holding);
    el['held-state'].classList.toggle('is-shielding',!!state.shielding);
    text('held-text', holding ? state.shielding ? (state.heldName || 'ΑΣΠΙΔΑ') : `${state.heldName || 'Στα χέρια σου'} · ${dragging ? 'άφησε για ρίψη' : 'πάτησέ το και σύρε'}` : (target ? `${target} · πάτησε και κράτησε` : ''));
    for (const button of actionGroups.drop) {
      button.disabled = !holding;
      button.setAttribute('aria-label', 'Άφησε το αντικείμενο χωρίς ρίψη');
    }
    for(const button of actionGroups.fire){
      button.disabled=!state.fireAvailable;
      button.classList.toggle('is-charged',!!state.fireCharged);
      text('fire-status',state.fireCharged?'Φωτιά έτοιμη':state.fireAvailable?'Πάρε φωτιά':'Πλησίασε πυρσό / πυλώνα');
    }
    for (const button of actionGroups.conjure) {
      button.disabled = mounted?state.hearth.state!=='piloted':holding && number(state.stones)<7;
      button.setAttribute('aria-label', mounted?'Κράτησε για φλογοβόλο, αριστερό κλικ ή R':'Πέτρα: έως 10. Με 7 κοντινές πέτρες κράτησε για Goliath.');
    }
    for (const [action, cooldown] of [['pulse', mounted?state.hearth?.stompCooldown:state.pulseCooldown], ['dash', state.dashCooldown]]) {
      const remaining = Math.max(0, number(cooldown));
      for (const button of actionGroups[action]) {
        button.classList.toggle('cooling', remaining > .05);
        const label = button.querySelector('.cooldown-number'); label.hidden = remaining <= .05;
        const value = remaining >= 10 ? `${Math.ceil(remaining)}` : remaining.toFixed(1);
        if (label.textContent !== value) label.textContent = value;
      }
    }
    const combo = number(state.combo); const multiplier = number(state.comboMultiplier, combo);
    el['combo-display'].hidden = combo < 2 && multiplier < 2;
    text('combo-value', `×${Math.max(1, multiplier).toLocaleString('el-GR', { maximumFractionDigits: 1 })}`);
    if (touchMode && holding && !state.shielding) text('held-text', `${state.heldName || 'Αντικείμενο'} · στόχευσε το σημάδι · άφησε`);
    const bossVisible = state.bossHP !== undefined && number(state.bossMaxHP) > 0 && number(state.bossHP) > 0;
    text('stone-count', `${number(state.stones)} / 10 πέτρες`);
    text('goliath-state', state.ritualPhase==='charge'?'Κράτησε · '+Math.ceil(number(state.ritualProgress)*100)+'%':state.ritualPhase==='assemble'?'Συναρμολόγηση · '+number(state.assembled)+' / 7':state.goliathHP>0?'Goliath · '+Math.ceil(state.goliathHP)+' ΖΩΗ · '+Math.ceil(state.goliathTime)+'s':number(state.readyStones)>=7?'Κράτησε R / ΠΕΤΡΑ για 2s → Goliath':number(state.readyStones)+' / 7 κοντινές πέτρες');
    el['goliath-fill'].style.width=`${Math.min(1,number(state.ritualProgress)||number(state.goliathHP)/420)*100}%`;
    el['goliath-bar'].hidden=state.ritualPhase==='idle'&&!state.goliathHP;
    text('boss-channel', state.bossChannel>0?'Επίκληση · '+Math.ceil(state.bossChannel*100)+'% · χτύπα για διακοπή':'');
    el['boss-channel-bar'].hidden=!(state.bossChannel>0);
    el['boss-channel-fill'].style.width=`${number(state.bossChannel)*100}%`;
    el['boss-track'].hidden = !bossVisible;
    if (bossVisible) { el['boss-fill'].style.width = `${Math.max(0, Math.min(1, number(state.bossHP) / number(state.bossMaxHP))) * 100}%`; if (state.bossName) text('boss-name', state.bossName); }
    if (state.quality !== undefined && state.quality !== quality) setQuality(state.quality);
    const shielding = mouseShield || touchShield;
    for (const button of actionGroups.shield) button.classList.toggle('is-held', shielding);
  }

  // Gameplay systems keep this callback; notifications are disabled on every device.
  function toast() {}

  function getInput() {
    if (!live()) return { moveX: 0, moveZ: 0, aimX: 0, aimY: 0, aimActive: false, pointerX, pointerY, pointerActive: false, shielding: false };
    let x = move.x + (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
    let z = move.y + (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0) - (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0);
    const length = Math.hypot(x, z); if (length > 1) { x /= length; z /= length; }
    return { moveX: x, moveZ: z, aimX: 0, aimY: 0, aimActive: false, pointerX, pointerY, pointerActive, firing:mouseFire||touchFire||keys.has('KeyV')||(latestState.hearth?.state==='piloted'&&keys.has('KeyR')),shielding:!latestState.hearth?.occupied&&(mouseShield||touchShield),shieldLatched:touchShield };
  }

  function consumeActions() { return actions.splice(0); }
  function queueAction(action) {
    if (!live() || actions.length >= 12 || (action === 'drop' && !holdingObject && !dragPointer)) return;
    if (action === 'drop') cancelDrag();
    actions.push(action);
  }

  function buildStick(node) {
    const stick = { node, knob: node.querySelector('.stick-knob'), id: null };
    stickStates.push(stick);
    const point = (event) => {
      const rect = node.getBoundingClientRect(); const radius = Math.max(10, rect.width * .34);
      let x = (event.clientX - rect.left - rect.width / 2) / radius;
      let y = (event.clientY - rect.top - rect.height / 2) / radius;
      const rawLength = Math.hypot(x, y); if (rawLength > 1) { x /= rawLength; y /= rawLength; }
      stick.knob.style.transform = `translate(${x * radius}px, ${y * radius}px)`;
      const length = Math.hypot(x, y); const output = length < .12 ? { x: 0, y: 0 } : { x: x / length * (length - .12) / .88, y: y / length * (length - .12) / .88 };
      move = output;
    };
    listen(node, 'pointerdown', (event) => { if (!live() || stick.id !== null) return; prevent(event); stick.id = event.pointerId; node.setPointerCapture(event.pointerId); point(event); });
    listen(node, 'pointermove', (event) => { if (event.pointerId !== stick.id) return; prevent(event); point(event); });
    const release = (event) => {
      if (event.pointerId !== stick.id) return;
      stick.id = null;
      if (node.hasPointerCapture?.(event.pointerId)) node.releasePointerCapture(event.pointerId);
      stick.knob.style.transform = 'translate(0px, 0px)';
      move = { x: 0, y: 0 };
    };
    listen(node, 'pointerup', release); listen(node, 'pointercancel', release); listen(node, 'lostpointercapture', release);
  }

  buildStick(el['move-stick']);

  for (const button of allAbilities) {
    const action = button.dataset.action;
    if(action==='flamethrower'){
      listen(button,'pointerdown',event=>{if(!live()||button.disabled||event.button!==0)return;prevent(event);firePointers.set(button,event.pointerId);button.setPointerCapture(event.pointerId);touchFire=true;button.classList.add('is-held');});
      const stop=event=>{if(firePointers.get(button)!==event.pointerId)return;firePointers.delete(button);touchFire=firePointers.size>0;button.classList.remove('is-held');if(button.hasPointerCapture?.(event.pointerId))button.releasePointerCapture(event.pointerId);};
      for(const type of ['pointerup','pointercancel','lostpointercapture'])listen(button,type,stop);listen(button,'click',prevent);continue;
    }
    if (action === 'shield') {
      const shield = { node: button, id: null }; shieldStates.push(shield);
      listen(button, 'pointerdown', (event) => { if (!live() || shield.id !== null || event.button !== 0) return; prevent(event); touchShield = true; shield.id = event.pointerId; button.setPointerCapture(event.pointerId); button.classList.add('is-held'); });
      const release = (event) => { if (shield.id !== null && event.pointerId === shield.id) { touchShield = false; shield.id = null; button.classList.remove('is-held'); if (button.hasPointerCapture?.(event.pointerId)) button.releasePointerCapture(event.pointerId); } };
      listen(button, 'pointerup', release); listen(button, 'pointercancel', release); listen(button, 'lostpointercapture', release);
      listen(button, 'click', prevent);
    } else if(action==='conjure') {
      listen(button,'pointerdown',event=>{if(event.button!==0||!live()||button.disabled||conjurePointer)return;prevent(event);conjurePointer={node:button,id:event.pointerId,mounted:!!latestState.hearth?.occupied};button.setPointerCapture(event.pointerId);button.classList.add('is-held');if(conjurePointer.mounted)touchFire=true;else invoke('onConjureStart');});
      const release=event=>{if(conjurePointer?.id!==event.pointerId)return;const current=conjurePointer;conjurePointer=null;button.classList.remove('is-held');if(current.mounted)touchFire=false;else invoke(event.type==='pointerup'?'onConjureEnd':'onConjureCancel');if(button.hasPointerCapture?.(current.id))button.releasePointerCapture(current.id);};
      listen(button,'pointerup',release);listen(button,'pointercancel',release);listen(button,'lostpointercapture',release);
      listen(button,'click',event=>{prevent(event);if(event.detail===0&&!button.disabled&&!latestState.hearth?.occupied){invoke('onConjureStart');invoke('onConjureEnd');}});
    } else {
      const mapped=()=>action==='dash'&&latestState.hearth?.occupied?'exitEngine':action;
      listen(button, 'pointerdown', (event) => { if (event.button !== 0 || !live() || button.disabled) return; prevent(event); queueAction(mapped()); });
      listen(button, 'click', (event) => { prevent(event); if (event.detail === 0 && !button.disabled) queueAction(mapped()); });
    }
  }

  const editable = (target) => target?.closest?.('input, textarea, select, [contenteditable="true"]');
  const gameKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyR', 'KeyF', 'KeyE', 'KeyQ', 'Space', 'Escape', 'KeyP','Digit1','Digit2','KeyV',...(callbacks.fireEnabled?['KeyC']:[])]);
  listen(window, 'keydown', (event) => {
    if (editable(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
    if(event.code==='KeyI'&&!event.repeat&&loaded){prevent(event);if(modal==='inventory')hideModal();else if(!modal)invoke('onInventory');return;}
    if (event.code === 'Tab') {
      const surface = modal ? el['modal-panel'] : phase === 'paused' ? el['pause-screen'] : phase === 'result' ? el['result-screen'] : null;
      if (surface) {
        const focusable = [...surface.querySelectorAll('button:not(:disabled), [tabindex="0"]')].filter((node) => !node.closest('[hidden]'));
        if (focusable.length) {
          const first = focusable[0]; const last = focusable[focusable.length - 1];
          if (event.shiftKey && (document.activeElement === first || !surface.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && (document.activeElement === last || !surface.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
        }
      }
      return;
    }
    if (event.code === 'Escape' || event.code === 'KeyP') {
      if (event.repeat) return;
      if (modal) { prevent(event); hideModal(); }
      else if (phase === 'paused') { prevent(event); requestResume(); }
      else if (live()) { prevent(event); requestPause(); }
      return;
    }
    if (!live() || !gameKeys.has(event.code)) return;
    event.preventDefault(); keys.add(event.code);
    if (!event.repeat) {
      if(event.code==='KeyR'&&!latestState.hearth?.occupied)invoke('onConjureStart');
      const action = { KeyF: 'pulse', KeyQ:'doorStrike', KeyE:latestState.hearth?.occupied?'exitEngine':'context', Space: 'dash',KeyC:'contextFire',Digit1:'healthPotion',Digit2:'manaPotion' }[event.code];
      if (action&&!(event.code==='Space'&&latestState.hearth?.occupied)) queueAction(action);
    }
  });
  listen(window, 'keyup', (event) => { keys.delete(event.code);if(event.code==='KeyR'&&live()&&!latestState.hearth?.occupied)invoke('onConjureEnd'); if (live() && gameKeys.has(event.code) && !editable(event.target)) event.preventDefault(); });
  listen(window, 'blur', () => { clearInput(); if (phase === 'playing') requestPause(); });
  listen(document, 'visibilitychange', () => { if (document.hidden) { clearInput(); if (phase === 'playing') requestPause(); } });
  listen(window, 'resize', clearInput);

  function mouseState(event){
    const binding=engineMouse(event.buttons,mouseButtons,latestState.hearth?.state==='piloted');
    mouseButtons=event.buttons;mouseFire=binding.fire;mouseShield=binding.shield;
    if(binding.stomp)queueAction('pulse');
  }
  listen(canvas, 'pointermove', (event) => {
    if (!live()) return;
    if(event.pointerType==='mouse'){
      mouseState(event);
      if(dragPointer&&!(event.buttons&1)){endDrag(event);return;}
    }
    const tracked = dragPointer || aimPointer;
    if (tracked) {
      if (event.pointerId !== tracked.pointerId) return;
      prevent(event);
      const info = dragInfo(event);
      setPointer(info);
      if (dragPointer) { dragPointer = info; invoke('onDragMove', info); }
      else aimPointer = info;
    } else if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      setPointer(dragInfo(event));
    }
  });
  listen(canvas, 'pointerdown', (event) => {
    if (!live()) return;
    if(event.pointerType==='mouse'){
      mouseState(event);
      if(latestState.hearth?.occupied){prevent(event);setPointer(dragInfo(event));enginePointer=event.pointerId;canvas.setPointerCapture(event.pointerId);return;}
    }
    if (event.button === 2 && event.pointerType === 'mouse') {
      prevent(event); mouseShield = true;
      return;
    }
    // Each contact owns its own action. A second touch may drag while the
    // movement thumb remains down, so PointerEvent.isPrimary is not a gate.
    if (event.button !== 0 || dragPointer || aimPointer) return;
    const info = dragInfo(event);
    setPointer(info);
    const grabbing = invoke('onDragStart', info) === true;
    if (!live()) { if (grabbing) invoke('onDragCancel', info); return; }
    if (!grabbing && event.pointerType === 'mouse') return;
    prevent(event);
    if (grabbing) { dragPointer = info; document.body.classList.add('is-dragging'); }
    else aimPointer = info;
    try { canvas.setPointerCapture(event.pointerId); }
    catch { cancelPointer(); }
  });
  const endDrag = (event) => {
    const tracked = dragPointer || aimPointer;
    if (!tracked || event.pointerId !== tracked.pointerId) return;
    prevent(event);
    const info = dragInfo(event);
    const wasDragging = !!dragPointer;
    dragPointer = aimPointer = null;
    document.body.classList.remove('is-dragging');
    setPointer(info);
    pointerActive = event.pointerType === 'mouse' || event.pointerType === 'pen';
    if (wasDragging) invoke('onDragEnd', info);
    releaseDragCapture(info);
  };
  listen(canvas, 'pointerup', endDrag);
  listen(window, 'pointerup', (event) => { if(event.pointerType==='mouse')mouseState(event);endDrag(event); });
  listen(canvas, 'pointercancel', cancelPointer);
  listen(canvas, 'lostpointercapture', event=>{if(enginePointer===event.pointerId){enginePointer=null;mouseButtons=0;mouseFire=mouseShield=false;}cancelPointer(event);});
  listen(window, 'pointercancel', (event) => { if (event.pointerType === 'mouse'){mouseShield=mouseFire=false;mouseButtons=0;}cancelPointer(event); });
  listen(canvas, 'pointerleave', () => { if (!dragPointer && !aimPointer) pointerActive = false; });
  listen(canvas, 'contextmenu', (event) => event.preventDefault());

  const setTouchMode = (event) => { touchMode = event.matches; document.body.dataset.input = touchMode ? 'touch' : 'keyboard'; clearInput(); if (loaded) ready(); };
  coarseMedia.addEventListener('change', setTouchMode);

  listen(el['menu-benchmark'],'click',()=>invoke('onBenchmark'));
  listen(el['start-button'], 'click', () => { if (loaded) { clearInput(); invoke('onStart'); } });
  for (const id of ['menu-mute', 'pause-mute', 'hud-mute']) listen(el[id], 'click', toggleMute);
  for (const id of ['menu-quality', 'pause-quality']) listen(el[id], 'click', toggleQuality);
  for (const id of ['menu-help', 'pause-help']) listen(el[id], 'click', () => { showHelp(); invoke('onHelp'); });
  for (const id of ['menu-upgrades', 'result-upgrades']) listen(el[id], 'click', requestUpgrades);
  listen(el['hud-pause'], 'click', requestPause);
  listen(contextUse,'click',()=>queueAction(contextUse.dataset.action||'context'));
  for(const id of ['hud-inventory','menu-inventory'])listen(el[id],'click',()=>invoke('onInventory'));
  for(const button of host.querySelectorAll('[data-potion]'))listen(button,'click',()=>{if(live())invoke('onPotion',button.dataset.potion);});
  listen(el['resume-button'], 'click', requestResume);
  for (const id of ['pause-restart', 'result-restart']) listen(el[id], 'click', () => { clearInput(); invoke(callbacks.onRestart ? 'onRestart' : 'onStart'); });
  listen(el['result-menu'], 'click', () => { if (callbacks.onMenu) invoke('onMenu'); else showMenu(profile); });
  listen(el['modal-close'], 'click', hideModal);
  listen(el['pause-status'], 'click', showStatus);
  listen(el['modal-screen'], 'click', (event) => { if (event.target === el['modal-screen']) hideModal(); });
  listen(el['modal-content'], 'click', (event) => { const button = event.target.closest('[data-upgrade]'); if (button && !button.disabled) { button.disabled = true; invoke('onUpgrade', button.dataset.upgrade); } });
  listen(el['modal-content'],'click',event=>{const item=event.target.closest('[data-item]'),action=event.target.closest('[data-loot-action]');if(item)invoke('onInventoryAction','select',Number(item.dataset.item));else if(action&&!action.disabled)invoke('onInventoryAction',action.dataset.lootAction,Number(action.dataset.id));});

  function showError(message) {
    clearInput(); const fatal = $('fatal-error');
    fatal.hidden = false; fatal.innerHTML = `<strong>Η πύλη δεν άνοιξε.</strong><div>${esc(message)}</div><button type="button">Δοκίμασε ξανά</button>`;
    listen(fatal.querySelector('button'), 'click', () => window.location.reload());
  }

  let lastDownloadUpdate=0;
  function setDownloadProgress({received=0,state,attempt=1,active=0,cachedBytes=0}){
    if(state!=='retry'&&performance.now()-lastDownloadUpdate<250)return;
    lastDownloadUpdate=performance.now();
    $('loading-download').textContent=state==='retry'?`Η σύνδεση άργησε · επανάληψη ${attempt}/3…`:`Αρχεία ${(received/1048576).toFixed(1)} MiB${cachedBytes?' · '+(cachedBytes/1048576).toFixed(1)+' από cache':''} · ${active?active+' σε ανάγνωση':'αποκωδικοποίηση / προετοιμασία'}`;
  }

  function destroy() {
    clearInput(); abort.abort(); coarseMedia.removeEventListener('change', setTouchMode);
    host.innerHTML = ''; delete document.body.dataset.input; document.body.classList.remove('is-playing', 'is-status-open');
  }

  updateProfile(profile); update({ hp: 100, maxHp: 100, mana: 100, maxMana: 100, time: 0 });
  function updateContext(value){contextUse.hidden=!value||phase!=='playing';if(!value)return;contextUse.dataset.action=value.kind==='door-strike'?'doorStrike':'context';contextUse.querySelector('kbd').textContent=value.key||'E';contextUse.style.left=value.x+'px';contextUse.style.top=value.y+'px';contextUse.disabled=!value.enabled;if(contextUse.dataset.icon!==value.icon){contextUse.querySelector('.icon').outerHTML=icon(value.icon);contextUse.dataset.icon=value.icon;}if(contextUse.getAttribute('aria-label')!==value.label){contextUse.setAttribute('aria-label',value.label);contextUse.querySelector('span').textContent=value.label;}}
  return { setLoading, setDownloadProgress, ready, showMenu, start, update, toast, showPause, showResult, showUpgrades, showInventory, showStatus, updateThrowMark, hideModal, setMuted, getInput, consumeActions, destroy, showError, showHelp, setQuality,updateContext,setShieldMode:value=>{touchShield=!!value;},
    updatePotions:counts=>{text('health-potions',counts.health);text('mana-potions',counts.mana);el['quick-health'].disabled=!counts.health;el['quick-mana'].disabled=!counts.mana;el['quick-health'].classList.toggle('mobile-unavailable',!counts.health);el['quick-mana'].classList.toggle('mobile-unavailable',!counts.mana);} };
}
