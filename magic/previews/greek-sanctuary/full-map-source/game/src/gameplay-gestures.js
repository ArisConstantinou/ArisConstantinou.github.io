// CSS claims game touches before the browser starts a gesture. These scoped,
// non-passive listeners also stop WebKit's page gestures and long-press menus.
// Never cancel touchstart/end: click-based pause and recording controls need
// their native click, while Pointer Events keep ownership of each game contact.
export function protectGameplayGestures({ document, signal, active }) {
  const surface = '#game-canvas, #game-hud, #benchmark-panel.is-running';
  const cancel = event => {
    if (!active()) return;
    const target = event.target;
    if (target !== document && target !== document.body && !target?.closest?.(surface)) return;
    if (event.cancelable) event.preventDefault();
  };
  for (const type of ['touchmove', 'gesturestart', 'gesturechange', 'gestureend', 'selectstart', 'contextmenu']) {
    document.addEventListener(type, cancel, { capture: true, passive: false, signal });
  }
}
