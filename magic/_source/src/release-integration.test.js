import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import {pathAroundProps} from './goliath-navigation.js';
import {createWorld} from './world.js';
import {NavigationGrid} from './systems.js';
import {placeHearth,HearthHeart} from './hearth-rules.js';
import {FireSpell,spreadFire} from './fire.js';
import {layoutScale} from './castle-layout.js';

test('the engine has a clear physical placement in every expanded castle room',()=>{
 const world=createWorld(new THREE.Scene()),nav=new NavigationGrid(world.floors,world.colliders);
 const rooms=world.zones.filter(r=>r.name!=='bridge'&&!r.secret);assert.equal(rooms.length,14);
 const clear=(p,r)=>nav.isFree(p.x,p.z)&&world.colliders.every(o=>Math.abs(p.x-o.x)>o.w/2+r+.1||Math.abs(p.z-o.z)>o.d/2+r+.1);
 for(const room of rooms){
  let seed=821;const random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
  const p=placeHearth(random,clear,undefined,[room]);assert.equal(p.room.name,room.name);assert.ok(clear(p,1.8),room.name);
  assert.ok(p.x>room.xMin+1.8&&p.x<room.xMax-1.8&&p.z>room.zMin+1.8&&p.z<room.zMax-1.8,room.name);
 }
 world.dispose();
});
test('persistent wizard fire charges the finite engine heart once and requires a new draw to refill',()=>{
 const torch={lit:true,position:new THREE.Vector3()},spell=new FireSpell([torch]),player={mana:100,body:{position:new THREE.Vector3()}};
 assert.ok(spell.take(player,()=>true,null,0));const heart=new HearthHeart();assert.ok(heart.charge(spell,.5));assert.equal(spell.charged,false);
 assert.equal(heart.charge(spell,.6),false);heart.update(2.1);assert.equal(heart.state,'ready');assert.equal(heart.fuel,100);
 assert.ok(heart.board());heart.update(2.4);heart.update(1,{firing:true});assert.ok(heart.fuel<100);
});
test('wood fire cannot ignite the allied stone Goliath',()=>{
 const source={burnUntil:10},ally={category:'actor',ally:true,dead:false};
 assert.equal(spreadFire(source,ally,1),false);assert.equal(ally.burnUntil,undefined);
 const enemy={category:'actor',dead:false};assert.equal(spreadFire(source,enemy,1),true);assert.ok(enemy.burnUntil>1);
});

test('the courtyard fire pylon leaves a physical detour beside the western doorway clutter',()=>{
 const world=createWorld(new THREE.Scene()),nav=new NavigationGrid(world.floors,world.colliders,.85,1);
 const props=[[-6.62,15.85],[-6.44,17.3]].map(([x,z])=>{const body=new CANNON.Body({mass:19,position:new CANNON.Vec3(x*layoutScale,.5,z*layoutScale),shape:new CANNON.Box(new CANNON.Vec3(.55,.5,.55))});body.updateAABB();return {category:'prop',body};});
 const from={x:-3.8*layoutScale,z:16.5*layoutScale},to={x:-15.2*layoutScale,z:16.5*layoutScale};
 const path=pathAroundProps(nav,from,to,props);assert.ok(path.length>1,'Goliath can detour around both crates');assert.deepEqual(path.at(-1),to);assert.ok(path.every(p=>nav.isFree(p.x,p.z)));world.dispose();
});
