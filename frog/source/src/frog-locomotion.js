/** A frog's ground locomotion is a sequence of committed, directional hops.
 * Input supplies the NEXT take-off. Airborne velocity is never replaced by
 * keyboard release, camera rotation or a newly selected AI waypoint.
 */
export const FROG_HOP = Object.freeze({gravity:20, strength:4.5, gather:.065, land:.055, maxAirSpeed:16});
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const turn=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*Math.min(1,t);

export function requestFrogTravel(f,vx=0,vz=0,{distance=Infinity}={}){
  f.travelWish={vx:Number(vx)||0,vz:Number(vz)||0,distance:Math.max(0,distance)};
}

export function beginFrogJump(f,strength=FROG_HOP.strength,{automatic=false,redirect=false}={}){
  if(!f.grounded&&!f.swimming&&!redirect)return false;
  const wish=f.travelWish||{vx:0,vz:0,distance:Infinity};
  if(automatic){
    // Shorten hops near a work station or corner; never overshoot the waypoint
    // and then slide backwards to it on the ground.
    const nominal=Math.max(.08,2*strength/FROG_HOP.gravity);
    const limit=wish.distance;
    const wishSpeed=Math.hypot(wish.vx,wish.vz);
    if(Number.isFinite(limit)&&limit<1.5)strength*=Math.sqrt(clamp(limit/1.5,.16,1));
    const flight=2*strength/FROG_HOP.gravity;
    const boost=(nominal+FROG_HOP.gather+FROG_HOP.land)/nominal;
    const speed=Math.min(wishSpeed*boost,FROG_HOP.maxAirSpeed,limit/Math.max(.08,flight));
    f.vx=wishSpeed?wish.vx/wishSpeed*speed:0;
    f.vz=wishSpeed?wish.vz/wishSpeed*speed:0;
  }else if(Math.hypot(f.vx||0,f.vz||0)<.01){
    f.vx=wish.vx;f.vz=wish.vz;
  }
  if(Math.hypot(f.vx||0,f.vz||0)>.01)f.yaw=Math.atan2(f.vx,f.vz);
  f.vy=strength;f.grounded=false;f.jumpTime=2*strength/FROG_HOP.gravity;
  f.hop={phase:'air',time:0,duration:f.jumpTime,yaw:f.yaw,automatic};
  return true;
}

export function advanceFrogTravel(f,dt){
  const wish=f.travelWish||{vx:0,vz:0,distance:Infinity};
  if(!f.grounded){
    if(f.hop?.phase!=='air')f.hop={phase:'air',time:0,duration:Math.max(.2,Math.abs(f.vy||0)*2/FROG_HOP.gravity),yaw:f.yaw};
    f.hop.time+=dt;
    f.yaw=f.hop.yaw;
    return dt;
  }
  if(f.swimming){
    f.hop={phase:'swim',time:0};
    const blend=1-Math.exp(-14*dt);
    f.vx+=(wish.vx-f.vx)*blend;f.vz+=(wish.vz-f.vz)*blend;
    if(Math.hypot(wish.vx,wish.vz)>.01)f.yaw=turn(f.yaw,Math.atan2(wish.vx,wish.vz),dt*14);
    return dt;
  }
  f.vx=0;f.vz=0;
  let remaining=dt;
  if(f.hop?.phase==='land'){
    const needed=Math.max(0,FROG_HOP.land-f.hop.time);
    f.hop.time+=dt;
    if(f.hop.time<FROG_HOP.land)return 0;
    remaining=Math.max(0,dt-needed);
    f.hop=null;
  }
  if(Math.hypot(wish.vx,wish.vz)<.05||wish.distance<.025||f.dead||f.stun>.05||f.charge>=0){
    f.hop={phase:f.charge>=0?'gather':'idle',time:0,charge:Math.max(0,f.charge||0)};
    return 0;
  }
  if(f.hop?.phase!=='gather')f.hop={phase:'gather',time:0};
  const needed=Math.max(0,FROG_HOP.gather-f.hop.time);
  f.hop.time+=remaining;
  f.yaw=turn(f.yaw,Math.atan2(wish.vx,wish.vz),dt*20);
  if(f.hop.time>=FROG_HOP.gather){
    beginFrogJump(f,f.hopStrength||FROG_HOP.strength,{automatic:true});
    f.hop.time=Math.max(0,remaining-needed);
    return f.hop.time;
  }
  return 0;
}

export function landFrog(f){
  f.vx=0;f.vz=0;f.vy=0;f.grounded=true;f.jumpTime=0;
  f.hop={phase:'land',time:0};
}

export function frogHopPose(f){
  const h=f.hop;
  if(!h)return {phase:f.grounded?'idle':'air',progress:f.grounded?0:.5};
  if(h.phase==='gather')return {phase:'gather',progress:clamp(h.charge!==undefined?.45+h.charge*.7:h.time/FROG_HOP.gather)};
  if(h.phase==='land')return {phase:'land',progress:clamp(h.time/FROG_HOP.land)};
  if(h.phase==='air')return {phase:'air',progress:clamp(h.time/Math.max(.1,h.duration))};
  return {phase:h.phase,progress:0};
}
