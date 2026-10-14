import test from 'node:test';import assert from 'node:assert/strict';
import {fitSecretArea,SECRET_CLEARANCE,engineProfileIntersects} from './clearance.js';
test('secret enlargement preserves the exact entrance centre and original source',()=>{
 for(const a of [{x:-63,z:-10.5,w:3,d:4,axis:'z'},{x:-58.8,z:-40.25,w:3,d:4,axis:'x'}]){const old={...a},b=fitSecretArea(a);assert.deepEqual(a,old);if(a.axis==='z'){assert.equal(b.x+b.w,a.x+a.w);assert.equal(b.z+b.d/2,a.z+a.d/2);}else{assert.equal(b.z+b.d,a.z+a.d);assert.equal(b.x+b.w/2,a.x+a.w/2);}}
});
test('compound body clears a low shoulder but keeps its real upper arm collision',()=>{
 const p={originY:1.22,spheres:[{x:0,y:0,z:0,radius:1.22},{x:0,y:1.68,z:0,radius:.94},{x:1.19,y:.98,z:0,radius:.38},{x:-1.19,y:.98,z:0,radius:.38}]},box={x:1.8,y:.4,z:0,w:.7,h:.8,d:1};
 assert.equal(engineProfileIntersects(box,{x:0,z:0},0,p),false);
 assert.equal(engineProfileIntersects({...box,y:2.2,h:.7},{x:0,z:0},0,p),true);
 assert.equal(engineProfileIntersects({...box,x:1.2},{x:0,z:0},0,p),true);
 assert.equal(engineProfileIntersects({x:0,y:4.25,z:0,w:4,h:.4,d:4},{x:0,z:0},0,p),false);
 assert.equal(engineProfileIntersects({x:0,y:3.85,z:0,w:4,h:.4,d:4},{x:0,z:0},0,p),true);
});
test('one fully opened leaf and the actual compound body fit the widened alcove',()=>{
 const c=SECRET_CLEARANCE,bodyWidth=3.14,bodyHeight=3.86;assert.ok(c.width-bodyWidth>=.6);assert.ok(c.height-bodyHeight>=.35);assert.ok(c.depth-c.width>=1.3);assert.ok(c.breadth-bodyWidth>=2.4);
});
