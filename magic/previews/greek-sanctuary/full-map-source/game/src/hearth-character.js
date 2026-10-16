import {loadGltfAsset} from './asset-loading.js';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {createRigLocomotion} from './locomotion.js';
import {HEARTH_STOMP} from './hearth-rules.js';
import {createHearthLod} from './hearth-lod.js';
import {createHearthArmAim} from './hearth-aim.js';
import {createHearthLadderFold} from './hearth-ladder.js';
import {createDoorStrikeRig} from './hearth-door-strike.js';
let template;
let highPromise;
async function loadModel(path){
 const decoder=new DRACOLoader().setDecoderPath(new URL('models/draco/',document.baseURI).href).setWorkerLimit(1);
 try{return await loadGltfAsset(new GLTFLoader().setDRACOLoader(decoder),new URL(path,document.baseURI).href);}finally{decoder.dispose();}
}
export async function loadHearth(){
 template=await loadModel('models/hearth-bulwark/hearth-bulwark.glb');
}
export function createHearth(){
 const group=new THREE.Group(),model=clone(template.scene);model.rotation.y=Math.PI;group.add(model);
 const materials=[],highlightMaterials=[],bones={},bodyHighlight={value:0};
 model.traverse(o=>{if(o.isBone)bones[o.name]=o;});
 function prepareMesh(o){if(o.isMesh){o.castShadow=o.receiveShadow=true;
  // A conservative local bound covers kneeling, extended arms and waist turns.
  // It avoids an expensive skin-vertex scan or stale rest-pose edge culling.
  if(o.isSkinnedMesh)o.boundingSphere=new THREE.Sphere(new THREE.Vector3(0,1.7,0),3.1);
  const copy=m=>{
  const n=m.clone();
  // The new suit uses one atlas for armour and its masked furnace emission.
  // Add the nearby interaction glow after that mask, preserving the furnace
  // and existing PBR pixels instead of lighting only the ladder material.
  if(bones.nozzle_L&&bones.nozzle_R&&n.name==='Heart embers'){
   n.userData.interactionGlow=bodyHighlight;
   n.onBeforeCompile=shader=>{shader.uniforms.hearthInteractionHighlight=bodyHighlight;shader.fragmentShader='uniform float hearthInteractionHighlight;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance += vec3(0.42, 0.28, 0.10) * hearthInteractionHighlight;');};
   n.customProgramCacheKey=()=> 'hearth-body-interaction-v1';
  }
  materials.push(n);if(n.emissive&&n.name!=='Heart embers')highlightMaterials.push({material:n,color:n.emissive.clone(),intensity:n.emissiveIntensity});return n;
 };o.material=Array.isArray(o.material)?o.material.map(copy):copy(o.material);}}
 model.traverse(prepareMesh);
 const lod=createHearthLod(model,{prepareMesh,loadHigh:()=>highPromise??=loadModel('models/hearth-bulwark/hearth-bulwark-close.glb')});
 const highlightColor=new THREE.Color(0xe9c778);
 function setHighlight(active,time=0){
  group.userData.interactionHighlighted=!!active;
  bodyHighlight.value=active?.36+Math.sin(time*3)*.035:0;
  for(const {material,color,intensity} of highlightMaterials){
   material.emissive.copy(color);
   if(active)material.emissive.lerp(highlightColor,.55);
   material.emissiveIntensity=active?.36+Math.sin(time*3)*.035:intensity;
  }
 }
 const mixer=new THREE.AnimationMixer(model),clips=new Map(template.animations.map(c=>[c.name,c]));let action,name='',locomotion;
 const worldQ=new THREE.Quaternion(),parentQ=new THREE.Quaternion(),yawQ=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0),overrides=[new THREE.Vector3(),new THREE.Vector3()];
 const aim=createHearthArmAim(group,model,bones);
 const ladderFold=createHearthLadderFold(group,bones);
 let stompFeet=null,controlTargets,waistPose=null,rise=0,strikeRig;
 function update(dt,{clip='Sleep',time,fuel=0,aimYaw=group.rotation.y,aimDt=dt,aimTargets=[],firing=false,doorStrike=null}={}){
  // AnimationMixer may skip writing unchanged cached tracks at dt=0. Remove
  // the preceding additive yaw before evaluating any authored pose again.
  strikeRig?.beforeAnimation();
  if(waistPose)bones.torso.quaternion.copy(waistPose);
  aim?.beforeAnimation();
  ladderFold?.beforeAnimation();
  locomotion?.beforeAnimation();
  if(clip!==name){const next=mixer.clipAction(clips.get(clip));if(Number.isFinite(time))mixer.stopAllAction();next.reset().setEffectiveWeight(1).setLoop(['Sleep','Idle','Walk','Fire'].includes(clip)?THREE.LoopRepeat:THREE.LoopOnce,Infinity);next.clampWhenFinished=true;next.play();if(action&&!Number.isFinite(time))next.crossFadeFrom(action,.12,false);action=next;name=clip;}
  mixer.update(dt);if(Number.isFinite(time)){action.time=Math.min(time,clips.get(clip).duration);mixer.update(0);}
  const grounded=['Idle','Walk','Fire','Throw','Stomp'].includes(clip);
  if(locomotion){
   if(doorStrike&&strikeRig){
    const pose=strikeRig.frame(doorStrike);locomotion.update(dt,{grounded:true,footOverride:pose.feet,bodyOffset:-.04*Math.max(pose.envelope.lift,pose.envelope.drive)});
   }else if(clip==='Stomp'){
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
  aim?.update(aimDt,{active:firing,targets:aimTargets,enabled:['Idle','Walk','Fire'].includes(clip),matricesReady:grounded});
  // The folded ladder is stored in the back until the pilot uses it.
  if(ladderFold)ladderFold.update(clip,Number.isFinite(time)?time:action.time,clips.get(clip).duration);
  else bones.ladder.scale.setScalar(['Board','Exit'].includes(clip)?1:.001);
  for(const m of materials)if(m.name==='Heart embers')m.emissiveIntensity=fuel>0?1.8:0;
  if(doorStrike&&strikeRig)strikeRig.apply(doorStrike);
  group.userData.animationState=doorStrike?(doorStrike.kind==='kick'?'DoorKick':'DoorPunch'):name;model.updateMatrixWorld(true);
 }
 function point(socket,tail=0){const b=bones[socket];return b.localToWorld(new THREE.Vector3(0,tail,0));}
 function aimAtTargets(dt,targets,firing,aimYaw){
  // Reapply only the arms after selection; do not reevaluate the mixer,
  // planted legs or pilot to advance aiming within the same gameplay frame.
  aim?.beforeAnimation();
  if(Number.isFinite(aimYaw)&&waistPose){
   // Retarget the already evaluated waist, rather than advancing the mixer,
   // foot support and seated pilot a second time for an automatic turn.
   ladderFold?.beforeAnimation();bones.torso.quaternion.copy(waistPose);
   bones.torso.getWorldQuaternion(worldQ);yawQ.setFromAxisAngle(up,aimYaw-group.rotation.y);worldQ.premultiply(yawQ);
   bones.torso.parent.getWorldQuaternion(parentQ).invert();bones.torso.quaternion.copy(parentQ.multiply(worldQ));bones.torso.updateMatrixWorld(true);
   ladderFold?.update(name,action.time,clips.get(name).duration);
  }
  aim?.update(dt,{active:firing,targets,enabled:['Idle','Walk','Fire'].includes(name),matricesReady:true});
  model.updateMatrixWorld(true);
 }
 function controlPoint(sign){const socket=bones['control_'+(sign>0?'L':'R')];return socket?socket.getWorldPosition(new THREE.Vector3()):bones.torso.localToWorld(controlTargets[sign>0?0:1].clone());}
 function alignGait(gait){if(name==='Walk'){action.time=(gait.phase%1)*clips.get(name).duration;mixer.update(0);}}
 function dispose(){lod.dispose();mixer.stopAllAction();mixer.uncacheRoot(model);materials.forEach(m=>m.dispose());const skins=new Set();model.traverse(o=>{if(o.isSkinnedMesh)skins.add(o.skeleton)});skins.forEach(s=>s.dispose());group.removeFromParent();}
 update(0,{clip:'Idle'});
 rise=point('pilot').y-2.32;
 controlTargets=[.29,-.29].map(x=>bones.torso.worldToLocal(group.localToWorld(new THREE.Vector3(x,2.85+rise,.22))));
 // Account for the lifted leg as well as its planted partner, so backward
 // steps bend the body before landing instead of overreaching the rigid rig.
 locomotion=createRigLocomotion(group,model,['L','R'].map(side=>({upper:bones['thigh_'+side],lower:bones['shin_'+side],foot:bones['foot_'+side]})),{mechanical:true,stride:.82,lift:.29,allFeetReach:true});
 strikeRig=createDoorStrikeRig(group,model,bones,locomotion);
 update(0);
 return {group,model,bones,mixer,clips,locomotion,rise,update,point,controlPoint,setHighlight,lod,aim,aimAtTargets,ladderFold,strikeRig,dispose};
}
