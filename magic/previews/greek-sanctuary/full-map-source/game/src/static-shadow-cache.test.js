import test from 'node:test';import assert from 'node:assert/strict';
import {Scene,Group,Mesh,PlaneGeometry,MeshStandardMaterial,DirectionalLight} from 'three';
import {createStaticShadowCache} from './static-shadow-cache.js';

// Real Three scene objects, instrumented render-target boundary. These tests
// cover state invalidation/lifecycle; real-WebGL image tests remain separate.
function fixture({segments=80}={}){
 const scene=new Scene(),world={root:new Group()},geometry=new PlaneGeometry(1,1,segments,segments),material=new MeshStandardMaterial(),entities=[],light=new DirectionalLight();scene.add(world.root);
 const meshes=Array.from({length:4},()=>{const m=new Mesh(geometry,material);m.castShadow=true;world.root.add(m);return m;});scene.updateMatrixWorld(true);
 let target=null,disposed=0,normalPasses=0;
 const makeTarget=()=>({width:1024,height:1024,samples:0,clone:makeTarget,dispose(){disposed++;}});light.shadow.map=makeTarget();
 const gl={READ_FRAMEBUFFER:1,COLOR_BUFFER_BIT:2,DEPTH_BUFFER_BIT:4,NEAREST:5,bindFramebuffer(){},blitFramebuffer(){}};
 const renderer={domElement:new EventTarget(),getContext:()=>gl,clippingPlanes:[],properties:{get:()=>({__webglFramebuffer:{}})},getRenderTarget:()=>target,info:{render:{calls:0,triangles:0}},clear(){},renderBufferDirect(_c,_s,g){this.info.render.calls++;this.info.render.triangles+=g.index.count/3;}};
 renderer.shadowMap={enabled:true,autoUpdate:true,type:2,needsUpdate:false,render(lights,root,camera){normalPasses++;if(!lights.length)return;const old=target;target=lights[0].shadow.map;renderer.clear();root.traverseVisible(o=>{if(o.isMesh&&o.castShadow&&o.layers.test(camera.layers))renderer.renderBufferDirect(lights[0].shadow.camera,null,o.geometry,o.material,o);});target=old;lights[0].shadow.needsUpdate=false;this.needsUpdate=false;}};
 const original={...renderer.shadowMap},camera=light.shadow.camera;
 let revision='room-a';const api=createStaticShadowCache({renderer,scene,world,getEntities:()=>entities,getRevision:()=>revision});
 const render=()=>{scene.updateMatrixWorld(true);light.updateMatrixWorld(true);renderer.shadowMap.render([light],scene,camera);};
 return{api,render,renderer,scene,world,meshes,geometry,material,entities,light,camera,original,setRevision(v){revision=v;},get disposed(){return disposed;},get normalPasses(){return normalPasses;},settle(){for(let i=0;i<8;i++)render();}};
}
test('static shadow stays reusable across unrelated postprocess scenes while actors still submit',()=>{
 const f=fixture(),actor=new Mesh(f.geometry,f.material);actor.castShadow=true;f.scene.add(actor);f.settle();assert.equal(f.api.stats.builds,1);const before={...f.api.stats},calls=f.renderer.info.render.calls;
 f.renderer.shadowMap.render([],new Scene(),f.camera);f.render();assert.equal(f.api.stats.builds,before.builds);assert.equal(f.api.stats.hits,before.hits+1);assert(f.api.stats.skippedDraws>0);assert.equal(f.renderer.info.render.calls,calls+1,'awake actor must still render');f.api.dispose();
});
test('sleeping prop wake and same-room caster movement invalidate before reuse',()=>{
 const f=fixture(),prop=new Mesh(f.geometry,f.material);prop.castShadow=true;f.scene.add(prop);const body={mass:1,sleepState:2};f.entities.push({category:'prop',mesh:prop,body});f.settle();const before=f.api.stats.builds;
 body.sleepState=0;prop.position.x=2;const hits=f.api.stats.hits;f.render();assert.equal(f.api.stats.hits,hits);f.settle();assert.equal(f.api.stats.builds,before+1);
 f.meshes[0].position.x=1;const builds=f.api.stats.builds;f.render();f.settle();assert.equal(f.api.stats.builds,builds+1);f.api.dispose();
});
test('visibility, light view and room-mask changes each invalidate the current cache',()=>{
 const f=fixture();f.settle();for(const change of [()=>{f.meshes[0].visible=false;},()=>{f.light.position.x+=1;},()=>f.setRevision('room-b')]){const hits=f.api.stats.hits,builds=f.api.stats.builds;change();f.render();assert.equal(f.api.stats.hits,hits);f.settle();assert.equal(f.api.stats.builds,builds+1);}f.api.dispose();
});
test('tiny rigid passes keep native rendering and never allocate a full-size cache',()=>{
 const f=fixture({segments:1});f.settle();assert.equal(f.api.stats.builds,0);assert(f.api.stats.smallPassBypasses>0);assert.equal(f.api.stats.staticTriangles,8);assert.equal(f.api.stats.blits,0);f.api.dispose();assert.equal(f.disposed,0);
});
test('context loss and disabling release cached GPU targets; disposal restores hooks once',()=>{
 const f=fixture();f.settle();f.renderer.domElement.dispatchEvent(new Event('webglcontextlost'));assert.equal(f.disposed,1);f.settle();assert.equal(f.api.stats.builds,2);f.api.setEnabled(false);assert.equal(f.disposed,2);f.api.dispose();f.api.dispose();assert.equal(f.renderer.shadowMap.render,f.original.render);assert.equal(f.disposed,2);
});
