import test from 'node:test';
import assert from 'node:assert/strict';
import {MeshStandardMaterial,MeshPhysicalMaterial,ShaderLib,Texture} from 'three';
import {applyMobileLighting} from './mobile-lighting.js';
import {hasFragmentOnlySkinCallback} from './skinned-room-bounds.js';

test('mobile lighting preserves material maps and a stable fragment-only program identity',()=>{
 const map=new Texture(),normal=new Texture(),m=new MeshStandardMaterial({map,normalMap:normal,metalness:.7,roughness:.4});
 applyMobileLighting(m);const compile=m.onBeforeCompile,key=m.customProgramCacheKey(),version=m.version;
 const shader={fragmentShader:ShaderLib.standard.fragmentShader};m.onBeforeCompile(shader);
 assert.match(shader.fragmentShader,/RE_Direct_BlinnPhong/);assert.match(shader.fragmentShader,/roughnessFactor/);assert.match(shader.fragmentShader,/metalnessFactor/);
 assert.equal(m.map,map);assert.equal(m.normalMap,normal);assert.equal(m.metalness,.7);assert.equal(m.roughness,.4);assert.equal(hasFragmentOnlySkinCallback(m,compile),true);
 applyMobileLighting(m);assert.equal(m.onBeforeCompile,compile);assert.equal(m.customProgramCacheKey(),key);assert.equal(m.version,version);
 // Room masking legitimately wraps the prepared callback afterwards.
 const fog=function(s){compile.call(this,s);s.fragmentShader+='\n// room mask';};m.onBeforeCompile=fog;
 applyMobileLighting(m);assert.equal(m.onBeforeCompile,fog);
 const masked={fragmentShader:ShaderLib.standard.fragmentShader};m.onBeforeCompile(masked);assert.match(masked.fragmentShader,/room mask/);
});

test('advanced physical materials and incompatible authored shader paths stay protected',()=>{
 const physical=new MeshPhysicalMaterial({clearcoat:1});const compile=physical.onBeforeCompile;
 applyMobileLighting(physical);assert.equal(physical.onBeforeCompile,compile);
 const m=new MeshStandardMaterial();m.onBeforeCompile=shader=>{shader.fragmentShader+='\n// authored colour';};
 applyMobileLighting(m);const shader={fragmentShader:ShaderLib.standard.fragmentShader};m.onBeforeCompile(shader);assert.match(shader.fragmentShader,/authored colour/);
 assert.equal(hasFragmentOnlySkinCallback(m,m.onBeforeCompile),false);
 assert.throws(()=>m.onBeforeCompile({fragmentShader:'invalid shader'}),/Unsupported mobile lighting/);
});

test('Lambert keeps standard geometry transform chunks and authored surface callbacks',()=>{
 const m=new MeshStandardMaterial(),map=new Texture();m.map=map;
 const shader={vertexShader:ShaderLib.standard.vertexShader,fragmentShader:ShaderLib.standard.fragmentShader};
 applyMobileLighting(m,{model:'lambert'});m.onBeforeCompile(shader);
 for(const chunk of ['morphtarget_vertex','skinning_vertex','displacementmap_vertex','project_vertex'])assert.ok(shader.vertexShader.includes('#include <'+chunk+'>'));
 assert.match(shader.fragmentShader,/lights_lambert/);assert.equal(m.map,map);assert.equal(hasFragmentOnlySkinCallback(m,m.onBeforeCompile),true);
});
