import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Raycaster,Vector2,Vector3} from 'three';
import {cameraPose} from '../src/arcade-view-math.js';
import {resolveMouseAim} from '../src/arcade-mouse-aim.js';

const near=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} should be ${expected}`);
const vectorNear=(actual,expected,tolerance=1e-8)=>{for(const axis of ['x','y','z'])near(actual[axis],expected[axis],tolerance);};
const asVector=p=>new Vector3(p.x,p.y,p.z);
function fixture({aspect=16/9,fov=52,zoom=1,mode='chase3d',yaw=Math.PI,pitch=.44}={}){
 const actor={x:0,z:0},pose=cameraPose(actor,0,aspect,mode,{yaw,pitch,zoom}),camera=new PerspectiveCamera(fov,aspect,.1,250);
 camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();
 const muzzle={x:0,y:.9,z:0};
 const ray=(x,y)=>{const caster=new Raycaster();caster.setFromCamera(new Vector2(x,y),camera);return {rayOrigin:caster.ray.origin,rayDirection:caster.ray.direction,muzzle,range:20.8};};
 return {camera,muzzle,ray};
}

test('free perspective cursor sets both shot yaw and pitch without modifying the camera',()=>{
 const {camera,ray}=fixture(),before=camera.matrixWorld.toArray();
 const upper=resolveMouseAim(ray(0,.9)),lower=resolveMouseAim(ray(0,-.9)),left=resolveMouseAim(ray(-.65,.6)),right=resolveMouseAim(ray(.65,.6));
 assert.ok(upper.direction.y>.05,'upper cursor aims above the muzzle');
 assert.ok(lower.direction.y<-.6,'lower cursor aims down');
 assert.ok(left.direction.x<-.3&&right.direction.x>.3,'left/right cursor retains full horizontal control');
 assert.ok(upper.target.y>3&&lower.target.y<0,'cursor is not constrained to a horizontal aim plane');
 assert.deepEqual(camera.matrixWorld.toArray(),before,'aiming never rotates or moves the camera');
});

test('reachable empty-space targets reproject to the exact cursor at every lens setting',()=>{
 let checked=0;
 for(const aspect of [430/745,745/430,16/9])for(const fov of [40,52,80])for(const zoom of [.7,1,1.5]){
  const {camera,ray}=fixture({aspect,fov,zoom});
  for(const [x,y] of [[0,0],[-.45,.5],[.45,-.5],[0,.95]]){
   const input=ray(x,y),offset=asVector(input.rayOrigin).sub(asVector(input.muzzle));
   const b=offset.dot(input.rayDirection),discriminant=b*b-offset.lengthSq()+input.range**2;
   if(discriminant<0||-b+Math.sqrt(discriminant)<=0)continue;
   const resolved=resolveMouseAim(input),projected=asVector(resolved.target).project(camera);
   near(projected.x,x);near(projected.y,y);near(resolved.distance,input.range);
   near(Math.hypot(...Object.values(resolved.direction)),1);checked++;
  }
 }
 assert.ok(checked>80,'exercise actual perspective rays, not a single fixed camera');
});

test('surface hit depth corrects near-muzzle parallax and follows the same ray as the shot',()=>{
 const {camera,muzzle,ray}=fixture(),target={x:1.15,y:.12,z:-1.8};
 const cursor=asVector(target).project(camera),input=ray(cursor.x,cursor.y);
 const result=resolveMouseAim({...input,hits:[{point:target}]});
 vectorNear(result.target,target);assert.equal(result.source,'hit');
 const distance=asVector(target).distanceTo(asVector(muzzle));near(result.distance,distance);
 vectorNear(asVector(muzzle).addScaledVector(asVector(result.direction),distance),target);
 assert.ok(Math.abs(result.direction.y-input.rayDirection.y)>.05,'muzzle ray compensates for camera parallax');
 const muzzleOffset=asVector(muzzle).addScaledVector(asVector(result.direction),1.2);
 vectorNear(muzzleOffset.addScaledVector(asVector(result.direction),distance-1.2),target);
});

test('bottom-screen ground behind the body remains selectable without a 180-degree screen fallback',()=>{
 const {camera,ray}=fixture(),target={x:.45,y:0,z:2.5},cursor=asVector(target).project(camera);
 assert.ok(cursor.y<0,'ground target is in the lower view');
 const result=resolveMouseAim({...ray(cursor.x,cursor.y),hits:[{...target,kind:'ground'}]});
 vectorNear(result.target,target);assert.ok(result.direction.z>0&&result.direction.y<0);
 const projected=asVector(result.target).project(camera);near(projected.x,cursor.x);near(projected.y,cursor.y);
});

test('eligible hits choose the nearest ray intersection and ignore invalid or coincident points',()=>{
 const muzzle={x:0,y:1,z:0},rayOrigin={x:0,y:1,z:10},rayDirection={x:0,y:0,z:-1};
 const result=resolveMouseAim({muzzle,rayOrigin,rayDirection,range:20,hits:[
  {x:0,y:1,z:-10,kind:'actor'},
  {point:{x:NaN,y:1,z:3}},
  {x:0,y:1,z:12},
  {...muzzle},
  {x:0,y:1,z:-3,kind:'wall'},
 ]});
 vectorNear(result.target,{x:0,y:1,z:-3});near(result.distance,3);assert.equal(result.source,'hit');
});

test('unreachable hits use the same finite range target as empty space',()=>{
 const target={x:4,y:6,z:-40},muzzle={x:0,y:1,z:0},rayOrigin={x:0,y:5,z:12};
 const input={muzzle,rayOrigin,rayDirection:asVector(target).sub(asVector(rayOrigin)),range:20};
 assert.deepEqual(resolveMouseAim({...input,hits:[target]}),resolveMouseAim(input));
 assert.equal(resolveMouseAim({...input,hits:[target]}).source,'range');
});

test('terrain entering the far camera trace cannot jump the shot direction outside muzzle range',()=>{
 for(const fov of [52,80]){
  const {camera,muzzle,ray}=fixture({mode:'overview',fov}),range=20.8,traceRange=camera.position.distanceTo(asVector(muzzle))+range;
  const sample=y=>{
   const input=ray(0,y),t=-input.rayOrigin.y/input.rayDirection.y;
   const hit=t>0&&t<=traceRange?asVector(input.rayOrigin).addScaledVector(input.rayDirection,t):null;
   return {input,hit};
  };
  let inside=-1,outside=1;
  assert.ok(sample(inside).hit);assert.equal(sample(outside).hit,null);
  for(let i=0;i<45;i++){const mid=(inside+outside)*.5;if(sample(mid).hit)inside=mid;else outside=mid;}
  const a=sample(inside-1e-6),b=sample(outside+1e-6);
  assert.ok(a.hit.distanceTo(asVector(muzzle))>range,'entry is outside projectile reach');assert.equal(b.hit,null);
  const resolvedA=resolveMouseAim({...a.input,hits:[a.hit]}),resolvedB=resolveMouseAim(b.input);
  assert.ok(asVector(resolvedA.direction).angleTo(asVector(resolvedB.direction))<1e-4,'formerly seven-degree transition stays continuous');
  assert.ok(asVector(resolvedA.target).distanceTo(asVector(resolvedB.target))<.001);
 }
});

test('horizon, vertical and degenerate inputs always produce finite normalized aim',()=>{
 for(const rayDirection of [{x:0,y:0,z:-1},{x:0,y:1,z:0},{x:0,y:-1,z:0},{x:0,y:1e-14,z:-1},{x:0,y:0,z:0},{x:NaN,y:1,z:0}]){
  const input={rayOrigin:{x:0,y:8,z:12},rayDirection,muzzle:{x:0,y:.9,z:0},range:20.8};
  const snapshot=structuredClone(input),result=resolveMouseAim(input);
  assert.ok([...Object.values(result.target),...Object.values(result.direction),result.distance].every(Number.isFinite));
  near(Math.hypot(...Object.values(result.direction)),1);assert.ok(result.distance>0&&result.distance<=20.8);
  assert.deepEqual(input,snapshot,'pure helper never edits caller vectors');
 }
});

test('unreachable wide-angle rays stay continuous as they pass the range-sphere tangent',()=>{
 const muzzle={x:0,y:0,z:0},rayOrigin={x:0,y:0,z:30},range=20,angle=Math.asin(range/30),results=[];
 for(const offset of [-1e-8,0,1e-8]){
  const a=angle+offset,rayDirection={x:Math.sin(a),y:0,z:-Math.cos(a)};
  const result=resolveMouseAim({muzzle,rayOrigin,rayDirection,range});results.push(result);
  near(result.distance,range);assert.ok(result.direction.x>.7&&result.direction.z>.5);
 }
 for(let i=1;i<results.length;i++)assert.ok(asVector(results[i].target).distanceTo(asVector(results[i-1].target))<.01,'range boundary cannot abruptly snap aim');
});

test('overview and high field-of-view screen edges yield finite usable aim within range',()=>{
 for(const mode of ['chase3d','overview'])for(const zoom of [.7,1.5]){
  const {ray}=fixture({mode,zoom,aspect:2.2,fov:80});
  for(const [x,y] of [[-1,-1],[-1,1],[1,-1],[1,1]]){
   const result=resolveMouseAim(ray(x,y));
   assert.ok(Object.values(result.target).every(Number.isFinite));near(Math.hypot(...Object.values(result.direction)),1);near(result.distance,20.8);
   assert.ok(Math.sign(result.direction.x)===Math.sign(x),'screen edges retain left/right meaning even outside projectile range');
  }
 }
});
