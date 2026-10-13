import test from 'node:test';import assert from 'node:assert/strict';
import {gargoyleFlightHeight,gargoyleLiftAcceleration} from './gargoyle-flight.js';
test('gargoyle cruises aloft and Dive lands before contact then takes off',()=>{
 assert.equal(gargoyleFlightHeight('Idle'),1.1);assert.equal(gargoyleFlightHeight('Walk'),1.1);
 assert.equal(gargoyleFlightHeight('Claw',.95),0);
 assert.equal(gargoyleFlightHeight('Dive',.65),2);
 assert.equal(gargoyleFlightHeight('Dive',1.65),0);
 assert.equal(gargoyleFlightHeight('Dive',2.8),1.1);
 for(let t=0;t<3;t+=.01)assert.ok(gargoyleFlightHeight('Dive',t)>=0);
});
test('lift counteracts gravity and brakes altitude without overriding throw physics',()=>{
 assert.equal(gargoyleLiftAcceleration({height:1.1,velocity:0,target:1.1}),20);
 assert.ok(gargoyleLiftAcceleration({height:0,velocity:0,target:1.1})>20);
 assert.ok(gargoyleLiftAcceleration({height:2,velocity:3,target:1.1})<0);
 assert.equal(gargoyleLiftAcceleration({height:2,velocity:0,target:1.1,disabled:true}),null);
});
