import {ensureReleaseWorker,releaseWorkerInfo} from './release-worker.js';

const VERSION=/^\d+\.\d+\.\d+$/;
const HASH=/^[a-f0-9]{64}$/;
export function parseRelease(value){
  if(value?.schema!==1||value.channel!=='stable'||!VERSION.test(value.version)||!HASH.test(value.build)||!Array.isArray(value.shell))throw Error('Invalid release metadata');
  const names=new Set();
  for(const item of value.shell){
    if(!item||typeof item.file!=='string'||!/^[-\w./]+$/.test(item.file)||item.file.startsWith('/')||item.file.split('/').some(p=>!p||p==='.'||p==='..')||!HASH.test(item.sha256)||names.has(item.file))throw Error('Invalid release file');
    names.add(item.file);
  }
  if(!names.has('index.html')||!value.shell.some(f=>/\/engine\/index-[\w-]+\.js$/.test(f.file)))throw Error('Incomplete release');
  return value;
}

export function compareVersions(a,b){
  for(let i=0;i<3;i++){const difference=Number(a.split('.')[i])-Number(b.split('.')[i]);if(difference)return Math.sign(difference);}
  return 0;
}

/** Check only on entry/focus or user action, never in the rendering loop.
 * Checking never activates a worker or interrupts a running game.
 */
export function createGameUpdates({version,href,serviceWorker,fetcher=fetch,onChange=()=>{},canApply=()=>true,reload=url=>location.replace(url),install=ensureReleaseWorker,workerInfo=releaseWorkerInfo,timeoutMs=12000,now=Date.now,nonce=()=>crypto.randomUUID()}){
  const scope=new URL('./',href).href;
  let state={status:'idle',version,available:null},pending=null,applying=false,lastCheck=-Infinity;
  const emit=patch=>{state={...state,...patch};onChange({...state});return state;};
  async function request(file){
    const url=new URL(file,scope);url.searchParams.set('magic-update',nonce());
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
    try{const response=await fetcher(url.href,{cache:'no-store',credentials:'same-origin',signal:controller.signal});if(!response.ok)throw Error('Update download failed');return await response.arrayBuffer();}finally{clearTimeout(timer);}
  }
  const read=async()=>parseRelease(JSON.parse(new TextDecoder().decode(await request('release.json'))));
  async function check({force=false}={}){
    if(applying)return {...state};
    if(pending)return pending;
    if(!force&&now()-lastCheck<60000)return {...state};
    lastCheck=now();emit({status:'checking'});
    pending=(async()=>{try{
      const release=await read(),comparison=compareVersions(release.version,version);
      return emit({status:comparison>0?'available':comparison<0?'ahead':'current',available:comparison>0?release.version:null,build:release.build});
    }catch{return emit({status:'unavailable'});}finally{pending=null;}})();
    return pending;
  }
  async function apply(){
    if(applying||pending||!canApply())return false;
    applying=true;emit({status:'applying'});
    try{
      const release=await read();
      if(compareVersions(release.version,version)<=0){emit({status:release.version===version?'current':'ahead',available:null});return false;}
      // Validate entry/code bytes before switching the worker. A stale or
      // incomplete CDN deployment must leave the current game playable.
      for(const file of release.shell){const data=await request(file.file),digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',data)),b=>b.toString(16).padStart(2,'0')).join('');if(digest!==file.sha256)throw Error('Release file mismatch');}
      if(!canApply())throw Error('Game resumed');
      await install(serviceWorker,scope,release.version,30000);
      if(serviceWorker){const info=await workerInfo(serviceWorker.controller);if(info?.release!==release.version)throw Error('Worker version mismatch');}
      if(!canApply())throw Error('Game resumed');
      const url=new URL('index.html',scope);url.searchParams.set('v',release.version);
      reload(url.href);return true;
    }catch{emit({status:'failed'});return false;}finally{applying=false;}
  }
  return {check,apply,snapshot:()=>({...state})};
}
