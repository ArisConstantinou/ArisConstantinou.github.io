// Deterministic gameplay model. All distances are metres and times seconds.
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const KNOTS=1.94384449;
export const TOTAL_PEOPLE=24;
export function newVoyage(difficulty=0){
  return {x:0,z:0,y:0,heading:0,speed:0,rudder:0,throttle:.55,hull:100,intox:0,panic:6,
    roll:0,pitch:0,storm:difficulty?1:.73,difficulty,time:0,drinks:0,collisions:0,
    collisionCooldown:0,drinkCooldown:0,hornCooldown:0,announceCooldown:0,rescueCooldown:0,
    drinkAnim:0,impact:0,nearest:null,distance:3800,progress:0,ended:false,won:false,
    nearMisses:0,passed:new Set(),lastWarning:0,focus:0,score:0};
}
export function hullContact(s,obstacle){
  // A capsule runs along the whole hull, preventing its bow/stern passing through terrain.
  const fx=Math.sin(s.heading),fz=Math.cos(s.heading);
  const dx=obstacle.x-s.x,dz=obstacle.z-s.z;
  const t=clamp(dx*fx+dz*fz,-55,62);
  const nx=s.x+fx*t-obstacle.x,nz=s.z+fz*t-obstacle.z;
  const len=Math.hypot(nx,nz), radius=obstacle.radius+13.3;
  if(len>=radius)return null;
  if(len<.0001)return {nx:Math.cos(s.heading),nz:-Math.sin(s.heading),penetration:radius};
  return {nx:nx/len,nz:nz/len,penetration:radius-len};
}
export function useAction(s,action){
  if(s.ended)return {ok:false};
  if(action==='drink'){
    if(s.drinkCooldown>0)return {ok:false,message:'Μια στιγμή, καπετάνιε…'};
    s.intox=clamp(s.intox+22,0,100);s.drinks++;s.drinkCooldown=3.8;s.drinkAnim=1;
    s.panic=clamp(s.panic+2.8,0,100);
    return {ok:true,message:s.intox>78?'Το τιμόνι διπλασιάστηκε. Ή μήπως είναι η κάμερα;':s.intox>45?'Άλλο ένα. Η πορεία αρχίζει να ξεφεύγει.':'Στην υγειά μας, καπετάνιε. Κοίτα και μπροστά.'};
  }
  if(action==='horn'){
    if(s.hornCooldown>0)return {ok:false};
    s.hornCooldown=3;s.panic=clamp(s.panic-1.8,0,100);
    return {ok:true};
  }
  if(action==='announce'){
    if(s.announceCooldown>0)return {ok:false,message:'Ο ασύρματος ετοιμάζεται…'};
    s.announceCooldown=16;s.panic=clamp(s.panic-19,0,100);s.focus=7;
    return {ok:true,message:'Παραμείνετε ψύχραιμοι. Το πλήρωμα βρίσκεται κοντά σας.'};
  }
  if(action==='rescue'){
    if(s.rescueCooldown>0)return {ok:false};
    if(Math.abs(s.speed)*KNOTS>6)return {ok:false,message:'Κράτει! Μείωσε κάτω από 6 knots για περισυλλογή.'};
    return {ok:true};
  }
  return {ok:false};
}
export function advance(s,dt,input,obstacles,sampleHeight,harbor,onEvent=()=>{}){
  if(s.ended)return;
  dt=clamp(dt,0,.08);
  const steps=Math.max(1,Math.ceil(dt/.0167)),h=dt/steps;
  for(let j=0;j<steps;j++){
    s.time+=h;
    for(const key of ['collisionCooldown','drinkCooldown','hornCooldown','announceCooldown','rescueCooldown','focus'])s[key]=Math.max(0,s[key]-h);
    s.drinkAnim=Math.max(0,s.drinkAnim-h*.62);s.impact=Math.max(0,s.impact-h*1.7);
    s.intox=Math.max(0,s.intox-h*.24);
    s.throttle=clamp(input.throttle,-.35,1);
    const drunk=s.intox/100;
    const waveSteer=(Math.sin(s.time*1.37)*.27+Math.sin(s.time*.43+1.6)*.42)*drunk*drunk;
    const targetRudder=clamp(input.turn*(1-drunk*.28)+waveSteer,-1,1);
    s.rudder=lerp(s.rudder,targetRudder,1-Math.exp(-h*(2.8-drunk*1.95)));
    const targetSpeed=s.throttle*(s.throttle<0?10:18)*(s.hull<30?.67:1);
    const acceleration=targetSpeed>s.speed?.44:.72;
    s.speed+=clamp(targetSpeed-s.speed,-acceleration*h,acceleration*h);
    // Looking toward +Z with +Y up, starboard is world -X. Positive helm
    // therefore decreases the mathematical Y rotation (clockwise on screen).
    s.heading-=s.rudder*.063*(s.speed/12)*h;
    const current=s.storm*(.2+.12*Math.sin(s.time*.08));
    s.x+=(Math.sin(s.heading)*s.speed+current)*h;
    s.z+=Math.cos(s.heading)*s.speed*h;
    for(let pass=0;pass<3;pass++){
      let touched=false;
      for(const obstacle of obstacles){
        if(Math.abs(obstacle.z-s.z)>obstacle.radius+95||Math.abs(obstacle.x-s.x)>obstacle.radius+95)continue;
        const c=hullContact(s,obstacle);if(!c)continue;
        touched=true;s.x+=c.nx*(c.penetration+.08);s.z+=c.nz*(c.penetration+.08);
        if(s.collisionCooldown<=0&&Math.abs(s.speed)>.5){
          const hitSpeed=Math.abs(s.speed);
          const damage=clamp(2+hitSpeed*(s.difficulty?2.3:1.65),3,38);
          s.hull=clamp(s.hull-damage,0,100);s.panic=clamp(s.panic+12+hitSpeed*.8,0,100);
          s.collisions++;s.collisionCooldown=1.6;s.impact=1;
          onEvent({type:'collision',obstacle,damage,speed:hitSpeed});
        }
        const inward=Math.sin(s.heading)*c.nx+Math.cos(s.heading)*c.nz;
        if(s.speed*inward<0)s.speed*=.24;
      }
      if(!touched)break;
    }
    const fx=Math.sin(s.heading),fz=Math.cos(s.heading),rx=fz,rz=-fx;
    const y0=sampleHeight(s.x,s.z,s.time);
    const a=sampleHeight(s.x+rx*10,s.z+rz*10,s.time);
    const b=sampleHeight(s.x-rx*10,s.z-rz*10,s.time);
    const bow=sampleHeight(s.x+fx*47,s.z+fz*47,s.time);
    const stern=sampleHeight(s.x-fx*47,s.z-fz*47,s.time);
    const targetRoll=clamp(Math.atan2(a-b,23)*.73+s.rudder*s.speed*.005,-.235,.235);
    const targetPitch=clamp(-Math.atan2(bow-stern,94),-.095,.095);
    s.y=lerp(s.y,y0*.6,1-Math.exp(-h*1.1));
    s.roll=lerp(s.roll,targetRoll,1-Math.exp(-h*1.65));
    s.pitch=lerp(s.pitch,targetPitch,1-Math.exp(-h*1.3));
    const motionPanic=Math.max(0,Math.abs(s.roll)-.068)*3.5;
    const drinkPanic=Math.max(0,s.intox-43)*.0045;
    const speedPanic=Math.max(0,s.speed-12)*.017;
    const settle=s.focus>0?.43:s.speed<6?.115:.045;
    s.panic=clamp(s.panic+(motionPanic+drinkPanic+speedPanic-settle)*h,0,100);
    if(s.hull<20)s.hull=Math.max(0,s.hull-h*.075);
    s.distance=Math.hypot(harbor.x-s.x,harbor.z-s.z);
    s.progress=clamp(s.z/harbor.z,0,1);
    if(s.distance<harbor.radius&&Math.abs(s.speed)*KNOTS<12){s.ended=true;s.won=true;onEvent({type:'win'});break;}
    if(s.hull<=0){s.ended=true;s.won=false;onEvent({type:'sink'});break;}
  }
  let nearest=null;
  const fx=Math.sin(s.heading),fz=Math.cos(s.heading);
  for(const o of obstacles){
    const dx=o.x-s.x,dz=o.z-s.z,forward=dx*fx+dz*fz,lateral=Math.abs(dx*fz-dz*fx);
    const clearance=Math.hypot(dx,dz)-o.radius-70;
    const direction=s.speed<-.15?-1:1;
    const ahead=forward*direction;
    const hitRadius=o.radius+13.3;
    const entry=ahead-62-Math.sqrt(Math.max(0,hitRadius*hitRadius-lateral*lateral));
    const ttc=lateral<hitRadius&&Math.abs(s.speed)>.5?Math.max(0,entry)/Math.abs(s.speed):Infinity;
    if(ahead>0&&lateral<o.radius+36&&clearance<Math.max(140,Math.abs(s.speed)*24)){
      if(!nearest||ttc<nearest.ttc||ttc===nearest.ttc&&clearance<nearest.clearance)nearest={...o,clearance,ttc,reverse:direction<0};
    }
    if(forward<-o.radius-70&&!s.passed.has(o.id)){
      s.passed.add(o.id);
      if(lateral<o.radius+65&&lateral>o.radius+12){s.nearMisses++;onEvent({type:'nearMiss'});}
    }
  }
  s.nearest=nearest;
  if(nearest?.ttc<24){
    const target=nearest.ttc<6?88:nearest.ttc<12?68:42;
    if(s.panic<target)s.panic=Math.min(target,s.panic+dt*(nearest.ttc<6?5.0:2.1));
  }
}
export function voyageScore(s,stats){
  const safe=(stats.onboard||0)+(stats.rescued||0);
  return Math.max(0,Math.round(s.progress*1200+safe*100+(stats.rescued||0)*120+s.hull*7+s.nearMisses*70+s.drinks*45-(stats.lost||0)*200-s.collisions*80+(s.won?Math.max(0,700-s.time):0)));
}
