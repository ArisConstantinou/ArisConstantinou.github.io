/* 0.4.3: firing intent comes from radius, never from aiming or movement.
 * Ratio is distance from the joystick centre / outer visible radius.
 * The 4% hysteresis band is within the visible ring and filters thumb tremor. */
export const RING_ENTER = .76;
export const RING_EXIT = .72;
export const AIM_FULL = .60;
export class FireRing {
 constructor(){this.reset();}
 reset(){this.active=false;this.mustReturn=false;}
 disarm(){this.active=false;this.mustReturn=true;}
 sample(radius){
  if(!Number.isFinite(radius)||radius<0){this.disarm();return false;}
  if(this.mustReturn){if(radius<=RING_EXIT)this.mustReturn=false;return this.active=false;}
  this.active=this.active?radius>RING_EXIT:radius>=RING_ENTER;
  return this.active;
 }
}
