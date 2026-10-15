export const DOOR_STRIKES=Object.freeze({kick:{impact:.64,duration:1.3},punch:{impact:.46,duration:1.12}});
// Both randomly selected strikes must reach. The arm is the shorter limit;
// the engine's closed-door collision stops its centre about 1.37m away.
export const DOOR_STRIKE_REACH=1.45;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
export const angleDifference=(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a));
export function strikeEnvelope(kind,time){
 if(kind==='kick')return{lift:smooth(.04,.3,time)*(1-smooth(.78,1.28,time)),drive:smooth(.3,.58,time)*(1-smooth(.76,1.22,time)),wind:0};
 return{lift:0,wind:smooth(.02,.2,time)*(1-smooth(.2,.44,time)),drive:smooth(.2,.44,time)*(1-smooth(.58,1.1,time))};
}
export function selectStrikeDoor(gates,body){
 let best=null;
 for(const gate of gates){
  if(gate.unblocked||gate.phase==='open'||gate.phase==='opening'||Math.abs(body.y-1.22-(gate.floorY||0))>.65)continue;
  const r=gate.rotation||0,nx=Math.sin(r),nz=Math.cos(r),dx=body.x-gate.x,dz=body.z-gate.z,along=dx*nz-dz*nx,normal=dx*nx+dz*nz;
  if(Math.abs(normal)>DOOR_STRIKE_REACH+1e-6||Math.abs(along)>gate.width/2-.2)continue;
  const side=normal>=0?1:-1,yaw=Math.atan2(-nx*side,-nz*side),distance=Math.abs(normal);
  if(!best||distance<best.distance)best={gate,side,yaw,distance,normal:{x:nx,z:nz},point:{x:gate.x+nx*side*.18,y:(gate.floorY||0)+1.6,z:gate.z+nz*side*.18}};
 }
 return best;
}
export class DoorStrike {
 constructor(random=Math.random){this.random=random;this.serial=0;this.active=false;this.time=0;this.impacted=false;this.target=null;this.kind=null;}
 start(target){if(this.active||!target)return false;this.target=target;this.kind=this.random()<.5?'kick':'punch';this.time=0;this.impacted=false;this.active=true;this.serial++;return true;}
 update(dt,aligned=true){
  if(!this.active||!aligned||dt<=0)return null;
  const previous=this.time;this.time=Math.min(DOOR_STRIKES[this.kind].duration,this.time+Math.min(.1,dt));
  if(!this.impacted&&previous<DOOR_STRIKES[this.kind].impact&&this.time>=DOOR_STRIKES[this.kind].impact){this.impacted=true;return'impact';}
  if(this.time>=DOOR_STRIKES[this.kind].duration){this.active=false;return'complete';}return null;
 }
 snapshot(){return{active:this.active,kind:this.kind,time:this.time,impacted:this.impacted,serial:this.serial,gate:this.target?.gate.id};}
}
