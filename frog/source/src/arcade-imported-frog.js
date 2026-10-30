import * as THREE from 'three';
import {createCreature} from './creatures.js';

// The imported surface keeps its own anatomical rest joints. The established
// animation controller supplies rotations; the leap IK then uses these actual
// limb lengths, rather than imposing the procedural sculpt's proportions.
export function importedFrogFactory(asset,rig){
 asset.updateMatrixWorld(true);let source;asset.traverse(o=>{if(o.isSkinnedMesh)source=o;});if(!source)throw new Error('Το νέο μοντέλο δεν περιέχει σκελετό.');
 const geometry=source.geometry.clone().applyMatrix4(source.matrixWorld),definitions=new Map(rig.bones.map(d=>[d.name,d]));
 const names=source.skeleton.bones.map(b=>b.name);for(const name of names)if(!definitions.has(name))throw new Error('Άγνωστη άρθρωση: '+name);
 if(!geometry.attributes.skinIndex||!geometry.attributes.skinWeight)throw new Error('Λείπουν βάρη σκελετού.');
 return function createImportedFrog(options={}){
  const model=createCreature('frog',options),driverBones=model.bones,driverRest=Object.fromEntries(Object.entries(driverBones).map(([n,b])=>[n,b.position.clone()])),pivot=model.group.getObjectByName('anatomical-animation-pivot'),driverMeshes=[];
  pivot.traverse(o=>{if(o.isMesh){o.visible=false;driverMeshes.push(o);}});
  const bones={},list=names.map(name=>{const b=new THREE.Bone();b.name=name;bones[name]=b;return b;});
  for(const name of names){const d=definitions.get(name),b=bones[name];b.position.fromArray(d.position);if(d.parent){b.position.sub(new THREE.Vector3().fromArray(definitions.get(d.parent).position));bones[d.parent].add(b);}}
  const rest=Object.fromEntries(names.map(n=>[n,bones[n].position.clone()])),tint=new THREE.Color('#86da38'),material=source.material.clone();material.roughness=.5;material.metalness=0;material.envMapIntensity=.38;material.userData={...material.userData,tint};
  material.onBeforeCompile=shader=>{shader.uniforms.frogTint={value:tint};shader.fragmentShader='uniform vec3 frogTint;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n float naturalGreen=smoothstep(.008,.095,diffuseColor.g-diffuseColor.r)*smoothstep(-.01,.055,diffuseColor.g-diffuseColor.b); diffuseColor.rgb=mix(diffuseColor.rgb,frogTint*(.62+diffuseColor.g*.65),naturalGreen*.88);');};material.customProgramCacheKey=()=> 'imported-frog-anatomy-v1';
  const mesh=new THREE.SkinnedMesh(geometry,material);mesh.name='Meshy-anatomical-frog';for(const name of names)if(!definitions.get(name).parent)mesh.add(bones[name]);pivot.add(mesh);model.group.updateMatrixWorld(true);const skeleton=new THREE.Skeleton(list);mesh.bind(skeleton);mesh.frustumCulled=false;mesh.castShadow=true;mesh.receiveShadow=true;
  const update=model.update.bind(model),dispose=model.dispose.bind(model),impact=model.setImpact.bind(model),crowned=model.setCrowned.bind(model);
  model.mesh=mesh;model.bones=bones;model.skeleton=skeleton;model.stats={...model.stats,imported:true,vertices:geometry.attributes.position.count,triangles:geometry.index.count/3,bones:list.length,restAxisPitch:Math.atan2((definitions.get('head').position[1]-definitions.get('pelvis').position[1])*.86,(definitions.get('head').position[2]-definitions.get('pelvis').position[2])*1.20)};
  model.update=(dt,state={})=>{update(dt,state);for(const name of names){const b=bones[name],driver=driverBones[name];b.position.copy(rest[name]);b.scale.set(1,1,1);b.quaternion.identity();if(driver){b.quaternion.copy(driver.quaternion);b.scale.copy(driver.scale);b.position.add(driver.position).sub(driverRest[name]);}}for(const o of driverMeshes)o.visible=false;material.emissiveIntensity=driverMeshes[0].material.emissiveIntensity;};
  model.setOutline=(color)=>{if(color!==undefined&&color!==null)tint.set(color);};
  model.setRenderLOD=level=>{model.stats.renderLOD=level;};
  model.setImpact=value=>{impact(value);material.emissive.set('#ffffff');};
  model.setCrowned=value=>{crowned(value);const crown=model.group.getObjectByName('royal-crown');if(crown&&crown.parent!==bones.head)bones.head.add(crown);};
  model.mouthWorld=(target=new THREE.Vector3())=>{model.group.updateWorldMatrix(true,true);return bones.mouth.getWorldPosition(target);};
  model.dispose=()=>{skeleton.dispose();material.dispose();dispose();};model.update(0,{});return model;
 };
}
