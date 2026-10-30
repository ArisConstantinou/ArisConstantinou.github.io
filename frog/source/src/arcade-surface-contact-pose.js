import {Vector3,Quaternion} from 'three';
import {contactVertexIndices} from './arcade-wall-contact-pose.js';
import {createLimbChain,solveLimbChain} from './arcade-leap-pose.js';
import {supportHeight} from './arcade-scenery-contact.js';
const cache=new WeakMap(),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function prewarmSurfaceFeet(model){if(!model.stats.cartoon||cache.has(model))return;cache.set(model,{limbs:[-1,1].flatMap(side=>[{side,fore:false,chain:createLimbChain(model,['hip'+side,'knee'+side,'ankle'+side,'foot'+side]),indices:contactVertexIndices(model.mesh,'foot'+side)},{side,fore:true,chain:createLimbChain(model,['shoulder'+side,'elbow'+side,'wrist'+side]),indices:contactVertexIndices(model.mesh,'wrist'+side)}]),v:new Vector3(),ankle:new Vector3(),target:new Vector3(),pole:new Vector3(),swing:new Quaternion(),a:new Vector3(),b:new Vector3(),endWorld:new Quaternion()});}
// Keep original limb lengths and foot bearing. Only a small rest-aware swing
// plants a supported foot; no joint scales, root offset or gameplay height edits.
export function plantSurfaceFeet(model,actor,state,ground){
 model.surfaceContacts=null;if(!model.stats.cartoon||actor.flight||actor.hop>0||actor.knockUp>0||!actor.support||actor.ko||model.ownsLimbPose||!['roof','rock','tree'].includes(actor.support.kind))return;
 prewarmSurfaceFeet(model);const c=cache.get(model),result=[],id=actor.support.id;
 model.group.updateMatrixWorld(true);
 function gap(limb){let best=null;for(const index of limb.indices){model.mesh.getVertexPosition(index,c.v).applyMatrix4(model.mesh.matrixWorld);const y=supportHeight(state,id,c.v.x,c.v.z,ground);if(y===null)continue;const distance=c.v.y-y;if(!best||distance<best.distance)best={distance,point:c.v.toArray()};}return best;}
 for(const limb of c.limbs){if(limb.fore&&model.currentClip!=='Land')continue;const h=limb.chain;
  for(let iteration=0;iteration<2;iteration++){
   const contact=gap(limb);if(!contact||Math.abs(contact.distance-.012)<.006)break;
   h.end.getWorldPosition(c.ankle);c.ankle.y+=clamp(.012-contact.distance,-(h.l1+h.l2)*.65,(h.l1+h.l2)*.35);h.root.parent.worldToLocal(c.target.copy(c.ankle));c.target.sub(h.root.position);
   h.middle.getWorldPosition(c.pole);h.root.parent.worldToLocal(c.pole).sub(h.root.position);
   c.endWorld.copy(h.root.quaternion).multiply(h.middle.quaternion).multiply(h.end.quaternion);solveLimbChain(h,c.target,c.pole,null);
   h.rootQ.copy(c.swing.setFromUnitVectors(c.a.copy(h.first).normalize(),c.b.copy(h.knee).normalize())).multiply(h.bind.root);
   h.worldLower.copy(c.swing.setFromUnitVectors(c.a.copy(h.second).normalize(),c.b.copy(h.lower).normalize())).multiply(h.bind.middleWorld);h.middleQ.copy(h.rootQ).invert().multiply(h.worldLower);h.endQ.copy(h.worldLower).invert().multiply(c.endWorld);
   h.root.quaternion.copy(h.rootQ);h.middle.quaternion.copy(h.middleQ);h.end.quaternion.copy(h.endQ);h.root.updateWorldMatrix(true,true);
  }
  const contact=gap(limb);result.push({side:limb.side,fore:limb.fore,gap:contact?.distance??null,point:contact?.point??null});
 }
 model.surfaceContacts=result;
}
