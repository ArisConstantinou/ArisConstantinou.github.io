import {createSkinnedBounds} from './arcade-skin-bounds.js';
import {createMeshLOD} from './arcade-render-lod.js';
import * as THREE from 'three';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {normalizeCharacter} from './arcade-character-classes.js';

// Assets and textures are shared; every actor owns its bind skeleton and mixer.
export function cartoonFrogFactory(assets,{distanceGeometries}={}){
 for(const [id,gltf] of Object.entries(assets)){
  const skins=[];gltf.scene.traverse(o=>{if(o.isSkinnedMesh)skins.push(o);});
  if(skins.length!==2||skins.some(s=>s.skeleton.bones.length!==49))throw Error('Μη έγκυρος σκελετός '+id);
 }
 return function createCartoonFrog(options={}){
  const id=normalizeCharacter(options.characterClass),gltf=assets[id],group=new THREE.Group(),flightPivot=new THREE.Group(),root=clone(gltf.scene),bones={},materials=[],skins=[];
  group.name='cartoon-'+id;flightPivot.name='cartoon-flight-pivot';group.add(flightPivot);flightPivot.add(root);
  root.traverse(o=>{if(o.isBone)bones[o.name]=o;if(o.isSkinnedMesh){skins.push(o);o.material=o.material.clone();o.castShadow=o.receiveShadow=true;o.frustumCulled=false;materials.push(o.material);}});
  group.updateMatrixWorld(true);
  const mesh=skins.reduce((a,b)=>a.geometry.attributes.position.count>b.geometry.attributes.position.count?a:b),skeleton=mesh.skeleton;
  for(const skin of skins)if(skin.skeleton!==skeleton){const duplicate=skin.skeleton;skin.bind(skeleton,skin.bindMatrix);duplicate.dispose();}
  const renderParts=skins.map(skin=>({skin,bounds:createSkinnedBounds(skin),lod:createMeshLOD(skin,distanceGeometries?.get(skin.geometry)||skin.geometry,{enter:44,exit:50})}));
  const restPose=Object.fromEntries(Object.entries(bones).map(([n,b])=>[n,{position:b.position.clone(),quaternion:b.quaternion.clone(),scale:b.scale.clone()}]));
  const mixer=new THREE.AnimationMixer(root),clips=Object.fromEntries(gltf.animations.map(c=>[c.name,c])),actions=Object.fromEntries(gltf.animations.map(c=>[c.name,mixer.clipAction(c)]));
  const restHeadWorld=bones.head.getWorldQuaternion(new THREE.Quaternion()),headAxis=new THREE.Vector3(1,0,0).applyQuaternion(restHeadWorld.invert()),offset=new THREE.Quaternion();
  let chosen='',clock=0,koClock=0,actor=options.actor,disposed=false,impactUntil=0,impactStrength=0,transition=null;
  const model={group,flightPivot,mesh,bones,skeleton,restPose,stats:{type:'frog',imported:true,cartoon:true,characterClass:id,vertices:skins.reduce((n,m)=>n+m.geometry.attributes.position.count,0),triangles:skins.reduce((n,m)=>n+m.geometry.index.count/3,0),bones:49,renderLOD:0},
   setEquipment(){},setCrowned(){},setRenderLOD(level){model.stats.qualityLOD=level;},setOutline(){},
   prepareRender(camera,width,height,enabled=true,mainView=true,{distance=true,culling=true}={}){let level=0,triangles=0;const forced=model.currentClip==='KO'||actor?.flight?.kind==='wallHold',keepOriginal=enabled&&renderParts.find(p=>p.skin===mesh).lod.keepOriginal(camera,width,height,forced);for(const p of renderParts){if(enabled&&!keepOriginal)p.bounds.update();p.skin.frustumCulled=enabled&&culling&&!keepOriginal;const selected=p.lod.apply(camera,width,height,{enabled:enabled&&distance&&!keepOriginal,box:p.bounds.box,forceOriginal:model.currentClip==='KO'||actor?.flight?.kind==='wallHold'});level=Math.max(level,selected);triangles+=p.skin.geometry.index.count/3;}if(mainView){model.stats.renderLOD=level;model.stats.drawnTriangles=triangles;}else{model.stats.reflectionLOD=level;model.stats.reflectionTriangles=triangles;}},
   setImpact({strength=0,duration=.26}={}){impactStrength=Math.min(1.5,Math.max(0,strength));impactUntil=clock+duration;},
   mouthWorld(target=new THREE.Vector3()){group.updateWorldMatrix(true,true);return bones.mouth.getWorldPosition(target);},
   aimPitch(angle){bones.head.quaternion.multiply(offset.setFromAxisAngle(headAxis,-angle*.7));},
   update(dt,state={}){
    clock+=Math.max(0,dt);koClock=state.dead?koClock+dt:0;let name='Idle',phase=null;
    if(state.menu){name='MenuPerformance';}
    else if(state.dead){name='KO';phase=Math.min(1,koClock/(clips.KO.duration||.8));}
    else if(actor?.hit>0){name='Hit';phase=1-actor.hit/.23;}
    else if(actor?.catapultId){name=actor.catapultAction>0?'OperateCatapult':'MountedIdle';phase=actor.catapultAction>0?1-actor.catapultAction/.87:null;}
    else if(actor?.classAction?.remaining>0&&!(actor.classAction.settled&&actor.flight)){const action=actor.classAction;if(action.kind==='bodySlam'&&action.settled){name='Land';phase=Math.min(1,(action.impactRemaining-action.remaining)/clips.Land.duration);}else {name=action.clip;phase=1-action.remaining/action.duration;}}
    else if(actor?.airSpit>0&&id==='medium'){name=actor.lastVolleyDouble?'StarVolley':'AirVolley';phase=1-actor.airSpit/.24;}
    else if(state.attack?.type==='kick'){name='ClassAttack';phase=state.attack.phase;}
    else if(state.hop?.phase==='air'){name=actor?.flight?.jumps>=2?'DoubleJump':'Jump';phase=state.hop.progress;}
    else if(state.hop?.phase==='land'){name='Land';phase=state.hop.progress;}
    else if(state.speed>.1){name='Walk';}
    if(!clips[name])throw Error('Λείπει κίνηση '+name+' στον '+id);
    if(chosen!==name){
     const weights=Object.fromEntries(Object.entries(actions).map(([key,action])=>[key,action.isScheduled()?action.getEffectiveWeight():0])),active=Object.values(weights).some(w=>w>0);
     chosen=name;actions[name].reset().setLoop(THREE.LoopOnce,0);actions[name].clampWhenFinished=true;actions[name].paused=true;actions[name].play();
     transition=active?{start:clock,duration:name==='Hit'?.045:name==='KO'?.065:.10,weights}:null;
    }
    const clip=clips[name];actions[name].time=phase===null?clock%clip.duration:THREE.MathUtils.clamp(phase,0,1)*clip.duration;
    let blend=transition?THREE.MathUtils.clamp((clock-transition.start)/transition.duration,0,1):1;blend=blend*blend*(3-2*blend);
    for(const [key,action] of Object.entries(actions)){const weight=transition?(transition.weights[key]||0)*(1-blend)+(key===name?blend:0):key===name?1:0;if(weight>1e-5){action.enabled=true;action.paused=true;action.setEffectiveWeight(weight);action.play();}else if(action.isScheduled())action.stop();}
    if(blend>=1)transition=null;mixer.update(0);model.animationWeights=Object.fromEntries(Object.entries(actions).filter(([,action])=>action.isScheduled()).map(([key,action])=>[key,action.getEffectiveWeight()]));
    for(const material of materials){material.emissive.set('#ffdba3');material.emissiveIntensity=clock<impactUntil?Math.min(.38,impactStrength*.38):0;}
    model.ownsLimbPose=!!actor?.classAction?.remaining;model.currentClip=name;
   },
   dispose(){if(disposed)return;disposed=true;mixer.stopAllAction();mixer.uncacheRoot(root);for(const sk of new Set(skins.map(s=>s.skeleton)))sk.dispose();for(const material of materials)material.dispose();group.removeFromParent();},
  };
  model.update(0);return model;
 };
}
