import * as THREE from 'three';
import {createLimbChain,solveLimbChain} from './arcade-leap-pose.js';
import {CATAPULT_MECHANISM} from './arcade-cartoon-bodies.js';
const clamp=THREE.MathUtils.clamp,smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
export function installCartoonCatapults(view,gltf){
 gltf.scene.updateMatrixWorld(true);const source=gltf.scene.getObjectByName('Catapult_payload');if(!source?.isMesh)throw Error('Λείπει η πέτρα του Meshy καταπέλτη.');
 const rockGeometry=source.geometry.clone().applyMatrix4(source.matrixWorld);rockGeometry.computeBoundingBox();const center=rockGeometry.boundingBox.getCenter(new THREE.Vector3());rockGeometry.translate(-center.x,-center.y,-center.z);rockGeometry.computeBoundingSphere();
 const chains=new WeakMap(),target=new THREE.Vector3(),pole=new THREE.Vector3(),q=new THREE.Quaternion(),grip=new THREE.Vector3();
 for(const machine of view.machines.values()){
  for(const old of machine.turret.children)old.visible=false;
  const model=gltf.scene.clone(true);model.name='Meshy woodland rock catapult';model.traverse(o=>{if(o.isMesh)o.castShadow=o.receiveShadow=true;});machine.turret.add(model);
  machine.cartoon=model;machine.arm=model.getObjectByName('ThrowingArm');machine.winch=model.getObjectByName('ReloadWinch');machine.loadedRock=model.getObjectByName('Catapult_payload');machine.grips=[model.getObjectByName('GripRight'),model.getObjectByName('GripLeft')];
  if(!machine.arm||!machine.winch||machine.grips.some(o=>!o))throw Error('Λείπει άρθρωση ή χειριστήριο καταπέλτη.');
 }
 function poseOperator(actor,machine){
  const model=view.game.models[view.game.state.actors.indexOf(actor)];if(!model?.stats.cartoon)return;
  let arms=chains.get(model);if(!arms){arms=[-1,1].map(side=>createLimbChain(model,['shoulder'+side,'elbow'+side,'wrist'+side]));chains.set(model,arms);}
  const contacts=[];model.group.updateMatrixWorld(true);machine.group.updateMatrixWorld(true);
  for(let i=0;i<2;i++){
   const c=arms[i];machine.grips[i].getWorldPosition(grip);c.root.parent.worldToLocal(target.copy(grip));target.sub(c.root.position);
   c.root.parent.getWorldQuaternion(q).invert();pole.set(i===0?-1:1,-.25,.1).applyQuaternion(q);solveLimbChain(c,target,pole,null);
   c.root.quaternion.copy(c.rootQ);c.middle.quaternion.copy(c.middleQ);c.end.quaternion.copy(c.endQ);model.group.updateMatrixWorld(true);
   contacts.push({side:i===0?-1:1,gap:c.end.getWorldPosition(target).distanceTo(grip),clamped:c.reachClamped,shoulder:c.root.getWorldPosition(new THREE.Vector3()).toArray(),wrist:target.toArray(),grip:grip.toArray(),reach:c.l1+c.l2});
  }
  model.catapultContacts=contacts;
 }
 return {rockGeometry,rockMaterial:source.material,
  updateStation(machine,station){
   const t=Number.isFinite(machine.launchAge)?machine.launchAge:Infinity;let angle=0;
   if(t<.3)angle=CATAPULT_MECHANISM.releaseAngle*smooth(Math.max(0,(t-.10)/.20));
   else if(station.cooldown>0)angle=CATAPULT_MECHANISM.releaseAngle*(1-smooth(Math.max(0,(t-.45)/2.2)));
   machine.arm.rotation.x=angle;machine.winch.rotation.y=station.cooldown>0?smooth(Math.max(0,(t-.45)/2.2))*Math.PI*4:0;
   machine.loadedRock.visible=station.loaded||t<CATAPULT_MECHANISM.releaseDelay;
   machine.ring.material.opacity=station.occupant?.42:.2;
   const occupant=view.game.state.actors.find(a=>a.id===station.occupant);if(occupant)poseOperator(occupant,machine);
  },
  dispose(){rockGeometry.dispose();},
 };
}
