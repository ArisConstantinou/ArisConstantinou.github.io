import * as THREE from 'three';

// Park both folded rigid sections against the rear hatch. The source clip
// already folds the lower hinge; this adds the missing upper hinge rotation.
export function createHearthLadderFold(group,bones){
 const top=bones.ladder,mid=bones.ladder_mid;if(!top||!mid)return null;
 group.updateMatrixWorld(true);
 const start=top.getWorldPosition(new THREE.Vector3()),link=mid.getWorldPosition(new THREE.Vector3()).sub(start),desired=link.clone();desired.y=-desired.y;
 const axis=new THREE.Vector3(1,0,0).applyQuaternion(top.getWorldQuaternion(new THREE.Quaternion()));
 const foldAngle=Math.atan2(axis.dot(link.clone().cross(desired)),link.dot(desired));
 // The folded frame slides down its rear carrier into the hatch's parking
 // area; simply turning it upwards would leave it sticking above the pilot.
 const parkedPosition=top.parent.worldToLocal(start.clone().add(new THREE.Vector3(0,link.y*.75,0))).sub(top.position);
 const torso=bones.torso?.parent===top.parent?bones.torso:null,restTorsoInverse=torso?.matrix.clone().invert(),torsoDelta=new THREE.Matrix4();
 const authored=new THREE.Quaternion(),authoredPosition=new THREE.Vector3(),authoredScale=new THREE.Vector3(),delta=new THREE.Quaternion(),localAxis=new THREE.Vector3(1,0,0);let applied=false,deployment=0;
 function beforeAnimation(){if(applied){top.quaternion.copy(authored);top.position.copy(authoredPosition);top.scale.copy(authoredScale);applied=false;}}
 function update(clip,time=0,duration=2.4){
  authored.copy(top.quaternion);
  authoredPosition.copy(top.position);
  authoredScale.copy(top.scale);
  deployment=['Board','Exit'].includes(clip)?THREE.MathUtils.smoothstep(time,0,.32)*(1-THREE.MathUtils.smoothstep(time,duration-.32,duration)):0;
  delta.setFromAxisAngle(localAxis,foldAngle*(1-deployment));top.quaternion.multiply(delta).normalize();applied=true;
  top.position.addScaledVector(parkedPosition,1-deployment);
  // The rear hatch rotates with the torso. Retain the exported parent and
  // bind pose while constraining its parked carrier to that moving frame.
  if(torso){torso.updateMatrix();top.updateMatrix();torsoDelta.multiplyMatrices(torso.matrix,restTorsoInverse).multiply(top.matrix);torsoDelta.decompose(top.position,top.quaternion,top.scale);}
 }
 function snapshot(){return{deployment,foldAngle,upper:top.getWorldPosition(new THREE.Vector3()).toArray(),middle:mid.getWorldPosition(new THREE.Vector3()).toArray()};}
 return {beforeAnimation,update,snapshot};
}
