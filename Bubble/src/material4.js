/* Bubble 0.4 — shared, persistent gum volume. The same scalar field drives
 * rendering, projectile obstruction, footsteps and body collision.
 * Sparse marching tetrahedra, not stacked decorative spheres. */
import {add,sub,mul,dot,len,norm,dist,clamp,rayBox,node,segment,hex} from './engine.js';
export const GUM=0xb66aff, CELL=.4, ISO=.7;
const key=(x,y,z)=>x+','+y+','+z;
const CORNERS=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
const TETS=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
export class GumVolume {
 constructor(limit=22000){this.limit=limit;this.reset();}
 reset(){this.values=new Map;this.columns=new Map;this.dirty=new Set;this.chunks=new Set;this.revision=0;this.full=false;}
 get(x,y,z){return this.values.get(key(x,y,z))||0;}
 value(p){const f=p.map(v=>v/CELL),i=f.map(Math.floor),t=f.map((v,k)=>v-i[k]);let v=0;for(let a=0;a<2;a++)for(let b=0;b<2;b++)for(let c=0;c<2;c++)v+=this.get(i[0]+a,i[1]+b,i[2]+c)*(a?t[0]:1-t[0])*(b?t[1]:1-t[1])*(c?t[2]:1-t[2]);return v;}
 normal(p){const e=.08;return norm([this.value(add(p,[-e,0,0]))-this.value(add(p,[e,0,0])),this.value(add(p,[0,-e,0]))-this.value(add(p,[0,e,0])),this.value(add(p,[0,0,-e]))-this.value(add(p,[0,0,e]))]);}
 set(x,y,z,v){if(Math.abs(x*CELL)>45||Math.abs(z*CELL)>45||y*CELL< -8||y*CELL>30)return false;const k=key(x,y,z);v=Math.min(4,v);const old=this.values.get(k)||0;if(Math.abs(old-Math.max(0,v))<.0001)return false;if(v<=.035)this.values.delete(k);else{if(!this.values.has(k)&&this.values.size>=this.limit){this.full=true;return false;}this.values.set(k,Math.min(4,v));}
  const ck=x+','+z,c=this.columns.get(ck)||[y,y];c[0]=Math.min(c[0],y);c[1]=Math.max(c[1],y);this.columns.set(ck,c);
  for(let dx of[-1,0])for(let dy of[-1,0])for(let dz of[-1,0]){const ch=key(Math.floor((x+dx)/8),Math.floor((y+dy)/8),Math.floor((z+dz)/8));this.dirty.add(ch);this.chunks.add(ch);}return true;
 }
 stamp(p,r=[.7,.36,.7],amount=2.7,yaw=0){if(!p.every(Number.isFinite)||!r.every(v=>Number.isFinite(v)&&v>0))return 0;const body=amount>0?this.protectedBody?.():null;
  if(body&&p[1]>body.p[1]+.20&&p[1]<body.p[1]+(body.height||2.12)+.20&&
     Math.hypot(p[0]-body.p[0],p[2]-body.p[2])<(body.radius||.43)+.18)return 0;
  let changed=0;const extent=Math.max(r[0],r[2]),bounds=[extent,r[1],extent],lo=p.map((v,i)=>Math.floor((v-bounds[i])/CELL)),hi=p.map((v,i)=>Math.ceil((v+bounds[i])/CELL)),c=Math.cos(yaw),s=Math.sin(yaw);
  for(let x=lo[0];x<=hi[0];x++)for(let y=lo[1];y<=hi[1];y++)for(let z=lo[2];z<=hi[2];z++){const dx=x*CELL-p[0],dy=y*CELL-p[1],dz=z*CELL-p[2],q=((dx*c-dz*s)/r[0])**2+(dy/r[1])**2+((dx*s+dz*c)/r[2])**2;if(q>=1)continue;
   // Do not deposit new material through the shooter's occupied capsule.
   // Existing gum remains solid; this is placement clearance, not armor erasure.
   if(body&&y*CELL>body.p[1]+.20&&y*CELL<body.p[1]+(body.height||2.12)+.20&&
      Math.hypot(x*CELL-body.p[0],z*CELL-body.p[2])<(body.radius||.43)+.30)continue;
   if(this.set(x,y,z,this.get(x,y,z)+amount*(1-q)))changed++;}
  if(changed)this.revision++;if(this.values.size<this.limit*.96)this.full=false;return changed;
 }
 erase(p,r=1){return this.stamp(p,[r,r,r],-5);}
 ray(o,d,max=30){if(!this.values.size||max<=0)return null;const step=.16;let last=0;if(this.value(o)>=ISO)return{t:0,p:o.slice(),n:mul(norm(d),-1),gum:true};for(let t=step;t<=max+step;t+=step){const tt=Math.min(t,max),p=add(o,mul(d,tt));if(this.value(p)>=ISO){let lo=last,hi=tt;for(let j=0;j<7;j++){let m=(lo+hi)/2;if(this.value(add(o,mul(d,m)))>=ISO)hi=m;else lo=m;}const at=add(o,mul(d,hi));let n=this.normal(at);if(len(n)<.1)n=mul(d,-1);return{t:hi,p:at,n,gum:true};}last=tt;if(tt===max)break;}return null;}
 support(x,z,y,rise=.5){const ix=Math.floor(x/CELL),iz=Math.floor(z/CELL);let low=Infinity,high=-Infinity;for(let a=0;a<2;a++)for(let b=0;b<2;b++){const col=this.columns.get((ix+a)+','+(iz+b));if(col){low=Math.min(low,col[0]-1);high=Math.max(high,col[1]+1);}}
  if(!Number.isFinite(low))return null;let top=Math.min(y+rise,(high+1)*CELL),previous=top;if(this.value([x,top,z])>=ISO)return null;
  for(let yy=top-.15;yy>=low*CELL-.15;yy-=.15){if(this.value([x,yy,z])>=ISO){let lo=yy,hi=previous;for(let j=0;j<7;j++){let m=(lo+hi)/2;if(this.value([x,m,z])>=ISO)lo=m;else hi=m;}return{h:hi,s:{name:'Τσίχλα · αντικολλητικές σόλες',gum:true}};}previous=yy;}return null;
 }
 blocked(x,z,y,r=.42,h=1.85){const offsets=[[0,0],[r,0],[-r,0],[0,r],[0,-r],[r*.7,r*.7],[-r*.7,-r*.7],[r*.7,-r*.7],[-r*.7,r*.7]];for(let yy=.46;yy<h;yy+=.28)for(const [dx,dz] of offsets)if(this.value([x+dx,y+yy,z+dz])>=ISO)return{gum:true};return null;}
 // A continuous overlap cost lets an already intersecting body move OUT.
 // A Boolean collision check alone rejects every small escape step.
 penetration(x,z,y,r=.42,h=1.85){
  let total=0;const offsets=[[0,0],[r,0],[-r,0],[0,r],[0,-r],
   [r*.7,r*.7],[-r*.7,-r*.7],[r*.7,-r*.7],[-r*.7,r*.7]];
  for(let yy=.46;yy<h;yy+=.28)for(const [dx,dz]of offsets)
   total+=Math.max(0,this.value([x+dx,y+yy,z+dz])-ISO+.015);
  return total;
 }
 meshChunk(ch){const base=ch.split(',').map(v=>Number(v)*8),positions=[],normals=[];const vertex=(a,b,va,vb)=>add(a,mul(sub(b,a),clamp((ISO-va)/(vb-va),0,1)));
  const tri=(a,b,c)=>{let na=this.normal(a),nb=this.normal(b),nc=this.normal(c),face=norm([(b[1]-a[1])*(c[2]-a[2])-(b[2]-a[2])*(c[1]-a[1]),(b[2]-a[2])*(c[0]-a[0])-(b[0]-a[0])*(c[2]-a[2]),(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])]);if(dot(face,add(na,add(nb,nc)))<0){[b,c]=[c,b];[nb,nc]=[nc,nb];}positions.push(...a,...b,...c);normals.push(...na,...nb,...nc);};
  for(let x=base[0];x<base[0]+8;x++)for(let y=base[1];y<base[1]+8;y++)for(let z=base[2];z<base[2]+8;z++){let v=CORNERS.map(p=>this.get(x+p[0],y+p[1],z+p[2]));if(v.every(v=>v<ISO)||v.every(v=>v>=ISO))continue;const p=CORNERS.map(c=>[(x+c[0])*CELL,(y+c[1])*CELL,(z+c[2])*CELL]);
   for(const tet of TETS){const ins=tet.filter(i=>v[i]>=ISO),outs=tet.filter(i=>v[i]<ISO);if(!ins.length||!outs.length)continue;const at=(a,b)=>vertex(p[a],p[b],v[a],v[b]);if(ins.length===1)tri(...outs.map(j=>at(ins[0],j)));else if(ins.length===3)tri(...ins.map(j=>at(j,outs[0])));else{const a=at(ins[0],outs[0]),b=at(ins[0],outs[1]),c=at(ins[1],outs[0]),d=at(ins[1],outs[1]);tri(a,b,c);tri(b,d,c);}}
  }return{positions:new Float32Array(positions),normals:new Float32Array(normals)};
 }
 upload(renderer,maxChunks=4){let count=0;for(const ch of this.dirty){if(count++>=maxChunks)break;const kind='gum4:'+ch,g=this.meshChunk(ch),gl=renderer.gl;let m=renderer.meshes.get(kind);if(!g.positions.length){if(m){for(const b of m.buffers)gl.deleteBuffer(b);gl.deleteVertexArray(m.vao);renderer.meshes.delete(kind);}this.chunks.delete(ch);this.dirty.delete(ch);continue;}if(!m){m={vao:gl.createVertexArray(),buffers:[gl.createBuffer(),gl.createBuffer()],count:0};renderer.meshes.set(kind,m);}gl.bindVertexArray(m.vao);for(const [i,data]of[g.positions,g.normals].entries()){gl.bindBuffer(gl.ARRAY_BUFFER,m.buffers[i]);gl.bufferData(gl.ARRAY_BUFFER,data,gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,3,gl.FLOAT,false,0,0);}m.count=g.positions.length/3;this.dirty.delete(ch);}
 }
 renderNodes(renderer){const out=[];for(const ch of this.chunks){let kind='gum4:'+ch;if(renderer.meshes.get(kind)?.count)out.push(node(kind,[0,0,0],[1,1,1],GUM,[0,0,0],[.14,.025,0,0]));}return out;}
 disposeMeshes(renderer){for(const [kind,m]of renderer.meshes)if(kind.startsWith('gum4:')){for(const b of m.buffers)renderer.gl.deleteBuffer(b);renderer.gl.deleteVertexArray(m.vao);renderer.meshes.delete(kind);}}
}
export function propBox(p){return{min:[p.p[0]-(p.halfX||p.radius),p.p[1],p.p[2]-(p.halfZ||p.radius)],max:[p.p[0]+(p.halfX||p.radius),p.p[1]+p.height,p.p[2]+(p.halfZ||p.radius)],prop:p,pin:true};}
export function attachPhysics(world,volume,props){const raw={ray:world.ray.bind(world),support:world.support.bind(world),blocked:world.blocked.bind(world)};world.raw=raw;world.gumVolume=volume;
 world.ray=(o,d,max=70,pinOnly=false)=>{let best=raw.ray(o,d,max,pinOnly);if(best&&dot(best.n,d)>0)best.n=mul(best.n,-1);let limit=best?best.t:max;let g=volume.ray(o,d,limit);if(g&&g.t<limit){best=g;limit=g.t;}for(const p of props){if(p===world.ignore||p.disabled)continue;let hit=rayBox(o,d,propBox(p),limit);if(hit&&hit.t<limit){best={...hit,prop:p};limit=hit.t;}}return best;};
 world.support=(x,z,y,rise=.5)=>{let s=raw.support(x,z,y,rise),g=volume.support(x,z,y,rise);if(g&&(!s||g.h>s.h))s=g;for(const p of props){if(p===world.ignore||p.disabled)continue;const h=p.p[1]+p.height;if(Math.abs(p.p[0]-x)<=(p.halfX||p.radius)&&Math.abs(p.p[2]-z)<=(p.halfZ||p.radius)&&h<=y+rise&&(!s||h>s.h))s={h,s:{name:'Κιβώτιο',prop:p}};}return s;};
 world.hardBlocked=(x,z,y,r=.42,h=1.85)=>{const b=raw.blocked(x,z,y,r,h);if(b)return b;
  for(const p of props){if(p===world.ignore||p.disabled||y+.12>=p.p[1]+p.height||y+h<=p.p[1]+.02)continue;
   const box=propBox(p),nx=clamp(x,box.min[0],box.max[0]),nz=clamp(z,box.min[2],box.max[2]);
   if((x-nx)**2+(z-nz)**2<r*r)return box;}return null;};
 world.blocked=(x,z,y,r=.42,h=1.85)=>world.hardBlocked(x,z,y,r,h)||volume.blocked(x,z,y,r,h);
 return world;
}
/** Resolve newly overlapping material without teleporting, deleting it, or
 * disabling walls. Recovery is bounded and monotonically reduces penetration. */
export function recoverGumOverlap(world,a,dt){
 const gum=world.gumVolume;if(!gum||!gum.values.size||a.pin||a.hanging)return false;
 const r=a.radius||.42,h=a.height||1.85;
 if(!gum.blocked(a.p[0],a.p[2],a.p[1],r,h))return false;
 const step=Math.min(.07,Math.max(0,dt)*3.6);if(!step)return false;
 let cost=gum.penetration(a.p[0],a.p[2],a.p[1],r,h),best=null;
 for(let i=0;i<12;i++){
  const angle=i*Math.PI/6,dx=Math.sin(angle)*step,dz=Math.cos(angle)*step;
  const x=a.p[0]+dx,z=a.p[2]+dz;
  if(world.hardBlocked?.(x,z,a.p[1],r,h))continue;
  const next=gum.penetration(x,z,a.p[1],r,h);
  if(next<cost-1e-5){cost=next;best=[x,a.p[1],z];}
 }
 if(best){a.p=best;return true;}return false;
}
function footSupport(world,a,x,z,rise){
 let best=world.support(x,z,a.p[1],rise);
 // Sample the footprint as well as its center; a rounded edge must not snag
 // a shoulder while a small, walkable step exists under the leading foot.
 if(a.grounded&&world.gumVolume?.values.size){
  const r=(a.radius||.42)*.75;
  for(const [dx,dz]of[[r,0],[-r,0],[0,r],[0,-r]]){
   const s=world.gumVolume.support(x+dx,z+dz,a.p[1],rise);
   if(s&&(!best||s.h>best.h)&&!world.blocked(x,z,s.h,a.radius,a.height||1.85))best=s;
  }
 }
 return best;
}
export function moveBody(world,a,dx,dz,dt,{gravity=19,bounce=false}={}){
 const prevIgnore=world.ignore;world.ignore=a;
 try{
  const old=a.p.slice(),oldVy=a.vy,height=a.height||1.85,step=.45;
  recoverGumOverlap(world,a,dt);
  const substeps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.12)),gum=world.gumVolume;
  for(let j=0;j<substeps;j++)for(const axis of[0,2]){
   const amount=(axis===0?dx:dz)/substeps;if(Math.abs(amount)<1e-10)continue;
   const dest=a.p.slice();dest[axis]+=amount;
   const support=footSupport(world,a,dest[0],dest[2],step);
   const base=a.grounded&&support&&support.h>a.p[1]?support.h:a.p[1];
   let blocked=world.blocked(dest[0],dest[2],base,a.radius,height);
   if(blocked?.gum&&gum&&!world.hardBlocked(dest[0],dest[2],base,a.radius,height)){
    const oldCost=gum.penetration(a.p[0],a.p[2],a.p[1],a.radius,height);
    if(oldCost>0&&gum.penetration(dest[0],dest[2],base,a.radius,height)<oldCost-1e-5)blocked=null;
   }
   if(!blocked){a.p[axis]=dest[axis];if(base>a.p[1]&&a.grounded)a.p[1]=base;}
  }
  a.vy-=gravity*dt;let y=a.p[1]+a.vy*dt;
  const support=footSupport(world,a,a.p[0],a.p[2],a.grounded?step:.08);
  if(a.vy>0){const head=[a.p[0],a.p[1]+height-.03,a.p[2]],hit=world.ray(head,[0,1,0],Math.max(.01,y-a.p[1]+.04));
   if(hit){y=a.p[1]+Math.max(0,hit.t-.03);a.vy=0;}}
  a.landed=false;a.onGum=false;
  if(support&&a.vy<=0&&y<=support.h){a.landed=!a.grounded;a.p[1]=support.h;a.grounded=true;a.vy=0;a.onGum=!!support.s.gum;
   if(a.landed){a.impactVy=oldVy;if(bounce&&a.onGum&&oldVy<-6){a.vy=Math.min(10,-oldVy*.58);a.grounded=false;}}}
  else{a.p[1]=y;a.grounded=false;}
  if(a.p[1]<-14){a.p=(a.lastSafe||a.home||[0,0,25]).slice();a.vy=0;a.vel=[0,0,0];a.grounded=true;a.fell=true;}
  if(a.grounded&&!a.onGum&&!world.blocked(a.p[0],a.p[2],a.p[1],a.radius,height))a.lastSafe=a.p.slice();
  return{blockedX:Math.abs(a.p[0]-old[0]-dx)>.025,blockedZ:Math.abs(a.p[2]-old[2]-dz)>.025};
 }finally{world.ignore=prevIgnore;}
}
export function deflect(velocity,normal,restitution=.65){return mul(sub(velocity,mul(normal,2*dot(velocity,normal))),restitution);}
/* Tethers have travel time, length, gravity and spring tension. No teleport. */
export class TetherPhysics {
 constructor(world){this.world=world;this.reset();}
 reset(){this.links=[];this.grab=null;this.swing=null;this.id=0;}
 add(body,anchor,{hanging=false,swing=false,rest=null}={}){const length=dist(add(body.p,[0,1.15,0]),anchor),l={id:++this.id,body,anchor:anchor.slice(),length:rest??(hanging?2.5:Math.max(2,length*(swing?.66:.92))),progress:0,hanging,swing,age:0};this.links.push(l);if(swing)this.swing=l;return l;}
 releasePlayer(){if(this.swing)this.links=this.links.filter(l=>l!==this.swing);this.swing=null;this.grab=null;}
 cutNear(p,r=1.5){this.links=this.links.filter(l=>{if(dist(l.anchor,p)<r||dist(l.body.p,p)<r){if(l===this.swing)this.swing=null;l.body.hanging=false;return false;}return true;});}
 step(dt,player,dir=[0,0,0]){if(this.grab){const a=this.grab,goal=add(player.p,add(mul([Math.sin(player.yaw),0,Math.cos(player.yaw)],2.5),[0,.15,0])),d=sub(goal,a.p);a.vel??=[0,0,0];for(const k of[0,2])a.vel[k]=clamp(a.vel[k]+(d[k]*13-a.vel[k]*5)*dt,-8,8);if(d[1]>.3){a.vy+=Math.min(30,d[1]*16)*dt;a.grounded=false;}if(dist(player.p,a.p)>15)this.grab=null;}
  for(const l of this.links){l.age+=dt;l.progress=Math.min(1,l.progress+dt*26/Math.max(1,dist(l.anchor,l.body.p)));if(l.progress<1)continue;const a=l.body,p=add(a.p,[0,1.15,0]),d=sub(l.anchor,p),distance=len(d),n=norm(d);a.vel??=[0,0,0];const vel=[a.vel[0],a.vy,a.vel[2]],tension=Math.max(0,(distance-l.length)*(l.hanging?52:65)-dot(vel,n)*7+(l.hanging?20:0));for(const k of[0,2])a.vel[k]=clamp(a.vel[k]+n[k]*tension*dt,-17,17);a.vy=clamp(a.vy+n[1]*tension*dt,-20,12);
   if(l.swing){a.vel[0]+=dir[0]*dt*7;a.vel[2]+=dir[2]*dt*7;a.grounded=false;}
   if(l.hanging){const ground=this.world.raw.support(a.p[0],a.p[2],a.p[1],0);a.hanging=!!ground&&a.p[1]-ground.h>.35;if(a.hanging)a.state='suspended';}
   if(distance>32){l.broken=true;a.hanging=false;if(l===this.swing)this.swing=null;}
  }this.links=this.links.filter(l=>!l.broken);
 }
 nodes(player,time){const out=[],draw=(a,b,progress=1,thickness=.075)=>{const end=add(a,mul(sub(b,a),progress));for(let i=0;i<9;i++){const at=t=>add(add(a,mul(sub(end,a),t)),[0,-Math.sin(t*Math.PI)*Math.min(.65,dist(a,end)*.035),0]);out.push(segment('cylinder',at(i/9),at((i+1)/9),thickness,GUM,[.12,.04,0,0]));}out.push(node('sphere',end,[.22,.16,.22],GUM));};
  if(this.grab)draw(add(player.p,[-.35,1.3,0]),add(this.grab.p,[0,this.grab.height?this.grab.height*.5:1.1,0]));for(const l of this.links)draw(add(l.body.p,[0,1.15,0]),l.anchor,l.progress,l.hanging?.13:.085);return out;
 }
}
