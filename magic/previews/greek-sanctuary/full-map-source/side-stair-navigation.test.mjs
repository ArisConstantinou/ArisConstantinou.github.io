import test from 'node:test';import assert from 'node:assert/strict';import {LayeredNavigationGrid} from './navigation.js';
test('wizard can cross the ground-to-first-tread transition without walking through the stair volume',()=>{
 const floors=[{x:0,y:-.3,z:0,w:16,h:.6,d:20,tag:'floor'},...Array.from({length:26},(_,i)=>({x:0,y:(i+1)*.2-.12,z:2.5-(i+.5)*.32,w:5.4,h:.24,d:.345,tag:'fullmap-stair',stairId:'library',slope:.625})),{x:0,y:5.2-.19,z:-8,w:10,h:.38,d:4.4,tag:'fullmap-floor'}];
 const nav=new LayeredNavigationGrid(floors,[],.25,.48),route=nav.path({x:0,y:0,z:4},{x:0,y:5.2,z:-7});assert(route.length);assert(route.some(p=>p.y>.2&&p.y<4.8));assert.equal(nav.isFree(0,1.4,0),false,'cannot walk through the low stair volume from the ground');
});
