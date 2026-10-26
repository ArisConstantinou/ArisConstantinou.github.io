import {RULES,OBSTACLES} from './arcade-model.js';
const COLORS=['#d2ff70','#ff765d','#d7a0ff'];
export function drawRadar(game,canvas){
 if(!canvas)return;
 const c=canvas.getContext('2d'),size=canvas.width,center=size/2,r=size*.43,k=r/RULES.radius,p=game.state.actors[0];
 c.clearRect(0,0,size,size);c.save();c.translate(center,center);
 c.fillStyle='#153e3af2';c.strokeStyle='#9bd1be';c.lineWidth=4;c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.fill();c.stroke();c.clip();
 const dx=game.focus.x-game.camera.position.x,dz=game.focus.z-game.camera.position.z,d=Math.hypot(dx,dz)||1,fx=dx/d,fz=dz/d;
 const point=(x,z)=>({x:(-fz*x+fx*z)*k,y:-(fx*x+fz*z)*k});
 c.strokeStyle='#ffffff17';c.lineWidth=1;for(let a=-20;a<=20;a+=10){const u=point(a,-25),v=point(a,25),w=point(-25,a),t=point(25,a);c.beginPath();c.moveTo(u.x,u.y);c.lineTo(v.x,v.y);c.moveTo(w.x,w.y);c.lineTo(t.x,t.y);c.stroke();}
 for(const o of OBSTACLES){const q=point(o.x,o.z);c.fillStyle='#769084';c.beginPath();c.arc(q.x,q.y,o.r*k,0,Math.PI*2);c.fill();}
 for(const f of game.state.flies){if(f.wait>0)continue;const q=point(f.x,f.z);c.fillStyle='#ffe46c';c.beginPath();c.arc(q.x,q.y,2.7,0,Math.PI*2);c.fill();}
 game.state.actors.forEach((a,i)=>{if(a.ko)return;const q=point(a.x,a.z);c.fillStyle=COLORS[i];c.strokeStyle='#102923';c.lineWidth=3;c.beginPath();c.arc(q.x,q.y,i===0?9:8,0,Math.PI*2);c.fill();c.stroke();if(i===0){const aim=point(a.aimX*2.7,a.aimZ*2.7);c.strokeStyle=COLORS[0];c.lineWidth=4;c.beginPath();c.moveTo(q.x,q.y);c.lineTo(q.x+aim.x,q.y+aim.y);c.stroke();}else{c.fillStyle='#102923';c.beginPath();c.arc(q.x-3,q.y-2,1.6,0,Math.PI*2);c.arc(q.x+3,q.y-2,1.6,0,Math.PI*2);c.fill();}});
 c.restore();c.fillStyle='#f2ffe1';c.font='bold 18px sans-serif';c.textAlign='center';c.fillText('ΜΥΓΕΣ • ΑΝΤΙΠΑΛΟΙ',center,size-5);
}
export function drawFlyMarkers(game,c){
 c.save();c.strokeStyle='#30291c';c.lineWidth=4;c.fillStyle='#fff070';
 for(const f of game.state.flies){if(f.wait>0)continue;const p=game.project(f.x,game.ground(f.x,f.z)+1.8,f.z);if(!p.visible||p.x<12||p.x>game.w-12||p.y<100||p.y>game.h-(game.touch?205:70))continue;
 const d=Math.hypot(f.x-game.state.actors[0].x,f.z-game.state.actors[0].z);if(game.viewMode!=='overview'&&d>13)continue;
 c.beginPath();c.ellipse(p.x,p.y,3.8,5.3,0,0,Math.PI*2);c.stroke();c.fill();c.strokeStyle='#eaffff';c.lineWidth=2;c.beginPath();c.moveTo(p.x-3,p.y-3);c.lineTo(p.x-8,p.y-6);c.moveTo(p.x+3,p.y-3);c.lineTo(p.x+8,p.y-6);c.stroke();c.strokeStyle='#30291c';c.lineWidth=4;
 }c.restore();
}
