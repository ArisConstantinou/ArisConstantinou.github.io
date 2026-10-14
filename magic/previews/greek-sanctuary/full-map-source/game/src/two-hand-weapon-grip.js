import * as THREE from 'three';
import {createLegSolver} from './locomotion.js';

/** Keep both authored closed hands on the rigid weapon during clip blends.
 * Measured sockets own the targets. Lengths, finger curls and skin stay intact.
 */
export function createTwoHandWeaponGrip(model,bones,{socketPrefix='AxeSocket'}={}) {
  model.updateMatrixWorld(true);
  const arms=['l','r'].map(side=>{
    const upper=bones['upperarm'+side],lower=bones['lowerarm'+side],wrist=bones['wrist'+side],socket=bones[socketPrefix+side];
    if(!upper||!lower||!wrist||!socket)throw Error('Two-hand weapon requires both measured arm chains and sockets');
    const socketRotation=socket.getWorldQuaternion(new THREE.Quaternion()).invert();
    const wristOffset=wrist.getWorldQuaternion(new THREE.Quaternion()).premultiply(socketRotation);
    return{side,upper,lower,wrist,socket,wristOffset,solver:createLegSolver(upper,lower,wrist),authored:[new THREE.Quaternion(),new THREE.Quaternion(),new THREE.Quaternion()],error:0};
  });
  const shoulder=new THREE.Vector3(),elbow=new THREE.Vector3(),target=new THREE.Vector3(),pole=new THREE.Vector3(),orientation=new THREE.Quaternion();
  let applied=false;
  function beforeAnimation(){
    if(!applied)return;
    for(const arm of arms){arm.upper.quaternion.copy(arm.authored[0]);arm.lower.quaternion.copy(arm.authored[1]);arm.wrist.quaternion.copy(arm.authored[2]);}
    applied=false;
  }
  function update(){
    model.updateMatrixWorld(true);
    for(const arm of arms){
      arm.authored[0].copy(arm.upper.quaternion);arm.authored[1].copy(arm.lower.quaternion);arm.authored[2].copy(arm.wrist.quaternion);
      arm.upper.getWorldPosition(shoulder);arm.lower.getWorldPosition(elbow);arm.socket.getWorldPosition(target);
      // Retain the authored elbow plane rather than impose a world-space pole.
      pole.copy(elbow).sub(shoulder);arm.socket.getWorldQuaternion(orientation).multiply(arm.wristOffset);
      arm.error=arm.solver.solve(target,pole,orientation);
    }
    applied=true;
  }
  function snapshot(){model.updateMatrixWorld(true);return{arms:arms.map(arm=>({side:arm.side,error:arm.wrist.getWorldPosition(elbow).distanceTo(arm.socket.getWorldPosition(target))}))};}
  return{beforeAnimation,update,reset:beforeAnimation,snapshot};
}
