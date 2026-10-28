import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Raycaster,Vector2,Vector3} from 'three';
import {cameraPose,screenToWorld} from '../src/arcade-view-math.js';
import {resolveOverviewAim,pointerPixels} from '../src/arcade-mouse-aim.js';
import {newRound,projectileOrigin,setProjectileWorld,traceWorldRay} from '../src/arcade-model.js';
import {traceAim} from '../src/arcade-aim.js';
import {PROJECTILE,projectileLaunch} from '../src/arcade-projectiles.js';

const near=(a,b,tolerance=1e-8)=>assert.ok(Math.abs(a-b)<tolerance,`${a} should equal ${b}`);
const vector=p=>new Vector3(p.x,p.y,p.z);
function cameraFor(player={x:0,z:0},{aspect=16/9,fov=52,zoom=1}={}){
 const pose=cameraPose(player,0,aspect,'overview',{zoom}),camera=new PerspectiveCamera(fov,aspect,.1,250);
 camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();
 return {camera,focus:new Vector3(...pose.look)};
}
function rayAt(camera,target){
 const screen=vector(target).project(camera),caster=new Raycaster();caster.setFromCamera(new Vector2(screen.x,screen.y),camera);
 return {rayOrigin:caster.ray.origin,rayDirection:caster.ray.direction};
}
function applyAim(actor,result){Object.assign(actor,{aimX:result.direction.x,aimY:result.direction.y??0,aimZ:result.direction.z,aim3D:Number.isFinite(result.direction.y)});}

test('overview empty-ground aim uses a stable horizontal plane across lenses and hops',()=>{
 for(const aspect of [430/745,745/430,16/9])for(const fov of [40,52,80])for(const zoom of [.7,1,1.5]){
  const {camera}=cameraFor(undefined,{aspect,fov,zoom});
  for(const target of [{x:8,y:.45,z:0},{x:-8,y:.45,z:0},{x:0,y:.45,z:-12},{x:0,y:.45,z:5}]){
   const ray=rayAt(camera,target),snap=camera.matrixWorld.toArray();let previous;
   for(const hop of [0,.4,1.1]){
    const result=resolveOverviewAim({...ray,muzzle:{x:0,y:.45+hop,z:0},planeHeight:.45,range:21.6,hits:[{kind:'terrain',x:target.x,y:0,z:target.z}]});
    assert.equal(result.source,'plane');assert.equal(result.direction.y,undefined,'planar intent selects terrain-following flight');assert.equal(result.targetId,null);
    near(result.direction.x,target.x/Math.hypot(target.x,target.z));near(result.direction.z,target.z/Math.hypot(target.x,target.z));
    for(const axis of ['x','y','z'])near(result.target[axis],target[axis]);
    if(previous)assert.deepEqual(result,previous,'visual hop cannot move the chosen horizontal bearing');previous=result;
   }
   assert.deepEqual(camera.matrixWorld.toArray(),snap);
  }
 }
});

test('mouse and directional stick produce the same planar shot for the same bearing',()=>{
 const s=newRound(),p=s.actors[0];Object.assign(p,{x:0,z:0,height:1.1});const {camera,focus}=cameraFor(p);
 for(const [x,z] of [[1,0],[-1,0],[0,1],[0,-1],[.6,-.8]]){
  const stick=screenToWorld(x,z,camera.position,focus),target={x:stick.x*8,y:.45,z:stick.z*8};
  const mouse=resolveOverviewAim({...rayAt(camera,target),muzzle:projectileOrigin(s,p),planeHeight:.45,range:21.6});
  applyAim(p,mouse);const launch=projectileLaunch(s,p);
  assert.equal(launch.followGround,true);near(launch.y,PROJECTILE.originHeight);
  near(launch.dx,stick.x);near(launch.dy,0);near(launch.dz,stick.z);
 }
});

test('an exact visible body ray aims at real target height from a grounded or hopping source',()=>{
 for(const height of [0,1.1])for(const targetHeight of [0,.9])for(const mounted of [false,true]){
  const s=newRound(),p=s.actors[0],target=s.actors[1];s.phase='battle';s.actors[2].ko=true;
  Object.assign(p,{x:0,z:8,height});Object.assign(target,{x:0,z:0,height:targetHeight,catapultId:mounted?'test-machine':null});setProjectileWorld(s,{ground:()=>0,actorYaw:()=>0});
  const muzzle=projectileOrigin(s,p),{camera}=cameraFor(p),ray=rayAt(camera,projectileOrigin(s,target));
  const hit=traceWorldRay(s,ray.rayOrigin,ray.rayDirection,80,{ignoreId:p.id});assert.equal(hit?.targetId,target.id);
  const result=resolveOverviewAim({...ray,muzzle,planeHeight:.45,range:21.6,hits:[hit]});
  assert.equal(result.source,'actor');assert.equal(result.targetId,target.id);assert.ok(Number.isFinite(result.direction.y));
  near(result.target.y,hit.y);applyAim(p,result);
  const preview=traceAim(s,p);assert.equal(preview.targetId,target.id,'camera-selected body lies on the physical projectile sweep');near(preview.origin.y,.45+height);
 }
});

test('overview does not select a hidden, unreachable or merely nearby actor',()=>{
 const input={rayOrigin:{x:0,y:10,z:10},rayDirection:{x:0,y:-1,z:-1},muzzle:{x:0,y:.45,z:0},planeHeight:.45,range:21.6};
 const actor={kind:'actor',targetId:'rival',x:0,y:2,z:2},wall={kind:'wall',x:0,y:5,z:5};
 const blocked=resolveOverviewAim({...input,hits:[actor,wall]});assert.equal(blocked.source,'plane');assert.equal(blocked.targetId,null);
 const far=resolveOverviewAim({...input,range:1,hits:[actor]});assert.equal(far.source,'plane');assert.equal(far.targetId,null);assert.ok(far.distance>0&&far.distance<=1);
 const empty=resolveOverviewAim({...input,hits:[]});assert.equal(empty.source,'plane');assert.equal(empty.targetId,null);
});

test('wide view edges and near-origin rays remain finite without losing left/right direction',()=>{
 const {camera}=cameraFor(undefined,{aspect:2.2,fov:80,zoom:.7}),caster=new Raycaster();
 for(const [x,y] of [[-1,-1],[-1,1],[1,-1],[1,1]]){
  caster.setFromCamera(new Vector2(x,y),camera);
  const result=resolveOverviewAim({rayOrigin:caster.ray.origin,rayDirection:caster.ray.direction,muzzle:{x:0,y:.45,z:0},planeHeight:.45,range:21.6});
  assert.equal(Math.sign(result.direction.x),Math.sign(x));assert.ok([...Object.values(result.target),...Object.values(result.direction),result.distance].every(Number.isFinite));near(Math.hypot(result.direction.x,result.direction.z),1);
 }
 const vertical=resolveOverviewAim({rayOrigin:{x:0,y:10,z:0},rayDirection:{x:0,y:-1,z:0},muzzle:{x:0,y:.45,z:0},planeHeight:.45,range:21.6,fallback:{x:1,z:0}});
 assert.deepEqual(vertical.direction,{x:1,z:0});
});

test('client pixels map to the aim canvas exactly across offsets and CSS scaling without edge clamping',()=>{
 assert.deepEqual(pointerPixels({x:413.25,y:287.5},{left:0,top:0,width:1280,height:800},1280,800),{x:413.25,y:287.5});
 assert.deepEqual(pointerPixels({x:210,y:170},{left:10,top:20,width:400,height:300},800,600),{x:400,y:300});
 assert.deepEqual(pointerPixels({x:9,y:19},{left:10,top:20,width:400,height:300},800,600),{x:-2,y:-2});
 assert.equal(pointerPixels({x:NaN,y:0},{left:0,top:0,width:400,height:300},400,300),null);
});

test('empty overview cursor sweeps change horizontal bearing continuously and never acquire nearby targets',()=>{
 const {camera}=cameraFor({x:0,z:6}),muzzle={x:0,y:.45,z:6};let previous=null;
 for(let x=-4;x<=4;x+=.025){const target={x,y:.45,z:-2},result=resolveOverviewAim({...rayAt(camera,target),muzzle,planeHeight:.45,range:21.6,hits:[]});
  assert.equal(result.source,'plane');assert.equal(result.targetId,null);near(result.direction.x,x/Math.hypot(x,-8));near(result.direction.z,-8/Math.hypot(x,-8));
  if(previous)assert.ok(result.direction.x*previous.x+result.direction.z*previous.z>.99999,'small cursor moves cannot jump to a new bearing');previous=result.direction;
 }
});

test('an exact guard-body ray preserves its 3D contact while earlier cover prevents selection',()=>{
 const input={rayOrigin:{x:0,y:10,z:10},rayDirection:{x:0,y:-1,z:-1},muzzle:{x:0,y:.45,z:6},planeHeight:.45,range:21.6};
 const guard={kind:'guard',targetId:'guard-rival-1',x:0,y:.31,z:.31},wall={kind:'wall',x:0,y:5,z:5};
 const selected=resolveOverviewAim({...input,hits:[guard]});assert.equal(selected.source,'guard');assert.equal(selected.targetId,guard.targetId);near(selected.target.y,guard.y);
 const blocked=resolveOverviewAim({...input,hits:[guard,wall]});assert.equal(blocked.source,'plane');assert.equal(blocked.targetId,null);
});
