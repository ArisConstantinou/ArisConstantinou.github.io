import {worldRings,contains} from './geometry.mjs';
export const AREA_3D=['room','ramp','stairs'];
export const HEIGHT_TYPES=[...AREA_3D,'wall','door','window','ac'];
export const heightCm=item=>item.heightCm??({door:210,window:120,ac:35,ramp:280}[item.type]??280);
export function openingLine(item,scale){
  const a=item.rotation*Math.PI/180,c=Math.cos(a),s=Math.sin(a),v=item.type==='door'?item.h/2:0;
  return [-item.w/2,item.w/2].map(u=>({x:(item.x+item.w/2+u*c-v*s)*scale,y:(item.y+item.h/2+u*s+v*c)*scale}));
}
export function doorOnWall(door,room,point,cmPerUnit,attachment){
  if(room.floorOnly)return null;
  const rings=room.type==='wall'?[openingLine({...room,type:'window'},1)]:worldRings(room),margin=2/cmPerUnit;let best;
  rings.forEach((ring,ri)=>ring.forEach((a,ei)=>{
    if(attachment&&(attachment.ring!==ri||attachment.edge!==ei))return;
    const b=ring[(ei+1)%ring.length],dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy);if(!length)return;
    const fraction=attachment?attachment.t:((point.x-a.x)*dx+(point.y-a.y)*dy)/(length*length),t=Math.max(0,Math.min(1,fraction));
    const p={x:a.x+dx*t,y:a.y+dy*t},distance=point?Math.hypot(p.x-point.x,p.y-point.y):0;
    if(best&&best.distance<=distance)return;
    best={distance,a,dx,dy,length,fraction,ri,ei};
  }));
  if(!best||best.length<door.w+margin*2)return null;
  const {a,dx,dy,length,fraction,ri,ei}=best,t=Math.max((door.w/2+margin)/length,Math.min(1-(door.w/2+margin)/length,fraction)),p={x:a.x+dx*t,y:a.y+dy*t};
  let angle=Math.atan2(dy,dx);if(contains(rings,{x:p.x-dy/length*.001,y:p.y+dx/length*.001}))angle+=Math.PI;
  const cx=p.x+door.h/2*Math.sin(angle),cy=p.y-door.h/2*Math.cos(angle);
  return {x:cx-door.w/2,y:cy-door.h/2,rotation:((angle*180/Math.PI+540)%360)-180,attachment:{roomId:room.id,ring:ri,edge:ei,t}};
}
// Split collinear room edges before deduplicating, including partial shared sides.
// Heights are physical centimetres; footprint coordinates use the calibrated scale.
export function architecture(items,cmPerUnit){
  const scale=cmPerUnit/100,areas=items.filter(i=>AREA_3D.includes(i.type));
  const floors=areas.map(item=>({item,rings:worldRings(item).map(r=>r.map(p=>({x:p.x*scale,y:p.y*scale})))}));
  const edges=floors.filter(f=>!f.item.floorOnly).flatMap(f=>f.rings.flatMap(r=>r.map((a,n)=>({a,b:r[(n+1)%r.length],owner:f.item.id,height:heightCm(f.item)/100,thickness:.14}))));
  for(const item of items.filter(i=>i.type==='wall')){const [a,b]=openingLine({...item,type:'window'},scale);edges.push({a,b,owner:item.id,height:heightCm(item)/100,thickness:item.h*scale});}
  const openings=items.filter(i=>['door','window'].includes(i.type)).map(item=>({item,line:openingLine(item,scale),bottom:item.type==='door'?0:.9,top:(item.type==='door'?0:.9)+heightCm(item)/100}));
  const walls=new Map(),epsilon=1e-6;
  const key=p=>Math.round(p.x/epsilon)+','+Math.round(p.y/epsilon);
  for(const edge of edges){
    const dx=edge.b.x-edge.a.x,dy=edge.b.y-edge.a.y,len=Math.hypot(dx,dy),den=len*len;if(len<epsilon)continue;
    const project=p=>((p.x-edge.a.x)*dx+(p.y-edge.a.y)*dy)/den;
    const distance=p=>Math.abs((p.x-edge.a.x)*dy-(p.y-edge.a.y)*dx)/len;
    const stops=[0,1],cuts=[];
    for(const other of edges){if(distance(other.a)>epsilon||distance(other.b)>epsilon)continue;for(const p of [other.a,other.b]){const t=project(p);if(t>epsilon&&t<1-epsilon)stops.push(t);}}
    for(const opening of openings){
      if(opening.line.some(p=>distance(p)>.12))continue;
      const ts=opening.line.map(project).sort((a,b)=>a-b),start=Math.max(0,ts[0]),end=Math.min(1,ts[1]);
      if(end-start<=epsilon)continue;stops.push(start,end);cuts.push({...opening,start,end});
    }
    const values=stops.sort((a,b)=>a-b).filter((t,n,a)=>!n||t-a[n-1]>epsilon);
    for(let n=1;n<values.length;n++){
      const start=values[n-1],end=values[n],a={x:edge.a.x+dx*start,y:edge.a.y+dy*start},b={x:edge.a.x+dx*end,y:edge.a.y+dy*end};
      const keys=[key(a),key(b)].sort(),k=keys.join('|'),cut=cuts.filter(o=>(start+end)/2>o.start-epsilon&&(start+end)/2<o.end+epsilon);
      const old=walls.get(k);if(old){if(!old.owners.includes(edge.owner))old.owners.push(edge.owner);old.height=Math.max(old.height,edge.height);old.thickness=Math.max(old.thickness,edge.thickness);}
      else walls.set(k,{a,b,height:edge.height,thickness:edge.thickness,owners:[edge.owner],cuts:cut});
    }
  }
  const blocks=[];
  for(const wall of walls.values()){
    let bands=[[0,wall.height]];
    for(const cut of wall.cuts)bands=bands.flatMap(([bottom,top])=>cut.top<=bottom||cut.bottom>=top?[[bottom,top]]:[[bottom,Math.min(top,cut.bottom)],[Math.max(bottom,cut.top),top]].filter(([a,b])=>b-a>epsilon));
    for(const [bottom,top] of bands)blocks.push({...wall,bottom,top});
  }
  return {scale,floors,walls:[...walls.values()],blocks,openings};
}
