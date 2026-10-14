import test from 'node:test';import assert from 'node:assert/strict';import {fitCollisionBox} from './collision-box.js';
test('a diagonal marble shard stays slender and contains all its source corners',()=>{
 const points=[];for(const x of [-1,1])for(const y of [-.12,.12])for(const z of [-.2,.2])points.push({x:(x-z)/Math.sqrt(2)+4,y:y+2,z:(x+z)/Math.sqrt(2)-3});const b=fitCollisionBox(points);
 assert.ok(Math.abs(Object.values(b.halfExtents).sort((a,b)=>b-a)[0]-1)<1e-6);assert.ok(Math.abs(Object.values(b.halfExtents).sort((a,b)=>b-a)[1]-.2)<1e-6);
 for(const p of points)for(let i=0;i<3;i++){const a=b.axes[i],d=(p.x-b.center.x)*a.x+(p.y-b.center.y)*a.y+(p.z-b.center.z)*a.z;assert.ok(Math.abs(d)<=b.halfExtents[['x','y','z'][i]]+1e-6);}
 const a=b.axes;assert.ok(a[0].x*(a[1].y*a[2].z-a[1].z*a[2].y)-a[0].y*(a[1].x*a[2].z-a[1].z*a[2].x)+a[0].z*(a[1].x*a[2].y-a[1].y*a[2].x)>.9999);
});
test('very thin scan flakes get a stable non-zero collision thickness',()=>{
 const b=fitCollisionBox([{x:-1,y:0,z:-1},{x:1,y:0,z:-1},{x:-1,y:0,z:1},{x:1,y:0,z:1}]);assert.ok(Object.values(b.halfExtents).every(v=>v>=.025));
});
