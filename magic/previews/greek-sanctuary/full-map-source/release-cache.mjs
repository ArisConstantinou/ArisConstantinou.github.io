/** Small, atomic app shell; model bytes cache only when actually requested. */
export function releaseWorkerSource({version,hash,files}){
 const shell=files.filter(file=>['index.html','manifest.webmanifest','assets-credit.json'].includes(file)||/\/engine\/[^/]+\.(js|css)$/.test(file)||file.startsWith('icons/'));
 if(!shell.includes('index.html')||!shell.some(file=>file.endsWith('.js')))throw Error('Incomplete app shell');
 return `/* MAGIC ${version}: do not block boot on optional model downloads. */
'use strict';
const RELEASE=${JSON.stringify(version)},SCOPE=new URL(self.registration.scope),INDEX=new URL('index.html',SCOPE).href;
const PREFIX='magic-exiled:'+SCOPE.pathname+':',NAME=PREFIX+${JSON.stringify(hash)};
const SHELL=${JSON.stringify(shell)}.map(file=>new URL(file,SCOPE).href);
const writes=new Set();let cacheFailure=false;
const inScope=url=>url.origin===SCOPE.origin&&url.pathname.startsWith(SCOPE.pathname);
const usable=response=>response.ok&&response.status!==206&&response.type!=='opaque'&&(!response.url||inScope(new URL(response.url)));
function store(cache,key,response){
 const pending=cache.put(key,response).catch(error=>{cacheFailure=true;console.warn('MAGIC offline cache:',error);}).finally(()=>writes.delete(pending));
 writes.add(pending);return pending;
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(NAME);
 await cache.addAll(SHELL.map(url=>new Request(url,{cache:'reload',credentials:'same-origin'})));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('message',event=>{
 if(event.data?.type==='MAGIC_RELEASE_INFO')event.ports[0]?.postMessage({release:RELEASE,scope:SCOPE.href});
 if(event.data?.type==='MAGIC_RUNTIME_READY'&&event.data.release===RELEASE)event.waitUntil((async()=>{
  // Keep the previous complete offline release until the new game has booted
  // and every requested runtime response has finished writing successfully.
  while(writes.size)await Promise.all([...writes]);
  if(!cacheFailure){const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith(PREFIX)&&n!==NAME).map(n=>caches.delete(n)));}
  event.ports[0]?.postMessage({release:RELEASE,offlineReady:!cacheFailure});
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET'||request.headers.has('range'))return;
 const url=new URL(request.url);if(!inScope(url))return;
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
  const saved=await cache.match(request);if(saved)return saved;
  // Unversioned GLBs must never come from the previous release's HTTP cache.
  const response=await fetch(new Request(request,{cache:'reload'}));
  if(usable(response))event.waitUntil(store(cache,request,response.clone()));
  return response;
 })());
});
`;
}
