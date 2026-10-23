import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareRunShaders} from './run-shader-preparation.js';
test('run preparation waits for the actual HDR program and restores the renderer immediately',async()=>{
 const scene={},camera={},screen={},hdr={},events=[];let current=screen,release;
 const compiling=new Promise(resolve=>release=resolve);
 const renderer={getRenderTarget:()=>current,setRenderTarget:t=>current=t,compileAsync:(s,c)=>{assert.equal(s,scene);assert.equal(c,camera);events.push(current);return compiling;}};
 let ready=false;const job=prepareRunShaders({renderer,scene,camera,quality:'high',composer:{readBuffer:hdr}}).then(()=>ready=true);
 await new Promise(setImmediate);assert.equal(ready,false);assert.equal(current,screen);assert.deepEqual(events,[hdr]);release();await job;assert.equal(ready,true);
});
test('low quality compiles the screen variant even when an unused composer exists',async()=>{
 const previous={},hdr={};let current=previous,compiled;
 await prepareRunShaders({renderer:{getRenderTarget:()=>current,setRenderTarget:t=>current=t,compileAsync:async()=>{compiled=current;}},scene:{},camera:{},quality:'low',composer:{readBuffer:hdr}});
 assert.equal(compiled,null);assert.equal(current,previous);
});
test('compile failure restores the colour target and rejects preparation',async()=>{
 const previous={};let current=previous;
 await assert.rejects(prepareRunShaders({renderer:{getRenderTarget:()=>current,setRenderTarget:t=>current=t,compileAsync:()=>{throw Error('shader failure');}},scene:{},camera:{},quality:'high',composer:{readBuffer:{}}}),/shader failure/);
 assert.equal(current,previous);
});
test('detached hidden actors compile with real scene lights without being attached or made visible',async()=>{
 const scene={},camera={},detached={visible:false,parent:null},attached={parent:scene},child={parent:attached},calls=[];
 const renderer={getRenderTarget:()=>null,setRenderTarget:()=>{},compileAsync:async(root,c,target)=>calls.push({root,c,target})};
 await prepareRunShaders({renderer,scene,camera,quality:'low',objects:[attached,child,detached,detached]});
 assert.deepEqual(calls,[{root:scene,c:camera,target:undefined},{root:detached,c:camera,target:scene}]);
 assert.equal(detached.parent,null);assert.equal(detached.visible,false);assert.equal(attached.parent,scene);
});
test('first-use driver reflection finishes after compile readiness and is shared across cloned materials',async()=>{
 const events=[],m1={},m2={},program={getUniforms:()=>events.push('uniforms'),getAttributes:()=>events.push('attributes')};
 const scene={traverse:visit=>{visit({material:m1});visit({material:m2});}};let release;
 const ready=new Promise(resolve=>release=resolve),renderer={getRenderTarget:()=>null,setRenderTarget:()=>{},compileAsync:()=>ready,properties:{get:()=>({programs:new Map([['shared',program]])})}};
 const job=prepareRunShaders({renderer,scene,camera:{},quality:'low',nextFrame:async()=>events.push('yield')});
 await new Promise(setImmediate);assert.deepEqual(events,[]);release();await job;assert.deepEqual(events,['yield','uniforms','attributes']);
});
