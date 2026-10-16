import test from 'node:test';import assert from 'node:assert/strict';
import {guardDecoderWorker,decoderFailureBridge,RecoverableDracoLoader} from './recoverable-draco-loader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
function worker(){const events=new Map();return{_callbacks:{},postMessage(){},onmessage(){},terminate(){this.terminated=true;},addEventListener(name,callback){events.set(name,callback);},emit(name,event){events.get(name)?.(event);}};}
test('a WebKit WASM trap returned as a normal decoder task error enters bounded fallback',()=>{
 const w=worker(),failures=[];let normal=0;w.onmessage=()=>normal++;w._callbacks={1:{reject:e=>failures.push(e)},2:{reject:e=>failures.push(e)}};
 const close=guardDecoderWorker(w);try{w.onmessage({data:{type:'error',id:1,error:"Out of bounds memory access (evaluating '(jc=a._emscripten_bind_Decoder_DecodeArrayToMesh_3=a.asm.La).apply(null,arguments)')"}});assert.equal(w.terminated,true);assert.equal(failures.length,2);assert(failures.every(e=>e.decoderFault));assert.equal(normal,0);}finally{close();}
});
test('a corrupt geometry message remains a normal finite asset error',()=>{
 const w=worker();let normal=0;w.onmessage=()=>normal++;const close=guardDecoderWorker(w);
 try{w.onmessage({data:{type:'error',id:1,error:'Unexpected geometry type.'}});assert.equal(normal,1);assert(!w.terminated);}finally{close();}
});
test('worker constructor rejection propagates to every pending mesh and ignores late messages',()=>{
 const w=worker(),failures=[];let returned=0;w.onmessage=()=>returned++;w._callbacks={1:{reject:e=>failures.push(e)},2:{reject:e=>failures.push(e)}};
 const close=guardDecoderWorker(w);w.onmessage({data:{type:'magic-decoder-failure',error:'Out of bounds memory access'}});w.onmessage({data:{type:'decode',id:1}});
 assert.equal(w.terminated,true);assert.equal(failures.length,2);assert(failures.every(e=>e.decoderFault));assert.equal(returned,0);assert.throws(()=>w.postMessage({type:'decode'}),/Out of bounds/);close();
});
test('a silently stalled decoder fails once, while normal work and disposal clear its deadline',async()=>{
 const w=worker();let rejected=0;w._callbacks={1:{reject:()=>rejected++}};const close=guardDecoderWorker(w,{timeoutMs:12});w.postMessage({type:'decode'});await new Promise(r=>setTimeout(r,25));assert.equal(rejected,1);assert.equal(w.terminated,true);close();
 const live=worker();let received=0;live.onmessage=()=>received++;const dispose=guardDecoderWorker(live,{timeoutMs:12});live.postMessage({type:'decode'});live.onmessage({data:{type:'decode',id:1}});dispose();await new Promise(r=>setTimeout(r,25));assert.equal(received,1);assert(!live.terminated);
});
test('worker-side rejected initialization is forwarded instead of losing its error',()=>{
 const original=globalThis.self,events=new Map(),sent=[];globalThis.self={addEventListener:(name,fn)=>events.set(name,fn),postMessage:data=>sent.push(data)};
 try{decoderFailureBridge();let handled=false;events.get('unhandledrejection')({reason:Error('WASM constructor failed'),preventDefault(){handled=true;}});assert.equal(sent[0].type,'magic-decoder-failure');assert.equal(sent[0].error,'WASM constructor failed');assert(handled);}finally{globalThis.self=original;}
});
test('shared compressed geometry reuses the same job after its input has transferred to a worker',async()=>{
 const original=DRACOLoader.prototype.decodeGeometry;let calls=0;
 DRACOLoader.prototype.decodeGeometry=function(buffer){calls++;structuredClone(buffer,{transfer:[buffer]});return Promise.resolve({geometry:'original'});};
 try{const loader=new RecoverableDracoLoader(),buffer=new ArrayBuffer(8),config={attributeIDs:{position:0}},a=loader.decodeGeometry(buffer,config);assert.equal(buffer.byteLength,0);const b=loader.decodeGeometry(buffer,config);assert.equal(a,b);assert.deepEqual(await a,{geometry:'original'});assert.equal(calls,1);}finally{DRACOLoader.prototype.decodeGeometry=original;}
});
