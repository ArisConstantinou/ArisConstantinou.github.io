import test from 'node:test';import assert from 'node:assert/strict';
import {plateOccupants,stepGate,weightNeedsRecovery,flameReachesGate,GREEK_GATES,pressureTray} from './greek-puzzle-rules.js';
import {NavigationGrid,segmentBox} from './systems.js';
import {existingRooms,newRooms,corridors} from './castle-layout.js';
const weight=(x,z)=>({indestructible:true,body:{position:{x,y:.44,z},velocity:{x:0,y:0,z:0}}});
const tick=(s,input,n=60)=>{for(let i=0;i<n;i++)stepGate(s,1/60,input);};
test('double gate requires two separate grounded weights; held/airborne/moving weight does not count',()=>{
 const plates=[{x:-2,z:9},{x:2,z:9}],a=weight(-2,9),b=weight(2,9),s={kind:'pressure',phase:'locked',charge:0,open:0};
 tick(s,{occupied:plateOccupants(plates,[a],null)});assert.equal(s.phase,'locked');
 for(const mutate of [()=>{b.body.position.y=1.6;},()=>{b.body.position.y=.44;b.body.velocity.x=2;}]){mutate();tick(s,{occupied:plateOccupants(plates,[a,b],null)});assert.equal(s.phase,'locked');}
 b.body.velocity.x=0;tick(s,{occupied:plateOccupants(plates,[a,b],b)});assert.equal(s.phase,'locked');
 assert.equal(plateOccupants([plates[0],plates[0]],[a],null).filter(Boolean).length,1);
 tick(s,{occupied:plateOccupants(plates,[a,b],null)},150);assert.equal(s.phase,'open');tick(s,{occupied:[null,null]});assert.equal(s.phase,'open');
});
test('brief plate contact does not latch; secret gate needs exactly one weight',()=>{
 const s={kind:'pressure',phase:'locked',charge:0,open:0};tick(s,{occupied:[true]},10);tick(s,{occupied:[false]},1);assert.equal(s.charge,0);tick(s,{occupied:[true]},150);assert.equal(s.phase,'open');
});
test('one weight cannot activate both adjacent sockets of the shared unit',()=>{
 const g=GREEK_GATES[0],a=weight(g.plates[0].x,g.plates[0].z),s={kind:'pressure',phase:'locked',charge:0,open:0};
 tick(s,{occupied:plateOccupants(g.plates,[a],null)},180);assert.equal(s.phase,'locked');
 a.body.position.x=(g.plates[0].x+g.plates[1].x)/2;assert.equal(plateOccupants(g.plates,[a],null).filter(Boolean).length,0);
});
test('retaining fixtures block the tray but preserve the central gate approach for both actor sizes',()=>{
 const g=GREEK_GATES[0],tray=pressureTray(g.plates),walls=tray.fixtures.filter(b=>!b.floor),floors=[{x:0,z:12,w:25,d:20}];
 for(const padding of [.4,1.57]){
  const nav=new NavigationGrid(floors,walls,undefined,padding);
  assert.ok(nav.isFree(0,9));assert.ok(nav.path({x:0,z:13},{x:0,z:5}).length);
 }
 assert.ok(walls.some(b=>segmentBox({x:-4.8,z:9},{x:-3.2,z:9},b)!==null),'Middle retaining wall separates the two pockets');
});
test('HEARTH heat uses live piloted nozzles, rejects wizard fire and an intervening wall',()=>{
 const gate={height:3.6,blocker:{x:0,y:1.8,z:0,w:5.2,h:3.6,d:.3}};
 const engine={heart:{state:'piloted',firing:true},streams:[{origin:{x:0,y:1.7,z:4},direction:{x:0,y:0,z:-1},length:4}]};
 assert.ok(flameReachesGate(engine,gate,segmentBox,[gate.blocker]));engine.heart.state='dormant';assert.ok(!flameReachesGate(engine,gate,segmentBox,[gate.blocker]));engine.heart.state='piloted';
 assert.ok(!flameReachesGate(engine,gate,segmentBox,[gate.blocker,{x:0,y:1,z:2,w:3,h:2,d:.5}]));
 const s={kind:'fire',phase:'locked',charge:0,open:0};tick(s,{heat:false},600);assert.equal(s.phase,'locked');tick(s,{heat:true},260);assert.equal(s.phase,'open');
});
test('lost weights recover, grounded safe supply stays available',()=>{
 const e=weight(0,0),f=[{x:0,z:0,w:8,d:8}];assert.ok(!weightNeedsRecovery(e,f,{x:0,z:0}));e.body.position.y=-2;assert.ok(weightNeedsRecovery(e,f));e.body.position.y=.44;e.body.position.x=8;assert.ok(weightNeedsRecovery(e,f));e.body.position.x=NaN;assert.ok(weightNeedsRecovery(e,f));
});
test('upper and basement trays count only grounded weights on their own floor',()=>{
 for(const y of [5.4,-4.2,40]){
  const plates=[{x:-.8,y,z:0},{x:.8,y,z:0}],a=weight(-.8,0),b=weight(.8,0);
  a.body.position.y=b.body.position.y=y+.52;
  assert.equal(plateOccupants(plates,[a,b],null).filter(Boolean).length,2);
  b.body.position.y=y-4+.52;assert.equal(plateOccupants(plates,[a,b],null).filter(Boolean).length,1);
  b.body.position.y=y+2;assert.equal(plateOccupants(plates,[a,b],null).filter(Boolean).length,1);
  const tray=pressureTray(plates);assert.equal(tray.y,y);
  assert.ok(tray.fixtures.every(b=>Math.abs(b.y-y-(b.floor?.02:.22))<1e-8));
  assert.equal(pressureTray([plates[0]]).fixtures.length,5);
 }
});
test('recovery distinguishes a lost upper-storey supply from supported basement and high-level weights',()=>{
 const floors=[{x:0,y:5.15,z:0,w:8,h:.5,d:8},{x:0,y:-4.25,z:0,w:8,h:.5,d:8}];
 const e=weight(0,0),home={x:0,z:0,floorY:5.4};
 e.body.position.y=5.92;assert.equal(weightNeedsRecovery(e,floors,home),false);
 e.body.position.y=-3.48;assert.equal(weightNeedsRecovery(e,floors,home),true);
 assert.equal(weightNeedsRecovery(e,floors,null),false,'Solved weights may move to a valid lower floor');
 assert.equal(weightNeedsRecovery(e,[floors[0]],null),true,'A floor above the fallen weight is not support');
 e.body.position.y=40.52;assert.equal(weightNeedsRecovery(e,[{x:0,y:39.75,z:0,w:8,h:.5,d:8}],{x:0,z:0,floorY:40}),false);
});
test('upper-floor wood needs flame at its actual height, with intervening high walls respected',()=>{
 const gate={floorY:5.4,height:4.25,blocker:{x:0,y:7.525,z:0,w:5.2,h:4.25,d:.3}};
 const engine={heart:{state:'piloted',firing:true},streams:[{origin:{x:0,y:7.1,z:4},direction:{x:0,y:0,z:-1},length:4}]};
 assert.ok(flameReachesGate(engine,gate,segmentBox,[gate.blocker]));
 assert.ok(!flameReachesGate(engine,gate,segmentBox,[gate.blocker,{x:0,y:7,z:2,w:3,h:3,d:.5}]));
 engine.streams[0].origin.y=1.7;assert.ok(!flameReachesGate(engine,gate,segmentBox,[gate.blocker]));
});
test('navigation updates the same object when blocker changes',()=>{
 const floor=[{x:0,z:0,w:12,d:12}],gate={x:0,y:1,z:0,w:12,h:2,d:.4};const nav=new NavigationGrid(floor,[gate]);assert.ok(!nav.isFree(0,0));nav.setObstacles([]);assert.ok(nav.isFree(0,0));assert.ok(nav.path({x:0,z:3},{x:0,z:-3}).length);nav.setObstacles([gate]);assert.ok(!nav.isFree(0,0));
});
test('all possible random engine rooms have a wizard-solvable route without burning wood',()=>{
 const edges=corridors.map(c=>[c.from,c.to]);edges.push(['courtyard','hall'],['bridge','courtyard']); // pressure gate is wizard-solvable; crypt fire edge is absent
 const seen=new Set(['courtyard']);let changed=true;while(changed){changed=false;for(const [a,b]of edges)if(seen.has(a)!==seen.has(b)){seen.add(a);seen.add(b);changed=true;}}
 for(const room of [...existingRooms,...newRooms])assert.ok(seen.has(room.id),room.id);
 assert.equal(GREEK_GATES.filter(g=>g.kind==='fire').length,1);
});
