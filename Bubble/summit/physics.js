/* Shared metre/second simulation. Rendering, flight and telemetry use these units.
   Balloon lift is an explicit game material, not a claim about real chewing gum. */
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const mix=(a,b,t)=>a+(b-a)*t;
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export const ROUTE=[
 {name:'Αφετηρία · Ξέφωτο',x:-180,z:1030,y:218,r:52},
 {name:'01 · Πευκόραχη',x:-300,z:390,y:330,r:48},
 {name:'02 · Πέτρινες Πύλες',x:280,z:-170,y:458,r:51},
 {name:'03 · Παγωμένη Σέλα',x:-150,z:-770,y:580,r:48},
 {name:'Τερματισμός · Οροπέδιο',x:200,z:-1380,y:616,r:64}
];
export function telemetry(a,target,ground){
 const vx=Number.isFinite(a.vx)?a.vx:0,vy=Number.isFinite(a.vy)?a.vy:0,vz=Number.isFinite(a.vz)?a.vz:0;
 const vertical=a.grounded?0:vy;
 return {speed:Math.hypot(vx,vz)*3.6,ascend:Math.max(0,vertical),descend:Math.max(0,-vertical),vertical,
  altitude:Math.max(0,a.y-ground),targetDelta:target.y-a.y,distance:distance(a,target),target:target.name,
  status:a.grounded?'ΣΤΟ ΕΔΑΦΟΣ':vertical>.25?'ΑΝΟΔΟΣ':vertical<-.25?'ΚΑΘΟΔΟΣ':'ΣΤΑΘΕΡΟ ΥΨΟΣ'};
}
export function makeBody(id,point,kind='racer'){
 return {id,kind,name:id===0?'ΕΣΥ':'Ταξιδιώτης '+id,x:point.x,y:point.y+.08,z:point.z,vx:0,vy:0,vz:0,yaw:Math.PI,pitch:0,bank:0,
 radius:.42,height:1.78,grounded:true,hp:100,mass:78,gum:0,ammo:64,reload:0,balloon:null,checkpoint:0,target:1,
 bag:[3,2,1],alive:true,cooldown:0,groundTime:0,phase:Math.random()*5,step:0,finish:false,respawn:0,stun:0,shotFlash:0};
}
export function inflate(a,recipe='balanced',quality=1){
 const recipes={balanced:{lift:102,life:58,integrity:100},light:{lift:99,life:66,integrity:75},strong:{lift:118,life:56,integrity:130}};
 const p=recipes[recipe]||recipes.balanced;
 a.balloon={lift:p.lift,life:p.life*(.90+.10*clamp(quality,0,1)),maxLife:p.life,integrity:p.integrity,maxIntegrity:p.integrity,r:2.45,recipe};
 a.grounded=false;a.vy=5;a.groundTime=0;
}
export function gumHit(a,amount=7,balloonHit=false){
 if(!a.alive)return; a.gum=clamp(a.gum+amount,0,150);a.hp=Math.max(0,a.hp-(balloonHit?3:10));a.shotFlash=.25;
 if(a.balloon){a.balloon.integrity=Math.max(0,a.balloon.integrity-(balloonHit?20:4));if(a.balloon.integrity<=0)a.balloon=null;}
 if(!a.balloon&&a.grounded)a.stun=Math.min(.45,a.stun+.12);
}
export function verticalAcceleration(a,control=0,windY=0){
 if(!a.balloon)return -18;
 const b=a.balloon,total=a.mass+a.gum,lift=b.lift*clamp(b.integrity/b.maxIntegrity,.25,1);
 // Neutral regulator cancels the empty-suit lift, not the additional attached gum.
 const regulation=a.mass-b.lift;
 return (lift+regulation-total)/(total||1)*18+control*10.5-a.vy*.82+windY;
}
export function advanceBody(a,desired,world,dt,time){
 if(!a.alive)return;
 const before={x:a.x,y:a.y,z:a.z},flight=!!a.balloon&&!a.grounded;
 let vertical=desired.up||0;
 if(a.balloon){a.balloon.life-=dt*(1+Math.max(0,vertical)*.17);if(a.balloon.life<=0||a.balloon.integrity<=0){a.balloon=null;vertical=0;}}
 const heading=desired.yaw??a.yaw,dx=Math.sin(heading),dz=Math.cos(heading),rx=-Math.cos(heading),rz=Math.sin(heading);
 let mx=(desired.forward||0)*dx+(desired.side||0)*rx,mz=(desired.forward||0)*dz+(desired.side||0)*rz;
 const mag=Math.hypot(mx,mz);if(mag>1){mx/=mag;mz/=mag;}
 const flightSpeed=19*(1-.30*clamp(a.gum/100,0,1)),groundSpeed=(desired.sprint?6.1:4.3)/(1+a.gum*.018);
 const speed=a.balloon?flightSpeed:groundSpeed;const response=a.balloon?1.7:10;
 const wind=a.balloon?world.wind(a.x,a.y,a.z,time):{x:0,y:0,z:0};
 a.vx+=(mx*speed+wind.x-a.vx)*Math.min(1,dt*response);a.vz+=(mz*speed+wind.z-a.vz)*Math.min(1,dt*response);
 if(a.stun>0){a.vx*=.3;a.vz*=.3;}
 if(a.balloon&&a.grounded&&vertical>0){a.grounded=false;a.vy=4;}
 if(!a.grounded||a.balloon){a.vy+=verticalAcceleration(a,vertical,wind.y)*dt;a.vy=clamp(a.vy,-38,14);}
 else a.vy=0;
 const n=Math.max(1,Math.ceil(Math.hypot(a.vx,a.vz,a.vy)*dt/.32)),step=dt/n;
 for(let i=0;i<n;i++){
  for(const axis of ['x','z']){
   const v=axis==='x'?'vx':'vz',nx=a.x+(axis==='x'?a.vx*step:0),nz=a.z+(axis==='z'?a.vz*step:0);
   const ground=world.height(nx,nz),rise=ground-a.y;
   if(nx<world.minX+5||nx>world.maxX-5||nz<world.minZ+5||nz>world.maxZ-5){a[v]=0;continue;}
   const floor=a.grounded?Math.max(a.y,ground):a.y;
   if(a.grounded&&rise>.50){a[v]=0;continue;}
   if(!a.grounded&&rise>.30){a[v]*=-.15;continue;}
   if(world.blocked(nx,floor,nz,a.radius,a.height)){a[v]=0;continue;}
   if(a.balloon&&world.blocked(nx,a.y+1.95,nz,a.balloon.r*.75,a.balloon.r*1.8)){a[v]*=-.08;a.balloon.integrity=Math.max(0,a.balloon.integrity-step*14);continue;}
   a[axis]=axis==='x'?nx:nz;if(a.grounded&&ground>a.y)a.y=ground+.015;
  }
  const floor=world.support(a.x,a.y,a.z),newY=a.y+a.vy*step;
  if(newY<=floor+.015&&a.vy<=0){
   if(!a.grounded){const impact=-a.vy;if(impact>9)a.hp=Math.max(0,a.hp-(impact-9)*5.5);a.landed=true;}
   a.y=floor+.015;a.vy=0;a.grounded=true;
  }else if(a.vy>0){
   if(world.blocked(a.x,newY,a.z,a.radius,a.height)){a.vy=0;}else{a.y=newY;a.grounded=false;}
  }else{a.y=newY;if(a.y-floor>.06)a.grounded=false;}
 }
 if(a.balloon){const b=a.balloon,cy=a.y+1.65+b.r;
  // The envelope meets the same terrain and physical objects as everything else.
  let touching=false;for(const [x,z]of[[a.x,a.z],[a.x+b.r*.85,a.z],[a.x-b.r*.85,a.z],[a.x,a.z+b.r*.85],[a.x,a.z-b.r*.85]])if(world.height(x,z)>cy-b.r*.60)touching=true;
  if(world.blocked(a.x,cy-b.r,a.z,b.r*.7,b.r*1.8))touching=true;
  if(touching){b.integrity-=dt*12;a.vx*=.95;a.vz*=.95;}
 }
 a.groundTime=a.grounded?a.groundTime+dt:0;
 if(a.grounded&&a.balloon&&a.groundTime>.45)a.balloon=null;
 a.stun=Math.max(0,a.stun-dt);a.shotFlash=Math.max(0,a.shotFlash-dt);a.cooldown=Math.max(0,a.cooldown-dt);
 if(a.reload>0){a.reload=Math.max(0,a.reload-dt);if(a.reload===0)a.ammo=64;}
 if(a.y<0||a.hp<=0){a.alive=false;a.respawn=5;a.balloon=null;}
 // These velocities reflect actual collision-limited displacement, not key input.
 a.actualVx=(a.x-before.x)/dt;a.actualVy=(a.y-before.y)/dt;a.actualVz=(a.z-before.z)/dt;
 a.step+=Math.hypot(a.x-before.x,a.z-before.z)*.63;
 a.bank+=(clamp(-(desired.side||0)*.30,-.35,.35)-a.bank)*Math.min(1,dt*5);
}
export function separateBodies(list,world){
 for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){
  const a=list[i],b=list[j];if(!a.alive||!b.alive||Math.abs(a.y-b.y)>1.7)continue;
  const dx=a.x-b.x,dz=a.z-b.z,d=Math.hypot(dx,dz),r=a.radius+b.radius;if(d>=r)continue;
  const nx=d>1e-5?dx/d:1,nz=d>1e-5?dz/d:0,push=(r-d)*.51;
  for(const [v,s]of[[a,1],[b,-1]]){const x=v.x+nx*push*s,z=v.z+nz*push*s;if(!world.blocked(x,v.y,z,v.radius,v.height)&&world.height(x,z)<v.y+.5){v.x=x;v.z=z;}}
 }
}
export function raySphere(o,d,c,r,max){
 const x=o.x-c.x,y=o.y-c.y,z=o.z-c.z,b=x*d.x+y*d.y+z*d.z,q=b*b-(x*x+y*y+z*z-r*r);if(q<0)return null;let t=-b-Math.sqrt(q);if(t<0)t=-b+Math.sqrt(q);return t>=0&&t<=max?t:null;
}
export function rayBox(o,d,b,max){let lo=0,hi=max;for(const k of['x','y','z']){if(Math.abs(d[k])<1e-8){if(o[k]<b.min[k]||o[k]>b.max[k])return null;continue;}let a=(b.min[k]-o[k])/d[k],c=(b.max[k]-o[k])/d[k];if(a>c)[a,c]=[c,a];lo=Math.max(lo,a);hi=Math.min(hi,c);if(lo>hi)return null;}return lo<=max?lo:null;}
