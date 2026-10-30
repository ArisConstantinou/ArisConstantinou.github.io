import {Vector3,Matrix4} from 'three';
import {createLimbChain,solveLimbChain} from './arcade-leap-pose.js';
const cache=new WeakMap();
function pointsFor(mesh,boneName){
 const bone=mesh.skeleton.bones.find(b=>b.name===boneName),ids=new Set();bone?.traverse(b=>{const id=mesh.skeleton.bones.indexOf(b);if(id>=0)ids.add(id);});const id=bone?mesh.skeleton.bones.indexOf(bone):-1,g=mesh.geometry,p=g.attributes.position,w=g.attributes.skinWeight,j=g.attributes.skinIndex;
 if(id<0||!w||!j)return [];
 const selected=new Set();for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){let best=-Infinity,index=-1;for(let i=0;i<p.count;i++){let weight=0;for(let k=0;k<4;k++)if(ids.has(j.getComponent(i,k)))weight+=w.getComponent(i,k);if(weight<.35)continue;const value=p.getComponent(i,axis)*sign;if(value>best){best=value;index=i;}}if(index>=0)selected.add(index);}return [...selected];
}
function closest(model,indices,wall,v){
 let best=null;for(const i of indices){model.mesh.getVertexPosition(i,v).applyMatrix4(model.mesh.matrixWorld);const gap=(v.x-wall.x)*wall.nx+(v.z-wall.z)*wall.nz;if(!best||gap<best.gap)best={gap,point:v.clone()};}return best;
}
// Derive contact from this mesh's toe pads and this rig's actual limb lengths.
// No avatar-specific offset or change to the gameplay body's position is used.
export function plantWallFeet(model,flight){
 if(flight?.kind!=='wallHold'||!model.mesh?.isSkinnedMesh)return null;
 let c=cache.get(model);if(!c){c={feet:[-1,1].map(side=>({side,chain:createLimbChain(model,['hip'+side,'knee'+side,'ankle'+side,'foot'+side]),indices:pointsFor(model.mesh,'foot'+side)})),v:new Vector3(),ankle:new Vector3(),target:new Vector3(),pole:new Vector3(),direction:new Vector3(),inverse:new Matrix4()};cache.set(model,c);}
 const wall=flight.wall,result=[];
 for(const foot of c.feet){const h=foot.chain;if(!foot.indices.length)continue;
  for(let iteration=0;iteration<4;iteration++){
   model.group.updateMatrixWorld(true);const pad=closest(model,foot.indices,wall,c.v);if(!pad||Math.abs(pad.gap-.008)<.002)break;
   h.end.getWorldPosition(c.ankle);c.ankle.addScaledVector(c.direction.set(wall.nx,0,wall.nz),.008-pad.gap);
   h.root.parent.worldToLocal(c.target.copy(c.ankle));c.target.sub(h.root.position);
   c.inverse.copy(h.root.parent.matrixWorld).invert();c.direction.set(-wall.nx,-.06,-wall.nz).transformDirection(c.inverse);
   c.pole.set(foot.side,-.1,.1);solveLimbChain(h,c.target,c.pole,c.direction);
   h.root.quaternion.copy(h.rootQ);h.middle.quaternion.copy(h.middleQ);h.end.quaternion.copy(h.endQ);
  }
  model.group.updateMatrixWorld(true);const pad=closest(model,foot.indices,wall,c.v);result.push({side:foot.side,gap:pad?.gap??null,point:pad?.point.toArray()??null});
 }
 model.wallContacts=result;return result;
}


export function prewarmWallFeet(model){
 if(!model.mesh?.isSkinnedMesh)return;
 if(!cache.has(model))cache.set(model,{feet:[-1,1].map(side=>({side,chain:createLimbChain(model,['hip'+side,'knee'+side,'ankle'+side,'foot'+side]),indices:pointsFor(model.mesh,'foot'+side)})),v:new Vector3(),ankle:new Vector3(),target:new Vector3(),pole:new Vector3(),direction:new Vector3(),inverse:new Matrix4()});
}
