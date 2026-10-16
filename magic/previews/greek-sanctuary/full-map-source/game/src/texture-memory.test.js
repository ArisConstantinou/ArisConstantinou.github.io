import test from 'node:test';import assert from 'node:assert/strict';import {Group,Mesh,PlaneGeometry,MeshBasicMaterial,PerspectiveCamera,EventDispatcher,DirectionalLight} from 'three';
import {imageDimensions,encodedTexture,remoteEncodedTexture,prepareEncodedTexture,prepareVisibleTextures,visibleEncodedTextures,textureMemoryStats,textureIsReady,configureTextureMemory,prefetchEncodedTextures} from './texture-memory.js';
function png(w=64,h=32){const a=new Uint8Array(24),v=new DataView(a.buffer);v.setUint32(0,0x89504e47);v.setUint32(4,0x0d0a1a0a);v.setUint32(16,w);v.setUint32(20,h);return a;}
test('encoded remote images obey the memory cap and evicted pixels restore exactly',async()=>{
 configureTextureMemory({maxEncodedBytes:24});let reads=0;
 const bytes=png(),r=renderer(),make=id=>remoteEncodedTexture('https://test/budget-'+id+'.png',{width:64,height:32,bytes:24},async()=>{reads++;return bytes;},{decode:async b=>{assert.deepEqual(new Uint8Array(await b.arrayBuffer()),bytes);return{open:true,close(){}};}});
 try{const a=make('a'),b=make('b');await prepareEncodedTexture(r,a);await prepareEncodedTexture(r,b);assert.equal(textureMemoryStats().remoteEncodedBytes,24);assert.equal(reads,2);
  await prepareEncodedTexture(r,a);assert.equal(reads,2,'A live GPU upload must not fetch its evicted CPU blob');
  assert.equal(await prefetchEncodedTextures(),true);assert.equal(reads,2,'Background warming must not download already received pixels again after eviction');
  r.restore();await prepareEncodedTexture(r,a);assert.equal(reads,3);assert.equal(textureIsReady(r,a),true);assert.equal(textureMemoryStats().remoteEncodedBytes,24);
 }finally{configureTextureMemory({maxEncodedBytes:64*1024*1024});}
});
test('remote images fetch only on demand, share exact encoded bytes and restore offline',async()=>{
 let reads=0,decodes=0;const bytes=png(),descriptor={width:64,height:32,bytes:bytes.length,mimeType:'image/png'};
 const read=async()=>{reads++;return bytes;},decode=async blob=>{decodes++;assert.deepEqual(new Uint8Array(await blob.arrayBuffer()),bytes);return{open:true,close(){}};};
 const a=remoteEncodedTexture('https://test/shared.png',descriptor,read,{decode}),b=remoteEncodedTexture('https://test/shared.png',descriptor,read,{decode});
 assert.equal(reads,0);assert.equal(a.source,b.source);const r=renderer(),init=r.initTexture;
 r.initTexture=function(t){if(!t.source.dataReady){this.properties.get(t).__webglTexture={};return;}return init.call(this,t);};
 await Promise.all([prepareEncodedTexture(r,a),prepareEncodedTexture(r,b)]);assert.equal(reads,1);assert.equal(decodes,2);
 r.restore();await prepareEncodedTexture(r,a);assert.equal(reads,1);assert.equal(decodes,3);
});
test('an incomplete remote image rejects before decode and can be retried',async()=>{
 let reads=0;const bytes=png(),t=remoteEncodedTexture('https://test/retry.png',{width:64,height:32,bytes:24},async()=>++reads===1?bytes.subarray(0,8):bytes,{decode:async()=>({open:true,close(){}})}),r=renderer();
 await assert.rejects(prepareEncodedTexture(r,t),/Incomplete texture/);await prepareEncodedTexture(r,t);assert.equal(reads,2);assert.equal(textureIsReady(r,t),true);
});
test('a queued texture reports its original failed transfer without silently starting another download',async()=>{
 let release,reads=0;const wait=new Promise(resolve=>release=resolve),r=renderer(),a=await encodedTexture(new Blob([png()]),{decode:async()=>({open:true,close(){}})});
 const blocking=prepareEncodedTexture(r,a,async()=>wait);await new Promise(setImmediate);
 const b=remoteEncodedTexture('https://test/queued-failure.png',{width:64,height:32,bytes:24},async()=>{reads++;throw Error('offline fixture')});
 const rejected=assert.rejects(prepareEncodedTexture(r,b),/offline fixture/);await new Promise(setImmediate);release();await blocking;await rejected;assert.equal(reads,1);
});
test('original WebP lossless, extended and lossy headers avoid allocating a bitmap',()=>{
 for(const kind of ['VP8L','VP8X','VP8 ']){const b=new Uint8Array(30),v=new DataView(b.buffer);b.set(new TextEncoder().encode('RIFF'),0);b.set(new TextEncoder().encode('WEBP'+kind),8);
  if(kind==='VP8L'){b[20]=0x2f;v.setUint32(21,(2047|(1023<<14)),true);}
  if(kind==='VP8X'){b[24]=255;b[25]=7;b[27]=255;b[28]=3;}
  if(kind==='VP8 '){b.set([0x9d,1,0x2a],23);v.setUint16(26,2048,true);v.setUint16(28,1024,true);}
  assert.deepEqual(imageDimensions(b),{width:2048,height:1024});assert.equal(imageDimensions(b.subarray(0,20)),null);
 }
});
function renderer(){let properties=new WeakMap();return{properties:{get:t=>{if(!properties.has(t))properties.set(t,{});return properties.get(t)}},getContext:()=>({isContextLost:()=>false}),initTexture(t){assert.equal(t.source.dataReady,true);assert.equal(t.image.open,true);Object.assign(this.properties.get(t),{__webglTexture:{},__version:t.version});},restore(){properties=new WeakMap()}};}
test('original PNG and progressive JPEG dimensions require no bitmap allocation',()=>{assert.deepEqual(imageDimensions(png()),{width:64,height:32});const a=Uint8Array.from([255,216,255,224,0,4,0,0,255,194,0,8,8,0,48,0,96,0,255,217]);assert.deepEqual(imageDimensions(a),{width:96,height:48});assert.equal(imageDimensions(Uint8Array.from([1,2,3])),null);});
test('decode is lazy, closes after upload and restores exact encoded bytes on lost GPU state',async()=>{let calls=0,closed=0;const bytes=png(),blob=new Blob([bytes]);const t=await encodedTexture(blob,{decode:async function(input,options){assert.equal(this,globalThis);calls++;assert.deepEqual(new Uint8Array(await input.arrayBuffer()),bytes);assert.equal(options.colorSpaceConversion,'none');return{open:true,width:64,height:32,close(){closed++}};}});
 const r=renderer();assert.equal(calls,0);assert.equal(textureIsReady(r,t),false);await prepareEncodedTexture(r,t);assert.equal(calls,1);assert.equal(closed,1);assert.equal(t.image.width,64);assert.equal(t.source.dataReady,false);await prepareEncodedTexture(r,t);assert.equal(calls,1);r.restore();await prepareEncodedTexture(r,t);assert.equal(calls,2);assert.equal(closed,2);assert.equal(textureMemoryStats().decodedBytes,0);
});
test('different images are never decoded simultaneously and failure frees the bitmap',async()=>{let active=0,max=0,closed=0;const make=()=>encodedTexture(new Blob([png()]),{decode:async()=>{active++;max=Math.max(max,active);return{open:true,close(){active--;closed++}};}}),a=await make(),b=await make(),r=renderer();
 await Promise.all([prepareEncodedTexture(r,a,async()=>{await new Promise(setImmediate);throw Error('upload failed')} ).catch(e=>assert.match(e.message,/upload failed/)),prepareEncodedTexture(r,b)]);assert.equal(max,1);assert.equal(active,0);assert.equal(closed,2);assert.equal(textureMemoryStats().decodedBytes,0);assert.equal(textureIsReady(r,b),true);
});
test('only visible colour surfaces and shadow alpha dependencies upload before render',async()=>{let calls=0;const make=()=>encodedTexture(new Blob([png()]),{decode:async()=>{calls++;return{open:true,close(){}}}}),front=await make(),hidden=await make(),shadow=await make(),dependency=await make(),root=new Group();
 const add=(t,x)=>{const m=new Mesh(new PlaneGeometry(),new MeshBasicMaterial({map:t}));m.position.set(x,0,-5);root.add(m);return m;};add(front,0).material.textureDependencies=[dependency];add(hidden,100).castShadow=true;const a=add(shadow,100);a.castShadow=true;a.material.alphaTest=.5;
 const light=new DirectionalLight();light.castShadow=true;light.position.set(0,10,10);Object.assign(light.shadow.camera,{left:-150,right:150,top:150,bottom:-150,near:.1,far:100});light.shadow.camera.updateProjectionMatrix();root.add(light,light.target);
 const camera=new PerspectiveCamera(50,1,.1,100),r=renderer();assert.deepEqual(new Set(visibleEncodedTextures(root,camera)),new Set([front,dependency,shadow]));await prepareVisibleTextures(r,root,undefined,camera);assert.equal(calls,3);assert.equal(prepareVisibleTextures(r,root,undefined,camera),null);assert.equal(textureIsReady(r,hidden),false);
});
test('new and reparented meshes prepare while removed meshes stop loading; restoration revisits live originals',async()=>{
 let calls=0;const make=()=>encodedTexture(new Blob([png()]),{decode:async()=>{calls++;return{open:true,close(){}}}}),root=new Group(),r=renderer();r.domElement=new EventDispatcher();
 assert.equal(prepareVisibleTextures(r,root),null);
 const a=await make(),mesh=new Mesh(new PlaneGeometry(),new MeshBasicMaterial({map:a}));root.add(mesh);await prepareVisibleTextures(r,root);assert.equal(calls,1);
 const b=await make(),removed=new Mesh(new PlaneGeometry(),new MeshBasicMaterial({map:b}));root.add(removed);root.remove(removed);assert.equal(prepareVisibleTextures(r,root),null);assert.equal(calls,1);
 root.add(removed);await prepareVisibleTextures(r,root);assert.equal(calls,2);r.restore();r.domElement.dispatchEvent({type:'webglcontextrestored'});await prepareVisibleTextures(r,root);assert.equal(calls,4);assert.equal(textureMemoryStats().decodedBytes,0);
});
