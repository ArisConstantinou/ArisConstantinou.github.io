import test from'node:test';import assert from'node:assert/strict';import {registerHooks}from'node:module';
import {Scene,Group,Mesh,BoxGeometry,MeshStandardMaterial,PerspectiveCamera}from'three';
import {applyMobileLighting}from'./mobile-lighting.js';import {registerShadowPositionMaterial}from'./shadow-position-contract.js';import {hasFragmentOnlySkinCallback}from'./skinned-room-bounds.js';import {createShadowReceiverGuard}from'./shadow-receiver-guard.js';
// Node has no CSS loader. Only this test import substitutes that inert resource;
// both actual production wrapper implementations and their order execute below.
const threeRoot=new URL('../node_modules/three/',import.meta.url);
const hooks=registerHooks({resolve(specifier,context,next){if(specifier==='three')return{url:new URL('build/three.module.js',threeRoot).href,shortCircuit:true};if(specifier.startsWith('three/addons/'))return{url:new URL('examples/jsm/'+specifier.slice(13),threeRoot).href,shortCircuit:true};return next(specifier,context);},load(url,context,next){return url.endsWith('.css')?{format:'module',source:'export default{}',shortCircuit:true}:next(url,context);}});
const {createRoomVisibility}=await import('./room-visibility.js');hooks.deregister();
for(const order of ['lighting-first','room-first'])test('native shadow proof survives actual '+order+' wrappers, but rejects an unknown later vertex callback',()=>{
 const previous=globalThis.document,host={setAttribute(){},querySelector(q){return q==='canvas'?{getContext:()=>({})}:{};},remove(){}};
 globalThis.document={createElement:()=>host,getElementById:()=>({append(){}})};
 const scene=new Scene(),root=new Group(),material=new MeshStandardMaterial(),geometry=new BoxGeometry(2,2,2),mesh=new Mesh(geometry,material);mesh.position.set(0,2,15);mesh.receiveShadow=true;root.add(mesh);scene.add(root);
 material.onBeforeCompile=s=>{s.fragmentShader+='\n// reviewed colour-only stone';};registerShadowPositionMaterial(material);
 const renderer={render(){},renderBufferDirect(){}},world={root,zones:[{name:'courtyard',xMin:-15,xMax:15,zMin:5,zMax:25}],torches:[],setRoomTorchFilter(){}};
 let visibility;
 try{
  if(order==='lighting-first')applyMobileLighting(material,{model:'lambert'});visibility=createRoomVisibility({renderer,scene,world});if(order==='room-first')applyMobileLighting(material,{model:'lambert'});
  assert(visibility.shadowPositionsPreserved(material));assert(!hasFragmentOnlySkinCallback(material,material.onBeforeCompile),'world contract must not enable skin/interior eligibility');
  const guard=createShadowReceiverGuard(root,[{tag:'courtyard',x:0,y:-.3,z:15,w:30,h:.6,d:20}],{positionsPreserved:m=>visibility.shadowPositionsPreserved(m)}),camera=new PerspectiveCamera(53,430/745,.1,320);camera.position.set(0,18,36);camera.lookAt(0,0,17);camera.updateMatrixWorld();const rect=[{id:'courtyard',x:-15,z:5,w:30,d:20}];assert(guard.check(camera,rect));assert(guard.check(camera,rect));
  material.onBeforeCompile=s=>{s.vertexShader+='\n// unknown displacement';};assert(!visibility.shadowPositionsPreserved(material));assert.equal(guard.check(camera,rect),false);assert.equal(guard.snapshot().lateMaterialFallbacks,1);
 }finally{visibility?.dispose();globalThis.document=previous;geometry.dispose();material.dispose();}
});
