import test from 'node:test';
import assert from 'node:assert/strict';
import {supportSightClear} from './walkable-support.js';

// Frozen 1.6.1 semantics: floors block upper/lower-floor sight, endpoints count,
// and horizontal reach margins expand X/Z only.
function original(a,b,obstacles,margin=0){
 return !obstacles.map(box=>({...box,w:box.w+margin*2,d:box.d+margin*2})).some(box=>{
  let near=0,far=1;
  for(const [axis,size] of [['x','w'],['y','h'],['z','d']]){
   const lo=box[axis]-box[size]/2,hi=box[axis]+box[size]/2,delta=b[axis]-a[axis];
   if(Math.abs(delta)<1e-5){if(a[axis]<lo||a[axis]>hi)return false;}
   else{let t0=(lo-a[axis])/delta,t1=(hi-a[axis])/delta;if(t0>t1)[t0,t1]=[t1,t0];near=Math.max(near,t0);far=Math.min(far,t1);if(near>far)return false;}
  }return true;
 });
}
test('crowd sight optimization preserves castle slab and margin results',()=>{
 let seed=725;const rnd=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
 const boxes=Array.from({length:180},()=>({x:rnd()*80-40,y:rnd()*12-2,z:rnd()*80-40,w:.1+rnd()*6,h:.1+rnd()*5,d:.1+rnd()*6}));
 for(let i=0;i<2500;i++){
  const a={x:rnd()*100-50,y:rnd()*15-3,z:rnd()*100-50},b={x:rnd()*100-50,y:rnd()*15-3,z:rnd()*100-50};
  if(i%5===0)b.x=a.x+(rnd()-.5)*1e-5;if(i%7===0)b.y=a.y;if(i%11===0)b.z=a.z;
  const margin=[0,.01,.05,.12][i%4];assert.equal(supportSightClear(a,b,boxes,margin),original(a,b,boxes,margin),'segment '+i);
 }
});
test('doors added, removed or moved are observed without a stale spatial cache',()=>{
 const a={x:-3,y:1,z:0},b={x:3,y:1,z:0},door={x:0,y:1,z:0,w:.3,h:2,d:3},boxes=[];
 assert.equal(supportSightClear(a,b,boxes),true);boxes.push(door);assert.equal(supportSightClear(a,b,boxes),false);
 door.z=5;assert.equal(supportSightClear(a,b,boxes),true);door.z=0;boxes.splice(0,1);assert.equal(supportSightClear(a,b,boxes),true);
});
test('fire target exemption affects only its own pylon, never a floor or wall',()=>{
 const a={x:0,y:1,z:0},b={x:0,y:3,z:4},pylon={x:0,y:1,z:4,w:1,h:2,d:1,tag:'fire-pylon'};
 const ignore=o=>o.tag==='fire-pylon';assert.equal(supportSightClear(a,b,[pylon],0,ignore),true);
 assert.equal(supportSightClear(a,b,[pylon,{x:0,y:2,z:2,w:8,h:.3,d:8}],0,ignore),false);
});
