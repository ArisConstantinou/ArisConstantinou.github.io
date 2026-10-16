/** Do not load fixed-name GLBs through a worker from an older release. */
export async function ensureReleaseWorker(serviceWorker, baseURI, version, timeoutMs = 90000) {
  if (!serviceWorker) return null;
  const scope = new URL('./', baseURI).href;
  const script = new URL('sw.js', scope);script.searchParams.set('release', version);
  let registration;
  try {
    registration = await serviceWorker.register(script.href, {scope, updateViaCache:'none'});
    await registration.update();
  } catch (error) {
    // The same complete release remains playable offline. An older worker
    // cannot safely serve this release's unversioned model files.
    registration = await serviceWorker.getRegistration(scope);
    if (registration?.active?.scriptURL !== script.href || registration.active.state !== 'activated') throw error;
  }
  const worker = registration.installing || registration.waiting || registration.active;
  if (!worker || worker.scriptURL !== script.href) throw new Error('Δεν ολοκληρώθηκε η ενημέρωση του MAGIC. Δοκίμασε ξανά με σύνδεση.');
  if (worker.state !== 'activated') await new Promise((resolve, reject) => {
    const finish = error => {clearTimeout(timer);worker.removeEventListener('statechange', changed);error ? reject(error) : resolve();};
    const changed = () => {if(worker.state === 'activated') finish();else if(worker.state === 'redundant') finish(new Error('Η ενημέρωση του MAGIC διακόπηκε. Επανάλαβε τη φόρτωση.'));};
    const timer = setTimeout(() => finish(new Error('Η ενημέρωση του MAGIC δεν ολοκληρώθηκε. Έλεγξε τη σύνδεση και ξαναδοκίμασε.')), timeoutMs);
    worker.addEventListener('statechange', changed);changed();
  });
  if (serviceWorker.controller?.scriptURL !== script.href) await new Promise((resolve, reject) => {
    const finish = error => {clearTimeout(timer);serviceWorker.removeEventListener('controllerchange', changed);error ? reject(error) : resolve();};
    const changed = () => {if(serviceWorker.controller?.scriptURL === script.href) finish();};
    const timer = setTimeout(() => finish(new Error('Η νέα έκδοση δεν ενεργοποιήθηκε. Επανάλαβε τη φόρτωση.')), timeoutMs);
    serviceWorker.addEventListener('controllerchange', changed);changed();
  });
  // The URL query alone is not a version check: the server can return newer
  // worker bytes for an old query while an old tab still has its old JS alive.
  const info=await releaseWorkerInfo(serviceWorker.controller);
  if(info&&info.release!==version){
    const error=new Error('Το MAGIC ενημερώθηκε. Χρειάζεται ανανέωση της σελίδας.');
    error.releaseMismatch=info.release;throw error;
  }
  return registration;
}

export function releaseWorkerInfo(worker){
  if(!worker?.postMessage||typeof MessageChannel==='undefined')return Promise.resolve(null);
  return new Promise(resolve=>{
    const channel=new MessageChannel();
    const done=value=>{clearTimeout(timer);channel.port1.close();channel.port2.close();resolve(value);};
    const timer=setTimeout(()=>done(null),1200);
    channel.port1.onmessage=event=>done(event.data);
    worker.postMessage({type:'MAGIC_RELEASE_INFO'},[channel.port2]);
  });
}

export function notifyReleaseReady(serviceWorker,release){
  serviceWorker?.controller?.postMessage?.({type:'MAGIC_RUNTIME_READY',release});
}

export function releaseReloadURL(href,release){
  const url=new URL(href);
  if(url.searchParams.get('v')===release)return null;
  url.searchParams.set('v',release);return url.href;
}
