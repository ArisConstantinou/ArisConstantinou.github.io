import * as THREE from 'three';

// Overlay real mechanical contacts on the existing, independently owned mage rig.
// Animation clips still supply the torso/head; world targets use the suit's frame.
export function poseHearthPilot(visual,suit,{climbing=false,progress=0}={}){
 let bones=visual.group.userData.hearthPilotBones;
 if(!bones){bones={};visual.group.traverse(o=>{if(o.isBone)bones[o.name]=o;});visual.group.userData.hearthPilotBones=bones;}
 const getBone=name=>bones[name]||bones[name.replaceAll('.','')]; // GLTFLoader sanitizes dots.
 visual.group.updateMatrixWorld(true);suit.group.updateMatrixWorld(true);
 const worldPoint=(x,y,z)=>suit.group.localToWorld(new THREE.Vector3(x,y,z));
 const targets=[];
 function solve(chain,endName,target){
  const end=getBone(endName);if(!end)throw new Error('Missing pilot bone '+endName);
  for(let pass=0;pass<12;pass++)for(const name of chain){
   const bone=getBone(name),joint=bone.getWorldPosition(new THREE.Vector3()),tip=end.getWorldPosition(new THREE.Vector3());
   const from=tip.sub(joint),to=target.clone().sub(joint);if(from.lengthSq()<1e-8||to.lengthSq()<1e-8)continue;
   const delta=new THREE.Quaternion().setFromUnitVectors(from.normalize(),to.normalize());
   const rotation=bone.getWorldQuaternion(new THREE.Quaternion()).premultiply(delta);
   bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(rotation)).normalize();
   bone.updateMatrixWorld(true);
  }
  targets.push({bone:endName,target:target.toArray(),actual:end.getWorldPosition(new THREE.Vector3()).toArray(),error:end.getWorldPosition(new THREE.Vector3()).distanceTo(target)});
 }
 for(const side of ['l','r']){
  const upper=getBone('upperarm.'+side);if(!upper)throw new Error('Missing pilot upper arm '+side);
  const local=suit.group.worldToLocal(upper.getWorldPosition(new THREE.Vector3()));const sign=local.x>=0?1:-1;
  if(climbing){
   const step=.274,height=.05+2.27*progress;
   const rung=Math.max(0,Math.min(8,Math.ceil((height-.05)/step)));
   const footY=.05+Math.min(8,rung+(side==='l'?0:1))*step;
   const footZ=-1.32+(footY-.04)*(.56/2.4);
   solve(['lowerleg.'+side,'upperleg.'+side],'foot.'+side,worldPoint(sign*.12,footY,footZ));
   const handY=Math.min(2.44,.05+Math.round((height+.55)/step)*step);
   const handZ=-1.32+(handY-.04)*(.56/2.4);
   solve(['lowerarm.'+side,'upperarm.'+side],'hand.'+side,worldPoint(sign*.26,handY,handZ));
  }else solve(['lowerarm.'+side,'upperarm.'+side],'hand.'+side,worldPoint(sign*.29,2.85,.22));
 }
 visual.group.updateMatrixWorld(true);visual.group.userData.hearthPilotContacts=targets;return targets;
}
