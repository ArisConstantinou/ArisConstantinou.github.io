const CACHE='last-call-1.1.1';
const ASSETS=['./','./index.html','./main.js','./simulation.js','./world.js','./ship.js','./passengers.js','./audio.js','./style.css','./icon.svg','./manifest.webmanifest','./credits.html','./vendor/three.module.js','./vendor/three.core.js','./vendor/addons/loaders/GLTFLoader.js','./vendor/addons/utils/SkeletonUtils.js','./vendor/addons/utils/BufferGeometryUtils.js','./assets/people/Michelle.glb','./assets/people/Soldier.glb'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.all(ASSETS.map(async path=>{try{const request=new Request(new URL(path,self.location),{credentials:'same-origin'});const response=await fetch(request);if(response.ok&&!response.redirected)await cache.put(request,response);}catch{}}));
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('last-call-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
  if(!ASSETS.some(path=>new URL(path,self.location).pathname===url.pathname))return;
  event.respondWith((async()=>{const cache=await caches.open(CACHE);if(event.request.mode==='navigate'){try{const response=await fetch(event.request);if(response.ok&&!response.redirected)await cache.put(event.request,response.clone());return response;}catch{return (await cache.match(event.request))||(await cache.match(new URL('./index.html',self.location)));}}try{const fresh=await fetch(event.request,{cache:'no-store'});if(fresh.ok){await cache.put(event.request,fresh.clone());return fresh;}}catch{}return (await cache.match(event.request))||Response.error();})());
});
