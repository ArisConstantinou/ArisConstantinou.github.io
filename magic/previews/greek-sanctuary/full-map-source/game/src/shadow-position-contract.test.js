import test from'node:test';import assert from'node:assert/strict';
import {MeshStandardMaterial,ShaderLib,UniformsUtils}from'three';
import {registerShadowPositionMaterial,shadowPositionsPreserved}from'./shadow-position-contract.js';
import {applyMobileLighting}from'./mobile-lighting.js';
import {hasFragmentOnlySkinCallback}from'./skinned-room-bounds.js';

test('reviewed world shading keeps its shadow contract through Lambert wrapping without enabling room-interior eligibility',()=>{
 const m=new MeshStandardMaterial();m.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=.9;');};registerShadowPositionMaterial(m);
 applyMobileLighting(m,{model:'lambert'});assert(shadowPositionsPreserved(m));assert(!hasFragmentOnlySkinCallback(m,m.onBeforeCompile));
 const shader={vertexShader:'',fragmentShader:'',uniforms:UniformsUtils.clone(ShaderLib.lambert.uniforms)};m.onBeforeCompile(shader);assert.equal(shader.vertexShader,ShaderLib.lambert.vertexShader);assert(shader.fragmentShader.includes('diffuseColor.rgb*=.9;'));
 m.onBeforeCompile=()=>{};assert(!shadowPositionsPreserved(m));m.dispose();
});
test('Lambert wrapping never certifies an unknown vertex displacement',()=>{
 const m=new MeshStandardMaterial();m.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed.y+=20.;');};applyMobileLighting(m,{model:'lambert'});assert(!shadowPositionsPreserved(m));m.dispose();
});
