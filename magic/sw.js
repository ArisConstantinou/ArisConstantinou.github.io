/* MAGIC 1.6.44: do not block boot on optional model downloads. */
'use strict';
const RELEASE="1.6.44",SCOPE=new URL(self.registration.scope),INDEX=new URL('index.html',SCOPE).href;
const PREFIX='magic-exiled:'+SCOPE.pathname+':',NAME=PREFIX+"441baed556daad87a164e3ce411ada35d5968c5e7ddb2abf10b41777dc2947c2";
const SHELL=["previews/greek-sanctuary/engine/draco_decoder.js","previews/greek-sanctuary/engine/index-9ebe86cf9179.css","previews/greek-sanctuary/engine/index-f73bf8be0b63.js","previews/greek-sanctuary/engine/trajectory-worker.js","index.html"].map(file=>new URL(file,SCOPE).href);
const writes=new Set();let cacheFailure=false;
const ASSET_NAME=PREFIX+'verified-assets-v1';
const ASSET_KEYS=new Map([["previews/greek-sanctuary/engine/draco_decoder.js","8625489da79a805f4f2a7d511c3e52d8b4085608a9d2a4d5f4f9de5db0aea04f"],["previews/greek-sanctuary/engine/hearth-flamethrower.mp3","e1a122a08a93a47e4dcaf3eac5e4c38ef5b6e69a4b9d0a52b52930f10c38583d"],["previews/greek-sanctuary/engine/index-9ebe86cf9179.css","9ebe86cf9179ba7f9c60c5c1e671740347c25bcd65093b2597a96408dbb92b5e"],["previews/greek-sanctuary/engine/index-f73bf8be0b63.js","f73bf8be0b63d812bacc34143042fc20cbeb4ded738a3f64b8b89f98ac596494"],["previews/greek-sanctuary/engine/trajectory-worker.js","80bb8dd808cb74b90986a7fbd1d9d11d5f4aef289a9d736bd73673179d8f6e56"]].map(([file,sha])=>[new URL(file,SCOPE).href,new URL('__content__/'+sha,SCOPE).href]));
const PREVIOUS_NAME=PREFIX+"317473735339ea689fc89dbd48e0360cec88ce1340e19b3399f04b0b27eea764";
const UNCHANGED=new Set(["previews/greek-sanctuary/engine/draco_decoder.js","previews/greek-sanctuary/engine/hearth-flamethrower.mp3","previews/greek-sanctuary/engine/index-9ebe86cf9179.css","previews/greek-sanctuary/engine/trajectory-worker.js"].map(file=>new URL(file,SCOPE).href));
function cachedResponse(response){const headers=new Headers(response.headers);headers.set('X-Magic-Asset-Source','cache');return new Response(response.body,{status:response.status,statusText:response.statusText,headers});}

const inScope=url=>url.origin===SCOPE.origin&&url.pathname.startsWith(SCOPE.pathname);
const usable=response=>response.ok&&response.status!==206&&response.type!=='opaque'&&(!response.url||inScope(new URL(response.url)));
function store(cache,key,response){
 const pending=cache.put(key,response).catch(error=>{cacheFailure=true;console.warn('MAGIC offline cache:',error);}).finally(()=>writes.delete(pending));
 writes.add(pending);return pending;
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(NAME);
 const digests=new Map([["previews/greek-sanctuary/engine/draco_decoder.js","8625489da79a805f4f2a7d511c3e52d8b4085608a9d2a4d5f4f9de5db0aea04f"],["previews/greek-sanctuary/engine/hearth-flamethrower.mp3","e1a122a08a93a47e4dcaf3eac5e4c38ef5b6e69a4b9d0a52b52930f10c38583d"],["previews/greek-sanctuary/engine/index-9ebe86cf9179.css","9ebe86cf9179ba7f9c60c5c1e671740347c25bcd65093b2597a96408dbb92b5e"],["previews/greek-sanctuary/engine/index-f73bf8be0b63.js","f73bf8be0b63d812bacc34143042fc20cbeb4ded738a3f64b8b89f98ac596494"],["previews/greek-sanctuary/engine/trajectory-worker.js","80bb8dd808cb74b90986a7fbd1d9d11d5f4aef289a9d736bd73673179d8f6e56"],["index.html","1fadb7069cd03d4d418160b5cea0cba1fcb6fd993b2d1c9442dfc339632384f9"]].map(([file,sha])=>[new URL(file,SCOPE).href,sha]));
 const responses=await Promise.all(SHELL.map(async url=>{
  const response=await fetch(new Request(url,{cache:'reload',credentials:'same-origin'}));
  if(!usable(response))throw Error('Incomplete release');
  const bytes=await response.clone().arrayBuffer(),hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
  if(hash!==digests.get(url))throw Error('Release integrity mismatch');
  return [url,response];
 }));
 await Promise.all(responses.map(([url,response])=>cache.put(url,response)));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('message',event=>{
 if(event.data?.type==='MAGIC_RELEASE_INFO')event.ports[0]?.postMessage({release:RELEASE,scope:SCOPE.href});
 if(event.data?.type==='MAGIC_RUNTIME_READY'&&event.data.release===RELEASE)event.waitUntil((async()=>{
  // Keep the previous complete offline release until the new game has booted
  // and every requested runtime response has finished writing successfully.
  while(writes.size)await Promise.all([...writes]);
  if(!cacheFailure){const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith(PREFIX)&&n!==NAME&&n!==ASSET_NAME).map(n=>caches.delete(n)));}
  event.ports[0]?.postMessage({release:RELEASE,offlineReady:!cacheFailure});
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET'||request.headers.has('range'))return;
 const url=new URL(request.url);if(!inScope(url))return;
 // Release checks and preflight verification must never read the old app cache.
 if(url.pathname===new URL('release.json',SCOPE).pathname||url.searchParams.has('magic-update')){
  event.respondWith(fetch(new Request(request,{cache:'no-store'})));return;
 }
 event.respondWith((async()=>{
  const cache=await caches.open(NAME);
  if(request.mode==='navigate'){
   try{
    // Bypass a ten-minute browser/CDN freshness window for the entry document.
    const response=await fetch(new Request(request,{cache:'no-store'}));
    if(usable(response)){
     const canonical=url.pathname===SCOPE.pathname||url.href.split('?')[0]===INDEX;
     event.waitUntil(store(cache,canonical?INDEX:request,response.clone()));return response;
    }
    return await cache.match(INDEX)||response;
   }catch{return await cache.match(INDEX)||new Response('Το MAGIC χρειάζεται μία ολοκληρωμένη πρώτη φόρτωση με σύνδεση.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}
  }
  const saved=await cache.match(request);if(saved)return cachedResponse(saved);
  const address=ASSET_KEYS.get(url.href.split('?')[0]),assets=address?await caches.open(ASSET_NAME):null;
  if(address){
   const exact=await assets.match(address);if(exact)return cachedResponse(exact);
   // Migrate only files proven identical in the shipped 1.6.4/1.6.5 manifests.
   // A changed mesh/texture never falls back to the previous URL by name alone.
   if(UNCHANGED.has(url.href.split('?')[0])&&(await caches.keys()).includes(PREVIOUS_NAME)){
    const old=await (await caches.open(PREVIOUS_NAME)).match(request);
    if(old&&usable(old)){event.waitUntil(store(assets,address,old.clone()));return cachedResponse(old);}
   }
  }
  const response=await fetch(new Request(request,{cache:'reload'}));
  if(usable(response))event.waitUntil(store(assets||cache,address||request,response.clone()));
  return response;
 })());
});
