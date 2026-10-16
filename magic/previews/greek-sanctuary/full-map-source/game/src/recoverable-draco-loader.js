import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

// A decoder constructor/initialization rejection occurs outside Three's decode
// try/catch. Forward it so all waiting meshes settle instead of hanging boot.
export function decoderFailureBridge(){
 const fail=event=>{self.postMessage({type:'magic-decoder-failure',error:String(event.reason?.message||event.message||'Decoder worker failed')});event.preventDefault();};
 self.addEventListener('error',fail);self.addEventListener('unhandledrejection',fail);
}
export function guardDecoderWorker(worker,{timeoutMs=45000,onFailure=()=>{}}={}){
 const originalMessage=worker.onmessage,originalPost=worker.postMessage.bind(worker);let timer,failure;
 const fail=reason=>{
  if(failure)return;failure=Object.assign(new Error(String(reason)),{decoderFault:true});clearTimeout(timer);
  onFailure(failure);worker.terminate();for(const task of Object.values(worker._callbacks))task.reject(failure);
 };
 const arm=()=>{clearTimeout(timer);timer=setTimeout(()=>fail('Decoder worker stopped responding'),timeoutMs);};
 worker.postMessage=(message,...rest)=>{if(failure)throw failure;if(message.type==='decode')arm();return originalPost(message,...rest);};
 worker.onmessage=event=>{
  if(failure)return;
  if(event.data.type==='magic-decoder-failure'){fail(event.data.error);return;}
  // Three catches decode-time WASM traps and posts a normal task error. Those
  // bypass the worker error/rejection bridge, so WebKit never reached the
  // existing JS fallback. A trapped module is unsafe for its other jobs too.
  if(event.data.type==='error'&&/out of bounds memory access|memory access out of bounds|out of memory|memory\.grow|unreachable/i.test(String(event.data.error))){fail(event.data.error);return;}
  arm();originalMessage.call(worker,event);
 };
 worker.addEventListener('error',event=>{event.preventDefault();fail(event.message);});
 worker.addEventListener('messageerror',()=>fail('Decoder worker message failed'));
 return()=>clearTimeout(timer);
}
export class RecoverableDracoLoader extends DRACOLoader{
 constructor(manager,{allowFallback=true}={}){super(manager);this.allowFallback=allowFallback;this.guardCleanups=[];this.decoding=new WeakMap();this.setWorkerLimit(1);}
 _initDecoder(){
  if(!this.guardedInit)this.guardedInit=super._initDecoder().then(async()=>{
   const old=this.workerSourceURL,body=await (await fetch(old)).text();
   this.workerSourceURL=URL.createObjectURL(new Blob(['('+decoderFailureBridge.toString()+')();\n',body]));URL.revokeObjectURL(old);
  });
  return this.guardedInit;
 }
 async _getWorker(id,cost){
  if(this.workerFailure)throw this.workerFailure;
  const worker=await super._getWorker(id,cost);
  if(!worker.magicGuarded){worker.magicGuarded=true;this.guardCleanups.push(guardDecoderWorker(worker,{onFailure:error=>{this.workerFailure=error;}}));}
  return worker;
 }
 decodeGeometry(buffer,config){
  if(!this.allowFallback)return super.decodeGeometry(buffer,config);
  const key=JSON.stringify(config),cached=this.decoding.get(buffer);
  if(cached?.key===key)return cached.promise;
  if(buffer.byteLength===0)return super.decodeGeometry(buffer,config);
  // Only compressed geometry is retained for one bounded fallback, never a
  // second full GLB, decoded mesh or image. Both decoders are the pinned0.180.0.
  const retained=buffer.slice(0);
  const promise=super.decodeGeometry(buffer,config).catch(error=>{
   if(!error.decoderFault)throw error;
   if(!this.fallback){
    console.warn('MAGIC: decoder worker failed; retrying the original geometry with the bundled JS decoder.');
    this.fallback=new RecoverableDracoLoader(this.manager,{allowFallback:false}).setDecoderPath(new URL('engine/',document.baseURI).href).setDecoderConfig({type:'js'});
   }
   return this.fallback.decodeGeometry(retained,config);
  });
  this.decoding.set(buffer,{key,promise});return promise;
 }
 dispose(){for(const clear of this.guardCleanups)clear();this.fallback?.dispose();return super.dispose();}
}
