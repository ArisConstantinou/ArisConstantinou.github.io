import test from 'node:test';
import assert from 'node:assert/strict';
import {FROG_BODY} from '../src/arcade-actor-bounds.js';
import {sweepBody,rectangleClearance,clearBodySegment} from '../src/arcade-collision.js';
import {BASES,WALLS,ARENA_ROCKS,CATAPULT_SITES,resolveArenaMove,navigateTo} from '../src/arcade-bases.js';
import {ARTILLERY} from '../src/arcade-artillery.js';

const radius=FROG_BODY.movementRadius,distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function clearArena(p){
 assert.ok(Math.hypot(p.x,p.z)<=24+.0001,'arena edge remains solid');
 for(const w of WALLS)assert.ok(rectangleClearance(p,w)>=radius-.0002,`clear of ${w.id}`);
 for(const c of [...ARENA_ROCKS,...CATAPULT_SITES.map(c=>({...c,r:ARTILLERY.baseRadius}))])if(c.id!==p.catapultId)assert.ok(distance(p,c)>=c.r+radius-.0002,'clear of circular solid');
}

test('a frog touching a flat wall can move along it and reverse away immediately',()=>{
 const wall={x:0,z:0,hw:.2,hd:4},geometry={walls:[wall],radius},start={x:-.2-radius,z:0};
 const slide=sweepBody(start,0,2,geometry);assert.ok(Math.abs(slide.x-start.x)<.001);assert.ok(Math.abs(slide.z-2)<.001);
 const away=sweepBody(start,-2,0,geometry);assert.ok(Math.abs(away.x-start.x+2)<.001);assert.equal(away.z,0);
 const diagonal=sweepBody({x:-3,z:0},4,1,geometry);assert.ok(Math.abs(diagonal.x-start.x)<.001);assert.ok(Math.abs(diagonal.z-1)<.001);
});

test('grazing a wall corner uses the round body rather than an invisible square',()=>{
 const wall={x:0,z:0,hw:1,hd:1},start={x:1.76,z:1.32},target={x:1.32,z:1.76},geometry={walls:[wall],radius};
 assert.ok(rectangleClearance({x:1.54,z:1.54},wall)>radius);
 const result=sweepBody(start,-.44,.44,geometry);
 assert.ok(distance(result,target)<1e-8,'clear diagonal corner travel must not snag or be pushed');
 assert.equal(clearBodySegment(start,target,geometry),true,'navigation and physical clearance agree');
});

test('high speed movement cannot tunnel through walls or a creek rock',()=>{
 const wall={x:0,z:0,hw:.17,hd:4};
 const blocked=sweepBody({x:-5,z:0},20,0,{walls:[wall],radius});
 assert.ok(blocked.x<-.17-radius&&blocked.x>-.17-radius-.001);
 const rock=ARENA_ROCKS[0],start={x:rock.x-6,z:rock.z},end=resolveArenaMove(start,12,0);
 assert.ok(end.x<rock.x-rock.r-radius&&end.x>rock.x-rock.r-radius-.001);clearArena(end);
});

test('a rock glance keeps tangent motion, and contact never traps a reversing frog',()=>{
 const rock=ARENA_ROCKS[0],start={x:rock.x-3,z:rock.z+1.5};
 const glance=resolveArenaMove(start,4,0);clearArena(glance);
 assert.ok(glance.x>start.x+1.5&&glance.z>start.z+.3,'glancing input must flow around the round surface');
 const stopped=resolveArenaMove({x:rock.x-5,z:rock.z},6,0),back=resolveArenaMove(stopped,-.5,0);
 assert.ok(Math.abs(back.x-stopped.x+.5)<1e-8);assert.ok(Math.abs(back.z-stopped.z)<1e-8);
 const sideways=resolveArenaMove(stopped,0,.4);assert.ok(sideways.z>stopped.z+.39);clearArena(sideways);
});

test('one sweep resolves a narrow passage beside a round solid without a secondary wall push',()=>{
 const wall={x:0,z:0,hw:.2,hd:4},circle={x:-2.4,z:0,r:.6},geometry={walls:[wall],circles:[circle],radius};
 let p={x:-1,z:-3};
 for(let i=0;i<100;i++){
  p=sweepBody(p,.005,.06,geometry);
  assert.ok(rectangleClearance(p,wall)>=radius-.0002);assert.ok(distance(p,circle)>=circle.r+radius-.0002);
 }
 assert.ok(p.z>2.5,'small diagonal pressure against the wall must not stall passage travel');
});

test('every real gate admits an off-centre frog in both directions with the new body clearance',()=>{
 for(const base of BASES){
  const dx=Math.sin(base.spawnHeading),dz=Math.cos(base.spawnHeading),side={x:-dz*.7,z:dx*.7};
  const start={x:base.gate.x-dx*1.4+side.x,z:base.gate.z-dz*1.4+side.z};
  const outside=resolveArenaMove(start,dx*3,dz*3);assert.ok(distance(outside,{x:start.x+dx*3,z:start.z+dz*3})<.001);clearArena(outside);
  const back=resolveArenaMove(outside,-dx*3,-dz*3);assert.ok(distance(back,start)<.001);clearArena(back);
 }
});

test('machine pedestals block approach, permit sidestepping and exempt only the mounted machine',()=>{
 for(const c of CATAPULT_SITES){
  const stop=resolveArenaMove({x:c.x,z:c.z+2.2},0,-2);clearArena(stop);assert.ok(stop.z>=c.z+ARTILLERY.baseRadius+radius-.001);
  const side=resolveArenaMove(stop,.3,0);assert.ok(side.x>stop.x+.29);clearArena(side);
  const mounted=resolveArenaMove({x:c.x,z:c.z,catapultId:c.id},0,0);assert.ok(distance(mounted,c)<1e-9);
 }
});

test('a valid surface contact is stable at rest and old embedded positions separate locally',()=>{
 const wall=WALLS.find(w=>w.id==='base-player-east-whole'),start={x:wall.x-wall.hw-radius,z:wall.z};
 let p={...start};for(let i=0;i<120;i++)p=resolveArenaMove(p,0,0);
 assert.ok(distance(p,start)<.001,'stationary contact must not jitter or creep');
 const repaired=resolveArenaMove({x:wall.x,z:wall.z},0,0);assert.ok(distance(repaired,wall)<1);clearArena(repaired);
 for(const rock of ARENA_ROCKS){const fixed=resolveArenaMove(rock,0,0);assert.ok(distance(fixed,rock)<rock.r+radius+.001);clearArena(fixed);}
});

test('a frog at the arena rim can keep turning along it and reverse without clipping outside',()=>{
 let p={x:24,z:0};
 for(let i=0;i<50;i++){p=resolveArenaMove(p,.04,.1);clearArena(p);}
 assert.ok(p.z>4,'sustained outward pressure must retain useful tangential motion');
 const back=resolveArenaMove(p,-.2,0);assert.ok(back.x<p.x-.19);clearArena(back);
});

test('navigation can leave physical rock and machine contact, route around solids and enter each house',()=>{
 for(const solid of [...ARENA_ROCKS,...CATAPULT_SITES.map(c=>({...c,r:ARTILLERY.baseRadius}))]){
  const actor={x:solid.x,z:solid.z+solid.r+radius+.0001},goal=BASES[1].stock;
  for(let frame=0;frame<1600&&distance(actor,goal)>.25;frame++){
   const direction=navigateTo(actor,goal),next=resolveArenaMove(actor,direction.x*.085,direction.z*.085);
   assert.ok(distance(actor,next)<.086,'navigation must not teleport past collision');Object.assign(actor,next);clearArena(actor);
  }
  assert.ok(distance(actor,goal)<.25,`failed to leave solid at ${solid.x},${solid.z}`);
 }
});

test('all homes and machine yards remain connected using the actual unified collision solver',()=>{
 for(const base of BASES)for(const goal of [...BASES.map(b=>b.stock),...CATAPULT_SITES]){
  const actor={...base.spawn};
  for(let frame=0;frame<1600&&distance(actor,goal)>(goal.id?2.4:.25);frame++){
   const direction=navigateTo(actor,goal),next=resolveArenaMove(actor,direction.x*.085,direction.z*.085);Object.assign(actor,next);clearArena(actor);
  }
  assert.ok(distance(actor,goal)<(goal.id?2.4:.25),`${base.owner} cannot reach ${goal.id||JSON.stringify(goal)}`);
 }
});

test('a cached path is reconsidered after a hit moves its next segment into geometry',()=>{
 const actor={...BASES[0].spawn},goal=BASES[2].stock;
 for(let i=0;i<30;i++){const d=navigateTo(actor,goal);Object.assign(actor,resolveArenaMove(actor,d.x*.08,d.z*.08));}
 Object.assign(actor,{x:ARENA_ROCKS[0].x-ARENA_ROCKS[0].r-radius-.0001,z:ARENA_ROCKS[0].z});
 for(let i=0;i<1700&&distance(actor,goal)>.25;i++){const d=navigateTo(actor,goal);Object.assign(actor,resolveArenaMove(actor,d.x*.085,d.z*.085));clearArena(actor);}
 assert.ok(distance(actor,goal)<.25);
});

test('navigation does not bounce away from a legal tangent path beside a wall',()=>{
 const actor={x:3.1-.17-(radius+.08),z:19.6},target={x:actor.x,z:21.4};
 for(let frame=0;frame<18;frame++){
  const d=navigateTo(actor,target);
  assert.ok(Math.abs(d.x)<1e-6&&d.z>.999,'navigation sight and recovery must use the same clearance');
  Object.assign(actor,resolveArenaMove(actor,d.x*.08,d.z*.08));
 }
 assert.ok(actor.z>21);
});
