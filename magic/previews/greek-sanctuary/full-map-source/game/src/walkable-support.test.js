import test from 'node:test';
import assert from 'node:assert/strict';
import {supportHeight,supportedFootprint,standingClear,supportedRoute,supportSightClear} from './walkable-support.js';
const floor=(x,z,w,d,y=0)=>({x,z,w,d,y:y-.25,h:.5});

test('boarding sight accounts for the height of walls and overhead floors',()=>{
 const a={x:0,y:6.3,z:0},b={x:2,y:6.7,z:0},wall={x:1,y:2,z:0,w:.4,h:4,d:4};
 assert.equal(supportSightClear(a,b,[wall]),true);
 assert.equal(supportSightClear(a,b,[{...wall,y:6}]),false);
 assert.equal(supportSightClear({x:0,y:1,z:0},{x:0,y:7,z:0},[floor(0,0,10,10,5.4)]),false);
});

test('overlapping floors resolve the nearby support, never the roof or ground underneath',()=>{
 const floors=[floor(0,0,20,20),floor(0,0,12,12,5.4),floor(0,0,12,12,10.8)];
 assert.equal(supportHeight(floors,0,0,.02),0);
 assert.equal(supportHeight(floors,0,0,5.42),5.4);
 assert.equal(supportHeight(floors,8,0,5.4),null);
 assert.equal(supportHeight(floors,0,0,3),null);
});
test('a whole standing footprint may cross tile seams but not a ledge or gap',()=>{
 const pair=[floor(-1,0,2,4,5.4),floor(1,0,2,4,5.4)],p={x:0,y:5.4,z:0};
 assert.equal(supportedFootprint(pair,p,.48),true);
 assert.equal(supportedFootprint(pair,{...p,x:1.8},.48),false);
 assert.equal(supportedFootprint([floor(-1.1,0,2,4,5.4),floor(1.1,0,2,4,5.4)],p,.48),false);
});
test('ground clutter does not block the upper floor; upper walls and low ceilings do',()=>{
 const floors=[floor(0,0,20,20),floor(0,0,12,12,5.4)],p={x:0,y:5.4,z:0};
 const groundWall={x:0,y:2,z:0,w:2,h:4,d:2};
 assert.equal(standingClear(floors,[groundWall],p,.48,1.8),true);
 assert.equal(standingClear(floors,[{...groundWall,y:7.4}],p,.48,1.8),false);
 assert.equal(standingClear([...floors,floor(0,0,12,12,7)],[],p,.48,1.8),false);
 assert.equal(standingClear([...floors,floor(0,0,12,12,8)],[],p,.48,1.8),true);
});
test('exit approach cannot skip a hole or cross a wall to reach a safe endpoint',()=>{
 const a={x:-2,y:5.4,z:0},b={x:2,y:5.4,z:0};
 assert.equal(supportedRoute([floor(0,0,12,12,5.4)],[],a,b,.48,1.8),true);
 assert.equal(supportedRoute([floor(-2,0,3,12,5.4),floor(2,0,3,12,5.4)],[],a,b,.48,1.8),false);
 assert.equal(supportedRoute([floor(0,0,12,12,5.4)],[{x:0,y:6.4,z:0,w:.2,h:2,d:4}],a,b,.48,1.8),false);
});
test('ordinary stair treads can support an exit path, while a tall step cannot',()=>{
 const stairs=Array.from({length:6},(_,i)=>floor(i*.5,0,.5,3,i*.2));
 assert.equal(supportedRoute(stairs,[],{x:.1,y:0,z:0},{x:2.4,y:1,z:0},.1,1.8),true);
 assert.equal(supportedRoute([floor(-1,0,2,3),floor(1,0,2,3,1)],[],{x:-.7,y:0,z:0},{x:.7,y:1,z:0},.1,1.8),false);
});
