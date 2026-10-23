import test from 'node:test';
import assert from 'node:assert/strict';
import {Scene,PointLight} from 'three';
import {createActivePointLights} from './active-point-lights.js';
import {prepareRunShaders} from './run-shader-preparation.js';

test('bounded shader counts retain every active light and restore the scene',()=>{
 const scene=new Scene(),lights=Array.from({length:12},()=>new PointLight(0xff4400,0));scene.add(...lights);
 const children=[...scene.children],counts=[];
 const renderer={render(root){const visible=[];root.traverseVisible(o=>{if(o.isPointLight)visible.push(o);});counts.push(visible.length);assert.deepEqual(visible.filter(l=>l.intensity>0),lights.filter(l=>l.intensity>0));assert(visible.filter(l=>!lights.includes(l)).every(l=>l.intensity===0&&l.color.getHex()===0));}};
 const policy=createActivePointLights(renderer,{enabled:true});policy.setBuckets([5,7,11]);
 for(let n=0;n<=12;n++){lights.forEach((l,i)=>l.intensity=i<n?i+1:0);renderer.render(scene);assert.deepEqual(scene.children,children);assert(lights.every(l=>l.visible));}
 assert.deepEqual(counts,[5,5,5,5,5,5,7,7,11,11,11,11,12]);
 assert.deepEqual(policy.preparationCounts(11),[5,7,11]);
});

test('nested and failed bucket rendering do not leak or hide padding lights',()=>{
 const scene=new Scene(),light=new PointLight(0xffffff,2);scene.add(light);let nested=false;
 const renderer={render(root){let count=0;root.traverseVisible(o=>{if(o.isPointLight)count++;});assert.equal(count,5);if(!nested){nested=true;renderer.render(root);}throw Error('failed draw');}};
 const policy=createActivePointLights(renderer,{enabled:true});policy.setBuckets([5,7,11]);
 assert.throws(()=>renderer.render(scene),/failed draw/);assert.deepEqual(scene.children,[light]);assert(light.visible);
});

test('three bounded preparations replace twelve count variants with light state intact',async()=>{
 const scene=new Scene(),lights=Array.from({length:11},()=>new PointLight(0xff4400,2));scene.add(...lights);let current=null;const counts=[];
 const renderer={render(){},getRenderTarget:()=>current,setRenderTarget:t=>current=t,compile(root){let count=0;root.traverseVisible(o=>{if(o.isPointLight)count++;});counts.push(count);},compileAsync(root){this.compile(root);return Promise.resolve();},properties:{get:()=>({})}};
 const policy=createActivePointLights(renderer,{enabled:true});policy.setBuckets([5,7,11]);
 const result=await prepareRunShaders({renderer,scene,camera:{},quality:'low',pointLightVariants:true,lightCountPolicy:policy,nextFrame:async()=>{}});
 assert.deepEqual(counts,[5,7,11]);assert.deepEqual(result.pointLightCounts,counts);assert.equal(scene.children.length,11);assert(lights.every(l=>l.visible&&l.intensity===2&&l.color.getHex()===0xff4400));
});
