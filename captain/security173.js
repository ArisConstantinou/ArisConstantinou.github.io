// Deterministic custody rules and walkable-ship navigation. No invisible timer arrest.
import {floorAt,onFloor,circleBox,lineBox,clamp} from './chaos-model170.js';
const R=.29,STEP=.5,KEY=(x,z)=>Math.round((x+10)/STEP)+','+Math.round((z-32)/STEP);
export function captureStep(value,dt,{nearby=0,health=100,blocking=false}={}){
 const canRestrain=nearby>=2||(nearby===1&&health<=35);
 const rate=canRestrain?(14+nearby*6)*(blocking?.65:1):-24;
 return clamp(value+Math.min(.075,Math.max(0,dt))*rate,0,100);
}
export function guardQuota(seconds){return Math.min(6,2+Math.floor(Math.max(0,seconds)/8));}
function clear(x,z,solids){const y=floorAt(x,z);return y!==null&&onFloor(x,z,R)&&!solids.some(b=>b.active!==false&&Math.abs((b.y??y)-y)<2.2&&circleBox(x,z,R,b));}
function travel(a,b,solids){const d=Math.hypot(a.x-b.x,a.z-b.z),n=Math.max(1,Math.ceil(d/.18));let y=a.y;for(let i=1;i<=n;i++){const t=i/n,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t,h=floorAt(x,z);if(h===null||Math.abs(h-y)>.65||!clear(x,z,solids))return false;y=h;}return true;}
export function createShipNavigator(){
 let stamp='',nodes=[],lookup=new Map();
 function rebuild(solids){const key=solids.map(b=>[b.x,b.z,b.w,b.d,b.y,b.active].join(',')).join('|');if(stamp===key)return;stamp=key;nodes=[];lookup.clear();
  for(let z=32;z<=63;z+=STEP)for(let x=-10;x<=13.5;x+=STEP)if(clear(x,z,solids)){const n={x,z,y:floorAt(x,z),index:nodes.length,edges:[]};nodes.push(n);lookup.set(KEY(x,z),n);}
  for(const a of nodes)for(const [dx,dz] of [[STEP,0],[-STEP,0],[0,STEP],[0,-STEP],[STEP,STEP],[STEP,-STEP],[-STEP,STEP],[-STEP,-STEP]]){const b=lookup.get(KEY(a.x+dx,a.z+dz));if(b&&travel(a,b,solids))a.edges.push(b.index);}
 }
 function nearest(p,solids){let best=null,cost=Infinity;for(const n of nodes){const d=Math.hypot(n.x-p.x,n.z-p.z)+Math.abs(n.y-p.y)*3;if(d<cost&&Math.abs(n.y-p.y)<.8&&travel(p,n,solids)){best=n;cost=d;}}return best;}
 function path(a,b,solids){rebuild(solids);const start=nearest(a,solids),end=nearest(b,solids);if(!start||!end)return [];
  const costs=new Float64Array(nodes.length);costs.fill(Infinity);costs[start.index]=0;const from=new Int32Array(nodes.length);from.fill(-1);const open=[start.index],closed=new Set();
  while(open.length){let k=0,best=Infinity;for(let i=0;i<open.length;i++){const id=open[i],n=nodes[id],score=costs[id]+Math.hypot(n.x-end.x,n.z-end.z);if(score<best){best=score;k=i;}}
   const id=open.splice(k,1)[0];if(id===end.index){const out=[];let at=id;while(at!==start.index&&at!==-1){out.unshift({x:nodes[at].x,y:nodes[at].y,z:nodes[at].z});at=from[at];}return out;}
   closed.add(id);for(const next of nodes[id].edges){if(closed.has(next))continue;const d=costs[id]+Math.hypot(nodes[next].x-nodes[id].x,nodes[next].z-nodes[id].z);if(d<costs[next]){costs[next]=d;from[next]=id;if(!open.includes(next))open.push(next);}}
  }return [];
 }
 function steer(actor,position,destination,solids,time){
  if(travel(position,destination,solids)){actor.nav=null;return destination;}
  const n=actor.nav;if(!n||n.until<time||Math.hypot(n.target.x-destination.x,n.target.z-destination.z)>1.5||n.stamp!==stamp){actor.nav={points:path(position,destination,solids),target:{...destination},until:time+1.5+(actor.id%3)*.12,stamp};}
  while(actor.nav.points.length&&Math.hypot(actor.nav.points[0].x-position.x,actor.nav.points[0].z-position.z)<.23)actor.nav.points.shift();
  return actor.nav.points[0]||position;
 }
 return {steer,path,clear:(p,s)=>clear(p.x,p.z,s),reset:()=>{stamp='';nodes=[];lookup.clear();},inspect:()=>({nodes:nodes.length})};
}
