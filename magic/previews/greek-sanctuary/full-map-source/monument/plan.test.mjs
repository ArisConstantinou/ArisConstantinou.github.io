import test from 'node:test';import assert from 'node:assert/strict';
import {TEMPLE,monumentPieces,crepidomaPatches,templeEncounter} from './plan.js';
test('monument precinct joins the existing Sanctum through a seven-metre physical approach',()=>{
 const sanctum={id:'sanctum',x:13.75,z:-55,w:22.5,d:17.5},p=monumentPieces([sanctum]);assert.equal(p.length,2);assert.equal(p[0].z+p[0].d,p[1].z);assert.equal(p[1].z+p[1].d,sanctum.z);assert.equal(p[1].w,7);assert.ok(p.every(r=>r.architectureWing&&r.monument));
});
test('temple encounter finds both bounded creature bosses and the untyped summoner',()=>{
 const zones=[{name:'sanctum',xMin:13.75,xMax:36.25,zMin:-55,zMax:-37.5}],at={position:{x:25,z:-45}},other={position:{x:0,z:0}};
 for(const room of [{name:'sanctum'},'sanctum',undefined]){const boss={kind:'boss',room,body:at},wrong={kind:'boss',body:other},guard={kind:'guard',category:'actor',room:'sanctum',body:at},found=templeEncounter([wrong,boss,guard],zones);assert.equal(found.boss,boss);assert.deepEqual(found.guards,[guard]);}
});
test('six crepidoma elevations contain no overlapping ghost navigation layers',()=>{
 const a=crepidomaPatches();assert.equal(a.length,21);assert.equal(new Set(a.map(f=>(f.y+f.h/2).toFixed(2))).size,6);
 for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){const x=a[i],y=a[j],overX=Math.min(x.x+x.w/2,y.x+y.w/2)-Math.max(x.x-x.w/2,y.x-y.w/2),overZ=Math.min(x.z+x.d/2,y.z+y.d/2)-Math.max(x.z-x.d/2,y.z-y.d/2);assert.ok(overX<1e-6||overZ<1e-6,'disjoint floor support');}
 const area=a.reduce((n,f)=>n+f.w*f.d,0);assert.ok(Math.abs(area-(TEMPLE.stylobate.w+5)*(TEMPLE.stylobate.d+5))<1e-6);
 const center=a.filter(f=>Math.abs(25-f.x)<f.w/2&&Math.abs(-102.25-f.z)<f.d/2);assert.equal(center.length,1);assert.equal(center[0].y+center[0].h/2,1.2);
});
