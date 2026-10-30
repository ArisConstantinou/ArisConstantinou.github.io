import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {Group,Bone,Vector3,Quaternion,Matrix4} from 'three';
import {createLimbChain,solveLimbChain,applyLeapPose} from '../src/arcade-leap-pose.js';
import {applyFlightAttitude} from '../src/arcade-wall-controls.js';
import {createLimbChain as legacyChain,solveLimbChain as legacySolve,applyLeapPose as legacyLeap,applyFlightAttitude as legacyFlight} from './fixtures/legacy-identity-ik.mjs';
const heavy=JSON.parse(fs.readFileSync(new URL('./fixtures/heavy-bind-rest.json',import.meta.url),'utf8')).rest;
const legacy=JSON.parse(fs.readFileSync(new URL('./fixtures/legacy-bind-rest.json',import.meta.url),'utf8')).bones;
const limbs=[[-1,'hind'],[1,'hind'],[-1,'fore'],[1,'fore']],names=(side,kind)=>kind==='hind'?['hip'+side,'knee'+side,'ankle'+side,'foot'+side]:['shoulder'+side,'elbow'+side,'wrist'+side];
function model(bind=true){
 const group=new Group(),bones={},defs=bind?heavy:legacy,map=new Map(defs.map(d=>[d.name,d]));
 for(const d of defs){const b=new Bone();b.name=d.name;b.position.fromArray(d.position);if(bind){b.quaternion.fromArray(d.quaternion).normalize();b.scale.fromArray(d.scale);}bones[d.name]=b;}
 for(const d of defs)if(d.parent){if(!bind)bones[d.name].position.sub(new Vector3().fromArray(map.get(d.parent).position));bones[d.parent].add(bones[d.name]);}else group.add(bones[d.name]);
 const m={group,bones,stats:{imported:true}};if(bind)m.restPose=Object.fromEntries(defs.map(d=>[d.name,{position:[...d.position],quaternion:[...d.quaternion],scale:[...d.scale]}]));group.updateMatrixWorld(true);return m;
}
function apply(m,c){c.root.quaternion.copy(c.rootQ);c.middle.quaternion.copy(c.middleQ);c.end.quaternion.copy(c.endQ);m.group.updateMatrixWorld(true);}
function endpoint(c){return c.root.parent.worldToLocal(c.end.getWorldPosition(new Vector3())).sub(c.root.position);}
const qError=(a,b)=>a.angleTo(b.clone().normalize());let maxEndpoint=0,maxRestAngle=0,minFootDot=1;

test('actual49-joint native fixture contains real nonidentity local bind rotations',()=>{assert.equal(heavy.length,49);assert.ok(heavy.filter(d=>new Quaternion().fromArray(d.quaternion).angleTo(new Quaternion())>1e-5).length>=41);});
test('bind targets reproduce actual root/middle/end orientations and preserve forearm vector frames',()=>{
 for(const [side,kind]of limbs){const m=model(),c=createLimbChain(m,names(side,kind)),target=c.first.clone().add(c.second),pole=c.first.clone();
  assert.ok(endpoint(c).distanceTo(target)<1e-5,'First/second offsets must share the root-parent frame');
  solveLimbChain(c,target,pole,c.third||null);apply(m,c);const error=endpoint(c).distanceTo(target);maxEndpoint=Math.max(maxEndpoint,error);assert.ok(error<1e-5,JSON.stringify({side,kind,error}));
  for(const [joint,key]of [[c.root,'root'],[c.middle,'middle'],[c.end,'end']]){const e=qError(joint.quaternion,c.bind[key]);maxRestAngle=Math.max(maxRestAngle,e);assert.ok(e<1e-5,JSON.stringify({joint:joint.name,e}));}
 }
});
test('bind metadata is used even when the first IK construction follows an animated frame',()=>{
 const m=model();m.bones['hip1'].quaternion.setFromAxisAngle(new Vector3(0,1,0),1.1);m.bones['knee1'].quaternion.setFromAxisAngle(new Vector3(1,0,0),-.8);const saved=JSON.stringify(m.restPose),c=createLimbChain(m,names(1,'hind'));solveLimbChain(c,c.first.clone().add(c.second),c.first,c.third);apply(m,c);
 assert.ok(qError(c.root.quaternion,c.bind.root)<1e-5);assert.ok(qError(c.middle.quaternion,c.bind.middle)<1e-5);assert.equal(JSON.stringify(m.restPose),saved);
});
test('actual heavy limb endpoints and foot axes reach world targets in4headings at3external scales',()=>{
 for(const [sx,sy,sz]of [[1,1,1],[.84,.84,.84],[1.1,.95,1.05]])for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2])for(const [side,kind]of limbs){
  const m=model();m.group.position.set(Math.sin(yaw)*.8,1,Math.cos(yaw)*.8);m.group.rotation.y=yaw;m.group.scale.set(sx,sy,sz);m.group.updateMatrixWorld(true);const c=createLimbChain(m,names(side,kind)),normal=new Vector3(Math.sin(yaw),0,Math.cos(yaw)),right=new Vector3(Math.cos(yaw),0,-Math.sin(yaw));
  const goal=c.root.getWorldPosition(new Vector3()).addScaledVector(normal,-(c.l1+c.l2)*.6*Math.min(sx,sz)).addScaledVector(right,side*.025).add(new Vector3(0,.025,0)),target=c.root.parent.worldToLocal(goal.clone()).sub(c.root.position),inverse=new Matrix4().copy(c.root.parent.matrixWorld).invert(),pole=right.clone().multiplyScalar(side).add(new Vector3(0,.2,0)).transformDirection(inverse),footDirection=normal.clone().negate().transformDirection(inverse);
  solveLimbChain(c,target,pole,c.third?footDirection:null);assert.equal(c.reachClamped,false);apply(m,c);const error=c.end.getWorldPosition(new Vector3()).distanceTo(goal);maxEndpoint=Math.max(maxEndpoint,error);assert.ok(error<1e-5,JSON.stringify({yaw,kind,side,sx,sy,sz,error}));assert.equal(m.group.rotation.y,yaw);
  if(c.tip){const actual=c.tip.getWorldPosition(new Vector3()).sub(c.end.getWorldPosition(new Vector3())).normalize(),dot=actual.dot(normal.clone().negate());minFootDot=Math.min(minFootDot,dot);assert.ok(dot>1-1e-8,JSON.stringify({yaw,side,dot}));}
 }
});
test('rest-twist orientation follows a rigid rotation of both target and bend pole',()=>{
 const rotation=new Quaternion().setFromAxisAngle(new Vector3(.2,.7,-.3).normalize(),.6);
 for(const side of [-1,1]){const m=model(),c=createLimbChain(m,names(side,'hind')),target=c.first.clone().add(c.second).applyQuaternion(rotation),pole=c.first.clone().applyQuaternion(rotation),foot=c.third.clone().applyQuaternion(rotation);solveLimbChain(c,target,pole,foot);apply(m,c);assert.ok(c.root.quaternion.angleTo(rotation.clone().multiply(c.bind.root))<1e-5);assert.ok(qError(c.middle.quaternion,c.bind.middle)<1e-5);assert.ok(qError(c.end.quaternion,c.bind.end)<1e-5);}
});
test('zero, out-of-reach and collinear-pole inputs remain finite and enforce actual limb lengths',()=>{
 for(const [side,kind]of limbs)for(const p of [new Vector3(),new Vector3(0,20,0),new Vector3(.01,.01,.01)]){const m=model(),c=createLimbChain(m,names(side,kind));solveLimbChain(c,p,p,c.third||null);apply(m,c);for(const q of [c.rootQ,c.middleQ,c.endQ]){assert.ok(q.toArray().every(Number.isFinite));assert.ok(Math.abs(q.length()-1)<1e-9);}assert.ok(Math.abs(endpoint(c).length()-c.reachDistance)<1e-5);}
});
test('full leap posing preserves the real nonidentity foot bind quaternion',()=>{const m=model();applyLeapPose(m,{kind:'wallHold',vy:0,launchVelocity:16},1);for(const side of [-1,1])assert.ok(m.bones['foot'+side].quaternion.angleTo(new Quaternion().fromArray(m.restPose['foot'+side].quaternion).normalize())<1e-6);});
test('invalid or nonnormalized new bind data fails explicitly',()=>{const m=model();delete m.restPose['knee1'];assert.throws(()=>createLimbChain(m,names(1,'hind')),/Missing bind/);const other=model();other.restPose['hip1'].scale=[1,2,1];assert.throws(()=>createLimbChain(other,names(1,'hind')),/Normalize bind limb scales/);});
test('no-restPose rigs retain exact legacy solver and full leap output',()=>{
 const a=model(false),b=model(false);for(const [side,kind]of limbs){const x=createLimbChain(a,names(side,kind)),y=legacyChain(b,names(side,kind));for(let i=0;i<30;i++){const target=new Vector3(Math.sin(i)*.2,-.1,-.3-Math.cos(i)*.15),pole=new Vector3(side,.1,.08),foot=i%2?new Vector3(0,-.03,-1):null;solveLimbChain(x,target,pole,foot);legacySolve(y,target,pole,foot);for(const key of ['rootQ','middleQ','endQ'])assert.deepEqual(x[key].toArray(),y[key].toArray());}}
 const x=model(false),y=model(false);for(let i=0;i<80;i++){const f=i<10?{kind:'wallHold',vy:0,launchVelocity:16}:{kind:'jump',vy:14-i*.4,launchVelocity:16};applyLeapPose(x,f,1/60);legacyLeap(y,f,1/60);for(const name of Object.keys(x.bones))assert.deepEqual(x.bones[name].quaternion.toArray(),y.bones[name].quaternion.toArray());}
});
test('dedicated local flight pivot follows ascent/descent in4headings without changing yaw',()=>{
 for(const [vx,vz]of [[0,11],[11,0],[0,-11],[-11,0]])for(const vy of [-5,5]){const group=new Group(),flightPivot=new Group();group.add(flightPivot);group.rotation.y=Math.atan2(vx,vz);const yaw=group.rotation.y,m={group,flightPivot,stats:{restAxisPitch:0}};applyFlightAttitude(m,{kind:'wallJump',vx,vy,vz},10);group.updateMatrixWorld(true);const forward=new Vector3(0,0,1).transformDirection(flightPivot.matrixWorld);assert.ok(forward.dot(new Vector3(vx,vy,vz).normalize())>1-1e-12);assert.equal(group.rotation.y,yaw);assert.equal(group.rotation.x,0);}
});
test('local flight pivot has zero pitch accumulation and returns to rest',()=>{const group=new Group(),flightPivot=new Group();group.add(flightPivot);const m={group,flightPivot,stats:{restAxisPitch:0}};for(let i=0;i<300;i++)applyFlightAttitude(m,{kind:'jump',vx:11,vy:5,vz:0},1/60);assert.ok(Math.abs(flightPivot.rotation.x)<1e-9);assert.ok(Math.abs(flightPivot.rotation.z-Math.atan2(5,11))<1e-9);for(let i=0;i<300;i++)applyFlightAttitude(m,null,1/60);assert.ok(Math.abs(flightPivot.rotation.x)<1e-9);});
test('models without flightPivot retain exact legacy attitude output',()=>{const a={group:new Group(),stats:{imported:true,restAxisPitch:.17}},b={group:new Group(),stats:{imported:true,restAxisPitch:.17}};for(let i=0;i<100;i++){a.group.rotation.set(0,Math.PI/2,0);b.group.rotation.set(0,Math.PI/2,0);const f=i<50?{kind:'wallJump',vx:10,vz:2,vy:8-i*.2}:null;applyFlightAttitude(a,f,1/60);legacyFlight(b,f,1/60);assert.deepEqual(a.group.quaternion.toArray(),b.group.quaternion.toArray());assert.equal(a.flightPitch,b.flightPitch);}});
test('straight bind limbs and a collinear pole remain finite with nonidentity twist',()=>{
 const group=new Group(),root=new Bone(),middle=new Bone(),end=new Bone(),tip=new Bone();root.name='root';middle.name='middle';end.name='end';tip.name='tip';middle.position.set(0,.4,0);end.position.set(0,.3,0);tip.position.set(0,.1,0);root.quaternion.setFromAxisAngle(new Vector3(0,0,1),.7);middle.quaternion.setFromAxisAngle(new Vector3(0,1,0),.8);end.quaternion.setFromAxisAngle(new Vector3(1,0,0),-.5);root.add(middle);middle.add(end);end.add(tip);group.add(root);group.updateMatrixWorld(true);
 const bones={root,middle,end,tip},m={group,bones,restPose:Object.fromEntries(Object.entries(bones).map(([name,b])=>[name,{position:b.position.toArray(),quaternion:b.quaternion.toArray(),scale:[1,1,1]}]))},c=createLimbChain(m,['root','middle','end','tip']),target=c.first.clone().add(c.second);
 solveLimbChain(c,target,target,c.third);apply(m,c);for(const q of [c.rootQ,c.middleQ,c.endQ])assert.ok(q.toArray().every(Number.isFinite));assert.ok(endpoint(c).distanceTo(target)<1e-6);
});
test('THREE vector/quaternion rest metadata is accepted without mutation',()=>{const m=model();for(const p of Object.values(m.restPose)){p.position=new Vector3().fromArray(p.position);p.quaternion=new Quaternion().fromArray(p.quaternion);p.scale=new Vector3().fromArray(p.scale);}const before=JSON.stringify(m.restPose),c=createLimbChain(m,names(1,'hind')),target=c.first.clone().add(c.second);solveLimbChain(c,target,c.first,c.third);apply(m,c);assert.ok(endpoint(c).distanceTo(target)<1e-5);assert.equal(JSON.stringify(m.restPose),before);});
test('report numeric CPU acceptance bounds',()=>{console.log(JSON.stringify({maxEndpointError:maxEndpoint,maxBindAngleError:maxRestAngle,minFootDirectionDot:minFootDot,actualBindJoints:heavy.length,scope:'CPU source sidecar only; no browser, game integration or phone-performance claim'}));});
