import * as T from 'three';
import {GLTFLoader} from './vendor/loaders/GLTFLoader.js';
import {clone} from './vendor/utils/SkeletonUtils.js';
import {clamp} from './physics.js?v=0.6.0';
const assets=new URL('./assets/',import.meta.url),Y=new T.Vector3(0,1,0);
export async function loadPeople(){const loader=new GLTFLoader;return Promise.all(['human.glb','human-woman.glb'].map(p=>loader.loadAsync(new URL(p,assets).href)));}
export function makeGun(){
 const group=new T.Group,steel=new T.MeshStandardMaterial({color:0x233946,metalness:.7,roughness:.28}),chrome=new T.MeshStandardMaterial({color:0xc0d9d6,metalness:.9,roughness:.22}),gum=new T.MeshStandardMaterial({color:0xd787c9,roughness:.23,metalness:.05,emissive:0x6e234e,emissiveIntensity:.15});
 const add=(geo,mat,x,y,z,rx=0)=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.rotation.x=rx;group.add(m);return m;};
 const outline=[new T.Vector2(.04,0),new T.Vector2(.075,.05),new T.Vector2(.09,.13),new T.Vector2(.09,.44),new T.Vector2(.065,.50),new T.Vector2(.06,.58)];add(new T.LatheGeometry(outline,32),steel,0,0,0,Math.PI/2);
 for(const z of[.09,.40,.52])add(new T.TorusGeometry(.083,.012,8,32),chrome,0,0,z);
 add(new T.CylinderGeometry(.03,.04,.44,24),gum,0,0,.39,Math.PI/2);
 add(new T.BoxGeometry(.11,.22,.14),steel,0,-.13,.04,-.25);
 add(new T.TorusGeometry(.075,.012,8,20),chrome,0,-.10,.21,Math.PI/2);
 add(new T.BoxGeometry(.035,.045,.10),chrome,0,.093,.39);
 const tank=add(new T.CylinderGeometry(.066,.066,.28,24),gum,-.13,.15,.12);group.userData.tank=tank;
 add(new T.CylinderGeometry(.074,.074,.014,24),chrome,-.13,.297,.12);add(new T.CylinderGeometry(.074,.074,.014,24),chrome,-.13,.005,.12);
 const glass=new T.MeshPhysicalMaterial({color:0xbce9dd,transparent:true,opacity:.18,roughness:.12,metalness:.08,depthWrite:false});add(new T.CylinderGeometry(.075,.075,.28,24),glass,-.13,.15,.12);
 return group;
}
export function makePerson(source,scene,color=0xdd88c1){
 const root=new T.Group,model=clone(source.scene);root.add(model);scene.add(root);model.updateMatrixWorld(true);
 const bounds=new T.Box3().setFromObject(model),scale=1.78/(bounds.max.y-bounds.min.y);model.scale.setScalar(scale);model.position.y=-bounds.min.y*scale;model.updateMatrixWorld(true);
 const bones={},rest={};model.traverse(o=>{if(o.isBone){bones[o.name]=o;rest[o.name]={q:o.quaternion.clone(),p:o.position.clone()};}if(o.isMesh){o.frustumCulled=false;o.castShadow=true;o.receiveShadow=true;const materials=Array.isArray(o.material)?o.material:[o.material];o.material=materials.map(m=>{m=m.clone();m.roughness=.77;m.metalness=0;const hair=/short02|bob01|eyebrow/i.test(m.name);m.transparent=false;m.opacity=1;m.depthWrite=true;m.alphaTest=hair?.42:0;m.side=hair?T.DoubleSide:T.FrontSide;return m;});if(o.material.length===1)o.material=o.material[0];}});
 const gun=makeGun();root.add(gun);
 const material=new T.MeshPhysicalMaterial({color,roughness:.24,metalness:.12,clearcoat:.6,clearcoatRoughness:.25,transparent:true,opacity:.83,depthWrite:false});
 const balloon=new T.Mesh(new T.SphereGeometry(1,40,28),material);balloon.castShadow=true;root.add(balloon);
 const tail=new T.Mesh(new T.CylinderGeometry(.14,.018,1,20),material);root.add(tail);
 const patches=new T.Group;root.add(patches);
 return {root,model,bones,rest,gun,balloon,tail,patches,color,shownGum:-1};
}
function pointBone(p,name,direction){const b=p.bones[name];if(!b)return;b.updateWorldMatrix(true,false);const q=b.getWorldQuaternion(new T.Quaternion()),target=direction.normalize().applyQuaternion(p.root.getWorldQuaternion(new T.Quaternion())),axis=Y.clone().applyQuaternion(q);const change=new T.Quaternion().setFromUnitVectors(axis,target),parent=b.parent.getWorldQuaternion(new T.Quaternion()).invert();b.quaternion.copy(parent.multiply(change).multiply(q));b.updateWorldMatrix(false,true);}
export function posePerson(p,a,time,dt,fps=false,near=true){
 p.root.position.set(a.x,a.y,a.z);p.root.rotation.set(0,a.yaw,a.balloon?a.bank:0);p.root.visible=a.alive;p.model.visible=!fps&&near;p.gun.visible=!fps&&near;
 const show=!!a.balloon;p.balloon.visible=p.tail.visible=show;
 const gumColor=a.balloon?.color??a.gumMix?.color??p.color;p.balloon.material.color.setHex(gumColor);p.gun.userData.tank.material.color.setHex(gumColor);
 if(show){const r=a.balloon.r;p.balloon.scale.set(r*(1+Math.sin(time*1.8)*.006),r,r);p.balloon.position.set(0,1.70+r+.3,.45);p.tail.position.set(0,2.08,.43);p.tail.scale.set(1,.79,1);p.balloon.material.opacity=fps?.14:.78;}
 if(!a.alive||!near)return;
 for(const [name,b]of Object.entries(p.bones)){b.quaternion.copy(p.rest[name].q);b.position.copy(p.rest[name].p);}p.model.updateMatrixWorld(true);
 const walking=a.grounded&&Math.hypot(a.actualVx||0,a.actualVz||0)>.25,phase=a.step*2*Math.PI;
 for(const [side,sign]of[['l',1],['r',-1]]){
  const swing=walking?Math.sin(phase+(sign<0?Math.PI:0))*.32:0;
  pointBone(p,'thigh_'+side,new T.Vector3(sign*.02,-1,a.balloon?-.12:swing));
  pointBone(p,'calf_'+side,new T.Vector3(0,-1,a.balloon?.23:-Math.max(0,swing)*.7));
  pointBone(p,'foot_'+side,new T.Vector3(0,-.4,1));
  if(side==='r'){pointBone(p,'upperarm_r',new T.Vector3(-.08,-.7,.6));pointBone(p,'lowerarm_r',new T.Vector3(.12,-.07,1));}
  else{pointBone(p,'upperarm_l',new T.Vector3(.11,-1,-swing*.6));pointBone(p,'lowerarm_l',new T.Vector3(.07,-1,.13));}
 }
 const head=p.bones.head;if(head)head.rotation.x+=clamp(-a.pitch*.25,-.18,.18);p.model.updateMatrixWorld(true);
 const hand=p.bones.hand_r.getWorldPosition(new T.Vector3());p.root.worldToLocal(hand);p.gun.position.copy(hand);p.gun.rotation.x=-a.pitch;if(a.aimPoint)p.gun.lookAt(new T.Vector3().copy(a.aimPoint));
 p.gun.userData.tank.scale.y=Math.max(.025,a.ammo/64);
 if(Math.floor(a.gum/5)!==p.shownGum){p.shownGum=Math.floor(a.gum/5);for(const m of p.patches.children){m.geometry.dispose();m.material.dispose();}p.patches.clear();for(let i=0;i<Math.min(22,p.shownGum);i++){const m=new T.Mesh(new T.SphereGeometry(.13,12,8),new T.MeshStandardMaterial({color:0xce86bd,roughness:.32}));const an=i*2.4,y=.35+(i%5)*.29;m.position.set(Math.sin(an)*.28,y,Math.cos(an)*.25);m.scale.set(1,.75,.6);p.patches.add(m);}}
 p.patches.visible=!fps;
}
