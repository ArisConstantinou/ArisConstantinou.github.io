export class FrameRateMeter{
 constructor(){this.reset();}
 reset(){this.start=null;this.frames=0;this.value=null;}
 presented(now){
  if(!Number.isFinite(now))return this.value;
  if(this.start===null||now<this.start){this.start=now;this.frames=0;return this.value;}
  this.frames++;const elapsed=now-this.start;
  if(elapsed>=1000){this.value=Math.round(this.frames*1000/elapsed);this.start=now;this.frames=0;}
  return this.value;
 }
}
