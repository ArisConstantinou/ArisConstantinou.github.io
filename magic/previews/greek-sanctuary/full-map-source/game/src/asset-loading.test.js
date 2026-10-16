import test from 'node:test';import assert from 'node:assert/strict';
import {createAssetReader,createAssetQueue} from './asset-loading.js';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
test('known-size single allocation and inaccurate/compressed headers preserve decoded bytes',async()=>{
 for(const headers of [{'content-length':'4'},{'content-length':'2'},{'content-length':'8'},{'content-length':'2','content-encoding':'gzip'}]){
  const read=createAssetReader({fetchAsset:async()=>new Response(new ReadableStream({start(c){c.enqueue(Uint8Array.of(1,2));c.enqueue(Uint8Array.of(3,4));c.close();}}),{headers})});
  assert.deepEqual(new Uint8Array(await read('https://example.test/a')),Uint8Array.of(1,2,3,4));
 }
});
test('a browser without response streaming retains exact arrayBuffer fallback',async()=>{
 const read=createAssetReader({fetchAsset:async()=>({ok:true,headers:new Headers({'content-length':'3'}),arrayBuffer:async()=>Uint8Array.of(7,9,11).buffer})});
 assert.deepEqual(new Uint8Array(await read('https://example.test/legacy')),Uint8Array.of(7,9,11));
});
test('continuing slow transfer resets idle deadline and preserves exact bytes',async()=>{
 const events=[],data=Uint8Array.from({length:8},(_,i)=>i+12);
 const read=createAssetReader({idleMs:60,totalMs:1000,onProgress:e=>events.push(e),fetchAsset:async()=>new Response(new ReadableStream({async start(c){for(const v of data){await delay(20);c.enqueue(Uint8Array.of(v));}c.close();}}))});
 assert.deepEqual(new Uint8Array(await read('https://example.test/large.glb')),data);assert.equal(events.filter(e=>e.state==='retry').length,0);assert.equal(events.reduce((s,e)=>s+(e.delta||0),0),8);
});
test('stalled first request aborts, then retries successfully with a strict attempt bound',async()=>{
 let calls=0,aborted=false;
 const read=createAssetReader({idleMs:20,totalMs:500,retryDelayMs:1,fetchAsset:async(_,{signal})=>{calls++;if(calls>1)return new Response(Uint8Array.of(5,8));return new Response(new ReadableStream({start(c){signal.addEventListener('abort',()=>{aborted=true;c.error(signal.reason);});}}));}});
 assert.deepEqual(new Uint8Array(await read('https://example.test/a.glb')),Uint8Array.of(5,8));assert.equal(calls,2);assert.equal(aborted,true);
});
test('transient HTTP failures retry, missing assets fail once with a recoverable user message',async()=>{
 let calls=0;const read=createAssetReader({retryDelayMs:1,fetchAsset:async()=>new Response(++calls<3?'busy':'ok',{status:calls<3?503:200})});assert.equal(new TextDecoder().decode(await read('https://example.test/a')), 'ok');assert.equal(calls,3);
 calls=0;const missing=createAssetReader({fetchAsset:async()=>{calls++;return new Response('',{status:404})}});await assert.rejects(missing('https://example.test/missing'),e=>e.assetLoad&&e.cause.status===404&&e.message.includes('Δοκίμασε ξανά'));assert.equal(calls,1);
});
test('repeated stalls terminate after three attempts and cancel every owned response',async()=>{
 let calls=0,aborts=0;const read=createAssetReader({idleMs:15,totalMs:500,retryDelayMs:1,fetchAsset:async(_,{signal})=>{calls++;return new Response(new ReadableStream({start(c){signal.addEventListener('abort',()=>{aborts++;c.error(signal.reason);});}}));}});
 await assert.rejects(read('https://example.test/stuck'),e=>e.assetLoad);assert.equal(calls,3);assert.equal(aborts,3);
});
test('total deadline also bounds a connection that keeps sending tiny chunks',async()=>{
 let cancelled=false;const read=createAssetReader({idleMs:100,totalMs:50,retryDelayMs:1,fetchAsset:async(_,{signal})=>new Response(new ReadableStream({start(c){const timer=setInterval(()=>c.enqueue(Uint8Array.of(1)),5);signal.addEventListener('abort',()=>{clearInterval(timer);cancelled=true;c.error(signal.reason);});}}))});await assert.rejects(read('https://example.test/endless'),e=>e.assetLoad);assert.equal(cancelled,true);
});
test('two asset decode jobs run at most and failure releases its slot without reordering',async()=>{
 const queue=createAssetQueue(2);let active=0,peak=0;const starts=[];
 const jobs=[0,1,2,3,4].map(i=>queue(async()=>{starts.push(i);active++;peak=Math.max(peak,active);try{await delay(5);if(i===1)throw Error('bad model');return i;}finally{active--;}}));
 const results=await Promise.allSettled(jobs);assert.equal(peak,2);assert.deepEqual(starts,[0,1,2,3,4]);assert.equal(results[1].status,'rejected');assert.equal(results[4].value,4);assert.equal(active,0);
});
