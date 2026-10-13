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
  return registration;
}
