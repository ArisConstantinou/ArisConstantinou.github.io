const VERSION='nk-plan-8935492f9008b6e1';
const APP_FILES=["./","./index.html","./app.js","./geometry.mjs","./architecture.mjs","./view3d.mjs","./drawing-import.mjs","./drawing-geometry.mjs","./drawing-worker.mjs","./dwg-worker.mjs","./pdf-drawing.mjs","./raster-drawing.mjs","./styles.css","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png","./vendor/three/three.module.min.js","./vendor/three/three.core.min.js","./vendor/three/OrbitControls.js","./vendor/three/LICENSE","./vendor/pdfjs/pdf.min.mjs","./vendor/pdfjs/pdf.worker.min.mjs","./vendor/pdfjs/LICENSE","./vendor/libredwg/dist/libredwg-web.js","./vendor/libredwg/wasm/libredwg-web.js","./vendor/libredwg/wasm/libredwg-web.wasm","./vendor/libredwg/COPYING","./vendor/libredwg/SOURCE.md","./vendor/libredwg/package.json"];
self.addEventListener('install',event=>event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(APP_FILES))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith('nk-plan-')&&key!==VERSION)await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{if(event.data==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url),base=new URL('./',self.location.href);
  if(event.request.method!=='GET'||url.origin!==base.origin||!url.pathname.startsWith(base.pathname)||url.pathname.includes('/api/'))return;
  if(event.request.mode==='navigate'){
    event.respondWith(caches.open(VERSION).then(async cache=>(await cache.match(new URL('./index.html',base).href))||fetch(event.request)));return;
  }
  if(APP_FILES.some(file=>new URL(file,base).pathname===url.pathname))event.respondWith(caches.open(VERSION).then(async cache=>(await cache.match(event.request,{ignoreSearch:true}))||fetch(event.request)));
});
