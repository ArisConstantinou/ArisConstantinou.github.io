import{decodeContactGeometry}from'./arcade-contact-geometry.js';
let data=null;
export function configureClimbData(meta,buffer){
 if(!meta){data=null;return;}
 if(meta.format!==1||!Array.isArray(meta.bones)||meta.bones.length!==49||!meta.profile?.body?.length||!meta.templates?.length||!(buffer instanceof ArrayBuffer))throw Error('Invalid climb contact package');
 data={meta,buffer,geometries:new WeakMap()};
}
export function climbPhysicsData(){return data?.meta||null;}
export function contactGeometry(original,skeleton){
 if(!data)return null;const{meta,buffer,geometries}=data;
 if(skeleton.bones.some((bone,i)=>bone.name!==meta.bones[i]))throw Error('Climb skeleton source mismatch');
 let geometry=geometries.get(original);if(!geometry){geometry=decodeContactGeometry(original,meta,buffer);geometries.set(original,geometry);}return geometry;
}
