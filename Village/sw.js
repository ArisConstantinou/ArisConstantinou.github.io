const CACHE='feouda-v2.1.0';
// Exact URLs match index.html and every native ES-module import. Runtime assets
// are served locally, so a completed install is sufficient for offline play.
const FILES=[
 './','./index.html','./app.js?v=2.1.0','./style.css?v=2.1.0',
 './feouda-engine.js?v=2.1.0','./feouda-data.js?v=2.1.0',
 './feouda-world.js?v=2.1.0','./feouda-models.js?v=2.1.0',
 './feouda-materials.js?v=2.1.0','./feouda-icons.js?v=2.1.0',
 './feouda-software.js?v=2.1.0','./feouda-software-textures.js?v=2.1.0',
 './feouda-assets.js?v=2.1.0',
 './vendor/three.module.js','./vendor/THREE-LICENSE.txt',
 './vendor/GLTFLoader.js','./vendor/BufferGeometryUtils.js','./vendor/SkeletonUtils.js',
 './assets/models/manifest.json',
 './assets/models/unit-infantry.glb','./assets/models/unit-worker.glb',
 './assets/models/siege-ram.glb','./assets/models/castle-modules.glb',
 './assets/models/building-thatched-house.glb',
 './assets/models/tree-fir.glb','./assets/models/tree-fir-lod.glb',
 './assets/models/units-sources.json','./assets/models/siege-sources.json',
 './assets/models/tree-sources.json','./assets/models/scenery-sources.json',
 './assets/medieval/castle_wall_color_1k.jpg',
 './assets/medieval/castle_wall_normal_1k.jpg',
 './assets/medieval/castle_wall_roughness_1k.jpg',
 './assets/medieval/earth_color_1k.jpg',
 './assets/medieval/earth_normal_1k.jpg',
 './assets/medieval/earth_roughness_1k.jpg',
 './assets/medieval/timber_color_1k.jpg',
 './assets/medieval/timber_normal_1k.jpg',
 './assets/medieval/timber_roughness_1k.jpg',
 './assets/medieval/SOURCES.json',
 './icon.svg','./icon-192.png','./icon-512.png',
 './apple-touch-icon.png','./manifest.webmanifest'
];
const ALLOWED=new Set(FILES.map(path=>new URL(path,self.location.href).href));
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE)
  .then(cache=>cache.addAll(FILES.map(path=>new Request(new URL(path,self.location.href),{cache:'reload'}))))
  .then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys()
  .then(keys=>Promise.all(keys.filter(key=>key!==CACHE&&key.startsWith('feouda-v')).map(key=>caches.delete(key))))
  .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||!ALLOWED.has(event.request.url))return;
 const cached=async()=>{
  const cache=await caches.open(CACHE);
  return await cache.match(event.request)||(event.request.mode==='navigate'?await cache.match(new URL('./index.html',self.location.href).href):null);
 };
 event.respondWith(fetch(event.request,{cache:'no-cache'}).then(async response=>{
  const type=response.headers.get('content-type')||'';
  const isDocument=event.request.mode==='navigate'||/\/$|index\.html$/.test(new URL(event.request.url).pathname);
  const valid=response.ok&&!response.redirected&&response.type==='basic'&&(isDocument||!type.includes('text/html'));
  if(valid){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{}));return response;}
  return await cached()||response;
 }).catch(async()=>await cached()||Response.error()));
});
