import * as THREE from 'three';
import {createLocalRigLoader} from './local-rig-loader.js';
import {prepareRigSurface} from './rig-surface-preparation.js';
import {createRigLod,rigLodLevel} from './rig-lod.js';

const normalTemplates=new Map();
function loadNormalSurface(url){
 if(!normalTemplates.has(url)){
  const {loader,disposeDecoder}=createLocalRigLoader();
  normalTemplates.set(url,loader.loadAsync(url).then(async gltf=>{await prepareRigSurface(gltf.scene);return gltf}).finally(disposeDecoder));
 }
 return normalTemplates.get(url);
}

/** Same accepted surfaces/thresholds, with far-only startup where sufficient.
 * Normal surfaces bind to the actor's live bones; their source rig is never
 * attached as a second animated hierarchy. Large initial views keep the bundle.
 */
export function createStreamedRigLod(group,model,{height,normalFile,closeFile,farPixels=100,loadSurface=loadNormalSurface}){
 let hasNormal=false;model.traverse(o=>{if(o.isMesh&&rigLodLevel(o,model)===1)hasNormal=true});
 if(hasNormal){group.userData.normalRigLoaded=true;return createRigLod(group,model,{height,closeFile,farPixels})}
 const nodes=new Map(),bones=new Map(),actorSkeletons=[];
 model.traverse(o=>{nodes.set(o.name,o);if(o.isBone)bones.set(o.name,o);if(o.isSkinnedMesh&&!actorSkeletons.includes(o.skeleton))actorSkeletons.push(o.skeleton)});
 const meshes=[],materials=new Set(),ownedSkeletons=new Set();
 const bottom=new THREE.Vector3(),top=new THREE.Vector3(),scale=new THREE.Vector3(),sphere=new THREE.Sphere(),frustum=new THREE.Frustum(),projection=new THREE.Matrix4();
 let delegate,requested=false,disposed=false,logicalLevel=1;
 group.userData.normalRigLoaded=false;group.userData.redesignLod=2;
 function install(gltf){
  if(disposed)return;
  const sourceMeshes=[];gltf.scene.traverse(o=>{if(o.isMesh)sourceMeshes.push(o)});
  for(const source of sourceMeshes)if(source.isSkinnedMesh)for(const bone of source.skeleton.bones)if(!bones.has(bone.name))throw Error('Streamed normal surface missing live joint '+bone.name);
  for(const source of sourceMeshes){
   const mesh=source.clone(false),parent=nodes.get(source.parent?.name)||model;
   if(parent.isMesh)throw Error('Normal surface cannot attach beneath another LOD mesh');
   mesh.name=source.name+'_streamedNormal';
   if(source.isSkinnedMesh){
    const targetBones=source.skeleton.bones.map(b=>bones.get(b.name)),inverses=source.skeleton.boneInverses;
    let skeleton=actorSkeletons.find(s=>s.bones.length===targetBones.length&&s.bones.every((b,i)=>b===targetBones[i]&&s.boneInverses[i].equals(inverses[i])));
    if(!skeleton){skeleton=new THREE.Skeleton(targetBones,inverses.map(m=>m.clone()));ownedSkeletons.add(skeleton);actorSkeletons.push(skeleton)}
    mesh.bind(skeleton,source.bindMatrix.clone());mesh.frustumCulled=false;
   }
   const copy=m=>{const value=m.clone();materials.add(value);return value};
   mesh.material=Array.isArray(source.material)?source.material.map(copy):copy(source.material);
   mesh.userData.redesignLod=1;mesh.castShadow=mesh.receiveShadow=true;mesh.visible=false;parent.add(mesh);meshes.push(mesh);
  }
  delegate=createRigLod(group,model,{height,closeFile,farPixels,initialLevel:logicalLevel});
  group.userData.normalRigLoaded=true;
 }
 function update(camera){
  if(disposed||!camera)return;
  if(delegate){delegate.update(camera);return}
  group.getWorldPosition(bottom);top.copy(bottom);top.y+=height*group.getWorldScale(scale).y;
  sphere.center.copy(bottom).lerp(top,.5);sphere.radius=height*.85*Math.max(Math.abs(scale.x),Math.abs(scale.y),Math.abs(scale.z));
  projection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frustum.setFromProjectionMatrix(projection);
  let visible=frustum.intersectsSphere(sphere);for(let parent=group;parent&&visible;parent=parent.parent)visible=parent.visible;
  bottom.project(camera);top.project(camera);const pixels=Math.abs(top.y-bottom.y)*innerHeight/2;group.userData.redesignPixels=pixels;
  logicalLevel=!visible||pixels<farPixels*(logicalLevel===2?1.15:.85)?2:1;
  group.userData.desiredRigLod=logicalLevel;
  if(visible&&pixels>farPixels*.7&&!requested){
   requested=true;group.userData.normalRigRequested=true;
   loadSurface(new URL(normalFile,document.baseURI).href).then(install).catch(error=>{if(!disposed)group.userData.normalRigError=error.message});
  }
 }
 function dispose(){
  if(disposed)return;disposed=true;delegate?.dispose();
  for(const mesh of meshes)mesh.removeFromParent();for(const material of materials)material.dispose();for(const skeleton of ownedSkeletons)skeleton.dispose();
  meshes.length=0;materials.clear();ownedSkeletons.clear();nodes.clear();bones.clear();actorSkeletons.length=0;delegate=null;
 }
 return {update,dispose};
}
