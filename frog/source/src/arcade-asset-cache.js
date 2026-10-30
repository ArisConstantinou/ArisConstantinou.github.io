export function assetURL(path,baseURL,manifest){const url=new URL(path,baseURL),entry=manifest[path];if(entry)url.searchParams.set('asset',entry.sha256);return url.href;}
export function createAssetStore({baseURL,manifest,cacheStorage=globalThis.caches,fetcher=globalThis.fetch.bind(globalThis),onProgress=()=>{},migrationVersions=[],idleTimeout=60000}={}){
 const stats={networkBytes:0,cacheBytes:0,migratedBytes:0,cacheFailures:0,pendingWrites:0,requests:[]},pending=new Set(),inflight=new Map();let opened;
 const cache=()=>opened??=Promise.resolve().then(()=>cacheStorage?.open('frog-assets-v1')||null).catch(()=>{stats.cacheFailures++;return null;});
 const digest=async bytes=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
 const valid=async(bytes,entry)=>bytes.byteLength===entry.bytes&&await digest(bytes)===entry.sha256;
 function save(c,key,bytes,entry){if(!c)return;stats.pendingWrites++;const task=Promise.resolve().then(()=>c.put(key,new Response(bytes,{headers:{'content-type':entry.mime||'application/octet-stream','x-frog-sha256':entry.sha256}}))).catch(()=>{stats.cacheFailures++;}).finally(()=>{stats.pendingWrites--;pending.delete(task);});pending.add(task);}
 function read(path){if(inflight.has(path))return inflight.get(path);const promise=readOnce(path);inflight.set(path,promise);promise.catch(()=>inflight.delete(path));return promise;}
 async function readOnce(path){
  const entry=manifest[path];if(!entry)throw Error('Unknown game asset '+path);const began=performance.now(),key=new URL(path,baseURL).href,c=await cache();let response;
  try{response=await c?.match(key);}catch{stats.cacheFailures++;}
  try{if(response?.headers.get('x-frog-sha256')===entry.sha256){const bytes=await response.arrayBuffer();if(await valid(bytes,entry)){stats.cacheBytes+=bytes.byteLength;onProgress({path,loaded:entry.bytes,total:entry.bytes,source:'cache'});stats.requests.push({path,source:'cache',ms:performance.now()-began,bytes:bytes.byteLength});return bytes;}}}catch{stats.cacheFailures++;}
  for(const version of migrationVersions){try{const url=new URL(path,baseURL);url.searchParams.set('v',version);const old=await fetcher(url.href,{cache:'only-if-cached',mode:'same-origin'});if(!old.ok)continue;const bytes=await old.arrayBuffer();if(!await valid(bytes,entry))continue;stats.migratedBytes+=bytes.byteLength;save(c,key,bytes,entry);onProgress({path,loaded:entry.bytes,total:entry.bytes,source:'http-cache'});stats.requests.push({path,source:'http-cache',ms:performance.now()-began,bytes:bytes.byteLength});return bytes;}catch{/* Browser may not implement only-if-cached; normal fetch remains available. */}}
  const controller=new AbortController();let timer,reader;const reset=()=>{clearTimeout(timer);timer=setTimeout(()=>controller.abort(),idleTimeout);};reset();
  try{
   response=await fetcher(assetURL(path,baseURL,manifest),{cache:'force-cache',signal:controller.signal});if(!response.ok)throw Error('Asset HTTP '+response.status);let bytes;
   if(response.body?.getReader){reader=response.body.getReader();const chunks=[];let length=0;for(;;){const result=await reader.read();if(result.done)break;reset();length+=result.value.byteLength;if(length>entry.bytes)throw Error('Asset size mismatch');chunks.push(result.value);onProgress({path,loaded:length,total:entry.bytes,source:'network'});}bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}bytes=bytes.buffer;}else bytes=await response.arrayBuffer();
   if(!await valid(bytes,entry))throw Error('Asset integrity mismatch '+path);stats.networkBytes+=bytes.byteLength;save(c,key,bytes,entry);onProgress({path,loaded:entry.bytes,total:entry.bytes,source:'network'});stats.requests.push({path,source:'network',ms:performance.now()-began,bytes:bytes.byteLength});return bytes;
  }finally{clearTimeout(timer);reader?.releaseLock();}
 }
 return {read,stats,release:()=>inflight.clear(),flush:()=>Promise.allSettled([...pending]),resolve(url){const u=new URL(url,baseURL),base=new URL(baseURL);if(u.origin!==base.origin||!u.pathname.startsWith(base.pathname))return url;const path=decodeURIComponent(u.pathname.slice(base.pathname.length));return manifest[path]?assetURL(path,baseURL,manifest):url;}};
}
