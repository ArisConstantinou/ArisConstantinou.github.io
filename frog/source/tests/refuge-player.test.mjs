import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {fixture} from './game-fixture.mjs';
import {createWorld} from '../src/world.js';
import {validateSave} from '../src/rules.js';
import {refugeAt,refugeBody,refugeWorld,refugeInteriorPoint,refugeEntrancePoint,refugeLineClear} from '../src/refuge.js';

function creek(t){
  const previous=globalThis.document;
  const context=new Proxy({createRadialGradient:()=>({addColorStop(){}}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(o,k)=>o[k]??(()=>{})});
  globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>context})};
  const {game:g}=fixture();g.creekMode=true;g.renderer={};g.settings={volume:.5,quality:'high',sensitivity:1,uiScale:1};
  g.world=createWorld(g.scene,g.renderer,{natural:true,seed:731});
  g.input.up=()=>false;g.input.right=false;g.ui.isBlocking=()=>false;
  g.resetWorld();g.started=true;g.paused=false;g.graceUntil=0;
  t.after(()=>{g.world.dispose();if(previous===undefined)delete globalThis.document;else globalThis.document=previous;});
  return g;
}
function place(g,actor,point){
  Object.assign(actor,{x:point.x,z:point.z,y:Number.isFinite(point.y)?point.y:g.world.sampleHeight(point.x,point.z),vx:0,vz:0,vy:0,speed:0,grounded:true,charge:-1,invulnerable:0});
  actor.hop=null;actor.travelWish=null;
}
const home=g=>g.world.creekRefuges.find(r=>r.id==='living-creek-nest');
const cloneSave=g=>validateSave(JSON.parse(JSON.stringify(g.createSaveData())));

test('actual retreating companion reaches the chamber by hopping through its opening',t=>{
  const g=creek(t),r=home(g),start=refugeWorld(r,{x:-5.8,z:-4.8,y:r.floorY});
  const ally=g.spawnFrog({id:'retreating-frog',team:'ally',role:'hunter',...start,order:'retreat',hp:70,maxHp:95,stomach:2});
  place(g,ally,{...start,y:g.world.sampleHeight(start.x,start.z)});
  place(g,g.player,refugeWorld(r,{x:0,z:18,y:r.floorY}));
  g.frogs=[g.player,ally];g.predators=[];
  assert.equal(g.thinkFrog(ally,[ally]).refugeId,r.id);
  let sawOpening=false,airborne=false;
  for(let i=0;i<900&&!refugeAt([r],ally);i++){
    g.elapsed+=.05;g.updateFrogs(.05);
    sawOpening ||= Math.hypot(ally.x-refugeEntrancePoint(r).x,ally.z-refugeEntrancePoint(r).z)<1.7;
    airborne ||= !ally.grounded;
  }
  assert.equal(refugeAt([r],ally)?.id,r.id,JSON.stringify({x:ally.x,y:ally.y,z:ally.z,intent:ally.intent}));
  assert.equal(sawOpening,true,'the companion uses the visible opening');
  assert.equal(airborne,true,'travel still uses directional hops');
  assert.equal(ally.order,'retreat');
});

test('an actual charged-strength jump stops below the refuge roof and lands inside',t=>{
  const g=creek(t),r=home(g),p=g.player;place(g,p,refugeInteriorPoint(r));
  assert.equal(g.jump(p,12),true);
  let maxHead=p.y+refugeBody(p).height;
  for(let i=0;i<120;i++){g.elapsed+=1/60;g.moveActor(p,1/60);maxHead=Math.max(maxHead,p.y+refugeBody(p).height);}
  assert.ok(maxHead<=r.roofBottom+.02,'the charged jump cannot pass through the opaque roof');
  assert.equal(p.grounded,true);assert.equal(refugeAt([r],p)?.id,r.id);
});

test('real damage cannot cross a refuge shell in either direction, but an intruding frog can fight inside',t=>{
  const g=creek(t),r=home(g),p=g.player;place(g,p,refugeInteriorPoint(r));
  const heron=g.predators.find(f=>f.type==='heron'),outside=refugeWorld(r,{x:0,z:-6,y:r.floorY});
  place(g,heron,outside);heron.phase='stalk';
  const hp=p.hp,predatorHP=heron.hp;
  assert.equal(refugeLineClear([r],heron,p),false);
  g.damage(p,25,heron);g.damage(heron,25,p);
  assert.equal(p.hp,hp);assert.equal(heron.hp,predatorHP);
  const enemy=g.spawnFrog({id:'inside-opponent',team:'enemy99',role:'hunter',...refugeInteriorPoint(r,1),hp:80,maxHp:80});
  place(g,enemy,refugeInteriorPoint(r,1));p.invulnerable=0;
  assert.equal(refugeLineClear([r],enemy,p),true);g.damage(p,10,enemy);
  assert.ok(p.hp<hp,'being in a refuge does not grant invulnerability');
  place(g,p,refugeWorld(r,{x:0,z:-8,y:r.floorY}));p.invulnerable=0;
  const exposedHP=p.hp;g.damage(p,10,heron);assert.ok(p.hp<exposedHP,'a frog outside is still exposed');
});

test('Resume preserves interior and roof positions and repairs an older save embedded in new stone',t=>{
  const g=creek(t),r=home(g);place(g,g.player,refugeInteriorPoint(r));
  const before={x:g.player.x,y:g.player.y,z:g.player.z};
  let data=cloneSave(g);assert.equal(data.player.y,before.y);g.resetWorld(data);
  assert.equal(refugeAt(g.world.creekRefuges,g.player)?.id,'living-creek-nest');
  assert.ok(Math.hypot(g.player.x-before.x,g.player.z-before.z)<.001);
  let current=home(g);place(g,g.player,{x:current.x,z:current.z,y:current.roofTop});
  data=cloneSave(g);g.resetWorld(data);current=home(g);
  assert.ok(Math.abs(g.player.y-current.roofTop)<.001,'roof support survives Resume');
  data=cloneSave(g);Object.assign(data.player,refugeWorld(current,{x:0,z:.7,y:current.floorY}));
  g.resetWorld(data);
  assert.equal(refugeAt(g.world.creekRefuges,g.player)?.id,'living-creek-nest','a migrated position in the new baffle is repaired into usable shelter');
});

test('respawn chooses an actual covered interior even with a predator prowling outside',t=>{
  const g=creek(t),r=home(g),heron=g.predators.find(f=>f.type==='heron');
  g.frogs=[g.player];g.predators=[heron];place(g,heron,refugeEntrancePoint(r,4));heron.phase='stalk';
  Object.assign(g.player,{dead:true,hp:0});g.respawn();
  assert.equal(g.player.dead,false);assert.equal(refugeAt(g.world.creekRefuges,g.player)?.id,r.id);
  assert.equal(refugeLineClear(g.world.creekRefuges,heron,g.player),false);
});

test('respawn rejects a refuge with a snake inside its occluded entrance corridor',t=>{
  const g=creek(t),r=home(g),snake=g.predators.find(f=>f.type==='snake');
  g.frogs=[g.player];g.predators=[snake];place(g,snake,refugeWorld(r,{x:1.55,z:2.2,y:r.floorY}));snake.phase='stalk';
  assert.equal(refugeLineClear([r],snake,{...g.player,...refugeInteriorPoint(r)}),false,'the baffle hides the rear chamber from the intruding snake');
  Object.assign(g.player,{dead:true,hp:0});g.respawn();
  assert.equal(g.player.dead,false);
  const chosen=refugeAt(g.world.creekRefuges,g.player);
  assert.ok(chosen,'another natural refuge remains usable');
  assert.notEqual(chosen.id,r.id,'occlusion does not make an occupied refuge a safe respawn');
});

test('Resume keeps an intruding snake inside and prepares its confined body before simulation resumes',t=>{
  const g=creek(t),r=home(g),snake=g.predators.find(f=>f.type==='snake');
  place(g,snake,refugeInteriorPoint(r,1));snake.phase='patrol';g.predators=[snake];
  const before={x:snake.x,z:snake.z},saved=cloneSave(g);g.resetWorld(saved);
  const restored=g.predators.find(f=>f.id===snake.id);
  assert.ok(restored);assert.equal(refugeAt(g.world.creekRefuges,restored)?.id,r.id,'loading does not expel a predator that physically fits');
  assert.ok(Math.hypot(restored.x-before.x,restored.z-before.z)<.001);
  assert.ok(restored.refugeSnakePose?.points.length>=2,'the first rendered frame already has a route for the body');
  assert.equal(g.elapsed,saved.elapsed,'preparing a pose does not run the hunt or advance game time');
});
