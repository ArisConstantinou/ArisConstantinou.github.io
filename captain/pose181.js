/** Crouch in character space, never in an imported pelvis' rotated local axes. */
import * as T from 'three';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function installCrouchPose(group,bones){
 const v=new T.Vector3(),q=new T.Quaternion(),parentQ=new T.Quaternion();
 const world=p=>group.localToWorld(new T.Vector3(...p));
 function aim(b,child,target){
  if(!b||!child)return;b.updateWorldMatrix(true,true);
  const a=b.getWorldPosition(new T.Vector3()),dir=child.getWorldPosition(new T.Vector3()).sub(a).normalize();
  q.setFromUnitVectors(dir,target.clone().sub(a).normalize());b.getWorldQuaternion(parentQ);q.multiply(parentQ);b.parent.getWorldQuaternion(parentQ).invert();b.quaternion.copy(parentQ.multiply(q));b.updateWorldMatrix(false,true);
 }
 function chain(side,aName,bName,cName,end,pole){
  const a=bones.get(side+aName),b=bones.get(side+bName),c=bones.get(side+cName);if(!a||!b||!c)return;
  const aw=a.getWorldPosition(new T.Vector3()),bw=b.getWorldPosition(new T.Vector3()),cw=c.getWorldPosition(new T.Vector3());
  const l1=aw.distanceTo(bw),l2=bw.distanceTo(cw),dir=end.clone().sub(aw),d=clamp(dir.length(),Math.abs(l1-l2)+.002,l1+l2-.002);dir.normalize();
  const bend=pole.clone().sub(aw);bend.addScaledVector(dir,-bend.dot(dir));bend.normalize();
  const along=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-along*along));
  aim(a,b,aw.clone().addScaledVector(dir,along).addScaledVector(bend,h));aim(b,c,aw.clone().addScaledVector(dir,d));
 }
 let blend=0,phase=0;
 return (dt,crouching,speed=0)=>{
  blend=T.MathUtils.damp(blend,crouching?1:0,18,dt);if(blend<.001&&!crouching)return;
  group.updateWorldMatrix(true,true);const hips=bones.get('hips');if(!hips)return;
  const head=bones.get('head'),headQ=head?.getWorldQuaternion(new T.Quaternion());
  const hp=group.worldToLocal(hips.getWorldPosition(v));hp.y-=.50*blend;hp.z-=.035*blend;
  hips.position.copy(hips.parent.worldToLocal(group.localToWorld(hp)));group.updateWorldMatrix(true,true);
  const spine=bones.get('spine'),child=bones.get('spine1');
  if(spine&&child){const a=spine.getWorldPosition(new T.Vector3()),dir=child.getWorldPosition(new T.Vector3()).sub(a);const axis=new T.Vector3(1,0,0).applyQuaternion(group.getWorldQuaternion(new T.Quaternion()));dir.applyAxisAngle(axis,.36*blend);aim(spine,child,a.add(dir));}
  if(speed>.05)phase+=dt*6.2*Math.min(1.6,speed/1.15);
  const step=speed>.05?Math.sin(phase)*.11*blend:0;
  for(const [side,x,k] of [['left',.12,1],['right',-.12,-1]]){
   const foot=bones.get(side+'foot');if(!foot)continue;
   const base=group.worldToLocal(foot.getWorldPosition(new T.Vector3())),goal=base.clone().lerp(new T.Vector3(x,.085,.03+k*step),blend);
   chain(side,'upleg','leg','foot',group.localToWorld(goal),world([x,.48,.64]));
   const toe=bones.get(side+'toebase');if(toe)aim(foot,toe,world([x,.05,.24+k*step]));
   const hand=bones.get(side+'hand'),handAt=hand?group.worldToLocal(hand.getWorldPosition(new T.Vector3())):new T.Vector3(x*2,.85,.22);
   const handGoal=handAt.lerp(new T.Vector3(x*1.9,.53,.18-k*step*.3),blend);
   chain(side,'arm','forearm','hand',group.localToWorld(handGoal),world([x*2.8,.70,-.02]));
  }
  if(head&&headQ){head.parent.getWorldQuaternion(parentQ).invert();head.quaternion.copy(parentQ.multiply(headQ));}
  group.updateWorldMatrix(true,true);
 };
}
