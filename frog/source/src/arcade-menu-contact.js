import {Vector3,Quaternion} from 'three';
import {createLimbChain,solveLimbChain} from './arcade-leap-pose.js';

// The game's rest-aware surface planting, adapted only to a flat button rim.
// Original skin/UVs/bone lengths remain intact; no image or mesh deformation.
export function createMenuContact(model){
 const mesh=model.mesh,g=mesh.geometry,names=mesh.skeleton.bones,limbs=[-1,1].flatMap(side=>[true,false].map(fore=>{
  const bone=model.bones[(fore?'wrist':'foot')+side],ids=new Set();bone.traverse(b=>{const i=names.indexOf(b);if(i>=0)ids.add(i);});const indices=[];
  for(let i=0;i<g.attributes.position.count;i++){let weight=0;for(let k=0;k<4;k++)if(ids.has(g.attributes.skinIndex.getComponent(i,k)))weight+=g.attributes.skinWeight.getComponent(i,k);if(weight>=.35)indices.push(i);}
  return{side,fore,indices,h:createLimbChain(model,(fore?['shoulder','elbow','wrist']:['hip','knee','ankle','foot']).map(n=>n+side))};
 }));
 const v=new Vector3(),target=new Vector3(),pole=new Vector3(),a=new Vector3(),b=new Vector3(),swing=new Quaternion(),end=new Quaternion();
 function point(l){let best=Infinity,at=null;for(const i of l.indices){mesh.getVertexPosition(i,v).applyMatrix4(mesh.matrixWorld);if(v.y<best){best=v.y;at=v.clone();}}return at;}
 function plant(){
  for(let pass=0;pass<12;pass++)for(const l of limbs){
   const h=l.h,p=point(l);if(!p)throw Error('Missing native menu pad');h.end.getWorldPosition(target);target.y-=p.y;h.root.parent.worldToLocal(target).sub(h.root.position);
   pole.copy(h.first).applyQuaternion(swing.setFromUnitVectors(a.copy(h.first).add(h.second).normalize(),b.copy(target).normalize()));end.copy(h.root.quaternion).multiply(h.middle.quaternion).multiply(h.end.quaternion);solveLimbChain(h,target,pole,null);
   h.rootQ.copy(swing.setFromUnitVectors(a.copy(h.first).normalize(),b.copy(h.knee).normalize())).multiply(h.bind.root);h.worldLower.copy(swing.setFromUnitVectors(a.copy(h.second).normalize(),b.copy(h.lower).normalize())).multiply(h.bind.middleWorld);h.middleQ.copy(h.rootQ).invert().multiply(h.worldLower);h.endQ.copy(h.worldLower).invert().multiply(end);h.root.quaternion.copy(h.rootQ);h.middle.quaternion.copy(h.middleQ);h.end.quaternion.copy(h.endQ);model.group.updateMatrixWorld(true);
  }
  return limbs.map(l=>({side:l.side,fore:l.fore,point:point(l).toArray()}));
 }
 return{plant};
}
