import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld} from '../src/world.js';
import {createCreature} from '../src/creatures.js';
import {PREDATORS} from '../src/rules.js';
import {refugeAt,refugeCanEnter,refugeOccupant,refugeEntrancePoint,refugeInteriorPoint,refugeWorld,refugeLocal,refugeWaypoint,resolveRefugeMovement,updateRefugeSnake,clearRefugePosition,refugeLineClear} from '../src/refuge.js';

const context={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
function setup(t){
  const previous=globalThis.document;globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>context})};
  let world;try{world=createWorld(new THREE.Scene(),{},{natural:true,seed:731});}finally{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;}
  world.setCreekState({nest:{...world.creekNest,level:0,safe:true}});world.group.updateMatrixWorld(true);t.after(()=>world.dispose());
  const refuge=world.creekRefuges.find(r=>r.id==='living-creek-nest'),solids=[];
  refuge.mesh.userData.refugeSolids.traverse(mesh=>{
    if(!mesh.userData.refugeSolid)return;
    const planes=[],geometry=mesh.geometry,p=geometry.attributes.position,a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
    for(let i=0;i<p.count;i+=3){
      a.fromBufferAttribute(p,i).applyMatrix4(mesh.matrixWorld);b.fromBufferAttribute(p,i+1).applyMatrix4(mesh.matrixWorld);c.fromBufferAttribute(p,i+2).applyMatrix4(mesh.matrixWorld);
      const plane=new THREE.Plane().setFromCoplanarPoints(a,b,c);
      if(!planes.some(q=>q.normal.distanceTo(plane.normal)<1e-5&&Math.abs(q.constant-plane.constant)<1e-5))planes.push(plane);
    }
    solids.push({id:mesh.userData.refugeSolid.id,planes});
  });
  return {world,refuge,solids};
}
function makeSnake(t,r,scale,point){
  const model=createCreature('snake',{team:'predator',seed:432});model.group.scale.setScalar(scale);t.after(()=>model.dispose());
  return {...point,type:'snake',team:'predator',scale,yaw:r.yaw+Math.PI,model};
}
function poseAndCheck(snake,world,solids,frame,target){
  updateRefugeSnake(world.creekRefuges,snake,{surface:(x,z)=>world.getSurface(x,z),target});
  snake.model.group.position.set(snake.x,snake.y,snake.z);snake.model.group.rotation.y=snake.yaw;
  snake.model.update(.05,{time:frame*.05,speed:4.6,attack:{type:'lunge',phase:(frame%20)/20},snakePose:snake.refugeSnakePose});
  snake.model.group.updateMatrixWorld(true);snake.model.skeleton.update();
  const point=new THREE.Vector3(),parts=[snake.model.mesh,snake.model.group.getObjectByName('articulated-eyes')];
  for(const mesh of parts)for(let i=0;i<mesh.geometry.attributes.position.count;i++){
    mesh.getVertexPosition(i,point).applyMatrix4(mesh.matrixWorld);
    const hit=solids.find(s=>s.planes.every(p=>p.distanceToPoint(point)<-.003));
    assert.equal(hit?.id,undefined,JSON.stringify({frame,scale:snake.scale,solid:hit?.id,vertex:i,point:point.toArray(),actor:{x:snake.x,y:snake.y,z:snake.z},head:snake.refugeSnakePose?.points.at(-1)}));
  }
}

for(const boss of [false,true])test(`${boss?'boss':'normal'} real skinned snake fits the entrance and follows the dogleg without entering stone`,t=>{
  const {world,refuge:r,solids}=setup(t),scale=PREDATORS.snake.scale*(boss?1.85:1),snake=makeSnake(t,r,scale,refugeEntrancePoint(r,6));
  assert.equal(refugeCanEnter(r,snake),true);
  for(const [trip,target] of [refugeInteriorPoint(r),refugeEntrancePoint(r,8)].entries()){
    let arrived=false;
    for(let frame=0;frame<420;frame++){
    const next=refugeWaypoint([r],snake,target),dx=next.x-snake.x,dz=next.z-snake.z,length=Math.hypot(dx,dz);
    if(length>.0001){snake.yaw=Math.atan2(dx,dz);const resolved=resolveRefugeMovement([r],snake,{x:snake.x+dx/length*Math.min(.09,length),z:snake.z+dz/length*Math.min(.09,length)});snake.x=resolved.x;snake.z=resolved.z;snake.y=world.getSurface(snake.x,snake.z).height;}
    poseAndCheck(snake,world,solids,frame+trip*500,target);
    if(Math.hypot(snake.x-target.x,snake.z-target.z)<.1){arrived=true;poseAndCheck(snake,world,solids,frame,target);break;}
    }
    assert.equal(arrived,true);if(!trip){assert.equal(refugeAt([r],snake),r);assert.equal(refugeOccupant([r],snake),r);}else assert.equal(refugeOccupant([r],snake),null,'occupancy clears after the physical tail leaves');
  }
});

test('a restored snake without history forms a legal body in the chamber and passage instead of being expelled',t=>{
  const {world,refuge:r,solids}=setup(t);
  for(const scale of [1.1,2.035])for(const point of [refugeInteriorPoint(r),refugeWorld(r,{x:-1.75,z:2.2,y:r.floorY}),refugeEntrancePoint(r,1)]){
    const snake=makeSnake(t,r,scale,point),clear=clearRefugePosition([r],snake);assert.equal(clear.blocked,false);
    assert.equal(snake.refugeSnakeTrail,undefined);
    poseAndCheck(snake,world,solids,0,{x:snake.x,z:snake.z});
  }
});

test('confined sight follows the actual rig eyes and body occupancy begins before the centre enters',t=>{
  const {world,refuge:r,solids}=setup(t),snake=makeSnake(t,r,1.1,refugeWorld(r,{x:0,z:2.2,y:r.floorY})),target=refugeInteriorPoint(r);
  poseAndCheck(snake,world,solids,0,target);
  const left=snake.model.bones.eyeL.getWorldPosition(new THREE.Vector3()),right=snake.model.bones.eyeR.getWorldPosition(new THREE.Vector3()),eye=left.add(right).multiplyScalar(.5);
  assert.ok(eye.distanceTo(new THREE.Vector3(snake.refugeSnakePose.head.x,snake.refugeSnakePose.head.y,snake.refugeSnakePose.head.z))<1e-5);
  assert.equal(refugeLineClear([r],{x:snake.x,y:snake.y,z:snake.z},target),false,'the centre is behind the root baffle');
  assert.equal(refugeLineClear([r],snake,target),refugeLineClear([r],eye,target,{fromHeight:0}), 'visibility matches actual posed eyes');
  assert.equal(refugeLineClear([r],snake,target),true,'the head can look around a root before the body centre follows');
  const approach=makeSnake(t,r,2.035,refugeEntrancePoint(r,2.5));poseAndCheck(approach,world,solids,0,target);
  const centreOnly={type:'snake',scale:approach.scale,x:approach.x,y:approach.y,z:approach.z};
  assert.equal(refugeOccupant([r],centreOnly),null);assert.equal(refugeOccupant([r],approach),r,'the visible front body has entered even though its centre is still outside');
});

test('snakes away from natural refuges retain the original animated geometry',t=>{
  const {world}=setup(t),model=createCreature('snake',{seed:432}),plain=createCreature('snake',{seed:432});t.after(()=>{model.dispose();plain.dispose();});
  const snake={type:'snake',x:180,y:1,z:180,yaw:.2,scale:1.1};
  assert.equal(updateRefugeSnake(world.creekRefuges,snake,{target:{x:190,z:180}}),null);
  model.update(.1,{time:4,speed:3,snakePose:snake.refugeSnakePose});plain.update(.1,{time:4,speed:3});
  for(const name of ['head','coil1','coil7','coil20']){assert.deepEqual(model.bones[name].position.toArray(),plain.bones[name].position.toArray());assert.deepEqual(model.bones[name].quaternion.toArray(),plain.bones[name].quaternion.toArray());}
});
