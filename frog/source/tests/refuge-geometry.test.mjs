import test from 'node:test';
import assert from 'node:assert/strict';
import {createRefugeDescriptor,refugeAt,refugeBody,refugeWorld,refugeLocal,refugeSurface,refugeLineClear,refugeCeiling,resolveRefugeMovement,refugeWaypoint,refugeEntrancePoint,refugeInteriorPoint,clearRefugePosition} from '../src/refuge.js';

const fixture=(data={})=>createRefugeDescriptor({id:'natural-cleft',x:0,z:0,yaw:0,...data},{terrainHeight:()=>0});
const frog=(r,point={x:.75,z:-1.2})=>({...refugeWorld(r,{...point,y:r.floorY}),team:'player',role:'hunter'});

test('the protected area is the physical rear cavity, never an outdoor radius or exposed doorway',()=>{
  const r=fixture(),inside=frog(r),door={...refugeEntrancePoint(r,-.3),team:'player'},outside=frog(r,{x:5,z:0});
  assert.equal(refugeAt([r],inside),r);assert.equal(refugeAt([r],door),null);assert.equal(refugeAt([r],outside),null);
  assert.equal(refugeAt([r],{...inside,y:r.roofTop}),null,'standing on the exposed rock is not shelter');
  assert.equal(refugeAt([r],{...inside,y:r.floorY-1}),null,'a submerged body cannot occupy the dry hollow');
  assert.equal(refugeAt([r],{...inside,type:'snake',team:'predator'}),r,'a fitting snake can enter the same cavity');
});

test('the same roof and walls block sight and attacks, while the actual entrance remains exposed',()=>{
  const r=fixture(),inside=frog(r),door={...refugeEntrancePoint(r,-.2),team:'player'},outside=refugeEntrancePoint(r,2);
  assert.equal(refugeLineClear([r],{...outside,type:'snake',scale:1.1},inside),false,'the root baffle hides the rear chamber');
  for(const position of [{x:-8,z:0},{x:8,z:0},{x:0,z:-8}])assert.equal(refugeLineClear([r],{...position,y:r.floorY},inside),false);
  assert.equal(refugeLineClear([r],{x:inside.x,z:inside.z,y:r.floorY,type:'heron',scale:1.25},inside),false,'a high bill cannot pass through the roof');
  assert.equal(refugeLineClear([r],{...outside,type:'snake',y:r.floorY},door),true,'an animal can strike an exposed frog at the mouth');
  assert.equal(refugeLineClear([r],{x:8,y:r.floorY,z:0},{x:8,y:r.floorY,z:3}),true,'nearby outdoor encounters are unchanged');
});

function route(r,actor,target){
  for(let step=0;step<900;step++){
    if(Math.hypot(actor.x-target.x,actor.z-target.z)<.11)return true;
    const waypoint=refugeWaypoint([r],actor,target),dx=waypoint.x-actor.x,dz=waypoint.z-actor.z,length=Math.hypot(dx,dz);
    if(length<.0001)return false;
    const next=resolveRefugeMovement([r],actor,{x:actor.x+dx/length*Math.min(.09,length),z:actor.z+dz/length*Math.min(.09,length)});
    Object.assign(actor,next);actor.y=refugeSurface([r],actor.x,actor.z)?.height??0;
  }
  return false;
}

test('frogs navigate the real offset entrance and leave again, including full-size developed frogs',()=>{
  for(const yaw of [0,.78,-2.13])for(const role of ['hunter','guardian']){
    const r=fixture({yaw}),actor={...refugeEntrancePoint(r,4.8),team:'ally',role,tier:5,level:25},target=refugeInteriorPoint(r);
    assert.ok(route(r,actor,target),`frog must enter yaw${yaw}, ${role}`);
    assert.equal(refugeAt([r],actor),r);
    assert.ok(route(r,actor,refugeEntrancePoint(r,4.8)),`frog must exit yaw${yaw}, ${role}`);
  }
});

test('swept movement blocks side walls and recoil tunnelling and excludes oversized predators at the mouth',()=>{
  const r=fixture(),inside=frog(r),wall=resolveRefugeMovement([r],inside,refugeWorld(r,{x:15,z:-1.2}));
  assert.equal(wall.blocked,true);assert.ok(refugeLocal(r,wall).x<3.1-refugeBody(inside).radius+.02);
  for(const type of ['heron','fish']){
    const predator={...refugeEntrancePoint(r,3),y:r.floorY,team:'predator',type,scale:1.2},target=refugeWorld(r,{x:1.55,z:2.1,y:r.floorY});
    const moved=resolveRefugeMovement([r],predator,target);
    assert.equal(moved.blocked,true,type+' must not fit through the frog entrance');
    assert.ok(refugeLocal(r,moved).z>4,type+' body stays outside the cavity');
  }
});

test('a large predator can circle real stone corners to search the entrance',()=>{
  const r=fixture(),snake={x:-9,y:0,z:0,type:'snake',team:'predator',scale:1.1},goal=refugeEntrancePoint(r,3.2),next=refugeWaypoint([r],snake,goal);
  assert.ok(Math.hypot(next.x-snake.x,next.z-snake.z)>1,'stone tips must not produce invisible long collision spikes');
  assert.ok(route(r,snake,goal),'a physically clear outside path reaches the entrance');
});

test('ordinary hopping fits the lintel, charged jumps hit it, and floor support is distinct from roof support',()=>{
  const r=fixture(),inside=frog(r),door=frog(r,{x:1.55,z:3.65}),hopRise=4.5**2/(2*20);
  assert.equal(refugeCeiling([r],door,door.y+hopRise),null);
  const stop=refugeCeiling([r],door,door.y+4);assert.ok(stop!==null&&stop+refugeBody(door).height<r.floorY+r.entrance.height);
  const roofStop=refugeCeiling([r],inside,inside.y+4);assert.ok(roofStop>stop);
  assert.equal(refugeSurface([r],inside.x,inside.z).height,r.floorY);
  assert.equal(refugeSurface([r],inside.x,inside.z,{y:r.floorY+.4}).surface,'floor');
  assert.equal(refugeSurface([r],inside.x,inside.z,{y:r.roofTop+.2}).height,r.roofTop);
  assert.equal(refugeSurface([r],inside.x,inside.z,{y:r.roofTop+.2}).surface,'roof');
});

test('saved bodies embedded in new crevices can be repaired without moving legal occupants',()=>{
  const r=fixture(),inside=frog(r),wall=frog(r,{x:-3.5,z:0});
  assert.deepEqual(clearRefugePosition([r],inside),{x:inside.x,y:inside.y,z:inside.z,blocked:false});
  const moved=clearRefugePosition([r],wall);assert.equal(moved.blocked,true);
  const next=resolveRefugeMovement([r],{...wall,...moved},{x:moved.x+.02,z:moved.z});assert.equal(next.blocked,false);
  const animal={...inside,type:'heron',team:'predator'},outside=clearRefugePosition([r],animal);
  assert.equal(outside.blocked,true);assert.equal(refugeSurface([r],outside.x,outside.z)?.surface==='floor',false);
});

test('legacy wet locations get an above-water cavity with a continuous physical access slope',()=>{
  const r=createRefugeDescriptor({id:'old-wet-site',x:0,z:0,yaw:.4},{terrainHeight:()=>-2.6});
  assert.ok(r.floorY>.615,'floor stays above the supported highest water phase');
  assert.ok(r.ramp.maxZ-r.ramp.minZ>9,'a submerged foundation needs a long natural ledge, not an abrupt step');
  let previous=r.floorY;
  for(let z=4;z<=r.ramp.maxZ;z+=.1){const p=refugeWorld(r,{x:r.entrance.x,z}),h=refugeSurface([r],p.x,p.z)?.height;assert.ok(Number.isFinite(h));assert.ok(Math.abs(h-previous)<.045);previous=h;}
  const end=refugeEntrancePoint(r,r.ramp.maxZ-4);assert.ok(Math.abs(end.y+2.6)<.01);
});
