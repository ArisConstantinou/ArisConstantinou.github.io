import test from 'node:test';
import assert from 'node:assert/strict';
import {LayeredNavigationGrid} from './navigation.js';
import {NavigationGrid} from './game/src/systems.js';
const floor=(y=0)=>({x:0,y:y-.2,z:0,w:12,h:.4,d:12,tag:'floor'});
test('stacked floors are separate: no path through the ceiling without stairs',()=>{
 const floors=[floor(),floor(5.2)],before=new NavigationGrid(floors,[]),after=new LayeredNavigationGrid(floors,[]);
 assert.ok(before.path({x:0,y:.88,z:0},{x:0,y:6.08,z:0}).length,'old 2D grid incorrectly reports a path');
 assert.equal(after.path({x:0,y:.88,z:0},{x:0,y:6.08,z:0}).length,0);
});
test('upper door blocks the upper route while the ground remains open',()=>{
 const door={x:0,y:7.2,z:0,w:12,h:4,d:.4},nav=new LayeredNavigationGrid([floor(),floor(5.2)],[door]);
 assert.ok(nav.path({x:0,y:.88,z:3},{x:0,y:.88,z:-3}).length);
 assert.equal(nav.path({x:0,y:6.08,z:3},{x:0,y:6.08,z:-3}).length,0);
 nav.setObstacles([]);assert.ok(nav.path({x:0,y:6.08,z:3},{x:0,y:6.08,z:-3}).length);
});
test('a real stair flight connects both levels in both directions',()=>{
 const floors=[{...floor(),d:18,z:5},{x:0,y:2.8,z:-5,w:12,h:.4,d:6,tag:'floor'}];
 for(let i=0;i<15;i++)floors.push({x:0,y:(i+1)*.2-.12,z:5-(i+.5)*.5,w:5.4,h:.24,d:.525,tag:'fullmap-stair',stairId:'test',slope:.4});
 const nav=new LayeredNavigationGrid(floors,[]),a={x:0,y:.88,z:6},b={x:0,y:3.88,z:-5};
 const up=nav.path(a,b),down=nav.path(b,a);assert.ok(up.length);assert.ok(down.length);
 assert.ok(up.some(p=>p.y>.2&&p.y<2.8));assert.equal(up.at(-1).y,3);
 assert.equal(down.at(-1).y,0);
});
test('low overhead deck admits wizard but rejects tall ally',()=>{
 const floors=[floor(),floor(3)];assert.equal(new LayeredNavigationGrid(floors,[],.65,.48,1.8).isFree(0,0,0),true);
 assert.equal(new LayeredNavigationGrid(floors,[],.65,1,4).isFree(0,0,0),false);
});
