import {distance,lineClear} from './systems.js';

// Keep the castle route, then find a short continuous detour around nearby
// physical props. A coarse grid can wrongly seal the gap beside a barrel.
export function pathAroundProps(nav,from,to,entities){
 const route=nav.path(from,to);if(!route.length)return route;
 const boxes=[];
 for(const e of entities){
  if(e.category!=='prop'||e.removed||e.reserved||distance(from,e.body.position)>10)continue;
  if(e.body.aabbNeedsUpdate)e.body.updateAABB();
  const a=e.body.aabb;if(!a||a.lowerBound.y>3.3||a.upperBound.y<.1)continue;
  boxes.push({x:(a.lowerBound.x+a.upperBound.x)/2,z:(a.lowerBound.z+a.upperBound.z)/2,
   // The upright physical box is .84m in X and .62m in Z. Add clearance,
   // including for the actual rotation of each prop's bounding box.
   w:a.upperBound.x-a.lowerBound.x+2*(.84+.04),d:a.upperBound.z-a.lowerBound.z+2*(.62+.04)});
 }
 if(!boxes.length)return route;
 const contains=(box,p)=>Math.abs(p.x-box.x)<=box.w/2&&Math.abs(p.z-box.z)<=box.d/2;
 let next=0;
 for(let i=0;i<route.length;i++)if(distance(from,route[i])<=8&&nav.clearRoute(from,route[i])&&!boxes.some(b=>contains(b,route[i])))next=i;
 const goal=route[next];if(boxes.some(b=>contains(b,goal)))return route;
 const overlap=boxes.filter(b=>contains(b,from)),clear=(a,b,start=false)=>nav.clearRoute(a,b)&&lineClear(a,b,start?boxes.filter(box=>!overlap.includes(box)):boxes);
 if(!overlap.length&&clear(from,goal))return [goal,...route.slice(next+1)];
 const nodes=[{x:from.x,z:from.z},goal];
 for(const box of boxes)for(const sx of [-1,1])for(const sz of [-1,1]){
  const p={x:box.x+sx*(box.w/2+.06),z:box.z+sz*(box.d/2+.06)};
  if(nav.isFree(p.x,p.z)&&!boxes.some(b=>contains(b,p)))nodes.push(p);
 }
 const cost=new Map([[0,0]]),parent=new Map(),closed=new Set();
 while(cost.size>closed.size){
  let current=-1,best=Infinity;for(const [i,c]of cost)if(!closed.has(i)&&c<best){current=i;best=c;}
  if(current<0)break;
  if(current===1){const path=[];let i=1;while(i!==0){path.push(nodes[i]);i=parent.get(i);}return [...path.reverse(),...route.slice(next+1)];}
  closed.add(current);
  for(let i=1;i<nodes.length;i++)if(!closed.has(i)
   &&!(current===0&&overlap.length&&(i===1||overlap.some(box=>(nodes[i].x-from.x)*(from.x-box.x)+(nodes[i].z-from.z)*(from.z-box.z)<-1e-6)))
   &&clear(nodes[current],nodes[i],current===0)){
   const c=best+distance(nodes[current],nodes[i]);if(c<(cost.get(i)??Infinity)){cost.set(i,c);parent.set(i,current);}
  }
 }
 // If clutter physically seals the passage, retain the push route. Real
 // collisions remain active, and the next plan uses the moved props.
 return route;
}
