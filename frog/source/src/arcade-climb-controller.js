import{Quaternion,Vector3,WebGLRenderTarget}from'three';
import{createContactSkinBlend}from'./arcade-contact-skin.js';
import{applyLedgePose,installClimbRig}from'./arcade-climb-pose.js';
const warmedPrograms=new Set();
const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
// Native locomotion retains its original geometry. A short pose/weight blend
// enters and leaves the contact skin, including interruption by damage or fall.
export function createClimbPoseController(model,derived,rig,profile){
 const skin=createContactSkinBlend(model.mesh,derived),bones=Object.values(model.bones),size=bones.length*10+14,last=new Float32Array(size),entry=new Float32Array(size),q=new Quaternion(),v=new Vector3();let previous=false,mode='native',exitTime=0,flight=null;
 installClimbRig(model,rig,profile);
 function capture(out){let at=0;for(const b of bones){b.position.toArray(out,at);b.quaternion.toArray(out,at+3);b.scale.toArray(out,at+7);at+=10;}model.flightPivot.position.toArray(out,at);model.flightPivot.quaternion.toArray(out,at+3);model.group.quaternion.toArray(out,at+7);}
 function blendFrom(from,t){let at=0;for(const b of bones){b.position.lerpVectors(v.fromArray(from,at),b.position,t);b.quaternion.copy(q.fromArray(from,at+3).slerp(b.quaternion,t));b.scale.lerpVectors(v.fromArray(from,at+7),b.scale,t);at+=10;}model.flightPivot.position.lerpVectors(v.fromArray(from,at),model.flightPivot.position,t);model.flightPivot.quaternion.copy(q.fromArray(from,at+3).slerp(model.flightPivot.quaternion,t));model.group.quaternion.copy(q.fromArray(from,at+7).slerp(model.group.quaternion,t));}
 return{skin,
  beforePose(){model.mesh.geometry=skin.original.geometry;model.flightPivot.position.set(0,0,0);model.flightPivot.rotation.y=0;},
  update(actor,state,ground,dt){
   const f=actor.flight,climbing=!actor.ko&&!actor.eliminated&&!(actor.hit>0)&&!(actor.dizzyTime>0)&&f?.kind==='ledge'&&f.ledge?.plan?.ok;
   if(climbing){if(flight!==f){if(previous)entry.set(last);else capture(entry);flight=f;mode='climb';}skin.activate();applyLedgePose(model,actor,state,ground);const blend=smooth(f.time/.20);blendFrom(entry,blend);skin.setBlend(blend);model.ownsLimbPose=true;
    if(blend<1){for(const hand of model.ledgeContacts||[]){hand.phase='reach';const data=rig.hands.find(h=>h.side===hand.side);model.group.updateMatrixWorld(true);model.mesh.getVertexPosition(data.index,v).applyMatrix4(model.mesh.matrixWorld);hand.point=v.toArray();hand.error=v.distanceTo(new Vector3().fromArray(hand.target));}}
   }else{
    if(mode==='climb'){mode='exit';entry.set(last);exitTime=0;flight=null;}
    model.ledgeContacts=null;model.ledgeLegContacts=null;
    if(mode==='exit'){exitTime+=Math.max(0,dt);const t=smooth(exitTime/((actor.hit>0||actor.ko)? .08:.20));skin.activate();blendFrom(entry,t);skin.setBlend(1-t);if(t>=1){mode='native';skin.restore();}}
    else if(skin.active)skin.restore();
   }
   model.contactActive=mode!=='native';model.contactPhase=mode;model.group.updateMatrixWorld(true);capture(last);previous=true;
  },
  async prewarm(renderer,scene,camera){
   const target=renderer.getRenderTarget(),temporary=new WebGLRenderTarget(1,1,{depthBuffer:true}),active=model.contactActive;
   skin.activate();skin.setBlend(1);model.contactActive=true;
   try{await renderer.compileAsync(scene,camera);renderer.setRenderTarget(temporary);renderer.render(scene,camera);if(!warmedPrograms.size)for(const material of[skin.material,skin.depth,skin.distance])warmedPrograms.add(material);}
   finally{renderer.setRenderTarget(target);skin.restore();model.contactActive=active;temporary.dispose();}
  },
  dispose(){skin.dispose({keepPrograms:warmedPrograms.has(skin.material)});model.contactActive=false;}
 };
}
