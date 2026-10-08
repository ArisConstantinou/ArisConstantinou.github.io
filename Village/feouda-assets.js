import * as THREE from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
import {clone as cloneSkeleton} from './vendor/SkeletonUtils.js';
import {loadHumanMotion,installHumanMorphs,createHumanAnimator} from './feouda-human-motion.js?v=2.4.0';

// Models and all of their textures are served from this game's own repository.
// A failed optional download never prevents a saved campaign from opening.
const manifestURL=new URL('./assets/models/manifest.json',import.meta.url);
const bounds=new THREE.Box3();
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
 let humanMotion=null;const motionReady=software?Promise.resolve():loadHumanMotion().then(value=>{humanMotion=value;}).catch(error=>{failures.push({id:'human-motion',message:String(error.message||error)});});
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
   await Promise.all([worker(),worker(),worker(),motionReady]);
   for(const asset of assets.values()){const motion=humanMotion?.models.get(asset.spec.id);if(asset.spec.kind==='unit'&&motion){try{installHumanMorphs(asset.gltf.scene,motion);asset.motion=motion;asset.info.motionClips=[...motion.clips].map(([name,c])=>({name,duration:+c.duration.toFixed(3),stride:c.stride}));}catch(error){failures.push({id:asset.spec.id+'-motion',message:String(error.message||error)});}}}
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
  const asset=match('unit',type,variant);if(!asset?.motion)return null;
  const object=normalize(asset.gltf,asset.spec,{height});
  return createHumanAnimator(object,asset.motion,{variant,role:type,assetId:asset.spec.id,info:asset.info});
 }

 return{ready,create,createModule,createAnimated,createCharacter,has:(kind,type)=>!!match(kind,type),getSpec:(kind,type)=>match(kind,type)?.spec||null,
  getStats(){return{phase:status,total,loaded,failed:failures.map(f=>({...f})),models:[...assets.values()].map(a=>({id:a.spec.id,file:a.spec.file,kind:a.spec.kind,...a.info}))};},
  dispose(){disposed=true;for(const {gltf}of assets.values())gltf.scene.traverse(o=>{if(!o.isMesh)return;o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material]){for(const key of ['map','normalMap','roughnessMap','metalnessMap','emissiveMap'])m[key]?.dispose();m.dispose();}});assets.clear();}
 };
}
