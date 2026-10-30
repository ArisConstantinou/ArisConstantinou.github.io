import {CATAPULT_MECHANISM} from './arcade-cartoon-bodies.js';
import {frogBody} from './arcade-actor-bounds.js';
import {clearBodySegment} from './arcade-collision.js';
export function machineFootprints(stations){
 const {min,max}=CATAPULT_MECHANISM.chassisBounds,cx=(min[0]+max[0])/2,cz=(min[2]+max[2])/2;
 return stations.map(station=>{const yaw=Math.atan2(station.aimX||0,station.aimZ??-1),c=Math.cos(yaw),s=Math.sin(yaw);return {id:station.id,x:station.x+c*cx+s*cz,z:station.z-s*cx+c*cz,hw:(max[0]-min[0])/2,hd:(max[2]-min[2])/2,yaw,top:max[1],station};});
}
const local=(p,b)=>{const c=Math.cos(b.yaw),s=Math.sin(b.yaw),x=p.x-b.x,z=p.z-b.z;return {x:c*x-s*z,z:s*x+c*z};};
const world=(p,b)=>{const c=Math.cos(b.yaw),s=Math.sin(b.yaw);return {x:b.x+c*p.x+s*p.z,z:b.z-s*p.x+c*p.z};};
export function machineDetour(actor,goal,stations){
 if(!actor.characterClass||!stations?.length||actor.catapultId)return goal;
 const boxes=machineFootprints(stations),radius=frogBody(actor).movementRadius+.12;
 let target=goal;
 for(const b of boxes){const p=local(target,b);if(Math.abs(p.x)<b.hw+radius&&Math.abs(p.z)<b.hd+radius)target=world({x:0,z:b.hd+radius+.12},b);}
 if(clearBodySegment(actor,target,{walls:boxes,radius}))return target;
 const nodes=[actor,target];
 for(const b of boxes)for(const x of [-b.hw-radius-.05,b.hw+radius+.05])for(const z of [-b.hd-radius-.05,b.hd+radius+.05])nodes.push(world({x,z},b));
 const count=nodes.length,edges=Array.from({length:count},()=>[]);
 for(let i=0;i<count;i++)for(let j=i+1;j<count;j++)if(clearBodySegment(nodes[i],nodes[j],{walls:boxes,radius})){const cost=Math.hypot(nodes[i].x-nodes[j].x,nodes[i].z-nodes[j].z)+.001;edges[i].push([j,cost]);edges[j].push([i,cost]);}
 const distance=Array(count).fill(Infinity),previous=Array(count).fill(-1),visited=new Set();distance[0]=0;
 for(let pass=0;pass<count;pass++){
  let at=-1;for(let i=0;i<count;i++)if(!visited.has(i)&&(at<0||distance[i]<distance[at]))at=i;
  if(at<0||!Number.isFinite(distance[at])||at===1)break;visited.add(at);
  for(const [next,cost] of edges[at])if(distance[at]+cost<distance[next]){distance[next]=distance[at]+cost;previous[next]=at;}
 }
 if(previous[1]<0)return target;let next=1;while(previous[next]>0)next=previous[next];return nodes[next];
}
