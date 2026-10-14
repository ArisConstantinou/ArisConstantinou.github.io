import {BOSS_ROOMS} from './boss-rules.js';
import {STOMP} from './hearth-stomp.js';
export const HEARTH={endless:true,fuel:100,speed:3.0,radius:1.22,fireRate:12,idleRate:.2,moveRate:.55,throwCost:4,range:7,damageRate:22};
const durations={waking:2.1,boarding:2.4,exiting:2.4,depleting:2.1};
export const HEARTH_STOMP = Object.freeze({duration:STOMP.duration,hit:STOMP.impact,lift:.72});
export class HearthHeart {
 constructor({endless=HEARTH.endless}={}){this.endless=endless;this.reset();}
 reset(){this.state='sleep';this.fuel=0;this.time=0;this.firing=false;this.throwTime=0;this.emptyExit=false;this.stompTime=0;this.stompCooldown=0;this.stompHit=false;}
 charge(spell,now){
  if(!['sleep','ready'].includes(this.state)||!spell.charged||now<spell.readyAt||this.fuel>=HEARTH.fuel)return false;
  spell.charged=false;this.fuel=HEARTH.fuel;this.state=this.state==='sleep'?'waking':'ready';this.time=0;return true;
 }
 board(){if(this.state!=='ready'||this.fuel<=0)return false;this.state='boarding';this.time=0;return true;}
 exit(){if(this.state!=='piloted')return false;this.state='exiting';this.time=0;this.firing=false;this.stompTime=0;this.emptyExit=!this.endless&&this.fuel<=0;return true;}
 stomp(){if(this.state!=='piloted'||this.stompCooldown>0||this.throwTime>0)return false;this.stompTime=STOMP.duration;this.stompCooldown=STOMP.cooldown;this.stompHit=false;this.firing=false;return true;}
 throw(){if(this.state!=='piloted'||this.stompTime>0||this.fuel<HEARTH.throwCost)return false;if(!this.endless)this.fuel-=HEARTH.throwCost;this.throwTime=.85;return true;}
 update(dt,{moving=false,fire=false}={}){
  this.time+=dt;this.throwTime=Math.max(0,this.throwTime-dt);this.stompCooldown=Math.max(0,this.stompCooldown-dt);
  let stompImpact=false;
  if(this.stompTime>0){this.stompTime=Math.max(0,this.stompTime-dt);if(STOMP.duration-this.stompTime>=STOMP.impact&&!this.stompHit){this.stompHit=true;stompImpact=true;}}
  this.firing=this.state==='piloted'&&fire&&this.fuel>0&&this.throwTime===0&&this.stompTime===0;
  if(this.state==='piloted'&&!this.endless){
   this.fuel=Math.max(0,this.fuel-dt*(HEARTH.idleRate+(moving?HEARTH.moveRate:0)+(this.firing?HEARTH.fireRate:0)));
   if(this.fuel===0){this.stompTime=0;this.exit();this.emptyExit=true;return 'empty';}
  }
  if(durations[this.state]&&this.time>=durations[this.state]){
   const previous=this.state;
   this.state={waking:'ready',boarding:'piloted',exiting:this.emptyExit?'depleting':'ready',depleting:'sleep'}[previous];
   this.time=0;return previous==='exiting'?'exitComplete':previous==='boarding'?'boardComplete':previous+'Complete';
  }
  return stompImpact?'stompImpact':null;
 }
 get occupied(){return ['boarding','piloted','exiting'].includes(this.state);}
 get clip(){return {sleep:'Sleep',waking:'Wake',ready:'Idle',boarding:'Board',exiting:'Exit',depleting:'Deplete'}[this.state]||(this.stompTime>0?'Stomp':this.throwTime>0?'Throw':this.firing?'Fire':'Idle');}
}
export function placeHearth(random,isClear,previousRoom,availableRooms=BOSS_ROOMS){
 // Crypt floor extends south of the boss's combat leash, leaving a usable alcove.
 const rooms=availableRooms.map(r=>availableRooms===BOSS_ROOMS&&r.name==='crypt'?{...r,zMin:-23,zMax:-10}:r);
 const first=Math.min(rooms.length-1,Math.floor(random()*rooms.length));
 rooms.push(...rooms.splice(0,first));
 if(rooms[0].name===previousRoom)rooms.push(rooms.shift());
 for(const room of rooms){
  // Search clear off-centre pockets; preserve the central route and room thresholds.
  const candidates=[];
  const side=random()<.5?-1:1,center=(room.xMin+room.xMax)/2;
  for(const sign of [side,-side])
   for(let z=room.zMin+2.4;z<room.zMax-2.4;z+=.65)
    for(let x=2.2;x<Math.min((room.xMax-room.xMin)/2-1.7,6.3);x+=.6)candidates.push({x:center+x*sign,z,room});
  for(let i=candidates.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[candidates[i],candidates[j]]=[candidates[j],candidates[i]];}
  const p=candidates.find(p=>isClear(p,1.8));if(p)return p;
 }
 throw new Error('No accessible room pocket for HEARTH BULWARK');
}
export function flameHits(origin,direction,point,range,clear){
 const dx=point.x-origin.x,dz=point.z-origin.z,along=dx*direction.x+dz*direction.z;
 const across=Math.abs(dx*direction.z-dz*direction.x);
 const vertical=Number.isFinite(point.y)&&Number.isFinite(origin.y)?Math.abs(point.y-origin.y-(direction.y||0)*along):0;
 return along>=0&&along<=range&&across<.55+along*.19&&vertical<.8+along*.2&&clear(origin,point);
}
