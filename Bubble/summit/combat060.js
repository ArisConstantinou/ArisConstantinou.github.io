/* One geometry convention for the visible envelope, aim assistance and impacts. */
import * as T from 'three';
import {balloonCenter,raySphere,clamp} from './physics.js?v=0.6.0';
export const RANGE=90;
export function aimPoint(a){return a.balloon?new T.Vector3().copy(balloonCenter(a)):new T.Vector3(a.x,a.y+1.2,a.z);}
export function actorHit(a,o,d,max,extra=0){
 let best=null;const offer=(p,r,region)=>{const t=raySphere(o,d,p,r+extra,max);if(t!==null&&(!best||t<best.t)){best={t,actor:a,region};max=t;}};
 if(a.balloon)offer(balloonCenter(a),a.balloon.r,'balloon');
 // Overlapping capsules approximate the clothed silhouette, not three tiny isolated targets.
 const bank=a.balloon?(a.bank||0):0,q=new T.Quaternion().setFromEuler(new T.Euler(0,a.yaw,bank));
 for(const [x,y,z,r]of [[0,1.57,0,.22],[0,1.25,0,.39],[0,.93,0,.32],[-.18,.52,0,.24],[.18,.52,0,.24]]){
  const p=new T.Vector3(x,y,z).applyQuaternion(q).add(new T.Vector3(a.x,a.y,a.z));offer(p,r,'body');
 }return best;
}
export function firstActor(bodies,o,d,max,exclude,extra=0){let hit=null;for(const a of bodies){if(!a.alive||a.id===exclude)continue;const h=actorHit(a,o,d,max,extra);if(h&&(!hit||h.t<hit.t)){hit=h;max=h.t;}}return hit;}
export function leadingPoint(a,origin,speed=65){const p=aimPoint(a),time=Math.min(1.35,p.distanceTo(origin)/speed);return p.add(new T.Vector3(a.vx||0,a.grounded?0:(a.vy||0),a.vz||0).multiplyScalar(time*.82));}
export function recordImpact(game,shot,a,point,region,before){
 const color=shot.mesh.material.color.getHex(),hit={id:(a.hitSerial=(a.hitSerial||0)+1),color,region,heavy:shot.heavy};
 const q=new T.Quaternion().setFromEuler(new T.Euler(0,a.yaw,a.balloon?(a.bank||0):0)).invert();
 if(region==='balloon')hit.normal=point.clone().sub(new T.Vector3().copy(before.center)).normalize().applyQuaternion(q).toArray();
 else hit.local=point.clone().sub(new T.Vector3(a.x,a.y,a.z)).applyQuaternion(q).toArray();
 a.gumMarks??=[];a.gumMarks.push(hit);if(a.gumMarks.length>18)a.gumMarks.shift();a.impactUntil=game.time+.55;
 if(region==='body'&&a.grounded){a.stun=Math.max(a.stun,.32);a.cooldown=Math.max(a.cooldown,.45);const d=point.clone().sub(shot.owner);if(Number.isFinite(d.x)){a.vx+=Math.sign(a.x-shot.owner.x)*1.1;a.vz+=Math.sign(a.z-shot.owner.z)*1.1;}}
 game.director?.impact(a,point,{weight:a.gum-before.gum,damage:before.hp-a.hp,integrity:before.integrity-(a.balloon?.integrity||0),region,owner:shot.owner,burst:!!before.balloon&&!a.balloon,color,heavy:shot.heavy});
}
const decalGeometry=new T.SphereGeometry(1,14,10);
export function poseImpacts(view,a,time){
 view.patches.visible=false; // actual, colour-matched hit attachments replace generic weight beads
 view.impactPatches??=new T.Group();if(!view.impactPatches.parent)view.root.add(view.impactPatches);
 view.impactPatches.visible=a.alive&&view.model.visible;
 const marks=a.gumMarks||[];
 if(view.impactSerial!==a.hitSerial){
  for(const mesh of view.impactPatches.children)mesh.material.dispose();view.impactPatches.clear();
  for(const mark of marks){const mesh=new T.Mesh(decalGeometry,new T.MeshStandardMaterial({color:mark.color,roughness:.26,metalness:.05}));mesh.userData.mark=mark;view.impactPatches.add(mesh);}
  view.impactSerial=a.hitSerial;
 }
 for(const mesh of view.impactPatches.children){const m=mesh.userData.mark,n=new T.Vector3();
  if(m.region==='balloon'){mesh.visible=!!a.balloon;if(!a.balloon)continue;n.fromArray(m.normal);mesh.position.copy(view.balloon.position).addScaledVector(n,a.balloon.r*.987);mesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),n);const size=m.heavy?.64:.37;mesh.scale.set(size,size*.84,.10);}
  else{mesh.position.fromArray(m.local);n.copy(mesh.position).setY(0).normalize();mesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),n.lengthSq()?n:new T.Vector3(0,0,1));mesh.scale.set(m.heavy?.30:.18,m.heavy?.26:.16,.07);}
 }
 const impact=Math.max(0,(a.impactUntil||0)-time);
 if(a.balloon){const wobble=Math.sin(impact*42)*impact*.13;view.balloon.scale.set(a.balloon.r*(1+wobble),a.balloon.r*(1-wobble*.65),a.balloon.r*(1+wobble*.45));view.balloon.material.emissive.setHex(impact>0?0x6a234d:0x000000);view.balloon.material.emissiveIntensity=impact*.5;}
 if(a.grounded&&impact>0)view.model.rotation.x=Math.sin(impact*10)*.05;else view.model.rotation.x=0;
}
