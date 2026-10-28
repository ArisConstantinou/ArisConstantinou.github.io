import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {ARENA_RADIUS,ARENA_MOVE_RADIUS,BATTLEGROUND_AREAS,BATTLEGROUND_ROUTES,BATTLEGROUND_ROCKS,BATTLEGROUND_COVER,routeSample,battlegroundAreaAt,battlegroundHeight,battlegroundTint} from '../src/arcade-battleground.js';
import {BASES,WALLS,ARENA_ROCKS,CATAPULT_SITES,TREES,resolveArenaMove,navigateTo} from '../src/arcade-bases.js';
import {FROG_BODY} from '../src/arcade-actor-bounds.js';
import {clearBodySegment,rectangleClearance} from '../src/arcade-collision.js';
import {newRound,loadRound,saveRound,RULES,SWARMS,FLIES_PER_SWARM,moveBody,traceShot,collect} from '../src/arcade-model.js';
import {ARTILLERY,stoneTarget} from '../src/arcade-artillery.js';
import {drawRadar} from '../src/arcade-radar.js';
import {createWorld} from '../src/world.js';

const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z),point=p=>({x:p[0],z:p[1]});
const outer=BATTLEGROUND_AREAS.filter(a=>a.id!=='crossing');
const circles=[...ARENA_ROCKS,...CATAPULT_SITES.map(c=>({...c,r:ARTILLERY.baseRadius}))];
const natural=(x,z)=>Math.sin(x*.11)*.8+Math.cos(z*.13)*.5;
function clear(p){
 assert.ok(Math.hypot(p.x,p.z)<=ARENA_MOVE_RADIUS+.0001,'inside the expanded physical boundary');
 assert.ok(WALLS.every(w=>rectangleClearance(p,w)>=FROG_BODY.movementRadius-.0002),'clear of every enclosure wall');
 assert.ok(circles.every(c=>distance(p,c)>=c.r+FROG_BODY.movementRadius-.0002),'clear of every rock and machine');
}

test('new districts add playable space while original frogs, homes and machines retain their scale',()=>{
 assert.equal(ARENA_RADIUS,38);assert.equal(ARENA_MOVE_RADIUS,37);assert.equal(RULES.radius,ARENA_RADIUS);
 assert.equal(outer.length,5);assert.equal(new Set(BATTLEGROUND_AREAS.map(a=>a.kind)).size,6);
 for(const area of outer){assert.ok(Math.hypot(area.x,area.z)>24);assert.ok(Math.hypot(area.x,area.z)<ARENA_MOVE_RADIUS);assert.equal(battlegroundAreaAt(area.x,area.z)?.id,area.id);}
 assert.deepEqual(BASES.map(b=>[b.x,b.z,b.halfWidth,b.halfDepth]),[[0,20.5,3.1,2.6],[-18,1,3.1,2.9],[18,1,3.1,2.9]]);
 assert.deepEqual(CATAPULT_SITES.map(c=>[c.x,c.z]),[[-8.5,16],[-16,-8.5],[16,-8.5]]);
 assert.equal(FROG_BODY.movementRadius,.64);assert.equal(FROG_BODY.height,.84);assert.equal(ARTILLERY.baseRadius,.95);
 const actor={x:24,z:0};moveBody(actor,5,0);assert.ok(distance(actor,{x:29,z:0})<1e-8,'a five-unit input still moves five units beyond the old boundary');
});

test('the authored route graph connects every district to the central crossing',()=>{
 const key=p=>`${p[0]},${p[1]}`,graph=new Map();
 const link=(a,b)=>{if(!graph.has(a))graph.set(a,new Set());graph.get(a).add(b);};
 for(const route of BATTLEGROUND_ROUTES){assert.ok(route.width>=FROG_BODY.movementRadius*2+1);for(let i=1;i<route.points.length;i++){link(key(route.points[i-1]),key(route.points[i]));link(key(route.points[i]),key(route.points[i-1]));}}
 const reached=new Set(['0,3']),queue=['0,3'];for(const node of queue)for(const next of graph.get(node)||[])if(!reached.has(next)){reached.add(next);queue.push(next);}
 for(const area of BATTLEGROUND_AREAS)assert.ok(reached.has(`${area.x},${area.z}`),`${area.id} has no continuous route from the crossing`);
 for(const route of BATTLEGROUND_ROUTES)assert.ok(route.points.every(p=>reached.has(key(p))),`${route.id} is isolated`);
});

test('every marked lane centerline clears the actual walls, rocks and machine pedestals',()=>{
 const failures=[];
 for(const route of BATTLEGROUND_ROUTES)for(let i=1;i<route.points.length;i++){
  const a=point(route.points[i-1]),b=point(route.points[i]);
  if(!clearBodySegment(a,b,{walls:WALLS,circles,radius:FROG_BODY.movementRadius+.08,arenaRadius:ARENA_MOVE_RADIUS}))failures.push(`${route.id}: (${a.x},${a.z}) → (${b.x},${b.z})`);
 }
 assert.deepEqual(failures,[],'painted travel lanes must be physically open at navigation clearance');
});

test('route heights remain continuous through every waypoint and junction',()=>{
 for(const route of BATTLEGROUND_ROUTES)for(let i=1;i<route.points.length;i++){
  const a=route.points[i-1],b=route.points[i],steps=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.1);let previous=null;
  for(let n=0;n<=steps;n++){const t=n/steps,x=a[0]+(b[0]-a[0])*t,z=a[1]+(b[1]-a[1])*t,y=battlegroundHeight(x,z,natural(x,z));assert.ok(Number.isFinite(y));if(previous!==null)assert.ok(Math.abs(y-previous)<.12,`${route.id} has a height step near (${x.toFixed(2)},${z.toFixed(2)})`);previous=y;}
 }
});

test('the terrain profile keeps the pond wet beside its crossing and fades into the outside creek',()=>{
 assert.ok(battlegroundHeight(1,-29,natural(1,-29))>.25,'the northern crossing has a raised travel bank');
 assert.ok(battlegroundHeight(1,-33,natural(1,-33))<-.2,'water remains visible beside the crossing');
 for(const [x,z] of [[50,0],[-50,0],[0,50],[0,-50]]){assert.equal(battlegroundHeight(x,z,natural(x,z)),natural(x,z));assert.equal(battlegroundTint(x,z),null);}
 for(let x=-38;x<=38;x+=2)for(let z=-38;z<=38;z+=2){assert.ok(Number.isFinite(battlegroundHeight(x,z,natural(x,z))));const tint=battlegroundTint(x,z);if(tint)assert.ok(tint.weight>=0&&tint.weight<=1);}
 for(const route of BATTLEGROUND_ROUTES){const p=route.points[0];assert.ok(routeSample(p[0],p[1]).distance<1e-8);assert.ok(battlegroundTint(p[0],p[1])?.weight>.5,'the path remains distinguishable from its district');}
});

const paintContext={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
test('the actual terrain mesh and walkable surface receive the authored outer district heights',t=>{
 const previous=globalThis.document;globalThis.document={createElement(){return {width:0,height:0,getContext(){return paintContext}}}};let world;
 try{world=createWorld(new THREE.Scene(),{},{natural:true,seed:731,discoveryDecor:false,terrainProfile:battlegroundHeight,terrainTint:battlegroundTint});}finally{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;}
 t.after(()=>world.dispose());assert.ok(world.group.getObjectByName('Creek bed and island banks'));
 for(const area of outer.filter(a=>a.kind!=='pond')){const height=world.getTerrainHeight(area.x,area.z);assert.ok(Math.abs(height-area.height)<.12,`${area.id}: actual bed ${height} differs from authored bank ${area.height}`);assert.ok(world.getSurface(area.x,area.z).height>=height-.001);}
 assert.ok(world.getTerrainHeight(1,-29)>.2,'the real mesh supports the northern causeway');assert.ok(world.getTerrainHeight(1,-33)<-.15,'the real mesh retains the pond beside it');
});

test('navigation and swept movement reach every added district and return through the original home gate',()=>{
 for(const area of outer){
  const actor={...BASES[0].spawn};
  for(const goal of [area,BASES[0].stock]){
   let reached=false;
   for(let frame=0;frame<2200;frame++){
    const before={x:actor.x,z:actor.z},direction=navigateTo(actor,goal);Object.assign(actor,resolveArenaMove(actor,direction.x*.12,direction.z*.12));
    assert.ok(distance(before,actor)<=.121,`${area.id} route must not teleport`);clear(actor);
    if(distance(actor,goal)<.25){reached=true;break;}
   }
   assert.ok(reached,`could not travel ${goal===area?'to '+area.id:'home from '+area.id}`);
  }
 }
});

test('the outer collision boundary slides normally and fly range no longer stops at the old rim',()=>{
 let actor={x:ARENA_MOVE_RADIUS,z:0};for(let i=0;i<30;i++)actor=resolveArenaMove(actor,.04,.1);clear(actor);assert.ok(actor.z>2.5);
 const back=resolveArenaMove(actor,-.3,0);assert.ok(back.x<actor.x-.29);
 const state=newRound(),player=state.actors[0];state.phase='battle';for(const a of state.actors.slice(1))Object.assign(a,{ko:true,eliminated:true});Object.assign(player,{x:24,z:0,aimX:1,aimY:0,aimZ:0,aim3D:false});
 const trace=traceShot(state,player);assert.equal(trace.kind,'boundary');assert.ok(Math.abs(trace.x-(ARENA_RADIUS-.2))<1e-7);assert.ok(trace.distance>13);
});

test('catapult power retains its old range while targets may reach the new districts',()=>{
 assert.equal(ARTILLERY.maxRange,28);const center=stoneTarget({x:0,z:0},1,0,1);assert.equal(center.x,28);assert.equal(center.range,28);
 const side=stoneTarget(CATAPULT_SITES[2],1,0,1);assert.ok(side.valid);assert.ok(Math.abs(Math.hypot(side.x,side.z)-ARENA_MOVE_RADIUS)<1e-8);assert.ok(Math.hypot(side.x,side.z)>24);
});

test('outer rocks, cover and four food patches are part of real gameplay',()=>{
 for(const rock of BATTLEGROUND_ROCKS)assert.ok(ARENA_ROCKS.some(r=>r.x===rock.x&&r.z===rock.z&&r.r===rock.r));
 for(const grove of BATTLEGROUND_COVER)assert.ok(TREES.some(t=>t.id===grove.id&&t.x===grove.x&&t.z===grove.z&&t.radius===grove.radius));
 assert.equal(SWARMS.length,10);assert.equal(FLIES_PER_SWARM,12);assert.deepEqual(SWARMS.slice(0,6).map(s=>[s.x,s.z]),[[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]]);
 for(const patch of SWARMS.slice(6)){const state=newRound(712),player=state.actors[0];Object.assign(player,{x:patch.x,z:patch.z,ammo:20,tongue:0});assert.equal(state.flies.filter(f=>f.swarmId===patch.id).length,12);assert.ok(collect(state,player),`${patch.id} can be harvested in its new district`);assert.equal(player.ammo,21);}
});

const flyState=f=>({id:f.id,swarmId:f.swarmId,x:f.x,z:f.z,phase:f.phase,wait:f.wait});
test('a 72-fly save gains only the new patches and preserves its existing food and battle state',()=>{
 const old=newRound(191);old.flies=old.flies.slice(0,72);old.phase='battle';old.intro=0;old.time=123.5;Object.assign(old.actors[0],{x:5,z:4,ammo:23});old.bases[2].destroyed=true;old.stats.hits=8;
 for(const [i,fly] of old.flies.entries())fly.wait=i%3===0?3.25:0;
 const loaded=loadRound(JSON.stringify(old));assert.ok(loaded);assert.equal(loaded.flies.length,120);assert.deepEqual(loaded.flies.slice(0,72).map(flyState),old.flies.map(flyState));
 assert.equal(loaded.phase,'battle');assert.equal(loaded.time,123.5);assert.equal(loaded.actors[0].ammo,23);assert.ok(distance(loaded.actors[0],old.actors[0])<1e-8);assert.equal(loaded.bases[2].destroyed,true);assert.equal(loaded.stats.hits,8);
 for(const fly of loaded.flies.slice(72)){const patch=SWARMS.find(p=>p.id===fly.swarmId);assert.ok(patch&&distance(fly,patch)<=patch.radius);assert.equal(fly.wait,0);}
});

test('a current save keeps outer-region position and depletion on all 120 flies',()=>{
 const original=newRound(312);original.phase='battle';original.intro=0;Object.assign(original.actors[0],{x:-29,z:1,ammo:17});original.flies[75].wait=4.25;original.flies[119].wait=2;
 const loaded=loadRound(saveRound(original));assert.ok(loaded);assert.ok(distance(loaded.actors[0],original.actors[0])<1e-8,'resume must not clamp the player to the old arena');assert.deepEqual(loaded.flies.map(flyState),original.flies.map(flyState));
 const malformed={...original,flies:original.flies.slice(0,96)};assert.equal(loadRound(JSON.stringify(malformed)),null,'only known old/current save layouts are accepted');
});

test('radar rotates and labels an outer district using the expanded world bounds',()=>{
 const state=newRound(),player=state.actors[0];Object.assign(player,{x:29,z:1});for(const a of state.actors.slice(1))a.ko=true;
 for(const camera of [{x:0,z:6},{x:6,z:0}]){
  const calls=[],context=new Proxy({},{get(target,key){if(key in target)return target[key];return (...args)=>calls.push({op:key,args,fill:target.fillStyle});},set(target,key,value){target[key]=value;return true;}});
  drawRadar({state,camera:{position:camera},focus:{x:0,z:0},elapsed:0},{width:320,getContext:()=>context});
  const marker=calls.find(c=>c.op==='arc'&&c.args[2]===9&&c.fill==='#d2ff70');assert.ok(marker,'the player marker exists in the outer district');
  const k=320*.43/ARENA_RADIUS,expected=camera.x?[ -player.z*k,player.x*k ]:[player.x*k,player.z*k];assert.ok(Math.hypot(marker.args[0]-expected[0],marker.args[1]-expected[1])<1e-8);assert.ok(Math.hypot(marker.args[0],marker.args[1])+9<320*.43);
  assert.ok(calls.some(c=>c.op==='fillText'&&c.args[0]===battlegroundAreaAt(player.x,player.z).name),'the district name identifies the current outer region');
 }
});
