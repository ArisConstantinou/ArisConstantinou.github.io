const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const delta=(from,to)=>Math.atan2(Math.sin(to-from),Math.cos(to-from));

/** Independent waist aiming, with a slower lower-body motor that steps into
 * sustained large twists. Small looks stay free; movement stays in world axes.
 * ContactGait supplies the actual alternating planted-foot turns.
 */
export function createHearthFacing(){
 const state={yaw:0,velocity:0,following:false,turning:false,moving:false};
 function reset(yaw=0){Object.assign(state,{yaw,velocity:0,following:false,turning:false,moving:false});}
 function update(dt,{yaw,aimYaw,moveX=0,moveZ=0,firing=false,enabled=true}){
  state.yaw=yaw;
  if(!enabled){reset(yaw);return state;}
  if(dt<=0)return state;
  state.moving=Math.hypot(moveX,moveZ)>.1;
  const twist=delta(yaw,aimYaw);
  if(state.moving)state.following=false;
  else if(Math.abs(twist)>Math.PI/4)state.following=true;
  if(state.following&&Math.abs(twist)<8*Math.PI/180&&Math.abs(state.velocity)<.12)state.following=false;
  // Travel owns the legs, including while firing. The waist keeps its aim.
  const target=state.moving?Math.atan2(moveX,moveZ):state.following?aimYaw:yaw;
  const error=delta(yaw,target),rate=state.moving?6:1.4,wanted=clamp(error*(state.moving?10:3),-rate,rate);
  const acceleration=state.moving?24:4;
  state.velocity+=clamp(wanted-state.velocity,-acceleration*dt,acceleration*dt);
  let step=state.velocity*dt;
  if(step*error>0&&Math.abs(step)>Math.abs(error)){step=error;state.velocity=0;}
  state.yaw+=step;state.turning=Math.abs(step)>1e-6;
  return state;
 }
 return {update,reset,snapshot:()=>({...state})};
}
