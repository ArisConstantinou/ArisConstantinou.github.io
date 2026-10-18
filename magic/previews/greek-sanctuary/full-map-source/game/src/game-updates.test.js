import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createGameUpdates,parseRelease,compareVersions} from './game-updates.js';
const bytes='complete release',sha=createHash('sha256').update(bytes).digest('hex');
const release=(version='1.6.20')=>({schema:1,channel:'stable',version,build:sha,shell:[{file:'index.html',sha256:sha},{file:'previews/greek-sanctuary/engine/index-test.js',sha256:sha}]});
const settings=(extra={})=>({version:'1.6.19',href:'https://example.com/magic/?v=1.6.17#old',nonce:()=>String(Math.random()),fetcher:async url=>new Response(url.includes('release.json')?JSON.stringify(release()):bytes),...extra});
test('strict stable metadata rejects incomplete, foreign and traversal paths',()=>{
  assert.equal(parseRelease(release()).version,'1.6.20');
  for(const change of [{schema:2},{channel:'preview'},{version:'1.6.17-fq.2'},{build:'x'},{shell:[]},{shell:[{file:'../index.html',sha256:sha}]},{shell:[{file:'https://bad/x',sha256:sha}]}])assert.throws(()=>parseRelease({...release(),...change}));
  assert.equal(compareVersions('1.6.20','1.6.9'),1);
});
test('actual application root overrides document asset base and old query; checking does not install/reload',async()=>{
  const seen=[];const u=createGameUpdates(settings({fetcher:async(url,options)=>{seen.push({url,options});return new Response(JSON.stringify(release()));},install:()=>assert.fail('background install'),reload:()=>assert.fail('background reload')}));
  assert.equal((await u.check()).status,'available');assert.equal((await u.check()).status,'available');assert.equal(seen.length,1);
  await u.check({force:true});assert.equal(seen.length,2);assert.notEqual(seen[0].url,seen[1].url);
  assert.equal(new URL(seen[0].url).pathname,'/magic/release.json');assert.equal(seen[0].options.cache,'no-store');
});
test('offline, HTTP failure and invalid JSON never claim current',async()=>{
  for(const fetcher of [async()=>{throw Error('offline');},async()=>new Response('',{status:503}),async()=>new Response('<html>')]){
    const u=createGameUpdates(settings({fetcher}));assert.equal((await u.check()).status,'unavailable');
  }
});
test('timeouts finish with retryable status',async()=>{
  const u=createGameUpdates(settings({timeoutMs:10,fetcher:async(url,{signal})=>new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(Error('timeout'))))}));
  assert.equal((await u.check()).status,'unavailable');
});
test('matching release and older published release never downgrade',async()=>{
  for(const [version,status]of [['1.6.19','current'],['1.6.18','ahead']]){
    const u=createGameUpdates(settings({fetcher:async()=>new Response(JSON.stringify(release(version))),install:()=>assert.fail('downgrade'),reload:()=>assert.fail('reload')}));
    assert.equal((await u.check()).status,status);assert.equal(await u.apply(),false);
  }
});
test('update requires safe game state, exact shell bytes and activated worker before reload',async()=>{
  const events=[];let safe=false;
  const u=createGameUpdates(settings({serviceWorker:{controller:{}},canApply:()=>safe,install:async(sw,scope,version)=>{events.push({scope,version});},workerInfo:async()=>({release:'1.6.20'}),reload:url=>events.push(url)}));
  assert.equal(await u.apply(),false);assert.equal(events.length,0);safe=true;
  assert.equal(await u.apply(),true);assert.deepEqual(events,[{scope:'https://example.com/magic/',version:'1.6.20'},'https://example.com/magic/index.html?v=1.6.20']);
});
test('mismatched bytes, incomplete deployment and worker mismatch retain current game',async()=>{
  for(const mode of ['hash','install','worker']){
    const u=createGameUpdates(settings({serviceWorker:{controller:{}},fetcher:async url=>new Response(url.includes('release.json')?JSON.stringify(release()):mode==='hash'?'bad':bytes),install:async()=>{if(mode==='install')throw Error('incomplete');},workerInfo:async()=>({release:mode==='worker'?'1.6.18':'1.6.20'}),reload:()=>assert.fail('must not reload')}));
    assert.equal(await u.apply(),false);assert.equal(u.snapshot().status,'failed');
  }
});
test('repeat taps share check and cannot trigger concurrent installs',async()=>{
  let unblock;const gate=new Promise(r=>unblock=r),calls=[];
  const u=createGameUpdates(settings({install:async()=>{calls.push('install');await gate;},reload:()=>calls.push('reload')}));
  const applying=u.apply();await new Promise(r=>setTimeout(r,15));assert.equal(await u.apply(),false);assert.equal((await u.check()).status,'applying');unblock();assert.equal(await applying,true);assert.deepEqual(calls,['install','reload']);
});
test('resuming during download cancels update before worker switch',async()=>{
  let safe=true;const u=createGameUpdates(settings({canApply:()=>safe,fetcher:async url=>{if(!url.includes('release.json'))safe=false;return new Response(url.includes('release.json')?JSON.stringify(release()):bytes);},install:()=>assert.fail('resumed'),reload:()=>assert.fail('resumed')}));
  assert.equal(await u.apply(),false);assert.equal(u.snapshot().status,'failed');
});
