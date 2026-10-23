import test from 'node:test';import assert from 'node:assert/strict';
import {createGpuTimer} from './benchmark-gpu.js';
import {createBenchmarkStorage,compactReport} from './benchmark-storage.js';
import {phaseSummary} from './performance-metrics.js';
import {estimateResources} from './benchmark-memory.js';
import * as THREE from 'three';
test('first approach stall is retained separately and in whole-scene statistics',()=>{
 const rows=[{elapsed:350,interval:350,cpu:{render:20},calls:40,triangles:500},{elapsed:500,interval:150,cpu:{render:10},calls:40,triangles:500},{elapsed:2100,interval:16,cpu:{render:4},calls:40,triangles:500}];
 const s=phaseSummary(rows);assert.equal(s.all.frames.max,350);assert.equal(s.firstTwoSeconds.frames.max,350);assert.equal(s.steady.frames.max,16);
});
test('paused frames do not inflate gameplay results',()=>{const s=phaseSummary([{elapsed:100,interval:50,active:true,cpu:{render:20},calls:40,triangles:500},{elapsed:3000,interval:8,active:false,cpu:{render:4},calls:40,triangles:500}]);assert.equal(s.all.fps,20);assert.equal(s.steady,null);});
test('compact report retains frame timestamps without multiple screenshot payloads',()=>{const r=compactReport({scenes:[],issues:[{image:'one',captures:[{at:100,image:'one'},{at:200,image:'two'}]}]});assert.equal(r.issues[0].captures[0].at,100);assert.equal(r.issues[0].captures[1].image,undefined);});
function fakeGL(supported=true){let disjoint=false,available=false,deleted=0;const ext={TIME_ELAPSED_EXT:1,GPU_DISJOINT_EXT:2};return {getExtension:()=>supported?ext:null,isContextLost:()=>false,getParameter:()=>disjoint,createQuery:()=>({}),beginQuery(){},endQuery(){},deleteQuery(){deleted++},getQueryParameter:(q,k)=>k===3?available:7500000,QUERY_RESULT_AVAILABLE:3,QUERY_RESULT:4,setAvailable:v=>available=v,setDisjoint:v=>disjoint=v,get deleted(){return deleted}};}
test('GPU queries are asynchronous, remain attached to their original frame and discard disjoint data',()=>{
 const gl=fakeGL(),timer=createGpuTimer(gl),first={},second={};timer.begin();timer.end(first);timer.begin();timer.end(second);assert.equal(first.gpuMs,undefined);
 gl.setAvailable(true);timer.poll();assert.equal(first.gpuMs,7.5);assert.equal(second.gpuMs,7.5);assert.equal(gl.deleted,2);
 gl.setAvailable(false);const third={};timer.begin();timer.end(third);gl.setDisjoint(true);timer.poll();assert.equal(third.gpuMs,undefined);assert.equal(timer.status.discarded,1);timer.dispose();
});
test('unsupported GPU timing reports the capability reason and never substitutes CPU time',()=>{const timer=createGpuTimer(fakeGL(false)),row={cpu:{render:4}};timer.begin();timer.end(row);timer.dispose();assert.equal(timer.status.supported,false);assert.match(timer.status.reason,/EXT_disjoint/);assert.equal(row.gpuMs,undefined);});
test('GPU pending queue is bounded',()=>{const timer=createGpuTimer(fakeGL());for(let i=0;i<30;i++){timer.begin();timer.end({});}assert.equal(timer.status.skipped,22);timer.dispose();assert.equal(timer.status.discarded,8);});
const report={schema:2,createdAt:'2026-10-17',scenes:[{image:'large-image',summary:{fps:42}}],issues:[{image:'another-image',label:'wall'}]};
test('blocked IndexedDB still saves and restores compact metrics without screenshot quota',async()=>{
 let stored;const store=createBenchmarkStorage({local:()=>({setItem:(k,v)=>stored=v,getItem:()=>stored}),indexed:()=>null});const result=await store.save(report);assert.equal(result.saved,true);assert.equal(result.imagesSaved,false);assert.equal(result.backend,'localStorage');assert.equal(result.errors.length,2);const restored=await store.load();assert.equal(restored.scenes[0].summary.fps,42);assert.equal(restored.scenes[0].image,undefined);assert.equal(report.scenes[0].image,'large-image');
});
test('complete storage failure keeps a precise quota/security reason',async()=>{
 const store=createBenchmarkStorage({local:()=>({setItem:()=>{throw Object.assign(new Error('Full'),{name:'QuotaExceededError'})}}),indexed:()=>{throw Object.assign(new Error('Denied'),{name:'SecurityError'})}});const result=await store.save(report);assert.equal(result.saved,false);assert.equal(result.errors[0].name,'QuotaExceededError');assert.equal(result.errors[1].name,'SecurityError');assert.equal(compactReport(report).issues[0].image,undefined);
});
test('resource estimate deduplicates GPU texture handles and geometry payloads',()=>{
 const scene=new THREE.Scene(),texture=new THREE.Texture({width:8,height:8});texture.generateMipmaps=false;const geometry=new THREE.BoxGeometry(),material=new THREE.MeshBasicMaterial({map:texture});scene.add(new THREE.Mesh(geometry,material),new THREE.Mesh(geometry,material));
 const renderer={properties:{get:()=>({__webglTexture:texture})},info:{memory:{textures:1,geometries:1},programs:[]}};const result=estimateResources(renderer,scene);assert.equal(result.uploadedTextureBytes,256);assert.equal(result.actualVramBytes,null);assert(result.loadedGeometryPayloadBytes>0);assert.equal(result.kind,'estimate');geometry.dispose();material.dispose();texture.dispose();
});

test('resource estimates count different views of one shared geometry buffer once',()=>{
 const scene=new THREE.Scene(),data=new Float32Array(120),a=new THREE.BufferGeometry(),b=new THREE.BufferGeometry();a.setAttribute('position',new THREE.BufferAttribute(data,3));b.setAttribute('position',new THREE.BufferAttribute(data.subarray(30,60),3));scene.add(new THREE.Mesh(a),new THREE.Mesh(b));const renderer={properties:{get:()=>({})},info:{memory:{},programs:[]}};assert.equal(estimateResources(renderer,scene).loadedGeometryPayloadBytes,data.byteLength);
});

test('current schema 3 combat JSON survives reload from fallback storage',async()=>{
 const saved={schema:3,scenario:'single-room-hearth-combat',createdAt:'2026-10-23',scenes:[],issues:[]};
 const storage=createBenchmarkStorage({local:()=>({getItem:()=>JSON.stringify(saved)}),indexed:()=>null});
 assert.deepEqual(await storage.load(),saved);
});
