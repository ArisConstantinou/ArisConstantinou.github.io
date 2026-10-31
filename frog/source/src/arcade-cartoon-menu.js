const CLASSES = ['heavy', 'medium', 'skinny'];
const DELAY = 300, HEAVY_DURATION = 3200;

// Move complete approved portraits: no per-limb animation or old ability loops.
export function installCartoonMenu(game) {
  const doc = game.ui.ownerDocument, win = doc.defaultView;
  const top = game.ui.querySelector('.menu-frogs-top');
  const bottom = game.ui.querySelector('.menu-frogs-settings');
  const boot = doc.getElementById('boot');
  top.hidden = bottom.hidden = true;
  const images = CLASSES.map((id, index) => {
    const image = doc.createElement('img');
    image.alt = ''; image.draggable = false; image.fetchPriority = 'high';
    image.width = image.height = 448;
    image.className = `cartoon-menu-frog cartoon-menu-${id}`;
    image.dataset.character = id;
    image.style.visibility = 'hidden'; image.hidden = true;
    image.src = `./art/cartoon/${id}-card.png`;
    (index === 2 ? bottom : top).before(image);
    return image;
  });
  // The same portrait's two forepaws stay on the rim while its body is behind
  // the button face. The button occludes the lowered paws during the pull-up.
  const grips = ['left', 'right'].map(side => {
    const image = images[0].cloneNode();
    image.removeAttribute('data-character');
    image.className += ` cartoon-menu-grip cartoon-menu-grip-${side}`;
    image.style.opacity = '0'; top.before(image); return image;
  });
  const all = [...images, ...grips], reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
  let ready = false, failed = false, visible = false, started = false;
  let settled = false, destroyed = false, startedAt = 0, animations = [];
  const now = () => win.performance.now();
  function settle() {
    settled = true;
    for (const animation of animations) animation.cancel();
    animations = [];
    images[0].classList.remove('menu-frog-climbing');
    for (const grip of grips) grip.style.opacity = '0';
  }
  function animate(image, frames, duration, delay) {
    const animation = image.animate(frames, {duration, delay, fill: 'both', easing: 'linear'});
    animations.push(animation);
    return animation;
  }
  function enter() {
    started = true; startedAt = now();
    if (reduced.matches || !images[0].animate) { settle(); return; }
    const boxes = images.map(image => image.getBoundingClientRect());
    const viewport = {width: win.innerWidth, height: win.innerHeight};
    images[0].classList.add('menu-frog-climbing');
    images.forEach((image, index) => {
      const box = boxes[index];
      const key = (offset, x, y, angle = 0, sx = 1, sy = 1) => ({offset,
        transform: `translate3d(${x}px,${y}px,0) rotate(${angle}deg) scale(${sx},${sy})`});
      let frames, duration, delay;
      if (index === 0) {
        const hang = box.height * .19;
        const rim = game.$('round-actions').getBoundingClientRect().top;
        const gripKey = (offset, y) => ({...key(offset, 0, y),
          // Keep the hanging original paws below the opaque rim, including
          // pixels outside the rounded button corners. Grip copies stay put.
          clipPath: `inset(0 0 ${Math.max(0, Math.min(100, 100 * (1 - (rim - box.top - y) / box.height)))}% 0)`});
        frames = [key(0, 0, viewport.height - box.top + 80, -7, .94, .96),
          key(.179, 0, hang), gripKey(.18, hang), gripKey(.25, hang + 9),
          gripKey(.36, hang - 16), gripKey(.43, hang + 9),
          gripKey(.56, hang - 24), gripKey(.63, hang + 5),
          gripKey(.76, hang - 17), gripKey(.869, -8),
          key(.87, 0, -8, -1, .97, 1.03),
          key(.93, 0, 5, 0, 1.05, .95), key(1, 0, 0)];
        frames = frames.map(frame => ({...frame, zIndex: frame.offset < .87 ? 0 : 2,
          clipPath: frame.clipPath || 'inset(0 0 0% 0)',
          easing: frame.offset === 0 ? 'cubic-bezier(.15,.6,.35,1)' : 'ease-in-out'}));
        duration = HEAVY_DURATION; delay = DELAY;
      } else {
        const x = index === 1 ? viewport.width - box.left + 80 : -box.right - 80;
        const direction = index === 1 ? 1 : -1;
        const apex = Math.min(130, box.height * .6);
        frames = Array.from({length: 13}, (_, sample) => {
          const q = sample / 12;
          return key(q * .76, x * (1 - q), 30 * (1 - q) - apex * 4 * q * (1 - q),
            direction * (16 * (1 - q) - 18 * Math.sin(Math.PI * q)), .9 + .1 * q, 1.05 - .05 * q);
        });
        frames.push(key(.82, 0, 5, 0, 1.09, .90),
          key(.92, 0, -4, 0, .98, 1.03), key(1, 0, 0));
        duration = index === 1 ? 1050 : 950;
        delay = DELAY + (index === 1 ? 80 : 240);
      }
      animate(image, frames, duration, delay);
    });
    for (const grip of grips) animate(grip, [
      {offset: 0, opacity: 0}, {offset: .17, opacity: 0},
      {offset: .19, opacity: 1}, {offset: .84, opacity: 1},
      {offset: .91, opacity: 0}, {offset: 1, opacity: 0},
    ], HEAVY_DURATION, DELAY);
    Promise.all(animations.map(animation => animation.finished)).then(() => {
      if (!destroyed) settle();
    }).catch(() => {}); // Cancellation on navigation/resize is intentional.
  }
  function skipMotion() { if (started && !settled) settle(); }
  reduced.addEventListener('change', skipMotion);
  win.addEventListener('resize', skipMotion);
  const loading = Promise.all(all.map(image => image.decode())).then(() => {
    if (destroyed) return false;
    for (const image of all) image.hidden = false;
    ready = true;
    if (boot && !boot.classList.contains('has-error')) boot.remove();
    return true;
  }, error => {
    failed = true; console.error('Cartoon menu images', error);
    if (boot && !destroyed) {
      boot.classList.add('has-error');
      const target = doc.getElementById('boot-error');
      if (target) target.textContent = 'Δεν φορτώθηκαν οι εικόνες των χαρακτήρων. Έλεγξε τη σύνδεση και πάτησε ΞΑΝΑ.';
      const retry = doc.createElement('button'); retry.id = 'menu-load-retry';
      retry.type = 'button'; retry.textContent = 'ΞΑΝΑ';
      retry.style.cssText = 'min-height:48px;padding:12px 24px;font:800 16px system-ui;cursor:pointer';
      retry.onclick = () => win.location.reload(); boot.append(retry);
    }
    return false;
  });
  function phase() {
    if (!started) return 'waiting';
    if (settled) return 'settled';
    const elapsed = now() - startedAt - DELAY;
    return elapsed < 0 ? 'delay' : elapsed < HEAVY_DURATION * .18 ? 'jump'
      : elapsed < HEAVY_DURATION * .76 ? 'grip-struggle' : 'pull-up';
  }
  return {
    ready: loading,
    update() {
      if (destroyed) return;
      visible = !doc.hidden && !game.$('arcade-menu').hidden && !game.$('menu-main').hidden;
      if (!visible && started && !settled) settle();
      if (visible && ready && !started && !game.assetsLoading) enter();
      for (const image of all) image.style.visibility = visible && started ? 'visible' : 'hidden';
    },
    inspect: () => ({ready, failed, visible, phase: phase(), started, settled,
      elapsedMs: started ? Math.round(now() - startedAt) : 0,
      faceMode: 'whole-character-entrance', characters: CLASSES, reducedMotion: reduced.matches}),
    destroy() {
      destroyed = true; settle();
      reduced.removeEventListener('change', skipMotion); win.removeEventListener('resize', skipMotion);
      for (const image of all) image.remove();
    },
  };
}
