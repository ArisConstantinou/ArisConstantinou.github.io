import * as T from 'three';import {createLegSolver} from './locomotion.js';import {strikeEnvelope} from './door-strike-rules.js';
const UP=new T.Vector3(0,1,0);
export function createDoorStrikeRig(group,model,bones,locomotion){
 const arm=createLegSolver(bones.upper_R,bones.lower_R,bones.hand_R),saved=new Map(),feet=[new T.Vector3(),new T.Vector3()],targets=[new T.Vector3(),new T.Vector3()];
 const forward=new T.Vector3(),right=new T.Vector3(),contact=new T.Vector3(),actual=new T.Vector3(),wrist=new T.Vector3(),pole=new T.Vector3(),offset=new T.Vector3(),handQ=new T.Quaternion(),footQ=new T.Quaternion(),world=new T.Quaternion(),parent=new T.Quaternion(),delta=new T.Quaternion();
 const fist=bones.finger_R2_0||bones.hand_R;let serial=-1,kind=null,knuckle=.15,sole=.38,lastError=0,active=false;
 function save(bone){if(!saved.has(bone))saved.set(bone,bone.quaternion.clone());}
 function beforeAnimation(){for(const [bone,q]of saved)bone.quaternion.copy(q);saved.clear();active=false;}
 function rotate(bone,axis,angle){save(bone);bone.getWorldQuaternion(world);delta.setFromAxisAngle(axis,angle);world.premultiply(delta);bone.parent.getWorldQuaternion(parent).invert();bone.quaternion.copy(parent.multiply(world));bone.updateMatrixWorld(true);}
 function frame(strike){
  group.updateMatrixWorld(true);const s=strike.target,g=s.gate,r=g.rotation||0;
  forward.set(Math.sin(s.yaw),0,Math.cos(s.yaw));right.set(Math.cos(s.yaw),0,-Math.sin(s.yaw));
  if(serial!==strike.serial){serial=strike.serial;kind=strike.kind;for(let i=0;i<2;i++)locomotion.solvers[i].foot.getWorldPosition(feet[i]);
   bones.hand_R.getWorldPosition(wrist);fist.getWorldPosition(actual);knuckle=Math.max(.08,actual.distanceTo(wrist));sole=Math.max(.12,Math.min(.5,feet[1].y-group.position.y));
   const origin=kind==='kick'?feet[1]:wrist,along=T.MathUtils.clamp((origin.x-g.x)*Math.cos(r)-(origin.z-g.z)*Math.sin(r),-g.width/2+.25,g.width/2-.25);
   contact.set(g.x+Math.cos(r)*along+Math.sin(r)*s.side*.18,(g.floorY||0)+(kind==='kick'?1.25:Math.min(2.15,g.height-.3)),g.z-Math.sin(r)*along+Math.cos(r)*s.side*.18);
  }
  const e=strikeEnvelope(kind,strike.time);targets[0].copy(feet[0]);targets[1].copy(feet[1]);
  if(kind==='kick'){
   targets[1].addScaledVector(UP,.68*e.lift).addScaledVector(forward,-.16*e.lift);
   offset.copy(UP).multiplyScalar(-sole).applyAxisAngle(right,-1.12);
   wrist.copy(contact).sub(offset);targets[1].lerp(wrist,e.drive);
  }
  return{feet:targets,envelope:e};
 }
 function apply(strike){
  const e=strikeEnvelope(strike.kind,strike.time);active=true;kind=strike.kind;
  if(kind==='kick'){
   rotate(bones.torso,right,-.12*e.lift+.08*e.drive);rotate(bones.upper_L,right,-.15*e.lift);rotate(bones.upper_R,right,.22*e.lift);
   save(bones.foot_R);bones.foot_R.getWorldQuaternion(footQ);delta.setFromAxisAngle(right,-1.12*e.drive);footQ.premultiply(delta);bones.foot_R.parent.getWorldQuaternion(parent).invert();bones.foot_R.quaternion.copy(parent.multiply(footQ));bones.foot_R.updateMatrixWorld(true);
   bones.foot_R.getWorldPosition(actual);offset.copy(UP).multiplyScalar(-sole).applyAxisAngle(right,-1.12*e.drive);actual.add(offset);
  }else{
   rotate(bones.torso,right,.25*e.drive-.07*e.wind);rotate(bones.torso,UP,.09*e.drive-.12*e.wind);
   group.updateMatrixWorld(true);bones.hand_R.getWorldPosition(wrist);wrist.addScaledVector(forward,-.28*e.wind).addScaledVector(UP,.24*e.wind);
   offset.copy(contact).addScaledVector(forward,-knuckle);wrist.lerp(offset,e.drive);
   save(bones.upper_R);save(bones.lower_R);save(bones.hand_R);
   // Orient the measured knuckle direction toward the door, then solve the
   // wrist from real shoulder/elbow lengths. Fingers remain on their rig.
   bones.hand_R.getWorldPosition(offset);fist.getWorldPosition(actual);actual.sub(offset);bones.hand_R.getWorldQuaternion(handQ);
   if(actual.lengthSq()>.00001){delta.setFromUnitVectors(actual.normalize(),forward);handQ.premultiply(delta);}
   pole.copy(right).multiplyScalar(1).addScaledVector(UP,.2).addScaledVector(forward,-.15);arm.solve(wrist,pole,handQ);
   fist.getWorldPosition(actual);
  }
  lastError=actual.distanceTo(contact);model.updateMatrixWorld(true);
 }
 return{frame,apply,beforeAnimation,snapshot:()=>({active,kind,contact:contact.toArray(),actual:actual.toArray(),error:lastError,feet:feet.map(p=>p.toArray())})};
}
