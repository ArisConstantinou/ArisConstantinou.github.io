import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {createStompClip} from './hearth-stomp.js';
let template;
export async function loadHearth(){template=await new GLTFLoader().loadAsync(new URL('models/hearth-bulwark/hearth-bulwark.glb',document.baseURI).href);}
export function createHearth(){
 const group=new THREE.Group(),model=clone(template.scene);model.rotation.y=Math.PI;group.add(model);
 const materials=[],bones={};
 model.traverse(o=>{if(o.isBone)bones[o.name]=o;if(o.isMesh){o.castShadow=o.receiveShadow=true;const copy=m=>{const n=m.clone();materials.push(n);return n;};o.material=Array.isArray(o.material)?o.material.map(copy):copy(o.material);}});
 const mixer=new THREE.AnimationMixer(model),clips=new Map(template.animations.map(c=>[c.name,c]));let action,name='';
 clips.set('Stomp',createStompClip(model,bones,clips.get('Idle')));
 function update(dt,{clip='Sleep',time,fuel=0}={}){
  if(clip!==name){const next=mixer.clipAction(clips.get(clip));if(Number.isFinite(time))mixer.stopAllAction();next.reset().setEffectiveWeight(1).setLoop(['Sleep','Idle','Walk','Fire'].includes(clip)?THREE.LoopRepeat:THREE.LoopOnce,Infinity);next.clampWhenFinished=true;next.play();if(action&&!Number.isFinite(time))next.crossFadeFrom(action,.12,false);action=next;name=clip;}
  mixer.update(dt);if(Number.isFinite(time)){action.time=Math.min(time,clips.get(clip).duration);mixer.update(0);}
  // The folded ladder is stored in the back until the pilot uses it.
  bones.ladder.scale.setScalar(['Board','Exit'].includes(clip)?1:.001);
  for(const m of materials)if(m.name==='Heart embers')m.emissiveIntensity=fuel>0?1.8:0;
  group.userData.animationState=name;model.updateMatrixWorld(true);
 }
 function point(socket,tail=0){const b=bones[socket];return b.localToWorld(new THREE.Vector3(0,tail,0));}
 function dispose(){mixer.stopAllAction();mixer.uncacheRoot(model);materials.forEach(m=>m.dispose());const skins=new Set();model.traverse(o=>{if(o.isSkinnedMesh)skins.add(o.skeleton)});skins.forEach(s=>s.dispose());group.removeFromParent();}
 update(0);
 return {group,model,bones,mixer,clips,update,point,dispose};
}
