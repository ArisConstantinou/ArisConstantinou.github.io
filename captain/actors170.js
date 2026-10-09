import * as T from 'three';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';
import {ATTACKS,clamp} from './chaos-model170.js';
const norm=n=>n.replace(/mixamorig/ig,'').replace(/[^a-z0-9]/ig,'').toLowerCase();
const q=new T.Quaternion(),q2=new T.Quaternion(),va=new T.Vector3(),vb=new T.Vector3();
function aim(bone,child,target){if(!bone||!child)return;bone.updateWorldMatrix(true,true);const from=child.getWorldPosition(va).sub(bone.getWorldPosition(vb)).normalize();const to=target.clone().sub(vb).normalize();q.setFromUnitVectors(from,to);bone.getWorldQuaternion(q2);q.multiply(q2);bone.parent.getWorldQuaternion(q2).invert();bone.quaternion.copy(q2.multiply(q));bone.updateWorldMatrix(false,true);}
function trimForFirstPerson(model){let triangles=0;model.traverse(o=>{if(!o.isSkinnedMesh)return;const g=o.geometry.clone(),ids=g.attributes.skinIndex,weights=g.attributes.skinWeight;const good=i=>{let v=0;for(let k=0;k<4;k++){const bi=ids.getComponent(i,k),n=norm(o.skeleton.bones[bi]?.name||'');if(/(arm|hand|leg|foot|toe)/.test(n))v+=weights.getComponent(i,k);}return v>.52;};const index=g.index?Array.from(g.index.array):Array.from({length:g.attributes.position.count},(_,i)=>i),out=[];for(let i=0;i<index.length;i+=3)if(good(index[i])&&good(index[i+1])&&good(index[i+2]))out.push(...index.slice(i,i+3));g.setIndex(out);g.computeBoundingSphere();o.geometry=g;triangles+=out.length/3;o.frustumCulled=false;o.castShadow=false;});return triangles;}
export function createActor(template,parent,{fps=false,guard=false,id=0}={}){
 const group=new T.Group(),model=cloneSkeleton(template.model);if(fps)model.position.y+=.16;group.add(model);parent.add(group);group.name=fps?'Καπετάνιος — πρώτο πρόσωπο':guard?'Ασφάλεια πλοίου':'Επιβάτης';
 const bones=new Map();model.traverse(o=>{if(o.isBone)bones.set(norm(o.name),o);if(o.isMesh){o.frustumCulled=false;o.castShadow=!fps;o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone();}});
 let limbTriangles=0;if(fps)limbTriangles=trimForFirstPerson(model);
 const mixer=new T.AnimationMixer(model),actions={};for(const k of ['idle','walk','run'])if(template.clips[k])actions[k]=mixer.clipAction(template.clips[k]);
 let motion='idle';actions.idle?.play();mixer.update(0);
 const bases=new Map();const overlayNames=[...bones.keys()].filter(n=>/^(left|right)(arm|forearm|hand|upleg|leg|foot)|^(head|neck|spine)/.test(n));
 function snapshot(){for(const n of overlayNames){const b=bones.get(n);bases.set(n,b.quaternion.clone());}}snapshot();
 const point=(x,y,z)=>group.localToWorld(new T.Vector3(x,y,z));
 function hand(side,xyz,elbow,fist=0){const arm=bones.get(side+'arm'),fore=bones.get(side+'forearm'),h=bones.get(side+'hand');group.updateWorldMatrix(true,true);aim(arm,fore,point(...elbow));aim(fore,h,point(...xyz));if(h){h.rotateY((side==='right'?-1:1)*.35);h.rotateX(-.18);}for(const [n,b] of bones)if(n.startsWith(side+'hand')&&/(index|middle|ring|pinky)/.test(n)){b.rotateZ((side==='left'?1:-1)*fist*.95);} }
 function tick(dt,{speed=0,attack=null,block=false,flinch=0,drunk=0,down=0,time=0,held=false,drinking=0}={}){
  for(const [n,bq] of bases)bones.get(n).quaternion.copy(bq);
  const wanted=speed>.15?'walk':'idle';if(wanted!==motion&&actions[wanted]){actions[wanted].reset().fadeIn(.16).play();actions[motion]?.fadeOut(.16);motion=wanted;}mixer.timeScale=motion==='walk'?clamp(speed/1.2,.55,2):1;mixer.update(dt);snapshot();
  const head=bones.get('head');if(head&&flinch){head.rotateY(Math.sin(time*45)*flinch*.45);head.rotateX(-flinch*.28);}
  if(!fps){const spine=bones.get('spine2')||bones.get('spine');if(spine){spine.rotateZ(Math.sin(time*2.4+id)*drunk*.065);spine.rotateX(flinch*.23+down*.75);}}
  if(fps||block||attack){
   let lh=[.26,1.43,.6],rh=[-.26,1.43,.6],le=[.27,1.48,.30],re=[-.26,1.48,.28],fist=0;
   if(block){lh=[.18,1.62,.45];rh=[-.18,1.61,.47];fist=.85;}
   if(held){rh=[-.23,1.38,.57];fist=.6;}
   if(drinking){const k=Math.sin(Math.PI*clamp(drinking,0,1));rh=[-.16,1.34+k*.27,.52-k*.26];fist=.55;}
   if(attack){const a=ATTACKS[attack.kind],t=attack.t,contact=a?.contact||.23,duration=a?.duration||.6;
    const reach=t<contact?Math.sin(t/contact*Math.PI/2):Math.max(0,1-(t-contact)/(duration-contact));
    const wind=clamp(t/(contact*.6),0,1);
    if(attack.kind==='slap'||attack.kind==='heavy'){
     const heavy=attack.kind==='heavy',across=clamp((t-contact*.48)/(contact*.65),0,1);
     rh=[-.62+(heavy?1.25:1.02)*across,1.33+.20*reach,(heavy?.24:.35)+reach*.55];re=[-.38,1.47,.27];
     if(t>contact+.05){const f=clamp((t-contact-.05)/(duration-contact-.05),0,1);rh=rh.map((n,i)=>T.MathUtils.lerp(n,[-.26,1.43,.6][i],f));}
    }else if(attack.kind==='punch'){rh=[-.19,1.26+.20*reach,.43+.60*reach];re=[-.24,1.47,.29+reach*.18];fist=1;}
    else if(attack.kind==='kick'){
     const upper=bones.get('rightupleg'),knee=bones.get('rightleg'),foot=bones.get('rightfoot');
     aim(upper,knee,point(-.16,.8+reach*.48,.1+reach*.52));aim(knee,foot,point(-.12,.15+reach*1.35,.25+reach*.95));
     lh=[.35,1.40,.30];rh=[-.34,1.36,.32];fist=.7;
    }
   }
   hand('left',lh,le,fist);hand('right',rh,re,fist);
  }
  group.updateWorldMatrix(true,true);
 }
 // A small readable badge differentiates guards without replacing the human mesh.
 if(guard){const c=document.createElement('canvas');c.width=256;c.height=96;const x=c.getContext('2d');x.fillStyle='#132837';x.fillRect(0,0,256,96);x.fillStyle='#f9d793';x.font='bold 31px sans-serif';x.textAlign='center';x.fillText('SECURITY',128,58);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;const badge=new T.Mesh(new T.PlaneGeometry(.33,.12),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}));badge.position.set(0,1.43,.22);group.add(badge);}
 return {group,model,bones,mixer,actions,tick,height:template.height||1.83,limbTriangles,hide:()=>group.visible=false};
}
