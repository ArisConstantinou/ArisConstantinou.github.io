/* Navigation only: hashed game assets and all saves remain owned by the game. */
const root = new URL('./', self.location.href);
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.mode !== 'navigate' || url.origin !== root.origin ||
      ![root.pathname, root.pathname + 'index.html'].includes(url.pathname)) return;
  event.respondWith((async () => {
    try {
      const response = await fetch(new Request(event.request, {cache: 'no-store'}));
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return response;
      const html = await response.text();
      // Keep existing installations updating even if a later static upload omits the hook.
      const hooked = /data-frog-updater\b/.test(html) || !/name=["']frog-version["']/.test(html)
        ? html : html.replace(/<\/head>/i, '<script defer data-frog-updater src="./update.js"></script></head>');
      const headers = new Headers(response.headers);
      for (const name of ['content-length', 'content-encoding', 'etag']) headers.delete(name);
      headers.set('cache-control', 'no-store');
      return new Response(hooked, {status: response.status, statusText: response.statusText, headers});
    } catch {
      return fetch(event.request);
    }
  })());
});
