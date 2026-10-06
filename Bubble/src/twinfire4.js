/* Normal combat uses the aim thumb; a separate FIRE hold exclusively owns
 * charged shots. Simulation-clock cadence, no timers or release-time shots. */
export const SPLAT_INTERVAL=.16;
export class TwinStickFire {
 constructor(){this.reset();}
 reset(){this.cooldown=0;this.engaged=false;this.firing=false;}
 manualShot(){this.cooldown=SPLAT_INTERVAL;}
 step(game,dt){
  this.cooldown=Math.max(0,this.cooldown-Math.max(0,dt));
  const input=game.input,magnitude=Math.hypot(...(input?.aim||[0,0]));
  if(!game.playing()||!game.touch||game.tool!=='splat'||!input?.aimActive)this.engaged=false;
  else this.engaged=magnitude>(this.engaged?.10:.20);
  this.firing=false;
  // Do not drain the tank while the other finger deliberately charges a shot.
  if(!this.engaged||game.fireDown||input?.firePointer!==null||game.reloadTime>0)return;
  if(game.ammo<=0){game.reload();return;}
  this.firing=true;
  if(this.cooldown<=1e-8){game.shoot(1,false);this.cooldown=SPLAT_INTERVAL;}
 }
}
