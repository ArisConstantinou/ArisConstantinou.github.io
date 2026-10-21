import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as THREE from 'three';
const {createFireEffects}=await import(process.env.MAGIC_FIRE_SOURCE||'./fire-effects.js');

// Exact pre-optimization factories, retained with hashes and provenance so the
// comparison remains reproducible in a standalone source checkout.
import {createFireEffects as referenceFire} from './test-fixtures/fire-effects-1.6.22.js';


test('reference factory bytes match the retained 1.6.22 provenance',async()=>{
 const manifest=JSON.parse(await readFile(new URL('./test-fixtures/fire-oracle-provenance.json',import.meta.url),'utf8'));
 assert.equal(manifest.release,'1.6.22');
 for(const row of manifest.files){
  const bytes=Buffer.from((await readFile(new URL('./test-fixtures/'+row.fixtureFile,import.meta.url),'utf8')).replace(/\r\n/g,'\n'));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),row.fixtureSha256);
  const original=row.adjustment.startsWith('Only ')?Buffer.from(bytes.toString().replace("from '../stored-fire.js'","from './stored-fire.js'")):bytes;
  assert.equal(createHash('sha256').update(original).digest('hex'),row.originalSha256);
 }
});

const vector=v=>v.toArray();
function objectState(root){
 const rows=[];
 root.traverse(o=>rows.push({type:o.type,name:o.name,position:vector(o.position),quaternion:vector(o.quaternion),scale:vector(o.scale),
  visible:o.isInstancedMesh&&o.count===0?false:o.visible,count:o.isInstancedMesh?o.count:undefined,
  matrix:o.isInstancedMesh?Array.from(o.instanceMatrix.array):undefined,
  puff:o.geometry?.getAttribute('puff')?Array.from(o.geometry.getAttribute('puff').array):undefined,
  light:o.isLight?{intensity:o.intensity,distance:o.distance,color:vector(o.color)}:undefined,
  uniforms:o.material?.uniforms?Object.fromEntries(Object.entries(o.material.uniforms).map(([key,u])=>[key,u.value?.toArray?u.value.toArray():u.value])):undefined,
  shaders:o.material?.isShaderMaterial?[o.material.vertexShader,o.material.fragmentShader]:undefined}));
 return rows;
}
const pendingEnd=a=>Math.max(0,...a.updateRanges.map(r=>r.start+r.count));
function assertUpload(a,beforeVersion,beforeEnd,components){
 assert.equal(a.version,beforeVersion+(components>0?1:0));
 assert.deepEqual(a.updateRanges,components>0?[{start:0,count:Math.max(beforeEnd,components)}]:beforeEnd?[{start:0,count:beforeEnd}]:[]);
}
function pair(factory,reference,...args){
 const scene=new THREE.Scene(),originalScene=new THREE.Scene();
 return {scene,originalScene,current:factory(scene,...args),original:reference(originalScene,...args)};
}
function same(p){
 assert.deepEqual(p.current.counts(),p.original.counts());
 assert.deepEqual(objectState(p.scene),objectState(p.originalScene));
}
function cameraAt(x=9,z=12){const camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.set(x,8,z);camera.lookAt(0,1,0);camera.updateMatrixWorld(true);return camera;}

test('burn flames retain exact reference state and upload only nonempty active prefixes',()=>{
 const p=pair(createFireEffects,referenceFire),flames=p.scene.children.find(o=>o.isInstancedMesh),attribute=flames.instanceMatrix;
 const player={body:{position:new THREE.Vector3(1,.95,2)},cy:.95,dead:false};
 const actor={body:{position:new THREE.Vector3(-2,1.2,3),quaternion:new THREE.Quaternion()},cy:1.2,burnUntil:100};
 const wood={position:new THREE.Vector3(4,.4,-3),ext:{x:.8,y:.4,z:.6},flammable:true,burnUntil:100};
 const shield={kind:'shield',body:{position:new THREE.Vector3(2,.5,1),quaternion:new THREE.Quaternion().setFromEuler(new THREE.Euler(.3,.4,.2))},flammable:true,burnUntil:100};
 let spell={charged:false};const camera=cameraAt();
 function update(time,entities=[],surfaces=[],extra={}){
  const version=attribute.version,end=pendingEnd(attribute),input={spell,player,entities,surfaces,time,camera,playing:true,...extra};
  p.original.update(input);p.current.update(input);same(p);
  assert.equal(flames.visible,p.originalScene.children.find(o=>o.isInstancedMesh).visible);assertUpload(attribute,version,end,flames.count*16);
 }
 assert.equal(flames.visible,p.originalScene.children.find(o=>o.isInstancedMesh).visible);assert.equal(attribute.version,0);
 update(0);update(.1);assert.equal(attribute.version,0);
 update(.2,[actor]);assert.equal(flames.count,5);assert.deepEqual(attribute.updateRanges,[{start:0,count:80}]);
 attribute.clearUpdateRanges();update(.3,[actor],[wood]);assert.equal(flames.count,13);assert.deepEqual(attribute.updateRanges,[{start:0,count:208}]);
 // A second simulation update before a draw must retain the larger pending write.
 update(.4,[actor]);assert.equal(flames.count,5);assert.deepEqual(attribute.updateRanges,[{start:0,count:208}]);
 attribute.clearUpdateRanges();camera.position.set(-7,5,11);camera.lookAt(1,1,0);camera.updateMatrixWorld(true);
 update(.5,[actor,shield],[wood]);assert.equal(flames.count,21);assert.deepEqual(attribute.updateRanges,[{start:0,count:336}]);
 const clearVersion=attribute.version,clearRanges=structuredClone(attribute.updateRanges);
 p.original.clear();p.current.clear();same(p);assert.equal(flames.visible,p.originalScene.children.find(o=>o.isInstancedMesh).visible);assert.equal(attribute.version,clearVersion);assert.deepEqual(attribute.updateRanges,clearRanges);
 update(.6);attribute.clearUpdateRanges();update(.7,[shield]);assert.equal(flames.count,8);
 p.original.setEnabled(false);p.current.setEnabled(false);same(p);assert.equal(flames.visible,p.originalScene.children.find(o=>o.isInstancedMesh).visible);
 update(.8,[actor],[wood]);p.original.setEnabled(true);p.current.setEnabled(true);update(.9,[actor]);
 update(1,[actor],[],{playing:false});update(1.1,[actor],[],{player:null});
 // Stored fire keeps its original three draws while the empty burn pool is hidden.
 spell={charged:true,takenAt:1,torch:{position:new THREE.Vector3(-1,2,-3)}};
 update(1.2);assert.equal(flames.count,0);assert.equal(p.current.counts().drawCalls,3);
});
