/** A slow download remains healthy while bytes arrive. Bound stalls/retries,
 * rather than rejecting a large, still-progressing file after45 seconds. */
export function createAssetReader({fetchAsset=globalThis.fetch,idleMs=30000,totalMs=180000,attempts=3,retryDelayMs=350,onProgress=()=>{}}={}){
 return async function read(url){
  const started=Date.now();let last;
  for(let attempt=1;attempt<=attempts;attempt++){
   const controller=new AbortController();let timer,reader,loaded=0;
   const arm=()=>{clearTimeout(timer);const left=totalMs-(Date.now()-started);timer=setTimeout(()=>controller.abort(new Error(left<=idleMs?'asset-deadline':'asset-stalled')),Math.max(1,Math.min(idleMs,left)));};
   try{
    if(Date.now()-started>=totalMs)throw Error('asset-deadline');
    arm();onProgress({url,attempt,loaded:0,state:attempt===1?'loading':'retry'});
    const response=await fetchAsset(url,{signal:controller.signal,credentials:'same-origin'});
    if(!response.ok){await response.body?.cancel();const error=Error('Asset HTTP '+response.status);error.status=response.status;throw error;}
    const total=Number(response.headers.get('content-length'))||0,chunks=[];
    // Content-Length describes decoded bytes only without Content-Encoding.
    // Fill one buffer when trustworthy, avoiding a second full-size GLB copy.
    let storage=total>0&&total<=134217728&&!response.headers.get('content-encoding')?new Uint8Array(total):null;
    if(response.body?.getReader){
     reader=response.body.getReader();
     for(;;){arm();const {value,done}=await reader.read();if(done)break;
      if(storage&&loaded+value.byteLength<=storage.length)storage.set(value,loaded);
      else{if(storage){chunks.push(storage.subarray(0,loaded));storage=null;}chunks.push(value);}
      loaded+=value.byteLength;onProgress({url,attempt,loaded,total,delta:value.byteLength,state:'loading'});}
    }else{storage=null;const bytes=new Uint8Array(await response.arrayBuffer());chunks.push(bytes);loaded=bytes.byteLength;onProgress({url,attempt,loaded,total,delta:loaded,state:'loading'});}
    const data=storage?(loaded===storage.length?storage:storage.slice(0,loaded)):new Uint8Array(loaded);
    if(!storage){let offset=0;for(const chunk of chunks){data.set(chunk,offset);offset+=chunk.byteLength;}}
    onProgress({url,attempt,loaded,total,state:'complete'});return data.buffer;
   }catch(error){
    last=controller.signal.aborted?controller.signal.reason:error;
    const retryable=!error.status||[408,429].includes(error.status)||error.status>=500;
    if(!retryable||attempt===attempts||Date.now()-started+retryDelayMs>=totalMs)break;
   }finally{clearTimeout(timer);await reader?.cancel().catch(()=>{});reader?.releaseLock();}
   await new Promise(resolve=>setTimeout(resolve,retryDelayMs));
  }
  const error=new Error('Δεν ολοκληρώθηκε η λήψη. Έλεγξε τη σύνδεση και πάτησε «Δοκίμασε ξανά».',{cause:last});error.assetLoad=true;error.assetURL=String(url);throw error;
 };
}

export function createAssetQueue(limit=2){
 let active=0;const waiting=[];
 const drain=()=>{while(active<limit&&waiting.length){const {job,resolve,reject}=waiting.shift();active++;Promise.resolve().then(job).then(resolve,reject).finally(()=>{active--;drain();});}};
 return job=>new Promise((resolve,reject)=>{waiting.push({job,resolve,reject});drain();});
}
let observer=()=>{},received=0;
export function observeAssetLoading(callback){observer=callback||(()=>{});received=0;}
const read=createAssetReader({onProgress:event=>{received+=event.delta||0;observer({...event,received});}});
const queue=createAssetQueue(2);
/** Limit simultaneous compressed buffers, Draco work and image decoding.
 * Geometry, image pixels, animation and material settings stay untouched. */
export function loadGltfAsset(loader,url){const href=new URL(url,globalThis.document?.baseURI).href;return queue(async()=>{
 const data=await read(href),base=new URL('.',href).href,objects=[];let accepting=true;
 try{
  // The six original glTF props have external buffers/images. Fetch those
  // through the same bounded transport; parsing a GLB needs no URI rewrite.
  if(new DataView(data).getUint32(0,true)!==0x46546c67){
   const json=JSON.parse(new TextDecoder().decode(data));
   await Promise.all([...(json.buffers||[]),...(json.images||[])].map(async source=>{
    if(!source.uri||source.uri.startsWith('data:'))return;
    const bytes=await read(new URL(source.uri,base).href);if(!accepting)return;
    const blob=URL.createObjectURL(new Blob([bytes]));objects.push(blob);source.uri=blob;
   }));
   return await loader.parseAsync(JSON.stringify(json),base);
  }
  return await loader.parseAsync(data,base);
 }finally{accepting=false;for(const object of objects)URL.revokeObjectURL(object);}
});}
export function loadTextureAsset(loader,url){return queue(async()=>{
 const object=URL.createObjectURL(new Blob([await read(url)]));
 try{return await loader.loadAsync(object)}finally{URL.revokeObjectURL(object);}
});}
export const readAsset=read;
