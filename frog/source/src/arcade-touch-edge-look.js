const finite=Number.isFinite;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

// World swipes remain direct look. Only a deliberate outward touch/pen swipe
// can add a held horizontal turn at the screen edge; a tap or vertical gesture
// near an edge does not start the camera moving on its own.
export function createTouchEdgeLook(){
 let gesture=null;
 return {
  begin(event){
   gesture=null;
   if(!['touch','pen'].includes(event?.pointerType)||!finite(event?.pointerId)||!finite(event?.clientX)||!finite(event?.clientY))return;
   gesture={id:event.pointerId,x:event.clientX,y:event.clientY,anchorX:event.clientX,anchorY:event.clientY,extreme:event.clientX,direction:0};
  },
  move(event){
   if(!gesture||event?.pointerId!==gesture.id||!finite(event?.clientX)||!finite(event?.clientY))return;
   const g=gesture;g.x=event.clientX;g.y=event.clientY;
   if(!g.direction){
    const dx=g.x-g.anchorX,dy=g.y-g.anchorY;
    if(Math.abs(dx)>=8&&Math.abs(dx)>=Math.abs(dy)*1.25){g.direction=Math.sign(dx);g.extreme=g.x;}
    // A mostly vertical look gesture must not arm yaw from lateral finger
    // drift. Rebase after that motion so a later deliberate sideways turn in
    // the same contact can still engage without lifting the thumb.
    else if(Math.abs(dy)>=8&&Math.abs(dy)>Math.abs(dx)*1.25){g.anchorX=g.x;g.anchorY=g.y;}
    return;
   }
   if((g.x-g.extreme)*g.direction>0)g.extreme=g.x;
   // Ignore tiny stationary-finger noise. An intentional inward move cancels
   // edge continuation even before the finger has left the edge strip.
   else if((g.extreme-g.x)*g.direction>=6){g.direction*=-1;g.extreme=g.x;}
  },
  sample({left=0,width}={}){
   if(!gesture?.direction||!finite(left)||!finite(width)||width<=0)return 0;
   const margin=Math.min(width/3,clamp(width*.12,40,72));
   const penetration=gesture.direction>0?
    (gesture.x-(left+width-margin))/margin:
    (left+margin-gesture.x)/margin;
   const amount=clamp(penetration,0,1);
   // Smooth acceleration through the strip avoids a speed jump on entry.
   return gesture.direction*amount*amount*(3-2*amount);
  },
  clear(){gesture=null;},
 };
}
