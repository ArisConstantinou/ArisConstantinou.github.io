import * as THREE from 'three';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const normal=n=>n.replace(/mixamorig/ig,'').replace(/[^a-z0-9]/ig,'').toLowerCase();
export function actorFrom(template){
 const root=new THREE.Group(),model=clone(template.model);root.add(model);
 const mixer=new THREE.AnimationMixer(model),actions={},bones=new Map(),rest=new Map();
 for(const [key,clip] of Object.entries(template.clips||{}))if(clip)actions[key]=mixer.clipAction(clip);
 model.traverse(o=>{if(o.isBone){bones.set(normal(o.name),o);rest.set(o,o.quaternion.clone());}if(o.isMesh){o.frustumCulled=false;o.castShadow=true;}});
 let motion='';
 return {root,model,bones,rest,mixer,height:template.height||1.8,
  pose(name,dt){for(const [bone,q]of rest)bone.quaternion.copy(q);if(name!==motion&&actions[name]){actions[motion]?.fadeOut(.15);actions[name].reset().fadeIn(.15).play();motion=name;}mixer.update(dt);for(const [bone]of rest)rest.set(bone,bone.quaternion.clone());},
  reset(){mixer.stopAllAction();motion='';root.rotation.set(0,0,0);},
  react(amount,side=1){const head=bones.get('head'),spine=bones.get('spine2');if(head)head.rotateY(amount*side*.55);if(spine)spine.rotateZ(amount*side*.2);},
 };
}
function pointBone(bone,child,target){
 if(!bone||!child)return;bone.updateWorldMatrix(true,true);
 const from=child.getWorldPosition(V()).sub(bone.getWorldPosition(V())).normalize();
 const to=target.clone().sub(bone.getWorldPosition(V())).normalize();
 const delta=new THREE.Quaternion().setFromUnitVectors(from,to),world=bone.getWorldQuaternion(new THREE.Quaternion());
 const inv=bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert();bone.quaternion.copy(inv.multiply(delta).multiply(world));bone.updateWorldMatrix(false,true);
}
function twoBone(bones,prefix,target,pole,leg=false){
 const a=bones.get(prefix+(leg?'upleg':'arm')),b=bones.get(prefix+(leg?'leg':'forearm')),c=bones.get(prefix+(leg?'foot':'hand'));
 if(!a||!b||!c)return;
 a.updateWorldMatrix(true,true);const s=a.getWorldPosition(V()),bp=b.getWorldPosition(V()),cp=c.getWorldPosition(V());
 const l1=s.distanceTo(bp),l2=bp.distanceTo(cp),direction=target.clone().sub(s),d=THREE.MathUtils.clamp(direction.length(),.03,l1+l2-.005);direction.normalize();
 const bend=pole.clone().sub(s).addScaledVector(direction,-pole.clone().sub(s).dot(direction)).normalize();
 const along=(l1*l1-l2*l2+d*d)/(2*d),height=Math.sqrt(Math.max(0,l1*l1-along*along));
 const elbow=s.clone().addScaledVector(direction,along).addScaledVector(bend,height);
 pointBone(a,b,elbow);pointBone(b,c,s.clone().addScaledVector(direction,d));
}
export function aimActor(actor,target,punch=0){
 actor.root.updateWorldMatrix(true,true);const chest=target.clone();chest.y+=1.15;
 const pole=actor.root.localToWorld(V(-.4,1.1,.15));twoBone(actor.bones,'right',chest,pole);
 const forearm=actor.bones.get('leftforearm');if(forearm)forearm.rotateX(-.65);
}
// FPS limbs are cut from the existing textured, skinned human asset. No box hands.
export function createHands(template,camera){
 const a=actorFrom(template),root=a.root;root.name='Captain first-person rig';camera.add(root);root.position.set(0,-1.57,.07);root.rotation.y=Math.PI;
 const arms=[],legs=[];
 const meshes=[];a.model.traverse(m=>{if(m.isMesh)meshes.push(m);});
 for(const mesh of meshes){
  if(!mesh.isMesh)continue;if(!mesh.isSkinnedMesh){mesh.visible=false;continue;}
  const g=mesh.geometry,si=g.getAttribute('skinIndex'),sw=g.getAttribute('skinWeight');if(!si){mesh.visible=false;continue;}
  const names=mesh.skeleton.bones.map(b=>normal(b.name));
  function extract(test){const out=[],index=g.index;const count=index?index.count:g.attributes.position.count;
   for(let i=0;i<count;i+=3){const tri=[0,1,2].map(j=>index?index.getX(i+j):i+j);if(tri.every(v=>{let weight=0;for(let k=0;k<4;k++)if(test(names[si.getComponent(v,k)]||''))weight+=sw.getComponent(v,k);return weight>.5;}))out.push(...tri);}
   const geom=g.clone();geom.setIndex(out);geom.clearGroups();return geom;
  }
  const material=Array.isArray(mesh.material)?mesh.material[0].clone():mesh.material.clone();material.depthTest=false;material.depthWrite=false;material.side=THREE.DoubleSide;
  mesh.material=material;mesh.geometry=extract(n=>/^(left|right)(arm|forearm|hand)/.test(n));mesh.renderOrder=950;arms.push(mesh);
  const leg=mesh.clone();leg.geometry=extract(n=>/^right(upleg|leg|foot|toe)/.test(n));leg.skeleton=mesh.skeleton;leg.material=material;leg.renderOrder=951;leg.visible=false;mesh.parent.add(leg);legs.push(leg);
 }
 const held=new THREE.Group();camera.add(held);held.position.set(.25,-.4,-.7);
 function update(time,attack,block,walk,drink){
  if(!root.visible)return;a.pose('idle',0);root.position.y=-1.57+Math.sin(time*8)*Math.min(.009,walk*.009);
  const left=V(-.30,-.37,-.55),right=V(.30,-.30,-.55);let kick=0,closed=block;
  const n=attack?Math.min(1,attack.t/attack.duration):0;
  if(attack){const h=Math.sin(Math.PI*Math.min(1,n/.55));
   if(attack.key===1){right.set(.50-h*.73,-.18+h*.12,-.45-h*.43);}
   if(attack.key===2){right.set(.68-h*1.02,-.14+h*.1,-.25-h*.64);}
   if(attack.key===3){right.set(.27-h*.18,-.19,-.38-h*.69);closed=true;}
   if(attack.key===4)kick=h;
  }
  if(block){left.set(-.16,-.05,-.4);right.set(.16,-.04,-.4);}
  if(drink>0)right.set(.13,-.06,-.33);
  root.updateWorldMatrix(true,true);
  for(const [side,target,sign]of [['left',left,-1],['right',right,1]]){
   twoBone(a.bones,side,camera.localToWorld(target),camera.localToWorld(V(sign*.52,-.52,-.22)));
   const hand=a.bones.get(side+'hand');if(hand)hand.rotateX(side==='left'?-.3:.4);
   for(const [name,bone]of a.bones)if(name.startsWith(side+'hand')&&/[123]$/.test(name)&&!name.includes('thumb'))bone.rotateZ(closed?.8:.05);
  }
  for(const l of legs)l.visible=kick>.05;if(kick>.05)twoBone(a.bones,'right',camera.localToWorld(V(.16,-.7+kick*.33,-.3-kick*.8)),camera.localToWorld(V(.36,-.74,-.48)),true);
  root.updateWorldMatrix(true,true);for(const m of arms)m.skeleton.update();
 }
 return {root,held,update,inspect:()=>({arms:arms.length,triangles:arms.reduce((n,m)=>n+m.geometry.index.count/3,0),legTriangles:legs.reduce((n,m)=>n+m.geometry.index.count/3,0)})};
}
