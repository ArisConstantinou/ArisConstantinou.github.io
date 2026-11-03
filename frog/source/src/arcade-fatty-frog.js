import * as THREE from 'three';
import {createFattyJumpPlayer} from './arcade-fatty-controller.js';
import {supportHeight} from './arcade-scenery-contact.js';

// The new Fatty keeps its actual 50-bone rig and authored clips. Medium and
// Skinny continue to use their own existing rigs, not a retargeted Fatty mesh.
export function fattyFrogFactory(gltf,metadata,game){
 gltf.scene.updateMatrixWorld(true);
 const body=gltf.scene.getObjectByName('Fatty_body');
 if(!body?.isSkinnedMesh||body.skeleton.bones.length!==50)throw Error('Invalid Fatty body');
 Object.assign(body.userData,structuredClone(metadata.bodyMetadata));
 for(const[name,q]of Object.entries(metadata.boneRestWorldQuaternions)){
  const bone=gltf.scene.getObjectByName(name);if(!bone)throw Error('Missing Fatty '+name);
  bone.userData.anatomyRestWorldQuaternion=[...q];
 }
 return function createFatty(options={}){
  const ground=options.menu?()=>0:(x,z)=>game.ground(x,z);
  const model=createFattyJumpPlayer(gltf,options.actor,{ground,
   supportSurface:options.menu?undefined:(id,x,z)=>supportHeight(game.state,id,x,z,ground),
   mountedData:metadata.mountedData});
  model.group.name='cartoon-heavy-fatty';model.stats.fatty=true;
  model.stats.anatomyRepairAccepted=false;model.ownsSurfacePose=true;
  const update=model.update;
  model.update=(dt,state={})=>{
   update(dt,state);
   // Existing wall mechanics and their generic rest-aware limb solver still
   // own wall contacts; ordinary ground/terrain contacts belong to Fatty.
   model.ownsLimbPose=!['wallHold','ledge'].includes(options.actor.flight?.kind);
  };
  return model;
 };
}
