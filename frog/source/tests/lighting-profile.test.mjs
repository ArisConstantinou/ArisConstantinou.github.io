import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {creekLighting} from '../src/lighting-profile.js';
import {dayState} from '../src/rules.js';
import {fixture} from './game-fixture.mjs';

const luminance=rgb=>rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
const close=(actual,expected,epsilon=1e-9)=>assert.ok(Math.abs(actual-expected)<epsilon,`${actual} ≈ ${expected}`);
const numericValues=profile=>Object.values(profile).flat().filter(value=>typeof value==='number');

test('night retains a cool readable ambient floor without becoming daytime',()=>{
  const night=creekLighting(dayState(300)),day=creekLighting({phase:.5,daylight:1});
  assert.equal(dayState(300).timeLabel,'21:00');assert.equal(dayState(300).night,true);
  assert.equal(night.sunIntensity,0);assert.ok(night.moonIntensity>0);
  assert.ok(night.hemisphereSky[2]>night.hemisphereSky[0]);assert.ok(night.hemisphereGround[2]>night.hemisphereGround[0]);
  assert.ok(night.hemisphereIntensity>=1.2);assert.ok(night.environmentIntensity>=.3);assert.ok(night.exposure>=1);
  // Top and side surfaces need meaningful diffuse light even outside the moon's key direction.
  const oldSkyFill=luminance([.38,.5,.69])*.5;
  const newSkyFill=luminance(night.hemisphereSky)*night.hemisphereIntensity;
  assert.ok(newSkyFill>=oldSkyFill*3);assert.ok(newSkyFill<luminance(day.hemisphereSky)*day.hemisphereIntensity);
  const oldGroundFill=luminance(new THREE.Color(0x405337).toArray())*.5;
  assert.ok(luminance(night.hemisphereGround)*night.hemisphereIntensity>=oldGroundFill*4);
  assert.ok(luminance(night.fog)<luminance(day.fog)*.3);
});

test('full daylight retains established exposure, colours and environment brightness',()=>{
  const light=creekLighting({phase:.5,daylight:1});
  close(light.sunIntensity,3.1);close(light.hemisphereIntensity,1.8);close(light.environmentIntensity,.6);close(light.exposure,1.06);
  assert.equal(light.moonIntensity,0);assert.equal(light.skyVisible,true);
  light.hemisphereSky.forEach((v,i)=>close(v,[.77,.87,.94][i]));
  light.fog.forEach((v,i)=>close(v,[.56,.675,.72][i]));
  const ground=new THREE.Color(0x405337).toArray();light.hemisphereGround.forEach((v,i)=>close(v,ground[i]));
});

test('sunrise, sunset and midnight maintain continuous light levels without changing the clock',()=>{
  const scalarKeys=['sunIntensity','hemisphereIntensity','moonIntensity','environmentIntensity','exposure'];
  const vectorKeys=['hemisphereSky','hemisphereGround','fog','sunOffset','moonOffset','skySun'];
  let previous=creekLighting(dayState(0));
  for(let elapsed=.1;elapsed<=600;elapsed+=.1){
    const state=dayState(elapsed),current=creekLighting(state);
    assert.equal(current.daylight,state.daylight);
    for(const key of scalarKeys)assert.ok(Math.abs(current[key]-previous[key])<.006,key);
    for(const key of vectorKeys)current[key].forEach((value,index)=>assert.ok(Math.abs(value-previous[key][index])<.09,key));
    assert.ok(numericValues(current).every(Number.isFinite));previous=current;
  }
  const start=creekLighting(dayState(0)),next=creekLighting(dayState(600));
  for(const key of [...scalarKeys,...vectorKeys])assert.deepEqual(next[key],start[key]);
});

test('lighting applies to actual Three.js lights and follows actors across the creek without camera dependence',()=>{
  const {game,player}=fixture();
  game.sun=new THREE.DirectionalLight(0xffe7bb,3);game.hemi=new THREE.HemisphereLight(0xc8e4ef,0x405337,2);game.moon=new THREE.DirectionalLight(0xb4c9ef,.15);
  game.scene.add(game.sun,game.sun.target,game.hemi,game.moon,game.moon.target);
  game.scene.fog=new THREE.FogExp2();game.scene.background=new THREE.Color();game.renderer={toneMappingExposure:0};
  game.sky={material:{uniforms:{sunPosition:{value:new THREE.Vector3()},rayleigh:{value:0}}},visible:true};
  const state=dayState(300),expected=creekLighting(state),initialDirection=new THREE.Vector3();
  for(const [i,position] of [[8,.65,8],[250,8,-310],[-350,2,295]].entries()){
    [player.x,player.y,player.z]=position;game.cameraYaw=i*2;
    game.updateLighting(state);game.scene.updateMatrixWorld(true);
    assert.deepEqual(game.moon.target.getWorldPosition(new THREE.Vector3()).toArray(),position);
    const direction=game.moon.getWorldPosition(new THREE.Vector3()).sub(game.moon.target.getWorldPosition(new THREE.Vector3())).normalize();
    if(!i)initialDirection.copy(direction);else assert.ok(initialDirection.distanceTo(direction)<1e-12);
    close(game.hemi.intensity,expected.hemisphereIntensity);close(game.scene.environmentIntensity,expected.environmentIntensity);close(game.renderer.toneMappingExposure,expected.exposure);
    assert.deepEqual(game.hemi.groundColor.toArray(),expected.hemisphereGround);assert.deepEqual(game.scene.fog.color.toArray(),expected.fog);
    assert.ok(game.scene.background.equals(game.scene.fog.color));
  }
});

test('malformed profile inputs remain finite and within the supported light range',()=>{
  for(const input of [{},{phase:NaN,daylight:Infinity},{phase:-.25,daylight:-10},{phase:4.25,daylight:10}]){
    const light=creekLighting(input);assert.ok(numericValues(light).every(Number.isFinite));
    assert.ok(light.daylight>=0&&light.daylight<=1);assert.ok(light.environmentIntensity>=.3&&light.environmentIntensity<=.61);
    assert.ok(light.exposure>=1&&light.exposure<=1.11);
  }
});
