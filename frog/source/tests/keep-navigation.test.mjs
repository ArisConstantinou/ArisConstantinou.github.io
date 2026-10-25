import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createWorld } from '../src/world.js';
import { fixture, actor } from './game-fixture.mjs';
import { initializeFort, campWorld, gatePoint, resolveFortMovement, fortWaypoint, fortLineClear, clearFortPosition } from '../src/fortification.js';

// Construct the real geometry; stub only the browser's texture paint boundary.
const previousDocument = globalThis.document;
const context = { fillRect(){}, beginPath(){}, moveTo(){}, quadraticCurveTo(){}, bezierCurveTo(){}, closePath(){}, save(){}, restore(){}, translate(){}, scale(){}, lineTo(){}, stroke(){}, ellipse(){}, fill(){}, putImageData(){}, createRadialGradient(){return {addColorStop(){}}}, createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}} };
globalThis.document = { createElement(){return {width:0,height:0,getContext(){return context}}} };
const world = createWorld(new THREE.Scene(), {}, { seed:731 });
after(()=>{world.dispose();if(previousDocument === undefined) delete globalThis.document; else globalThis.document = previousDocument;});
let id = 0;
function castle(extra={}) {
  const camp = initializeFort({id:'keep-test-'+(++id),x:0,z:0,yaw:0,team:'ally',hp:350,maxHp:350,tier:1,buildings:{},stock:{food:0,reeds:0},...extra});
  camp.mesh = world.createShelter(camp);
  return camp;
}
const distance = (a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function walk(home, start, target, seconds=70) {
  const frog=actor({team:'ally',...start,y:home.mesh.userData.support.y});
  for(let time=0;time<seconds && distance(frog,target)>.4;time+=.05) {
    const waypoint=fortWaypoint([home],frog,target),d=distance(frog,waypoint),fraction=Math.min(1,.235/Math.max(d,.001));
    Object.assign(frog,resolveFortMovement([home],frog,{x:frog.x+(waypoint.x-frog.x)*fraction,z:frog.z+(waypoint.z-frog.z)*fraction}));
  }
  assert.ok(distance(frog,target)<.6,`navigation stalled at ${frog.x.toFixed(2)},${frog.z.toFixed(2)} toward ${target.x},${target.z}`);
  return frog;
}

test('the rendered keep supplies real wall and corner-tower collision boxes',()=>{
  const home=castle(),shape=home.mesh.userData.keepCollision;
  assert.equal(shape.rects.length,9);
  assert.ok(shape.rects.every(r=>r.maxX>r.minX&&r.maxZ>r.minZ&&r.height>4));
  const frog=actor({x:9,z:-1.5,y:home.mesh.userData.support.y});
  assert.equal(resolveFortMovement([home],frog,{x:0,z:-1.5}).blocked,true);
  assert.equal(fortLineClear([home],frog,{x:0,z:-1.5}),false);
});

test('the keep doorway stays open and followers enter and leave through it at either castle rotation',()=>{
  for(const yaw of [0,Math.PI/2]) {
    const home=castle({yaw}),center=campWorld(home,{x:0,z:0}),rearCourtyard=campWorld(home,{x:-12,z:-10});
    walk(home,gatePoint(home,-5),center);
    walk(home,center,rearCourtyard);
    walk(home,rearCourtyard,center);
    walk(home,center,gatePoint(home,8));
  }
});

test('a courtyard route crosses around the keep rather than through its side walls',()=>{
  const home=castle();
  walk(home,campWorld(home,{x:10,z:-5}),campWorld(home,{x:-12,z:-5}));
});

test('a migrated frog inside a new wall is moved to a usable position',()=>{
  const home=castle(),frog=actor({...campWorld(home,{x:3.15,z:-1.5}),y:home.mesh.userData.support.y});
  const safe=clearFortPosition(home,frog);
  assert.ok(distance(frog,safe)>.5);
  Object.assign(frog,safe);
  walk(home,frog,gatePoint(home,-5));
});

test('reinforcements, nursery births and player respawn use the open courtyard',()=>{
  const {game,player}=fixture(),home=castle({team:'enemy4',tier:2,rivalIndex:4});
  game.camps.push(home);
  for(let i=0;i<65;i++) {
    const frog=game.spawnRival(home),same=clearFortPosition(home,frog);
    assert.ok(distance(frog,same)<.001,`reinforcement ${i} spawned in keep masonry`);
  }
  home.team='ally';home.buildings.nursery=true;home.spawnTimer=100;home.supplyMigrated=true;
  for(const frog of game.frogs)if(frog!==player)frog.team='ally';
  const count=game.frogs.length;game.updateEconomy(.1);
  assert.equal(game.frogs.length,count+1);
  const birth=game.frogs.at(-1);
  assert.ok(distance(birth,clearFortPosition(home,birth))<.001);
  assert.ok(fortLineClear([home],birth,gatePoint(home,-5)));
  game.respawn();
  assert.ok(distance(player,gatePoint(home,-5.5))<.001);
});
