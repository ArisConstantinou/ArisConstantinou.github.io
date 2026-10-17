// Keep both the held surface and its aim marker outside the touch contact.
// Near the HUD, move sideways instead of hiding the marker behind the header.
export function mobileDragPointer(info,rect){
 if(info.pointerType!=='touch')return info;
 const left=rect.left+24,right=rect.left+rect.width-24,top=rect.top+88,bottom=rect.top+rect.height-24;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 let x=info.clientX,y=info.clientY-80;
 if(y<top){x+=info.clientX<rect.left+rect.width/2?80:-80;y=info.clientY;}
 return{...info,clientX:clamp(x,left,right),clientY:clamp(y,top,bottom)};
}
