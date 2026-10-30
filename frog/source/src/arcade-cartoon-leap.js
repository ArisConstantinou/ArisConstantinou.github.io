import {Vector3,Matrix4,Quaternion} from 'three';
import {createLimbChain,solveLimbChain} from './arcade-leap-pose.js';
const clamp=v=>Math.max(0,Math.min(1,v)),smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
export function leapEnvelope(progress){const p=clamp(progress);return {extension:smooth(p/.075)*(1-smooth((p-.68)/.30)),landing:smooth((p-.62)/.36)};}
// The exported bones have different rest axes in each body. Targets are defined
// in the frog's body frame, then transformed into each real joint-parent frame.
export function createCartoonLeapPose(model){
 const hind=[-1,1].map(side=>({side,c:createLimbChain(model,['hip'+side,'knee'+side,'ankle'+side,'foot'+side])})),fore=[-1,1].map(side=>({side,c:createLimbChain(model,['shoulder'+side,'elbow'+side,'wrist'+side])})),inverse=new Matrix4(),swing=new Quaternion(),endWorld=new Quaternion(),axisA=new Vector3(),axisB=new Vector3(),target=new Vector3(),pole=new Vector3(),foot=new Vector3(),delta=new Vector3();
 const bodyDirection=(v,parent)=>{inverse.copy(parent.matrixWorld).invert();return v.transformDirection(model.flightPivot.matrixWorld).transformDirection(inverse)};
 return function pose(state,actor,clip){
  model.leapPitch=0;const airborne=state.hop?.phase==='air';if(!airborne||actor?.flight?.kind==='wallHold'||['KO','Hit','MountedIdle','OperateCatapult','ClassAttack','AirKick','DoubleKick','BodySlam'].includes(clip))return;
  const progress=clamp(state.hop.progress),{extension,landing}=leapEnvelope(progress),sideways=Math.max(-1,Math.min(1,state.locomotion?.x||0));
  model.leapPitch=.32*extension;model.group.updateMatrixWorld(true);
  for(const {side,c} of hind){
   bodyDirection(target.set(side*.12-sideways*.28,-.18,-1),c.root.parent).multiplyScalar((c.l1+c.l2)*.985);
   bodyDirection(pole.set(side,-.12,.08),c.root.parent);bodyDirection(foot.set(side*.025-sideways*.20,-.045,-1),c.root.parent);
   solveLimbChain(c,target,pole,foot);
   // Swing the sculpted thigh and shank with minimum axial twist. Preserve the
   // solved webbed-foot orientation independently; twisting the whole limb to
   // match its bend plane distorted the new bodies' folded skin and equipment.
   endWorld.copy(c.rootQ).multiply(c.middleQ).multiply(c.endQ);
   c.rootQ.copy(swing.setFromUnitVectors(axisA.copy(c.first).normalize(),axisB.copy(c.knee).normalize())).multiply(c.bind.root);
   c.worldLower.copy(swing.setFromUnitVectors(axisA.copy(c.second).normalize(),axisB.copy(c.lower).normalize())).multiply(c.bind.middleWorld);
   c.middleQ.copy(c.rootQ).invert().multiply(c.worldLower);c.endQ.copy(c.worldLower).invert().multiply(endWorld);
   c.root.quaternion.slerp(c.rootQ,extension);c.middle.quaternion.slerp(c.middleQ,extension);c.end.quaternion.slerp(c.endQ,extension);c.tip.quaternion.slerp(c.bind.tip,extension);
  }
  if(['Jump','DoubleJump'].includes(clip))for(const {side,c}of fore){
   // Rotate the offset while retaining its length in metres.
   delta.set(side*.015,.09-.22*landing,-.10+.34*landing);const distance=delta.length();bodyDirection(delta,c.root.parent).multiplyScalar(distance);target.copy(c.first).add(c.second).add(delta);
   bodyDirection(pole.set(side,-.4,0),c.root.parent);solveLimbChain(c,target,pole,null);const weight=Math.max(extension*.8,landing);
   c.root.quaternion.slerp(c.rootQ,weight);c.middle.quaternion.slerp(c.middleQ,weight);c.end.quaternion.slerp(c.endQ,weight);
  }
  model.leapPose={progress,extension,landing};
 };
}
