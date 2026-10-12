import test from 'node:test';
import assert from 'node:assert/strict';
import {HearthHeart,placeHearth,flameHits} from './hearth-rules.js';
test('heart requires absorbed fire and completed transfer; one flame wakes it',()=>{const h=new HearthHeart(),s={charged:false,readyAt:.45};assert.equal(h.board(),false);assert.equal(h.charge(s,1),false);s.charged=true;assert.equal(h.charge(s,.2),false);assert.equal(h.charge(s,.5),true);assert.equal(s.charged,false);assert.equal(h.fuel,100);assert.equal(h.board(),false);h.update(2.1);assert.equal(h.state,'ready');assert.equal(h.board(),true);});
test('optional finite policy retains entry, depletion, automatic exit and sleep',()=>{const h=new HearthHeart({endless:false});h.charge({charged:true,readyAt:0},0);h.update(2.1);h.board();h.update(2.4);assert.equal(h.state,'piloted');h.update(1,{fire:true});assert.ok(h.fuel<88);assert.equal(h.firing,true);assert.equal(h.throw(),true);assert.equal(h.clip,'Throw');h.fuel=.01;assert.equal(h.update(.1,{fire:true}),'empty');assert.equal(h.state,'exiting');assert.equal(h.firing,false);assert.equal(h.update(2.4),'exitComplete');assert.equal(h.state,'depleting');h.update(2.1);assert.equal(h.state,'sleep');assert.equal(h.fuel,0);assert.equal(h.charge({charged:true,readyAt:0},100),true);});
test('manual exit keeps remaining fuel; unoccupied readiness does not drain',()=>{const h=new HearthHeart();h.charge({charged:true,readyAt:0},0);h.update(2.1);h.board();h.update(2.4);h.update(1,{moving:true});const fuel=h.fuel;h.exit();h.update(2.4);assert.equal(h.state,'ready');h.update(100);assert.equal(h.fuel,fuel);assert.equal(h.throw(),false);});
test('default engine runs for hours while idle, moving and firing without automatic ejection',()=>{
 const h=new HearthHeart();h.charge({charged:true,readyAt:0},0);h.update(2.1);h.board();h.update(2.4);
 for(const input of [{},{moving:true},{fire:true},{moving:true,fire:true}]){
  for(let i=0;i<3600;i++)assert.equal(h.update(1,input),null);
  assert.equal(h.state,'piloted');assert.equal(h.fuel,100);assert.equal(h.occupied,true);
 }
 assert.equal(h.firing,true);assert.equal(h.clip,'Fire');
});
test('endless throws and stomps preserve energy and manual exit leaves reusable charged engine',()=>{
 const h=new HearthHeart();h.charge({charged:true,readyAt:0},0);h.update(2.1);h.board();h.update(2.4);
 for(let i=0;i<200;i++){assert.equal(h.throw(),true);h.update(1);assert.equal(h.stomp(),true);assert.equal(h.update(.5),'stompImpact');h.update(3);assert.equal(h.fuel,100);}
 for(let i=0;i<10;i++){
  assert.equal(h.exit(),true);assert.equal(h.update(2.4),'exitComplete');assert.equal(h.state,'ready');
  h.update(3600);assert.equal(h.fuel,100);assert.equal(h.board(),true);assert.equal(h.update(2.4),'boardComplete');
 }
 assert.equal(h.state,'piloted');assert.equal(h.endless,true);
});
test('random rooms use clear off-centre candidates and avoid repeating room when possible',()=>{for(let seed=0;seed<60;seed++){let s=seed+1;const random=()=>((s=Math.imul(s,1664525)+1013904223>>>0)/4294967296);const p=placeHearth(random,p=>p.room.name!=='hall','crypt');assert.notEqual(p.room.name,'hall');assert.ok(Math.abs(p.x)>=2.2);assert.ok(p.z>=p.room.zMin+2.4);assert.ok(p.z<=p.room.zMax-2.4);}});
test('placement never silently overlaps when all candidates are blocked',()=>assert.throws(()=>placeHearth(()=>.4,()=>false),/No accessible/));
test('fire is directional and blocked by walls',()=>{const o={x:0,z:0},d={x:0,z:1};assert.equal(flameHits(o,d,{x:.2,z:4},7,()=>true),true);assert.equal(flameHits(o,d,{x:3,z:4},7,()=>true),false);assert.equal(flameHits(o,d,{x:0,z:-1},7,()=>true),false);assert.equal(flameHits(o,d,{x:0,z:4},7,()=>false),false);});
