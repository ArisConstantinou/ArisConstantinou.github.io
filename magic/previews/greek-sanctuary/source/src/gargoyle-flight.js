const smooth = (t,a,b) => {const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};

// Low flight inside the existing room/navigation envelope. Combat contact
// times remain unchanged; Dive touches down before its 1.65s impact.
export function gargoyleFlightHeight(clip,time=0){
 if(clip==='Claw')return 0;
 if(clip==='Dive')return 1.1+.9*smooth(time,0,.65)-2*smooth(time,.75,1.2)+1.1*smooth(time,1.95,2.8);
 return 1.1;
}

// Gravity-compensated, critically damped lift. A held, thrown, stunned or
// dead creature must retain real gravity and telekinetic ballistic motion.
export function gargoyleLiftAcceleration({height,velocity,target,gravity=-20,disabled=false}){
 if(disabled)return null;
 return -gravity+Math.max(-35,Math.min(35,(target-height)*100-velocity*20));
}
