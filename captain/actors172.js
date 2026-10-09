/** Civilian actors with independent skeletons and reversible procedural overlays. */
import * as T from 'three';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';
import {ATTACKS,clamp} from './chaos-model170.js';
import {normalBone as norm} from './characters172.js';
const q=new T.Quaternion(),q2=new T.Quaternion(),va=new T.Vector3(),vb=new T.Vector3();
function aim(bone,child,target){
 if(!bone||!child)return;
 bone.updateWorldMatrix(true,true);
 const from=child.getWorldPosition(va).sub(bone.getWorldPosition(vb)).normalize(),to=target.clone().sub(vb).normalize();
 q.setFromUnitVectors(from,to);bone.getWorldQuaternion(q2);q.multiply(q2);bone.parent.getWorldQuaternion(q2).invert();bone.quaternion.copy(q2.multiply(q));bone.updateWorldMatrix(false,true);
}
function trimForFirstPerson(model){
 let triangles=0;
 // Keep cuffs/shoes; remove head, hat, chest badges, collar and hair from FPS.
 model.traverse(o=>{if(o.userData.accessory&&!o.userData.fpsVisible)o.visible=false;});
 model.traverse(o=>{
  if(!o.isSkinnedMesh)return;
  const g=o.geometry.clone(),ids=g.attributes.skinIndex,weights=g.attributes.skinWeight;
  const good=i=>{let w=0;for(let k=0;k<4;k++){const n=norm(o.skeleton.bones[ids.getComponent(i,k)]?.name||'');if(/(arm|hand|leg|foot|toe)/.test(n))w+=weights.getComponent(i,k);}return w>.58;};
  const index=g.index?Array.from(g.index.array):Array.from({length:g.attributes.position.count},(_,i)=>i),out=[],groups=g.groups.length?g.groups.map(x=>({...x})):[{start:0,count:index.length,materialIndex:0}];g.clearGroups();
  for(const gr of groups){const start=out.length;for(let i=gr.start;i<gr.start+gr.count;i+=3)if(good(index[i])&&good(index[i+1])&&good(index[i+2]))out.push(index[i],index[i+1],index[i+2]);g.addGroup(start,out.length-start,gr.materialIndex);}
  g.setIndex(out);g.computeBoundingSphere();o.geometry=g;triangles+=out.length/3;o.frustumCulled=false;o.castShadow=false;
 });return triangles;
}
export function createActor(template,parent,{fps=false,guard=false,id=0}={}){
 if(!template?.model)throw Error('A dressed civilian template is required');
 const group=new T.Group(),model=cloneSkeleton(template.model);group.add(model);parent.add(group);
 const profile=template.profile||template.model.userData.profile||{};group.name=profile.name||'Επιβάτης';group.userData.profile={...profile};
 const bones=new Map();model.traverse(o=>{if(o.isBone)bones.set(norm(o.name),o);if(o.isMesh){o.frustumCulled=false;o.castShadow=!fps;o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone();}});
 const fingers=[...bones].filter(([n])=>/hand(thumb|index|middle|ring|pinky)[1-3]$/.test(n));
 const open=new Map(fingers.map(([n,b])=>[n,b.quaternion.clone()])),closed=new Map();
 // Use the authored punch's fist, not an accumulating rotateZ on arbitrary finger axes.
 if(template.clips.punch){const temp=new T.AnimationMixer(model),a=temp.clipAction(template.clips.punch);a.play();temp.update(.30);for(const [n,b]of fingers)closed.set(n,b.quaternion.clone());temp.stopAllAction();temp.uncacheRoot(model);}
 const limbTriangles=fps?trimForFirstPerson(model):0;
 const mixer=new T.AnimationMixer(model),actions={};for(const [k,clip]of Object.entries(template.clips))if(clip)actions[k]=mixer.clipAction(clip);
 let motion='idle',recovery=0;actions.idle?.play();mixer.update(0);
 const bases=new Map();const snapshot=()=>{for(const [n,b]of bones)bases.set(n,b.quaternion.clone());};snapshot();
 const scale=(template.height||1.83)/1.83;
 const point=(x,y,z)=>group.localToWorld(new T.Vector3(x*scale,y*scale,z*scale));
 function solveArm(side,target,hint){
  const arm=bones.get(side+'arm'),fore=bones.get(side+'forearm'),hand=bones.get(side+'hand');if(!arm||!fore||!hand)return;
  group.updateWorldMatrix(true,true);
  const a=arm.getWorldPosition(new T.Vector3()),b=fore.getWorldPosition(new T.Vector3()),c=hand.getWorldPosition(new T.Vector3());
  const l1=a.distanceTo(b),l2=b.distanceTo(c),d=target.clone().sub(a),length=clamp(d.length(),Math.abs(l1-l2)+.012,l1+l2-.008);d.normalize();
  const bend=hint.clone().sub(a);bend.addScaledVector(d,-bend.dot(d));if(bend.lengthSq()<.0001)bend.set(side==='left'?1:-1,-1,0);bend.normalize();
  const along=(l1*l1-l2*l2+length*length)/(2*length),height=Math.sqrt(Math.max(0,l1*l1-along*along));
  const elbow=a.clone().addScaledVector(d,along).addScaledVector(bend,height),end=a.clone().addScaledVector(d,length);
  aim(arm,fore,elbow);aim(fore,hand,end);
 }
 function hand(side,xyz,elbow,openness=0){solveArm(side,point(...xyz),point(...elbow));}
 function setFingers(amount){for(const [n,b]of fingers){b.quaternion.copy(open.get(n));if(closed.has(n))b.quaternion.slerp(closed.get(n),amount);}}
 function tick(dt,{speed=0,attack=null,block=false,flinch=0,drunk=0,down=0,time=0,held=false,drinking=0,sitting=false}={}){
  dt=Math.max(0,Math.min(.1,Number.isFinite(dt)?dt:0));
  // Restore every overlayed joint, including all finger joints, before advancing animation.
  for(const [n,bq]of bases)bones.get(n).quaternion.copy(bq);
  const wanted=sitting&&actions.sit?'sit':speed>.15?'walk':'idle';
  if(wanted!==motion&&actions[wanted]){actions[wanted].reset().fadeIn(.16).play();actions[motion]?.fadeOut(.16);motion=wanted;}
  mixer.timeScale=motion==='walk'?clamp(speed/1.2,.55,2):1;mixer.update(dt);snapshot();
  let fist=.16;
  const head=bones.get('head');if(head&&flinch){head.rotateY(Math.sin(time*45)*flinch*.3);head.rotateX(-flinch*.2);}
  const spine=bones.get('spine2')||bones.get('spine');if(spine){spine.rotateZ(Math.sin(time*2.4+id)*drunk*.05);spine.rotateX(flinch*.17+down*.5);}
  recovery=Math.max(0,recovery-dt);if(attack)recovery=.24;
  // At rest use the normal idle/walk animation: elbows by the body, never zombie reach.
  if(block||attack||held||drinking>0||recovery>0){
   let lh=[.30,1.25,.30],rh=[-.30,1.24,.30],le=[.36,1.14,.06],re=[-.36,1.14,.06];
   if(block){lh=[.16,1.55,.39];rh=[-.16,1.54,.39];fist=.90;}
   if(held){rh=[-.24,1.31,.48];fist=.62;}
   if(drinking>0){const k=Math.sin(Math.PI*clamp(drinking,0,1));rh=[-.17,1.34+k*.23,.40-k*.20];fist=.65;}
   if(attack){
    const a=ATTACKS[attack.kind],t=attack.t,contact=a?.contact||.23,duration=a?.duration||.6;
    const rise=t<contact?Math.sin(t/contact*Math.PI/2):Math.max(0,1-(t-contact)/(duration-contact));
    const k=attack.kind;
    if(k==='slap'||k==='heavy'){
     const across=clamp((t-contact*.3)/(contact*.7),0,1),heavy=k==='heavy';fist=.03;
     rh=[-.53+(heavy?.80:.67)*across,1.24+.23*rise,.17+.52*rise];re=[-.40,1.28,.10];
     if(t>contact){const f=clamp((t-contact)/(duration-contact),0,1);rh=rh.map((v,i)=>T.MathUtils.lerp(v,[-.30,1.24,.30][i],f));}
    }else if(k==='punch'){rh=[-.13,1.28+.18*rise,.26+.48*rise];re=[-.27,1.16,.05];fist=1;}
    else if(k==='kick'){
     aim(bones.get('rightupleg'),bones.get('rightleg'),point(-.12,.72+rise*.35,.12+rise*.43));
     aim(bones.get('rightleg'),bones.get('rightfoot'),point(-.10,.12+rise*.9,.20+rise*.70));
     lh=[.36,1.27,.16];rh=[-.36,1.25,.18];fist=.5;
    }
   }
   hand('left',lh,le);hand('right',rh,re);
  }
  if(speed<=.15&&!block&&!attack&&!held&&drinking<=0&&recovery<=0&&!sitting){
   solveArm('left',point(.27,.94,.08),point(.34,1.17,-.04));
   solveArm('right',point(-.27,.94,.08),point(-.34,1.17,-.04));
  }
  setFingers(fist);group.updateWorldMatrix(true,true);
 }
 return {group,model,bones,mixer,actions,tick,height:template.height||1.83,limbTriangles,profile,hide:()=>group.visible=false,inspect:()=>({role:profile.role,gender:profile.gender,name:profile.name,source:'civilian172',fps,restPose:'relaxed-idle',limbTriangles})};
}
