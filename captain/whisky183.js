/** Visible, world-rendered whisky attached to the animated palm, not to an unrendered camera. */
import * as T from 'three';
export function createWhiskyProp(actor){
 const root=new T.Group();root.name='Captain held whisky';root.scale.set(.64,.90,.64);root.visible=false;root.userData.whisky183=true;actor.group.add(root);
 const amber=new T.MeshStandardMaterial({color:0x9c4e14,roughness:.30,metalness:.12,emissive:0x4a2109,emissiveIntensity:.24});
 const profile=[[-.145,.025],[-.135,.052],[-.12,.061],[.065,.061],[.085,.052],[.105,.024],[.171,.024],[.18,.027]];
 const body=new T.Mesh(new T.LatheGeometry(profile.map(([y,r])=>new T.Vector2(r,y)),24),amber);root.add(body);
 const base=new T.Mesh(new T.CylinderGeometry(.052,.042,.012,24),amber);base.position.y=-.134;root.add(base);
 const lip=new T.Mesh(new T.TorusGeometry(.024,.006,8,20),new T.MeshStandardMaterial({color:0xd8ae6c,roughness:.32,metalness:.24}));lip.rotation.x=Math.PI/2;lip.position.y=.177;root.add(lip);
 const wrap=new T.Mesh(new T.CylinderGeometry(.062,.062,.082,24),new T.MeshStandardMaterial({color:0xf0d8a5,roughness:.85}));wrap.position.y=-.025;root.add(wrap);
 const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#f1dfb5';ctx.fillRect(0,0,256,256);ctx.strokeStyle='#8c6029';ctx.lineWidth=8;ctx.strokeRect(10,10,236,236);ctx.textAlign='center';ctx.fillStyle='#37210c';ctx.font='bold 42px serif';ctx.fillText('LAST',128,72);ctx.fillText('CALL',128,119);ctx.font='bold 24px sans-serif';ctx.fillText('WHISKY',128,169);ctx.font='18px serif';ctx.fillText('CAPTAIN’S RESERVE',128,212);
 const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;
 const label=new T.Mesh(new T.PlaneGeometry(.087,.080),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}));label.position.set(0,-.025,-.064);label.rotation.y=Math.PI;root.add(label);
 root.traverse(o=>{if(o.isMesh){o.frustumCulled=false;o.castShadow=false;}});
 const hand=actor.bones.get('righthand'),finger=actor.bones.get('righthandmiddle1'),p=new T.Vector3(),f=new T.Vector3(),axis=new T.Vector3(),up=new T.Vector3(0,1,0);
 let attachmentError=0;
 function update(remaining){root.visible=remaining>0&&!!hand;if(!root.visible)return;
  actor.group.updateWorldMatrix(true,true);actor.group.worldToLocal(hand.getWorldPosition(p));
  if(finger){actor.group.worldToLocal(finger.getWorldPosition(f));p.lerp(f,.55);}
  root.position.copy(p);root.position.z-=.032;root.position.y+=.018;
  const lift=Math.sin(Math.PI*Math.max(0,Math.min(1,remaining)));
  axis.set(0,1,0).lerp(new T.Vector3(0,1.57,.04).sub(root.position).normalize(),lift*.22).normalize();
  root.quaternion.setFromUnitVectors(up,axis);root.updateWorldMatrix(true,true);attachmentError=root.position.distanceTo(p);
 }
 function inspect(){let scene=false;for(let o=root;o;o=o.parent)if(o.isScene)scene=true;
  return {visible:root.visible,sceneAttached:scene,attachmentError,position:root.getWorldPosition(new T.Vector3()).toArray(),label:'LAST CALL WHISKY'};
 }
 return {root,update,hide:()=>root.visible=false,inspect};
}
