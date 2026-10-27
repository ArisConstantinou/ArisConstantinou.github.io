const finite=Number.isFinite;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

// A mounted mouse chooses a landing point, even during the short interval
// before the browser finishes an intentional Pointer Lock release.
export function catapultPointerPoint(current,event,{width,height,locked=false}={}){
 if(event?.pointerType!=='mouse'||!finite(width)||!finite(height)||width<=0||height<=0)return null;
 const previous={x:finite(current?.x)?current.x:width/2,y:finite(current?.y)?current.y:height/2};
 const x=locked?previous.x+(finite(event.movementX)?event.movementX:0):event.clientX;
 const y=locked?previous.y+(finite(event.movementY)?event.movementY:0):event.clientY;
 if(!finite(x)||!finite(y))return null;
 return {x:clamp(x,0,width),y:clamp(y,0,height)};
}
