import test from 'node:test';
import assert from 'node:assert/strict';
import {createHearthAccess} from './hearth-access.js';
const floor={x:0,y:-.2,z:0,w:20,h:.4,d:14};
const wall={x:0,y:2,z:0,w:.3,h:4,d:14};
const world=colliders=>({floors:[floor],colliders,spawn:{x:-6,y:0,z:0}});
test('a clear pocket behind a fire gate is not wizard-accessible',()=>{
 assert.equal(createHearthAccess(world([wall]),[{kind:'fire',blocker:wall}])({x:5,z:0}),false);
 assert.equal(createHearthAccess(world([wall]),[{kind:'pressure',blocker:wall}])({x:5,z:0}),true);
});
test('pressure access cannot cross an unrelated solid wall',()=>{
 const gate={...wall,x:-3};
 assert.equal(createHearthAccess(world([wall,gate]),[{kind:'pressure',blocker:gate}])({x:5,z:0}),false);
});
test('2D floor overlap does not grant access through a low ceiling',()=>{
 const ceiling={x:0,y:1.5,z:0,w:2,h:.3,d:14};
 const w={...world([]),floors:[floor,ceiling]};
 assert.equal(createHearthAccess(w)({x:5,z:0}),false);
});
