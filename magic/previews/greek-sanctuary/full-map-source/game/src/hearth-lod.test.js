import test from 'node:test';import assert from 'node:assert/strict';
import * as THREE from 'three';
import {hearthLodLevel,createHearthLod,projectedHearthPixels} from './hearth-lod.js';
test('close views retain full detail once loaded and medium while loading',()=>{
 assert.equal(hearthLodLevel(800,1,false),1);assert.equal(hearthLodLevel(800,1,true),0);
});
test('screen-size hysteresis prevents oscillation at both boundaries',()=>{
 assert.equal(hearthLodLevel(330,0,true),0);assert.equal(hearthLodLevel(330,1,true),1);
 assert.equal(hearthLodLevel(100,2,true),2);assert.equal(hearthLodLevel(100,1,true),1);
 assert.equal(hearthLodLevel(80,1,true),2);assert.equal(hearthLodLevel(120,2,true),1);
 assert.equal(hearthLodLevel(290,0,true),1);
});

test('mobile elevated-camera LOD uses the visible body span instead of a face-on distance estimate',()=>{
 const camera=new THREE.PerspectiveCamera(53,430/745,.1,320);camera.position.set(0,22,17);camera.lookAt(0,0,-1.8);camera.updateMatrixWorld();
 const renderer={getDrawingBufferSize:out=>out.set(494,856)},model=new THREE.Group();
 const medium=new THREE.Mesh(),far=new THREE.Mesh();medium.userData.hearthLod=1;far.userData.hearthLod=2;model.add(medium,far);
 const lod=createHearthLod(model,{measureProjectedBody:true,prepareMesh(){},loadHigh(){throw Error('Far model must not request close surface');}});
 lod.update(camera,renderer);
 assert.equal(lod.metric,'projected-body');assert.equal(lod.level,2);assert.equal(far.visible,true);assert.equal(medium.visible,false);
 assert.ok(model.userData.hearthProjectedPixels<90);
 const original=createHearthLod(model,{prepareMesh(){},loadHigh(){throw Error('Unexpected close asset');}});
 original.update(camera,renderer);assert.equal(original.level,1,'legacy distance estimate overstates this elevated view');
 assert.ok(model.userData.hearthProjectedPixels>90);lod.dispose();original.dispose();
});

test('projected body span respects scale, camera roll and close/behind-camera limits',()=>{
 const camera=new THREE.PerspectiveCamera(53,494/856,.1,320),model=new THREE.Group(),screen=new THREE.Vector2(494,856);
 camera.position.set(0,22,17);camera.lookAt(0,0,0);
 const ordinary=projectedHearthPixels(model,camera,screen);assert.ok(ordinary>30&&ordinary<90);
 camera.rotateZ(Math.PI/2);camera.updateMatrixWorld();
 const rolled=projectedHearthPixels(model,camera,screen);assert.ok(Math.abs(rolled-ordinary)<1e-8,'roll cannot change pixel span');
 camera.position.set(0,4,4);camera.lookAt(0,1.7,0);assert.ok(projectedHearthPixels(model,camera,screen)>280,'close views retain detailed surfaces');
 camera.position.set(0,0,0);camera.lookAt(0,0,-1);model.position.set(0,0,2);assert.equal(projectedHearthPixels(model,camera,screen),0);
 model.position.set(0,0,-.05);assert.equal(projectedHearthPixels(model,camera,screen),Infinity,'near-plane crossing must not select a coarse surface');
 model.position.set(0,0,0);camera.position.set(0,22,17);camera.lookAt(0,0,0);model.scale.setScalar(2);
 assert.ok(projectedHearthPixels(model,camera,screen)>ordinary*1.5);
});
