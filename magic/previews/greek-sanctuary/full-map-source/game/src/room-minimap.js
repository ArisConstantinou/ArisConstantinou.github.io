import './room-minimap.css';
import {hearthMapTarget} from './hearth-map-target.js';
export function createRoomMinimap(policy){
 const host=document.createElement('aside');host.id='room-minimap';host.setAttribute('aria-label','Χάρτης εξερευνημένων δωματίων');
 host.innerHTML='<div class="minimap-heading"><span>ΧΑΡΤΗΣ</span><span>Β ↑</span></div><canvas width="360" height="240" role="img" aria-label="Η θέση σου στο κάστρο"></canvas><span class="minimap-room"></span><span class="minimap-hearth" hidden></span>';
 document.getElementById('game-hud').append(host);
 const canvas=host.querySelector('canvas'),ctx=canvas.getContext('2d'),label=host.querySelector('.minimap-room'),hearthLabel=host.querySelector('.minimap-hearth');
 const all=[...policy.rooms,...policy.passages,...policy.secrets],scale=360/108,ox=0,oz=0,visited=new Set();let last='',draws=0;
 function update(p,yaw,zone,engine=null){
  const target=hearthMapTarget(p,engine,p.x-54,p.z-36,scale);
  visited.add(zone.id);const key=[zone.id,visited.size,Math.round(p.x*5),Math.round(p.z*5),Math.round(yaw*12),target?.key].join(':');if(key===last)return;last=key;
  const minX=p.x-54,minZ=p.z-36;
  ctx.clearRect(0,0,360,240);ctx.fillStyle='#05090a';ctx.fillRect(0,0,360,240);
  for(const r of all){if(r.secret&&!visited.has(r.id))continue;const known=r.passage?visited.has(r.from)||visited.has(r.to):visited.has(r.id);
   ctx.fillStyle=r.id===zone.id?'#285147':known?r.passage?'#25302d':'#1c2926':'#0a1211';ctx.strokeStyle=r.id===zone.id?'#cfbd85':known?'#60756a':'#33453e';ctx.lineWidth=r.id===zone.id?1.8:1;
   const x=ox+(r.x-minX)*scale,y=oz+(r.z-minZ)*scale;ctx.fillRect(x,y,r.w*scale,r.d*scale);if(!r.passage)ctx.strokeRect(x,y,r.w*scale,r.d*scale);
  }
  hearthLabel.hidden=!target;
  if(target){
   ctx.save();ctx.translate(target.x,target.y);ctx.fillStyle='#e6b969';ctx.strokeStyle='#07100f';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(13,0);ctx.lineTo(0,14);ctx.lineTo(-13,0);ctx.closePath();ctx.stroke();ctx.fill();ctx.fillStyle='#16251f';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('H',0,1);ctx.restore();
   const hint=`HEARTH · ${target.room} · ${target.distance} μ.`;if(hearthLabel.textContent!==hint)hearthLabel.textContent=hint;
  }
  ctx.save();ctx.translate(ox+(p.x-minX)*scale,oz+(p.z-minZ)*scale);ctx.rotate(-yaw);ctx.fillStyle='#e1fff2';ctx.shadowColor='#8ce3c6';ctx.shadowBlur=7;ctx.beginPath();ctx.moveTo(0,6);ctx.lineTo(-4,-4);ctx.lineTo(0,-2);ctx.lineTo(4,-4);ctx.closePath();ctx.fill();ctx.restore();
  const text=zone.label||(zone.passage?'Διάδρομος':zone.id);if(label.textContent!==text)label.textContent=text;draws++;
 }
 return {update,reset(){visited.clear();last='';},snapshot:()=>({visited:[...visited],draws}),dispose(){host.remove();}};
}
