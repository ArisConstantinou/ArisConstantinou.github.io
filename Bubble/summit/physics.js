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
 const recipes={balanced:{lift:102,life:105,integrity:160},light:{lift:99,life:120,integrity:135},strong:{lift:118,life:95,integrity:210}};
 const p=recipes[recipe]||recipes.balanced;
 a.balloon={lift:p.lift,life:p.life*(.90+.10*clamp(quality,0,1)),maxLife:p.life,integrity:p.integrity,maxIntegrity:p.integrity,r:2.45,recipe};
 a.grounded=false;a.vy=3;a.groundTime=0;a.balloon.exhausted=0;a.lastBalloonEvent='';a.contactCooldown=0;a.controlUp=0;
}
export function gumHit(a,amount=2.5,balloonHit=false){
 if(!a.alive)return; a.gum=clamp(a.gum+amount,0,150);a.hp=Math.max(0,a.hp-(balloonHit?3:10));a.shotFlash=.25;
 if(a.balloon){a.vy=Math.max(-16,a.vy-(amount>3?2.8:.85));const damage=balloonHit?(amount>3?24:8):(amount>3?6:2);a.balloon.integrity=Math.max(0,a.balloon.integrity-damage);if(a.balloon.integrity<=0){a.balloon=null;a.lastBalloonEvent='ΖΗΜΙΑ ΜΕΜΒΡΑΝΗΣ';}}
 if(!a.balloon&&a.grounded)a.stun=Math.min(.45,a.stun+.12);
}
// Fictional flight controller. Intact reserves now absorb small loads/damage;
// visible additional gum still causes drift and overload causes sustained sinking.
export function flightState(a,control=0,windY=0){
 const b=a.balloon;if(!b)return{command:control,target:-38,reserve:0,sink:0,load:0};
 const integrity=clamp(b.integrity/b.maxIntegrity,0,1),fade=clamp((b.exhausted||0)/12,0,1);
 const lift=b.lift*(.88+.12*integrity),reserve=lift-a.mass-a.gum;
 const overload=Math.max(0,-reserve),sink=a.gum*.055+overload*.20+fade*6;
 const climb=6*clamp(1-a.gum/160,.45,1)*(1-fade*.85);
 let target=(control>=0?control*climb:control*4.5)-sink+windY*.12;
 // Only commanded, controlled descents slow near the floor. Heavy overload
// and a failed envelope are not given a hidden parachute.
 if(control<0&&a.clearance<9&&overload<3&&fade===0)target=Math.max(target,-2.2-sink);
 return {command:control,target:clamp(target,-16,7),reserve,sink,load:overload};
}
export function verticalAcceleration(a,control=0,windY=0){
 if(!a.balloon)return -18;
 return clamp((flightState(a,control,windY).target-a.vy)*3,-12,12);
}
export function envelopeBlocked(a,x,y,z,world){
 if(!a.balloon)return false;const r=a.balloon.r,cx=x+Math.sin(a.yaw)*.45,cz=z+Math.cos(a.yaw)*.45,cy=y+1.95+r;
 if(world.blocked(cx,cy-r,cz,r*.85,r*2))return true;
 for(const [dx,dz] of [[0,0],[r*.8,0],[-r*.8,0],[0,r*.8],[0,-r*.8]]){
  const bottom=cy-Math.sqrt(Math.max(0,r*r-dx*dx-dz*dz));
  if(world.height(cx+dx,cz+dz)>bottom+.02)return true;
 }return false;
}
function contactDamage(a,speed){
 // One velocity-dependent impact, not three stacking damage sources each frame.
 if(!a.balloon||speed<3||a.contactCooldown>0)return;
 a.balloon.integrity=Math.max(0,a.balloon.integrity-Math.min(18,(speed-3)*1.2));
 a.contactCooldown=.9;a.lastBalloonEvent='ΠΡΟΣΚΡΟΥΣΗ';
}
export function advanceBody(a,desired,world,dt,time){
 if(!a.alive||!Number.isFinite(dt)||dt<=0)return;
 dt=Math.min(dt,.05);a.contactCooldown=Math.max(0,(a.contactCooldown||0)-dt);a.envelopeContact=false;
 a.clearance=Math.max(0,a.y-world.support(a.x,a.y,a.z));
 const before={x:a.x,y:a.y,z:a.z},flight=!!a.balloon&&!a.grounded;
 let vertical=clamp(desired.up||0,-1,1);a.controlUp=vertical;
 if(a.balloon){const b=a.balloon;b.life=Math.max(0,b.life-dt*(1+Math.max(0,vertical)*.05));if(b.life===0)b.exhausted=(b.exhausted||0)+dt;if(b.integrity<=0||(b.exhausted||0)>=12){a.lastBalloonEvent=b.integrity<=0?'ΖΗΜΙΑ ΜΕΜΒΡΑΝΗΣ':'ΕΞΑΝΤΛΗΣΗ';a.balloon=null;vertical=0;}}
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
   if(a.balloon&&envelopeBlocked(a,nx,a.y,nz,world)){a.envelopeContact=true;contactDamage(a,Math.abs(a[v]));a[v]=0;continue;}
   a[axis]=axis==='x'?nx:nz;if(a.grounded&&ground>a.y)a.y=ground+.015;
  }
  const floor=world.support(a.x,a.y,a.z),newY=a.y+a.vy*step;
  if(newY<=floor+.015&&a.vy<=0){
   if(!a.grounded){const impact=-a.vy;if(impact>9)a.hp=Math.max(0,a.hp-(impact-9)*5.5);a.landed=true;}
   a.y=floor+.015;a.vy=0;a.grounded=true;
  }else if(a.vy>0){
   if(world.blocked(a.x,newY,a.z,a.radius,a.height)||envelopeBlocked(a,a.x,newY,a.z,world)){a.envelopeContact=!!a.balloon;contactDamage(a,Math.abs(a.vy));a.vy=0;}else{a.y=newY;a.grounded=false;}
  }else{a.y=newY;if(a.y-floor>.06)a.grounded=false;}
 }
 a.groundTime=a.grounded?a.groundTime+dt:0;
 if(a.grounded&&a.balloon&&a.groundTime>.8){a.balloon=null;a.lastBalloonEvent='ΠΡΟΣΓΕΙΩΣΗ';}
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
 const x=o.x-c.x,y=o.y-c.y,z=o.z-c.z,b=x*d.x+y*d.y+z*d.z,inside=x*x+y*y+z*z-r*r;if(inside<=0)return 0;const q=b*b-inside;if(q<0)return null;let t=-b-Math.sqrt(q);if(t<0)t=-b+Math.sqrt(q);return t>=0&&t<=max?t:null;
}
export function rayBox(o,d,b,max){let lo=0,hi=max;for(const k of['x','y','z']){if(Math.abs(d[k])<1e-8){if(o[k]<b.min[k]||o[k]>b.max[k])return null;continue;}let a=(b.min[k]-o[k])/d[k],c=(b.max[k]-o[k])/d[k];if(a>c)[a,c]=[c,a];lo=Math.max(lo,a);hi=Math.min(hi,c);if(lo>hi)return null;}return lo<=max?lo:null;}

// Matches the parent Euler(0,yaw,bank) and the rendered envelope's local offset.
export function balloonCenter(a){const h=(a.balloon?.r||2.45)+2,bank=a.balloon?(a.bank||0):0,lx=-Math.sin(bank)*h;return{x:a.x+Math.cos(a.yaw)*lx+Math.sin(a.yaw)*.45,y:a.y+Math.cos(bank)*h,z:a.z-Math.sin(a.yaw)*lx+Math.cos(a.yaw)*.45};}
