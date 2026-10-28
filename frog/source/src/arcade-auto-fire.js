import {traceShot} from './arcade-model.js';
import {guardActive} from './arcade-guards.js';

// Auto-fire is a held touch intent, not target tracking. The caller owns the
// active gameplay/finger lifecycle; this helper never rotates or redirects aim.
// Use the current input rather than the actor's previous simulation-step aim.
export function resolveAutoFire({state,actor,input={},active=false,aiming=false}={}){
 const off={fire:false,targetId:null,trace:null};
 if(!active||!aiming||state?.status!=='playing'||state.phase!=='battle'||!actor||!Array.isArray(state.actors))return off;
 if(actor.ko||actor.eliminated||actor.dizzyTime>0||actor.hit>0||actor.knockUp>0||actor.kick>0||actor.catapultId||actor.sabotageId||!Number.isFinite(actor.ammo)||actor.ammo<=0)return off;
 if(!input||input.aiming===false||input.sabotage||input.kick||input.throwStone||input.interactCatapult||input.interact)return off;
 const ay=input.ay===undefined?0:input.ay;
 if(!Number.isFinite(actor.x)||!Number.isFinite(actor.z)||!Number.isFinite(input.ax)||!Number.isFinite(ay)||!Number.isFinite(input.az)||Math.hypot(input.ax,ay,input.az)<=.05)return off;

 // The ordinary swept projectile test supplies the same visible body volumes
 // and exact range/height/cover rules, including the muzzle offset.
 // Do not enlarge a target here: that would fire flies that actually miss.
 const trace=traceShot(state,{...actor,aimX:input.ax,aimY:ay,aimZ:input.az,aim3D:Number.isFinite(input.ay)});
 const target=trace.kind==='actor'?state.actors.find(candidate=>candidate.id===trace.targetId):trace.kind==='guard'?state.guards?.find(candidate=>candidate.id===trace.targetId):null;
 if(!target||target.id===actor.id||target.ko||target.eliminated||target.invuln>0||target.spawnShield>0)return {...off,trace};
 if(trace.kind==='guard'&&(!guardActive(target)||target.owner===actor.id))return {...off,trace};

 // Keep this as fire intent during a shot cooldown. The simulation decrements
 // that timer before shoot(), preserving the same cadence as held manual fire.
 return {fire:true,targetId:target.id,trace};
}
