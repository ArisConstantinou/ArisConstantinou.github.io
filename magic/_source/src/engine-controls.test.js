import test from 'node:test';
import assert from 'node:assert/strict';
import {engineMouse} from './engine-mouse.js';
import {engineEscort} from './engine-escort.js';
import {HearthHeart} from './hearth-rules.js';
import {STOMP} from './hearth-stomp.js';
test('engine button chords trigger one stomp and preserve held fire independently',()=>{
 assert.deepEqual(engineMouse(1,0,true),{fire:true,shield:false,stomp:false});
 assert.deepEqual(engineMouse(3,1,true),{fire:true,shield:false,stomp:true});
 assert.equal(engineMouse(3,3,true).stomp,false);assert.equal(engineMouse(1,3,true).fire,true);
 assert.deepEqual(engineMouse(2,3,true),{fire:false,shield:false,stomp:false});
 assert.deepEqual(engineMouse(2,0,false),{fire:false,shield:true,stomp:false});
 assert.equal(engineMouse(0,3,true).fire,false);
});
test('stomp hits once on foot contact, pauses fire and observes cooldown',()=>{
 const h=new HearthHeart();h.state='piloted';h.fuel=100;
 assert.equal(h.stomp(),true);assert.equal(h.clip,'Stomp');
 assert.equal(h.update(STOMP.impact-.01,{fire:true}),null);assert.equal(h.firing,false);
 assert.equal(h.update(.02,{fire:true}),'stompImpact');assert.equal(h.stomp(),false);
 assert.equal(h.update(.7,{fire:true}),null);assert.equal(h.firing,true);
 h.update(3);assert.equal(h.stomp(),true);assert.equal(h.update(1.2),'stompImpact');assert.equal(h.update(.01),null);
});
test('exiting cancels pending stomp damage and boarding cannot stomp',()=>{
 const h=new HearthHeart();h.state='boarding';assert.equal(h.stomp(),false);
 h.state='piloted';h.fuel=100;h.stomp();h.update(.2);h.exit();assert.equal(h.update(.4),null);
 assert.equal(h.stompTime,null);assert.equal(h.stomp(),false);
});
test('engine escort stays behind and sideways for all eight headings',()=>{
 for(let i=0;i<8;i++){const yaw=i*Math.PI/4,p=engineEscort({x:4,z:9},yaw,{x:0,z:0});
  const f={x:Math.sin(yaw),z:Math.cos(yaw)},dx=p.x-4,dz=p.z-9;
  assert.ok(dx*f.x+dz*f.z<0);assert.ok(Math.hypot(dx,dz)>3);assert.ok(Math.abs(dx*f.z-dz*f.x)>2.5);
 }
});
test('escort retains its side, finds a clear rear slot and never falls forward',()=>{
 const first=engineEscort({x:0,z:0},0,{x:10,z:0},-1);assert.equal(first.side,-1);
 const alternate=engineEscort({x:0,z:0},0,{x:10,z:0},-1,p=>p.x>0);assert.equal(alternate.side,1);
 assert.equal(engineEscort({x:0,z:0},0,{x:0,z:0},1,()=>false),null);
 const threat=engineEscort({x:0,z:0},0,{x:3,z:1},1,()=>true,{x:0,z:3.2});assert.ok(Math.abs(threat.x)>2.2||threat.z<0);
});
