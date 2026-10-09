// A visible keyboard guide on desktop, touch joystick on phones/tablets.
// Uses input capabilities, not viewport width, so resizing a desktop never
// replaces WASD with a joystick. Does not consume gameplay key events.
export function installMovementHints(root, canPlay) {
  const pad = root.querySelector('#chaosMove');
  const tutorial = root.querySelector('#chaosTutorial');
  const guide = document.createElement('div');
  guide.id = 'keyboardMovement';
  guide.setAttribute('aria-label', 'Κίνηση με W A S D. Shift για τρέξιμο.');
  guide.innerHTML = `<span class="movement-title">ΚΙΝΗΣΗ</span>
    <div class="movement-key-grid"><kbd data-code="KeyW">W<small>ΜΠΡΟΣΤΑ</small></kbd>
    <kbd data-code="KeyA">A<small>ΑΡΙΣΤΕΡΑ</small></kbd>
    <kbd data-code="KeyS">S<small>ΠΙΣΩ</small></kbd>
    <kbd data-code="KeyD">D<small>ΔΕΞΙΑ</small></kbd></div>
    <span class="movement-run"><kbd data-code="ShiftLeft">SHIFT</kbd> ΤΡΕΞΙΜΟ</span>`;
  root.append(guide);
  const desktop = matchMedia('(hover: hover) and (pointer: fine)');
  const pressed = new Set();
  const aliases = {ArrowUp:'KeyW', ArrowLeft:'KeyA', ArrowDown:'KeyS', ArrowRight:'KeyD'};
  let scheme;
  function setScheme(value) {
    if (scheme === value) return;
    scheme = value;
    root.dataset.controlScheme = value;
    guide.setAttribute('aria-hidden', String(value !== 'keyboard'));
    pad.setAttribute('aria-hidden', String(value !== 'touch'));
    tutorial.textContent = value === 'keyboard'
      ? 'W A S D · Shift τρέξιμο · σύρε το ποντίκι για ματιά · 1–4 χτυπήματα'
      : 'Joystick κίνηση · σύρε στην οθόνη για ματιά · κουμπιά 1–4 χτυπήματα';
    reset();
  }
  function render() {
    for (const key of guide.querySelectorAll('[data-code]')) {
      const active = [...pressed].some(code => (aliases[code] || code) === key.dataset.code);
      key.classList.toggle('pressed', active);
    }
  }
  function reset() { pressed.clear(); render(); }
  window.addEventListener('keydown', event => {
    if (!canPlay() || !['KeyW','KeyA','KeyS','KeyD','ShiftLeft',...Object.keys(aliases)].includes(event.code)) return;
    if (event.target?.closest?.('input,textarea,select,[contenteditable="true"]')) return;
    setScheme('keyboard'); pressed.add(event.code); render();
  });
  window.addEventListener('keyup', event => { pressed.delete(event.code); render(); });
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  root.parentElement.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse') setScheme('keyboard');
    else if (event.pointerType === 'touch' && !desktop.matches) setScheme('touch');
  }, {passive:true});
  desktop.addEventListener('change', () => setScheme(desktop.matches ? 'keyboard' : 'touch'));
  setScheme(desktop.matches ? 'keyboard' : 'touch');
  return {reset, get scheme(){ return scheme; }};
}
