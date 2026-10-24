import {Box3,Matrix4,Vector3}from'three';
import {roomShadowAnchor,ROOM_SHADOW_VOLUME}from'./room-shadow-anchor.js';

function clip(poly,axis,edge,sign){
 const out=[];if(!poly.length)return out;let previous=poly.at(-1),a=sign*(previous[axis]-edge);
 for(const point of poly){const b=sign*(point[axis]-edge);
  if((a>=0)!==(b>=0)){const t=a/(a-b);out.push(previous.map((v,i)=>v+(point[i]-v)*t));}
  if(b>=0)out.push(point);previous=point;a=b;
 }return out;
}

// One-time numeric proof on the ORIGINAL static triangles. A merged rock's
// AABB combines unrelated high/front and deep/back points. It must not invent
// an exposed receiver at that fictitious corner. No render geometry is edited.
export function uncoveredStaticShadowBoxes(objects,region,camera,{minY=ROOM_SHADOW_VOLUME.minY,maxY=ROOM_SHADOW_VOLUME.maxY,padding=ROOM_SHADOW_VOLUME.padding,margin=ROOM_SHADOW_VOLUME.margin,maxBoxes=4096}={}){
 const target=roomShadowAnchor([region],camera,{minY,maxY,padding,margin});if(!target)return null;
 const eye=target.clone().add(new Vector3(-16,32,13)),view=new Matrix4().lookAt(eye,target,camera.up).setPosition(eye).invert();
 const world=new Matrix4(),instance=new Matrix4(),point=new Vector3(),projected=new Vector3(),boxes=[];let triangles=0,covered=0,masked=0;
 for(const object of objects){
  if(object.isBatchedMesh||object.isSkinnedMesh)return null;
  const g=object.geometry,p=g?.attributes.position,index=g?.index,count=index?.count??p?.count;
  if(!p||!Number.isInteger(count)||count%3)return null;
  const copies=object.isInstancedMesh?object.count:1;if(!Number.isInteger(copies)||copies<0)return null;
  for(let copy=0;copy<copies;copy++){
   world.copy(object.matrixWorld);if(object.isInstancedMesh){object.getMatrixAt(copy,instance);world.multiply(instance);}
   for(let i=0;i<count;i+=3){let poly=[];
    for(let k=0;k<3;k++){const v=index?index.getX(i+k):i+k;if(!Number.isInteger(v)||v<0||v>=p.count)return null;point.fromBufferAttribute(p,v).applyMatrix4(world);if(!Number.isFinite(point.lengthSq()))return null;poly.push(point.toArray());}
    triangles++;
    poly=clip(poly,0,region.x-padding,1);poly=clip(poly,0,region.x+region.w+padding,-1);poly=clip(poly,2,region.z-padding,1);poly=clip(poly,2,region.z+region.d+padding,-1);
    if(!poly.length){masked++;continue;}
    let fits=true;
    for(const p of poly){projected.fromArray(p).applyMatrix4(view);const depth=-projected.z;if(projected.x<camera.left+margin||projected.x>camera.right-margin||projected.y<camera.bottom+margin||projected.y>camera.top-margin||depth<camera.near+margin||depth>camera.far-margin){fits=false;break;}}
    if(fits){covered++;continue;}
    const box=new Box3();for(const p of poly)box.expandByPoint(point.fromArray(p));boxes.push(box);if(boxes.length>maxBoxes)return null;
   }
  }
 }
 return{boxes,triangles,covered,masked};
}
