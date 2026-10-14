import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createHearthStreams,updateHearthStreams,hearthStreamsHit} from './hearth-streams.js';
import {HearthHeart,HEARTH} from './hearth-rules.js';
import {createHearthJet} from './hearth-jet.js';

function fixture(){
 const group=new THREE.Group(),bones={},arms=[];
 for(const [side,x] of [['L',-1.2],['R',1.2]]){
  const arm=new THREE.Group(),bone=new THREE.Bone();arm.position.set(x,1.9,0);bone.rotation.x=Math.PI/2;arm.add(bone);group.add(arm);bones['nozzle_'+side]=bone;arms.push(arm);
 }
 group.updateMatrixWorld(true);const visual={group,bones};
 return {visual,arms,streams:createHearthStreams(visual)};
}
for(const blockedSide of ['L','R'])test(`only ${blockedSide} obstructed: the other physical hand still reaches its target`,()=>{
 const {visual,streams}=fixture();
 const clear=(origin,end)=>!(Math.sign(origin.x)===(blockedSide==='L'?-1:1)&&end.z>.9);
 updateHearthStreams(streams,visual,clear,true);
 for(const stream of streams){
  const blocked=stream.socket.endsWith(blockedSide);
  assert.equal(stream.length<1,blocked);
  assert.equal(hearthStreamsHit(streams,{x:stream.origin.x,y:1.9,z:4},clear),!blocked);
 }
});
test('independent sockets track actual rotating, translating arms without moving the other origin',()=>{
 const {visual,arms,streams}=fixture();updateHearthStreams(streams,visual,()=>true,true);
 const left=streams[0].origin.clone(),right=streams[1].origin.clone();
 arms[0].rotation.y=Math.PI/2;arms[0].position.z=2;visual.group.updateMatrixWorld(true);
 updateHearthStreams(streams,visual,()=>true,true);
 assert.ok(streams[0].origin.distanceTo(left)>1.5);assert.equal(streams[1].origin.distanceTo(right),0);
 assert.ok(streams[0].direction.x>.99);assert.ok(streams[1].direction.z>.99);
});
test('overlap returns one hit while left-only and right-only victims both receive existing damage rate',()=>{
 const {visual,streams}=fixture();updateHearthStreams(streams,visual,()=>true,true);
 const targets=[{x:-1.2,y:1.9,z:4},{x:1.2,y:1.9,z:4},{x:0,y:1.9,z:5}];
 const damage=targets.map(p=>hearthStreamsHit(streams,p,()=>true)?HEARTH.damageRate*.1:0);
 assert.deepEqual(damage,[2.2,2.2,2.2]);
});
test('floor clipping is independent and vectors are reused over repeated updates',()=>{
 const {visual,streams}=fixture(),saved=streams.map(s=>[s.origin,s.direction,s.end]);
 visual.bones.nozzle_L.rotation.x=Math.PI*.75;visual.group.updateMatrixWorld(true);
 for(let i=0;i<1000;i++)updateHearthStreams(streams,visual,()=>true,true);
 assert.ok(streams[0].length<3);assert.equal(streams[1].length,HEARTH.range);
 streams.forEach((s,i)=>assert.deepEqual([s.origin,s.direction,s.end],saved[i]));
});
test('both visible jets follow one fire state; release and exit shut both feeds immediately',()=>{
 const {visual,streams}=fixture(),heart=new HearthHeart(),engine={visual,streams,heart},scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera();
 const jets=[createHearthJet(scene,0),createHearthJet(scene,1)];heart.state='piloted';heart.fuel=100;
 heart.update(.016,{fire:true});updateHearthStreams(streams,visual,()=>true,true);
 jets.forEach(j=>j.update(engine,camera,0));jets.forEach(j=>j.update(engine,camera,.05));
 assert.deepEqual(jets.map(j=>j.counts().volume),[1,1]);
 const counts=jets.map(j=>j.counts());jets.forEach(j=>j.update(engine,camera,.05));assert.deepEqual(jets.map(j=>j.counts()),counts);
 heart.update(.016,{fire:false});jets.forEach(j=>j.update(engine,camera,.066));assert.deepEqual(jets.map(j=>j.counts().volume),[0,0]);
 heart.update(.016,{fire:true});jets.forEach(j=>j.update(engine,camera,.082));heart.exit();jets.forEach(j=>j.update(engine,camera,.098));assert.deepEqual(jets.map(j=>j.counts().volume),[0,0]);
 jets.forEach(j=>j.clear());assert.deepEqual(jets.map(j=>j.counts().smoke),[0,0]);
});
test('old one-nozzle assets continue with one stream until reviewed replacement is promoted',()=>{
 const bone=new THREE.Bone(),visual={bones:{nozzle:bone}},streams=createHearthStreams(visual);
 assert.equal(streams.length,1);assert.equal(streams[0].socket,'nozzle');
});
