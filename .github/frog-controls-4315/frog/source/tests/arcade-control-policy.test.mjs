import test from 'node:test';
import assert from 'node:assert/strict';
import {movementForView,keyboardMovement,localHopDirection,hopDirection,shouldFaceView,solveDirectionalLimb} from '../src/arcade-control-policy.js';
const close=(a,b,label='')=>assert.ok(Math.abs(a-b)<1e-8,`${label}: ${a} !== ${b}`);
const vector=(a,b)=>{close(a.x,b.x,'x');close(a.z,b.z,'z');};
const directions=[['KeyW',0,-1],['KeyA',-1,0],['KeyS',0,1],['KeyD',1,0]];
for(const [key,x,z] of directions)test(`overview ${key} stays screen-relative after any orbit or view change`,()=>{
 for(const yaw of [-Math.PI,-2,-1,0,1,2,Math.PI,NaN,Infinity])for(const previous of ['overview','chase3d']){
  keyboardMovement(new Set([key]),{x:0,z:0},previous,yaw);
  vector(keyboardMovement(new Set([key]),{x:0,z:0},'overview',yaw),{x,z});
 }
});
test('third-person keys retain left/right and forward/back axes through 360 degrees',()=>{
 for(let i=0;i<128;i++){
  const yaw=i*Math.PI/64,forward={x:Math.sin(yaw),z:Math.cos(yaw)},right={x:-forward.z,z:forward.x};
  for(const [key,x,y] of directions){const move=keyboardMovement(new Set([key]),{},'chase3d',yaw);close(move.x*right.x+move.z*right.z,x);close(move.x*forward.x+move.z*forward.z,-y);}
 }
});
test('arrow aliases, duplicate aliases and opposite keys do not invert or double motion',()=>{
 for(const [letter,arrow] of [['KeyW','ArrowUp'],['KeyA','ArrowLeft'],['KeyS','ArrowDown'],['KeyD','ArrowRight']]){
  const expected=keyboardMovement(new Set([letter]),{},'overview',0);
  vector(keyboardMovement(new Set([arrow]),{},'overview',0),expected);
  vector(keyboardMovement(new Set([letter,arrow]),{},'overview',0),expected);
 }
 vector(keyboardMovement(new Set(['KeyW','KeyS','KeyA','KeyD']),{},'overview',0),{x:0,z:0});
});
test('diagonal and analogue input preserve magnitude and handedness',()=>{
 for(const yaw of [0,.7,Math.PI,-2]){
  const analog=movementForView(.17,-.29,'chase3d',yaw);close(Math.hypot(analog.x,analog.z),Math.hypot(.17,.29));
  close(Math.hypot(...Object.values(keyboardMovement(new Set(['KeyW','KeyD']),{},'chase3d',yaw))),Math.SQRT2);
 }
 vector(keyboardMovement(new Set(['KeyD']),{x:1,z:0},'overview',0),{x:1,z:0});
});
test('invalid input cannot poison movement and clearing keys immediately stops input',()=>{
 vector(movementForView(NaN,Infinity,'overview'),{x:0,z:0});
 const keys=new Set(['KeyD']);keys.clear();vector(keyboardMovement(keys,{x:NaN,z:Infinity},'chase3d',NaN),{x:0,z:0});
 for(const yaw of [undefined,NaN,Infinity])assert.ok(Object.values(movementForView(1,1,'chase3d',yaw)).every(Number.isFinite));
});
test('third-person body follows the aiming view without a held fire button',()=>{
 assert.equal(shouldFaceView('chase3d'),true);
 assert.equal(shouldFaceView('chase3d',{pointerAiming:false,touchAiming:false,locked:false}),true);
 assert.equal(shouldFaceView('chase3d',{mounted:true,locked:true}),false);
});
test('overview keeps deliberate aim and last-shot stance rather than movement heading',()=>{
 assert.equal(shouldFaceView('overview',{pointerAiming:true}),true);
 assert.equal(shouldFaceView('overview',{touchAiming:true}),true);
 assert.equal(shouldFaceView('overview',{locked:true}),true);
 assert.equal(shouldFaceView('overview'),false);
});
test('hop direction is measured against rendered body independently of camera and last shot',()=>{
 for(let i=0;i<64;i++){
  const yaw=i*Math.PI/32,c=Math.cos(yaw),s=Math.sin(yaw);
  for(const [vx,vz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1]]){
   const local=localHopDirection(vx,vz,yaw),n=Math.hypot(vx,vz);close(c*local.x+s*local.z,vx/n);close(-s*local.x+c*local.z,vz/n);
  }
 }
});
test('forward backward left and right hops produce distinct limb strokes',()=>{
 vector(localHopDirection(0,1,0),{x:0,z:1});vector(localHopDirection(0,-1,0),{x:0,z:-1});
 vector(localHopDirection(1,0,0),{x:1,z:0});vector(localHopDirection(-1,0,0),{x:-1,z:0});
 const back=localHopDirection(0,-1,0),side=localHopDirection(1,0,0),stroke=-.42;
 assert.ok(stroke*back.z>0);close(stroke*side.z,0);assert.ok(stroke*side.x<0);
});
test('non-arcade rigs retain the legacy forward hop and stopped arcade hops do not thrust sideways',()=>{
 vector(hopDirection(undefined),{x:0,z:1});vector(hopDirection(localHopDirection(0,0,1.8)),{x:0,z:0});
 vector(hopDirection({x:NaN,z:Infinity}),{x:0,z:0});close(Math.hypot(...Object.values(hopDirection({x:5,z:5}))),1);
});
const multiply=(a,b)=>[a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]];
const rotate=(q,v)=>multiply(multiply(q,[v.x,v.y,v.z,0]),[-q[0],-q[1],-q[2],q[3]]).slice(0,3);
const limbs=[
 [{x:.18,y:-.20,z:.38},{x:.08,y:-.17,z:-.32}],
 [{x:-.18,y:-.20,z:.38},{x:-.08,y:-.17,z:-.32}],
 [{x:.1,y:-.15,z:.12},{x:.04,y:-.17,z:.25}],
 [{x:-.1,y:-.15,z:.12},{x:-.04,y:-.17,z:.25}],
];
test('directional IK reaches reachable foot targets without changing bone lengths',()=>{
 let reachable=0,clamped=0;
 for(const [first,second] of limbs)for(const x of [-.25,-.1,.1,.25])for(const y of [-.05,0,.05])for(const z of [-.12,0,.12]){
  const result=solveDirectionalLimb(first,second,{x,y,z});for(const q of Object.values(result))close(Math.hypot(...q),1);
  const a=rotate(result.root,first),b=rotate(multiply(result.root,result.middle),second),endpoint=a.map((v,i)=>v+b[i]);
  const desired=[first.x+second.x+x,first.y+second.y+y,first.z+second.z+z];
  const wantedLength=Math.hypot(...desired),actualLength=Math.hypot(...endpoint),l1=Math.hypot(first.y,first.z),l2=Math.hypot(second.y,second.z),fixedX=first.x+second.x;
  const min=Math.hypot(fixedX,Math.abs(l1-l2)+1e-5),max=Math.hypot(fixedX,l1+l2-1e-5),expectedLength=Math.max(min,Math.min(max,wantedLength));
  close(actualLength,expectedLength);endpoint.forEach((v,i)=>close(v,desired[i]/wantedLength*expectedLength));
  close(Math.hypot(...a),Math.hypot(first.x,first.y,first.z));close(Math.hypot(...b),Math.hypot(second.x,second.y,second.z));
  if(Math.abs(wantedLength-expectedLength)<1e-8)reachable++;else clamped++;
 }
 assert.ok(reachable>0&&clamped>0);
});
test('directional ankles and wrists stay planted instead of inheriting leg roll',()=>{
 for(const [first,second] of limbs)for(const x of [-.25,.25]){
  const q=solveDirectionalLimb(first,second,{x,y:.04,z:-.1}),combined=multiply(multiply(q.root,q.middle),q.end);
  close(combined[0],0);close(combined[1],0);close(combined[2],0);close(Math.abs(combined[3]),1);
 }
});
test('degenerate and unreachable IK targets produce finite stable rotations',()=>{
 for(const offsets of [{x:0,y:0,z:0},{x:NaN,y:Infinity,z:0},{x:3,y:2,z:-4}]){
  const result=solveDirectionalLimb({x:0,y:0,z:0},{x:0,y:0,z:0},offsets);for(const q of Object.values(result))assert.ok(q.every(Number.isFinite));
 }
});
