/* Evergreen release check: keep this file and its HTML hook in future builds. */
(() => {
  if (window.__frogUpdates || !/^https?:$/.test(location.protocol)) return;
  window.__frogUpdates = true;
  const root = new URL('./', document.currentScript.src);
  const entry = new URL('index.html', root);
  let checking = false;
  let leaving = false;

  function release(doc) {
    const version = doc.querySelector('meta[name="frog-version"]')?.content;
    const modules = [...doc.querySelectorAll('script[type="module"][src]')]
      .map(node => new URL(node.getAttribute('src'), entry).href);
    const styles = [...doc.querySelectorAll('link[rel="stylesheet"][href]')]
      .map(node => new URL(node.getAttribute('href'), entry).href);
    if (!version || !modules.length || [...modules, ...styles].some(url => new URL(url).origin !== root.origin)) return null;
    return {version, key: JSON.stringify([version, modules, styles]), assets: [...modules, ...styles]};
  }

  const running = release(document);
  if (!running) return;

  async function check() {
    if (checking || leaving || document.hidden || !navigator.onLine) return;
    checking = true;
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 8000);
    try {
      const response = await fetch(entry, {cache: 'no-store', signal: abort.signal});
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return;
      const latest = release(new DOMParser().parseFromString(await response.text(), 'text/html'));
      if (!latest || latest.key === running.key) return;
      if (/^\d+(\.\d+)*$/.test(latest.version) && /^\d+(\.\d+)*$/.test(running.version)) {
        const next = latest.version.split('.').map(Number), current = running.version.split('.').map(Number);
        let order = 0;
        for (let i = 0; i < Math.max(next.length, current.length) && !order; i++) order = (next[i] || 0) - (current[i] || 0);
        if (order < 0) return;
      }
      // Do not switch to a partially available deployment or a missing bundle.
      const assets = await Promise.all(latest.assets.map(url => fetch(url, {method: 'HEAD', cache: 'no-store', signal: abort.signal})));
      if (assets.some(asset => !asset.ok)) return;
      // A failed save must never be converted into an automatic loss of progress.
      const game = window.frogArcade;
      if (game && game.mode !== 'title' && (typeof game.persist !== 'function' || game.persist() !== true)) return;
      // Bound retries when an intermediary continues serving an older document.
      const key = 'frog-update-attempt';
      let previous;
      try { previous = JSON.parse(sessionStorage.getItem(key) || 'null'); } catch {}
      if (previous?.target === latest.key && Date.now() - previous.time < 300000 && previous.count >= 2) return;
      const count = previous?.target === latest.key && Date.now() - previous.time < 300000 ? previous.count + 1 : 1;
      try { sessionStorage.setItem(key, JSON.stringify({target: latest.key, time: Date.now(), count})); } catch { return; }
      // Refresh the ordinary HTTP cache too, for browsers without service workers.
      const refreshed = await fetch(entry, {cache: 'reload', signal: abort.signal});
      if (!refreshed.ok) return;
      const refreshedRelease = release(new DOMParser().parseFromString(await refreshed.text(), 'text/html'));
      if (refreshedRelease?.key !== latest.key) return;
      leaving = true;
      location.reload();
    } catch {
      // Offline, timeout and deployment errors retain the running game.
    } finally {
      clearTimeout(timeout);
      checking = false;
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(new URL('update-worker.js', root), {scope: root.pathname, updateViaCache: 'none'})
      .catch(() => {});
  }
  window.addEventListener('load', check, {once: true});
  window.addEventListener('online', check);
  window.addEventListener('focus', check);
  window.addEventListener('pageshow', check);
  document.addEventListener('visibilitychange', check);
  setInterval(check, 60000);
})();
