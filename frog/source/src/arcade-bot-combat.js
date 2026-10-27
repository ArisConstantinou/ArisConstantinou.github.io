// Deliberate, readable attacks. Timers run on simulation seconds in step(),
// while all random samples come from the round's deterministic generator.
export const BOT_COMBAT=Object.freeze({reactionMin:.35,reactionMax:.6,windupMin:.4,windupMax:.55,shotRecoveryMin:.25,shotRecoveryMax:.4,burstShots:2,burstRestMin:1.15,burstRestMax:1.6,spreadRadians:.14,movingSpreadRadians:.04,heightError:.09});
const between=(random,min,max)=>min+random()*(max-min);

export function resetBotAim(actor){
 actor.aiTargetId=null;actor.aiReaction=0;actor.aiCharging=false;actor.aimWindup=0;actor.aiBurstShots=0;actor.aiAimPoint=null;
 // Keep the recovery timer: ducking behind cover cannot skip a burst's rest.
}

export function planBotShot(actor,{targetId,x,z,vertical=0,distance=1,moving=false,origin,random}){
 if(actor.aiTargetId!==targetId){
  resetBotAim(actor);actor.aiTargetId=targetId;
  actor.aiReaction=between(random,BOT_COMBAT.reactionMin,BOT_COMBAT.reactionMax);
  return false;
 }
 if(actor.aiReaction>0||actor.aiShotReady>0)return false;
 if(!actor.aiCharging){
  const spread=BOT_COMBAT.spreadRadians+(moving?BOT_COMBAT.movingSpreadRadians:0);
  const error=(random()*2-1)*spread,cos=Math.cos(error),sin=Math.sin(error);
  actor.aiAimX=x*cos-z*sin;actor.aiAimZ=x*sin+z*cos;
  actor.aiAimY=vertical+(random()*2-1)*BOT_COMBAT.heightError/Math.max(1,distance);
  actor.aiAimPoint={x:origin.x+actor.aiAimX*distance,y:origin.y+actor.aiAimY*distance,z:origin.z+actor.aiAimZ*distance};
  actor.aimWindup=between(random,BOT_COMBAT.windupMin,BOT_COMBAT.windupMax);
  actor.aiCharging=true;
 }
 // The world point is frozen through the cue. Compensate only for the bot's
 // own mouth movement/hop, never the target's later position or velocity.
 const point=actor.aiAimPoint,dx=point.x-origin.x,dz=point.z-origin.z,horizontal=Math.max(.01,Math.hypot(dx,dz));
 actor.aiAimX=dx/horizontal;actor.aiAimY=(point.y-origin.y)/horizontal;actor.aiAimZ=dz/horizontal;
 if(actor.aimWindup>0||actor.shot>0)return false;
 actor.aiCharging=false;actor.aiBurstShots++;
 const resting=actor.aiBurstShots>=BOT_COMBAT.burstShots;
 actor.aiShotReady=resting
  ?between(random,BOT_COMBAT.burstRestMin,BOT_COMBAT.burstRestMax)
  :between(random,BOT_COMBAT.shotRecoveryMin,BOT_COMBAT.shotRecoveryMax);
 if(resting)actor.aiBurstShots=0;
 return true;
}
