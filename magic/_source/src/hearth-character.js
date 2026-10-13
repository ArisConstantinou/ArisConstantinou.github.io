import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {createRigLocomotion} from './locomotion.js';
import {HEARTH_STOMP} from './hearth-rules.js';
let template;
export async function loadHearth(){template=await new GLTFLoader().loadAsync(new URL('models/hearth-bulwark/hearth-bulwark.glb',document.baseURI).href);}
export function createHearth(){
 const group=new THREE.Group(),model=clone(template.scene);model.rotation.y=Math.PI;group.add(model);
 const materials=[],bones={};
 model.traverse(o=>{if(o.isBone)bones[o.name]=o;if(o.isMesh){o.castShadow=o.receiveShadow=true;const copy=m=>{const n=m.clone();materials.push(n);return n;};o.material=Array.isArray(o.material)?o.material.map(copy):copy(o.material);}});
 const highlightMaterials=materials.filter(m=>m.emissive&&m.name!=='Heart embers').map(material=>({material,color:material.emissive.clone(),intensity:material.emissiveIntensity}));
 const highlightColor=new THREE.Color(0xe9c778);
 function setHighlight(active,time=0){
  group.userData.interactionHighlighted=!!active;
  for(const {material,color,intensity} of highlightMaterials){
   material.emissive.copy(color);
   if(active)material.emissive.lerp(highlightColor,.55);
   material.emissiveIntensity=active?.36+Math.sin(time*3)*.035:intensity;
  }
 }
 const mixer=new THREE.AnimationMixer(model),clips=new Map(template.animations.map(c=>[c.name,c]));let action,name='',locomotion;
 const worldQ=new THREE.Quaternion(),parentQ=new THREE.Quaternion(),yawQ=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0),overrides=[new THREE.Vector3(),new THREE.Vector3()];
 let stompFeet=null,controlTargets,waistPose=null,rise=0;
 function update(dt,{clip='Sleep',time,fuel=0,aimYaw=group.rotation.y}={}){
  // AnimationMixer may skip writing unchanged cached tracks at dt=0. Remove
  // the preceding additive yaw before evaluating any authored pose again.
  if(waistPose)bones.torso.quaternion.copy(waistPose);
  locomotion?.beforeAnimation();
  if(clip!==name){const next=mixer.clipAction(clips.get(clip));if(Number.isFinite(time))mixer.stopAllAction();next.reset().setEffectiveWeight(1).setLoop(['Sleep','Idle','Walk','Fire'].includes(clip)?THREE.LoopRepeat:THREE.LoopOnce,Infinity);next.clampWhenFinished=true;next.play();if(action&&!Number.isFinite(time))next.crossFadeFrom(action,.12,false);action=next;name=clip;}
  mixer.update(dt);if(Number.isFinite(time)){action.time=Math.min(time,clips.get(clip).duration);mixer.update(0);}
  const grounded=['Idle','Walk','Fire','Throw','Stomp'].includes(clip);
  if(locomotion){
   if(clip==='Stomp'){
    if(!stompFeet){group.updateMatrixWorld(true);stompFeet=['foot_L','foot_R'].map(n=>bones[n].getWorldPosition(new THREE.Vector3()));}
    const t=Number.isFinite(time)?time:action.time;
    const lift=t<.12?0:t<.48?HEARTH_STOMP.lift*Math.sin(Math.PI*.5*Math.min(1,(t-.12)/.28)):t<HEARTH_STOMP.hit?HEARTH_STOMP.lift*(1-Math.pow((t-.48)/(HEARTH_STOMP.hit-.48),3)):0;
    overrides[0].copy(stompFeet[0]);overrides[1].copy(stompFeet[1]);overrides[1].y+=lift;
    locomotion.update(dt,{grounded,footOverride:overrides,bodyOffset:t<.48?-.11*Math.sin(Math.PI*Math.min(1,t/.48)):t<.85?-.12*Math.sin(Math.PI*(t-.62)/.23):0});
   }else{stompFeet=null;locomotion.update(dt,{grounded,bodyOffset:clip==='Walk'?.055:0,align:alignGait});}
  }
  // World-up yaw belongs to the waist bone, not the exported local bone axis.
  // Root/hip/leg bones and their world support anchors remain untouched.
  if(grounded){
   waistPose??=new THREE.Quaternion();waistPose.copy(bones.torso.quaternion);
   group.updateMatrixWorld(true);bones.torso.getWorldQuaternion(worldQ);yawQ.setFromAxisAngle(up,aimYaw-group.rotation.y);worldQ.premultiply(yawQ);
   bones.torso.parent.getWorldQuaternion(parentQ).invert();bones.torso.quaternion.copy(parentQ.multiply(worldQ));bones.torso.updateMatrixWorld(true);
  }
  // The folded ladder is stored in the back until the pilot uses it.
  bones.ladder.scale.setScalar(['Board','Exit'].includes(clip)?1:.001);
  for(const m of materials)if(m.name==='Heart embers')m.emissiveIntensity=fuel>0?1.8:0;
  group.userData.animationState=name;model.updateMatrixWorld(true);
 }
 function point(socket,tail=0){const b=bones[socket];return b.localToWorld(new THREE.Vector3(0,tail,0));}
 function controlPoint(sign){return bones.torso.localToWorld(controlTargets[sign>0?0:1].clone());}
 function alignGait(gait){if(name==='Walk'){action.time=(gait.phase%1)*clips.get(name).duration;mixer.update(0);}}
 function dispose(){mixer.stopAllAction();mixer.uncacheRoot(model);materials.forEach(m=>m.dispose());const skins=new Set();model.traverse(o=>{if(o.isSkinnedMesh)skins.add(o.skeleton)});skins.forEach(s=>s.dispose());group.removeFromParent();}
 update(0,{clip:'Idle'});
 rise=point('pilot').y-2.32;
 controlTargets=[.29,-.29].map(x=>bones.torso.worldToLocal(group.localToWorld(new THREE.Vector3(x,2.85+rise,.22))));
 locomotion=createRigLocomotion(group,model,['L','R'].map(side=>({upper:bones['thigh_'+side],lower:bones['shin_'+side],foot:bones['foot_'+side]})),{mechanical:true,stride:.82,lift:.29});
 update(0);
 return {group,model,bones,mixer,clips,locomotion,rise,update,point,controlPoint,setHighlight,dispose};
}
