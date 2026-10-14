import test from 'node:test';import assert from 'node:assert/strict';
import {greekGatePlan,findPressureSupply} from './greek-progression.js';
import {existingRooms,newRooms,corridors} from './castle-layout.js';
const rooms=[...existingRooms,...newRooms].filter(r=>r.id!=='bridge');
test('each random engine room is behind a puzzle and every room remains wizard-solvable',()=>{
 for(const engine of rooms.filter(r=>r.id!=='courtyard')){
  const gates=greekGatePlan(engine.id),seen=new Set(['courtyard']);let changed=true;
  while(changed){changed=false;if(seen.has('courtyard')&&!seen.has('hall')){seen.add('hall');changed=true;}
   for(const g of gates.filter(g=>g.from&&g.kind!=='fire')){
    if(g.kind==='pressure'&&!seen.has(g.approach))continue;
    if(seen.has(g.from)!==seen.has(g.to)){seen.add(g.from);seen.add(g.to);changed=true;}
   }
  }
  for(const room of rooms)assert.ok(seen.has(room.id),engine.id+' cannot reach '+room.id);
  assert.ok(gates.filter(g=>g.from===engine.id||g.to===engine.id).every(g=>g.kind!=='open'),'No open bypass to '+engine.id);
  assert.equal(gates.filter(g=>g.secret).length,3);assert.ok(gates.some(g=>g.kind==='open'));assert.equal(gates.filter(g=>g.kind==='fire').length,3);
  for(const c of corridors.filter(c=>rooms.find(r=>r.id===c.from).boss||rooms.find(r=>r.id===c.to).boss))assert.notEqual(gates.find(g=>g.from===c.from&&g.to===c.to).kind,'open');
 }
});
test('pressure supply stays on the approach side and outside fixed clutter and engine footprint',()=>{
 const g=greekGatePlan('barracks').find(g=>g.id==='passage-hall-barracks'),engine={x:6,z:-3},obstacles=[{x:8,y:1,z:-3,w:3,h:2,d:2}],s=findPressureSupply(g,obstacles,[],[],engine);
 assert.equal(s.plates.length,2);assert.equal(s.homes.length,2);assert.equal(Number((s.plates[1].x-s.plates[0].x).toFixed(2)),1.6);
 for(const p of [...s.plates,...s.homes]){assert.ok(p.x<g.x);assert.ok(Math.hypot(p.x-engine.x,p.z-engine.z)>2.1);}
});
test('elevated supply ignores clutter below but avoids obstacles on its own storey',()=>{
 const g={...greekGatePlan('barracks').find(g=>g.id==='passage-hall-barracks'),floorY:5.4};
 const downstairs=[{x:0,y:1,z:-3,w:100,h:2,d:100}],clear=findPressureSupply(g,downstairs,[]);
 assert.ok([...clear.plates,...clear.homes].every(p=>p.y===5.4));
 const p=clear.plates[0],obstacle={x:p.x,y:6.4,z:p.z,w:2,h:2,d:2},moved=findPressureSupply(g,[...downstairs,obstacle],[]);
 assert.ok(moved.plates.every(p=>Math.abs(p.x-obstacle.x)>1.4||Math.abs(p.z-obstacle.z)>1.4));
});
