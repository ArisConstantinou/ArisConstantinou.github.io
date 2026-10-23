const key='magic-device-benchmark-v1';
export function compactReport(report){
  const {storageUnavailable,...rest}=report;
  return {...rest,imagesOmitted:true,scenes:report.scenes.map(({image,...scene})=>scene),issues:(report.issues||[]).map(({image,captures,...issue})=>({...issue,captures:captures?.map(({image,...frame})=>frame)}))};
}
export function createBenchmarkStorage({local=()=>globalThis.localStorage,indexed=()=>globalThis.indexedDB}={}){
  const detail=(backend,error)=>({backend,name:error?.name||'Error',message:String(error?.message||error)});
  async function database(){
    return new Promise((resolve,reject)=>{
      const request=indexed()?.open('magic-benchmarks',1);if(!request){reject(new Error('IndexedDB unavailable'));return;}
      let settled=false;
      const timer=setTimeout(()=>{settled=true;reject(new Error('IndexedDB timeout'));},1500);
      request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('reports'))request.result.createObjectStore('reports');};
      request.onsuccess=()=>{clearTimeout(timer);if(settled)request.result.close();else resolve(request.result);};
      request.onerror=()=>{clearTimeout(timer);reject(request.error);};
      request.onblocked=()=>{clearTimeout(timer);settled=true;reject(new Error('IndexedDB blocked by another tab'));};
    });
  }
  async function transact(mode,fn){const db=await database();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('reports',mode),r=fn(tx.objectStore('reports'));tx.oncomplete=()=>resolve(r.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Transaction aborted'));});}finally{db.close();}}
  return {
    async save(report){
      const errors=[];
      // Always keep the small measurement separately from screenshots. A JPEG
      // quota failure must not lose the timing data or claim all storage failed.
      let localSaved=false;
      try{const value=compactReport(report);value.storage={saved:true,backend:'localStorage',imagesSaved:false,errors:[]};local().setItem(key,JSON.stringify(value));localSaved=true;}catch(e){errors.push(detail('localStorage',e));}
      for(const images of [true,false])try{
        const value=images?{...report}:compactReport(report);
        value.storage={saved:true,backend:'IndexedDB',imagesSaved:images&&!value.imagesOmitted,errors:[...errors]};
        await transact('readwrite',s=>s.put(value,'latest'));
        return value.storage;
      }catch(e){errors.push(detail(images?'IndexedDB':'IndexedDB without images',e));}
      return {saved:localSaved,backend:localSaved?'localStorage':null,imagesSaved:false,errors};
    },
    async load(){
      const candidates=[];
      try{const value=JSON.parse(local().getItem(key));if(value)candidates.push(value);}catch{}
      try{const value=await transact('readonly',s=>s.get('latest'));if(value)candidates.push(value);}catch{}
      return candidates.filter(r=>[1,2,3].includes(r.schema)).sort((a,b)=>String(b.finishedAt||b.createdAt).localeCompare(String(a.finishedAt||a.createdAt))||Number(!!a.imagesOmitted)-Number(!!b.imagesOmitted))[0]||null;
    }
  };
}
