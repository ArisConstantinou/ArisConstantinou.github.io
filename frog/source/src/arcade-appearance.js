// Arcade frogs keep the anatomical hop rig from creatures.js. Magazine fill
// changes the small throat pouch, never the spine that also parents the head
// and front legs. Scaling that subtree made a full magazine double its width.
const unit=value=>Number.isFinite(value)?Math.max(0,Math.min(1,value)):0;
const PROPORTIONS=Object.freeze([.96,.98,1.04]);

/** Apply once after creating an arcade frog, without changing shared geometry. */
export function configureArcadeAppearance(model){
 if(model.stats?.type!=='frog'||model.stats.cartoon)return model;
 const pivot=model.group.getObjectByName('anatomical-animation-pivot');
 // Team color identifies opponents; a role name must not add a muscular body.
 pivot.scale.set(...(model.stats.imported?[.96,.86,1.20]:PROPORTIONS));
 model.group.scale.setScalar(1);
 const material=model.mesh.material;
 material.bumpScale=0;material.roughness=model.stats.imported?.5:.9;
 material.clearcoat=.08;material.clearcoatRoughness=.75;
 return model;
}

/** Apply exactly once after model.update() resets and poses the animated rig. */
export function applyArcadeAppearance(model,{load=0,spit=0}={}){
 if(model.stats?.type!=='frog'||model.stats.cartoon)return model;
 const fill=unit(load),shot=unit(spit),bones=model.bones;
 model.group.scale.setScalar(1);
 bones.throat.scale.x*=1+fill*.08+shot*.10;
 bones.throat.scale.y*=1+fill*.12+shot*.16;
 bones.throat.scale.z*=1+fill*.08+shot*.08;
 bones.jaw.rotation.x-=shot*.42;
 bones.head.rotation.x-=shot*.08;
 // Retain blinking and the established expressive eyes, independently of ammo.
 for(const eye of ['eyeL','eyeR'])bones[eye].scale.multiplyScalar(1.14);
 return model;
}
