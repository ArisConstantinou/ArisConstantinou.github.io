/* 0.4.3 — explicit outer-ring trigger, separate from full-range aiming.
 * Inner aiming and left movement never shoot. No shot is queued on release. */
export const SPLAT_INTERVAL=.16;
export class TwinStickFire {
 constructor(){this.reset();}
 reset(){this.cooldown=0;this.engaged=false;this.firing=false;this.toolActive=false;this.lastTool=null;this.lastCamera=null;}
 manualShot(){this.cooldown=SPLAT_INTERVAL;}
 step(game,dt){
  this.cooldown=Math.max(0,this.cooldown-Math.max(0,dt));
  const input=game.input;
  input?.syncViewport?.(); // Guard before firing even if the resize event is queued.
  // Changing a tool/camera while holding the ring cannot start a new action.
  if((this.lastTool!==null&&this.lastTool!==game.tool)||(this.lastCamera!==null&&this.lastCamera!==game.cameraMode))input?.disarmRing?.();
  this.lastTool=game.tool;this.lastCamera=game.cameraMode;
  this.engaged=!!(game.playing()&&game.touch&&input?.aimActive&&input.ringRequested);
  this.firing=false;this.toolActive=false;
  // A separate manual charge/trigger always owns ammunition exclusively.
  if(!this.engaged||game.fireDown||input?.firePointer!=null)return;
  if(game.tool==='flow'||game.tool==='erase'){
   this.toolActive=true;this.firing=true;return;
  }
  // STRAND is an intentional, one-shot connection using E / its own button.
  if(game.tool!=='splat'||game.reloadTime>0)return;
  if(game.ammo<=0){game.reload();return;}
  this.firing=true;
  if(this.cooldown<=1e-8){game.shoot(1,false);this.cooldown=SPLAT_INTERVAL;}
 }
}
