// Menu actors use one trajectory for position, velocity and facing. Coordinates
// are the same metres as the live game rig, below the screen-space presentation.
export function createMenuLeap({start,end,duration,preparation=.18,height,arrivalRise}){
 const rise=end[1]-start[1];
 const gravity=Number.isFinite(arrivalRise)?2*(rise/duration-arrivalRise)/duration:8*height/(duration*duration);
 const velocity=[(end[0]-start[0])/duration,rise/duration+gravity*duration/2,(end[2]-start[2])/duration];
 return {start,end,duration,preparation,gravity,velocity,heading:Math.atan2(velocity[0],velocity[2])};
}
export function sampleMenuLeap(plan,time){
 const airborne=time>=plan.preparation,t=Math.max(0,Math.min(plan.duration,time-plan.preparation)),p=t/plan.duration;
 return {phase:airborne?'flight':'preparation',progress:p,heading:plan.heading,
  position:plan.start.map((v,i)=>v+plan.velocity[i]*t-(i===1?plan.gravity*t*t/2:0)),
  velocity:airborne?[plan.velocity[0],plan.velocity[1]-plan.gravity*t,plan.velocity[2]]:[0,0,0],
  preparation:Math.max(0,Math.min(1,time/plan.preparation))};
}
