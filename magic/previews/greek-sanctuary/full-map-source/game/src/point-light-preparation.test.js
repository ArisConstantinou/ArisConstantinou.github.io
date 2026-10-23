import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {prepareRunShaders} from './run-shader-preparation.js';
import {createActivePointLights} from './active-point-lights.js';
for(const fail of [false,true])test(`light count preparation restores original lights before yielding, failure=${fail}`,async()=>{
 const scene=new THREE.Scene(),a=new THREE.PointLight(0xff2200,2),b=new THREE.PointLight(0,0);scene.add(a,b);
 const expected=[a,b].map(l=>({intensity:l.intensity,color:l.color.clone()})),counts=[];let current=null;
 const renderer={getRenderTarget:()=>current,setRenderTarget:t=>current=t,render(){},compile(root){counts.push([a,b].filter(l=>l.visible).length);if(fail&&counts.length===2)throw Error('compile failed');},compileAsync(root){this.compile(root);return Promise.resolve();},properties:{get:()=>({})}};
 createActivePointLights(renderer,{enabled:true});
 const promise=prepareRunShaders({renderer,scene,camera:{},quality:'low',pointLightVariants:true,nextFrame:async()=>{}});
 for(let i=0;i<2;i++){assert.equal([a,b][i].intensity,expected[i].intensity);assert([a,b][i].color.equals(expected[i].color));assert([a,b][i].visible);}
 if(fail)await assert.rejects(promise,/compile failed/);else{const result=await promise;assert.deepEqual(counts,[0,1,2]);assert.deepEqual(result.pointLightCounts,[0,1,2]);}
 for(let i=0;i<2;i++){assert.equal([a,b][i].intensity,expected[i].intensity);assert([a,b][i].color.equals(expected[i].color));assert([a,b][i].visible);}
});

test('detached pooled effects are compiled against scene lights before combat',async()=>{
 const scene=new THREE.Scene(),sprite=new THREE.Sprite(new THREE.SpriteMaterial()),calls=[];
 const renderer={getRenderTarget:()=>null,setRenderTarget(){},compileAsync:(root,camera,targetScene)=>{calls.push({root,targetScene});return Promise.resolve();},properties:{get:()=>({})}};
 await prepareRunShaders({renderer,scene,camera:{},quality:'low',effectObjects:[sprite],nextFrame:async()=>{}});
 assert.equal(calls.length,2);assert.equal(calls[1].root,sprite);assert.equal(calls[1].targetScene,scene);assert.equal(sprite.parent,null);
});

for(const fail of [false,true])test(`GPU warm draw restores lights/target and releases its fence, failure=${fail}`,async()=>{
 const scene=new THREE.Scene(),light=new THREE.PointLight(0xff2200,2);scene.add(light);
 const target={},prior={};let current=prior,draws=0,polls=0,deleted=0;
 const gl={SYNC_GPU_COMMANDS_COMPLETE:1,ALREADY_SIGNALED:2,CONDITION_SATISFIED:3,WAIT_FAILED:4,fenceSync:()=>({}),flush(){},clientWaitSync:()=>fail?4:++polls===1?0:3,deleteSync(){deleted++;}};
 const renderer={getRenderTarget:()=>current,setRenderTarget:t=>current=t,compileAsync:async()=>{},info:{reset(){}},getContext:()=>gl,properties:{get:()=>({})},render(){assert.equal(current,target);draws++;}};
 const options={renderer,scene,camera:{},quality:'high',composer:{readBuffer:target},pointLightVariants:true,warmDraw:true,nextFrame:async()=>{assert.equal(current,prior);assert.equal(light.intensity,2);assert.equal(light.color.getHex(),0xff2200);}};
 if(fail)await assert.rejects(prepareRunShaders(options),/GPU pipeline preparation failed/);else assert.equal((await prepareRunShaders(options)).gpuDrawsPrepared,true);
 assert(draws>0);assert.equal(deleted,draws);assert.equal(current,prior);assert.equal(light.intensity,2);assert.equal(light.color.getHex(),0xff2200);
});
