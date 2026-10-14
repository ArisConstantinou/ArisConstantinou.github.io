import * as THREE from 'three';
import { createLegSolver } from './locomotion.js';

/** Both hands gesture toward the actual held object. The object floats beyond
 * physical reach, so measured arms frame it without stretching or moving it.
 * Authored finger curls/roll survive; only shoulder, elbow and wrist rotate.
 */
export function createMagicHandTargeting(group, model, bones) {
  const arms = ['l', 'r'].map((side, index) => {
    const upper=bones['upperarm'+side],lower=bones['lowerarm'+side],wrist=bones['wrist'+side];
    const hand=bones['hand'+side],finger=bones['finger_'+side+'_middle_1'];
    if(!upper||!lower||!wrist||!hand||!finger)throw new Error('Mage hand targeting requires the measured arm and finger rig.');
    return {side,index,upper,lower,wrist,hand,finger,solver:createLegSolver(upper,lower,wrist),
      authored:[new THREE.Quaternion(),new THREE.Quaternion(),new THREE.Quaternion()],
      solved:[new THREE.Quaternion(),new THREE.Quaternion(),new THREE.Quaternion()],error:0};
  });
  const target=new THREE.Vector3(),framing=new THREE.Vector3(),shoulder=new THREE.Vector3(),elbow=new THREE.Vector3(),wristPosition=new THREE.Vector3(),palm=new THREE.Vector3(),fingerPosition=new THREE.Vector3(),direction=new THREE.Vector3(),wristGoal=new THREE.Vector3(),pole=new THREE.Vector3();
  const right=new THREE.Vector3(),forward=new THREE.Vector3(),scale=new THREE.Vector3(),rotation=new THREE.Quaternion(),parent=new THREE.Quaternion(),world=new THREE.Quaternion(),reference=new THREE.Quaternion(),delta=new THREE.Quaternion();
  let weight=0,applied=false,hasTarget=false;
  function beforeAnimation(){
    if(!applied)return;
    for(const arm of arms){arm.upper.quaternion.copy(arm.authored[0]);arm.lower.quaternion.copy(arm.authored[1]);arm.wrist.quaternion.copy(arm.authored[2]);}
    applied=false;
  }
  function update(dt,objectPosition,{enabled=true,disabled=false}={}){
    if(disabled){weight=0;hasTarget=false;return;}
    const active=enabled&&objectPosition&&Number.isFinite(objectPosition.x)&&Number.isFinite(objectPosition.y)&&Number.isFinite(objectPosition.z);
    if(active){target.copy(objectPosition);hasTarget=true;}
    weight=THREE.MathUtils.lerp(weight,active?1:0,1-Math.exp(-14*Math.max(0,dt)));
    if(weight<.0001||!hasTarget){weight=0;return;}
    model.updateMatrixWorld(true);group.getWorldQuaternion(rotation);group.getWorldScale(scale);
    right.set(1,0,0).applyQuaternion(rotation);forward.set(0,0,1).applyQuaternion(rotation);
    for(const arm of arms){
      const side=arm.index===0?1:-1;
      arm.authored[0].copy(arm.upper.quaternion);arm.authored[1].copy(arm.lower.quaternion);arm.authored[2].copy(arm.wrist.quaternion);
      arm.upper.getWorldPosition(shoulder);arm.lower.getWorldPosition(elbow);arm.wrist.getWorldPosition(wristPosition);
      const l1=shoulder.distanceTo(elbow),l2=elbow.distanceTo(wristPosition);
      framing.copy(target).addScaledVector(right,side*.17*scale.y);direction.copy(framing).sub(shoulder);
      if(direction.lengthSq()<1e-10)direction.copy(forward);
      const reach=THREE.MathUtils.clamp(direction.length(),Math.abs(l1-l2)+.025*scale.y,(l1+l2)*.93);
      wristGoal.copy(shoulder).addScaledVector(direction.normalize(),reach);
      pole.copy(right).multiplyScalar(side*.70).addScaledVector(forward,-.15);pole.y-=.75;
      arm.error=arm.solver.solve(wristGoal,pole);
      arm.wrist.getWorldQuaternion(reference);
      // A second pass accounts for the palm's offset from the wrist pivot.
      // Limit the wrist turn to 60 degrees relative to the arm solution.
      for(let pass=0;pass<2;pass++){
        arm.hand.getWorldPosition(palm);arm.finger.getWorldPosition(fingerPosition);
        direction.copy(fingerPosition).sub(palm);framing.copy(target).sub(palm);
        if(direction.lengthSq()<1e-10||framing.lengthSq()<1e-10)break;
        delta.setFromUnitVectors(direction.normalize(),framing.normalize());
        arm.wrist.getWorldQuaternion(world).premultiply(delta);
        const angle=reference.angleTo(world);if(angle>Math.PI/3)world.slerp(reference,1-(Math.PI/3)/angle);
        arm.wrist.parent.getWorldQuaternion(parent).invert();arm.wrist.quaternion.copy(parent.multiply(world)).normalize();arm.wrist.updateMatrixWorld(true);
      }
      arm.solved[0].copy(arm.upper.quaternion);arm.solved[1].copy(arm.lower.quaternion);arm.solved[2].copy(arm.wrist.quaternion);
      arm.upper.quaternion.copy(arm.authored[0]).slerp(arm.solved[0],weight);arm.lower.quaternion.copy(arm.authored[1]).slerp(arm.solved[1],weight);arm.wrist.quaternion.copy(arm.authored[2]).slerp(arm.solved[2],weight);arm.upper.updateMatrixWorld(true);
    }
    applied=true;
  }
  function snapshot(){
    model.updateMatrixWorld(true);
    return {weight,target:hasTarget?target.toArray():null,arms:arms.map(arm=>{
      arm.hand.getWorldPosition(palm);arm.finger.getWorldPosition(fingerPosition);direction.copy(fingerPosition).sub(palm).normalize();framing.copy(target).sub(palm).normalize();
      return {side:arm.side,error:arm.error,shoulder:arm.upper.getWorldPosition(shoulder).toArray(),elbow:arm.lower.getWorldPosition(elbow).toArray(),wrist:arm.wrist.getWorldPosition(wristPosition).toArray(),palm:palm.toArray(),fingerAim:direction.toArray(),aimError:direction.angleTo(framing)};
    })};
  }
  function reset(){beforeAnimation();weight=0;hasTarget=false;}
  return {beforeAnimation,update,reset,snapshot};
}
