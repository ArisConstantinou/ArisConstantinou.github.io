// Presentation of one simulation-authorized strike. The engine owns every
// release; this sampler never creates attacks or advances a shared clock.
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;

export function getHumanAttackPose(clip,cycle,variant=0){
 if(!clip||!Number.isFinite(clip.duration)||clip.duration<=0||!cycle||!['windup','release','recovery'].includes(cycle.phase))return null;
 const duration=clip.duration,impact=clamp(finite(clip.impact,duration*.4),0,duration),p=clamp(finite(cycle.phaseProgress));
 // Small, stable preparation/follow-through variation keeps a formation from
 // moving in lockstep. Every actor still reaches the authored contact frame
 // exactly at the same real release, and none starts a second visual strike.
 const variation=((Math.abs(Math.trunc(finite(variant)))%11)/10-.5)*.12;
 const varied=clamp(p+Math.sin(p*Math.PI)*variation);
 const followThrough=(duration-impact)*.24;
 let time;
 if(cycle.phase==='windup')time=impact*varied;
 else if(cycle.phase==='release')time=impact+followThrough*p;
 else time=impact+followThrough+(duration-impact-followThrough)*varied;
 return {id:cycle.id??null,phase:cycle.phase,phaseProgress:p,time:clamp(time,0,Math.max(0,duration-1e-7)),impact,duration,paused:!!cycle.paused};
}
