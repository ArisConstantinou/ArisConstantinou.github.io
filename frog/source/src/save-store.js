/** Complete multi-region campaigns live in IndexedDB, without a region/unit cap. */
let databasePromise=null,writeQueue=Promise.resolve();
function database(){
  if(typeof indexedDB==='undefined')return Promise.resolve(null);
  if(!databasePromise)databasePromise=new Promise((resolve,reject)=>{
    const request=indexedDB.open('frog-creek-dominion',1);
    request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('saves'))request.result.createObjectStore('saves');};
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>{databasePromise=null;reject(request.error||new Error('Αδυναμία ανοίγματος αποθήκευσης'));};
    request.onblocked=()=>reject(new Error('Η αποθήκευση χρησιμοποιείται από άλλη καρτέλα'));
  });
  return databasePromise;
}
export async function loadPersistentSave(){
  const db=await database();if(!db)return null;
  return new Promise((resolve,reject)=>{
    const request=db.transaction('saves','readonly').objectStore('saves').get('campaign');
    request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error);
  });
}
export function persistSave(data){
  // Clone synchronously so the next frame cannot mutate a queued snapshot.
  const snapshot=JSON.parse(JSON.stringify(data));
  const write=writeQueue.catch(()=>{}).then(async()=>{
    const db=await database();if(!db)return false;
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('saves','readwrite');tx.objectStore('saves').put(snapshot,'campaign');
      tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Η αποθήκευση ακυρώθηκε'));
    });
  });writeQueue=write;return write;
}
export function mostRecentSave(local,persistent){
  if(!local)return persistent||null;if(!persistent)return local;
  return (persistent.savedAt||0)>(local.savedAt||0)?persistent:local;
}
