import {Box3,Vector3,Matrix4,Frustum}from'three';
import {shadowPositionsPreserved}from'./shadow-position-contract.js';
import {uncoveredStaticShadowBoxes}from'./shadow-static-coverage.js';
import {ROOM_SHADOW_VOLUME}from'./room-shadow-anchor.js';
const clipWorkspace=()=>[[1,0,0,0],[-1,0,0,0],[0,1,0,0],[0,-1,0,0],[0,0,1,0],[0,0,-1,0],...[0,1,2,3,4,5].map(()=>[0,0,0,0])];

// A perspective projection maps a convex polytope to a convex footprint when
// every point is below the floor and the camera is above it. Checking all
// vertices of box ∩ camera-frustum therefore proves floor occlusion. Independent
// box/frustum and box/floor checks would be too conservative at cliff corners.
export function clippedBoxHiddenByFloor(box,frustum,eye,floor,p=clipWorkspace()){
 if(![box.min.x,box.min.y,box.min.z,box.max.x,box.max.y,box.max.z,eye.x,eye.y,eye.z,floor.x0,floor.x1,floor.z0,floor.z1,floor.y].every(Number.isFinite)||floor.x0>=floor.x1||floor.z0>=floor.z1)return false;
 if(eye.y<=floor.y+.01||box.max.y>=floor.y-.01)return false;
 p[0][3]=-box.min.x;p[1][3]=box.max.x;p[2][3]=-box.min.y;p[3][3]=box.max.y;p[4][3]=-box.min.z;p[5][3]=box.max.z;
 for(let i=0;i<6;i++){const q=frustum.planes[i],v=p[i+6];if(!Number.isFinite(q.normal.x)||!Number.isFinite(q.normal.y)||!Number.isFinite(q.normal.z)||!Number.isFinite(q.constant))return false;v[0]=q.normal.x;v[1]=q.normal.y;v[2]=q.normal.z;v[3]=q.constant;}
 for(let i=0;i<p.length-2;i++)for(let j=i+1;j<p.length-1;j++)for(let k=j+1;k<p.length;k++){
  const a=p[i],b=p[j],c=p[k],bcx=b[1]*c[2]-b[2]*c[1],bcy=b[2]*c[0]-b[0]*c[2],bcz=b[0]*c[1]-b[1]*c[0],det=a[0]*bcx+a[1]*bcy+a[2]*bcz;
  if(Math.abs(det)<1e-9)continue;
  const x=(-a[3]*bcx-b[3]*(c[1]*a[2]-c[2]*a[1])-c[3]*(a[1]*b[2]-a[2]*b[1]))/det;
  const y=(-a[3]*bcy-b[3]*(c[2]*a[0]-c[0]*a[2])-c[3]*(a[2]*b[0]-a[0]*b[2]))/det;
  const z=(-a[3]*bcz-b[3]*(c[0]*a[1]-c[1]*a[0])-c[3]*(a[0]*b[1]-a[1]*b[0]))/det;
  let inside=true;for(let n=0;n<p.length;n++){const q=p[n];if(q[0]*x+q[1]*y+q[2]*z+q[3]<-1e-6){inside=false;break;}}if(!inside)continue;
  const t=(eye.y-floor.y)/(eye.y-y),gx=eye.x+(x-eye.x)*t,gz=eye.z+(z-eye.z)*t;
  if(gx<floor.x0+.02||gx>floor.x1-.02||gz<floor.z0+.02||gz>floor.z1-.02)return false;
 }
 return true;
}

export function createShadowReceiverGuard(root,floors,{minY=ROOM_SHADOW_VOLUME.minY,maxY=ROOM_SHADOW_VOLUME.maxY,padding=ROOM_SHADOW_VOLUME.padding,positionsPreserved=shadowPositionsPreserved,shadowCamera=null}={}){
 const boxes=[],sources=[],materialsToCheck=new Set(),box=new Box3(),part=new Box3(),eye=new Vector3(),matrix=new Matrix4(),frustum=new Frustum(),workspace=clipWorkspace(),lastProjection=new Float64Array(16),lastWorld=new Float64Array(16);let unsupported=false,lastKey='',lastValue=false,coverageKey='',coverage=null;
 root.updateWorldMatrix(true,true);
 root.traverse(o=>{
  if(!o.isMesh||o.isSkinnedMesh||!o.receiveShadow)return;
  const materials=Array.isArray(o.material)?o.material:[o.material];
  for(const m of materials)materialsToCheck.add(m);
  // Unknown callbacks may move even an apparently ordinary Standard mesh.
  // Only the room wrapper's explicit original-callback contract is accepted.
  if(materials.some(m=>m?.isShaderMaterial||m?.displacementMap||!positionsPreserved(m))||Object.keys(o.geometry.morphAttributes).length){unsupported=true;return;}
  box.setFromObject(o);if(box.min.y<minY||box.max.y>maxY){boxes.push(box.clone());sources.push(o);}
 });
 const stats={boxes:boxes.length,checks:0,reused:0,fallbacks:0,floorProofs:0,frustumProofs:0,unsupported,coverageBuilds:0,uncoveredBoxes:null,coverageTriangles:0,lateMaterialFallbacks:0,materialFailure:null};
 function finish(camera,key,value){lastKey=key;lastProjection.set(camera.projectionMatrix.elements);lastWorld.set(camera.matrixWorld.elements);lastValue=value;if(!value)stats.fallbacks++;return value;}
 return {
  check(camera,regions){
   stats.checks++;
   // Revalidate before the camera memo: later shader/profile replacements must
   // not inherit the earlier material's proof or reuse a previous safe result.
   for(const m of materialsToCheck)if(m?.isShaderMaterial||m?.displacementMap||!positionsPreserved(m)){stats.fallbacks++;stats.lateMaterialFallbacks++;stats.materialFailure={name:m?.name??'',type:m?.type??'missing'};return false;}
   // Only the courtyard's continuous opaque base has been verified here.
   // Upper floors, stairs and adjoining-room transitions retain the old view.
   if(unsupported||!camera.isPerspectiveCamera||regions.length!==1||regions[0].id!=='courtyard'){stats.fallbacks++;return false;}
   const r=regions[0],base=floors.find(f=>f.tag==='courtyard'&&f.h>0&&Math.abs(f.y+f.h/2)<1e-6&&f.x-f.w/2<=r.x&&f.x+f.w/2>=r.x+r.w&&f.z-f.d/2<=r.z&&f.z+f.d/2>=r.z+r.d);
   if(!base){stats.fallbacks++;return false;}
   let candidates=boxes;
   if(shadowCamera){
    const next=JSON.stringify([r.x,r.z,r.w,r.d,shadowCamera.left,shadowCamera.right,shadowCamera.top,shadowCamera.bottom,shadowCamera.near,shadowCamera.far,shadowCamera.zoom,shadowCamera.view,shadowCamera.up.toArray()]);
    if(next!==coverageKey){coverageKey=next;coverage=uncoveredStaticShadowBoxes(sources,r,shadowCamera,{minY,maxY,padding});stats.coverageBuilds++;stats.uncoveredBoxes=coverage?.boxes.length??null;stats.coverageTriangles=coverage?.triangles??0;lastKey='';}
    if(!coverage){stats.fallbacks++;return false;}candidates=coverage.boxes;
   }
   const floor={y:0,x0:base.x-base.w/2,x1:base.x+base.w/2,z0:base.z-base.d/2,z1:base.z+base.d/2};
   camera.updateMatrixWorld();const key=[r.x,r.z,r.w,r.d,base.x,base.z,base.w,base.d].join(',');let same=key===lastKey;
   if(same)for(let i=0;i<16;i++)if(camera.projectionMatrix.elements[i]!==lastProjection[i]||camera.matrixWorld.elements[i]!==lastWorld[i]){same=false;break;}
   if(same){stats.reused++;if(!lastValue)stats.fallbacks++;return lastValue;}
   camera.getWorldPosition(eye);matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frustum.setFromProjectionMatrix(matrix);
   for(const source of candidates)for(const lower of [true,false]){
    part.copy(source);part.min.x=Math.max(part.min.x,r.x-padding);part.max.x=Math.min(part.max.x,r.x+r.w+padding);part.min.z=Math.max(part.min.z,r.z-padding);part.max.z=Math.min(part.max.z,r.z+r.d+padding);
    if(lower)part.max.y=Math.min(part.max.y,minY);else part.min.y=Math.max(part.min.y,maxY);
    if(part.isEmpty())continue;
    if(!frustum.intersectsBox(part)){stats.frustumProofs++;continue;}
    if(lower&&clippedBoxHiddenByFloor(part,frustum,eye,floor,workspace)){stats.floorProofs++;continue;}
    return finish(camera,key,false);
   }
   return finish(camera,key,true);
  },
  snapshot:()=>({...stats}),
 };
}
