import * as THREE from 'three';
import {HEARTH} from './hearth-rules.js';

const YAW_LIMIT=70*Math.PI/180,DOWN_LIMIT=60*Math.PI/180,UP_LIMIT=35*Math.PI/180;
const UP=new THREE.Vector3(0,1,0);
const angle=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));

/** Threats establish the waist's firing sector before either outlet chooses
 * its target. A close enemy between/outside the hands must not lose to floor
 * clutter or be rejected using the preceding frame's nozzle heading.
 */
export function createHearthAimTargets(){
 const targets=['L','R'].map(side=>({side,entity:null,point:new THREE.Vector3(),score:Infinity,alternative:null,alternativeScore:Infinity}));
 const center=new THREE.Vector3(),point=new THREE.Vector3();let desiredYaw=0;
 function targetPoint(e,out){out.copy(e.body.position);if(e.category==='actor')out.y+=Math.min(.35,(e.cy||0)*.35);return out;}
 function eligible(e){return e!==heldEntity&&!e.removed&&!e.dead&&!e.reserved&&!e.isPlayer&&!e.ally&&e.body&&(e.category==='actor'||e.category==='prop');}
 let heldEntity=null;
 function update(entities,streams,{active,yaw=0,center:bodyCenter,held=null,preferred=null,manual=false,manualPoint=null,clear}){
  heldEntity=held;desiredYaw=yaw;
  for(const t of targets)t.manual=false;
  if(active&&manual){
   for(const t of targets){t.entity=null;t.alternative=null;t.score=Infinity;t.manual=true;if(manualPoint)t.point.copy(manualPoint);else t.point.copy(bodyCenter||streams[0].origin).add(new THREE.Vector3(Math.sin(yaw)*HEARTH.range,0,Math.cos(yaw)*HEARTH.range));}
   return targets;
  }
  if(!active){for(const t of targets)t.entity=null;return targets;}
  if(bodyCenter)center.copy(bodyCenter);else center.copy(streams[0].origin).add(streams[1]?.origin||streams[0].origin).multiplyScalar(.5);
  let focus=null,focusScore=Infinity,focusTier=Infinity;
  for(const e of entities){
   if(!eligible(e))continue;
   targetPoint(e,point);const dx=point.x-center.x,dz=point.z-center.z,distance=Math.hypot(dx,dz),heading=Math.atan2(dx,dz);
   if(distance<.25||!streams.some(s=>{const d=Math.hypot(point.x-s.origin.x,point.z-s.origin.z),pitch=Math.atan2(point.y-s.origin.y,d);return d>=.1&&d<=HEARTH.range-.15&&pitch>=-DOWN_LIMIT&&pitch<=UP_LIMIT&&clear(s.origin,point);}))continue;
   // Ordinary items remain in the player's forward sector. Nearby living
   // threats can turn the waist; a deliberately selected item is still usable.
   if(e.category==='prop'&&e!==preferred&&Math.abs(angle(heading,yaw))>YAW_LIMIT)continue;
   const tier=e.category==='actor'?0:1,score=distance+Math.abs(angle(heading,yaw))*.12-(e===preferred?.6:0);
   if(tier<focusTier||tier===focusTier&&score<focusScore){focus=e;focusTier=tier;focusScore=score;}
  }
  const sector=focus?Math.atan2(focus.body.position.x-center.x,focus.body.position.z-center.z):yaw;
  for(let i=0;i<targets.length;i++){
   const t=targets[i],previous=t.entity,origin=streams[i]?.origin;t.entity=null;t.score=Infinity;t.alternative=null;t.alternativeScore=Infinity;
   if(!origin)continue;
   for(const e of entities){
    if(!eligible(e))continue;
    const p=targetPoint(e,point),dx=p.x-origin.x,dz=p.z-origin.z,distance=Math.hypot(dx,dz),bodyDistance=Math.hypot(p.x-center.x,p.z-center.z),heading=Math.atan2(p.x-center.x,p.z-center.z),horizontal=angle(heading,sector),pitch=Math.atan2(p.y-origin.y,distance);
    if(distance<.1||distance>HEARTH.range-.15||Math.abs(angle(heading,sector))>2*YAW_LIMIT||pitch< -DOWN_LIMIT||pitch>UP_LIMIT||!clear(origin,p))continue;
    const wrongSide=i===0?Math.max(0,horizontal):Math.max(0,-horizontal);
    // Tier gaps exceed every distance/angle term. Unattended objects cannot
    // beat an available enemy, while an exact pointer item can use one hand.
    const tier=e===preferred&&(e.category==='actor'||focusTier!==0)?-1:e.category==='actor'?0:2;
    const score=tier*20+bodyDistance*.6+Math.abs(horizontal)*.12+wrongSide*.35-(e===previous?.15:0);
    if(score<t.score){t.alternative=t.entity;t.alternativeScore=t.score;t.entity=e;t.score=score;}
    else if(score<t.alternativeScore){t.alternative=e;t.alternativeScore=score;}
   }
  }
  if(focus?.category==='actor'&&preferred&&preferred!==focus&&targets.every(t=>t.entity===preferred)){
   targetPoint(focus,point);const first=streams[0].origin.distanceToSquared(point)<streams[1].origin.distanceToSquared(point)?0:1;
   for(const i of [first,1-first]){
    const origin=streams[i].origin,distance=Math.hypot(point.x-origin.x,point.z-origin.z),pitch=Math.atan2(point.y-origin.y,distance);
    if(distance>=.1&&distance<=HEARTH.range-.15&&pitch>=-DOWN_LIMIT&&pitch<=UP_LIMIT&&clear(origin,point)){targets[i].entity=focus;targets[i].score=0;break;}
   }
  }
  // Split comparable threats/items, but never spread from a live enemy to
  // lower-priority debris merely because the other hand is on that side.
  if(targets[0].entity&&targets[0].entity===targets[1].entity&&targets[0].entity!==preferred){
   const a=targets[0],b=targets[1],leftPenalty=a.alternativeScore-a.score,rightPenalty=b.alternativeScore-b.score;
   if(Math.min(leftPenalty,rightPenalty)<.65){const t=leftPenalty<rightPenalty?a:b;t.entity=t.alternative;t.score=t.alternativeScore;}
  }
  desiredYaw=sector;
  let x=0,z=0;for(const t of targets)if(t.entity){targetPoint(t.entity,t.point);const heading=Math.atan2(t.point.x-center.x,t.point.z-center.z);x+=Math.sin(heading);z+=Math.cos(heading);}
  if(x*x+z*z>1e-8)desiredYaw=Math.atan2(x,z);
  return targets;
 }
 return {targets,update,get desiredYaw(){return desiredYaw;}};
}

/** Mechanical aiming overlays authored fire motion. Yaw comes from the
 * shoulder; elevation is shared by shoulder and elbow. Forearm-mounted
 * burners, hands and fingers remain attached to their actual rig parents.
 */
export function createHearthArmAim(group,model,bones){
 if(!bones.nozzle_L||!bones.nozzle_R)return null;
 const arms=['L','R'].map(side=>({side,upper:bones['upper_'+side],lower:bones['lower_'+side],nozzle:bones['nozzle_'+side],authored:[new THREE.Quaternion(),new THREE.Quaternion()],yaw:0,pitch:0,target:null,error:0,goalYaw:0,goalPitch:0}));
 if(arms.some(a=>!a.upper||!a.lower))throw Error('HEARTH aiming requires both measured shoulder/elbow chains');
 const origin=new THREE.Vector3(),direction=new THREE.Vector3(),wanted=new THREE.Vector3(),axis=new THREE.Vector3();
 const delta=new THREE.Quaternion(),world=new THREE.Quaternion(),parent=new THREE.Quaternion();let applied=false;
 const decompositionPosition=new THREE.Vector3(),decompositionScale=new THREE.Vector3();
 function beforeAnimation(){if(!applied)return;for(const a of arms){a.upper.quaternion.copy(a.authored[0]);a.lower.quaternion.copy(a.authored[1]);}applied=false;}
 function rotate(bone,axis,amount){
  // During the bounded solve only these three chain matrices are needed.
  // Avoid repeatedly walking all finger descendants and every ancestor.
  bone.updateWorldMatrix(false,false);bone.matrixWorld.decompose(decompositionPosition,world,decompositionScale);
  delta.setFromAxisAngle(axis,amount);world.premultiply(delta);bone.parent.matrixWorld.decompose(decompositionPosition,parent,decompositionScale);parent.invert();
  bone.quaternion.copy(parent.multiply(world)).normalize();bone.updateWorldMatrix(false,false);
 }
 function measure(a){a.upper.updateWorldMatrix(false,false);a.lower.updateWorldMatrix(false,false);a.nozzle.updateWorldMatrix(false,false);origin.set(0,.28,0).applyMatrix4(a.nozzle.matrixWorld);direction.set(0,1,0).transformDirection(a.nozzle.matrixWorld);}
 function pose(a,yaw,pitch){
  a.upper.quaternion.copy(a.authored[0]);a.lower.quaternion.copy(a.authored[1]);a.upper.updateWorldMatrix(false,false);a.lower.updateWorldMatrix(false,false);
  rotate(a.upper,UP,yaw);measure(a);const heading=Math.atan2(direction.x,direction.z);axis.set(Math.cos(heading),0,-Math.sin(heading));
  rotate(a.upper,axis,-pitch*.45);rotate(a.lower,axis,-pitch*.55);
 }
 function smooth(current,goal,dt){const difference=goal-current;return current+THREE.MathUtils.clamp(difference*(1-Math.exp(-11*dt)),-3.6*dt,3.6*dt);}
 function update(dt,{active=false,targets=[],enabled=true,matricesReady=false}={}){
  // The production caller has just updated the waist and its descendants.
  // Reuse those parent matrices; standalone callers still get a full update.
  if(!matricesReady)model.updateMatrixWorld(true);
  let changed=false;
  for(let i=0;i<arms.length;i++){
   const a=arms[i];a.authored[0].copy(a.upper.quaternion);a.authored[1].copy(a.lower.quaternion);a.target=active&&(targets[i]?.manual||targets[i]?.entity)?targets[i].point:null;
   if(!enabled){a.yaw=a.pitch=0;a.target=null;continue;}
   if(!active&&!a.target&&Math.abs(a.yaw)+Math.abs(a.pitch)<1e-8){a.yaw=a.pitch=a.goalYaw=a.goalPitch=a.error=0;continue;}
   let goalYaw=a.target?a.goalYaw:0,goalPitch=a.target?a.goalPitch:0;
   if(a.target&&dt>0){
    // Solve from measured outlet positions, including their movement as the
    // joints rotate. Never fake alignment by rotating just the flame effect.
    for(let pass=0;pass<5;pass++){
     pose(a,goalYaw,goalPitch);measure(a);wanted.copy(a.target).sub(origin);
     goalYaw=THREE.MathUtils.clamp(goalYaw+.55*angle(Math.atan2(wanted.x,wanted.z),Math.atan2(direction.x,direction.z)),-YAW_LIMIT,YAW_LIMIT);
     const wantedPitch=THREE.MathUtils.clamp(Math.atan2(wanted.y,Math.hypot(wanted.x,wanted.z)),-DOWN_LIMIT,UP_LIMIT);
     goalPitch=THREE.MathUtils.clamp(goalPitch+.55*(wantedPitch-Math.atan2(direction.y,Math.hypot(direction.x,direction.z))),-DOWN_LIMIT,UP_LIMIT);
    }
   }else if(active){
    // The authored Fire clip dips the burners. Empty ground should leave
    // their actual outlets level, rather than invent a floor target.
    pose(a,0,0);measure(a);goalPitch=-Math.atan2(direction.y,Math.hypot(direction.x,direction.z));
   }
   a.goalYaw=goalYaw;a.goalPitch=goalPitch;
   a.yaw=smooth(a.yaw,goalYaw,Math.max(0,dt));a.pitch=smooth(a.pitch,goalPitch,Math.max(0,dt));pose(a,a.yaw,a.pitch);measure(a);
   changed=true;
   a.error=a.target?direction.angleTo(wanted.copy(a.target).sub(origin)):0;
  }
  applied=changed;
 }
 function snapshot(){return{arms:arms.map(a=>({side:a.side,yaw:a.yaw,pitch:a.pitch,goalYaw:a.goalYaw,goalPitch:a.goalPitch,error:a.error,target:a.target?.toArray()??null,shoulder:a.upper.getWorldPosition(new THREE.Vector3()).toArray(),elbow:a.lower.getWorldPosition(new THREE.Vector3()).toArray()}))};}
 return {beforeAnimation,update,snapshot};
}
