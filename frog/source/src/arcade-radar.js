import {RULES,OBSTACLES,SWARMS} from './arcade-model.js';
import {BASES,WALLS,TREES,CATAPULT_SITES,coverAt,hasWallSight} from './arcade-bases.js';
import {BATTLEGROUND_AREAS,BATTLEGROUND_ROUTES,battlegroundAreaAt} from './arcade-battleground.js';
const COLORS=['#d2ff70','#ff765d','#d7a0ff'];
const SWARM_INDEX=new Map(SWARMS.map((swarm,i)=>[swarm.id,i]));
const summaries=new WeakMap();

// Reuse one small record per patch. Both views inspect the same flies without sorting
// or allocating a per-fly screen label on every frame.
function swarmStatus(state){
 let rows=summaries.get(state);
 if(!rows){rows=SWARMS.map(swarm=>({swarm,available:0,next:Infinity}));summaries.set(state,rows);}
 for(const row of rows){row.available=0;row.next=Infinity;}
 for(const fly of state.flies){
  const row=rows[SWARM_INDEX.get(fly.swarmId)];if(!row)continue;
  if(fly.wait<=0)row.available++;else row.next=Math.min(row.next,fly.wait);
 }
 return rows;
}

function flyGlyph(c,x,y,size,available){
 c.fillStyle=available?'#dceee6':'#718781';
 c.beginPath();c.ellipse(x-size*.5,y-size*.28,size*.6,size*.32,-.5,0,Math.PI*2);c.ellipse(x+size*.5,y-size*.28,size*.6,size*.32,.5,0,Math.PI*2);c.fill();
 c.fillStyle=available?'#384c4c':'#536763';c.strokeStyle=available?'#b6d1c3':'#8ca09a';c.lineWidth=1.4;
 c.beginPath();c.ellipse(x,y+size*.12,size*.34,size*.56,0,0,Math.PI*2);c.fill();c.stroke();
}

export function drawRadar(game,canvas){
 if(!canvas)return;
 const c=canvas.getContext('2d');if(!c)return;
 const size=canvas.width,center=size/2,r=size*.43,k=r/RULES.radius;
 c.clearRect(0,0,size,size);c.save();c.translate(center,center);
 c.fillStyle='#153e3af2';c.strokeStyle='#9bd1be';c.lineWidth=4;c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.fill();c.stroke();c.clip();
 const dx=game.focus.x-game.camera.position.x,dz=game.focus.z-game.camera.position.z,d=Math.hypot(dx,dz),fx=d>1e-6?dx/d:0,fz=d>1e-6?dz/d:-1;
 const point=(x,z)=>({x:(-fz*x+fx*z)*k,y:-(fx*x+fz*z)*k});
 // Authored districts and routes sit under the functional markers, sharing
 // the terrain's world coordinates and rotating with the same camera basis.
 for(const area of BATTLEGROUND_AREAS){
  c.fillStyle=area.tint;c.globalAlpha=.25;c.beginPath();
  for(let i=0;i<=32;i++){const angle=i*Math.PI/16,q=point(area.x+Math.cos(angle)*area.rx,area.z+Math.sin(angle)*area.rz);if(i)c.lineTo(q.x,q.y);else c.moveTo(q.x,q.y);}
  c.closePath();c.fill();
 }
 c.globalAlpha=1;c.strokeStyle='#cbbd8c99';c.lineCap='round';c.lineJoin='round';
 for(const route of BATTLEGROUND_ROUTES){
  c.lineWidth=Math.max(2,route.width*k);c.beginPath();
  for(const [i,p] of route.points.entries()){const q=point(p[0],p[1]);if(i)c.lineTo(q.x,q.y);else c.moveTo(q.x,q.y);}
  c.stroke();
 }
 c.strokeStyle='#ffffff17';c.lineWidth=1;
 const gridExtent=Math.floor(RULES.radius/10)*10;
 for(let a=-gridExtent;a<=gridExtent;a+=10){const u=point(a,-RULES.radius),v=point(a,RULES.radius),w=point(-RULES.radius,a),t=point(RULES.radius,a);c.beginPath();c.moveTo(u.x,u.y);c.lineTo(v.x,v.y);c.moveTo(w.x,w.y);c.lineTo(t.x,t.y);c.stroke();}
 for(const o of OBSTACLES){const q=point(o.x,o.z);c.fillStyle='#769084';c.beginPath();c.arc(q.x,q.y,o.r*k,0,Math.PI*2);c.fill();}
 for(const tree of TREES){const q=point(tree.x,tree.z);c.fillStyle='#517d4788';c.beginPath();c.arc(q.x,q.y,tree.radius*k,0,Math.PI*2);c.fill();}
 for(const wall of WALLS){const corners=[point(wall.x-wall.hw,wall.z-wall.hd),point(wall.x+wall.hw,wall.z-wall.hd),point(wall.x+wall.hw,wall.z+wall.hd),point(wall.x-wall.hw,wall.z+wall.hd)];c.fillStyle='#c4b492';c.beginPath();c.moveTo(corners[0].x,corners[0].y);for(const q of corners.slice(1))c.lineTo(q.x,q.y);c.closePath();c.fill();}
 for(const machine of CATAPULT_SITES){const q=point(machine.x,machine.z);c.strokeStyle='#bfd6d0';c.lineWidth=2;c.beginPath();c.moveTo(q.x-3,q.y+3);c.lineTo(q.x,q.y-4);c.lineTo(q.x+4,q.y+3);c.moveTo(q.x,q.y-1);c.lineTo(q.x+4,q.y-6);c.stroke();}
 for(const [i,base] of BASES.entries()){const status=game.state.bases?.find(b=>b.id===base.id),q=point(base.stock.x,base.stock.z);if(base.owner==='player'&&status?.attackerId&&!status.destroyed){const pulse=.5+.5*Math.sin((game.elapsed||0)*4);c.strokeStyle='#ff9a6a';c.lineWidth=3+pulse;c.beginPath();c.arc(q.x,q.y,13+pulse*3,0,Math.PI*2);c.stroke();}c.fillStyle=status?.destroyed?'#4f6258':status?.attackerId?'#ffce77':COLORS[i];c.strokeStyle='#092b22';c.lineWidth=2;c.beginPath();c.moveTo(q.x-7,q.y-2);c.lineTo(q.x,q.y-8);c.lineTo(q.x+7,q.y-2);c.lineTo(q.x+7,q.y+7);c.lineTo(q.x-7,q.y+7);c.closePath();c.fill();c.stroke();if(status?.destroyed){c.strokeStyle='#b7c7ba';c.beginPath();c.moveTo(q.x-5,q.y-5);c.lineTo(q.x+5,q.y+5);c.moveTo(q.x+5,q.y-5);c.lineTo(q.x-5,q.y+5);c.stroke();}}
 for(const row of swarmStatus(game.state)){
  const q=point(row.swarm.x,row.swarm.z),available=row.available>0;
  c.strokeStyle=available?'#b8daa7':'#6a827b';c.lineWidth=available?1.8:1.2;
  c.beginPath();c.arc(q.x,q.y,9,0,Math.PI*2);c.stroke();
  flyGlyph(c,q.x,q.y,6,available);
 }
 game.state.actors.forEach((a,i)=>{if(a.ko||a.eliminated)return;const player=game.state.actors[0];if(i>0&&coverAt(a)&&a.revealedTime<=0&&Math.hypot(a.x-player.x,a.z-player.z)>2.2)return;const q=point(a.x,a.z);c.fillStyle=COLORS[i];c.strokeStyle='#102923';c.lineWidth=3;c.beginPath();c.arc(q.x,q.y,i===0?9:8,0,Math.PI*2);c.fill();c.stroke();if(i===0){const aim=point(a.aimX*2.7,a.aimZ*2.7);c.strokeStyle=COLORS[0];c.lineWidth=4;c.beginPath();c.moveTo(q.x,q.y);c.lineTo(q.x+aim.x,q.y+aim.y);c.stroke();}else{c.fillStyle='#102923';c.beginPath();c.arc(q.x-3,q.y-2,1.6,0,Math.PI*2);c.arc(q.x+3,q.y-2,1.6,0,Math.PI*2);c.fill();}});
 const player=game.state.actors[0],district=battlegroundAreaAt(player.x,player.z)?.name;
 c.restore();c.fillStyle='#f2ffe1';c.font='bold 18px sans-serif';c.textAlign='center';c.fillText(district||'ΒΑΣΕΙΣ • ΜΥΓΕΣ • ΚΑΛΥΨΗ',center,size-5);
}

// One restrained label on a nearby useful patch replaces per-fly screen
// overlays. Every other patch remains discoverable on the minimap.
export function drawFlyMarkers(game,c){
 const player=game.state.actors[0];
 if(player.ko||player.ammo>=RULES.capacity)return;
 const own=BASES.find(base=>base.owner===player.id),status=game.state.bases?.find(base=>base.owner===player.id);
 if(own&&status&&!status.destroyed&&Math.hypot(player.x-own.stock.x,player.z-own.stock.z)<=RULES.pickupRange&&hasWallSight(player,own.stock))return;
 let nearest=null,nearestLive=null,distance=Infinity,liveDistance=Infinity;
 for(const row of swarmStatus(game.state)){
  const d=Math.hypot(row.swarm.x-player.x,row.swarm.z-player.z);
  if(d<distance){nearest=row;distance=d;}
  if(row.available>0&&d<liveDistance){nearestLive=row;liveDistance=d;}
 }
 const closeEmpty=nearest&&nearest.available===0&&distance<=nearest.swarm.radius+RULES.pickupRange+.5;
 const selected=closeEmpty?nearest:nearestLive;if(!selected)return;
 const swarm=selected.swarm,p=game.project(swarm.x,game.ground(swarm.x,swarm.z)+.35,swarm.z);
 const top=game.touch&&game.h>game.w?240:110,bottom=game.touch?Math.min(165,game.h*.3):65;
 if(!p.visible||p.x<72||p.x>game.w-72||p.y<top||p.y>game.h-bottom)return;
 c.save();c.font='700 12px sans-serif';c.textAlign='left';c.lineJoin='round';
 const text=selected.available>0?`Μύγες · ${selected.available}`:`Ξανά σε ${Math.max(1,Math.ceil(selected.next))}″`;
 const width=c.measureText(text).width+22,x=p.x-width/2;
 flyGlyph(c,x+7,p.y+8,6,selected.available>0);
 c.strokeStyle='#18352de6';c.lineWidth=3;c.strokeText(text,x+20,p.y+12);c.fillStyle=selected.available>0?'#e8f4d5':'#c1d0c9';c.fillText(text,x+20,p.y+12);c.restore();
}
