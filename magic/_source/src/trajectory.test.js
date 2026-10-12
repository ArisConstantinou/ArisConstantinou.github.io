import test from 'node:test';
import assert from 'node:assert/strict';
import * as CANNON from 'cannon-es';
import fs from 'node:fs';
import vm from 'node:vm';
import {impactDamage,propSelfDamage,knockbackXZ} from './impact-rules.js';
import {ThrowTrajectory,TRAJECTORY_DT,captureTrajectoryWorld,TrajectorySnapshotWorld} from './trajectory.js';

function scene(restitution=.15){
  const world=new CANNON.World({gravity:new CANNON.Vec3(0,-20,0),allowSleep:true});
  world.broadphase=new CANNON.SAPBroadphase(world);world.solver.iterations=8;
  const material=new CANNON.Material('solid');
  world.addContactMaterial(new CANNON.ContactMaterial(material,material,{friction:.55,restitution}));
  const floor=new CANNON.Body({mass:0,material,shape:new CANNON.Box(new CANNON.Vec3(20,.3,20)),position:new CANNON.Vec3(0,-.3,0)});
  floor.previewFloor=true;
  const shot=new CANNON.Body({mass:3,material,shape:new CANNON.Box(new CANNON.Vec3(.35,.4,.35)),position:new CANNON.Vec3(0,2.1,0),linearDamping:.15,angularDamping:.35});
  world.addBody(floor);world.addBody(shot);return {world,material,shot};
}
const velocity={x:16,y:2.96,z:0};
test('preview includes a real wall collision after the projectile first touches the floor',()=>{
 const {world,material,shot}=scene();shot.position.y=.8;
 const wall=new CANNON.Body({mass:0,material,shape:new CANNON.Box(new CANNON.Vec3(.4,3,5)),position:new CANNON.Vec3(5,3,0)});world.addBody(wall);
 const v={x:16,y:-1,z:0},result=new ThrowTrajectory(world).predict(shot,v);
 const floor=result.impacts.find(h=>h.ground),hit=result.impacts.find(h=>h.bodyId===wall.id);
 assert.ok(floor&&hit&&hit.time>floor.time,'floor contact must not hide the later wall impact');
 samePath(result.points,actualPath(world,shot,result.points.length,v));
});
function actualPath(world,shot,count,v=velocity){
  const speed=Math.hypot(v.x,v.z)||1;
  shot.collisionFilterMask=-1;
  shot.velocity.set(v.x,v.y,v.z);shot.angularVelocity.set(-v.z/speed*4,2,v.x/speed*4);
  const points=[shot.position.clone()];
  for(let i=1;i<count;i++){world.step(TRAJECTORY_DT);points.push(shot.position.clone());}
  return points;
}
function samePath(predicted,actual){
  assert.equal(predicted.length,actual.length);
  predicted.forEach((p,i)=>assert.ok(Math.hypot(p.x-actual[i].x,p.y-actual[i].y,p.z-actual[i].z)<1e-6,`different physics at step ${i}`));
}

test('wall preview stays inside the wall and matches the real rebound',()=>{
  const {world,material,shot}=scene();
  const wall=new CANNON.Body({mass:0,material,shape:new CANNON.Box(new CANNON.Vec3(.4,3,5)),position:new CANNON.Vec3(5,3,0)});world.addBody(wall);
  const result=new ThrowTrajectory(world).predict(shot,velocity);
  assert.ok(result.impacts.some(hit=>hit.bodyId===wall.id));
  assert.ok(Math.max(...result.points.map(p=>p.x))<4.7,'line must not pass through the wall');
  const contact=result.impacts.find(hit=>hit.bodyId===wall.id);
  const after=result.points.filter((_,i)=>i*TRAJECTORY_DT>contact.time+.05);
  assert.ok(after.at(-1).x<after[0].x,'existing restitution must show the return path');
  samePath(result.points,actualPath(world,shot,result.points.length));
});

test('zero restitution is observed without inventing an elastic rebound',()=>{
  const {world,material,shot}=scene(0);
  // A spinning box can separate from a wall through corner torque even with
  // restitution zero. Use a sphere to isolate the material's normal response.
  shot.removeShape(shot.shapes[0]);shot.addShape(new CANNON.Sphere(.35));
  const wall=new CANNON.Body({mass:0,material,shape:new CANNON.Box(new CANNON.Vec3(.4,3,5)),position:new CANNON.Vec3(5,3,0)});world.addBody(wall);
  const result=new ThrowTrajectory(world).predict(shot,velocity);
  samePath(result.points,actualPath(world,shot,result.points.length));
  const elastic=scene(1);elastic.shot.removeShape(elastic.shot.shapes[0]);elastic.shot.addShape(new CANNON.Sphere(.35));
  elastic.world.addBody(new CANNON.Body({mass:0,material:elastic.material,shape:new CANNON.Box(new CANNON.Vec3(.4,3,5)),position:new CANNON.Vec3(5,3,0)}));
  const elasticPath=new ThrowTrajectory(elastic.world).predict(elastic.shot,velocity);
  assert.ok(result.points.at(-1).x>elasticPath.points.at(-1).x,'zero restitution must preserve the real inelastic solver response rather than the elastic one');
});

test('an off-centre enemy contact predicts the lateral deflection and momentum transfer',()=>{
  const {world,material,shot}=scene(0);
  const enemy=new CANNON.Body({mass:4,material,shape:new CANNON.Sphere(.6),position:new CANNON.Vec3(4,2,.5),linearDamping:.3});world.addBody(enemy);
  enemy.entity={kind:'guard'};
  const result=new ThrowTrajectory(world).predict(shot,velocity);
  assert.ok(result.impacts.some(hit=>hit.bodyId===enemy.id&&hit.kind==='guard'));
  assert.equal(result.side.bodyId,enemy.id);assert.ok(result.side.points.length>2);
  assert.ok(Math.abs(result.side.points.at(-1).z-result.side.points[0].z)>.05);
  samePath(result.points,actualPath(world,shot,result.points.length));
  assert.ok(Math.abs(result.points.at(-1).z)>.05,'contact must change the side direction');
  assert.ok(Math.abs(enemy.velocity.z)>0,'the actual target receives momentum');
});

test('prediction preserves live bodies, compound shapes, orientations and contact state',()=>{
  const {world,shot}=scene();
  shot.addShape(new CANNON.Sphere(.2),new CANNON.Vec3(0,.7,0));shot.quaternion.setFromEuler(.1,.5,.3);
  shot.velocity.set(1,2,3);shot.angularVelocity.set(2,3,4);
  const original={position:shot.position.clone(),quaternion:shot.quaternion.clone(),velocity:shot.velocity.clone(),angular:shot.angularVelocity.clone(),time:world.time,owners:shot.shapes.map(s=>s.body)};
  const predictor=new ThrowTrajectory(world),first=predictor.predict(shot,velocity),second=predictor.predict(shot,velocity);
  assert.deepEqual(first.points,second.points);
  assert.deepEqual(shot.position,original.position);assert.deepEqual(shot.quaternion,original.quaternion);
  assert.deepEqual(shot.velocity,original.velocity);assert.deepEqual(shot.angularVelocity,original.angular);
  assert.equal(world.time,original.time);shot.shapes.forEach((s,i)=>assert.equal(s.body,original.owners[i]));
  samePath(first.points,actualPath(world,shot,first.points.length));
});

test('removed bodies are discarded from the reusable prediction world',()=>{
  const {world,shot,material}=scene(),predictor=new ThrowTrajectory(world);
  for(let i=0;i<10;i++){
    const prop=new CANNON.Body({mass:1,material,shape:new CANNON.Sphere(.2),position:new CANNON.Vec3(0,4,4)});world.addBody(prop);
    predictor.predict(shot,velocity);world.removeBody(prop);predictor.predict(shot,velocity);
    assert.equal(predictor.bodies.size,world.bodies.length);assert.equal(predictor.world.bodies.length,world.bodies.length);
  }
});

test('worker snapshot preserves the real shapes, materials and collision prediction',()=>{
  const {world,shot,material}=scene();
  const wall=new CANNON.Body({mass:0,material,shape:new CANNON.Box(new CANNON.Vec3(.4,3,5)),position:new CANNON.Vec3(5,3,0)});world.addBody(wall);
  const direct=new ThrowTrajectory(world).predict(shot,velocity);
  const snapshot=JSON.parse(JSON.stringify(captureTrajectoryWorld(world))),remote=new TrajectorySnapshotWorld(snapshot);remote.apply(snapshot);
  const worker=new ThrowTrajectory(remote.world).predict(remote.bodies.get(shot.id),velocity);
  samePath(worker.points,direct.points);
  assert.deepEqual(worker.impacts,direct.impacts);assert.deepEqual(worker.landing,direct.landing);
});

test('preview restores the release collision mask without changing the live held mask',()=>{
  const {world,shot,material}=scene();shot.collisionFilterMask=14;
  const player=new CANNON.Body({mass:0,material,shape:new CANNON.Sphere(.6),position:new CANNON.Vec3(3,2,0)});player.collisionFilterGroup=1;player.entity={kind:'mage'};world.addBody(player);
  const result=new ThrowTrajectory(world).predict(shot,velocity);
  assert.equal(shot.collisionFilterMask,14);
  assert.ok(result.impacts.some(hit=>hit.bodyId===player.id));
  samePath(result.points,actualPath(world,shot,result.points.length));
});

test('a fragile conjured stone ends at destruction instead of showing a false rebound',()=>{
  const {world,shot,material}=scene();shot.entity={category:'prop',kind:'stone',ephemeral:true,hp:105};
  world.addBody(new CANNON.Body({mass:0,material,shape:new CANNON.Box(new CANNON.Vec3(.4,3,5)),position:new CANNON.Vec3(5,3,0)}));
  const predictor=new ThrowTrajectory(world),first=predictor.predict(shot,velocity),second=predictor.predict(shot,velocity);
  assert.equal(first.broken,true);assert.ok(first.points.length<60);assert.deepEqual(first.points,second.points);
  assert.equal(shot.entity.hp,105);assert.ok(world.bodies.includes(shot));
});

test('a held enemy regains the real rotational response only in the prediction world',()=>{
  const {world,shot,material}=scene(0);shot.entity={category:'actor',kind:'guard',hp:1000};
  shot.fixedRotation=true;shot.updateMassProperties();
  world.addBody(new CANNON.Body({mass:0,material,shape:new CANNON.Box(new CANNON.Vec3(.4,3,5)),position:new CANNON.Vec3(5,3,0)}));
  const predicted=new ThrowTrajectory(world).predict(shot,velocity);
  assert.equal(shot.fixedRotation,true);
  shot.fixedRotation=false;shot.updateMassProperties();shot.updateInertiaWorld(true);
  samePath(predicted.points,actualPath(world,shot,predicted.points.length));
});

test('enemy side prediction matches the actual game impact and hurt callbacks',()=>{
 for(const touching of [false,true]){
  const {world,shot,material}=scene(0);
  shot.entity={category:'prop',kind:'crate',mass:shot.mass,body:shot,hp:70,ephemeral:false,thrownBy:'player',thrownUntil:4,collisionTimes:new Map()};
  const enemy=new CANNON.Body({mass:4,material,shape:new CANNON.Sphere(.6),position:new CANNON.Vec3(touching?.6:4,2,.5),linearDamping:.3});
  enemy.entity={category:'actor',kind:'guard',mass:4,body:enemy,hp:65,dead:false,stun:0};world.addBody(enemy);
  if(touching)world.step(TRAJECTORY_DT);
  const predicted=new ThrowTrajectory(world).predict(shot,velocity);
  const snapshot=JSON.parse(JSON.stringify(captureTrajectoryWorld(world,shot))),remote=new TrajectorySnapshotWorld(snapshot);remote.apply(snapshot);
  const worker=new ThrowTrajectory(remote.world).predict(remote.bodies.get(shot.id),velocity);
  samePath(worker.points,predicted.points);samePath(worker.side.points,predicted.side.points);
  const main=fs.readFileSync(new URL('./main.js',import.meta.url),'utf8'),noop=()=>{};
  const context={phase:'playing',FIRE_ENABLED:false,hearth:{mounted:false,throw:()=>true},held:null,runTime:0,player:{gear:{damage:0}},save:{profile:{upgrades:{}}},impactDamage,propSelfDamage,knockbackXZ,
    fx:{burst:noop,number:noop,connect:noop},sound:{sound:noop},shake:0,clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),
    physics:world,heldLight:{intensity:0},castTime:0,drag:null,
    distance:(a,b)=>Math.hypot(a.x-b.x,a.z-b.z),spawnPickup:noop,spawnLoot:noop,kills:0,combo:0,comboUntil:0,ui:{toast:noop},mobile:false};
  vm.createContext(context);vm.runInContext(main.slice(main.indexOf('function impact('),main.indexOf('function spawnPickup(')),context);
  let touched=false;shot.addEventListener('collide',event=>{context.impact(shot.entity,event);if(event.body===enemy)touched=true;});
  vm.runInContext(main.slice(main.indexOf('function releaseHeld('),main.indexOf('function updateHeld(')),context);
  context.held=shot.entity;context.throwHeld(velocity);
  const primary=[shot.position.clone()],side=[];
  for(let i=1;i<=180&&(primary.length<predicted.points.length||side.length<predicted.side.points.length);i++){
    context.runTime=world.time;world.step(TRAJECTORY_DT);
    if(world.contacts.some(c=>c.bi===shot&&c.bj===enemy||c.bi===enemy&&c.bj===shot))touched=true;
    if(primary.length<predicted.points.length)primary.push(shot.position.clone());
    if(touched&&side.length<predicted.side.points.length)side.push(enemy.position.clone());
  }
  samePath(predicted.points,primary);samePath(predicted.side.points,side);
  if(!touching)assert.ok(enemy.entity.hp<65);
 }
});
