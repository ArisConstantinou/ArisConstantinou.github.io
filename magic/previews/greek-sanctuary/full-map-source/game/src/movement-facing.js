// Build up travel only after the planted-foot turn; aligned speed is unchanged.
export function travelAlignment(yaw,moveX,moveZ){
 if(Math.hypot(moveX,moveZ)<=.1)return 1;
 const target=Math.atan2(moveX,moveZ),error=Math.abs(Math.atan2(Math.sin(target-yaw),Math.cos(target-yaw)));
 const blend=Math.max(0,1-error/(Math.PI/6));return blend*blend;
}
