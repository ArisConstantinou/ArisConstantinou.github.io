import {supportedFootprint} from './game/src/walkable-support.js';
import {engineProfileIntersects} from './clearance.js';
import {indexBoxes} from './spatial-boxes.js';
const top=f=>f.y+f.h/2;
const inside=(f,x,z)=>Math.abs(x-f.x)<=f.w/2+.001&&Math.abs(z-f.z)<=f.d/2+.001;

// Navigation nodes are (cell, support height), not just X/Z. A floor above a
// character is a ceiling; its doors never seal the unrelated floor below it.
export class LayeredNavigationGrid {
 constructor(floors,obstacles,cellSize=.65,radius=.48,height=radius>.8?4:1.8,bodyProfile=null){
  Object.assign(this,{floors,cell:cellSize,radius,height,bodyProfile,maxStep:.41});
  this.minX=Math.min(...floors.map(f=>f.x-f.w/2))-1;
  this.minZ=Math.min(...floors.map(f=>f.z-f.d/2))-1;
  this.w=Math.ceil((Math.max(...floors.map(f=>f.x+f.w/2))-this.minX+1)/this.cell);
  this.h=Math.ceil((Math.max(...floors.map(f=>f.z+f.d/2))-this.minZ+1)/this.cell);
  this.patches=Array.from({length:this.w*this.h},()=>[]);
  for(const f of floors){
   const x0=Math.max(0,Math.floor((f.x-f.w/2-this.minX)/this.cell)),x1=Math.min(this.w-1,Math.ceil((f.x+f.w/2-this.minX)/this.cell));
   const z0=Math.max(0,Math.floor((f.z-f.d/2-this.minZ)/this.cell)),z1=Math.min(this.h-1,Math.ceil((f.z+f.d/2-this.minZ)/this.cell));
   for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){const i=x+z*this.w,p=this.point(i);if(inside(f,p.x,p.z))this.patches[i].push(f);}
  }
  this.setObstacles(obstacles);
 }
 index(x,z){const gx=Math.floor((x-this.minX)/this.cell),gz=Math.floor((z-this.minZ)/this.cell);return gx<0||gz<0||gx>=this.w||gz>=this.h?-1:gx+gz*this.w;}
 point(i){return {x:this.minX+(i%this.w+.5)*this.cell,z:this.minZ+(Math.floor(i/this.w)+.5)*this.cell};}
 floorAt(x,z,referenceY=0){let best=null;for(const f of this.nearFloors(x,z))if(inside(f,x,z)&&top(f)<=referenceY+.41&&(best===null||top(f)>top(best)))best=f;return best;}
 valid(p,f){
  const y=top(f),stair=f.tag==='fullmap-stair',tolerance=stair?.25+this.radius*(f.slope??.5):.25;
  const floors=this.nearFloors(p.x,p.z);
  if(!supportedFootprint(floors,{x:p.x,y,z:p.z},this.radius,tolerance))return false;
  const blocked=b=>this.bodyProfile?engineProfileIntersects(b,p,y,this.bodyProfile):b.y+b.h/2>y+.25&&b.y-b.h/2<y+this.height&&Math.abs(p.x-b.x)<b.w/2+this.radius&&Math.abs(p.z-b.z)<b.d/2+this.radius;
  if(this.nearObstacles(p.x,p.z).some(blocked))return false;
  return !floors.some(b=>b!==f&&top(b)>y+.025&&!(!this.bodyProfile&&b.tag==='fullmap-stair'&&top(b)<=y+this.maxStep&&!inside(b,p.x,p.z))&&!(stair&&b.stairId===f.stairId)&&blocked(b));
 }
 setObstacles(obstacles){
  this.allObstacles=obstacles;
  const padding=Math.max(this.radius,...(this.bodyProfile?.spheres||[]).map(s=>Math.max(Math.abs(s.x),Math.abs(s.z))+s.radius+.025))+.002;
  this.nearFloors=indexBoxes(this.floors,padding);
  this.nearObstacles=indexBoxes(obstacles,padding);
  // Existing flat-world prop-placement helpers retain their ground-floor view.
  this.obstacles=obstacles.filter(b=>b.y-b.h/2<1.8&&b.y+b.h/2>.4);
  this.nodes=[];this.cells=Array.from({length:this.w*this.h},()=>[]);this.walk=new Uint8Array(this.w*this.h);
  for(let i=0;i<this.patches.length;i++){
   const p=this.point(i),seen=new Set();
   for(const f of this.patches[i]){const y=top(f),key=y.toFixed(4);if(seen.has(key)||!this.valid(p,f))continue;seen.add(key);
    const id=this.nodes.length;this.nodes.push({...p,y,cell:i,id});this.cells[i].push(id);if(Math.abs(y)<.25)this.walk[i]=1;
   }
  }
 }
 onFloor(x,z,referenceY){return referenceY===undefined?this.nearFloors(x,z).some(f=>inside(f,x,z)):!!this.floorAt(x,z,referenceY);}
 isFree(x,z,referenceY=0){const f=this.floorAt(x,z,referenceY);return !!f&&this.valid({x,z},f);}
 nearest(x,z,referenceY=0){
  const f=this.floorAt(x,z,referenceY);if(!f)return -1;const wanted=top(f),center=this.index(x,z);let best=-1,score=Infinity;
  if(center<0)return -1;
  const cx=center%this.w,cz=Math.floor(center/this.w);
  for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){
   const nx=cx+dx,nz=cz+dz;if(nx<0||nz<0||nx>=this.w||nz>=this.h)continue;
   for(const id of this.cells[nx+nz*this.w]){const n=this.nodes[id];if(Math.abs(n.y-wanted)>this.maxStep)continue;
    const d=(n.x-x)**2+(n.z-z)**2+4*(n.y-wanted)**2;if(d<score){score=d;best=id;}
   }
  }
  return best;
 }
 clearRoute(a,b){
  const af=this.floorAt(a.x,a.z,a.y??0),bf=this.floorAt(b.x,b.z,b.y??0);if(!af||!bf)return false;
  const ay=top(af),by=top(bf),steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.2));let previous=ay;
  for(let i=0;i<=steps;i++){
   const t=i/steps,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t,expected=ay+(by-ay)*t,f=this.floorAt(x,z,expected);
   if(!f||Math.abs(top(f)-expected)>.41||Math.abs(top(f)-previous)>this.maxStep||!this.valid({x,z},f))return false;previous=top(f);
  }
  return true;
 }
 path(a,b){
  const start=this.nearest(a.x,a.z,a.y??0),goal=this.nearest(b.x,b.z,b.y??0);if(start<0||goal<0)return [];
  const endpoint=this.nodes[goal];
  if(start===goal)return Math.abs(this.nodes[start].y-endpoint.y)<.01?[{x:b.x,y:endpoint.y,z:b.z}]:[];
  if(this.clearRoute(a,b))return [{x:b.x,y:endpoint.y,z:b.z}];
  const heap=[],cost=new Map([[start,0]]),parent=new Map(),closed=new Set();
  const heuristic=n=>Math.hypot(n.x-endpoint.x,n.z-endpoint.z)+Math.abs(n.y-endpoint.y);
  const push=(id,priority)=>{let i=heap.length;heap.push({id,priority});while(i){const p=(i-1)>>1;if(heap[p].priority<=priority)break;heap[i]=heap[p];i=p;}heap[i]={id,priority};};
  const pop=()=>{const first=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let c=i*2+1;if(c+1<heap.length&&heap[c+1].priority<heap[c].priority)c++;if(heap[c].priority>=last.priority)break;heap[i]=heap[c];i=c;}heap[i]=last;}return first.id;};
  push(start,heuristic(this.nodes[start]));
  while(heap.length){const id=pop();if(closed.has(id))continue;const n=this.nodes[id];
   if(id===goal){const result=[];let v=id;while(v!==start){const p=this.nodes[v];result.push({x:p.x,y:p.y,z:p.z});v=parent.get(v);if(v===undefined)return [];}result.reverse();if(this.isFree(b.x,b.z,endpoint.y)&&this.clearRoute(result.at(-1),{...b,y:endpoint.y}))result.push({x:b.x,y:endpoint.y,z:b.z});return result;}
   closed.add(id);const cx=n.cell%this.w,cz=Math.floor(n.cell/this.w);
   for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){
    if(!dx&&!dz)continue;const x=cx+dx,z=cz+dz;if(x<0||z<0||x>=this.w||z>=this.h)continue;
    if(dx&&dz){const reachable=i=>this.cells[i].some(k=>Math.abs(this.nodes[k].y-n.y)<=this.maxStep);if(!reachable(cx+dx+cz*this.w)||!reachable(cx+(cz+dz)*this.w))continue;}
    for(const next of this.cells[x+z*this.w]){const p=this.nodes[next];if(closed.has(next)||Math.abs(p.y-n.y)>this.maxStep)continue;
     const value=cost.get(id)+Math.hypot(p.x-n.x,p.z-n.z)+Math.abs(p.y-n.y);if(value<(cost.get(next)??Infinity)){cost.set(next,value);parent.set(next,id);push(next,value+heuristic(p));}
    }
   }
  }
  return [];
 }
}
