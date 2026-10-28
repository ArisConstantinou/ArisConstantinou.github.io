const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const wrap=yaw=>Math.atan2(Math.sin(yaw),Math.cos(yaw));

// Passive camera look does not choose a new stance. Deliberate pointer aim or
// combat does, and the simulation retains that bearing after the input ends.
// Logical aim and movement remain independent of this visual facing query.
export function actorVisualFacing(actor,{manualFire=false,autoFire=false,currentYaw=0}={}){
 const current=wrap(finite(currentYaw)),face=wrap(finite(actor?.face,current));
 if(!actor||actor.ko||actor.eliminated||actor.dizzyTime>0||actor.knockUp>0)return {yaw:current,aiming:false};
 if(actor.sabotageId)return {yaw:face,aiming:false};
 const deliberate=actor.id==='player'?
  actor.poseAiming||manualFire||autoFire||actor.shot>0||actor.kick>0||!!actor.catapultId:
  actor.aiming||actor.aiCharging||actor.shot>0||actor.kick>0||!!actor.catapultId;
 const validAim=Number.isFinite(actor.aimX)&&Number.isFinite(actor.aimZ)&&Math.hypot(actor.aimX,actor.aimZ)>.001;
 if(deliberate&&validAim)return {yaw:Math.atan2(actor.aimX,actor.aimZ),aiming:true};
 const retained=actor.id==='player'&&Number.isFinite(actor.poseAimYaw)?wrap(actor.poseAimYaw):face;
 return {yaw:retained,aiming:false};
}
