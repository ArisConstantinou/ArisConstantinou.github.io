export function hearthMapTarget(player,engine,minX,minZ,scale,width=360,height=240){
 const p=engine?.body?.position;if(!p||engine.heart?.occupied||![p.x,p.z,player.x,player.z].every(Number.isFinite))return null;
 const x=(p.x-minX)*scale,y=(p.z-minZ)*scale,distance=Math.round(Math.hypot(p.x-player.x,p.z-player.z));
 return{x:Math.max(16,Math.min(width-16,x)),y:Math.max(16,Math.min(height-16,y)),distance,room:engine.location?.room?.label||engine.location?.room?.name||'',key:[Math.round(p.x*5),Math.round(p.z*5),distance,engine.heart?.state].join(':')};
}
