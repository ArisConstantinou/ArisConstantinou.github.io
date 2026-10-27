const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const wrap=yaw=>Math.atan2(Math.sin(yaw),Math.cos(yaw));

// The reticle can remain active without locking the frog's body to the camera.
// Logical aim stays in the simulation; this helper chooses only the pose yaw.
export function actorVisualFacing(actor,{manualFire=false,autoFire=false,currentYaw=0}={}){
 const current=wrap(finite(currentYaw)),face=wrap(finite(actor?.face,current));
 if(!actor||actor.ko||actor.eliminated||actor.dizzyTime>0||actor.knockUp>0)return {yaw:current,aiming:false};
 if(actor.sabotageId)return {yaw:face,aiming:false};
 const deliberate=actor.id==='player'?
  manualFire||autoFire||actor.shot>0||actor.kick>0||!!actor.catapultId:
  actor.aiming||actor.aiCharging||actor.shot>0||actor.kick>0||!!actor.catapultId;
 const validAim=Number.isFinite(actor.aimX)&&Number.isFinite(actor.aimZ)&&Math.hypot(actor.aimX,actor.aimZ)>.001;
 return deliberate&&validAim?{yaw:Math.atan2(actor.aimX,actor.aimZ),aiming:true}:{yaw:face,aiming:false};
}
