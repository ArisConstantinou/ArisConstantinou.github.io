import {Vector3,Matrix4}from'three';

// A directional light's shading depends on direction, not absolute position.
// A fixed target lets the existing static-depth cache survive camera travel.
// Reject footprints that do not fit; retain the original following shadow view.
// Reserve the same projection for below-floor foundations and live actors.
// .2world units is >4shadowtexels, beyond the PCFSoft3x3 kernel. Unsupported
// actor heights retain the original following projection rather than clipping.
export const ROOM_SHADOW_VOLUME=Object.freeze({minY:-10,maxY:8,padding:1.401,margin:.2});
export function roomShadowAnchor(regions,camera,{offset=new Vector3(-16,32,13),minY=ROOM_SHADOW_VOLUME.minY,maxY=ROOM_SHADOW_VOLUME.maxY,padding=ROOM_SHADOW_VOLUME.padding,margin=ROOM_SHADOW_VOLUME.margin}={}){
 if(!camera.isOrthographicCamera||camera.zoom!==1||camera.view?.enabled||![camera.left,camera.right,camera.top,camera.bottom,camera.near,camera.far,padding,margin,offset.x,offset.y,offset.z].every(Number.isFinite)||padding<0||margin<0||camera.left>=camera.right||camera.bottom>=camera.top||camera.near>=camera.far||offset.lengthSq()<1e-8)return null;
 if(!regions?.length||!Number.isFinite(minY)||!Number.isFinite(maxY)||minY>=maxY)return null;
 let minX=Infinity,minZ=Infinity,maxX=-Infinity,maxZ=-Infinity;
 for(const r of regions){if(![r.x,r.z,r.w,r.d].every(Number.isFinite)||r.w<=0||r.d<=0)return null;minX=Math.min(minX,r.x-padding);minZ=Math.min(minZ,r.z-padding);maxX=Math.max(maxX,r.x+r.w+padding);maxZ=Math.max(maxZ,r.z+r.d+padding);}
 const target=new Vector3((minX+maxX)/2,(minY+maxY)/2,(minZ+maxZ)/2),eye=target.clone().add(offset);
 const view=new Matrix4().lookAt(eye,target,camera.up).setPosition(eye).invert(),point=new Vector3();
 for(const x of [minX,maxX])for(const y of [minY,maxY])for(const z of [minZ,maxZ]){
  point.set(x,y,z).applyMatrix4(view);const depth=-point.z;
  if(point.x<camera.left+margin||point.x>camera.right-margin||point.y<camera.bottom+margin||point.y>camera.top-margin||depth<camera.near+margin||depth>camera.far-margin)return null;
 }
 return target;
}

export function createRoomShadowAnchor(camera,options={}){
 let previous='',anchor=null;const stats={builds:0,hits:0,roomFrames:0,fallbacks:0,verticalFallbacks:0,geometryFallbacks:0,mode:'following'};
 return {
  target(focus,regions,span=null,receiversSafe=true){
   if(!receiversSafe){stats.fallbacks++;stats.geometryFallbacks++;stats.mode='following';return focus;}
   const minY=options.minY??ROOM_SHADOW_VOLUME.minY,maxY=options.maxY??ROOM_SHADOW_VOLUME.maxY;
   if(focus.y<minY||focus.y>maxY||span&&(!Number.isFinite(span.minY)||!Number.isFinite(span.maxY)||span.minY<minY||span.maxY>maxY)){stats.fallbacks++;stats.verticalFallbacks++;stats.mode='following';return focus;}
   const key=JSON.stringify([regions?.map(r=>[r.x,r.z,r.w,r.d]),camera.left,camera.right,camera.bottom,camera.top,camera.near,camera.far,camera.zoom,camera.view,camera.up.toArray()]);
   if(key!==previous){previous=key;anchor=roomShadowAnchor(regions,camera,options);stats.builds++;}else stats.hits++;
   if(!anchor){stats.fallbacks++;stats.mode='following';return focus;}
   stats.roomFrames++;stats.mode='room';return anchor;
  },
  snapshot:()=>({...stats,anchor:anchor?.toArray()??null}),
 };
}
