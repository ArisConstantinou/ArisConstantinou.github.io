import './room-minimap.css';
export function createRoomMinimap(policy){
 const host=document.createElement('aside');host.id='room-minimap';host.setAttribute('aria-label','Χάρτης εξερευνημένων δωματίων');
 host.innerHTML='<div class="minimap-heading"><span>ΧΑΡΤΗΣ</span><span>Β ↑</span></div><canvas width="360" height="240" role="img" aria-label="Η θέση σου στο κάστρο"></canvas><span class="minimap-room"></span>';
 document.getElementById('game-hud').append(host);
 const canvas=host.querySelector('canvas'),ctx=canvas.getContext('2d'),label=host.querySelector('.minimap-room');
 const all=[...policy.rooms,...policy.passages,...policy.secrets],scale=360/108,ox=0,oz=0,visited=new Set();let last='',draws=0;
 function update(p,yaw,zone){
  visited.add(zone.id);const key=[zone.id,visited.size,Math.round(p.x*5),Math.round(p.z*5),Math.round(yaw*12)].join(':');if(key===last)return;last=key;
  const minX=p.x-54,minZ=p.z-36;
  ctx.clearRect(0,0,360,240);ctx.fillStyle='#05090a';ctx.fillRect(0,0,360,240);
  for(const r of all){if(r.secret&&!visited.has(r.id))continue;const known=r.passage?visited.has(r.from)||visited.has(r.to):visited.has(r.id);
   ctx.fillStyle=r.id===zone.id?'#285147':known?r.passage?'#25302d':'#1c2926':'#0a1211';ctx.strokeStyle=r.id===zone.id?'#cfbd85':known?'#60756a':'#33453e';ctx.lineWidth=r.id===zone.id?1.8:1;
   const x=ox+(r.x-minX)*scale,y=oz+(r.z-minZ)*scale;ctx.fillRect(x,y,r.w*scale,r.d*scale);if(!r.passage)ctx.strokeRect(x,y,r.w*scale,r.d*scale);
  }
  ctx.save();ctx.translate(ox+(p.x-minX)*scale,oz+(p.z-minZ)*scale);ctx.rotate(-yaw);ctx.fillStyle='#e1fff2';ctx.shadowColor='#8ce3c6';ctx.shadowBlur=7;ctx.beginPath();ctx.moveTo(0,6);ctx.lineTo(-4,-4);ctx.lineTo(0,-2);ctx.lineTo(4,-4);ctx.closePath();ctx.fill();ctx.restore();
  const text=zone.label||(zone.passage?'Διάδρομος':zone.id);if(label.textContent!==text)label.textContent=text;draws++;
 }
 return {update,reset(){visited.clear();last='';},snapshot:()=>({visited:[...visited],draws}),dispose(){host.remove();}};
}
