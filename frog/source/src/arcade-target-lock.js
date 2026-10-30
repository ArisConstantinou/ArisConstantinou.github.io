import {RULES,projectileOrigin,traceShot} from './arcade-model.js';
import {PROJECTILE,projectileGround} from './arcade-projectiles.js';
import {FROG_BODY,frogBody} from './arcade-actor-bounds.js';
import {GUARD_BODY,guardActive} from './arcade-guards.js';
import {autoFireTargetVisible} from './arcade-auto-fire-visibility.js';

export const TARGET_LOCK_RULES=Object.freeze({acquirePixels:90,acquireScreenFraction:.14,range:PROJECTILE.muzzleOffset+RULES.projectileSpeed*RULES.projectileLifetime});
const finitePoint=point=>point&&['x','y','z'].every(axis=>Number.isFinite(point[axis]));
const targetById=(state,id)=>state?.actors?.find(actor=>actor.id===id)||state?.guards?.find(guard=>guard.id===id);
const eligible=(target,player)=>target&&target.id!==player.id&&!target.ko&&!target.eliminated&&Number.isFinite(target.x)&&Number.isFinite(target.z)&&(target.kind!=='guard'||target.owner!==player.id&&guardActive(target));

function active(game){
 const player=game?.state?.actors?.[0];
 return game?.settings?.mouseTargetLock===true&&game.running===true&&!game.layoutEditing&&game.state.status==='playing'&&game.state.phase==='battle'&&player&&!player.ko&&!player.eliminated&&!player.catapultId&&!(player.dizzyTime>0)&&!(player.knockUp>0)&&!player.sabotageId;
}

// This resolves an aiming aid only. It never consumes ammunition, fires,
// rotates a model/camera, or changes the simulation's stored aim.
export function targetLockAim(game,targetId){
 if(!active(game)||typeof game.project!=='function'||!Number.isFinite(game.w)||!Number.isFinite(game.h)||game.w<=0||game.h<=0)return null;
 const state=game.state,player=state.actors[0],body=targetById(state,targetId);
 if(!eligible(body,player))return null;
 const kind=body.kind==='guard'?'guard':'actor',ground=projectileGround(state,body.x,body.z);
 const target=kind==='guard'?{x:body.x,y:ground+GUARD_BODY.centerY,z:body.z}:projectileOrigin(state,body),origin=projectileOrigin(state,player);
 if(!finitePoint(target)||!finitePoint(origin))return null;
 const dx=target.x-origin.x,dy=target.y-origin.y,dz=target.z-origin.z,distance=Math.hypot(dx,dy,dz);
 if(distance<1e-6||distance>TARGET_LOCK_RULES.range)return null;
 const screen=game.project(target.x,target.y,target.z);
 if(!screen||!Number.isFinite(screen.x)||!Number.isFinite(screen.y)||screen.visible===false||screen.behind===true||screen.x<0||screen.x>game.w||screen.y<0||screen.y>game.h)return null;
 const direction={x:dx/distance,y:dy/distance,z:dz/distance};
 // The camera can see past a corner which still blocks the physical muzzle.
 // Both tests must pass, using the same body volumes and scenery as a fly.
 const trace=traceShot(state,{...player,aimX:direction.x,aimY:direction.y,aimZ:direction.z,aim3D:true});
 if(trace.targetId!==body.id||trace.kind!==kind||!autoFireTargetVisible(game,body.id,{directional:true}))return null;
 // A camera may follow this standing-height point without bobbing at each hop;
 // the shot itself still uses the target's actual current airborne body center.
 const cameraTarget={x:body.x,y:ground+(kind==='guard'?GUARD_BODY.centerY:(frogBody(body).mouthHeight??PROJECTILE.originHeight)+(body.catapultId?frogBody(body).mountedOffset:0)),z:body.z};
 return {targetId:body.id,kind,target,direction,distance,screen:{x:screen.x,y:screen.y},cameraTarget};
}

// One press gets one acquisition attempt. Losing a target leaves the hold empty
// until RMB is released, so moving bodies cannot cause automatic target swaps.
export function createTargetLock(game){
 let held=false,targetId=null,round=null;
 const update=()=>{
  if(!held||!targetId)return null;
  if(game.state!==round){targetId=null;return null;}
  const result=targetLockAim(game,targetId);if(!result)targetId=null;
  return result;
 };
 const start=(anchor)=>{
  if(held)return update();
  held=true;round=game.state;targetId=null;
  if(!active(game))return null;
  const point=anchor&&Number.isFinite(anchor.x)&&Number.isFinite(anchor.y)?anchor:{x:game.w/2,y:game.h/2};
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||point.x<0||point.x>game.w||point.y<0||point.y>game.h)return null;
  const radius=Math.min(TARGET_LOCK_RULES.acquirePixels,Math.min(game.w,game.h)*TARGET_LOCK_RULES.acquireScreenFraction),candidates=[];
  for(const body of [...game.state.actors,...(game.state.guards||[])]){
   const result=targetLockAim(game,body.id);if(!result)continue;
   const screenDistance=Math.hypot(result.screen.x-point.x,result.screen.y-point.y);
   if(screenDistance<=radius)candidates.push({...result,screenDistance});
  }
  candidates.sort((a,b)=>a.screenDistance-b.screenDistance||a.distance-b.distance||a.targetId.localeCompare(b.targetId));
  if(!candidates.length)return null;
  targetId=candidates[0].targetId;return update();
 };
 const end=()=>{held=false;targetId=null;round=null;};
 return {start,end,update,get held(){return held;},get targetId(){return targetId;}};
}
