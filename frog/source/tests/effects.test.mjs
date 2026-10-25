import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {GameVFX} from '../src/effects.js';

const types=['kick','slam','tongue','fish','heron','snake','croak','debris','hit'];
function fixture(){const scene=new THREE.Scene();return {scene,fx:new GameVFX(scene)};}
function finiteScene(scene){
  scene.updateMatrixWorld(true);
  scene.traverse(object=>{
    for(const value of object.matrixWorld.elements)assert.ok(Number.isFinite(value),`${object.name}: transform`);
    for(const attribute of Object.values(object.geometry?.attributes||{}))for(const value of attribute.array)assert.ok(Number.isFinite(value),`${object.name}: vertex attribute`);
    if(object.isInstancedMesh){assert.ok(object.count<=object.instanceMatrix.count);for(const value of object.instanceMatrix.array)assert.ok(Number.isFinite(value),`${object.name}: instance transform`);}
  });
}

test('all physical attack effects construct finite meshes and remain inside their fixed particle pools',()=>{
  const {scene,fx}=fixture();
  for(let wave=0;wave<25;wave++)for(const type of types)fx.strike(type,new THREE.Vector3(wave*.03,.5,0),wave*.13,1.5);
  for(const pool of Object.values(fx.pools))assert.ok(pool.particles.length<=pool.count);
  fx.update(.05);finiteScene(scene);
  for(const [kind,pool] of Object.entries(fx.pools)){assert.ok(pool.mesh.count<=pool.count);if(kind!=='flash')assert.ok(pool.mesh.count>0);}
  assert.ok(fx.mist.length<=21,'mist requests have a finite occupancy guard');
  fx.clear();
});

test('motion trails and mist expire and dispose their owned geometry and materials',()=>{
  const {scene,fx}=fixture();fx.strike('kick',new THREE.Vector3(0,1,0));fx.strike('heron',new THREE.Vector3(1,1,0));fx.strike('debris',new THREE.Vector3(0,1,1));
  const trails=[...fx.trails],mist=[...fx.mist];let geometriesDisposed=0,materialsDisposed=0;
  for(const e of trails){e.mesh.geometry.addEventListener('dispose',()=>geometriesDisposed++);e.mesh.material.addEventListener('dispose',()=>materialsDisposed++);}
  for(const e of mist)e.sprite.material.addEventListener('dispose',()=>materialsDisposed++);
  for(let i=0;i<30;i++)fx.update(.1);
  assert.equal(fx.trails.length,0);assert.equal(fx.mist.length,0);assert.equal(geometriesDisposed,trails.length);assert.equal(materialsDisposed,trails.length+mist.length);
  for(const pool of Object.values(fx.pools)){assert.equal(pool.particles.length,0);assert.equal(pool.mesh.count,0);}
  assert.equal(scene.children.length,4,'only the reusable organic/contact particle meshes remain');
});

test('legacy cue and number calls create no ground markers, sprites, letter textures or geometry',()=>{
  const {scene,fx}=fixture(),before=[...scene.children],texture=fx.texture;
  assert.equal(fx.cue(new THREE.Vector3(),8,1,0xffff00),null);
  assert.equal(fx.number(new THREE.Vector3(),'ATTACK +200','#ffff00'),null);
  assert.deepEqual(scene.children,before);assert.equal(fx.texture,texture);assert.equal(fx.trails.length,0);assert.equal(fx.mist.length,0);assert.equal(fx.tongues.length,0);
  for(const pool of Object.values(fx.pools))assert.equal(pool.particles.length,0);
});

test('tongue deformation stays finite for coincident and vertical targets and reuses its cached mesh',()=>{
  const {scene,fx}=fixture(),actor={model:{mouthWorld(out){return out.set(0,.8,0);}}};
  for(const end of [new THREE.Vector3(0,.8,0),new THREE.Vector3(0,5,0),new THREE.Vector3(5,1,2)]){
    fx.tongue(actor,end);for(let i=0;i<6;i++){fx.update(.04);finiteScene(scene);}fx.update(.1);
    assert.equal(fx.tongues.length,1);assert.equal(fx.tongues[0].mesh.visible,false);
  }
  fx.clear();
});

test('a confirmed tongue makes brief contact with the moving body before retracting',()=>{
  const {scene,fx}=fixture(),actor={model:{mouthWorld(out){return out.set(0,.8,0);}}},target={x:0,y:.35,z:4};
  fx.tongue(actor,new THREE.Vector3(0,.9,4));fx.update(.1);fx.update(.045);
  fx.confirmTongueHit(actor,target,new THREE.Vector3(0,.9,3.66));
  const e=fx.tongues[0],tip=()=>{const out=new THREE.Vector3();for(let j=0;j<e.m;j++)out.add(new THREE.Vector3().fromArray(e.pos,(e.n*(e.m+1)+j)*3));return out.divideScalar(e.m);};
  target.x=.2;target.z=4.3;fx.update(.016);finiteScene(scene);
  assert.equal(e.latched,true);assert.ok(e.end.distanceTo(new THREE.Vector3(.2,.9,3.96))<1e-8);
  assert.ok(tip().distanceTo(e.end)<1e-6,'the extended tip is visibly touching the target');
  fx.update(.07);assert.ok(tip().distanceTo(new THREE.Vector3(0,.8,0))<e.end.distanceTo(new THREE.Vector3(0,.8,0))*.9);
  fx.update(.1);assert.equal(e.mesh.visible,false);fx.clear();assert.equal(e.target,null);
});

test('contact slashes remain visible during their brief lifetime and reuse a fixed pool',()=>{
  const {scene,fx}=fixture(),initial=[...scene.children],point=new THREE.Vector3(0,.9,0);
  fx.impact(point,0);const particle=fx.pools.flash.particles[0];assert.ok(particle);
  fx.update(.005);const matrix=new THREE.Matrix4();fx.pools.flash.mesh.getMatrixAt(0,matrix);
  assert.ok(new THREE.Vector3().setFromMatrixScale(matrix).x>=particle.scale*.99);
  assert.deepEqual(scene.children,initial);finiteScene(scene);fx.update(.1);
  assert.equal(fx.pools.flash.mesh.count,0);fx.clear();
});

test('clear removes all transient effects and hides tongues without throwing away reusable pools',()=>{
  const {scene,fx}=fixture(),actor={model:{mouthWorld(out){return out.set(0,.8,0);}}};
  fx.tongue(actor,new THREE.Vector3(3,1,2));for(const type of types)fx.strike(type,new THREE.Vector3(0,1,0));fx.update(.05);
  const cachedTongue=fx.tongues[0].mesh,basePools=Object.values(fx.pools).map(p=>p.mesh);
  fx.clear();
  assert.equal(fx.trails.length,0);assert.equal(fx.mist.length,0);assert.equal(cachedTongue.visible,false);assert.equal(fx.tongues[0].life,0);
  for(const pool of Object.values(fx.pools)){assert.equal(pool.particles.length,0);assert.equal(pool.mesh.count,0);}
  assert.deepEqual(scene.children,[...basePools,cachedTongue]);
  fx.tongue(actor,new THREE.Vector3(2,.8,1));fx.update(.03);assert.equal(fx.tongues[0].mesh,cachedTongue);assert.equal(cachedTongue.visible,true);finiteScene(scene);fx.clear();
});
