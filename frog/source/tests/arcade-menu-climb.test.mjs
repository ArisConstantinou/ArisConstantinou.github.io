import test from 'node:test';import assert from 'node:assert/strict';
import fixture from '../src/arcade-menu-climb.json' with {type:'json'};
import {plannedRoot} from '../src/arcade-climb-path.js';
import {catchLedge,stepLedge} from '../src/arcade-ledge-movement.js';
test('menu uses a feasible successful native climb with a continuous root path',()=>{
 assert.equal(fixture.plan.ok,true);assert.notEqual(fixture.plan.outcome,'slip');assert.equal(fixture.plan.frames.length,193);assert.equal(fixture.plan.hands.length,2);
 for(let i=1;i<193;i++){const a=fixture.plan.frames[i-1],b=fixture.plan.frames[i];assert.ok(Math.hypot(b.d-a.d,b.y-a.y)<=.055001);assert.ok(Math.abs(b.pitch-a.pitch)<=.075001);}
});
test('native menu climb retains two visible efforts before the successful pull-up',()=>{
 const y=t=>plannedRoot(fixture,t*fixture.duration).y;
 assert.ok(y(.12)-y(.23)>.06);assert.ok(y(.36)-y(.44)>.10);assert.equal(y(1),fixture.stand.y);
});
test('the game ledge simulation completes the menu plan on the button support',()=>{
 const l=structuredClone(fixture),state={events:[]},actor={id:'menu-heavy',characterClass:'heavy',x:l.start.x,z:l.start.z,height:l.start.y+3,hop:0,hit:0,dizzyTime:0,flight:{kind:'jump',y:l.start.y,jumps:1}};
 assert.equal(catchLedge(state,actor,l),true);let elapsed=0;
 while(actor.flight?.kind==='ledge'&&elapsed<4){stepLedge(state,actor,{},1/120,()=>-3,()=>[{id:l.id,kind:'rock',y:0}]);elapsed+=1/120;}
 assert.equal(actor.flight,null);assert.equal(actor.support.id,l.id);assert.equal(actor.x,l.stand.x);assert.equal(actor.z,l.stand.z);assert.ok(state.events.some(e=>e.type==='land'));assert.ok(!state.events.some(e=>e.type==='ledgeSlip'));assert.ok(Math.abs(elapsed-l.duration)<.009);
});
