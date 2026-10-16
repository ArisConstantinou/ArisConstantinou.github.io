import test from 'node:test';import assert from 'node:assert/strict';import {ensureReleaseWorker,releaseWorkerInfo,notifyReleaseReady,releaseReloadURL} from './release-worker.js';
const base='https://example.test/magic/',url=base+'sw.js?release=1.4.4';
function fixture(){const worker=new EventTarget();Object.assign(worker,{scriptURL:url,state:'installing'});const sw=new EventTarget(),registration={installing:worker,waiting:null,active:{scriptURL:base+'sw.js',state:'activated'},update:async()=>{}};Object.assign(sw,{controller:registration.active,register:async script=>{assert.equal(script,url);return registration;},getRegistration:async()=>registration});return{sw,worker,registration};}
test('release boot waits for install, activation and new controller before loading models',async()=>{const {sw,worker,registration}=fixture();let booted=false;const pending=ensureReleaseWorker(sw,base,'1.4.4',1000).then(()=>booted=true);await new Promise(r=>setTimeout(r,0));assert.equal(booted,false);worker.state='activated';registration.active=worker;registration.installing=null;worker.dispatchEvent(new Event('statechange'));await new Promise(r=>setTimeout(r,0));assert.equal(booted,false);sw.controller=worker;sw.dispatchEvent(new Event('controllerchange'));await pending;assert.equal(booted,true);});
test('failed new precache never falls back to old model cache',async()=>{const {sw,worker}=fixture();const pending=ensureReleaseWorker(sw,base,'1.4.4',1000);await new Promise(r=>setTimeout(r,0));worker.state='redundant';worker.dispatchEvent(new Event('statechange'));await assert.rejects(pending,/διακόπηκε/);});
test('offline boot accepts only an activated controller from this exact release',async()=>{const {sw,worker,registration}=fixture();sw.register=async()=>{throw Error('offline')};await assert.rejects(ensureReleaseWorker(sw,base,'1.4.4',50),/offline/);worker.state='activated';registration.active=sw.controller=worker;registration.installing=null;assert.equal(await ensureReleaseWorker(sw,base,'1.4.4',50),registration);});
test('unsupported service worker uses ordinary network loading',async()=>{assert.equal(await ensureReleaseWorker(null,base,'1.4.4'),null);});

test('worker handshake checks actual release bytes, not just a matching script query',async()=>{
 const {sw,worker,registration}=fixture();worker.state='activated';sw.controller=registration.active=worker;registration.installing=null;
 worker.postMessage=(message,ports)=>ports[0].postMessage({release:'1.6.2',scope:base});
 await assert.rejects(ensureReleaseWorker(sw,base,'1.4.4',50),error=>error.releaseMismatch==='1.6.2');
});
test('matching active release handshake allows offline-compatible boot',async()=>{
 const {sw,worker,registration}=fixture();worker.state='activated';sw.controller=registration.active=worker;registration.installing=null;
 worker.postMessage=(message,ports)=>ports[0].postMessage({release:'1.4.4',scope:base});
 assert.equal(await ensureReleaseWorker(sw,base,'1.4.4',50),registration);
});
test('old cache retirement is requested only explicitly after game assets are ready',async()=>{
 const messages=[],sw={controller:{postMessage:message=>messages.push(message)}};
 assert.deepEqual(messages,[]);notifyReleaseReady(sw,'1.6.2');
 assert.deepEqual(messages,[{type:'MAGIC_RUNTIME_READY',release:'1.6.2'}]);
 assert.equal(await releaseWorkerInfo(null),null);
});
test('stale entry recovery is bounded and does not require browser storage access',()=>{
 const fresh=releaseReloadURL(base+'?v=old&hearthQA=1#view','1.6.2');
 assert.equal(fresh,base+'?v=1.6.2&hearthQA=1#view');assert.equal(releaseReloadURL(fresh,'1.6.2'),null);
});
