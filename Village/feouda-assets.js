import * as THREE from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
import {clone as cloneSkeleton} from './vendor/SkeletonUtils.js';

// Models and all of their textures are served from this game's own repository.
// A failed optional download never prevents a saved campaign from opening.
const manifestURL=new URL('./assets/models/manifest.json',import.meta.url);
const up=new THREE.Vector3(1,0,0),turn=new THREE.Quaternion(),bounds=new THREE.Box3();
const safe=(n,fallback)=>Number.isFinite(n)?n:fallback;

function inspect(gltf){
 let triangles=0,meshes=0,skinnedMeshes=0;const materials=new Set(),textures=new Set();
 gltf.scene.traverse(o=>{if(!o.isMesh)return;meshes++;if(o.isSkinnedMesh)skinnedMeshes++;triangles+=(o.geometry.index?.count||o.geometry.attributes.position?.count||0)/3;for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);for(const key of ['map','normalMap','roughnessMap','metalnessMap','emissiveMap'])if(m?.[key])textures.add(m[key]);}});
 return{triangles:Math.round(triangles),meshes,skinnedMeshes,materials:materials.size,textures:textures.size,animations:gltf.animations.map(a=>({name:a.name,duration:+a.duration.toFixed(3)}))};
}

function normalize(gltf,spec,dimensions={}){
 const content=gltf.scene.userData.hasSkin?cloneSkeleton(gltf.scene):gltf.scene.clone(true);
 const root=new THREE.Group();root.name='asset:'+spec.id;root.userData.assetId=spec.id;root.userData.assetKind=spec.kind;root.userData.dynamic=true;root.add(content);
 content.rotation.y+=safe(spec.forwardYaw,0);content.updateMatrixWorld(true);
 // A rotated source building needs vertex bounds: rotating its local AABB can
 // invent a floor below the mesh and leave the imported architecture floating.
 bounds.setFromObject(content,spec.kind==='building');
 const size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
 const factors=[];
 if(dimensions.height)factors.push(dimensions.height/Math.max(.001,size.y));
 if(dimensions.width)factors.push(dimensions.width/Math.max(.001,size.x));
 if(dimensions.depth)factors.push(dimensions.depth/Math.max(.001,size.z));
 // Some animated machines and mounts are already fitted to a measured swept
 // collision envelope. Recentering their idle pose would invalidate that fit.
 const authored=spec.normalization==='authored',factor=authored?safe(spec.scale,1):factors.length?Math.min(...factors):safe(spec.scale,1);
 if(!authored){content.position.x-=center.x;content.position.y-=bounds.min.y;content.position.z-=center.z;}
 const normalized=new THREE.Group();normalized.scale.setScalar(factor);root.remove(content);normalized.add(content);root.add(normalized);
 root.traverse(o=>{if(!o.isMesh)return;o.castShadow=true;o.receiveShadow=true;o.userData.sharedAsset=true;});
 root.userData.dimensions={width:size.x*factor,height:size.y*factor,depth:size.z*factor};root.userData.normalized=normalized;
 return root;
}

export function createAssetLibrary({software=false,onStatus=()=>{},onAsset=()=>{}}={}){
 const assets=new Map(),failures=[],loader=new GLTFLoader();let status='loading',total=0,loaded=0,disposed=false;
 const report=()=>onStatus({phase:status,total,loaded,failed:failures.map(f=>({...f})),software});
 const ready=(async()=>{
  if(software){status='compatibility';report();return;}
  try{
   const response=await fetch(manifestURL);if(!response.ok)throw new Error('Model manifest '+response.status);
   const manifest=await response.json(),items=Array.isArray(manifest.assets)?manifest.assets:[];total=items.length;report();
   // Limit simultaneous GLB decode work on phones, without serialising downloads.
   const queue=[...items];const worker=async()=>{while(queue.length&&!disposed){const spec=queue.shift();try{
    if(!spec.id||!spec.file||!spec.kind)throw new Error('Invalid model manifest entry');
    const url=new URL(spec.file,manifestURL),gltf=await loader.loadAsync(url.href);if(disposed)return;
    const info=inspect(gltf);gltf.scene.userData.hasSkin=info.skinnedMeshes>0;
    gltf.scene.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material]){if(!m)continue;m.envMapIntensity=safe(spec.environmentIntensity,.55);for(const key of ['map','normalMap','roughnessMap','metalnessMap','emissiveMap'])if(m[key])m[key].anisotropy=4;}});
    assets.set(spec.id,{spec,gltf,info});loaded++;onAsset(spec.id);report();
   }catch(error){failures.push({id:spec.id||spec.file,message:String(error.message||error)});report();}}};
   await Promise.all([worker(),worker(),worker()]);
  }catch(error){failures.push({id:'manifest',message:String(error.message||error)});}
  status=failures.length?'partial':'ready';report();
 })();
 function match(kind,type,variant=0){const list=[...assets.values()].filter(a=>a.spec.kind===kind&&(a.spec.types?.includes(type)||a.spec.type===type||a.spec.id===type));return list.length?list[Math.abs(variant|0)%list.length]:null;}
 function create(kind,type,dimensions={},variant=0){const asset=match(kind,type,variant);if(!asset)return null;const object=normalize(asset.gltf,asset.spec,dimensions);object.userData.assetStats=asset.info;return object;}
 function createModule(name,dimensions={}){
  const asset=[...assets.values()].find(a=>a.spec.kind==='fortress'&&a.spec.modular&&a.gltf.scene.getObjectByName(name));if(!asset)return null;
  const source=asset.gltf.scene.getObjectByName(name),content=source.clone(true),object=new THREE.Group();
  content.position.set(0,0,0);content.rotation.set(0,0,0);content.scale.set(1,1,1);content.updateMatrixWorld(true);bounds.setFromObject(content);
  const size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());content.position.set(-center.x,-bounds.min.y,-center.z);
  const sizing=new THREE.Group();sizing.scale.set((dimensions.width||size.x)/size.x,(dimensions.height||size.y)/size.y,(dimensions.depth||size.z)/size.z);sizing.add(content);object.add(sizing);
  object.name='module:'+name;object.userData.assetId=asset.spec.id;object.userData.assetModule=name;object.userData.dynamic=true;object.userData.dimensions={width:dimensions.width||size.x,height:dimensions.height||size.y,depth:dimensions.depth||size.z};
  object.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;o.userData.sharedAsset=true;}});return object;
 }
 function createAnimated(kind,type,dimensions={},variant=0){
  const asset=match(kind,type,variant);if(!asset)return null;
  const object=normalize(asset.gltf,asset.spec,dimensions),mixer=new THREE.AnimationMixer(object),clips=asset.gltf.animations,named=new Map();object.traverse(node=>{if(node.name)named.set(node.name.toLowerCase(),node);});
  const configured=asset.spec.clips||{},findClip=(name,expression)=>clips.find(c=>c.name===configured[name])||clips.find(c=>expression.test(c.name));
  const idle=findClip('idle',/idle|stand/i)||clips[0],walk=findClip('walk',/^walk$|walk/i),trot=findClip('trot',/trot|gallop|run/i),attack=findClip('attack',/attack|fire|throw/i);
  const aliases={idle,walk,trot,attack},actions=new Map(clips.map(c=>[c.name,mixer.clipAction(c)]));let active=null,activeTime=0,activeLoop=true;
  function poseClip(name,time=0,loop=true){
   const clip=aliases[name]||clips.find(c=>c.name===name);if(!clip)return false;const action=actions.get(clip.name);
   if(active!==clip.name){mixer.stopAllAction();action.reset().play();active=clip.name;}action.paused=false;action.enabled=true;action.clampWhenFinished=!loop;action.setLoop(loop?THREE.LoopRepeat:THREE.LoopOnce,loop?Infinity:1);
   activeTime=loop?((time%clip.duration)+clip.duration)%clip.duration:THREE.MathUtils.clamp(time,0,clip.duration);activeLoop=loop;mixer.setTime(activeTime);object.updateMatrixWorld(true);return true;
  }
  const socketPoint=new THREE.Vector3();function socketLocal(name,target){const raw=asset.spec.sockets?.[name]||name,node=named.get(raw.toLowerCase())||[...named.values()].find(n=>n.name.toLowerCase().endsWith(':'+raw.toLowerCase()));if(!node)return null;node.getWorldPosition(socketPoint);target.copy(object.worldToLocal(socketPoint));const offset=asset.spec.socketOffsets?.[name];if(offset)target.add(new THREE.Vector3(...offset));return target;}
  object.userData.softwareDynamic=true;object.userData.animationInfo={idle:idle?.name,walk:walk?.name,trot:trot?.name,attack:attack?.name,idleDuration:idle?.duration||0,walkDuration:walk?.duration||0,trotDuration:trot?.duration||0,strideLength:{...asset.spec.strideLength},attackDuration:attack?.duration||0,releaseAt:safe(asset.spec.releaseAt,(attack?.duration||1)*.32),reloadAt:safe(asset.spec.reloadAt,(attack?.duration||1)*.85),loadedObject:asset.spec.loadedObject||null,sockets:{...asset.spec.sockets}};
  object.userData.animate=(time,attacking=false,moving=false)=>{const name=attacking&&attack?'attack':moving?(trot?'trot':walk?'walk':'idle'):'idle';poseClip(name,time,true);};
  object.userData.poseClip=poseClip;object.userData.socketLocal=socketLocal;
  object.userData.setNodeVisible=(name,visible)=>{const node=named.get(name?.toLowerCase());if(node)node.visible=visible;};
  object.userData.socketAt=(clip,time,name,target)=>{const previous={active,time:activeTime,loop:activeLoop};if(!poseClip(clip,time,false))return null;const result=socketLocal(name,target);if(previous.active)poseClip(previous.active,previous.time,previous.loop);return result;};
  object.userData.animationState=()=>({clip:active,time:activeTime,loop:activeLoop});
  object.userData.disposeAnimation=()=>{mixer.stopAllAction();mixer.uncacheRoot(object);};if(idle)poseClip('idle',0);return object;
 }
 function createCharacter(type,{height=1.9,variant=0}={}){
  const asset=match('unit',type,variant);if(!asset)return null;
  const object=normalize(asset.gltf,asset.spec,{height});object.userData.softwareDynamic=true;
  const mixer=new THREE.AnimationMixer(object),clips=asset.gltf.animations,idle=clips.find(c=>/idle/i.test(c.name))||clips[0],walk=clips.find(c=>/walk|march|run/i.test(c.name));
  const actions={idle:idle?mixer.clipAction(idle):null,walk:walk?mixer.clipAction(walk):null};actions.idle?.play();
  const bones={},rest=new Map();object.traverse(o=>{if(o.isBone){bones[o.name.replace(/^mixamorig[:_]?/i,'').toLowerCase()]=o;rest.set(o,{position:o.position.clone(),quaternion:o.quaternion.clone(),scale:o.scale.clone()});}});
  const bone=name=>bones[name.toLowerCase()],rotate=(name,angle)=>{const b=bone(name);if(b)b.quaternion.multiply(turn.setFromAxisAngle(up,angle));};
  const jointAxis=new THREE.Vector3(),parentRotation=new THREE.Quaternion(),objectRotation=new THREE.Quaternion();
  function pose(name,axis,angle){const b=bone(name);if(!b)return;object.updateMatrixWorld(true);object.getWorldQuaternion(objectRotation);b.parent.getWorldQuaternion(parentRotation).invert();jointAxis.copy(axis).applyQuaternion(objectRotation).applyQuaternion(parentRotation).normalize();b.quaternion.premultiply(turn.setFromAxisAngle(jointAxis,angle));}
  const sagittal=new THREE.Vector3(1,0,0),frontal=new THREE.Vector3(0,0,1),localHand=new THREE.Vector3(),footPoint=new THREE.Vector3();
  const lowestFoot=()=>{let y=Infinity;for(const name of ['LeftFoot','LeftToeBase','RightFoot','RightToeBase']){const b=bone(name);if(!b)continue;b.getWorldPosition(footPoint);y=Math.min(y,object.worldToLocal(footPoint).y);}return Number.isFinite(y)?y:0;};
  object.updateMatrixWorld(true);const footRest=lowestFoot();let mode='idle';
  return{object,assetId:asset.spec.id,info:asset.info,
   socket(name,target){const b=bone(({left:'LeftHand',right:'RightHand',hips:'Hips',head:'Head',leftFoot:'LeftFoot',rightFoot:'RightFoot'})[name]||name);if(!b)return target.set(name==='left'?-.37:.37,1.06,.05);b.getWorldPosition(localHand);return target.copy(object.worldToLocal(localHand));},
   update({time=0,phase=time*7,walking=false,attacking=false,role=type}={}){
    const next=walking&&actions.walk?'walk':'idle';if(next!==mode){actions[mode]?.stop();actions[next]?.play();mode=next;}
    if(actions.walk&&walking)mixer.setTime(time+(variant%7)*.217);
    else{
     // The source idle is a display pose with open arms. Restore the real rig
     // and pose it as a working person, then add a grounded opposing-limb gait.
     for(const [b,t]of rest){b.position.copy(t.position);b.quaternion.copy(t.quaternion);b.scale.copy(t.scale);}object.userData.normalized.position.y=0;
     pose('RightArm',frontal,.79);pose('LeftArm',frontal,-.79);
     if(walking){const swing=Math.sin(phase),opposite=-swing;pose('LeftUpLeg',sagittal,swing*.36);pose('RightUpLeg',sagittal,opposite*.36);pose('LeftLeg',sagittal,Math.max(0,-swing)*.55);pose('RightLeg',sagittal,Math.max(0,-opposite)*.55);pose('LeftArm',sagittal,-swing*.26);pose('RightArm',sagittal,swing*.26);}
     if(role==='archer'){pose('LeftArm',sagittal,-.5);pose('LeftForeArm',sagittal,-.55);pose('RightForeArm',sagittal,-.7);}
     else if(role==='sword'||role==='spear'||role==='cavalry'){pose('RightForeArm',sagittal,-.72);pose('LeftForeArm',sagittal,-.8);}
     if(role==='cavalry'){pose('LeftUpLeg',sagittal,-1.05);pose('RightUpLeg',sagittal,-1.05);pose('LeftUpLeg',frontal,.4);pose('RightUpLeg',frontal,-.4);pose('LeftLeg',sagittal,1.25);pose('RightLeg',sagittal,1.25);}
     if(attacking){pose('RightArm',sagittal,-.35+Math.sin(time*5)*.58);pose('Spine',frontal,Math.sin(time*5)*.035);}
     pose('Spine02',sagittal,Math.sin(time*1.5+variant)*.008);
     object.updateMatrixWorld(true);if(role!=='cavalry')object.userData.normalized.position.y+=footRest-lowestFoot();
    }
    object.updateMatrixWorld(true);
   },
   dispose(){mixer.stopAllAction();mixer.uncacheRoot(object);object.removeFromParent();}
  };
 }
 return{ready,create,createModule,createAnimated,createCharacter,has:(kind,type)=>!!match(kind,type),getSpec:(kind,type)=>match(kind,type)?.spec||null,
  getStats(){return{phase:status,total,loaded,failed:failures.map(f=>({...f})),models:[...assets.values()].map(a=>({id:a.spec.id,file:a.spec.file,kind:a.spec.kind,...a.info}))};},
  dispose(){disposed=true;for(const {gltf}of assets.values())gltf.scene.traverse(o=>{if(!o.isMesh)return;o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material]){for(const key of ['map','normalMap','roughnessMap','metalnessMap','emissiveMap'])m[key]?.dispose();m.dispose();}});assets.clear();}
 };
}
