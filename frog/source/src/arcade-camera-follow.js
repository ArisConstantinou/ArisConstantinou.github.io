import {screenBasis,screenToWorld} from './arcade-view-math.js';

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const angle=value=>Math.atan2(Math.sin(value),Math.cos(value));

/** Follow travel without feeding the camera's own turn back into held movement. */
export class ArcadeCameraFollow {
 constructor(){this.reset();}
 reset(){this.releaseMovement();this.manualTime=0;}
 releaseMovement(){this.basis=null;this.heading=null;this.turnTime=0;}
 manual(){this.releaseMovement();this.manualTime=1.25;}
 movement(x,y,camera,focus,{enabled=true,dragging=false,continuous=false}={}){
  const length=Math.hypot(x,y);
  if(length<=.08){this.releaseMovement();return {x:0,z:0};}
  if(!enabled||dragging){this.releaseMovement();return screenToWorld(x,y,camera,focus);}
  const heading={x:x/length,y:y/length};
  // Hold the basis for a held direction, then use the current screen axes when
  // the player changes keys. A touch gesture keeps its axes until release so a
  // tiny thumb turn cannot suddenly rebase against a camera that has rotated.
  // Ignore strength jitter, which must never turn a held route into a spiral.
  if(!this.basis||!this.heading||!continuous&&heading.x*this.heading.x+heading.y*this.heading.y<Math.cos(.12)){
   this.basis=screenBasis(camera,focus);this.heading=heading;this.turnTime=0;
  }
  return screenToWorld(x,y,this.basis.camera,this.basis.focus);
 }
 update(yaw,{dt=0,enabled=true,mode='chase3d',moving={x:0,z:0},aiming=false,dragging=false,active=true}={}){
  dt=clamp(Number.isFinite(dt)?dt:0,0,.05);
  if(!active||dt===0)return yaw;
  if(dragging){this.manual();return yaw;}
  this.manualTime=Math.max(0,this.manualTime-dt);
  if(!enabled||mode!=='chase3d'||aiming||this.manualTime>0||Math.hypot(moving.x,moving.z)<=.08){this.turnTime=0;return yaw;}
  this.turnTime+=dt;
  if(this.turnTime<.22)return yaw;
  const difference=angle(Math.atan2(moving.x,moving.z)-yaw);
  if(Math.abs(difference)<.002)return angle(yaw+difference);
  // Ease into the turn and cap speed, including when reversing direction.
  const turn=clamp(difference*(1-Math.exp(-dt*3.2)),-1.8*dt,1.8*dt);
  return angle(yaw+turn);
 }
}
