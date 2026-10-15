import test from 'node:test';import assert from 'node:assert/strict';import {DoorStrike,DOOR_STRIKES,strikeEnvelope,selectStrikeDoor} from './door-strike-rules.js';
for(const [random,kind] of [[.1,'kick'],[.9,'punch']])test(kind+' has one contact, recovery and no repeat while held',()=>{
 const s=new DoorStrike(()=>random),target={gate:{id:'hall-pressure'}};assert.ok(s.start(target));assert.equal(s.kind,kind);assert.equal(s.start(target),false);let impacts=0,completions=0;
 for(let i=0;i<100;i++){const e=s.update(.03);if(e==='impact'){impacts++;assert.ok(s.time>=DOOR_STRIKES[kind].impact);assert.equal(strikeEnvelope(kind,s.time).drive,1);}if(e==='complete')completions++;}
 assert.equal(impacts,1);assert.equal(completions,1);assert.equal(s.active,false);assert.equal(strikeEnvelope(kind,DOOR_STRIKES[kind].duration).drive,0);
});
test('pause, zero-time sync and initial alignment cannot advance a strike',()=>{const s=new DoorStrike(()=>0);s.start({gate:{id:'a'}});for(let i=0;i<100;i++){s.update(0);s.update(.02,false);}assert.equal(s.time,0);assert.equal(s.impacted,false);});
test('uniform independent random selection yields both complete animations',()=>{let n=0;const s=new DoorStrike(()=>((n++*.61803398875)%1)),counts={kick:0,punch:0};for(let i=0;i<1000;i++){s.active=false;s.start({gate:{id:'a'}});counts[s.kind]++;}assert.ok(counts.kick>480&&counts.punch>480);});
test('only a close closed door on the current floor is reachable, from either side',()=>{
 const gate={id:'a',x:0,z:5,width:5.2,floorY:0,phase:'locked'};
 assert.equal(selectStrikeDoor([gate],{x:0,y:1.24,z:6.37}).side,1);assert.equal(selectStrikeDoor([gate],{x:0,y:1.24,z:3.63}).side,-1);
 assert.ok(selectStrikeDoor([gate],{x:0,y:1.24,z:6.45}));
 for(const p of [{x:0,y:6.04,z:6.37},{x:0,y:1.24,z:6.7},{x:0,y:1.24,z:7},{x:4,y:1.24,z:6.37}])assert.equal(selectStrikeDoor([gate],p),null);
 assert.equal(selectStrikeDoor([{...gate,unblocked:true}],{x:0,y:1.24,z:6.37}),null);
});
