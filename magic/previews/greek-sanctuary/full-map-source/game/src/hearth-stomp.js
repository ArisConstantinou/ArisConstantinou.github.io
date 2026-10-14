import * as THREE from 'three';
export const STOMP={duration:1.28,impact:.62,cooldown:2.8,radius:4.2,damage:28};

// Author the move on the existing rig. Both planted feet use two-bone IK,
// so shifting the body's weight does not slide the support foot.
export function createStompClip(model,bones,idle){
 const mixer=new THREE.AnimationMixer(model),action=mixer.clipAction(idle);action.play();mixer.setTime(0);model.updateMatrixWorld(true);
 const pose=new Map(Object.values(bones).map(b=>[b,{p:b.position.clone(),q:b.quaternion.clone(),s:b.scale.clone()}]));
 const legs=['L','R'].map(side=>{
  const thigh=bones['thigh_'+side],shin=bones['shin_'+side],foot=bones['foot_'+side];
  const h=thigh.getWorldPosition(new THREE.Vector3()),k=shin.getWorldPosition(new THREE.Vector3()),a=foot.getWorldPosition(new THREE.Vector3());
  const axis=a.clone().sub(h).normalize(),pole=k.clone().sub(h).addScaledVector(axis,-k.clone().sub(h).dot(axis)).normalize();
  return {thigh,shin,foot,target:a,rotation:foot.getWorldQuaternion(new THREE.Quaternion()),upper:h.distanceTo(k),lower:k.distanceTo(a),pole};
 });
 const times=[0,.12,.28,.48,STOMP.impact,.78,1.02,STOMP.duration],lift=[0,.05,.52,.38,0,0,0,0],sink=[0,-.03,-.04,-.015,-.12,-.07,-.02,0];
 const tracks=new Map(idle.tracks.map(t=>[t.name,[]]));
 function point(b){return b.getWorldPosition(new THREE.Vector3());}
 function aim(b,child,target){
  const delta=new THREE.Quaternion().setFromUnitVectors(point(child).sub(point(b)).normalize(),target.clone().sub(point(b)).normalize());
  const world=b.getWorldQuaternion(new THREE.Quaternion()).premultiply(delta),parent=b.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
  b.quaternion.copy(parent.multiply(world));model.updateMatrixWorld(true);
 }
 function solve(leg,target){
  const hip=point(leg.thigh),direction=target.clone().sub(hip),d=THREE.MathUtils.clamp(direction.length(),.05,leg.upper+leg.lower-.0001);direction.normalize();
  const along=(leg.upper**2-leg.lower**2+d*d)/(2*d),height=Math.sqrt(Math.max(0,leg.upper**2-along**2));
  const bend=leg.pole.clone().addScaledVector(direction,-leg.pole.dot(direction)).normalize();
  const knee=hip.clone().addScaledVector(direction,along).addScaledVector(bend,height);
  aim(leg.thigh,leg.shin,knee);aim(leg.shin,leg.foot,target);
  leg.foot.quaternion.copy(leg.foot.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(leg.rotation));model.updateMatrixWorld(true);
 }
 for(let i=0;i<times.length;i++){
  for(const [b,v] of pose){b.position.copy(v.p);b.quaternion.copy(v.q);b.scale.copy(v.s);}
  if(i>0&&i<times.length-1){
   bones.root.position.y+=sink[i];bones.root.position.x+=lift[i]*.16;model.updateMatrixWorld(true);
   solve(legs[0],legs[0].target);
   const target=legs[1].target.clone();target.y+=lift[i];solve(legs[1],target);
  }
  for(const t of idle.tracks){const dot=t.name.lastIndexOf('.'),name=t.name.slice(0,dot),property=t.name.slice(dot+1),b=bones[name];
   if(!b)throw Error('Missing stomp bone '+name);tracks.get(t.name).push(...b[property].toArray());
  }
 }
 mixer.stopAllAction();mixer.uncacheRoot(model);
 for(const [b,v] of pose){b.position.copy(v.p);b.quaternion.copy(v.q);b.scale.copy(v.s);}model.updateMatrixWorld(true);
 return new THREE.AnimationClip('Stomp',STOMP.duration,idle.tracks.map(t=>new t.constructor(t.name,times,tracks.get(t.name))));
}
