import test from 'node:test';import assert from 'node:assert/strict';
import {Scene,PointLight,Group,DirectionalLight} from 'three';
import {createActivePointLights} from './active-point-lights.js';

test('zero lights leave the render list while every nonzero contribution and scene state survive',()=>{
 const scene=new Scene(),off=new PointLight(0xffffff,0),black=new PointLight(0,4),active=new PointLight(0xffffff,2),tiny=new PointLight(0xffffff,Number.MIN_VALUE),hidden=new PointLight(0xffffff,0),parent=new PointLight(0xffffff,0),sun=new DirectionalLight(0xffffff,0);
 hidden.visible=false;parent.add(new Group());scene.add(off,black,active,tiny,hidden,parent,sun);
 const renderer={render(s,c){assert.equal(s,scene);assert.equal(c,'camera');return [off,black,active,tiny,hidden,parent,sun].map(l=>l.visible);}};
 const guard=createActivePointLights(renderer);
 assert.deepEqual(renderer.render(scene,'camera'),[false,false,true,true,false,true,true]);
 assert.deepEqual([off,black,active,tiny,hidden,parent,sun].map(l=>l.visible),[true,true,true,true,false,true,true]);
 off.intensity=3;assert.equal(renderer.render(scene,'camera')[0],true);
 assert.equal(guard.snapshot().maxOmitted,2);
 guard.setEnabled(false);assert.equal(renderer.render(scene,'camera')[1],true);
});

test('failed render restores visibility and nested renders do not expose outer hidden lights',()=>{
 const scene=new Scene(),off=new PointLight(0xffffff,0);scene.add(off);let nested=false;
 const renderer={render(){assert.equal(off.visible,false);if(!nested){nested=true;renderer.render(scene);}throw Error('render failed');}};
 createActivePointLights(renderer);assert.throws(()=>renderer.render(scene),/render failed/);assert.equal(off.visible,true);
});

test('compilation shares the same list and disposal preserves subsequent wrappers',()=>{
 const scene=new Scene(),target=new Scene(),off=new PointLight(0xffffff,0),targetOff=new PointLight(0xffffff,0);scene.add(off);target.add(targetOff);
 const render=()=>{},compile=function(s,c,t){assert.equal(this,renderer);assert.equal(s,scene);assert.equal(t,target);assert(!off.visible&&!targetOff.visible);return 'compiled';},renderer={render,compile};
 const guard=createActivePointLights(renderer);assert.equal(renderer.compile(scene,null,target),'compiled');assert(off.visible&&targetOff.visible);
 const wrapper=()=>{};renderer.render=wrapper;guard.dispose();assert.equal(renderer.render,wrapper);assert.equal(renderer.compile,compile);
});
