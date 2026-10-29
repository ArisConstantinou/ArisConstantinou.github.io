// A tap is classified on release, never on press or after a drag returns home.
export function beginTap(event){return {id:event.pointerId,type:event.pointerType,x:event.clientX,y:event.clientY,at:event.timeStamp,travel:0};}
export function moveTap(tap,event){if(tap&&tap.id===event.pointerId)tap.travel=Math.max(tap.travel,Math.hypot(event.clientX-tap.x,event.clientY-tap.y));}
export function isTap(tap,event){
 if(!tap||tap.id!==event.pointerId||!['touch','pen'].includes(tap.type))return false;
 moveTap(tap,event);const duration=event.timeStamp-tap.at;
 return Number.isFinite(duration)&&duration>=0&&duration<=240&&tap.travel<=6;
}
// Keep a deliberate press through the next fixed tick or a short shot cooldown.
// Only an accepted player shot consumes it. Other actions cancel stale intent.
export class TapShotBuffer{
 constructor(){this.clear();}
 request(now){this.expires=now+.22;}
 read(now,actor,blocked=false){
  if(this.expires===null)return false;
  if(now>this.expires||blocked||actor.ko||actor.eliminated||actor.dizzyTime>0||actor.knockUp>0||actor.kick>0||actor.catapultId||actor.sabotageId){this.clear();return false;}
  return true;
 }
 clear(){this.expires=null;}
}
