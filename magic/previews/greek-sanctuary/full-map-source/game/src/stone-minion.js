import * as THREE from 'three';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';
import {createLocalRigLoader} from './local-rig-loader.js';
import {prepareRigSurface} from './rig-surface-preparation.js';
import {createStreamedRigLod} from './streamed-rig-lod.js';
import {createRigLocomotion} from './locomotion.js';
import {STONE_MINION} from './stone-minion-combat.js';

const HEIGHT=STONE_MINION.height;
const DISTANCE_FILE='models/redesign/stone-minion-1-6-1-lods.glb';
const FAR_FILE='models/redesign/stone-minion-1-6-1-far.glb';
const NORMAL_FILE='models/redesign/stone-minion-1-6-1-normal.glb';
const CLOSE_FILE='models/redesign/stone-minion-1-6-1-close.glb';
const CLIPS=['Idle','Stalk','ClawRight','ClawLeft','RitualSpawn','Stun','Death'];
let templatePromise;
function assetUrl(file){const base=import.meta.env?.BASE_URL||'./';return new URL((base.endsWith('/')?base:base+'/')+file,document.baseURI).href}

export function loadStoneMinion({camera,viewportHeight=globalThis.innerHeight||1000}={}){
  if(!templatePromise){
    const {loader,disposeDecoder}=createLocalRigLoader();
    // Conservative upper bound: a large first view gets the complete tested
    // distance bundle before gameplay; ordinary far views fetch only4.1MB.
    const needsNormal=camera?.isOrthographicCamera&&HEIGHT*camera.zoom*viewportHeight/(camera.top-camera.bottom)>=85;
    const primaryFile=needsNormal?DISTANCE_FILE:FAR_FILE;
    templatePromise=loader.loadAsync(assetUrl(primaryFile)).then(async gltf=>{
      const clips=new Map(gltf.animations.map(clip=>[clip.name,clip]));
      if(!CLIPS.every(name=>clips.has(name)))throw Error('Stone minion lacks a required source action');
      for(const [name,duration] of [['ClawRight',STONE_MINION.attackDuration],['ClawLeft',STONE_MINION.attackDuration],['RitualSpawn',STONE_MINION.spawnDuration]]){
        if(Math.abs(clips.get(name).duration-duration)>1e-5)throw Error('Stone minion AI/source timing mismatch: '+name);
      }
      await prepareRigSurface(gltf.scene);
      return {scene:gltf.scene,clips,primaryFile};
    }).finally(disposeDecoder).catch(error=>{templatePromise=null;throw error});
  }
  return templatePromise;
}

/** Detailed hostile variant. Loading never displays a primitive replacement.
 * The allied seven-stone assembly keeps its separate existing implementation.
 * Source attack time is in seconds, with nominal contact at .59 of 1.14s.
 */
export function createStoneMinion(){
  const group=new THREE.Group();group.name='Hostile violet stone minion';
  group.userData.characterHeight=HEIGHT;group.userData.allegiance='enemy';
  group.userData.sourceAttack={contact:STONE_MINION.contact,duration:STONE_MINION.attackDuration};
  const parts=new Map(),materials=new Set(),skeletons=new Set(),actions=new Map();
  let model,mixer,lod,locomotion,template,current,currentName='',disposed=false,wasDead=false,wasStunned=false,lastPose;
  const lastPosition=new THREE.Vector3(),position=new THREE.Vector3();let positionInitialized=false;
  const bones=new Map();
  function play(name,{once=false,restart=false,fade=.12,speed=1}={}){
    if(name===currentName&&!restart){current.setEffectiveTimeScale(speed);return current}
    let next=actions.get(name);
    if(!next){next=mixer.clipAction(template.clips.get(name));actions.set(name,next)}
    next.reset().setEffectiveTimeScale(speed).setEffectiveWeight(1).setLoop(once?THREE.LoopOnce:THREE.LoopRepeat,once?1:Infinity);
    next.clampWhenFinished=once;next.play();
    if(current&&current!==next){if(fade>0)next.crossFadeFrom(current,fade,false);else current.stop()}
    current=next;currentName=name;group.userData.animationState=name;return next;
  }
  const api={group,parts,height:HEIGHT,get model(){return model},get readyState(){return Boolean(model)&&!disposed},
    pose(mode='stand',time=0){
      if(disposed)return;
      if(!model){lastPose=[mode,time];return}
      const name={stand:'Idle',idle:'Idle',walk:'Stalk',clawRight:'ClawRight',clawLeft:'ClawLeft',spawn:'RitualSpawn',stun:'Stun',death:'Death'}[mode]||mode;
      if(!template.clips.has(name))throw Error('Unknown stone minion pose '+mode);
      locomotion.beforeAnimation();const action=play(name,{once:!['Idle','Stalk'].includes(name),fade:0,restart:true});
      action.time=Math.max(0,Math.min(time,action.getClip().duration-1e-6));mixer.update(0);group.updateMatrixWorld(true);
      for(const skeleton of skeletons)skeleton.update();
    },
    animate(dt,{attack=0,attackSide=1,dead=false,stunned=false,spawning=false,camera=null,grounded=true}={}){
      if(disposed||!model)return null;
      const step=THREE.MathUtils.clamp(Number.isFinite(dt)?dt:0,0,.1);
      locomotion.beforeAnimation();group.getWorldPosition(position);
      const speed=positionInitialized&&step>0?Math.hypot(position.x-lastPosition.x,position.z-lastPosition.z)/step:0;
      lastPosition.copy(position);positionInitialized=true;
      if(dead)play('Death',{once:true,restart:!wasDead,fade:.09});
      else if(stunned)play('Stun',{once:true,restart:!wasStunned,fade:.07});
      else if(spawning)play('RitualSpawn',{once:true,fade:.08});
      else if(attack>0)play(attackSide>0?'ClawRight':'ClawLeft',{once:true,fade:.06});
      else play(speed>.03?'Stalk':'Idle',{speed:speed>.03?Math.max(.5,Math.min(2,speed/1.4)):1});
      mixer.update(step);
      if(!dead&&!stunned&&!spawning&&typeof attack==='number'&&attack>0){current.time=Math.min(attack,current.getClip().duration-1e-6);mixer.update(0)}
      locomotion.update(step,{grounded,dead,airborne:!grounded||spawning});
      lod.update(camera);group.updateMatrixWorld(true);wasDead=dead;wasStunned=stunned;
      return {speed,animation:currentName,...locomotion.snapshot()};
    },
    clawPosition(side,out=new THREE.Vector3()){
      const bone=bones.get(side==='l'?'ClawSocketl':'ClawSocketr');
      if(!bone)return null;group.updateMatrixWorld(true);return bone.getWorldPosition(out);
    },
    reset(){
      if(!model||disposed)return;
      locomotion.reset();mixer.stopAllAction();current=null;currentName='';wasDead=wasStunned=positionInitialized=false;
      play('Idle',{fade:0});mixer.update(0);group.updateMatrixWorld(true);
    },
    dispose(){
      if(disposed)return;disposed=true;lod?.dispose();mixer?.stopAllAction();if(model)mixer.uncacheRoot(model);
      for(const material of materials)material.dispose();for(const skeleton of skeletons)skeleton.dispose();
      materials.clear();skeletons.clear();parts.clear();actions.clear();bones.clear();
      group.clear();group.removeFromParent();
      model=mixer=lod=locomotion=template=current=lastPose=null;currentName='';
    }
  };
  api.ready=loadStoneMinion().then(loaded=>{
    if(disposed)return api;
    template=loaded;model=cloneSkeleton(template.scene);model.name='Stone minion source visual';
    const clonedMaterials=new Map(),sharedSkeletons=[];
    model.traverse(object=>{
      if(object.isBone)bones.set(object.name,object);
      if(!object.isMesh)return;object.castShadow=object.receiveShadow=true;object.frustumCulled=false;
      if(template.primaryFile===FAR_FILE&&object.name==='STONE_MINION_RUNTIME')object.name='STONE_MINION_LOD2';
      function material(source){if(!clonedMaterials.has(source)){const copy=source.clone();clonedMaterials.set(source,copy);materials.add(copy)}return clonedMaterials.get(source)}
      object.material=Array.isArray(object.material)?object.material.map(material):material(object.material);
      if(object.isSkinnedMesh){const skin=object.skeleton,same=sharedSkeletons.find(other=>other.bones.length===skin.bones.length&&other.bones.every((bone,i)=>bone===skin.bones[i]&&other.boneInverses[i].equals(skin.boneInverses[i])));
        if(same){if(skin!==same)skin.dispose();object.skeleton=same}else{sharedSkeletons.push(skin);skeletons.add(skin)}}
    });
    for(const name of ['upperlegl','lowerlegl','footl','upperlegr','lowerlegr','footr','ClawSocketl','ClawSocketr'])if(!bones.has(name))throw Error('Missing stone minion joint '+name);
    mixer=new THREE.AnimationMixer(model);group.add(model);play('Idle',{fade:0});mixer.update(0);group.updateMatrixWorld(true);
    for(const [label,name] of [['Head','head'],['Chest','chest'],['Pelvis','hips'],['Left arm','upperarml'],['Right arm','upperarmr'],['Left leg','upperlegl'],['Right leg','upperlegr']])parts.set(label,{root:bones.get(name)});
    locomotion=createRigLocomotion(group,model,['l','r'].map(side=>({upper:bones.get('upperleg'+side),lower:bones.get('lowerleg'+side),foot:bones.get('foot'+side)})),{continuous:true,stride:.44,lift:.055,sway:.02,allFeetReach:true});
    lod=createStreamedRigLod(group,model,{height:HEIGHT,normalFile:assetUrl(NORMAL_FILE),closeFile:assetUrl(CLOSE_FILE),farPixels:100});
    group.userData.primaryRigFile=template.primaryFile;
    group.userData.sourceRig={bones:bones.size,clips:CLIPS,role:'hostile stone minion',nativeAIIntegrated:false};
    if(lastPose){api.pose(...lastPose);lastPose=null}
    return api;
  }).catch(error=>{group.userData.modelLoadError=error.message;throw error});
  return api;
}
