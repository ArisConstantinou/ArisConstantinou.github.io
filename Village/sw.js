const CACHE='moutoullas-v1.1.2';
const FILES=['./','./index.html','./app.js?v=1.1.2','./style.css?v=1.1.2','./icons.js?v=1.1.2','./locations.js?v=1.1.2','./engine.js?v=1.1.2','./game-content.js?v=1.1.2','./world.js?v=1.1.2','./history.json','./sources.json','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./manifest.webmanifest','./assets/1pound.jpg'];
const ALLOWED=new Set(FILES.map(p=>new URL(p,self.location.href).href));
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(path=>new Request(path,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('moutoullas-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||!ALLOWED.has(event.request.url))return;
 event.respondWith(fetch(event.request,{cache:'no-cache'}).then(response=>{
  const type=response.headers.get('content-type')||'',isDocument=event.request.mode==='navigate'||/\/$|index\.html$/.test(new URL(event.request.url).pathname);
  if(response.ok&&!response.redirected&&response.type==='basic'&&(isDocument||!type.includes('text/html'))){const clone=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,clone)))}
  return response;
 }).catch(()=>caches.match(event.request).then(hit=>hit||(event.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
